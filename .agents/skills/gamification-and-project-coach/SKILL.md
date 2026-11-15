---
name: gamification-and-project-coach
description: Coaches mastery XP gamification, mindful streak pauses, <4KB SVG companion states, and 6 Boss Project rubrics.
---

# Gamification & Boss Project Coach

> **Canon Anchor:** `CANON_ETHICAL_GAMIFICATION_ZERO_COST_TUTOR_AND_PRIVACY_2026` + `academy_project_tracks` SQLite table.

## 1. Ethical Mastery-Driven Progression Rules
1. **Mastery over Passive Clicking:**
   - Keep passive reading modest (`10 XP`); concentrate XP rewards on active recall quizzes (`35 XP`), daily `ts-fsrs` spaced repetition reviews (`30 XP`), critical error audits (`+20 XP`), and Boss Project milestones (`150 XP` per milestone, `450 XP` total).
2. **No Dark Patterns / Mindful Streak Pause:**
   - Support one-click *"Pausa consciente de estudio"* (`streakPausedUntil`) preserving streak progress with zero guilt copy (`zero confirm-shaming`).
3. **Pure Vector Companion (`< 4 KB` SVG, 0 external deps):**
   - Drive lightweight reactive states (`curious`, `thinking`, `celebrating`, `resting`) via CSS custom properties in `OKLCH` and minimal SVG attribute transitions respecting `prefers-reduced-motion: reduce`.
4. **Local-First Sovereignty (Ley 25.326):**
   - Persist all XP, FSRS cards, pauses, and project checklists in browser storage (`IndexedDB`/`localStorage`) with one-click JSON export/import validated by `Valibot` and opt-in public Portfolio cards.

## 2. Guided Coaching Across the 6 Selectable Boss Project Tracks
Load track definitions dynamically from `academy_project_tracks` and tailor prompts to the learner's interest without mandatory paid tools:
1. **`sitio-web`** (*Sitio Web o Portfolio Interactivo* — `crear`)
2. **`bot-automatizado`** (*Bot o Flujo Automatizado Útil* — `cotidiano`)
3. **`animacion-corta`** (*Animación Corta o Pieza Audiovisual* — `crear`)
4. **`comic-digital`** (*Cómic Digital o Narrativa Visual Ilustrada* — `crear`)
5. **`musica-banda-sonora`** (*Música Original o Banda Sonora* — `crear`)
6. **`sistema-profesional`** (*Sistema Profesional para Trabajo o Emprendimiento* — `emprender`)

## 3. Standard 3-Milestone Coaching Rubric per Track
- **Hito 1 (`Acquire`):** Clear goal statement (`<= 60` words) + data privacy boundary check (what stays out of prompts).
- **Hito 2 (`Deepen`):** Working prototype built exclusively with verified `free_no_card` / `open_source_local` tools from `free_tools_stack_json`, plus accessibility check.
- **Hito 3 (`Create`):** Real edge-case test log, factual/human verification note, and exportable Portfolio showcase card highlighting human authorship.

