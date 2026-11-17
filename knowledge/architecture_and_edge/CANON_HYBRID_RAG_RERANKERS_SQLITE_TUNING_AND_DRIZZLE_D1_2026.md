---
title: "RAG Híbrido v6.1, Cross-Encoder Rerankers Open-Source, Tuning Quirúrgico SQLite y Datos Edge (Cloudflare D1 / Drizzle)"
domain: "architecture_and_edge"
approval_status: "APPROVED_BY_CTO"
created_at: "2026-11-17"
sources:
  - title: "BAAI/bge-reranker-v2-m3 — Multilingual Cross-Encoder Reranker (MIT)"
    url: "https://huggingface.co/BAAI/bge-reranker-v2-m3"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "Qwen/Qwen3-Reranker-0.6B — Apache-2.0 Multilingual Reranker"
    url: "https://huggingface.co/Qwen/Qwen3-Reranker-0.6B"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "Qwen/Qwen3-Embedding-0.6B — Apache-2.0 Embedding Model"
    url: "https://huggingface.co/Qwen/Qwen3-Embedding-0.6B"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "Hugging Face Transformers.js v4 Documentation"
    url: "https://huggingface.co/docs/transformers.js/index"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "Anthropic Engineering — Contextual Retrieval (-49% to -67% Failed Retrievals)"
    url: "https://www.anthropic.com/news/contextual-retrieval"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "MMTEB: Massive Multilingual Text Embedding Benchmark (arXiv:2502.13595)"
    url: "https://arxiv.org/abs/2502.13595"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "SQLite FTS5 Official Documentation"
    url: "https://www.sqlite.org/fts5.html"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "SQLite PRAGMA Statements & Optimizer Guidelines"
    url: "https://www.sqlite.org/pragma.html"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "Cloudflare D1 Worker API, Read Replication & Sessions API"
    url: "https://developers.cloudflare.com/d1/worker-api/d1-database/"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "Drizzle ORM — Connect to Cloudflare D1 & Durable Objects"
    url: "https://orm.drizzle.team/docs/connect-cloudflare-d1"
    verified_at: "2026-11-17"
    http_status: 200
approved_by: "CTO"
approved_at: "2026-11-17T15:37:31.574Z"
---

# RAG Híbrido v6.1, Cross-Encoder Rerankers Open-Source, Tuning Quirúrgico SQLite y Datos Edge

Este documento define las decisiones arquitectónicas óptimas para llevar el motor de conocimiento local (`Omni-RAG`) y la capa de persistencia Edge/SQLite desde prototipos funcionales hasta latencias sub-50 ms, menor huella en disco y consistencia transaccional real.

---

## 1. Arquitectura `Omni-RAG v6.1`: Dos Etapas + Contextual Retrieval + Reranking Local \$0

La fusión por `Reciprocal Rank Fusion (RRF, k=60)` entre búsqueda léxica (`FTS5 unicode61`) y vectorial (`sqlite-vec` `int8[768]`) resuelve el recuerdo (*recall* en Top-40), pero no maximiza la precisión en Top-5 porque un bi-encoder codifica consulta y pasaje por separado.

### 1.1 Selección de Modelos Open-Source en Hugging Face (Verificación de Licencia 2026)

| Rol en Pipeline | Modelo / Librería | Parámetros / Dimensión | Licencia | Cuantización Node/ONNX | Dictamen Comercial |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Reranker Primario** | `BAAI/bge-reranker-v2-m3` | 568M | **MIT** | ONNX Q8 vía `@huggingface/transformers` | **APROBADO** (ES/EN multilingüe maduro) |
| **Reranker SOTA 2026** | `Qwen/Qwen3-Reranker-0.6B` | 0.6B | **Apache-2.0** | `onnx-community/Qwen3-Reranker-0.6B-ONNX` | **APROBADO** (excelente en código + prosa) |
| **Reranker Alternativo** | `mixedbread-ai/mxbai-rerank-base-v2` | ~0.5B | **Apache-2.0** | ONNX Q8 | **APROBADO** |
| **Reranker Restringido** | `jinaai/jina-reranker-v3` | ~0.6B | **CC-BY-NC-4.0** | ONNX / PyTorch | **PROHIBIDO EN COMERCIAL** (solo no-comercial) |
| **Embedding Cloud Primario** | `gemini-embedding-001` (Matryoshka) | 768d (recortado desde 3072d) | API Vertex | Cuantización `int8` L2-normalizada | **MANTENER** con cache por `chunk_sha256` |
| **Embedding Local Offline** | `Qwen/Qwen3-Embedding-0.6B` / `google/embeddinggemma-300m` | 300M–0.6B (768d) | **Apache-2.0** / Gemma | `@huggingface/transformers` v4 ONNX Q8 | **APROBADO** para fallback offline \$0.00 |

> [!WARNING]
> **Cumplimiento de Licencias:** Nunca incluir modelos `CC-BY-NC-4.0` (como `jina-reranker-v3` o `jina-colbert-v2`) en pipelines comerciales o clientes de pago de la fábrica. Usar exclusivamente pesos **MIT** o **Apache-2.0**.

### 1.2 Pipeline en 2 Etapas (Costo Marginal \$0.00 USD)
1. **Etapa 1 — Recuperación Híbrida Rápida (`< 25 ms`):** Consultar `FTS5 (chunks_fts)` y `vec0 (chunks_vec)` en paralelo sobre `rag_hot.sqlite`, fusionar mediante `RRF (k=60)` ponderado por jerarquía epistémica (`TIER_1_SOTA_2026 = 1.35x`, `TIER_2_VERIFIED_DRAFT / TIMELESS = 1.15x`, `agent_skills = 1.0x`, `TIER_UNTRUSTED = 0.75x`) y extraer los **30–40 mejores candidatos únicos**.
2. **Etapa 2 — Cross-Encoder Reranking Local (Top-40 -> Top-5):** Evaluar los pares `(query, candidate.text)` con `Qwen3-Reranker-0.6B` o `bge-reranker-v2-m3` en formato ONNX Q8 usando `@huggingface/transformers` v4 en CPU Node.js (si la latencia supera 250 ms en un entorno limitado, reducir candidatos a Top-20).
3. **Contextual Retrieval (Anthropic):** Durante el chunking en ingesta, anteponer al campo embeddeado y tokenizado en BM25 una cabecera breve y determinista con `[Documento | Dominio | Ruta de Encabezados]` (`max 40 tokens`). Según los benchmarks de Anthropic, esta práctica combinada con BM25 y reranking reduce las fallas de recuperación en **-49% a -67%**.
4. **Ordenamiento Anti-Sesgo Posicional (*Lost in the Middle*, `arXiv:2307.03172`):** Al ensamblar los Top-5 fragmentos dentro del prompt del agente, colocar los 2 fragmentos de mayor relevancia al principio y al final del bloque de contexto, dejando los intermedios en el centro.

---

## 2. Tuning Quirúrgico de SQLite en `node:sqlite` (`DatabaseSync`)

### 2.1 Cómo Evitar la Explosión 11x de Disco en `FTS5`
Crear una tabla virtual `FTS5` con tokenizador `trigram` (`tokenize='trigram remove_diacritics 1'`) genera índices invertidos para cada secuencia de 3 caracteres del corpus. En un repositorio de 70,016 fragmentos (~151 MB de Markdown puro en `rag_library.sqlite`), el índice trigram consume aproximadamente **1.45 GB**, inflando el archivo SQLite a **1.69 GB**.

**Regla Arquitectónica Obligatoria:**
- En **`rag_hot.sqlite`** (< 60 MB, tratados y skills activos): mantener `chunks_fts` (`unicode61 remove_diacritics 2`) + `chunks_trigram` (útil para identificadores exactos de código e imports) + `chunks_vec`.
- En **`rag_library.sqlite`** (acervo masivo de libros): eliminar `chunks_trigram` sobre el texto completo (o limitarlo exclusivamente a la columna `heading_path`) y confiar en `chunks_fts` (`unicode61`) + `chunks_vec` (`int8[768]`), ejecutando `VACUUM` para reducir el archivo de ~1.69 GB a ~260 MB (`-84%` disco, mayor probabilidad de residencia en page cache del SO).

### 2.2 Set Canónico de PRAGMAs al Abrir Conexiones en Node.js 24

```javascript
export function applyProductionSqlitePragmas(db, { readonly = false } = {}) {
  db.exec(`
    PRAGMA busy_timeout = 5000;
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = NORMAL;
    PRAGMA temp_store = MEMORY;
    PRAGMA mmap_size = 268435456;
    PRAGMA cache_size = -64000;
    PRAGMA foreign_keys = ON;
    PRAGMA analysis_limit = 1000;
  `);
  if (!readonly) {
    // SQLite 3.46+ recomenda ejecutar optimize al cerrar o en sesiones largas
    db.exec('PRAGMA optimize=0x10002;');
  }
}
```

- **Seguridad con Extensiones Nativas:** Tras ejecutar `sqliteVec.load(db)`, cerrar inmediatamente la superficie dinámica con `db.enableLoadExtension(false)`.
- **Mantenimiento y Backups en Caliente:** Jamás copiar archivos `.sqlite` en caliente con `fs.copyFileSync` mientras exista un archivo `-wal` activo, y jamás ejecutar `unlinkSync` sobre bases abiertas por procesos MCP en Windows (`EBUSY`). Utilizar `VACUUM INTO '<ruta_destino>'` desde una conexión SQLite abierta.
- **Limpieza de Artefactos Legados:** Retirar bases obsoletas de versiones anteriores (como `.cache/omni_rag_fts5.sqlite`) una vez confirmada la paridad de esquema en `rag_hot.sqlite` y `rag_library.sqlite`.

---

## 3. Persistencia Edge en Cloudflare Workers & Navegador Local-First (2026)

### 3.1 Cloudflare D1: Read Replication, Sessions API y Drizzle ORM
En aplicaciones distribuidas con lecturas globales sobre D1, leer desde una réplica inmediatamente después de escribir en el nodo primario puede devolver datos desactualizados si no se encadena la sesión.

```typescript
// Patrón oficial D1 Sessions API + Drizzle ORM estable (sin versiones RC)
export async function handleProfileUpdate(request: Request, env: Env) {
  const bookmark = request.headers.get('x-d1-bookmark') ?? 'first-unconstrained';
  const session = env.DB.withSession(bookmark);

  await session.prepare('UPDATE learners SET streak = streak + 1 WHERE id = ?').bind(learnerId).run();
  const updated = await session.prepare('SELECT id, streak FROM learners WHERE id = ?').bind(learnerId).first();

  return Response.json(updated, {
    headers: { 'x-d1-bookmark': session.getBookmark() ?? '' }
  });
}
```

- **Time Travel Nativo:** Habilitado por defecto en D1 (7 días en Workers Free, 30 días en Paid) permitiendo restauración instantánea mediante `wrangler d1 time-travel restore <db> --bookmark=<id>`.
- **Durable Objects con SQLite (`ctx.storage.sql`):** Disponibles también en **Cloudflare Workers Free Plan**. Ideales para estado transaccional por sala, rate-limiting distribuido exacto por IP/tenant o colas idempotentes donde un único actor serializa escrituras locales en memoria NVMe colocada junto al Worker.
- **ORM de Producción:** Utilizar versiones estables fijadas de `drizzle-orm` y `drizzle-kit` en reemplazo de `release-candidate` (`1.0.0-rc.*`), manteniendo `Kysely + kysely-d1` como alternativa ligera cuando solo se requiere un query builder SQL puro.

### 3.2 SQLite en Navegador para Plataformas Educativas y Local-First
Cuando `Dexie.js` (IndexedDB) no alcanza porque la aplicación requiere consultas relacionales complejas o `FTS5` directo en el navegador:
- Utilizar **`@sqlite.org/sqlite-wasm` con VFS `opfs-sahpool`** corriendo dentro de un Dedicated Web Worker.
- **Ventaja Crítica frente a `opfs` clásico:** El VFS `opfs-sahpool` logra persistencia OPFS de alto rendimiento **sin necesitar encabezados `Cross-Origin-Opener-Policy: same-origin` ni `Cross-Origin-Embedder-Policy: require-corp` (`SharedArrayBuffer`)**. Esto preserva intacta la reproducción de videos embebidos de terceros (`youtube-nocookie.com` / `archive.org`) sin romper aislamiento por origen.
- Para sincronización bidireccional híbrida cuando exista backend opcional, evaluar `@tursodatabase/sync` (`push()` / `pull()`) frente a soluciones con licencias restrictivas.
