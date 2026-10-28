# CANON: Analítica Privacy-First (PostHog, Plausible, Cloudflare Web Analytics), Reverse Proxy en el Edge y Experimentación A/B Sin Parpadeo (2026)

> **Dominio:** `software_factory` / `analytics_and_experimentation`  
> **Versión:** 2026.10 (SOTA Web Software Factory)  
> **Aplicación:** `templates/astro-edge`, `templates/vanilla-edge`, `projects/<slug>`

---

## Tabla de Trazabilidad de Fuentes Físicas

| Sección del Canon | Archivo Físico / Fuente Primaria Verificada | Conceptos y Reglas Extraídas |
| :--- | :--- | :--- |
| **1. Taxonomía de Eventos `object_action` e Integridad Analítica** | `C:\Users\tomas\Desktop\streamerbot\references\sota-2026\growth-and-hitl\marketingskills\skills\analytics\SKILL.md` | Convención `object_action` en `snake_case`, separación entre eventos de negocio vs. ruido de UI, y las 3 Reglas de Integridad Analítica (*Compute Don't Eyeball*, *Match Closed Windows*, *Verify Coverage*). |
| **2. Diseño de Experimentos A/B y Tamaño Muestral** | `C:\Users\tomas\Desktop\streamerbot\references\sota-2026\growth-and-hitl\marketingskills\skills\ab-testing\SKILL.md` | Marco de Hipótesis Estructurada, jerarquía de pruebas (A/B, A/B/n, MVT, Split URL), tabla de tamaño muestral por variante (95% confianza, 80% potencia), métricas primarias vs. *Guardrail Metrics*. |
| **3. Reverse Proxy en Cloudflare Workers y Split Testing en el Edge** | `templates/astro-edge/worker/index.js` + `templates/vanilla-edge/worker/index.js` | Enrutamiento First-Party en el Edge (`/api/telemetry` / `/ingest`) libre de bloqueadores y asignación determinista de variantes con `HTMLRewriter` y `CLS = 0.00`. |

---

## 1. Arquitectura de Medición *Privacy-First* (Cero Banners de Cookies Invasivos)

En 2026, inyectar Google Analytics 4 (`gtag.js` de `> 90 KB`) junto con un banner de consentimiento de cookies que cubre el 30% de la pantalla móvil destruye tanto el **LCP/INP** como la **conversión inicial**, además de perder entre el **25% y el 40% de los datos reales** por bloqueadores de anuncios (Brave, uBlock Origin, Safari ITP).

### 1.1 Estándar de Tres Capas sin Cookies (*Cookieless by Default*)
1. **Capa 1 — Telemetría de Red y Core Web Vitals:** **Cloudflare Web Analytics** (0 cookies, `< 4 KB`, mide `LCP`, `INP`, `CLS` y atribución de países/referrers sin requerir banner GDPR/LGPD).
2. **Capa 2 — Analítica de Embudo Ligera:** **Plausible Analytics** (`< 1.5 KB`) o **Umami** operando mediante hash diario rotativo (`HMAC(daily_salt + ip + user_agent + domain)`), cumpliendo estrictamente con GDPR, CCPA, LGPD (Brasil) y Ley 25.326 (Argentina) sin almacenar PII ni cookies persistentes.
3. **Capa 3 — Analítica de Producto y Feature Flags:** **PostHog** configurado explícitamente con `persistence: 'memory'` (o `'sessionStorage'`) para visitantes anónimos, activando identificación persistente únicamente tras el inicio de sesión autenticado del usuario.

### 1.2 Reverse Proxy First-Party en Cloudflare Workers (`worker/index.js`)
Para evitar que las listas de filtros (`EasyPrivacy` / `uBlock`) bloqueen las peticiones hacia `us.i.posthog.com` o `plausible.io`, todo proyecto de la fábrica debe enrutar la telemetría a través de su propio dominio en el Worker:

```javascript
// Fragmento canónico en worker/index.js — Reverse Proxy First-Party para PostHog / Plausible
async function handleTelemetryProxy(request, env, ctx) {
  const url = new URL(request.url);
  if (!url.pathname.startsWith('/ingest/')) return null;

  const targetPath = url.pathname.replace(/^\/ingest/, '');
  const upstreamHost = targetPath.startsWith('/static/')
    ? 'https://us-assets.i.posthog.com'
    : 'https://us.i.posthog.com';

  const targetUrl = new URL(targetPath + url.search, upstreamHost);
  const headers = new Headers(request.headers);
  headers.delete('cookie'); // Garantiza privacidad cero-cookies en tránsito
  headers.set('X-Forwarded-For', request.headers.get('CF-Connecting-IP') || '');

  const proxyReq = new Request(targetUrl.toString(), {
    method: request.method,
    headers,
    body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
  });

  return fetch(proxyReq);
}
```

---

## 2. Taxonomía Canónica de Eventos (`object_action`)

Extraído de `marketingskills/skills/analytics`: nunca mezclar convenciones (`camelCase`, `PascalCase`, espacios) ni crear eventos redundantes (`Click Hero Button`, `hero_btn_click`, `CTA_Clicked`). Todo evento debe seguir el formato **`objeto_accion`** en `snake_case` minúscula.

### 2.1 Diccionario Oficial de Eventos de la Fábrica

| Etapa del Embudo | Nombre del Evento (`object_action`) | Propiedades Obligatorias (`snake_case`) | Cuándo se Dispara |
| :--- | :--- | :--- | :--- |
| **Atención / Hero** | `cta_clicked` | `location` (`hero`, `navbar`, `sticky_bar`, `footer`), `cta_text`, `destination_url` | Clic en cualquier llamada a la acción primaria o secundaria. |
| **Evaluación** | `pricing_tier_selected` | `plan_name` (`starter`, `pro`, `enterprise`), `billing_cycle` (`monthly`, `annual`), `currency` (`ARS`, `USD`) | Interacción con el selector de planes o conmutador anual/mensual. |
| **Evaluación** | `calculator_used` | `calculator_id`, `input_value`, `estimated_savings` | Uso de una calculadora interactiva de ROI o cotizador. |
| **Conversión Lead** | `form_submitted` | `form_id` (`contact`, `demo_request`, `booking`), `lead_source`, `has_phone` (`boolean`) | Respuesta HTTP `200 OK` verificada del endpoint `/api/contact` (nunca en el clic previo a validar). |
| **Conversión WhatsApp** | `whatsapp_escalation_clicked` | `location`, `prefilled_intent`, `page_path` | Apertura de enlace o widget de WhatsApp con mensaje pre-armado. |
| **Activación SaaS** | `signup_completed` | `auth_method` (`oauth_google`, `magic_link`, `email`), `plan_initial` | Creación exitosa de cuenta en base de datos D1. |
| **Activación ("Aha!")** | `onboarding_aha_reached` | `activation_milestone`, `time_to_value_seconds` | El usuario completa la primera acción que entrega valor real. |
| **Ingresos / Pago** | `checkout_payment_completed` | `provider` (`mercadopago`, `stripe`, `lemonsqueezy`), `amount`, `currency`, `order_id` | Confirmación verificada del pago o webhook. |

### 2.2 Las 3 Reglas de Integridad Analítica (`marketingskills/skills/analytics`)
1. **Calcular, No Estimar a Ojo (*Compute, Don't Eyeball*):** Nunca declarar que dos métricas "están correlacionadas" o que una tendencia "se está desacelerando" mirando un gráfico. Calcular siempre la tasa de crecimiento compuesta, el intervalo de confianza o el coeficiente $r$ antes de emitir un diagnóstico.
2. **Comparar Ventanas de Observación Cerradas (*Match Closed Observation Windows*):** Nunca comparar la conversión de una cohorte de hace 30 días contra una cohorte de hace 3 días que aún no tuvo tiempo de madurar. Usar siempre ventanas cerradas idénticas (`D1`, `D7`, `D14`, `D30`).
3. **Verificar Cobertura Antes de Concluir (*Check Coverage First*):** Si una tasa de conversión cae abruptamente un 50% en un día, verificar primero si hubo un despliegue que rompió el disparo del evento o una caída por región/navegador antes de culpar al copywriting o al tráfico.

---

## 3. Protocolo Riguroso de Experimentación y Pruebas A/B (`ab-testing`)

Extraído de `marketingskills/skills/ab-testing`:

### 3.1 Fórmula Obligatoria de Hipótesis Estructurada
Ningún experimento A/B se despliega sin documentar primero su hipótesis falsable:

> **Porque observamos** `[dato cuantitativo o evidencia cualitativa]`,  
> **creemos que** `[cambio específico en la variante B]` **para** `[segmento de audiencia]`  
> **provocará** `[efecto esperado en el comportamiento]`.  
> **Sabremos que esto es verdadero cuando** `[Métrica Primaria]` **mejore en al menos** `[MDE %]`  
> **sin degradar** `[Métrica Guardrail]`.

- **Métrica Primaria (Una sola):** La conversión directa que el cambio busca mover (ej. tasa de `form_submitted` o `checkout_payment_completed`).
- **Métricas Guardrail (1 a 2):** Métricas que NO deben empeorar aunque suba la métrica primaria (ej. tasa de rebote de pagos rechazados, tasa de cancelación en 7 días, o latencia `INP < 200ms`).

### 3.2 Tabla de Tamaño Muestral por Variante (Confianza 95%, Potencia Estadística 80%)
*Nota: Números expresados **por variante** (multiplicar por 2 para el tráfico total de un test A/B 50/50).*

| Conversión Base Actual (*Baseline*) | MDE 10% (Cambio relativo pequeño) | MDE 20% (Cambio relativo moderado) | MDE 30% (Cambio relativo fuerte) | MDE 50% (Cambio estructural radical) |
| :--- | :--- | :--- | :--- | :--- |
| **1.0%** | `150.000` visitantes/rama | `39.000` visitantes/rama | `17.000` visitantes/rama | `6.500` visitantes/rama |
| **3.0%** | `49.000` visitantes/rama | `12.500` visitantes/rama | `5.700` visitantes/rama | `2.100` visitantes/rama |
| **5.0%** | `29.000` visitantes/rama | `7.400` visitantes/rama | `3.300` visitantes/rama | `1.200` visitantes/rama |
| **10.0%** | `14.000` visitantes/rama | `3.500` visitantes/rama | `1.600` visitantes/rama | `600` visitantes/rama |

- **Regla para Sitios de Bajo Tráfico (`< 2.000` visitas/semana):** NO ejecutar micro-tests de color de botón (MDE `< 10%`), porque tardarían 9 meses en alcanzar significancia estadística. En sitios de bajo tráfico, probar **cambios radicales de oferta o titular** (buscando un MDE $\ge 30\%–50\%$) o utilizar pruebas secuenciales + validación cualitativa de grabaciones de sesión.
- **Duración Mínima Obligatoria:** Al menos **1 ciclo comercial completo (7 o 14 días completos)** para capturar tanto el comportamiento de días hábiles como el de fin de semana, y jamás detener el test antes de alcanzar el tamaño muestral predefinido (*No Peeking Penalty*).

### 3.3 Split Testing en el Edge con `HTMLRewriter` (`Zero-Flicker` / `CLS = 0.00`)
Los scripts tradicionales de A/B testing en el cliente ocultan el `<body>` y reemplazan el texto después de cargar JavaScript, provocando el temido *Flash of Original Content (FOOC)* y penalizando el `LCP`. En `web-software-factory`, las variantes A/B se inyectan directamente en el flujo de bytes del Cloudflare Worker mediante `HTMLRewriter`:

```javascript
// Asignación determinista A/B en Cloudflare Workers sin parpadeo (0ms FOOC)
export async function applyEdgeAbTest(request, response) {
  const cookieHeader = request.headers.get('Cookie') || '';
  const match = cookieHeader.match(/wf_ab_hero=([AB])/);
  const variant = match ? match[1] : (Math.random() < 0.5 ? 'A' : 'B');

  const rewritten = new HTMLRewriter()
    .on('[data-ab-test="hero-headline"]', {
      element(el) {
        el.setAttribute('data-ab-variant', variant);
        if (variant === 'B') {
          el.setInnerContent('Automatizá el 100% de tu facturación y conciliación bancaria en 4 minutos');
        }
      }
    })
    .transform(response);

  const headers = new Headers(rewritten.headers);
  if (!match) {
    headers.append('Set-Cookie', `wf_ab_hero=${variant}; Path=/; Max-Age=2592000; SameSite=Lax; Secure`);
  }
  return new Response(rewritten.body, { status: rewritten.status, headers });
}
```

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SPLE_ISO26550_AND_SOFTWARE_FACTORIES_ARCHITECTURE_2026]] · [[CANON_ASTRO5_CLOUDFLARE_WORKERS_AND_MODERN_WEB_TEMPLATES_2026]] · [[CANON_MULTI_BRAND_DESIGN_SYSTEMS_DTCG_STYLE_DICTIONARY_AND_ARCHETYPES_2026]] · [[CANON_SOTA_AGENT_TEAM_TOPOLOGY_AND_2026_WEB_STACK_AUDIT]] · #software_factory
