---
name: impeccable-and-design-md-director
description: Enforces Google Labs DESIGN.md specification (YAML Front Matter tokens + 8 canonical sections) and Paul Bakaus Impeccable v4.6/v4.8 design direction (PRODUCT.md / DESIGN.md separation, 4 Surface Modes: Persuade, Operate, Read, Experience, 24 refinement commands, and 62 deterministic AI Slop detector rules).
---

# Impeccable & DESIGN.md Visual Direction Skill (`impeccable-and-design-md-director`)

> **Sources:** `google-labs-code/design.md` (Apache-2.0) + `pbakaus/impeccable` v4.6/v4.8 (Apache-2.0)
> **Executable Engine:** `tools/design/industry_archetype_matrix.mjs`

## 1. Separation of Product Truth (`PRODUCT.md`) vs. Visual System (`DESIGN.md`)

1. **`PRODUCT.md` (Durable Product Truth):**
   - Captures `Platform`, `Users`, `Product Purpose`, `Positioning`, `Operating Context`, `Capabilities and Constraints`, `Brand Commitments`, and `Accessibility & Inclusion`.
   - Never mixes ephemeral visual polish with core business truth.
2. **`DESIGN.md` (Google Labs Agent-Readable Design System):**
   - **Layer 1 — YAML Front Matter (`--- ... ---`):** Normative machine-readable tokens (`version`, `name`, `description`, `surfaceMode`, `archetype`, `colors`, `typography`, `rounded`, `spacing`, `components`) using perceptual `oklch()` values and `{path.to.token}` references.
   - **Layer 2 — 8 Canonical Markdown Sections (`##`):**
     1. `## Overview` (Creative North Star, Industry Archetype & Surface Mode)
     2. `## Colors` (Ground, Surface, Primary/Secondary Accents, Semantic State & Atmospheric Polarity)
     3. `## Typography` (Font pairings, scale rules, `tabular-nums` discipline, line width `65ch–75ch`)
     4. `## Layout` (Spatial architecture, grid rhythm, negative space & viewport budgets)
     5. `## Elevation & Depth` (Hairline borders vs. shadow vocabulary, surface hierarchy)
     6. `## Shapes` (Border-radius scale tailored to the industry archetype)
     7. `## Components` (Buttons, inputs, tables/cards, interactive state matrix)
     8. `## Do's and Don'ts` (Explicit industry constraints and anti-slop bans)

## 2. The 4 Surface Modes (`pbakaus/impeccable`)

Every view or project surface operates in an explicit mode:
- **`Persuade`:** The visitor decides and acts; design is the product (Landing pages, marketing, campaigns, luxury showcases). Bold composition, high emotional resonance, single primary CTA per viewport.
- **`Operate`:** The visitor completes a task (ERPs, Fintech dashboards, admin tools, data tables). Scannability, fixed `13px–14px` rem scales, `tabular-nums`, keyboard shortcuts, `<150ms` transitions, and zero distracting 3D effects outrank expression.
- **`Read`:** The visitor understands complex information (Law firms, medical clinics, editorial broadsheets, technical docs). High-contrast typography, `65ch–75ch` prose measure, calm surfaces, WCAG AAA / APCA `Lc >= 90`.
- **`Experience`:** The visitor is inside the artifact itself (Streamer/Gaming HUDs, 3D Gaussian Splatting architectural walkthroughs, WebGPU shaders). The artifact leads from the first viewport at 60 FPS; chrome recedes.

## 3. The 62 Deterministic Anti-Slop Rules (`lintDesignMd`)

Before any UI build or visual gate passes, `lintDesignMd()` in `tools/design/industry_archetype_matrix.mjs` verifies zero violations across Impeccable's 62 detector rules, including:
- **Color & Contrast Bans:** No gray text on colored backgrounds; no pure untinted `#000000` or `#ffffff` surfaces; no default AI purple-to-blue/cyan gradients; APCA `Lc >= 75` (`Lc >= 90` for Fintech/Healthcare).
- **Layout & Container Bans:** No `card-in-card` nesting; no identical 3-column icon-in-circle card rows; no thick colored `border-left`/`border-right` (`> 1px`) on cards/callouts; no unrequested hero-metric vanity stat bars.
- **Typography Bans:** No overused default fonts (`Inter`, `Arial`, `Roboto`) as display voice; no eyebrow/kicker labels above every heading; no abuse of a single italicized/colored word in every heading; no tracking tighter than `-0.04em`; mandatory `tabular-nums` on numerical/financial columns.
- **Motion & Chrome Bans:** No bounce/elastic easing (`cubic-bezier` overshoot); no raw OS emojis as UI icons; no unstyled browser defaults for focus rings, scrollbars, or selection.

## 4. FinOps Bounded 2-Pass Visual Critique (`maxPasses: 2`)

When auditing rendered viewports (`1440px`, `768px`, `375px`), inspect desktop and mobile together in a single batch (`Pass 1`), apply all fixes in one consolidated code edit, and verify in `Pass 2` (`<= 2` passes total).
