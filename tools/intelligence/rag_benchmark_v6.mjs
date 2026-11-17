#!/usr/bin/env node
/**
 * tools/intelligence/rag_benchmark_v6.mjs — Omni-RAG v6 40-Qrel Real MCP Benchmark
 * =================================================================================
 * Evaluates 40 labeled queries (`qrels`) over the real stdio JSON-RPC MCP server
 * (`tools/mcp/mcp_omni_rag_server.mjs`):
 *   - 16 Cross-Lingual `ES -> EN` queries (`Recall@10 >= 0.85`)
 *   - 10 Full-Book Library queries (`scope: 'library'`, `Recall@10 >= 0.80`)
 *   -  8 Code & Architecture queries (`scope: 'hot'`)
 *   -  6 Adversarial Domain-Isolation probes in `education` (`scope: 'all'`, `Leakage === 0`)
 * Also measures:
 *   - Cold-start latency (`< 500 ms`)
 *   - Warm local p95 latency (`<= 50 ms`)
 *   - Live MCP Server RSS (`<= 110 MB`)
 *   - Unbalanced Markdown code fences across `hot` + `library` (`=== 0`)
 *   - Real FinOps embedding spend (`<= $0.60 USD`)
 * =================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {
  ROOT,
  RAG_HOT_DB_PATH,
  RAG_LIBRARY_DB_PATH,
  openRagDatabase,
  hasUnbalancedCodeFence
} from './rag_store.mjs';
import { getFinOpsLogPath } from './vertex_ai_bridge.mjs';

const __filename = fileURLToPath(import.meta.url);

export const BENCHMARK_40_QRELS = Object.freeze([
  // =========================================================================
  // A. 16 Cross-Lingual ES -> EN Queries
  // =========================================================================
  {
    id: 'XEN-01',
    category: 'es_to_en',
    scope: 'all',
    projectSlug: 'agencia-alfa',
    query: '¿Cómo diseñar módulos profundos con interfaces simples para ocultar complejidad según John Ousterhout?',
    expectedPaths: [
      'knowledge/architecture_and_books/CANON_DOMAIN_MIT_6102_OUSTERHOUT_DEEP_MODULES_AND_REP_INVARIANTS_2026.md',
      'knowledge/architecture_and_books/book_a_philosophy_of_software_design_2nd_edition_john_ousterhout.md',
      'knowledge/architecture_and_books/book_a_philosophy_of_software_design_john_ousterhout.md'
    ]
  },
  {
    id: 'XEN-02',
    category: 'es_to_en',
    scope: 'hot',
    projectSlug: 'academia-ia',
    query: '¿Cómo funciona la progresión de competencias adquirir profundizar y crear en alfabetización de inteligencia artificial?',
    expectedPaths: [
      'knowledge/ai_academy/CANON_PEDAGOGICAL_SCAFFOLDING_UNESCO_DIATAXIS_AND_SOCRATIC_LEARNLM_2026.md'
    ]
  },
  {
    id: 'XEN-03',
    category: 'es_to_en',
    scope: 'hot',
    projectSlug: 'academia-ia',
    query: '¿Cómo reducir la sobrecarga en la memoria de trabajo mediante ejemplos resueltos y bloques breves?',
    expectedPaths: [
      'knowledge/ai_academy/CANON_PEDAGOGICAL_SCAFFOLDING_UNESCO_DIATAXIS_AND_SOCRATIC_LEARNLM_2026.md'
    ]
  },
  {
    id: 'XEN-04',
    category: 'es_to_en',
    scope: 'hot',
    projectSlug: 'academia-ia',
    query: '¿Cómo programar repetición espaciada ética y pausas conscientes sin castigar rachas de estudio?',
    expectedPaths: [
      'knowledge/ai_academy/CANON_ETHICAL_GAMIFICATION_ZERO_COST_TUTOR_AND_PRIVACY_2026.md'
    ]
  },
  {
    id: 'XEN-05',
    category: 'es_to_en',
    scope: 'hot',
    projectSlug: 'academia-ia',
    query: '¿Cómo cifrar llaves propias del estudiante localmente en el navegador sin enviar secretos a servidores?',
    expectedPaths: [
      'knowledge/ai_academy/CANON_ETHICAL_GAMIFICATION_ZERO_COST_TUTOR_AND_PRIVACY_2026.md'
    ]
  },
  {
    id: 'XEN-06',
    category: 'es_to_en',
    scope: 'hot',
    projectSlug: 'academia-ia',
    query: '¿Cómo diseñar interfaces educativas minimalistas con explicaciones interactivas y alto contraste perceptual?',
    expectedPaths: [
      'knowledge/ai_academy/CANON_INCLUSIVE_MINIMALIST_UX_BRILLIANT_STRIPE_AND_DISTILL_2026.md'
    ]
  },
  {
    id: 'XEN-07',
    category: 'es_to_en',
    scope: 'hot',
    projectSlug: 'academia-ia',
    query: '¿Cómo triangular múltiples videos verificados con marcas de tiempo y grafo acíclico de prerrequisitos curriculares?',
    expectedPaths: [
      'knowledge/ai_academy/CANON_AUTONOMOUS_CURRICULUM_ENGINEERING_MULTIMEDIA_TRIANGULATION_AND_ASSESSMENT_2026.md'
    ]
  },
  {
    id: 'XEN-08',
    category: 'es_to_en',
    scope: 'hot',
    projectSlug: 'agencia-alfa',
    query: '¿Cómo garantizar idempotencia distribuida y estado coordinado usando objetos durables en el borde?',
    expectedPaths: [
      'knowledge/software_factory/CANON_DOMAIN_MIT_65840_DISTRIBUTED_IDEMPOTENCY_AND_DURABLE_OBJECTS_2026.md',
      'knowledge/software_factory/CANON_CLOUDFLARE_AGENTS_DURABLE_OBJECTS_AND_CODEMODE_2026.md',
      '.agents/skills/cloudflare-durable-objects/SKILL.md'
    ]
  },
  {
    id: 'XEN-09',
    category: 'es_to_en',
    scope: 'all',
    projectSlug: 'agencia-alfa',
    query: '¿Cómo funcionan el registro anticipado de escritura, árboles B y concurrencia multiversión en motores transaccionales?',
    expectedPaths: [
      'knowledge/architecture_and_books/CANON_DOMAIN_CMU_15445_MVCC_BTREE_WAL_AND_ATOMIC_TX_2026.md',
      'knowledge/architecture_and_books/CANON_QASIMHBTI_BOOKS_SQLITE_SCALABILITY_EDGE_CACHE_AND_ALGORITHMS_2026.md',
      'knowledge/architecture_and_books/book_database_internals_alex_petrov.md'
    ]
  },
  {
    id: 'XEN-10',
    category: 'es_to_en',
    scope: 'hot',
    projectSlug: 'agencia-alfa',
    query: '¿Cómo proteger aplicaciones web con política del mismo origen, encabezados de seguridad de contenido y autenticación sin contraseña?',
    expectedPaths: [
      'knowledge/cybersecurity/CANON_DOMAIN_STANFORD_CS253_WEB_SECURITY_SOP_CSP_AND_WEBAUTHN_2026.md',
      'knowledge/cybersecurity/CANON_CYBERSECURITY_DEVSECOPS_2026.md',
      'knowledge/cybersecurity/CYBERSECURITY_MASTER_PROTOCOL.md'
    ]
  },
  {
    id: 'XEN-11',
    category: 'es_to_en',
    scope: 'hot',
    projectSlug: 'agencia-alfa',
    query: '¿Cómo optimizar el pintado del elemento más grande, latencia de interacción y cero saltos de diseño en navegadores modernos?',
    expectedPaths: [
      'knowledge/ui_ux_design/CANON_DOMAIN_GOOGLE_WEBDEV_CWV_BLINK_V8_A11Y_AND_MODERN_CSS_2026.md',
      'knowledge/architecture_and_books/CANON_DOMAIN_GOOGLE_WEBDEV_CWV_BLINK_V8_A11Y_AND_MODERN_CSS_2026.md',
      '.agents/skills/web-quality-skills/SKILL.md',
      '.agents/skills/web-perf/SKILL.md'
    ]
  },
  {
    id: 'XEN-12',
    category: 'es_to_en',
    scope: 'hot',
    projectSlug: 'agencia-alfa',
    query: '¿Cómo gobernar agentes autónomos mediante diagramas de estados jerárquicos deterministas, guardias y centinelas?',
    expectedPaths: [
      'knowledge/software_factory/deterministic_agentic_ai_xstate_stately_and_statecharts_treatise_2026.md',
      'knowledge/architecture_and_books/deterministic_agentic_ai_xstate_stately_and_statecharts_treatise_2026.md',
      '.agents/skills/deterministic-xstate-and-jev-memory/SKILL.md'
    ]
  },
  {
    id: 'XEN-13',
    category: 'es_to_en',
    scope: 'hot',
    projectSlug: 'agencia-alfa',
    query: '¿Cómo opera la tubería de memoria cognitiva de cinco niveles con consolidación nocturna y decaimiento temporal?',
    expectedPaths: [
      'knowledge/software_factory/jev_and_cognitive_memory_pipelines_master_treatise_2026.md',
      'knowledge/architecture_and_books/jev_and_cognitive_memory_pipelines_master_treatise_2026.md',
      'knowledge/software_factory/CANON_JEV_BAML_SAP_CONTEXT_REPOMAP_AND_HARNESS_ENGINEERING_2026.md',
      '.agents/skills/deterministic-xstate-and-jev-memory/SKILL.md'
    ]
  },
  {
    id: 'XEN-14',
    category: 'es_to_en',
    scope: 'hot',
    projectSlug: 'agencia-alfa',
    query: '¿Cómo organizar una línea de productos de software separando ingeniería de dominio e ingeniería de aplicación bajo normas internacionales?',
    expectedPaths: [
      'knowledge/software_factory/CANON_SPLE_ISO26550_AND_SOFTWARE_FACTORIES_ARCHITECTURE_2026.md'
    ]
  },
  {
    id: 'XEN-15',
    category: 'es_to_en',
    scope: 'hot',
    projectSlug: 'agencia-alfa',
    query: '¿Cómo componer interfaces adaptables usando algoritmos intrínsecos de apilado, barras laterales y rejillas automáticas en CSS?',
    expectedPaths: [
      'knowledge/ui_ux_design/CANON_EVERY_LAYOUT_CSS_ALGORITHMS.md'
    ]
  },
  {
    id: 'XEN-16',
    category: 'es_to_en',
    scope: 'all',
    projectSlug: 'agencia-alfa',
    query: '¿Cómo realizar modelado sistemático de amenazas en arquitectura de software para anticipar vectores de ataque?',
    expectedPaths: [
      'knowledge/cybersecurity/CANON_THREAT_MODELING_ADAM_SHOSTACK.md',
      'knowledge/cybersecurity/CANON_SECURITY_ENGINEERING_ROSS_ANDERSON.md',
      'knowledge/cybersecurity/CANON_CYBERSECURITY_DEVSECOPS_2026.md'
    ]
  },

  // =========================================================================
  // B. 10 Library Full-Book Queries (`scope: 'library'`)
  // =========================================================================
  {
    id: 'LIB-01',
    category: 'library',
    scope: 'library',
    projectSlug: 'agencia-alfa',
    query: 'Martin Kleppmann replication partitioning consensus distributed data-intensive applications',
    expectedPaths: [
      'knowledge/architecture_and_books/book_designing_data_intensive_applications_martin_kleppmann_full.md',
      'knowledge/architecture_and_books/book_making_sense_of_stream_processing_martin_kleppmann.md'
    ]
  },
  {
    id: 'LIB-02',
    category: 'library',
    scope: 'library',
    projectSlug: 'agencia-alfa',
    query: 'Alex Petrov database internals B-Tree slotted pages LSM storage engines',
    expectedPaths: [
      'knowledge/architecture_and_books/book_database_internals_alex_petrov.md'
    ]
  },
  {
    id: 'LIB-03',
    category: 'library',
    scope: 'library',
    projectSlug: 'agencia-alfa',
    query: 'John Ousterhout philosophy of software design deep modules information hiding complexity',
    expectedPaths: [
      'knowledge/architecture_and_books/book_a_philosophy_of_software_design_2nd_edition_john_ousterhout.md',
      'knowledge/architecture_and_books/book_a_philosophy_of_software_design_john_ousterhout.md'
    ]
  },
  {
    id: 'LIB-04',
    category: 'library',
    scope: 'library',
    projectSlug: 'agencia-alfa',
    query: 'Robert Bringhurst elements of typographic style rhythm proportion measure harmony',
    expectedPaths: [
      'knowledge/ui_ux_design/book_elements_of_typographic_style_bringhurst.md'
    ]
  },
  {
    id: 'LIB-05',
    category: 'library',
    scope: 'library',
    projectSlug: 'agencia-alfa',
    query: 'Don Norman design of everyday things affordances signifiers conceptual models feedback',
    expectedPaths: [
      'knowledge/ui_ux_design/book_design_of_everyday_things_don_norman.md',
      'knowledge/ui_ux_design/book_emotional_design_why_we_love_or_hate_everyday_things_donald_.md'
    ]
  },
  {
    id: 'LIB-06',
    category: 'library',
    scope: 'library',
    projectSlug: 'agencia-alfa',
    query: 'Steve Krug usability dont make me think web navigation trunk test',
    expectedPaths: [
      'knowledge/ui_ux_design/book_dont_make_me_think_revisited_a_common_sense_approach_to_web_.md'
    ]
  },
  {
    id: 'LIB-07',
    category: 'library',
    scope: 'library',
    projectSlug: 'agencia-alfa',
    query: 'Brad Frost atomic design atoms molecules organisms templates component systems',
    expectedPaths: [
      'knowledge/ui_ux_design/book_atomic_design.md'
    ]
  },
  {
    id: 'LIB-08',
    category: 'library',
    scope: 'library',
    projectSlug: 'agencia-alfa',
    query: 'Jean-Philippe Aumasson serious cryptography authenticated encryption symmetric ciphers',
    expectedPaths: [
      'knowledge/cybersecurity/book_serious_cryptography_aumasson.md'
    ]
  },
  {
    id: 'LIB-09',
    category: 'library',
    scope: 'library',
    projectSlug: 'agencia-alfa',
    query: 'Michal Zalewski tangled web browser security model same-origin policy cookies',
    expectedPaths: [
      'knowledge/cybersecurity/book_the_tangled_web_michal_zalewski.md'
    ]
  },
  {
    id: 'LIB-10',
    category: 'library',
    scope: 'library',
    projectSlug: 'agencia-alfa',
    query: 'Gamma Helm Johnson Vlissides Gang of Four object-oriented design patterns factory observer',
    expectedPaths: [
      'knowledge/architecture_and_books/book_design_patterns_gang_of_four_gamma_helm_johnson_vlissides.md'
    ]
  },

  // =========================================================================
  // C. 8 Code & Architecture Queries (`scope: 'hot'`)
  // =========================================================================
  {
    id: 'ARC-01',
    category: 'code_arch',
    scope: 'hot',
    projectSlug: 'agencia-alfa',
    query: 'W3C DTCG 2025.10 OKLCH perceptual color tokens APCA contrast 90/8/2 budget',
    expectedPaths: [
      'knowledge/software_factory/CANON_MULTI_BRAND_DESIGN_SYSTEMS_DTCG_STYLE_DICTIONARY_AND_ARCHETYPES_2026.md',
      'knowledge/software_factory/CANON_WEB_SOFTWARE_FACTORY_MCP_DTCG_AND_LIGHTNINGCSS_2026.md'
    ]
  },
  {
    id: 'ARC-02',
    category: 'code_arch',
    scope: 'hot',
    projectSlug: 'agencia-alfa',
    query: 'Astro Islands architecture Cloudflare Workers Static Assets zero JS hydration',
    expectedPaths: [
      'knowledge/software_factory/CANON_ASTRO5_CLOUDFLARE_WORKERS_AND_MODERN_WEB_TEMPLATES_2026.md'
    ]
  },
  {
    id: 'ARC-03',
    category: 'code_arch',
    scope: 'hot',
    projectSlug: 'agencia-alfa',
    query: 'BoundaryML BAML schema-aligned parsing TypeBuilder ClientRegistry Collector',
    expectedPaths: [
      'knowledge/software_factory/CANON_BOUNDARYML_BAML_OFFICIAL_DOCS_AND_FACTORY_INTEGRATION_REPORT_2026.md',
      'knowledge/software_factory/CANON_JEV_BAML_SAP_CONTEXT_REPOMAP_AND_HARNESS_ENGINEERING_2026.md'
    ]
  },
  {
    id: 'ARC-04',
    category: 'code_arch',
    scope: 'hot',
    projectSlug: 'agencia-alfa',
    query: 'Cloudflare D1 SQLite WAL FinOps paid workers edge optimization',
    expectedPaths: [
      'knowledge/architecture_and_books/CANON_CLOUDFLARE_D1_WORKERS_PAID_FINOPS_AND_EDGE_OPTIMIZATION_2026.md'
    ]
  },
  {
    id: 'ARC-05',
    category: 'code_arch',
    scope: 'hot',
    projectSlug: 'agencia-alfa',
    query: 'PostgreSQL Row-Level Security CIS Ory Zanzibar GCP KMS Zizmor GitHub Actions',
    expectedPaths: [
      'knowledge/cybersecurity/CANON_OFFICIAL_DOCS_POSTGRES_RLS_CIS_ORY_ZANZIBAR_GCP_KMS_AND_ZIZMOR_2026.md',
      'knowledge/architecture_and_books/CANON_OFFICIAL_DOCS_POSTGRES_RLS_CIS_ORY_ZANZIBAR_GCP_KMS_AND_ZIZMOR_2026.md'
    ]
  },
  {
    id: 'ARC-06',
    category: 'code_arch',
    scope: 'hot',
    projectSlug: 'agencia-alfa',
    query: 'Automated visual QA VLM critic Playwright accessibility tree CTO HITL gate',
    expectedPaths: [
      'knowledge/architecture_and_books/CANON_AUTOMATED_VISUAL_QA_VLM_CRITIC_AND_CTO_HITL_GATE_2026.md',
      'knowledge/architecture_and_books/CANON_FRONTEND_VERIFICATION_PIPELINE_AND_BENCHMARKS_2026.md'
    ]
  },
  {
    id: 'ARC-07',
    category: 'code_arch',
    scope: 'hot',
    projectSlug: 'agencia-alfa',
    query: 'Headroom reversible CCR compression CocoIndex AST graph CodeMode OpenSpace GEPA',
    expectedPaths: [
      'knowledge/software_factory/CANON_OFFICIAL_DOCS_HARNESS2_GEPA_OPENSPACE_HEADROOM_COCOINDEX_AND_CODEMODE_2026.md'
    ]
  },
  {
    id: 'ARC-08',
    category: 'code_arch',
    scope: 'hot',
    projectSlug: 'agencia-alfa',
    query: 'OWASP ASVS v5.0 Content-Security-Policy DOMPurify OAuth 2.1 PKCE DevSecOps',
    expectedPaths: [
      'knowledge/cybersecurity/CANON_CYBERSECURITY_DEVSECOPS_2026.md',
      'knowledge/cybersecurity/CYBERSECURITY_MASTER_PROTOCOL.md'
    ]
  },

  // =========================================================================
  // D. 6 Adversarial Domain-Isolation Probes in `education` (`academia-ia`)
  // =========================================================================
  {
    id: 'NEG-01',
    category: 'negative_isolation_education',
    scope: 'all',
    projectSlug: 'academia-ia',
    query: 'casino slots overlay RTP binomial sniper bankroll Stake Kick crowd play',
    forbiddenDomains: ['streaming_and_overlays', 'motion_and_animation', 'commercial_marketing_skills']
  },
  {
    id: 'NEG-02',
    category: 'negative_isolation_education',
    scope: 'all',
    projectSlug: 'academia-ia',
    query: 'sorteo interactivo en vivo ruleta twitch obs overlay apuestas',
    forbiddenDomains: ['streaming_and_overlays', 'motion_and_animation', 'commercial_marketing_skills']
  },
  {
    id: 'NEG-03',
    category: 'negative_isolation_education',
    scope: 'all',
    projectSlug: 'academia-ia',
    query: 'Three.js r186 WebGPURenderer TSL holographic shaders GaussianSplat 3D dioramas',
    forbiddenDomains: ['streaming_and_overlays', 'motion_and_animation', 'commercial_marketing_skills']
  },
  {
    id: 'NEG-04',
    category: 'negative_isolation_education',
    scope: 'all',
    projectSlug: 'academia-ia',
    query: 'GLSL fragment shader PBR lighting filament cinematography 3D game shaders',
    forbiddenDomains: ['streaming_and_overlays', 'motion_and_animation', 'commercial_marketing_skills']
  },
  {
    id: 'NEG-05',
    category: 'negative_isolation_education',
    scope: 'all',
    projectSlug: 'academia-ia',
    query: 'Hormozi $100M offers Schwartz copywriting checkout CRO Cialdini scarcity pricing',
    forbiddenDomains: ['streaming_and_overlays', 'motion_and_animation', 'commercial_marketing_skills']
  },
  {
    id: 'NEG-06',
    category: 'negative_isolation_education',
    scope: 'all',
    projectSlug: 'academia-ia',
    query: 'pasarelas de pago MercadoPago Stripe LemonSqueezy Polar suscripciones checkout',
    forbiddenDomains: ['streaming_and_overlays', 'motion_and_animation', 'commercial_marketing_skills']
  }
]);

const FORBIDDEN_EDU_PATH_PATTERNS =
  /(?:streaming_and_overlays|motion_and_animation|PAYMENT_GATEWAYS|EDGE_PAYMENTS|MERCADOPAGO|STRIPE_LEMONSQUEEZY|CHECKOUT_CRO|HORMOZI_OFFERS|SCHWARTZ_CRO|B2B_COPYWRITING|STREAM_MARKETING|SLOTS?_OVERLAY|3D_GAME_SHADERS|WEBGPU_THREE|HOLO_SHADERS)/i;

function percentile(sortedNums, p) {
  if (!sortedNums.length) return 0;
  const idx = Math.min(sortedNums.length - 1, Math.max(0, Math.ceil((p / 100) * sortedNums.length) - 1));
  return Number(sortedNums[idx].toFixed(2));
}

function createMcpStdioClient() {
  const serverPath = path.join(ROOT, 'tools', 'mcp', 'mcp_omni_rag_server.mjs');
  const child = spawn(process.execPath, [serverPath], {
    cwd: ROOT,
    stdio: ['pipe', 'pipe', 'pipe'],
    windowsHide: true
  });

  const pending = new Map();
  let nextId = 1;

  const rl = readline.createInterface({ input: child.stdout });
  rl.on('line', (line) => {
    const trimmed = line.trim();
    if (!trimmed.startsWith('{')) return;
    try {
      const msg = JSON.parse(trimmed);
      if (msg.id !== undefined && pending.has(msg.id)) {
        const { resolve } = pending.get(msg.id);
        pending.delete(msg.id);
        resolve(msg);
      }
    } catch {}
  });

  const rpc = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = nextId++;
      const timer = setTimeout(() => {
        pending.delete(id);
        reject(new Error(`MCP_RPC_TIMEOUT:${method}`));
      }, 45000);
      pending.set(id, {
        resolve: (val) => {
          clearTimeout(timer);
          resolve(val);
        }
      });
      child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n');
    });

  const close = () => {
    try { rl.close(); } catch {}
    try { child.stdin.end(); } catch {}
    try { child.kill(); } catch {}
  };

  return { child, rpc, close };
}

function computeStageEmbeddingSpendUsd() {
  const logPath = getFinOpsLogPath();
  if (!fs.existsSync(logPath)) return 0;
  const todayPrefix = new Date().toISOString().slice(0, 10);
  let sum = 0;
  const lines = fs.readFileSync(logPath, 'utf8').split(/\r?\n/).filter(Boolean);
  for (const l of lines) {
    try {
      const entry = JSON.parse(l);
      if (
        String(entry.timestamp || '').startsWith(todayPrefix) &&
        String(entry.model || '') === 'gemini-embedding-001'
      ) {
        sum += Number(entry.estCostUsd || 0);
      }
    } catch {}
  }
  return Number(sum.toFixed(6));
}

function countBrokenCodeFencesAcrossStores() {
  let broken = 0;
  let totalChunks = 0;
  for (const dbPath of [RAG_HOT_DB_PATH, RAG_LIBRARY_DB_PATH]) {
    if (!fs.existsSync(dbPath)) continue;
    const db = openRagDatabase(dbPath);
    const rows = db.prepare('SELECT text FROM chunks').all();
    totalChunks += rows.length;
    for (const r of rows) {
      if (hasUnbalancedCodeFence(r.text)) broken++;
    }
  }
  return { broken, totalChunks };
}

export async function runRagBenchmarkV6(options = {}) {
  const allowNetwork = options.allowNetwork !== false;
  const client = createMcpStdioClient();

  try {
    await client.rpc('initialize', {
      protocolVersion: '2025-06-18',
      capabilities: {},
      clientInfo: { name: 'rag-benchmark-v6', version: '6.0.0' }
    });

    // 1. Measure Cold-Start MCP Stats + First Local Query Latency (< 500 ms target)
    const coldT0 = performance.now();
    const coldStatsMsg = await client.rpc('tools/call', {
      name: 'omni_rag_stats',
      arguments: {}
    });
    const coldQueryMsg = await client.rpc('tools/call', {
      name: 'omni_rag_query',
      arguments: {
        query: 'UNESCO Acquire Deepen Create',
        scope: 'hot',
        projectSlug: 'academia-ia',
        limit: 5,
        allowNetwork: false
      }
    });
    const coldStartMs = Number((performance.now() - coldT0).toFixed(2));
    const statsPayload = JSON.parse(coldStatsMsg?.result?.content?.[0]?.text || '{}');
    void coldQueryMsg;

    // 2. Run all 40 Qrels over the live MCP Server (pass 1 warms query_emb_cache when online)
    const queryReports = [];
    for (const qrel of BENCHMARK_40_QRELS) {
      const msg = await client.rpc('tools/call', {
        name: 'omni_rag_query',
        arguments: {
          query: qrel.query,
          scope: qrel.scope,
          projectSlug: qrel.projectSlug,
          limit: 10,
          maxTokens: 1200,
          allowNetwork
        }
      });
      const payload = JSON.parse(msg?.result?.content?.[0]?.text || '{}');
      const results = Array.isArray(payload.results) ? payload.results : [];
      const topPaths = results.map((r) => String(r.source || '').replace(/^local:\/\//, '').split('#')[0]);

      if (qrel.category === 'negative_isolation_education') {
        const leakedItems = results.filter(
          (r) =>
            (qrel.forbiddenDomains || []).includes(r.domain) ||
            FORBIDDEN_EDU_PATH_PATTERNS.test(String(r.source || ''))
        );
        queryReports.push({
          id: qrel.id,
          category: qrel.category,
          scope: qrel.scope,
          query: qrel.query,
          searchMode: payload.searchMode,
          returnedTokens: payload.returnedTokens,
          leakedCount: leakedItems.length,
          leakedSources: leakedItems.map((x) => x.source),
          passed: leakedItems.length === 0,
          top3: topPaths.slice(0, 3)
        });
      } else {
        const expectedSet = new Set((qrel.expectedPaths || []).map((p) => p.toLowerCase()));
        const expectedBasenames = new Set((qrel.expectedPaths || []).map((p) => path.basename(p).toLowerCase()));
        const hitRankIdx = topPaths.findIndex(
          (p) => expectedSet.has(p.toLowerCase()) || expectedBasenames.has(path.basename(p).toLowerCase())
        );
        const hitAt10 = hitRankIdx !== -1 && hitRankIdx < 10;
        const hitAt3 = hitRankIdx !== -1 && hitRankIdx < 3;
        queryReports.push({
          id: qrel.id,
          category: qrel.category,
          scope: qrel.scope,
          query: qrel.query,
          searchMode: payload.searchMode,
          returnedTokens: payload.returnedTokens,
          hitAt10,
          hitAt3,
          rank: hitRankIdx !== -1 ? hitRankIdx + 1 : null,
          mrr: hitRankIdx !== -1 ? Number((1 / (hitRankIdx + 1)).toFixed(4)) : 0,
          passed: hitAt10,
          top3: topPaths.slice(0, 3)
        });
      }
    }

    // 3. Measure Warm Local p95 Latency across all 40 queries over stdio JSON-RPC (cached vectors / local SQLite)
    const warmLatenciesMs = [];
    for (const qrel of BENCHMARK_40_QRELS) {
      const w0 = performance.now();
      await client.rpc('tools/call', {
        name: 'omni_rag_query',
        arguments: {
          query: qrel.query,
          scope: qrel.scope,
          projectSlug: qrel.projectSlug,
          limit: 10,
          maxTokens: 1200,
          allowNetwork: false
        }
      });
      warmLatenciesMs.push(performance.now() - w0);
    }
    warmLatenciesMs.sort((a, b) => a - b);

    // 4. Measure Live MCP Server RSS AFTER serving 80+ queries across hot & library
    const postStatsMsg = await client.rpc('tools/call', {
      name: 'omni_rag_stats',
      arguments: {}
    });
    const postStatsPayload = JSON.parse(postStatsMsg?.result?.content?.[0]?.text || '{}');
    const mcpRssMb = Number(
      postStatsPayload?.local_omni_rag_v6?.rss_mb ?? statsPayload?.local_omni_rag_v6?.rss_mb ?? 0
    );

    const esEnItems = queryReports.filter((q) => q.category === 'es_to_en');
    const libItems = queryReports.filter((q) => q.category === 'library');
    const arcItems = queryReports.filter((q) => q.category === 'code_arch');
    const negItems = queryReports.filter((q) => q.category === 'negative_isolation_education');

    const recallAt10EsEn = Number(
      (esEnItems.filter((x) => x.hitAt10).length / Math.max(1, esEnItems.length)).toFixed(4)
    );
    const recallAt10Library = Number(
      (libItems.filter((x) => x.hitAt10).length / Math.max(1, libItems.length)).toFixed(4)
    );
    const recallAt10CodeArch = Number(
      (arcItems.filter((x) => x.hitAt10).length / Math.max(1, arcItems.length)).toFixed(4)
    );
    const domainLeakCount = negItems.reduce((acc, x) => acc + Number(x.leakedCount || 0), 0);
    const maxInlineTokensObserved = Math.max(...queryReports.map((q) => Number(q.returnedTokens || 0)));

    const warmP50Ms = percentile(warmLatenciesMs, 50);
    const warmP95Ms = percentile(warmLatenciesMs, 95);
    const fenceAudit = countBrokenCodeFencesAcrossStores();
    const finopsSpendUsd = computeStageEmbeddingSpendUsd();

    const gates = {
      esToEnRecallAt10Met: recallAt10EsEn >= 0.85,
      libraryRecallAt10Met: recallAt10Library >= 0.8,
      zeroDomainLeakageMet: domainLeakCount === 0,
      coldStartUnder500MsMet: coldStartMs < 500,
      warmP95Under50MsMet: warmP95Ms <= 50,
      mcpRssUnder110MbMet: mcpRssMb > 0 && mcpRssMb <= 110,
      zeroBrokenCodeFencesMet: fenceAudit.broken === 0,
      inlineTokenBudgetMet: maxInlineTokensObserved <= 1200,
      finopsUnder060UsdMet: finopsSpendUsd <= 0.6
    };

    const allPassed = Object.values(gates).every(Boolean);

    return {
      schema: 'omni-rag-v6-benchmark-40q-v1',
      generatedAt: new Date().toISOString(),
      allPassed,
      metrics: {
        totalQrels: BENCHMARK_40_QRELS.length,
        recallAt10EsToEn: recallAt10EsEn,
        esToEnHits: `${esEnItems.filter((x) => x.hitAt10).length}/${esEnItems.length}`,
        recallAt10Library: recallAt10Library,
        libraryHits: `${libItems.filter((x) => x.hitAt10).length}/${libItems.length}`,
        recallAt10CodeArch,
        codeArchHits: `${arcItems.filter((x) => x.hitAt10).length}/${arcItems.length}`,
        domainLeakCount,
        negativeProbesPassed: `${negItems.filter((x) => x.passed).length}/${negItems.length}`,
        coldStartMs,
        warmP50Ms,
        warmP95Ms,
        mcpServerRssMb: mcpRssMb,
        brokenCodeFences: fenceAudit.broken,
        totalChunksAuditedForFences: fenceAudit.totalChunks,
        maxInlineTokensObserved,
        finopsEmbeddingSpendUsd: finopsSpendUsd,
        storeSummary: postStatsPayload?.local_omni_rag_v6 || null
      },
      gates,
      queries: queryReports
    };
  } finally {
    client.close();
  }
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]).toLowerCase() === path.resolve(__filename).toLowerCase()
) {
  const offline = process.argv.includes('--offline');
  const outIdx = process.argv.indexOf('--output');
  const report = await runRagBenchmarkV6({ allowNetwork: !offline });
  if (outIdx !== -1 && process.argv[outIdx + 1]) {
    const outAbs = path.resolve(ROOT, process.argv[outIdx + 1]);
    fs.mkdirSync(path.dirname(outAbs), { recursive: true });
    fs.writeFileSync(outAbs, JSON.stringify(report, null, 2) + '\n', 'utf8');
  }
  console.log(JSON.stringify({ allPassed: report.allPassed, metrics: report.metrics, gates: report.gates }, null, 2));
  const misses = report.queries.filter((q) => !q.passed);
  if (misses.length > 0) {
    console.log('MISSES:', JSON.stringify(misses, null, 2));
  }
  if (!report.allPassed) {
    process.exitCode = 1;
  }
}
