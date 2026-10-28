---
name: arena-skill
description: Competitive bracket elimination protocol from Jakeschincariol/arena-skill (Attack -> Defend -> Judge rubric: Correctness 30, Completeness 25, Robustness 20, Specificity 15, Clarity 10).
vault_path: C:\Users\tomas\Desktop\streamerbot\references\agent-arsenal\arena-skill
---

# Arena Skill — Competitive Bracket Elimination & Rubric Judging

> **Zero-Copy Vault Source:** `C:\Users\tomas\Desktop\streamerbot\references\agent-arsenal\arena-skill`

## Tournament Protocol (`runArenaTournament` in `agent_squad.mjs`)
1. **Strategy Card Diversity:** Candidates attack the problem using orthogonal reasoning modes (*First Principles*, *Inversion/Adversarial*, *Constraint-First*, *Simplest Native Primitive*).
2. **Attack & Defend Phase:** Each candidate solution is probed for `FATAL`, `MAJOR`, or `MINOR` flaws; candidates revise to fix conceded flaws.
3. **Blind Rubric Judge (100 pts):**
   - **Correctness (30 pts)**
   - **Completeness against Spec (25 pts)**
   - **Robustness to Adversarial Attacks (20 pts)**
   - **Specificity (15 pts)**
   - **Clarity (10 pts)**
   - *Hard Rule:* A candidate with a verified `FATAL` flaw cannot beat one without.
