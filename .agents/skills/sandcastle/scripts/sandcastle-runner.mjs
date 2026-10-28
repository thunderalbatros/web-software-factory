#!/usr/bin/env node
/**
 * .agents/skills/sandcastle/scripts/sandcastle-runner.mjs
 * Bridge to Hybrid Zero-Config Windows-Safe Sandbox (`tools/sandbox.mjs` & `tools/lib/sandcastle-runner.mjs`)
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  listSandboxes,
  createSandbox,
  runInSandbox,
  destroySandbox,
  LocalWorktreeSandbox,
  runInHybridSandbox
} from '../../../../tools/lib/sandcastle-runner.mjs';
import { runSandboxSelfTest } from '../../../../tools/sandbox.mjs';

export {
  listSandboxes,
  createSandbox,
  runInSandbox,
  destroySandbox,
  LocalWorktreeSandbox,
  runInHybridSandbox,
  runSandboxSelfTest
};

const __filename = fileURLToPath(import.meta.url);
const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename);

if (isMain) {
  const args = process.argv.slice(2);
  if (args.includes('--self-test')) {
    runSandboxSelfTest().then((r) => process.exit(r.passed ? 0 : 1));
  } else {
    const [cmd, arg1, ...rest] = args;
    if (cmd === 'list') {
      console.log(JSON.stringify(listSandboxes(), null, 2));
    } else if (cmd === 'create') {
      console.log(JSON.stringify(createSandbox(arg1, rest[0] || 'HEAD'), null, 2));
    } else if (cmd === 'run') {
      runInSandbox(arg1, rest.join(' '))
        .then((out) => console.log(out))
        .catch((err) => {
          console.error(err.message);
          process.exit(1);
        });
    } else if (cmd === 'destroy') {
      console.log(JSON.stringify(destroySandbox(arg1), null, 2));
    } else {
      runSandboxSelfTest().then((r) => process.exit(r.passed ? 0 : 1));
    }
  }
}
