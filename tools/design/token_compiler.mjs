#!/usr/bin/env node
/**
 * tools/design/token_compiler.mjs — W3C DTCG 2025.10 + OKLCH 90/8/2 + 67 MIT Style Compiler
 * ==========================================================================================
 * Compiles W3C Design Tokens Community Group (DTCG v2025.10) JSON schemas and generates
 * production-ready CSS custom properties, Utopia fluid scales, and full structural layout
 * rules tailored to any of the 67 `awesome-design-skills` styles and 4 web archetypes
 * (`saas-b2b`, `ecommerce`, `marketing`, `portfolio`).
 *
 * Usage:
 *   node tools/design/token_compiler.mjs [--project <slug-or-dir>] [--style <style>] [--archetype <type>]
 * ==========================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadProjectConfig, FACTORY_ROOT } from '../lib/project_loader.mjs';

const __filename = fileURLToPath(import.meta.url);

const ARCHETYPE_PRESETS = {
  'saas-b2b': {
    hueCanvas: 260,
    hueAccent: 160,
    hueCta: 250,
    lightnessCanvas: 0.13,
    chromaAccent: 0.17,
    radiusCard: '14px',
    radiusPill: '9999px',
    fontSans: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontDisplay: "'Inter', system-ui, -apple-system, sans-serif",
    fontMono: "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace"
  },
  'ecommerce': {
    hueCanvas: 240,
    hueAccent: 45,
    hueCta: 35,
    lightnessCanvas: 0.14,
    chromaAccent: 0.18,
    radiusCard: '16px',
    radiusPill: '9999px',
    fontSans: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    fontDisplay: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    fontMono: "ui-monospace, SFMono-Regular, monospace"
  },
  'marketing': {
    hueCanvas: 265,
    hueAccent: 155,
    hueCta: 85,
    lightnessCanvas: 0.13,
    chromaAccent: 0.19,
    radiusCard: '16px',
    radiusPill: '9999px',
    fontSans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontDisplay: "system-ui, -apple-system, sans-serif",
    fontMono: "ui-monospace, SFMono-Regular, monospace"
  },
  'portfolio': {
    hueCanvas: 250,
    hueAccent: 190,
    hueCta: 190,
    lightnessCanvas: 0.11,
    chromaAccent: 0.14,
    radiusCard: '12px',
    radiusPill: '9999px',
    fontSans: "system-ui, -apple-system, sans-serif",
    fontDisplay: "Georgia, 'Instrument Serif', serif",
    fontMono: "ui-monospace, SFMono-Regular, monospace"
  }
};

const STYLE_OVERRIDES = {
  'linear-style': { hueCanvas: 265, hueAccent: 255, hueCta: 255, lightnessCanvas: 0.11, radiusCard: '12px' },
  'vercel-geist': { hueCanvas: 0, hueAccent: 210, hueCta: 210, lightnessCanvas: 0.09, radiusCard: '10px' },
  'stripe-editorial': { hueCanvas: 250, hueAccent: 245, hueCta: 245, lightnessCanvas: 0.14, radiusCard: '16px' },
  'raycast-dark': { hueCanvas: 270, hueAccent: 15, hueCta: 350, lightnessCanvas: 0.11, radiusCard: '14px' },
  'bento': { hueCanvas: 258, hueAccent: 162, hueCta: 85, lightnessCanvas: 0.13, radiusCard: '18px' },
  'brutalist': { hueCanvas: 60, hueAccent: 25, hueCta: 25, lightnessCanvas: 0.12, radiusCard: '2px' },
  'swiss-grid': { hueCanvas: 240, hueAccent: 20, hueCta: 20, lightnessCanvas: 0.12, radiusCard: '4px' }
};

function parseFlag(argv, flagName, defaultValue = '') {
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === flagName && argv[i + 1]) return argv[i + 1];
    if (argv[i].startsWith(`${flagName}=`)) return argv[i].slice(flagName.length + 1);
  }
  return defaultValue;
}

export function getStyleCatalog() {
  const stylesDir = path.join(FACTORY_ROOT, 'references', 'hunt-2026-10', 'awesome-design-skills', 'skills');
  const styleNames = fs.existsSync(stylesDir)
    ? fs.readdirSync(stylesDir, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name).sort()
    : [];
  return {
    totalStyles: styleNames.length,
    archetypes: Object.keys(ARCHETYPE_PRESETS),
    featuredOverrides: Object.keys(STYLE_OVERRIDES),
    styles: styleNames
  };
}

export function buildDtcgTokensObject(archetype = 'saas-b2b', styleName = 'bento') {
  const base = ARCHETYPE_PRESETS[archetype] || ARCHETYPE_PRESETS['saas-b2b'];
  const ov = STYLE_OVERRIDES[styleName] || {};
  const cfg = { ...base, ...ov };

  return {
    $schema: 'https://tr.designtokens.org/format/2025.10/',
    meta: {
      standard: 'W3C DTCG 2025.10',
      archetype,
      styleSkill: styleName || 'bento',
      chromaticRule: '90% Neutral Surface / 8% Supporting Accent / 2% High-Chroma CTA (OKLCH + APCA)'
    },
    color: {
      surface: {
        canvas: { $type: 'color', $value: `oklch(${cfg.lightnessCanvas} 0.015 ${cfg.hueCanvas})`, $description: '90% Primary background canvas' },
        elevated: { $type: 'color', $value: `oklch(${(cfg.lightnessCanvas + 0.05).toFixed(2)} 0.018 ${cfg.hueCanvas})`, $description: 'Elevated card surface (+5% L)' },
        interactive: { $type: 'color', $value: `oklch(${(cfg.lightnessCanvas + 0.09).toFixed(2)} 0.022 ${cfg.hueCanvas})`, $description: 'Interactive hover surface (+9% L)' },
        glass: { $type: 'color', $value: `oklch(${(cfg.lightnessCanvas + 0.07).toFixed(2)} 0.02 ${cfg.hueCanvas} / 0.76)`, $description: 'Glassmorphic sticky header surface' }
      },
      text: {
        primary: { $type: 'color', $value: `oklch(0.96 0.008 ${cfg.hueCanvas})`, $description: 'Primary headline & body text (APCA Lc >= 90)' },
        secondary: { $type: 'color', $value: `oklch(0.76 0.015 ${cfg.hueCanvas})`, $description: 'Supporting copy (APCA Lc >= 65)' },
        muted: { $type: 'color', $value: `oklch(0.62 0.015 ${cfg.hueCanvas})`, $description: 'Metadata & captions (APCA Lc >= 50)' }
      },
      brand: {
        accent: { $type: 'color', $value: `oklch(0.74 ${cfg.chromaAccent} ${cfg.hueAccent})`, $description: '8% Supporting brand accent' },
        cta: { $type: 'color', $value: `oklch(0.82 0.18 ${cfg.hueCta})`, $description: '2% High-conversion focal CTA' },
        ctaInk: { $type: 'color', $value: `oklch(0.14 0.02 ${cfg.hueCanvas})`, $description: 'High-contrast ink on CTA button' }
      },
      border: {
        subtle: { $type: 'color', $value: 'oklch(1 0 0 / 0.08)', $description: '1px subtle hairline border' },
        highlight: { $type: 'color', $value: 'oklch(1 0 0 / 0.18)', $description: 'Interactive hover hairline' }
      }
    },
    typography: {
      fontFamily: {
        sans: { $type: 'fontFamily', $value: cfg.fontSans },
        display: { $type: 'fontFamily', $value: cfg.fontDisplay },
        mono: { $type: 'fontFamily', $value: cfg.fontMono }
      },
      scale: {
        stepMinus1: { $type: 'dimension', $value: 'clamp(0.82rem, 0.78rem + 0.2vw, 0.92rem)' },
        step0: { $type: 'dimension', $value: 'clamp(1rem, 0.95rem + 0.25vw, 1.125rem)' },
        step1: { $type: 'dimension', $value: 'clamp(1.22rem, 1.12rem + 0.5vw, 1.5rem)' },
        step2: { $type: 'dimension', $value: 'clamp(1.5rem, 1.3rem + 1vw, 2.25rem)' },
        step3: { $type: 'dimension', $value: 'clamp(1.9rem, 1.55rem + 1.6vw, 3rem)' },
        step4: { $type: 'dimension', $value: 'clamp(2.25rem, 1.8rem + 2.2vw, 3.75rem)' }
      }
    },
    radius: {
      card: { $type: 'dimension', $value: cfg.radiusCard },
      pill: { $type: 'dimension', $value: cfg.radiusPill }
    }
  };
}

export function renderDesignTokensCss(dtcg) {
  const c = dtcg.color;
  const t = dtcg.typography;
  const r = dtcg.radius;

  return `/**
 * W3C DTCG 2025.10 Compiled Design Tokens & Structural Layout CSS
 * Archetype: ${dtcg.meta.archetype} | Style: ${dtcg.meta.styleSkill}
 * Generated by tools/design/token_compiler.mjs
 */
:root {
  interpolate-size: allow-keywords;
  --surface-canvas: ${c.surface.canvas.$value};
  --surface-elevated: ${c.surface.elevated.$value};
  --surface-interactive: ${c.surface.interactive.$value};
  --surface-glass: ${c.surface.glass.$value};
  --text-primary: ${c.text.primary.$value};
  --text-secondary: ${c.text.secondary.$value};
  --text-muted: ${c.text.muted.$value};
  --brand-accent: ${c.brand.accent.$value};
  --brand-cta: ${c.brand.cta.$value};
  --brand-cta-ink: ${c.brand.ctaInk.$value};
  --border-subtle: ${c.border.subtle.$value};
  --border-highlight: ${c.border.highlight.$value};
  --font-sans: ${t.fontFamily.sans.$value};
  --font-display: ${t.fontFamily.display.$value};
  --font-mono: ${t.fontFamily.mono.$value};
  --step--1: ${t.scale.stepMinus1.$value};
  --step-0: ${t.scale.step0.$value};
  --step-1: ${t.scale.step1.$value};
  --step-2: ${t.scale.step2.$value};
  --step-3: ${t.scale.step3.$value};
  --step-4: ${t.scale.step4.$value};
  --space-xs: clamp(0.5rem, 0.45rem + 0.25vw, 0.75rem);
  --space-s: clamp(0.75rem, 0.65rem + 0.5vw, 1.125rem);
  --space-m: clamp(1rem, 0.85rem + 0.75vw, 1.5rem);
  --space-l: clamp(1.5rem, 1.2rem + 1.5vw, 2.5rem);
  --space-xl: clamp(2.25rem, 1.6rem + 3vw, 4.5rem);
  --radius-card: ${r.card.$value};
  --radius-pill: ${r.pill.$value};
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--surface-canvas);
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: var(--step-0);
  line-height: 1.6;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

.container {
  width: min(100% - 2rem, 1200px);
  margin-inline: auto;
}

/* Sticky Glass Header */
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--surface-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-subtle);
}

.site-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-m);
  min-height: 4rem;
}

.site-nav-links {
  display: flex;
  align-items: center;
  gap: var(--space-m);
  list-style: none;
}

.site-nav-links a {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: var(--step--1);
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  transition: color 0.18s ease, background-color 0.18s ease;
}

.site-nav-links a:hover {
  color: var(--text-primary);
  background: var(--surface-elevated);
}

/* Hero Section */
.hero-section {
  padding-block: var(--space-xl);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-m);
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-pill);
  background: var(--surface-elevated);
  border: 1px solid var(--border-highlight);
  color: var(--brand-accent);
  font-size: var(--step--1);
  font-weight: 600;
}

.hero-section h1 {
  font-family: var(--font-display);
  font-size: var(--step-4);
  line-height: 1.08;
  letter-spacing: -0.03em;
  max-width: 18ch;
}

.hero-lead {
  color: var(--text-secondary);
  font-size: var(--step-1);
  max-width: 60ch;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-s);
  margin-top: var(--space-xs);
}

/* Interactive Buttons (44x44px min touch target) */
.btn-primary, .btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 44px;
  padding: 0.7rem 1.35rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: var(--step-0);
  text-decoration: none;
  cursor: pointer;
  border: 1px solid transparent;
  transition: transform 0.18s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.18s ease, border-color 0.18s ease;
}

.btn-primary {
  background: var(--brand-cta);
  color: var(--brand-cta-ink);
}

.btn-secondary {
  background: var(--surface-elevated);
  color: var(--text-primary);
  border-color: var(--border-highlight);
}

.btn-primary:hover, .btn-secondary:hover {
  transform: translate3d(0, -1px, 0);
}

.btn-primary:active, .btn-secondary:active {
  transform: scale(0.97);
}

/* Bento Cards & Sections */
.section-block {
  padding-block: var(--space-xl);
  border-top: 1px solid var(--border-subtle);
}

.section-header {
  margin-bottom: var(--space-l);
}

.section-header h2 {
  font-size: var(--step-2);
  letter-spacing: -0.02em;
  margin-bottom: 0.4rem;
}

.section-header p {
  color: var(--text-secondary);
}

.bento-card {
  background: var(--surface-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card);
  padding: var(--space-l);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--space-s);
  transition: transform 0.24s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.24s ease;
}

.bento-card:hover {
  border-color: var(--border-highlight);
}

.metric-value {
  font-size: var(--step-3);
  font-weight: 800;
  color: var(--brand-accent);
  line-height: 1.1;
}

/* Pricing Grid (CRO Anchoring & Featured Tier) */
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-m);
}

.pricing-card {
  background: var(--surface-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card);
  padding: var(--space-l);
  display: flex;
  flex-direction: column;
  gap: var(--space-m);
}

.pricing-card[data-featured="true"] {
  border-color: var(--brand-accent);
  background: var(--surface-interactive);
}

.price-tag {
  font-size: var(--step-3);
  font-weight: 800;
}

/* Exclusive Accordion (<details name="faq">) */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-s);
  max-width: 780px;
}

.faq-item {
  background: var(--surface-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card);
  padding: var(--space-m);
}

.faq-item summary {
  font-weight: 600;
  cursor: pointer;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 36px;
}

.faq-item p {
  margin-top: var(--space-s);
  color: var(--text-secondary);
}

/* Native <dialog> Modal with @starting-style */
.dialog-modal {
  margin: auto;
  max-width: 520px;
  width: calc(100% - 2rem);
  background: var(--surface-elevated);
  color: var(--text-primary);
  border: 1px solid var(--border-highlight);
  border-radius: var(--radius-card);
  padding: var(--space-l);
  transition: opacity 0.24s ease, transform 0.24s ease, display 0.24s allow-discrete;
}

.dialog-modal::backdrop {
  background: oklch(0 0 0 / 0.65);
  backdrop-filter: blur(4px);
}

@starting-style {
  .dialog-modal[open] {
    opacity: 0;
    transform: scale(0.96);
  }
}

.site-footer {
  padding-block: var(--space-l);
  border-top: 1px solid var(--border-subtle);
  color: var(--text-muted);
  font-size: var(--step--1);
}

.tabular-nums, [data-count-to] {
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum" 1;
}

@view-transition {
  navigation: auto;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 160ms;
  animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
}

@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    @keyframes scrollRevealCard {
      from { opacity: 0.7; transform: translate3d(0, 12px, 0) scale(0.99); }
      to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
    }
    [data-scroll-reveal] {
      animation: scrollRevealCard linear both;
      animation-timeline: view();
      animation-range: entry 0% cover 20%;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

h1, h2, h3, h4 {
  text-wrap: balance;
}

p {
  text-wrap: pretty;
}

section + section, [data-content-visibility="auto"] {
  content-visibility: auto;
  contain-intrinsic-size: auto 500px;
}
`;
}

export function compileDesignTokens(options = {}) {
  const argv = process.argv.slice(2);
  const projectInput = options.projectDir || parseFlag(argv, '--project', '');
  const projectCfg = loadProjectConfig(projectInput);
  const rootDir = projectCfg.projectRoot;
  const isStudioRoot = !projectCfg.hasManifest && path.resolve(rootDir) === path.resolve(FACTORY_ROOT);

  const archetype = options.archetype || parseFlag(argv, '--archetype', projectCfg.archetype || 'saas-b2b');
  const styleName = options.style || parseFlag(argv, '--style', projectCfg.design?.styleSkill || 'bento');

  const dtcg = buildDtcgTokensObject(archetype, styleName);
  const cssContent = renderDesignTokensCss(dtcg);

  const writtenFiles = [];

  if (isStudioRoot) {
    const rootTokensPath = path.join(FACTORY_ROOT, 'tokens', 'design.tokens.json');
    fs.mkdirSync(path.dirname(rootTokensPath), { recursive: true });
    fs.writeFileSync(rootTokensPath, JSON.stringify(dtcg, null, 2), 'utf8');
    writtenFiles.push(rootTokensPath);

    const tplTargets = [
      path.join(FACTORY_ROOT, 'templates', 'vanilla-edge', 'tokens', 'design.tokens.json'),
      path.join(FACTORY_ROOT, 'templates', 'astro-edge', 'tokens', 'design.tokens.json')
    ];
    for (const t of tplTargets) {
      fs.mkdirSync(path.dirname(t), { recursive: true });
      fs.writeFileSync(t, JSON.stringify(dtcg, null, 2), 'utf8');
      writtenFiles.push(t);
    }

    const cssTargets = [
      path.join(FACTORY_ROOT, 'templates', 'vanilla-edge', 'site', 'css', 'design-tokens.css'),
      path.join(FACTORY_ROOT, 'templates', 'astro-edge', 'src', 'styles', 'design-tokens.css'),
      path.join(FACTORY_ROOT, 'templates', 'astro-edge', 'public', 'styles', 'design-tokens.css')
    ];
    for (const cPath of cssTargets) {
      fs.mkdirSync(path.dirname(cPath), { recursive: true });
      fs.writeFileSync(cPath, cssContent, 'utf8');
      writtenFiles.push(cPath);
    }
  } else {
    const tokPath = path.join(rootDir, projectCfg.paths.tokensPath || 'tokens/design.tokens.json');
    fs.mkdirSync(path.dirname(tokPath), { recursive: true });
    fs.writeFileSync(tokPath, JSON.stringify(dtcg, null, 2), 'utf8');
    writtenFiles.push(tokPath);

    const cssPath = path.join(rootDir, projectCfg.paths.designCssPath || 'site/css/design-tokens.css');
    fs.mkdirSync(path.dirname(cssPath), { recursive: true });
    fs.writeFileSync(cssPath, cssContent, 'utf8');
    writtenFiles.push(cssPath);
  }

  return {
    passed: true,
    archetype,
    styleSkill: styleName,
    writtenFiles
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const res = compileDesignTokens();
  console.log('======================================================');
  console.log(`🎨 W3C DTCG 2025.10 + OKLCH TOKEN COMPILER`);
  console.log('======================================================');
  console.log(`  ✓ Archetype    : ${res.archetype}`);
  console.log(`  ✓ Style Skill  : ${res.styleSkill}`);
  for (const f of res.writtenFiles) {
    console.log(`  ✓ Generated    : ${path.relative(FACTORY_ROOT, f)}`);
  }
  console.log('======================================================\n');
}
