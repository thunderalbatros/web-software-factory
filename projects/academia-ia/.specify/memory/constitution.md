# Project Constitution — Academia Ia (`academia-ia`)

- **Archetype:** `education` | **Stack:** `astro-edge` | **Compliance:** `education`
- **Atomic Discipline:** Changes must be modular (<= 300 lines per step), test-first, and verified by the 5-Gate Pre-HITL pipeline.
- **Design System:** W3C DTCG 2025.10 tokens (`tokens/design.tokens.json`), OKLCH 90/8/2 chromatic budget, Utopia `clamp()`, and `@starting-style` motion.
- **Security & Performance:** Strict CSP (0 inline executable scripts), 0 `@ts-ignore`/`eslint-disable` suppressions, Core Web Vitals (LCP < 1.8s, INP < 100ms, CLS < 0.05).
