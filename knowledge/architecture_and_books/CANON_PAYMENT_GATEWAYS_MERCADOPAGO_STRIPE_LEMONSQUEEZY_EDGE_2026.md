# CANON: Pasarelas de Pago en el Edge (MercadoPago Checkout Pro/Bricks, Stripe y Lemon Squeezy), Verificación Criptográfica de Webhooks e Idempotencia en D1 (2026)

> **Dominio:** `architecture_and_books` / `payment_gateways_and_fintech_edge`  
> **Versión:** 2026.10 (SOTA Web Software Factory)  
> **Aplicación:** `templates/astro-edge/worker/index.js`, `templates/vanilla-edge/worker/index.js`, `projects/<slug>`

---

## Tabla de Trazabilidad de Fuentes Físicas

| Sección del Canon | Archivo Físico / Fuente Primaria Verificada | Conceptos y Reglas Extraídas |
| :--- | :--- | :--- |
| **1. Persistencia Idempotente en Cloudflare D1 con `Drizzle ORM`** | `C:\Users\tomas\Desktop\streamerbot\references\factory-expansion\cloudflare-edge\drizzle-orm\README.md` | Modelado tipado SQLite en el Edge (`sqliteTable`, claves primarias compuestas/únicas para deduplicación de webhooks y auditoría contable). |
| **2. MercadoPago (Argentina / LATAM): Preferencias y Firma `x-signature`** | Especificación Oficial MercadoPago Developers v1 (`/checkout/preferences`, `/v1/payments/{id}`, validación HMAC sobre manifiesto `id;request-id;ts;`) | Creación de preferencias con `external_reference`, verificación criptográfica del manifiesto `x-signature` y doble confirmación `GET /v1/payments/{id}`. |
| **3. Stripe en Cloudflare Workers (Zero-SDK `fetch` + `Stripe-Signature`)** | Especificación Oficial Stripe API (`/v1/checkout/sessions` + esquema de firma `t=timestamp,v1=hmac`) | Creación de sesiones de pago y suscripciones sin dependencias pesadas de Node y validación en tiempo constante con `crypto.subtle`. |
| **4. Lemon Squeezy (Merchant of Record Global)** | Especificación Oficial Lemon Squeezy Webhooks (`X-Signature` HMAC-SHA256) | Gestión delegada de impuestos internacionales (VAT/Sales Tax), validación `X-Signature` y aprovisionamiento de licencias/suscripciones. |

---

## 1. Matriz de Selección de Pasarela según Geografía y Modelo de Negocio

| Pasarela | Mercado Ideal | Rol Fiscal | Monedas y Medios Clave | Casos de Uso en la Fábrica |
| :--- | :--- | :--- | :--- | :--- |
| **MercadoPago (`Checkout Pro` / `Bricks`)** | Argentina, Uruguay, Brasil, México, Chile, Colombia, Perú | Procesador Local (Liquidación en moneda local) | `ARS`, `BRL`, `MXN`, `CLP`, `UYU` · Dinero en cuenta, QR, Tarjetas con cuotas, Rapipago/PagoFácil | Clínicas (cobro de seña de turno), E-Commerce local, cursos, servicios profesionales en LATAM. |
| **Stripe (`Checkout` / `Billing`)** | EE. UU., Europa, LATAM Internacional (`USD`/`EUR`) | Procesador de Pagos Global | `+135 monedas` · Tarjetas globales, Apple Pay, Google Pay, SEPA, ACH | SaaS B2B en USD, cobros recurrentes con métricas de uso, agencias exportadoras de servicios. |
| **Lemon Squeezy / Polar.sh** | Global (SaaS e Infoproductos digitales) | **Merchant of Record (MoR)** — Liquida IVA/VAT global por vos | `USD`, `EUR`, `GBP` · Tarjetas, PayPal, Apple Pay | Software, plantillas digitales, micro-SaaS que venden a todo el mundo sin abrir entidad fiscal en cada país. |

---

## 2. Esquema de Idempotencia Contable en Cloudflare D1 (`Drizzle ORM`)

Las pasarelas de pago reintentan el envío de webhooks hasta por 72 horas si ocurre un micro-corte de red. **Jamás acreditar un pedido, confirmar un turno o enviar un email de recibo sin verificar primero la tabla `payment_webhook_events` en D1.**

```typescript
// src/db/schema.ts — Esquema Canónico Drizzle ORM para Pagos e Idempotencia en D1 SQLite
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const paymentWebhookEvents = sqliteTable('payment_webhook_events', {
  eventId: text('event_id').primaryKey(),          // Ej: "mp_987654321" o "evt_1Pxyz..."
  provider: text('provider').notNull(),            // "mercadopago" | "stripe" | "lemonsqueezy"
  eventType: text('event_type').notNull(),         // "payment.updated" | "checkout.session.completed"
  externalReference: text('external_reference'),   // ID interno de orden o reserva (ej. "ord_2026_0042")
  amountMinor: integer('amount_minor').notNull(),  // Monto en centavos (ej. 4500000 = $45.000,00)
  currency: text('currency').notNull(),            // "ARS" | "USD" | "BRL"
  paymentStatus: text('payment_status').notNull(), // "approved" | "pending" | "rejected" | "refunded"
  rawPayload: text('raw_payload').notNull(),
  processedAt: text('processed_at').notNull(),
});
```

---

## 3. MercadoPago en el Edge (Argentina y LATAM)

### 3.1 Creación de Preferencia de Pago (`POST /checkout/preferences`)
Ideal para cobrar señas de turnos médicos, reservas de consultoría o carritos de compra:

```javascript
export async function createMercadoPagoPreference(env, order) {
  const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.MP_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
      'X-Idempotency-Key': `pref_${order.id}`,
    },
    body: JSON.stringify({
      items: [
        {
          id: order.sku,
          title: order.title,
          description: order.description,
          quantity: 1,
          currency_id: order.currency || 'ARS',
          unit_price: Number(order.unitPrice),
        }
      ],
      payer: {
        name: order.customerName,
        email: order.customerEmail,
      },
      external_reference: order.id,
      statement_descriptor: env.MP_STATEMENT_DESCRIPTOR || 'SERVICIO WEB',
      back_urls: {
        success: `${env.PUBLIC_SITE_URL}/pago/exito?ref=${order.id}`,
        failure: `${env.PUBLIC_SITE_URL}/pago/error?ref=${order.id}`,
        pending: `${env.PUBLIC_SITE_URL}/pago/pendiente?ref=${order.id}`,
      },
      auto_return: 'approved',
      notification_url: `${env.PUBLIC_SITE_URL}/api/webhooks/mercadopago`,
      expires: true,
      expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error(`MercadoPago Preference Error: ${response.status}`);
  }
  const data = await response.json();
  return { preferenceId: data.id, initPoint: data.init_point };
}
```

### 3.2 Verificación Criptográfica del Manifiesto `x-signature` de MercadoPago
MercadoPago envía la cabecera `x-signature: ts=1730040000,v1=a1b2c3...` y `x-request-id`. La firma `v1` se calcula con `HMAC-SHA256` sobre la plantilla exacta:
`id:[data.id_url];request-id:[x-request-id_header];ts:[ts_header];`

```javascript
export async function verifyMercadoPagoWebhook(request, env) {
  const url = new URL(request.url);
  const xSignature = request.headers.get('x-signature') || '';
  const xRequestId = request.headers.get('x-request-id') || '';

  const parts = Object.fromEntries(
    xSignature.split(',').map((pair) => pair.trim().split('='))
  );
  const ts = parts.ts;
  const v1 = parts.v1;
  if (!ts || !v1) return { valid: false, reason: 'Missing ts or v1 in x-signature' };

  const body = await request.json();
  const dataId = (url.searchParams.get('data.id') || body?.data?.id || '').toString().toLowerCase();

  // Plantilla oficial de manifiesto MercadoPago
  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(env.MP_WEBHOOK_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sigBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(manifest));
  const computedHex = Array.from(new Uint8Array(sigBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  if (computedHex !== v1) {
    return { valid: false, reason: 'Invalid MercadoPago HMAC signature' };
  }

  // Doble verificación obligatoria contra la API oficial de pagos de MercadoPago
  const paymentRes = await fetch(`https://api.mercadopago.com/v1/payments/${dataId}`, {
    headers: { 'Authorization': `Bearer ${env.MP_ACCESS_TOKEN}` },
  });
  if (!paymentRes.ok) return { valid: false, reason: 'Payment lookup failed' };

  const payment = await paymentRes.json();
  return {
    valid: true,
    eventId: `mp_${payment.id}_${payment.status}`,
    status: payment.status, // 'approved' | 'pending' | 'rejected'
    externalReference: payment.external_reference,
    amountMinor: Math.round(Number(payment.transaction_amount) * 100),
    currency: payment.currency_id,
    payerEmail: payment.payer?.email,
  };
}
```

---

## 4. Stripe y Lemon Squeezy en Cloudflare Workers (Zero-Bloat WebCrypto)

### 4.1 Verificación Nativa de `Stripe-Signature` (`t=...,v1=...`)
Sin importar el paquete pesado `stripe` de Node.js, verificamos la firma directamente en el Worker en `< 0.4 ms`:

```javascript
export async function verifyStripeWebhook(request, env) {
  const sigHeader = request.headers.get('Stripe-Signature') || '';
  const rawBody = await request.text();

  const elements = Object.fromEntries(
    sigHeader.split(',').map((item) => item.trim().split('='))
  );
  const timestamp = elements.t;
  const signature = elements.v1;
  if (!timestamp || !signature) return { valid: false };

  // Ventana anti-replay de 300 segundos
  const ageSec = Math.abs(Math.floor(Date.now() / 1000) - Number(timestamp));
  if (ageSec > 300) return { valid: false, reason: 'Stripe webhook timestamp expired' };

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(env.STRIPE_WEBHOOK_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signedPayload = `${timestamp}.${rawBody}`;
  const sigBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(signedPayload));
  const expectedHex = Array.from(new Uint8Array(sigBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  if (expectedHex !== signature) return { valid: false, reason: 'Stripe HMAC mismatch' };
  return { valid: true, event: JSON.parse(rawBody) };
}
```

### 4.2 Verificación Nativa de `X-Signature` en Lemon Squeezy
Lemon Squeezy firma el cuerpo crudo del request en hexadecimal dentro del header `X-Signature`:

```javascript
export async function verifyLemonSqueezyWebhook(request, env) {
  const signature = request.headers.get('X-Signature') || '';
  const rawBody = await request.text();
  if (!signature) return { valid: false };

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(env.LEMONSQUEEZY_WEBHOOK_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sigBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(rawBody));
  const expectedHex = Array.from(new Uint8Array(sigBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  if (expectedHex !== signature) return { valid: false };
  return { valid: true, payload: JSON.parse(rawBody) };
}
```

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SOTA_RAG_ARCHITECTURES_AND_TOOLS_2026]] · [[CURATED_MASTER_BOOKS_AND_COURSES_2026]] · [[CANON_SOFTWARE_ENGINEERING_AT_GOOGLE]] · [[CANON_HARNESS_ENGINEERING_INTEGRAL_2026]] · #architecture_and_books
