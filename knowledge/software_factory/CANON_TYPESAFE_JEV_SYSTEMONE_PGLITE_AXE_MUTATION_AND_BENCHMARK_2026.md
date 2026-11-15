# CANON: TypeSafe AI SystemOne (`jev-latest` / `jev-1.14.0`), `@electric-sql/pglite` WASM Postgres RLS, `axe-core` WCAG 2.2 AA, Mutation Testing (Meta ACH / Stryker) & OpenAPI 3.1 Contract Engineering (SOTA 2026)

> **Domain:** `software_factory` | **Classification:** Canonical Technical Reference (`ISO/IEC 26550`)
> **Status:** `[VERIFICADO: Live HTTP 200 against https://api.typesafe.ai/v1/systemone (jev-1.14.0) & Local WASM Execution, 2026-10-29]`

---

## 1. TypeSafe AI SystemOne (`Jev` / `jev-latest` / `jev-1.14.0`) vs. BoundaryML `BAML`

### 1.1 Architectural Separation of Concerns (`System One` vs. `System Two`)
In high-assurance agentic software factories, two complementary paradigms must never be conflated:
1. **TypeSafe AI SystemOne (`Jev`, `https://api.typesafe.ai/v1/systemone`):**
   - **Role:** Fast, calibrated **"System One"** decision and judgment model trained via *Reinforcement Learning for Calibrated Decisions (RLCD)*.
   - **Latency & Economics:** Sub-`500ms` single-pass inference with **Input-Only Billing** (`usage.output_tokens` are billed at `\$0.00`).
   - **Core Primitives (`questions` dictionary):**
     - `type: "noul"`: Binary Yes/No judgment specified via `instructions: "..."` (or sub-criteria dictionary). Returns `{ type: "noul", noul: <float 0.0..1.0> }` representing the calibrated probability that the condition holds. Used to quantify epistemic uncertainty or abstention probability (`abstain_noul >= 0.75`).
     - `type: "choice"`: Multi-class categorical judgment specified via `criteria: { OPTION_A: "...", OPTION_B: "..." }`. Returns `{ type: "choice", choice: "OPTION_A", confidence: 0.98, probabilities: { ... } }`.
     - `type: "score"`: Continuous rubric evaluation specified via ordered `criteria: ["Level 0", "Level 1", "Level 2"]`. Returns `{ type: "score", score: 1.14, confidence: 0.19, legend: { "0": "...", "1": "...", "2": "..." }, probabilities: { ... } }`.
     - `type: "box"`: Spatial 2D bounding-box localization on images (`[x_min, y_min, x_max, y_max]`).
2. **BoundaryML `BAML` (`Schema-Aligned Parsing — SAP`):**
   - **Role:** Deterministic Rust-inspired parser (`jsonish` + `WithScore` coercion penalty matrix) and compact type grammar (`@alias` symbol tuning) for **autoregressive "System Two" generators** (such as `Vertex AI Gemini 2.5 Flash`).
   - **Latency & Economics:** `< 2ms` local CPU repair at `\$0.00`, saving `60%–75%` of prompt schema tokens.

### 1.2 Single-Pass Multi-Question Batching (Exploiting Input-Only Billing)
Because `POST https://api.typesafe.ai/v1/systemone` charges strictly for `input_tokens`, evaluating `12` questions (`4` predicates $\times$ `3` primitives: `choice`, `noul`, `score`) over a single shared `state` payload (`git diff` + `SPEC.md` + `traces`) in one HTTP request costs `75%` less than issuing 4 separate requests.

---

## 2. Zero-Docker Real PostgreSQL 16 Row-Level Security (RLS) via `@electric-sql/pglite`

### 2.1 Why In-Memory JS Mocks Are Insufficient for Multi-Tenant RLS
Simulating Row-Level Security with JavaScript `if (row.tenantId === currentTenant)` checks does not verify PostgreSQL DDL syntax, role switching (`SET ROLE`), `FORCE ROW LEVEL SECURITY`, or `WITH CHECK` policies on `INSERT`/`UPDATE`.

### 2.2 Canonical `PGlite` WASM Verification Pattern
Using `@electric-sql/pglite` (`tools/audit/local_fullstack_and_component_harness.mjs`), the factory boots a real WebAssembly PostgreSQL 16 engine in Node.js without Docker:
```sql
CREATE ROLE app_tenant_user NOLOGIN;
CREATE TABLE tenant_orders (
  order_id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  amount_cents BIGINT NOT NULL CHECK (amount_cents >= 0),
  sku TEXT NOT NULL
);
GRANT SELECT, INSERT, UPDATE, DELETE ON tenant_orders TO app_tenant_user;
ALTER TABLE tenant_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_orders FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_policy ON tenant_orders
  FOR ALL TO app_tenant_user
  USING (tenant_id = current_setting('app.current_tenant_id', true))
  WITH CHECK (tenant_id = current_setting('app.current_tenant_id', true));
```
Switching into `SET ROLE app_tenant_user; SET app.current_tenant_id = '<tenant_alpha>';` proves empirically inside PostgreSQL that `SELECT` returns `0` rows from `tenant_beta` and cross-tenant `INSERT` throws `new row violates row-level security policy for table "tenant_orders"`.

---

## 3. Actuarial Accessibility (`axe-core` WCAG 2.2 AA), `ARIA Snapshot YAML` & `pixelmatch`

In `tools/audit/visual_audit.mjs` (`runAxeCoreAndAriaSnapshotAudit`):
1. **Deque `axe-core` (`wcag2a`, `wcag2aa`, `wcag21aa`, `wcag22aa`):** Injected directly into Playwright Chromium to verify zero critical/serious WCAG 2.2 AA violations alongside perceptual `APCA Lc` contrast checks.
2. **Structural `ARIA Snapshot YAML` (`tools/audit/out/aria_snapshot.yaml`):** Captures the semantic landmark hierarchy (`banner`, `navigation`, `main`, `heading [level=1]`, `button`, `link`, `contentinfo`) to prevent structural accessibility regressions.
3. **Temporal `pixelmatch` Frame Diffing:** Quantifies exact pixel transitions (`pixelDiffRatio`) across animation keyframes (`t0` vs `t350`).

---

## 4. Deterministic 12-Mutant Mutation Testing (`StrykerJS` / Meta ACH Pattern)

Code coverage alone cannot detect tautological tests. `runDeterministicMutationTestingSuite()` in `tools/audit/local_fullstack_and_component_harness.mjs` injects **12 canonical mutants** (`M01`–`M12`) across:
- `BigInt` / `dnum` minor-unit pricing and discount clamping (`M01`–`M03`),
- `AtomicDurableStockLock` boundary (`>=` vs `>`) and idempotency key deduplication (`M04`–`M05`),
- `IdempotentWebhookLedger` HMAC-SHA256 signature verification and 300s replay window (`M06`–`M07`),
- `verifyZeroTrustJwtAndCookie` (`alg: "none"`, expired `exp`, missing `__Host-` cookie flags) (`M08`–`M10`),
- Cross-tenant ReBAC/RLS (`M11`) and DOM XSS `<script>` sanitization (`M12`).
All `12/12` mutants must be killed (`Mutation Kill Score == 100.0%`).

---

## 5. Knip-Style Module Hygiene & OpenAPI 3.1 + Valibot Edge Contracts

- **`auditModuleAndDependencyHygiene()` (`tools/intelligence/ast_guard.mjs`):** Ensures zero broken script entrypoints in `package.json#scripts` and zero unused dependencies in `package.json#dependencies`.
- **`verifyAndEmitOpenApiContract()` (`tools/audit/api_contract_verifier.mjs`):** Extracts all `fetch('/api/...')` calls from `site/js/` and verifies `1:1` route parity against `worker/index.js`, validating payloads with `Valibot` and emitting `dist/openapi.json` (`OpenAPI 3.1.0`).

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SPLE_ISO26550_AND_SOFTWARE_FACTORIES_ARCHITECTURE_2026]] · [[CANON_ASTRO5_CLOUDFLARE_WORKERS_AND_MODERN_WEB_TEMPLATES_2026]] · [[CANON_MULTI_BRAND_DESIGN_SYSTEMS_DTCG_STYLE_DICTIONARY_AND_ARCHETYPES_2026]] · [[CANON_SOTA_AGENT_TEAM_TOPOLOGY_AND_2026_WEB_STACK_AUDIT]] · #software_factory
