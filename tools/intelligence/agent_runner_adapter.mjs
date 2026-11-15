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
import { resolveRolePrivilegeRing, verifyRoleMcpPermission } from './agent_governance_kernel.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const ROOT = path.resolve(__dirname, '..', '..');

const IMMUTABLE_AND_SEALED_PATHS = [
  '.agents/sealed_envelope_evals/',
  '.agents/memory/constitution_lock.json',
  'AGENTS.md',
  'CONSTRAINTS.md',
  'knowledge/ai_academy/CANON_'
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
 * Validates that a candidate write path stays strictly inside the Bead node's `fileLocks`,
 * has an active non-expired lease (when `leaseExpiresAt` is supplied), and never touches
 * sealed evaluation envelopes or immutable constitution/canon files.
 */
export function validateFileLockContainment(targetPath, allowedLocks = [], projectRoot = ROOT, options = {}) {
  const rel = toPosixRelative(targetPath, projectRoot);
  if (!rel || rel.startsWith('..') || path.isAbsolute(rel)) {
    return {
      ok: false,
      allowed: false,
      normalizedTarget: rel,
      matchedLock: null,
      reason: 'PATH_ESCAPES_FACTORY_ROOT'
    };
  }

  for (const blocked of IMMUTABLE_AND_SEALED_PATHS) {
    if (rel === blocked || rel.startsWith(blocked)) {
      return {
        ok: false,
        allowed: false,
        normalizedTarget: rel,
        matchedLock: null,
        reason: 'SEALED_OR_IMMUTABLE_PATH_BLOCKED'
      };
    }
  }

  const nowMs = Number.isFinite(options?.nowMs) ? options.nowMs : Date.now();
  if (options?.leaseExpiresAt) {
    const expMs = Date.parse(options.leaseExpiresAt);
    if (Number.isFinite(expMs) && nowMs > expMs) {
      return {
        ok: false,
        allowed: false,
        normalizedTarget: rel,
        matchedLock: null,
        reason: 'FILE_LOCK_LEASE_EXPIRED'
      };
    }
  }

  const normalizedLockEntries = (Array.isArray(allowedLocks) ? allowedLocks : [])
    .map((entry) => {
      if (entry && typeof entry === 'object' && entry.path) {
        return {
          path: String(entry.path).replace(/\\/g, '/').replace(/^\.\//, ''),
          leaseExpiresAt: entry.leaseExpiresAt || null
        };
      }
      return {
        path: String(entry || '').replace(/\\/g, '/').replace(/^\.\//, ''),
        leaseExpiresAt: null
      };
    })
    .filter((e) => Boolean(e.path));

  const matchedEntry = normalizedLockEntries.find(
    (entry) => rel === entry.path || (entry.path.endsWith('/') && rel.startsWith(entry.path))
  );
  if (!matchedEntry) {
    return {
      ok: false,
      allowed: false,
      normalizedTarget: rel,
      matchedLock: null,
      reason: 'OUTSIDE_BEAD_FILE_LOCKS'
    };
  }

  if (matchedEntry.leaseExpiresAt) {
    const expMs = Date.parse(matchedEntry.leaseExpiresAt);
    if (Number.isFinite(expMs) && nowMs > expMs) {
      return {
        ok: false,
        allowed: false,
        normalizedTarget: rel,
        matchedLock: matchedEntry.path,
        reason: 'FILE_LOCK_LEASE_EXPIRED'
      };
    }
  }

  return { ok: true, allowed: true, normalizedTarget: rel, matchedLock: matchedEntry.path };
}

/**
 * Executes a scoped Bead node synthesis step with strict fail-closed role + fileLock + TTL + MCP enforcement.
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
  const rawLocks =
    Array.isArray(beadNode.fileLocks) && beadNode.fileLocks.length > 0
      ? beadNode.fileLocks
      : [`projects/${projectSlug}/index.html`];
  const fileLocks = rawLocks.map((l) => (l && typeof l === 'object' ? l.path : l)).filter(Boolean);

  if (beadNode.leaseExpiresAt) {
    const nodeLeaseMs = Date.parse(beadNode.leaseExpiresAt);
    if (Number.isFinite(nodeLeaseMs) && Date.now() > nodeLeaseMs) {
      return {
        ok: false,
        mode: 'blocked',
        beadId,
        role,
        fileLocksVerified: false,
        mcpWritePermitted: false,
        reason: `FILE_LOCK_LEASE_EXPIRED: Bead '${beadId}' lock lease expired at ${beadNode.leaseExpiresAt}`,
        latencyMs: Number((performance.now() - t0).toFixed(2))
      };
    }
  }

  const rolePromptPath = path.join(ROOT, '.agents', 'agency', 'roles', `${role}.md`);
  const rolePromptExists = fs.existsSync(rolePromptPath);

  const lockChecks = fileLocks.map((lockPath) =>
    validateFileLockContainment(lockPath, beadNode.fileLockLeases || rawLocks, projectDir, {
      leaseExpiresAt: beadNode.leaseExpiresAt || null
    })
  );
  const fileLocksVerified = lockChecks.length > 0 && !lockChecks.some((c) => !c.ok || !c.allowed);
  if (!fileLocksVerified) {
    return {
      ok: false,
      mode: 'blocked',
      beadId,
      role,
      fileLocksVerified: false,
      mcpWritePermitted: false,
      reason: lockChecks.find((c) => !c.ok || !c.allowed)?.reason || 'FILE_LOCK_CONTAINMENT_FAILURE',
      latencyMs: Number((performance.now() - t0).toFixed(2))
    };
  }

  const ring = resolveRolePrivilegeRing(role);
  const mcpChecks = lockChecks.map((c) =>
    verifyRoleMcpPermission({
      roleId: role,
      mcpServer: 'filesystem-scoped',
      toolName: 'filesystem_scoped_write',
      targetPath: c.normalizedTarget
    })
  );
  const deniedMcp = mcpChecks.find((m) => !m?.allowed);
  if (!ring.canWriteWorkspace || deniedMcp) {
    return {
      ok: false,
      mode: 'blocked',
      beadId,
      role,
      fileLocksVerified: true,
      mcpWritePermitted: false,
      reason:
        deniedMcp?.reason ||
        `READONLY_ROLE_BLOCKED: Role '${role}' (${ring.ringName}) has canWriteWorkspace=false and cannot execute write beads.`,
      latencyMs: Number((performance.now() - t0).toFixed(2))
    };
  }

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
    } catch {
      mode = 'deterministic-zero-cost';
    }
  }

  const record = {
    ok: true,
    mode,
    beadId,
    role,
    rolePromptLoaded: rolePromptExists,
    mcpWritePermitted: true,
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
