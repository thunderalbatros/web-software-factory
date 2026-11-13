import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ASSETS_DIR = path.join(__dirname, 'site', 'assets');

function findBrowserExecutable() {
  const candidates = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
  ];
  return candidates.find((p) => fs.existsSync(p));
}

async function verifyPngAlphaAtPoints(page, pngBuffer, checks) {
  const base64 = pngBuffer.toString('base64');
  return page.evaluate(
    async ({ b64, points }) => {
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = `data:image/png;base64,${b64}`;
      });
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      return points.map((pt) => {
        const [r, g, b, a] = ctx.getImageData(pt.x, pt.y, 1, 1).data;
        return { label: pt.label, x: pt.x, y: pt.y, r, g, b, a };
      });
    },
    { b64: base64, points: checks }
  );
}

async function renderOverlays(browser) {
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1
  });

  const variants = [
    { layout: 'rack', filename: 'twennythree-overlay-1920x1080-alpha.png' },
    { layout: 'ultra-clean', filename: 'twennythree-overlay-ultra-clean-1920x1080-alpha.png' },
    { layout: 'all-cutout', filename: 'twennythree-overlay-all-cutout-1920x1080-alpha.png' },
    { layout: 'full-bento', filename: 'twennythree-overlay-full-bento-1920x1080-alpha.png' }
  ];

  for (const v of variants) {
    const url = `${pathToFileURL(path.join(__dirname, 'index.html')).href}?layout=${v.layout}`;
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(150);

    const visibleText = await page.evaluate(() => document.body.innerText.trim());
    if (visibleText.length !== 0) {
      throw new Error(`Overlay variant "${v.layout}" contains unexpected text: "${visibleText}"`);
    }

    const outPath = path.join(ASSETS_DIR, v.filename);
    const buf = await page.screenshot({ path: outPath, type: 'png', omitBackground: true });

    const pixelChecks = await verifyPngAlphaAtPoints(page, buf, [
      { label: 'Main Screen Center (Cutout)', x: 680, y: 420 },
      { label: 'Webcam Center (Cutout)', x: 1625, y: 190 },
      { label: 'Dark Blue Background Canvas', x: 680, y: 920 }
    ]);

    const mainScreenPx = pixelChecks[0];
    const webcamPx = pixelChecks[1];
    const bgPx = pixelChecks[2];

    if (mainScreenPx.a !== 0 || webcamPx.a !== 0) {
      throw new Error(
        `Cutout alpha check failed for ${v.filename}: MainScreen A=${mainScreenPx.a}, Webcam A=${webcamPx.a}`
      );
    }

    console.log(
      `[OK] ${v.filename} (${(buf.length / 1024).toFixed(1)} KB) | TextLen=0 | ScreenAlpha=${mainScreenPx.a} | CamAlpha=${webcamPx.a} | BgRGB=(${bgPx.r},${bgPx.g},${bgPx.b},A=${bgPx.a})`
    );

    if (v.layout === 'rack') {
      await page.evaluate(() => {
        document.body.style.background = 'radial-gradient(circle at 35% 40%, #09152b 0%, #030710 100%)';
      });
      const darkPreviewPath = path.join(ASSETS_DIR, 'twennythree-overlay-obs-dark-preview.png');
      await page.screenshot({ path: darkPreviewPath, type: 'png', omitBackground: false });
      console.log(`[OK] twennythree-overlay-obs-dark-preview.png saved`);
    }
  }

  await page.close();
}

async function renderBrandAndKickPanels(browser) {
  const page = await browser.newPage({
    viewport: { width: 2200, height: 2400 },
    deviceScaleFactor: 1
  });

  const showcaseUrl = pathToFileURL(path.join(__dirname, 'brand-showcase.html')).href;
  await page.goto(showcaseUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(200);

  const targets = [
    // Logos
    { selector: '#logo-avatar', filename: 'twennythree-logo-avatar-1000x1000.png' },
    { selector: '#logo-avatar-symbol', filename: 'twennythree-logo-symbol-1000x1000.png' },
    { selector: '#logo-horizontal', filename: 'twennythree-logo-horizontal-1200x400.png' },

    // Kick.com About Me Panels — Labeled Set (640x200 Retina for 320px Kick column)
    { selector: '#panel-discord', filename: 'kick-panel-discord-640x200.png' },
    { selector: '#panel-instagram', filename: 'kick-panel-instagram-640x200.png' },
    { selector: '#panel-x', filename: 'kick-panel-x-640x200.png' },
    { selector: '#panel-stake', filename: 'kick-panel-stake-640x200.png' },

    // Kick.com About Me Panels — Pure Icon-Only Set (Zero Text, 640x200 Retina)
    { selector: '#panel-discord-clean', filename: 'kick-panel-discord-clean-640x200.png' },
    { selector: '#panel-instagram-clean', filename: 'kick-panel-instagram-clean-640x200.png' },
    { selector: '#panel-x-clean', filename: 'kick-panel-x-clean-640x200.png' },
    { selector: '#panel-stake-clean', filename: 'kick-panel-stake-clean-640x200.png' }
  ];

  for (const t of targets) {
    const loc = page.locator(t.selector);
    const outPath = path.join(ASSETS_DIR, t.filename);
    const buf = await loc.screenshot({ path: outPath, type: 'png', omitBackground: true });
    console.log(`[OK] ${t.filename} (${(buf.length / 1024).toFixed(1)} KB)`);
  }

  // Export standalone SVG files for the twennythree logos
  const avatarSvgMarkup = await page.evaluate(() => {
    const svg = document.querySelector('#logo-avatar svg').cloneNode(true);
    const defs = document.querySelector('body > svg > defs').cloneNode(true);
    svg.insertBefore(defs, svg.firstChild);
    const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bgRect.setAttribute('width', '1000');
    bgRect.setAttribute('height', '1000');
    bgRect.setAttribute('rx', '220');
    bgRect.setAttribute('fill', '#071020');
    svg.insertBefore(bgRect, defs.nextSibling);
    return svg.outerHTML;
  });
  fs.writeFileSync(path.join(ASSETS_DIR, 'twennythree-logo-avatar.svg'), avatarSvgMarkup, 'utf8');

  const horizSvgMarkup = await page.evaluate(() => {
    const svg = document.querySelector('#logo-horizontal svg').cloneNode(true);
    const defs = document.querySelector('body > svg > defs').cloneNode(true);
    svg.insertBefore(defs, svg.firstChild);
    const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bgRect.setAttribute('width', '1200');
    bgRect.setAttribute('height', '400');
    bgRect.setAttribute('rx', '44');
    bgRect.setAttribute('fill', '#071020');
    svg.insertBefore(bgRect, defs.nextSibling);
    return svg.outerHTML;
  });
  fs.writeFileSync(path.join(ASSETS_DIR, 'twennythree-logo-horizontal.svg'), horizSvgMarkup, 'utf8');
  console.log('[OK] Standalone SVG vectors saved: twennythree-logo-avatar.svg & twennythree-logo-horizontal.svg');

  await page.close();
}

async function renderChannelKitAndExtraAssets(browser) {
  const page = await browser.newPage({
    viewport: { width: 2200, height: 1400 },
    deviceScaleFactor: 1
  });

  const kitUrl = pathToFileURL(path.join(__dirname, 'channel-kit.html')).href;
  await page.goto(kitUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(200);

  const kitTargets = [
    // 1. Kick Channel Profile Banners (< 4MB)
    { selector: '#kick-channel-banner-1280x700', filename: 'kick-channel-banner-1280x700.png', omitBg: false },
    { selector: '#kick-channel-banner-clean-1280x700', filename: 'kick-channel-banner-clean-1280x700.png', omitBg: false },
    { selector: '#kick-channel-banner-panoramic-1920x320', filename: 'kick-channel-banner-panoramic-1920x320.png', omitBg: false },

    // 2. Kick Offline Banners (1920x1080 16:9, < 4MB)
    { selector: '#kick-offline-banner-1920x1080', filename: 'kick-offline-banner-1920x1080.png', omitBg: false },
    { selector: '#kick-offline-banner-clean-1920x1080', filename: 'kick-offline-banner-clean-1920x1080.png', omitBg: false },

    // 3. OBS Stream Scenes (Starting Soon, BRB, Stream Ending — 1920x1080)
    { selector: '#obs-scene-starting-soon-1920x1080', filename: 'obs-scene-starting-soon-1920x1080.png', omitBg: false },
    { selector: '#obs-scene-brb-1920x1080', filename: 'obs-scene-brb-1920x1080.png', omitBg: false },
    { selector: '#obs-scene-ending-1920x1080', filename: 'obs-scene-ending-1920x1080.png', omitBg: false },

    // 4. Just Chatting Overlay (1920x1080 Zero-Text + Alpha=0 Cutout) & Standalone Webcam Frame
    { selector: '#obs-overlay-just-chatting-1920x1080', filename: 'obs-overlay-just-chatting-1920x1080-alpha.png', omitBg: true },
    { selector: '#obs-webcam-standalone-640x360', filename: 'obs-webcam-standalone-640x360-alpha.png', omitBg: true },

    // 5. Extra Essential Kick About Me Panels (640x200)
    { selector: '#panel-18plus', filename: 'kick-panel-18plus-640x200.png', omitBg: true },
    { selector: '#panel-about', filename: 'kick-panel-about-640x200.png', omitBg: true },
    { selector: '#panel-schedule', filename: 'kick-panel-schedule-640x200.png', omitBg: true },
    { selector: '#panel-rules', filename: 'kick-panel-rules-640x200.png', omitBg: true },

    // 6. Kick Subscriber Badges (72x72 Alpha PNG) & OBS Corner Watermark Bug (512x512 Alpha PNG)
    { selector: '#sub-badge-m1', filename: 'kick-sub-badge-1-month-72x72.png', omitBg: true },
    { selector: '#sub-badge-m2', filename: 'kick-sub-badge-2-months-72x72.png', omitBg: true },
    { selector: '#sub-badge-m3', filename: 'kick-sub-badge-3-months-72x72.png', omitBg: true },
    { selector: '#sub-badge-m6', filename: 'kick-sub-badge-6-months-72x72.png', omitBg: true },
    { selector: '#sub-badge-m9', filename: 'kick-sub-badge-9-months-72x72.png', omitBg: true },
    { selector: '#sub-badge-y1', filename: 'kick-sub-badge-1-year-72x72.png', omitBg: true },
    { selector: '#obs-watermark-bug-512', filename: 'twennythree-watermark-bug-512x512-alpha.png', omitBg: true }
  ];

  const MAX_KICK_BYTES = 4 * 1024 * 1024; // 4 MB strict ceiling

  for (const t of kitTargets) {
    const loc = page.locator(t.selector);
    const outPath = path.join(ASSETS_DIR, t.filename);
    const buf = await loc.screenshot({ path: outPath, type: 'png', omitBackground: t.omitBg });
    if (buf.length >= MAX_KICK_BYTES) {
      throw new Error(`File ${t.filename} exceeds Kick 4MB limit: ${buf.length} bytes`);
    }
    if (t.selector === '#obs-overlay-just-chatting-1920x1080') {
      const [camCheck] = await verifyPngAlphaAtPoints(page, buf, [
        { label: 'Just Chatting Cam Cutout', x: 700, y: 540 }
      ]);
      if (camCheck.a !== 0) {
        throw new Error(`Just Chatting Cam Cutout failed alpha=0 check: A=${camCheck.a}`);
      }
    }
    console.log(`[OK] ${t.filename} (${(buf.length / 1024).toFixed(1)} KB < 4096 KB)`);
  }

  await page.close();
}

async function main() {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
  const executablePath = findBrowserExecutable();
  const browser = await chromium.launch({ headless: true, executablePath });
  try {
    await renderOverlays(browser);
    await renderBrandAndKickPanels(browser);
    await renderChannelKitAndExtraAssets(browser);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
