# 📋 ENTREVISTA INICIAL OBLIGATORIA DE CLIENTE — `agencia-alfa`

> **Estado del Gate:** `COMPLETED_BY_CTO`
> **Regla de Gobernanza:** El comando `npm run cto:construir` permanecerá bloqueado (`HARD_STOP_INTERVIEW_REQUIRED`) hasta que revises/edites este documento o `CLIENT_BRIEF_INTERVIEW.json` y ejecutes:
> `npm run cto:entrevista -- agencia-alfa --aprobar`

---

## Bloque 1 — Identidad Comercial, Rubro y Posicionamiento
- **Nombre de la Marca:** Agencia Alfa
- **Rubro / Arquetipo (`abogacia`, `fintech`, `erp`, `ecommerce`, `lujo`, `streamer`, `clinica`, `saas`):** `saas`
- **Propuesta de Valor en 1 Frase:** Plataforma digital de alta conversión para agencia-alfa con arquitectura edge y diseño de precisión.
- **3 Competidores / Referencias Admiradas:** Linear.app, Stripe.com, Vercel.com

## Bloque 2 — Público Objetivo, Psicología y Conversión (`CRO`)
- **Segmento de Cliente Ideal:** B2B / High-Intent Decision Makers (28-55 años, High / Enterprise & Professional)
- **Objeción Principal de Compra:** Tiempo de implementación y retorno de inversión verificable
- **Acción Primaria Única (`Primary CTA`):** `Solicitar Auditoría / Demo Ejecutiva` (Calendly + WhatsApp Business + Lead Form)

## Bloque 3 — Arquitectura de Páginas, Secciones y Flujos (`Sitemap`)
- **Mapa de Páginas:** Home → Soluciones → Casos de Éxito → Precios → Contacto
- **Secciones Obligatorias:**
  - Hero con Propuesta de Valor y Primary CTA
  - Bento Grid de Capacidades Core
  - Prueba Social y Métricas Verificadas
  - Tabla Comparativa / Precios Transparentes
  - Formulario de Captura sin Fricción + FAQ

## Bloque 4 — Dirección Estética, Colorimetría `OKLCH` y Tipografía
- **Modo de Superficie (`Persuade`, `Operate`, `Read`, `Experience`):** `Persuade`
- **Tema de Color:** High-Craft Adaptive OKLCH (`L=0.15, C=0.03, H=260`)
- **Radio de Bordes (`border-radius`):** `8px`
- **Personalidad Tipográfica:** Swiss Geometric Sans + Tabular Mono

## Bloque 5 — Coreografía de Movimiento, 3D WebGPU y Shaders
- **Nivel de Animación (`minimal-editorial`, `spring-fluid-60fps`, `immersive-webgpu-3d`):** `spring-fluid-60fps`
- **Tarjetas 3D / Parallax:** `true`
- **Diorama 3D (`Three.js r186` / Spark 2.x):** `false`
- **View Transitions API:** `true`

## Bloque 6 — Dirección Sonora, Música y Video Intro (`Sonic & Video Identity`)
- **UI Sound Effects (`off`, `subtle`, `tactile`, `immersive-3d`):** `subtle`
- **Material Acústico Dominante (`paper`, `polymer`, `wood`, `glass`, `metal`, `cyber-hud`):** `polymer`
- **Música de Fondo (`off`, `cc0-ambient-loop`, `adaptive-strudel`, `vertex-lyria-custom`):** `off`
- **Intro de Video con Logo (`none`, `vector-svg-reveal-3s`, `cinematic-veo-broll-5s`):** `vector-svg-reveal-3s`

## Bloque 7 — Activos del Cliente (`Assets` Reales vs. Generación IA)
- **Activos Entregados por el Cliente:** Logo Vectorial (.svg), Textos Comerciales Base, Datos de Contacto
- **Activos a Generar por la Fábrica (IA / Procedural):** OpenGraph Social Card (og-image.svg), Copywriting CRO Optimizado, Keyframes / Ilustración SOTA

## Bloque 8 — Funcionalidades Técnicas, Base de Datos e Integraciones
- **Formulario de Captura de Leads:** `true`
- **Pasarela de Pagos:** None (Consultation Flow)
- **Autenticación y Base de Datos:** OAuth 2.1 PKCE / Session Guard | Cloudflare D1 SQLite + Enterprise PostgreSQL FORCE RLS Ready
- **Integraciones Externas:** WhatsApp Direct, CRM Webhook, Privacy-First Analytics

## Bloque 9 — SEO, GEO (`llms.txt`) y Cumplimiento Legal/Seguridad
- **Palabras Clave Principales:** agencia alfa, saas, alta conversión, software
- **Objetivo Geográfico:** es-AR / LATAM / Global
- **Accesibilidad y Seguridad:** WCAG 2.2 AA+ / APCA Lc >= 75 | OWASP ASVS v5.0 L2 + Strict CSP + HSTS

## Bloque 10 — Presupuesto FinOps, Idiomas y Criterio de Aceptación Final (`Definition of Done`)
- **Idiomas:** es-AR
- **Presupuesto Cloud FinOps Máximo para el Proyecto:** `$0.25 USD` (sobre el pool de `$90 USD`)
- **Métricas de Éxito (`Definition of Done`):**
  - RYUX Visual & Sonic Gate >= 95/100
  - LCP <= 1.8s & 60 FPS en 4 viewports
  - 100% de requisitos [REQ-01]..[REQ-12] verificados con Playwright
