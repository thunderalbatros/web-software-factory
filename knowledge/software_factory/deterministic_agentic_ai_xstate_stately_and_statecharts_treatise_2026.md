# TRATADO MAESTRO 2026: DETERMINISMO EN IA AGÉNTICA, CONFERENCIA "GOODBYE SLOP; WELCOME DETERMINISM" (`Agent Conf 2026`), `XState v5`, `@statelyai/agent`, `Apache Burr` Y STATECHARTS FORMALES

> **Categoría:** `knowledge/software_factory/`  
> **Versión:** `2026.10-v38` `[VERIFICADO: Repositorios clonados statelyai/xstate, statelyai/agent, statelyai/docs, DAGWorks-Inc/burr, langchain-ai/langgraphjs, inngest/agent-kit + Conferencia Agent Conf 2026 (1rMgw0Q5MgY), 2026-10-29]`  
> **Propósito:** Canon técnico exhaustivo para comprender, configurar, integrar y manipular máquinas de estados finitos jerárquicas (*Statecharts*), el Modelo de Actores (**XState v5**), agentes deterministas (**`@statelyai/agent`**), reductores de estado trazables (**Apache Burr**) y máquinas de estado de interfaz de usuario sin estados imposibles en `web-software-factory`.

---

## 1. CONFERENCIA FUNDACIONAL: "GOODBYE SLOP; WELCOME DETERMINISM" — DAVID KHOURSHID (`Agent Conf 2026`)
`[VERIFICADO: Conferencia de David Khourshid, fundador de Stately.ai y creador de XState, https://www.youtube.com/watch?v=1rMgw0Q5MgY, Agent Conf 2026]`

### 1.1 La Trampa del *"Vibe Coding"*, los Megaprompts y la *"Astrología de Prompts"*
En su conferencia magistral de **Agent Conf 2026** (*"Goodbye Slop; Welcome Determinism"*), David Khourshid diagnostica por qué fracasan los sistemas multi-agente construidos sobre bucles `while` abiertos y megaprompts:

1. **La Ilusión de Productividad Inicial y el *"Agent Slop"*:**
   - Delegar el flujo de control (*control flow*) a un LLM dentro de un bucle `while (!done)` con decenas de herramientas parece mágico en una demo de 30 segundos, pero en producción produce ***"Agent Slop"***: el modelo salta pasos obligatorios, invoca herramientas destructivas sin precondiciones, entra en ciclos infinitos de reintento, degrada la ventana de contexto y multiplica por `5x–10x` el gasto de tokens.
2. ***"Prompting Astrology"* (Reglas de Negocio Escritas como Súplicas en Texto):**
   - Escribir en un prompt del sistema `"IMPORTANTE: NUNCA ejecutes el despliegue ni cobres más de $100 sin aprobación humana"` no es una barrera de ingeniería; es una sugerencia probabilística. Ante una inyección de prompt o fatiga de contexto, el modelo inevitablemente violará esa instrucción textual.
   - **Axioma de Khourshid:** *"Las reglas son código, no texto en un prompt. Una regla que vivía únicamente en un system prompt debe convertirse en una guarda determinista (`guard`) sobre la transición que protege"*.

### 1.2 El Principio Arquitectónico Rector: *"Determinism at the Center, Non-Determinism at the Edges"*
La solución no es eliminar la IA generativa, sino invertir la topología de control:

1. **Determinismo en el Centro (*The Core / The Environment*):**
   - El flujo de control, las reglas de negocio, los límites presupuestarios, los permisos de rol, las compuertas de aprobación humana (*HITL*) y el orden estricto de etapas pertenecen al **núcleo determinista** codificado como una **Máquina de Estados Finitos / Statechart (`XState v5`)**.
2. **No-Determinismo en los Bordes (*The Edges / The Policy*):**
   - El LLM es relegado a los bordes para hacer únicamente lo que requiere procesamiento semántico o síntesis creativa: clasificar intención no estructurada, redactar un artefacto dentro de un contrato tipado (`BAML SAP`), o **proponer un evento candidato** dentro de una lista cerrada de opciones permitidas (`allowedEvents`).
   - La máquina de estados central recibe el evento propuesto por el LLM y evalúa sus **guardas deterministas (`guards`)**: si la transición es legal en el estado actual (`snapshot.can(event) === true`), avanza; si no es legal, **rechaza la acción en `< 0.1ms` a costo `$0.00`**, haciendo matemáticamente imposibles las acciones inválidas (*"Make invalid agent actions impossible"*).

---

## 2. DESTILACIÓN DE REPOSITORIOS OFICIALES CLONADOS (`statelyai/agent`, `statelyai/xstate`, `statelyai/docs`, `burr`, `langgraphjs`, `agent-kit`)
`[VERIFICADO: Inspección directa del código fuente clonado en .cache/repos_reference/, 2026-10-29]`

### 2.1 Arquitectura `@statelyai/agent`: Separación Formal entre `Environment` y `Policy`
Del análisis forense de `.cache/repos_reference/stately-agent/docs/environment-and-policy.md` y `.cache/repos_reference/stately-agent/skills/`:

1. **Las Dos Máquinas (`Environment` vs. `Policy`):**
   | Capa | Propietario | Formato | Cuándo Cambia | Cómo se Verifica |
   | :--- | :--- | :--- | :--- | :--- |
   | **Environment** | Humanos (Ingeniería) | Máquina TypeScript/JS (`XState`) con estados, guardas y centinelas de invariantes | Rara vez, solo bajo revisión de código humano | `canReach`, `explorePaths`, pruebas unitarias deterministas sin API keys |
   | **Policy** | Modelo / Agente (supervisado) | `setupAgent` o JSON `AgentWorkflowConfig` que opera dentro del vocabulario del Environment | Entre corridas, solo cuando mejora métricas objetivas en escenarios *held-out* | `verifyAgentConfig` (`validate -> vocabulary -> lower -> lint -> explore`), `replay` y función objetivo |

2. **Centinelas de Invariantes (*Invariant Sentinels*):**
   - Un **Invariant Sentinel** es un estado final especial cuya descripción comienza con `SENTINEL:` (por ejemplo, `SENTINEL_BUILT_WITHOUT_APPROVED_INTERVIEWS` o `SENTINEL_UNSAFE_DEPLOY_WITH_SECURITY_BLOCKERS`), al que se entra mediante una transición automática sin evento (`always`) desde un estado con efectos secundarios si se viola una invariante.
   - Como XState evalúa las transiciones `always` **antes** de ejecutar cualquier `invoke` o acción de efecto secundario, el efecto peligroso jamás llega a ejecutarse, y el test de verificación formal (`canReach(environment, "SENTINEL_...") === false`) demuestra matemáticamente que ninguna política puede alcanzar el estado prohibido.
3. **Eventos Exclusivos de Humanos (`meta: { actor: "human" }`):**
   - Las transiciones que requieren autorización humana explícita (como aprobar la Entrevista #1 PRD, aprobar la Entrevista #2 SPEC o aprobar la entrega final HITL) se etiquetan con `meta: { actor: "human" }`.
   - El filtro de decisiones (`decideNext` / `validateAgentPolicyProposal`) excluye automáticamente de `allowedEvents` cualquier transición con `meta.actor === "human"`, impidiendo por construcción que un agente autónomo se auto-apruebe una compuerta humana.
4. **Tabla Oficial de Conversión `Loop-to-Machine` (`skills/loop-to-machine/SKILL.md`):**
   - **Herramienta con efecto secundario que requiere permiso:** Se convierte en un `actor` invocado por un estado específico al que solo se entra a través de una transición protegida por un `guard`.
   - **Regla en un `if` o línea en un prompt del sistema:** Se convierte en una función pura `guard` exportada y testeable unitariamente.
   - **Pasos que toda corrida correcta debe ejecutar en el mismo orden:** Se convierten en una secuencia determinista de estados donde la máquina avanza por sí misma sin preguntarle al LLM qué hacer después.
   - **Límite de reintentos (`repairAttempts < 2`):** Se convierte en un estado de decisión `always` con guarda contra una constante exportada (`MAX_REPAIR_ATTEMPTS = 2`).
   - **Aprobación humana (`await approve()`):** Se convierte en un estado inactivo (`idle`) con `meta.interaction` e `meta.actor = "human"`, persistiendo el snapshot del actor en disco hasta que el humano envíe el evento de aprobación.

### 2.2 Primitivas de Configuración y Manipulación de `XState v5` (`statelyai/xstate` & `statelyai/docs`)
En `XState v5` (instalado en `package.json`), las máquinas de estados y actores se construyen y manipulan con las siguientes primitivas canónicas:

1. **`setup({ types, guards, actions, actors })` + `.createMachine(...)`:**
   - Separa limpiamente la implementación de las guardas puras (`guards`), efectos de asignación de contexto (`assign`) y actores asíncronos (`fromPromise`, `fromCallback`) de la topología del grafo de estados:
     ```javascript
     import { setup, createActor, assign } from 'xstate';

     const factoryMachine = setup({
       guards: {
         isGate1Approved: ({ context }) => context.gate1Status === 'COMPLETED_BY_CTO',
         isGate2Approved: ({ context }) => context.gate2Status === 'COMPLETED_BY_CTO',
         canRetryRepair: ({ context }) => context.repairAttempts < 2
       },
       actions: {
         incrementRepairCount: assign({
           repairAttempts: ({ context }) => context.repairAttempts + 1
         })
       }
     }).createMachine({
       id: 'webSoftwareFactoryLifecycle',
       initial: 'gate1_prd_pending',
       context: ({ input }) => ({
         projectSlug: input.projectSlug,
         gate1Status: input.gate1Status || 'PENDING_CTO_PRD_INPUT',
         gate2Status: input.gate2Status || 'PENDING_CTO_SPEC_INPUT',
         repairAttempts: 0
       }),
       states: { /* ... */ }
     });
     ```
2. **Inspección Determinista sin Efectos (`actor.getSnapshot()`, `snapshot.can(event)` y `getNextSnapshot`):**
   - `snapshot.value`: Estado activo actual (simple, jerárquico anidado u ortogonal paralelo).
   - `snapshot.context`: Estado de datos tipado e inmutable.
   - `snapshot.can({ type: 'START_BUILD' })`: Evalúa en `< 0.1ms` (ejecutando las funciones puras `guard` sin disparar efectos secundarios) si el evento `START_BUILD` es aceptado en el estado actual.
3. **Persistencia e Hidratación Durable (`actor.getPersistedSnapshot()` y `createActor(machine, { snapshot })`):**
   - Permite pausar la ejecución de un proyecto (por ejemplo, esperando respuestas del CTO en la Entrevista #1 o #2), guardar el JSON exacto en `.agents/runs/<slug>/xstate_actor_snapshot.json`, y reanudar horas o días después exactamente en el mismo nodo del grafo.

### 2.3 Patrones Complementarios de `Apache Burr`, `LangGraphJS` e `Inngest Agent-Kit`
1. **Apache Burr (`DAGWorks-Inc/burr`):**
   - **Acciones con Contratos Explícitos de Lectura/Escritura (`reads` / `writes`):** Cada nodo declara qué claves del estado lee (`reads: ["prdLean", "brandLock"]`) y qué claves modifica (`writes: ["tokens", "cssPrimitives"]`), produciendo un reductor funcional puro `(state, inputs) => [result, newState]` con auditoría *time-travel* paso a paso.
2. **LangGraphJS (`langchain-ai/langgraphjs`):**
   - **Canales con Reductores Deterministas y Checkpointers:** Evita sobrescrituras accidentales entre agentes paralelos definiendo funciones reductoras explícitas por canal de estado e interrupciones declarativas (`interruptBefore` / `interruptAfter`) para compuertas humanas.
3. **Inngest Agent-Kit (`inngest/agent-kit`):**
   - **Code-Based Routers sobre Estado de Red (`Network State`):** En lugar de un LLM supervisor costoso que decide qué sub-agente habla en cada turno, un enrutador determinista en TypeScript inspecciona el estado compartido de la red y despacha el siguiente agente con latencia cero.

---

## 3. SÍNTESIS TRANSVERSAL DE LIBROS, CURSOS Y PAPERS SOBRE STATECHARTS Y DETERMINISMO

### 3.1 Libros y Papers Clásicos de Ingeniería de Sistemas Reactivos
1. **David Harel (1987) — *"Statecharts: A Visual Formalism for Complex Systems"* (*Science of Computer Programming*):**
   - Resuelve la explosión combinatoria de estados de los autómatas finitos planos ($O(2^n)$) introduciendo tres extensiones matemáticas:
     - **Jerarquía (Estados OR / Compuestos):** Un superestado agrupa subestados que comparten transiciones comunes (por ejemplo, una transición `ABORT_ON_SECURITY_BREACH` definida una sola vez en el superestado `building` aplica automáticamente a `wave1`, `wave2` y `wave3`).
     - **Ortogonalidad (Estados AND / Regiones Paralelas):** Permite modelar subsistemas concurrentes independientes sin multiplicar el número de nodos.
     - **Broadcast & Guarded Transitions (`Evento [Guarda] / Acción`):** Semántica formal determinista `run-to-completion`.
2. **Ian Horrocks (1999) — *"Constructing the User Interface with Statecharts"* (Addison-Wesley):**
   - Demuestra que el `80%+` de los bugs en interfaces de usuario provienen del **Anti-Patrón de Explosión de Banderas Booleanas**: usar variables sueltas `isLoading`, `isError`, `isSuccess`, `isDisabled` crea $2^4 = 16$ combinaciones posibles cuando solo `4` estados son válidos (`idle`, `loading`, `success`, `error`), permitiendo estados imposibles como `isLoading === true && isSuccess === true`.
   - **Regla Aplicada en `web-software-factory`:** Todo componente interactivo en `site/js/industry-interactive.js` debe gobernarse mediante una máquina de estados explícita (`createUiStateMachine`) reflejada en el DOM con el atributo `data-ui-state="idle|validating|computing|settled|error"`.
3. **Miro Samek — *"Practical UML Statecharts in C/C++: Event-Driven Programming"*:**
   - Formaliza el despacho de eventos en tiempo constante $O(1)$, acciones `entry`/`exit` garantizadas para inicializar y limpiar recursos (evitando fugas de memoria o listeners duplicados), y transiciones internas.
4. **Leslie Lamport — *"Specifying Systems: The TLA+ Language and Tools for Hardware and Software Engineers"*:**
   - Distingue formalmente entre:
     - **Propiedades de Seguridad (*Safety Invariants — "Algo malo nunca ocurre"*):** Verificadas en nuestra fábrica mediante los **Invariant Sentinels** de XState y las compuertas duras (`Gate #1`, `Gate #2`, `Security Gate 100/100`).
     - **Propiedades de Vivacidad (*Liveness — "Algo bueno finalmente ocurre"*):** Garantizadas mediante cotas superiores estrictas en bucles de auto-reparación (`repairAttempts <= 2` seguido de escalamiento determinista al CTO HITL, evitando livelocks infinitos).
5. **Willard & Louf (2023, *Outlines*) & Dong et al. (CMU 2024, *XGrammar*):**
   - Demuestran cómo compilar esquemas regulares y gramáticas libres de contexto en autómatas finitos (FSM) y autómatas con pila (PDA) que enmascaran logits inválidos en $O(1)$ durante la generación, complementados en el lado del cliente por **BAML Schema-Aligned Parsing (`SAP`)**.

---

## 4. GUÍA DE INTEGRACIÓN Y OPERACIÓN EN `web-software-factory` (`tools/orchestrator/deterministic_agent_statechart.mjs`)

### 4.1 Los 3 Motores Deterministas Integrados en nuestra Fábrica
1. **Motor 1 — `FactoryLifecycleStatechart` (Orquestador XState v5 de 11 Estados + 2 Invariant Sentinels):**
   - Gobierna el ciclo de vida completo de cada proyecto en `projects/<slug>`:
     `uninitialized -> gate1_prd_pending -> gate1_prd_approved -> gate2_spec_pending -> gate2_spec_approved -> rpi_research_untainted -> wave1_foundation -> wave2_specialist_forge -> wave3_qa_and_jev_verification -> hitl_review_ready -> packaged_and_landed` (con rama acotada `self_healing_repair_loop` limitada a `repairAttempts <= 2`).
   - Incluye dos **Invariant Sentinels** (`SENTINEL_UNAPPROVED_BUILD_ATTEMPT` y `SENTINEL_UNSAFE_RELEASE_ATTEMPT`) probados inalcanzables bajo las guardas del entorno.
   - Protege las transiciones humanas (`APPROVE_GATE1_PRD`, `APPROVE_GATE2_SPEC`, `APPROVE_HITL_DELIVERY`) con `meta: { actor: "human" }`.
2. **Motor 2 — `validateAgentPolicyProposal` (Filtro `@statelyai/agent` + Reductor `Burr`):**
   - Intercepta cualquier evento propuesto por un agente (`policy`), verifica vocabulario, propiedad `meta.actor !== "human"` y evaluación de guardas `snapshot.can(event)` en `< 0.1ms`, registrando cada intento aceptado o rechazado en el historial auditable.
3. **Motor 3 — `createUiStateMachine` (FSMs Deterministas en el Frontend de los Sitios Generados):**
   - Inyectado en `projects/<slug>/site/js/industry-interactive.js` por `build_vanilla_primitives.mjs` para que los 8 widgets interactivos por rubro (`ecommerce`, `fintech`, `erp`, `clinica`, `abogacia`, `lujo`, `streamer`, `saas`) operen con estados explícitos (`idle -> validating -> computing -> settled | error`) y reflejen `data-ui-state` en el DOM sin banderas booleanas sueltas.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SPLE_ISO26550_AND_SOFTWARE_FACTORIES_ARCHITECTURE_2026]] · [[CANON_ASTRO5_CLOUDFLARE_WORKERS_AND_MODERN_WEB_TEMPLATES_2026]] · [[CANON_MULTI_BRAND_DESIGN_SYSTEMS_DTCG_STYLE_DICTIONARY_AND_ARCHETYPES_2026]] · [[CANON_SOTA_AGENT_TEAM_TOPOLOGY_AND_2026_WEB_STACK_AUDIT]] · #software_factory
