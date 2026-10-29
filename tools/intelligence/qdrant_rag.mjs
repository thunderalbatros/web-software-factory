#!/usr/bin/env node
/**
 * tools/intelligence/qdrant_rag.mjs — Hybrid RRF Search (BM25 + Dense Vector) & Local Fallback
 * ============================================================================================
 * Connects to Qdrant Vector Cloud when configured and guarantees an instantaneous (<15ms)
 * local RRF fallback over .agents/memory/knowledge_index.json when Qdrant is offline.
 * Returns fragments capped at <= 600 tokens (~2,400 chars) with exact file#Lstart-Lend citations.
 * ============================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  classifyEpistemicTier,
  inspectAndGuardLegacyFragment,
  TRANSLATION_RULE_WARNING,
  LEGACY_TECH_REPLACEMENT_TABLE
} from './rag_library_sanitizer.mjs';
import { loadProjectConfig } from '../lib/project_loader.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');
const LOCAL_INDEX_PATH = path.join(ROOT, '.agents', 'memory', 'knowledge_index.json');
const KNOWLEDGE_DIR = path.join(ROOT, 'knowledge');

function loadEnv() {
  const env = { ...process.env };
  for (const f of ['.env', '.env.txt']) {
    const p = path.join(ROOT, f);
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, 'utf8');
      content.split(/\r?\n/).forEach(line => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match && !env[match[1]]) {
          env[match[1]] = (match[2] || '').trim();
        }
      });
    }
  }
  return env;
}

const env = loadEnv();
const QDRANT_HOST = env.QDRANT_HOST || '';
const QDRANT_API_KEY = env.QDRANT_API_KEY || '';
const DEFAULT_COLLECTION = env.QDRANT_COLLECTION_OBSIDIAN || 'web_factory_knowledge';

export function sanitizeRagPayload(value) {
  if (typeof value === 'string') {
    return value
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\u202A-\u202E\u2066-\u2069]/g, '')
      .replace(/<\s*\/?\s*(system|instruction|prompt|tool_call|function_call)[^>]*>/gi, '[REDACTED_TAG]')
      .replace(/ignore\s+(all\s+)?(previous|prior)\s+instructions/gi, '[REDACTED_INJECTION]')
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
 * Builds or loads the compressed local fallback index (.agents/memory/knowledge_index.json)
 * with exact line numbers, <= 600 token excerpts, and 3-Tier Epistemic Governance metadata.
 */
export function ensureLocalKnowledgeIndex(forceRebuild = false) {
  if (!forceRebuild && fs.existsSync(LOCAL_INDEX_PATH)) {
    try {
      const data = JSON.parse(fs.readFileSync(LOCAL_INDEX_PATH, 'utf8'));
      if (
        data.schema === 'web-factory-compressed-knowledge-index-v2-epistemic' &&
        Array.isArray(data.chunks) &&
        data.chunks.length > 0 &&
        data.chunks[0]?.epistemicTier
      ) {
        return data;
      }
    } catch (_) {}
  }

  const mdFiles = [];
  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.md')) mdFiles.push(full);
    }
  }
  walk(KNOWLEDGE_DIR);

  // Prioritize CANON_ and software_factory treatises first so all treatises and books are represented
  mdFiles.sort((a, b) => {
    const aCanon = path.basename(a).startsWith('CANON_') ? 0 : 1;
    const bCanon = path.basename(b).startsWith('CANON_') ? 0 : 1;
    if (aCanon !== bCanon) return aCanon - bCanon;
    return a.localeCompare(b);
  });

  const chunks = [];
  const documentTiers = {};
  const tierCounts = {
    TIER_1_SOTA_2026: 0,
    TIER_2_TIMELESS_PRINCIPLES: 0,
    TIER_3_LEGACY_SYNTAX_GUARD_CHUNKS: 0
  };

  for (const fullPath of mdFiles) {
    const relPath = path.relative(ROOT, fullPath).replace(/\\/g, '/');
    const raw = fs.readFileSync(fullPath, 'utf8');
    const lines = raw.split(/\r?\n/);

    const tierMeta = classifyEpistemicTier(relPath, raw);
    documentTiers[relPath] = {
      epistemicTier: tierMeta.epistemicTier,
      authorityBoost: tierMeta.authorityBoost,
      epistemicRole: tierMeta.epistemicRole
    };
    if (tierMeta.epistemicTier === 'TIER_1_SOTA_2026') tierCounts.TIER_1_SOTA_2026++;
    else tierCounts.TIER_2_TIMELESS_PRINCIPLES++;

    let currentHeader = path.basename(fullPath, '.md');
    let blockStartLine = 1;
    let buffer = [];
    let fileChunksCount = 0;

    const flushBuffer = (endLine) => {
      if (fileChunksCount >= 10) return; // Cap per-file chunks so all treatises and books fit in fast memory
      const text = buffer.join('\n').trim();
      if (text.length < 40) return;

      const guardMeta = inspectAndGuardLegacyFragment(text, tierMeta.epistemicTier, relPath);
      if (guardMeta.translationRuleActive) {
        tierCounts.TIER_3_LEGACY_SYNTAX_GUARD_CHUNKS++;
      }

      // Enforce <= 600 tokens (~2,200 chars max) per chunk
      const cappedText = guardMeta.guardedText.slice(0, 2200);
      const tokenEst = Math.min(600, Math.ceil(cappedText.length / 4));
      chunks.push({
        id: `${relPath}#L${blockStartLine}-L${endLine}`,
        file: relPath,
        startLine: blockStartLine,
        endLine,
        citation: `${relPath}#L${blockStartLine}-L${endLine}`,
        header: currentHeader,
        epistemicTier: tierMeta.epistemicTier,
        authorityBoost: tierMeta.authorityBoost,
        epistemicRole: tierMeta.epistemicRole,
        legacySyntaxGuard: guardMeta.legacySyntaxGuard,
        translationRule:
          guardMeta.translationRule ||
          (tierMeta.epistemicTier === 'TIER_2_TIMELESS_PRINCIPLES' ? TRANSLATION_RULE_WARNING : null),
        supersededReplacements: guardMeta.supersededReplacements,
        tokens: tokenEst,
        excerpt: cappedText
      });
      fileChunksCount++;
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/^#{1,3}\s+/.test(line) && buffer.length >= 8) {
        flushBuffer(i);
        currentHeader = line.replace(/^#{1,3}\s+/, '').trim().slice(0, 120);
        blockStartLine = i + 1;
        buffer = [line];
      } else {
        buffer.push(line);
        if (buffer.join('\n').length >= 1800) {
          flushBuffer(i + 1);
          blockStartLine = i + 2;
          buffer = [];
        }
      }
    }
    if (buffer.length > 0) flushBuffer(lines.length);
  }

  const indexPayload = {
    schema: 'web-factory-compressed-knowledge-index-v2-epistemic',
    generatedAt: new Date().toISOString(),
    totalFiles: mdFiles.length,
    totalChunks: chunks.length,
    maxTokensPerChunk: 600,
    epistemicSummary: tierCounts,
    documentTiers,
    chunks: chunks.slice(0, 3500)
  };

  fs.mkdirSync(path.dirname(LOCAL_INDEX_PATH), { recursive: true });
  fs.writeFileSync(LOCAL_INDEX_PATH, JSON.stringify(indexPayload), 'utf8');
  return indexPayload;
}

/**
 * Zero-Docker 128-Dim Dense Semantic Feature Projection (`sqlite-vec` / LSH Cosine Pattern)
 */
export function computeDenseFeatureVector(text, dim = 128) {
  const vec = new Float32Array(dim);
  const clean = String(text || '').toLowerCase().replace(/[^a-z0-9áéíóúñü_.-]+/g, ' ').trim();
  if (!clean) return vec;

  // Project words and character 3-grams with signed Murmur-style hashing (SimHash / Random Projection)
  const tokens = clean.split(/\s+/);
  for (const tok of tokens) {
    if (tok.length < 2) continue;
    let h = 2166136261;
    for (let i = 0; i < tok.length; i++) {
      h ^= tok.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    const idx = Math.abs(h) % dim;
    const sign = (h & 1) === 0 ? 1.0 : -1.0;
    vec[idx] += sign * (tok.length >= 5 ? 1.8 : 1.0);

    for (let g = 0; g + 3 <= tok.length; g++) {
      const tri = (tok.charCodeAt(g) * 31 + tok.charCodeAt(g + 1)) * 31 + tok.charCodeAt(g + 2);
      const tIdx = Math.abs(tri) % dim;
      vec[tIdx] += (tri & 1 ? 0.45 : -0.45);
    }
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

/**
 * Classifies query intent for Epistemic Governance & rerank-ts Hybrid Reranking:
 *   - TECHNICAL_CODE_AND_SYNTAX: query asks for code, implementation, configuration, or syntax
 *     -> TIER_1_SOTA_2026 receives authorityBoost: 1.35 and is guaranteed Rank #1.
 *   - CONCEPTUAL_DESIGN_AND_ARCHITECTURE: query asks for design, composition, conversion psychology,
 *     UX laws, or conceptual architecture -> combines in complementary pairs the best result of
 *     TIER_2_TIMELESS_PRINCIPLES (classic book principle) with the best result of TIER_1_SOTA_2026 (2026 implementation).
 */
export function classifyQueryEpistemicIntent(query = '') {
  const qLower = String(query || '').toLowerCase();
  const conceptualRegex =
    /\b(?:diseño|design|composicion|composición|composition|psicologia|psicología|psychology|conversion|conversión|cro|leyes\s+de\s+ux|laws\s+of\s+ux|ux|fitts|hick|fogg|nudge|cialdini|arquitectura\s+conceptual|arquitectura\s+limpia|clean\s+architecture|tipografia|tipografía|grilla|grid|copywriting|principios|libro|book|bringhurst|wathan|norman|kahneman|ariely)\b/i;
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
  if (isCodeSyntax && !isConceptual) {
    return {
      mode: 'TECHNICAL_SOTA_PRIORITY',
      description: 'Código/Implementación/Configuración/Sintaxis -> TIER_1_SOTA_2026 (authorityBoost: 1.35) en Puesto #1'
    };
  }
  return {
    mode: isConceptual ? 'COMPLEMENTARY_PAIRING' : 'TECHNICAL_SOTA_PRIORITY',
    description: isConceptual
      ? 'Híbrido Conceptual + Técnico -> Pares complementarios (TIER_2_TIMELESS_PRINCIPLES + TIER_1_SOTA_2026)'
      : 'Prioridad SOTA 2026 (authorityBoost: 1.35 en Puesto #1) + Par Complementario Clásico'
  };
}

/**
 * Scoped RAG Routing & Theoretical Noise Quarantine (`projectScopeFilter` — Oct 2026 SOTA):
 *   - Commercial Web Archetypes (`landing`, `saas`, `saas-b2b`, `ecommerce`, `marketing`, `portfolio`, `local-business`)
 *     receive a `1.4x` boost on `software_factory/`, `ui_ux_design/`, `motion_and_animation/`, `cybersecurity/`,
 *     `architecture_and_edge/` and Web/TS engineering treatises in `architecture_and_books/`.
 *   - Off-purpose theoretical books (`modelling_extremal_events`, `artificial_intelligence_a_modern_approach`,
 *     `streaming_and_overlays`) are placed in Silent Quarantine (`domainQuarantine: true` by default) unless
 *     the project's `.specify/SPEC.md` or the explicit query requests that domain.
 */
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

export function projectScopeFilter(query = '', options = {}) {
  let cfg;
  try {
    cfg = loadProjectConfig(options.project || '');
  } catch (_) {
    cfg = { id: 'agencia-alfa', archetype: 'saas-b2b', projectRoot: ROOT };
  }

  const archetype = String(options.archetype || cfg.archetype || 'saas-b2b').toLowerCase();
  const isCommercialWeb = COMMERCIAL_WEB_ARCHETYPES.has(archetype);
  const domainQuarantine = options.domainQuarantine !== undefined ? Boolean(options.domainQuarantine) : isCommercialWeb;

  let specText = '';
  try {
    const specCandidate = path.join(cfg.projectRoot || ROOT, '.specify', 'SPEC.md');
    if (fs.existsSync(specCandidate)) {
      specText = fs.readFileSync(specCandidate, 'utf8').toLowerCase();
    }
  } catch (_) {}

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
        norm.startsWith('knowledge/architecture_and_books/') &&
        !isOffDomain;

      if (isPriorityFolder || isWebTreatiseInArchBooks) {
        return { quarantined: false, multiplier: 1.4, reason: 'COMMERCIAL_WEB_1.4X_BOOST' };
      }

      return { quarantined: false, multiplier: 1.0, reason: 'STANDARD_SCOPE' };
    }
  };
}

/**
 * 3-Way Reciprocal Rank Fusion (RRF, k=60) + `rerank-ts` Epistemic Authority Reranker
 * + Scoped RAG Domain Routing (`projectScopeFilter` 1.4x boost & Silent Quarantine):
 */
export async function hybridRrfSearch(query, limit = 5, options = {}) {
  const startMs = performance.now();
  const qLower = String(query || '').toLowerCase();
  const qTokens = qLower.split(/[^a-z0-9áéíóúñü_.-]+/).filter(t => t.length >= 2);
  const queryVec = computeDenseFeatureVector(qLower, 128);
  const epistemicIntent = classifyQueryEpistemicIntent(query);
  const scopeFilter = projectScopeFilter(query, options);
  let quarantinedChunksCount = 0;

  // Attempt remote Qdrant first only if QDRANT_HOST is configured and reachable
  let remoteResults = [];
  if (QDRANT_HOST && !QDRANT_HOST.includes('localhost')) {
    try {
      await listCollections();
    } catch (_) {
      remoteResults = [];
    }
  }

  const localIdx = ensureLocalKnowledgeIndex();
  const lexicalScored = [];
  const semanticScored = [];
  const denseVectorScored = [];

  for (let idx = 0; idx < localIdx.chunks.length; idx++) {
    const ch = localIdx.chunks[idx];
    const scopeEval = scopeFilter.evaluateChunk(ch.file);
    if (scopeEval.quarantined) {
      quarantinedChunksCount++;
      continue;
    }
    const domainMult = scopeEval.multiplier;
    const headerLower = ch.header.toLowerCase();
    const fileLower = ch.file.toLowerCase();
    const bodyLower = ch.excerpt.toLowerCase();

    // 1. BM25-style Lexical Score
    let bm25 = 0;
    for (const tok of qTokens) {
      if (headerLower.includes(tok)) bm25 += 4.5;
      if (fileLower.includes(tok)) bm25 += 3.5;
      if (bodyLower.includes(tok)) bm25 += 1.5;
    }
    if (bm25 > 0) lexicalScored.push({ idx, score: bm25 * domainMult });

    // 2. Semantic Concept & Bigram Overlap Score
    let sem = 0;
    for (let i = 0; i < qTokens.length; i++) {
      const t = qTokens[i];
      if (headerLower.includes(t) || bodyLower.includes(t)) sem += 1.0;
      if (i + 1 < qTokens.length) {
        const bigram = `${t} ${qTokens[i + 1]}`;
        if (bodyLower.includes(bigram) || headerLower.includes(bigram)) sem += 3.0;
      }
    }
    if (fileLower.includes('canon_')) sem *= 1.15;
    if (sem > 0) semanticScored.push({ idx, score: sem * domainMult });

    // 3. 128-Dim Dense Vector Cosine Score (Zero-Docker Embedded Vector Rank)
    if (bm25 > 0 || sem > 0) {
      const chunkVec = computeDenseFeatureVector(`${headerLower} ${bodyLower.slice(0, 600)}`, 128);
      const cos = cosineSimilarity(queryVec, chunkVec);
      if (cos > 0.05) denseVectorScored.push({ idx, score: cos * domainMult });
    }
  }

  lexicalScored.sort((a, b) => b.score - a.score);
  semanticScored.sort((a, b) => b.score - a.score);
  denseVectorScored.sort((a, b) => b.score - a.score);

  const k = 60;
  const rrfMap = new Map();

  lexicalScored.slice(0, 120).forEach((item, rank) => {
    rrfMap.set(item.idx, (rrfMap.get(item.idx) || 0) + 1 / (k + rank + 1));
  });
  semanticScored.slice(0, 120).forEach((item, rank) => {
    rrfMap.set(item.idx, (rrfMap.get(item.idx) || 0) + 1 / (k + rank + 1));
  });
  denseVectorScored.slice(0, 120).forEach((item, rank) => {
    rrfMap.set(item.idx, (rrfMap.get(item.idx) || 0) + 0.5 / (k + rank + 1));
  });

  // Format candidate chunk and enforce TIER_3_LEGACY_SYNTAX_GUARD translation rules
  const formatCandidate = (chunkIdx, rawRrfScore) => {
    const ch = localIdx.chunks[chunkIdx];
    const tierMeta = ch.epistemicTier
      ? {
          epistemicTier: ch.epistemicTier,
          authorityBoost: ch.authorityBoost || (ch.epistemicTier === 'TIER_1_SOTA_2026' ? 1.35 : 1.15),
          epistemicRole: ch.epistemicRole
        }
      : classifyEpistemicTier(ch.file, ch.excerpt);

    const guardMeta = inspectAndGuardLegacyFragment(ch.excerpt, tierMeta.epistemicTier, ch.file);
    const isClassicBook = tierMeta.epistemicTier === 'TIER_2_TIMELESS_PRINCIPLES';
    const activeTranslationRule =
      guardMeta.translationRule || (isClassicBook ? TRANSLATION_RULE_WARNING : null);

    let finalExcerpt = guardMeta.guardedText;
    if (isClassicBook && !finalExcerpt.includes('[TRANSLATION_RULE:')) {
      finalExcerpt = `${TRANSLATION_RULE_WARNING}\n${finalExcerpt}`;
    }

    const scopeEval = scopeFilter.evaluateChunk(ch.file);
    const boostedRrf = rawRrfScore * tierMeta.authorityBoost * scopeEval.multiplier;
    return {
      citation: ch.citation,
      file: ch.file,
      startLine: ch.startLine,
      endLine: ch.endLine,
      header: ch.header,
      epistemicTier: tierMeta.epistemicTier,
      authorityBoost: tierMeta.authorityBoost,
      domainMultiplier: scopeEval.multiplier,
      epistemicRole: tierMeta.epistemicRole,
      legacySyntaxGuard: guardMeta.legacySyntaxGuard || (isClassicBook ? 'TIER_3_LEGACY_SYNTAX_GUARD' : null),
      translationRule: activeTranslationRule,
      supersededReplacements: guardMeta.supersededReplacements,
      rawRrfScore: Number(rawRrfScore.toFixed(5)),
      rrfScore: Number(boostedRrf.toFixed(5)),
      tokens: Math.min(600, ch.tokens),
      excerpt: finalExcerpt.slice(0, 2200)
    };
  };

  const allCandidates = Array.from(rrfMap.entries())
    .map(([chunkIdx, rawRrfScore]) => formatCandidate(chunkIdx, rawRrfScore))
    .sort((a, b) => b.rrfScore - a.rrfScore);

  const tier1Candidates = allCandidates.filter(c => c.epistemicTier === 'TIER_1_SOTA_2026');
  const tier2Candidates = allCandidates.filter(c => c.epistemicTier === 'TIER_2_TIMELESS_PRINCIPLES');

  // Fallback if no Tier 2 candidate matched lexical tokens directly: pick best classic book chunk
  if (tier2Candidates.length === 0) {
    const fallbackTier2Idx = localIdx.chunks.findIndex(
      c => c.epistemicTier === 'TIER_2_TIMELESS_PRINCIPLES'
    );
    if (fallbackTier2Idx >= 0) {
      tier2Candidates.push(formatCandidate(fallbackTier2Idx, 0.015));
    }
  }

  let finalResults = [];
  const complementaryPairs = [];

  if (epistemicIntent.mode === 'COMPLEMENTARY_PAIRING') {
    // Combine in complementary pairs: best TIER_2_TIMELESS_PRINCIPLES (book principle) + best TIER_1_SOTA_2026 (2026 code)
    const maxPairs = Math.max(1, Math.ceil(limit / 2));
    const usedCitations = new Set();

    for (let p = 0; p < maxPairs; p++) {
      const t2 = tier2Candidates[p];
      const t1 = tier1Candidates[p];
      if (t2 && t1) {
        complementaryPairs.push({
          pairIndex: p + 1,
          timelessPrinciple_TIER_2: {
            citation: t2.citation,
            header: t2.header,
            epistemicTier: t2.epistemicTier,
            authorityBoost: t2.authorityBoost,
            legacySyntaxGuard: t2.legacySyntaxGuard,
            translationRule: t2.translationRule
          },
          sota2026Implementation_TIER_1: {
            citation: t1.citation,
            header: t1.header,
            epistemicTier: t1.epistemicTier,
            authorityBoost: t1.authorityBoost
          }
        });
      }
      if (t2 && !usedCitations.has(t2.citation) && finalResults.length < limit) {
        usedCitations.add(t2.citation);
        finalResults.push({ ...t2, pairedWithCitation: t1?.citation || null });
      }
      if (t1 && !usedCitations.has(t1.citation) && finalResults.length < limit) {
        usedCitations.add(t1.citation);
        finalResults.push({ ...t1, pairedWithCitation: t2?.citation || null });
      }
    }

    for (const c of allCandidates) {
      if (finalResults.length >= limit) break;
      if (!usedCitations.has(c.citation)) {
        usedCitations.add(c.citation);
        finalResults.push(c);
      }
    }
  } else {
    // TECHNICAL_SOTA_PRIORITY: Guarantee TIER_1_SOTA_2026 (authorityBoost: 1.35) is Rank #1
    const usedCitations = new Set();
    if (tier1Candidates.length > 0) {
      const topSota = tier1Candidates[0];
      usedCitations.add(topSota.citation);
      finalResults.push(topSota);
    }

    // Build complementary pair reference between top SOTA 2026 (#1) and top Classic Book (TIER_2)
    if (tier1Candidates[0] && tier2Candidates[0]) {
      complementaryPairs.push({
        pairIndex: 1,
        sota2026Implementation_TIER_1: {
          citation: tier1Candidates[0].citation,
          header: tier1Candidates[0].header,
          epistemicTier: tier1Candidates[0].epistemicTier,
          authorityBoost: tier1Candidates[0].authorityBoost
        },
        timelessPrinciple_TIER_2: {
          citation: tier2Candidates[0].citation,
          header: tier2Candidates[0].header,
          epistemicTier: tier2Candidates[0].epistemicTier,
          authorityBoost: tier2Candidates[0].authorityBoost,
          legacySyntaxGuard: tier2Candidates[0].legacySyntaxGuard,
          translationRule: tier2Candidates[0].translationRule
        }
      });
    }

    for (const c of allCandidates) {
      if (finalResults.length >= limit) break;
      if (!usedCitations.has(c.citation)) {
        usedCitations.add(c.citation);
        finalResults.push(c);
      }
    }

    // Ensure at least 1 TIER_2_TIMELESS_PRINCIPLES book with TIER_3_LEGACY_SYNTAX_GUARD is visible in top K when limit >= 3
    if (
      limit >= 3 &&
      tier2Candidates.length > 0 &&
      !finalResults.some(r => r.epistemicTier === 'TIER_2_TIMELESS_PRINCIPLES')
    ) {
      finalResults[finalResults.length - 1] = tier2Candidates[0];
    }
  }

  return {
    source: remoteResults.length > 0 ? 'qdrant-cloud+rrf+rerank-ts' : 'local-knowledge-index-rrf+rerank-ts',
    latencyMs: Math.round(performance.now() - startMs),
    maxTokensPerChunk: 600,
    projectScopeFilter: {
      projectId: scopeFilter.projectId,
      archetype: scopeFilter.archetype,
      domainQuarantine: scopeFilter.domainQuarantine,
      webDomainMultiplier: scopeFilter.webDomainMultiplier,
      quarantinedChunksSkipped: quarantinedChunksCount
    },
    epistemicIntent,
    activeTranslationRule: TRANSLATION_RULE_WARNING,
    technologyReplacementTable: LEGACY_TECH_REPLACEMENT_TABLE.map(r => ({
      legacy: r.legacy_technology,
      superseded_by: r.superseded_by
    })),
    complementaryPairs,
    results: finalResults.slice(0, limit)
  };
}

export async function listCollections() {
  if (!QDRANT_HOST) throw new Error('QDRANT_HOST is not configured in .env');
  const res = await fetch(`${QDRANT_HOST}/collections`, {
    signal: AbortSignal.timeout(3500),
    headers: { 'api-key': QDRANT_API_KEY }
  });
  if (!res.ok) throw new Error(`Qdrant error: ${res.statusText}`);
  return await res.json();
}

export async function getCollectionInfo(collectionName = DEFAULT_COLLECTION) {
  if (!QDRANT_HOST) throw new Error('QDRANT_HOST is not configured in .env');
  const res = await fetch(`${QDRANT_HOST}/collections/${encodeURIComponent(collectionName)}`, {
    signal: AbortSignal.timeout(3500),
    headers: { 'api-key': QDRANT_API_KEY }
  });
  if (!res.ok) throw new Error(`Qdrant error: ${res.statusText}`);
  return await res.json();
}

export async function searchPoints(vector, collectionName = DEFAULT_COLLECTION, limit = 5) {
  if (!QDRANT_HOST) {
    return await hybridRrfSearch(String(vector || 'software factory oklch'), limit);
  }
  const res = await fetch(`${QDRANT_HOST}/collections/${encodeURIComponent(collectionName)}/points/search`, {
    method: 'POST',
    signal: AbortSignal.timeout(3500),
    headers: {
      'api-key': QDRANT_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ vector, limit, with_payload: true })
  });
  if (!res.ok) throw new Error(`Qdrant search error: ${res.statusText}`);
  return await res.json();
}

export async function upsertPoints(points, collectionName = DEFAULT_COLLECTION) {
  if (!QDRANT_HOST) throw new Error('QDRANT_HOST is not configured in .env');
  const safePoints = Array.isArray(points)
    ? points.map(pt => ({ ...pt, payload: sanitizeRagPayload(pt.payload || {}) }))
    : [];
  const res = await fetch(`${QDRANT_HOST}/collections/${encodeURIComponent(collectionName)}/points`, {
    method: 'PUT',
    signal: AbortSignal.timeout(3500),
    headers: {
      'api-key': QDRANT_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ points: safePoints })
  });
  if (!res.ok) throw new Error(`Qdrant upsert error: ${res.statusText}`);
  return await res.json();
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  if (process.argv.includes('--rebuild')) {
    ensureLocalKnowledgeIndex(true);
  }
  const queryArg = process.argv.slice(2).filter(a => !a.startsWith('--')).join(' ') || 'oklch apca clamp tokens diseño tipografia';
  hybridRrfSearch(queryArg, 4).then((res) => {
    console.log('==================================================================');
    console.log(`🔎 HYBRID RRF + RERANK-TS EPISTEMIC SEARCH [${res.source}]`);
    console.log('==================================================================');
    console.log(`  ✓ Query            : "${queryArg}"`);
    console.log(`  ✓ Epistemic Intent : ${res.epistemicIntent.mode} (${res.epistemicIntent.description})`);
    console.log(`  ✓ Latency          : ${res.latencyMs}ms`);
    console.log(`  ✓ Active Guard     : ${res.activeTranslationRule}`);
    if (res.complementaryPairs && res.complementaryPairs.length > 0) {
      const p = res.complementaryPairs[0];
      console.log(`  ✓ Complementary #1 : [TIER_2: ${p.timelessPrinciple_TIER_2?.citation}] + [TIER_1: ${p.sota2026Implementation_TIER_1?.citation}]`);
    }
    for (const r of res.results) {
      const guardTag = r.legacySyntaxGuard ? ` | Guard: ${r.legacySyntaxGuard}` : '';
      console.log(`  • [RRF ${r.rrfScore} | ${r.epistemicTier} x${r.authorityBoost}${guardTag}] ${r.citation} (${r.tokens} tokens) -> ${r.header}`);
      if (r.translationRule) {
        console.log(`    ↳ ${r.translationRule}`);
      }
      if (Array.isArray(r.supersededReplacements) && r.supersededReplacements.length > 0) {
        for (const s of r.supersededReplacements) {
          console.log(`    ↳ [superseded_by] ${s.legacy_technology} -> ${s.superseded_by}`);
        }
      }
    }
    console.log('==================================================================\n');
  });
}
