/**
 * {{PROJECT_NAME}} — Cloudflare Worker Full-Stack SaaS Edge Entrypoint (SOTA 2026)
 * =================================================================================
 * Stack: Hono RPC Pattern + Better-Auth Session Guard + Drizzle D1 Batch Coalescing
 *        + Polar.sh / Stripe / MercadoPago Idempotent Webhooks + PartyServer DO
 *        + Cloudflare Workflows + n8n HMAC Automation Connector.
 */

import { createD1Repository } from "../src/db/drizzle.schema.js";

const SECURITY_HEADERS = Object.freeze({
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'inline-speculation-rules' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https: wss:; frame-src https://challenges.cloudflare.com https://buy.stripe.com https://polar.sh; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), payment=(self), usb=(), interest-cohort=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "X-Frame-Options": "DENY"
});

const RATE_LIMIT_BUCKETS = new Map();
const RATE_LIMIT_WINDOW_MS = 60000;
const RATE_LIMIT_MAX_REQUESTS = 30;

export function withSecurityHeaders(response, extraHeaders = {}) {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(key, value);
  }
  for (const [key, value] of Object.entries(extraHeaders)) {
    headers.set(key, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

function checkRateLimit(clientIp) {
  const now = Date.now();
  const bucket = RATE_LIMIT_BUCKETS.get(clientIp);
  if (!bucket || now - bucket.windowStart > RATE_LIMIT_WINDOW_MS) {
    RATE_LIMIT_BUCKETS.set(clientIp, { windowStart: now, count: 1 });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 };
  }
  bucket.count += 1;
  const remaining = Math.max(0, RATE_LIMIT_MAX_REQUESTS - bucket.count);
  return { allowed: bucket.count <= RATE_LIMIT_MAX_REQUESTS, remaining };
}

async function computeHmacSha256Hex(secret, rawBody) {
  if (!secret || typeof crypto === "undefined" || !crypto.subtle) return "";
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sigBuf = await crypto.subtle.sign("HMAC", key, enc.encode(rawBody));
  return Array.from(new Uint8Array(sigBuf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqualHex(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length || a.length === 0) {
    return false;
  }
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function dispatchN8nWebhook(env, eventName, data) {
  const webhookUrl = env && typeof env.N8N_WEBHOOK_URL === "string" ? env.N8N_WEBHOOK_URL.trim() : "";
  if (!webhookUrl || !webhookUrl.startsWith("https://")) {
    return { dispatched: false, reason: "N8N_WEBHOOK_URL_NOT_CONFIGURED" };
  }
  const eventPayload = JSON.stringify({
    event: eventName,
    project: "{{PROJECT_ID}}",
    stack: "fullstack-saas-edge",
    timestamp: new Date().toISOString(),
    data
  });
  const secret = env && typeof env.N8N_WEBHOOK_SECRET === "string" ? env.N8N_WEBHOOK_SECRET : "";
  const signature = await computeHmacSha256Hex(secret, eventPayload);
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "X-Factory-Event": eventName
  };
  if (signature) {
    headers["X-Factory-Signature-256"] = `sha256=${signature}`;
  }
  try {
    const res = await fetch(webhookUrl, { method: "POST", headers, body: eventPayload, signal: AbortSignal.timeout(4500) });
    return { dispatched: res.ok, status: res.status };
  } catch {
    return { dispatched: false, reason: "N8N_WEBHOOK_TIMEOUT_OR_NETWORK_ERROR" };
  }
}

/**
 * Better-Auth Compatible Session & RBAC Verifier (D1 + KV Cache)
 */
async function verifyAuthSession(request, env) {
  const authHeader = request.headers.get("Authorization") || "";
  const cookieHeader = request.headers.get("Cookie") || "";
  const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
  const cookieMatch = cookieHeader.match(/better-auth\.session_token=([^;]+)/);
  const rawToken = bearerToken || (cookieMatch ? cookieMatch[1].trim() : "");

  if (!rawToken) {
    return { authenticated: false, user: null };
  }

  const tokenHash = await computeHmacSha256Hex((env && env.AUTH_SECRET) || "factory-default-secret", rawToken);
  if (env && env.SESSION_KV && typeof env.SESSION_KV.get === "function") {
    const cached = await env.SESSION_KV.get(`sess:${tokenHash}`, "json");
    if (cached) return { authenticated: true, user: cached, source: "kv-cache" };
  }

  if (env && env.DB && typeof env.DB.prepare === "function") {
    const row = await env.DB.prepare(
      "SELECT u.id, u.org_id, u.email, u.full_name, u.role FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ?1 AND s.expires_at > ?2 LIMIT 1"
    )
      .bind(tokenHash, new Date().toISOString())
      .first();
    if (row) {
      return { authenticated: true, user: row, source: "d1-sqlite" };
    }
  }

  return { authenticated: false, user: null };
}

/**
 * Cloudflare Durable Object with WebSocket Hibernation API (PartyServer Pattern)
 * Zero duration billing while connections are idle.
 */
export class SaasRealtimeRoom {
  constructor(state, env) {
    this.state = state;
    this.env = env;
  }

  async fetch(request) {
    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response(JSON.stringify({ ok: true, mode: "hibernatable-do-ready" }), {
        status: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" }
      });
    }
    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    this.state.acceptWebSocket(server);
    return new Response(null, { status: 101, webSocket: client });
  }

  async webSocketMessage(ws, message) {
    const safeText = String(message || "").slice(0, 512);
    for (const peer of this.state.getWebSockets()) {
      try {
        peer.send(JSON.stringify({ type: "tenant.broadcast", payload: safeText, ts: Date.now() }));
      } catch {}
    }
  }
}

/**
 * Cloudflare Workflow Blueprint for Durable Multi-Step Onboarding
 */
export class SaasOnboardingWorkflow {
  async run(event, step) {
    const payload = (event && event.payload) || {};
    const profile = await step.do("provision-tenant-workspace", async () => {
      return { email: payload.email, orgSlug: payload.orgSlug || "default-org", provisionedAt: new Date().toISOString() };
    });
    await step.do("notify-n8n-and-transactional-email", async () => {
      return await dispatchN8nWebhook(this.env, "tenant.onboarded", profile);
    });
    return { completed: true, profile };
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const method = request.method.toUpperCase();
    const repo = createD1Repository(env ? env.DB : null);

    // 1. Health & RPC Capabilities Manifest
    if (url.pathname === "/api/health" && method === "GET") {
      return withSecurityHeaders(
        new Response(
          JSON.stringify({
            ok: true,
            project: "{{PROJECT_ID}}",
            stack: "fullstack-saas-edge",
            capabilities: ["hono-rpc", "better-auth", "drizzle-d1", "polar-stripe-mercadopago", "partyserver-do", "cloudflare-workflows", "n8n-hmac"],
            ts: Date.now()
          }),
          { headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } }
        )
      );
    }

    // 2. Better-Auth Session Endpoint (/api/auth/session)
    if (url.pathname === "/api/auth/session" && method === "GET") {
      const session = await verifyAuthSession(request, env);
      return withSecurityHeaders(
        new Response(JSON.stringify({ ok: true, ...session }), {
          status: 200,
          headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
        })
      );
    }

    // 3. State-Mutating Endpoints (Rate-Limited)
    if (["POST", "PUT", "DELETE"].includes(method)) {
      const clientIp = request.headers.get("CF-Connecting-IP") || "127.0.0.1";
      const rate = checkRateLimit(clientIp);
      const rateHeaders = {
        "RateLimit-Limit": String(RATE_LIMIT_MAX_REQUESTS),
        "RateLimit-Remaining": String(rate.remaining)
      };

      if (!rate.allowed) {
        return withSecurityHeaders(
          new Response(JSON.stringify({ ok: false, error: "RATE_LIMIT_EXCEEDED" }), {
            status: 429,
            headers: { "Content-Type": "application/json; charset=utf-8" }
          }),
          rateHeaders
        );
      }

      // 3A. Idempotent Payment Webhook (Stripe / MercadoPago / Polar.sh)
      if (url.pathname === "/api/webhooks/payment" && method === "POST") {
        const rawBody = await request.text();
        const provider = (request.headers.get("x-payment-provider") || "polar").toLowerCase();
        const signatureHeader =
          request.headers.get("x-signature-256") ||
          request.headers.get("webhook-signature") ||
          request.headers.get("x-hub-signature-256") ||
          "";

        const webhookSecret = env && env.PAYMENT_WEBHOOK_SECRET ? String(env.PAYMENT_WEBHOOK_SECRET) : "";
        if (webhookSecret) {
          const expectedHex = await computeHmacSha256Hex(webhookSecret, rawBody);
          const cleanProvided = signatureHeader.replace(/^sha256=/, "").trim();
          if (!timingSafeEqualHex(expectedHex, cleanProvided)) {
            return withSecurityHeaders(
              new Response(JSON.stringify({ ok: false, error: "INVALID_WEBHOOK_SIGNATURE" }), {
                status: 401,
                headers: { "Content-Type": "application/json; charset=utf-8" }
              }),
              rateHeaders
            );
          }
        }

        let eventObj = null;
        try {
          eventObj = JSON.parse(rawBody);
        } catch {
          return withSecurityHeaders(
            new Response(JSON.stringify({ ok: false, error: "INVALID_JSON" }), {
              status: 400,
              headers: { "Content-Type": "application/json; charset=utf-8" }
            }),
            rateHeaders
          );
        }

        const eventId = String(eventObj.id || eventObj.event_id || `evt_${Date.now()}`).slice(0, 120);
        const eventType = String(eventObj.type || eventObj.action || "subscription.updated").slice(0, 80);
        const payloadHash = await computeHmacSha256Hex("payload-fingerprint", rawBody);

        const d1Res = await repo.recordIdempotentPaymentEvent({
          eventId,
          provider,
          eventType,
          payloadHash,
          orgId: eventObj.orgId || eventObj.data?.orgId || null,
          extSubId: eventObj.subscriptionId || eventObj.data?.id || null,
          planId: eventObj.planId || eventObj.data?.plan || "pro",
          status: eventObj.status || "active",
          periodEnd: eventObj.currentPeriodEnd || new Date(Date.now() + 30 * 86400000).toISOString()
        });

        if (!d1Res.duplicate) {
          await dispatchN8nWebhook(env, `payment.${eventType}`, { eventId, provider, eventType });
        }

        return withSecurityHeaders(
          new Response(JSON.stringify({ ok: true, idempotent: true, ...d1Res }), {
            status: 200,
            headers: { "Content-Type": "application/json; charset=utf-8" }
          }),
          rateHeaders
        );
      }

      // 3B. Lead & Trial Signup Endpoint (/api/lead)
      if (url.pathname === "/api/lead" && method === "POST") {
        let body = null;
        try {
          body = await request.json();
        } catch {
          return withSecurityHeaders(
            new Response(JSON.stringify({ ok: false, error: "INVALID_JSON" }), {
              status: 400,
              headers: { "Content-Type": "application/json; charset=utf-8" }
            }),
            rateHeaders
          );
        }

        const fullName = typeof body?.fullName === "string" ? body.fullName.replace(/[<>]/g, "").trim().slice(0, 120) : "";
        const email = typeof body?.email === "string" ? body.email.trim() : "";
        const message = typeof body?.message === "string" ? body.message.replace(/[<>]/g, "").trim().slice(0, 2000) : "";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (!emailRegex.test(email) || email.length > 180) {
          return withSecurityHeaders(
            new Response(JSON.stringify({ ok: false, error: "INVALID_EMAIL" }), {
              status: 422,
              headers: { "Content-Type": "application/json; charset=utf-8" }
            }),
            rateHeaders
          );
        }

        if (env && env.DB && typeof env.DB.prepare === "function") {
          await env.DB.prepare(
            "INSERT INTO leads (full_name, email, message, source, created_at) VALUES (?1, ?2, ?3, ?4, ?5)"
          )
            .bind(fullName, email, message, "fullstack-saas-edge", new Date().toISOString())
            .run();
        }

        const n8nStatus = await dispatchN8nWebhook(env, "lead.submitted", { fullName, email, message });
        return withSecurityHeaders(
          new Response(JSON.stringify({ ok: true, status: "accepted", n8n: n8nStatus.dispatched }), {
            status: 201,
            headers: { "Content-Type": "application/json; charset=utf-8" }
          }),
          rateHeaders
        );
      }
    }

    if (env && env.ASSETS) {
      const assetResponse = await env.ASSETS.fetch(request);
      return withSecurityHeaders(assetResponse);
    }

    return withSecurityHeaders(new Response("Not Found", { status: 404 }));
  }
};
