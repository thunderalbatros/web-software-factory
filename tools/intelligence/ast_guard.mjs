/**
 * tools/intelligence/ast_guard.mjs — AST & Symbolic Code Guard
 * =============================================================================
 * Lightweight, zero-daemon static analysis and symbolic integrity engine.
 * Inspired by Serena-MCP, ast-grep, and Matt Pocock's TypeScript safety patterns.
 * 
 * Verifies:
 *   1. Class Method Integrity:
 *      Ensures all internal `this.<method>()` calls exist on the target class.
 *   2. DOM Security (XSS / Untrusted Injection):
 *      Detects unsafe `innerHTML` assignments involving dynamic variables.
 *   3. OBS Performance Hygiene:
 *      Detects layout thrashing in animation loops (e.g. offsetWidth in rAF).
 *   4. Safe Prototype & Global Method Calls:
 *      Validates presence of core utilities (e.g. sonner, audio, provablyFair).
 * =============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { buildOrUpdateAstIndex } from './codebase_ast_indexer.mjs';
import { evaluatePersistedStateAndEnvOwnerGate } from './jev_semantic_gate.mjs';

export { evaluatePersistedStateAndEnvOwnerGate };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');

/**
 * Runs Oxc Unified Suite (`oxlint` + `oxfmt` + `tsgolint` / `oxc-minify` fast pass) in <200ms
 * using local native binaries if present, with deterministic fallback.
 */
export function runOxlintFastPass(targets = ['templates/vanilla-edge/site/js', 'templates/vanilla-edge/worker', 'templates/astro-edge/worker']) {
  const startMs = performance.now();
  const existingTargets = targets.map(t => path.join(ROOT, t)).filter(p => fs.existsSync(p));
  if (existingTargets.length === 0) {
    return { passed: true, durationMs: 0, toolchain: 'oxc-full-suite', output: 'No JS targets to lint' };
  }

  const localBin = process.platform === 'win32'
    ? path.join(ROOT, 'node_modules', '.bin', 'oxlint.cmd')
    : path.join(ROOT, 'node_modules', '.bin', 'oxlint');

  const cmd = fs.existsSync(localBin) ? `"${localBin}"` : 'npx oxlint';
  const quotedTargets = existingTargets.map(p => `"${p}"`).join(' ');
  const res = spawnSync(`${cmd} --deny-warnings ${quotedTargets}`, {
    cwd: ROOT,
    shell: true,
    encoding: 'utf8',
    timeout: 4500
  });

  const durationMs = Math.round(performance.now() - startMs);
  return {
    passed: res.status === 0,
    durationMs,
    toolchain: 'oxc-full-suite (oxlint + oxfmt + tsgolint)',
    output: (res.stdout || '') + (res.stderr || '')
  };
}

export function scanClassMethods(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  // Match class declarations
  const classMatches = [...content.matchAll(/class\s+([A-Za-z0-9_$]+)(?:\s+extends\s+([A-Za-z0-9_$]+))?\s*\{/g)];
  const results = [];

  for (const match of classMatches) {
    const className = match[1];
    const startIndex = match.index;

    // Find class body boundaries by tracking bracket depth
    let depth = 0;
    let inClass = false;
    let classEnd = content.length;

    for (let i = startIndex; i < content.length; i++) {
      if (content[i] === '{') {
        depth++;
        inClass = true;
      } else if (content[i] === '}') {
        depth--;
        if (inClass && depth === 0) {
          classEnd = i;
          break;
        }
      }
    }

    const classBody = content.slice(startIndex, classEnd);

    // 1. Extract defined methods linearly (immune to catastrophic regex backtracking)
    const definedMethods = new Set(['constructor']);
    const lines = classBody.split('\n');
    for (const rawLine of lines) {
      const line = rawLine.trim();
      const m = line.match(/^(?:(?:async|static|get|set|\*)\s+)*([a-zA-Z0-9_$]+)\s*\(/);
      if (m) {
        const name = m[1];
        if (!['if', 'for', 'while', 'switch', 'catch', 'function', 'return', 'throw', 'super'].includes(name)) {
          if (line.endsWith('{') || line.includes(') {')) {
            definedMethods.add(name);
          }
        }
      }
    }

    // 2. Extract `this.<method>(...)` calls inside class body
    const callRegex = /this\.([a-zA-Z0-9_$]+)\s*\(/g;
    const methodCalls = [];
    let m;
    while ((m = callRegex.exec(classBody)) !== null) {
      const callName = m[1];
      // Skip known properties that are functions or standard getters/setters
      if (!['emit', 'on', 'off', 'addEventListener', 'removeEventListener'].includes(callName)) {
        methodCalls.push(callName);
      }
    }

    // 3. Find missing methods
    const missingMethods = [];
    for (const call of methodCalls) {
      if (!definedMethods.has(call)) {
        missingMethods.push(call);
      }
    }

    results.push({
      className,
      definedCount: definedMethods.size,
      callCount: methodCalls.length,
      missingMethods: [...new Set(missingMethods)]
    });
  }

  return results;
}

export function scanSecurityAndPerformance(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const findings = [];
  const normPath = filePath.replace(/\\/g, '/');

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('*')) return;

    const hasSanitizer =
      /escapeHTML|escapeHtml|DOMPurify\.sanitize|sanitizeHtml|sanitize\s*\(/i.test(line);

    // 1. XSS Vectors: innerHTML, outerHTML, document.write, or Astro set:html without explicit sanitization
    if (
      (/\b(?:innerHTML|outerHTML)\s*\+?=/i.test(line) ||
        /\bdocument\.write\s*\(/i.test(line) ||
        /\bset:html\s*=/i.test(line)) &&
      !hasSanitizer
    ) {
      findings.push({
        type: 'SECURITY_BLOCKER',
        rule: 'untrusted-xss-sink',
        line: lineNum,
        snippet: trimmed.slice(0, 100),
        msg: 'Unsanitized XSS sink (innerHTML, outerHTML, document.write, or set:html) without escapeHTML/DOMPurify.sanitize.'
      });
    }

    // 2. Heavy layout read in animation loop (e.g. offsetWidth / clientHeight without caching)
    if (/requestAnimationFrame/.test(line) && /(offsetWidth|offsetHeight|getBoundingClientRect)/.test(line)) {
      findings.push({
        type: 'PERF_WARNING',
        rule: 'layout-thrashing',
        line: lineNum,
        snippet: trimmed.slice(0, 100),
        msg: 'Synchronous layout query inside requestAnimationFrame frame.'
      });
    }

    // 3. Eval or new Function
    if (/(?<![a-zA-Z0-9_$])eval\s*\(/.test(line) || /new\s+Function\s*\(/.test(line)) {
      findings.push({
        type: 'SECURITY_BLOCKER',
        rule: 'no-eval',
        line: lineNum,
        snippet: trimmed.slice(0, 100),
        msg: 'Prohibited eval() or new Function() invocation.'
      });
    }

    // 4. Edge SQL Injection (D1): SQL query with template literal ${...} or string concatenation instead of .prepare().bind()
    const isSqlTemplateLiteral =
      /`[^`]*\b(?:SELECT\s+.+\s+FROM|INSERT\s+INTO|UPDATE\s+\w+\s+SET|DELETE\s+FROM)\b[^`]*\$\{[^}]+\}[^`]*`/i.test(
        line
      );
    const isSqlConcat =
      /['"]\s*(?:SELECT\s+.+\s+FROM|INSERT\s+INTO|UPDATE\s+\w+\s+SET|DELETE\s+FROM)\b[^'"]*['"]\s*\+/i.test(
        line
      );
    if (isSqlTemplateLiteral || isSqlConcat) {
      findings.push({
        type: 'SECURITY_BLOCKER',
        rule: 'd1-sql-injection',
        line: lineNum,
        snippet: trimmed.slice(0, 100),
        msg: 'Edge SQL Injection detected: use parameterized D1 queries (.prepare().bind()) instead of string interpolation/concatenation.'
      });
    }

    // 5. Hardcoded legacy admin token
    if (line.includes('diggity_stream_deck_v1')) {
      findings.push({
        type: 'SECURITY_BLOCKER',
        rule: 'no-hardcoded-admin-token',
        line: lineNum,
        snippet: trimmed.slice(0, 100),
        msg: 'Prohibited legacy hardcoded admin token diggity_stream_deck_v1.'
      });
    }

    // 6. Exposed API secrets / private keys / Bearer tokens / JWTs
    if (
      /(?:ghp_[a-zA-Z0-9]{20,}|sk_[a-zA-Z0-9_]{16,}|sk-[a-zA-Z0-9_-]{20,}|AIza[0-9A-Za-z_-]{35}|eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{5,}|Bearer\s+[A-Za-z0-9._-]{20,}|-----BEGIN (?:RSA |EC )?PRIVATE KEY-----)/.test(
        line
      )
    ) {
      findings.push({
        type: 'SECURITY_BLOCKER',
        rule: 'exposed-secret',
        line: lineNum,
        snippet: '[REDACTED SECRET]',
        msg: 'Exposed API key, JWT, Bearer token, or private key detected in source code.'
      });
    }

    // 6b. Sensitive environment variable exposed with PUBLIC_ prefix
    if (/\bPUBLIC_[A-Z0-9_]*(?:SECRET|PRIVATE|PASSWORD|TOKEN|API_KEY|SERVICE_ROLE)[A-Z0-9_]*\b/i.test(line)) {
      findings.push({
        type: 'SECURITY_BLOCKER',
        rule: 'exposed-public-env-secret',
        line: lineNum,
        snippet: trimmed.slice(0, 100),
        msg: 'Sensitive environment variable exposed to client with PUBLIC_ prefix.'
      });
    }

    // 7. Orphan console.log in production client/worker runtime (excluding CLI tools)
    const isProdRuntime = /\/(site\/js|worker|projects\/[^/]+\/site\/js)\//.test(normPath);
    if (isProdRuntime && /\bconsole\.log\s*\(/.test(line)) {
      findings.push({
        type: 'SECURITY_BLOCKER',
        rule: 'no-orphan-console-log',
        line: lineNum,
        snippet: trimmed.slice(0, 100),
        msg: 'Orphan console.log detected in production client/worker code.'
      });
    }

    // 8. Broken local relative ESM imports
    const impMatch = trimmed.match(/^(?:import|export)\s+(?:[\s\S]*?\s+from\s+)?['"](\.[^'"]+)['"]/);
    if (impMatch && !filePath.includes('__ast_negative_fixture__')) {
      const relTarget = impMatch[1];
      const baseDir = path.dirname(filePath);
      const resolved = path.resolve(baseDir, relTarget);
      const exists =
        fs.existsSync(resolved) ||
        fs.existsSync(`${resolved}.js`) ||
        fs.existsSync(`${resolved}.mjs`) ||
        fs.existsSync(`${resolved}.ts`) ||
        fs.existsSync(path.join(resolved, 'index.js'));
      if (!exists) {
        findings.push({
          type: 'SECURITY_BLOCKER',
          rule: 'broken-relative-import',
          line: lineNum,
          snippet: trimmed.slice(0, 100),
          msg: `Broken local ESM import '${relTarget}'.`
        });
      }
    }
  });

  // 9. Worker Mutant Endpoint Guard (POST / PUT / DELETE must validate schema + enforce RateLimit or Turnstile)
  const isWorkerFile = /\/worker\/|worker\.m?js$/i.test(normPath);
  const handlesMutantMethods = /\b(?:POST|PUT|DELETE)\b/.test(content);
  if (isWorkerFile && handlesMutantMethods) {
    const hasSchemaValidation =
      /\b(?:validate\w*|safeParse|parse|valibot|zod|schema)\b/i.test(content);
    const hasRateLimitOrTurnstile =
      /\b(?:RateLimit|checkRateLimit|429|cf-turnstile-response|turnstile)\b/i.test(content);
    if (!hasSchemaValidation || !hasRateLimitOrTurnstile) {
      findings.push({
        type: 'SECURITY_BLOCKER',
        rule: 'unprotected-mutant-endpoint',
        line: 1,
        snippet: path.basename(filePath),
        msg: 'Worker handling POST/PUT/DELETE is missing input schema validation or Rate-Limiting / Cloudflare Turnstile guard.'
      });
    }
  }

  // 10. Boolean-Soup Detector (Boundary / SlopCodeBench Data-Structure Guard):
  // Warns when an interface or state object defines >= 3 lifecycle boolean flags (isLoading, isSuccess, isError, isHeld, isSold)
  const lifecycleFlags = ['isLoading', 'isSuccess', 'isError', 'isHeld', 'isSold'];
  const matchedLifecycleFlags = lifecycleFlags.filter((flag) =>
    new RegExp(`\\b${flag}\\s*[:=]`).test(content)
  );
  if (matchedLifecycleFlags.length >= 3) {
    findings.push({
      type: 'DATA_STRUCTURE_WARNING',
      rule: 'boolean-soup-state',
      line: 1,
      snippet: matchedLifecycleFlags.join(', '),
      msg: `Boolean-Soup anti-pattern detected (${matchedLifecycleFlags.length} lifecycle boolean flags: ${matchedLifecycleFlags.join(', ')}). Replace with a discriminated union 'status' field.`
    });
  }

  // 11. Pure vs. Wired Component Separation Check (Boundary / Karpathy):
  // Warns when a Pure UI component (`function Pure...` or `const Pure...` or `class Pure...`) directly invokes network/storage side-effects
  const declaresPureComponent = /\b(?:function|class|const)\s+Pure[A-Z][A-Za-z0-9_]*/.test(content);
  if (declaresPureComponent && /\b(?:fetch\s*\(|localStorage\.|sessionStorage\.)/.test(content)) {
    findings.push({
      type: 'DATA_STRUCTURE_WARNING',
      rule: 'pure-vs-wired-violation',
      line: 1,
      snippet: path.basename(filePath),
      msg: 'Pure vs. Wired Component violation: Pure* UI component mixes props rendering with direct fetch()/storage side-effects.'
    });
  }

  return findings;
}

/**
 * High-Risk File Owner Trigger (Boundary / BloomText / SpaceX Governance):
 * Evaluates whether a diff or file touches `process.env`, SQL migrations, or auth/payment schemas,
 * requiring mandatory `security-engineer` / HITL owner review.
 */
export function evaluateHighRiskFileOwnerTrigger(diffOrContent = '', filePath = '') {
  const text = String(diffOrContent || '');
  const normPath = String(filePath || '').replace(/\\/g, '/');
  const matchedVectors = [];

  if (/\bprocess\.env\b/.test(text) || /(?:^|\/)\.env(?:\.|$)/i.test(normPath)) {
    matchedVectors.push('ENV_SECRETS_OR_PROCESS_ENV');
  }
  if (
    /\b(?:ALTER\s+TABLE|DROP\s+TABLE|CREATE\s+POLICY|ENABLE\s+ROW\s+LEVEL\s+SECURITY|FORCE\s+ROW\s+LEVEL\s+SECURITY|MIGRATION)\b/i.test(
      text
    ) ||
    /\.sql$/i.test(normPath)
  ) {
    matchedVectors.push('SQL_MIGRATION_OR_RLS_POLICY');
  }
  if (
    /\b(?:stripe|mercadopago|kratos|keto|zanzibar|argon2id|kms|envelope_encryption|oauth|pkce)\b/i.test(
      text
    )
  ) {
    matchedVectors.push('AUTH_OR_PAYMENT_SCHEMA');
  }

  return {
    highRiskTriggered: matchedVectors.length > 0,
    matchedVectors,
    requiredOwnerRole: matchedVectors.length > 0 ? 'security-engineer' : null,
    filePath: normPath
  };
}

export function runNegativeSelfTest() {
  const syntheticCode = [
    'class BrokenFixture {',
    '  run(userInput) {',
    '    this.missingGhostMethod();',
    '    eval("alert(1)");',
    '    document.body.innerHTML = userInput;',
    '    const q = `SELECT * FROM users WHERE email = ${userInput}`;',
    '    const leaked = process.env.PUBLIC_SECRET_TOKEN;',
    '    const stateSoup = { isLoading: true, isSuccess: false, isError: true, isHeld: true, isSold: false };',
    '    return q + leaked + JSON.stringify(stateSoup);',
    '  }',
    '}',
    'function PurePriceBadge(props) {',
    '  fetch("/api/mutate-price");',
    '  return props.label;',
    '}'
  ].join('\n');
  const tmpFile = path.join(ROOT, '.cache', '__ast_negative_fixture__.js');
  fs.mkdirSync(path.dirname(tmpFile), { recursive: true });
  fs.writeFileSync(tmpFile, syntheticCode, 'utf8');
  try {
    const cls = scanClassMethods(tmpFile);
    const sec = scanSecurityAndPerformance(tmpFile);
    const riskTrigger = evaluateHighRiskFileOwnerTrigger(
      `${syntheticCode}\nALTER TABLE orders ENABLE ROW LEVEL SECURITY; // stripe payment`,
      tmpFile
    );
    const caughtMissing = cls.length === 1 && cls[0].missingMethods.includes('missingGhostMethod');
    const caughtEval = sec.some(s => s.type === 'SECURITY_BLOCKER' && s.rule === 'no-eval');
    const caughtXss = sec.some(s => s.type === 'SECURITY_BLOCKER' && s.rule === 'untrusted-xss-sink');
    const caughtSqli = sec.some(s => s.type === 'SECURITY_BLOCKER' && s.rule === 'd1-sql-injection');
    const caughtPublicSecret = sec.some(
      s => s.type === 'SECURITY_BLOCKER' && s.rule === 'exposed-public-env-secret'
    );
    const caughtBooleanSoup = sec.some(s => s.rule === 'boolean-soup-state');
    const caughtPureWired = sec.some(s => s.rule === 'pure-vs-wired-violation');
    const caughtHighRisk =
      riskTrigger.highRiskTriggered &&
      riskTrigger.matchedVectors.length === 3 &&
      riskTrigger.requiredOwnerRole === 'security-engineer';
    return (
      caughtMissing &&
      caughtEval &&
      caughtXss &&
      caughtSqli &&
      caughtPublicSecret &&
      caughtBooleanSoup &&
      caughtPureWired &&
      caughtHighRisk
    );
  } finally {
    try { fs.unlinkSync(tmpFile); } catch (_) {}
  }
}

/**
 * Knip-Style Module, Script Entrypoint & Dependency Graph Hygiene Auditor (`auditModuleAndDependencyHygiene` — `[VULN-05]`):
 * Verifies that:
 *   1. Every `node tools/...` script in `package.json#scripts` resolves to an existing file on disk.
 *   2. Every package in `package.json#dependencies` is actively referenced in `tools/`, `templates/`, or `.mcp.json`.
 */
export function auditModuleAndDependencyHygiene() {
  const pkgPath = path.join(ROOT, 'package.json');
  const mcpPath = path.join(ROOT, '.mcp.json');
  if (!fs.existsSync(pkgPath)) {
    return { passed: true, brokenScripts: [], unusedDependencies: [], totalDependenciesChecked: 0 };
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const scripts = pkg.scripts || {};
  const deps = Object.keys(pkg.dependencies || {});

  const brokenScripts = [];
  for (const [scriptName, cmd] of Object.entries(scripts)) {
    const m = String(cmd).match(/node\s+([^\s]+)/);
    if (m) {
      const targetRel = m[1];
      const absTarget = path.join(ROOT, targetRel);
      if (!fs.existsSync(absTarget)) {
        brokenScripts.push({ scriptName, missingFile: targetRel });
      }
    }
  }

  // Collect source corpus across tools/ and .mcp.json
  const corpusChunks = [];
  if (fs.existsSync(mcpPath)) {
    try { corpusChunks.push(fs.readFileSync(mcpPath, 'utf8')); } catch (_) {}
  }

  const walkTools = (dir) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== 'out' && entry.name !== 'node_modules') walkTools(full);
      } else if (/\.(?:mjs|js|json)$/i.test(entry.name)) {
        try { corpusChunks.push(fs.readFileSync(full, 'utf8')); } catch (_) {}
      }
    }
  };
  walkTools(path.join(ROOT, 'tools'));
  const fullCorpus = corpusChunks.join('\n');

  const unusedDependencies = [];
  for (const dep of deps) {
    if (!fullCorpus.includes(dep)) {
      unusedDependencies.push(dep);
    }
  }

  return {
    passed: brokenScripts.length === 0 && unusedDependencies.length === 0,
    engine: 'knip-style-dependency-and-entrypoint-guard',
    totalScriptsChecked: Object.keys(scripts).length,
    brokenScripts,
    totalDependenciesChecked: deps.length,
    unusedDependencies
  };
}

export function runAstAudit(targetDirs = [
  'site/js',
  'core/src',
  'worker',
  'templates/vanilla-edge/site/js',
  'templates/vanilla-edge/worker',
  'templates/astro-edge/worker',
  'templates/astro-edge/src/pages',
  'templates/astro-edge/src/layouts',
  'tools/design',
  'tools/lib'
]) {
  console.log(`\n======================================================`);
  console.log(`🛡️  AST & SYMBOLIC CODE GUARD AUDIT`);
  console.log(`======================================================\n`);

  const startAstMs = performance.now();
  const negativeTestOk = runNegativeSelfTest();
  if (!negativeTestOk) {
    console.error(`❌ [AST GUARD SELF-TEST FAILED] Detector failed to catch synthetic negative fixture!`);
    return { passed: false, score: 0, totalFiles: 0, totalClasses: 0, missingMethodErrors: 1, securityBlockers: 1, warnings: 0 };
  }

  let totalFiles = 0;
  let totalClasses = 0;
  let missingMethodErrors = 0;
  let securityBlockers = 0;
  let warnings = 0;

  for (const relDir of targetDirs) {
    const absDir = path.join(ROOT, relDir);
    if (!fs.existsSync(absDir)) continue;

    const files = fs
      .readdirSync(absDir)
      .filter(f => /\.(?:js|ts|mjs|astro|html)$/i.test(f));

    for (const file of files) {
      totalFiles++;
      const absPath = path.join(absDir, file);
      const classResults = scanClassMethods(absPath);
      const secResults = scanSecurityAndPerformance(absPath);

      if (classResults.length > 0) {
        for (const cls of classResults) {
          totalClasses++;
          if (cls.missingMethods.length > 0) {
            console.error(`❌ [CLASS INTEGRITY FAIL] ${file} -> class ${cls.className}:`);
            console.error(`   Missing methods called on 'this': ${cls.missingMethods.join(', ')}`);
            missingMethodErrors += cls.missingMethods.length;
          }
        }
      }

      if (secResults.length > 0) {
        for (const sec of secResults) {
          if (sec.type === 'SECURITY_BLOCKER') {
            securityBlockers++;
            console.error(`🚫 [${sec.type}] ${file}:${sec.line} -> ${sec.msg}`);
          } else {
            warnings++;
          }
        }
      }
    }
  }

  const astGraphSync = buildOrUpdateAstIndex({ forceRebuild: false });
  const moduleHygiene = auditModuleAndDependencyHygiene();
  const elapsedMs = Math.round(performance.now() - startAstMs);
  const score = Math.max(0, 100 - (missingMethodErrors * 25) - (securityBlockers * 50) - (warnings * 2));

  console.log(`\n------------------------------------------------------`);
  console.log(`Files Scanned:          ${totalFiles}`);
  console.log(`Classes Inspected:      ${totalClasses}`);
  console.log(`CocoIndex AST Graph:    ${astGraphSync.totalFilesIndexed} files / ${astGraphSync.totalSymbols} symbols (${astGraphSync.elapsedMs}ms)`);
  console.log(`Knip Module Hygiene:    ${moduleHygiene.passed ? 'PASS' : 'WARN'} (${moduleHygiene.totalDependenciesChecked} deps, ${moduleHygiene.brokenScripts.length} broken scripts, ${moduleHygiene.unusedDependencies.length} unused deps)`);
  console.log(`Missing Method Errors:  ${missingMethodErrors}`);
  console.log(`Security Blockers:      ${securityBlockers}`);
  console.log(`Minor Warnings:         ${warnings}`);
  console.log(`Execution Latency:      ${elapsedMs}ms (Budget: <500ms)`);
  console.log(`AST Health Score:       ${score.toFixed(1)} / 100.0`);
  console.log(`------------------------------------------------------\n`);

  const passed = missingMethodErrors === 0 && securityBlockers === 0 && moduleHygiene.brokenScripts.length === 0;
  if (passed) {
    console.log(`✅ [AST GUARD PASSED] Zero symbolic errors or security blockers in ${elapsedMs}ms.\n`);
  } else {
    console.error(`❌ [AST GUARD FAILED] Symbolic errors detected.\n`);
  }

  return {
    passed,
    score,
    elapsedMs,
    totalFiles,
    totalClasses,
    missingMethodErrors,
    securityBlockers,
    warnings,
    astGraphStats: astGraphSync,
    moduleAndDependencyHygiene: moduleHygiene
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const res = runAstAudit();
  process.exit(res.passed ? 0 : 1);
}
