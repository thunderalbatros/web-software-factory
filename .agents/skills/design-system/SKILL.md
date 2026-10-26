---
name: design-system
description: Multi-brand W3C DTCG 2025.10 design token system, OKLCH 90/8/2 perceptual color scales, APCA contrast floors, Utopia fluid typography, and 67 on-demand MIT design style guides.
---

# Web Software Factory — Universal Design System (`W3C DTCG 2025.10` + `OKLCH`)

## 1. Perceptual Color Architecture (`OKLCH` 90/8/2 Budget)
- **90% Neutral Surface Hierarchy (De-Boxed Luminance Steps):**
  - `--surface-canvas`: `oklch(13.2% 0.016 258)` (Base viewport canvas)
  - `--surface-elevated`: `oklch(19.0% 0.018 260)` (Bento cards, primary sections — separated by luminance, not heavy borders)
  - `--surface-glass`: `oklch(22.0% 0.020 260 / 0.72)` with `backdrop-filter: blur(12px)`
- **8% Secondary Interactive Accents:**
  - `--brand-accent`: `oklch(74.0% 0.170 160)` (Active states, badges, interactive indicators)
- **2% Focal Conversion CTA:**
  - `--brand-cta`: `oklch(82.0% 0.180 85)` (Reserved strictly for the primary conversion trigger `[data-cta="primary"]`)
- **APCA Perceptual Contrast Floors (`CONSTRAINTS.md`):**
  - Primary/body copy: `Lc >= 75`
  - Secondary UI controls and metadata: `Lc >= 60`

## 2. Utopia Fluid Typography & Ergonomics
- Use `clamp()` fluid scales (`--step--1` through `--step-4`) for native 100% zoom fit across `1920x1080`, `1440x900`, `768x1024`, and `390x844` with `0px` horizontal scroll.
- Enforce `font-variant-numeric: tabular-nums` (`tabular-nums`) on all dynamic counters, pricing tables, and KPIs to guarantee `CLS = 0.000`.
- Enforce `text-wrap: balance` on headings (`h1`–`h4`) and `text-wrap: pretty` on body copy.

## 3. Progressive Disclosure of the 67 MIT Design Styles
- Run `node tools/factory.mjs styles` to inspect all 67 curated style systems (`bento`, `linear`, `stripe`, `swiss`, `editorial`, `glassmorphism`, `brutalist`, etc.).
- Bind only the chosen style into `.specify/memory/style-guide.md` via `--style <name>` to preserve context budget.
