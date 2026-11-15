/**
 * socratic-tutor-sandbox.mjs — Socratic / BYOK Tutor Sanitizer & 1:1 MessageChannel Sandbox (Stage 3C.1)
 * ======================================================================================================
 * Enforces defense-in-depth isolation for optional Socratic/BYOK LLM outputs:
 *   1. All HTML outputs pass through `DOMPurify.sanitize(..., { RETURN_TRUSTED_TYPE: true })`
 *      producing a W3C `TrustedHTML` object under policy `dompurify`.
 *   2. The BYOK worker frame runs inside `<iframe sandbox="allow-scripts">` WITHOUT
 *      `allow-same-origin`, enforcing an opaque `null` origin that cannot read parent
 *      `IndexedDB`, `localStorage`, `sessionStorage`, cookies, or DOM.
 *   3. Initial handshake enforces fail-closed `if (!expectedSourceWindow || event.source !== expectedSourceWindow) return;`
 *      and immediately upgrades transport to a dedicated 1:1 `MessageChannel` (`port1` <-> `port2`),
 *      eliminating subsequent `postMessage(..., '*')` and validating every message on `port1` with `Valibot`.
 * ======================================================================================================
 */

import DOMPurify from 'dompurify';
import * as v from 'valibot';

export const TUTOR_CHANNEL_ID = 'ACADEMIA_TUTOR_V1';
export const REQUIRED_OPAQUE_SANDBOX_ATTR = 'allow-scripts';

const FORBIDDEN_SANDBOX_TOKENS = new Set([
  'allow-same-origin',
  'allow-top-navigation',
  'allow-top-navigation-by-user-activation',
  'allow-popups-to-escape-sandbox',
  'allow-modals',
  'allow-pointer-lock'
]);

export const TUTOR_DOMPURIFY_CONFIG = Object.freeze({
  RETURN_TRUSTED_TYPE: true,
  ALLOWED_TAGS: ['p', 'strong', 'em', 'code', 'pre', 'ul', 'ol', 'li', 'blockquote', 'br', 'span'],
  ALLOWED_ATTR: ['class', 'lang'],
  FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input', 'button', 'style', 'svg', 'math', 'link', 'meta'],
  FORBID_ATTR: ['style', 'onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'srcdoc', 'href', 'src']
});

export const TutorOutboundPromptSchema = v.strictObject({
  channel: v.literal(TUTOR_CHANNEL_ID),
  type: v.literal('TUTOR_PROMPT_REQUEST'),
  requestId: v.pipe(v.string(), v.minLength(6), v.maxLength(64), v.regex(/^[a-zA-Z0-9_-]+$/)),
  lessonId: v.pipe(v.string(), v.minLength(2), v.maxLength(80), v.regex(/^[a-z0-9-]+$/)),
  hintStep: v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(3)),
  learnerQuestion: v.pipe(v.string(), v.minLength(1), v.maxLength(600))
});

export const TutorSandboxReadySchema = v.strictObject({
  channel: v.literal(TUTOR_CHANNEL_ID),
  type: v.literal('TUTOR_SANDBOX_READY'),
  sandboxOrigin: v.literal('null'),
  storageBlocked: v.literal(true),
  parentDomBlocked: v.literal(true)
});

export const TutorHintResponseSchema = v.strictObject({
  channel: v.literal(TUTOR_CHANNEL_ID),
  type: v.literal('TUTOR_HINT_RESPONSE'),
  requestId: v.pipe(v.string(), v.minLength(6), v.maxLength(64), v.regex(/^[a-zA-Z0-9_-]+$/)),
  lessonId: v.pipe(v.string(), v.minLength(2), v.maxLength(80), v.regex(/^[a-z0-9-]+$/)),
  hintStep: v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(3)),
  htmlFragment: v.pipe(v.string(), v.minLength(1), v.maxLength(2400)),
  sandboxOrigin: v.literal('null'),
  storageBlocked: v.literal(true)
});

export const TutorErrorSchema = v.strictObject({
  channel: v.literal(TUTOR_CHANNEL_ID),
  type: v.literal('TUTOR_ERROR'),
  requestId: v.optional(v.pipe(v.string(), v.maxLength(64))),
  code: v.pipe(v.string(), v.minLength(2), v.maxLength(64)),
  message: v.pipe(v.string(), v.minLength(1), v.maxLength(240))
});

export const TutorInboundMessageSchema = v.variant('type', [
  TutorSandboxReadySchema,
  TutorHintResponseSchema,
  TutorErrorSchema
]);

/**
 * Verifies that an `<iframe>` sandbox attribute strictly enforces opaque origin (`allow-scripts` only)
 * and NEVER includes `allow-same-origin` or navigation/escape tokens.
 */
export function validateOpaqueSandboxAttribute(sandboxAttr = '') {
  const tokens = String(sandboxAttr || '')
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  if (tokens.length === 0) {
    return { valid: false, reason: 'EMPTY_SANDBOX_ATTRIBUTE' };
  }
  for (const tok of tokens) {
    if (FORBIDDEN_SANDBOX_TOKENS.has(tok)) {
      return { valid: false, reason: `FORBIDDEN_SANDBOX_TOKEN:${tok}` };
    }
    if (tok !== 'allow-scripts') {
      return { valid: false, reason: `UNEXPECTED_SANDBOX_TOKEN:${tok}` };
    }
  }
  return { valid: true, sandbox: REQUIRED_OPAQUE_SANDBOX_ATTR };
}

/**
 * Validates an outbound prompt envelope before sending it over `port1` to the isolated BYOK iframe.
 */
export function validateTutorPromptRequest(payload) {
  const parsed = v.safeParse(TutorOutboundPromptSchema, payload);
  if (!parsed.success) {
    return {
      ok: false,
      issues: parsed.issues.map((i) => i.message)
    };
  }
  return { ok: true, data: parsed.output };
}

/**
 * Validates the initial handshake `MessageEvent` coming from the opaque BYOK `<iframe sandbox="allow-scripts">`.
 * Fail-closed: rejects when `expectedSourceWindow` is missing, when `event.source !== expectedSourceWindow`,
 * when `event.origin !== 'null'`, or when `Valibot` rejects `event.data`.
 */
export function validateTutorInboundPostMessage(event, expectedSourceWindow = null) {
  if (!event || typeof event !== 'object') {
    return { ok: false, reason: 'INVALID_EVENT_OBJECT' };
  }
  if (!expectedSourceWindow || event.source !== expectedSourceWindow) {
    return { ok: false, reason: 'UNTRUSTED_MESSAGE_SOURCE_WINDOW' };
  }
  if (event.origin !== 'null') {
    return { ok: false, reason: `NON_OPAQUE_ORIGIN_REJECTED:${String(event.origin)}` };
  }
  const parsed = v.safeParse(TutorInboundMessageSchema, event.data);
  if (!parsed.success) {
    return {
      ok: false,
      reason: 'VALIBOT_SCHEMA_REJECTED',
      issues: parsed.issues.map((i) => i.message)
    };
  }
  return { ok: true, data: parsed.output };
}

/**
 * Validates every inbound message arriving on the dedicated 1:1 `MessageChannel` (`port1`)
 * strictly against `TutorInboundMessageSchema` (`Valibot`).
 */
export function validateTutorChannelPortMessage(portEvent) {
  if (!portEvent || typeof portEvent !== 'object') {
    return { ok: false, reason: 'INVALID_PORT_EVENT_OBJECT' };
  }
  const parsed = v.safeParse(TutorInboundMessageSchema, portEvent.data);
  if (!parsed.success) {
    return {
      ok: false,
      reason: 'VALIBOT_SCHEMA_REJECTED',
      issues: parsed.issues.map((i) => i.message)
    };
  }
  return { ok: true, data: parsed.output };
}

/**
 * Sanitizes untrusted LLM/tutor HTML using `DOMPurify` with `RETURN_TRUSTED_TYPE: true`.
 */
export function sanitizeTutorHtmlToTrustedType(dirtyHtml = '', purifyOverride = null) {
  const raw = String(dirtyHtml ?? '');
  const purifier =
    purifyOverride ||
    (DOMPurify && typeof DOMPurify.sanitize === 'function' ? DOMPurify : null);

  if (purifier && typeof purifier.sanitize === 'function') {
    return purifier.sanitize(raw, TUTOR_DOMPURIFY_CONFIG);
  }

  // Deterministic Node-only fallback when invoked outside a DOM environment in unit tests
  const strippedDangerousBlocks = raw
    .replace(/<(script|iframe|object|embed|style|svg|math|form)[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/<(script|iframe|object|embed|style|svg|math|form|input|button|link|meta)\b[^>]*\/?>/gi, '');
  const allowedSet = new Set(TUTOR_DOMPURIFY_CONFIG.ALLOWED_TAGS);
  return strippedDangerousBlocks.replace(/<\/?([a-zA-Z0-9-]+)([^>]*)>/g, (full, tag, attrs) => {
    const lower = tag.toLowerCase();
    if (!allowedSet.has(lower)) return '';
    if (full.startsWith('</')) return `</${lower}>`;
    const classMatch = /\bclass\s*=\s*"([a-zA-Z0-9 _-]+)"/.exec(attrs || '');
    const safeAttr = classMatch ? ` class="${classMatch[1]}"` : '';
    return lower === 'br' ? '<br>' : `<${lower}${safeAttr}>`;
  });
}

/**
 * Safely renders sanitized tutor HTML into a DOM container using `DOMPurify.sanitize`
 * with `RETURN_TRUSTED_TYPE: true` directly on the sink assignment.
 */
export function renderSanitizedTutorResponse(containerEl, dirtyHtml = '') {
  if (!containerEl) return null;
  containerEl.innerHTML = DOMPurify.sanitize(String(dirtyHtml ?? ''), TUTOR_DOMPURIFY_CONFIG);
  return containerEl;
}

/**
 * Generates the deterministic self-contained `srcdoc` document for `<iframe sandbox="allow-scripts">`.
 * Enforces strict Trusted Types (`default.createHTML` throws `TypeError`) and upgrades communication
 * to a dedicated 1:1 `MessageChannel` (`port2`), eliminating subsequent `postMessage(..., '*')`.
 */
export function buildOpaqueTutorSandboxSrcdoc() {
  return [
    '<!doctype html>',
    '<html lang="es">',
    '<head>',
    '<meta charset="utf-8">',
    '<title>Tutor Socrático Aislado (Origen Opaco)</title>',
    '<style>',
    ':root { color-scheme: light dark; font-family: system-ui, -apple-system, sans-serif; }',
    'body { margin: 0; padding: 0.65rem 0.85rem; font-size: 0.85rem; line-height: 1.45; background: transparent; color: CanvasText; }',
    '.sandbox-pill { display: inline-flex; align-items: center; gap: 0.4rem; font-weight: 600; font-size: 0.78rem; }',
    '.sandbox-dot { width: 0.5rem; height: 0.5rem; border-radius: 999px; background: oklch(0.62 0.15 152); display: inline-block; }',
    '</style>',
    '</head>',
    '<body>',
    '<main><div class="sandbox-pill"><span class="sandbox-dot" aria-hidden="true"></span><span id="sandbox-status">Sandbox aislado activo (origin: null · IndexedDB bloqueado)</span></div></main>',
    '<script>',
    '(function () {',
    '  if (window.trustedTypes && window.trustedTypes.createPolicy) {',
    '    try {',
    "      window.trustedTypes.createPolicy('default', {",
    "        createHTML: function () { throw new TypeError('Raw HTML assignment blocked in BYOK sandbox'); },",
    "        createScript: function () { throw new TypeError('Dynamic script evaluation blocked in BYOK sandbox'); },",
    "        createScriptURL: function () { throw new TypeError('External script URLs blocked in BYOK sandbox'); }",
    '      });',
    '    } catch (_) {}',
    '  }',
    '  var storageBlocked = false;',
    '  var parentDomBlocked = false;',
    '  try {',
    '    void window.localStorage;',
    '    if (window.indexedDB) { window.indexedDB.open("probe"); }',
    '  } catch (_) {',
    '    storageBlocked = true;',
    '  }',
    '  try {',
    '    void window.parent.document.cookie;',
    '  } catch (_) {',
    '    parentDomBlocked = true;',
    '  }',
    '  var statusEl = document.getElementById("sandbox-status");',
    '  if (statusEl) {',
    '    statusEl.textContent = "Sandbox aislado verificado (origin: " + String(window.origin) + " · almacenamiento padre bloqueado: " + String(storageBlocked && parentDomBlocked) + ")";',
    '  }',
    '  var HINTS = {',
    '    1: "<p><strong>Pista 1 (Observación):</strong> Identifica primero qué dato verificable aparece en la fuente primaria antes de aceptar la conclusión del modelo.</p>",',
    '    2: "<p><strong>Pista 2 (Contraste):</strong> Compara cómo cambia el conteo de <code>tokens</code> y la precisión cuando divides una instrucción ambigua en pasos concretos.</p>",',
    '    3: "<p><strong>Pista 3 (Criterio propio):</strong> Redacta tu verificación en dos frases: qué evidencia confirma el dato y qué supuesto queda pendiente de validar.</p>"',
    '  };',
    '  var dedicatedPort = null;',
    '  function buildReadyPayload() {',
    '    return {',
    '      channel: "ACADEMIA_TUTOR_V1",',
    '      type: "TUTOR_SANDBOX_READY",',
    '      sandboxOrigin: String(window.origin),',
    '      storageBlocked: Boolean(storageBlocked),',
    '      parentDomBlocked: Boolean(parentDomBlocked)',
    '    };',
    '  }',
    '  function handlePortPrompt(pev) {',
    '    if (!dedicatedPort) return;',
    '    var d = pev && pev.data;',
    '    if (!d || typeof d !== "object" || d.channel !== "ACADEMIA_TUTOR_V1") return;',
    '    if (d.type !== "TUTOR_PROMPT_REQUEST") return;',
    '    var reqId = typeof d.requestId === "string" && /^[a-zA-Z0-9_-]{6,64}$/.test(d.requestId) ? d.requestId : "";',
    '    var lessonId = typeof d.lessonId === "string" && /^[a-z0-9-]{2,80}$/.test(d.lessonId) ? d.lessonId : "";',
    '    var step = Number(d.hintStep) === 2 ? 2 : Number(d.hintStep) === 3 ? 3 : 1;',
    '    if (!reqId || !lessonId) {',
    '      dedicatedPort.postMessage({ channel: "ACADEMIA_TUTOR_V1", type: "TUTOR_ERROR", code: "INVALID_REQUEST", message: "Solicitud fuera de contrato." });',
    '      return;',
    '    }',
    '    dedicatedPort.postMessage({',
    '      channel: "ACADEMIA_TUTOR_V1",',
    '      type: "TUTOR_HINT_RESPONSE",',
    '      requestId: reqId,',
    '      lessonId: lessonId,',
    '      hintStep: step,',
    '      htmlFragment: HINTS[step],',
    '      sandboxOrigin: String(window.origin),',
    '      storageBlocked: Boolean(storageBlocked)',
    '    });',
    '  }',
    '  window.addEventListener("message", function (ev) {',
    '    if (!window.parent || ev.source !== window.parent) return;',
    '    var d = ev.data;',
    '    if (!d || typeof d !== "object" || d.channel !== "ACADEMIA_TUTOR_V1") return;',
    '    if (d.type === "TUTOR_INIT_CHANNEL" && ev.ports && ev.ports[0]) {',
    '      if (dedicatedPort && typeof dedicatedPort.close === "function") {',
    '        try { dedicatedPort.close(); } catch (_) {}',
    '      }',
    '      dedicatedPort = ev.ports[0];',
    '      dedicatedPort.onmessage = handlePortPrompt;',
    '      if (typeof dedicatedPort.start === "function") { dedicatedPort.start(); }',
    '      dedicatedPort.postMessage(buildReadyPayload());',
    '    }',
    '  });',
    '  if (!dedicatedPort && window.parent && window.parent !== window) {',
    '    window.parent.postMessage(buildReadyPayload(), "*");',
    '  }',
    '})();',
    '</script>',
    '</body>',
    '</html>'
  ].join('\n');
}

/**
 * Mounts the parent-side controller for an isolated `<iframe sandbox="allow-scripts">` tutor shell
 * using a dedicated 1:1 `MessageChannel` (`port1` <-> `port2`) validated with `Valibot`.
 */
export function attachOpaqueTutorBridge({ iframeEl, outputEl, statusEl }) {
  if (!iframeEl || !outputEl) {
    throw new Error('OPAQUE_TUTOR_BRIDGE_MISSING_ELEMENTS');
  }
  const sandboxCheck = validateOpaqueSandboxAttribute(iframeEl.getAttribute('sandbox') || '');
  if (!sandboxCheck.valid) {
    throw new Error(`OPAQUE_TUTOR_SANDBOX_VIOLATION:${sandboxCheck.reason}`);
  }

  let activePort = null;
  let channelReady = false;
  let channelTransferred = false;
  const pendingQueue = [];

  const handleValidatedInbound = (msg) => {
    if (msg.type === 'TUTOR_SANDBOX_READY') {
      channelReady = true;
      iframeEl.dataset.sandboxReady = 'true';
      iframeEl.dataset.tutorTransport = 'message-channel-1to1';
      if (statusEl) {
        statusEl.textContent =
          'Aislamiento activo: canal dedicado MessageChannel 1:1 verificado, sin acceso a tus datos locales.';
      }
      while (pendingQueue.length > 0 && activePort) {
        const queued = pendingQueue.shift();
        activePort.postMessage(queued);
      }
    } else if (msg.type === 'TUTOR_HINT_RESPONSE') {
      renderSanitizedTutorResponse(outputEl, msg.htmlFragment);
      outputEl.dataset.lastRequestId = msg.requestId;
      outputEl.dataset.lastHintStep = String(msg.hintStep);
    } else if (msg.type === 'TUTOR_ERROR' && statusEl) {
      statusEl.textContent = msg.message;
    }
  };

  const initDedicatedChannel = () => {
    const expectedSourceWindow = iframeEl.contentWindow;
    if (!expectedSourceWindow) return;
    if (activePort && typeof activePort.close === 'function') {
      try {
        activePort.close();
      } catch {
        /* ignore close errors */
      }
    }
    channelReady = false;
    const channel = new MessageChannel();
    activePort = channel.port1;
    activePort.onmessage = (portEvent) => {
      const check = validateTutorChannelPortMessage(portEvent);
      if (!check.ok) return;
      handleValidatedInbound(check.data);
    };
    if (typeof activePort.start === 'function') {
      activePort.start();
    }
    try {
      expectedSourceWindow.postMessage(
        { channel: TUTOR_CHANNEL_ID, type: 'TUTOR_INIT_CHANNEL' },
        '*',
        [channel.port2]
      );
      channelTransferred = true;
    } catch {
      /* wait for iframe load or initial ready ping */
    }
  };

  const onWindowHandshake = (event) => {
    const expectedSourceWindow = iframeEl.contentWindow;
    if (!expectedSourceWindow || event.source !== expectedSourceWindow) return;
    const check = validateTutorInboundPostMessage(event, expectedSourceWindow);
    if (!check.ok) return;
    if (check.data.type === 'TUTOR_SANDBOX_READY' && !channelReady) {
      initDedicatedChannel();
    }
  };

  const onIframeLoad = () => {
    channelTransferred = false;
    initDedicatedChannel();
  };

  window.addEventListener('message', onWindowHandshake);
  iframeEl.addEventListener('load', onIframeLoad);
  initDedicatedChannel();

  return {
    requestHint({ lessonId, hintStep = 1, learnerQuestion = 'Solicito pista socrática' }) {
      const requestId = `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      const candidate = {
        channel: TUTOR_CHANNEL_ID,
        type: 'TUTOR_PROMPT_REQUEST',
        requestId,
        lessonId,
        hintStep,
        learnerQuestion
      };
      const validated = validateTutorPromptRequest(candidate);
      if (!validated.ok) {
        throw new Error(`INVALID_TUTOR_PROMPT:${validated.issues.join('; ')}`);
      }
      if (channelReady && activePort) {
        activePort.postMessage(validated.data);
      } else {
        pendingQueue.push(validated.data);
        if (!channelTransferred) {
          initDedicatedChannel();
        }
      }
      return requestId;
    },
    destroy() {
      iframeEl.removeEventListener('load', onIframeLoad);
      window.removeEventListener('message', onWindowHandshake);
      if (activePort && typeof activePort.close === 'function') {
        activePort.close();
      }
      activePort = null;
      channelReady = false;
    }
  };
}
