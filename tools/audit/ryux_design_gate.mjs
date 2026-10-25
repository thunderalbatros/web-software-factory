#!/usr/bin/env node
/**
 * tools/audit/ryux_design_gate.mjs — RYUX v2.14.2 Design Intelligence & Anti-Slop Gate
 * ====================================================================================
 * Encodes the automated verification rules from:
 *   - .agents/skills/ryux/SKILL.md (Analyze -> Frame -> Build & Critique -> Verify)
 *   - .agents/skills/modern-frontend-design/SKILL.md (2026 OKLCH, View Transitions,
 *     Scroll-Driven Animations, Tabular Numerals, Anti-Slop Heuristics)
 *
 * Usage:
 *   node tools/audit/ryux_design_gate.mjs [--project <slug-or-path>]
 * ====================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadProjectConfig } from '../lib/project_loader.mjs';

const __filename = fileURLToPath(import.meta.url);
const projectCfg = loadProjectConfig();
const ROOT = projectCfg.projectRoot;

function readFirstExisting(candidates) {
  for (const rel of candidates) {
    if (!rel) continue;
    const full = path.join(ROOT, rel);
    if (fs.existsSync(full) && fs.statSync(full).isFile()) {
      return fs.readFileSync(full, 'utf8');
    }
  }
  return '';
}

export function runRyuxDesignGate() {
  let html = readFirstExisting([
    projectCfg.paths?.entryHtml,
    'index.html',
    'site/index.html',
    'src/pages/index.astro'
  ]);
  const layoutAstro = readFirstExisting(['src/layouts/BaseLayout.astro']);
  if (layoutAstro) html = layoutAstro + '\n' + html;

  const css = readFirstExisting([
    'site/css/style.css',
    'site/css/design-tokens.css',
    path.join(projectCfg.paths?.cssDir || 'site/css', 'style.css'),
    path.join(projectCfg.paths?.cssDir || 'site/css', 'design-tokens.css'),
    'src/styles/global.css',
    'src/styles/design-tokens.css'
  ]);

  const jsApp = readFirstExisting([
    'site/js/app.js',
    'site/js/motion-fx.js',
    'src/pages/index.astro'
  ]);

  const hasDtcgFile = fs.existsSync(path.join(ROOT, projectCfg.design?.tokensPath || 'tokens/design.tokens.json'));

  const checks = [];
  const addCheck = (id, label, passed, evidence) => {
    checks.push({ id, label, passed: Boolean(passed), evidence });
  };

  // 1. OKLCH & W3C DTCG Token System (Modern Frontend Design Step 0)
  const hasOklch = /oklch\(/i.test(css) || hasDtcgFile;
  addCheck(
    'ryux-oklch-tokens',
    'OKLCH Color Space or W3C DTCG Token Architecture',
    hasOklch,
    hasOklch ? 'OKLCH / DTCG tokens active' : 'Missing oklch() or tokens/design.tokens.json'
  );

  // 2. Fluid Typography & Spacing (Utopia clamp())
  const hasClamp = /clamp\(/i.test(css);
  addCheck(
    'ryux-fluid-clamp',
    'Utopia Fluid Typography & Ergonomics (clamp())',
    hasClamp,
    hasClamp ? 'clamp() fluid scales found in CSS' : 'Missing clamp() in CSS'
  );

  // 3. Tabular Numerals Discipline (RX-UI-Tabular)
  const hasTabularNums = /tabular-nums/i.test(css) || /tabular-nums/i.test(jsApp) || /tabular-nums/i.test(html);
  addCheck(
    'ryux-tabular-nums',
    'Tabular Numerals (font-variant-numeric: tabular-nums) for Zero Layout Jitter',
    hasTabularNums,
    hasTabularNums ? 'tabular-nums enforced on numeric displays' : 'Missing tabular-nums'
  );

  // 4. 2026 Native Motion Primitives (@view-transition / startViewTransition / @starting-style / animation-timeline)
  const hasViewTransition = /@view-transition|startViewTransition|::view-transition/i.test(css + '\n' + jsApp + '\n' + html);
  const hasStartingStyleOrScroll = /@starting-style|animation-timeline:\s*(view|scroll)/i.test(css);
  addCheck(
    'ryux-native-motion-2026',
    '2026 Native Motion Primitives (View Transitions API + @starting-style / Scroll-Driven CSS)',
    hasViewTransition && hasStartingStyleOrScroll,
    `ViewTransitions=${hasViewTransition}, NativeCSSMotion=${hasStartingStyleOrScroll}`
  );

  // 5. Inclusive Motion Standard (prefers-reduced-motion: reduce)
  const hasReducedMotion = /prefers-reduced-motion:\s*reduce/i.test(css + '\n' + jsApp + '\n' + html);
  addCheck(
    'ryux-reduced-motion-a11y',
    'Inclusive Motion Accessibility (prefers-reduced-motion: reduce)',
    hasReducedMotion,
    hasReducedMotion ? 'prefers-reduced-motion guard active' : 'Missing prefers-reduced-motion guard'
  );

  // 6. Anti-Slop Heuristics (No Lorem Ipsum, No Unstyled Template Placeholders, Valid Landmark Hierarchy)
  const hasSlopText = /\b(lorem ipsum dolor sit amet|insert your text here|your company name here)\b/i.test(html);
  const hasMainAndHeading = /<main[\s>]/i.test(html) && /<h[12][\s>]/i.test(html);
  addCheck(
    'ryux-anti-slop-guard',
    'RYUX Anti-Slop & Focal Hierarchy Guard (Zero Placeholder Slop + Semantic Landmarks)',
    !hasSlopText && hasMainAndHeading,
    !hasSlopText && hasMainAndHeading ? 'Clean copy & semantic focal hierarchy verified' : 'Found placeholder slop or missing <main>/<h1>'
  );

  const passedCount = checks.filter(c => c.passed).length;
  const score = Math.round((passedCount / checks.length) * 100);
  const passed = passedCount === checks.length;

  return {
    timestamp: new Date().toISOString(),
    projectId: projectCfg.id,
    archetype: projectCfg.archetype,
    styleSkill: projectCfg.design?.styleSkill || 'default-90-8-2-oklch',
    score,
    passed,
    passedCount,
    totalChecks: checks.length,
    checks
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const report = runRyuxDesignGate();
  console.log('======================================================');
  console.log(`🎨 RYUX v2.14.2 DESIGN INTELLIGENCE & ANTI-SLOP GATE [${report.projectId}]`);
  console.log('======================================================');
  for (const c of report.checks) {
    console.log(`  ${c.passed ? '✓' : '✗'} [${c.id}] ${c.label} (${c.evidence})`);
  }
  console.log('------------------------------------------------------');
  console.log(`🏆 RYUX DESIGN SCORE: ${report.score}/100 (${report.passedCount}/${report.totalChecks}) | Style: ${report.styleSkill}`);
  console.log('======================================================\n');
  process.exit(report.passed ? 0 : 1);
}
