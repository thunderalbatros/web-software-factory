# Rule: Code Style & Web Software Factory Architecture

1. **Spec-Driven Discipline:** Every project in `projects/<slug>` is governed by `factory.project.json` and `.specify/` (`CONSTITUTION.md` -> `SPEC.md` -> `PLAN.md` -> `TASKS.md`).
2. **Modularity & Atomic Commits:** Keep changes atomic (`<= 300 lines` per edit) and isolate pure domain logic from DOM and network I/O.
3. **2026 Web Platform First:** Prefer native browser capabilities (`View Transitions API`, `Speculation Rules API`, `CSS Scroll-Driven Animations`, `interpolate-size: allow-keywords`, `text-wrap: balance/pretty`, `content-visibility: auto`, `OKLCH` tokens, `Utopia clamp()`) over heavy runtime JS frameworks.
4. **Hardware Efficiency (HP 250 G8 Friendly):** Zero Docker, zero heavy background daemons, composite-only GPU animations (`60 FPS` / `<= 16.6ms` frame budget), and surgical file reads (`StartLine`/`EndLine` `<= 160` lines).
5. **Verification Before Claim:** Always pass `node tools/factory.mjs visual-gate --project <slug>` before presenting UI work to the CTO.
