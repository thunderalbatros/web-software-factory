---
name: baseline-ui
description: Enforces 2026 CSS Baseline UI primitives, perceptual OKLCH tokens, APCA contrast, View Transitions API, CSS Scroll-Driven Animations, @starting-style discrete transitions, and zero-CLS layout ergonomics. Distilled from references/sota-expansion/design-intelligence/ui-skills.
---

# Baseline UI — 2026 Web Platform & Craft Standards

## 1. Native CSS Baseline 2026 Primitives (Zero Heavy JS Frameworks)
- **Discrete Entry/Exit Animations:** Use `@starting-style` + `transition-behavior: allow-discrete` on `<dialog>` and `[popover]` elements instead of JS mount/unmount timers.
- **Intrinsic Size Transitions:** Enable `interpolate-size: allow-keywords` on `:root` to smoothly animate `height: auto` accordions and drawers at 60 FPS.
- **Cross-Document & SPA View Transitions:** Declare `@view-transition { navigation: auto; }` in CSS and wrap DOM state updates in `document.startViewTransition()` with fallback.
- **Off-Main-Thread Scroll Choreography:** Use `animation-timeline: view()` and `animation-range: entry 0% cover 20%` guarded by `@supports (animation-timeline: view())` and `@media (prefers-reduced-motion: no-preference)`.
- **Below-the-Fold Rendering Budget:** Apply `content-visibility: auto; contain-intrinsic-size: auto 500px;` to below-the-fold sections for sub-1.8s LCP.

## 2. Structural & Ergonomic Rules
- **Touch Target Floor (Fitts's Law):** All interactive controls (`button`, `a[href]`, `input`, `[data-cta]`) must have a minimum hit area of `44x44px`.
- **Landmark Hierarchy:** Every page must expose `<header>`, `<nav>`, `<main id="main-content">`, and `<footer>` with explicit `aria-label` attributes (`>= 5` per view) so `node tools/factory.mjs snapshot` captures a clean Accessibility Tree.
