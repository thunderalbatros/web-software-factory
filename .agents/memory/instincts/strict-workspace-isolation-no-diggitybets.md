---
id: strict-workspace-isolation-no-diggitybets
trigger: "when the user mentions diggitybets.vip, Kick tournament predictions, or streamerbot application fixes inside web-software-factory"
confidence: 1.0
domain: workspace-governance
source: cto-explicit-directive-2026-10-27
---

# Strict Workspace Isolation — Zero Relationship Between `web-software-factory` and `diggitybets.vip` (`streamerbot`)

## Context & Rule
- `C:\Users\tomas\Desktop\web-software-factory` is an independent Multi-Project Web Software Factory Studio dedicated exclusively to the software factory itself and the future websites created with it.
- It has **zero operational or product relationship** with `diggitybets.vip` (`C:\Users\tomas\Desktop\streamerbot`). Only the read-only open-source SOTA reference vault (`C:\Users\tomas\Desktop\streamerbot\references\`) is indexed in Zero-Copy mode when explicitly requested for factory knowledge extraction.

## Mandatory Action on Accidental Cross-Project Prompts
- If the user ever accidentally sends a prompt in this workspace referring to `diggitybets.vip`, Kick stream overlays, or `streamerbot` runtime issues:
  1. **STOP IMMEDIATELY (Freno Total).**
  2. **Do NOT modify, build, or deploy any file in `C:\Users\tomas\Desktop\streamerbot`.**
  3. **Inform the user immediately** in Argentine Spanish that this workspace is `web-software-factory` and ask them to switch to the `streamerbot` workspace if they intended to work on `diggitybets.vip`.
