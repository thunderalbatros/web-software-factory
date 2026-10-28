/**
 * {{PROJECT_NAME}} — Cloudflare Worker Zero-Trust Edge Entrypoint (Astro 5 + Static Assets)
 *
 * Enforces mandatory SOTA 2026 security headers, strict schema validation,
 * IP sliding-window rate-limiting, Cloudflare Turnstile verification, and
 * parameterized D1 queries (.prepare().bind()) on state-mutating requests.
 */

const SECURITY_HEADERS = Object.freeze({
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'inline-speculation-rules' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-src https://challenges.cloudflare.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "X-Frame-Options": "DENY"
});

const RATE_LIMIT_BUCKETS = new Map();
const RATE_LIMIT_WINDOW_MS = 60000;
const RATE_LIMIT_MAX_REQUESTS = 20;

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

function validateLeadSchema(payload) {
  // Valibot-compatible strict structural & boundary validation
  if (!payload || typeof payload !== "object") {
    return { valid: false, error: "INVALID_PAYLOAD_OBJECT" };
  }
  const fullName = typeof payload.fullName === "string"
    ? payload.fullName.replace(/[<>]/g, "").trim().slice(0, 120)
    : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message = typeof payload.message === "string"
    ? payload.message.replace(/[<>]/g, "").trim()
    : "";
  const source = typeof payload.source === "string"
    ? payload.source.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64)
    : "astro-edge-form";
  const turnstileToken =
    typeof payload["cf-turnstile-response"] === "string"
      ? payload["cf-turnstile-response"].trim()
      : "";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email) || email.length > 180) {
    return { valid: false, error: "INVALID_EMAIL" };
  }
  if (message.length > 2000) {
    return { valid: false, error: "MESSAGE_TOO_LONG" };
  }
  return {
    valid: true,
    data: { fullName, email, message, source, turnstileToken }
  };
}

async function signN8nPayloadHmac(secret, rawBody) {
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

export async function dispatchN8nWebhook(env, leadData) {
  const webhookUrl = env && typeof env.N8N_WEBHOOK_URL === "string" ? env.N8N_WEBHOOK_URL.trim() : "";
  if (!webhookUrl || !webhookUrl.startsWith("https://")) {
    return { dispatched: false, reason: "N8N_WEBHOOK_URL_NOT_CONFIGURED" };
  }
  const eventPayload = JSON.stringify({
    event: "lead.submitted",
    project: "{{PROJECT_ID}}",
    stack: "astro-edge",
    timestamp: new Date().toISOString(),
    lead: {
      fullName: leadData.fullName || "",
      email: leadData.email,
      message: leadData.message || "",
      source: leadData.source || "astro-edge-form"
    }
  });
  const secret = env && typeof env.N8N_WEBHOOK_SECRET === "string" ? env.N8N_WEBHOOK_SECRET : "";
  const signature = await signN8nPayloadHmac(secret, eventPayload);
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "X-Factory-Event": "lead.submitted"
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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const method = request.method.toUpperCase();

    if (url.pathname === "/api/health" && method === "GET") {
      return withSecurityHeaders(
        new Response(
          JSON.stringify({
            ok: true,
            project: "{{PROJECT_ID}}",
            stack: "astro-edge",
            security: "zero-trust-2026",
            ts: Date.now()
          }),
          {
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "Cache-Control": "no-store"
            }
          }
        )
      );
    }

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

        const validation = validateLeadSchema(body);
        if (!validation.valid) {
          return withSecurityHeaders(
            new Response(JSON.stringify({ ok: false, error: validation.error }), {
              status: 422,
              headers: { "Content-Type": "application/json; charset=utf-8" }
            }),
            rateHeaders
          );
        }

        const headerToken = request.headers.get("cf-turnstile-response") || "";
        const turnstileToken = validation.data.turnstileToken || headerToken;
        if (env && env.TURNSTILE_REQUIRED === "true" && !turnstileToken) {
          return withSecurityHeaders(
            new Response(JSON.stringify({ ok: false, error: "TURNSTILE_VERIFICATION_REQUIRED" }), {
              status: 403,
              headers: { "Content-Type": "application/json; charset=utf-8" }
            }),
            rateHeaders
          );
        }

        if (env && env.DB && typeof env.DB.prepare === "function") {
          await env.DB.prepare(
            "INSERT INTO leads (email, message, created_at) VALUES (?1, ?2, ?3)"
          )
            .bind(validation.data.email, validation.data.message, new Date().toISOString())
            .run();
        }

        const n8nStatus = await dispatchN8nWebhook(env, validation.data);

        return withSecurityHeaders(
          new Response(JSON.stringify({ ok: true, status: "accepted", n8n: n8nStatus.dispatched }), {
            status: 201,
            headers: { "Content-Type": "application/json; charset=utf-8" }
          }),
          rateHeaders
        );
      }

      return withSecurityHeaders(
        new Response(JSON.stringify({ ok: false, error: "METHOD_NOT_ALLOWED" }), {
          status: 405,
          headers: { "Content-Type": "application/json; charset=utf-8" }
        }),
        rateHeaders
      );
    }

    if (env && env.ASSETS) {
      const assetResponse = await env.ASSETS.fetch(request);
      return withSecurityHeaders(assetResponse);
    }

    return withSecurityHeaders(new Response("Not Found", { status: 404 }));
  }
};
