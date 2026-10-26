# CANON: Visual SOTA Hunt — Repositorios Nuevos y Estrategias Visuales (Octubre 2026)

**Alcance:** Aplicable al desarrollo visual de Web Software Factory Studio (site vanilla JS en `site/`, overlays OBS en `overlay-*`/`wheel-*`, QA visual en `tools/audit/`, skills de agentes en `.agents/skills/`). Prohibido adoptar dependencias con licencia no permisiva o con costo.

> **Origen:** Cacería exhaustiva de repositorios (2026-10-24) priorizando lanzamientos de los últimos 6 meses (abril→octubre 2026). Todos los repos están clonados en `references/hunt-2026-10/` (shallow). Licencias verificadas en el archivo LICENSE de cada repo.

---

## 1. Skills instaladas para el equipo de agentes (ACCIÓN COMPLETADA)

### 1.1 RYUX — Design Intelligence para agentes [NUEVO <6mo] [VERIFICADO: MIT, v2.14.2, clonado 2026-10-24]
- **Fuente:** `ryuxdsgn/design-intelligence` → instalado en `.agents/skills/ryux/` (248 KB, texto puro).
- **Qué es:** Capa de "inteligencia de diseño" que le da a un agente un flujo de razonamiento con evidencia: `Understand → Frame → Explore → Evaluate and select → Build and critique → Verify and deliver`. No es un generador de UI ni una librería: es conocimiento de ruteo.
- **Entry points** (el skill decide qué módulo de conocimiento leer según la tarea, progressive disclosure):
  - **Analyze** (`capabilities/analyze.md`): entender una pantalla/flujo existente.
  - **Design** (`capabilities/design.md`): crear/mejorar UI en mockups.
  - **Build** (`capabilities/build.md`): implementar/cambiar UI en código.
  - **Critique** (`capabilities/critique.md`): encontrar qué cambiar primero, con evidencia; evaluación heurística.
  - **QA** (`capabilities/qa.md`): verificar una build contra el diseño.
- **Módulos de conocimiento:** product, UX, UI, interaction, forms, content, accessibility, responsive, design system, frontend, **anti-slop** (anti-genérico).
- **Uso exacto en WebFactory:** invocar la skill (o mencionar "RYUX") antes de cualquier tarea de UI: el Orchestrator la usa para `Analyze` de vistas existentes (`site/`), el Senior Frontend para `Build`, y el QA Auditor para `Critique`/`QA` — complementa (no reemplaza) las gates automáticas de Squad 6 y el `cto-hitl-visual-gate`. Aporta el "por qué" de diseño con evidencia que las gates de pixel/geometry no capturan.
- **Sinergia:** completa el hueco entre `design-critique` (skill existente) y `Gemini VLM UI Critic`: RYUX estructura el razonamiento del crítico; el VLM aporta la percepción visual de píxeles.

### 1.2 modern-frontend-design v3.0.0 — Playbook de diseño frontend premium [NUEVO <6mo] [VERIFICADO: MIT, clonado 2026-10-24]
- **Fuente:** `deveshpunjabi/modern-frontend-skill` → instalado en `.agents/skills/modern-frontend-design/` (84 KB).
- **Qué es:** SKILL.md con referencias sobre cómo lograr UIs "premium 2026": sistema de motion, liquid glass, scroll animations, design tokens, hero sections, jerarquía tipográfica.
- **Advertencia de contexto:** sus ejemplos de scaffold usan Tailwind/Next.js — **prohibido copiar la parte de framework** (regla del proyecto: vanilla JS). El valor está en `references/` (motion, tokens, patrones visuales) que son agnósticos del framework.
- **Uso exacto en WebFactory:** para el `senior-coder`/`ux-designer` como manual de estética al diseñar vistas nuevas del sitio o overlays; fusionar sus patrones con el Design DNA local (OKLCH 90/8/2, Utopia clamp()).

## 2. Repos clonados como referencia (sin instalar)

### 2.1 bergside/awesome-design-skills [NUEVO <6mo] [VERIFICADO: MIT, 2026]
- Catálogo de 67 carpetas de skills de estilo (`skills/{agentic,ant,artistic,bento,bold,brutalism,cafe,claude,claymorphism,clean,codex,colorful,contemporary,corporate,cosmic,creative,dithered,doodle,dramatic,...}`) con DESIGN.md/SKILL.md para agentes. 22 MB — queda en `references/hunt-2026-10/awesome-design-skills/`.
- **Uso:** cuando el CTO pida un "look" específico (p.ej. claymorphism, brutalism), el `ux-designer` lee solo la carpeta del estilo elegido (progressive disclosure; no indexar los 22 MB completos en el RAG).

### 2.2 css-scroll-driven/css-scroll-driven [NUEVO <6mo] [⚠️ SIN LICENSE visible → solo REF lectura, prohibido copiar código]
- Sitio/repo de patrones de **CSS Scroll-Driven Animations nativas + View Transitions API**: profiling de performance, motion accesible, patrones de implementación (`content/scroll-driven-view-transition-implementation-patterns`, `animation-performance-profiling-optimization`, `accessibility-inclusive-motion-standards`, `core-animation-fundamentals-browser-mechanics`).
- **Uso:** lectura para el `motion-engineer` — es exactamente la filosofía nativa-CSS del proyecto (scroll-driven animations en vez de lenis/animejs para efectos de scroll).

### 2.3 dmtrKovalenko/odiff [ESTABLECIDO] [VERIFICADO: MIT, 2021→2026]
- Diff de imágenes SIMD-first (Zig compilado vía npm `odiff-bin`), diseñado para screenshots: mucho más rápido que pixelmatch en imágenes grandes (18M+ px escala mejor según benchmarks vizzly.dev/wopee.io).
- **Uso en WebFactory:** candidato P2 para reemplazar/complementar `pixelmatch` en `tools/audit/diff_ui_adversarial.mjs` y `visual_regression.mjs` cuando las capturas 1920x1080 de las gates tarden. Instalación futura: `npm i -D odiff-bin` + adaptar el caller (es binario CLI: no cambia la lógica, solo el motor de diff). **No instalado hoy** — pendiente de Gate (cambio de código en QA).

## 3. Actualizaciones de lo ya clonado (mantenimiento del arsenal existente)

1. **Motion (motion.dev)** — `references/clones/motion/` está desactualizado: la v14.3.0 (15-oct-2026) trae fixes de "accelerated independent transform animations" y un **Motion AI Kit** (edición inline de beziers, generación de springs CSS). El proyecto lo tiene como DEP opcional: verificar versión al adoptar.
2. **Anime.js v4** — rewrite completo en TypeScript, zero deps (ya clonado en `references/clones/animejs/`); la API v4 cambia respecto a v3 — leer la doc v4 antes de usar.
3. **view-transitions-toolkit** (bram.us, abril 2026) — ya está clonado en `references/design-mastery/view-transitions-toolkit/`: utilidades para View Transitions API; sin explorar aún en el código del sitio.
4. **GSAP** — sigue descartado (licencia propietaria, no OSS; regla 3.1 del proyecto).

## 4. Descartes de la cacería (con motivo)

| Candidato | Motivo de descarte |
| --- | --- |
| `abi/screenshot-to-code` | REPO de aprendizaje válido, pero requiere backend pesado (no cabe en presupuesto OBS ≤5% CPU ni en runtime edge); su técnica de multi-candidato+VLM ya se aplica con Gemini VLM Critic. |
| Velocity.js | Legado (jQuery-era), sin releases relevantes; `motion` mini ya cubre WAAPI. |
| honeydiff / imgdiff | Alternativas de diff interesantes pero sin ecosistema npm maduro; odiff ya cubre el caso. |
| LayerChart / dataviz nuevos | Nada superó a uPlot en liviandez para telemetría en vivo (uPlot ~48 KB, canvas, 1.2M pts/s). |
| ssgoi, swup | Orientados a MPA/transiciones de página con framework; el sitio es SPA vanilla con view transitions nativas. |

## 5. Protocolo de adopción (obligatorio según REFERENCE_REPOS.md)
1. Confirmar LICENSE en el repo antes de copiar código (conservar aviso en `THIRD_PARTY_NOTICES.md` + registrar en `docs/COST_AUDIT.md`).
2. Skills solo texto (SKILL.md/refs) van a `.agents/skills/`; librerías de runtime pasan por ADR + benchmark en Sandcastle (worktree) antes de vendor a `site/js/vendor/`.
3. Todo lo clonado de esta cacería vive en `references/hunt-2026-10/` para que los agentes lo citen como fuente (no como dependencia).

## 6. Estado de Integración en Producción y en la Web Software Factory (Actualizado 2026-10-25) [VERIFICADO]
- **`odiff-bin` (SIMD Zig):** Instalado en `tools/audit/package.json` y activo como motor primario en `tools/audit/visual_regression.mjs` con fallback automático a `pixelmatch`.
- **`ryux_design_gate.mjs` (`RYUX v2.14.2` + `modern-frontend-design v3.0.0`):** Gate determinista conectado a `node tools/factory.mjs gate` y `node tools/factory.mjs visual-gate`.
- **`awesome-design-skills` (67 Estilos MIT):** Conectado a `node tools/factory.mjs styles` y `node tools/factory.mjs new <slug> --style <estilo>` (copia bajo demanda el estilo seleccionado a `.specify/memory/style-guide.md`).
- **Arsenal Visual de Producción (`example-client.pages.dev` + `templates/`):**
  - `uPlot` (`site/js/vendor/uPlot.iife.min.js`) cableado con *lazy-load* en `site/js/diggity-intel-suite.js` para el simulador de 50 tiros.
  - `View Transitions API` (`document.startViewTransition` + `@view-transition { navigation: auto; }`) activa en `site/js/app.js`, `site/css/style.css` y ambos moldes (`vanilla-edge` / `astro-edge`).
  - `3D Specular Tilt` delegado (`init3DTouchTilt` en `site/js/motion-fx.js`) y `CSS Scroll-Driven Animations` (`@supports (animation-timeline: view())`) activos.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_EMIL_KOWALSKI_ANIMATIONS_ON_THE_WEB]] · [[CANON_2D_3D_GRAPHICS_SHADERS_AND_AESTHETICS_2026]] · [[CANON_HOLO_SHADERS_3D_PACK_CHOREOGRAPHY_AND_WEBAUDIO_SFX_2026]] · [[CANON_ANIMATION_PRINCIPLES_ILLUSION_OF_LIFE_DISNEY]] · [[CANON_SPLE_ISO26550_AND_SOFTWARE_FACTORIES_ARCHITECTURE_2026]] · #motion_and_animation
