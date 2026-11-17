/**
 * tools/lib/project_loader.mjs — Agnostic Project Manifest Loader for the Web Software Factory
 * ============================================================================================
 * Decouples the Software Factory (tools/audit/*, tools/intelligence/*, tools/build_dist.mjs)
 * from any specific client website (e.g., example-client.pages.dev).
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
export const ACTIVE_PROJECT_PATH = path.join(FACTORY_ROOT, '.agents', 'memory', 'active_project.json');
export const PROJECTS_DIR = path.join(FACTORY_ROOT, 'projects');

export function getActiveProject() {
  if (!fs.existsSync(ACTIVE_PROJECT_PATH)) return null;
  try {
    const data = JSON.parse(fs.readFileSync(ACTIVE_PROJECT_PATH, 'utf8'));
    const slug = String(data.activeSlug || data.id || '').trim();
    if (!slug) return null;
    const candidateRoot = data.projectRoot
      ? path.resolve(FACTORY_ROOT, data.projectRoot)
      : path.join(PROJECTS_DIR, slug);
    if (fs.existsSync(candidateRoot) && fs.statSync(candidateRoot).isDirectory()) {
      return {
        ...data,
        activeSlug: slug,
        projectRoot: candidateRoot
      };
    }
  } catch {}
  return null;
}

export function setActiveProject(slugOrPath, extraMeta = {}) {
  const raw = String(slugOrPath || '').trim();
  if (!raw) return null;
  const slug = path.basename(raw).toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/(^-|-$)/g, '');
  const slugDir = path.join(PROJECTS_DIR, slug);
  const directDir = path.resolve(FACTORY_ROOT, raw);
  const projectRoot = fs.existsSync(slugDir) ? slugDir : directDir;

  let manifest = {};
  const manifestPath = path.join(projectRoot, 'factory.project.json');
  if (fs.existsSync(manifestPath)) {
    try {
      manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    } catch {}
  }

  const state = {
    activeSlug: manifest.id || slug,
    name: manifest.name || extraMeta.name || slug,
    projectRoot: path.relative(FACTORY_ROOT, projectRoot).replace(/\\/g, '/') || '.',
    stack: extraMeta.stack || manifest.stack || 'vanilla-edge',
    archetype: extraMeta.archetype || manifest.archetype || 'saas-b2b',
    style: extraMeta.style || manifest.design?.styleSkill || 'bento',
    dbTier: extraMeta.dbTier || manifest.dbTier || manifest.database?.dbTier || 'edge-d1',
    updatedAt: new Date().toISOString()
  };

  fs.mkdirSync(path.dirname(ACTIVE_PROJECT_PATH), { recursive: true });
  fs.writeFileSync(ACTIVE_PROJECT_PATH, JSON.stringify(state, null, 2) + '\n', 'utf8');
  return state;
}

export function recordProjectAuditScore(slugOrPath, score = 100, statusLabel = 'APROBADO') {
  const rootDir = resolveProjectRoot(slugOrPath);
  if (path.resolve(rootDir) === path.resolve(FACTORY_ROOT)) return null;
  const auditFile = path.join(rootDir, '.specify', 'memory', 'last_audit.json');
  const payload = {
    score: Number(score),
    statusLabel,
    auditedAt: new Date().toISOString()
  };
  fs.mkdirSync(path.dirname(auditFile), { recursive: true });
  fs.writeFileSync(auditFile, JSON.stringify(payload, null, 2) + '\n', 'utf8');
  return payload;
}

export function listProjectsCatalog() {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  const activeState = getActiveProject();
  const activeSlug = activeState?.activeSlug || '';

  const entries = fs.readdirSync(PROJECTS_DIR, { withFileTypes: true }).filter(d => d.isDirectory());
  const catalog = [];

  for (const dirEnt of entries) {
    const slug = dirEnt.name;
    const projRoot = path.join(PROJECTS_DIR, slug);
    const manifestPath = path.join(projRoot, 'factory.project.json');
    let manifest = {};
    if (fs.existsSync(manifestPath)) {
      try {
        manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      } catch {}
    }

    const auditFile = path.join(projRoot, '.specify', 'memory', 'last_audit.json');
    let lastAuditScore = 'Sin auditar';
    if (fs.existsSync(auditFile)) {
      try {
        const a = JSON.parse(fs.readFileSync(auditFile, 'utf8'));
        lastAuditScore = `${a.score}/100 (${a.statusLabel || 'AUDITADO'})`;
      } catch {}
    }

    let mtime = fs.statSync(projRoot).mtime;
    for (const checkFile of [
      manifestPath,
      path.join(projRoot, 'SPEC.md'),
      path.join(projRoot, 'design.tokens.json'),
      path.join(projRoot, 'index.html'),
      auditFile
    ]) {
      if (fs.existsSync(checkFile)) {
        const st = fs.statSync(checkFile);
        if (st.mtime > mtime) mtime = st.mtime;
      }
    }

    catalog.push({
      slug,
      name: manifest.name || slug,
      isActive: slug === activeSlug,
      stack: manifest.stack || (fs.existsSync(path.join(projRoot, 'astro.config.mjs')) ? 'astro-edge' : 'vanilla-edge'),
      archetype: manifest.archetype || 'saas-b2b',
      style: manifest.design?.styleSkill || 'bento',
      dbTier: manifest.dbTier || manifest.database?.dbTier || 'edge-d1',
      lastAuditScore,
      lastModifiedIso: mtime.toISOString(),
      lastModifiedFormatted: mtime.toLocaleString('es-AR'),
      projectRoot: projRoot
    });
  }

  catalog.sort((a, b) => {
    if (a.isActive !== b.isActive) return a.isActive ? -1 : 1;
    return b.lastModifiedIso.localeCompare(a.lastModifiedIso);
  });

  return catalog;
}

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
  if (!raw) {
    const active = getActiveProject();
    if (active && active.projectRoot && fs.existsSync(active.projectRoot)) {
      return active.projectRoot;
    }
    return FACTORY_ROOT;
  }

  // Check if it's a slug inside projects/<slug> first
  const slugCandidate = path.join(FACTORY_ROOT, 'projects', raw);
  if (fs.existsSync(slugCandidate) && fs.statSync(slugCandidate).isDirectory()) {
    return slugCandidate;
  }

  // Check if it's an absolute path or direct relative path (bounded to FACTORY_ROOT unless explicitly opted in)
  const directCandidate = path.resolve(process.cwd(), raw);
  const allowExternal = process.env.ALLOW_EXTERNAL_PROJECT_ROOT === 'true';
  const resolvedFactoryRoot = path.resolve(FACTORY_ROOT);
  const isInsideFactory =
    directCandidate === resolvedFactoryRoot ||
    directCandidate.startsWith(resolvedFactoryRoot + path.sep);
  if (!allowExternal && !isInsideFactory) {
    throw new Error(
      `SECURITY_BLOCK: Project path "${raw}" resolves outside FACTORY_ROOT (${resolvedFactoryRoot}). Set ALLOW_EXTERNAL_PROJECT_ROOT=true to override.`
    );
  }
  if (fs.existsSync(directCandidate)) {
    return fs.statSync(directCandidate).isDirectory()
      ? directCandidate
      : path.dirname(directCandidate);
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

  const hasManifest = fs.existsSync(manifestPath);
  const isStudioRoot = !hasManifest && path.resolve(projectRoot) === path.resolve(FACTORY_ROOT);
  const id = rawConfig.id || path.basename(projectRoot).toLowerCase();
  const archetype = rawConfig.archetype || 'standard-web';
  const stack = rawConfig.stack || 'vanilla-edge';
  const complianceProfile =
    rawConfig.complianceProfile ||
    (archetype === 'streamer-casino-suite'
      ? 'gambling-18plus'
      : archetype === 'education'
        ? 'education'
        : 'standard-web');

  const pathsCfg = rawConfig.paths || {};
  const entryHtml = pathsCfg.entryHtml || (isStudioRoot ? 'templates/vanilla-edge/index.html' : 'index.html');
  const distDir = pathsCfg.distDir || 'dist';
  const workerEntry =
    pathsCfg.workerEntry === null || complianceProfile === 'education'
      ? null
      : (pathsCfg.workerEntry || (isStudioRoot ? 'templates/vanilla-edge/worker/index.js' : 'worker/index.js'));
  const tokensPath = pathsCfg.tokensPath || 'tokens/design.tokens.json';
  const designCssPath = pathsCfg.designCssPath || (
    isStudioRoot
      ? 'templates/vanilla-edge/site/css/design-tokens.css'
      : (stack === 'astro-edge' ? 'src/styles/design-tokens.css' : 'site/css/design-tokens.css')
  );
  const cssDir = pathsCfg.cssDir || (isStudioRoot ? 'templates/vanilla-edge/site/css' : (stack === 'astro-edge' ? 'src/styles' : 'site/css'));
  const siteDir = pathsCfg.siteDir || (isStudioRoot ? 'templates/vanilla-edge/site' : 'site');
  const selectorCachePath = pathsCfg.selectorCachePath || 'memory/selector_cache.json';

  const sourceDirs = Array.isArray(pathsCfg.sourceDirs)
    ? pathsCfg.sourceDirs
    : (isStudioRoot
      ? ['templates/vanilla-edge/site', 'templates/vanilla-edge/worker', 'templates/astro-edge/worker']
      : complianceProfile === 'education'
        ? ['src', 'public']
        : (stack === 'astro-edge' ? ['src', 'public', 'worker'] : ['site', 'worker']));

  const overlays = Array.isArray(pathsCfg.overlays) ? pathsCfg.overlays : [];
  const requiredOverlaysInAudit = Array.isArray(pathsCfg.requiredOverlaysInAudit)
    ? pathsCfg.requiredOverlaysInAudit
    : overlays;

  const coreJsFiles = Array.isArray(pathsCfg.coreJsFiles)
    ? pathsCfg.coreJsFiles
    : (isStudioRoot
      ? ['templates/vanilla-edge/site/js/app.js', 'templates/vanilla-edge/worker/index.js', 'templates/astro-edge/worker/index.js']
      : []);

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
    industryArchetype: rawConfig.industryArchetype || rawConfig.design?.industryArchetype || archetype,
    surfaceMode: rawConfig.surfaceMode || rawConfig.design?.surfaceMode || 'Persuade',
    targetPlatform: rawConfig.targetPlatform || 'web-only',
    stack,
    dbTier: rawConfig.dbTier || rawConfig.database?.dbTier || 'edge-d1',
    complianceProfile,
    paths: {
      entryHtml,
      distDir,
      workerEntry,
      tokensPath,
      designCssPath,
      cssDir,
      siteDir,
      selectorCachePath,
      sourceDirs,
      overlays,
      requiredOverlaysInAudit,
      coreJsFiles,
      dataFiles,
      productMdPath: path.join(projectRoot, 'PRODUCT.md'),
      designMdPath: path.join(projectRoot, 'DESIGN.md'),
      deltasDir: path.join(projectRoot, 'deltas'),
      beadsGraphPath: path.join(FACTORY_ROOT, '.agents', 'beads', 'task_graph.jsonl'),
      factoryYamlPath: path.join(FACTORY_ROOT, 'factory.yaml'),
      rpiCheckpointPath: path.join(FACTORY_ROOT, '.agents', 'runs', id, 'rpi_checkpoint.json')
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

/**
 * OpenSpec Incremental Delta Specification Generator (`projects/<slug>/deltas/<YYYY-MM-DD-cambio>.delta.md`)
 * Generates structured `ADDED / MODIFIED / REMOVED` requirements with `[REQ-XX]` IDs without blindly overwriting `SPEC.md`.
 */
export function createOpenSpecDeltaFile({
  projectSlug = 'agencia-alfa',
  changeSlug = 'incremental-change',
  title = 'Incremental Delta Specification',
  added = [],
  modified = [],
  removed = [],
  autoSyncBeads = true
} = {}) {
  const projRoot = resolveProjectRoot(projectSlug);
  const deltasDir = path.join(projRoot, 'deltas');
  fs.mkdirSync(deltasDir, { recursive: true });

  const datePrefix = new Date().toISOString().split('T')[0];
  const safeSlug = String(changeSlug || 'incremental-change')
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const deltaPath = path.join(deltasDir, `${datePrefix}-${safeSlug}.delta.md`);

  let reqCounter = 1;
  const ensureReqTag = (line) => {
    const trimmed = String(line || '').trim();
    if (/^\[REQ-\d+\]/i.test(trimmed)) return trimmed;
    const tag = `[REQ-${String(reqCounter++).padStart(2, '0')}]`;
    return `${tag} ${trimmed}`;
  };

  const addedTagged = (added.length > 0 ? added : ['[REQ-01] Add incremental conversion enhancement.']).map(ensureReqTag);
  const modifiedTagged = modified.map(ensureReqTag);
  const removedTagged = removed.map(ensureReqTag);
  const allTaggedReqs = [...addedTagged, ...modifiedTagged, ...removedTagged];

  const content = [
    `---`,
    `title: "${title}"`,
    `project: "${projectSlug}"`,
    `protocol: "OpenSpec-Delta-v2026 + spec-kitty-1to1"`,
    `createdAt: "${new Date().toISOString()}"`,
    `status: "PENDING_EVAL_MATRIX"`,
    `---`,
    ``,
    `# 📐 OpenSpec Delta: ${title}`,
    ``,
    `## ADDED REQUIREMENTS`,
    ...(addedTagged.length > 0 ? addedTagged.map((r) => `- ${r}`) : ['- *(None)*']),
    ``,
    `## MODIFIED REQUIREMENTS`,
    ...(modifiedTagged.length > 0 ? modifiedTagged.map((r) => `- ${r}`) : ['- *(None)*']),
    ``,
    `## REMOVED REQUIREMENTS`,
    ...(removedTagged.length > 0 ? removedTagged.map((r) => `- ${r}`) : ['- *(None)*']),
    ``
  ].join('\n');

  fs.writeFileSync(deltaPath, content, 'utf8');

  if (autoSyncBeads) {
    const beadsPath = path.join(FACTORY_ROOT, '.agents', 'beads', 'task_graph.jsonl');
    fs.mkdirSync(path.dirname(beadsPath), { recursive: true });
    const existingLines = fs.existsSync(beadsPath)
      ? fs.readFileSync(beadsPath, 'utf8').split(/\r?\n/).filter(Boolean)
      : [];
    const existingNodes = existingLines.map((l) => {
      try {
        return JSON.parse(l);
      } catch {
        return null;
      }
    }).filter(Boolean);
    const existingReqIds = new Set(existingNodes.map((n) => n.reqId));

    for (const reqLine of allTaggedReqs) {
      const m = reqLine.match(/^\[(REQ-\d+)\]\s*(.*)/i);
      if (!m) continue;
      const reqId = m[1].toUpperCase();
      const desc = m[2];
      if (!existingReqIds.has(reqId)) {
        const targetLock = `projects/${projectSlug}/index.html`;
        const priorOwners = existingNodes
          .filter((n) => Array.isArray(n.fileLocks) && n.fileLocks.includes(targetLock))
          .map((n) => n.id);
        existingNodes.push({
          id: `bead-${reqId.toLowerCase()}`,
          reqId,
          title: desc,
          role: 'senior-coder',
          lane: 'LANE_1_FAST_PATH',
          fileLocks: [targetLock],
          blockedBy: priorOwners.length > 0 ? [priorOwners[priorOwners.length - 1]] : [],
          verificationTest: `assert_${reqId.toLowerCase().replace('-', '_')}_verified`,
          status: 'READY',
          updatedAt: new Date().toISOString()
        });
        existingReqIds.add(reqId);
      }
    }
    fs.writeFileSync(beadsPath, existingNodes.map((n) => JSON.stringify(n)).join('\n') + '\n', 'utf8');
  }

  return {
    ok: true,
    projectSlug,
    deltaPath,
    requirementsCount: allTaggedReqs.length,
    requirements: allTaggedReqs
  };
}

/**
 * Merges an approved OpenSpec Delta into the canonical `SPEC.md` ONLY when `evalPassed === true`.
 */
export function mergeApprovedDeltaIntoCanonicalSpec(projectSlug, deltaPath, evalPassed = true) {
  if (!evalPassed) {
    return {
      merged: false,
      reason: 'EVAL_MATRIX_NOT_PASSED: Refusing to merge Delta Spec into canonical SPEC.md.'
    };
  }
  const projRoot = resolveProjectRoot(projectSlug);
  const specPath = path.join(projRoot, 'SPEC.md');
  if (!fs.existsSync(deltaPath)) {
    throw new Error(`Delta file not found: ${deltaPath}`);
  }
  const deltaContent = fs.readFileSync(deltaPath, 'utf8');
  const existingSpec = fs.existsSync(specPath) ? fs.readFileSync(specPath, 'utf8') : `# SPEC — ${projectSlug}\n`;
  const mergedSection = `\n\n---\n<!-- Merged from ${path.basename(deltaPath)} -->\n${deltaContent.replace(/^---[\s\S]*?---\s*/, '')}`;
  fs.writeFileSync(specPath, existingSpec.trimEnd() + mergedSection, 'utf8');
  return {
    merged: true,
    specPath,
    deltaPath
  };
}

/**
 * Verifies strict 1:1 `spec-kitty` Traceability (`Requirement [REQ-XX] -> Task in .agents/beads/task_graph.jsonl -> Verification Test`).
 */
export function verifySpecKittyTraceabilityMatrix(projectSlug = 'agencia-alfa', deltaOrSpecPath = '') {
  const projRoot = resolveProjectRoot(projectSlug);
  const targetDoc =
    deltaOrSpecPath && fs.existsSync(deltaOrSpecPath)
      ? deltaOrSpecPath
      : path.join(projRoot, 'SPEC.md');

  const docText = fs.existsSync(targetDoc) ? fs.readFileSync(targetDoc, 'utf8') : '';
  const reqMatches = [...docText.matchAll(/\[(REQ-\d+)\]/gi)].map((m) => m[1].toUpperCase());
  const uniqueReqs = Array.from(new Set(reqMatches));

  const beadsPath = path.join(FACTORY_ROOT, '.agents', 'beads', 'task_graph.jsonl');
  const beadsNodes = fs.existsSync(beadsPath)
    ? fs
        .readFileSync(beadsPath, 'utf8')
        .split(/\r?\n/)
        .filter(Boolean)
        .map((l) => {
          try {
            return JSON.parse(l);
          } catch {
            return null;
          }
        })
        .filter(Boolean)
    : [];

  const beadsByReq = new Map(beadsNodes.map((n) => [String(n.reqId || '').toUpperCase(), n]));
  const matrix = [];
  const unmappedRequirements = [];

  for (const reqId of uniqueReqs) {
    const bead = beadsByReq.get(reqId);
    const hasTask = Boolean(bead && bead.id);
    const hasTest = Boolean(bead && bead.verificationTest);
    if (!hasTask || !hasTest) {
      unmappedRequirements.push(reqId);
    }
    matrix.push({
      reqId,
      taskId: bead?.id || null,
      verificationTest: bead?.verificationTest || null,
      fileLocks: bead?.fileLocks || [],
      traced1To1: hasTask && hasTest
    });
  }

  return {
    passed: unmappedRequirements.length === 0,
    projectSlug,
    sourceDocument: path.relative(FACTORY_ROOT, targetDoc).replace(/\\/g, '/'),
    totalRequirements: uniqueReqs.length,
    mappedCount: uniqueReqs.length - unmappedRequirements.length,
    unmappedRequirements,
    matrix
  };
}
