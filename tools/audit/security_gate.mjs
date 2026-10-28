#!/usr/bin/env node
/**
 * tools/audit/security_gate.mjs — Unified Security & 60FPS Quarantine Gate (SOTA 2026)
 * ====================================================================================
 * Executes deterministic SCA (Supply Chain Guard), SAST (AST Guard <500ms), and 60-FPS
 * GPU Compositor checks for incoming technology absorptions and self-evolving runs.
 * ====================================================================================
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runSupplyChainGuard } from './supply_chain_guard.mjs';
import { runAstAudit } from './ast_guard.mjs';

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

  const passed = reasons.length === 0;
  return {
    passed,
    status: passed ? 'QUARANTINE_PASSED' : 'QUARANTINE_REJECTED',
    supplyChainPassed: supplyRes.passed,
    astPassed: astRes.passed,
    astLatencyMs: astRes.elapsedMs,
    reasons
  };
}

export const runSecurityGate = runSecurityQuarantineGate;

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const res = runSecurityQuarantineGate({ fast: process.argv.includes('--fast') });
  console.log(`[SECURITY-GATE] Status: ${res.status} | SCA: ${res.supplyChainPassed} | SAST: ${res.astPassed} (${res.astLatencyMs}ms)`);
  if (!res.passed) {
    for (const r of res.reasons) console.error(`  ❌ ${r}`);
    process.exit(1);
  }
}
