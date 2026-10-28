---
name: ui-component-harvester
description: "Zero-Bloat UI Component Harvester & Translator: extracts visual geometry, optical hierarchy, and motion choreography from 21st.dev, MagicUI, Aceternity, and motion-primitives, and compiles them into pure semantic HTML5 + W3C DTCG OKLCH CSS + 60-FPS compositor animations without injecting heavy React runtime dependencies."
---

# UI Component Harvester (`21st.dev` & Local Vault Zero-Bloat Translator)

When building or upgrading interfaces for `templates/vanilla-edge` or `templates/astro-edge`, `ux-designer` and `senior-coder` (`motion-engineer`) may harvest structural geometry, micro-interactions, and visual patterns from `21st.dev` or the local SOTA vault (`magicui`, `motion-primitives`, `react-bits`, `kokonutui`), subject to the **Zero-Bloat Translation Law**.

## 1. The Zero-Bloat Translation Law (Non-Negotiable)
1. **No Heavy React Runtime Injection in Edge Templates:**
   - Never add `framer-motion`, `@radix-ui/*`, `lucide-react`, `clsx`, or `tailwind-merge` to `package.json` when targeting `templates/vanilla-edge` or static islands in `templates/astro-edge`.
   - Every harvested component must compile down to **Semantic HTML5 + W3C DTCG OKLCH CSS (`design-tokens.css`) + GPU Compositor Motion (`motion-engine.css`)**.
2. **Primitive Mapping Table (`React/Tailwind -> WebFactory Native`):**
   - `framer-motion` `<motion.div layout>` $\rightarrow$ CSS `@starting-style`, `linear()` spring physics, or View Transitions API (`document.startViewTransition`).
   - `framer-motion` `useScroll` / `useTransform` $\rightarrow$ Native CSS Scroll-Driven Animations (`animation-timeline: view()` / `scroll()`).
   - `@radix-ui/react-dialog` / `Popover` $\rightarrow$ Native HTML5 `<dialog>` (`showModal()`) + Popover API (`popover="auto"`).
   - `@radix-ui/react-accordion` $\rightarrow$ Native HTML5 `<details name="group">` + `<summary>`.
   - Tailwind arbitrary colors (`bg-zinc-900/80`) $\rightarrow$ Perceptual OKLCH surface tokens (`var(--surface-elevated)`, `var(--surface-glass)`).
   - Tailwind fixed typography (`text-4xl md:text-6xl`) $\rightarrow$ Utopia fluid `clamp()` steps (`var(--step-4)`).
3. **60-FPS Compositor Budget & Reduced Motion:**
   - Only animate `transform`, `opacity`, or `filter` on the compositor thread.
   - Always include `@media (prefers-reduced-motion: reduce)` and `.js-ready` progressive enhancement guards.
