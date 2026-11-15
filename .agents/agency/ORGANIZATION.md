# Web Software Factory Studio — Virtual AI Agency Blueprint (SOTA 2026)

> **Model:** Anthropic *Orchestrator-Workers* + *Evaluator-Optimizer* + *ISO/IEC 26550 SPLE* + *Paperclip Virtual Agency*  
> **Status:** Active Multi-Project Operational Model (`web-software-factory` Studio + Client Product Line)  
> **Host Environment:** Windows / Antigravity IDE (Zero Daemon Overhead, Sub-500ms Rust/Zig Gates)

---

## 1. Executive Summary & Philosophy
Our **Web Software Factory Studio** operates as an elite, multi-disciplinary virtual web agency. Rather than relying on a single monolithic prompt (which suffers from context rot, generic AI-slop copy, and unverified CSS/DOM bugs), every project is executed through **11 specialized agent roles (`squad_0`..`squad_10`)** under CTO HITL governance, governed by explicit **Spec-Kit SDD contracts** (`.specify/`), **W3C DTCG `2025.10` OKLCH design tokens**, and **deterministic Rust/Playwright verification gates** (`Oxlint v1.93`, `Oxfmt v0.78`, `Biome v2.6`, `odiff-bin v4.5`, `Playwright v1.65`, `Stagehand v4.4`).

---

## 2. SOTA 11-Role Topology & Assigned Skills

```
                          [ Tomás — CEO & HITL Principal ]
                                         │
                                         ▼
                     [ 1. Orchestrator & ToM-SWE Liaison ]
                                         │
        ┌────────────────────────────────┼────────────────────────────────┐
        ▼                                ▼                                ▼
 [ 2. Product & Spec-Kit ]   [ 3. UX & Design Director ]   [ 4. Copywriting & CRO ]
   (ISO 26550 / .specify)      (RYUX / OKLCH / 67 Styles)    (Fogg B=MAP / Anti-Slop)
        │                                │                                │
        └────────────────────────────────┼────────────────────────────────┘
                                         ▼
        ┌───────────────────┬────────────┴───────────┬───────────────────┐
        ▼                   ▼                        ▼                   ▼
 [ 5A. Senior Coder ] [ 5B. Motion & 3D ]  [ 6. Edge Full-Stack ]  [ 7. SEO/AEO/GEO ]
 (Astro 7 / Islands)  (Three r187 WebGPU)  (Hono v5 / Drizzle 1.0) (llms.txt / JSON-LD)
        │                   │                        │                   │
        └───────────────────┴────────────┬───────────┴───────────────────┘
                                         ▼
           ┌─────────────────────────────┴─────────────────────────────┐
           ▼                                                           ▼
 [ 8A. QA & Visual Gatekeeper ]                         [ 8B. Security & DevSecOps ]
 (RYUX / odiff SIMD / Stagehand AX)                     (Oxlint v1.93 / Zizmor v1.32)
                                         ▲
                                         │
                     [ 9. Tech Scout & Omni-RAG v5 Curator ]
```

| # | Role | Slug | Core Mission | Assigned Skills & Tools |
| :-: | :--- | :--- | :--- | :--- |
| **0** | **CEO / HITL Principal** | `tomas` | Defines business goals, approves `/plan` gates, and signs off on visual deliverables. | Human-In-The-Loop (`ToM-SWE` modeled) |
| **1** | **Orchestrator & ToM-SWE Lead** | `orchestrator` | Decomposes goals into atomic tasks (`<=300 lines`), consults `tom_swe_engine.mjs`, and coordinates handoffs (`squad_0`). | `subagent-driven-development`, `verify-before-claim`, `delivery-gate`, `anti-shortcut-discipline`, `claude-council` |
| **2** | **Product & Spec-Kit Architect** | `product-spec-architect` | Selects stack (`astro-edge` v7 / `fullstack-saas-edge` / `vanilla-edge`), synthesizes autonomous DAG curricula, and generates `.specify/{constitution,spec,plan,tasks}.md` (`squad_8`). | `modularity`, `constraint-driven-development`, `grill-me`, `pedagogical-curriculum-architect`, `tools/factory.mjs spec` |
| **3** | **UX & Design Director** | `ux-designer` | Crafts W3C DTCG `2025.10` OKLCH tokens, Utopia `clamp()` scales, ethical gamification UX, wireframes, and binds the 67 MIT style skills (`squad_4`). | `ryux`, `modern-frontend-design`, `design-system`, `layout-primitives-architect`, `minimal-surface-hierarchy`, `gamification-and-project-coach` |
| **4** | **Copywriting & CRO Strategist** | `copywriting-cro-strategist` | Writes conversion-optimized copy, 5-beat neutral-Spanish explorable lessons (`<=110` words), CTAs, and microcopy (`Fogg B=MAP`, zero AI-slop) (`squad_3`). | `copywriting`, `cro`, `pricing-and-onboarding-cro`, `marketing-psychology`, `stop-slop`, `explorable-lesson-author` |
| **5A** | **Senior Frontend Engineer** | `senior-coder` | Implements Astro 7 Islands or Vanilla JS, semantic HTML5, zero-bloat CSS primitives, dual Socratic quiz engines, and TDD runtime controllers (`squad_9`). | `baseline-ui`, `emil-design-eng`, `code-structure`, `test-driven-development`, `socratic-tutor-and-assessor` |
| **5B** | **3D WebGPU & Motion Choreographer** | `motion-engineer` | Builds Three.js `r187` `WebGPURenderer` / `TSL` / native `GaussianSplat`, CSS Scroll-Driven Animations, and 60-FPS transitions (`squad_5`). | `motion-engineer`, `threejs-r186-tsl-and-gsap-free`, `css-scroll-driven`, `animation-performance`, `vanilla-motion-choreography` |
| **6** | **Edge Full-Stack Architect** | `edge-fullstack-architect` | Builds Cloudflare Workers APIs (`Hono v5`), Drizzle `1.0-rc` / D1 + Turso MVCC SQLite, Better Auth `v1.7`, and `AES-256-GCM` encryption (`squad_2`). | `workers-best-practices`, `cloudflare-durable-objects`, `error-handling`, `security-and-hardening` |
| **7** | **SEO, AEO & GEO Architect** | `seo-aeo-geo-architect` | Optimizes for Google & AI Answer Engines (`llms.txt`, `llms-full.txt`, `sitemap.xml`, `Schema.org JSON-LD`, `Speculation Rules API`) (`squad_7`). | `ai-seo-and-geo`, `marketingskills`, `web-perf`, `tools/audit/floor_and_aeo_guard.mjs` |
| **8A** | **QA & Visual Gatekeeper (Read-Only)** | `qa-auditor` | Blind independent Read-Only (`writeCodeAllowed: false`) *Evaluator-Optimizer* running `ryux_design_gate`, `readability_es.mjs`, `odiff-bin v4.5` SIMD, `Stagehand v4.4`, `Playwright v1.65`, and `break-ui` (`squad_10`). | `cto-hitl-visual-gate`, `ui-test`, `break-ui`, `silent-failure-hunter`, `evidence-driven-testing`, `tools/audit/readability_es.mjs` |
| **8B** | **Security & DevSecOps Auditor** | `security-engineer` | Enforces OWASP ASVS v5.0, `Oxlint v1.93`, `Zizmor v1.32`, MCP Zero-Trust `18/18` SARIF, SBOM CycloneDX, and Edge DAST (`squad_6`). | `adverse-review`, `security-audit`, `security-checklist`, `tools/security_gate.mjs` |
| **9** | **Tech Scout & Omni-RAG v5 Curator** | `tech-scout` | Researches SOTA repos/papers, curates clean-room sources/videos/OSS tools (`data/academy.sqlite`), runs Sandcastle benchmarks, and maintains `Omni-RAG v5` (`squad_1`). | `research-mode`, `kb-retrieval`, `firecrawl`, `finops-context-budget`, `clean-room-course-harvester` |

---

## 3. Standard 7-Stage Production Lifecycle for Every Website

1. **Stage 1 — Discovery & Spec-Kit Contract (`product-spec-architect`):**
   Run `node tools/factory.mjs new <slug> --stack astro-edge --archetype <type> --style <67-styles>` and `node tools/factory.mjs spec "<Feature>"` to generate `factory.project.json` and `.specify/`.
2. **Stage 2 — Design DNA & Token Engineering (`ux-designer`):**
   Configure `tokens/design.tokens.json` (`W3C DTCG 2025.10` OKLCH 90/8/2) and apply the selected style guide from `.specify/memory/style-guide.md` (`RYUX` Stages 1–4).
3. **Stage 3 — Conversion Copy & Semantic IA (`copywriting-cro-strategist` + `seo-aeo-geo-architect`):**
   Write anti-slop copy (`text-wrap: balance`), configure `Schema.org JSON-LD`, `llms.txt`, `llms-full.txt`, `sitemap.xml`, and `<script type="speculationrules">`.
4. **Stage 4 — Full-Stack & 60-FPS Component Engineering (`senior-coder` + `edge-fullstack-architect`):**
   Build components using native CSS Baseline 2026 (`@view-transition`, `animation-timeline: view()`, `interpolate-size: allow-keywords`, `content-visibility: auto`) and Cloudflare Workers/D1 APIs.
5. **Stage 5 — Accessibility-Tree Snapshot & Visual Regression (`qa-auditor`):**
   Run `node tools/audit/a11y_tree_snapshot.mjs` (90% lower token inspection) and `node tools/audit/visual_regression.mjs` (`odiff-bin` SIMD).
6. **Stage 6 — Automated Pre-HITL Factory Gates (`qa-auditor`):**
   Run `node tools/factory.mjs gate` and `node tools/factory.mjs visual-gate` — requires `100/100 PASS` across `Oxc` Rust linter, `RYUX v2.14.2`, `Floor/AEO Guard`, `Cognitive UX`, and `Security & Motion`.
7. **Stage 7 — CTO HITL Sign-Off & Edge Deployment (`orchestrator` -> `tomas`):**
   Present the verified build (`node tools/factory.mjs build`) and deploy to Cloudflare Workers Static Assets.
