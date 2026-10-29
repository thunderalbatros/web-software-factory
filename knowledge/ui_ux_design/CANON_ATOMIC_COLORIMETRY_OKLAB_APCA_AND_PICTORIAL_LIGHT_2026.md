---
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

- **Linear sRGB $\to$ Cone Response ($LMS$) $\to$ Cube Root Non-Linearity $\to$ $(L, a, b)$:**
  - $L \in [0, 1]$ (or $0\%\text{–}100\%$): Perceptually uniform lightness. A $\Delta L = +0.10$ produces identical perceived brightness gain across blue ($H \approx 260^\circ$), yellow ($H \approx 90^\circ$), and green ($H \approx 145^\circ$).
  - Polar Coordinates (`oklch(L C H / alpha)`):
    $$C = \sqrt{a^2 + b^2}, \quad H = \text{atan2}(b, a) \cdot \frac{180^\circ}{\pi}$$
- **Johannes Itten's Law of Proportional Area (Surface Area vs. Chroma Ceiling):**

| UI Surface Layer | Viewport Area Share | Mandatory Lightness ($L$) | Mandatory Chroma ($C$) | Purpose |
|:---|:---|:---|:---|:---|
| **Base Canvas (`surface`)** | $60\%\text{–}85\%$ | Dark: $0.07\text{–}0.13$ / Light: $0.96\text{–}0.985$ | $C \le 0.015$ ($C < 0.006$ in E-Commerce) | Zero visual fatigue & true product color accuracy |
| **Elevated Container (`surface-raised`)** | $10\%\text{–}25\%$ | Dark: $L_{\text{base}} + 0.04$ / Light: $0.995$ | $C \le 0.018$ | De-boxed luminance separation without drop shadows |
| **Secondary State / Badge** | $2\%\text{–}8\%$ | $0.48\text{–}0.78$ | $0.08 \le C \le 0.14$ | Semantic status, filters, active tabs |
| **Primary Focal CTA (`primary`/`tertiary`)** | $< 3\%$ | $0.48\text{–}0.84$ | $0.14 \le C \le 0.22$ | Maximum optical salience on single conversion target |

---

## 2. Thermal Rotation of Light & Shadow (Gurney / Albers Pictorial Principle)

- **Axiom 1 — Absolute Ban on Dead Achromatic Dark Surfaces ($C = 0$):**
  - Never use pure untinted grays (`#111111`, `#222222`, `oklch(15% 0 0)`) for dark-mode surfaces or shadows.
  - **Rule:** Rotate dark surfaces and shadows toward the cool atmospheric spectrum ($H \in [240^\circ, 265^\circ]$ for technical/financial worlds, or warm mineral lacquer $H \in [65^\circ, 95^\circ]$ for luxury/editorial) with micro-chroma $C \in [0.008, 0.025]$.
- **Axiom 2 — Zenithal Specular Top-Edge Highlight:**
  - Physical light sources originate from above. Elevated dark cards (`surface-raised`) must simulate overhead specular reflection on their top horizontal edge while keeping side/bottom borders subdued:
  ```css
  .surface-raised-pictorial {
    background-color: oklch(15% 0.016 255);
    border: 1px solid oklch(85% 0.015 255 / 0.12);
    border-top: 1px solid oklch(100% 0 0 / 0.10);
  }
  ```
- **Axiom 3 — Hue-Tinted Secondary Text:**
  - Secondary text on colored or dark surfaces must inherit the surface hue ($H_{\text{text}} = H_{\text{surface}}$) with $C \in [0.01, 0.02]$, never neutral gray over chromatic fills.

---

## 3. Inigo Quilez Procedural Cosine Palettes for WebGPU / TSL Shaders

- **Equation:**
  $$\text{color}(t) = \mathbf{a} + \mathbf{b} \cdot \cos\bigl(2\pi (\mathbf{c} \cdot t + \mathbf{d})\bigr), \quad t \in [0, 1]$$
- **Pre-Calibrated Industry Archetype Vectors $(\mathbf{a}, \mathbf{b}, \mathbf{c}, \mathbf{d})$:**

| Industry Archetype | Vector $\mathbf{a}$ (Offset) | Vector $\mathbf{b}$ (Amplitude) | Vector $\mathbf{c}$ (Frequency) | Vector $\mathbf{d}$ (Phase) |
|:---|:---|:---|:---|:---|
| `law-firm-and-advisory` | `[0.52, 0.49, 0.44]` | `[0.38, 0.34, 0.28]` | `[0.5, 0.5, 0.5]` | `[0.05, 0.10, 0.20]` |
| `fintech-and-banking` | `[0.14, 0.22, 0.38]` | `[0.18, 0.28, 0.42]` | `[0.8, 0.8, 0.8]` | `[0.00, 0.15, 0.35]` |
| `enterprise-erp-database` | `[0.16, 0.19, 0.24]` | `[0.10, 0.12, 0.16]` | `[0.5, 0.5, 0.5]` | `[0.00, 0.05, 0.10]` |
| `ecommerce-conversion` | `[0.95, 0.95, 0.94]` | `[0.04, 0.04, 0.04]` | `[0.5, 0.5, 0.5]` | `[0.00, 0.00, 0.00]` |
| `streamer-and-gaming-creator` | `[0.50, 0.50, 0.50]` | `[0.50, 0.50, 0.50]` | `[1.0, 1.0, 0.5]` | `[0.80, 0.90, 0.30]` |
| `healthcare-and-clinic` | `[0.88, 0.94, 0.93]` | `[0.10, 0.14, 0.12]` | `[0.5, 0.5, 0.5]` | `[0.10, 0.25, 0.30]` |
| `b2b-saas-platform` | `[0.18, 0.24, 0.36]` | `[0.24, 0.30, 0.44]` | `[0.75, 0.75, 0.85]` | `[0.05, 0.18, 0.38]` |
| `luxury-architecture-and-real-estate` | `[0.68, 0.63, 0.56]` | `[0.26, 0.22, 0.18]` | `[0.5, 0.5, 0.5]` | `[0.08, 0.12, 0.18]` |

---

## 4. APCA Perceptual Contrast Matrix (WCAG 3.0 Draft)

| Typographic Role & Surface Mode | Minimum APCA $L_c$ | Min Font Size / Weight | Enforcement Rule |
|:---|:---|:---|:---|
| **Financial Ledger, ERP Tables & Clinical Copy (`Operate` / `Read`)** | **$L_c \ge 90$** | `13px–17px` (`400–500`) | Mandatory in `fintech-and-banking` and `healthcare-and-clinic` |
| **Long-Form Editorial & Body Prose (`Read` / `Persuade`)** | **$L_c \ge 75$** | `16px–17px` (`400`) | Required across all standard body paragraphs (`60ch–68ch`) |
| **Display Headlines & Hero Titles $\ge 24\text{px}$ (`Persuade` / `Experience`)** | **$L_c \ge 60$** | $\ge 24\text{px}$ (`600+`) or $\ge 36\text{px}$ (`300`) | Permitted only for large display typography |
| **Subdued Metadata / Captions / Input Placeholders** | **$L_c \ge 45$** | $\ge 12\text{px}$ (`500`) | **Absolute Floor:** $L_c < 45$ is strictly forbidden on any legible text |

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[DESIGN_MASTERY_2026]] · [[AGENT_CREATIVE_AND_VISUAL_AWARENESS_2026]] · [[CANON_REFACTORING_UI_WATHAN_SCHOGER]] · [[CANON_PRACTICAL_UI_ADHAM_DANNAWAY]] · #ui_ux_design
