#!/usr/bin/env node
/**
 * tools/design/bespoke_morphology_composer.mjs — Bespoke Morphology Composer, Harmonic Constellation Solver & Anti-Clone DNA Ledger
 * ====================================================================================================================================
 * Guarantees intra-category morphological uniqueness (`Divergence Score >= 0.70`, 0 collisions) AND
 * Birkhoff Aesthetic Harmony (`Aesthetic Harmony Score >= 0.85`, M = O / C, `maxSimultaneousHighComplexityAxes <= 2`).
 *
 * Connected to:
 *   - `tools/design/industry_archetype_matrix.mjs` (`getArchetypeFunctionalInvariants`, `getOpenMorphologicalSpaceForArchetype`)
 *   - `tools/design/token_compiler.mjs` (`OKLCH_GAMUT_MASKS`, `applyOklchGamutMask`)
 *   - `tools/design/build_vanilla_primitives.mjs` (`NAVIGATION_MORPHOLOGY_VARIANTS`, `CORNER_GEOMETRY_VARIANTS`, `SURFACE_MATERIAL_PHYSICS`)
 *   - `tools/design/shader_and_3d_forge.mjs` (`generateParametric3dShaderConfig`)
 *   - `tools/design/programmatic_video_forge.mjs` (`generateParametricIntroChoreography`)
 *   - `tools/orchestrator/client_interview_gate.mjs` (`CLIENT_BRIEF_INTERVIEW.json` & `SPEC.md`)
 * ====================================================================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  FACTORY_ROOT,
  resolveIndustryArchetype,
  getArchetypeFunctionalInvariants,
  getOpenMorphologicalSpaceForArchetype
} from './industry_archetype_matrix.mjs';
import { OKLCH_GAMUT_MASKS, applyOklchGamutMask } from './token_compiler.mjs';
import {
  compileComponentMorphologyPrimitives
} from './build_vanilla_primitives.mjs';
import { generateParametric3dShaderConfig } from './shader_and_3d_forge.mjs';
import { generateParametricIntroChoreography } from './programmatic_video_forge.mjs';

const __filename = fileURLToPath(import.meta.url);
export const LEDGER_PATH = path.join(FACTORY_ROOT, '.agents', 'memory', 'project_dna_fingerprints.json');
export const MIN_DIVERGENCE_THRESHOLD = 0.70;
export const MIN_HARMONY_SCORE = 0.85;
export const MAX_SIMULTANEOUS_HIGH_COMPLEXITY_AXES = 2;

/**
 * Axis 1 — 8 Structural Grid & Layout Topologies (`gridTopology`)
 */
export const GRID_TOPOLOGY_CATALOG = Object.freeze([
  'swiss-asymmetric-editorial',
  'kinetic-scrollytelling-stage',
  'architectural-brutalist-monolith',
  'tufte-high-density-data',
  'split-screen-sticky-narrative',
  'golden-ratio-bento-matrix',
  'editorial-magazine-spread',
  'interactive-webgl-spatial-canvas'
]);

/**
 * Axis 2 — 10 Hero & First-Impact DOM Architectures (`heroArchitecture`)
 */
export const HERO_ARCHITECTURE_CATALOG = Object.freeze([
  'monumental-typographic-manifesto',
  'asymmetric-split-3d-diorama',
  'inset-architectural-video-frame',
  'live-interactive-product-sandbox',
  'numbered-editorial-index-hero',
  'kinetic-shader-portal',
  'minimalist-high-trust-authority',
  'layered-cards-depth-parallax',
  'full-bleed-cinematic-story',
  'command-first-search-hero'
]);

/**
 * Axis 5 — 20 Curated Expressive Font Pairing Profiles (`fontPairingProfile`)
 * With custom Utopia clamp() scale ratios (`1.200 Minor Third`, `1.250 Major Third`, `1.333 Perfect Fourth`, `1.414 Augmented Fourth`)
 */
export const FONT_PAIRING_PROFILES = Object.freeze([
  {
    id: 'swiss-precision-geist-jetbrains',
    displayFont: "'Geist', 'Inter', system-ui, sans-serif",
    sansFont: "'Geist', system-ui, sans-serif",
    monoFont: "'Geist Mono', 'JetBrains Mono', monospace",
    utopiaRatio: 1.25,
    utopiaScaleName: '1.250 Major Third',
    constellationFamily: 'technical-precision'
  },
  {
    id: 'editorial-broadsheet-newsreader-jakarta',
    displayFont: "'Newsreader', 'Instrument Serif', Georgia, serif",
    sansFont: "'Plus Jakarta Sans', system-ui, sans-serif",
    monoFont: "'JetBrains Mono', monospace",
    utopiaRatio: 1.333,
    utopiaScaleName: '1.333 Perfect Fourth',
    constellationFamily: 'editorial-authority'
  },
  {
    id: 'tufte-quantitative-public-plex',
    displayFont: "'Public Sans', system-ui, sans-serif",
    sansFont: "'Public Sans', system-ui, sans-serif",
    monoFont: "'IBM Plex Mono', 'JetBrains Mono', monospace",
    utopiaRatio: 1.2,
    utopiaScaleName: '1.200 Minor Third',
    constellationFamily: 'high-density-operate'
  },
  {
    id: 'monumental-serif-instrument-satoshi',
    displayFont: "'Instrument Serif', Georgia, serif",
    sansFont: "'Satoshi', 'Plus Jakarta Sans', sans-serif",
    monoFont: "'Commit Mono', monospace",
    utopiaRatio: 1.414,
    utopiaScaleName: '1.414 Augmented Fourth',
    constellationFamily: 'dramatic-editorial'
  },
  {
    id: 'neo-grotesque-cabinet-general',
    displayFont: "'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif",
    sansFont: "'General Sans', system-ui, sans-serif",
    monoFont: "'JetBrains Mono', monospace",
    utopiaRatio: 1.333,
    utopiaScaleName: '1.333 Perfect Fourth',
    constellationFamily: 'kinetic-modern'
  },
  {
    id: 'architectural-monolith-space-dm',
    displayFont: "'Space Grotesk', system-ui, sans-serif",
    sansFont: "'DM Sans', system-ui, sans-serif",
    monoFont: "'Space Mono', monospace",
    utopiaRatio: 1.333,
    utopiaScaleName: '1.333 Perfect Fourth',
    constellationFamily: 'brutalist-structural'
  },
  {
    id: 'luxury-maison-cormorant-manrope',
    displayFont: "'Cormorant Garamond', Georgia, serif",
    sansFont: "'Manrope', system-ui, sans-serif",
    monoFont: "'Fira Code', monospace",
    utopiaRatio: 1.414,
    utopiaScaleName: '1.414 Augmented Fourth',
    constellationFamily: 'luxury-serenity'
  },
  {
    id: 'institutional-ledger-fraunces-switzer',
    displayFont: "'Fraunces', Georgia, serif",
    sansFont: "'Switzer', 'Plus Jakarta Sans', sans-serif",
    monoFont: "'Berkeley Mono', 'JetBrains Mono', monospace",
    utopiaRatio: 1.25,
    utopiaScaleName: '1.250 Major Third',
    constellationFamily: 'editorial-authority'
  },
  {
    id: 'tactical-hud-chakra-azeret',
    displayFont: "'Chakra Petch', 'Space Grotesk', sans-serif",
    sansFont: "'Plus Jakarta Sans', system-ui, sans-serif",
    monoFont: "'Azeret Mono', monospace",
    utopiaRatio: 1.414,
    utopiaScaleName: '1.414 Augmented Fourth',
    constellationFamily: 'tactical-immersive'
  },
  {
    id: 'biophilic-clinical-lora-atkinson',
    displayFont: "'Lora', Georgia, serif",
    sansFont: "'Atkinson Hyperlegible', 'Public Sans', sans-serif",
    monoFont: "'IBM Plex Mono', monospace",
    utopiaRatio: 1.25,
    utopiaScaleName: '1.250 Major Third',
    constellationFamily: 'calm-humanist'
  },
  {
    id: 'zurich-international-archivo-inter',
    displayFont: "'Archivo', system-ui, sans-serif",
    sansFont: "'Inter', system-ui, sans-serif",
    monoFont: "'Roboto Mono', monospace",
    utopiaRatio: 1.2,
    utopiaScaleName: '1.200 Minor Third',
    constellationFamily: 'high-density-operate'
  },
  {
    id: 'atelier-flagship-playfair-outfit',
    displayFont: "'Playfair Display', Georgia, serif",
    sansFont: "'Outfit', system-ui, sans-serif",
    monoFont: "'JetBrains Mono', monospace",
    utopiaRatio: 1.333,
    utopiaScaleName: '1.333 Perfect Fourth',
    constellationFamily: 'luxury-serenity'
  },
  {
    id: 'hyper-saas-bricolage-hanken',
    displayFont: "'Bricolage Grotesque', system-ui, sans-serif",
    sansFont: "'Hanken Grotesk', system-ui, sans-serif",
    monoFont: "'Geist Mono', monospace",
    utopiaRatio: 1.333,
    utopiaScaleName: '1.333 Perfect Fourth',
    constellationFamily: 'kinetic-modern'
  },
  {
    id: 'sovereign-legal-ebgaramond-work',
    displayFont: "'EB Garamond', Georgia, serif",
    sansFont: "'Work Sans', system-ui, sans-serif",
    monoFont: "'Inconsolata', monospace",
    utopiaRatio: 1.25,
    utopiaScaleName: '1.250 Major Third',
    constellationFamily: 'editorial-authority'
  },
  {
    id: 'quant-terminal-soehne-mono',
    displayFont: "'Schibsted Grotesk', system-ui, sans-serif",
    sansFont: "'Schibsted Grotesk', system-ui, sans-serif",
    monoFont: "'Martian Mono', 'JetBrains Mono', monospace",
    utopiaRatio: 1.2,
    utopiaScaleName: '1.200 Minor Third',
    constellationFamily: 'technical-precision'
  },
  {
    id: 'avant-garde-syne-epilogue',
    displayFont: "'Syne', system-ui, sans-serif",
    sansFont: "'Epilogue', system-ui, sans-serif",
    monoFont: "'Space Mono', monospace",
    utopiaRatio: 1.414,
    utopiaScaleName: '1.414 Augmented Fourth',
    constellationFamily: 'dramatic-editorial'
  },
  {
    id: 'nordic-minimal-Onest-Fragment',
    displayFont: "'Onest', system-ui, sans-serif",
    sansFont: "'Onest', system-ui, sans-serif",
    monoFont: "'Fragment Mono', monospace",
    utopiaRatio: 1.25,
    utopiaScaleName: '1.250 Major Third',
    constellationFamily: 'calm-humanist'
  },
  {
    id: 'industrial-monolith-bebas-chivo',
    displayFont: "'Chivo', system-ui, sans-serif",
    sansFont: "'Chivo', system-ui, sans-serif",
    monoFont: "'Chivo Mono', monospace",
    utopiaRatio: 1.333,
    utopiaScaleName: '1.333 Perfect Fourth',
    constellationFamily: 'brutalist-structural'
  },
  {
    id: 'literary-salon-spectral-rubik',
    displayFont: "'Spectral', Georgia, serif",
    sansFont: "'Rubik', system-ui, sans-serif",
    monoFont: "'Source Code Pro', monospace",
    utopiaRatio: 1.25,
    utopiaScaleName: '1.250 Major Third',
    constellationFamily: 'editorial-authority'
  },
  {
    id: 'spatial-cinema-clash-urbanist',
    displayFont: "'Clash Display', 'Outfit', sans-serif",
    sansFont: "'Urbanist', system-ui, sans-serif",
    monoFont: "'JetBrains Mono', monospace",
    utopiaRatio: 1.333,
    utopiaScaleName: '1.333 Perfect Fourth',
    constellationFamily: 'tactical-immersive'
  }
]);

/**
 * Axis 6 — Motion Physics & Scroll Choreography Catalog (`motionPhysicsCriteria`)
 */
export const MOTION_PHYSICS_PROFILES = Object.freeze({
  'crisp-editorial-snap': {
    id: 'crisp-editorial-snap',
    dampingRatioZeta: 1.0,
    stiffness: 380,
    damping: 39,
    durationMs: 150,
    easingCss: 'cubic-bezier(0.22, 1, 0.36, 1)',
    description: 'Critically damped zero-overshoot snap (zeta = 1.0)'
  },
  'magnetic-precision-spring': {
    id: 'magnetic-precision-spring',
    dampingRatioZeta: 0.82,
    stiffness: 290,
    damping: 28,
    durationMs: 260,
    easingCss: 'linear(0, 0.3566 9.6%, 0.7852 21.1%, 1.0156 32.2%, 1.0468 53.6%, 1)',
    description: 'Magnetic precision spring with subtle controlled settle (zeta = 0.82)'
  },
  'fluid-silk-inertia': {
    id: 'fluid-silk-inertia',
    dampingRatioZeta: 0.72,
    stiffness: 195,
    damping: 20,
    durationMs: 420,
    easingCss: 'cubic-bezier(0.16, 1, 0.3, 1)',
    description: 'Fluid silk cinematic inertia (zeta = 0.72)'
  }
});

export const SCROLL_CHOREOGRAPHY_VARIANTS = Object.freeze([
  'vector-mask-reveal',
  'z-depth-layered-parallax',
  'sticky-step-reveal',
  'native-view-transitions-morph'
]);

/**
 * Brand Personality Tension Axes (Block 5 of Client Interview)
 */
export const BRAND_PERSONALITY_TENSIONS = Object.freeze([
  'clasico-atemporal vs vanguardista-disruptivo',
  'minimalismo-silencioso vs expresividad-cinetica',
  'editorial-organico vs ingenieril-geometrico'
]);

/**
 * Axis 7 — Intelligent Decision Tree for Brand Intro Video & 3D/Shader Effects (`evaluateIntroAnd3dNecessity`)
 */
export function evaluateIntroAnd3dNecessity({
  projectSlug = 'agencia-alfa',
  industryCategory = 'saas',
  primarySurfaceMode = 'Persuade',
  brandPersonalityTension: _brandPersonalityTension = 'minimalismo-silencioso vs expresividad-cinetica',
  gridTopology = 'golden-ratio-bento-matrix',
  heroArchitecture = 'live-interactive-product-sandbox',
  gamutMaskType = 'atmospheric-analogous',
  fontPairingProfile = 'swiss-precision-geist-jetbrains',
  componentMorphology = { nav: 'floating-island-bar', corner: '6px-tecnico', material: 'deep-obsidian-specular' },
  motionPhysicsCriteria = { transitionPhysics: 'magnetic-precision-spring' }
} = {}) {
  const arch = resolveIndustryArchetype(industryCategory);
  const normCat = arch.cliAlias;

  // High visual impact / experiential brands benefit from programmatic intro choreography;
  // High-speed transactional / operational / clinical portals must never block navigation.
  const highImpactCategories = ['lujo', 'streamer', 'ecommerce', 'saas'];
  const nonBlockingImmediateCategories = ['erp', 'clinica', 'abogacia', 'fintech'];

  const isHighVisualImpactHero = [
    'asymmetric-split-3d-diorama',
    'inset-architectural-video-frame',
    'kinetic-shader-portal',
    'full-bleed-cinematic-story'
  ].includes(heroArchitecture);

  const recommendFullIntroVideo =
    (highImpactCategories.includes(normCat) && isHighVisualImpactHero) ||
    normCat === 'lujo' ||
    normCat === 'streamer';

  const deliveryStrategy = nonBlockingImmediateCategories.includes(normCat)
    ? 'inline-non-blocking-hero-svg-lockup'
    : recommendFullIntroVideo
    ? 'inline-hero-canvas-non-blocking-60fps'
    : 'micro-vector-signature-reveal';

  const partialDna = {
    projectSlug,
    gridTopology,
    heroArchitecture,
    gamutMaskType,
    fontPairingProfile,
    componentMorphology,
    motionPhysicsCriteria
  };

  const parametricIntro = generateParametricIntroChoreography(partialDna, {
    aspectRatio: 1.0,
    pathCount: 3
  });
  const parametric3d = generateParametric3dShaderConfig(partialDna, {
    aspectRatio: 1.0
  });

  const uses3dOrShaderInHero = [
    'asymmetric-split-3d-diorama',
    'kinetic-shader-portal'
  ].includes(heroArchitecture) || gridTopology === 'interactive-webgl-spatial-canvas';

  return {
    recommendIntroVideo: recommendFullIntroVideo,
    deliveryStrategy,
    blocksInitialNavigation: false,
    rationale: recommendFullIntroVideo
      ? `Marca de alto impacto visual (${normCat} / ${heroArchitecture}): se integra coreografía paramétrica ${parametricIntro.choreographyId} a 60 FPS sin bloquear el hilo principal.`
      : `Prioridad en velocidad transaccional y claridad operativa (${normCat} / ${primarySurfaceMode}): se omite preloader bloqueante y se emplea revelado vectorial instantáneo (${parametricIntro.choreographyId}).`,
    introChoreographyId: parametricIntro.choreographyId,
    parametricIntroChoreography: parametricIntro,
    uses3dOrShaderInHero,
    forged3dMode: uses3dOrShaderInHero ? parametric3d.parametricId : 'orthographic-2d-clean',
    parametric3dShaderConfig: parametric3d
  };
}

/**
 * 2. HARMONIC COMPATIBILITY MATRIX & VISUAL COMPLEXITY BUDGET (`validateHarmonicAxisCoherence`)
 * ==============================================================================================
 * Implements Birkhoff's Aesthetic Measure (M = O / C, Order over Complexity) to forbid
 * visually dissonant axis combinations and enforce `maxSimultaneousHighComplexityAxes <= 2`.
 * Requires `aestheticHarmonyScore >= 0.85`.
 */
export function validateHarmonicAxisCoherence(dnaVector = {}) {
  const grid = dnaVector.gridTopology || 'golden-ratio-bento-matrix';
  const hero = dnaVector.heroArchitecture || 'live-interactive-product-sandbox';
  const morph = dnaVector.componentMorphology || {
    nav: 'floating-island-bar',
    corner: '6px-tecnico',
    material: 'deep-obsidian-specular'
  };
  const gamut = dnaVector.gamutMaskType || 'atmospheric-analogous';
  const fontId = dnaVector.fontPairingProfile || 'swiss-precision-geist-jetbrains';
  const fontObj = FONT_PAIRING_PROFILES.find((f) => f.id === fontId) || FONT_PAIRING_PROFILES[0];
  const motionId =
    dnaVector.motionPhysicsCriteria?.transitionPhysics ||
    dnaVector.transitionPhysics ||
    'magnetic-precision-spring';
  const motionObj = MOTION_PHYSICS_PROFILES[motionId] || MOTION_PHYSICS_PROFILES['magnetic-precision-spring'];
  const scrollId =
    dnaVector.motionPhysicsCriteria?.scrollChoreography ||
    dnaVector.scrollChoreography ||
    'native-view-transitions-morph';

  const violations = [];
  let penalty = 0;

  // Rule 1: Brutalist / Swiss Raw-Ink / Paper-Editorial grids & materials cannot mix with inflated 24px organic corners or unstable elastic bounce
  const isStrictOrthogonalWorld =
    grid === 'architectural-brutalist-monolith' ||
    morph.material === 'raw-ink-swiss-border' ||
    morph.material === 'paper-editorial';

  if (isStrictOrthogonalWorld && morph.corner === '24px-organico') {
    violations.push({
      ruleId: 'dissonance-orthogonal-vs-inflated-corner',
      message: `Prohibido combinar mundo ortogonal/editorial (${grid} / ${morph.material}) con bordes inflados 24px-organico.`
    });
    penalty += 0.25;
  }

  if (
    (grid === 'architectural-brutalist-monolith' || morph.material === 'raw-ink-swiss-border') &&
    motionObj.dampingRatioZeta < 0.78
  ) {
    violations.push({
      ruleId: 'dissonance-brutalist-vs-loose-inertia',
      message: `Prohibido combinar grilla brutalista/tinta cruda (${grid}) con amortiguación blanda (zeta=${motionObj.dampingRatioZeta} < 0.78).`
    });
    penalty += 0.22;
  }

  // Rule 2: Paper-editorial daylight surface cannot mix with tactical clip-path-bevel or magnetic-hud-dock
  if (
    morph.material === 'paper-editorial' &&
    (morph.corner === 'clip-path-bevel' || morph.nav === 'magnetic-hud-dock')
  ) {
    violations.push({
      ruleId: 'dissonance-paper-editorial-vs-hud-bevel',
      message: 'Prohibido mezclar superficie paper-editorial con cortes biselados HUD (clip-path-bevel / magnetic-hud-dock).'
    });
    penalty += 0.25;
  }

  // Rule 3: Tufte High-Density Data grid cannot mix with 1.414 Augmented Fourth display scale or full-bleed / shader chaos
  if (
    grid === 'tufte-high-density-data' &&
    (fontObj.utopiaRatio > 1.34 ||
      hero === 'kinetic-shader-portal' ||
      hero === 'full-bleed-cinematic-story')
  ) {
    violations.push({
      ruleId: 'dissonance-tufte-density-vs-dramatic-scale',
      message: `Grilla tufte-high-density-data exige escala tipográfica contenida (<= 1.333) y Hero funcional, no ${fontObj.utopiaScaleName} / ${hero}.`
    });
    penalty += 0.24;
  }

  // Rule 4: Frosted-glass requires rounded/technical corners, never 0px-recto brutalist monolith
  if (
    morph.material === 'frosted-glass' &&
    morph.corner === '0px-recto' &&
    grid === 'architectural-brutalist-monolith'
  ) {
    violations.push({
      ruleId: 'dissonance-frosted-glass-vs-brutalist-0px',
      message: 'Prohibido mezclar frosted-glass con esquinas 0px-recto en monolito brutalista.'
    });
    penalty += 0.20;
  }

  // Rule 5: Focal Complexity Budget (`maxSimultaneousHighComplexityAxes: 2`)
  const highComplexityAxes = [];
  if (grid === 'interactive-webgl-spatial-canvas' || grid === 'kinetic-scrollytelling-stage') {
    highComplexityAxes.push(`grid:${grid}`);
  }
  if (
    hero === 'asymmetric-split-3d-diorama' ||
    hero === 'kinetic-shader-portal' ||
    hero === 'full-bleed-cinematic-story'
  ) {
    highComplexityAxes.push(`hero:${hero}`);
  }
  if (morph.corner === 'clip-path-bevel') {
    highComplexityAxes.push(`corner:${morph.corner}`);
  }
  if (fontObj.utopiaRatio >= 1.41) {
    highComplexityAxes.push(`typeScale:${fontObj.utopiaScaleName}`);
  }
  if (scrollId === 'z-depth-layered-parallax' && motionObj.dampingRatioZeta < 0.76) {
    highComplexityAxes.push(`motion:${scrollId}+${motionId}`);
  }

  if (highComplexityAxes.length > MAX_SIMULTANEOUS_HIGH_COMPLEXITY_AXES) {
    violations.push({
      ruleId: 'focal-complexity-budget-exceeded',
      message: `Presupuesto de Complejidad Focal excedido (${highComplexityAxes.length}/${MAX_SIMULTANEOUS_HIGH_COMPLEXITY_AXES} ejes complejos simultáneos: ${highComplexityAxes.join(', ')}).`
    });
    penalty += 0.18 * (highComplexityAxes.length - MAX_SIMULTANEOUS_HIGH_COMPLEXITY_AXES);
  }

  // Compute Birkhoff Aesthetic Measure M = O / C normalized into [0, 1]
  const birkhoffOrderO = Number(Math.max(0.4, 1.0 - penalty).toFixed(3));
  const birkhoffComplexityC = Number((1.0 + highComplexityAxes.length * 0.04).toFixed(3));
  const rawScore = Math.min(0.99, Math.max(0.1, (birkhoffOrderO / birkhoffComplexityC) * 1.04));
  const aestheticHarmonyScore = Number(rawScore.toFixed(3));
  const passed = violations.length === 0 && aestheticHarmonyScore >= MIN_HARMONY_SCORE;

  return {
    passed,
    aestheticHarmonyScore,
    minHarmonyThreshold: MIN_HARMONY_SCORE,
    birkhoffOrderO,
    birkhoffComplexityC,
    highComplexityAxesCount: highComplexityAxes.length,
    maxSimultaneousHighComplexityAxes: MAX_SIMULTANEOUS_HIGH_COMPLEXITY_AXES,
    highComplexityAxes,
    gamutMaskVerified: Boolean(OKLCH_GAMUT_MASKS[gamut]),
    violations
  };
}

/**
 * 3. CROSS-PROJECT UNIQUENESS LEDGER (`.agents/memory/project_dna_fingerprints.json`)
 */
export function loadProjectDnaLedger(customLedgerPath = LEDGER_PATH) {
  if (!fs.existsSync(customLedgerPath)) {
    return {
      schemaVersion: '2026.36.2',
      minDivergenceThreshold: MIN_DIVERGENCE_THRESHOLD,
      minHarmonyScore: MIN_HARMONY_SCORE,
      updatedAt: new Date().toISOString(),
      projects: {}
    };
  }
  try {
    return JSON.parse(fs.readFileSync(customLedgerPath, 'utf8'));
  } catch {
    return {
      schemaVersion: '2026.36.2',
      minDivergenceThreshold: MIN_DIVERGENCE_THRESHOLD,
      minHarmonyScore: MIN_HARMONY_SCORE,
      updatedAt: new Date().toISOString(),
      projects: {}
    };
  }
}

export function saveProjectDnaLedger(ledger, customLedgerPath = LEDGER_PATH) {
  fs.mkdirSync(path.dirname(customLedgerPath), { recursive: true });
  ledger.updatedAt = new Date().toISOString();
  fs.writeFileSync(customLedgerPath, JSON.stringify(ledger, null, 2) + '\n', 'utf8');
  return ledger;
}

/**
 * Calculates morphological divergence distance (`0.00` identical -> `1.00` completely distinct)
 * between a candidate `Brand DNA Vector` and all registered prior projects in the same category.
 */
export function computeMorphologicalDivergenceScore(candidateDna, existingCategoryEntries = []) {
  const peers = existingCategoryEntries.filter(
    (entry) => entry && entry.projectSlug !== candidateDna.projectSlug
  );
  if (peers.length === 0) {
    return {
      passed: true,
      divergenceScore: 1.0,
      minDivergenceThreshold: MIN_DIVERGENCE_THRESHOLD,
      comparedAgainstCount: 0,
      collidingProjects: [],
      axisCollisions: []
    };
  }

  let minDistanceObserved = 1.0;
  const collidingProjects = [];
  const allAxisCollisions = [];

  for (const peer of peers) {
    const pDna = peer.brandDnaVector || peer;
    let diffPoints = 0;
    const totalWeights = 7;
    const collisionsWithPeer = [];

    // 1. Grid Topology (Strict no-repeat in same category)
    if (candidateDna.gridTopology !== pDna.gridTopology) {
      diffPoints += 1.25;
    } else {
      collisionsWithPeer.push(`gridTopology:${candidateDna.gridTopology}`);
    }

    // 2. Hero Architecture (Strict no-repeat in same category)
    if (candidateDna.heroArchitecture !== pDna.heroArchitecture) {
      diffPoints += 1.25;
    } else {
      collisionsWithPeer.push(`heroArchitecture:${candidateDna.heroArchitecture}`);
    }

    // 3. Component Morphology (nav + corner + material)
    const cMorph = `${candidateDna.componentMorphology?.nav}|${candidateDna.componentMorphology?.corner}|${candidateDna.componentMorphology?.material}`;
    const pMorph = `${pDna.componentMorphology?.nav}|${pDna.componentMorphology?.corner}|${pDna.componentMorphology?.material}`;
    if (cMorph !== pMorph) {
      diffPoints += 1.0;
    } else {
      collisionsWithPeer.push(`componentMorphology:${cMorph}`);
    }

    // 4. OKLCH Gamut Mask Type
    if (candidateDna.gamutMaskType !== pDna.gamutMaskType) {
      diffPoints += 1.0;
    } else {
      collisionsWithPeer.push(`gamutMaskType:${candidateDna.gamutMaskType}`);
    }

    // 5. Font Pairing Profile (Strict no-repeat in same category)
    if (candidateDna.fontPairingProfile !== pDna.fontPairingProfile) {
      diffPoints += 1.0;
    } else {
      collisionsWithPeer.push(`fontPairingProfile:${candidateDna.fontPairingProfile}`);
    }

    // 6. Motion Physics & Scroll Choreography
    const cMotion = `${candidateDna.motionPhysicsCriteria?.transitionPhysics}|${candidateDna.motionPhysicsCriteria?.scrollChoreography}`;
    const pMotion = `${pDna.motionPhysicsCriteria?.transitionPhysics}|${pDna.motionPhysicsCriteria?.scrollChoreography}`;
    if (cMotion !== pMotion) {
      diffPoints += 0.75;
    } else {
      collisionsWithPeer.push(`motionPhysicsCriteria:${cMotion}`);
    }

    // 7. Intro Choreography ID
    const cIntro = candidateDna.introAnd3dDecision?.introChoreographyId || candidateDna.introChoreographyId;
    const pIntro = pDna.introAnd3dDecision?.introChoreographyId || pDna.introChoreographyId;
    if (cIntro !== pIntro) {
      diffPoints += 0.75;
    } else {
      collisionsWithPeer.push(`introChoreography:${cIntro}`);
    }

    const pairDistance = Number(Math.min(1.0, diffPoints / totalWeights).toFixed(3));
    if (pairDistance < minDistanceObserved) {
      minDistanceObserved = pairDistance;
    }

    const hasForbiddenPrimaryCollision =
      candidateDna.gridTopology === pDna.gridTopology ||
      candidateDna.heroArchitecture === pDna.heroArchitecture ||
      candidateDna.fontPairingProfile === pDna.fontPairingProfile ||
      candidateDna.gamutMaskType === pDna.gamutMaskType;

    if (pairDistance < MIN_DIVERGENCE_THRESHOLD || hasForbiddenPrimaryCollision) {
      collidingProjects.push(peer.projectSlug || 'unknown-peer');
      allAxisCollisions.push(...collisionsWithPeer);
    }
  }

  const passed =
    minDistanceObserved >= MIN_DIVERGENCE_THRESHOLD && collidingProjects.length === 0;

  return {
    passed,
    divergenceScore: minDistanceObserved,
    minDivergenceThreshold: MIN_DIVERGENCE_THRESHOLD,
    comparedAgainstCount: peers.length,
    collidingProjects,
    axisCollisions: Array.from(new Set(allAxisCollisions))
  };
}

/**
 * 1. SYNTHESIZE UNIQUE BRAND DNA VECTOR (`synthesizeUniqueBrandDna`)
 * ===================================================================
 * Synthesizes a 7-axis `Brand DNA Vector` for a project, ensuring:
 *   - `Divergence Score >= 0.70` (zero primary axis collisions with prior projects of the same category)
 *   - `Aesthetic Harmony Score >= 0.85` (Birkhoff M = O / C, `maxSimultaneousHighComplexityAxes <= 2`)
 */
export function synthesizeUniqueBrandDna({
  projectSlug = 'agencia-alfa',
  industryCategory = 'saas',
  brandPersonalityTension = 'minimalismo-silencioso vs expresividad-cinetica',
  morphologyMode = 'auto-bespoke-criteria',
  baseHue = 255,
  persistInLedger = true,
  customLedgerPath = LEDGER_PATH
} = {}) {
  const arch = resolveIndustryArchetype(industryCategory);
  const openSpace = getOpenMorphologicalSpaceForArchetype(arch.id);
  const funcInvariants = getArchetypeFunctionalInvariants(arch.id);
  const ledger = loadProjectDnaLedger(customLedgerPath);

  const existingCategoryEntries = Object.values(ledger.projects || {}).filter(
    (p) =>
      p.projectSlug !== projectSlug &&
      (p.archetypeId === arch.id || p.industryCategory === arch.cliAlias)
  );

  // Deterministic hash seed from projectSlug + industryCategory + brandPersonalityTension
  const seedStr = `${projectSlug}::${arch.id}::${brandPersonalityTension}::${morphologyMode}`;
  let seedHash = 2166136261;
  for (let i = 0; i < seedStr.length; i++) {
    seedHash ^= seedStr.charCodeAt(i);
    seedHash = Math.imul(seedHash, 16777619) >>> 0;
  }

  const grids = openSpace.allowedGridTopologies || GRID_TOPOLOGY_CATALOG;
  const heroes = openSpace.allowedHeroArchitectures || HERO_ARCHITECTURE_CATALOG;
  const morphs = openSpace.allowedComponentMorphologies;
  const gamuts = openSpace.allowedGamutMasks || Object.keys(OKLCH_GAMUT_MASKS);
  const motions = openSpace.allowedMotionProfiles || Object.keys(MOTION_PHYSICS_PROFILES);

  // Filter compatible font pairings for this archetype
  const compatibleFonts = FONT_PAIRING_PROFILES.filter((f) => {
    if (arch.primarySurfaceMode === 'Operate' && f.utopiaRatio > 1.34) return false;
    return true;
  });

  let selectedDna = null;
  let bestHarmony = null;
  let bestDivergence = null;

  // Search across candidate constellations (up to 120 deterministic solver steps)
  for (let attempt = 0; attempt < 120; attempt++) {
    const gIdx = (seedHash + attempt * 3) % grids.length;
    const hIdx = ((seedHash >>> 3) + attempt * 5) % heroes.length;
    const mIdx = ((seedHash >>> 6) + attempt * 2) % morphs.length;
    const cIdx = ((seedHash >>> 9) + attempt) % gamuts.length;
    const fIdx = ((seedHash >>> 12) + attempt * 7) % compatibleFonts.length;
    const pIdx = ((seedHash >>> 15) + attempt) % motions.length;
    const sIdx = ((seedHash >>> 18) + attempt * 3) % SCROLL_CHOREOGRAPHY_VARIANTS.length;

    let gridTopology = grids[gIdx];
    let heroArchitecture = heroes[hIdx];
    let componentMorphology = { ...morphs[mIdx] };
    const gamutMaskType = gamuts[cIdx];
    let fontObj = compatibleFonts[fIdx];
    let transitionPhysics = motions[pIdx];
    let scrollChoreography = SCROLL_CHOREOGRAPHY_VARIANTS[sIdx];

    // Auto-calm surrounding complexity if Hero or Grid is already high-complexity (enforce Birkhoff budget <= 2)
    const isComplexGrid =
      gridTopology === 'interactive-webgl-spatial-canvas' ||
      gridTopology === 'kinetic-scrollytelling-stage';
    const isComplexHero =
      heroArchitecture === 'asymmetric-split-3d-diorama' ||
      heroArchitecture === 'kinetic-shader-portal' ||
      heroArchitecture === 'full-bleed-cinematic-story';

    if (isComplexGrid && isComplexHero) {
      if (componentMorphology.corner === 'clip-path-bevel') {
        componentMorphology.corner = '6px-tecnico';
      }
      if (fontObj.utopiaRatio >= 1.41) {
        fontObj = compatibleFonts.find((f) => f.utopiaRatio <= 1.333) || fontObj;
      }
      if (scrollChoreography === 'z-depth-layered-parallax') {
        scrollChoreography = 'native-view-transitions-morph';
      }
    }

    // Ensure Tufte grid uses <= 1.333 scale and non-chaotic hero
    if (gridTopology === 'tufte-high-density-data') {
      if (fontObj.utopiaRatio > 1.34) {
        fontObj = compatibleFonts.find((f) => f.utopiaRatio <= 1.25) || compatibleFonts[0];
      }
      if (heroArchitecture === 'kinetic-shader-portal' || heroArchitecture === 'full-bleed-cinematic-story') {
        heroArchitecture = 'live-interactive-product-sandbox';
      }
    }

    // Ensure orthogonal worlds don't use 24px-organico or loose inertia
    if (
      gridTopology === 'architectural-brutalist-monolith' ||
      componentMorphology.material === 'raw-ink-swiss-border' ||
      componentMorphology.material === 'paper-editorial'
    ) {
      if (componentMorphology.corner === '24px-organico' || componentMorphology.corner === 'clip-path-bevel') {
        componentMorphology.corner = '0px-recto';
      }
      if (transitionPhysics === 'fluid-silk-inertia') {
        transitionPhysics = 'crisp-editorial-snap';
      }
    }

    const motionSpec = MOTION_PHYSICS_PROFILES[transitionPhysics] || MOTION_PHYSICS_PROFILES['magnetic-precision-spring'];
    const motionPhysicsCriteria = {
      transitionPhysics: motionSpec.id,
      dampingRatioZeta: motionSpec.dampingRatioZeta,
      stiffness: motionSpec.stiffness,
      damping: motionSpec.damping,
      durationMs: motionSpec.durationMs,
      easingCss: motionSpec.easingCss,
      scrollChoreography
    };

    const introAnd3dDecision = evaluateIntroAnd3dNecessity({
      projectSlug,
      industryCategory: arch.cliAlias,
      primarySurfaceMode: arch.primarySurfaceMode,
      brandPersonalityTension,
      gridTopology,
      heroArchitecture,
      gamutMaskType,
      fontPairingProfile: fontObj.id,
      componentMorphology,
      motionPhysicsCriteria
    });

    const maskedPalette = applyOklchGamutMask(baseHue, gamutMaskType, {
      polarity: arch.primarySurfaceMode === 'Read' ? 'light' : 'dark'
    });

    const candidate = {
      projectSlug,
      industryCategory: arch.cliAlias,
      archetypeId: arch.id,
      primarySurfaceMode: arch.primarySurfaceMode,
      brandPersonalityTension,
      morphologyMode,
      gridTopology,
      heroArchitecture,
      componentMorphology,
      gamutMaskType,
      gamutMaskedTokens: maskedPalette.tokens,
      fontPairingProfile: fontObj.id,
      fontPairingDetails: fontObj,
      motionPhysicsCriteria,
      introAnd3dDecision,
      introChoreographyId: introAnd3dDecision.introChoreographyId
    };

    const harmonyRes = validateHarmonicAxisCoherence(candidate);
    const divergenceRes = computeMorphologicalDivergenceScore(candidate, existingCategoryEntries);

    if (harmonyRes.passed && divergenceRes.passed) {
      selectedDna = {
        ...candidate,
        morphologicalDivergenceScore: divergenceRes.divergenceScore,
        aestheticHarmonyScore: harmonyRes.aestheticHarmonyScore,
        harmonicValidation: harmonyRes,
        divergenceValidation: divergenceRes,
        functionalInvariants: funcInvariants,
        compiledPrimitives: compileComponentMorphologyPrimitives({
          navVariant: componentMorphology.nav,
          cornerGeometry: componentMorphology.corner,
          surfaceMaterial: componentMorphology.material,
          gridTopology,
          heroArchitecture
        })
      };
      bestHarmony = harmonyRes;
      bestDivergence = divergenceRes;
      break;
    }
  }

  if (!selectedDna) {
    throw new Error(
      `[BespokeMorphologyComposer] Unable to synthesize a valid harmonic & non-colliding Brand DNA Vector for ${projectSlug} (${arch.id}).`
    );
  }

  if (persistInLedger) {
    ledger.projects[projectSlug] = {
      projectSlug,
      industryCategory: arch.cliAlias,
      archetypeId: arch.id,
      registeredAt: new Date().toISOString(),
      morphologicalDivergenceScore: bestDivergence.divergenceScore,
      aestheticHarmonyScore: bestHarmony.aestheticHarmonyScore,
      brandDnaVector: {
        gridTopology: selectedDna.gridTopology,
        heroArchitecture: selectedDna.heroArchitecture,
        componentMorphology: selectedDna.componentMorphology,
        gamutMaskType: selectedDna.gamutMaskType,
        fontPairingProfile: selectedDna.fontPairingProfile,
        motionPhysicsCriteria: selectedDna.motionPhysicsCriteria,
        introChoreographyId: selectedDna.introChoreographyId
      }
    };
    saveProjectDnaLedger(ledger, customLedgerPath);
  }

  return selectedDna;
}

/**
 * Self-Test Suite (`node tools/design/bespoke_morphology_composer.mjs --self-test`):
 * Verifies:
 *   (a) 3 consecutive projects in the same category (`fintech` and `ecommerce`) receive
 *       completely distinct grid topologies, Hero architectures, OKLCH gamut masks, font pairings,
 *       and kinetic choreographies with `Divergence Score >= 0.70` and `0` collisions.
 *   (b) All 3 projects satisfy `Aesthetic Harmony Score >= 0.85` in `validateHarmonicAxisCoherence`,
 *       and dissonant test combinations are deterministically rejected (`passed === false`).
 */
export function runBespokeMorphologyComposerSelfTest() {
  const tempLedgerPath = path.join(FACTORY_ROOT, '.cache', 'test_project_dna_fingerprints.json');
  if (fs.existsSync(tempLedgerPath)) {
    fs.unlinkSync(tempLedgerPath);
  }

  const testCategories = ['fintech', 'ecommerce'];
  const categoryReports = {};

  for (const cat of testCategories) {
    const p1 = synthesizeUniqueBrandDna({
      projectSlug: `${cat}-alpha-01`,
      industryCategory: cat,
      brandPersonalityTension: 'clasico-atemporal vs vanguardista-disruptivo',
      customLedgerPath: tempLedgerPath
    });
    const p2 = synthesizeUniqueBrandDna({
      projectSlug: `${cat}-beta-02`,
      industryCategory: cat,
      brandPersonalityTension: 'minimalismo-silencioso vs expresividad-cinetica',
      customLedgerPath: tempLedgerPath
    });
    const p3 = synthesizeUniqueBrandDna({
      projectSlug: `${cat}-gamma-03`,
      industryCategory: cat,
      brandPersonalityTension: 'editorial-organico vs ingenieril-geometrico',
      customLedgerPath: tempLedgerPath
    });

    const trio = [p1, p2, p3];
    const distinctGrids = new Set(trio.map((p) => p.gridTopology)).size === 3;
    const distinctHeroes = new Set(trio.map((p) => p.heroArchitecture)).size === 3;
    const distinctGamutMasks = new Set(trio.map((p) => p.gamutMaskType)).size === 3;
    const distinctFontPairings = new Set(trio.map((p) => p.fontPairingProfile)).size === 3;
    const distinctIntros = new Set(trio.map((p) => p.introChoreographyId)).size === 3;
    const allDivergenceAbove070 = trio.every((p) => p.morphologicalDivergenceScore >= MIN_DIVERGENCE_THRESHOLD);
    const allHarmonyAbove085 = trio.every((p) => p.aestheticHarmonyScore >= MIN_HARMONY_SCORE);

    categoryReports[cat] = {
      passed:
        distinctGrids &&
        distinctHeroes &&
        distinctGamutMasks &&
        distinctFontPairings &&
        distinctIntros &&
        allDivergenceAbove070 &&
        allHarmonyAbove085,
      distinctGrids,
      distinctHeroes,
      distinctGamutMasks,
      distinctFontPairings,
      distinctIntros,
      projects: trio.map((p) => ({
        slug: p.projectSlug,
        gridTopology: p.gridTopology,
        heroArchitecture: p.heroArchitecture,
        gamutMaskType: p.gamutMaskType,
        fontPairingProfile: p.fontPairingProfile,
        transitionPhysics: p.motionPhysicsCriteria.transitionPhysics,
        introChoreographyId: p.introChoreographyId,
        divergenceScore: p.morphologicalDivergenceScore,
        harmonyScore: p.aestheticHarmonyScore
      }))
    };
  }

  // Negative Test: Dissonant Axis Combination (Brutalist raw-ink + 24px inflated organic + loose silk inertia + 4 high-complexity axes)
  const dissonantSample = {
    gridTopology: 'architectural-brutalist-monolith',
    heroArchitecture: 'kinetic-shader-portal',
    componentMorphology: {
      nav: 'magnetic-hud-dock',
      corner: '24px-organico',
      material: 'raw-ink-swiss-border'
    },
    gamutMaskType: 'split-complementary',
    fontPairingProfile: 'avant-garde-syne-epilogue',
    motionPhysicsCriteria: {
      transitionPhysics: 'fluid-silk-inertia',
      scrollChoreography: 'z-depth-layered-parallax'
    }
  };
  const dissonantValidation = validateHarmonicAxisCoherence(dissonantSample);
  const dissonantCorrectlyRejected =
    dissonantValidation.passed === false &&
    dissonantValidation.aestheticHarmonyScore < MIN_HARMONY_SCORE &&
    dissonantValidation.violations.length >= 2;

  // Clean temporary test ledger and ensure production ledger has `agencia-alfa` registered cleanly
  if (fs.existsSync(tempLedgerPath)) {
    fs.unlinkSync(tempLedgerPath);
  }
  const prodAlfaDna = synthesizeUniqueBrandDna({
    projectSlug: 'agencia-alfa',
    industryCategory: 'saas',
    brandPersonalityTension: 'minimalismo-silencioso vs expresividad-cinetica',
    persistInLedger: true,
    customLedgerPath: LEDGER_PATH
  });

  const passed =
    Object.values(categoryReports).every((r) => r.passed) &&
    dissonantCorrectlyRejected &&
    prodAlfaDna.aestheticHarmonyScore >= MIN_HARMONY_SCORE;

  return {
    passed,
    minDivergenceThreshold: MIN_DIVERGENCE_THRESHOLD,
    minHarmonyScore: MIN_HARMONY_SCORE,
    dissonantCorrectlyRejected,
    dissonantScoreObserved: dissonantValidation.aestheticHarmonyScore,
    dissonantViolationsCount: dissonantValidation.violations.length,
    categoryReports,
    productionReferenceSlug: prodAlfaDna.projectSlug
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  const args = process.argv.slice(2);
  if (args.includes('--self-test')) {
    const res = runBespokeMorphologyComposerSelfTest();
    console.log('========================================================================================');
    console.log('🧬 BESPOKE MORPHOLOGY COMPOSER, HARMONIC SOLVER & ANTI-CLONE LEDGER — SELF-TEST');
    console.log('========================================================================================');
    for (const [cat, rep] of Object.entries(res.categoryReports)) {
      console.log(`  📂 Category [${cat.toUpperCase()}] -> 3 Consecutive Sites | Status: ${rep.passed ? 'PASS' : 'FAIL'}`);
      for (const p of rep.projects) {
        console.log(
          `     • ${p.slug.padEnd(18)} | Grid: ${p.gridTopology.padEnd(32)} | Hero: ${p.heroArchitecture.padEnd(33)} | Mask: ${p.gamutMaskType.padEnd(28)} | Div: ${p.divergenceScore.toFixed(2)} | Harmony: ${p.harmonyScore.toFixed(2)}`
        );
      }
    }
    console.log('----------------------------------------------------------------------------------------');
    console.log(
      `  🛡️ Dissonant Trap Rejected : ${res.dissonantCorrectlyRejected ? 'YES (Blocked)' : 'NO'} (Harmony Score=${res.dissonantScoreObserved}, Violations=${res.dissonantViolationsCount})`
    );
    console.log(`  📒 Production DNA Ledger   : .agents/memory/project_dna_fingerprints.json (Active: ${res.productionReferenceSlug})`);
    console.log(`  🏆 Overall Status          : ${res.passed ? 'PASS (Exit Code 0)' : 'FAIL'}`);
    console.log('========================================================================================\n');
    process.exit(res.passed ? 0 : 1);
  } else {
    const slug = args[0] || 'agencia-alfa';
    const cat = args[1] || 'saas';
    const dna = synthesizeUniqueBrandDna({ projectSlug: slug, industryCategory: cat });
    console.log(JSON.stringify(dna, null, 2));
  }
}
