#!/usr/bin/env node
/**
 * tools/intelligence/agent_runner_adapter.mjs — Scoped Autonomous Execution Bridge (L-01)
 * =========================================================================================
 * Connects Wave 2 Beads DAG tasks with role prompts (`.agents/agency/roles/*.md`),
 * OWASP MCP role-wave permissions (`.agents/mcp/mcp_role_registry.json`), strict
 * `fileLocks` write containment, and `$0.00`-safe Vertex/Gemini or deterministic local synthesis.
 * =========================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { verifyRoleMcpPermission } from './agent_governance_kernel.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const ROOT = path.resolve(__dirname, '..', '..');

const IMMUTABLE_AND_SEALED_PATHS = [
  '.agents/sealed_envelope_evals/',
  '.agents/memory/constitution_lock.json',
  'AGENTS.md',
  'CONSTRAINTS.md'
];

function toPosixRelative(targetPath, baseDir = ROOT) {
  const raw = String(targetPath || '').trim();
  const normalizedInput = raw.replace(/\\/g, '/').replace(/^\.\//, '');
  if (
    !path.isAbsolute(raw) &&
    /^(?:projects|templates|tools|tokens|knowledge|\.agents|\.specify)\//.test(normalizedInput)
  ) {
    return path.relative(ROOT, path.resolve(ROOT, normalizedInput)).replace(/\\/g, '/');
  }
  const abs = path.isAbsolute(raw) ? path.resolve(raw) : path.resolve(baseDir, raw);
  return path.relative(ROOT, abs).replace(/\\/g, '/');
}

/**
 * Validates that a candidate write path stays strictly inside the Bead node's `fileLocks`
 * and never touches sealed evaluation envelopes or immutable constitution files.
 */
export function validateFileLockContainment(targetPath, allowedLocks = [], projectRoot = ROOT) {
  const rel = toPosixRelative(targetPath, projectRoot);
  if (!rel || rel.startsWith('..') || path.isAbsolute(rel)) {
    return { allowed: false, normalizedTarget: rel, matchedLock: null, reason: 'PATH_ESCAPES_FACTORY_ROOT' };
  }

  for (const blocked of IMMUTABLE_AND_SEALED_PATHS) {
    if (rel === blocked || rel.startsWith(blocked)) {
      return { allowed: false, normalizedTarget: rel, matchedLock: null, reason: 'SEALED_OR_IMMUTABLE_PATH_BLOCKED' };
    }
  }

  const normalizedLocks = (Array.isArray(allowedLocks) ? allowedLocks : [])
    .map((l) => String(l || '').replace(/\\/g, '/').replace(/^\.\//, ''))
    .filter(Boolean);

  const matchedLock = normalizedLocks.find((lock) => rel === lock || (lock.endsWith('/') && rel.startsWith(lock)));
  if (!matchedLock) {
    return { allowed: false, normalizedTarget: rel, matchedLock: null, reason: 'OUTSIDE_BEAD_FILE_LOCKS' };
  }

  return { allowed: true, normalizedTarget: rel, matchedLock };
}

/**
 * Executes a scoped Bead node synthesis step with strict role + fileLock + MCP enforcement.
 */
export async function executeScopedBeadNode({
  beadNode = {},
  projectSlug = 'agencia-alfa',
  projectDir = path.join(ROOT, 'projects', projectSlug),
  lane = 'STANDARD',
  dryRun = true,
  specExcerpt = ''
} = {}) {
  const t0 = performance.now();
  const role = beadNode.role || 'senior-coder';
  const beadId = beadNode.id || 'bead-unknown';
  const fileLocks = Array.isArray(beadNode.fileLocks) && beadNode.fileLocks.length > 0
    ? beadNode.fileLocks
    : [`projects/${projectSlug}/index.html`];

  const rolePromptPath = path.join(ROOT, '.agents', 'agency', 'roles', `${role}.md`);
  const rolePromptExists = fs.existsSync(rolePromptPath);

  const lockChecks = fileLocks.map((lockPath) => validateFileLockContainment(lockPath, fileLocks, projectDir));
  const fileLocksVerified = lockChecks.length > 0 && lockChecks.every((c) => c.allowed);
  if (!fileLocksVerified) {
    return {
      ok: false,
      mode: 'blocked',
      beadId,
      role,
      fileLocksVerified: false,
      reason: lockChecks.find((c) => !c.allowed)?.reason || 'FILE_LOCK_CONTAINMENT_FAILURE',
      latencyMs: Number((performance.now() - t0).toFixed(2))
    };
  }

  const mcpCheck = verifyRoleMcpPermission({
    roleId: role,
    mcpServer: 'filesystem-scoped',
    toolName: 'filesystem_scoped_write',
    targetPath: lockChecks[0].normalizedTarget
  });

  let mode = 'deterministic-zero-cost';
  let synthesisSummary = `Scoped ${role} execution plan for ${beadId} on [${fileLocks.join(', ')}] (lane=${lane}).`;

  if (process.env.FACTORY_ENABLE_LLM_SYNTHESIS === 'true' && !dryRun) {
    try {
      const { generateWithVertex } = await import('./vertex_ai_bridge.mjs');
      if (typeof generateWithVertex === 'function') {
        const roleBody = rolePromptExists ? fs.readFileSync(rolePromptPath, 'utf8').slice(0, 1200) : role;
        const llmRes = await generateWithVertex(
          `${roleBody}\n\nTask (${beadId}, lane=${lane}): ${beadNode.title || ''}\nAllowed files: ${fileLocks.join(', ')}\nSpec: ${specExcerpt.slice(0, 800)}`,
          { maxOutputTokens: 400 }
        );
        if (llmRes?.text) {
          mode = 'vertex-llm';
          synthesisSummary = llmRes.text.slice(0, 1200);
        }
      }
    } catch (_) {
      mode = 'deterministic-zero-cost';
    }
  }

  const record = {
    ok: true,
    mode,
    beadId,
    role,
    rolePromptLoaded: rolePromptExists,
    mcpWritePermitted: Boolean(mcpCheck?.allowed),
    fileLocksVerified: true,
    allowedFiles: lockChecks.map((c) => c.normalizedTarget),
    summary: synthesisSummary,
    latencyMs: Number((performance.now() - t0).toFixed(2))
  };

  if (!dryRun && fs.existsSync(projectDir)) {
    const runsDir = path.join(projectDir, '.specify', 'runs');
    fs.mkdirSync(runsDir, { recursive: true });
    fs.writeFileSync(path.join(runsDir, `${beadId}.synthesis.json`), JSON.stringify(record, null, 2), 'utf8');
  }

  return record;
}
