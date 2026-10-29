-- =============================================================================
-- Tier-2 Enterprise Serverless PostgreSQL v14+ (Cloudflare Hyperdrive + Drizzle ORM)
-- Project: agencia-alfa | Defense-in-Depth: RLS + CIS Benchmark + 3 Zones + WORM
-- =============================================================================
-- [CIS Benchmark pg_hba.conf & postgresql.conf Directives]:
--   password_encryption = 'scram-sha-256'
--   ssl = on
--   ssl_min_protocol_version = 'TLSv1.3'
--   hostssl all app_tenant_worker 0.0.0.0/0 scram-sha-256
--   shared_preload_libraries = 'pgaudit'
--   pgaudit.log = 'write, ddl, role'
--   archive_command = 'pgbackrest --stanza=agencia-alfa archive-push %p'
-- =============================================================================

-- 1. CIS Hardening: Revoke default public privileges & create non-superuser worker role
REVOKE ALL ON SCHEMA public FROM PUBLIC;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'app_tenant_worker') THEN
    CREATE ROLE app_tenant_worker WITH LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION;
  END IF;
END
$$;

-- 2. Three-Area Security Schema Zoning
CREATE SCHEMA IF NOT EXISTS zone_restricted;   -- Encrypted PII (EnvelopeEncryptionEngine AES-256-GCM)
CREATE SCHEMA IF NOT EXISTS zone_confidential; -- Financial Ledger, Idempotency & Opaque PCI DSS Tokens (Zero PAN)
CREATE SCHEMA IF NOT EXISTS zone_audit_worm;   -- Immutable Write-Once-Read-Many (WORM) Audit Trail (pgAudit/pgBackRest)

REVOKE ALL ON SCHEMA zone_restricted FROM PUBLIC;
REVOKE ALL ON SCHEMA zone_confidential FROM PUBLIC;
REVOKE ALL ON SCHEMA zone_audit_worm FROM PUBLIC;

GRANT USAGE ON SCHEMA zone_restricted, zone_confidential, zone_audit_worm TO app_tenant_worker;

-- 3. Transactional Context Helper for Row-Level Security (RLS)
CREATE OR REPLACE FUNCTION zone_confidential.set_current_tenant_context(p_tenant_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = zone_confidential, pg_temp
AS $$
BEGIN
  IF p_tenant_id IS NULL THEN
    RAISE EXCEPTION 'TENANT_CONTEXT_REQUIRED: tenant_id UUID cannot be null';
  END IF;
  PERFORM set_config('app.current_tenant_id', p_tenant_id::text, true);
END;
$$;

-- 4. ZONE 1: zone_restricted (PII Encrypted at Column Level via AES-256-GCM + GCP KMS DEK)
CREATE TABLE IF NOT EXISTS zone_restricted.tenant_identities_pii (
  identity_ulid UUID PRIMARY KEY,
  tenant_id UUID NOT NULL,
  email_ciphertext_b64 TEXT NOT NULL,
  full_name_ciphertext_b64 TEXT NOT NULL,
  wrapped_dek_b64 TEXT NOT NULL,
  kms_key_version TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_opaque_identity_no_plaintext_email CHECK (position('@' in email_ciphertext_b64) = 0)
);

ALTER TABLE zone_restricted.tenant_identities_pii ENABLE ROW LEVEL SECURITY;
ALTER TABLE zone_restricted.tenant_identities_pii FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_isolation_policy ON zone_restricted.tenant_identities_pii;
CREATE POLICY tenant_isolation_policy ON zone_restricted.tenant_identities_pii
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid)
  WITH CHECK (tenant_id = current_setting('app.current_tenant_id')::uuid);

-- 5. ZONE 2: zone_confidential (Transactions, Idempotency & Opaque PCI DSS Tokens — Forbids Card PAN)
CREATE TABLE IF NOT EXISTS zone_confidential.ledger_transactions (
  transaction_id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL,
  idempotency_key VARCHAR(128) NOT NULL UNIQUE,
  amount_minor_units BIGINT NOT NULL CHECK (amount_minor_units >= 0),
  currency_code CHAR(3) NOT NULL,
  pci_opaque_payment_token VARCHAR(128) NOT NULL,
  status VARCHAR(32) NOT NULL CHECK (status IN ('PENDING', 'SETTLED', 'REFUNDED', 'REJECTED')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  -- Explicitly forbid raw 13-19 digit PAN storage under PCI DSS v4.0
  CONSTRAINT chk_pci_dss_no_card_pan CHECK (pci_opaque_payment_token !~ '^[0-9]{13,19}$')
);

ALTER TABLE zone_confidential.ledger_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE zone_confidential.ledger_transactions FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_isolation_policy ON zone_confidential.ledger_transactions;
CREATE POLICY tenant_isolation_policy ON zone_confidential.ledger_transactions
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid)
  WITH CHECK (tenant_id = current_setting('app.current_tenant_id')::uuid);

-- Parameterized Stored Procedure for Critical Ledger Insertion (100% Parameterized EXECUTE USING)
CREATE OR REPLACE FUNCTION zone_confidential.sp_record_idempotent_transaction(
  p_transaction_id UUID,
  p_tenant_id UUID,
  p_idempotency_key VARCHAR(128),
  p_amount_minor BIGINT,
  p_currency CHAR(3),
  p_pci_token VARCHAR(128)
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = zone_confidential, pg_temp
AS $$
DECLARE
  v_existing_id UUID;
BEGIN
  PERFORM zone_confidential.set_current_tenant_context(p_tenant_id);

  EXECUTE 'SELECT transaction_id FROM zone_confidential.ledger_transactions WHERE tenant_id = $1 AND idempotency_key = $2'
    INTO v_existing_id
    USING p_tenant_id, p_idempotency_key;

  IF v_existing_id IS NOT NULL THEN
    RETURN v_existing_id;
  END IF;

  EXECUTE 'INSERT INTO zone_confidential.ledger_transactions (transaction_id, tenant_id, idempotency_key, amount_minor_units, currency_code, pci_opaque_payment_token, status) VALUES ($1, $2, $3, $4, $5, $6, $7)'
    USING p_transaction_id, p_tenant_id, p_idempotency_key, p_amount_minor, p_currency, p_pci_token, 'SETTLED';

  RETURN p_transaction_id;
END;
$$;

-- 6. ZONE 3: zone_audit_worm (Immutable Write-Once-Read-Many Audit Log — Blocks UPDATE & DELETE)
CREATE TABLE IF NOT EXISTS zone_audit_worm.immutable_security_events (
  event_id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL,
  actor_subject_id VARCHAR(128) NOT NULL,
  action_name VARCHAR(128) NOT NULL,
  payload_hash_sha256 CHAR(64) NOT NULL,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE zone_audit_worm.immutable_security_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE zone_audit_worm.immutable_security_events FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_isolation_policy ON zone_audit_worm.immutable_security_events;
CREATE POLICY tenant_isolation_policy ON zone_audit_worm.immutable_security_events
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid)
  WITH CHECK (tenant_id = current_setting('app.current_tenant_id')::uuid);

CREATE OR REPLACE FUNCTION zone_audit_worm.prevent_worm_mutation_trigger()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = zone_audit_worm, pg_temp
AS $$
BEGIN
  RAISE EXCEPTION 'WORM_IMMUTABILITY_VIOLATION: Table zone_audit_worm.% is Write-Once-Read-Many; % is strictly forbidden.', TG_TABLE_NAME, TG_OP;
END;
$$;

DROP TRIGGER IF EXISTS trg_worm_block_update_delete ON zone_audit_worm.immutable_security_events;
CREATE TRIGGER trg_worm_block_update_delete
  BEFORE UPDATE OR DELETE ON zone_audit_worm.immutable_security_events
  FOR EACH ROW
  EXECUTE FUNCTION zone_audit_worm.prevent_worm_mutation_trigger();
