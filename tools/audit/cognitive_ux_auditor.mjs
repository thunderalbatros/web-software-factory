#!/usr/bin/env node
/**
 * Web Software Factory Studio — Software Factory Cognitive UX & Dark-Pattern Auditor
 * =============================================================================
 * Audits HTML/Astro/MDX/JS/CSS source and DOM metadata across cognitive dimensions:
 *   1. UXBench (CVPR 2026): Modal Escape Integrity (PopupNoClose)
 *   2. UIGuard (ACM UIST): Profile-Scoped Anti-Dark-Pattern & Compliance Guard
 *      - Universal: Zero confirm-shaming copy
 *      - `gambling-18plus` ONLY: Zero paid entry fees, zero synthetic RTP claims, mandatory +18 & RG disclaimers
 *      - `education` ONLY: Zero hidden paywalls / `#pricing` gates + mandatory brief local-storage notice beside external video players
 *   3. Fitts's Law & Touch/Click Target Ergonomics (`>= 44x44px` on Mobile 375px)
 *   4. Optical Collision & Overflow Verification (`optical_geometry_report.json`)
 *
 * Usage:
 *   node tools/audit/cognitive_ux_auditor.mjs [--project <slug-or-path>]
 * =============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadProjectConfig } from '../lib/project_loader.mjs';

const __filename = fileURLToPath(import.meta.url);

const UNIVERSAL_DARK_PATTERNS = [
  {
    id: 'CONFIRM_SHAMING',
    severity: 'MEDIUM',
    regex: /\b(prefiero perder|no quiero ganar nunca|soy un perdedor|no gracias,\s*prefiero seguir sin aprender)\b/i,
    explanation: 'UIGuard: Passive-aggressive confirm-shaming copy is prohibited.'
  }
];

const GAMBLING_ONLY_RULES = [
  {
    id: 'PAID_ENTRY_VIOLATION',
    severity: 'CRITICAL',
    regex: /\b(entrada paga|pagar para participar|comprar boleto con dinero|paid entry fee)\b/i,
    explanation: 'RealtimeHub Compliance Rule 2.2: All spectator participation must be 100% free ($0).'
  },
  {
    id: 'SYNTHETIC_RTP_CLAIM',
    severity: 'HIGH',
    regex: /\b(vouching for rtp|ganancia garantizada|100%\s*seguro que ganas)\b/i,
    explanation: 'Responsible Gambling Compliance: Never promise guaranteed gambling returns.'
  }
];

const EDUCATION_PAYWALL_PATTERNS = [
  /\b(muro de pago|desbloquea(?:r)?\s+con\s+plan\s+pro|exclusivo\s+para\s+suscriptores\s+pagos|suscripci[oó]n\s+mensual\s+obligatoria|upgrade\s+to\s+pro\s+to\s+read)\b/i,
  /\bid\s*=\s*["']pricing["']/i,
  /\bhref\s*=\s*["']#pricing["']/i
];

function collectTextFiles(dir, exts, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.git', 'dist', '.astro', '.cache'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectTextFiles(full, exts, out);
    else if (exts.some((ext) => entry.name.toLowerCase().endsWith(ext))) out.push(full);
  }
  return out;
}

export function runCognitiveUxAudit(projectInput = '') {
  const activeCfg =
    projectInput && typeof projectInput === 'object' && projectInput.projectRoot
      ? projectInput
      : loadProjectConfig(typeof projectInput === 'string' ? projectInput : '');
  const ROOT = activeCfg.projectRoot;
  const SITE_DIR = path.join(ROOT, activeCfg.paths?.siteDir || 'site');
  const isGamblingProfile = activeCfg.complianceProfile === 'gambling-18plus';
  const isEducationProfile = activeCfg.complianceProfile === 'education';

  const entryHtmlPath = path.join(ROOT, activeCfg.paths?.entryHtml || 'index.html');
  const rootHtmlPath = path.join(ROOT, 'index.html');
  const siteHtmlPath = path.join(SITE_DIR, 'index.html');
  let html = fs.existsSync(entryHtmlPath)
    ? fs.readFileSync(entryHtmlPath, 'utf8')
    : fs.existsSync(rootHtmlPath)
      ? fs.readFileSync(rootHtmlPath, 'utf8')
      : fs.existsSync(siteHtmlPath)
        ? fs.readFileSync(siteHtmlPath, 'utf8')
        : '';

  const layoutAstroPath = path.join(ROOT, 'src', 'layouts', 'BaseLayout.astro');
  if (fs.existsSync(layoutAstroPath)) {
    html = `${fs.readFileSync(layoutAstroPath, 'utf8')}\n${html}`;
  }

  let educationCorpus = html;
  const educationComponentFiles = [];
  if (isEducationProfile) {
    collectTextFiles(path.join(ROOT, 'src'), ['.astro', '.mdx', '.md', '.html'], educationComponentFiles);
    if (educationComponentFiles.length > 0) {
      educationCorpus = educationComponentFiles.map((f) => fs.readFileSync(f, 'utf8')).join('\n');
    }
  }

  const findings = [];
  const activeSurfaceText = isEducationProfile ? educationCorpus : html;

  // 1. Universal Dark Patterns
  for (const rule of UNIVERSAL_DARK_PATTERNS) {
    if (rule.regex.test(activeSurfaceText)) {
      findings.push({
        type: rule.id,
        severity: rule.severity,
        message: rule.explanation
      });
    }
  }

  // 2. Gambling-only rules (strictly disabled outside gambling-18plus)
  if (isGamblingProfile) {
    for (const rule of GAMBLING_ONLY_RULES) {
      if (rule.regex.test(html)) {
        findings.push({
          type: rule.id,
          severity: rule.severity,
          message: rule.explanation
        });
      }
    }
  }

  // 3. Education-only rules: Zero hidden paywalls + brief local-storage notice next to external video player
  let externalVideoPlayerDetected = false;
  let videoLocalStorageNoticeVerified = true;
  if (isEducationProfile) {
    for (const paywallRx of EDUCATION_PAYWALL_PATTERNS) {
      if (paywallRx.test(educationCorpus)) {
        findings.push({
          type: 'HIDDEN_PAYWALL_IN_EDUCATION',
          severity: 'CRITICAL',
          message: 'Education profile prohibits hidden paywalls, paid subscriptions, or #pricing gates (100% open free access required).'
        });
        break;
      }
    }

    const externalVideoRx = /\b(?:lite-youtube|youtube-nocookie\.com|archive\.org\/embed|data-video-facade)\b/i;
    const localStorageNoticeRx = /\b(?:almacenamiento\s+local|localStorage|datos\s+locales|guardar[aá]n?\s+preferencias\s+locales)\b/i;

    const filesToInspect = educationComponentFiles.length > 0 ? educationComponentFiles : null;
    if (filesToInspect) {
      const videoHostingFiles = filesToInspect.filter((f) => externalVideoRx.test(fs.readFileSync(f, 'utf8')));
      if (videoHostingFiles.length > 0) {
        externalVideoPlayerDetected = true;
        videoLocalStorageNoticeVerified = videoHostingFiles.every((f) =>
          localStorageNoticeRx.test(fs.readFileSync(f, 'utf8'))
        );
      }
    } else if (externalVideoRx.test(educationCorpus)) {
      externalVideoPlayerDetected = true;
      videoLocalStorageNoticeVerified = localStorageNoticeRx.test(educationCorpus);
    }

    if (externalVideoPlayerDetected && !videoLocalStorageNoticeVerified) {
      findings.push({
        type: 'MISSING_VIDEO_LOCAL_STORAGE_NOTICE',
        severity: 'HIGH',
        message: 'External video facade (youtube-nocookie / archive.org) must display a brief local-storage notice beside the player.'
      });
    }
  }

  // 4. Audit Modal Escape Integrity (UXBench PopupNoClose)
  const modalBlocks =
    activeSurfaceText.match(/<div[^>]+class="[^"]*\b(modal-overlay|modal-backdrop|bounty-claim-modal)\b[^"]*"[\s\S]*?<\/div>\s*<\/div>/gi) || [];
  const modalsChecked = modalBlocks.length;
  for (const block of modalBlocks) {
    const hasCloseBtn = /close|cerrar|×|&times;|✕|cancel/i.test(block);
    if (!hasCloseBtn) {
      const idMatch = block.match(/id="([^"]+)"/);
      findings.push({
        type: 'PopupNoClose',
        severity: 'HIGH',
        message: `Modal #${idMatch ? idMatch[1] : 'unknown'} lacks an explicit close trigger.`
      });
    }
  }

  // 5. Audit Mandatory Responsible Gambling & +18 Disclaimers (ONLY for gambling-18plus profile)
  const has18Plus = /\+18|18\+|mayores de 18/i.test(html);
  const hasResponsibleGambling =
    /juego responsable|juega con responsabilidad|responsible gam(bling|ing)|play responsibly|begambleaware|gambleaware|100%\s*free/i.test(html);
  if (isGamblingProfile && (!has18Plus || !hasResponsibleGambling)) {
    findings.push({
      type: 'MISSING_RG_DISCLAIMER',
      severity: 'HIGH',
      message: 'Missing +18 or Responsible Gambling disclaimer in index.html.'
    });
  }

  // 6. Fitts's Law (44x44px Touch Targets on Mobile 375px) & Optical Collision Verification (Fail-Closed)
  const optReportPath = path.join(ROOT, 'tools', 'audit', 'out', 'optical_geometry_report.json');
  let hasOptEvidence = false;
  let fitts44pxVerified = false;
  let zeroCollisionsVerified = false;
  if (fs.existsSync(optReportPath)) {
    try {
      const optGeo = JSON.parse(fs.readFileSync(optReportPath, 'utf8'));
      hasOptEvidence = Boolean(optGeo && typeof optGeo === 'object');
      fitts44pxVerified = optGeo.fitts44pxMobileVerified === true;
      zeroCollisionsVerified = optGeo.zeroClippingOrOverlap === true && optGeo.zeroHorizontalScroll === true;
      if (!fitts44pxVerified) {
        findings.push({
          type: 'FITTS_LAW_TOUCH_TARGET_BELOW_44PX',
          severity: 'HIGH',
          message: 'Interactive button or link has touch target < 44x44px on Mobile 375px viewport (or unverified).'
        });
      }
      if (!zeroCollisionsVerified) {
        findings.push({
          type: 'OPTICAL_GEOMETRY_OVERLAP_OR_OVERFLOW',
          severity: 'HIGH',
          message: 'Detected horizontal scroll overflow, text clipping, or element bounding-box collision across 375px/768px/1440px.'
        });
      }
    } catch (_) {
      hasOptEvidence = false;
    }
  }
  if (!hasOptEvidence) {
    findings.push({
      type: 'MISSING_EVIDENCE',
      severity: 'HIGH',
      message: 'Missing or unreadable optical_geometry_report.json evidence.'
    });
  }

  const score = !hasOptEvidence ? 0 : Math.max(0, 100 - findings.length * 15);
  const passed = hasOptEvidence && findings.length === 0;
  return {
    timestamp: new Date().toISOString(),
    projectId: activeCfg.id,
    complianceProfile: activeCfg.complianceProfile,
    passed,
    score,
    ...(hasOptEvidence ? {} : { reason: 'MISSING_EVIDENCE' }),
    modalsChecked,
    fitts44pxVerified,
    zeroCollisionsVerified,
    externalVideoPlayerDetected,
    videoLocalStorageNoticeVerified,
    has18Plus,
    hasResponsibleGambling,
    findingsCount: findings.length,
    findings
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const report = runCognitiveUxAudit();
  console.log(
    `🧠 [COGNITIVE UX & COMPLIANCE AUDIT] [${report.projectId}] Score: ${report.score}/100 | Profile: ${report.complianceProfile} | Modals Checked: ${report.modalsChecked} | Findings: ${report.findingsCount}`
  );
  if (report.findings.length > 0) {
    for (const f of report.findings) {
      console.log(`  ⚠️ [${f.severity}] ${f.type}: ${f.message}`);
    }
    process.exit(1);
  } else {
    console.log(`  ✅ Zero dark patterns, 100% modal escape & profile compliance (${report.complianceProfile}) verified.`);
  }
}
