#!/usr/bin/env node
/**
 * tools/lib/csp_builder.mjs — Canonical Factory Re-Export for Standalone CSP Builder (Stage 3C.1)
 * ===============================================================================================
 * Re-exports the canonical standalone CSP + Trusted Types builder in
 * `templates/astro-edge/src/lib/csp-builder.mjs` while keeping CLI compatibility for factory tools.
 * ===============================================================================================
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  KNOWN_COMPLIANCE_PROFILES,
  COMMON_SECURITY_HEADERS,
  computeCspSha256Token,
  hasStandaloneUnsafeEval,
  parseCspDirectives,
  buildCspHeaderForProfile,
  generateHeadersFileContent,
  parseHeadersFile,
  resolveHeadersForPathname,
  extractInlineStyleAttributesFromHtmlFiles,
  scanHtmlForCspHashes,
  compileStaticDistCspAndHeaders,
  validateHeadersForProfile
} from '../../templates/astro-edge/src/lib/csp-builder.mjs';

export {
  KNOWN_COMPLIANCE_PROFILES,
  COMMON_SECURITY_HEADERS,
  computeCspSha256Token,
  hasStandaloneUnsafeEval,
  parseCspDirectives,
  buildCspHeaderForProfile,
  generateHeadersFileContent,
  parseHeadersFile,
  resolveHeadersForPathname,
  extractInlineStyleAttributesFromHtmlFiles,
  scanHtmlForCspHashes,
  compileStaticDistCspAndHeaders,
  validateHeadersForProfile
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FACTORY_ROOT = path.resolve(__dirname, '..', '..');

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const args = process.argv.slice(2);
  const profileIdx = args.indexOf('--profile');
  const projectIdx = args.indexOf('--project');
  const profile = profileIdx >= 0 && args[profileIdx + 1] ? args[profileIdx + 1] : 'education';
  if (projectIdx >= 0 && args[projectIdx + 1]) {
    const projRoot = path.join(FACTORY_ROOT, 'projects', args[projectIdx + 1]);
    const report = compileStaticDistCspAndHeaders(projRoot, { profile });
    console.log(
      JSON.stringify(
        {
          ok: true,
          project: args[projectIdx + 1],
          profile: report.profile,
          htmlFilesScanned: report.htmlFilesScanned,
          scriptHashesCount: report.scriptHashes.length,
          styleHashesCount: report.styleHashes.length,
          styleExtraction: report.styleExtraction
        },
        null,
        2
      )
    );
  } else {
    process.stdout.write(generateHeadersFileContent(profile, { projectRoot: FACTORY_ROOT }));
  }
}
