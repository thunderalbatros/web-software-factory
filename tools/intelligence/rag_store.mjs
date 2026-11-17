#!/usr/bin/env node
/**
 * tools/intelligence/rag_store.mjs — Omni-RAG v6 Hybrid SQLite Engine
 * =============================================================================
 * Real Hybrid Retrieval Engine (`sqlite-vec` int8[768] + `FTS5` unicode61/trigram):
 *   - Two isolated SQLite WAL databases in `.cache/` (zero Windows EBUSY unlink):
 *       1. `.cache/rag_hot.sqlite`     — Treatises, Vault, AI Academy, Docs & Agent Skills (`1.0x`)
 *       2. `.cache/rag_library.sqlite` — Full Books (`canon-book`), queried via `scope: 'library' | 'all'`
 *   - Structural Markdown Chunker: preserves `#..######` hierarchy and keeps ``` code fences,
 *     Markdown tables, and `$$` math blocks 100% atomic (`0` broken fences, `0` `[Scope: ...]` noise).
 *   - Incremental in-place `BEGIN IMMEDIATE ... COMMIT` sync by LF-normalized `sha256` with
 *     persisted `domain`, `tier`, and `authority` (`< 50 ms` cold start, `<= 110 MB` MCP RSS).
 *   - Multilingual `768d` embeddings (`gemini-embedding-001`) with explicit post-truncation L2
 *     normalization, `int8` (`[-127, 127]`) quantization, persistent `emb_cache` (`$0.00` rebuilds),
 *     query vector cache, and graceful `lexical_offline` fallback when `allowNetwork === false`.
 * =============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import {
  classifyEpistemicTier,
  inspectAndGuardLegacyFragment,
  inspectAndSanitizePromptInjection,
  delimitRetrievedRagData,
  TRANSLATION_RULE_WARNING
} from './rag_library_sanitizer.mjs';
import {
  classifyKnowledgeDocumentDomain,
  resolveDomainProfile
} from '../lib/project_profile.mjs';
import { embedTextsWithVertex } from './vertex_ai_bridge.mjs';
import { buildAndPersistAllGraphs } from './code_and_wiki_graph.mjs';

const require = createRequire(import.meta.url);
const sqliteVec = require('sqlite-vec');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const ROOT = path.resolve(__dirname, '..', '..');
export const CACHE_DIR = path.join(ROOT, '.cache');
export const RAG_HOT_DB_PATH = path.join(CACHE_DIR, 'rag_hot.sqlite');
export const RAG_LIBRARY_DB_PATH = path.join(CACHE_DIR, 'rag_library.sqlite');
export const DEFAULT_EMBEDDING_MODEL = 'gemini-embedding-001';
export const DEFAULT_EMBEDDING_DIM = 768;
export const RRF_K = 60;

const SKIP_DIRS = new Set([
  'node_modules', '.git', 'dist', 'build', '.next', 'coverage', '.cache',
  '__tests__', 'test', 'tests', 'spec', 'fixtures', 'demo', 'examples',
  'website', 'benchmark', 'benchmarks', 'vendor', 'packages', 'assets',
  '.github', '.husky', '_inbox_pdfs', '_inbox_courses'
]);

const SKIP_FILES_REGEX =
  /^(changelog|contributing|code_of_conduct|security|license|pull_request_template|issue_template|package-lock|yarn\.lock|pnpm-lock|tsconfig|webpack\.|vite\.config)/i;

const NOISY_BOOK_HEADING_REGEX =
  /^(copyright|colophon|dedication|acknowledgments|acknowledgements|praise for|other titles|subject index|author index|about the author|about the authors)$/i;

const CORE_PROJECT_TREATISES = new Set([
  'CANON_UNIVERSITY_COURSES_AND_28_FACTORY_TALKS_2026',
  'CANON_DOMAIN_CMU_15445_MVCC_BTREE_WAL_AND_ATOMIC_TX_2026',
  'CANON_DOMAIN_MIT_65840_DISTRIBUTED_IDEMPOTENCY_AND_DURABLE_OBJECTS_2026',
  'CANON_DOMAIN_MIT_6102_OUSTERHOUT_DEEP_MODULES_AND_REP_INVARIANTS_2026',
  'CANON_DOMAIN_CMU_15462_KEENAN_CRANE_AND_WEBGPU_SHADERS_60FPS_2026',
  'CANON_DOMAIN_STANFORD_CS253_WEB_SECURITY_SOP_CSP_AND_WEBAUTHN_2026',
  'CANON_DOMAIN_GOOGLE_WEBDEV_CWV_BLINK_V8_A11Y_AND_MODERN_CSS_2026',
  'CANON_DOMAIN_STANFORD_CCRMA_220A_MODAL_SYNTHESIS_AND_PROCEDURAL_AUDIO_2026',
  'CANON_DOMAIN_BAYMARD_AND_LAWS_OF_UX_CHECKOUT_CRO_2026',
  'CANON_AGENTIC_HARNESS_ENGINEERING_ACI_EDD_BOOKS_AND_COURSES_2026',
  'CANON_WEB_SOFTWARE_FACTORY_MCP_DTCG_AND_LIGHTNINGCSS_2026',
  'CANON_BOOKS_SOFTWARE_FACTORIES_AND_AI_ENGINEERING',
  'ai_engineering',
  'CANON_SPLE_ISO26550_AND_SOFTWARE_FACTORIES_ARCHITECTURE_2026',
  'CANON_ASTRO5_CLOUDFLARE_WORKERS_AND_MODERN_WEB_TEMPLATES_2026',
  'CANON_MULTI_BRAND_DESIGN_SYSTEMS_DTCG_STYLE_DICTIONARY_AND_ARCHETYPES_2026',
  'CANON_SOTA_AGENT_TEAM_TOPOLOGY_AND_2026_WEB_STACK_AUDIT',
  'CANON_SOFTWARE_FACTORY_CURRICULUM_BOOKS_PAPERS_AND_VIDEO_COURSES_2026',
  'CANON_ELITE_MULTI_AGENT_WEB_SOFTWARE_FACTORY_TOPOLOGY_2026',
  'CANON_WEB_DESIGN_COMPOSITION_SHADERS_AND_MOTION_2026',
  'CANON_AUTOMATED_VISUAL_QA_VLM_CRITIC_AND_CTO_HITL_GATE_2026',
  'CANON_SELF_EVOLVING_SOFTWARE_FACTORY_AND_SPECULATIVE_RAG_2026',
  'CANON_FRONTEND_VERIFICATION_PIPELINE_AND_BENCHMARKS_2026',
  'CANON_GAMIFICATION_PSYCHOLOGY_CRO_AND_STREAM_MARKETING_2026',
  'CANON_SOTA_RAG_ARCHITECTURES_AND_TOOLS_2026',
  'CANON_EMIL_KOWALSKI_ANIMATIONS_ON_THE_WEB',
  'CANON_2D_3D_GRAPHICS_SHADERS_AND_AESTHETICS_2026',
  'CANON_HOLO_SHADERS_3D_PACK_CHOREOGRAPHY_AND_WEBAUDIO_SFX_2026',
  'CANON_ATOMIC_PSYCHOACOUSTICS_PROCEDURAL_DSP_AND_AUDIOVISUAL_SYNCHRESIS_2026',
  'CANON_OFFICIAL_DOCS_THREE_R186_SPARK_DIORAMAS_BLENDER_MCP_AND_GLTF_2026',
  'CANON_OFFICIAL_DOCS_HARNESS2_GEPA_OPENSPACE_HEADROOM_COCOINDEX_AND_CODEMODE_2026',
  'CANON_OFFICIAL_DOCS_POSTGRES_RLS_CIS_ORY_ZANZIBAR_GCP_KMS_AND_ZIZMOR_2026',
  'CANON_EVERY_LAYOUT_CSS_ALGORITHMS',
  'CANON_UX_HUMAN_EXPERIENCE_ACCESSIBILITY_2026',
  'CANON_CYBERSECURITY_DEVSECOPS_2026',
  'CURATED_MASTER_BOOKS_AND_COURSES_2026',
  'CURATED_MASTER_BOOKS_COURSES_AND_DOCS_CATALOG_2026',
  'DESIGN_MASTERY_2026',
  'AGENT_CREATIVE_AND_VISUAL_AWARENESS_2026',
  'CYBERSECURITY_MASTER_PROTOCOL',
  'ANTI_BOT_STEALTH_GUIDE',
  'LIBRARY_INGEST_02_MOTION_SHADERS_GAME_ENGINE_AND_AUDIO_25_BOOKS_2026',
  'book_game_feel_steve_swink',
  'jev_and_cognitive_memory_pipelines_master_treatise_2026',
  'deterministic_agentic_ai_xstate_stately_and_statecharts_treatise_2026',
  'CANON_BOUNDARYML_BAML_OFFICIAL_DOCS_AND_FACTORY_INTEGRATION_REPORT_2026',
  'CANON_PEDAGOGICAL_SCAFFOLDING_UNESCO_DIATAXIS_AND_SOCRATIC_LEARNLM_2026',
  'CANON_INCLUSIVE_MINIMALIST_UX_BRILLIANT_STRIPE_AND_DISTILL_2026',
  'CANON_ETHICAL_GAMIFICATION_ZERO_COST_TUTOR_AND_PRIVACY_2026',
  'CANON_AUTONOMOUS_CURRICULUM_ENGINEERING_MULTIMEDIA_TRIANGULATION_AND_ASSESSMENT_2026',
  'INDEX'
]);

const QUERY_STOPWORDS = new Set([
  'como', 'para', 'con', 'por', 'una', 'uno', 'unas', 'unos', 'del', 'las', 'los', 'que', 'cual',
  'cuales', 'donde', 'cuando', 'sobre', 'entre', 'hacia', 'desde', 'sin', 'mas', 'muy', 'este',
  'esta', 'estos', 'estas', 'ese', 'esa', 'son', 'sea', 'ser', 'hay', 'sus', 'mis', 'tus', 'nos',
  'the', 'and', 'for', 'with', 'from', 'into', 'that', 'this', 'what', 'when', 'where', 'which',
  'how', 'why', 'who', 'are', 'was', 'were', 'been', 'have', 'has', 'had', 'not', 'but', 'can',
  'use', 'using', 'used', 'about', 'over', 'under', 'between', 'within', 'without'
]);

const openDbConnections = new Map();
const queryVecMemCache = new Map();
const MAX_MEM_QUERY_VEC_CACHE = 256;
const dbHasTrigramCache = new WeakMap();
const dbPreparedStmtCache = new WeakMap();
const hotDbReadySet = new Set();

function getCachedStatement(db, sql) {
  let cache = dbPreparedStmtCache.get(db);
  if (!cache) {
    cache = new Map();
    dbPreparedStmtCache.set(db, cache);
  }
  let stmt = cache.get(sql);
  if (!stmt) {
    stmt = db.prepare(sql);
    cache.set(sql, stmt);
  }
  return stmt;
}

function sha256Lf(text = '') {
  return crypto
    .createHash('sha256')
    .update(String(text || '').replace(/\r\n/g, '\n'), 'utf8')
    .digest('hex');
}

/**
 * Opens or reuses a WAL-enabled `node:sqlite` connection with `sqlite-vec` loaded
 * and dynamic extension loading immediately disabled (`enableLoadExtension(false)`).
 */
export function openRagDatabase(dbPath, options = {}) {
  const absPath = path.resolve(dbPath);
  if (!options.freshConnection && openDbConnections.has(absPath)) {
    return openDbConnections.get(absPath);
  }
  const isLibraryPartition =
    options.partition === 'library' || /rag_library\.sqlite$/i.test(absPath);
  fs.mkdirSync(path.dirname(absPath), { recursive: true });
  const db = new DatabaseSync(absPath, { allowExtension: true });
  sqliteVec.load(db);
  db.enableLoadExtension(false);

  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = NORMAL;
    PRAGMA busy_timeout = 5000;
    PRAGMA foreign_keys = ON;
    PRAGMA mmap_size = 268435456;
    PRAGMA cache_size = -64000;
    PRAGMA temp_store = MEMORY;
    PRAGMA analysis_limit = 1000;

    CREATE TABLE IF NOT EXISTS docs (
      doc_id INTEGER PRIMARY KEY AUTOINCREMENT,
      rel_path TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      partition TEXT NOT NULL,
      category TEXT NOT NULL,
      domain TEXT NOT NULL,
      tier TEXT NOT NULL,
      authority REAL NOT NULL,
      epistemic_role TEXT NOT NULL DEFAULT '',
      sha256 TEXT NOT NULL,
      size_bytes INTEGER NOT NULL DEFAULT 0,
      chunk_count INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_docs_domain ON docs(domain);
    CREATE INDEX IF NOT EXISTS idx_docs_tier ON docs(tier);

    CREATE TABLE IF NOT EXISTS chunks (
      chunk_id INTEGER PRIMARY KEY AUTOINCREMENT,
      doc_id INTEGER NOT NULL REFERENCES docs(doc_id) ON DELETE CASCADE,
      chunk_uid TEXT NOT NULL UNIQUE,
      ord INTEGER NOT NULL,
      heading_path TEXT NOT NULL,
      text TEXT NOT NULL,
      embed_input TEXT NOT NULL,
      should_embed INTEGER NOT NULL DEFAULT 1,
      chunk_sha256 TEXT NOT NULL,
      start_line INTEGER NOT NULL DEFAULT 1,
      end_line INTEGER NOT NULL DEFAULT 1,
      token_est INTEGER NOT NULL DEFAULT 0,
      legacy_guard INTEGER NOT NULL DEFAULT 0
    );
    CREATE INDEX IF NOT EXISTS idx_chunks_doc_id ON chunks(doc_id);

    CREATE VIRTUAL TABLE IF NOT EXISTS chunks_fts USING fts5(
      heading_path,
      text,
      content='chunks',
      content_rowid='chunk_id',
      tokenize='unicode61 remove_diacritics 2'
    );
  `);

  if (isLibraryPartition) {
    db.exec(`
      DROP INDEX IF EXISTS idx_chunks_sha256;
      DROP TRIGGER IF EXISTS trg_chunks_ai;
      DROP TRIGGER IF EXISTS trg_chunks_ad;
      DROP TRIGGER IF EXISTS trg_chunks_au;
      DROP TABLE IF EXISTS chunks_trigram;

      CREATE TRIGGER IF NOT EXISTS trg_chunks_ai AFTER INSERT ON chunks BEGIN
        INSERT INTO chunks_fts(rowid, heading_path, text) VALUES (new.chunk_id, new.heading_path, new.text);
      END;

      CREATE TRIGGER IF NOT EXISTS trg_chunks_ad AFTER DELETE ON chunks BEGIN
        INSERT INTO chunks_fts(chunks_fts, rowid, heading_path, text) VALUES ('delete', old.chunk_id, old.heading_path, old.text);
      END;

      CREATE TRIGGER IF NOT EXISTS trg_chunks_au AFTER UPDATE ON chunks BEGIN
        INSERT INTO chunks_fts(chunks_fts, rowid, heading_path, text) VALUES ('delete', old.chunk_id, old.heading_path, old.text);
        INSERT INTO chunks_fts(rowid, heading_path, text) VALUES (new.chunk_id, new.heading_path, new.text);
      END;
    `);
  } else {
    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_chunks_sha256 ON chunks(chunk_sha256);
      CREATE VIRTUAL TABLE IF NOT EXISTS chunks_trigram USING fts5(
        heading_path,
        text,
        content='chunks',
        content_rowid='chunk_id',
        tokenize='trigram remove_diacritics 1'
      );

      CREATE TRIGGER IF NOT EXISTS trg_chunks_ai AFTER INSERT ON chunks BEGIN
        INSERT INTO chunks_fts(rowid, heading_path, text) VALUES (new.chunk_id, new.heading_path, new.text);
        INSERT INTO chunks_trigram(rowid, heading_path, text) VALUES (new.chunk_id, new.heading_path, new.text);
      END;

      CREATE TRIGGER IF NOT EXISTS trg_chunks_ad AFTER DELETE ON chunks BEGIN
        INSERT INTO chunks_fts(chunks_fts, rowid, heading_path, text) VALUES ('delete', old.chunk_id, old.heading_path, old.text);
        INSERT INTO chunks_trigram(chunks_trigram, rowid, heading_path, text) VALUES ('delete', old.chunk_id, old.heading_path, old.text);
      END;

      CREATE TRIGGER IF NOT EXISTS trg_chunks_au AFTER UPDATE ON chunks BEGIN
        INSERT INTO chunks_fts(chunks_fts, rowid, heading_path, text) VALUES ('delete', old.chunk_id, old.heading_path, old.text);
        INSERT INTO chunks_trigram(chunks_trigram, rowid, heading_path, text) VALUES ('delete', old.chunk_id, old.heading_path, old.text);
        INSERT INTO chunks_fts(rowid, heading_path, text) VALUES (new.chunk_id, new.heading_path, new.text);
        INSERT INTO chunks_trigram(rowid, heading_path, text) VALUES (new.chunk_id, new.heading_path, new.text);
      END;
    `);
  }

  db.exec(`
    CREATE VIRTUAL TABLE IF NOT EXISTS chunks_vec USING vec0(
      chunk_id INTEGER PRIMARY KEY,
      domain TEXT,
      emb int8[768] distance_metric=cosine
    );

    CREATE TABLE IF NOT EXISTS emb_cache (
      chunk_sha256 TEXT NOT NULL,
      model TEXT NOT NULL,
      dim INTEGER NOT NULL,
      emb BLOB NOT NULL,
      created_at TEXT NOT NULL,
      PRIMARY KEY (chunk_sha256, model, dim)
    );

    CREATE TABLE IF NOT EXISTS query_emb_cache (
      query_sha256 TEXT NOT NULL,
      model TEXT NOT NULL,
      dim INTEGER NOT NULL,
      emb BLOB NOT NULL,
      created_at TEXT NOT NULL,
      PRIMARY KEY (query_sha256, model, dim)
    );
  `);

  if (!options.freshConnection) {
    openDbConnections.set(absPath, db);
  }
  return db;
}

export function closeAllRagDatabases() {
  for (const [, db] of openDbConnections) {
    try {
      db.close();
    } catch {}
  }
  openDbConnections.clear();
  queryVecMemCache.clear();
}

/**
 * Determines whether a workspace Markdown file belongs to `hot` (`rag_hot.sqlite`) or `library` (`rag_library.sqlite`).
 */
export function classifyDocumentPartitionAndCategory(relPath, sizeBytes = 0) {
  const norm = String(relPath || '').replace(/\\/g, '/');
  const ext = path.extname(norm).toLowerCase();
  const fileName = path.basename(norm, ext);

  if (norm.startsWith('.agents/skills/')) {
    return { partition: 'hot', category: 'agent-skill' };
  }
  if (norm.startsWith('docs/') || norm.startsWith('.agents/memory/') || norm.startsWith('references/')) {
    return { partition: 'hot', category: 'canon-vault' };
  }
  if (norm.startsWith('knowledge/ai_academy/')) {
    return { partition: 'hot', category: 'canon-treatise' };
  }
  if (CORE_PROJECT_TREATISES.has(fileName) && sizeBytes < 350_000) {
    return { partition: 'hot', category: 'canon-treatise' };
  }

  const isTreatiseOrVaultPrefix =
    fileName.startsWith('CANON_') ||
    fileName.startsWith('TREATISE_') ||
    fileName.startsWith('LIBRARY_INGEST_') ||
    fileName.startsWith('CURATED_') ||
    fileName.startsWith('VAULT_') ||
    fileName.startsWith('MASTERCLASS_') ||
    fileName.startsWith('COURSE_') ||
    fileName.startsWith('COMPENDIO_') ||
    fileName.startsWith('TRATADO_') ||
    fileName.startsWith('BENCHMARK_') ||
    fileName.startsWith('SCORING_') ||
    fileName.startsWith('SOTA_') ||
    fileName.startsWith('FOSS_') ||
    fileName.startsWith('GAME_THEORY_') ||
    fileName.startsWith('TECNOLOGIAS_') ||
    fileName.startsWith('course_') ||
    fileName.startsWith('websockets_') ||
    fileName.startsWith('next_gen_');

  if (isTreatiseOrVaultPrefix && !fileName.startsWith('CANON_BOOK_') && sizeBytes < 350_000) {
    return { partition: 'hot', category: 'canon-vault' };
  }
  if (norm.startsWith('knowledge/')) {
    return { partition: 'library', category: 'canon-book' };
  }
  return { partition: 'hot', category: 'general' };
}

function scanWorkspaceMarkdownFiles(dir, maxDepth = 4, depth = 0, mode = 'full') {
  let out = [];
  if (depth > maxDepth || !fs.existsSync(dir)) return out;
  try {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const fp = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        if (ent.name.startsWith('.') && ent.name !== '.agents') continue;
        if (SKIP_DIRS.has(ent.name.toLowerCase())) continue;
        out = out.concat(scanWorkspaceMarkdownFiles(fp, maxDepth, depth + 1, mode));
      } else if (ent.isFile()) {
        const lower = ent.name.toLowerCase();
        if (SKIP_FILES_REGEX.test(lower)) continue;
        if (mode === 'references-root') {
          if ((lower === 'readme.md' || lower === 'skill.md' || lower === 'index.md') && depth <= 3) {
            out.push(fp);
          }
        } else if (lower.endsWith('.md') || lower.endsWith('.markdown')) {
          out.push(fp);
        }
      }
    }
  } catch {}
  return out;
}

export function discoverAllRagCorpusFiles(rootDir = ROOT) {
  const searchDirs = [
    { dir: path.join(rootDir, 'knowledge'), depth: 4, mode: 'full' },
    { dir: path.join(rootDir, 'docs'), depth: 4, mode: 'full' },
    { dir: path.join(rootDir, '.agents', 'skills'), depth: 3, mode: 'full' },
    { dir: path.join(rootDir, '.agents', 'memory'), depth: 3, mode: 'full' },
    { dir: path.join(rootDir, 'references'), depth: 3, mode: 'references-root' }
  ];
  const seen = new Set();
  const files = [];
  for (const { dir, depth, mode } of searchDirs) {
    for (const fp of scanWorkspaceMarkdownFiles(dir, depth, 0, mode)) {
      const normAbs = path.resolve(fp);
      if (!seen.has(normAbs)) {
        seen.add(normAbs);
        files.push(normAbs);
      }
    }
  }
  files.sort((a, b) => a.localeCompare(b));
  return files;
}

function splitLongProseParagraph(text, maxChars = 1800, overlapChars = 120) {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const out = [];
  let cur = '';
  for (const s of sentences) {
    const piece = s.trim();
    if (!piece) continue;
    if (piece.length > maxChars) {
      if (cur) {
        out.push(cur);
        cur = '';
      }
      for (let i = 0; i < piece.length; i += maxChars - overlapChars) {
        out.push(piece.slice(i, i + maxChars));
      }
      continue;
    }
    if (cur && cur.length + piece.length + 1 > maxChars) {
      out.push(cur);
      const tail = cur.slice(-overlapChars).trim();
      cur = tail ? `${tail} ${piece}` : piece;
    } else {
      cur = cur ? `${cur} ${piece}` : piece;
    }
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

function extractFirstProsePreview(text = '', maxLen = 260) {
  const withoutCode = String(text || '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/~~~[\s\S]*?~~~/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return withoutCode.slice(0, maxLen);
}

/**
 * Counts triple-backtick or tilde fences in a chunk to assert 0 broken code fences.
 */
export function hasUnbalancedCodeFence(text = '') {
  const lines = String(text || '').split('\n');
  let inFence = false;
  let fenceChar = '';
  let fenceLen = 0;
  for (const line of lines) {
    const trimmed = line.trimStart();
    if (!inFence) {
      const m = trimmed.match(/^(`{3,}|~{3,})/);
      if (m) {
        inFence = true;
        fenceChar = m[1][0];
        fenceLen = m[1].length;
      }
    } else {
      const closeRx = new RegExp(`^\\${fenceChar}{${fenceLen},}\\s*$`);
      if (closeRx.test(trimmed)) {
        inFence = false;
        fenceChar = '';
        fenceLen = 0;
      }
    }
  }
  return inFence;
}

/**
 * Structural Markdown Chunker (`#..######` hierarchy, atomic code fences, tables, and `$$` math blocks,
 * zero `[Scope: ...]` repetition).
 */
export function chunkMarkdownDocument({
  relPath,
  rawText,
  partition = 'hot',
  tier = 'TIER_1_SOTA_2026'
}) {
  const normRel = String(relPath || '').replace(/\\/g, '/');
  const ext = path.extname(normRel);
  const baseName = path.basename(normRel, ext);
  const isSkill = normRel.startsWith('.agents/skills/');
  const skillSlug = isSkill ? normRel.split('/')[2] || baseName : '';
  const docTitle = isSkill && baseName.toUpperCase() === 'SKILL' ? `skill:${skillSlug}` : baseName;

  const lfText = String(rawText || '').replace(/\r\n/g, '\n');
  const rawLines = lfText.split('\n');

  let bodyStartIdx = 0;
  if (rawLines[0]?.trim() === '---') {
    for (let i = 1; i < Math.min(rawLines.length, 160); i++) {
      if (rawLines[i].trim() === '---') {
        bodyStartIdx = i + 1;
        break;
      }
    }
  }

  // Strip legacy auto-injected Obsidian footer lines in memory without touching disk
  let bodyEndIdx = rawLines.length;
  for (let i = rawLines.length - 1; i >= Math.max(bodyStartIdx, rawLines.length - 12); i--) {
    if (rawLines[i].startsWith('**Conexiones del Grafo (Obsidian):**')) {
      bodyEndIdx = i > bodyStartIdx && rawLines[i - 1].trim() === '---' ? i - 1 : i;
      break;
    }
  }

  const maxChars = partition === 'library' ? 3200 : 1800;
  const headingStack = ['', '', '', '', '', ''];
  const sections = [];

  let curBlocks = [];
  let curProseLines = [];
  let curProseStart = bodyStartIdx + 1;

  const currentHeadingPath = () => {
    const active = headingStack.filter(Boolean);
    return active.length > 0 ? `${docTitle} › ${active.join(' › ')}` : docTitle;
  };

  const currentLeafHeading = () => {
    for (let k = 5; k >= 0; k--) {
      if (headingStack[k]) return headingStack[k];
    }
    return 'Main';
  };

  const currentLeafLevel = () => {
    for (let k = 5; k >= 0; k--) {
      if (headingStack[k]) return k + 1;
    }
    return 1;
  };

  const flushProseLines = (endLine1Based) => {
    if (curProseLines.length === 0) return;
    const joined = curProseLines.join('\n').trim();
    if (joined) {
      curBlocks.push({
        kind: 'prose',
        text: joined,
        startLine: curProseStart,
        endLine: Math.max(curProseStart, endLine1Based)
      });
    }
    curProseLines = [];
  };

  const flushSection = () => {
    if (curBlocks.length === 0) return;
    const leaf = currentLeafHeading();
    if (!NOISY_BOOK_HEADING_REGEX.test(leaf.trim())) {
      sections.push({
        headingPath: currentHeadingPath(),
        leafHeading: leaf,
        level: currentLeafLevel(),
        blocks: curBlocks
      });
    }
    curBlocks = [];
  };

  let i = bodyStartIdx;
  while (i < bodyEndIdx) {
    const line = rawLines[i];
    const line1 = i + 1;
    const trimmedStart = line.trimStart();

    // 1. Atomic Fenced Code Block (``` or ~~~)
    const fenceMatch = trimmedStart.match(/^(`{3,}|~{3,})/);
    if (fenceMatch) {
      flushProseLines(line1 - 1);
      const fenceChar = fenceMatch[1][0];
      const fenceLen = fenceMatch[1].length;
      const closeRx = new RegExp(`^\\${fenceChar}{${fenceLen},}\\s*$`);
      const codeLines = [line];
      const startL = line1;
      i++;
      while (i < bodyEndIdx) {
        codeLines.push(rawLines[i]);
        if (closeRx.test(rawLines[i].trimStart())) {
          i++;
          break;
        }
        i++;
      }
      // Close unclosed author typo fence in chunk buffer so chunk itself never carries unbalanced fence
      if (codeLines.length === 1 || !closeRx.test(codeLines[codeLines.length - 1].trimStart())) {
        codeLines.push(fenceChar.repeat(fenceLen));
      }
      curBlocks.push({
        kind: 'code',
        text: codeLines.join('\n'),
        startLine: startL,
        endLine: startL + codeLines.length - 1
      });
      curProseStart = i + 1;
      continue;
    }

    // 2. Atomic Display Math Block ($$ ... $$)
    if (trimmedStart.startsWith('$$')) {
      flushProseLines(line1 - 1);
      const mathLines = [line];
      const startL = line1;
      const singleLineClosed = trimmedStart.length > 2 && trimmedStart.endsWith('$$') && trimmedStart !== '$$';
      i++;
      if (!singleLineClosed) {
        while (i < bodyEndIdx) {
          mathLines.push(rawLines[i]);
          if (rawLines[i].trim().endsWith('$$')) {
            i++;
            break;
          }
          i++;
        }
      }
      curBlocks.push({
        kind: 'math',
        text: mathLines.join('\n'),
        startLine: startL,
        endLine: startL + mathLines.length - 1
      });
      curProseStart = i + 1;
      continue;
    }

    // 3. Atomic Markdown Table Block
    if (trimmedStart.startsWith('|') && trimmedStart.includes('|', 1)) {
      flushProseLines(line1 - 1);
      const tableLines = [line];
      const startL = line1;
      i++;
      while (i < bodyEndIdx && rawLines[i].trimStart().startsWith('|')) {
        tableLines.push(rawLines[i]);
        i++;
      }
      curBlocks.push({
        kind: 'table',
        text: tableLines.join('\n'),
        startLine: startL,
        endLine: startL + tableLines.length - 1
      });
      curProseStart = i + 1;
      continue;
    }

    // 4. Markdown Heading (# .. ######) outside fences
    const hMatch = line.match(/^(#{1,6})\s+(.+?)\s*$/);
    if (hMatch) {
      flushProseLines(line1 - 1);
      flushSection();
      const level = hMatch[1].length;
      const headingText = hMatch[2].replace(/\s+#+\s*$/, '').trim();
      headingStack[level - 1] = headingText;
      for (let k = level; k < 6; k++) headingStack[k] = '';
      i++;
      curProseStart = i + 1;
      continue;
    }

    // 5. Paragraph boundary on blank line
    if (line.trim() === '') {
      flushProseLines(line1 - 1);
      i++;
      curProseStart = i + 1;
      continue;
    }

    if (curProseLines.length === 0) {
      curProseStart = line1;
    }
    curProseLines.push(line);
    i++;
  }
  flushProseLines(bodyEndIdx);
  flushSection();

  const chunks = [];
  let ord = 0;
  let embeddedSectionsInDoc = 0;
  const maxLibraryEmbeddedSectionsPerBook = 28;

  for (let sIdx = 0; sIdx < sections.length; sIdx++) {
    const sec = sections[sIdx];
    const expandedBlocks = [];
    for (const blk of sec.blocks) {
      const cleanBlockText = inspectAndSanitizePromptInjection(blk.text).sanitizedText.trim();
      if (!cleanBlockText) continue;
      if (blk.kind === 'prose' && cleanBlockText.length > maxChars) {
        const subParts = splitLongProseParagraph(cleanBlockText, maxChars, 120);
        for (const sp of subParts) {
          expandedBlocks.push({
            kind: 'prose',
            text: sp,
            startLine: blk.startLine,
            endLine: blk.endLine
          });
        }
      } else {
        // Atomic code fences, tables, and $$ math blocks are NEVER split!
        expandedBlocks.push({
          kind: blk.kind,
          text: cleanBlockText,
          startLine: blk.startLine,
          endLine: blk.endLine
        });
      }
    }

    let accText = '';
    let accStart = 1;
    let accEnd = 1;
    let sectionChunkCount = 0;

    const emitChunk = () => {
      const trimmed = accText.trim();
      if (trimmed.length < 24 && sections.length > 1) {
        accText = '';
        return;
      }
      if (!trimmed) return;
      ord++;
      sectionChunkCount++;
      const chunkUid = ord === 1 && sections.length === 1 ? normRel : `${normRel}#chunk-${ord}`;
      const guardMeta = inspectAndGuardLegacyFragment(trimmed, tier, normRel);
      let shouldEmbed = 0;
      if (partition === 'hot') {
        shouldEmbed = 1;
      } else if (
        ord === 1 ||
        (sectionChunkCount === 1 && sec.level <= 3 && embeddedSectionsInDoc < maxLibraryEmbeddedSectionsPerBook)
      ) {
        shouldEmbed = 1;
        embeddedSectionsInDoc++;
      }
      const embedInput =
        partition === 'hot'
          ? `${sec.headingPath}\n\n${trimmed}`
          : `${sec.headingPath}\n${extractFirstProsePreview(trimmed, 120)}`;
      const cSha = sha256Lf(`${partition}::${sec.headingPath}\n${embedInput}\n${trimmed}`);

      chunks.push({
        ord,
        chunkUid,
        title: `${docTitle} › ${sec.leafHeading}${sectionChunkCount > 1 ? ` (${sectionChunkCount})` : ''}`,
        headingPath: sec.headingPath,
        text: trimmed,
        embedInput,
        shouldEmbed,
        chunkSha256: cSha,
        startLine: accStart,
        endLine: accEnd,
        tokenEst: Math.max(1, Math.ceil(trimmed.length / 4)),
        legacyGuard: guardMeta.legacySyntaxGuard ? 1 : 0
      });
      accText = '';
    };

    for (const blk of expandedBlocks) {
      if (!accText) {
        accText = blk.text;
        accStart = blk.startLine;
        accEnd = blk.endLine;
      } else if (accText.length + blk.text.length + 2 <= maxChars) {
        accText = `${accText}\n\n${blk.text}`;
        accEnd = blk.endLine;
      } else {
        emitChunk();
        accText = blk.text;
        accStart = blk.startLine;
        accEnd = blk.endLine;
      }
    }
    if (accText) emitChunk();
  }

  return { docTitle, chunks };
}

/**
 * Synchronizes embeddings for all chunks with `should_embed = 1` that do not yet have a `chunks_vec` entry,
 * reading from `emb_cache` first ($0.00 rebuilds) and batching cache misses via `embedTextsWithVertex`.
 */
export async function syncDatabaseEmbeddings(db, options = {}) {
  const model = String(options.model || DEFAULT_EMBEDDING_MODEL);
  const dim = Number(options.dim || DEFAULT_EMBEDDING_DIM);
  const stageCapUsd = Number.isFinite(options.stageCapUsd) ? Number(options.stageCapUsd) : 0.6;
  const allowNetwork = options.allowNetwork !== false && process.env.FACTORY_ALLOW_NETWORK !== '0';

  const missingRows = db
    .prepare(`
      SELECT c.chunk_id, c.chunk_sha256, c.heading_path, c.embed_input, c.text, d.domain
      FROM chunks c
      JOIN docs d ON d.doc_id = c.doc_id
      LEFT JOIN chunks_vec v ON v.chunk_id = c.chunk_id
      WHERE c.should_embed = 1
        AND v.chunk_id IS NULL
      ORDER BY c.chunk_id ASC
    `)
    .all();

  if (missingRows.length === 0) {
    return {
      missingBefore: 0,
      restoredFromCache: 0,
      embeddedViaVertex: 0,
      totalTokens: 0,
      billedCostUsd: 0
    };
  }

  const getCacheStmt = db.prepare(
    'SELECT emb FROM emb_cache WHERE chunk_sha256 = ? AND model = ? AND dim = ?'
  );
  const upsertCacheStmt = db.prepare(
    'INSERT OR REPLACE INTO emb_cache(chunk_sha256, model, dim, emb, created_at) VALUES (?, ?, ?, ?, ?)'
  );
  const insertVecStmt = db.prepare(
    'INSERT OR REPLACE INTO chunks_vec(chunk_id, domain, emb) VALUES (CAST(? AS INTEGER), ?, vec_int8(?))'
  );

  let restoredFromCache = 0;
  const uncachedBySha = new Map();

  db.exec('BEGIN IMMEDIATE');
  try {
    for (const row of missingRows) {
      const cached = getCacheStmt.get(row.chunk_sha256, model, dim);
      if (cached && cached.emb) {
        insertVecStmt.run(row.chunk_id, row.domain, cached.emb);
        restoredFromCache++;
      } else {
        let group = uncachedBySha.get(row.chunk_sha256);
        if (!group) {
          group = {
            chunkSha256: row.chunk_sha256,
            title: String(row.heading_path || '').slice(0, 220),
            content: String(row.embed_input || `${row.heading_path}\n\n${row.text}`).slice(0, 3200),
            targets: []
          };
          uncachedBySha.set(row.chunk_sha256, group);
        }
        group.targets.push({ chunkId: row.chunk_id, domain: row.domain });
      }
    }
    db.exec('COMMIT');
  } catch (err) {
    try { db.exec('ROLLBACK'); } catch {}
    throw err;
  }

  if (uncachedBySha.size === 0 || !allowNetwork) {
    return {
      missingBefore: missingRows.length,
      restoredFromCache,
      embeddedViaVertex: 0,
      offlineSkipped: !allowNetwork ? uncachedBySha.size : 0,
      totalTokens: 0,
      billedCostUsd: 0
    };
  }

  const groups = [...uncachedBySha.values()];
  const windowSize = 256; // Commit to SQLite every 256 unique chunks so emb_cache is crash-safe
  let embeddedViaVertex = 0;
  let totalTokens = 0;
  let billedCostUsd = 0;

  for (let offset = 0; offset < groups.length; offset += windowSize) {
    const slice = groups.slice(offset, offset + windowSize);
    const embedRes = await embedTextsWithVertex(
      slice.map((g) => ({ title: g.title, content: g.content })),
      {
        model,
        outputDimensionality: dim,
        taskType: 'RETRIEVAL_DOCUMENT',
        stageCapUsd,
        allowNetwork,
        batchSize: 48,
        concurrency: 4,
        operation: options.operation || 'rag_v6_doc_embed',
        accessToken: options.accessToken,
        fetchImpl: options.fetchImpl,
        recordSpend: options.recordSpend
      }
    );

    if (!embedRes.ok || embedRes.embeddings.length !== slice.length) {
      break;
    }

    totalTokens += Number(embedRes.totalTokens || 0);
    billedCostUsd = Number((billedCostUsd + Number(embedRes.billedCostUsd || 0)).toFixed(8));

    const nowIso = new Date().toISOString();
    db.exec('BEGIN IMMEDIATE');
    try {
      for (let k = 0; k < slice.length; k++) {
        const g = slice[k];
        const bytes = embedRes.embeddings[k].int8Bytes;
        upsertCacheStmt.run(g.chunkSha256, model, dim, bytes, nowIso);
        for (const t of g.targets) {
          insertVecStmt.run(t.chunkId, t.domain, bytes);
          embeddedViaVertex++;
        }
      }
      db.exec('COMMIT');
    } catch (err) {
      try { db.exec('ROLLBACK'); } catch {}
      throw err;
    }
  }

  return {
    missingBefore: missingRows.length,
    restoredFromCache,
    embeddedViaVertex,
    totalTokens,
    billedCostUsd
  };
}

/**
 * Incrementally synchronizes `rag_hot.sqlite` and/or `rag_library.sqlite` in place
 * (`BEGIN IMMEDIATE ... COMMIT` per partition, zero file deletion, zero EBUSY).
 */
export async function syncRagStore(options = {}) {
  const t0 = performance.now();
  const rootDir = options.rootDir ? path.resolve(options.rootDir) : ROOT;
  const hotDbPath = options.hotDbPath ? path.resolve(options.hotDbPath) : RAG_HOT_DB_PATH;
  const libraryDbPath = options.libraryDbPath ? path.resolve(options.libraryDbPath) : RAG_LIBRARY_DB_PATH;
  const targetScope = String(options.scope || 'all').toLowerCase();
  const shouldEmbed = options.embed !== false;
  const allowNetwork = options.allowNetwork !== false && process.env.FACTORY_ALLOW_NETWORK !== '0';
  const stageCapUsd = Number.isFinite(options.stageCapUsd) ? Number(options.stageCapUsd) : 0.6;

  const allFiles = Array.isArray(options.filePaths)
    ? options.filePaths.map((p) => (path.isAbsolute(p) ? p : path.resolve(rootDir, p))).filter((p) => fs.existsSync(p))
    : discoverAllRagCorpusFiles(rootDir);
  const isPartialFileSync = Array.isArray(options.filePaths);

  const byPartition = { hot: [], library: [] };
  for (const absPath of allFiles) {
    const relPath = path.relative(rootDir, absPath).replace(/\\/g, '/');
    const st = fs.statSync(absPath);
    const { partition, category } = classifyDocumentPartitionAndCategory(relPath, st.size);
    byPartition[partition].push({ absPath, relPath, sizeBytes: st.size, partition, category });
  }

  const syncPartition = async (partName, dbPath, entries) => {
    const db = openRagDatabase(dbPath);
    const existingRows = db
      .prepare('SELECT doc_id, rel_path, sha256, domain, tier, authority FROM docs')
      .all();
    const existingByRel = new Map(existingRows.map((r) => [r.rel_path, r]));
    const seenPaths = new Set();

    let skippedDocs = 0;
    let upsertedDocs = 0;
    let deletedDocs = 0;
    let insertedChunks = 0;

    const selectDocChunkIds = db.prepare('SELECT chunk_id FROM chunks WHERE doc_id = ?');
    const deleteVecByChunk = db.prepare('DELETE FROM chunks_vec WHERE chunk_id = CAST(? AS INTEGER)');
    const deleteChunksByDoc = db.prepare('DELETE FROM chunks WHERE doc_id = ?');
    const deleteDocStmt = db.prepare('DELETE FROM docs WHERE doc_id = ?');
    const upsertDocStmt = db.prepare(`
      INSERT INTO docs(rel_path, title, partition, category, domain, tier, authority, epistemic_role, sha256, size_bytes, chunk_count, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(rel_path) DO UPDATE SET
        title = excluded.title,
        partition = excluded.partition,
        category = excluded.category,
        domain = excluded.domain,
        tier = excluded.tier,
        authority = excluded.authority,
        epistemic_role = excluded.epistemic_role,
        sha256 = excluded.sha256,
        size_bytes = excluded.size_bytes,
        chunk_count = excluded.chunk_count,
        updated_at = excluded.updated_at
      RETURNING doc_id
    `);
    const insertChunkStmt = db.prepare(`
      INSERT INTO chunks(doc_id, chunk_uid, ord, heading_path, text, embed_input, should_embed, chunk_sha256, start_line, end_line, token_est, legacy_guard)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const toUpdate = [];
    for (const item of entries) {
      seenPaths.add(item.relPath);
      const rawText = fs.readFileSync(item.absPath, 'utf8');
      const fileSha = sha256Lf(rawText);
      const domain = classifyKnowledgeDocumentDomain(item.relPath);
      const tierMeta = classifyEpistemicTier(item.relPath, rawText, { useProvidedRawTextOnly: true });
      const prev = existingByRel.get(item.relPath);
      if (
        prev &&
        prev.sha256 === fileSha &&
        prev.domain === domain &&
        prev.tier === tierMeta.epistemicTier &&
        Math.abs(Number(prev.authority) - Number(tierMeta.authorityBoost)) < 1e-6 &&
        !options.forceRechunk
      ) {
        skippedDocs++;
        continue;
      }
      toUpdate.push({
        ...item,
        rawText,
        fileSha,
        domain,
        tierMeta,
        prevDocId: prev?.doc_id || null
      });
    }

    const staleDocs = isPartialFileSync
      ? []
      : existingRows.filter((r) => !seenPaths.has(r.rel_path));

    if (toUpdate.length > 0 || staleDocs.length > 0) {
      const nowIso = new Date().toISOString();
      db.exec('BEGIN IMMEDIATE');
      try {
        for (const stale of staleDocs) {
          const oldChunkIds = selectDocChunkIds.all(stale.doc_id);
          for (const c of oldChunkIds) deleteVecByChunk.run(c.chunk_id);
          deleteChunksByDoc.run(stale.doc_id);
          deleteDocStmt.run(stale.doc_id);
          deletedDocs++;
        }

        for (const doc of toUpdate) {
          const { docTitle, chunks } = chunkMarkdownDocument({
            relPath: doc.relPath,
            rawText: doc.rawText,
            partition: partName,
            tier: doc.tierMeta.epistemicTier
          });

          if (doc.prevDocId) {
            const oldChunkIds = selectDocChunkIds.all(doc.prevDocId);
            for (const c of oldChunkIds) deleteVecByChunk.run(c.chunk_id);
            deleteChunksByDoc.run(doc.prevDocId);
          }

          const row = upsertDocStmt.get(
            doc.relPath,
            docTitle,
            partName,
            doc.category,
            doc.domain,
            doc.tierMeta.epistemicTier,
            doc.tierMeta.authorityBoost,
            doc.tierMeta.epistemicRole || '',
            doc.fileSha,
            doc.sizeBytes,
            chunks.length,
            nowIso
          );
          const docId = row.doc_id;
          for (const ch of chunks) {
            insertChunkStmt.run(
              docId,
              ch.chunkUid,
              ch.ord,
              ch.headingPath,
              ch.text,
              partName === 'library' ? '' : ch.embedInput,
              ch.shouldEmbed,
              ch.chunkSha256,
              ch.startLine,
              ch.endLine,
              ch.tokenEst,
              ch.legacyGuard
            );
            insertedChunks++;
          }
          upsertedDocs++;
        }

        db.exec("INSERT INTO chunks_fts(chunks_fts) VALUES('optimize');");
        if (partName !== 'library') {
          db.exec("INSERT INTO chunks_trigram(chunks_trigram) VALUES('optimize');");
        }
        db.exec('COMMIT');
      } catch (err) {
        try { db.exec('ROLLBACK'); } catch {}
        throw err;
      }
    }

    let embedStats = {
      missingBefore: 0,
      restoredFromCache: 0,
      embeddedViaVertex: 0,
      totalTokens: 0,
      billedCostUsd: 0
    };
    if (shouldEmbed) {
      embedStats = await syncDatabaseEmbeddings(db, {
        stageCapUsd,
        allowNetwork,
        operation: `rag_v6_${partName}_embed`,
        accessToken: options.accessToken,
        fetchImpl: options.fetchImpl,
        recordSpend: options.recordSpend
      });
    }

    const totals = db
      .prepare(`
        SELECT
          (SELECT COUNT(*) FROM docs) AS docsCount,
          (SELECT COUNT(*) FROM chunks) AS chunksCount,
          (SELECT COUNT(*) FROM chunks_vec) AS vecCount,
          (SELECT COUNT(*) FROM emb_cache) AS cacheCount
      `)
      .get();

    return {
      partition: partName,
      dbPath,
      skippedDocs,
      upsertedDocs,
      deletedDocs,
      insertedChunks,
      ...totals,
      embedStats
    };
  };

  const summary = {
    ok: true,
    hot: null,
    library: null,
    graphs: null,
    totalBilledUsd: 0,
    elapsedMs: 0
  };

  if (targetScope === 'all' || targetScope === 'hot') {
    summary.hot = await syncPartition('hot', hotDbPath, byPartition.hot);
    summary.totalBilledUsd = Number(
      (summary.totalBilledUsd + Number(summary.hot.embedStats?.billedCostUsd || 0)).toFixed(8)
    );
    if (!options.skipGraphs && !isPartialFileSync && rootDir === ROOT) {
      const g = buildAndPersistAllGraphs({ dbPath: hotDbPath });
      summary.graphs = {
        codeFiles: g?.codeGraph?.nodes?.length || 0,
        codeEdges: g?.codeGraph?.edges?.length || 0,
        wikiNodes: g?.wikiGraph?.nodes?.length || 0,
        wikiEdges: g?.wikiGraph?.edges?.length || 0
      };
    }
  }

  if (targetScope === 'all' || targetScope === 'library') {
    summary.library = await syncPartition('library', libraryDbPath, byPartition.library);
    summary.totalBilledUsd = Number(
      (summary.totalBilledUsd + Number(summary.library.embedStats?.billedCostUsd || 0)).toFixed(8)
    );
  }

  summary.elapsedMs = Math.round(performance.now() - t0);
  return summary;
}

function extractQueryTerms(rawQuery = '') {
  const normalized = String(rawQuery || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  const rawTokens = normalized.split(/[^a-z0-9]+/).filter(Boolean);
  const ftsTerms = [];
  const trigramTerms = [];
  const seen = new Set();

  for (const clean of rawTokens) {
    if (clean.length < 2 || QUERY_STOPWORDS.has(clean) || seen.has(clean)) continue;
    seen.add(clean);
    ftsTerms.push(clean);
    if (clean.length >= 5) {
      trigramTerms.push(clean);
    }
  }

  // Sort more specific (longer / alphanumeric technical) tokens first, cap at 8 for sub-5ms FTS5
  ftsTerms.sort((a, b) => b.length - a.length);
  trigramTerms.sort((a, b) => b.length - a.length);

  return {
    ftsTerms: ftsTerms.slice(0, 8),
    trigramTerms: trigramTerms.slice(0, 4)
  };
}

async function resolveQueryEmbeddingVector(db, query, options = {}) {
  const cleanQ = String(query || '').trim();
  if (!cleanQ) return { vecBytes: null, mode: 'lexical_offline', billedCostUsd: 0 };

  const model = String(options.model || DEFAULT_EMBEDDING_MODEL);
  const dim = Number(options.dim || DEFAULT_EMBEDDING_DIM);
  const qSha = sha256Lf(`RETRIEVAL_QUERY::${model}::${dim}::${cleanQ}`);

  if (queryVecMemCache.has(qSha)) {
    return { vecBytes: queryVecMemCache.get(qSha), mode: 'hybrid_vec_fts5_cached', billedCostUsd: 0 };
  }

  const cachedRow = db
    .prepare('SELECT emb FROM query_emb_cache WHERE query_sha256 = ? AND model = ? AND dim = ?')
    .get(qSha, model, dim);
  if (cachedRow && cachedRow.emb) {
    if (queryVecMemCache.size >= MAX_MEM_QUERY_VEC_CACHE) {
      queryVecMemCache.delete(queryVecMemCache.keys().next().value);
    }
    queryVecMemCache.set(qSha, cachedRow.emb);
    return { vecBytes: cachedRow.emb, mode: 'hybrid_vec_fts5_cached', billedCostUsd: 0 };
  }

  const allowNetwork = options.allowNetwork !== false && process.env.FACTORY_ALLOW_NETWORK !== '0';
  if (!allowNetwork) {
    return { vecBytes: null, mode: 'lexical_offline', billedCostUsd: 0 };
  }

  const embedRes = await embedTextsWithVertex([cleanQ], {
    model,
    outputDimensionality: dim,
    taskType: 'RETRIEVAL_QUERY',
    allowNetwork: true,
    operation: 'rag_v6_query_embed',
    fetchImpl: options.fetchImpl,
    recordSpend: options.recordSpend
  });

  if (!embedRes.ok || !embedRes.embeddings?.[0]?.int8Bytes) {
    return { vecBytes: null, mode: 'lexical_offline', billedCostUsd: 0 };
  }

  const bytes = embedRes.embeddings[0].int8Bytes;
  try {
    db.prepare(
      'INSERT OR REPLACE INTO query_emb_cache(query_sha256, model, dim, emb, created_at) VALUES (?, ?, ?, ?, ?)'
    ).run(qSha, model, dim, bytes, new Date().toISOString());
  } catch {}

  if (queryVecMemCache.size >= MAX_MEM_QUERY_VEC_CACHE) {
    queryVecMemCache.delete(queryVecMemCache.keys().next().value);
  }
  queryVecMemCache.set(qSha, bytes);

  return {
    vecBytes: bytes,
    mode: 'hybrid_vec_fts5',
    billedCostUsd: Number(embedRes.billedCostUsd || 0)
  };
}

function querySinglePartitionSql(
  db,
  { ftsTerms, trigramTerms, queryVecBytes, allowedDomains, candidatePool = 30, perDocCap = 2, winnerCap = 12 }
) {
  if (!Array.isArray(allowedDomains) || allowedDomains.length === 0) {
    return [];
  }
  const domPlaceholders = allowedDomains.map(() => '?').join(', ');
  const lexicalMap = new Map();

  // Leg 1: Primary FTS5 (`unicode61 remove_diacritics 2`) with exact `bm25(chunks_fts, 1.0, 4.0)`
  // When dense `queryVecBytes` is active, require high-precision multi-term `AND` so noisy 1-word matches
  // never drown out cross-lingual `vec0` Rank #1 hits (and FTS5 list intersection completes in <1.5ms).
  // When offline (`!queryVecBytes`), fall back to `OR` + `trigram` for full lexical recall.
  if (ftsTerms.length > 0) {
    const queryFts = (expr, innerLimit) =>
      getCachedStatement(
        db,
        `
          WITH top_fts AS (
            SELECT rowid AS chunk_id, bm25(chunks_fts, 1.0, 4.0) AS score
            FROM chunks_fts
            WHERE chunks_fts MATCH ?
            ORDER BY score ASC
            LIMIT ?
          )
          SELECT t.chunk_id, t.score
          FROM top_fts t
          JOIN chunks c ON c.chunk_id = t.chunk_id
          JOIN docs d ON d.doc_id = c.doc_id
          WHERE d.domain IN (${domPlaceholders})
          ORDER BY t.score ASC
          LIMIT ?
        `
      ).all(expr, innerLimit, ...allowedDomains, candidatePool);

    try {
      let ftsRows = [];
      if (ftsTerms.length >= 2) {
        const andTermCount = queryVecBytes ? Math.min(3, ftsTerms.length) : Math.min(2, ftsTerms.length);
        const andExpr = ftsTerms.slice(0, andTermCount).map((t) => `"${t}"`).join(' AND ');
        ftsRows = queryFts(andExpr, 60);
      } else {
        ftsRows = queryFts(`"${ftsTerms[0]}"`, 60);
      }
      if (!queryVecBytes && ftsRows.length < 8 && ftsTerms.length >= 2) {
        const orExpr = ftsTerms.slice(0, 5).map((t) => `"${t}"`).join(' OR ');
        const orRows = queryFts(orExpr, 80);
        const seenIds = new Set(ftsRows.map((r) => r.chunk_id));
        for (const r of orRows) {
          if (!seenIds.has(r.chunk_id)) {
            ftsRows.push(r);
            seenIds.add(r.chunk_id);
          }
          if (ftsRows.length >= candidatePool) break;
        }
      }

      ftsRows.forEach((r, idx) => {
        lexicalMap.set(r.chunk_id, {
          chunkId: r.chunk_id,
          ftsRank: idx + 1,
          triRank: null,
          lexScore: 1 / (RRF_K + idx + 1)
        });
      });
    } catch {}
  }

  // Leg 2: Secondary Morphological FTS5 (`trigram remove_diacritics 1`) on partitions with trigram index
  let hasTrigramTable = dbHasTrigramCache.get(db);
  if (hasTrigramTable === undefined) {
    hasTrigramTable = Boolean(
      db.prepare("SELECT 1 FROM sqlite_master WHERE type='table' AND name='chunks_trigram'").get()
    );
    dbHasTrigramCache.set(db, hasTrigramTable);
  }
  if (hasTrigramTable && trigramTerms.length > 0 && lexicalMap.size === 0 && !queryVecBytes) {
    const runTrigram = (expr) =>
      db
        .prepare(`
          WITH top_tri AS (
            SELECT rowid AS chunk_id, bm25(chunks_trigram, 1.0, 4.0) AS score
            FROM chunks_trigram
            WHERE chunks_trigram MATCH ?
            ORDER BY score ASC
            LIMIT 60
          )
          SELECT t.chunk_id, t.score
          FROM top_tri t
          JOIN chunks c ON c.chunk_id = t.chunk_id
          JOIN docs d ON d.doc_id = c.doc_id
          WHERE d.domain IN (${domPlaceholders})
          ORDER BY t.score ASC
          LIMIT ?
        `)
        .all(expr, ...allowedDomains, Math.min(16, candidatePool));

    try {
      let triRows = [];
      if (trigramTerms.length >= 2) {
        const andExpr = trigramTerms.slice(0, 2).map((t) => `"${t.slice(0, 6)}"`).join(' AND ');
        triRows = runTrigram(andExpr);
      }
      if (triRows.length < 3) {
        const singleExpr = `"${trigramTerms[0].slice(0, 6)}"`;
        triRows = runTrigram(singleExpr);
      }
      triRows.forEach((r, idx) => {
        const prev = lexicalMap.get(r.chunk_id);
        if (prev) {
          prev.triRank = idx + 1;
          prev.lexScore += 0.35 / (RRF_K + idx + 1);
        } else {
          lexicalMap.set(r.chunk_id, {
            chunkId: r.chunk_id,
            ftsRank: null,
            triRank: idx + 1,
            lexScore: 0.75 / (RRF_K + idx + 1)
          });
        }
      });
    } catch {}
  }

  // Build unified Lexical rank list so Lexical (1 channel) and Semantic Vec0 (1 channel) fuse 1:1 in RRF(k=60)
  const sortedLex = [...lexicalMap.values()].sort((a, b) => b.lexScore - a.lexScore);
  const candidateRankMap = new Map();
  sortedLex.forEach((item, idx) => {
    candidateRankMap.set(item.chunkId, {
      chunkId: item.chunkId,
      lexRank: idx + 1,
      ftsRank: item.ftsRank,
      triRank: item.triRank,
      vecRank: null,
      vecDistance: null
    });
  });

  // Leg 3: Dense `sqlite-vec` KNN (`vec0` `int8[768]`) in pure C SIMD, then SQL `d.domain IN (...)` filter
  // Fast path: raw KNN (14ms vs 28ms string scan inside vec0) filtered post-topK via indexed docs.domain
  if (queryVecBytes) {
    try {
      const vecK = Math.min(64, candidatePool + (allowedDomains.length <= 4 ? 24 : 10));
      const vecRows = getCachedStatement(
        db,
        `
          WITH raw_knn AS (
            SELECT chunk_id, distance
            FROM chunks_vec
            WHERE emb MATCH vec_int8(?)
              AND k = ?
          )
          SELECT r.chunk_id, r.distance
          FROM raw_knn r
          JOIN chunks c ON c.chunk_id = r.chunk_id
          JOIN docs d ON d.doc_id = c.doc_id
          WHERE d.domain IN (${domPlaceholders})
          LIMIT ?
        `
      ).all(queryVecBytes, vecK, ...allowedDomains, candidatePool);

      vecRows.forEach((r, idx) => {
        const prev = candidateRankMap.get(r.chunk_id);
        if (prev) {
          prev.vecRank = idx + 1;
          prev.vecDistance = Number(r.distance);
        } else {
          candidateRankMap.set(r.chunk_id, {
            chunkId: r.chunk_id,
            lexRank: null,
            ftsRank: null,
            triRank: null,
            vecRank: idx + 1,
            vecDistance: Number(r.distance)
          });
        }
      });
    } catch {}
  }

  if (candidateRankMap.size === 0) return [];

  // Stage A: Metadata-only RRF + Authority scoring (zero overflow `c.text` page reads!)
  const allChunkIds = [...candidateRankMap.keys()];
  const idPlaceholders = allChunkIds.map(() => '?').join(', ');
  const metaRows = getCachedStatement(
    db,
    `
      SELECT
        c.chunk_id, c.doc_id,
        d.rel_path, d.domain, d.authority
      FROM chunks c
      JOIN docs d ON d.doc_id = c.doc_id
      WHERE c.chunk_id IN (${idPlaceholders})
        AND d.domain IN (${domPlaceholders})
    `
  ).all(...allChunkIds, ...allowedDomains);

  const metaScored = [];
  for (const m of metaRows) {
    const ranks = candidateRankMap.get(m.chunk_id);
    if (!ranks) continue;
    let rrfRaw = 0;
    if (ranks.lexRank !== null) rrfRaw += 1 / (RRF_K + ranks.lexRank);
    if (ranks.vecRank !== null) rrfRaw += 1 / (RRF_K + ranks.vecRank);
    const authority = Number(m.authority || 1.0);
    metaScored.push({
      chunkId: m.chunk_id,
      relPath: m.rel_path,
      authority,
      rrfRaw,
      fusedScore: rrfRaw * authority,
      ranks
    });
  }
  metaScored.sort((a, b) => b.fusedScore - a.fusedScore);

  const docUsed = new Map();
  const winnerMeta = [];
  for (const item of metaScored) {
    const u = docUsed.get(item.relPath) || 0;
    if (u >= perDocCap) continue;
    docUsed.set(item.relPath, u + 1);
    winnerMeta.push(item);
    if (winnerMeta.length >= 16) break;
  }
  if (winnerMeta.length === 0) return [];

  // Stage B: Fetch `c.text` ONLY for the top winning chunks needed (`maxResultCap`)
  const winLimit = Math.min(16, Math.max(1, Number(winnerCap || 12)));
  const finalWinners = winnerMeta.slice(0, winLimit);
  const winIds = finalWinners.map((w) => w.chunkId);
  const winPh = winIds.map(() => '?').join(', ');
  const fullRows = getCachedStatement(
    db,
    `
      SELECT
        c.chunk_id, c.chunk_uid, c.ord, c.heading_path, c.text, c.start_line, c.end_line, c.token_est, c.legacy_guard,
        d.rel_path, d.title AS doc_title, d.partition, d.category, d.domain, d.tier, d.authority, d.epistemic_role
      FROM chunks c
      JOIN docs d ON d.doc_id = c.doc_id
      WHERE c.chunk_id IN (${winPh})
    `
  ).all(...winIds);
  const fullById = new Map(fullRows.map((r) => [r.chunk_id, r]));

  const scored = [];
  for (const w of finalWinners) {
    const row = fullById.get(w.chunkId);
    if (!row) continue;
    const { ranks, rrfRaw, fusedScore, authority } = w;
    scored.push({
      chunkId: row.chunk_id,
      id: row.chunk_uid,
      source: `local://${row.rel_path}`,
      relPath: row.rel_path,
      title: row.heading_path || row.doc_title,
      docTitle: row.doc_title,
      section: row.heading_path,
      partition: row.partition,
      category: row.category,
      domain: row.domain,
      epistemicTier: row.tier,
      authorityBoost: authority,
      epistemicRole: row.epistemic_role,
      startLine: row.start_line,
      endLine: row.end_line,
      tokenEst: row.token_est,
      text: row.text,
      snippet: row.text.slice(0, 450),
      rrfRaw: Number(rrfRaw.toFixed(6)),
      rrfScore: Number(fusedScore.toFixed(6)),
      fusedScore: Number(fusedScore.toFixed(6)),
      lexRank: ranks.lexRank,
      ftsRank: ranks.ftsRank,
      triRank: ranks.triRank,
      vecRank: ranks.vecRank,
      vecDistance: ranks.vecDistance !== null ? Number(ranks.vecDistance.toFixed(4)) : null
    });
  }

  return scored;
}

/**
 * Executes Hybrid SQL Search (`FTS5 unicode61` + `FTS5 trigram` + `vec0 KNN` + `RRF(k=60)` × `docs.authority`)
 * across `scope: 'hot' | 'library' | 'all'` with strict SQL pre-ranking `docs.domain IN (...)` filtering.
 */
export async function searchRagStore(query, options = {}) {
  const t0 = performance.now();
  const cleanQuery = String(query || '').trim();
  const limit = Math.max(1, Math.min(25, Number(options.limit || 5)));
  const scope = ['hot', 'library', 'all'].includes(String(options.scope || '').toLowerCase())
    ? String(options.scope).toLowerCase()
    : 'hot';
  const maxPerDoc = Math.max(1, Number(options.maxPerDoc ?? (limit >= 6 ? 1 : 2)));

  const domainProfile = resolveDomainProfile({
    slug: options.projectSlug || options.project || '',
    domainProfile: options.domainProfile || ''
  });
  const allowedDomains = Array.isArray(options.allowedDomains) && options.allowedDomains.length > 0
    ? options.allowedDomains
    : [...domainProfile.capabilities.rag.allowedDomains];

  const hotDbPath = options.hotDbPath ? path.resolve(options.hotDbPath) : RAG_HOT_DB_PATH;
  const libraryDbPath = options.libraryDbPath ? path.resolve(options.libraryDbPath) : RAG_LIBRARY_DB_PATH;

  const hotDb = openRagDatabase(hotDbPath);
  if (!hotDbReadySet.has(hotDbPath)) {
    const hotDocCount = getCachedStatement(hotDb, 'SELECT COUNT(*) AS c FROM docs').get().c;
    if (hotDocCount === 0 && !options.skipAutoBootstrap && hotDbPath === RAG_HOT_DB_PATH) {
      await syncRagStore({ scope: 'hot', embed: false, allowNetwork: false });
    }
    hotDbReadySet.add(hotDbPath);
  }

  const { ftsTerms, trigramTerms } = extractQueryTerms(cleanQuery);
  const queryVecInfo = await resolveQueryEmbeddingVector(hotDb, cleanQuery, {
    allowNetwork: options.allowNetwork,
    fetchImpl: options.fetchImpl,
    recordSpend: options.recordSpend
  });

  const candidatePool = Math.max(18, limit * 2 + 4);
  const perPartitionWinCap = scope === 'all' ? Math.min(12, Math.max(6, Math.ceil(limit * 0.8) + 2)) : Math.min(16, limit + 2);
  let mergedCandidates = [];

  if (scope === 'hot' || scope === 'all') {
    mergedCandidates.push(
      ...querySinglePartitionSql(hotDb, {
        ftsTerms,
        trigramTerms,
        queryVecBytes: queryVecInfo.vecBytes,
        allowedDomains,
        candidatePool,
        perDocCap: maxPerDoc,
        winnerCap: perPartitionWinCap
      })
    );
  }

  if (scope === 'library' || scope === 'all') {
    if (fs.existsSync(libraryDbPath) || options.libraryDbPath) {
      const libDb = openRagDatabase(libraryDbPath);
      mergedCandidates.push(
        ...querySinglePartitionSql(libDb, {
          ftsTerms,
          trigramTerms,
          queryVecBytes: queryVecInfo.vecBytes,
          allowedDomains,
          candidatePool,
          perDocCap: maxPerDoc,
          winnerCap: perPartitionWinCap
        })
      );
    }
  }

  mergedCandidates.sort((a, b) => b.fusedScore - a.fusedScore);

  const perDocCounts = new Map();
  const finalHits = [];

  for (const cand of mergedCandidates) {
    if (!domainProfile.isDomainAllowedInRag(cand.relPath) && !options.allowedDomains) {
      continue;
    }
    const used = perDocCounts.get(cand.relPath) || 0;
    if (used >= maxPerDoc) continue;
    perDocCounts.set(cand.relPath, used + 1);

    const guardMeta = inspectAndGuardLegacyFragment(cand.text, cand.epistemicTier, cand.relPath);
    const isClassicBook = cand.epistemicTier === 'TIER_2_TIMELESS_PRINCIPLES';
    const guardedText =
      isClassicBook && !guardMeta.guardedText.includes('[TRANSLATION_RULE:')
        ? `${TRANSLATION_RULE_WARNING}\n${guardMeta.guardedText}`
        : guardMeta.guardedText;
    const delimited = delimitRetrievedRagData(guardedText, {
      source: cand.source,
      epistemicTier: cand.epistemicTier
    });

    finalHits.push({
      ...cand,
      legacySyntaxGuard: guardMeta.legacySyntaxGuard || (isClassicBook ? 'TIER_3_LEGACY_SYNTAX_GUARD' : null),
      translationRule: guardMeta.translationRule || (isClassicBook ? TRANSLATION_RULE_WARNING : null),
      supersededReplacements: guardMeta.supersededReplacements,
      injectionBlocked: delimited.injectionBlocked,
      text: delimited.sanitizedText,
      delimitedData: delimited.delimitedText
    });

    if (finalHits.length >= limit) break;
  }

  return {
    query: cleanQuery,
    scope,
    searchMode: queryVecInfo.mode,
    domainProfile: domainProfile.id,
    allowedDomains,
    latencyMs: Number((performance.now() - t0).toFixed(2)),
    billedCostUsd: queryVecInfo.billedCostUsd,
    results: finalHits
  };
}

/**
 * Returns fast O(1) SQLite health & partition statistics (`< 5 ms`, zero Markdown scanning).
 */
export function getRagStoreStats(options = {}) {
  const hotDbPath = options.hotDbPath ? path.resolve(options.hotDbPath) : RAG_HOT_DB_PATH;
  const libraryDbPath = options.libraryDbPath ? path.resolve(options.libraryDbPath) : RAG_LIBRARY_DB_PATH;

  const inspectDb = (p) => {
    if (!fs.existsSync(p)) {
      return { exists: false, sizeMb: 0, docs: 0, chunks: 0, vectors: 0, embCache: 0 };
    }
    const db = openRagDatabase(p);
    const row = db
      .prepare(`
        SELECT
          (SELECT COUNT(*) FROM docs) AS docs,
          (SELECT COUNT(*) FROM chunks) AS chunks,
          (SELECT COUNT(*) FROM chunks_vec) AS vectors,
          (SELECT COUNT(*) FROM emb_cache) AS embCache
      `)
      .get();
    const sizeMb = Number((fs.statSync(p).size / 1048576).toFixed(2));
    return { exists: true, sizeMb, ...row };
  };

  const hot = inspectDb(hotDbPath);
  const library = inspectDb(libraryDbPath);
  let graphCounts = { codeFiles: 0, codeEdges: 0, wikiNodes: 0, wikiEdges: 0 };
  if (hot.exists) {
    try {
      const db = openRagDatabase(hotDbPath);
      graphCounts = db
        .prepare(`
          SELECT
            (SELECT COUNT(*) FROM code_nodes) AS codeFiles,
            (SELECT COUNT(*) FROM code_edges) AS codeEdges,
            (SELECT COUNT(*) FROM wiki_nodes) AS wikiNodes,
            (SELECT COUNT(*) FROM wiki_edges) AS wikiEdges
        `)
        .get();
    } catch {}
  }

  return {
    engine: 'omni-rag-v6-sqlite-vec-fts5',
    vecExtensionLoaded: true,
    hot,
    library,
    graphs: graphCounts,
    rssMb: Number((process.memoryUsage().rss / 1048576).toFixed(2))
  };
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]).toLowerCase() === path.resolve(__filename).toLowerCase()
) {
  const args = process.argv.slice(2);
  const isRebuild = args.includes('--rebuild') || args.includes('--sync');
  const noEmbed = args.includes('--no-embed');
  const scopeIdx = args.indexOf('--scope');
  const scope = scopeIdx !== -1 && args[scopeIdx + 1] ? args[scopeIdx + 1] : 'all';

  if (isRebuild) {
    const res = await syncRagStore({
      scope,
      embed: !noEmbed,
      allowNetwork: !noEmbed
    });
    console.log(JSON.stringify(res, null, 2));
  } else {
    console.log(JSON.stringify(getRagStoreStats(), null, 2));
  }
}
