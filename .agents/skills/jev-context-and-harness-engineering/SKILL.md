---
name: jev-context-and-harness-engineering
description: Operates the Official JEV API Client (JEV_API_KEY + independent FinOps ledger), BAML Schema-Aligned Parsing (SAP), PageRank RepoMap, AST Program Slicer, Stateless 5-State Component Harness, and Local Commerce/RLS/3D Simulator.
---

# JEV, BAML SAP, PageRank RepoMap & Fullstack Harness Engineering (SOTA 2026)

## 1. High-Density Context Engineering (Waves 1 & 2)
- **PageRank RepoMap (`factory_repomap_pagerank`):** Call at the start of Wave 1 (`product-spec-architect`, `tech-scout`) or Wave 2 (`senior-coder`, `ux-designer`, `edge-fullstack-architect`) with `{ seedFiles, ticketQuery }` to get the top 15 AST signatures in `< 600 tokens` with exact `file:Lstart-Lend` pointers.
- **Surgical AST Program Slicer (`factory_ast_slice_function`):** Call in Wave 2 with `{ filePath, symbolName }` to read only the target function + dependent types + call sites (`-70% tokens` vs. full-file reads).
- **Stack-Trace Folding (`foldStackTraceAndNodeModulesNoise`):** Automatically prunes `node_modules/` frames and saves lossless traces in `.cache/headroom_ccr/<hash>.json`.

## 2. Official JEV Predicates & BAML SAP (Wave 3 & Triage)
- **Independent Config & FinOps:** Reads `JEV_API_KEY`, `JEV_API_BASE_URL`, `JEV_MODEL` from `.env`, caches SHA-256 decisions in `.agents/memory/jev_decision_cache.json` (`< 0.5ms`, `$0.00`), and tracks spend in `.agents/memory/jev_finops_ledger.json` (`$0.50/day`, isolated from GCP).
- **BAML SAP (`parseWithSchemaAlignedRecovery`):** Repairs malformed JSON in `< 1ms` (`$0.00`) and compresses schemas by `60%–75%`.
- **Outer/Meta Loop Only (`factory_jev_evaluate_diff`):** Evaluates the 4 bounded predicates (`Choice | Score | Noul`) with mandatory `NOUL` abstention when context is insufficient. Never run JEV in the Inner Loop.

## 3. Fullstack, Pure Component & 3D Harness (`factory_run_local_commerce_rls_harness`)
- **Pure Component 5-State Stress:** Verifies `empty`, `loading`, `error-state`, `extreme-long-text-250chars`, and `dark-mode` (`ZeroOverlap: true`, `horizontalOverflowPx === 0`, `APCA Lc >= 60`).
- **Local Commerce & RLS Simulator:** Tests 2x duplicate Stripe/MercadoPago signed webhooks (`idempotency_key` deduplication, 0 double-spending), `tenant_alpha` vs `tenant_beta` (`HTTP 403`), `ES256` vs `alg: "none"`, 50 `fast-check` property vectors, `AST Diff-Oscillation Breaker`, and 3-timestamp 3D `<canvas>` histogram stability.
