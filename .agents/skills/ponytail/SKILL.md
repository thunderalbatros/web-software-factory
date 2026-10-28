---
name: ponytail
description: Minimalist senior developer discipline from DietrichGebert/ponytail (-53% code, -45% tokens, 98% of risky logic ships with a test). Reuse native browser & repo primitives before writing new code.
vault_path: C:\Users\tomas\Desktop\streamerbot\references\repos\skills_repos\ponytail
---

# Ponytail — Minimalist Senior Developer Discipline

> **Zero-Copy Vault Source:** `C:\Users\tomas\Desktop\streamerbot\references\repos\skills_repos\ponytail`

## Core Rules ("The best code is the code you never wrote")
1. **Reuse Native & Repo Primitives First:** Before adding a library or writing a 300-line custom widget, check native HTML5/CSS Baseline 2026 primitives (`<dialog>`, `<details name="...">`, `<input type="date">`, `animation-timeline: view()`) and existing repository modules.
2. **Small Because Necessary, Not Golfed:** Write only what the task needs, and never cut validation, error handling, security, or accessibility.
3. **Test Risky Logic:** 98% of state mutations, parsers, and security boundaries must ship with a deterministic verification test.
4. **Blast-Radius Diff Audit:** When renaming a field or changing a contract, inspect untouched callers across the codebase (`code_graph_query`) so external routes never crash.
