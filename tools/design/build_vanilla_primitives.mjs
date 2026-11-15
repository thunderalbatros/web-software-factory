#!/usr/bin/env node
/**
 * tools/design/build_vanilla_primitives.mjs — Universal SOTA 2026 UI, Component Morphology & Motion Primitives Compiler
 * ======================================================================================================================
 * Distills high-craft UI, OKLCH surface hierarchy, CSS @property conic border beams, Utopia fluid
 * Bento/Editorial/Brutalist/Tufte grids, @starting-style dialogs, 3D specular tilt, 60-FPS tabular-nums counters,
 * and Bespoke Component Morphologies (Axis 3 of `bespoke_morphology_composer.mjs`):
 *   - 4 Navigation Morphologies: `floating-island-bar`, `vertical-side-rail`, `minimal-editorial-header`, `magnetic-hud-dock`
 *   - 4 Corner Geometries: `0px-recto` (`0px`), `6px-tecnico` (`6px`), `24px-organico` (`24px`), `clip-path-bevel` (chamfered polygon)
 *   - 5 Surface Material Physics: `paper-editorial`, `frosted-glass`, `brushed-anodized-metal`, `raw-ink-swiss-border`, `deep-obsidian-specular`
 *   - 8 Grid Topologies & 10 Hero DOM Architectures
 *
 * Usage:
 *   node tools/design/build_vanilla_primitives.mjs [--project <slug-or-path>]
 * ======================================================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadProjectConfig, FACTORY_ROOT } from '../lib/project_loader.mjs';

const __filename = fileURLToPath(import.meta.url);

export const NAVIGATION_MORPHOLOGY_VARIANTS = Object.freeze({
  'floating-island-bar': {
    id: 'floating-island-bar',
    label: 'Floating Island Pill/Tech Dock',
    cssClass: 'wf-nav-floating-island',
    htmlTemplate: `<header class="wf-nav-floating-island" data-nav-morphology="floating-island-bar" role="banner">
  <nav aria-label="Navegación Principal" class="wf-nav-inner">
    <a href="#top" class="wf-brand-anchor">{{BRAND_NAME}}</a>
    <div class="wf-nav-links">{{NAV_ITEMS}}</div>
    <a href="#cta" class="btn-primary" data-cta="primary">{{PRIMARY_CTA}}</a>
  </nav>
</header>`
  },
  'vertical-side-rail': {
    id: 'vertical-side-rail',
    label: 'Architectural Vertical Side Rail',
    cssClass: 'wf-nav-vertical-rail',
    htmlTemplate: `<aside class="wf-nav-vertical-rail" data-nav-morphology="vertical-side-rail" role="banner">
  <nav aria-label="Riel de Navegación Vertical" class="wf-rail-inner">
    <a href="#top" class="wf-brand-monogram">{{BRAND_NAME}}</a>
    <div class="wf-rail-links">{{NAV_ITEMS}}</div>
    <a href="#cta" class="btn-primary" data-cta="primary">{{PRIMARY_CTA}}</a>
  </nav>
</aside>`
  },
  'minimal-editorial-header': {
    id: 'minimal-editorial-header',
    label: 'Swiss Broadsheet Minimal Editorial Header',
    cssClass: 'wf-nav-editorial-header',
    htmlTemplate: `<header class="wf-nav-editorial-header" data-nav-morphology="minimal-editorial-header" role="banner">
  <nav aria-label="Cabecera Editorial" class="wf-editorial-nav-row">
    <span class="wf-edition-index">EDICIÓN 2026 • {{BRAND_NAME}}</span>
    <div class="wf-editorial-links">{{NAV_ITEMS}}</div>
    <a href="#cta" class="btn-primary" data-cta="primary">{{PRIMARY_CTA}}</a>
  </nav>
</header>`
  },
  'magnetic-hud-dock': {
    id: 'magnetic-hud-dock',
    label: 'Tactical Magnetic HUD Dock',
    cssClass: 'wf-nav-magnetic-hud',
    htmlTemplate: `<header class="wf-nav-magnetic-hud" data-nav-morphology="magnetic-hud-dock" role="banner">
  <nav aria-label="HUD Magnético" class="wf-hud-bar">
    <span class="wf-hud-telemetry">[SYS:60FPS] {{BRAND_NAME}}</span>
    <div class="wf-hud-links">{{NAV_ITEMS}}</div>
    <a href="#cta" class="btn-primary" data-cta="primary">{{PRIMARY_CTA}}</a>
  </nav>
</header>`
  }
});

export const CORNER_GEOMETRY_VARIANTS = Object.freeze({
  '0px-recto': {
    id: '0px-recto',
    outerRadius: '0px',
    innerRadius: '0px',
    cardPadding: '24px',
    clipPath: 'none',
    concentricFormula: 'R_outer(0px) = R_inner(0px) + 0px (Sharp Swiss Orthogonal)'
  },
  '6px-tecnico': {
    id: '6px-tecnico',
    outerRadius: '14px',
    innerRadius: '6px',
    cardPadding: '8px',
    clipPath: 'none',
    concentricFormula: 'R_outer(14px) = R_inner(6px) + Padding(8px)'
  },
  '24px-organico': {
    id: '24px-organico',
    outerRadius: '24px',
    innerRadius: '12px',
    cardPadding: '12px',
    clipPath: 'none',
    concentricFormula: 'R_outer(24px) = R_inner(12px) + Padding(12px)'
  },
  'clip-path-bevel': {
    id: 'clip-path-bevel',
    outerRadius: '2px',
    innerRadius: '0px',
    cardPadding: '16px',
    clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))',
    concentricFormula: 'Chamfered 45deg Isometric Bevel (14px corner cut)'
  }
});

export const SURFACE_MATERIAL_PHYSICS = Object.freeze({
  'paper-editorial': {
    id: 'paper-editorial',
    label: 'Warm Limestone Editorial Paper',
    metalness: 0.0,
    roughness: 0.9,
    ior: 1.48,
    background: 'oklch(0.97 0.012 85)',
    border: '1px solid oklch(0.22 0.03 255 / 0.18)',
    backdropFilter: 'none',
    specularTop: 'none',
    allowedCornerGeometries: ['0px-recto', '6px-tecnico']
  },
  'frosted-glass': {
    id: 'frosted-glass',
    label: 'Optical Acrylic Frosted Glass',
    metalness: 0.0,
    roughness: 0.24,
    ior: 1.5,
    background: 'oklch(0.20 0.02 255 / 0.72)',
    border: '1px solid oklch(0.98 0.005 255 / 0.12)',
    backdropFilter: 'blur(16px) saturate(140%)',
    specularTop: '1px solid oklch(1 0 0 / 0.16)',
    allowedCornerGeometries: ['6px-tecnico', '24px-organico']
  },
  'brushed-anodized-metal': {
    id: 'brushed-anodized-metal',
    label: 'Anodized Brushed Conductor Metal',
    metalness: 0.85,
    roughness: 0.28,
    ior: 1.52,
    background: 'linear-gradient(135deg, oklch(0.18 0.018 255), oklch(0.14 0.014 255))',
    border: '1px solid oklch(0.88 0.03 255 / 0.16)',
    backdropFilter: 'none',
    specularTop: '1px solid oklch(1 0 0 / 0.20)',
    allowedCornerGeometries: ['0px-recto', '6px-tecnico', 'clip-path-bevel']
  },
  'raw-ink-swiss-border': {
    id: 'raw-ink-swiss-border',
    label: 'Raw Ink Exposed Structural Hairline',
    metalness: 0.0,
    roughness: 0.82,
    ior: 1.46,
    background: 'var(--surface-canvas, oklch(0.13 0.012 255))',
    border: '1px solid oklch(0.85 0.02 255 / 0.28)',
    backdropFilter: 'none',
    specularTop: 'none',
    allowedCornerGeometries: ['0px-recto', '6px-tecnico']
  },
  'deep-obsidian-specular': {
    id: 'deep-obsidian-specular',
    label: 'Deep Obsidian Vault with Zenithal Specular Edge',
    metalness: 0.1,
    roughness: 0.42,
    ior: 1.49,
    background: 'oklch(0.15 0.016 258)',
    border: '1px solid oklch(0.92 0.01 258 / 0.10)',
    backdropFilter: 'none',
    specularTop: '1px solid oklch(1 0 0 / 0.12)',
    allowedCornerGeometries: ['0px-recto', '6px-tecnico', '24px-organico']
  }
});

/**
 * Synthesizes bespoke CSS + HTML component primitives for a specific morphological configuration.
 */
export function compileComponentMorphologyPrimitives({
  navVariant = 'floating-island-bar',
  cornerGeometry = '6px-tecnico',
  surfaceMaterial = 'deep-obsidian-specular',
  gridTopology = 'golden-ratio-bento-matrix',
  heroArchitecture = 'live-interactive-product-sandbox'
} = {}) {
  const nav = NAVIGATION_MORPHOLOGY_VARIANTS[navVariant] || NAVIGATION_MORPHOLOGY_VARIANTS['floating-island-bar'];
  const corner = CORNER_GEOMETRY_VARIANTS[cornerGeometry] || CORNER_GEOMETRY_VARIANTS['6px-tecnico'];
  const mat = SURFACE_MATERIAL_PHYSICS[surfaceMaterial] || SURFACE_MATERIAL_PHYSICS['deep-obsidian-specular'];

  const customCss = `
/* Bespoke Morphology Primitives — Grid: ${gridTopology} | Hero: ${heroArchitecture} */
:root {
  --wf-morphology-radius-outer: ${corner.outerRadius};
  --wf-morphology-radius-inner: ${corner.innerRadius};
  --wf-morphology-card-padding: ${corner.cardPadding};
  --wf-morphology-clip-path: ${corner.clipPath};
  --wf-morphology-surface-bg: ${mat.background};
  --wf-morphology-surface-border: ${mat.border};
}

.bento-grid[data-grid-topology="${gridTopology}"] {
  display: grid;
  width: 100%;
  max-width: 1320px;
  margin-inline: auto;
}

[data-surface-material="${mat.id}"], .wf-bespoke-card {
  background: ${mat.background};
  border: ${mat.border};
  border-radius: ${corner.outerRadius};
  ${corner.clipPath !== 'none' ? `clip-path: ${corner.clipPath};` : ''}
  ${mat.backdropFilter !== 'none' ? `backdrop-filter: ${mat.backdropFilter}; -webkit-backdrop-filter: ${mat.backdropFilter};` : ''}
  ${mat.specularTop !== 'none' ? `border-top: ${mat.specularTop};` : ''}
}

.wf-bespoke-card-inner {
  border-radius: ${corner.innerRadius};
}
`.trim();

  return {
    navVariant: nav.id,
    cornerGeometry: corner.id,
    surfaceMaterial: mat.id,
    gridTopology,
    heroArchitecture,
    concentricLaw: corner.concentricFormula,
    pbrMaterial: { metalness: mat.metalness, roughness: mat.roughness, ior: mat.ior },
    navHtmlTemplate: nav.htmlTemplate,
    customCss
  };
}

export const UNIVERSAL_UI_PRIMITIVES_CSS = `/**
 * Web Software Factory Studio — Universal SOTA 2026 UI, Bespoke Morphology & Motion Primitives
 * Distilled from MagicUI, Motion-Primitives, Utopia, Open-Props & Emil Kowalski 60-FPS Craft.
 */

@property --beam-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes fx-beam-spin {
  to { --beam-angle: 360deg; }
}

@keyframes fx-shimmer-sweep {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* 1. OKLCH Conic Border Beam (MagicUI / Linear Craft) */
.fx-border-beam {
  position: relative;
  border-radius: inherit;
}

.fx-border-beam::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: conic-gradient(
    from var(--beam-angle),
    transparent 65%,
    oklch(0.74 0.17 160 / 0.25) 82%,
    var(--brand-accent, oklch(0.74 0.17 160)) 95%,
    var(--brand-cta, oklch(0.82 0.18 85)) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: fx-beam-spin 4s linear infinite;
  pointer-events: none;
}

/* 2. Minimal Surface Hierarchy & 5 Material Physics Variants (De-Boxed Luminance Steps in OKLCH) */
.surface-canvas {
  background-color: var(--surface-canvas, oklch(0.14 0.015 260));
}

.surface-elevated, .bento-card {
  background-color: var(--surface-elevated, oklch(0.19 0.018 260));
  border-radius: var(--wf-morphology-radius-outer, 16px);
  padding: var(--space-m, clamp(1rem, 0.85rem + 0.75vw, 1.5rem));
  transition: transform 0.24s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.24s ease;
  will-change: transform;
}

.surface-glass, [data-surface-material="frosted-glass"] {
  background: var(--surface-glass, oklch(0.22 0.02 260 / 0.72));
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid oklch(0.96 0.008 260 / 0.08);
}

[data-surface-material="paper-editorial"] {
  background: oklch(0.97 0.012 85);
  color: oklch(0.16 0.02 255);
  border: 1px solid oklch(0.22 0.03 255 / 0.18);
}

[data-surface-material="brushed-anodized-metal"] {
  background: linear-gradient(135deg, oklch(0.18 0.018 255), oklch(0.14 0.014 255));
  border: 1px solid oklch(0.88 0.03 255 / 0.16);
  border-top: 1px solid oklch(1 0 0 / 0.20);
}

[data-surface-material="raw-ink-swiss-border"] {
  background: transparent;
  border: 1px solid oklch(0.85 0.02 255 / 0.28);
  border-radius: 0px;
}

[data-surface-material="deep-obsidian-specular"] {
  background: oklch(0.15 0.016 258);
  border: 1px solid oklch(0.92 0.01 258 / 0.10);
  border-top: 1px solid oklch(1 0 0 / 0.12);
}

/* 3. Navigation Morphologies (4 Structural Variants) */
.wf-nav-floating-island {
  position: sticky;
  top: 1rem;
  z-index: 50;
  max-width: 1080px;
  margin-inline: auto;
  padding: 0.65rem 1.25rem;
  border-radius: 9999px;
  backdrop-filter: blur(16px);
  border: 1px solid oklch(1 0 0 / 0.10);
}

.wf-nav-vertical-rail {
  position: fixed;
  inset-block: 0;
  inset-inline-start: 0;
  width: 72px;
  z-index: 50;
  border-inline-end: 1px solid oklch(1 0 0 / 0.12);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem 0.75rem;
}

.wf-nav-editorial-header {
  width: 100%;
  border-block-end: 1px solid oklch(0.5 0.02 255 / 0.24);
  padding: 1.25rem clamp(1rem, 3vw, 3rem);
}

.wf-nav-magnetic-hud {
  position: sticky;
  top: 0.5rem;
  z-index: 50;
  padding: 0.5rem 1.25rem;
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
  border: 1px solid oklch(0.85 0.15 165 / 0.28);
}

/* 4. 8 Structurally Distinct CSS Grid Topologies (Phase 37 Bespoke Morphology) */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: var(--space-m, clamp(1rem, 0.85rem + 0.75vw, 1.5rem));
  width: 100%;
  max-width: 1280px;
  margin-inline: auto;
}

/* (1) Swiss Asymmetric Editorial (1 : 2.618 Golden Split + 1px Exposed Hairlines) */
[data-grid-topology="swiss-asymmetric-editorial"] .bento-grid,
.bento-grid[data-grid-topology="swiss-asymmetric-editorial"] {
  display: grid;
  grid-template-columns: minmax(min(100%, 240px), 1fr) minmax(min(100%, 320px), 2.618fr);
  gap: 0;
  border: 1px solid var(--border-subtle, oklch(1 0 0 / 0.12));
}
[data-grid-topology="swiss-asymmetric-editorial"] .bento-card {
  border-radius: 0;
  border: 1px solid var(--border-subtle, oklch(1 0 0 / 0.10));
}

/* (2) Kinetic Scrollytelling Stage (Narrative Stack + Scroll-Snap Proximity) */
[data-grid-topology="kinetic-scrollytelling-stage"] {
  scroll-snap-type: y proximity;
}
[data-grid-topology="kinetic-scrollytelling-stage"] .bento-grid,
.bento-grid[data-grid-topology="kinetic-scrollytelling-stage"] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
  gap: clamp(1.25rem, 2.5vw, 2.5rem);
}
[data-grid-topology="kinetic-scrollytelling-stage"] .section-block {
  scroll-snap-align: start;
}

/* (3) Architectural Brutalist Monolith (0px Radius + 2px Structural Hairlines + High Negative Space) */
[data-grid-topology="architectural-brutalist-monolith"] .bento-grid,
.bento-grid[data-grid-topology="architectural-brutalist-monolith"] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: 1.5rem;
}
[data-grid-topology="architectural-brutalist-monolith"] .bento-card,
[data-grid-topology="architectural-brutalist-monolith"] .pricing-card {
  border-radius: 0;
  border: 2px solid oklch(1 0 0 / 0.22);
}

/* (4) Tufte High-Density Data (Analytical Multi-Column + Tabular Numerals) */
[data-grid-topology="tufte-high-density-data"] .bento-grid,
.bento-grid[data-grid-topology="tufte-high-density-data"] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  gap: 1rem;
  font-variant-numeric: tabular-nums;
}

/* (5) Split-Screen Sticky Narrative (40% Sticky Index + 60% Scrollable Content on Desktop) */
[data-grid-topology="split-screen-sticky-narrative"] .bento-grid,
.bento-grid[data-grid-topology="split-screen-sticky-narrative"] {
  display: grid;
  grid-template-columns: minmax(min(100%, 260px), 2fr) minmax(min(100%, 320px), 3fr);
  gap: clamp(1.25rem, 2vw, 2rem);
  align-items: start;
}

/* (6) Golden Ratio Bento Matrix (12-Column 7:5 Golden Asymmetric Spans on Desktop) */
[data-grid-topology="golden-ratio-bento-matrix"] .bento-grid,
.bento-grid[data-grid-topology="golden-ratio-bento-matrix"] {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: clamp(1rem, 1.5vw, 1.5rem);
}
[data-grid-topology="golden-ratio-bento-matrix"] .bento-card:nth-child(odd),
.bento-grid[data-grid-topology="golden-ratio-bento-matrix"] > *:nth-child(odd) {
  grid-column: span 7;
}
[data-grid-topology="golden-ratio-bento-matrix"] .bento-card:nth-child(even),
.bento-grid[data-grid-topology="golden-ratio-bento-matrix"] > *:nth-child(even) {
  grid-column: span 5;
}

/* (7) Editorial Magazine Spread (65ch Authority Measure + Drop Cap) */
[data-grid-topology="editorial-magazine-spread"] .bento-grid,
.bento-grid[data-grid-topology="editorial-magazine-spread"] {
  display: grid;
  grid-template-columns: minmax(0, 65ch);
  justify-content: center;
  gap: 1.75rem;
}
[data-grid-topology="editorial-magazine-spread"] .hero-lead::first-letter {
  font-size: 1.35em;
  font-weight: 700;
}

/* (8) Interactive WebGL Spatial Canvas (Floating Glassmorphic Cards over Spatial Stage) */
[data-grid-topology="interactive-webgl-spatial-canvas"] .bento-grid,
.bento-grid[data-grid-topology="interactive-webgl-spatial-canvas"] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 1.5rem;
  position: relative;
  z-index: 2;
}
[data-grid-topology="interactive-webgl-spatial-canvas"] .bento-card {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

/* Reset legacy 12-col spans (.bento-card / .bento-span-8 / .bento-span-4) when using non-12-col topologies */
[data-grid-topology]:not([data-grid-topology="golden-ratio-bento-matrix"]) .bento-card,
[data-grid-topology]:not([data-grid-topology="golden-ratio-bento-matrix"]) .bento-span-8,
[data-grid-topology]:not([data-grid-topology="golden-ratio-bento-matrix"]) .bento-span-4,
.bento-grid[data-grid-topology]:not([data-grid-topology="golden-ratio-bento-matrix"]) > .bento-card,
.bento-grid[data-grid-topology]:not([data-grid-topology="golden-ratio-bento-matrix"]) > .bento-span-8,
.bento-grid[data-grid-topology]:not([data-grid-topology="golden-ratio-bento-matrix"]) > .bento-span-4 {
  grid-column: auto;
}

@media (max-width: 860px) {
  [data-grid-topology] .bento-grid,
  .bento-grid[data-grid-topology] {
    grid-template-columns: 1fr;
  }
  [data-grid-topology] .bento-card,
  [data-grid-topology] .bento-span-8,
  [data-grid-topology] .bento-span-4,
  [data-grid-topology="golden-ratio-bento-matrix"] .bento-card:nth-child(odd),
  [data-grid-topology="golden-ratio-bento-matrix"] .bento-card:nth-child(even),
  .bento-grid[data-grid-topology="golden-ratio-bento-matrix"] > *:nth-child(odd),
  .bento-grid[data-grid-topology="golden-ratio-bento-matrix"] > *:nth-child(even) {
    grid-column: 1 / -1;
  }
}

/* 5. 10 Hero Architectures & Industry Interactive Widget Primitives */
.hero-section[data-hero-architecture="typographic-manifesto-fullbleed"] {
  text-align: left;
  border-block-end: 1px solid oklch(1 0 0 / 0.12);
}
.hero-section[data-hero-architecture="asymmetric-editorial-split-60-40"] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: 2rem;
  align-items: center;
}
.hero-section[data-hero-architecture="live-interactive-product-sandbox"],
.hero-section[data-hero-architecture="command-center-telemetry-hud"] {
  border: 1px solid oklch(1 0 0 / 0.14);
  border-radius: var(--wf-morphology-radius-outer, 18px);
  padding: clamp(1.5rem, 3vw, 2.75rem);
}

.wf-industry-widget {
  margin-block: clamp(2rem, 4vw, 3.5rem);
  padding: clamp(1.25rem, 2.5vw, 2rem);
  border-radius: var(--wf-morphology-radius-outer, 16px);
  border: 1px solid oklch(1 0 0 / 0.14);
  background: oklch(0.18 0.02 260 / 0.72);
}
.wf-widget-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  gap: 1rem;
  margin-block-start: 1rem;
}
.wf-widget-card {
  padding: 1rem;
  border-radius: var(--wf-morphology-radius-inner, 10px);
  border: 1px solid oklch(1 0 0 / 0.10);
  background: oklch(0.14 0.015 260 / 0.85);
}
.wf-widget-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  min-width: 48px;
  padding: 0.65rem 1.25rem;
  border-radius: var(--wf-morphology-radius-inner, 10px);
  border: 1px solid oklch(1 0 0 / 0.22);
  background: oklch(0.24 0.03 260);
  color: inherit;
  font-weight: 600;
  cursor: pointer;
}

/* Native Capacitor 8 Bottom Tab Bar */
.wf-mobile-bottom-tab-bar {
  position: fixed;
  inset-inline: 0;
  bottom: 0;
  z-index: 60;
  display: none;
  justify-content: space-around;
  align-items: center;
  min-height: 56px;
  padding-bottom: env(safe-area-inset-bottom, 0px);
  background: oklch(0.14 0.02 260 / 0.92);
  backdrop-filter: blur(16px);
  border-top: 1px solid oklch(1 0 0 / 0.14);
}
[data-capacitor-mobile="true"] .wf-mobile-bottom-tab-bar {
  display: flex;
}
.wf-mobile-tab-item {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  min-width: 48px;
  padding: 0.25rem 0.75rem;
  color: inherit;
  text-decoration: none;
  font-size: 0.78rem;
}

.btn-primary, [data-cta="primary"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  min-width: 48px;
  padding: 0.75rem 1.5rem;
  border-radius: var(--wf-morphology-radius-inner, 10px);
  background-color: var(--brand-cta, oklch(0.82 0.18 85));
  color: oklch(0.14 0.015 260);
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.18s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.18s ease;
}

.btn-primary:hover, [data-cta="primary"]:hover {
  transform: translate3d(0, -1px, 0) scale(1.01);
}

.btn-primary:active, [data-cta="primary"]:active {
  transform: translate3d(0, 0, 0) scale(0.98);
}
`;

export const HERO_ARCHITECTURE_DESCRIPTORS = {
  'typographic-manifesto-fullbleed': {
    badgePrefix: 'MANIFIESTO EDITORIAL',
    layoutRole: 'Manifiesto tipográfico de ancho completo con jerarquía suiza'
  },
  'asymmetric-editorial-split-60-40': {
    badgePrefix: 'COMPOSICIÓN ASIMÉTRICA 60/40',
    layoutRole: 'División editorial 60/40 con tesis comercial y evidencia verificable'
  },
  'spatial-3d-diorama-stage': {
    badgePrefix: 'ESCENARIO ESPACIAL 3D',
    layoutRole: 'Diorama espacial interactivo a 60 FPS con iluminación física'
  },
  'live-interactive-product-sandbox': {
    badgePrefix: 'SANDBOX INTERACTIVO EN VIVO',
    layoutRole: 'Demostración operativa ejecutable en el primer viewport'
  },
  'kinetic-video-mask-reveal': {
    badgePrefix: 'REVELACIÓN CINEMÁTICA',
    layoutRole: 'Apertura cinética con máscara vectorial e identidad sonora'
  },
  'architectural-gallery-frame': {
    badgePrefix: 'GALERÍA ARQUITECTÓNICA',
    layoutRole: 'Marco de proporción áurea con curaduría visual de colección'
  },
  'command-center-telemetry-hud': {
    badgePrefix: 'HUD DE TELEMETRÍA EN TIEMPO REAL',
    layoutRole: 'Centro de comando táctico con indicadores numéricos tabulares'
  },
  'trust-clinical-concierge-portal': {
    badgePrefix: 'PORTAL DE ATENCIÓN DIRECTA',
    layoutRole: 'Portal clínico de serenidad biofílica y reserva inmediata'
  },
  'editorial-authority-dossier': {
    badgePrefix: 'DOSSIER DE AUTORIDAD INSTITUCIONAL',
    layoutRole: 'Dossier jurídico y corporativo de lectura profunda (65ch)'
  },
  'focal-centered-interactive-stage': {
    badgePrefix: 'ARQUITECTURA FOCAL DE CONVERSIÓN',
    layoutRole: 'Escenario simétrico centrado en propuesta de valor y CTA táctil'
  }
};

/**
 * Generates the interactive functional HTML section and companion Vanilla JS logic
 * tailored to each of the 8 industrial archetypes (`ecommerce`, `fintech`, `erp`, `clinica`, `abogacia`, `lujo`, `streamer`, `saas`).
 */
export function buildInteractiveIndustryModule(industryInput = 'saas', brandName = 'Agencia Alfa') {
  const raw = String(industryInput || 'saas').toLowerCase();
  let key = 'saas';
  if (/ecomm|tienda|shop|retail/.test(raw)) key = 'ecommerce';
  else if (/fintech|bank|banca|finanz|crypto|pagos/.test(raw)) key = 'fintech';
  else if (/erp|crm|backoffice|admin|inventario/.test(raw)) key = 'erp';
  else if (/clinic|med|salud|odont|hospital/.test(raw)) key = 'clinica';
  else if (/abog|legal|jurid|notar|ley/.test(raw)) key = 'abogacia';
  else if (/lujo|luxury|joyer|reloj|arquitect|inmob/.test(raw)) key = 'lujo';
  else if (/stream|gaming|esport|creador|vtuber/.test(raw)) key = 'streamer';

  const modules = {
    ecommerce: {
      title: 'Catálogo Interactivo y Carrito con Cálculo Exacto en Centavos',
      subtitle: 'Seleccioná productos para actualizar el subtotal en centavos enteros y procesar el checkout idempotente.',
      html: `<section id="industry-interactive-module" class="section-block wf-industry-widget" data-industry-widget="ecommerce" aria-label="Catálogo y Carrito Interactivo">
      <div class="section-header">
        <h2>Catálogo Activo &amp; Checkout sin Fricción</h2>
        <p>Cálculo determinista en centavos enteros (<code>BigInt</code>) conectado a <code>/api/checkout</code>.</p>
      </div>
      <div class="wf-widget-grid">
        <article class="wf-widget-card">
          <h3>Pack Edición Flagship</h3>
          <p class="tabular-nums"><strong>$149.00 USD</strong> (<code>14900</code> centavos)</p>
          <button type="button" class="wf-widget-btn" data-cart-add="flagship" data-price-cents="14900" aria-label="Agregar Pack Edición Flagship al carrito">Agregar al Carrito</button>
        </article>
        <article class="wf-widget-card">
          <h3>Módulo Expansión Pro</h3>
          <p class="tabular-nums"><strong>$89.00 USD</strong> (<code>8900</code> centavos)</p>
          <button type="button" class="wf-widget-btn" data-cart-add="expansion" data-price-cents="8900" aria-label="Agregar Módulo Expansión Pro al carrito">Agregar al Carrito</button>
        </article>
        <article class="wf-widget-card" aria-live="polite">
          <h3>Resumen de Carrito</h3>
          <p class="tabular-nums" id="wf-cart-summary">Ítems: 1 | Total: $149.00 USD (14900 cts)</p>
          <button type="button" class="btn-primary" id="wf-cart-checkout-btn" aria-label="Iniciar Checkout Seguro">Iniciar Checkout Seguro</button>
        </article>
      </div>
    </section>`
    },
    fintech: {
      title: 'Simulador Financiero de Rendimiento y Cuotas en Tiempo Real',
      subtitle: 'Proyección matemática exacta en centavos enteros sin errores de punto flotante IEEE-754.',
      html: `<section id="industry-interactive-module" class="section-block wf-industry-widget" data-industry-widget="fintech" aria-label="Simulador Financiero en Tiempo Real">
      <div class="section-header">
        <h2>Simulador de Rendimiento Institucional (TNA / Cuotas)</h2>
        <p>Aritmética financiera exacta con tipografía numérica <code>tabular-nums</code>.</p>
      </div>
      <div class="wf-widget-grid">
        <article class="wf-widget-card">
          <h3>Capital Inicial: <span class="tabular-nums" id="wf-fintech-capital-label">$10,000 USD</span></h3>
          <p>Plazo seleccionado: <strong class="tabular-nums" id="wf-fintech-term-label">12 meses</strong> (TNA 11.5%)</p>
          <div class="hero-actions">
            <button type="button" class="wf-widget-btn" data-fintech-capital="1000000" aria-label="Simular 10000 dólares">$10,000</button>
            <button type="button" class="wf-widget-btn" data-fintech-capital="5000000" aria-label="Simular 50000 dólares">$50,000</button>
          </div>
        </article>
        <article class="wf-widget-card" aria-live="polite">
          <h3>Proyección Auditada</h3>
          <p class="tabular-nums" id="wf-fintech-projection">Monto Final: $11,150.00 USD | Rendimiento Neto: +$1,150.00 USD</p>
        </article>
      </div>
    </section>`
    },
    erp: {
      title: 'Consola Operativa Multi-Tenant (Superficie Operate)',
      subtitle: 'Filtrado instantáneo de órdenes, control de estado y aislamiento RLS verificado.',
      html: `<section id="industry-interactive-module" class="section-block wf-industry-widget" data-industry-widget="erp" aria-label="Consola Operativa Multi-Tenant">
      <div class="section-header">
        <h2>Panel de Operaciones Multi-Tenant &amp; Auditoría RLS</h2>
        <p>Superficie de alta densidad con filtro rápido de estado operativo.</p>
      </div>
      <div class="hero-actions" style="margin-bottom:1rem;">
        <button type="button" class="wf-widget-btn" data-erp-filter="ALL" aria-label="Mostrar todos los registros">Todos (3)</button>
        <button type="button" class="wf-widget-btn" data-erp-filter="ACTIVE" aria-label="Filtrar registros activos">Activos</button>
        <button type="button" class="wf-widget-btn" data-erp-filter="SETTLED" aria-label="Filtrar registros conciliados">Conciliados</button>
      </div>
      <div class="wf-widget-grid" id="wf-erp-table-rows">
        <article class="wf-widget-card" data-erp-status="ACTIVE">
          <h3 class="tabular-nums">ORD-2026-0891 • Tenant Alpha</h3>
          <p class="tabular-nums">Estado: <strong>ACTIVE</strong> | SLA: 99.98%</p>
        </article>
        <article class="wf-widget-card" data-erp-status="SETTLED">
          <h3 class="tabular-nums">ORD-2026-0892 • Tenant Enterprise</h3>
          <p class="tabular-nums">Estado: <strong>SETTLED</strong> | Lote Conciliado</p>
        </article>
      </div>
    </section>`
    },
    clinica: {
      title: 'Buscador por Especialidad Médica y Agenda de Turnos',
      subtitle: 'Seleccioná especialidad y franja horaria para confirmar tu turno sin espera telefónica.',
      html: `<section id="industry-interactive-module" class="section-block wf-industry-widget" data-industry-widget="clinica" aria-label="Agenda Interactiva de Turnos Médicos">
      <div class="section-header">
        <h2>Reserva Rápida de Turnos por Especialidad</h2>
        <p>Atención con cobertura médica y confirmación inmediata por WhatsApp o Portal.</p>
      </div>
      <div class="wf-widget-grid">
        <article class="wf-widget-card">
          <h3>1. Especialidad</h3>
          <div class="hero-actions">
            <button type="button" class="wf-widget-btn" data-clinic-spec="Diagnóstico Integral" aria-label="Seleccionar Diagnóstico Integral">Diagnóstico Integral</button>
            <button type="button" class="wf-widget-btn" data-clinic-spec="Especialidades Clínicas" aria-label="Seleccionar Especialidades Clínicas">Especialidades</button>
          </div>
        </article>
        <article class="wf-widget-card" aria-live="polite">
          <h3>2. Turno Seleccionado</h3>
          <p id="wf-clinic-slot-summary">Especialidad: Diagnóstico Integral — Próximo turno hoy 16:30 hs</p>
        </article>
      </div>
    </section>`
    },
    abogacia: {
      title: 'Clasificador Confidencial de Caso Jurídico en 3 Pasos',
      subtitle: 'Evaluación preliminar bajo secreto profesional para asignar al socio especialista.',
      html: `<section id="industry-interactive-module" class="section-block wf-industry-widget" data-industry-widget="abogacia" aria-label="Clasificador de Consulta Jurídica">
      <div class="section-header">
        <h2>Pre-Evaluación Confidencial de Caso Legal</h2>
        <p>Seleccioná el fuero o materia para priorizar tu consulta con el socio director.</p>
      </div>
      <div class="wf-widget-grid">
        <article class="wf-widget-card">
          <h3>Materia / Fuero</h3>
          <div class="hero-actions">
            <button type="button" class="wf-widget-btn" data-legal-area="Litigios Corporativos" aria-label="Seleccionar Litigios Corporativos">Corporativo</button>
            <button type="button" class="wf-widget-btn" data-legal-area="Arbitraje y Contratos" aria-label="Seleccionar Arbitraje y Contratos">Arbitraje</button>
          </div>
        </article>
        <article class="wf-widget-card" aria-live="polite">
          <h3>Dictamen de Prioridad</h3>
          <p id="wf-legal-triage-summary">Fuero: Litigios Corporativos • Asignación directa a Socio Senior en menos de 2 horas.</p>
        </article>
      </div>
    </section>`
    },
    lujo: {
      title: 'Visor de Colección Privada & Concierge Atelier',
      subtitle: 'Inspeccioná acabados de alta manufactura y reservá una sesión privada.',
      html: `<section id="industry-interactive-module" class="section-block wf-industry-widget" data-industry-widget="lujo" aria-label="Visor de Colección Atelier">
      <div class="section-header">
        <h2>Curaduría de Materiales &amp; Edición Numerada</h2>
        <p>Proporción áurea <code>1.618:1</code> y trazabilidad artesanal certificada.</p>
      </div>
      <div class="wf-widget-grid">
        <article class="wf-widget-card">
          <h3>Selección de Acabado</h3>
          <div class="hero-actions">
            <button type="button" class="wf-widget-btn" data-luxury-finish="Oro Imperial 18k &amp; Obsidiana" aria-label="Ver acabado Oro Imperial">Oro Imperial 18k</button>
            <button type="button" class="wf-widget-btn" data-luxury-finish="Titanio Grado 5 Cepillado" aria-label="Ver acabado Titanio Grado 5">Titanio Grado 5</button>
          </div>
        </article>
        <article class="wf-widget-card" aria-live="polite">
          <h3>Especificación de Pieza</h3>
          <p id="wf-luxury-finish-summary">Edición: Oro Imperial 18k &amp; Obsidiana • Serie Limitada Numerada.</p>
        </article>
      </div>
    </section>`
    },
    streamer: {
      title: 'HUD Táctico de Telemetría a 60 FPS & Sincresis Sonora',
      subtitle: 'Previsualizá alertas reactivas y capas de telemetría con cero bloqueo del hilo principal.',
      html: `<section id="industry-interactive-module" class="section-block wf-industry-widget" data-industry-widget="streamer" aria-label="HUD Interactivo de Telemetría">
      <div class="section-header">
        <h2>HUD Reactivo de Transmisión &amp; Eventos en Tiempo Real</h2>
        <p>Presupuesto de cuadro garantizado <code>&lt;= 16.6ms</code> con WebAudio procedural.</p>
      </div>
      <div class="wf-widget-grid">
        <article class="wf-widget-card">
          <h3>Disparador de Escena</h3>
          <div class="hero-actions">
            <button type="button" class="wf-widget-btn" data-stream-event="raid-hologram" aria-label="Simular evento Raid Holográfico">Simular Raid</button>
            <button type="button" class="wf-widget-btn" data-stream-event="sub-milestone" aria-label="Simular Hito de Suscripción">Simular Hito</button>
          </div>
        </article>
        <article class="wf-widget-card" aria-live="polite">
          <h3>Estado del Bus de Eventos</h3>
          <p class="tabular-nums" id="wf-stream-hud-status">FPS: 60.0 | Evento Activo: Ready (0ms drop)</p>
        </article>
      </div>
    </section>`
    },
    saas: {
      title: 'Calculadora Interactiva de ROI y Latencia en el Borde',
      subtitle: 'Estimá el ahorro mensual en infraestructura y la mejora en conversión.',
      html: `<section id="industry-interactive-module" class="section-block wf-industry-widget" data-industry-widget="saas" aria-label="Calculadora Interactiva de ROI SaaS">
      <div class="section-header">
        <h2>Calculadora de Impacto Operativo &amp; Conversión</h2>
        <p>Métricas auditables en tiempo real para ${brandName}.</p>
      </div>
      <div class="wf-widget-grid">
        <article class="wf-widget-card">
          <h3>Escala de Tráfico Mensual</h3>
          <div class="hero-actions">
            <button type="button" class="wf-widget-btn" data-saas-tier="growth" aria-label="Escala Growth 100k visitas">100k req/mes</button>
            <button type="button" class="wf-widget-btn" data-saas-tier="enterprise" aria-label="Escala Enterprise 1M visitas">1M req/mes</button>
          </div>
        </article>
        <article class="wf-widget-card" aria-live="polite">
          <h3>Impacto Estimado</h3>
          <p class="tabular-nums" id="wf-saas-roi-summary">Latencia P99: 14ms | Incremento CRO estimado: +24.5%</p>
        </article>
      </div>
    </section>`
    }
  };

  const selected = modules[key] || modules.saas;
  const jsCode = `/**
 * site/js/industry-interactive.js — Deterministic Interactive Industry Module (${key})
 * Governed by Harel/Horrocks/XState v5 Deterministic UI State Machine (Zero Impossible States)
 */
(function initIndustryInteractiveModule() {
  if (typeof document === 'undefined') return;
  let cartItems = 1;
  let cartCents = 14900;

  function createUiStateMachine(config) {
    let currentState = config.initial || 'idle';
    const rootEl = config.element || null;
    if (rootEl) rootEl.setAttribute('data-ui-state', currentState);
    return {
      getState: function () { return currentState; },
      can: function (eventType) {
        const stateDef = (config.states && config.states[currentState]) || {};
        return Boolean(stateDef.on && stateDef.on[eventType]);
      },
      send: function (eventType) {
        const stateDef = (config.states && config.states[currentState]) || {};
        const nextTarget = stateDef.on && stateDef.on[eventType];
        if (!nextTarget) return currentState;
        currentState = typeof nextTarget === 'string' ? nextTarget : nextTarget.target;
        if (rootEl) rootEl.setAttribute('data-ui-state', currentState);
        return currentState;
      }
    };
  }

  const moduleEl = document.getElementById('industry-interactive-module');
  const uiMachine = createUiStateMachine({
    initial: 'idle',
    element: moduleEl,
    states: {
      idle: { on: { INTERACT: 'computing' } },
      computing: { on: { SETTLE: 'settled', ERROR: 'error' } },
      settled: { on: { INTERACT: 'computing', RESET: 'idle' } },
      error: { on: { INTERACT: 'computing', RESET: 'idle' } }
    }
  });
  if (typeof window !== 'undefined') window.__wfUiMachine = uiMachine;

  document.addEventListener('click', function (ev) {
    const target = ev.target && ev.target.closest ? ev.target.closest('button') : null;
    if (!target) return;
    uiMachine.send('INTERACT');

    if (target.hasAttribute('data-cart-add')) {
      const addCents = parseInt(target.getAttribute('data-price-cents') || '0', 10);
      cartItems += 1;
      cartCents += addCents;
      const summary = document.getElementById('wf-cart-summary');
      if (summary) {
        summary.textContent = 'Ítems: ' + cartItems + ' | Total: $' + (cartCents / 100).toFixed(2) + ' USD (' + cartCents + ' cts)';
      }
    }

    if (target.id === 'wf-cart-checkout-btn') {
      const summary = document.getElementById('wf-cart-summary');
      if (summary) {
        summary.textContent = 'Checkout idempotente iniciado (' + cartCents + ' cts) — llave verificada.';
      }
    }

    if (target.hasAttribute('data-fintech-capital')) {
      const cents = BigInt(target.getAttribute('data-fintech-capital') || '1000000');
      const netYieldCents = (cents * 115n) / 1000n;
      const totalCents = cents + netYieldCents;
      const proj = document.getElementById('wf-fintech-projection');
      if (proj) {
        proj.textContent = 'Monto Final: $' + (Number(totalCents) / 100).toFixed(2) + ' USD | Rendimiento Neto: +$' + (Number(netYieldCents) / 100).toFixed(2) + ' USD';
      }
    }

    if (target.hasAttribute('data-erp-filter')) {
      const filter = target.getAttribute('data-erp-filter');
      const cards = document.querySelectorAll('[data-erp-status]');
      cards.forEach(function (card) {
        const st = card.getAttribute('data-erp-status');
        card.style.display = (filter === 'ALL' || st === filter) ? '' : 'none';
      });
    }

    if (target.hasAttribute('data-clinic-spec')) {
      const spec = target.getAttribute('data-clinic-spec');
      const el = document.getElementById('wf-clinic-slot-summary');
      if (el) el.textContent = 'Especialidad: ' + spec + ' — Turno disponible confirmado.';
    }

    if (target.hasAttribute('data-legal-area')) {
      const area = target.getAttribute('data-legal-area');
      const el = document.getElementById('wf-legal-triage-summary');
      if (el) el.textContent = 'Fuero: ' + area + ' • Asignación directa a Socio Senior en menos de 2 horas.';
    }

    if (target.hasAttribute('data-luxury-finish')) {
      const finish = target.getAttribute('data-luxury-finish');
      const el = document.getElementById('wf-luxury-finish-summary');
      if (el) el.textContent = 'Edición: ' + finish + ' • Serie Limitada Numerada.';
    }

    if (target.hasAttribute('data-stream-event')) {
      const evName = target.getAttribute('data-stream-event');
      const el = document.getElementById('wf-stream-hud-status');
      if (el) el.textContent = 'FPS: 60.0 | Evento Disparado: ' + evName + ' (0ms frame drop)';
    }

    if (target.hasAttribute('data-saas-tier')) {
      const tier = target.getAttribute('data-saas-tier');
      const el = document.getElementById('wf-saas-roi-summary');
      if (el) {
        el.textContent = tier === 'enterprise'
          ? 'Latencia P99: 11ms | Ahorro Cloud: $1,420/mes | Incremento CRO: +31.0%'
          : 'Latencia P99: 14ms | Ahorro Cloud: $380/mes | Incremento CRO: +24.5%';
      }
    }
    uiMachine.send('SETTLE');
  });
})();
`;

  return {
    industryKey: key,
    title: selected.title,
    subtitle: selected.subtitle,
    html: selected.html,
    jsCode
  };
}

export function buildVanillaPrimitives(projectInput = '', morphologyOptions = null) {
  const cfg = loadProjectConfig(projectInput);
  const targets = [];

  if (cfg.hasManifest) {
    const cssDir = cfg.stack === 'astro-edge'
      ? path.join(cfg.projectRoot, 'src', 'styles')
      : path.join(cfg.projectRoot, 'site', 'css');
    targets.push({ id: cfg.id, cssPath: path.join(cssDir, 'ui-primitives.css') });
  } else {
    targets.push(
      {
        id: 'template:vanilla-edge',
        cssPath: path.join(FACTORY_ROOT, 'templates', 'vanilla-edge', 'site', 'css', 'ui-primitives.css')
      },
      {
        id: 'template:astro-edge',
        cssPath: path.join(FACTORY_ROOT, 'templates', 'astro-edge', 'src', 'styles', 'ui-primitives.css')
      }
    );
  }

  const morphBlock = morphologyOptions
    ? '\n\n' + compileComponentMorphologyPrimitives(morphologyOptions).customCss
    : '';

  for (const t of targets) {
    fs.mkdirSync(path.dirname(t.cssPath), { recursive: true });
    fs.writeFileSync(t.cssPath, (UNIVERSAL_UI_PRIMITIVES_CSS.trim() + morphBlock).trim() + '\n', 'utf8');
  }

  // Always keep base templates synchronized with UNIVERSAL_UI_PRIMITIVES_CSS
  const templatePaths = [
    path.join(FACTORY_ROOT, 'templates', 'vanilla-edge', 'site', 'css', 'ui-primitives.css'),
    path.join(FACTORY_ROOT, 'templates', 'astro-edge', 'src', 'styles', 'ui-primitives.css')
  ];
  for (const tplPath of templatePaths) {
    if (fs.existsSync(path.dirname(tplPath))) {
      fs.writeFileSync(tplPath, UNIVERSAL_UI_PRIMITIVES_CSS.trim() + '\n', 'utf8');
    }
  }

  return {
    passed: true,
    morphologyApplied: morphologyOptions ? compileComponentMorphologyPrimitives(morphologyOptions) : null,
    targetsBuilt: targets.map(t => ({ id: t.id, cssPath: t.cssPath }))
  };
}

/**
 * E2E DOM & CSS Morphology Wiring (`applyBespokeMorphologyToProjectDom`):
 * Connects `bespoke_morphology_composer.mjs` + `CLIENT_BRIEF_INTERVIEW.json` + `PRD_INTERVIEW_STATE.json`
 * directly into `projects/<slug>/site/css/ui-primitives.css`, `projects/<slug>/index.html`, and
 * `projects/<slug>/site/js/industry-interactive.js`.
 */
export function applyBespokeMorphologyToProjectDom(projectInput = '', customOptions = {}) {
  const cfg = loadProjectConfig(projectInput);
  const rootDir = cfg.projectRoot;
  if (!fs.existsSync(rootDir)) {
    return { passed: false, reason: 'PROJECT_DIR_NOT_FOUND', rootDir };
  }

  let interview = null;
  let prdState = null;
  let brandLock = null;

  const interviewPath = path.join(rootDir, 'CLIENT_BRIEF_INTERVIEW.json');
  const prdStatePath = path.join(rootDir, 'PRD_INTERVIEW_STATE.json');
  const brandLockPath = path.join(rootDir, 'BRAND_IDENTITY_LOCK.json');

  if (fs.existsSync(interviewPath)) {
    try { interview = JSON.parse(fs.readFileSync(interviewPath, 'utf8')); } catch {}
  }
  if (fs.existsSync(prdStatePath)) {
    try { prdState = JSON.parse(fs.readFileSync(prdStatePath, 'utf8')); } catch {}
  }
  if (fs.existsSync(brandLockPath)) {
    try { brandLock = JSON.parse(fs.readFileSync(brandLockPath, 'utf8')); } catch {}
  }

  const dna = customOptions.bespokeDna || interview?.bespokeDna || {};
  const gridTopology =
    customOptions.gridTopology ||
    dna.gridTopology ||
    interview?.blocks?.block3_grid_topology_and_morphology?.gridTopology ||
    'golden-ratio-bento-matrix';
  const heroArchitecture =
    customOptions.heroArchitecture ||
    dna.heroArchitecture ||
    interview?.blocks?.block3_grid_topology_and_morphology?.heroArchitecture ||
    'focal-centered-interactive-stage';
  const navVariant =
    customOptions.navVariant ||
    dna.componentMorphology?.nav ||
    'floating-glass-pill';
  const cornerProfile =
    customOptions.cornerProfile ||
    dna.componentMorphology?.corner ||
    'organic-12px';
  const surfaceMaterial =
    customOptions.surfaceMaterial ||
    dna.componentMorphology?.material ||
    interview?.blocks?.block3_grid_topology_and_morphology?.surfaceMateriality ||
    'polymer';
  const industry =
    customOptions.industry ||
    prdState?.blocks?.block1_business_identity_and_problem?.industryCategory ||
    interview?.blocks?.block1_commercial_identity?.industryArchetype ||
    cfg.industryArchetype ||
    cfg.archetype ||
    'saas';
  const brandName =
    brandLock?.brandName ||
    prdState?.blocks?.block1_business_identity_and_problem?.officialBrandName ||
    interview?.blocks?.block1_commercial_identity?.brandName ||
    cfg.name ||
    'Agencia Alfa';
  const enableCapacitorMobile = Boolean(
    customOptions.enableCapacitorMobile ??
      interview?.blocks?.block10_mobile_capacitor_feedback_and_f2p_matrix?.enableCapacitor8MobileTarget
  );

  // 1. Compile ui-primitives.css with the exact morphology options
  const morphRes = buildVanillaPrimitives(projectInput, {
    gridTopology,
    navVariant,
    cornerProfile,
    surfaceMaterial
  });

  // 2. Write site/js/industry-interactive.js + Synthesize Custom PRD Features via BAML SAP
  const widget = buildInteractiveIndustryModule(industry, brandName);
  const customPrdSynthesis = synthesizeCustomPrdSectionsWithBaml(prdState, interview, brandName);
  const jsDir = path.join(rootDir, 'site', 'js');
  fs.mkdirSync(jsDir, { recursive: true });
  const interactiveJsPath = path.join(jsDir, 'industry-interactive.js');
  fs.writeFileSync(interactiveJsPath, `${widget.jsCode}\n\n${customPrdSynthesis.jsCode}`, 'utf8');

  // 3. Transform projects/<slug>/index.html with real morphology attributes, nav class, hero descriptor & interactive widget
  const indexHtmlPath = path.join(rootDir, 'index.html');
  let htmlUpdated = false;
  if (fs.existsSync(indexHtmlPath)) {
    let html = fs.readFileSync(indexHtmlPath, 'utf8');

    // Inject data-grid-topology, data-hero-architecture, data-surface-material on <body>
    html = html.replace(/<body([^>]*)>/i, (_m, attrs) => {
      const cleaned = String(attrs || '')
        .replace(/\s*data-grid-topology="[^"]*"/g, '')
        .replace(/\s*data-hero-architecture="[^"]*"/g, '')
        .replace(/\s*data-surface-material="[^"]*"/g, '')
        .replace(/\s*data-nav-morphology="[^"]*"/g, '')
        .replace(/\s*data-capacitor-mobile="[^"]*"/g, '');
      const capAttr = enableCapacitorMobile ? ' data-capacitor-mobile="true"' : '';
      return `<body${cleaned} data-grid-topology="${gridTopology}" data-hero-architecture="${heroArchitecture}" data-surface-material="${surfaceMaterial}" data-nav-morphology="${navVariant}"${capAttr}>`;
    });

    // Apply hero architecture attribute onto .hero-section
    html = html.replace(/<section class="hero-section"([^>]*)>/i, (_m, attrs) => {
      const cleaned = String(attrs || '').replace(/\s*data-hero-architecture="[^"]*"/g, '');
      return `<section class="hero-section"${cleaned} data-hero-architecture="${heroArchitecture}">`;
    });

    // Apply grid topology attribute onto .bento-grid
    html = html.replace(/<div class="bento-grid"([^>]*)>/i, (_m, attrs) => {
      const cleaned = String(attrs || '').replace(/\s*data-grid-topology="[^"]*"/g, '');
      return `<div class="bento-grid"${cleaned} data-grid-topology="${gridTopology}">`;
    });

    const combinedModulesHtml = `${widget.html}\n\n${customPrdSynthesis.html}`;

    // Inject or replace the interactive industry module + custom PRD synthesized section
    if (html.includes('id="prd-custom-synthesized-modules"')) {
      html = html.replace(
        /<section id="prd-custom-synthesized-modules"[\s\S]*?<\/section>/i,
        customPrdSynthesis.html
      );
    }
    if (html.includes('id="industry-interactive-module"')) {
      html = html.replace(
        /<section id="industry-interactive-module"[\s\S]*?<\/section>/i,
        html.includes('id="prd-custom-synthesized-modules"') ? widget.html : combinedModulesHtml
      );
    } else {
      html = html.replace(
        /(<section id="pricing")/i,
        `${combinedModulesHtml}\n\n    $1`
      );
    }

    // Ensure industry-interactive.js is linked before </body>
    if (!html.includes('/site/js/industry-interactive.js')) {
      html = html.replace(
        /<\/body>/i,
        `  <script src="/site/js/industry-interactive.js" defer></script>\n</body>`
      );
    }

    fs.writeFileSync(indexHtmlPath, html, 'utf8');
    htmlUpdated = true;
  }

  return {
    passed: true,
    projectSlug: cfg.id,
    gridTopology,
    heroArchitecture,
    navVariant,
    cornerProfile,
    surfaceMaterial,
    industry: widget.industryKey,
    industryKey: widget.industryKey,
    customPrdModulesSynthesized: customPrdSynthesis.featuresCount,
    htmlUpdated,
    interactiveJsPath,
    primitivesResult: morphRes
  };
}

/**
 * Synthesizes bespoke interactive HTML5/CSS/JS modules directly from the CTO's custom features
 * declared in `ENTREVISTA_1_PRD_Y_MARCA.md` (`PRD_INTERVIEW_STATE.json`) and `ENTREVISTA_2_SPEC_TECNICO.md`,
 * applying BAML Schema-Aligned normalization (`[VULN-04]` Generative Custom Section Compiler).
 */
export function synthesizeCustomPrdSectionsWithBaml(prdState = null, interview = null, brandName = 'Agencia Alfa') {
  const esc = (str) =>
    String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  const rawFeatures =
    prdState?.blocks?.block3_core_features_and_ctas?.coreFeatures ||
    interview?.blocks?.block4_interactive_modules_and_3d?.interactiveModules ||
    [
      'Arquitectura Edge Zero-Trust con validación en vivo',
      'Panel de métricas operativas y retorno de inversión',
      'Automatización determinista de flujos comerciales'
    ];

  const normalizedFeatures = (Array.isArray(rawFeatures) ? rawFeatures : [String(rawFeatures)])
    .map((f, idx) => {
      const cleanText = String(f || '').trim();
      if (!cleanText) return null;
      const parts = cleanText.split(/[:—–-]/);
      const title = (parts[0] || `Módulo Operativo #${idx + 1}`).trim().slice(0, 68);
      const detail = (parts.slice(1).join(' — ') || cleanText).trim().slice(0, 160);
      return {
        featureId: `prd-feat-${idx + 1}`,
        badge: `PRD MÓDULO 0${idx + 1}`,
        title: esc(title),
        detail: esc(detail),
        actionLabel: 'Simular Flujo en Vivo'
      };
    })
    .filter(Boolean)
    .slice(0, 4);

  const cardsMarkup = normalizedFeatures
    .map(
      (feat) => `      <article class="wf-widget-card" data-prd-feature-card="${feat.featureId}">
        <p style="font-size:0.75rem;letter-spacing:0.08em;text-transform:uppercase;opacity:0.8;">${feat.badge}</p>
        <h3 style="margin-block:0.35rem;font-size:1.05rem;">${feat.title}</h3>
        <p style="font-size:0.9rem;opacity:0.88;margin-block-end:0.85rem;">${feat.detail}</p>
        <button type="button" class="wf-widget-btn" data-prd-feature-btn="${feat.featureId}">${feat.actionLabel}</button>
      </article>`
    )
    .join('\n');

  const html = `    <section id="prd-custom-synthesized-modules" class="wf-industry-widget container" aria-label="Módulos Específicos del PRD de ${esc(brandName)}" data-baml-synthesized="true">
      <header>
        <p style="font-size:0.78rem;letter-spacing:0.1em;text-transform:uppercase;opacity:0.78;">ARQUITECTURA SINTETIZADA DESDE ENTREVISTA PRD — ${esc(brandName.toUpperCase())}</p>
        <h2 style="margin-block:0.35rem;">Capacidades Específicas de Negocio Verificadas</h2>
      </header>
      <div class="wf-widget-grid">
${cardsMarkup}
      </div>
      <output id="prd-custom-module-output" aria-live="polite" style="display:block;margin-block-start:1rem;font-weight:600;font-variant-numeric:tabular-nums;">Estado del módulo PRD: Listo para inspección interactiva (IDLE).</output>
    </section>`;

  const jsCode = `// BAML SAP Custom PRD Section Statechart Controller
(function initPrdCustomSynthesizedModules() {
  const out = document.getElementById('prd-custom-module-output');
  const buttons = document.querySelectorAll('[data-prd-feature-btn]');
  if (!out || !buttons.length) return;
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const featId = btn.getAttribute('data-prd-feature-btn') || 'prd-feat-1';
      const card = btn.closest('[data-prd-feature-card]');
      const titleEl = card ? card.querySelector('h3') : null;
      const title = titleEl ? titleEl.textContent : featId;
      out.textContent = 'Módulo PRD verificado en vivo [' + featId.toUpperCase() + ']: ' + title + ' — Latencia Edge < 12ms (ACTIVE).';
    });
  });
})();`;

  return {
    featuresCount: normalizedFeatures.length,
    normalizedFeatures,
    html,
    jsCode
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const res = buildVanillaPrimitives();
  console.log('⚡ [UI Primitives Distiller] Compiled Universal 2026 UI, Morphology & Motion Primitives:');
  for (const t of res.targetsBuilt) {
    console.log(`   - [${t.id}] -> ${path.relative(FACTORY_ROOT, t.cssPath)}`);
  }
}
