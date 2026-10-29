---
version: "2026.10"
name: "Agencia Alfa (B2B SaaS Platform, Developer Infrastructure & AI Workflow Engine)"
description: "Architectural Bento & Live Interactive Proof — Mode: Persuade"
archetype: "b2b-saas-platform"
surfaceMode: "Persuade"
allows3dEffects: true
apcaContrastFloor: 85
cameraFov: "Telephoto Product Stage (FOV 32°) + AgX Tone Mapping"
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
- **3D & Camera Cinematography:** `allows3dEffects: true` — Lens: `Telephoto Product Stage (FOV 32°) + AgX Tone Mapping` (Zero distracting 3D effects in operational/editorial views)
- **Google Filament PBR Material:** `metalness: 0`, `roughness: 0.48`, `ior: 1.46` (Architectural Matte Polymer & Specular Hairline)

## Colors

All colors are authored in perceptual **W3C DTCG 2025.10 OKLCH** space to guarantee uniform lightness and APCA contrast (`Lc >= 85`, WCAG AA+).

- **Primary (`{colors.primary}`):** Core brand anchor and primary interactive driver (Itten Area Law focal accent).
- **Secondary (`{colors.secondary}`):** Supporting structural accent and secondary state signal.
- **Tertiary (`{colors.tertiary}`):** High-salience focal accent reserved for single primary conversion moments.
- **Surface Ground (`{colors.surface}`):** Tinted mineral/daylight ground (never untinted `#000000` or glaring `#ffffff`).
- **Gurney/Albers Thermal Rotation:** Cool sapphire-slate rotation (H: 255, C: 0.010) + Zenithal top-edge highlight (border-top: 1px solid oklch(1 0 0 / 0.10)).
- **Inigo Quilez Procedural Cosine Palette (`color(t) = a + b * cos(2π(c*t + d))`):** `a=[0.18,0.24,0.36]`, `b=[0.24,0.3,0.44]`, `c=[0.75,0.75,0.85]`, `d=[0.05,0.18,0.38]`.
- **Text Hierarchy (`{colors.text-primary}` / `{colors.text-secondary}`):** Hue-tinted foregrounds; never gray text on colored backgrounds.
- **Semantic State (`{colors.success}`, `{colors.warning}`, `{colors.danger}`):** High-contrast status tokens paired with explicit icons/labels.

## Typography

- **Typographic Scale & Vertical Rhythm:** Utopia Fluid (1.333 Perfect Fourth) in Persuade | Fixed 13px-14px in Operate.
- **Display & Headlines (`{typography.display}`, `{typography.h1}`, `{typography.h2}`):** 'Geist', 'Plus Jakarta Sans', system-ui, sans-serif with deliberate weight hierarchy and balanced wrapping (`text-wrap: balance`).
- **Body Measure (`{typography.body}`):** 'Geist', 'Plus Jakarta Sans', system-ui, sans-serif at `1rem` (line-height `1.65`), constrained to `65ch–75ch` (`60ch–68ch` in `Read` mode) for effortless scannability.
- **Edward Tufte Numeric Discipline (`{typography.mono}`):** Mandatory `font-variant-numeric: tabular-nums slashed-zero` (`tnum`, `zero`), right-aligned numeric cells, left-aligned text/IDs, and `16px` inline sparklines.
- **Anti-Slop Type Bans:** No generic `Inter`/`Arial` display defaults, no mandatory kicker/eyebrow above every heading, and no tracking tighter than `-0.04em`.

## Layout

- **Spatial Architecture:** Asymmetric 12-column CSS Grid & Subgrid with generous section spacing (`{spacing.xl}` to `{spacing.2xl}`) and `>= 25%` open canvas whitespace.
- **Multi-Viewport Ergonomics:** Verified across `1440px` (Desktop), `768px` (Tablet), and `375px` (Mobile) with zero horizontal overflow.
- **Apple HIG / Material Design 3 / Hoober Thumb Zones:** Primary mobile navigation and CTAs placed in the bottom third thumb zone with minimum `48x48px` touch target area (`>= 8px` separation), `env(safe-area-inset-top/bottom)`, and `touch-action: manipulation`.

## Elevation & Depth

- **Single Elevation Declaration & Zenithal Specular Light:** Surfaces declare depth once via `1px solid` hairline borders (`{colors.border-hairline}`), subtle surface luminance shifts (`{colors.surface}` -> `{colors.surface-raised}`), and zenithal top-edge specular reflection (`border-top: 1px solid oklch(1 0 0 / 0.10)`).
- **Apple WWDC Fluid Spring Physics:** `zeta = 0.82` (`280ms`, `linear(0, 0.3566 9.6%, 0.7852 21.1%, 1.0156 32.2%, 1.0468 53.6%, 1)`) — Controlled spring in Persuade / Critically damped in Operate.
- **Zero Ghost Cards:** Never combine a 1px border with a wide soft drop-shadow, and never use zero-offset neon halos.

## Shapes

- **Corner Radius Scale:** `none: 0px`, `xs: 4px`, `sm: 6px`, `md: 10px`, `lg: 12px`.
- **Industry Geometry:** Tailored to `b2b-saas-platform` — no `999px` pill radii on cards or containers.

## Components

- **Primary CTA (`button-primary`):** Uses `{colors.primary}` background with `{colors.surface}` text, `>= 48x48px` hit area, and `<150ms` exponential ease-out response.
- **Data & Content Containers (`card-surface`):** Flat or hairline-bounded containers; strictly **zero `card-in-card` nesting**.
- **Interactive State Matrix:** Every control implements all 7 states (`default`, `hover`, `focus-visible`, `active`, `disabled`, `loading skeleton`, `error`), honors `prefers-reduced-motion`, and themes `::selection` and scrollbars.
- **Overlays:** Built with native HTML5 `<dialog>` and Popover API to prevent container clipping.

## Sonic & Video Identity

- **Sonic Seed Preset:** `linear-minimal-tick` (`archetype: saas`)
- **UI SFX Mode:** `subtle` (`silentByClientPreference: false`)
- **Dominant Modal Material:** `polymer` (Polímero / Acrílico Mate) — `Q: 4.5`, `decay: 6ms`
- **Cross-Modal Spence & Parise Parameters:**
  - `border-radius: 8px` -> Profile `balanced`, Attack `15.72ms`, Odd Harmonics `0.368`
  - `OKLCH(0.15, 0.03, 260)` -> Spectral Centroid Cutoff `903 Hz`
  - DOM Interactive Area (`8640 px²`) -> Fundamental Frequency `f0 = 699.39 Hz`
- **Psychoacoustic Safety Envelope (ISO 226:2023 & EBU R128):**
  - Peak Ceiling: `-23.74 dBFS` (`<= -18.0 dBFS`), Sub-bass HPF `30 Hz`, ISO 226 Notch `-5.0 dB @ 3250 Hz`, `maxPolyphony: 4`
  - Browser Autoplay Compliance: `AudioContext` starts `suspended`, requires `[data-audio-mute-toggle]`, respects `prefers-reduced-motion: reduce`
- **60 FPS Audiovisual Synchresis (Chion / Murch):**
  - Spring `stiffness: 280, damping: 24` -> Peak Velocity at `66.12ms` (Deviation `<= 16.6ms`)
- **Background Music & Video Intro:**
  - Music Mode: `off` (`-18 LUFS` integrated target, `-6 dB` voiceover sidechain ducking)
  - Brand Intro Video: `vector-svg-reveal-3s` (`-14 LUFS` integrated target, `-1.0 dBTP` True Peak, `AV1/WebM 60 FPS <= 1.8 MB`, Logo: `public/assets/brand/logo-primary.svg`)
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

## Brand Identity Lock (`BRAND_IDENTITY_LOCK.json`)

- **Brand Identity Mode:** `PARTIAL_BRAND_EVOLUTION` (`lockClientPalette: false`)
- **Locked Primary Brand Color (`--color-primary`):** `#2563EB`
- **Locked Secondary Brand Color (`--color-secondary`):** `#0F172A`
- **Locked Accent Brand Color (`--color-accent`):** `#10B981`
- **Locked Surface Colors:** Light `#F8FAFC` | Dark `#0B0F19`
- **Official Logo & Isotipo:** `public/assets/brand/logo-primary.svg` | `public/assets/brand/isotipo.svg`
