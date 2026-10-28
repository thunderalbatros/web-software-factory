---
name: 21st-ui
description: "Find, inspect, adapt and integrate high-end modern UI components, design tokens, micro-interactions, shaders, bento blocks, and."
---

# 21st.dev Design Engineering Skill (WebFactory Suite)

`21st.dev` (by Serafim Kovalchuk / 21st Labs) is the premier open-source marketplace and registry of 10,000+ modern design-engineered UI components, blocks, micro-interactions, and animations (Magic UI, Aceternity, Cult UI, Radix primitives, Tailwind CSS).

## 1. Capabilities & Tools
When 21st MCP or CLI is active, the agent has access to:
- `search(query, tags, sort)`: Search 10,000+ components (e.g. "bento grid", "shiny button", "border beam", "neon glow card", "number ticker").
- `get_component(id)`: Fetch production-ready code, CSS tokens, and dependencies.
- `get_inspiration(category)`: Retrieve curated design patterns and visual references.
- `search_logo(brand)`: Get pixel-perfect SVG brand logos as ready-to-paste components.

## 2. Zero-Bloat Adaptation Workflow (`ui-component-harvester` Law)
Web Software Factory runs with ultra-fast Edge performance (`<50MB` dist, `60 FPS` compositor budget) without heavy client-side React runtime overhead:
1. **Search & Retrieve**: Find the component on `21st.dev` or in the Local Vault (`magicui`, `motion-primitives`, `react-bits`, `kokonutui`).
2. **Translate via `ui-component-harvester` (Zero React Bloat)**:
   - Strip `framer-motion`, `@radix-ui/*`, and Tailwind utility chains.
   - Convert to semantic HTML5 (`<dialog>`, `<details>`, `<section>`) + W3C DTCG OKLCH tokens (`var(--surface-canvas)`, `var(--surface-elevated)`, `var(--text-primary)`, `var(--accent-primary)`) + Utopia fluid `clamp()` scales (`var(--step-0)` to `var(--step-5)`).
   - Replace JS scroll/spring loops with `motion-engine.css` (`animation-timeline: view()`, `linear()` springs, `@starting-style`) for 0% main-thread blocking.
3. **Verify across 3 Viewports**:
   - Ensure APCA contrast floor (`Lc >= 75` body, `Lc >= 60` headings) and test in `1440px`, `768px`, and `375px` viewports via `node tools/audit/visual_audit.mjs`.

## 3. High-Value 21st.dev Components for Casino Streaming Suites
- **Border Beam / Electric Border**: Glowing animated border traveling around cards (used in Battle Corner & King of the Hill).
- **Number Ticker / Animated Counter**: Smooth 60 FPS count-up transitions for financial payouts and multipliers.
- **Shiny / Shimmer Button**: Pulsing high-conversion buttons for CTA actions (e.g. "!battle", "Cashout", "Spin Wheel").
- **Holographic Glare Card**: Mouse-following 3D perspective glare for slot cards and champion podiums.
- **Bento Grid**: Asymmetric, high-density modular dashboards for KPIs and admin controls.
- **Confetti / Particle Blast**: Lightweight canvas celebrations for big wins and jackpot drops.
