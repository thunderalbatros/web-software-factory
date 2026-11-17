/**
 * verify-client.mjs — Client-Side Ed25519 Cryptographic Certificate Verifier & Pure SVG QR Renderer
 * Zero innerHTML (Trusted Types strict compliant).
 */

import { renderQrMatrixToSvgElement } from '../lib/qr-svg.mjs';

function fromBase64UrlToUint8(b64Url = '') {
  const b64 = String(b64Url || '').replace(/-/g, '+').replace(/_/g, '/');
  const pad = b64.length % 4 === 0 ? b64 : b64 + '='.repeat(4 - (b64.length % 4));
  const bin = atob(pad);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    out[i] = bin.charCodeAt(i);
  }
  return out;
}

async function verifyEd25519Client(payloadJson, signatureB64Url, publicJwk) {
  try {
    if (!publicJwk?.x || !signatureB64Url || !payloadJson) return false;
    const key = await window.crypto.subtle.importKey(
      'jwk',
      { kty: 'OKP', crv: 'Ed25519', x: String(publicJwk.x) },
      'Ed25519',
      false,
      ['verify']
    );
    return await window.crypto.subtle.verify(
      'Ed25519',
      key,
      fromBase64UrlToUint8(signatureB64Url),
      new TextEncoder().encode(String(payloadJson))
    );
  } catch {
    return false;
  }
}

async function bootVerifyPage() {
  const codeInput = document.querySelector('[data-cert-code-input]');
  const fetchBtn = document.querySelector('[data-cert-fetch-btn]');
  const statusEl = document.querySelector('[data-cert-lookup-status]');
  const jsonInput = document.querySelector('[data-cert-json-input]');
  const manualBtn = document.querySelector('[data-cert-manual-verify-btn]');
  const diplomaBox = document.querySelector('[data-cert-diploma-box]');
  const recipientEl = document.querySelector('[data-diploma-recipient]');
  const summaryEl = document.querySelector('[data-diploma-summary]');
  const metaEl = document.querySelector('[data-diploma-meta]');
  const cryptoEl = document.querySelector('[data-diploma-crypto-status]');
  const qrSlotEl = document.querySelector('[data-cert-qr-slot]');
  const repoLinkEl = document.querySelector('[data-diploma-repo-link]');
  const printBtn = document.querySelector('[data-diploma-print-btn]');

  if (!codeInput || !diplomaBox) return;

  const renderResult = async ({ payloadJson, payload, ed25519Signature, publicJwk }) => {
    const valid = await verifyEd25519Client(payloadJson, ed25519Signature, publicJwk);
    const parsedPayload = payload || JSON.parse(payloadJson);
    diplomaBox.hidden = false;
    if (recipientEl) recipientEl.textContent = String(parsedPayload.recipientName || 'Titular');
    if (summaryEl) {
      summaryEl.textContent = `Acreditó ${parsedPayload.levelLabel || `Nivel ${parsedPayload.level}`} en la ruta ${parsedPayload.pathTitleEs || parsedPayload.pathId}.`;
    }
    if (metaEl) {
      metaEl.textContent = `Código: ${parsedPayload.certCode} · Emisor: ${parsedPayload.issuer || 'Academia Libre'} · Fecha: ${String(parsedPayload.issuedAt || '').slice(0, 10)}`;
    }
    if (cryptoEl) {
      cryptoEl.textContent = valid
        ? `FIRMA ED25519 VÁLIDA (clave pública x=${String(publicJwk?.x || '').slice(0, 12)}...)`
        : 'FIRMA ED25519 INVÁLIDA O PAYLOAD ADULTERADO';
    }
    if (repoLinkEl) {
      const repoUrl = String(parsedPayload.githubRepoUrl || '');
      if (repoUrl.startsWith('https://github.com/')) {
        repoLinkEl.href = repoUrl;
        repoLinkEl.hidden = false;
      } else {
        repoLinkEl.hidden = true;
      }
    }
    if (qrSlotEl) {
      const verifyUrl = `${window.location.origin}/verificar/?code=${encodeURIComponent(parsedPayload.certCode || '')}`;
      const svgEl = renderQrMatrixToSvgElement(document, verifyUrl, 156);
      qrSlotEl.replaceChildren(svgEl);
    }
    if (jsonInput) {
      jsonInput.value = JSON.stringify({ payloadJson, ed25519Signature, publicJwk }, null, 2);
    }
  };

  const lookupCode = async (certCode) => {
    const clean = String(certCode || '').trim();
    if (!clean) return;
    if (statusEl) statusEl.textContent = `Consultando ${clean}...`;
    try {
      const res = await fetch(`/api/certificates/${encodeURIComponent(clean)}`);
      const out = await res.json();
      if (!res.ok || !out.found) {
        if (statusEl) statusEl.textContent = `No encontrado: ${out.error || 'CERTIFICATE_NOT_FOUND'}`;
        diplomaBox.hidden = true;
        return;
      }
      if (statusEl) statusEl.textContent = 'Certificado recuperado; verificación criptográfica completada en el navegador.';
      await renderResult(out);
    } catch {
      if (statusEl) statusEl.textContent = 'Error de red consultando el certificado.';
    }
  };

  if (fetchBtn) {
    fetchBtn.addEventListener('click', () => {
      void lookupCode(codeInput.value);
    });
  }

  if (manualBtn && jsonInput) {
    manualBtn.addEventListener('click', async () => {
      try {
        const parsed = JSON.parse(String(jsonInput.value || ''));
        let pubJwk = parsed.publicJwk;
        if (!pubJwk) {
          const pkRes = await fetch('/api/certificates/public-key');
          if (pkRes.ok) pubJwk = (await pkRes.json()).publicJwk;
        }
        await renderResult({
          payloadJson: parsed.payloadJson,
          ed25519Signature: parsed.ed25519Signature,
          publicJwk: pubJwk
        });
      } catch {
        if (statusEl) statusEl.textContent = 'JSON inválido para verificación manual.';
      }
    });
  }

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  const params = new URLSearchParams(window.location.search);
  const queryCode = params.get('code');
  if (queryCode) {
    codeInput.value = queryCode;
    void lookupCode(queryCode);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { void bootVerifyPage(); }, { once: true });
} else {
  void bootVerifyPage();
}
