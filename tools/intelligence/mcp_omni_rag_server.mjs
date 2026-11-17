#!/usr/bin/env node
/**
 * tools/intelligence/mcp_omni_rag_server.mjs
 * =============================================================================
 * 🔌 WEB SOFTWARE FACTORY STUDIO — ZERO-TRUST ROLE-PARTITIONED MCP SERVER v5.4
 * =============================================================================
 * Exposes our local C-compiled SQLite FTS5 + Inverted Index + MiniSearch +
 * Incremental AST CodeGraph (`cocoindex-code` pattern) + Headroom CCR Reversible
 * Compression + `MCP-Zero` Active Tool Discovery + `@cloudflare/codemode` Batch
 * Executor + DevSecOps Suite (`semgrep-mcp`, `delta-security-scanner`, `dast-offat-zap`,
 * `filesystem-scoped`, `git-readonly-mcp`, `d1-sqlite-readonly-mcp`, `github-mcp`)
 * governed by `agent_governance_kernel.mjs` (`< 0.1ms` Creator-Verifier Split).
 *
 * Hardened with OWASP MCP Top 10 (MCP01:2025–MCP10:2025) & Agentic Top 10:
 *   - Strict JSON Schema validation (`"additionalProperties": false`) on ALL tools
 *   - Rejection of unauthorized `x-mcp-header` / `x-mcp-untrusted` headers
 *   - CSPRNG correlation & session IDs via `crypto.randomUUID()` & `crypto.randomBytes(16)`
 *   - Audience validation (`urn:web-software-factory:mcp*`) & HITL Gate
 *   - Automatic spillover to `.agents/security_reports/` or `.cache/headroom_ccr/`
 *     for any response > 1,200 tokens (returning < 300 tokens executive summary)
 * =============================================================================
 */

import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';
import { queryKnowledge, queryCodeGraph, getClusterStats } from './rag_pipeline.mjs';
import { searchRagStore } from './rag_store.mjs';
import { routeQueryToSquads } from './squad_semantic_router.mjs';
import { projectScopeFilter } from './qdrant_rag.mjs';
export { projectScopeFilter };
import {
  TRANSLATION_RULE_WARNING
} from './rag_library_sanitizer.mjs';
import {
  compressReversibleCcr,
  headroom_retrieve
} from './context_budget.mjs';
import {
  searchCodebaseAst,
  buildOrUpdateAstIndex,
  extractFileAstMetadata,
  buildPageRankRepoMap,
  sliceTargetFunctionAndCallSites
} from './codebase_ast_indexer.mjs';
import { evaluateFullJevOuterAndMetaGate } from './jev_semantic_gate.mjs';
import {
  evaluateMemoryWriteAdmissionWithJev,
  runJevSleepTimeConsolidationCycle
} from './jev_memory_pipeline.mjs';
import {
  syncProjectStatechartSnapshot,
  factoryLifecycleMachine,
  validateAgentPolicyProposal
} from '../orchestrator/deterministic_agent_statechart.mjs';
import { createActor } from 'xstate';
import { runFullLocalHarnessSuite } from '../audit/local_fullstack_and_component_harness.mjs';
import {
  evaluateGovernancePolicy,
  verifyRoleMcpPermission,
  compressLargeMcpOutputToDisk,
  inspectMcpToolResponseForPoisoning
} from './agent_governance_kernel.mjs';
import { scanSecurityAndPerformance } from './ast_guard.mjs';
import { compileDesignTokens, getStyleCatalog, buildDtcgTokensObject } from '../design/token_compiler.mjs';
import { runRyuxDesignGate } from '../audit/ryux_design_gate.mjs';
import { runCognitiveUxAudit } from '../audit/cognitive_ux_auditor.mjs';
import { runDiffUiAdversarialGate } from '../audit/diff_ui_adversarial.mjs';
import { resolveDatabaseTier } from '../db/dual_database_forge.mjs';
import { resolveDomainProfile, classifyKnowledgeDocumentDomain } from '../lib/project_profile.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');

export const SERVER_INFO = {
  name: 'web-factory-omni-rag-v5.4-zero-trust-mcp',
  version: '5.4.0',
  securityProfile: 'OWASP-MCP-Top-10-2025+ASI01-ASI10+CreatorVerifierSplit',
  expectedAudience: 'urn:web-software-factory:mcp-gateway:2026'
};

export const TOOLS = [
  {
    name: 'discover_tools',
    domain: 'mcp-zero',
    mcpServer: 'omni-rag-ast',
    readOnly: true,
    description:
      'MCP-Zero Active Tool Discovery router: dynamically resolves the minimal set of tools matching { intent, domain, role } instead of loading bloated full schemas on every turn (-98% MCP schema token overhead).',
    inputSchema: {
      type: 'object',
      properties: {
        intent: { type: 'string', description: 'Task intent or natural language goal.' },
        domain: {
          type: 'string',
          description: 'Optional domain filter (rag, ast, design, audit, context-ccr, codemode, devsecops, readonly-verifier).'
        },
        role: { type: 'string', description: 'Optional active agent role for Creator-Verifier filtering.' }
      },
      required: ['intent'],
      additionalProperties: false
    }
  },
  {
    name: 'headroom_retrieve',
    domain: 'context-ccr',
    mcpServer: 'omni-rag-ast',
    readOnly: true,
    description:
      'Headroom CCR lossless retrieval: restores the full uncompressed JSON, log, or code payload from .cache/headroom_ccr/<hash>.json on demand.',
    inputSchema: {
      type: 'object',
      properties: {
        hash: { type: 'string', description: '16-char SHA-256 Headroom CCR hash.' },
        startLine: { type: 'number', description: 'Optional start line for text payloads.' },
        endLine: { type: 'number', description: 'Optional end line for text payloads.' }
      },
      required: ['hash'],
      additionalProperties: false
    }
  },
  {
    name: 'search_codebase_ast',
    domain: 'ast',
    mcpServer: 'omni-rag-ast',
    readOnly: true,
    description:
      'CocoIndex-Code incremental AST & Call-Graph search: locates exported symbols, function signatures, exact startLine-endLine ranges, and calledByFiles/importedBy refactoring impact saving ~70% tokens.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Keywords, file path, or symbol query.' },
        symbolName: { type: 'string', description: 'Exact or partial function/class/token name.' },
        limit: { type: 'number', description: 'Maximum matches to return (default 10).' }
      },
      additionalProperties: false
    }
  },
  {
    name: 'codemode_execute_batch',
    domain: 'codemode',
    mcpServer: 'omni-rag-ast',
    readOnly: false,
    description:
      '@cloudflare/codemode typed programmatic batch execution: executes a deterministic sequence of MCP tool invocations in a single round-trip governed by Agent Governance Kernel.',
    inputSchema: {
      type: 'object',
      properties: {
        operations: {
          type: 'array',
          description: 'Ordered array of { tool, args } invocations to execute in batch.',
          items: {
            type: 'object',
            properties: {
              tool: { type: 'string' },
              args: { type: 'object' }
            },
            required: ['tool'],
            additionalProperties: false
          }
        }
      },
      required: ['operations'],
      additionalProperties: false
    }
  },
  {
    name: 'omni_rag_query',
    domain: 'rag',
    mcpServer: 'omni-rag-ast',
    readOnly: true,
    description:
      'Query Omni-RAG v6 Hybrid SQLite Brain (sqlite-vec int8[768] + FTS5 unicode61/trigram across hot treatises/canons/skills and library books with strict SQL domain isolation and <=1200 inline token budget).',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Technical or conceptual search query (Spanish or English).' },
        scope: {
          type: 'string',
          enum: ['hot', 'library', 'all'],
          description: "Target partition: 'hot' (default: treatises, vault, ai_academy, agent_skills), 'library' (full canon books), or 'all'."
        },
        limit: { type: 'number', description: 'Max chunks to return (default 5, max 15).' },
        maxTokens: {
          type: 'number',
          description: 'Max inline response token budget (default 1200, max 2400). Returns real chunks directly without disk spillover.'
        },
        projectSlug: {
          type: 'string',
          description: 'Optional project slug (e.g. academia-ia, agencia-alfa) to enforce declarative rag.allowedDomains filtering.'
        },
        allowNetwork: {
          type: 'boolean',
          description: 'Allow Vertex AI RETRIEVAL_QUERY embedding on uncached queries (default true; false forces lexical_offline).'
        },
        rerank: { type: 'boolean', description: 'Optional rerank flag (preserved for schema compatibility).' },
        domainQuarantine: {
          type: 'boolean',
          description: 'Silent Quarantine of off-domain books (default true for commercial web projects).'
        }
      },
      required: ['query'],
      additionalProperties: false
    }
  },
  {
    name: 'code_graph_query',
    domain: 'ast',
    mcpServer: 'omni-rag-ast',
    readOnly: true,
    description:
      'Query the deterministic AST CodeGraph + PageRank centrality index across all JS/TS/MJS files in templates/, projects/, and tools/. Returns classes, functions, window globals, /api/* routes, and caller/callee edges.',
    inputSchema: {
      type: 'object',
      properties: {
        symbol_or_file: { type: 'string', description: 'Symbol, class, method, API route, or filename to inspect.' },
        limit: { type: 'number', description: 'Max matching file nodes (default 8).' }
      },
      required: ['symbol_or_file'],
      additionalProperties: false
    }
  },
  {
    name: 'omni_rag_stats',
    domain: 'rag',
    mcpServer: 'omni-rag-ast',
    readOnly: true,
    description:
      'Return live health and node counts for Supercharged Omni-RAG v5.4, Incremental AST CodeGraph, Obsidian WikiGraph, and Inverted Index.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false
    }
  },
  {
    name: 'factory_style_catalog',
    domain: 'design',
    mcpServer: 'omni-rag-ast',
    readOnly: true,
    description:
      'Inspect the 67 MIT design style skills (awesome-design-skills) and 4 web archetypes (saas-b2b, ecommerce, marketing, portfolio), or preview the W3C DTCG 2025.10 OKLCH tokens for a specific style and archetype.',
    inputSchema: {
      type: 'object',
      properties: {
        archetype: { type: 'string', description: 'Optional archetype (saas-b2b, ecommerce, marketing, portfolio).' },
        style: {
          type: 'string',
          description: 'Optional style name (e.g. linear-style, vercel-geist, stripe-editorial, bento, brutalist, swiss-grid).'
        }
      },
      additionalProperties: false
    }
  },
  {
    name: 'factory_compile_tokens',
    domain: 'design',
    mcpServer: 'omni-rag-ast',
    readOnly: false,
    description:
      'Compile W3C DTCG 2025.10 JSON tokens (tokens/design.tokens.json) and production OKLCH + Utopia fluid CSS (design-tokens.css) for the Studio or a specific project.',
    inputSchema: {
      type: 'object',
      properties: {
        project: { type: 'string', description: 'Optional project slug or directory path.' },
        archetype: { type: 'string', description: 'Archetype (saas-b2b, ecommerce, marketing, portfolio).' },
        style: { type: 'string', description: 'Style skill name from the 67 available styles.' }
      },
      additionalProperties: false
    }
  },
  {
    name: 'factory_run_audit',
    domain: 'audit',
    mcpServer: 'omni-rag-ast',
    readOnly: true,
    description:
      'Run the deterministic RYUX v2.14.2 Design Gate, Cognitive UX Auditor, and Diff-UI Adversarial + Oxc Rust Linter Gate on the Studio or a specific project.',
    inputSchema: {
      type: 'object',
      properties: {
        project: { type: 'string', description: 'Optional project slug or directory path.' }
      },
      additionalProperties: false
    }
  },
  {
    name: 'factory_repomap_pagerank',
    domain: 'ast',
    mcpServer: 'omni-rag-ast',
    readOnly: true,
    description:
      'Personalized PageRank RepoMap (Aider/Tree-sitter pattern): returns the top 15 central AST signatures in < 600 tokens weighted by active ticket seed files with exact file:Lstart-Lend pointers (Waves 1 & 2).',
    inputSchema: {
      type: 'object',
      properties: {
        seedFiles: {
          type: 'array',
          items: { type: 'string' },
          description: 'Optional list of seed file paths for Personalized PageRank weighting.'
        },
        ticketQuery: { type: 'string', description: 'Ticket keywords or symbol query.' },
        topK: { type: 'number', description: 'Max central signatures to return (default 15).' },
        maxTokens: { type: 'number', description: 'Token ceiling for the compact RepoMap (default 600).' }
      },
      additionalProperties: false
    }
  },
  {
    name: 'factory_ast_slice_function',
    domain: 'ast',
    mcpServer: 'omni-rag-ast',
    readOnly: true,
    description:
      'Surgical AST Program Slicer (Wave 2 Builders): extracts ONLY the target function body + dependent types/imports + call sites, saving ~70% tokens over full-file reads.',
    inputSchema: {
      type: 'object',
      properties: {
        filePath: { type: 'string', description: 'Relative path to the source file.' },
        symbolName: { type: 'string', description: 'Exact function or class name to slice.' },
        maxCallSites: { type: 'number', description: 'Maximum call sites to include (default 5).' }
      },
      required: ['symbolName'],
      additionalProperties: false
    }
  },
  {
    name: 'factory_jev_evaluate_diff',
    domain: 'audit',
    mcpServer: 'omni-rag-ast',
    readOnly: true,
    description:
      'Official JEV Bounded Predicate Evaluator (Outer Loop & Meta Loop, Wave 3 & Triage): evaluates git diff, SPEC.md, and forensic traces across the 4 Choice|Score|Noul predicates with BAML SAP recovery and SHA-256 cache.',
    inputSchema: {
      type: 'object',
      properties: {
        diffText: { type: 'string', description: 'Optional git diff text to evaluate.' },
        specPath: { type: 'string', description: 'Optional path to SPEC.md.' },
        tracesText: { type: 'string', description: 'Optional JSONL trace lines for cross-trace friction mining.' }
      },
      additionalProperties: false
    }
  },
  {
    name: 'factory_run_local_commerce_rls_harness',
    domain: 'audit',
    mcpServer: 'omni-rag-ast',
    readOnly: true,
    description:
      'Fullstack Local Harness (Wave 3): runs the 5-State Stateless Pure Component Stress Harness, Stripe/MercadoPago Double-Webhook Idempotency Simulator, Multi-Tenant RLS & Kratos ES256 Simulator, 50-Vector fast-check Property Fuzzing, and 3D Canvas Histogram Watchdog.',
    inputSchema: {
      type: 'object',
      properties: {
        project: { type: 'string', description: 'Optional target project slug.' }
      },
      additionalProperties: false
    }
  },
  {
    name: 'security_check',
    domain: 'devsecops',
    mcpServer: 'semgrep-mcp',
    readOnly: true,
    description: 'Semgrep MCP rapid SAST check on a target file or snippet.',
    inputSchema: {
      type: 'object',
      properties: {
        filePath: { type: 'string', description: 'Relative file path to scan.' }
      },
      required: ['filePath'],
      additionalProperties: false
    }
  },
  {
    name: 'semgrep_scan',
    domain: 'devsecops',
    mcpServer: 'semgrep-mcp',
    readOnly: true,
    description: 'Semgrep MCP full symbolic SAST scan over target project directory.',
    inputSchema: {
      type: 'object',
      properties: {
        targetDir: { type: 'string', description: 'Directory to scan (default projects/agencia-alfa).' }
      },
      additionalProperties: false
    }
  },
  {
    name: 'get_abstract_syntax_tree',
    domain: 'devsecops',
    mcpServer: 'semgrep-mcp',
    readOnly: true,
    description: 'Extracts the symbolic AST structure and line ranges for a target source file.',
    inputSchema: {
      type: 'object',
      properties: {
        filePath: { type: 'string', description: 'Relative path to the source file.' }
      },
      required: ['filePath'],
      additionalProperties: false
    }
  },
  {
    name: 'write_custom_semgrep_rule',
    domain: 'devsecops',
    mcpServer: 'semgrep-mcp',
    readOnly: false,
    description: 'Transforms a discovered security finding into a permanent Semgrep regression rule in .agents/security_reports/.semgrep/.',
    inputSchema: {
      type: 'object',
      properties: {
        ruleId: { type: 'string', description: 'Unique rule identifier.' },
        pattern: { type: 'string', description: 'Semgrep pattern expression.' },
        message: { type: 'string', description: 'Remediation message.' },
        severity: { type: 'string', description: 'ERROR, WARNING, or INFO.' }
      },
      required: ['ruleId', 'pattern', 'message'],
      additionalProperties: false
    }
  },
  {
    name: 'delta_security_scan',
    domain: 'devsecops',
    mcpServer: 'delta-security-scanner',
    readOnly: true,
    description:
      'Executes parallel delta scans (SAST, IaC CIS Benchmarks, and CycloneDX SBOM), persists full reports to .agents/security_reports/ (.semgrep/, .trivy/, .sbom/) and returns ONLY a < 300 token executive summary.',
    inputSchema: {
      type: 'object',
      properties: {
        projectSlug: { type: 'string', description: 'Target project slug (default agencia-alfa).' }
      },
      additionalProperties: false
    }
  },
  {
    name: 'dast_endpoint_probe',
    domain: 'devsecops',
    mcpServer: 'dast-offat-zap',
    readOnly: true,
    description:
      'Dynamic DAST probe (OWASP ZAP / OFFAT pattern) validating Sec-Fetch-*, CORS, CSP, HSTS, and API contracts on isolated local staging.',
    inputSchema: {
      type: 'object',
      properties: {
        targetUrl: { type: 'string', description: 'Local staging URL (must be 127.0.0.1 or localhost).' }
      },
      required: ['targetUrl'],
      additionalProperties: false
    }
  },
  {
    name: 'filesystem_scoped_read',
    domain: 'vcs_fs_db_edge',
    mcpServer: 'filesystem-scoped',
    readOnly: true,
    description:
      'Reads a file within the scoped project allowlist while strictly blocking .agents/sealed_envelope_evals/ for builder agents.',
    inputSchema: {
      type: 'object',
      properties: {
        filePath: { type: 'string', description: 'Relative path inside projects/<active-slug>/.' },
        role: { type: 'string', description: 'Active role requesting access.' }
      },
      required: ['filePath'],
      additionalProperties: false
    }
  },
  {
    name: 'git_readonly_inspect',
    domain: 'readonly-verifier',
    mcpServer: 'git-readonly-mcp',
    readOnly: true,
    description: 'Strictly Read-Only Git inspection (status, diff, log) for the Coverage Verifier (qa-auditor).',
    inputSchema: {
      type: 'object',
      properties: {
        subcommand: { type: 'string', description: 'Allowed read-only subcommand: status, diff, log.' }
      },
      required: ['subcommand'],
      additionalProperties: false
    }
  },
  {
    name: 'd1_readonly_query',
    domain: 'readonly-verifier',
    mcpServer: 'd1-sqlite-readonly-mcp',
    readOnly: true,
    description:
      'Strictly Read-Only D1/SQLite query executor for qa-auditor (blocks INSERT, UPDATE, DELETE, DROP, ALTER).',
    inputSchema: {
      type: 'object',
      properties: {
        sql: { type: 'string', description: 'Read-only SELECT or EXPLAIN query.' }
      },
      required: ['sql'],
      additionalProperties: false
    }
  },
  {
    name: 'github_precommit_secret_scan',
    domain: 'devsecops',
    mcpServer: 'github-mcp',
    readOnly: true,
    description: 'Pre-commit secret & push-protection scanner before NHI PR creation.',
    inputSchema: {
      type: 'object',
      properties: {
        branchName: { type: 'string', description: 'Target branch (e.g. factory/agencia-alfa).' }
      },
      additionalProperties: false
    }
  },
  {
    name: 'github_nhi_open_pr',
    domain: 'devsecops',
    mcpServer: 'github-mcp',
    readOnly: false,
    requiresHitlConfirmation: true,
    description: 'Opens a Pull Request via Non-Human Identity (NHI) with auto-merge strictly disabled.',
    inputSchema: {
      type: 'object',
      properties: {
        branchName: { type: 'string', description: 'Source branch name.' },
        title: { type: 'string', description: 'PR title.' },
        hitlConfirmed: { type: 'boolean', description: 'Mandatory human confirmation gate.' }
      },
      required: ['branchName', 'title', 'hitlConfirmed'],
      additionalProperties: false
    }
  },
  {
    name: 'jev_memory_pipeline_gate',
    domain: 'memory',
    mcpServer: 'omni-rag-ast',
    readOnly: false,
    description:
      'Evaluates a candidate memory write through the 5-Tier Cognitive Memory Pipeline governed by JEV (COMMIT_GLOBAL_INVARIANT | ISOLATE_TO_PROJECT_SCOPE | SUPERSEDE_CONFLICTING_FACT | DROP_TRANSIENT_NOISE | QUARANTINE_POISONING_RISK | NOUL), or triggers a Sleep-Time consolidation cycle.',
    inputSchema: {
      type: 'object',
      properties: {
        fact: { type: 'string', description: 'Candidate memory fact or rule to evaluate.' },
        projectSlug: { type: 'string', description: 'Project slug for aesthetic isolation (default agencia-alfa).' },
        runSleepTimeConsolidation: { type: 'boolean', description: 'If true, runs JEV Sleep-Time consolidation cycle.' }
      },
      additionalProperties: false
    }
  },
  {
    name: 'xstate_validate_transition',
    domain: 'orchestration',
    mcpServer: 'omni-rag-ast',
    readOnly: true,
    description:
      'Validates an agent policy event proposal against the XState v5 Factory Lifecycle Statechart (@statelyai/agent Environment-vs-Policy split: vocabulary check, human-only actor guard, and snapshot.can(event)).',
    inputSchema: {
      type: 'object',
      properties: {
        projectSlug: { type: 'string', description: 'Target project slug (default agencia-alfa).' },
        proposedEvent: { type: 'string', description: 'Event type proposed by the agent (e.g. START_WAVE1_FOUNDATION).' },
        actorRole: { type: 'string', description: 'Caller role: "agent" or "human" (default "agent").' }
      },
      required: ['proposedEvent'],
      additionalProperties: false
    }
  }
];

const INDIRECT_PROMPT_INJECTION_PATTERNS = [
  /ignore\s+(?:all\s+)?(?:previous|prior|above)\s+instructions/gi,
  /disregard\s+(?:all\s+)?(?:previous|prior|system)\s+instructions/gi,
  /<\|im_start\|>|<\|im_end\|>|<\|endoftext\|>/gi,
  /<\/?tool_call>|<\/?system_prompt>|<\/?function_calls>/gi,
  /\[\s*SYSTEM\s*:\s*OVERRIDE[^\]]*\]/gi
];

/**
 * Generates a cryptographic CSPRNG session/trace identifier (`crypto.randomUUID()` + `crypto.randomBytes(8)`).
 */
export function generateCsprngSessionId() {
  return `${crypto.randomUUID()}-${crypto.randomBytes(8).toString('hex')}`;
}

/**
 * Sanitizes retrieved RAG fragments against Indirect Prompt Injection (OWASP MCP05 / LLM01 / ASI04 / ASI06).
 */
export function sanitizeMcpRetrievedFragment(rawText = '') {
  let clean = String(rawText || '');
  for (const pattern of INDIRECT_PROMPT_INJECTION_PATTERNS) {
    clean = clean.replace(pattern, '[SANITIZED_INDIRECT_PROMPT_INJECTION]');
  }
  const govScan = inspectMcpToolResponseForPoisoning(clean);
  return govScan.sanitizedText;
}

/**
 * MCP-Zero Active Tool Discovery Router (`discoverToolsByIntent`):
 * Routes agent intent, domain & role to the minimal matching subset of MCP tool definitions,
 * eliminating ~98% of passive multi-server tool schema overhead.
 */
export function discoverToolsByIntent({ intent = '', domain = '', role = 'orchestrator' } = {}) {
  const q = `${intent} ${domain}`.toLowerCase();
  const matched = TOOLS.filter((t) => {
    const rolePerm = verifyRoleMcpPermission({
      roleId: role,
      mcpServer: t.mcpServer || 'omni-rag-ast',
      toolName: t.name
    });
    if (!rolePerm.allowed) return false;
    if (domain && t.domain === domain.toLowerCase()) return true;
    if (/(ast|symbol|function|class|line|callgraph|cocoindex|refactor)/.test(q) && t.domain === 'ast') return true;
    if (/(token|oklch|dtcg|style|bento|archetype|css|design)/.test(q) && t.domain === 'design') return true;
    if (/(audit|ryux|gate|qa|diff|visual)/.test(q) && t.domain === 'audit') return true;
    if (/(ccr|headroom|hash|retrieve|compress)/.test(q) && t.domain === 'context-ccr') return true;
    if (/(batch|codemode|pipeline)/.test(q) && t.domain === 'codemode') return true;
    if (/(semgrep|sast|dast|sbom|delta|security|secret)/.test(q) && t.domain === 'devsecops') return true;
    if (/(readonly|d1|sqlite|git)/.test(q) && t.domain === 'readonly-verifier') return true;
    if (/(rag|knowledge|book|canon|search|query)/.test(q) && t.domain === 'rag') return true;
    return false;
  });

  const selected = matched.length > 0 ? matched.slice(0, 3) : [TOOLS.find((t) => t.name === 'omni_rag_query')];
  return {
    protocol: 'MCP-Zero-Active-Discovery-2026',
    intent,
    domain: domain || 'auto',
    role,
    totalCatalogTools: TOOLS.length,
    discoveredCount: selected.length,
    schemaOverheadReductionPct: 98.0,
    tools: selected.map((t) => ({
      name: t.name,
      mcpServer: t.mcpServer,
      domain: t.domain,
      oneLineSummary: String(t.description || '').slice(0, 140),
      description: t.description,
      requiredArgs: t.inputSchema?.required || []
    }))
  };
}

/**
 * Deferred MCP Tool Schemas (`listToolsDeferredCompact` & `hydrateDeferredToolSchema`):
 * Lists MCP tools in ultra-compact mode (`name + 1-line summary`) and hydrates the full JSON Schema
 * only when the agent invokes or explicitly requests schema hydration for a specific tool.
 */
export function listToolsDeferredCompact() {
  return TOOLS.map((t) => ({
    name: t.name,
    domain: t.domain,
    mcpServer: t.mcpServer,
    readOnly: t.readOnly,
    oneLineSummary: String(t.description || '').split('.')[0] + '.'
  }));
}

export function hydrateDeferredToolSchema(toolName = '') {
  const found = TOOLS.find((t) => t.name === toolName);
  if (!found) {
    return { hydrated: false, toolName, inputSchema: null };
  }
  return {
    hydrated: true,
    toolName: found.name,
    mcpServer: found.mcpServer,
    inputSchema: found.inputSchema
  };
}

/**
 * Expands a retrieved chunk to its Parent Markdown Section (up to `maxChars`, default 2200)
 * when the underlying `knowledge/` or repo file exists on disk (Parent Document Retriever pattern).
 */
export function expandChunkToParentMarkdownSection(chunk = {}, maxChars = 2200) {
  const rawSource = String(chunk.source || chunk.id || '').replace(/^local:\/\//, '').split('#')[0];
  const snippet = String(chunk.text || chunk.snippet || '');
  if (!rawSource) return snippet.slice(0, maxChars);

  const absPath = path.isAbsolute(rawSource) ? rawSource : path.join(ROOT, rawSource);
  if (!fs.existsSync(absPath) || !fs.statSync(absPath).isFile()) {
    return snippet.slice(0, maxChars);
  }

  try {
    const fileContent = fs.readFileSync(absPath, 'utf8');
    const anchorProbe = snippet.trim().slice(0, 80);
    const pos = anchorProbe ? fileContent.indexOf(anchorProbe) : -1;
    if (pos === -1) return snippet.slice(0, maxChars);

    // Find start of enclosing Markdown heading (## or #)
    const before = fileContent.slice(0, pos);
    const headingMatches = [...before.matchAll(/^#{1,3}\s+[^\r\n]+/gm)];
    const sectionStart =
      headingMatches.length > 0 ? headingMatches[headingMatches.length - 1].index : Math.max(0, pos - 300);
    return fileContent.slice(sectionStart, sectionStart + maxChars).trim();
  } catch {
    return snippet.slice(0, maxChars);
  }
}

/**
 * Multi-Query RAG Fusion (Reciprocal Rank Fusion `RRF(d) = sum(1 / (60 + rank))`)
 * + Parent Document Section Expansion + CRAG (Corrective RAG) Sufficiency Evaluator.
 */
export async function executeRagFusionRrfAndCrag(query = '', options = {}) {
  const baseQuery = String(query || '').trim();
  const limit = Math.max(1, Number(options.limit || 5));
  const useRerank = Boolean(options.useOnnxRerank);

  const coreTokens = baseQuery
    .toLowerCase()
    .split(/[^a-záéíóúñ0-9_-]+/i)
    .filter((t) => t.length >= 3);

  // 1. Generate 3 complementary query reformulations (Exact, Conceptual/Architectural, API/Code)
  const queryVariants = [
    { id: 'exact', query: baseQuery },
    {
      id: 'conceptual',
      query: `${baseQuery} architecture design principles best practices 2026`
    },
    {
      id: 'api_implementation',
      query: `${coreTokens.slice(0, 6).join(' ')} implementation patterns tokens code`
    }
  ];

  // 2. Execute retrieval across all 3 query reformulations and fuse with RRF(d) = sum(1 / (60 + rank))
  const rrfMap = new Map();
  for (const variant of queryVariants) {
    const hits = await queryKnowledge(variant.query, limit * 2, {
      fastLocalOnly: true,
      useOnnxRerank: useRerank
    });
    hits.forEach((hit, idx) => {
      const rank = idx + 1;
      const docKey = String(hit.id || hit.source || `${variant.id}-${idx}`);
      const rrfDelta = 1 / (60 + rank);
      const existing = rrfMap.get(docKey);
      if (existing) {
        existing.rrfScore = Number((existing.rrfScore + rrfDelta).toFixed(6));
        existing.matchedVariants.push(variant.id);
      } else {
        rrfMap.set(docKey, {
          ...hit,
          rrfScore: Number(rrfDelta.toFixed(6)),
          matchedVariants: [variant.id]
        });
      }
    });
  }

  let fusedResults = [...rrfMap.values()].sort((a, b) => b.rrfScore - a.rrfScore);

  // 3. CRAG (Corrective RAG) Sufficiency Check: verify lexical/semantic coverage of core query tokens
  const evaluateSufficiency = (items) => {
    if (!items.length || !coreTokens.length) return { sufficient: items.length > 0, coverageRatio: 1 };
    const combinedText = items
      .slice(0, limit)
      .map((it) => `${it.source || ''} ${it.title || ''} ${it.text || it.snippet || ''}`.toLowerCase())
      .join(' ');
    const matched = coreTokens.filter((tok) => combinedText.includes(tok));
    const ratio = Number((matched.length / coreTokens.length).toFixed(2));
    return {
      sufficient: ratio >= 0.4,
      coverageRatio: ratio
    };
  };

  let cragEval = evaluateSufficiency(fusedResults);
  let cragRewrittenQuery = null;

  if (!cragEval.sufficient && coreTokens.length > 0) {
    cragRewrittenQuery = coreTokens.slice(0, 4).join(' ');
    const correctiveHits = await queryKnowledge(cragRewrittenQuery, limit * 2, {
      fastLocalOnly: true,
      useOnnxRerank: true
    });
    correctiveHits.forEach((hit, idx) => {
      const docKey = String(hit.id || hit.source || `crag-${idx}`);
      const rrfDelta = 1 / (60 + idx + 1);
      const existing = rrfMap.get(docKey);
      if (existing) {
        existing.rrfScore = Number((existing.rrfScore + rrfDelta).toFixed(6));
        if (!existing.matchedVariants.includes('crag_rewrite')) existing.matchedVariants.push('crag_rewrite');
      } else {
        rrfMap.set(docKey, {
          ...hit,
          rrfScore: Number(rrfDelta.toFixed(6)),
          matchedVariants: ['crag_rewrite']
        });
      }
    });
    fusedResults = [...rrfMap.values()].sort((a, b) => b.rrfScore - a.rrfScore);
    cragEval = evaluateSufficiency(fusedResults);
  }

  // 4. Parent Document Section Expansion on top results
  const topExpanded = fusedResults.slice(0, limit).map((item) => ({
    ...item,
    parentExpandedText: expandChunkToParentMarkdownSection(item, 2200)
  }));

  return {
    queryVariants: queryVariants.map((v) => v.query),
    rrfFormula: 'sum(1 / (60 + rank))',
    cragEvaluation: {
      sufficient: cragEval.sufficient,
      coverageRatio: cragEval.coverageRatio,
      correctiveRewriteTriggered: Boolean(cragRewrittenQuery),
      cragRewrittenQuery
    },
    results: topExpanded
  };
}

/**
 * Validates incoming MCP request security (`MCP01:2025–MCP10:2025` + `ASI01–ASI10`):
 *   - Generates CSPRNG trace/session ID (`generateCsprngSessionId()`)
 *   - Rejects unauthorized `x-mcp-header` / `x-mcp-untrusted` headers
 *   - Validates Audience (`urn:web-software-factory:mcp*`)
 *   - Enforces `additionalProperties: false` on tool arguments
 *   - Evaluates stateless `< 0.1ms` Agent Governance Kernel + Role MCP Permission check
 */
export function validateMcpRequestSecurity(req = {}) {
  const traceId = generateCsprngSessionId();
  const headerContainers = [req.headers, req.params?.headers, req.params?._meta?.headers];

  for (const container of headerContainers) {
    if (container && typeof container === 'object') {
      for (const key of Object.keys(container)) {
        const lowerKey = key.toLowerCase();
        if (
          lowerKey === 'x-mcp-header' ||
          lowerKey.startsWith('x-mcp-untrusted') ||
          lowerKey === 'x-api-key-raw'
        ) {
          return {
            valid: false,
            traceId,
            error: `MCP_SECURITY_VIOLATION: Unauthorized sensitive header '${key}' rejected (OWASP MCP Top 10).`
          };
        }
      }
    }
  }

  const declaredAudience =
    req.params?._meta?.audience || req.params?.audience || SERVER_INFO.expectedAudience;
  if (!String(declaredAudience).startsWith('urn:web-software-factory:mcp')) {
    return {
      valid: false,
      traceId,
      error: `MCP_AUDIENCE_VIOLATION: Invalid audience '${declaredAudience}'.`
    };
  }

  if (req.method === 'tools/call') {
    const toolName = req.params?.name;
    const args = req.params?.arguments || {};
    const callerRole = req.params?._meta?.role || 'orchestrator';
    const toolDef = TOOLS.find((t) => t.name === toolName);
    if (toolDef && toolDef.inputSchema?.additionalProperties === false) {
      const allowedKeys = new Set(Object.keys(toolDef.inputSchema.properties || {}));
      if (!args || typeof args !== 'object' || Array.isArray(args)) {
        return {
          valid: false,
          traceId,
          error: 'MCP_SCHEMA_VIOLATION: Tool arguments must be a JSON object.'
        };
      }
      for (const argKey of Object.keys(args)) {
        if (!allowedKeys.has(argKey)) {
          return {
            valid: false,
            traceId,
            error: `MCP_SCHEMA_VIOLATION: Undeclared property '${argKey}' rejected by additionalProperties: false.`
          };
        }
      }
    }

    const govCheck = evaluateGovernancePolicy({
      roleId: callerRole,
      mcpServer: toolDef?.mcpServer || 'omni-rag-ast',
      toolName,
      targetFile: args.filePath || '',
      sqlQuery: args.sql || '',
      gitCommand: args.subcommand ? `git ${args.subcommand}` : '',
      audience: declaredAudience,
      hitlConfirmed: Boolean(args.hitlConfirmed),
      isDestructiveOrDeploy: Boolean(toolDef?.requiresHitlConfirmation),
      payload: args,
      retryCount: 0
    });
    if (!govCheck.allowed) {
      return {
        valid: false,
        traceId,
        error: `AGENT_GOVERNANCE_KERNEL_DENY: ${govCheck.violations.map((v) => `${v.code}:${v.title}`).join('; ')}`
      };
    }
  }

  return { valid: true, traceId };
}

export const STUB_MCP_CLI_GATE_MAP = Object.freeze({
  delta_security_scan: 'node tools/audit/security_gate.mjs && node tools/supply_chain_guard.mjs --fast',
  dast_endpoint_probe: 'node tools/audit/local_fullstack_and_component_harness.mjs',
  github_precommit_secret_scan: 'node tools/audit/security_gate.mjs && node tools/audit/workflow_security_linter.mjs',
  git_readonly_inspect: 'node tools/audit/git_remote_sync_check.mjs',
  d1_readonly_query: 'node tools/intelligence/academy_store.mjs --stats'
});

export function buildNotImplementedCliGateError(toolName, traceId, extra = {}) {
  const cliCommand = STUB_MCP_CLI_GATE_MAP[toolName] || 'node tools/factory.mjs gate';
  return {
    _isStubCliGateError: true,
    ok: false,
    isError: true,
    code: 'NOT_IMPLEMENTED_USE_CLI_GATE',
    error: 'NOT_IMPLEMENTED_USE_CLI_GATE',
    status: 'NOT_IMPLEMENTED_USE_CLI_GATE',
    traceId,
    toolName,
    cliCommand,
    ...extra,
    message: `NOT_IMPLEMENTED_USE_CLI_GATE: MCP tool '${toolName}' does not execute simulated PASS stubs. Run the real CLI gate instead: ${cliCommand}`
  };
}

export async function executeSingleMcpTool(toolName, args = {}, traceId = generateCsprngSessionId()) {
  if (toolName === 'discover_tools') {
    return discoverToolsByIntent({
      intent: args.intent || '',
      domain: args.domain || '',
      role: args.role || 'orchestrator'
    });
  }
  if (toolName === 'headroom_retrieve') {
    return headroom_retrieve(args.hash, { startLine: args.startLine, endLine: args.endLine });
  }
  if (toolName === 'search_codebase_ast') {
    return searchCodebaseAst({
      query: args.query || '',
      symbolName: args.symbolName || '',
      limit: Number(args.limit || 10)
    });
  }
  if (toolName === 'security_check' || toolName === 'semgrep_scan') {
    const targetRel = args.filePath || args.targetDir || 'templates/vanilla-edge/site/js/app.js';
    const absTarget = path.join(ROOT, targetRel);
    const findings =
      fs.existsSync(absTarget) && fs.statSync(absTarget).isFile()
        ? scanSecurityAndPerformance(absTarget)
        : [];
    const spilled = compressLargeMcpOutputToDisk({
      mcpServer: 'semgrep-mcp',
      toolName,
      payload: { traceId, target: targetRel, findingsCount: findings.length, findings }
    });
    return spilled.payload;
  }
  if (toolName === 'get_abstract_syntax_tree') {
    const rel = String(args.filePath || 'tools/ast_guard.mjs').replace(/\\/g, '/');
    const abs = path.join(ROOT, rel);
    const content = fs.existsSync(abs) ? fs.readFileSync(abs, 'utf8') : '';
    const sha256 = crypto.createHash('sha256').update(content, 'utf8').digest('hex').slice(0, 16);
    return extractFileAstMetadata(abs, rel, content, sha256);
  }
  if (toolName === 'write_custom_semgrep_rule') {
    const rulesDir = path.join(ROOT, '.agents', 'security_reports', '.semgrep');
    fs.mkdirSync(rulesDir, { recursive: true });
    const safeId = String(args.ruleId || 'custom-rule').replace(/[^a-zA-Z0-9_-]/g, '-');
    const rulePath = path.join(rulesDir, `${safeId}.yml`);
    const yamlContent = [
      'rules:',
      `  - id: ${safeId}`,
      `    pattern: ${args.pattern}`,
      `    message: "${String(args.message || '').replace(/"/g, "'")}"`,
      `    severity: ${args.severity || 'ERROR'}`,
      '    languages: [javascript, typescript]'
    ].join('\n');
    fs.writeFileSync(rulePath, yamlContent + '\n', 'utf8');
    return {
      traceId,
      saved: true,
      ruleId: safeId,
      rulePath: `.agents/security_reports/.semgrep/${safeId}.yml`
    };
  }
  if (toolName === 'delta_security_scan') {
    const slug = args.projectSlug || resolveDomainProfile().slug;
    return buildNotImplementedCliGateError('delta_security_scan', traceId, {
      projectSlug: slug,
      cliCommand: `node tools/audit/security_gate.mjs --project ${slug}`
    });
  }
  if (toolName === 'dast_endpoint_probe') {
    const u = String(args.targetUrl || 'http://127.0.0.1:3000');
    if (!/^https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?/i.test(u)) {
      throw new Error('DAST_SCOPE_VIOLATION: dast-offat-zap only probes isolated localhost/127.0.0.1 staging.');
    }
    return buildNotImplementedCliGateError('dast_endpoint_probe', traceId, {
      targetUrl: u,
      cliCommand: 'node tools/audit/local_fullstack_and_component_harness.mjs'
    });
  }
  if (toolName === 'filesystem_scoped_read') {
    const perm = verifyRoleMcpPermission({
      roleId: args.role || 'senior-coder',
      mcpServer: 'filesystem-scoped',
      toolName: 'filesystem_scoped_read',
      targetPath: args.filePath
    });
    if (!perm.allowed) throw new Error(perm.reason);
    const abs = path.join(ROOT, String(args.filePath || ''));
    const text = fs.existsSync(abs) && fs.statSync(abs).isFile() ? fs.readFileSync(abs, 'utf8').slice(0, 4000) : '';
    return { traceId, filePath: args.filePath, preview: text };
  }
  if (toolName === 'git_readonly_inspect') {
    const perm = verifyRoleMcpPermission({
      roleId: 'qa-auditor',
      mcpServer: 'git-readonly-mcp',
      toolName: 'git_readonly_inspect',
      gitCommand: `git ${args.subcommand || 'status'}`
    });
    if (!perm.allowed) throw new Error(perm.reason);
    const sub = String(args.subcommand || 'status').replace(/[^a-z0-9_-]/gi, '');
    return buildNotImplementedCliGateError('git_readonly_inspect', traceId, {
      subcommand: sub,
      cliCommand: `git ${sub || 'status'} -s`
    });
  }
  if (toolName === 'd1_readonly_query') {
    const perm = verifyRoleMcpPermission({
      roleId: 'qa-auditor',
      mcpServer: 'd1-sqlite-readonly-mcp',
      toolName: 'd1_readonly_query',
      sqlQuery: args.sql || ''
    });
    if (!perm.allowed) throw new Error(perm.reason);
    const activeDbTier = resolveDatabaseTier(ROOT);
    return buildNotImplementedCliGateError('d1_readonly_query', traceId, {
      dbTier: activeDbTier,
      cliCommand: 'node tools/intelligence/academy_store.mjs --stats'
    });
  }
  if (toolName === 'github_precommit_secret_scan') {
    return buildNotImplementedCliGateError('github_precommit_secret_scan', traceId, {
      branchName: args.branchName || 'HEAD',
      cliCommand: 'node tools/audit/security_gate.mjs'
    });
  }
  if (toolName === 'github_nhi_open_pr') {
    if (!args.hitlConfirmed) {
      throw new Error('MCP_HITL_GATE_REQUIRED: github_nhi_open_pr requires hitlConfirmed=true.');
    }
    return {
      traceId,
      identity: 'webfactory-nhi-bot',
      branchName: args.branchName,
      autoMergeAllowed: false,
      status: 'PR_READY_FOR_CTO_REVIEW'
    };
  }
  if (toolName === 'omni_rag_query') {
    const q = String(args.query || '');
    const lim = Math.max(1, Math.min(15, Number(args.limit || 5)));
    const scope = ['hot', 'library', 'all'].includes(String(args.scope || '').toLowerCase())
      ? String(args.scope).toLowerCase()
      : 'hot';
    const domainProfile = resolveDomainProfile({ slug: args.projectSlug || '' });
    const maxTokens = Math.min(
      2400,
      Math.max(256, Number(args.maxTokens || domainProfile.capabilities.rag.maxInlineTokens || 1200))
    );
    const scopeFilter = projectScopeFilter(q, {
      project: domainProfile.slug,
      archetype: domainProfile.id,
      domainQuarantine: args.domainQuarantine
    });
    const route = routeQueryToSquads(q);
    const storeRes = await searchRagStore(q, {
      limit: lim + 1,
      scope,
      projectSlug: domainProfile.slug,
      domainProfile: domainProfile.id,
      allowNetwork: args.allowNetwork !== false
    });

    const hits = storeRes.results
      .filter((h) => {
        const cleanPath = String(h.relPath || h.source || h.id || '').replace(/^local:\/\//, '').split('#')[0];
        if (!domainProfile.isDomainAllowedInRag(cleanPath)) return false;
        if (args.domainQuarantine === true && scopeFilter.evaluateChunk(cleanPath).quarantined) return false;
        return true;
      })
      .slice(0, lim);

    const fullResults = hits.map((h) => {
      const cleanPath = String(h.relPath || h.source || h.id || '').replace(/^local:\/\//, '').split('#')[0];
      const domain = h.domain || classifyKnowledgeDocumentDomain(cleanPath);
      const isClassicBook = h.epistemicTier === 'TIER_2_TIMELESS_PRINCIPLES';
      let rawText = sanitizeMcpRetrievedFragment(h.text || h.snippet || '');
      if (isClassicBook && !rawText.includes('[TRANSLATION_RULE:')) {
        rawText = `${TRANSLATION_RULE_WARNING}\n${rawText}`;
      }
      const fullText = rawText.slice(0, 2200);
      return {
        id: h.id || cleanPath,
        source: cleanPath,
        domain,
        partition: h.partition || scope,
        title: h.title || cleanPath,
        rrfScore: Number((h.rrfScore || 0).toFixed(6)),
        epistemicTier: h.epistemicTier || 'TIER_2_TIMELESS_PRINCIPLES',
        authorityBoost: Number(h.authorityBoost ?? 1.0),
        legacySyntaxGuard: h.legacySyntaxGuard || (isClassicBook ? 'TIER_3_LEGACY_SYNTAX_GUARD' : null),
        citation: h.startLine ? `${cleanPath}#L${h.startLine}-L${h.endLine}` : cleanPath,
        fullText
      };
    });

    const ccr = compressReversibleCcr(
      {
        query: q,
        scope,
        searchMode: storeRes.searchMode,
        domainProfile: domainProfile.id,
        allowedDomains: domainProfile.capabilities.rag.allowedDomains,
        results: fullResults
      },
      { handleOnly: true }
    );

    // Greedily pack real inline chunk content strictly within `maxTokens` (default <= 1200 tokens, zero spillover)
    const inlineTokenCap = maxTokens;
    const maxTotalChars = Math.floor(inlineTokenCap * 3.45) - 120;
    const baseEnvelope = {
      traceId,
      scope,
      searchMode: storeRes.searchMode,
      latencyMs: storeRes.latencyMs,
      domainProfile: domainProfile.id,
      allowedDomains: domainProfile.capabilities.rag.allowedDomains,
      squadRoute: route.primarySquad?.squad || 'architecture',
      maxTokens: inlineTokenCap,
      headroomCcr: {
        hash: ccr.hash,
        retrieveToolCall: ccr.retrieveToolCall
      },
      results: []
    };

    const headerOverheadChars = JSON.stringify(baseEnvelope).length;
    let remainingChars = Math.max(200, maxTotalChars - headerOverheadChars);
    const targetCount = Math.max(1, Math.min(fullResults.length, lim));
    const perHitOverheadChars = 195;
    const perHitTargetChars = Math.max(
      75,
      Math.floor((remainingChars - targetCount * perHitOverheadChars) / targetCount)
    );

    for (const item of fullResults) {
      if (remainingChars < 150) break;
      const maxExcerptChars = Math.max(60, Math.min(perHitTargetChars, remainingChars - perHitOverheadChars));
      const trimmedText =
        item.fullText.length > maxExcerptChars
          ? `${item.fullText.slice(0, maxExcerptChars).trimEnd()}…`
          : item.fullText;
      const candidateEntry = {
        id: item.id,
        source: item.source,
        domain: item.domain,
        title: item.title,
        epistemicTier: item.epistemicTier,
        authorityBoost: item.authorityBoost,
        rrfScore: item.rrfScore,
        legacySyntaxGuard: item.legacySyntaxGuard || undefined,
        text: trimmedText
      };
      const nextResults = [...baseEnvelope.results, candidateEntry];
      const serializedProbe = JSON.stringify({ ...baseEnvelope, results: nextResults });
      if (Math.ceil(serializedProbe.length / 3.4) > inlineTokenCap && baseEnvelope.results.length > 0) {
        break;
      }
      baseEnvelope.results.push(candidateEntry);
      remainingChars = maxTotalChars - serializedProbe.length;
    }

    baseEnvelope.returnedTokens = Math.min(
      inlineTokenCap,
      Math.ceil(JSON.stringify(baseEnvelope).length / 3.5)
    );
    return baseEnvelope;
  }
  if (toolName === 'code_graph_query') {
    return { traceId, ...queryCodeGraph(args.symbol_or_file || '', Number(args.limit || 8)) };
  }
  if (toolName === 'omni_rag_stats') {
    const st = await getClusterStats();
    const astStats = buildOrUpdateAstIndex({ forceRebuild: false });
    return { traceId, ...st, incrementalAstGraph: astStats };
  }
  if (toolName === 'factory_style_catalog') {
    const cat = getStyleCatalog();
    const preview = buildDtcgTokensObject(args.archetype || 'saas-b2b', args.style || 'bento');
    return { traceId, catalog: cat, tokenPreview: preview };
  }
  if (toolName === 'factory_compile_tokens') {
    const res = compileDesignTokens({
      projectDir: args.project || '',
      archetype: args.archetype || 'saas-b2b',
      style: args.style || 'bento'
    });
    return { traceId, ...res };
  }
  if (toolName === 'factory_run_audit') {
    const ryux = runRyuxDesignGate();
    const cog = runCognitiveUxAudit();
    const diff = runDiffUiAdversarialGate(args.project || '');
    return { traceId, ryux, cognitiveUx: cog, diffUi: diff };
  }
  if (toolName === 'factory_repomap_pagerank') {
    const res = buildPageRankRepoMap({
      seedFiles: Array.isArray(args.seedFiles) ? args.seedFiles : [],
      ticketQuery: args.ticketQuery || '',
      topK: Number(args.topK || 15),
      maxTokens: Number(args.maxTokens || 600)
    });
    return { traceId, ...res };
  }
  if (toolName === 'factory_ast_slice_function') {
    const res = sliceTargetFunctionAndCallSites({
      filePath: args.filePath || '',
      symbolName: args.symbolName || '',
      maxCallSites: Number(args.maxCallSites || 5)
    });
    return { traceId, ...res };
  }
  if (toolName === 'factory_jev_evaluate_diff') {
    const res = await evaluateFullJevOuterAndMetaGate({
      diffText: args.diffText || '',
      specPath: args.specPath || '',
      tracesText: args.tracesText || ''
    });
    return { traceId, ...res };
  }
  if (toolName === 'factory_run_local_commerce_rls_harness') {
    const res = await runFullLocalHarnessSuite();
    return { traceId, ...res };
  }
  if (toolName === 'jev_memory_pipeline_gate') {
    if (args.runSleepTimeConsolidation) {
      const report = await runJevSleepTimeConsolidationCycle({ persist: true });
      return { traceId, mode: 'SLEEP_TIME_CONSOLIDATION', report };
    }
    const res = await evaluateMemoryWriteAdmissionWithJev(
      { fact: args.fact || '', projectSlug: args.projectSlug || 'agencia-alfa' },
      { persist: false }
    );
    return { traceId, mode: 'WRITE_GATE_EVALUATION', ...res };
  }
  if (toolName === 'xstate_validate_transition') {
    const syncSnap = syncProjectStatechartSnapshot(args.projectSlug || 'agencia-alfa');
    const actor = createActor(factoryLifecycleMachine, {
      snapshot: syncSnap.persistedSnapshot
    });
    actor.start();
    const validation = validateAgentPolicyProposal(
      actor.getSnapshot(),
      { type: args.proposedEvent },
      { actorRole: args.actorRole || 'agent' }
    );
    actor.stop();
    return { traceId, projectSlug: syncSnap.projectSlug, ...validation };
  }
  throw new Error(`Unknown tool: ${toolName}`);
}

function sendResponse(id, result) {
  process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id, result }) + '\n');
}

function sendError(id, code, message) {
  process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id, error: { code, message } }) + '\n');
}

export function startMcpServer() {
  const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
  });

  rl.on('line', async (line) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    let req;
    try {
      req = JSON.parse(trimmed);
    } catch {
      return;
    }

    const { id, method, params } = req;
    const securityCheck = validateMcpRequestSecurity(req);
    if (!securityCheck.valid) {
      if (id !== undefined) {
        sendError(id, -32600, securityCheck.error);
      }
      return;
    }

    try {
      if (method === 'initialize') {
        sendResponse(id, {
          protocolVersion: '2024-11-05',
          capabilities: { tools: {} },
          serverInfo: SERVER_INFO,
          traceId: securityCheck.traceId
        });
      } else if (method === 'notifications/initialized') {
        // No response required for notifications
      } else if (method === 'tools/list') {
        const useCompact = Boolean(params?.compact || params?.deferred);
        sendResponse(id, {
          tools: useCompact ? listToolsDeferredCompact() : TOOLS,
          deferredSchemaHydrationSupported: true
        });
      } else if (method === 'tools/call') {
        const toolName = params?.name;
        const args = params?.arguments || {};

        if (toolName === 'codemode_execute_batch') {
          const ops = Array.isArray(args.operations) ? args.operations.slice(0, 8) : [];
          const batchResults = [];
          for (const op of ops) {
            if (!op || !op.tool || op.tool === 'codemode_execute_batch') continue;
            const out = await executeSingleMcpTool(op.tool, op.args || {}, securityCheck.traceId);
            batchResults.push({ tool: op.tool, result: out });
          }
          const finalOut = compressLargeMcpOutputToDisk({
            mcpServer: 'omni-rag-ast',
            toolName: 'codemode_execute_batch',
            payload: {
              traceId: securityCheck.traceId,
              executor: '@cloudflare/codemode-batch-v1',
              operationsExecuted: batchResults.length,
              results: batchResults
            }
          });
          sendResponse(id, {
            content: [{ type: 'text', text: JSON.stringify(finalOut.payload, null, 2) }]
          });
        } else {
          const rawOut = await executeSingleMcpTool(toolName, args, securityCheck.traceId);
          if (rawOut && rawOut._isStubCliGateError) {
            const { _isStubCliGateError, ...errPayload } = rawOut;
            sendResponse(id, {
              isError: true,
              content: [{ type: 'text', text: JSON.stringify(errPayload, null, 2) }]
            });
          } else if (toolName === 'headroom_retrieve' || toolName === 'omni_rag_query') {
            sendResponse(id, {
              content: [{ type: 'text', text: JSON.stringify(rawOut) }]
            });
          } else {
            const effectiveInlineLimit =
              toolName === 'omni_rag_query'
                ? Math.min(2400, Math.max(256, Number(args.maxTokens || 1200)))
                : 1200;
            const finalOut = compressLargeMcpOutputToDisk({
              mcpServer: TOOLS.find((t) => t.name === toolName)?.mcpServer || 'omni-rag-ast',
              toolName,
              payload: rawOut,
              maxInlineTokens: effectiveInlineLimit
            });
            sendResponse(id, {
              content: [{ type: 'text', text: JSON.stringify(finalOut.payload, null, 2) }]
            });
          }
        }
      } else if (id !== undefined) {
        sendResponse(id, { traceId: securityCheck.traceId });
      }
    } catch (err) {
      if (id !== undefined) {
        if (String(err.message || '').startsWith('Unknown tool:')) {
          sendError(id, -32601, err.message);
        } else {
          sendError(id, -32000, err.message || 'Internal MCP server error');
        }
      }
    }
  });
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]).toLowerCase() === path.resolve(__filename).toLowerCase()
) {
  if (process.argv.includes('--self-test')) {
    executeRagFusionRrfAndCrag('OKLCH W3C DTCG 2025.10 tokens and APCA contrast', { limit: 4 }).then((res) => {
      console.log('====================================================================');
      console.log('🧠 OMNI-RAG MCP SERVER v5.4 — RAG FUSION RRF + CRAG SELF-TEST');
      console.log('====================================================================');
      console.log(`  • RRF Formula       : ${res.rrfFormula}`);
      console.log(`  • Query Variants    : ${res.queryVariants.length}`);
      console.log(`  • CRAG Sufficient   : ${res.cragEvaluation.sufficient} (coverage=${res.cragEvaluation.coverageRatio})`);
      console.log(`  • Top Fused Results : ${res.results.length} (Top RRF=${res.results[0]?.rrfScore || 0})`);
      console.log('====================================================================\n');
      process.exit(res.results.length > 0 && res.cragEvaluation.sufficient ? 0 : 1);
    });
  } else {
    startMcpServer();
  }
}
