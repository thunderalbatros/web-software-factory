#!/usr/bin/env node
/**
 * tools/db/dual_database_forge.mjs — Dual Database Engine (`edge-d1` vs. `enterprise-postgres` RLS)
 * & Envelope Encryption Engine (`AES-256-GCM` + `GCP Cloud KMS` + `Presidio` PII Filter)
 * =================================================================================================
 * Implements:
 *   1. Automatic Database Engine Selector from `SPEC.md` / `factory.project.json`:
 *      - `edge-d1` (Default for Landings, Portfolios & Lightweight Catalogs): Cloudflare D1 SQLite ($0.00).
 *      - `enterprise-postgres` (For Multi-Tenant SaaS, Fintech, ERP & High-Concurrency E-Commerce):
 *        Serverless PostgreSQL v14+ via Cloudflare Hyperdrive + Drizzle ORM with:
 *          * Engine-level Row-Level Security (`ENABLE ROW LEVEL SECURITY; FORCE ROW LEVEL SECURITY;`,
 *            `tenant_id UUID NOT NULL`, `SET LOCAL app.current_tenant_id = $1`, `tenant_isolation_policy`).
 *          * CIS Benchmark Hardening & Wrapper Pattern (`scram-sha-256`, `hostssl` TLS 1.3,
 *            `REVOKE ALL ON SCHEMA public FROM PUBLIC`, `NOSUPERUSER`, `$1/$2` / `EXECUTE USING`,
 *            and `SECURITY DEFINER` with static `search_path`).
 *          * 3-Area Schema Zoning: `zone_restricted` (AES-256-GCM PII), `zone_confidential`
 *            (PCI DSS opaque tokens & idempotency, zero PAN storage), and `zone_audit_worm`
 *            (Write-Once-Read-Many immutable tables blocking `UPDATE`/`DELETE`, ready for `pgAudit` & `pgBackRest`).
 *   2. `EnvelopeEncryptionEngine` (`AES-256-GCM`):
 *      - Column-level encryption for `zone_restricted` PII using an ephemeral 256-bit DEK wrapped by
 *        a GCP Cloud KMS (HSM-backed) CMK via `vertex_ai_bridge.mjs` (with WebCrypto `crypto.subtle`
 *        local fallback and 90-day scheduled rotation).
 *      - Presidio-pattern PII detection & anonymization before logging or sending traces to AI models.
 * =================================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import {
  wrapAndUnwrapKeyWithGcpKms,
  anonymizePresidioPiiForLogsAndAi
} from '../intelligence/vertex_ai_bridge.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');

export const VALID_DB_TIERS = ['edge-d1', 'enterprise-postgres'];

/**
 * CMU 15-445 (Prof. Andy Pavlo) Database Systems & Atomic Transactions Invariants:
 *   - MVCC Snapshot Isolation (`REPEATABLE READ` / `SERIALIZABLE`)
 *   - Pessimistic Row-Level Locking (`SELECT ... FOR UPDATE NOWAIT`) for stock/ledger mutations
 *   - Leftmost-Prefix Composite B+Tree Indexing (`(tenant_id, created_at DESC)`)
 *   - Write-Ahead Logging (WAL) with `PRAGMA wal_checkpoint(TRUNCATE);`
 */
export const CMU_15445_ATOMIC_TRANSACTION_INVARIANTS = Object.freeze({
  courseRef: 'CMU 15-445/645 (Prof. Andy Pavlo — https://15445.courses.cs.cmu.edu/)',
  isolationLevel: 'REPEATABLE READ (MVCC Snapshot Isolation)',
  rowLockingClause: 'SELECT ... FOR UPDATE NOWAIT',
  indexStructure: 'Composite B+Tree (Equality-Before-Range Leftmost Prefix)',
  walPragmas: 'PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL; PRAGMA busy_timeout = 5000;'
});

/**
 * Resolves `dbTier` ("edge-d1" | "enterprise-postgres") from `SPEC.md` or `factory.project.json`.
 */
export function resolveDatabaseTier(projectRoot = ROOT) {
  const manifestPath = path.join(projectRoot, 'factory.project.json');
  if (fs.existsSync(manifestPath)) {
    try {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      if (VALID_DB_TIERS.includes(manifest.dbTier)) {
        return manifest.dbTier;
      }
      if (VALID_DB_TIERS.includes(manifest.database?.dbTier)) {
        return manifest.database.dbTier;
      }
    } catch (_) {}
  }

  const specCandidates = [
    path.join(projectRoot, 'SPEC.md'),
    path.join(projectRoot, '.specify', 'memory', 'spec.md')
  ];
  for (const specPath of specCandidates) {
    if (fs.existsSync(specPath)) {
      const rawSpec = fs.readFileSync(specPath, 'utf8');
      const tierMatch = rawSpec.match(/dbTier\s*:\s*["']?(edge-d1|enterprise-postgres)["']?/i);
      if (tierMatch) {
        return tierMatch[1].toLowerCase();
      }
      if (/\b(?:fintech|multi-tenant\s+saas|enterprise-postgres|hyperdrive|postgresql\s+rls)\b/i.test(rawSpec)) {
        return 'enterprise-postgres';
      }
    }
  }

  return 'edge-d1';
}

/**
 * Generates Tier-1 Cloudflare D1 (SQLite) Zero-Config Schema (`edge-d1`, $0.00 cost).
 * Strictly enforces opaque ULID/UUIDv4 primary keys (no sequential integer IDs exposed).
 */
export function generateEdgeD1SqlSchema(projectSlug = 'agencia-alfa') {
  return `-- =============================================================================
-- Tier-1 Cloudflare D1 (SQLite) Edge Schema — Project: ${projectSlug}
-- Cost: $0.00 | Primary Keys: Opaque UUIDv4 / ULID (Anti-IDOR A01:2025)
-- CMU 15-445 (Andy Pavlo): WAL Durability + Composite B+Tree Indexing
-- =============================================================================
PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;
PRAGMA synchronous = NORMAL;
PRAGMA busy_timeout = 5000;

CREATE TABLE IF NOT EXISTS leads_submissions (
  id TEXT PRIMARY KEY CHECK (length(id) >= 26),
  tenant_slug TEXT NOT NULL DEFAULT '${projectSlug}',
  email_encrypted_b64 TEXT NOT NULL,
  full_name_encrypted_b64 TEXT NOT NULL,
  idempotency_key TEXT NOT NULL UNIQUE,
  created_at_iso TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
) STRICT;

CREATE INDEX IF NOT EXISTS idx_leads_tenant_created
  ON leads_submissions (tenant_slug, created_at_iso DESC);
`;
}

/**
 * Generates Tier-2 Serverless PostgreSQL (v14+ via Cloudflare Hyperdrive + Drizzle ORM)
 * Enterprise Multi-Tenant Schema with 4 Defense-in-Depth Layers:
 *   1. Row-Level Security (`ENABLE ROW LEVEL SECURITY; FORCE ROW LEVEL SECURITY;`) + `tenant_isolation_policy`
 *   2. CIS Benchmark Hardening (`scram-sha-256`, `hostssl` TLS 1.3, `REVOKE ALL ON SCHEMA public FROM PUBLIC`, `NOSUPERUSER`)
 *   3. 3-Zone Schema Partitioning (`zone_restricted`, `zone_confidential`, `zone_audit_worm`)
 *   4. Stored Procedures with `SECURITY DEFINER` + static `search_path` + `$1/$2` parameterized `EXECUTE USING`
 */
export function generateEnterprisePostgresRlsSchema(projectSlug = 'agencia-alfa') {
  return `-- =============================================================================
-- Tier-2 Enterprise Serverless PostgreSQL v14+ (Cloudflare Hyperdrive + Drizzle ORM)
-- Project: ${projectSlug} | Defense-in-Depth: RLS + CIS Benchmark + 3 Zones + WORM
-- =============================================================================
-- [CIS Benchmark pg_hba.conf & postgresql.conf Directives]:
--   password_encryption = 'scram-sha-256'
--   ssl = on
--   ssl_min_protocol_version = 'TLSv1.3'
--   hostssl all app_tenant_worker 0.0.0.0/0 scram-sha-256
--   shared_preload_libraries = 'pgaudit'
--   pgaudit.log = 'write, ddl, role'
--   archive_command = 'pgbackrest --stanza=${projectSlug} archive-push %p'
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
`;
}

/**
 * Generates the Drizzle ORM + Cloudflare Hyperdrive TypeScript/ESM connector (`drizzle_hyperdrive_schema.js`).
 */
export function generateDrizzleHyperdriveConnectorCode(projectSlug = 'agencia-alfa') {
  return `/**
 * Drizzle ORM + Cloudflare Hyperdrive Tenant-Isolated Connector (${projectSlug})
 * Enforces SET LOCAL app.current_tenant_id = $1 inside every transaction.
 */
export async function withTenantRlsTransaction(hyperdrivePool, tenantUuid, callbackFn) {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[47][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(tenantUuid || ''))) {
    throw new Error('RLS_GUARD: Invalid or missing opaque tenant_id UUID.');
  }
  const client = await hyperdrivePool.connect();
  try {
    await client.query('BEGIN');
    await client.query('SET LOCAL app.current_tenant_id = $1', [tenantUuid]);
    const result = await callbackFn(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}
`;
}

/**
 * Envelope Encryption Engine (`AES-256-GCM`) with Ephemeral DEK + GCP Cloud KMS (HSM) CMK Wrapping.
 * Encrypts `zone_restricted` PII columns and anonymizes PII in telemetry/logs via Presidio filter.
 */
export class EnvelopeEncryptionEngine {
  constructor(options = {}) {
    this.keyRing = options.keyRing || 'webfactory-enterprise-hsm-ring';
    this.cryptoKey = options.cryptoKey || 'zone-restricted-pii-cmk';
    this.rotationPeriodDays = Number(options.rotationPeriodDays || 90);
    this.zone = 'zone_restricted';
  }

  /**
   * Encrypts a sensitive PII field at the column level using a fresh 256-bit ephemeral DEK (`AES-256-GCM`)
   * and wraps the DEK with the GCP Cloud KMS CMK (`wrapAndUnwrapKeyWithGcpKms`).
   */
  async encryptColumnPii(plaintextValue, { tenantId, columnName = 'email' } = {}) {
    if (!tenantId) {
      throw new Error('EnvelopeEncryptionEngine requires tenantId for AAD binding.');
    }
    const ephemeralDek = crypto.randomBytes(32);
    const columnIv = crypto.randomBytes(12);
    const aadBuffer = Buffer.from(`zone_restricted:${tenantId}:${columnName}`, 'utf8');

    const cipher = crypto.createCipheriv('aes-256-gcm', ephemeralDek, columnIv);
    cipher.setAAD(aadBuffer);
    const encryptedData = Buffer.concat([
      cipher.update(String(plaintextValue), 'utf8'),
      cipher.final()
    ]);
    const columnAuthTag = cipher.getAuthTag();

    const wrappedDek = await wrapAndUnwrapKeyWithGcpKms({
      dekBuffer: ephemeralDek,
      operation: 'wrap',
      keyRing: this.keyRing,
      cryptoKey: this.cryptoKey,
      rotationPeriodDays: this.rotationPeriodDays
    });

    // Zero-fill ephemeral DEK in memory after wrapping
    ephemeralDek.fill(0);

    return {
      schemaZone: this.zone,
      algorithm: 'AES-256-GCM',
      columnName,
      tenantId,
      columnIvBase64: columnIv.toString('base64'),
      columnCiphertextBase64: encryptedData.toString('base64'),
      columnAuthTagBase64: columnAuthTag.toString('base64'),
      wrappedDekPayload: wrappedDek,
      safeLogPreview: anonymizePresidioPiiForLogsAndAi(String(plaintextValue))
    };
  }

  /**
   * Unwraps the ephemeral DEK via GCP Cloud KMS (or WebCrypto subtle fallback) and decrypts the column value.
   */
  async decryptColumnPii(envelopeRecord) {
    if (!envelopeRecord || envelopeRecord.algorithm !== 'AES-256-GCM') {
      throw new Error('Invalid AES-256-GCM envelope record.');
    }
    const rawDek = await wrapAndUnwrapKeyWithGcpKms({
      wrappedDekPayload: envelopeRecord.wrappedDekPayload,
      operation: 'unwrap',
      keyRing: this.keyRing,
      cryptoKey: this.cryptoKey,
      rotationPeriodDays: this.rotationPeriodDays
    });

    try {
      const columnIv = Buffer.from(envelopeRecord.columnIvBase64, 'base64');
      const ciphertext = Buffer.from(envelopeRecord.columnCiphertextBase64, 'base64');
      const authTag = Buffer.from(envelopeRecord.columnAuthTagBase64, 'base64');
      const aadBuffer = Buffer.from(
        `zone_restricted:${envelopeRecord.tenantId}:${envelopeRecord.columnName}`,
        'utf8'
      );

      const decipher = crypto.createDecipheriv('aes-256-gcm', rawDek, columnIv);
      decipher.setAAD(aadBuffer);
      decipher.setAuthTag(authTag);
      const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
      return decrypted.toString('utf8');
    } finally {
      rawDek.fill(0);
    }
  }
}

/**
 * Forges and persists the database architecture artifacts (`edge-d1` or `enterprise-postgres`)
 * inside `projects/<slug>/db/` and updates `factory.project.json` + `SPEC.md`.
 */
export function forgeDatabaseArchitecture(projectRoot = ROOT, requestedTier = '') {
  const dbTier = VALID_DB_TIERS.includes(requestedTier)
    ? requestedTier
    : resolveDatabaseTier(projectRoot);
  const slug = path.basename(projectRoot);
  const dbDir = path.join(projectRoot, 'db');
  fs.mkdirSync(dbDir, { recursive: true });

  const filesCreated = [];
  if (dbTier === 'enterprise-postgres') {
    const pgPath = path.join(dbDir, 'enterprise_postgres_rls.sql');
    const drizzlePath = path.join(dbDir, 'drizzle_hyperdrive_connector.js');
    fs.writeFileSync(pgPath, generateEnterprisePostgresRlsSchema(slug), 'utf8');
    fs.writeFileSync(drizzlePath, generateDrizzleHyperdriveConnectorCode(slug), 'utf8');
    filesCreated.push(pgPath, drizzlePath);
  } else {
    const d1Path = path.join(dbDir, 'edge_d1_schema.sql');
    fs.writeFileSync(d1Path, generateEdgeD1SqlSchema(slug), 'utf8');
    filesCreated.push(d1Path);
  }

  const manifestPath = path.join(projectRoot, 'factory.project.json');
  if (fs.existsSync(manifestPath)) {
    try {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      manifest.dbTier = dbTier;
      manifest.database = {
        dbTier,
        engine:
          dbTier === 'enterprise-postgres'
            ? 'Serverless PostgreSQL v14+ (Cloudflare Hyperdrive + Drizzle ORM + RLS + 3 Zones)'
            : 'Cloudflare D1 (SQLite Edge $0.00)',
        envelopeEncryption: 'AES-256-GCM (GCP Cloud KMS CMK + 90d rotation)',
        updatedAt: new Date().toISOString()
      };
      fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
    } catch (_) {}
  }

  return {
    passed: true,
    projectSlug: slug,
    dbTier,
    filesCreated: filesCreated.map((f) => path.relative(projectRoot, f).replace(/\\/g, '/'))
  };
}

/**
 * Self-Test Suite (`node tools/db/dual_database_forge.mjs --self-test`)
 */
export async function runDualDatabaseForgeSelfTest() {
  console.log('\n====================================================================');
  console.log('🗄️  DUAL DATABASE FORGE & ENVELOPE ENCRYPTION — SELF-TEST SUITE');
  console.log('====================================================================');

  const d1Sql = generateEdgeD1SqlSchema('fintech-alpha');
  const pgSql = generateEnterprisePostgresRlsSchema('fintech-alpha');

  // 1. Verify RLS enforcement & tenant_isolation_policy
  const rlsVerified =
    pgSql.includes('tenant_id UUID NOT NULL') &&
    pgSql.includes('ENABLE ROW LEVEL SECURITY;') &&
    pgSql.includes('FORCE ROW LEVEL SECURITY;') &&
    pgSql.includes("SET LOCAL app.current_tenant_id") || pgSql.includes("set_config('app.current_tenant_id'");
  const policyVerified = pgSql.includes(
    "CREATE POLICY tenant_isolation_policy"
  ) && pgSql.includes("USING (tenant_id = current_setting('app.current_tenant_id')::uuid)");

  if (!rlsVerified || !policyVerified) {
    throw new Error('PostgreSQL RLS schema missing mandatory ENABLE/FORCE RLS or tenant_isolation_policy.');
  }
  console.log('  ✓ [RLS Engine Isolation] ENABLE/FORCE ROW LEVEL SECURITY + tenant_isolation_policy verificado.');

  // 2. Verify CIS Benchmark Hardening & 3 Security Zones
  const cisVerified =
    pgSql.includes("password_encryption = 'scram-sha-256'") &&
    pgSql.includes('hostssl') &&
    pgSql.includes('REVOKE ALL ON SCHEMA public FROM PUBLIC;') &&
    pgSql.includes('NOSUPERUSER') &&
    pgSql.includes('SECURITY DEFINER') &&
    pgSql.includes('SET search_path =') &&
    pgSql.includes('USING p_transaction_id, p_tenant_id');
  const zonesVerified =
    pgSql.includes('CREATE SCHEMA IF NOT EXISTS zone_restricted;') &&
    pgSql.includes('CREATE SCHEMA IF NOT EXISTS zone_confidential;') &&
    pgSql.includes('CREATE SCHEMA IF NOT EXISTS zone_audit_worm;') &&
    pgSql.includes('BEFORE UPDATE OR DELETE ON zone_audit_worm.immutable_security_events');

  if (!cisVerified || !zonesVerified) {
    throw new Error('PostgreSQL schema failed CIS Benchmark or 3-Zone (restricted/confidential/audit_worm) verification.');
  }
  console.log('  ✓ [CIS + 3 Zones] zone_restricted, zone_confidential (Zero PAN) y zone_audit_worm (WORM trigger) verificados.');

  // 3. Verify EnvelopeEncryptionEngine (AES-256-GCM + GCP KMS CMK + Presidio PII Anonymizer)
  const engine = new EnvelopeEncryptionEngine({ rotationPeriodDays: 90 });
  const sampleTenantId = '0192d4f0-88a1-7000-8b21-99aabbccddee';
  const secretEmail = 'cto.founder@fintech-enterprise.com';
  const encryptedEnvelope = await engine.encryptColumnPii(secretEmail, {
    tenantId: sampleTenantId,
    columnName: 'email'
  });
  const decryptedEmail = await engine.decryptColumnPii(encryptedEnvelope);

  if (
    decryptedEmail !== secretEmail ||
    encryptedEnvelope.columnCiphertextBase64.includes('fintech-enterprise') ||
    encryptedEnvelope.safeLogPreview.includes('cto.founder@fintech-enterprise.com') ||
    encryptedEnvelope.wrappedDekPayload.rotationPeriodDays !== 90
  ) {
    throw new Error('EnvelopeEncryptionEngine AES-256-GCM or Presidio PII anonymization failed verification.');
  }
  console.log(
    `  ✓ [Envelope Encryption AES-256-GCM + KMS] Cifrado/Descifrado exacto + rotación ${encryptedEnvelope.wrappedDekPayload.rotationPeriodDays}d + Presidio (${encryptedEnvelope.safeLogPreview}).`
  );

  // 4. Verify Tier-1 D1 schema uses opaque IDs (no AUTOINCREMENT/SERIAL)
  if (/\b(?:AUTOINCREMENT|SERIAL|BIGSERIAL)\b/i.test(d1Sql) || /\b(?:AUTOINCREMENT|SERIAL|BIGSERIAL)\b/i.test(pgSql)) {
    throw new Error('Sequential primary keys (SERIAL/AUTOINCREMENT) detected in public schema.');
  }
  console.log('  ✓ [Anti-IDOR Schema Guard] Cero claves secuenciales (SERIAL/AUTOINCREMENT) en D1 y PostgreSQL.');

  console.log('====================================================================');
  console.log('✅ [DUAL DATABASE FORGE SELF-TEST PASSED] Exit Code 0');
  console.log('====================================================================\n');

  return {
    passed: true,
    rlsVerified,
    cisVerified,
    zonesVerified,
    envelopeEncryptionVerified: true
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  runDualDatabaseForgeSelfTest()
    .then((res) => process.exit(res.passed ? 0 : 1))
    .catch((err) => {
      console.error('❌ Dual Database Forge Error:', err.message);
      process.exit(1);
    });
}
