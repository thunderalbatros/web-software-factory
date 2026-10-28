# CANON: Automatización con Webhooks `n8n`, Validación `Valibot` en el Edge, Firma HMAC-SHA256, WhatsApp Cloud API v21.0 y Sincronización CRM (2026)

> **Dominio:** `software_factory` / `edge_automation_and_webhooks`  
> **Versión:** 2026.10 (SOTA Web Software Factory)  
> **Aplicación:** `templates/astro-edge/worker/index.js`, `templates/vanilla-edge/worker/index.js`, `projects/<slug>`

---

## Tabla de Trazabilidad de Fuentes Físicas

| Sección del Canon | Archivo Físico / Fuente Primaria Verificada | Conceptos y Reglas Extraídas |
| :--- | :--- | :--- |
| **1. Validación en el Edge con `Valibot`** | `C:\Users\tomas\Desktop\streamerbot\references\factory-expansion\cloudflare-edge\valibot\library\README.md` + `templates/astro-edge/worker/index.js` | Esquemas modulares tree-shakable (`v.object`, `v.pipe`, `v.email`, `v.safeParse`) de `< 1.5 KB` para sanitizar formularios antes de tocar D1 o `n8n`. |
| **2. Firma Criptográfica HMAC-SHA256 y Anti-Replay** | `templates/astro-edge/worker/index.js` + `templates/vanilla-edge/worker/index.js` (WebCrypto API `crypto.subtle`) | Generación de `X-Factory-Signature-256` + `X-Factory-Timestamp` sobre el payload serializado y nodo de verificación en `n8n`. |
| **3. Outbox Resiliente en D1 SQLite con `Drizzle ORM`** | `C:\Users\tomas\Desktop\streamerbot\references\factory-expansion\cloudflare-edge\drizzle-orm\README.md` | Tabla transaccional `webhook_outbox` y cola de reintentos con *Exponential Backoff + Full Jitter* dentro de `ctx.waitUntil()`. |
| **4. Payloads Oficiales WhatsApp Cloud API v21.0 y HubSpot v3** | Especificación Meta Graph API v21.0 (`/messages`) + HubSpot CRM API v3 (`/crm/v3/objects/contacts/batch/upsert`) | Mensajes de plantilla HSM (`es_AR` / `es`), botones interactivos de respuesta rápida y *upsert* idempotente por correo o teléfono. |

---

## 1. Arquitectura de Automatización *Zero-Backend* desde el Edge hacia `n8n`

Todo formulario de contacto, solicitud de presupuesto, reserva de turno o captura de lead generado por `web-software-factory` sigue un flujo determinista de **4 etapas en Cloudflare Workers**:

1. **Defensa Anti-Bot y Rate Limiting:** Verificación opcional de token **Cloudflare Turnstile** (`/turnstile/v0/siteverify`) + campo *Honeypot* (`website_url` oculto) + límite de tasa por IP (`CF-Connecting-IP`).
2. **Validación Estructural con `Valibot`:** Sanitización estricta de tipos, longitudes y formato de email/teléfono.
3. **Persistencia Primaria en D1 (`leads` + `webhook_outbox`):** El lead se guarda primero en SQLite D1 en `< 5 ms`, garantizando **cero pérdida de datos** incluso si el servidor externo de `n8n` estuviera en mantenimiento.
4. **Despacho Asíncrono Firmado (`ctx.waitUntil`):** El Worker devuelve `200 OK` al navegador inmediatamente mientras dispara en segundo plano el Webhook hacia `N8N_WEBHOOK_URL` firmado con `HMAC-SHA256`.

---

## 2. Esquema Canónico de Validación `Valibot` y Sobre de Evento (`Event Envelope`)

### 2.1 Validación `Valibot` en el Cloudflare Worker
Extraído de `references/factory-expansion/cloudflare-edge/valibot`:

```javascript
import * as v from 'valibot';

export const LeadSubmissionSchema = v.object({
  name: v.pipe(v.string(), v.trim(), v.minLength(2, 'Ingresá tu nombre completo'), v.maxLength(120)),
  email: v.pipe(v.string(), v.trim(), v.toLowerCase(), v.email('Ingresá un correo electrónico válido'), v.maxLength(160)),
  phone: v.optional(v.pipe(v.string(), v.trim(), v.minLength(6), v.maxLength(32)), ''),
  company: v.optional(v.pipe(v.string(), v.trim(), v.maxLength(120)), ''),
  service_interest: v.optional(v.pipe(v.string(), v.trim(), v.maxLength(100)), 'general'),
  message: v.pipe(v.string(), v.trim(), v.minLength(5, 'Contanos brevemente tu consulta'), v.maxLength(2000)),
  utm_source: v.optional(v.pipe(v.string(), v.trim(), v.maxLength(80)), 'direct'),
  utm_medium: v.optional(v.pipe(v.string(), v.trim(), v.maxLength(80)), 'none'),
  utm_campaign: v.optional(v.pipe(v.string(), v.trim(), v.maxLength(120)), 'none'),
  page_url: v.optional(v.pipe(v.string(), v.trim(), v.maxLength(500)), ''),
  honeypot: v.optional(v.pipe(v.string(), v.maxLength(0, 'Bot detectado')), '')
});
```

### 2.2 Estructura JSON del Sobre Saliente hacia `n8n` (`N8N_WEBHOOK_URL`)
Todos los proyectos de la fábrica emiten exactamente el mismo contrato JSON estandarizado para que un único flujo maestro de `n8n` pueda reutilizarse entre múltiples clientes:

```json
{
  "event_id": "evt_9c8b7a6d-5e4f-4a3b-8c2d-1e0f9a8b7c6d",
  "event_type": "lead.submitted",
  "schema_version": "2026-10",
  "occurred_at": "2026-10-27T16:15:00.000Z",
  "project": {
    "slug": "clinica-belgrano",
    "domain": "clinicaejemplo.com.ar",
    "archetype": "marketing"
  },
  "lead": {
    "name": "Martín Echeverría",
    "email": "martin@empresa.com.ar",
    "phone_raw": "+54 9 11 5555-1234",
    "phone_e164": "+5491155551234",
    "company": "Grupo Sur SRL",
    "service_interest": "implantes-dentales",
    "message": "Quisiera agendar un turno de evaluación esta semana por la tarde."
  },
  "attribution": {
    "utm_source": "google",
    "utm_medium": "cpc",
    "utm_campaign": "implantes_caba_oct",
    "page_url": "https://clinicaejemplo.com.ar/tratamientos/implantes-dentales/",
    "country": "AR",
    "city": "Buenos Aires"
  }
}
```

---

## 3. Firma Criptográfica `HMAC-SHA256`, Retries y Verificación en `n8n`

### 3.1 Emisor en Cloudflare Workers (`WebCrypto API` + Exponential Backoff)
Nunca enviar un webhook hacia `n8n` sin firma criptográfica ni ventana temporal anti-replay:

```javascript
async function signWebhookPayload(secret, timestamp, rawBody) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signingInput = encoder.encode(`${timestamp}.${rawBody}`);
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, signingInput);
  const hashHex = Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return `sha256=${hashHex}`;
}

export async function dispatchToN8nWithRetry(env, eventPayload) {
  if (!env.N8N_WEBHOOK_URL) return { skipped: true };

  const rawBody = JSON.stringify(eventPayload);
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const headers = {
    'Content-Type': 'application/json',
    'User-Agent': 'WebSoftwareFactory-EdgeWebhook/2026.10',
    'X-Factory-Event': eventPayload.event_type,
    'X-Factory-Delivery-Id': eventPayload.event_id,
    'X-Factory-Timestamp': timestamp,
  };

  if (env.N8N_WEBHOOK_SECRET) {
    headers['X-Factory-Signature-256'] = await signWebhookPayload(
      env.N8N_WEBHOOK_SECRET,
      timestamp,
      rawBody
    );
  }

  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetch(env.N8N_WEBHOOK_URL, {
        method: 'POST',
        headers,
        body: rawBody,
        signal: AbortSignal.timeout(8000),
      });
      if (response.ok) return { delivered: true, status: response.status, attempt };
      if (response.status >= 400 && response.status < 500 && response.status !== 429) {
        break; // Error 4xx no recuperable (excepto 429 Rate Limit)
      }
    } catch (_) {
      // Fallo de red transitorio; continúa al backoff
    }
    if (attempt < maxAttempts) {
      const baseDelayMs = Math.pow(2, attempt - 1) * 1000; // 1s, 2s
      const jitterMs = Math.floor(Math.random() * 400);
      await new Promise((r) => setTimeout(r, baseDelayMs + jitterMs));
    }
  }
  return { delivered: false };
}
```

### 3.2 Código de Verificación en el Nodo `Code` de `n8n`
En el flujo de `n8n`, inmediatamente después del nodo `Webhook` (configurado con `Raw Body: true`), colocar un nodo `Code` (JavaScript) con esta validación constante en tiempo (`timingSafeEqual`):

```javascript
// Nodo Code en n8n: Verificación de X-Factory-Signature-256 y ventana Anti-Replay (300s)
const crypto = require('crypto');

const headers = $input.first().json.headers;
const rawBody = $input.first().binary?.data
  ? Buffer.from($input.first().binary.data.data, 'base64').toString('utf8')
  : JSON.stringify($input.first().json.body);

const timestamp = headers['x-factory-timestamp'];
const signatureHeader = headers['x-factory-signature-256'] || '';
const secret = $env.N8N_WEBHOOK_SECRET;

const nowSec = Math.floor(Date.now() / 1000);
if (!timestamp || Math.abs(nowSec - Number(timestamp)) > 300) {
  throw new Error('Webhook rechazado: Timestamp fuera de la ventana anti-replay de 300 segundos.');
}

const expectedSig = 'sha256=' + crypto
  .createHmac('sha256', secret)
  .update(`${timestamp}.${rawBody}`)
  .digest('hex');

const a = Buffer.from(signatureHeader);
const b = Buffer.from(expectedSig);
if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
  throw new Error('Webhook rechazado: Firma HMAC-SHA256 inválida.');
}

return $input.all();
```

---

## 4. Especificación Oficial WhatsApp Business Cloud API v21.0 y CRM Upsert

### 4.1 Disparo de Plantilla HSM de Respuesta Instantánea al Lead (`POST /v21.0/{PHONE_NUMBER_ID}/messages`)
Cuando un usuario envía un formulario, la probabilidad de cierre cae un **400% si se demora más de 10 minutos en responder**. El flujo de `n8n` envía en `< 3 segundos` un mensaje de WhatsApp oficial:

```json
{
  "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": "5491155551234",
  "type": "template",
  "template": {
    "name": "confirmacion_consulta_web",
    "language": {
      "code": "es_AR"
    },
    "components": [
      {
        "type": "body",
        "parameters": [
          { "type": "text", "text": "Martín" },
          { "type": "text", "text": "Implantes Dentales" }
        ]
      }
    ]
  }
}
```

### 4.2 Mensaje Interactivo con Botones de Clasificación Rápida (Dentro de la Ventana de 24h)
Una vez que el usuario responde, `n8n` puede enviar hasta **3 botones interactivos** (`max 20 caracteres` por título de botón):

```json
{
  "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": "5491155551234",
  "type": "interactive",
  "interactive": {
    "type": "button",
    "body": {
      "text": "¡Gracias Martín! ¿En qué franja horaria te queda más cómodo el turno de evaluación?"
    },
    "action": {
      "buttons": [
        { "type": "reply", "reply": { "id": "slot_manana", "title": "Mañana (9 a 13 hs)" } },
        { "type": "reply", "reply": { "id": "slot_tarde", "title": "Tarde (14 a 19 hs)" } },
        { "type": "reply", "reply": { "id": "hablar_asesor", "title": "Hablar con recepción" } }
      ]
    }
  }
}
```

### 4.3 Upsert Idempotente en HubSpot CRM v3 (`POST /crm/v3/objects/contacts/batch/upsert`)
Para evitar crear contactos duplicados cuando un mismo prospecto consulta dos veces:

```json
{
  "inputs": [
    {
      "idProperty": "email",
      "id": "martin@empresa.com.ar",
      "properties": {
        "email": "martin@empresa.com.ar",
        "firstname": "Martín",
        "lastname": "Echeverría",
        "phone": "+5491155551234",
        "company": "Grupo Sur SRL",
        "lifecyclestage": "lead",
        "hs_lead_status": "NEW",
        "utm_source": "google",
        "utm_campaign": "implantes_caba_oct"
      }
    }
  ]
}
```

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SPLE_ISO26550_AND_SOFTWARE_FACTORIES_ARCHITECTURE_2026]] · [[CANON_ASTRO5_CLOUDFLARE_WORKERS_AND_MODERN_WEB_TEMPLATES_2026]] · [[CANON_MULTI_BRAND_DESIGN_SYSTEMS_DTCG_STYLE_DICTIONARY_AND_ARCHETYPES_2026]] · [[CANON_SOTA_AGENT_TEAM_TOPOLOGY_AND_2026_WEB_STACK_AUDIT]] · #software_factory
