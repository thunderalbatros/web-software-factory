-- =============================================================================
-- Tier-1 Cloudflare D1 (SQLite) Edge Schema — Project: agencia-alfa
-- Cost: $0.00 | Primary Keys: Opaque UUIDv4 / ULID (Anti-IDOR A01:2025)
-- =============================================================================
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS leads_submissions (
  id TEXT PRIMARY KEY CHECK (length(id) >= 26),
  tenant_slug TEXT NOT NULL DEFAULT 'agencia-alfa',
  email_encrypted_b64 TEXT NOT NULL,
  full_name_encrypted_b64 TEXT NOT NULL,
  idempotency_key TEXT NOT NULL UNIQUE,
  created_at_iso TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
) STRICT;

CREATE INDEX IF NOT EXISTS idx_leads_tenant_created
  ON leads_submissions (tenant_slug, created_at_iso DESC);
