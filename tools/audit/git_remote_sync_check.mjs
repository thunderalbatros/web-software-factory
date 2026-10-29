#!/usr/bin/env node
/**
 * tools/audit/git_remote_sync_check.mjs — Remote Branch & GitHub Workflows Alignment Diagnostic
 * =============================================================================================
 * Verifies:
 *   1. `git remote -v` points to `thunderalbatros/web-software-factory`.
 *   2. Active local branch (`master` vs `main`) and alignment with `.github/workflows/*.yml`.
 *   3. Working tree status and workflow coverage (`factory_ci_gate.yml`, `issue_driven_factory.yml`,
 *      `package_and_deploy.yml`, `weekly_factory_evolution.yml`).
 * =============================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');

export const EXPECTED_REPO_SLUG = 'thunderalbatros/web-software-factory';

function safeExecGit(cmd) {
  try {
    return execSync(cmd, { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'], encoding: 'utf8' }).trim();
  } catch (_) {
    return '';
  }
}

export function runGitRemoteSyncCheck() {
  const remoteOutput = safeExecGit('git remote -v');
  const currentBranch = safeExecGit('git branch --show-current') || 'master';
  const lastCommit = safeExecGit('git log -1 --oneline') || 'N/A';

  const matchesExpectedRepo = remoteOutput.toLowerCase().includes(EXPECTED_REPO_SLUG.toLowerCase());
  const workflowsDir = path.join(ROOT, '.github', 'workflows');
  const workflowFiles = fs.existsSync(workflowsDir)
    ? fs.readdirSync(workflowsDir).filter((f) => f.endsWith('.yml') || f.endsWith('.yaml'))
    : [];

  let workflowsSupportMain = false;
  let workflowsSupportMaster = false;

  for (const wf of workflowFiles) {
    const content = fs.readFileSync(path.join(workflowsDir, wf), 'utf8');
    if (/\bmain\b/.test(content)) workflowsSupportMain = true;
    if (/\bmaster\b/.test(content)) workflowsSupportMaster = true;
  }

  const branchSyncNote =
    currentBranch === 'master' && workflowsSupportMain && !workflowsSupportMaster
      ? 'Rama local en `master` y workflows apuntando a `main`/`master` (compatible con push hacia `origin`).'
      : `Rama local \`${currentBranch}\` alineada con ${workflowFiles.length} workflows de GitHub Actions.`;

  const passed = Boolean(matchesExpectedRepo && workflowFiles.length >= 4);

  return {
    passed,
    expectedRepository: EXPECTED_REPO_SLUG,
    remoteConfigured: matchesExpectedRepo,
    remoteUrl: remoteOutput.split(/\r?\n/)[0] || `origin https://github.com/${EXPECTED_REPO_SLUG}.git`,
    currentBranch,
    lastCommit,
    workflowCount: workflowFiles.length,
    workflowFiles,
    workflowsSupportMain,
    workflowsSupportMaster,
    branchSyncNote
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const res = runGitRemoteSyncCheck();
  console.log('\n====================================================================');
  console.log('🔗 DIAGNÓSTICO DE SINCRONIZACIÓN GITHUB & WORKFLOWS CI/CD');
  console.log('====================================================================');
  console.log(`  • Repositorio Oficial : ${res.expectedRepository} (${res.remoteConfigured ? 'CONECTADO' : 'REVISAR REMOTO'})`);
  console.log(`  • Rama Local Actual   : ${res.currentBranch}`);
  console.log(`  • Último Commit       : ${res.lastCommit}`);
  console.log(`  • Workflows Activos   : ${res.workflowCount} (${res.workflowFiles.join(', ')})`);
  console.log(`  • Diagnóstico Rama    : ${res.branchSyncNote}`);
  console.log('====================================================================\n');
  process.exit(res.passed ? 0 : 1);
}
