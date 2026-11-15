/**
 * tools/lib/project_profile.mjs — Deterministic project contract resolver.
 * Reads `data/academy/project_charter.json` (Academia IA master charter) or
 * `projects/<slug>/factory.project.json` so no agent has to guess compliance,
 * licensing, commercial mode or media policy.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as v from 'valibot';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const FACTORY_ROOT = path.resolve(__dirname, '..', '..');
export const ACADEMY_CHARTER_PATH = path.join(FACTORY_ROOT, 'data', 'academy', 'project_charter.json');
export const DEFAULT_COMPLIANCE_PROFILE = 'standard-web';
export const KNOWN_COMPLIANCE_PROFILES = Object.freeze(['standard-web', 'gambling-18plus', 'education']);

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

const charterCache = new Map();

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
    throw new Error(`INVALID_PROJECT_CHARTER: ${issue?.message || 'schema mismatch'} at ${(issue?.path || []).map((p) => p.key).join('.')}`);
  }
  const charter = Object.freeze(result.output);
  charterCache.set(abs, { mtimeMs, charter });
  return charter;
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
 * Resolves the effective project profile.
 * Precedence: explicit `complianceProfile` option / FACTORY_COMPLIANCE_PROFILE env
 *   > charter (when slug matches `project_slug` or `useCharter: true`)
 *   > projects/<slug>/factory.project.json
 *   > DEFAULT_COMPLIANCE_PROFILE.
 */
export function getProjectProfile(projectSlugOrOptions = {}) {
  const opts = typeof projectSlugOrOptions === 'string' ? { slug: projectSlugOrOptions } : projectSlugOrOptions || {};
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

