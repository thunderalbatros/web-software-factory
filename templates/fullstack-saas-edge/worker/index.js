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
    "default-src 'self'; script-src 'self' 'inline-speculation-rules' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' https://challenges.cloudflare.com wss:; frame-src https://challenges.cloudflare.com https://buy.stripe.com https://polar.sh; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), payment=(self), usb=(), interest-cohort=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "X-Frame-Options": "DENY"
});

const MAX_BODY_BYTES = 65536; // 64 KB hard payload ceiling
const MAX_WEBHOOK_BYTES = 262144; // 256 KB signed webhook ceiling
const ALLOWED_LEAD_KEYS = new Set(["fullName", "email", "message", "source", "cf-turnstile-response"]);

const RATE_LIMIT_BUCKETS = new Map();
const MAX_RATE_LIMIT_BUCKETS = 2048;
const RATE_LIMIT_WINDOW_MS = 60000;
const RATE_LIMIT_MAX_REQUESTS = 30;

export function withSecurityHeaders(response, extraHeaders = {}) {
  const headers = new Headers(response.headers);
  headers.delete("Server");
  headers.delete("X-Powered-By");
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

export function validateFetchMetadata(request, allowedOriginHost = "") {
  const secSite = (request.headers.get("Sec-Fetch-Site") || "").toLowerCase();
  const secMode = (request.headers.get("Sec-Fetch-Mode") || "").toLowerCase();
  const secDest = (request.headers.get("Sec-Fetch-Dest") || "").toLowerCase();
  const originHeader = request.headers.get("Origin") || "";

  if (secSite && !["same-origin", "same-site", "none"].includes(secSite)) {
    return { allowed: false, reason: "CROSS_SITE_FETCH_REJECTED" };
  }
  if (secMode && secMode === "navigate" && request.method.toUpperCase() !== "GET") {
    return { allowed: false, reason: "INVALID_FETCH_MODE_FOR_MUTATION" };
  }
  if (secDest && !["empty", "document", ""].includes(secDest)) {
    return { allowed: false, reason: "INVALID_FETCH_DEST" };
  }
  if (originHeader && ["POST", "PUT", "DELETE"].includes(request.method.toUpperCase())) {
    try {
      const originHost = new URL(originHeader).hostname.toLowerCase();
      const requestHost = new URL(request.url).hostname.toLowerCase();
      const allowedHost = allowedOriginHost ? String(allowedOriginHost).toLowerCase() : "";
      const isLocal = originHost === "localhost" || originHost === "127.0.0.1";
      if (originHost !== requestHost && !isLocal && (!allowedHost || originHost !== allowedHost)) {
        return { allowed: false, reason: "CROSS_ORIGIN_MISMATCH_REJECTED" };
      }
    } catch {
      return { allowed: false, reason: "INVALID_ORIGIN_HEADER" };
    }
  }
  return { allowed: true };
}

export function hasSequentialNumericIdInPath(pathname) {
  return /\/api\/[a-z0-9_-]+\/\d+(?:\/|$)/i.test(String(pathname || ""));
}

async function checkRateLimit(clientIp, env = null) {
  if (env && env.RATE_LIMITER && typeof env.RATE_LIMITER.limit === "function") {
    try {
      const outcome = await env.RATE_LIMITER.limit({ key: String(clientIp || "unknown") });
      return {
        allowed: Boolean(outcome && outcome.success !== false),
        remaining: outcome && outcome.success !== false ? RATE_LIMIT_MAX_REQUESTS - 1 : 0
      };
    } catch {
      // Fall through to bounded isolate limiter
    }
  }
  const now = Date.now();
  const bucket = RATE_LIMIT_BUCKETS.get(clientIp);
  if (!bucket || now - bucket.windowStart > RATE_LIMIT_WINDOW_MS) {
    if (RATE_LIMIT_BUCKETS.size >= MAX_RATE_LIMIT_BUCKETS) {
      for (const [k, b] of RATE_LIMIT_BUCKETS.entries()) {
        if (now - b.windowStart > RATE_LIMIT_WINDOW_MS) {
          RATE_LIMIT_BUCKETS.delete(k);
        }
      }
      if (RATE_LIMIT_BUCKETS.size >= MAX_RATE_LIMIT_BUCKETS) {
        const oldestKey = RATE_LIMIT_BUCKETS.keys().next().value;
        if (oldestKey !== undefined) RATE_LIMIT_BUCKETS.delete(oldestKey);
      }
    }
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

const PROMPT_INJECTION_PATTERNS = [
  /ignore\s+(?:all\s+)?(?:previous|prior)\s+instructions/i,
  /ignor(?:a|á|ar|e)\s+(?:todas?\s+)?(?:las?\s+)?(?:instrucciones|reglas|prompts)\s+(?:previas|anteriores)/i,
  /olvid(?:a|á|ar)\s+(?:todo\s+)?lo\s+anterior/i,
  /system\s*prompt/i,
  /<script\b[^>]*>/i,
  /\b(?:rm\s+-rf|curl\s+http|wget\s+http|child_process|execSync)\b/i,
  /override\s+security\s+gate/i
];

export async function verifyTurnstileTokenServerSide(token, secretKey, remoteIp = "", fetchImpl = fetch) {
  const cleanToken = String(token || "").trim();
  if (!cleanToken) {
    return { valid: false, reason: "TURNSTILE_VERIFICATION_REQUIRED" };
  }
  const cleanSecret = String(secretKey || "").trim();
  if (!cleanSecret) {
    return { valid: false, reason: "TURNSTILE_SECRET_NOT_CONFIGURED" };
  }
  try {
    const formData = new URLSearchParams({
      secret: cleanSecret,
      response: cleanToken
    });
    if (remoteIp) formData.set("remoteip", String(remoteIp));
    const res = await fetchImpl("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
      signal: AbortSignal.timeout(1500)
    });
    if (!res.ok) {
      return { valid: false, reason: "TURNSTILE_SITEVERIFY_HTTP_ERROR" };
    }
    const json = await res.json();
    const ok = Boolean(json && json.success === true);
    return { valid: ok, reason: ok ? "TURNSTILE_VERIFIED" : "TURNSTILE_SITEVERIFY_REJECTED" };
  } catch {
    return { valid: false, reason: "TURNSTILE_SITEVERIFY_NETWORK_ERROR" };
  }
}

export async function verifySlackSignatureWebCrypto(
  rawBody,
  timestampHeader,
  signatureHeader,
  signingSecret,
  nowSec = Math.floor(Date.now() / 1000)
) {
  if (!signingSecret || !timestampHeader || !signatureHeader || typeof rawBody !== "string") {
    return { valid: false, reason: "MISSING_SLACK_AUTH_HEADERS_OR_SECRET" };
  }
  const ts = Number(timestampHeader);
  if (!Number.isFinite(ts) || Math.abs(nowSec - ts) > 300) {
    return { valid: false, reason: "SLACK_TIMESTAMP_EXPIRED_REPLAY_GUARD" };
  }
  const sigBaseString = `v0:${ts}:${rawBody}`;
  const hex = await computeHmacSha256Hex(signingSecret, sigBaseString);
  const expectedSignature = `v0=${hex}`;
  if (!timingSafeEqualHex(expectedSignature, String(signatureHeader).trim())) {
    return { valid: false, reason: "INVALID_SLACK_HMAC_SIGNATURE" };
  }
  return { valid: true, reason: "VERIFIED_SLACK_HMAC_SHA256" };
}

export function sanitizeAndRedactEdgeTicket(rawText) {
  const text = String(rawText || "")
    .normalize("NFKC")
    .replace(/[\u200B-\u200F\uFEFF]/g, "")
    .trim()
    .slice(0, 2000);
  if (!text) return { safe: false, reason: "EMPTY_TICKET_MESSAGE", sanitizedText: "" };
  for (const rx of PROMPT_INJECTION_PATTERNS) {
    if (rx.test(text)) {
      return { safe: false, reason: `PROMPT_INJECTION_BLOCKED:${rx.source}`, sanitizedText: "" };
    }
  }
  const redacted = text
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "[REDACTED_EMAIL]")
    .replace(/\b(?:\d[ -]*?){13,19}\b/g, "[REDACTED_CARD]")
    .replace(/[<>]/g, "");
  return { safe: true, reason: "OK", sanitizedText: redacted };
}

export async function dispatchGitHubRepositoryEvent(env, eventType, clientPayload) {
  const token = env && env.GITHUB_PAT_DISPATCH ? String(env.GITHUB_PAT_DISPATCH).trim() : "";
  const repo = env && env.GITHUB_REPO ? String(env.GITHUB_REPO).trim() : "tomas/web-software-factory";
  if (!token) {
    return { dispatched: false, mode: "LOCAL_QUEUE_FALLBACK", eventType, clientPayload };
  }
  const res = await fetch(`https://api.github.com/repos/${repo}/dispatches`, {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "WebSoftwareFactory-Edge-Receptionist/2.0",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ event_type: eventType, client_payload: clientPayload })
  });
  return { dispatched: res.ok, status: res.status, eventType };
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

  async webSocketMessage(_ws, message) {
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
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const method = request.method.toUpperCase();

      if (hasSequentialNumericIdInPath(url.pathname)) {
        return withSecurityHeaders(
          new Response(JSON.stringify({ ok: false, error: "OPAQUE_UUID_OR_ULID_REQUIRED" }), {
            status: 400,
            headers: { "Content-Type": "application/json; charset=utf-8" }
          })
        );
      }

      const session = await verifyAuthSession(request, env);
      const verifiedTenantId = session.authenticated && session.user ? session.user.org_id : null;
      const repo = createD1Repository(env ? env.DB : null, verifiedTenantId);

      // 1. Health & RPC Capabilities Manifest
      if (url.pathname === "/api/health" && method === "GET") {
        return withSecurityHeaders(
          new Response(
            JSON.stringify({
              ok: true,
              project: "{{PROJECT_ID}}",
              stack: "fullstack-saas-edge",
              capabilities: ["hono-rpc", "better-auth", "drizzle-d1", "polar-stripe-mercadopago", "partyserver-do", "cloudflare-workflows", "n8n-hmac", "slack-hitl-receptionist"],
              ts: Date.now()
            }),
            { headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } }
          )
        );
      }

      // 2. Better-Auth Session Endpoint (/api/auth/session)
      if (url.pathname === "/api/auth/session" && method === "GET") {
        return withSecurityHeaders(
          new Response(JSON.stringify({ ok: true, ...session }), {
            status: 200,
            headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
          })
        );
      }

      // 3. State-Mutating Endpoints (Rate-Limited + Fetch Metadata Guard)
      if (["POST", "PUT", "DELETE"].includes(method)) {
        if (url.pathname !== "/api/webhooks/payment" && url.pathname !== "/api/slack-webhook") {
          const fetchMeta = validateFetchMetadata(request, env && env.ALLOWED_ORIGIN);
          if (!fetchMeta.allowed) {
            return withSecurityHeaders(
              new Response(JSON.stringify({ ok: false, error: fetchMeta.reason }), {
                status: 403,
                headers: { "Content-Type": "application/json; charset=utf-8" }
              })
            );
          }
        }

        const declaredLength = Number(request.headers.get("Content-Length") || 0);
        const bodyLimit = url.pathname === "/api/webhooks/payment" ? MAX_WEBHOOK_BYTES : MAX_BODY_BYTES;
        if (declaredLength > bodyLimit) {
          return withSecurityHeaders(
            new Response(JSON.stringify({ ok: false, error: "PAYLOAD_TOO_LARGE" }), {
              status: 413,
              headers: { "Content-Type": "application/json; charset=utf-8" }
            })
          );
        }

        const clientIp = request.headers.get("CF-Connecting-IP") || "127.0.0.1";
        const rate = await checkRateLimit(clientIp, env);
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
          if (rawBody.length > MAX_WEBHOOK_BYTES) {
            return withSecurityHeaders(
              new Response(JSON.stringify({ ok: false, error: "PAYLOAD_TOO_LARGE" }), {
                status: 413,
                headers: { "Content-Type": "application/json; charset=utf-8" }
              }),
              rateHeaders
            );
          }
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

          const eventId = String(eventObj.id || eventObj.event_id || `evt_${crypto.randomUUID()}`).slice(0, 120);
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
          const rawBodyText = await request.text();
          if (rawBodyText.length > MAX_BODY_BYTES) {
            return withSecurityHeaders(
              new Response(JSON.stringify({ ok: false, error: "PAYLOAD_TOO_LARGE" }), {
                status: 413,
                headers: { "Content-Type": "application/json; charset=utf-8" }
              }),
              rateHeaders
            );
          }

          let body = null;
          try {
            body = JSON.parse(rawBodyText);
          } catch {
            return withSecurityHeaders(
              new Response(JSON.stringify({ ok: false, error: "INVALID_JSON" }), {
                status: 400,
                headers: { "Content-Type": "application/json; charset=utf-8" }
              }),
              rateHeaders
            );
          }

          if (!body || typeof body !== "object" || Array.isArray(body)) {
            return withSecurityHeaders(
              new Response(JSON.stringify({ ok: false, error: "INVALID_PAYLOAD_OBJECT" }), {
                status: 422,
                headers: { "Content-Type": "application/json; charset=utf-8" }
              }),
              rateHeaders
            );
          }

          for (const key of Object.keys(body)) {
            if (!ALLOWED_LEAD_KEYS.has(key)) {
              return withSecurityHeaders(
                new Response(JSON.stringify({ ok: false, error: "UNDECLARED_PROPERTY_REJECTED" }), {
                  status: 422,
                  headers: { "Content-Type": "application/json; charset=utf-8" }
                }),
                rateHeaders
              );
            }
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

          if (env && env.TURNSTILE_REQUIRED === "true") {
            const turnstileToken =
              (typeof body["cf-turnstile-response"] === "string" ? body["cf-turnstile-response"].trim() : "") ||
              request.headers.get("cf-turnstile-response") ||
              "";
            const turnstileCheck = await verifyTurnstileTokenServerSide(
              turnstileToken,
              env.TURNSTILE_SECRET_KEY,
              clientIp
            );
            if (!turnstileCheck.valid) {
              return withSecurityHeaders(
                new Response(JSON.stringify({ ok: false, error: turnstileCheck.reason }), {
                  status: 403,
                  headers: { "Content-Type": "application/json; charset=utf-8" }
                }),
                rateHeaders
              );
            }
          }

          if (env && env.DB && typeof env.DB.prepare === "function") {
            const leadId = crypto.randomUUID();
            await env.DB.prepare(
              "INSERT INTO leads (id, full_name, email, message, source, created_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6)"
            )
              .bind(leadId, fullName, email, message, "fullstack-saas-edge", new Date().toISOString())
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

        // 3C. Serverless 24/7 Receptionist (/api/slack-webhook & /api/client-feedback)
        if (url.pathname === "/api/slack-webhook" && method === "POST") {
          const rawBody = await request.text();
          if (rawBody.length > MAX_BODY_BYTES) {
            return withSecurityHeaders(
              new Response(JSON.stringify({ ok: false, error: "PAYLOAD_TOO_LARGE" }), {
                status: 413,
                headers: { "Content-Type": "application/json; charset=utf-8" }
              }),
              rateHeaders
            );
          }
          const sigHeader = request.headers.get("X-Slack-Signature") || "";
          const tsHeader = request.headers.get("X-Slack-Request-Timestamp") || "";
          const secret = env && env.SLACK_SIGNING_SECRET ? String(env.SLACK_SIGNING_SECRET) : "";
          if (!secret) {
            return withSecurityHeaders(
              new Response(JSON.stringify({ ok: false, error: "SLACK_SIGNING_SECRET_NOT_CONFIGURED" }), {
                status: 503,
                headers: { "Content-Type": "application/json; charset=utf-8" }
              }),
              rateHeaders
            );
          }
          const sigCheck = await verifySlackSignatureWebCrypto(rawBody, tsHeader, sigHeader, secret);
          if (!sigCheck.valid) {
            return withSecurityHeaders(
              new Response(JSON.stringify({ ok: false, error: sigCheck.reason }), {
                status: 401,
                headers: { "Content-Type": "application/json; charset=utf-8" }
              }),
              rateHeaders
            );
          }
          let parsed = {};
          if (rawBody.trim().startsWith("{")) {
            parsed = JSON.parse(rawBody);
          } else {
            const params = new URLSearchParams(rawBody);
            parsed = params.has("payload") ? JSON.parse(params.get("payload")) : Object.fromEntries(params.entries());
          }
          if (parsed.type === "url_verification" && parsed.challenge) {
            return withSecurityHeaders(
              new Response(JSON.stringify({ challenge: parsed.challenge }), {
                status: 200,
                headers: { "Content-Type": "application/json; charset=utf-8" }
              }),
              rateHeaders
            );
          }
          if (parsed.type === "block_actions" && Array.isArray(parsed.actions)) {
            const action = parsed.actions[0] || {};
            const ticketId = String(action.value || "").replace(/[^a-zA-Z0-9_-]/g, "").trim();
            const actionId = String(action.action_id || "approve_fix");
            const approvalTimestamp = tsHeader || String(Math.floor(Date.now() / 1000));
            const approvalSignature = await computeHmacSha256Hex(secret, `approve:${ticketId}:${approvalTimestamp}`);
            const payload = {
              ticketId,
              actionId,
              slackSignatureVerified: true,
              approvalTimestamp,
              approvalSignature,
              source: "slack_block_actions"
            };
            if (ctx && typeof ctx.waitUntil === "function") {
              ctx.waitUntil(dispatchGitHubRepositoryEvent(env, "cto_slack_ticket_approved", payload));
            }
            return withSecurityHeaders(
              new Response(JSON.stringify({ ok: true, status: "cto_decision_dispatched", ticketId, actionId }), {
                status: 200,
                headers: { "Content-Type": "application/json; charset=utf-8" }
              }),
              rateHeaders
            );
          }
          const rawText = parsed.text || (parsed.event && parsed.event.text) || "";
          const sanitized = sanitizeAndRedactEdgeTicket(rawText);
          if (!sanitized.safe) {
            return withSecurityHeaders(
              new Response(JSON.stringify({ ok: false, error: sanitized.reason }), {
                status: 422,
                headers: { "Content-Type": "application/json; charset=utf-8" }
              }),
              rateHeaders
            );
          }
          const ticketPayload = {
            ticketId: `tkt-${Date.now().toString(36)}`,
            message: sanitized.sanitizedText,
            source: "slack_webhook",
            channel: parsed.channel_id || (parsed.event && parsed.event.channel) || "slack"
          };
          if (ctx && typeof ctx.waitUntil === "function") {
            ctx.waitUntil(dispatchGitHubRepositoryEvent(env, "slack_client_ticket_triage", ticketPayload));
          }
          return withSecurityHeaders(
            new Response(JSON.stringify({ ok: true, status: "ticket_queued_for_readonly_triage", ticketId: ticketPayload.ticketId }), {
              status: 200,
              headers: { "Content-Type": "application/json; charset=utf-8" }
            }),
            rateHeaders
          );
        }

        if (url.pathname === "/api/client-feedback" && method === "POST") {
          const rawBodyText = await request.text();
          if (rawBodyText.length > MAX_BODY_BYTES) {
            return withSecurityHeaders(
              new Response(JSON.stringify({ ok: false, error: "PAYLOAD_TOO_LARGE" }), {
                status: 413,
                headers: { "Content-Type": "application/json; charset=utf-8" }
              }),
              rateHeaders
            );
          }
          let body = {};
          try {
            body = JSON.parse(rawBodyText);
          } catch {
            return withSecurityHeaders(
              new Response(JSON.stringify({ ok: false, error: "INVALID_JSON" }), {
                status: 400,
                headers: { "Content-Type": "application/json; charset=utf-8" }
              }),
              rateHeaders
            );
          }
          if (body && (body.type === "block_actions" || body.type === "url_verification")) {
            return withSecurityHeaders(
              new Response(JSON.stringify({ ok: false, error: "SLACK_SIGNATURE_REQUIRED_FOR_INTERACTIVE_ACTION" }), {
                status: 401,
                headers: { "Content-Type": "application/json; charset=utf-8" }
              }),
              rateHeaders
            );
          }
          if (env && env.TURNSTILE_REQUIRED === "true") {
            const fbToken =
              (typeof body?.["cf-turnstile-response"] === "string" ? body["cf-turnstile-response"] : "") ||
              request.headers.get("cf-turnstile-response") ||
              "";
            const turnstileCheck = await verifyTurnstileTokenServerSide(
              fbToken,
              env.TURNSTILE_SECRET_KEY,
              clientIp
            );
            if (!turnstileCheck.valid) {
              return withSecurityHeaders(
                new Response(JSON.stringify({ ok: false, error: turnstileCheck.reason }), {
                  status: 403,
                  headers: { "Content-Type": "application/json; charset=utf-8" }
                }),
                rateHeaders
              );
            }
          }
          const sanitized = sanitizeAndRedactEdgeTicket(body && (body.message || body.text));
          if (!sanitized.safe) {
            return withSecurityHeaders(
              new Response(JSON.stringify({ ok: false, error: sanitized.reason }), {
                status: 422,
                headers: { "Content-Type": "application/json; charset=utf-8" }
              }),
              rateHeaders
            );
          }
          const ticketPayload = {
            ticketId: `tkt-${Date.now().toString(36)}`,
            message: sanitized.sanitizedText,
            source: "client_web_widget",
            pageUrl: String((body && body.pageUrl) || "/").slice(0, 240),
            viewport: String((body && body.viewport) || "1440x900").slice(0, 40)
          };
          if (ctx && typeof ctx.waitUntil === "function") {
            ctx.waitUntil(dispatchGitHubRepositoryEvent(env, "slack_client_ticket_triage", ticketPayload));
          }
          return withSecurityHeaders(
            new Response(JSON.stringify({ ok: true, status: "ticket_queued_for_readonly_triage", ticketId: ticketPayload.ticketId }), {
              status: 200,
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
    } catch {
      return withSecurityHeaders(
        new Response(JSON.stringify({ ok: false, error: "INTERNAL_EDGE_ERROR" }), {
          status: 500,
          headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
        })
      );
    }
  }
};
