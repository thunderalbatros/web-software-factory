#!/usr/bin/env node
/**
 * tools/intelligence/memory_reflector.mjs — Temporal Fact Graph & CTO Feedback Invalidation Engine
 * =================================================================================================
 * Structures every user preference & architectural instinct in:
 *   - .agents/memory/temporal_ledger.json
 *   - memory/tom_swe_model.json (and mirrored at .agents/memory/tom_swe_model.json)
 * using the strict Temporal Validity Schema:
 *   { id, fact, category, valid_from, valid_until: null | timestamp, superseded_by: null | id, confidence }
 *
 * When the human CTO issues a correction or changes aesthetic/functional criteria, the reflector
 * automatically marks `valid_until = new Date().toISOString()` and `superseded_by = newId` on any
 * prior conflicting rule in the same category/topic, preventing agents from mixing stale rules.
 * =================================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  getTemporalLedger,
  saveTemporalLedger,
  recordTemporalRule,
  recordRegressionAssertion,
  syncPostMortemRegressionAssertions
} from './instincts_engine.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');
const INSTINCTS_DIR = path.join(ROOT, '.agents', 'memory', 'instincts');
const TOM_PRIMARY = path.join(ROOT, 'memory', 'tom_swe_model.json');
const TOM_MIRROR = path.join(ROOT, '.agents', 'memory', 'tom_swe_model.json');

if (!fs.existsSync(INSTINCTS_DIR)) {
  fs.mkdirSync(INSTINCTS_DIR, { recursive: true });
}

export function inferFactCategory(text = '') {
  const lower = String(text).toLowerCase();
  if (/(color|oklch|apca|contraste|boton|botón|cta|tipografia|tipografía|fuente|bento|estetica|estética|visual|ui|ux|layout|espaciado|tema|oscuro|claro)/.test(lower)) {
    return 'aesthetic_and_ui_preference';
  }
  if (/(animacion|animación|60fps|motion|transicion|transición|parallax|suave|velocidad)/.test(lower)) {
    return 'motion_and_performance_preference';
  }
  if (/(copy|texto|precio|pricing|cro|formulario|cta|mensaje|tono|español)/.test(lower)) {
    return 'copywriting_and_cro_preference';
  }
  if (/(seguridad|csp|owasp|auth|token|privacidad)/.test(lower)) {
    return 'security_and_compliance_preference';
  }
  return 'architectural_and_product_preference';
}

export function saveInstinctCard(instinct) {
  const fileName = `${instinct.id}.md`;
  const filePath = path.join(INSTINCTS_DIR, fileName);

  const content = `---
id: "${instinct.id}"
category: "${instinct.category || instinct.type || 'operational_instinct'}"
confidence: ${instinct.confidence || 0.98}
valid_from: "${instinct.valid_from || new Date().toISOString()}"
valid_until: ${instinct.valid_until ? `"${instinct.valid_until}"` : 'null'}
superseded_by: ${instinct.superseded_by ? `"${instinct.superseded_by}"` : 'null'}
status: "${instinct.status || 'ACTIVE'}"
---

# Instinct: ${instinct.title}

> **Fact:** ${instinct.fact || instinct.rationale}  
> **Confidence:** ${((instinct.confidence || 0.98) * 100).toFixed(0)}%  
> **Source / Evidence:** ${instinct.evidence || 'CTO HITL Feedback / Session Observation'}

## Rule & Heuristic
${instinct.rationale || instinct.fact}

## Operational Pattern
\`\`\`javascript
${instinct.code_pattern || '// Enforced across templates/ and projects/'}
\`\`\`

## Anti-Pattern
${instinct.anti_pattern || 'Violating active temporal CTO preference or using superseded rules.'}
`;

  fs.writeFileSync(filePath, content, 'utf8');
  return filePath;
}

/**
 * Normalizes all entries in temporal_ledger.json and tom_swe_model.json to include
 * { id, fact, category, valid_from, valid_until, superseded_by, confidence }.
 */
export function normalizeTemporalStores() {
  const now = new Date().toISOString();
  const ledger = getTemporalLedger();
  ledger.rules = (ledger.rules || []).map((r) => ({
    id: r.id,
    fact: r.fact || r.rationale || r.title,
    category: r.category || r.type || 'architectural_decision',
    valid_from: r.valid_from || '2026-10-25T00:00:00.000Z',
    valid_until: r.valid_until ?? null,
    superseded_by: r.superseded_by ?? null,
    confidence: Number(r.confidence ?? 0.98),
    ...r
  }));
  saveTemporalLedger(ledger);

  if (fs.existsSync(TOM_PRIMARY)) {
    const tom = JSON.parse(fs.readFileSync(TOM_PRIMARY, 'utf8'));
    tom.tier1_cleaned_signals = (tom.tier1_cleaned_signals || []).map((s, idx) => ({
      id: s.id || s.signal_id || `sig-wsf-00${idx + 1}`,
      signal_id: s.signal_id || s.id || `sig-wsf-00${idx + 1}`,
      fact: s.fact || s.rule,
      rule: s.rule || s.fact,
      category: s.category || inferFactCategory(s.rule || s.fact || ''),
      valid_from: s.valid_from || '2026-10-25T00:00:00.000Z',
      valid_until: s.valid_until ?? null,
      superseded_by: s.superseded_by ?? null,
      confidence: Number(s.confidence ?? 1.0),
      enforced_by: s.enforced_by || 'AGENTS.md'
    }));
    tom.last_updated = now;
    fs.writeFileSync(TOM_PRIMARY, JSON.stringify(tom, null, 2), 'utf8');
    fs.mkdirSync(path.dirname(TOM_MIRROR), { recursive: true });
    fs.writeFileSync(TOM_MIRROR, JSON.stringify(tom, null, 2), 'utf8');
  }
}

/**
 * Applies a natural-language CTO correction/feedback:
 *   1. Detects conflicting active facts in the same category/topic.
 *   2. Marks `valid_until = now` and `superseded_by = newId` on superseded facts.
 *   3. Activates the new fact in both temporal_ledger.json and tom_swe_model.json,
 *      and writes a permanent instinct card in .agents/memory/instincts/.
 */
export function applyCtoFeedbackAndInvalidate(feedbackText, options = {}) {
  normalizeTemporalStores();
  const now = new Date().toISOString();
  const category = options.category || inferFactCategory(feedbackText);
  const slug = String(feedbackText)
    .toLowerCase()
    .replace(/[^a-z0-9áéíóúñü]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 36);
  const newId = options.id || `cto-pref-${slug}-${Date.now().toString(36).slice(-4)}`;

  const ledger = getTemporalLedger();
  const invalidatedIds = [];

  // Invalidate prior active CTO feedback rules in the same category if superseded
  for (const r of ledger.rules) {
    const isSameCategoryCtoRule =
      r.status === 'ACTIVE' &&
      !r.valid_until &&
      r.id !== newId &&
      r.category === category &&
      (r.id.startsWith('cto-pref-') || options.supersedeRuleId === r.id);

    if (isSameCategoryCtoRule) {
      r.valid_until = now;
      r.superseded_by = newId;
      r.status = 'INVALIDATED';
      invalidatedIds.push(r.id);
    }
  }
  saveTemporalLedger(ledger);

  const newEntry = recordTemporalRule({
    id: newId,
    fact: feedbackText,
    category,
    type: category,
    title: `CTO Directive: ${feedbackText.slice(0, 72)}`,
    valid_from: now,
    valid_until: null,
    superseded_by: null,
    confidence: 0.99,
    status: 'ACTIVE',
    rationale: feedbackText,
    evidence: 'CTO HITL Direct Command Center Feedback'
  });

  // Update ToM-SWE Model (both memory/tom_swe_model.json and .agents/memory/tom_swe_model.json)
  if (fs.existsSync(TOM_PRIMARY)) {
    const tom = JSON.parse(fs.readFileSync(TOM_PRIMARY, 'utf8'));
    tom.tier1_cleaned_signals = tom.tier1_cleaned_signals || [];

    for (const sig of tom.tier1_cleaned_signals) {
      if (!sig.valid_until && sig.category === category && sig.id?.startsWith('cto-pref-')) {
        sig.valid_until = now;
        sig.superseded_by = newId;
      }
    }

    tom.tier1_cleaned_signals.push({
      id: newId,
      signal_id: newId,
      fact: feedbackText,
      rule: feedbackText,
      category,
      valid_from: now,
      valid_until: null,
      superseded_by: null,
      confidence: 0.99,
      enforced_by: 'CTO HITL Feedback Loop'
    });

    tom.last_updated = now;
    fs.writeFileSync(TOM_PRIMARY, JSON.stringify(tom, null, 2), 'utf8');
    fs.mkdirSync(path.dirname(TOM_MIRROR), { recursive: true });
    fs.writeFileSync(TOM_MIRROR, JSON.stringify(tom, null, 2), 'utf8');
  }

  const cardPath = saveInstinctCard({
    id: newId,
    category,
    title: `CTO Directive (${category})`,
    fact: feedbackText,
    rationale: feedbackText,
    confidence: 0.99,
    valid_from: now,
    valid_until: null,
    superseded_by: null,
    evidence: 'CTO HITL Feedback'
  });

  // Automatically generate a perpetual post-mortem regression assertion in .agents/memory/regression_assertions.json
  const regressionAssertion = recordRegressionAssertion({
    id: `reg-assert-${newId}`,
    source: 'npm run cto:feedback (CTO HITL Post-Mortem)',
    targetRole: category.includes('motion')
      ? 'motion-engineer'
      : category.includes('security')
      ? 'security-engineer'
      : category.includes('copy')
      ? 'copywriting-cro-strategist'
      : 'ux-designer',
    category,
    description: `CTO Regression Guard: "${feedbackText}"`,
    checkType: 'CTO_FEEDBACK_ENFORCED',
    linkedRuleId: newId,
    status: 'ACTIVE'
  });

  return {
    newFact: newEntry,
    invalidatedIds,
    instinctCardPath: cardPath,
    regressionAssertion
  };
}

export function reflectAndConsolidate() {
  console.log(`\n======================================================`);
  console.log(`🧠 TEMPORAL MEMORY & PROCEDURAL INSTINCTS REFLECTOR`);
  console.log(`======================================================\n`);

  normalizeTemporalStores();

  const learnedInstincts = [
    {
      id: 'linear-ast-scanning-no-redos',
      category: 'performance_invariable',
      type: 'performance_invariable',
      title: 'Linear Line-by-Line AST Scanning (Zero ReDoS)',
      fact: 'Parse class methods linearly with line splitting to guarantee <500ms AST scans without catastrophic regex backtracking.',
      confidence: 0.98,
      valid_from: '2026-10-25T00:00:00.000Z',
      valid_until: null,
      superseded_by: null,
      rationale: 'Nested regular expression quantifiers cause catastrophic backtracking. Parse class methods linearly with line splitting.',
      evidence: 'tools/intelligence/ast_guard.mjs scanClassMethods',
      code_pattern: `const lines = classBody.split('\\n');`,
      anti_pattern: 'Using unbounded nested quantifier regexes across multiline class bodies.'
    },
    {
      id: 'mock-server-api-catchall',
      category: 'architectural_decision',
      type: 'architectural_decision',
      title: 'Catch-All 200 OK JSON Fallback for Local API Testing',
      fact: 'Local simulation servers must return a 200 OK JSON fallback for /api/* during headless Playwright visual audits.',
      confidence: 0.96,
      valid_from: '2026-10-25T00:00:00.000Z',
      valid_until: null,
      superseded_by: null,
      rationale: 'Headless Playwright audits capture all 404 network failures as console errors. Local simulation servers must implement a catch-all 200 OK JSON fallback for /api/*.',
      evidence: 'tools/serve_site.mjs, tools/audit/visual_audit.mjs',
      code_pattern: `if (cleanUrl.startsWith('/api/')) { res.writeHead(200); res.end('{"ok":true}'); return; }`,
      anti_pattern: 'Allowing mock servers to return raw 404 HTML for unconfigured REST routes.'
    },
    {
      id: 'network-fetch-abort-timeout-guard',
      category: 'resilience_pattern',
      type: 'resilience_pattern',
      title: 'Mandatory AbortSignal.timeout on External API Calls',
      fact: 'Every remote fetch must include AbortSignal.timeout(3500) to prevent hung sockets.',
      confidence: 0.99,
      valid_from: '2026-10-25T00:00:00.000Z',
      valid_until: null,
      superseded_by: null,
      rationale: 'External API services can hang indefinitely. Every remote fetch must have an explicit timeout between 2,500ms and 3,500ms.',
      evidence: 'tools/intelligence/serper_researcher.mjs, tools/intelligence/qdrant_rag.mjs',
      code_pattern: `const res = await fetch(url, { signal: AbortSignal.timeout(3500) });`,
      anti_pattern: 'Calling fetch() on external services without an AbortSignal timeout.'
    },
    {
      id: 'symbolic-method-aliasing',
      category: 'bug_fix',
      type: 'bug_fix',
      title: 'Method Renaming Aliases on Class Prototypes',
      fact: 'Provide prototype aliases when refactoring controller methods to prevent runtime exceptions.',
      confidence: 0.95,
      valid_from: '2026-10-25T00:00:00.000Z',
      valid_until: null,
      superseded_by: null,
      rationale: 'When refactoring methods in public client controllers, provide a prototype alias to prevent runtime PAGEERROR exceptions.',
      evidence: 'templates/vanilla-edge/site/js/app.js',
      code_pattern: `legacyMethod() { return this.newMethod(); }`,
      anti_pattern: 'Renaming methods without aliases in multi-view web applications.'
    }
  ];

  let consolidatedCount = 0;
  for (const instinct of learnedInstincts) {
    recordTemporalRule({
      ...instinct,
      status: 'ACTIVE'
    });
    const cardPath = saveInstinctCard(instinct);
    console.log(`  ✓ Consolidated Temporal Fact: ${instinct.id} [valid_until: ${instinct.valid_until}] -> ${path.basename(cardPath)}`);
    consolidatedCount++;
  }

  const regSync = syncPostMortemRegressionAssertions();
  console.log(`  ✓ Synchronized Post-Mortem Regression Assertions: ${regSync.totalAssertions} active in .agents/memory/regression_assertions.json`);
  console.log(`\n✅ [REFLECTION COMPLETE] ${consolidatedCount} temporal facts & instincts synchronized.\n`);
  return { consolidatedCount, instincts: learnedInstincts, regressionAssertionsCount: regSync.totalAssertions };
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  if (process.argv.includes('--test-invalidation')) {
    const r1 = applyCtoFeedbackAndInvalidate('Usar botones primarios con bordes redondeados suaves de 12px', {
      id: 'cto-pref-button-radius-v1',
      category: 'aesthetic_and_ui_preference'
    });
    const r2 = applyCtoFeedbackAndInvalidate('Usar botones primarios tipo píldora (9999px) con alto contraste OKLCH', {
      id: 'cto-pref-button-radius-v2',
      category: 'aesthetic_and_ui_preference'
    });
    console.log('======================================================');
    console.log('⏳ TEMPORAL FACT INVALIDATION VERIFICATION');
    console.log('======================================================');
    console.log(`  ✓ First Rule Created     : ${r1.newFact.id}`);
    console.log(`  ✓ Second Rule Created    : ${r2.newFact.id}`);
    console.log(`  ✓ Auto-Invalidated Prior : ${r2.invalidatedIds.join(', ') || 'none'}`);
    console.log('======================================================\n');
  } else {
    reflectAndConsolidate();
  }
}
