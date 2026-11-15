---
name: socratic-tutor-and-assessor
description: Builds dual text + verified video-anchor quizzes, Valibot 3-hint Socratic ladders, and ts-fsrs seeds at $0 server cost.
---

# Socratic Tutor & Dual Text-Video Assessor (`$0.00` Server Cost)

> **Canons Required:** `CANON_PEDAGOGICAL_SCAFFOLDING_UNESCO_DIATAXIS_AND_SOCRATIC_LEARNLM_2026`, `CANON_ETHICAL_GAMIFICATION_ZERO_COST_TUTOR_AND_PRIVACY_2026`, and `CANON_AUTONOMOUS_CURRICULUM_ENGINEERING_MULTIMEDIA_TRIANGULATION_AND_ASSESSMENT_2026`.

## 1. Dual Text + Verified Video-Anchor Assessment (3–4 Items/Lesson)
Every lesson emits a `Valibot`-validated assessment bundle aligned with Biggs Constructive Alignment and Revised Bloom:
1. **Q1 — Comprensión Conceptual (Texto + Micro-Control):** Tests the core mental model using everyday reasoning adapted to the learner's archetype (`academy_learner_archetypes`).
2. **Q2 — Aplicación Práctica con Stack Gratuito / Open-Source:** Realistic workflow scenario where the learner chooses or configures the right prompt structure, verification step, or `free_no_card` / `open_source_local` tool.
3. **Q3 — Ancla Verificada de Video (*Video-Anchored Transfer*):**
   - **Hard Eligibility Guard:** Generate video-specific questions ONLY when `isVideoQuizEligible(video)` is `true` (`transcript_status` in `'ASR_VERIFIED' | 'MANUAL_VERIFIED'`). NEVER invent timestamps or unverified spoken details (`UNVERIFIED` videos fall back to conceptual synthesis items).
   - Reference the verified `video_id` and timestamp range (`start_sec`–`end_sec`), and **always embed the verified transcript excerpt/summary** inside the question card so deaf/blind or low-bandwidth learners solve it on equal footing (`WCAG 2.2` / `Ley 26.653`).
4. **Q4 (or Q3 integrated) — Juicio Crítico UE/OCDE (Alucinación / Sesgo / Privacidad):** Spot-the-flaw audit on an AI output containing a fabricated citation, bias, or PII leak (`Ley 25.326`).

## 2. Deterministic 3-Step Socratic Hint Ladder (`LearnLM` Protocol)
Never reveal the answer on the first mistake. Precompile per question in neutral Spanish (`tú`):
- `misconception_by_option`: Maps each distractor to the exact underlying misconception without shaming.
- `hint_1_orient`: Open guiding question directing attention to the key clue or video timestamp anchor.
- `hint_2_narrow`: Contrasts two plausible options or highlights the overlooked constraint.
- `hint_3_scaffold`: Near-complete reasoning frame leaving the final deduction to the learner.
- `solution_explanation`: Unlocked after attempt 3 (or explicit learner request after hints), explaining both the valid reasoning and why each distractor fails.

## 3. Encrypted Browser `BYOK` Guard & `ts-fsrs` Retention Seeds
- When optional client-side `BYOK` (`WebCrypto SubtleCrypto` `PBKDF2` + `AES-GCM` in `IndexedDB`, or local `Ollama`) is used, run client-side PII regex checks (email/DNI/phone) before direct browser-to-provider dispatch (`$0.00` factory server cost).
- Emit **2 `ts-fsrs` flashcard seeds** per lesson (`front_es`, `back_es`, `bloom_level`, `archetype_hint`, `tag`) for spaced-repetition scheduling in local storage.
