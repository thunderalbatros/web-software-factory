#!/usr/bin/env node
/**
 * tools/project_loader.mjs — Root CLI & Module Bridge for Project Manifest Loader, OpenSpec Deltas & spec-kitty Traceability
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  FACTORY_ROOT,
  ACTIVE_PROJECT_PATH,
  PROJECTS_DIR,
  getActiveProject,
  setActiveProject,
  recordProjectAuditScore,
  listProjectsCatalog,
  resolveCliProjectArg,
  resolveProjectRoot,
  loadProjectConfig,
  createOpenSpecDeltaFile,
  mergeApprovedDeltaIntoCanonicalSpec,
  verifySpecKittyTraceabilityMatrix
} from './lib/project_loader.mjs';

export {
  FACTORY_ROOT,
  ACTIVE_PROJECT_PATH,
  PROJECTS_DIR,
  getActiveProject,
  setActiveProject,
  recordProjectAuditScore,
  listProjectsCatalog,
  resolveCliProjectArg,
  resolveProjectRoot,
  loadProjectConfig,
  createOpenSpecDeltaFile,
  mergeApprovedDeltaIntoCanonicalSpec,
  verifySpecKittyTraceabilityMatrix
};

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const cfg = loadProjectConfig();
  console.log(`[PROJECT-LOADER] Active=${cfg.id} | Stack=${cfg.stack} | Archetype=${cfg.archetype} | DB=${cfg.dbTier}`);
}
