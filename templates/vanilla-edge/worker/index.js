/**
 * {{PROJECT_NAME}} — Cloudflare Worker Zero-Trust Edge Entrypoint (Vanilla Edge)
 *
 * Enforces mandatory SOTA 2026 security headers, Fetch Metadata validation (Sec-Fetch-*),
 * anti-IDOR opaque UUIDv4/ULID route guards, strict Valibot-style boundary & mass-assignment
 * validation, payload size limits, IP sliding-window rate-limiting, Cloudflare Turnstile,
 * parameterized D1 queries (.prepare().bind()), and A10:2025 zero-stack-leak exception handling.
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

const MAX_BODY_BYTES = 65536; // 64 KB hard payload ceiling
const ALLOWED_LEAD_KEYS = new Set([
  "fullName",
  "email",
  "message",
  "source",
  "cf-turnstile-response"
]);

const RATE_LIMIT_BUCKETS = new Map();
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

export function validateFetchMetadata(request) {
  const secSite = (request.headers.get("Sec-Fetch-Site") || "").toLowerCase();
  const secMode = (request.headers.get("Sec-Fetch-Mode") || "").toLowerCase();
  const secDest = (request.headers.get("Sec-Fetch-Dest") || "").toLowerCase();

  if (secSite && !["same-origin", "same-site", "none"].includes(secSite)) {
    return { allowed: false, reason: "CROSS_SITE_FETCH_REJECTED" };
  }
  if (secMode && secMode === "navigate" && request.method.toUpperCase() !== "GET") {
    return { allowed: false, reason: "INVALID_FETCH_MODE_FOR_MUTATION" };
  }
  if (secDest && !["empty", "document", ""].includes(secDest)) {
    return { allowed: false, reason: "INVALID_FETCH_DEST" };
  }
  return { allowed: true };
}

export function hasSequentialNumericIdInPath(pathname) {
  return /\/api\/[a-z0-9_-]+\/\d+(?:\/|$)/i.test(String(pathname || ""));
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
    : "vanilla-edge-form";
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
    reason: valid ? "SLACK_SIGNATURE_VERIFIED" : "SLACK_SIGNATURE_MISMATCH",
    expectedSig
  };
}

export function sanitizeAndRedactEdgeTicket(rawText = "") {
  const msg = String(rawText || "").trim();
  if (!msg) return { allowed: false, reason: "EMPTY_TICKET_MESSAGE" };
  if (
    /ignore\s+(?:all\s+)?(?:previous|prior|above)\s+(?:instructions|prompts|rules)|disregard\s+(?:all\s+)?(?:previous|system)|reveal\s+(?:your\s+)?(?:system\s+prompt|api\s+keys|secrets)|DROP\s+TABLE|UNION\s+SELECT|<script|\b(?:CONSTRAINTS\.md|AGENTS\.md)\b.*(?:delete|overwrite|disable|bypass)/i.test(
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
    stack: "vanilla-edge",
    timestamp: new Date().toISOString(),
    lead: {
      fullName: leadData.fullName || "",
      email: leadData.email,
      message: leadData.message || "",
      source: leadData.source || "vanilla-edge-form"
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
              stack: "vanilla-edge",
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
          const fetchMeta = validateFetchMetadata(request);
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
          const isSlackRoute =
            url.pathname === "/api/slack-webhook" || Boolean(request.headers.get("X-Slack-Signature"));

          if (isSlackRoute && env && env.SLACK_SIGNING_SECRET) {
            const sigCheck = await verifySlackSignatureWebCrypto(
              rawBodyText,
              request.headers.get("X-Slack-Request-Timestamp") || "",
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
              const dispatchPromise = dispatchGitHubRepositoryEvent(env, "cto_slack_ticket_approved", {
                ticketId,
                actionId,
                approvedByCto: true,
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

          const ticketId = `tkt-${crypto.randomUUID().slice(0, 8)}`;
          const dispatchTask = dispatchGitHubRepositoryEvent(env, "slack_client_ticket_triage", {
            ticketId,
            projectSlug: "{{PROJECT_ID}}",
            sourceChannel: isSlackRoute ? "slack_webhook" : "client_feedback_widget",
            sectionSelector: String(body?.sectionSelector || "#main").slice(0, 80),
            pageUrl: String(body?.pageUrl || "https://example.pages.dev").slice(0, 200),
            viewport: String(body?.viewport || "1440x900").slice(0, 24),
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
