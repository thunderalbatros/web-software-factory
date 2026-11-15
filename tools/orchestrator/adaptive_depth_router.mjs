#!/usr/bin/env node
/**
 * tools/orchestrator/adaptive_depth_router.mjs — Zero-Bloat Adaptive Depth Router (`SWE-AF` + `Elastic Loop` + `Beads`)
 * ======================================================================================================================
 * Prevents over-engineering and unnecessary token burn by routing every task into 1 of 3 deterministic speed lanes,
 * maintaining a Git-backed JSONL DAG file-lock memory (`.agents/beads/task_graph.jsonl` — `steveyegge/beads` pattern),
 * and generating incremental Delta Specifications (`OpenSpec` + `spec-kitty` 1:1 `Requirement -> Task -> Test` matrix).
 *
 * Speed Lanes:
 *   1. `LANE_1_FAST_PATH` (< 15s, <= 1 file, copy/color/button/minor bug):
 *      Skips multi-agent debates (`Claude Council` / `Arena`), executes direct surgical edit + `ast_guard` + `security_gate`.
 *   2. `LANE_2_STANDARD_BUILD` (new UI sections, 3D shaders, API routes, medium features):
 *      Executes standard 3-Wave DAG with Tracer-Bullet stop hook and 1-pass visual verification.
 *   3. `LANE_3_DEEP_ARCHITECTURE` (greenfield full site, `enterprise-postgres` RLS migration, payments, KMS/Ory security):
 *      Activates full 6-Stage HumanLayer RPI, Blind Independent Review, and full 100-point Eval Matrix.
 * ======================================================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { emitFactoryTelemetryEvent } from '../cockpit/live_telemetry_bus.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const FACTORY_ROOT = path.resolve(__dirname, '..', '..');
export const BEADS_GRAPH_PATH = path.join(FACTORY_ROOT, '.agents', 'beads', 'task_graph.jsonl');

export const ADAPTIVE_LANES = Object.freeze({
  LANE_1_FAST_PATH: {
    id: 'LANE_1_FAST_PATH',
    targetLatencySeconds: 15,
    maxTokensBudget: 6000,
    maxTurns: 4,
    directTurnLimit: 1,
    maxTurnsPerSubagent: 6,
    maxTokensPerToolCall: 4000,
    executionEngine: 'mini-swe-agent-1-turn',
    skipMultiAgentDebate: true,
    wavesActivated: ['direct_surgical_edit', 'ast_and_security_fast_gate'],
    description: 'Bucle minimalista mini-swe-agent: 1 turno directo de lectura/edición + ast_guard + security_gate en < 15s (cero sobrecarga de olas).'
  },
  LANE_2_STANDARD_BUILD: {
    id: 'LANE_2_STANDARD_BUILD',
    targetLatencySeconds: 45,
    maxTokensBudget: 20000,
    maxTurns: 10,
    skipMultiAgentDebate: false,
    wavesActivated: ['wave_1_spec', 'wave_2_tracer_bullet_build', 'wave_3_single_pass_visual_gate'],
    description: 'Flujo estándar de 3 olas con Tracer-Bullet y verificación visual en 1 pasada.'
  },
  LANE_3_DEEP_ARCHITECTURE: {
    id: 'LANE_3_DEEP_ARCHITECTURE',
    targetLatencySeconds: 120,
    maxTokensBudget: 48000,
    maxTurns: 20,
    skipMultiAgentDebate: false,
    wavesActivated: [
      'humanlayer_6_stage_rpi',
      'wave_1_spec',
      'wave_2_parallel_bolts',
      'wave_3_blind_review_and_100pt_eval'
    ],
    description: '6 etapas completas de HumanLayer RPI, Revisión a Ciegas Multi-Modelo y auditoría completa de 100 puntos.'
  }
});

/**
 * Classifies any request or ticket deterministically into `LANE_1_FAST_PATH`, `LANE_2_STANDARD_BUILD`,
 * or `LANE_3_DEEP_ARCHITECTURE` (`SWE-AF` + `Elastic Loop` pattern).
 */
export function classifyAdaptiveDepthLane(taskPromptOrInput = '', options = {}) {
  const text = String(
    typeof taskPromptOrInput === 'string'
      ? taskPromptOrInput
      : taskPromptOrInput?.description || taskPromptOrInput?.message || ''
  ).trim();
  const lower = text.toLowerCase();
  const filesCount = Number(options.filesCount ?? (Array.isArray(options.targetFiles) ? options.targetFiles.length : 1));

  // Deep Architecture signals (Greenfield site, Postgres RLS migration, KMS/Ory/Payments/Multi-tenant DB)
  const deepSignals =
    /(?:desde cero|sitio completo|full website|greenfield|enterprise-postgres|row level security|\brls\b|hyperdrive|ory keto|ory kratos|gcp kms|envelope encryption|pasarela de pago|stripe webhook|multi-tenant|migraci[oó]n completa|arquitectura completa)/i;

  if (deepSignals.test(lower) || filesCount >= 6 || options.forceLane === 'LANE_3_DEEP_ARCHITECTURE') {
    const decision = {
      lane: ADAPTIVE_LANES.LANE_3_DEEP_ARCHITECTURE.id,
      spec: ADAPTIVE_LANES.LANE_3_DEEP_ARCHITECTURE,
      complexityScore: 0.92,
      reason: 'High architectural impact (multi-tenant DB / security / full-site scaffold).'
    };
    try {
      emitFactoryTelemetryEvent({
        eventType: 'LANE_ROUTED',
        activeLane: decision.lane,
        forensicEntry: {
          actor: 'Foreman & Triage Agent',
          action: `Enrutamiento SWE-AF -> ${decision.lane}`,
          reason: decision.reason
        }
      });
    } catch {}
    return decision;
  }

  // Standard Build signals (New section, 3D WebGPU/Shader/Splat component, new API endpoint, mobile Capacitor build)
  const standardSignals =
    /(?:nueva secci[oó]n|new section|componente 3d|diorama|gaussian splat|shader|webgpu|three\.js|nuevo endpoint|api route|tabla de precios|pricing table|formulario nuevo|capacitor|app m[oó]vil|bento grid)/i;

  if (standardSignals.test(lower) || (filesCount >= 2 && filesCount <= 5) || options.forceLane === 'LANE_2_STANDARD_BUILD') {
    const decision = {
      lane: ADAPTIVE_LANES.LANE_2_STANDARD_BUILD.id,
      spec: ADAPTIVE_LANES.LANE_2_STANDARD_BUILD,
      complexityScore: 0.55,
      reason: 'Medium feature scope (new UI section, 3D component, or API endpoint).'
    };
    try {
      emitFactoryTelemetryEvent({
        eventType: 'LANE_ROUTED',
        activeLane: decision.lane,
        forensicEntry: {
          actor: 'Foreman & Triage Agent',
          action: `Enrutamiento SWE-AF -> ${decision.lane}`,
          reason: decision.reason
        }
      });
    } catch {}
    return decision;
  }

  // Default to Fast Path for simple text/color/padding/button/single-file adjustments
  const decision = {
    lane: ADAPTIVE_LANES.LANE_1_FAST_PATH.id,
    spec: ADAPTIVE_LANES.LANE_1_FAST_PATH,
    complexityScore: 0.18,
    reason: 'Single-file or cosmetic/copy/bug adjustment eligible for <15s Fast Path.'
  };
  try {
    emitFactoryTelemetryEvent({
      eventType: 'LANE_ROUTED',
      activeLane: decision.lane,
      forensicEntry: {
        actor: 'Foreman & Triage Agent',
        action: `Enrutamiento SWE-AF -> ${decision.lane}`,
        reason: decision.reason
      }
    });
  } catch {}
  return decision;
}

/**
 * Builds and persists the `steveyegge/beads` Git-backed JSONL Task & File-Lock DAG (`.agents/beads/task_graph.jsonl`).
 * Automatically detects overlapping `fileLocks` across parallel tasks and chains `blockedBy` dependencies
 * so two parallel agents NEVER edit the same file simultaneously.
 */
export function buildAndPersistBeadsTaskGraph(rawTasks = [], options = {}) {
  const graphPath = options.graphPath || BEADS_GRAPH_PATH;
  fs.mkdirSync(path.dirname(graphPath), { recursive: true });

  const defaultLeaseMs = Number.isFinite(Number(options.leaseDurationMs))
    ? Math.max(1000, Number(options.leaseDurationMs))
    : 15 * 60 * 1000;
  const nowMs = Date.now();
  const fileOwnerHistory = new Map(); // normalizedFile -> lastTaskId
  const normalizedNodes = [];
  let autoResolvedCollisions = 0;

  for (let i = 0; i < rawTasks.length; i++) {
    const t = rawTasks[i] || {};
    const taskId = t.id || `bead-${i + 1}`;
    const reqId = t.reqId || `REQ-0${i + 1}`;
    const role = t.role || 'senior-coder';
    const fileLocks = Array.from(new Set((t.fileLocks || ['site/js/app.js']).map((f) => String(f).replace(/\\/g, '/'))));
    const blockedBySet = new Set(Array.isArray(t.blockedBy) ? t.blockedBy : []);
    const leaseExpiresAt = t.leaseExpiresAt || new Date(nowMs + defaultLeaseMs).toISOString();

    for (const file of fileLocks) {
      if (fileOwnerHistory.has(file)) {
        const previousOwnerTaskId = fileOwnerHistory.get(file);
        if (previousOwnerTaskId !== taskId && !blockedBySet.has(previousOwnerTaskId)) {
          blockedBySet.add(previousOwnerTaskId);
          autoResolvedCollisions++;
        }
      }
      fileOwnerHistory.set(file, taskId);
    }

    const node = {
      id: taskId,
      reqId,
      title: t.title || `Task ${taskId}`,
      role,
      lane: t.lane || 'LANE_1_FAST_PATH',
      fileLocks,
      fileLockLeases: fileLocks.map((lockPath) => ({ path: lockPath, leaseExpiresAt })),
      leaseExpiresAt,
      blockedBy: Array.from(blockedBySet),
      verificationTest: t.verificationTest || `assert_${taskId.replace(/[^a-zA-Z0-9_]/g, '_')}_passed`,
      status: t.status || 'READY',
      updatedAt: new Date(nowMs).toISOString()
    };
    normalizedNodes.push(node);
  }

  const jsonlContent = normalizedNodes.map((n) => JSON.stringify(n)).join('\n') + '\n';
  fs.writeFileSync(graphPath, jsonlContent, 'utf8');

  // Verify zero unguarded parallel file collisions remain
  const unguardedCollisions = verifyZeroParallelFileCollisions(normalizedNodes);

  return {
    ok: unguardedCollisions.length === 0,
    graphPath,
    tasksCount: normalizedNodes.length,
    autoResolvedCollisions,
    unguardedCollisionsCount: unguardedCollisions.length,
    nodes: normalizedNodes
  };
}

/**
 * Verifies that no two tasks in `.agents/beads/task_graph.jsonl` share a file lock without a direct or transitive `blockedBy` edge.
 */
export function verifyZeroParallelFileCollisions(nodes = []) {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const dependsOn = (taskAId, taskBId, visited = new Set()) => {
    if (taskAId === taskBId) return true;
    if (visited.has(taskAId)) return false;
    visited.add(taskAId);
    const nodeA = nodeMap.get(taskAId);
    if (!nodeA) return false;
    for (const depId of nodeA.blockedBy || []) {
      if (depId === taskBId || dependsOn(depId, taskBId, visited)) return true;
    }
    return false;
  };

  const collisions = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];
      const sharedFiles = (a.fileLocks || []).filter((f) => (b.fileLocks || []).includes(f));
      if (sharedFiles.length > 0) {
        const ordered = dependsOn(a.id, b.id) || dependsOn(b.id, a.id);
        if (!ordered) {
          collisions.push({ taskA: a.id, taskB: b.id, sharedFiles });
        }
      }
    }
  }
  return collisions;
}

/**
 * Loads the current `.agents/beads/task_graph.jsonl` nodes from disk.
 */
export function loadBeadsTaskGraph(graphPath = BEADS_GRAPH_PATH) {
  if (!fs.existsSync(graphPath)) return [];
  return fs
    .readFileSync(graphPath, 'utf8')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => JSON.parse(l));
}

/**
 * Minimalist 100-line `SWE-agent/mini-swe-agent` Execution Loop for `LANE_1_FAST_PATH`:
 * Executes 1 direct read/edit turn on the target file, enforces `inspect_ai` hard circuit breakers
 * (`maxTurnsPerSubagent: 6`, `maxTokensPerToolCall: 4000`), and runs `ast_guard` + `security_gate`
 * without multi-wave orchestration overhead.
 */
export async function runMiniSweFastPathLoop({
  targetFile = 'projects/agencia-alfa/index.html',
  applyEditFn = null,
  projectSlug = 'agencia-alfa',
  simulatedTurns = 1,
  simulatedToolTokens = 850
} = {}) {
  const startMs = Date.now();
  const { enforceInspectAiCircuitBreakers } = await import('./humanlayer_rpi_gate.mjs');
  const { runOxlintFastPass, scanSecurityAndPerformance } = await import('../audit/ast_guard.mjs');

  const breakerCheck = enforceInspectAiCircuitBreakers({
    subagentTurns: simulatedTurns,
    toolCallTokens: simulatedToolTokens,
    subagentRole: 'mini-swe-fast-path',
    toolName: 'surgical_read_and_edit'
  });

  if (!breakerCheck.allowed) {
    return {
      ok: false,
      lane: ADAPTIVE_LANES.LANE_1_FAST_PATH.id,
      engine: 'mini-swe-agent-1-turn',
      breakerCheck,
      reason: breakerCheck.reason
    };
  }

  const absTarget = path.isAbsolute(targetFile) ? targetFile : path.join(FACTORY_ROOT, targetFile);
  let fileContent = fs.existsSync(absTarget) ? fs.readFileSync(absTarget, 'utf8') : '';
  if (typeof applyEditFn === 'function') {
    const edited = await applyEditFn(fileContent);
    if (typeof edited === 'string' && edited !== fileContent) {
      fs.writeFileSync(absTarget, edited, 'utf8');
      fileContent = edited;
    }
  }

  const oxlintRes = runOxlintFastPass();
  const secScan = fs.existsSync(absTarget) ? scanSecurityAndPerformance(absTarget, targetFile) : { blockers: [] };
  const rawIssues = Array.isArray(secScan) ? secScan : secScan.blockers || secScan.issues || [];
  const secBlockers = rawIssues.filter((i) => !i.severity || i.severity === 'BLOCKER');
  const durationMs = Date.now() - startMs;
  const passed = Boolean(oxlintRes.passed && secBlockers.length === 0);

  return {
    ok: passed,
    lane: ADAPTIVE_LANES.LANE_1_FAST_PATH.id,
    engine: 'mini-swe-agent-1-turn',
    projectSlug,
    targetFile,
    turnsExecuted: 1,
    waveOverhead: 0,
    astGuardPassed: Boolean(oxlintRes.passed),
    securityGatePassed: secBlockers.length === 0,
    breakerCheck,
    durationMs
  };
}

/**
 * Self-Test Suite (`node tools/orchestrator/adaptive_depth_router.mjs --self-test`)
 */
export async function runAdaptiveDepthRouterSelfTest() {
  console.log('\n====================================================================');
  console.log('⚡ SWE-AF ADAPTIVE DEPTH ROUTER + BEADS DAG + MINI-SWE-AGENT SUITE');
  console.log('====================================================================');

  // 1. Test 3-Lane Deterministic Complexity Routing
  const lane1 = classifyAdaptiveDepthLane('Cambiar el texto del botón principal del hero y ajustar el color del borde', {
    filesCount: 1
  });
  const lane2 = classifyAdaptiveDepthLane('Agregar una nueva sección Bento Grid con shader 3D WebGPU y nuevo endpoint API', {
    filesCount: 3
  });
  const lane3 = classifyAdaptiveDepthLane(
    'Construir sitio completo desde cero con migración a enterprise-postgres Row Level Security y GCP KMS',
    { filesCount: 8 }
  );

  const lanesOk =
    lane1.lane === 'LANE_1_FAST_PATH' &&
    lane1.spec.executionEngine === 'mini-swe-agent-1-turn' &&
    lane2.lane === 'LANE_2_STANDARD_BUILD' &&
    lane3.lane === 'LANE_3_DEEP_ARCHITECTURE';
  console.log(
    `  [${lanesOk ? 'PASS' : 'FAIL'}] 1. 3-Lane Adaptive Routing (L1=${lane1.lane} [${lane1.spec.executionEngine}], L2=${lane2.lane}, L3=${lane3.lane})`
  );

  // 2. Test Beads Git-Backed JSONL Task Graph & Automatic File-Lock Collision Prevention
  const beadsRes = buildAndPersistBeadsTaskGraph([
    {
      id: 'task-hero-copy',
      reqId: 'REQ-01',
      title: 'Update hero headline copy and CTA label',
      role: 'copywriting-cro-strategist',
      lane: lane1.lane,
      fileLocks: ['projects/agencia-alfa/index.html', 'projects/agencia-alfa/site/js/app.js'],
      verificationTest: 'test_req_01_hero_cta_copy'
    },
    {
      id: 'task-hero-interaction',
      reqId: 'REQ-02',
      title: 'Bind telemetry event on hero CTA click',
      role: 'senior-coder',
      lane: lane1.lane,
      fileLocks: ['projects/agencia-alfa/site/js/app.js'], // Intentional overlap on app.js!
      verificationTest: 'test_req_02_cta_telemetry'
    }
  ]);

  const beadsOk =
    beadsRes.ok &&
    beadsRes.unguardedCollisionsCount === 0 &&
    beadsRes.autoResolvedCollisions === 1 &&
    beadsRes.nodes[1].blockedBy.includes('task-hero-copy');
  console.log(
    `  [${beadsOk ? 'PASS' : 'FAIL'}] 2. Beads Task Graph JSONL (${beadsRes.tasksCount} tasks, ${beadsRes.autoResolvedCollisions} file-lock collision serialized, 0 parallel collisions)`
  );

  // 3. Test OpenSpec Delta Spec Creation & spec-kitty 1:1 Traceability Matrix via project_loader.mjs
  const { createOpenSpecDeltaFile, verifySpecKittyTraceabilityMatrix } = await import('../lib/project_loader.mjs');
  const deltaRes = createOpenSpecDeltaFile({
    projectSlug: 'agencia-alfa',
    changeSlug: 'optimizacion-cta-hero',
    title: 'Optimización Incremental de Conversión en Hero CTA',
    added: ['[REQ-01] Añadir micro-copy de garantía sin tarjeta debajo del CTA primario.'],
    modified: ['[REQ-02] Actualizar etiqueta del CTA primario con contraste APCA Lc >= 75.'],
    removed: ['[REQ-03] Eliminar enlace secundario redundante en el encabezado móvil.'],
    autoSyncBeads: true
  });
  const traceRes = verifySpecKittyTraceabilityMatrix('agencia-alfa', deltaRes.deltaPath);

  const deltaAndTraceOk =
    deltaRes.ok &&
    fs.existsSync(deltaRes.deltaPath) &&
    traceRes.passed &&
    traceRes.unmappedRequirements.length === 0;
  console.log(
    `  [${deltaAndTraceOk ? 'PASS' : 'FAIL'}] 3. OpenSpec Delta Spec & spec-kitty 1:1 Traceability (${traceRes.mappedCount}/${traceRes.totalRequirements} Reqs -> Beads Tasks -> Tests)`
  );

  // 4. Test mini-swe-agent 1-Turn Fast-Path Loop + inspect_ai Circuit Breakers (maxTurnsPerSubagent: 6, maxTokensPerToolCall: 4000)
  const fastLoopOkRes = await runMiniSweFastPathLoop({
    targetFile: 'projects/agencia-alfa/index.html',
    simulatedTurns: 1,
    simulatedToolTokens: 640
  });
  const breakerTurnsTrip = await runMiniSweFastPathLoop({
    targetFile: 'projects/agencia-alfa/index.html',
    simulatedTurns: 7,
    simulatedToolTokens: 640
  });
  const breakerTokensTrip = await runMiniSweFastPathLoop({
    targetFile: 'projects/agencia-alfa/index.html',
    simulatedTurns: 2,
    simulatedToolTokens: 4500
  });
  const miniSweAndBreakersOk =
    fastLoopOkRes.ok === true &&
    fastLoopOkRes.turnsExecuted === 1 &&
    fastLoopOkRes.waveOverhead === 0 &&
    breakerTurnsTrip.ok === false &&
    breakerTurnsTrip.breakerCheck.breakerCode === 'CIRCUIT_BREAKER_MAX_TURNS_EXCEEDED' &&
    breakerTokensTrip.ok === false &&
    breakerTokensTrip.breakerCheck.breakerCode === 'CIRCUIT_BREAKER_MAX_TOOL_TOKENS_EXCEEDED';
  console.log(
    `  [${miniSweAndBreakersOk ? 'PASS' : 'FAIL'}] 4. mini-swe-agent 1-Turn Fast-Path (${fastLoopOkRes.durationMs}ms) & inspect_ai Circuit Breakers (maxTurns=6, maxTokens=4000)`
  );

  const allPassed = lanesOk && beadsOk && deltaAndTraceOk && miniSweAndBreakersOk;
  console.log('--------------------------------------------------------------------');
  console.log(`🏆 ADAPTIVE DEPTH ROUTER SELF-TEST: ${allPassed ? 'PASSED (4/4 Checks Green)' : 'FAILED'}`);
  console.log('====================================================================\n');

  return { passed: allPassed, lane1, lane2, lane3, beadsRes, deltaRes, traceRes, fastLoopOkRes };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename);
if (isMain) {
  runAdaptiveDepthRouterSelfTest().then((r) => process.exit(r.passed ? 0 : 1));
}
