---
title: "CANON: JEV Official API Client, BAML Schema-Aligned Parsing (SAP), PageRank RepoMap Context Engineering & Fullstack Harness Engineering (2026)"
category: "software_factory"
epistemicTier: "TIER_1_SOTA_2026"
authorityBoost: 1.35
updatedAt: "2026-10-29T13:46:55.842Z"
---

# CANON: JEV JUDGE-EVALUATOR BOUNDED PREDICATES, BAML SCHEMA-ALIGNED PARSING (SAP), PAGERANK REPOMAP CONTEXT ENGINEERING & FULLSTACK HARNESS ENGINEERING (2026)

> **Epistemic Tier:** `TIER_1_SOTA_2026` (`Authority Boost: x1.35`)  
> **Source Vault:** `C:\Users\tomas\Desktop\streamerbot\references\sota-2026\context-and-harness-engineering-2026\` (`BoundaryML/baml` & `dubzzz/fast-check`)  
> **Linked Modules:** `tools/intelligence/jev_semantic_gate.mjs`, `tools/audit/local_fullstack_and_component_harness.mjs`, `tools/intelligence/codebase_ast_indexer.mjs`, `tools/intelligence/context_budget.mjs`, `tools/intelligence/mcp_omni_rag_server.mjs`  
> **Operational Skill:** `.agents/skills/jev-context-and-harness-engineering/SKILL.md`

---

## 0. Bóveda Local Zero-Copy y Documentación Oficial Cosechada (MarkItDown)

### 0.1 Repositorios en `sota-2026/context-and-harness-engineering-2026`

| Repositorio | Estado en Bóveda | Archivos de Especificación | Secciones Extraídas |
| :--- | :---: | :--- | :--- |
| `baml` | `VERIFIED_ON_DISK` | `baml, baml-cli, baml_language, baml_language.code-workspace, CHANGELOG.md, ci` | BoundaryML/baml • Motor de Schema-Aligned Parsing (SAP), prompts tipados y arquitectura de |
| `fast-check` | `VERIFIED_ON_DISK` | `AI_POLICY.md, CODE_OF_CONDUCT.md, CONTRIBUTING.md, examples, LICENSE, package.json` | dubzzz/fast-check • Framework de Property-Based Testing en JavaScript/TypeScript (Arbitrarie |

### 0.2 Fuentes Oficiales de Context & Harness Engineering (`CONTEXT_AND_HARNESS_OFFICIAL_URLS`)

| ID | URL Oficial | Mirror en Bóveda | Ahorro de Tokens | Axiomas Destilados (MarkItDown) |
| :--- | :--- | :--- | :---: | :--- |
| **boundaryml-baml-sap-and-jev** | `https://docs.boundaryml.com/` | `context-and-harness-engineering-2026/baml` | `-70% tokens` | Schema-Aligned Parsing (SAP): deterministic AST recovery in < 1ms ($0.00 cost) that repairs unquoted keys, trailing commas, markdown fences, and conversational preambles before strict validator execution. Compact TypeScript/BAML type grammar: reduces prompt schema token overhead by 60%–75% compared to verbose JSON Schema. JEV (Judge-Evaluator Bounded Predicates): strictly bounded Choice | Score | Noul predicates with explicit abstention (NOUL / ABSTAIN_INSUFFICIENT_EVIDENCE) isolated to the Outer Loop (pre-merge git diff) and Meta Loop (cross-trace friction mining). |
| **aider-repomap-pagerank-ast** | `https://aider.chat/docs/repomap.html` | `final-frontier-2026/cocoindex-code` | `-72.5% tokens` | Builds a directed symbol/file reference graph from AST definitions (exports, classes, functions) and call/import edges. Computes Personalized PageRank centrality weighted by active ticket seed files to extract the top 15 most relevant signatures in < 600 tokens. Emits exact file:Lstart-Lend surgical coordinates to maximize KV prompt cache hits and eliminate blind grep/full-file reads. |
| **fast-check-property-based-testing** | `https://fast-check.dev/` | `context-and-harness-engineering-2026/fast-check` | `-65% tokens` | Generates adversarial edge-case vectors (0, -1, NaN, Infinity, empty strings, 250-char unbroken tokens, Unicode RTL/zero-width, SQLi/XSS payloads) via composable Arbitraries. Verifies mathematical and domain invariants (e.g., monetary totals >= 0, idempotent webhook replay count === 1, tenant RLS isolation) across 50+ deterministic seeds. Automatically shrinks failing inputs to the minimal counterexample for zero-ambiguity self-healing. |

---

## 1. Configuración, Arquitectura y Uso de `JEV` (`Judge-Evaluator Bounded Predicates`)

### 1.1 Variables de Entorno Independientes de GCP y Libro Mayor Propio
El cliente nativo de la API oficial de `JEV` (`tools/intelligence/jev_semantic_gate.mjs`) opera con credenciales y presupuesto **100% separados de Google Cloud Platform (GCP)** para proteger los `$90.00 USD` de Vertex AI:
- **Variables en `.env`:**
  - `JEV_API_KEY`: Clave de autenticación dedicada para la API oficial de `JEV`.
  - `JEV_API_BASE_URL`: Endpoint HTTP oficial (por defecto `https://api.boundaryml.com/v1/jev/evaluate`).
  - `JEV_MODEL`: Modelo evaluador acotado (por defecto `jev-judge-2026-v1`).
- **Caché Determinista `SHA-256` (`.agents/memory/jev_decision_cache.json`):**
  Antes de realizar cualquier petición HTTP a `JEV_API_BASE_URL`, `callOfficialJevApi()` calcula `sha256(predicateId + "::" + normalizedDiffOrTrace + "::" + specSignature)`. Si el hash ya fue evaluado previamente, devuelve el veredicto en **`< 0.5 ms`** con costo **`$0.00`** (`cacheHit: true`).
- **Libro Mayor FinOps Independiente (`.agents/memory/jev_finops_ledger.json`):**
  Cada invocación real registra `timestamp`, `predicateId`, `latencyMs`, `tokensUsed`, `costUsd` y verifica el tope protector diario `dailyJevBudgetUsd: 0.50`. Si `JEV_API_KEY` no está presente en `.env` (ej. entorno CI offline), conmuta limpiamente a `provider: "LOCAL_FALLBACK_NO_JEV_API_KEY"` frente a `provider: "OFFICIAL_JEV_API"`.
- **Comando Ejecutivo de Estado:** `npm run cto:auditar-jev -- --status` y `node tools/intelligence/jev_semantic_gate.mjs --self-test`.

### 1.2 Diseño de Predicados `JEV` (`Choice | Score | Noul`) y Regla de Abstención Explícita (`NOUL`)
Siguiendo la arquitectura de **BoundaryML / HumanLayer / Warp Factories**:
1. **Prohibición en el *Inner Loop*:** Nunca invocar un predicado `JEV` durante la edición línea por línea (`Inner Loop < 1s`, que pertenece exclusivamente a `oxlint` + `ast_guard.mjs`).
2. **Ubicación Estricta en *Outer Loop* y *Meta Loop*:**
   - **`Outer Loop` (Pre-Merge `git diff`):** Evalúa diffs completos contra `SPEC.md` y fronteras de seguridad antes de fusionar o abrir compuerta HITL.
   - **`Meta Loop` (Minería de Fricción en Trazas):** Analiza `.agents/memory/forensic_action_traces.jsonl` y `.agents/runs/live_factory_stream.jsonl` para detectar bucles o herramientas defectuosas y registrarlos en `skill_quality_ledger.mjs`.
3. **Opción Obligatoria de Abstención Explícita (`NOUL / ABSTAIN_INSUFFICIENT_EVIDENCE`):**
   Todo predicado `JEV` debe incluir el valor `"NOUL"` (con alias `"ABSTAIN_INSUFFICIENT_EVIDENCE"`) en su enumeración `Choice`. Si el `git diff` o la traza carece de contexto suficiente (por ejemplo, un diff truncado o sin archivo `SPEC.md` asociado), el evaluador **debe abstenerse (`NOUL`)** en lugar de alucinar un falso positivo o falso negativo.
4. **Los 4 Predicados Canónicos de la Fábrica:**
   - `jev-persisted-state-and-env-owner-gate`: `Choice: ["SAFE_INTERNAL_CHANGE", "REQUIRES_HUMAN_CODE_OWNER_REVIEW", "NOUL"]` — Detecta mutaciones en tablas SQL/RLS, serialización de estado, variables `.env` o nuevas dependencias externas.
   - `jev-spec-business-invariant-alignment`: `Choice: ["ALIGNED_WITH_SPEC", "INVARIANT_DRIFT_DETECTED", "NOUL"]` + `Score: 0..100` — Verifica que las fórmulas de precios, descuentos y validaciones del diff cumplan `[REQ-01]..[REQ-NN]` de `SPEC.md`.
   - `jev-redundant-test-detector`: `Choice: ["MEANINGFUL_BRANCH_COVERAGE", "REDUNDANT_TAUTOLOGICAL_TEST", "NOUL"]` — Detecta tests tautológicos (`expect(true).toBe(true)`) o duplicados que no ejercitan ramas reales.
   - `jev-cross-trace-friction-miner`: `Choice: ["FRICTION_CLUSTER_IDENTIFIED", "CLEAN_EXECUTION_TRACE", "NOUL"]` — Detecta atascos repetidos entre sesiones en `.agents/memory/forensic_action_traces.jsonl` y `.agents/runs/live_factory_stream.jsonl`.

---

## 2. Algoritmo `BAML Schema-Aligned Parsing (SAP)` y Gramática Compacta de Tipos

### 2.1 Gramática Compacta Estilo TypeScript/BAML (-60% a -75% Tokens de Esquema)
En lugar de inyectar un JSON Schema verboso de 80 líneas en cada prompt, `compileCompactBamlTypePrompt()` expresa el contrato de salida con gramática compacta BAML:
```baml
class JevPredicateVerdict {
  predicateId string
  choice "SAFE_INTERNAL_CHANGE" | "REQUIRES_HUMAN_CODE_OWNER_REVIEW" | "ALIGNED_WITH_SPEC" | "INVARIANT_DRIFT_DETECTED" | "MEANINGFUL_BRANCH_COVERAGE" | "REDUNDANT_TAUTOLOGICAL_TEST" | "FRICTION_CLUSTER_IDENTIFIED" | "CLEAN_EXECUTION_TRACE" | "NOUL"
  score int // 0..100
  noulReason string?
  evidence string[]
  requiresCodeOwnerRole "security-engineer" | "edge-fullstack-architect" | "none"
}
```

### 2.2 Reparador Determinista AST JSON en `< 1 ms` a Costo `$0.00` (`parseWithSchemaAlignedRecovery`)
Antes de validar con `Valibot` (`v.strictObject`), `parseWithSchemaAlignedRecovery(rawOutput, schemaSpec)` ejecuta 5 pases deterministas en memoria (`< 1 ms`, `$0.00`):
1. **Extracción de Preámbulo y Bloques Markdown:** Elimina texto conversacional previo/posterior y desenvuelve bloques ```json ... ``` o ```baml ... ```.
2. **Poda de Comentarios:** Elimina comentarios de línea (`// ...`) y bloque (`/* ... */`) fuera de literales de cadena.
3. **Normalización de Claves Sin Comillas y Comillas Simples:** Convierte `{ choice: 'SAFE_INTERNAL_CHANGE', score: 98, }` en JSON estricto `{"choice": "SAFE_INTERNAL_CHANGE", "score": 98}`.
4. **Eliminación de Comas Finales (*Trailing Commas*) y Balanceo de Delimitadores:** Suprime `,}` / `,]` y cierra llaves/corchetes truncados.
5. **Coerción Alineada al Esquema (*Schema-Aligned Coercion*):** Alinea tipos primitivos (`"98"` -> `98`, enumeraciones en minúsculas a su variante canónica o `"NOUL"`) y valida con `Valibot`.

---

## 3. Protocolo de *Context Engineering* de Alta Densidad para los Agentes Constructores

### 3.1 Cuándo y Cómo Invocar `factory_repomap_pagerank` (`buildPageRankRepoMap`)
- **Cuándo usarlo:** Al iniciar **Ola 1 (`product-spec-architect`, `tech-scout`)** o **Ola 2 (`senior-coder`, `ux-designer`, `edge-fullstack-architect`)** antes de explorar archivos manualmente.
- **Cómo funciona:** Calcula la centralidad *Personalized PageRank* sobre `.agents/memory/codebase_ast_graph.json` ponderando con `x3.0` los archivos semilla del ticket activo (`seedFiles`). Devuelve las **15 firmas centrales en `< 600 tokens`** con punteros exactos `file:Lstart-Lend`.

### 3.2 Cuándo y Cómo Invocar `factory_ast_slice_function` (`sliceTargetFunctionAndCallSites`)
- **Cuándo usarlo:** En **Ola 2** cuando un agente constructor necesita modificar una función específica sin pagar el costo de leer un archivo de 800 líneas.
- **Cómo funciona:** Extrae únicamente el bloque `startLine..endLine` de la función objetivo + sus tipos/constantes locales + hasta 5 puntos de llamada (*call sites*) en el repositorio, ahorrando **`~70% de tokens`**.

### 3.3 Plegado Semántico de Stack-Traces (`foldStackTraceAndNodeModulesNoise`) y `Deferred MCP Schemas`
- **Stack-Trace Folding (`context_budget.mjs`):** Poda todas las líneas internas de `node_modules/` y `node:internal/`, dejando solo los marcos del código propio y guardando el trace original sin pérdida en `.cache/headroom_ccr/<hash>.json` (`headroom_retrieve(hash)`).
- **Hidratación Diferida de Herramientas MCP (`mcp_omni_rag_server.mjs`):** Permite listar herramientas en modo compacto de 1 línea (`name + resumen`) e hidratar el `inputSchema` JSON completo únicamente cuando el agente va a invocar la herramienta.

---

## 4. Protocolo de *Harness Engineering* para E-Commerce, SaaS/ERP y 3D WebGPU (`95+/100`)

### 4.1 Arnés de Componentes Puros en Aislamiento (`runStatelessComponentStressHarness`)
Todo componente visual puro (`Pure Component`: recibe únicamente `props`, sin `fetch` ni `localStorage`) se somete automáticamente a **5 estados extremos de props** en Playwright Chromium:
1. `empty`: Estado vacío limpio con llamada a la acción secundaria.
2. `loading`: Esqueleto con `aspect-ratio` reservado (`CLS = 0.00`).
3. `error-state`: Mensaje de fallo recuperable sin desborde geométrico.
4. `extreme-long-text-250chars`: Cadena continua de 250 caracteres verificando `overflow-wrap: anywhere`, `ZeroOverlap: true` y `horizontalOverflowPx === 0`.
5. `dark-mode`: Tema oscuro perceptual `OKLCH` verificando contraste `APCA Lc >= 60`.

### 4.2 Simulador Local Determinista de Pagos, Auth y Base de Datos (`runLocalEnterpriseAndCommerceSimulator`)
Ejecutado vía `factory_run_local_commerce_rls_harness` a costo `$0.00` en Windows 11:
- **Doble Envío de Webhooks Firmados (Stripe y MercadoPago):** Envía dos veces el mismo payload firmado con `HMAC-SHA256` y la misma `idempotency_key`. Verifica que el cobro se procese **exactamente 1 vez** (cero *Double-Spending*) y el stock se descuente atómicamente (`AtomicDurableStockLock`).
- **Aislamiento Multi-Tenant (`RLS`) y Tokens `Ory Kratos / Keto`:** Verifica que `tenant_alpha` reciba `HTTP 403 Forbidden` al intentar leer/mutar registros de `tenant_beta`, y que el validador JWT acepte únicamente `ES256`/`RS256` rechazando `alg: "none"`.

### 4.3 Fuzzing Basado en Propiedades (`fast-check` 50 Vectores), `AST Diff-Oscillation Breaker` y Watchdog de Histograma 3D
- **50 Vectores Extremos (`runPropertyBasedInvariantsCheck`):** Evalúa `0`, `-1`, `NaN`, `Infinity`, strings vacíos, strings de 250 chars y payloads Unicode/SQLi/XSS contra las invariantes de negocio.
- **Controlador Anti-Oscilación (`agent_squad.mjs`):** Registra el hash estructural del AST en cada ronda de `Self-Healing` para cortar en seco cualquier ciclo `Estado A -> Estado B -> Estado A`.
- **Watchdog de Histograma 3D (`visual_audit.mjs`):** Inspecciona el histograma de píxeles del `<canvas>` 3D en 3 instantes separados (`t0`, `t1`, `t2`) garantizando geometría e iluminación PBR real (`Three.js r186`) y bloqueando pantallas negras o congeladas.

---

## 5. Los 8 Cursos Universitarios e Industriales de Dominio Específico Vinculados al Harness

| # | Curso de Dominio Específico | Institución / Autor | URLs Oficiales | Tratado Canónico Indexado en `knowledge/` | Módulo del Harness Vinculado |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **#1** | **Bases de Datos y Transacciones Atómicas (CMU 15-445 / Andy Pavlo)** | Carnegie Mellon University (Prof. Andy Pavlo) | `https://15445.courses.cs.cmu.edu/` | `knowledge/cybersecurity/CANON_DOMAIN_CMU_15445_MVCC_BTREE_WAL_AND_ATOMIC_TX_2026.md` | `tools/db/dual_database_forge.mjs` |
| **#2** | **Sistemas Distribuidos e Idempotencia en el Borde (MIT 6.5840 / 6.824)** | MIT CSAIL (Prof. Robert Morris & Frans Kaashoek) | `https://nil.csail.mit.edu/6.5840/` | `knowledge/software_factory/CANON_DOMAIN_MIT_65840_DISTRIBUTED_IDEMPOTENCY_AND_DURABLE_OBJECTS_2026.md` | `tools/security/identity_and_commerce_guard.mjs` |
| **#3** | **Diseño de Módulos Profundos e Invariantes (MIT 6.102 + John Ousterhout A Philosophy of Software Design)** | MIT 6.102 & Stanford University (Prof. John Ousterhout) | `https://web.mit.edu/6.102/www/`<br>`https://www.youtube.com/watch?v=bmSAYlu0NcY` | `knowledge/architecture_and_books/CANON_DOMAIN_MIT_6102_OUSTERHOUT_DEEP_MODULES_AND_REP_INVARIANTS_2026.md` | `tools/intelligence/ast_guard.mjs` |
| **#4** | **Gráficos 3D por Computadora y Shaders WebGPU (CMU 15-462 Keenan Crane + WebGPU Fundamentals)** | Carnegie Mellon University (Prof. Keenan Crane) & WebGPU Fundamentals | `https://15462.courses.cs.cmu.edu/`<br>`https://webgpufundamentals.org/` | `knowledge/motion_and_animation/CANON_DOMAIN_CMU_15462_KEENAN_CRANE_AND_WEBGPU_SHADERS_60FPS_2026.md` | `tools/design/shader_and_3d_forge.mjs` |
| **#5** | **Seguridad Web Moderna (Stanford CS253 — Feross Aboukhadijeh)** | Stanford University (Feross Aboukhadijeh) | `https://web.stanford.edu/class/cs253/` | `knowledge/cybersecurity/CANON_DOMAIN_STANFORD_CS253_WEB_SECURITY_SOP_CSP_AND_WEBAUTHN_2026.md` | `tools/audit/security_gate.mjs` |
| **#6** | **Rendimiento Chromium Blink/V8, Accesibilidad y CSS Moderno (Google web.dev/learn)** | Google Chrome Developers (web.dev/learn) | `https://web.dev/learn/performance`<br>`https://web.dev/learn/accessibility`<br>`https://web.dev/learn/css` | `knowledge/ui_ux_design/CANON_DOMAIN_GOOGLE_WEBDEV_CWV_BLINK_V8_A11Y_AND_MODERN_CSS_2026.md` | `tools/audit/ryux_design_gate.mjs` |
| **#7** | **Síntesis Musical y Audio Digital (Stanford CCRMA Music 220a)** | Stanford University CCRMA (Center for Computer Research in Music and Acoustics) | `https://ccrma.stanford.edu/courses/220a/` | `knowledge/motion_and_animation/CANON_DOMAIN_STANFORD_CCRMA_220A_MODAL_SYNTHESIS_AND_PROCEDURAL_AUDIO_2026.md` | `tools/media/sonic_and_music_forge.mjs` |
| **#8** | **Psicología de Conversión y Checkout UX (Baymard Institute & Laws of UX)** | Baymard Institute & Jon Yablonski (Laws of UX) | `https://baymard.com/blog`<br>`https://lawsofux.com/` | `knowledge/ui_ux_design/CANON_DOMAIN_BAYMARD_AND_LAWS_OF_UX_CHECKOUT_CRO_2026.md` | `tools/design/industry_archetype_matrix.mjs` |

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SPLE_ISO26550_AND_SOFTWARE_FACTORIES_ARCHITECTURE_2026]] · [[CANON_ASTRO5_CLOUDFLARE_WORKERS_AND_MODERN_WEB_TEMPLATES_2026]] · [[CANON_MULTI_BRAND_DESIGN_SYSTEMS_DTCG_STYLE_DICTIONARY_AND_ARCHETYPES_2026]] · [[CANON_SOTA_AGENT_TEAM_TOPOLOGY_AND_2026_WEB_STACK_AUDIT]] · #software_factory
