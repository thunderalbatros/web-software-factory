---
name: explorable-lesson-author
description: Authors neutral-Spanish lessons (<=110 words, readability_es), 2-3 triangulated videos, OSS tools, and archetype tabs.
---

# Explorable Lesson Author (Brilliant + Stripe + Distill Standard)

> **Canons Required:** `CANON_PEDAGOGICAL_SCAFFOLDING_UNESCO_DIATAXIS_AND_SOCRATIC_LEARNLM_2026`, `CANON_INCLUSIVE_MINIMALIST_UX_BRILLIANT_STRIPE_AND_DISTILL_2026`, and `CANON_AUTONOMOUS_CURRICULUM_ENGINEERING_MULTIMEDIA_TRIANGULATION_AND_ASSESSMENT_2026`.

## 1. Editorial & Readability Rules (`tools/audit/readability_es.mjs`)
1. **International Neutral Spanish (`tú`):** Warm, clear, respectful `tú` (*"observa"*, *"puedes probar"*, *"fíjate"*). Zero accidental Rioplatense `voseo` (*tenés, podés, fijate, usá*) in lesson prose.
2. **3-Step Jargon Introduction & `introduced_terms`:**
   - In Level 1 (`Acquire`), never introduce technical terms without: (1) everyday analogy, (2) plain-Spanish explanation, and (3) technical term in parentheses.
   - Declare newly taught terms in YAML frontmatter `introduced_terms: [...]` so Levels 2 (`Deepen`) and 3 (`Create`) pass `readability_es.mjs` (`INFLESZ >= 55` L1, `>= 45` L2, `>= 40` L3).
3. **Sweller Cognitive Load Cap:**
   - Maximum **3 new concepts** per lesson and **zero continuous paragraphs `> 110` words**.
   - Apply worked-example fading: annotated example -> guided fill-in -> autonomous prompt/workflow exercise.

## 2. Canonical 5-Beat Multimodal Lesson Structure
1. **Tiempo 1 — Gancho Cotidiano y Selector de Arquetipo (`<= 60` palabras):**
   - Concrete relatable problem plus lightweight tabs adapting the scenario to the 4 `academy_learner_archetypes` (`ciudadano-cotidiano`, `estudiante-profesional`, `creador-maker`, `desarrollador-builder`).
2. **Tiempo 2 — Idea Clave + Micro-Control Interactivo (Estilo Stripe / Brilliant):**
   - Side-by-side (`1440px`) / stacked (`390px`) pure `Vanilla ESM` + `OKLCH` + SVG/HTML interactive control (`>= 44x44px` touch targets, keyboard operable, `prefers-reduced-motion: reduce`, `0px` horizontal overflow).
3. **Tiempo 3 — Triangulación de `2` a `3` Videos Complementarios + Equivalente Accesible:**
   - Render 2–3 non-redundant videos (`intuicion_visual`, `demostracion_practica`, `caso_critico_o_comparativa`) via `lite-youtube-embed` (`youtube-nocookie.com`), each paired with a 3-bullet accessible text synthesis and timestamped conceptual anchors (`WCAG 2.2` / `Ley 26.653`).
4. **Tiempo 4 — Práctica Guiada con Stack Open-Source / Sin Tarjeta:**
   - Reproducible exercise powered by stage-appropriate `open_source_local` or `free_no_card` tools from `academy_tools`, including an explicit PII redaction reminder (`Ley 25.326`).
5. **Tiempo 5 — Evaluación Dual Socrática (`0 ms` cliente):**
   - Mounts the precompiled `Valibot`-validated quiz bundle from `socratic-tutor-and-assessor`.

## 3. Technical & Visual Hygiene
- Enforce `W3C DTCG 2025.10` `OKLCH 90/8/2` tokens, `APCA` (`Lc >= 75` body), Utopia `clamp()`, `CLS = 0.00`, and verify every `.md`/`.mdx` file with `node tools/audit/readability_es.mjs --file <path> --level <1|2|3>`.
