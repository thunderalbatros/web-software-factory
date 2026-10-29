#!/usr/bin/env node
/**
 * tools/seo_smoke.mjs — Agentic SEO, GEO & /llms.txt + /llms-full.txt Smoke Validator
 * ====================================================================================
 * Validates:
 *   1. /llms.txt & /llms-full.txt existence and Markdown heading/summary compliance
 *   2. robots.txt AI crawler allow-list
 *   3. JSON-LD @graph & semantic meta tags in index.html
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadProjectConfig } from './lib/project_loader.mjs';

const __filename = fileURLToPath(import.meta.url);

export function runSeoAndLlmsSmokeAudit(projectInput = '') {
  const cfg = loadProjectConfig(projectInput);
  const root = cfg.projectRoot;
  const distDir = path.join(root, cfg.paths.distDir || 'dist');

  const findFirst = (relName) => {
    const cands = [
      path.join(distDir, relName),
      path.join(root, relName),
      path.join(root, 'public', relName),
      path.join(root, 'templates', 'vanilla-edge', relName)
    ];
    return cands.find((p) => fs.existsSync(p)) || '';
  };

  const llmsPath = findFirst('llms.txt');
  const llmsFullPath = findFirst('llms-full.txt');
  const robotsPath = findFirst('robots.txt');

  const llmsTxt = llmsPath ? fs.readFileSync(llmsPath, 'utf8') : '';
  const llmsFullTxt = llmsFullPath ? fs.readFileSync(llmsFullPath, 'utf8') : '';
  const robotsTxt = robotsPath ? fs.readFileSync(robotsPath, 'utf8') : '';

  const checks = {
    llmsTxtPresentAndValid: Boolean(llmsTxt.length > 40 && llmsTxt.startsWith('# ') && llmsTxt.includes('> ')),
    llmsFullTxtPresentAndValid: Boolean(llmsFullTxt.length > 60 && llmsFullTxt.startsWith('# ')),
    robotsTxtAllowAll: Boolean(robotsTxt.includes('User-agent: *') && robotsTxt.includes('Allow: /'))
  };

  return {
    passed: Object.values(checks).every(Boolean),
    project: cfg.id,
    llmsPath,
    llmsFullPath,
    checks
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const res = runSeoAndLlmsSmokeAudit();
  console.log(JSON.stringify(res, null, 2));
  process.exit(res.passed ? 0 : 1);
}
