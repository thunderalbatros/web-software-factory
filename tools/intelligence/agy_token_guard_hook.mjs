#!/usr/bin/env node
/**
 * Antigravity Native Token Guard Hook (.agents/hooks.json)
 * =============================================================================
 * Guards against context-window bloat across two hook stages:
 *   1. PreInvocation: Tracks turn count per conversationId in `.cache/agy_session_turns.json`
 *      and emits a concise compact reminder starting at turn 35.
 *   2. PreToolUse (run_command): Blocks unbounded raw file dumps (`cat`, `type`,
 *      `Get-Content`, `gc`) of multi-megabyte JSON/SQLite artifacts unless bounded.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');
const CACHE_DIR = path.join(ROOT, '.cache');
const TURN_LEDGER_PATH = path.join(CACHE_DIR, 'agy_session_turns.json');

const HEAVY_ARTIFACT_REGEX =
  /(omni_rag_fts5\.sqlite|omni_rag_v5\.sqlite|codebase_ast_graph\.json|code_and_wiki_graph\.json|knowledge_index\.json|package-lock\.json|sbom_cyclonedx\.json)/i;
const RAW_DUMP_CMD_REGEX = /\b(cat|type|Get-Content|gc)\b/i;
const BOUNDED_FILTER_REGEX = /\b(Select-Object\s+-First|head\b|tail\b|rg\b|Select-String|node\b)/i;

function readStdinJson() {
  try {
    const raw = fs.readFileSync(0, 'utf8').trim();
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function trackTurn(conversationId, invocationNum) {
  try {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    let ledger = {};
    if (fs.existsSync(TURN_LEDGER_PATH)) {
      ledger = JSON.parse(fs.readFileSync(TURN_LEDGER_PATH, 'utf8'));
    }
    const id = conversationId || 'default';
    const prev = ledger[id]?.turns || 0;
    const current = typeof invocationNum === 'number' && invocationNum > 0 ? invocationNum : prev + 1;
    ledger[id] = { turns: current, updatedAt: new Date().toISOString() };
    fs.writeFileSync(TURN_LEDGER_PATH, JSON.stringify(ledger, null, 2), 'utf8');
    return current;
  } catch {
    return 0;
  }
}

/**
 * Evaluates a hook payload cleanly without terminating the caller process.
 */
export function evaluateTokenGuardPayload(event = {}) {
  const eventName = event?.hookEventName || '';

  if (eventName === 'PreInvocation') {
    const turn = trackTurn(event.conversationId, event.invocationNum);
    if (turn === 35 || (turn > 35 && (turn - 35) % 10 === 0)) {
      return {
        decision: 'approve',
        hookOutput: {
          ephemeralMessage: `[FinOps Token Guard - Turn ${turn}] Session exceeded 35 turns. Consider running /compact or persisting state before continuing.`
        }
      };
    }
    return { decision: 'approve', hookOutput: {} };
  }

  const command = String(
    event?.toolInput?.CommandLine ||
      event?.tool_input?.command ||
      event?.tool_input?.CommandLine ||
      event?.command ||
      ''
  );

  if (
    command &&
    RAW_DUMP_CMD_REGEX.test(command) &&
    HEAVY_ARTIFACT_REGEX.test(command) &&
    !BOUNDED_FILTER_REGEX.test(command)
  ) {
    const reason =
      'Blocked unbounded dump of heavy factory artifact into stdout. Use rg, Select-Object -First, or a surgical node script instead.';
    return {
      decision: 'block',
      reason,
      hookOutput: {
        decision: 'block',
        reason,
        hookSpecificOutput: {
          hookEventName: eventName || 'PreToolUse',
          permissionDecision: 'deny',
          permissionDecisionReason: reason
        }
      }
    };
  }

  return { decision: 'approve', hookOutput: { decision: 'approve' } };
}

function main() {
  const event = readStdinJson();
  const result = evaluateTokenGuardPayload(event);
  process.stdout.write(JSON.stringify(result.hookOutput));
  process.exit(0);
}

const isEntrypoint =
  Boolean(process.argv[1]) && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (isEntrypoint) {
  main();
}

