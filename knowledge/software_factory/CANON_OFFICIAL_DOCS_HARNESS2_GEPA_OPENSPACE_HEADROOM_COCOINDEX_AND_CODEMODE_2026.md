# CANON OFFICIAL DOCS: Harness2, GEPA, OpenSpace v2, Self-Harness, Headroom CCR, CocoIndex-Code, Chrome-DevTools-MCP, Agent Governance, Cloudflare CodeMode & Oxc (2026)

> **Epistemic Tier:** `TIER_1_SOTA_2026` (Authority Boost: `x1.35`)  
> **Source Vaults:** `sota-2026/self-evolving-2026/` & `sota-2026/final-frontier-2026/`  
> **Zero-Fluff Mandate:** Algorithmic primitives, JSON schemas, CLI flags, and deterministic harness invariants.

---

## 1. Local Vault Verification Summary (`self-evolving-2026` & `final-frontier-2026`)

| Repository & Cluster | Vault Status | Harvested Spec Files | Extracted Official Sections |
| :--- | :--- | :--- | :--- |
| `harness2` (`self-evolving-2026`) | VERIFIED_ON_DISK | `README.md, pyproject.toml` | Video overview • Contents • Harness components |
| `gepa` (`self-evolving-2026`) | VERIFIED_ON_DISK | `README.md, pyproject.toml` | What is GEPA? • Key Results • Installation |
| `OpenSpace` (`self-evolving-2026`) | VERIFIED_ON_DISK | `README.md, pyproject.toml` | OpenSpace: The Skill Management Layer for AI Agents • Why OpenSpace? |
| `self-harness` (`self-evolving-2026`) | VERIFIED_ON_DISK | `README.md, pyproject.toml` | Self-Harness • How it works • What it can do |
| `MASEval` (`self-evolving-2026`) | VERIFIED_ON_DISK | `README.md, pyproject.toml` | LLM-based Multi-Agent Evaluation & Benchmark Framework • Why MASEval? |
| `agent-benchmark` (`self-evolving-2026`) | VERIFIED_ON_DISK | `README.md` | agent-benchmark Documentation • Table of Contents • Overview |
| `evolving-agents` (`self-evolving-2026`) | VERIFIED_ON_DISK | `README.md` | Evolving Agents — the director • What it does • Who it is for |
| `headroom` (`final-frontier-2026`) | VERIFIED_ON_DISK | `llms.txt, README.md, pyproject.toml, Cargo.toml` | Headroom • Canonical docs (start here) • Install (copy-paste-runnable) |
| `cocoindex-code` (`final-frontier-2026`) | VERIFIED_ON_DISK | `README.md, package.json, pyproject.toml` | Get Started — zero config, let's go! • Install • Coding Agent Integration |
| `chrome-devtools-mcp` (`final-frontier-2026`) | VERIFIED_ON_DISK | `README.md, package.json` | Chrome DevTools for agents • Key features • Disclaimers |
| `agent-governance-toolkit` (`final-frontier-2026`) | VERIFIED_ON_DISK | `README.md` | Agent Governance Toolkit • Ship agents to production without losing sleep • The Problem |
| `context7` (`final-frontier-2026`) | VERIFIED_ON_DISK | `README.md, package.json` | Context7 - Up-to-date Docs for AI Agents |
| `agents` (`final-frontier-2026`) | VERIFIED_ON_DISK | `README.md, package.json` | Cloudflare Agents • Quick Example • Features |
| `zizmor` (`final-frontier-2026`) | VERIFIED_ON_DISK | `README.md, pyproject.toml, Cargo.toml` | License • Contributing • The name? |

---

## 2. `google-research/harness2` (`arXiv:2610.14224`) — Propose-Probe-Compose & 8 Harness Components

1. **Iterative Loop (`Propose -> Probe -> Compose`):**
   - **Propose:** Generate candidate artifact or skill mutation under explicit specification constraints (`SPEC.md`).
   - **Probe:** Execute deterministic empirical verifiers (`ast_guard.mjs`, `security_gate.mjs`, `eval_matrix.mjs`) producing structured diagnostic traces.
   - **Compose:** Retain Pareto-dominant mutations and synthesize cross-candidate improvements without human intervention.
2. **The 8 Canonical Harness Components:**
   - `(1) Spec Contract`, `(2) Context Budgeter`, `(3) Scoped Tool Router`, `(4) Sandbox Worktree`, `(5) Symbolic AST Probe`, `(6) Multi-Viewport Visual Probe`, `(7) Blind Independent Verifier`, `(8) Cryptographic Freeze Ledger`.

---

## 3. `gepa-ai/gepa` (`optimize_anything` + `CrossoverProposer` + `AdaMAST` Taxonomy)

- **Core API (`optimize_anything`):** Treats prompts, `SKILL.md` instructions, and routing policies as optimizable text parameters evaluated against a Pareto frontier of `(Score, LatencyMs, TokenCost)`.
- **`CrossoverProposer`:** Combines top-performing skill cards from complementary failure modes when a single mutation plateaus.
- **`AdaMAST` Failure Taxonomy (4 Root Causes):**
  1. `SPEC_AMBIGUITY`: Missing boundary condition in `SPEC.md`.
  2. `CONTEXT_STARVATION`: Required API signature absent from WARM/COLD context.
  3. `TOOL_MISROUTING`: Suboptimal MCP tool selected for the domain.
  4. `VERIFIER_BLINDSPOT`: Test assertion failed to catch a runtime edge case.

---

## 4. `HKUDS/OpenSpace v2` & `scarnyc/self-harness` (Signatures $\phi$ & Held-In / Held-Out Splits)

- **OpenSpace v2 Skill Quality Ledger (`.agents/memory/skill_quality_ledger.json`):**
  - Tracks `appliedRate`, `completionRate`, `fallbackRate`, and `avgTokenCost`, triggering `FIX` or `DERIVED` evolution when `fallbackRate > 0.15`.
- **Self-Harness Verification (`scarnyc/self-harness`):**
  - **Signature $\phi$:** Pre/post condition tuple $\phi = (P_{\text{pre}}, Q_{\text{post}}, I_{\text{inv}})$ verified before promoting any code or skill edit.
  - **Split Evaluation:** Candidates must score `100%` on both `held-in` (known regression suite) and `held-out` (`.agents/sealed_envelope_evals/hidden_acceptance_suite.json`, unreadable by Wave 2 builders).

---

## 5. `headroomlabs-ai/headroom` (`CCR` + `SmartCrusher` + `CodeCompressor` + `CacheAligner`)

- **Compresión Reversible (`Headroom CCR`):**
  - Persists full uncompressed payloads to `.cache/headroom_ccr/<sha256-16>.json` and injects a compact summary + `headroom_retrieve(hash)` pointer into the prompt context.
- **`SmartCrusher` (JSON):** Retains schema keys + first/last $K$ items + statistical aggregates on large arrays.
- **`CodeCompressor` (AST):** Extracts exported signatures and line ranges while eliding internal function bodies until requested.
- **`CacheAligner`:** Places immutable `HOT CONTEXT` (`AGENTS.md`, `CONSTRAINTS.md`) and `WARM CONTEXT` at the exact prefix start, isolating dynamic timestamps and query variables at the tail to maximize KV Prompt Cache hits.

---

## 6. `cocoindex-io/cocoindex-code` — Incremental AST Indexer & Call Graph (`< 50ms`)

- **Index Location:** `.agents/memory/codebase_ast_graph.json` (`tools/intelligence/codebase_ast_indexer.mjs`).
- **Incremental Fast-Path:** Compares file `mtimeMs`, `size`, and `SHA-256` hash; re-parses only modified files in `< 50ms`.
- **MCP Tool:** `search_codebase_ast({ query, symbolName, limit })` returns `exportedSymbols`, `signatures`, `startLine–endLine`, `calls`, and `calledByFiles` saving ~70% tokens over full file reads.

---

## 7. `ChromeDevTools/chrome-devtools-mcp`, `microsoft/agent-governance-toolkit`, `@cloudflare/codemode` & `oxc`

1. **`chrome-devtools-mcp`:** Headless CDP metrics (`JSHeapUsedSize`, `LayoutDuration`, `TaskDuration`, `RecalcStyleDuration`) and `Accessibility.getFullAXTree` in `tools/audit/visual_audit.mjs` and `ryux_design_gate.mjs`.
2. **`microsoft/agent-governance-toolkit` (`agent_governance_kernel.mjs`):** `< 0.1ms` policy check enforcing 10/10 `OWASP Agentic Top 10 (ASI01–ASI10)` and Role-Partitioned MCP routing (`verifyRoleMcpPermission`).
3. **`@cloudflare/agents` & `@cloudflare/codemode`:** Typed programmatic batch execution (`codemode_execute_batch`) and Durable Objects stateful agents with SQLite storage and WebSocket Hibernation.
4. **`oxc` Full Suite:** `oxlint` (`< 30ms` AST linter), `oxfmt` formatting check, `oxc-minify` dead-code elimination, and `tsgolint` promise/type hygiene.
5. **AI-TDD (*Building the Agentic Software Factory*):** Creator-Verifier Split where Wave 1 defines executable specs, Wave 2 builds under scoped permissions, and Wave 3A/3B verifies in `100% Read-Only` mode.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SPLE_ISO26550_AND_SOFTWARE_FACTORIES_ARCHITECTURE_2026]] · [[CANON_ASTRO5_CLOUDFLARE_WORKERS_AND_MODERN_WEB_TEMPLATES_2026]] · [[CANON_MULTI_BRAND_DESIGN_SYSTEMS_DTCG_STYLE_DICTIONARY_AND_ARCHETYPES_2026]] · [[CANON_SOTA_AGENT_TEAM_TOPOLOGY_AND_2026_WEB_STACK_AUDIT]] · #software_factory
