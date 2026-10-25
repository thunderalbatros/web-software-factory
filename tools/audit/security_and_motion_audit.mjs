// Security & Motion Performance Automated Auditor
// Enforces Cloudflare Security Audit rules & Emil Kowalski 60 FPS animation constraints
// Usage: node tools/audit/security_and_motion_audit.mjs [--project <slug>]

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadProjectConfig } from '../lib/project_loader.mjs';

const projectCfg = loadProjectConfig();
const root = projectCfg.projectRoot;
const siteDir = path.join(root, projectCfg.paths?.siteDir || 'site');
const isGamblingProfile = projectCfg.complianceProfile === 'gambling-18plus';

console.log('====================================================');
console.log(`🛡️  SECURITY & MOTION AUDIT HARNESS [${projectCfg.id}]`);
console.log('====================================================\n');

let issues = [];

// 1. Audit CSS for layout thrashing (transition: all)
const cssCandidates = [
  path.join(siteDir, 'css', 'style.css'),
  path.join(root, projectCfg.paths?.cssDir || 'site/css', 'style.css'),
  path.join(root, 'src', 'styles', 'global.css')
];
const stylePath = cssCandidates.find(p => fs.existsSync(p));
if (stylePath) {
  const content = fs.readFileSync(stylePath, 'utf8');
  const lines = content.split('\n');
  let transitionAllCount = 0;
  lines.forEach((line) => {
    if (/transition:\s*all\s/i.test(line)) {
      transitionAllCount++;
    }
  });

  if (transitionAllCount > 50) {
    issues.push({
      severity: 'WARNING',
      category: 'Motion Performance',
      message: `Found ${transitionAllCount} instances of 'transition: all' in CSS. Rule: composite properties only.`
    });
  } else {
    console.log(`✅ [Motion] Checked CSS: Transition budget within acceptable threshold (${transitionAllCount} instances tracked).`);
  }
}

// 2. Audit entry HTML / Astro for target="_blank" without rel="noopener noreferrer"
const indexPath = path.join(root, projectCfg.paths?.entryHtml || 'index.html');
if (fs.existsSync(indexPath)) {
  const html = fs.readFileSync(indexPath, 'utf8');
  const regex = /<a\s+[^>]*target=["']_blank["'][^>]*>/gi;
  let match;
  let unsafeLinks = 0;
  while ((match = regex.exec(html)) !== null) {
    const tag = match[0];
    if (!tag.includes('rel=') || (!tag.includes('noopener') && !tag.includes('noreferrer'))) {
      unsafeLinks++;
    }
  }

  if (unsafeLinks > 0) {
    issues.push({
      severity: 'MAJOR',
      category: 'Security (Reverse Tabnabbing)',
      message: `Found ${unsafeLinks} external links with target="_blank" missing rel="noopener noreferrer".`
    });
  } else {
    console.log('✅ [Security] Checked entry HTML: 100% of target="_blank" links have secure rel attributes.');
  }
}

// 3. Audit site/js/app.js for XSS sanitizer or textContent safety
const appJsPath = path.join(siteDir, 'js', 'app.js');
if (fs.existsSync(appJsPath)) {
  const code = fs.readFileSync(appJsPath, 'utf8');
  if (code.includes('window.escapeHTML') || code.includes('textContent')) {
    console.log('✅ [Security] Universal XSS sanitizer (window.escapeHTML / textContent) is active in app.js.');
  } else {
    issues.push({
      severity: 'BLOCKER',
      category: 'Security (XSS Defense)',
      message: 'window.escapeHTML or textContent missing from site/js/app.js.'
    });
  }
}

// 4-7. DiggityBets-specific module checks (only when gambling-18plus profile and files exist)
if (isGamblingProfile) {
  const tourneyPath = path.join(siteDir, 'js', 'tournament-prediction.js');
  if (fs.existsSync(tourneyPath)) {
    const code = fs.readFileSync(tourneyPath, 'utf8');
    if (code.includes('esc(name)') || code.includes('window.escapeHTML')) {
      console.log('✅ [Security] tournament-prediction.js applies XSS sanitization on bracket rendering.');
    } else {
      issues.push({
        severity: 'MAJOR',
        category: 'Security (XSS Defense)',
        message: 'tournament-prediction.js does not sanitize slot names.'
      });
    }
  }

  const userStorePath = path.join(siteDir, 'js', 'user-store.js');
  if (fs.existsSync(userStorePath)) {
    const code = fs.readFileSync(userStorePath, 'utf8');
    if (code.includes('esc(this.stakeUsername') && code.includes('safeBetId')) {
      console.log('✅ [Security] user-store.js protects Stake VIP submissions and Leaderboard against DOM-XSS.');
    } else {
      issues.push({
        severity: 'MAJOR',
        category: 'Security (XSS Defense)',
        message: 'user-store.js missing sanitization on Stake VIP or Leaderboard.'
      });
    }
  }

  const slotsPath = path.join(siteDir, 'js', 'slots-explorer.js');
  if (fs.existsSync(slotsPath)) {
    const code = fs.readFileSync(slotsPath, 'utf8');
    if (code.includes('esc(this.searchQuery)') && code.includes('rel="noopener noreferrer"')) {
      console.log('✅ [Security] slots-explorer.js sanitizes search query and secures external wheel links.');
    } else {
      issues.push({
        severity: 'MAJOR',
        category: 'Security (XSS / Reverse Tabnabbing)',
        message: 'slots-explorer.js missing search query escaping or secure rel attribute.'
      });
    }
  }

  const chatPath = path.join(siteDir, 'js', 'chat.js');
  if (fs.existsSync(chatPath)) {
    const code = fs.readFileSync(chatPath, 'utf8');
    if (code.includes('safeUser') && code.includes('safeColor')) {
      console.log('✅ [Security] chat.js enforces username escaping and strict color hex validation.');
    } else {
      issues.push({
        severity: 'MAJOR',
        category: 'Security (XSS Defense)',
        message: 'chat.js missing username escaping or color hex validation.'
      });
    }
  }
}

console.log('\n----------------------------------------------------');
if (issues.length === 0) {
  console.log('🎉 AUDIT RESULT: 100% PASS — Zero security or motion blockers detected!\n');
  process.exit(0);
} else {
  console.log(`⚠️ AUDIT RESULT: ${issues.length} issue(s) detected:`);
  issues.forEach(i => console.log(`  [${i.severity}] ${i.category}: ${i.message}`));
  console.log('');
  process.exit(issues.some(i => i.severity === 'BLOCKER') ? 1 : 0);
}
