#!/usr/bin/env node
/**
 * Antigravity Native Token Guard Hook (.agents/hooks.json)
 * Implements Antigravity's official camelCase stdin/stdout Hook Contract:
 * 1. PreInvocation: Tracks turn count per conversationId in .cache/agy_session_turns.json.
 *    At turn 35 (and every 10 turns thereafter), injects a concise ephemeralMessage
 *    reminding the agent to update docs/STATE_PACKET.md and suggest /compact (Ley 4).
 * 2. PreToolUse (run_command): Blocks accidental full-file dumps of massive JSON/SQLite
 *    files into stdout so a single terminal call never burns 50,000+ context tokens.
 */

import fs from "node:fs";
import path from "node:path";

const WORKSPACE_DIR = "c:\\Users\\tomas\\Desktop\\streamerbot";
const CACHE_DIR = path.join(WORKSPACE_DIR, ".cache");
const TURN_LEDGER_PATH = path.join(CACHE_DIR, "agy_session_turns.json");

function readStdinJson() {
  try {
    const raw = fs.readFileSync(0, "utf8");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function trackTurn(conversationId, invocationNum) {
  try {
    if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });
    let ledger = {};
    if (fs.existsSync(TURN_LEDGER_PATH)) {
      ledger = JSON.parse(fs.readFileSync(TURN_LEDGER_PATH, "utf8"));
    }
    const id = conversationId || "default";
    const prev = ledger[id]?.turns || 0;
    const current = typeof invocationNum === "number" && invocationNum > 0 ? invocationNum : prev + 1;
    ledger[id] = { turns: current, updatedAt: new Date().toISOString() };
    fs.writeFileSync(TURN_LEDGER_PATH, JSON.stringify(ledger, null, 2), "utf8");
    return current;
  } catch {
    return 0;
  }
}

function main() {
  const event = readStdinJson();
  const eventName = event.hookEventName || "";

  if (eventName === "PreInvocation") {
    const turn = trackTurn(event.conversationId, event.invocationNum);
    if (turn === 35 || (turn > 35 && (turn - 35) % 10 === 0)) {
      process.stdout.write(JSON.stringify({
        ephemeralMessage: `[FinOps Token Guard — Turno ${turn}] La sesión superó los 35 turnos (Ley 4). Al cerrar este paso, actualizá docs/STATE_PACKET.md (<=1.5 KB) y recomendá /compact o iniciar sesión limpia.`
      }));
      process.exit(0);
    }
    process.stdout.write(JSON.stringify({}));
    process.exit(0);
  }

  if (eventName === "PreToolUse" && event.toolName === "run_command") {
    const cmd = String(event.toolInput?.CommandLine || "");
    const dangerousDumpRegex = /\b(cat|type|Get-Content)\b.*(slot_dna_50spin_matrix|live_casino_intel_snapshot|sniper_50spin_snapshot|slots_3400_enriched|omni_rag_v5\.sqlite)/i;
    if (dangerousDumpRegex.test(cmd)) {
      process.stdout.write(JSON.stringify({
        hookSpecificOutput: {
          hookEventName: "PreToolUse",
          permissionDecision: "deny",
          permissionDecisionReason: "Blocked raw dump of massive dataset file into terminal stdout (Token Guard Ley 3). Use a surgical node -e script with slice(0, 10) instead."
        }
      }));
      process.exit(0);
    }
  }

  process.stdout.write(JSON.stringify({}));
  process.exit(0);
}

main();
