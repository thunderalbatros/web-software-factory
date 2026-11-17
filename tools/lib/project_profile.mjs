/**
 * tools/lib/project_profile.mjs — Deterministic project & domain capability resolver.
 * Reads `data/academy/project_charter.json` (Academia IA master charter),
 * `projects/<slug>/factory.project.json`, and declarative `tools/profiles/*.profile.json`
 * validated with Valibot so core modules consult immutable capabilities (`commerce`, `media`,
 * `runtime`, `content`, `compliance`, `rag.allowedDomains`) instead of ad-hoc `if (education)`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as v from 'valibot';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const FACTORY_ROOT = path.resolve(__dirname, '..', '..');
export const PROFILES_DIR = path.join(FACTORY_ROOT, 'tools', 'profiles');
export const ACADEMY_CHARTER_PATH = path.join(FACTORY_ROOT, 'data', 'academy', 'project_charter.json');
export const DEFAULT_COMPLIANCE_PROFILE = 'standard-web';
export const KNOWN_COMPLIANCE_PROFILES = Object.freeze(['standard-web', 'gambling-18plus', 'education']);
export const KNOWN_DOMAIN_PROFILES = Object.freeze(['saas-b2b', 'marketing', 'gambling-18plus', 'education']);

const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,63}$/;
const HTTPS_ORIGIN = v.pipe(
  v.string(),
  v.check((s) => {
    try {
      const u = new URL(s);
      return u.protocol === 'https:' && u.origin === s;
    } catch {
      return false;
    }
  }, 'ORIGIN_MUST_BE_BARE_HTTPS_ORIGIN')
);

const LicensePolicySchema = v.object({
  direct_adapt_allowed: v.boolean(),
  derivative_license_required: v.picklist(['CC-BY-NC-SA-4.0', 'CC-BY-SA-4.0', 'CLEAN_ROOM_ORIGINAL']),
  commercial_use_allowed: v.picklist([0, 1]),
  obligations_es: v.string()
});

export const ProjectCharterSchema = v.looseObject({
  charter_version: v.number(),
  project_slug: v.pipe(v.string(), v.regex(SLUG_RE)),
  project_name: v.string(),
  compliance_profile: v.picklist(KNOWN_COMPLIANCE_PROFILES),
  commercial_mode: v.boolean(),
  code_license: v.string(),
  content_license: v.string(),
  inbound_license_policy: v.record(v.string(), LicensePolicySchema),
  lesson_policy: v.looseObject({
    quiz_eligible_anchor_statuses: v.array(v.string()),
    free_alternative_allowed_tiers: v.array(v.string())
  }),
  media_policy: v.looseObject({
    allowed_video_origins: v.array(HTTPS_ORIGIN),
    video_platform_hosts: v.record(v.string(), v.array(v.string())),
    external_generative_image_fallbacks_allowed: v.boolean()
  })
});

export const DomainProfileSchema = v.strictObject({
  profileId: v.picklist(KNOWN_DOMAIN_PROFILES),
  version: v.string(),
  complianceProfile: v.picklist(KNOWN_COMPLIANCE_PROFILES),
  defaultStyle: v.string(),
  defaultSurfaceMode: v.picklist(['Read', 'Persuade', 'Operate', 'Experience']),
  defaultIndustryArchetype: v.string(),
  capabilities: v.strictObject({
    commerce: v.strictObject({
      payments: v.boolean(),
      leads: v.boolean(),
      turnstile: v.boolean(),
      pricingSection: v.boolean()
    }),
    media: v.strictObject({
      audio: v.boolean(),
      three: v.boolean(),
      shaders: v.boolean(),
      introVideo: v.boolean(),
      bespokeDomMorphology: v.boolean()
    }),
    runtime: v.strictObject({
      worker: v.boolean(),
      d1: v.boolean(),
      staticHeadersRequired: v.boolean(),
      pwaOfflineMpa: v.boolean()
    }),
    content: v.strictObject({
      mdxLessons: v.boolean(),
      socraticQuizzes: v.boolean(),
      fsrsSpacedRepetition: v.boolean(),
      legacyClientBriefMarkdown: v.boolean()
    }),
    compliance: v.strictObject({
      cspProfile: v.picklist(KNOWN_COMPLIANCE_PROFILES),
      trustedTypesStrict: v.boolean(),
      ageGate18Plus: v.boolean(),
      localFirstPrivacy: v.boolean(),
      forbidExternalGenerativeFallbacks: v.boolean()
    }),
    rag: v.strictObject({
      allowedDomains: v.pipe(v.array(v.string()), v.minLength(1)),
      maxInlineTokens: v.pipe(v.number(), v.minValue(256), v.maxValue(2400))
    })
  })
});

const COMMERCIAL_MARKETING_SKILL_NAMES = new Set([
  'cro',
  'copywriting',
  'pricing-and-onboarding-cro',
  'marketingskills',
  'marketing-psychology'
]);

const MOTION_AND_3D_SKILL_NAMES = new Set([
  'threejs-r186-tsl-and-gsap-free',
  'motion-engineer'
]);

const charterCache = new Map();
const domainProfileCache = new Map();
const projectManifestCache = new Map();

function deepFreeze(obj) {
  if (!obj || typeof obj !== 'object' || Object.isFrozen(obj)) return obj;
  for (const key of Object.keys(obj)) {
    deepFreeze(obj[key]);
  }
  return Object.freeze(obj);
}

/**
 * Loads and validates the charter (fail-closed: invalid charter throws, missing returns null).
 */
export function loadProjectCharter(charterPath = ACADEMY_CHARTER_PATH) {
  const abs = path.resolve(charterPath);
  if (!fs.existsSync(abs)) return null;
  const mtimeMs = fs.statSync(abs).mtimeMs;
  const cached = charterCache.get(abs);
  if (cached && cached.mtimeMs === mtimeMs) return cached.charter;
  const raw = JSON.parse(fs.readFileSync(abs, 'utf8'));
  const result = v.safeParse(ProjectCharterSchema, raw);
  if (!result.success) {
    const issue = result.issues?.[0];
    throw new Error(
      `INVALID_PROJECT_CHARTER: ${issue?.message || 'schema mismatch'} at ${(issue?.path || []).map((p) => p.key).join('.')}`
    );
  }
  const charter = Object.freeze(result.output);
  charterCache.set(abs, { mtimeMs, charter });
  return charter;
}

function readCachedJsonIfExists(absPath) {
  if (!absPath || !fs.existsSync(absPath)) return null;
  const st = fs.statSync(absPath);
  const hit = projectManifestCache.get(absPath);
  if (hit && hit.mtimeMs === st.mtimeMs) return hit.data;
  const parsed = JSON.parse(fs.readFileSync(absPath, 'utf8'));
  projectManifestCache.set(absPath, { mtimeMs: st.mtimeMs, data: parsed });
  return parsed;
}

function readProjectManifest(slugOrDir) {
  const raw = String(slugOrDir || '').trim();
  if (!raw) return null;
  const candidateBySlug = SLUG_RE.test(raw) ? path.join(FACTORY_ROOT, 'projects', raw, 'factory.project.json') : '';
  if (candidateBySlug) {
    const bySlug = readCachedJsonIfExists(candidateBySlug);
    if (bySlug) return bySlug;
  }
  const resolvedDir = path.isAbsolute(raw) ? raw : path.resolve(FACTORY_ROOT, raw);
  const candidateInDir = path.join(resolvedDir, 'factory.project.json');
  return readCachedJsonIfExists(candidateInDir);
}

function readProjectConfigProfile(slug) {
  if (!SLUG_RE.test(slug)) throw new Error(`INVALID_PROJECT_SLUG: ${slug}`);
  const cfgPath = path.join(FACTORY_ROOT, 'projects', slug, 'factory.project.json');
  if (!fs.existsSync(cfgPath)) return null;
  const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
  return cfg.complianceProfile || null;
}

function assertKnownProfile(profile, origin) {
  if (!KNOWN_COMPLIANCE_PROFILES.includes(profile)) {
    throw new Error(`UNKNOWN_COMPLIANCE_PROFILE: "${profile}" from ${origin}`);
  }
  return profile;
}

/**
 * Resolves the effective compliance profile (legacy-compatible API).
 */
export function getProjectProfile(projectSlugOrOptions = {}) {
  const opts =
    typeof projectSlugOrOptions === 'string' ? { slug: projectSlugOrOptions } : projectSlugOrOptions || {};
  const charter = opts.charter !== undefined ? opts.charter : loadProjectCharter(opts.charterPath);
  const slug = String(opts.slug || opts.projectSlug || process.env.FACTORY_ACTIVE_PROJECT || '').trim();

  let complianceProfile = DEFAULT_COMPLIANCE_PROFILE;
  let source = 'default';
  let usesCharter = false;

  if (charter && (opts.useCharter === true || (slug && slug === charter.project_slug))) {
    complianceProfile = assertKnownProfile(charter.compliance_profile, 'charter');
    source = 'charter';
    usesCharter = true;
  } else if (slug) {
    const fromCfg = readProjectConfigProfile(slug);
    if (fromCfg) {
      complianceProfile = assertKnownProfile(fromCfg, `projects/${slug}/factory.project.json`);
      source = 'project_config';
    }
  }

  const override = String(opts.complianceProfile || process.env.FACTORY_COMPLIANCE_PROFILE || '').trim();
  if (override) {
    complianceProfile = assertKnownProfile(override, 'explicit_override');
    source = 'explicit_override';
  }

  const isEducation = complianceProfile === 'education';
  const media = usesCharter ? charter.media_policy : null;
  return Object.freeze({
    slug: usesCharter ? charter.project_slug : slug,
    complianceProfile,
    isEducation,
    source,
    commercialMode: usesCharter ? charter.commercial_mode : null,
    contentLicense: usesCharter ? charter.content_license : null,
    codeLicense: usesCharter ? charter.code_license : null,
    allowedVideoOrigins: Object.freeze(media ? [...media.allowed_video_origins] : []),
    externalGenerativeFallbacksAllowed: isEducation
      ? false
      : media
      ? media.external_generative_image_fallbacks_allowed === true
      : true
  });
}

function mapHintToDomainProfileId(hint = '') {
  const clean = String(hint || '').toLowerCase().trim();
  if (!clean) return null;
  if (KNOWN_DOMAIN_PROFILES.includes(clean)) return clean;
  if (clean === 'academic-editorial-education' || clean === 'academia' || clean === 'academy') {
    return 'education';
  }
  if (
    clean === 'streaming-overlay' ||
    clean === 'casino' ||
    clean === 'gambling' ||
    clean === 'streamer' ||
    clean === 'kick'
  ) {
    return 'gambling-18plus';
  }
  if (
    clean === 'portfolio' ||
    clean === 'agency' ||
    clean === 'agencia' ||
    clean === 'landing' ||
    clean === 'ecommerce' ||
    clean === 'meta-ads'
  ) {
    return 'marketing';
  }
  if (
    clean === 'saas' ||
    clean === 'b2b-saas-platform' ||
    clean === 'fintech' ||
    clean === 'standard-web'
  ) {
    return 'saas-b2b';
  }
  return null;
}

export function loadValidatedDomainProfileFile(profileId, profilesDir = PROFILES_DIR) {
  if (!KNOWN_DOMAIN_PROFILES.includes(profileId)) {
    throw new Error(`UNKNOWN_DOMAIN_PROFILE: "${profileId}"`);
  }
  const filePath = path.join(profilesDir, `${profileId}.profile.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`MISSING_DOMAIN_PROFILE_FILE: ${filePath}`);
  }
  const mtimeMs = fs.statSync(filePath).mtimeMs;
  const cached = domainProfileCache.get(filePath);
  if (cached && cached.mtimeMs === mtimeMs) return cached.profile;

  const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const parsed = v.safeParse(DomainProfileSchema, raw);
  if (!parsed.success) {
    const issue = parsed.issues?.[0];
    throw new Error(
      `INVALID_DOMAIN_PROFILE (${profileId}): ${issue?.message || 'schema mismatch'} at ${(issue?.path || []).map((p) => p.key).join('.')}`
    );
  }
  const frozen = deepFreeze(parsed.output);
  domainProfileCache.set(filePath, { mtimeMs, profile: frozen });
  return frozen;
}

/**
 * Classifies a repository/RAG file path into a deterministic RAG domain tag.
 */
export function classifyKnowledgeDocumentDomain(filePathOrSource = '') {
  const norm = String(filePathOrSource || '')
    .replace(/^local:\/\//i, '')
    .replace(/\\/g, '/')
    .replace(/^\.\//, '')
    .split('#')[0];
  if (!norm) return 'core_index';

  if (norm.startsWith('knowledge/')) {
    if (/(?:STREAM_MARKETING|EXTREMAL_EVENTS|ACTUARIAL|CROWD_PLAY|SLOTS?_OVERLAY)/i.test(norm)) {
      return 'streaming_and_overlays';
    }
    if (
      /(?:PAYMENT_GATEWAYS|EDGE_PAYMENTS|MERCADOPAGO|STRIPE_LEMONSQUEEZY|CHECKOUT_CRO|HORMOZI_OFFERS|SCHWARTZ_CRO|B2B_COPYWRITING|SOFTWARE_PRICING_DAVIDSON|FOGG_BEHAVIOR_MODEL|PREDICTABLY_IRRATIONAL_ARIELY)/i.test(
        norm
      )
    ) {
      return 'commercial_marketing_skills';
    }
    const parts = norm.split('/');
    if (parts.length >= 3) {
      return parts[1];
    }
    return 'core_index';
  }
  if (norm.startsWith('.agents/skills/')) {
    const skillName = norm.split('/')[2] || '';
    if (COMMERCIAL_MARKETING_SKILL_NAMES.has(skillName)) {
      return 'commercial_marketing_skills';
    }
    if (MOTION_AND_3D_SKILL_NAMES.has(skillName)) {
      return 'motion_and_animation';
    }
    return 'agent_skills';
  }
  if (norm.startsWith('docs/') || norm.startsWith('.agents/memory/')) {
    return 'factory_docs';
  }
  return 'core_index';
}

/**
 * Resolves the immutable declarative Domain Profile (`saas-b2b`, `marketing`, `gambling-18plus`, `education`)
 * and its capabilities (`commerce`, `media`, `runtime`, `content`, `compliance`, `rag.allowedDomains`).
 */
export function resolveDomainProfile(projectSlugOrOptions = {}) {
  const opts =
    typeof projectSlugOrOptions === 'string'
      ? KNOWN_DOMAIN_PROFILES.includes(projectSlugOrOptions) || mapHintToDomainProfileId(projectSlugOrOptions)
        ? { slug: projectSlugOrOptions, hint: projectSlugOrOptions }
        : { slug: projectSlugOrOptions }
      : projectSlugOrOptions || {};

  const targetDirOrSlug =
    opts.projectRoot ||
    opts.projectDir ||
    opts.slug ||
    opts.projectSlug ||
    process.env.FACTORY_ACTIVE_PROJECT ||
    '';

  let manifest = opts.manifest || null;
  if (!manifest && targetDirOrSlug) {
    try {
      manifest = readProjectManifest(targetDirOrSlug);
    } catch {
      manifest = null;
    }
  }

  let activeProjectFallback = null;
  if (!manifest && !targetDirOrSlug) {
    const activePath = path.join(FACTORY_ROOT, '.agents', 'memory', 'active_project.json');
    if (fs.existsSync(activePath)) {
      try {
        const active = JSON.parse(fs.readFileSync(activePath, 'utf8'));
        activeProjectFallback = active;
        if (active?.activeSlug) {
          manifest = readProjectManifest(active.activeSlug);
        }
      } catch {}
    }
  }

  const effectiveSlug = String(
    manifest?.id ||
      opts.projectSlug ||
      (typeof opts.slug === 'string' && !KNOWN_DOMAIN_PROFILES.includes(opts.slug) ? opts.slug : '') ||
      activeProjectFallback?.activeSlug ||
      (targetDirOrSlug ? path.basename(String(targetDirOrSlug)) : '')
  ).trim();

  const charter = loadProjectCharter(opts.charterPath);
  const matchesEducationCharter = Boolean(charter && effectiveSlug && effectiveSlug === charter.project_slug);

  const candidateHints = [
    opts.domainProfile,
    opts.complianceProfile,
    process.env.FACTORY_COMPLIANCE_PROFILE,
    matchesEducationCharter ? charter.compliance_profile : null,
    manifest?.domainProfile,
    manifest?.complianceProfile === 'education' || manifest?.complianceProfile === 'gambling-18plus'
      ? manifest.complianceProfile
      : null,
    opts.archetype,
    opts.industry,
    manifest?.archetype,
    manifest?.industryArchetype,
    activeProjectFallback?.archetype,
    opts.hint
  ];

  let resolvedProfileId = 'saas-b2b';
  for (const h of candidateHints) {
    const mapped = mapHintToDomainProfileId(h);
    if (mapped) {
      resolvedProfileId = mapped;
      break;
    }
  }

  const baseProfile = loadValidatedDomainProfileFile(resolvedProfileId, opts.profilesDir || PROFILES_DIR);
  const allowedDomainSet = new Set(baseProfile.capabilities.rag.allowedDomains);

  const isRagPathAllowed = (filePathOrSource = '') => {
    const norm = String(filePathOrSource || '')
      .replace(/^local:\/\//i, '')
      .replace(/\\/g, '/')
      .split('#')[0];
    const domain = classifyKnowledgeDocumentDomain(norm);
    if (!allowedDomainSet.has(domain)) return false;

    if (!baseProfile.capabilities.commerce.payments) {
      if (/(?:PAYMENT_GATEWAYS|MERCADOPAGO|STRIPE_LEMONSQUEEZY|EDGE_PAYMENTS)/i.test(norm)) {
        return false;
      }
    }
    if (!baseProfile.capabilities.commerce.leads && !baseProfile.capabilities.compliance.ageGate18Plus) {
      if (/(?:STREAM_MARKETING|EXTREMAL_EVENTS|ACTUARIAL)/i.test(norm)) {
        return false;
      }
    }
    return true;
  };

  return Object.freeze({
    id: baseProfile.profileId,
    profileId: baseProfile.profileId,
    version: baseProfile.version,
    slug: effectiveSlug || baseProfile.profileId,
    complianceProfile: baseProfile.complianceProfile,
    defaultStyle: baseProfile.defaultStyle,
    defaultSurfaceMode: baseProfile.defaultSurfaceMode,
    defaultIndustryArchetype: baseProfile.defaultIndustryArchetype,
    capabilities: baseProfile.capabilities,
    isDomainAllowedInRag: isRagPathAllowed
  });
}
