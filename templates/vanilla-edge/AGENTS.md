# AGENTS.md — {{PROJECT_NAME}} (`{{PROJECT_ID}}`)

> **Project:** {{PROJECT_NAME}} (`{{PROJECT_ARCHETYPE}}`)  
> **Managed By:** Web Software Factory (10-Squad Spec-Driven Architecture)  
> **Communication Rule:** Argentine Spanish with the CTO; English for code, commits, identifiers, and tests.

## 1. Product Context & Architecture
- **Stack:** `vanilla-edge` (Vanilla JS/CSS + Cloudflare Workers Static Assets).
- **Manifest:** `factory.project.json` defines all entrypoints, design tokens (`tokens/design.tokens.json`), and verification gates.
- **Spec-Driven Development (`spec-kit`):** Every feature starts with `node tools/factory.mjs spec "<Feature>" "<Brief>" --project {{PROJECT_ID}}` to generate `.specify/specs/<slug>/{spec.md,plan.md,tasks.md}` before writing implementation code.

## 2. Non-Negotiable Quality Gates
- Run `node tools/factory.mjs gate --project {{PROJECT_ID}}` before presenting any UI or backend change to the CTO.
- Strictly zero inline executable `<script>` blocks, zero `@ts-ignore`/`eslint-disable` suppressions, and 100% WCAG 2.2 AA semantic landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`).
