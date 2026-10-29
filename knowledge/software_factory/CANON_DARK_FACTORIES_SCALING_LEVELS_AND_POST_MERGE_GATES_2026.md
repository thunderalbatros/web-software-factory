---
title: "CANON: Dark Factories 6 Scaling Levels, Post-Merge Smoke Gates, inspect_ai Circuit Breakers & mini-swe-agent Fast-Path (2026)"
domain: "software_factory"
tier: "TIER_1_SOTA_2026"
sources:
  - "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
  - "https://github.com/varun1505/awesome-software-factories"
  - "https://github.com/camplight/awesome-software-factories"
  - "https://github.com/jerelvelarde/awesome-agent-factories"
  - "https://github.com/SWE-agent/mini-swe-agent"
  - "https://github.com/UKGovernmentBEIS/inspect_ai"
updated_at: "2026-10-28"
---

# CANON: Dark Factories 6 Scaling Levels, Post-Merge Smoke Gates, `inspect_ai` Circuit Breakers & `mini-swe-agent` Fast-Path (2026)

## 1. Los 6 Niveles de Escalado de Software Factories (`FlorianBruniaux/claude-code-ultimate-guide`)

Toda fábrica de software agéntica evoluciona a través de **6 Niveles de Madurez Operativa** gobernados por compuertas deterministas:

| Nivel | Nombre del Nivel | Arquitectura de Control | Compuerta de Calidad Dominante |
| :--- | :--- | :--- | :--- |
| **Nivel 1** | **Asistente Interactivo Individual** | Chat sincrónico turno a turno sin memoria persistente. | Revisión manual línea por línea del desarrollador. |
| **Nivel 2** | **Agente Gobernado por Reglas (`AGENTS.md` / `DESIGN.md`)** | Contexto constitucional caliente (`HOT`) + linters estáticos locales (`Oxc`). | Compuerta AST (`< 500ms`) y compilación limpia. |
| **Nivel 3** | **Flujo Spec-First (`OpenSpec` + `spec-kitty`)** | Prohibido codificar sin especificación previa (`SPEC.md` + matriz 1:1 `Requisito -> Tarea -> Test`). | Verificación `Fail-to-Pass (F2P)` y `Pass-to-Pass (P2P)`. |
| **Nivel 4** | **Orquestación Multi-Agente Aislada (`Beads` + `Worktrees`)** | Grafo DAG `.agents/beads/task_graph.jsonl` con bloqueo explícito de archivos (`fileLocks`) y sandboxes efímeros (`HybridAgentSandbox`). | Cero colisiones paralelas de escritura y Separación Creador vs. Verificador Ciego. |
| **Nivel 5** | **Enrutamiento de Profundidad Adaptativa (`SWE-AF` + `HumanLayer RPI`)** | Clasificación automática en 3 carriles (`LANE_1_FAST_PATH`, `LANE_2_STANDARD_BUILD`, `LANE_3_DEEP_ARCHITECTURE`) y doble compuerta HITL en tickets post-venta. | Cortacircuitos duros (`inspect_ai`) + `Braintrust Autoevals` (`100.0/100.0`). |
| **Nivel 6** | **Dark Factory Multi-Proyecto con Auto-Evolución y Post-Merge Gate** | Radar semanal (`tech_scout.mjs`), optimización `TextGrad/GEPA`, congelamiento criptográfico `Ed25519` (`agentvcs`) y verificación de humo post-fusión. | **Post-Merge Smoke & Integrity Gate** sobre el artefacto desplegado. |

### Regla de Compuerta Post-Merge (`Post-Merge Smoke & Integrity Gate` — `FlorianBruniaux`)
Pasar los tests pre-merge en una rama aislada es condición necesaria pero no suficiente. Todo flujo de empaquetado y despliegue (`package_and_deploy.yml`) **DEBE** ejecutar un chequeo de humo post-merge:
1. Verificar que el paquete autónomo (`deliverables/<slug>/<slug>-produccion.zip` y `dist/index.html`) exista y supere el umbral mínimo de integridad estructural (`> 512 bytes`, presencia de `<title>`, `<main` y cero marcadores de conflicto Git `<<<<<<<`).
2. Verificar que el manifiesto de cabeceras Edge (`_headers` o `worker/index.js`) conserve las invariantes Zero-Trust (`Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`).
3. Cuando el despliegue en Cloudflare Pages/Workers está activo, verificar respuesta `HTTP 200 OK` en la URL publicada antes de sellar el recibo de entrega.

---

## 2. Evidencia Industrial SDLC en Fábricas de Software (`camplight` / `varun1505` / `jerelvelarde`)

La síntesis de los directorios industriales `camplight/awesome-software-factories`, `varun1505/awesome-software-factories` y `jerelvelarde/awesome-agent-factories` establece cuatro leyes empíricas para evitar la degradación por *AI Slop*:

1. **Ley de Especificación Primero (`Spec-Driven Development`):**
   - Ningún agente de construcción puede abrir un sandbox sin una entrevista aprobada (`CLIENT_BRIEF_INTERVIEW.json` -> `SPEC.md`) en proyectos nuevos, o un **Reporte de Triaje + Especificación Delta (`OpenSpec`)** aprobado por el CTO en tickets post-venta.
2. **Ley de Separación Creador vs. Verificador Ciego (`Creator-Verifier Split`):**
   - El agente que escribe el código (`senior-coder` / `ux-designer`) tiene prohibido calificarse a sí mismo. La evaluación recae en un juez independiente de solo lectura (`blind_independent_reviewer.mjs` + suite sellada `.agents/sealed_envelope_evals/hidden_acceptance_suite.json`).
3. **Ley de Trazabilidad Atómica (`Beads` DAG):**
   - Cada requisito `[REQ-XX]` se mapea 1:1 a un nodo en `.agents/beads/task_graph.jsonl` con `fileLocks` explícitos. Si dos tareas comparten un archivo, se serializan automáticamente mediante aristas `blockedBy`.
4. **Ley de Presupuesto de Contexto Frío/Tibio/Caliente (`FinOps Context Budget`):**
   - El arranque `HOT + WARM` nunca debe superar los `3,500 tokens`. Toda consulta masiva a herramientas MCP mayores a `1,200 tokens` se vuelca automáticamente a `.cache/headroom_ccr/` (`Headroom CCR Reversible Compression`).

---

## 3. Cortacircuitos Deterministas de Seguridad y Costo (`UKGovernmentBEIS/inspect_ai`)

Inspirado en la arquitectura de contención de evaluaciones del **UK AI Safety Institute (`inspect_ai`)**, el plano de control (`factory.yaml` y `tools/orchestrator/humanlayer_rpi_gate.mjs`) impone **dos cortacircuitos duros innegociables**:

1. **`maxTurnsPerSubagent: 6` (`CIRCUIT_BREAKER_MAX_TURNS_EXCEEDED`):**
   - Ningún subagente delegado puede ejecutar más de **6 turnos consecutivos** sin devolver un artefacto verificable o escalar a la compuerta HITL del CTO. Esto erradica los bucles infinitos de ensayo-error y el consumo descontrolado de tokens.
2. **`maxTokensPerToolCall: 4000` (`CIRCUIT_BREAKER_MAX_TOOL_TOKENS_EXCEEDED`):**
   - Ninguna invocación individual a una herramienta o lectura de archivo puede inyectar más de **4,000 tokens crudos** en la ventana de contexto activa sin pasar por lectura quirúrgica (`<= 160 líneas`) o compresión reversible `Headroom CCR`.

---

## 4. Patrón de Ejecución Minimalista de 100 Líneas (`SWE-agent/mini-swe-agent`) en `LANE_1_FAST_PATH`

El proyecto **Princeton / Stanford `SWE-agent/mini-swe-agent`** demostró que para ajustes quirúrgicos (1 archivo, microcopy, tokens `OKLCH`, corrección puntual de estilo o bug localizado), los grafos multi-agente pesados añaden latencia sin mejorar la tasa de resolución.

En la Software Factory, el carril **`LANE_1_FAST_PATH`** implementa el bucle minimalista `runMiniSweFastPathLoop`:
1. ** Cero Debate Multi-Agente (`skipMultiAgentDebate: true`):** No convoca a `Claude Council` ni abre rondas de deliberación.
2. **1 Turno Directo de Lectura y Edición (`directTurnLimit: 1`):** Ejecuta en un único paso atómico la lectura/modificación quirúrgica del archivo bloqueado (`fileLocks`).
3. **Doble Guardia Instantánea (`< 500ms`):** Verifica inmediatamente el cambio contra el linter estático en Rust (`ast_guard.mjs` / `Oxlint`) y los cortacircuitos de `inspect_ai` (`maxTurnsPerSubagent: 6`, `maxTokensPerToolCall: 4000`), completando todo el ciclo en `< 15 segundos`.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SPLE_ISO26550_AND_SOFTWARE_FACTORIES_ARCHITECTURE_2026]] · [[CANON_ASTRO5_CLOUDFLARE_WORKERS_AND_MODERN_WEB_TEMPLATES_2026]] · [[CANON_MULTI_BRAND_DESIGN_SYSTEMS_DTCG_STYLE_DICTIONARY_AND_ARCHETYPES_2026]] · [[CANON_SOTA_AGENT_TEAM_TOPOLOGY_AND_2026_WEB_STACK_AUDIT]] · #software_factory
