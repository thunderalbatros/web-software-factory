# SPEC.md — Especificación Técnica Ejecutable Compilada desde Doble Entrevista (`agencia-alfa`)

> **Estado Compuerta #1 (`PRD_LEAN.md`):** `COMPLETED_BY_CTO` | **Estado Compuerta #2 (`SPEC.md`):** `COMPLETED_BY_CTO`  
> **Modo de Identidad de Marca:** `PARTIAL_BRAND_EVOLUTION` (`lockClientPalette: false`) | **Arquetipo:** `saas` | **Modo de Superficie:** `Persuade`  
> **Compilado Determinísticamente por:** `tools/orchestrator/client_interview_gate.mjs` (`compileSpecFromInterview`)

---

## 1. Trazabilidad 1:1 desde `PRD_LEAN.md` (`[INV-01..07]`) hacia Requisitos Técnicos (`[REQ-01]` a `[REQ-12]`)

- **[REQ-01] (Trazable a `[INV-01]`) Identidad y Propuesta de Valor en Hero:** Renderizar en el primer viewport el titular de `Agencia Alfa` (*"Agencia Alfa combina atención experta inmediata, resultados auditables y una experiencia digital sin fricción superior a los competidores tradicionales."*) con claridad en `<= 3 segundos`.
- **[REQ-02] (Trazable a `[INV-05]`) Acción Primaria Única (`Primary CTA`):** Implementar el CTA primario **`Solicitar Presupuesto / Agendar Consulta Ahora`** conectado a `Formulario Calificado + WhatsApp Directo` con área táctil Fitts `>= 48x48px`.
- **[REQ-03] (Trazable a `[INV-02]`) Arquitectura Sitemap y Derribo de las 3 Objeciones:** Proveer navegación semántica para `Home, Soluciones, Casos de Éxito, Precios, Contacto` y renderizar las secciones obligatorias: Hero con Propuesta de Valor y Primary CTA; Bento Grid de Capacidades Core; Prueba Social y Métricas Verificadas; Tabla Comparativa / Precios Transparentes; Formulario de Captura sin Fricción + FAQ.
- **[REQ-04] (Trazable a `[INV-03]`) Contrato de Marca `BRAND_IDENTITY_LOCK.json`, Colorimetría `OKLCH` y `APCA`:** Respetar `brandIdentityMode: "PARTIAL_BRAND_EVOLUTION"` (`lockClientPalette: false`, primario `#2563EB`, secundario `#0F172A`, acento `#10B981`, logo `public/assets/brand/logo-primary.svg`), tokens `OKLCH` (`L=0.15, C=0.03, H=260`) y contraste `WCAG 2.2 AA+ / APCA Lc >= 75`.
- **[REQ-05] (Trazable a `[INV-04]`) Escala Tipográfica Fluida `Utopia clamp()`:** Garantizar tipografía fluida sin saltos bruscos entre `320px` y `2560px` con personalidad `Swiss Geometric Sans + Tabular Mono` y radio de borde `8px`.
- **[REQ-06] (Trazable a `[INV-04]`) Coreografía de Movimiento a 60 FPS:** Ejecutar animaciones nivel `spring-fluid-60fps` con física de resorte (`stiffness: 280, damping: 24`) respetando `prefers-reduced-motion: reduce`.
- **[REQ-07] Identidad Sonora Psicoacústica y Video Intro con Logo Bloqueado:** Configurar `uiSfxMode: "subtle"`, material modal `polymer` (`f0=699.39Hz, cutoff=903Hz, attack=15.72ms, pico=-23.74dBFS <= -18dBFS`), música `off` e intro `vector-svg-reveal-3s` usando `public/assets/brand/logo-primary.svg`.
- **[REQ-08] (Trazable a `[INV-06]`) Activos Reales del Cliente, Prueba Social y OpenGraph:** Integrar activos reales (public/assets/brand/logo-primary.svg, public/assets/brand/isotipo.svg, Textos Comerciales PRD_LEAN.md) y generar `dist/og-image.svg` (`1200x630`) automáticamente.
- **[REQ-09] (Trazable a `[INV-05]`) Captura de Leads `Valibot`, Pagos Idempotentes y Multi-Tenant RLS:** Habilitar formulario validado con `Valibot`, pasarela `None (Consultation Flow)` e idempotencia compatible con `Cloudflare D1 SQLite + Enterprise PostgreSQL FORCE RLS Ready`.
- **[REQ-10] SEO Técnico y Visibilidad IA (`GEO / llms.txt`):** Emitir `llms.txt`, `robots.txt`, `sitemap.xml` y `Schema.org JSON-LD @graph` para `agencia alfa, saas, alta conversión, software` (`es-AR / LATAM / Global`).
- **[REQ-11] Blindaje DevSecOps (`OWASP ASVS v5.0`) y Pure Component 5-State Harness:** Compilar cabeceras `_headers` con `OWASP ASVS v5.0 L2 + Strict CSP + HSTS`, `0` source maps y superar los 5 estados del arnés de componentes puros (`empty, loading, error-state, extreme-long-text-250chars, dark-mode`).
- **[REQ-12] (Trazable a `[INV-07]`) Frontera `Explicit Non-Goals`, Presupuesto FinOps y `DoD`:** Mantener el gasto cloud `<= $0.25 USD`, bloquear todo pedido listado en `Explicit Non-Goals` de `PRD_LEAN.md` y cumplir: RYUX Visual & Sonic Gate >= 95/100 | LCP <= 1.8s & 60 FPS en 4 viewports | 100% de requisitos [REQ-01]..[REQ-12] verificados con Playwright.

---

## 2. Matriz de Verificación Determinista (Playwright + RYUX Gate + Local Fullstack Harness)

| ID Requisito | Aserción Automatizada | Herramienta / Gate | Umbral de Aprobación |
| :--- | :--- | :--- | :--- |
| `[REQ-01..03]` | Presencia de `<h1>`, Primary CTA `>= 48x48px` y secciones del Sitemap | `tools/verify_all.mjs` | `PASS (0 errores DOM)` |
| `[REQ-04..06]` | `BRAND_IDENTITY_LOCK.json`, `OKLCH`, `Utopia clamp()`, `CLS == 0.00` y 60 FPS | `tools/audit/ryux_design_gate.mjs` | `Score >= 95/100` |
| `[REQ-07]` | Techo `<= -18 dBFS`, notch ISO 226 `2.5-4.2kHz`, `[data-audio-mute-toggle]` | `ryux-audio-video-ergonomics-and-budget` | `PASS (Safety Verified)` |
| `[REQ-08..12]` | `dist/og-image.svg`, `llms.txt`, `_headers` CSP, 5-State Component & RLS Harness | `tools/audit/local_fullstack_and_component_harness.mjs` | `PASS (>= 95/100)` |
