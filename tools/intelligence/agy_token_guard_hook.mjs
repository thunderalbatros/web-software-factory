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
import { resolveRolePrivilegeRing } from './agent_governance_kernel.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');
const CACHE_DIR = path.join(ROOT, '.cache');
const DEFAULT_TURN_LEDGER_PATH = path.join(CACHE_DIR, 'agy_session_turns.json');

const HEAVY_ARTIFACT_REGEX =
  /(omni_rag_fts5\.sqlite|omni_rag_v5\.sqlite|codebase_ast_graph\.json|code_and_wiki_graph\.json|knowledge_index\.json|package-lock\.json|sbom_cyclonedx\.json|data[\\/]academy[\\/][^\\/\s"'`]+\.json|dist[\\/]pagefind[\\/]|dist[\\/]_astro[\\/]|llms-full\.txt)/i;
const RAW_DUMP_CMD_REGEX = /\b(cat|type|Get-Content|gc)\b/i;
const INLINE_NODE_EVAL_REGEX = /\bnode\s+(?:-[a-z]*[ep]|--eval|--print)\b/i;
const BOUNDED_FILTER_REGEX = /\b(Select-Object\s+-First|head\b|tail\b|rg\b|Select-String)\b/i;
const BOUNDED_NODE_SLICE_REGEX = /\.slice\s*\(\s*0\s*,\s*\d{1,4}\s*\)/i;

const WRITE_OR_DELETE_TOOLS = new Set([
  'write_file',
  'edit_file',
  'delete_file',
  'write_to_file',
  'replace_file_content',
  'multi_replace_file_content',
  'patch_file'
]);

const PROTECTED_PATH_REGEX =
  /^(?:AGENTS\.md|CONSTRAINTS\.md|\.agents\/memory\/constitution_lock\.json|knowledge\/ai_academy\/CANON_[^/]+\.md)$/i;
const PROTECTED_CMD_NAME_REGEX =
  /(?:\bAGENTS\.md\b|\bCONSTRAINTS\.md\b|\.agents[\\/]memory[\\/]constitution_lock\.json|knowledge[\\/]ai_academy[\\/]CANON_[^\\/\s"'`]+\.md|\bCANON_[A-Z0-9_]+\.md\b)/i;
const CMD_MUTATION_REGEX =
  /(?:>>?|Set-Content|Add-Content|Out-File|Remove-Item|\brm\b|\bdel\b|\bErase\b|\bmv\b|\bMove-Item\b|\bCopy-Item\b|fs\.(?:writeFile|writeFileSync|rm|rmSync|unlink|unlinkSync|appendFile|appendFileSync|truncate)|git\s+(?:checkout\s+--|commit|push|reset|rebase|rm))/i;

function readStdinJson() {
  try {
    const raw = fs.readFileSync(0, 'utf8').trim();
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function getTurnLedgerPath(env = process.env) {
  const custom = env?.AGY_TURN_LEDGER_PATH || process.env.AGY_TURN_LEDGER_PATH;
  return custom ? path.resolve(custom) : DEFAULT_TURN_LEDGER_PATH;
}

function trackTurn(conversationId, invocationNum, env = process.env) {
  try {
    const ledgerPath = getTurnLedgerPath(env);
    fs.mkdirSync(path.dirname(ledgerPath), { recursive: true });
    let ledger = {};
    if (fs.existsSync(ledgerPath)) {
      ledger = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));
    }
    const id = conversationId || 'default';
    const prev = ledger[id]?.turns || 0;
    const current = typeof invocationNum === 'number' && invocationNum > 0 ? invocationNum : prev + 1;
    ledger[id] = { turns: current, updatedAt: new Date().toISOString() };
    fs.writeFileSync(ledgerPath, JSON.stringify(ledger, null, 2), 'utf8');
    return current;
  } catch {
    return 0;
  }
}

function makeBlockResult(reason, eventName = 'PreToolUse') {
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

function normalizeCandidateTarget(rawPath = '') {
  const clean = String(rawPath || '').trim();
  if (!clean) return '';
  if (path.isAbsolute(clean)) {
    const rel = path.relative(ROOT, clean).replace(/\\/g, '/');
    return rel.replace(/^\.\//, '');
  }
  return clean.replace(/\\/g, '/').replace(/^\.\//, '');
}

/**
 * Evaluates a hook payload cleanly without terminating the caller process.
 */
export function evaluateTokenGuardPayload(event = {}, env = process.env) {
  const eventName = event?.hookEventName || '';

  if (eventName === 'PreInvocation') {
    const turn = trackTurn(event.conversationId, event.invocationNum, env);
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

  const toolName = String(event?.toolName || event?.tool_name || '').trim();
  const toolInput = event?.toolInput || event?.tool_input || {};
  const command = String(
    toolInput?.CommandLine || toolInput?.command || event?.command || ''
  );
  const rawTarget = String(
    toolInput?.TargetFile ||
      toolInput?.Path ||
      toolInput?.path ||
      toolInput?.file_path ||
      toolInput?.targetFile ||
      event?.targetFile ||
      ''
  );
  const normalizedTarget = normalizeCandidateTarget(rawTarget);
  const isWriteOrDeleteTool = WRITE_OR_DELETE_TOOLS.has(toolName.toLowerCase());

  // 1. Unconditional write/delete block over the 7 protected constitutional/canon files
  if (isWriteOrDeleteTool && PROTECTED_PATH_REGEX.test(normalizedTarget)) {
    return makeBlockResult(
      `PROTECTED_CONSTITUTION_OR_CANON_BLOCKED: Refusing '${toolName}' on protected file '${normalizedTarget}'.`,
      eventName
    );
  }
  if (command && CMD_MUTATION_REGEX.test(command) && PROTECTED_CMD_NAME_REGEX.test(command)) {
    return makeBlockResult(
      'PROTECTED_CONSTITUTION_OR_CANON_BLOCKED: Refusing shell mutation against protected constitution/canon files.',
      eventName
    );
  }

  // 2. Physical write/delete block when FACTORY_AGENT_ROLE maps to a read-only ring (`canWriteWorkspace: false`)
  const activeRole = String((env?.FACTORY_AGENT_ROLE ?? process.env.FACTORY_AGENT_ROLE) || '')
    .trim()
    .toLowerCase();
  if (activeRole) {
    const ring = resolveRolePrivilegeRing(activeRole);
    if (!ring.canWriteWorkspace && (isWriteOrDeleteTool || (command && CMD_MUTATION_REGEX.test(command)))) {
      return makeBlockResult(
        `READONLY_AGENT_ROLE_BLOCKED: Active role '${activeRole}' (${ring.ringName}) has canWriteWorkspace=false and cannot execute '${toolName || 'mutating_command'}'.`,
        eventName
      );
    }
  }

  // 3. Heavy artifact & unbounded `node -e` dump guard
  if (
    command &&
    RAW_DUMP_CMD_REGEX.test(command) &&
    HEAVY_ARTIFACT_REGEX.test(command) &&
    !BOUNDED_FILTER_REGEX.test(command)
  ) {
    return makeBlockResult(
      'Blocked unbounded dump of heavy factory artifact into stdout. Use rg, Select-Object -First, or a surgical bounded script instead.',
      eventName
    );
  }

  if (
    command &&
    INLINE_NODE_EVAL_REGEX.test(command) &&
    HEAVY_ARTIFACT_REGEX.test(command) &&
    !BOUNDED_NODE_SLICE_REGEX.test(command)
  ) {
    return makeBlockResult(
      'Blocked unbounded inline node -e/-p read of heavy academy/dist artifact into stdout.',
      eventName
    );
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

