# REPORTE DE AUDITORÍA DE SISTEMAS: PUENTE ACADEMIA IA (`READ-ONLY`)

> **Fecha de Auditoría:** 2026-11-13  
> **Modo de Ejecución:** Estrictamente `READ-ONLY` sobre el código fuente existente (cero archivos modificados, hashes constitucionales SHA-256 intactos).  
> **Objetivo:** Documentar con evidencia literal verificada en código las reglas constitucionales, compatibilidad con una plataforma educativa + YouTube (`youtube-nocookie.com`), esquema real de `Omni-RAG v5`, ingesta/acervo documental, estado de `templates/astro-edge` + `cto:nuevo` y capacidades del puente `vertex_ai_bridge.mjs`.

---

## 1. Reglas Constitucionales y Compatibilidad con Plataforma Educativa + YouTube

Archivos auditados: [`CONSTRAINTS.md`](file:///c:/Users/tomas/Desktop/web-software-factory/CONSTRAINTS.md), [`tools/audit/security_gate.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/audit/security_gate.mjs), [`tools/audit/security_and_motion_audit.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/audit/security_and_motion_audit.mjs), [`tools/audit/cognitive_ux_auditor.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/audit/cognitive_ux_auditor.mjs), [`tools/audit/ryux_design_gate.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/audit/ryux_design_gate.mjs), [`tools/audit/floor_and_aeo_guard.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/audit/floor_and_aeo_guard.mjs) (y cabeceras de plantilla [`templates/astro-edge/public/_headers`](file:///c:/Users/tomas/Desktop/web-software-factory/templates/astro-edge/public/_headers), [`templates/astro-edge/worker/index.js`](file:///c:/Users/tomas/Desktop/web-software-factory/templates/astro-edge/worker/index.js) y [`tools/cto_command_center.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/cto_command_center.mjs)).

### 1.a) Reglas exactas de CSP (`_headers` / `frame-src` / `img-src` / `script-src`) y compatibilidad con `https://www.youtube-nocookie.com`

**Cabeceras literales en la plantilla `astro-edge`** (`templates/astro-edge/public/_headers#L1-L15` y constante `SECURITY_HEADERS` en [`templates/astro-edge/worker/index.js#L10-L21`](file:///c:/Users/tomas/Desktop/web-software-factory/templates/astro-edge/worker/index.js#L10-L21)) `[VERIFICADO: templates/astro-edge/public/_headers, templates/astro-edge/worker/index.js#L10-L21, 2026-11-13]`:

```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'inline-speculation-rules' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
X-Frame-Options: DENY
```

**Desglose por directiva crítica para YouTube:**
- `frame-src`: `https://challenges.cloudflare.com` (NO incluye `https://www.youtube-nocookie.com`).
- `img-src`: `'self' data: blob:` (NO incluye `https://i.ytimg.com` para miniaturas/posters de YouTube).
- `script-src`: `'self' 'inline-speculation-rules' https://challenges.cloudflare.com`.
- `frame-ancestors`: `'none'` junto a `X-Frame-Options: DENY` (solo impide que terceros nos embeban a nosotros; no bloquea iframes salientes).

**Veredicto doble (Ejecución en Navegador vs. Score `100.0/100` en Auditores):**
1. **En el navegador hoy (con los defaults sin editar):** **BLOQUEADO**. Si se inserta `<iframe src="https://www.youtube-nocookie.com/embed/...">` en un proyecto generado con `templates/astro-edge`, el navegador bloqueará el reproductor por `frame-src https://challenges.cloudflare.com` y bloqueará thumbnails remotos de YouTube (`https://i.ytimg.com/...`) por `img-src 'self' data: blob:`.  
   > **Detalle crítico de implementación en el Worker:** [`templates/astro-edge/worker/index.js#L37-L52`](file:///c:/Users/tomas/Desktop/web-software-factory/templates/astro-edge/worker/index.js#L37-L52) define `withSecurityHeaders()`, que **sobreescribe en runtime** `Content-Security-Policy` desde `SECURITY_HEADERS` en todas las respuestas del Worker. Por lo tanto, en el proyecto hijo (`projects/<slug>/`), ampliar la CSP solo en `public/_headers` no alcanza si hay Worker: hay que agregar `https://www.youtube-nocookie.com` en `frame-src` (y `https://i.ytimg.com` en `img-src` si se cargan posters externos) tanto en `projects/<slug>/public/_headers` como en `SECURITY_HEADERS` de `projects/<slug>/worker/index.js`.
2. **Impacto en el score `100.0/100` de los 6 archivos auditados:** **NO penaliza el `100.0/100`** `[VERIFICADO: CONSTRAINTS.md, tools/audit/*.mjs, tools/cto_command_center.mjs#L70-L99, 2026-11-13]`:
   - `CONSTRAINTS.md`: No impone reglas sobre CSP, `frame-src`, `img-src` ni dominios en `<iframe>`.
   - `tools/audit/security_gate.mjs`: No parsea las directivas `frame-src` ni `img-src` de `_headers`.
   - `tools/audit/security_and_motion_audit.mjs`: No inspecciona `_headers` ni etiquetas `<iframe>`.
   - `tools/audit/cognitive_ux_auditor.mjs`: No inspecciona `_headers` ni etiquetas `<iframe>`.
   - `tools/audit/ryux_design_gate.mjs` (`#L224-L230`): Solo bloquea `<audio autoplay>` y `<video autoplay>` sin `muted`; no penaliza `<iframe src="https://www.youtube-nocookie.com/...">`.
   - `tools/audit/floor_and_aeo_guard.mjs` (`#L143-L158`): Su validador de `<script src="...">` omite explícitamente URLs externas (`if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//')) continue;`), validando únicamente que los scripts locales existan en disco.
   - Adicionalmente, `evaluateCybersecurityTrafficLight()` en [`tools/cto_command_center.mjs#L83-L95`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/cto_command_center.mjs#L83-L95) verifica únicamente estas cadenas en `_headers`: `"default-src 'self'"`, `"object-src 'none'"`, `"base-uri 'self'"`, `"frame-ancestors 'none'"`, `'upgrade-insecure-requests'`, ausencia de `'unsafe-eval'`, `'max-age=63072000; includeSubDomains; preload'`, `'X-Content-Type-Options: nosniff'`, `'Referrer-Policy: strict-origin-when-cross-origin'`, `'Permissions-Policy:'` y `'Cross-Origin-Opener-Policy: same-origin'`. Agregar `https://www.youtube-nocookie.com` en `frame-src` e `https://i.ytimg.com` en `img-src` mantiene `escudoNavegador === 'ACTIVO'`.

---

### 1.b) Límites duros de bundle, nodos DOM, longitud de texto y reglas CRO en página educativa sin formulario de venta

| Dimensión | Límite / Regla Literal Verificada | Fuente Exacta | Impacto en Clase Educativa sin Formulario |
| :--- | :--- | :--- | :--- |
| **Tamaño total `dist/`** | `DIST_MAX_MB <= 50.0 MB` | `CONSTRAINTS.md#L23` | **Sin riesgo** usando embeds de YouTube (`0 B` de video local). |
| **Videos locales** | Cada `.webm`/`.mp4` en `public/assets/video` `< 1.8 MB` (`1,887,436` bytes) | `ryux_design_gate.mjs#L232-L244` | **No aplica** si el video viene por `youtube-nocookie.com`. |
| **Bundle HTML / JS / CSS** | **Sin límite individual en KB** en los 6 archivos; `0` archivos `.map` en `dist/` (`[A10:2025-SOURCEMAP]`); bloqueo estático de `jquery\|moment.js\|lodash-full\|bootstrap.js\|eval(\|document.write` y `animate({top\|left\|width\|height})`; `MAX_BODY_BYTES = 65536` (64 KB) en Worker | `security_gate.mjs#L51-L58, #L163, #L194` | **Compatible** (mantener `sourcemap: false` en Vite/Astro y cero libs bloqueadas). |
| **Rendimiento / Heap** | `LCP_MAX_MS <= 1800 ms`, `CLS_MAX = 0.000` (`clsScore < 0.05` en gate), `INP_MAX_MS <= 100 ms`, `FRAME_BUDGET <= 16.6ms`, `fpsMeasured >= 55`, `jsHeapUsedMB < 64 MB` | `CONSTRAINTS.md#L21-L24`, `ryux_design_gate.mjs#L180` | **Atención con YouTube**: un `<iframe>` eager pesado puede penalizar LCP; usar fachada/`aspect-ratio: 16/9` + `loading="lazy"` para preservar `CLS = 0.000`. |
| **Nodos DOM** | **No existe ningún límite máximo ni mínimo de nodos DOM**; solo exige `<main>` + (`<h1>` o `<h2>`) | `ryux_design_gate.mjs#L126` | **100% Compatible** con clases extensas o índices de lecciones. |
| **Longitud de texto** | **No existe tope máximo de palabras o caracteres**; exige `CONSTRAINTS.md > 200` bytes, `llms.txt > 40` chars, `llms-full.txt > 60` chars (si existe), `robots.txt` (`User-agent: *` + `Allow: /`), `<meta name="description"`, `application/ld+json`, `name="viewport"` y cero `lorem ipsum dolor sit amet \| insert your text here \| your company name here` | `floor_and_aeo_guard.mjs#L33, #L84-L140`, `ryux_design_gate.mjs#L124-L125` | **100% Compatible** con apuntes largos, código de ejemplo y glosarios. |
| **Motion y enlaces CSS/HTML** | `WARNING` si `transition: all` aparece `> 50` veces en CSS; `MAJOR` si `<a target="_blank">` carece de `rel="noopener"`/`noreferrer`; `BLOCKER` si `site/js/app.js` (cuando existe) carece de `window.escapeHTML` o `textContent` | `security_and_motion_audit.mjs#L53-L92` | Vigilar links externos de bibliografía (`target="_blank" rel="noopener noreferrer"`). |
| **Reglas CRO (`Fogg B=MAP`, CTAs, `<form>`)** | **Cero verificación de `<form>`, botones de compra, tablas de precios ni presencia de `Fogg B=MAP`** en los 6 archivos auditados. `CONSTRAINTS.md#L14` menciona `2% focal conversion CTA in OKLCH` solo como pauta cromática (`90/8/2`), no como regla DOM | `CONSTRAINTS.md#L14`, `cognitive_ux_auditor.mjs`, `ryux_design_gate.mjs` | **NO falla** por omitir formulario de venta en una página de clase. |

**Tres riesgos concretos que SÍ pueden hacer fallar el gate en una página educativa si se descuidan:**
1. **Regla estructural de `worker/index.js` en `security_gate.mjs` (`#L172-L209`, `auditEdgeWorkersAndDist`)**: Si el proyecto conserva `worker/index.js` (copiado por `templates/astro-edge`), `security_gate.mjs` exige que el archivo siga conteniendo literalmente `turnstile/v0/siteverify`, `MAX_BODY_BYTES`, `PAYLOAD_TOO_LARGE`, `Sec-Fetch-Site`, `Sec-Fetch-Mode`, `Sec-Fetch-Dest`, `hasSequentialNumericIdInPath` (o `OPAQUE_UUID_OR_ULID_REQUIRED`), `headers.delete("Server")`, `headers.delete("X-Powered-By")` y `MAX_RATE_LIMIT_BUCKETS`/`RATE_LIMITER`, **aunque las páginas HTML educativas no tengan formulario alguno**.
2. **Falsos positivos léxicos en `cognitive_ux_auditor.mjs` (`#L21-L58`, `DARK_PATTERN_RULES`)**: Escanea todo HTML/JS del sitio buscando expresiones prohibidas:
   - `PAID_ENTRY_VIOLATION` (`-15 pts`, `CRITICAL`): `entrada paga | pagar para participar | comprar boleto con dinero | paid entry fee`. Si una lección redacta literalmente alguna de esas frases en prosa o en un ejemplo de texto, el puntaje baja de `100` a `85` (o `< 85` y reprueba).
   - `CONFIRM_SHAMING` / `SYNTHETIC_RTP_CLAIM` (`-15 pts` cada una).
   - Todo contenedor `.modal-overlay` o `.modal-backdrop` debe incluir botón/texto de cierre (`close|cerrar|×|&times;|✕|cancel`, `#L66-L77`). *(Las reglas `+18` de `#L79-L95` y `security_and_motion_audit.mjs#L94-L132` solo se ejecutan cuando `complianceProfile === 'gambling-18plus'`)*.
3. **Los 14 checks obligatorios de `ryux_design_gate.mjs` (`#L98-L290`, piso `>= 92/100`)**: Aunque el `Surface Mode` en `DESIGN.md` sea `Read` o `Operate`, exige encontrar: `oklch(`, `clamp(`, `tabular-nums` (aprovechable en duraciones `mm:ss` y numeración de clases), `@view-transition` + (`@starting-style` o `animation-timeline: view|scroll`), `prefers-reduced-motion: reduce`, `DESIGN.md` válido según `lintDesignMd()` con `pbrMaterial:`, `cameraFov:`, `springPhysics:`, `## Sonic & Video Identity`, `## Brand DNA Vector & Bespoke Morphology`, y `data-grid-topology` o `bento-grid` en CSS/HTML (`templates/astro-edge/src/styles/ui-primitives.css` ya provee base compatible).

---

## 2. Esquema Real de `Omni-RAG v5` e Ingesta Documental

### 2.1 `tools/intelligence/rag_pipeline.mjs` (`1477` líneas)

#### Sentencia SQLite exacta (`CREATE VIRTUAL TABLE`)
En [`tools/intelligence/rag_pipeline.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/intelligence/rag_pipeline.mjs) **no existe ninguna sentencia `CREATE TABLE` estándar**; todo el almacenamiento persistente en `.cache/omni_rag_fts5.sqlite` (via `node:sqlite` `DatabaseSync`) usa una única tabla virtual FTS5 (`#L649-L661`) `[VERIFICADO: tools/intelligence/rag_pipeline.mjs#L648-L661, 2026-11-13]`:

```sql
PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL;

CREATE VIRTUAL TABLE IF NOT EXISTS chunks_fts USING fts5(
  id UNINDEXED,
  source UNINDEXED,
  category UNINDEXED,
  snippet UNINDEXED,
  title,
  section,
  text,
  tokenize='porter unicode61 remove_diacritics 2'
);
```

- **Inserción y deduplicación** (`#L555-L587`, `#L666-L688`):
  ```sql
  INSERT INTO chunks_fts (id, source, category, snippet, title, section, text) VALUES (?, ?, ?, ?, ?, ?, ?)
  ```
- **Consulta BM25 con pesos de columna** (`#L722-L729` — ponderación: `title = 6.0`, `section = 3.5`, `text = 1.0`):
  ```sql
  SELECT id, source, category, title, snippet, text,
         bm25(chunks_fts, 6.0, 3.5, 1.0) AS raw_bm25
  FROM chunks_fts
  WHERE chunks_fts MATCH ?
  ORDER BY raw_bm25 ASC
  LIMIT 36
  ```
- **Directorios escaneados por `getOrBuildMiniSearchIndex()`** (`#L819-L825`): `knowledge` (`depth: 4`), `docs` (`depth: 4`), `.agents/skills` (`depth: 3`), `.agents/memory` (`depth: 3`), `references` (`depth: 3, mode: 'references-root'`).

#### Metadatos guardados por chunk
1. **En SQLite (`chunks_fts`)**: `id`, `source` (`local://<ruta_relativa>`), `category` (`'canon-treatise' | 'canon-vault' | 'canon-book' | 'general'`), `snippet` (primeros `450` chars), `title`, `section`, `text` (`[Doc: ${fileName} > ${heading}]${scopeHeader}\n${content}`).
2. **En objeto en memoria (`createDocumentChunks`, `#L343-L409`)**: además de las 7 columnas anteriores, adjunta `epistemicTier`, `authorityBoost`, `epistemicRole`, `legacySyntaxGuard`, `translationRule` y `supersededReplacements`. Tamaño de chunk: máx. `3800` chars para `canon-book` y `1900` chars para el resto, con overlap de `180` chars.

#### Estructura de resultados devueltos a los agentes y exports
`queryKnowledge(query, limit = 8, options = {})` (`#L1107-L1295`) combina MiniSearch (`#L1147-L1167`), ranker local bitmask IDF/LightRAG (`#L1170-L1178`), SQLite FTS5 (`#L1180-L1187`), Qdrant Cloud opcional (`#L1191-L1230`), Fusión RRF (`k=60`, máx. `2` resultados por archivo base, `#L1233`) + Router por Squad + grafo Wikilink 1-hop + CRAG (`#L1235`), devolviendo un `Array<Object>`:

- **Forma estándar del objeto retornado (`#L1263-L1288`)**:
  ```js
  {
    id,                     // string (ej. "knowledge/software_factory/...#chunk-2")
    source,                 // string ("local://..." o "qdrant://web_factory_knowledge/...")
    title,                  // string
    snippet,                // string (<= 450 chars)
    text,                   // string (prefija TRANSLATION_RULE_WARNING si TIER_2_TIMELESS_PRINCIPLES)
    score,                  // number (score del motor de origen)
    rrfScore,               // number (1 / (60 + rank))
    fusedScore,             // number (RRF + boost de squad + hop de grafo, si aplica)
    epistemicTier,          // "TIER_1_SOTA_2026" | "TIER_2_TIMELESS_PRINCIPLES" | ...
    authorityBoost,         // number (ej. 1.35 | 1.15)
    epistemicRole,          // string
    legacySyntaxGuard,      // string | null ("TIER_3_LEGACY_SYNTAX_GUARD")
    translationRule,        // string | null
    supersededReplacements  // Array | undefined
  }
  ```
- **Variante con `options.useOnnxRerank === true`** (`#L1008-L1055`, `#L1238-L1240`): agrega `onnxRerankScore` (modelo `Xenova/ms-marco-MiniLM-L-6-v2` `q8`) y `combinedScore = (rrfScore || 0.01) * 40 + prob`.
- **Variante fallback Web CRAG (`SERPER_API_KEY`, `#L1243-L1261`)**: devuelve `{ id: "web://...", source, title, snippet, text, rerankScore, isWebFallback: true, squadRoute }`.
- **Las 10 funciones exportadas (`rag_pipeline.mjs`)**: `expandQueryBilingual` (`#L139`), `invalidateIndexCache` (`#L416`), `deduplicateAndVacuumSqliteFts5` (`#L498`), `ingestMarkdownFilesIntoSqliteFts5` (`#L545`), `getOrBuildMiniSearchIndex` (`#L786`), `reciprocalRankFusion` (`#L1061`), `queryKnowledge` (`#L1107`), `queryCodeGraph` (`#L1300`), `synthesizeAnswer` (`#L1330`), `getClusterStats` (`#L1394`).
- **CLI (`#L1430-L1477`)**: `--rebuild`, `--stats`, `--code-graph <q>`, `--ask <q>`, `--query <q> [limit]`, `--rerank`.

---

### 2.2 `tools/intelligence/official_docs_harvester.mjs` y `tools/intelligence/tech_scout.mjs`

#### A) [`tools/intelligence/official_docs_harvester.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/intelligence/official_docs_harvester.mjs) (`1327` líneas)
- **Fuentes soportadas hoy:**
  1. **Bóveda local Zero-Copy (`C:\Users\tomas\Desktop\streamerbot\references\sota-2026`, `#L23`, `#L1217-L1263`)**: 6 clusters / **36 repositorios** inspeccionando `llms.txt`, `llms-full.txt`, `README.md`, `docs/ENGINE.md`, `package.json`, `pyproject.toml`, `Cargo.toml`:
     - `webgpu-3d-2026` (`9`): `dioramas`, `spark`, `webgpu-vfx`, `TypeGPU`, `glTF-Transform`, `meshoptimizer`, `openshaders`, `Animator`, `blender-mcp`
     - `self-evolving-2026` (`7`): `harness2`, `gepa`, `OpenSpace`, `self-harness`, `MASEval`, `agent-benchmark`, `evolving-agents`
     - `final-frontier-2026` (`7`): `headroom`, `cocoindex-code`, `chrome-devtools-mcp`, `agent-governance-toolkit`, `context7`, `agents`, `zizmor`
     - `audio-and-video-2026` (`6`): `motion-canvas`, `Tone.js`, `ZzFX`, `strudel`, `polymath`, `stable-audio-tools`
     - `academic-and-official-courses-2026` (`5`): `modern-software-dev-assignments`, `courses`, `context-course`, `ai-agents-for-beginners`, `mcp-for-beginners`
     - `context-and-harness-engineering-2026` (`2`): `baml`, `fast-check`
  2. **`OPEN_UNIVERSITY_PORTALS_CATALOG` (`#L617-L708`, 8 portales universitarios/abiertos)**: CMU CS 11-768 (`cmu-agents.com`), Stanford CS329A (`cs329a.stanford.edu`), UC Berkeley CS294-196 (`agenticai-learning.org`), Stanford CS146S (`themodernsoftware.dev`), Hugging Face Learn (`agents-course`, `mcp-course`, `context-course`), Vanderbilt (`coursera.org/learn/claude-code`), freeCodeCamp/ExamPro Claude Code Essentials, DeepLearning.AI Short Courses.
  3. **`DOMAIN_MASTERY_COURSES_URLS` (`#L726-L922`, 8 cursos de dominio)**: CMU 15-445 (Andy Pavlo), MIT 6.5840, MIT 6.102 + John Ousterhout, CMU 15-462 (Keenan Crane) + WebGPU Fundamentals, Stanford CS253 (Feross), Google `web.dev/learn`, Stanford CCRMA Music 220a, Baymard Institute + Laws of UX.
  4. **`CONTEXT_AND_HARNESS_OFFICIAL_URLS` (`#L994-L1034`, 3 docs)**: `docs.boundaryml.com` (BAML/SAP/JEV), `aider.chat/docs/repomap.html`, `fast-check.dev`.
  5. **Catálogos de seguridad estructurados (`buildStructuredSecurityCatalogs`, `#L423-L611`)**: OWASP ASVS v5.0.0, OWASP AISVS v1.0 + LLM Top 10 + MCP Top 10, OWASP WSTG + OpenCRE + NIST OSCAL v1.2.2 + MITRE ATT&CK/ATLAS/D3FEND.
- **CLI y Exports:**
  - **CLI (`#L1310-L1327`)**: Sin flags; invoca directamente `harvestOfficialDocsAndSecurityCatalogs()` (también vía `npm run cto:cosechar-docs`).
  - **Exports reales de módulo (`16` propios + `6` snippets de ejemplo exportados dentro de plantillas Markdown)**: `CANON_PATHS`, `SECURITY_CATALOGS_DIR`, `SECURITY_CATALOGS_INDEX_PATH`, `inspectVaultRepository`, `buildMotion3dCanonMarkdown`, `buildSoftwareFactoryCanonMarkdown`, `buildCybersecurityCanonMarkdown`, `buildStructuredSecurityCatalogs`, `OPEN_UNIVERSITY_PORTALS_CATALOG`, `harvestZeroAuthUniversityPortals`, `DOMAIN_MASTERY_COURSES_URLS`, `harvestDomainMasteryCourses`, `CONTEXT_AND_HARNESS_OFFICIAL_URLS`, `harvestContextAndHarnessOfficialDocs`, `buildJevBamlContextAndHarnessCanonMarkdown`, `harvestOfficialDocsAndSecurityCatalogs` (más helpers exportados dentro de ejemplos de código en `#L163`, `#L191`, `#L767`, `#L791`, `#L841`, `#L886`).
- **Cómo guarda archivos en `knowledge/` (`#L25-L64`, `#L601-L603`, `#L930-L973`, `#L1272-L1290`):**
  Escribe de forma determinista **12 tratados Markdown `TIER_1_SOTA_2026` (`authorityBoost: 1.35`)** y **1 índice JSON** dentro de `knowledge/` (además de 3 catálogos JSON en `.agents/security_catalogs/`):
  - `knowledge/motion_and_animation/` (3): `CANON_OFFICIAL_DOCS_THREE_R186_SPARK_DIORAMAS_BLENDER_MCP_AND_GLTF_2026.md`, `CANON_DOMAIN_CMU_15462_KEENAN_CRANE_AND_WEBGPU_SHADERS_60FPS_2026.md`, `CANON_DOMAIN_STANFORD_CCRMA_220A_MODAL_SYNTHESIS_AND_PROCEDURAL_AUDIO_2026.md`.
  - `knowledge/software_factory/` (3): `CANON_OFFICIAL_DOCS_HARNESS2_GEPA_OPENSPACE_HEADROOM_COCOINDEX_AND_CODEMODE_2026.md`, `CANON_JEV_BAML_SAP_CONTEXT_REPOMAP_AND_HARNESS_ENGINEERING_2026.md`, `CANON_DOMAIN_MIT_65840_DISTRIBUTED_IDEMPOTENCY_AND_DURABLE_OBJECTS_2026.md`.
  - `knowledge/cybersecurity/` (3 MD + 1 JSON): `CANON_OFFICIAL_DOCS_POSTGRES_RLS_CIS_ORY_ZANZIBAR_GCP_KMS_AND_ZIZMOR_2026.md`, `CANON_DOMAIN_CMU_15445_MVCC_BTREE_WAL_AND_ATOMIC_TX_2026.md`, `CANON_DOMAIN_STANFORD_CS253_WEB_SECURITY_SOP_CSP_AND_WEBAUTHN_2026.md`, `STRUCTURED_SECURITY_CATALOGS_INDEX_2026.json`.
  - `knowledge/architecture_and_books/` (1): `CANON_DOMAIN_MIT_6102_OUSTERHOUT_DEEP_MODULES_AND_REP_INVARIANTS_2026.md`.
  - `knowledge/ui_ux_design/` (2): `CANON_DOMAIN_GOOGLE_WEBDEV_CWV_BLINK_V8_A11Y_AND_MODERN_CSS_2026.md`, `CANON_DOMAIN_BAYMARD_AND_LAWS_OF_UX_CHECKOUT_CRO_2026.md`.

#### B) [`tools/intelligence/tech_scout.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/intelligence/tech_scout.mjs) (`1227` líneas)
- **Fuentes soportadas hoy** (`MULTI_TIER_INTELLIGENCE_SOURCES`, `#L329-L379`, + `OSS_INSIGHT_AND_SKILL_DIRECTORIES`, `#L1185-L1196`):
  - **Capa 1 (`CURATED_AWESOME_RADARS`, `#L49-L140`)**: 7 dominios / 20 listas curadas (`awesome-astro`, `awesome-css`, `awesome-web-animation`, `awesome-webgl`, `awesome-design-systems`, `Awesome-Design-Tokens`, `awesome-a11y`, `awesome-nodejs`, `awesome-typescript`, `awesome-cloudflare`, `awesome-edge-computing`, `awesome-playwright`, `awesome-wpo`, `awesome-lighthouse`, `awesome-web-security`, `awesome-csp`, `awesome-appsec` + 3 listas de `awesome-software-factories` / `awesome-agent-factories`).
  - **Capa 2 (`TIER1_ORG_AND_VELOCITY_FEEDS`, `#L147-L190`)**: 36 feeds (6 orgs core stack, 7 WebGPU/motion orgs, 19 repos agénticos Tier-1 como `harness2`, `OpenSpace`, `gepa`, `stagehand`, `playwright-mcp`, `headroom`, `cocoindex-code`, `chrome-devtools-mcp`, `agent-governance-toolkit`, `context7`, `cloudflare/agents`, `zizmor`, `design.md`, `impeccable`, `mini-swe-agent`, `inspect_ai`, + `bestofjs.org` y `risingstars.js.org`, junto a 2 campos extra en arrays).
  - **Capa 3 (`WEB_PLATFORM_BASELINE_AND_W3C`, `#L199-L263`)**: `web-features`, `w3c-dtcg-2025-10`, `csswg-drafts` + 7 primitivas `0 KB`.
  - **Capa 4 (`LLMS_TXT_AND_MCP_REGISTRY`, `#L270-L277`)**: 5 sondas (`/llms.txt`, `/llms-full.txt`, `/SKILL.md`, `/.agents/skills/SKILL_INDEX.json`, `/mcp.json`) + `llmstxt.org`, `agentskills.io`, `modelcontextprotocol/servers`.
  - **Capa 5 (`ARXIV_AND_HF_PAPERS_FEED`, `#L284-L306`)**: `export.arxiv.org/api/query` (`cs.SE`, `cs.AI`, `cs.GR`, `cs.CR`), `huggingface.co/papers` + 4 papers verificados.
  - **Capa 6 (`LIVE_APPSEC_AND_PACKAGE_HEALTH`, `#L313-L324`)**: `api.osv.dev/v1/query`, `api.github.com/advisories`, `registry.npmjs.org`.
  - **Directorios adicionales (`#L1185-L1196`)**: `agentskills.io/registry`, `everything-claude-code`, `agentshield`, `OpenSpec`, `spec-kitty`, `SWE-AF`, `beads`.
- **CLI y Exports (`17` símbolos):**
  - **CLI (`#L1218-L1227`)**: `--audit-sources` (ejecuta `runAuditSourcesCli()`) o sin flag (ejecuta `runTechScout()`).
  - **Exports**: `ALLOWED_LICENSES`, `CURATED_AWESOME_RADARS`, `TIER1_ORG_AND_VELOCITY_FEEDS`, `WEB_PLATFORM_BASELINE_AND_W3C`, `LLMS_TXT_AND_MCP_REGISTRY`, `ARXIV_AND_HF_PAPERS_FEED`, `LIVE_APPSEC_AND_PACKAGE_HEALTH`, `MULTI_TIER_INTELLIGENCE_SOURCES`, `resolveNativeWebPlatformAlternative`, `calculateSotaViabilityScore`, `loadApprovedPackagesSet`, `resolveCuratedAwesomeRadar`, `passesTripleFilter`, `runAuditSourcesCli`, `runTechScout`, `OSS_INSIGHT_AND_SKILL_DIRECTORIES`, `evaluateOssInsightCommunityHealth`.
- **Cómo guarda archivos respecto a `knowledge/` (`#L25-L27`, `#L47`, `#L1087-L1173`):**
  Por regla explícita **Zero-Link-Bloat** (`"Ninguna lista masiva de enlaces se vuelca en knowledge/"`), **`tech_scout.mjs` NO escribe archivos en `knowledge/`**. Persiste únicamente:
  1. `.agents/memory/tech_scout_state.json`
  2. `docs/TECH_SCOUT_RADAR_2026.md` *(sí indexado por `rag_pipeline.mjs#L821`)*
  3. `TECH_SCOUT_RADAR_2026.md` en la raíz del proyecto.

---

### 2.3 Inventario Literal de `knowledge/_inbox_courses/` y los `236` archivos de `knowledge/_inbox_pdfs/`

#### `knowledge/_inbox_courses/` (`1` archivo)
- [`knowledge/_inbox_courses/README.md`](file:///c:/Users/tomas/Desktop/web-software-factory/knowledge/_inbox_courses/README.md) — No hay archivos `.srt`, `.vtt`, `.txt` ni `.md` de clases pendientes de destilar en este buzón `[VERIFICADO: Get-ChildItem knowledge\_inbox_courses, 2026-11-13]`.

#### `knowledge/_inbox_pdfs/` (`236` archivos totales)
Distribución física verificada: `1` archivo en la raíz (`LEEME_PONER_PDFS_AQUI.txt`) + `200` en `procesados/` + `26` en `procesados/omitidos_duplicados_o_irrelevantes/` + `9` en `procesados/originales_epub_mobi_azw3/` = **`236` archivos exactos**.

| Temática Agrupada | Cantidad | Subtotales por Carpeta (`procesados` / `omitidos` / `originales`) | Relevancia Directa para Academia de IA, Programación y Ciberseguridad |
| :--- | :---: | :---: | :--- |
| **1. LLMs, Prompt Engineering, MLOps e Information Retrieval** | **3** | `3` / `0` / `0` | **Alta (Core IA/LLM):** Prompt Engineering oficial de Google (`book_prompt_engineering_google_lee_boonstra.pdf`), MLOps (`book_google_practitioners_guide_to_mlops.pdf`) y motores de recuperación RAG (`book_information_retrieval_search_engines_mit_press.pdf`). |
| **2. Ciberseguridad, Criptografía, Pentesting Web y Seguridad APIs** | **57** | `39` / `13` / `5` | **Muy Alta (Core Cyber):** OWASP WSTG v4.2, OWASP API Top 10, Web App Hacker's Handbook, Advanced API Security (OAuth2/OIDC/JWS/JWE), Hacking APIs, Applied Cryptography, Serious Cryptography, Practical Cryptography, Bug Bounty Bootcamp, The Tangled Web, Attacking Network Protocols, XSS Cheat Sheet. |
| **3. Programación, Ingeniería de Software, Bases de Datos, Redes y Cloud** | **90** | `78` / `9` / `3` | **Muy Alta (Core Prog):** Software Engineering at Google, DDIA (Kleppmann), Database Internals (Petrov), Philosophy of Software Design 2nd Ed (Ousterhout), Clean Architecture, Fundamentals/Hard Parts of Software Architecture, Total TypeScript, Tackling TS, Deep JS, Node.js Design Patterns, TDD (Kent Beck), Unit Testing (Khorikov), System Design Interview, High-Performance Browser Networking, HTTP/3 Explained, SQLite, SQL Performance Explained, Google Cloud Architect Handbook. |
| **4. UI/UX, Sistemas de Diseño, HTML/CSS, Psicología y CRO** | **58** | `53` / `4` / `1` | Útil para módulo de Producto/Frontend (Refactoring UI, Atomic Design, Design Systems Handbook, CSS Secrets, Laws of UX, Dont Make Me Think, Tufte). |
| **5. Gráficos 2D/3D, WebGL/Canvas, Animación, Audio/DSP y Cinematografía** | **26** | `26` / `0` / `0` | Útil para tracks audiovisuales/3D (Nature of Code, Core HTML5 Canvas/WebGL, Animator's Survival Kit, Designing Sound, Mastering Audio). |
| **6. Control / Instrucciones del Buzón** | **2** | `1` raíz + `1` `.gitkeep` | Archivos de infraestructura (`LEEME_PONER_PDFS_AQUI.txt`, `procesados/.gitkeep`). |
| **TOTAL VERIFICADO** | **236** | **`201` (`1` raíz + `200`) / `26` / `9`** | **150 libros enfocados directamente en IA/LLM (`3`), Ciberseguridad (`57`) y Programación/Arquitectura/Cloud (`90`).** |

**Principales títulos destacados de LLMs (`3/3`), Ciberseguridad y Programación en `procesados/`:**
- **LLMs / IA / IR (todos):** `book_google_practitioners_guide_to_mlops.pdf`, `book_information_retrieval_search_engines_mit_press.pdf`, `book_prompt_engineering_google_lee_boonstra.pdf`.
- **Ciberseguridad (selección clave de `39` únicos en `procesados/`):** `book_advanced_api_security_siriwardena.pdf`, `book_attacking_network_protocols_forshaw.pdf`, `book_owasp_web_security_testing_guide_v42.pdf`, `book_practical_cloud_security_dotson.pdf`, `book_securing_the_api_stronghold.pdf`, `book_serious_cryptography_aumasson.pdf`, `book_the_joy_of_cryptography_rosulek.pdf`, `book_the_tangled_web_michal_zalewski.pdf`, `book_web_application_hackers_handbook_stuttard_pinto.pdf`, `book_web_application_security_andrew_hoffman_oreilly_2020.pdf`, `Bug Bounty Bootcamp ... Vickie Li.pdf`, `Hacking - The Art of Exploitation, 2nd Edition by Jon Erickson.pdf`, `Hacking APIs - Early Access.pdf`, `owasp-api-security-top-10.pdf`, `Web Application Hacking Advanced SQL Injection and Data Store Attacks.pdf`, `XSS Cheat Sheet.pdf`.
- **Programación / Arquitectura / Cloud (selección clave de `78` únicos en `procesados/`):** `Addy Osmani - Learning Javascript Design Patterns.pdf`, `book_a_philosophy_of_software_design_2nd_edition_john_ousterhout.epub`, `book_code_complete_2nd_edition_steve_mcconnell.pdf`, `book_database_internals_alex_petrov.pdf`, `book_designing_data_intensive_applications_martin_kleppmann_full.pdf`, `book_fundamentals_of_software_architecture_richards_ford.pdf`, `book_introduction_to_algorithms_clrs.pdf`, `book_nodejs_design_patterns_casciaro.pdf`, `book_refactoring_improving_the_design_of_existing_code_2nd_edition_martin_fowler.pdf`, `book_software_architecture_the_hard_parts_ford_richards_sadalage.pdf`, `book_software_engineering_at_google_winters_manshreck_wright_full.pdf`, `book_sql_performance_explained_markus_winand.pdf`, `book_test_driven_development_by_example_kent_beck.pdf`, `book_typescript_notes_for_professionals.pdf`, `book_unit_testing_principles_practices_and_patterns_khorikov.pdf`, `Clean Architecture ... .pdf`, `Deep JavaScript Theory and techniques.pdf`, `dokumen.pub_google-cloud-architect-handbook...pdf`, `dokumen.pub_total-typescript-the-essentials-1-p-1067242.pdf`, `High-Performance Browser Netwo - Grigorik, Ilya_5527.pdf`, `Http3-explained-en.pdf`, `Site Reliability Engineering.pdf`, `System Design Interview by Alex Xu.pdf`, `tackling-ts-book 2020-05-03.pdf`.

**Primeros 40 archivos representativos literales en `knowledge/_inbox_pdfs/` (orden alfabético del listado):**
1. `LEEME_PONER_PDFS_AQUI.txt`
2. `procesados/+Color.pdf`
3. `procesados/.gitkeep`
4. `procesados/100 Things Every Designer Needs to Know about People What Makes Them Tick (Susan Weinschenk) (Z-Library).pdf`
5. `procesados/Adaptive-Web-Design.pdf`
6. `procesados/Addy Osmani - Learning Javascript Design Patterns.pdf`
7. `procesados/Architecting the Cloud [2014].pdf`
8. `procesados/Atomic Design.pdf`
9. `procesados/AWS-Certified-Solutions-Architect-Official-Study-Guide.pdf.pdf`
10. `procesados/book_accelerate_high_performing_technology_organisations_forsgren_humble_kim.pdf`
11. `procesados/book_advanced_api_security_siriwardena.pdf`
12. `procesados/book_algorithms_notes_for_professionals.pdf`
13. `procesados/book_animating_short_stories_narrative_and_visual_design_cheryl_briggs.pdf`
14. `procesados/book_attacking_network_protocols_forshaw.pdf`
15. `procesados/book_automated_root_cause_analysis.pdf`
16. `procesados/book_a_philosophy_of_software_design_2nd_edition_john_ousterhout.epub`
17. `procesados/book_a_philosophy_of_software_design_john_ousterhout.pdf`
18. `procesados/book_beautiful_code_oram_wilson.pdf`
19. `procesados/book_build_apis_you_wont_hate_phil_sturgeon.pdf`
20. `procesados/book_cinematography_theory_and_practice_3rd_edition_blain_brown.pdf`
21. `procesados/book_code_complete_2nd_edition_steve_mcconnell.pdf`
22. `procesados/book_code_simplicity_max_kanat_alexander.pdf`
23. `procesados/book_core_html5_canvas_graphics_animation_david_geary.pdf`
24. `procesados/book_css_mastery_advanced_web_standards_budd_bjorklund.pdf`
25. `procesados/book_css_notes_for_professionals.pdf`
26. `procesados/book_css_pocket_reference_eric_meyer.pdf`
27. `procesados/book_css_secrets_lea_verou.pdf`
28. `procesados/book_database_internals_alex_petrov.pdf`
29. `procesados/book_designing_audio_effect_plugins_in_cpp_dsp_theory_will_pirkle.pdf`
30. `procesados/book_designing_brand_identity_6th_edition_alina_wheeler_rob_meyerson.pdf`
31. `procesados/book_designing_data_intensive_applications_martin_kleppmann_full.pdf`
32. `procesados/book_designing_event_driven_systems_ben_stopford.pdf`
33. `procesados/book_designing_sound_procedural_audio_andy_farnell.pdf`
34. `procesados/book_designing_web_apis_jin_sahni_shevat.pdf`
35. `procesados/book_designing_with_css_grid_layout_rachel_andrew.pdf`
36. `procesados/book_design_for_motion_fundamentals_and_techniques_2nd_ed_austin_shaw.epub`
37. `procesados/book_design_in_motion_applying_design_principles_to_filmmaking_penny_hilton.pdf`
38. `procesados/book_design_patterns_gang_of_four_gamma_helm_johnson_vlissides.pdf`
39. `procesados/book_dont_just_roll_the_dice_software_pricing_davidson.pdf`
40. `procesados/book_effective_javascript_68_specific_ways_david_herman.pdf`

---

## 3. Estado Exacto de `templates/astro-edge` y Alta de Proyectos (`cto:nuevo`)

### 3.1 Árbol completo de `templates/astro-edge/` (`22` archivos) y configuración literal

```text
templates/astro-edge/
├── AGENTS.md
├── CONSTRAINTS.md
├── astro.config.mjs
├── factory.project.json
├── package.json
├── wrangler.toml
├── memory/
│   └── selector_cache.json
├── public/
│   ├── _headers
│   ├── llms-full.txt
│   ├── llms.txt
│   ├── og-image.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── styles/
│       ├── design-tokens.css
│       └── motion-engine.css
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       ├── design-tokens.css
│       ├── motion-engine.css
│       └── ui-primitives.css
├── tokens/
│   └── design.tokens.json
└── worker/
    └── index.js
```

**Contenido literal de [`templates/astro-edge/package.json`](file:///c:/Users/tomas/Desktop/web-software-factory/templates/astro-edge/package.json#L1-L16):**
```json
{
  "name": "{{PROJECT_ID}}",
  "type": "module",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "build:timings": "astro build --timings",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^7.4.11",
    "@astrojs/cloudflare": "^14.4.7"
  }
}
```

**Contenido literal de [`templates/astro-edge/astro.config.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/templates/astro-edge/astro.config.mjs#L1-L9) (único `astro.config.*`):**
```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: '{{PROJECT_DOMAIN}}',
  output: 'static',
  build: {
    format: 'directory'
  }
});
```

### 3.2 Flags de `cto:nuevo` y Contratos de Gate #1 / Gate #2 en [`tools/cto_command_center.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/cto_command_center.mjs)

1. **Discrepancia clave sobre `--tipo` (`handleNuevo`, `#L207-L256`)**:
   - **El flag `--tipo` NO existe ni es leído en `cto_command_center.mjs`.**
   - Los flags literales parseados por `parseCliFlag()` (`#L215-L219`) son:
     - **Posicional (`<nombre>`)**: slug/nombre del proyecto.
     - **`--stack` (alias `--template`)**: `vanilla-edge` | `astro-edge`. **Para instanciar `templates/astro-edge/` es obligatorio pasar `--stack astro-edge` (o `--template astro-edge`)**; si se pasa nombre posicional sin `--stack`, hace fallback silencioso a `'vanilla-edge'` (`#L225-L227`). Internamente ejecuta:  
       `node tools/factory.mjs new ${slug} --stack ${plantilla} --archetype ${rubro} --style ${estilo}` (`#L248`).
     - **`--archetype` (alias `--rubro`)** *(en consola interactiva se pregunta como "¿Qué tipo de sitio es?")*: `saas-b2b` | `ecommerce` | `marketing` | `portfolio` (default `'saas-b2b'`).
     - **`--style` (alias `--estilo`)**: `bento` | `linear-style` | `stripe-editorial` | `swiss-grid` (default `'bento'`).

2. **Contratos para aprobar Gate #1 y Gate #2 (`.specify/` vs. raíz `projects/<slug>/`):**
   - Cuando `projects/<slug>` es nuevo (`!fs.existsSync(projDir)`), `handleNuevo` ejecuta `factory.mjs new` y **no invoca `factory.mjs spec`** (`#L246-L256`; `.specify/` solo se genera si se llama explícitamente `factory.mjs spec` o si la carpeta del proyecto ya existía).
   - En `tools/cto_command_center.mjs`, **ni Gate #1 ni Gate #2 buscan archivos dentro de `.specify/`** (`#L334-L438`). La Doble Compuerta Manual previa a `cto:construir` (`verifyDualInterviewGates`, `#L423-L437`) opera sobre los archivos en la **raíz de `projects/<slug>/`**:

| Compuerta (`cto_command_center.mjs`) | Archivos Fuente Leídos / Cuestionario | Condición de Aprobación | Contratos Compilados / Exigidos en `projects/<slug>/` | Nota sobre `.specify/` |
| :--- | :--- | :--- | :--- | :--- |
| **Gate #1** (`npm run cto:entrevista-prd -- <slug> --aprobar`, `handleEntrevistaPrd`, `#L334-L370`) | `ENTREVISTA_1_PRD_Y_MARCA.md` + `PRD_INTERVIEW_STATE.json` | `prdInterviewStatus === "COMPLETED_BY_CTO"` (`verifyPrdInterviewGate`) | **`PRD_LEAN.md`** *(literalmente `PRD_LEAN.md`, no `PRD.md`, con `[INV-01]..[INV-07]` + Non-Goals)* y **`BRAND_IDENTITY_LOCK.json`** | `.specify/` NO participa en Gate #1. |
| **Gate #2** (`npm run cto:entrevista -- <slug> --aprobar`, `handleEntrevista`, `#L372-L415`, exige Gate #1 previo en `#L384`) | `ENTREVISTA_2_SPEC_TECNICO.md` + `CLIENT_BRIEF_INTERVIEW.json` | `specInterviewStatus === "COMPLETED_BY_CTO"` (`verifyClientInterviewGate` + `verifyDualInterviewGates`) | **`SPEC.md`** (`[REQ-01]..[REQ-12]`), **`PRODUCT.md`** y **`DESIGN.md`** (8 secciones Google Labs + tokens YAML + identidad de marca y semilla sonora) | `.specify/` NO participa en Gate #2. |

---

## 4. Puente de Inferencia ([`tools/intelligence/vertex_ai_bridge.mjs`](file:///c:/Users/tomas/Desktop/web-software-factory/tools/intelligence/vertex_ai_bridge.mjs), `2099` líneas)

### 4.1 Variables de entorno requeridas y opcionales
Cargadas por `loadEnv()` desde `process.env`, `.env` y `.dev.vars` (`#L25-L55`, `#L78-L96`, `#L152`, `#L1414`, `#L1991`):

| Variable | Uso Literal | Default / Condición |
| :--- | :--- | :--- |
| `GCP_PROJECT_ID` / `GOOGLE_CLOUD_PROJECT` | ID del proyecto GCP (Vertex AI, BigQuery, etiqueta KMS local) | `""` (Requerido para Vertex AI y BigQuery) |
| `GCP_LOCATION` | Región de Vertex AI / Cloud Run URL | `'us-central1'` |
| `GEMINI_MODEL` | Modelo Gemini por defecto | `'gemini-2.5-flash'` |
| `USE_VERTEX_AI` | Si es `'true'` (con `GCP_PROJECT`), instancia `@google/genai` en modo `vertexai: true` | Opcional si existe `adcPath` |
| `GOOGLE_APPLICATION_CREDENTIALS` | Ruta al archivo JSON de Service Account / ADC (si existe en disco, se exporta a `process.env`) | `""` (Activa Vertex AI junto a `GCP_PROJECT`) |
| `GEMINI_API_KEY` / `GOOGLE_AI_STUDIO_KEY` | Fallback directo a Google AI Studio si no se cumplen condiciones de Vertex AI | `""` |
| `GROQ_API_KEY` | API Key de Groq LPU (primario en `expandAndCanonicalizeQuery` y `rerankCandidatesWithAI`) | `""` |
| `CLOUD_RUN_TRELLIS_3D_URL` | Endpoint HTTPS opcional para `generate3dMeshFromPrompt` | `""` |
| `CLOUD_RUN_MULTIMEDIA_L4_URL` | Endpoint HTTPS opcional para `routeMultimediaGeneration` Tier 1 | `""` |
| `VERTEX_LAST_DIAGNOSTIC` | Escrita por el módulo en `process.env` ante fallbacks/errores | N/A (salida diagnóstica) |

### 4.2 Métodos de autenticación contra GCP (`4` mecanismos en código)
1. **ADC / Service Account vía `@google/genai` (`getVertexClient`, `#L64-L90`)**: Si `(env.USE_VERTEX_AI === 'true' || (adcPath && fs.existsSync(adcPath))) && GCP_PROJECT`, inicializa `new GoogleGenAI({ vertexai: true, project: GCP_PROJECT, location: GCP_LOCATION })`.
2. **API Key de Google AI Studio (`#L92-L96`)**: Fallback si no se activa Vertex AI: `new GoogleGenAI({ apiKey: env.GEMINI_API_KEY || env.GOOGLE_AI_STUDIO_KEY })`.
3. **CLI `gcloud.cmd auth print-access-token` (`syncSniperMatrixToBigQuery`, `#L861-L865`, `#L891-L896`)**: Solo para insertar filas en BigQuery; invoca la ruta fija de Windows `C:\Users\tomas\AppData\Local\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd` y envía `Authorization: Bearer <token>` + header `'x-goog-user-project': GCP_PROJECT`.
4. **Criptografía local sin llamada a GCP KMS (`wrapAndUnwrapKeyWithGcpKms`, `#L1265-L1365`)**: Opera en local con WebCrypto `crypto.subtle` / `node:crypto` `AES-256-GCM` derivando `LOCAL_DEV_CMK_MATERIAL` mediante SHA-256 sobre `GCP_PROJECT`, pese al nombre de la función.

### 4.3 Exportaciones (`33` símbolos: `30` funciones + `3` constantes)
- **Cliente, texto, HyDE, reranking y RAG (`#L64-L1014`):** `getVertexClient`, `generateWithVertex`, `expandAndCanonicalizeQuery`, `rerankCandidatesWithAI`, `auditVisualDesign`, `recordFinOpsTelemetry`, `withImplicitPrefix`, `guardedVertexCall`, `ensureCanonContextCache`, `compute50SpinConvolutionFromDna`, `auditSniperSlotWithCoVe`, `generateSniperTacticalBriefing`, `syncSniperMatrixToBigQuery`, `computeRagasMetrics`, `speculativeRagSynthesize`.
- **FinOps Shield, Imagen 3, VLM, KMS, PII, 3D y Ruteo Multimedia (`#L1019-L1921`):** `GCP_FINOPS_BUDGET_PATH` (const), `getGcpFinOpsStatus`, `checkFinOpsDailyBudget`, `generateVisualAssetWithImagen3`, `audit3dSceneAndVisualGateWithGemini`, `wrapAndUnwrapKeyWithGcpKms`, `anonymizePresidioPiiForLogsAndAi`, `generate3dMeshFromPrompt`, `generateArchetypeConceptPlate`, `evaluateVisualArchetypeWithVlm`, `runLocalAntiSlopVisualCheck`, `generateFreePollinationsImageWithCheck`, `GCP_FINOPS_MEMORY_BUDGET_PATH` (const), `MULTIMEDIA_FINOPS_TIERS` (const), `syncFinOpsBudgetJsonSummary`, `resolveMultimediaTierAndEngine`, `buildWordLevelTimestamps`, `routeMultimediaGeneration`.

### 4.4 Modelos configurados
- **Gemini (`@google/genai`)**: `'gemini-2.5-flash'` (default `GEMINI_MODEL`, `#L53`), `'gemini-1.5-flash'` (fallback automático dentro de `generateWithVertex`, `#L128-L130`), `'gemini-2.5-pro'` (seleccionado en metadata por `audit3dSceneAndVisualGateWithGemini` si `preferProModel: true`, `#L1210`, aunque la llamada vision interna `auditVisualDesign` usa `GEMINI_MODEL` `#L368`).
- **Groq LPU (`GROQ_MODELS`, `#L54`)**: `'openai/gpt-oss-120b'`, `'qwen/qwen3.8-27b'`, `'openai/gpt-oss-20b'`.
- **Imagen (`#L1137`)**: `'imagen-3.0-generate-002'` (Vertex AI) y `'flux'` (Pollinations free fallback, `#L1704`, `#L1942`).
- **Ruteo multimedia / 3D (`MULTIMEDIA_FINOPS_TIERS`, `#L1745-L1792`, `#L2020-L2049`)**: `'TRELLIS-Hunyuan3D-2'`, `'stable-audio-open'`, `'meta-audiogen'`, `'polymath-stem-midi-extractor'`, `'pop2piano-arrangement'`, `'film-frame-interpolation-60fps'`, `'vertex-lyria-musiclm'` / `'vertex-lyria-musiclm-001'`, `'vertex-veo-broll'` / `'vertex-veo-broll-001'`, `'gcp-tts-studio-journey'` (`en-US-Journey-D`, `es-AR-Studio-B`).

### 4.5 Soporte de Modo Batch y `responseSchema` estructurado
- **Modo Batch (`ai.batches` / Batch Prediction API de Vertex AI):** **NO SOPORTADO**. Todas las invocaciones en `@google/genai` (`ai.models.generateContent`, `ai.models.generateImages`) son síncronas por request, limitadas por un Token-Bucket de `60 req/min` (`acquireRateToken`, `#L405-L421`), caché SHA-256 en disco (`.agents/memory/vertex_prompt_cache.json`) y tope FinOps de `$1.50 USD/día` (`$90.00 USD` crédito total). Solo implementa paralelismo en memoria con `Promise.all` (`M=3` borradores en `speculativeRagSynthesize`, `#L1004`) y `insertAll` por lote HTTP hacia BigQuery (`#L867`). *(Nota FinOps `#L394-L398`: `ai.caches.create` explícito de Vertex AI está intencionalmente deshabilitado para evitar `$2.08/día` de storage).*
- **`responseSchema` estructurado (`Structured Outputs` / `responseMimeType` en Vertex AI):** **NO SOPORTADO**. `generateWithVertex()` (`#L108-L124`) solo configura `config.systemInstruction` y **nunca** pasa `responseSchema` ni `responseMimeType: 'application/json'`. En los fallbacks de JSON (`expandAndCanonicalizeQuery` `#L191-L195` y `rerankCandidatesWithAI` `#L295-L298`) pide JSON en el texto del prompt, limpia fences ```json manualmente y aplica `JSON.parse()`. En las llamadas primarias a **Groq** (`#L173`, `#L253`), en cambio, sí envía `response_format: { type: 'json_object' }` (sin esquema JSON tipado).

