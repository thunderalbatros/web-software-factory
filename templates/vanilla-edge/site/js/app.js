/**
 * {{PROJECT_NAME}} — Main Client Application & 2026 Visual Primitives Kit
 * Includes: XSS Sanitizer, Native View Transitions, 3D Specular Tilt ([data-tilt-3d]),
 * and 60-FPS Tabular-Nums Counter ([data-count-to]).
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
    this.projectName = '{{PROJECT_NAME}}';
  }

  init() {
    const mainEl = document.getElementById('main-content');
    if (mainEl) {
      mainEl.setAttribute('data-hydrated', 'true');
    }
    this.initCounters();
    this.init3DSpecularTilt();
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
    document.addEventListener('pointermove', (e) => {
      const card = e.target && e.target.closest ? e.target.closest('[data-tilt-3d]') : null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      const rx = (((e.clientY - r.top) - r.height / 2) / (r.height / 2)) * -4.5;
      const ry = (((e.clientX - r.left) - r.width / 2) / (r.width / 2)) * 4.5;
      card.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
    }, { passive: true });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new AppController();
  app.init();
});
