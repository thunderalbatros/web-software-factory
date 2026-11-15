---
title: "CANON DOMAIN MASTERY: Seguridad Web Moderna (Stanford CS253 — Feross Aboukhadijeh) (2026)"
category: "cybersecurity"
epistemicTier: "TIER_1_SOTA_2026"
authorityBoost: 1.35
courseId: "stanford-cs253-modern-web-security"
linkedHarnessModule: "tools/audit/security_gate.mjs"
---

# CANON DOMAIN MASTERY: Seguridad Web Moderna (Stanford CS253 — Feross Aboukhadijeh)

> **Institución / Fuente:** Stanford University (Feross Aboukhadijeh)  
> **URLs Oficiales:** `https://web.stanford.edu/class/cs253/`  
> **Epistemic Tier:** `TIER_1_SOTA_2026` (`Authority Boost: x1.35`)  
> **Alcance:** Same-Origin Policy (SOP) & COOP/COEP, Strict CSP & Trusted Types (Zero DOM XSS), Fetch Metadata CSRF Defense, WebAuthn/Passkeys & __Host- Session Cookies  
> **Módulo del Harness Acoplado:** `tools/audit/security_gate.mjs`

---

## 1. Tópicos Nucleares Cosechados

- **Same-Origin Policy (SOP) & COOP/COEP**
- **Strict CSP & Trusted Types (Zero DOM XSS)**
- **Fetch Metadata CSRF Defense**
- **WebAuthn/Passkeys & __Host- Session Cookies**

---

## 2. Reglas Arquitectónicas Deterministas (SOTA 2026)

1. Enforce strict `Content-Security-Policy` (`default-src 'self'; object-src 'none'; frame-ancestors 'none'; base-uri 'self'`) and forbid `unsafe-eval` and unsanitized `innerHTML`/`outerHTML`/`document.write`.
2. Bind session cookies exclusively with the `__Host-` prefix (`Secure; HttpOnly; SameSite=Strict; Path=/`) and validate `Sec-Fetch-Site`, `Sec-Fetch-Mode`, and `Sec-Fetch-Dest` on state-changing endpoints.
3. Prefer phishing-resistant WebAuthn/FIDO2 Passkeys (`navigator.credentials.create/get` with origin binding) and Argon2id password hashing.

---

## 3. Patrón de Producción Verificado

```
// Stanford CS253 Fetch Metadata CSRF & Cross-Origin Isolation Guard
export function verifyFetchMetadataCsrf(request) {
  const site = request.headers.get('Sec-Fetch-Site') || 'same-origin';
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method) && site === 'cross-site') {
    return { allowed: false, status: 403, reason: 'CS253_CROSS_SITE_MUTATION_BLOCKED' };
  }
  return { allowed: true, status: 200 };
}
```

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_CYBERSECURITY_DEVSECOPS_2026]] · [[CYBERSECURITY_MASTER_PROTOCOL]] · [[ANTI_BOT_STEALTH_GUIDE]] · [[CANON_IDENTITY_AND_OAUTH_CYBERSECURITY_AUDIT_2026]] · #cybersecurity
