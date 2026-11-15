/**
 * tools/intelligence/spec_generator.mjs — Spec-Driven Development (SDD) Engine
 * =============================================================================
 * Inspired by Zach Lloyd (Warp) and Dru Knox (Tessl).
 * Decomposes user briefs and feature requests into two rigorous specifications
 * BEFORE any code is written:
 *   1. Product Spec: Problem definition, user personas, UX states, acceptance criteria.
 *   2. Tech Spec: Data structures, API contracts, state transitions, test vectors.
 * =============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadProjectConfig } from '../lib/project_loader.mjs';
import {
  compileSpecFromInterview,
  verifyClientInterviewGate,
  initClientInterviewFiles
} from '../orchestrator/client_interview_gate.mjs';

export {
  compileSpecFromInterview,
  verifyClientInterviewGate,
  initClientInterviewFiles
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generateSoftwareSpec(featureTitle, description, options = {}) {
  const projectConfig = loadProjectConfig(options.projectDir || '');
  const ROOT = projectConfig.projectRoot;
  const SPECS_DIR = path.join(ROOT, 'docs', 'specs');
  const SPECIFY_MEM_DIR = path.join(ROOT, '.specify', 'memory');

  const slug = featureTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const SPEC_KIT_DIR = path.join(ROOT, '.specify', 'specs', slug);

  fs.mkdirSync(SPECS_DIR, { recursive: true });
  fs.mkdirSync(SPECIFY_MEM_DIR, { recursive: true });
  fs.mkdirSync(SPEC_KIT_DIR, { recursive: true });

  const timestamp = new Date().toISOString();
  const isStaticEducation =
    projectConfig.complianceProfile === 'education' ||
    projectConfig.archetype === 'education' ||
    projectConfig.paths?.workerEntry === null;

  const defaultCriteria = [
    'Zero UI layout thrashing or horizontal overflow across 1440px, 768px, and 390px viewports.',
    '100% WCAG 2.2 AA accessibility compliance (semantic landmarks <main>, <nav>, ARIA labels, APCA contrast).',
    'Zero inline executable <script> blocks or inline onclick handlers (strict CSP compliance).'
  ];
  if (projectConfig.complianceProfile === 'gambling-18plus') {
    defaultCriteria.push('100% compliant with RealtimeHub gambling guidelines (+18 disclaimer, zero spectator money custody, OBS CPU <= 5%).');
  }
  if (isStaticEducation) {
    defaultCriteria.push('100% static Read-mode architecture (0 backend Worker API endpoints, Trusted Types enforced, 1:1 MessageChannel tutor sandbox).');
  }

  const productSpec = {
    spec_version: '2026.2-speckit',
    type: 'product_spec',
    project_id: projectConfig.id,
    archetype: projectConfig.archetype,
    slug,
    title: featureTitle,
    created_at: timestamp,
    author_role: 'Squad 0 — Product Spec Agent',
    problem_statement: description,
    target_users: options.target_users || projectConfig.sdd.targetUsers,
    user_experience: {
      primary_flow:
        options.flow ||
        (isStaticEducation
          ? 'Learner navigates MPA curriculum -> reads 65ch lesson, explores Pagefind index, and practices in isolated 1:1 MessageChannel sandbox with local browser progress.'
          : 'User triggers action from UI -> System responds with <100ms INP tactile feedback and deterministic state updates.'),
      error_states: isStaticEducation
        ? [
            'Offline navigation served from lightweight MPA Service Worker cache (< 250 KB precache)',
            'Invalid user input rejected by Valibot schema validation',
            'Sandboxed tutor MessageChannel schema mismatch rejected fail-closed'
          ]
        : ['Network offline / degraded', 'Invalid user input validation', 'Rate limit exceeded (HTTP 429)'],
      visual_theme: options.visual_theme || projectConfig.sdd.visualTheme
    },
    acceptance_criteria: options.criteria || defaultCriteria
  };

  const techSpec = {
    spec_version: '2026.2-speckit',
    type: 'tech_spec',
    project_id: projectConfig.id,
    stack: projectConfig.stack,
    slug,
    title: `${featureTitle} — Architecture & Technical Spec`,
    created_at: timestamp,
    author_role: 'Squad 2 — Technical Architecture Droid',
    architecture_tier: options.tier || projectConfig.sdd.architectureTier,
    data_contracts: {
      storage_keys:
        options.storage_keys ||
        (isStaticEducation
          ? ['academia_ia_theme_v1', 'academia_ia_progress_v1', 'academia_ia_xp_v1']
          : [`${projectConfig.id}_${slug}_state`]),
      event_bus:
        options.event_bus ||
        (isStaticEducation ? 'MessageChannel (1:1 sandbox="allow-scripts")' : `${projectConfig.id}:${slug}-event`),
      api_endpoints:
        options.endpoints || (isStaticEducation ? [] : [`/api/${slug}/state`, `/api/${slug}/action`])
    },
    security_invariants: isStaticEducation
      ? [
          'Trusted Types enforced: default.createHTML throws TypeError; dynamic HTML sanitized via DOMPurify (RETURN_TRUSTED_TYPE: true) or safe DOM APIs.',
          'Zero eval() or new Function() calls; strict CSP generated deterministically from src/lib/csp-builder.mjs.',
          'Sandboxed tutor communicates over dedicated 1:1 MessageChannel validated with Valibot (0 backend endpoints).'
        ]
      : [
          'Untrusted input rendered strictly via textContent or escaped template literals.',
          'Zero eval() or new Function() calls.',
          'All remote network calls protected by AbortSignal.timeout(2500-3500ms).'
        ],
    verification_harness: {
      gate_command: `node tools/factory.mjs gate --project ${projectConfig.id}`,
      ast_symbols_check: true,
      playwright_viewports: [1440, 768, 390]
    }
  };

  const specFilePath = path.join(SPECS_DIR, `${slug}.spec.json`);
  const combinedSpec = { productSpec, techSpec };
  fs.writeFileSync(specFilePath, JSON.stringify(combinedSpec, null, 2) + '\n', 'utf8');

  // GitHub spec-kit compatible Markdown artifacts (.specify/)
  const constitutionMdPath = path.join(SPECIFY_MEM_DIR, 'constitution.md');
  if (!fs.existsSync(constitutionMdPath)) {
    fs.writeFileSync(
      constitutionMdPath,
      `# Project Constitution — ${projectConfig.name} (\`${projectConfig.id}\`)\n\n` +
      `- **Archetype:** \`${projectConfig.archetype}\` | **Stack:** \`${projectConfig.stack}\` | **Compliance:** \`${projectConfig.complianceProfile}\`\n` +
      `- **Atomic Discipline:** Changes must be modular (<= 300 lines per step), test-first, and verified by the 5-Gate Pre-HITL pipeline.\n` +
      `- **Design System:** W3C DTCG 2025.10 tokens (\`${projectConfig.paths.tokensPath}\`), OKLCH 90/8/2 chromatic budget, Utopia \`clamp()\`, and \`@starting-style\` motion.\n` +
      `- **Security & Performance:** Strict CSP (0 inline executable scripts), 0 \`@ts-ignore\`/\`eslint-disable\` suppressions, Core Web Vitals (LCP < 1.8s, INP < 100ms, CLS < 0.05).\n`,
      'utf8'
    );
  }

  const specMarkdownBody =
    `# Feature Specification: ${featureTitle}\n\n` +
    `> **Project:** \`${projectConfig.id}\` | **Slug:** \`${slug}\` | **Stack:** \`${projectConfig.stack}\` | **Archetype:** \`${projectConfig.archetype}\` | **Created:** ${timestamp}\n\n` +
    `## 1. Problem Statement\n${description}\n\n` +
    `## 2. Target Personas\n${productSpec.target_users.map(u => `- ${u}`).join('\n')}\n\n` +
    `## 3. User Experience & Primary Flow\n- **Flow:** ${productSpec.user_experience.primary_flow}\n- **Visual Theme:** ${productSpec.user_experience.visual_theme}\n- **Error States:** ${productSpec.user_experience.error_states.join(', ')}\n\n` +
    `## 4. Acceptance Criteria\n${productSpec.acceptance_criteria.map(c => `- [ ] ${c}`).join('\n')}\n`;

  fs.writeFileSync(path.join(SPEC_KIT_DIR, 'spec.md'), specMarkdownBody, 'utf8');

  // Ensure every isolated project in projects/<slug>/ has its own root SPEC.md without clobbering compiled [REQ-01] specs
  const rootSpecPath = path.join(ROOT, 'SPEC.md');
  const hasCompiledRootSpec =
    fs.existsSync(rootSpecPath) && fs.readFileSync(rootSpecPath, 'utf8').includes('[REQ-01]');
  if (path.resolve(ROOT) !== path.resolve(projectConfig.factoryRoot) && !hasCompiledRootSpec) {
    fs.writeFileSync(rootSpecPath, specMarkdownBody, 'utf8');
  }

  const endpointsLabel =
    techSpec.data_contracts.api_endpoints.length > 0
      ? `\`${techSpec.data_contracts.api_endpoints.join('`, `')}\``
      : '`None (100% Static MPA — 0 Worker endpoints)`';

  fs.writeFileSync(
    path.join(SPEC_KIT_DIR, 'plan.md'),
    `# Technical Implementation Plan: ${featureTitle}\n\n` +
    `> **Project:** \`${projectConfig.id}\` | **Architecture Tier:** ${techSpec.architecture_tier}\n\n` +
    `## 1. Data & API Contracts\n- **Storage Keys:** \`${techSpec.data_contracts.storage_keys.join('`, `')}\`\n- **Event Bus:** \`${techSpec.data_contracts.event_bus}\`\n- **Endpoints:** ${endpointsLabel}\n\n` +
    `## 2. Security & Quality Invariants\n${techSpec.security_invariants.map(s => `- ${s}`).join('\n')}\n\n` +
    `## 3. Verification Harness\n- Gate Command: \`${techSpec.verification_harness.gate_command}\`\n- Viewports: \`${techSpec.verification_harness.playwright_viewports.join('px, ')}px\`\n`,
    'utf8'
  );

  const task2Body = isStaticEducation
    ? `- [ ] **T2 — Local-First Pedagogy & Isolated Sandbox (Squad 2/5):** Implement static MPA interactive state, Pagefind search, and 1:1 MessageChannel tutor sandbox (0 backend endpoints).\n`
    : `- [ ] **T2 — Core Logic & Edge API (Squad 2/5):** Implement interactive state and endpoints (\`${techSpec.data_contracts.api_endpoints.join(', ')}\`) within <= 300 lines.\n`;

  fs.writeFileSync(
    path.join(SPEC_KIT_DIR, 'tasks.md'),
    `# Executable Task Breakdown: ${featureTitle}\n\n` +
    `- [ ] **T1 — Design Tokens & Semantic Markup (Squad 4):** Define W3C DTCG tokens in \`${projectConfig.paths.tokensPath}\` and semantic HTML landmarks.\n` +
    task2Body +
    `- [ ] **T3 — 5-Gate Automated Pre-HITL Verification (Squad 6):** Run \`${techSpec.verification_harness.gate_command}\` and certify 0 blockers.\n`,
    'utf8'
  );

  // Anthropic Long-Running Agent Harness artifacts (.specify/memory/features.json & PROGRESS.md)
  const featuresJsonPath = path.join(SPECIFY_MEM_DIR, 'features.json');
  let featuresList = [];
  if (fs.existsSync(featuresJsonPath)) {
    try { featuresList = JSON.parse(fs.readFileSync(featuresJsonPath, 'utf8')); } catch { featuresList = []; }
  }
  const existingIdx = featuresList.findIndex(f => f.slug === slug);
  const featureEntry = {
    id: `FEAT-${String(existingIdx >= 0 ? existingIdx + 1 : featuresList.length + 1).padStart(3, '0')}`,
    slug,
    title: featureTitle,
    description,
    passes: false,
    verification_command: techSpec.verification_harness.gate_command,
    acceptance_criteria: productSpec.acceptance_criteria,
    updated_at: timestamp
  };
  if (existingIdx >= 0) {
    featuresList[existingIdx] = { ...featuresList[existingIdx], ...featureEntry };
  } else {
    featuresList.push(featureEntry);
  }
  fs.writeFileSync(featuresJsonPath, JSON.stringify(featuresList, null, 2) + '\n', 'utf8');

  const progressMdPath = path.join(SPECIFY_MEM_DIR, 'PROGRESS.md');
  if (!fs.existsSync(progressMdPath)) {
    fs.writeFileSync(
      progressMdPath,
      `# Cross-Session Agent Harness Progress Log — ${projectConfig.name} (\`${projectConfig.id}\`)\n\n` +
      `> **Protocol (Anthropic Long-Running Harness):** Read \`features.json\`, \`PROGRESS.md\`, and \`git log -n 5\` at session start. Implement 1 feature per atomic cycle, run \`${techSpec.verification_harness.gate_command}\`, update \`passes: true\`, and append handoff notes below.\n\n` +
      `- **[${timestamp}] Initializer Agent:** Scaffolded \`${slug}\` (\`${featureTitle}\`) in \`.specify/specs/${slug}/\` and registered in \`features.json\`.\n`,
      'utf8'
    );
  } else {
    fs.appendFileSync(
      progressMdPath,
      `- **[${timestamp}] Spec Generator:** Registered/updated feature \`${slug}\` (\`${featureTitle}\`) in \`features.json\`.\n`,
      'utf8'
    );
  }

  console.log(`\n======================================================`);
  console.log(`📐 SPEC-DRIVEN DEVELOPMENT (SDD + SPEC-KIT) GENERATED`);
  console.log(`Project:  ${projectConfig.id} (${projectConfig.archetype})`);
  console.log(`Feature:  ${featureTitle}`);
  console.log(`JSON:     docs/specs/${slug}.spec.json`);
  console.log(`Spec-Kit: .specify/specs/${slug}/{spec.md,plan.md,tasks.md}`);
  console.log(`Harness:  .specify/memory/{features.json,PROGRESS.md}`);
  console.log(`======================================================\n`);

  return combinedSpec;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2).filter((a, idx, arr) => a !== '--project' && arr[idx - 1] !== '--project' && !a.startsWith('--project='));
  const title = args[0] || 'Interactive Feature Module';
  const desc = args[1] || 'High-conversion, accessible web module with deterministic state and 60-FPS motion.';
  generateSoftwareSpec(title, desc);
}
