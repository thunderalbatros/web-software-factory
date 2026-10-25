# Rule: Antigravity Argon Token Efficiency (11 Laws)

1. **Read `docs/STATE_PACKET.md` First:** On session start or task handoff, read `docs/STATE_PACKET.md` (`<=1.5 KB`) instead of full `docs/STATUS.md`.
2. **Omni-RAG v5 Before `read_file`:** Query `web-factory-omni-rag` (`omni_rag_query` / `code_graph_query`) to locate exact symbols and line numbers before opening large files.
3. **Surgical Line-Bounded Reads:** Always pass `StartLine` and `EndLine` (`<= 160` lines) to `read_file` when inspecting files `> 250` lines (`worker/index.js`, `index.html`, `site/css/style.css`). Never read full monolithic files repeatedly.
4. **Zero Raw JSON/Build Dumps in Terminal:** Never `cat`/`type`/`Get-Content` raw JSON snapshots (`data/*.json`, `dist/`) in `run_command`. Filter via `node -e` returning `<= 30` lines.
5. **Subagent Model Tiering:** Delegate multi-file exploration or log analysis via `invoke_subagent` with `Model: "flash"` or `"flash_lite"`, requesting a compact `<500`-word summary.
6. **Lean MCP Profile by Default:** Keep global MCP in `lean` profile (`web-factory-omni-rag` + `context7`). Only enable `research` or `full` profiles via `node tools/intelligence/toggle_mcp_profile.mjs` when explicitly required, and revert to `lean` afterward.
7. **Session Handoff at Turn 35:** When a conversation reaches 35–40 turns (or after completing a major milestone), update `docs/STATE_PACKET.md` and recommend `/compact` or a clean session handoff.
