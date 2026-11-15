#!/usr/bin/env node
/**
 * tools/security_gate.mjs — Top-Level CLI Wrapper for tools/audit/security_gate.mjs
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runSecurityQuarantineGate } from './audit/security_gate.mjs';

export { runSecurityQuarantineGate };
export const runSecurityGate = runSecurityQuarantineGate;

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  const projIdx = process.argv.indexOf('--project');
  const project = projIdx !== -1 && process.argv[projIdx + 1] ? process.argv[projIdx + 1] : null;
  const res = runSecurityQuarantineGate({ fast: process.argv.includes('--fast'), project });
  console.log(
    `[SECURITY-GATE] Status: ${res.status} (Score: ${res.score.toFixed(1)} / 100.0) | SCA: ${res.supplyChainPassed} | SAST: ${res.astPassed} (${res.astLatencyMs}ms) | Workers: ${res.edgeWorkerAudit.workersChecked} OK | Zizmor v1.30 Workflows: ${res.workflowAudit.workflowsChecked} OK | AgentOS Kernel (ASI01-10): ${res.governanceKernelAudit.passed} (${res.governanceKernelAudit.avgLatencyMs}ms) | MCP Audit: ${res.mcpSecurityAudit.scoreRatio} SARIF | Postgres RLS + KMS + Ory: ${res.enterpriseDbAndIdentityAudit.passed} | Gitleaks+Entropy: ${res.secretEntropyAudit.filesScanned} files OK | PII Redactor: ${res.piiRedactorAudit.passed}`
  );
  process.exit(res.passed ? 0 : 1);
}
