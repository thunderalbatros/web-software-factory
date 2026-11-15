#!/usr/bin/env node
/**
 * tools/orchestrator/agent_squad.mjs — Parallel DAG ("Bolts") & Stripe Minions Self-Healing Entrypoint
 * =====================================================================================================
 * Bridges and re-exports `tools/intelligence/agent_squad.mjs` including the deterministic
 * `MAX_SELF_HEALING_RETRY_ROUNDS = 2` Self-Healing Loop (`runSelfHealingLoop`) that escalates
 * persistent build/security failures to the CTO with status `blocked` or `needs-info`.
 * =====================================================================================================
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SQUADS,
  MAX_SELF_HEALING_RETRY_ROUNDS,
  WaveHandoffArtifactSchema,
  persistWaveHandoffArtifact,
  runTracerBulletStopHook,
  runBlindIndependentReview,
  runSelfHealingLoop,
  verifySquadAlignment,
  loadBoltCheckpoint,
  saveBoltCheckpoint,
  runSquadMission,
  runBestOfNSpeculative,
  runCouncilDeliberation,
  runArenaTournament,
  verifyRoleMcpPermission,
  compressLargeMcpOutputToDisk,
  loadMcpRoleRegistry,
  verifySquadMcpRoleRouting,
  HUMANLAYER_RPI_STAGES,
  PATH_KNOWLEDGE_TRIGGERS,
  loadFactoryControlPlane,
  resolveKnowledgeTriggersForPaths,
  loadRpiCheckpoint,
  saveRpiCheckpoint,
  advanceRpiStage,
  runHumanLayerRpiPipeline,
  runOpenHandsStuckDetector,
  runBraintrustAutoevals
} from '../intelligence/agent_squad.mjs';
import {
  ADAPTIVE_LANES,
  classifyAdaptiveDepthLane,
  buildAndPersistBeadsTaskGraph,
  loadBeadsTaskGraph
} from './adaptive_depth_router.mjs';

export {
  SQUADS,
  MAX_SELF_HEALING_RETRY_ROUNDS,
  WaveHandoffArtifactSchema,
  persistWaveHandoffArtifact,
  runTracerBulletStopHook,
  runBlindIndependentReview,
  runSelfHealingLoop,
  verifySquadAlignment,
  loadBoltCheckpoint,
  saveBoltCheckpoint,
  runSquadMission,
  runBestOfNSpeculative,
  runCouncilDeliberation,
  runArenaTournament,
  verifyRoleMcpPermission,
  compressLargeMcpOutputToDisk,
  loadMcpRoleRegistry,
  verifySquadMcpRoleRouting,
  HUMANLAYER_RPI_STAGES,
  PATH_KNOWLEDGE_TRIGGERS,
  loadFactoryControlPlane,
  resolveKnowledgeTriggersForPaths,
  loadRpiCheckpoint,
  saveRpiCheckpoint,
  advanceRpiStage,
  runHumanLayerRpiPipeline,
  runOpenHandsStuckDetector,
  runBraintrustAutoevals,
  ADAPTIVE_LANES,
  classifyAdaptiveDepthLane,
  buildAndPersistBeadsTaskGraph,
  loadBeadsTaskGraph
};

const __filename = fileURLToPath(import.meta.url);

export { buildCompactSkillIndex, measureRoleTier1TokenBudget } from '../intelligence/agent_squad.mjs';

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const useSandbox = process.argv.includes('--sandbox');
  const resume = process.argv.includes('--resume');
  const isSpeculative = process.argv.includes('--best-of-n');

  const run = async () => {
    const res = await runSquadMission('SOTA Parallel Bolt Verification', { useSandbox, resume });
    if (isSpeculative && res.passed) {
      await runBestOfNSpeculative();
    }
    process.exit(res.passed ? 0 : 1);
  };
  run();
}
