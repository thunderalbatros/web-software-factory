# 🏛️ ENTREVISTA #1 OBLIGATORIA: PRODUCTO (`PRD_LEAN.md`) E IDENTIDAD DE MARCA — `academia-ia`

> **Estado de Compuerta #1:** `PENDING_CTO_PRD_INPUT`
> **Regla Estricta Anti-Invención:** Está prohibido generar `PRD_LEAN.md`, pasar a la Entrevista #2 (`SPEC.md` técnico con `npm run cto:entrevista`) o ejecutar `npm run cto:construir` hasta que completes/revises este documento o `PRD_INTERVIEW_STATE.json` y apruebes explícitamente con:
> `npm run cto:entrevista-prd -- academia-ia --aprobar`

---

## Bloque 1 — Identidad del Negocio y Necesidad que Resuelve
- **Nombre Oficial de la Empresa / Marca / Proyecto:** Academia IA
- **Eslogan (`Tagline`):** Plataforma educativa abierta, minimalista e inclusiva sobre IA y tecnologías emergentes en español
- **Rubro / Categoría Industrial (`abogacia`, `fintech`, `erp`, `ecommerce`, `streamer`, `clinica`, `saas`, `lujo`):** `education`
- **¿Qué vende u ofrece exactamente?:** Recorrido pedagógico abierto en 3 niveles UNESCO (Principiante/Adquirir sin código, Intermedio/Profundizar y Avanzado/Crear con prioridad Open-Source y costo $0.00 USD de servidor).
- **¿Qué necesidad, dolor o problema concreto le resuelve este sitio web a sus usuarios o clientes?:** Elimina los muros de pago, la sobrecarga cognitiva y la dependencia de plataformas cerradas enseñando IA práctica, ética y verificable con progreso local-first y alternativas gratuitas sin tarjeta.

---

## Bloque 2 — Público Objetivo, Psicología del Comprador y Diferenciación
- **Perfil del Público Objetivo:** Estudiantes, trabajadores, oficios reales, docentes y desarrolladores hispanohablantes (Open Educational Platform ($0 Server, Voluntary Donations Without Exclusive Benefits)) (Open Educational Platform ($0 Server, Voluntary Donations Without Exclusive Benefits))
- **Contexto de Visita (Urgencia Móvil vs. Análisis en Desktop):** 55% móvil (lectura calmada en columna 65ch y repaso offline PWA) y 45% desktop (laboratorios interactivos, código y proyectos integradores)
- **Las 3 Principales Dudas u Objeciones antes de comprar o contratar:**
  1. ¿Necesito saber programar o pagar suscripciones con tarjeta para aprender IA útil en mi oficio?
  2. ¿Van a guardar mis datos personales en un servidor o bloquear lecciones detrás de un plan Pro?
  3. ¿Puedo practicar con una PC básica y presupuesto $0 sin GPU propia?
- **Propuesta Única de Valor (`UVP` — ¿Por qué elegir a este negocio y no a su competencia?):** Academia IA une rigor pedagógico UNESCO/OCDE, diseño editorial OKLCH 90/8/2 de lectura calmada (65ch), micro-explorables reales en el navegador y soberanía Open-Source sin login ni muros de pago.

---

## Bloque 3 — Identidad Visual Actual del Cliente (`Existing Brand Design Intake & Lock`)
- **Estado de Identidad de Marca (`brandIdentityMode`):** `PARTIAL_BRAND_EVOLUTION`
  - *Opciones:* `"STRICT_EXISTING_BRAND"` (respetar logotipo y paleta oficial sin alteración) | `"PARTIAL_BRAND_EVOLUTION"` (modernizar sobre base existente) | `"GREENFIELD_NEW_BRAND"` (crear identidad desde cero).
- **Bloqueo Inmutable de Paleta del Cliente (`lockClientPalette`):** `false`
- **Logotipo, Isotipo e Imagotipo:**
  - **Logotipo Principal (`.svg`/`.png`):** `public/favicon.svg`
  - **Isotipo / Icono Independiente:** `public/favicon.svg`
  - **Variante para Fondo Oscuro:** `public/favicon.svg`
  - **Variante para Fondo Claro:** `public/favicon.svg`
  - **Reglas de Uso:** Marca editorial limpia con isotipo geométrico SVG (< 2 KB), área de aislamiento de 12px y contraste APCA Lc >= 85 en tema claro y oscuro.
- **Paleta de Colores Oficial del Cliente (`HEX`, `RGB` u `OKLCH`):**
  - `primaryBrandColor`: `oklch(34% 0.13 245)`
  - `secondaryBrandColor`: `oklch(42% 0.04 250)`
  - `accentBrandColor`: `oklch(40% 0.12 162)`
  - `surfaceLightColor`: `oklch(98.5% 0.004 250)`
  - `surfaceDarkColor`: `oklch(16% 0.012 250)`
- **Tipografía Oficial de la Marca:**
  - **Títulos (`displayFont`):** `'Newsreader', 'Instrument Serif', Georgia, serif`
  - **Cuerpo (`sansFont`):** `'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif`
  - **Datos Numéricos / Código (`monoFont`):** `'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`
  - **Permitir Sugerencia de Par Tipográfico de Fábrica:** `false`

---

## Bloque 4 — Estilo Estético, Atmósfera y Sitios de Referencia
- **Estilo y Estética Deseada:** Editorial minimalista de lectura calmada (65ch, OKLCH 90/8/2 con 3 acentos semánticos de nivel y cero relleno 3D)
- **Preferencia de Atmósfera (`light-only`, `dark-only`, `dual-theme-toggle`):** `dual-theme-toggle`
- **Sitios Web de Referencia / Competidores Admirados:**
  - **https://distill.pub:** Claridad de artículos explorables interactivos y rigor tipográfico académico
  - **https://ciechanow.ski:** Micro-simulaciones autoexplicativas en el navegador sin distracciones visuales

---

## Bloque 5 — Funciones, Capacidades del Sitio y Objetivos de Conversión (`CRO`)
- **Objetivo de Conversión #1 (`Primary CTA`):** `Comenzar Nivel 1 · Adquirir` (Canal: Navegación directa local-first sin registro)
- **Objetivo de Conversión #2 (`Secondary CTA`):** `Explorar los 3 Niveles UNESCO`
- **Listado de Funciones y Capacidades Operativas Requeridas:**
  - Layout editorial propio en Astro 7.4.11 (65ch, OKLCH 90/8/2 con matiz por nivel, tema claro/oscuro WCAG 2.2 AA)
  - Fachada multi-video (youtube-nocookie + OER) con aviso breve de almacenamiento local al reproducir y síntesis textual
  - Micro-explorable real de conteo de tokens BPE en cliente con js-tiktoken y ecuaciones MathML con temml (0 KB JS)
  - Tutor socrático aislado en iframe sandbox='allow-scripts' comunicado vía postMessage (Valibot) + DOMPurify Trusted Types

---

## Bloque 6 — Activos Reales, Prueba Social, Textos Fijos y Datos Operativos
- **Rutas a Fotografías, Videos o Catálogos Reales Provistos:** `public/favicon.svg`, `data/academy/project_charter.json`
- **Prueba Social Real Disponible:**
  - Currículo alineado con marcos abiertos UNESCO (Adquirir -> Profundizar -> Crear) y alfabetización en IA OCDE/UE
  - Código MIT y contenido CC-BY-NC-SA-4.0 con trazabilidad SPDX verificada en data/academy/*.json
- **Idioma y Tono de Comunicación:** Español neutro internacional (tú) en lecciones (<= 110 palabras por párrafo); claridad serena y rigurosa.
- **Datos Operativos Fijos Obligatorios:**
  - **Dirección:** Plataforma Educativa Abierta 100% Digital (Cloudflare Edge Static Assets)
  - **Teléfono:** No aplica (sin venta telefónica)
  - **WhatsApp:** No aplica (sin embudo comercial)
  - **Horarios de Atención:** Acceso libre 24/7 con soporte offline vía PWA
  - **Razón Social / Textos Legales:** Academia IA — Código MIT · Contenido CC-BY-NC-SA-4.0 · Cumplimiento Ley 25.326 (local-first) y Ley 26.653 (WCAG 2.2 AA)

---

## Bloque 7 — Frontera de Alcance (`Explicit Non-Goals`) y Criterios de Éxito
- **Qué queda explícitamente FUERA del alcance de esta versión (`Explicit Non-Goals` — Escudo Contractual):**
  - Cero muros de pago, cero sección #pricing, cero plan Pro, cero publicidad y cero patrocinios comerciales
  - Cero rachas punitivas (streaks), cero leaderboards públicos y cero temporizadores de urgencia
  - Cero @astrojs/starlight, cero shaders 3D WebGPU decorativos, cero audio de fondo y cero Pollinations
  - Cero cuentas de usuario o almacenamiento de claves API/datos personales en servidores
- **Métricas de Éxito Esperadas por el Cliente:**
  - 0 violaciones WCAG 2.2 AA en @axe-core/playwright (tema claro y oscuro)
  - 0 errores de consola y 0 violaciones de CSP o Trusted Types en Chromium
  - LCP <= 1800 ms, CLS = 0.000 y jsHeapUsedMB < 64 MB
