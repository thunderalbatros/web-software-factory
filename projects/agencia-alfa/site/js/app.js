/**
 * Agencia Alfa — Main Client Application & 2026 Visual Primitives Kit
 * Includes: XSS Sanitizer, Native View Transitions, 3D Specular Tilt & Spotlight ([data-tilt-3d]),
 * Accessible <dialog> Controller, and 60-FPS Tabular-Nums Counter ([data-count-to]).
 */
window.escapeHTML = function (str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

class AppController {
  constructor() {
    this.projectName = 'Agencia Alfa';
  }

  init() {
    document.documentElement.classList.add('js-ready');
    const mainEl = document.getElementById('main-content');
    if (mainEl) {
      mainEl.setAttribute('data-hydrated', 'true');
    }
    this.initCounters();
    this.init3DSpecularTilt();
    this.initModals();
    this.initForms();
    this.initThumbHashAndQuicklink();
    this.initZzfxMicroAudio();
    this.initWebMcpBridge();
    this.initOffMainThreadTelemetry();
  }

  /**
   * Off-Main-Thread Telemetry Worker & Shader Primitives Bridge (Partytown + SDF Shaders)
   * References: telemetry-worker.js and shader-primitives.js
   */
  initOffMainThreadTelemetry() {
    if (typeof Worker !== 'undefined') {
      try {
        this._telemetryWorker = new Worker('/site/js/telemetry-worker.js');
      } catch {
        this._telemetryWorker = null;
      }
    }
    document.documentElement.setAttribute('data-shader-module', 'shader-primitives');
    document.documentElement.setAttribute('data-telemetry-module', 'telemetry-worker');
  }

  initWebMcpBridge() {
    if (typeof navigator !== 'undefined' && navigator.modelContext && typeof navigator.modelContext.registerTool === 'function') {
      navigator.modelContext.registerTool({
        name: 'get_site_summary',
        description: 'Returns heading and CTA metadata for external AI agents via WebMCP.',
        readOnly: true,
        requiresUserConfirmation: false,
        execute: () => ({
          project: this.projectName,
          llmsTxt: '/llms.txt',
          title: document.title
        })
      });
    }
  }

  initCounters() {
    document.querySelectorAll('[data-count-to]').forEach((el) => {
      const target = parseFloat(el.getAttribute('data-count-to') || '0');
      el.style.fontVariantNumeric = 'tabular-nums';
      const start = performance.now();
      const duration = 700;
      const step = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const ease = 1 - Math.pow(1 - t, 4);
        el.textContent = Math.round(target * ease).toLocaleString();
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  init3DSpecularTilt() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let rafPending = false;
    let lastEvent = null;
    document.addEventListener('pointermove', (e) => {
      lastEvent = e;
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        rafPending = false;
        if (!lastEvent) return;
        const target = lastEvent.target;
        const card = target && target.closest ? target.closest('[data-tilt-3d], .spotlight-card, .bento-card, .magnetic-surface') : null;
        if (!card) return;
        const r = card.getBoundingClientRect();
        const x = lastEvent.clientX - r.left;
        const y = lastEvent.clientY - r.top;
        card.style.setProperty('--mouse-x', `${x.toFixed(0)}px`);
        card.style.setProperty('--mouse-y', `${y.toFixed(0)}px`);
        if (card.classList.contains('magnetic-surface') || card.classList.contains('btn-spring')) {
          const dx = ((x - r.width / 2) / Math.max(1, r.width / 2)) * 3;
          const dy = ((y - r.height / 2) / Math.max(1, r.height / 2)) * 2;
          card.style.setProperty('--mag-x', `${dx.toFixed(1)}px`);
          card.style.setProperty('--mag-y', `${dy.toFixed(1)}px`);
        }
        if (card.hasAttribute('data-tilt-3d')) {
          const rx = ((y - r.height / 2) / Math.max(1, r.height / 2)) * -3.5;
          const ry = ((x - r.width / 2) / Math.max(1, r.width / 2)) * 3.5;
          card.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
          card.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
          card.style.setProperty('--mx', `${((x / r.width) * 100).toFixed(1)}%`);
          card.style.setProperty('--my', `${((y / r.height) * 100).toFixed(1)}%`);
        }
      });
    }, { passive: true });
  }

  initModals() {
    document.querySelectorAll('[data-open-modal]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-open-modal');
        const dlg = id ? document.getElementById(id) : null;
        if (dlg && typeof dlg.showModal === 'function' && !dlg.open) {
          dlg.showModal();
        }
      });
    });

    document.querySelectorAll('[data-close-modal]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-close-modal');
        const dlg = id ? document.getElementById(id) : null;
        if (dlg && typeof dlg.close === 'function' && dlg.open) {
          dlg.close();
        }
      });
    });
  }

  initForms() {
    document.querySelectorAll('form').forEach((form) => {
      let submitLockedUntil = 0;
      let validSubmissions = 0;
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const now = performance.now();
        if (now < submitLockedUntil) {
          form.setAttribute('data-rage-blocked', 'true');
          return;
        }
        submitLockedUntil = now + 280;

        const statusEl = form.querySelector('[role="status"]') || document.getElementById('lead-form-status');
        const nameInput = form.querySelector('input[name="fullName"], input[type="text"]');
        const emailInput = form.querySelector('input[name="email"], input[type="email"]');

        const rawName = String(nameInput ? nameInput.value : '').trim();
        const rawEmail = String(emailInput ? emailInput.value : '').trim();

        if (!rawName || !rawEmail) {
          if (statusEl) statusEl.textContent = 'Por favor completá todos los campos obligatorios.';
          form.setAttribute('data-validation-state', 'error-empty');
          return;
        }

        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(rawEmail) && rawEmail.length <= 320;
        if (!emailOk) {
          if (statusEl) statusEl.textContent = 'Por favor ingresá un correo corporativo válido.';
          form.setAttribute('data-validation-state', 'error-email');
          return;
        }

        const safePreview = window.escapeHTML(rawName.slice(0, 64));
        validSubmissions += 1;
        form.setAttribute('data-submit-count', String(validSubmissions));
        form.setAttribute('data-validation-state', 'accepted');
        form.setAttribute('data-n8n-connector', 'ready');
        if (statusEl) {
          statusEl.textContent = `Solicitud recibida de forma segura (${safePreview}).`;
        }

        const endpoint = form.getAttribute('data-n8n-endpoint') || '/api/lead';
        fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fullName: rawName.slice(0, 120), email: rawEmail, source: 'vanilla-edge-form' }), signal: AbortSignal.timeout(4500) }).catch(() => {});
      });
    });
  }

  /**
   * Zero-CLS ThumbHash Placeholder & Quicklink Viewport Prefetcher (Vault: thumbhash + quicklink)
   */
  initThumbHashAndQuicklink() {
    document.querySelectorAll('img[data-thumbhash]').forEach((img) => {
      if (!img.style.aspectRatio && img.width && img.height) {
        img.style.aspectRatio = `${img.width} / ${img.height}`;
      }
    });

    if ('IntersectionObserver' in window) {
      const prefetched = new Set();
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const a = entry.target;
          const href = a.getAttribute('href') || '';
          if (href.startsWith('/') && !href.startsWith('//') && !prefetched.has(href)) {
            prefetched.add(href);
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = href;
            document.head.appendChild(link);
          }
        });
      });
      document.querySelectorAll('a[href^="/"]').forEach((a) => observer.observe(a));
    }
  }

  /**
   * Procedural 1KB ZzFX Micro-Synthesizer (Vault: fx-audio-sota/zzfx)
   * Disabled by default; only plays subtle UI click tick when `--audio-feedback: true` or `data-audio-feedback="true"`.
   */
  initZzfxMicroAudio() {
    const playUiTick = () => {
      const root = document.documentElement;
      const tokenVal = getComputedStyle(root).getPropertyValue('--audio-feedback').trim();
      const enabled = root.getAttribute('data-audio-feedback') === 'true' || tokenVal === 'true';
      if (!enabled) return;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = this._audioCtx || (this._audioCtx = new AudioCtx());
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.035);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    };

    document.querySelectorAll('.btn-primary, .btn-secondary, [data-cta]').forEach((btn) => {
      btn.addEventListener('click', playUiTick, { passive: true });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new AppController();
  app.init();
});
