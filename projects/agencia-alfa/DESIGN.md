---
version: "2026.10"
name: "Agencia Alfa (B2B SaaS Platform, Developer Infrastructure & AI Workflow Engine)"
description: "Architectural Bento & Live Interactive Proof — Mode: Persuade"
archetype: "b2b-saas-platform"
surfaceMode: "Persuade"
allows3dEffects: true
apcaContrastFloor: 85
cameraFov: "Telephoto Product Stage (FOV 32°) + AgX Tone Mapping"
brandDnaVector:
  gridTopology: "golden-ratio-bento-matrix"
  heroArchitecture: "live-interactive-product-sandbox"
  navVariant: "floating-island-bar"
  cornerGeometry: "6px-tecnico"
  surfaceMaterial: "deep-obsidian-specular"
  gamutMaskType: "atmospheric-analogous"
  fontPairingProfile: "swiss-precision-geist-jetbrains"
  transitionPhysics: "magnetic-precision-spring"
  scrollChoreography: "native-view-transitions-morph"
  morphologicalDivergenceScore: 0.88
  aestheticHarmonyScore: 0.94
pbrMaterial:
  metalness: 0
  roughness: 0.48
  ior: 1.46
springPhysics:
  zeta: 0.82
  duration: "280ms"
colors:
  primary: "oklch(65% 0.16 250)"
  secondary: "oklch(72% 0.12 190)"
  tertiary: "oklch(78% 0.15 82)"
  surface: "oklch(10% 0.01 255)"
  surface-raised: "oklch(14% 0.012 255)"
  surface-deep: "oklch(7% 0.008 255)"
  text-primary: "oklch(95% 0.006 255)"
  text-secondary: "oklch(74% 0.012 255)"
  border-hairline: "oklch(85% 0.015 255 / 0.14)"
  success: "oklch(68% 0.16 150)"
  warning: "oklch(76% 0.15 80)"
  danger: "oklch(62% 0.19 25)"
typography:
  display:
    fontFamily: "'Geist', 'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 4.6vw, 4.4rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  h1:
    fontFamily: "'Geist', 'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.5vw, 3.2rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  h2:
    fontFamily: "'Geist', 'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: "clamp(1.4rem, 2.4vw, 2.1rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  body:
    fontFamily: "'Geist', 'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0em"
  mono:
    fontFamily: "'Geist Mono', 'JetBrains Mono', monospace"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "0.02em"
    fontFeature: "'tnum' 1"
rounded:
  none: "0px"
  xs: "4px"
  sm: "6px"
  md: "10px"
  lg: "12px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "40px"
  xl: "64px"
  2xl: "104px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
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

# DESIGN.md — Agencia Alfa

## Overview

- **Industry Archetype:** `b2b-saas-platform` (B2B SaaS Platform, Developer Infrastructure & AI Workflow Engine)
- **Creative North Star:** Architectural Bento & Live Interactive Proof
- **Impeccable Surface Mode:** `Persuade` (Secondary: Persuade, Operate)
- **Atmospheric Polarity:** `crisp-technical-obsidian-or-paper`
- **Archetype Functional Invariants:** APCA Headline `Lc >= 90`, Body `Lc >= 78`, Hick's Law Nav Cap `<= 6`, Fitts Touch `>= 48px`, Acoustic Ceiling `<= -18 dBFS`.
- **Open Morphological Space:** `fixedVisualTemplateImposed: false` — Active Bespoke Grid `golden-ratio-bento-matrix`, Active Hero `live-interactive-product-sandbox`, Gamut Mask `atmospheric-analogous`.
- **3D & Camera Cinematography:** `allows3dEffects: true` — Lens: `Telephoto Product Stage (FOV 32°) + AgX Tone Mapping` (Zero distracting 3D effects in operational/editorial views)
- **Google Filament PBR Material:** `metalness: 0`, `roughness: 0.48`, `ior: 1.46` (Architectural Matte Polymer & Specular Hairline)

## Colors

All colors are authored in perceptual **W3C DTCG 2025.10 OKLCH** space to guarantee uniform lightness and APCA contrast (`Lc >= 85`, WCAG AA+).

- **Primary (`{colors.primary}`):** Core brand anchor and primary interactive driver (Itten Area Law focal accent).
- **Secondary (`{colors.secondary}`):** Supporting structural accent and secondary state signal.
- **Tertiary (`{colors.tertiary}`):** High-salience focal accent reserved for single primary conversion moments.
- **Surface Ground (`{colors.surface}`):** Tinted mineral/daylight ground (never untinted `#000000` or glaring `#ffffff`).
- **Gurney/Albers Thermal Rotation & Gamut Mask:** Cool sapphire-slate rotation (H: 255, C: 0.010) + Zenithal top-edge highlight (border-top: 1px solid oklch(1 0 0 / 0.10)) | Active Gamut Mask: `atmospheric-analogous`.
- **Inigo Quilez Procedural Cosine Palette (`color(t) = a + b * cos(2π(c*t + d))`):** `a=[0.18,0.24,0.36]`, `b=[0.24,0.3,0.44]`, `c=[0.75,0.75,0.85]`, `d=[0.05,0.18,0.38]`.
- **Text Hierarchy (`{colors.text-primary}` / `{colors.text-secondary}`):** Hue-tinted foregrounds; never gray text on colored backgrounds.
- **Semantic State (`{colors.success}`, `{colors.warning}`, `{colors.danger}`):** High-contrast status tokens paired with explicit icons/labels.

## Typography

- **Typographic Scale & Vertical Rhythm:** Utopia Fluid (1.333 Perfect Fourth) in Persuade | Fixed 13px-14px in Operate | Curated Pairing Profile: `swiss-precision-geist-jetbrains`.
- **Display & Headlines (`{typography.display}`, `{typography.h1}`, `{typography.h2}`):** 'Geist', 'Plus Jakarta Sans', system-ui, sans-serif with deliberate weight hierarchy and balanced wrapping (`text-wrap: balance`).
- **Body Measure (`{typography.body}`):** 'Geist', 'Plus Jakarta Sans', system-ui, sans-serif at `1rem` (line-height `1.65`), constrained to `65ch–75ch` (`60ch–68ch` in `Read` mode) for effortless scannability.
- **Edward Tufte Numeric Discipline (`{typography.mono}`):** Mandatory `font-variant-numeric: tabular-nums slashed-zero` (`tnum`, `zero`), right-aligned numeric cells, left-aligned text/IDs, and `16px` inline sparklines.
- **Anti-Slop Type Bans:** No generic `Inter`/`Arial` display defaults, no mandatory kicker/eyebrow above every heading, and no tracking tighter than `-0.04em`.

## Layout

- **Spatial Architecture (`gridTopology: golden-ratio-bento-matrix`):** Asymmetric 12-column CSS Grid & Subgrid with generous section spacing (`{spacing.xl}` to `{spacing.2xl}`) and `>= 35%` open canvas whitespace (`whitespaceRatio: 0.35..0.68`).
- **Hero First-Impact Architecture (`heroArchitecture: live-interactive-product-sandbox`):** Selected from the open morphological space to guarantee intra-category uniqueness.
- **Multi-Viewport Ergonomics:** Verified across `1440px` (Desktop), `768px` (Tablet), and `375px` (Mobile) with zero horizontal overflow.
- **Apple HIG / Material Design 3 / Hoober Thumb Zones:** Primary mobile navigation and CTAs placed in the bottom third thumb zone with minimum `48x48px` touch target area (`>= 8px` separation), `env(safe-area-inset-top/bottom)`, and `touch-action: manipulation`.

## Elevation & Depth

- **Single Elevation Declaration & Zenithal Specular Light:** Surfaces declare depth once via `1px solid` hairline borders (`{colors.border-hairline}`), subtle surface luminance shifts (`{colors.surface}` -> `{colors.surface-raised}`), and zenithal top-edge specular reflection (`border-top: 1px solid oklch(1 0 0 / 0.10)`).
- **Apple WWDC Fluid Spring Physics:** `zeta = 0.82` (`280ms`, `linear(0, 0.3566 9.6%, 0.7852 21.1%, 1.0156 32.2%, 1.0468 53.6%, 1)`) — Controlled spring in Persuade / Critically damped in Operate.
- **Zero Ghost Cards:** Never combine a 1px border with a wide soft drop-shadow, and never use zero-offset neon halos.

## Shapes

- **Corner Radius Scale:** `none: 0px`, `xs: 4px`, `sm: 6px`, `md: 10px`, `lg: 12px` (Concentric Law: $R_{outer} = R_{inner} + Padding$).
- **Industry Geometry:** Tailored to `b2b-saas-platform` — no `999px` pill radii on cards or containers.

## Components

- **Primary CTA (`button-primary`):** Uses `{colors.primary}` background with `{colors.surface}` text, `>= 48x48px` hit area, and `<150ms` exponential ease-out response.
- **Data & Content Containers (`card-surface`):** Flat or hairline-bounded containers; strictly **zero `card-in-card` nesting**.
- **Interactive State Matrix:** Every control implements all 7 states (`default`, `hover`, `focus-visible`, `active`, `disabled`, `loading skeleton`, `error`), honors `prefers-reduced-motion`, and themes `::selection` and scrollbars.
- **Overlays:** Built with native HTML5 `<dialog>` and Popover API to prevent container clipping.

## Brand DNA Vector & Bespoke Morphology

- **Axis 1 — Grid Topology (`gridTopology`):** `golden-ratio-bento-matrix`
- **Axis 2 — Hero Architecture (`heroArchitecture`):** `live-interactive-product-sandbox`
- **Axis 3 — Component & Surface Morphology (`componentMorphology`):** Nav `floating-island-bar` | Corner `6px-tecnico` | Material `deep-obsidian-specular`
- **Axis 4 — OKLCH Chromatic Gamut Mask (`gamutMaskType`):** `atmospheric-analogous`
- **Axis 5 — Expressive Typographic Curation (`fontPairingProfile`):** `swiss-precision-geist-jetbrains`
- **Axis 6 — Kinetic Physics & Scroll Choreography (`motionPhysicsCriteria`):** Transition `magnetic-precision-spring` ($zeta = 0.82$) | Scroll `native-view-transitions-morph`
- **Axis 7 — Intro Video & 3D/Shader Decision (`introAnd3dDecision`):** Recommend Intro `true` (`parametric-svg-choreography`) | 3D/Shader `parametric-diorama-or-shader`
- **Intra-Category Morphological Divergence Score:** `0.88` (Mandatory Floor `>= 0.70`)
- **Birkhoff Aesthetic Harmony Score ($M = O / C$):** `0.94` (Mandatory Floor `>= 0.85`, Max Simultaneous High-Complexity Axes `<= 2`)

## Sonic & Video Identity

- **Archetype Sonic Posture (`Persuade`):** Dual-Surface Sonic Architecture (Subtle persuasive soundscape in Persuade Hero -> quiet functional micro-SFX in Operate).
- **Procedural UI SFX (`Web Audio API` — `0 KB` Network Overhead):** hoverMagnetic, clickTactile, drawerSlide & successChime (0 KB Web Audio API DSP, ±20 cents micro-variation).
- **Programmatic Brand Intro Video (`60 FPS`):** vertex-veo-hybrid (Precision geometric SVG assembly over Vertex AI Veo B-Roll canvas, 3.5s @ 60 FPS, < 1.8 MB) — vector `.svg` geometry and `OKLCH` palette strictly locked (diffusion distortion prohibited).
- **ITU-R BS.1770-4 Loudness & Sidechain Ducking:** Intro video normalized to `-14 LUFS`, background music normalized to `-18 LUFS` (high-pass `30 Hz`, True Peak `-1 dBTP`, Opus `.webm`/`.ogg`), and automatic `-6 dB` Sidechain Ducking in the `300 Hz – 3.5 kHz` vocal band (`15ms` attack / `250ms` release).
- **Autoplay & Ergonomics Guard:** `AudioContext` starts suspended until first explicit user gesture; all `<video>` elements carry `muted playsinline preload="metadata"`, instant `poster.webp` (`LCP < 1.2s`, `CLS: 0.00`), budget `< 1.8 MB`, and an accessible `[data-audio-mute-toggle]` button.

## Do's and Don'ts

### Do
- Use asymmetric 12-column Bento grids (8/4, 6/6, 4/8) with CSS subgrid alignment and live interactive product proof.
- Separate Persuade mode (landing/pricing) from Operate mode (authenticated workspace) with shared OKLCH tokens.
- Present transparent pricing tables with anchoring, clear feature diffs, and zero confirm-shaming.
- Keep borders at 1px hairline with subtle surface luminance steps.

### Do Not
- Never use 3 identical icon-in-circle cards in a row as the page scaffold.
- Never nest cards inside cards (card-in-card slop).
- Never fabricate unverified customer logos or vanity hero-metric counters.
- Never violate any of the **62 deterministic Anti-Slop rules** of `pbakaus/impeccable`.
