---
name: css-scroll-driven
description: Native CSS Scroll-Driven Animations (`animation-timeline: scroll()` and `view()`) patterns from hunt-2026-10/css-scroll-driven running at 60/120fps on the compositor thread.
vault_path: C:\Users\tomas\Desktop\streamerbot\references\hunt-2026-10\css-scroll-driven
---

# CSS Scroll-Driven Animations — Compositor-Thread Choreography

> **Zero-Copy Vault Source:** `C:\Users\tomas\Desktop\streamerbot\references\hunt-2026-10\css-scroll-driven`

## Core Patterns
1. **Reading Progress Timeline:** Use `animation-timeline: scroll(root block)` with `transform: scaleX()` (`transform-origin: 0% 50%`) for zero-JS scroll progress bars.
2. **Viewport Reveal Timeline:** Use `animation-timeline: view()` with `animation-range: entry 10% cover 28%` and `@supports (animation-timeline: view())` progressive enhancement.
3. **Zero Main-Thread Blocking:** Animate strictly `transform` and `opacity` (never `top`, `left`, `width`, `height`).
