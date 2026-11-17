#!/usr/bin/env node
/**
 * tools/visual_audit.mjs — Root CLI Bridge for Multi-Viewport Visual & Geometry Audit
 */
import { runVisualAuditCli } from './audit/visual_audit.mjs';

await runVisualAuditCli(process.argv);
