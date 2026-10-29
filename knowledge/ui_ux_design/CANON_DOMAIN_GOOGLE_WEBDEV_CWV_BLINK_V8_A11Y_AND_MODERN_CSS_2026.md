---
title: "CANON DOMAIN MASTERY: Rendimiento Chromium Blink/V8, Accesibilidad y CSS Moderno (Google web.dev/learn) (2026)"
category: "ui_ux_design"
epistemicTier: "TIER_1_SOTA_2026"
authorityBoost: 1.35
courseId: "google-web-dev-learn-perf-a11y-css"
linkedHarnessModule: "tools/audit/ryux_design_gate.mjs"
---

# CANON DOMAIN MASTERY: Rendimiento Chromium Blink/V8, Accesibilidad y CSS Moderno (Google web.dev/learn)

> **Institución / Fuente:** Google Chrome Developers (web.dev/learn)  
> **URLs Oficiales:** `https://web.dev/learn/performance` • `https://web.dev/learn/accessibility` • `https://web.dev/learn/css`  
> **Epistemic Tier:** `TIER_1_SOTA_2026` (`Authority Boost: x1.35`)  
> **Alcance:** LCP < 1.2s, INP < 50ms, CLS = 0.00, Chromium Blink Compositor Thread (transform & opacity), Playwright Accessibility Tree (AX Tree) & WCAG 2.2 / APCA, Modern Baseline CSS (OKLCH, clamp(), @starting-style, Subgrid)  
> **Módulo del Harness Acoplado:** `tools/audit/ryux_design_gate.mjs`

---

## 1. Tópicos Nucleares Cosechados

- **LCP < 1.2s, INP < 50ms, CLS = 0.00**
- **Chromium Blink Compositor Thread (transform & opacity)**
- **Playwright Accessibility Tree (AX Tree) & WCAG 2.2 / APCA**
- **Modern Baseline CSS (OKLCH, clamp(), @starting-style, Subgrid)**

---

## 2. Reglas Arquitectónicas Deterministas (SOTA 2026)

1. Guarantee `LCP < 1.2s` (`fetchpriority="high"` on hero asset, zero render-blocking scripts), `INP < 50ms` (yield long tasks > 50ms via `scheduler.yield()`), and `CLS = 0.00` (explicit `width`/`height` or `aspect-ratio` on all media).
2. Animate exclusively on the Chromium Blink GPU compositor thread (`transform`, `opacity`, `filter`) and never query layout geometry (`offsetWidth`, `getBoundingClientRect`) inside `requestAnimationFrame`.
3. Enforce semantic landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`), visible `:focus-visible` rings, `>= 48x48px` touch targets, and APCA `Lc >= 60/75/90` contrast.

---

## 3. Patrón de Producción Verificado

```
/* Google web.dev/learn Zero-CLS, GPU Compositor & Utopia Fluid Ergonomics */
.hero-media { aspect-ratio: 16 / 9; width: 100%; height: auto; content-visibility: auto; }
.interactive-card { will-change: transform, opacity; transition: transform 180ms cubic-bezier(0.22, 1, 0.36, 1); }
```
