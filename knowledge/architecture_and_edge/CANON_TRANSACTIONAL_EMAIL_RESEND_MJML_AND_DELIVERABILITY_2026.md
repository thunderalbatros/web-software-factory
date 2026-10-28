# CANON SOTA 2026: Emails Transaccionales desde el Edge (Resend / Postmark), Diseño MJML y Entregabilidad Perfecta (`SPF/DKIM/DMARC/BIMI`)

> **Dominio:** `architecture_and_edge` | **Alcance:** Envío de correos transaccionales, confirmaciones de reserva/compra y secuencias de onboarding desde Cloudflare Workers y Workflows.

---

## 1. Despacho HTTP Sin SMTP desde Cloudflare Workers

Los Cloudflare Workers no usan conexiones TCP SMTP legadas (puerto 465/587), sino llamadas HTTP REST con `fetch()` y `AbortSignal.timeout(4000)` hacia APIs modernas (**Resend**, **Postmark** o vía webhook a **n8n**):
- **Clave de Idempotencia (`Idempotency-Key`):** Cada correo enviado desde `SaasOnboardingWorkflow` o `/api/lead` incluye `Idempotency-Key: <event_id>` para garantizar que un reintento del workflow nunca envíe dos veces el mismo email al cliente.

---

## 2. Checklist de Entregabilidad en DNS (Zero Spam Folder)

Para que el 99.5%+ de los correos lleguen a la bandeja principal (Inbox):
1. **SPF (`TXT`):** `v=spf1 include:_spf.resend.com ~all`
2. **DKIM (`TXT` RSA-2048):** Firma criptográfica del dominio emisor (`notifications.tudominio.com`).
3. **DMARC (`TXT _dmarc`):** `v=DMARC1; p=quarantine; rua=mailto:dmarc@tudominio.com; pct=100`
4. **Separación de Subdominios:** Usar `transactional.tudominio.com` para recibos/accesos y `news.tudominio.com` para marketing, protegiendo la reputación IP/dominio de los correos críticos.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SOTA_RAG_ARCHITECTURES_AND_TOOLS_2026]] · [[CURATED_MASTER_BOOKS_AND_COURSES_2026]] · [[CANON_SOFTWARE_ENGINEERING_AT_GOOGLE]] · [[CANON_HARNESS_ENGINEERING_INTEGRAL_2026]] · #architecture_and_edge
