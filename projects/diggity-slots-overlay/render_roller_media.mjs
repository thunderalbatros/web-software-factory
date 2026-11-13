import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, 'site', 'assets');
const TMP_FRAMES_ROOT = path.join(__dirname, '.tmp_roller_frames');

function resolveFfmpegBinary() {
  try {
    const out = execFileSync('where.exe', ['ffmpeg'], { encoding: 'utf8' });
    const first = out.split(/\r?\n/).map((s) => s.trim()).find(Boolean);
    if (first && fs.existsSync(first)) return first;
  } catch {
    // fallback
  }
  return 'ffmpeg';
}

async function renderVariant(browser, ffmpegBin, variant) {
  const { name, accent, bg } = variant;
  const variantDir = path.join(TMP_FRAMES_ROOT, name);
  fs.mkdirSync(variantDir, { recursive: true });

  const page = await browser.newPage({
    viewport: { width: 680, height: 200 },
    deviceScaleFactor: 1
  });

  const rollerUrl = `${pathToFileURL(path.join(__dirname, 'roller-panel.html')).href}?accent=${accent}&bg=${bg}&tight=1&manual=1`;
  await page.goto(rollerUrl, { waitUntil: 'networkidle' });

  const FPS = 60;
  const SLIDE_COUNT = 5;
  const HOLD_SEC = 2.0;
  const ROLL_SEC = 0.5;
  const STEP_SEC = HOLD_SEC + ROLL_SEC;
  const HOLD_FRAMES = Math.round(HOLD_SEC * FPS); // 120 frames
  const ROLL_FRAMES = Math.round(ROLL_SEC * FPS); // 30 frames

  let globalFrameIdx = 0;

  for (let slide = 0; slide < SLIDE_COUNT; slide++) {
    const holdStartSec = slide * STEP_SEC;
    await page.evaluate((t) => window.__setRollerTime(t), holdStartSec);

    const holdBuffer = await page.screenshot({ type: 'png' });

    // Save static slide preview PNG
    const slidePreviewPath = path.join(ASSETS_DIR, `roller-slide-${slide + 1}-${name}.png`);
    fs.writeFileSync(slidePreviewPath, holdBuffer);

    // Write stationary hold frames
    for (let f = 0; f < HOLD_FRAMES; f++) {
      const framePath = path.join(variantDir, `frame_${String(globalFrameIdx).padStart(4, '0')}.png`);
      fs.writeFileSync(framePath, holdBuffer);
      globalFrameIdx++;
    }

    // Capture smooth upward slot-reel transition frames
    for (let r = 1; r <= ROLL_FRAMES; r++) {
      const tSec = holdStartSec + HOLD_SEC + (r / ROLL_FRAMES) * ROLL_SEC;
      await page.evaluate((t) => window.__setRollerTime(t), tSec);
      const rollBuffer = await page.screenshot({ type: 'png' });
      const framePath = path.join(variantDir, `frame_${String(globalFrameIdx).padStart(4, '0')}.png`);
      fs.writeFileSync(framePath, rollBuffer);
      globalFrameIdx++;
    }
  }

  await page.close();

  const inputPattern = path.join(variantDir, 'frame_%04d.png');
  const mp4Out = path.join(ASSETS_DIR, `diggitybets-roller-${name}.mp4`);
  const gifOut = path.join(ASSETS_DIR, `diggitybets-roller-${name}.gif`);
  const palettePath = path.join(variantDir, 'palette.png');

  // 1. Compile lightweight 60 FPS H.264 MP4 (OBS-ready, seamless loop)
  execFileSync(ffmpegBin, [
    '-y',
    '-framerate', String(FPS),
    '-i', inputPattern,
    '-c:v', 'libx264',
    '-preset', 'slow',
    '-crf', '18',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    mp4Out
  ], { stdio: 'ignore' });

  // 2. Generate optimal 256-color palette & compile animated GIF (30 FPS for lightweight size)
  execFileSync(ffmpegBin, [
    '-y',
    '-framerate', String(FPS),
    '-i', inputPattern,
    '-vf', 'fps=30,palettegen=stats_mode=diff',
    palettePath
  ], { stdio: 'ignore' });

  execFileSync(ffmpegBin, [
    '-y',
    '-framerate', String(FPS),
    '-i', inputPattern,
    '-i', palettePath,
    '-lavfi', 'fps=30 [x]; [x][1:v] paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle',
    '-loop', '0',
    gifOut
  ], { stdio: 'ignore' });

  const mp4Stat = fs.statSync(mp4Out);
  const gifStat = fs.statSync(gifOut);
  console.log(`[OK] Variant "${name}" -> MP4: ${(mp4Stat.size / 1024).toFixed(1)} KB | GIF: ${(gifStat.size / 1024).toFixed(1)} KB`);
}

async function renderFullOverlayPreview(browser) {
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1
  });
  const indexUrl = `${pathToFileURL(path.join(__dirname, 'index.html')).href}?clean=1&dock=standby&roller=ice-blue`;
  await page.goto(indexUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  const previewPath = path.join(ASSETS_DIR, 'overlay-with-roller-preview.png');
  await page.screenshot({ path: previewPath, type: 'png' });
  await page.close();
  console.log(`[OK] Full 1920x1080 Overlay Preview -> ${previewPath}`);
}

async function main() {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
  fs.rmSync(TMP_FRAMES_ROOT, { recursive: true, force: true });

  const ffmpegBin = resolveFfmpegBinary();
  console.log(`Using FFmpeg: ${ffmpegBin}`);

  const CHROME_PATHS = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
  ];
  const executablePath = CHROME_PATHS.find((p) => fs.existsSync(p));
  const browser = await chromium.launch({ headless: true, executablePath });
  try {
    await renderVariant(browser, ffmpegBin, {
      name: 'ice-blue',
      accent: 'ice-blue',
      bg: 'dark'
    });
    await renderVariant(browser, ffmpegBin, {
      name: 'gold-vip',
      accent: 'gold',
      bg: 'dark'
    });
    await renderFullOverlayPreview(browser);
  } finally {
    await browser.close();
    fs.rmSync(TMP_FRAMES_ROOT, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
