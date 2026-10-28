#!/usr/bin/env node
/**
 * tools/intelligence/mcp_omni_rag_server.mjs
 * =============================================================================
 * 🔌 WEB SOFTWARE FACTORY STUDIO — SUPERCHARGED OMNI-RAG v5.2 & STUDIO MCP SERVER
 * =============================================================================
 * Exposes our local C-compiled SQLite FTS5 + Inverted Index + MiniSearch +
 * AST CodeGraph PageRank + Obsidian [[Wikilink]] Graph + W3C DTCG 2025.10 Token
 * Compiler + 67 Design Styles Catalog + 5-Gate Visual/UX Auditor over MCP (stdio).
 * =============================================================================
 */

import readline from 'node:readline';
import { queryKnowledge, queryCodeGraph, getClusterStats } from './rag_pipeline.mjs';
import { routeQueryToSquads } from './squad_semantic_router.mjs';
import { hybridRrfSearch } from './qdrant_rag.mjs';
import {
  classifyEpistemicTier,
  inspectAndGuardLegacyFragment,
  TRANSLATION_RULE_WARNING
} from './rag_library_sanitizer.mjs';
import { assembleThreeTierContext } from './context_budget.mjs';
import { compileDesignTokens, getStyleCatalog, buildDtcgTokensObject } from '../design/token_compiler.mjs';
import { runRyuxDesignGate } from '../audit/ryux_design_gate.mjs';
import { runCognitiveUxAudit } from '../audit/cognitive_ux_auditor.mjs';
import { runDiffUiAdversarialGate } from '../audit/diff_ui_adversarial.mjs';
import { lookupInLocalVault } from './vault_indexer.mjs';

const SERVER_INFO = {
  name: 'web-factory-omni-rag-v5.2',
  version: '5.2.0'
};

const TOOLS = [
  {
    name: 'omni_rag_query',
    description:
      'Query the Supercharged Omni-RAG v5.2 Web Software Factory Brain (226 canonical books, video courses, and treatises on UI/UX, OKLCH/DTCG Tokens, 60-FPS Motion, Astro 5, Cloudflare Edge/D1, CRO/Copywriting, OWASP Security, and ISO/IEC 26550 Software Factories). Uses C-compiled SQLite FTS5 + Inverted Token Index + MiniSearch + 1-Hop Obsidian [[Wikilink]] Graph.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Technical or conceptual search query (Spanish or English).' },
        limit: { type: 'number', description: 'Max chunks to return (default 5).' },
        rerank: { type: 'boolean', description: 'Enable local ONNX Q8 Cross-Encoder reranking.' }
      },
      required: ['query']
    }
  },
  {
    name: 'code_graph_query',
    description:
      'Query the deterministic AST CodeGraph + PageRank centrality index across all JS/TS/MJS files in templates/, projects/, and tools/. Returns classes, functions, window globals, /api/* routes, and caller/callee edges.',
    inputSchema: {
      type: 'object',
      properties: {
        symbol_or_file: { type: 'string', description: 'Symbol, class, method, API route, or filename to inspect.' },
        limit: { type: 'number', description: 'Max matching file nodes (default 8).' }
      },
      required: ['symbol_or_file']
    }
  },
  {
    name: 'omni_rag_stats',
    description: 'Return live health and node counts for Supercharged Omni-RAG v5.2, AST CodeGraph, Obsidian WikiGraph, and Inverted Index.',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'factory_style_catalog',
    description: 'Inspect the 67 MIT design style skills (awesome-design-skills) and 4 web archetypes (saas-b2b, ecommerce, marketing, portfolio), or preview the W3C DTCG 2025.10 OKLCH tokens for a specific style and archetype.',
    inputSchema: {
      type: 'object',
      properties: {
        archetype: { type: 'string', description: 'Optional archetype (saas-b2b, ecommerce, marketing, portfolio).' },
        style: { type: 'string', description: 'Optional style name (e.g. linear-style, vercel-geist, stripe-editorial, bento, brutalist, swiss-grid).' }
      }
    }
  },
  {
    name: 'factory_compile_tokens',
    description: 'Compile W3C DTCG 2025.10 JSON tokens (tokens/design.tokens.json) and production OKLCH + Utopia fluid CSS (design-tokens.css) for the Studio or a specific project.',
    inputSchema: {
      type: 'object',
      properties: {
        project: { type: 'string', description: 'Optional project slug or directory path.' },
        archetype: { type: 'string', description: 'Archetype (saas-b2b, ecommerce, marketing, portfolio).' },
        style: { type: 'string', description: 'Style skill name from the 67 available styles.' }
      }
    }
  },
  {
    name: 'factory_run_audit',
    description: 'Run the deterministic RYUX v2.14.2 Design Gate, Cognitive UX Auditor, and Diff-UI Adversarial + Oxc Rust Linter Gate on the Studio or a specific project.',
    inputSchema: {
      type: 'object',
      properties: {
        project: { type: 'string', description: 'Optional project slug or directory path.' }
      }
    }
  }
];

function sendResponse(id, result) {
  process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id, result }) + '\n');
}

function sendError(id, code, message) {
  process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id, error: { code, message } }) + '\n');
}

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
  } catch (_) {
    return;
  }

  const { id, method, params } = req;

  try {
    if (method === 'initialize') {
      sendResponse(id, {
        protocolVersion: '2024-11-05',
        capabilities: { tools: {} },
        serverInfo: SERVER_INFO
      });
    } else if (method === 'notifications/initialized') {
      // No response required for notifications
    } else if (method === 'tools/list') {
      sendResponse(id, { tools: TOOLS });
    } else if (method === 'tools/call') {
      const toolName = params?.name;
      const args = params?.arguments || {};

      if (toolName === 'omni_rag_query') {
        const q = String(args.query || '');
        const lim = Number(args.limit || 5);
        const useRerank = Boolean(args.rerank);
        const route = routeQueryToSquads(q);
        const contextBudget = assembleThreeTierContext(q);
        const localVaultMatches = lookupInLocalVault(q);
        const hits = await queryKnowledge(q, lim, { fastLocalOnly: true, useOnnxRerank: useRerank });
        const rrfFallback = await hybridRrfSearch(q, lim);
        const cappedResults = hits.map((h, idx) => {
          const rrfMatch = rrfFallback.results[idx];
          const cleanPath = String(h.source || h.id || '').replace(/^local:\/\//, '').split('#')[0];
          const tierMeta = h.epistemicTier
            ? {
                epistemicTier: h.epistemicTier,
                authorityBoost: h.authorityBoost || (h.epistemicTier === 'TIER_1_SOTA_2026' ? 1.35 : 1.15),
                epistemicRole: h.epistemicRole
              }
            : classifyEpistemicTier(cleanPath, h.text || h.snippet || '');
          const guardMeta = inspectAndGuardLegacyFragment(h.text || h.snippet || '', tierMeta.epistemicTier, cleanPath);
          const isClassicBook = tierMeta.epistemicTier === 'TIER_2_TIMELESS_PRINCIPLES';
          let rawText = guardMeta.guardedText;
          if (isClassicBook && !rawText.includes('[TRANSLATION_RULE:')) {
            rawText = `${TRANSLATION_RULE_WARNING}\n${rawText}`;
          }
          const text = rawText.slice(0, 2200);
          return {
            ...h,
            epistemicTier: tierMeta.epistemicTier,
            authorityBoost: tierMeta.authorityBoost,
            epistemicRole: tierMeta.epistemicRole,
            legacySyntaxGuard: guardMeta.legacySyntaxGuard || (isClassicBook ? 'TIER_3_LEGACY_SYNTAX_GUARD' : null),
            translationRule: guardMeta.translationRule || (isClassicBook ? TRANSLATION_RULE_WARNING : null),
            supersededReplacements: guardMeta.supersededReplacements,
            citation: rrfMatch?.citation || String(h.source || h.id || '').replace(/^local:\/\//, ''),
            tokens: Math.min(600, Math.ceil(text.length / 4)),
            text
          };
        });
        sendResponse(id, {
          content: [{
            type: 'text',
            text: JSON.stringify({
              squadRoute: route.primarySquad,
              epistemicIntent: rrfFallback.epistemicIntent,
              activeTranslationRule: TRANSLATION_RULE_WARNING,
              complementaryPairs: rrfFallback.complementaryPairs || [],
              localVaultMatches,
              contextBudget: {
                hotCacheKey: contextBudget.hot.cacheKey,
                warmRole: contextBudget.warm.activeRole.path,
                warmSkills: contextBudget.warm.selectedSkills.map(s => s.name),
                maxFragmentTokens: 600
              },
              results: cappedResults,
              rrfCitations: rrfFallback.results
            }, null, 2)
          }]
        });
      } else if (toolName === 'code_graph_query') {
        const res = queryCodeGraph(args.symbol_or_file || '', Number(args.limit || 8));
        sendResponse(id, {
          content: [{ type: 'text', text: JSON.stringify(res, null, 2) }]
        });
      } else if (toolName === 'omni_rag_stats') {
        const st = await getClusterStats();
        sendResponse(id, {
          content: [{ type: 'text', text: JSON.stringify(st, null, 2) }]
        });
      } else if (toolName === 'factory_style_catalog') {
        const cat = getStyleCatalog();
        const preview = buildDtcgTokensObject(args.archetype || 'saas-b2b', args.style || 'bento');
        sendResponse(id, {
          content: [{ type: 'text', text: JSON.stringify({ catalog: cat, tokenPreview: preview }, null, 2) }]
        });
      } else if (toolName === 'factory_compile_tokens') {
        const res = compileDesignTokens({
          projectDir: args.project || '',
          archetype: args.archetype || 'saas-b2b',
          style: args.style || 'bento'
        });
        sendResponse(id, {
          content: [{ type: 'text', text: JSON.stringify(res, null, 2) }]
        });
      } else if (toolName === 'factory_run_audit') {
        const ryux = runRyuxDesignGate();
        const cog = runCognitiveUxAudit();
        const diff = runDiffUiAdversarialGate(args.project || '');
        sendResponse(id, {
          content: [{ type: 'text', text: JSON.stringify({ ryux, cognitiveUx: cog, diffUi: diff }, null, 2) }]
        });
      } else {
        sendError(id, -32601, `Unknown tool: ${toolName}`);
      }
    } else if (id !== undefined) {
      sendResponse(id, {});
    }
  } catch (err) {
    if (id !== undefined) {
      sendError(id, -32000, err.message || 'Internal MCP server error');
    }
  }
});
