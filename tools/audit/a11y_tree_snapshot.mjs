#!/usr/bin/env node
/**
 * tools/audit/a11y_tree_snapshot.mjs — Playwright Accessibility-Tree (AX) Snapshot Inspector
 * ==========================================================================================
 * Inspired by Microsoft @playwright/mcp (2025-2026):
 *   - Captures a compact, token-efficient ARIA Accessibility Tree & Interactive Ref Map
 *     instead of heavy raw HTML dumps or expensive vision screenshots (~90% fewer tokens).
 *   - Saves output to <project>/docs/audit_snapshots/ax_tree_snapshot.json (--output-mode file)
 *     so agents can inspect exact roles, accessible names, headings, and interactive refs.
 *
 * Usage:
 *   node tools/audit/a11y_tree_snapshot.mjs [--project <slug-or-path>]
 * ==========================================================================================
 */

import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import { loadProjectConfig } from '../lib/project_loader.mjs';

const __filename = fileURLToPath(import.meta.url);
const projectCfg = loadProjectConfig();
const ROOT = projectCfg.projectRoot;

const CHROME_PATHS = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
];

function startStaticServer(rootDir, entryRel) {
  const mimeMap = {
    '.html': 'text/html; charset=utf-8',
    '.astro': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.mjs': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png'
  };

  const server = http.createServer((req, res) => {
    const cleanUrl = decodeURIComponent((req.url || '/').split('?')[0]);
    if (cleanUrl.startsWith('/api/')) {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ ok: true }));
      return;
    }
    const relPath = cleanUrl === '/' ? (entryRel || 'index.html') : cleanUrl.replace(/^\/+/, '');
    const candidate = path.join(rootDir, relPath);
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      const ext = path.extname(candidate).toLowerCase();
      let body = fs.readFileSync(candidate);
      if (ext === '.astro') {
        const raw = body.toString('utf8').replace(/^---[\s\S]*?---\s*/, '');
        const layoutFile = path.join(rootDir, 'src', 'layouts', 'BaseLayout.astro');
        const layoutRaw = fs.existsSync(layoutFile)
          ? fs.readFileSync(layoutFile, 'utf8').replace(/^---[\s\S]*?---\s*/, '')
          : '<slot />';
        body = Buffer.from(layoutRaw.replace('<slot />', raw), 'utf8');
      }
      res.writeHead(200, { 'Content-Type': mimeMap[ext] || 'application/octet-stream' });
      res.end(body);
      return;
    }
    res.writeHead(404);
    res.end('Not found');
  });

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({ server, url: `http://127.0.0.1:${port}/` });
    });
  });
}

export async function captureAccessibilitySnapshot() {
  const chromeExecutable = CHROME_PATHS.find(p => fs.existsSync(p));
  if (!chromeExecutable) {
    return { passed: false, error: 'NO_BROWSER_FOUND' };
  }

  const { server, url } = await startStaticServer(ROOT, projectCfg.paths?.entryHtml || 'index.html');
  let browser = null;

  try {
    browser = await chromium.launch({ executablePath: chromeExecutable, headless: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 12000 });

    let ariaYaml = '';
    try {
      if (typeof page.locator('body').ariaSnapshot === 'function') {
        ariaYaml = await page.locator('body').ariaSnapshot();
      }
    } catch (_) {}

    const interactiveTree = await page.evaluate(() => {
      const landmarks = Array.from(document.querySelectorAll('header, nav, main, section, aside, footer')).map((el, i) => ({
        ref: `L${i + 1}`,
        tag: el.tagName.toLowerCase(),
        id: el.id || null,
        ariaLabel: el.getAttribute('aria-label') || null
      }));

      const headings = Array.from(document.querySelectorAll('h1, h2, h3')).slice(0, 25).map((h, i) => ({
        ref: `H${i + 1}`,
        level: h.tagName.toLowerCase(),
        text: (h.textContent || '').trim().slice(0, 90)
      }));

      const controls = Array.from(document.querySelectorAll('a[href], button, input, select')).slice(0, 40).map((c, i) => ({
        ref: `E${i + 1}`,
        role: c.getAttribute('role') || c.tagName.toLowerCase(),
        name: (c.getAttribute('aria-label') || c.textContent || c.getAttribute('placeholder') || '').trim().slice(0, 65)
      }));

      return { landmarks, headings, controls };
    });

    const outDir = path.join(ROOT, 'docs', 'audit_snapshots');
    fs.mkdirSync(outDir, { recursive: true });
    const outFile = path.join(outDir, 'ax_tree_snapshot.json');

    const snapshot = {
      timestamp: new Date().toISOString(),
      projectId: projectCfg.id,
      landmarksCount: interactiveTree.landmarks.length,
      headingsCount: interactiveTree.headings.length,
      controlsCount: interactiveTree.controls.length,
      landmarks: interactiveTree.landmarks,
      headings: interactiveTree.headings,
      controls: interactiveTree.controls,
      ariaSnapshotPreview: ariaYaml ? ariaYaml.slice(0, 2500) : null
    };

    fs.writeFileSync(outFile, JSON.stringify(snapshot, null, 2), 'utf8');
    return { passed: true, outFile, snapshot };
  } finally {
    if (browser) await browser.close();
    server.close();
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  captureAccessibilitySnapshot().then((res) => {
    if (!res.passed) {
      console.error('❌ [AX SNAPSHOT FAILED]:', res.error);
      process.exit(1);
    }
    console.log('======================================================');
    console.log(`🌳 PLAYWRIGHT ACCESSIBILITY-TREE SNAPSHOT [${res.snapshot.projectId}]`);
    console.log('======================================================');
    console.log(`  ✓ Landmarks Captured : ${res.snapshot.landmarksCount}`);
    console.log(`  ✓ Headings Captured  : ${res.snapshot.headingsCount}`);
    console.log(`  ✓ Controls Captured  : ${res.snapshot.controlsCount}`);
    console.log(`  ✓ Saved Compact Tree : ${res.outFile}`);
    console.log('======================================================\n');
  });
}
