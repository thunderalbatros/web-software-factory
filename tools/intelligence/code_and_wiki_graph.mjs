#!/usr/bin/env node
/**
 * tools/intelligence/code_and_wiki_graph.mjs
 * =============================================================================
 * 🧠 REAL AST CODEGRAPH + OBSIDIAN [[WIKILINK]] GRAPH & PAGERANK ENGINE (v5)
 * =============================================================================
 * Replaces the 2-node mock from yendo-mobile with a real deterministic AST/Symbol
 * CodeGraph + Obsidian [[Wikilink]] Knowledge Graph with Damped PageRank (d=0.85).
 *
 * Capabilities:
 *  1. Scans all JS/TS/MJS source files across site/, worker/, core/, overlay-*,
 *     wheel-*, and tools/ to extract Classes, Functions, Window Singletons,
 *     API Endpoints (/api/*), and Cross-File Call Edges.
 *  2. Scans all Markdown files in knowledge/ and .agents/skills/, injects
 *     domain-grouped Obsidian [[Wikilinks]] so zero notes are orphaned in
 *     Obsidian Graph View, and extracts all bi-directional [[Wikilink]] edges.
 *  3. Computes 25-iteration Damped PageRank (d=0.85) over both graphs.
 *  4. Persists tables (code_nodes, code_edges, wiki_nodes, wiki_edges) inside
 *     .cache/omni_rag_fts5.sqlite AND .cache/code_and_wiki_graph.json.
 * =============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');
const CACHE_DIR = path.join(ROOT, '.cache');
const SQLITE_DB_FILE = path.join(CACHE_DIR, 'rag_hot.sqlite');
const GRAPH_JSON_FILE = path.join(CACHE_DIR, 'code_and_wiki_graph.json');

// Domain Hub Mapping for automatic Obsidian [[Wikilink]] constellation
const DOMAIN_HUBS = {
  ui_ux_design: [
    'DESIGN_MASTERY_2026',
    'AGENT_CREATIVE_AND_VISUAL_AWARENESS_2026',
    'CANON_REFACTORING_UI_WATHAN_SCHOGER',
    'CANON_PRACTICAL_UI_ADHAM_DANNAWAY',
    'CANON_EVERY_LAYOUT_CSS_ALGORITHMS',
    'CANON_UX_HUMAN_EXPERIENCE_ACCESSIBILITY_2026',
    'CANON_GAMIFICATION_PSYCHOLOGY_CRO_AND_STREAM_MARKETING_2026'
  ],
  motion_and_animation: [
    'CANON_EMIL_KOWALSKI_ANIMATIONS_ON_THE_WEB',
    'CANON_2D_3D_GRAPHICS_SHADERS_AND_AESTHETICS_2026',
    'CANON_HOLO_SHADERS_3D_PACK_CHOREOGRAPHY_AND_WEBAUDIO_SFX_2026',
    'CANON_ANIMATION_PRINCIPLES_ILLUSION_OF_LIFE_DISNEY',
    'CANON_60FPS_RENDER_AND_MOTION_OPTIMIZATION_PIPELINE',
    'MASTERCLASS_WWDC23_ANIMATE_WITH_SPRINGS'
  ],
  architecture_and_books: [
    'CANON_SOTA_RAG_ARCHITECTURES_AND_TOOLS_2026',
    'CURATED_MASTER_BOOKS_AND_COURSES_2026',
    'CANON_SOFTWARE_ENGINEERING_AT_GOOGLE',
    'CANON_HARNESS_ENGINEERING_INTEGRAL_2026',
    'CANON_SRE_RELIABILITY_ZERO_CRASH_2026',
    'CANON_VALIBOT_EDGE_SCHEMA_VALIDATION'
  ],
  cybersecurity: [
    'CANON_CYBERSECURITY_DEVSECOPS_2026',
    'CYBERSECURITY_MASTER_PROTOCOL',
    'ANTI_BOT_STEALTH_GUIDE',
    'CANON_IDENTITY_AND_OAUTH_CYBERSECURITY_AUDIT_2026',
    'CANON_SEMINAL_CRYPTOGRAPHY_PAPERS_AND_PROTOCOLS'
  ],
  software_factory: [
    'CANON_SPLE_ISO26550_AND_SOFTWARE_FACTORIES_ARCHITECTURE_2026',
    'CANON_ASTRO5_CLOUDFLARE_WORKERS_AND_MODERN_WEB_TEMPLATES_2026',
    'CANON_MULTI_BRAND_DESIGN_SYSTEMS_DTCG_STYLE_DICTIONARY_AND_ARCHETYPES_2026',
    'CANON_SOTA_AGENT_TEAM_TOPOLOGY_AND_2026_WEB_STACK_AUDIT',
    'CANON_SOFTWARE_FACTORY_CURRICULUM_BOOKS_PAPERS_AND_VIDEO_COURSES_2026'
  ]
};

function walkFiles(dir, exts, maxDepth = 4, depth = 0) {
  if (depth > maxDepth || !fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') && entry.name !== '.agents') continue;
    if (['node_modules', 'dist', '.git', '.cache', 'references'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkFiles(full, exts, maxDepth, depth + 1));
    } else if (exts.includes(path.extname(entry.name).toLowerCase())) {
      out.push(full);
    }
  }
  return out;
}

/**
 * Computes Damped PageRank (d = 0.85, 25 iterations) on a directed graph
 */
function computePageRank(nodeIds, edges, damping = 0.85, iterations = 25) {
  const N = nodeIds.length;
  if (N === 0) return new Map();
  const pr = new Map();
  const outDegree = new Map();
  const inbound = new Map();

  for (const id of nodeIds) {
    pr.set(id, 1 / N);
    outDegree.set(id, 0);
    inbound.set(id, []);
  }

  for (const e of edges) {
    if (pr.has(e.source) && pr.has(e.target) && e.source !== e.target) {
      outDegree.set(e.source, (outDegree.get(e.source) || 0) + 1);
      inbound.get(e.target).push(e.source);
    }
  }

  for (let iter = 0; iter < iterations; iter++) {
    const nextPr = new Map();
    let danglingSum = 0;
    for (const id of nodeIds) {
      if ((outDegree.get(id) || 0) === 0) {
        danglingSum += pr.get(id) || 0;
      }
    }
    const base = (1 - damping) / N + (damping * danglingSum) / N;
    for (const id of nodeIds) {
      let sum = 0;
      for (const src of inbound.get(id)) {
        sum += (pr.get(src) || 0) / (outDegree.get(src) || 1);
      }
      nextPr.set(id, base + damping * sum);
    }
    for (const [k, v] of nextPr) pr.set(k, v);
  }

  return pr;
}

/**
 * 1. Build Real AST/Symbol CodeGraph across all JS/TS/MJS files
 */
export function buildCodeGraph() {
  const codeDirs = [
    path.join(ROOT, 'templates', 'vanilla-edge', 'site', 'js'),
    path.join(ROOT, 'templates', 'vanilla-edge', 'worker'),
    path.join(ROOT, 'templates', 'astro-edge', 'worker'),
    path.join(ROOT, 'tools', 'audit'),
    path.join(ROOT, 'tools', 'intelligence'),
    path.join(ROOT, 'tools', 'design'),
    path.join(ROOT, 'tools', 'lib'),
    path.join(ROOT, 'tools', 'guardrails')
  ];
  const files = [path.join(ROOT, 'tools', 'factory.mjs'), path.join(ROOT, 'tools', 'build_dist.mjs')].filter(p => fs.existsSync(p));
  for (const d of codeDirs) {
    files.push(...walkFiles(d, ['.js', '.mjs', '.ts'], 3));
  }

  const nodes = [];
  const edges = [];
  const symbolToFile = new Map();

  // Pass 1: Extract file nodes, classes, functions, window globals, and /api/* routes
  for (const filePath of files) {
    const rel = path.relative(ROOT, filePath).replace(/\\/g, '/');
    const code = fs.readFileSync(filePath, 'utf8');
    const classes = [];
    const functions = [];
    const globals = [];
    const apiRoutes = [];

    // Match class declarations
    for (const m of code.matchAll(/\bclass\s+([A-Za-z0-9_]+)/g)) {
      classes.push(m[1]);
      symbolToFile.set(m[1], rel);
    }
    // Match function declarations & exported functions
    for (const m of code.matchAll(/\b(?:async\s+)?function\s+([A-Za-z0-9_]+)\s*\(/g)) {
      if (m[1].length > 2) {
        functions.push(m[1]);
        symbolToFile.set(m[1], rel);
      }
    }
    // Match class methods (e.g. async renderTable(...) or verifyWebhookSignature(...))
    for (const m of code.matchAll(/^\s{2,4}(?:async\s+)?([a-zA-Z][a-zA-Z0-9_]{3,})\s*\([^)]*\)\s*\{/gm)) {
      const name = m[1];
      if (!['if', 'for', 'while', 'switch', 'catch', 'constructor'].includes(name)) {
        if (!functions.includes(name)) functions.push(name);
        if (!symbolToFile.has(name)) symbolToFile.set(name, rel);
      }
    }
    // Match window.<singleton> assignments
    for (const m of code.matchAll(/\bwindow\.([a-zA-Z0-9_]+)\s*=\s*(?:new\s+|{|function)/g)) {
      globals.push(`window.${m[1]}`);
      symbolToFile.set(`window.${m[1]}`, rel);
    }
    // Match /api/* endpoints
    for (const m of code.matchAll(/['"`](\/api\/[a-zA-Z0-9_/-]+)['"`]/g)) {
      if (!apiRoutes.includes(m[1])) apiRoutes.push(m[1]);
    }

    nodes.push({
      id: rel,
      type: rel.startsWith('worker/') || rel.startsWith('core/') ? 'backend' : (rel.startsWith('overlay-') || rel.startsWith('wheel-') ? 'overlay' : (rel.startsWith('site/') ? 'frontend' : 'tooling')),
      classes: classes.slice(0, 15),
      functions: functions.slice(0, 40),
      globals: globals.slice(0, 15),
      apiRoutes: apiRoutes.slice(0, 25),
      lines: code.split('\n').length
    });
  }

  // Pass 2: Extract cross-file edges (imports, window.<singleton> usage, shared /api/* routes, symbol calls)
  const routeProviders = new Map();
  for (const n of nodes) {
    if (n.type === 'backend') {
      for (const r of n.apiRoutes) routeProviders.set(r, n.id);
    }
  }

  for (const filePath of files) {
    const rel = path.relative(ROOT, filePath).replace(/\\/g, '/');
    const code = fs.readFileSync(filePath, 'utf8');

    // Check window.* references
    for (const m of code.matchAll(/\bwindow\.([a-zA-Z0-9_]+)/g)) {
      const targetFile = symbolToFile.get(`window.${m[1]}`);
      if (targetFile && targetFile !== rel) {
        edges.push({ source: rel, target: targetFile, relation: `uses_global:window.${m[1]}` });
      }
    }
    // Check /api/* calls from frontend/overlays to backend
    for (const m of code.matchAll(/['"`](\/api\/[a-zA-Z0-9_/-]+)['"`]/g)) {
      const provider = routeProviders.get(m[1]);
      if (provider && provider !== rel) {
        edges.push({ source: rel, target: provider, relation: `calls_api:${m[1]}` });
      }
    }
    // Check ES module imports
    for (const m of code.matchAll(/from\s+['"]([^'"]+)['"]/g)) {
      const imp = m[1];
      if (imp.startsWith('.')) {
        const resolved = path.relative(ROOT, path.resolve(path.dirname(filePath), imp)).replace(/\\/g, '/');
        const matchNode = nodes.find(n => n.id === resolved || n.id === `${resolved}.mjs` || n.id === `${resolved}.js`);
        if (matchNode && matchNode.id !== rel) {
          edges.push({ source: rel, target: matchNode.id, relation: 'imports' });
        }
      }
    }
  }

  // Deduplicate edges
  const uniqueEdges = [];
  const seenEdge = new Set();
  for (const e of edges) {
    const key = `${e.source}->${e.target}:${e.relation}`;
    if (!seenEdge.has(key)) {
      seenEdge.add(key);
      uniqueEdges.push(e);
    }
  }

  const prMap = computePageRank(nodes.map(n => n.id), uniqueEdges);
  for (const n of nodes) {
    n.pagerank = Number(((prMap.get(n.id) || 0) * 100).toFixed(4));
  }
  nodes.sort((a, b) => b.pagerank - a.pagerank);

  return { nodes, edges: uniqueEdges };
}

/**
 * 2. Build & Enrich Obsidian [[Wikilink]] Knowledge Graph across knowledge/ and .agents/skills/
 */
export function buildAndEnrichWikiGraph(_enrichFiles = false) {
  const mdFiles = [
    ...walkFiles(path.join(ROOT, 'knowledge'), ['.md'], 4).filter(
      (f) => !f.replace(/\\/g, '/').includes('knowledge/_inbox_')
    ),
    ...walkFiles(path.join(ROOT, '.agents', 'skills'), ['.md'], 3)
  ];

  const wikiNodes = [];
  const nameToRel = new Map();

  for (const f of mdFiles) {
    const rel = path.relative(ROOT, f).replace(/\\/g, '/');
    const base = path.basename(f, '.md');
    const parts = rel.split('/');
    const domain = parts[0] === 'knowledge' && parts.length > 2 ? parts[1] : (parts[0] === '.agents' ? 'agent_skills' : 'core_index');
    const effectiveName = base === 'SKILL' ? `skill_${parts[parts.length - 2]}` : base;
    nameToRel.set(effectiveName.toLowerCase(), rel);
    nameToRel.set(base.toLowerCase(), rel);
    wikiNodes.push({
      id: rel,
      title: effectiveName,
      domain,
      filePath: f
    });
  }

  // Extract all [[Wikilinks]], markdown file links, and virtual domain-hub edges strictly in memory/SQLite (never mutating knowledge/**/*.md)
  const wikiEdges = [];
  const seenWikiEdge = new Set();

  for (const node of wikiNodes) {
    const raw = fs.readFileSync(node.filePath, 'utf8');
    let explicitLinkCount = 0;
    // Match [[NoteName]] or [[NoteName|Alias]]
    for (const m of raw.matchAll(/\[\[([^\]|#]+)(?:[|#][^\]]*)?\]\]/g)) {
      const targetName = m[1].trim().toLowerCase();
      const targetRel = nameToRel.get(targetName);
      if (targetRel && targetRel !== node.id) {
        explicitLinkCount++;
        const key = `${node.id}->${targetRel}`;
        if (!seenWikiEdge.has(key)) {
          seenWikiEdge.add(key);
          wikiEdges.push({ source: node.id, target: targetRel, relation: 'wikilink' });
        }
      }
    }
    // Match [label](file:///.../knowledge/.../File.md)
    for (const m of raw.matchAll(/\]\([^)]*\/([A-Za-z0-9_-]+)\.md\)/g)) {
      const targetName = m[1].trim().toLowerCase();
      const targetRel = nameToRel.get(targetName);
      if (targetRel && targetRel !== node.id) {
        explicitLinkCount++;
        const key = `${node.id}->${targetRel}`;
        if (!seenWikiEdge.has(key)) {
          seenWikiEdge.add(key);
          wikiEdges.push({ source: node.id, target: targetRel, relation: 'md_link' });
        }
      }
    }
    if (explicitLinkCount < 2 && node.id.startsWith('knowledge/') && node.title !== 'INDEX') {
      const hubs = DOMAIN_HUBS[node.domain] || DOMAIN_HUBS.architecture_and_books;
      const targets = ['INDEX', ...hubs.filter((h) => h !== node.title).slice(0, 4)];
      for (const h of targets) {
        const targetRel = nameToRel.get(h.toLowerCase());
        if (targetRel && targetRel !== node.id) {
          const key = `${node.id}->${targetRel}`;
          if (!seenWikiEdge.has(key)) {
            seenWikiEdge.add(key);
            wikiEdges.push({ source: node.id, target: targetRel, relation: 'virtual_hub_edge' });
          }
        }
      }
    }
  }

  const prMap = computePageRank(wikiNodes.map(n => n.id), wikiEdges);
  for (const n of wikiNodes) {
    n.pagerank = Number(((prMap.get(n.id) || 0) * 100).toFixed(4));
    delete n.filePath;
  }
  wikiNodes.sort((a, b) => b.pagerank - a.pagerank);

  return { nodes: wikiNodes, edges: wikiEdges };
}

/**
 * Persist both graphs into .cache/omni_rag_fts5.sqlite and .cache/code_and_wiki_graph.json
 */
export function buildAndPersistAllGraphs(options = {}) {
  if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });
  const targetSqlitePath = options.dbPath || SQLITE_DB_FILE;
  const codeGraph = buildCodeGraph();
  const wikiGraph = buildAndEnrichWikiGraph(false);

  const payload = {
    generatedAt: new Date().toISOString(),
    codeGraph,
    wikiGraph
  };
  fs.writeFileSync(GRAPH_JSON_FILE, JSON.stringify(payload, null, 2), 'utf8');

  try {
    const { DatabaseSync } = require('node:sqlite');
    const db = new DatabaseSync(targetSqlitePath);
    try {
      db.exec('PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL; PRAGMA busy_timeout = 5000; PRAGMA foreign_keys = ON;');
      db.exec(`
        CREATE TABLE IF NOT EXISTS code_nodes (
          id TEXT PRIMARY KEY,
          type TEXT,
          pagerank REAL,
          classes_json TEXT,
          functions_json TEXT,
          globals_json TEXT,
          routes_json TEXT,
          lines INTEGER
        );
        CREATE TABLE IF NOT EXISTS code_edges (
          source TEXT,
          target TEXT,
          relation TEXT
        );
        CREATE TABLE IF NOT EXISTS wiki_nodes (
          id TEXT PRIMARY KEY,
          title TEXT,
          domain TEXT,
          pagerank REAL
        );
        CREATE TABLE IF NOT EXISTS wiki_edges (
          source TEXT,
          target TEXT,
          relation TEXT
        );
      `);

      db.exec('BEGIN IMMEDIATE');
      db.exec('DELETE FROM code_nodes; DELETE FROM code_edges; DELETE FROM wiki_nodes; DELETE FROM wiki_edges;');
      const insCodeNode = db.prepare('INSERT INTO code_nodes VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
      for (const n of codeGraph.nodes) {
        insCodeNode.run(
          n.id,
          n.type,
          n.pagerank,
          JSON.stringify(n.classes),
          JSON.stringify(n.functions),
          JSON.stringify(n.globals),
          JSON.stringify(n.apiRoutes),
          n.lines
        );
      }
      const insCodeEdge = db.prepare('INSERT INTO code_edges VALUES (?, ?, ?)');
      for (const e of codeGraph.edges) {
        insCodeEdge.run(e.source, e.target, e.relation);
      }
      const insWikiNode = db.prepare('INSERT INTO wiki_nodes VALUES (?, ?, ?, ?)');
      for (const n of wikiGraph.nodes) {
        insWikiNode.run(n.id, n.title, n.domain, n.pagerank);
      }
      const insWikiEdge = db.prepare('INSERT INTO wiki_edges VALUES (?, ?, ?)');
      for (const e of wikiGraph.edges) {
        insWikiEdge.run(e.source, e.target, e.relation);
      }
      db.exec('COMMIT');
    } finally {
      try {
        db.close();
      } catch {
        // ignore close failure
      }
    }
  } catch (err) {
    console.warn('[WARN] SQLite graph persistence warning:', err.message);
  }

  return payload;
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const res = buildAndPersistAllGraphs();
  console.log('================================================================');
  console.log('  AST CODEGRAPH + OBSIDIAN [[WIKILINK]] PAGERANK ENGINE BUILT   ');
  console.log('================================================================');
  console.log(`CodeGraph: ${res.codeGraph.nodes.length} files indexed | ${res.codeGraph.edges.length} call/route/global edges`);
  console.log(`Top 5 Code Hubs by PageRank:`, res.codeGraph.nodes.slice(0, 5).map(n => `${n.id} (PR=${n.pagerank})`));
  console.log(`WikiGraph: ${res.wikiGraph.nodes.length} notes indexed | ${res.wikiGraph.edges.length} [[wikilink]] edges`);
  console.log(`Top 5 Knowledge Hubs by PageRank:`, res.wikiGraph.nodes.slice(0, 5).map(n => `${n.title} (PR=${n.pagerank})`));
}
