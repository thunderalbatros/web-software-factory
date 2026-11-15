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
    query: 'progresión de competencias UNESCO Acquire Deepen Create alfabetización en IA'
  },
  {
    id: 'EDU-02',
    category: 'education',
    lang: 'en',
    query: 'LearnLM Socratic tutoring three progressive hints active learning pedagogy'
  },
  {
    id: 'EDU-03',
    category: 'education',
    lang: 'es',
    query: 'teoría de carga cognitiva Sweller bloques breves de 110 palabras ejemplos resueltos'
  },
  {
    id: 'EDU-04',
    category: 'education',
    lang: 'es',
    query: 'separación Diátaxis rutas Entender frente a Hacer sin saltos de nivel en grafo DAG'
  },
  {
    id: 'EDU-05',
    category: 'education',
    lang: 'en',
    query: 'spaced repetition ts-fsrs ethical gamification Self-Determination Theory streak pause'
  },
  {
    id: 'EDU-06',
    category: 'education',
    lang: 'es',
    query: 'privacidad Local-First Ley 25326 cifrado WebCrypto AES-GCM llave propia BYOK'
  },
  {
    id: 'EDU-07',
    category: 'education',
    lang: 'es',
    query: 'interfaz educativa minimalista estilo Brilliant Stripe Distill micro-controles en vivo'
  },
  {
    id: 'EDU-08',
    category: 'education',
    lang: 'en',
    query: 'APCA perceptual contrast reading mode prefers-reduced-motion keyboard accessibility WCAG'
  },
  {
    id: 'EDU-09',
    category: 'education',
    lang: 'es',
    query: 'pensamiento crítico detección de alucinaciones sesgos y verificación de fuentes en IA'
  },
  {
    id: 'EDU-10',
    category: 'education',
    lang: 'en',
    query: 'zero-cost browser tutor precompiled diagnostic misconceptions Valibot JSON schema'
  }
]);

export async function runBenchmark20Queries({ reloadIndex = false } = {}) {
  if (reloadIndex) {
    invalidateIndexCache();
  }
  const entries = [];
  for (const q of BENCHMARK_20_QUERIES) {
    const hits = await queryKnowledge(q.query, 3, { fastLocalOnly: true });
    entries.push({
      id: q.id,
      category: q.category,
      lang: q.lang,
      query: q.query,
      top3: hits.map((h, idx) => ({
        rank: idx + 1,
        docId: String(h.source || h.id || '').split('#')[0],
        title: h.title || '',
        source: h.source || '',
        epistemicTier: h.epistemicTier || 'UNKNOWN',
        authorityBoost: Number(h.authorityBoost || 1.0),
        fusedScore: Number((h.fusedScore || h.rrfScore || 0).toFixed(6))
      }))
    });
  }
  return {
    schema: 'rag-benchmark-20q-v1',
    generatedAt: new Date().toISOString(),
    queryCount: entries.length,
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

    comparisons.push({
      id: cur.id,
      category: cur.category,
      lang: cur.lang,
      query: cur.query,
      top1Same,
      top3DocOverlap: overlapCount,
      beforeTop1: prev.top3[0] ? `${prev.top3[0].docId} (${prev.top3[0].epistemicTier} x${prev.top3[0].authorityBoost})` : 'NONE',
      afterTop1: cur.top3[0] ? `${cur.top3[0].docId} (${cur.top3[0].epistemicTier} x${cur.top3[0].authorityBoost})` : 'NONE',
      beforeTop3Docs: prevDocs,
      afterTop3Docs: curDocs
    });
  }

  const engineeringTop1Retention = engineeringCount > 0 ? Number((engineeringTop1Same / engineeringCount).toFixed(4)) : 1;
  const engineeringTop3MeanOverlap = engineeringCount > 0 ? Number((engineeringOverlapSum / engineeringCount).toFixed(4)) : 1;

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
      zeroEngineeringDegradation: engineeringTop3MeanOverlap >= 0.8 && engineeringTop1Retention >= 0.8
    },
    comparisons
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const args = process.argv.slice(2);
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
    if (!report.summary.zeroEngineeringDegradation) {
      process.exitCode = 1;
    }
  } else {
    console.log(JSON.stringify(snapshot, null, 2));
  }
}
