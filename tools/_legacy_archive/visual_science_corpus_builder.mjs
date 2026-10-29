#!/usr/bin/env node
/**
 * tools/intelligence/visual_science_corpus_builder.mjs — Atomic Visual Science Corpus Compiler
 * =============================================================================================
 * Generates and indexes 4 zero-filler, atomic `TIER_1_SOTA_2026` treatises in `knowledge/`:
 *   1. `knowledge/ui_ux_design/CANON_ATOMIC_COLORIMETRY_OKLAB_APCA_AND_PICTORIAL_LIGHT_2026.md`
 *   2. `knowledge/motion_and_animation/CANON_ATOMIC_PBR_FILAMENT_CINEMATOGRAPHY_AND_FLUID_MOTION_2026.md`
 *   3. `knowledge/ui_ux_design/CANON_ATOMIC_TUFTE_DATA_DENSITY_AND_SWISS_TYPOGRAPHY_2026.md`
 *   4. `knowledge/ui_ux_design/CANON_ATOMIC_MOBILE_HIG_M3_ERGONOMICS_FOR_CAPACITOR_2026.md`
 * =============================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const ROOT = path.resolve(__dirname, '..', '..');

export const INIGO_QUILEZ_COSINE_PALETTES = {
  'law-firm-and-advisory': {
    a: [0.52, 0.49, 0.44],
    b: [0.38, 0.34, 0.28],
    c: [0.5, 0.5, 0.5],
    d: [0.05, 0.10, 0.20],
    note: 'Warm limestone & deep navy ink subtle gradient'
  },
  'fintech-and-banking': {
    a: [0.14, 0.22, 0.38],
    b: [0.18, 0.28, 0.42],
    c: [0.8, 0.8, 0.8],
    d: [0.0, 0.15, 0.35],
    note: 'Obsidian slate to cryptographic cobalt'
  },
  'enterprise-erp-database': {
    a: [0.16, 0.19, 0.24],
    b: [0.10, 0.12, 0.16],
    c: [0.5, 0.5, 0.5],
    d: [0.0, 0.05, 0.10],
    note: 'Restrained operational slate with minimal amplitude'
  },
  'ecommerce-conversion': {
    a: [0.95, 0.95, 0.94],
    b: [0.04, 0.04, 0.04],
    c: [0.5, 0.5, 0.5],
    d: [0.0, 0.0, 0.0],
    note: 'Achromatic color-true studio neutral backdrop'
  },
  'streamer-and-gaming-creator': {
    a: [0.5, 0.5, 0.5],
    b: [0.5, 0.5, 0.5],
    c: [1.0, 1.0, 0.5],
    d: [0.80, 0.90, 0.30],
    note: 'Kinpaku gold & verdigris tactical HUD iridescence'
  },
  'healthcare-and-clinic': {
    a: [0.88, 0.94, 0.93],
    b: [0.10, 0.14, 0.12],
    c: [0.5, 0.5, 0.5],
    d: [0.10, 0.25, 0.30],
    note: 'Biophilic calm teal and daylight sage'
  },
  'b2b-saas-platform': {
    a: [0.18, 0.24, 0.36],
    b: [0.24, 0.30, 0.44],
    c: [0.75, 0.75, 0.85],
    d: [0.05, 0.18, 0.38],
    note: 'Architectural Bento sapphire & technical slate'
  },
  'luxury-architecture-and-real-estate': {
    a: [0.68, 0.63, 0.56],
    b: [0.26, 0.22, 0.18],
    c: [0.5, 0.5, 0.5],
    d: [0.08, 0.12, 0.18],
    note: 'Warm travertine stone & brushed bronze patina'
  }
};

function buildColorimetryTreatise() {
  return `---
title: "CANON: Atomic Colorimetry, Oklab/OKLCH, APCA Contrast & Pictorial Light (2026)"
tier: "TIER_1_SOTA_2026"
domain: "ui_ux_design"
sources:
  - "Björn Ottosson — A Perceptual Color Space for Image Processing (Oklab / OKLCH Spec)"
  - "Johannes Itten — The Art of Color (Law of Proportional Surface Area)"
  - "James Gurney — Color and Light / Josef Albers — Interaction of Color (Thermal Light-Shadow Rotation)"
  - "Inigo Quilez — Procedural Cosine Palettes for Shaders"
  - "W3C WCAG 3.0 Draft — Accessible Perceptual Contrast Algorithm (APCA)"
updatedAt: "2026-10-28"
---

# CANON: Atomic Colorimetry, Oklab/OKLCH, APCA & Pictorial Light (2026)

## 1. Oklab & OKLCH Mathematical Model (Björn Ottosson Spec)

- **Linear sRGB $\\to$ Cone Response ($LMS$) $\\to$ Cube Root Non-Linearity $\\to$ $(L, a, b)$:**
  - $L \\in [0, 1]$ (or $0\\%\\text{–}100\\%$): Perceptually uniform lightness. A $\\Delta L = +0.10$ produces identical perceived brightness gain across blue ($H \\approx 260^\\circ$), yellow ($H \\approx 90^\\circ$), and green ($H \\approx 145^\\circ$).
  - Polar Coordinates (\`oklch(L C H / alpha)\`):
    $$C = \\sqrt{a^2 + b^2}, \\quad H = \\text{atan2}(b, a) \\cdot \\frac{180^\\circ}{\\pi}$$
- **Johannes Itten's Law of Proportional Area (Surface Area vs. Chroma Ceiling):**

| UI Surface Layer | Viewport Area Share | Mandatory Lightness ($L$) | Mandatory Chroma ($C$) | Purpose |
|:---|:---|:---|:---|:---|
| **Base Canvas (\`surface\`)** | $60\\%\\text{–}85\\%$ | Dark: $0.07\\text{–}0.13$ / Light: $0.96\\text{–}0.985$ | $C \\le 0.015$ ($C < 0.006$ in E-Commerce) | Zero visual fatigue & true product color accuracy |
| **Elevated Container (\`surface-raised\`)** | $10\\%\\text{–}25\\%$ | Dark: $L_{\\text{base}} + 0.04$ / Light: $0.995$ | $C \\le 0.018$ | De-boxed luminance separation without drop shadows |
| **Secondary State / Badge** | $2\\%\\text{–}8\\%$ | $0.48\\text{–}0.78$ | $0.08 \\le C \\le 0.14$ | Semantic status, filters, active tabs |
| **Primary Focal CTA (\`primary\`/\`tertiary\`)** | $< 3\\%$ | $0.48\\text{–}0.84$ | $0.14 \\le C \\le 0.22$ | Maximum optical salience on single conversion target |

---

## 2. Thermal Rotation of Light & Shadow (Gurney / Albers Pictorial Principle)

- **Axiom 1 — Absolute Ban on Dead Achromatic Dark Surfaces ($C = 0$):**
  - Never use pure untinted grays (\`#111111\`, \`#222222\`, \`oklch(15% 0 0)\`) for dark-mode surfaces or shadows.
  - **Rule:** Rotate dark surfaces and shadows toward the cool atmospheric spectrum ($H \\in [240^\\circ, 265^\\circ]$ for technical/financial worlds, or warm mineral lacquer $H \\in [65^\\circ, 95^\\circ]$ for luxury/editorial) with micro-chroma $C \\in [0.008, 0.025]$.
- **Axiom 2 — Zenithal Specular Top-Edge Highlight:**
  - Physical light sources originate from above. Elevated dark cards (\`surface-raised\`) must simulate overhead specular reflection on their top horizontal edge while keeping side/bottom borders subdued:
  \`\`\`css
  .surface-raised-pictorial {
    background-color: oklch(15% 0.016 255);
    border: 1px solid oklch(85% 0.015 255 / 0.12);
    border-top: 1px solid oklch(100% 0 0 / 0.10);
  }
  \`\`\`
- **Axiom 3 — Hue-Tinted Secondary Text:**
  - Secondary text on colored or dark surfaces must inherit the surface hue ($H_{\\text{text}} = H_{\\text{surface}}$) with $C \\in [0.01, 0.02]$, never neutral gray over chromatic fills.

---

## 3. Inigo Quilez Procedural Cosine Palettes for WebGPU / TSL Shaders

- **Equation:**
  $$\\text{color}(t) = \\mathbf{a} + \\mathbf{b} \\cdot \\cos\\bigl(2\\pi (\\mathbf{c} \\cdot t + \\mathbf{d})\\bigr), \\quad t \\in [0, 1]$$
- **Pre-Calibrated Industry Archetype Vectors $(\\mathbf{a}, \\mathbf{b}, \\mathbf{c}, \\mathbf{d})$:**

| Industry Archetype | Vector $\\mathbf{a}$ (Offset) | Vector $\\mathbf{b}$ (Amplitude) | Vector $\\mathbf{c}$ (Frequency) | Vector $\\mathbf{d}$ (Phase) |
|:---|:---|:---|:---|:---|
| \`law-firm-and-advisory\` | \`[0.52, 0.49, 0.44]\` | \`[0.38, 0.34, 0.28]\` | \`[0.5, 0.5, 0.5]\` | \`[0.05, 0.10, 0.20]\` |
| \`fintech-and-banking\` | \`[0.14, 0.22, 0.38]\` | \`[0.18, 0.28, 0.42]\` | \`[0.8, 0.8, 0.8]\` | \`[0.00, 0.15, 0.35]\` |
| \`enterprise-erp-database\` | \`[0.16, 0.19, 0.24]\` | \`[0.10, 0.12, 0.16]\` | \`[0.5, 0.5, 0.5]\` | \`[0.00, 0.05, 0.10]\` |
| \`ecommerce-conversion\` | \`[0.95, 0.95, 0.94]\` | \`[0.04, 0.04, 0.04]\` | \`[0.5, 0.5, 0.5]\` | \`[0.00, 0.00, 0.00]\` |
| \`streamer-and-gaming-creator\` | \`[0.50, 0.50, 0.50]\` | \`[0.50, 0.50, 0.50]\` | \`[1.0, 1.0, 0.5]\` | \`[0.80, 0.90, 0.30]\` |
| \`healthcare-and-clinic\` | \`[0.88, 0.94, 0.93]\` | \`[0.10, 0.14, 0.12]\` | \`[0.5, 0.5, 0.5]\` | \`[0.10, 0.25, 0.30]\` |
| \`b2b-saas-platform\` | \`[0.18, 0.24, 0.36]\` | \`[0.24, 0.30, 0.44]\` | \`[0.75, 0.75, 0.85]\` | \`[0.05, 0.18, 0.38]\` |
| \`luxury-architecture-and-real-estate\` | \`[0.68, 0.63, 0.56]\` | \`[0.26, 0.22, 0.18]\` | \`[0.5, 0.5, 0.5]\` | \`[0.08, 0.12, 0.18]\` |

---

## 4. APCA Perceptual Contrast Matrix (WCAG 3.0 Draft)

| Typographic Role & Surface Mode | Minimum APCA $L_c$ | Min Font Size / Weight | Enforcement Rule |
|:---|:---|:---|:---|
| **Financial Ledger, ERP Tables & Clinical Copy (\`Operate\` / \`Read\`)** | **$L_c \\ge 90$** | \`13px–17px\` (\`400–500\`) | Mandatory in \`fintech-and-banking\` and \`healthcare-and-clinic\` |
| **Long-Form Editorial & Body Prose (\`Read\` / \`Persuade\`)** | **$L_c \\ge 75$** | \`16px–17px\` (\`400\`) | Required across all standard body paragraphs (\`60ch–68ch\`) |
| **Display Headlines & Hero Titles $\\ge 24\\text{px}$ (\`Persuade\` / \`Experience\`)** | **$L_c \\ge 60$** | $\\ge 24\\text{px}$ (\`600+\`) or $\\ge 36\\text{px}$ (\`300\`) | Permitted only for large display typography |
| **Subdued Metadata / Captions / Input Placeholders** | **$L_c \\ge 45$** | $\\ge 12\\text{px}$ (\`500\`) | **Absolute Floor:** $L_c < 45$ is strictly forbidden on any legible text |
`;
}

function buildPbrAndMotionTreatise() {
  return `---
title: "CANON: Atomic PBR Filament Physics, 3D Cinematography & 60FPS Fluid Motion (2026)"
tier: "TIER_1_SOTA_2026"
domain: "motion_and_animation"
sources:
  - "Google Filament — Physically Based Rendering (PBR) Material & Lighting Spec"
  - "Brent Burley (Walt Disney Animation Studios) — Physically-Based Shading at Disney (BRDF)"
  - "Bruno Simon (Three.js Journey) & blendi-remade/dioramas — Studio Camera Lenses & 3-Point Lighting"
  - "Apple WWDC — Designing Fluid Interfaces (Damped Harmonic Oscillator Spring Physics)"
updatedAt: "2026-10-28"
---

# CANON: Atomic PBR Filament Physics, 3D Cinematography & 60FPS Fluid Motion (2026)

## 1. Physically Based Rendering (Google Filament & Disney BRDF Public Specs)

- **Energy Conservation & Microfacet BRDF (Cook-Torrance GGX + Smith Height-Correlated Masking):**
  - \`metalness\` $\\in \\{0.0, 1.0\\}$: Binary physical truth (\`0.0\` pure dielectrics: glass, ceramic, stone, fabric, skin, paper; \`1.0\` pure conductors: gold, brushed aluminum, titanium, copper). Avoid non-physical intermediate values ($0.3\\text{–}0.7$) unless modeling dusty oxidation patina.
  - **Perceptual Roughness ($r_{\\text{perceptual}}$) Mapping ($\\alpha = r_{\\text{perceptual}}^2$):**

| Material Class | \`metalness\` | \`roughness\` | \`ior\` (Index of Refraction) | \`transmission\` / \`clearcoat\` |
|:---|:---|:---|:---|:---|
| **Polished Optical Glass / Crystal** | \`0.0\` | \`0.08–0.15\` | \`1.50\` ($F_0 = 0.04$) | \`transmission: 0.95, thickness: 1.2\` |
| **Anodized Brushed Metal / Gold Leaf** | \`1.0\` | \`0.18–0.28\` | N/A (complex conductor $F_0$) | \`clearcoat: 0.25, clearcoatRoughness: 0.12\` |
| **Matte Industrial Polymer / Ceramic** | \`0.0\` | \`0.45–0.65\` | \`1.46\` | \`clearcoat: 0.10\` |
| **Editorial Paper / Travertine Stone** | \`0.0\` | \`0.85–0.96\` | \`1.48\` | \`transmission: 0.0, clearcoat: 0.0\` |

---

## 2. 3D Cinematography, Camera Lenses & 3-Point Studio Lighting

| Industry Archetype | Camera Focal Length & \`FOV\` | Lighting Rig (Key / Fill / Rim) | Tone Mapping & Post-Processing |
|:---|:---|:---|:---|
| **E-Commerce / Luxury / Footwear / Jewelry** | **Telephoto Studio Lens (\`FOV 28°–35°\`)** — eliminates perspective distortion so product proportions remain exact | **Key:** $45^\\circ$ azimuth, $35^\\circ$ elevation, warm $5200\\text{K}$ ($1.0\\times$)<br>**Fill:** $-45^\\circ$ azimuth, cool $6500\\text{K}$ ($0.35\\times$)<br>**Rim:** $165^\\circ$ backlight ($1.20\\times$) for silhouette separation | \`THREE.AgXToneMapping\`, \`N8AO\` contact shadow, neutral backdrop ($C < 0.02$) |
| **Architecture / Real Estate / Streamer HUD** | **Controlled Wide Angle (\`FOV 50°–60°\`)** — conveys spatial volume without fisheye edge warping | HDRI skybox dome + directional sun ($\\text{elevation } 22^\\circ$ golden hour) + volumetric depth fog (\`FogExp2\`) | \`THREE.AgXToneMapping\`, \`MipChainBloom\` (threshold $0.88$), Spark 2.x \`.spz\`/\`.rad\` LoD Splat Tree |
| **ERP / Fintech / Law Firm / Healthcare** | **2D Orthographic / Zero 3D (\`allows3dEffects: false\`)** | Zenithal CSS specular border (\`border-top: 1px solid oklch(1 0 0 / 0.10)\`) | Zero WebGL/WebGPU overhead; 100% CPU/GPU budget dedicated to instant DOM responsiveness |

---

## 3. Damped Harmonic Oscillator Spring Physics (Apple WWDC Fluid Interfaces)

- **Differential Equation:**
  $$m \\ddot{x} + c \\dot{x} + k x = 0, \\quad \\zeta = \\frac{c}{2\\sqrt{m k}}, \\quad \\omega_0 = \\sqrt{\\frac{k}{m}}$$
- **Industry Damping Ratio ($\\zeta$) Mandate:**
  1. **Critically Damped ($\\zeta = 1.0$, Zero Overshoot, \`120ms–180ms\`):**
     - **Assigned To:** \`fintech-and-banking\`, \`enterprise-erp-database\`, \`law-firm-and-advisory\`, \`healthcare-and-clinic\`.
     - **CSS Equivalent:** \`cubic-bezier(0.22, 1, 0.36, 1)\` (instant velocity pickup, zero elastic bounce).
  2. **Under-Damped Controlled ($\\zeta \\in [0.72, 0.85]$, Subtle Inertia, \`280ms–450ms\`):**
     - **Assigned To:** \`ecommerce-conversion\`, \`streamer-and-gaming-creator\`, \`b2b-saas-platform\`, \`luxury-architecture-and-real-estate\`.
     - **CSS Equivalent:** \`linear(0, 0.3566 9.6%, 0.7852 21.1%, 1.0156 32.2%, 1.0468 53.6%, 1)\` (single $<4\\%$ settle, never cartoon bounce).
`;
}

function buildTufteAndTypographyTreatise() {
  return `---
title: "CANON: Atomic Edward Tufte Data Density & Swiss Typographic Rhythm (2026)"
tier: "TIER_1_SOTA_2026"
domain: "ui_ux_design"
sources:
  - "Edward R. Tufte — The Visual Display of Quantitative Information (Data-Ink Ratio & Sparklines)"
  - "Robert Bringhurst — The Elements of Typographic Style (Chromatic Measure & Vertical Rhythm)"
  - "Josef Müller-Brockmann — Grid Systems in Graphic Design (Swiss Asymmetric Modular Grids)"
updatedAt: "2026-10-28"
---

# CANON: Atomic Edward Tufte Data Density & Swiss Typographic Rhythm (2026)

## 1. Edward Tufte's Axioms for \`Operate\` Mode (Fintech, ERPs, Database Consoles)

1. **Maximize the Data-Ink Ratio:**
   $$\\text{Data-Ink Ratio} = \\frac{\\text{Ink used to display non-redundant quantitative data}}{\\text{Total ink used to print the graphic}} \\to 1.0$$
   - Strip heavy outer boxes, striped zebra backgrounds with high contrast, 3D pie charts, and decorative gauge rings (*Chartjunk*).
   - Separate table rows with ultra-subtle \`1px solid oklch(85% 0.01 250 / 0.10)\` horizontal hairlines only; omit vertical column gridlines.
2. **Mandatory Tabular Numerals & Alignment Law:**
   - Every numerical column, currency cell, timestamp, percentage delta, and SKU ID must enforce:
     \`\`\`css
     .tufte-numeric-cell {
       font-variant-numeric: tabular-nums slashed-zero;
       font-feature-settings: "tnum" 1, "zero" 1;
       text-align: right;
     }
     .tufte-text-cell {
       text-align: left;
     }
     \`\`\`
3. **Word-Sized Inline Sparklines (\`16px\` Height):**
   - Trendlines inside table rows must be rendered as inline \`<svg height="16" width="64">\` word-sized graphics without axes, frames, or tick marks, highlighting only the final current value dot in semantic color.

---

## 2. Typographic Scales & Vertical Rhythm by Surface Mode (Bringhurst + Müller-Brockmann)

| Impeccable Surface Mode | Modular Scale Ratio | Body Font Size & Measure | Line-Height & Tracking | Structural Grid System |
|:---|:---|:---|:---|:---|
| **\`Operate\`** (ERP, Fintech, Admin) | **Fixed Discrete Scale** (\`12px\`, \`13px\`, \`14px\`, \`16px\`, \`20px\`) | \`13px–14px\` (\`0.8125rem–0.875rem\`), tables up to \`120ch+\` | \`line-height: 1.35–1.45\`, \`letter-spacing: 0em\` | 12-Col Dense App Shell (\`gap: 8px–12px\`, sticky headers) |
| **\`Read\`** (Law Firm, Clinic, Docs) | **\`1.250\` Major Third** | \`17px\` (\`1.0625rem\`), strict **\`60ch–68ch\`** measure | \`line-height: 1.65–1.72\`, headings \`-0.015em\` | Swiss Broadsheet Asymmetric (\`4 + 8\` columns, visible 1px hairlines) |
| **\`Persuade\` / \`Experience\`** (SaaS, E-Commerce, Luxury, Streamer) | **Fluid Utopia (\`1.333\` Perfect Fourth $\\to$ \`1.414\` Aug Fourth)** | \`16px\` (\`1rem\`), prose \`65ch–72ch\` | Hero \`line-height: 1.02–1.10\`, \`letter-spacing: -0.025em to -0.03em\` | Müller-Brockmann Bento (\`8/4\`, \`6/6\`, \`4/8\`, $\\ge 25\\%$ open canvas) |
`;
}

function buildMobileHigM3Treatise() {
  return `---
title: "CANON: Atomic Mobile HIG, Material Design 3 & Capacitor 8 Touch Ergonomics (2026)"
tier: "TIER_1_SOTA_2026"
domain: "ui_ux_design"
sources:
  - "Apple Human Interface Guidelines (iOS 18+ Safe Areas, Dynamic Island & Touch Ergonomics)"
  - "Google Material Design 3 (48x48dp Touch Targets, Adaptive Navigation & Predictive Back)"
  - "Steven Hoober — Designing Mobile Interfaces (Natural Thumb Zone Mapping)"
updatedAt: "2026-10-28"
---

# CANON: Atomic Mobile HIG, Material Design 3 & Capacitor 8 Touch Ergonomics (2026)

## 1. Steven Hoober's Natural Thumb Zone & Navigation Placement

| Screen Vertical Third | Thumb Reach Ergonomics | Mandatory UI Allocation | Forbidden Elements |
|:---|:---|:---|:---|
| **Bottom Third ($67\\%\\text{–}100\\%$ Y)** | **Easy / Natural Arc** | Primary CTAs, Bottom Navigation Bar (\`3–5\` destinations), Bottom Sheets, Search/Filter triggers | Destructive unconfirmed delete buttons |
| **Middle Third ($33\\%\\text{–}67\\%$ Y)** | **Comfortable Stretch** | Scrollable content cards, form inputs, swipeable carousels | Tiny $<44\\text{px}$ inline action icons |
| **Top Third ($0\\%\\text{–}33\\%$ Y)** | **Hard / Two-Handed Reach** | Read-only status headers, back navigation, brand lockup, Dynamic Island clearance | Primary checkout CTA or frequent tab switching |

---

## 2. Fitts's Law Touch Targets & Capacitor 8 Native Viewport Rules

1. **Minimum Hit Area ($48\\times 48\\text{px}$ / $48\\times 48\\text{dp}$ with $\\ge 8\\text{px}$ Clearance):**
   - Apple HIG specifies $44\\times 44\\text{pt}$ minimum; Material Design 3 specifies $48\\times 48\\text{dp}$. WebFactory enforces the unified ceiling of **$48\\times 48\\text{px}$** with at least **$8\\text{px}$** gap between adjacent interactive targets.
2. **Hardware Safe-Area Insets (Dynamic Island, Notch & Home Indicator):**
   \`\`\`css
   :root {
     --safe-top: env(safe-area-inset-top, 0px);
     --safe-bottom: env(safe-area-inset-bottom, 0px);
     --safe-left: env(safe-area-inset-left, 0px);
     --safe-right: env(safe-area-inset-right, 0px);
   }
   .mobile-bottom-bar {
     padding-bottom: calc(12px + var(--safe-bottom));
   }
   \`\`\`
3. **Zero Tap Delay & Rubber-Band Suppression:**
   - Apply \`touch-action: manipulation\` on all interactive elements to eliminate the legacy \`300ms\` double-tap delay.
   - Apply \`overscroll-behavior-y: none\` and \`user-select: none\` on operational app shells so Capacitor 8 apps feel indistinguishable from native Swift/Kotlin binaries.
4. **Biometric & Tactile Haptic Confirmation:**
   - High-stakes actions (Fintech transfers, E-Commerce 1-tap checkout, ERP approvals) must invoke \`authenticateWithBiometricsOrPasskey()\` (\`WebAuthn\` / FaceID / TouchID) paired with a \`15ms\` medium tactile haptic pulse.
`;
}

export function buildVisualScienceCorpus() {
  const t0 = performance.now();
  const treatises = [
    {
      relPath: 'knowledge/ui_ux_design/CANON_ATOMIC_COLORIMETRY_OKLAB_APCA_AND_PICTORIAL_LIGHT_2026.md',
      content: buildColorimetryTreatise()
    },
    {
      relPath: 'knowledge/motion_and_animation/CANON_ATOMIC_PBR_FILAMENT_CINEMATOGRAPHY_AND_FLUID_MOTION_2026.md',
      content: buildPbrAndMotionTreatise()
    },
    {
      relPath: 'knowledge/ui_ux_design/CANON_ATOMIC_TUFTE_DATA_DENSITY_AND_SWISS_TYPOGRAPHY_2026.md',
      content: buildTufteAndTypographyTreatise()
    },
    {
      relPath: 'knowledge/ui_ux_design/CANON_ATOMIC_MOBILE_HIG_M3_ERGONOMICS_FOR_CAPACITOR_2026.md',
      content: buildMobileHigM3Treatise()
    }
  ];

  const written = [];
  for (const item of treatises) {
    const absPath = path.join(ROOT, item.relPath);
    fs.mkdirSync(path.dirname(absPath), { recursive: true });
    fs.writeFileSync(absPath, item.content, 'utf8');
    written.push({
      relPath: item.relPath,
      bytes: Buffer.byteLength(item.content, 'utf8'),
      lines: item.content.split(/\r?\n/).length
    });
  }

  return {
    ok: written.length === 4,
    count: written.length,
    durationMs: Math.round(performance.now() - t0),
    treatises: written
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const res = buildVisualScienceCorpus();
  console.log('==================================================================');
  console.log('🔬 ATOMIC VISUAL SCIENCE CORPUS BUILDER (TIER_1_SOTA_2026)');
  console.log('==================================================================');
  for (const t of res.treatises) {
    console.log(`  ✓ ${t.relPath} (${t.lines} lines, ${t.bytes} bytes)`);
  }
  console.log('------------------------------------------------------------------');
  console.log(`  🏆 Compiled ${res.count}/4 Atomic Treatises in ${res.durationMs}ms`);
  console.log('==================================================================\n');
  process.exit(res.ok ? 0 : 1);
}
