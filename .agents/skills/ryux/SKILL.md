---
name: ryux
description: "RYUX - design intelligence for AI agents and designers. Tell it what you are doing and it routes to Analyze (understand an existing interface), Design (create or improve UI and UX in Figma, pen.dev, or mockups), Build (implement in code), Critique (find what to change first, with evidence, or run a heuristic evaluation), or QA (verify a build against the design), reads only the knowledge the task needs (product, UX, UI, interaction, forms, content, accessibility, responsive, design system, frontend, anti-slop), and closes with quality gates. Use for any UI, UX, copy, frontend, design review, or design analysis task, and for product visuals: illustration, 3D, imagery, icons, and motion, even when the request does not name RYUX."
---

# RYUX

> Design intelligence for AI agents and designers. RYUX 2.14.2, MIT licensed.

RYUX is a design intelligence layer for AI and designers. It helps understand, reason, design,
build, critique, and verify interfaces using design knowledge and evidence. It is not a UI
generator, an anti-slop framework, a design system, or a prompt library.

**Understand before you design. Don't design from imagination when evidence is available.**

```
Understand → Frame → Explore → Evaluate and select → Build and critique → Verify and deliver → done
```

## Start with what you are doing

Tell RYUX what you are doing; RYUX decides what it needs to know (no task named: offer three concrete tasks for this project as choices,
from DESIGN.md and the repo's screens). Pick the entry point, read its file, then only the knowledge modules the task needs (task table below); paths are relative to this skill's folder.

| Entry point | When | Read |
| --- | --- | --- |
| **Analyze** | understand a screen, product, or flow that exists | `capabilities/analyze.md` |
| **Design** | create or improve UI and UX without code: Figma, pen.dev, mockups, copy | `capabilities/design.md` |
| **Build** | implement or change the interface in code | `capabilities/build.md` |
| **Critique** | find what should change first, and why; a heuristic evaluation | `capabilities/critique.md` |
| **QA** | verify a build against the intended design | `capabilities/qa.md` |

Knowledge modules (`knowledge/`): product, ux, interaction, forms, edge-cases, content, ui, imagery (images, motion,
illustration, expressive surfaces), design-system, accessibility, responsive, frontend, and anti-slop. Evidence comes from the brief, the
project, product data, standards, and the ryux MCP when connected; none is required. Every entry point ends at the quality gates: the Hard
Gates below and the Delivery Gate, with anti-slop as the last check, never the starting point. Keep them apart:
Analyze says what exists, Design what to do, Critique if it is right, QA if it matches.

## How RYUX works

One workflow, six stages; each entry point runs the stages it needs.

1. **Understand**: who, what task, which product and market (RX-PR-01). Read the RYUX project
   context in DESIGN.md, then the product docs (Product docs paths, else PRD.md, docs/prd*,
   docs/product*, README), and name what you read. Separate facts, assumptions, and unknowns
   (RX-PR-02); ask and record direction as in capabilities/design.md, stage 1. DESIGN.md is
   direction, not evidence. Read the entry point's file and only the modules the task table lists.
2. **Frame**: the user's task, the flow, what must be seen first, the primary action, and three to
   five success criteria from the brief, written before any alternative exists.
3. **Explore**: on a new or complex surface, two or three alternatives that differ in hypothesis and
   structure, not paint; reference screens through the ryux MCP when connected. A small change skips it.
4. **Evaluate and select**: rate the alternatives against the Frame criteria with evidence
   (RX-PR-09, RX-PR-10); the user picks from options (capabilities/design.md); write the Decision Receipt.
5. **Build and critique**: design or implement the choice, render, inspect, and fix; Reconsider an
   unchosen alternative when a finding contradicts the choice, and say why.
6. **Verify and deliver**: Hard Gates, the Delivery Gate, honest claims, and a user test plan (RX-UX-12).

Analyze runs 1. Design runs 1-6. Build runs 1, 5, and 6 (2-4 through Design when no design exists).
Critique runs 1 and the critique half of 5. QA runs 6. Never go from "generate" straight to "done".

## Principle

Novelty is not a goal; a recognisable brand layer is: familiar structure, distinct surface.
Optimize for clarity, usability, consistency, product fit, accessibility, and intentional decisions.
Understand the context first; keep observed facts apart from assumptions; prefer evidence over

---

## Progressive Disclosure Reference
For the complete reference catalog, extended examples, and deep edge cases, read [references/full-guide.md](file:///c:/Users/tomas/Desktop/streamerbot/.agents/skills/ryux/references/full-guide.md).
