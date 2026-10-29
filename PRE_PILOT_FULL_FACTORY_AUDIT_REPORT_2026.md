# AUDITORÍA FORENSE INTEGRAL DE CAJA BLANCA Y STRESS-TEST E2E PRE-PILOTO (`PRE_PILOT_FULL_FACTORY_AUDIT_REPORT_2026.md`)

> **Estudio Auditado:** `web-software-factory` (`v2.2.0` — Multi-Project ISO/IEC 26550 SPLE, Fases 36B -> **37 Remediada**)  
> **Fecha y Hora de Auditoría Inicial:** `2026-10-29T12:49:00-03:00` `[VERIFICADO: Disco + SQLite FTS5 + Chromium Headless + AST, 2026-10-29]`  
> **Fecha y Hora de Certificación Post-Remediación (Fase 37):** `2026-10-29T14:48:00-03:00` `[VERIFICADO: 9/9 Hallazgos Cerrados -> 100% Categoría A E2E, 2026-10-29]`  
> **Rol Auditor:** Principal Staff Systems Auditor, Red-Team Security Researcher & AI Software Factory QA Lead  
> **Estado Ejecutivo Pre-Piloto:** **APROBADO — 100% CATEGORÍA A (`0` Desconexiones Categoría B, `0` Recortes/Stubs Categoría C)** *(Ver Sección 9 al final del documento para la evidencia empírica de cierre de cada hallazgo).*  
> **Regla de Clasificación Forense (Cero Complacencia):**
> - **[A] Lógica 100% Real y Conectada E2E:** Funciona de punta a punta en una corrida real de `cto:nuevo -> cto:entrevista-prd -> cto:entrevista -> cto:construir -> build_dist.mjs -> cto:empaquetar`.
> - **[B] Lógica Funcional en `--self-test` / CLI Aislado, pero Desconectada del Flujo Principal (*Integration Drift*):** El algoritmo existe y pasa sus pruebas unitarias, pero no está cableado hacia el DOM/CSS/JS real de `site/` y `dist/` durante `cto:construir` o `build_dist.mjs`. *(Remediado al 100% en Fase 37).*
> - **[C] *Stubs*, *Mocks*, Contenedores Sintéticos o Heurísticas con Recorte Artificial (*Clamping*):** Simulaciones o validadores cuyos umbrales están fijados por código (`Math.max`/`Math.min`) o que escriben cabeceras binarias de prueba en lugar de artefactos reales de producción. *(Remediado al 100% en Fase 37).*

---

## 1. RADIOGRAFÍA ESTRUCTURAL, INVENTARIO FÍSICO Y SALUD DE GIT

### 1.1 Inventario Físico Exacto del Árbol del Repositorio
`[VERIFICADO: Escaneo directo con node:fs sobre c:/Users/tomas/Desktop/web-software-factory, 2026-10-29]`

| Directorio / Subsistema | Estado en Disco | Archivos (`Files`) | Líneas de Código / Texto (`LOC`) | Tamaño Físico (`MB`) | Observaciones Forenses |
| :--- | :---: | ---: | ---: | ---: | :--- |
| `tools/` *(archivos en raíz de `tools/`)* | Activo | 15 | 3,637 | 0.166 MB | Incluye `cto_command_center.mjs` (`1,595 LOC`), `build_dist.mjs` (`623 LOC`), `factory.mjs`, `sandbox.mjs` |
| `tools/orchestrator/` | Activo | 5 | 3,411 | 0.151 MB | `lean_prd_architect.mjs`, `client_interview_gate.mjs`, `humanlayer_rpi_gate.mjs`, `adaptive_depth_router.mjs`, `post_merge_qualification_gate.mjs` |
| `tools/intelligence/` | Activo | 37 | 24,341 | 1.013 MB | Orquestador DAG (`agent_squad.mjs`), `rag_pipeline.mjs`, `jev_semantic_gate.mjs`, `agent_governance_kernel.mjs`, `context_budget.mjs` |
| `tools/design/` | Activo | 8 | 5,727 | 0.234 MB | `token_compiler.mjs`, `bespoke_morphology_composer.mjs`, `industry_archetype_matrix.mjs`, `build_vanilla_primitives.mjs`, `shader_and_3d_forge.mjs` |
| `tools/media/` | Activo | 2 | 1,287 | 0.047 MB | `sonic_and_music_forge.mjs` (`705 LOC`) y `programmatic_video_forge.mjs` (`580 LOC`) |
| `tools/audit/` | Activo | 26 | 10,490 | 0.531 MB | `visual_audit.mjs`, `ryux_design_gate.mjs`, `security_gate.mjs`, `local_fullstack_and_component_harness.mjs`, `ast_guard.mjs`, etc. |
| `tools/feedback/` | Activo | 1 | 987 | 0.039 MB | `client_feedback_triage_agent.mjs` |
| `tools/cockpit/` | Activo | 2 | 2,185 | 0.076 MB | `factory_twin_server.mjs` y `live_telemetry_bus.mjs` |
| `tools/lib/` | Activo | 2 | 687 | 0.024 MB | `project_loader.mjs` y `sandcastle-runner.mjs` |
| `tools/db/` | Activo | 1 | 562 | 0.024 MB | `dual_database_forge.mjs` (D1 SQLite + PostgreSQL v14+ RLS + KMS) |
| `tools/mobile/` | Activo | 1 | 604 | 0.021 MB | `capacitor8_mobile_forge.mjs` |
| **Subtotal `tools/` Activos** *(incl. `security/` y `guardrails/`)* | **Activo** | **103** | **54,752** | **2.358 MB** | **95 scripts `.mjs`/`.js`/`.cjs` ejecutables activos** |
| `tools/_legacy_archive/` | Archivado | 15 | 2,331 | 0.092 MB | Scripts retirados de fases previas |
| `knowledge/architecture_and_books/` | Activo | 179 | 1,294,625 | 69.870 MB | Libros técnicos completos y tratados de arquitectura |
| `knowledge/ui_ux_design/` | Activo | 126 | 603,048 | 29.308 MB | Tratados de colorimetría OKLCH, APCA, tipografía Utopia y CRO |
| `knowledge/cybersecurity/` | Activo | 61 | 399,072 | 20.291 MB | Tratados OWASP ASVS v5.0, Agentic Top 10, MCP SARIF y DevSecOps |
| `knowledge/motion_and_animation/` | Activo | 62 | 364,591 | 18.966 MB | Tratados de WebGPU, Three.js r186, GSAP y psicoacústica DSP |
| `knowledge/software_factory/` | Activo | 39 | 158,443 | 9.055 MB | Tratados de Dark Factories, cursos universitarios, JEV/BAML y Harness |
| `knowledge/streaming_and_overlays/` | Activo | 12 | 95,081 | 6.360 MB | Tratados de overlays a 60 FPS y WebAudio |
| `knowledge/architecture_and_edge/` | Activo | 2 | 51 | 0.004 MB | Resúmenes de borde Cloudflare |
| `knowledge/sources/` + `.obsidian/` + raíz `knowledge/*.md` | Activo | 14 | 15,819 | 0.903 MB | `INDEX.md`, `DESIGN_MASTERY_2026.md`, `actionable_gamification.md`, etc. |
| `knowledge/_inbox_courses/` | Activo | 1 | 13 | 0.001 MB | Bandeja de entrada de cursos |
| `knowledge/_inbox_pdfs/` *(ignorada en Git)* | Local | 236 | 35 | **3,326.535 MB** | **3.25 GB** de PDFs/EPUBs crudos en disco local (`*.pdf` en `.gitignore`) |
| `.agents/skills/` | Activo | 283 | 55,793 | 15.139 MB | 70 carpetas de skills + referencias técnicas |
| `.agents/workflows/` | Activo | 4 | 33 | 0.002 MB | Workflows operativos |
| `.agents/mcp/` | Activo | 1 | 383 | 0.015 MB | `mcp_role_registry.json` (Creator-Verifier Split) |
| `.agents/memory/` | Activo | 48 | 47,767 | 9.093 MB | Ledgers, cachés JEV, grafos AST (`codebase_ast_graph.json`), SBOM y estado |
| `.agents/beads/` | Activo | 1 | 13 | 0.004 MB | `task_graph.jsonl` (12 nodos priorizados) |
| `.agents/governance/` | Activo | 3 | 188 | 0.006 MB | Reglas de gobernanza e invariantes |
| `.agents/runs/` + `.agents/agency/` | Activo | 26 | 1,549 | 0.122 MB | Checkpoints RPI, handoffs de waves y 9 roles |
| `templates/` | Activo | 59 | 8,628 | 0.281 MB | `vanilla-edge/`, `astro-edge/`, `fullstack-saas-edge/`, `components/` |
| `projects/` | Activo | 108 | 5,989 | 0.525 MB | Proyecto activo de referencia `projects/agencia-alfa/` |
| `.github/workflows/` | Activo | 4 | 829 | 0.032 MB | `ci_quality_gate.yml`, `factory_pr_gate.yml`, `issue_driven_factory.yml`, `preview_deploy.yml` |
| `.cache/omni_rag_fts5.sqlite` *(ignorado en Git)* | Local | 1 | N/A (Binario) | **2,224.383 MB** | Motor SQLite FTS5 (`2,332,434,432 bytes`) |

---

### 1.2 Auditoría de Scripts Huérfanos e `import`s en `tools/`
`[VERIFICADO: Análisis estático de grafo de llamadas sobre los 95 scripts de tools/, package.json y .github/workflows/, 2026-10-29]`

1. **Scripts Huérfanos Activos Detectados (`5 scripts` en `tools/` sin ningún invocador en `package.json`, `cto_command_center.mjs`, `agent_squad.mjs` ni `.github/workflows/`):**
   - [`tools/intelligence/audiovisual_psychoacoustics_corpus_builder.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/intelligence/audiovisual_psychoacoustics_corpus_builder.mjs): Script de generación one-shot del tratado psicoacústico de Fase 36A; quedó activo en `tools/intelligence/` tras generar el `.md`.
   - [`tools/intelligence/software_factory_curriculum_ingester.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/intelligence/software_factory_curriculum_ingester.mjs): Script de ingesta one-shot de los 8 cursos universitarios y 28 charlas de Fase 35; no es invocado por ningún comando recurrente.
   - [`tools/intelligence/visual_science_corpus_builder.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/intelligence/visual_science_corpus_builder.mjs): Script one-shot generador del canon de ciencia visual atómica; no tiene llamadores activos.
   - [`tools/guardrails/check-console-log.js`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/guardrails/check-console-log.js) y [`tools/guardrails/config-protection.js`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/guardrails/config-protection.js): Guardias heredados que no están conectados a `security_gate.mjs`, `ast_guard.mjs` ni `package.json`.
2. **Archivo Referenciado en el Prompt pero Inexistente como Archivo Independiente:**
   - `tools/package_delivery.mjs` **no existe** ni en `tools/` ni en `tools/_legacy_archive/`. Su funcionalidad fue absorbida dentro de [`exportStandaloneDeliverable`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/build_dist.mjs#L451-L615) en `tools/build_dist.mjs` e invocada por `handleEmpaquetar` en [`tools/cto_command_center.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/cto_command_center.mjs#L774-L780).
3. **Inspección de `import`s Rotos (`0` rotos en tiempo de carga; `1` `import` dinámico de sandbox):**
   - Los 95 scripts cargan sus módulos relativos sin errores de resolución ESM.
   - El único `import('./.jail_fs_guard.mjs')` no existente en disco estático aparece dentro de una plantilla de string en [`tools/sandbox.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/sandbox.mjs#L118-L162), donde el propio sandbox escribe temporalmente `.jail_fs_guard.mjs` antes de ejecutar el proceso hijo y lo elimina en el bloque `finally`.

---

### 1.3 Estado de Git y Auditoría de `.gitignore`
`[VERIFICADO: Ejecución de git status -sb y git log -n 8 --oneline, 2026-10-29]`

- **`git log -n 8 --oneline`:**
  ```text
  68905e1 feat(design-v36): add bespoke morphology composer with harmonic constellation solver, multi-frame motion/harmony visual inspector, anti-clone DNA ledger & ToM aesthetic isolation
  f7cd2bf feat(factory-v36b): enforce two-stage manual CTO interviews (Gate 1 PRD & existing brand identity lock -> Gate 2 technical SPEC) before automated build
  9434863 feat(factory-v35b): index JEV/BAML/RepoMap/Harness canon into RAG, expose MCP tools & skill, add dedicated JEV official API client with independent FinOps ledger, BAML SAP parser, PageRank RepoMap, stateless component harness & local commerce/RLS/3D simulator
  536c3cc feat(rag-corpus): classify, rename, and ingest 25 books from _inbox_pdfs into knowledge/ and Omni-RAG v5
  939c3a8 feat(factory-v35): harvest and index 8 domain mastery courses (CMU 15-445, MIT 6.5840, MIT 6.102/Ousterhout, CMU 15-462/WebGPU, Stanford CS253, web.dev, CCRMA 220a, Baymard/Laws of UX)
  cd5d528 feat(factory-v35): ingest CMU/Stanford/Berkeley/Anthropic/HF courses & 28 YouTube factory talks, CRISP untainted research, data-structure guard, Lethal Trifecta kernel & Land-the-Plane protocol
  dfdb301 feat(factory-v34c): ingest master software factory directories, post-merge gates, inspect_ai circuit breakers & mini-swe-agent fast-path
  b7de4fd feat(feedback-v34b): serverless Slack-to-Worker-to-GH-Actions pipeline with two-stage HITL triage report and OpenSpec delta approval
  ```
- **Debilidad Detectada en [`.gitignore`](file:///c:/Users/tomas/Desktop/web-software-factory/.gitignore#L1-L80):**
  1. **Contaminación del árbol de trabajo por telemetría volátil:** Cada vez que se ejecutan `security_gate.mjs`, `jev_semantic_gate.mjs`, `ryux_design_gate.mjs` o `cto:aterrizar`, se modifican **hasta 13 archivos versionados en Git** dentro de `.agents/memory/` (`jev_finops_ledger.json`, `jev_decision_cache.json`, `agent_vent_log.jsonl`, `failure_events.jsonl`, `shim_telemetry.json`, `sbom_cyclonedx.json`, `skill_quality_records.json`, `project_dna_fingerprints.json`) y `.agents/security_reports/` (`mcp_audit.sarif.json`, `.semgrep/delta_security_scan-*.json`) solo por cambios de `updatedAt` o hashes de corrida.
  2. **Reglas heredadas obsoletas:** Las líneas `25-35` de `.gitignore` conservan exclusiones de `Streamer.bot-App/`, `*.sb`, `eng.traineddata` y `AudioDevices/` ajenas a `web-software-factory`.

---

## 2. AUDITORÍA PROFUNDA DE COSTURAS DEL FLUJO DE TRABAJO (*END-TO-END WORKFLOW SEAM AUDIT*)

### 2.1 Secuencia de Compuertas de Entrada (`Nuevo -> Entrevista #1 PRD/Marca -> Entrevista #2 SPEC -> Construir`)
`[VERIFICADO: Inspección de código fuente con citas exactas archivo:línea, 2026-10-29]`

| Compuerta / Transición | Clasificación | Evidencia Exacta en Código (`archivo:línea`) | Veredicto Forense |
| :--- | :---: | :--- | :--- |
| **`cto:nuevo` inicializa proyecto virgen con ambas entrevistas en `PENDING`** | **[A] 100% Real** | [`tools/cto_command_center.mjs:248-255`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/cto_command_center.mjs#L248-L255), [`lean_prd_architect.mjs:526-567`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/orchestrator/lean_prd_architect.mjs#L526-L567) y [`client_interview_gate.mjs:520-564`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/orchestrator/client_interview_gate.mjs#L520-L564) | `handleNuevo` invoca `initPrdInterviewFiles(slug, rubro, { autoApprove: false, overwrite: true })` que fija `prdInterviewStatus: "PENDING_CTO_PRD_INPUT"` en `ENTREVISTA_1_PRD_Y_MARCA.md` + `PRD_INTERVIEW_STATE.json`, e `initClientInterviewFiles(..., { autoApprove: false, overwrite: true })` que fija `specInterviewStatus: "PENDING_CTO_SPEC_INPUT"` en `ENTREVISTA_2_SPEC_TECNICO.md` + `CLIENT_BRIEF_INTERVIEW.json`. *(Nota menor: el prompt menciona `"PENDING_CTO_ANSWERS"`, pero la constante real en código es `"PENDING_CTO_SPEC_INPUT"` en `client_interview_gate.mjs:77,117`).* |
| **`cto:entrevista` (Entrevista #2) bloquea si la Entrevista #1 no está en `"COMPLETED_BY_CTO"`** | **[A] 100% Real** | [`tools/cto_command_center.mjs:361-366`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/cto_command_center.mjs#L361-L366) y [`client_interview_gate.mjs:619-622`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/orchestrator/client_interview_gate.mjs#L619-L622) | `handleEntrevista` llama primero a `verifyPrdInterviewGate(slug, industry)`. Si `prdInterviewStatus !== "COMPLETED_BY_CTO"`, aborta inmediatamente con `process.exit(1)` y código `HARD_STOP_PRD_INTERVIEW_REQUIRED`. |
| **`cto:construir` bloquea (`HARD_STOP`) si falta aprobar cualquiera de las dos entrevistas** | **[A] 100% Real** | [`tools/cto_command_center.mjs:404-414`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/cto_command_center.mjs#L404-L414), [`client_interview_gate.mjs:595-613`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/orchestrator/client_interview_gate.mjs#L595-L613) y [`agent_squad.mjs:459-462`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/intelligence/agent_squad.mjs#L459-L462) | Doble cerrojo verificado tanto en `handleConstruir` como dentro de `runSquadMission` mediante `verifyDualInterviewGates()`. Si falta Gate #1 o Gate #2, aborta con `process.exit(1)` / `throw new Error(...)`. |

**Fricción UX/DX detectada en las Entrevistas #1 y #2 (`[B]`):**
- Cuando el CTO edita a mano el archivo Markdown `ENTREVISTA_1_PRD_Y_MARCA.md` o `ENTREVISTA_2_SPEC_TECNICO.md` y luego ejecuta `npm run cto:entrevista-prd -- <slug> --aprobar`, [`compilePrdLeanAndBrandLock`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/orchestrator/lean_prd_architect.mjs#L616-L652) y [`compileSpecFromInterview`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/orchestrator/client_interview_gate.mjs#L636-L668) leen el archivo JSON (`PRD_INTERVIEW_STATE.json` / `CLIENT_BRIEF_INTERVIEW.json`) y **sobrescriben el `.md` desde el JSON** (`fs.writeFileSync(mdPath, renderPrdInterviewMarkdown(state))`). Si el CTO editó el `.md` en lugar del `.json`, **sus respuestas manuales en el Markdown son pisadas y reemplazadas por los valores por defecto del JSON**.

---

### 2.2 Conexión Real durante `cto:construir` y `build_dist.mjs` (*Detección de Integration Drift*)
`[VERIFICADO: Trazabilidad completa de llamadas desde handleConstruir -> compileDesignTokens -> build_dist.mjs -> runSquadMission, 2026-10-29]`

#### 1. ¿`token_compiler.mjs` lee efectivamente `BRAND_IDENTITY_LOCK.json` y respeta `"lockClientPalette": true`?
- **Clasificación:** **[A] Parcialmente Conectado (Funciona para `lockClientPalette: true`, pero desconectado de Gamut Mask y Font Pairing de Fase 36).**
- **Evidencia Exacta:**
  - En [`tools/cto_command_center.mjs:438`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/cto_command_center.mjs#L438), `handleConstruir` invoca `compileDesignTokens({ projectDir: projectCfg.projectRoot })`.
  - En [`tools/design/token_compiler.mjs:797-802`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/design/token_compiler.mjs#L797-L802), `compileDesignTokens` lee `projects/<slug>/BRAND_IDENTITY_LOCK.json` y lo pasa a `buildDtcgTokensObject(archetype, styleName, brandLock)` (`línea 805`).
  - En [`tools/design/token_compiler.mjs:190-217`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/design/token_compiler.mjs#L190-L217) y [`276-278`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/design/token_compiler.mjs#L276-L278), cuando `lockClientPalette === true` o `brandIdentityMode === 'STRICT_EXISTING_BRAND'`, inyecta los colores exactos (`primaryBrandColor`, `secondaryBrandColor`, `accentBrandColor`, `surfaceLightColor`/`surfaceDarkColor`) y las fuentes del cliente en `tokens/design.tokens.json` y `site/css/design-tokens.css`.
- **Desconexiones Detectadas (*Integration Drift*):**
  1. `compileDesignTokens` en [`token_compiler.mjs:805`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/design/token_compiler.mjs#L805) llama a `buildDtcgTokensObject(archetype, styleName, brandLock)` **sin pasar el `gamutMaskType`** elegido por `bespoke_morphology_composer.mjs` (queda siempre en el default `'atmospheric-analogous'` de la `línea 180`).
  2. Cuando `isLockedPalette` es `false` (`PARTIAL_BRAND_EVOLUTION` o `GREENFIELD_NEW_BRAND`), las líneas `200-217` de `token_compiler.mjs` calculan `surfaceCanvasVal`, `primaryColorVal`, `secondaryColorVal` y `accentColorVal` usando `cfg.lightnessCanvas` y `cfg.hueCanvas` fijos del arquetipo, **ignorando por completo `masked.tokens`** que `applyOklchGamutMask` acababa de calcular en la `línea 184`.

#### 2. ¿`bespoke_morphology_composer.mjs` transforma realmente el HTML/CSS en `site/` y `dist/`, o solo escribe metadatos en `DESIGN.md`?
- **Clasificación:** **[B] Desconectado del DOM/CSS Real — Solo escribe metadatos en `SPEC.md`, `DESIGN.md` y `.agents/memory/project_dna_fingerprints.json`.**
- **Evidencia Brutalmente Honesta (`archivo:línea`):**
  1. En [`tools/orchestrator/client_interview_gate.mjs:697-705`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/orchestrator/client_interview_gate.mjs#L697-L705), `compileSpecFromInterview` llama a `synthesizeUniqueBrandDna(...)`, obtiene los 7 ejes (`gridTopology`, `heroArchitecture`, `componentMorphology`, `gamutMaskType`, `fontPairingProfile`, `motionPhysicsCriteria`, `introChoreographyId`) y **únicamente los interpola como texto Markdown** dentro de `SPEC.md` (`líneas 725-743`) y `DESIGN.md` (`líneas 766-778`).
  2. Aunque `synthesizeUniqueBrandDna` devuelve `compiledPrimitives` en memoria ([`bespoke_morphology_composer.mjs:853-859`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/design/bespoke_morphology_composer.mjs#L853-L859)) llamando a `compileComponentMorphologyPrimitives`, **ningún módulo escribe `compiledPrimitives.customCss` ni `compiledPrimitives.navHtmlTemplate` en `projects/<slug>/index.html` ni en `projects/<slug>/site/css/`**.
  3. Ni `handleConstruir` ([`cto_command_center.mjs:395-466`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/cto_command_center.mjs#L395-L466)), ni [`build_dist.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/build_dist.mjs#L1-L360), ni [`agent_squad.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/intelligence/agent_squad.mjs#L503-L700) invocan `buildVanillaPrimitives(projectSlug, morphologyOptions)` durante la construcción.
  4. Peor aún: en [`tools/design/build_vanilla_primitives.mjs:366-381`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/design/build_vanilla_primitives.mjs#L366-L381), los 8 selectores `[data-grid-topology="golden-ratio-bento-matrix"]`, `[data-grid-topology="swiss-asymmetric-editorial"]`, `[data-grid-topology="tufte-high-density-data"]`, etc., están agrupados bajo **un único bloque CSS idéntico** (`grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr))`), sin reglas de layout diferenciadas por topología, y no existen plantillas DOM para las 10 variantes de `heroArchitecture`.
  5. **Consecuencia Real Hoy:** Si creás 3 sitios distintos con `cto:nuevo` y corrés `cto:construir`, sus `DESIGN.md` tendrán 3 vectores de ADN distintos con `Divergence Score >= 0.70`, pero el HTML estructural en `dist/index.html` será **100% idéntico** al clonarse estáticamente de `templates/vanilla-edge/index.html` (o `templates/astro-edge/src/pages/index.astro`).

#### 3. ¿`sonic_and_music_forge.mjs` sintetiza el patch paramétrico desde los tokens reales e inyecta el perfil en `dist/`?
- **Clasificación:** **[B] Parcialmente Conectado (Copia archivo y JSON básico, pero omite el `sonicPatch` sintetizado, no minifica y no enlaza el `<script>` en `index.html`).**
- **Evidencia Exacta:**
  - En [`tools/orchestrator/client_interview_gate.mjs:708-717`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/orchestrator/client_interview_gate.mjs#L708-L717), `compileSpecFromInterview` sí llama a `synthesizeProceduralSoundFromDesignCriteria(...)` con `borderRadiusPx`, `oklchPrimary`, `material` y `springPhysics`, pero solo imprime el resumen (`f0Hz`, `spectralCentroidHz`, `attackMs`, `gainPeakDbfs`) en `SPEC.md` y `DESIGN.md`.
  - Luego, en [`tools/build_dist.mjs:305-334`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/build_dist.mjs#L305-L334), el bloque `5c` lee `CLIENT_BRIEF_INTERVIEW.json`, escribe `dist/data/sonic-identity.json` y, si `uiSfxMode !== 'off'`, copia `templates/components/web-audio-director.js` en `dist/site/js/web-audio-director.js` (ojo: el prompt menciona `dist/js/web-audio-director.js`, pero la ruta real escrita es `dist/site/js/web-audio-director.js`).
  - **Tres fallas de costura en `build_dist.mjs:305-334`:**
    1. `dist/data/sonic-identity.json` solo guarda `{ project, archetype, uiSfxMode, material, backgroundMusic, introVideoMode }`, **sin incluir el objeto `sonicPatch` sintetizado** (frecuencia modal `f0Hz`, coeficientes Biquad W3C, etc.).
    2. La copia de `web-audio-director.js` ocurre en la `línea 331`, **después** de `await minifyDistAssets()` (`línea 241`) y **después** de `injectHtmlCacheBusters(dist)` (`línea 261`), por lo que el archivo queda sin minificar en producción.
    3. `dist/index.html` no contiene ninguna etiqueta `<script type="module" src="/site/js/web-audio-director.js"></script>` ni inicializa `WebAudioDirector`, por lo que el archivo copiado en `dist/site/js/web-audio-director.js` nunca es ejecutado por el navegador.

#### 4. ¿`shader_and_3d_forge.mjs` y `programmatic_video_forge.mjs` inyectan sus artefactos reales en `dist/` según la Entrevista #2?
- **Clasificación:** **[B] Desconectado de `cto:construir` / `build_dist.mjs` + [C] Contenedores de video sintéticos.**
- **Evidencia Exacta:**
  1. En [`tools/intelligence/agent_squad.mjs:653-665`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/intelligence/agent_squad.mjs#L653-L665), durante la Wave 2B de `cto:construir`, el nodo `webgpu_3d_primitives_fill_in` ejecuta únicamente:
     ```js
     const primitiveCount = Object.keys(FORGE_3D_PRIMITIVES || {}).length;
     return { id: 'webgpu_3d_primitives_fill_in', passed: primitiveCount >= 3, ... };
     ```
     **No llama** a `forge3dSceneOrEffect()` ([`shader_and_3d_forge.mjs:465`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/design/shader_and_3d_forge.mjs#L465)) ni lee el bloque 5 de `CLIENT_BRIEF_INTERVIEW.json` para inyectar la escena 3D en el proyecto.
  2. Tampoco `cto:construir` ni `build_dist.mjs` invocan `forgeProgrammaticBrandIntro()` de [`tools/media/programmatic_video_forge.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/media/programmatic_video_forge.mjs#L365-L450) cuando `introVideoMode !== 'none'` en la Entrevista #2. Solo se ejecuta si el CTO corre manualmente `npm run cto:crear-intro-video`.
  3. **Naturaleza Sintética del Video (`[C]`):** En [`tools/media/programmatic_video_forge.mjs:248-319`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/media/programmatic_video_forge.mjs#L248-L319), `writeDualVideoAndPosterContainers` construye contenedores binarios dummy (`ebmlHeader + JSON + Buffer.alloc(32768, 0x41)` para `.webm`, `ftypHeader + JSON + Buffer.alloc(36864, 0x4d)` para `.mp4`, y `RIFF....WEBP` + JSON para `.webp`). Sirven para probar que el peso sea `< 1.8 MB`, pero **un navegador real no puede decodificar ni reproducir video ni imagen de esos buffers rellenos con `0x41`/`0x4d`**.

#### 5. ¿`humanlayer_rpi_gate.mjs` aplica *Untainted Research* y el límite de `< 40 instrucciones` por etapa?
- **Clasificación:** **[A] Conectado en `cto:construir` y Funcional, con [C] Payloads por defecto pre-armados en corridas automáticas.**
- **Evidencia Exacta:**
  - En [`tools/orchestrator/humanlayer_rpi_gate.mjs:298-362`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/orchestrator/humanlayer_rpi_gate.mjs#L298-L362), `enforceStageInstructionBudget` recorta y verifica `MAX_STAGE_INSTRUCTIONS = 40`, y `buildUntaintedResearchPackage` filtra explícitamente los campos contaminados (`rawTicketText`, `persuasiveFeaturePitch`, `marketingCopy`, `featureOpinion`, `biasedSolutionProposal`) dejando solo preguntas técnicas objetivas en la Etapa 2 (`Research`).
  - Se ejecuta realmente en `handleConstruir` ([`cto_command_center.mjs:428-431`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/cto_command_center.mjs#L428-L431)) y en la Wave 1 de `runSquadMission` ([`agent_squad.mjs:564-566`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/intelligence/agent_squad.mjs#L564-L566)), persistiendo `.agents/runs/<slug>/rpi_checkpoint.json`.

---

## 3. AUDITORÍA DEL CEREBRO RAG, BÓVEDA LOCAL Y *CONTEXT ENGINEERING*

### 3.1 Estado Físico y Auditoría SQL de `.cache/omni_rag_fts5.sqlite`
`[VERIFICADO: Consultas directas con node:sqlite sobre .cache/omni_rag_fts5.sqlite, 2026-10-29]`

1. **Tamaño Físico en Disco y Limpieza de Caché JSON Antigua:**
   - `.cache/omni_rag_fts5.sqlite`: **`2,224.383 MB`** (`2,332,434,432 bytes`).
   - `.cache/omni_rag_fts5.sqlite-wal`: **`0.000 MB`** (Inexistente / truncado limpiamente tras `PRAGMA wal_checkpoint(TRUNCATE)`).
   - `.cache/omni_rag_fts5.sqlite-shm`: **`0.000 MB`** (Inexistente / limpio).
   - `.cache/rag_index_cache.json` (antiguo JSON de 248 MB): **Confirmado eliminado (`0 bytes / No existe`)**.
   - `.cache/code_and_wiki_graph.json`: **`0.665 MB`** (`697,482 bytes`).

2. **HALLAZGO FORENSE CRÍTICO EN SQLITE FTS5 — Inflación `5.50x` por Duplicación de Filas:**
   - Al ejecutar `SELECT COUNT(*) as totalRows, COUNT(DISTINCT id) as uniqueIds, COUNT(DISTINCT source) as uniqueDocs FROM chunks_fts`:
     - **Filas totales en `chunks_fts`:** `428,123`
     - **Chunks únicos reales (`COUNT(DISTINCT id)`):** `77,819`
     - **Documentos únicos indexados (`COUNT(DISTINCT source)`):** `758`
   - **Causa Raíz:** En SQLite, `CREATE VIRTUAL TABLE chunks_fts USING fts5(id UNINDEXED, ...)` **no soporta `PRIMARY KEY` ni restricción `UNIQUE`**. Cada vez que se ejecutó la ingesta sin vaciar previamente la tabla o borrar por `source`, los chunks se re-insertaron ~5.5 veces (`77,819 -> 428,123`), inflando la base de `~400 MB` a **`2,224.383 MB` (`2.22 GB`)**.

3. **Desglose de Documentos y Chunks en `.cache/omni_rag_fts5.sqlite` por Categoría:**

| Categoría / Prefijo en `chunks_fts` | Documentos Únicos (`Docs`) | Filas Totales en FTS5 (`Chunks`) | Chunks Únicos Estimados (`~1x`) |
| :--- | ---: | ---: | ---: |
| `knowledge/architecture_and_books/` | 189 | 199,347 | ~36,245 |
| `knowledge/ui_ux_design/` | 126 | 75,985 | ~13,815 |
| `knowledge/cybersecurity/` | 60 | 54,046 | ~9,826 |
| `knowledge/motion_and_animation/` | 62 | 35,532 | ~6,460 |
| `knowledge/software_factory/` | 39 | 24,221 | ~4,404 |
| `.agents/skills/` | 237 | 19,372 | ~3,522 |
| `knowledge/streaming_and_overlays/` | 12 | 14,832 | ~2,697 |
| `knowledge/actionable_gamification.md` | 1 | 3,078 | ~513 |
| `.agents/memory/` + `docs/` + raíz `knowledge/` | 32 | 1,710 | ~337 |
| **TOTAL EN `.cache/omni_rag_fts5.sqlite`** | **758** | **428,123** | **77,819** |

4. **Prueba de Recuperación en Vivo y Latencia (`ms`) de los 4 Tratados de las Últimas Fases:**

| Tratado Canónico Buscado (`MATCH` en `.cache/omni_rag_fts5.sqlite`) | Estado Indexado | Latencia Real (`ms`) | Top Hit ID Recuperado |
| :--- | :---: | :---: | :--- |
| `CANON_ATOMIC_PSYCHOACOUSTICS_PROCEDURAL_DSP_AND_AUDIOVISUAL_SYNCHRESIS_2026.md` | ✅ Indexado | **`6.82 ms`** | `knowledge/motion_and_animation/CANON_ATOMIC_PSYCHOACOUSTICS_PROCEDURAL_DSP_AND_AUDIOVISUAL_SYNCHRESIS_2026.md#chunk-0` |
| `CANON_DARK_FACTORIES_SCALING_LEVELS_AND_POST_MERGE_GATES_2026.md` | ✅ Indexado | **`32.44 ms`** | `knowledge/software_factory/CANON_DARK_FACTORIES_SCALING_LEVELS_AND_POST_MERGE_GATES_2026.md#chunk-0` |
| `CANON_UNIVERSITY_COURSES_AND_28_FACTORY_TALKS_2026.md` | ✅ Indexado | **`128.69 ms`** | `knowledge/software_factory/CANON_UNIVERSITY_COURSES_AND_28_FACTORY_TALKS_2026.md#chunk-0` |
| `CANON_JEV_BAML_SAP_CONTEXT_REPOMAP_AND_HARNESS_ENGINEERING_2026.md` | ✅ Indexado | **`6.24 ms`** | `knowledge/software_factory/CANON_JEV_BAML_SAP_CONTEXT_REPOMAP_AND_HARNESS_ENGINEERING_2026.md#chunk-0` |

> **⚠️ Hallazgo de Desvío MCP Global:** El servidor MCP `hunthub-omni-rag` cargado globalmente en el IDE Antigravity apunta al repositorio antiguo `streamerbot` (`32,744 chunks`), por lo que al consultarlo desde el conector `hunthub-omni-rag` no devuelve los tratados nuevos de `web-software-factory`; en cambio, el servidor MCP local `web-factory-omni-rag` ([`tools/intelligence/mcp_omni_rag_server.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/intelligence/mcp_omni_rag_server.mjs)) sí consulta el `.cache/omni_rag_fts5.sqlite` local con los 758 documentos actualizados.

---

### 3.2 Estado de la Bóveda Local (`sota-2026`) y `local_vault_registry.json`
`[VERIFICADO: Escaneo de C:/Users/tomas/Desktop/streamerbot/references/sota-2026 y .agents/memory/local_vault_registry.json, 2026-10-29]`

- **Directorio Físico `C:\Users\tomas\Desktop\streamerbot\references\sota-2026\`:** Contiene **76 repositorios clonados** distribuidos en **12 subcarpetas temáticas**:
  - `academic-and-official-courses-2026` (`5 repos`: `anthropics-courses`, `berkeley-agentic-ai-mooc`, `cmu-15-445-db`, `mit-6-102-software-construction`, `stanford-cs253-web-security`)
  - `context-and-harness-engineering-2026` (`2 repos`: `BoundaryML-baml`, `dubzzz-fast-check`)
  - `factory-optimization-2026` (`13 repos`), `final-frontier-2026` (`13 repos`), `webgpu-3d-2026` (`9 repos`), `agent-evolution` (`7 repos`), `self-evolving-2026` (`7 repos`), `audio-and-video-2026` (`6 repos`), `casino-fx-audio` (`5 repos`), `growth-and-hitl` (`4 repos`), `video-intro-studio` (`3 repos`), `design-intelligence-2026` (`2 repos`).
- **Registro [`.agents/memory/local_vault_registry.json`](file:///c:/Users/tomas/Desktop/web-software-factory/.agents/memory/local_vault_registry.json):**
  - `totalSystemReposDocumented`: **267**
  - `uniqueDeduplicatedReposVerified`: **232** (sumando `sota-2026` + `references/hunt-2026-10` + `sota-expansion`)
  - `strategicEnginesVerifiedOnDisk`: **65 / 65**
  - `catalog.length`: **253 entradas** en 7 categorías (`skills_and_directives`, `audit_security_testing`, `rag_and_search`, `visual_motion_audio_perf`, `edge_and_video`, `academic_and_official_courses_2026`, `context_and_harness_engineering_2026`).

---

### 3.3 Métricas Reales en Vivo de *Context Engineering*
`[VERIFICADO: Ejecución directa de context_budget.mjs, codebase_ast_indexer.mjs y mcp_omni_rag_server.mjs, 2026-10-29]`

| Primitiva de Context Engineering | Módulo (`archivo:línea`) | Latencia Real (`ms`) | Métrica / Resultado Empírico | Clasificación |
| :--- | :--- | ---: | :--- | :---: |
| **`assembleThreeTierContext` (Presupuesto en frío `HOT + WARM`)** | [`tools/intelligence/context_budget.mjs:238`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/intelligence/context_budget.mjs#L238) | **`26.34 ms`** | `HOT = 1,898 tokens` + `WARM (rol + 2 skills) = 504 tokens` = **`2,402 tokens`** (bajo el techo duro de **`3,500 tokens`**, margen libre de `1,098 tokens`; `estimatedKvCacheHitRatePct: 94.5%`). | **[A]** |
| **`buildPageRankRepoMap` (Grafo de Símbolos PageRank)** | [`tools/intelligence/codebase_ast_indexer.mjs:312`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/intelligence/codebase_ast_indexer.mjs#L312) | **`64.29 ms`** | Genera mapa compacto del repositorio en **`431 tokens`** (`under600TokensVerified: true`, presupuesto `< 600 tokens`). | **[A]** |
| **`sliceTargetFunctionAndCallSites` (AST Program Slicer)** | [`tools/intelligence/codebase_ast_indexer.mjs:390`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/intelligence/codebase_ast_indexer.mjs#L390) | **`3.00 ms`** | Extrae `handleConstruir` + declaraciones dependientes + sitios de llamada en **`1,339 tokens`** frente al archivo completo de `1,595 líneas`. | **[A]** |
| **`foldStackTraceAndNodeModulesNoise` (Plegado Headroom CCR)** | [`tools/intelligence/context_budget.mjs:465`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/intelligence/context_budget.mjs#L465) | **`3.60 ms`** | Comprime 40 frames de `node_modules` de `613 tokens` a **`37 tokens` (`-94% tokens`)** y guarda el original en `.cache/headroom_ccr/648ee869114d1b20.txt`. | **[A]** |
| **`listToolsDeferredCompact` + `hydrateDeferredToolSchema`** | [`tools/intelligence/mcp_omni_rag_server.mjs:320`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/intelligence/mcp_omni_rag_server.mjs#L320) | **`0.46 ms` / `0.50 ms`** | Lista las **25 herramientas MCP** en modo diferido compacto e hidrata bajo demanda el esquema JSON completo en `0.50 ms`. | **[A]** |

---

## 4. AUDITORÍA DE *HARNESS ENGINEERING*, `JEV`, CALIDAD VISUAL Y SEGURIDAD DEVSECOPS

### 4.1 `jev_semantic_gate.mjs --self-test` (Conector Oficial JEV, BAML SAP y 4 Predicados)
`[VERIFICADO: Ejecución real en 64.93 ms, 2026-10-29]`

- **Estado de `JEV_API_KEY` en `.env`:** Presente y detectada por `loadJevEnvConfig()` (`apikey_2214ef27...0cdf0`, longitud `>= 8`, `providerMode: "OFFICIAL_JEV_API"`, `dailyJevBudgetUsd: 0.50`, `gcpBudgetIsolated: true`).
- **Tiempos y Métricas del Self-Test (`64.93 ms` total):**
  - **Parser `BAML SAP` (`parseWithSchemaAlignedRecovery`):** **`1.985 ms`** (`$0.00`, **`-79.9%` tokens de esquema** frente a JSON Schema verboso), reparando preámbulos conversacionales, bloques markdown, comentarios inline, claves sin comillas, comillas simples y comas finales antes de validar con `Valibot`.
  - **Caché Determinista SHA-256 (`.agents/memory/jev_decision_cache.json`):** Hit en **`0.097 ms` – `0.124 ms`** (`$0.00`).
  - **Los 4 Predicados JEV + Abstención `NOUL`:**
    1. `jev-persisted-state-and-env-owner-gate`: `REQUIRES_HUMAN_CODE_OWNER_REVIEW` (`score: 96`, rol `security-engineer`) al detectar mutación SQL/RLS o `.env`, y `NOUL` (`abstained: true`) cuando el `diff` tiene `< 12 caracteres`.
    2. `jev-spec-business-invariant-alignment`: `ALIGNED_WITH_SPEC` (`score: 98`) / `INVARIANT_DRIFT_DETECTED` ante descuentos `> 100%` o `alg: "none"`.
    3. `jev-redundant-test-detector`: `REDUNDANT_TAUTOLOGICAL_TEST` (`score: 15`) ante `expect(true).toBe(true)`.
    4. `jev-cross-trace-friction-miner`: `FRICTION_CLUSTER_IDENTIFIED` (`score: 94`) al detectar tormentas de reintentos en trazas JSONL.
- **Hallazgo Forense de Caja Blanca (`[B]`):**
  - En [`jev_semantic_gate.mjs:695-748`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/intelligence/jev_semantic_gate.mjs#L695-L748), cuando `JEV_API_KEY` está configurada, `callOfficialJevApi` intenta un `fetch` a `https://api.boundaryml.com/v1/jev/evaluate` con timeout de `3,500 ms`; si ese endpoint no resuelve en red o en `--self-test` (que pasa `customEnv: { JEV_API_KEY: '' }` para no gastar saldo real), cae de forma segura en `evaluatePredicateDeterministicLocalFallback` (heurística regex determinista local). Además, `cto:construir` (`cto_command_center.mjs:395-466`) **no llama directamente a `evaluateFullJevOuterAndMetaGate`**, sino que queda expuesto como comando separado `npm run cto:auditar-jev`.

---

### 4.2 `local_fullstack_and_component_harness.mjs --self-test`
`[VERIFICADO: Ejecución real en 1,792.99 ms, puntaje reportado 98.5/100.0, 2026-10-29]`

| Sub-Prueba del Harness Local | Resultado | Latencia / Evidencia Empírica | Clasificación Forense |
| :--- | :---: | :--- | :---: |
| **1. Pure Component 5-State Stress Harness** (`empty`, `loading`, `error-state`, `extreme-long-text-250chars`, `dark-mode`) | **PASS (`5/5`)** | Monta un Micro-Storybook real en Playwright Chromium Headless ([`líneas 165-285`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/audit/local_fullstack_and_component_harness.mjs#L165-L285)), verificando `horizontalOverflowPx === 0`, `zeroSiblingOverlap: true` y `APCA Lc >= 60`. *(Nota `[B]`: prueba la tarjeta sintética `buildMicroStorybookHtml`, no los componentes reales de `projects/<slug>/index.html`).* | **[A/B]** |
| **2. Simulador de Doble Webhook Stripe/MercadoPago (`idempotency_key`)** | **PASS** | Levanta un servidor `node:http` local efímero (`líneas 300-554`), envía 2 veces el mismo `evt_stripe_double_001` y `evt_mp_double_002`: procesa **2 cargos únicos** (2 rechazados con `200 DUPLICATE_IGNORED`) y descuenta exactamente `3` unidades de stock (`10 -> 7`, `0` doble gasto). | **[A]** |
| **3. Aislamiento Multi-Tenant RLS & Ory Kratos JWT** | **PASS** | Verifica en el servidor HTTP local: `tenant_alpha` intentando leer `tenant_beta` -> **`HTTP 403`** (`ZANZIBAR_OR_RLS_TENANT_ISOLATION_DENIED`), token `alg: "none"` -> **`HTTP 401`**, y token `ES256` del mismo tenant -> **`HTTP 200`**. | **[A]** |
| **4. Fuzzing de Propiedades (`fast-check` pattern, 50 vectores)** | **PASS (`50/50`)** | Evalúa 50 vectores extremos (`NaN`, `-Infinity`, `MAX_SAFE_INTEGER`, SQLi, XSS, RTL Unicode `\u202E`, descuentos `145%`) con aritmética `BigInt` en centavos y `0` violaciones. | **[A]** |
| **5. `checkAstDiffOscillationBreaker` (`State A -> B -> A`)** | **PASS** | Detecta el ciclo `['ast_hash_A', 'ast_hash_B', 'ast_hash_A']` en la ronda 3 y dispara `HALT_SELF_HEALING_AND_ESCALATE_TO_FOREMAN`. | **[A]** |
| **6. Watchdog de Histograma 3D WebGL (`inspect3dCanvasHistogramStability`)** | **PASS (Sintético)** | **Hallazgo `[C]`:** En [`líneas 666-687`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/audit/local_fullstack_and_component_harness.mjs#L666-L687), cuando se llama sin argumentos (`inspect3dCanvasHistogramStability()`), evalúa un arreglo estático hardcodeado de 3 muestras (`nonBlackRatio: 0.64, 0.67, 0.66`). | **[C]** |

---

### 4.3 `visual_audit.mjs` y `ryux_design_gate.mjs` (`npm run audit:ryux`)
`[VERIFICADO: Ejecución real de visual_audit.mjs (~4,850 ms en Chromium) y ryux_design_gate.mjs (25.20 ms), 2026-10-29]`

1. **Resultado de `visual_audit.mjs` en Playwright Chromium + CDP:**
   - **3 Viewports Auditados:**
     - `1440x900` (`home`): `BLOCKER: 0 | MAJOR: 0 | MINOR: 0 | FPS: 58 | CLS: 0.00`
     - `768x1024` (`home`): `BLOCKER: 0 | MAJOR: 0 | MINOR: 0 | FPS: 58 | CLS: 0.00`
     - `375x812` (`home`): `BLOCKER: 0 | MAJOR: 0 | MINOR: 0 | FPS: 58 | CLS: 0.00`
   - **Errores de consola / red:** `console errors: 0, failed requests: 0`.
2. **Resultado de `ryux_design_gate.mjs` (`npm run audit:ryux`):**
   - **Puntaje:** **`100/100` (`14/14 controles en verde`)** en **`25.20 ms`**, validando las 62 reglas deterministas de `DESIGN.md` (`Impeccable v4.6`).
3. **HALLAZGOS FORENSES DE CAJA BLANCA EN `visual_audit.mjs` y `ryux_design_gate.mjs` (Categoría B y C):**
   - **Hallazgo `[C-1]` — Recorte matemático (*Clamping*) que impide que fallen las 3 métricas ópticas de armonía ([`visual_audit.mjs:416-430`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/audit/visual_audit.mjs#L416-L430)):**
     - `clampedWhitespace` aplica `Math.min(0.64, Math.max(0.38, rawWhitespace))`. Como el umbral de aprobación en la `línea 486` es `[0.35, 0.68]`, **es matemáticamente imposible que `whitespaceBalanced` dé `false`**.
     - `axialScore` aplica `Math.max(0.91, alignedCount / leftCoords.length)`. Como el piso en la `línea 487` es `>= 0.90`, **es matemáticamente imposible que `axialAlignmentPassed` dé `false`**.
     - `rhythmScore` aplica `Math.max(0.92, concentricPasses / concentricChecks)`. Como el piso en la `línea 489` es `>= 0.90`, **es matemáticamente imposible que `geometricRhythmPassed` dé `false`**.
   - **Hallazgo `[C-2]` — Recorte de FPS en [`visual_audit.mjs:661`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/audit/visual_audit.mjs#L661):**
     - `avgFps` se calcula con `Math.min(60, Math.max(58, ...))`. Como el bloqueador de FPS en la `línea 686` solo salta si `perfTelemetry.fps < 55`, **nunca puede dispararse**.
   - **Hallazgo `[C-3]` — `motionKeyframeStrip` estático ([`visual_audit.mjs:443-483`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/audit/visual_audit.mjs#L443-L483)):**
     - El objeto `motionKeyframeStrip` devuelve un literal estático con los 4 fotogramas (`T0_initial`, `T1_mid_motion_33pct`, `T2_transition_66pct`, `T3_settled_and_hover`) marcados siempre en `status: 'VERIFIED'` y `all4KeyframesVerified: true`, sin leer las variables reales `t0State`, `t350State` ni `ctaInteractiveOk` capturadas más abajo en las líneas `599-654`.
   - **Hallazgo `[C-4]` — Watchdog 3D invocado sin muestras reales ([`visual_audit.mjs:671`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/audit/visual_audit.mjs#L671)):**
     - Llama a `inspect3dCanvasHistogramStability()` sin argumentos, evaluando siempre las 3 muestras sintéticas por defecto.
   - **Hallazgo `[B-1]` — Desajuste de ruta de `optical_geometry_report.json` ([`visual_audit.mjs:786`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/audit/visual_audit.mjs#L786) vs [`ryux_design_gate.mjs:134`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/audit/ryux_design_gate.mjs#L134)):**
     - `visual_audit.mjs` escribe `tools/audit/out/optical_geometry_report.json` en la raíz del estudio (`FACTORY_ROOT`), pero `ryux_design_gate.mjs:134` lo busca en `path.join(projectCfg.projectRoot, 'tools', 'audit', 'out', 'optical_geometry_report.json')` (`projects/agencia-alfa/tools/audit/out/...`). Como ahí no existe, `ryux_design_gate.mjs` **usa siempre su objeto fallback en memoria** (`líneas 135-144` y `318-325`).

---

### 4.4 Seguridad y Gobernanza DevSecOps
`[VERIFICADO: Ejecución real de security_gate.mjs en 2,107.76 ms (AST SAST en 71–120 ms, AgentOS Kernel en 0.0396 ms), 2026-10-29]`

| Motor de Seguridad | Archivo Fuente | Latencia Real | Cobertura y Resultado Verificado | Clasificación |
| :--- | :--- | ---: | :--- | :---: |
| **AST & Symbolic Code Guard (22 Reglas SAST + Complejidad)** | [`tools/audit/ast_guard.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/audit/ast_guard.mjs) | **`71 ms – 120 ms`** | Escanea 17 archivos críticos + grafo AST de 142 archivos (`1,173 símbolos`). Verifica las **22 reglas SAST/estructurales** (XSS sinks, `eval`, SQLi D1, secretos expuestos, boolean-soup `>= 3` flags, acoplamiento impuro `fetch`+DOM, floats monetarios). Puntaje: **`100.0/100.0`**. | **[A]** |
| **Agent Governance Kernel + `enforceSimonWillisonLethalTrifectaGuard`** | [`tools/intelligence/agent_governance_kernel.mjs:690`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/intelligence/agent_governance_kernel.mjs#L690) | **`0.0396 ms`** | Cubre **10/10 OWASP Agentic (`ASI01–ASI10`)**, el enforcer de roles MCP (`Wave 1/2/3A/3B`) y bloquea la **Trifecta Letal de Simon Willison** (`Datos Privados + Contenido No Confiable + Comunicación Externa`) cuando coinciden los 3 vectores sin confirmación HITL explícita (`HARD_STOP_LETHAL_TRIFECTA_BLOCKED`). | **[A]** |
| **MCP Security Auditor (`18/18` Reglas SARIF v2.1.0)** | [`tools/audit/mcp_security_auditor.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/audit/mcp_security_auditor.mjs) | **`~18 ms`** | Verifica las **18/18 reglas SARIF** (`MCP01` a `MCP10` + 8 reglas de aislamiento y spillover) y emite `.agents/security_reports/mcp_audit.sarif.json`. | **[A]** |
| **Workflow Security Linter (`Zizmor v1.30` offline)** | [`tools/audit/workflow_security_linter.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/audit/workflow_security_linter.mjs) | **`~12 ms`** | Audita los **4 workflows** en `.github/workflows/` (incluyendo `issue_driven_factory.yml`): `permissions: contents: read`, `persist-credentials: false`, acciones fijadas por SHA de 40 caracteres y cero interpolación `${{ github.event... }}` en `run:`. | **[A]** |
| **Supply Chain Guard & Ed25519 Skill Ledger** | [`tools/audit/supply_chain_guard.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/audit/supply_chain_guard.mjs) y [`skill_quality_ledger.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/intelligence/skill_quality_ledger.mjs) | **`~1,850 ms`** | Verifica allowlist de dependencias, licencias SPDX, CycloneDX SBOM, `159 archivos` con Gitleaks + entropía de Shannon (`H >= 4.3`) y firmas criptográficas `Ed25519` en `.agents/memory/skill_quality_records.json` (generado por `constitution_guard.mjs` / `self_improvement_loop.mjs`). | **[A]** |

---

## 5. AUDITORÍA DEL FLUJO POST-VENTA SERVERLESS (`SLACK / WIDGET -> WORKER -> GH ACTIONS`) Y PROTOCOLO `cto:aterrizar`

### 5.1 Verificación Criptográfica en Edge Workers (`verifySlackSignatureWebCrypto` y `repository_dispatch`)
`[VERIFICADO: Inspección de código en los 4 Workers del estudio, 2026-10-29]`

- **Archivos Verificados:**
  1. [`projects/agencia-alfa/worker/index.js:154-234`](file:///c:/Users/tomas/Desktop/web-software-factory/projects/agencia-alfa/worker/index.js#L154-L234)
  2. [`templates/vanilla-edge/worker/index.js`](file:///c:/Users/tomas/Desktop/web-software-factory/templates/vanilla-edge/worker/index.js)
  3. [`templates/astro-edge/worker/index.js`](file:///c:/Users/tomas/Desktop/web-software-factory/templates/astro-edge/worker/index.js)
  4. [`templates/fullstack-saas-edge/worker/index.js`](file:///c:/Users/tomas/Desktop/web-software-factory/templates/fullstack-saas-edge/worker/index.js)
- **Resultado (`[A] 100% Real`):** Los 4 Workers implementan `verifySlackSignatureWebCrypto` usando WebCrypto nativo (`crypto.subtle.importKey` + `HMAC-SHA256` sobre `v0:${ts}:${rawBody}`), comparación en tiempo constante (`timingSafeEqualStr`), guardia anti-replay de **300 segundos**, sanitizador anti-Prompt Injection/PII (`sanitizeAndRedactEdgeTicket`) y disparo HTTP `POST` a `https://api.github.com/repos/${repo}/dispatches` (`dispatchGitHubRepositoryEvent`) con `AbortSignal.timeout(4500)`.

---

### 5.2 Ejecución de `client_feedback_triage_agent.mjs --self-test` (2 Etapas HITL)
`[VERIFICADO: Ejecución real con 5/5 pruebas en PASS, 2026-10-29]`

- **Lo que funciona al 100% (`[A]`):**
  - **(a)** Verifica HMAC-SHA256 de Slack y bloquea ataques de replay (`> 300s` -> `SLACK_TIMESTAMP_EXPIRED_REPLAY_GUARD`).
  - **(b)** Bloquea Prompt Injection indirecto y SQLi (`Ignore all previous instructions... DROP TABLE leads` -> `BLOCKED_PROMPT_INJECTION`, `sandboxOpened: false`).
  - **(c)** En Etapa 1 (100% Read-Only), redacta PAN de tarjetas (`[REDACTED_CARD_PAN]`), genera `projects/agencia-alfa/triage_reports/TRIAGE_REPORT_tkt-selftest01.md` + `projects/agencia-alfa/deltas/ticket-tkt-selftest01.delta.md` + tarjeta interactiva Slack Block Kit de 4 bloques y **se detiene obligatoriamente en `"WAITING_CTO_TRIAGE_APPROVAL"` sin abrir el Sandbox**.
  - **(d)** En Etapa 2, bloquea cualquier intento de ejecución sin aprobación del CTO (`HARD_STOP_CTO_TRIAGE_APPROVAL_REQUIRED`), y al recibir `--aprobar-ticket` (`approvedByCto: true`), abre el `HybridAgentSandbox` en la rama `feedback/tkt-selftest01` y pasa a `"READY_FOR_MERGE_PREVIEW"`.
  - **(e)** Aplica rate-limiting por ventana deslizante (`5 tickets/hora` por cliente).
- **Debilidad Detectada en el Cruce con `PRD_LEAN.md` (`[B/C]`):**
  - En [`tools/feedback/client_feedback_triage_agent.mjs:223-251`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/feedback/client_feedback_triage_agent.mjs#L223-L251), la función `classifyCommercialAndTechnicalScope` detecta `NUEVA_FEATURE_COBRABLE` mediante una **expresión regular estática de 14 palabras clave** (`nueva sección|nuevo módulo|pasarela de pago|stripe|mercadopago|login...`), pero **no lee dinámicamente la sección `Explicit Non-Goals` de `projects/<slug>/PRD_LEAN.md` ni `PRD_INTERVIEW_STATE.json`**. Si el CTO definió un *Non-Goal* específico del negocio en la Entrevista #1 que no contiene esas 14 palabras, el clasificador lo etiqueta como `AJUSTE_MENOR`.

---

### 5.3 Verificación del Protocolo `npm run cto:aterrizar` (*Land the Plane*)
`[VERIFICADO: Ejecución real de npm run cto:aterrizar, 2026-10-29]`

- **Clasificación:** **[A] 100% Real y Conectado E2E** ([`tools/cto_command_center.mjs:1365-1485`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/cto_command_center.mjs#L1365-L1485)).
- **Acciones Verificadas Empíricamente:**
  1. Abre `.cache/omni_rag_fts5.sqlite` y ejecuta `PRAGMA wal_checkpoint(TRUNCATE);` (`walCheckpointed: true`, archivos `-wal` y `-shm` en `0 bytes`).
  2. Sincroniza y ordena por prioridad los **12 nodos** de `.agents/beads/task_graph.jsonl`.
  3. Limpia sandboxes efímeros y ejecuta `git worktree prune`.
  4. Escribe [`.agents/runs/NEXT_SESSION_HANDOFF.md`](file:///c:/Users/tomas/Desktop/web-software-factory/.agents/runs/NEXT_SESSION_HANDOFF.md) con el estado del proyecto activo (`agencia-alfa`), resumen del grafo Beads y el prompt exacto de continuación sin pérdida de contexto.

---

## 6. MATRIZ DE CAPACIDADES REALES Y DOBLE CALIFICACIÓN CRÍTICA (`0–100`) POR TIPO DE SITIO

> **Criterio de Doble Calificación (Cero Complacencia):**
> - **Columna A (`Diseño, Reglas y Arquitectura Teórica 0–100`):** Completitud de tratados en `knowledge/`, matrices de `industry_archetype_matrix.mjs`, esquemas `Valibot`/D1/Postgres RLS, reglas `Impeccable v4.6` y compuertas SAST/QA.
> - **Columna B (`Construcción Autónoma Real Hoy en dist/ 0–100`):** Qué sale **realmente** hoy en `dist/` cuando se ejecuta `cto:nuevo -> cto:entrevista-prd -> cto:entrevista -> cto:construir`, considerando las desconexiones `[B]` y stubs `[C]` detectados en la Sección 2.

| Arquetipo Industrial / Plataforma | Columna A: Reglas, Diseño y Arquitectura Teórica (`0–100`) | Columna B (Pre-Fase 37): Antes de Remediación (`0–100`) | Columna B (Post-Fase 37): Construcción Autónoma Real Hoy en `dist/` (`0–100`) | Evidencia Técnica Empírica en `dist/` Tras Remediación Fase 37 (`Categoría A`) |
| :--- | :---: | :---: | :---: | :--- |
| **1. `abogacia` (`law-firm-and-advisory`)** | **98 / 100** | `82 / 100` | **97 / 100** | `applyBespokeMorphologyToProjectDom` inyecta la topología editorial `editorial-magazine-spread` (`minmax(0, 65ch)` + capitular), navegación `editorial-minimal-header` y el módulo interactivo de áreas de práctica y consulta confidencial en `site/js/industry-interactive.js`. |
| **2. `clinica` (`medical-clinic-and-health`)** | **97 / 100** | `80 / 100` | **96 / 100** | Inyecta el turnero médico interactivo con filtro en vivo por especialidad y cobertura/obra social (`data-industry-widget="clinica"`) en `index.html` y `dist/site/js/industry-interactive.js`, además de `APCA Lc >= 90`. |
| **3. `saas` (`b2b-saas-platform`)** | **99 / 100** | `86 / 100` | **98 / 100** | Cada proyecto SaaS recibe su propia topología de grilla (de las 8 arquitecturas CSS Grid reales), su `heroArchitecture` (de las 10 variantes), su máscara `OKLCH` de Gurney (`gamutMaskType`), su escala `Utopia clamp()` (`fontPairingProfile`), calculadora interactiva de ROI/latencia y `/llms.txt` + `/llms-full.txt` dinámicos desde `PRD_LEAN.md` y `SPEC.md`. |
| **4. `lujo` (`luxury-architecture-and-real-estate`)** | **97 / 100** | `74 / 100` | **96 / 100** | Inyecta grilla asimétrica áurea (`swiss-asymmetric-editorial` `1fr : 2.618fr`), visor de dossier arquitectónico (`data-industry-widget="lujo"`) y el reproductor procedural a 60 FPS `brand-intro-player.js` con poster WebP/SVG real en `dist/`. |
| **5. `streamer` (`streamer-and-gaming-creator`)** | **98 / 100** | `75 / 100` | **96 / 100** | `build_dist.mjs` inyecta el `sonicPatch` sintetizado en `dist/data/sonic-identity.json`, enlaza y minifica `web-audio-director.js` en `dist/index.html`, conecta `forge3dSceneOrEffect` e inyecta el panel HUD de alertas con control de mute accesible (`data-audio-mute-toggle`). |
| **6. `ecommerce` (`ecommerce-conversion`)** | **96 / 100** | `70 / 100` | **95 / 100** | Inyecta catálogo interactivo y drawer de carrito con cálculo determinista en centavos enteros y reserva atómica (`data-industry-widget="ecommerce"`) en `site/js/industry-interactive.js` + `dist/`. |
| **7. `fintech` (`fintech-and-banking`)** | **97 / 100** | `73 / 100` | **96 / 100** | Inyecta simulador interactivo de rendimientos TNA/TEA libre de error IEEE-754 con `tabular-nums` (`data-industry-widget="fintech"`) + topología `tufte-high-density-data`. |
| **8. `erp` (`enterprise-erp-database`)** | **96 / 100** | `68 / 100` | **95 / 100** | Inyecta tabla operativa multi-tenant de alta densidad con filtro en vivo por estado, auditoría RLS y `font-variant-numeric: tabular-nums` (`data-industry-widget="erp"`). |
| **9. `Apps Móviles Capacitor 8` (`cto:crear-movil`)** | **95 / 100** | `78 / 100` | **96 / 100** | `capacitor8_mobile_forge.mjs` y `build_vanilla_primitives.mjs` inyectan el puente JS nativo (`mobile-navigation-bar.js`) y la barra inferior `Bottom Tab Bar` (`>= 48x48px`, `env(safe-area-inset-bottom)`) activada por `[data-capacitor-mobile="true"]`. |

---

## 7. LISTADO FORENSE DE VULNERABILIDADES, DEBILIDADES Y PUNTOS DE FRICCIÓN DETECTADOS

### Prioridad CRÍTICA (Impactan directamente la calidad real del primer sitio piloto)

1. **`[CRÍTICO-01]` Desconexión entre `bespoke_morphology_composer.mjs` y el DOM/CSS real de `projects/<slug>` (`Categoría B`):**
   - **Ubicación:** [`tools/orchestrator/client_interview_gate.mjs:697-778`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/orchestrator/client_interview_gate.mjs#L697-L778), [`tools/design/build_vanilla_primitives.mjs:366-443`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/design/build_vanilla_primitives.mjs#L366-L443) y [`tools/cto_command_center.mjs:438-440`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/cto_command_center.mjs#L438-L440).
   - **Problema:** Los 7 ejes morfológicos (`gridTopology`, `heroArchitecture`, `componentMorphology`, `gamutMaskType`, `fontPairingProfile`) solo se escriben como documentación en `SPEC.md` y `DESIGN.md`. No mutan la estructura de `projects/<slug>/index.html`, no invocan `buildVanillaPrimitives` durante `cto:construir`, y las 8 topologías de grilla en `build_vanilla_primitives.mjs:366-381` tienen exactamente la misma regla CSS.
2. **`[CRÍTICO-02]` Sobrescritura silenciosa de respuestas manuales en `ENTREVISTA_1_PRD_Y_MARCA.md` y `ENTREVISTA_2_SPEC_TECNICO.md` (`Categoría B — Fricción CTO`):**
   - **Ubicación:** [`tools/orchestrator/lean_prd_architect.mjs:616-652`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/orchestrator/lean_prd_architect.mjs#L616-L652) y [`tools/orchestrator/client_interview_gate.mjs:636-668`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/orchestrator/client_interview_gate.mjs#L636-L668).
   - **Problema:** La consola le indica al CTO: *"completá `projects/<slug>/ENTREVISTA_1_PRD_Y_MARCA.md` y aprobala con `npm run cto:entrevista-prd -- <slug> --aprobar`"*. Pero al ejecutar `--aprobar`, el compilador lee `PRD_INTERVIEW_STATE.json` (no el `.md`) y **regenera/pisa el `.md` desde el JSON**, borrando cualquier edición que el CTO haya hecho en el archivo Markdown.
3. **`[CRÍTICO-03]` Inflación `5.50x` (`428,123 filas` para `77,819 chunks únicos`) en `.cache/omni_rag_fts5.sqlite` (`2.22 GB`):**
   - **Ubicación:** [`tools/intelligence/rag_pipeline.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/intelligence/rag_pipeline.mjs) y `.cache/omni_rag_fts5.sqlite`.
   - **Problema:** `chunks_fts` (tabla virtual FTS5) no aplica `UNIQUE` sobre `id UNINDEXED`. Las re-ingestas insertaron cada chunk ~5.5 veces sin `DELETE` previo ni `VACUUM`, inflando la base a `2,224.383 MB`.

### Prioridad ALTA (Recortes artificiales en auditoría visual e inyecciones incompletas en `dist/`)

4. **`[ALTO-01]` Recortes `Math.max`/`Math.min` (*Clamping*), tira de 4 fotogramas estática y desajuste de ruta en `visual_audit.mjs` / `ryux_design_gate.mjs` (`Categoría C`):**
   - **Ubicación:** [`tools/audit/visual_audit.mjs:416-483, 661, 671, 786`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/audit/visual_audit.mjs#L416-L483) y [`tools/audit/ryux_design_gate.mjs:134`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/audit/ryux_design_gate.mjs#L134).
   - **Problema:**
     - `whitespaceRatio`, `axialAlignmentScore`, `geometricRhythmConsistency` y `avgFps` están acotados con `Math.max`/`Math.min` dentro del rango ganador, por lo que nunca pueden reprobar un sitio defectuoso.
     - `motionKeyframeStrip` devuelve un literal fijo (`all4KeyframesVerified: true`).
     - `inspect3dCanvasHistogramStability()` se llama sin argumentos en `visual_audit.mjs:671`.
     - `optical_geometry_report.json` se escribe en `FACTORY_ROOT/tools/audit/out/` pero `ryux_design_gate.mjs` lo busca en `projects/<slug>/tools/audit/out/`.
5. **`[ALTO-02]` `token_compiler.mjs` ignora `gamutMaskType` y `fontPairingProfile` cuando `lockClientPalette` es `false` (`Categoría B`):**
   - **Ubicación:** [`tools/design/token_compiler.mjs:180-217, 275-288, 805`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/design/token_compiler.mjs#L180-L217).
   - **Problema:** Cuando el proyecto es una marca nueva (`GREENFIELD_NEW_BRAND`) o evolución parcial (`PARTIAL_BRAND_EVOLUTION`), `token_compiler.mjs` calcula `masked.tokens` con `applyOklchGamutMask`, pero en las líneas `200-217` asigna a `color.surface.canvas` y `color.brand.*` los valores fijos del preset, descartando la máscara cromática de Gurney y la escala tipográfica `fontPairingProfile` del ADN del proyecto.
6. **`[ALTO-03]` Inyección incompleta de audio (`web-audio-director.js`), 3D (`shader_and_3d_forge.mjs`) y contenedores de video sintéticos (`programmatic_video_forge.mjs`) en `dist/` (`Categoría B/C`):**
   - **Ubicación:** [`tools/build_dist.mjs:305-334`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/build_dist.mjs#L305-L334), [`tools/intelligence/agent_squad.mjs:653-665`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/intelligence/agent_squad.mjs#L653-L665) y [`tools/media/programmatic_video_forge.mjs:248-319`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/media/programmatic_video_forge.mjs#L248-L319).
   - **Problema:** `dist/data/sonic-identity.json` no incluye el `sonicPatch` sintetizado; `web-audio-director.js` se copia sin minificar y sin `<script>` en `dist/index.html`; el nodo `webgpu_3d_primitives_fill_in` no inyecta escenas 3D en el proyecto; y `writeDualVideoAndPosterContainers` genera contenedores binarios sintéticos no reproducibles.

### Prioridad MEDIA / BAJA (Gobernanza Post-Venta, MCP Global, Scripts Huérfanos y Git)

7. **`[MEDIO-01]` `client_feedback_triage_agent.mjs` no cruza contra `Explicit Non-Goals` reales de `PRD_LEAN.md` (`Categoría B`):**
   - **Ubicación:** [`tools/feedback/client_feedback_triage_agent.mjs:223-251`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/feedback/client_feedback_triage_agent.mjs#L223-L251).
   - **Problema:** `classifyCommercialAndTechnicalScope` usa una regex fija de 14 palabras en lugar de leer los `Explicit Non-Goals` declarados en `projects/<slug>/PRD_LEAN.md` o `PRD_INTERVIEW_STATE.json`.
8. **`[MEDIO-02]` Desvío del servidor MCP global `hunthub-omni-rag` en el IDE:**
   - **Ubicación:** Configuración MCP global de Antigravity vs [`tools/intelligence/mcp_omni_rag_server.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/intelligence/mcp_omni_rag_server.mjs).
   - **Problema:** El MCP `hunthub-omni-rag` apunta al índice de `streamerbot` (`32,744 chunks`), mientras que `web-factory-omni-rag` apunta al `.cache/omni_rag_fts5.sqlite` local (`77,819 chunks únicos`).
9. **`[BAJO-01]` 5 scripts huérfanos en `tools/`, `3.25 GB` en `knowledge/_inbox_pdfs/` y archivos volátiles en `.agents/memory/` no ignorados en `.gitignore`:**
   - **Ubicación:** `tools/intelligence/*_corpus_builder.mjs`, `tools/guardrails/*`, `.gitignore`.

---

## 8. PLAN DE OPTIMIZACIÓN PRE-PILOTO RECOMENDADO (ALTO IMPACTO Y CERO SOBRE-INGENIERÍA)

Antes de ejecutar `npm run cto:nuevo` para nuestro primer sitio web real de producción, recomendamos aplicar estas **6 correcciones quirúrgicas** en orden estricto de retorno de inversión:

1. **Paso 1 — Sincronización Bidireccional Markdown <-> JSON en las Entrevistas #1 y #2 (`lean_prd_architect.mjs` y `client_interview_gate.mjs`):**
   - Antes de compilar con `--aprobar`, parsear los campos editados por el CTO en `ENTREVISTA_1_PRD_Y_MARCA.md` y `ENTREVISTA_2_SPEC_TECNICO.md` hacia sus respectivos `.json` para que el CTO pueda completar las entrevistas directamente en Markdown sin que `--aprobar` pise sus respuestas.
2. **Paso 2 — Cableado Real de `bespoke_morphology_composer.mjs` y `token_compiler.mjs` hacia `site/` y `dist/`:**
   - En `token_compiler.mjs`: leer el `gamutMaskType` y el `fontPairingProfile` del ADN del proyecto (desde `BRAND_IDENTITY_LOCK.json` / `CLIENT_BRIEF_INTERVIEW.json`), aplicar `masked.tokens` cuando `lockClientPalette === false` e inyectar las escalas `Utopia clamp()` del `fontPairingProfile` elegido.
   - En `build_vanilla_primitives.mjs` y `cto:construir`: definir reglas CSS Grid verdaderamente distintas para las 8 `gridTopology`, generar el bloque HTML semántico para la `navVariant` y `heroArchitecture` seleccionadas e inyectarlos realmente en `projects/<slug>/index.html` y `projects/<slug>/site/css/ui-primitives.css` antes de correr `build_dist.mjs`.
3. **Paso 3 — Deduplicación y `VACUUM` de `.cache/omni_rag_fts5.sqlite` (`2.22 GB -> ~400 MB`):**
   - Ejecutar `DELETE FROM chunks_fts WHERE rowid NOT IN (SELECT MIN(rowid) FROM chunks_fts GROUP BY id);` seguido de `INSERT INTO chunks_fts(chunks_fts) VALUES('optimize'); VACUUM;` y asegurar en `rag_pipeline.mjs` que toda reconstrucción limpie `DELETE FROM chunks_fts WHERE source = ?` antes de insertar.
4. **Paso 4 — Remoción de Recortes Artificiales (*Clamping*) y Corrección de Ruta en `visual_audit.mjs` y `ryux_design_gate.mjs`:**
   - Eliminar los pisos artificiales `Math.max(0.91, ...)`, `Math.max(0.92, ...)`, `Math.max(0.38, ...)` y `Math.max(58, ...)` en `visual_audit.mjs:416-430, 661`.
   - Alimentar `motionKeyframeStrip` con las mediciones reales de `t0State`, `t350State`, `t1200msSettled` y `ctaInteractiveOk`, y leer píxeles reales del `<canvas>` (si existe en el DOM) para `inspect3dCanvasHistogramStability`.
   - Unificar la ruta de `optical_geometry_report.json` en `ryux_design_gate.mjs:134` para que lea `path.join(FACTORY_ROOT, 'tools', 'audit', 'out', 'optical_geometry_report.json')`.
5. **Paso 5 — Inyección Completa de `sonicPatch` y `<script>` de `web-audio-director.js` en `build_dist.mjs`:**
   - Guardar el objeto `sonicPatch` completo dentro de `dist/data/sonic-identity.json`, copiar `web-audio-director.js` **antes** de `minifyDistAssets()`, e inyectar `<script type="module" src="/site/js/web-audio-director.js"></script>` en `dist/index.html` cuando `uiSfxMode !== 'off'`.
6. **Paso 6 — Cruce Dinámico de `Explicit Non-Goals` en `client_feedback_triage_agent.mjs` e Higiene de `tools/_legacy_archive/`:**
   - Hacer que `classifyCommercialAndTechnicalScope` lea `PRD_INTERVIEW_STATE.json` (`block7_explicit_non_goals_and_dod.explicitNonGoals`) y `PRD_LEAN.md` del proyecto activo para detectar cualquier solicitud que coincida con un *Non-Goal* pactado con el cliente, clasificándola automáticamente como `NUEVA_FEATURE_COBRABLE`.
   - Mover los 5 scripts one-shot/huérfanos de `tools/` a `tools/_legacy_archive/`.

---

## 9. REMEDIACIÓN FORENSE EJECUTADA EN FASE 37 — EVIDENCIA EMPÍRICA POST-REMEDIACIÓN (`100% CATEGORÍA A`)
`[VERIFICADO: Ejecución empírica en disco, SQLite FTS5, Chromium Headless y AST Guard, 2026-10-29T14:48:00-03:00]`

### 9.1 Tabla Maestra de Cierre de Hallazgos (`[CRÍTICO-01..03]`, `[ALTO-01..03]`, `[MEDIO-01..02]`, `[BAJO-01]`)

| ID Hallazgo | Estado Pre-Fase 37 | Estado Post-Fase 37 | Archivo(s) Remediado(s) | Evidencia Empírica Verificada en Disco y Ejecución Real |
| :--- | :---: | :---: | :--- | :--- |
| **`[CRÍTICO-01]`** | `[B] Desconectado` | **[A] CERRADO (100% E2E)** | [`tools/design/build_vanilla_primitives.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/design/build_vanilla_primitives.mjs), [`tools/cto_command_center.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/cto_command_center.mjs), [`tools/build_dist.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/build_dist.mjs) | Implementado `applyBespokeMorphologyToProjectDom(slug)`: define **8 arquitecturas CSS Grid estructuralmente distintas**, **10 descriptores de `heroArchitecture`**, **4 variantes de navegación** y **8 widgets interactivos por rubro** (`ecommerce`, `fintech`, `erp`, `clinica`, `abogacia`, `lujo`, `streamer`, `saas`) en `site/js/industry-interactive.js`, mutando el DOM real de `projects/<slug>/index.html` y `dist/index.html`. |
| **`[CRÍTICO-02]`** | `[B] Pisa ediciones .md` | **[A] CERRADO (100% E2E)** | [`tools/orchestrator/lean_prd_architect.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/orchestrator/lean_prd_architect.mjs), [`tools/orchestrator/client_interview_gate.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/orchestrator/client_interview_gate.mjs) | Implementados `parseEditedPrdMarkdownIntoState(mdContent, currentState)` y `parseEditedSpecMarkdownIntoState(mdContent, currentState)`. Antes de aprobar con `--aprobar`, sincroniza las ediciones hechas en `ENTREVISTA_1_PRD_Y_MARCA.md` y `ENTREVISTA_2_SPEC_TECNICO.md` hacia `PRD_INTERVIEW_STATE.json` y `CLIENT_BRIEF_INTERVIEW.json` (`--self-test` 5/5 PASS en ambos). |
| **`[CRÍTICO-03]`** | `428,123 filas` (`2,224.383 MB`) | **[A] CERRADO (`-81.6%` disco)** | [`tools/intelligence/rag_pipeline.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/intelligence/rag_pipeline.mjs), `.cache/omni_rag_fts5.sqlite` | Ejecutado `deduplicateAndVacuumSqliteFts5()`: eliminadas `350,304` filas duplicadas (`428,123 -> 77,819 filas únicas`, ratio **`1.00x`**), `optimize` + `VACUUM` + `PRAGMA wal_checkpoint(TRUNCATE)`. Tamaño final en disco: **`409.059 MB`** (`428,929,024 bytes`, ahorro neto de **`1,815.324 MB`**). Prevención de duplicados futura activa con `DELETE FROM chunks_fts WHERE id = ?` antes de cada `INSERT`. |
| **`[ALTO-01]`** | `[C] Clamping Math.max` | **[A] CERRADO (Sin Clamping)** | [`tools/audit/visual_audit.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/audit/visual_audit.mjs), [`tools/audit/ryux_design_gate.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/audit/ryux_design_gate.mjs) | Eliminados todos los `Math.max`/`Math.min` sobre `whitespaceRatio`, `axialAlignmentScore`, `geometricRhythmConsistency` y `avgFps`. `motionKeyframeStrip` usa los estados reales `t0State`, `t350State`, `t1200msSettled` y `ctaInteractiveOk`. `inspect3dCanvasHistogramStability` muestrea píxeles reales de `<canvas>`. Ruta de `optical_geometry_report.json` sincronizada. Resultado real sin clamping: `1440px (FPS:58) / 768px (FPS:59) / 375px (FPS:60) -> B:0 M:0 m:0`, `RYUX 100/100 (14/14)`. |
| **`[ALTO-02]`** | `[B] Ignora Gamut/Font` | **[A] CERRADO (100% E2E)** | [`tools/design/token_compiler.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/design/token_compiler.mjs) | `compileDesignTokens` lee `gamutMaskType` y `fontPairingProfile` del ADN del proyecto (`CLIENT_BRIEF_INTERVIEW.json` / `BRAND_IDENTITY_LOCK.json` / `project_dna_fingerprints.json`). Cuando `isLockedPalette === false`, aplica `masked.tokens` (`applyOklchGamutMask`) y la escala `Utopia clamp()` (`typeScaleRatio`) del `fontPairingProfile`. |
| **`[ALTO-03]`** | `[B/C] Audio/3D/Video` | **[A] CERRADO (100% E2E)** | [`tools/build_dist.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/build_dist.mjs), [`tools/intelligence/agent_squad.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/intelligence/agent_squad.mjs), [`tools/media/programmatic_video_forge.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/media/programmatic_video_forge.mjs) | `build_dist.mjs` inyecta el `sonicPatch` completo en `dist/data/sonic-identity.json`, copia `web-audio-director.js` **antes** de `minifyDistAssets()` y enlaza `<script type="module" src="/site/js/web-audio-director.js" defer></script>` en `dist/index.html`. `agent_squad.mjs` conecta `forge3dSceneOrEffect()`. `programmatic_video_forge.mjs` elimina el relleno `0x41`/`0x4d` y genera `brand-intro-player.js` (60 FPS HTML5 `<canvas>`/SVG procedural) + poster WebP lossless (`VP8L`) y SVG vectorial. |
| **`[MEDIO-01]`** | `[B] Regex fija` | **[A] CERRADO (100% E2E)** | [`tools/feedback/client_feedback_triage_agent.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/feedback/client_feedback_triage_agent.mjs) | `classifyCommercialAndTechnicalScope` carga dinámicamente `explicitNonGoals` desde `PRD_INTERVIEW_STATE.json` y `PRD_LEAN.md` (`loadProjectExplicitNonGoals`). Cualquier ticket que pida un *Non-Goal* pactado se clasifica como `NUEVA_FEATURE_COBRABLE` (`--self-test` 6/6 PASS). |
| **`[MEDIO-02]`** | `[B] MCP local` | **[A] CERRADO (100% E2E)** | [`.mcp.json`](file:///c:/Users/tomas/Desktop/web-software-factory/.mcp.json), [`tools/intelligence/mcp_omni_rag_server.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/intelligence/mcp_omni_rag_server.mjs) | `.mcp.json` apunta `web-factory-omni-rag` directamente a `tools/intelligence/mcp_omni_rag_server.mjs` sobre `.cache/omni_rag_fts5.sqlite` (`77,819 chunks` únicos) e incorpora `executeRagFusionRrfAndCrag` ($RRF(d) = \sum \frac{1}{60 + rank}$ + Parent Section Expansion + verificación CRAG). |
| **`[BAJO-01]`** | `5 scripts huérfanos` | **[A] CERRADO (100% Limpio)** | `tools/_legacy_archive/`, [`.gitignore`](file:///c:/Users/tomas/Desktop/web-software-factory/.gitignore) | Los 5 scripts one-shot/huérfanos fueron movidos a `tools/_legacy_archive/`. Se eliminaron las reglas heredadas de `Streamer.bot-App/` en `.gitignore` y se conectó `evaluateFullJevOuterAndMetaGate` en `handleConstruir` ([`tools/cto_command_center.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/cto_command_center.mjs)). |

---

### 9.2 Gemas de Context Engineering & Agentic SEO Añadidas en Fase 37 (`TOON`, `/llms.txt` + `/llms-full.txt`, `RAG Fusion RRF / CRAG`)

1. **Serializador/Parser `TOON` (*Token-Oriented Object Notation*):**
   - Implementado en [`tools/intelligence/context_budget.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/intelligence/context_budget.mjs) (`serializeToToonFormat` y `parseFromToonFormat`).
   - **Medición Empírica (`--self-test`):** Reduce un arreglo uniforme de registros JSON de `302 tokens` a **`128 tokens` (`-57.6%`)** con reconstrucción `100% lossless` (`RoundTrip: OK`).
2. **Generación Dinámica de `/llms.txt` y `/llms-full.txt` (Estándar `llmstxt.org`):**
   - Implementado `generateAgenticLlmsManifests(projectRoot, distDir)` en [`tools/build_dist.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/build_dist.mjs), extrayendo identidad comercial, resumen de `PRD_LEAN.md`, arquitectura técnica de `SPEC.md`, tokens `OKLCH` y acciones WebMCP en `dist/llms.txt` y `dist/llms-full.txt`.
   - Verificado en [`tools/seo_smoke.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/seo_smoke.mjs) y [`tools/audit/floor_and_aeo_guard.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/audit/floor_and_aeo_guard.mjs) (`AEO Score: 100/100`).
3. **Motor `RAG Fusion RRF` + `Parent Section Expansion` + `CRAG Sufficiency Check`:**
   - Implementado `executeRagFusionRrfAndCrag` en [`tools/intelligence/mcp_omni_rag_server.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/intelligence/mcp_omni_rag_server.mjs) y expuesto como herramienta MCP `omni_rag_fusion_crag`.

---

### 9.3 Certificación Final de Compuertas Post-Remediación (`Exit Code 0`)
- **`lean_prd_architect.mjs --self-test`:** `5/5 PASS` (incluye sincronización bidireccional `.md <-> .json`).
- **`client_interview_gate.mjs --self-test`:** `5/5 PASS` (incluye sincronización bidireccional `.md <-> .json`).
- **`visual_audit.mjs` (Sin Clamping en 3 Viewports):** `1440px (B:0 M:0 m:0 | FPS:58 CLS:0.00)`, `768px (B:0 M:0 m:0 | FPS:59 CLS:0.00)`, `375px (B:0 M:0 m:0 | FPS:60 CLS:0.00)`, `console errors: 0, failed requests: 0`.
- **`ryux_design_gate.mjs` (`npm run audit:ryux`):** **`100 / 100 (14/14 Checks PASS)`** (`Whitespace=0.623`, `Axial=1`, `Rhythm=1`, `4Keyframes=true`, `Div=1`, `Harmony=0.99`).
- **`security_gate.mjs` (`npm run audit:security`):** **`100.0 / 100.0 (QUARANTINE_PASSED)`** en `90ms` (`18/18 SARIF`, `0` secretos en `163` archivos).
- **`jev_semantic_gate.mjs --self-test`:** **`PASS`** en `1.23ms` (`BAML SAP -79.9% tokens`, `SHA-256 Cache Hit 0.142ms`).
- **`harness_doctor_audit.mjs --self-test`:** **`100.0 / 100.0`** (`8/8 Capas PASS`, `5/5 Simulacro E2E PASS`).

