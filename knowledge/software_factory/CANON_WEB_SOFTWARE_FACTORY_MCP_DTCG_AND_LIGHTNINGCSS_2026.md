---
version: 1.0.0
tipo: canon-treatise
tags:
  - software-factory
  - w3c-dtcg-2025.10
  - oklch
  - lightningcss
  - valibot
  - mcp-servers
  - astro-5
  - omni-rag-v5.2
autores: [TECH_SCOUT_AGENT, ORCHESTRATOR_AGENT]
ultima_revision: 2026-10-25
---

# 🏛️ Tratado Canónico: Ecosistema MCP, W3C DTCG 2025.10, LightningCSS, Valibot y Omni-RAG v5.2 (SOTA 2026)

> **Alcance:** Arquitectura integral de la `web-software-factory` independiente (`ISO/IEC 26550 SPLE` + `Spec-Kit SDD`), compilación de tokens `W3C DTCG 2025.10` en espacio `OKLCH`, transformación CSS en Rust con `LightningCSS`, validación en el borde con `Valibot`, servidores `MCP` para ingeniería web (`@playwright/mcp`, `@upstash/context7-mcp`, `web-factory-omni-rag v5.2`) y recuperación híbrida ultra-rápida con Índice Invertido en RAM + `node:sqlite` FTS5. Conectado con [[INDEX]], [[CANON_SPLE_ISO26550_AND_SOFTWARE_FACTORIES_ARCHITECTURE_2026]], [[CANON_ASTRO5_CLOUDFLARE_WORKERS_AND_MODERN_WEB_TEMPLATES_2026]] y [[CANON_MULTI_BRAND_DESIGN_SYSTEMS_DTCG_STYLE_DICTIONARY_AND_ARCHETYPES_2026]].

---

## 1. Estándar W3C DTCG 2025.10 y Compilación OKLCH Multi-Estilo (`tools/design/token_compiler.mjs`)

1. **Especificación Estable W3C DTCG (`v2025.10`):**
   - El *Design Tokens Community Group (DTCG)* del W3C estableció en la versión `2025.10` el esquema universal con propiedades `$type`, `$value` y `$description`, eliminando la fragmentación histórica entre Figma, Penpot, Style Dictionary y Terrazzo.
   - **Soporte Nativo de Espacios de Color Perceptuales (`OKLCH`):** Los tokens de color se declaran directamente en `oklch(L C H / alpha)`, garantizando uniformidad perceptual en escalas de luminancia (`--surface-canvas`, `--surface-elevated` `+5% L`, `--surface-interactive` `+9% L`) y cumplimiento estricto del presupuesto cromático **90/8/2** (`90%` superficie neutra, `8%` acento de marca, `2%` CTA de alta conversión) con contraste **APCA** (`Lc >= 90` titular, `Lc >= 75` cuerpo, `Lc >= 60` controles).
2. **Inyección de los 67 Estilos MIT (`awesome-design-skills`) y 4 Arquetipos:**
   - El compilador `tools/design/token_compiler.mjs` (`node tools/factory.mjs tokens --style <style> --archetype <type>`) traduce automáticamente los 4 arquetipos (`saas-b2b`, `ecommerce`, `marketing`, `portfolio`) y los estilos (`bento`, `linear-style`, `vercel-geist`, `stripe-editorial`, `raycast-dark`, `brutalist`, `swiss-grid`, etc.) en:
     - `tokens/design.tokens.json` (contrato JSON W3C DTCG `2025.10`).
     - `site/css/design-tokens.css` y `src/styles/design-tokens.css` (variables CSS nativas, escalas fluidas Utopia `clamp()`, grilla estructural `.container`, `.site-header` con glassmorphism, `.hero-section`, `.pricing-grid`, acordeón exclusivo `<details name="faq-group">` con `interpolate-size: allow-keywords` y modal `<dialog class="dialog-modal">` con `@starting-style`).

---

## 2. Compilación CSS en Rust con `LightningCSS` y Validación Edge con `Valibot`

1. **LightningCSS (`lightningcss` en `tools/build_dist.mjs`):**
   - Escrito en Rust, `LightningCSS` parsea, valida y minifica hojas de estilo modernas (`oklch()`, `@starting-style`, `@view-transition`, `animation-timeline: view()`, CSS Nesting) a velocidad nativa (`<5ms`) generando mapas de origen (`.css.map`) deterministas para `dist/`.
2. **Valibot v1 (`valibot` para Cloudflare Workers):**
   - Con un peso de `~1.2 KB` gracias a su diseño modular *tree-shakeable* (90% más liviano que Zod), `Valibot` es el estándar de la fábrica para validar payloads JSON, formularios de contacto/checkout y parámetros en endpoints de Cloudflare Workers (`worker/index.js`).

---

## 3. Ecosistema de Servidores MCP para Desarrollo Web (`.mcp.json`)

Una Software Factory web de élite en 2026 conecta a sus agentes con el entorno de ejecución mediante 3 servidores **Model Context Protocol (MCP)** complementarios:

| Servidor MCP | Comando / Binario | Rol en la Fábrica Web |
| :--- | :--- | :--- |
| **`web-factory-omni-rag` (`v5.2`)** | `node ./tools/intelligence/mcp_omni_rag_server.mjs` | Expone **6 herramientas nativas**: `omni_rag_query`, `code_graph_query`, `omni_rag_stats`, `factory_style_catalog` (catálogo de 67 estilos + 4 arquetipos), `factory_compile_tokens` (compilador DTCG 2025.10) y `factory_run_audit` (RYUX + Cognitive UX + Diff-UI/Oxc). |
| **`context7` (`@upstash/context7-mcp`)** | `npx -y @upstash/context7-mcp@latest` | Inyecta documentación oficial actualizada por versión (Astro 5 Content Layer / ClientRouter, Cloudflare Workers Static Assets / D1, Playwright, Valibot) evitando alucinaciones de APIs deprecadas. |
| **`playwright` (`@playwright/mcp`)** | `npx -y @playwright/mcp@latest --headless` | Servidor oficial de Microsoft que permite a los agentes navegar el sitio local, interactuar con componentes (`<dialog>`, formularios, navegación) e inspeccionar el árbol de accesibilidad (`AX Tree`) con un ahorro del 90% de tokens frente a capturas de píxeles crudas. |

---

## 4. Arquitectura `Omni-RAG v5.2`: Índice Invertido `O(1)` + SQLite FTS5 + LRU Cache

Para garantizar latencias de recuperación de **un solo dígito de milisegundo (`<8ms/query`)** sin sacrificar el **`100.0% Hit@5`** sobre los `17,800+` chunks de la biblioteca:
1. **Motor A1 (`node:sqlite` FTS5 BM25 en C):** Búsqueda léxica nativa sobre el 100% de los libros y tratados en `.cache/omni_rag_v5.sqlite`.
2. **Motor A2 (`MiniSearch` BM25):** Búsqueda con tolerancia a errores tipográficos (distancia Levenshtein) en consultas cortas.
3. **Motor B (`Inverted Token Index` + Bitmask Robertson-Sparck Jones IDF):** En lugar de escanear linealmente todos los documentos en cada consulta (`O(N)`), `rag_pipeline.mjs` pre-construye en RAM un índice invertido `Map<token, Int32Array>` con las listas de postings de cada término y evalúa únicamente los documentos candidatos (`O(k)` donde `k << N`), respaldado por una caché LRU en memoria (`MAX_QUERY_CACHE = 128`).
