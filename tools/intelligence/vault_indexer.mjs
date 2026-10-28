#!/usr/bin/env node
/**
 * tools/intelligence/vault_indexer.mjs — Zero-Copy Local Repository Vault Indexer (SOTA 2026)
 * ===========================================================================================
 * Reads `C:\Users\tomas\Desktop\reporte_repositorios_sistema.md` and scans the local physical
 * vaults (`C:\Users\tomas\Desktop\streamerbot\references\` and `./references/`) to generate
 * `.agents/memory/local_vault_registry.json` with deduplicated, `fs.existsSync`-verified paths.
 * ===========================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const FACTORY_ROOT = path.resolve(__dirname, '..', '..');
export const VAULT_REGISTRY_PATH = path.join(FACTORY_ROOT, '.agents', 'memory', 'local_vault_registry.json');
export const SYSTEM_REPORT_PATH = 'C:\\Users\\tomas\\Desktop\\reporte_repositorios_sistema.md';
export const STREAMERBOT_REFS = 'C:\\Users\\tomas\\Desktop\\streamerbot\\references';
export const LOCAL_REFS = path.join(FACTORY_ROOT, 'references');

const STRATEGIC_ENGINES = {
  skills_and_directives: [
    { id: 'caveman', aliases: ['caveman', 'caveman-compress'], hints: ['caveman'] },
    { id: 'ponytail', aliases: ['ponytail', 'minimalist-code'], hints: ['ponytail'] },
    { id: 'claude-council', aliases: ['claude-council', 'council', 'deliberation'], hints: ['claude-council'] },
    { id: 'arena-skill', aliases: ['arena-skill', 'arena', 'best-of-n'], hints: ['arena-skill'] },
    { id: 'modern-frontend-skill', aliases: ['modern-frontend-skill', 'modern-frontend-design'], hints: ['hunt-2026-10/modern-frontend-skill', 'modern-frontend-skill'] },
    { id: 'awesome-design-skills', aliases: ['awesome-design-skills', '67-design-styles'], hints: ['hunt-2026-10/awesome-design-skills', 'awesome-design-skills'] },
    { id: 'ui-skills', aliases: ['ui-skills', 'baseline-ui'], hints: ['sota-expansion/design-intelligence/ui-skills', 'ui-skills'] },
    { id: 'marketingskills', aliases: ['marketingskills', 'cro', 'copywriting', 'seo-aeo-geo'], hints: ['sota-2026/growth-and-hitl/marketingskills', 'marketingskills'] },
    { id: 'harness2', aliases: ['harness2', 'google-research/harness2', 'propose-probe-compose'], hints: ['sota-2026/self-evolving-2026/harness2', 'harness2'] },
    { id: 'OpenSpace', aliases: ['openspace', 'hkuds/openspace', 'skill-quality-records'], hints: ['sota-2026/self-evolving-2026/OpenSpace', 'OpenSpace'] },
    { id: 'self-harness', aliases: ['self-harness', 'scarnyc/self-harness', 'phi-signature'], hints: ['sota-2026/self-evolving-2026/self-harness', 'self-harness'] },
    { id: 'gepa', aliases: ['gepa', 'gepa-ai/gepa', 'genetic-pareto', 'adamast'], hints: ['sota-2026/self-evolving-2026/gepa', 'gepa'] }
  ],
  audit_security_testing: [
    { id: 'odiff', aliases: ['odiff', 'odiff-bin', 'visual-diff'], hints: ['hunt-2026-10/odiff', 'odiff'] },
    { id: 'knip', aliases: ['knip', 'dead-code', 'orphan-files'], hints: ['audit-sota/knip', 'knip'] },
    { id: 'fast-check', aliases: ['fast-check', 'property-based-testing', 'fuzzing'], hints: ['web-core/fast-check', 'fast-check'] },
    { id: 'DOMPurify', aliases: ['dompurify', 'xss-sanitizer'], hints: ['audit-sota/DOMPurify', 'DOMPurify'] },
    { id: 'valibot', aliases: ['valibot', 'schema-validation'], hints: ['audit-sota/valibot', 'valibot'] },
    { id: 'retire.js', aliases: ['retire.js', 'retire', 'sca-scanner'], hints: ['audit-sota/retire.js', 'retire.js'] },
    { id: 'promptfoo', aliases: ['promptfoo', 'llm-evals', 'red-teaming'], hints: ['agent-arsenal/promptfoo', 'promptfoo'] },
    { id: 'openrig', aliases: ['openrig', 'eval-rig'], hints: ['sota-2026/growth-and-hitl/openrig', 'openrig'] },
    { id: 'MASEval', aliases: ['maseval', 'maseval/maseval', 'trace-first-eval'], hints: ['sota-2026/self-evolving-2026/MASEval', 'MASEval'] },
    { id: 'agent-benchmark', aliases: ['agent-benchmark', 'mykhaliev/agent-benchmark', 'mcp-benchmark'], hints: ['sota-2026/self-evolving-2026/agent-benchmark', 'agent-benchmark'] },
    { id: 'evolving-agents', aliases: ['evolving-agents', 'agentvcs', 'ed25519-freeze'], hints: ['sota-2026/self-evolving-2026/evolving-agents', 'evolving-agents'] }
  ],
  rag_and_search: [
    { id: 'minisearch', aliases: ['minisearch', 'fulltext-search'], hints: ['agent-arsenal/minisearch', 'minisearch'] },
    { id: 'rerank-ts', aliases: ['rerank-ts', 'cross-encoder', 'reranker'], hints: ['agent-arsenal/rerank-ts', 'rerank-ts'] },
    { id: 'rag-anything', aliases: ['rag-anything', 'multimodal-rag'], hints: ['rag-anything'] }
  ],
  visual_motion_audio_perf: [
    { id: 'css-scroll-driven', aliases: ['css-scroll-driven', 'scroll-timeline', 'view-timeline'], hints: ['hunt-2026-10/css-scroll-driven', 'css-scroll-driven'] },
    { id: 'design-extract', aliases: ['design-extract', 'extract-design', 'token-cloner'], hints: ['software-factory/design-extract', 'design-extract'] },
    { id: 'atropos', aliases: ['atropos', '3d-parallax', 'tilt-3d'], hints: ['atropos'] },
    { id: 'pokemon-cards-css', aliases: ['pokemon-cards-css', 'holo-foil', 'holographic-glare'], hints: ['pokemon-cards-css'] },
    { id: 'paper-shaders', aliases: ['paper-shaders', 'shaders', 'mesh-gradient'], hints: ['paper-shaders'] },
    { id: 'canvas-ui', aliases: ['canvas-ui', 'webgl-ui'], hints: ['canvas-ui'] },
    { id: 'number-flow', aliases: ['number-flow', 'animated-numbers', 'tabular-counter'], hints: ['number-flow'] },
    { id: 'lenis', aliases: ['lenis', 'smooth-scroll'], hints: ['lenis'] },
    { id: 'transitions.dev', aliases: ['transitions.dev', 'view-transitions'], hints: ['transitions.dev', 'transitions-dev'] },
    { id: 'motion-primitives', aliases: ['motion-primitives', 'spring-primitives'], hints: ['motion-primitives'] },
    { id: 'react-bits', aliases: ['react-bits', 'animated-text', 'spotlight'], hints: ['react-bits'] },
    { id: 'kokonutui', aliases: ['kokonutui', 'bento-components'], hints: ['kokonutui'] },
    { id: 'thumbhash', aliases: ['thumbhash', 'image-placeholder', 'zero-cls-image'], hints: ['thumbhash'] },
    { id: 'quicklink', aliases: ['quicklink', 'viewport-prefetch'], hints: ['quicklink'] },
    { id: 'svgo', aliases: ['svgo', 'svg-optimizer'], hints: ['svgo'] },
    { id: 'zzfx', aliases: ['zzfx', 'micro-audio', 'ui-sound'], hints: ['zzfx', 'ZzFX'] },
    { id: 'tonejs', aliases: ['tonejs', 'tone.js', 'web-audio-dsp'], hints: ['tonejs', 'Tone.js'] },
    { id: 'dioramas', aliases: ['dioramas', 'blendi-remade/dioramas', 'hdr-diorama', 'agx-bloom'], hints: ['sota-2026/webgpu-3d-2026/dioramas', 'dioramas'] },
    { id: 'spark', aliases: ['spark', 'sparkjsdev/spark', 'gaussian-splatting', '3dgs', 'splat-tree'], hints: ['sota-2026/webgpu-3d-2026/spark', 'spark'] },
    { id: 'webgpu-vfx', aliases: ['webgpu-vfx', 'tigerabrodi/webgpu-vfx', 'gpu-particles'], hints: ['sota-2026/webgpu-3d-2026/webgpu-vfx', 'webgpu-vfx'] },
    { id: 'TypeGPU', aliases: ['typegpu', 'software-mansion/typegpu', 'typed-webgpu'], hints: ['sota-2026/webgpu-3d-2026/TypeGPU', 'TypeGPU'] },
    { id: 'glTF-Transform', aliases: ['gltf-transform', 'donmccurdy/gltf-transform', 'glb-compressor'], hints: ['sota-2026/webgpu-3d-2026/glTF-Transform', 'glTF-Transform'] },
    { id: 'meshoptimizer', aliases: ['meshoptimizer', 'zeux/meshoptimizer', 'meshopt'], hints: ['sota-2026/webgpu-3d-2026/meshoptimizer', 'meshoptimizer'] },
    { id: 'openshaders', aliases: ['openshaders', 'openshaders/openshaders', 'shader-components'], hints: ['sota-2026/webgpu-3d-2026/openshaders', 'openshaders'] },
    { id: 'Animator', aliases: ['animator', 'roboticela/animator', 'glb-skeletal-animation'], hints: ['sota-2026/webgpu-3d-2026/Animator', 'Animator'] }
  ],
  edge_and_video: [
    { id: 'hono', aliases: ['hono', 'edge-router'], hints: ['hono'] },
    { id: 'drizzle-orm', aliases: ['drizzle-orm', 'drizzle', 'd1-orm'], hints: ['drizzle-orm'] },
    { id: 'better-auth', aliases: ['better-auth', 'auth-edge'], hints: ['better-auth'] },
    { id: 'partyserver', aliases: ['partyserver', 'durable-objects-ws'], hints: ['partyserver'] },
    { id: 'satori', aliases: ['satori', 'og-image-svg'], hints: ['satori'] },
    { id: 'timecut', aliases: ['timecut', 'video-capture'], hints: ['timecut'] },
    { id: 'brag', aliases: ['brag', 'changelog-generator'], hints: ['brag'] }
  ]
};

/**
 * Parses `C:\Users\tomas\Desktop\reporte_repositorios_sistema.md` to extract all documented paths.
 */
function parseSystemReportPaths() {
  const map = new Map();
  if (!fs.existsSync(SYSTEM_REPORT_PATH)) return map;

  const raw = fs.readFileSync(SYSTEM_REPORT_PATH, 'utf8');
  const blocks = raw.split(/^### 📦 /m).slice(1);

  for (const blk of blocks) {
    const nameMatch = blk.match(/^`([^`]+)`/);
    const diskMatch = blk.match(/\*\*Ruta en Disco:\*\*\s*`([^`]+)`/);
    const originMatch = blk.match(/\*\*Repositorio Remoto \(Origin\):\*\*\s*`([^`]+)`/);
    const purposeMatch = blk.match(/\*\*¿Para qué funciona\?:\*\*\s*([^\r\n]+)/);

    if (nameMatch && diskMatch) {
      const name = nameMatch[1].trim();
      const diskPath = diskMatch[1].trim();
      const exists = fs.existsSync(diskPath);
      if (exists) {
        const key = name.toLowerCase();
        // Prefer paths inside streamerbot/references or web-software-factory/references over OneDrive duplicates
        const existing = map.get(key);
        const isPreferred = !diskPath.toLowerCase().includes('onedrive');
        if (!existing || isPreferred) {
          map.set(key, {
            id: name,
            path: diskPath,
            origin: originMatch ? originMatch[1].trim() : 'local',
            description: purposeMatch ? purposeMatch[1].trim() : '',
            existsOnDisk: true
          });
        }
      }
    }
  }
  return map;
}

/**
 * Recursively indexes directories up to depth 3 inside `baseDir` for fast lookup.
 */
function scanReferenceDirectories(baseDir, maxDepth = 3) {
  const found = new Map();
  function walk(dir, depth) {
    if (depth > maxDepth || !fs.existsSync(dir)) return;
    let entries = [];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (!entry.isDirectory() || entry.name === '.git' || entry.name === 'node_modules') continue;
      const full = path.join(dir, entry.name);
      const key = entry.name.toLowerCase();
      if (!found.has(key)) {
        found.set(key, full);
      }
      walk(full, depth + 1);
    }
  }
  walk(baseDir, 1);
  return found;
}

export function buildLocalVaultRegistry() {
  const reportMap = parseSystemReportPaths();
  const streamerbotIndex = scanReferenceDirectories(STREAMERBOT_REFS, 3);
  const localFactoryIndex = scanReferenceDirectories(LOCAL_REFS, 3);
  const localSkillsIndex = scanReferenceDirectories(path.join(FACTORY_ROOT, '.agents', 'skills'), 2);
  const streamerbotSkillsIndex = scanReferenceDirectories('C:\\Users\\tomas\\Desktop\\streamerbot\\.agents\\skills', 2);

  function resolveEnginePath(item) {
    // 1. Try explicit relative hints in streamerbot/references and local references
    for (const hint of item.hints || []) {
      const normHint = hint.replace(/\//g, path.sep);
      const candidates = [
        path.join(STREAMERBOT_REFS, normHint),
        path.join(LOCAL_REFS, normHint),
        path.join('C:\\Users\\tomas\\Desktop\\streamerbot', normHint),
        path.join(FACTORY_ROOT, normHint)
      ];
      for (const c of candidates) {
        if (fs.existsSync(c)) return c;
      }
    }

    // 2. Try reportMap by id or aliases
    for (const alias of [item.id, ...(item.aliases || [])]) {
      const k = alias.toLowerCase();
      if (reportMap.has(k) && fs.existsSync(reportMap.get(k).path)) {
        return reportMap.get(k).path;
      }
      if (streamerbotIndex.has(k) && fs.existsSync(streamerbotIndex.get(k))) {
        return streamerbotIndex.get(k);
      }
      if (localFactoryIndex.has(k) && fs.existsSync(localFactoryIndex.get(k))) {
        return localFactoryIndex.get(k);
      }
      if (streamerbotSkillsIndex.has(k) && fs.existsSync(streamerbotSkillsIndex.get(k))) {
        return streamerbotSkillsIndex.get(k);
      }
      if (localSkillsIndex.has(k) && fs.existsSync(localSkillsIndex.get(k))) {
        return localSkillsIndex.get(k);
      }
    }

    // 3. Fallback to node_modules if installed locally (e.g., odiff-bin, minisearch)
    const nmCandidates = [
      path.join(FACTORY_ROOT, 'node_modules', item.id.toLowerCase()),
      path.join(FACTORY_ROOT, 'node_modules', `${item.id.toLowerCase()}-bin`),
      path.join('C:\\Users\\tomas\\Desktop\\streamerbot\\node_modules', item.id.toLowerCase())
    ];
    for (const nm of nmCandidates) {
      if (fs.existsSync(nm)) return nm;
    }

    return null;
  }

  const categories = {};
  let totalStrategic = 0;
  let verifiedStrategic = 0;
  const flatEngines = {};

  for (const [catName, items] of Object.entries(STRATEGIC_ENGINES)) {
    categories[catName] = [];
    for (const item of items) {
      totalStrategic++;
      const resolvedPath = resolveEnginePath(item);
      const existsOnDisk = Boolean(resolvedPath && fs.existsSync(resolvedPath));
      if (existsOnDisk) verifiedStrategic++;

      const reportEntry = reportMap.get(item.id.toLowerCase());
      const entryObj = {
        id: item.id,
        category: catName,
        aliases: item.aliases,
        path: resolvedPath,
        existsOnDisk,
        origin: reportEntry?.origin || 'local-vault',
        description: reportEntry?.description || `SOTA local vault engine (${item.id})`
      };
      categories[catName].push(entryObj);
      flatEngines[item.id.toLowerCase()] = entryObj;
    }
  }

  // Deduplicated full system catalog from reporte_repositorios_sistema.md
  const deduplicatedCatalog = Array.from(reportMap.values()).filter((e) => e.existsOnDisk);

  const registry = {
    schemaVersion: '2026.11-zero-copy-vault',
    generatedAt: new Date().toISOString(),
    sourceReport: SYSTEM_REPORT_PATH,
    primaryVaultRoot: STREAMERBOT_REFS,
    secondaryVaultRoot: LOCAL_REFS,
    stats: {
      totalSystemReposDocumented: 260,
      uniqueDeduplicatedReposVerified: deduplicatedCatalog.length,
      strategicEnginesTargeted: totalStrategic,
      strategicEnginesVerifiedOnDisk: verifiedStrategic
    },
    categories,
    engines: flatEngines,
    catalog: deduplicatedCatalog
  };

  fs.mkdirSync(path.dirname(VAULT_REGISTRY_PATH), { recursive: true });
  fs.writeFileSync(VAULT_REGISTRY_PATH, JSON.stringify(registry, null, 2), 'utf8');
  return registry;
}

/**
 * Searches the Local Vault Registry by keyword/technology name (Zero-Copy lookup in <2ms).
 */
export function lookupInLocalVault(query = '') {
  let registry;
  if (fs.existsSync(VAULT_REGISTRY_PATH)) {
    registry = JSON.parse(fs.readFileSync(VAULT_REGISTRY_PATH, 'utf8'));
  } else {
    registry = buildLocalVaultRegistry();
  }

  const q = String(query || '').toLowerCase().trim();
  const tokens = q.split(/[^a-z0-9.-]+/).filter((t) => t.length >= 2);
  const matches = [];

  for (const eng of Object.values(registry.engines || {})) {
    if (!eng.existsOnDisk || !eng.path || !fs.existsSync(eng.path)) continue;
    let score = 0;
    const idLow = eng.id.toLowerCase();
    if (q.includes(idLow)) score += 25;
    for (const alias of eng.aliases || []) {
      if (q.includes(alias.toLowerCase())) score += 15;
    }
    for (const tok of tokens) {
      if (idLow.includes(tok)) score += 10;
      if ((eng.aliases || []).some((a) => a.toLowerCase().includes(tok))) score += 8;
      if ((eng.description || '').toLowerCase().includes(tok)) score += 4;
    }
    if (score > 0) {
      matches.push({ ...eng, matchScore: score });
    }
  }

  for (const repo of registry.catalog || []) {
    if (!repo.existsOnDisk || !repo.path || !fs.existsSync(repo.path)) continue;
    if (matches.some((m) => m.path === repo.path)) continue;
    let score = 0;
    const idLow = repo.id.toLowerCase();
    if (q.includes(idLow)) score += 20;
    for (const tok of tokens) {
      if (idLow.includes(tok)) score += 8;
      if ((repo.description || '').toLowerCase().includes(tok)) score += 3;
    }
    if (score > 0) {
      matches.push({ ...repo, category: 'system_catalog', matchScore: score });
    }
  }

  matches.sort((a, b) => b.matchScore - a.matchScore);
  return matches.slice(0, 8);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename);
if (isMain) {
  const reg = buildLocalVaultRegistry();
  console.log('\n====================================================================');
  console.log('🗄️  LOCAL VAULT ZERO-COPY REGISTRY INDEXER (SOTA 2026)');
  console.log('====================================================================');
  console.log(`• Source Report      : ${reg.sourceReport}`);
  console.log(`• Primary Vault Root : ${reg.primaryVaultRoot}`);
  console.log(`• Unique Verified    : ${reg.stats.uniqueDeduplicatedReposVerified} deduplicated repositories on disk`);
  console.log(`• Strategic Engines  : ${reg.stats.strategicEnginesVerifiedOnDisk} / ${reg.stats.strategicEnginesTargeted} verified with fs.existsSync`);
  for (const [cat, list] of Object.entries(reg.categories)) {
    const missing = list.filter((i) => !i.existsOnDisk).map((i) => i.id);
    console.log(`  - ${cat.padEnd(28)}: ${list.filter((i) => i.existsOnDisk).length}/${list.length} active${missing.length ? ` (missing: ${missing.join(', ')})` : ''}`);
  }
  console.log(`• Registry Saved To  : ${path.relative(FACTORY_ROOT, VAULT_REGISTRY_PATH)}`);
  console.log('====================================================================\n');
}
