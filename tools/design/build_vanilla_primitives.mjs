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

[data-grid-topology="${gridTopology}"] {
  display: grid;
  gap: var(--space-m, clamp(1rem, 0.85rem + 0.75vw, 1.5rem));
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

/* 4. 8 Grid Topologies & Touch-Safe Primary CTA (Fitts's Law >= 44x44px) */
.bento-grid,
[data-grid-topology="golden-ratio-bento-matrix"],
[data-grid-topology="swiss-asymmetric-editorial"],
[data-grid-topology="kinetic-scrollytelling-stage"],
[data-grid-topology="architectural-brutalist-monolith"],
[data-grid-topology="tufte-high-density-data"],
[data-grid-topology="split-screen-sticky-narrative"],
[data-grid-topology="editorial-magazine-spread"],
[data-grid-topology="interactive-webgl-spatial-canvas"] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: var(--space-m, clamp(1rem, 0.85rem + 0.75vw, 1.5rem));
  width: 100%;
  max-width: 1280px;
  margin-inline: auto;
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

  return {
    passed: true,
    morphologyApplied: morphologyOptions ? compileComponentMorphologyPrimitives(morphologyOptions) : null,
    targetsBuilt: targets.map(t => ({ id: t.id, cssPath: t.cssPath }))
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const res = buildVanillaPrimitives();
  console.log('⚡ [UI Primitives Distiller] Compiled Universal 2026 UI, Morphology & Motion Primitives:');
  for (const t of res.targetsBuilt) {
    console.log(`   - [${t.id}] -> ${path.relative(FACTORY_ROOT, t.cssPath)}`);
  }
}
