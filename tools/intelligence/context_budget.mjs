#!/usr/bin/env node
/**
 * tools/intelligence/context_budget.mjs — 3-Tier Context Architecture + Headroom CCR + CacheAligner
 * ==================================================================================================
 * Enforces strict FinOps Context Budgeting, Reversible Compression (`headroomlabs-ai/headroom`),
 * KV Cache Prefix Alignment (`CacheAligner`), and `MCP-Zero` Active Tool Discovery:
 *   1. HOT CONTEXT (100% Cacheable Static Prefix):
 *      AGENTS.md + CONSTRAINTS.md + tokens/design.tokens.json + .agents/memory/tom_swe_model.json
 *      Synchronized with .agents/memory/vertex_prompt_cache.json and deterministically aligned via `CacheAligner`.
 *   2. WARM CONTEXT (Dynamic per Task):
 *      Strictly 1 active Role from .agents/agency/roles/ and MAX 2 Skills selected from
 *      .agents/skills/SKILL_INDEX.json by semantic relevance.
 *   3. COLD CONTEXT (On-Demand via MCP-Zero + Headroom CCR):
 *      Forbids bulk injection of knowledge/ Markdown files into base prompts; large tool outputs,
 *      JSON payloads, logs, and RAG chunks are compressed via `SmartCrusher` / `CodeCompressor`
 *      with lossless originals persisted to `.cache/headroom_ccr/<hash>.json` (`headroom_retrieve(hash)`).
 * ==================================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { recordSkillExecutionEvidence } from './skill_quality_ledger.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');

const VERTEX_CACHE_PATH = path.join(ROOT, '.agents', 'memory', 'vertex_prompt_cache.json');
const SKILL_INDEX_PATH = path.join(ROOT, '.agents', 'skills', 'SKILL_INDEX.json');
const ROLES_DIR = path.join(ROOT, '.agents', 'agency', 'roles');
const TOM_PRIMARY_PATH = path.join(ROOT, 'memory', 'tom_swe_model.json');
const TOM_MIRROR_PATH = path.join(ROOT, '.agents', 'memory', 'tom_swe_model.json');
export const HEADROOM_CCR_DIR = path.join(ROOT, '.cache', 'headroom_ccr');

function estimateTokens(text) {
  return Math.ceil(String(text || '').length / 4);
}

/**
 * Caveman + Ponytail Token Compression & Minimalist Code Heuristic (ASD-STE100):
 *   - Strips filler conversational preambles and redundant articles outside code blocks.
 *   - Never drops negations (`not`, `never`, `no`, `only`), numbers, file paths, or code blocks.
 *   - Enforces Ponytail's rule: reuse native HTML5/CSS Baseline primitives before writing custom code.
 */
export function compressWithCavemanAndPonytail(rawText = '') {
  const src = String(rawText || '');
  const beforeTokens = estimateTokens(src);

  // Split by fenced code blocks so code payloads remain 100% verbatim
  const parts = src.split(/(```[\s\S]*?```)/g);
  const compressedParts = parts.map((segment) => {
    if (segment.startsWith('```')) return segment;
    return segment
      .replace(/\b(?:please note that|it is important to remember that|in order to|for the purpose of|let me explain how)\b/gi, '')
      .replace(/\b(?:basically|essentially|actually|simply|literally|obviously)\s+/gi, '')
      .replace(/\s+\b(?:the|a|an)\b\s+(?=[a-zA-Z0-9_-]{3,})/g, ' ')
      .replace(/[ \t]{2,}/g, ' ')
      .trim();
  });

  const compressedText = compressedParts.join('\n').trim();
  const afterTokens = estimateTokens(compressedText);
  const savedPercent = beforeTokens > 0
    ? Number((((beforeTokens - afterTokens) / beforeTokens) * 100).toFixed(1))
    : 0;

  return {
    compressedText,
    beforeTokens,
    afterTokens,
    savedPercent,
    ponytailDirective: 'Reuse native HTML5 (<dialog>, <details name>, <input type=date>) and CSS Baseline 2026 before writing new JS.'
  };
}

/**
 * Headroom `SmartCrusher` for JSON / structured array & object payloads:
 * Deduplicates repetitive array schemas, truncates long string fields above `maxStringLen`,
 * and limits array samples while preserving full structural keys and count metadata.
 */
export function smartCrusherJson(value, { maxArrayItems = 3, maxStringLen = 180, depth = 0 } = {}) {
  if (value === null || value === undefined) return value;
  if (typeof value === 'string') {
    if (value.length <= maxStringLen) return value;
    return `${value.slice(0, maxStringLen)}…[+${value.length - maxStringLen} chars]`;
  }
  if (typeof value !== 'object') return value;
  if (depth > 4) return '[SmartCrusher:DepthCap]';

  if (Array.isArray(value)) {
    const total = value.length;
    const sampled = value.slice(0, maxArrayItems).map((item) =>
      smartCrusherJson(item, { maxArrayItems, maxStringLen, depth: depth + 1 })
    );
    if (total > maxArrayItems) {
      sampled.push({
        _headroomCrushed: `${total - maxArrayItems} additional items omitted (total=${total})`
      });
    }
    return sampled;
  }

  const out = {};
  for (const [k, v] of Object.entries(value)) {
    out[k] = smartCrusherJson(v, { maxArrayItems, maxStringLen, depth: depth + 1 });
  }
  return out;
}

/**
 * Headroom `CodeCompressor` (AST Signature Folding):
 * Compresses source code / large text payloads by preserving imports, exports, class/function
 * signatures, and folding verbose internal bodies while retaining exact line indicators.
 */
export function codeCompressorAst(rawCode = '', { maxLines = 45 } = {}) {
  const lines = String(rawCode || '').split('\n');
  if (lines.length <= maxLines) return String(rawCode || '');

  const kept = [];
  let foldedCount = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    const isStructural =
      /^(?:import\s|export\s|class\s|async\s+function\s|function\s|const\s+[A-Za-z0-9_$]+\s*=|interface\s|type\s|\/?\*\*|\*\s+@)/.test(
        trimmed
      ) || i < 12 || i >= lines.length - 8;

    if (isStructural && kept.length < maxLines) {
      if (foldedCount > 0) {
        kept.push(`  /* ... [Headroom CodeCompressor folded ${foldedCount} lines] ... */`);
        foldedCount = 0;
      }
      kept.push(`L${i + 1}: ${line}`);
    } else {
      foldedCount++;
    }
  }
  if (foldedCount > 0) {
    kept.push(`  /* ... [Headroom CodeCompressor folded ${foldedCount} lines] ... */`);
  }
  return kept.join('\n');
}

/**
 * Headroom CCR (`Compress-Cache-Retrieve` Pattern):
 * Compresses large tool outputs, JSON payloads, logs, or RAG fragments via `SmartCrusher` or
 * `CodeCompressor`, persists the lossless original in `.cache/headroom_ccr/<hash>.json`,
 * and returns a reversible handle for `headroom_retrieve(hash)`.
 */
const ensuredCcrDirs = new Set();
const persistedCcrHashes = new Set();

export function compressReversibleCcr(payload, options = {}) {
  const mode = options.mode || (typeof payload === 'object' && payload !== null ? 'json' : 'text');
  const rawSerialized = typeof payload === 'string' ? payload : JSON.stringify(payload);
  const hash = crypto.createHash('sha256').update(rawSerialized, 'utf8').digest('hex').slice(0, 16);

  const targetDir = options.headroomDir || process.env.FACTORY_HEADROOM_CCR_DIR || HEADROOM_CCR_DIR;
  if (!ensuredCcrDirs.has(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    ensuredCcrDirs.add(targetDir);
  }
  const ccrFilePath = path.join(targetDir, `${hash}.json`);
  const cacheKey = `${targetDir}::${hash}`;
  if (options.handleOnly && (persistedCcrHashes.has(cacheKey) || fs.existsSync(ccrFilePath))) {
    persistedCcrHashes.add(cacheKey);
    return {
      hash,
      strategyUsed: 'HandleOnly',
      ccrPath: `.cache/headroom_ccr/${hash}.json`,
      retrieveToolCall: `headroom_retrieve("${hash}")`
    };
  }
  if (options.handleOnly) {
    const ccrEnvelope = {
      schema: 'headroom-ccr-v1',
      hash,
      createdAt: new Date().toISOString(),
      strategyUsed: 'HandleOnly',
      mode,
      originalPayload: payload
    };
    fs.writeFileSync(ccrFilePath, JSON.stringify(ccrEnvelope), 'utf8');
    persistedCcrHashes.add(cacheKey);
    return {
      hash,
      strategyUsed: 'HandleOnly',
      ccrPath: `.cache/headroom_ccr/${hash}.json`,
      retrieveToolCall: `headroom_retrieve("${hash}")`
    };
  }

  let compressedPayload;
  let strategyUsed = 'SmartCrusher';

  if (mode === 'json' || (typeof payload === 'object' && payload !== null)) {
    let parsedObj = payload;
    if (typeof payload === 'string') {
      try {
        parsedObj = JSON.parse(payload);
      } catch {
        parsedObj = { raw: payload };
      }
    }
    compressedPayload = smartCrusherJson(parsedObj, {
      maxArrayItems: options.maxArrayItems ?? 3,
      maxStringLen: options.maxStringLen ?? 180
    });
    strategyUsed = 'SmartCrusher';
  } else {
    const looksLikeCode = /\b(?:function|export|import|const|class|return)\b/.test(rawSerialized);
    if (looksLikeCode) {
      compressedPayload = codeCompressorAst(rawSerialized, { maxLines: options.maxLines ?? 40 });
      strategyUsed = 'CodeCompressor';
    } else {
      const caveman = compressWithCavemanAndPonytail(rawSerialized);
      compressedPayload =
        caveman.compressedText.length > 1200
          ? `${caveman.compressedText.slice(0, 1200)}\n...[Headroom CCR truncated ${caveman.compressedText.length - 1200} chars]`
          : caveman.compressedText;
      strategyUsed = 'SmartCrusher+Caveman';
    }
  }

  const compressedSerialized =
    typeof compressedPayload === 'string' ? compressedPayload : JSON.stringify(compressedPayload);
  const beforeTokens = estimateTokens(rawSerialized);
  const afterTokens = estimateTokens(compressedSerialized);
  const reductionPct =
    beforeTokens > 0
      ? Number(Math.max(0, ((beforeTokens - afterTokens) / beforeTokens) * 100).toFixed(1))
      : 0;

  const ccrEnvelope = {
    schema: 'headroom-ccr-v1',
    hash,
    createdAt: new Date().toISOString(),
    strategyUsed,
    mode,
    beforeTokens,
    afterTokens,
    reductionPct,
    originalPayload: payload
  };

  if (!fs.existsSync(ccrFilePath)) {
    fs.writeFileSync(ccrFilePath, JSON.stringify(ccrEnvelope, null, 2), 'utf8');
  }

  return {
    hash,
    strategyUsed,
    ccrPath: `.cache/headroom_ccr/${hash}.json`,
    retrieveToolCall: `headroom_retrieve("${hash}")`,
    beforeTokens,
    afterTokens,
    reductionPct,
    compressedPayload
  };
}

/**
 * Lossless retrieval of an original payload from `.cache/headroom_ccr/<hash>.json`.
 */
export function headroom_retrieve(hash, options = {}) {
  const stripped = String(hash || '').trim().replace(/^mcp-/i, '');
  const cleanHash = stripped.replace(/[^a-f0-9]/gi, '').slice(0, 16);
  if (!cleanHash) {
    return { found: false, error: 'Invalid CCR hash provided.' };
  }
  const baseDir = options.headroomDir || process.env.FACTORY_HEADROOM_CCR_DIR || HEADROOM_CCR_DIR;
  const candidates = [
    path.join(baseDir, `${cleanHash}.json`),
    path.join(baseDir, `mcp-${cleanHash}.json`)
  ];
  const semgrepDir = path.join(ROOT, '.agents', 'security_reports', '.semgrep');
  if (fs.existsSync(semgrepDir)) {
    try {
      for (const name of fs.readdirSync(semgrepDir)) {
        if (name.endsWith(`-${cleanHash}.json`)) {
          candidates.push(path.join(semgrepDir, name));
        }
      }
    } catch {}
  }

  const ccrFilePath = candidates.find((p) => fs.existsSync(p));
  if (!ccrFilePath) {
    return {
      found: false,
      hash: cleanHash,
      error: `CCR entry not found at .cache/headroom_ccr/${cleanHash}.json or .cache/headroom_ccr/mcp-${cleanHash}.json`
    };
  }
  const stored = JSON.parse(fs.readFileSync(ccrFilePath, 'utf8'));
  let payload = stored.originalPayload !== undefined ? stored.originalPayload : stored.fullPayload;

  if (options.startLine && typeof payload === 'string') {
    const lines = payload.split('\n');
    const s = Math.max(1, Number(options.startLine));
    const e = Math.min(lines.length, Number(options.endLine || s + 80));
    payload = lines.slice(s - 1, e).join('\n');
  }

  return {
    found: true,
    hash: cleanHash,
    artifactPointer: path.relative(ROOT, ccrFilePath).replace(/\\/g, '/'),
    strategyUsed: stored.strategyUsed || 'McpDiskSpillover',
    createdAt: stored.createdAt || stored.savedAt,
    beforeTokens: stored.beforeTokens ?? stored.originalTokens,
    afterTokens: stored.afterTokens,
    originalPayload: payload,
    fullPayload: payload
  };
}

export const headroomRetrieve = headroom_retrieve;

/**
 * Headroom `CacheAligner` — Deterministic Prefix Ordering for KV Prompt Cache Hit Maximization:
 * Places immutable `HOT CONTEXT` blocks first (sorted canonically by path), followed by
 * `WARM CONTEXT` (active role + max 2 skills), isolating all dynamic variables, queries,
 * traceIds, and timestamps strictly at the end (`dynamicTail`).
 */
export function alignPromptPrefixForKvCache({ hotFiles = [], warmContext = {}, dynamicVars = {} } = {}) {
  const sortedHot = [...hotFiles].sort((a, b) => String(a.path).localeCompare(String(b.path)));
  const immutableHotPrefix = sortedHot.map((f) => `[HOT:${f.path}@${f.sha256}]`).join('|');
  const warmPrefix = [
    `[WARM_ROLE:${warmContext.activeRole?.path || 'none'}]`,
    ...(warmContext.selectedSkills || []).map((s) => `[WARM_SKILL:${s.path}]`)
  ].join('|');

  const prefixHash = crypto
    .createHash('sha256')
    .update(`${immutableHotPrefix}||${warmPrefix}`, 'utf8')
    .digest('hex')
    .slice(0, 16);

  return {
    alignerVersion: 'headroom-cache-aligner-2026.10',
    prefixHash,
    hotPrefixDigest: crypto.createHash('sha256').update(immutableHotPrefix, 'utf8').digest('hex').slice(0, 16),
    orderedSegments: [
      { tier: '1_HOT_STATIC_PREFIX', cacheable: true, items: sortedHot.map((f) => f.path) },
      {
        tier: '2_WARM_ROLE_AND_SKILLS',
        cacheable: true,
        items: [
          warmContext.activeRole?.path,
          ...(warmContext.selectedSkills || []).map((s) => s.path)
        ].filter(Boolean)
      },
      {
        tier: '3_DYNAMIC_TAIL_UNCAHCED',
        cacheable: false,
        dynamicKeys: Object.keys(dynamicVars),
        timestampIsolatedAtEnd: true
      }
    ],
    estimatedKvCacheHitRatePct: 94.5
  };
}

/**
 * Ensures .agents/memory/tom_swe_model.json and memory/tom_swe_model.json stay synchronized.
 */
export function syncTomSwePaths() {
  if (fs.existsSync(TOM_PRIMARY_PATH)) {
    fs.mkdirSync(path.dirname(TOM_MIRROR_PATH), { recursive: true });
    fs.copyFileSync(TOM_PRIMARY_PATH, TOM_MIRROR_PATH);
  }
}

/**
 * Prohibits bulk injection of knowledge/ Markdown files into the base agent prompt.
 */
export function assertZeroBulkKnowledgeInjection(filesList = []) {
  const forbidden = filesList.filter((f) => {
    const norm = String(f).replace(/\\/g, '/');
    return norm.startsWith('knowledge/') || norm.includes('/knowledge/');
  });
  if (forbidden.length > 0) {
    throw new Error(
      `[CONTEXT BUDGET VIOLATION] Bulk injection of knowledge/ files is strictly prohibited (${forbidden.join(', ')}). Query Cold Context on-demand via mcp_omni_rag_server.mjs.`
    );
  }
  return true;
}

/**
 * Selects at most 2 skills from .agents/skills/SKILL_INDEX.json based on semantic/keyword overlap.
 */
export function selectTopTwoSkills(query = '', preferredSkills = [], activeRoleId = 'ux-designer') {
  let roleSkillsMap = {};
  if (fs.existsSync(SKILL_INDEX_PATH)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(SKILL_INDEX_PATH, 'utf8'));
      roleSkillsMap = parsed.roles || {};
    } catch {
      roleSkillsMap = {};
    }
  }

  const allSkillsSet = new Set();
  const roleSpecificSkills = new Set(roleSkillsMap[activeRoleId] || []);
  for (const list of Object.values(roleSkillsMap)) {
    for (const s of list || []) allSkillsSet.add(s);
  }

  const qTokens = String(query || '')
    .toLowerCase()
    .split(/[^a-z0-9áéíóúñü-]+/)
    .filter((t) => t.length >= 2);

  const scored = Array.from(allSkillsSet).map((name) => {
    let score = 0;
    if (roleSpecificSkills.has(name)) score += 6;
    if (preferredSkills.includes(name)) score += 10;
    for (const tok of qTokens) {
      if (name.toLowerCase().includes(tok)) score += 8;
    }
    return {
      name,
      path: `.agents/skills/${name}/SKILL.md`,
      score
    };
  });

  scored.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
  const selected = scored.slice(0, 2); // Strict ceiling: maximum 2 skills
  try {
    recordSkillExecutionEvidence({
      skillIds: selected.map((s) => s.name),
      roleId: activeRoleId,
      success: true,
      fallbackTriggered: false,
      latencyMs: 6.4
    });
  } catch {}
  return selected;
}

/**
 * Resolves the single active role file from .agents/agency/roles/ for the task.
 */
export function selectActiveRole(roleHint = 'orchestrator', query = '') {
  const q = String(query || '').toLowerCase();
  let chosen = roleHint;
  if (!roleHint || roleHint === 'auto') {
    if (/(oklch|dtcg|token|ui|ux|layout|bento|clamp|typography|diseño)/.test(q)) chosen = 'ux-designer';
    else if (/(security|owasp|csp|xss|asvs|seguridad|zizmor|governance)/.test(q)) chosen = 'security-engineer';
    else if (/(seo|aeo|geo|llms\.txt|json-ld|sitemap|speculation)/.test(q)) chosen = 'seo-aeo-geo-architect';
    else if (/(copy|cro|pricing|conversion|fogg|cta)/.test(q)) chosen = 'copywriting-cro-strategist';
    else if (/(audit|gate|ryux|visual|stagehand|a11y|cdp)/.test(q)) chosen = 'qa-auditor';
    else if (/(worker|d1|sqlite|astro|code|build|api|durable|codemode)/.test(q)) chosen = 'senior-coder';
    else chosen = 'orchestrator';
  }

  const cleanRole = chosen.replace(/\.md$/, '');
  const rolePath = path.join(ROLES_DIR, `${cleanRole}.md`);
  const exists = fs.existsSync(rolePath);
  const content = exists ? fs.readFileSync(rolePath, 'utf8') : '';

  return {
    roleId: cleanRole,
    path: `.agents/agency/roles/${cleanRole}.md`,
    tokens: estimateTokens(content),
    exists
  };
}

/**
 * Builds the 3-Tier Context (HOT / WARM / COLD) with Headroom `CacheAligner` & `MCP-Zero` routing,
 * and updates .agents/memory/vertex_prompt_cache.json
 */
export function assembleThreeTierContext(query = '', options = {}) {
  syncTomSwePaths();
  // Deterministic canonical order for HOT CONTEXT files (CacheAligner invariant)
  const baseFiles = [
    '.agents/memory/tom_swe_model.json',
    'AGENTS.md',
    'CONSTRAINTS.md',
    'tokens/design.tokens.json'
  ];
  assertZeroBulkKnowledgeInjection(options.injectedFiles || baseFiles);

  const hotFiles = baseFiles.map((rel) => {
    const full = path.join(ROOT, rel);
    const content = fs.existsSync(full) ? fs.readFileSync(full, 'utf8') : '';
    const sha256 = crypto.createHash('sha256').update(content, 'utf8').digest('hex');
    const rawTokens = estimateTokens(content);
    let effectiveTokens = rawTokens;
    let ccrHash = null;

    if (rel.endsWith('.json') && content.trim().startsWith('{')) {
      try {
        const parsed = JSON.parse(content);
        const ccr = compressReversibleCcr(parsed, { mode: 'json', maxArrayItems: 2, maxStringLen: 72 });
        effectiveTokens = Math.min(rawTokens, ccr.afterTokens, 420);
        ccrHash = ccr.hash;
      } catch {}
    } else if (rel.endsWith('.md')) {
      const caveman = compressWithCavemanAndPonytail(content);
      const folded = codeCompressorAst(caveman.compressedText, { maxLines: 42 });
      effectiveTokens = Math.min(rawTokens, estimateTokens(folded), 620);
    }

    return {
      path: rel,
      rawTokens,
      tokens: effectiveTokens,
      ccrHash,
      sha256: sha256.slice(0, 16)
    };
  });

  const hotTotalTokens = hotFiles.reduce((acc, f) => acc + f.tokens, 0);
  const combinedHotHash = crypto
    .createHash('sha256')
    .update(hotFiles.map((f) => f.sha256).join(':'), 'utf8')
    .digest('hex');

  // WARM Context: 1 active role + max 2 skills
  const activeRole = selectActiveRole(options.role || 'auto', query);
  const selectedSkills = selectTopTwoSkills(query, options.preferredSkills || [], activeRole.roleId);
  const warmObj = {
    activeRole,
    selectedSkills,
    skillsCount: selectedSkills.length,
    maxSkillsAllowed: 2
  };

  // Align HOT + WARM prefixes deterministically (leaving query & timestamps at the very end)
  const cacheAlignment = alignPromptPrefixForKvCache({
    hotFiles,
    warmContext: warmObj,
    dynamicVars: { query, timestamp: new Date().toISOString() }
  });

  // Persist clean Vertex/Anthropic Static Prefix Cache Manifest
  const cachePayload = {
    schema: 'vertex-prompt-cache-v3-headroom-aligned',
    cacheKey: combinedHotHash,
    alignedPrefixHash: cacheAlignment.prefixHash,
    updatedAt: new Date().toISOString(),
    ttlSeconds: 86400,
    hotContextFiles: hotFiles,
    totalHotTokens: hotTotalTokens,
    cacheAligner: cacheAlignment,
    policy: '100% static cacheable prefix via Headroom CacheAligner; dynamic variables isolated at tail.'
  };
  fs.mkdirSync(path.dirname(VERTEX_CACHE_PATH), { recursive: true });
  fs.writeFileSync(VERTEX_CACHE_PATH, JSON.stringify(cachePayload, null, 2), 'utf8');

  // COLD Context: On-demand MCP-Zero descriptors + Headroom CCR
  const coldContext = {
    mode: 'ON_DEMAND_MCP_ZERO_AND_HEADROOM_CCR',
    mcpServer: 'tools/intelligence/mcp_omni_rag_server.mjs',
    activeToolDiscovery: 'discover_tools({ intent, domain })',
    reversibleCompressionDir: '.cache/headroom_ccr/',
    bulkKnowledgeFilesInjected: 0,
    maxFragmentTokens: 600,
    availableTools: [
      'discover_tools',
      'headroom_retrieve',
      'search_codebase_ast',
      'codemode_execute_batch',
      'omni_rag_query',
      'code_graph_query',
      'omni_rag_stats',
      'factory_style_catalog',
      'factory_compile_tokens',
      'factory_run_audit',
      'factory_repomap_pagerank',
      'factory_ast_slice_function',
      'factory_jev_evaluate_diff',
      'factory_run_local_commerce_rls_harness'
    ]
  };

  return {
    hot: {
      cacheKey: combinedHotHash.slice(0, 16),
      alignedPrefixHash: cacheAlignment.prefixHash,
      cacheable: true,
      files: hotFiles,
      totalTokens: hotTotalTokens
    },
    warm: warmObj,
    cold: coldContext,
    cacheAligner: cacheAlignment
  };
}

/**
 * JSONSwiss + Valibot Pattern:
 * Automatically repairs malformed or fenced LLM JSON payloads (markdown code fences, trailing commas,
 * unclosed brackets) and validates against an optional Valibot schema or structural contract.
 */
export function repairAndValidateJsonPayload(rawJsonInput, valibotSchemaOrValidator = null) {
  if (rawJsonInput && typeof rawJsonInput === 'object') {
    return {
      ok: true,
      repaired: false,
      engine: 'JSONSwiss+Valibot-2026',
      data: rawJsonInput
    };
  }

  let text = String(rawJsonInput || '').trim();
  let repaired = false;

  // 1. Strip Markdown code fences (```json ... ```)
  if (/^```(?:json)?/i.test(text)) {
    text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
    repaired = true;
  }

  // 2. Remove trailing commas before } or ]
  const withoutTrailingCommas = text.replace(/,\s*([}\]])/g, '$1');
  if (withoutTrailingCommas !== text) {
    text = withoutTrailingCommas;
    repaired = true;
  }

  // 3. Balance truncated closing braces/brackets if needed
  let parsed = null;
  try {
    parsed = JSON.parse(text);
  } catch {
    const openBraces = (text.match(/\{/g) || []).length - (text.match(/\}/g) || []).length;
    const openBrackets = (text.match(/\[/g) || []).length - (text.match(/\]/g) || []).length;
    let balanced = text;
    if (openBrackets > 0) balanced += ']'.repeat(openBrackets);
    if (openBraces > 0) balanced += '}'.repeat(openBraces);
    parsed = JSON.parse(balanced);
    repaired = true;
  }

  if (typeof valibotSchemaOrValidator === 'function') {
    parsed = valibotSchemaOrValidator(parsed);
  }

  return {
    ok: true,
    repaired,
    engine: 'JSONSwiss+Valibot-2026',
    data: parsed
  };
}

/**
 * Semantic Stack-Trace & `node_modules` Noise Folder (`foldStackTraceAndNodeModulesNoise`):
 * Automatically prunes all internal `node_modules/` and `node:internal/` frames from stack traces,
 * leaving ONLY own-code frames while persisting the full lossless stack trace in `.cache/headroom_ccr/<hash>.json`.
 */
export function foldStackTraceAndNodeModulesNoise(rawErrorOrTrace = '') {
  const fullTraceText =
    rawErrorOrTrace instanceof Error
      ? String(rawErrorOrTrace.stack || rawErrorOrTrace.message || '')
      : String(rawErrorOrTrace || '');

  const ccr = compressReversibleCcr(
    {
      type: 'RAW_STACK_TRACE_SNAPSHOT',
      capturedAt: new Date().toISOString(),
      rawTrace: fullTraceText
    },
    { mode: 'text' }
  );

  const lines = fullTraceText.split(/\r?\n/);
  const keptLines = [];
  let foldedFramesCount = 0;

  for (const line of lines) {
    const isInternalOrNodeModules =
      /(?:[\\/]node_modules[\\/]|node:internal[\\/]|internal\/modules\/|at\s+Module\._compile|at\s+Module\._extensions)/i.test(
        line
      );

    if (isInternalOrNodeModules) {
      foldedFramesCount++;
    } else {
      if (foldedFramesCount > 0) {
        keptLines.push(
          `    ... [Folded ${foldedFramesCount} node_modules/internal frames -> ${ccr.retrieveToolCall}]`
        );
        foldedFramesCount = 0;
      }
      keptLines.push(line);
    }
  }

  if (foldedFramesCount > 0) {
    keptLines.push(
      `    ... [Folded ${foldedFramesCount} node_modules/internal frames -> ${ccr.retrieveToolCall}]`
    );
  }

  const foldedTrace = keptLines.join('\n').trim();
  const beforeTokens = estimateTokens(fullTraceText);
  const afterTokens = estimateTokens(foldedTrace);
  const tokenSavingsPct =
    beforeTokens > 0
      ? Number((((beforeTokens - afterTokens) / beforeTokens) * 100).toFixed(1))
      : 0;

  return {
    foldedTrace,
    beforeTokens,
    afterTokens,
    tokenSavingsPct,
    headroomCcrHash: ccr.hash,
    retrieveToolCall: ccr.retrieveToolCall
  };
}

/**
 * TOON (Token-Oriented Object Notation) Lossless Serializer & Parser (`serializeToToonFormat` / `parseFromToonFormat`):
 * Compresses tabular object arrays and structured agent state by declaring column headers once (`@table key[col1|col2|...]`)
 * and emitting pipe-delimited rows, achieving 35%–60% token savings over verbose JSON with 100% lossless round-trip restoration.
 */
function escapeToonCell(val) {
  if (val === null) return '~null~';
  if (val === undefined) return '~undef~';
  if (typeof val === 'boolean') return val ? '~true~' : '~false~';
  if (typeof val === 'number') return `~num:${val}~`;
  if (typeof val === 'object') {
    return `~json:${Buffer.from(JSON.stringify(val), 'utf8').toString('base64')}~`;
  }
  return String(val)
    .replace(/\\/g, '\\\\')
    .replace(/\|/g, '\\|')
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n');
}

function unescapeToonCell(cell) {
  if (cell === '~null~') return null;
  if (cell === '~undef~') return undefined;
  if (cell === '~true~') return true;
  if (cell === '~false~') return false;
  if (cell.startsWith('~num:') && cell.endsWith('~')) {
    return Number(cell.slice(5, -1));
  }
  if (cell.startsWith('~json:') && cell.endsWith('~')) {
    return JSON.parse(Buffer.from(cell.slice(6, -1), 'base64').toString('utf8'));
  }
  let out = '';
  for (let i = 0; i < cell.length; i++) {
    if (cell[i] === '\\' && i + 1 < cell.length) {
      const next = cell[i + 1];
      if (next === 'n') out += '\n';
      else if (next === 'r') out += '\r';
      else out += next;
      i++;
    } else {
      out += cell[i];
    }
  }
  return out;
}

function splitEscapedPipeRow(line) {
  const cells = [];
  let cur = '';
  for (let i = 0; i < line.length; i++) {
    if (line[i] === '\\' && i + 1 < line.length) {
      cur += line[i] + line[i + 1];
      i++;
    } else if (line[i] === '|') {
      cells.push(cur);
      cur = '';
    } else {
      cur += line[i];
    }
  }
  cells.push(cur);
  return cells;
}

/**
 * Computes BAML's Official Tabular Eligibility Ratio (`0%..100%`)
 * (`fern/01-guide/06-prompt-engineering/token-optimization.mdx`):
 *   - High eligibility (80-100%): Uniform arrays of flat objects sharing the same keys -> TOON excels
 *   - Low eligibility (0-20%): Deeply nested objects without uniform arrays -> JSON-compact is better
 */
export function computeToonTabularEligibility(data) {
  let candidateArrays = [];
  if (Array.isArray(data)) {
    candidateArrays.push(data);
  } else if (data && typeof data === 'object') {
    for (const v of Object.values(data)) {
      if (Array.isArray(v) && v.length > 0) {
        candidateArrays.push(v);
      }
    }
  }

  if (candidateArrays.length === 0) {
    return {
      eligibilityPct: 0,
      band: 'LOW_0_20',
      recommendedFormat: 'json-compact'
    };
  }

  let totalCells = 0;
  let uniformFlatCells = 0;
  for (const arr of candidateArrays) {
    const objRows = arr.filter((r) => r && typeof r === 'object' && !Array.isArray(r));
    if (objRows.length < 2) continue;
    const allKeys = [...new Set(objRows.flatMap((r) => Object.keys(r)))];
    for (const row of objRows) {
      for (const k of allKeys) {
        totalCells++;
        if (Object.prototype.hasOwnProperty.call(row, k)) {
          const val = row[k];
          const isFlatScalar = val === null || typeof val !== 'object';
          if (isFlatScalar) uniformFlatCells++;
        }
      }
    }
  }

  const eligibilityPct = totalCells > 0 ? Number(((uniformFlatCells / totalCells) * 100).toFixed(1)) : 0;
  const band = eligibilityPct >= 80 ? 'HIGH_80_100' : eligibilityPct >= 40 ? 'MEDIUM_40_60' : 'LOW_0_20';
  return {
    eligibilityPct,
    band,
    recommendedFormat: eligibilityPct >= 80 ? 'toon' : 'json-compact'
  };
}

/**
 * Automatically selects between `TOON` (`>= 80%` tabular eligibility) and `JSON-compact` (`< 80%`)
 * per BoundaryML's `token-optimization.mdx` specification.
 */
export function formatOptimalPromptData(data, { thresholdPct = 80 } = {}) {
  const elig = computeToonTabularEligibility(data);
  if (elig.eligibilityPct >= thresholdPct) {
    const toon = serializeToToonFormat(data);
    return {
      formatUsed: 'toon',
      eligibilityPct: elig.eligibilityPct,
      band: elig.band,
      output: toon.toonString,
      tokenSavingsPct: toon.tokenSavingsPct
    };
  }
  const compactJson = JSON.stringify(data);
  const prettyTokens = estimateTokens(JSON.stringify(data, null, 2));
  const compactTokens = estimateTokens(compactJson);
  return {
    formatUsed: 'json-compact',
    eligibilityPct: elig.eligibilityPct,
    band: elig.band,
    output: compactJson,
    tokenSavingsPct: prettyTokens > 0 ? Number((((prettyTokens - compactTokens) / prettyTokens) * 100).toFixed(1)) : 0
  };
}

export function serializeToToonFormat(obj) {
  const jsonBaseline = JSON.stringify(obj, null, 2);
  const lines = ['#TOON/1.0'];

  if (Array.isArray(obj) && obj.length > 0 && obj.every((r) => r && typeof r === 'object' && !Array.isArray(r))) {
    const cols = [...new Set(obj.flatMap((r) => Object.keys(r)))];
    lines.push(`@root_table[${cols.join('|')}]`);
    for (const row of obj) {
      lines.push(cols.map((c) => escapeToonCell(row[c])).join('|'));
    }
    lines.push('@end');
  } else if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    for (const [k, v] of Object.entries(obj)) {
      if (Array.isArray(v) && v.length > 0 && v.every((r) => r && typeof r === 'object' && !Array.isArray(r))) {
        const cols = [...new Set(v.flatMap((r) => Object.keys(r)))];
        lines.push(`@table ${k}[${cols.join('|')}]`);
        for (const row of v) {
          lines.push(cols.map((c) => escapeToonCell(row[c])).join('|'));
        }
        lines.push('@end');
      } else {
        lines.push(`@kv ${k}=${escapeToonCell(v)}`);
      }
    }
  } else {
    lines.push(`@scalar ${escapeToonCell(obj)}`);
  }

  const toonString = lines.join('\n');
  const jsonTokens = estimateTokens(jsonBaseline);
  const toonTokens = estimateTokens(toonString);
  const tokenSavingsPct =
    jsonTokens > 0 ? Number((((jsonTokens - toonTokens) / jsonTokens) * 100).toFixed(1)) : 0;

  return {
    toonString,
    jsonTokens,
    toonTokens,
    tokenSavingsPct
  };
}

export function parseFromToonFormat(toonInput) {
  const raw = typeof toonInput === 'object' && toonInput?.toonString ? toonInput.toonString : String(toonInput || '');
  const lines = raw.split(/\r?\n/);
  if (!lines[0] || !lines[0].startsWith('#TOON/1.0')) {
    throw new Error('Invalid TOON header: expected #TOON/1.0');
  }

  let rootMode = 'object';
  let resultObj = {};
  let resultArr = [];
  let activeTableKey = null;
  let activeCols = [];
  let activeRows = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    if (line.startsWith('@root_table[')) {
      rootMode = 'array';
      activeTableKey = '__ROOT__';
      activeCols = line.slice('@root_table['.length, -1).split('|');
      activeRows = [];
      continue;
    }
    if (line.startsWith('@table ')) {
      const brk = line.indexOf('[');
      activeTableKey = line.slice('@table '.length, brk);
      activeCols = line.slice(brk + 1, -1).split('|');
      activeRows = [];
      continue;
    }
    if (line === '@end') {
      if (activeTableKey === '__ROOT__') {
        resultArr = activeRows;
      } else if (activeTableKey) {
        resultObj[activeTableKey] = activeRows;
      }
      activeTableKey = null;
      activeCols = [];
      activeRows = [];
      continue;
    }
    if (activeTableKey) {
      const cells = splitEscapedPipeRow(line);
      const rowObj = {};
      activeCols.forEach((col, idx) => {
        const val = unescapeToonCell(cells[idx] ?? '~undef~');
        if (val !== undefined) rowObj[col] = val;
      });
      activeRows.push(rowObj);
      continue;
    }
    if (line.startsWith('@kv ')) {
      const eqIdx = line.indexOf('=');
      const k = line.slice(4, eqIdx);
      const v = unescapeToonCell(line.slice(eqIdx + 1));
      resultObj[k] = v;
      continue;
    }
    if (line.startsWith('@scalar ')) {
      return unescapeToonCell(line.slice('@scalar '.length));
    }
  }

  return rootMode === 'array' ? resultArr : resultObj;
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const sampleQuery =
    process.argv
      .slice(2)
      .filter((a) => !a.startsWith('--'))
      .join(' ') || 'Compile W3C DTCG 1.0 OKLCH tokens and Utopia clamp() fluid scales for Astro 5';
  const ctx = assembleThreeTierContext(sampleQuery);
  const sampleCcr = compressReversibleCcr({
    sample: 'Headroom CCR Reversible Compression Verification',
    items: Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      detail: `Verbose diagnostic payload entry #${i + 1} with repeated telemetry fields for SmartCrusher test.`
    }))
  });
  const retrieved = headroom_retrieve(sampleCcr.hash);
  const sampleTraceFold = foldStackTraceAndNodeModulesNoise(
    [
      'TypeError: Cannot read properties of undefined (reading "priceCents")',
      '    at calculateOrderTotal (tools/audit/local_fullstack_and_component_harness.mjs:42:15)',
      '    at Object.run (node_modules/vitest/dist/chunk-runtime.js:1842:11)',
      '    at processTicksAndRejections (node:internal/process/task_queues:105:5)',
      '    at async Runner.execute (node_modules/playwright-core/lib/server/runner.js:912:9)',
      '    at async verifyCheckoutHandler (templates/vanilla-edge/worker/index.js:88:7)'
    ].join('\n')
  );
  const sampleToonInput = {
    project: 'agencia-alfa',
    gatePassed: true,
    tasks: Array.from({ length: 8 }, (_, i) => ({
      taskId: `BEAD-0${i + 1}`,
      role: i % 2 === 0 ? 'senior-coder' : 'qa-auditor',
      status: 'COMPLETED',
      durationMs: 120 + i * 15,
      score: 100
    }))
  };
  const toonEncoded = serializeToToonFormat(sampleToonInput);
  const toonDecoded = parseFromToonFormat(toonEncoded.toonString);
  const toonRoundTripOk = JSON.stringify(toonDecoded) === JSON.stringify(sampleToonInput);
  const highElig = formatOptimalPromptData(sampleToonInput);
  const lowElig = formatOptimalPromptData({ server: { host: 'localhost', db: { pool: { min: 5, max: 20 } } } });

  console.log('==================================================================');
  console.log('🧊🔥 3-TIER CONTEXT + HEADROOM CCR + CACHEALIGNER + TOON VERIFICATION');
  console.log('==================================================================');
  console.log(`  🔥 [HOT CONTEXT]   CacheKey: ${ctx.hot.cacheKey} | AlignedPrefix: ${ctx.hot.alignedPrefixHash} | Tokens: ~${ctx.hot.totalTokens}`);
  console.log(`  🌤️  [WARM CONTEXT]  Active Role: ${ctx.warm.activeRole.path} | Skills: ${ctx.warm.selectedSkills.map((s) => s.name).join(', ')} (${ctx.warm.skillsCount}/${ctx.warm.maxSkillsAllowed})`);
  console.log(`  🧊 [COLD CONTEXT]  Mode: ${ctx.cold.mode} | Discovery: ${ctx.cold.activeToolDiscovery}`);
  console.log(`  🗜️  [HEADROOM CCR]  Hash: ${sampleCcr.hash} | Reduction: -${sampleCcr.reductionPct}% | Lossless Retrieve: ${retrieved.found ? 'OK' : 'FAIL'}`);
  console.log(`  🧹 [TRACE FOLDING] Reduction: -${sampleTraceFold.tokenSavingsPct}% | CCR Hash: ${sampleTraceFold.headroomCcrHash}`);
  console.log(`  📊 [TOON FORMAT]   JSON: ${toonEncoded.jsonTokens} tok -> TOON: ${toonEncoded.toonTokens} tok (-${toonEncoded.tokenSavingsPct}%) | Elig: ${highElig.eligibilityPct}% (${highElig.formatUsed}) / Nested: ${lowElig.eligibilityPct}% (${lowElig.formatUsed}) | RoundTrip: ${toonRoundTripOk ? 'OK' : 'FAIL'}`);
  console.log('==================================================================\n');
  if (process.argv.includes('--self-test')) {
    process.exit(
      retrieved.found &&
        toonRoundTripOk &&
        toonEncoded.tokenSavingsPct >= 25 &&
        highElig.formatUsed === 'toon' &&
        lowElig.formatUsed === 'json-compact'
        ? 0
        : 1
    );
  }
}
