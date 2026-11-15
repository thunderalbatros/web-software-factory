---
name: gamification-and-project-coach
description: Coaches ethical mastery XP, mindful pauses, <4KB SVG companion, and 6 Boss Projects across 4 learner archetypes.
---

# Ethical Gamification & Boss Project Coach

> **Canons Required:** `CANON_ETHICAL_GAMIFICATION_ZERO_COST_TUTOR_AND_PRIVACY_2026` and `CANON_AUTONOMOUS_CURRICULUM_ENGINEERING_MULTIMEDIA_TRIANGULATION_AND_ASSESSMENT_2026`, backed by `data/academy.sqlite` (`academy_project_tracks`, `academy_learner_archetypes`).

## 1. Self-Determination Theory (`SDT`) Progression & Zero Dark Patterns
1. **Mastery XP Over Passive Clicking:**
   - Reward genuine cognitive effort: passive lesson completion (`10 XP`), dual text/video application quiz (`35 XP`), `ts-fsrs` spaced-repetition review (`30 XP`), hallucination/privacy audit catch (`+20 XP`), and Boss Project milestones (`150 XP` x 3 = `450 XP`).
2. **Mindful Study Pause & Zero Confirm-Shaming:**
   - Provide one-click *"Pausa consciente de estudio"* (`streakPausedUntil`) with encouraging neutral-Spanish (`tú`) microcopy, zero punitive countdowns, and zero paywalls.
3. **Pure Vector Companion (`< 4 KB` SVG, 0 Heavy Runtimes):**
   - Render reactive states (`curious`, `thinking`, `celebrating`, `resting`) via semantic SVG + `OKLCH` CSS tokens honoring `prefers-reduced-motion: reduce`.
4. **Local-First Data Sovereignty (`Ley 25.326`):**
   - Store XP, skill-constellation nodes, `ts-fsrs` decks, selected `archetype_id`, and Boss Project rubrics locally (`IndexedDB`/`localStorage`) with 1-click `.json` export/restore validated by `Valibot` and strictly opt-in portfolio publishing with PII stripping.

## 2. 6 Boss Project Tracks Adapted to the 4 `academy_learner_archetypes`
Load tracks from `academy_project_tracks` (`sitio-web`, `bot-automatizado`, `animacion-corta`, `comic-digital`, `musica-banda-sonora`, `sistema-profesional`) and tailor coaching briefs to the learner's archetype:
- **`ciudadano-cotidiano`:** Personal/family organizer, study assistant, or illustrated story using `free_no_card` web tools (`LibreChat`, `Whisper Web`, `Stirling-PDF`).
- **`estudiante-profesional`:** Research synthesizer, SOP workflow, or KPI brief using `Khoj`, `AnythingLLM`, `Penpot`, and citation checks.
- **`creador-maker`:** Short animation, digital comic, soundtrack, or interactive portfolio using `ComfyUI`, `Upscayl`, `Audacity`, and `Astro`.
- **`desarrollador-builder`:** Local/edge RAG agent, `n8n`/`Activepieces` pipeline, or `Cloudflare Workers` + `Valibot` + `Promptfoo` evaluated app.

## 3. 3-Milestone Constructive Alignment Rubric (`Acquire -> Deepen -> Create`)
- **Hito 1 (`Acquire`):** Problem statement (`<= 60` words), target user, and explicit privacy boundary checklist.
- **Hito 2 (`Deepen`):** Reproducible prototype built with stage-appropriate Open-Source / `free_no_card` tools plus WCAG `2.2` accessibility check.
- **Hito 3 (`Create`):** Adversarial/edge-case test log, human verification sign-off, and exportable Portfolio credential card.
