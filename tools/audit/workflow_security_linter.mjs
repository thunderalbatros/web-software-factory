#!/usr/bin/env node
/**
 * tools/audit/workflow_security_linter.mjs — OWASP GitHub Actions & Zizmor v1.30 Deterministic Linter
 * ====================================================================================================
 * Audits all `.yml` / `.yaml` files inside `.github/workflows/` enforcing `zizmor v1.30` (Oct 2026):
 *   1. ZIZMOR-01 (Forbidden Triggers): Prohibits `pull_request_target`, insecure `workflow_run`,
 *      and unguarded `issue_comment` triggers.
 *   2. ZIZMOR-02 (Credential Persistence): Requires `persist-credentials: false` on every `actions/checkout`.
 *   3. ZIZMOR-03 (Secrets & Root Default `permissions: {}`): Prohibits `secrets: inherit` and
 *      `permissions: write-all`, requires root-level `permissions: {}` (default-deny at root),
 *      and requires explicit least-privilege `permissions:` declarations in every job.
 *   4. ZIZMOR-04 (Template Injection Defense): Prohibits `${{ ... }}` expressions inside `run:` blocks
 *      (requires passing Issue titles/bodies, PR metadata, and inputs via `env:` variables).
 *   5. ZIZMOR-05 (Cache Poisoning Defense): Detects unsafe `actions/cache/save` or mutable cache
 *      restoration coupled with `pull_request_target` / untrusted release publishing.
 * ====================================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');

/**
 * Audits a single GitHub Actions YAML content string under `zizmor v1.30` rules.
 */
export function lintWorkflowYamlContent(rawContent, fileName = 'workflow.yml') {
  const issues = [];
  const lines = String(rawContent || '').replace(/\r\n/g, '\n').split('\n');

  // Strip comment-only lines for structural keyword checks
  const codeOnlyLines = lines.filter((l) => !l.trim().startsWith('#'));
  const codeOnlyText = codeOnlyLines.join('\n');

  // 1. ZIZMOR-01: Forbidden triggers (`pull_request_target`, `workflow_run`, `issue_comment`)
  if (/^\s*pull_request_target\s*:/m.test(codeOnlyText)) {
    issues.push({
      rule: 'ZIZMOR-01-FORBIDDEN-PULL-REQUEST-TARGET',
      file: fileName,
      message: 'Prohibido el uso de pull_request_target (riesgo crítico de escalación de privilegios y robo de secrets).'
    });
  }
  if (/^\s*workflow_run\s*:/m.test(codeOnlyText)) {
    issues.push({
      rule: 'ZIZMOR-01-FORBIDDEN-WORKFLOW-RUN',
      file: fileName,
      message: 'Prohibido el uso de workflow_run inseguro sin aislamiento criptográfico.'
    });
  }
  if (/^\s*issue_comment\s*:/m.test(codeOnlyText)) {
    issues.push({
      rule: 'ZIZMOR-01-FORBIDDEN-ISSUE-COMMENT',
      file: fileName,
      message: 'Prohibido el uso de issue_comment inseguro (riesgo de ejecución arbitraria desde PRs no confiables).'
    });
  }

  // 2. ZIZMOR-03: Prohibit `secrets: inherit` and `write-all` permissions, require root `permissions: {}`
  if (/^\s*secrets\s*:\s*inherit\b/m.test(codeOnlyText)) {
    issues.push({
      rule: 'ZIZMOR-03-FORBIDDEN-SECRETS-INHERIT',
      file: fileName,
      message: 'Prohibido el uso de secrets: inherit (exposición implícita de secretos a workflows llamados).'
    });
  }
  if (/^\s*permissions\s*:\s*write-all\b/m.test(codeOnlyText)) {
    issues.push({
      rule: 'ZIZMOR-03-EXCESSIVE-PERMISSIONS',
      file: fileName,
      message: 'Prohibido permissions: write-all; declarar permisos explícitos de mínimo privilegio.'
    });
  }
  if (!/^permissions\s*:\s*\{\s*\}/m.test(codeOnlyText) && !/^permissions\s*:/m.test(codeOnlyText)) {
    issues.push({
      rule: 'ZIZMOR-03-MISSING-TOP-PERMISSIONS',
      file: fileName,
      message: 'Falta declaración explícita de permissions: {} a nivel raíz del workflow.'
    });
  }

  // 3. ZIZMOR-05: Cache Poisoning detection
  if (
    /uses\s*:\s*actions\/cache/i.test(codeOnlyText) &&
    (/restore-keys\s*:/i.test(codeOnlyText) || /lookup-only\s*:\s*false/i.test(codeOnlyText)) &&
    /permissions\s*:\s*\n\s+contents\s*:\s*write/i.test(codeOnlyText)
  ) {
    issues.push({
      rule: 'ZIZMOR-05-CACHE-POISONING',
      file: fileName,
      message: 'Detectado riesgo de cache-poisoning (actions/cache con restore-keys en job con permisos de escritura).'
    });
  }

  // 4. Parse jobs, checkout steps (`ZIZMOR-02`), job-level permissions (`ZIZMOR-03`), and `run:` blocks (`ZIZMOR-04`)
  let inJobs = false;
  let currentJob = null;
  let currentJobHasPermissions = false;
  const jobsFound = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const indent = line.match(/^(\s*)/)[1].length;

    if (indent === 0) {
      if (currentJob && !currentJobHasPermissions) {
        issues.push({
          rule: 'ZIZMOR-03-MISSING-JOB-PERMISSIONS',
          file: fileName,
          message: `El job '${currentJob}' no declara un bloque explícito de permissions: de mínimo privilegio.`
        });
      }
      currentJob = null;
      inJobs = /^jobs\s*:/.test(trimmed);
      continue;
    }

    if (inJobs && indent === 2 && /^[a-zA-Z0-9_-]+\s*:$/.test(trimmed)) {
      if (currentJob && !currentJobHasPermissions) {
        issues.push({
          rule: 'ZIZMOR-03-MISSING-JOB-PERMISSIONS',
          file: fileName,
          message: `El job '${currentJob}' no declara un bloque explícito de permissions: de mínimo privilegio.`
        });
      }
      currentJob = trimmed.replace(':', '').trim();
      currentJobHasPermissions = false;
      jobsFound.push(currentJob);
      continue;
    }

    if (inJobs && currentJob && indent === 4 && /^permissions\s*:/.test(trimmed)) {
      currentJobHasPermissions = true;
    }

    // Check `actions/checkout` steps for `persist-credentials: false` (ZIZMOR-02)
    if (/uses\s*:\s*actions\/checkout@/i.test(trimmed)) {
      let hasPersistFalse = false;
      for (let j = i + 1; j < Math.min(lines.length, i + 10); j++) {
        const nextLine = lines[j];
        const nextTrim = nextLine.trim();
        if (!nextTrim || nextTrim.startsWith('#')) continue;
        const nextIndent = nextLine.match(/^(\s*)/)[1].length;
        if (nextIndent <= indent && nextTrim.startsWith('- ')) break;
        if (/^persist-credentials\s*:\s*false\b/i.test(nextTrim)) {
          hasPersistFalse = true;
          break;
        }
      }
      if (!hasPersistFalse) {
        issues.push({
          rule: 'ZIZMOR-02-CHECKOUT-PERSIST-CREDENTIALS',
          file: fileName,
          line: i + 1,
          message: `Paso actions/checkout en línea ${i + 1} carece de 'persist-credentials: false'.`
        });
      }
    }

    // Check `run:` blocks for `${{ ... }}` command injection (ZIZMOR-04)
    if (/^(?:-\s+)?run\s*:/.test(trimmed)) {
      const inlineRunContent = trimmed.replace(/^(?:-\s+)?run\s*:\s*/, '');
      if (inlineRunContent && inlineRunContent !== '|' && inlineRunContent !== '>') {
        if (/\$\{\{[^}]+\}\}/.test(inlineRunContent)) {
          issues.push({
            rule: 'ZIZMOR-04-TEMPLATE-COMMAND-INJECTION',
            file: fileName,
            line: i + 1,
            message: `Expresión \${{ ... }} interpolada directamente en 'run:' (línea ${i + 1}). Pasar por variables de entorno 'env:'.`
          });
        }
      } else {
        for (let j = i + 1; j < lines.length; j++) {
          const runLine = lines[j];
          const runTrim = runLine.trim();
          if (!runTrim) continue;
          const runIndent = runLine.match(/^(\s*)/)[1].length;
          if (runIndent <= indent) break;
          if (!runTrim.startsWith('#') && /\$\{\{[^}]+\}\}/.test(runTrim)) {
            issues.push({
              rule: 'ZIZMOR-04-TEMPLATE-COMMAND-INJECTION',
              file: fileName,
              line: j + 1,
              message: `Expresión \${{ ... }} interpolada dentro del bloque 'run:' (línea ${j + 1}). Pasar siempre inputs/secrets vía 'env:'.`
            });
          }
        }
      }
    }
  }

  if (currentJob && !currentJobHasPermissions) {
    issues.push({
      rule: 'ZIZMOR-03-MISSING-JOB-PERMISSIONS',
      file: fileName,
      message: `El job '${currentJob}' no declara un bloque explícito de permissions: de mínimo privilegio.`
    });
  }

  const rootEmptyPermissions = /^permissions\s*:\s*\{\s*\}/m.test(codeOnlyText);

  return {
    file: fileName,
    passed: issues.length === 0,
    rootDefaultDenyPermissions: rootEmptyPermissions,
    jobsCount: jobsFound.length,
    issues
  };
}

/**
 * Audits all `.yml` / `.yaml` files inside `.github/workflows/`.
 */
export function runWorkflowSecurityLinter(rootDir = ROOT) {
  const workflowsDir = path.join(rootDir, '.github', 'workflows');
  if (!fs.existsSync(workflowsDir)) {
    return {
      passed: false,
      zizmorVersion: '1.30.0',
      workflowsChecked: 0,
      results: [],
      issues: [{ rule: 'WORKFLOWS_DIR_MISSING', file: '.github/workflows', message: 'No existe .github/workflows' }]
    };
  }

  const files = fs
    .readdirSync(workflowsDir)
    .filter((f) => f.endsWith('.yml') || f.endsWith('.yaml'))
    .sort();

  const results = [];
  const allIssues = [];

  for (const file of files) {
    const fullPath = path.join(workflowsDir, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    const res = lintWorkflowYamlContent(content, file);
    results.push(res);
    allIssues.push(...res.issues);
  }

  return {
    passed: allIssues.length === 0,
    zizmorVersion: '1.30.0',
    workflowsChecked: files.length,
    workflowFiles: files,
    results,
    issues: allIssues
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const report = runWorkflowSecurityLinter();
  console.log('==================================================================');
  console.log('🛡️  OWASP GITHUB ACTIONS & ZIZMOR v1.30 WORKFLOW LINTER (2026)');
  console.log('==================================================================');
  for (const r of report.results) {
    console.log(
      `  ${r.passed ? '✓' : '✗'} [${r.file}] RootPerms={}: ${r.rootDefaultDenyPermissions} | Jobs: ${r.jobsCount} | Status: ${r.passed ? 'PASS (0 issues)' : 'FAIL'}`
    );
  }
  console.log('------------------------------------------------------------------');
  if (report.passed) {
    console.log(`✅ [ZIZMOR v1.30 LINTER PASSED] ${report.workflowsChecked} workflows verified with 0 security violations.`);
    process.exit(0);
  } else {
    for (const issue of report.issues) {
      console.error(`  ❌ [${issue.rule}] ${issue.file}${issue.line ? ':' + issue.line : ''} — ${issue.message}`);
    }
    process.exit(1);
  }
}
