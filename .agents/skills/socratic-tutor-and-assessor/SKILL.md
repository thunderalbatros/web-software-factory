---
name: socratic-tutor-and-assessor
description: Builds 3-question Bloom micro-exams, Valibot 3-hint Socratic JSON ladders, and ts-fsrs review seeds at $0 cost.
---

# Socratic Tutor & Zero-Cost Assessor

> **Canons Required:** `CANON_PEDAGOGICAL_SCAFFOLDING_UNESCO_DIATAXIS_AND_SOCRATIC_LEARNLM_2026` + `CANON_ETHICAL_GAMIFICATION_ZERO_COST_TUTOR_AND_PRIVACY_2026`.

## 1. Per-Lesson 3-Question Micro-Exam (Revised Bloom)
Every lesson must emit exactly **3 high-signal assessment items** (no trivia memorization):
1. **Q1 — Recuerdo y Comprensión Conceptual:** Verifies the core mental model in everyday language (or asks which analogy best fits how a language model / context window behaves).
2. **Q2 — Aplicación en Escenario Real:** Presents a realistic daily, study, or work situation where the learner selects or adjusts the right prompt constraint, workflow step, or free tool choice.
3. **Q3 — Juicio Crítico UE/OCDE (Verificación / Sesgo / Privacidad):** Presents an AI output containing a subtle hallucinated citation, hidden bias, or leaked personal datum and asks the learner to spot the flaw and choose the safe human action.

## 2. Deterministic 3-Step Socratic Ladder JSON (`$0.00` Server Cost)
Never reveal the correct answer on the learner's first mistake. Precompile at build time (and validate via `Valibot`) a diagnostic JSON object per question:
- **`misconception_by_option`:** Maps every incorrect option/pattern to a clear explanation of the faulty assumption in neutral Spanish (`tú`).
- **`hint_1_orient`:** Conceptual guiding question nudging attention toward the key clue without giving away options.
- **`hint_2_narrow`:** Narrows the problem space by contrasting two candidates or flagging what constraint was missed.
- **`hint_3_scaffold`:** Provides a near-complete reasoning skeleton leaving only the final decision for the learner.
- **`solution_explanation`:** Shown ONLY after attempt 3 (or explicit user reveal after hints), explaining why the solution holds and why distractors fail.

## 3. Optional Encrypted BYOK Bridge + `ts-fsrs` Review Seeds
- Whenever free-text Socratic follow-up is enabled via BYOK (`IndexedDB` + `WebCrypto AES-GCM`), prepend a deterministic client privacy check warning if email/ID/phone patterns appear before calling the user's selected API directly from the browser.
- Export **2 `ts-fsrs` flashcard seeds** per lesson (`front_es`, `back_es`, `bloom_level`, `tag`) compatible with `ts-fsrs` card initialization (`createEmptyCard()` / `Rating` scheduling in local storage) for long-term retention reviews.

