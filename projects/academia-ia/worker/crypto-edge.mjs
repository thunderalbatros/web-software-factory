/**
 * crypto-edge.mjs — Pure WebCrypto Primitives for Cloudflare Workers & Node.js v24
 * Covers: AES-256-GCM email encryption + ephemeral cookie sealing, HMAC-SHA256 blind indexing,
 * OAuth 2.1 PKCE S256 challenge/verifier, session token hashing, and Ed25519 certificate signatures.
 */

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

export function toBase64Url(input) {
  const bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
  let bin = '';
  for (let i = 0; i < bytes.length; i++) {
    bin += String.fromCharCode(bytes[i]);
  }
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

export function fromBase64Url(b64Url = '') {
  const b64 = String(b64Url || '').replace(/-/g, '+').replace(/_/g, '/');
  const pad = b64.length % 4 === 0 ? b64 : b64 + '='.repeat(4 - (b64.length % 4));
  const bin = atob(pad);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    out[i] = bin.charCodeAt(i);
  }
  return out;
}

export function bytesToHex(bytes) {
  return Array.from(bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function randomTokenBase64Url(byteLength = 32) {
  const buf = new Uint8Array(byteLength);
  crypto.getRandomValues(buf);
  return toBase64Url(buf);
}

export async function sha256Hex(value = '') {
  const digest = await crypto.subtle.digest('SHA-256', textEncoder.encode(String(value || '')));
  return bytesToHex(new Uint8Array(digest));
}

export function constantTimeEqual(a = '', b = '') {
  const sA = String(a);
  const sB = String(b);
  if (!sA || sA.length !== sB.length) return false;
  let diff = 0;
  for (let i = 0; i < sA.length; i++) {
    diff |= sA.charCodeAt(i) ^ sB.charCodeAt(i);
  }
  return diff === 0;
}

export async function generatePkcePair() {
  const codeVerifier = randomTokenBase64Url(32);
  const challengeDigest = await crypto.subtle.digest('SHA-256', textEncoder.encode(codeVerifier));
  const codeChallenge = toBase64Url(new Uint8Array(challengeDigest));
  return { codeVerifier, codeChallenge, method: 'S256' };
}

async function importAes256Key(keyMaterial) {
  const raw = String(keyMaterial || '').trim();
  if (!raw) throw new Error('MISSING_AES_KEY_MATERIAL');
  let keyBytes;
  if (/^[0-9a-f]{64}$/i.test(raw)) {
    keyBytes = new Uint8Array(32);
    for (let i = 0; i < 32; i++) {
      keyBytes[i] = Number.parseInt(raw.slice(i * 2, i * 2 + 2), 16);
    }
  } else {
    const decoded = fromBase64Url(raw);
    if (decoded.byteLength === 32) {
      keyBytes = decoded;
    } else {
      const hashed = await crypto.subtle.digest('SHA-256', textEncoder.encode(raw));
      keyBytes = new Uint8Array(hashed);
    }
  }
  return crypto.subtle.importKey('raw', keyBytes, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
}

export async function encryptEmailAesGcm(email, keyMaterial, userIdAad) {
  const normalized = String(email || '').trim().toLowerCase();
  if (!normalized || !userIdAad) throw new Error('EMAIL_AND_AAD_REQUIRED');
  const key = await importAes256Key(keyMaterial);
  const iv = new Uint8Array(12);
  crypto.getRandomValues(iv);
  const cipherBuf = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv, additionalData: textEncoder.encode(String(userIdAad)) },
    key,
    textEncoder.encode(normalized)
  );
  return `v1.${toBase64Url(iv)}.${toBase64Url(new Uint8Array(cipherBuf))}`;
}

export async function decryptEmailAesGcm(ciphertext, keyMaterial, userIdAad) {
  const parts = String(ciphertext || '').split('.');
  if (parts.length !== 3 || parts[0] !== 'v1') {
    throw new Error('INVALID_EMAIL_CIPHERTEXT_FORMAT');
  }
  const key = await importAes256Key(keyMaterial);
  const iv = fromBase64Url(parts[1]);
  const cipherBytes = fromBase64Url(parts[2]);
  const plainBuf = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv, additionalData: textEncoder.encode(String(userIdAad)) },
    key,
    cipherBytes
  );
  return textDecoder.decode(plainBuf);
}

export async function computeEmailBlindIndex(email, hmacSecret) {
  const secret = String(hmacSecret || '').trim();
  if (!secret) throw new Error('MISSING_BLIND_INDEX_HMAC_SECRET');
  const normalized = String(email || '').trim().toLowerCase();
  if (!normalized) throw new Error('MISSING_EMAIL_FOR_BLIND_INDEX');
  const hmacKey = await crypto.subtle.importKey(
    'raw',
    textEncoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sigBuf = await crypto.subtle.sign('HMAC', hmacKey, textEncoder.encode(normalized));
  return bytesToHex(new Uint8Array(sigBuf));
}

export async function sealEphemeralCookieState(payloadObj, keyMaterial) {
  const key = await importAes256Key(keyMaterial);
  const iv = new Uint8Array(12);
  crypto.getRandomValues(iv);
  const wrapped = JSON.stringify({ ...payloadObj, issuedAtMs: Date.now() });
  const cipherBuf = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    textEncoder.encode(wrapped)
  );
  return `st1.${toBase64Url(iv)}.${toBase64Url(new Uint8Array(cipherBuf))}`;
}

export async function unsealEphemeralCookieState(sealed, keyMaterial, maxAgeMs = 600_000) {
  const parts = String(sealed || '').split('.');
  if (parts.length !== 3 || parts[0] !== 'st1') return null;
  try {
    const key = await importAes256Key(keyMaterial);
    const iv = fromBase64Url(parts[1]);
    const cipherBytes = fromBase64Url(parts[2]);
    const plainBuf = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, cipherBytes);
    const parsed = JSON.parse(textDecoder.decode(plainBuf));
    if (!parsed || typeof parsed.issuedAtMs !== 'number') return null;
    if (Date.now() - parsed.issuedAtMs > maxAgeMs || Date.now() + 30_000 < parsed.issuedAtMs) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function normalizeEd25519PublicJwk(pubJwk) {
  if (!pubJwk) return null;
  let parsed;
  try {
    parsed = typeof pubJwk === 'string' ? JSON.parse(pubJwk) : pubJwk;
  } catch {
    return null;
  }
  if (!parsed || typeof parsed !== 'object' || !parsed.x) return null;
  return {
    kty: 'OKP',
    crv: 'Ed25519',
    x: String(parsed.x)
  };
}

let devEphemeralEd25519Promise = null;

export async function resolveEd25519SigningPair(env = {}) {
  const privRaw = env?.CERT_ED25519_PRIVATE_JWK;
  const pubRaw = env?.CERT_ED25519_PUBLIC_JWK;
  if (privRaw && pubRaw) {
    const privJwk = typeof privRaw === 'string' ? JSON.parse(privRaw) : privRaw;
    const pubJwk = normalizeEd25519PublicJwk(pubRaw);
    const signingKey = await crypto.subtle.importKey('jwk', privJwk, 'Ed25519', false, ['sign']);
    return { signingKey, publicJwk: pubJwk };
  }
  const envMode = String(env?.ENVIRONMENT || '').toLowerCase();
  if (envMode !== 'development') {
    throw new Error('CERT_SIGNING_KEY_NOT_CONFIGURED');
  }
  if (!devEphemeralEd25519Promise) {
    devEphemeralEd25519Promise = (async () => {
      const kp = await crypto.subtle.generateKey('Ed25519', true, ['sign', 'verify']);
      const pubJwk = await crypto.subtle.exportKey('jwk', kp.publicKey);
      return {
        signingKey: kp.privateKey,
        publicJwk: normalizeEd25519PublicJwk(pubJwk)
      };
    })();
  }
  return devEphemeralEd25519Promise;
}

export function buildCanonicalCertificatePayloadString(certPayload) {
  const ordered = {
    certCode: String(certPayload.certCode),
    issuedAt: String(certPayload.issuedAt),
    level: Number(certPayload.level),
    levelLabel: String(certPayload.levelLabel),
    pathId: String(certPayload.pathId),
    pathTitleEs: String(certPayload.pathTitleEs),
    recipientName: String(certPayload.recipientName),
    githubRepoUrl: certPayload.githubRepoUrl ? String(certPayload.githubRepoUrl) : null,
    issuer: String(certPayload.issuer || 'Academia Libre'),
    schema: 'academia-libre-cert-v1'
  };
  return JSON.stringify(ordered);
}

export async function signCertificatePayloadEd25519(canonicalJson, signingKey) {
  const sigBuf = await crypto.subtle.sign('Ed25519', signingKey, textEncoder.encode(canonicalJson));
  return toBase64Url(new Uint8Array(sigBuf));
}

export async function verifyCertificatePayloadEd25519(canonicalJson, signatureB64Url, publicJwk) {
  try {
    const cleanJwk = normalizeEd25519PublicJwk(publicJwk);
    if (!cleanJwk?.x || !signatureB64Url) return false;
    const pubKey = await crypto.subtle.importKey('jwk', cleanJwk, 'Ed25519', false, ['verify']);
    const sigBytes = fromBase64Url(signatureB64Url);
    return await crypto.subtle.verify('Ed25519', pubKey, sigBytes, textEncoder.encode(canonicalJson));
  } catch {
    return false;
  }
}
