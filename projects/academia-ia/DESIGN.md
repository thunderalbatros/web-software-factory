---
version: "2026.10"
name: "Academia Libre (Open AI Academy & Explorable Editorial Education)"
description: "Calm Explorable Editorial & Inclusive Pedagogical Clarity — Mode: Read"
archetype: "academic-editorial-education"
surfaceMode: "Read"
allows3dEffects: false
apcaContrastFloor: 85
readingMeasureCh: "65ch"
chromaticProportion: "90-8-2-oklch"
brandDnaVector:
  gridTopology: "swiss-asymmetric-editorial"
  heroArchitecture: "numbered-editorial-index-hero"
  navVariant: "minimal-editorial-header"
  cornerGeometry: "6px-tecnico"
  surfaceMaterial: "paper-editorial"
  gamutMaskType: "atmospheric-analogous"
  fontPairingProfile: "editorial-broadsheet-newsreader-jakarta"
  scrollChoreography: "native-view-transitions-morph"
  morphologicalDivergenceScore: 0.88
  aestheticHarmonyScore: 0.94
colors:
  primary: "oklch(34% 0.13 245)"
  secondary: "oklch(42% 0.04 250)"
  tertiary: "oklch(42% 0.14 245)"
  level-acquire: "oklch(42% 0.13 162)"
  level-deepen: "oklch(42% 0.14 245)"
  level-create: "oklch(41% 0.14 38)"
  surface: "oklch(98.5% 0.004 250)"
  surface-raised: "oklch(96.2% 0.007 250)"
  surface-deep: "oklch(93.5% 0.012 250)"
  text-primary: "oklch(18% 0.015 250)"
  text-secondary: "oklch(35% 0.016 250)"
  border-hairline: "oklch(22% 0.015 250 / 0.14)"
  success: "oklch(44% 0.13 155)"
  warning: "oklch(52% 0.14 68)"
  danger: "oklch(48% 0.17 26)"
typography:
  display:
    fontFamily: "'Newsreader', 'Instrument Serif', Georgia, serif"
    fontSize: "clamp(2.15rem, 3.6vw, 3.25rem)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  h1:
    fontFamily: "'Newsreader', 'Instrument Serif', Georgia, serif"
    fontSize: "clamp(1.95rem, 3.1vw, 2.75rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.018em"
  h2:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.35rem, 2.1vw, 1.85rem)"
    fontWeight: 600
    lineHeight: 1.24
    letterSpacing: "-0.012em"
  h3:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.125rem, 1.5vw, 1.35rem)"
    fontWeight: 600
    lineHeight: 1.32
    letterSpacing: "-0.008em"
  body:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.03rem, 0.98rem + 0.25vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.72
    letterSpacing: "0em"
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0em"
    fontFeature: "'tnum' 1"
rounded:
  none: "0px"
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "12px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "40px"
  xl: "64px"
  2xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "12px 20px"
  button-secondary:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    padding: "12px 20px"
  card-surface:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "24px"
  input-control:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.xs}"
    padding: "12px 16px"
---

# DESIGN.md — Academia Libre

## Overview

- **Industry Archetype:** `academic-editorial-education` (Open AI Academy & Explorable Editorial Education)
- **Creative North Star:** Calm Explorable Editorial & Inclusive Pedagogical Clarity
- **Impeccable Surface Mode:** `Read` (Secondary: `Operate` for client-side micro-explorables)
- **Atmospheric Polarity:** `dual-theme-daylight-paper-and-calm-slate` (Accessible Light & Dark Mode with WCAG 2.2 AA+ and APCA `Lc >= 85`)
- **Spatial & 3D Restraint:** `allows3dEffects: false` — Zero distracting 3D shaders, zero PBR filler, and zero background audio loops in `Read` mode.
- **Pedagogical Readability Contract:** Neutral international Spanish (`tú`), paragraphs `<= 110` words, and verified `readability_es.mjs` INFLESZ floors across all 3 levels.

## Colors

All colors are authored in perceptual **W3C DTCG 2025.10 OKLCH 90/8/2** space (90% calm reading ground, 8% hairline structure, 2% semantic focal accents) with APCA contrast `Lc >= 85`.

- **Surface Ground (`{colors.surface}` / `{colors.surface-raised}`):** Warm daylight paper (`oklch(98.5% 0.004 250)`) and calm night slate (`oklch(16% 0.012 250)`) — never glaring `#ffffff` or untinted `#000000`.
- **3 Semantic Level Accents:**
  - **Level 1 — Principiante / Adquirir (`{colors.level-acquire}`):** Emerald-sage clarity (`H: 162`).
  - **Level 2 — Intermedio / Profundizar (`{colors.level-deepen}`):** Editorial sapphire (`H: 245`).
  - **Level 3 — Avanzado / Crear (`{colors.level-create}`):** Warm terracotta-ochre (`H: 38`).
- **Text Hierarchy (`{colors.text-primary}` / `{colors.text-secondary}`):** Hue-tinted editorial ink with themed `::selection` and visible `:focus-visible` rings.
- **Semantic Status (`{colors.success}`, `{colors.warning}`, `{colors.danger}`):** Paired with explicit text labels (never color alone).

## Typography

- **Fluid Scale (`clamp()`):** Utopia fluid typographic scale tuned for calm long-form study across `375px`, `768px`, and `1440px`.
- **Clean Heading Hierarchy (`h1 -> h2 -> h3`):** Editorial display `{typography.h1}` ('Newsreader', 'Instrument Serif', Georgia, serif), section `{typography.h2}`, and subsection `{typography.h3}` with zero skipped heading levels.
- **Reading Measure (`60ch–70ch`):** Instructional prose is strictly constrained to `max-width: 65ch` (`60ch` to `70ch`) with comfortable `line-height: 1.72`.
- **Quantitative & Token Precision (`{typography.mono}`):** Mandatory `font-variant-numeric: tabular-nums` (`tnum`) on token counters, video timestamps (`MM:SS`), and mastery metrics.

## Layout

- **Editorial Reading Column (`gridTopology: swiss-asymmetric-editorial`):** Centered single-column reading flow (`65ch`) with generous vertical rhythm (`{spacing.xl}` / `{spacing.2xl}`) and `>= 35%` open whitespace.
- **Multi-Viewport Ergonomics:** Zero horizontal overflow across `1440px`, `768px`, and `375px`; interactive touch targets `>= 48x48px` (`>= 44x44px` minimum) with `8px` separation.
- **Zero SaaS Clutter:** No `#pricing` tables, no promotional popups, and no multi-column card soup competing with lesson comprehension.

## Elevation & Depth

- **Paper-Editorial Hierarchy:** Surfaces separate via subtle OKLCH luminance steps (`{colors.surface}` -> `{colors.surface-raised}`) and `1px solid` hairline borders (`{colors.border-hairline}`) — zero drop-shadow halos or ghost cards.
- **Calm Native Transitions:** Discrete `@view-transition` navigation (`160ms cubic-bezier(0.22, 1, 0.36, 1)`), `@starting-style` disclosures, and strict `@media (prefers-reduced-motion: reduce)` zero-motion compliance.

## Shapes

- **Restrained Editorial Radii:** `none: 0px`, `xs: 4px`, `sm: 6px`, `md: 8px`, `lg: 12px` — crisp scholarly geometry without `999px` container pills.

## Components

- **Multi-Video Privacy Facade:** `lite-youtube-embed` (`youtube-nocookie.com`) + Wikimedia/Internet Archive OER player with explicit local-storage notice before third-party iframe activation and 3-bullet text synthesis.
- **Token Explorer Micro-Lab:** Client-side `js-tiktoken` interactive counter with `tabular-nums` live feedback and zero server calls.
- **Isolated Socratic Tutor Shell:** Sanitized via `DOMPurify` (`RETURN_TRUSTED_TYPE: true`) and isolated inside `<iframe sandbox="allow-scripts">` (without `allow-same-origin`) over `Valibot`-validated `postMessage`.
- **Overlays & Disclosures:** Native HTML5 `<details>` and `<dialog>` elements with full keyboard accessibility.

## Do's and Don'ts

### Do
- Constrain lesson reading measure strictly between 60ch and 70ch (canonical 65ch) with >= 1.65 line-height and clean h1 -> h2 -> h3 hierarchy.
- Apply OKLCH 90/8/2 chromatic restraint with 3 semantic level accents (Acquire/Principiante, Deepen/Intermedio, Create/Avanzado) verified in both light and dark themes.
- Pair privacy-preserving video facades (youtube-nocookie.com / OER) with a clear local-storage notice and accessible text synthesis.
- Honor prefers-reduced-motion: reduce, tabular-nums for token/metric counters, and WCAG 2.2 AA+ (APCA Lc >= 85).

### Do Not
- Never include SaaS pricing tables (#pricing), hidden paywalls, streaks, countdown timers, or public leaderboards.
- Never inject 3D WebGPU shaders, PBR filler, unmuted autoplay media, or layout-thrashing animations in Read mode.
- Never exceed 110 words per instructional paragraph or violate neutral international Spanish (tú) readability floors.
- Never violate any of the **62 deterministic Anti-Slop rules** of `pbakaus/impeccable`.
