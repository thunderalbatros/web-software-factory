# CONSTRAINTS.md — {{PROJECT_NAME}} Quality Contract

## Numeric & Architectural Floors (Immutable)
1. **Performance & Bundle Budget:** `dist/` payload `<= 50.0 MB`, `LCP < 1.8s`, `INP < 100ms`, `CLS < 0.05`.
2. **Design System:** W3C DTCG 2025.10 tokens (`tokens/design.tokens.json`), OKLCH 90/8/2 chromatic hierarchy, Utopia fluid `clamp()`, and `@starting-style` transitions.
3. **Security & CSP:** Zero inline executable `<script>` tags, zero `eval()`, strict `Content-Security-Policy` and `Strict-Transport-Security` in `dist/_headers`.
4. **Agentic SEO (AEO):** 100/100 score (`robots.txt`, `llms.txt`, `AGENTS.md`, `Schema.org JSON-LD`, and semantic meta description).
