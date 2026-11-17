#!/usr/bin/env node
/**
 * tools/intelligence/qdrant_rag.mjs — Scoped RAG Routing & Sanitization Facade (Omni-RAG v6)
 * ============================================================================================
 * Lightweight compatibility & routing module over `tools/intelligence/rag_store.mjs`.
 * Eliminates the legacy 7.4 MB `.agents/memory/knowledge_index.json` file and dead Qdrant
 * scroll paths while preserving `sanitizeRagPayload`, `projectScopeFilter`,
 * `classifyQueryEpistemicIntent`, `ensureLocalKnowledgeIndex`, and `hybridRrfSearch`.
 * ============================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  inspectAndSanitizePromptInjection,
  TRANSLATION_RULE_WARNING,
  LEGACY_TECH_REPLACEMENT_TABLE
} from './rag_library_sanitizer.mjs';
import { loadProjectConfig } from '../lib/project_loader.mjs';
import { searchRagStore, getRagStoreStats, openRagDatabase, RAG_HOT_DB_PATH } from './rag_store.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');
const LEGACY_LOCAL_INDEX_PATH = path.join(ROOT, '.agents', 'memory', 'knowledge_index.json');

function stripRagUnsafeControlChars(str) {
  let out = '';
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (
      c <= 0x08 ||
      c === 0x0b ||
      c === 0x0c ||
      (c >= 0x0e && c <= 0x1f) ||
      (c >= 0x7f && c <= 0x9f) ||
      (c >= 0x202a && c <= 0x202e) ||
      (c >= 0x2066 && c <= 0x2069)
    ) {
      continue;
    }
    out += str[i];
  }
  return out;
}

export function sanitizeRagPayload(value) {
  if (typeof value === 'string') {
    const cleaned = inspectAndSanitizePromptInjection(value).sanitizedText;
    return stripRagUnsafeControlChars(cleaned)
      .replace(/<\s*\/?\s*(system|instruction|prompt|tool_call|function_call)[^>]*>/gi, '[REDACTED_TAG]')
      .slice(0, 16000);
  }
  if (Array.isArray(value)) return value.map(sanitizeRagPayload);
  if (value && typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = sanitizeRagPayload(v);
    return out;
  }
  return value;
}

/**
 * Lightweight epistemic summary backed directly by SQLite `docs` table (never writes `knowledge_index.json`).
 */
export function ensureLocalKnowledgeIndex(_forceRebuild = false) {
  if (fs.existsSync(LEGACY_LOCAL_INDEX_PATH)) {
    try {
      fs.rmSync(LEGACY_LOCAL_INDEX_PATH, { force: true });
    } catch {}
  }
  const stats = getRagStoreStats();
  const tierCounts = {
    TIER_1_SOTA_2026: 0,
    TIER_2_VERIFIED_DRAFT: 0,
    TIER_2_TIMELESS_PRINCIPLES: 0,
    TIER_AGENT_SKILL: 0,
    TIER_UNTRUSTED: 0,
    TIER_3_LEGACY_SYNTAX_GUARD_CHUNKS: 0
  };
  try {
    if (stats.hot.exists) {
      const db = openRagDatabase(RAG_HOT_DB_PATH);
      const rows = db.prepare('SELECT tier, COUNT(*) AS cnt FROM docs GROUP BY tier').all();
      for (const r of rows) {
        tierCounts[r.tier] = Number(r.cnt || 0);
      }
      const guardRow = db.prepare('SELECT COUNT(*) AS cnt FROM chunks WHERE legacy_guard = 1').get();
      tierCounts.TIER_3_LEGACY_SYNTAX_GUARD_CHUNKS = Number(guardRow?.cnt || 0);
    }
  } catch {}

  return {
    schema: 'web-factory-rag-v6-sqlite-epistemic-summary',
    generatedAt: new Date().toISOString(),
    totalFiles: (stats.hot.docs || 0) + (stats.library.docs || 0),
    totalChunks: (stats.hot.chunks || 0) + (stats.library.chunks || 0),
    maxTokensPerChunk: 600,
    epistemicSummary: tierCounts,
    documentTiers: {},
    chunks: []
  };
}

export function computeDenseFeatureVector(text, dim = 128) {
  const vec = new Float32Array(dim);
  const clean = String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9áéíóúñü_.-]+/g, ' ')
    .trim();
  if (!clean) return vec;
  const tokens = clean.split(/\s+/);
  for (const tok of tokens) {
    if (tok.length < 2) continue;
    let h = 2166136261;
    for (let i = 0; i < tok.length; i++) {
      h ^= tok.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    const idx = Math.abs(h) % dim;
    vec[idx] += ((h & 1) === 0 ? 1.0 : -1.0) * (tok.length >= 5 ? 1.8 : 1.0);
  }
  let norm = 0;
  for (let i = 0; i < dim; i++) norm += vec[i] * vec[i];
  norm = Math.sqrt(norm);
  if (norm > 0) {
    for (let i = 0; i < dim; i++) vec[i] /= norm;
  }
  return vec;
}

export function cosineSimilarity(vecA, vecB) {
  let dot = 0;
  const len = Math.min(vecA.length, vecB.length);
  for (let i = 0; i < len; i++) dot += vecA[i] * vecB[i];
  return dot;
}

export function classifyQueryEpistemicIntent(query = '') {
  const qLower = String(query || '').toLowerCase();
  const conceptualRegex =
    /\b(?:diseño|design|composicion|composición|psicologia|psicología|psychology|conversion|conversión|cro|leyes\s+de\s+ux|laws\s+of\s+ux|ux|fitts|hick|fogg|nudge|cialdini|arquitectura\s+conceptual|arquitectura\s+limpia|clean\s+architecture|tipografia|tipografía|grilla|grid|copywriting|principios|libro|book|bringhurst|wathan|norman|kahneman|ariely)\b/i;
  const codeSyntaxRegex =
    /\b(?:codigo|código|code|implementar|implementacion|implementación|implementation|configuracion|configuración|config|sintaxis|syntax|astro|worker|workers|wrangler|valibot|oxc|oxlint|csp|headers|_headers|d1|sqlite|oklch|dtcg|tokens|clamp|subgrid|scroll-driven|esm|owasp|asvs|api|json-ld|speculation)\b/i;

  const isConceptual = conceptualRegex.test(qLower);
  const isCodeSyntax = codeSyntaxRegex.test(qLower);

  if (isConceptual && !isCodeSyntax) {
    return {
      mode: 'COMPLEMENTARY_PAIRING',
      description: 'Concepto/Diseño/Psicología/UX -> Pares complementarios (TIER_2_TIMELESS_PRINCIPLES + TIER_1_SOTA_2026)'
    };
  }
  return {
    mode: 'TECHNICAL_SOTA_PRIORITY',
    description: 'Código/Implementación/Configuración/Sintaxis -> TIER_1_SOTA_2026 (authorityBoost: 1.35) en Puesto #1'
  };
}

export const COMMERCIAL_WEB_ARCHETYPES = new Set([
  'landing',
  'saas',
  'saas-b2b',
  'ecommerce',
  'marketing',
  'portfolio',
  'local-business'
]);

export const WEB_PRIORITY_FOLDER_PREFIXES = [
  'knowledge/software_factory/',
  'knowledge/ui_ux_design/',
  'knowledge/motion_and_animation/',
  'knowledge/cybersecurity/',
  'knowledge/architecture_and_edge/'
];

export const QUARANTINED_OFF_DOMAIN_PATTERNS = [
  /modelling_extremal_events/i,
  /artificial_intelligence_a_modern_approach/i,
  /^knowledge\/streaming_and_overlays\//i
];

const specTextCache = new Map();

export function projectScopeFilter(query = '', options = {}) {
  const projectKey = String(options.project || 'agencia-alfa');
  let cfg = specTextCache.get(`cfg:${projectKey}`);
  if (!cfg) {
    try {
      cfg = loadProjectConfig(options.project || '');
    } catch {
      cfg = { id: 'agencia-alfa', archetype: 'saas-b2b', projectRoot: ROOT };
    }
    specTextCache.set(`cfg:${projectKey}`, cfg);
  }

  const archetype = String(options.archetype || cfg.archetype || 'saas-b2b').toLowerCase();
  const isCommercialWeb = COMMERCIAL_WEB_ARCHETYPES.has(archetype);
  const domainQuarantine = options.domainQuarantine !== undefined ? Boolean(options.domainQuarantine) : isCommercialWeb;

  const specCandidate = path.join(cfg.projectRoot || ROOT, '.specify', 'SPEC.md');
  let specText = specTextCache.get(`spec:${specCandidate}`);
  if (specText === undefined) {
    specText = '';
    try {
      if (fs.existsSync(specCandidate)) {
        specText = fs.readFileSync(specCandidate, 'utf8').toLowerCase();
      }
    } catch {}
    specTextCache.set(`spec:${specCandidate}`, specText);
  }

  const combinedIntentText = `${String(query || '').toLowerCase()} ${specText}`;
  const explicitOffDomainRequest =
    /\b(?:extremal\s+events|actuarial|seguros|reinsurance|aima|norvig|russell|streaming_and_overlays|obs\s+overlay|twitch\s+overlay|sorteo\s+stream)\b/i.test(
      combinedIntentText
    );

  return {
    projectId: cfg.id || 'agencia-alfa',
    archetype,
    isCommercialWeb,
    domainQuarantine,
    webDomainMultiplier: isCommercialWeb ? 1.4 : 1.0,
    explicitOffDomainRequest,
    evaluateChunk(fileRelPath = '') {
      const norm = String(fileRelPath || '').replace(/\\/g, '/');
      const isOffDomain = QUARANTINED_OFF_DOMAIN_PATTERNS.some((rx) => rx.test(norm));
      if (isOffDomain && domainQuarantine && !explicitOffDomainRequest) {
        return { quarantined: true, multiplier: 0, reason: 'SILENT_DOMAIN_QUARANTINE' };
      }
      if (!isCommercialWeb) {
        return { quarantined: false, multiplier: 1.0, reason: 'NON_WEB_DEFAULT' };
      }
      const isPriorityFolder = WEB_PRIORITY_FOLDER_PREFIXES.some((prefix) => norm.startsWith(prefix));
      const isWebTreatiseInArchBooks =
        norm.startsWith('knowledge/architecture_and_books/') && !isOffDomain;
      if (isPriorityFolder || isWebTreatiseInArchBooks) {
        return { quarantined: false, multiplier: 1.4, reason: 'COMMERCIAL_WEB_1.4X_BOOST' };
      }
      return { quarantined: false, multiplier: 1.0, reason: 'STANDARD_SCOPE' };
    }
  };
}

export async function hybridRrfSearch(query, limit = 5, options = {}) {
  const epistemicIntent = classifyQueryEpistemicIntent(query);
  const scopeFilter = projectScopeFilter(query, options);
  const ragRes = await searchRagStore(query, {
    limit,
    scope: options.scope || 'hot',
    projectSlug: options.project || '',
    domainProfile: options.archetype || '',
    allowNetwork: options.allowNetwork !== false
  });

  const results = ragRes.results.map((r) => ({
    citation: `${r.relPath}#L${r.startLine}-L${r.endLine}`,
    file: r.relPath,
    startLine: r.startLine,
    endLine: r.endLine,
    header: r.title,
    epistemicTier: r.epistemicTier,
    authorityBoost: r.authorityBoost,
    domainMultiplier: 1.0,
    epistemicRole: r.epistemicRole,
    legacySyntaxGuard: r.legacySyntaxGuard,
    translationRule: r.translationRule,
    supersededReplacements: r.supersededReplacements,
    rrfScore: r.rrfScore,
    tokens: r.tokenEst,
    excerpt: r.text.slice(0, 2200)
  }));

  return {
    source: `omni-rag-v6-${ragRes.searchMode}`,
    latencyMs: ragRes.latencyMs,
    maxTokensPerChunk: 600,
    projectScopeFilter: {
      projectId: scopeFilter.projectId,
      archetype: scopeFilter.archetype,
      domainQuarantine: scopeFilter.domainQuarantine,
      webDomainMultiplier: scopeFilter.webDomainMultiplier,
      quarantinedChunksSkipped: 0
    },
    epistemicIntent,
    activeTranslationRule: TRANSLATION_RULE_WARNING,
    technologyReplacementTable: LEGACY_TECH_REPLACEMENT_TABLE.map((r) => ({
      legacy: r.legacy_technology,
      superseded_by: r.superseded_by
    })),
    complementaryPairs: [],
    results
  };
}

export async function searchPoints(queryOrVector, _collectionName = 'omni_rag_v6', limit = 5) {
  return hybridRrfSearch(String(queryOrVector || 'software factory oklch'), limit);
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]).toLowerCase() === path.resolve(__filename).toLowerCase()
) {
  const queryArg =
    process.argv
      .slice(2)
      .filter((a) => !a.startsWith('--'))
      .join(' ') || 'oklch apca clamp tokens diseño tipografia';
  const res = await hybridRrfSearch(queryArg, 4);
  console.log(JSON.stringify(res, null, 2));
}
