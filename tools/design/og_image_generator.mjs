#!/usr/bin/env node
/**
 * tools/design/og_image_generator.mjs — Dynamic OpenGraph Social Card Engine (`Satori` Pattern)
 * =============================================================================================
 * Inspired by `vercel/satori` in the Local Vault (`sota-2026/creative-and-perf/satori`).
 * Compiles high-converting 1200x630 OpenGraph social preview cards (`og-image.svg`) directly
 * from the active project's W3C DTCG 2025.10 OKLCH tokens and metadata so shared links on
 * X/Twitter, LinkedIn, WhatsApp, and Discord achieve maximum click-through rate (CTR).
 * =============================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadProjectConfig } from '../lib/project_loader.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');

function escapeXml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateOpenGraphSvgCard(options = {}) {
  const cfg = loadProjectConfig(options.project || '');
  const tokensPath = path.join(ROOT, 'tokens', 'design.tokens.json');
  let accentPrimary = 'oklch(0.68 0.19 265)';
  let surfaceCanvas = '#090b10';
  let textPrimary = '#f8fafc';

  if (fs.existsSync(tokensPath)) {
    try {
      const dtcg = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));
      accentPrimary = dtcg?.color?.accent?.primary?.$value || accentPrimary;
      surfaceCanvas = dtcg?.color?.surface?.canvas?.$value || surfaceCanvas;
      textPrimary = dtcg?.color?.text?.primary?.$value || textPrimary;
    } catch {}
  }

  const title = escapeXml(options.title || cfg.name || 'Web Software Factory Studio');
  const subtitle = escapeXml(
    options.subtitle ||
      `Arquitectura ${cfg.archetype || 'SaaS B2B'} · W3C DTCG OKLCH · 60-FPS GPU Motion · Zero-Trust Edge`
  );
  const badge = escapeXml(options.badge || 'SOTA 2026 · VERIFIED EDGE ARCHITECTURE');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${title}">
  <defs>
    <radialGradient id="og-spotlight" cx="80%" cy="20%" r="75%">
      <stop offset="0%" stop-color="${accentPrimary}" stop-opacity="0.32"/>
      <stop offset="60%" stop-color="${surfaceCanvas}" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#05070b" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="og-border" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${accentPrimary}" stop-opacity="0.65"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.08"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#07090e"/>
  <rect width="1200" height="630" fill="url(#og-spotlight)"/>
  <rect x="48" y="48" width="1104" height="534" rx="28" fill="none" stroke="url(#og-border)" stroke-width="2"/>
  <rect x="96" y="108" width="420" height="42" rx="21" fill="#111622" stroke="url(#og-border)" stroke-width="1"/>
  <text x="122" y="135" fill="${textPrimary}" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="16" font-weight="600" letter-spacing="1.5">${badge}</text>
  <text x="96" y="275" fill="${textPrimary}" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="64" font-weight="800" letter-spacing="-1.5">${title.slice(0, 34)}</text>
  <text x="96" y="355" fill="#94a3b8" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="28" font-weight="500">${subtitle.slice(0, 68)}</text>
  <line x1="96" y1="455" x2="1104" y2="455" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1"/>
  <text x="96" y="512" fill="#cbd5e1" font-family="monospace" font-size="20">W3C DTCG 2025.10 OKLCH  •  APCA Lc &gt;= 75  •  Cloudflare Edge</text>
</svg>\n`;

  const targets = [
    path.join(ROOT, 'templates', 'vanilla-edge', 'public', 'og-image.svg'),
    path.join(ROOT, 'templates', 'astro-edge', 'public', 'og-image.svg'),
    path.join(ROOT, 'templates', 'fullstack-saas-edge', 'public', 'og-image.svg')
  ];

  for (const outPath of targets) {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, svg, 'utf8');
  }

  return {
    passed: true,
    width: 1200,
    height: 630,
    bytes: Buffer.byteLength(svg, 'utf8'),
    writtenFiles: targets.map((t) => path.relative(ROOT, t))
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const res = generateOpenGraphSvgCard();
  console.log('\n====================================================================');
  console.log('🖼️  SATORI-STYLE DYNAMIC OPENGRAPH CARD GENERATOR (1200x630)');
  console.log('====================================================================');
  console.log(`  ✓ Dimensions : ${res.width}x${res.height}px (${res.bytes} bytes SVG)`);
  for (const f of res.writtenFiles) {
    console.log(`  ✓ Generated  : ${f}`);
  }
  console.log('====================================================================\n');
}
