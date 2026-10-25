# STATE PACKET — Web Software Factory Studio
> **Updated:** 2026-10-25 | **RAG:** `Omni-RAG v5` (`25,142` chunks) | **Team:** `9 Specialized Roles` | **Styles:** `67 MIT Styles`

## 1. Studio Stack & Commands
- **Master CLI:** `node tools/factory.mjs [status|list|styles|new|init|spec|snapshot|build|gate|visual-gate|audit|extract-studio]`
- **Agent Team (9 Roles):** `orchestrator`, `product-spec-architect`, `tech-scout`, `ux-designer`, `copywriting-cro-strategist`, `seo-aeo-geo-architect`, `senior-coder`, `edge-fullstack-architect`, `security-engineer` + `qa-auditor` (`.agents/agency/ORGANIZATION.md`).
- **Templates:** `templates/astro-edge/` (Astro 5 + Cloudflare Workers Static Assets + Speculation Rules + CSS Baseline 2026) & `templates/vanilla-edge/` (Zero-build Edge SPA/MPA).
- **Design & Visual QA:** W3C DTCG `2025.10` OKLCH tokens, `RYUX v2.14.2` (`tools/audit/ryux_design_gate.mjs`), `odiff-bin` SIMD (`tools/audit/visual_regression.mjs`), `a11y_tree_snapshot.mjs` (`-90% tokens`), `oxlint` Rust linter (`tools/audit/diff_ui_adversarial.mjs`).
