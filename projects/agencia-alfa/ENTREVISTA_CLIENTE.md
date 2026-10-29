# ⚙️ ENTREVISTA #2 OBLIGATORIA: ESPECIFICACIÓN TÉCNICA (`SPEC.md` & `DESIGN.md`) — `agencia-alfa`

> **Estado de Compuerta #2 (`specInterviewStatus`):** `COMPLETED_BY_CTO`
> **Pre-Requisito Compuerta #1 (`PRD_LEAN.md` + `BRAND_IDENTITY_LOCK.json`):** `COMPLETED_BY_CTO` (`brandIdentityMode: PARTIAL_BRAND_EVOLUTION`, `lockClientPalette: false`)
> **Regla de Gobernanza:** Una vez aprobada la Entrevista #1, completá/revisá estos 10 bloques técnicos y ejecutá:
> `npm run cto:entrevista -- agencia-alfa --aprobar`

---

## Bloque 1 — Arquitectura de Páginas y Secciones DOM (Trazable a `PRD_LEAN.md`)
- **Marca y Arquetipo:** Agencia Alfa (`saas`)
- **Mapa de Vistas:** Home → Soluciones → Casos de Éxito → Precios → Contacto
- **Desglose de Componentes DOM Requeridos:**
  - Header Semántico con Navegación Accesible + Mute Toggle + Selector de Tema
  - Hero Principal (Agencia Alfa) con Propuesta de Valor [INV-01] y Primary CTA (Solicitar Presupuesto / Agendar Consulta Ahora)
  - Sección de Capacidades Operativas y Derribo de las 3 Objeciones del Comprador [INV-02]
  - Bento Grid / Catálogo Filtrable con Prueba Social Verificable [INV-06]
  - Formulario de Conversión Validado con Valibot + Footer Legal y Datos Operativos

## Bloque 2 — Contratos Funcionales, Estados `Pure vs. Wired` y Validación `Valibot`
- **Primary CTA Conectado:** `Solicitar Presupuesto / Agendar Consulta Ahora` (Formulario Calificado + WhatsApp Directo)
- **Arquitectura de Componentes Puros (`Pure Components`):** `true` (5 Estados: empty, loading, error-state, extreme-long-text-250chars, dark-mode)
- **Esquemas `Valibot` Activos:** LeadCaptureFormSchema (nombre, email, telefono, mensaje, csrfToken) | InteractiveCalculatorOrFilterSchema (categoria, presupuesto, urgencia)

## Bloque 3 — Topología de Grilla y Morfología de Componentes (`bespoke_morphology_composer.mjs`)
- **Topología de Grilla (`gridTopology`):** `bento-modular-kinetic-grid`
- **Arquitectura de Hero (`heroArchitecture`):** `focal-centered-interactive-stage`
- **Materialidad de Superficie:** `polymer` (Divergencia intra-categoría `>= 70%`)

## Bloque 4 — Aplicación de Paleta, Contraste `APCA` y Escalas Tipográficas (`token_compiler.mjs`)
- **Modo de Superficie:** `Persuade` | **Modo de Marca:** `PARTIAL_BRAND_EVOLUTION` (`lockClientPalette: false`)
- **Semilla de Colores del Cliente:** Primario `#2563EB`, Secundario `#0F172A`, Acento `#10B981`
- **Piso de Contraste `APCA`:** Lc >= 90 (Hero/Headline), Lc >= 75 (Body), Lc >= 60 (Secondary) | **Tipografía:** 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif

## Bloque 5 — Física de Animaciones, Scroll y Micro-Interacciones a 60 FPS
- **Nivel de Animación:** `spring-fluid-60fps` ($zeta = 0.78$, `stiffness: 280, damping: 24`)
- **Scroll-Driven CSS & View Transitions API:** `scroll=true`, `viewTransitions=true`, `reducedMotion=true`

## Bloque 6 — Gráficos 3D WebGPU, Modelos `.glb` y Shaders (`shader_and_3d_forge.mjs`)
- **Modo 3D / Shader (`none`, `glb-viewer`, `spark-gaussian-splatting`, `shader-hero`, `holo-cards`):** `shader-hero`
- **Watchdog de Histograma `<canvas>` en 3 Timestamps:** `true`

## Bloque 7 — Diseño Sonoro UI SFX, Música de Fondo y Sesión `.rpp` Reaper (`sonic_and_music_forge.mjs`)
- **Modo Sonoro (`generative-criteria`, `custom-brief`, `off`):** `generative-criteria` (`uiSfxMode: subtle`, material `polymer`)
- **Música de Fondo:** `off` | **Exportación Reaper `.rpp`:** `true`

## Bloque 8 — Video Intro Programática de Marca y Locución (`programmatic_video_forge.mjs`)
- **Modo de Video Intro (`off`, `minimal`, `3d-pbr`, `vertex-veo-hybrid`, `shader-hud`):** `minimal` (`vector-svg-reveal-3s`)
- **Activos Bloqueados de Marca:** Logo `public/assets/brand/logo-primary.svg`, Isotipo `public/assets/brand/isotipo.svg` (Presupuesto `<= 1.8 MB`)

## Bloque 9 — Base de Datos, Pagos, Autenticación y Edge Worker (`dual_database_forge.mjs`)
- **Motor de Datos (`static-none`, `edge-d1`, `enterprise-postgres`):** `edge-d1` (Cloudflare D1 SQLite + Enterprise PostgreSQL FORCE RLS Ready)
- **Pasarela de Pagos:** `none` | **Auth:** `Ory/Passkeys (OAuth 2.1 PKCE)` | **Endpoints Worker:** POST /api/leads, POST /api/webhooks/payments, GET /api/health

## Bloque 10 — App Móvil `Capacitor 8`, Widget Post-Venta y Matriz `[REQ-01]..[REQ-12]`
- **Target Móvil `Capacitor 8`:** `false` | **Widget Post-Venta:** `true`
- **Criterios Fail-to-Pass (`F2P`):**
  - [REQ-01..03] Identidad PRD_LEAN, Primary CTA >= 48x48px y derribo de 3 objeciones
  - [REQ-04..06] BRAND_IDENTITY_LOCK (lockClientPalette), APCA Lc >= 75 y 60 FPS
  - [REQ-07..09] Audio/Video <= -18dBFS, Valibot, Idempotencia Webhooks y RLS Multi-Tenant
  - [REQ-10..12] SEO/GEO llms.txt, CSP/ASVS v5.0 y Pure Component 5-State Harness >= 95/100
