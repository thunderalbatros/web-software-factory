# PRD_LEAN.md — Definición Ejecutiva de Producto e Identidad de Marca (`agencia-alfa`)

> **Estado Compuerta #1:** `COMPLETED_BY_CTO` | **Modo de Marca:** `PARTIAL_BRAND_EVOLUTION` (`lockClientPalette: false`)  
> **Sello del CTO:** `2026-10-29T14:53:43.389Z` | **Compilado por:** `tools/orchestrator/lean_prd_architect.mjs`

---

## 1. Identidad del Negocio y Problema que Resuelve
- **Marca Oficial:** Agencia Alfa (*"Soluciones profesionales de alto impacto en saas"*)
- **Rubro / Categoría Industrial:** `saas` (`b2b-saas-platform`)
- **Oferta Principal:** Servicios y productos especializados de Agencia Alfa para clientes exigentes en el rubro saas.
- **Necesidad / Dolor que Resuelve:** Elimina la fricción, incertidumbre de precios y demoras operativas ofreciendo respuesta inmediata, autoridad verificable y conversión directa.

---

## 2. Público Objetivo, Psicología del Comprador y UVP
- **Demografía y Modelo:** Decisores B2B y compradores calificados de 28 a 58 años en Argentina y LATAM (`B2B / B2C High-Intent`)
- **Contexto de Uso (Móvil vs. Desktop):** 65% móvil (consulta rápida y contacto directo por WhatsApp/turno) y 35% desktop (evaluación comparativa detallada)
- **Propuesta Única de Valor (`UVP`):** Agencia Alfa combina atención experta inmediata, resultados auditables y una experiencia digital sin fricción superior a los competidores tradicionales.
- **Las 3 Objeciones Críticas a Derribar en la Página:**
  1. ¿Tienen experiencia comprobable y respaldo real en casos similares al mío?
  2. ¿Cuál es el costo transparente, plazo de entrega y garantía sin letra chica?
  3. ¿Qué tan rápido recibo atención humana o solución si surge una urgencia?

---

## 3. Contrato de Identidad Visual del Cliente (`BRAND_IDENTITY_LOCK.json`)
- **Modo de Identidad (`brandIdentityMode`):** `PARTIAL_BRAND_EVOLUTION`
- **Paleta del Cliente Bloqueada (`lockClientPalette`):** `false`
- **Colores Oficiales:**
  - `--color-primary`: `#2563EB`
  - `--color-secondary`: `#0F172A`
  - `--color-accent`: `#10B981`
  - `--color-surface-light`: `#F8FAFC`
  - `--color-surface-dark`: `#0B0F19`
- **Activos de Marca:**
  - Logotipo Principal: `public/assets/brand/logo-primary.svg`
  - Isotipo: `public/assets/brand/isotipo.svg`
  - Reglas de Uso: Respetar área de aislamiento mínima de 16px, prohibido deformar proporciones o alterar colores institucionales.
- **Tipografías Oficiales:**
  - Display: `'Plus Jakarta Sans', 'Inter', system-ui, sans-serif`
  - Sans: `'Inter', system-ui, -apple-system, sans-serif`
  - Mono: `'JetBrains Mono', ui-monospace, monospace`

---

## 4. Dirección Estética, Funciones Operativas y Conversión (`CRO`)
- **Estilo Estético y Atmósfera:** Ingeniería visual moderna de alto contraste y precisión táctil (`dual-theme-toggle`)
- **Referencias Visuales:** https://stripe.com (Claridad de jerarquía tipográfica, micro-interacciones limpias y confianza comercial) | https://linear.app (Orden espacial de grillas Bento y velocidad percibida instantánea)
- **Primary CTA:** `Solicitar Presupuesto / Agendar Consulta Ahora` (Formulario Calificado + WhatsApp Directo)
- **Secondary CTA:** `Ver Casos de Éxito y Preguntas Frecuentes`
- **Funciones y Capacidades Requeridas:**
  - Hero de respuesta directa con Propuesta Única de Valor y CTA primario visible sin scroll
  - Catálogo / Grilla interactiva de servicios o productos con desglose claro de beneficios
  - Bloque de derribo de las 3 objeciones principales y prueba social verificada
  - Formulario de contacto validado con integración directa a WhatsApp / CRM

---

## 5. Activos Reales, Prueba Social y Datos Operativos Fijos
- **Activos Provistos:** `public/assets/brand/logo-primary.svg`, `public/assets/brand/isotipo.svg`, `public/assets/media/hero-showcase.webp`
- **Prueba Social Verificable:** +150 clientes atendidos con 98% de satisfacción verificada • Testimonios reales con nombre, cargo y resultados medibles • Certificaciones profesionales y respaldo institucional verificable
- **Idioma y Tono:** Español rioplatense (es-AR) profesional, claro, empático y directo al grano (cero relleno genérico)
- **Datos Operativos:** Av. del Libertador 1000, CABA, Argentina | Tel: +54 11 4000-0000 | WhatsApp: +54 9 11 5000-0000 | Horario: Lunes a Viernes de 09:00 a 18:30 hs | Legal: Agencia Alfa S.R.L. — Todos los derechos reservados

---

## 6. Invariantes de Producto y Marca (`[INV-01]` a `[INV-07]`)
- **[INV-01] Claridad de Oferta y Dolor Resuelto:** El Hero de `Agencia Alfa` debe comunicar qué ofrece y resolver el dolor principal en `<= 3 segundos`.
- **[INV-02] Derribo de las 3 Objeciones del Comprador:** El flujo de lectura debe responder explícitamente las 3 dudas del comprador con evidencia real antes del cierre.
- **[INV-03] Respeto Estricto de Identidad de Marca (`PARTIAL_BRAND_EVOLUTION`):** `token_compiler.mjs` y `ryux_design_gate.mjs` deben respetar `BRAND_IDENTITY_LOCK.json` (`lockClientPalette: false`, primario `#2563EB`, logo `public/assets/brand/logo-primary.svg`).
- **[INV-04] Atmósfera y Ergonomía Visual:** Respetar el modo `dual-theme-toggle` y la estética *"Ingeniería visual moderna de alto contraste y precisión táctil"* con contraste perceptual `APCA`.
- **[INV-05] Conversión Sin Fricción (`CRO`):** Garantizar que el CTA primario (**`Solicitar Presupuesto / Agendar Consulta Ahora`**) y todas las capacidades operativas funcionen sin errores en móvil y desktop.
- **[INV-06] Veracidad de Activos y Datos Legales:** Utilizar únicamente prueba social verificada, tono `Español rioplatense (es-AR) profesional, claro, empático y directo al grano (cero relleno genérico)` y los datos operativos reales del cliente.
- **[INV-07] Protección Contractual de Alcance (`Explicit Non-Goals`):** Bloquear cualquier desvío fuera del alcance pactado en esta versión.

---

## 7. Explicit Non-Goals (Fuera del Alcance de esta Versión)
- No incluye sistema de facturación AFIP/ARCA embebido en esta fase inicial
- No incluye foro comunitario ni chat en vivo con operadores 24/7 no pactado
- No incluye integraciones con ERPs legados fuera de los endpoints definidos en el alcance

---

## 8. Métricas de Éxito del Cliente (`Definition of Success`)
- Claridad de propuesta de valor en menos de 3 segundos (5-Second Test)
- LCP < 1.2s, CLS = 0.00, 60 FPS constantes y puntaje RYUX >= 95/100
- Incremento medible en consultas calificadas / conversiones desde móvil y desktop
