---
name: deterministic-xstate-and-jev-memory
description: Operates the XState v5 & Stately (@statelyai/agent) deterministic agent & UI statechart engines, Harel Statecharts (hierarchy, orthogonality, broadcast, history, invariant sentinels), Burr-style immutable action reducers, and the 5-Tier Cognitive Memory Pipeline governed by JEV (Write-Gate admission + Sleep-Time Consolidation + ACT-R/Ebbinghaus decay + Zep/Graphiti bi-temporal edges).
---

# Deterministic XState v5 / Stately Agent Statecharts & JEV 5-Tier Cognitive Memory Pipeline (`v38`)

> **Core Philosophy (David Khourshid, Agent Conf 2026 — *"Goodbye Slop; Welcome Determinism"*):**
> *"Determinism at the Center, Non-Determinism at the Edges."*
> Never encode hard business rules, workflow transitions, human approval gates, or memory admission policies inside unstructured prompt loops (`while (true)`). Express the workflow as an explicit **Harel Statechart (`XState v5`)** where rules are pure boolean `guards`, human approvals are idle states (`meta: { actor: "human" }`), invariants are enforced via `always` transitions into **`SENTINEL:`** states, and memory writes are governed by **JEV (`BoundaryML / BAML Schema-Aligned Parsing`)**.

---

## 1. Pillar 1: 5-Tier Cognitive Memory Pipeline Governed by JEV (`tools/intelligence/jev_memory_pipeline.mjs`)

### 1.1 The 5 Cognitive Memory Tiers
1. **Tier 1 — Working Memory (`RAM / Scratchpad`):**
   - Active task context (`< 4,000` tokens), bounded via `finops_context_budget.mjs` and `Headroom CCR`.
2. **Tier 2 — Episodic Memory (`.agents/memory/episodic_build_ledger.jsonl`):**
   - Append-only JSONL ledger of raw build runs, QA gate outcomes, CTO feedback items, and statechart transitions.
3. **Tier 3 — Semantic Memory (`SQLite FTS5` + `.agents/memory/jev_semantic_graph.json`):**
   - Consolidated, deduplicated facts (`1.00x` zero duplicates) enriched with **Zep/Graphiti Bi-Temporal Metadata** (`t_valid`, `t_invalid`, `t_created`, `t_expired`) and **HippoRAG Personalized PageRank (PPR)** associative links.
4. **Tier 4 — Procedural Memory (`.agents/memory/instincts_ledger.json` & `.agents/skills/`):**
   - Executable heuristics, **ACT-R (`Anderson, 2004`) Base-Level Activation** utility scores (`B_i = ln(\sum t_k^{-d})`), and **ReMe** procedural evolution (prune stale rules when utility drops below threshold).
5. **Tier 5 — Associative & Prospective Memory (`.agents/beads/tasks.json` + `BRAND_IDENTITY_LOCK.json`):**
   - Future intentions, blocked tasks, and project-scoped brand locks isolated per `projectSlug`.

### 1.2 JEV Write-Gate & Sleep-Time Consolidation
- **Write-Gate Admission (`evaluateMemoryWriteAdmissionWithJev`):**
  Before any fact or feedback enters Tier 3 (`Semantic`) or Tier 4 (`Procedural`), `jev_semantic_gate.mjs` (`MEMORY_PIPELINE_WRITE_GATE`) classifies it into one of 5 deterministic actions:
  - `COMMIT_GLOBAL_INVARIANT` — Reusable cross-project engineering or design law (`salience >= 0.72`).
  - `ISOLATE_TO_PROJECT_SCOPE` — Client-specific palette, copy, or domain rule; locked strictly to `projects/<slug>/` to prevent **Cross-Project Brand Contamination**.
  - `SUPERSEDE_CONFLICTING_FACT` — Updates an existing rule by setting `t_invalid = now` on the old edge and inserting the new edge with `t_valid = now`.
  - `DROP_TRANSIENT_NOISE` — Ephemeral log noise discarded before indexing.
  - `QUARANTINE_POISONING_RISK` — Blocks attempts to weaken `CONSTRAINTS.md` (`APCA Lc >= 75`, `LCP <= 1800ms`, `CLS <= 0.02`, `SARIF = 0`).
- **Sleep-Time Consolidation (`runJevSleepTimeConsolidationCycle`):**
  - Triggered at `npm run cto:aterrizar` (`handleAterrizar`) or `npm run cto:memoria-jev`.
  - Compresses episodic trajectories into semantic/procedural rules, recalculates ACT-R utilities, and maintains `1.00x` zero-duplicate hygiene in `.cache/omni_rag_fts5.sqlite`.

---

## 2. Pillar 2: Deterministic Agent & UI Statecharts (`tools/orchestrator/deterministic_agent_statechart.mjs`)

### 2.1 `@statelyai/agent` Environment-vs-Policy Split
- **Environment (`factoryLifecycleMachine`):**
  - Built with `setup({ types, guards, actions }).createMachine(...)` from `xstate` v5.
  - Owns all 11 lifecycle states (`IDLE_UNINITIALIZED` -> `SCAFFOLDED_PENDING_PRD` -> `PRD_APPROVED_PENDING_SPEC` -> `SPEC_APPROVED_READY_TO_BUILD` -> `BUILDING_TOKENS_AND_MORPHOLOGY` -> `BUILDING_PRIMITIVES_AND_ASSETS` -> `RUNNING_QUALITY_GATES` -> `GATE_FAILED_REMEDIATION_LOOP` -> `AWAITING_CTO_VISUAL_REVIEW` -> `APPLYING_CTO_FEEDBACK` -> `PRODUCTION_LOCKED_DELIVERED`) plus 2 **Invariant Sentinels**:
    - `SENTINEL_BUDGET_AND_RETRY_EXHAUSTED` (`retryCount > maxRetries || budgetRemainingUsd <= 0`)
    - `SENTINEL_UNAPPROVED_INTERVIEW_BYPASS` (attempted build without approved interviews #1 and #2)
- **Policy (`validateAgentPolicyProposal`):**
  - Verifies every proposed agent event against `snapshot.can(event)`.
  - Rejects any agent attempt to trigger transitions marked `meta: { actor: "human" }` (`CTO_APPROVE_PRD`, `CTO_APPROVE_SPEC`, `CTO_SUBMIT_FEEDBACK`, `CTO_APPROVE_DELIVERY`).

### 2.2 Client-Side Deterministic UI Statecharts (`site/js/industry-interactive.js`)
- Every interactive industry widget (Pricing Simulator, ROI Calculator, Booking Stepper, Clinical Filter, Cart Drawer) is governed by `createUiStateMachine` (`idle -> computing -> settled | error`) instead of loose boolean flags (`isLoading`, `isError`), synchronizing `[data-ui-state]` and `aria-busy` deterministically on the DOM.

---

## 3. CLI & MCP Commands
- `npm run cto:memoria-jev -- --project <slug>` — Run JEV Memory Write-Gate & Sleep-Time Consolidation on a project.
- `npm run cto:statechart -- --project <slug>` — Inspect and verify the XState v5 persisted snapshot (`projects/<slug>/.specify/statechart_snapshot.json`).
- **MCP Tools (`web-factory-omni-rag`):**
  - `jev_memory_pipeline_gate`
  - `xstate_validate_transition`
