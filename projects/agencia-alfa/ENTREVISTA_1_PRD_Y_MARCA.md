# 🏛️ ENTREVISTA #1 OBLIGATORIA: PRODUCTO (`PRD_LEAN.md`) E IDENTIDAD DE MARCA — `agencia-alfa`

> **Estado de Compuerta #1:** `COMPLETED_BY_CTO`
> **Regla Estricta Anti-Invención:** Está prohibido generar `PRD_LEAN.md`, pasar a la Entrevista #2 (`SPEC.md` técnico con `npm run cto:entrevista`) o ejecutar `npm run cto:construir` hasta que completes/revises este documento o `PRD_INTERVIEW_STATE.json` y apruebes explícitamente con:
> `npm run cto:entrevista-prd -- agencia-alfa --aprobar`

---

## Bloque 1 — Identidad del Negocio y Necesidad que Resuelve
- **Nombre Oficial de la Empresa / Marca / Proyecto:** Agencia Alfa
- **Eslogan (`Tagline`):** Soluciones profesionales de alto impacto en saas
- **Rubro / Categoría Industrial (`abogacia`, `fintech`, `erp`, `ecommerce`, `streamer`, `clinica`, `saas`, `lujo`, `education`):** `saas`
- **¿Qué vende u ofrece exactamente?:** Servicios y productos especializados de Agencia Alfa para clientes exigentes en el rubro saas.
- **¿Qué necesidad, dolor o problema concreto le resuelve este sitio web a sus usuarios o clientes?:** Elimina la fricción, incertidumbre de precios y demoras operativas ofreciendo respuesta inmediata, autoridad verificable y conversión directa.

---

## Bloque 2 — Público Objetivo, Psicología del Comprador y Diferenciación
- **Perfil del Público Objetivo:** Decisores B2B y compradores calificados de 28 a 58 años en Argentina y LATAM (B2B / B2C High-Intent)
- **Contexto de Visita (Urgencia Móvil vs. Análisis en Desktop):** 65% móvil (consulta rápida y contacto directo por WhatsApp/turno) y 35% desktop (evaluación comparativa detallada)
- **Las 3 Principales Dudas u Objeciones antes de comprar o contratar:**
  1. ¿Tienen experiencia comprobable y respaldo real en casos similares al mío?
  2. ¿Cuál es el costo transparente, plazo de entrega y garantía sin letra chica?
  3. ¿Qué tan rápido recibo atención humana o solución si surge una urgencia?
- **Propuesta Única de Valor (`UVP` — ¿Por qué elegir a este negocio y no a su competencia?):** Agencia Alfa combina atención experta inmediata, resultados auditables y una experiencia digital sin fricción superior a los competidores tradicionales.

---

## Bloque 3 — Identidad Visual Actual del Cliente (`Existing Brand Design Intake & Lock`)
- **Estado de Identidad de Marca (`brandIdentityMode`):** `PARTIAL_BRAND_EVOLUTION`
  - *Opciones:* `"STRICT_EXISTING_BRAND"` (respetar logotipo y paleta oficial sin alteración) | `"PARTIAL_BRAND_EVOLUTION"` (modernizar sobre base existente) | `"GREENFIELD_NEW_BRAND"` (crear identidad desde cero).
- **Bloqueo Inmutable de Paleta del Cliente (`lockClientPalette`):** `false`
- **Logotipo, Isotipo e Imagotipo:**
  - **Logotipo Principal (`.svg`/`.png`):** `public/assets/brand/logo-primary.svg`
  - **Isotipo / Icono Independiente:** `public/assets/brand/isotipo.svg`
  - **Variante para Fondo Oscuro:** `public/assets/brand/logo-dark.svg`
  - **Variante para Fondo Claro:** `public/assets/brand/logo-light.svg`
  - **Reglas de Uso:** Respetar área de aislamiento mínima de 16px, prohibido deformar proporciones o alterar colores institucionales.
- **Paleta de Colores Oficial del Cliente (`HEX`, `RGB` u `OKLCH`):**
  - `primaryBrandColor`: `#2563EB`
  - `secondaryBrandColor`: `#0F172A`
  - `accentBrandColor`: `#10B981`
  - `surfaceLightColor`: `#F8FAFC`
  - `surfaceDarkColor`: `#0B0F19`
- **Tipografía Oficial de la Marca:**
  - **Títulos (`displayFont`):** `'Plus Jakarta Sans', 'Inter', system-ui, sans-serif`
  - **Cuerpo (`sansFont`):** `'Inter', system-ui, -apple-system, sans-serif`
  - **Datos Numéricos / Código (`monoFont`):** `'JetBrains Mono', ui-monospace, monospace`
  - **Permitir Sugerencia de Par Tipográfico de Fábrica:** `true`

---

## Bloque 4 — Estilo Estético, Atmósfera y Sitios de Referencia
- **Estilo y Estética Deseada:** Ingeniería visual moderna de alto contraste y precisión táctil
- **Preferencia de Atmósfera (`light-only`, `dark-only`, `dual-theme-toggle`):** `dual-theme-toggle`
- **Sitios Web de Referencia / Competidores Admirados:**
  - **https://stripe.com:** Claridad de jerarquía tipográfica, micro-interacciones limpias y confianza comercial
  - **https://linear.app:** Orden espacial de grillas Bento y velocidad percibida instantánea

---

## Bloque 5 — Funciones, Capacidades del Sitio y Objetivos de Conversión (`CRO`)
- **Objetivo de Conversión #1 (`Primary CTA`):** `Solicitar Presupuesto / Agendar Consulta Ahora` (Canal: Formulario Calificado + WhatsApp Directo)
- **Objetivo de Conversión #2 (`Secondary CTA`):** `Ver Casos de Éxito y Preguntas Frecuentes`
- **Listado de Funciones y Capacidades Operativas Requeridas:**
  - Hero de respuesta directa con Propuesta Única de Valor y CTA primario visible sin scroll
  - Catálogo / Grilla interactiva de servicios o productos con desglose claro de beneficios
  - Bloque de derribo de las 3 objeciones principales y prueba social verificada
  - Formulario de contacto validado con integración directa a WhatsApp / CRM

---

## Bloque 6 — Activos Reales, Prueba Social, Textos Fijos y Datos Operativos
- **Rutas a Fotografías, Videos o Catálogos Reales Provistos:** `public/assets/brand/logo-primary.svg`, `public/assets/brand/isotipo.svg`, `public/assets/media/hero-showcase.webp`
- **Prueba Social Real Disponible:**
  - +150 clientes atendidos con 98% de satisfacción verificada
  - Testimonios reales con nombre, cargo y resultados medibles
  - Certificaciones profesionales y respaldo institucional verificable
- **Idioma y Tono de Comunicación:** Español rioplatense (es-AR) profesional, claro, empático y directo al grano (cero relleno genérico)
- **Datos Operativos Fijos Obligatorios:**
  - **Dirección:** Av. del Libertador 1000, CABA, Argentina
  - **Teléfono:** +54 11 4000-0000
  - **WhatsApp:** +54 9 11 5000-0000
  - **Horarios de Atención:** Lunes a Viernes de 09:00 a 18:30 hs
  - **Razón Social / Textos Legales:** Agencia Alfa S.R.L. — Todos los derechos reservados

---

## Bloque 7 — Frontera de Alcance (`Explicit Non-Goals`) y Criterios de Éxito
- **Qué queda explícitamente FUERA del alcance de esta versión (`Explicit Non-Goals` — Escudo Contractual):**
  - No incluye sistema de facturación AFIP/ARCA embebido en esta fase inicial
  - No incluye foro comunitario ni chat en vivo con operadores 24/7 no pactado
  - No incluye integraciones con ERPs legados fuera de los endpoints definidos en el alcance
- **Métricas de Éxito Esperadas por el Cliente:**
  - Claridad de propuesta de valor en menos de 3 segundos (5-Second Test)
  - LCP < 1.2s, CLS = 0.00, 60 FPS constantes y puntaje RYUX >= 95/100
  - Incremento medible en consultas calificadas / conversiones desde móvil y desktop
