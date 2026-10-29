#!/usr/bin/env node
/**
 * tools/ast_guard.mjs — Root CLI & Module Bridge for Symbolic AST & Oxlint Guard
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runAstAudit, runOxlintFastPass, scanClassMethods, scanSecurityAndPerformance } from './audit/ast_guard.mjs';

export { runAstAudit, runOxlintFastPass, scanClassMethods, scanSecurityAndPerformance };

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const res = runAstAudit();
  process.exit(res.passed ? 0 : 1);
}
