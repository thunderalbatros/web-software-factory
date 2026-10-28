#!/usr/bin/env node
/**
 * tools/audit/ast_guard.mjs — Canonical Re-Exporter for tools/intelligence/ast_guard.mjs
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runAstAudit } from '../intelligence/ast_guard.mjs';

export * from '../intelligence/ast_guard.mjs';

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const res = runAstAudit();
  process.exit(res.passed ? 0 : 1);
}
