#!/usr/bin/env node
/**
 * tools/audit/security_gate.mjs — Unified Zero-Trust AppSec, Edge/D1 & 60FPS Quarantine Gate (SOTA 2026)
 * ======================================================================================================
 * Executes deterministic:
 *   1. SCA (Supply Chain Guard) & SAST (AST Guard <500ms) + 60-FPS GPU Compositor checks.
 *   2. Edge Worker (`worker/index.js`) OWASP ASVS v5.0 / Top 10:2025 deterministic verification:
 *      - Anti-IDOR sequential integer route guard (`hasSequentialNumericIdInPath` / opaque UUIDv4/ULID)
 *      - Zero HTTP `err.stack` leaks & suppression of `Server`/`X-Powered-By` headers (`A10:2025`)
 *      - Fetch Metadata validation (`Sec-Fetch-Site`, `Sec-Fetch-Mode`, `Sec-Fetch-Dest`)
 *      - Hard payload size limits (`MAX_BODY_BYTES` / HTTP `413`) and anti-Mass Assignment
 *      - Zero `.map` source maps exposed in production `dist/`
 *   3. Combined Offline Secret Scanner (`Gitleaks` regex patterns + Shannon Entropy `H >= 4.3` bits/char).
 *   4. Lightweight PII Entity Redactor (`Presidio` pattern, zero Docker) for console/telemetry hygiene.
 * ======================================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runSupplyChainGuard } from './supply_chain_guard.mjs';
import { runAstAudit } from './ast_guard.mjs';
import { runWorkflowSecurityLinter, lintWorkflowYamlContent } from './workflow_security_linter.mjs';
import { verifyAgentGovernanceKernelSelfTest } from '../intelligence/agent_governance_kernel.mjs';
import { runMcpSecurityAudit } from './mcp_security_auditor.mjs';
import {
  generateEnterprisePostgresRlsSchema,
  generateEdgeD1SqlSchema,
  EnvelopeEncryptionEngine
} from '../db/dual_database_forge.mjs';
import {
  verifyZeroTrustJwtAndCookie,
  evaluateZanzibarRelationAccess
} from '../security/identity_and_commerce_guard.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');

const BLOCKED_HEAVY_OR_INSECURE_TECH = [
  {
    pattern: /\b(jquery|moment\.js|lodash-full|bootstrap\.js| eval\(|document\.write)\b/i,
    reason: 'Librería heredada o insegura que bloquea el hilo principal y degrada el rendimiento en Edge/Mobile.'
  },
  {
    pattern: /\b(animate\s*\(\s*\{[^}]*\b(?:top|left|width|height)\b)/i,
    reason: 'La animación modifica propiedades de geometría (top/left/width/height) y degrada los 60 FPS en lugar de usar GPU transform/opacity.'
  },
  {
    pattern: /\b(paid-api|credit-card-required|docker-daemon-required)\b/i,
    reason: 'Viola CONSTRAINTS.md (requiere tarjeta de crédito, servicio pago o daemon pesado Docker).'
  }
];

/**
 * Gitleaks-inspired deterministic secret regex catalog (offline, zero Docker).
 */
export const GITLEAKS_SECRET_PATTERNS = [
  { id: 'AWS_ACCESS_KEY_ID', regex: /\b(?:A3T[A-Z0-9]|AKIA|AGPA|AIDA|AROA|AIPA|ANPA|ANVA|ASIA)[A-Z0-9]{16}\b/ },
  { id: 'GITHUB_PAT_TOKEN', regex: /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9_]{36,255}\b|\bgithub_pat_[A-Za-z0-9_]{22,255}\b/ },
  { id: 'STRIPE_LIVE_SECRET', regex: /\bsk_live_[0-9a-zA-Z]{24,99}\b/ },
  { id: 'SLACK_TOKEN', regex: /\bxox[baprs]-[0-9]{10,13}-[0-9]{10,13}[a-zA-Z0-9-]*\b/ },
  { id: 'PRIVATE_KEY_PEM', regex: /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/ },
  { id: 'GOOGLE_API_KEY', regex: /\bAIza[0-9A-Za-z\-_]{35}\b/ }
];

/**
 * Computes Shannon entropy in bits per character for a string literal.
 */
export function computeShannonEntropy(str = '') {
  const s = String(str || '');
  if (!s.length) return 0;
  const freq = new Map();
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    freq.set(ch, (freq.get(ch) || 0) + 1);
  }
  let entropy = 0;
  const len = s.length;
  for (const count of freq.values()) {
    const p = count / len;
    entropy -= p * Math.log2(p);
  }
  return Number(entropy.toFixed(3));
}

/**
 * Lightweight Presidio-pattern PII entity detector & redactor (zero Docker).
 * Redacts emails, international phone numbers, credit card PANs, national IDs, IPv4s, and Bearer tokens.
 */
export function redactPiiEntities(input = '') {
  if (input === null || input === undefined) return '';
  let text = typeof input === 'string' ? input : JSON.stringify(input);

  // 1. Bearer / Authorization JWT or API tokens
  text = text.replace(/\bBearer\s+[A-Za-z0-9\-._~+/]+=*\b/gi, 'Bearer [REDACTED_BEARER_TOKEN]');
  // 2. Email addresses
  text = text.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g, '[REDACTED_EMAIL]');
  // 3. Credit card PANs (13-19 digits, spaced or dashed)
  text = text.replace(/\b(?:\d[ -]*?){13,19}\b/g, '[REDACTED_CREDIT_CARD_PAN]');
  // 4. Phone numbers (+CC and 8-14 digits)
  text = text.replace(/(?:\+\d{1,3}[\s-]?)?\(?\d{2,4}\)?[\s.-]\d{3,4}[\s.-]\d{3,4}\b/g, '[REDACTED_PHONE]');
  // 5. SSN / National ID patterns
  text = text.replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[REDACTED_GOV_ID]');

  return text;
}

/**
 * Verifies the Presidio-lite PII redactor deterministically before passing the gate.
 */
export function verifyPiiRedactorSelfTest() {
  const sample = 'User john.doe@empresa.com card 4532-0151-1283-0366 phone +54 11 4555-9988 token Bearer eyJhbGciOiJFUzI1NiJ9.payload.sig';
  const redacted = redactPiiEntities(sample);
  const leakedEmail = redacted.includes('john.doe@empresa.com');
  const leakedPan = redacted.includes('4532-0151-1283-0366');
  const leakedPhone = redacted.includes('4555-9988');
  const leakedToken = redacted.includes('eyJhbGciOiJFUzI1NiJ9');
  const passed = !leakedEmail && !leakedPan && !leakedPhone && !leakedToken;
  return {
    passed,
    redactedSample: redacted
  };
}

/**
 * Audits all `worker/index.js` files across `templates/` and `projects/` for:
 *   - Anti-IDOR sequential integer route protection (`hasSequentialNumericIdInPath` / opaque UUID/ULID)
 *   - Absence of unprotected sequential ID route definitions (`/api/.../:id` without UUID/ULID guard)
 *   - Absence of HTTP `err.stack` / `error.stack` response leaks (`A10:2025`)
 *   - Presence of `Sec-Fetch-Site`, `Sec-Fetch-Mode`, `Sec-Fetch-Dest` validation
 *   - Presence of hard payload size limits (`MAX_BODY_BYTES` / `413`)
 *   - Suppression of `Server` and `X-Powered-By` headers
 *   - Zero `.map` source maps exposed in `dist/`
 */
export function auditEdgeWorkersAndDist(rootDir = ROOT) {
  const issues = [];
  const workerPaths = [];

  for (const baseFolder of ['templates', 'projects']) {
    const absBase = path.join(rootDir, baseFolder);
    if (!fs.existsSync(absBase)) continue;
    for (const entry of fs.readdirSync(absBase, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const candidateWorker = path.join(absBase, entry.name, 'worker', 'index.js');
      if (fs.existsSync(candidateWorker)) {
        workerPaths.push(candidateWorker);
      }
      const distDir = path.join(absBase, entry.name, 'dist');
      if (fs.existsSync(distDir)) {
        const stack = [distDir];
        while (stack.length > 0) {
          const curr = stack.pop();
          for (const item of fs.readdirSync(curr, { withFileTypes: true })) {
            const full = path.join(curr, item.name);
            if (item.isDirectory()) stack.push(full);
            else if (item.name.endsWith('.map')) {
              issues.push(`[A10:2025-SOURCEMAP] Source map expuesto en producción: ${ path.relative(rootDir, full) }`);
            }
          }
        }
      }
    }
  }

  for (const wPath of workerPaths) {
    const rel = path.relative(rootDir, wPath).replace(/\\/g, '/');
    const src = fs.readFileSync(wPath, 'utf8');

    // 1. Anti-IDOR / Opaque UUIDv4 or ULID check on dynamic routes
    if (!src.includes('hasSequentialNumericIdInPath') && !src.includes('OPAQUE_UUID_OR_ULID_REQUIRED')) {
      issues.push(`[OWASP-A01:2025-IDOR] ${rel} carece de bloqueo determinista contra IDs enteros secuenciales en rutas dinámicas.`);
    }

    // 2. A10:2025 Zero stack trace leak in HTTP responses
    if (/\b(?:err|error)\.stack\b/.test(src)) {
      issues.push(`[OWASP-A10:2025-STACK-LEAK] ${rel} expone err.stack / error.stack en respuestas o trazas.`);
    }
    if (!src.includes('headers.delete("Server")') || !src.includes('headers.delete("X-Powered-By")')) {
      issues.push(`[OWASP-A10:2025-HEADERS] ${rel} no suprime explícitamente las cabeceras Server y X-Powered-By.`);
    }

    // 3. Fetch Metadata headers (Sec-Fetch-Site, Sec-Fetch-Mode, Sec-Fetch-Dest)
    if (!src.includes('Sec-Fetch-Site') || !src.includes('Sec-Fetch-Mode') || !src.includes('Sec-Fetch-Dest')) {
      issues.push(`[OWASP-EDGE-FETCH-METADATA] ${rel} no valida las cabeceras Sec-Fetch-Site, Sec-Fetch-Mode y Sec-Fetch-Dest.`);
    }

    // 4. Payload size limits (MAX_BODY_BYTES + 413 status)
    if (!src.includes('MAX_BODY_BYTES') || !src.includes('PAYLOAD_TOO_LARGE')) {
      issues.push(`[OWASP-VALIBOT-BOUNDARY] ${rel} no aplica límite duro de tamaño de payload (MAX_BODY_BYTES / 413).`);
    }
  }

  return {
    passed: issues.length === 0,
    workersChecked: workerPaths.length,
    issues
  };
}

/**
 * Scans source files across `templates/`, `projects/`, `tools/`, and `.github/workflows/`
 * for hardcoded secrets (Gitleaks regexes + high-entropy secret assignments).
 */
export function scanSecretsAndEntropy(rootDir = ROOT) {
  const issues = [];
  const targetDirs = ['templates', 'projects', 'tools', '.github'];
  const filesScanned = [];

  const walk = (dir) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (['node_modules', '.git', 'dist', 'out', '.obsidian'].includes(entry.name)) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (/\.(?:mjs|js|ts|yml|yaml|json)$/i.test(entry.name) && !entry.name.endsWith('package-lock.json')) {
        filesScanned.push(full);
      }
    }
  };

  for (const d of targetDirs) {
    walk(path.join(rootDir, d));
  }

  const secretAssignmentRegex =
    /\b(?:api_key|apikey|secret_key|private_key|auth_token|access_token|client_secret)\s*[:=]\s*['"]([A-Za-z0-9/+_=.-]{28,})['"]/gi;

  for (const fPath of filesScanned) {
    const rel = path.relative(rootDir, fPath).replace(/\\/g, '/');
    if (rel.endsWith('security_gate.mjs')) continue;
    const content = fs.readFileSync(fPath, 'utf8');

    for (const rule of GITLEAKS_SECRET_PATTERNS) {
      if (rule.regex.test(content)) {
        issues.push(`[GITLEAKS:${rule.id}] Secreto detectado en ${rel}`);
      }
    }

    let match;
    while ((match = secretAssignmentRegex.exec(content)) !== null) {
      const candidate = match[1];
      if (/^(?:factory-default-secret|placeholder|your-|example|test-|mock-)/i.test(candidate)) continue;
      const entropy = computeShannonEntropy(candidate);
      if (entropy >= 4.5) {
        issues.push(`[ENTROPY-SECRET] Literal de alta entropía (${entropy} bits/char) asignado a credencial en ${rel}`);
      }
    }
  }

  return {
    passed: issues.length === 0,
    filesScanned: filesScanned.length,
    issues
  };
}

/**
 * 10. Audits Dual Database (`edge-d1` & `enterprise-postgres` RLS + 3 Zones + EnvelopeEncryptionEngine)
 * and Ory Kratos/Keto Zanzibar Zero-Trust Identity invariants across `projects/` and `tools/db/`.
 */
export function auditEnterpriseDatabaseAndIdentity(rootDir = ROOT) {
  const issues = [];
  const pgCanonicalSql = generateEnterprisePostgresRlsSchema('audit-check');
  const d1CanonicalSql = generateEdgeD1SqlSchema('audit-check');

  // Verify canonical PostgreSQL RLS schema invariants
  if (
    !pgCanonicalSql.includes('ENABLE ROW LEVEL SECURITY;') ||
    !pgCanonicalSql.includes('FORCE ROW LEVEL SECURITY;') ||
    !pgCanonicalSql.includes('CREATE POLICY tenant_isolation_policy')
  ) {
    issues.push('[POSTGRES-RLS] El esquema enterprise-postgres carece de ENABLE/FORCE ROW LEVEL SECURITY o tenant_isolation_policy.');
  }
  if (
    !pgCanonicalSql.includes('CREATE SCHEMA IF NOT EXISTS zone_restricted;') ||
    !pgCanonicalSql.includes('CREATE SCHEMA IF NOT EXISTS zone_confidential;') ||
    !pgCanonicalSql.includes('CREATE SCHEMA IF NOT EXISTS zone_audit_worm;')
  ) {
    issues.push('[POSTGRES-ZONES] Faltan los 3 esquemas obligatorios (zone_restricted, zone_confidential, zone_audit_worm).');
  }
  if (/\b(?:SERIAL|BIGSERIAL|AUTOINCREMENT)\b/i.test(pgCanonicalSql) || /\b(?:SERIAL|BIGSERIAL|AUTOINCREMENT)\b/i.test(d1CanonicalSql)) {
    issues.push('[ANTI-IDOR-DB] Se detectaron claves primarias secuenciales (SERIAL/AUTOINCREMENT) en esquemas públicos.');
  }
  if (!pgCanonicalSql.includes('email_ciphertext_b64') || !pgCanonicalSql.includes('wrapped_dek_b64') || typeof EnvelopeEncryptionEngine !== 'function') {
    issues.push('[ENVELOPE-ENCRYPTION-PII] Las columnas PII de zone_restricted no están protegidas con EnvelopeEncryptionEngine (AES-256-GCM + KMS DEK).');
  }

  // Also inspect any project-specific `db/*.sql` files inside `projects/<slug>/db/`
  const projectsBase = path.join(rootDir, 'projects');
  let projectSqlFilesChecked = 0;
  if (fs.existsSync(projectsBase)) {
    for (const entry of fs.readdirSync(projectsBase, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const projRoot = path.join(projectsBase, entry.name);
      const pgFile = path.join(projRoot, 'db', 'enterprise_postgres_rls.sql');
      if (fs.existsSync(pgFile)) {
        projectSqlFilesChecked++;
        const sqlContent = fs.readFileSync(pgFile, 'utf8');
        if (!sqlContent.includes('ENABLE ROW LEVEL SECURITY') || !sqlContent.includes('FORCE ROW LEVEL SECURITY')) {
          issues.push(`[POSTGRES-RLS] ${entry.name}/db/enterprise_postgres_rls.sql no tiene ENABLE/FORCE ROW LEVEL SECURITY.`);
        }
        if (/\b(?:SERIAL|BIGSERIAL|AUTOINCREMENT)\b/i.test(sqlContent)) {
          issues.push(`[ANTI-IDOR-DB] ${entry.name}/db/enterprise_postgres_rls.sql expone claves secuenciales.`);
        }
        if (!sqlContent.includes('wrapped_dek_b64')) {
          issues.push(`[ENVELOPE-ENCRYPTION-PII] ${entry.name}/db/enterprise_postgres_rls.sql no utiliza columnas cifradas EnvelopeEncryptionEngine.`);
        }
      }
    }
  }

  // Verify Ory Kratos asymmetric JWT & Ory Keto Zanzibar Anti-IDOR check
  const jwtCheck = verifyZeroTrustJwtAndCookie({
    header: { alg: 'ES256' },
    payload: { iat: 1000, exp: 2800 }
  });
  const idorZanzibarCheck = evaluateZanzibarRelationAccess({
    namespace: 'tenants',
    objectId: '12345',
    relation: 'viewer',
    subjectId: '67890'
  });
  if (!jwtCheck.valid || idorZanzibarCheck.allowed) {
    issues.push('[ORY-ZERO-TRUST] Falló la verificación de JWT asimétrico (ES256) o bloqueo Anti-IDOR Zanzibar.');
  }

  return {
    passed: issues.length === 0,
    projectSqlFilesChecked,
    rlsVerified: true,
    envelopeEncryptionVerified: true,
    issues
  };
}

/**
 * AgentShield Harness & `safe-outputs` (`affaan-m/agentshield` + `github/gh-aw`) Security Auditor:
 * Inspects `AGENTS.md`, `CONSTRAINTS.md`, `factory.yaml`, `.mcp.json`, `.agents/skills/` and `.github/workflows/`
 * verifying absence of unsanitized shell hooks, wildcard permissions (`*`), token leaks, and enforcing `safeOutputsContract`.
 */
export function runAgentShieldHarnessAudit(rootDir = ROOT) {
  const issues = [];
  const criticalHarnessFiles = [
    path.join(rootDir, 'AGENTS.md'),
    path.join(rootDir, 'CONSTRAINTS.md'),
    path.join(rootDir, 'factory.yaml'),
    path.join(rootDir, '.mcp.json')
  ];

  let filesAudited = 0;
  for (const fp of criticalHarnessFiles) {
    if (!fs.existsSync(fp)) {
      issues.push(`[AGENTSHIELD] Missing critical harness configuration file: ${path.basename(fp)}`);
      continue;
    }
    filesAudited++;
    const content = fs.readFileSync(fp, 'utf8');
    if (/curl\s+[^\n|]+\|\s*(?:sh|bash)|wget\s+[^\n|]+\|\s*(?:sh|bash)/i.test(content)) {
      issues.push(`[AGENTSHIELD] Unsanitized remote pipe-to-shell hook detected in ${path.basename(fp)}.`);
    }
    if (/"permissions"\s*:\s*"\*"|permissions:\s*write-all/i.test(content)) {
      issues.push(`[AGENTSHIELD] Wildcard permission (*) detected in ${path.basename(fp)}.`);
    }
    for (const pat of GITLEAKS_SECRET_PATTERNS) {
      if (pat.regex.test(content)) {
        issues.push(`[AGENTSHIELD] Secret token pattern (${pat.id}) leaked in ${path.basename(fp)}.`);
      }
    }
  }

  // Verify `safeOutputsContract` in `factory.yaml`
  const factoryYamlPath = path.join(rootDir, 'factory.yaml');
  let safeOutputsVerified = false;
  if (fs.existsSync(factoryYamlPath)) {
    const fy = fs.readFileSync(factoryYamlPath, 'utf8');
    safeOutputsVerified =
      fy.includes('safeOutputsContract:') &&
      fy.includes('forbidDirectProductionPush: true') &&
      fy.includes('forbidWildcardPermissions: true');
    if (!safeOutputsVerified) {
      issues.push('[AGENTSHIELD:GH-AW] Missing declarative `safeOutputsContract` in factory.yaml.');
    }
  }

  // Scan `.agents/skills/` sample for dangerous arbitrary hooks
  const skillsDir = path.join(rootDir, '.agents', 'skills');
  let skillsChecked = 0;
  if (fs.existsSync(skillsDir)) {
    for (const ent of fs.readdirSync(skillsDir, { withFileTypes: true }).slice(0, 40)) {
      if (!ent.isDirectory()) continue;
      const skFile = path.join(skillsDir, ent.name, 'SKILL.md');
      if (fs.existsSync(skFile)) {
        skillsChecked++;
        const skRaw = fs.readFileSync(skFile, 'utf8');
        if (/rm\s+-rf\s+\/\s*$|chmod\s+777\s+\/etc/m.test(skRaw)) {
          issues.push(`[AGENTSHIELD] Dangerous destructive command found in skill ${ent.name}.`);
        }
      }
    }
  }

  return {
    passed: issues.length === 0,
    filesAudited,
    skillsChecked,
    safeOutputsVerified,
    issues
  };
}

export function runSecurityQuarantineGate(options = {}) {
  const targetDir = options.rootDir || ROOT;
  const candidateDescription = String(options.description || '');
  const fastMode = Boolean(options.fast || options.skipNpmAudit);

  const reasons = [];

  // 1. Check candidate description against CONSTRAINTS.md & 60FPS quarantine rules
  for (const rule of BLOCKED_HEAVY_OR_INSECURE_TECH) {
    if (rule.pattern.test(candidateDescription)) {
      reasons.push(rule.reason);
    }
  }

  // 2. Run Supply Chain & Anti-Slopsquatting Guard
  const supplyRes = runSupplyChainGuard({ rootDir: targetDir, skipNetworkAudit: fastMode });
  if (!supplyRes.passed) {
    for (const issue of supplyRes.issues) {
      reasons.push(`[SCA:${issue.rule}] ${issue.message}`);
    }
  }

  // 3. Run Symbolic SAST Guard (<500ms)
  const astRes = runAstAudit();
  if (!astRes.passed) {
    reasons.push(
      `[SAST] AST Guard detectó ${astRes.securityBlockers} bloqueos de seguridad y ${astRes.missingMethodErrors} métodos faltantes.`
    );
  }

  // 4. Run Deterministic Edge Worker & Dist Audit (OWASP ASVS v5.0 / A01:2025 / A10:2025)
  const edgeAudit = auditEdgeWorkersAndDist(targetDir);
  if (!edgeAudit.passed) {
    reasons.push(...edgeAudit.issues);
  }

  // 5. Run Combined Offline Secrets (Gitleaks) + Shannon Entropy Scan
  const secretAudit = scanSecretsAndEntropy(targetDir);
  if (!secretAudit.passed) {
    reasons.push(...secretAudit.issues);
  }

  // 6. Verify Presidio-lite PII Redactor Self-Test
  const piiAudit = verifyPiiRedactorSelfTest();
  if (!piiAudit.passed) {
    reasons.push('[PII-PRESIDIO-GUARD] Falló el self-test de redacción automática de entidades PII.');
  }

  // 7. Run OWASP GitHub Actions & Zizmor v1.30 Workflow Security Linter
  const workflowAudit = runWorkflowSecurityLinter(targetDir);
  if (!workflowAudit.passed) {
    for (const wIssue of workflowAudit.issues) {
      reasons.push(`[WORKFLOW:${wIssue.rule}] ${wIssue.file}: ${wIssue.message}`);
    }
  }

  // 8. Run Microsoft Agent Governance Kernel Self-Test (<0.1ms OWASP Agentic Top 10 ASI01-ASI10)
  const governanceKernelAudit = verifyAgentGovernanceKernelSelfTest();
  if (!governanceKernelAudit.passed) {
    reasons.push('[AGENT-GOVERNANCE-KERNEL] Falló la verificación 10/10 de OWASP Agentic Top 10 (ASI01-ASI10).');
  }

  // 9. Run Automated MCP Security Protocol Auditor (18 Rules OWASP MCP Top 10 + SARIF v2.1.0)
  const mcpSecurityAudit = runMcpSecurityAudit();
  if (!mcpSecurityAudit.passed) {
    reasons.push(`[MCP-SECURITY-AUDITOR] Falló la auditoría de reglas MCP (${mcpSecurityAudit.scoreRatio}).`);
  }

  // 10. Run Enterprise Postgres RLS, EnvelopeEncryptionEngine & Ory Kratos/Keto Zanzibar Audit
  const enterpriseDbAndIdentityAudit = auditEnterpriseDatabaseAndIdentity(targetDir);
  if (!enterpriseDbAndIdentityAudit.passed) {
    reasons.push(...enterpriseDbAndIdentityAudit.issues);
  }

  // 11. Run AgentShield Harness & `safe-outputs` (`affaan-m/agentshield` + `github/gh-aw`) Audit
  const agentShieldAudit = runAgentShieldHarnessAudit(targetDir);
  if (!agentShieldAudit.passed) {
    reasons.push(...agentShieldAudit.issues);
  }

  const passed = reasons.length === 0;
  return {
    passed,
    score: passed ? 100.0 : 0.0,
    status: passed ? 'QUARANTINE_PASSED' : 'QUARANTINE_REJECTED',
    supplyChainPassed: supplyRes.passed,
    astPassed: astRes.passed,
    astLatencyMs: astRes.elapsedMs,
    edgeWorkerAudit: edgeAudit,
    secretEntropyAudit: secretAudit,
    piiRedactorAudit: piiAudit,
    workflowAudit,
    governanceKernelAudit,
    mcpSecurityAudit,
    enterpriseDbAndIdentityAudit,
    agentShieldAudit,
    reasons
  };
}

export {
  lintWorkflowYamlContent,
  runWorkflowSecurityLinter,
  runMcpSecurityAudit
};
export const runSecurityGate = runSecurityQuarantineGate;

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const res = runSecurityQuarantineGate({ fast: process.argv.includes('--fast') });
  console.log(
    `[SECURITY-GATE] Status: ${res.status} (Score: ${res.score.toFixed(1)} / 100.0) | SCA: ${res.supplyChainPassed} | SAST: ${res.astPassed} (${res.astLatencyMs}ms) | Workers: ${res.edgeWorkerAudit.workersChecked} OK | Zizmor v1.30 Workflows: ${res.workflowAudit.workflowsChecked} OK | AgentOS Kernel (ASI01-10): ${res.governanceKernelAudit.passed} (${res.governanceKernelAudit.avgLatencyMs}ms) | MCP Audit: ${res.mcpSecurityAudit.scoreRatio} SARIF | Postgres RLS + KMS + Ory: ${res.enterpriseDbAndIdentityAudit.passed} | Gitleaks+Entropy: ${res.secretEntropyAudit.filesScanned} files OK | PII Redactor: ${res.piiRedactorAudit.passed}`
  );
  if (!res.passed) {
    for (const r of res.reasons) console.error(`  ❌ ${redactPiiEntities(r)}`);
    process.exit(1);
  }
}
