---
canon_id: "CANON_INCLUSIVE_MINIMALIST_UX_2026"
title: "UX Minimalista, Claridad Cognitiva e Inclusión Universal para Educación en IA"
domain: "ai_academy"
approval_status: "PENDING_CTO_REVIEW"
epistemic_tier_target: "TIER_1_SOTA_2026"
language_register: "es-neutral-tu"
sources:
  - claim_id: "C3-WCAG22-01"
    claim_summary: "W3C WCAG 2.2 establece criterios verificables de foco visible (2.4.7), redimensionamiento de texto al 200% sin pérdida de contenido (1.4.4), tamaño de objetivo táctil mínimo 24x24 CSS px (2.5.8 AA) y mejorado 44x44 CSS px (2.5.5 AAA), y control de animaciones (2.3.3)."
    url: "https://www.w3.org/TR/WCAG22/"
    section_or_quote: "W3C Recommendation WCAG 2.2: SC 1.4.4 Resize Text (200%), SC 2.4.7 Focus Visible, SC 2.5.8 Target Size Minimum (24x24), SC 2.5.5 Target Size Enhanced (44x44), SC 2.3.3 Animation from Interactions."
    http_status: 200
    verified_at: "2026-11-15"
    accessed_at: "2026-11-15T02:40:21.045Z"
  - claim_id: "C3-LEY26653-02"
    claim_summary: "La Ley Nacional 26.653 de Accesibilidad de la Información en las Páginas Web (Argentina) reconoce el derecho de acceso igualitario a contenidos digitales sin barreras sensoriales, motrices o cognitivas."
    url: "https://www.argentina.gob.ar/normativa/nacional/ley-26653-175694/texto"
    section_or_quote: "Ley 26.653 — Accesibilidad de la Información en las Páginas Web (República Argentina): igualdad real de oportunidades y diseño accesible para personas con discapacidad."
    http_status: 200
    verified_at: "2026-11-15"
    accessed_at: "2026-11-15T02:40:21.209Z"
  - claim_id: "C3-ONTI-03"
    claim_summary: "El Observatorio de Accesibilidad Digital (ONTI Argentina) alinea los estándares técnicos nacionales de accesibilidad web con las pautas internacionales WCAG del W3C."
    url: "https://www.argentina.gob.ar/jefatura/innovacion-publica/onti/accesibilidad-web"
    section_or_quote: "Observatorio de Accesibilidad Digital (ONTI): pautas técnicas de accesibilidad web y verificación de barreras digitales."
    http_status: 200
    verified_at: "2026-11-15"
    accessed_at: "2026-11-15T02:40:40.330Z"
  - claim_id: "C3-CSSCOLOR4-04"
    claim_summary: "W3C CSS Color Module Level 4 estandariza el espacio de color perceptual OKLCH (luminosidad perceptual L, croma C y tono H) con uniformidad superior a sRGB hexadecimal."
    url: "https://www.w3.org/TR/css-color-4/"
    section_or_quote: "W3C CSS Color Module Level 4 — Section 9.4 Specifying Lab and LCH: oklch() cylindrical perceptual lightness, chroma, and hue."
    http_status: 200
    verified_at: "2026-11-15"
    accessed_at: "2026-11-15T02:40:40.535Z"
  - claim_id: "C3-DTCG-05"
    claim_summary: "El W3C Design Tokens Community Group (DTCG) define el formato interoperable de tokens de diseño para sistematizar color, tipografía y espaciado."
    url: "https://www.w3.org/community/design-tokens/"
    section_or_quote: "W3C Design Tokens Community Group: standard file format and interoperable token specifications across tools and platforms."
    http_status: 200
    verified_at: "2026-11-15"
    accessed_at: "2026-11-15T02:40:40.771Z"
  - claim_id: "C3-APCA-06"
    claim_summary: "El modelo abierto SAPC-APCA calcula el contraste perceptual de luminancia (Lc) considerando polaridad texto/fondo y peso tipográfico para lectura prolongada."
    url: "https://github.com/Myndex/SAPC-APCA"
    section_or_quote: "Myndex/SAPC-APCA: Accessible Perceptual Contrast Algorithm predicting supra-threshold reading contrast (Lc)."
    http_status: 200
    verified_at: "2026-11-15"
    accessed_at: "2026-11-15T02:40:41.321Z"
---

# Canon: UX Minimalista, Claridad Cognitiva e Inclusión Universal para Educación en IA

**Alcance:** Sistema visual y de interacción para la Academia Pública de IA inspirado en la claridad editorial interactiva (*Brilliant*, *Stripe Docs*, *Distill.pub*), gobernado por `W3C WCAG 2.2`, la `Ley 26.653` de Accesibilidad Web (Argentina), `CSS Color 4 OKLCH`, `W3C DTCG` y contraste perceptual `APCA` (`approval_status: PENDING_CTO_REVIEW`).

---

## 1. Filosofía Espacial: Silencio Visual y Divulgación Progresiva

Un principiante curioso o un adulto no técnico abandona en segundos cualquier pantalla saturada de paneles laterales, insignias parpadeantes o formularios invasivos. Por ello rigen cuatro principios espaciales:

1. **Una Sola Meta Cognitiva por Pantalla (Reducción de Carga de Elección):**
   - La portada presenta únicamente una promesa clara en español neutro (`tú`), un selector limpio de **punto de partida** (*"Quiero usar IA en mi día a día"*, *"Quiero mejorar mi trabajo o estudio"*, *"Quiero crear proyectos o código"*) y acceso inmediato en 1 clic a la primera micro-lección interactiva sin registro previo.
2. **Desencajonamiento (*De-Boxing*) y Ritmo Respirable:**
   - Separa bloques conceptuales mediante espacio negativo generoso y sutiles escalones de luminancia perceptual en `OKLCH` (`[C3-CSSCOLOR4-04]`), evitando grillas recargadas de bordes gruesos o sombras pesadas.
3. **Explicación y Práctica Lado a Lado:**
   - En pantallas de escritorio (`>= 1024px`), la prosa breve se ubica a la izquierda (`45ch–62ch` de ancho óptimo de línea `[ASUNCIÓN: rango tipográfico clásico de legibilidad editorial]`) y el **micro-control interactivo en vivo** permanece anclado a la derecha; en móvil (`390x844`), el control se integra inmediatamente debajo del concepto sin desplazamiento horizontal (`0px` overflow).
4. **Glosario Contextual al Vuelo (*Zero Context Switching*):**
   - Los términos técnicos subrayados despliegan una definición cotidiana de 2 líneas accesible por clic, toque o foco de teclado (`Enter`/`Escape`), sin sacarte de la lección.

---

## 2. Sistema Cromático Perceptual `OKLCH` y Contraste Dual (`WCAG 2.2` + `APCA`)

Gobernado por tokens de diseño del `W3C DTCG` (`[C3-DTCG-05]`) en espacio `OKLCH` (`[C3-CSSCOLOR4-04]`):

- **Presupuesto Cromático `90 / 8 / 2`:** `[ASUNCIÓN: proporción interna del sistema de diseño de la fábrica para preservar calma visual]`
  - **90% Superficies Neutras Cálidas y Serenas:** Modo Claro Editorial predeterminado (papel cálido `oklch(0.985 0.006 85)`, tinta profunda `oklch(0.20 0.015 255)`) + Modo Oscuro de Estudio de bajo deslumbramiento (`oklch(0.16 0.014 255)`).
  - **8% Acentos Semánticos Pedagógicos:** Diferencian visualmente *Analogía Cotidiana*, *Laboratorio Interactivo* y *Alerta de Privacidad / Pensamiento Crítico*.
  - **2% Acción Principal (`[data-cta="primary"]`):** Reservado al siguiente paso de aprendizaje o verificación activa.
- **Pisos Estrictos de Contraste y Conformidad Legal:**
  - Cumplimiento obligatorio de contraste `WCAG 2.2 AA` (`>= 4.5:1` en texto normal y `>= 3:1` en componentes UI — `[C3-WCAG22-01]`) requerido por la `Ley 26.653` (`[C3-LEY26653-02]`, `[C3-ONTI-03]`).
  - `[ASUNCIÓN: piso perceptual complementario interno basado en SAPC-APCA]` Verificación adicional `APCA` (`[C3-APCA-06]`): `Lc >= 75` en prosa de lectura continua y `Lc >= 60` en controles, etiquetas y notas secundarias.

---

## 3. Anatomía Canónica de Lección en 5 Tiempos (`6–10 minutos`)

Toda lección del catálogo respeta la misma cadencia predecible:
1. **Tiempo 1 — Caso Real Reconocible:** Un problema concreto de la vida diaria o del trabajo explicado sin tecnicismos.
2. **Tiempo 2 — Intuición + Micro-Control Interactivo:** Manipulas un deslizador, conmutador *Prompt Vago vs. Claro* o inspector de privacidad y observas la diferencia en tiempo real.
3. **Tiempo 3 — Triangulación de 2 a 3 Videos Breves + Resumen Accesible:** Carga diferida sin cookies de rastreo (`lite-youtube-embed` sobre `youtube-nocookie.com`, `archive.org` o `wikimedia.org`) combinando ángulos complementarios (intuición visual, demostración práctica y caso crítico) acompañados siempre de un **resumen textual equivalente** y anclas verificadas para quienes leen con conexión lenta o prefieren texto.
4. **Tiempo 4 — Misión Práctica con Herramienta Gratuita / Open-Source:** Ejercicio guiado con alternativas 100% gratuitas sin tarjeta ni bloqueo comercial, adaptado al perfil de equipo del estudiante.
5. **Tiempo 5 — Cierre Socrático Dual (3 Preguntas) + Semilla de Repaso:** Validación activa (texto + anclas verificadas de video) y actualización del mapa de progreso local.

---

## 4. Accesibilidad Inclusiva Estricta (`WCAG 2.2` + `Ley 26.653`)

- **Áreas Táctiles Amplias:** Adoptamos el nivel mejorado de `WCAG 2.2 SC 2.5.5` (`>= 44x44 CSS px` — `[C3-WCAG22-01]`) en todo botón, opción de cuestionario, pestaña y control deslizante, superando el mínimo AA (`24x24 CSS px`) para facilitar el uso a personas mayores o con motricidad fina reducida.
- **Teclado Completo y Foco Visible (`SC 2.4.7`):** Todo control interactivo y micro-simulador es operable al 100% con `Tab`, `Shift+Tab`, flechas, `Enter` y `Space`, con anillo `:focus-visible` nítido.
- **Zoom `200%` y Escalado Fluido (`SC 1.4.4`):** Tipografía fluida sin recortes ni superposición al ampliar la pantalla al `200%`.
- **Respeto a `prefers-reduced-motion: reduce` (`SC 2.3.3`):** Sustituye desplazamientos espaciales por transiciones suaves de opacidad instantánea cuando el sistema operativo solicita reducir movimiento.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SOTA_RAG_ARCHITECTURES_AND_TOOLS_2026]] · [[CURATED_MASTER_BOOKS_AND_COURSES_2026]] · [[CANON_SOFTWARE_ENGINEERING_AT_GOOGLE]] · [[CANON_HARNESS_ENGINEERING_INTEGRAL_2026]] · #ai_academy
