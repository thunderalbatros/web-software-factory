#!/usr/bin/env node
/**
 * tools/audit/run_factory_tests.mjs — Unified Regression & Security Test Runner (`npm test`)
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');

const checks = [
  { label: 'Unit & Security Tests (node --test)', args: ['--test', path.join(ROOT, 'test', 'factory.test.mjs')] },
  { label: 'Cockpit Server CSRF/Origin Self-Test', args: [path.join(ROOT, 'tools', 'cockpit', 'factory_twin_server.mjs'), '--self-test'] },
  { label: 'Client Feedback Triage 2-Stage HITL Self-Test', args: [path.join(ROOT, 'tools', 'feedback', 'client_feedback_triage_agent.mjs'), '--self-test'] },
  { label: 'OWASP GitHub Actions / Zizmor v1.30 Linter', args: [path.join(ROOT, 'tools', 'audit', 'workflow_security_linter.mjs')] },
  { label: 'Constitutional SHA-256 & Anti-Reward-Hacking Guard', args: [path.join(ROOT, 'tools', 'intelligence', 'constitution_guard.mjs')] },
  { label: 'Supply Chain & CycloneDX SBOM Guard (--fast)', args: [path.join(ROOT, 'tools', 'supply_chain_guard.mjs'), '--fast'] }
];

console.log('\n======================================================');
console.log('🧪 WEB SOFTWARE FACTORY UNIFIED TEST SUITE (`npm test`)');
console.log('======================================================\n');

for (const check of checks) {
  console.log(`▶ Running: ${check.label}`);
  execFileSync(process.execPath, check.args, { cwd: ROOT, stdio: 'inherit' });
}

console.log('\n✅ [ALL FACTORY TESTS PASSED]\n');

