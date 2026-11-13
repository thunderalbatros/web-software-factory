import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_DIR = path.join(__dirname, 'deliverables');
const TMP_DIR = path.join(__dirname, '.tmp_ad_frames');

const FORMAT_SPECS = {
  'feed-4x5': { width: 1080, height: 1350, label: 'Feed-4x5-1080x1350' },
  'feed-1x1': { width: 1080, height: 1080, label: 'Feed-1x1-1080x1080' },
  'story-9x16': { width: 1080, height: 1920, label: 'Historia-Reels-9x16-1080x1920' }
};

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

async function renderStaticFlyer(browser, formatKey, theme) {
  const spec = FORMAT_SPECS[formatKey];
  const page = await browser.newPage({
    viewport: { width: spec.width, height: spec.height },
    deviceScaleFactor: 1
  });

  const url = `${pathToFileURL(path.join(__dirname, 'ad-canvas.html')).href}?format=${formatKey}&theme=${theme}`;
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => window.__setAdTime(2.5));

  const baseName = `Flyer-${spec.label}-${theme === 'amber' ? 'Ambar' : 'Esmeralda'}`;
  const pngPath = path.join(OUT_DIR, `${baseName}.png`);
  const jpgPath = path.join(OUT_DIR, `${baseName}.jpg`);

  await page.screenshot({ path: pngPath, type: 'png' });
  await page.screenshot({ path: jpgPath, type: 'jpeg', quality: 96 });
  await page.close();

  const pngKb = (fs.statSync(pngPath).size / 1024).toFixed(1);
  console.log(`[STATIC OK] ${baseName}.png (${pngKb} KB)`);
}

async function renderVideoAd(browser, ffmpegBin, formatKey, theme, generateGifPreview = false) {
  const spec = FORMAT_SPECS[formatKey];
  const runId = `${formatKey}-${theme}`;
  const frameDir = path.join(TMP_DIR, runId);
  fs.mkdirSync(frameDir, { recursive: true });

  const page = await browser.newPage({
    viewport: { width: spec.width, height: spec.height },
    deviceScaleFactor: 1
  });

  const url = `${pathToFileURL(path.join(__dirname, 'ad-canvas.html')).href}?format=${formatKey}&theme=${theme}`;
  await page.goto(url, { waitUntil: 'networkidle' });

  const FPS = 30;
  const DURATION_SEC = 5.0;
  const TOTAL_FRAMES = Math.round(FPS * DURATION_SEC); // 150 frames @ 30fps

  for (let f = 0; f < TOTAL_FRAMES; f++) {
    const tSec = (f / TOTAL_FRAMES) * 6.0;
    await page.evaluate((t) => window.__setAdTime(t), tSec);
    const framePath = path.join(frameDir, `frame_${String(f).padStart(4, '0')}.jpg`);
    await page.screenshot({ path: framePath, type: 'jpeg', quality: 95 });
  }

  await page.close();

  const baseName = `Video-${spec.label}-${theme === 'amber' ? 'Ambar' : 'Esmeralda'}`;
  const mp4Out = path.join(OUT_DIR, `${baseName}.mp4`);
  const inputPattern = path.join(frameDir, 'frame_%04d.jpg');

  // Encode Meta Ads compliant MP4 (H.264 + AAC stereo track + yuv420p + faststart)
  execFileSync(ffmpegBin, [
    '-y',
    '-framerate', String(FPS),
    '-i', inputPattern,
    '-f', 'lavfi',
    '-i', 'anullsrc=channel_layout=stereo:sample_rate=44100',
    '-c:v', 'libx264',
    '-preset', 'medium',
    '-crf', '18',
    '-pix_fmt', 'yuv420p',
    '-c:a', 'aac',
    '-b:a', '128k',
    '-shortest',
    '-movflags', '+faststart',
    mp4Out
  ], { stdio: 'ignore' });

  const mp4Kb = (fs.statSync(mp4Out).size / 1024).toFixed(1);
  console.log(`[VIDEO OK]  ${baseName}.mp4 (${mp4Kb} KB)`);

  if (generateGifPreview) {
    const gifOut = path.join(OUT_DIR, `${baseName}-preview.gif`);
    const palettePath = path.join(frameDir, 'palette.png');
    execFileSync(ffmpegBin, [
      '-y',
      '-i', mp4Out,
      '-vf', 'fps=15,scale=540:-1:flags=lanczos,palettegen=stats_mode=diff',
      palettePath
    ], { stdio: 'ignore' });
    execFileSync(ffmpegBin, [
      '-y',
      '-i', mp4Out,
      '-i', palettePath,
      '-lavfi', 'fps=15,scale=540:-1:flags=lanczos [x]; [x][1:v] paletteuse=dither=bayer:bayer_scale=5',
      '-loop', '0',
      gifOut
    ], { stdio: 'ignore' });
  }
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.rmSync(TMP_DIR, { recursive: true, force: true });

  const ffmpegBin = resolveFfmpegBinary();
  const CHROME_PATHS = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
  ];
  const executablePath = CHROME_PATHS.find((p) => fs.existsSync(p));
  const browser = await chromium.launch({ headless: true, executablePath });

  try {
    // 1. Render all 6 Static High-Res Flyers (4:5, 1:1, 9:16 in Amber & Emerald)
    for (const fmt of ['feed-4x5', 'feed-1x1', 'story-9x16']) {
      for (const theme of ['amber', 'emerald']) {
        await renderStaticFlyer(browser, fmt, theme);
      }
    }

    // 2. Render MP4 Video Ads for Feed (4:5 & 1:1) and Story/Reels (9:16) in both themes
    await renderVideoAd(browser, ffmpegBin, 'feed-4x5', 'amber', true);
    await renderVideoAd(browser, ffmpegBin, 'feed-4x5', 'emerald', false);
    await renderVideoAd(browser, ffmpegBin, 'feed-1x1', 'amber', false);
    await renderVideoAd(browser, ffmpegBin, 'story-9x16', 'amber', true);
    await renderVideoAd(browser, ffmpegBin, 'story-9x16', 'emerald', false);
  } finally {
    await browser.close();
    fs.rmSync(TMP_DIR, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
