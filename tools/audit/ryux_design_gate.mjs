#!/usr/bin/env node
/**
 * tools/audit/ryux_design_gate.mjs — RYUX v2.14.2 Design Intelligence & Anti-Slop Gate
 * ====================================================================================
 * Encodes the automated verification rules from:
 *   - .agents/skills/ryux/SKILL.md (Analyze -> Frame -> Build & Critique -> Verify)
 *   - .agents/skills/modern-frontend-design/SKILL.md (2026 OKLCH, View Transitions,
 *     Scroll-Driven Animations, Tabular Numerals, Anti-Slop Heuristics)
 *   - Stage 3C (`complianceProfile === 'education'`, `Surface Mode: Read`):
 *     Replaces 3D/PBR/Sonic/bento requirements with real reading & inclusion controls:
 *     `max-width` in `[60ch, 70ch]`, `OKLCH 90/8/2` + 3 semantic level accents,
 *     `APCA` contrast, `clamp()`, `tabular-nums`, `@view-transition`,
 *     `prefers-reduced-motion: reduce`, clean `h1 -> h2 -> h3` hierarchy, and
 *     `readability_es.mjs` verification across lesson `.mdx`/`.md` files.
 *
 * Usage:
 *   node tools/audit/ryux_design_gate.mjs [--project <slug-or-path>]
 * ====================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadProjectConfig } from '../lib/project_loader.mjs';
import {
  lintDesignMd,
  generateProductAndDesignMd
} from '../design/industry_archetype_matrix.mjs';
import {
  synthesizeUniqueBrandDna,
  MIN_DIVERGENCE_THRESHOLD,
  MIN_HARMONY_SCORE
} from '../design/bespoke_morphology_composer.mjs';
import { evaluateVisualArchetypeWithVlm } from '../intelligence/vertex_ai_bridge.mjs';
import { analyzeSpanishReadability } from './readability_es.mjs';

const __filename = fileURLToPath(import.meta.url);

function readFirstExisting(rootDir, candidates) {
  for (const rel of candidates) {
    if (!rel) continue;
    const full = path.join(rootDir, rel);
    if (fs.existsSync(full) && fs.statSync(full).isFile()) {
      return fs.readFileSync(full, 'utf8');
    }
  }
  return '';
}

function readAllExisting(rootDir, candidates) {
  const chunks = [];
  for (const rel of candidates) {
    if (!rel) continue;
    const full = path.join(rootDir, rel);
    if (fs.existsSync(full) && fs.statSync(full).isFile()) {
      chunks.push(fs.readFileSync(full, 'utf8'));
    }
  }
  return chunks.join('\n');
}

function collectFilesByExtension(dir, exts, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.git', 'dist', '.astro', '.cache'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectFilesByExtension(full, exts, out);
    else if (exts.some((ext) => entry.name.toLowerCase().endsWith(ext))) out.push(full);
  }
  return out;
}

/**
 * Verifies clean sequential heading hierarchy (`h1 -> h2 -> h3` without skipped levels such as `h1 -> h3`).
 */
export function inspectHeadingHierarchy(markupOrMdx = '') {
  const levels = [];
  const cleaned = String(markupOrMdx || '')
    .replace(/^---[\s\S]*?---/m, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');

  for (const line of cleaned.split(/\r?\n/)) {
    const mdMatch = /^(#{1,6})\s+\S/.exec(line.trim());
    if (mdMatch) {
      levels.push(mdMatch[1].length);
    }
    for (const htmlMatch of line.matchAll(/<h([1-6])\b/gi)) {
      levels.push(Number(htmlMatch[1]));
    }
  }

  let skippedTransition = null;
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1) {
      skippedTransition = `h${levels[i - 1]}->h${levels[i]}`;
      break;
    }
  }

  const hasH1 = levels.includes(1);
  const hasH2 = levels.includes(2);
  const hasH3 = levels.includes(3);
  return {
    levels,
    hasH1,
    hasH2,
    hasH3,
    cleanSequential: skippedTransition === null && hasH1 && hasH2 && hasH3,
    skippedTransition
  };
}

export function runRyuxDesignGate(projectInput = '') {
  const activeCfg =
    projectInput && typeof projectInput === 'object' && projectInput.projectRoot
      ? projectInput
      : loadProjectConfig(typeof projectInput === 'string' ? projectInput : '');
  const ROOT = activeCfg.projectRoot;
  const isEducationProfile = activeCfg.complianceProfile === 'education';

  let html = readFirstExisting(ROOT, [
    activeCfg.paths?.entryHtml,
    'index.html',
    'site/index.html',
    'src/pages/index.astro'
  ]);
  const layoutAstro = readAllExisting(ROOT, [
    'src/layouts/BaseLayout.astro',
    'src/layouts/LessonEditorialLayout.astro'
  ]);
  if (layoutAstro) html = `${layoutAstro}\n${html}`;

  const css = readAllExisting(ROOT, [
    'site/css/style.css',
    'site/css/design-tokens.css',
    path.join(activeCfg.paths?.cssDir || 'site/css', 'style.css'),
    path.join(activeCfg.paths?.cssDir || 'site/css', 'design-tokens.css'),
    'src/styles/global.css',
    'src/styles/design-tokens.css',
    'src/styles/editorial-education.css',
    'public/styles/design-tokens.css'
  ]);

  const jsApp = readFirstExisting(ROOT, [
    'site/js/app.js',
    'site/js/motion-fx.js',
    'src/pages/index.astro'
  ]);

  const dtcgPath = path.join(ROOT, activeCfg.design?.tokensPath || 'tokens/design.tokens.json');
  const hasDtcgFile = fs.existsSync(dtcgPath);
  const dtcgRaw = hasDtcgFile ? fs.readFileSync(dtcgPath, 'utf8') : '';

  const checks = [];
  const addCheck = (id, label, passed, evidence) => {
    checks.push({ id, label, passed: Boolean(passed), evidence });
  };

  // 1. OKLCH & W3C DTCG Token System (+ 3 semantic level accents in education Read mode)
  const hasOklch = /oklch\(/i.test(css) || hasDtcgFile;
  if (isEducationProfile) {
    const combinedTokens = `${css}\n${dtcgRaw}\n${html}`;
    const hasThreeLevelAccents =
      /level-acquire/i.test(combinedTokens) &&
      /level-deepen/i.test(combinedTokens) &&
      /level-create/i.test(combinedTokens);
    addCheck(
      'ryux-oklch-tokens',
      'OKLCH 90/8/2 Perceptual Palette + 3 Semantic Level Accents (Acquire, Deepen, Create)',
      hasOklch && hasThreeLevelAccents,
      `OKLCH=${hasOklch}, ThreeSemanticLevelAccents=${hasThreeLevelAccents}`
    );
  } else {
    addCheck(
      'ryux-oklch-tokens',
      'OKLCH Color Space or W3C DTCG Token Architecture',
      hasOklch,
      hasOklch ? 'OKLCH / DTCG tokens active' : 'Missing oklch() or tokens/design.tokens.json'
    );
  }

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

  // 4. 2026 Native Motion Primitives (@view-transition / startViewTransition + @starting-style / Scroll-Driven CSS)
  const hasViewTransition = /@view-transition|startViewTransition|::view-transition/i.test(`${css}\n${jsApp}\n${html}`);
  const hasStartingStyleOrScroll = /@starting-style|animation-timeline:\s*(view|scroll)/i.test(css);
  addCheck(
    'ryux-native-motion-2026',
    '2026 Native Motion Primitives (View Transitions API + @starting-style / Scroll-Driven CSS)',
    hasViewTransition && (isEducationProfile ? true : hasStartingStyleOrScroll),
    `ViewTransitions=${hasViewTransition}, NativeCSSMotion=${hasStartingStyleOrScroll}`
  );

  // 5. Inclusive Motion Standard (prefers-reduced-motion: reduce)
  const hasReducedMotion = /prefers-reduced-motion:\s*reduce/i.test(`${css}\n${jsApp}\n${html}`);
  addCheck(
    'ryux-reduced-motion-a11y',
    'Inclusive Motion Accessibility (prefers-reduced-motion: reduce)',
    hasReducedMotion,
    hasReducedMotion ? 'prefers-reduced-motion guard active' : 'Missing prefers-reduced-motion guard'
  );

  // 6. Anti-Slop Heuristics & Clean Heading Hierarchy (h1 -> h2 -> h3 enforced in education Read mode)
  const hasSlopText = /\b(lorem ipsum dolor sit amet|insert your text here|your company name here)\b/i.test(html);
  const hasMainAndHeading = /<main[\s>]/i.test(html) && /<h[12][\s>]/i.test(html);
  if (isEducationProfile) {
    const contentFiles = collectFilesByExtension(path.join(ROOT, 'src'), ['.astro', '.mdx', '.md']);
    const combinedEduMarkup = contentFiles.length > 0
      ? contentFiles.map((f) => fs.readFileSync(f, 'utf8')).join('\n')
      : html;
    const hierarchy = inspectHeadingHierarchy(combinedEduMarkup);
    // Also verify each standalone page/MDX file never skips heading levels
    let pageSkipped = null;
    for (const f of collectFilesByExtension(path.join(ROOT, 'src', 'pages'), ['.astro', '.mdx'])) {
      const hCheck = inspectHeadingHierarchy(fs.readFileSync(f, 'utf8'));
      if (hCheck.skippedTransition) {
        pageSkipped = `${path.basename(f)}(${hCheck.skippedTransition})`;
        break;
      }
    }
    for (const f of collectFilesByExtension(path.join(ROOT, 'src', 'content'), ['.mdx', '.md'])) {
      const hCheck = inspectHeadingHierarchy(fs.readFileSync(f, 'utf8'));
      if (hCheck.skippedTransition) {
        pageSkipped = `${path.basename(f)}(${hCheck.skippedTransition})`;
        break;
      }
    }
    const cleanHierarchyOk = !hasSlopText && hasMainAndHeading && hierarchy.cleanSequential && !pageSkipped;
    addCheck(
      'ryux-anti-slop-guard',
      'RYUX Anti-Slop & Clean Editorial Hierarchy Guard (h1 -> h2 -> h3, Zero Skipped Headings)',
      cleanHierarchyOk,
      cleanHierarchyOk
        ? 'Clean h1->h2->h3 hierarchy & semantic landmarks verified'
        : `Slop=${hasSlopText}, Main=${hasMainAndHeading}, Skipped=${pageSkipped || hierarchy.skippedTransition || 'missing-h1-h2-h3'}`
    );
  } else {
    addCheck(
      'ryux-anti-slop-guard',
      'RYUX Anti-Slop & Focal Hierarchy Guard (Zero Placeholder Slop + Semantic Landmarks)',
      !hasSlopText && hasMainAndHeading,
      !hasSlopText && hasMainAndHeading ? 'Clean copy & semantic focal hierarchy verified' : 'Found placeholder slop or missing <main>/<h1>'
    );
  }

  // 7. 3-Viewport Optical Geometry, Zero-Overlap, Zero-Clipping & APCA Perceptual Contrast (Fail-Closed)
  const optReportPath = path.join(ROOT, 'tools', 'audit', 'out', 'optical_geometry_report.json');
  let hasOptGeoEvidence = false;
  let optGeo = {
    viewportsVerified: [],
    zeroHorizontalScroll: false,
    zeroClippingOrOverlap: false,
    fitts44pxMobileVerified: false,
    perceptualContrastVerified: false,
    temporal4StagesVerified: false,
    clsScore: Number.POSITIVE_INFINITY,
    fpsMeasured: 0
  };
  if (fs.existsSync(optReportPath)) {
    try {
      const parsedOpt = JSON.parse(fs.readFileSync(optReportPath, 'utf8'));
      if (parsedOpt && typeof parsedOpt === 'object') {
        optGeo = { ...optGeo, ...parsedOpt };
        hasOptGeoEvidence = true;
      }
    } catch (_) {
      hasOptGeoEvidence = false;
    }
  }

  addCheck(
    'ryux-optical-geometry-3vp',
    '3-Viewport Optical Geometry (375px / 768px / 1440px Zero-Overlap, APCA Contrast & Fitts 44x44px Touch)',
    hasOptGeoEvidence &&
      Boolean(
        optGeo.zeroHorizontalScroll &&
          optGeo.zeroClippingOrOverlap &&
          optGeo.perceptualContrastVerified &&
          optGeo.fitts44pxMobileVerified
      ),
    hasOptGeoEvidence
      ? `Viewports=[${(optGeo.viewportsVerified || []).join(', ')}px], ZeroHScroll=${optGeo.zeroHorizontalScroll}, ZeroOverlap=${optGeo.zeroClippingOrOverlap}, APCAContrast=${optGeo.perceptualContrastVerified}, Fitts44pxMobile=${optGeo.fitts44pxMobileVerified}`
      : 'MISSING_EVIDENCE: optical_geometry_report.json not found'
  );

  addCheck(
    'ryux-gpu-60fps-cls',
    '60-FPS GPU Compositor Motion & Zero-CLS (< 0.05) across 4 Temporal Stages',
    hasOptGeoEvidence && Number(optGeo.fpsMeasured) >= 55 && Number(optGeo.clsScore) < 0.05,
    hasOptGeoEvidence
      ? `FPS=${optGeo.fpsMeasured} (>=55), CLS=${Number(optGeo.clsScore).toFixed(3)} (<0.05), 4-StageTemporal=${optGeo.temporal4StagesVerified}`
      : 'MISSING_EVIDENCE: optical_geometry_report.json not found'
  );

  const cdpPerf = hasOptGeoEvidence ? optGeo.cdpPerformanceAndA11y : null;
  addCheck(
    'ryux-cdp-perf-and-ax-tree',
    'Chrome DevTools CDP Telemetry (JSHeapUsedSize, LayoutDuration, RecalcStyleDuration & FullAXTree)',
    Boolean(cdpPerf && typeof cdpPerf.jsHeapUsedMB === 'number' && cdpPerf.jsHeapUsedMB < 64 && cdpPerf.a11yTreeHealthy === true),
    cdpPerf
      ? `JSHeap=${cdpPerf.jsHeapUsedMB}MB, Layout=${cdpPerf.layoutDurationMs}ms, RecalcStyle=${cdpPerf.recalcStyleDurationMs}ms, AXTreeHealthy=${cdpPerf.a11yTreeHealthy === true}`
      : 'MISSING_EVIDENCE: cdpPerformanceAndA11y telemetry absent'
  );

  // 10. Google Labs DESIGN.md + Impeccable v4.6 (62 Anti-Slop Rules & 4 Surface Modes)
  const designMdPath = path.join(ROOT, 'DESIGN.md');
  if (!isEducationProfile) {
    if (
      !fs.existsSync(designMdPath) ||
      !fs.readFileSync(designMdPath, 'utf8').includes('pbrMaterial:') ||
      !fs.readFileSync(designMdPath, 'utf8').includes('## Sonic & Video Identity') ||
      !fs.readFileSync(designMdPath, 'utf8').includes('## Brand DNA Vector & Bespoke Morphology')
    ) {
      generateProductAndDesignMd(ROOT, activeCfg.industryArchetype || activeCfg.archetype || 'saas');
    }
  } else if (!fs.existsSync(designMdPath)) {
    generateProductAndDesignMd(ROOT, 'education');
  }

  const designMdRaw = fs.existsSync(designMdPath) ? fs.readFileSync(designMdPath, 'utf8') : '';
  const designMdLint = lintDesignMd(designMdRaw || designMdPath, {
    archetype: isEducationProfile ? 'academic-editorial-education' : (activeCfg.industryArchetype || activeCfg.archetype || 'saas'),
    sourcePath: designMdPath
  });
  addCheck(
    'ryux-impeccable-design-md-62-rules',
    'Google Labs DESIGN.md (8 Sections) & Impeccable v4.6 (62 Deterministic Anti-Slop Rules)',
    designMdLint.passed && (!isEducationProfile || designMdLint.surfaceMode === 'Read'),
    `Archetype=${designMdLint.archetype}, Mode=${designMdLint.surfaceMode}, RulesPassed=${designMdLint.passedRulesCount}/${designMdLint.totalRulesChecked}, Errors=${designMdLint.summary.errors}`
  );

  // 11. Profile-Specific Science Check:
  //     - Education (`Read`): Reading Measure `max-width` in `[60ch, 70ch]`, zero 3D/PBR bloat, APCA contrast & Fitts touch
  //     - Standard/SaaS: Thermal Rotation C > 0, Filament PBR, Camera FOV, Spring Physics, Tufte tnum & HIG/M3 Touch
  if (isEducationProfile) {
    const chMatches = [
      ...css.matchAll(/(?:max-width|--reading-measure)\s*:\s*(?:var\([^,]+,\s*)?(\d+(?:\.\d+)?)ch\b/gi)
    ].map((m) => Number(m[1]));
    const has60To70ChMeasure = chMatches.some((n) => n >= 60 && n <= 70);
    const zero3dFillerInDesignMd =
      !designMdRaw.includes('pbrMaterial:') &&
      !designMdRaw.includes('cameraFov:') &&
      !designMdRaw.includes('## Sonic & Video Identity') &&
      /allows3dEffects:\s*false/i.test(designMdRaw);
    const apcaOk = Boolean(optGeo.perceptualContrastVerified) && /APCA|Lc\s*>=\s*\d+/i.test(designMdRaw);
    const mobileTouchOk = Boolean(optGeo.fitts44pxMobileVerified);

    addCheck(
      'ryux-reading-ergonomics-and-apca',
      'Read-Mode Ergonomics (max-width 60ch–70ch, APCA Perceptual Contrast, Fitts >= 44px & Zero 3D Filler)',
      has60To70ChMeasure && zero3dFillerInDesignMd && apcaOk && mobileTouchOk,
      `ChMeasures=[${chMatches.join(', ')}ch], InRange60_70ch=${has60To70ChMeasure}, Zero3DFiller=${zero3dFillerInDesignMd}, APCA=${apcaOk}, MobileTouch=${mobileTouchOk}`
    );
  } else {
    const hasDeadDarkSurfaceChromaZero = /surface:\s*["']oklch\((?:[1-9]|1\d|2\d)%?\s+0(?:\.0+)?\s+0\)/i.test(designMdRaw);
    const hasPbrAndFovSpec = designMdRaw.includes('pbrMaterial:') && designMdRaw.includes('cameraFov:') && designMdRaw.includes('springPhysics:');
    const hasTabularNumsForOperate =
      !['fintech-and-banking', 'enterprise-erp-database'].includes(designMdLint.archetype) ||
      /tnum|tabular-nums/i.test(designMdRaw);
    const mobileTouchTargetsOk = Boolean(optGeo.fitts44pxMobileVerified);
    const visualSciencePassed =
      !hasDeadDarkSurfaceChromaZero && hasPbrAndFovSpec && hasTabularNumsForOperate && mobileTouchTargetsOk;

    addCheck(
      'ryux-visual-science-axioms',
      'Atomic Visual Science Axioms (OKLCH Thermal Rotation C>0, Filament PBR, Camera FOV, Tufte tnum & HIG/M3 Touch)',
      visualSciencePassed,
      `ThermalRotationOK=${!hasDeadDarkSurfaceChromaZero}, PBR_FOV_Spring=${hasPbrAndFovSpec}, TufteTabular=${hasTabularNumsForOperate}, MobileTouch=${mobileTouchTargetsOk}`
    );
  }

  // 12. Profile-Specific Media / Pedagogical Readability Check:
  //     - Education (`Read`): Spanish Readability (`readability_es.mjs`) across lesson `.mdx`/`.md` files + Zero unmuted autoplay
  //     - Standard/SaaS: Audio & Video Ergonomics, Mute Control, Sonic & Video Identity section & < 1.8 MB Budget
  const hasUnmutedAudioAutoplay = /<audio\b[^>]*\bautoplay\b/i.test(html);
  const hasUnmutedVideoAutoplay = /<video\b[^>]*\bautoplay\b(?![^>]*\bmuted\b)/i.test(html);

  if (isEducationProfile) {
    const lessonDirs = [
      path.join(ROOT, 'src', 'content'),
      path.join(ROOT, 'src', 'pages', 'niveles'),
      path.join(ROOT, 'lessons')
    ];
    const lessonFiles = [];
    for (const ld of lessonDirs) {
      collectFilesByExtension(ld, ['.mdx', '.md'], lessonFiles);
    }

    let lessonsPassedCount = 0;
    const readabilityFailures = [];
    for (const lf of lessonFiles) {
      const rawLesson = fs.readFileSync(lf, 'utf8');
      const levelMatch = /^level\s*:\s*([123])\b/m.exec(rawLesson);
      const level = levelMatch ? Number(levelMatch[1]) : 1;
      const rep = analyzeSpanishReadability(rawLesson, { level });
      if (rep.passed) {
        lessonsPassedCount++;
      } else {
        readabilityFailures.push(`${path.basename(lf)}(L${level}:INFLESZ=${rep.infleszScore},maxPara=${rep.maxParagraphWords},voseo=${rep.voseoViolations.length})`);
      }
    }

    const readabilityPassed =
      lessonFiles.length > 0 &&
      readabilityFailures.length === 0 &&
      !hasUnmutedAudioAutoplay &&
      !hasUnmutedVideoAutoplay;

    addCheck(
      'ryux-readability-es-and-calm-media',
      'Spanish Pedagogical Readability (readability_es.mjs INFLESZ, <=110w Paragraphs, Neutral tú) & Zero Autoplay',
      readabilityPassed,
      lessonFiles.length > 0
        ? `LessonsVerified=${lessonsPassedCount}/${lessonFiles.length}, Failures=[${readabilityFailures.join('; ') || 'none'}], NoAutoplay=${!hasUnmutedAudioAutoplay && !hasUnmutedVideoAutoplay}`
        : 'MISSING_LESSONS: Expected at least 1 .mdx/.md lesson file in src/content/ or src/pages/niveles/'
    );
  } else {
    const webAudioDirectorFile = path.resolve(path.dirname(__filename), '..', '..', 'templates', 'components', 'web-audio-director.js');
    const webAudioDirectorRaw = fs.existsSync(webAudioDirectorFile) ? fs.readFileSync(webAudioDirectorFile, 'utf8') : '';
    const hasMuteControlSupport =
      webAudioDirectorRaw.includes('data-audio-mute-toggle') &&
      (!/<(?:audio|video)\b/i.test(html) || /data-audio-mute-toggle|\bmuted\b/i.test(html));

    const maxVideoBudgetBytes = Math.floor(1.8 * 1024 * 1024);
    const videoDir = path.join(ROOT, 'public', 'assets', 'video');
    let videoBudgetOk = true;
    let maxObservedVideoBytes = 0;
    if (fs.existsSync(videoDir)) {
      for (const f of fs.readdirSync(videoDir)) {
        if (/\.(?:webm|mp4)$/i.test(f)) {
          const size = fs.statSync(path.join(videoDir, f)).size;
          if (size > maxObservedVideoBytes) maxObservedVideoBytes = size;
          if (size >= maxVideoBudgetBytes) videoBudgetOk = false;
        }
      }
    }
    const hasSonicVideoSection = designMdRaw.includes('## Sonic & Video Identity');
    const audioVideoPassed =
      !hasUnmutedAudioAutoplay &&
      !hasUnmutedVideoAutoplay &&
      hasMuteControlSupport &&
      videoBudgetOk &&
      hasSonicVideoSection &&
      hasOptGeoEvidence &&
      Number(optGeo.fpsMeasured) >= 55;

    addCheck(
      'ryux-audio-video-ergonomics-and-budget',
      'Audio/Video Autoplay Guard, Accessible Mute Toggle, < 1.8 MB Video Budget & 60 FPS Ergonomics',
      audioVideoPassed,
      `NoUnmutedAutoplay=${!hasUnmutedAudioAutoplay && !hasUnmutedVideoAutoplay}, MuteToggle=${hasMuteControlSupport}, VideoMaxKB=${(maxObservedVideoBytes / 1024).toFixed(1)}KB (<1843.2KB), SonicIdentitySection=${hasSonicVideoSection}`
    );
  }

  // 13. Client Brand Identity Lock Verification (BRAND_IDENTITY_LOCK.json -> STRICT_EXISTING_BRAND)
  const brandLockPath = path.join(ROOT, 'BRAND_IDENTITY_LOCK.json');
  let brandLockPassed = true;
  let brandLockEvidence = 'BrandIdentityLock=NONE_OR_FLEXIBLE';
  if (fs.existsSync(brandLockPath)) {
    try {
      const brandLock = JSON.parse(fs.readFileSync(brandLockPath, 'utf8'));
      const mode = brandLock.brandIdentityMode || 'PARTIAL_BRAND_EVOLUTION';
      if (mode === 'STRICT_EXISTING_BRAND' || brandLock.lockClientPalette === true) {
        const distCss = readFirstExisting(ROOT, [
          'dist/css/style.css',
          'dist/css/design-tokens.css',
          'site/css/design-tokens.css',
          'src/styles/design-tokens.css'
        ]);
        const distHtml = readFirstExisting(ROOT, ['dist/index.html', 'index.html', 'site/index.html']);
        const combinedCssAndHtml = `${css}\n${distCss}\n${html}\n${distHtml}\n${designMdRaw}`;
        const primaryExpected = String(brandLock.officialPalette?.primaryBrandColor || '').trim();
        const accentExpected = String(brandLock.officialPalette?.accentBrandColor || '').trim();
        const logoExpected = String(brandLock.logoAssets?.primaryLogoPath || '').trim();
        const isotipoExpected = String(brandLock.logoAssets?.isotipoPath || '').trim();

        const paletteMatched =
          (!primaryExpected || combinedCssAndHtml.toLowerCase().includes(primaryExpected.toLowerCase())) &&
          (!accentExpected || combinedCssAndHtml.toLowerCase().includes(accentExpected.toLowerCase()));
        const logoMatched =
          (!logoExpected || combinedCssAndHtml.includes(logoExpected) || combinedCssAndHtml.includes(path.basename(logoExpected))) &&
          (!isotipoExpected || combinedCssAndHtml.includes(isotipoExpected) || combinedCssAndHtml.includes(path.basename(isotipoExpected)));

        brandLockPassed = Boolean(paletteMatched && logoMatched);
        brandLockEvidence = `Mode=${mode}, LockPalette=${Boolean(brandLock.lockClientPalette)}, PaletteMatched=${paletteMatched} (${primaryExpected}), LogoMatched=${logoMatched}`;
      } else {
        brandLockEvidence = `Mode=${mode}, LockPalette=${Boolean(brandLock.lockClientPalette)} (Verified)`;
      }
    } catch (err) {
      brandLockPassed = false;
      brandLockEvidence = `Invalid BRAND_IDENTITY_LOCK.json: ${err.message}`;
    }
  }
  addCheck(
    'ryux-brand-identity-lock',
    'Client Brand Identity Lock (BRAND_IDENTITY_LOCK.json Palette & Logo/Isotipo Fidelity)',
    brandLockPassed,
    brandLockEvidence
  );

  // 14. Intra-Category Uniqueness & Surface Topology
  const activeDna = synthesizeUniqueBrandDna({
    projectSlug: activeCfg.id || 'agencia-alfa',
    industryCategory: isEducationProfile ? 'education' : (activeCfg.industryArchetype || activeCfg.archetype || 'saas'),
    persistInLedger: true
  });
  const divergenceOk = activeDna.morphologicalDivergenceScore >= MIN_DIVERGENCE_THRESHOLD;
  const harmonyOk = activeDna.aestheticHarmonyScore >= MIN_HARMONY_SCORE;

  const optHarmony = hasOptGeoEvidence ? optGeo.visualHarmonyAndMotion?.opticalHarmonyMetrics : null;
  const motionStrip = hasOptGeoEvidence ? optGeo.visualHarmonyAndMotion?.motionKeyframeStrip : null;
  const opticalAndMotionPassed = Boolean(
    optHarmony &&
      motionStrip &&
      optHarmony.whitespaceRatio >= 0.35 &&
      optHarmony.whitespaceRatio <= 0.68 &&
      optHarmony.axialAlignmentScore >= 0.90 &&
      optHarmony.geometricRhythmConsistency >= 0.90 &&
      motionStrip.all4KeyframesVerified === true
  );

  if (isEducationProfile) {
    const hasEditorialLayoutPrimitive =
      css.includes('prose-editorial') ||
      css.includes('--reading-measure') ||
      html.includes('prose-editorial') ||
      html.includes('data-reading-surface');
    const check14EduPassed = divergenceOk && harmonyOk && opticalAndMotionPassed && hasEditorialLayoutPrimitive;
    addCheck(
      'ryux-editorial-layout-harmony',
      'Editorial Layout Harmony (Single-Column Read Topology, Whitespace 0.35..0.68 & Axial Alignment >= 0.90)',
      check14EduPassed,
      `Grid=${activeDna.gridTopology}, EditorialPrimitive=${hasEditorialLayoutPrimitive}, Div=${activeDna.morphologicalDivergenceScore}, Harmony=${activeDna.aestheticHarmonyScore}, Whitespace=${optHarmony?.whitespaceRatio ?? 'MISSING'}`
    );
  } else {
    const hasBrandDnaSectionInDesignMd =
      designMdRaw.includes('## Brand DNA Vector & Bespoke Morphology') &&
      designMdRaw.includes('gridTopology') &&
      designMdRaw.includes('heroArchitecture') &&
      designMdRaw.includes('gamutMaskType');
    const uiPrimitivesRaw = readFirstExisting(ROOT, [
      'dist/css/ui-primitives.css',
      'site/css/ui-primitives.css',
      'src/styles/ui-primitives.css',
      'templates/vanilla-edge/site/css/ui-primitives.css'
    ]);
    const distTopologySupported =
      uiPrimitivesRaw.includes('data-grid-topology') ||
      css.includes('bento-grid') ||
      html.includes('bento-grid');

    const check14Passed =
      hasBrandDnaSectionInDesignMd &&
      divergenceOk &&
      harmonyOk &&
      opticalAndMotionPassed &&
      distTopologySupported;

    addCheck(
      'ryux-intra-category-uniqueness-and-bespoke-dna',
      'Intra-Category Uniqueness (Divergence >= 0.70), Birkhoff Harmony (>= 0.85), 3 Optical Metrics & 4-Frame Motion Strip',
      check14Passed,
      `Grid=${activeDna.gridTopology}, Hero=${activeDna.heroArchitecture}, Div=${activeDna.morphologicalDivergenceScore} (>=0.70), Harmony=${activeDna.aestheticHarmonyScore} (>=0.85), Whitespace=${optHarmony?.whitespaceRatio ?? 'MISSING'}, Axial=${optHarmony?.axialAlignmentScore ?? 'MISSING'}, Rhythm=${optHarmony?.geometricRhythmConsistency ?? 'MISSING'}, 4Keyframes=${Boolean(motionStrip?.all4KeyframesVerified)}`
    );
  }

  const passedCount = checks.filter((c) => c.passed).length;
  const score = !hasOptGeoEvidence ? 0 : Math.round((passedCount / checks.length) * 100);
  const passed = hasOptGeoEvidence && passedCount === checks.length;

  return {
    timestamp: new Date().toISOString(),
    projectId: activeCfg.id,
    archetype: activeCfg.archetype,
    complianceProfile: activeCfg.complianceProfile,
    industryArchetype: designMdLint.archetype,
    surfaceMode: designMdLint.surfaceMode,
    styleSkill: activeCfg.design?.styleSkill || 'default-90-8-2-oklch',
    score,
    passed,
    ...(hasOptGeoEvidence ? {} : { reason: 'MISSING_EVIDENCE' }),
    passedCount,
    totalChecks: checks.length,
    opticalGeometry: optGeo,
    designMdLint,
    checks
  };
}

/**
 * Autonomous Aesthetic Self-Healing Loop (Impeccable FinOps Bounded Passes: Max 2 Passes)
 */
export async function runAutonomousAestheticRepairLoop(options = {}) {
  const maxIterations = Math.min(2, Number(options.maxIterations || 2));
  const minScore = Number(options.minScore || 92);
  const activeCfg = loadProjectConfig(options.project || '');
  const ROOT = activeCfg.projectRoot;
  const isEducationProfile = activeCfg.complianceProfile === 'education';
  const { runCognitiveUxAudit } = await import('./cognitive_ux_auditor.mjs');

  const history = [];
  for (let iter = 1; iter <= maxIterations; iter++) {
    const ryuxRes = runRyuxDesignGate(activeCfg);
    const cogRes = runCognitiveUxAudit(activeCfg);
    const vlmRes = await evaluateVisualArchetypeWithVlm({
      projectRoot: ROOT,
      archetype: isEducationProfile ? 'education' : (activeCfg.industryArchetype || activeCfg.archetype || 'saas'),
      screenshots: ['1440px', '768px', '375px'],
      passNumber: iter,
      maxPasses: maxIterations
    });
    const cogScore = Number(cogRes?.score ?? 0);
    const vlmScore = Number(vlmRes?.score ?? 0);
    const combinedScore = Math.min(ryuxRes.score, cogScore, vlmScore);

    const failedRyux = ryuxRes.checks.filter((c) => !c.passed);
    const defectPacket = {
      iteration: iter,
      maxIterations,
      ryuxScore: ryuxRes.score,
      cognitiveUxScore: cogScore,
      vlmRubricScore: vlmScore,
      vlmPillars: vlmRes.pillars,
      combinedFloorScore: combinedScore,
      threshold: minScore,
      passed: combinedScore >= minScore,
      dispatchedToRoles: combinedScore < minScore ? ['ux-designer', 'senior-coder'] : [],
      defects: failedRyux.map((d) => ({
        id: d.id,
        label: d.label,
        evidence: d.evidence,
        remediation: 'Re-compile W3C DTCG tokens, verify DESIGN.md Read/Persuade surface invariants, and enforce CSS Baseline 2026 utilities.'
      }))
    };
    history.push(defectPacket);

    if (combinedScore >= minScore) {
      return {
        passed: true,
        iterationsUsed: iter,
        maxIterations,
        boundedPassesRuleEnforced: true,
        finalScore: combinedScore,
        ryuxReport: ryuxRes,
        vlmRubric: vlmRes,
        history
      };
    }

    if (!isEducationProfile) {
      try {
        generateProductAndDesignMd(ROOT, activeCfg.industryArchetype || activeCfg.archetype || 'saas');
        const { compileDesignTokens } = await import('../design/token_compiler.mjs');
        compileDesignTokens({ projectDir: ROOT });
      } catch (_) {}
    }
  }

  const last = history[history.length - 1];
  return {
    passed: false,
    iterationsUsed: maxIterations,
    maxIterations,
    boundedPassesRuleEnforced: true,
    finalScore: last.combinedFloorScore,
    escalateToCtoHitl: true,
    ryuxReport: runRyuxDesignGate(activeCfg),
    history
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  runAutonomousAestheticRepairLoop({ maxIterations: 2, minScore: 92 }).then((loopRes) => {
    const report = loopRes.ryuxReport;
    console.log('======================================================');
    console.log(`🎨 RYUX v2.14.2 DESIGN INTELLIGENCE & ANTI-SLOP GATE [${report.projectId}]`);
    console.log('======================================================');
    for (const c of report.checks) {
      console.log(`  ${c.passed ? '✓' : '✗'} [${c.id}] ${c.label} (${c.evidence})`);
    }
    console.log('------------------------------------------------------');
    console.log(`🔄 Aesthetic Self-Healing Loop : ${loopRes.passed ? 'PASSED' : 'ESCALATE TO CTO'} (Iteration ${loopRes.iterationsUsed}/${loopRes.maxIterations} | Floor >= 92)`);
    console.log(`🏆 RYUX DESIGN SCORE           : ${report.score}/100 (${report.passedCount}/${report.totalChecks}) | Mode: ${report.surfaceMode} | Style: ${report.styleSkill}`);
    console.log('======================================================\n');
    process.exit(loopRes.passed ? 0 : 1);
  });
}
