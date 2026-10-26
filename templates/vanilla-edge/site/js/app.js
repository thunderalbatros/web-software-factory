/**
 * {{PROJECT_NAME}} — Main Client Application & 2026 Visual Primitives Kit
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
    this.projectName = '{{PROJECT_NAME}}';
  }

  init() {
    const mainEl = document.getElementById('main-content');
    if (mainEl) {
      mainEl.setAttribute('data-hydrated', 'true');
    }
    this.initCounters();
    this.init3DSpecularTilt();
    this.initModals();
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
      const card = e.target && e.target.closest ? e.target.closest('[data-tilt-3d], .spotlight-card') : null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      card.style.setProperty('--mouse-x', `${x.toFixed(0)}px`);
      card.style.setProperty('--mouse-y', `${y.toFixed(0)}px`);
      if (card.hasAttribute('data-tilt-3d')) {
        const rx = ((y - r.height / 2) / (r.height / 2)) * -3.5;
        const ry = ((x - r.width / 2) / (r.width / 2)) * 3.5;
        card.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
        card.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
        card.style.setProperty('--mx', `${((x / r.width) * 100).toFixed(1)}%`);
        card.style.setProperty('--my', `${((y / r.height) * 100).toFixed(1)}%`);
      }
    }, { passive: true });
  }

  initModals() {
    document.querySelectorAll('[data-open-modal]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-open-modal');
        const dlg = id ? document.getElementById(id) : null;
        if (dlg && typeof dlg.showModal === 'function') {
          dlg.showModal();
        }
      });
    });

    document.querySelectorAll('[data-close-modal]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-close-modal');
        const dlg = id ? document.getElementById(id) : null;
        if (dlg && typeof dlg.close === 'function') {
          dlg.close();
        }
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new AppController();
  app.init();
});
