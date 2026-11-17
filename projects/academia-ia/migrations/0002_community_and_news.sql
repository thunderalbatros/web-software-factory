-- Academia Libre — Stage 3C.4-C Community Forum, Level Chat Rooms, Moderation & Anti-Abuse Reports
-- Strictly opaque TEXT primary keys (UUIDv4 / ULID), STRICT tables, and CASCADE deletion for Ley 25.326.

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS forum_threads (
  id TEXT PRIMARY KEY,
  author_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  level INTEGER NOT NULL CHECK (level IN (1, 2, 3)),
  category TEXT NOT NULL CHECK (category IN ('ideas', 'proyectos', 'repositorios', 'consejos', 'novedades')),
  path_id TEXT NOT NULL DEFAULT 'uso_cotidiano' CHECK (
    path_id IN (
      'uso_cotidiano',
      'trabajo_emprendimiento',
      'web_productos',
      'bots_automatizacion',
      'multimedia_creativa'
    )
  ),
  lesson_slug TEXT,
  title TEXT NOT NULL,
  body_md TEXT NOT NULL,
  attached_repo_url TEXT,
  helpful_count INTEGER NOT NULL DEFAULT 0 CHECK (helpful_count >= 0),
  hidden_by_reports INTEGER NOT NULL DEFAULT 0 CHECK (hidden_by_reports IN (0, 1)),
  created_at TEXT NOT NULL
) STRICT;

CREATE INDEX IF NOT EXISTS idx_forum_threads_author_id ON forum_threads(author_id);
CREATE INDEX IF NOT EXISTS idx_forum_threads_feed ON forum_threads(hidden_by_reports, level, path_id, created_at DESC);

CREATE TABLE IF NOT EXISTS forum_replies (
  id TEXT PRIMARY KEY,
  thread_id TEXT NOT NULL REFERENCES forum_threads(id) ON DELETE CASCADE,
  author_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  body_md TEXT NOT NULL,
  helpful_count INTEGER NOT NULL DEFAULT 0 CHECK (helpful_count >= 0),
  hidden_by_reports INTEGER NOT NULL DEFAULT 0 CHECK (hidden_by_reports IN (0, 1)),
  created_at TEXT NOT NULL
) STRICT;

CREATE INDEX IF NOT EXISTS idx_forum_replies_thread_id ON forum_replies(thread_id, hidden_by_reports, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_forum_replies_author_id ON forum_replies(author_id);

CREATE TABLE IF NOT EXISTS chat_messages (
  id TEXT PRIMARY KEY,
  room_level INTEGER NOT NULL CHECK (room_level IN (1, 2, 3)),
  author_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  body_text TEXT NOT NULL,
  attached_url TEXT,
  hidden_by_reports INTEGER NOT NULL DEFAULT 0 CHECK (hidden_by_reports IN (0, 1)),
  created_at TEXT NOT NULL
) STRICT;

CREATE INDEX IF NOT EXISTS idx_chat_messages_room ON chat_messages(room_level, hidden_by_reports, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_messages_author_id ON chat_messages(author_id);

CREATE TABLE IF NOT EXISTS community_reports (
  id TEXT PRIMARY KEY,
  target_type TEXT NOT NULL CHECK (target_type IN ('thread', 'reply', 'chat_message')),
  target_id TEXT NOT NULL,
  reporter_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  created_at TEXT NOT NULL,
  UNIQUE (target_type, target_id, reporter_user_id)
) STRICT;

CREATE INDEX IF NOT EXISTS idx_community_reports_target ON community_reports(target_type, target_id);
CREATE INDEX IF NOT EXISTS idx_community_reports_reporter ON community_reports(reporter_user_id);

CREATE TABLE IF NOT EXISTS moderation_audit_log (
  id TEXT PRIMARY KEY,
  user_id_hash TEXT NOT NULL,
  surface TEXT NOT NULL CHECK (surface IN ('forum_thread', 'forum_reply', 'chat_message', 'report')),
  reason_code TEXT NOT NULL,
  created_at TEXT NOT NULL
) STRICT;

CREATE INDEX IF NOT EXISTS idx_moderation_audit_created_at ON moderation_audit_log(created_at DESC);
