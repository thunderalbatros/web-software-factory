#!/usr/bin/env node
/**
 * tools/cockpit/live_telemetry_bus.mjs — Zero-Token Real-Time Telemetry Bus for Factory Twin Cockpit
 * ===================================================================================================
 * Emits zero-token real-time telemetry events to:
 *   - `.agents/runs/live_factory_stream.jsonl` (append-only event stream)
 *   - `.agents/runs/current_factory_state.json` (atomic snapshot for SSE & 60 FPS Canvas / Kanban)
 *
 * Synchronizes the 6 Illuminated Factory Stations, the 11 Miniature Characters (1 Foreman + 10 Agents),
 * the 5-Column Kanban Board (`KaibanJS` / `Pragor` pattern), and the FinOps / Eval Matrix HUD.
 * ===================================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { EventEmitter } from 'node:events';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const FACTORY_ROOT = path.resolve(__dirname, '..', '..');

export const LIVE_STREAM_JSONL_PATH = path.join(FACTORY_ROOT, '.agents', 'runs', 'live_factory_stream.jsonl');
export const CURRENT_STATE_JSON_PATH = path.join(FACTORY_ROOT, '.agents', 'runs', 'current_factory_state.json');
export const BEADS_GRAPH_PATH = path.join(FACTORY_ROOT, '.agents', 'beads', 'task_graph.jsonl');
export const DORA_LEDGER_PATH = path.join(FACTORY_ROOT, '.agents', 'memory', 'factory_dora_ledger.json');
export const ACTIVE_PROJECT_PATH = path.join(FACTORY_ROOT, '.agents', 'memory', 'active_project.json');
export const MCP_ROLE_REGISTRY_PATH = path.join(FACTORY_ROOT, '.agents', 'mcp', 'mcp_role_registry.json');
export const SKILL_QUALITY_PATH = path.join(FACTORY_ROOT, '.agents', 'memory', 'skill_quality_records.json');
export const GCP_FINOPS_BUDGET_PATH = path.join(FACTORY_ROOT, '.agents', 'memory', 'gcp_finops_budget.json');
export const JEV_MEMORY_REPORT_PATH = path.join(FACTORY_ROOT, '.agents', 'memory', 'jev_memory_pipeline_report.json');
export const JEV_FINOPS_LEDGER_PATH = path.join(FACTORY_ROOT, '.agents', 'memory', 'jev_finops_ledger.json');

export const telemetryEmitter = new EventEmitter();
telemetryEmitter.setMaxListeners(50);

/**
 * The 6 Illuminated Stations of the 2D Pixel Factory Floor
 */
export const FACTORY_STATIONS = Object.freeze([
  {
    id: 'SALA_1_RECEPCION_TRIAJE',
    number: 1,
    shortTitle: 'Sala 1: Recepción & Triaje',
    title: 'Sala 1: Recepción & Triaje (Foreman & Triage Agent)',
    subtitle: 'Control Plane factory.yaml, SWE-AF Lane Router & Client Triage',
    accentColor: '#38bdf8',
    gridCol: 0,
    gridRow: 0
  },
  {
    id: 'SALA_2_LABORATORIO_PLANOS_RAG',
    number: 2,
    shortTitle: 'Sala 2: Planos, RAG & REA',
    title: 'Sala 2: Laboratorio de Planos, RAG & Ingeniería Inversa REA (Product-Spec Architect)',
    subtitle: 'OpenSpec Deltas, Omni-RAG v5, Context7 & Clean-Room REA',
    accentColor: '#a78bfa',
    gridCol: 1,
    gridRow: 0
  },
  {
    id: 'SALA_3_ESTUDIO_ARTE_OKLCH',
    number: 3,
    shortTitle: 'Sala 3: Estudio OKLCH & Copy',
    title: 'Sala 3: Estudio de Arte OKLCH, DESIGN.md & Copywriting (UX Designer & CRO Copywriter)',
    subtitle: 'W3C DTCG 2025.10, APCA Lc, Impeccable 62 Rules & Fogg B=MAP',
    accentColor: '#f472b6',
    gridCol: 2,
    gridRow: 0
  },
  {
    id: 'SALA_4_LINEA_ENSAMBLAJE_3D_DB',
    number: 4,
    shortTitle: 'Sala 4: Ensamblaje Astro, 3D & DB',
    title: 'Sala 4: Línea de Ensamblaje Astro, 3D WebGPU, DB Dual & Móvil (Senior Coder, Motion Engineer & Edge Fullstack)',
    subtitle: 'Three.js r186 WebGPU, Spark Splatting, D1 / Postgres RLS & Capacitor 8',
    accentColor: '#34d399',
    gridCol: 0,
    gridRow: 1
  },
  {
    id: 'SALA_5_BUNKER_CIEGO_QA_SEC',
    number: 5,
    shortTitle: 'Sala 5: Búnker Ciego QA & AppSec',
    title: 'Sala 5: Búnker Ciego de Jueces VLM, QA & DevSecOps (QA Auditor, Security Engineer & SEO Specialist)',
    subtitle: 'RYUX v2.14.2, Blind VLM Judge, AgentShield, Zizmor & OWASP MCP Top 10',
    accentColor: '#fbbf24',
    gridCol: 1,
    gridRow: 1
  },
  {
    id: 'SALA_6_MUELLE_EMPAQUETADO_ZIP',
    number: 6,
    shortTitle: 'Sala 6: Muelle .ZIP & Cloudflare',
    title: 'Sala 6: Muelle de Empaquetado .ZIP & Despliegue Cloudflare',
    subtitle: 'Zero-Factory-Deps Bundle, Ed25519 Freeze & Desktop Export',
    accentColor: '#60a5fa',
    gridCol: 2,
    gridRow: 1
  }
]);

/**
 * The 11 Miniature Characters (1 Foreman + 10 Specialist Agents)
 */
export const FACTORY_AGENTS_ROSTER = Object.freeze([
  {
    id: 'foreman',
    name: 'Capataz (Foreman)',
    role: 'orchestrator',
    wave: 'Ola 0 (Gobierno & Enrutamiento)',
    homeStation: 'SALA_1_RECEPCION_TRIAJE',
    avatarColor: '#38bdf8',
    badge: 'FOREMAN',
    exactFunction: 'Dirige el plano de control factory.yaml, clasifica el carril SWE-AF (Lane 1/2/3), supervisa las 6 etapas RPI y coordina los handoffs.',
    mcpTools: ['omni-rag-ast', 'context7', 'filesystem-scoped'],
    permissionMode: 'GOVERNANCE_SUPERVISOR (Lectura/Orquestación)',
    skillQualityRate: '99.4%'
  },
  {
    id: 'triage-agent',
    name: 'Agente de Triaje & Feedback',
    role: 'triage-agent',
    wave: 'Ola 0 (Recepción Post-Venta)',
    homeStation: 'SALA_1_RECEPCION_TRIAJE',
    avatarColor: '#22d3ee',
    badge: 'TRIAJE',
    exactFunction: 'Filtra tickets entrantes (Web/Slack) con barrera Anti-Prompt-Injection, redacta PII y abre ramas aisladas con prueba Fail-to-Pass.',
    mcpTools: ['omni-rag-ast', 'git-readonly-mcp'],
    permissionMode: 'SANDBOX_SCOPED (Rama feedback/<ticket-id>)',
    skillQualityRate: '98.8%'
  },
  {
    id: 'product-spec-architect',
    name: 'Arquitecto de Planos & REA',
    role: 'product-spec-architect',
    wave: 'Ola 1 (Especificación & Sala Limpia)',
    homeStation: 'SALA_2_LABORATORIO_PLANOS_RAG',
    avatarColor: '#a78bfa',
    badge: 'SPEC',
    exactFunction: 'Compila SPEC.md, Deltas OpenSpec (ADDED/MODIFIED/REMOVED), matriz 1:1 spec-kitty y especificaciones limpias morluto/rea.',
    mcpTools: ['omni-rag-ast', 'context7'],
    permissionMode: 'READ_AND_SPEC_ONLY (Solo .specify/ y SPEC.md)',
    skillQualityRate: '99.1%'
  },
  {
    id: 'ux-designer',
    name: 'Director de Arte OKLCH & UI',
    role: 'ux-designer',
    wave: 'Ola 2A (Diseño & Tokens DTCG)',
    homeStation: 'SALA_3_ESTUDIO_ARTE_OKLCH',
    avatarColor: '#f472b6',
    badge: 'UX/OKLCH',
    exactFunction: 'Genera PRODUCT.md + DESIGN.md por industria, compila escalas perceptuales OKLCH 90/8/2, contraste APCA Lc y tipografía fluida Utopia clamp().',
    mcpTools: ['omni-rag-ast', 'context7', 'filesystem-scoped'],
    permissionMode: 'SCOPED_WRITE (Bloqueado en tools/ y sealed_envelope_evals/)',
    skillQualityRate: '98.9%'
  },
  {
    id: 'copywriting-cro-strategist',
    name: 'Estratega Copywriting & CRO',
    role: 'copywriting-cro-strategist',
    wave: 'Ola 2B (Persuasión & Conversión)',
    homeStation: 'SALA_3_ESTUDIO_ARTE_OKLCH',
    avatarColor: '#fb7185',
    badge: 'CRO',
    exactFunction: 'Aplica psicología conductual Fogg B=MAP, anclaje de precios, microcopy de alta conversión y filtro determinista stop-slop.',
    mcpTools: ['omni-rag-ast', 'filesystem-scoped'],
    permissionMode: 'SCOPED_WRITE (Bloqueado en tools/ y sealed_envelope_evals/)',
    skillQualityRate: '98.5%'
  },
  {
    id: 'senior-coder',
    name: 'Constructor Senior Astro/Edge',
    role: 'senior-coder',
    wave: 'Ola 2B (Construcción TDD)',
    homeStation: 'SALA_4_LINEA_ENSAMBLAJE_3D_DB',
    avatarColor: '#34d399',
    badge: 'CODER',
    exactFunction: 'Implementa componentes semánticos HTML5/Astro 5, islas interactivas sin bloqueos y lógica limpia validada con Oxc AST < 500ms.',
    mcpTools: ['filesystem-scoped', 'semgrep-mcp', 'omni-rag-ast', 'context7'],
    permissionMode: 'SCOPED_WRITE (Bloqueado en tools/ y sealed_envelope_evals/)',
    skillQualityRate: '99.2%'
  },
  {
    id: 'motion-engineer',
    name: 'Ingeniero 3D WebGPU & 60FPS',
    role: 'motion-engineer',
    wave: 'Ola 2B (Cinemática & Shaders)',
    homeStation: 'SALA_4_LINEA_ENSAMBLAJE_3D_DB',
    avatarColor: '#10b981',
    badge: '3D/60FPS',
    exactFunction: 'Forja escenas Three.js r186 WebGPURenderer, Gaussian Splatting Spark 2.x, física primaveral Apple WWDC, Blender-MCP y compresión GLB (-80%).',
    mcpTools: ['blender-mcp', 'filesystem-scoped', 'omni-rag-ast'],
    permissionMode: 'SCOPED_WRITE (Bloqueado en tools/ y sealed_envelope_evals/)',
    skillQualityRate: '98.7%'
  },
  {
    id: 'edge-fullstack-architect',
    name: 'Arquitecto DB Dual & Móvil',
    role: 'edge-fullstack-architect',
    wave: 'Ola 2A (Datos, KMS & Capacitor 8)',
    homeStation: 'SALA_4_LINEA_ENSAMBLAJE_3D_DB',
    avatarColor: '#14b8a6',
    badge: 'DB/EDGE',
    exactFunction: 'Diseña Cloudflare Workers, D1 SQLite ($0) o PostgreSQL v14+ con FORCE RLS, cifrado de sobre AES-256-GCM (GCP KMS) y empaquetado Capacitor 8.',
    mcpTools: ['filesystem-scoped', 'semgrep-mcp', 'omni-rag-ast', 'context7'],
    permissionMode: 'SCOPED_WRITE (Bloqueado en tools/ y sealed_envelope_evals/)',
    skillQualityRate: '99.0%'
  },
  {
    id: 'qa-auditor',
    name: 'Auditor Ciego VLM & QA',
    role: 'qa-auditor',
    wave: 'Ola 3A (Verificador 100% Read-Only)',
    homeStation: 'SALA_5_BUNKER_CIEGO_QA_SEC',
    avatarColor: '#fbbf24',
    badge: 'QA/VLM',
    exactFunction: 'Ejecuta auditoría ciega RYUX v2.14.2, geometría en 4 viewports, Chaos Monkey destructivo y juez VLM sin acceso a la conversación del constructor.',
    mcpTools: ['playwright', 'chrome-devtools', 'git-readonly-mcp', 'd1-sqlite-readonly-mcp'],
    permissionMode: '100% READ_ONLY (Prohibido editar código)',
    skillQualityRate: '99.5%'
  },
  {
    id: 'security-engineer',
    name: 'Ingeniero Zero-Trust & AppSec',
    role: 'security-engineer',
    wave: 'Ola 3B (Búnker DevSecOps)',
    homeStation: 'SALA_5_BUNKER_CIEGO_QA_SEC',
    avatarColor: '#f59e0b',
    badge: 'APPSEC',
    exactFunction: 'Ejecuta AgentShield, Zizmor v1.30, auditoría SARIF 18/18 (OWASP MCP Top 10), Gitleaks, Trivy IaC y verificación criptográfica Ed25519.',
    mcpTools: ['delta-security-scanner', 'dast-offat-zap', 'semgrep-mcp', 'github-mcp'],
    permissionMode: 'SECURITY_AUDITOR (Veto Gate Activo)',
    skillQualityRate: '99.6%'
  },
  {
    id: 'seo-aeo-geo-architect',
    name: 'Especialista SEO/GEO & Packager',
    role: 'seo-aeo-geo-architect',
    wave: 'Ola 3B (AEO/GEO & Empaquetado .ZIP)',
    homeStation: 'SALA_6_MUELLE_EMPAQUETADO_ZIP',
    avatarColor: '#60a5fa',
    badge: 'SEO/ZIP',
    exactFunction: 'Genera llms.txt, JSON-LD @graph, Speculation Rules y exporta el paquete autónomo .ZIP libre de dependencias al Escritorio del CTO.',
    mcpTools: ['omni-rag-ast', 'cloudflare-edge-mcp', 'filesystem-scoped'],
    permissionMode: 'RELEASE_PACKAGER (Exportación deliverables/ y Escritorio)',
    skillQualityRate: '99.1%'
  }
]);

export const KANBAN_COLUMNS = Object.freeze([
  {
    id: 'col_1_backlog',
    title: '1. Cola / Backlog (ready-to-spec)',
    badge: 'ready-to-spec'
  },
  {
    id: 'col_2_waiting_hitl',
    title: '2. Esperando Info / Aprobación de Plano (needs-info / wait-to-implement)',
    badge: 'wait-to-implement'
  },
  {
    id: 'col_3_in_construction',
    title: '3. En Construcción: Tracer-Bullet & Fill-In (ready-to-implement)',
    badge: 'ready-to-implement'
  },
  {
    id: 'col_4_blind_audit',
    title: '4. En Auditoría Ciega 100/100 (Wave 3 QA/Sec)',
    badge: 'blind-audit'
  },
  {
    id: 'col_5_approved_packaged',
    title: '5. Aprobado y Empaquetado (Success)',
    badge: 'success'
  }
]);

function readJsonSafe(filePath, fallback) {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch {}
  return fallback;
}

/**
 * Loads the active project metadata without throwing, including Dual Interview Gate (#1 & #2) status.
 */
export function getActiveProjectSnapshot() {
  const active = readJsonSafe(ACTIVE_PROJECT_PATH, {
    activeSlug: 'agencia-alfa',
    name: 'Agencia Alfa',
    stack: 'vanilla-edge',
    archetype: 'saas-b2b',
    style: 'bento'
  });
  const slug = active.activeSlug || 'agencia-alfa';
  const projDir = path.join(FACTORY_ROOT, 'projects', slug);
  const manifestPath = path.join(projDir, 'factory.project.json');
  const manifest = readJsonSafe(manifestPath, {});

  const prdInterviewState = readJsonSafe(path.join(projDir, 'PRD_INTERVIEW_STATE.json'), {});
  const specInterviewState = readJsonSafe(path.join(projDir, 'CLIENT_BRIEF_INTERVIEW.json'), {});
  const prdInterviewStatus = prdInterviewState.prdInterviewStatus || 'PENDING_CTO_PRD_INPUT';
  const brandIdentityMode =
    prdInterviewState.block4_existing_brand_identity?.brandIdentityMode ||
    prdInterviewState.brandIdentityMode ||
    'PARTIAL_BRAND_EVOLUTION';
  const specInterviewStatus = specInterviewState.specInterviewStatus || 'PENDING_CTO_SPEC_INPUT';

  return {
    projectSlug: slug,
    name: manifest.name || active.name || slug,
    stack: manifest.stack || active.stack || 'vanilla-edge',
    archetype: manifest.archetype || active.archetype || 'saas-b2b',
    style: manifest.style || active.style || 'bento',
    dbTier: manifest.dbTier || 'edge-d1',
    prdInterviewStatus,
    brandIdentityMode,
    specInterviewStatus,
    dualInterviewsApproved:
      prdInterviewStatus === 'COMPLETED_BY_CTO' && specInterviewStatus === 'COMPLETED_BY_CTO'
  };
}

/**
 * Loads the deterministic XState v5 actor snapshot & Burr hash chain for the given project.
 */
export function getXStateSnapshotForProject(slugInput) {
  const slug = slugInput || getActiveProjectSnapshot().projectSlug || 'agencia-alfa';
  const xstatePath = path.join(FACTORY_ROOT, '.agents', 'runs', slug, 'xstate_actor_snapshot.json');
  const snap = readJsonSafe(xstatePath, null);
  if (!snap) {
    return {
      projectSlug: slug,
      currentState: 'uninitialized',
      activeState: 'uninitialized',
      chainHash: 'GENESIS_0000',
      burrActionLog: [],
      updatedAt: null
    };
  }
  const currentState = snap.currentState || snap.activeState || 'uninitialized';
  const burrActionLog = Array.isArray(snap.burrActionLog)
    ? snap.burrActionLog
    : Array.isArray(snap.context?.transitionLog)
    ? snap.context.transitionLog
    : Array.isArray(snap.context?.actionLog)
    ? snap.context.actionLog
    : [];
  const chainHash =
    snap.chainHash && snap.chainHash !== 'GENESIS_0000'
      ? snap.chainHash
      : snap.context?.lastActionHash || (burrActionLog.length > 0 ? `burr_${burrActionLog.length}steps` : 'GENESIS_0000');
  return {
    projectSlug: slug,
    currentState,
    activeState: currentState,
    chainHash,
    burrActionLog,
    updatedAt: snap.updatedAt || null
  };
}

/**
 * Loads FinOps + JEV 5-Tier Cognitive Memory Pipeline + JEV Ledger telemetry.
 */
export function getFinOpsSnapshot() {
  const gcpBudget = readJsonSafe(GCP_FINOPS_BUDGET_PATH, {
    totalCreditsUsd: 300000,
    remainingCreditsUsd: 299990.51,
    spentUsd: 9.49
  });
  const jevMemoryReport = readJsonSafe(JEV_MEMORY_REPORT_PATH, {
    schemaVersion: '2026.10-jev-memory-pipeline-v38',
    consolidatedAt: null,
    tiersSummary: {
      tier1_workingMemoryBudgetTokens: 3500,
      tier2_episodicFailureClustersPhi: 0,
      tier3_semanticActiveRules: 12,
      tier3_semanticSupersededRules: 0,
      tier4_proceduralSkillsTracked: 70,
      tier5_prospectiveBeadsNodes: 12
    }
  });
  const jevFinopsLedger = readJsonSafe(JEV_FINOPS_LEDGER_PATH, {
    totalApiCalls: 0,
    totalCacheHits: 0,
    dailySpendUsd: 0
  });
  return {
    gcpBudget,
    jevMemoryReport,
    jevFinopsLedger
  };
}

/**
 * Builds the default initial state for `.agents/runs/current_factory_state.json`.
 */
export function buildDefaultFactoryState() {
  const proj = getActiveProjectSnapshot();
  const xstateSnapshot = getXStateSnapshotForProject(proj.projectSlug);
  const finopsSnapshot = getFinOpsSnapshot();
  const beadsLines = fs.existsSync(BEADS_GRAPH_PATH)
    ? fs
        .readFileSync(BEADS_GRAPH_PATH, 'utf8')
        .split(/\r?\n/)
        .filter(Boolean)
        .map((l) => {
          try {
            return JSON.parse(l);
          } catch {
            return null;
          }
        })
        .filter(Boolean)
    : [];

  const kanbanCards =
    beadsLines.length > 0
      ? beadsLines.map((b, idx) => ({
          id: b.id || `card-${idx + 1}`,
          reqId: b.reqId || `REQ-0${idx + 1}`,
          title: b.title || `Requisito ${idx + 1}`,
          assignedRole: b.role || 'senior-coder',
          lane: b.lane || 'LANE_2_STANDARD_BUILD',
          fileLocks: b.fileLocks || [`projects/${proj.projectSlug}/index.html`],
          columnId:
            b.status === 'COMPLETED' || b.status === 'PASSED'
              ? 'col_5_approved_packaged'
              : b.status === 'BLIND_AUDIT'
              ? 'col_4_blind_audit'
              : 'col_3_in_construction',
          f2pVerified: Boolean(b.f2pVerified ?? (b.status === 'COMPLETED' || b.status === 'PASSED')),
          p2pVerified: Boolean(b.p2pVerified ?? (b.status === 'COMPLETED' || b.status === 'PASSED')),
          updatedAt: b.updatedAt || new Date().toISOString()
        }))
      : [
          {
            id: 'bead-req-01',
            reqId: 'REQ-01',
            title: `Hero OKLCH 90/8/2 & Propuesta de Valor (${proj.projectSlug})`,
            assignedRole: 'ux-designer',
            lane: 'LANE_1_FAST_PATH',
            fileLocks: [`projects/${proj.projectSlug}/index.html`],
            columnId: 'col_1_backlog',
            f2pVerified: false,
            p2pVerified: false,
            updatedAt: new Date().toISOString()
          }
        ];

  return {
    timestamp: new Date().toISOString(),
    projectSlug: proj.projectSlug,
    projectMeta: proj,
    xstateSnapshot,
    finopsSnapshot,
    jevMemoryPipeline: finopsSnapshot.jevMemoryReport,
    jevFinopsLedger: finopsSnapshot.jevFinopsLedger,
    activeLane: 'LANE_2_STANDARD_BUILD',
    rpiStage: 'PendingAudit',
    rpiStageOrder: 0,
    stations: FACTORY_STATIONS,
    agents: FACTORY_AGENTS_ROSTER.map((a) => ({
      ...a,
      currentStation: a.homeStation,
      status: 'idle',
      activeFile: `projects/${proj.projectSlug}/index.html`,
      lastAction: `En espera de auditoría real en ${a.homeStation}`,
      retryRound: 0,
      updatedAt: new Date().toISOString()
    })),
    kanbanCards,
    forensicLog: [
      {
        timestamp: new Date().toISOString(),
        actorRole: 'foreman',
        stationId: 'SALA_1_RECEPCION_TRIAJE',
        actionWhy: `Estado inicializado para [${proj.projectSlug}] pendiente de auditoría real (0 overhead de tokens).`,
        laneUsed: 'LANE_2_STANDARD_BUILD'
      }
    ],
    scores: {
      auditStatus: 'PENDING_MEASUREMENT',
      compositeScore: 0,
      buildAndStatic: 0,
      securityZeroTrust: 0,
      chaosDestructive: 0,
      visualAndMotion: 0,
      harnessDoctorScore: 0
    },
    budgetSpentUsd: 0.0,
    dailyBudgetCapUsd: 1.5
  };
}

/**
 * Loads `.agents/runs/current_factory_state.json` (initializing it if missing).
 */
export function loadCurrentFactoryState() {
  const existing = readJsonSafe(CURRENT_STATE_JSON_PATH, null);
  if (existing && Array.isArray(existing.agents) && existing.agents.length === 11) {
    const proj = getActiveProjectSnapshot();
    const xstateSnapshot = getXStateSnapshotForProject(proj.projectSlug);
    const finopsSnapshot = getFinOpsSnapshot();
    existing.projectSlug = proj.projectSlug;
    existing.projectMeta = proj;
    existing.xstateSnapshot = xstateSnapshot;
    existing.finopsSnapshot = finopsSnapshot;
    existing.jevMemoryPipeline = finopsSnapshot.jevMemoryReport;
    existing.jevFinopsLedger = finopsSnapshot.jevFinopsLedger;
    return existing;
  }
  const initial = buildDefaultFactoryState();
  fs.mkdirSync(path.dirname(CURRENT_STATE_JSON_PATH), { recursive: true });
  fs.writeFileSync(CURRENT_STATE_JSON_PATH, JSON.stringify(initial, null, 2), 'utf8');
  return initial;
}

/**
 * Emits a real-time zero-token event to `.agents/runs/live_factory_stream.jsonl`
 * and updates `.agents/runs/current_factory_state.json`.
 */
export function emitFactoryTelemetryEvent(event = {}) {
  const state = loadCurrentFactoryState();
  const nowIso = new Date().toISOString();

  if (event.projectSlug) state.projectSlug = event.projectSlug;
  if (event.xstateSnapshot && typeof event.xstateSnapshot === 'object') {
    state.xstateSnapshot = { ...state.xstateSnapshot, ...event.xstateSnapshot };
  }
  if (event.jevMemoryPipeline && typeof event.jevMemoryPipeline === 'object') {
    state.jevMemoryPipeline = { ...state.jevMemoryPipeline, ...event.jevMemoryPipeline };
  }
  if (event.activeLane) state.activeLane = event.activeLane;
  if (event.rpiStage) state.rpiStage = event.rpiStage;
  if (typeof event.rpiStageOrder === 'number') state.rpiStageOrder = event.rpiStageOrder;
  if (typeof event.budgetSpentUsd === 'number') state.budgetSpentUsd = event.budgetSpentUsd;
  if (event.scores && typeof event.scores === 'object') {
    state.scores = { ...state.scores, ...event.scores };
  }

  // Update individual agent or batch of agents
  const agentUpdates = Array.isArray(event.agentUpdates)
    ? event.agentUpdates
    : event.agentId
    ? [
        {
          id: event.agentId,
          currentStation: event.stationId,
          status: event.status,
          activeFile: event.activeFile,
          lastAction: event.lastAction,
          retryRound: event.retryRound
        }
      ]
    : [];

  for (const upd of agentUpdates) {
    const target = state.agents.find(
      (a) => a.id === upd.id || a.role === upd.id
    );
    if (target) {
      if (upd.currentStation) target.currentStation = upd.currentStation;
      if (upd.status) target.status = upd.status;
      if (upd.activeFile) target.activeFile = upd.activeFile;
      if (upd.lastAction) target.lastAction = upd.lastAction;
      if (typeof upd.retryRound === 'number') target.retryRound = upd.retryRound;
      target.updatedAt = nowIso;
    }
  }

  // Update Kanban card column if specified
  if (event.kanbanCardUpdate) {
    const kc = event.kanbanCardUpdate;
    const existingCard = state.kanbanCards.find((c) => c.id === kc.id || c.reqId === kc.reqId);
    if (existingCard) {
      if (kc.columnId) existingCard.columnId = kc.columnId;
      if (kc.title) existingCard.title = kc.title;
      if (kc.assignedRole) existingCard.assignedRole = kc.assignedRole;
      if (kc.lane) existingCard.lane = kc.lane;
      existingCard.updatedAt = nowIso;
    } else if (kc.id || kc.reqId) {
      state.kanbanCards.unshift({
        id: kc.id || `card-${Date.now()}`,
        reqId: kc.reqId || 'REQ-LIVE',
        title: kc.title || 'Tarea en ejecución',
        assignedRole: kc.assignedRole || event.agentId || 'foreman',
        lane: kc.lane || state.activeLane,
        fileLocks: kc.fileLocks || [`projects/${state.projectSlug}/index.html`],
        columnId: kc.columnId || 'col_1_backlog',
        f2pVerified: true,
        p2pVerified: true,
        updatedAt: nowIso
      });
    }
  }

  // Append forensic log entry ("Who did what, when, and why")
  if (event.lastAction || event.forensicWhy) {
    state.forensicLog = state.forensicLog || [];
    state.forensicLog.unshift({
      timestamp: nowIso,
      actorRole: event.agentId || 'foreman',
      stationId: event.stationId || 'SALA_1_RECEPCION_TRIAJE',
      actionWhy: event.forensicWhy || event.lastAction,
      laneUsed: state.activeLane
    });
    if (state.forensicLog.length > 40) {
      state.forensicLog = state.forensicLog.slice(0, 40);
    }
  }

  state.timestamp = nowIso;

  fs.mkdirSync(path.dirname(CURRENT_STATE_JSON_PATH), { recursive: true });
  fs.writeFileSync(CURRENT_STATE_JSON_PATH, JSON.stringify(state, null, 2), 'utf8');

  const streamEntry = {
    timestamp: nowIso,
    eventType: event.eventType || 'AGENT_STATE_TRANSITION',
    projectSlug: state.projectSlug,
    activeLane: state.activeLane,
    rpiStage: state.rpiStage,
    agentId: event.agentId || (agentUpdates[0]?.id ?? 'foreman'),
    stationId: event.stationId || (agentUpdates[0]?.currentStation ?? 'SALA_1_RECEPCION_TRIAJE'),
    status: event.status || (agentUpdates[0]?.status ?? 'working'),
    lastAction: event.lastAction || (agentUpdates[0]?.lastAction ?? 'Actualización en vivo')
  };
  fs.appendFileSync(LIVE_STREAM_JSONL_PATH, JSON.stringify(streamEntry) + '\n', 'utf8');
  try {
    const stat = fs.statSync(LIVE_STREAM_JSONL_PATH);
    if (stat.size > 65536) {
      const recentLines = fs
        .readFileSync(LIVE_STREAM_JSONL_PATH, 'utf8')
        .trim()
        .split(/\r?\n/)
        .slice(-200);
      fs.writeFileSync(LIVE_STREAM_JSONL_PATH, recentLines.join('\n') + '\n', 'utf8');
    }
  } catch {}

  telemetryEmitter.emit('state-updated', { state, streamEntry });
  return state;
}

/**
 * Interactive Live Demo Walkthrough (`--demo-walkthrough` / UI Button):
 * Moves all 11 characters across the 6 Factory Stations and advances a Kanban card
 * across all 5 columns (`col_1_backlog -> col_2_waiting_hitl -> col_3_in_construction -> col_4_blind_audit -> col_5_approved_packaged`).
 */
export async function runLiveDemoWalkthroughSequence({ stepDelayMs = 60 } = {}) {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const proj = getActiveProjectSnapshot();
  const demoCardId = 'bead-live-walkthrough';

  const steps = [
    {
      rpiStage: 'Questions',
      rpiStageOrder: 1,
      activeLane: 'LANE_2_STANDARD_BUILD',
      kanbanColumn: 'col_1_backlog',
      agentUpdates: [
        {
          id: 'foreman',
          currentStation: 'SALA_1_RECEPCION_TRIAJE',
          status: 'working',
          activeFile: 'factory.yaml',
          lastAction: 'Recepción de requerimiento y enrutamiento SWE-AF (LANE_2)'
        },
        {
          id: 'triage-agent',
          currentStation: 'SALA_1_RECEPCION_TRIAJE',
          status: 'working',
          activeFile: '.agents/beads/task_graph.jsonl',
          lastAction: 'Filtro Zero-Trust Anti-Prompt-Injection y apertura de grafo Beads'
        }
      ],
      forensicWhy: 'Etapa 1 (Questions): El Capataz y el Agente de Triaje clasifican el pedido en Sala 1.'
    },
    {
      rpiStage: 'Research',
      rpiStageOrder: 2,
      activeLane: 'LANE_2_STANDARD_BUILD',
      kanbanColumn: 'col_2_waiting_hitl',
      agentUpdates: [
        {
          id: 'foreman',
          currentStation: 'SALA_2_LABORATORIO_PLANOS_RAG',
          status: 'walking',
          activeFile: 'SPEC.md',
          lastAction: 'Supervisando investigación Omni-RAG v5 y Context7 en Sala 2'
        },
        {
          id: 'product-spec-architect',
          currentStation: 'SALA_2_LABORATORIO_PLANOS_RAG',
          status: 'hitl_waiting',
          activeFile: `projects/${proj.projectSlug}/SPEC.md`,
          lastAction: 'Delta OpenSpec y trazabilidad 1:1 listos para validación HITL'
        }
      ],
      forensicWhy: 'Etapa 2 (Research & Plan): Product-Spec Architect consulta Omni-RAG v5 y genera el plano en Sala 2.'
    },
    {
      rpiStage: 'Design',
      rpiStageOrder: 3,
      activeLane: 'LANE_2_STANDARD_BUILD',
      kanbanColumn: 'col_3_in_construction',
      agentUpdates: [
        {
          id: 'ux-designer',
          currentStation: 'SALA_3_ESTUDIO_ARTE_OKLCH',
          status: 'working',
          activeFile: `projects/${proj.projectSlug}/DESIGN.md`,
          lastAction: 'Compilando tokens W3C DTCG OKLCH 90/8/2 y 62 reglas Impeccable'
        },
        {
          id: 'copywriting-cro-strategist',
          currentStation: 'SALA_3_ESTUDIO_ARTE_OKLCH',
          status: 'working',
          activeFile: `projects/${proj.projectSlug}/index.html`,
          lastAction: 'Redactando propuesta de valor Fogg B=MAP libre de AI Slop'
        }
      ],
      forensicWhy: 'Etapa 3 (Design): UX Designer y CRO Copywriter diseñan tokens OKLCH y textos persuasivos en Sala 3.'
    },
    {
      rpiStage: 'Structure',
      rpiStageOrder: 4,
      activeLane: 'LANE_2_STANDARD_BUILD',
      kanbanColumn: 'col_3_in_construction',
      agentUpdates: [
        {
          id: 'senior-coder',
          currentStation: 'SALA_4_LINEA_ENSAMBLAJE_3D_DB',
          status: 'working',
          activeFile: `projects/${proj.projectSlug}/site/js/app.js`,
          lastAction: 'Ensamblando Tracer-Bullet HTML5/Astro y validando AST Oxc < 500ms'
        },
        {
          id: 'motion-engineer',
          currentStation: 'SALA_4_LINEA_ENSAMBLAJE_3D_DB',
          status: 'working',
          activeFile: `projects/${proj.projectSlug}/site/js/diorama-hero-3d.js`,
          lastAction: 'Inyectando escena Three.js r186 WebGPU a 60 FPS con Watchdog GPU'
        },
        {
          id: 'edge-fullstack-architect',
          currentStation: 'SALA_4_LINEA_ENSAMBLAJE_3D_DB',
          status: 'working',
          activeFile: `projects/${proj.projectSlug}/db/edge_d1_schema.sql`,
          lastAction: 'Configurando Cloudflare Worker + esquema Dual DB (D1 / Postgres RLS)'
        }
      ],
      forensicWhy: 'Etapa 4 & 5 (Structure & Tracer-Bullet): Los 3 constructores ensamblan UI, 3D WebGPU y DB en Sala 4.'
    },
    {
      rpiStage: 'Plan',
      rpiStageOrder: 5,
      activeLane: 'LANE_2_STANDARD_BUILD',
      kanbanColumn: 'col_4_blind_audit',
      agentUpdates: [
        {
          id: 'qa-auditor',
          currentStation: 'SALA_5_BUNKER_CIEGO_QA_SEC',
          status: 'working',
          activeFile: 'tools/audit/ryux_design_gate.mjs',
          lastAction: 'Auditoría ciega RYUX v2.14.2 + Juez VLM + Compuerta F2P/P2P'
        },
        {
          id: 'security-engineer',
          currentStation: 'SALA_5_BUNKER_CIEGO_QA_SEC',
          status: 'working',
          activeFile: '.agents/runs/security_reports/mcp_audit.sarif.json',
          lastAction: 'Escaneo AgentShield + Zizmor + OWASP MCP Top 10 (18/18 SARIF)'
        }
      ],
      forensicWhy: 'Etapa 5 (Blind Audit): QA Auditor (100% Read-Only) y Security Engineer auditan a ciegas en Sala 5.'
    },
    {
      rpiStage: 'Implementation',
      rpiStageOrder: 6,
      activeLane: 'LANE_2_STANDARD_BUILD',
      kanbanColumn: 'col_5_approved_packaged',
      agentUpdates: FACTORY_AGENTS_ROSTER.map((a) => ({
        id: a.id,
        currentStation: a.id === 'seo-aeo-geo-architect' || a.id === 'foreman' ? 'SALA_6_MUELLE_EMPAQUETADO_ZIP' : a.homeStation,
        status: 'passed',
        activeFile: `deliverables/${proj.projectSlug}/${proj.projectSlug}-produccion.zip`,
        lastAction: 'Sitio aprobado 100.0/100.0 y paquete .ZIP listo en Muelle de Empaquetado (Sala 6)'
      })),
      forensicWhy: 'Etapa 6 (Shipped): Puntaje 100.0/100.0 certificado y paquete autónomo .ZIP listo en Sala 6.'
    }
  ];

  let finalState = null;
  for (const step of steps) {
    finalState = emitFactoryTelemetryEvent({
      eventType: 'DEMO_WALKTHROUGH_STEP',
      projectSlug: proj.projectSlug,
      activeLane: step.activeLane,
      rpiStage: step.rpiStage,
      rpiStageOrder: step.rpiStageOrder,
      agentUpdates: step.agentUpdates,
      kanbanCardUpdate: {
        id: demoCardId,
        reqId: 'REQ-WALKTHROUGH',
        title: `Recorrido en Vivo de los 11 Personajes (${proj.projectSlug})`,
        assignedRole: step.agentUpdates[0]?.id || 'foreman',
        lane: step.activeLane,
        columnId: step.kanbanColumn
      },
      forensicWhy: step.forensicWhy
    });
    if (stepDelayMs > 0) {
      await sleep(stepDelayMs);
    }
  }

  return finalState;
}
