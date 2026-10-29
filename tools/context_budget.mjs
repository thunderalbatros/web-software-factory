#!/usr/bin/env node
/**
 * tools/context_budget.mjs — Root CLI & Module Bridge for 3-Tier Context Budget + Headroom CCR + CacheAligner
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  HEADROOM_CCR_DIR,
  compressWithCavemanAndPonytail,
  smartCrusherJson,
  codeCompressorAst,
  compressReversibleCcr,
  headroom_retrieve,
  headroomRetrieve,
  alignPromptPrefixForKvCache,
  syncTomSwePaths,
  assertZeroBulkKnowledgeInjection,
  selectTopTwoSkills,
  selectActiveRole,
  assembleThreeTierContext,
  repairAndValidateJsonPayload
} from './intelligence/context_budget.mjs';

export {
  HEADROOM_CCR_DIR,
  compressWithCavemanAndPonytail,
  smartCrusherJson,
  codeCompressorAst,
  compressReversibleCcr,
  headroom_retrieve,
  headroomRetrieve,
  alignPromptPrefixForKvCache,
  syncTomSwePaths,
  assertZeroBulkKnowledgeInjection,
  selectTopTwoSkills,
  selectActiveRole,
  assembleThreeTierContext,
  repairAndValidateJsonPayload
};

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const sampleQuery =
    process.argv
      .slice(2)
      .filter((a) => !a.startsWith('--'))
      .join(' ') || 'Compile W3C DTCG 2025.10 OKLCH tokens and Headroom CCR context budget';
  const ctx = assembleThreeTierContext(sampleQuery);
  const ccr = compressReversibleCcr({
    source: 'tools/context_budget.mjs',
    records: Array.from({ length: 10 }, (_, idx) => ({ id: idx + 1, status: 'VERIFIED', message: 'Reversible CCR payload item' }))
  });
  console.log(`[CONTEXT-BUDGET] HotKey=${ctx.hot.cacheKey} | AlignedPrefix=${ctx.hot.alignedPrefixHash} | CCR=${ccr.hash} (-${ccr.reductionPct}%)`);
}
