#!/usr/bin/env node
/**
 * tools/chaos_monkey_test.mjs — Root CLI & Module Bridge for Adversarial Chaos Monkey Fuzzing
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runChaosMonkeyAudit, CHAOS_REPORT_PATH } from './audit/chaos_monkey_test.mjs';

export { runChaosMonkeyAudit, CHAOS_REPORT_PATH };

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  try {
    const res = await runChaosMonkeyAudit();
    console.log(`[CHAOS-MONKEY] Status: ${res.passed ? 'PASS (100% RESILIENT)' : 'FAIL'} | Report: ${CHAOS_REPORT_PATH}`);
    process.exit(res.passed ? 0 : 1);
  } catch (err) {
    console.error(`[CHAOS-MONKEY] Fatal error: ${err?.message || String(err)}`);
    process.exit(1);
  }
}
