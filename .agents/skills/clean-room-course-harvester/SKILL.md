---
name: clean-room-course-harvester
description: Extracts clean-room knowledge cards honoring MIT/CC licenses and multi-brand free vs paid tool neutrality.
---

# Clean-Room Course & Tool Harvester

> **Data Store:** `.cache/omni_rag_fts5.sqlite` relational tables (`academy_sources`, `academy_videos`, `academy_tools`).
> **Vertex Batch Policy:** Always send repeatable classification/extraction batches via `submitAndPollVertexBatchJob` (`50%` discount + SHA-256 idempotency cache).

## 1. Strict License & Usage Policy Enforcement (`academy_sources`)
Before ingesting any external course, syllabus, paper, or documentation page:
1. Record verified metadata in `academy_sources` via `upsertAcademySource(...)`:
   - `license` MUST be one of: `MIT`, `Apache-2.0`, `CC-BY-4.0`, `CC-BY-SA-4.0`, `CC-BY-NC-4.0`, `CC-BY-NC-SA-4.0`, `CLEAN_ROOM_ONLY`.
   - Set `usage_policy = 'DIRECT_ADAPT_TRANSLATE'` ONLY when permissive/open license allows adaptation with attribution (`MIT`, `Apache-2.0`, `CC-BY*`, respecting `NC`/`SA` propagation notes).
   - Set `usage_policy = 'CLEAN_ROOM_FACTS_ONLY'` for all proprietary, commercial, or ambiguous terms-of-service sites (`CLEAN_ROOM_ONLY`). Never copy prose, examples, slide ordering verbatim, or screenshots from `CLEAN_ROOM_ONLY` sources; extract factual/structural concepts into neutral intermediate cards (`cards/*.json`) and synthesize original Spanish explanations from scratch.
2. Verify HTTP reachability (`verified_http_status = 200`) before admitting any citation link into lesson builds.

## 2. Curated Video Verification (`academy_videos`)
- Query YouTube Data API (`YOUTUBE_API_KEY`) strictly within quota limits; inspect `status.embeddable` and captions before calling `upsertAcademyVideo(...)`.
- Accept ONLY `embeddable = 1` videos cleanly matching `caption_mode` (`'audio_es' | 'sub_es_nativo' | 'sub_es_autotraducido'`).
- Prefer concise focused explanations (`PT2M`–`PT12M`) and prepare a 3-bullet accessible fallback summary for every video.

## 3. Multi-Brand Tool Neutrality (`academy_tools`)
When documenting AI tools, never recommend one vendor as mandatory without alternatives:
1. Assign accurate `pricing_tier`: `'free_no_card' | 'open_source_local' | 'freemium_capped' | 'paid_pro_reference'`.
2. **Mandatory Neutrality Rule:** Every tool with `pricing_tier = 'paid_pro_reference'` or tight `'freemium_capped'` MUST point via `free_alternative_id` to an active `'free_no_card'` or `'open_source_local'` alternative in `academy_tools`.
3. Fill every record in neutral Spanish (`tú`) with:
   - `when_to_pay_verdict_es`: Honest threshold answering *"¿Cuándo vale la pena pagar y cuándo basta lo gratuito?"*.
   - `quota_notes_es`: Daily/monthly free quota limits observed with date.
   - `privacy_opt_out_steps_es`: Concrete UI steps to disable model training on user chats/files.
   - `http_status`: Verified URL status (`200`).

