# CANON SOTA 2026: Pasarelas de Pago en el Edge — Stripe, MercadoPago y Polar.sh con Idempotencia en Cloudflare D1

> **Dominio:** `architecture_and_edge` | **Alcance:** Implementación de cobros únicos, suscripciones SaaS y webhooks idempotentes en Cloudflare Workers + D1 (`templates/fullstack-saas-edge`).

---

## 1. Selección de Pasarela según Mercado Objetivo

| Pasarela | Mercado Ideal | Ventaja Arquitectónica en Cloudflare Edge |
| :--- | :--- | :--- |
| **Polar.sh** (`polar`) | SaaS Global, AI Tools, Productos Digitales | *Merchant of Record (MoR)*: liquida impuestos globales (IVA/VAT/Sales Tax) automáticamente y provee SDK ligero compatible con Web Fetch API. |
| **Stripe Checkout / Billing** (`stripe`) | Estados Unidos, Europa, SaaS B2B Internacional | Estándar global con soporte nativo de `crypto.subtle` para verificación de `Stripe-Signature` en Cloudflare Workers. |
| **MercadoPago Checkout Pro / Suscripciones** (`mercadopago`) | Argentina, Brasil, México, Chile, Colombia, Uruguay | Soporte nativo para medios locales (Dinero en cuenta, Pix, QR, Cuotas con tarjeta) y notificaciones IPN / Webhooks con cabecera `x-signature`. |

---

## 2. Ley de Idempotencia Transaccional en Cloudflare D1 (`webhook_events`)

Las pasarelas de pago reintentan los webhooks (`invoice.paid`, `payment.updated`, `subscription.active`) múltiples veces si hay latencia de red. Para evitar **doble acreditación o corrupción de estado**:
1. **Tabla `webhook_events` con `event_id PRIMARY KEY`:**
   - Antes de activar una suscripción o disparar un flujo en `n8n`, el Worker verifica si `event_id` ya existe en `webhook_events`.
2. **Ejecución Atómica con `env.DB.batch([...])`:**
   - El registro del `event_id` en `webhook_events`, el `UPSERT` en `subscriptions` y la actualización de `organizations.plan_tier` se ejecutan en un único lote atómico (`d1.batch()`), garantizando consistencia ACID en el Edge.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SOTA_RAG_ARCHITECTURES_AND_TOOLS_2026]] · [[CURATED_MASTER_BOOKS_AND_COURSES_2026]] · [[CANON_SOFTWARE_ENGINEERING_AT_GOOGLE]] · [[CANON_HARNESS_ENGINEERING_INTEGRAL_2026]] · #architecture_and_edge
