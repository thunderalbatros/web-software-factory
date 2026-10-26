---
name: security-checklist
description: OWASP ASVS v5.0, CSP, HSTS, OAuth 2.1 PKCE, Valibot input validation, and DOM-XSS defense checklist for modern web applications and Cloudflare Edge APIs.
---

# Web Software Factory — OWASP ASVS v5.0 & Edge Security Checklist

## 1. Frontend DOM-XSS & CSP Hardening
- [ ] Render untrusted strings strictly via `.textContent` or `window.escapeHTML()`.
- [ ] Zero inline executable `<script>` blocks and zero inline `onclick=` attributes (only `<script type="application/ld+json">` and `<script type="speculationrules">` allowed inline).
- [ ] Enforce `rel="noopener noreferrer"` on all external `<a target="_blank">` links.
- [ ] Ship `dist/_headers` with `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and `Permissions-Policy`.

## 2. Edge API, Auth & Secret Hygiene
- [ ] Zero API keys, passwords, or tokens committed in Git (`.dev.vars` locally and Cloudflare encrypted secrets in production).
- [ ] Validate all incoming request payloads at the Worker boundary using `Valibot` schemas.
- [ ] Encrypt sensitive tokens at rest in Cloudflare D1/KV using WebCrypto `AES-256-GCM`.
- [ ] Enforce `AbortSignal.timeout(3000)` on all outbound `fetch()` calls.
