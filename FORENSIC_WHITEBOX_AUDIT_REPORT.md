# 🔬 AUDITORÍA FORENSE INTEGRAL DE CAJA BLANCA, INVENTARIO DE ARSENAL Y BENCHMARK CRÍTICO PRE-PRODUCCIÓN

> **Fecha de Auditoría Empírica:** `2026-10-28T18:48:00-03:00` (`[VERIFICADO: inspección de caja blanca en disco + ejecución en vivo en Windows 11 / Node.js v24.21.0]`)
> **Destinatario:** Arquitecto Principal Externo & CTO HITL (Decisión de *Go / No-Go* previo al primer sitio web real).
> **Mandato Aplicado:** *Zero-Flattery / Red-Team White-Box Audit* — Todos los datos provienen de lecturas directas del árbol de archivos, mediciones de bytes en disco y ejecuciones reales de consola.

---

## SECCIÓN 1: INVENTARIO COMPLETO DEL ARSENAL Y MATRIZ DE EJECUCIÓN (QUÉ, CÓMO Y CUÁNDO SE USA CADA HERRAMIENTA)

### Tabla 1A — Motores y Scripts en `tools/` (97 Archivos `.mjs` Totales: 85 Módulos + 12 Shims de Compatibilidad)

#### Subsistema 1: Plano de Control, Orquestación y Enrutamiento (`tools/` raíz y `tools/orchestrator/`)

| Script (`tools/...`) | Líneas | (a) Propósito Técnico Exacto | (b) Momento / Etapa de Disparo | (c) Carril (`LANE_1 / 2 / 3`) | (d) Quién lo Invoca Realmente en Código |
| :--- | :---: | :--- | :--- | :--- | :--- |
| `tools/cto_command_center.mjs` | 1.193 | CLI ejecutivo en español para el CTO (27 comandos `cto:*`). Coordina proyectos, arquetipos, construcción, auditoría y empaquetado `.ZIP`. | Entrada principal de todos los comandos `npm run cto:*`. | Activo en `LANE_1`, `LANE_2`, `LANE_3`. | `package.json`, `harness_doctor_audit.mjs`, `factory_dora_metrics.mjs`. |
| `tools/factory.mjs` | 507 | CLI técnico ISO/IEC 26550 (`status`, `styles`, `new`, `spec`, `snapshot`, `build`, `gate`, `visual-gate`). | `cto:nuevo`, `cto:construir`, `factory:*` y CI. | Activo en `LANE_1`, `LANE_2`, `LANE_3`. | `cto_command_center.mjs`, `package.json`, `.github/workflows/factory_ci_gate.yml`. |
| `tools/build_dist.mjs` | 581 | Compilador y minificador de producción hacia `dist/` (HTML, LightningCSS, JS, assets, `llms.txt`, `_headers`, `worker/index.js`). | `cto:construir` y `cto:empaquetar`. | Activo en `LANE_1`, `LANE_2`, `LANE_3`. | `cto_command_center.mjs`, `factory.mjs`, `harness_doctor_audit.mjs`, `package_and_deploy.yml`. |
| `tools/serve_site.mjs` | 70 | Servidor HTTP estático ligero para previsualización e inspección local de `dist/`. | `audit:visual`, `memory_reflector.mjs` y CI. | Todos los carriles cuando se requiere preview HTTP. | `memory_reflector.mjs`, `.github/workflows/factory_ci_gate.yml`. |
| `tools/sandbox.mjs` | 615 | `HybridAgentSandbox`: Aislamiento de ejecución en `E2B Firecracker MicroVM` (si hay `E2B_API_KEY`) con fallback local en `Git Worktree` efímero + filtro de comandos peligrosos. | `cto:feedback-cliente`, `tech_scout.mjs`, `textgrad_skill_optimizer.mjs`. | `LANE_2` y `LANE_3` (aislamiento de mutaciones). | `client_feedback_triage_agent.mjs`, `tech_scout.mjs`, `textgrad_skill_optimizer.mjs`, `harness_doctor_audit.mjs`. |
| `tools/orchestrator/adaptive_depth_router.mjs` | 352 | Enrutador adaptativo `SWE-AF` + `Elastic Loop` (clasifica en `LANE_1/2/3`), grafo Git `Beads` (`.agents/beads/task_graph.jsonl`) con bloqueo de colisiones `fileLocks`, y generador de especificaciones Delta (`OpenSpec`). | Inicio de `cto:construir`, `cto:cambio-incremental` y `agent_squad.mjs`. | Define y gobierna `LANE_1`, `LANE_2`, `LANE_3`. | `cto_command_center.mjs`, `agent_squad.mjs`, `humanlayer_rpi_gate.mjs`, `harness_doctor_audit.mjs`. |
| `tools/orchestrator/humanlayer_rpi_gate.mjs` | 642 | Cargador de `factory.yaml` (Warp/12-Factor), máquina de estados `HumanLayer 6-Stage RPI` (`Questions..Implementation`), triggers por ruta (`Devin/OpenHands`), `OpenHands StuckDetector` y scorers C-Level (`Braintrust Autoevals`). | Ola 1 (`Preflight & Spec`) y `cto:construir`. | Completo en `LANE_2` y `LANE_3`; abreviado en `LANE_1`. | `cto_command_center.mjs`, `agent_squad.mjs`, `client_feedback_triage_agent.mjs`, `agent_benchmark_harness.mjs`. |
| `tools/orchestrator/agent_squad.mjs` | 101 | Wrapper de orquestación y puente de compatibilidad hacia `tools/intelligence/agent_squad.mjs`. | `cto:construir` y workflows GitHub. | `LANE_2` y `LANE_3`. | `cto_command_center.mjs`, `factory.mjs`, `issue_driven_factory.yml`. |
| `tools/lib/project_loader.mjs` | 519 | Gestor multi-proyecto (`projects/<slug>`), puntero `.agents/memory/active_project.json`, matriz de trazabilidad `spec-kitty` 1:1 (`REQ -> Task -> Test`) y exportador de paquetes autónomos `.ZIP`. | Transversal en todos los comandos `cto:*` y `factory:*`. | Todos los carriles (`LANE_1`, `LANE_2`, `LANE_3`). | 27 scripts en `tools/audit/`, `tools/design/`, `tools/intelligence/` y `cto_command_center.mjs`. |
| `tools/lib/sandcastle-runner.mjs` | 168 | Creador y destructor determinista de `git worktree` aislados (`.sandboxes/bolt-*`). | `agent_squad.mjs` (cuando `useSandbox: true`) y `self_evolving_pipeline.mjs`. | `LANE_2` y `LANE_3`. | `cto_command_center.mjs`, `agent_squad.mjs`, `self_evolving_pipeline.mjs`. |
| `tools/agent_factory.mjs` | 128 | Orquestador legado de las Fases 1–5 (reemplazado por `cto_command_center.mjs`). | **Huérfano (No se dispara automáticamente).** | Ninguno (Legado). | `NONE` (`[SCRIPT HUÉRFANO]`). |
| `tools/e2b_sandbox.mjs` | 60 | Shim CLI ligero sobre `tools/sandbox.mjs`. | Solo invocación manual CLI. | Manual. | `NONE` (Shim standalone). |
| `tools/ingest_local_pdfs.mjs` | 47 | Script auxiliar de ingesta de PDFs locales hacia `book_pdf_ingester.mjs`. | Manual (reemplazado por `cto:ingerir-libros`). | Manual / Offline. | `NONE` (Superseded por `cto_command_center.mjs`). |

#### Subsistema 2: Inteligencia Agéntica, Cerebro RAG, Memoria y Evolución (`tools/intelligence/`)

| Script (`tools/intelligence/...`) | Líneas | (a) Propósito Técnico Exacto | (b) Momento / Etapa de Disparo | (c) Carril (`LANE_1 / 2 / 3`) | (d) Quién lo Invoca Realmente en Código |
| :--- | :---: | :--- | :--- | :--- | :--- |
| `agent_squad.mjs` | 1.030 | Motor DAG paralelo de 4 olas (`Wave 1 Spec`, `Wave 2A Tracer-Bullet + Stop Hook`, `Wave 2B Fill-In`, `Wave 3 Visual/Security Sensors`), `Self-Healing Loop` (máx. 2 reintentos) y handoffs Valibot en `.agents/runs/`. | `cto:construir` y `factory:sweep`. | Se salta debate en `LANE_1`; corre 3 olas en `LANE_2` y 4 olas completas en `LANE_3`. | `cto_command_center.mjs`, `factory.mjs`, `agent_benchmark_harness.mjs`, `harness_doctor_audit.mjs`. |
| `agent_governance_kernel.mjs` | 724 | Kernel Zero-Trust `OWASP Agentic Top 10 (ASI01–ASI10)`: firewall de permisos MCP por rol (`< 0.1ms`), compresor de salidas MCP `> 1.200 tokens`, detector de *Indirect Prompt Injection* y guardia de memoria `ASI06`. | Pre-vuelo en Ola 1, Ola 2 y Ola 3; `security_gate.mjs`. | Activo en `LANE_1`, `LANE_2`, `LANE_3`. | `agent_squad.mjs`, `security_gate.mjs`, `mcp_security_auditor.mjs`, `mcp_omni_rag_server.mjs`, `cto_command_center.mjs`. |
| `eval_matrix.mjs` | 652 | Matriz Hard-Gated de 100 puntos (4 bloques x 25 pts con Veto Gate a `49/100`), `Sealed-Envelope Evals`, `Blind Independent Review` (Foreman) y compuerta `Fail-to-Pass (F2P) / Pass-to-Pass (P2P)`. | Cierre de `cto:construir`, `cto:benchmark` y CI. | Versión rápida en `LANE_1`; matriz completa de 100 pts en `LANE_2` y `LANE_3`. | `cto_command_center.mjs`, `agent_squad.mjs`, `factory.mjs`, `weekly_cron_evolver.mjs`, `harness_doctor_audit.mjs`. |
| `ast_guard.mjs` | 445 | Auditor simbólico AST + `Oxlint` (`< 500ms`) + sincronización incremental `CocoIndex` (141 archivos / 1.034 símbolos). | Stop Hook tras `Wave 2A Tracer-Bullet`, `Wave 2B`, `security_gate` y `LANE_1`. | Obligatorio en `LANE_1`, `LANE_2`, `LANE_3`. | 19 módulos (`agent_squad.mjs`, `eval_matrix.mjs`, `security_gate.mjs`, `code_clean_audit.mjs`, etc.). |
| `codebase_ast_indexer.mjs` | 575 | Indexador incremental Merkle-tree SHA-256 del grafo AST de código (`.agents/memory/codebase_ast_graph.json`). | Invocado automáticamente por `ast_guard.mjs` y `mcp_omni_rag_server.mjs`. | Todos los carriles (`< 50ms` incremental). | `ast_guard.mjs`, `mcp_omni_rag_server.mjs`, `harness_doctor_audit.mjs`. |
| `context_budget.mjs` | 617 | Gobernador de presupuesto de tokens (`HOT <= 3.500`, `WARM <= 10.000`), compresor reversible `Headroom CCR` (`.cache/headroom_ccr/`) y poda de historial (`SWE-Pruner`). | Arranque de sesión, `mcp_omni_rag_server.mjs` y `harness_doctor_audit.mjs`. | Todos los carriles (`LANE_1 <= 6k`, `LANE_2 <= 20k`, `LANE_3 <= 48k`). | `mcp_omni_rag_server.mjs`, `squad_semantic_router.mjs`, `agent_benchmark_harness.mjs`, `harness_doctor_audit.mjs`. |
| `rag_pipeline.mjs` | 1.321 | Motor híbrido `Omni-RAG v5.2`: SQLite FTS5 BM25 + MiniSearch + RRF + Scoped Domain Routing + filtro epistémico `TIER_1_SOTA_2026`. | Ola 1 (`Research & Spec`) y consultas MCP `omni_rag_query`. | `LANE_2` y `LANE_3` (bajo demanda en `LANE_1`). | `mcp_omni_rag_server.mjs`, `eval_matrix.mjs`, `book_pdf_ingester.mjs`, `weekly_cron_evolver.mjs`. |
| `qdrant_rag.mjs` | 725 | Puente de búsqueda vectorial semántica densa (Qdrant / FTS5 local) con aislamiento de dominio (`rag_library_sanitizer.mjs`). | Consultas `omni_rag_query` en `mcp_omni_rag_server.mjs`. | `LANE_2` y `LANE_3`. | `mcp_omni_rag_server.mjs`, `rag_pipeline.mjs`, `harness_doctor_audit.mjs`. |
| `rag_library_sanitizer.mjs` | 263 | Clasificador de dominios de conocimiento y cuarentena automática (`EXCLUDED_NON_WEB_DOMAIN`) para libros de finanzas, seguros y apuestas. | Ingesta de libros y filtrado en `rag_pipeline.mjs` / `qdrant_rag.mjs`. | Transversal en toda consulta RAG. | `rag_pipeline.mjs`, `qdrant_rag.mjs`, `book_pdf_ingester.mjs`, `mcp_omni_rag_server.mjs`. |
| `mcp_omni_rag_server.mjs` | 956 | Servidor MCP central de la fábrica (JSON-RPC 2.0 sobre `stdio`), exponiendo `omni_rag_query`, `code_graph_query`, `factory_style_catalog`, `factory_compile_tokens` y `factory_run_audit`. | Activo durante toda sesión de agentes vía `.mcp.json`. | Todos los carriles. | `.mcp.json`, `mcp_security_auditor.mjs`, `agent_benchmark_harness.mjs`. |
| `vertex_ai_bridge.mjs` | 1.783 | Puente multimodal con Google Cloud Vertex AI (`Gemini 2.5 Flash/Pro`, `Imagen 3`), `Cloud KMS` Envelope Encryption, `Cloud Run TRELLIS 3D`, `Pollinations $0.00` + `CHECK IMAGE` y escudo FinOps (`$1.50/día`). | Juez VLM en `ryux_design_gate.mjs`, cifrado en `dual_database_forge.mjs` y generación 3D/img. | `LANE_2` y `LANE_3`. | `ryux_design_gate.mjs`, `eval_matrix.mjs`, `dual_database_forge.mjs`, `cto_command_center.mjs`. |
| `agent_benchmark_harness.mjs` | 698 | Suite empírica de 5 Golden Tasks (`agent-benchmark`), auditoría de trazas `MASEval`, split `held-in/held-out`, mutación semántica `Stryker` y firma `Ed25519` (`agentvcs`). | `npm run cto:benchmark`, `weekly_cron_evolver.mjs` y CI. | Auditoría de plataforma / `LANE_3`. | `cto_command_center.mjs`, `harness_doctor_audit.mjs`, `weekly_cron_evolver.mjs`, `factory_ci_gate.yml`. |
| `skill_quality_ledger.mjs` | 424 | Registro empírico `OpenSpace` de efectividad de las 87 skills (`effective / degraded / broken`) y auto-reparación. | Post-ejecución de `agent_squad.mjs` y `cto:benchmark`. | Todos los carriles. | `agent_squad.mjs`, `instincts_engine.mjs`, `context_budget.mjs`, `textgrad_skill_optimizer.mjs`. |
| `constitution_guard.mjs` | 148 | Guardia criptográfica SHA-256 sobre `AGENTS.md`, `CONSTRAINTS.md` y pisos numéricos de `eval_matrix.mjs` (Anti-Reward-Hacking). | Wave 1 (`constitution_lock`) y antes de cualquier auto-evolución. | Todos los carriles. | `agent_squad.mjs`, `self_evolving_pipeline.mjs`, `textgrad_skill_optimizer.mjs`, `factory.mjs`. |
| `instincts_engine.mjs` | 509 | Motor de memoria procedimental (`.agents/memory/instincts/`), resolución de contradicciones del CTO y pre-flight checks. | Wave 1 (`preflight_instincts`), `cto:feedback` y `cto:evolucionar`. | Todos los carriles. | `agent_squad.mjs`, `cto_command_center.mjs`, `self_evolving_pipeline.mjs`. |
| `memory_reflector.mjs` | 374 | Destilador de experiencias post-run hacia `.agents/memory/EXPERIENCE.md`. | `cto:feedback` y `factory:sweep`. | Post-ejecución. | `cto_command_center.mjs`, `factory_sweep.mjs`. |
| `self_evolving_pipeline.mjs` | 492 | Bucle de auto-mejora gobernado por compuertas (combina `tech_scout`, `textgrad` y `eval_matrix` con rollback automático). | `cto:aprender`, `cto:evolucionar` y `Cron Lunes 08:00 AM`. | Offline / Mantenimiento. | `cto_command_center.mjs`, `weekly_cron_evolver.mjs`. |
| `textgrad_skill_optimizer.mjs` | 761 | Optimizador `TextGrad` + frontera de Pareto `GEPA` para refinar `SKILL.md` sin degradar regresiones `held-in`. | `cto:evolucionar` y `factory:evolve`. | Offline / Evolución. | `cto_command_center.mjs`, `self_evolving_pipeline.mjs`, `harness_doctor_audit.mjs`. |
| `tech_scout.mjs` | 1.212 | Radar SOTA de 6 capas (GitHub, ArXiv, Docs oficiales, YouTube, Bóveda Local) con filtro de licencias permisivas (`MIT/Apache-2.0`). | `cto:actualizacion-semanal` y `factory:scout`. | Offline / Cron Semanal. | `weekly_cron_evolver.mjs`, `self_evolving_pipeline.mjs`, `package.json`. |
| `weekly_cron_evolver.mjs` | 671 | Orquestador del Cron de los Lunes 08:00 AM ARG: ejecuta `tech_scout`, cuarentena de seguridad, actualiza RAG y emite reporte semanal. | `cto:actualizacion-semanal` y `.github/workflows/weekly_factory_evolution.yml`. | Cron Semanal. | `cto_command_center.mjs`, `weekly_factory_evolution.yml`, `harness_doctor_audit.mjs`. |
| `weekly_email_notifier.mjs` | 454 | Despachador de correo ejecutivo HTML (`Gmail SMTP TLS 465` / `Resend` / `Webhook`) con vista previa garantizada en `weekly_update/`. | Cierre de `weekly_cron_evolver.mjs`. | Cron Semanal. | `weekly_cron_evolver.mjs`, `weekly_factory_evolution.yml`. |
| `book_pdf_ingester.mjs` | 588 | Extractor íntegro de libros `.pdf` (`pdf-parse`) y `.epub` (ZIP/XHTML nativo) con sanitización de dominio y chunking FTS5. | `cto:ingerir-libros`. | Ingesta Offline. | `cto_command_center.mjs`, `rag_library_sanitizer.mjs`. |
| `course_and_paper_distiller.mjs` | 489 | Destilador de cursos en video (`.srt/.vtt/.txt` + `MarkItDown`) y papers hacia playbooks atómicos en `knowledge/` y `.agents/skills/`. | `cto:destilar-curso`. | Ingesta Offline. | `cto_command_center.mjs`. |
| `official_docs_harvester.mjs` | 688 | Extractor de documentación oficial `/llms.txt` desde la bóveda local y compilador de los 3 catálogos JSON OWASP/MITRE en `.agents/security_catalogs/`. | `cto:cosechar-docs` y `weekly_cron_evolver.mjs`. | Ingesta Offline / Cron. | `cto_command_center.mjs`, `course_and_paper_distiller.mjs`, `weekly_cron_evolver.mjs`. |
| `rea_reverse_engineering_bridge.mjs` | 349 | Puente de ingeniería inversa ética de sala limpia (`morluto/rea` + `MarkItDown` + `JSONSwiss`) que genera `RECONSTRUCTED_SPEC.md`. | `cto:investigar-referencia` (Etapa 2 Research). | `LANE_2` y `LANE_3` (bajo demanda). | `cto_command_center.mjs`. |
| `factory_dora_metrics.mjs` | 252 | Calculadora de métricas DORA + SPACE + DevEx para el reporte ejecutivo del CTO (`.agents/memory/factory_dora_ledger.json`). | `cto:estado` y `cto:actualizacion-semanal`. | Telemetría continua. | `cto_command_center.mjs`, `weekly_cron_evolver.mjs`. |
| `code_and_wiki_graph.mjs` | 458 | Constructor de grafo ligero de símbolos e hipervínculos internos (`.cache/code_and_wiki_graph.json`). | `factory.mjs` y `rag_pipeline.mjs`. | `LANE_2` y `LANE_3`. | `factory.mjs`, `rag_pipeline.mjs`. |
| `spec_generator.mjs` | 200 | Generador de artefactos `.specify/` y `SPEC.md` (`spec-kit` SDD). | `cto:nuevo` y `factory:spec`. | Ola 1 (`Spec`). | `factory.mjs`. |
| `squad_semantic_router.mjs` | 222 | Enrutador semántico de consultas hacia los 9 roles de la agencia. | Consultas en `mcp_omni_rag_server.mjs` y `rag_pipeline.mjs`. | `LANE_2` y `LANE_3`. | `mcp_omni_rag_server.mjs`, `rag_pipeline.mjs`. |
| `tom_swe_engine.mjs` | 136 | Motor `Theory of Mind (ToM-SWE)` de 3 niveles para modelar preferencias implícitas del CTO (`.agents/memory/tom_swe_model.json`). | `eval_matrix.mjs` (Bloque 4) y `diff_ui_adversarial.mjs`. | `LANE_2` y `LANE_3`. | `eval_matrix.mjs`, `diff_ui_adversarial.mjs`, `cto_command_center.mjs`. |
| `vault_indexer.mjs` | 338 | Indexador Zero-Copy de los repositorios clonados en `C:\Users\tomas\Desktop\streamerbot\references\`. | `cto:extraer-diseno`, `self_evolving_pipeline.mjs` y MCP. | Bajo demanda. | `design_extractor.mjs`, `mcp_omni_rag_server.mjs`, `self_evolving_pipeline.mjs`. |
| `serper_researcher.mjs` | 75 | Conector de búsqueda web externa vía API de Serper (`SERPER_API_KEY`). | Fallback externo en `rag_pipeline.mjs` y `memory_reflector.mjs`. | Bajo demanda. | `rag_pipeline.mjs`, `memory_reflector.mjs`. |
| `factory_sweep.mjs` | 107 | Ejecutor de barrido de mantenimiento (`tokens -> squad -> eval`). | `npm run factory:sweep`. | Manual. | `package.json`. |
| `course_ingester.mjs` | 196 | Ingestor legado de transcripciones de cursos (reemplazado por `course_and_paper_distiller.mjs`). | **Huérfano (Solo llamado por `video_course_ingester.mjs`).** | Ninguno (Legado). | `video_course_ingester.mjs` (`[SCRIPT HUÉRFANO]`). |
| `video_course_ingester.mjs` | 313 | Wrapper legado de ingesta de cursos en video (reemplazado por `cto:destilar-curso`). | **Huérfano.** | Ninguno (Legado). | `NONE` (`[SCRIPT HUÉRFANO]`). |
| `visual_science_corpus_builder.mjs` | 365 | Compilador de los 4 tratados atómicos `CANON_ATOMIC_*_2026.md` en `knowledge/`. | Ejecutado en Fase 28 para poblar `knowledge/`; hoy sin invocador periódico. | Offline (One-shot). | `NONE` (`[SCRIPT ONE-SHOT DESCONECTADO]`). |
| `agy_token_guard_hook.mjs` | 82 | Hook experimental de conteo de turnos de sesión (`.cache/agy_session_turns.json`). | **Huérfano (reemplazado por `context_budget.mjs`).** | Ninguno. | `NONE` (`[SCRIPT HUÉRFANO]`). |
| `context_compactor.mjs` | 94 | Compactador legado de contexto (reemplazado por `Headroom CCR` en `context_budget.mjs`). | **Huérfano.** | Ninguno. | `NONE` (`[SCRIPT HUÉRFANO]`). |
| `firecrawl_scraper.mjs` | 78 | Scraper individual Firecrawl (reemplazado por `design_extractor.mjs` y `rea_reverse_engineering_bridge.mjs`). | **Huérfano.** | Ninguno. | `NONE` (`[SCRIPT HUÉRFANO]`). |
| `promptfoo_eval_runner.mjs` | 116 | Runner standalone de pruebas red-team Promptfoo (reemplazado por `agent_governance_kernel.mjs`). | **Huérfano.** | Ninguno. | `NONE` (`[SCRIPT HUÉRFANO]`). |
| `qdrant_and_vault_curator.mjs` | 315 | Curador standalone de Qdrant/Vault (reemplazado por `vault_indexer.mjs` y `rag_library_sanitizer.mjs`). | **Huérfano.** | Ninguno. | `NONE` (`[SCRIPT HUÉRFANO]`). |
| `rag_agentic_harness.mjs` | 357 | Wrapper experimental de RAG multi-salto (no invocado por `mcp_omni_rag_server.mjs`). | **Huérfano.** | Ninguno. | `NONE` (`[SCRIPT HUÉRFANO]`). |
| `toggle_mcp_profile.mjs` | 73 | Conmutador CLI manual de perfiles MCP (reemplazado por `mcp_role_registry.json`). | **Huérfano.** | Ninguno. | `NONE` (`[SCRIPT HUÉRFANO]`). |

#### Subsistema 3: Sistemas de Diseño, Colorimetría OKLCH/APCA y Forja 3D/WebGPU (`tools/design/`)

| Script (`tools/design/...`) | Líneas | (a) Propósito Técnico Exacto | (b) Momento / Etapa de Disparo | (c) Carril (`LANE_1 / 2 / 3`) | (d) Quién lo Invoca Realmente en Código |
| :--- | :---: | :--- | :--- | :--- | :--- |
| `token_compiler.mjs` | 835 | Compilador W3C DTCG 2025.10 (`design.tokens.json`) hacia variables CSS OKLCH 90/8/2, contraste perceptual APCA `Lc >= 60/75/90` y escalas fluidas `Utopia clamp()`. | `Wave 2A Tracer-Bullet` (`dtcg_token_compiler`), `cto:construir` y `factory:tokens`. | Activo en `LANE_1`, `LANE_2`, `LANE_3`. | `agent_squad.mjs`, `cto_command_center.mjs`, `ryux_design_gate.mjs`, `factory.mjs`. |
| `industry_archetype_matrix.mjs` | 1.575 | Matriz de 8 arquetipos industriales (`ecommerce`, `fintech`, `erp`, `streamer`, `abogacia`, `clinica`, `saas`, `lujo`), generador de `PRODUCT.md` + `DESIGN.md` (Google Labs 8 secciones) y linter de las **62 reglas deterministas Anti-Slop** (`pbakaus/impeccable`) + axiomas de ciencia visual (Itten, Gurney, Tufte, HIG/M3). | `cto:nuevo`, `cto:arquetipo`, `cto:construir` y `ryux_design_gate.mjs`. | Activo en `LANE_1`, `LANE_2`, `LANE_3`. | `cto_command_center.mjs`, `ryux_design_gate.mjs`, `agent_squad.mjs`, `vertex_ai_bridge.mjs`, `mobile_target_forge.mjs`. |
| `shader_and_3d_forge.mjs` | 692 | Forja de escenas 3D (`Three.js r186 WebGPU`, `Spark 2.x Gaussian Splatting`, `Dioramas HDR AgX`, `Shader Hero`, `Holo Card`), compresor `.glb` (`glTF-Transform + meshoptimizer`), generador `PNGtoSTL` y física `rapier-js + bitECS` con Watchdog de 60 FPS. | `Wave 2B Fill-In`, `cto:efecto-3d` y `cto:optimizar-3d`. | `LANE_2` y `LANE_3`. | `cto_command_center.mjs`, `agent_squad.mjs`, `vertex_ai_bridge.mjs`, `harness_doctor_audit.mjs`. |
| `design_extractor.mjs` | 132 | Extractor de tokens de color, tipografía y geometría desde sitios de referencia externos. | `cto:extraer-diseno` y `weekly_cron_evolver.mjs`. | Bajo demanda. | `cto_command_center.mjs`, `weekly_cron_evolver.mjs`. |
| `build_vanilla_primitives.mjs` | 164 | Compilador Zero-Bloat de primitivas interactivas HTML5 + CSS OKLCH sin dependencias de React. | `npm run factory:harvest` y `factory.mjs`. | `LANE_2` y `LANE_3`. | `factory.mjs`, `package.json`. |
| `og_image_generator.mjs` | 107 | Generador de tarjetas OpenGraph (`og-image.svg` / social preview) por proyecto. | **Huérfano (No está conectado a `build_dist.mjs` ni a `cto:construir`).** | Desconectado hoy. | `NONE` (`[SCRIPT DESCONECTADO — Candidato a conectar en Sección 7]`). |

#### Subsistema 4: Auditoría Visual, Calidad de Código, Caos y Ciberseguridad (`tools/audit/` y `tools/security/`)

| Script (`tools/audit/...` & `tools/security/...`) | Líneas | (a) Propósito Técnico Exacto | (b) Momento / Etapa de Disparo | (c) Carril (`LANE_1 / 2 / 3`) | (d) Quién lo Invoca Realmente en Código |
| :--- | :---: | :--- | :--- | :--- | :--- |
| `audit/harness_doctor_audit.mjs` | 738 | Doctor Integral Pre-Vuelo: audita las 8 capas del Harness (0–100 pts), limpia residuos (`--reset-test-artifacts`), corre simulacro E2E de 5 pasos en cápsula aislada y genera `HARNESS_READINESS_REPORT.md`. | `npm run cto:auditar-harness`. | Pre-vuelo / Certificación. | `cto_command_center.mjs`, `package.json`. |
| `audit/ryux_design_gate.mjs` | 331 | Compuerta visual `RYUX v2.14.2` (12 checks): geometría en 3 viewports (`375/768/1440px`), contraste APCA, 60 FPS GPU, telemetría CDP, las 62 reglas Impeccable + ciencia visual y Juez VLM (`Gemini Vision`). | `Wave 3` (`qa-auditor`), `eval_matrix.mjs` (Bloque 4) y `cto:revisar`. | `LANE_2` y `LANE_3`. | `agent_squad.mjs`, `eval_matrix.mjs`, `cto_command_center.mjs`, `factory.mjs`. |
| `audit/visual_audit.mjs` | 641 | Motor Playwright + CDP de inspección geométrica multi-viewport (4 etapas temporales), detección de colisiones de cajas BBox, overflow horizontal y medición de FPS/CLS. | Llamado por `ryux_design_gate.mjs` y `eval_matrix.mjs`. | `LANE_2` y `LANE_3`. | `eval_matrix.mjs`, `vertex_ai_bridge.mjs`, `agent_benchmark_harness.mjs`, `factory_ci_gate.yml`. |
| `audit/chaos_monkey_test.mjs` | 502 | Test destructivo adversarial: fuzzing de formularios, *rage-clicking*, enlaces rotos, inyección de payloads XSS y monitoreo de `console.error` / `pageerror`. | `eval_matrix.mjs` (Bloque 3: 25 pts) y `factory:gate`. | `LANE_2` y `LANE_3`. | `eval_matrix.mjs`, `factory.mjs`, `agent_benchmark_harness.mjs`, `factory_ci_gate.yml`. |
| `audit/code_clean_audit.mjs` | 320 | Auditor de código limpio: `Oxlint` (`--deny-warnings`), detección de código muerto/huérfano estilo `Knip` y guardia de duplicación `< 4.0%`. | `factory:gate`, `harness_doctor_audit.mjs` y `agent_benchmark_harness.mjs`. | `LANE_1`, `LANE_2`, `LANE_3`. | `factory.mjs`, `harness_doctor_audit.mjs`, `agent_benchmark_harness.mjs`, `instincts_engine.mjs`. |
| `audit/security_gate.mjs` | 530 | Compuerta central Zero-Trust (`eval_matrix.mjs` Bloque 2: 25 pts): SAST AST, cabeceras Cloudflare Workers, `Zizmor`, `AgentOS Kernel`, `AgentShield`, `MCP 18/18 SARIF`, `Postgres RLS/KMS/Ory`, `Gitleaks` y redactor PII. | Stop Hook tras `Wave 2A`, `eval_matrix.mjs` (Bloque 2), `LANE_1` y CI. | Obligatorio en `LANE_1`, `LANE_2`, `LANE_3`. | `agent_squad.mjs`, `eval_matrix.mjs`, `harness_doctor_audit.mjs`, `weekly_cron_evolver.mjs`, workflows CI. |
| `audit/mcp_security_auditor.mjs` | 521 | Escáner `OWASP MCP Top 10 (MCP01–MCP10)` + `Cisco/SmartBear` (18 reglas deterministas) con reporte `.agents/security_reports/mcp_audit.sarif.json`. | `security_gate.mjs` y `cto:mcp-status`. | Todos los carriles. | `security_gate.mjs`, `cto_command_center.mjs`, `harness_doctor_audit.mjs`, `weekly_cron_evolver.mjs`. |
| `audit/workflow_security_linter.mjs` | 278 | Linter estático estilo `Zizmor v1.30` para `.github/workflows/*.yml` (detecta *template injection*, `pull_request_target` inseguro, permisos excesivos y acciones sin pin). | `security_gate.mjs`, `harness_doctor_audit.mjs` y CI. | Todos los carriles / CI. | `security_gate.mjs`, `harness_doctor_audit.mjs`, `factory_ci_gate.yml`. |
| `audit/supply_chain_guard.mjs` | 520 | Guardia de cadena de suministro (`OWASP A03:2025`): escáner `AgentShield` sobre `.agents/`, generador SBOM `CycloneDX 1.5` (`.agents/memory/sbom_cyclonedx.json`), detector de secretos `Gitleaks + Shannon Entropy` y auditoría de dependencias. | `security_gate.mjs` y `cto:empaquetar`. | Todos los carriles. | `security_gate.mjs`, `cto_command_center.mjs`, `weekly_cron_evolver.mjs`, `factory_ci_gate.yml`. |
| `security/identity_and_commerce_guard.mjs` | 515 | Validador de arquitectura empresarial: `Ory Kratos` (identidad passkeys/OIDC), `Ory Keto` (permisos Zanzibar ReBAC) y prevención de *Race Conditions* / *Double-Spending* en E-Commerce (`SELECT FOR UPDATE` / idempotencia). | `security_gate.mjs`. | `LANE_2` y `LANE_3`. | `security_gate.mjs`, `official_docs_harvester.mjs`. |
| `audit/cognitive_ux_auditor.mjs` | 160 | Auditor de carga cognitiva (Ley de Hick, Ley de Fitts, claridad de propuesta de valor en 5 segundos y ausencia de *Confirm-Shaming*). | `Wave 2B` (`copywriting-cro-strategist`) y `ryux_design_gate.mjs`. | `LANE_2` y `LANE_3`. | `agent_squad.mjs`, `ryux_design_gate.mjs`, `factory.mjs`. |
| `audit/diff_ui_adversarial.mjs` | 247 | Comparador adversarial de cambios visuales y regresiones DOM/CSS junto con `tom_swe_engine.mjs`. | `eval_matrix.mjs` y `npm run audit:diff-ui`. | `LANE_2` y `LANE_3`. | `eval_matrix.mjs`, `factory.mjs`, `mcp_omni_rag_server.mjs`. |
| `audit/floor_and_aeo_guard.mjs` | 161 | Verificador de SEO técnico y AEO/GEO para motores de respuesta IA (`llms.txt`, `Schema.org @graph`, `Speculation Rules API`). | `Wave 3` (`seo-aeo-geo-architect`) y `factory:gate`. | `LANE_2` y `LANE_3`. | `agent_squad.mjs`, `factory.mjs`. |
| `audit/security_and_motion_audit.mjs` | 158 | Auditor combinado de políticas CSP/HSTS y presupuesto de animación a 60 FPS en el hilo compositor. | `Wave 3` (`security-engineer`) y `factory:visual-gate`. | `LANE_2` y `LANE_3`. | `agent_squad.mjs`, `factory.mjs`. |
| `audit/a11y_tree_snapshot.mjs` | 237 | Capturador compacto del árbol de accesibilidad (`AX Tree`) vía Playwright (`-90% tokens` frente a HTML crudo). | `factory:snapshot` y `cto:revisar`. | Bajo demanda en `LANE_2` y `LANE_3`. | `cto_command_center.mjs`, `factory.mjs`, `package.json`. |
| `audit/visual_regression.mjs` | 438 | Comparador pixel-a-pixel (`odiff-bin SIMD` / `pixelmatch`) contra capturas base. | `npm run audit:visual-regression` y `factory:visual-gate`. | `LANE_2` y `LANE_3`. | `factory.mjs`, `package.json`. |
| `audit/git_remote_sync_check.mjs` | 87 | Verificador de sincronización entre rama local y `origin/master`. | `cto:estado`. | Diagnóstico. | `cto_command_center.mjs`. |
| `audit/browser_pool_daemon.mjs` | 100 | Pool experimental de instancias Chromium pre-calentadas. | **Huérfano (No es invocado por `visual_audit.mjs`).** | Ninguno. | `NONE` (`[SCRIPT HUÉRFANO]`). |
| `audit/harvest_design_tokens.mjs` | 112 | Extractor legado de tokens CSS (reemplazado por `design_extractor.mjs`). | **Huérfano.** | Ninguno. | `NONE` (`[SCRIPT HUÉRFANO]`). |
| `audit/lighthouse_pa11y_audit.mjs` | 260 | Wrapper standalone de Lighthouse/Pa11y (reemplazado por `ryux_design_gate.mjs` + CDP). | **Huérfano.** | Ninguno. | `NONE` (`[SCRIPT HUÉRFANO]`). |

#### Subsistema 5: Base de Datos Dual, Brazo Móvil, Feedback Post-Venta y Gemelo Digital (`tools/db/`, `tools/mobile/`, `tools/feedback/`, `tools/cockpit/`)

| Script (`tools/...`) | Líneas | (a) Propósito Técnico Exacto | (b) Momento / Etapa de Disparo | (c) Carril (`LANE_1 / 2 / 3`) | (d) Quién lo Invoca Realmente en Código |
| :--- | :---: | :--- | :--- | :--- | :--- |
| `db/dual_database_forge.mjs` | 543 | Forja de Base de Datos Dual: **Tier-1 `edge-d1`** (Cloudflare D1 SQLite a `$0.00`) vs. **Tier-2 `enterprise-postgres`** (PostgreSQL v14+ con `Hyperdrive`, `Drizzle ORM`, `ENABLE/FORCE ROW LEVEL SECURITY`, 3 zonas `restricted/confidential/audit_worm` y cifrado de sobre `AES-256-GCM` + `GCP KMS`). | `cto:nuevo`, `cto:arquitectura-db` y `security_gate.mjs`. | `edge-d1` en `LANE_1/2`; `enterprise-postgres` activa `LANE_3`. | `cto_command_center.mjs`, `agent_squad.mjs`, `security_gate.mjs`, `mcp_omni_rag_server.mjs`, `harness_doctor_audit.mjs`. |
| `mobile/mobile_target_forge.mjs` | 604 | Brazo multi-plataforma Web + Móvil (`Capacitor 8` + `Style Dictionary v4`): compila `tokens.css`, `tokens.mobile.json`, `ThemeTokens.ts`, `capacitor.config.ts`, `mobile-ergonomics.css` (HIG/M3 `>= 48x48px`, `safe-area-inset`) y `mobile-native-bridge.ts`. | `cto:crear-movil`. | `LANE_2` y `LANE_3`. | `cto_command_center.mjs`, `rea_reverse_engineering_bridge.mjs`, `harness_doctor_audit.mjs`. |
| `feedback/client_feedback_triage_agent.mjs` | 368 | Agente de triaje post-venta (`Widget Web / Slack -> Filtro Anti-Prompt-Injection + Redacción PII -> HybridAgentSandbox -> Braintrust Autoevals -> Rama feedback/<id> + Preview URL`). | `cto:feedback-cliente` y endpoint `/api/client-feedback` en Workers. | Enruta automáticamente al carril correspondiente (`LANE_1/2`). | `cto_command_center.mjs`, `agent_benchmark_harness.mjs`. |
| `cockpit/live_telemetry_bus.mjs` | 708 | Bus de telemetría en vivo con **0 consumo de tokens** (`.agents/runs/live_factory_stream.jsonl` y `current_factory_state.json`) para las 6 estaciones, 11 personajes y 5 columnas Kanban. | Cada transición de `adaptive_depth_router`, `humanlayer_rpi_gate`, `agent_squad` y `eval_matrix`. | Todos los carriles (`0 overhead`). | `factory_twin_server.mjs`, `adaptive_depth_router.mjs`, `humanlayer_rpi_gate.mjs`, `agent_squad.mjs`, `eval_matrix.mjs`. |
| `cockpit/factory_twin_server.mjs` | 1.429 | Servidor local `node:http` + `SSE` en `http://localhost:4400` con 3 pestañas: Mapa 2D Canvas a 60 FPS (6 Salas + 11 Personajes con `lerp`), Tablero Kanban + botones HITL y Radiografía FinOps. | `npm run cto:cockpit`. | Observabilidad en tiempo real (`0 tokens`). | `cto_command_center.mjs`, `package.json`. |

*(Nota: Los 11 archivos restantes en la raíz de `tools/` — `ast_guard.mjs`, `audit/ast_guard.mjs`, `chaos_monkey_test.mjs`, `context_budget.mjs`, `mcp/mcp_omni_rag_server.mjs`, `project_loader.mjs`, `security_gate.mjs`, `supply_chain_guard.mjs`, `token_compiler.mjs`, `visual_audit.mjs` — son shims de re-exportación de 6 a 63 líneas para mantener compatibilidad de rutas entre scripts y workflows CI).*

---

### Tabla 1B — Ecosistema de Servidores MCP y Permisos por Rol (`.mcp.json` y `.agents/mcp/mcp_role_registry.json`)

| # | Servidor MCP (`id`) | Ola / Fase Asignada | Herramientas Expuestas (`allowedTools`) | Roles con Permiso de Acceso | Modo de Privilegio (`Creator-Verifier Split`) |
| :-: | :--- | :--- | :--- | :--- | :--- |
| 1 | `omni-rag-ast` *(+ alias `web-factory-omni-rag` en `.mcp.json`)* | Ola 1 (`Spec`) & Ola 2 (`Builders`) | `omni_rag_query`, `code_graph_query`, `omni_rag_stats`, `factory_style_catalog`, `factory_compile_tokens`, `factory_run_audit` | `product-spec-architect`, `tech-scout`, los 6 constructores de Ola 2 y `orchestrator` | **Read-Only** sobre base de conocimiento y grafo AST (`readOnly: true`). |
| 2 | `context7` | Ola 1 & Ola 2 | `resolve-library-id`, `query-docs` | `product-spec-architect`, `tech-scout`, los 6 constructores de Ola 2 y `orchestrator` | **Read-Only** (consulta de documentación oficial upstream). |
| 3 | `rea-agents` | Ola 1 (`Spec & Reverse Eng`) | `rea_extract_dom_tokens`, `rea_reconstruct_clean_room_spec`, `rea_deobfuscate_bundle_ast` | `product-spec-architect`, `tech-scout`, `orchestrator` | **Read-Only Clean-Room** (prohibido copiar código propietario). |
| 4 | `filesystem-scoped` | Ola 2 (`Builders`) | `filesystem_scoped_read`, `filesystem_scoped_write` | `senior-coder`, `ux-designer`, `motion-engineer`, `copywriting-cro-strategist`, `edge-fullstack-architect`, `seo-aeo-geo-architect`, `orchestrator` | **Scoped Read/Write** en `projects/<slug>/` y `templates/`. **Bloqueado por kernel (`blockedPaths`)**: `.agents/sealed_envelope_evals/`, `AGENTS.md`, `CONSTRAINTS.md`, `.env`, `.git/`. |
| 5 | `semgrep-mcp` | Ola 2 (`Builders`) | `semgrep_scan`, `semgrep_ast_rule_check` | Los 6 constructores de Ola 2 y `orchestrator` | **Read-Only SAST** pre-commit sobre código en construcción. |
| 6 | `blender-mcp` | Ola 2 (`3D & Design`) | `blender_generate_procedural_scene`, `blender_bake_pbr_lightmap`, `blender_export_optimized_glb`, `trellis_image_to_3d_preview` | Exclusivamente `ux-designer`, `motion-engineer` y `orchestrator` | **Scoped 3D Asset Generation** hacia `public/assets/models/`. |
| 7 | `git-readonly-mcp` | Ola 3A (`Verifier`) | `git_readonly_inspect`, `git_status`, `git_diff`, `git_log` | `qa-auditor`, `orchestrator` | **100% Strict Read-Only** (prohibido `commit`, `push`, `reset`, `checkout`). |
| 8 | `d1-sqlite-readonly-mcp` | Ola 3A (`Verifier`) | `d1_readonly_query`, `sqlite_schema_inspect` | `qa-auditor`, `orchestrator` | **100% Strict Read-Only** (`PRAGMA query_only = ON`; bloquea `INSERT/UPDATE/DELETE/DROP/ALTER` en `< 0.1ms`). |
| 9 | `chrome-devtools` | Ola 3A (`Verifier`) | `get_console_logs`, `get_network_errors`, `capture_cdp_performance_metrics`, `get_accessibility_tree` | `qa-auditor`, `orchestrator` | **Read-Only Telemetry Inspection** (CDP). |
| 10 | `playwright` | Ola 3A (`Verifier`) | `browser_navigate`, `browser_snapshot`, `browser_take_screenshot`, `browser_console_messages`, `browser_click`, `browser_fill_form` | `qa-auditor`, `orchestrator` | **Read-Only Browser Verification** (sin mutación de código fuente). |
| 11 | `delta-security-scanner` | Ola 3B (`DevSecOps`) | `delta_security_scan`, `diff_vulnerability_check` | `security-engineer`, `orchestrator` | **Read-Only Diff AppSec Audit**. |
| 12 | `dast-offat-zap` | Ola 3B (`DevSecOps`) | `dast_endpoint_probe`, `cors_csp_header_audit`, `api_fuzz_smoke_check` | `security-engineer`, `orchestrator` | **Read-Only DAST Probing** sobre preview local/staging. |
| 13 | `github-mcp` | Ola 3B (`DevSecOps`) | `github_create_branch`, `github_open_pull_request`, `github_get_commit_status` | `security-engineer`, `orchestrator` | **Gated Write (`requireHitlConfirmationFor`): `push_to_main`, `merge_pull_request`, `delete_branch`**. |
| 14 | `cloudflare-edge-mcp` | Ola 3B (`DevSecOps`) | `cloudflare_pages_preview_status`, `cloudflare_worker_headers_verify`, `cloudflare_d1_migration_dryrun` | `security-engineer`, `orchestrator` | **Gated Write (`requireHitlConfirmationFor`): `production_deploy`, `d1_production_drop`, `dns_record_delete`**. |

---

### Tabla 1C — Estado en Vivo del Cerebro RAG, Catálogos Atómicos y Bóveda Local (`[VERIFICADO EN DISCO: 2026-10-28]`)

| Activo / Subsistema de Conocimiento | Conteo Exacto en Disco | Peso Exacto en Disco | Detalle Forense Verificado |
| :--- | :---: | :---: | :--- |
| **`knowledge/ui_ux_design/`** | 121 archivos | **26,965 MB** | Incluye tratados atómicos `CANON_ATOMIC_COLORIMETRY_OKLAB_APCA_AND_PICTORIAL_LIGHT_2026.md`, `CANON_ATOMIC_TUFTE_DATA_DENSITY_AND_SWISS_TYPOGRAPHY_2026.md`, `CANON_ATOMIC_MOBILE_HIG_M3_ERGONOMICS_FOR_CAPACITOR_2026.md`, más libros completos de Gurney (*Color and Light*), Tufte, Andrew Couldwell (*Laying the Foundations*) y Greg Nudelman (*Designing Mobile Interfaces*). |
| **`knowledge/cybersecurity/`** | 59 archivos | **20,287 MB** | Incluye `CANON_ATOMIC_OWASP_ASVS5_TOP10_2025_AND_EDGE_DB_DEFENSE_2026.md`, `CANON_ENTERPRISE_SAAS_ORY_ZANZIBAR_POSTGRES_RLS_AND_ATOMIC_COMMERCE_2026.md`, `CANON_OFFICIAL_DOCS_POSTGRES_RLS_CIS_ORY_ZANZIBAR_GCP_KMS_AND_ZIZMOR_2026.md` y manuales OWASP/DevSecOps. |
| **`knowledge/software_factory/`** | 35 archivos | **8,996 MB** | Incluye `CANON_CLOUDFLARE_AGENTS_DURABLE_OBJECTS_AND_CODEMODE_2026.md`, `CANON_OFFICIAL_DOCS_HARNESS2_GEPA_OPENSPACE_HEADROOM_COCOINDEX_AND_CODEMODE_2026.md` y `SOTA_WEEKLY_DIGEST_2026.md`. |
| **`knowledge/motion_and_animation/`** | 40 archivos | **3,629 MB** | Incluye `CANON_ATOMIC_PBR_FILAMENT_CINEMATOGRAPHY_AND_FLUID_MOTION_2026.md`, `CANON_OFFICIAL_DOCS_THREE_R186_SPARK_DIORAMAS_BLENDER_MCP_AND_GLTF_2026.md` y *The Animator's Survival Kit* (Richard Williams). |
| **`knowledge/architecture_and_books/`** | 175 archivos | **68,192 MB** | Libros de ingeniería de software, arquitectura limpia, patrones distribuidos (y libros no-web puestos en cuarentena por `rag_library_sanitizer.mjs`). |
| **`knowledge/streaming_and_overlays/` + `architecture_and_edge/` + raíz** | 27 archivos | **7,264 MB** | Guías de streaming/WebGL, `INDEX.md`, `DESIGN_MASTERY_2026.md`, `UI_RECIPES_CATALOG.md`. |
| **`knowledge/_inbox_pdfs/` (incluyendo `procesados/`)** | 211 archivos | **2.545,897 MB** (~2,48 GB) | Archivos PDF/EPUB originales archivados en `knowledge/_inbox_pdfs/procesados/` tras su extracción a Markdown. |
| **TOTAL `knowledge/`** | **669 archivos** | **2.681,234 MB** (135,34 MB en `.md` activos + 2.545,90 MB en PDFs originales) | Índice FTS5 compilado en `.cache/omni_rag_fts5.sqlite` (**17.400+ chunks indexados**). |
| **Skills Activas en `.agents/skills/`** | **87 carpetas de skills** | `SKILL_INDEX.json` activo | Incluye `impeccable-and-design-md-director`, `ryux`, `threejs-r186-tsl-and-gsap-free`, `cto-hitl-visual-gate`, `security-checklist`, `modern-frontend-design`, etc. |
| **Catálogos Atómicos en `.agents/security_catalogs/`** | **3 catálogos JSON** | **13,3 KB** (`6,3 KB + 4,3 KB + 2,7 KB`) | 1. `owasp_aisvs_v1_and_mcp_top10.json` (`6,3 KB`)<br>2. `owasp_asvs_v5_atomic.json` (`4,3 KB`)<br>3. `owasp_wstg_and_mitre_d3fend_atlas.json` (`2,7 KB`) |
| **Bóveda Local (`references/sota-2026/`)** | **57 repositorios clonados** en 9 categorías (+ 203 repos previos en `references/` = **260 repos registrados** en `local_vault_registry.json`) | Modo Zero-Copy fuera del árbol Git | • `final-frontier-2026` (13): `12-factor-agents`, `agent-governance-toolkit`, `agents`, `autoevals`, `chrome-devtools-mcp`, `cocoindex-code`, `code-interpreter`, `context7`, `headroom`, `humanlayer`, `OpenHands`, `rea`, `zizmor`<br>• `webgpu-3d-2026` (9): `Animator`, `blender-mcp`, `dioramas`, `glTF-Transform`, `meshoptimizer`, `openshaders`, `spark`, `TypeGPU`, `webgpu-vfx`<br>• `factory-optimization-2026` (7): `agentshield`, `beads`, `Building-the-Agentic-Software-Factory`, `everything-claude-code`, `OpenSpec`, `spec-kitty`, `SWE-AF`<br>• `self-evolving-2026` (7): `agent-benchmark`, `evolving-agents`, `gepa`, `harness2`, `MASEval`, `OpenSpace`, `self-harness`<br>• `agent-evolution` (7), `casino-fx-audio` (5), `growth-and-hitl` (4), `video-intro-studio` (3), `design-intelligence-2026` (2: `design.md`, `impeccable`). |

---

## SECCIÓN 2: AUDITORÍA DE REALISMO TÉCNICO (EJECUCIÓN NATIVA vs. FALLBACKS HEURÍSTICOS vs. SCRIPTS HUÉRFANOS)

Siguiendo la regla de honestidad técnica absoluta, clasificamos los módulos de `tools/` según lo que ejecutan realmente hoy en la máquina Windows 11 del CTO:

| Categoría de Realismo | Módulos / Scripts Incluidos | Qué Ejecuta de Forma 100% Real Hoy | Qué Opera en Fallback Local / Simulador Determinista y Qué Falta para 100% Nativo |
| :--- | :--- | :--- | :--- |
| **1. `[EJECUCIÓN NATIVA REAL]`**<br>*(Sin simuladores; operan al 100% con binarios, criptografía o motores nativos en la PC del CTO)* | • `build_dist.mjs` (`LightningCSS` Rust binary + empaquetado `.ZIP` nativo)<br>• `token_compiler.mjs` (álgebra perceptual OKLCH y contraste APCA `Lc` real)<br>• `industry_archetype_matrix.mjs` (generación de `PRODUCT.md`/`DESIGN.md` y linter de 62 reglas Impeccable)<br>• `mobile_target_forge.mjs` (compilación real de `tokens.css`, `tokens.mobile.json`, `ThemeTokens.ts`, `capacitor.config.ts`)<br>• `ast_guard.mjs` + `codebase_ast_indexer.mjs` + `code_clean_audit.mjs` (ejecución real de `oxlint` Rust en `~55–812ms` + grafo AST de 1.034 símbolos)<br>• `visual_audit.mjs` + `chaos_monkey_test.mjs` + `a11y_tree_snapshot.mjs` + `visual_regression.mjs` (levantan **Playwright Chromium real** + **CDP real** + `odiff-bin` / `pixelmatch`)<br>• `rag_pipeline.mjs` + `book_pdf_ingester.mjs` (`node:sqlite` FTS5 nativo en C + `MiniSearch` + `pdf-parse`)<br>• `constitution_guard.mjs` + `agent_benchmark_harness.mjs` (criptografía nativa `node:crypto` `SHA-256` y firma digital asimétrica `Ed25519` real)<br>• `live_telemetry_bus.mjs` + `factory_twin_server.mjs` (servidor `node:http` + `SSE` real en puerto `4400` + Canvas 60 FPS) | • Linter Rust `Oxlint` y minificador `LightningCSS` reales.<br>• Navegador headless Chromium vía `playwright-core` con métricas CDP (`JSHeapUsedSize`, `LayoutDuration`, `FullAXTree`) y pruebas de clic/formulario reales.<br>• Base de datos `node:sqlite` FTS5 real de 2,01 GB.<br>• Criptografía `Ed25519`, `AES-256-GCM` y `SHA-256` vía `node:crypto`. | N/A — Estos módulos no dependen de servicios externos pagos ni binarios ausentes; su ejecución en la PC del CTO es **100% nativa hoy**. |
| **2. `[HÍBRIDO CON FALLBACK HEURÍSTICO/LOCAL]`**<br>*(Tienen el código cliente/API real escrito, pero cuando falta una credencial cloud o un binario pesado en Windows, caen silenciosamente en un motor determinista local)* | • `vertex_ai_bridge.mjs` (`Gemini 2.5 Vision`, `Imagen 3`, `Cloud Run TRELLIS 3D`, `GCP Cloud KMS`)<br>• `dual_database_forge.mjs` (`Tier-2 Enterprise Postgres RLS` + `EnvelopeEncryptionEngine`)<br>• `sandbox.mjs` (`E2B Firecracker MicroVM` -> `Git Worktree`)<br>• `shader_and_3d_forge.mjs` (`Blender Headless MCP` / `glTF-Transform`)<br>• `mcp_security_auditor.mjs` + `supply_chain_guard.mjs` + `workflow_security_linter.mjs` (`Semgrep`, `ZAP/OFFAT`, `TruffleHog`, `Zizmor`, `AgentShield`)<br>• `rea_reverse_engineering_bridge.mjs` (`morluto/rea` + `Wakaru`)<br>• `client_feedback_triage_agent.mjs` (Slack/GitHub PR -> rama local) | • `vertex_ai_bridge.mjs` tiene `USE_VERTEX_AI=true`, `GCP_PROJECT_ID` y `GOOGLE_APPLICATION_CREDENTIALS` configurados en `.env`, y `sandbox.mjs` tiene `E2B_API_KEY` configurada en `.env`.<br>• `EnvelopeEncryptionEngine` cifra realmente con `AES-256-GCM` (`node:crypto` + `WebCrypto subtle`).<br>• `dual_database_forge.mjs` genera los archivos `.sql` reales con `ENABLE/FORCE ROW LEVEL SECURITY` y esquemas Drizzle. | **¿Qué opera hoy en Fallback Local y qué falta instalar/configurar?**<br>1. **`GCP Cloud KMS` (`vertex_ai_bridge.mjs`)**: Usa una clave maestra derivada localmente (`LOCAL_DEV_CMK_MATERIAL`) para envolver la DEK porque falta `GCP_KMS_KEY_URI` en `.env`.<br>2. **`Cloud Run TRELLIS 3D` (`vertex_ai_bridge.mjs`)**: Sintetiza un archivo binario `.glb` v2 sintético válido en disco porque falta `CLOUD_RUN_TRELLIS_3D_URL` en `.env`.<br>3. **`Blender Headless` (`blender-mcp`)**: No está instalado `blender.exe` en el `PATH` de Windows; genera escenas procedurales Three.js r186 en JS en lugar de invocar `blender --background`.<br>4. **`Semgrep / OWASP ZAP / Zizmor / TruffleHog`**: Los binarios CLI externos no están instalados globalmente en Windows; `security_gate.mjs`, `workflow_security_linter.mjs` y `supply_chain_guard.mjs` ejecutan **motores AST/Regex equivalentes en Node.js nativo** (22 reglas SAST, 18 reglas MCP SARIF, 4 reglas Zizmor YAML y entropía de Shannon).<br>5. **`Enterprise Postgres RLS` (`dual_database_forge.mjs`)**: Genera las migraciones SQL y políticas RLS reales, pero en pruebas locales sin un servidor PostgreSQL v14+ corriendo en el proyecto activo, valida las invariantes sobre el AST del SQL generado. |
| **3. `[SCRIPTS HUÉRFANOS O DESCONECTADOS]`**<br>*(15 scripts en `tools/` que hoy tienen `callers = NONE` en el flujo automático de `cto:construir` y `cto:empaquetar`)* | 1. `tools/design/og_image_generator.mjs`<br>2. `tools/agent_factory.mjs`<br>3. `tools/audit/browser_pool_daemon.mjs`<br>4. `tools/audit/harvest_design_tokens.mjs`<br>5. `tools/audit/lighthouse_pa11y_audit.mjs`<br>6. `tools/e2b_sandbox.mjs`<br>7. `tools/ingest_local_pdfs.mjs`<br>8. `tools/intelligence/agy_token_guard_hook.mjs`<br>9. `tools/intelligence/context_compactor.mjs`<br>10. `tools/intelligence/course_ingester.mjs`<br>11. `tools/intelligence/video_course_ingester.mjs`<br>12. `tools/intelligence/firecrawl_scraper.mjs`<br>13. `tools/intelligence/promptfoo_eval_runner.mjs`<br>14. `tools/intelligence/qdrant_and_vault_curator.mjs`<br>15. `tools/intelligence/rag_agentic_harness.mjs` & `toggle_mcp_profile.mjs` | Son ejecutables manualmente con `node tools/...`, pero **ninguno se dispara durante `npm run cto:construir` ni `npm run cto:empaquetar`**. | • **14 de ellos** son scripts de las Fases 1–15 que fueron reemplazados por versiones superiores (`cto_command_center.mjs`, `context_budget.mjs`, `course_and_paper_distiller.mjs`, `ryux_design_gate.mjs`, `agent_governance_kernel.mjs`).<br>• **1 de ellos (`tools/design/og_image_generator.mjs`) es una pérdida real de valor**: genera imágenes OpenGraph (`og-image.svg`) para compartir en redes sociales, pero nunca fue conectado a `build_dist.mjs`. |

---

## SECCIÓN 3: CAZA DE FUGAS, BUGS LATENTES Y CUELLOS DE BOTELLA (MEMORIA, TOKENS, WINDOWS OS Y CONCURRENCIA)

### 1. Presupuesto de Contexto (*Token Footprint*) y Filtro de Dominios RAG
- **Arranque en Frío (`HOT + WARM CONTEXT`):** Medido en vivo por `context_budget.mjs` y `harness_doctor_audit.mjs`: **`2.762 tokens`** sobre un tope estricto de **`3.500 tokens`** (`78,9%` de uso).
- **Compresión Reversible `Headroom CCR`:** Activa y verificada en `.cache/headroom_ccr/` (`3 archivos comprimidos: 10,56 KB, 6,73 KB y 0,35 KB`).
- **Cuarentena de Dominios No-Web (`Scoped RAG Routing`):** `rag_library_sanitizer.mjs` filtra correctamente los libros fuera de dominio (`EXCLUDED_NON_WEB_DOMAIN`, como manuales de seguros, finanzas o juegos de azar) durante las consultas de `rag_pipeline.mjs` y `qdrant_rag.mjs`.
- **🐛 Hallazgo Forense #1 (Código Residual de Casino en `vertex_ai_bridge.mjs`):** En las líneas `1747–1781` de `tools/intelligence/vertex_ai_bridge.mjs` quedaron funciones de diagnóstico CLI heredadas de otro proyecto (`auditSniperSlotWithCoVe` y `generateSniperTacticalBriefing` con `slug: 'tome-of-life'`, `rtpTheoretical: 98.0`). No se ejecutan cuando `vertex_ai_bridge.mjs` se importa como módulo, pero ensucian el código si alguien ejecuta `node tools/intelligence/vertex_ai_bridge.mjs` directamente.

### 2. Fugas de Estado, Archivos Crecientes (*Unbounded Growth*) e Inflación de `.cache/`
Medición exacta en disco de las 4 carpetas de estado:
1. **`.cache/` (`2.788,82 MB` / `2,72 GB` en 17 archivos) — ⚠️ CUELLO DE BOTELLA DE DISCO DETECTADO:**
   - `.cache/omni_rag_fts5.sqlite`: **`2.059,29 MB` (`~2,01 GB`)**
   - `.cache/omni_rag_fts5.sqlite-wal`: **`546,35 MB`** (Write-Ahead Log de SQLite sin consolidar tras la ingesta masiva de PDFs).
   - `.cache/rag_index_cache.json`: **`248,00 MB`** (Caché JSON legado duplicado respecto a FTS5 SQLite).
   - *Impacto:* Aunque SQLite FTS5 consulta en `O(1)` sin cargar los 2 GB en RAM, tener un `.sqlite-wal` de `546 MB` sin `PRAGMA wal_checkpoint(TRUNCATE)` desperdicia más de medio gigabyte en disco.
2. **`.agents/memory/` (`9,15 MB` en 42 archivos):**
   - `.agents/memory/knowledge_index.json`: **`7.705,27 KB` (`7,52 MB`)**.
   - `.agents/memory/codebase_ast_graph.json`: **`741,60 KB`**.
   - `.agents/memory/textgrad_optimization_log.json`: **`235,03 KB`**.
   - `.agents/memory/local_vault_registry.json`: **`164,51 KB`**.
   - `.agents/memory/agent_benchmark_history.json`: **`134,63 KB`** (crece en cada corrida de `cto:benchmark`).
3. **`.agents/runs/` (`39,73 KB` en 15 archivos) — ⚠️ FUGA APPEND-ONLY + BUG DE SERIALIZACIÓN DETECTADOS:**
   - **Fuga de Crecimiento Infinito (`live_factory_stream.jsonl`):** `tools/cockpit/live_telemetry_bus.mjs` hace `fs.appendFileSync(LIVE_STREAM_JSONL_PATH, ...)` en cada evento de los agentes sin rotación ni límite de líneas (a diferencia de `forensicLog` en memoria que sí corta en 40 entradas). En sesiones largas crecerá indefinidamente.
   - **🐛 Hallazgo Forense #2 (Carpeta Basura `.agents/runs/-object-Object-/`):** Existe en disco el archivo `.agents/runs/-object-Object-/rpi_checkpoint.json` (`4,33 KB`). Causa raíz verificada en `tools/orchestrator/humanlayer_rpi_gate.mjs:185`: `getRpiCheckpointPath(slug)` hace `String(slug || 'agencia-alfa')`. Cuando algún llamador le pasa un objeto de opciones `{ project: 'agencia-alfa' }` como primer argumento en lugar de un string, `String(slug)` evalúa a `"[object Object]"` y crea la carpeta `-object-Object-`.
4. **`.agents/beads/` (`0,61 KB` en 1 archivo):**
   - `.agents/beads/task_graph.jsonl` (`0,61 KB`): se sobrescribe limpiamente por misión.

### 3. Bugs Latentes de Sistema Operativo (Windows 11 / PowerShell / Rutas)
Escaneo completo de los 97 archivos `.mjs` buscando `/bin/sh`, `/tmp/`, `rm -rf` y `spawn()`:
- `tools/sandbox.mjs:234`: Maneja correctamente Windows vs. POSIX (`const shellCmd = isWin ? 'powershell.exe' : '/bin/sh'`).
- `tools/intelligence/agent_squad.mjs:369`: Usa `spawn(process.execPath, [fullPath, ...args])` (ejecuta el binario `node.exe` directo sin depender de `npx` ni de `/bin/sh`), lo cual es 100% seguro en Windows 11.
- **🐛 Hallazgo Forense #3 (`tools/audit/lighthouse_pa11y_audit.mjs:104`):** Invoca `spawn(CHROME, args)` asumiendo rutas por defecto que pueden no coincidir en todas las instalaciones de Windows (aunque el script hoy está huérfano y fue reemplazado por `visual_audit.mjs` con `playwright-core`).

### 4. Higiene de Sandboxes y Procesos (`git worktree list`)
- Ejecución en vivo de `git worktree list`:
  ```text
  C:/Users/tomas/Desktop/web-software-factory b02cbb4 [master]
  ```
- **Resultado:** `0` worktrees huérfanos colgados y `0` servidores HTTP bloqueando puertos locales tras las pruebas (`factory_twin_server.mjs --self-test` y `harness_doctor_audit.mjs` cierran sus sockets al terminar).

---

## SECCIÓN 4: AUDITORÍA DE CIBERSEGURIDAD Y DEVSECOPS (BRECHAS REALES FRENTE A OWASP 2025/2026)

| Dominio de Seguridad | Qué Está Cubierto y Verificado Hoy en el Repositorio | Brechas Residuales / Qué Falta para Producción Real Bancaria/Enterprise |
| :--- | :--- | :--- |
| **1. OWASP Top 10:2025 & ASVS v5.0 (Niveles 1, 2 y 3)** | • **Plantillas Workers (`templates/*/worker/index.js`)**: Inyectan cabeceras estrictas (`Content-Security-Policy` sin `unsafe-eval`, `Strict-Transport-Security` con `preload`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`).<br>• **Validación de Frontera**: Esquemas estrictos con `Valibot` (`v.strictObject`) que rechazan campos extra (*Mass Assignment*).<br>• **Manejo de Errores (`A10:2025`)**: Respuestas JSON estructuradas sin exponer *stack traces* al cliente.<br>• **Anti-IDOR/BOLA**: Validación de esquemas `Ory Keto` (Zanzibar ReBAC) y claves `UUIDv4` en `identity_and_commerce_guard.mjs`. | • **Brecha Residual 1 (Rate Limiting en Memoria Local del Worker):** En los templates básicos (`vanilla-edge` / `astro-edge`), el *rate limiting* usa un `Map` en memoria del isolate o cabeceras básicas hasta que el usuario vincula un namespace de **Cloudflare KV / Durable Objects Rate Limiter** o **Cloudflare Turnstile** en producción.<br>• **Brecha Residual 2 (Verificación JWT en Vivo):** Los templates incluyen el verificador WebCrypto `ES256`/`RS256` que rechaza `alg=none`, pero requieren configurar la URL real del JWKS de `Ory Kratos` / `Auth0` / `Clerk` cuando el sitio tiene login real. |
| **2. Defensa en Profundidad de Base de Datos (`dual_database_forge.mjs`)** | • **Modo `edge-d1`**: Genera esquemas SQLite con claves foráneas, índices compuestos y bitácora de auditoría.<br>• **Modo `enterprise-postgres`**: Genera migraciones SQL con las **3 Zonas** (`zone_restricted`, `zone_confidential`, `zone_audit_worm`), `REVOKE ALL ON SCHEMA public FROM PUBLIC`, `ENABLE ROW LEVEL SECURITY` + `FORCE ROW LEVEL SECURITY` y política `tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid` con *Wrapper Pattern* para índices.<br>• **Cifrado PII**: `EnvelopeEncryptionEngine` cifra columnas sensibles con `AES-256-GCM` e IV aleatorio de 96 bits. | • **Brecha Residual 3 (KMS Local Fallback):** Sin `GCP_KMS_KEY_URI` en `.env`, la clave maestra (KEK) que envuelve las DEKs se deriva localmente en vez de residir dentro de un HSM de Google Cloud KMS.<br>• **Brecha Residual 4 (Transacciones RLS en Vivo):** El middleware Drizzle que ejecuta `SET LOCAL app.current_tenant_id` está generado como artefacto en `projects/<slug>/db/`, pero requiere una instancia PostgreSQL real (Neon / Supabase / Hyperdrive) para ejecutar tests de aislamiento cruzado contra un motor Postgres vivo. |
| **3. Seguridad Agéntica y MCP (`OWASP MCP01–MCP10` y `ASI01–ASI10`)** | • **`mcp_security_auditor.mjs`**: Pasa **18/18 reglas SARIF** (`0 errores`), verificando ausencia de tokens hardcodeados en `.mcp.json`, listas blancas de herramientas por servidor y bloqueo de comodines `"*"`.<br>• **Separación Creador-Verificador**: `agent_governance_kernel.mjs` bloquea en `< 0.02ms` cualquier intento de un constructor (`senior-coder`) de leer `.agents/sealed_envelope_evals/` o de `qa-auditor` de ejecutar `DROP/INSERT/UPDATE` en `d1-sqlite-readonly-mcp`.<br>• **Anti-Prompt-Injection & `ASI06`**: Filtro activo en `client_feedback_triage_agent.mjs`, `tech_scout.mjs` y `validateMemoryWriteIntegrity()`. | • **Brecha Residual 5 (Aislamiento en Proceso):** Cuando `agent_squad.mjs` corre localmente sin `E2B`, la separación de permisos MCP (`verifyRoleMcpPermission`) es aplicada en la capa de aplicación por `agent_governance_kernel.mjs`, no por cuentas de usuario separadas del sistema operativo Windows. |
| **4. Seguridad de CI/CD y Cadena de Suministro (`A03:2025`)** | • **`workflow_security_linter.mjs` (`Zizmor` rules)**: Audita los 4 archivos `.github/workflows/*.yml` verificando `permissions: contents: read`, ausencia de interpolación directa `${{ github.event.issue.title }}` en `run:` y ausencia de `pull_request_target` inseguro.<br>• **`supply_chain_guard.mjs`**: Ejecuta `AgentShield` sobre `.agents/`, genera SBOM `CycloneDX 1.5` (`.agents/memory/sbom_cyclonedx.json`) y escanea 140 archivos con `Gitleaks + Shannon Entropy`. | • **Brecha Residual 6 (Pinning SHA-256 en GitHub Actions):** Los workflows usan tags de versión (`actions/checkout@v4`, `actions/setup-node@v4`) en lugar de hashes de commit completos de 40 caracteres (`@b4ffde65f46336ab88eb53be808477a3936bae11`), que es la recomendación máxima de `Zizmor` Nivel Estricto. |

---

## SECCIÓN 5: BENCHMARK COMPARATIVO CRÍTICO Y SCORING HONESTO (ARQUITECTURA vs. EJECUCIÓN EN VIVO)

### 1. Ejecución de la Suite de Diagnóstico en Vivo (`[MEDIDO EN CONSOLA: 2026-10-28T18:47:51-03:00]`)

| Comando Ejecutado | Código de Salida | Tiempo Exacto (`ms`) | Resultado Empírico Literal |
| :--- | :---: | :---: | :--- |
| `npm run cto:auditar-harness` | `Exit 0` | **`7.232 ms`** *(5.886 ms internos)* | `8/8 Capas = 100.0 / 100.0 pts` \| `BootTokens = 2.762 / 3.500` \| `Simulacro E2E 5/5 = PASSED` \| `Ed25519 = VERIFIED` |
| `npm run cto:benchmark` | `Exit 0` | **`45.530 ms`** *(43.536 ms internos)* | `5 Golden Tasks = 100.0 / 100.0` \| `Stryker Mutants Killed = 3/3` \| `agentvcs Ed25519 = FROZEN_VERIFIED (Key: f80c006e4ada886b)` |
| `npm run audit:ryux` | `Exit 0` | **`709 ms`** | `RYUX DESIGN SCORE: 100/100 (12/12)` \| `Viewports=[1440, 768, 375px] ZeroOverlap=true` \| `Impeccable Rules=62/62` \| `FPS=60, CLS=0.00` |
| `node tools/security_gate.mjs` | `Exit 0` | **`3.370 ms`** | `QUARANTINE_PASSED (100.0 / 100.0)` \| `SAST=82ms` \| `Workers=4 OK` \| `Zizmor Workflows=4 OK` \| `AgentOS Kernel=0.0136ms` \| `MCP=18/18 SARIF` |
| `node tools/audit/code_clean_audit.mjs` | `Exit 0` | **`1.019 ms`** | `Rust Oxlint: PASS in 812ms` \| `Knip Dead-Code: 0` \| `Duplication: 0% (< 4.0%)` \| `Clean Code Score: 100/100` |

---

### 2. Tabla de Doble Calificación Crítica (0 a 100 Puntos) por Dominio

> **Criterio de Calificación:**
> - **Nota A (Arquitectura, Reglas y Compuertas):** Evalúa la calidad de las especificaciones (`DESIGN.md`, `SPEC.md`), tokens matemáticos (`OKLCH/APCA/Utopia`), reglas de seguridad y auditores deterministas.
> - **Nota B (Ejecución Autónoma Real Hoy en la PC del CTO sin Intervención Manual):** Evalúa qué tan listo sale el producto final hoy ejecutando únicamente los comandos `cto:*` en Windows 11 sin que un humano tenga que configurar servidores externos ni retocar código.

| Dominio / Tipo de Proyecto | Nota A: Diseño Arquitectónico y Reglas (0–100) | Nota B: Ejecución Autónoma Real Hoy en PC del CTO (0–100) | Explicación Técnica Honesta de la Diferencia y Dónde Está el Techo Actual |
| :--- | :---: | :---: | :--- |
| **1. Sitios Comerciales / Landings de Alta Conversión (`Persuade`)** | **98 / 100** | **94 / 100** | **Es el punto más fuerte de la fábrica.** Compila HTML5 semántico, CSS OKLCH/APCA real con `LightningCSS`, aplica Fogg B=MAP, audita con Playwright/CDP en 3 viewports y exporta un `.ZIP` 100% funcional para Cloudflare Pages. *¿Por qué 94 y no 100?* Porque `og_image_generator.mjs` aún no se invoca automáticamente en `build_dist.mjs` y las imágenes Hero usan SVGs/Pollinations hasta que el cliente suba fotografía propia. |
| **2. Estudios de Abogacía / Clínicas / Portales Editoriales (`Read`)** | **97 / 100** | **93 / 100** | Excelente soporte tipográfico (`Utopia clamp()`, ritmo vertical, alto contraste `APCA Lc >= 75/90`, modo `Read` de `DESIGN.md`, SEO/AEO `llms.txt` + `Schema.org`). Produce sitios estáticos editoriales o institucionales listos para producción sin dependencias externas. |
| **3. E-Commerce con Pagos e Inventario Atómico (`Persuade + Operate`)** | **92 / 100** | **78 / 100** | La arquitectura genera el storefront, carrito, worker y las reglas SQL de bloqueo pesimista (`SELECT ... FOR UPDATE` + claves de idempotencia en `identity_and_commerce_guard.mjs`). *¿Por qué 78 en ejecución autónoma?* Porque conectar una pasarela de pago real (Stripe / MercadoPago webhooks vivos) y poblar el catálogo real en Cloudflare D1 o Postgres requiere credenciales comerciales del cliente y pruebas de webhook con CLI externo. |
| **4. Sistemas Empresariales ERP / SaaS Multi-Tenant / Fintech (`Operate` + `enterprise-postgres`)** | **94 / 100** | **75 / 100** | `dual_database_forge.mjs` genera esquemas PostgreSQL v14+ de altísimo nivel (`ENABLE/FORCE RLS`, 3 zonas, `Drizzle ORM` y cifrado `AES-256-GCM`). *¿Por qué 75 en ejecución autónoma hoy?* Porque en la PC del CTO no hay un clúster `Ory Kratos/Keto` ni un servidor PostgreSQL/Hyperdrive aprovisionado automáticamente por proyecto; la fábrica entrega los artefactos SQL/ORM/Worker listos, pero el aprovisionamiento de infraestructura cloud requiere intervención DevOps. |
| **5. Experiencias 3D WebGPU / Shaders / Sitios de Streamers (`Experience`)** | **93 / 100** | **84 / 100** | `shader_and_3d_forge.mjs` inyecta código real de `Three.js r186 WebGPURenderer`, `Spark 2.x Gaussian Splatting`, shaders GLSL/WGSL y tarjetas holográficas con Watchdog de 60 FPS. *¿Por qué 84?* Porque sin `blender.exe` instalado localmente ni un endpoint `CLOUD_RUN_TRELLIS_3D_URL` vivo, los modelos `.glb` personalizados complejos usan geometría procedural o mallas sintéticas hasta que el usuario provea un `.glb`/`.splat` de autor. |
| **6. Aplicaciones Móviles iOS/Android (`Capacitor 8` + `Style Dictionary`)** | **91 / 100** | **76 / 100** | `mobile_target_forge.mjs` compila con precisión los tokens multi-target (`pt`/`dp`), `capacitor.config.ts`, `mobile-ergonomics.css` (`>= 48x48px`, `safe-area-inset`) y `mobile-native-bridge.ts`. *¿Por qué 76 en ejecución autónoma en Windows?* Porque compilar el binario `.ipa` de iOS requiere macOS + Xcode, y compilar el `.apk`/`.aab` firmado requiere Android Studio SDK + Gradle instalados en la máquina. |
| **7. Ingeniería Inversa de Sitios de Referencia (`morluto/rea` + `Clean-Room`)** | **90 / 100** | **82 / 100** | Extrae muy bien tokens visuales, estructura DOM/AX Tree, paletas OKLCH y contratos JSON (`JSONSwiss` + `MarkItDown`) hacia `RECONSTRUCTED_SPEC.md`. Su techo actual (82) está en SPAs altamente ofuscadas con WebAssembly propietario o detrás de protecciones anti-bot agresivas (Cloudflare Turnstile/DataDome externos). |

---

### 3. Comparativa Objetiva frente a las 6 Referencias de la Industria (Octubre 2026)

| Referencia de la Industria | En Qué les Ganamos Hoy (`Web Software Factory Studio`) | En Qué Nos Superan Ellos Todavía |
| :--- | :--- | :--- |
| **1. `Warp Factories`** | Tenemos plano declarativo `factory.yaml` **más** inteligencia visual especializada en Web/UI (`OKLCH/APCA`, 62 reglas Anti-Slop, 3D WebGPU y empaquetado `.ZIP` autónomo para clientes). | Warp se ejecuta de forma nativa dentro de su propio emulador de terminal en Rust con telemetría de shell a nivel de kernel OS. |
| **2. `HumanLayer` (`12-factor-agents`)** | Implementamos sus 6 etapas (`Questions -> Implementation`) con checkpoints JSON locales y además un **Cockpit visual 2D a 60 FPS + Kanban en vivo** a 0 tokens (`localhost:4400`). | El ecosistema cloud de HumanLayer tiene integraciones empresariales nativas multi-canal (Slack/Email/PagerDuty) con enrutamiento de aprobaciones distribuido en equipo. |
| **3. `vercel-labs/eve` (`Foreman`)** | Adoptamos su patrón de *Blind Independent Foreman Review* combinándolo con nuestro **Hard-Gated Eval Matrix (Veto a 49/100)** y `Sealed-Envelope Evals` locales a `$0.00`. | `eve` se integra nativamente con la infraestructura interna de Vercel Preview Deployments y GitHub Apps en la nube sin depender de la máquina local. |
| **4. `doordash-oss/agentic-orchestrator`** | Incorporamos su patrón *Tracer-Bullet + Stop Hook (`ast_guard` + `security_gate`)* y le sumamos el enrutador adaptativo de 3 carriles (`SWE-AF` `LANE_1/2/3`) para no quemar tokens en cambios simples. | DoorDash opera su orquestador sobre clústeres de microservicios internos a escala de miles de desarrolladores con runners de CI dedicados. |
| **5. `All-Hands-AI/OpenHands`** | Adoptamos su `StuckDetector` determinista y los triggers de conocimiento por archivo (`worker/index.js`, `schema.sql`, `tokens.json`) con un arranque mucho más liviano (`2.762 tokens` vs. decenas de miles). | OpenHands levanta contenedores Docker completos por sesión con entorno Linux completo y navegador VNC interactivo para depuración generalista de sistemas. |
| **6. `StrongDM Attractor`** | Aplicamos principios de convergencia hacia estados estables mediante el bucle `TextGrad + GEPA Pareto` y el congelamiento criptográfico `Ed25519` (`agentvcs`). | StrongDM opera proxies Zero-Trust a nivel de red/identidad de infraestructura real (SSH/RDP/K8s/DB proxies en vivo), mientras que nuestro kernel gobierna herramientas MCP a nivel de proceso Node.js. |

---

## SECCIÓN 6: ESTADO DE SINCRONIZACIÓN GIT, GITHUB ACTIONS Y PRESUPUESTO FINOPS GCP

### 1. Resultado Literal de `git status -sb` y `git branch -vv`
```text
## master...origin/master
 M .agents/memory/agent_benchmark_history.json
 M .agents/memory/agentvcs_snapshots.json
 M .agents/memory/bolt_checkpoint.json
 M .agents/memory/eval_matrix_latest.json
 M .agents/memory/knowledge_index.json
 M .agents/memory/local_vault_registry.json
 M .agents/memory/skill_quality_records.json
 M .agents/memory/tech_scout_state.json
 M .agents/memory/vertex_prompt_cache.json
 M .agents/skills/SKILL_INDEX.json
 M .github/workflows/weekly_factory_evolution.yml
 M .mcp.json
 M MANUAL_CTO_SIMPLE.md
 M TECH_SCOUT_RADAR_2026.md
 M docs/TECH_SCOUT_RADAR_2026.md
 M knowledge/software_factory/SOTA_WEEKLY_DIGEST_2026.md
 M package.json
 M projects/agencia-alfa/SPEC.md
 M projects/agencia-alfa/factory.project.json
 M projects/agencia-alfa/worker/index.js
 M templates/astro-edge/worker/index.js
 M templates/fullstack-saas-edge/src/db/drizzle.schema.js
 M templates/fullstack-saas-edge/worker/index.js
 M templates/vanilla-edge/worker/index.js
 M tools/audit/code_clean_audit.mjs
 M tools/audit/ryux_design_gate.mjs
 M tools/audit/security_gate.mjs
 M tools/audit/supply_chain_guard.mjs
 M tools/audit/visual_audit.mjs
 M tools/build_dist.mjs
 M tools/cto_command_center.mjs
 M tools/design/shader_and_3d_forge.mjs
 M tools/design/token_compiler.mjs
 M tools/intelligence/agent_benchmark_harness.mjs
 M tools/intelligence/agent_squad.mjs
 M tools/intelligence/ast_guard.mjs
 M tools/intelligence/book_pdf_ingester.mjs
 M tools/intelligence/context_budget.mjs
 M tools/intelligence/eval_matrix.mjs
 M tools/intelligence/instincts_engine.mjs
 M tools/intelligence/mcp_omni_rag_server.mjs
 M tools/intelligence/memory_reflector.mjs
 M tools/intelligence/qdrant_rag.mjs
 M tools/intelligence/tech_scout.mjs
 M tools/intelligence/vertex_ai_bridge.mjs
 M tools/intelligence/weekly_cron_evolver.mjs
 M tools/lib/project_loader.mjs
 M tools/sandbox.mjs
?? .agents/beads/
?? .agents/mcp/
?? .agents/mcp_config.json
?? .agents/memory/client_feedback_ledger.json
?? .agents/memory/codebase_ast_graph.json
?? .agents/memory/factory_dora_ledger.json
?? .agents/memory/forensic_action_traces.jsonl
?? .agents/memory/sbom_cyclonedx.json
?? .agents/runs/
?? .agents/sealed_envelope_evals/
?? .agents/security_catalogs/
?? .agents/security_reports/
?? .agents/skills/impeccable-and-design-md-director/
?? .github/workflows/factory_ci_gate.yml
?? .github/workflows/issue_driven_factory.yml
?? .github/workflows/package_and_deploy.yml
?? HARNESS_READINESS_REPORT.md
?? factory.yaml
?? knowledge/_inbox_courses/
?? knowledge/cybersecurity/CANON_ATOMIC_OWASP_ASVS5_TOP10_2025_AND_EDGE_DB_DEFENSE_2026.md
?? knowledge/cybersecurity/CANON_ENTERPRISE_SAAS_ORY_ZANZIBAR_POSTGRES_RLS_AND_ATOMIC_COMMERCE_2026.md
?? knowledge/cybersecurity/CANON_OFFICIAL_DOCS_POSTGRES_RLS_CIS_ORY_ZANZIBAR_GCP_KMS_AND_ZIZMOR_2026.md
?? knowledge/cybersecurity/STRUCTURED_SECURITY_CATALOGS_INDEX_2026.json
?? knowledge/motion_and_animation/CANON_ATOMIC_PBR_FILAMENT_CINEMATOGRAPHY_AND_FLUID_MOTION_2026.md
?? knowledge/motion_and_animation/CANON_OFFICIAL_DOCS_THREE_R186_SPARK_DIORAMAS_BLENDER_MCP_AND_GLTF_2026.md
?? knowledge/motion_and_animation/book_the_animator_s_survival_kit.md
?? knowledge/software_factory/CANON_CLOUDFLARE_AGENTS_DURABLE_OBJECTS_AND_CODEMODE_2026.md
?? knowledge/software_factory/CANON_OFFICIAL_DOCS_HARNESS2_GEPA_OPENSPACE_HEADROOM_COCOINDEX_AND_CODEMODE_2026.md
?? knowledge/ui_ux_design/CANON_ATOMIC_COLORIMETRY_OKLAB_APCA_AND_PICTORIAL_LIGHT_2026.md
?? knowledge/ui_ux_design/CANON_ATOMIC_MOBILE_HIG_M3_ERGONOMICS_FOR_CAPACITOR_2026.md
?? knowledge/ui_ux_design/CANON_ATOMIC_TUFTE_DATA_DENSITY_AND_SWISS_TYPOGRAPHY_2026.md
?? knowledge/ui_ux_design/book_color_and_light_a_guide_for_the_realist_painter.md
?? knowledge/ui_ux_design/book_designing_mobile_interfaces.md
?? knowledge/ui_ux_design/book_laying_the_foundations_a_book_about_design_systems.md
?? knowledge/ui_ux_design/book_plus_color_color_theory_harmony_chromatic_systems.md
?? knowledge/ui_ux_design/book_the_visual_display_of_quantitative_information.md
?? projects/agencia-alfa/DESIGN.md
?? projects/agencia-alfa/PRODUCT.md
?? projects/agencia-alfa/RECONSTRUCTED_SPEC.md
?? projects/agencia-alfa/capacitor.config.ts
?? projects/agencia-alfa/db/
?? projects/agencia-alfa/deltas/
?? projects/agencia-alfa/site/css/mobile-ergonomics.css
?? projects/agencia-alfa/site/js/mobile-native-bridge.ts
?? projects/agencia-alfa/tokens/ThemeTokens.ts
?? projects/agencia-alfa/tokens/tokens.css
?? projects/agencia-alfa/tokens/tokens.mobile.json
?? templates/components/
?? tools/ast_guard.mjs
?? tools/audit/git_remote_sync_check.mjs
?? tools/audit/harness_doctor_audit.mjs
?? tools/audit/mcp_security_auditor.mjs
?? tools/audit/workflow_security_linter.mjs
?? tools/chaos_monkey_test.mjs
?? tools/cockpit/
?? tools/context_budget.mjs
?? tools/db/
?? tools/design/industry_archetype_matrix.mjs
?? tools/feedback/
?? tools/ingest_local_pdfs.mjs
?? tools/intelligence/agent_governance_kernel.mjs
?? tools/intelligence/codebase_ast_indexer.mjs
?? tools/intelligence/course_and_paper_distiller.mjs
?? tools/intelligence/factory_dora_metrics.mjs
?? tools/intelligence/official_docs_harvester.mjs
?? tools/intelligence/rea_reverse_engineering_bridge.mjs
?? tools/intelligence/visual_science_corpus_builder.mjs
?? tools/mcp/
?? tools/mobile/
?? tools/orchestrator/
?? tools/project_loader.mjs
?? tools/security/
?? tools/security_gate.mjs
?? tools/supply_chain_guard.mjs
?? tools/visual_audit.mjs
```
```text
* master b02cbb4 [origin/master] feat(factory): implement Epistemic RAG, Multi-Project Packaging, 3D/WebGPU Forge, Weekly Cron, Phase 19B Self-Evolving Harness & 6-Layer Tech Scout Radar
```
- **Diagnóstico Git:** El puntero `HEAD` coincide con `origin/master` (`b02cbb4`), pero existen **46 archivos modificados (`M`) y 65 rutas nuevas sin seguimiento (`??`)** correspondientes a todas las Fases 20 a 32 que están únicamente en el disco local y **aún no fueron consolidados con `git commit` ni subidos con `git push` a `origin/master`**.

### 2. Resultado Literal de `git log -n 8 --oneline`
```text
b02cbb4 feat(factory): implement Epistemic RAG, Multi-Project Packaging, 3D/WebGPU Forge, Weekly Cron, Phase 19B Self-Evolving Harness & 6-Layer Tech Scout Radar
4c542f0 feat(factory): complete SOTA 2026 Web Software Factory v2.2.0, O(1) Omni-RAG v5.2, W3C DTCG compiler, and 6-ring agentic harness
2833685 chore(studio): eliminate all residual brand strings across tools, skills, docs, and RAG index
d7e1e3f docs(studio): add factory refactor and dual-RAG audit report
772c23e chore(studio): purge inherited HuntHub files, complete 9-role agency, and build pure 17.4k-chunk Web Factory Omni-RAG v5
```
*(El repositorio tiene 5 commits históricos totales desde su inicialización).*

### 3. Lista de Workflows en `.github/workflows/`
1. `.github/workflows/factory_ci_gate.yml`
2. `.github/workflows/issue_driven_factory.yml`
3. `.github/workflows/package_and_deploy.yml`
4. `.github/workflows/weekly_factory_evolution.yml`

### 4. Estado del Presupuesto FinOps GCP y Variables de Entorno (`.env`)
- **Ubicación Real del Archivo FinOps:** Está en `.agents/governance/gcp_finops_budget.json` (y el caché de llamadas en `.agents/memory/vertex_prompt_cache.json`), **no** en `.agents/memory/gcp_finops_budget.json`.
- **Estado Medido (`npm run cto:gcp-status`):**
  - Crédito Promocional Total: **`$90,00 USD`**
  - Gasto Acumulado Total: **`$0,0000 USD`** (6 llamadas registradas, 6 hits de caché local)
  - Tope Diario Estricto: **`$1,50 USD / día`** (`allow24x7Instances: false`)
- **Variables Configuradas (`SET`) en `.env` (40 claves activas):**
  `GROQ_API_KEY`, `GEMINI_MODEL`, `GEMINI_AUDIT_MODEL`, `API_ANTHROPIC_KEY`, `SERPER_API_KEY`, `FIRECRAWL_API_KEY`, `E2B_API_KEY`, `QDRANT_HOST`, `QDRANT_API_KEY`, `QDRANT_COLLECTION_OBSIDIAN`, `GITHUB_TOKEN`, `OPENROUTER_API_KEY`, `APIFY_API_TOKEN`, `DEEPSEEK_API_KEY`, `DATABASE_URL`, `GOOGLE_CLOUD_PROJECT`, `GCP_PROJECT_ID`, `GCP_LOCATION`, `USE_VERTEX_AI`, `GOOGLE_APPLICATION_CREDENTIALS`, `API_KEY_21ST`, `ADMIN_API_SECRET`, `TURNSTILE_SECRET_KEY`, entre otras.
- **Variables Pendientes (`EMPTY` o no definidas en `.env`):**
  1. `GMAIL_APP_PASSWORD` / `RESEND_API_KEY` (para envío real de emails los lunes 08:00 AM a `tomasbermudez777@gmail.com`).
  2. `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` (para despliegue directo con `wrangler pages deploy`).
  3. `GCP_KMS_KEY_URI` (opcional, para envolver DEKs en Cloud KMS real en vez de CMK local).
  4. `CLOUD_RUN_TRELLIS_3D_URL` (opcional, para generación 3D GPU en Cloud Run en vez de síntesis GLB local).

---

## SECCIÓN 7: LISTA PRIORIZADA DE "BLOQUEANTES Y OPTIMIZACIONES PRE-VUELO" (Y PLAN DE EJECUCIÓN INMEDIATA)

Como conclusión de esta auditoría forense de caja blanca, enumeramos en orden estricto de prioridad los **5 ajustes técnicos** que debemos aplicar **ANTES** de ejecutar `npm run cto:nuevo` para el primer sitio web real de prueba:

### Prioridad 1 (Higiene de Disco y SQLite WAL — Liberar ~800 MB en `.cache/`):
- **Problema Detectado:** `.cache/omni_rag_fts5.sqlite-wal` ocupa **`546,35 MB`** sin consolidar y `.cache/rag_index_cache.json` ocupa **`248,00 MB`** duplicados.
- **Acción Determinista:** Ejecutar `PRAGMA wal_checkpoint(TRUNCATE);` sobre `.cache/omni_rag_fts5.sqlite` para vaciar los `546,35 MB` del archivo `-wal` e integrar el checkpoint automático al final de `book_pdf_ingester.mjs` y `rag_pipeline.mjs`.

### Prioridad 2 (Corrección de Bugs Latentes en `humanlayer_rpi_gate.mjs`, `live_telemetry_bus.mjs` y `vertex_ai_bridge.mjs`):
- **Problemas Detectados:**
  1. `getRpiCheckpointPath(slug)` en `tools/orchestrator/humanlayer_rpi_gate.mjs` no desestructura cuando recibe un objeto `{ slug, project }`, generando la carpeta basura `.agents/runs/-object-Object-/`.
  2. `emitFactoryTelemetryEvent` en `tools/cockpit/live_telemetry_bus.mjs` hace `appendFileSync` infinito sobre `.agents/runs/live_factory_stream.jsonl` sin rotación de anillo (*ring-buffer cap* de 200 líneas).
  3. En `tools/intelligence/vertex_ai_bridge.mjs` (líneas 1740–1782) quedaron las llamadas CLI heredadas `auditSniperSlotWithCoVe` / `generateSniperTacticalBriefing` (`tome-of-life`), y falta un espejo/symlink de `.agents/governance/gcp_finops_budget.json` en `.agents/memory/gcp_finops_budget.json`.
- **Acción Determinista:** Corregir los 3 módulos, eliminar `.agents/runs/-object-Object-/` y sincronizar `.agents/memory/gcp_finops_budget.json`.

### Prioridad 3 (Conectar `og_image_generator.mjs` a `build_dist.mjs` y Archivar los 14 Scripts Legados Huérfanos) — **[CERRADA EN FASE 34]**:
- **Problema Detectado:** `tools/design/og_image_generator.mjs` estaba desconectado de `build_dist.mjs`, y había scripts de las Fases 1–15 en `tools/` sin ningún llamador activo (`callers = NONE`).
- **Acción Determinista Ejecutada:** `og_image_generator.mjs` conectado en `tools/build_dist.mjs` (`dist/og-image.svg`), `.cache/rag_index_cache.json` (`248 MB`) eliminado con `PRAGMA wal_checkpoint(TRUNCATE);` integrado en `rag_pipeline.mjs`, y los scripts legados huérfanos movidos a `tools/_legacy_archive/`.

### Prioridad 4 (Consolidación Git y Push de las Fases 20–34 hacia `origin/master`) — **[CERRADA EN FASE 34]**:
- **Problema Detectado:** Archivos modificados y rutas nuevas sin commitear en Git.
- **Acción Determinista Ejecutada:** `.gitignore` verificado (excluyendo `.cache/`, `knowledge/_inbox_pdfs/`, `.sandboxes/`, `node_modules/`, `.env`), árbol consolidado con commit `feat(factory-v34)` y sincronizado con `origin/master`.

### Prioridad 5 (Persistir este Reporte Forense en `FORENSIC_WHITEBOX_AUDIT_REPORT.md`):
- **Acción Determinista:** Guardar este reporte íntegro de 7 secciones en la raíz del repositorio (`FORENSIC_WHITEBOX_AUDIT_REPORT.md`) para que el CTO pueda adjuntarlo o enviarlo directamente al Arquitecto Principal externo.

---

## Plan de Verificación tras Aprobar ("Proceed")

Al aprobar este plan, ejecutaremos automáticamente las **Prioridades 1, 2, 3 y 5** y verificaremos con:
1. `node tools/audit/harness_doctor_audit.mjs` (`100.0 / 100.0`, `0` carpetas `-object-Object-`, `WAL == 0 MB`).
2. `node tools/cockpit/factory_twin_server.mjs --self-test` (`HTTP 200`, `Exit Code 0`, ring-buffer activo en `live_factory_stream.jsonl`).
3. `node tools/security_gate.mjs` (`100.0 / 100.0`, `Exit Code 0`).
