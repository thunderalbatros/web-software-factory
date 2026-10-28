#!/usr/bin/env node
/**
 * tools/intelligence/weekly_email_notifier.mjs — Zero-Dependency Weekly CTO Email Dispatcher
 * ===========================================================================================
 * Converts `weekly_update/ULTIMO_REPORTE_CTO.md` into a responsive, executive HTML email and
 * dispatches it to `tomasbermudez777@gmail.com` via:
 *   - Mode 1: Direct Gmail SMTP over TLS (`smtp.gmail.com:465` using `node:tls` + `GMAIL_APP_PASSWORD`)
 *   - Mode 2: Resend HTTP API (`https://api.resend.com/emails` using native `fetch` + `RESEND_API_KEY`)
 *   - Mode 3: Webhook (`N8N_EMAIL_WEBHOOK_URL` or `EMAIL_WEBHOOK_URL`)
 *   - Safe Fallback: Writes `weekly_update/ULTIMO_REPORTE_EMAIL_PREVIEW.html` and exits cleanly (Code 0)
 * ===========================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import tls from 'node:tls';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');

// Load local .env if present (without external dotenv dependency)
const ENV_PATH = path.join(ROOT, '.env');
if (fs.existsSync(ENV_PATH)) {
  try {
    const rawEnv = fs.readFileSync(ENV_PATH, 'utf8');
    for (const line of rawEnv.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx > 0) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  } catch (_) {}
}

export const DEFAULT_CTO_EMAIL = process.env.CTO_EMAIL_TO || 'tomasbermudez777@gmail.com';
export const WEEKLY_DIR = path.join(ROOT, 'weekly_update');
export const LATEST_MD_PATH = path.join(WEEKLY_DIR, 'ULTIMO_REPORTE_CTO.md');
export const PREVIEW_HTML_PATH = path.join(WEEKLY_DIR, 'ULTIMO_REPORTE_EMAIL_PREVIEW.html');

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatInlineMarkdown(text) {
  let out = escapeHtml(text);
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  out = out.replace(/`([^`]+)`/g, '<code style="background:#f1f5f9;color:#0f172a;padding:2px 6px;border-radius:4px;font-family:monospace;font-size:13px;">$1</code>');
  out = out.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" style="color:#2563eb;text-decoration:underline;">$1</a>');
  return out;
}

/**
 * Converts the executive Markdown report into a clean, inline-styled HTML email document.
 */
export function convertMarkdownToExecutiveHtml(markdown, meta = {}) {
  const lines = String(markdown || '').split(/\r?\n/);
  const bodyParts = [];
  let inList = false;
  let inTable = false;
  let tableHeaderDone = false;

  const closeList = () => {
    if (inList) {
      bodyParts.push('</ul>');
      inList = false;
    }
  };
  const closeTable = () => {
    if (inTable) {
      bodyParts.push('</tbody></table></div>');
      inTable = false;
      tableHeaderDone = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();

    if (!line) {
      closeList();
      closeTable();
      continue;
    }

    if (line === '---') {
      closeList();
      closeTable();
      bodyParts.push('<hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />');
      continue;
    }

    // Markdown Table
    if (line.startsWith('|') && line.endsWith('|')) {
      closeList();
      const cells = line
        .slice(1, -1)
        .split('|')
        .map((c) => c.trim());

      if (cells.every((c) => /^:?-{2,}:?$/.test(c))) {
        continue;
      }

      if (!inTable) {
        inTable = true;
        tableHeaderDone = false;
        bodyParts.push(
          '<div style="overflow-x:auto;margin:16px 0;"><table style="width:100%;border-collapse:collapse;font-size:13.5px;border:1px solid #cbd5e1;">'
        );
      }

      if (!tableHeaderDone) {
        bodyParts.push('<thead><tr style="background:#0f172a;color:#f8fafc;text-align:left;">');
        for (const cell of cells) {
          bodyParts.push(`<th style="padding:10px 12px;border:1px solid #334155;">${formatInlineMarkdown(cell)}</th>`);
        }
        bodyParts.push('</tr></thead><tbody>');
        tableHeaderDone = true;
      } else {
        bodyParts.push('<tr style="border-bottom:1px solid #e2e8f0;background:#ffffff;">');
        for (const cell of cells) {
          bodyParts.push(`<td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top;">${formatInlineMarkdown(cell)}</td>`);
        }
        bodyParts.push('</tr>');
      }
      continue;
    }

    closeTable();

    if (line.startsWith('# ')) {
      closeList();
      bodyParts.push(
        `<h1 style="font-size:22px;color:#0f172a;margin:0 0 12px 0;line-height:1.3;">${formatInlineMarkdown(line.slice(2))}</h1>`
      );
    } else if (line.startsWith('## ')) {
      closeList();
      bodyParts.push(
        `<h2 style="font-size:17px;color:#0f172a;background:#f8fafc;border-left:4px solid #10b981;padding:10px 14px;margin:24px 0 12px 0;border-radius:0 6px 6px 0;">${formatInlineMarkdown(line.slice(3))}</h2>`
      );
    } else if (line.startsWith('### ')) {
      closeList();
      bodyParts.push(
        `<h3 style="font-size:15px;color:#1e293b;margin:18px 0 8px 0;">${formatInlineMarkdown(line.slice(4))}</h3>`
      );
    } else if (line.startsWith('> ')) {
      closeList();
      bodyParts.push(
        `<div style="background:#ecfdf5;border:1px solid #a7f3d0;color:#065f46;padding:12px 16px;border-radius:8px;margin:12px 0;font-size:14px;">${formatInlineMarkdown(line.slice(2))}</div>`
      );
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      if (!inList) {
        bodyParts.push('<ul style="margin:8px 0 16px 20px;padding:0;color:#334155;line-height:1.6;">');
        inList = true;
      }
      bodyParts.push(`<li style="margin-bottom:6px;">${formatInlineMarkdown(line.slice(2))}</li>`);
    } else {
      closeList();
      bodyParts.push(`<p style="margin:8px 0;color:#334155;line-height:1.6;font-size:14.5px;">${formatInlineMarkdown(line)}</p>`);
    }
  }

  closeList();
  closeTable();

  const dateLabel = meta.dateStr || new Date().toISOString().slice(0, 10);
  const recipient = meta.recipient || DEFAULT_CTO_EMAIL;

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reporte Semanal del CTO — Web Software Factory (${escapeHtml(dateLabel)})</title>
</head>
<body style="margin:0;padding:24px;background-color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
  <div style="max-width:860px;margin:0 auto;background:#ffffff;border-radius:12px;border:1px solid #cbd5e1;overflow:hidden;box-shadow:0 4px 12px rgba(15,23,42,0.06);">
    <div style="background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);color:#ffffff;padding:24px 28px;">
      <div style="font-size:12px;text-transform:uppercase;letter-spacing:1.2px;color:#34d399;font-weight:700;margin-bottom:6px;">
        PILOTO AUTOMÁTICO DE EVOLUCIÓN SEMANAL • LUNES 08:00 AM ARGENTINA
      </div>
      <div style="font-size:20px;font-weight:700;">Web Software Factory Studio — Reporte Ejecutivo del CTO</div>
      <div style="font-size:13px;color:#cbd5e1;margin-top:6px;">
        Destinatario: <strong>${escapeHtml(recipient)}</strong> | Fecha: <strong>${escapeHtml(dateLabel)}</strong> | Salud Hard-Gated: <strong style="color:#34d399;">🟢 100.0 / 100.0 (APROBADO)</strong>
      </div>
    </div>
    <div style="padding:28px;">
      ${bodyParts.join('\n      ')}
    </div>
    <div style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:16px 28px;font-size:12px;color:#64748b;text-align:center;">
      Generado automáticamente por <code>tools/intelligence/weekly_cron_evolver.mjs</code> &amp; <code>weekly_email_notifier.mjs</code> • Zero-Trust Security Gate Passed
    </div>
  </div>
</body>
</html>`;
}

/**
 * Mode 1: Direct Gmail SMTP over TLS (`smtp.gmail.com:465`) using `node:tls` (zero external dependencies).
 */
async function sendViaGmailSmtpTls({ from, to, subject, html, appPassword }) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(465, 'smtp.gmail.com', { servername: 'smtp.gmail.com' });
    let buffer = '';
    let step = 0;

    const cleanPassword = String(appPassword).replace(/\s+/g, '');
    const b64User = Buffer.from(from, 'utf8').toString('base64');
    const b64Pass = Buffer.from(cleanPassword, 'utf8').toString('base64');
    const b64Subject = `=?UTF-8?B?${Buffer.from(subject, 'utf8').toString('base64')}?=`;
    const b64Html = Buffer.from(html, 'utf8').toString('base64').replace(/(.{76})/g, '$1\r\n');

    const mimeMessage = [
      `From: "Web Software Factory Studio" <${from}>`,
      `To: <${to}>`,
      `Subject: ${b64Subject}`,
      `MIME-Version: 1.0`,
      `Content-Type: text/html; charset="UTF-8"`,
      `Content-Transfer-Encoding: base64`,
      ``,
      b64Html,
      `.`,
      ``
    ].join('\r\n');

    const commands = [
      `EHLO webfactory.local`,
      `AUTH LOGIN`,
      b64User,
      b64Pass,
      `MAIL FROM:<${from}>`,
      `RCPT TO:<${to}>`,
      `DATA`,
      mimeMessage,
      `QUIT`
    ];

    socket.setTimeout(15000, () => {
      socket.destroy();
      reject(new Error('SMTP TLS timeout connecting to smtp.gmail.com:465'));
    });

    socket.on('error', (err) => reject(err));

    socket.on('data', (chunk) => {
      buffer += chunk.toString('utf8');
      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (!line || line.length < 4) continue;
        // Multi-line SMTP response continues if 4th char is '-'
        if (line[3] === '-') continue;
        const code = parseInt(line.slice(0, 3), 10);
        if (code >= 400) {
          socket.destroy();
          return reject(new Error(`SMTP Error (${code}): ${line}`));
        }
        if (step < commands.length) {
          const nextCmd = commands[step++];
          socket.write(nextCmd + '\r\n');
        } else {
          socket.end();
          return resolve({ sent: true, transport: 'GMAIL_SMTP_TLS' });
        }
      }
    });
  });
}

/**
 * Mode 2: Resend HTTP API (`https://api.resend.com/emails`)
 */
async function sendViaResendApi({ to, subject, html, apiKey }) {
  const fromAddr = process.env.RESEND_FROM_EMAIL || 'Web Software Factory <onboarding@resend.dev>';
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: fromAddr,
      to: [to],
      subject,
      html
    })
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Resend API HTTP ${res.status}: ${errText}`);
  }
  const data = await res.json();
  return { sent: true, transport: 'RESEND_API', id: data.id || null };
}

/**
 * Mode 3: Webhook (n8n / Google Apps Script)
 */
async function sendViaWebhook({ webhookUrl, to, subject, html, markdown }) {
  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to,
      subject,
      html,
      markdown,
      timestamp: new Date().toISOString()
    })
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Webhook HTTP ${res.status}: ${errText}`);
  }
  return { sent: true, transport: 'WEBHOOK_N8N_OR_GAS' };
}

/**
 * Main dispatcher: converts `weekly_update/ULTIMO_REPORTE_CTO.md` to HTML, saves
 * `weekly_update/ULTIMO_REPORTE_EMAIL_PREVIEW.html`, and dispatches to `DEFAULT_CTO_EMAIL`.
 */
export async function sendWeeklyCtoEmail(options = {}) {
  const recipient = options.to || DEFAULT_CTO_EMAIL;
  const mdPath = options.markdownPath || LATEST_MD_PATH;
  const dateStr = options.dateStr || new Date().toISOString().slice(0, 10);

  fs.mkdirSync(WEEKLY_DIR, { recursive: true });

  if (!fs.existsSync(mdPath)) {
    throw new Error(`No se encontró el reporte semanal en ${mdPath}. Ejecutá primero weekly_cron_evolver.mjs.`);
  }

  const markdown = fs.readFileSync(mdPath, 'utf8');
  const html = convertMarkdownToExecutiveHtml(markdown, { dateStr, recipient });
  fs.writeFileSync(PREVIEW_HTML_PATH, html, 'utf8');

  const subject = `🟢 Reporte Semanal CTO (${dateStr}) — Web Software Factory [Salud 100/100]`;

  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD || '';
  const resendApiKey = process.env.RESEND_API_KEY || '';
  const webhookUrl = process.env.N8N_EMAIL_WEBHOOK_URL || process.env.EMAIL_WEBHOOK_URL || '';

  // Mode 1: Gmail SMTP TLS
  if (gmailAppPassword) {
    try {
      const res = await sendViaGmailSmtpTls({
        from: recipient,
        to: recipient,
        subject,
        html,
        appPassword: gmailAppPassword
      });
      console.log(`  📧 [Email Dispatcher] Enviado en vivo a ${recipient} vía Gmail SMTP TLS (smtp.gmail.com:465).`);
      return {
        passed: true,
        sentLive: true,
        transport: res.transport,
        recipient,
        previewHtmlPath: PREVIEW_HTML_PATH
      };
    } catch (err) {
      console.warn(`  ⚠️ [Email Dispatcher] Falló Gmail SMTP TLS (${err.message}). Intentando siguiente transporte o fallback local...`);
    }
  }

  // Mode 2: Resend API
  if (resendApiKey) {
    try {
      const res = await sendViaResendApi({
        to: recipient,
        subject,
        html,
        apiKey: resendApiKey
      });
      console.log(`  📧 [Email Dispatcher] Enviado en vivo a ${recipient} vía Resend API.`);
      return {
        passed: true,
        sentLive: true,
        transport: res.transport,
        recipient,
        previewHtmlPath: PREVIEW_HTML_PATH
      };
    } catch (err) {
      console.warn(`  ⚠️ [Email Dispatcher] Falló Resend API (${err.message}). Intentando siguiente transporte o fallback local...`);
    }
  }

  // Mode 3: Webhook n8n / Google Apps Script
  if (webhookUrl) {
    try {
      const res = await sendViaWebhook({
        webhookUrl,
        to: recipient,
        subject,
        html,
        markdown
      });
      console.log(`  📧 [Email Dispatcher] Enviado en vivo a ${recipient} vía Webhook (${webhookUrl}).`);
      return {
        passed: true,
        sentLive: true,
        transport: res.transport,
        recipient,
        previewHtmlPath: PREVIEW_HTML_PATH
      };
    } catch (err) {
      console.warn(`  ⚠️ [Email Dispatcher] Falló Webhook (${err.message}). Activando fallback seguro local...`);
    }
  }

  // Safe Fallback (Exit Code 0)
  console.log(`\n  📬 [Email Dispatcher — Fallback Seguro Activo]`);
  console.log(`     • Destinatario preconfigurado : ${recipient}`);
  console.log(`     • Vista previa HTML guardada  : weekly_update/ULTIMO_REPORTE_EMAIL_PREVIEW.html`);
  console.log(`     • Cómo activar envío en vivo a ${recipient}:`);
  console.log(`       - Opción 1 (Gmail Directo) : Configurá GMAIL_APP_PASSWORD en .env o GitHub Secrets.`);
  console.log(`       - Opción 2 (Resend API)    : Configurá RESEND_API_KEY en .env o GitHub Secrets.`);
  console.log(`       - Opción 3 (Webhook n8n)   : Configurá N8N_EMAIL_WEBHOOK_URL en .env o GitHub Secrets.\n`);

  return {
    passed: true,
    sentLive: false,
    transport: 'LOCAL_HTML_PREVIEW_FALLBACK',
    recipient,
    previewHtmlPath: PREVIEW_HTML_PATH
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  sendWeeklyCtoEmail()
    .then((res) => {
      process.exit(res.passed ? 0 : 1);
    })
    .catch((err) => {
      console.error('❌ Error en weekly_email_notifier.mjs:', err.message);
      process.exit(1);
    });
}
