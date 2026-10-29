---
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

## 1. Edward Tufte's Axioms for `Operate` Mode (Fintech, ERPs, Database Consoles)

1. **Maximize the Data-Ink Ratio:**
   $$\text{Data-Ink Ratio} = \frac{\text{Ink used to display non-redundant quantitative data}}{\text{Total ink used to print the graphic}} \to 1.0$$
   - Strip heavy outer boxes, striped zebra backgrounds with high contrast, 3D pie charts, and decorative gauge rings (*Chartjunk*).
   - Separate table rows with ultra-subtle `1px solid oklch(85% 0.01 250 / 0.10)` horizontal hairlines only; omit vertical column gridlines.
2. **Mandatory Tabular Numerals & Alignment Law:**
   - Every numerical column, currency cell, timestamp, percentage delta, and SKU ID must enforce:
     ```css
     .tufte-numeric-cell {
       font-variant-numeric: tabular-nums slashed-zero;
       font-feature-settings: "tnum" 1, "zero" 1;
       text-align: right;
     }
     .tufte-text-cell {
       text-align: left;
     }
     ```
3. **Word-Sized Inline Sparklines (`16px` Height):**
   - Trendlines inside table rows must be rendered as inline `<svg height="16" width="64">` word-sized graphics without axes, frames, or tick marks, highlighting only the final current value dot in semantic color.

---

## 2. Typographic Scales & Vertical Rhythm by Surface Mode (Bringhurst + Müller-Brockmann)

| Impeccable Surface Mode | Modular Scale Ratio | Body Font Size & Measure | Line-Height & Tracking | Structural Grid System |
|:---|:---|:---|:---|:---|
| **`Operate`** (ERP, Fintech, Admin) | **Fixed Discrete Scale** (`12px`, `13px`, `14px`, `16px`, `20px`) | `13px–14px` (`0.8125rem–0.875rem`), tables up to `120ch+` | `line-height: 1.35–1.45`, `letter-spacing: 0em` | 12-Col Dense App Shell (`gap: 8px–12px`, sticky headers) |
| **`Read`** (Law Firm, Clinic, Docs) | **`1.250` Major Third** | `17px` (`1.0625rem`), strict **`60ch–68ch`** measure | `line-height: 1.65–1.72`, headings `-0.015em` | Swiss Broadsheet Asymmetric (`4 + 8` columns, visible 1px hairlines) |
| **`Persuade` / `Experience`** (SaaS, E-Commerce, Luxury, Streamer) | **Fluid Utopia (`1.333` Perfect Fourth $\to$ `1.414` Aug Fourth)** | `16px` (`1rem`), prose `65ch–72ch` | Hero `line-height: 1.02–1.10`, `letter-spacing: -0.025em to -0.03em` | Müller-Brockmann Bento (`8/4`, `6/6`, `4/8`, $\ge 25\%$ open canvas) |

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[DESIGN_MASTERY_2026]] · [[AGENT_CREATIVE_AND_VISUAL_AWARENESS_2026]] · [[CANON_REFACTORING_UI_WATHAN_SCHOGER]] · [[CANON_PRACTICAL_UI_ADHAM_DANNAWAY]] · #ui_ux_design
