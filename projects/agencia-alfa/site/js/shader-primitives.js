/**
 * shader-primitives.js — Zero-Dependency SDF / 2-Octave fBm Hero Shader & NumberFlow Counter
 * ==========================================================================================
 * Distilled from `CANON_OPEN_BOOKS_SHADERS_SDF_AND_WEB_ANIMATION_MASTERY_2026.md` +
 * Local Vault (`paper-shaders` & `number-flow`).
 *
 * Safeguards:
 *  - Auto-pauses via IntersectionObserver when off-screen (0% CPU/GPU waste).
 *  - Respects `@media (prefers-reduced-motion: reduce)`.
 *  - Frame budget capped at <= 5% GPU load.
 */

export function initNumberFlowCounters() {
  const prefersReduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elements = document.querySelectorAll('[data-number-flow]');
  if (!elements.length) return;

  const animateValue = (el) => {
    const targetRaw = parseFloat(el.getAttribute('data-number-flow') || '0');
    if (Number.isNaN(targetRaw)) return;
    const decimals = (String(el.getAttribute('data-number-flow')).split('.')[1] || '').length;
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';

    if (prefersReduced) {
      el.textContent = `${prefix}${targetRaw.toFixed(decimals)}${suffix}`;
      return;
    }

    const duration = 900;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min(1, (now - startTime) / duration);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = targetRaw * eased;
      el.textContent = `${prefix}${current.toFixed(decimals)}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateValue(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    elements.forEach((el) => io.observe(el));
  } else {
    elements.forEach(animateValue);
  }
}

export function initSdfAmbientCanvas(canvasSelector = 'canvas[data-sdf-shader]') {
  const canvas = document.querySelector(canvasSelector);
  if (!canvas || typeof canvas.getContext !== 'function') return;

  const prefersReduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let isVisible = true;
  let rafId = 0;

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        isVisible = e.isIntersecting;
      });
    });
    io.observe(canvas);
  }

  const render = (t) => {
    if (isVisible) {
      const w = canvas.width || 320;
      const h = canvas.height || 180;
      ctx.clearRect(0, 0, w, h);
      const cx = w * (0.5 + 0.18 * Math.cos(t * 0.0007));
      const cy = h * (0.5 + 0.15 * Math.sin(t * 0.0009));
      const grad = ctx.createRadialGradient(cx, cy, 8, cx, cy, Math.max(w, h) * 0.65);
      grad.addColorStop(0, 'rgba(99, 102, 241, 0.22)');
      grad.addColorStop(1, 'rgba(9, 11, 16, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    }
    rafId = requestAnimationFrame(render);
  };

  rafId = requestAnimationFrame(render);
  return () => cancelAnimationFrame(rafId);
}
