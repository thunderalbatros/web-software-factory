# AGENTS.md — Web Software Factory Studio (Multi-Project ISO/IEC 26550)

> **Studio:** Independent Multi-Project Web Software Factory (`web-software-factory`)
> **Communication Rule:** Argentine Spanish with the user; English for code, commits, identifiers, and tests.

## 1. Context & Architecture
- **Role:** Domain Engineering Studio (`ISO/IEC 26550`) that scaffolds, specifies (`spec-kit`), builds, and audits high-converting websites (`templates/astro-edge` & `templates/vanilla-edge`) inside `projects/<slug>` or external client repositories.
- **Hardware & FinOps:** Lightweight Node.js + Cloudflare Workers Static Assets + D1/SQLite, zero Docker, surgical file reads (`StartLine`/`EndLine` <= 160 lines), query `Omni-RAG v5` (`hunthub-omni-rag`) first.
- **Fact Tagging:** `[VERIFICADO: source, date]` for verified facts; `[ASUNCIÓN]` for unverified claims.

## 2. Core CLI Commands (`tools/factory.mjs`)
- `node tools/factory.mjs status` (or `list`) — Studio and active project status.
- `node tools/factory.mjs styles` — List all 67 MIT design style skills (`awesome-design-skills`).
- `node tools/factory.mjs new <slug> --stack astro-edge|vanilla-edge --archetype saas-b2b|ecommerce|marketing|portfolio --style <style>` — Scaffold a new website in `projects/<slug>`.
- `node tools/factory.mjs spec "<Title>" "<Desc>" --project <slug>` — Generate `spec-kit` artifacts (`.specify/`).
- `node tools/factory.mjs snapshot [--project <slug>]` — Capture compact Playwright Accessibility-Tree (`AX`) snapshot (`-90% tokens`).
- `node tools/factory.mjs build --project <slug>` — Build and minify production `dist/`.
- `node tools/factory.mjs gate --project <slug>` — Run the 5-Gate QA pipeline.
- `node tools/factory.mjs visual-gate --project <slug>` (or `audit`) — Run RYUX v2.14.2 + Cognitive UX + Security/Motion + Diff-UI/Oxc gate.
