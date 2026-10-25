/**
 * tools/lib/project_loader.mjs — Agnostic Project Manifest Loader for the Web Software Factory
 * ============================================================================================
 * Decouples the Software Factory (tools/audit/*, tools/intelligence/*, tools/build_dist.mjs)
 * from any specific client website (e.g., diggitybets.vip).
 *
 * Resolution priority:
 *   1. Explicit `projectDirOrPath` passed to `loadProjectConfig(projectDirOrPath)`
 *   2. CLI flag `--project <path-or-slug>`
 *   3. Environment variable `FACTORY_PROJECT_DIR`
 *   4. Default: `FACTORY_ROOT` (current workspace root)
 * ============================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const FACTORY_ROOT = path.resolve(__dirname, '..', '..');

export function resolveCliProjectArg(argv = process.argv.slice(2)) {
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--project' && argv[i + 1]) {
      return argv[i + 1];
    }
    if (argv[i].startsWith('--project=')) {
      return argv[i].slice('--project='.length);
    }
  }
  return process.env.FACTORY_PROJECT_DIR || '';
}

export function resolveProjectRoot(inputPath = '') {
  const raw = String(inputPath || resolveCliProjectArg() || '').trim();
  if (!raw) return FACTORY_ROOT;

  // Check if it's an absolute path or direct relative path
  const directCandidate = path.resolve(process.cwd(), raw);
  if (fs.existsSync(directCandidate)) {
    return fs.statSync(directCandidate).isDirectory()
      ? directCandidate
      : path.dirname(directCandidate);
  }

  // Check if it's a slug inside projects/<slug>
  const slugCandidate = path.join(FACTORY_ROOT, 'projects', raw);
  if (fs.existsSync(slugCandidate) && fs.statSync(slugCandidate).isDirectory()) {
    return slugCandidate;
  }

  return directCandidate;
}

export function loadProjectConfig(inputPath = '') {
  const projectRoot = resolveProjectRoot(inputPath);
  const manifestPath = path.join(projectRoot, 'factory.project.json');

  let rawConfig = {};
  if (fs.existsSync(manifestPath)) {
    try {
      rawConfig = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    } catch (err) {
      console.warn(`[Factory Loader] Warning: Failed to parse ${manifestPath}: ${err.message}`);
    }
  }

  const id = rawConfig.id || path.basename(projectRoot).toLowerCase();
  const archetype = rawConfig.archetype || 'standard-web';
  const stack = rawConfig.stack || 'vanilla-edge';
  const complianceProfile = rawConfig.complianceProfile || (archetype === 'streamer-casino-suite' ? 'gambling-18plus' : 'standard-web');

  const pathsCfg = rawConfig.paths || {};
  const entryHtml = pathsCfg.entryHtml || 'index.html';
  const distDir = pathsCfg.distDir || 'dist';
  const workerEntry = pathsCfg.workerEntry || 'worker/index.js';
  const tokensPath = pathsCfg.tokensPath || 'tokens/design.tokens.json';
  const designCssPath = pathsCfg.designCssPath || (stack === 'astro-edge' ? 'src/styles/design-tokens.css' : 'site/css/design-tokens.css');
  const selectorCachePath = pathsCfg.selectorCachePath || 'memory/selector_cache.json';

  const sourceDirs = Array.isArray(pathsCfg.sourceDirs)
    ? pathsCfg.sourceDirs
    : (stack === 'astro-edge' ? ['src', 'public', 'worker'] : ['site', 'worker']);

  const overlays = Array.isArray(pathsCfg.overlays) ? pathsCfg.overlays : [];
  const requiredOverlaysInAudit = Array.isArray(pathsCfg.requiredOverlaysInAudit)
    ? pathsCfg.requiredOverlaysInAudit
    : overlays;

  const coreJsFiles = Array.isArray(pathsCfg.coreJsFiles)
    ? pathsCfg.coreJsFiles
    : [];

  const dataFiles = Array.isArray(pathsCfg.dataFiles)
    ? pathsCfg.dataFiles
    : [];

  const aeoCfg = rawConfig.aeo || {};
  const requiredLlmsHeaders = Array.isArray(aeoCfg.requiredLlmsHeaders)
    ? aeoCfg.requiredLlmsHeaders
    : ['# '];

  const invariants = {
    requireObsOverlays: Boolean(rawConfig.invariants?.requireObsOverlays ?? (requiredOverlaysInAudit.length > 0)),
    requireControlPanelTelemetryPill: Boolean(rawConfig.invariants?.requireControlPanelTelemetryPill ?? (archetype === 'streamer-casino-suite')),
    requireKickWinnerCircuit: Boolean(rawConfig.invariants?.requireKickWinnerCircuit ?? (archetype === 'streamer-casino-suite')),
    requireZeroDemoUsersPurge: Boolean(rawConfig.invariants?.requireZeroDemoUsersPurge ?? (archetype === 'streamer-casino-suite')),
    maxDistSizeMb: Number(rawConfig.invariants?.maxDistSizeMb || 50)
  };

  const sdd = {
    targetUsers: Array.isArray(rawConfig.sdd?.targetUsers)
      ? rawConfig.sdd.targetUsers
      : ['Primary Visitors', 'Customers / Clients', 'Site Administrators'],
    visualTheme: rawConfig.sdd?.visualTheme || 'OKLCH 90/8/2 Perceptual Palette + Utopia Fluid Typography + Minimal Surface Hierarchy',
    architectureTier: rawConfig.sdd?.architectureTier || (stack === 'astro-edge'
      ? 'Astro 5 Islands + Cloudflare Workers Static Assets'
      : 'Vanilla JS/CSS + Cloudflare Workers Static Assets')
  };

  return {
    factoryRoot: FACTORY_ROOT,
    projectRoot,
    manifestPath,
    hasManifest: fs.existsSync(manifestPath),
    id,
    name: rawConfig.name || id,
    domain: rawConfig.domain || `https://${id}.pages.dev`,
    version: rawConfig.version || '1.0.0',
    archetype,
    stack,
    complianceProfile,
    paths: {
      entryHtml,
      distDir,
      workerEntry,
      tokensPath,
      designCssPath,
      selectorCachePath,
      sourceDirs,
      overlays,
      requiredOverlaysInAudit,
      coreJsFiles,
      dataFiles
    },
    aeo: {
      requiredLlmsHeaders
    },
    design: rawConfig.design || {},
    budgets: rawConfig.budgets || {},
    invariants,
    sdd
  };
}
