-- Academia Libre — Canonical Cloudflare D1 & Local node:sqlite Core Schema
-- Zero sequential primary keys (all keys use opaque CSPRNG UUIDv4 / ULID text tokens).

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  email_ciphertext TEXT NOT NULL,
  email_blind_index TEXT NOT NULL UNIQUE,
  avatar_key TEXT,
  xp_total INTEGER NOT NULL DEFAULT 0 CHECK (xp_total >= 0),
  current_level INTEGER NOT NULL DEFAULT 1 CHECK (current_level IN (1, 2, 3)),
  active_path_id TEXT NOT NULL DEFAULT 'uso_cotidiano' CHECK (
    active_path_id IN (
      'uso_cotidiano',
      'trabajo_emprendimiento',
      'web_productos',
      'bots_automatizacion',
      'multimedia_creativa'
    )
  ),
  hardware_archetype_id TEXT NOT NULL DEFAULT 'pc_basica_zero_cost' CHECK (
    hardware_archetype_id IN (
      'pc_basica_zero_cost',
      'pc_media_hybrid_free',
      'gpu_local_sovereign',
      'creador_multimedia_oss'
    )
  ),
  linkedin_handle TEXT,
  x_handle TEXT,
  onboarding_completed INTEGER NOT NULL DEFAULT 0 CHECK (onboarding_completed IN (0, 1)),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
) STRICT;

CREATE TABLE IF NOT EXISTS oauth_accounts (
  provider TEXT NOT NULL CHECK (provider IN ('google', 'github')),
  provider_user_id TEXT NOT NULL,
  provider_login TEXT,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL,
  PRIMARY KEY (provider, provider_user_id),
  UNIQUE (user_id, provider)
) STRICT;

CREATE INDEX IF NOT EXISTS idx_oauth_accounts_user_id ON oauth_accounts(user_id);

CREATE TABLE IF NOT EXISTS sessions (
  token_sha256 TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL
) STRICT;

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);

CREATE TABLE IF NOT EXISTS lesson_progress_ledger (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('read', 'quiz', 'fsrs', 'audit')),
  xp_awarded INTEGER NOT NULL CHECK (xp_awarded >= 0 AND xp_awarded <= 500),
  score_json TEXT NOT NULL DEFAULT '{}',
  completed_at TEXT NOT NULL,
  UNIQUE (user_id, lesson_id, event_type)
) STRICT;

CREATE INDEX IF NOT EXISTS idx_lesson_ledger_user_id ON lesson_progress_ledger(user_id);

CREATE TABLE IF NOT EXISTS project_milestones (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  path_id TEXT NOT NULL CHECK (
    path_id IN (
      'uso_cotidiano',
      'trabajo_emprendimiento',
      'web_productos',
      'bots_automatizacion',
      'multimedia_creativa'
    )
  ),
  milestone_index INTEGER NOT NULL CHECK (milestone_index IN (1, 2, 3)),
  github_repo_url TEXT,
  commit_sha TEXT,
  xp_awarded INTEGER NOT NULL CHECK (xp_awarded >= 0 AND xp_awarded <= 1000),
  verified_at TEXT NOT NULL,
  UNIQUE (user_id, path_id, milestone_index)
) STRICT;

CREATE INDEX IF NOT EXISTS idx_project_milestones_user_id ON project_milestones(user_id);

CREATE TABLE IF NOT EXISTS certificates (
  cert_code TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recipient_name TEXT NOT NULL,
  level INTEGER NOT NULL CHECK (level IN (1, 2, 3)),
  path_id TEXT NOT NULL CHECK (
    path_id IN (
      'uso_cotidiano',
      'trabajo_emprendimiento',
      'web_productos',
      'bots_automatizacion',
      'multimedia_creativa'
    )
  ),
  github_repo_url TEXT,
  payload_json TEXT NOT NULL,
  ed25519_signature TEXT NOT NULL,
  issued_at TEXT NOT NULL,
  UNIQUE (user_id, level, path_id)
) STRICT;

CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON certificates(user_id);
