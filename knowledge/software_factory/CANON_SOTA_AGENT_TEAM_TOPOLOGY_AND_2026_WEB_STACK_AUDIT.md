# CANON: SOTA Agent Team Topology & 2026 Web Software Factory Stack Audit

> **Scope:** Canonical architecture and operational doctrine for our Multi-Project Web Software Factory (`web-software-factory` & `streamerbot`), covering 2026 multi-agent topologies, Rust/Zig zero-daemon verification engines, CSS Baseline 2026 primitives, Speculation Rules (`0ms` prerender), Playwright Accessibility-Tree (`AX`) snapshots, and Agentic SEO (`llms.txt` / `llms-full.txt`).

---

## 1. The 5 Structural Layers of an Intelligent 2026 AI Software Factory

Modern production-grade AI Software Factories (Anthropic *Building Effective Agents*, Factory 2.0, HumanLayer *12-Factor Agents*, and *ISO/IEC 26550 SPLE*) separate the factory into **5 deterministic layers**:

1. **Layer 1 — Intake & Spec-Driven Control Plane (`tools/factory.mjs` + `.specify/`):**
   - Raw business intent is converted into `factory.project.json` and 4 formal `github/spec-kit` artifacts (`constitution.md`, `spec.md`, `plan.md`, `tasks.md`) before a single line of application code is written.
2. **Layer 2 — Sovereign Knowledge & Context Routing (`Omni-RAG v5` + `STATE_PACKET.md`):**
   - Queries route in `<1ms` via `squad_semantic_router.mjs` across `24,750+` chunks in `Omni-RAG v5` (`SQLite FTS5` + `MiniSearch` + `WikiGraph PageRank`), while `docs/STATE_PACKET.md` (`<=1.5 KB`) prevents Turn-1 context bloat.
3. **Layer 3 — Specialized 9-Role Virtual Agency (`.agents/agency/ORGANIZATION.md`):**
   - Replaces monolithic single-prompt coding with explicit role boundaries and handoff contracts:
     1. `orchestrator` (*Executive Tech Lead & ToM-SWE Liaison*)
     2. `product-spec-architect` (*PM, Archetype Selector & Spec-Kit Architect*)
     3. `ux-designer` (*W3C DTCG `2025.10` OKLCH Tokens, RYUX v2.14.2 & 67 MIT Styles*)
     4. `copywriting-cro-strategist` (*Fogg $B=MAP$, Ethical Cialdini, 5-Second Clarity & Anti-Slop*)
     5. `senior-coder` (*Astro 5 Islands / Vanilla-Edge, View Transitions, Scroll-Driven CSS, 3D Specular Tilt*)
     6. `edge-fullstack-architect` (*Cloudflare Workers, D1 SQLite, Write-Through Coalescing, `AES-256-GCM`*)
     7. `seo-aeo-geo-architect` (*Technical SEO, Agentic SEO `llms.txt` + `llms-full.txt`, JSON-LD `@graph`, Speculation Rules*)
     8. `qa-auditor` (*Evaluator-Optimizer Gatekeeper: RYUX Gate, `odiff-bin` SIMD, Oxc Rust, Playwright AX Tree*)
     9. `tech-scout` (*R&D, Sandcastle Worktrees & Omni-RAG v5 Curation*)
4. **Layer 4 — Zero-Daemon Rust/Zig & Playwright AX Verification Engine (`tools/audit/`):**
   - Every code or UI change must pass deterministic, sub-second gates before reaching the human CTO:
     - **Oxc Rust Linter (`oxlint v1.89.0`):** Zero-daemon AST & syntax verification in `<250ms`.
     - **ODiff SIMD (`odiff-bin` Zig):** SIMD-accelerated multi-viewport visual regression (`1440p`, `768p`, `390p`) with anti-aliasing resilience and automatic `pixelmatch` fallback.
     - **Playwright Accessibility-Tree Snapshot (`a11y_tree_snapshot.mjs`):** Captures compact semantic role/landmark/control trees (`docs/audit_snapshots/ax_tree_snapshot.json`) using **90% fewer tokens** than full DOM dumps or repeated vision screenshots.
     - **RYUX v2.14.2 Design & Anti-Slop Gate (`ryux_design_gate.mjs`):** Audits OKLCH/DTCG tokens, Utopia `clamp()`, `tabular-nums`, View Transitions, `prefers-reduced-motion`, and zero placeholder slop.
5. **Layer 5 — Dual-Loop Re-Investment (`ISO/IEC 26550` Feedback Loop):**
   - Every reusable primitive or optimization discovered while building a client site is promoted back into `templates/astro-edge/`, `templates/vanilla-edge/`, and `tools/audit/`.

---

## 2. Newly Integrated 2026 Web Platform Capabilities (Last 6 Months)

| Technology / Standard | Purpose & Impact in the Software Factory | Where Wired |
| :--- | :--- | :--- |
| **`Speculation Rules API` (`<script type="speculationrules">`)** | Prerenders/prefetches internal links on `moderate` eagerness (200ms hover / pointerdown), delivering **near-0ms LCP** on page transitions. | `templates/astro-edge/src/layouts/BaseLayout.astro`, `templates/vanilla-edge/index.html` |
| **CSS `interpolate-size: allow-keywords`** | Baseline 2026 CSS property enabling smooth native height/width animations to `auto` / `max-content` without JS `scrollHeight` measurement. | `:root` in `design-tokens.css` & `site/css/style.css` |
| **CSS `text-wrap: balance` & `pretty`** | Balances multi-line headings (`h1–h4`) and prevents orphan words in body paragraphs (`p`) with zero JS. | `design-tokens.css` & `site/css/style.css` |
| **CSS `content-visibility: auto`** | Skips layout and paint of below-the-fold sections (`section + section`) until scrolled near viewport, improving initial render and INP by up to 50%. | `design-tokens.css` & `site/css/style.css` |
| **Extended Agentic SEO (`llms.txt` + `llms-full.txt` + `sitemap.xml`)** | Dual-tier Markdown maps for AI Answer Engines (Perplexity, ChatGPT, Claude) plus XML sitemap for Google/Bing. | Root, `templates/`, and `tools/build_dist.mjs` |
| **Playwright AX Snapshot (`a11y_tree_snapshot.mjs`)** | Compact semantic accessibility tree inspection (`node tools/factory.mjs snapshot`) inspired by `@playwright/mcp`. | `tools/audit/a11y_tree_snapshot.mjs` & `tools/factory.mjs` |

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SPLE_ISO26550_AND_SOFTWARE_FACTORIES_ARCHITECTURE_2026]] · [[CANON_ASTRO5_CLOUDFLARE_WORKERS_AND_MODERN_WEB_TEMPLATES_2026]] · [[CANON_MULTI_BRAND_DESIGN_SYSTEMS_DTCG_STYLE_DICTIONARY_AND_ARCHETYPES_2026]] · [[CANON_VISUAL_SOTA_HUNT_2026-10-24]] · #software_factory
