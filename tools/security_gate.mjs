#!/usr/bin/env node
/**
 * tools/security_gate.mjs — Root CLI & Module Bridge for Unified Security Gate (SOTA 2026)
 * ========================================================================================
 * Re-exports and executes deterministic checks from `tools/audit/security_gate.mjs`:
 *   - Anti-IDOR sequential integer route verification & A10:2025 zero stack leak
 *   - Fetch Metadata (`Sec-Fetch-*`) & payload ceiling (`MAX_BODY_BYTES`) verification
 *   - Offline Gitleaks regex + Shannon entropy scanner
 *   - Lightweight Presidio-pattern PII entity redactor (`redactPiiEntities`)
 *   - Zizmor v1.30 GitHub Actions static workflow security verifier (`permissions: {}`,
 *     `pull_request_target` / `issue_comment` ban, `cache-poisoning`, `persist-credentials: false`,
 *     and `${{ ... }}` template command injection prevention)
 *   - Microsoft Agent Governance Kernel (`< 0.1ms` 10/10 OWASP Agentic Top 10 `ASI01–ASI10`)
 * ========================================================================================
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  runSecurityQuarantineGate,
  runSecurityGate,
  auditEdgeWorkersAndDist,
  scanSecretsAndEntropy,
  computeShannonEntropy,
  redactPiiEntities,
  verifyPiiRedactorSelfTest,
  lintWorkflowYamlContent,
  runWorkflowSecurityLinter,
  runMcpSecurityAudit,
  auditEnterpriseDatabaseAndIdentity,
  runAgentShieldHarnessAudit,
  GITLEAKS_SECRET_PATTERNS
} from './audit/security_gate.mjs';

export {
  runSecurityQuarantineGate,
  runSecurityGate,
  auditEdgeWorkersAndDist,
  scanSecretsAndEntropy,
  computeShannonEntropy,
  redactPiiEntities,
  verifyPiiRedactorSelfTest,
  lintWorkflowYamlContent,
  runWorkflowSecurityLinter,
  runMcpSecurityAudit,
  auditEnterpriseDatabaseAndIdentity,
  runAgentShieldHarnessAudit,
  GITLEAKS_SECRET_PATTERNS
};

const __filename = fileURLToPath(import.meta.url);

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const res = runSecurityQuarantineGate({ fast: process.argv.includes('--fast') });
  console.log(
    `[SECURITY-GATE] Status: ${res.status} (Score: ${res.score.toFixed(1)} / 100.0) | SCA: ${res.supplyChainPassed} | SAST: ${res.astPassed} (${res.astLatencyMs}ms) | Workers: ${res.edgeWorkerAudit.workersChecked} OK | Zizmor v1.30 Workflows: ${res.workflowAudit.workflowsChecked} OK | AgentOS Kernel (ASI01-10): ${res.governanceKernelAudit.passed} (${res.governanceKernelAudit.avgLatencyMs}ms) | AgentShield: ${res.agentShieldAudit.passed} (${res.agentShieldAudit.filesAudited} files, ${res.agentShieldAudit.skillsChecked} skills) | MCP Audit: ${res.mcpSecurityAudit.scoreRatio} SARIF | Postgres RLS + KMS + Ory: ${res.enterpriseDbAndIdentityAudit.passed} | Gitleaks+Entropy: ${res.secretEntropyAudit.filesScanned} files OK | PII Redactor: ${res.piiRedactorAudit.passed}`
  );
  if (!res.passed) {
    for (const r of res.reasons) console.error(`  ❌ ${redactPiiEntities(r)}`);
    process.exit(1);
  }
}
