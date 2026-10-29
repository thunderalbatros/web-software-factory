/**
 * templates/components/client-feedback-widget.js — Post-Sale Interactive Client Feedback Widget (< 4 KB)
 * ======================================================================================================
 * Activates only when `?client_feedback_token=<token>` or `localStorage.getItem('wf_client_token')` is present.
 * Allows the client to click any section of the delivered website, describe a change or report an issue,
 * and submits `{ sectionSelector, message, pageUrl, viewport, consoleErrors }` to `/api/client-feedback`.
 */
(function initWebFactoryClientFeedbackWidget() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const token = params.get('client_feedback_token') || window.localStorage.getItem('wf_client_token') || '';
  if (!token) return;

  const consoleErrors = [];
  window.addEventListener('error', (ev) => {
    if (consoleErrors.length < 5) {
      consoleErrors.push(String(ev.message || 'runtime_error').slice(0, 160));
    }
  });

  let selectedSelector = 'body';
  let inspectMode = false;

  const triggerBtn = document.createElement('button');
  triggerBtn.type = 'button';
  triggerBtn.id = 'wf-feedback-trigger';
  triggerBtn.setAttribute('aria-label', 'Enviar feedback o solicitar cambio');
  triggerBtn.textContent = '💬 Feedback Cliente';
  triggerBtn.style.cssText = [
    'position:fixed',
    'bottom:20px',
    'right:20px',
    'z-index:9999',
    'min-height:48px',
    'padding:10px 16px',
    'border-radius:8px',
    'border:1px solid oklch(1 0 0 / 0.14)',
    'background:oklch(0.18 0.02 255)',
    'color:oklch(0.96 0.005 255)',
    'font:600 14px/1.2 system-ui,sans-serif',
    'cursor:pointer',
    'touch-action:manipulation'
  ].join(';');

  const dialog = document.createElement('dialog');
  dialog.id = 'wf-feedback-dialog';
  dialog.style.cssText = [
    'max-width:420px',
    'width:92vw',
    'border-radius:12px',
    'border:1px solid oklch(1 0 0 / 0.12)',
    'background:oklch(0.14 0.015 255)',
    'color:oklch(0.96 0.005 255)',
    'padding:20px',
    'font-family:system-ui,sans-serif'
  ].join(';');

  dialog.innerHTML = [
    '<form id="wf-feedback-form" method="dialog" style="display:grid;gap:12px">',
    '<strong style="font-size:16px">Solicitar Cambio o Reportar Ajuste</strong>',
    '<small id="wf-selected-target" style="opacity:0.8">Sección: body</small>',
    '<button type="button" id="wf-pick-section" style="min-height:44px;border-radius:6px;cursor:pointer">🎯 Elegir sección en pantalla</button>',
    '<textarea id="wf-feedback-msg" required maxlength="1500" rows="4" placeholder="Describí qué querés cambiar o consultar..." style="padding:10px;border-radius:6px"></textarea>',
    '<div style="display:flex;gap:8px;justify-content:flex-end">',
    '<button type="button" id="wf-feedback-cancel" style="min-height:44px;padding:8px 14px">Cancelar</button>',
    '<button type="submit" style="min-height:44px;padding:8px 16px;font-weight:600">Enviar al Equipo</button>',
    '</div>',
    '</form>'
  ].join('');

  document.body.appendChild(triggerBtn);
  document.body.appendChild(dialog);

  triggerBtn.addEventListener('click', () => dialog.showModal());
  dialog.querySelector('#wf-feedback-cancel').addEventListener('click', () => dialog.close());

  dialog.querySelector('#wf-pick-section').addEventListener('click', () => {
    inspectMode = true;
    dialog.close();
  });

  document.addEventListener(
    'click',
    (ev) => {
      if (!inspectMode) return;
      if (ev.target === triggerBtn || dialog.contains(ev.target)) return;
      ev.preventDefault();
      ev.stopPropagation();
      inspectMode = false;
      const el = ev.target.closest('section,header,footer,article,main,nav,div') || ev.target;
      selectedSelector = el.id ? `#${el.id}` : el.tagName.toLowerCase();
      dialog.querySelector('#wf-selected-target').textContent = `Sección: ${selectedSelector}`;
      dialog.showModal();
    },
    true
  );

  dialog.querySelector('#wf-feedback-form').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const msgEl = dialog.querySelector('#wf-feedback-msg');
    const payload = {
      clientToken: token,
      sectionSelector: selectedSelector,
      message: msgEl.value.trim(),
      pageUrl: window.location.href,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      consoleErrors
    };
    try {
      await fetch('/api/client-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (_) {}
    msgEl.value = '';
    dialog.close();
  });
})();
