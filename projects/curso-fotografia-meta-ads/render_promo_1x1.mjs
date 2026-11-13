import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUT_DIR = path.join(__dirname, 'deliverables');

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const CHROME_PATHS = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
  ];
  const executablePath = CHROME_PATHS.find((p) => fs.existsSync(p));
  const browser = await chromium.launch({ headless: true, executablePath });

  try {
    for (const theme of ['amber', 'emerald']) {
      const page = await browser.newPage({
        viewport: { width: 1080, height: 1080 },
        deviceScaleFactor: 1
      });
      const url = `${pathToFileURL(path.join(__dirname, 'promo-1x1.html')).href}?theme=${theme}`;
      await page.goto(url, { waitUntil: 'networkidle' });

      const suffix = theme === 'amber' ? 'Ambar' : 'Esmeralda';
      const baseName = `Flyer-Promocion-80000-1x1-1080x1080-${suffix}`;
      const pngPath = path.join(OUT_DIR, `${baseName}.png`);
      const jpgPath = path.join(OUT_DIR, `${baseName}.jpg`);

      await page.screenshot({ path: pngPath, type: 'png' });
      await page.screenshot({ path: jpgPath, type: 'jpeg', quality: 96 });
      await page.close();

      console.log(`[PROMO 1x1 OK] ${baseName}.png`);
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
