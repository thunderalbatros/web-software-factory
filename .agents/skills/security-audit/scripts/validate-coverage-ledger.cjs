#!/usr/bin/env node
/**
 * Bridge script for .agents/skills/security-audit/scripts/validate-coverage-ledger.cjs
 * Includes mandatory AGENTIC_AND_WEBMCP_SECURITY coverage check.
 */
const rootLedger = require("../validate-coverage-ledger.cjs");
const { validateAgenticAndWebMcpSecurity } = require("../validate-findings.cjs");
module.exports = { ...rootLedger, validateAgenticAndWebMcpSecurity };

if (require.main === module) {
  const arg = process.argv[2];
  if (arg === "--agentic-audit" || !arg) {
    const targetRoot = process.argv[3];
    const report = validateAgenticAndWebMcpSecurity(targetRoot);
    if (!report.passed) {
      for (const issue of report.issues) {
        console.error(`ERROR: [${issue.category}:${issue.rule}] ${issue.file} -> ${issue.message}`);
      }
      process.exit(1);
    }
    console.log(`PASS: Coverage category AGENTIC_AND_WEBMCP_SECURITY verified across ${report.scannedFiles} file(s)`);
    process.exit(0);
  }
}
