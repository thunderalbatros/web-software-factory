#!/usr/bin/env node
/**
 * tools/supply_chain_guard.mjs — Root CLI & Module Bridge for Supply Chain & CycloneDX SBOM Guard
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  runSupplyChainGuard,
  verifyPackageAllowlist,
  checkRetireJsClientSignatures,
  generateCycloneDxSbom,
  SBOM_CYCLONEDX_PATH
} from './audit/supply_chain_guard.mjs';

export {
  runSupplyChainGuard,
  verifyPackageAllowlist,
  checkRetireJsClientSignatures,
  generateCycloneDxSbom,
  SBOM_CYCLONEDX_PATH
};

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const fastMode = process.argv.includes('--fast');
  const jsonMode = process.argv.includes('--json');
  const report = runSupplyChainGuard({ skipNetworkAudit: fastMode });
  if (jsonMode) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(
      `[SUPPLY-CHAIN-GUARD] Status: ${report.status} | Packages: ${report.allowlist.scannedPackages} | SBOM: ${report.sbom.componentCount} components -> .agents/memory/sbom_cyclonedx.json | HTML/Astro SRI: ${report.sri.scannedFiles} | Lockfile: ${report.lockfile.lockfileType || 'NONE'} (${report.elapsedMs}ms)`
    );
    if (!report.passed) {
      for (const issue of report.issues) {
        console.error(`  ❌ [${issue.rule}] ${issue.file}: ${issue.message}`);
      }
    }
  }
  process.exit(report.passed ? 0 : 1);
}
