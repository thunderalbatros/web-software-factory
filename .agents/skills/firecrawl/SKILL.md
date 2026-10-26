---
name: firecrawl
description: "Extrae contenido web dinámico (SPAs), documentación técnica y referencias de diseño web en Markdown limpio o JSON estructurado."
---

# Firecrawl Web Extractor & Structured Ingestion Skill

Usa esta skill cuando necesites:
1. Extraer información de páginas web modernas con Single Page Applications (React, Next.js, Vue, Astro) donde un `fetch` básico o Cheerio falla por requerir JavaScript.
2. Ingestar documentación técnica, especificaciones de APIs y referencias de productos o sistemas de diseño para enriquecer la base de conocimiento del Studio (`knowledge/`).
3. Extraer contenido de la web en Markdown semántico limpio para `Omni-RAG v5` (`knowledge/`) sin desperdiciar tokens de contexto con cabeceras, footers o banners de cookies.

## Principios de Uso
- Antes de extraer de la web, consultá primero `Omni-RAG v5` (`web-factory-omni-rag`) y `Context7`.
- Todo documento ingerido debe incluir cabeceras H1/H2 semánticas y enlaces `[[wikilinks]]` hacia el grafo de conocimiento, seguido de `node tools/intelligence/code_and_wiki_graph.mjs` para actualizar la centralidad PageRank.
