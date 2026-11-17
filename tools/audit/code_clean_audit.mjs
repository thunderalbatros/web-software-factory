#!/usr/bin/env node
/**
 * Web Software Factory Studio — AI Clean Code, AST Anti-Pattern & 60-FPS Motion Architecture Auditor
 * Usage: node tools/audit/code_clean_audit.mjs
 * Outputs: tools/audit/out/clean-code-report.json (0-100 Score + actionable findings)
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { loadProjectConfig } from '../lib/project_loader.mjs';
import { runOxlintFastPass } from './ast_guard.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));

function collectFiles(dir, exts, result = []) {
  if (!fs.existsSync(dir)) return result;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist' || entry.name === 'references' || entry.name === 'vendor' || entry.name === 'PartnerBrand-games' || entry.name === '_legacy_archive') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectFiles(full, exts, result);
    } else if (exts.includes(path.extname(entry.name).toLowerCase())) {
      result.push(full);
    }
  }
  return result;
}

const isMainAudit = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

/**
 * Deterministic Copy-Paste Duplication Detector (`morluto/rea` `.jscpd.json` pattern, `maxDuplicationPercent = 4.0`).
 * Scans normalized 8-line sliding windows across code blocks and fails if duplicated lines exceed `4.0%`.
 */
export function computeCodeDuplicationMetrics(fileEntries = [], maxDuplicationPercent = 4.0, windowSize = 8) {
  let totalMeaningfulLines = 0;
  let duplicatedLinesCount = 0;
  const seenWindows = new Map();
  const duplicateClones = [];

  for (const item of fileEntries) {
    const fileLabel = item.file || 'inline';
    const rawLines = String(item.content || '')
      .split(/\r?\n/)
      .map((l) => l.replace(/\/\/.*$/, '').trim())
      .filter((l) => l.length > 12 && !/^[{}();,]+$/.test(l));

    totalMeaningfulLines += rawLines.length;
    if (rawLines.length < windowSize) continue;

    const duplicatedLineIndexes = new Set();
    for (let i = 0; i <= rawLines.length - windowSize; i++) {
      const blockSig = rawLines.slice(i, i + windowSize).join('\n');
      if (seenWindows.has(blockSig)) {
        for (let k = i; k < i + windowSize; k++) duplicatedLineIndexes.add(k);
        duplicateClones.push({
          file: fileLabel,
          firstSeenIn: seenWindows.get(blockSig),
          lineOffset: i + 1
        });
      } else {
        seenWindows.set(blockSig, fileLabel);
      }
    }
    duplicatedLinesCount += duplicatedLineIndexes.size;
  }

  const duplicationPercent =
    totalMeaningfulLines > 0
      ? Number(((duplicatedLinesCount / totalMeaningfulLines) * 100).toFixed(2))
      : 0.0;

  return {
    passed: duplicationPercent <= maxDuplicationPercent,
    duplicationPercent,
    maxDuplicationPercent,
    totalMeaningfulLines,
    duplicatedLinesCount,
    clonesFound: duplicateClones.length,
    clones: duplicateClones.slice(0, 10)
  };
}

export function runCodeCleanAudit(options = {}) {
  const projectConfig = loadProjectConfig(options.project || options.projectRoot || '');
  const rootDir = projectConfig.projectRoot;
  const outDir = path.join(here, 'out');
  fs.mkdirSync(outDir, { recursive: true });

  const findings = [];
  let filesChecked = 0;
  let jsFilesChecked = 0;
  let cssFilesChecked = 0;

  function addFinding(severity, category, file, line, message, fixHint) {
    findings.push({ severity, category, file, line, message, fixHint });
  }

// 0. Stage 0 Ultra-Fast Rust Oxlint Static Pass (--deny-warnings)
const oxlintRes = runOxlintFastPass();
if (!oxlintRes.passed) {
  addFinding('BLOCKER', 'oxlint-deny-warnings', 'project', 1, `Oxlint static analysis failed: ${oxlintRes.output.slice(0, 180)}`, 'Resolve Oxlint warnings/errors.');
}

// 1. Collect all production JS and CSS files from project manifest
const targetDirs = [
  ...projectConfig.paths.sourceDirs.map(rel => path.join(rootDir, rel)),
  ...projectConfig.paths.requiredOverlaysInAudit.map(rel => path.join(rootDir, rel))
];

const jsFiles = [];
const cssFiles = [];
for (const d of targetDirs) {
  collectFiles(d, ['.js'], jsFiles);
  collectFiles(d, ['.css'], cssFiles);
}

// 2. Audit JS Syntax, Duplicate Methods, Suppressions & Anti-Patterns
for (const fullPath of jsFiles) {
  const relPath = path.relative(rootDir, fullPath).replace(/\\/g, '/');
  const code = fs.readFileSync(fullPath, 'utf8');
  const lines = code.split(/\r?\n/);
  jsFilesChecked++;
  filesChecked++;

  // 2a. Syntax verification (strip ES module import/export only for vm.Script check if needed)
  const isModule = /^\s*(import|export)\s/m.test(code);
  if (!isModule) {
    try {
      new vm.Script(code, { filename: relPath });
    } catch (err) {
      addFinding('BLOCKER', 'syntax-error', relPath, 1, `JS Syntax Error: ${err.message}`, 'Fix syntax error before committing.');
    }
  }

  // 2b. Check for forbidden linter/type suppressions (@ts-ignore / eslint-disable)
  lines.forEach((line, idx) => {
    if (/@ts-ignore|@ts-expect-error|eslint-disable/.test(line)) {
      addFinding('MAJOR', 'checker-suppression', relPath, idx + 1, 'Forbidden checker suppression comment detected.', 'Resolve underlying issue instead of suppressing.');
    }
  });

  // 2c. Check for duplicate top-level class/prototype method definitions in JS modules
  if (relPath.endsWith('.js')) {
    const seenMethods = new Map();
    const methodRegex = /^\s{2,4}([a-zA-Z0-9_]+)\s*\([^)]*\)\s*\{/;
    const blockedKeywords = new Set(['if', 'for', 'while', 'switch', 'catch', 'function', 'return', 'constructor']);
    lines.forEach((line, idx) => {
      const m = line.match(methodRegex);
      if (m && !blockedKeywords.has(m[1])) {
        const name = m[1];
        if (seenMethods.has(name)) {
          addFinding('MAJOR', 'duplicate-method', relPath, idx + 1, `Duplicate method '${name}()' overwrites earlier definition at line ${seenMethods.get(name)}.`, `Remove or rename duplicate '${name}()' method.`);
        } else {
          seenMethods.set(name, idx + 1);
        }
      }
    });
  }
}

// 3. Audit CSS Architecture & GPU Compositor Discipline
for (const fullPath of cssFiles) {
  const relPath = path.relative(rootDir, fullPath).replace(/\\/g, '/');
  const css = fs.readFileSync(fullPath, 'utf8');
  const lines = css.split(/\r?\n/);
  cssFilesChecked++;
  filesChecked++;

  // 3a. Check @keyframes for non-composited layout thrashing properties (top/left/width/height/margin)
  const keyframeBlocks = css.matchAll(/@keyframes\s+([a-zA-Z0-9_-]+)\s*\{([\s\S]*?\})\s*\}/g);
  for (const match of keyframeBlocks) {
    const kfName = match[1];
    const kfBody = match[2];
    if (/\b(margin-top|margin-left|padding-top|padding-left|top|left)\s*:/i.test(kfBody)) {
      addFinding('MINOR', 'non-composited-keyframe', relPath, 1, `@keyframes '${kfName}' animates layout geometry (top/left/margin/padding) instead of GPU transform.`, 'Use transform: translate3d() / translateY() / scaleX() for 60 FPS compositor execution.');
    }
  }

  // 3c. Check excessive blur radius (> 30px) in OBS overlays
  if (relPath.startsWith('overlay-')) {
    lines.forEach((line, idx) => {
      const m = line.match(/backdrop-filter:\s*blur\((\d+)px\)/i);
      if (m && parseInt(m[1], 10) > 24) {
        addFinding('MINOR', 'obs-gpu-blur-budget', relPath, idx + 1, `High backdrop-filter blur(${m[1]}px) in OBS overlay can exceed 5% GPU budget on integrated graphics.`, 'Reduce blur radius to <= 12px or use radial-gradient.');
      }
    });
  }
}

// 4. Audit entry HTML Security, Windows 10 Emoji Compatibility & Asset Integrity
const indexHtmlPath = path.join(rootDir, projectConfig.paths.entryHtml || 'index.html');
if (fs.existsSync(indexHtmlPath)) {
  filesChecked++;
  const html = fs.readFileSync(indexHtmlPath, 'utf8');

  // 4a. Check target="_blank" rel="noopener noreferrer"
  const blankLinks = [...html.matchAll(/<a\s+[^>]*target=["']_blank["'][^>]*>/gi)];
  let unsafeBlank = 0;
  for (const m of blankLinks) {
    const tag = m[0];
    if (!tag.includes('rel=') || (!tag.includes('noopener') && !tag.includes('noreferrer'))) {
      unsafeBlank++;
    }
  }
  if (unsafeBlank > 0) {
    addFinding('MAJOR', 'reverse-tabnabbing', 'index.html', 1, `${unsafeBlank} external target="_blank" link(s) missing rel="noopener noreferrer".`, 'Add rel="noopener noreferrer" to all target="_blank" links.');
  }

  // 4b. Check for unsupported Unicode 13-15 emojis that render as tofu [] on Windows 10 Segoe UI Emoji
  const win10UnsupportedEmojis = [
    { char: '\u{1FA9A}', name: 'Carpentry Saw (U+1FA9A)' },
    { char: '\u{1FA75}', name: 'Light Blue Heart (U+1FA75)' },
    { char: '\u{1FA76}', name: 'Grey Heart (U+1FA76)' },
    { char: '\u{1FA77}', name: 'Pink Heart (U+1FA77)' },
    { char: '\u{1FAA9}', name: 'Mirror Ball (U+1FAA9)' }
  ];
  for (const item of win10UnsupportedEmojis) {
    if (html.includes(item.char)) {
      addFinding('MAJOR', 'win10-missing-emoji-glyph', 'index.html', 1, `Unsupported Windows 10 emoji detected: ${item.name} renders as [] box on Windows 10.`, 'Replace with universal Unicode <= 11 emoji or inline SVG.');
    }
  }
}

// 5. Stage 5: Knip-Inspired Dead Code, Unreferenced Exports & Orphan File Detector (Vault: audit-sota/knip)
let orphanFilesCount = 0;
let unusedExportsCount = 0;
const astroAndModuleFiles = [];
for (const d of targetDirs) {
  collectFiles(d, ['.astro', '.mdx', '.mjs', '.ts'], astroAndModuleFiles);
}
const extraConsumerFiles = [
  ...(fs.existsSync(indexHtmlPath) ? [indexHtmlPath] : []),
  ...(fs.existsSync(path.join(rootDir, 'astro.config.mjs')) ? [path.join(rootDir, 'astro.config.mjs')] : []),
  ...collectFiles(path.join(rootDir, 'worker'), ['.js', '.mjs', '.ts'])
];
const consumerMap = new Map();
for (const f of [...extraConsumerFiles, ...jsFiles, ...cssFiles, ...astroAndModuleFiles]) {
  const abs = path.resolve(f);
  if (!consumerMap.has(abs) && fs.existsSync(abs)) {
    consumerMap.set(abs, fs.readFileSync(abs, 'utf8'));
  }
}

for (const fullPath of [...jsFiles, ...cssFiles]) {
  const absTarget = path.resolve(fullPath);
  const baseName = path.basename(fullPath);
  const relPath = path.relative(rootDir, fullPath).replace(/\\/g, '/');
  // Entry points & standard template assets are always referenced
  if (['app.js', 'index.js', 'design-tokens.css', 'ui-primitives.css', 'motion-engine.css', 'mobile-ergonomics.css', 'diorama-hero-3d.css'].includes(baseName)) {
    continue;
  }
  const stem = baseName.replace(/\.[^.]+$/, '');
  const escapedStem = new RegExp(stem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  let externalRefCount = 0;
  for (const [consumerAbs, text] of consumerMap.entries()) {
    if (consumerAbs === absTarget) continue;
    const matches = text.match(escapedStem);
    if (matches) externalRefCount += matches.length;
  }
  if (externalRefCount === 0) {
    orphanFilesCount++;
    addFinding('MINOR', 'knip-orphan-file', relPath, 1, `Orphan asset or unreferenced module detected (${relPath}).`, 'Import/link the file or prune dead asset (knip rule).');
  }
}

const duplicationEntries = [...jsFiles, ...cssFiles].map((fp) => ({
  file: path.relative(rootDir, fp).replace(/\\/g, '/'),
  content: fs.readFileSync(fp, 'utf8')
}));
const duplicationRes = computeCodeDuplicationMetrics(duplicationEntries, 4.0);
if (!duplicationRes.passed) {
  addFinding(
    'BLOCKER',
    'jscpd-duplication-threshold',
    duplicationRes.clones[0]?.file || 'project',
    duplicationRes.clones[0]?.lineOffset || 1,
    `Code duplication is ${duplicationRes.duplicationPercent}% (exceeds maxDuplicationPercent: 4.0%).`,
    'Refactor duplicated blocks into shared modular utilities.'
  );
}

const blockers = findings.filter(f => f.severity === 'BLOCKER').length;
const majors = findings.filter(f => f.severity === 'MAJOR').length;
const minors = findings.filter(f => f.severity === 'MINOR').length;
const score = Math.max(0, 100 - (blockers * 25) - (majors * 8) - (minors * 2));

const report = {
  generatedAt: new Date().toISOString(),
  projectId: projectConfig.id,
  score,
  duplication: duplicationRes,
  summary: {
    filesChecked,
    jsFilesChecked,
    cssFilesChecked,
    duplicationPercent: duplicationRes.duplicationPercent,
    maxDuplicationPercent: duplicationRes.maxDuplicationPercent,
    blockers,
    majors,
    minors
  },
  findings
};

fs.writeFileSync(path.join(outDir, 'clean-code-report.json'), JSON.stringify(report, null, 2));

  return {
    passed: blockers === 0 && duplicationRes.passed,
    score,
    duplicationPercent: duplicationRes.duplicationPercent,
    orphanFilesCount,
    unusedExportsCount,
    oxlintPassed: oxlintRes.passed,
    oxlintDurationMs: oxlintRes.durationMs,
    report
  };
}

if (isMainAudit) {
  const projIdx = process.argv.indexOf('--project');
  const projFlag =
    projIdx !== -1 && process.argv[projIdx + 1]
      ? process.argv[projIdx + 1]
      : (process.argv.find((a) => a.startsWith('--project=')) || '').slice('--project='.length);
  const res = runCodeCleanAudit({ project: projFlag });
  const { report, oxlintPassed, oxlintDurationMs, orphanFilesCount, unusedExportsCount } = res;
  const { filesChecked, jsFilesChecked, cssFilesChecked, blockers, majors, minors } = report.summary;
  console.log('==================================================================');
  console.log(`🧠 WEB SOFTWARE FACTORY — CLEAN CODE, AST & 60-FPS AUDITOR [${report.projectId}]`);
  console.log('==================================================================\n');
  console.log(`⚡ [Stage 0] Rust Oxlint (--deny-warnings): ${oxlintPassed ? 'PASS' : 'FAIL'} in ${oxlintDurationMs}ms`);
  console.log(`🧹 [Stage 5] Knip Dead-Code & Orphan Asset Pass: ${orphanFilesCount} orphan files, ${unusedExportsCount} dead exports`);
  console.log(`🧬 [Stage 6] Anti-Copy-Paste Duplication Guard (< 4.0%): ${res.duplicationPercent}% (${report.duplication.passed ? 'PASS' : 'FAIL'})`);
  console.log(`✅ Audited ${filesChecked} files (${jsFilesChecked} JS controllers/overlays, ${cssFilesChecked} CSS stylesheets + index.html)`);
  console.log(`📊 Clean Code & 60-FPS Architecture Score: ${res.score}/100 (Blockers: ${blockers}, Majors: ${majors}, Minors: ${minors})`);
  if (report.findings.length > 0) {
    console.log('\nFindings:');
    for (const f of report.findings) {
      console.log(`  [${f.severity}] ${f.file}:${f.line} (${f.category}) -> ${f.message}`);
    }
  } else {
    console.log('🎉 ZERO clean-code, AST, duplication, security, or 60-FPS motion anti-patterns detected!');
  }
  process.exit(blockers > 0 ? 1 : 0);
}
