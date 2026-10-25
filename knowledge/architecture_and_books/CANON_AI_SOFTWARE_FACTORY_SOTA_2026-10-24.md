# CANON: AI Software Factory SOTA — Operación, Configuración y Tecnologías (Octubre 2026)

**Alcance:** Aplicable al diseño y operación de la Software Factory de WebFactory Studio para generar múltiples sitios web (separada del producto example-client.pages.dev). Cubre el flujo spec-driven, ingeniería de contexto, stack recomendado y patrón de separación factory/producto. Basado en investigación web del 2026-10-24 con fuentes verificadas.

---

## 1. Qué es una "software factory" con IA en 2026 (modelo mental)

Una fábrica de software con IA ya NO es "un chat que codea". El consenso 2025-2026 (GitHub, Anthropic, comunidad) es una **línea de producción spec-driven** con 4 capas:

```
[1] ESPECIFICACIÓN      → artifacts de texto (spec/plan/tasks) que el agente lee,
                          no prompts conversacionales efímeros
[2] EJECUCIÓN AGÉNTICA  → agente principal + subagentes con contexto limpio,
                          gates de aprobación humana en puntos quirúrgicos
[3] VERIFICACIÓN        → gates automáticas deterministas (lint, tests, visual,
                          a11y, performance, seguridad) ANTES de mostrar al humano
[4] MEMORIA/APRENDIZAJE → files de estado (STATUS, tasks) + RAG + rules persistidas
                          (/learn); el conocimiento no vive en la conversación
```

La clave del cambio 2024→2026: **el insumo del agente dejó de ser el prompt y pasó a ser el documento**. "Vibe coding" → spec-driven development (SDD).

## 2. Spec-Driven Development (SDD) — el estándar emergente [VERIFICADO: github/spec-kit]

### 2.1 GitHub Spec Kit (MIT ✅, clonado en `references/software-factory/spec-kit/`, 23 MB)
Herramienta oficial de GitHub para SDD. Flujo de 4 fases que se instala en CUALQUIER repo:
1. **`constitution`** — archivo de principios no negociables del proyecto (el proyecto ya tiene el equivalente: `constitution_guard.mjs` + `.agents/memory/constitution_lock.json`).
2. **`specify`** — genera documento de requerimientos con escenarios (entrevista al humano).
3. **`plan`** — plan técnico que cita la spec.
4. **`tasks`** — descomposición en tareas ejecutables con dependencias (equivalente: skill `paperclip-converting-plans-to-tasks`).
5. **`implement`** — el agente codea tarea por tarea contra el plan.
- Multi-agente: funciona con Copilot, Claude Code, Gemini CLI/Antigravity.
- ⚠️ Advertencia comunitaria: lee specs completas en cada paso → **consume muchos tokens**; mitigar con effort bajo en fases mecánicas (ver `CANON_AGENT_TOKEN_EFFICIENCY_ANTIGRAVITY_2026-10-24.md`).

### 2.2 Alternativas clonadas (comparativa honesta)
| Framework | Licencia | Enfoque | Veredicto para la factory |
|---|---|---|---|
| **spec-kit** (github) | MIT ✅ | SDD document-driven, estándar de facto | **ADOPTAR** como flujo base |
| **BMAD-METHOD** (7.7 MB) | MIT ✅ | Método ágil completo con personas-agente (PM, arquitecto, dev, QA) — score 76/100 en comparativas 2026 | **TOMAR ideas** (personas = nuestros roles; su Sharded-Context PM/architect combate el context-rot) sin adoptar todo su ciclo |
| **OpenSpec** (17 MB) | MIT ✅ | SDD liviano incremental, artifacts markdown | REF — comparar si spec-kit pesa |
| **claude-task-master** (21 MB) | MIT + Commons Clause ⚠️ | Gestión de tareas/PRD multi-proveedor | **USO INTERNO como CLI ok, PROHIBIDO redistribuir/vender** dentro de entregables; no vendor |
| spec_generator.mjs (propio) | — | Genera ProductSpec/TechSpec | Migrar su salida al formato spec-kit para alinearse al estándar |

## 3. AGENTS.md es estándar de facto [VERIFICADO: agents.md, mar/jul-2026]

- Usado por **60.000+ proyectos open source** y ~**2 docenas de tools** (excepto Claude Code que mantiene CLAUDE.md).
- Patrón 2026: **archivos de instrucción en capas** — AGENTS.md raíz (cross-tool) + archivos específicos por herramienta, sincronizados o con "bridge glue".
- Soporta **nested/multi-repo**: un AGENTS.md por directorio; el agente obedece el más profundo aplicable. Clave para el modelo factory: AGENTS.md de fábrica (genérico) + AGENTS.md por producto (específico).
- Estudio arXiv (mar-2026) midió su impacto en runtime/tokens de agentes en PRs reales.

## 4. Ingeniería de contexto (el cuello de botella #1 de una factory)

### 4.1 Anthropic — "Effective context engineering" [VERIFICADO: anthropic.com, sep-2025]
- Definición operativa: **"encontrar el conjunto mínimo de tokens de alta señal"**; presupuesto de atención limitado.
- Jerarquía de palancas: **compaction** (resumir historia al acercarse al límite) → **structured note-taking / agentic memory** (files de estado — ya lo hacemos con STATUS.md) → **sub-agentes** (contexto aislado para tareas que contaminan).
- "Context rot": más tokens NO es mejor; el razonamiento degrada con contexto largo aunque la ventana no se llene.

### 4.2 12-Factor Agents (Apache-2.0 ✅, clonado, 80 MB con ejemplos)
Principios de agentes productivos: own your prompts / **own your context window** / tools = structured outputs / own your control flow / agentes pequeños y enfocados. Checklist de confiabilidad, no un framework.

### 4.3 awesome-context-engineering (CC ⚠️ contenido, no código — lectura libre)
Curaduría de papers/tools/best-practices. Referencia bibliográfica del tema.

**Mapeo a la factory propia:** ya implementamos memoria (STATUS, .agents/memory, RAG 24.7k chunks), compaction (context_compactor.mjs), subagentes (roles con contexto limpio). Lo que falta: **disciplina de sesión corta + handoff** y effort bajo por defecto (ver canon de tokens).

## 5. Stack recomendado para NUEVOS sitios (2026) [VERIFICADO: múltiples fuentes feb-may 2026]

| Tipo de sitio | Stack | Por qué |
|---|---|---|
| Multi-página / contenido / marketing (la mayoría de clientes) | **Astro 5** sobre Vite | Zero-JS por defecto (islands), SEO, content collections; **Cloudflare adquirió Astro (2026)** → integración primera-clase con nuestro deploy objetivo; MIT |
| SPA chica / herramienta interactiva | Vite vanilla + design system propio | Mínimo tooling, coincide con el flujo actual (esbuild → dist) |
| Apps con backend | Cloudflare Workers + D1/DO (existente) | Ya dominado por la factory |

- Scaffolding de nuevos proyectos: `npm create astro@latest` (oficial, gratis) o template propio.
- **Prohibido** para la factory: frameworks pagos, starters GPL, GSAP (propietario), Docker.

## 6. Patrón de separación FÁBRICA ↔ PRODUCTOS [VERIFICADO: práctica estándar]

### 6.1 El patrón "3 repositorios" (recomendado)
```
REPO A — FACTORY (el "estudio"):  tools/ (audit, intelligence, design, guardrails, lib),
                                  .agents/ (skills, agency, workflows, rules, memory),
                                  knowledge/ (corpus RAG compartido), AGENTS.md de fábrica,
                                  docs/ de protocolos, package.json con scripts factory:*
REPO B — TEMPLATE (el "molde"):   starter Astro 5 + tokens OKLCH del design system +
                                  gates cableadas + AGENTS.md de producto tipo +
                                  wrangler.toml base. Versionado con TAGS (estado known-good).
REPO C..N — PRODUCTOS:            1 repo por sitio (client-portal incluido). Historia git
                                  independiente. Cada uno tiene su AGENTS.md específico.
```
- **Herramientas de scaffolding** (estándar 2026): **GitHub Template Repositories** (nativo, botón "Use this template", historia limpia) o **degit** (`npx degit user/template nuevo-sitio`, copia sin .git) [VERIFICADO: Rich-Harris/degit MIT, CSS-Tricks]. Con variables → copier/hygen (si algún día hace falta).
- Regla de oro: **la fábrica evoluciona una vez, todos los productos la heredan** al hacer scaffold (o re-sincronizando el template con tag).
- El RAG vive en la factory; los productos lo consumen vía MCP (`web-factory-omni-rag` ya es un MCP server standalone — apuntarlo al corpus de fábrica).

### 6.2 Por qué separar (evidencia de acoplamiento medida en el repo actual)
- Las 15 herramientas de `tools/audit/` + `build_dist.mjs` + 4 de `tools/intelligence/` tienen **2-6 hits cada una** de strings de producto (`WebFactory_celebration`, `diggity`, `admin-hub.js`, rutas de overlays) — son gates de UN producto, no de fábrica.
- 1.3 GB de archivos de producto en la raíz (`` 1.3 MB, `repomix-output.xml` 13.8 MB, `repos_clonados.txt` 1 MB) mezclados con la fábrica.
- El CI (`.github/workflows/slot-intel-sync.yml`) es 100% producto.
- `.env` mezcla claves de 3 proyectos hermanos.

## 7. Qué quedó OBSOLETO (2024-era) y no copiar
1. **Chat monolítico como memoria** — reemplazado por artifacts + files de estado.
2. **Single-agent sin gates** — reemplazado por pipeline con verificación automática pre-humano.
3. **CLAUDE.md único gigante** — reemplazado por AGENTS.md en capas + skills on-demand.
4. **Sandboxes Docker/E2B por defecto** — en Windows sin Docker: worktrees git (sandcastle) + tools locales siguen siendo la respuesta correcta.
5. **"Squads" como teatro de prompts** sin artifacts verificables — los roles valen si cada uno produce/verifica un artifact (spec, plan, reporte de gate); si no, son costo de tokens.

## 8. Ciclo de vida operativo de la factory (fusión SDD + protocolo propio)

```
0) CONSTITUTION (una vez por factory)     → principios no negociables (ya existe: constitution_guard)
1) INTAKE del cliente (HITL)              → entrevista → spec-kit `specify` → requirements.md con escenarios
2) PLAN                                   → `plan` → plan técnico con riesgos → CTO aprueba (Gate 1)
3) TASKS                                  → `tasks` → backlog atómico (≤300 líneas) con dependencias
4) SCAFFOLD                               → nuevo repo desde TEMPLATE (GitHub template / degit)
5) IMPLEMENT                              → agente por tarea, effort bajo, tests primero, subagentes para barridos
6) GATES automáticas (Squad 6)            → oxlint AST <120ms → Playwright 4-viewport + pixelmatch →
                                            diff-UI adversarial → CDP 60fps → Lighthouse+Pa11y → VLM critic
7) CTO VISUAL SIGN-OFF (Gate HITL)        → packet 3-viewport + scorecard (protocolo existente)
8) DEPLOY                                 → Cloudflare Workers/Pages (build_dist / astro build)
9) RETRO & LEARN                          → /learn de correcciones → skills/rules → ingesta RAG de lo aprendido
                                            → actualizar TEMPLATE si el aprendizaje es genérico
```
Regla de re-inversión del aprendizaje: **si un fix aplica a cualquier sitio futuro → va al TEMPLATE o a la FÁBRICA; si aplica a un solo sitio → queda en ese producto.** Sin esta regla, la factory no mejora con cada proyecto.

## 9. Inventario clonado en esta sesión (`references/software-factory/`)
| Repo | Licencia | Tamaño | Rol |
|---|---|---|---|
| github/spec-kit | MIT ✅ | 23 MB | **Indispensable** — flujo SDD a adoptar |
| bmad-code-org/BMAD-METHOD | MIT ✅ | 7.7 MB | Ideas de personas-agente y sharded context |
| humanlayer/12-factor-agents | Apache-2.0 ✅ | 80 MB | Principios de confiabilidad de agentes |
| yzfly/awesome-context-engineering | CC (contenido) ⚠️ | 4.1 MB | Bibliografía del tema |
| eyaltoledano/claude-task-master | MIT+Commons Clause ⚠️ | 21 MB | CLI de gestión de tareas — uso interno, no redistribuir |
| Fission-AI/OpenSpec | MIT ✅ | 17 MB | SDD liviano alternativo |

(Preexistentes en el mismo dir: aider, MetaGPT, OpenHands, SWE-agent, Archon, Agentless, ast-grep, gh-aw, repomix, E2B, ai-software-factory, design-extract, vercel-labs-skills, michaelshimeles-skills.)

## 10. Fuentes principales [VERIFICADO: 2026-10-24]
- github/spec-kit + quickstart oficial (github.github.com/spec-kit/quickstart.html)
- agents.md (adopción 60k+ repos, ~24 tools) · Augment Code (mar-2026) · BuildMVPFast (jul-2026)
- anthropic.com/engineering/effective-context-engineering-for-ai-agents (sep-2025)
- humanlayer/12-factor-agents · Sourcegraph context engineering guide (sep-2026) · Victor Dibia (mar-2026)
- Faun Toolbox (BMAD 76 vs Taskmaster 69) · themenonlab.blog (feb-2026) · obviousworks.ch (mar-2026)
- dev.to "Astro in 2026" (Cloudflare acquisition) · designodin.com (may-2026)
- Rich-Harris/degit + CSS-Tricks (GitHub template repos) · Gruntwork Boilerplate
- Comparativas sandboxd.io / totalum.app (bolt.diy: FOSS, browser-based, multi-LLM incl. Ollama — opcional, no requerido por nuestra factory)

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SOTA_RAG_ARCHITECTURES_AND_TOOLS_2026]] · [[CURATED_MASTER_BOOKS_AND_COURSES_2026]] · [[CANON_SOFTWARE_ENGINEERING_AT_GOOGLE]] · [[CANON_HARNESS_ENGINEERING_INTEGRAL_2026]] · #architecture_and_books
