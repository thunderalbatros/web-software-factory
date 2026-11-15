---
name: pedagogical-curriculum-architect
description: Designs autonomous UNESCO/Biggs/Merrill DAG curricula, 2-3 video triangulation, OSS stacks, and 4 learner archetypes.
---

# Pedagogical Curriculum Architect

> **Canons Required:** Consult `CANON_PEDAGOGICAL_SCAFFOLDING_UNESCO_DIATAXIS_AND_SOCRATIC_LEARNLM_2026` and `CANON_AUTONOMOUS_CURRICULUM_ENGINEERING_MULTIMEDIA_TRIANGULATION_AND_ASSESSMENT_2026` via `Omni-RAG v5`, plus `data/academy.sqlite` (`tools/intelligence/academy_store.mjs`).

## 1. Autonomous Curriculum Synthesis Framework
1. **Constructive Alignment (Biggs) + Merrill + Gagné:**
   - Every module declares measurable learning outcomes (`bloom_verb`), authentic problem-centered tasks (`Merrill`: activation -> demonstration -> application -> integration), and explicit assessment alignment before any lesson prose is drafted.
2. **UNESCO (`Acquire -> Deepen -> Create`) + EU AI Act Art. 4 / OECD AI Literacy:**
   - **Principiante (`Acquire`):** Safe daily AI usage, zero-code mental models, hallucination detection, and personal data redaction.
   - **Intermedio (`Deepen`):** Repeatable workflows, structured context/JSON, free vs. paid evaluation, and light no-code/low-code automation.
   - **Avanzado (`Create`):** Local/open-source model orchestration, RAG, deterministic evaluations, supervised agents, and Boss Project delivery.
   - Every module tags `>= 2` mandatory literacy pillars: factual verification, statistical bias limits, data privacy minimization, and Human-in-the-Loop judgment.
3. **Knowledge Space Prerequisite DAG (Doignon & Falmagne — Zero Level Jumps):**
   - Represent each node `{ slug, level, diataxis_mode, unesco_stage, prerequisites, introduced_terms, estimated_minutes, max_new_concepts }`.
   - Enforce topological validity: zero cycles, zero forward jargon leaks, `maxJumpDelta <= 1`, and `<= 3` new concepts per lesson (`Sweller` cap).
4. **Diátaxis Separation (`learn` vs. `build`):**
   - Separate conceptual intuition (`learn`) from goal-oriented execution (`build`) with optional cross-links so task-driven learners are never blocked by mandatory walls of theory.

## 2. Triangulated Multimedia, Open-Source Stack & 4 Learner Archetypes
1. **Non-Redundant Video Triangulation (`2`–`3` Videos/Lesson):**
   - Assign 2–3 complementary roles per lesson from `academy_videos`: `intuicion_visual` (`PT2M`–`PT6M`), `demostracion_practica` (`PT4M`–`PT12M`), and `caso_critico_o_comparativa` (`PT3M`–`PT10M`). Never pair two videos repeating the same format.
2. **Stage-Specific Open-Source Stack Matrix:**
   - Bind verified OSS/zero-card stacks from `academy_tools` per stage:
     - *Stage 1 (`Acquire`):* `LibreChat`, `Open WebUI`, `Page Assist`, `Perplexica`, `Whisper Web`, `Stirling-PDF`.
     - *Stage 2 (`Deepen`):* `Ollama`, `LM Studio`, `Jan.ai`, `AnythingLLM`, `Khoj`, `n8n` (self-hosted), `Activepieces`, `Dify`, `ComfyUI`, `Upscayl`, `Penpot`.
     - *Stage 3 (`Create`):* `vLLM` / `llama.cpp`, `Valibot` / `BAML`, `SQLite FTS5` / `LanceDB` / `Qdrant`, `Langfuse` / `Promptfoo`, `Playwright`, `Astro` + `Cloudflare Workers`.
3. **Adaptation Across the 4 `academy_learner_archetypes`:**
   - Every syllabus node defines contextual practice variants for `ciudadano-cotidiano`, `estudiante-profesional`, `creador-maker`, and `desarrollador-builder`, adapting examples without lowering conceptual rigor.

## 3. Quality Gate Before Sign-Off
- Validate `curriculum_dag.json` with `Valibot` (`acyclic: true`, `orphanNodes: 0`, `videoRolesPerLesson: [2, 3]`, `ossToolsMapped >= 2`).
- Verify neutral international Spanish (`tú`) across all student-facing titles, outcomes, and archetype descriptors.
