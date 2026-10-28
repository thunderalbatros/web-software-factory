# CANON: Email Transaccional en el Edge (`Resend`), Entregabilidad DNS (SPF, DKIM, DMARC, RFC 8058) y Secuencias de Onboarding de 7 Correos (2026)

> **Dominio:** `architecture_and_books` / `transactional_email_and_lifecycle`  
> **Versión:** 2026.10 (SOTA Web Software Factory)  
> **Aplicación:** `templates/astro-edge/worker/index.js`, `templates/vanilla-edge/worker/index.js`, `projects/<slug>`

---

## Tabla de Trazabilidad de Fuentes Físicas

| Sección del Canon | Archivo Físico / Fuente Primaria Verificada | Conceptos y Reglas Extraídas |
| :--- | :--- | :--- |
| **1. Arquitectura de Secuencias de Email y Onboarding** | `C:\Users\tomas\Desktop\streamerbot\references\sota-2026\growth-and-hitl\marketingskills\skills\emails\SKILL.md` | Regla de *"Un Correo, Un Trabajo"*, Secuencia de Bienvenida de 7 Correos, Secuencia de Nutrición de Leads (6 correos) y Re-engagement (4 correos). |
| **2. Entregabilidad DNS (SPF, DKIM, DMARC) y RFC 8058** | `marketingskills/skills/emails/SKILL.md` + Mandatos de Google/Yahoo/Apple Mail (2024–2026) | Aislamiento de subdominios (`notify.` vs. `mail.`), alineación estricta `adkim=s; aspf=s`, tasa de quejas `< 0.1%` y baja en 1 clic (`List-Unsubscribe-Post`). |
| **3. Integración Nativa de `Resend` y Webhooks `Svix` en Workers** | Especificación Oficial Resend API (`POST /emails`) + Estándar de Firma `Svix` (`svix-id`, `svix-timestamp`, `svix-signature`) | Despacho con `Idempotency-Key`, paridad `html` + `text` y supresión automática en D1 ante eventos `email.bounced` o `email.complained`. |

---

## 1. Arquitectura de Entregabilidad DNS 2026 (Cero Caída en Carpeta de Spam)

Desde los requisitos obligatorios de Google Workspace, Gmail y Yahoo, cualquier dominio que envíe correos transaccionales o de bienvenida sin autenticación criptográfica completa y sin aislamiento de subdominios sufre bloqueo silencioso o caída en *Promociones/Spam*.

### 1.1 Aislamiento de Subdominios por Flujo de Correo
**Jamás enviar correos automáticos de marketing desde el mismo dominio raíz (`@tudominio.com`) que usa el equipo humano para su correo corporativo diario**, porque un pico de rebotes dañaría los correos comerciales de dirección.

| Tipo de Tráfico | Subdominio Canónico | Prioridad de Entrega | Regla de Cabeceras |
| :--- | :--- | :--- | :--- |
| **1. Transaccional Crítico** (Recibos de pago, turnos confirmados, códigos 2FA, enlaces mágicos) | `notificaciones.tudominio.com` (`no-responder@` o `turnos@`) | Instantánea (`< 3s`) | Sin cabecera `List-Unsubscribe` (son recibos legales/operativos solicitados por el usuario). |
| **2. Onboarding y Secuencias de Activación** (Bienvenida, casos de estudio, recordatorios comerciales) | `hola.tudominio.com` o `equipo.tudominio.com` | Alta (`< 30s`) | **Obligatorio** incluir `List-Unsubscribe` + `List-Unsubscribe-Post: List-Unsubscribe=One-Click` (**RFC 8058**). |

### 1.2 Registros DNS Obligatorios (Cloudflare DNS)

```txt
; 1. SPF (Sender Policy Framework) en el subdominio de envío (ej. notificaciones.tudominio.com)
TXT  notificaciones.tudominio.com   "v=spf1 include:amazonses.com ~all"

; 2. DKIM (DomainKeys Identified Mail — Clave RSA de 2048 bits provista por Resend)
TXT  resend._domainkey.notificaciones.tudominio.com   "p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A..."

; 3. DMARC con Alineación Estricta (Protege contra spoofing y habilita reputación máxima)
TXT  _dmarc.tudominio.com   "v=DMARC1; p=quarantine; sp=reject; pct=100; adkim=r; aspf=r; rua=mailto:dmarc@tudominio.com"
```

---

## 2. Integración Nativa de `Resend` en Cloudflare Workers (`Zero-SDK`)

### 2.1 Envío Idempotente con Paridad `HTML` + `Plain Text` y RFC 8058
Los filtros anti-spam penalizan severamente los correos que solo contienen `html` sin versión `text` plana o que carecen de `Reply-To`:

```javascript
export async function sendTransactionalEmail(env, options) {
  const {
    idempotencyKey,
    to,
    subject,
    html,
    text,
    replyTo = env.DEFAULT_REPLY_TO_EMAIL,
    unsubscribeUrl,
    tags = [],
  } = options;

  const headers = {};
  if (unsubscribeUrl) {
    headers['List-Unsubscribe'] = `<${unsubscribeUrl}>`;
    headers['List-Unsubscribe-Post'] = 'List-Unsubscribe=One-Click';
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey || crypto.randomUUID(),
    },
    body: JSON.stringify({
      from: env.RESEND_FROM_EMAIL || 'Notificaciones <hola@notificaciones.tudominio.com>',
      to: Array.isArray(to) ? to : [to],
      reply_to: replyTo,
      subject,
      html,
      text,
      headers,
      tags,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Resend API Error (${response.status}): ${errText}`);
  }
  return response.json(); // { id: "re_..." }
}
```

### 2.2 Verificación Criptográfica de Webhooks de `Resend` (`Svix` HMAC-SHA256) y Lista de Supresión
Para mantener la tasa de rebote (`Bounce Rate`) debajo del `< 2.0%` y la tasa de quejas (`Spam Complaint Rate`) debajo del `< 0.08%`, todo Worker debe escuchar el webhook de Resend y marcar inmediatamente en D1 cualquier correo con `email.bounced` o `email.complained`:

```javascript
export async function verifyResendSvixWebhook(request, env) {
  const svixId = request.headers.get('svix-id');
  const svixTimestamp = request.headers.get('svix-timestamp');
  const svixSignature = request.headers.get('svix-signature');
  const rawBody = await request.text();

  if (!svixId || !svixTimestamp || !svixSignature || !env.RESEND_WEBHOOK_SECRET) {
    return { valid: false };
  }

  const nowSec = Math.floor(Date.now() / 1000);
  if (Math.abs(nowSec - Number(svixTimestamp)) > 300) {
    return { valid: false, reason: 'Svix timestamp expired' };
  }

  // El secreto de Resend/Svix comienza con "whsec_" seguido de la clave en Base64
  const secretBase64 = env.RESEND_WEBHOOK_SECRET.replace(/^whsec_/, '');
  const secretBytes = Uint8Array.from(atob(secretBase64), (c) => c.charCodeAt(0));

  const key = await crypto.subtle.importKey(
    'raw',
    secretBytes,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signedContent = new TextEncoder().encode(`${svixId}.${svixTimestamp}.${rawBody}`);
  const sigBuffer = await crypto.subtle.sign('HMAC', key, signedContent);
  const expectedBase64 = btoa(String.fromCharCode(...new Uint8Array(sigBuffer)));

  const signatures = svixSignature.split(' ').map((s) => s.split(',')[1]);
  if (!signatures.includes(expectedBase64)) {
    return { valid: false, reason: 'Invalid Svix signature' };
  }

  return { valid: true, event: JSON.parse(rawBody) };
}
```

---

## 3. Las 7 Plantillas Canónicas de la Secuencia de Onboarding y Conversión

Extraído directamente de `marketingskills/skills/emails/SKILL.md`: **Cada correo tiene exactamente UN trabajo y UN único CTA principal**.

| # | Timing | Propósito Estratégico | Línea de Asunto Canónica (Sin Clickbait) | Estructura del Cuerpo (150–220 palabras) | CTA Único |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **Inmediato (`< 30s`)** | Entregar el activo prometido y lograr la **Primera Victoria Rápida** en `< 3 min`. | `Tu acceso a [Producto/Diagnóstico] + el primer paso` | Confirmación directa, enlace al entregable y el único paso de 2 minutos que entrega el primer resultado visible. | `Abrir mi diagnóstico ahora →` |
| **2** | **Día 1–2** | Eliminar el bloqueo técnico o de configuración inicial (*Setup Acceleration*). | `Cómo resolver [Dolor #1] en menos de 5 minutos` | Contraste entre la forma manual lenta y el atajo incluido en la plataforma/servicio. Ofrecer ayuda asistida si se trabó. | `Completar el paso 1 en 2 minutos →` |
| **3** | **Día 3–4** | Prueba Social Cuantificada (*Case Study Story*). | `Cómo [Cliente Similar] pasó de [Línea Base] a [Resultado] en [Plazo]` | Historia real de 3 párrafos: situación previa, cambio específico implementado y resultado numérico verificable. | `Ver el caso completo de 2 minutos →` |
| **4** | **Día 5–6** | Neutralizar la Objeción #1 (Tiempo de migración, integración o costo oculto). | `La pregunta que siempre nos hacen antes de migrar` | Abordar de frente el miedo principal del comprador con evidencia técnica y mostrar cómo se resuelve sin esfuerzo. | `Solicitar migración asistida sin cargo →` |
| **5** | **Día 7–8** | Desbloqueo de Valor Secundario (*Aha! Moment Consolidado*). | `Un detalle de [Producto] que ahorra 4 horas por semana` | Mostrar una función o beneficio de alto apalancamiento que los usuarios nuevos suelen pasar por alto. | `Activar [Función Clave] →` |
| **6** | **Día 10–11** | Oferta Directa con Reversión de Riesgo (Garantía explícita). | `¿Listo para escalar [Resultado]? (Incluimos garantía de 30 días)` | Resumen del ROI proyectado, recordatorio de la garantía sin riesgo y enlace directo al plan o llamada de cierre. | `Elegir mi plan con garantía total →` |
| **7** | **Día 13–14** | Cierre Conversacional de Texto Plano (*Reply-Trigger*). | `¿En qué te trabaste con [Objetivo], [Nombre]?` | Correo corto de 4 líneas en texto plano puro firmado por una persona real: *"¿Pudiste avanzar con X o hay algo técnico que no encaja con tu flujo? Respondeme este correo con una línea."* | *(Respuesta directa al correo)* |

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SOTA_RAG_ARCHITECTURES_AND_TOOLS_2026]] · [[CURATED_MASTER_BOOKS_AND_COURSES_2026]] · [[CANON_SOFTWARE_ENGINEERING_AT_GOOGLE]] · [[CANON_HARNESS_ENGINEERING_INTEGRAL_2026]] · #architecture_and_books
