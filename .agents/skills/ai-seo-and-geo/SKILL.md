---
name: ai-seo-and-geo
description: Optimizes websites for both traditional search engines (Google/Bing) and AI Answer Engines (ChatGPT, Perplexity, Claude, Gemini AI Overviews) via llms.txt, llms-full.txt, Schema.org JSON-LD @graph, Programmatic SEO, and Speculation Rules API. Distilled from references/sota-2026/growth-and-hitl/marketingskills.
---

# AI SEO (AEO), Generative Engine Optimization (GEO) & Instant Navigation

## 1. Dual-Engine Discovery Architecture (`llms.txt` + `llms-full.txt`)
- **`/llms.txt`:** Concise Markdown index at root/public containing `# Brand Name`, `> 1-sentence value proposition`, core canonical URLs, and structured sections (`## Core Offerings`, `## Documentation & Specs`, `## Contact & Trust`).
- **`/llms-full.txt`:** Complete, token-dense Markdown compendium of product capabilities, pricing tiers, FAQs, and technical specifications for zero-hop ingestion by RAG crawlers (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`).
- **`/robots.txt` & `/sitemap.xml`:** Explicitly allow AI and search crawlers (`User-agent: * / Allow: /`) and link the canonical XML sitemap.

## 2. Rich Semantic Graph (`Schema.org JSON-LD`)
- Embed a unified `<script type="application/ld+json">` block in `<head>` linking `Organization`, `WebSite`, `WebApplication` (or `Product`/`LocalBusiness`), and `FAQPage` entities.
- Match every visible statistic, claim, and FAQ on the page to structured properties so AI Answer Engines cite the domain as a high-authority primary source.

## 3. Near-Zero LCP via Speculation Rules API
- Include `<script type="speculationrules">` with `"eagerness": "moderate"` for `prerender` and `prefetch` on internal links (`"href_matches": "/*"`), achieving `~0ms` perceived navigation latency.
