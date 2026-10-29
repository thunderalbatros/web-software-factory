#!/usr/bin/env node
/**
 * tools/mcp/mcp_omni_rag_server.mjs — OWASP MCP Top 10 + Creator-Verifier Split Entrypoint
 * ==========================================================================================
 * Bridges and re-exports the hardened MCP server from `tools/intelligence/mcp_omni_rag_server.mjs`.
 * Enforces:
 *   - `"additionalProperties": false` on all tool JSON schemas
 *   - Rejection of unauthorized `x-mcp-header` / `x-mcp-untrusted` headers
 *   - CSPRNG session/trace IDs via `crypto.randomUUID()` & `crypto.randomBytes()`
 *   - Audience validation (`urn:web-software-factory:mcp*`) & HITL Gate
 *   - Indirect Prompt Injection & Tool Poisoning sanitization (`sanitizeMcpRetrievedFragment`)
 *   - Role-Partitioned Creator-Verifier Split (`verifyRoleMcpPermission`) & >1,200 token spillover
 * ==========================================================================================
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SERVER_INFO,
  TOOLS,
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
  generateCsprngSessionId,
  discoverToolsByIntent,
  sanitizeMcpRetrievedFragment,
  validateMcpRequestSecurity,
  projectScopeFilter,
  startMcpServer
};

const __filename = fileURLToPath(import.meta.url);

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  startMcpServer();
}
