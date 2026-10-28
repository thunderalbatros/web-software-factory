#!/usr/bin/env node
/**
 * tools/token_compiler.mjs — Canonical Re-Exporter for tools/design/token_compiler.mjs
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runTokenCompilerCli } from './design/token_compiler.mjs';

export * from './design/token_compiler.mjs';

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  runTokenCompilerCli();
}
