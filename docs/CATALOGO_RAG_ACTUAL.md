# 📚 Catálogo Clasificado de la Biblioteca Omni-RAG v5 (`knowledge/`)

> **Fecha de Auditoría:** 2026-10-27 (Actualizado en Fase 14 + Ingestas `Cybersecurity_resources`, `EbookFoundation`, `HTML-CSS-Programming-Books`, `quynhethereal/books-2`, Lote de 6 Repositorios, `Awesome-Computer_Science-Resources` y Lote Privado de 98 Libros en `_inbox_pdfs/`)  
> **Total de Documentos Indexados:** `433` documentos Markdown (`65.063` chunks contextuales | `1.867` wikilinks)  
> **Buzón Automático de Libros PDF/EPUB:** `npm run cto:ingerir-libros` (`knowledge/_inbox_pdfs/` -> `node tools/intelligence/book_pdf_ingester.mjs` con aceleración `PyMuPDF` C++ y OCR nativo `winocr`)  
> **Motor de Reconstrucción RAG:** `npm run rag:rebuild` (`node tools/intelligence/rag_pipeline.mjs --rebuild`)

---

## 1. Resumen Estadístico por Dominio

| Dominio / Carpeta (`knowledge/`) | Documentos | Peso Total (KB) | Líneas Totales | Cobertura Actual |
| :--- | :---: | :---: | :---: | :--- |
| `architecture_and_books` | **175** | `69285.6 KB` | `1219400` | ✅ Alta densidad canónica (+Deep JS Rauschmayer, Total TypeScript Pocock, Design of Web APIs 2e Lauret, High-Performance Browser Networking Grigorik, HTTP/3 Explained Stenberg, Kurose Networking 8e, System Design Xu, Clean Architecture Full) |
| `architecture_and_edge` | **2** | `3.8 KB` | `51` | ✅ Alta densidad canónica |
| `cybersecurity` | **55** | `20458.4 KB` | `442100` | ✅ Alta densidad canónica (+Web Application Security 2e 2024 Hoffman, Bug Bounty Bootcamp Vickie Li, Hacking APIs Corey Ball, Secure APIs, Applied Cryptography Schneier, Practical Cryptography Nakov, Web Hacking 101, OWASP API Top 10) |
| `motion_and_animation` | **36** | `3347.9 KB` | `54720` | ✅ Alta densidad canónica (+CSS Animations and Transitions, Core HTML5 Canvas Geary, Canvas/SVG/WebGL, CSS Animation 101, 3D Shaders Lettier) |
| `root` | **6** | `910.7 KB` | `15518` | ✅ Alta densidad canónica |
| `software_factory` | **33** | `9663.1 KB` | `177800` | ✅ Alta densidad canónica (+Site Reliability Engineering Google SRE Full, Accelerate DORA Forsgren, Modern Software Engineering Farley, Your Code as a Crime Scene Tornhill, Unit Testing Khorikov) |
| `sources` | **1** | `6.5 KB` | `51` | ✅ Alta densidad canónica |
| `streaming_and_overlays` | **12** | `6512.3 KB` | `95081` | ✅ Alta densidad canónica |
| `ui_ux_design` | **113** | `24812.9 KB` | `436900` | ✅ Alta densidad canónica (+Refactoring UI Full, 100 Things Designer Weinschenk Full, Neuro Web Design Full, Emotional Design Norman Full, Design of Everyday Things Norman Full, Malewicz Designing UI, Josef Müller-Brockmann Grid Systems OCR, CSS Definitive Guide 4e Meyer, Strategic Writing for UX, UX Writing, Fixing Bad UX, UI Pedia, UI Design Systems Mastery OCR) |

---

## 2. Estado de Cobertura de los 6 Huecos Temáticos y Expansión de Tratados (Fase 14 — 100% Cubiertos)

Los **6 huecos temáticos** y los **4 micro-tratados de diseño (`< 3 KB`)** fueron cubiertos y expandidos en la **Fase 14** extrayendo datos verificables de la bóveda local (`references/sota-2026/growth-and-hitl/marketingskills`, `references/hunt-2026-10/awesome-design-skills`, `references/factory-expansion/cloudflare-edge`) y especificaciones técnicas oficiales:

| # | Área / Hueco Cubierto | Documento Canónico Creado o Expandido | Tamaño Actual | Estado |
| :---: | :--- | :--- | :---: | :---: |
| **1** | **Copywriting en Español (Rioplatense/Neutro), Ofertas Hormozi y 5 Niveles de Schwartz** | `knowledge/ui_ux_design/CANON_SPANISH_COPYWRITING_HORMOZI_OFFERS_AND_SCHWARTZ_CRO_2026.md` | `17.38 KB` | ✅ **CUBIERTO** |
| **2** | **SEO Local, 12 Playbooks de Programmatic SEO, JSON-LD `@graph` y GEO/AEO** | `knowledge/software_factory/CANON_LOCAL_SEO_PROGRAMMATIC_JSONLD_AND_GEO_2026.md` | `15.05 KB` | ✅ **CUBIERTO** |
| **3** | **Analítica Privacy-First (PostHog, Plausible, Cloudflare) y Experimentación A/B** | `knowledge/software_factory/CANON_PRIVACY_FIRST_ANALYTICS_POSTHOG_PLAUSIBLE_AND_AB_TESTING_2026.md` | `11.29 KB` | ✅ **CUBIERTO** |
| **4** | **Webhooks `n8n`, Validación `Valibot`, Firma HMAC, WhatsApp Cloud API v21.0 y CRM** | `knowledge/software_factory/CANON_N8N_WEBHOOKS_CRM_AND_WHATSAPP_AUTOMATION_2026.md` | `11.49 KB` | ✅ **CUBIERTO** |
| **5** | **Pasarelas de Pago en el Edge (MercadoPago, Stripe, Lemon Squeezy) e Idempotencia D1** | `knowledge/architecture_and_books/CANON_PAYMENT_GATEWAYS_MERCADOPAGO_STRIPE_LEMONSQUEEZY_EDGE_2026.md` | `10.90 KB` | ✅ **CUBIERTO** |
| **6** | **Email Transaccional (`Resend`), Entregabilidad DNS (SPF/DKIM/DMARC/RFC 8058) y 7 Correos** | `knowledge/architecture_and_books/CANON_TRANSACTIONAL_EMAIL_RESEND_ONBOARDING_AND_DELIVERABILITY_2026.md` | `9.54 KB` | ✅ **CUBIERTO** |
| **7** | **Expansión Profunda: Refactoring UI (Wathan & Schoger)** | `knowledge/ui_ux_design/CANON_REFACTORING_UI_WATHAN_SCHOGER.md` | `13.03 KB` | ✅ **EXPANDIDO** |
| **8** | **Expansión Profunda: Practical UI (Adham Dannaway)** | `knowledge/ui_ux_design/CANON_PRACTICAL_UI_ADHAM_DANNAWAY.md` | `11.22 KB` | ✅ **EXPANDIDO** |
| **9** | **Expansión Profunda: Design Systems (Alla Kholmatova)** | `knowledge/ui_ux_design/CANON_DESIGN_SYSTEMS_ALLA_KHOLMATOVA.md` | `10.48 KB` | ✅ **EXPANDIDO** |
| **10** | **Expansión Profunda: Thinking, Fast and Slow (Daniel Kahneman)** | `knowledge/ui_ux_design/CANON_THINKING_FAST_AND_SLOW_KAHNEMAN.md` | `10.60 KB` | ✅ **EXPANDIDO** |

### Cómo ingerir nuevos libros PDF o EPUB desde el Buzón Automático:
1. Copiá cualquier archivo `.pdf`, `.epub` o `.md` en `knowledge/_inbox_pdfs/`.
2. Ejecutá en la terminal:
```powershell
npm run cto:ingerir-libros
```
*(También podés ingerir un archivo puntual con `node tools/intelligence/book_pdf_ingester.mjs --file "C:/ruta/al/libro.pdf" --title "Nombre_Del_Libro"`).*

---

## 3. Inventario Completo Clasificado de los 245 Documentos Actuales

### Dominio: `architecture_and_books` (102 documentos)

| # | Archivo | Título / Tema Principal | Categoría | Tamaño |
| :---: | :--- | :--- | :--- | :---: |
| 1 | `12_factor_agents_production.md` | 🎓 Video Curso: 12-Factor Agents: Patterns for Reliable Production LLMs | 🎬 Videocurso / Workshop | `14.0 KB` |
| 2 | `ai_engineering.md` | 📚 Libro Completo: AI Engineering: Building Applications with Foundation Models | 📚 Libro / Tratado Canónico | `1063.5 KB` |
| 3 | `artificial_intelligence_a_modern_approach_4th.md` | 📚 Libro Completo: Artificial Intelligence: A Modern Approach (4th Edition) | 📚 Libro / Tratado Canónico | `3782.5 KB` |
| 4 | `AUTONOMOUS_AI_SOFTWARE_FACTORY_CANON_2026.md` | Canon & Architecture: Autonomous AI Software Factory (2026) | 🎬 Videocurso / Workshop | `5.9 KB` |
| 5 | `beyond_vibe_coding.md` | 📚 Libro Completo: Beyond Vibe Coding: AI-Assisted Software Engineering | 📚 Libro / Tratado Canónico | `525.9 KB` |
| 6 | `bigquery_and_llm_post_training_for_autonomous_agents.md` | BigQuery Analytics, Behavioral Cloning and LLM Post-Training for Autonomous Agents | Tratado / Guía Técnica | `8.4 KB` |
| 7 | `book_a_course_in_game_theory_osborne_rubinstein.md` | 📚 Libro Completo: A Course in Game Theory | 📚 Libro / Tratado Canónico | `750.9 KB` |
| 8 | `book_designing_llm_applications_oreilly.md` | 📚 Libro Completo: Designing Large Language Model Applications | 📚 Libro / Tratado Canónico | `631.7 KB` |
| 9 | `book_domain_driven_design_eric_evans.md` | 📚 Libro Completo: Domain-Driven Design: Tackling Complexity in the Heart of Software | 📚 Libro / Tratado Canónico | `803.1 KB` |
| 10 | `book_effective_typescript_dan_vanderkam.md` | 📚 Libro Completo: Effective TypeScript: 62 Specific Ways to Improve Your TypeScript | 📚 Libro / Tratado Canónico | `425.7 KB` |
| 11 | `book_eloquent_javascript_marijn_haverbeke.md` | 📚 Libro Completo: Eloquent JavaScript (3rd Edition) | 📚 Libro / Tratado Canónico | `707.2 KB` |
| 12 | `book_modelling_extremal_events_embrechts_kluppelberg_mikosch.md` | 📚 Libro Completo: Modelling Extremal Events for Insurance and Finance | 📚 Libro / Tratado Canónico | `1168.3 KB` |
| 13 | `book_prompt_engineering_generative_ai_oreilly.md` | 📚 Libro Completo: Prompt Engineering for Generative AI | 📚 Libro / Tratado Canónico | `657.8 KB` |
| 14 | `book_surprises_in_probability_henk_tijms.md` | 📚 Libro Completo: Surprises in Probability: Seventeen Short Stories | 📚 Libro / Tratado Canónico | `256.2 KB` |
| 15 | `building_applications_with_ai_agents_and_mult.md` | 📚 Libro Completo: Building Applications with AI Agents and Multi-Agent Systems | 📚 Libro / Tratado Canónico | `790.3 KB` |
| 16 | `CANON_50_REPOS_AGENTIC_SOFTWARE_FACTORY_TOM_SWE_STAGEHAND_AND_OXC_2026.md` | CANON: Arquitectura de Software Factory Agéntica (50 Repositorios SOTA, ToM-SWE, Stagehand, Browserbase UI-Test y Oxc Rust Toolchain — 2026) | 🏛️ Canon / Estándar SOTA 2026 | `19.9 KB` |
| 17 | `CANON_60_FUENTES_CANONICAS_INDEX.md` | 📚 Índice Maestro: Compendio de 60 Fuentes Canónicas de WebFactory (2026) | 🎬 Videocurso / Workshop | `17.8 KB` |
| 18 | `CANON_60_INGESTA_MASIVA_MASTER_DOSSIER.md` | 📚 Compendio Canónico de Ingesta Masiva: 60 Fuentes de Psicología, Geometría UI, Ingeniería y Rendimiento | 🎬 Videocurso / Workshop | `23.5 KB` |
| 19 | `CANON_AGENT_TOKEN_EFFICIENCY_ANTIGRAVITY_2026-10-24.md` | CANON: Eficiencia de Tokens en Antigravity y Operación del Equipo de Agentes (Octubre 2026) | 🏛️ Canon / Estándar SOTA 2026 | `9.5 KB` |
| 20 | `CANON_AGENTIC_01_FOUNDATIONAL_PAPERS.md` | 🧠 Canon de Ingeniería Agéntica 01: Papers Fundacionales y Arquitectura Cognitiva | 🎬 Videocurso / Workshop | `6.6 KB` |
| 21 | `CANON_AGENTIC_02_FRAMEWORKS_ORCHESTRATION.md` | ⚙️ Canon de Ingeniería Agéntica 02: Frameworks de Orquestación y Grafos de Estado | 🎬 Videocurso / Workshop | `6.2 KB` |
| 22 | `CANON_AGENTIC_03_SOTA_OPEN_SOURCE_AND_TOOLING.md` | 🛠️ Canon de Ingeniería Agéntica 03: Arquitecturas Open Source y Tooling de Producción | 🎬 Videocurso / Workshop | `5.3 KB` |
| 23 | `CANON_AGENTIC_SOFTWARE_FACTORY_WEB_CRAFT_2026.md` | CANON AGENTIC SOFTWARE FACTORY & WEB CRAFT 2026: Metodología, Arquitectura y Manufactura de Software de Élite Mediante IA Agéntica | 🏛️ Canon / Estándar SOTA 2026 | `16.5 KB` |
| 24 | `CANON_AI_SOFTWARE_FACTORY_MASTERCLASS_SERIES_2026.md` | Canon: Masterclass Series — Industrial AI Software Factories (2026) | 🎬 Videocurso / Workshop | `14.4 KB` |
| 25 | `CANON_AI_SOFTWARE_FACTORY_SOTA_2026-10-24.md` | CANON: AI Software Factory SOTA — Operación, Configuración y Tecnologías (Octubre 2026) | 🏛️ Canon / Estándar SOTA 2026 | `12.6 KB` |
| 26 | `CANON_ALGORITHM_DESIGN_MANUAL_SKIENA.md` | 🧮 Tratado Canónico: The Algorithm Design Manual (Steven S. Skiena) | 🎬 Videocurso / Workshop | `1.5 KB` |
| 27 | `CANON_ANTI_FRAGILITY_RESILIENCE_AND_GUARDRAILS_2026.md` | CANON ANTI FRAGILITY RESILIENCE AND GUARDRAILS 2026 | 🎬 Videocurso / Workshop | `10.3 KB` |
| 28 | `CANON_ANTI_HALLUCINATION_AND_AGENT_PRECISION_DOSSIER.md` | 🛡️ Dossier Maestro: Erradicación de Alucinaciones, Prevención de Overfitting y Máxima Eficiencia en el Enjambre de Agentes de WebFactory | 🎬 Videocurso / Workshop | `12.0 KB` |
| 29 | `CANON_AUTOMATED_VISUAL_QA_VLM_CRITIC_AND_CTO_HITL_GATE_2026.md` | Tratado Canónico: Auditoría Visual Automatizada, Crítico Multimodal VLM y Compuerta CTO HITL (SOTA 2026) | 🏛️ Canon / Estándar SOTA 2026 | `8.1 KB` |
| 30 | `CANON_BOOKS_SOFTWARE_FACTORIES_AND_AI_ENGINEERING.md` | Canon: Fundamental Books on Software Factories & AI Engineering (2026) | 📚 Libro / Tratado Canónico | `7.4 KB` |
| 31 | `CANON_BUILDING_MICROSERVICES_SAM_NEWMAN.md` | 🏛️ Tratado Canónico: Building Microservices (Sam Newman) | 📚 Libro / Tratado Canónico | `1.8 KB` |
| 32 | `CANON_CLEAN_ROOM_SOFTWARE_DESIGN_REFACTORING_AND_LEGACY_CODE_2026.md` | Tratado Canónico Clean-Room: Filosofía de Diseño de Software (Ousterhout), Refactorización Avanzada (Fowler, Feathers, Kerievsky), Unit Testing (Khorikov), Observabilidad y Chaos Engineering (2026) | 🏛️ Canon / Estándar SOTA 2026 | `6.5 KB` |
| 33 | `CANON_CLOUDFLARE_D1_WORKERS_PAID_FINOPS_AND_EDGE_OPTIMIZATION_2026.md` | CANON: Optimización de Cloudflare D1, Workers Paid (USD 5/mes), FinOps Guardrails, Smart Placement y Cifrado en Reposo (2026) | 📚 Libro / Tratado Canónico | `10.0 KB` |
| 34 | `CANON_COMPLETE_FREE_VIDEO_COURSES_AND_SEMINAL_PAPERS_2026.md` | Tratado Canónico: Compendio de Videocursos Universitarios e Industriales Gratuitos y Papers Seminales (SOTA 2026) | 🎬 Videocurso / Workshop | `8.0 KB` |
| 35 | `CANON_COURSES_AGENTIC_AI_AND_SYSTEMS.md` | Canon: World-Class Free Courses & Curricula on Agentic AI & Systems (2026) | 🎬 Videocurso / Workshop | `12.3 KB` |
| 36 | `CANON_DISTRIBUTED_SYSTEMS_TANENBAUM.md` | 🌐 Tratado Canónico: Sistemas Distribuidos (Andrew S. Tanenbaum) | 🎬 Videocurso / Workshop | `2.0 KB` |
| 37 | `CANON_EBOOKFOUNDATION_FREE_PROGRAMMING_BOOKS_MASTER_SYNTHESIS_2026.md` | Síntesis Canónica Maestra: Los 65 Libros Clave de EbookFoundation (`free-programming-books-en.md`) para la Web Software Factory (2026) | 📚 Libro / Tratado Canónico | `9.7 KB` |
| 38 | `CANON_ECC_EVERYTHING_CLAUDE_CODE_AGENT_HARNESS_2026.md` | CANON: Everything Claude Code (ECC) — Autonomous Agent Harness & Continuous Learning Architecture (2026) | 🎬 Videocurso / Workshop | `11.7 KB` |
| 39 | `CANON_ECC_HARNESS_AND_AGENT_OPTIMIZATION_PLAYBOOK_2026.md` | CANON ECC HARNESS AND AGENT OPTIMIZATION PLAYBOOK 2026 | 📚 Libro / Tratado Canónico | `10.3 KB` |
| 40 | `CANON_EFFECTIVE_TYPESCRIPT_VANDERKAM.md` | 🛡️ Tratado Canónico: TypeScript Seguro, Tipado Estructural y Límites de Validación | 🏛️ Canon / Estándar SOTA 2026 | `4.4 KB` |
| 41 | `CANON_ELITE_MULTI_AGENT_WEB_SOFTWARE_FACTORY_TOPOLOGY_2026.md` | Tratado Canónico: Topología de Equipos Multi-Agente de Élite y Matriz de 76 Skills para nuestra Web Software Factory (SOTA 2026) | 🏛️ Canon / Estándar SOTA 2026 | `10.6 KB` |
| 42 | `CANON_FRONTEND_VERIFICATION_PIPELINE_AND_BENCHMARKS_2026.md` | Tratado Canónico: Frontend Verification Pipeline, Visual Snapshot Regression & SOTA Benchmarks (2025–2026) | 🏛️ Canon / Estándar SOTA 2026 | `12.6 KB` |
| 43 | `CANON_GAMIFICATION_PSYCHOLOGY_CRO_AND_STREAM_MARKETING_2026.md` | CANON: Gamificación, Psicología del Juego, Marketing de Streams y Optimización de Conversión (CRO) 2026 | 🏛️ Canon / Estándar SOTA 2026 | `8.5 KB` |
| 44 | `CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md` | CANON HARNESS ENGINEERING INTEGRAL 2026 | 🎬 Videocurso / Workshop | `28.5 KB` |
| 45 | `CANON_HARNESS_EVALS_SANDBOXES_SOFTWARE_FACTORY_2026.md` | Canon 2026: Harness Engineering, Evals, Sandboxes & Autonomous Software Factories | 🎬 Videocurso / Workshop | `16.7 KB` |
| 46 | `CANON_HARNESS_Y_EVALS_AGENTICOS_SOTA_2026.md` | CANON HARNESS Y EVALS AGENTICOS SOTA 2026 | 🎬 Videocurso / Workshop | `15.0 KB` |
| 47 | `CANON_JAVASCRIPT_GOOD_PARTS_CROCKFORD.md` | ⚡ Tratado Canónico: JavaScript The Good Parts (Douglas Crockford) | 🎬 Videocurso / Workshop | `2.2 KB` |
| 48 | `CANON_MATT_POCOCK_TYPESCRIPT_AND_AGENT_SKILLS_2026.md` | CANON MATT POCOCK TYPESCRIPT AND AGENT SKILLS 2026 | 🏛️ Canon / Estándar SOTA 2026 | `10.2 KB` |
| 49 | `CANON_MYTHICAL_MAN_MONTH_BROOKS.md` | ⏳ Tratado Canónico: The Mythical Man-Month (Fred Brooks) | 🎬 Videocurso / Workshop | `1.7 KB` |
| 50 | `CANON_OPEN_BOOKS_GAME_PROGRAMMING_PATTERNS_NATURE_OF_CODE_AND_ES2025_2026.md` | Tratado Canónico de Libros Abiertos: Game Programming Patterns (Nystrom), The Nature of Code (Shiffman), Exploring JS ES2025 (Rauschmayer), Crafting Interpreters & WebGL2 Fundamentals (2026) | 📚 Libro / Tratado Canónico | `7.0 KB` |
| 51 | `CANON_PAPERS_AGENTIC_SOFTWARE_ENGINEERING_2026.md` | Canon: Seminal Academic Papers on Agentic Software Engineering (2026) | 🎬 Videocurso / Workshop | `12.0 KB` |
| 52 | `CANON_PDF_CATALOGS_FRAMEWORKLESS_FRONTEND_SYSTEM_DESIGN_AND_XRAYS_2026.md` | Tratado Canónico Clean-Room: Desarrollo Frontend Sin Frameworks (Strazzullo, Farrell, Resig, Frisbie), Diseño de Sistemas en Tiempo Real (Alex Xu Vol. 1 & 2), Rayos-X de Diseño (Adam Tornhill), Arquitecturas Evolutivas (Neal Ford) e Inmutabilidad (Perry) (2026) | 🏛️ Canon / Estándar SOTA 2026 | `7.0 KB` |
| 53 | `CANON_POEAA_FOWLER_GOOS_FREEMAN_C4_SIMON_BROWN_AND_FUNCTIONAL_CORE_2026.md` | Tratado Canónico Clean-Room: Patrones de Arquitectura Empresarial (Fowler PoEAA), TDD Guiado por Pruebas (Freeman & Pryce GOOS), Modelo C4 (Simon Brown), Inyección de Dependencias (Seemann), Functional Core / Imperative Shell (Granin) y Flujo Unidireccional Redux (2026) | 🏛️ Canon / Estándar SOTA 2026 | `8.7 KB` |
| 54 | `CANON_QASIMHBTI_BOOKS_SQLITE_SCALABILITY_EDGE_CACHE_AND_ALGORITHMS_2026.md` | Tratado Canónico de los 14 Libros Útiles del Repositorio `qasimhbti/books`: SQLite Internals, Escalabilidad Web, Edge Caching, Grafos, Algoritmos Bitwise y Diagnóstico RCA (2026) | 📚 Libro / Tratado Canónico | `9.3 KB` |
| 55 | `CANON_SELF_EVOLVING_SOFTWARE_FACTORY_AND_SPECULATIVE_RAG_2026.md` | Tratado Canónico: Self-Evolving AI Software Factories, Speculative RAG & Context Caching (SOTA 2025–2026) | 🏛️ Canon / Estándar SOTA 2026 | `10.5 KB` |
| 56 | `CANON_SOFTWARE_ENGINEERING_AT_GOOGLE.md` | 🏢 Tratado Canónico: Software Engineering at Google | 📚 Libro / Tratado Canónico | `2.4 KB` |
| 57 | `CANON_SOTA_AGENT_HARNESS_ENGINEERING_2026.md` | CANON: SOTA Agent Harness Engineering, Scaffolding & Autonomous Alignment (2026) | 🏛️ Canon / Estándar SOTA 2026 | `13.0 KB` |
| 58 | `CANON_SOTA_DEVELOPERS_AND_ENGINEERING_PLAYBOOK_2026.md` | CANON SOTA DEVELOPERS AND ENGINEERING PLAYBOOK 2026 | 📚 Libro / Tratado Canónico | `22.5 KB` |
| 59 | `CANON_SOTA_RAG_ARCHITECTURES_AND_TOOLS_2026.md` | CANON: SOTA RAG Architectures, Hybrid Indexing & Reference Repositories (2026) | 🏛️ Canon / Estándar SOTA 2026 | `13.4 KB` |
| 60 | `CANON_SOTA_WEB_DESIGN_AGENT_SKILLS_AND_OPENSOURCE_TOOLS_2026.md` | CANON: SOTA Web Design, Agent Skills & Open-Source Tooling (Q3/Q4 2026) | 🎬 Videocurso / Workshop | `6.7 KB` |
| 61 | `CANON_SRE_RELIABILITY_ZERO_CRASH_2026.md` | CANON SRE RELIABILITY ZERO CRASH 2026 | 🎬 Videocurso / Workshop | `9.2 KB` |
| 62 | `CANON_THE_TWELVE_FACTOR_APP.md` | ⚙️ Tratado Canónico: The Twelve-Factor App | 🎬 Videocurso / Workshop | `2.0 KB` |
| 63 | `CANON_TIDY_FIRST_KENT_BECK.md` | 🧹 Tratado Canónico: Tidy First? (Kent Beck) | 🎬 Videocurso / Workshop | `1.9 KB` |
| 64 | `CANON_TOKEN_REDUCTION_AND_CONTEXT_BUDGET_TOOLKIT_2026.md` | CANON TOKEN REDUCTION AND CONTEXT BUDGET TOOLKIT 2026 | 🎬 Videocurso / Workshop | `7.6 KB` |
| 65 | `CANON_TOOLING_AND_REPOSITORIES_AI_SOFTWARE_FACTORY.md` | CANON: Repositorios Clave, Herramientas e Integraciones para la Software Factory Autónoma (SOTA 2026) | 🎬 Videocurso / Workshop | `12.0 KB` |
| 66 | `CANON_VALIBOT_EDGE_SCHEMA_VALIDATION.md` | 🛡️ Validación en Runtime: El Paradigma Valibot (Zero-Bundle-Size) | 🎬 Videocurso / Workshop | `3.3 KB` |
| 67 | `CANON_WORKFLOW_OPTIMIZATION_LIBRARIES_AND_TOOLS_2026.md` | 🚀 Reporte Estratégico: Librerías, Herramientas e Integraciones Open Source de Alto Impacto (Ecosistema Global y Gigantes de China) | 🎬 Videocurso / Workshop | `10.7 KB` |
| 68 | `clean_architecture.md` | 📚 Libro Completo: Clean Architecture | 📚 Libro / Tratado Canónico | `475.3 KB` |
| 69 | `codigo_limpio_spanish.md` | 📚 Libro Completo: Código Limpio (Clean Code) | 📚 Libro / Tratado Canónico | `753.8 KB` |
| 70 | `COMPENDIO_55_VIDEOCURSOS_DISENO_ANIMACION_ARQUITECTURA_2026.md` | Compendio Maestro de 55 Videocursos Técnicos Analizados (UI/UX, Motion 60-FPS, Shaders, Game Design & Agentes IA) | 🎬 Videocurso / Workshop | `914.7 KB` |
| 71 | `COURSE_12_FACTOR_AGENTS_IN_PRODUCTION_DEX_HORTHY.md` | COURSE 12 FACTOR AGENTS IN PRODUCTION DEX HORTHY | 🎬 Videocurso / Workshop | `15.3 KB` |
| 72 | `course_andrej_karpathy_intro_to_llms.md` | 🎓 Video Curso: [1hr Talk] Intro to Large Language Models | 🎬 Videocurso / Workshop | `64.3 KB` |
| 73 | `COURSE_END_TO_END_LLM_POST_TRAINING_PRODUCTION.md` | COURSE END TO END LLM POST TRAINING PRODUCTION | 🎬 Videocurso / Workshop | `7.7 KB` |
| 74 | `course_end_to_end_llm_post_training.md` | 🎓 Master Course: End-to-End LLM Post-Training — From BigQuery to Autonomous 24/7 Production | 🎬 Videocurso / Workshop | `5.5 KB` |
| 75 | `course_freecodecamp_langgraph_ai_agents.md` | 🎓 Video Curso: LangGraph Complete Course for Beginners – Complex AI Agents with Python | 🎬 Videocurso / Workshop | `164.8 KB` |
| 76 | `course_freecodecamp_rag_javascript.md` | 🎓 Video Curso: Build and Deploy a RAG Chatbot with JavaScript, LangChain.js, Next.js, Vercel, OpenAI | 🎬 Videocurso / Workshop | `86.4 KB` |
| 77 | `CURATED_MASTER_BOOKS_COURSES_AND_DOCS_CATALOG_2026.md` | CATÁLOGO MAESTRO CURADO: Libros, Documentación Oficial y Videocursos Gratuitos (Filtro de Calidad 2026) | 📚 Libro / Tratado Canónico | `10.2 KB` |
| 78 | `database_internals.md` | 📚 Libro Completo: Database Internals: A Deep Dive into How Distributed Data Systems Work | 📚 Libro / Tratado Canónico | `737.9 KB` |
| 79 | `designing_data_intensive_applications.md` | 📚 Libro Completo: Designing Data-Intensive Applications | 📚 Libro / Tratado Canónico | `1321.3 KB` |
| 80 | `designing_ml_systems.md` | 📚 Libro Completo: Designing Machine Learning Systems | 📚 Libro / Tratado Canónico | `476.4 KB` |
| 81 | `generative_ai_design_patterns.md` | 📚 Libro Completo: Generative AI Design Patterns | 📚 Libro / Tratado Canónico | `931.0 KB` |
| 82 | `generative_ai_langchain.md` | 📚 Libro Completo: Generative AI with LangChain | 📚 Libro / Tratado Canónico | `607.7 KB` |
| 83 | `hands_on_large_language_models.md` | 📚 Libro Completo: Hands-On Large Language Models | 📚 Libro / Tratado Canónico | `625.4 KB` |
| 84 | `high_output_management.md` | 📖 High Output Management | 📚 Libro / Tratado Canónico | `403.0 KB` |
| 85 | `hooked_habit_forming.md` | 📖 Hooked: How to Build Habit-Forming Products | 📚 Libro / Tratado Canónico | `281.9 KB` |
| 86 | `human_compatible.md` | 📚 Libro Completo: Human Compatible: Artificial Intelligence and the Problem of Control | 📚 Libro / Tratado Canónico | `776.4 KB` |
| 87 | `LIBRARY_INGEST_03A_ARCHITECTURE_DDD_AND_TESTING_45_BOOKS_2026.md` | Biblioteca Ingerida Vol. 3A: Arquitectura de Software, DDD, Patrones de Diseño, Refactoring y TDD (45 Libros Completos) (2026) | 📚 Libro / Tratado Canónico | `403.1 KB` |
| 88 | `LIBRARY_INGEST_03B_JAVASCRIPT_TYPESCRIPT_AND_ALGORITHMS_46_BOOKS_2026.md` | Biblioteca Ingerida Vol. 3B: JavaScript Profundo, TypeScript, Node.js, WebAssembly y Algoritmos (46 Libros Completos) (2026) | 📚 Libro / Tratado Canónico | `399.3 KB` |
| 89 | `LIBRARY_INGEST_04_DATABASES_SQL_APIS_AND_DISTRIBUTED_SYSTEMS_34_BOOKS_2026.md` | Biblioteca Ingerida Vol. 4: Bases de Datos, SQLite/SQL, Diseño de Web APIs, Escalabilidad, Telemetría y Sistemas Distribuidos (34 Libros Completos) (2026) | 📚 Libro / Tratado Canónico | `303.3 KB` |
| 90 | `LIBRARY_INGEST_07_NEWBOOKS_POEAA_TEAM_TOPOLOGIES_TIDY_FIRST_SHIFFMAN_NYSTROM_ALBERS_THALER_EPSTEIN_2026.md` | Biblioteca Ingerida Vol. 7: Nuevos Libros Completos — PoEAA (Martin Fowler), Team Topologies (284p), Tidy First? (Kent Beck), Game Programming Patterns (Nystrom), The Nature of Code (Shiffman), Interaction of Color (Albers), Web Audio API (Smus), Mastering SVG (Larsen), Misbehaving (Thaler), Theory of Gambling (Epstein) y Procedural Storytelling (Short & Adams) (2026) | 📚 Libro / Tratado Canónico | `233.2 KB` |
| 91 | `MASTERCLASS_HARNESS_ENGINEERING_AND_AGENT_EVALS_2026.md` | 🎓 Masterclass 04: Metodología Harness & Evals Agénticos en Producción | 🎬 Videocurso / Workshop | `5.9 KB` |
| 92 | `MATT_POCOCK_ARSENAL_ANALYSIS_2026.md` | Matt Pocock: Engineering Arsenal, Repositories & Agent Methodologies (2026) | 🎬 Videocurso / Workshop | `9.0 KB` |
| 93 | `nudge_thaler_sunstein.md` | 📚 Libro Completo: Nudge | 📚 Libro / Tratado Canónico | `614.1 KB` |
| 94 | `pro_typescript.md` | 📖 Pro TypeScript: Application-Scale JavaScript Development | 📚 Libro / Tratado Canónico | `651.4 KB` |
| 95 | `reinforcement_learning_sutton_barto.md` | 📚 Libro Completo: Reinforcement Learning: An Introduction (2nd Edition) | 📚 Libro / Tratado Canónico | `722.6 KB` |
| 96 | `release_it.md` | 📚 Libro Completo: Release It! Design and Deploy Production-Ready Software (2nd Edition) | 📚 Libro / Tratado Canónico | `638.3 KB` |
| 97 | `site_reliability_engineering_google.md` | 📚 Libro Completo: Site Reliability Engineering: How Google Runs Production Systems | 📚 Libro / Tratado Canónico | `1110.9 KB` |
| 98 | `system_design_interview_vol_2.md` | 📖 System Design Interview: An Insider's Guide (Volume 2) | 📚 Libro / Tratado Canónico | `284.2 KB` |
| 99 | `TECNOLOGIAS_SOTA_STACK_CANON_2026.md` | 🚀 TECNOLOGÍAS SOTA STACK CANON 2026: GUÍA DE ESPECIALIZACIÓN Y MAESTRÍA TÉCNICA | 🎬 Videocurso / Workshop | `28.4 KB` |
| 100 | `the_pragmatic_programmer.md` | 📖 The Pragmatic Programmer: Your Journey to Mastery (20th Anniversary) | 📚 Libro / Tratado Canónico | `583.5 KB` |
| 101 | `the_society_of_mind.md` | 📚 Libro Completo: The Society of Mind | 📚 Libro / Tratado Canónico | `797.2 KB` |
| 102 | `TRATADO_30_LIBROS_Y_30_CHARLAS_INGENIERIA_2026.md` | 📚 Tratado Maestro: Auditoría de 30 Libros, 30 Charlas Técnicas SOTA y Arquitectura de Base de Datos Unificada | 📚 Libro / Tratado Canónico | `16.0 KB` |

### 1. Arquitectura de Software, Cloudflare Edge, Durable Objects & Sistemas Distribuidos (`architecture_and_edge/`) (2 documentos)

| # | Archivo | Título / Tema Principal | Categoría | Tamaño |
| :---: | :--- | :--- | :--- | :---: |
| 1 | `CANON_EDGE_PAYMENTS_STRIPE_MERCADOPAGO_AND_POLAR_2026.md` | CANON SOTA 2026: Pasarelas de Pago en el Edge — Stripe, MercadoPago y Polar.sh con Idempotencia en Cloudflare D1 | 🏛️ Canon / Estándar SOTA 2026 | `2.1 KB` |
| 2 | `CANON_TRANSACTIONAL_EMAIL_RESEND_MJML_AND_DELIVERABILITY_2026.md` | CANON SOTA 2026: Emails Transaccionales desde el Edge (Resend / Postmark), Diseño MJML y Entregabilidad Perfecta (`SPF/DKIM/DMARC/BIMI`) | 🏛️ Canon / Estándar SOTA 2026 | `1.7 KB` |

### 2. Ciberseguridad Zero-Trust, OWASP ASVS v5.0, Criptografía & Anti-Fraude (`cybersecurity/`) (26 documentos)

| # | Archivo | Título / Tema Principal | Categoría | Tamaño |
| :---: | :--- | :--- | :--- | :---: |
| 1 | `ANTI_BOT_STEALTH_GUIDE.md` | 🛡️ Evasión Anti-Bot & Stealth — Guía Completa para realtime-stream.com | Tratado / Guía Técnica | `6.4 KB` |
| 2 | `book_advanced_api_security_siriwardena.md` | 📚 Libro Completo: Advanced API Security: Securing APIs with OAuth 2.0, OpenID Connect, JWS, and JWE (Prabath Siriwardena) | 📚 Libro / Tratado Canónico | `561.4 KB` |
| 3 | `book_attacking_network_protocols_forshaw.md` | 📚 Libro Completo: Attacking Network Protocols (James Forshaw) | 📚 Libro / Tratado Canónico | `583.2 KB` |
| 4 | `book_hacking_exposed_web_applications_3.md` | 📚 Libro Completo: Hacking Exposed Web Applications (3rd Edition — Scambray, Liu & Sima) | 📚 Libro / Tratado Canónico | `920.5 KB` |
| 5 | `book_mastering_modern_web_penetration_testing.md` | 📚 Libro Completo: Mastering Modern Web Penetration Testing (Prakhar Prasad) | 📚 Libro / Tratado Canónico | `310.3 KB` |
| 6 | `book_practical_cloud_security_dotson.md` | 📚 Libro Completo: Practical Cloud Security: A Guide for Secure Design and Deployment (Chris Dotson) | 📚 Libro / Tratado Canónico | `403.1 KB` |
| 7 | `book_python_web_penetration_testing_cookbook.md` | 📚 Libro Completo: Python Web Penetration Testing Cookbook | 📚 Libro / Tratado Canónico | `287.1 KB` |
| 8 | `book_serious_cryptography_aumasson.md` | 📚 Libro Completo: Serious Cryptography: A Practical Introduction to Modern Encryption (Jean-Philippe Aumasson) | 📚 Libro / Tratado Canónico | `618.3 KB` |
| 9 | `book_the_tangled_web_michal_zalewski.md` | 📚 Libro Completo: The Tangled Web: A Guide to Securing Modern Web Applications (Michal Zalewski) | 📚 Libro / Tratado Canónico | `709.3 KB` |
| 10 | `book_web_application_hackers_handbook_stuttard_pinto.md` | 📚 Libro Completo: The Web Application Hacker's Handbook (Dafydd Stuttard & Marcus Pinto) | 📚 Libro / Tratado Canónico | `1501.6 KB` |
| 11 | `book_web_penetration_testing_with_kali_linux.md` | 📚 Libro Completo: Web Penetration Testing with Kali Linux: Build Your Defense Against Web Attacks | 📚 Libro / Tratado Canónico | `426.9 KB` |
| 12 | `CANON_CLEAN_ROOM_WEB_SECURITY_OAUTH2_BUG_HUNTING_AND_VIRTUAL_ECONOMIES_2026.md` | Tratado Canónico Clean-Room: Seguridad de Navegadores (Zalewski), Bug Hunting & APIs (Stuttard, Yaworski, Madden, Richer), Secure by Design (Johnsson, Liran Tal), Transacciones ACID (Jim Gray, Karwin), Economía Virtual ($DIG) y Modelo CRO LIFT (2026) | 🏛️ Canon / Estándar SOTA 2026 | `7.1 KB` |
| 13 | `CANON_CYBERSECURITY_COURSES_AND_AUDIT_ARSENAL.md` | 🎓 Arsenal Educativo Canónico: Cursos Universitarios Libres y Currículas de Hacking Ético | 🎬 Videocurso / Workshop | `11.4 KB` |
| 14 | `CANON_CYBERSECURITY_DEVSECOPS_2026.md` | 🔒 Tratado Canónico: Ciberseguridad Defensiva Web, DevSecOps y Zero Trust (2026) | 🏛️ Canon / Estándar SOTA 2026 | `5.4 KB` |
| 15 | `CANON_IDENTITY_AND_OAUTH_CYBERSECURITY_AUDIT_2026.md` | 🛡️ Auditoría Maestra de Ciberseguridad, Identidad y Blindaje de Datos (Septiembre 2026) | 🏛️ Canon / Estándar SOTA 2026 | `10.0 KB` |
| 16 | `CANON_OPEN_BOOKS_WEB_SECURITY_OWASP_AND_SQLITE_INTERNALS_2026.md` | Tratado Canónico: Documentación Oficial de Seguridad Web (OWASP ASVS 5.0, PortSwigger Academy) y Motor Interno SQLite/D1 (2026) | 📚 Libro / Tratado Canónico | `6.1 KB` |
| 17 | `CANON_REAL_WORLD_CRYPTOGRAPHY_DAVID_WONG.md` | 🔐 Tratado Canónico: Real-World Cryptography (David Wong) | 🏛️ Canon / Estándar SOTA 2026 | `1.6 KB` |
| 18 | `CANON_REALTIME_STREAM_ARCHITECTURE_AND_VULNERABILITY_DEFENSE.md` | CANON REALTIME STREAM ARCHITECTURE AND VULNERABILITY DEFENSE | 🏛️ Canon / Estándar SOTA 2026 | `9.1 KB` |
| 19 | `CANON_SECURITY_BOOKS_AND_DOCS_2026.md` | 📚 Compendio Canónico: Libros Fundacionales, Estándares OWASP y Arquitectura Criptográfica en Hardware (2026) | 📚 Libro / Tratado Canónico | `6.6 KB` |
| 20 | `CANON_SECURITY_ENGINEERING_ROSS_ANDERSON.md` | 🛡️ Tratado Canónico: Security Engineering (Ross Anderson) | 🏛️ Canon / Estándar SOTA 2026 | `2.6 KB` |
| 21 | `CANON_SEMINAL_CRYPTOGRAPHY_PAPERS_AND_PROTOCOLS.md` | 📜 Tratado Canónico: Los 20 Papers Seminales, RFCs y Estándares de Ciberseguridad | 🏛️ Canon / Estándar SOTA 2026 | `17.1 KB` |
| 22 | `CANON_SOCIAL_ENGINEERING_HUMAN_HACKING.md` | 🎭 Tratado Canónico: Ingeniería Social y Seguridad Humana (Hadnagy) | 🏛️ Canon / Estándar SOTA 2026 | `1.9 KB` |
| 23 | `CANON_THREAT_MODELING_ADAM_SHOSTACK.md` | 🔍 Tratado Canónico: Threat Modeling (Adam Shostack) | 🏛️ Canon / Estándar SOTA 2026 | `3.0 KB` |
| 24 | `CYBERSECURITY_MASTER_PROTOCOL.md` | 🛡️ PROTOCOLO MAESTRO DE CIBERSEGURIDAD WEB (Zero Trust & App Integrity) | Tratado / Guía Técnica | `5.5 KB` |
| 25 | `HFT_V22_STREAM_ARCHITECTURE_AND_VULNERABILITY_DEFENSE.md` | ⚡ ARQUITECTURA HFT V2.2: MITIGACIÓN DE VULNERABILIDADES, STREAMING IVS Y TELEMETRÍA INSTITUCIONAL | Tratado / Guía Técnica | `6.9 KB` |
| 26 | `LIBRARY_INGEST_05_CYBERSECURITY_CRYPTOGRAPHY_AND_OAUTH_21_BOOKS_2026.md` | Biblioteca Ingerida Vol. 5: Ciberseguridad Web, Criptografía Aplicada, Seguridad de APIs y OAuth 2.0/2.1 (21 Libros Completos) (2026) | 📚 Libro / Tratado Canónico | `211.3 KB` |

### 3. Ingeniería de Movimiento 60/120 FPS, Shaders WebGL/WebGPU & Audio Procedural (`motion_and_animation/`) (30 documentos)

| # | Archivo | Título / Tema Principal | Categoría | Tamaño |
| :---: | :--- | :--- | :--- | :---: |
| 1 | `BENCHMARK_TIER1_MOTION_AND_3D_LIBRARIES.md` | 🧠 Benchmark Vault: Cerebro de Referencias Visuales, Físicas de UI y Pipeline 3D (Tier-1) | Tratado / Guía Técnica | `15.7 KB` |
| 2 | `book_animation_at_work_rachel_nabors.md` | 📚 Libro Completo: Animation at Work | 📚 Libro / Tratado Canónico | `99.5 KB` |
| 3 | `book_game_feel_steve_swink.md` | 📚 Libro Completo: Game Feel: A Game Designer’s Guide to Virtual Sensation | 📚 Libro / Tratado Canónico | `676.1 KB` |
| 4 | `CANON_2D_3D_GRAPHICS_SHADERS_AND_AESTHETICS_2026.md` | CANON SOTA 2026: Modelado 2D/3D, Shaders WebGPU/WebGL, Animaciones y Estética Web de Vanguardia | 🏛️ Canon / Estándar SOTA 2026 | `10.8 KB` |
| 5 | `CANON_3D_PBR_LIGHTING_AND_CINEMATOGRAPHY.md` | 🎨 Guía Maestra: Renderizado 3D, Materiales PBR, Iluminación y Cinematografía en WebFactory | 🏛️ Canon / Estándar SOTA 2026 | `6.8 KB` |
| 6 | `CANON_3D_TECHNICAL_ART_AND_SHADERS_GUIDE.md` | 3D TECHNICAL ART GUIDE — R3F, VRAM y 60 FPS en móvil | 🏛️ Canon / Estándar SOTA 2026 | `3.8 KB` |
| 7 | `CANON_60FPS_RENDER_AND_MOTION_OPTIMIZATION_PIPELINE.md` | 🧠 Dossier de Arquitectura: Pipeline Externo de Renderizado, Compresión e Importación 3D y Motion Graphics | 🏛️ Canon / Estándar SOTA 2026 | `6.6 KB` |
| 8 | `CANON_ANIMATION_PRINCIPLES_ILLUSION_OF_LIFE_DISNEY.md` | 🎬 Tratado Canónico: Los 12 Principios de Animación Aplicados a UI | 🏛️ Canon / Estándar SOTA 2026 | `4.8 KB` |
| 9 | `CANON_BOOK_ANIMATION_AT_WORK_RACHEL_NABORS.md` | Animation at Work | 📚 Libro / Tratado Canónico | `1.9 KB` |
| 10 | `CANON_CLEAN_ROOM_SVG_ANIMATIONS_GAME_AUDIO_AND_REALTIME_RENDERING_2026.md` | Tratado Canónico Clean-Room: Espaciado de Animación (Richard Williams, Val Head), Animaciones SVG (Sarah Drasner), Renderizado en Tiempo Real (Akenine-Möller, Lengyel) e Implementación de Audio de Juegos (Stevens & Raybould) (2026) | 🏛️ Canon / Estándar SOTA 2026 | `6.2 KB` |
| 11 | `CANON_EMIL_KOWALSKI_ANIMATIONS_ON_THE_WEB.md` | CANON: Animations on the Web — Masterclass & Motion Engineering | 🏛️ Canon / Estándar SOTA 2026 | `6.2 KB` |
| 12 | `CANON_GAME_FEEL_VIRTUAL_SENSATION_SWINK.md` | 🕹️ Tratado Canónico: Game Feel en la Web (Steve Swink) | 🏛️ Canon / Estándar SOTA 2026 | `3.0 KB` |
| 13 | `CANON_GRAPHIC_DESIGN_AGENTS_FRAMEWORK.md` | 🎨 Framework de Anabólicos Gráficos y 2.5D/3D para Agentes Visuales | 🏛️ Canon / Estándar SOTA 2026 | `9.8 KB` |
| 14 | `CANON_HOLO_SHADERS_3D_PACK_CHOREOGRAPHY_AND_WEBAUDIO_SFX_2026.md` | CANON: 3D Holographic Foil Shaders, Booster Pack Rip Choreography & Procedural WebAudio Foley (2026) | 🏛️ Canon / Estándar SOTA 2026 | `8.2 KB` |
| 15 | `CANON_LOW_LEVEL_GRAPHICS_METAL_GPU_SHADERS.md` | ⚡ Tratado Canónico: Gráficos de Bajo Nivel, Metal y Shaders Skia | 🏛️ Canon / Estándar SOTA 2026 | `2.6 KB` |
| 16 | `CANON_MOTION_AND_ANIMATION_BIBLES_COMPENDIUM.md` | 🎬 Compendio Maestro: Las Biblias del Motion Design, Físicas y Principios de Animación en WebFactory | 🏛️ Canon / Estándar SOTA 2026 | `10.9 KB` |
| 17 | `CANON_OPEN_BOOKS_SHADERS_SDF_AND_WEB_ANIMATION_MASTERY_2026.md` | Tratado Canónico: Libros Abiertos y Documentación Oficial de Shaders, Matemática SDF, Audio Procedural y Animación Web (2026) | 📚 Libro / Tratado Canónico | `6.5 KB` |
| 18 | `CANON_PROCEDURAL_MOTION_GRAPHICS_CODING.md` | MOTION GRAPHICS CODING — Academia de Micro-interacciones (UI Thread) | 🏛️ Canon / Estándar SOTA 2026 | `4.2 KB` |
| 19 | `CANON_VISUAL_SOTA_HUNT_2026-10-24.md` | CANON: Visual SOTA Hunt — Repositorios Nuevos y Estrategias Visuales (Octubre 2026) | 🏛️ Canon / Estándar SOTA 2026 | `9.1 KB` |
| 20 | `CANON_WEB_DESIGN_COMPOSITION_SHADERS_AND_MOTION_2026.md` | Tratado Canónico: Diseño Gráfico Avanzado, Composición, Ciencia del Color OKLCH, Shaders y Animación Web (SOTA 2026) | 🏛️ Canon / Estándar SOTA 2026 | `8.3 KB` |
| 21 | `CANON_WEBGPU_THREEJS_SHADER_ECOSYSTEM.md` | 🧠 Dossier de Arquitectura: Ecosistema 3D Avanzado, Skia, WebGPU y React Three Fiber en Modern Web UI (CSS/WAAPI) | 🏛️ Canon / Estándar SOTA 2026 | `6.3 KB` |
| 22 | `CANON_WOW_EFFECT_SOFTWARE_ARCHITECTURE.md` | 🧠 Dossier de Arquitectura: Claves del Efecto WOW en Software y Experiencia Móvil | 🏛️ Canon / Estándar SOTA 2026 | `6.4 KB` |
| 23 | `creating_web_animations_kirupa.md` | 📚 Libro Completo: Creating Web Animations: Bringing Your UIs to Life | 📚 Libro / Tratado Canónico | `243.8 KB` |
| 24 | `LIBRARY_INGEST_02_MOTION_SHADERS_GAME_ENGINE_AND_AUDIO_25_BOOKS_2026.md` | Biblioteca Ingerida Vol. 2: Animación 60-FPS, Shaders, Motores de Juego 2D/3D, Físicas en JS y Audio Procedural (25 Libros Completos) (2026) | 📚 Libro / Tratado Canónico | `218.9 KB` |
| 25 | `MASTERCLASS_KHAN_ACADEMY_BEZIER_CURVES_MATHEMATICS.md` | 🎓 Masterclass UI: Animation & Bézier Curves: The Mathematics of Natural Motion | Tratado / Guía Técnica | `10.5 KB` |
| 26 | `MASTERCLASS_WWDC18_DESIGNING_FLUID_INTERFACES.md` | 🎓 Masterclass UI: Designing Fluid Interfaces (WWDC18 Session 803) | Tratado / Guía Técnica | `16.3 KB` |
| 27 | `MASTERCLASS_WWDC23_ANIMATE_WITH_SPRINGS.md` | 🎓 Masterclass UI: Animate with Springs (WWDC23 Session 10158) | Tratado / Guía Técnica | `15.1 KB` |
| 28 | `SCORING_FOSS_MOTION_3D_AND_INTERACTION_LIBRARIES.md` | 🛸 Gran Scoring y Benchmark de Repositorios Open-Source Tier-1: Animaciones, Shaders, 3D, Hápticos y Motion Graphics | Tratado / Guía Técnica | `16.5 KB` |
| 29 | `SOTA_UI_GAMIFICATION_3D_MOTION_TOOLKIT.md` | 🎮 SOTA UI Toolkit: Gamificación, Motion Web, Partículas y Síntesis de Audio Procedural | Tratado / Guía Técnica | `3.3 KB` |
| 30 | `SOTA_WEB_ANIMATION_AND_VISUAL_CRAFT_ARSENAL_2026.md` | SOTA 2025/2026: Web Animation, Aesthetics & Visual Craft Open-Source Arsenal | 📚 Libro / Tratado Canónico | `7.4 KB` |

### 7. Índice Maestro y Mapas de Conocimiento (`knowledge/`) (6 documentos)

| # | Archivo | Título / Tema Principal | Categoría | Tamaño |
| :---: | :--- | :--- | :--- | :---: |
| 1 | `actionable_gamification.md` | 📖 Actionable Gamification: Beyond Points, Badges, and Leaderboards | 📚 Libro / Tratado Canónico | `816.4 KB` |
| 2 | `AGENT_CREATIVE_AND_VISUAL_AWARENESS_2026.md` | AGENT CREATIVE & VISUAL AWARENESS 2026: SOTA Design Intelligence, Creative Technologies & Multimodal Visual Feedback | 📚 Libro / Tratado Canónico | `13.0 KB` |
| 3 | `DESIGN_MASTERY_2026.md` | DESIGN MASTERY 2026: 12 Open-Source Libraries for High-End Motion & Graphics | 📚 Libro / Tratado Canónico | `9.1 KB` |
| 4 | `INDEX.md` | Web Software Factory Studio — Índice Maestro de Base de Conocimiento (Diátaxis & LEC-015) | 📚 Libro / Tratado Canónico | `56.0 KB` |
| 5 | `REPOSITORIES_INTELLIGENCE_REPORT_2026.md` | Reporte de Inteligencia de Repositorios GitHub SOTA 2026 | 🎬 Videocurso / Workshop | `11.4 KB` |
| 6 | `UI_RECIPES_CATALOG.md` | UI RECIPES CATALOG — Semantic Intent-to-Code Mapping (2026) | 🎬 Videocurso / Workshop | `4.8 KB` |

### 4. Ingeniería de Líneas de Productos (ISO/IEC 26550), Arquetipos, SEO/AEO/GEO & Agentes (`software_factory/`) (11 documentos)

| # | Archivo | Título / Tema Principal | Categoría | Tamaño |
| :---: | :--- | :--- | :--- | :---: |
| 1 | `CANON_AGENTIC_HARNESS_ENGINEERING_ACI_EDD_BOOKS_AND_COURSES_2026.md` | CANON: Ingeniería de Harnesses Agénticos, ACI, Eval-Driven Development (EDD), Documentación Oficial, Libros y Videocursos (SOTA 2026) | 📚 Libro / Tratado Canónico | `25.0 KB` |
| 2 | `CANON_ASTRO5_CLOUDFLARE_WORKERS_AND_MODERN_WEB_TEMPLATES_2026.md` | CANON: Astro 5/6 + Cloudflare Workers Static Assets & Modern Web Templates (2026) | 🏛️ Canon / Estándar SOTA 2026 | `5.5 KB` |
| 3 | `CANON_LOCAL_SEO_GOOGLE_BUSINESS_AND_MULTI_LOCATION_JSONLD_2026.md` | CANON SOTA 2026: SEO Local, Google Business Profile, `Schema.org` Multi-Ubicación y Programmatic SEO | 🏛️ Canon / Estándar SOTA 2026 | `2.0 KB` |
| 4 | `CANON_MULTI_BRAND_DESIGN_SYSTEMS_DTCG_STYLE_DICTIONARY_AND_ARCHETYPES_2026.md` | CANON: Multi-Brand Design Systems (W3C DTCG 2025.10, Style Dictionary v4, OKLCH & Industry Archetypes) | 🏛️ Canon / Estándar SOTA 2026 | `5.2 KB` |
| 5 | `CANON_N8N_WEBHOOKS_CRM_AND_WHATSAPP_AUTOMATION_2026.md` | CANON SOTA 2026: Automatización Event-Driven con `n8n`, Webhooks Firmados (`HMAC-SHA256`), CRM Sync y WhatsApp Cloud API | 🏛️ Canon / Estándar SOTA 2026 | `2.5 KB` |
| 6 | `CANON_PRIVACY_FIRST_ANALYTICS_PARTYWORKER_AND_AB_TESTING_2026.md` | CANON SOTA 2026: Analítica Web Privacy-First, Telemetría en Web Worker (`Partytown` Pattern) y Experimentación A/B | 🏛️ Canon / Estándar SOTA 2026 | `1.6 KB` |
| 7 | `CANON_SOFTWARE_FACTORY_CURRICULUM_BOOKS_PAPERS_AND_VIDEO_COURSES_2026.md` | CANON: Master Curriculum — Books, Academic Papers, Official Docs & Video Courses on Software Factories (2026) | 📚 Libro / Tratado Canónico | `6.1 KB` |
| 8 | `CANON_SOTA_2026_GLOBAL_AGENTIC_SOFTWARE_FACTORIES_BENCHMARK.md` | CANON SOTA 2026: Global Agentic Software Factories — Architectures, Benchmarks, Methodologies & Comparative Engineering | 📚 Libro / Tratado Canónico | `5.9 KB` |
| 9 | `CANON_SOTA_AGENT_TEAM_TOPOLOGY_AND_2026_WEB_STACK_AUDIT.md` | CANON: SOTA Agent Team Topology & 2026 Web Software Factory Stack Audit | 🏛️ Canon / Estándar SOTA 2026 | `5.6 KB` |
| 10 | `CANON_SPLE_ISO26550_AND_SOFTWARE_FACTORIES_ARCHITECTURE_2026.md` | CANON: Software Product Line Engineering (ISO/IEC 26550) & Agentic Web Software Factories (2026) | 📚 Libro / Tratado Canónico | `7.7 KB` |
| 11 | `CANON_WEB_SOFTWARE_FACTORY_MCP_DTCG_AND_LIGHTNINGCSS_2026.md` | 🏛️ Tratado Canónico: Ecosistema MCP, W3C DTCG 2025.10, LightningCSS, Valibot y Omni-RAG v5.2 (SOTA 2026) | 📚 Libro / Tratado Canónico | `5.8 KB` |

### Dominio: `sources` (1 documentos)

| # | Archivo | Título / Tema Principal | Categoría | Tamaño |
| :---: | :--- | :--- | :--- | :---: |
| 1 | `ADDY_OSMANI_ARSENAL_ANALYSIS_2026.md` | Addy Osmani GitHub Arsenal Analysis (2026) — Agentic Engineering & Web Quality | 🎬 Videocurso / Workshop | `6.5 KB` |

### 5. Tiempo Real, WebSockets, Gamificación & Overlays Interactivos (`streaming_and_overlays/`) (12 documentos)

| # | Archivo | Título / Tema Principal | Categoría | Tamaño |
| :---: | :--- | :--- | :--- | :---: |
| 1 | `book_art_of_game_design_jesse_schell.md` | 📚 Libro Completo: The Art of Game Design: A Book of Lenses | 📚 Libro / Tratado Canónico | `1052.9 KB` |
| 2 | `book_designing_games_tynan_sylvester.md` | 📚 Libro Completo: Designing Games: A Guide to Engineering Experiences | 📚 Libro / Tratado Canónico | `797.9 KB` |
| 3 | `book_even_ninja_monkeys_like_to_play_marczewski.md` | 📚 Libro Completo: Even Ninja Monkeys Like to Play: Unicorn Edition | 📚 Libro / Tratado Canónico | `330.3 KB` |
| 4 | `book_for_the_win_kevin_werbach.md` | 📚 Libro Completo: For the Win: The Power of Gamification and Game Thinking | 📚 Libro / Tratado Canónico | `240.5 KB` |
| 5 | `book_game_mechanics_advanced_game_design_adams_dormans.md` | 📚 Libro Completo: Game Mechanics: Advanced Game Design | 📚 Libro / Tratado Canónico | `816.3 KB` |
| 6 | `book_gamification_revolution_zichermann.md` | 📚 Libro Completo: The Gamification Revolution | 📚 Libro / Tratado Canónico | `416.4 KB` |
| 7 | `book_level_up_scott_rogers.md` | 📚 Libro Completo: Level Up! The Guide to Great Video Game Design | 📚 Libro / Tratado Canónico | `751.0 KB` |
| 8 | `book_rules_of_play_salen_zimmerman.md` | 📚 Libro Completo: Rules of Play: Game Design Fundamentals | 📚 Libro / Tratado Canónico | `1863.5 KB` |
| 9 | `CANON_LIVE_INTERACTIVE_STREAM_GAMES_AND_CROWD_PLAY_2026.md` | CANON: Diseño e Ingeniería de Juegos Interactivos en Vivo para Espectadores de realtime-stream.com (Crowd Play & Premios en Vivo 2026) | 🏛️ Canon / Estándar SOTA 2026 | `8.3 KB` |
| 10 | `KWS_EDGE_AUDIO_STREAMING_SOTA.md` | 🎙️ Keyword Spotting (KWS) Sub-100ms en Edge Streaming Audio (SOTA 2024–2026) | 🎬 Videocurso / Workshop | `6.1 KB` |
| 11 | `LIBRARY_INGEST_06_GAMIFICATION_PSYCHOLOGY_CRO_AND_AI_22_BOOKS_2026.md` | Biblioteca Ingerida Vol. 6: Gamificación, Psicología Conductual, CRO, Matemática de Juegos, Economías Virtuales e IA/Grafos (22 Libros Completos) (2026) | 📚 Libro / Tratado Canónico | `188.8 KB` |
| 12 | `websockets_masterclass_hussein_nasser.md` | 🎓 Video Curso: WebSockets Crash Course - Handshake, Use-cases, Pros & Cons and more | 🎬 Videocurso / Workshop | `40.2 KB` |

### 6. Sistemas de Diseño W3C DTCG, Color Perceptual OKLCH, Tipografía Utopia & Psicología CRO (`ui_ux_design/`) (65 documentos)

| # | Archivo | Título / Tema Principal | Categoría | Tamaño |
| :---: | :--- | :--- | :--- | :---: |
| 1 | `book_accessibility_for_everyone_laura_kalbag.md` | 📚 Libro Completo: Accessibility for Everyone | 📚 Libro / Tratado Canónico | `238.3 KB` |
| 2 | `book_atomic_design_brad_frost.md` | 📚 Libro Completo: Atomic Design (Edición Español) | 📚 Libro / Tratado Canónico | `280.5 KB` |
| 3 | `book_design_of_everyday_things_don_norman.md` | 📚 Libro Completo (Síntesis Maestra): The Design of Everyday Things & Inspired Product Discovery | 📚 Libro / Tratado Canónico | `4.5 KB` |
| 4 | `book_designing_for_performance_lara_hogan.md` | 📚 Libro Completo: Designing for Performance: Weighing Aesthetics and Speed | 📚 Libro / Tratado Canónico | `258.6 KB` |
| 5 | `book_designing_interfaces_jenifer_tidwell.md` | 📚 Libro Completo: Designing Interfaces: Patterns for Effective Interaction Design (2nd Ed) | 📚 Libro / Tratado Canónico | `774.6 KB` |
| 6 | `book_el_diseno_emocional_don_norman.md` | 📚 Libro Completo: El Diseño Emocional: Por qué nos gustan (o no) los objetos cotidianos | 📚 Libro / Tratado Canónico | `13.8 KB` |
| 7 | `book_elements_of_typographic_style_bringhurst.md` | 📚 Libro Completo (Síntesis Maestra): The Elements of Typographic Style & Swiss Grid Systems | 📚 Libro / Tratado Canónico | `5.3 KB` |
| 8 | `book_flow_mihaly_csikszentmihalyi.md` | 📚 Libro Completo: Flow: The Psychology of Optimal Experience | 📚 Libro / Tratado Canónico | `793.8 KB` |
| 9 | `book_fogg_behavior_model_bj_fogg.md` | 📚 Libro Completo (Síntesis Maestra): Fogg Behavior Model (B = MAP) & Persuasive Design | 📚 Libro / Tratado Canónico | `3.8 KB` |
| 10 | `book_frontend_architecture_design_systems_godbolt.md` | 📚 Libro Completo: Frontend Architecture for Design Systems | 📚 Libro / Tratado Canónico | `279.3 KB` |
| 11 | `book_misbehaving_richard_thaler.md` | 📚 Libro Completo: Misbehaving: The Making of Behavioral Economics | 📚 Libro / Tratado Canónico | `741.0 KB` |
| 12 | `book_the_gamers_brain_celia_hodent.md` | 📚 Libro Completo: The Gamer's Brain: How Neuroscience and UX Can Impact Video Game Design | 📚 Libro / Tratado Canónico | `72.4 KB` |
| 13 | `book_web_form_design_luke_wroblewski.md` | 📚 Libro Completo: Web Form Design: Filling in the Blanks | 📚 Libro / Tratado Canónico | `314.9 KB` |
| 14 | `CANON_100_THINGS_DESIGNER_PEOPLE_WEINSCHENK.md` | 👁️ Tratado Canónico: 100 Things Every Designer Needs to Know About People | 🏛️ Canon / Estándar SOTA 2026 | `3.8 KB` |
| 15 | `CANON_21ST_DEV_DESIGN_ENGINEERING_AND_COMPONENT_MARKETPLACE.md` | CANON: 21st.dev — The npm for Design Engineers & Component Ecosystem (2026) | 🏛️ Canon / Estándar SOTA 2026 | `5.4 KB` |
| 16 | `CANON_ACCESSIBILITY_FOR_EVERYONE_KALBAG.md` | ♿ Tratado Canónico: Accesibilidad Universal en Aplicaciones Móviles | 📚 Libro / Tratado Canónico | `3.4 KB` |
| 17 | `CANON_ALGORITHMIC_GAME_THEORY.md` | ♟️ Tratado Canónico: Teoría Algorítmica de Juegos (Nisan & Roughgarden) | 📚 Libro / Tratado Canónico | `1.9 KB` |
| 18 | `CANON_ATTENTION_MERCHANTS_TIM_WU.md` | 👁️ Tratado Canónico: The Attention Merchants (Tim Wu) | 🏛️ Canon / Estándar SOTA 2026 | `3.2 KB` |
| 19 | `CANON_BOOK_ATOMIC_DESIGN_BRAD_FROST.md` | Atomic Design (Edición en Español) | 📚 Libro / Tratado Canónico | `1.6 KB` |
| 20 | `CANON_BOOK_DESIGNING_FOR_PERFORMANCE_LARA_HOGAN.md` | Designing for Performance: Weighing Aesthetics and Speed | 📚 Libro / Tratado Canónico | `2.2 KB` |
| 21 | `CANON_BOOK_DESIGNING_INTERFACES_JENIFER_TIDWELL.md` | Designing Interfaces: Patterns for Effective Interaction Design | 📚 Libro / Tratado Canónico | `1.6 KB` |
| 22 | `CANON_BOOK_MOBILE_USABILITY_JAKOB_NIELSEN.md` | Mobile Usability | 📚 Libro / Tratado Canónico | `1.4 KB` |
| 23 | `CANON_BOOK_WEB_FORM_DESIGN_LUKE_WROBLEWSKI.md` | Web Form Design: Filling in the Blanks | 📚 Libro / Tratado Canónico | `1.6 KB` |
| 24 | `CANON_CLEAN_ROOM_SWISS_TYPOGRAPHY_COLOR_LIGHT_AND_CSS_SECRETS_2026.md` | Tratado Canónico Clean-Room: Color y Luz (Albers, Gurney, Arnheim), Tipografía Suiza (Ruder, Tschichold, Vignelli, Samara), CSS Moderno (Grant, Lea Verou), Micro-Interacciones (Saffer) y Componentes Inclusivos (Pickering) (2026) | 🏛️ Canon / Estándar SOTA 2026 | `7.6 KB` |
| 25 | `CANON_CONTINUOUS_DISCOVERY_HABITS_TERESA_TORRES.md` | 🔄 Tratado Canónico: Continuous Discovery Habits (Teresa Torres) | 🏛️ Canon / Estándar SOTA 2026 | `1.5 KB` |
| 26 | `CANON_DESIGN_SYSTEMS_ALLA_KHOLMATOVA.md` | 🧩 Tratado Canónico: Design Systems (Alla Kholmatova) | 🏛️ Canon / Estándar SOTA 2026 | `1.5 KB` |
| 27 | `CANON_DESIGNING_FOR_EMOTION_WALTER.md` | 🎨 Tratado Canónico: Designing for Emotion (Aarron Walter) | 📚 Libro / Tratado Canónico | `4.1 KB` |
| 28 | `CANON_DESIGNING_FOR_TOUCH_JOSH_CLARK.md` | 📱 Tratado Canónico: Designing for Touch (Josh Clark) | 📚 Libro / Tratado Canónico | `3.8 KB` |
| 29 | `CANON_ELEMENTS_OF_TYPOGRAPHIC_STYLE_AND_GRIDS.md` | 🖋️ Tratado Canónico: Tipografía Áurea y Sistemas de Grillas | 🏛️ Canon / Estándar SOTA 2026 | `3.6 KB` |
| 30 | `CANON_EVERY_LAYOUT_CSS_ALGORITHMS.md` | CANON: Every Layout — Algorithmic CSS Layout Primitives | 🏛️ Canon / Estándar SOTA 2026 | `6.4 KB` |
| 31 | `CANON_EXPERIENCE_ECONOMY_PINE_GILMORE.md` | 🎭 Tratado Canónico: The Experience Economy (Pine & Gilmore) | 📚 Libro / Tratado Canónico | `4.8 KB` |
| 32 | `CANON_FOR_THE_WIN_GAMIFICATION_WERBACH.md` | 🏆 Tratado Canónico: For the Win (Kevin Werbach & Dan Hunter) | 📚 Libro / Tratado Canónico | `1.6 KB` |
| 33 | `CANON_GOLDEN_RATIO_DESIGN_SOURCES_AND_PROPORTIONS.md` | 📐 Fuentes Maestras: Matemática, Diseño y Programación de UI | 📚 Libro / Tratado Canónico | `8.3 KB` |
| 34 | `CANON_GOLDEN_RATIO_UI_MATHEMATICAL_SYNTHESIS.md` | 📐 Síntesis de Descubrimientos: Proporción Áurea, Neuroestética y Dunbar UI | 🏛️ Canon / Estándar SOTA 2026 | `4.7 KB` |
| 35 | `CANON_HISPANIC_B2B_COPYWRITING_AND_100M_OFFERS_ENGINEERING_2026.md` | CANON SOTA 2026: Copywriting B2B/B2C en Español Rioplatense/Neutro e Ingeniería de Ofertas Irresistibles (`$100M Offers` & Schwartz) | 🏛️ Canon / Estándar SOTA 2026 | `2.4 KB` |
| 36 | `CANON_MISBEHAVING_RICHARD_THALER.md` | 🧠 Misbehaving: The Making of Behavioral Economics (Richard H. Thaler — Premio Nobel) | 🏛️ Canon / Estándar SOTA 2026 | `4.5 KB` |
| 37 | `CANON_MONETIZING_INNOVATION_SIMON_KUCHER.md` | 💎 Tratado Canónico: Monetizing Innovation (Simon-Kucher & Partners) | 🏛️ Canon / Estándar SOTA 2026 | `7.7 KB` |
| 38 | `CANON_OPEN_BOOKS_TYPOGRAPHY_COLOR_GRIDS_AND_WEB_PERF_2026.md` | Tratado Canónico: Libros Abiertos de Tipografía, Redes de Alto Rendimiento, Arquitectura Chromium RenderingNG y Patrones Web (2026) | 📚 Libro / Tratado Canónico | `6.1 KB` |
| 39 | `CANON_PLATFORM_REVOLUTION_SCALE_NETWORK_EFFECTS.md` | 🌐 Tratado Canónico: Platform Revolution & Platform Scale | 🏛️ Canon / Estándar SOTA 2026 | `6.0 KB` |
| 40 | `CANON_PRACTICAL_UI_ADHAM_DANNAWAY.md` | 📐 Tratado Canónico: Practical UI (Adham Dannaway) | 📚 Libro / Tratado Canónico | `1.7 KB` |
| 41 | `CANON_PREDICTABLY_IRRATIONAL_ARIELY_TRAMPAS_DESEO.md` | 🧠 Tratado Canónico: Predictably Irrational / Las Trampas del Deseo | 🏛️ Canon / Estándar SOTA 2026 | `4.3 KB` |
| 42 | `CANON_REFACTORING_UI_WATHAN_SCHOGER.md` | 🎨 Tratado Canónico: Refactoring UI (Adam Wathan & Steve Schoger) | 🏛️ Canon / Estándar SOTA 2026 | `1.9 KB` |
| 43 | `CANON_SCARCITY_ESCASEZ_BANDWIDTH_TAX.md` | 📉 Tratado Canónico: Escasez y el Impuesto de Ancho de Banda Cognitivo | 🏛️ Canon / Estándar SOTA 2026 | `3.7 KB` |
| 44 | `CANON_THE_PARADOX_OF_CHOICE_BARRY_SCHWARTZ.md` | ⚖️ Tratado Canónico: The Paradox of Choice (Barry Schwartz) | 🏛️ Canon / Estándar SOTA 2026 | `2.0 KB` |
| 45 | `CANON_THINKING_FAST_AND_SLOW_KAHNEMAN.md` | 🧠 Tratado Canónico: Thinking, Fast and Slow (Daniel Kahneman) | 🏛️ Canon / Estándar SOTA 2026 | `2.4 KB` |
| 46 | `CANON_USER_STORY_MAPPING_JEFF_PATTON.md` | 🗺️ Tratado Canónico: User Story Mapping (Jeff Patton) | 📚 Libro / Tratado Canónico | `2.0 KB` |
| 47 | `CANON_UX_HUMAN_EXPERIENCE_ACCESSIBILITY_2026.md` | 🧠 Tratado Canónico: Experiencia Humana, Heurística Empírica y Accesibilidad Web Universal (2026) | 🏛️ Canon / Estándar SOTA 2026 | `5.9 KB` |
| 48 | `CANON_UX_UI_MASTER_MANIFESTO_2026.md` | Manifiesto Maestro UX/UI — Operaciones Senior de Producto | 🏛️ Canon / Estándar SOTA 2026 | `11.5 KB` |
| 49 | `CANON_VISUAL_PERCEPTION_AND_DESIGN_EXTRACTION_2026.md` | CANON SOTA 2026: Percepción Visual, Minería de Referencias y Extracción de Sistemas de Diseño para Agentes de IA | 🏛️ Canon / Estándar SOTA 2026 | `9.6 KB` |
| 50 | `designing_with_the_mind_in_mind.md` | 📚 Libro Completo: Designing with the Mind in Mind | 📚 Libro / Tratado Canónico | `350.9 KB` |
| 51 | `FOSS_UX_UI_SQUAD_TOOLS_SOTA_2026.md` | Ecosistema Open-Source SOTA para Potenciar el Squad Agéntico de UX/UI en WebFactory | 🏛️ Canon / Estándar SOTA 2026 | `4.1 KB` |
| 52 | `GAME_THEORY_GROWTH_LOOPS_Y_DUNBAR_QUORUM.md` | 🎲 Teoría de Juegos, Elección Pública y Matemáticas del Quórum Dunbar (2026) | Tratado / Guía Técnica | `5.2 KB` |
| 53 | `laws_of_ux_using_psychology_to_design_better_.md` | 📚 Libro Completo: Laws of UX: Using Psychology to Design Better Products & Services | 📚 Libro / Tratado Canónico | `233.7 KB` |
| 54 | `LIBRARY_INGEST_01_UI_UX_TYPOGRAPHY_AND_CSS_39_BOOKS_2026.md` | Biblioteca Ingerida Vol. 1: Diseño UI/UX, Tipografía, Color, CSS Moderno, Web Components y Rendimiento Frontend (39 Libros Completos) (2026) | 📚 Libro / Tratado Canónico | `313.6 KB` |
| 55 | `MASTERCLASS_BRAD_FROST_MAINTAINING_DESIGN_SYSTEMS.md` | 🎓 Masterclass UI: Creating and Maintaining Successful Design Systems (Atomic Design) | Tratado / Guía Técnica | `10.9 KB` |
| 56 | `MASTERCLASS_FRONTEND_MASTERS_UI_SYSTEM_DESIGN_PERF.md` | 🎓 Masterclass UI: Front-End System Design: Advanced UI, Performance & Architecture | Tratado / Guía Técnica | `14.6 KB` |
| 57 | `MASTERCLASS_NNGROUP_AESTHETIC_AND_MINIMALIST_DESIGN.md` | 🎓 Masterclass UI: Aesthetic and Minimalist Design (Usability Heuristic #8) | Tratado / Guía Técnica | `12.7 KB` |
| 58 | `MASTERCLASS_NNGROUP_FITTS_LAW_BUTTONS_AND_LINKS.md` | 🎓 Masterclass UI: Using Fitts's Law to Make Links and Buttons Easier to Click | Tratado / Guía Técnica | `10.6 KB` |
| 59 | `MASTERCLASS_NNGROUP_FITTS_LAW_IN_GUIS.md` | 🎓 Masterclass UI: Fitts's Law in Graphical User Interfaces & Mobile Ergonomics | Tratado / Guía Técnica | `11.1 KB` |
| 60 | `MASTERCLASS_NNGROUP_FLAT_VS_DEEP_HIERARCHIES.md` | 🎓 Masterclass UI: Flat vs. Deep Information Hierarchies in Mobile UI | Tratado / Guía Técnica | `11.6 KB` |
| 61 | `MASTERCLASS_WEBDEV_RESPONSIVE_ADAPTIVE_UI_DESIGN.md` | 🎓 Masterclass UI: Learn Responsive & Adaptive UI Design: Viewports, Density & Ergonomics | Tratado / Guía Técnica | `13.0 KB` |
| 62 | `next_gen_css_una_kravets_chrome_devs.md` | Next_Gen_CSS_Una_Kravets_Chrome_Devs | Tratado / Guía Técnica | `21.0 KB` |
| 63 | `SOTA_MODERN_CSS_SPECIFICATIONS_2026.md` | SOTA: Modern CSS Specifications & Web Platform Baseline (2025/2026) | Tratado / Guía Técnica | `6.2 KB` |
| 64 | `SOTA_UI_MASTER_UPGRADE_2026.md` | 🎨 Tratado Canónico: SOTA Web UI, Design Engineering & Motion Craft (2026) | Tratado / Guía Técnica | `5.1 KB` |
| 65 | `SOTA_UX_UI_AGENT_ARSENAL_INVESTIGATION_2026.md` | 🌐 Investigación Global SOTA: Salto Cualitativo en Comprensión y Calidad de UX/UI para el Enjambre de Agentes de WebFactory | Tratado / Guía Técnica | `22.8 KB` |
