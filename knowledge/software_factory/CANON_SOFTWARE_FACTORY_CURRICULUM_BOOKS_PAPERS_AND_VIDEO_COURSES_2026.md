# CANON: Master Curriculum — Books, Academic Papers, Official Docs & Video Courses on Software Factories (2026)

> **Scope:** Curated syllabus and operational synthesis of the foundational books, peer-reviewed papers, official documentation, and masterclass video courses ingested into `Omni-RAG v5` to train Squads 0–9 as elite Software Factory engineers.
> **Verified Date:** 2026-10-25 `[VERIFICADO: Omni-RAG v5 Master Syllabus]`.

---

## 1. Foundational Books on Software Factories & Product Lines

1. ***Software Factories: Assembling Applications with Patterns, Models, Frameworks, and Tools*** — Jack Greenfield, Keith Short, Steve Cook, Stuart Kent, John Crupi (Wiley, 2004).
   - **Core Takeaways Applied in Our Factory:** Moving from artisanal hand-coding to schema-driven assembly (`factory.project.json`), domain-specific templates (`templates/astro-edge`, `templates/vanilla-edge`), and automated verification gates (`tools/factory.mjs gate`).
2. ***Software Product Lines: Practices and Patterns*** — Paul Clements & Linda Northrop (CMU Software Engineering Institute / Addison-Wesley).
   - **Core Takeaways Applied:** The 29 Practice Areas across Software Engineering, Technical Management, and Organizational Management; separation of **Core Asset Development** from **Product Development**.
3. ***Software Product Line Engineering: Foundations, Principles and Techniques*** — Klaus Pohl, Günter Böckle, Frank van der Linden (Springer).
   - **Core Takeaways Applied:** Explicit variability modeling (orthogonal variability models, binding times from scaffold-time to runtime) implemented in `tools/lib/project_loader.mjs`.
4. ***Team Topologies: Organizing Business and Technology Teams for Fast Flow*** (2nd Ed.) — Matthew Skelton & Manuel Pais (IT Revolution).
   - **Core Takeaways Applied:** Mapping our 10 Agent Squads into **Stream-Aligned Squads** (Squad 4 Frontend, Squad 8 CRO/Games), **Platform Squads** (Squad 2 Edge/D1, Squad 7 DevOps/Factory CLI), **Complicated-Subsystem Squads** (Squad 3 Protocols, Squad 5 Motion/Shaders), and **Enabling/Gatekeeper Squads** (Squad 1 Research, Squad 6 5-Gate QA, Squad 9 Meta-Coach/RAG).
5. ***Building Evolutionary Architectures*** (2nd Ed.) — Neal Ford, Rebecca Parsons, Patrick Kua, Pramod Sadalage (O'Reilly).
   - **Core Takeaways Applied:** Architectural **Fitness Functions**—automated, continuous checks (`eval_matrix.mjs`, `constitution_guard.mjs`, `diff_ui_adversarial.mjs`) that prevent architectural degradation as products evolve.

---

## 2. Seminal Papers & Industry Standards (2024–2026)

1. **ISO/IEC 26550** — *Software and systems engineering — Reference model for product line engineering and management*.
   - Defines the formal interface between Domain Engineering (`Studio`) and Application Engineering (`Client Projects`).
2. **Anthropic Engineering (Sep 2025)** — *Effective Context Engineering for AI Agents* & *Building Effective Agents*.
   - Establishes the signal-to-noise maximization law: **Compaction → Structured Disk Memory (`STATE_PACKET.md`, `STATUS.md`, `.specify/`) → Isolated Subagents**.
3. **ICLR 2026 (`ToM-SWE`)** — *Theory-of-Mind Software Engineering Agents*.
   - Models the human CTO's architectural preferences, quality bar, and domain constraints across 3 memory tiers (`tools/intelligence/tom_swe_engine.mjs`).
4. **ThoughtWorks Technology Radar (Vol. 32–34, 2025–2026)** — *Spec-Driven Development (SDD)* & *GitHub `spec-kit`*.
   - Replaces ephemeral conversational prompting ("vibe coding") with executable specification pipelines (`constitution.md` → `spec.md` → `plan.md` → `tasks.md`).

---

## 3. Masterclass Video Courses & Practitioner Talks Synthesized

1. **Dru Knox (Head of Product & Design, Tessl)** — *"Harness Engineering: How to Build a Software Factory"* (`X6l4lpA0_NY`):
   - Why foundation models hit a local maximum without a deterministic **Verification Harness**; separating the **Specification Plane**, **Execution Plane**, and **Verification Plane**.
2. **Zach Lloyd (Founder & CEO, Warp)** — *"Spec-Driven Agentic Development at Scale"*:
   - Decomposing features into explicit Product Specs and Tech Specs (`tools/intelligence/spec_generator.mjs`) before writing a single line of code.
3. **Dexter Horthy (HumanLayer)** — *"12-Factor Agents: Patterns for Reliable LLM Systems"* (`references/software-factory/12-factor-agents`):
   - Factor 3 (*Own Your Context Window*), Factor 7 (*Contact Humans with Structured Gates*), Factor 10 (*Small, Focused Agents*), Factor 12 (*Stateless Reducer / Deterministic State Ledgers*).
4. **Addy Osmani (Google Chrome)** — *"Constraint-Driven Development, Web Quality Skills & Agentic SEO"*:
   - Enforcing numeric quality contracts in `CONSTRAINTS.md`, Core Web Vitals (`LCP`, `INP`, `CLS`), and `llms.txt` / `JSON-LD` discoverability (`tools/audit/floor_and_aeo_guard.mjs`).

---

## 4. Standard Operating Procedure (SOP) to Create Any New Client Website

```powershell
# Step 1: Scaffold the new website from the official template (takes <2 seconds)
node tools/factory.mjs new cliente-inmobiliaria --template astro-edge --archetype marketing --domain https://inmobiliaria.com

# Step 2: Generate Spec-Kit SDD artifacts for the client's first feature
node tools/factory.mjs spec "Catálogo de Propiedades & Contacto" "Grilla filtrable de propiedades con formulario de agendamiento rápido" --project cliente-inmobiliaria

# Step 3: Build production payload with esbuild/Astro + Cloudflare _headers
node tools/factory.mjs build --project cliente-inmobiliaria

# Step 4: Certify 100/100 across all 5 Automated Pre-HITL Quality Gates
node tools/factory.mjs gate --project cliente-inmobiliaria
```

---

## 5. Knowledge Graph Connections (Obsidian)
- [[INDEX]]
- [[CANON_SPLE_ISO26550_AND_SOFTWARE_FACTORIES_ARCHITECTURE_2026]]
- [[CANON_ASTRO5_CLOUDFLARE_WORKERS_AND_MODERN_WEB_TEMPLATES_2026]]
- [[CANON_MULTI_BRAND_DESIGN_SYSTEMS_DTCG_STYLE_DICTIONARY_AND_ARCHETYPES_2026]]
- [[CANON_AI_SOFTWARE_FACTORY_MASTERCLASS_SERIES_2026]]
- #software_factory #architecture_and_books
