#!/usr/bin/env node
/**
 * WebFactory — Safe Hybrid Cloud + Local Code Sandbox Runner (E2B + LocalWorktreeSandbox)
 * =======================================================================================
 * Dual Architecture (Zero-Config Windows Compatible):
 *   - If `process.env.E2B_API_KEY` is configured, executes inside the remote E2B microVM.
 *   - If `E2B_API_KEY` is NOT configured (default local mode), automatically activates
 *     the Windows Local Isolated Jail (`LocalWorktreeSandbox`) without throwing errors.
 *
 * Usage:
 *   node tools/e2b_sandbox.mjs --code "console.log(1+1)"
 *   node tools/e2b_sandbox.mjs --self-test
 * =======================================================================================
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInHybridSandbox, runSandboxSelfTest, LocalWorktreeSandbox } from './sandbox.mjs';

const __filename = fileURLToPath(import.meta.url);

export async function runInSandbox(code, language = 'javascript', options = {}) {
  const result = await runInHybridSandbox(code, {
    ...options,
    mode: options.mode || (language === 'shell' ? 'command' : 'code')
  });
  return {
    status: result.sandboxMode === 'E2B_CLOUD_MICROVM' ? 'e2b_cloud' : 'local_worktree_jail',
    ok: result.ok,
    exitCode: result.exitCode,
    timedOut: result.timedOut || false,
    sandboxMode: result.sandboxMode,
    stdout: result.stdout,
    stderr: result.stderr,
    elapsedMs: result.elapsedMs
  };
}

export { LocalWorktreeSandbox, runInHybridSandbox };

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename);
if (isMain) {
  const args = process.argv.slice(2);
  if (args.includes('--self-test')) {
    runSandboxSelfTest().then((r) => process.exit(r.passed ? 0 : 1));
  } else {
    const codeIdx = args.indexOf('--code');
    const code = codeIdx !== -1 && args[codeIdx + 1] ? args[codeIdx + 1] : 'console.log("Hello Hybrid Sandbox")';
    runInSandbox(code)
      .then((r) => {
        console.log('✅ Sandbox result:', r);
        process.exit(r.ok ? 0 : 1);
      })
      .catch((e) => {
        console.error('❌ Sandbox error:', e.message);
        process.exit(1);
      });
  }
}
