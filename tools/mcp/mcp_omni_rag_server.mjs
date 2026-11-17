#!/usr/bin/env node
/**
 * tools/mcp/mcp_omni_rag_server.mjs — OWASP MCP Top 10 + Creator-Verifier Split Entrypoint
 * ==========================================================================================
 * Bridges and re-exports the hardened MCP server from `tools/intelligence/mcp_omni_rag_server.mjs`.
 * Stub tools (`delta_security_scan`, `dast_endpoint_probe`, `github_precommit_secret_scan`,
 * `git_readonly_inspect`, `d1_readonly_query`) reject simulated PASS responses with explicit
 * structured `NOT_IMPLEMENTED_USE_CLI_GATE` errors pointing to the real CLI gate.
 * ==========================================================================================
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SERVER_INFO,
  TOOLS,
  STUB_MCP_CLI_GATE_MAP,
  buildNotImplementedCliGateError,
  executeSingleMcpTool,
  generateCsprngSessionId,
  discoverToolsByIntent,
  sanitizeMcpRetrievedFragment,
  validateMcpRequestSecurity,
  projectScopeFilter,
  startMcpServer
} from '../intelligence/mcp_omni_rag_server.mjs';

export {
  SERVER_INFO,
  TOOLS,
  STUB_MCP_CLI_GATE_MAP,
  buildNotImplementedCliGateError,
  executeSingleMcpTool,
  generateCsprngSessionId,
  discoverToolsByIntent,
  sanitizeMcpRetrievedFragment,
  validateMcpRequestSecurity,
  projectScopeFilter,
  startMcpServer
};

const __filename = fileURLToPath(import.meta.url);

if (
  process.argv[1] &&
  path.resolve(process.argv[1]).toLowerCase() === path.resolve(__filename).toLowerCase()
) {
  startMcpServer();
}
