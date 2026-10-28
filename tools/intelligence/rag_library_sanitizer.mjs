#!/usr/bin/env node
/**
 * Web Software Factory — Forensic RAG Library Sanitizer
 * =======================================================================================
 * Ensures 100% purity across `knowledge/`:
 *   - Strips `-- N of M --` page markers and ASCII control chars (\u0000-\u001F)
 *   - Prunes Frontmatter copyright/publisher-ad sections and Backmatter index dumps
 *   - Eliminates cross-project contamination (Yendo Mobile, Centinela, React Native,
 *     Android APK, Frida, Metasploit, Flutter, and streamer/casino brands).
 * =======================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  isFrontOrBackMatterNoise,
  stripLeadingFrontmatterParagraphs,
  computeSectionTechnicalEntropy
} from './book_pdf_ingester.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');
const KNOWLEDGE_DIR = path.join(ROOT, 'knowledge');

/**
 * Mandatory translation warning injected by TIER_3_LEGACY_SYNTAX_GUARD whenever a fragment
 * from a classic book contains superseded code or technologies.
 */
export const TRANSLATION_RULE_WARNING =
  '[TRANSLATION_RULE: Extrae únicamente el principio conceptual/matemático de este libro. Traduce toda implementación técnica al stack SOTA 2026: OKLCH + Utopia clamp() + CSS Subgrid/Scroll-Driven + ESM + Valibot + Cloudflare Zero-Trust]';

/**
 * Deterministic Technology Replacement Dictionary (synchronized with .agents/memory/temporal_ledger.json)
 */
export const LEGACY_TECH_REPLACEMENT_TABLE = [
  {
    id: 'legacy-color-hex-rgb-hsl',
    legacy_technology: 'HEX / RGB / HSL',
    superseded_by: 'OKLCH perceptual color space (W3C DTCG 2025.10)',
    pattern: /(?:color|background|border|fill|stroke)\s*:\s*#[0-9a-fA-F]{3,8}\b|#[0-9a-fA-F]{6}\b|\b(?:rgb|rgba|hsl|hsla)\s*\(\s*\d+/i
  },
  {
    id: 'legacy-typography-px-media-queries',
    legacy_technology: 'px fijos en tipografía / media queries escalonadas',
    superseded_by: 'Utopia fluid clamp() + @container queries',
    pattern: /\bfont-size\s*:\s*\d+(?:\.\d+)?px\b|@media\s*\(\s*(?:min|max)-width\s*:\s*\d+px\s*\)/i
  },
  {
    id: 'legacy-scroll-listeners-heavy-gsap',
    legacy_technology: 'JS scroll listeners / GSAP pesado para reveals',
    superseded_by: 'CSS animation-timeline: view()/scroll() + @starting-style (60FPS GPU)',
    pattern: /addEventListener\s*\(\s*['"]scroll['"]|\bonscroll\s*=|\b(?:gsap\.(?:to|from|fromTo|timeline)|ScrollTrigger|TweenMax|TimelineMax)\b/i
  },
  {
    id: 'legacy-jquery-unsafe-innerhtml',
    legacy_technology: 'jQuery / DOM manual inseguro (.innerHTML)',
    superseded_by: 'Vanilla ESM + DOMPurify / window.escapeHTML + Preact Signals / Astro Islands',
    pattern: /\bjQuery\b|\$\(\s*['"#.a-zA-Z]|\.innerHTML\s*=|\brequire\s*\(\s*['"][^'"]+['"]\s*\)|\bReact\.Component\b|\bfloat\s*:\s*(?:left|right)\b|(?:^|[\s;({])var\s+[a-zA-Z_$][a-zA-Z0-9_$]*\s*=/m
  },
  {
    id: 'legacy-heavy-or-schemaless-validation',
    legacy_technology: 'Validación pesada o sin esquema',
    superseded_by: 'Valibot (<1KB) + HTML5 Constraint Validation',
    pattern: /\bz\.object\s*\(|\bfrom\s+['"]zod['"]|\brequire\s*\(\s*['"]zod['"]\s*\)|\b(?:yup|joi)\.object\b/i
  },
  {
    id: 'legacy-http-security-headers',
    legacy_technology: 'Cabeceras X-Frame-Options / X-XSS-Protection',
    superseded_by: "Strict CSP frame-ancestors 'none' + HSTS Preload + COOP",
    pattern: /\b(?:X-XSS-Protection|X-Frame-Options)\b/i
  }
];

/**
 * Classifies any knowledge document into the 3-Tier Epistemic Governance Hierarchy:
 *   - TIER_1_SOTA_2026 (authorityBoost: 1.35):
 *       CANON_*_2026.md, SOTA_*_2026.md, and 2026 technical specifications of Astro 5,
 *       Cloudflare Workers, W3C DTCG 2025.10, OKLCH, Valibot, Oxc, and OWASP ASVS v5.0.
 *   - TIER_2_TIMELESS_PRINCIPLES (authorityBoost: 1.15):
 *       Complete books (book_*.md, LIBRARY_INGEST_*, CANON_BOOK_*, and foundational
 *       treatises/books on UX/UI, Psychology, Typography, Grids, Copywriting,
 *       Clean Architecture, and Conceptual Cryptography/Security).
 */
export function classifyEpistemicTier(filePath = '', rawText = '') {
  const normPath = String(filePath || '').replace(/\\/g, '/');
  const baseName = path.basename(normPath, path.extname(normPath));
  const lowerBase = baseName.toLowerCase();

  const isExplicitBookOrLibraryIngest =
    lowerBase.startsWith('book_') ||
    lowerBase.startsWith('library_ingest_') ||
    lowerBase.startsWith('canon_book_') ||
    /^(?:creating_web_animations|designing_data_intensive_applications|clean_architecture|laws_of_ux|nudge_thaler|refactoring_ui|database_internals|release_it|dont_make_me_think|hooked_|predictably_irrational)/i.test(lowerBase);

  if (isExplicitBookOrLibraryIngest) {
    return {
      epistemicTier: 'TIER_2_TIMELESS_PRINCIPLES',
      authorityBoost: 1.15,
      epistemicRole: 'EL QUÉ Y EL POR QUÉ (Principios eternos visuales, ergonomía, psicología, modelos de amenaza y patrones de diseño)'
    };
  }

  const isExplicitSota2026File =
    /^(?:CANON_.*_2026|SOTA_.*_2026|DESIGN_MASTERY_2026|AGENT_CREATIVE_AND_VISUAL_AWARENESS_2026|CURATED_MASTER_BOOKS.*_2026|BENCHMARK_.*_2026|SCORING_.*_2026|TREATISE_.*_2026|COMPENDIO_.*_2026|TRATADO_.*_2026)/i.test(baseName) ||
    normPath.startsWith('.agents/skills/') ||
    /^(?:CANON_ASTRO5_|CANON_MULTI_BRAND_DESIGN_SYSTEMS_DTCG_|CANON_CLOUDFLARE_D1_WORKERS_|CANON_CYBERSECURITY_DEVSECOPS_2026|CANON_WEB_SOFTWARE_FACTORY_MCP_DTCG_|CANON_TYPESCRIPT_RAUSCHMAYER_ZOD_VALIBOT_|CANON_50_REPOS_AGENTIC_|CANON_SOTA_AGENT_TEAM_TOPOLOGY_|CANON_EVERY_LAYOUT_CSS_ALGORITHMS|CANON_EMIL_KOWALSKI_ANIMATIONS_ON_THE_WEB|CYBERSECURITY_MASTER_PROTOCOL|ANTI_BOT_STEALTH_GUIDE)/i.test(baseName);

  const sample = String(rawText || '').slice(0, 3000);
  const hasSota2026SpecMarkers =
    /\b(?:Astro\s*5|W3C\s+DTCG\s+2025\.10|OKLCH|Valibot|oxlint|Oxc|OWASP\s+ASVS\s+v5\.0|Cloudflare\s+Workers\s+Static\s+Assets|animation-timeline:\s*view\(\))\b/i.test(sample);

  if (isExplicitSota2026File || (hasSota2026SpecMarkers && baseName.startsWith('CANON_'))) {
    return {
      epistemicTier: 'TIER_1_SOTA_2026',
      authorityBoost: 1.35,
      epistemicRole: 'EL CÓMO TÉCNICO (Autoridad absoluta en sintaxis, APIs, configuración, librerías y código SOTA 2026)'
    };
  }

  return {
    epistemicTier: 'TIER_2_TIMELESS_PRINCIPLES',
    authorityBoost: 1.15,
    epistemicRole: 'EL QUÉ Y EL POR QUÉ (Principios eternos visuales, ergonomía, psicología, modelos de amenaza y patrones de diseño)'
  };
}

/**
 * TIER_3_LEGACY_SYNTAX_GUARD:
 * Inspects a retrieved fragment and detects superseded legacy syntax or technologies
 * (#hex/rgb(), float, var, CommonJS require(), jQuery, React.Component, heavy zod in Edge,
 * fixed px typography, scroll listeners, or X-XSS-Protection / X-Frame-Options).
 * When triggered on a classic book or legacy snippet, injects TRANSLATION_RULE_WARNING.
 */
export function inspectAndGuardLegacyFragment(text = '', epistemicTier = 'TIER_2_TIMELESS_PRINCIPLES', filePath = '') {
  const raw = String(text || '');
  const matchedReplacements = [];

  for (const rule of LEGACY_TECH_REPLACEMENT_TABLE) {
    if (rule.pattern.test(raw)) {
      matchedReplacements.push({
        id: rule.id,
        legacy_technology: rule.legacy_technology,
        superseded_by: rule.superseded_by
      });
    }
  }

  const hasExtraLegacyTokens =
    /\b(?:float\s*:\s*(?:left|right)|React\.Component|componentDidMount|require\s*\(\s*['"]|jQuery|\.innerHTML\b|X-XSS-Protection|X-Frame-Options)\b/.test(raw) ||
    /(?:^|[\s;({])var\s+[a-zA-Z_$][a-zA-Z0-9_$]*\s*=/.test(raw);

  const isLegacyTriggered =
    matchedReplacements.length > 0 || hasExtraLegacyTokens;

  // Trigger TIER_3_LEGACY_SYNTAX_GUARD on TIER_2 classic books whenever legacy syntax appears,
  // or on any chunk that contains legacy syntax patterns.
  const guardActive =
    isLegacyTriggered &&
    (epistemicTier === 'TIER_2_TIMELESS_PRINCIPLES' || matchedReplacements.length > 0);

  let guardedText = raw;
  if (guardActive && !guardedText.includes('[TRANSLATION_RULE:')) {
    guardedText = `${TRANSLATION_RULE_WARNING}\n${guardedText}`;
  }

  return {
    legacySyntaxGuard: guardActive ? 'TIER_3_LEGACY_SYNTAX_GUARD' : null,
    translationRuleActive: guardActive,
    translationRule: guardActive ? TRANSLATION_RULE_WARNING : null,
    supersededReplacements: matchedReplacements,
    guardedText
  };
}

export function sanitizeMarkdownContent(rawText = '', filePath = 'document.md') {
  const fileName = path.basename(String(filePath || 'document.md'));
  const isBook = fileName.startsWith('book_') || /^[a-z0-9_]+\.md$/.test(fileName);

  let text = rawText
    .replace(/\r\n/g, '\n')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, ' ')
    .replace(/\n?\s*--\s*\d+\s+of\s+\d+\s*--\s*\n?/gi, '\n')
    .replace(/\uFB00/g, 'ff')
    .replace(/\uFB01/g, 'fi')
    .replace(/\uFB02/g, 'fl')
    .replace(/\uFB03/g, 'ffi')
    .replace(/\uFB04/g, 'ffl')
    .replace(/\bMo\s+delling\b/g, 'Modelling')
    .replace(/\bmo\s+del(s|ling)?\b/g, 'model$1')
    .replace(/\bKl\s*upp\s*elb\s*erg\b/gi, 'Kluppelberg')
    .replace(/this page intentionally left blank\.?/gi, '');

  text = text
    .replace(/\(Fuente migrada y curada desde (?:Yendo Mobile|Centinela Studio) Vault[^)]*\)/gi, '')
    .replace(/\bYendo\s+Mobile\b/gi, 'la Web Software Factory')
    .replace(/\byendo_mobile\b/gi, 'web_software_factory')
    .replace(/\byendo_obsidian_vault\b/gi, 'canonical_knowledge_vault')
    .replace(/\bcentinela_knowledge\b/gi, 'canonical_knowledge_vault')
    .replace(/\bCentinela\s+Studio\b/gi, 'la Web Software Factory')
    .replace(/\bProyecto\s+Centinela\b/gi, 'la Web Software Factory')
    .replace(/\bCentinela\b/gi, 'WebFactory')
    .replace(/\bYendo\b/g, 'WebFactory')
    .replace(/\byendo\b/gi, 'webfactory')
    .replace(/\bReact\s*[\u00A0\u202F\s]*Native\b/gi, 'Modern Web UI (CSS/WAAPI)')
    .replace(/\bReactNative\b/gi, 'ModernWebUI')
    .replace(/\bFlutter\b/gi, 'Modern Web Components')
    .replace(/\bAndroid\s+APK\b/gi, 'Web Bundle')
    .replace(/\bAPK(s)?\b/g, 'Web Bundle$1')
    .replace(/\bAndroid\b/gi, 'Web Platform')
    .replace(/\bMetasploit\b/gi, 'OWASP ZAP')
    .replace(/\bMobile\s+Application\s+Hacker(?:'s|_s)?\s+Handbook\b/gi, 'Web Application Security Standard (OWASP ASVS)')
    .replace(/\bFrida\b/gi, 'Playwright CDP')
    .replace(/\bBuchanan\s*(?:&|and|y)?\s*Tullock\b/gi, 'Mechanism Design')
    .replace(/\bBuchanan\b/gi, 'Nash')
    .replace(/\bTullock\b/gi, 'Hurwicz')
    .replace(/\bRainbet\b/gi, 'External Platform')
    .replace(/\bDiggityBets\b/gi, 'Enterprise Web App')
    .replace(/\bdiggitybets\.vip\b/gi, 'app.example.com')
    .replace(/\bHuntHub\b/gi, 'Web Software Factory')
    .replace(/los contratos de API de Kick ni /gi, '');

  if (isBook && text.includes('## Sección ')) {
    const parts = text.split(/\n---\n+\s*(?=## Sección )/);
    if (parts.length > 2) {
      const headerBlock = parts[0];
      const sectionBlocks = parts.slice(1);
      const keptSections = [];

      for (let i = 0; i < sectionBlocks.length; i++) {
        const block = sectionBlocks[i];
        const m = block.match(/^## Sección \d+:\s*([^\n]+)\n+([\s\S]*)$/);
        if (!m) {
          keptSections.push(block);
          continue;
        }
        const heading = m[1].replace(/\s*\[Entropy:[^\]]+\]/, '').trim();
        let body = m[2].trim();

        if (isFrontOrBackMatterNoise(body, heading, i, sectionBlocks.length)) {
          continue;
        }
        if (i <= 2) {
          body = stripLeadingFrontmatterParagraphs(body);
        }
        if (body.length < 80) continue;
        const entropy = computeSectionTechnicalEntropy(body);
        keptSections.push({ heading, body, entropy });
      }

      if (keptSections.length > 0 && typeof keptSections[0] === 'object') {
        const rebuilt = keptSections.map((s, idx) =>
          `## Sección ${idx + 1}: ${s.heading} [Entropy: ${s.entropy}]\n\n${s.body}\n`
        );
        text = `${headerBlock.trim()}\n\n---\n\n${rebuilt.join('\n---\n\n')}`;
      }
    }
  }

  return text.replace(/\n{3,}/g, '\n\n').trim() + '\n';
}
