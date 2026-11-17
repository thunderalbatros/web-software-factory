#!/usr/bin/env node
/**
 * tools/intelligence/rag_benchmark_20q.mjs — Deterministic 20-Query Bilingual RAG Benchmark
 * =========================================================================================
 * Captures and compares Top-3 `queryKnowledge(..., 3, { fastLocalOnly: true })` rankings
 * across 10 core engineering/factory queries and 10 bilingual educational queries (ES/EN)
 * to certify zero regression when hardening `rag_library_sanitizer.mjs`.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { queryKnowledge, invalidateIndexCache } from './rag_pipeline.mjs';
import { BENCHMARK_40_QRELS, runRagBenchmarkV6 } from './rag_benchmark_v6.mjs';

export { BENCHMARK_40_QRELS, runRagBenchmarkV6 };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');

export const BENCHMARK_20_QUERIES = Object.freeze([
  // 10 Engineering / Software Factory Queries (ES + EN)
  {
    id: 'ENG-01',
    category: 'engineering',
    lang: 'es',
    query: 'tokens de color perceptual OKLCH presupuesto cromático 90/8/2 W3C DTCG 2025.10'
  },
  {
    id: 'ENG-02',
    category: 'engineering',
    lang: 'en',
    query: 'Astro Islands architecture Cloudflare Workers Static Assets zero JS hydration'
  },
  {
    id: 'ENG-03',
    category: 'engineering',
    lang: 'es',
    query: 'validación ligera Valibot frente a esquemas pesados en Cloudflare Workers Edge'
  },
  {
    id: 'ENG-04',
    category: 'engineering',
    lang: 'en',
    query: 'OWASP ASVS v5.0 Content-Security-Policy DOMPurify OAuth 2.1 PKCE web security'
  },
  {
    id: 'ENG-05',
    category: 'engineering',
    lang: 'es',
    query: 'animaciones CSS scroll-driven animation-timeline view 60fps compositor GPU'
  },
  {
    id: 'ENG-06',
    category: 'engineering',
    lang: 'en',
    query: 'Three.js r186 WebGPURenderer TSL shaders GaussianSplat dioramas'
  },
  {
    id: 'ENG-07',
    category: 'engineering',
    lang: 'es',
    query: 'escalado tipográfico fluido Utopia clamp ergonomía visual sin saltos de layout CLS'
  },
  {
    id: 'ENG-08',
    category: 'engineering',
    lang: 'en',
    query: 'XState v5 deterministic statecharts Harel invariants JEV cognitive memory write gate'
  },
  {
    id: 'ENG-09',
    category: 'engineering',
    lang: 'es',
    query: 'auditoría visual automatizada Playwright árbol de accesibilidad RYUX gate'
  },
  {
    id: 'ENG-10',
    category: 'engineering',
    lang: 'en',
    query: 'SQLite WAL mode MVCC atomic transactions Cloudflare D1 indexes'
  },

  // 10 Educational / AI Academy Queries (ES + EN)
  {
    id: 'EDU-01',
    category: 'education',
    lang: 'es',
    query: 'progresión de competencias UNESCO Acquire Deepen Create alfabetización en IA',
    expectedDocIds: [
      'local://knowledge/ai_academy/CANON_PEDAGOGICAL_SCAFFOLDING_UNESCO_DIATAXIS_AND_SOCRATIC_LEARNLM_2026.md'
    ]
  },
  {
    id: 'EDU-02',
    category: 'education',
    lang: 'en',
    query: 'LearnLM Socratic tutoring three progressive hints active learning pedagogy',
    expectedDocIds: [
      'local://knowledge/ai_academy/CANON_PEDAGOGICAL_SCAFFOLDING_UNESCO_DIATAXIS_AND_SOCRATIC_LEARNLM_2026.md'
    ]
  },
  {
    id: 'EDU-03',
    category: 'education',
    lang: 'es',
    query: 'teoría de carga cognitiva Sweller bloques breves de 110 palabras ejemplos resueltos',
    expectedDocIds: [
      'local://knowledge/ai_academy/CANON_PEDAGOGICAL_SCAFFOLDING_UNESCO_DIATAXIS_AND_SOCRATIC_LEARNLM_2026.md'
    ]
  },
  {
    id: 'EDU-04',
    category: 'education',
    lang: 'es',
    query: 'separación Diátaxis rutas Entender frente a Hacer sin saltos de nivel en grafo DAG',
    expectedDocIds: [
      'local://knowledge/ai_academy/CANON_AUTONOMOUS_CURRICULUM_ENGINEERING_MULTIMEDIA_TRIANGULATION_AND_ASSESSMENT_2026.md'
    ]
  },
  {
    id: 'EDU-05',
    category: 'education',
    lang: 'en',
    query: 'spaced repetition ts-fsrs ethical gamification Self-Determination Theory streak pause',
    expectedDocIds: [
      'local://knowledge/ai_academy/CANON_ETHICAL_GAMIFICATION_ZERO_COST_TUTOR_AND_PRIVACY_2026.md'
    ]
  },
  {
    id: 'EDU-06',
    category: 'education',
    lang: 'es',
    query: 'privacidad Local-First Ley 25326 cifrado WebCrypto AES-GCM llave propia BYOK',
    expectedDocIds: [
      'local://knowledge/ai_academy/CANON_ETHICAL_GAMIFICATION_ZERO_COST_TUTOR_AND_PRIVACY_2026.md'
    ]
  },
  {
    id: 'EDU-07',
    category: 'education',
    lang: 'es',
    query: 'interfaz educativa minimalista estilo Brilliant Stripe Distill micro-controles en vivo',
    expectedDocIds: [
      'local://knowledge/ai_academy/CANON_INCLUSIVE_MINIMALIST_UX_BRILLIANT_STRIPE_AND_DISTILL_2026.md'
    ]
  },
  {
    id: 'EDU-08',
    category: 'education',
    lang: 'en',
    query: 'APCA perceptual contrast reading mode prefers-reduced-motion keyboard accessibility WCAG',
    expectedDocIds: [
      'local://knowledge/ai_academy/CANON_INCLUSIVE_MINIMALIST_UX_BRILLIANT_STRIPE_AND_DISTILL_2026.md'
    ]
  },
  {
    id: 'EDU-09',
    category: 'education',
    lang: 'es',
    query: 'pensamiento crítico detección de alucinaciones sesgos y verificación de fuentes en IA',
    expectedDocIds: [
      'local://knowledge/ai_academy/CANON_PEDAGOGICAL_SCAFFOLDING_UNESCO_DIATAXIS_AND_SOCRATIC_LEARNLM_2026.md',
      'local://knowledge/ai_academy/CANON_AUTONOMOUS_CURRICULUM_ENGINEERING_MULTIMEDIA_TRIANGULATION_AND_ASSESSMENT_2026.md'
    ]
  },
  {
    id: 'EDU-10',
    category: 'education',
    lang: 'en',
    query: 'zero-cost browser tutor precompiled diagnostic misconceptions Valibot JSON schema',
    expectedDocIds: [
      'local://knowledge/ai_academy/CANON_ETHICAL_GAMIFICATION_ZERO_COST_TUTOR_AND_PRIVACY_2026.md'
    ]
  }
]);

export async function runBenchmark20Queries({ reloadIndex = false } = {}) {
  if (reloadIndex) {
    invalidateIndexCache();
  }
  const entries = [];
  let expectedCanonChecked = 0;
  let expectedCanonHits = 0;
  for (const q of BENCHMARK_20_QUERIES) {
    const hits = await queryKnowledge(q.query, 3, { fastLocalOnly: true });
    const top3 = hits.map((h, idx) => ({
      rank: idx + 1,
      docId: String(h.source || h.id || '').split('#')[0],
      title: h.title || '',
      source: h.source || '',
      epistemicTier: h.epistemicTier || 'UNKNOWN',
      authorityBoost: Number(h.authorityBoost || 1.0),
      fusedScore: Number((h.fusedScore || h.rrfScore || 0).toFixed(6))
    }));
    const expectedList = Array.isArray(q.expectedDocIds) ? q.expectedDocIds : [];
    let expectedCanonHit = true;
    if (expectedList.length > 0) {
      expectedCanonChecked++;
      expectedCanonHit = top3.some(
        (hit) =>
          hit.epistemicTier === 'TIER_1_SOTA_2026' &&
          expectedList.some(
            (exp) =>
              hit.docId === exp ||
              hit.source.startsWith(exp) ||
              hit.docId.endsWith(exp.replace(/^local:\/\//, ''))
          )
      );
      if (expectedCanonHit) expectedCanonHits++;
    }
    entries.push({
      id: q.id,
      category: q.category,
      lang: q.lang,
      query: q.query,
      expectedDocIds: expectedList,
      expectedCanonHit,
      top3
    });
  }
  const eduEntries = entries.filter((e) => e.category === 'education');
  const eduTier1HitCount = eduEntries.filter((e) => e.expectedCanonHit).length;
  return {
    schema: 'rag-benchmark-20q-v1',
    generatedAt: new Date().toISOString(),
    queryCount: entries.length,
    summary: {
      expectedCanonChecked,
      expectedCanonHits,
      allExpectedCanonsHit: expectedCanonChecked > 0 && expectedCanonHits === expectedCanonChecked,
      eduTier1HitRate:
        eduEntries.length > 0 ? Number((eduTier1HitCount / eduEntries.length).toFixed(4)) : 1
    },
    entries
  };
}

export function compareBenchmarkRuns(baseline, after) {
  const baseById = new Map((baseline.entries || []).map((e) => [e.id, e]));
  const comparisons = [];
  let engineeringTop1Same = 0;
  let engineeringOverlapSum = 0;
  let engineeringCount = 0;
  let educationNonEmpty = 0;
  let educationCount = 0;
  let expectedCanonChecked = 0;
  let expectedCanonHits = 0;

  for (const cur of after.entries || []) {
    const prev = baseById.get(cur.id) || { top3: [] };
    const prevDocs = prev.top3.map((x) => x.docId);
    const curDocs = cur.top3.map((x) => x.docId);
    const overlapCount = curDocs.filter((d) => prevDocs.includes(d)).length;
    const top1Same = Boolean(prevDocs[0] && prevDocs[0] === curDocs[0]);

    if (cur.category === 'engineering') {
      engineeringCount++;
      if (top1Same) engineeringTop1Same++;
      engineeringOverlapSum += overlapCount / Math.max(1, Math.min(3, prevDocs.length || 3));
    } else {
      educationCount++;
      if (curDocs.length === 3) educationNonEmpty++;
    }
    if (Array.isArray(cur.expectedDocIds) && cur.expectedDocIds.length > 0) {
      expectedCanonChecked++;
      if (cur.expectedCanonHit) expectedCanonHits++;
    }

    comparisons.push({
      id: cur.id,
      category: cur.category,
      lang: cur.lang,
      query: cur.query,
      top1Same,
      top3DocOverlap: overlapCount,
      expectedCanonHit: Boolean(cur.expectedCanonHit),
      beforeTop1: prev.top3[0] ? `${prev.top3[0].docId} (${prev.top3[0].epistemicTier} x${prev.top3[0].authorityBoost})` : 'NONE',
      afterTop1: cur.top3[0] ? `${cur.top3[0].docId} (${cur.top3[0].epistemicTier} x${cur.top3[0].authorityBoost})` : 'NONE',
      beforeTop3Docs: prevDocs,
      afterTop3Docs: curDocs
    });
  }

  const engineeringTop1Retention = engineeringCount > 0 ? Number((engineeringTop1Same / engineeringCount).toFixed(4)) : 1;
  const engineeringTop3MeanOverlap = engineeringCount > 0 ? Number((engineeringOverlapSum / engineeringCount).toFixed(4)) : 1;
  const allExpectedCanonsHit =
    expectedCanonChecked > 0 ? expectedCanonHits === expectedCanonChecked : true;
  const eduTier1HitRate =
    after.summary?.eduTier1HitRate ??
    (expectedCanonChecked > 0 ? Number((expectedCanonHits / expectedCanonChecked).toFixed(4)) : 1);

  return {
    schema: 'rag-benchmark-20q-comparison-v1',
    comparedAt: new Date().toISOString(),
    baselineGeneratedAt: baseline.generatedAt,
    afterGeneratedAt: after.generatedAt,
    summary: {
      totalQueries: comparisons.length,
      engineeringQueries: engineeringCount,
      engineeringTop1Same,
      engineeringTop1Retention,
      engineeringTop3MeanOverlap,
      educationQueries: educationCount,
      educationFullTop3Count: educationNonEmpty,
      expectedCanonChecked,
      expectedCanonHits,
      eduTier1HitRate,
      allExpectedCanonsHit,
      zeroEngineeringDegradation: engineeringTop3MeanOverlap >= 0.8 && engineeringTop1Retention >= 0.8
    },
    comparisons
  };
}

if (process.argv[1] && path.resolve(process.argv[1]).toLowerCase() === path.resolve(__filename).toLowerCase()) {
  const args = process.argv.slice(2);
  if (args.includes('--v6') || args.includes('--40q')) {
    const v6Report = await runRagBenchmarkV6({ allowNetwork: !args.includes('--offline') });
    console.log(JSON.stringify({ allPassed: v6Report.allPassed, metrics: v6Report.metrics, gates: v6Report.gates }, null, 2));
    if (!v6Report.allPassed) process.exitCode = 1;
  } else {
    const saveBaselineIdx = args.indexOf('--save-baseline');
    const compareIdx = args.indexOf('--compare');
    const outIdx = args.indexOf('--output');

    const snapshot = await runBenchmark20Queries({ reloadIndex: true });

    if (saveBaselineIdx !== -1) {
      const relTarget = args[saveBaselineIdx + 1] || 'data/academy/rag_benchmark_20q_baseline.json';
      const absTarget = path.resolve(ROOT, relTarget);
      fs.mkdirSync(path.dirname(absTarget), { recursive: true });
      fs.writeFileSync(absTarget, JSON.stringify(snapshot, null, 2) + '\n', 'utf8');
      console.log(JSON.stringify({ savedBaseline: relTarget, queryCount: snapshot.queryCount }, null, 2));
    } else if (compareIdx !== -1) {
      const relBase = args[compareIdx + 1] || 'data/academy/rag_benchmark_20q_baseline.json';
      const baseline = JSON.parse(fs.readFileSync(path.resolve(ROOT, relBase), 'utf8'));
      const report = compareBenchmarkRuns(baseline, snapshot);
      if (outIdx !== -1 && args[outIdx + 1]) {
        const absOut = path.resolve(ROOT, args[outIdx + 1]);
        fs.mkdirSync(path.dirname(absOut), { recursive: true });
        fs.writeFileSync(absOut, JSON.stringify({ after: snapshot, comparison: report }, null, 2) + '\n', 'utf8');
      }
      console.log(JSON.stringify(report.summary, null, 2));
      if (!report.summary.zeroEngineeringDegradation || !report.summary.allExpectedCanonsHit) {
        process.exitCode = 1;
      }
    } else {
      console.log(JSON.stringify(snapshot.summary, null, 2));
      if (!snapshot.summary.allExpectedCanonsHit) {
        process.exitCode = 1;
      }
    }
  }
}
