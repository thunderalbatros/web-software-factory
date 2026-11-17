/**
 * src/lib/csp-builder.mjs — Standalone Deterministic CSP + Trusted Types Builder (Stage 3C.1)
 * ===========================================================================================
 * Canonical project-local implementation with ZERO parent-monorepo imports or reads.
 * Reads `./data/academy/project_charter.json` strictly local to the project root when building
 * headers for `complianceProfile === 'education'`.
 * ===========================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Project root when located at `<projectRoot>/src/lib/csp-builder.mjs` (zero `..` literals)
const MODULE_PROJECT_ROOT = path.dirname(path.dirname(__dirname));

export const KNOWN_COMPLIANCE_PROFILES = Object.freeze([
  'standard-web',
  'gambling-18plus',
  'education'
]);

export const COMMON_SECURITY_HEADERS = Object.freeze({
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'X-Frame-Options': 'DENY'
});

const EXECUTABLE_SCRIPT_TYPES = new Set([
  '',
  'module',
  'speculationrules',
  'text/javascript',
  'application/javascript',
  'application/ecmascript',
  'text/ecmascript'
]);

function resolveComplianceProfileName(profileOrTarget = 'standard-web', projectRoot = null) {
  const raw = String(profileOrTarget || 'standard-web').trim();
  const lower = raw.toLowerCase();
  if (KNOWN_COMPLIANCE_PROFILES.includes(lower)) {
    return lower;
  }
  const candidateDirs = [];
  if (projectRoot) candidateDirs.push(path.resolve(projectRoot));
  if (fs.existsSync(raw)) candidateDirs.push(path.resolve(raw));
  candidateDirs.push(MODULE_PROJECT_ROOT);

  for (const dir of candidateDirs) {
    const manifestPath = path.join(dir, 'factory.project.json');
    if (fs.existsSync(manifestPath)) {
      try {
        const parsed = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        const cp = String(parsed.complianceProfile || '').toLowerCase();
        if (KNOWN_COMPLIANCE_PROFILES.includes(cp)) return cp;
        const arch = String(parsed.archetype || parsed.industryArchetype || '').toLowerCase();
        if (arch === 'education') return 'education';
        if (arch === 'gambling' || arch === 'casino') return 'gambling-18plus';
      } catch {
        /* ignore malformed manifest */
      }
    }
  }
  return 'standard-web';
}

function loadLocalEducationCharter(projectRoot = null) {
  const roots = [];
  if (projectRoot) roots.push(path.resolve(projectRoot));
  roots.push(MODULE_PROJECT_ROOT);
  roots.push(process.cwd());

  for (const rootDir of roots) {
    const charterPath = path.join(rootDir, 'data', 'academy', 'project_charter.json');
    if (fs.existsSync(charterPath)) {
      try {
        return JSON.parse(fs.readFileSync(charterPath, 'utf8'));
      } catch {
        /* ignore malformed charter */
      }
    }
  }
  return null;
}

/**
 * Computes a W3C CSP Level 3 `sha256-<base64>` token for an inline script/style payload.
 * HTML5 input stream preprocessing normalizes CRLF/CR line breaks to LF prior to hashing.
 */
export function computeCspSha256Token(sourceText = '') {
  const normalized = String(sourceText ?? '').replace(/\r\n?/g, '\n');
  const digest = crypto.createHash('sha256').update(Buffer.from(normalized, 'utf8')).digest('base64');
  return `'sha256-${digest}'`;
}

/**
 * Token-aware detector that catches forbidden `'unsafe-eval'` without ever confusing
 * WebAssembly's W3C-standard `'wasm-unsafe-eval'` token with `'unsafe-eval'`.
 */
export function hasStandaloneUnsafeEval(rawHeaderOrFile = '') {
  const text = String(rawHeaderOrFile || '');
  const tokens = text
    .split(/[\s;,\r\n:]+/)
    .map((tok) => tok.trim().replace(/^['"]|['"]$/g, '').toLowerCase())
    .filter(Boolean);
  return tokens.includes('unsafe-eval');
}

/**
 * Parses CSP directives from a `Content-Security-Policy` value into a Map<directive, string[]>.
 */
export function parseCspDirectives(cspValue = '') {
  const map = new Map();
  const segments = String(cspValue || '')
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean);
  for (const segment of segments) {
    const parts = segment.split(/\s+/).filter(Boolean);
    if (parts.length === 0) continue;
    const name = parts[0].toLowerCase();
    map.set(name, parts.slice(1));
  }
  return map;
}

function uniqueTokens(list = []) {
  const seen = new Set();
  const out = [];
  for (const item of list) {
    const trimmed = String(item || '').trim();
    if (!trimmed || seen.has(trimmed)) continue;
    seen.add(trimmed);
    out.push(trimmed);
  }
  return out;
}

/**
 * Builds the deterministic `Content-Security-Policy` header string for a given profile.
 */
export function buildCspHeaderForProfile(profileName = 'standard-web', options = {}) {
  const complianceProfile = resolveComplianceProfileName(profileName, options.projectRoot);
  const charter = complianceProfile === 'education' ? loadLocalEducationCharter(options.projectRoot) : null;
  const scriptHashes = uniqueTokens(options.scriptHashes || []).sort();
  const styleHashes = uniqueTokens(options.styleHashes || []).sort();

  if (complianceProfile === 'education') {
    const charterCsp = charter?.security_and_csp || {};
    const defaultSrc = uniqueTokens(charterCsp.csp_default_src || ["'self'"]);
    const scriptSrc = uniqueTokens([
      ...(charterCsp.csp_script_src || ["'self'", "'wasm-unsafe-eval'", "'inline-speculation-rules'"]),
      ...scriptHashes
    ]);
    const allowInlineStyles = Boolean(options.allowUnsafeInlineStyles);
    const styleSrc = uniqueTokens([
      "'self'",
      ...(allowInlineStyles ? ["'unsafe-inline'"] : []),
      ...styleHashes
    ]);
    const imgSrc = uniqueTokens(
      charterCsp.csp_img_src || ["'self'", 'data:', 'blob:', 'https://i.ytimg.com', 'https://upload.wikimedia.org']
    );
    const fontSrc = ["'self'", 'data:'];
    const mediaSrc = uniqueTokens(
      charterCsp.csp_media_src || [
        "'self'",
        'https://archive.org',
        'https://upload.wikimedia.org',
        'https://commons.wikimedia.org'
      ]
    );
    const frameSrc = uniqueTokens(
      charterCsp.csp_frame_src || ["'self'", 'https://www.youtube-nocookie.com', 'https://archive.org']
    );
    const connectSrc = uniqueTokens(charterCsp.csp_connect_src || ["'self'"]);
    const trustedTypesPolicies = uniqueTokens(
      charterCsp.trusted_types_policies || ['default', 'dompurify', 'astro-island']
    );
    const requireTrustedTypes = charterCsp.require_trusted_types_for || "'script'";

    const directives = [
      `default-src ${defaultSrc.join(' ')}`,
      `script-src ${scriptSrc.join(' ')}`,
      `style-src ${styleSrc.join(' ')}`,
      `img-src ${imgSrc.join(' ')}`,
      `font-src ${fontSrc.join(' ')}`,
      `media-src ${mediaSrc.join(' ')}`,
      `frame-src ${frameSrc.join(' ')}`,
      `connect-src ${connectSrc.join(' ')}`,
      `worker-src 'self'`,
      `manifest-src 'self'`,
      `object-src 'none'`,
      `base-uri 'self'`,
      `form-action 'self'`,
      `frame-ancestors 'none'`,
      `require-trusted-types-for ${requireTrustedTypes}`,
      `trusted-types ${trustedTypesPolicies.join(' ')}`,
      `upgrade-insecure-requests`
    ];
    return directives.join('; ');
  }

  // Standard SaaS / Marketing / Ecommerce / Gambling profile (with Turnstile support)
  const directives = [
    `default-src 'self'`,
    `script-src ${uniqueTokens(["'self'", "'inline-speculation-rules'", 'https://challenges.cloudflare.com', ...scriptHashes]).join(' ')}`,
    `style-src ${uniqueTokens(["'self'", "'unsafe-inline'", ...styleHashes]).join(' ')}`,
    `img-src 'self' data: blob:`,
    `font-src 'self' data:`,
    `connect-src 'self' https://challenges.cloudflare.com`,
    `frame-src https://challenges.cloudflare.com`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
    `upgrade-insecure-requests`
  ];
  return directives.join('; ');
}

/**
 * Builds the complete Cloudflare Pages / Workers Static Assets `_headers` file content.
 */
export function generateHeadersFileContent(profileName = 'standard-web', options = {}) {
  let resolvedProfile = profileName;
  let resolvedOptions = options || {};
  if (profileName && typeof profileName === 'object') {
    resolvedOptions = profileName;
    resolvedProfile = profileName.profile || profileName.complianceProfile || 'standard-web';
  }
  const effectiveProfile = resolveComplianceProfileName(resolvedProfile, resolvedOptions.projectRoot);
  const csp = buildCspHeaderForProfile(effectiveProfile, resolvedOptions);
  const lines = [
    '/*',
    `  Content-Security-Policy: ${csp}`,
    `  Strict-Transport-Security: ${COMMON_SECURITY_HEADERS['Strict-Transport-Security']}`,
    `  X-Content-Type-Options: ${COMMON_SECURITY_HEADERS['X-Content-Type-Options']}`,
    `  Referrer-Policy: ${COMMON_SECURITY_HEADERS['Referrer-Policy']}`,
    `  Permissions-Policy: ${COMMON_SECURITY_HEADERS['Permissions-Policy']}`,
    `  Cross-Origin-Opener-Policy: ${COMMON_SECURITY_HEADERS['Cross-Origin-Opener-Policy']}`,
    `  Cross-Origin-Resource-Policy: ${COMMON_SECURITY_HEADERS['Cross-Origin-Resource-Policy']}`,
    `  X-Frame-Options: ${COMMON_SECURITY_HEADERS['X-Frame-Options']}`,
    ...(resolvedOptions.preloadCssHref ? [`  Link: <${resolvedOptions.preloadCssHref}>; rel=preload; as=style`] : []),
    '',
    '/_astro/*',
    '  Cache-Control: public, max-age=31536000, immutable',
    '',
    '/assets/*',
    '  Cache-Control: public, max-age=31536000, immutable'
  ];

  if (effectiveProfile === 'education') {
    lines.push(
      '',
      '/pagefind/*',
      '  Cache-Control: public, max-age=3600',
      '',
      '/api/*',
      '  Cache-Control: no-store, max-age=0',
      '  X-Robots-Tag: noindex'
    );
  } else {
    lines.push(
      '',
      '/site/css/*',
      '  Cache-Control: public, max-age=31536000, immutable',
      '',
      '/site/js/*',
      '  Cache-Control: public, max-age=31536000, immutable',
      '',
      '/site/images/*',
      '  Cache-Control: public, max-age=31536000, immutable',
      '',
      '/data/*',
      '  Cache-Control: public, max-age=86400, stale-while-revalidate=604800'
    );
  }

  return `${lines.join('\n')}\n`;
}

/**
 * Parses a Cloudflare `_headers` file into ordered route rules.
 */
export function parseHeadersFile(headersContent = '') {
  const rules = [];
  let current = null;
  for (const rawLine of String(headersContent || '').split(/\r?\n/)) {
    const trimmedRight = rawLine.replace(/\s+$/, '');
    if (!trimmedRight || trimmedRight.trimStart().startsWith('#')) continue;
    if (!/^\s/.test(trimmedRight)) {
      current = { pattern: trimmedRight.trim(), headers: {} };
      rules.push(current);
    } else if (current) {
      const idx = trimmedRight.indexOf(':');
      if (idx > 0) {
        const key = trimmedRight.slice(0, idx).trim();
        const val = trimmedRight.slice(idx + 1).trim();
        current.headers[key] = val;
      }
    }
  }
  return rules;
}

/**
 * Resolves the effective header map for a given URL pathname against parsed `_headers` rules.
 */
export function resolveHeadersForPathname(rules = [], pathname = '/') {
  const resolved = {};
  const cleanPath = String(pathname || '/').split('?')[0];
  for (const rule of rules) {
    const pat = rule.pattern;
    let matches = false;
    if (pat === '/*') {
      matches = true;
    } else if (pat.endsWith('/*')) {
      const prefix = pat.slice(0, -1);
      matches = cleanPath.startsWith(prefix);
    } else {
      matches = cleanPath === pat;
    }
    if (matches) {
      Object.assign(resolved, rule.headers);
    }
  }
  return resolved;
}

function decodeHtmlAttributeEntities(str = '') {
  return String(str || '')
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function collectHtmlFilesSorted(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  const entries = fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name));
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectHtmlFilesSorted(full, out);
    else if (entry.name.toLowerCase().endsWith('.html')) out.push(full);
  }
  return out;
}

/**
 * Rewrites inline `style="..."` attributes outside `<script>`/`<style>`/`<textarea>` blocks
 * into deterministic CSS utility classes inside `/_astro/extracted-inline-<hash>.css`.
 */
export function extractInlineStyleAttributesFromHtmlFiles(distDir) {
  const htmlFiles = collectHtmlFilesSorted(distDir);
  const classCssMap = new Map();
  let rewrittenAttributes = 0;

  const protectedBlockRegex =
    /(<!--[\s\S]*?-->|<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>|<textarea\b[^>]*>[\s\S]*?<\/textarea>)/gi;

  const transformSegment = (segment) =>
    segment.replace(/<([a-zA-Z][a-zA-Z0-9:-]*)(\s(?:[^>"']|"[^"]*"|'[^']*')*)>/g, (fullTag, tagName, attrs) => {
      if (tagName.toLowerCase() === 'iframe' && /\bsrcdoc\s*=/i.test(attrs)) {
        return fullTag;
      }
      const styleAttrRegex = /\sstyle\s*=\s*(?:"([^"]*)"|'([^']*)')/i;
      const styleMatch = styleAttrRegex.exec(attrs);
      if (!styleMatch) return fullTag;

      const rawStyle = decodeHtmlAttributeEntities(styleMatch[1] ?? styleMatch[2] ?? '').trim();
      const cleanedAttrs = attrs.replace(styleAttrRegex, '');
      if (!rawStyle) {
        return `<${tagName}${cleanedAttrs}>`;
      }

      const normalizedCss = rawStyle.replace(/\s+/g, ' ').replace(/;\s*$/, '').trim();
      const shortHash = crypto.createHash('sha256').update(normalizedCss, 'utf8').digest('hex').slice(0, 10);
      const className = `u-s-${shortHash}`;
      if (!classCssMap.has(className)) {
        classCssMap.set(className, normalizedCss);
      }
      rewrittenAttributes++;

      const classAttrRegex = /\bclass\s*=\s*(?:"([^"]*)"|'([^']*)')/i;
      if (classAttrRegex.test(cleanedAttrs)) {
        const updatedAttrs = cleanedAttrs.replace(classAttrRegex, (_, dq, sq) => {
          const existing = (dq ?? sq ?? '').trim();
          const classes = existing ? `${existing} ${className}` : className;
          return `class="${classes}"`;
        });
        return `<${tagName}${updatedAttrs}>`;
      }

      const selfClosing = /\/\s*$/.test(cleanedAttrs);
      if (selfClosing) {
        const withoutSlash = cleanedAttrs.replace(/\/\s*$/, '').trimEnd();
        return `<${tagName}${withoutSlash} class="${className}" />`;
      }
      return `<${tagName}${cleanedAttrs} class="${className}">`;
    });

  const pendingWrites = [];
  for (const htmlFile of htmlFiles) {
    const rawHtml = fs.readFileSync(htmlFile, 'utf8');
    const parts = rawHtml.split(protectedBlockRegex);
    let changed = false;
    for (let i = 0; i < parts.length; i += 2) {
      const next = transformSegment(parts[i]);
      if (next !== parts[i]) {
        parts[i] = next;
        changed = true;
      }
    }
    if (changed) {
      pendingWrites.push({ htmlFile, html: parts.join('') });
    }
  }

  let stylesheetHref = null;
  if (classCssMap.size > 0) {
    const cssLines = [
      '/* Generated deterministically by src/lib/csp-builder.mjs to keep style-src free of unsafe-inline */'
    ];
    for (const [cls, decls] of [...classCssMap.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
      cssLines.push(`.${cls}.${cls} { ${decls}; }`);
    }
    const cssContent = `${cssLines.join('\n')}\n`;
    const sheetHash = crypto.createHash('sha256').update(cssContent, 'utf8').digest('hex').slice(0, 10);
    const fileName = `extracted-inline-${sheetHash}.css`;
    const astroAssetsDir = path.join(distDir, '_astro');
    fs.mkdirSync(astroAssetsDir, { recursive: true });
    fs.writeFileSync(path.join(astroAssetsDir, fileName), cssContent, 'utf8');
    stylesheetHref = `/_astro/${fileName}`;

    const rewrittenSet = new Map(pendingWrites.map((item) => [item.htmlFile, item.html]));
    for (const htmlFile of htmlFiles) {
      const current = rewrittenSet.has(htmlFile) ? rewrittenSet.get(htmlFile) : fs.readFileSync(htmlFile, 'utf8');
      if (!current.includes(stylesheetHref) && /<\/head>/i.test(current)) {
        const withLink = current.replace(
          /<\/head>/i,
          `<link rel="stylesheet" href="${stylesheetHref}">\n</head>`
        );
        fs.writeFileSync(htmlFile, withLink, 'utf8');
      } else if (rewrittenSet.has(htmlFile)) {
        fs.writeFileSync(htmlFile, current, 'utf8');
      }
    }
  }

  return {
    htmlFilesScanned: htmlFiles.length,
    rewrittenAttributes,
    uniqueClasses: classCssMap.size,
    stylesheetHref
  };
}

/**
 * Scans an HTML document (plus any nested `srcdoc="..."` documents) for executable inline
 * `<script>` blocks and inline `<style>` blocks, returning their SHA-256 CSP tokens.
 */
export function scanHtmlForCspHashes(htmlContent = '') {
  const scriptHashes = new Set();
  const styleHashes = new Set();

  const scanDocumentFragment = (docText) => {
    const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
    let m;
    while ((m = scriptRegex.exec(docText)) !== null) {
      const attrs = m[1] || '';
      const body = m[2] || '';
      if (/\bsrc\s*=/i.test(attrs)) continue;
      const typeMatch = /\btype\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i.exec(attrs);
      const scriptType = (typeMatch ? typeMatch[1] ?? typeMatch[2] ?? typeMatch[3] ?? '' : '').trim().toLowerCase();
      if (!EXECUTABLE_SCRIPT_TYPES.has(scriptType)) continue;
      if (!body) continue;
      scriptHashes.add(computeCspSha256Token(body));
    }

    const styleRegex = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
    while ((m = styleRegex.exec(docText)) !== null) {
      const cssBody = m[1] || '';
      if (!cssBody) continue;
      styleHashes.add(computeCspSha256Token(cssBody));
    }

    const srcdocRegex = /\bsrcdoc\s*=\s*(?:"([^"]*)"|'([^']*)')/gi;
    while ((m = srcdocRegex.exec(docText)) !== null) {
      const decodedSrcdoc = decodeHtmlAttributeEntities(m[1] ?? m[2] ?? '');
      if (decodedSrcdoc && decodedSrcdoc !== docText) {
        scanDocumentFragment(decodedSrcdoc);
      }
    }
  };

  scanDocumentFragment(String(htmlContent || ''));
  return {
    scriptHashes: [...scriptHashes].sort(),
    styleHashes: [...styleHashes].sort()
  };
}

/**
 * Runs post-build CSP compilation over `projectRoot/dist`.
 */
export function compileStaticDistCspAndHeaders(projectRoot, options = {}) {
  const resolvedRoot = path.resolve(projectRoot || MODULE_PROJECT_ROOT);
  const profileName = resolveComplianceProfileName(options.profile || 'education', resolvedRoot);
  const distDir = options.distDir || path.join(resolvedRoot, 'dist');
  const publicDir = options.publicDir || path.join(resolvedRoot, 'public');
  const syncPublicHeaders = Boolean(options.syncPublicHeaders);
  const extractInlineStyles = options.extractInlineStyles !== false && profileName === 'education';

  let styleExtraction = {
    htmlFilesScanned: 0,
    rewrittenAttributes: 0,
    uniqueClasses: 0,
    stylesheetHref: null
  };

  if (extractInlineStyles && fs.existsSync(distDir)) {
    styleExtraction = extractInlineStyleAttributesFromHtmlFiles(distDir);
  }

  const allScriptHashes = new Set(options.extraScriptHashes || []);
  const allStyleHashes = new Set(options.extraStyleHashes || []);
  const htmlFiles = collectHtmlFilesSorted(distDir);

  for (const htmlFile of htmlFiles) {
    const html = fs.readFileSync(htmlFile, 'utf8');
    const { scriptHashes, styleHashes } = scanHtmlForCspHashes(html);
    for (const h of scriptHashes) allScriptHashes.add(h);
    for (const h of styleHashes) allStyleHashes.add(h);
  }

  const headersContent = generateHeadersFileContent(profileName, {
    projectRoot: resolvedRoot,
    scriptHashes: [...allScriptHashes].sort(),
    styleHashes: [...allStyleHashes].sort(),
    allowUnsafeInlineStyles: Boolean(options.allowUnsafeInlineStyles)
  });

  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, '_headers'), headersContent, 'utf8');
  }
  if (syncPublicHeaders) {
    fs.mkdirSync(publicDir, { recursive: true });
    fs.writeFileSync(path.join(publicDir, '_headers'), headersContent, 'utf8');
  }

  const validation = validateHeadersForProfile(headersContent, profileName);

  return {
    profile: profileName,
    htmlFilesScanned: htmlFiles.length,
    scriptHashes: [...allScriptHashes].sort(),
    styleHashes: [...allStyleHashes].sort(),
    styleExtraction,
    headersContent,
    validation
  };
}

/**
 * Validates a `_headers` file against the target profile's security invariants.
 */
export function validateHeadersForProfile(headersContent = '', profileName = 'standard-web') {
  const effectiveProfile = resolveComplianceProfileName(profileName);
  const issues = [];
  const raw = String(headersContent || '');
  const rules = parseHeadersFile(raw);
  const rootHeaders = resolveHeadersForPathname(rules, '/');
  const csp = rootHeaders['Content-Security-Policy'] || '';
  const directives = parseCspDirectives(csp);

  if (!csp) {
    issues.push('Missing Content-Security-Policy in /* rule.');
  } else {
    if (!(directives.get('default-src') || []).includes("'self'")) issues.push("CSP default-src must include 'self'.");
    if (!(directives.get('object-src') || []).includes("'none'")) issues.push("CSP object-src must include 'none'.");
    if (!(directives.get('base-uri') || []).includes("'self'")) issues.push("CSP base-uri must include 'self'.");
    if (!(directives.get('frame-ancestors') || []).includes("'none'")) {
      issues.push("CSP frame-ancestors must include 'none'.");
    }
    if (!directives.has('upgrade-insecure-requests')) {
      issues.push('CSP must include upgrade-insecure-requests.');
    }
    if (hasStandaloneUnsafeEval(csp)) {
      issues.push("CSP contains forbidden standalone 'unsafe-eval' token.");
    }

    if (effectiveProfile === 'education') {
      const scriptSrc = directives.get('script-src') || [];
      const styleSrc = directives.get('style-src') || [];
      const frameSrc = directives.get('frame-src') || [];
      const mediaSrc = directives.get('media-src') || [];
      const imgSrc = directives.get('img-src') || [];
      const connectSrc = directives.get('connect-src') || [];
      const reqTt = directives.get('require-trusted-types-for') || [];
      const ttPolicies = directives.get('trusted-types') || [];

      if (!scriptSrc.includes("'wasm-unsafe-eval'")) {
        issues.push("Education CSP script-src must include 'wasm-unsafe-eval'.");
      }
      if (!scriptSrc.includes("'inline-speculation-rules'")) {
        issues.push("Education CSP script-src must include 'inline-speculation-rules'.");
      }
      if (scriptSrc.includes("'unsafe-inline'")) {
        issues.push("Education CSP script-src must NOT include 'unsafe-inline'.");
      }
      if (styleSrc.includes("'unsafe-inline'")) {
        issues.push("Education CSP style-src must NOT include 'unsafe-inline' (use hashes + extracted CSS).");
      }
      if (!frameSrc.includes('https://www.youtube-nocookie.com') || !frameSrc.includes('https://archive.org')) {
        issues.push('Education CSP frame-src must whitelist youtube-nocookie.com and archive.org.');
      }
      if (frameSrc.some((t) => t.includes('www.youtube.com'))) {
        issues.push('Education CSP frame-src must NOT allow tracking www.youtube.com.');
      }
      if (!mediaSrc.includes('https://archive.org') || !mediaSrc.includes('https://upload.wikimedia.org')) {
        issues.push('Education CSP media-src must whitelist archive.org and upload.wikimedia.org.');
      }
      if (!imgSrc.includes('https://i.ytimg.com') || !imgSrc.includes('https://upload.wikimedia.org')) {
        issues.push('Education CSP img-src must whitelist i.ytimg.com and upload.wikimedia.org.');
      }
      if (connectSrc.some((t) => t.includes('pollinations'))) {
        issues.push('Education CSP connect-src must never allow pollinations.');
      }
      if (!reqTt.includes("'script'")) {
        issues.push("Education CSP must enforce require-trusted-types-for 'script'.");
      }
      for (const pol of ['default', 'dompurify', 'astro-island']) {
        if (!ttPolicies.includes(pol)) {
          issues.push(`Education CSP trusted-types must include policy "${pol}".`);
        }
      }
    }
  }

  for (const [headerName, expectedValue] of Object.entries(COMMON_SECURITY_HEADERS)) {
    const actual = rootHeaders[headerName] || '';
    if (!actual || (headerName === 'Strict-Transport-Security' && !actual.includes('max-age=63072000'))) {
      issues.push(`Missing or weak ${headerName} (expected "${expectedValue}").`);
    }
  }

  return {
    valid: issues.length === 0,
    profile: effectiveProfile,
    csp,
    issues
  };
}
