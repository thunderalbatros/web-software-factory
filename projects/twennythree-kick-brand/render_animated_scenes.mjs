import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, 'site', 'assets');
const TMP_FRAMES_ROOT = path.join(__dirname, '.tmp_scene_frames');

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

function findBrowserExecutable() {
  const candidates = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
  ];
  return candidates.find((p) => fs.existsSync(p));
}

async function renderAnimatedScene(browser, ffmpegBin, sceneConfig) {
  const { scene, slug } = sceneConfig;
  const sceneDir = path.join(TMP_FRAMES_ROOT, slug);
  fs.mkdirSync(sceneDir, { recursive: true });

  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1
  });

  const sceneUrl = `${pathToFileURL(path.join(__dirname, 'animated-scenes.html')).href}?scene=${scene}&manual=1`;
  await page.goto(sceneUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(100);

  const FPS = 30;
  const LOOP_SEC = 4.0;
  const TOTAL_FRAMES = Math.round(FPS * LOOP_SEC); // 120 frames seamless harmonic cycle

  for (let f = 0; f < TOTAL_FRAMES; f++) {
    const tSec = (f / TOTAL_FRAMES) * LOOP_SEC;
    await page.evaluate((t) => window.__setSceneTime(t), tSec);
    const frameBuffer = await page.screenshot({ type: 'jpeg', quality: 96 });
    const framePath = path.join(sceneDir, `frame_${String(f).padStart(4, '0')}.jpg`);
    fs.writeFileSync(framePath, frameBuffer);
  }

  await page.close();

  const inputPattern = path.join(sceneDir, 'frame_%04d.jpg');
  const mp4Out = path.join(ASSETS_DIR, `obs-scene-${slug}-animated-1920x1080.mp4`);
  const gifOut = path.join(ASSETS_DIR, `obs-scene-${slug}-animated-preview.gif`);
  const palettePath = path.join(sceneDir, 'palette.png');

  // 1. Encode 1920x1080 H.264 MP4 (Seamless loop for OBS Media Source)
  execFileSync(
    ffmpegBin,
    [
      '-y',
      '-framerate', String(FPS),
      '-i', inputPattern,
      '-c:v', 'libx264',
      '-preset', 'fast',
      '-crf', '17',
      '-pix_fmt', 'yuv420p',
      '-movflags', '+faststart',
      mp4Out
    ],
    { stdio: 'ignore' }
  );

  // 2. Encode optimized 960x540 Animated GIF for preview & walkthrough
  execFileSync(
    ffmpegBin,
    [
      '-y',
      '-framerate', String(FPS),
      '-i', inputPattern,
      '-vf', 'fps=20,scale=960:540:flags=lanczos,palettegen=stats_mode=diff',
      palettePath
    ],
    { stdio: 'ignore' }
  );

  execFileSync(
    ffmpegBin,
    [
      '-y',
      '-framerate', String(FPS),
      '-i', inputPattern,
      '-i', palettePath,
      '-lavfi', 'fps=20,scale=960:540:flags=lanczos [x]; [x][1:v] paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle',
      '-loop', '0',
      gifOut
    ],
    { stdio: 'ignore' }
  );

  const mp4Stat = fs.statSync(mp4Out);
  const gifStat = fs.statSync(gifOut);
  console.log(
    `[OK] Animated Scene "${slug}" -> MP4: ${(mp4Stat.size / 1024).toFixed(1)} KB | GIF: ${(gifStat.size / 1024).toFixed(1)} KB`
  );
}

async function main() {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
  fs.rmSync(TMP_FRAMES_ROOT, { recursive: true, force: true });

  const ffmpegBin = resolveFfmpegBinary();
  const executablePath = findBrowserExecutable();
  const browser = await chromium.launch({ headless: true, executablePath });

  try {
    await renderAnimatedScene(browser, ffmpegBin, { scene: 'starting', slug: 'starting-soon' });
    await renderAnimatedScene(browser, ffmpegBin, { scene: 'ending', slug: 'stream-ending' });
    await renderAnimatedScene(browser, ffmpegBin, { scene: 'brb', slug: 'brb' });
  } finally {
    await browser.close();
    fs.rmSync(TMP_FRAMES_ROOT, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

