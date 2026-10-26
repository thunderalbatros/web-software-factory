# STATE PACKET — Web Software Factory Studio (v2.2.0 SOTA 2026)
> **Updated:** 2026-10-25 | **Eval Matrix:** `100.0 / 100.0 [S+ Elite]` | **RAG:** `Omni-RAG v5.2` (`17,750` chunks, `100% Hit@5`, Inverted Index + LRU) | **MCP:** `3 Servers (6 Studio Tools + Context7 + Playwright)`

## 1. Studio Stack, MCP Ecosystem & CLI Commands
- **Master CLI (`tools/factory.mjs`):** `node tools/factory.mjs [status|list|styles|tokens|harvest|new|init|spec|snapshot|build|gate|visual-gate|audit|evolve|extract-studio]`
- **MCP Servers (`.mcp.json`):**
  1. `web-factory-omni-rag` (`tools/intelligence/mcp_omni_rag_server.mjs` v5.2 — 6 tools: `omni_rag_query`, `code_graph_query`, `omni_rag_stats`, `factory_style_catalog`, `factory_compile_tokens`, `factory_run_audit`).
  2. `context7` (`@upstash/context7-mcp` — live version-exact docs for Astro 5, Cloudflare, CSS Baseline).
  3. `playwright` (`@playwright/mcp` — headless browser automation & Accessibility-Tree inspection).
- **Agent Team (`9+1` Roles + `SKILL_INDEX.json` Progressive Disclosure):** `orchestrator`, `product-spec-architect`, `tech-scout`, `ux-designer`, `copywriting-cro-strategist`, `seo-aeo-geo-architect`, `senior-coder`, `edge-fullstack-architect`, `security-engineer`, `qa-auditor` (`.agents/agency/ORGANIZATION.md` & `.agents/skills/SKILL_INDEX.json`).
- **W3C DTCG `2025.10` Design Engine, LightningCSS & Production Templates:**
  - `tools/design/token_compiler.mjs` (`npm run factory:tokens` — compiles `tokens/design.tokens.json` W3C DTCG `2025.10` + OKLCH `90/8/2` + 67 MIT styles + 4 archetypes into `design-tokens.css`).
  - `tools/design/build_vanilla_primitives.mjs` (`npm run factory:harvest` — compiles `ui-primitives.css` with Bento 12-Col, 3D Tilt, Conic Spotlight, Holo Glare, Spring Press, Scroll-Driven Reveals).
  - `tools/build_dist.mjs` (Rust `LightningCSS` CSS compiler/minifier + `esbuild` + source maps).
  - `templates/vanilla-edge/` & `templates/astro-edge/` (Full production starters: Sticky Glass Header, High-Converting Hero, 12-Col Bento Grid, CRO Pricing Grid, Exclusive `<details name="faq-group">` Accordion, `<dialog class="dialog-modal">` with `@starting-style`, JSON-LD `@graph`, `Speculation Rules API`).
- **6-Stage Self-Evolving Sweep (`npm run factory:sweep`):**
  - `factory_sweep.mjs` (`ALL 6 STAGES PASSED`), `visual_regression.mjs` (`odiff-simd` `0.000% pixel diff` across 12 universal component snapshots), `a11y_tree_snapshot.mjs` (`8 landmarks, 9 headings, 8 controls`), `eval_matrix.mjs` (`100.0 / 100.0 [S+ Elite]`), `constitution_guard.mjs` (`SHA-256 OK`).
