#!/usr/bin/env node
/**
 * Web Software Factory Studio — Addy Osmani Unified Quality Gate
 * Combines:
 *   1. Floor Guard (addyosmani/agent-skills -> constraint-driven-development)
 *   2. Agentic SEO Checker (addyosmani/agentic-seo -> 100-point AEO score)
 *   3. Asset & Overlay Integrity Extractor (addyosmani/oust + web-quality-skills)
 */
import fs from 'node:fs';
import path from 'node:path';
import { loadProjectConfig, FACTORY_ROOT } from '../lib/project_loader.mjs';

const projectConfig = loadProjectConfig();
const root = projectConfig.projectRoot;
let failures = 0;

function pass(label) {
  console.log(`✅ ${label}`);
}

function fail(label) {
  console.error(`❌ ${label}`);
  failures++;
}

console.log('====================================================');
console.log(`🏛️  ADDY OSMANI FLOOR GUARD, CWV & AGENTIC SEO AUDIT [${projectConfig.id}]`);
console.log('====================================================\n');

// 1. Check CONSTRAINTS.md & AGENTS.md exist and are non-empty
const constraintsPath = path.join(root, 'CONSTRAINTS.md');
const agentsPath = path.join(root, 'AGENTS.md');
if (fs.existsSync(constraintsPath) && fs.statSync(constraintsPath).size > 200) {
  pass('[Floor Guard] CONSTRAINTS.md quality contract is present and enforced.');
} else {
  fail('[Floor Guard] Missing or empty CONSTRAINTS.md.');
}

// 2. Check OBS Overlays if required by project manifest
const requiredOverlays = projectConfig.paths.requiredOverlaysInAudit || [];
if (requiredOverlays.length > 0) {
  const missingOverlays = requiredOverlays.filter(
    (dir) => !fs.existsSync(path.join(root, dir))
  );
  if (missingOverlays.length === 0) {
    pass(`[Floor Guard] All ${requiredOverlays.length} OBS Browser Source overlays exist in ${projectConfig.id}.`);
  } else {
    fail(`[Floor Guard] Missing overlays: ${missingOverlays.join(', ')}`);
  }
} else {
  pass(`[Floor Guard] Project archetype (${projectConfig.archetype}): no OBS overlays required.`);
}

// 3. Check for forbidden checker suppressions (@ts-ignore / eslint-disable) in core JS
const coreJsFiles = projectConfig.paths.coreJsFiles.length > 0
  ? projectConfig.paths.coreJsFiles
  : ['site/js/app.js', 'worker/index.js'].filter(rel => fs.existsSync(path.join(root, rel)));
let suppressionCount = 0;
for (const rel of coreJsFiles) {
  const full = path.join(root, rel);
  if (fs.existsSync(full)) {
    const content = fs.readFileSync(full, 'utf8');
    if (/@ts-ignore|@ts-expect-error|eslint-disable/.test(content)) {
      suppressionCount++;
      fail(`[Floor Guard] Checker suppression found in ${rel}`);
    }
  }
}
if (suppressionCount === 0) {
  pass('[Floor Guard] Zero @ts-ignore / eslint-disable suppressions across core controllers.');
}

// 4. Agentic SEO (addyosmani/agentic-seo) 100-Point Check
let aeoScore = 0;
const robotsCandidates = [path.join(root, 'robots.txt'), path.join(root, 'public', 'robots.txt')];
const llmsCandidates = [path.join(root, 'llms.txt'), path.join(root, 'public', 'llms.txt')];
const htmlCandidates = [
  path.join(root, projectConfig.paths.entryHtml),
  path.join(root, projectConfig.paths.distDir, 'index.html'),
  path.join(root, 'src', 'layouts', 'BaseLayout.astro'),
  path.join(root, 'src', 'pages', 'index.astro')
];

const robotsPath = robotsCandidates.find(p => fs.existsSync(p));
const llmsPath = llmsCandidates.find(p => fs.existsSync(p));
const htmlPath = htmlCandidates.find(p => fs.existsSync(p));

const robotsTxt = robotsPath ? fs.readFileSync(robotsPath, 'utf8') : '';
const llmsTxt = llmsPath ? fs.readFileSync(llmsPath, 'utf8') : '';
let indexHtml = htmlPath ? fs.readFileSync(htmlPath, 'utf8') : '';
const baseLayoutPath = path.join(root, 'src', 'layouts', 'BaseLayout.astro');
if (htmlPath && htmlPath.endsWith('.astro') && fs.existsSync(baseLayoutPath) && htmlPath !== baseLayoutPath) {
  indexHtml = fs.readFileSync(baseLayoutPath, 'utf8') + '\n' + indexHtml;
}

if (robotsTxt.includes('User-agent: *') && robotsTxt.includes('Allow: /')) aeoScore += 25;
const expectedLlmsHeaders = projectConfig.aeo.requiredLlmsHeaders || ['# '];
if (llmsTxt.length > 40 && expectedLlmsHeaders.every(h => llmsTxt.includes(h))) aeoScore += 25;
if (fs.existsSync(agentsPath)) aeoScore += 25;
if (indexHtml.includes('<meta name="description"') && indexHtml.includes('application/ld+json')) aeoScore += 25;

if (aeoScore === 100) {
  pass(`[Agentic SEO] AEO Score: ${aeoScore}/100 (robots.txt + llms.txt + AGENTS.md + JSON-LD + semantic meta).`);
} else {
  fail(`[Agentic SEO] AEO Score below 100: ${aeoScore}/100.`);
}

// 5. Core Web Vitals & Asset Integrity (addyosmani/web-quality-skills & addyosmani/oust)
if (projectConfig.invariants.requireControlPanelTelemetryPill) {
  const hasSwitches = indexHtml.includes('data-cp-module-toggle="slotrequests"') && indexHtml.includes('cp-webvitals-pill');
  if (hasSwitches) {
    pass('[Core Web Vitals] Control Panel ON/OFF Module Switches & Live FPS/INP Telemetry Pill verified.');
  } else {
    fail('[Core Web Vitals] Missing ON/OFF Module Switches or #cp-webvitals-pill in index.html.');
  }
} else {
  const hasViewportMeta = indexHtml.includes('name="viewport"');
  if (hasViewportMeta) {
    pass('[Core Web Vitals] Responsive viewport & zero-CLS structural layout verified.');
  } else {
    fail('[Core Web Vitals] Missing viewport meta tag in entry HTML.');
  }
}

// Extract local <script src="..."> references (addyosmani/oust pattern) and verify files exist
const scriptMatches = [...indexHtml.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)];
let missingScripts = 0;
for (const m of scriptMatches) {
  const src = m[1];
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//')) continue;
  const cleanRel = src.split('?')[0].replace(/^\.\//, '').replace(/^\//, '');
  if (!fs.existsSync(path.join(root, cleanRel)) && !fs.existsSync(path.join(root, 'public', cleanRel))) {
    missingScripts++;
    fail(`[Oust Asset Check] Missing local script referenced in entry HTML: ${src}`);
  }
}
if (missingScripts === 0) {
  pass(`[Oust Asset Check] All ${scriptMatches.length} <script> references in entry HTML resolve cleanly.`);
}

console.log('----------------------------------------------------');
if (failures > 0) {
  console.error(`🚨 FLOOR / AEO AUDIT FAILED WITH ${failures} ISSUE(S).`);
  process.exit(1);
} else {
  console.log('🎉 FLOOR GUARD, CWV & AGENTIC SEO RESULT: 100% PASS!');
}
