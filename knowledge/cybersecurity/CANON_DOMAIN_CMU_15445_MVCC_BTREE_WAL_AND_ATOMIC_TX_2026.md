---
title: "CANON DOMAIN MASTERY: Bases de Datos y Transacciones Atómicas (CMU 15-445 / Andy Pavlo) (2026)"
category: "cybersecurity"
epistemicTier: "TIER_1_SOTA_2026"
authorityBoost: 1.35
courseId: "cmu-15-445-database-systems"
linkedHarnessModule: "tools/db/dual_database_forge.mjs"
---

# CANON DOMAIN MASTERY: Bases de Datos y Transacciones Atómicas (CMU 15-445 / Andy Pavlo)

> **Institución / Fuente:** Carnegie Mellon University (Prof. Andy Pavlo)  
> **URLs Oficiales:** `https://15445.courses.cs.cmu.edu/`  
> **Epistemic Tier:** `TIER_1_SOTA_2026` (`Authority Boost: x1.35`)  
> **Alcance:** MVCC Snapshot Isolation, SELECT ... FOR UPDATE, B+Tree Composite Indexing, Write-Ahead Logging (WAL)  
> **Módulo del Harness Acoplado:** `tools/db/dual_database_forge.mjs`

---

## 1. Tópicos Nucleares Cosechados

- **MVCC Snapshot Isolation**
- **SELECT ... FOR UPDATE**
- **B+Tree Composite Indexing**
- **Write-Ahead Logging (WAL)**

---

## 2. Reglas Arquitectónicas Deterministas (SOTA 2026)

1. Enforce Multi-Version Concurrency Control (MVCC) Snapshot Isolation and explicit pessimistic row-level locks (`SELECT ... FOR UPDATE NOWAIT`) on financial/inventory mutations to prevent Write Skew and Lost Updates.
2. Configure SQLite/D1 with `PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL; PRAGMA busy_timeout = 5000;` and checkpoint via `PRAGMA wal_checkpoint(TRUNCATE);`.
3. Design composite B+Tree indexes following the Leftmost-Prefix & Equality-Before-Range rule (`(tenant_id, status, created_at DESC)`).

---

## 3. Patrón de Producción Verificado

```
-- CMU 15-445 Atomic Inventory/Ledger Mutation (PostgreSQL v14+ MVCC + Row Lock)
BEGIN ISOLATION LEVEL REPEATABLE READ;
SET LOCAL app.current_tenant_id = $1;
SELECT available_units FROM zone_confidential.inventory_items
 WHERE tenant_id = $1 AND sku_id = $2
 FOR UPDATE NOWAIT;
UPDATE zone_confidential.inventory_items
   SET available_units = available_units - $3, updated_at = NOW()
 WHERE tenant_id = $1 AND sku_id = $2 AND available_units >= $3;
COMMIT;
```
