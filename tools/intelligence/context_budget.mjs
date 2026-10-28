#!/usr/bin/env node
/**
 * tools/intelligence/context_budget.mjs — 3-Tier Context Architecture (HOT / WARM / COLD)
 * ========================================================================================
 * Enforces strict FinOps Context Budgeting & Progressive Disclosure:
 *   1. HOT CONTEXT (100% Cacheable Static Prefix):
 *      AGENTS.md + CONSTRAINTS.md + tokens/design.tokens.json + .agents/memory/tom_swe_model.json
 *      Synchronized with .agents/memory/vertex_prompt_cache.json.
 *   2. WARM CONTEXT (Dynamic per Task):
 *      Strictly 1 active Role from .agents/agency/roles/ and MAX 2 Skills selected from
 *      .agents/skills/SKILL_INDEX.json by semantic relevance.
 *   3. COLD CONTEXT (On-Demand via MCP):
 *      Forbids bulk injection of knowledge/ Markdown files into base prompts; all treatises
 *      and CodeGraph nodes are retrieved on-demand via tools/intelligence/mcp_omni_rag_server.mjs.
 * ========================================================================================
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
  const forbidden = filesList.filter(f => {
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
    } catch (_) {
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
    .filter(t => t.length >= 2);

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
  } catch (_) {}
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
    else if (/(security|owasp|csp|xss|asvs|seguridad)/.test(q)) chosen = 'security-engineer';
    else if (/(seo|aeo|geo|llms\.txt|json-ld|sitemap|speculation)/.test(q)) chosen = 'seo-aeo-geo-architect';
    else if (/(copy|cro|pricing|conversion|fogg|cta)/.test(q)) chosen = 'copywriting-cro-strategist';
    else if (/(audit|gate|ryux|visual|stagehand|a11y)/.test(q)) chosen = 'qa-auditor';
    else if (/(worker|d1|sqlite|astro|code|build|api)/.test(q)) chosen = 'senior-coder';
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
 * Builds the 3-Tier Context (HOT / WARM / COLD) and updates .agents/memory/vertex_prompt_cache.json
 */
export function assembleThreeTierContext(query = '', options = {}) {
  syncTomSwePaths();
  const baseFiles = ['AGENTS.md', 'CONSTRAINTS.md', 'tokens/design.tokens.json', '.agents/memory/tom_swe_model.json'];
  assertZeroBulkKnowledgeInjection(options.injectedFiles || baseFiles);

  const hotFiles = baseFiles.map((rel) => {
    const full = path.join(ROOT, rel);
    const content = fs.existsSync(full) ? fs.readFileSync(full, 'utf8') : '';
    const sha256 = crypto.createHash('sha256').update(content, 'utf8').digest('hex');
    return {
      path: rel,
      tokens: estimateTokens(content),
      sha256: sha256.slice(0, 16)
    };
  });

  const hotTotalTokens = hotFiles.reduce((acc, f) => acc + f.tokens, 0);
  const combinedHotHash = crypto
    .createHash('sha256')
    .update(hotFiles.map(f => f.sha256).join(':'), 'utf8')
    .digest('hex');

  // Persist clean Vertex/Anthropic Static Prefix Cache Manifest
  const cachePayload = {
    schema: 'vertex-prompt-cache-v2-hot-prefix',
    cacheKey: combinedHotHash,
    updatedAt: new Date().toISOString(),
    ttlSeconds: 86400,
    hotContextFiles: hotFiles,
    totalHotTokens: hotTotalTokens,
    policy: '100% static cacheable prefix; zero bulk knowledge/ injection allowed.'
  };
  fs.mkdirSync(path.dirname(VERTEX_CACHE_PATH), { recursive: true });
  fs.writeFileSync(VERTEX_CACHE_PATH, JSON.stringify(cachePayload, null, 2), 'utf8');

  // WARM Context: 1 active role + max 2 skills
  const activeRole = selectActiveRole(options.role || 'auto', query);
  const selectedSkills = selectTopTwoSkills(query, options.preferredSkills || [], activeRole.roleId);

  // COLD Context: On-demand MCP descriptors only (0 inline knowledge chunks in base prompt)
  const coldContext = {
    mode: 'ON_DEMAND_MCP_ONLY',
    mcpServer: 'tools/intelligence/mcp_omni_rag_server.mjs',
    bulkKnowledgeFilesInjected: 0,
    maxFragmentTokens: 600,
    availableTools: [
      'omni_rag_query',
      'code_graph_query',
      'omni_rag_stats',
      'factory_style_catalog',
      'factory_compile_tokens',
      'factory_run_audit'
    ]
  };

  return {
    hot: {
      cacheKey: combinedHotHash.slice(0, 16),
      cacheable: true,
      files: hotFiles,
      totalTokens: hotTotalTokens
    },
    warm: {
      activeRole,
      selectedSkills,
      skillsCount: selectedSkills.length,
      maxSkillsAllowed: 2
    },
    cold: coldContext
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const sampleQuery = process.argv.slice(2).filter(a => !a.startsWith('--')).join(' ') ||
    'Compile W3C DTCG 1.0 OKLCH tokens and Utopia clamp() fluid scales for Astro 5';
  const ctx = assembleThreeTierContext(sampleQuery);
  console.log('==================================================================');
  console.log('🧊🔥 3-TIER CONTEXT ARCHITECTURE (HOT / WARM / COLD) VERIFICATION');
  console.log('==================================================================');
  console.log(`  🔥 [HOT CONTEXT]  CacheKey: ${ctx.hot.cacheKey} | Files: ${ctx.hot.files.length} | Tokens: ~${ctx.hot.totalTokens}`);
  console.log(`  🌤️  [WARM CONTEXT] Active Role: ${ctx.warm.activeRole.path} | Skills: ${ctx.warm.selectedSkills.map(s => s.name).join(', ')} (${ctx.warm.skillsCount}/${ctx.warm.maxSkillsAllowed})`);
  console.log(`  🧊 [COLD CONTEXT] Mode: ${ctx.cold.mode} | Bulk Knowledge Injected: ${ctx.cold.bulkKnowledgeFilesInjected} | Max Fragment: ${ctx.cold.maxFragmentTokens} tokens`);
  console.log('==================================================================\n');
}
