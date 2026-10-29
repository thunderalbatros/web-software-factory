# TRATADO MAESTRO 2026: DOCUMENTACIÓN OFICIAL DE JEV / BAML (`BoundaryML`), CURSOS, LIBROS, PAPERS Y EL PIPELINE DE MEMORIA COGNITIVA DE 5 CAPAS GOBERNADO POR JEV

> **Categoría:** `knowledge/software_factory/`  
> **Versión:** `2026.10-v38` `[VERIFICADO: BoundaryML Official Docs, MemGPT/Letta, Zep/Graphiti, HippoRAG, A-Mem, ReMe, Sleep-Time Compute, ACT-R & Soar, 2026-10-29]`  
> **Propósito:** Referencia técnica integral para que los 9 roles de agentes de `web-software-factory` comprendan, configuren, integren y manipulen **JEV (*Judge-Evaluator-Verifier*)**, **BAML (*Boundary Application Modeling Language*)** y el **Pipeline de Memoria Cognitiva de 5 Capas** (`tools/intelligence/jev_memory_pipeline.mjs`).

---

## 1. DOCUMENTACIÓN PÚBLICA INTEGRAL DE JEV Y BAML (`BoundaryML`)

### 1.1 Fundamentos de BAML (*Boundary Application Modeling Language*) y su Motor SAP (*Schema-Aligned Parsing*)
BAML (creado por **BoundaryML**, liderado por Vaibhav Gupta y Aaron Villalpando) es un lenguaje de dominio específico (DSL) diseñado para transformar llamadas estocásticas a LLMs en **funciones deterministas con contratos de tipos estrictos**.

1. **El Problema de los Prompts Basados en Strings y `JSON Mode` Tradicional:**
   - Forzar un LLM mediante `response_format: { type: "json_object" }` o inyectar esquemas JSON Schema verbosos de `1,200+ tokens` degrada el razonamiento del modelo (*Format-Induced Reasoning Degradation*), infla el costo de tokens de entrada entre un `40%` y un `75%`, y falla cuando el modelo incluye texto conversacional previo (`"Claro, aquí tienes el JSON:"`), comas finales (*trailing commas*), comillas simples o bloques Markdown truncados.
2. **Gramática de Tipos Compacta BAML (`-60% a -75%` Tokens de Esquema):**
   - En lugar de enviar un JSON Schema verboso con `$schema`, `additionalProperties` y `properties` anidadas, BAML compila la definición de salida a una gramática algebraica compacta estilo TypeScript/Rust:
     ```text
     type JevMemoryAdmissionVerdict {
       predicateId: "jev-memory-write-admission-gate"
       loopScope: "MEMORY_PIPELINE_WRITE_GATE"
       choice: "COMMIT_GLOBAL_INVARIANT" | "ISOLATE_TO_PROJECT_SCOPE" | "SUPERSEDE_CONFLICTING_FACT" | "DROP_TRANSIENT_NOISE" | "QUARANTINE_POISONING_RISK" | "NOUL"
       score: int(0..100)
       abstained: bool
       noulReason: string?
       supersededFactId: string?
       evidence: string[]
       requiresCodeOwnerRole: "security-engineer" | "edge-fullstack-architect" | "qa-auditor" | "none"
     }
     ```
3. **Algoritmo `SAP` (*Schema-Aligned Parsing*) en `< 1ms` a Costo `$0.00`:**
   - SAP es un parser determinista tolerante a fallos basado en distancia de edición sobre el AST de tipos destino:
     - **Paso 1:** Extrae el bloque estructural principal eliminando preámbulos conversacionales y cercas Markdown (`` ```json ``).
     - **Paso 2:** Elimina comentarios de línea (`// ...`) y de bloque (`/* ... */`).
     - **Paso 3:** Repara claves sin comillas (`choice: "NOUL"` $\rightarrow$ `"choice": "NOUL"`), comillas simples y comas finales antes de `}` o `]`.
     - **Paso 4:** Balancea llaves `{}` y corchetes `[]` truncados y valida contra el esquema estricto (`Valibot` `v.strictObject` en nuestra fábrica) sin realizar ningún reintento de red al LLM (`0` tokens extra).

### 1.2 Predicados Deterministas (`@@assert`, `@@check`), Bloques `test` y Arquitectura JEV (`Choice | Score | Noul`)
En el ecosistema BAML y en nuestra arquitectura **JEV (*Judge-Evaluator-Verifier*)**:

1. **Aserciones Deterministas en el Esquema (`@@assert` y `@@check`):**
   - `@@assert`: Condición invariante dura evaluada determinísticamente tras el parseo SAP. Si falla, el resultado es rechazado de inmediato antes de llegar al código de aplicación:
     ```baml
     class JevVerdict {
       choice VerdictChoice
       score int @assert(valid_range, {{ this >= 0 and this <= 100 }})
       abstained bool
       noulReason string?
       @@assert(noul_consistency, {{ (this.choice == "NOUL") == this.abstained }})
     }
     ```
   - `@@check`: Verificación no bloqueante que adjunta telemetría de calidad sin abortar la transacción.
   - **Bloques `test <Nombre>`:** Permiten ejecutar pruebas deterministas offline sobre funciones y predicados con casos sintéticos y de regresión (*Fail-to-Pass* y *Pass-to-Pass*).
2. **Los 4 Principios del Patrón JEV (`Judge-Evaluator-Verifier`) en Producción:**
   - **Principio 1 — Prohibición de Jueces de Texto Libre:** Un juez LLM nunca debe devolver prosa abierta ni escalas flotantes ambiguas. Debe estar restringido a un predicado categórico acotado (`Choice`).
   - **Principio 2 — Opción Obligatoria de Abstención Explícita (`NOUL` / `ABSTAIN_INSUFFICIENT_EVIDENCE`):** Cuando el diff, traza o candidato a memoria carece de contexto suficiente, el juez está obligado a abstenerse (`choice: "NOUL"`, `abstained: true`) en lugar de adivinar o alucinar.
   - **Principio 3 — Caché Direccionado por Contenido (`SHA-256` en `< 0.5ms` a `$0.00`):** Antes de emitir cualquier llamada HTTP a `JEV_API_BASE_URL`, se calcula `sha256(predicateId + "::" + normalizedPayload)` y se consulta `.agents/memory/jev_decision_cache.json`.
   - **Principio 4 — Aislamiento Presupuestario Total (`Independent FinOps Ledger`):** JEV utiliza `JEV_API_KEY`, `JEV_API_BASE_URL` y `JEV_MODEL` desde `.env`, contabilizados en `.agents/memory/jev_finops_ledger.json` con tope diario (`dailyJevBudgetUsd: 0.50`), 100% separados del presupuesto de inferencia principal.

---

## 2. SÍNTESIS TRANSVERSAL DE VIDEO CURSOS Y CONFERENCIAS (YOUTUBE & PLATAFORMAS PÚBLICAS)

### 2.1 Conferencias y Talleres de Vaibhav Gupta (`BoundaryML / BAML`)
1. ***"BAML: A New Programming Language for Building Agents"* (AI by the Bay / Open Source Summit / dotAI):**
   - **Lección Central:** Tratar los prompts como funciones tipadas de primera clase (igual que TypeScript transformó a JavaScript).
   - **Patrón de Ingeniería:** Descomponer mega-prompts monolíticos en micro-funciones tipadas con esquemas pequeños y verificables. Cuando el esquema de salida es pequeño y explícito, modelos pequeños y rápidos alcanzan o superan la precisión estructural de modelos frontera pesados.
2. ***"Supercharged Structured Outputs for AI Agents"* (O'Reilly AI Superstream):**
   - **Lección Central:** Separar la generación semántica del formateo sintáctico mediante **Schema-Aligned Parsing (`SAP`)**.
   - **Configuración Práctica:** En vez de reintentar una llamada HTTP cuando un modelo falla un campo JSON, reparar determinísticamente el AST de salida y aplicar validadores `@@assert`.
3. ***"AI Evals for Engineers: LLM-as-a-Judge & Critique-Shadowing"* (Hamel Husain & Shreya Shankar):**
   - **Lección Central (*Who Validates the Validators?*):** Los puntajes del 1 al 5 en jueces LLM sufren deriva severa; los predicados binarios o categóricos acotados con criterios de evidencia explícitos (`evidence: string[]`) logran más del `92%` de concordancia con ingenieros humanos principales (*Principal Engineers*).

### 2.2 Conferencias y Talleres sobre Memoria Agéntica (`MemGPT/Letta`, `Zep/Graphiti`, `DeepLearning.AI`)
1. **Charles Packer — *"Stateful Agents: Full Workshop with MemGPT / Letta"* (AI Engineer Workshop) & DeepLearning.AI *"LLMs as Operating Systems: Agent Memory"*:**
   - **Jerarquía de Memoria tipo Sistema Operativo:**
     - **RAM / Core Memory (`In-Context Working Blocks`):** Bloques pequeños, estructurados y siempre visibles en el prompt del sistema (`persona`, `human_cto_profile`, `active_project_constraints`).
     - **Disco / Recall & Archival Memory (`Out-of-Context Storage`):** Historial completo de episodios y base de conocimiento paginada hacia adentro solo bajo demanda mediante herramientas (`archival_memory_search`, `omni_rag_fusion_crag`).
   - **Autogestión Controlada:** Los agentes no escriben libremente en archivos planos; invocan operaciones transaccionales de memoria (`memory_append`, `memory_replace`, `memory_supersede`) gobernadas por invariantes.
2. **Zep & Graphiti Engineering Tutorials — *"Temporal Knowledge Graphs for Agent Memory"*:**
   - **Por qué falla el RAG estático en agentes de largo plazo:** En una fábrica de software, las decisiones cambian con el tiempo (por ejemplo, el CTO cambia una regla o se depreca una librería). Si ambos hechos conviven en un índice vectorial plano sin validez temporal, el agente sufre **esquizofrenia contextual** al recuperar simultáneamente la regla vieja y la nueva.
   - **Solución Bitemporal Graphiti:** Cada nodo o arista semántica almacena dos intervalos de tiempo:
     - **Tiempo de Validez del Hecho:** $[t_{\text{valid\_from}}, t_{\text{valid\_until}}]$.
     - **Tiempo de Transacción en el Sistema:** $[t_{\text{created\_at}}, t_{\text{superseded\_at}}]$ junto con el puntero `superseded_by`.

---

## 3. SÍNTESIS TRANSVERSAL DE LIBROS Y PAPERS CIENTÍFICOS SOBRE ARQUITECTURAS DE MEMORIA

### 3.1 Libros Fundacionales de Ciencia Cognitiva Aplicada a Agentes
1. **John R. Anderson — *How Can the Human Mind Occur in the Physical Universe?* (`Arquitectura Cognitiva ACT-R`):**
   - Divide la cognición en **Memoria Declarativa** (*chunks* de hechos semánticos) y **Memoria Procedural** (reglas de producción `IF condición THEN acción`).
   - **Ecuación de Activación Base (*Base-Level Learning & Decay*):** La utilidad de un fragmento de memoria $i$ depende de la frecuencia y recencia de sus usos exitosos:
     $$B_i = \ln \left( \sum_{j=1}^{n} t_j^{-d} \right)$$
     donde $t_j$ es el tiempo transcurrido desde el $j$-ésimo uso exitoso y $d \approx 0.5$ es la tasa de decaimiento. En `web-software-factory`, esta ley fundamenta el puntaje de utilidad en `.agents/memory/skill_quality_records.json` para priorizar skills con alta tasa de éxito y podar reglas obsoletas.
2. **John E. Laird — *The Soar Cognitive Architecture* (MIT Press):**
   - Introduce el mecanismo de **Universal Subgoaling & Chunking**: cuando un agente encuentra un *impasse* (por ejemplo, un fallo en una compuerta de auditoría o un conflicto de especificación) y logra resolverlo, **Soar compila ("chunks") la traza de resolución episódica en una nueva regla procedural rápida**, de modo que si el mismo problema vuelve a ocurrir en el futuro, el agente aplica la regla compilada en un solo paso sin repetir la búsqueda costosa.
   - En nuestra fábrica, este mecanismo exacto es ejecutado por el par `failure_events.jsonl` (firma determinista $\phi$) $\rightarrow$ `jev-sleeptime-memory-consolidator` $\rightarrow$ `.agents/memory/instincts/<id>.md`.

### 3.2 Papers Científicos SOTA (2024–2026)
1. **Packer et al. (2023/2024) — *MemGPT: Towards LLMs as Operating Systems*:** Paginación explícita entre contexto caliente (`HOT`) y almacenamiento frío (`COLD`) mediante llamadas a funciones.
2. **Rasmussen et al. (2025) — *Zep: A Temporal Knowledge Graph Architecture for Agent Memory*:** Formalización del motor **Graphiti** con invalidación bitemporal de hechos contradictorios sin pérdida de trazabilidad histórica.
3. **Gutierrez et al. (NeurIPS 2024) — *HippoRAG: Neurobiologically Inspired Long-Term Memory for Large Language Models*:** Modela el hipocampo como un índice asociativo que ejecuta *Personalized PageRank (PPR)* sobre el grafo de entidades y símbolos para conectar consultas multi-salto en una sola pasada.
4. **Xu et al. (2025) — *A-Mem: Agentic Memory for LLM Agents*:** Organización dinámica estilo *Zettelkasten* donde cada nueva memoria genera etiquetas estructuradas, enlaces semánticos hacia memorias previas y evoluciona el vecindario de conocimiento.
5. **Alibaba / ACL (2025) — *ReMe: Memory of Memory & Self-Evolving Procedural Skill Pools*:** Trata la memoria procedural como un pool evolutivo gobernado por **destilación multifacética** y **poda basada en utilidad (*Utility-Based Pruning*)**.
6. **Lin et al. (2025) — *Sleep-Time Compute: Beyond Inference-Time Scaling for Stateful Agents*:** Demuestra que ejecutar un ciclo de consolidación asíncrono ("durante el sueño" o al cerrar sesión con `cto:aterrizar`) que reorganiza, desduplica, abstrae y pre-calcula invariantes desde las trazas crudas reduce la latencia de inferencia en vivo en más de un `55%` y eleva la precisión en tareas de horizonte largo.
7. **Zhou et al. (ICLR 2026) — *ToM-SWE: User Mental Modeling for Software Engineering Agents*:** Modela al usuario/CTO en 3 niveles jerárquicos (`tier1_cleaned_signals`, `tier2_session_analyses`, `tier3_overall_user_model`), complementado en nuestra fábrica con el **Aislamiento Estricto de Estética por Proyecto (`projectSpecificAestheticChoices` vs. `engineeringAndQualityPreferences`)**.

---

## 4. ARQUITECTURA E IMPLEMENTACIÓN DEL MEMORY PIPELINE DE 5 CAPAS GOBERNADO POR JEV EN `web-software-factory`

### 4.1 Las 5 Capas Físicas del Pipeline en nuestro Repositorio
1. **Capa 1 — Working Memory (`Hot Context <= 3,500 tokens`):**
   - Implementada en `tools/intelligence/context_budget.mjs`.
   - Mantiene el prefijo inmutable `CacheAligner` (`AGENTS.md` + `CONSTRAINTS.md`), las reglas activas (`valid_until === null`) y comprime tablas de estado con formato **TOON (*Token-Oriented Object Notation*)** ahorrando un `57.6%` de tokens.
2. **Capa 2 — Episodic Memory (`Chronological Trace & Failure Buffer`):**
   - Implementada en `.agents/runs/live_factory_stream.jsonl`, `.agents/memory/forensic_action_traces.jsonl` y `.agents/memory/failure_events.jsonl`.
   - Cada fallo de auditoría genera una firma determinista no-LLM $\phi = \text{sha256}(\text{guardName} :: \text{errorType} :: \text{component})$.
3. **Capa 3 — Semantic Memory (`Bitemporal Fact Graph & Isolated Project DNA`):**
   - Implementada en `.agents/memory/temporal_ledger.json`, `memory/tom_swe_model.json` y `.agents/memory/project_dna_fingerprints.json`.
   - Separa estrictamente invariantes universales de ingeniería (`engineeringAndQualityPreferences`) de decisiones visuales/morfológicas de un cliente particular (`projectSpecificAestheticChoices[projectSlug]`).
4. **Capa 4 — Procedural Memory (`Self-Evolving Skills & Instincts`):**
   - Implementada en `.agents/skills/*/SKILL.md`, `.agents/memory/instincts/*.md` y `.agents/memory/skill_quality_records.json`.
5. **Capa 5 — Associative & Prospective Memory (`Beads + Omni-RAG v5 SQLite FTS5 + AST Graph`):**
   - Implementada en `.agents/beads/task_graph.jsonl`, `.cache/omni_rag_fts5.sqlite` (`RAG Fusion RRF + CRAG`) y `.agents/memory/codebase_ast_graph.json` (`PageRank RepoMap`).

### 4.2 ¿Cómo Gobierna JEV el Memory Pipeline (`tools/intelligence/jev_memory_pipeline.mjs`)?
En `tools/intelligence/jev_memory_pipeline.mjs`, JEV actúa como el **Controlador Determinista de Admisión y Consolidación** mediante dos operaciones principales:

1. **Operador 1 — Compuerta de Admisión de Escritura (`evaluateMemoryWriteAdmissionWithJev`):**
   - Ningún agente ni comando puede escribir directamente en la Memoria Semántica o Procedural sin pasar por esta compuerta:
     - **Paso A (`OWASP ASI06 Guard`):** Bloquea cualquier intento de inyección de comandos, evasión de compuertas (`disable security_gate`, bajar `CONSTRAINTS.md`) o *prompt injection*.
     - **Paso B (`Aesthetic Scope Detector`):** Si el hecho candidato menciona morfología visual específica (`gridTopology`, `heroArchitecture`, `border-radius`, paleta cromática o tipografía de un cliente), el predicado devuelve obligatoriamente `choice: "ISOLATE_TO_PROJECT_SCOPE"`, confinándolo a `projectSpecificAestheticChoices[projectSlug]` para que jamás contamine futuros sitios de otros clientes.
     - **Paso C (`Bitemporal Conflict & Redundancy Check`):** Compara el candidato contra las reglas activas (`valid_until === null`) en `temporal_ledger.json`. Si es redundante (similitud $\ge 0.85$), devuelve `DROP_TRANSIENT_NOISE`. Si actualiza una regla previa del mismo tema, devuelve `SUPERSEDE_CONFLICTING_FACT` indicando el `supersededFactId` exacto para sellar `valid_until = now` y `superseded_by = newId`. Si es un invariante de ingeniería nuevo y respaldado por evidencia, devuelve `COMMIT_GLOBAL_INVARIANT`.
2. **Operador 2 — Ciclo de Consolidación Sleep-Time (`runJevSleepTimeConsolidationCycle`):**
   - Se ejecuta automáticamente durante `npm run cto:aterrizar`, `npm run cto:aprender` o `npm run cto:memoria-jev`:
     - Escanea las trazas episódicas y eventos de fallo ($\phi$) en `.agents/memory/failure_events.jsonl`.
     - Destila clústeres de fricción recurrentes en tarjetas de *Instinct* procedural dentro de `.agents/memory/instincts/` (*Soar Chunking*).
     - Ejecuta poda basada en utilidad (*ReMe Utility Pruning*): archiva reglas invalidadas en el registro histórico frío y verifica que el presupuesto de memoria activa se mantenga limpio y libre de contradicciones.
