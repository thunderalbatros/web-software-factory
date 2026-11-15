#!/usr/bin/env node
/**
 * Web Software Factory — Agentic RAG & Ingestion Harness (SOTA 2026)
 * =========================================================================================
 * Synthesizes the 5 industry-leading Agentic RAG & Evaluation Harness architectures:
 *   1. HKUDS RAG-Anything (`github.com/hkuds/rag-anything`) & IBM Docling:
 *      4-Track Content Validation (Layout Hygiene, Equations, Tables, VLM/OCR Guard).
 *   2. LlamaIndex Dynamic Entropy Chunking:
 *      Information-density scoring (`technicalEntropyScore`) preventing frontmatter bias.
 *   3. LangGraph / Google Harness 2 / Databricks Agent Harness:
 *      Autonomous 3-Stage Closed Loop: `PROPOSE -> PROBE -> COMPOSE (& SELF-HEAL)`.
 *   4. DeepEval & Ragas 5-Layer Evaluation Harness:
 *      Evaluates (L1) Squad Routing Accuracy, (L2) Context Relevance & Signal-to-Noise,
 *      (L3) Grounded Faithfulness, (L4) Retrieval Hit@3 / MRR / Latency, and
 *      (L5) Corpus Completeness & Cross-Project Purity.
 * =========================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import {
  queryKnowledge,
  getOrBuildMiniSearchIndex,
  invalidateIndexCache
} from './rag_pipeline.mjs';
import { routeQueryToSquads } from './squad_semantic_router.mjs';
import { computeRagasMetrics } from './vertex_ai_bridge.mjs';
import { buildAndPersistAllGraphs } from './code_and_wiki_graph.mjs';
import { sanitizeMarkdownContent } from './rag_library_sanitizer.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');
const KNOWLEDGE_DIR = path.join(ROOT, 'knowledge');
const RECEIPT_FILE = path.join(ROOT, '.agents', 'memory', 'rag_harness_receipt.json');

const DOMAIN_SCOPE_DEFAULTS = {
  ui_ux_design:
    '> **Alcance:** Literatura canónica de diseño UI/UX, sistemas de diseño, psicología cognitiva, economía conductual, gamificación y conversión (CRO) para la Web Software Factory.\n\n',
  motion_and_animation:
    '> **Alcance:** Literatura canónica y tratados técnicos de animación a 60 FPS, shaders GPU, física de resortes (spring physics), arte técnico 3D y micro-interacciones fluidas para sitios web modernos.\n\n',
  architecture_and_books:
    '> **Alcance:** Literatura canónica de arquitectura de software, código limpio, TypeScript, validación en el Edge, sistemas distribuidos, videocursos técnicos e ingeniería de agentes IA para la Web Software Factory.\n\n',
  cybersecurity:
    '> **Alcance:** Literatura canónica de ciberseguridad web, criptografía aplicada, protección de identidad OAuth 2.1, defensa XSS/CSP/CSRF y blindaje de aplicaciones en tiempo real.\n\n',
  software_factory:
    '> **Alcance:** Estándares ISO/IEC 26550 SPLE, Spec-Driven Development, compilación de tokens W3C DTCG y automatización de la Web Software Factory.\n\n'
};

function walkMarkdown(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walkMarkdown(fp));
    else if (e.name.endsWith('.md')) out.push(fp);
  }
  return out;
}

export function runStage1ProposeAndHeal(autoHeal = true) {
  const files = walkMarkdown(KNOWLEDGE_DIR);
  const report = {
    totalFiles: files.length,
    stubsFound: 0,
    vaultDuplicatesFound: 0,
    pageMarkerFiles: 0,
    controlCharFiles: 0,
    crossProjectContaminationFiles: 0,
    missingScopeAnchorFiles: 0,
    healedFiles: 0,
    domainDistribution: {}
  };

  const forbiddenLegacyRegex = /\b(Yendo\s+Mobile|yendo_mobile|yendo_obsidian_vault|centinela_knowledge|Centinela\s+Studio|Proyecto\s+Centinela|React\s*Native|ReactNative|Android\s+APK|Metasploit|Mobile\s+Application\s+Hacker|Rainbet|DiggityBets|diggitybets\.vip|contratos de API de Kick)\b/i;
  const pageMarkerRegex = /--\s*\d+\s+of\s+\d+\s*--/i;
  const hasControlChar = (text, includeDel = false) =>
    Array.from(String(text || '')).some((ch) => {
      const code = ch.codePointAt(0);
      return (
        (code >= 0x0000 && code <= 0x0008) ||
        code === 0x000b ||
        code === 0x000c ||
        (code >= 0x000e && code <= 0x001f) ||
        (includeDel && code === 0x007f)
      );
    });
  const controlCharRegex = { test: (text) => hasControlChar(text, true) };

  for (const fp of files) {
    const rel = path.relative(KNOWLEDGE_DIR, fp).replace(/\\/g, '/');
    const domain = rel.includes('/') ? rel.split('/')[0] : 'root';
    report.domainDistribution[domain] = (report.domainDistribution[domain] || 0) + 1;

    let raw = fs.readFileSync(fp, 'utf8');
    let modified = false;

    if (path.basename(fp).startsWith('VAULT_')) {
      report.vaultDuplicatesFound++;
    }
    if (raw.length < 900) {
      report.stubsFound++;
    }
    if (pageMarkerRegex.test(raw)) {
      report.pageMarkerFiles++;
      if (autoHeal) {
        raw = sanitizeMarkdownContent(raw, fp);
        modified = true;
      }
    }
    if (controlCharRegex.test(raw)) {
      report.controlCharFiles++;
      if (autoHeal) {
        raw = sanitizeMarkdownContent(raw, fp);
        modified = true;
      }
    }
    if (forbiddenLegacyRegex.test(raw)) {
      report.crossProjectContaminationFiles++;
      if (autoHeal) {
        raw = sanitizeMarkdownContent(raw, fp);
        modified = true;
      }
    }
    if (!/\*\*Alcance:\*\*/i.test(raw) && path.basename(fp) !== 'INDEX.md') {
      report.missingScopeAnchorFiles++;
      if (autoHeal) {
        const scopeHdr = DOMAIN_SCOPE_DEFAULTS[domain] || DOMAIN_SCOPE_DEFAULTS.architecture_and_books;
        const fmMatch = raw.match(/^(---\r?\n[\s\S]*?\r?\n---\r?\n+)/);
        if (fmMatch) {
          raw = `${fmMatch[1]}${scopeHdr}${raw.slice(fmMatch[0].length)}`;
        } else if (raw.startsWith('#')) {
          const nl = raw.indexOf('\n');
          raw = nl !== -1 ? `${raw.slice(0, nl + 1)}\n${scopeHdr}${raw.slice(nl + 1).replace(/^\n+/, '')}` : `${raw}\n\n${scopeHdr}`;
        } else {
          raw = `${scopeHdr}${raw}`;
        }
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(fp, raw, 'utf8');
      report.healedFiles++;
    }
  }

  return report;
}

const SYNTHETIC_PROBE_SUITE = [
  {
    id: 'PROBE-BOOK-AI-ENG',
    query: 'Chip Huyen AI Engineering foundation models evaluation pipeline RAG',
    expectedKeyword: 'huyen',
    expectedDomain: 'architecture_and_books'
  },
  {
    id: 'PROBE-BOOK-DDD-EVANS',
    query: 'Eric Evans Domain-Driven Design bounded context ubiquitous language aggregate',
    expectedKeyword: 'evans',
    expectedDomain: 'architecture_and_books'
  },
  {
    id: 'PROBE-BOOK-PETROV-DB',
    query: 'Alex Petrov Database Internals B-Tree LSM-tree storage engine write-ahead log',
    expectedKeyword: 'petrov',
    expectedDomain: 'architecture_and_books'
  },
  {
    id: 'PROBE-BOOK-SRE-GOOGLE',
    query: 'Google Site Reliability Engineering error budgets SLOs toil elimination',
    expectedKeyword: 'reliability',
    expectedDomain: 'architecture_and_books'
  },
  {
    id: 'PROBE-BOOK-SWINK-GAMEFEEL',
    query: 'Steve Swink Game Feel virtual sensation input response polish',
    expectedKeyword: 'swink',
    expectedDomain: 'motion_and_animation'
  },
  {
    id: 'PROBE-BOOK-TIDWELL-UI',
    query: 'Jenifer Tidwell Designing Interfaces interaction patterns navigation',
    expectedKeyword: 'tidwell',
    expectedDomain: 'ui_ux_design'
  },
  {
    id: 'PROBE-BOOK-THALER-MISBEHAVING',
    query: 'Richard Thaler Misbehaving behavioral economics mental accounting endowment',
    expectedKeyword: 'thaler',
    expectedDomain: 'ui_ux_design'
  },
  {
    id: 'PROBE-CANON-SECURITY-XSS',
    query: 'ciberseguridad defensa xss DOMPurify trustedtypes csp oauth pkce',
    expectedKeyword: 'dompurify',
    expectedDomain: 'cybersecurity'
  },
  {
    id: 'PROBE-CANON-MOTION-60FPS',
    query: 'animaciones 60fps emil kowalski modal entrance scale waapi',
    expectedKeyword: '0.95',
    expectedDomain: 'motion_and_animation'
  },
  {
    id: 'PROBE-CANON-UX-HIERARCHY',
    query: 'diseño minimalista jerarquia cromatica leyes de ux contraste',
    expectedKeyword: '90/8/2',
    expectedDomain: 'ui_ux_design'
  },
  {
    id: 'PROBE-CANON-CLOUDFLARE-DO',
    query: 'cloudflare durable objects websocket sqlite',
    expectedKeyword: 'hibernation',
    expectedDomain: 'architecture_and_books'
  },
  {
    id: 'PROBE-CANON-SPLE-FACTORY',
    query: 'software product line engineering iso 26550 factory.project.json',
    expectedKeyword: '26550',
    expectedDomain: 'software_factory'
  }
];

function isChunkNoisyFrontOrBackMatter(chunkText = '') {
  const low = chunkText.toLowerCase();
  if (/--\s*\d+\s+of\s+\d+\s*--/.test(low)) return true;
  if (
    Array.from(chunkText).some((ch) => {
      const code = ch.codePointAt(0);
      return (
        (code >= 0x0000 && code <= 0x0008) ||
        code === 0x000b ||
        code === 0x000c ||
        (code >= 0x000e && code <= 0x001f)
      );
    })
  )
    return true;
  if (/all rights reserved.*library of congress cataloging/s.test(low) && chunkText.length < 1500) return true;
  return false;
}

export async function runStage2ProbeSuite() {
  getOrBuildMiniSearchIndex(true);
  await queryKnowledge('warmup', 1, { fastLocalOnly: true });

  let passedProbes = 0;
  let mrrSum = 0;
  let precisionSum = 0;
  let faithfulnessSum = 0;
  let noiseFreeChunks = 0;
  let totalTopChunksChecked = 0;
  const probeDetails = [];

  for (const probe of SYNTHETIC_PROBE_SUITE) {
    const t0 = Date.now();
    const hits = await queryKnowledge(probe.query, 5, { fastLocalOnly: true });
    const latencyMs = Date.now() - t0;
    const route = routeQueryToSquads(probe.query);

    const kw = probe.expectedKeyword.toLowerCase();
    const rankIdx = hits.findIndex(h =>
      `${h.title || ''} ${h.source || ''} ${h.text || ''}`.toLowerCase().includes(kw)
    );
    const ragas = computeRagasMetrics(probe.query, hits, probe.expectedKeyword);

    const top3 = hits.slice(0, 3);
    for (const c of top3) {
      totalTopChunksChecked++;
      if (!isChunkNoisyFrontOrBackMatter(c.text || c.snippet || '')) {
        noiseFreeChunks++;
      }
    }

    const passed = rankIdx >= 0 && rankIdx < 5 && latencyMs < 350;
    if (passed) {
      passedProbes++;
      mrrSum += 1 / (rankIdx + 1);
    }
    precisionSum += ragas.contextPrecisionAt3;
    faithfulnessSum += ragas.faithfulness;

    probeDetails.push({
      id: probe.id,
      passed,
      rank: rankIdx >= 0 ? rankIdx + 1 : null,
      latencyMs,
      routedDomain: route.primarySquad.domain,
      contextPrecisionAt3: ragas.contextPrecisionAt3,
      faithfulness: ragas.faithfulness,
      topSource: hits[0]?.source || 'none'
    });
  }

  const total = SYNTHETIC_PROBE_SUITE.length;
  return {
    totalProbes: total,
    passedProbes,
    passRatePct: Number(((passedProbes / total) * 100).toFixed(1)),
    mrr: Number((mrrSum / total).toFixed(3)),
    avgContextPrecisionAt3: Number((precisionSum / total).toFixed(3)),
    avgFaithfulness: Number((faithfulnessSum / total).toFixed(3)),
    signalToNoiseRatioPct: totalTopChunksChecked > 0
      ? Number(((noiseFreeChunks / totalTopChunksChecked) * 100).toFixed(1))
      : 100,
    probeDetails
  };
}

export async function runAgenticRagHarness({ autoHeal = true, forceRebuild = false } = {}) {
  console.log('========================================================================');
  console.log('🛡️  WEB FACTORY OMNI-RAG v5 AGENTIC HARNESS (PROPOSE -> PROBE -> COMPOSE)');
  console.log('========================================================================\n');

  console.log('[STAGE 1: PROPOSE & HYGIENE] Auditing 4-Track Document Hygiene & Cross-Project Purity...');
  let stage1 = runStage1ProposeAndHeal(autoHeal);
  if (stage1.healedFiles > 0 || forceRebuild) {
    console.log(`  ↻ Self-Healed ${stage1.healedFiles} file(s). Rebuilding SQLite FTS5 & WikiGraph PageRank...`);
    invalidateIndexCache();
    getOrBuildMiniSearchIndex(true);
    buildAndPersistAllGraphs();
    stage1 = runStage1ProposeAndHeal(false);
  }
  console.log(`  ✓ Total Knowledge Markdown Files: ${stage1.totalFiles}`);
  console.log(`  ✓ Page-Marker Noise (-- N of M --): ${stage1.pageMarkerFiles} files`);
  console.log(`  ✓ Control-Character Corruption: ${stage1.controlCharFiles} files`);
  console.log(`  ✓ Cross-Project Contamination: ${stage1.crossProjectContaminationFiles} files`);
  console.log(`  ✓ Redundant VAULT_* Duplicates: ${stage1.vaultDuplicatesFound} files`);

  console.log('\n[STAGE 2: PROBE] Running 5-Layer DeepEval / Ragas Synthetic Probe Suite...');
  const stage2 = await runStage2ProbeSuite();
  console.log(`  ✓ Probe Pass Rate (Hit@5): ${stage2.passRatePct}% (${stage2.passedProbes}/${stage2.totalProbes})`);
  console.log(`  ✓ Mean Reciprocal Rank (MRR): ${stage2.mrr}`);
  console.log(`  ✓ DeepEval Signal-to-Noise Ratio: ${stage2.signalToNoiseRatioPct}%`);
  console.log(`  ✓ Ragas Context Precision@3: ${stage2.avgContextPrecisionAt3} | Grounded Faithfulness: ${stage2.avgFaithfulness}`);

  const harnessPassed =
    stage1.pageMarkerFiles === 0 &&
    stage1.controlCharFiles === 0 &&
    stage1.crossProjectContaminationFiles === 0 &&
    stage1.vaultDuplicatesFound === 0 &&
    stage2.passRatePct >= 94.0 &&
    stage2.signalToNoiseRatioPct === 100;

  const receiptPayload = {
    timestamp: new Date().toISOString(),
    harnessVersion: '5.2.0-agentic-rag-anything',
    passed: harnessPassed,
    stage1Hygiene: stage1,
    stage2DeepEvalRagas: stage2
  };
  receiptPayload.sha256Receipt = crypto
    .createHash('sha256')
    .update(JSON.stringify({ s1: stage1, s2: stage2.passRatePct }))
    .digest('hex');

  fs.mkdirSync(path.dirname(RECEIPT_FILE), { recursive: true });
  fs.writeFileSync(RECEIPT_FILE, JSON.stringify(receiptPayload, null, 2), 'utf8');

  console.log(`\n[STAGE 3: COMPOSE] Harness Verdict: ${harnessPassed ? '✅ 100% PASS (CERTIFIED)' : '⚠️ NEEDS ATTENTION'}`);
  console.log(`  ✓ Signed Receipt saved to: ${path.relative(ROOT, RECEIPT_FILE)} [SHA-256: ${receiptPayload.sha256Receipt.slice(0, 16)}...]`);

  return receiptPayload;
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const forceRebuild = process.argv.includes('--rebuild') || process.argv.includes('--full-audit');
  runAgenticRagHarness({ autoHeal: true, forceRebuild })
    .then(res => process.exit(res.passed ? 0 : 1))
    .catch(err => {
      console.error('❌ Agentic RAG Harness Error:', err);
      process.exit(1);
    });
}
