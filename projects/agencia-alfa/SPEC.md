# SPEC.md — Especificación Ejecutable Compilada desde Entrevista (`agencia-alfa`)

> **Estado de Entrevista:** `COMPLETED_BY_CTO` | **Arquetipo:** `saas` | **Modo de Superficie:** `Persuade`  
> **Compilado Automáticamente por:** `tools/orchestrator/client_interview_gate.mjs` (`compileSpecFromInterview`)

---

## 1. Requisitos Funcionales y No Funcionales Numerados (`[REQ-01]` a `[REQ-12]`)

- **[REQ-01] Identidad y Propuesta de Valor en Hero:** Renderizar en el primer viewport el titular de `Agencia Alfa` (*"Plataforma digital de alta conversión para agencia-alfa con arquitectura edge y diseño de precisión."*) con claridad en `<= 3 segundos`.
- **[REQ-02] Acción Primaria Única (`Primary CTA`):** Implementar el CTA primario **`Solicitar Auditoría / Demo Ejecutiva`** conectado a `Calendly + WhatsApp Business + Lead Form` con área táctil Fitts `>= 48x48px`.
- **[REQ-03] Arquitectura Sitemap y Navegación:** Proveer navegación semántica para `Home, Soluciones, Casos de Éxito, Precios, Contacto` y renderizar las secciones obligatorias: Hero con Propuesta de Valor y Primary CTA; Bento Grid de Capacidades Core; Prueba Social y Métricas Verificadas; Tabla Comparativa / Precios Transparentes; Formulario de Captura sin Fricción + FAQ.
- **[REQ-04] Colorimetría Perceptual `OKLCH` y Contraste `APCA`:** Aplicar tokens `OKLCH` (`L=0.15, C=0.03, H=260`), regla de superficie `90/8/2` y contraste `WCAG 2.2 AA+ / APCA Lc >= 75`.
- **[REQ-05] Escala Tipográfica Fluida `Utopia clamp()`:** Garantizar tipografía fluida sin saltos bruscos entre `320px` y `2560px` con personalidad `Swiss Geometric Sans + Tabular Mono` y radio de borde `8px`.
- **[REQ-06] Coreografía de Movimiento a 60 FPS:** Ejecutar animaciones nivel `spring-fluid-60fps` con física de resorte (`stiffness: 280, damping: 24`) respetando `prefers-reduced-motion: reduce`.
- **[REQ-07] Identidad Sonora Psicoacústica y Video Intro:** Configurar `uiSfxMode: "subtle"`, material modal `polymer` (`f0=699.39Hz, cutoff=903Hz, attack=15.72ms, pico=-23.74dBFS <= -18dBFS`), música `off` e intro `vector-svg-reveal-3s`.
- **[REQ-08] Activos Visuales y OpenGraph Social Card:** Integrar activos del cliente (Logo Vectorial (.svg), Textos Comerciales Base, Datos de Contacto) y generar `dist/og-image.svg` (`1200x630`) automáticamente.
- **[REQ-09] Captura de Leads, Pagos y Persistencia Segura:** Habilitar formulario validado con `Valibot`, pasarela `None (Consultation Flow)` y esquema compatible con `Cloudflare D1 SQLite + Enterprise PostgreSQL FORCE RLS Ready`.
- **[REQ-10] SEO Técnico y Visibilidad IA (`GEO / llms.txt`):** Emitir `llms.txt`, `robots.txt`, `sitemap.xml` y `Schema.org JSON-LD @graph` para `agencia alfa, saas, alta conversión, software` (`es-AR / LATAM / Global`).
- **[REQ-11] Blindaje DevSecOps (`OWASP ASVS v5.0`):** Compilar cabeceras `_headers` con `OWASP ASVS v5.0 L2 + Strict CSP + HSTS` y `0` source maps en producción.
- **[REQ-12] Presupuesto FinOps y Criterio de Éxito (`DoD`):** Mantener el gasto cloud del proyecto `<= $0.25 USD` y cumplir: RYUX Visual & Sonic Gate >= 95/100 | LCP <= 1.8s & 60 FPS en 4 viewports | 100% de requisitos [REQ-01]..[REQ-12] verificados con Playwright.

---

## 2. Matriz de Verificación Determinista (Playwright + RYUX Gate)

| ID Requisito | Aserción Automatizada | Herramienta / Gate | Umbral de Aprobación |
| :--- | :--- | :--- | :--- |
| `[REQ-01..03]` | Presencia de `<h1>`, Primary CTA `>= 48x48px` y secciones del Sitemap | `tools/verify_all.mjs` | `PASS (0 errores DOM)` |
| `[REQ-04..06]` | Tokens `OKLCH`, `Utopia clamp()`, `CLS == 0.00` y 60 FPS en 4 viewports | `tools/audit/ryux_design_gate.mjs` | `Score >= 95/100` |
| `[REQ-07]` | Techo `<= -18 dBFS`, notch ISO 226 `2.5-4.2kHz`, `[data-audio-mute-toggle]` | `ryux-audio-video-ergonomics-and-budget` | `PASS (Safety Verified)` |
| `[REQ-08..12]` | `dist/og-image.svg`, `llms.txt`, `_headers` CSP y presupuesto FinOps `<= $0.25` | `tools/build_dist.mjs` + `security_check` | `PASS (100% DoD)` |
