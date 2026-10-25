# Rule: Security & Input Sanitization (OWASP ASVS v5.0)

1. **Untrusted Input Handling:** Render all dynamic user or external data via `textContent` or safe DOM nodes. Never use raw `innerHTML`, `outerHTML`, `eval()`, or `new Function()` with unsanitized strings.
2. **Zero Secrets in Git:** API keys, OAuth client secrets, and database credentials live exclusively in `.dev.vars` or `.env` (git-ignored) and Cloudflare Worker environment secrets.
3. **Edge API & Webhook Hardening:** Validate all inbound request payloads with `Valibot` schemas, enforce rate-limiting, and verify cryptographic signatures (`HMAC-SHA256` / `RSA`) on webhooks.
4. **Production Security Headers:** Every built `dist/_headers` must enforce strict `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy`.
