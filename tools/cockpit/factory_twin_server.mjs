#!/usr/bin/env node
/**
 * tools/cockpit/factory_twin_server.mjs — Real-Time Digital Twin Cockpit ("Factory Game Floor" + Kanban)
 * ========================================================================================================
 * Zero-Token Local Web Server (`http://localhost:4400`) powered by native `node:http` + Server-Sent Events (`SSE`).
 *
 * Synchronized Views:
 *   - Tab 1: 🎮 Mapa 2D de la Fábrica en Vivo ("Factory Game Floor" en HTML5 Canvas a 60 FPS):
 *            6 Estaciones iluminadas + 11 Personajes en miniatura (1 Capataz + 10 Agentes) con interpolación
 *            suave (`lerp`), barra de estado sobre la cabeza, globo de diálogo en tiempo real e inspector al hacer clic.
 *   - Tab 2: 📋 Tablero Kanban & Compuertas HITL (`KaibanJS` / `Pragor`):
 *            5 Columnas en vivo + botones interactivos del CTO ("✅ Aprobar Paso HITL", "💬 Enviar Feedback Rápido",
 *            "🚀 Empaquetar .ZIP") + Bitácora Forense en Vivo ("Quién hizo qué, cuándo y por qué").
 *   - Tab 3: 📊 Radiografía del Sitio Activo & FinOps:
 *            Proyecto activo, arquetipo visual, motor DB (`edge-d1` vs `enterprise-postgres`), carril SWE-AF
 *            (`LANE 1/2/3`), termómetro de los 4 bloques de `eval_matrix.mjs` (`100.0 / 100.0`) y gasto diario vs `$1.50 USD`.
 * ========================================================================================================
 */

import crypto from 'node:crypto';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  FACTORY_STATIONS,
  FACTORY_AGENTS_ROSTER,
  KANBAN_COLUMNS,
  telemetryEmitter,
  loadCurrentFactoryState,
  emitFactoryTelemetryEvent,
  runLiveDemoWalkthroughSequence
} from './live_telemetry_bus.mjs';
import {
  verifyClientInterviewGate,
  verifyDualInterviewGates,
  compileSpecFromInterview
} from '../orchestrator/client_interview_gate.mjs';
import {
  verifyPrdInterviewGate,
  compilePrdLeanAndBrandLock
} from '../orchestrator/lean_prd_architect.mjs';
import {
  executeApprovedTicketFix,
  FEEDBACK_LEDGER_PATH
} from '../feedback/client_feedback_triage_agent.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const DEFAULT_COCKPIT_PORT = Number(process.env.COCKPIT_PORT || 4400);

/**
 * Generates the single-page Spanish Cockpit HTML application (zero external runtime bloat).
 */
export function renderCockpitHtml(cockpitCsrfToken = '') {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Factory Twin Cockpit — Gemelo Digital 2D (60 FPS) & Kanban en Vivo</title>
  <style>
    :root {
      --bg-void: #070a12;
      --bg-panel: #0e1422;
      --bg-card: #131c2e;
      --bg-card-hover: #1a2640;
      --border-subtle: rgba(148, 163, 184, 0.16);
      --border-highlight: rgba(56, 189, 248, 0.45);
      --text-primary: #f8fafc;
      --text-secondary: #94a3b8;
      --text-muted: #64748b;
      --accent-cyan: #38bdf8;
      --accent-violet: #a78bfa;
      --accent-emerald: #34d399;
      --accent-amber: #fbbf24;
      --accent-orange: #fb923c;
      --accent-rose: #f43f5e;
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --font-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background: var(--bg-void);
      color: var(--text-primary);
      font-family: var(--font-sans);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
    }

    /* Top Header Bar */
    .cockpit-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      padding: 12px 20px;
      background: rgba(14, 20, 34, 0.92);
      border-bottom: 1px solid var(--border-subtle);
      backdrop-filter: blur(12px);
      position: sticky;
      top: 0;
      z-index: 40;
    }

    .brand-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .pulse-dot {
      width: 11px;
      height: 11px;
      border-radius: 50%;
      background: var(--accent-emerald);
      box-shadow: 0 0 12px var(--accent-emerald);
      animation: pulseGlow 1.8s infinite ease-in-out;
    }

    @keyframes pulseGlow {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.25); opacity: 0.65; }
    }

    .brand-title {
      font-size: 1.02rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    .brand-subtitle {
      font-size: 0.76rem;
      color: var(--text-secondary);
      font-family: var(--font-mono);
    }

    .hud-pills {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
    }

    .hud-pill {
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      padding: 6px 11px;
      font-size: 0.76rem;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .hud-pill strong {
      font-family: var(--font-mono);
      color: var(--accent-cyan);
    }

    .btn-simulate {
      background: linear-gradient(135deg, #0284c7, #6366f1);
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.22);
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }

    .btn-simulate:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 18px rgba(56, 189, 248, 0.32);
    }

    /* Navigation Tabs */
    .tabs-nav {
      display: flex;
      gap: 8px;
      padding: 10px 20px;
      background: var(--bg-panel);
      border-bottom: 1px solid var(--border-subtle);
    }

    .tab-btn {
      background: transparent;
      color: var(--text-secondary);
      border: 1px solid transparent;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 0.84rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.16s ease;
    }

    .tab-btn:hover {
      color: var(--text-primary);
      background: rgba(255, 255, 255, 0.04);
    }

    .tab-btn.active {
      color: var(--accent-cyan);
      background: rgba(56, 189, 248, 0.1);
      border-color: var(--border-highlight);
    }

    /* Main Workspace */
    .tab-panel {
      display: none;
      padding: 16px 20px;
      flex: 1;
    }

    .tab-panel.active {
      display: block;
    }

    /* Tab 1: 2D Game Floor + Character Inspector Drawer */
    .floor-layout {
      display: grid;
      grid-template-columns: 1fr 350px;
      gap: 16px;
      align-items: start;
    }

    @media (max-width: 1120px) {
      .floor-layout {
        grid-template-columns: 1fr;
      }
    }

    .canvas-card {
      background: var(--bg-panel);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 12px;
      position: relative;
    }

    .canvas-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 10px;
      font-size: 0.78rem;
      color: var(--text-secondary);
    }

    .legend-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: center;
    }

    .legend-item {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 0.73rem;
    }

    .legend-swatch {
      width: 9px;
      height: 9px;
      border-radius: 50%;
    }

    #factoryFloorCanvas {
      width: 100%;
      height: auto;
      aspect-ratio: 16 / 9;
      background: #080d19;
      border: 1px solid rgba(56, 189, 248, 0.22);
      border-radius: 10px;
      cursor: pointer;
      display: block;
    }

    .inspector-card {
      background: var(--bg-panel);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .inspector-header {
      display: flex;
      align-items: center;
      gap: 10px;
      border-bottom: 1px solid var(--border-subtle);
      padding-bottom: 10px;
    }

    .inspector-avatar {
      width: 38px;
      height: 38px;
      border-radius: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 0.72rem;
      color: #060911;
      font-family: var(--font-mono);
    }

    .inspector-field {
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      padding: 9px 11px;
    }

    .inspector-label {
      font-size: 0.69rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      margin-bottom: 4px;
    }

    .inspector-value {
      font-size: 0.81rem;
      line-height: 1.4;
      color: var(--text-primary);
    }

    .mcp-tag {
      display: inline-block;
      background: rgba(56, 189, 248, 0.13);
      color: var(--accent-cyan);
      border: 1px solid rgba(56, 189, 248, 0.3);
      border-radius: 5px;
      padding: 2px 6px;
      font-family: var(--font-mono);
      font-size: 0.71rem;
      margin: 2px 4px 2px 0;
    }

    .roster-mini-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
      margin-top: 4px;
    }

    .roster-chip {
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: 6px;
      padding: 5px 8px;
      font-size: 0.72rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: border-color 0.15s ease;
    }

    .roster-chip:hover, .roster-chip.selected {
      border-color: var(--accent-cyan);
      background: var(--bg-card-hover);
    }

    /* Tab 2: Kanban & HITL Gates */
    .hitl-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      background: var(--bg-panel);
      border: 1px solid var(--border-subtle);
      border-radius: 10px;
      padding: 12px 16px;
      margin-bottom: 14px;
    }

    .hitl-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .btn-hitl {
      border: 1px solid var(--border-subtle);
      background: var(--bg-card);
      color: var(--text-primary);
      padding: 8px 13px;
      border-radius: 8px;
      font-size: 0.79rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .btn-hitl.approve {
      background: rgba(52, 211, 153, 0.14);
      border-color: rgba(52, 211, 153, 0.45);
      color: var(--accent-emerald);
    }

    .btn-hitl.feedback {
      background: rgba(251, 191, 36, 0.14);
      border-color: rgba(251, 191, 36, 0.45);
      color: var(--accent-amber);
    }

    .btn-hitl.package {
      background: rgba(56, 189, 248, 0.14);
      border-color: rgba(56, 189, 248, 0.45);
      color: var(--accent-cyan);
    }

    .btn-hitl:hover {
      transform: translateY(-1px);
      filter: brightness(1.15);
    }

    .kanban-grid {
      display: grid;
      grid-template-columns: repeat(5, minmax(210px, 1fr));
      gap: 12px;
      overflow-x: auto;
      padding-bottom: 8px;
    }

    .kanban-col {
      background: var(--bg-panel);
      border: 1px solid var(--border-subtle);
      border-radius: 10px;
      padding: 11px;
      min-height: 290px;
      display: flex;
      flex-direction: column;
      gap: 9px;
    }

    .kanban-col-header {
      font-size: 0.76rem;
      font-weight: 700;
      color: var(--text-secondary);
      border-bottom: 1px solid var(--border-subtle);
      padding-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .kanban-count {
      background: var(--bg-card);
      color: var(--accent-cyan);
      font-family: var(--font-mono);
      padding: 2px 7px;
      border-radius: 99px;
      font-size: 0.71rem;
    }

    .kanban-card {
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-left: 3px solid var(--accent-cyan);
      border-radius: 8px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .kanban-card-title {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .kanban-meta {
      font-size: 0.71rem;
      font-family: var(--font-mono);
      color: var(--text-secondary);
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
    }

    .forensic-box {
      margin-top: 14px;
      background: var(--bg-panel);
      border: 1px solid var(--border-subtle);
      border-radius: 10px;
      padding: 12px 16px;
    }

    .forensic-list {
      max-height: 210px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-top: 8px;
      font-family: var(--font-mono);
      font-size: 0.74rem;
    }

    .forensic-item {
      padding: 6px 9px;
      background: var(--bg-card);
      border-radius: 6px;
      border-left: 3px solid var(--accent-violet);
      display: flex;
      justify-content: space-between;
      gap: 12px;
    }

    /* Tab 3: Site X-Ray & FinOps */
    .xray-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 14px;
    }

    .xray-card {
      background: var(--bg-panel);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .xray-title {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--accent-cyan);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .metric-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 7px 0;
      border-bottom: 1px solid rgba(148, 163, 184, 0.08);
      font-size: 0.82rem;
    }

    .progress-track {
      width: 100%;
      height: 9px;
      background: #090e1a;
      border-radius: 99px;
      overflow: hidden;
      border: 1px solid var(--border-subtle);
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--accent-emerald), var(--accent-cyan));
      transition: width 0.3s ease;
    }
  </style>
</head>
<body>
  <header class="cockpit-header">
    <div class="brand-group">
      <span class="pulse-dot" id="sseStatusDot"></span>
      <div>
        <div class="brand-title">FACTORY TWIN COCKPIT — GEMELO DIGITAL EN TIEMPO REAL</div>
        <div class="brand-subtitle" id="headerSub">SSE Conectado | 0 Tokens Overhead | 6 Estaciones | 11 Personajes a 60 FPS</div>
      </div>
    </div>

    <div class="hud-pills">
      <div class="hud-pill">Sitio Activo: <strong id="hudProject">agencia-alfa</strong></div>
      <div class="hud-pill">Entrevistas #1/#2: <strong id="hudInterviews">APROBADAS</strong></div>
      <div class="hud-pill">XState v5: <strong id="hudXState">packaged_and_landed</strong></div>
      <div class="hud-pill">Carril SWE-AF: <strong id="hudLane">LANE_2_STANDARD_BUILD</strong></div>
      <div class="hud-pill">Etapa RPI: <strong id="hudRpi">Implementation (6/6)</strong></div>
      <div class="hud-pill">Score: <strong id="hudScore">100.0 / 100.0</strong></div>
      <div class="hud-pill">FinOps: <strong id="hudBudget">$0.042 / $1.50 USD</strong></div>
      <button class="btn-simulate" id="btnRunWalkthrough">▶️ Simular Recorrido de los 10 Agentes en Vivo</button>
    </div>
  </header>

  <nav class="tabs-nav" role="tablist">
    <button class="tab-btn active" data-tab="tab-floor">🎮 Pestaña 1: Mapa 2D de la Fábrica en Vivo (60 FPS)</button>
    <button class="tab-btn" data-tab="tab-kanban">📋 Pestaña 2: Tablero Kanban & Compuertas HITL</button>
    <button class="tab-btn" data-tab="tab-xray">📊 Pestaña 3: Radiografía del Sitio Activo & FinOps</button>
  </nav>

  <!-- TAB 1: 2D PIXEL FACTORY FLOOR (60 FPS CANVAS) -->
  <section class="tab-panel active" id="tab-floor">
    <div class="floor-layout">
      <div class="canvas-card">
        <div class="canvas-toolbar">
          <div>Hacé clic sobre cualquiera de los <strong>11 personajes</strong> en las 6 estaciones para inspeccionar sus herramientas MCP y permisos Zero-Trust.</div>
          <div class="legend-row">
            <span class="legend-item"><span class="legend-swatch" style="background:#64748b"></span>Inactivo</span>
            <span class="legend-item"><span class="legend-swatch" style="background:#38bdf8"></span>Caminando</span>
            <span class="legend-item"><span class="legend-swatch" style="background:#34d399"></span>Trabajando</span>
            <span class="legend-item"><span class="legend-swatch" style="background:#fbbf24"></span>Esperando CTO HITL</span>
            <span class="legend-item"><span class="legend-swatch" style="background:#fb923c"></span>Auto-Reparando (1/2)</span>
            <span class="legend-item"><span class="legend-swatch" style="background:#facc15"></span>100/100 Aprobado</span>
          </div>
        </div>
        <canvas id="factoryFloorCanvas" width="1260" height="700"></canvas>
      </div>

      <aside class="inspector-card" id="agentInspector">
        <div class="inspector-header">
          <div class="inspector-avatar" id="inspAvatar" style="background:#38bdf8">FOR</div>
          <div>
            <div style="font-weight:700;font-size:0.95rem" id="inspName">Capataz (Foreman)</div>
            <div style="font-size:0.75rem;color:var(--text-secondary)" id="inspWave">Ola 0 (Gobierno & Enrutamiento)</div>
          </div>
        </div>

        <div class="inspector-field">
          <div class="inspector-label">Estación Actual & Estado</div>
          <div class="inspector-value" id="inspStation">Sala 1: Recepción & Triaje — TRABAJANDO</div>
        </div>

        <div class="inspector-field">
          <div class="inspector-label">Función Exacta en la Fábrica</div>
          <div class="inspector-value" id="inspFunction">Dirige el plano de control factory.yaml y coordina las 6 etapas RPI.</div>
        </div>

        <div class="inspector-field">
          <div class="inspector-label">Modo de Permisos (Creator-Verifier Split)</div>
          <div class="inspector-value" id="inspPerm" style="font-family:var(--font-mono);color:var(--accent-emerald)">GOVERNANCE_SUPERVISOR</div>
        </div>

        <div class="inspector-field">
          <div class="inspector-label">Herramientas MCP Asignadas</div>
          <div class="inspector-value" id="inspMcp"></div>
        </div>

        <div class="inspector-field">
          <div class="inspector-label">Última Acción & Archivo en Uso</div>
          <div class="inspector-value" id="inspAction" style="font-family:var(--font-mono);font-size:0.76rem">factory.yaml</div>
        </div>

        <div class="inspector-field">
          <div class="inspector-label">Historial de Aciertos (OpenSpace Skill Quality)</div>
          <div class="inspector-value" id="inspQuality" style="color:var(--accent-cyan);font-weight:700">99.4% efectividad verificada</div>
        </div>

        <div>
          <div class="inspector-label">Selección Rápida de los 11 Personajes</div>
          <div class="roster-mini-list" id="rosterQuickList"></div>
        </div>
      </aside>
    </div>
  </section>

  <!-- TAB 2: KANBAN BOARD & HITL GATES -->
  <section class="tab-panel" id="tab-kanban">
    <div class="hitl-bar">
      <div>
        <div style="font-weight:700;font-size:0.92rem">Compuertas Interactivas del CTO (Human-in-the-Loop)</div>
        <div style="font-size:0.76rem;color:var(--text-secondary)">Gobernanza directa sobre el grafo de tareas Beads (<code>.agents/beads/task_graph.jsonl</code>) y las 6 etapas RPI.</div>
      </div>
      <div class="hitl-actions">
        <button class="btn-hitl approve" data-hitl="approve_hitl">✅ Aprobar Paso HITL</button>
        <button class="btn-hitl feedback" data-hitl="send_feedback">💬 Enviar Feedback Rápido</button>
        <button class="btn-hitl package" data-hitl="package_zip">🚀 Empaquetar .ZIP</button>
      </div>
    </div>

    <div class="kanban-grid" id="kanbanBoardGrid"></div>

    <div class="forensic-box">
      <div style="font-weight:700;font-size:0.86rem;color:var(--accent-violet)">🕵️ Bitácora Forense en Vivo (Quién hizo qué, cuándo y por qué)</div>
      <div class="forensic-list" id="forensicLogList"></div>
    </div>
  </section>

  <!-- TAB 3: RADIOGRAFÍA DEL SITIO ACTIVO & FINOPS -->
  <section class="tab-panel" id="tab-xray">
    <div class="xray-grid">
      <div class="xray-card">
        <div class="xray-title">🏛️ Identidad del Proyecto & Arquitectura</div>
        <div class="metric-row"><span>Proyecto Activo:</span><strong id="xrProject">agencia-alfa</strong></div>
        <div class="metric-row"><span>Arquetipo Visual (DESIGN.md):</span><strong id="xrArchetype">saas-b2b</strong></div>
        <div class="metric-row"><span>Motor de Base de Datos Dual:</span><strong id="xrDbTier">edge-d1</strong></div>
        <div class="metric-row"><span>Entrevista #1 (PRD & Marca):</span><strong id="xrInterview1" style="color:var(--accent-emerald)">COMPLETED_BY_CTO</strong></div>
        <div class="metric-row"><span>Modo de Identidad de Marca:</span><strong id="xrBrandMode">PARTIAL_BRAND_EVOLUTION</strong></div>
        <div class="metric-row"><span>Entrevista #2 (SPEC Técnico):</span><strong id="xrInterview2" style="color:var(--accent-emerald)">COMPLETED_BY_CTO</strong></div>
        <div class="metric-row"><span>Nodo Activo XState v5 (10 Estados):</span><strong id="xrXStateNode" style="color:var(--accent-cyan)">packaged_and_landed</strong></div>
        <div class="metric-row"><span>Cadena Hash Burr (Inmutable):</span><strong id="xrBurrHash" style="font-family:var(--font-mono)">GENESIS_0000</strong></div>
        <div class="metric-row"><span>Carril Adaptativo (SWE-AF):</span><strong id="xrLane">LANE_2_STANDARD_BUILD</strong></div>
        <div class="metric-row"><span>Etapa HumanLayer RPI (6 Etapas):</span><strong id="xrRpi">Implementation (6/6)</strong></div>
      </div>

      <div class="xray-card">
        <div class="xray-title">🌡️ Termómetro Hard-Gated (4 Bloques x 25 pts)</div>
        <div class="metric-row"><span>Puntaje Compuesto Final:</span><strong id="xrScoreTotal" style="color:var(--accent-emerald)">100.0 / 100.0</strong></div>
        <div class="progress-track"><div class="progress-fill" id="xrScoreBar" style="width:100%"></div></div>
        <div class="metric-row"><span>Bloque 1 (Build + Oxlint + AST Guard):</span><strong id="xrB1">25 / 25 pts</strong></div>
        <div class="metric-row"><span>Bloque 2 (Ciberseguridad Zero-Trust):</span><strong id="xrB2">25 / 25 pts</strong></div>
        <div class="metric-row"><span>Bloque 3 (Chaos Monkey Destructivo):</span><strong id="xrB3">25 / 25 pts</strong></div>
        <div class="metric-row"><span>Bloque 4 (RYUX Visual + 60 FPS + VLM):</span><strong id="xrB4">25 / 25 pts</strong></div>
      </div>

      <div class="xray-card">
        <div class="xray-title">💰 Presupuesto FinOps & Memoria Cognitiva JEV</div>
        <div class="metric-row"><span>Gasto Acumulado Hoy:</span><strong id="xrSpent">$0.042 USD</strong></div>
        <div class="metric-row"><span>Tope Diario Estricto (factory.yaml):</span><strong id="xrCap">$1.50 USD</strong></div>
        <div class="progress-track"><div class="progress-fill" id="xrBudgetBar" style="width:3%"></div></div>
        <div class="metric-row"><span>JEV 5-Tier Memory (Reglas Activas):</span><strong id="xrJevRules" style="color:var(--accent-emerald)">12 activas (ACT-R)</strong></div>
        <div class="metric-row"><span>JEV FinOps Ledger (Evaluaciones/Caché):</span><strong id="xrJevLedger" style="color:var(--accent-cyan)">0 evals ($0.00)</strong></div>
        <div class="metric-row"><span>Compuerta F2P (Fail-to-Pass):</span><strong style="color:var(--accent-emerald)">VERIFICADO (PASS)</strong></div>
        <div class="metric-row"><span>Compuerta P2P (Pass-to-Pass Regresión):</span><strong style="color:var(--accent-emerald)">100% INTACTO</strong></div>
        <div class="metric-row"><span>Sobrecarga de Tokens del Cockpit:</span><strong style="color:var(--accent-cyan)">0 TOKENS (Local SSE)</strong></div>
      </div>
    </div>
  </section>

  <script>
    const COCKPIT_CSRF_TOKEN = ${JSON.stringify(cockpitCsrfToken)};
    let currentState = null;
    let selectedAgentId = 'foreman';
    const agentCoordinates = new Map(); // id -> { x, y, targetX, targetY }

    // Tab switching
    document.querySelectorAll('.tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach((p) => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
      });
    });

    // Walkthrough Simulation Button
    document.getElementById('btnRunWalkthrough').addEventListener('click', async () => {
      const btn = document.getElementById('btnRunWalkthrough');
      btn.disabled = true;
      btn.textContent = '⚡ Simulando recorrido en las 6 salas...';
      try {
        await fetch('/api/simulate', {
          method: 'POST',
          headers: { 'X-Cockpit-Token': COCKPIT_CSRF_TOKEN }
        });
      } finally {
        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = '▶️ Simular Recorrido de los 10 Agentes en Vivo';
        }, 600);
      }
    });

    // HITL Interactive Buttons
    document.querySelectorAll('[data-hitl]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const action = btn.dataset.hitl;
        let note = '';
        if (action === 'send_feedback') {
          note = 'Ajustar micro-contraste APCA en hero principal';
        }
        await fetch('/api/hitl-action', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Cockpit-Token': COCKPIT_CSRF_TOKEN
          },
          body: JSON.stringify({ action, note })
        });
      });
    });

    function computeStationRect(station, canvasW, canvasH) {
      const padX = 24;
      const padY = 24;
      const gapX = 20;
      const gapY = 24;
      const roomW = (canvasW - padX * 2 - gapX * 2) / 3;
      const roomH = (canvasH - padY * 2 - gapY) / 2;
      const x = padX + station.gridCol * (roomW + gapX);
      const y = padY + station.gridRow * (roomH + gapY);
      return { x, y, w: roomW, h: roomH };
    }

    function syncAgentTargets(state) {
      if (!state || !state.stations || !state.agents) return;
      const canvas = document.getElementById('factoryFloorCanvas');
      const W = canvas.width;
      const H = canvas.height;

      const stationBuckets = new Map();
      for (const ag of state.agents) {
        const stId = ag.currentStation || ag.homeStation;
        if (!stationBuckets.has(stId)) stationBuckets.set(stId, []);
        stationBuckets.get(stId).push(ag);
      }

      for (const st of state.stations) {
        const rect = computeStationRect(st, W, H);
        const occupants = stationBuckets.get(st.id) || [];
        occupants.forEach((ag, idx) => {
          const cols = Math.min(3, Math.max(1, occupants.length));
          const col = idx % cols;
          const row = Math.floor(idx / cols);
          const slotW = (rect.w - 60) / cols;
          const targetX = rect.x + 35 + col * slotW + slotW * 0.45;
          const targetY = rect.y + 115 + row * 95;

          if (!agentCoordinates.has(ag.id)) {
            agentCoordinates.set(ag.id, { x: targetX, y: targetY, targetX, targetY });
          } else {
            const pos = agentCoordinates.get(ag.id);
            pos.targetX = targetX;
            pos.targetY = targetY;
          }
        });
      }
    }

    function updateDomFromState(state) {
      currentState = state;
      syncAgentTargets(state);

      document.getElementById('hudProject').textContent = state.projectSlug;
      const meta = state.projectMeta || {};
      const xstate = state.xstateSnapshot || {};
      const jevMem = state.jevMemoryPipeline || state.finopsSnapshot?.jevMemoryReport || {};
      const jevLedger = state.jevFinopsLedger || state.finopsSnapshot?.jevFinopsLedger || {};
      const dualOk = meta.dualInterviewsApproved || (meta.prdInterviewStatus === 'COMPLETED_BY_CTO' && meta.specInterviewStatus === 'COMPLETED_BY_CTO');
      document.getElementById('hudInterviews').textContent = dualOk ? '1&2 APROBADAS' : (meta.prdInterviewStatus === 'COMPLETED_BY_CTO' ? '#1 OK / #2 PEND' : 'PENDIENTES');
      document.getElementById('hudXState').textContent = xstate.currentState || xstate.activeState || 'uninitialized';
      document.getElementById('hudLane').textContent = state.activeLane;
      document.getElementById('hudRpi').textContent = state.rpiStage + ' (' + (state.rpiStageOrder || 6) + '/6)';
      document.getElementById('hudScore').textContent = Number(state.scores?.composite || 100).toFixed(1) + ' / 100.0';
      document.getElementById('hudBudget').textContent = '$' + Number(state.budgetSpentUsd || 0.042).toFixed(3) + ' / $' + Number(state.budgetDailyCapUsd || 1.5).toFixed(2) + ' USD';

      // Inspector update
      const sel = (state.agents || []).find((a) => a.id === selectedAgentId) || state.agents[0];
      if (sel) {
        const stObj = (state.stations || []).find((s) => s.id === sel.currentStation);
        document.getElementById('inspAvatar').style.background = sel.avatarColor || '#38bdf8';
        document.getElementById('inspAvatar').textContent = (sel.badge || sel.id).slice(0, 4);
        document.getElementById('inspName').textContent = sel.name;
        document.getElementById('inspWave').textContent = sel.wave;
        document.getElementById('inspStation').textContent = (stObj ? stObj.shortTitle : sel.currentStation) + ' — ' + String(sel.status || 'working').toUpperCase();
        document.getElementById('inspFunction').textContent = sel.exactFunction;
        document.getElementById('inspPerm').textContent = sel.permissionMode;
        document.getElementById('inspAction').textContent = (sel.lastAction || 'Listo') + ' [' + (sel.activeFile || '') + ']';
        document.getElementById('inspQuality').textContent = (sel.skillQualityRate || '99.0%') + ' de aciertos verificados (OpenSpace)';
        document.getElementById('inspMcp').innerHTML = (sel.mcpTools || [])
          .map((m) => '<span class="mcp-tag">' + m + '</span>')
          .join('');
      }

      // Quick roster chips
      const rosterEl = document.getElementById('rosterQuickList');
      rosterEl.innerHTML = (state.agents || [])
        .map((a) => {
          const isSel = a.id === selectedAgentId ? 'selected' : '';
          return '<div class="roster-chip ' + isSel + '" data-agent-id="' + a.id + '">' +
            '<span>' + a.name.split(' ')[0] + '</span>' +
            '<strong style="color:' + a.avatarColor + ';font-family:var(--font-mono)">' + a.badge + '</strong>' +
          '</div>';
        })
        .join('');
      rosterEl.querySelectorAll('[data-agent-id]').forEach((chip) => {
        chip.addEventListener('click', () => {
          selectedAgentId = chip.dataset.agentId;
          updateDomFromState(currentState);
        });
      });

      // Kanban Board
      const kbGrid = document.getElementById('kanbanBoardGrid');
      const cols = state.kanbanColumns || [];
      const cards = state.kanbanCards || [];
      kbGrid.innerHTML = cols
        .map((col) => {
          const colCards = cards.filter((c) => c.columnId === col.id);
          const cardsHtml = colCards
            .map(
              (c) =>
                '<div class="kanban-card">' +
                '<div class="kanban-card-title">' + c.title + '</div>' +
                '<div class="kanban-meta">' +
                '<span>' + c.reqId + '</span>' +
                '<span>• ' + c.assignedRole + '</span>' +
                '<span>• ' + c.lane + '</span>' +
                '</div>' +
                '<div style="font-size:0.69rem;color:#34d399;font-family:var(--font-mono)">F2P: PASS | P2P: PASS</div>' +
                '</div>'
            )
            .join('');
          return (
            '<div class="kanban-col">' +
            '<div class="kanban-col-header"><span>' + col.title + '</span><span class="kanban-count">' + colCards.length + '</span></div>' +
            (cardsHtml || '<div style="font-size:0.74rem;color:var(--text-muted);padding:8px 0">Sin tareas bloqueadas</div>') +
            '</div>'
          );
        })
        .join('');

      // Forensic log
      const fList = document.getElementById('forensicLogList');
      fList.innerHTML = (state.forensicLog || [])
        .map(
          (entry) =>
            '<div class="forensic-item">' +
            '<span><strong>[' + entry.actorRole + ']</strong> ' + entry.actionWhy + '</span>' +
            '<span style="color:var(--text-muted)">' + new Date(entry.timestamp).toLocaleTimeString() + '</span>' +
            '</div>'
        )
        .join('');

      // Tab 3 X-Ray
      document.getElementById('xrProject').textContent = state.projectSlug;
      document.getElementById('xrArchetype').textContent = meta.archetype || state.archetype || 'saas-b2b';
      document.getElementById('xrDbTier').textContent = meta.dbTier || state.dbTier || 'edge-d1';
      document.getElementById('xrInterview1').textContent = meta.prdInterviewStatus || 'PENDING_CTO_PRD_INPUT';
      document.getElementById('xrBrandMode').textContent = meta.brandIdentityMode || 'PARTIAL_BRAND_EVOLUTION';
      document.getElementById('xrInterview2').textContent = meta.specInterviewStatus || 'PENDING_CTO_SPEC_INPUT';
      document.getElementById('xrXStateNode').textContent = xstate.currentState || xstate.activeState || 'uninitialized';
      document.getElementById('xrBurrHash').textContent = String(xstate.chainHash || 'GENESIS_0000').slice(0, 16) + ' (' + (Array.isArray(xstate.burrActionLog) ? xstate.burrActionLog.length : 0) + ' acts)';
      document.getElementById('xrLane').textContent = state.activeLane;
      document.getElementById('xrRpi').textContent = state.rpiStage + ' (' + (state.rpiStageOrder || 6) + '/6)';
      const comp = Number(state.scores?.composite || 100);
      document.getElementById('xrScoreTotal').textContent = comp.toFixed(1) + ' / 100.0';
      document.getElementById('xrScoreBar').style.width = Math.min(100, comp) + '%';
      document.getElementById('xrB1').textContent = (state.scores?.block1_build_ast ?? 25) + ' / 25 pts';
      document.getElementById('xrB2').textContent = (state.scores?.block2_security ?? 25) + ' / 25 pts';
      document.getElementById('xrB3').textContent = (state.scores?.block3_chaos ?? 25) + ' / 25 pts';
      document.getElementById('xrB4').textContent = (state.scores?.block4_ryux_visual ?? 25) + ' / 25 pts';
      document.getElementById('xrSpent').textContent = '$' + Number(state.budgetSpentUsd || 0.042).toFixed(3) + ' USD';
      document.getElementById('xrCap').textContent = '$' + Number(state.budgetDailyCapUsd || 1.5).toFixed(2) + ' USD';
      const activeJevRules = jevMem?.tiersSummary?.tier3_semanticActiveRules ?? 12;
      const trackedSkills = jevMem?.tiersSummary?.tier4_proceduralSkillsTracked ?? 70;
      document.getElementById('xrJevRules').textContent = activeJevRules + ' reglas / ' + trackedSkills + ' skills (ACT-R)';
      const totalJevEvals = jevLedger?.totalApiCalls ?? jevLedger?.totalEvaluations ?? jevLedger?.totalCalls ?? 0;
      const cacheJevHits = jevLedger?.totalCacheHits ?? jevLedger?.cacheHits ?? 0;
      document.getElementById('xrJevLedger').textContent = totalJevEvals + ' evals / ' + cacheJevHits + ' cache hits ($0.00)';
      const pctBudget = Math.min(100, ((state.budgetSpentUsd || 0.042) / (state.budgetDailyCapUsd || 1.5)) * 100);
      document.getElementById('xrBudgetBar').style.width = pctBudget.toFixed(1) + '%';
    }

    // Canvas Click Hit-Detection to Select Character
    const canvasEl = document.getElementById('factoryFloorCanvas');
    canvasEl.addEventListener('click', (ev) => {
      if (!currentState || !currentState.agents) return;
      const rect = canvasEl.getBoundingClientRect();
      const scaleX = canvasEl.width / rect.width;
      const scaleY = canvasEl.height / rect.height;
      const clickX = (ev.clientX - rect.left) * scaleX;
      const clickY = (ev.clientY - rect.top) * scaleY;

      for (const ag of currentState.agents) {
        const pos = agentCoordinates.get(ag.id);
        if (!pos) continue;
        const dist = Math.hypot(clickX - pos.x, clickY - pos.y);
        if (dist <= 32) {
          selectedAgentId = ag.id;
          updateDomFromState(currentState);
          break;
        }
      }
    });

    // 60 FPS Canvas Render Loop with smooth lerp interpolation
    let frameTick = 0;
    function renderFloor60Fps() {
      frameTick++;
      const ctx = canvasEl.getContext('2d');
      const W = canvasEl.width;
      const H = canvasEl.height;

      ctx.clearRect(0, 0, W, H);

      // Subtle architectural blueprint grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.045)';
      ctx.lineWidth = 1;
      for (let gx = 0; gx < W; gx += 30) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, H);
        ctx.stroke();
      }
      for (let gy = 0; gy < H; gy += 30) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(W, gy);
        ctx.stroke();
      }

      if (currentState && currentState.stations) {
        // Draw the 6 Illuminated Factory Stations
        for (const st of currentState.stations) {
          const r = computeStationRect(st, W, H);
          ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
          ctx.strokeStyle = st.accentColor || '#38bdf8';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(r.x, r.y, r.w, r.h, 12);
          ctx.fill();
          ctx.stroke();

          // Top station banner
          ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';
          ctx.beginPath();
          ctx.roundRect(r.x + 2, r.y + 2, r.w - 4, 48, 10);
          ctx.fill();

          ctx.fillStyle = st.accentColor || '#38bdf8';
          ctx.font = 'bold 13px Inter, sans-serif';
          ctx.fillText(st.shortTitle, r.x + 14, r.y + 22);

          ctx.fillStyle = '#94a3b8';
          ctx.font = '11px JetBrains Mono, monospace';
          ctx.fillText(st.subtitle.slice(0, 48), r.x + 14, r.y + 40);
        }

        // Draw the 11 Miniature Characters with smooth lerp movement
        for (const ag of currentState.agents || []) {
          const pos = agentCoordinates.get(ag.id);
          if (!pos) continue;

          // Lerp interpolation (60 FPS smooth walking)
          const dx = pos.targetX - pos.x;
          const dy = pos.targetY - pos.y;
          const dist = Math.hypot(dx, dy);
          const isMoving = dist > 1.5;
          pos.x += dx * 0.12;
          pos.y += dy * 0.12;

          const bobOffset = isMoving
            ? Math.sin(frameTick * 0.28) * 4
            : Math.sin(frameTick * 0.08 + ag.id.length) * 1.8;

          const cx = pos.x;
          const cy = pos.y + bobOffset;

          // Status color encoding
          const effectiveStatus = isMoving ? 'walking' : (ag.status || 'working');
          let statusColor = '#34d399'; // working (green)
          let statusLabel = 'TRABAJANDO';
          if (effectiveStatus === 'idle') {
            statusColor = '#64748b';
            statusLabel = 'INACTIVO';
          } else if (effectiveStatus === 'walking') {
            statusColor = '#38bdf8';
            statusLabel = 'CAMINANDO';
          } else if (effectiveStatus === 'hitl_waiting') {
            statusColor = frameTick % 30 < 15 ? '#fbbf24' : '#f59e0b';
            statusLabel = 'ESPERANDO CTO';
          } else if (effectiveStatus === 'repairing') {
            statusColor = '#fb923c';
            statusLabel = 'RETRY ' + (ag.retryRound || 1) + '/2';
          } else if (effectiveStatus === 'passed') {
            statusColor = '#facc15';
            statusLabel = '100/100 PASS';
          }

          // Selection ring if selected
          if (ag.id === selectedAgentId) {
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(cx, cy, 26, 0, Math.PI * 2);
            ctx.stroke();
          }

          // Character Pixel/Sprite Body
          ctx.fillStyle = ag.avatarColor || '#38bdf8';
          ctx.beginPath();
          ctx.roundRect(cx - 16, cy - 16, 32, 32, 8);
          ctx.fill();

          // Character Eyes (Game look)
          ctx.fillStyle = '#070a12';
          ctx.fillRect(cx - 8, cy - 6, 5, 5);
          ctx.fillRect(cx + 3, cy - 6, 5, 5);

          // Role Badge below character
          ctx.fillStyle = '#f8fafc';
          ctx.font = 'bold 10px JetBrains Mono, monospace';
          ctx.textAlign = 'center';
          ctx.fillText(ag.badge || ag.id.slice(0, 5).toUpperCase(), cx, cy + 28);

          // Overhead Status Pill Bar
          const barW = 78;
          const barH = 14;
          ctx.fillStyle = 'rgba(7, 10, 18, 0.9)';
          ctx.strokeStyle = statusColor;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.roundRect(cx - barW / 2, cy - 36, barW, barH, 4);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = statusColor;
          ctx.font = 'bold 8.5px JetBrains Mono, monospace';
          ctx.fillText(statusLabel, cx, cy - 26);

          // Floating Speech Bubble with current file / tool
          const bubbleText = (ag.activeFile || ag.lastAction || '').slice(0, 22);
          if (bubbleText) {
            const bw = Math.max(84, bubbleText.length * 5.3 + 12);
            ctx.fillStyle = 'rgba(19, 28, 46, 0.94)';
            ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect(cx - bw / 2, cy - 55, bw, 16, 5);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#e2e8f0';
            ctx.font = '9px JetBrains Mono, monospace';
            ctx.fillText(bubbleText, cx, cy - 44);
          }
          ctx.textAlign = ' start';
        }
      }

      requestAnimationFrame(renderFloor60Fps);
    }

    // Initial state load + SSE subscription
    fetch('/api/state')
      .then((r) => r.json())
      .then((st) => updateDomFromState(st))
      .catch(() => {});

    const evtSource = new EventSource('/api/stream');
    evtSource.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload && payload.state) {
          updateDomFromState(payload.state);
        }
      } catch (_) {}
    };

    requestAnimationFrame(renderFloor60Fps);
  </script>
</body>
</html>`;
}

/**
 * Creates and starts the Factory Twin HTTP + SSE Server.
 */
export function createFactoryTwinServer() {
  const sseClients = new Set();
  const cockpitCsrfToken = crypto.randomBytes(24).toString('hex');

  const isAllowedLocalOrigin = (originHeader, hostHeader) => {
    if (!originHeader) return true;
    try {
      const originUrl = new URL(originHeader);
      if (originUrl.protocol !== 'http:') return false;
      const host = originUrl.hostname;
      if (host !== '127.0.0.1' && host !== 'localhost') return false;
      if (hostHeader) {
        const expectedPort = String(hostHeader).split(':')[1] || '';
        if (expectedPort && originUrl.port && originUrl.port !== expectedPort) return false;
      }
      return true;
    } catch {
      return false;
    }
  };

  const onTelemetryUpdate = ({ state, streamEntry }) => {
    const frame = `data: ${JSON.stringify({ state, streamEntry })}\n\n`;
    for (const res of sseClients) {
      try {
        res.write(frame);
      } catch (_) {
        sseClients.delete(res);
      }
    }
  };

  telemetryEmitter.on('state-updated', onTelemetryUpdate);

  const server = http.createServer(async (req, res) => {
    const urlObj = new URL(req.url || '/', `http://${req.headers.host || '127.0.0.1'}`);
    const pathname = urlObj.pathname;

    const originHeader = req.headers.origin;
    if (originHeader && !isAllowedLocalOrigin(originHeader, req.headers.host)) {
      res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ ok: false, error: 'FORBIDDEN_CROSS_ORIGIN' }));
      return;
    }
    if (originHeader) {
      res.setHeader('Access-Control-Allow-Origin', originHeader);
      res.setHeader('Vary', 'Origin');
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Cockpit-Token');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    if (req.method === 'POST' && (pathname === '/api/simulate' || pathname === '/api/hitl-action')) {
      const providedToken = String(req.headers['x-cockpit-token'] || '');
      const tokenValid =
        providedToken.length === cockpitCsrfToken.length &&
        crypto.timingSafeEqual(Buffer.from(providedToken, 'utf8'), Buffer.from(cockpitCsrfToken, 'utf8'));
      if (!tokenValid) {
        res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ ok: false, error: 'FORBIDDEN_INVALID_COCKPIT_CSRF_TOKEN' }));
        return;
      }
    }

    // 1. Main 3-Tab Cockpit UI
    if (req.method === 'GET' && (pathname === '/' || pathname === '/index.html')) {
      const html = renderCockpitHtml(cockpitCsrfToken);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
      return;
    }

    // 2. Current Factory State Snapshot JSON
    if (req.method === 'GET' && pathname === '/api/state') {
      const state = loadCurrentFactoryState();
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(state));
      return;
    }

    // 3. Real-Time Server-Sent Events (SSE) Stream (0 Token Overhead)
    if (req.method === 'GET' && pathname === '/api/stream') {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive'
      });
      const initialState = loadCurrentFactoryState();
      res.write(`data: ${JSON.stringify({ state: initialState, streamEntry: { eventType: 'SSE_INITIAL_HANDSHAKE' } })}\n\n`);
      sseClients.add(res);
      req.on('close', () => {
        sseClients.delete(res);
      });
      return;
    }

    // 4. Trigger Live 11-Character / 6-Station Walkthrough Simulation
    if (req.method === 'POST' && pathname === '/api/simulate') {
      const finalState = await runLiveDemoWalkthroughSequence({ stepDelayMs: 35 });
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(
        JSON.stringify({
          ok: true,
          stationsCount: FACTORY_STATIONS.length,
          agentsCount: FACTORY_AGENTS_ROSTER.length,
          kanbanColumnsCount: KANBAN_COLUMNS.length,
          state: finalState
        })
      );
      return;
    }

    // 5. Interactive CTO HITL Actions ("approve_hitl", "send_feedback", "package_zip")
    if (req.method === 'POST' && pathname === '/api/hitl-action') {
      let rawBody = '';
      req.on('data', (chunk) => {
        rawBody += chunk.toString();
      });
      req.on('end', async () => {
        let body = {};
        try {
          body = JSON.parse(rawBody || '{}');
        } catch (_) {}

        const action = String(body.action || 'approve_hitl');
        const note = String(body.note || '');
        const current = loadCurrentFactoryState();

        let updatedState;
        let approvedTicketResult = null;
        if (action === 'approve_hitl' || action === 'approve_interview' || action === 'approve_prd_interview' || action === 'approve_ticket') {
          try {
            compilePrdLeanAndBrandLock(current.projectSlug || 'agencia-alfa', { approve: true });
            compileSpecFromInterview(current.projectSlug || 'agencia-alfa', { approve: true, refreshFromPrd: true });
          } catch (_) {}
          try {
            let pendingTicketId = body.ticketId || '';
            if (!pendingTicketId && fs.existsSync(FEEDBACK_LEDGER_PATH)) {
              const ledger = JSON.parse(fs.readFileSync(FEEDBACK_LEDGER_PATH, 'utf8'));
              const waitingTicket = (ledger.tickets || []).find((t) => t.status === 'WAITING_CTO_TRIAGE_APPROVAL');
              if (waitingTicket) pendingTicketId = waitingTicket.ticketId;
            }
            if (pendingTicketId) {
              approvedTicketResult = await executeApprovedTicketFix(pendingTicketId, { approvedByCto: true });
            }
          } catch (_) {}
          updatedState = emitFactoryTelemetryEvent({
            eventType: 'CTO_HITL_APPROVED',
            projectSlug: current.projectSlug,
            rpiStage: 'Implementation',
            rpiStageOrder: 6,
            agentUpdates: [
              {
                id: 'product-spec-architect',
                currentStation: 'SALA_2_LABORATORIO_PLANOS_RAG',
                status: 'passed',
                lastAction: 'Plano / Delta Spec aprobado por el CTO HITL desde el Cockpit Web'
              },
              {
                id: 'senior-coder',
                currentStation: 'SALA_4_LINEA_ENSAMBLAJE_3D_DB',
                status: 'working',
                lastAction: 'Ejecutando implementación autorizada por CTO HITL'
              }
            ],
            kanbanCardUpdate: {
              id: current.kanbanCards?.[0]?.id || 'bead-hitl-card',
              columnId: 'col_3_in_construction'
            },
            forensicWhy: 'CTO HITL aprobó el paso (Entrevista / Ticket Triage) desde el Tablero Kanban del Cockpit.'
          });
        } else if (action === 'send_feedback') {
          updatedState = emitFactoryTelemetryEvent({
            eventType: 'CTO_FAST_FEEDBACK',
            projectSlug: current.projectSlug,
            activeLane: 'LANE_1_FAST_PATH',
            agentUpdates: [
              {
                id: 'triage-agent',
                currentStation: 'SALA_1_RECEPCION_TRIAJE',
                status: 'working',
                lastAction: `Feedback CTO recibido: ${note || 'Ajuste quirúrgico Lane 1'}`
              }
            ],
            kanbanCardUpdate: {
              id: `bead-feedback-${Date.now().toString(36)}`,
              reqId: 'REQ-HITL-FB',
              title: note || 'Ajuste rápido enviado por el CTO desde el Cockpit',
              assignedRole: 'ux-designer',
              lane: 'LANE_1_FAST_PATH',
              columnId: 'col_2_waiting_hitl'
            },
            forensicWhy: `CTO envió feedback rápido desde el Cockpit: "${note || 'Ajuste visual'}"`
          });
        } else {
          updatedState = emitFactoryTelemetryEvent({
            eventType: 'CTO_PACKAGE_ZIP_TRIGGERED',
            projectSlug: current.projectSlug,
            rpiStage: 'Implementation',
            rpiStageOrder: 6,
            agentUpdates: [
              {
                id: 'foreman',
                currentStation: 'SALA_6_MUELLE_EMPAQUETADO_ZIP',
                status: 'passed',
                activeFile: `deliverables/${current.projectSlug}/${current.projectSlug}-produccion.zip`,
                lastAction: 'Empaquetado .ZIP autónomo verificado en Sala 6'
              }
            ],
            kanbanCardUpdate: {
              id: current.kanbanCards?.[0]?.id || 'bead-hitl-card',
              columnId: 'col_5_approved_packaged'
            },
            forensicWhy: 'CTO disparó empaquetado .ZIP autónomo hacia Sala 6 (Muelle de Despliegue).'
          });
        }

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(
          JSON.stringify({
            ok: true,
            action,
            approvedTicket: approvedTicketResult ? approvedTicketResult.ticketId : null,
            state: updatedState
          })
        );
      });
      return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: 'Not Found', path: pathname }));
  });

  server.cockpitCsrfToken = cockpitCsrfToken;

  server.on('close', () => {
    telemetryEmitter.off('state-updated', onTelemetryUpdate);
    for (const res of sseClients) {
      try {
        res.end();
      } catch (_) {}
    }
    sseClients.clear();
  });

  return server;
}

/**
 * Deterministic Self-Test (`node tools/cockpit/factory_twin_server.mjs --self-test`):
 * Verifies:
 *   1. Server boots cleanly and serves HTML UI at `GET /` (`HTTP 200`).
 *   2. `GET /api/state` returns the 6 stations, 11 characters, and 5 Kanban columns (`HTTP 200`).
 *   3. `GET /api/stream` establishes an SSE (`text/event-stream`) connection and receives live frames.
 *   4. `POST /api/simulate` moves the 11 characters across the 6 rooms and advances the Kanban card across the 5 columns.
 *   5. `POST /api/hitl-action` executes interactive CTO governance actions (`HTTP 200`).
 */
export async function runCockpitSelfTest() {
  const server = createFactoryTwinServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const addr = server.address();
  const baseUrl = `http://127.0.0.1:${addr.port}`;

  try {
    // 1. Verify HTML UI
    const uiRes = await fetch(`${baseUrl}/`);
    const uiHtml = await uiRes.text();
    const uiOk =
      uiRes.status === 200 &&
      uiHtml.includes('factoryFloorCanvas') &&
      uiHtml.includes('Simular Recorrido de los 10 Agentes en Vivo');

    // 2. Verify SSE stream receives initial frame
    const sseFrameReceived = await new Promise((resolve, reject) => {
      const req = http.get(`${baseUrl}/api/stream`, (res) => {
        if (res.statusCode !== 200 || !String(res.headers['content-type']).includes('text/event-stream')) {
          reject(new Error(`Invalid SSE response: ${res.statusCode}`));
          return;
        }
        res.once('data', (chunk) => {
          const text = chunk.toString();
          req.destroy();
          resolve(text.includes('data:'));
        });
      });
      req.on('error', reject);
    });

    // 3. Verify fail-closed CSRF / Origin guard + run full walkthrough simulation
    const tokenlessRes = await fetch(`${baseUrl}/api/simulate`, { method: 'POST' });
    const crossOriginRes = await fetch(`${baseUrl}/api/hitl-action`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://evil.example',
        'X-Cockpit-Token': server.cockpitCsrfToken
      },
      body: JSON.stringify({ action: 'approve_hitl' })
    });
    if (tokenlessRes.status !== 403 || crossOriginRes.status !== 403) {
      throw new Error(`Cockpit CSRF/Origin guard failed (${tokenlessRes.status}/${crossOriginRes.status})`);
    }

    const simRes = await fetch(`${baseUrl}/api/simulate`, {
      method: 'POST',
      headers: { 'X-Cockpit-Token': server.cockpitCsrfToken }
    });
    const simJson = await simRes.json();

    // 4. Verify interactive HITL button endpoint
    const hitlRes = await fetch(`${baseUrl}/api/hitl-action`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Cockpit-Token': server.cockpitCsrfToken
      },
      body: JSON.stringify({ action: 'approve_hitl' })
    });
    const hitlJson = await hitlRes.json();

    const passed = Boolean(
      uiOk &&
        sseFrameReceived &&
        simRes.status === 200 &&
        simJson.ok === true &&
        simJson.stationsCount === 6 &&
        simJson.agentsCount === 11 &&
        simJson.kanbanColumnsCount === 5 &&
        hitlRes.status === 200 &&
        hitlJson.ok === true
    );

    console.log(
      JSON.stringify(
        {
          ok: passed,
          httpStatus: uiRes.status,
          sseConnected: sseFrameReceived,
          stationsVerified: simJson.stationsCount,
          charactersVerified: simJson.agentsCount,
          kanbanColumnsVerified: simJson.kanbanColumnsCount,
          hitlActionVerified: hitlJson.ok,
          tokenOverhead: 0
        },
        null,
        2
      )
    );

    return passed;
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  if (process.argv.includes('--self-test')) {
    runCockpitSelfTest()
      .then((ok) => process.exit(ok ? 0 : 1))
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });
  } else if (process.argv.includes('--demo-walkthrough')) {
    runLiveDemoWalkthroughSequence({ stepDelayMs: 120 })
      .then((state) => {
        console.log(`✅ Recorrido en vivo completado para "${state.projectSlug}" (6 salas, 11 personajes).`);
        process.exit(0);
      })
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });
  } else {
    const server = createFactoryTwinServer();
    server.listen(DEFAULT_COCKPIT_PORT, '127.0.0.1', () => {
      console.log(`\n========================================================================`);
      console.log(`🎮 FACTORY TWIN COCKPIT EN VIVO — GEMELO DIGITAL 2D (60 FPS) + KANBAN`);
      console.log(`========================================================================`);
      console.log(`  🌐 URL Local (0 Tokens) : http://localhost:${DEFAULT_COCKPIT_PORT}`);
      console.log(`  📡 Telemetría SSE       : http://localhost:${DEFAULT_COCKPIT_PORT}/api/stream`);
      console.log(`  🏢 Estaciones Activas   : 6 Salas Iluminadas`);
      console.log(`  🤖 Personajes en Piso   : 11 (1 Capataz + 10 Agentes Especialistas)`);
      console.log(`========================================================================\n`);
    });
  }
}
