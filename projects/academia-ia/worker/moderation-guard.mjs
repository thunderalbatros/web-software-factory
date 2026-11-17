/**
 * moderation-guard.mjs — Two-Layer Zero-Cost Edge Moderation Pipeline for Academia Libre
 * =======================================================================================
 * - Layer 1 (0 ms deterministic): Valibot strict payload validation, Default-Deny URL
 *   allowlist, anti-social/messaging evasion blocking, PII/secret redaction checks.
 * - Layer 2 ($0 fixed): Local NFKC toxicity/phishing/prompt-injection classifier +
 *   optional Cloudflare Workers AI (`@cf/meta/llama-guard-3-8b`) when `env.AI` is bound.
 * Zero `node:*` imports (runs identically on Cloudflare Workers & Node.js v24).
 */

import * as v from 'valibot';
import { PATH_IDS } from '../src/lib/curriculum-paths.mjs';

export const COMMUNITY_MIN_XP_TO_POST = 45;
export const FORUM_CATEGORIES = Object.freeze([
  'ideas',
  'proyectos',
  'repositorios',
  'consejos',
  'novedades'
]);
export const REPORT_TARGET_TYPES = Object.freeze(['thread', 'reply', 'chat_message']);

export const ALLOWED_REPO_HOSTS = new Set([
  'github.com',
  'gitlab.com',
  'huggingface.co',
  'codepen.io',
  'stackblitz.com'
]);

const INTERNAL_ALLOWED_PREFIXES = [
  '/',
  '/niveles/principiante/',
  '/niveles/intermedio/',
  '/niveles/avanzado/',
  '/comunidad/',
  '/novedades/',
  '/perfil/',
  '/verificar/'
];

export const ForumThreadCreateSchema = v.strictObject({
  level: v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(3)),
  category: v.picklist(FORUM_CATEGORIES),
  pathId: v.optional(v.picklist(PATH_IDS)),
  lessonSlug: v.optional(v.pipe(v.string(), v.trim(), v.maxLength(80))),
  title: v.pipe(v.string(), v.trim(), v.minLength(6), v.maxLength(140)),
  bodyMd: v.pipe(v.string(), v.trim(), v.minLength(12), v.maxLength(2400)),
  attachedRepoUrl: v.optional(v.pipe(v.string(), v.trim(), v.maxLength(220)))
});

export const ForumReplyCreateSchema = v.strictObject({
  bodyMd: v.pipe(v.string(), v.trim(), v.minLength(4), v.maxLength(1600))
});

export const ChatMessageCreateSchema = v.strictObject({
  bodyText: v.pipe(v.string(), v.trim(), v.minLength(2), v.maxLength(600)),
  attachedUrl: v.optional(v.pipe(v.string(), v.trim(), v.maxLength(220)))
});

export const CommunityReportCreateSchema = v.strictObject({
  targetType: v.picklist(REPORT_TARGET_TYPES),
  targetId: v.pipe(v.string(), v.trim(), v.regex(/^[a-zA-Z0-9-]{8,64}$/)),
  reason: v.pipe(v.string(), v.trim(), v.minLength(4), v.maxLength(280))
});

const INVISIBLE_CHARS_RX = /[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g;

export function normalizeModerationText(raw = '') {
  return String(raw || '')
    .normalize('NFKC')
    .replace(INVISIBLE_CHARS_RX, '')
    .trim();
}

function foldForClassifier(raw = '') {
  return normalizeModerationText(raw)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

const PRO_SOCIAL_HOSTS = new Set([
  'linkedin.com',
  'www.linkedin.com',
  'lnkd.in',
  'x.com',
  'www.x.com',
  'twitter.com',
  'www.twitter.com'
]);

const PRO_SOCIAL_MESSAGE_ES =
  'Las redes profesionales (LinkedIn y X) solo se muestran como insignias verificadas desde /perfil/. En mensajes solo se aceptan repositorios y demos de código.';

const BLOCKED_PRO_SOCIAL_DOMAIN_RX =
  /(?:^|[^a-z0-9])(?:(?:www|m|mobile|l)\s*\.\s*)?(?:linkedin\s*\.\s*com|lnkd\s*\.\s*in|x\s*\.\s*com|twitter\s*\.\s*com)(?:$|[^a-z0-9])/i;

const BLOCKED_PRO_SOCIAL_EVASION_RX =
  /(?:\b(?:linkedin|twitter)\s*[:=]\s*@?[a-z0-9_.-]{2,}|\bx\s*[:=]\s*@[a-z0-9_]{1,15}\b|\b(?:mi|nuestro|su)\s+(?:(?:perfil|cuenta|usuario)\s+(?:de|en)\s+)?(?:linkedin|twitter|x)\b|\b(?:escribe|escribime|escribeme|mandame|pasa|pasame|agregame|buscame|seguime|sigueme|encuentrame|encontrame|contacto)\b[^.\n]{0,36}\b(?:linkedin|twitter|en\s+x)\b|\ben\s+(?:linkedin|twitter|x)\s+@[a-z0-9_.]{2,})/i;

const BLOCKED_SOCIAL_DOMAIN_RX =
  /(?:^|[^a-z0-9])(?:(?:www|m|l)\s*\.\s*)?(?:instagram\s*\.\s*com|instagr\s*\.\s*am|facebook\s*\.\s*com|fb\s*\.\s*com|tiktok\s*\.\s*com|wa\s*\.\s*me|whatsapp\s*\.\s*com|t\s*\.\s*me|discord\s*\.\s*gg|discord\s*\.\s*com)(?:$|[^a-z0-9])/i;

const BLOCKED_EVASION_MENTION_RX =
  /(?:\b(?:ig|insta|instagram|wsp|whatsapp|telegram|discord|tiktok|fb|facebook)\s*[:=]\s*@?[a-z0-9_.-]{2,}|\b(?:mi|nuestro|escribe|escribime|escribeme|mandame|pasa|pasame|agregame|buscame|seguime|sigueme|contacto)\b[^.\n]{0,36}\b(?:ig|insta|instagram|wsp|whatsapp|telegram|discord|tiktok|facebook)\b|\b(?:instagram|whatsapp|telegram|discord)\s+es\s+@?[a-z0-9_.-]{2,}|\big\s+@[a-z0-9_.]{2,})/i;

const BLOCKED_SHORTENER_RX =
  /(?:^|[^a-z0-9])(?:bit\s*\.\s*ly|t\s*\.\s*co|tinyurl\s*\.\s*com|cutt\s*\.\s*ly|is\s*\.\s*gd)(?:$|[^a-z0-9])/i;

const BLOCKED_EMAIL_RX =
  /(?:\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b|\b[A-Za-z0-9._%+-]+\s*(?:\(at\)|\[at\]|\barroba\b)\s*[A-Za-z0-9.-]+\s*(?:\.|dot|punto)\s*[A-Za-z]{2,}\b)/i;

const BLOCKED_SECRET_RX =
  /(?:\bsk-[A-Za-z0-9_-]{8,}\b|\bAIza[0-9A-Za-z_-]{12,}\b|\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9_]{12,}\b|\bgithub_pat_[A-Za-z0-9_]{12,}\b|\b(?:postgres|postgresql|mongodb(?:\+srv)?|mysql|redis):\/\/[^\s]+|-----BEGIN\s+(?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----)/i;

const BLOCKED_PHONE_RX =
  /(?:\+\d{1,3}[\s.-]?(?:\(?\d{1,4}\)?[\s.-]?){1,2}\d{3,4}[\s.-]?\d{3,4}\b|\(?\b0?\d{2,4}\)?[\s.-]\d{3,4}[\s.-]\d{4}\b|\b(?:tel|telefono|teléfono|cel|celular|numero|número|llamar|llamame)\b[^0-9\n]{0,16}\+?\d[\d\s.-]{7,16}\d\b)/i;

function isAllowedInternalPath(pathname = '') {
  const clean = String(pathname || '').split('?')[0].split('#')[0];
  if (clean === '/') return true;
  return INTERNAL_ALLOWED_PREFIXES.some(
    (prefix) => prefix !== '/' && (clean === prefix || clean === prefix.slice(0, -1))
  );
}

/**
 * Validates a single explicit URL or internal path under the strict Default-Deny policy.
 */
export function validateCommunityUrl(rawUrl, options = {}) {
  const raw = normalizeModerationText(rawUrl).replace(/[),.;:!?]+$/, '');
  if (!raw) return { valid: true, normalizedUrl: null };
  const requireRepoHost = Boolean(options.requireRepoHost);
  const siteOrigin = options.siteOrigin || 'https://academia-ia.pages.dev';

  if (raw.startsWith('/') && !raw.startsWith('//')) {
    if (requireRepoHost || !isAllowedInternalPath(raw)) {
      return { valid: false, reasonCode: 'URL_NOT_IN_ALLOWLIST' };
    }
    return { valid: true, normalizedUrl: raw };
  }

  let parsed;
  try {
    parsed = new URL(raw);
  } catch {
    return { valid: false, reasonCode: 'URL_NOT_IN_ALLOWLIST' };
  }

  if (parsed.protocol === 'http:') {
    return { valid: false, reasonCode: 'URL_HTTPS_REQUIRED' };
  }
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password) {
    return { valid: false, reasonCode: 'URL_NOT_IN_ALLOWLIST' };
  }

  const host = parsed.hostname.toLowerCase();

  if (PRO_SOCIAL_HOSTS.has(host)) {
    return {
      valid: false,
      reasonCode: 'BLOCKED_SOCIAL_IN_MESSAGE_USE_PROFILE_BADGE',
      messageEs: PRO_SOCIAL_MESSAGE_ES
    };
  }

  if (ALLOWED_REPO_HOSTS.has(host)) {
    if (!parsed.pathname || parsed.pathname === '/') {
      return { valid: false, reasonCode: 'URL_NOT_IN_ALLOWLIST' };
    }
    return { valid: true, normalizedUrl: parsed.href };
  }

  if (requireRepoHost) {
    return { valid: false, reasonCode: 'ATTACHED_REPO_URL_NOT_ALLOWED' };
  }

  if (parsed.origin === siteOrigin && isAllowedInternalPath(parsed.pathname)) {
    return { valid: true, normalizedUrl: parsed.href };
  }

  return { valid: false, reasonCode: 'URL_NOT_IN_ALLOWLIST' };
}

const BARE_EXTERNAL_DOMAIN_RX =
  /\b(?:[a-z0-9-]+\.)+(?:com|org|net|io|dev|ai|ly|me|gg|co|tv|xyz|app|site|info|biz|club|top|online|ru|cn|ar|es|mx)(?:\/[^\s]*)?/gi;

const ALLOWED_BARE_HOSTS = new Set([
  'github.com',
  'gitlab.com',
  'huggingface.co',
  'codepen.io',
  'stackblitz.com',
  'academia-ia.pages.dev',
  'youtube-nocookie.com',
  'archive.org'
]);

/**
 * Layer 1 (0 ms deterministic) check over normalized strings and attached URLs.
 */
export function inspectDeterministicLayer1({
  textFields = [],
  attachedUrl = '',
  requireRepoHost = false,
  siteOrigin = 'https://academia-ia.pages.dev'
} = {}) {
  const normalizedTexts = textFields.map((t) => normalizeModerationText(t)).filter(Boolean);
  const combined = normalizedTexts.join('\n');
  const combinedWithUrl = attachedUrl ? `${combined}\n${normalizeModerationText(attachedUrl)}` : combined;
  const foldedCombined = foldForClassifier(combinedWithUrl);

  if (BLOCKED_SECRET_RX.test(combinedWithUrl)) {
    return { allowed: false, reasonCode: 'BLOCKED_SECRET_OR_TOKEN', layer: 'layer1_deterministic' };
  }
  if (BLOCKED_EMAIL_RX.test(combinedWithUrl)) {
    return { allowed: false, reasonCode: 'BLOCKED_PII_EMAIL', layer: 'layer1_deterministic' };
  }
  if (BLOCKED_SHORTENER_RX.test(combinedWithUrl)) {
    return { allowed: false, reasonCode: 'BLOCKED_URL_SHORTENER', layer: 'layer1_deterministic' };
  }
  if (BLOCKED_PRO_SOCIAL_DOMAIN_RX.test(combinedWithUrl) || BLOCKED_PRO_SOCIAL_EVASION_RX.test(foldedCombined)) {
    return {
      allowed: false,
      reasonCode: 'BLOCKED_SOCIAL_IN_MESSAGE_USE_PROFILE_BADGE',
      messageEs: PRO_SOCIAL_MESSAGE_ES,
      layer: 'layer1_deterministic'
    };
  }
  if (BLOCKED_SOCIAL_DOMAIN_RX.test(combinedWithUrl) || BLOCKED_EVASION_MENTION_RX.test(combinedWithUrl)) {
    return { allowed: false, reasonCode: 'BLOCKED_SOCIAL_OR_MESSAGING', layer: 'layer1_deterministic' };
  }

  if (attachedUrl) {
    const urlCheck = validateCommunityUrl(attachedUrl, { requireRepoHost, siteOrigin });
    if (!urlCheck.valid) {
      return {
        allowed: false,
        reasonCode: urlCheck.reasonCode,
        ...(urlCheck.messageEs ? { messageEs: urlCheck.messageEs } : {}),
        layer: 'layer1_deterministic'
      };
    }
  }

  let textWithoutAllowedUrls = combined;
  const httpMatches = combined.match(/https?:\/\/[^\s<>"'`]+/gi) || [];
  for (const rawLink of httpMatches) {
    const check = validateCommunityUrl(rawLink, { requireRepoHost: false, siteOrigin });
    if (!check.valid) {
      return {
        allowed: false,
        reasonCode: check.reasonCode,
        ...(check.messageEs ? { messageEs: check.messageEs } : {}),
        layer: 'layer1_deterministic'
      };
    }
    textWithoutAllowedUrls = textWithoutAllowedUrls.replace(rawLink, ' ');
  }

  const bareMatches = textWithoutAllowedUrls.match(BARE_EXTERNAL_DOMAIN_RX) || [];
  for (const bare of bareMatches) {
    const hostOnly = bare.split('/')[0].toLowerCase();
    if (!ALLOWED_BARE_HOSTS.has(hostOnly)) {
      return { allowed: false, reasonCode: 'URL_NOT_IN_ALLOWLIST', layer: 'layer1_deterministic' };
    }
    if (bare.includes('/')) {
      const check = validateCommunityUrl(`https://${bare}`, { requireRepoHost: false, siteOrigin });
      if (!check.valid) {
        return { allowed: false, reasonCode: check.reasonCode, layer: 'layer1_deterministic' };
      }
    }
  }

  if (BLOCKED_PHONE_RX.test(textWithoutAllowedUrls)) {
    return { allowed: false, reasonCode: 'BLOCKED_PII_PHONE', layer: 'layer1_deterministic' };
  }

  const normalizedAttachedUrl = attachedUrl
    ? validateCommunityUrl(attachedUrl, { requireRepoHost, siteOrigin }).normalizedUrl
    : null;

  return {
    allowed: true,
    normalizedAttachedUrl,
    combinedText: combinedWithUrl
  };
}

const TOXIC_HARASSMENT_RX =
  /\b(?:idiota|imbecil|estupido|tarado|pelotudo|boludo|inutil de mierda|basura humana|hijo de puta|te voy a matar|matate|suicidate|muerte a|escoria)\b/i;

const PHISHING_OR_SCAM_RX =
  /(?:\b(?:envia|manda|comparte|pasame|ingresa|introduce)\s+(?:tu|la)\s+(?:contrasena|password|clave bancaria|tarjeta|seed phrase|frase semilla)\b|\b(?:duplica|triplica)\s+(?:tu|tus)\s+(?:cripto|bitcoin|btc|usdt|eth|dinero)\b|\b(?:gana|ganar)\s+dinero\s+facil\s+garantizado\b|\b(?:reclama|reclamar)\s+(?:tu\s+)?(?:premio|airdrop|bono)\s+(?:urgente|gratis)\b|\bseed\s+phrase\b|\bfrase\s+semilla\b)/i;

const PROMPT_INJECTION_RX =
  /(?:\bignore\s+(?:all\s+)?previous\s+instructions\b|\bignora\s+(?:todas?\s+las?\s+)?instrucciones\s+anteriores\b|\bolvida\s+tus\s+instrucciones\b|\breveal\s+(?:your\s+)?system\s+prompt\b|\bjailbreak\b)/i;

/**
 * Layer 2A: Deterministic zero-cost NFKC local safety classifier.
 */
export function inspectLocalNfkcSafetyClassifier(combinedText = '') {
  const folded = foldForClassifier(combinedText);
  if (TOXIC_HARASSMENT_RX.test(folded)) {
    return { allowed: false, reasonCode: 'TOXIC_HARASSMENT', layer: 'layer2_local_nfkc' };
  }
  if (PHISHING_OR_SCAM_RX.test(folded)) {
    return { allowed: false, reasonCode: 'PHISHING_OR_SCAM', layer: 'layer2_local_nfkc' };
  }
  if (PROMPT_INJECTION_RX.test(folded)) {
    return { allowed: false, reasonCode: 'PROMPT_INJECTION', layer: 'layer2_local_nfkc' };
  }
  return { allowed: true };
}

/**
 * Full Cascaded Moderation (Layer 1 deterministic -> Layer 2 NFKC + optional env.AI Llama Guard 3 8B).
 */
export async function evaluateModerationCascade({
  textFields = [],
  attachedUrl = '',
  requireRepoHost = false,
  siteOrigin = 'https://academia-ia.pages.dev',
  env = {}
} = {}) {
  const layer1 = inspectDeterministicLayer1({
    textFields,
    attachedUrl,
    requireRepoHost,
    siteOrigin
  });
  if (!layer1.allowed) {
    return {
      allowed: false,
      status: 422,
      error: 'MODERATION_BLOCKED',
      reasonCode: layer1.reasonCode,
      ...(layer1.messageEs ? { messageEs: layer1.messageEs } : {}),
      layer: layer1.layer
    };
  }

  const localSafety = inspectLocalNfkcSafetyClassifier(layer1.combinedText);
  if (!localSafety.allowed) {
    return {
      allowed: false,
      status: 422,
      error: 'MODERATION_BLOCKED',
      reasonCode: localSafety.reasonCode,
      layer: localSafety.layer
    };
  }

  if (env && env.AI && typeof env.AI.run === 'function') {
    try {
      const aiRes = await env.AI.run('@cf/meta/llama-guard-3-8b', {
        messages: [{ role: 'user', content: layer1.combinedText.slice(0, 4000) }]
      });
      const rawOut = String(
        aiRes?.response ?? aiRes?.result ?? (typeof aiRes === 'string' ? aiRes : '')
      ).trim();
      if (/^\s*unsafe\b/i.test(rawOut)) {
        return {
          allowed: false,
          status: 422,
          error: 'MODERATION_BLOCKED',
          reasonCode: 'AI_LLAMA_GUARD_UNSAFE',
          layer: 'layer2_workers_ai'
        };
      }
    } catch {
      /* If Workers AI inference fails transiently, local deterministic NFKC guard remains enforced. */
    }
  }

  return {
    allowed: true,
    normalizedAttachedUrl: layer1.normalizedAttachedUrl
  };
}
