# TECH SCOUT RADAR 2026 — Radar de Inteligencia Multi-Fuente de 6 Capas y SOTA Viability Score (0–100)

> **Generado:** 2026-10-28T01:42:21.473Z  
> **Triple Filtro + SOTA Viability Score:** Costo = $0 USD (Sin Tarjeta) | Licencia Permisiva + 0 CVEs en OSV.dev (Veto Automático) | Puntaje de Admisión `>= 85/100`  
> **Higiene del RAG:** Ninguna lista masiva de enlaces se vuelca en `knowledge/`; solo se ingieren síntesis verificadas (`TIER_1_SOTA_2026`) o skills auditadas por `security_gate.mjs`.

---

## 1. Arquitectura de las 6 Capas de Inteligencia (`MULTI_TIER_INTELLIGENCE_SOURCES`)

| Capa | Nombre del Radar | Fuentes Activas | Rol en la Fábrica |
|:---:|:---|:---:|:---|
| **Capa 1** | **Directorios Curados Base (`CURATED_AWESOME_RADARS`)** | **17 listas** (6 dominios) | Filtro selectivo sobre `sindresorhus/awesome` compatible con `approved_packages.json`. |
| **Capa 2** | **Velocidad y Lanzamientos Tier-1 (`TIER1_ORG_AND_VELOCITY_FEEDS`)** | **22 feeds** | Monitoreo directo de `withastro`, `cloudflare`, `oxc-project`, `voidzero-dev`, `mrdoob`, `sparkjsdev`, `google-research`, `HKUDS`, `gepa-ai` + *Best of JS*. |
| **Capa 3** | **Radar "Native-First" 0 KB (`WEB_PLATFORM_BASELINE_AND_W3C`)** | **10 estándares** | Prioriza CSS Baseline 2026 (`animation-timeline`, `@starting-style`, `View Transitions`, `Popover`, `Anchor`, `Subgrid`, `OKLCH`) en `0 KB` antes de instalar librerías. |
| **Capa 4** | **Registros de Documentación Agéntica (`LLMS_TXT_AND_MCP_REGISTRY`)** | **8 sondas** | Detección automática de `/llms.txt`, `/llms-full.txt`, `SKILL.md` (`agentskills.io`) y servidores MCP verificados. |
| **Capa 5** | **Frontera Científica Aplicada (`ARXIV_AND_HF_PAPERS_FEED`)** | **6 feeds** | Papers de `arXiv` (`cs.SE`, `cs.AI`, `cs.GR`, `cs.CR`) y *HuggingFace Daily Papers* con código open-source verificable. |
| **Capa 6** | **Telemetría AppSec y Salud en Vivo (`LIVE_APPSEC_AND_PACKAGE_HEALTH`)** | **6 guardias** | Verificación contra **OSV.dev API**, **GHSA**, **OWASP ASVS v5.0** y peso desempaquetado en NPM Registry. |

---

## 2. Fórmula Determinista `calculateSotaViabilityScore(candidate)` (`0–100 Puntos`)

$$\text{SOTA Viability Score} = S_{\text{AppSec/Licencia (30)}} + S_{\text{Zero-Bloat (25)}} + S_{\text{ESM/TS 2026 (20)}} + S_{\text{Agentic Readiness (15)}} + S_{\text{Incremental Vault (10)}}$$

- **1. Seguridad y Licencia (30 pts — Veto Gate):** `0` CVEs activos en OSV.dev + licencia estrictamente permisiva (`MIT`, `Apache-2.0`, `BSD`, `CC0`, `ISC`, `W3C`). Si falla, **Veto Automático (`Score = 0`)**.
- **2. Eficiencia y Peso Zero-Bloat (25 pts):** Puntaje máximo para primitivas `<= 15 KB` o `0` dependencias de runtime; penalización severa para paquetes que degraden los `60 FPS` o el arranque en Cloudflare Workers.
- **3. Frescura y Estándar ESM/TS 2026 (20 pts):** Actividad comprobada `<= 180 días` (`8 pts`), soporte nativo ES Modules `.mjs` (`6 pts`) y tipado TypeScript estricto (`6 pts`).
- **4. Readiness Agéntico (15 pts):** Bonificación por proveer `/llms.txt` (`5 pts`), `SKILL.md` (`5 pts`) y CLI determinista JSON o servidor MCP (`5 pts`).
- **5. Valor Incremental sobre la Bóveda Local (10 pts):** Verifica contra `.agents/memory/local_vault_registry.json` que aporte una capacidad nueva o supere en rendimiento a lo ya instalado.
- **Umbral de Admisión:** Solo los candidatos con **`score >= 85/100`** pasan a pruebas en `sandbox.mjs` y `security_gate.mjs`.

---

## 3. Tecnologías SOTA Aprobadas en Producción (`Score >= 85/100`)

| ID | Tecnología y Dominio | Capa de Origen | Licencia | Peso / Deps | SOTA Viability Score | Verificación |
|:---|:---|:---|:---|:---|:---:|:---|
| `css-starting-style-interpolate-size` | **W3C CSS @starting-style & interpolate-size: allow-keywords**<br>*(Squad 4 & 5 — Modern CSS & 60-FPS Motion)* — Zero-JS entry/exit transitions for modals and intrinsic height animations on the compositor thread. | Capa 3 (Native-First Web Platform 0 KB) | `W3C` | `0 KB` (0 deps) | **`100/100`** | [VERIFICADO: https://developer.chrome.com/blog/new-in-web-ui-io-2024, 2026-10-20] |
| `valibot-edge-schema` | **Valibot v1 Modular Schema Validation (~1.2 KB)**<br>*(Squad 2 & 3 — Cloudflare Edge & RealtimeHub Webhooks)* — Tree-shakeable schema validation for Worker endpoints and RealtimeHub payloads with 90% smaller bundle footprint than Zod. | Capa 2 (Tier-1 Org Releases: fabian-hiller) | `MIT` | `1.2 KB` (0 deps) | **`100/100`** | [VERIFICADO: https://github.com/fabian-hiller/valibot, 2026-10-20] |
| `w3c-dtcg-2025-10-lightningcss` | **W3C DTCG 2025.10 OKLCH Token Compiler + LightningCSS (Rust)**<br>*(Squad 4 & 5 — Design Systems & Ultra-Fast CSS Compilation)* — Vendor-neutral W3C DTCG 2025.10 JSON tokens in OKLCH color space compiled and minified in <5ms via Rust LightningCSS. | Capa 3 (W3C DTCG 2025.10 Standard) | `W3C` | `0 KB` (0 deps) | **`100/100`** | [VERIFICADO: https://tr.designtokens.org/format/2025.10/, 2026-10-25] |
| `playwright-mcp-ax-tree` | **Microsoft @playwright/mcp + Accessibility-Tree (AX) Snapshot Inspector**<br>*(Squad 6 — Agentic Browser Automation & 90% Token-Saving QA)* — Structured ARIA Accessibility-Tree inspection and headless browser automation over MCP without expensive vision token overhead. | Capa 4 (Agentic Docs & MCP Registry) | `Apache-2.0` | `8.5 KB` (1 deps) | **`98/100`** | [VERIFICADO: https://github.com/microsoft/playwright-mcp, 2026-10-25] |
| `pngjs-component-visual-regression` | **Deterministic Component Visual Regression (Playwright + PNGJS/odiff-bin)**<br>*(Squad 6 — PQC Visual QA & Clean-Diff Trap Prevention)* — Isolated component testbench across 4 viewports with animations frozen and maxDiffPixelRatio <= 0.01. | Capa 1 & 6 (Curated QA + OSV.dev Verified) | `MIT` | `12 KB` (0 deps) | **`94/100`** | [VERIFICADO: https://github.com/pngjs/pngjs, 2026-10-20] |
| `speculative-rag-vertex-cache` | **Speculative RAG + Harness² + GEPA Pareto Self-Evolving Architecture**<br>*(Squad 0 & 1 — Cognitive RAG, Harness² & FinOps)* — Recursive Propose-Probe-Compose (Harness²), Genetic-Pareto multi-objective evolution (GEPA), and 75-90% cached token savings. | Capa 5 (arXiv cs.SE / cs.AI Applied Frontier) | `Apache-2.0` | `0 KB` (0 deps) | **`100/100`** | [VERIFICADO: https://arxiv.org/abs/2603.28052, 2026-10-27] |
| `cloudflare-d1-hibernation-sync` | **Cloudflare D1 Edge SQL + Durable Objects WebSocket Hibernation**<br>*(Squad 2 — Edge Persistence & Realtime Sync)* — Zero-cost SQLite at the edge paired with automated D1 provisioning and local fallback parity. | Capa 2 (Tier-1 Org Releases: cloudflare) | `Apache-2.0` | `0 KB` (0 deps) | **`100/100`** | [VERIFICADO: https://developers.cloudflare.com/d1/, 2026-10-20] |

---

## 4. Capa 1: Dominios Curados Selectivos (`CURATED_AWESOME_RADARS`)

| Dominio | Listas Curadas (`sindresorhus/awesome`) | Política Node v24 / Edge | Paquetes Compatibles `approved_packages.json` |
|:---|:---|:---|:---|
| **Frontend & Motion** | [`awesome-astro`](https://github.com/one-aalam/awesome-astro), [`awesome-css`](https://github.com/awesome-css-group/awesome-css), [`awesome-web-animation`](https://github.com/sergey-pimenov/awesome-web-animation), [`awesome-webgl`](https://github.com/sjfricke/awesome-webgl) | Prioritize zero-dependency CSS/WebGL primitives running on GPU compositor (transform/opacity) compatible with Astro 5. | `astro`, `@astrojs/mdx`, `@astrojs/rss`, `@astrojs/sitemap`, `lightningcss`, `svgo`, `thumbhash`, `uplot` |
| **Design Systems & A11y** | [`awesome-design-systems`](https://github.com/alexpate/awesome-design-systems), [`awesome-design-tokens`](https://github.com/sturobson/Awesome-Design-Tokens), [`awesome-a11y`](https://github.com/brunopulis/awesome-a11y) | Prioritize W3C DTCG 2025.10 token tooling, APCA perceptual contrast calculators, and deterministic a11y auditors. | `apca-w3`, `axe-core`, `pa11y`, `lightningcss` |
| **Node.js & Tooling ESM** | [`awesome-nodejs`](https://github.com/sindresorhus/awesome-nodejs), [`awesome-typescript`](https://github.com/dzharii/awesome-typescript) | Prioritize zero-dependency ESM modules compatible with Node v24 and tree-shakeable micro-libraries (<2KB). | `valibot`, `dnum`, `fzstd`, `minisearch`, `esbuild`, `oxlint`, `typescript`, `vite` |
| **Edge & Serverless** | [`awesome-cloudflare`](https://github.com/zhuima/awesome-cloudflare), [`awesome-edge-computing`](https://github.com/columns/awesome-edge-computing) | Prioritize V8 Isolate native libraries with 0 Node.js C++ addon dependencies and <1ms Worker cold-start impact. | `wrangler`, `@astrojs/cloudflare`, `@cloudflare/workers-types`, `valibot`, `fzstd` |
| **Testing & Performance** | [`awesome-playwright`](https://github.com/mxschmitt/awesome-playwright), [`awesome-wpo`](https://github.com/davidsonfellipe/awesome-wpo), [`awesome-lighthouse`](https://github.com/Lighthouse-ci/awesome-lighthouse) | Prioritize deterministic headless QA, pixel-diff visual regression, and Core Web Vitals optimization tools. | `playwright`, `playwright-core`, `@playwright/test`, `@playwright/mcp`, `lighthouse`, `odiff-bin`, `pixelmatch`, `pngjs`, `vitest` |
| **Web AppSec** | [`awesome-web-security`](https://github.com/qazbnm456/awesome-web-security), [`awesome-csp`](https://github.com/kravietz/awesome-csp), [`awesome-appsec`](https://github.com/paragonie/awesome-appsec) | Prioritize audited zero-trust sanitizers, strict CSP generators, and lightweight schema validators approved in approved_packages.json. | `dompurify`, `valibot`, `oxlint` |

---

## 5. Candidatos Rechazados por Veto Gate / SOTA Viability Score

- **Heavy Local Vector Daemons (Docker Qdrant / Milvus Standalone):** Bloqueado (`0/100`) por requerir daemon en segundo plano >1.5 GB RAM. Reemplazado por `node:sqlite` FTS5 + MiniSearch BM25 en proceso.
- **Librerías JS de Animación de Scroll Antiguas (ScrollMagic / AOS / Locomotive v4):** Bloqueado por **Capa 3 (Regla Native-First 0 KB)** — reemplazado por `animation-timeline: view() / scroll()` nativo a 60/120 FPS en el hilo compositor.
- **SaaS Pagos de Regresión Visual (Percy / Chromatic Cloud):** Bloqueado (`0/100`) por requerir tarjeta/suscripción. Reemplazado por `odiff-bin` + `pixelmatch` local determinista.
