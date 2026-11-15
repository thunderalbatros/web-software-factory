# SPEC.md — Especificación Técnica de Academia IA (Borrador Gate #2)

> **Proyecto:** `academia-ia` · **Stack:** `astro-edge` (`astro@7.4.11` exacto) · **Perfil:** `education` (`Surface Mode: Read`)
> **Estado de Compuerta:** `DRAFT_PENDING_CTO_GATE2` (`approvedBy: null` — pendiente de firma humana del CTO)
> **Entradas Contractuales:** `docs/PRD_ACADEMIA_IA_MASTER.md`, `data/academy/project_charter.json`, `PRD_LEAN.md` y `BRAND_IDENTITY_LOCK.json`

---

## 1. Arquitectura Estática de Costo Servidor \$0.00 USD

- **Motor de Compilación:** `astro@7.4.11` (`output: 'static'`, `vite.build.sourcemap: false`, `build.inlineStylesheets: 'never'`) sin `@astrojs/starlight` y sin `worker/index.js` de formularios.
- **Integraciones Oficiales Pineadas:**
  - `astro-expressive-code@0.44.3` (bloques de código accesibles en niveles Intermedio y Avanzado, cero bloques de código en Principiante).
  - `@astrojs/mdx@8.1.6` + plugin determinista con `temml@0.14.0` para compilar fórmulas LaTeX a **MathML nativo (`0 KB` de JS en cliente)**.
  - `@vite-pwa/astro@2.0.2` para lectura offline MPA de lecciones (`navigateFallback: null`, precache inicial `< 250 KB`) y manifiesto web limpio.
  - Post-build determinista: índice de búsqueda estático con `pagefind@1.6.0`, generación de `sitemap.xml`, `llms.txt` + `llms-full.txt`, extracción de atributos `style="..."` a hoja CSS cacheable y sellado de `public/_headers` + `dist/_headers` mediante `src/lib/csp-builder.mjs`.
- **Datos Autónomos en el Proyecto:** Copia local sincronizada en `projects/academia-ia/data/academy/{project_charter,archetypes,tracks,sources,videos,tools}.json` bajo esquema relacional v2 validado con `Valibot` (cero referencias a `../../`).

---

## 2. Seguridad Zero-Trust: CSP Única con Hashes + Trusted Types + Sandbox Opaco

- **Fuente Única de CSP (`src/lib/csp-builder.mjs`):**
  - `default-src 'self'`
  - `script-src 'self' 'wasm-unsafe-eval' 'inline-speculation-rules' 'sha256-...'` (hashes reales calculados sobre `dist/`; prohibido `'unsafe-inline'` y prohibido `'unsafe-eval'`)
  - `style-src 'self' 'sha256-...'` (sin `'unsafe-inline'`)
  - `frame-src 'self' https://www.youtube-nocookie.com https://archive.org`
  - `media-src 'self' https://archive.org https://upload.wikimedia.org https://commons.wikimedia.org`
  - `img-src 'self' data: blob: https://i.ytimg.com https://upload.wikimedia.org`
  - `connect-src 'self'` · `object-src 'none'` · `base-uri 'self'` · `frame-ancestors 'none'`
  - `require-trusted-types-for 'script'` · `trusted-types default dompurify astro-island` (`default.createHTML` lanza `TypeError`; `default.createScriptURL` restringido a `/sw.js`, `/pagefind/pagefind.js` y `/_astro/*`)
- **Aislamiento del Tutor Socrático / BYOK (`src/lib/socratic-tutor-sandbox.mjs`):**
  - El contenedor del tutor se ejecuta en `<iframe sandbox="allow-scripts">` (**jamás** `allow-same-origin`), operando con `window.origin === "null"` y sin acceso a `IndexedDB`, `localStorage`, `cookies` ni DOM de la página principal.
  - Handshake inicial en fallo cerrado (`event.source === expectedSourceWindow && event.origin === 'null'`) que transfiere un `MessageChannel` dedicado 1:1 (`port1` <-> `port2`), eliminando `postMessage(..., '*')` posterior y validando cada mensaje en `port1` con esquemas estrictos `Valibot` (`TutorOutboundPromptSchema` / `TutorInboundMessageSchema`).
  - Todo fragmento renderizado en el documento principal usa APIs DOM seguras (`createElement`/`textContent`) o atraviesa la policy `dompurify` con `DOMPurify.sanitize(..., { RETURN_TRUSTED_TYPE: true })`.

---

## 3. Diseño Editorial en Modo `Read` (Cero Relleno 3D/Sonoro)

- **Columna de Lectura (`65ch`):** Ancho de línea estricto entre `60ch` y `70ch`, `line-height: 1.72`, escala tipográfica fluida con `clamp()` y jerarquía semántica limpia `h1 -> h2 -> h3`.
- **Sistema Cromático OKLCH 90/8/2:** `90 %` superficie papel/pizarra calmada, `8 %` bordes capilares y superficies elevadas, `2 %` acentos semánticos de nivel (`--color-level-acquire`, `--color-level-deepen`, `--color-level-create`) verificados en modo claro y modo oscuro con contraste APCA `Lc >= 85`.
- **Precisión Numérica y Movimiento Calmado:** `font-variant-numeric: tabular-nums` en contadores de tokens, tiempos `MM:SS` y métricas; `@view-transition { navigation: auto; }` discreto y anulación total de animaciones bajo `@media (prefers-reduced-motion: reduce)`.

---

## 4. Matriz de Requisitos Ejecutables (`[REQ-01]` a `[REQ-12]`)

| ID | Requisito Técnico | Invariante Origen | Verificación Determinista |
| :--- | :--- | :--- | :--- |
| `[REQ-01]` | Build 100 % estático en Astro `7.4.11` (`sourcemap: false`, sin `#pricing` ni Worker de leads) | `[INV-01]` | `build_dist.mjs` + `security_gate.mjs` |
| `[REQ-02]` | Almacenamiento local-first (`Dexie`/`localStorage`) sin login ni PII en servidor | `[INV-02]` | Inspección AST + `cognitive_ux_auditor.mjs` |
| `[REQ-03]` | Piso WCAG 2.2 AA (`0` violaciones `@axe-core/playwright` en tema claro y oscuro) | `[INV-03]` | `certify_academia_runtime.mjs` |
| `[REQ-04]` | Columna `60ch–70ch` (`65ch`), `clamp()`, `tabular-nums` y jerarquía `h1->h2->h3` | `[INV-03]`, `[INV-04]` | `ryux_design_gate.mjs` (`Read`) |
| `[REQ-05]` | Prosa en español neutro (`tú`), bloques `<= 110` palabras e INFLESZ por nivel | `[INV-04]` | `readability_es.mjs` + `ryux_design_gate.mjs` |
| `[REQ-06]` | Fachada multi-video (`youtube-nocookie` + OER) con aviso local junto al reproductor y síntesis textual | `[INV-03]`, `[INV-05]` | `cognitive_ux_auditor.mjs` + Playwright |
| `[REQ-07]` | Micro-explorable real de tokenización BPE con `js-tiktoken` en cliente (`0` llamadas externas) | `[INV-01]`, `[INV-04]` | Playwright runtime interaction |
| `[REQ-08]` | Ecuaciones compiladas en build con `temml` a MathML nativo (`0 KB` JS extra) | `[INV-01]`, `[INV-03]` | Inspección DOM `<math>` en niveles 2 y 3 |
| `[REQ-09]` | Tutor socrático aislado en `<iframe sandbox="allow-scripts">` + `Valibot` + `DOMPurify` TrustedHTML | `[INV-02]` | Playwright runtime (`origin === 'null'`) |
| `[REQ-10]` | CSP estricta con hashes `sha256-...` reales + `require-trusted-types-for 'script'` (`0` violaciones) | `[INV-01]`, `[INV-02]` | `csp_builder.mjs` + `securitypolicyviolation` listener |
| `[REQ-11]` | 3 páginas semilla funcionales (`/niveles/principiante/`, `/niveles/intermedio/`, `/niveles/avanzado/`) leyendo `data/academy/*.json` | `[INV-06]`, `[INV-07]` | Build + navegación Playwright |
| `[REQ-12]` | Presupuesto de rendimiento: `LCP <= 1800 ms`, `CLS = 0.000`, `jsHeapUsedMB < 64 MB` + `pagefind`, `sitemap.xml` y `llms.txt` | `[INV-01]`, `[INV-03]` | `certify_academia_runtime.mjs` + `floor_and_aeo_guard.mjs` |
