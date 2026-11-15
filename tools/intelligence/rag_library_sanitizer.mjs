#!/usr/bin/env node
/**
 * Web Software Factory — Forensic RAG Library Sanitizer & Offline Epistemic Governance
 * =======================================================================================
 * Ensures 100% purity and anti-poisoning security across `knowledge/` (100% offline):
 *   - Unicode `NFKC` normalization + zero-width / bidirectional override stripping
 *   - Spanish & English indirect prompt injection detection/blocking + non-executable data framing
 *   - Astro Content Collections (`astro:content`, `defineCollection`) exemption on `z.object(`
 *   - 100% offline deterministic Epistemic Tier classification (`0` HTTP calls during `--rebuild`)
 *     backed by `.agents/governance/grandfathered_tier1_manifest.json` (path + LF SHA-256) and
 *     verified YAML frontmatter (`TIER_1_SOTA_2026` 1.35x, `TIER_2_VERIFIED_DRAFT` 1.15x,
 *     `TIER_2_TIMELESS_PRINCIPLES` 1.15x, `TIER_UNTRUSTED` 0.75x).
 * =======================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
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
export const GRANDFATHERED_TIER1_MANIFEST_PATH = path.join(
  ROOT,
  '.agents',
  'governance',
  'grandfathered_tier1_manifest.json'
);

/**
 * Mandatory translation warning injected by TIER_3_LEGACY_SYNTAX_GUARD whenever a fragment
 * from a classic book contains superseded code or technologies.
 */
export const TRANSLATION_RULE_WARNING =
  '[TRANSLATION_RULE: Extrae únicamente el principio conceptual/matemático de este libro. Traduce toda implementación técnica al stack SOTA 2026: OKLCH + Utopia clamp() + CSS Subgrid/Scroll-Driven + ESM + Valibot + Cloudflare Zero-Trust]';

/**
 * Normalizes text to Unicode `NFKC` and strips invisible zero-width / bidi override codepoints
 * that attackers use to evade keyword/regex inspection (`i\u200Bgnora`, fullwidth Latin, etc.).
 */
export function normalizeUnicodeNfkc(text = '') {
  return String(text || '')
    .normalize('NFKC')
    .replace(/[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF\u00AD]/g, '');
}

/**
 * Deterministic Spanish & English indirect prompt injection signatures.
 */
export const SPANISH_INJECTION_RULES = Object.freeze([
  {
    id: 'es-en-ignore-prior-instructions',
    description: 'Attempts to ignore, forget, or override previous/system instructions',
    pattern:
      /\b(?:ignora(?:r)?|olvida(?:r)?|omite|omitir|descarta(?:r)?|anula(?:r)?|deja\s+de\s+lado|ignore|disregard|forget)\s+(?:por\s+completo\s+)?(?:(?:todas?|cualquier|all)\s+(?:las?\s+|tus?\s+|previous\s+|prior\s+|earlier\s+)?(?:instrucciones|reglas|directivas|restricciones|ordenes|órdenes|prompts?|instructions|directives|rules)(?:\s+(?:anteriores|previas|del\s+sistema|iniciales|de\s+seguridad))?|(?:las?\s+|tus?\s+|previous\s+|prior\s+)?(?:instrucciones|reglas|directivas|restricciones|ordenes|órdenes|instructions|directives)\s+(?:anteriores|previas|del\s+sistema|iniciales))/gi
  },
  {
    id: 'es-en-system-role-impersonation',
    description: 'System/developer/root role spoofing or fake XML/bracket control tags',
    pattern:
      /(?:<\s*\/?\s*(?:system|instruction|developer|prompt|tool_call|function_call|admin_override)[^>]*>|\[\s*(?:SYSTEM|SISTEMA|DEVELOPER|ADMIN_OVERRIDE|INSTRUCCION_OCULTA)\s*[:\]]|\b(?:ahora\s+(?:sos|eres|act[uú]a\s+como|comportate\s+como|compórtate\s+como)|asume\s+el\s+rol\s+de|you\s+are\s+now)\s+(?:el\s+|un\s+)?(?:sistema|system\s+prompt|administrador|root|modo\s+desarrollador|modo\s+sin\s+restricciones|dan|jailbreak)\b)/gi
  },
  {
    id: 'es-en-secret-exfiltration',
    description: 'Attempts to reveal, print, or exfiltrate secrets, .env, credentials, or system prompt',
    pattern:
      /\b(?:revela(?:r)?|muestra|mostrar|imprime|imprimir|exfiltra(?:r)?|env[ií]a(?:r)?|volca(?:r)?|vuelca|leak|reveal|print|exfiltrate|dump)\s+(?:todas?\s+|todos?\s+|las?\s+|los?\s+|el\s+|all\s+|the\s+)?(?:claves?\s+privadas?|api[\s_-]*keys?|secretos?|variables?\s+de\s+entorno|archivo\s+\.env|\.env\b|\.dev\.vars|credenciales|tokens?\s+de\s+acceso|system\s+prompt|instrucciones\s+internas)/gi
  },
  {
    id: 'es-en-disable-security-guards',
    description: 'Attempts to disable security gates, FinOps caps, or forge CTO approval',
    pattern:
      /\b(?:desactiva(?:r)?|apaga(?:r)?|saltea(?:r)?|bypassea(?:r)?|evade|evadir|falsifica(?:r)?|disable|bypass|turn\s+off)\s+(?:todos?\s+|todas?\s+|los?\s+|las?\s+|el\s+|la\s+|all\s+|the\s+)?(?:guardias?|filtros?|compuertas?|gates?|controles?\s+de\s+seguridad|sanitizador(?:es)?|constitution_guard|approved_by\s*:\s*["']?CTO["']?|escudo\s+finops)/gi
  }
]);

/**
 * Normalizes input via Unicode `NFKC` and detects/neutralizes indirect prompt injection payloads.
 */
export function inspectAndSanitizePromptInjection(rawText = '') {
  const normalizedText = normalizeUnicodeNfkc(rawText);
  let sanitizedText = normalizedText;
  const detectedPatterns = [];

  for (const rule of SPANISH_INJECTION_RULES) {
    const rx = new RegExp(rule.pattern.source, rule.pattern.flags);
    const matches = normalizedText.match(rx);
    if (matches && matches.length > 0) {
      detectedPatterns.push({
        id: rule.id,
        count: matches.length
      });
      sanitizedText = sanitizedText.replace(rx, `[BLOQUEADO_INYECCION_RAG:${rule.id}]`);
    }
  }

  return {
    normalizedText,
    sanitizedText,
    blocked: detectedPatterns.length > 0,
    detectedPatterns
  };
}

/**
 * Wraps retrieved RAG text strictly as delimited, non-executable reference data.
 */
export function delimitRetrievedRagData(fragmentText = '', sourceMeta = {}) {
  const check = inspectAndSanitizePromptInjection(fragmentText);
  const safeSource = normalizeUnicodeNfkc(String(sourceMeta.source || sourceMeta.filePath || 'unknown'))
    .replace(/["<>]/g, '')
    .slice(0, 240);
  const safeTier = normalizeUnicodeNfkc(String(sourceMeta.epistemicTier || 'TIER_UNTRUSTED')).replace(/[^A-Z0-9_]/g, '');
  return {
    delimitedText:
      `<<<DATO_DOCUMENTAL_NO_EJECUTABLE tier="${safeTier}" fuente="${safeSource}">>>\n` +
      `${check.sanitizedText}\n` +
      `<<<FIN_DATO_DOCUMENTAL_NO_EJECUTABLE>>>`,
    sanitizedText: check.sanitizedText,
    injectionBlocked: check.blocked,
    detectedPatterns: check.detectedPatterns
  };
}

/**
 * Detects whether a snippet or file belongs to Astro Content Collections (`astro:content`, `defineCollection`),
 * where `z.object(` is Astro's native build-time content schema API (zero client/Edge bundle overhead).
 */
export function isAstroContentCollectionContext(text = '', filePath = '') {
  const normText = String(text || '');
  const normPath = String(filePath || '').replace(/\\/g, '/');
  return (
    /\b(?:astro:content|astro\/zod|defineCollection)\b/.test(normText) ||
    /(?:^|\/)(?:src\/)?content(?:\.config|\/config)\.[cm]?[jt]sx?$/i.test(normPath)
  );
}

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
    pattern: /(?<!(?:astro:content|astro\/zod|defineCollection)[\s\S]{0,1600})\bz\.object\s*\(|\bfrom\s+['"]zod['"]|\brequire\s*\(\s*['"]zod['"]\s*\)|\b(?:yup|joi)\.object\b/i,
    exemptWhen: (raw, filePath) =>
      isAstroContentCollectionContext(raw, filePath) &&
      !/\bfrom\s+['"]zod['"]|\brequire\s*\(\s*['"]zod['"]\s*\)|\b(?:yup|joi)\.object\b/i.test(String(raw || ''))
  },
  {
    id: 'legacy-http-security-headers',
    legacy_technology: 'Cabeceras X-Frame-Options / X-XSS-Protection',
    superseded_by: "Strict CSP frame-ancestors 'none' + HSTS Preload + COOP",
    pattern: /\b(?:X-XSS-Protection|X-Frame-Options)\b/i
  }
];

function stripQuotes(val = '') {
  return String(val || '').trim().replace(/^(['"])([\s\S]*)\1$/, '$2').trim();
}

/**
 * Pure offline YAML frontmatter parser for RAG epistemic governance (`0` network calls).
 * Parses top-of-file `--- ... ---` ONLY so body text cannot spoof `approved_by: "CTO"`.
 */
export function parseGovernanceFrontmatter(rawText = '') {
  const norm = String(rawText || '').replace(/\r\n/g, '\n');
  const fmMatch = norm.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  if (!fmMatch) {
    return {
      hasFrontmatter: false,
      approvedBy: null,
      approvalStatus: null,
      sources: [],
      hasStructuredVerifiedSources: false,
      hasHttp200VerifiedSources: false
    };
  }

  const yamlBlock = fmMatch[1];
  const lines = yamlBlock.split('\n');
  let approvedBy = null;
  let approvalStatus = null;
  const sources = [];
  let inSources = false;
  let currentSource = null;

  for (const line of lines) {
    if (!line.trim() || /^\s*#/.test(line)) continue;

    if (/^[a-zA-Z0-9_]+\s*:/.test(line)) {
      if (currentSource) {
        sources.push(currentSource);
        currentSource = null;
      }
      const idx = line.indexOf(':');
      const key = line.slice(0, idx).trim();
      const rest = stripQuotes(line.slice(idx + 1));
      inSources = key === 'sources';
      if (key === 'approved_by' && rest) approvedBy = rest;
      if (key === 'approval_status' && rest) approvalStatus = rest;
      continue;
    }

    if (inSources) {
      const itemStart = line.match(/^\s*-\s*(.*)$/);
      if (itemStart) {
        if (currentSource) sources.push(currentSource);
        currentSource = {};
        const firstKv = itemStart[1].match(/^([a-zA-Z0-9_]+)\s*:\s*(.*)$/);
        if (firstKv) {
          currentSource[firstKv[1].trim()] = stripQuotes(firstKv[2]);
        }
        continue;
      }
      if (currentSource) {
        const kv = line.match(/^\s+([a-zA-Z0-9_]+)\s*:\s*(.*)$/);
        if (kv) {
          currentSource[kv[1].trim()] = stripQuotes(kv[2]);
        }
      }
    }
  }
  if (currentSource) sources.push(currentSource);

  const isoDateRx = /^\d{4}-\d{2}-\d{2}/;
  const hasStructuredVerifiedSources =
    sources.length > 0 &&
    sources.every((s) => {
      const urlOk = typeof s.url === 'string' && /^https:\/\//i.test(s.url);
      const dateVal = s.verified_at || s.accessed_at || '';
      const dateOk = isoDateRx.test(dateVal);
      const statusRaw = s.http_status ?? s.verified_http_status;
      const statusOk = statusRaw === undefined || Number(statusRaw) === 200;
      return urlOk && dateOk && statusOk;
    });

  const hasHttp200VerifiedSources =
    hasStructuredVerifiedSources &&
    sources.every((s) => Number(s.http_status ?? s.verified_http_status) === 200);

  return {
    hasFrontmatter: true,
    approvedBy,
    approvalStatus,
    sources,
    hasStructuredVerifiedSources,
    hasHttp200VerifiedSources
  };
}

let cachedGrandfatherManifest = null;
let cachedGrandfatherMtimeMs = -1;
const diskFileMetaCache = new Map();

function loadGrandfatheredManifest(manifestPath = GRANDFATHERED_TIER1_MANIFEST_PATH) {
  const abs = path.resolve(manifestPath);
  if (!fs.existsSync(abs)) {
    return { tier1_files: {}, tier2_files: {} };
  }
  const mtimeMs = fs.statSync(abs).mtimeMs;
  if (cachedGrandfatherManifest && abs === GRANDFATHERED_TIER1_MANIFEST_PATH && cachedGrandfatherMtimeMs === mtimeMs) {
    return cachedGrandfatherManifest;
  }
  try {
    const parsed = JSON.parse(fs.readFileSync(abs, 'utf8'));
    if (abs === GRANDFATHERED_TIER1_MANIFEST_PATH) {
      cachedGrandfatherManifest = parsed;
      cachedGrandfatherMtimeMs = mtimeMs;
    }
    return parsed;
  } catch {
    return { tier1_files: {}, tier2_files: {} };
  }
}

function normalizeRelativeKnowledgePath(filePath = '') {
  const stripped = String(filePath || '')
    .trim()
    .replace(/^local:\/\//i, '')
    .split('#')[0];
  if (!stripped) return '';
  if (path.isAbsolute(stripped)) {
    return path.relative(ROOT, stripped).replace(/\\/g, '/');
  }
  return stripped.replace(/\\/g, '/').replace(/^\.\//, '');
}

function resolveFullRawTextOffline(relPosixPath, providedRawText = '', options = {}) {
  const rawStr = String(providedRawText || '');
  if (options.useProvidedRawTextOnly) {
    return rawStr;
  }
  if (!relPosixPath) return rawStr;
  const absCandidate = path.resolve(ROOT, relPosixPath);
  if (!fs.existsSync(absCandidate)) return rawStr;
  try {
    const st = fs.statSync(absCandidate);
    if (!st.isFile()) return rawStr;
    const cached = diskFileMetaCache.get(absCandidate);
    let diskContent;
    if (cached && cached.mtimeMs === st.mtimeMs) {
      diskContent = cached.content;
    } else {
      diskContent = fs.readFileSync(absCandidate, 'utf8');
      diskFileMetaCache.set(absCandidate, { mtimeMs: st.mtimeMs, content: diskContent });
    }
    if (rawStr.length === 0 || rawStr.startsWith('[Doc: ')) {
      return diskContent;
    }
    // Distinguish a chunk/snippet slice passed by search engines from an intentionally modified full-file buffer
    const normDisk = diskContent.replace(/\r\n/g, '\n');
    const normRaw = rawStr.replace(/\r\n/g, '\n');
    if (normRaw.length < normDisk.length && normDisk.includes(normRaw.slice(0, Math.min(80, normRaw.length)))) {
      return diskContent;
    }
    return rawStr;
  } catch {
    return rawStr;
  }
}

/**
 * 100% Offline Deterministic Epistemic Tier Classifier (`0` HTTP requests during `--rebuild`):
 *   - `TIER_1_SOTA_2026` (`1.35x`):
 *       1) Any document with structured `sources:` (`verified_at` + HTTPS) AND `approved_by: "CTO"`.
 *       2) Pre-existing base factory treatises matching `path + LF SHA-256` in
 *          `.agents/governance/grandfathered_tier1_manifest.json` (`tier1_files`), or `.agents/skills/*`.
 *   - `TIER_2_VERIFIED_DRAFT` (`1.15x`):
 *       Documents with structured HTTP-200 `sources:` (`verified_at`) pending CTO signature
 *       (`approval_status: "PENDING_CTO_REVIEW"`).
 *   - `TIER_2_TIMELESS_PRINCIPLES` (`1.15x`):
 *       Pre-existing curated factory books matching `path + LF SHA-256` in `tier2_files`.
 *   - `TIER_UNTRUSTED` (`0.75x`):
 *       Any uncurated harvested external file, modified grandfathered file without CTO sign-off,
 *       or new/`knowledge/ai_academy/` file lacking verified `sources:`.
 */
export function classifyEpistemicTier(filePath = '', rawText = '', options = {}) {
  const relPath = normalizeRelativeKnowledgePath(filePath);
  const fullText = resolveFullRawTextOffline(relPath, rawText, options);
  const fm = parseGovernanceFrontmatter(fullText);

  if (fm.hasFrontmatter && fm.hasStructuredVerifiedSources && fm.approvedBy === 'CTO') {
    return {
      epistemicTier: 'TIER_1_SOTA_2026',
      authorityBoost: 1.35,
      approvalStatus: 'CTO_APPROVED',
      epistemicRole: 'EL CÓMO TÉCNICO Y PEDAGÓGICO VERIFICADO POR CTO (Fuentes primarias auditadas + firma CTO)'
    };
  }

  if (
    fm.hasFrontmatter &&
    fm.hasHttp200VerifiedSources &&
    fm.approvalStatus === 'PENDING_CTO_REVIEW' &&
    fm.approvedBy !== 'CTO'
  ) {
    return {
      epistemicTier: 'TIER_2_VERIFIED_DRAFT',
      authorityBoost: 1.15,
      approvalStatus: 'PENDING_CTO_REVIEW',
      epistemicRole: 'BORRADOR VERIFICADO HTTP 200 PENDIENTE DE REVISIÓN HITL CTO (x1.15)'
    };
  }

  if (relPath.startsWith('.agents/skills/')) {
    return {
      epistemicTier: 'TIER_1_SOTA_2026',
      authorityBoost: 1.35,
      epistemicRole: 'EL CÓMO TÉCNICO (Skill operativa interna de la Web Software Factory)'
    };
  }

  const isAcademyOrExternalHarvest =
    relPath.startsWith('knowledge/ai_academy/') ||
    relPath.startsWith('knowledge/_inbox_') ||
    relPath.startsWith('references/') ||
    /(?:^|\/)(?:external|harvested|untrusted|scraped)\//i.test(relPath);

  if (!isAcademyOrExternalHarvest && relPath) {
    const manifest = loadGrandfatheredManifest(options.manifestPath || GRANDFATHERED_TIER1_MANIFEST_PATH);
    const lfSha256 = crypto
      .createHash('sha256')
      .update(String(fullText || '').replace(/\r\n/g, '\n'), 'utf8')
      .digest('hex');

    const t1Entry = manifest?.tier1_files?.[relPath];
    if (t1Entry && t1Entry.sha256 === lfSha256) {
      return {
        epistemicTier: 'TIER_1_SOTA_2026',
        authorityBoost: 1.35,
        grandfathered: true,
        epistemicRole: 'EL CÓMO TÉCNICO (Tratado base de la fábrica preservado por SHA-256 inmutable)'
      };
    }

    const t2Entry = manifest?.tier2_files?.[relPath];
    if (t2Entry && t2Entry.sha256 === lfSha256) {
      return {
        epistemicTier: 'TIER_2_TIMELESS_PRINCIPLES',
        authorityBoost: 1.15,
        grandfathered: true,
        epistemicRole: 'EL QUÉ Y EL POR QUÉ (Principios eternos visuales, ergonomía, psicología y arquitectura)'
      };
    }
  }

  return {
    epistemicTier: 'TIER_UNTRUSTED',
    authorityBoost: 0.75,
    approvalStatus: fm.approvalStatus || 'UNCURATED',
    epistemicRole: 'MATERIAL EXTERNO O NUEVO SIN CURAR / SIN FIRMA DE FUENTES (Dato no confiable x0.75)'
  };
}

/**
 * TIER_3_LEGACY_SYNTAX_GUARD:
 * Inspects a retrieved fragment and detects superseded legacy syntax or technologies,
 * exempting `z.object(` when used inside Astro Content Collections (`astro:content`, `defineCollection`).
 */
export function inspectAndGuardLegacyFragment(text = '', epistemicTier = 'TIER_2_TIMELESS_PRINCIPLES', filePath = '') {
  const injectionScan = inspectAndSanitizePromptInjection(text);
  const raw = injectionScan.sanitizedText;
  const matchedReplacements = [];

  for (const rule of LEGACY_TECH_REPLACEMENT_TABLE) {
    if (typeof rule.exemptWhen === 'function' && rule.exemptWhen(raw, filePath)) {
      continue;
    }
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

  const isLegacyTriggered = matchedReplacements.length > 0 || hasExtraLegacyTokens;
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
    injectionBlocked: injectionScan.blocked,
    detectedInjectionPatterns: injectionScan.detectedPatterns,
    guardedText
  };
}

export function sanitizeMarkdownContent(rawText = '', filePath = 'document.md') {
  const fileName = path.basename(String(filePath || 'document.md'));
  const isBook = fileName.startsWith('book_') || /^[a-z0-9_]+\.md$/.test(fileName);

  const injectionClean = inspectAndSanitizePromptInjection(rawText);

  let text = injectionClean.sanitizedText
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
