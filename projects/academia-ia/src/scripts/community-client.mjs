/**
 * community-client.mjs — Open-Read / Merit-Post Client Controller for `/comunidad/`
 * Zero `innerHTML` (100% DOM APIs for strict Trusted Types compliance).
 */

import { PATH_CATALOG } from '../lib/curriculum-paths.mjs';

const ALLOWED_MESSAGE_LINK_HOSTS = new Set([
  'github.com',
  'gitlab.com',
  'huggingface.co',
  'codepen.io',
  'stackblitz.com',
  'academia-ia.pages.dev'
]);

const ALLOWED_PROFILE_BADGE_HOSTS = new Set([
  'github.com',
  'linkedin.com',
  'www.linkedin.com',
  'x.com'
]);

function isSafeDisplayUrl(rawUrl, allowProfileSocialHosts = false) {
  const raw = String(rawUrl || '').trim();
  if (!raw) return false;
  if (raw.startsWith('/') && !raw.startsWith('//')) return !allowProfileSocialHosts;
  try {
    const parsed = new URL(raw);
    const host = parsed.hostname.toLowerCase();
    const allowSet = allowProfileSocialHosts ? ALLOWED_PROFILE_BADGE_HOSTS : ALLOWED_MESSAGE_LINK_HOSTS;
    return parsed.protocol === 'https:' && allowSet.has(host);
  } catch {
    return false;
  }
}

function buildAuthorBadgesRow(containerEl, author) {
  const nodes = [];
  const nameBadge = document.createElement('span');
  nameBadge.className = 'badge-pill';
  const pathTitle = PATH_CATALOG[author?.activePathId]?.titleEs || author?.activePathId || 'Ruta abierta';
  nameBadge.textContent = `${author?.displayName || 'Estudiante'} · Nivel ${author?.currentLevel || 1} (${pathTitle})`;
  nodes.push(nameBadge);

  const badges = author?.badges || {};
  if (badges.githubUrl && badges.githubLogin && isSafeDisplayUrl(badges.githubUrl, true)) {
    const ghLink = document.createElement('a');
    ghLink.className = 'badge-pill';
    ghLink.href = badges.githubUrl;
    ghLink.target = '_blank';
    ghLink.rel = 'noopener noreferrer';
    ghLink.textContent = `GitHub: @${badges.githubLogin}`;
    nodes.push(ghLink);
  }
  if (badges.linkedinUrl && isSafeDisplayUrl(badges.linkedinUrl, true)) {
    const liLink = document.createElement('a');
    liLink.className = 'badge-pill';
    liLink.href = badges.linkedinUrl;
    liLink.target = '_blank';
    liLink.rel = 'noopener noreferrer';
    liLink.textContent = 'LinkedIn verificado';
    nodes.push(liLink);
  }
  if (badges.xUrl && isSafeDisplayUrl(badges.xUrl, true)) {
    const xLink = document.createElement('a');
    xLink.className = 'badge-pill';
    xLink.href = badges.xUrl;
    xLink.target = '_blank';
    xLink.rel = 'noopener noreferrer';
    const handle = badges.xUrl.slice('https://x.com/'.length);
    xLink.textContent = `X: @${handle}`;
    nodes.push(xLink);
  }

  containerEl.replaceChildren(...nodes);
}

async function bootCommunityPage() {
  const authStatusEl = document.querySelector('[data-community-auth-status]');
  const tabBtns = [...document.querySelectorAll('[data-community-view-tab]')];
  const forumPanel = document.querySelector('[data-community-panel="forum"]');
  const chatPanel = document.querySelector('[data-community-panel="chat"]');

  const filterLevelEl = document.querySelector('[data-forum-filter-level]');
  const filterPathEl = document.querySelector('[data-forum-filter-path]');
  const filterCategoryEl = document.querySelector('[data-forum-filter-category]');
  const refreshThreadsBtn = document.querySelector('[data-forum-refresh-btn]');
  const forumStatusEl = document.querySelector('[data-forum-status]');
  const threadsListEl = document.querySelector('[data-forum-threads-list]');

  const detailPanel = document.querySelector('[data-thread-detail-panel]');
  const detailTitleEl = document.querySelector('[data-thread-detail-title]');
  const detailAuthorEl = document.querySelector('[data-thread-detail-author]');
  const detailBodyEl = document.querySelector('[data-thread-detail-body]');
  const detailRepoEl = document.querySelector('[data-thread-detail-repo]');
  const detailCloseBtn = document.querySelector('[data-thread-detail-close-btn]');
  const detailReportBtn = document.querySelector('[data-thread-detail-report-btn]');
  const repliesListEl = document.querySelector('[data-thread-replies-list]');
  const replyForm = document.querySelector('[data-reply-create-form]');
  const replyBodyInput = document.querySelector('[data-reply-body]');
  const replySubmitBtn = document.querySelector('[data-reply-submit-btn]');
  const replyStatusEl = document.querySelector('[data-reply-form-status]');

  const threadForm = document.querySelector('[data-thread-create-form]');
  const threadLevelEl = document.querySelector('[data-thread-level]');
  const threadCategoryEl = document.querySelector('[data-thread-category]');
  const threadPathEl = document.querySelector('[data-thread-path]');
  const threadTitleEl = document.querySelector('[data-thread-title]');
  const threadBodyEl = document.querySelector('[data-thread-body]');
  const threadRepoEl = document.querySelector('[data-thread-repo]');
  const threadSubmitBtn = document.querySelector('[data-thread-submit-btn]');
  const threadFormStatusEl = document.querySelector('[data-thread-form-status]');

  const chatRoomBtns = [...document.querySelectorAll('[data-chat-room-btn]')];
  const chatStatusEl = document.querySelector('[data-chat-status]');
  const chatMessagesListEl = document.querySelector('[data-chat-messages-list]');
  const chatForm = document.querySelector('[data-chat-send-form]');
  const chatBodyEl = document.querySelector('[data-chat-body]');
  const chatUrlEl = document.querySelector('[data-chat-url]');
  const chatSubmitBtn = document.querySelector('[data-chat-submit-btn]');
  const chatFormStatusEl = document.querySelector('[data-chat-form-status]');

  if (!forumPanel || !chatPanel || !threadsListEl) return;

  let canPost = false;
  let activeThreadId = null;
  let activeChatRoom = 1;
  let activeWebSocket = null;

  const setPostControlsEnabled = (enabled) => {
    for (const btn of [threadSubmitBtn, replySubmitBtn, chatSubmitBtn]) {
      if (btn) btn.disabled = !enabled;
    }
    if (detailReportBtn) detailReportBtn.hidden = !enabled;
  };

  const syncAuthMeritState = async () => {
    try {
      const res = await fetch('/api/me', { credentials: 'same-origin' });
      if (!res.ok) throw new Error('AUTH_CHECK_FAILED');
      const data = await res.json();
      if (!data.authenticated || !data.user) {
        canPost = false;
        setPostControlsEnabled(false);
        if (authStatusEl) {
          authStatusEl.textContent =
            'Modo lectura abierto (sin sesión). Inicia sesión en Perfil y suma 45 XP para publicar o reportar.';
        }
        return;
      }
      const xp = Number(data.user.xpTotal || 0);
      canPost = xp >= 45;
      setPostControlsEnabled(canPost);
      if (authStatusEl) {
        authStatusEl.textContent = canPost
          ? `Sesión activa (${data.user.displayName} · ${xp} XP): escritura y moderación comunitaria habilitadas.`
          : `Sesión activa (${data.user.displayName} · ${xp}/45 XP): completa 1 lección + autoevaluación en tu ruta para habilitar publicaciones.`;
      }
    } catch {
      canPost = false;
      setPostControlsEnabled(false);
      if (authStatusEl) {
        authStatusEl.textContent = 'Modo lectura abierto (conecta el Worker local/Edge para publicar con 45 XP).';
      }
    }
  };

  const submitReport = async (targetType, targetId, statusTargetEl) => {
    if (!canPost) return;
    try {
      const res = await fetch('/api/community/reports', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetType,
          targetId,
          reason: 'Contenido reportado desde la comunidad por incumplir normas de seguridad o convivencia.'
        })
      });
      const out = await res.json();
      if (!res.ok) {
        if (statusTargetEl) statusTargetEl.textContent = `No se pudo enviar el reporte (${out.error || res.status}).`;
        return;
      }
      if (statusTargetEl) {
        statusTargetEl.textContent = out.autoHidden
          ? 'Reporte registrado: contenido ocultado preventivamente al alcanzar 3 reportes.'
          : `Reporte registrado (${out.reportCount}/3 para ocultamiento preventivo).`;
      }
      if (out.autoHidden) {
        if (targetType === 'thread') {
          if (detailPanel) detailPanel.hidden = true;
          activeThreadId = null;
          await loadForumThreads();
        } else if (targetType === 'reply' && activeThreadId) {
          await openThreadDetail(activeThreadId);
        } else if (targetType === 'chat_message') {
          await loadChatRoom(activeChatRoom);
        }
      }
    } catch {
      if (statusTargetEl) statusTargetEl.textContent = 'Error de red al enviar el reporte.';
    }
  };

  const renderReplies = (replies = []) => {
    if (!repliesListEl) return;
    if (replies.length === 0) {
      const emptyLi = document.createElement('li');
      emptyLi.className = 'tool-item';
      const p = document.createElement('p');
      p.textContent = 'Todavía no hay respuestas en este hilo. Sé la primera persona en aportar.';
      emptyLi.append(p);
      repliesListEl.replaceChildren(emptyLi);
      return;
    }
    const items = replies.map((rep) => {
      const li = document.createElement('li');
      li.className = 'tool-item';
      const badgesDiv = document.createElement('div');
      badgesDiv.className = 'badge-pills-row';
      buildAuthorBadgesRow(badgesDiv, rep.author);
      const bodyP = document.createElement('p');
      bodyP.textContent = rep.bodyMd;
      const metaP = document.createElement('p');
      metaP.className = 'tutor-status-line';
      metaP.textContent = `Publicado el ${String(rep.createdAt || '').slice(0, 10)}`;
      li.append(badgesDiv, bodyP, metaP);

      if (canPost) {
        const actions = document.createElement('div');
        actions.className = 'card-actions-row';
        const rptBtn = document.createElement('button');
        rptBtn.type = 'button';
        rptBtn.className = 'btn-danger-outline';
        rptBtn.textContent = 'Reportar respuesta';
        rptBtn.addEventListener('click', () => {
          void submitReport('reply', rep.id, replyStatusEl);
        });
        actions.append(rptBtn);
        li.append(actions);
      }
      return li;
    });
    repliesListEl.replaceChildren(...items);
  };

  const openThreadDetail = async (threadId) => {
    if (!detailPanel) return;
    try {
      const res = await fetch(`/api/community/threads/${encodeURIComponent(threadId)}`);
      if (!res.ok) {
        if (forumStatusEl) forumStatusEl.textContent = 'Hilo no disponible o archivado por moderación.';
        return;
      }
      const data = await res.json();
      activeThreadId = data.thread.id;
      detailPanel.hidden = false;
      if (detailTitleEl) detailTitleEl.textContent = data.thread.title;
      if (detailAuthorEl) buildAuthorBadgesRow(detailAuthorEl, data.thread.author);
      if (detailBodyEl) detailBodyEl.textContent = data.thread.bodyMd;
      if (detailRepoEl) {
        if (data.thread.attachedRepoUrl && isSafeDisplayUrl(data.thread.attachedRepoUrl)) {
          detailRepoEl.href = data.thread.attachedRepoUrl;
          detailRepoEl.hidden = false;
        } else {
          detailRepoEl.hidden = true;
        }
      }
      if (detailReportBtn) {
        detailReportBtn.hidden = !canPost;
      }
      renderReplies(data.replies || []);
    } catch {
      if (forumStatusEl) forumStatusEl.textContent = 'No se pudo cargar el detalle del hilo.';
    }
  };

  const loadForumThreads = async () => {
    const params = new URLSearchParams();
    if (filterLevelEl?.value) params.set('level', filterLevelEl.value);
    if (filterPathEl?.value) params.set('pathId', filterPathEl.value);
    if (filterCategoryEl?.value) params.set('category', filterCategoryEl.value);
    const qs = params.toString() ? `?${params.toString()}` : '';

    try {
      const res = await fetch(`/api/community/threads${qs}`);
      if (!res.ok) throw new Error('THREADS_FETCH_FAILED');
      const data = await res.json();
      const threads = Array.isArray(data.threads) ? data.threads : [];
      if (forumStatusEl) {
        forumStatusEl.textContent =
          threads.length > 0
            ? `Mostrando ${threads.length} hilo(s) verificado(s).`
            : 'No hay hilos publicados con esos filtros todavía.';
      }
      if (threads.length === 0) {
        const emptyLi = document.createElement('li');
        emptyLi.className = 'tool-item';
        const p = document.createElement('p');
        p.textContent = 'Todavía no hay publicaciones en este filtro. Quien sume 45 XP puede iniciar la conversación.';
        emptyLi.append(p);
        threadsListEl.replaceChildren(emptyLi);
        return;
      }
      const nodes = threads.map((t) => {
        const li = document.createElement('li');
        li.className = 'tool-item';
        li.setAttribute('data-card-level', String(t.level));

        const meta = document.createElement('p');
        meta.className = 'tutor-status-line';
        meta.textContent = `Nivel ${t.level} · ${t.category} · ${String(t.createdAt || '').slice(0, 10)} · ${t.replyCount} respuesta(s)`;

        const h3 = document.createElement('h3');
        h3.className = 'editorial-h3';
        h3.textContent = t.title;

        const badgesDiv = document.createElement('div');
        badgesDiv.className = 'badge-pills-row';
        buildAuthorBadgesRow(badgesDiv, t.author);

        const bodyPreview = document.createElement('p');
        bodyPreview.textContent = t.bodyMd.length > 220 ? `${t.bodyMd.slice(0, 220)}...` : t.bodyMd;

        const actions = document.createElement('div');
        actions.className = 'card-actions-row';
        const openBtn = document.createElement('button');
        openBtn.type = 'button';
        openBtn.className = 'btn-editorial';
        openBtn.textContent = `Abrir hilo (${t.replyCount})`;
        openBtn.addEventListener('click', () => {
          void openThreadDetail(t.id);
        });
        actions.append(openBtn);

        if (t.attachedRepoUrl && isSafeDisplayUrl(t.attachedRepoUrl)) {
          const repoLink = document.createElement('a');
          repoLink.className = 'badge-pill';
          repoLink.href = t.attachedRepoUrl;
          repoLink.target = '_blank';
          repoLink.rel = 'noopener noreferrer';
          repoLink.textContent = 'Repositorio';
          actions.append(repoLink);
        }

        li.append(meta, h3, badgesDiv, bodyPreview, actions);
        return li;
      });
      threadsListEl.replaceChildren(...nodes);
    } catch {
      if (forumStatusEl) {
        forumStatusEl.textContent = 'Lectura en modo estático sin base de datos conectada en este origen.';
      }
    }
  };

  const renderChatMessages = (messages = []) => {
    if (!chatMessagesListEl) return;
    if (messages.length === 0) {
      const emptyLi = document.createElement('li');
      emptyLi.className = 'tool-item';
      const p = document.createElement('p');
      p.textContent = `Sala Nivel ${activeChatRoom} sin mensajes recientes.`;
      emptyLi.append(p);
      chatMessagesListEl.replaceChildren(emptyLi);
      return;
    }
    const items = messages.map((msg) => {
      const li = document.createElement('li');
      li.className = 'tool-item';
      li.setAttribute('data-chat-msg-id', msg.id);

      const badgesDiv = document.createElement('div');
      badgesDiv.className = 'badge-pills-row';
      buildAuthorBadgesRow(badgesDiv, msg.author);

      const bodyP = document.createElement('p');
      bodyP.textContent = msg.bodyText;

      const metaP = document.createElement('p');
      metaP.className = 'tutor-status-line';
      metaP.textContent = `Sala Nivel ${msg.roomLevel} · ${String(msg.createdAt || '').slice(0, 16).replace('T', ' ')}`;

      li.append(badgesDiv, bodyP, metaP);

      const actions = document.createElement('div');
      actions.className = 'card-actions-row';
      if (msg.attachedUrl && isSafeDisplayUrl(msg.attachedUrl)) {
        const link = document.createElement('a');
        link.className = 'badge-pill';
        link.href = msg.attachedUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Enlace adjunto';
        actions.append(link);
      }
      if (canPost) {
        const rptBtn = document.createElement('button');
        rptBtn.type = 'button';
        rptBtn.className = 'btn-danger-outline';
        rptBtn.textContent = 'Reportar mensaje';
        rptBtn.addEventListener('click', () => {
          void submitReport('chat_message', msg.id, chatFormStatusEl);
        });
        actions.append(rptBtn);
      }
      if (actions.childNodes.length > 0) li.append(actions);
      return li;
    });
    chatMessagesListEl.replaceChildren(...items);
  };

  const closeActiveChatSocket = () => {
    if (activeWebSocket) {
      try {
        activeWebSocket.close();
      } catch {}
      activeWebSocket = null;
    }
  };

  const loadChatRoom = async (roomLevel) => {
    activeChatRoom = Number(roomLevel);
    for (const btn of chatRoomBtns) {
      const active = Number(btn.getAttribute('data-chat-room-btn')) === activeChatRoom;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    }
    closeActiveChatSocket();
    try {
      const res = await fetch(`/api/community/chat/${activeChatRoom}`);
      if (!res.ok) throw new Error('CHAT_FETCH_FAILED');
      const data = await res.json();
      const messages = Array.isArray(data.messages) ? data.messages : [];
      renderChatMessages(messages);
      if (chatStatusEl) {
        chatStatusEl.textContent = data.realtimeAvailable
          ? `Sala Nivel ${activeChatRoom} conectada en tiempo real (WebSocket Hibernation + D1).`
          : `Sala Nivel ${activeChatRoom} sincronizada vía HTTPS (/api/community/chat/${activeChatRoom}).`;
      }
      if (data.realtimeAvailable && typeof window.WebSocket === 'function') {
        const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const ws = new WebSocket(`${proto}//${window.location.host}/api/community/chat/${activeChatRoom}`);
        ws.addEventListener('message', (ev) => {
          try {
            const payload = JSON.parse(String(ev.data || '{}'));
            if (payload.type === 'new_message' || payload.type === 'message_hidden') {
              void loadChatRoom(activeChatRoom);
            }
          } catch {}
        });
        activeWebSocket = ws;
      }
    } catch {
      if (chatStatusEl) {
        chatStatusEl.textContent = `Sala Nivel ${activeChatRoom} disponible al conectar el backend D1/Worker.`;
      }
    }
  };

  const switchView = (viewName) => {
    const isChat = viewName === 'chat';
    forumPanel.hidden = isChat;
    chatPanel.hidden = !isChat;
    for (const btn of tabBtns) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-community-view-tab') === viewName ? 'true' : 'false');
    }
    if (isChat) {
      void loadChatRoom(activeChatRoom);
    } else {
      closeActiveChatSocket();
      void loadForumThreads();
    }
  };

  for (const btn of tabBtns) {
    btn.addEventListener('click', () => {
      switchView(btn.getAttribute('data-community-view-tab') || 'forum');
    });
  }

  for (const btn of chatRoomBtns) {
    btn.addEventListener('click', () => {
      const lvl = Number(btn.getAttribute('data-chat-room-btn') || '1');
      void loadChatRoom(lvl);
    });
  }

  if (refreshThreadsBtn) {
    refreshThreadsBtn.addEventListener('click', () => {
      void loadForumThreads();
    });
  }
  for (const sel of [filterLevelEl, filterPathEl, filterCategoryEl]) {
    if (sel) {
      sel.addEventListener('change', () => {
        void loadForumThreads();
      });
    }
  }

  if (detailCloseBtn && detailPanel) {
    detailCloseBtn.addEventListener('click', () => {
      detailPanel.hidden = true;
      activeThreadId = null;
    });
  }
  if (detailReportBtn) {
    detailReportBtn.addEventListener('click', () => {
      if (activeThreadId) void submitReport('thread', activeThreadId, replyStatusEl);
    });
  }

  if (threadForm) {
    threadForm.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      if (!canPost) {
        if (threadFormStatusEl) threadFormStatusEl.textContent = 'Necesitas iniciar sesión y sumar 45 XP para publicar.';
        return;
      }
      const payload = {
        level: Number(threadLevelEl?.value || 1),
        category: String(threadCategoryEl?.value || 'proyectos'),
        pathId: String(threadPathEl?.value || 'uso_cotidiano'),
        title: String(threadTitleEl?.value || '').trim(),
        bodyMd: String(threadBodyEl?.value || '').trim(),
        ...(threadRepoEl?.value?.trim() ? { attachedRepoUrl: threadRepoEl.value.trim() } : {})
      };
      try {
        const res = await fetch('/api/community/threads', {
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const out = await res.json();
        if (!res.ok) {
          if (threadFormStatusEl) {
            threadFormStatusEl.textContent =
              out.error === 'MODERATION_BLOCKED'
                ? out.messageEs || `Bloqueado por moderación (${out.reasonCode}): revisa enlaces externos, datos personales o lenguaje.`
                : `No se pudo publicar (${out.error || res.status}).`;
          }
          return;
        }
        threadForm.reset();
        if (threadFormStatusEl) threadFormStatusEl.textContent = 'Hilo publicado y verificado por moderación.';
        await loadForumThreads();
      } catch {
        if (threadFormStatusEl) threadFormStatusEl.textContent = 'Error de red al publicar el hilo.';
      }
    });
  }

  if (replyForm) {
    replyForm.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      if (!activeThreadId || !canPost) return;
      try {
        const res = await fetch(`/api/community/threads/${encodeURIComponent(activeThreadId)}/replies`, {
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bodyMd: String(replyBodyInput?.value || '').trim() })
        });
        const out = await res.json();
        if (!res.ok) {
          if (replyStatusEl) {
            replyStatusEl.textContent =
              out.error === 'MODERATION_BLOCKED'
                ? out.messageEs || `Respuesta bloqueada por moderación (${out.reasonCode}).`
                : `Error al responder (${out.error || res.status}).`;
          }
          return;
        }
        if (replyBodyInput) replyBodyInput.value = '';
        if (replyStatusEl) replyStatusEl.textContent = 'Respuesta publicada.';
        await openThreadDetail(activeThreadId);
      } catch {
        if (replyStatusEl) replyStatusEl.textContent = 'Error de red al enviar la respuesta.';
      }
    });
  }

  if (chatForm) {
    chatForm.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      if (!canPost) {
        if (chatFormStatusEl) chatFormStatusEl.textContent = 'Necesitas 45 XP para escribir en la sala.';
        return;
      }
      const payload = {
        bodyText: String(chatBodyEl?.value || '').trim(),
        ...(chatUrlEl?.value?.trim() ? { attachedUrl: chatUrlEl.value.trim() } : {})
      };
      try {
        const res = await fetch(`/api/community/chat/${activeChatRoom}`, {
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const out = await res.json();
        if (!res.ok) {
          if (chatFormStatusEl) {
            chatFormStatusEl.textContent =
              out.error === 'MODERATION_BLOCKED'
                ? out.messageEs || `Mensaje bloqueado por moderación (${out.reasonCode}).`
                : `No se pudo enviar (${out.error || res.status}).`;
          }
          return;
        }
        chatForm.reset();
        if (chatFormStatusEl) chatFormStatusEl.textContent = 'Mensaje publicado en la sala.';
        await loadChatRoom(activeChatRoom);
      } catch {
        if (chatFormStatusEl) chatFormStatusEl.textContent = 'Error de red enviando el mensaje.';
      }
    });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const qLevel = urlParams.get('level');
  const qCat = urlParams.get('category');
  const qView = urlParams.get('view');
  if (qLevel && filterLevelEl && ['1', '2', '3'].includes(qLevel)) {
    filterLevelEl.value = qLevel;
    if (threadLevelEl) threadLevelEl.value = qLevel;
    activeChatRoom = Number(qLevel);
  }
  if (qCat && filterCategoryEl) {
    filterCategoryEl.value = qCat;
    if (threadCategoryEl) threadCategoryEl.value = qCat;
  }

  await syncAuthMeritState();
  switchView(qView === 'chat' ? 'chat' : 'forum');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { void bootCommunityPage(); }, { once: true });
} else {
  void bootCommunityPage();
}
