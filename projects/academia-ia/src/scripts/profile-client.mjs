/**
 * profile-client.mjs — Client Dashboard, Canvas 128x128 WebP Stripper & Certificate Issuer
 * Strictly DOM API only (zero innerHTML for Trusted Types compliance).
 */

import {
  hasLoggedInHintCookie,
  saveLocalPreferences,
  getLocalProgressSnapshot,
  syncLocalProgressWithServer
} from '../lib/local-progress-store.mjs';
import {
  PATH_CATALOG,
  evaluateCalibrationCases
} from '../lib/curriculum-paths.mjs';

function clearAndRenderBadges(rowEl, user) {
  const pills = [];
  if (user.googleLinked) {
    const gSpan = document.createElement('span');
    gSpan.className = 'badge-pill';
    gSpan.textContent = 'Google verificado';
    pills.push(gSpan);
  }
  if (user.githubUrl && user.githubLogin) {
    const ghLink = document.createElement('a');
    ghLink.className = 'badge-pill';
    ghLink.href = user.githubUrl;
    ghLink.target = '_blank';
    ghLink.rel = 'noopener noreferrer';
    ghLink.textContent = `GitHub: @${user.githubLogin}`;
    pills.push(ghLink);
  }
  if (user.linkedinUrl && user.linkedinUrl.startsWith('https://www.linkedin.com/in/')) {
    const liLink = document.createElement('a');
    liLink.className = 'badge-pill';
    liLink.href = user.linkedinUrl;
    liLink.target = '_blank';
    liLink.rel = 'noopener noreferrer';
    liLink.textContent = 'LinkedIn verificado en perfil';
    pills.push(liLink);
  }
  if (user.xUrl && user.xUrl.startsWith('https://x.com/')) {
    const xLink = document.createElement('a');
    xLink.className = 'badge-pill';
    xLink.href = user.xUrl;
    xLink.target = '_blank';
    xLink.rel = 'noopener noreferrer';
    xLink.textContent = `X: @${user.xUrl.slice('https://x.com/'.length)}`;
    pills.push(xLink);
  }
  rowEl.replaceChildren(...pills);
}

function renderProgressBars(containerEl, progress) {
  const rows = [
    {
      label: `Avance Total (${progress.activePathTitleEs})`,
      pct: progress.overallPct
    },
    {
      label: `Nivel 1 · Principiante (${progress.levels[1].universalCompleted}/${progress.levels[1].universalTotal} universal)`,
      pct: progress.level1Pct
    },
    {
      label: `Nivel 2 · Intermedio (${progress.levels[2].universalCompleted}/${progress.levels[2].universalTotal} univ + ${progress.levels[2].pathCompleted}/${progress.levels[2].pathTotal} ruta)`,
      pct: progress.level2Pct
    },
    {
      label: `Nivel 3 · Avanzado (${progress.levels[3].universalCompleted}/${progress.levels[3].universalTotal} univ + ${progress.levels[3].pathCompleted}/${progress.levels[3].pathTotal} ruta)`,
      pct: progress.level3Pct
    }
  ];

  const nodes = rows.map((r) => {
    const wrap = document.createElement('div');
    wrap.className = 'progress-row';

    const head = document.createElement('div');
    head.className = 'progress-row-head';
    const labelSpan = document.createElement('span');
    labelSpan.textContent = r.label;
    const pctSpan = document.createElement('strong');
    pctSpan.className = 'tabular-metric';
    pctSpan.textContent = `${r.pct}%`;
    head.append(labelSpan, pctSpan);

    const track = document.createElement('div');
    track.className = 'progress-bar-track';
    const fill = document.createElement('div');
    fill.className = 'progress-bar-fill';
    fill.style.width = `${Math.max(0, Math.min(100, r.pct))}%`;
    track.appendChild(fill);

    wrap.append(head, track);
    return wrap;
  });
  containerEl.replaceChildren(...nodes);
}

async function encodeAvatarToStrippedWebp128(file) {
  const objectUrl = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.decoding = 'async';
    await new Promise((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('IMAGE_DECODE_FAILED'));
      img.src = objectUrl;
    });

    const side = Math.max(1, Math.min(img.naturalWidth || img.width, img.naturalHeight || img.height));
    const sx = Math.floor(((img.naturalWidth || img.width) - side) / 2);
    const sy = Math.floor(((img.naturalHeight || img.height) - side) / 2);

    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('CANVAS_2D_UNAVAILABLE');
    ctx.drawImage(img, sx, sy, side, side, 0, 0, 128, 128);

    for (const quality of [0.82, 0.65, 0.45]) {
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', quality));
      if (blob && blob.size <= 25600) {
        return blob;
      }
    }
    throw new Error('WEBP_EXCEEDS_25KB');
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function initOnboardingWizard() {
  const wizard = document.querySelector('[data-onboarding-wizard]');
  if (!wizard) return;

  const titleEl = wizard.querySelector('[data-onboarding-title]');
  const stepNumEl = wizard.querySelector('[data-onboarding-step-num]');
  const statusEl = wizard.querySelector('[data-onboarding-status]');
  const panes = [...wizard.querySelectorAll('[data-onboarding-pane]')];
  const resultEl = wizard.querySelector('[data-onb-result-text]');
  const ghLink = wizard.querySelector('[data-onb-github-link]');

  let selectedPath = 'uso_cotidiano';
  let selectedArchetype = 'pc_basica_zero_cost';
  let case1Choice = 'copy_directly';
  let case2Choice = 'single_prompt';

  const wireRadioGroup = (attrName, onSelect) => {
    const btns = [...wizard.querySelectorAll(`[${attrName}]`)];
    for (const btn of btns) {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute(attrName);
        if (!val) return;
        for (const other of btns) {
          other.setAttribute('aria-checked', other === btn ? 'true' : 'false');
        }
        onSelect(val);
      });
    }
  };

  wireRadioGroup('data-onb-path', (v) => { selectedPath = v; });
  wireRadioGroup('data-onb-archetype', (v) => { selectedArchetype = v; });
  wireRadioGroup('data-onb-case1', (v) => { case1Choice = v; });
  wireRadioGroup('data-onb-case2', (v) => { case2Choice = v; });

  const showPane = (paneId) => {
    for (const p of panes) {
      p.hidden = p.getAttribute('data-onboarding-pane') !== String(paneId);
    }
    if (stepNumEl && /^[1-4]$/.test(String(paneId))) {
      stepNumEl.textContent = String(paneId);
    }
    if (titleEl && typeof titleEl.focus === 'function') {
      titleEl.focus();
    }
  };

  const openWizard = () => {
    wizard.hidden = false;
    showPane('1');
  };

  for (const nextBtn of wizard.querySelectorAll('[data-onb-next]')) {
    nextBtn.addEventListener('click', () => {
      showPane(nextBtn.getAttribute('data-onb-next'));
    });
  }
  for (const prevBtn of wizard.querySelectorAll('[data-onb-prev]')) {
    prevBtn.addEventListener('click', () => {
      showPane(prevBtn.getAttribute('data-onb-prev'));
    });
  }
  for (const dismissBtn of wizard.querySelectorAll('[data-onb-dismiss]')) {
    dismissBtn.addEventListener('click', () => {
      wizard.hidden = true;
    });
  }

  const submitOnboarding = async (startFromScratch) => {
    const payload = {
      activePathId: selectedPath,
      hardwareArchetypeId: selectedArchetype,
      startFromScratch: Boolean(startFromScratch),
      case1Choice,
      case2Choice
    };
    const localEval = evaluateCalibrationCases(payload);
    await saveLocalPreferences({
      activePathId: selectedPath,
      hardwareArchetypeId: selectedArchetype,
      calibratedLevel: localEval.calibratedLevel,
      onboardingCompleted: true
    });

    let rationale = localEval.rationaleEs;
    let offerGh = localEval.offerGithubLink;
    if (hasLoggedInHintCookie()) {
      try {
        const res = await fetch('/api/me/onboarding', {
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const data = await res.json();
          if (data?.calibration) {
            rationale = data.calibration.rationaleEs;
            offerGh = Boolean(data.calibration.offerGithubLink && !data.user?.githubLogin);
          }
          window.dispatchEvent(new CustomEvent('academia-libre:profile-updated', { detail: data }));
        }
      } catch {
        if (statusEl) statusEl.textContent = 'Preferencia guardada localmente; inicia sesión para respaldarla.';
      }
    }

    const pathMeta = PATH_CATALOG[selectedPath];
    if (resultEl) {
      resultEl.textContent = `Ruta activa: ${pathMeta?.titleEs || selectedPath}. ${rationale}`;
    }
    if (ghLink) {
      ghLink.hidden = !offerGh;
    }
    showPane('done');
  };

  for (const scratchBtn of wizard.querySelectorAll('[data-onb-scratch]')) {
    scratchBtn.addEventListener('click', () => { void submitOnboarding(true); });
  }
  const submitBtn = wizard.querySelector('[data-onb-submit]');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => { void submitOnboarding(false); });
  }

  window.addEventListener('academia-libre:open-onboarding', openWizard);
  if (new URLSearchParams(window.location.search).get('onboarding') === '1') {
    openWizard();
  }
}

async function bootProfilePage() {
  const guestBox = document.querySelector('[data-profile-guest]');
  const authBox = document.querySelector('[data-profile-auth]');
  if (!guestBox || !authBox) return;

  initOnboardingWizard();

  for (const btn of document.querySelectorAll('[data-open-onboarding-btn]')) {
    btn.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('academia-libre:open-onboarding'));
    });
  }

  const refreshGuestView = async () => {
    const snap = await getLocalProgressSnapshot();
    const xpEl = document.querySelector('[data-guest-xp]');
    const pctEl = document.querySelector('[data-guest-pct]');
    const pathEl = document.querySelector('[data-guest-path]');
    if (xpEl) xpEl.textContent = String(snap.xpTotal);
    if (pctEl) pctEl.textContent = `${snap.progress.overallPct}%`;
    if (pathEl) pathEl.textContent = snap.progress.activePathTitleEs;
  };

  const renderAuthenticatedState = (data) => {
    const { user, progress, certificates = [] } = data;
    guestBox.hidden = true;
    authBox.hidden = false;

    const nameEl = document.querySelector('[data-profile-name-badge]');
    const metaEl = document.querySelector('[data-profile-meta-badge]');
    const avatarEl = document.querySelector('[data-profile-avatar-img]');
    const badgesRow = document.querySelector('[data-profile-badges-row]');
    const barsEl = document.querySelector('[data-progress-bars]');
    const summaryEl = document.querySelector('[data-progress-breakdown-summary]');
    const certActionsEl = document.querySelector('[data-level-cert-actions]');
    const pathNodesEl = document.querySelector('[data-path-nodes-list]');
    const repoInputEl = document.querySelector('[data-milestone-repo-input]');
    const certStatusEl = document.querySelector('[data-cert-issue-status]');
    const issuedListEl = document.querySelector('[data-issued-certs-list]');
    const ghLinkBtn = document.querySelector('[data-link-github-btn]');

    if (nameEl) nameEl.textContent = user.displayName;
    if (metaEl) {
      metaEl.textContent = `Nivel ${user.currentLevel} · ${user.xpTotal} XP · Ruta: ${progress.activePathTitleEs}`;
    }
    if (avatarEl) {
      if (user.avatarUrl) {
        avatarEl.src = `${user.avatarUrl}?v=${encodeURIComponent(user.updatedAt || '')}`;
        avatarEl.hidden = false;
      } else {
        avatarEl.hidden = true;
      }
    }
    if (badgesRow) clearAndRenderBadges(badgesRow, user);
    if (ghLinkBtn) {
      ghLinkBtn.textContent = user.githubLogin
        ? `GitHub enlazado (@${user.githubLogin}) — Actualizar`
        : 'Enlazar cuenta de GitHub (read:user)';
    }

    const dnInput = document.querySelector('[data-field-display-name]');
    const pathSel = document.querySelector('[data-field-path]');
    const archSel = document.querySelector('[data-field-archetype]');
    const liInput = document.querySelector('[data-field-linkedin]');
    const xInput = document.querySelector('[data-field-x]');
    if (dnInput) dnInput.value = user.displayName || '';
    if (pathSel && PATH_CATALOG[user.activePathId]) pathSel.value = user.activePathId;
    if (archSel) archSel.value = user.hardwareArchetypeId || 'pc_basica_zero_cost';
    if (liInput) liInput.value = user.linkedinUrl || '';
    if (xInput) xInput.value = user.xUrl || '';

    if (summaryEl) {
      summaryEl.textContent = `Tronco universal: ${progress.universalCompleted}/${progress.universalTotal} · Ruta activa (${progress.activePathTitleEs}): ${progress.pathCompleted}/${progress.pathTotal}`;
    }
    if (barsEl) renderProgressBars(barsEl, progress);

    if (pathNodesEl) {
      const nodeCards = [];
      for (const lvl of [2, 3]) {
        const pathOnlyNodes = (progress.levels[lvl]?.nodes || []).filter((n) => n.scope === 'path');
        for (const nodeItem of pathOnlyNodes) {
          const card = document.createElement('div');
          card.className = 'tool-item';
          const titleEl = document.createElement('strong');
          titleEl.textContent = `${nodeItem.titleEs} — ${nodeItem.completed ? 'Completado' : 'Pendiente'}`;
          card.appendChild(titleEl);
          if (!nodeItem.completed) {
            const btnRow = document.createElement('div');
            btnRow.className = 'card-actions-row';
            const ackBtn = document.createElement('button');
            ackBtn.type = 'button';
            ackBtn.className = 'btn-editorial';
            ackBtn.textContent =
              nodeItem.kind === 'milestone'
                ? `Registrar hito Nivel ${nodeItem.milestoneIndex} (+100 XP)`
                : `Completar especialidad Nivel ${lvl}`;
            ackBtn.addEventListener('click', async () => {
              const endpoint =
                nodeItem.kind === 'milestone' ? '/api/milestones/verify' : '/api/progress/event';
              const repoUrl = String(repoInputEl?.value || '').trim();
              const body =
                nodeItem.kind === 'milestone'
                  ? {
                      pathId: nodeItem.pathId,
                      milestoneIndex: nodeItem.milestoneIndex,
                      ...(repoUrl ? { githubRepoUrl: repoUrl } : {})
                    }
                  : {
                      lessonId: nodeItem.lessonId,
                      eventType: nodeItem.eventType
                    };
              const res = await fetch(endpoint, {
                method: 'POST',
                credentials: 'same-origin',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
              });
              const out = await res.json();
              if (!res.ok) {
                if (certStatusEl) certStatusEl.textContent = `Error al acreditar: ${out.error || 'VALIDACION'}`;
                return;
              }
              if (certStatusEl) certStatusEl.textContent = 'Nodo o hito de ruta acreditado.';
              renderAuthenticatedState(out);
            });
            btnRow.appendChild(ackBtn);
            card.appendChild(btnRow);
          }
          nodeCards.push(card);
        }
      }
      pathNodesEl.replaceChildren(...nodeCards);
    }

    if (certActionsEl) {
      const actionNodes = [];
      for (const lvl of [1, 2, 3]) {
        const lvlInfo = progress.levels[lvl];
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = lvlInfo.eligibleForCertificate ? 'btn-primary' : 'btn-editorial';
        btn.textContent = lvlInfo.eligibleForCertificate
          ? `Emitir certificado Nivel ${lvl} (Ed25519)`
          : `Certificado Nivel ${lvl} (${lvlInfo.pct}% completado)`;
        btn.addEventListener('click', async () => {
          const res = await fetch('/api/certificates/issue', {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ level: lvl, pathId: user.activePathId })
          });
          const out = await res.json();
          if (!res.ok) {
            if (certStatusEl) {
              certStatusEl.textContent = `Requisitos incompletos para Nivel ${lvl}: faltan ${ (out.missingItems || []).join(', ') }`;
            }
            return;
          }
          if (certStatusEl) {
            certStatusEl.textContent = `Certificado ${out.certificate.cert_code} firmado con Ed25519.`;
          }
          void loadSession();
        });
        actionNodes.push(btn);
      }
      certActionsEl.replaceChildren(...actionNodes);
    }

    if (issuedListEl) {
      const items = certificates.map((c) => {
        const card = document.createElement('div');
        card.className = 'tool-item';
        const heading = document.createElement('strong');
        heading.textContent = `Nivel ${c.level} (${c.path_id}) — Código ${c.cert_code} `;
        const link = document.createElement('a');
        link.href = `/verificar/?code=${encodeURIComponent(c.cert_code)}`;
        link.textContent = 'Verificar e imprimir diploma';
        card.append(heading, link);
        return card;
      });
      issuedListEl.replaceChildren(...items);
    }
  };

  const loadSession = async () => {
    try {
      const res = await fetch('/api/me', { credentials: 'same-origin' });
      if (res.ok) {
        const state = await res.json();
        if (state?.authenticated && state?.user) {
          await syncLocalProgressWithServer();
          const refreshed = await fetch('/api/me', { credentials: 'same-origin' });
          const nextState = refreshed.ok ? await refreshed.json() : state;
          renderAuthenticatedState(nextState);
          if (!nextState.user?.onboardingCompleted) {
            window.dispatchEvent(new CustomEvent('academia-libre:open-onboarding'));
          }
          return;
        }
      }
    } catch {}
    guestBox.hidden = false;
    authBox.hidden = true;
    await refreshGuestView();
  };

  const form = document.querySelector('[data-profile-update-form]');
  if (form) {
    form.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      const saveStatus = document.querySelector('[data-profile-save-status]');
      const payload = {
        displayName: String(document.querySelector('[data-field-display-name]')?.value || '').trim(),
        activePathId: String(document.querySelector('[data-field-path]')?.value || 'uso_cotidiano'),
        hardwareArchetypeId: String(document.querySelector('[data-field-archetype]')?.value || 'pc_basica_zero_cost'),
        linkedinUrl: String(document.querySelector('[data-field-linkedin]')?.value || '').trim(),
        xUrl: String(document.querySelector('[data-field-x]')?.value || '').trim()
      };
      const res = await fetch('/api/me', {
        method: 'PATCH',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const out = await res.json();
      if (!res.ok) {
        if (saveStatus) saveStatus.textContent = `Error al guardar: ${out.error || 'VALIDACION'}`;
        return;
      }
      if (saveStatus) saveStatus.textContent = 'Perfil, ruta y enlaces actualizados.';
      renderAuthenticatedState(out);
    });
  }

  const fileInput = document.querySelector('[data-avatar-file-input]');
  if (fileInput) {
    fileInput.addEventListener('change', async () => {
      const avatarStatus = document.querySelector('[data-avatar-status]');
      const file = fileInput.files?.[0];
      if (!file) return;
      try {
        const webpBlob = await encodeAvatarToStrippedWebp128(file);
        const res = await fetch('/api/me/avatar', {
          method: 'PUT',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'image/webp' },
          body: webpBlob
        });
        const out = await res.json();
        if (!res.ok) {
          if (avatarStatus) avatarStatus.textContent = `Avatar rechazado: ${out.error}`;
          return;
        }
        if (avatarStatus) {
          avatarStatus.textContent = `Avatar 128x128 WebP guardado sin EXIF (${out.byteLength} bytes).`;
        }
        await loadSession();
      } catch (err) {
        if (avatarStatus) avatarStatus.textContent = `Error procesando imagen: ${err.message}`;
      }
    });
  }

  const logoutBtn = document.querySelector('[data-logout-btn]');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' });
      await loadSession();
    });
  }

  const delArmBtn = document.querySelector('[data-delete-arm-btn]');
  const delConfirmBtn = document.querySelector('[data-delete-confirm-btn]');
  if (delArmBtn && delConfirmBtn) {
    delArmBtn.addEventListener('click', () => {
      delConfirmBtn.hidden = false;
      delConfirmBtn.focus();
    });
    delConfirmBtn.addEventListener('click', async () => {
      const actionStatus = document.querySelector('[data-account-action-status]');
      const res = await fetch('/api/me', { method: 'DELETE', credentials: 'same-origin' });
      if (res.ok) {
        delConfirmBtn.hidden = true;
        if (actionStatus) actionStatus.textContent = 'Cuenta y datos eliminados en cascada (Ley 25.326).';
        await loadSession();
      }
    });
  }

  window.addEventListener('academia-libre:profile-updated', (ev) => {
    if (ev?.detail?.user) renderAuthenticatedState(ev.detail);
  });

  await loadSession();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { void bootProfilePage(); }, { once: true });
} else {
  void bootProfilePage();
}
