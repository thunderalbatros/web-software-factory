# CANON OFFICIAL DOCS: PostgreSQL v14+ RLS & CIS Benchmark, Cloudflare Hyperdrive, Ory Kratos/Keto Zanzibar, GCP Cloud KMS & Zizmor v1.30 (2026)

> **Epistemic Tier:** `TIER_1_SOTA_2026` (Authority Boost: `x1.35`)  
> **Domain:** Enterprise Database Hardening, Zero-Trust Identity, HSM Envelope Encryption & CI/CD Security  
> **Modules:** `tools/db/dual_database_forge.mjs`, `tools/security/identity_and_commerce_guard.mjs`, `tools/audit/workflow_security_linter.mjs`

---

## 1. Vault & Security Engine Verification

| Repository | Vault Status | Harvested Spec Files | Extracted Official Sections |
| :--- | :--- | :--- | :--- |
| `agent-governance-toolkit` | VERIFIED_ON_DISK | `README.md` | Agent Governance Toolkit • Ship agents to production without losing sleep • The Problem |
| `agents` | VERIFIED_ON_DISK | `README.md, package.json` | Cloudflare Agents • Quick Example • Features |
| `zizmor` | VERIFIED_ON_DISK | `README.md, pyproject.toml, Cargo.toml` | License • Contributing • The name? |

---

## 2. PostgreSQL v14+ CIS Benchmark Hardening & Row-Level Security (`RLS`)

### 2.1 Mandatory `postgresql.conf` & `pg_hba.conf` Directives
```ini
# postgresql.conf (CIS PostgreSQL 14–17 Benchmark Level 2)
password_encryption = 'scram-sha-256'
ssl = on
ssl_min_protocol_version = 'TLSv1.3'
shared_preload_libraries = 'pgaudit'
pgaudit.log = 'write, ddl, role'
archive_mode = on
archive_command = 'pgbackrest --stanza=enterprise archive-push %p'

# pg_hba.conf (Force TLS 1.3 + SCRAM-SHA-256)
hostssl all app_tenant_worker 0.0.0.0/0 scram-sha-256
```

### 2.2 Least Privilege Role, Schema Zoning & Wrapper Pattern (`EXECUTE USING`)
- **Revoke Public Schema:** `REVOKE ALL ON SCHEMA public FROM PUBLIC;`
- **Non-Superuser App Role:** `CREATE ROLE app_tenant_worker WITH LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION;`
- **3-Area Schema Zoning:**
  1. `zone_restricted`: Column-encrypted PII (`EnvelopeEncryptionEngine` `AES-256-GCM`).
  2. `zone_confidential`: Financial ledger, idempotency keys, and opaque PCI DSS v4.0 tokens (`CHECK (pci_opaque_payment_token !~ '^[0-9]{13,19}$')`).
  3. `zone_audit_worm`: Immutable Write-Once-Read-Many tables with `BEFORE UPDATE OR DELETE` trigger raising `WORM_IMMUTABILITY_VIOLATION`.
- **Mandatory RLS & Transactional Context:**
  - `ALTER TABLE <schema>.<table> ENABLE ROW LEVEL SECURITY; ALTER TABLE <schema>.<table> FORCE ROW LEVEL SECURITY;`
  - `CREATE POLICY tenant_isolation_policy ON <schema>.<table> USING (tenant_id = current_setting('app.current_tenant_id')::uuid) WITH CHECK (tenant_id = current_setting('app.current_tenant_id')::uuid);`
  - Inside Cloudflare Hyperdrive + Drizzle ORM transaction: `SET LOCAL app.current_tenant_id = $1`.
  - Stored procedures with `SECURITY DEFINER` MUST declare `SET search_path = zone_confidential, pg_temp` and execute dynamic SQL strictly via `EXECUTE '...' USING $1, $2`.

---

## 3. Ory Kratos (Passkeys `WebAuthn` / `FIDO2`) & Ory Keto (Google Zanzibar ReBAC)

1. **Ory Kratos API-First Authentication:**
   - **Passkeys:** `WebAuthn` / `FIDO2` Level 3 with `user_verification: "required"`.
   - **Password Hashing:** `Argon2id` (`memory: 65536 KB`, `iterations: 3`, `parallelism: 4`, `salt: 16B`, `key: 32B`).
   - **Asymmetric JWT Policy:** Exclusively `ES256` or `RS256` (strictly rejecting `alg: "none"` and symmetric `HS256`), TTL `900s–3600s` (15–60 min), single-use refresh token rotation, and `__Host-wf_session` cookie with `Secure; HttpOnly; SameSite=Strict`.
2. **Ory Keto (Google Zanzibar) Relation Tuples & Anti-IDOR:**
   - Tuple format: `namespace:object_ulid#relation@subject_ulid`.
   - Blocks any sequential numeric identifier (`SERIAL` / `AUTOINCREMENT`) to eliminate `OWASP A01:2025 IDOR/BOLA`.

---

## 4. Envelope Encryption (`AES-256-GCM`) with Google Cloud KMS (HSM) & 90-Day Rotation

- **Column Encryption Flow:**
  1. Generate a fresh 256-bit ephemeral Data Encryption Key (`DEK`) and 96-bit IV per PII value.
  2. Bind Additional Authenticated Data (`AAD = zone_restricted:<tenant_id>:<column_name>`).
  3. Wrap the `DEK` using the Customer Master Key (`CMK`) in **Google Cloud KMS** (`projects/<project>/locations/us-central1/keyRings/webfactory-enterprise-hsm-ring/cryptoKeys/zone-restricted-pii-cmk`) with `rotationPeriodDays: 90` and WebCrypto `crypto.subtle` local fallback.
  4. Zero-fill the plaintext `DEK` buffer in memory immediately after wrapping.

---

## 5. `zizmor v1.30` Static GitHub Actions Security Rules

- **Rule `ZIZMOR-01 (excessive-permissions)`:** Top-level `permissions: {}` or `permissions: read-all` required in every `.github/workflows/*.yml`.
- **Rule `ZIZMOR-02 (dangerous-triggers)`:** Forbids untrusted `pull_request_target` and `issue_comment` triggers with write privileges.
- **Rule `ZIZMOR-03 (template-injection)`:** Forbids direct interpolation of `${{ github.event.* }}` inside `run:` shell blocks; pass via `env:` variables instead.
- **Rule `ZIZMOR-04 (unpinned-credentials)`:** Requires `persist-credentials: false` on `actions/checkout@v4`.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_CYBERSECURITY_DEVSECOPS_2026]] · [[CYBERSECURITY_MASTER_PROTOCOL]] · [[ANTI_BOT_STEALTH_GUIDE]] · [[CANON_IDENTITY_AND_OAUTH_CYBERSECURITY_AUDIT_2026]] · #cybersecurity
