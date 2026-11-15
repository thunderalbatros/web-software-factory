import {
  attachOpaqueTutorBridge,
  validateOpaqueSandboxAttribute
} from '../lib/socratic-tutor-sandbox.mjs';

function initThemeToggle() {
  const root = document.documentElement;
  const btn = document.querySelector('[data-theme-toggle]');
  if (!btn) return;

  const syncLabel = () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    const labelSpan = btn.querySelector('[data-theme-label]');
    if (labelSpan) {
      labelSpan.textContent = isDark ? 'Tema: Oscuro' : 'Tema: Claro';
    }
  };

  syncLabel();
  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      window.localStorage.setItem('academia_ia_theme', next);
    } catch {
      /* ignore private-mode quota */
    }
    syncLabel();
  });
}

function initArchetypeSelector() {
  const select = document.querySelector('[data-archetype-select]');
  const output = document.querySelector('[data-archetype-summary]');
  if (!select) return;

  try {
    const saved = window.localStorage.getItem('academia_ia_archetype');
    if (saved && [...select.options].some((o) => o.value === saved)) {
      select.value = saved;
    }
  } catch {
    /* ignore */
  }

  const updateSummary = () => {
    const selectedOpt = select.options[select.selectedIndex];
    if (output && selectedOpt) {
      const stack = selectedOpt.getAttribute('data-stack') || '';
      output.textContent = `Plantilla técnica local activa: ${selectedOpt.textContent.trim()} — Stack libre sugerido: ${stack}`;
    }
  };

  updateSummary();
  select.addEventListener('change', () => {
    try {
      window.localStorage.setItem('academia_ia_archetype', select.value);
    } catch {
      /* ignore */
    }
    updateSummary();
  });
}

function initVideoFacades() {
  const containers = document.querySelectorAll('[data-video-facade]');
  for (const box of containers) {
    const tabs = [...box.querySelectorAll('[data-video-tab]')];
    const panels = [...box.querySelectorAll('[data-video-panel]')];

    for (const tab of tabs) {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('data-video-tab');
        for (const t of tabs) {
          t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
        }
        for (const p of panels) {
          const active = p.getAttribute('data-video-panel') === targetId;
          p.hidden = !active;
        }
      });
    }

    const playButtons = box.querySelectorAll('[data-video-play]');
    for (const playBtn of playButtons) {
      playBtn.addEventListener('click', () => {
        const stage = playBtn.closest('[data-video-stage]');
        if (!stage) return;
        const embedUrl = playBtn.getAttribute('data-embed-url') || '';
        const videoTitle = playBtn.getAttribute('data-video-title') || 'Video educativo complementario';

        let parsed;
        try {
          parsed = new URL(embedUrl);
        } catch {
          return;
        }
        const allowedHosts = new Set(['www.youtube-nocookie.com', 'archive.org']);
        if (parsed.protocol !== 'https:' || !allowedHosts.has(parsed.hostname)) {
          return;
        }

        const iframe = document.createElement('iframe');
        iframe.className = 'video-stage-iframe';
        iframe.setAttribute('src', parsed.href);
        iframe.setAttribute('title', videoTitle);
        iframe.setAttribute('loading', 'lazy');
        iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
        iframe.setAttribute('allow', 'fullscreen');
        stage.replaceChildren(iframe);
      });
    }
  }
}

let tiktokenEncoderPromise = null;
function getTiktokenEncoder() {
  if (!tiktokenEncoderPromise) {
    tiktokenEncoderPromise = Promise.all([
      import('js-tiktoken/lite'),
      import('js-tiktoken/ranks/cl100k_base')
    ]).then(([{ Tiktoken }, ranksMod]) => new Tiktoken(ranksMod.default));
  }
  return tiktokenEncoderPromise;
}

function initTiktokenExplorer() {
  const explorer = document.querySelector('[data-tiktoken-explorer]');
  if (!explorer) return;

  const textarea = explorer.querySelector('[data-tiktoken-input]');
  const countEl = explorer.querySelector('[data-tiktoken-count]');
  const charsEl = explorer.querySelector('[data-tiktoken-chars]');
  const ratioEl = explorer.querySelector('[data-tiktoken-ratio]');
  const chipsEl = explorer.querySelector('[data-tiktoken-chips]');
  if (!textarea || !countEl || !charsEl || !ratioEl || !chipsEl) return;

  const renderTokens = async () => {
    const encoder = await getTiktokenEncoder();
    const text = String(textarea.value || '');
    const tokens = encoder.encode(text);
    const charLen = [...text].length;
    const ratio = tokens.length > 0 ? (charLen / tokens.length).toFixed(2) : '0.00';

    countEl.textContent = String(tokens.length);
    charsEl.textContent = String(charLen);
    ratioEl.textContent = ratio;

    const previewSlice = tokens.slice(0, 36);
    const chipNodes = previewSlice.map((tokenId) => {
      const chip = document.createElement('span');
      chip.className = 'token-chip';
      let decodedPiece = '';
      try {
        decodedPiece = encoder.decode([tokenId]);
      } catch {
        decodedPiece = '·';
      }
      const visiblePiece = decodedPiece.replace(/ /g, '␣').replace(/\n/g, '↵') || '∅';
      const textSpan = document.createElement('span');
      textSpan.textContent = visiblePiece;
      const idSpan = document.createElement('span');
      idSpan.className = 'token-chip-id';
      idSpan.textContent = `#${tokenId}`;
      chip.append(textSpan, idSpan);
      return chip;
    });
    chipsEl.replaceChildren(...chipNodes);
  };

  textarea.addEventListener('focus', () => {
    getTiktokenEncoder().catch(() => {});
  }, { once: true });
  textarea.addEventListener('input', () => {
    renderTokens().catch(() => {});
  });
}

function initIsolatedSocraticTutor() {
  const shells = document.querySelectorAll('[data-tutor-shell]');
  for (const shell of shells) {
    const iframe = shell.querySelector('iframe[data-tutor-iframe]');
    const input = shell.querySelector('[data-tutor-input]');
    const askBtn = shell.querySelector('[data-tutor-ask]');
    const outBox = shell.querySelector('[data-tutor-output]');
    const statusLine = shell.querySelector('[data-tutor-status]');
    if (!iframe || !input || !askBtn || !outBox || !statusLine) continue;

    const sandboxAttr = iframe.getAttribute('sandbox') || '';
    const check = validateOpaqueSandboxAttribute(sandboxAttr);
    if (!check.valid) {
      statusLine.textContent = `Error de aislamiento: ${check.reason}`;
      continue;
    }

    const lessonSlug = shell.getAttribute('data-tutor-lesson') || 'semilla-ia';
    let step = 1;

    const bridge = attachOpaqueTutorBridge({
      iframeEl: iframe,
      outputEl: outBox,
      statusEl: statusLine
    });

    askBtn.addEventListener('click', () => {
      const promptText = String(input.value || '').trim() || '¿Cuál es la idea clave que debo verificar en esta etapa?';
      bridge.requestHint({
        lessonId: lessonSlug,
        hintStep: step,
        learnerQuestion: promptText
      });
      step = step >= 3 ? 1 : step + 1;
    });
  }
}

function initPagefindSearch() {
  const wrap = document.querySelector('[data-pagefind-search]');
  if (!wrap) return;
  const input = wrap.querySelector('[data-pagefind-input]');
  const list = wrap.querySelector('[data-pagefind-results]');
  const status = wrap.querySelector('[data-pagefind-status]');
  if (!input || !list || !status) return;

  let pagefindMod = null;
  input.addEventListener('input', async () => {
    const query = String(input.value || '').trim();
    if (query.length < 2) {
      list.replaceChildren();
      status.textContent = '';
      return;
    }
    try {
      if (!pagefindMod) {
        const pfUrl = new URL('/pagefind/pagefind.js', window.location.origin).href;
        pagefindMod = await import(/* @vite-ignore */ pfUrl);
        if (typeof pagefindMod.init === 'function') {
          await pagefindMod.init();
        }
      }
      const searchRes = await pagefindMod.search(query);
      const topItems = await Promise.all((searchRes.results || []).slice(0, 4).map((r) => r.data()));
      status.textContent = `Resultados encontrados: ${searchRes.results.length}`;
      const nodes = topItems.map((item) => {
        const li = document.createElement('li');
        li.className = 'search-result-item';
        const link = document.createElement('a');
        link.href = item.url || '/';
        link.textContent = item.meta?.title || item.url || 'Lección';
        const excerpt = document.createElement('p');
        excerpt.textContent = String(item.excerpt || '').replace(/<[^>]*>/g, '');
        li.append(link, excerpt);
        return li;
      });
      list.replaceChildren(...nodes);
    } catch {
      status.textContent = 'Índice local disponible tras compilar Pagefind.';
    }
  });
}

function initPwaRegistration() {
  if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
  }
}

function bootAcademiaClient() {
  initThemeToggle();
  initArchetypeSelector();
  initVideoFacades();
  initTiktokenExplorer();
  initIsolatedSocraticTutor();
  initPagefindSearch();
  initPwaRegistration();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootAcademiaClient, { once: true });
} else {
  bootAcademiaClient();
}
