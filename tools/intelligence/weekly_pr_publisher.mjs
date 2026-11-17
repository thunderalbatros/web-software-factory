#!/usr/bin/env node
/**
 * tools/intelligence/weekly_pr_publisher.mjs — Idempotent PR Publisher for Weekly SOTA Evolution
 * =================================================================================================
 * Stages strictly the audited weekly output paths, removes any unintended collateral files,
 * pushes commits only to `automation/weekly-sota-evolution` (never force-pushing to `master`),
 * and creates or updates an auditable Pull Request via GitHub REST API (`node:https`/native `fetch`).
 * =================================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');

export const WEEKLY_PR_BRANCH = 'automation/weekly-sota-evolution';
export const ALLOWED_WEEKLY_PR_PATHS = Object.freeze([
  'knowledge/software_factory/SOTA_WEEKLY_DIGEST_2026.md',
  'projects/academia-ia/data/academy/news_feed.json',
  'weekly_update',
  '.agents/memory/held_in_regression_tasks.json'
]);

const REPO_SLUG_RX = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;
const SAFE_BRANCH_RX = /^[A-Za-z0-9._/-]{2,120}$/;

function normalizeRepoPath(p = '') {
  return String(p || '').trim().replace(/\\/g, '/').replace(/^\.\//, '');
}

export function filterAllowedWeeklyPaths(paths = []) {
  const allowed = [];
  const rejected = [];
  for (const raw of paths) {
    const norm = normalizeRepoPath(raw);
    if (!norm) continue;
    const isAllowed =
      norm === 'knowledge/software_factory/SOTA_WEEKLY_DIGEST_2026.md' ||
      norm === 'projects/academia-ia/data/academy/news_feed.json' ||
      norm === '.agents/memory/held_in_regression_tasks.json' ||
      norm === 'weekly_update' ||
      norm.startsWith('weekly_update/');
    if (isAllowed) allowed.push(norm);
    else rejected.push(norm);
  }
  return { allowed, rejected };
}

function buildPullRequestBody(stagedFiles, dateStr) {
  const fileLines = stagedFiles.map((f) => `- \`${f}\``).join('\n');
  return [
    `## Evolución Semanal SOTA & Novedades IA (${dateStr})`,
    '',
    'Este Pull Request fue generado por el pipeline autónomo de **Web Software Factory** después de aprobar la matriz hard-gated 100/100, Zizmor, Security Gate y sanitización anti-prompt-injection.',
    '',
    '### Archivos auditados incluidos',
    fileLines,
    '',
    '### Revisión humana requerida (HITL CTO)',
    '- `knowledge/software_factory/SOTA_WEEKLY_DIGEST_2026.md` permanece marcado como `PENDING_CTO_REVIEW` hasta aprobación explícita.',
    '- No se modificaron cánones inmutables ni lecciones `.mdx` publicadas de Academia Libre.'
  ].join('\n');
}

/**
 * Idempotently creates or updates an open Pull Request from `headBranch` into `baseBranch`.
 */
export async function upsertWeeklyPullRequest({
  repository,
  token,
  headBranch = WEEKLY_PR_BRANCH,
  baseBranch = 'master',
  title,
  body,
  fetchImpl = fetch
} = {}) {
  const repo = String(repository || '').trim();
  const tok = String(token || '').trim();
  if (!REPO_SLUG_RX.test(repo)) {
    throw new Error(`Invalid GITHUB_REPOSITORY slug: '${repo}'`);
  }
  if (!tok) {
    throw new Error('Missing GITHUB_TOKEN for Pull Request publication.');
  }
  if (!SAFE_BRANCH_RX.test(headBranch) || !SAFE_BRANCH_RX.test(baseBranch)) {
    throw new Error('Invalid branch name for Pull Request publication.');
  }

  const [owner] = repo.split('/');
  const authHeader = ['Bearer', tok].join(' ');
  const apiBase = `https://api.github.com/repos/${repo}`;
  const commonHeaders = {
    Accept: 'application/vnd.github+json',
    Authorization: authHeader,
    'User-Agent': 'WebSoftwareFactory-WeeklyPrPublisher/2026',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json'
  };

  const listUrl = `${apiBase}/pulls?state=open&head=${encodeURIComponent(`${owner}:${headBranch}`)}&base=${encodeURIComponent(baseBranch)}`;
  const listRes = await fetchImpl(listUrl, { method: 'GET', headers: commonHeaders });
  if (!listRes.ok) {
    throw new Error(`GitHub PR lookup failed with HTTP ${listRes.status}`);
  }
  const existingPrs = await listRes.json();

  if (Array.isArray(existingPrs) && existingPrs.length > 0) {
    const existing = existingPrs[0];
    const patchRes = await fetchImpl(`${apiBase}/pulls/${existing.number}`, {
      method: 'PATCH',
      headers: commonHeaders,
      body: JSON.stringify({ title, body })
    });
    if (!patchRes.ok) {
      throw new Error(`GitHub PR update (#${existing.number}) failed with HTTP ${patchRes.status}`);
    }
    const updated = await patchRes.json();
    return {
      ok: true,
      action: 'updated',
      number: updated.number ?? existing.number,
      url: updated.html_url || existing.html_url || '',
      headBranch,
      baseBranch
    };
  }

  const createRes = await fetchImpl(`${apiBase}/pulls`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify({
      title,
      body,
      head: headBranch,
      base: baseBranch
    })
  });
  if (!createRes.ok) {
    throw new Error(`GitHub PR creation failed with HTTP ${createRes.status}`);
  }
  const created = await createRes.json();
  return {
    ok: true,
    action: 'created',
    number: created.number,
    url: created.html_url || '',
    headBranch,
    baseBranch
  };
}

function cleanCollateralGitChanges(cwd = ROOT) {
  execFileSync('git', ['reset'], { cwd, stdio: 'ignore' });
  const rawStatus = execFileSync('git', ['status', '--porcelain=v1', '-uall'], {
    cwd,
    encoding: 'utf8'
  });
  const cleaned = [];
  for (const line of rawStatus.split(/\r?\n/)) {
    if (!line || line.length < 4) continue;
    const status = line.slice(0, 2);
    const rawPath = line.slice(3).trim().replace(/^"|"$/g, '');
    const rel = normalizeRepoPath(rawPath.includes(' -> ') ? rawPath.split(' -> ').pop() : rawPath);
    if (!rel) continue;
    if (filterAllowedWeeklyPaths([rel]).allowed.length > 0) continue;

    if (status === '??') {
      fs.rmSync(path.resolve(cwd, rel), { recursive: true, force: true });
    } else {
      execFileSync('git', ['checkout', '--', rel], { cwd, stdio: 'ignore' });
    }
    cleaned.push(rel);
  }
  return cleaned;
}

export async function publishWeeklyEvolutionPullRequest(options = {}) {
  const cwd = path.resolve(options.cwd || ROOT);
  const dryRun = Boolean(options.dryRun);
  const cleanCollateral = options.cleanCollateral !== false;
  const headBranch = options.headBranch || WEEKLY_PR_BRANCH;
  const baseBranch = options.baseBranch || process.env.GITHUB_BASE_BRANCH || 'master';
  const repository = options.repository || process.env.GITHUB_REPOSITORY || '';
  const token = options.token || process.env.GITHUB_TOKEN || '';
  const dateStr = options.dateStr || new Date().toISOString().slice(0, 10);
  const fetchImpl = options.fetchImpl || fetch;

  const cleanedCollateral = cleanCollateral ? cleanCollateralGitChanges(cwd) : [];

  const existingTargets = ALLOWED_WEEKLY_PR_PATHS.filter((p) => fs.existsSync(path.join(cwd, p)));
  if (existingTargets.length > 0) {
    execFileSync('git', ['add', '--', ...existingTargets], { cwd, stdio: 'ignore' });
  }

  const stagedOut = execFileSync('git', ['diff', '--cached', '--name-only'], {
    cwd,
    encoding: 'utf8'
  });
  const stagedRaw = stagedOut.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  const { allowed: stagedFiles, rejected } = filterAllowedWeeklyPaths(stagedRaw);
  if (rejected.length > 0) {
    execFileSync('git', ['reset'], { cwd, stdio: 'ignore' });
    throw new Error(`DISALLOWED_WEEKLY_PR_PATHS: ${rejected.join(', ')}`);
  }

  if (stagedFiles.length === 0) {
    return {
      ok: true,
      skipped: true,
      reason: 'NO_CHANGES',
      stagedFiles: [],
      cleanedCollateral
    };
  }

  const title = `chore(weekly-evolution): actualización SOTA y novedades IA (${dateStr})`;
  const body = buildPullRequestBody(stagedFiles, dateStr);

  if (dryRun) {
    execFileSync('git', ['reset'], { cwd, stdio: 'ignore' });
    return {
      ok: true,
      dryRun: true,
      headBranch,
      baseBranch,
      stagedFiles,
      cleanedCollateral,
      title,
      body
    };
  }

  if (!REPO_SLUG_RX.test(String(repository || '').trim()) || !String(token || '').trim()) {
    throw new Error('GITHUB_REPOSITORY and GITHUB_TOKEN are required to publish the weekly Pull Request.');
  }

  execFileSync('git', ['config', 'user.name', 'WebFactory Autonomous Evolver'], { cwd, stdio: 'ignore' });
  execFileSync('git', ['config', 'user.email', 'tomasbermudez777@gmail.com'], { cwd, stdio: 'ignore' });
  execFileSync('git', ['checkout', '-B', headBranch], { cwd, stdio: 'ignore' });
  execFileSync(
    'git',
    ['commit', '-m', 'chore(weekly-evolution): actualización automática SOTA y novedades IA [skip ci]'],
    { cwd, stdio: 'ignore' }
  );

  const basicAuth = Buffer.from(`x-access-token:${token}`, 'utf8').toString('base64');
  const gitAuthConfig = `http.https://github.com/.extraheader=AUTHORIZATION: basic ${basicAuth}`;
  const remoteUrl = `https://github.com/${repository}.git`;

  let remoteBranchSha = '';
  try {
    const lsOut = execFileSync(
      'git',
      ['-c', gitAuthConfig, 'ls-remote', '--heads', remoteUrl, `refs/heads/${headBranch}`],
      { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    );
    remoteBranchSha = String(lsOut || '').trim().split(/\s+/)[0] || '';
  } catch {
    remoteBranchSha = '';
  }

  const pushArgs = ['-c', gitAuthConfig, 'push'];
  if (remoteBranchSha) {
    pushArgs.push(`--force-with-lease=refs/heads/${headBranch}:${remoteBranchSha}`);
  }
  pushArgs.push(remoteUrl, `HEAD:refs/heads/${headBranch}`);
  execFileSync('git', pushArgs, { cwd, stdio: 'ignore' });

  const prResult = await upsertWeeklyPullRequest({
    repository,
    token,
    headBranch,
    baseBranch,
    title,
    body,
    fetchImpl
  });

  return {
    ok: true,
    skipped: false,
    stagedFiles,
    cleanedCollateral,
    pullRequest: prResult
  };
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]).toLowerCase() === path.resolve(__filename).toLowerCase()
) {
  const dryRun = process.argv.includes('--dry-run');
  publishWeeklyEvolutionPullRequest({ dryRun })
    .then((res) => {
      if (res.skipped) {
        console.log('[WEEKLY-PR] No verified weekly changes to publish.');
      } else if (res.dryRun) {
        console.log(`[WEEKLY-PR] Dry-Run OK | Staged: ${res.stagedFiles.join(', ')}`);
      } else {
        console.log(
          `[WEEKLY-PR] Pull Request ${res.pullRequest?.action} (#${res.pullRequest?.number}): ${res.pullRequest?.url}`
        );
      }
      process.exit(0);
    })
    .catch((err) => {
      console.error('❌ Error en weekly_pr_publisher.mjs:', err.message);
      process.exit(1);
    });
}
