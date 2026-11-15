---
name: clean-room-course-harvester
description: Curates clean-room sources, 2-3 triangulated videos with transcript anchors, and OSS/free tools in data/academy.sqlite.
---

# Clean-Room Course, Video Triangulation & Open-Source Harvester

> **Canonical Store:** `data/academy.sqlite` + versioned seeds `data/academy/*.json` via `tools/intelligence/academy_store.mjs` (`complianceProfile: 'education'`).
> **Vertex Batch Policy:** Run repeatable classification/extraction batches via `submitAndPollVertexBatchJob` (`location: 'global'`, `50%` batch discount + SHA-256 cache).

## 1. License & Clean-Room Governance (`academy_sources`)
1. Record every reference via `upsertAcademySource(...)` before extracting knowledge:
   - Allowed `license`: `MIT`, `Apache-2.0`, `CC-BY-4.0`, `CC-BY-SA-4.0`, `CC-BY-NC-4.0`, `CC-BY-NC-SA-4.0`, `CLEAN_ROOM_ONLY`.
   - `usage_policy = 'DIRECT_ADAPT_TRANSLATE'` ONLY when permissive/open licenses explicitly allow adaptation with attribution.
   - `usage_policy = 'CLEAN_ROOM_FACTS_ONLY'` for proprietary or restricted courses (`CLEAN_ROOM_ONLY`): extract only atomic facts and prerequisite graphs into clean-room JSON cards (`cards/*.json`), writing 100% original neutral-Spanish (`tú`) explanations and examples.
2. Verify live HTTP reachability (`verified_http_status = 200`) and keep external harvested markdown classified as `TIER_UNTRUSTED` (`0.75x`) until curated and verified.

## 2. Non-Redundant Video Triangulation & Transcript Verification (`academy_videos`)
1. Curate **2 to 3 complementary videos per lesson** (`embeddable = 1`, `youtube-nocookie.com`) covering distinct pedagogical angles:
   - Role A: `intuicion_visual` (conceptual mental model / animation, `PT2M`–`PT6M`).
   - Role B: `demostracion_practica` (hands-on workflow with free/OSS tools, `PT4M`–`PT12M`).
   - Role C: `caso_critico_o_comparativa` (limitations, failure modes, or free vs. paid trade-offs, `PT3M`–`PT10M`).
2. **Transcript Provenance Gate (`transcript_status`):**
   - Tag every video strictly as `'ASR_VERIFIED'`, `'MANUAL_VERIFIED'`, or `'UNVERIFIED'`.
   - Store timestamped anchor segments (`start_sec`, `end_sec`, `summary_es`) ONLY when verified against real captions (`ASR_VERIFIED` / `MANUAL_VERIFIED`), unlocking `isVideoQuizEligible()` for dual assessment.
   - Always include a 3-bullet accessible text summary (`WCAG 2.2` / `Ley 26.653`).

## 3. Open-Source & Zero-Card Tool Matrix (`academy_tools` + `academy_learner_archetypes`)
1. Maintain stage-specific Open-Source (`open_source_local`) and zero-card (`free_no_card`) stacks across `Acquire`, `Deepen`, and `Create` alongside commercial references (`freemium_capped`, `paid_pro_reference`).
2. **Mandatory Neutrality Rule:** Every `paid_pro_reference` or tight `freemium_capped` tool MUST reference an active `free_no_card` or `open_source_local` alternative via `free_alternative_id`.
3. Populate in neutral Spanish (`tú`): `when_to_pay_verdict_es`, `quota_notes_es`, `privacy_opt_out_steps_es`, `http_status = 200`, and relevance tags for the 4 `academy_learner_archetypes` (`ciudadano-cotidiano`, `estudiante-profesional`, `creador-maker`, `desarrollador-builder`).
