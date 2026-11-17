/**
 * worker/index.mjs — Academia Libre Hybrid Cloudflare Worker (Same-Origin /api/* + Static Assets)
 * ===============================================================================================
 * - Zero mandatory login: 100% of lessons are served statically from `env.ASSETS` without auth.
 * - Identical parameterized SQL executed over Cloudflare D1 (`env.DB`) in production and
 *   `node:sqlite` (`DatabaseSync` adapter) in local tests/runtime.
 * - OAuth 2.1 PKCE (`S256`) with Google + secondary GitHub (`read:user`), AES-256-GCM encrypted email
 *   with HMAC-SHA256 blind index, strict RIFF/WEBP avatar sanitizer, Ed25519 certificates & Ley 25.326.
 * ===============================================================================================
 */

import * as v from 'valibot';
import {
  PATH_IDS,
  HARDWARE_ARCHETYPE_IDS,
  PATH_CATALOG,
  isAllowedLessonEvent,
  evaluateCalibrationCases
} from '../src/lib/curriculum-paths.mjs';
import {
  randomTokenBase64Url,
  sha256Hex,
  constantTimeEqual,
  generatePkcePair,
  encryptEmailAesGcm,
  decryptEmailAesGcm,
  computeEmailBlindIndex,
  sealEphemeralCookieState,
  unsealEphemeralCookieState,
  resolveEd25519SigningPair,
  buildCanonicalCertificatePayloadString,
  signCertificatePayloadEd25519,
  verifyCertificatePayloadEd25519
} from './crypto-edge.mjs';
import { validateStrictWebpAvatarBytes } from './webp-guard.mjs';
import {
  getUserById,
  listOAuthAccountsForUser,
  createOrUpdateGoogleUserAndLink,
  linkGithubAccountForUser,
  createSession,
  getSessionUser,
  deleteSessionByHash,
  updateUserProfile,
  completeUserOnboarding,
  updateUserAvatarKey,
  recordIdempotentProgressEvent,
  recordIdempotentMilestone,
  getUserDashboardState,
  findCertificateByUserLevelPath,
  findCertificateByCode,
  insertCertificate,
  listForumThreads,
  getForumThreadWithReplies,
  insertForumThread,
  insertForumReply,
  listChatMessages,
  insertChatMessage,
  submitCommunityReport,
  recordModerationAuditLog,
  listUserCommunityContributionsForExport,
  deleteUserCascade
} from './db.mjs';
import {
  COMMUNITY_MIN_XP_TO_POST,
  FORUM_CATEGORIES,
  ForumThreadCreateSchema,
  ForumReplyCreateSchema,
  ChatMessageCreateSchema,
  CommunityReportCreateSchema,
  evaluateModerationCascade
} from './moderation-guard.mjs';
import { LevelChatRoom } from './chat-room-do.mjs';

export { LevelChatRoom };

const MAX_BODY_BYTES = 65536;
const MAX_AVATAR_BYTES = 25600;
const MAX_RATE_LIMIT_BUCKETS = 2048;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 40;
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;
const RATE_LIMIT_BUCKETS = new Map();

const VALID_LESSON_EVENT_TYPES = ['read', 'quiz', 'fsrs', 'audit'];
const LEVEL_LABELS_ES = {
  1: 'Nivel 1 · Principiante (UNESCO Adquirir)',
  2: 'Nivel 2 · Intermedio (UNESCO Profundizar)',
  3: 'Nivel 3 · Avanzado (UNESCO Crear)'
};

const ProfileUpdateSchema = v.strictObject({
  displayName: v.optional(v.pipe(v.string(), v.trim(), v.minLength(2), v.maxLength(80))),
  activePathId: v.optional(v.picklist(PATH_IDS)),
  hardwareArchetypeId: v.optional(v.picklist(HARDWARE_ARCHETYPE_IDS)),
  linkedinUrl: v.optional(v.pipe(v.string(), v.trim(), v.maxLength(200))),
  xUrl: v.optional(v.pipe(v.string(), v.trim(), v.maxLength(200)))
});

const OnboardingSchema = v.strictObject({
  activePathId: v.picklist(PATH_IDS),
  hardwareArchetypeId: v.picklist(HARDWARE_ARCHETYPE_IDS),
  startFromScratch: v.optional(v.boolean()),
  case1Choice: v.optional(v.string()),
  case2Choice: v.optional(v.string())
});

const ProgressEventItemSchema = v.strictObject({
  lessonId: v.pipe(v.string(), v.trim(), v.minLength(3), v.maxLength(80)),
  eventType: v.picklist(VALID_LESSON_EVENT_TYPES),
  scoreJson: v.optional(v.pipe(v.string(), v.maxLength(1024)))
});

const ProgressSyncSchema = v.strictObject({
  events: v.pipe(v.array(ProgressEventItemSchema), v.maxLength(100))
});

const MilestoneVerifySchema = v.strictObject({
  pathId: v.picklist(PATH_IDS),
  milestoneIndex: v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(3)),
  githubRepoUrl: v.optional(v.pipe(v.string(), v.trim(), v.maxLength(200))),
  commitSha: v.optional(v.pipe(v.string(), v.trim(), v.regex(/^[0-9a-f]{7,40}$/i)))
});

const CertificateIssueSchema = v.strictObject({
  level: v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(3)),
  pathId: v.optional(v.picklist(PATH_IDS))
});

export function hasSequentialNumericIdInPath(pathname) {
  return /\/api\/[a-z0-9_-]+\/\d+(?:\/|$)/i.test(String(pathname || ''));
}

export function withSecurityHeaders(response, extraHeaders = {}) {
  const headers = new Headers(response.headers);
  headers.delete("Server");
  headers.delete("X-Powered-By");
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  headers.set('Cross-Origin-Resource-Policy', 'same-origin');
  headers.set('X-Frame-Options', 'DENY');
  if (extraHeaders && typeof extraHeaders === 'object') {
    for (const [k, val] of Object.entries(extraHeaders)) {
      headers.set(k, val);
    }
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

function jsonResponse(payload, status = 200, extraHeaders = {}) {
  return withSecurityHeaders(
    new Response(JSON.stringify(payload), {
      status,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store, max-age=0'
      }
    }),
    extraHeaders
  );
}

function validateFetchMetadata(request, options = {}) {
  const method = request.method.toUpperCase();
  const secSite = (request.headers.get('Sec-Fetch-Site') || '').toLowerCase();
  const secMode = (request.headers.get('Sec-Fetch-Mode') || '').toLowerCase();
  const secDest = (request.headers.get('Sec-Fetch-Dest') || '').toLowerCase();
  const originHeader = request.headers.get('Origin') || '';

  if (secSite && !['same-origin', 'same-site', 'none'].includes(secSite)) {
    return { allowed: false, reason: 'CROSS_SITE_FETCH_REJECTED' };
  }
  if (secMode && secMode === 'navigate' && !['GET', 'HEAD'].includes(method)) {
    return { allowed: false, reason: 'INVALID_FETCH_MODE_FOR_MUTATION' };
  }
  const isChatWsUpgrade =
    method === 'GET' &&
    new URL(request.url).pathname.startsWith('/api/community/chat/') &&
    (request.headers.get('Upgrade') || '').toLowerCase() === 'websocket';
  const allowedFetchDest = isChatWsUpgrade
    ? ['empty', 'document', 'image', 'websocket', '']
    : ['empty', 'document', 'image', ''];
  if (secDest && !allowedFetchDest.includes(secDest)) {
    return { allowed: false, reason: 'INVALID_FETCH_DEST' };
  }
  if (originHeader && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    try {
      const originUrl = new URL(originHeader);
      const reqUrl = new URL(request.url);
      const isDevLoopback =
        String(options?.environment || '').toLowerCase() === 'development' &&
        (originUrl.hostname === '127.0.0.1' || originUrl.hostname === 'localhost') &&
        (reqUrl.hostname === '127.0.0.1' || reqUrl.hostname === 'localhost');
      if (originUrl.origin !== reqUrl.origin && !isDevLoopback) {
        return { allowed: false, reason: 'CROSS_ORIGIN_MISMATCH_REJECTED' };
      }
    } catch {
      return { allowed: false, reason: 'INVALID_ORIGIN_HEADER' };
    }
  }
  return { allowed: true };
}

async function checkRateLimit(clientIp, env = {}) {
  if (env && env.RATE_LIMITER && typeof env.RATE_LIMITER.limit === 'function') {
    try {
      const outcome = await env.RATE_LIMITER.limit({ key: String(clientIp || 'unknown') });
      return { allowed: Boolean(outcome && outcome.success !== false) };
    } catch {}
  }
  const now = Date.now();
  const key = String(clientIp || '127.0.0.1');
  const bucket = RATE_LIMIT_BUCKETS.get(key);
  if (!bucket || now - bucket.windowStart > RATE_LIMIT_WINDOW_MS) {
    if (RATE_LIMIT_BUCKETS.size >= MAX_RATE_LIMIT_BUCKETS) {
      const oldestKey = RATE_LIMIT_BUCKETS.keys().next().value;
      if (oldestKey !== undefined) RATE_LIMIT_BUCKETS.delete(oldestKey);
    }
    RATE_LIMIT_BUCKETS.set(key, { windowStart: now, count: 1 });
    return { allowed: true };
  }
  bucket.count += 1;
  return { allowed: bucket.count <= RATE_LIMIT_MAX_REQUESTS };
}

function parseCookies(cookieHeader = '') {
  const map = new Map();
  for (const part of String(cookieHeader || '').split(';')) {
    const idx = part.indexOf('=');
    if (idx <= 0) continue;
    const name = part.slice(0, idx).trim();
    const val = part.slice(idx + 1).trim();
    if (name && !map.has(name)) {
      map.set(name, val);
    }
  }
  return map;
}

function resolveCookieTransportPolicy(request, env = {}) {
  const url = new URL(request.url);
  const envName = String(env?.ENVIRONMENT || '').toLowerCase();
  if (url.protocol === 'https:') {
    return {
      allowed: true,
      isHttps: true,
      sessionCookieName: '__Host-al_session',
      stateCookieName: '__Host-al_oauth_state',
      hintCookieName: 'al_logged_in',
      secureAttr: '; Secure'
    };
  }
  if (url.protocol === 'http:' && url.hostname === '127.0.0.1' && envName === 'development') {
    return {
      allowed: true,
      isHttps: false,
      sessionCookieName: 'al_session',
      stateCookieName: 'al_oauth_state',
      hintCookieName: 'al_logged_in',
      secureAttr: ''
    };
  }
  return { allowed: false, reason: 'INSECURE_TRANSPORT_FORBIDDEN' };
}

function formatSessionCookies(policy, sessionToken, maxAgeSeconds = SESSION_TTL_SECONDS) {
  const sessionCookie = `${policy.sessionCookieName}=${sessionToken}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAgeSeconds}${policy.secureAttr}`;
  const hintVal = maxAgeSeconds > 0 ? '1' : '';
  const hintCookie = `${policy.hintCookieName}=${hintVal}; SameSite=Lax; Path=/; Max-Age=${maxAgeSeconds}${policy.secureAttr}`;
  return [sessionCookie, hintCookie];
}

function formatOauthStateCookie(policy, sealedState, maxAgeSeconds = 600) {
  return `${policy.stateCookieName}=${sealedState}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAgeSeconds}${policy.secureAttr}`;
}

export function normalizeLinkedInUrl(rawInput = '') {
  const raw = String(rawInput || '').trim();
  if (!raw) return { valid: true, handle: null };
  let parsed;
  try {
    parsed = new URL(raw);
  } catch {
    return { valid: false, error: 'INVALID_SOCIAL_PROFILE_URL' };
  }
  const host = parsed.hostname.toLowerCase();
  if (parsed.protocol !== 'https:' || (host !== 'www.linkedin.com' && host !== 'linkedin.com')) {
    return { valid: false, error: 'INVALID_SOCIAL_PROFILE_URL' };
  }
  if (parsed.search || parsed.hash) {
    return { valid: false, error: 'INVALID_SOCIAL_PROFILE_URL' };
  }
  const m = /^\/in\/([a-zA-Z0-9-]{3,100})\/?$/.exec(parsed.pathname);
  if (!m) {
    return { valid: false, error: 'INVALID_SOCIAL_PROFILE_URL' };
  }
  return { valid: true, handle: m[1] };
}

export function normalizeXUrl(rawInput = '') {
  const raw = String(rawInput || '').trim();
  if (!raw) return { valid: true, handle: null };
  let parsed;
  try {
    parsed = new URL(raw);
  } catch {
    return { valid: false, error: 'INVALID_SOCIAL_PROFILE_URL' };
  }
  const host = parsed.hostname.toLowerCase();
  if (parsed.protocol !== 'https:' || (host !== 'x.com' && host !== 'www.x.com')) {
    return { valid: false, error: 'INVALID_SOCIAL_PROFILE_URL' };
  }
  if (parsed.search || parsed.hash) {
    return { valid: false, error: 'INVALID_SOCIAL_PROFILE_URL' };
  }
  const m = /^\/([a-zA-Z0-9_]{1,15})\/?$/.exec(parsed.pathname);
  if (!m) {
    return { valid: false, error: 'INVALID_SOCIAL_PROFILE_URL' };
  }
  return { valid: true, handle: m[1] };
}

export function validateGithubRepoUrl(rawInput = '', expectedOwner = null) {
  const raw = String(rawInput || '').trim();
  if (!raw) return { valid: true, normalizedUrl: null };
  let parsed;
  try {
    parsed = new URL(raw);
  } catch {
    return { valid: false, error: 'INVALID_GITHUB_REPO_URL' };
  }
  if (parsed.protocol !== 'https:' || parsed.hostname.toLowerCase() !== 'github.com' || parsed.search || parsed.hash) {
    return { valid: false, error: 'INVALID_GITHUB_REPO_URL' };
  }
  const m = /^\/([a-zA-Z0-9-]{1,39})\/([a-zA-Z0-9._-]{1,100})\/?$/.exec(parsed.pathname);
  if (!m) {
    return { valid: false, error: 'INVALID_GITHUB_REPO_URL' };
  }
  const [, owner, repo] = m;
  if (expectedOwner && owner.toLowerCase() !== String(expectedOwner).toLowerCase()) {
    return { valid: false, error: 'GITHUB_REPO_OWNER_MISMATCH' };
  }
  return { valid: true, normalizedUrl: `https://github.com/${owner}/${repo}` };
}

async function readBoundedJsonBody(request, maxBytes = MAX_BODY_BYTES) {
  const lenHeader = request.headers.get('Content-Length');
  if (lenHeader && Number(lenHeader) > maxBytes) {
    return { ok: false, status: 413, error: 'PAYLOAD_TOO_LARGE' };
  }
  const buf = new Uint8Array(await request.arrayBuffer());
  if (buf.byteLength > maxBytes) {
    return { ok: false, status: 413, error: 'PAYLOAD_TOO_LARGE' };
  }
  if (buf.byteLength === 0) {
    return { ok: false, status: 400, error: 'EMPTY_JSON_BODY' };
  }
  try {
    const data = JSON.parse(new TextDecoder().decode(buf));
    return { ok: true, data };
  } catch {
    return { ok: false, status: 400, error: 'INVALID_JSON_SYNTAX' };
  }
}

async function readBoundedBinaryBody(request, maxBytes = MAX_AVATAR_BYTES) {
  const lenHeader = request.headers.get('Content-Length');
  if (lenHeader && Number(lenHeader) > maxBytes) {
    return { ok: false, status: 413, error: 'AVATAR_TOO_LARGE' };
  }
  const buf = new Uint8Array(await request.arrayBuffer());
  if (buf.byteLength > maxBytes) {
    return { ok: false, status: 413, error: 'AVATAR_TOO_LARGE' };
  }
  return { ok: true, bytes: buf };
}

async function resolveAuthenticatedSession(request, env) {
  const policy = resolveCookieTransportPolicy(request, env);
  if (!policy.allowed) return { policy, user: null, tokenSha256: null };
  const cookies = parseCookies(request.headers.get('Cookie') || '');
  const rawToken = cookies.get(policy.sessionCookieName);
  if (!rawToken) return { policy, user: null, tokenSha256: null };
  const tokenSha256 = await sha256Hex(rawToken);
  const user = await getSessionUser(env.DB, tokenSha256, new Date().toISOString());
  return { policy, user: user || null, tokenSha256: user ? tokenSha256 : null };
}

function redirectWithCookies(location, cookies = []) {
  const headers = new Headers({
    Location: location,
    'Cache-Control': 'no-store, max-age=0'
  });
  for (const c of cookies) {
    headers.append('Set-Cookie', c);
  }
  return withSecurityHeaders(new Response(null, { status: 302, headers }));
}

function ensureGoogleOauthConfig(env = {}) {
  const missing =
    !String(env.GOOGLE_CLIENT_ID || '').trim() ||
    !String(env.GOOGLE_CLIENT_SECRET || '').trim() ||
    !String(env.EMAIL_ENCRYPTION_KEY_B64 || '').trim() ||
    !String(env.EMAIL_BLIND_INDEX_SECRET || '').trim();
  return !missing;
}

function ensureGithubOauthConfig(env = {}) {
  const hasStateKey = Boolean(String(env.OAUTH_STATE_SECRET || env.EMAIL_ENCRYPTION_KEY_B64 || '').trim());
  const missing =
    !String(env.GITHUB_CLIENT_ID || '').trim() ||
    !String(env.GITHUB_CLIENT_SECRET || '').trim() ||
    !hasStateKey;
  return !missing;
}

export default {
  async fetch(request, env = {}) {
    try {
      const url = new URL(request.url);
      const pathname = url.pathname;
      const method = request.method.toUpperCase();

      if (!pathname.startsWith('/api/')) {
        if (env.ASSETS && typeof env.ASSETS.fetch === 'function') {
          return env.ASSETS.fetch(request);
        }
        return withSecurityHeaders(new Response('Not Found', { status: 404 }));
      }

      if (hasSequentialNumericIdInPath(pathname)) {
        return jsonResponse({ ok: false, error: 'OPAQUE_UUID_OR_ULID_REQUIRED' }, 400);
      }

      const fetchMeta = validateFetchMetadata(request, { environment: env.ENVIRONMENT });
      if (!fetchMeta.allowed) {
        return jsonResponse({ ok: false, error: fetchMeta.reason }, 403);
      }

      const clientIp =
        request.headers.get('CF-Connecting-IP') ||
        request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
        '127.0.0.1';
      const rl = await checkRateLimit(clientIp, env);
      if (!rl.allowed) {
        return jsonResponse({ ok: false, error: 'RATE_LIMIT_EXCEEDED' }, 429);
      }

      if (pathname === '/api/health' && method === 'GET') {
        return jsonResponse({
          ok: true,
          status: 'ok',
          service: 'academia-libre-edge',
          loginRequiredForLessons: false,
          timestamp: new Date().toISOString()
        });
      }

      const fetchFn = typeof env.FETCH_IMPL === 'function' ? env.FETCH_IMPL : fetch;

      // ------------------------------------------------------------------
      // 1. OAuth 2.1 PKCE (Google Primary Login + GitHub Secondary Link)
      // ------------------------------------------------------------------
      if (pathname === '/api/auth/google/start' && method === 'GET') {
        const policy = resolveCookieTransportPolicy(request, env);
        if (!policy.allowed) {
          return jsonResponse({ ok: false, error: policy.reason }, 400);
        }
        if (!ensureGoogleOauthConfig(env)) {
          return jsonResponse({ ok: false, error: 'OAUTH_NOT_CONFIGURED' }, 503);
        }
        const pkce = await generatePkcePair();
        const state = randomTokenBase64Url(24);
        const redirectUri = `${url.origin}/api/auth/google/callback`;
        const stateSecret = String(env.OAUTH_STATE_SECRET || env.EMAIL_ENCRYPTION_KEY_B64);
        const sealedState = await sealEphemeralCookieState(
          { provider: 'google', state, codeVerifier: pkce.codeVerifier, redirectUri },
          stateSecret
        );
        const authEndpoint = new URL(
          String(env.OAUTH_GOOGLE_AUTH_URL || 'https://accounts.google.com/o/oauth2/v2/auth')
        );
        authEndpoint.searchParams.set('client_id', String(env.GOOGLE_CLIENT_ID));
        authEndpoint.searchParams.set('redirect_uri', redirectUri);
        authEndpoint.searchParams.set('response_type', 'code');
        authEndpoint.searchParams.set('scope', 'openid email profile');
        authEndpoint.searchParams.set('state', state);
        authEndpoint.searchParams.set('code_challenge', pkce.codeChallenge);
        authEndpoint.searchParams.set('code_challenge_method', "S256");

        return redirectWithCookies(authEndpoint.toString(), [formatOauthStateCookie(policy, sealedState, 600)]);
      }

      if (pathname === '/api/auth/google/callback' && method === 'GET') {
        const policy = resolveCookieTransportPolicy(request, env);
        if (!policy.allowed) {
          return jsonResponse({ ok: false, error: policy.reason }, 400);
        }
        if (!ensureGoogleOauthConfig(env)) {
          return jsonResponse({ ok: false, error: 'OAUTH_NOT_CONFIGURED' }, 503);
        }
        if (!env.DB) {
          return jsonResponse({ ok: false, error: 'D1_BINDING_UNAVAILABLE' }, 503);
        }
        const code = url.searchParams.get('code') || '';
        const state = url.searchParams.get('state') || '';
        const cookies = parseCookies(request.headers.get('Cookie') || '');
        const rawSealed = cookies.get(policy.stateCookieName) || '';
        const stateSecret = String(env.OAUTH_STATE_SECRET || env.EMAIL_ENCRYPTION_KEY_B64);
        const sealed = await unsealEphemeralCookieState(rawSealed, stateSecret, 600_000);
        if (!code || !state || !sealed || sealed.provider !== 'google' || !constantTimeEqual(state, sealed.state)) {
          return jsonResponse({ ok: false, error: 'INVALID_OAUTH_STATE' }, 400);
        }

        const tokenRes = await fetchFn(
          String(env.OAUTH_GOOGLE_TOKEN_URL || 'https://oauth2.googleapis.com/token'),
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              grant_type: 'authorization_code',
              client_id: String(env.GOOGLE_CLIENT_ID),
              client_secret: String(env.GOOGLE_CLIENT_SECRET),
              code,
              redirect_uri: sealed.redirectUri,
              code_verifier: sealed.codeVerifier
            }).toString()
          }
        );
        if (!tokenRes.ok) {
          return jsonResponse({ ok: false, error: 'OAUTH_TOKEN_EXCHANGE_FAILED' }, 502);
        }
        const tokenJson = await tokenRes.json();
        const accessToken = String(tokenJson?.access_token || '');
        if (!accessToken) {
          return jsonResponse({ ok: false, error: 'OAUTH_MISSING_ACCESS_TOKEN' }, 502);
        }

        const profileRes = await fetchFn(
          String(env.OAUTH_GOOGLE_USERINFO_URL || 'https://openidconnect.googleapis.com/v1/userinfo'),
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (!profileRes.ok) {
          return jsonResponse({ ok: false, error: 'OAUTH_USERINFO_FAILED' }, 502);
        }
        const profile = await profileRes.json();
        const googleSub = String(profile?.sub || '').trim();
        const rawEmail = String(profile?.email || '').trim().toLowerCase();
        if (!googleSub || !rawEmail || profile?.email_verified === false) {
          return jsonResponse({ ok: false, error: 'GOOGLE_VERIFIED_EMAIL_REQUIRED' }, 400);
        }

        const displayName =
          String(profile?.name || rawEmail.split('@')[0] || 'Estudiante')
            .replace(/[<>]/g, '')
            .trim()
            .slice(0, 80) || 'Estudiante';

        const emailBlindIndex = await computeEmailBlindIndex(rawEmail, env.EMAIL_BLIND_INDEX_SECRET);
        const existingOauth = await env.DB.prepare(
          'SELECT user_id FROM oauth_accounts WHERE provider = ? AND provider_user_id = ? LIMIT 1'
        )
          .bind('google', googleSub)
          .first();
        const existingByBlind = existingOauth
          ? null
          : await env.DB.prepare('SELECT id FROM users WHERE email_blind_index = ? LIMIT 1')
              .bind(emailBlindIndex)
              .first();
        const effectiveUserId = existingOauth?.user_id || existingByBlind?.id || crypto.randomUUID();

        const emailCiphertext = await encryptEmailAesGcm(
          rawEmail,
          env.EMAIL_ENCRYPTION_KEY_B64,
          effectiveUserId
        );
        const nowIso = new Date().toISOString();
        const userRow = await createOrUpdateGoogleUserAndLink(env.DB, {
          userId: effectiveUserId,
          displayName,
          emailCiphertext,
          emailBlindIndex,
          googleSub,
          nowIso
        });

        const sessionToken = randomTokenBase64Url(32);
        const tokenSha256 = await sha256Hex(sessionToken);
        const expiresAtIso = new Date(Date.now() + SESSION_TTL_SECONDS * 1000).toISOString();
        await createSession(env.DB, { tokenSha256, userId: userRow.id, expiresAtIso, nowIso });

        const targetPath = Number(userRow.onboarding_completed) === 1 ? '/perfil/' : '/perfil/?onboarding=1';
        return redirectWithCookies(targetPath, [
          ...formatSessionCookies(policy, sessionToken, SESSION_TTL_SECONDS),
          formatOauthStateCookie(policy, '', 0)
        ]);
      }

      if (pathname === '/api/auth/github/start' && method === 'GET') {
        const auth = await resolveAuthenticatedSession(request, env);
        if (!auth.policy.allowed) {
          return jsonResponse({ ok: false, error: auth.policy.reason }, 400);
        }
        if (!auth.user) {
          return jsonResponse({ ok: false, error: 'AUTH_REQUIRED' }, 401);
        }
        if (!ensureGithubOauthConfig(env)) {
          return jsonResponse({ ok: false, error: 'OAUTH_NOT_CONFIGURED' }, 503);
        }
        const pkce = await generatePkcePair();
        const state = randomTokenBase64Url(24);
        const redirectUri = `${url.origin}/api/auth/github/callback`;
        const stateSecret = String(env.OAUTH_STATE_SECRET || env.EMAIL_ENCRYPTION_KEY_B64);
        const sealedState = await sealEphemeralCookieState(
          {
            provider: 'github',
            state,
            userId: auth.user.id,
            codeVerifier: pkce.codeVerifier,
            redirectUri
          },
          stateSecret
        );
        const authEndpoint = new URL(
          String(env.OAUTH_GITHUB_AUTH_URL || 'https://github.com/login/oauth/authorize')
        );
        authEndpoint.searchParams.set('client_id', String(env.GITHUB_CLIENT_ID));
        authEndpoint.searchParams.set('redirect_uri', redirectUri);
        authEndpoint.searchParams.set('scope', 'read:user');
        authEndpoint.searchParams.set('state', state);
        authEndpoint.searchParams.set('code_challenge', pkce.codeChallenge);
        authEndpoint.searchParams.set('code_challenge_method', "S256");

        return redirectWithCookies(authEndpoint.toString(), [formatOauthStateCookie(auth.policy, sealedState, 600)]);
      }

      if (pathname === '/api/auth/github/callback' && method === 'GET') {
        const auth = await resolveAuthenticatedSession(request, env);
        if (!auth.policy.allowed) {
          return jsonResponse({ ok: false, error: auth.policy.reason }, 400);
        }
        if (!auth.user) {
          return jsonResponse({ ok: false, error: 'AUTH_REQUIRED' }, 401);
        }
        if (!ensureGithubOauthConfig(env)) {
          return jsonResponse({ ok: false, error: 'OAUTH_NOT_CONFIGURED' }, 503);
        }
        const code = url.searchParams.get('code') || '';
        const state = url.searchParams.get('state') || '';
        const cookies = parseCookies(request.headers.get('Cookie') || '');
        const rawSealed = cookies.get(auth.policy.stateCookieName) || '';
        const stateSecret = String(env.OAUTH_STATE_SECRET || env.EMAIL_ENCRYPTION_KEY_B64);
        const sealed = await unsealEphemeralCookieState(rawSealed, stateSecret, 600_000);
        if (
          !code ||
          !state ||
          !sealed ||
          sealed.provider !== 'github' ||
          !constantTimeEqual(state, sealed.state) ||
          !constantTimeEqual(auth.user.id, sealed.userId)
        ) {
          return jsonResponse({ ok: false, error: 'INVALID_OAUTH_STATE' }, 400);
        }

        const tokenRes = await fetchFn(
          String(env.OAUTH_GITHUB_TOKEN_URL || 'https://github.com/login/oauth/access_token'),
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Accept: 'application/json'
            },
            body: new URLSearchParams({
              client_id: String(env.GITHUB_CLIENT_ID),
              client_secret: String(env.GITHUB_CLIENT_SECRET),
              code,
              redirect_uri: sealed.redirectUri,
              code_verifier: sealed.codeVerifier
            }).toString()
          }
        );
        if (!tokenRes.ok) {
          return jsonResponse({ ok: false, error: 'GITHUB_TOKEN_EXCHANGE_FAILED' }, 502);
        }
        const tokenJson = await tokenRes.json();
        const accessToken = String(tokenJson?.access_token || '');
        if (!accessToken) {
          return jsonResponse({ ok: false, error: 'GITHUB_MISSING_ACCESS_TOKEN' }, 502);
        }

        const ghRes = await fetchFn(
          String(env.OAUTH_GITHUB_USER_URL || 'https://api.github.com/user'),
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: 'application/vnd.github+json',
              'User-Agent': 'Academia-Libre-Edge'
            }
          }
        );
        if (!ghRes.ok) {
          return jsonResponse({ ok: false, error: 'GITHUB_USERINFO_FAILED' }, 502);
        }
        const ghUser = await ghRes.json();
        const providerUserId = String(ghUser?.id ?? '').trim();
        const providerLogin = String(ghUser?.login || '').trim();
        if (!providerUserId || !/^[a-zA-Z0-9-]{1,39}$/.test(providerLogin)) {
          return jsonResponse({ ok: false, error: 'INVALID_GITHUB_USER_PAYLOAD' }, 400);
        }

        const linkOutcome = await linkGithubAccountForUser(env.DB, {
          userId: auth.user.id,
          providerUserId,
          providerLogin,
          nowIso: new Date().toISOString()
        });
        if (linkOutcome.conflict) {
          return jsonResponse({ ok: false, error: linkOutcome.reason }, 409);
        }

        return redirectWithCookies('/perfil/?github=linked', [
          formatOauthStateCookie(auth.policy, '', 0)
        ]);
      }

      if (pathname === '/api/auth/logout' && method === 'POST') {
        const auth = await resolveAuthenticatedSession(request, env);
        if (env.DB && auth.tokenSha256) {
          await deleteSessionByHash(env.DB, auth.tokenSha256);
        }
        const headers = new Headers({
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'no-store, max-age=0'
        });
        if (auth.policy.allowed) {
          for (const c of formatSessionCookies(auth.policy, '', 0)) {
            headers.append('Set-Cookie', c);
          }
        }
        return withSecurityHeaders(
          new Response(JSON.stringify({ ok: true, authenticated: false }), { status: 200, headers })
        );
      }

      // ------------------------------------------------------------------
      // 2. Public Avatar Retrieval & Public Ed25519 Certificate Verification
      // ------------------------------------------------------------------
      if (pathname.startsWith('/api/avatars/') && method === 'GET') {
        const match = /^\/api\/avatars\/([a-zA-Z0-9-]{8,64})\.webp$/.exec(pathname);
        if (!match) {
          return jsonResponse({ ok: false, error: 'INVALID_AVATAR_PATH' }, 400);
        }
        if (!env.AVATARS_BUCKET) {
          return jsonResponse({ ok: false, error: 'AVATARS_BUCKET_UNAVAILABLE' }, 503);
        }
        const obj = await env.AVATARS_BUCKET.get(`avatars/${match[1]}.webp`);
        if (!obj) {
          return jsonResponse({ ok: false, error: 'AVATAR_NOT_FOUND' }, 404);
        }
        const bytes = await obj.arrayBuffer();
        return withSecurityHeaders(
          new Response(bytes, {
            status: 200,
            headers: {
              'Content-Type': 'image/webp',
              'Content-Security-Policy': "default-src 'none'; sandbox",
              'Cache-Control': 'public, max-age=300'
            }
          })
        );
      }

      if (pathname === '/api/certificates/public-key' && method === 'GET') {
        try {
          const { publicJwk } = await resolveEd25519SigningPair(env);
          return jsonResponse({ ok: true, publicJwk });
        } catch (err) {
          return jsonResponse({ ok: false, error: String(err?.message || 'CERT_KEY_UNAVAILABLE') }, 503);
        }
      }

      if (pathname.startsWith('/api/certificates/') && pathname !== '/api/certificates/issue' && method === 'GET') {
        if (!env.DB) return jsonResponse({ ok: false, error: 'D1_BINDING_UNAVAILABLE' }, 503);
        const codeMatch = /^\/api\/certificates\/([A-Z0-9-]{8,48})$/i.exec(pathname);
        if (!codeMatch) {
          return jsonResponse({ ok: false, error: 'INVALID_CERTIFICATE_CODE' }, 400);
        }
        const certRow = await findCertificateByCode(env.DB, codeMatch[1]);
        if (!certRow) {
          return jsonResponse({ ok: false, error: 'CERTIFICATE_NOT_FOUND' }, 404);
        }
        const { publicJwk } = await resolveEd25519SigningPair(env);
        const validSignature = await verifyCertificatePayloadEd25519(
          certRow.payload_json,
          certRow.ed25519_signature,
          publicJwk
        );
        return jsonResponse({
          ok: true,
          found: true,
          validSignature,
          certCode: certRow.cert_code,
          payloadJson: certRow.payload_json,
          payload: JSON.parse(certRow.payload_json),
          ed25519Signature: certRow.ed25519_signature,
          issuedAt: certRow.issued_at,
          publicJwk
        });
      }

      // ------------------------------------------------------------------
      // 3. Public Community Read Routes (`GET /api/community/*` — Ley 25.326) & Profile Read (`GET /api/me`)
      // ------------------------------------------------------------------
      if (pathname === '/api/community/threads' && method === 'GET') {
        const qLevel = url.searchParams.get('level') || '';
        const qCategory = url.searchParams.get('category') || '';
        const qPathId = url.searchParams.get('pathId') || '';
        const qLessonSlug = url.searchParams.get('lessonSlug') || '';
        if (qLevel && !['1', '2', '3'].includes(qLevel)) {
          return jsonResponse({ ok: false, error: 'VALIDATION_FAILED' }, 400);
        }
        if (qCategory && !FORUM_CATEGORIES.includes(qCategory)) {
          return jsonResponse({ ok: false, error: 'VALIDATION_FAILED' }, 400);
        }
        if (qPathId && !PATH_IDS.includes(qPathId)) {
          return jsonResponse({ ok: false, error: 'VALIDATION_FAILED' }, 400);
        }
        if (qLessonSlug && !/^[a-z0-9-]{1,80}$/.test(qLessonSlug)) {
          return jsonResponse({ ok: false, error: 'VALIDATION_FAILED' }, 400);
        }
        if (!env.DB) {
          return jsonResponse({ ok: true, threads: [], offlineStatic: true });
        }
        const threads = await listForumThreads(env.DB, {
          level: qLevel ? Number(qLevel) : null,
          category: qCategory,
          pathId: qPathId,
          lessonSlug: qLessonSlug
        });
        return jsonResponse({ ok: true, threads });
      }

      if (pathname.startsWith('/api/community/threads/') && method === 'GET') {
        const m = /^\/api\/community\/threads\/([^/]+)$/.exec(pathname);
        if (!m) return jsonResponse({ ok: false, error: 'API_ROUTE_NOT_FOUND' }, 404);
        const threadId = m[1];
        if (/^\d+$/.test(threadId)) {
          return jsonResponse({ ok: false, error: 'OPAQUE_UUID_OR_ULID_REQUIRED' }, 400);
        }
        if (!/^[a-zA-Z0-9-]{8,64}$/.test(threadId)) {
          return jsonResponse({ ok: false, error: 'INVALID_THREAD_ID' }, 400);
        }
        if (!env.DB) {
          return jsonResponse({ ok: false, error: 'D1_BINDING_UNAVAILABLE' }, 503);
        }
        const detail = await getForumThreadWithReplies(env.DB, threadId);
        if (!detail) {
          return jsonResponse({ ok: false, error: 'THREAD_NOT_FOUND' }, 404);
        }
        return jsonResponse({ ok: true, ...detail });
      }

      if (pathname.startsWith('/api/community/chat/') && method === 'GET') {
        const m = /^\/api\/community\/chat\/([123])$/.exec(pathname);
        if (!m) {
          return jsonResponse({ ok: false, error: 'INVALID_CHAT_ROOM_LEVEL' }, 400);
        }
        const roomLevel = Number(m[1]);
        const isWsUpgrade = (request.headers.get('Upgrade') || '').toLowerCase() === 'websocket';
        if (isWsUpgrade) {
          if (env.LEVEL_CHAT_ROOMS && typeof env.LEVEL_CHAT_ROOMS.idFromName === 'function') {
            const doId = env.LEVEL_CHAT_ROOMS.idFromName(`level-${roomLevel}`);
            return env.LEVEL_CHAT_ROOMS.get(doId).fetch(request);
          }
          return jsonResponse({ ok: false, error: 'WEBSOCKET_DO_UNAVAILABLE' }, 501);
        }
        if (!env.DB) {
          return jsonResponse({
            ok: true,
            roomLevel,
            realtimeAvailable: Boolean(env.LEVEL_CHAT_ROOMS),
            messages: []
          });
        }
        const messages = await listChatMessages(env.DB, roomLevel, 50);
        return jsonResponse({
          ok: true,
          roomLevel,
          realtimeAvailable: Boolean(env.LEVEL_CHAT_ROOMS),
          messages
        });
      }

      if (pathname === '/api/me' && method === 'GET') {
        if (!env.DB) {
          return jsonResponse({ ok: true, authenticated: false, user: null });
        }
        const auth = await resolveAuthenticatedSession(request, env);
        if (!auth.user) {
          return jsonResponse({ ok: true, authenticated: false, user: null });
        }
        const state = await getUserDashboardState(env.DB, auth.user);
        return jsonResponse({ ok: true, authenticated: true, ...state });
      }

      // ------------------------------------------------------------------
      // 4. Authenticated Routes (Profile, Onboarding, Progress, Milestones, Avatar, Certs, Ley 25.326)
      // ------------------------------------------------------------------
      if (!env.DB) {
        return jsonResponse({ ok: false, error: 'D1_BINDING_UNAVAILABLE' }, 503);
      }
      const auth = await resolveAuthenticatedSession(request, env);
      if (!auth.user) {
        return jsonResponse({ ok: false, error: 'AUTH_REQUIRED' }, 401);
      }
      const sessionUser = auth.user;

      if (pathname === '/api/me' && method === 'PATCH') {
        const bodyRes = await readBoundedJsonBody(request);
        if (!bodyRes.ok) return jsonResponse({ ok: false, error: bodyRes.error }, bodyRes.status);
        const parsed = v.safeParse(ProfileUpdateSchema, bodyRes.data);
        if (!parsed.success) {
          return jsonResponse({ ok: false, error: 'VALIDATION_FAILED' }, 400);
        }
        const d = parsed.output;
        const linkedIn =
          d.linkedinUrl !== undefined
            ? normalizeLinkedInUrl(d.linkedinUrl)
            : { valid: true, handle: sessionUser.linkedin_handle };
        if (!linkedIn.valid) {
          return jsonResponse({ ok: false, error: 'INVALID_SOCIAL_PROFILE_URL', field: 'linkedinUrl' }, 400);
        }
        const xNorm =
          d.xUrl !== undefined ? normalizeXUrl(d.xUrl) : { valid: true, handle: sessionUser.x_handle };
        if (!xNorm.valid) {
          return jsonResponse({ ok: false, error: 'INVALID_SOCIAL_PROFILE_URL', field: 'xUrl' }, 400);
        }

        const updatedRow = await updateUserProfile(env.DB, sessionUser.id, {
          displayName: d.displayName ? d.displayName.replace(/[<>]/g, '') : sessionUser.display_name,
          activePathId: d.activePathId || sessionUser.active_path_id,
          hardwareArchetypeId: d.hardwareArchetypeId || sessionUser.hardware_archetype_id,
          linkedinHandle: linkedIn.handle,
          xHandle: xNorm.handle,
          nowIso: new Date().toISOString()
        });
        const dashboard = await getUserDashboardState(env.DB, updatedRow);
        return jsonResponse({ ok: true, ...dashboard });
      }

      if (pathname === '/api/me/onboarding' && method === 'POST') {
        const bodyRes = await readBoundedJsonBody(request);
        if (!bodyRes.ok) return jsonResponse({ ok: false, error: bodyRes.error }, bodyRes.status);
        const parsed = v.safeParse(OnboardingSchema, bodyRes.data);
        if (!parsed.success) {
          return jsonResponse({ ok: false, error: 'VALIDATION_FAILED' }, 400);
        }
        const calibration = evaluateCalibrationCases(parsed.output);
        const updatedRow = await completeUserOnboarding(env.DB, sessionUser.id, {
          activePathId: parsed.output.activePathId,
          hardwareArchetypeId: parsed.output.hardwareArchetypeId,
          calibratedLevel: calibration.calibratedLevel,
          nowIso: new Date().toISOString()
        });
        const dashboard = await getUserDashboardState(env.DB, updatedRow);
        return jsonResponse({ ok: true, calibration, ...dashboard });
      }

      if (pathname === '/api/progress/event' && method === 'POST') {
        const bodyRes = await readBoundedJsonBody(request);
        if (!bodyRes.ok) return jsonResponse({ ok: false, error: bodyRes.error }, bodyRes.status);
        const parsed = v.safeParse(ProgressEventItemSchema, bodyRes.data);
        if (!parsed.success || !isAllowedLessonEvent(parsed.output.lessonId, parsed.output.eventType)) {
          return jsonResponse({ ok: false, error: 'INVALID_PROGRESS_EVENT' }, 400);
        }
        const outcome = await recordIdempotentProgressEvent(env.DB, {
          id: crypto.randomUUID(),
          userId: sessionUser.id,
          lessonId: parsed.output.lessonId,
          eventType: parsed.output.eventType,
          scoreJson: parsed.output.scoreJson || '{}',
          nowIso: new Date().toISOString()
        });
        const freshUser = await getUserById(env.DB, sessionUser.id);
        const dashboard = await getUserDashboardState(env.DB, freshUser);
        return jsonResponse({ ok: true, eventResult: outcome, ...dashboard });
      }

      if (pathname === '/api/progress/sync' && method === 'POST') {
        const bodyRes = await readBoundedJsonBody(request);
        if (!bodyRes.ok) return jsonResponse({ ok: false, error: bodyRes.error }, bodyRes.status);
        const parsed = v.safeParse(ProgressSyncSchema, bodyRes.data);
        if (!parsed.success) {
          return jsonResponse({ ok: false, error: 'VALIDATION_FAILED' }, 400);
        }
        let insertedCount = 0;
        const nowIso = new Date().toISOString();
        for (const ev of parsed.output.events) {
          if (!isAllowedLessonEvent(ev.lessonId, ev.eventType)) {
            return jsonResponse({ ok: false, error: 'INVALID_PROGRESS_EVENT' }, 400);
          }
          const outcome = await recordIdempotentProgressEvent(env.DB, {
            id: crypto.randomUUID(),
            userId: sessionUser.id,
            lessonId: ev.lessonId,
            eventType: ev.eventType,
            scoreJson: ev.scoreJson || '{}',
            nowIso
          });
          if (outcome.inserted) insertedCount += 1;
        }
        const freshUser = await getUserById(env.DB, sessionUser.id);
        const dashboard = await getUserDashboardState(env.DB, freshUser);
        return jsonResponse({ ok: true, insertedCount, ...dashboard });
      }

      if (pathname === '/api/milestones/verify' && method === 'POST') {
        const bodyRes = await readBoundedJsonBody(request);
        if (!bodyRes.ok) return jsonResponse({ ok: false, error: bodyRes.error }, bodyRes.status);
        const parsed = v.safeParse(MilestoneVerifySchema, bodyRes.data);
        if (!parsed.success) {
          return jsonResponse({ ok: false, error: 'VALIDATION_FAILED' }, 400);
        }
        const oauthAccounts = await listOAuthAccountsForUser(env.DB, sessionUser.id);
        const ghAccount = oauthAccounts.find((a) => a.provider === 'github');
        const repoCheck = parsed.output.githubRepoUrl
          ? validateGithubRepoUrl(parsed.output.githubRepoUrl, ghAccount?.provider_login || null)
          : { valid: true, normalizedUrl: null };
        if (!repoCheck.valid) {
          return jsonResponse({ ok: false, error: repoCheck.error }, 400);
        }
        const outcome = await recordIdempotentMilestone(env.DB, {
          id: crypto.randomUUID(),
          userId: sessionUser.id,
          pathId: parsed.output.pathId,
          milestoneIndex: parsed.output.milestoneIndex,
          githubRepoUrl: repoCheck.normalizedUrl,
          commitSha: parsed.output.commitSha || null,
          nowIso: new Date().toISOString()
        });
        const freshUser = await getUserById(env.DB, sessionUser.id);
        const dashboard = await getUserDashboardState(env.DB, freshUser);
        return jsonResponse({ ok: true, milestoneResult: outcome, ...dashboard });
      }

      if (pathname === '/api/me/avatar' && method === 'PUT') {
        if (!env.AVATARS_BUCKET) {
          return jsonResponse({ ok: false, error: 'AVATARS_BUCKET_UNAVAILABLE' }, 503);
        }
        const bodyRes = await readBoundedBinaryBody(request, MAX_AVATAR_BYTES);
        if (!bodyRes.ok) return jsonResponse({ ok: false, error: bodyRes.error }, bodyRes.status);
        const check = validateStrictWebpAvatarBytes(bodyRes.bytes, {
          maxBytes: MAX_AVATAR_BYTES,
          maxDimension: 256
        });
        if (!check.valid) {
          return jsonResponse({ ok: false, error: check.error }, check.status);
        }
        const avatarKey = `avatars/${sessionUser.id}.webp`;
        await env.AVATARS_BUCKET.put(avatarKey, bodyRes.bytes, {
          httpMetadata: { contentType: 'image/webp' }
        });
        await updateUserAvatarKey(env.DB, sessionUser.id, avatarKey, new Date().toISOString());
        return jsonResponse({
          ok: true,
          avatarUrl: `/api/avatars/${sessionUser.id}.webp`,
          width: check.width,
          height: check.height,
          byteLength: check.byteLength
        });
      }

      if (pathname === '/api/certificates/issue' && method === 'POST') {
        const bodyRes = await readBoundedJsonBody(request);
        if (!bodyRes.ok) return jsonResponse({ ok: false, error: bodyRes.error }, bodyRes.status);
        const parsed = v.safeParse(CertificateIssueSchema, bodyRes.data);
        if (!parsed.success) {
          return jsonResponse({ ok: false, error: 'VALIDATION_FAILED' }, 400);
        }
        const level = parsed.output.level;
        const targetPathId = parsed.output.pathId || sessionUser.active_path_id;
        const dashboard = await getUserDashboardState(env.DB, sessionUser);
        const levelSummary = dashboard.progress.levels[level];
        if (!levelSummary || !levelSummary.eligibleForCertificate) {
          return jsonResponse(
            {
              ok: false,
              error: 'LEVEL_REQUIREMENTS_INCOMPLETE',
              missingItems: levelSummary?.missingItems || []
            },
            403
          );
        }

        const existingCert = await findCertificateByUserLevelPath(env.DB, sessionUser.id, level, targetPathId);
        const { signingKey, publicJwk } = await resolveEd25519SigningPair(env);
        if (existingCert) {
          return jsonResponse({
            ok: true,
            alreadyIssued: true,
            certificate: existingCert,
            payload: JSON.parse(existingCert.payload_json),
            publicJwk
          });
        }

        const matchingMilestone = dashboard.milestones.find(
          (m) => m.path_id === targetPathId && Number(m.milestone_index) === level && m.github_repo_url
        );
        const githubRepoUrl = matchingMilestone?.github_repo_url || dashboard.user.githubUrl || null;
        const nowIso = new Date().toISOString();
        const certCode = `AL-${new Date().getUTCFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
        const pathMeta = PATH_CATALOG[targetPathId] || PATH_CATALOG.uso_cotidiano;
        const canonicalJson = buildCanonicalCertificatePayloadString({
          certCode,
          issuedAt: nowIso,
          level,
          levelLabel: LEVEL_LABELS_ES[level],
          pathId: targetPathId,
          pathTitleEs: pathMeta.titleEs,
          recipientName: sessionUser.display_name,
          githubRepoUrl,
          issuer: 'Academia Libre'
        });
        const signature = await signCertificatePayloadEd25519(canonicalJson, signingKey);
        const inserted = await insertCertificate(env.DB, {
          certCode,
          userId: sessionUser.id,
          recipientName: sessionUser.display_name,
          level,
          pathId: targetPathId,
          githubRepoUrl,
          payloadJson: canonicalJson,
          ed25519Signature: signature,
          issuedAt: nowIso
        });
        return jsonResponse(
          {
            ok: true,
            certificate: inserted,
            payload: JSON.parse(canonicalJson),
            publicJwk
          },
          201
        );
      }

      if (pathname.startsWith('/api/community/') && method === 'POST') {
        if (Number(sessionUser.xp_total || 0) < COMMUNITY_MIN_XP_TO_POST) {
          return jsonResponse(
            {
              ok: false,
              error: 'INSUFFICIENT_XP_FOR_POSTING',
              requiredXp: COMMUNITY_MIN_XP_TO_POST,
              currentXp: Number(sessionUser.xp_total || 0)
            },
            403
          );
        }

        const runModerationAndAudit = async (surface, modInput) => {
          const modRes = await evaluateModerationCascade({
            ...modInput,
            siteOrigin: url.origin,
            env
          });
          if (!modRes.allowed) {
            const userIdHash = await sha256Hex(`mod:${sessionUser.id}`);
            await recordModerationAuditLog(env.DB, {
              id: crypto.randomUUID(),
              userIdHash,
              surface,
              reasonCode: modRes.reasonCode,
              createdAt: new Date().toISOString()
            });
            return {
              blockedResponse: jsonResponse(
                {
                  ok: false,
                  error: 'MODERATION_BLOCKED',
                  reasonCode: modRes.reasonCode,
                  layer: modRes.layer
                },
                422
              )
            };
          }
          return { blockedResponse: null, normalizedAttachedUrl: modRes.normalizedAttachedUrl };
        };

        const broadcastRoomEvent = async (roomLevel, eventObj) => {
          if (env.LEVEL_CHAT_ROOMS && typeof env.LEVEL_CHAT_ROOMS.idFromName === 'function') {
            try {
              const doId = env.LEVEL_CHAT_ROOMS.idFromName(`level-${roomLevel}`);
              const stub = env.LEVEL_CHAT_ROOMS.get(doId);
              await stub.fetch(
                new Request('https://level-chat-room.internal/internal/broadcast', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(eventObj)
                })
              );
            } catch {}
          }
        };

        if (pathname === '/api/community/threads') {
          const bodyRes = await readBoundedJsonBody(request);
          if (!bodyRes.ok) return jsonResponse({ ok: false, error: bodyRes.error }, bodyRes.status);
          const parsed = v.safeParse(ForumThreadCreateSchema, bodyRes.data);
          if (!parsed.success) {
            return jsonResponse({ ok: false, error: 'VALIDATION_FAILED' }, 400);
          }
          const d = parsed.output;
          if (d.lessonSlug && !/^[a-z0-9-]{2,80}$/.test(d.lessonSlug)) {
            return jsonResponse({ ok: false, error: 'VALIDATION_FAILED' }, 400);
          }
          const mod = await runModerationAndAudit('forum_thread', {
            textFields: [d.title, d.bodyMd],
            attachedUrl: d.attachedRepoUrl || '',
            requireRepoHost: true
          });
          if (mod.blockedResponse) return mod.blockedResponse;

          const thread = await insertForumThread(env.DB, {
            id: crypto.randomUUID(),
            authorId: sessionUser.id,
            level: d.level,
            category: d.category,
            pathId: d.pathId || sessionUser.active_path_id || 'uso_cotidiano',
            lessonSlug: d.lessonSlug || null,
            title: d.title.replace(/[<>]/g, ''),
            bodyMd: d.bodyMd.replace(/[<>]/g, ''),
            attachedRepoUrl: mod.normalizedAttachedUrl,
            createdAt: new Date().toISOString()
          });
          return jsonResponse({ ok: true, thread }, 201);
        }

        const replyMatch = /^\/api\/community\/threads\/([^/]+)\/replies$/.exec(pathname);
        if (replyMatch) {
          const threadId = replyMatch[1];
          if (/^\d+$/.test(threadId)) {
            return jsonResponse({ ok: false, error: 'OPAQUE_UUID_OR_ULID_REQUIRED' }, 400);
          }
          if (!/^[a-zA-Z0-9-]{8,64}$/.test(threadId)) {
            return jsonResponse({ ok: false, error: 'INVALID_THREAD_ID' }, 400);
          }
          const bodyRes = await readBoundedJsonBody(request);
          if (!bodyRes.ok) return jsonResponse({ ok: false, error: bodyRes.error }, bodyRes.status);
          const parsed = v.safeParse(ForumReplyCreateSchema, bodyRes.data);
          if (!parsed.success) {
            return jsonResponse({ ok: false, error: 'VALIDATION_FAILED' }, 400);
          }
          const mod = await runModerationAndAudit('forum_reply', {
            textFields: [parsed.output.bodyMd]
          });
          if (mod.blockedResponse) return mod.blockedResponse;

          const reply = await insertForumReply(env.DB, {
            id: crypto.randomUUID(),
            threadId,
            authorId: sessionUser.id,
            bodyMd: parsed.output.bodyMd.replace(/[<>]/g, ''),
            createdAt: new Date().toISOString()
          });
          if (!reply) {
            return jsonResponse({ ok: false, error: 'THREAD_NOT_FOUND' }, 404);
          }
          return jsonResponse({ ok: true, reply }, 201);
        }

        const chatMatch = /^\/api\/community\/chat\/([123])$/.exec(pathname);
        if (chatMatch) {
          const roomLevel = Number(chatMatch[1]);
          const bodyRes = await readBoundedJsonBody(request);
          if (!bodyRes.ok) return jsonResponse({ ok: false, error: bodyRes.error }, bodyRes.status);
          const parsed = v.safeParse(ChatMessageCreateSchema, bodyRes.data);
          if (!parsed.success) {
            return jsonResponse({ ok: false, error: 'VALIDATION_FAILED' }, 400);
          }
          const mod = await runModerationAndAudit('chat_message', {
            textFields: [parsed.output.bodyText],
            attachedUrl: parsed.output.attachedUrl || '',
            requireRepoHost: false
          });
          if (mod.blockedResponse) return mod.blockedResponse;

          const message = await insertChatMessage(env.DB, {
            id: crypto.randomUUID(),
            roomLevel,
            authorId: sessionUser.id,
            bodyText: parsed.output.bodyText.replace(/[<>]/g, ''),
            attachedUrl: mod.normalizedAttachedUrl,
            createdAt: new Date().toISOString()
          });
          await broadcastRoomEvent(roomLevel, { type: 'new_message', roomLevel, message });
          return jsonResponse({ ok: true, message }, 201);
        }

        if (pathname === '/api/community/reports') {
          const bodyRes = await readBoundedJsonBody(request);
          if (!bodyRes.ok) return jsonResponse({ ok: false, error: bodyRes.error }, bodyRes.status);
          const parsed = v.safeParse(CommunityReportCreateSchema, bodyRes.data);
          if (!parsed.success) {
            return jsonResponse({ ok: false, error: 'VALIDATION_FAILED' }, 400);
          }
          const mod = await runModerationAndAudit('report', {
            textFields: [parsed.output.reason]
          });
          if (mod.blockedResponse) return mod.blockedResponse;

          const outcome = await submitCommunityReport(env.DB, {
            id: crypto.randomUUID(),
            targetType: parsed.output.targetType,
            targetId: parsed.output.targetId,
            reporterUserId: sessionUser.id,
            reason: parsed.output.reason.replace(/[<>]/g, ''),
            createdAt: new Date().toISOString()
          });
          if (!outcome.found) {
            return jsonResponse({ ok: false, error: 'TARGET_NOT_FOUND' }, 404);
          }
          if (outcome.autoHidden && parsed.output.targetType === 'chat_message' && outcome.roomLevel) {
            await broadcastRoomEvent(outcome.roomLevel, {
              type: 'message_hidden',
              targetId: parsed.output.targetId
            });
          }
          return jsonResponse({ ok: true, ...outcome });
        }

        return jsonResponse({ ok: false, error: 'API_ROUTE_NOT_FOUND' }, 404);
      }

      if (pathname === '/api/me/export' && method === 'GET') {
        const plainEmail = env.EMAIL_ENCRYPTION_KEY_B64
          ? await decryptEmailAesGcm(sessionUser.email_ciphertext, env.EMAIL_ENCRYPTION_KEY_B64, sessionUser.id)
          : '[ENCRYPTION_KEY_UNAVAILABLE]';
        const [dashboard, communityActivity] = await Promise.all([
          getUserDashboardState(env.DB, sessionUser),
          listUserCommunityContributionsForExport(env.DB, sessionUser.id)
        ]);
        const exportBundle = {
          legalBasis: 'Ley 25.326 — Derecho de Acceso y Portabilidad de Datos Personales',
          exportedAt: new Date().toISOString(),
          account: {
            ...dashboard.user,
            email: plainEmail
          },
          progressSummary: dashboard.progress,
          lessonProgressLedger: dashboard.ledger,
          projectMilestones: dashboard.milestones,
          certificates: dashboard.certificates,
          communityActivity
        };
        return withSecurityHeaders(
          new Response(JSON.stringify(exportBundle, null, 2), {
            status: 200,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              'Content-Disposition': `attachment; filename="academia-libre-datos-${sessionUser.id.slice(0, 8)}.json"`,
              'Cache-Control': 'no-store, max-age=0'
            }
          })
        );
      }

      if (pathname === '/api/me' && method === 'DELETE') {
        if (sessionUser.avatar_key && env.AVATARS_BUCKET) {
          await env.AVATARS_BUCKET.delete(sessionUser.avatar_key);
        }
        await deleteUserCascade(env.DB, sessionUser.id);
        const headers = new Headers({
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'no-store, max-age=0'
        });
        for (const c of formatSessionCookies(auth.policy, '', 0)) {
          headers.append('Set-Cookie', c);
        }
        return withSecurityHeaders(
          new Response(
            JSON.stringify({
              ok: true,
              deleted: true,
              legalBasis: 'Ley 25.326 — Supresión total en cascada completada'
            }),
            { status: 200, headers }
          )
        );
      }

      return jsonResponse({ ok: false, error: 'API_ROUTE_NOT_FOUND' }, 404);
    } catch {
      return jsonResponse({ ok: false, error: 'INTERNAL_EDGE_ERROR' }, 500);
    }
  }
};
