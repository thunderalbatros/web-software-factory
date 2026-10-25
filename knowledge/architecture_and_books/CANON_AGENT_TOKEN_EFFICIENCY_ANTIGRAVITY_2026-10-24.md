# CANON: Eficiencia de Tokens en Antigravity y Operación del Equipo de Agentes (Octubre 2026)

**Alcance:** Aplicable a toda operación de agentes en Antigravity IDE sobre Web Software Factory Studio: planificación, ejecución, QA e ingesta de conocimiento. Prohibido gastar cuota "high" en tareas que "low" resuelve.

> **Origen:** Investigación con fuentes oficiales (antigravity.google/docs) y comunidad (2026-10-24). El CTO (Tomás) reporta agotamiento semanal de cuota usando Argon - high.

---

## 1. Modelo de cuota de Antigravity [VERIFICADO: antigravity.google/docs/plans, 2026-10-24]

- **Doble límite:** un "sprint" que refresca **cada 5 horas** + un **tope semanal hard-cap**: agotado el semanal, el refresh de 5 h no devuelve acceso hasta el reset de 7 días.
- El consumo "correlaciona con la cantidad de trabajo del agente" (Google no publica números por feature).
- **Los thinking tokens del razonamiento cuentan** aunque no se vean; la indexación de fondo y los artifacts también consumen.
- **Mayo 2026:** Google triplicó los límites dos veces y reseteo cuotas (blog oficial 19-may-2026) — los límites son dinámicos, revisar `/usage`.
- **Gemini 4 Argon converge más rápido que Flash y usa menos tokens totales por tarea** [VERIFICADO: Medium Google Cloud, 15-oct-2026]: la elección de Argon es correcta; el problema es tenerlo siempre en effort `high`.
- Costo relativo de effort: **LOW es 3-8x más barato que HIGH** en benchmarks (Google Cloud Community, oct-2026); el número de ediciones finales es casi idéntico — lo que cambia es cuánto explora/verifica el agente.

## 2. Leyes de operación (ordenadas por impacto)

### Ley 1 — Effort por complejidad, no por defecto
`/effort low` como default: ediciones dirigidas, renombres, fixes chicos, auditorías de lectura. `medium` cuando se desconoce el blast radius. `high` SOLO para arquitectura, bugs sutiles o reintentos tras fallar en low. Ahorro esperado: **3-8x por tarea**.

### Ley 2 — Regla 80/20 del plan [VERIFICADO: guía oficial de Antigravity]
"Spend ~80% of your time iterating on the implementation plan before letting the agent generate any code." Usar `/plan` en toda tarea ambiciosa; comentar el plan-artifact inline para recortar alcance ANTES de aprobar. Un codegen en dirección equivocada cuesta una sesión entera.

### Ley 3 — Verificar en una sola pasada
El loop browser→agente es el más caro. Preferencias en orden: (a) test local que el agente ejecuta y itera solo (docs oficiales: "the single most effective way"); (b) comentarios sobre screenshots/recordings del artifact en vez de relanzar el agente; (c) verificación manual del CTO en el preview.

### Ley 4 — Handoff por archivos, chats cortos
Después de ~40-50 turns la adherencia cae y la compactación pierde detalle. Protocolo: sesión corta → actualizar `docs/STATUS.md` + `docs/tasks/` → cerrar → sesión nueva que LEE el estado (un "state packet" de ~1,5 KB redujo la ingesta de turn-1 en ~98% según foro oficial, oct-2026). Prohibido continuar chats largos o `@conversation` (inyecta 60-90k tokens sin comprimir) [UNVERIFIED].

### Ley 5 — Progressive disclosure del contexto
Las rules siempre activas de AGENTS.md se pagan en cada turno. Conocimiento estable → skills que se cargan on-demand o el RAG local (`tools/intelligence/mcp_omni_rag_server.mjs`, MCP `web-factory-omni-rag`). No cargar skills masivas "por las dudas". Tool bloat = latencia + costo [VERIFICADO: guía oficial feb-2026].

### Ley 6 — @-mencionar archivos exactos + screenshots pegados
"Give local agents high-fidelity indicators": @ con autocompletado de paths, ctrl+v de screenshots para bugs de UI, nada de "revisá todo el directorio".

### Ley 7 — Persistir correcciones con /learn
Cada corrección repetida en N sesiones cuesta N veces. `/learn` la convierte en rule/skill persistente (`.agents/rules/`). Aplicar cuando el CTO corrige algo por segunda vez.

### Ley 8 — Subagentes para barridos, no para todo
Los subagentes arrancan con contexto limpio (no heredan historia) y tool allowlist propia: útiles para research sweeps y audits paralelos que no deben inflar el contexto del padre; NO ahorran cuota por sí mismos (cada uno consume). Máx 10 niveles de anidamiento.

### Ley 9 — Cortar desvíos temprano
`esc` interrumpe, `/rewind` vuelve a checkpoint estable. Un agente en loop de ediciones chicas es de los mayores quemadores. Aprobar manualmente herramientas clave para vetar exploraciones inútiles (p.ej. escarbar git history).

### Ley 10 — Manager View para tareas multistep autónomas
El ida-y-vuelta interactivo en el editor consume rápido; delegar tareas multistep con plan aprobado en la vista Manager (background) y actuar como arquitecto que revisa artifacts.

### Ley 11 — Offload de lo no-código
Comandos complejos, manejo de datos y debugging simple van a terminal local fuera de Antigravity. **Tab completion no consume cuota.** `/usage` para monitoreo; desactivar el toggle de AI Credits para no quemar créditos pagos sin darse cuenta.

## 3. Configuración actual del equipo (estado auditado 2026-10-24)

- **Modelo organizativo:** `.agents/agency/ORGANIZATION.md` — "WebFactory Web Studio" (arquitectura Paperclip): CEO (Tomás, HITL) → Orchestrator → {UX Designer, Senior Frontend, Security Engineer, QA Auditor, Tech Scout & R&D Lead} + 12 roles extra en `.agents/agency/roles/` (a11y-architect, performance-optimizer, silent-failure-hunter, etc.).
- **Skills:** 99 en `.agents/skills/` (+2 nuevas de esta cacería: `ryux`, `modern-frontend-design`); 6 con lock de fuente externa en `skills-lock.json` (cloudflare/skills, vercel-labs, addyosmani, currents-dev).
- **Workflows:** `.agents/workflows/` — new-module, qa-gate, release-check, research-sweep.
- **Memoria de fábrica:** `.agents/memory/` (constitution_lock, instincts, temporal_ledger, textgrad_optimization_log, tech_scout_state, vertex_prompt_cache) + `memory/` (tom_swe_model.json, selector_cache.json).
- **Motor ToM-SWE:** `tools/intelligence/tom_swe_engine.mjs` (modelado mental 3-tier del CTO).
- **Squads 0-9:** definidos en AGENTS.md (orquestación, research, edge backend, RealtimeHub, design system, motion/FX, QA adversarial 5 gates, DevOps, crowd-games, Omni-RAG v5).

## 4. Arsenal de herramientas, MCP y claves (estado auditado 2026-10-24)

### 4.1 MCP servers (.mcp.json)
| Server | Estado | Propósito |
| --- | --- | --- |
| `web-factory-omni-rag` | ACTIVO | RAG local del proyecto (`tools/intelligence/mcp_omni_rag_server.mjs`) — usar antes de explicar conocimiento que ya vive en `knowledge/`. |
| `context7` | ACTIVO | Docs oficiales actualizadas de librerías (evita adivinar APIs — ahorra reintentos). |
| `21st` (21st.dev) | ACTIVO (requiere `API_KEY_21ST`) | Componentes de UI de referencia. |
| `rea` | ACTIVO | Reverse-engineering universal (CLI/MCP). |
| `centinela-kb`, `centinela-RealtimeHub`, `yendo-rag` | DESACTIVADOS | Proyectos hermanos fuera de este workspace. |

### 4.2 Claves API / servicios (nombres, no valores — `.env` / `.dev.vars` / wrangler secrets)
- **IA:** GROQ_API_KEY, API_ANTHROPIC_KEY, DEEPSEEK_API_KEY, OPENROUTER_API_KEY, GEMINI_MODEL/GEMINI_AUDIT_MODEL (vía Vertex: GOOGLE_APPLICATION_CREDENTIALS, GCP_PROJECT_ID, USE_VERTEX_AI, VISION_PROVIDER, TEXT_PROVIDER).
- **Búsqueda/scraping:** SERPER_API_KEY, FIRECRAWL_API_KEY, APIFY_API_TOKEN.
- **RAG vectorial:** QDRANT_HOST/QDRANT_API_KEY/QDRANT_COLLECTION_OBSIDIAN.
- **Utilidades:** GITHUB_TOKEN, TELEGRAM_BOT_TOKEN (+chat/allowed id), GOOGLE_MAPS_API_KEY, LAMBDATEST_USERNAME/ACCESS_KEY, MAESTRO_API_KEY, OBSIDIAN_API_KEY.
- **Producción Cloudflare (secrets vía wrangler):** KICK_CLIENT_ID/SECRET, DISCORD_CLIENT_ID/SECRET, TURNSTILE_SECRET_KEY, ADMIN_API_SECRET.
- **Nota de higiene:** `ADMIN_API_SECRET.txt` en la raíz del repo (no trackeado en git) — mover fuera del workspace. `.env` contiene muchas claves de proyectos hermanos (Supabase/Expo/Crypto) que no usa este proyecto — depurar para reducir superficie de fuga.

### 4.3 RAG (Omni-RAG v5) — cómo ingestar
- Pipeline: `tools/intelligence/rag_pipeline.mjs` — chunker contextual recursivo (hasta 1.5 MB por libro), thesaurus bilingüe ES↔EN, 4 motores híbridos + RRF (SQLite FTS5 nativo, MiniSearch, IDF+proximity, Qdrant opcional), reranker ONNX Q8 local opcional.
- **Ingesta:** colocar el .md en `knowledge/` (con `**Alcance:**` LEC-015) → registrar en `knowledge/INDEX.md` → `node tools/intelligence/rag_pipeline.mjs --rebuild` → `--stats` verifica. Corpus actual: 279 documentos (~280 libros + cánones).
- Consulta: MCP `web-factory-omni-rag` o `node tools/intelligence/rag_pipeline.mjs --query "..." 5 [--rerank]`.

## 5. Fuentes principales
- antigravity.google/docs/plans, /docs/cli/best-practices, /docs/cli/commands/effort, /docs/subagents, /docs/commands/learn, /blog/changes-to-antigravity-plans (19-may-2026) [VERIFICADO: 2026-10-24]
- Medium Google Cloud: "Stop Defaulting to Medium — Optimizing Gemini 4 Argon & 3.8 Flash Effort Budgets" (15-oct-2026); "Top Questions Answered: Getting Started with Antigravity" (feb-2026)
- Google AI Dev Forum: "Navigating Antigravity Pro Quota Limits" (mar-2026); "Cutting Ingestion Tokens by 98% with Native Session Lifecycle" (oct-2026)
- HowToGeek (rate limits), 9to5Google (21-may-2026), sanj.dev, CloudZero, Reddit r/google_antigravity, r/GeminiAI

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SOTA_RAG_ARCHITECTURES_AND_TOOLS_2026]] · [[CURATED_MASTER_BOOKS_AND_COURSES_2026]] · [[CANON_SOFTWARE_ENGINEERING_AT_GOOGLE]] · [[CANON_HARNESS_ENGINEERING_INTEGRAL_2026]] · #architecture_and_books
