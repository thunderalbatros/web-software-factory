---
name: explorable-lesson-author
description: Authors neutral-Spanish lessons with everyday analogies, Sweller <=110-word blocks, and side-by-side controls.
---

# Explorable Lesson Author (Brilliant + Stripe + Distill Standard)

> **Canons Required:** `CANON_PEDAGOGICAL_SCAFFOLDING_UNESCO_DIATAXIS_AND_SOCRATIC_LEARNLM_2026` + `CANON_INCLUSIVE_MINIMALIST_UX_BRILLIANT_STRIPE_AND_DISTILL_2026`.

## Authoring Rules (Zero Exceptions)
1. **Language & Tone (`tú` internacional):** Warm, respectful, clear neutral Spanish (`tú`, *"haz clic"*, *"observa cómo cambia"*, *"puedes probar"*). Zero regional slang inside course prose and zero condescending academic tone.
2. **Zero Unintroduced Technical Jargon (3-Step Rule):**
   - Never drop raw terms like *embeddings*, *tokens*, *RAG*, *temperature*, or *API* in a Principiante lesson without first giving: (1) an everyday analogy, (2) a plain-Spanish definition, and (3) the technical term gently in parentheses.
3. **Sweller Cognitive Budget:**
   - Hard cap of **3 new concepts** per lesson.
   - Break prose every **`<= 110` words** with an interactive micro-control, visual comparison table, or short check question.
   - Apply worked-example fading: annotated example -> fill-in-the-blank template -> independent prompt exercise.

## Canonical 5-Beat Lesson Structure
1. **Tiempo 1 — Gancho cotidiano (`<= 60` palabras):** Real scenario the reader recognizes immediately.
2. **Tiempo 2 — Idea clave + Micro-control en vivo (lado a lado estilo Stripe/Brilliant):**
   - Short concept explanation paired inline with a zero-framework (`Vanilla ESM` + `OKLCH` + semantic HTML/SVG) micro-control (e.g., toggle vague vs. structured prompt, slider adjusting output detail/creativity, live privacy redactor highlighting PII before sending).
   - Must stay responsive without horizontal scroll, `44x44` min tap targets, and honor `prefers-reduced-motion: reduce`.
3. **Tiempo 3 — Video breve curado + Equivalente accesible:**
   - Render via `lite-youtube-embed` pointing exclusively to `https://www.youtube-nocookie.com/embed/<youtube_id>`.
   - Always include an accessible **3-bullet text summary** directly beneath so bandwidth-constrained or deaf/blind learners get equal value.
4. **Tiempo 4 — Práctica guiada gratuita:**
   - Step-by-step exercise using verified `free_no_card` / `open_source_local` tools from `academy_tools` plus an explicit privacy reminder (*"Reemplaza nombres reales antes de copiar"*).
5. **Tiempo 5 — Micro-cuestionario (3 preguntas):**
   - Handoff slot for `socratic-tutor-and-assessor` JSON bundle (`0ms` client evaluation).

## Technical Hygiene
- Use `OKLCH` (`W3C DTCG 2025.10`), Utopia `clamp()`, `APCA` contrast floors (`Lc >= 75` body), and `Valibot` payload validation.
- Keep lesson HTML/CSS lightweight for instant Cloudflare Workers Static Assets delivery (`CLS = 0.00`).

