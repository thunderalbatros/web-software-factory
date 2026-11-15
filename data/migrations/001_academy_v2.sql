-- =============================================================================
-- Academia IA — data/academy.sqlite schema v2 (target PRAGMA user_version = 2)
-- Source of truth: data/academy/*.json (versioned in Git). This SQLite file is a
-- derived, regenerable artifact (ignored by Git). Applied by
-- tools/intelligence/academy_store.mjs#runAcademyMigrations inside one transaction.
-- =============================================================================

CREATE TABLE IF NOT EXISTS academy_sources (
  source_id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  authors TEXT NOT NULL DEFAULT '',
  url TEXT NOT NULL DEFAULT '' CHECK (url = '' OR url LIKE 'https://%'),
  license TEXT NOT NULL CHECK (license IN ('MIT','Apache-2.0','CC-BY-4.0','CC-BY-SA-4.0','CC-BY-NC-4.0','CC-BY-NC-SA-4.0','CLEAN_ROOM_ONLY')),
  usage_policy TEXT NOT NULL CHECK (usage_policy IN ('DIRECT_ADAPT_TRANSLATE','CLEAN_ROOM_FACTS_ONLY')),
  authority_tier TEXT NOT NULL CHECK (authority_tier IN ('GOLD','SILVER')),
  published_at TEXT NOT NULL DEFAULT '',
  verified_http_status INTEGER NOT NULL DEFAULT 0 CHECK (verified_http_status BETWEEN 0 AND 599),
  verified_at TEXT NOT NULL DEFAULT '',
  commercial_use_allowed INTEGER NOT NULL DEFAULT 0 CHECK (commercial_use_allowed IN (0, 1)),
  derivative_license_required TEXT NOT NULL DEFAULT 'CLEAN_ROOM_ORIGINAL'
    CHECK (derivative_license_required IN ('CC-BY-NC-SA-4.0','CC-BY-SA-4.0','CLEAN_ROOM_ORIGINAL')),
  CHECK (license != 'CLEAN_ROOM_ONLY' OR usage_policy = 'CLEAN_ROOM_FACTS_ONLY')
);
CREATE INDEX IF NOT EXISTS idx_academy_sources_license ON academy_sources(license, usage_policy);
CREATE INDEX IF NOT EXISTS idx_academy_sources_tier ON academy_sources(authority_tier);

CREATE TABLE IF NOT EXISTS academy_videos (
  video_id TEXT PRIMARY KEY,
  source_platform TEXT NOT NULL CHECK (source_platform IN ('youtube','archive_org','wikimedia')),
  youtube_id TEXT UNIQUE,
  external_video_url TEXT CHECK (external_video_url IS NULL OR external_video_url LIKE 'https://%'),
  title TEXT NOT NULL,
  channel_title TEXT NOT NULL DEFAULT '',
  duration_iso TEXT NOT NULL DEFAULT '',
  embeddable INTEGER NOT NULL DEFAULT 1 CHECK (embeddable IN (0, 1)),
  caption_mode TEXT NOT NULL CHECK (caption_mode IN ('audio_es','sub_es_nativo','sub_es_autotraducido')),
  topic_tags TEXT NOT NULL DEFAULT '[]',
  license TEXT NOT NULL,
  pedagogical_role TEXT NOT NULL CHECK (pedagogical_role IN ('conceptual_anchor','practical_walkthrough','deep_dive_case')),
  transcript_anchors_json TEXT NOT NULL DEFAULT '[]',
  anchors_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (anchors_status IN ('pending','oer_transcript_verified','multimodal_verified','human_verified')),
  verified_at TEXT NOT NULL DEFAULT '',
  CHECK (
    (source_platform = 'youtube' AND youtube_id IS NOT NULL AND length(youtube_id) = 11)
    OR (source_platform != 'youtube' AND external_video_url IS NOT NULL)
  )
);
CREATE INDEX IF NOT EXISTS idx_academy_videos_platform ON academy_videos(source_platform, embeddable);
CREATE INDEX IF NOT EXISTS idx_academy_videos_anchors ON academy_videos(anchors_status);

CREATE TABLE IF NOT EXISTS academy_tools (
  tool_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  official_url TEXT NOT NULL CHECK (official_url LIKE 'https://%'),
  pricing_tier TEXT NOT NULL CHECK (pricing_tier IN ('free_no_card','open_source_local','freemium_capped','paid_pro_reference')),
  free_alternative_id TEXT REFERENCES academy_tools(tool_id) DEFERRABLE INITIALLY DEFERRED,
  when_to_pay_verdict_es TEXT NOT NULL DEFAULT '',
  quota_notes_es TEXT NOT NULL DEFAULT '',
  privacy_opt_out_steps_es TEXT NOT NULL DEFAULT '',
  skill_tree_tags TEXT NOT NULL DEFAULT '',
  professions_tags TEXT NOT NULL DEFAULT '',
  http_status INTEGER NOT NULL DEFAULT 0 CHECK (http_status BETWEEN 0 AND 599),
  last_checked_at TEXT NOT NULL DEFAULT '',
  is_open_source INTEGER NOT NULL DEFAULT 0 CHECK (is_open_source IN (0, 1)),
  spdx_license TEXT NOT NULL DEFAULT '',
  min_hardware_tier TEXT NOT NULL DEFAULT 'basic_cpu_cloud' CHECK (min_hardware_tier IN ('basic_cpu_cloud','mid_16gb','local_gpu')),
  domain_stage_tags TEXT NOT NULL DEFAULT '[]',
  repo_or_docs_url TEXT NOT NULL DEFAULT '' CHECK (repo_or_docs_url = '' OR repo_or_docs_url LIKE 'https://%'),
  CHECK (pricing_tier != 'paid_pro_reference' OR free_alternative_id IS NOT NULL),
  CHECK (free_alternative_id IS NULL OR free_alternative_id != tool_id)
);
CREATE INDEX IF NOT EXISTS idx_academy_tools_pricing ON academy_tools(pricing_tier);
CREATE INDEX IF NOT EXISTS idx_academy_tools_free_alt ON academy_tools(free_alternative_id);

CREATE TABLE IF NOT EXISTS academy_learner_archetypes (
  archetype_id TEXT PRIMARY KEY,
  title_es TEXT NOT NULL,
  hardware_tier TEXT NOT NULL CHECK (hardware_tier IN ('basic_cpu_cloud','mid_16gb','local_gpu')),
  budget_mode TEXT NOT NULL CHECK (budget_mode IN ('zero_cost','hybrid_free_tiers','self_hosted_local')),
  goal_category TEXT NOT NULL CHECK (goal_category IN ('cotidiano','trabajo','crear','emprender')),
  recommended_oss_stack_json TEXT NOT NULL DEFAULT '[]',
  cloud_sandbox_fallbacks_json TEXT NOT NULL DEFAULT '[]',
  notes_es TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS academy_project_tracks (
  track_id TEXT PRIMARY KEY,
  title_es TEXT NOT NULL,
  skill_tree TEXT NOT NULL CHECK (skill_tree IN ('cotidiano','trabajo','crear','emprender')),
  free_tools_stack_json TEXT NOT NULL DEFAULT '[]',
  pro_tools_optional_json TEXT NOT NULL DEFAULT '[]',
  milestone_rubric_json TEXT NOT NULL DEFAULT '[]'
);
CREATE INDEX IF NOT EXISTS idx_academy_tracks_skill_tree ON academy_project_tracks(skill_tree);

