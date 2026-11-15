# ⚙️ ENTREVISTA #2 OBLIGATORIA: ESPECIFICACIÓN TÉCNICA (`SPEC.md` & `DESIGN.md`) — `academia-ia`

> **Estado de Compuerta #2 (`specInterviewStatus`):** `PENDING_CTO_SPEC_INPUT`
> **Pre-Requisito Compuerta #1 (`PRD_LEAN.md` + `BRAND_IDENTITY_LOCK.json`):** `PENDING_CTO_SPEC_INPUT` (`brandIdentityMode: PARTIAL_BRAND_EVOLUTION`, `lockClientPalette: false`)
> **Regla de Gobernanza:** Una vez aprobada la Entrevista #1, completá/revisá estos 10 bloques técnicos y ejecutá:
> `npm run cto:entrevista -- academia-ia --aprobar`

---

## Bloque 1 — Arquitectura de Páginas y Secciones DOM (Trazable a `PRD_LEAN.md`)
- **Marca y Arquetipo:** Academia IA (`saas`)
- **Mapa de Vistas:** Inicio (/) → Nivel 1 · Principiante (/niveles/principiante/) → Nivel 2 · Intermedio (/niveles/intermedio/) → Nivel 3 · Avanzado (/niveles/avanzado/)
- **Desglose de Componentes DOM Requeridos:**
  - Header Semántico Editorial + Buscador Estático Pagefind + Selector Accesible Claro/Oscuro
  - Índice Editorial de 3 Niveles UNESCO (Adquirir, Profundizar, Crear) + Selector de Arquetipo Local
  - Columna de Lectura 65ch con Prosa <= 110 Palabras, Fórmulas MathML (Temml 0 KB JS) y Expressive Code
  - Fachada Multi-Video (youtube-nocookie + OER) con Aviso Breve de Almacenamiento Local y Síntesis Textual
  - Micro-Explorable Real de Conteo de Tokens (js-tiktoken) + Tutor Socrático en Sandbox Opaco (iframe sandbox='allow-scripts')

## Bloque 2 — Contratos Funcionales, Estados `Pure vs. Wired` y Validación `Valibot`
- **Primary CTA Conectado:** `Comenzar Nivel 1 · Adquirir` (Navegación estática local-first)
- **Arquitectura de Componentes Puros (`Pure Components`):** `true` (5 Estados: empty, loading, error-state, extreme-long-text-250chars, dark-mode)
- **Esquemas `Valibot` Activos:** LeadCaptureFormSchema (nombre, email, telefono, mensaje, csrfToken) | InteractiveCalculatorOrFilterSchema (categoria, presupuesto, urgencia)

## Bloque 3 — Topología de Grilla y Morfología de Componentes (`bespoke_morphology_composer.mjs`)
- **Topología de Grilla (`gridTopology`):** `interactive-webgl-spatial-canvas`
- **Arquitectura de Hero (`heroArchitecture`):** `layered-cards-depth-parallax`
- **Materialidad de Superficie:** `paper-editorial` (Divergencia intra-categoría `>= 70%`)

## Bloque 4 — Aplicación de Paleta, Contraste `APCA` y Escalas Tipográficas (`token_compiler.mjs`)
- **Modo de Superficie:** `Read` | **Modo de Marca:** `PARTIAL_BRAND_EVOLUTION` (`lockClientPalette: false`)
- **Semilla de Colores del Cliente:** Primario `oklch(34% 0.13 245)`, Secundario `oklch(42% 0.04 250)`, Acento `oklch(42% 0.13 162)`
- **Piso de Contraste `APCA`:** Lc >= 90 (Hero/Headline), Lc >= 75 (Body), Lc >= 60 (Secondary) | **Tipografía:** 'Newsreader', 'Instrument Serif', Georgia, serif

## Bloque 5 — Dirección Estética, Personalidad Diferenciadora y Física Cinética a 60 FPS
- **Eje de Tensión de Personalidad (`brandPersonalityTension`):** `editorial-organico vs ingenieril-geometrico`
- **Modo de Selección Morfológica (`morphologySelectionMode`):** `auto-bespoke-criteria` (Garantía de 0 repetición intra-categoría frente a proyectos previos)
- **Nivel de Animación:** `discrete-calm-editorial` ($zeta = 1$, `stiffness: 280, damping: 24`)
- **Scroll-Driven CSS & View Transitions API:** `scroll=true`, `viewTransitions=true`, `reducedMotion=true`

## Bloque 6 — Gráficos 3D WebGPU, Modelos `.glb` y Shaders (`shader_and_3d_forge.mjs`)
- **Modo 3D / Shader (`none`, `glb-viewer`, `spark-gaussian-splatting`, `shader-hero`, `holo-cards`):** `none`
- **Watchdog de Histograma `<canvas>` en 3 Timestamps:** `true`

## Bloque 7 — Diseño Sonoro UI SFX, Música de Fondo y Sesión `.rpp` Reaper (`sonic_and_music_forge.mjs`)
- **Modo Sonoro (`generative-criteria`, `custom-brief`, `off`):** `off` (`uiSfxMode: off`, material `paper-editorial`)
- **Música de Fondo:** `off` | **Exportación Reaper `.rpp`:** `true`

## Bloque 8 — Video Intro Programática de Marca y Locución (`programmatic_video_forge.mjs`)
- **Modo de Video Intro (`off`, `minimal`, `3d-pbr`, `vertex-veo-hybrid`, `shader-hud`):** `none` (`none`)
- **Activos Bloqueados de Marca:** Logo `public/favicon.svg`, Isotipo `public/favicon.svg` (Presupuesto `<= 1.8 MB`)

## Bloque 9 — Base de Datos, Pagos, Autenticación y Edge Worker (`dual_database_forge.mjs`)
- **Motor de Datos (`static-none`, `edge-d1`, `enterprise-postgres`):** `static-json-and-indexeddb` (Static JSON (data/academy/*.json)
- **Pasarela de Pagos:** `none` | **Auth:** `Ory/Passkeys (OAuth 2.1 PKCE)` | **Endpoints Worker:** POST /api/leads, POST /api/webhooks/payments, GET /api/health

## Bloque 10 — App Móvil `Capacitor 8`, Widget Post-Venta y Matriz `[REQ-01]..[REQ-12]`
- **Target Móvil `Capacitor 8`:** `false` | **Widget Post-Venta:** `true`
- **Criterios Fail-to-Pass (`F2P`):**
  - [REQ-01..03] Identidad PRD_LEAN, Primary CTA >= 48x48px y derribo de 3 objeciones
  - [REQ-04..06] BRAND_IDENTITY_LOCK (lockClientPalette), APCA Lc >= 75 y 60 FPS
  - [REQ-07..09] Audio/Video <= -18dBFS, Valibot, Idempotencia Webhooks y RLS Multi-Tenant
  - [REQ-10..12] SEO/GEO llms.txt, CSP/ASVS v5.0 y Pure Component 5-State Harness >= 95/100
