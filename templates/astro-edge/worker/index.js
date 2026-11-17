/**
 * {{PROJECT_NAME}} — Cloudflare Worker Zero-Trust Edge Entrypoint (Astro 5 + Static Assets)
 *
 * Enforces mandatory SOTA 2026 security headers, Fetch Metadata validation (Sec-Fetch-*),
 * anti-IDOR opaque UUIDv4/ULID route guards, strict Valibot-style boundary & mass-assignment
 * validation, payload size limits, IP sliding-window rate-limiting, Cloudflare Turnstile,
 * parameterized D1 queries (.prepare().bind()), and A10:2025 zero-stack-leak exception handling.
 */

const SECURITY_HEADERS = Object.freeze({
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'inline-speculation-rules' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "X-Frame-Options": "DENY"
});

const MAX_BODY_BYTES = 65536; // 64 KB hard payload ceiling
const ALLOWED_LEAD_KEYS = new Set([
  "fullName",
  "email",
  "message",
  "source",
  "cf-turnstile-response"
]);

const RATE_LIMIT_BUCKETS = new Map();
const MAX_RATE_LIMIT_BUCKETS = 2048;
const RATE_LIMIT_WINDOW_MS = 60000;
const RATE_LIMIT_MAX_REQUESTS = 20;

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

export function validateFetchMetadata(request, allowedOriginHost = "", options = {}) {
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
      const isLocalOrigin = originHost === "localhost" || originHost === "127.0.0.1";
      const isLocalRequestHost = requestHost === "localhost" || requestHost === "127.0.0.1";
      const isDevEnv = String(options?.environment || "").toLowerCase() === "development";
      const allowLocalLoopback = isLocalOrigin && (isLocalRequestHost || isDevEnv);
      if (originHost !== requestHost && !allowLocalLoopback && (!allowedHost || originHost !== allowedHost)) {
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
      // Fall through to bounded isolate limiter if binding throws
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

function validateLeadSchema(payload) {
  // Valibot-compatible strict structural, boundary & anti-mass-assignment validation
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { valid: false, error: "INVALID_PAYLOAD_OBJECT" };
  }
  for (const key of Object.keys(payload)) {
    if (!ALLOWED_LEAD_KEYS.has(key)) {
      return { valid: false, error: "UNDECLARED_PROPERTY_REJECTED" };
    }
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

function timingSafeEqualStr(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length || a.length === 0) {
    return false;
  }
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function verifySlackSignatureWebCrypto(
  rawBody,
  timestampHeader,
  signatureHeader,
  signingSecret,
  nowSec = Math.floor(Date.now() / 1000)
) {
  if (!signingSecret || !timestampHeader || !signatureHeader) {
    return { valid: false, reason: "MISSING_SLACK_SIGNATURE_HEADERS_OR_SECRET" };
  }
  const ts = Number(timestampHeader);
  if (!Number.isFinite(ts) || Math.abs(nowSec - ts) > 300) {
    return { valid: false, reason: "SLACK_TIMESTAMP_EXPIRED_REPLAY_GUARD" };
  }
  const baseString = `v0:${ts}:${String(rawBody || "")}`;
  const hmacHex = await signN8nPayloadHmac(signingSecret, baseString);
  const expectedSig = `v0=${hmacHex}`;
  const valid = timingSafeEqualStr(expectedSig, String(signatureHeader).trim());
  return {
    valid,
    reason: valid ? "SLACK_SIGNATURE_VERIFIED" : "SLACK_SIGNATURE_MISMATCH"
  };
}

export async function verifyTurnstileTokenServerSide(
  token,
  secretKey,
  remoteIp = "",
  fetchImpl = fetch,
  options = {}
) {
  const cleanToken = String(token || "").trim();
  if (!cleanToken) {
    return { valid: false, reason: "TURNSTILE_VERIFICATION_REQUIRED" };
  }
  const cleanSecret = String(secretKey || "").trim();
  if (!cleanSecret) {
    return { valid: false, reason: "TURNSTILE_SECRET_NOT_CONFIGURED" };
  }
  try {
    const idempotencyKey =
      options.idempotencyKey ||
      (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`);
    const formData = new URLSearchParams({
      secret: cleanSecret,
      response: cleanToken,
      idempotency_key: String(idempotencyKey)
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
    if (
      ok &&
      options.expectedHostname &&
      json.hostname &&
      String(json.hostname).toLowerCase() !== String(options.expectedHostname).toLowerCase()
    ) {
      return { valid: false, reason: "TURNSTILE_HOSTNAME_MISMATCH" };
    }
    return { valid: ok, reason: ok ? "TURNSTILE_VERIFIED" : "TURNSTILE_SITEVERIFY_REJECTED" };
  } catch {
    return { valid: false, reason: "TURNSTILE_SITEVERIFY_NETWORK_ERROR" };
  }
}

export function sanitizeAndRedactEdgeTicket(rawText = "") {
  const msg = String(rawText || "")
    .normalize("NFKC")
    .replace(/[\u200B-\u200F\uFEFF]/g, "")
    .trim();
  if (!msg) return { allowed: false, reason: "EMPTY_TICKET_MESSAGE" };
  if (
    /ignore\s+(?:all\s+)?(?:previous|prior|above)\s+(?:instructions|prompts|rules)|ignor(?:a|á|ar|e)\s+(?:todas?\s+)?(?:las?\s+)?(?:instrucciones|reglas|prompts)\s+(?:previas|anteriores)|olvid(?:a|á|ar)\s+(?:todo\s+)?lo\s+anterior|disregard\s+(?:all\s+)?(?:previous|system)|reveal\s+(?:your\s+)?(?:system\s+prompt|api\s+keys|secrets)|DROP\s+TABLE|UNION\s+SELECT|<script|\b(?:CONSTRAINTS\.md|AGENTS\.md)\b.*(?:delete|overwrite|disable|bypass)/i.test(
      msg
    )
  ) {
    return { allowed: false, reason: "BLOCKED_PROMPT_INJECTION" };
  }
  const sanitizedMessage = msg
    .replace(/\b(?:\d[ -]*?){13,16}\b/g, "[REDACTED_CARD_PAN]")
    .replace(/\b\d{2}-\d{7,8}-\d{1}\b/g, "[REDACTED_TAX_ID]")
    .replace(
      /\b(?:sk-[a-zA-Z0-9_-]{16,}|ghp_[a-zA-Z0-9]{20,}|eyJ[a-zA-Z0-9_-]{15,}\.[a-zA-Z0-9_-]{15,})\b/g,
      "[REDACTED_SECRET_TOKEN]"
    )
    .replace(/[<>]/g, "")
    .slice(0, 1500);
  return { allowed: true, sanitizedMessage };
}

export async function dispatchGitHubRepositoryEvent(env, eventType, clientPayload) {
  const ghToken =
    env && typeof env.GITHUB_DISPATCH_TOKEN === "string"
      ? env.GITHUB_DISPATCH_TOKEN.trim()
      : env && typeof env.GITHUB_TOKEN === "string"
        ? env.GITHUB_TOKEN.trim()
        : "";
  const repo =
    env && typeof env.GITHUB_REPOSITORY === "string" && env.GITHUB_REPOSITORY.includes("/")
      ? env.GITHUB_REPOSITORY.trim()
      : "thunderalbatros/web-software-factory";
  if (!ghToken) {
    return { dispatched: false, reason: "GITHUB_DISPATCH_TOKEN_NOT_CONFIGURED", eventType };
  }
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/dispatches`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ghToken}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json; charset=utf-8",
        "User-Agent": "WebSoftwareFactory-EdgeWorker/2026.34"
      },
      body: JSON.stringify({
        event_type: eventType,
        client_payload: clientPayload
      }),
      signal: AbortSignal.timeout(4500)
    });
    return { dispatched: res.ok || res.status === 204, status: res.status, eventType };
  } catch {
    return { dispatched: false, reason: "GITHUB_API_NETWORK_ERROR", eventType };
  }
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
        if (url.pathname !== "/api/slack-webhook") {
          const fetchMeta = validateFetchMetadata(request, env && env.ALLOWED_ORIGIN, {
            environment: env && env.ENVIRONMENT
          });
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
        if (declaredLength > MAX_BODY_BYTES) {
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
          if (!env || env.TURNSTILE_REQUIRED !== "false") {
            const turnstileCheck = await verifyTurnstileTokenServerSide(
              turnstileToken,
              env && env.TURNSTILE_SECRET_KEY,
              clientIp,
              fetch,
              { expectedHostname: env && env.TURNSTILE_EXPECTED_HOSTNAME }
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
              "INSERT INTO leads (id, email, message, created_at) VALUES (?1, ?2, ?3, ?4)"
            )
              .bind(leadId, validation.data.email, validation.data.message, new Date().toISOString())
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

        if ((url.pathname === "/api/client-feedback" || url.pathname === "/api/slack-webhook") && method === "POST") {
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
          const isSlackRoute =
            url.pathname === "/api/slack-webhook" || Boolean(request.headers.get("X-Slack-Signature"));

          let slackSignatureVerified = false;
          const tsHeader = request.headers.get("X-Slack-Request-Timestamp") || "";
          if (isSlackRoute) {
            if (!env || !env.SLACK_SIGNING_SECRET) {
              return withSecurityHeaders(
                new Response(JSON.stringify({ ok: false, error: "SLACK_SIGNING_SECRET_NOT_CONFIGURED" }), {
                  status: 503,
                  headers: { "Content-Type": "application/json; charset=utf-8" }
                }),
                rateHeaders
              );
            }
            const sigCheck = await verifySlackSignatureWebCrypto(
              rawBodyText,
              tsHeader,
              request.headers.get("X-Slack-Signature") || "",
              String(env.SLACK_SIGNING_SECRET)
            );
            if (!sigCheck.valid) {
              return withSecurityHeaders(
                new Response(JSON.stringify({ ok: false, error: sigCheck.reason }), {
                  status: 401,
                  headers: { "Content-Type": "application/json; charset=utf-8" }
                }),
                rateHeaders
              );
            }
            slackSignatureVerified = true;
          }

          let body = null;
          const contentType = (request.headers.get("Content-Type") || "").toLowerCase();
          try {
            if (contentType.includes("application/x-www-form-urlencoded")) {
              const params = new URLSearchParams(rawBodyText);
              if (params.has("payload")) {
                body = JSON.parse(params.get("payload") || "{}");
              } else {
                body = {
                  type: "slash_command",
                  command: params.get("command") || "/feedback",
                  text: params.get("text") || "",
                  user_name: params.get("user_name") || "slack-user"
                };
              }
            } else {
              body = JSON.parse(rawBodyText);
            }
          } catch {
            return withSecurityHeaders(
              new Response(JSON.stringify({ ok: false, error: "INVALID_JSON" }), {
                status: 400,
                headers: { "Content-Type": "application/json; charset=utf-8" }
              }),
              rateHeaders
            );
          }

          if (body && (body.type === "url_verification" || body.type === "block_actions") && !slackSignatureVerified) {
            return withSecurityHeaders(
              new Response(JSON.stringify({ ok: false, error: "SLACK_SIGNATURE_REQUIRED_FOR_INTERACTIVE_ACTION" }), {
                status: 401,
                headers: { "Content-Type": "application/json; charset=utf-8" }
              }),
              rateHeaders
            );
          }

          if (body && body.type === "url_verification" && typeof body.challenge === "string") {
            return withSecurityHeaders(
              new Response(JSON.stringify({ challenge: body.challenge }), {
                status: 200,
                headers: { "Content-Type": "application/json; charset=utf-8" }
              }),
              rateHeaders
            );
          }

          if (body && body.type === "block_actions" && Array.isArray(body.actions) && body.actions.length > 0) {
            const actionObj = body.actions[0] || {};
            const actionId = String(actionObj.action_id || "approve_ticket_fix");
            const ticketId = String(actionObj.value || "tkt-pending").replace(/[^a-zA-Z0-9_-]/g, "");
            if (actionId === "approve_ticket_fix") {
              const approvalTimestamp = tsHeader || String(Math.floor(Date.now() / 1000));
              const approvalSignature = await signN8nPayloadHmac(
                String(env.SLACK_SIGNING_SECRET),
                `approve:${ticketId}:${approvalTimestamp}`
              );
              const dispatchPromise = dispatchGitHubRepositoryEvent(env, "cto_slack_ticket_approved", {
                ticketId,
                actionId,
                slackSignatureVerified: true,
                approvalTimestamp,
                approvalSignature,
                approver: body.user?.username || "cto-slack"
              });
              if (ctx && typeof ctx.waitUntil === "function") {
                ctx.waitUntil(dispatchPromise);
              }
            }
            return withSecurityHeaders(
              new Response(
                JSON.stringify({
                  ok: true,
                  status: actionId === "approve_ticket_fix" ? "cto_approval_dispatched" : "cto_action_recorded",
                  actionId,
                  ticketId
                }),
                { status: 200, headers: { "Content-Type": "application/json; charset=utf-8" } }
              ),
              rateHeaders
            );
          }

          if (!isSlackRoute && env && env.TURNSTILE_REQUIRED === "true") {
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

          const rawMsg =
            typeof body?.message === "string"
              ? body.message
              : typeof body?.event?.text === "string"
                ? body.event.text
                : typeof body?.text === "string"
                  ? body.text
                  : "";
          const edgeSanitized = sanitizeAndRedactEdgeTicket(rawMsg);
          if (!edgeSanitized.allowed) {
            return withSecurityHeaders(
              new Response(
                JSON.stringify({
                  ok: false,
                  error: "BLOCKED_BY_ZERO_TRUST_TRIAGE",
                  reason: edgeSanitized.reason
                }),
                {
                  status: 422,
                  headers: { "Content-Type": "application/json; charset=utf-8" }
                }
              ),
              rateHeaders
            );
          }

          const rawSelector = String(body?.sectionSelector || "#main").trim();
          const safeSelector = /^#[a-zA-Z0-9_-]{1,64}$/.test(rawSelector) ? rawSelector : "#main";
          const rawViewport = String(body?.viewport || "1440x900").trim();
          const safeViewport = /^\d{3,4}x\d{3,4}$/.test(rawViewport) ? rawViewport : "1440x900";
          let safePageUrl = "https://example.pages.dev";
          try {
            const parsedPage = new URL(String(body?.pageUrl || safePageUrl));
            if (parsedPage.protocol === "https:") safePageUrl = parsedPage.toString().slice(0, 200);
          } catch {}

          const ticketId = `tkt-${crypto.randomUUID().slice(0, 8)}`;
          const dispatchTask = dispatchGitHubRepositoryEvent(env, "slack_client_ticket_triage", {
            ticketId,
            projectSlug: "{{PROJECT_ID}}",
            sourceChannel: isSlackRoute ? "slack_webhook" : "client_feedback_widget",
            sectionSelector: safeSelector,
            pageUrl: safePageUrl,
            viewport: safeViewport,
            message: edgeSanitized.sanitizedMessage
          });
          if (ctx && typeof ctx.waitUntil === "function") {
            ctx.waitUntil(dispatchTask);
          }

          return withSecurityHeaders(
            new Response(
              JSON.stringify({
                ok: true,
                status: "queued_for_sandbox_triage",
                triageStage: "WAITING_CTO_TRIAGE_APPROVAL",
                ticketId,
                productionModified: false
              }),
              {
                status: isSlackRoute ? 200 : 202,
                headers: { "Content-Type": "application/json; charset=utf-8" }
              }
            ),
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
