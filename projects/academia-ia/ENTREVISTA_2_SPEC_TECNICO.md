# ⚙️ ENTREVISTA #2 OBLIGATORIA: ESPECIFICACIÓN TÉCNICA (`SPEC.md` & `DESIGN.md`) — `academia-ia`

> **Estado de Compuerta #2 (`specInterviewStatus`):** `PENDING_CTO_SPEC_INPUT`
> **Pre-Requisito Compuerta #1 (`PRD_LEAN.md` + `BRAND_IDENTITY_LOCK.json`):** `PENDING_CTO_PRD_INPUT` (`brandIdentityMode: PARTIAL_BRAND_EVOLUTION`, `lockClientPalette: false`)
> **Regla de Gobernanza:** Una vez aprobada la Entrevista #1, completá/revisá estos 10 bloques técnicos y ejecutá:
> `npm run cto:entrevista -- academia-ia --aprobar`

---

## Bloque 1 — Arquitectura de Páginas y Secciones DOM (Trazable a `PRD_LEAN.md`)
- **Marca y Arquetipo:** Academia IA (`education`)
- **Mapa de Vistas:** / → /niveles/principiante/ → /niveles/intermedio/ → /niveles/avanzado/
- **Desglose de Componentes DOM Requeridos:**
  - Header Editorial Minimalista con Selector de Tema Claro/Oscuro (0 Mute Toggle sonoro)
  - Índice Editorial (Academia IA) con 3 Niveles UNESCO (Adquirir, Profundizar, Crear) y Buscador Pagefind
  - Columna de Lectura en Modo Read (65ch, bloques <= 110 palabras en español neutro tú)
  - Fachada Multi-Video de Privacidad (youtube-nocookie.com + archive.org) con aviso local y síntesis textual
  - Micro-Explorables en Cliente (js-tiktoken BPE + Temml MathML 0 KB JS) y Tutor Socrático en Sandbox Opaco (MessageChannel 1:1)

## Bloque 2 — Contratos Funcionales, Estados `Pure vs. Wired` y Validación `Valibot`
- **Primary CTA Conectado:** `Comenzar Nivel 1 · Adquirir` (Navegación directa local-first sin registro)
- **Arquitectura de Componentes Puros (`Pure Components`):** `true` (5 Estados: empty, loading, error-state, extreme-long-text-250chars, dark-mode)
- **Esquemas `Valibot` Activos:** TutorOutboundPromptSchema (question, levelId, lessonSlug) | TutorInboundMessageSchema (TUTOR_SANDBOX_READY | TUTOR_HINT_RESPONSE | TUTOR_ERROR)

## Bloque 3 — Topología de Grilla y Morfología de Componentes (`bespoke_morphology_composer.mjs`)
- **Topología de Grilla (`gridTopology`):** `swiss-asymmetric-editorial`
- **Arquitectura de Hero (`heroArchitecture`):** `numbered-editorial-index-hero`
- **Materialidad de Superficie:** `paper-editorial` (Divergencia intra-categoría `>= 70%`)

## Bloque 4 — Aplicación de Paleta, Contraste `APCA` y Escalas Tipográficas (`token_compiler.mjs`)
- **Modo de Superficie:** `Read` | **Modo de Marca:** `PARTIAL_BRAND_EVOLUTION` (`lockClientPalette: false`)
- **Semilla de Colores del Cliente:** Primario `oklch(34% 0.13 245)`, Secundario `oklch(42% 0.04 250)`, Acento `oklch(42% 0.13 162)`
- **Piso de Contraste `APCA`:** Lc >= 85 (Editorial Body & Headlines in Light & Dark Modes, WCAG 2.2 AA+) | **Tipografía:** 'Newsreader', 'Instrument Serif', Georgia, serif

## Bloque 5 — Dirección Estética, Personalidad Diferenciadora y Física Cinética a 60 FPS
- **Eje de Tensión de Personalidad (`brandPersonalityTension`):** `clasico-atemporal vs vanguardista-disruptivo`
- **Modo de Selección Morfológica (`morphologySelectionMode`):** `auto-bespoke-criteria` (Garantía de 0 repetición intra-categoría frente a proyectos previos)
- **Nivel de Animación:** `minimal-editorial` ($zeta = 1$, `stiffness: 280, damping: 24`)
- **Scroll-Driven CSS & View Transitions API:** `scroll=false`, `viewTransitions=true`, `reducedMotion=true`

## Bloque 6 — Gráficos 3D WebGPU, Modelos `.glb` y Shaders (`shader_and_3d_forge.mjs`)
- **Modo 3D / Shader (`none`, `glb-viewer`, `spark-gaussian-splatting`, `shader-hero`, `holo-cards`):** `none`
- **Watchdog de Histograma `<canvas>` en 3 Timestamps:** `false`

## Bloque 7 — Diseño Sonoro UI SFX, Música de Fondo y Sesión `.rpp` Reaper (`sonic_and_music_forge.mjs`)
- **Modo Sonoro (`generative-criteria`, `custom-brief`, `off`):** `off` (`uiSfxMode: off`, material `paper-editorial`)
- **Música de Fondo:** `off` | **Exportación Reaper `.rpp`:** `false`

## Bloque 8 — Video Intro Programática de Marca y Locución (`programmatic_video_forge.mjs`)
- **Modo de Video Intro (`off`, `minimal`, `3d-pbr`, `vertex-veo-hybrid`, `shader-hud`):** `off` (`none`)
- **Activos Bloqueados de Marca:** Logo `public/favicon.svg`, Isotipo `public/favicon.svg` (Presupuesto `<= 0 MB`)

## Bloque 9 — Base de Datos, Pagos, Autenticación y Edge Worker (`dual_database_forge.mjs`)
- **Motor de Datos (`static-none`, `edge-d1`, `enterprise-postgres`):** `static-json-and-indexeddb` (Static JSON (data/academy/*.json) + Local-First Browser Storage (Dexie/IndexedDB & localStorage))
- **Pasarela de Pagos:** `none` | **Auth:** `none (Anonymous Local-First — Ley 25.326)` | **Endpoints Worker:** 

## Bloque 10 — App Móvil `Capacitor 8`, Widget Post-Venta y Matriz `[REQ-01]..[REQ-12]`
- **Target Móvil `Capacitor 8`:** `false` | **Widget Post-Venta:** `false`
- **Criterios Fail-to-Pass (`F2P`):**
  - [REQ-01..03] Astro 7.4.11 100% estático ($0 servidor), progreso local-first (Ley 25.326) y 0 violaciones WCAG 2.2 AA
  - [REQ-04..06] Columna 60ch–70ch (65ch), español neutro <= 110 palabras (INFLESZ) y fachada multi-video con aviso local
  - [REQ-07..09] js-tiktoken BPE local, Temml MathML 0 KB JS y sandbox opaco con MessageChannel 1:1 + Valibot + DOMPurify TrustedHTML
  - [REQ-10..12] CSP estricta con hashes sha256 + Trusted Types (default.createHTML lanza TypeError), PWA MPA < 250 KB y autonomía fuera del monorepo
