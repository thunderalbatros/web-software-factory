#!/usr/bin/env node
/**
 * Sandcastle Runner — Git Worktree & Hybrid Local/Cloud Sandbox Isolation
 * Inspired by Matt Pocock's @ai-hero/sandcastle + WebFactory Hybrid Sandbox
 *
 * Provides deterministic, zero-Docker workspace isolation for parallel subagents:
 *   - Uses `LocalWorktreeSandbox` (`.cache/sandboxes/run-<timestamp>/`) with
 *     30s Hard Timeout, 2048MB Memory Limit, Filesystem Containment Guard, and
 *     Sanitized Environment variables on Windows PowerShell / Node.js.
 *   - Supports automatic Cloud E2B microVM execution when `E2B_API_KEY` is present.
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  FACTORY_ROOT,
  SANDBOXES_BASE_DIR,
  LocalWorktreeSandbox,
  runInHybridSandbox,
  runSandboxSelfTest,
  assertFilesystemContainment,
  sanitizeEnvironment
} from '../sandbox.mjs';

const __filename = fileURLToPath(import.meta.url);
const ROOT = FACTORY_ROOT;
const WORKTREES_DIR = SANDBOXES_BASE_DIR;

function sanitizeName(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function listSandboxes() {
  const raw = execSync('git worktree list --porcelain', {
    cwd: ROOT,
    encoding: 'utf8'
  });
  const entries = [];
  let current = {};
  for (const line of raw.split(/\r?\n/)) {
    if (!line.trim()) {
      if (current.worktree) entries.push(current);
      current = {};
      continue;
    }
    const [k, ...rest] = line.split(' ');
    current[k] = rest.join(' ');
  }
  if (current.worktree) entries.push(current);
  return entries.filter((e) => e.worktree.includes('.cache/sandboxes') || e.worktree.includes('.cache\\sandboxes') || e.worktree.includes('.worktrees'));
}

export function createSandbox(rawName, baseRef = 'HEAD') {
  const name = sanitizeName(rawName || `run-${Date.now()}`);
  if (!name) throw new Error('Sandbox name is required.');

  fs.mkdirSync(WORKTREES_DIR, { recursive: true });
  const targetDir = path.join(WORKTREES_DIR, name);
  const branchName = `sandbox/${name}`;

  if (fs.existsSync(targetDir)) {
    return { name, branchName, targetDir, status: 'EXISTING' };
  }

  try {
    execSync(`git worktree add -B "${branchName}" "${targetDir}" "${baseRef}"`, {
      cwd: ROOT,
      stdio: 'pipe'
    });
    return { name, branchName, targetDir, status: 'CREATED' };
  } catch {
    const jail = new LocalWorktreeSandbox({ runId: name, preferWorktree: false });
    jail.init();
    return { name, branchName: 'detached-local-jail', targetDir: jail.sandboxDir, status: 'CREATED_LOCAL_JAIL' };
  }
}

export async function runInSandbox(rawName, commandStr, options = {}) {
  if (!commandStr && rawName) {
    // Single-argument invocation: run ephemeral hybrid sandbox task
    return runInHybridSandbox(rawName, { mode: 'command', isCommand: true, ...options });
  }
  const name = sanitizeName(rawName);
  const targetDir = path.join(WORKTREES_DIR, name);

  if (fs.existsSync(targetDir)) {
    assertFilesystemContainment( WORKTREES_DIR, targetDir );
    const jail = new LocalWorktreeSandbox({ runId: name });
    jail.sandboxDir = targetDir;
    jail.initialized = true;
    const res = await jail.execCommand(commandStr, options);
    if (!res.ok) {
      throw new Error(res.stderr || `Sandbox command exited with code ${res.exitCode}`);
    }
    return res.stdout;
  }

  const res = await runInHybridSandbox(commandStr, {
    mode: 'command',
    isCommand: true,
    ...options
  });
  if (!res.ok) {
    throw new Error(res.stderr || `Sandbox command exited with code ${res.exitCode}`);
  }
  return res.stdout;
}

export function destroySandbox(rawName) {
  const name = sanitizeName(rawName);
  const targetDir = path.join(WORKTREES_DIR, name);
  const branchName = `sandbox/${name}`;

  if (fs.existsSync(targetDir)) {
    const jailNodeModules = path.join(targetDir, 'node_modules');
    if (fs.existsSync(jailNodeModules)) {
      try {
        fs.unlinkSync(jailNodeModules);
      } catch {}
    }
    try {
      execSync(`git worktree remove --force "${targetDir}"`, { cwd: ROOT, stdio: 'pipe' });
    } catch {
      fs.rmSync(targetDir, { recursive: true, force: true });
    }
  }
  try {
    execSync(`git branch -D "${branchName}"`, { cwd: ROOT, stdio: 'pipe' });
  } catch {}
  try {
    execSync('git worktree prune', { cwd: ROOT, stdio: 'pipe' });
  } catch {}
  return { name, destroyed: true };
}

export { LocalWorktreeSandbox, runInHybridSandbox, sanitizeEnvironment, assertFilesystemContainment };

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename);
if (isMain) {
  const [, , cmd, arg1, ...rest] = process.argv;
  if (cmd === '--self-test' || arg1 === '--self-test') {
    runSandboxSelfTest().then((r) => process.exit(r.passed ? 0 : 1));
  } else {
    try {
      if (cmd === 'list') {
        console.log(JSON.stringify(listSandboxes(), null, 2));
      } else if (cmd === 'create') {
        console.log(JSON.stringify(createSandbox(arg1, rest[0] || 'HEAD'), null, 2));
      } else if (cmd === 'run') {
        runInSandbox(arg1, rest.join(' ')).then((out) => console.log(out));
      } else if (cmd === 'destroy') {
        console.log(JSON.stringify(destroySandbox(arg1), null, 2));
      } else {
        console.log('Usage: node tools/lib/sandcastle-runner.mjs [list | create <name> | run <name> <cmd> | destroy <name> | --self-test]');
      }
    } catch (err) {
      console.error(`[Sandcastle Error]: ${err.message}`);
      process.exit(1);
    }
  }
}
