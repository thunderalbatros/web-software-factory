# Web Software Factory Studio — Virtual AI Agency Blueprint (SOTA 2026)

> **Model:** Anthropic *Orchestrator-Workers* + *Evaluator-Optimizer* + *ISO/IEC 26550 SPLE* + *Paperclip Virtual Agency*  
> **Status:** Active Multi-Project Operational Model (`diggitybets.vip` + Client Product Line)  
> **Host Environment:** Windows / Antigravity IDE (Zero Daemon Overhead, Sub-500ms Rust/Zig Gates)

---

## 1. Executive Summary & Philosophy
Our **Web Software Factory Studio** operates as an elite, multi-disciplinary virtual web agency. Rather than relying on a single monolithic prompt (which suffers from context rot, generic AI-slop copy, and unverified CSS/DOM bugs), every project is executed through **9 specialized roles** governed by explicit **Spec-Kit SDD contracts** (`.specify/`), **W3C DTCG `2025.10` OKLCH design tokens**, and **deterministic Rust/Zig/Playwright verification gates**.

---

## 2. SOTA 9-Role Topology & Assigned Skills

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
        ┌────────────────────────────────┼────────────────────────────────┐
        ▼                                ▼                                ▼
 [ 5. Frontend & Motion ]    [ 6. Edge Full-Stack ]        [ 7. SEO / AEO / GEO ]
   (Astro 5 / ViewTrans /      (Cloudflare Workers / D1 /    (llms.txt / llms-full /
    Scroll-Driven CSS)          Valibot / AES-256-GCM)        JSON-LD / Speculation)
        │                                │                                │
        └────────────────────────────────┼────────────────────────────────┘
                                         ▼
                     [ 8. QA, Visual & Security Gatekeeper ]
                       (RYUX Gate / odiff SIMD / Oxc Rust /
                        Playwright AX Tree / OWASP ASVS)
                                         ▲
                                         │
                     [ 9. Tech Scout & Omni-RAG v5 Curator ]
```

| # | Role | Slug | Core Mission | Assigned Skills & Tools |
| :-: | :--- | :--- | :--- | :--- |
| **0** | **CEO / HITL Principal** | `tomas` | Defines business goals, approves `/plan` gates, and signs off on visual deliverables. | Human-In-The-Loop (`ToM-SWE` modeled) |
| **1** | **Orchestrator & ToM-SWE Lead** | `orchestrator` | Decomposes goals into atomic tasks (`<=300 lines`), consults `tom_swe_engine.mjs`, and coordinates handoffs. | `subagent-driven-development`, `tom-swe-modeling`, `verify-before-claim`, `finops-context-budget` |
| **2** | **Product & Spec-Kit Architect** | `product-spec-architect` | Selects stack (`astro-edge` vs `vanilla-edge`), archetype, and generates `.specify/{constitution,spec,plan,tasks}.md`. | `modularity`, `constraint-driven-development`, `tools/factory.mjs spec` |
| **3** | **UX & Design Director** | `ux-designer` | Crafts W3C DTCG `2025.10` OKLCH tokens, Utopia `clamp()` scales, wireframes, and binds the 67 MIT style skills. | `ryux`, `modern-frontend-design`, `design-system-architect`, `minimal-surface-hierarchy`, `utopia-fluid-ergonomics`, `21st-ui`, `extract-design` |
| **4** | **Copywriting & CRO Strategist** | `copywriting-cro-strategist` | Writes conversion-optimized headlines, CTAs, pricing tables, and microcopy (`Fogg B=MAP`, Cialdini, zero AI-slop). | `copywriting`, `cro`, `marketing-psychology`, `stop-slop`, `hallmark` |
| **5** | **Senior Frontend & Motion Engineer** | `senior-coder` | Implements Astro 5 Islands or Vanilla JS, View Transitions API, CSS Scroll-Driven Animations, `@starting-style`, `interpolate-size`, and 3D Specular Tilt. | `motion-engineer`, `animation-performance`, `emil-design-eng`, `vanilla-motion-choreography`, `obs-overlays` |
| **6** | **Edge Full-Stack Architect** | `edge-fullstack-architect` | Builds Cloudflare Workers APIs, D1 SQLite schemas, Write-Through coalescing, OAuth 2.1 PKCE, and `AES-256-GCM` encryption. | `workers-best-practices`, `cloudflare-durable-objects`, `error-handling`, `security-and-hardening` |
| **7** | **SEO, AEO & GEO Architect** | `seo-aeo-geo-architect` | Optimizes for Google & AI Answer Engines (`llms.txt`, `llms-full.txt`, `sitemap.xml`, `Schema.org JSON-LD`, `Speculation Rules API`). | `web-quality-skills`, `web-perf`, `tools/audit/floor_and_aeo_guard.mjs` |
| **8** | **QA, Visual & Security Gatekeeper** | `qa-auditor` | Independent *Evaluator-Optimizer* running `ryux_design_gate`, `odiff-bin` SIMD, `oxlint` Rust, `a11y_tree_snapshot`, and `break-ui`. | `cto-hitl-visual-gate`, `ui-test`, `break-ui`, `security-audit`, `adverse-review`, `silent-failure-hunter` |
| **9** | **Tech Scout & Omni-RAG Curator** | `tech-scout` | Researches SOTA repos/papers, runs Sandcastle benchmarks, and maintains the `Omni-RAG v5` (`24,746+` chunks) knowledge graph. | `research`, `sandboxed-experiments`, `firecrawl`, `kb-retrieval`, `kb-writing`, `self-evolving-factory` |

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
