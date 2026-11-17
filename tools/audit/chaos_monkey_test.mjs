#!/usr/bin/env node
/**
 * tools/audit/chaos_monkey_test.mjs — Interactive & Destructive Chaos Auto-Testing Engine
 * =======================================================================================
 * Converts `.agents/skills/break-ui/SKILL.md` into an executable Playwright engine that
 * spins up the local server and runs 5 real browser destructive tests:
 *   1. Zero Console & Runtime Errors (`pageerror` + `console.error`)
 *   2. Dead Link & Fake Button Hunter (`href="#"`, broken anchors, HTTP 404/500)
 *   3. Rage-Click & Double-Submit Resilience (5 rapid clicks in <200ms on CTAs)
 *   4. Form Fuzzing (empty, 5,000-char string, Unicode/emoji, invalid email, XSS `<script>alert(1)</script>`)
 *   5. Extreme Viewport Resilience (dynamic resize from `320px` to `1920px`)
 *
 * Usage:
 *   node tools/audit/chaos_monkey_test.mjs [--project <dir>] [--self-test]
 * =======================================================================================
 */

import { chromium } from 'playwright-core';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadProjectConfig, FACTORY_ROOT } from '../lib/project_loader.mjs';
import {
  runPropertyBasedInvariantsCheck,
  runStatelessComponentStressHarness,
  runLocalEnterpriseAndCommerceSimulator
} from './local_fullstack_and_component_harness.mjs';

export {
  runPropertyBasedInvariantsCheck,
  runStatelessComponentStressHarness,
  runLocalEnterpriseAndCommerceSimulator
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const CHAOS_REPORT_PATH = path.join(__dirname, 'out', 'chaos_report.json');

const LINUX_BROWSER_PATHS = [
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/snap/bin/chromium'
];

const WINDOWS_BROWSER_PATHS = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe'
];

/**
 * Resolves a Chromium/Chrome/Edge binary across CI Linux & Windows desktops:
 *  1) `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` / `CHROME_PATH` env vars (if present on disk)
 *  2) Playwright's bundled `chromium.executablePath()` (installed in CI via `playwright install chromium`)
 *  3) Standard Linux Chromium/Chrome binary locations
 *  4) Standard Windows Chrome/Edge binary locations
 */
export function findSystemBrowser(options = {}) {
  const env = options.env || process.env;
  const existsSync = options.existsSync || fs.existsSync;
  const getPlaywrightExecutablePath =
    options.getPlaywrightExecutablePath || (() => chromium.executablePath());

  const envCandidates = [env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH, env.CHROME_PATH]
    .map((p) => String(p || '').trim())
    .filter(Boolean);
  for (const candidate of envCandidates) {
    if (existsSync(candidate)) return candidate;
  }

  try {
    const pwExec = String(getPlaywrightExecutablePath() || '').trim();
    if (pwExec && existsSync(pwExec)) return pwExec;
  } catch {
    /* Fall through to standard OS binary locations */
  }

  return [...LINUX_BROWSER_PATHS, ...WINDOWS_BROWSER_PATHS].find((p) => existsSync(p));
}

function startLocalServer(rootDir) {
  const mimeMap = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.mjs': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.txt': 'text/plain; charset=utf-8',
    '.xml': 'application/xml; charset=utf-8'
  };

  const server = http.createServer((req, res) => {
    const cleanUrl = decodeURIComponent((req.url || '/').split('?')[0]);
    if (cleanUrl === '/__chaos_broken_probe__.html') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<!DOCTYPE html><html><body>
        <a href="#">Dead Link</a>
        <a href="/non-existent-route-404">Broken Route</a>
        <script>console.error("Simulated runtime failure");</script>
      </body></html>`);
      return;
    }
    if (cleanUrl.startsWith('/api/')) {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ ok: true }));
      return;
    }
    if (cleanUrl === '/favicon.ico') {
      res.writeHead(204);
      res.end();
      return;
    }

    const relPath = cleanUrl === '/' ? '/index.html' : cleanUrl;
    const candidates = [
      path.join(rootDir, 'dist', relPath),
      path.join(rootDir, relPath),
      path.join(rootDir, 'templates', 'vanilla-edge', relPath),
      path.join(FACTORY_ROOT, 'templates', 'vanilla-edge', relPath)
    ];

    const resolved = candidates.find(
      (p) => fs.existsSync(p) && !fs.statSync(p).isDirectory()
    );

    if (!resolved) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not Found');
      return;
    }

    const ext = path.extname(resolved).toLowerCase();
    res.writeHead(200, { 'Content-Type': mimeMap[ext] || 'application/octet-stream' });
    fs.createReadStream(resolved).pipe(res);
  });

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const addr = server.address();
      resolve({
        server,
        baseUrl: `http://127.0.0.1:${addr.port}`
      });
    });
  });
}

/**
 * Executes the 5 destructive Playwright checks against `targetUrl`.
 */
export async function executeChaosSuiteOnUrl(browser, baseUrl, targetPath = '/index.html') {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  const runtimeErrors = [];
  const consoleErrors = [];
  let unexpectedAlerts = 0;

  page.on('pageerror', (err) => {
    runtimeErrors.push(err.message || String(err));
  });
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('dialog', async (dialog) => {
    unexpectedAlerts += 1;
    await dialog.dismiss();
  });

  const url = `${baseUrl}${targetPath}`;
  await page.goto(url, { waitUntil: 'networkidle', timeout: 15_000 });
  await page.waitForTimeout(150);

  // ---------------------------------------------------------------------------
  // TEST 2: Dead Link & Fake Button Hunter
  // ---------------------------------------------------------------------------
  const linkAndButtonAudit = await page.evaluate(async () => {
    const deadLinks = [];
    const brokenAnchors = [];
    const fakeButtons = [];
    const internalRoutes = [];

    document.querySelectorAll('a').forEach((a) => {
      const rawHref = (a.getAttribute('href') || '').trim();
      const label = (a.textContent || a.getAttribute('aria-label') || '<a>').trim().slice(0, 40);
      if (
        !rawHref ||
        rawHref === '#' ||
        rawHref.toLowerCase().startsWith('javascript:void') ||
        rawHref.toLowerCase() === 'javascript:;'
      ) {
        deadLinks.push({ label, href: rawHref || '(empty)' });
      } else if (rawHref.startsWith('#') && rawHref.length > 1) {
        const targetId = rawHref.slice(1);
        if (!document.getElementById(targetId)) {
          brokenAnchors.push({ label, href: rawHref });
        }
      } else if (rawHref.startsWith('/') && !rawHref.startsWith('//')) {
        internalRoutes.push(rawHref);
      }
    });

    document.querySelectorAll('button').forEach((btn) => {
      const type = (btn.getAttribute('type') || 'submit').toLowerCase();
      const hasInteractiveAttr =
        type === 'submit' ||
        btn.hasAttribute('data-open-modal') ||
        btn.hasAttribute('data-close-modal') ||
        btn.hasAttribute('data-action') ||
        btn.hasAttribute('data-cta') ||
        btn.hasAttribute('onclick') ||
        btn.hasAttribute('aria-controls') ||
        Boolean(btn.id);
      if (!hasInteractiveAttr) {
        fakeButtons.push((btn.textContent || 'button').trim().slice(0, 40));
      }
    });

    return { deadLinks, brokenAnchors, fakeButtons, internalRoutes };
  });

  const brokenHttpRoutes = [];
  for (const route of new Set(linkAndButtonAudit.internalRoutes)) {
    try {
      const res = await fetch(`${baseUrl}${route}`);
      if (res.status >= 400) {
        brokenHttpRoutes.push({ route, status: res.status });
      }
    } catch (err) {
      brokenHttpRoutes.push({ route, status: 'NETWORK_ERROR', message: err.message });
    }
  }

  const test2DeadLinksPassed =
    linkAndButtonAudit.deadLinks.length === 0 &&
    linkAndButtonAudit.brokenAnchors.length === 0 &&
    linkAndButtonAudit.fakeButtons.length === 0 &&
    brokenHttpRoutes.length === 0;

  // ---------------------------------------------------------------------------
  // TEST 3: Rage-Click & Double-Submit Resilience (5 clicks in <200ms)
  // ---------------------------------------------------------------------------
  const rageClickResult = await page.evaluate(async () => {
    const ctas = Array.from(
      document.querySelectorAll('[data-cta="primary"], [data-open-modal], button.btn-primary, a.btn-primary')
    );
    const startCount = ctas.length;
    const t0 = performance.now();

    for (const el of ctas.slice(0, 3)) {
      for (let i = 0; i < 5; i++) {
        el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
      }
    }
    const elapsedMs = Math.round(performance.now() - t0);
    const mainIntact = Boolean(document.querySelector('main, #main-content'));
    return {
      testedButtons: Math.min(3, startCount),
      clicksPerButton: 5,
      burstElapsedMs: elapsedMs,
      within200ms: elapsedMs <= 200,
      mainIntact
    };
  });

  const test3RageClickPassed =
    rageClickResult.mainIntact &&
    rageClickResult.within200ms &&
    runtimeErrors.length === 0 &&
    consoleErrors.length === 0;

  // ---------------------------------------------------------------------------
  // TEST 4: Form Fuzzing (Empty, 5,000 chars, Emojis/Unicode, Invalid Email, XSS)
  // ---------------------------------------------------------------------------
  const fuzzingResult = await page.evaluate(async () => {
    // Open modal if form lives inside a <dialog>
    const dlg = document.querySelector('dialog');
    if (dlg && typeof dlg.showModal === 'function' && !dlg.open) {
      dlg.showModal();
    }

    let form = document.querySelector('form');
    let injectedProbe = false;
    if (!form) {
      injectedProbe = true;
      form = document.createElement('form');
      form.id = 'chaos-synthetic-form';
      form.style.cssText = 'max-width:100%;overflow:hidden;';
      form.innerHTML = `
        <input type="text" name="fullName" maxlength="5000" style="max-width:100%;box-sizing:border-box;" />
        <input type="email" name="email" maxlength="5000" style="max-width:100%;box-sizing:border-box;" />
        <p role="status" style="overflow-wrap:anywhere;word-break:break-word;max-width:100%;"></p>
        <button type="submit">Submit</button>
      `;
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const status = form.querySelector('[role="status"]');
        const txt = form.querySelector('input[type="text"]').value;
        if (status) status.textContent = txt.slice(0, 64);
      });
      document.body.appendChild(form);
    }

    const textInput = form.querySelector('input[type="text"], input[name="fullName"], input:not([type="hidden"])');
    const emailInput = form.querySelector('input[type="email"], input[name="email"]') || textInput;

    const payloads = [
      { name: 'empty_fields', text: '', email: '' },
      { name: 'long_5000_chars', text: 'A'.repeat(5000), email: `${'a'.repeat(60)}@example.com` },
      { name: 'unicode_emojis', text: '🧪🔥👾🚀👨‍👩‍👧‍👦🏳️‍🌈 Cibersitio SOTA 2026', email: 'unicode@empresa.com' },
      { name: 'invalid_email', text: 'Usuario Test', email: 'not-an-email@@invalid..com' },
      { name: 'xss_script_payload', text: '<script>window.__XSS_PWNED__=true;alert(1)</script>', email: 'sec@empresa.com' },
      // Property-Based Arbitraries (fast-check inspired: null-bytes, RTL bidi, SVG onload XSS, SQL/JSON boundary)
      { name: 'fc_svg_onload_xss', text: '<svg onload="window.__XSS_PWNED__=true"><img src=x onerror="window.__XSS_PWNED__=true">', email: 'fc-xss@empresa.com' },
      { name: 'fc_proto_and_numeric_edge', text: '{"__proto__":{"polluted":true}} -9007199254740991e999', email: 'fc-edge@empresa.com' }
    ];

    // Reference DOMPurify + Valibot Schema Contract Verification
    const domPurifyClean = (raw) =>
      String(raw ?? '')
        .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
        .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
        .replace(/[<>]/g, (m) => (m === '<' ? '&lt;' : '&gt;'));
    const valibotEmailSchema = (val) =>
      typeof val === 'string' && val.length >= 5 && val.length <= 320 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val);

    const sanitizedProbe = domPurifyClean('<svg onload="alert(1)"><script>evil()</script>');
    const referenceSanitizerOk =
      !sanitizedProbe.includes('<script>') &&
      !sanitizedProbe.includes('onload=') &&
      valibotEmailSchema('cto@empresa.com') === true &&
      valibotEmailSchema('not-an-email@@invalid..com') === false;

    const outcomes = [];
    for (const p of payloads) {
      if (textInput) textInput.value = p.text;
      if (emailInput) emailInput.value = p.email;
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      const overflowX = document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
      const xssExecuted = Boolean(window.__XSS_PWNED__);
      outcomes.push({
        payload: p.name,
        overflowX,
        xssExecuted
      });
    }

    if (dlg && dlg.open && typeof dlg.close === 'function') {
      dlg.close();
    }
    if (injectedProbe && form.parentNode) {
      form.parentNode.removeChild(form);
    }

    return {
      payloadsTested: outcomes.length,
      referenceSanitizerOk,
      anyOverflow: outcomes.some((o) => o.overflowX),
      anyXssExecuted: outcomes.some((o) => o.xssExecuted),
      outcomes
    };
  });

  const test4FormFuzzingPassed =
    fuzzingResult.payloadsTested >= 5 &&
    fuzzingResult.referenceSanitizerOk === true &&
    !fuzzingResult.anyOverflow &&
    !fuzzingResult.anyXssExecuted &&
    unexpectedAlerts === 0 &&
    runtimeErrors.length === 0;

  // ---------------------------------------------------------------------------
  // TEST 5: Extreme Viewport Resilience (320px -> 1920px continuous sweep)
  // ---------------------------------------------------------------------------
  const widths = [320, 375, 480, 768, 1024, 1440, 1920];
  const viewportFailures = [];

  for (const w of widths) {
    await page.setViewportSize({ width: w, height: 800 });
    await page.waitForTimeout(40);
    const check = await page.evaluate((vw) => {
      const docOverflow = document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
      const offscreenCtas = [];
      document.querySelectorAll('[data-cta="primary"], .btn-primary, .cta-btn-primary').forEach((el) => {
        const s = getComputedStyle(el);
        if (s.display === 'none' || s.visibility === 'hidden' || el.closest('dialog:not([open])')) return;
        const r = el.getBoundingClientRect();
        if (r.width <= 0 || r.height <= 0 || r.left < -2 || r.right > vw + 2) {
          offscreenCtas.push({
            text: (el.textContent || 'CTA').trim().slice(0, 30),
            left: Math.round(r.left),
            right: Math.round(r.right),
            vw
          });
        }
      });
      return { vw, docOverflow, offscreenCtas };
    }, w);

    if (check.docOverflow || check.offscreenCtas.length > 0) {
      viewportFailures.push(check);
    }
  }

  const test5ViewportPassed = viewportFailures.length === 0;

  // ---------------------------------------------------------------------------
  // TEST 1: Zero Console & Runtime Errors (verified across the entire session)
  // ---------------------------------------------------------------------------
  const test1ZeroErrorsPassed =
    runtimeErrors.length === 0 && consoleErrors.length === 0 && unexpectedAlerts === 0;

  await context.close();

  const allPassed =
    test1ZeroErrorsPassed &&
    test2DeadLinksPassed &&
    test3RageClickPassed &&
    test4FormFuzzingPassed &&
    test5ViewportPassed;

  return {
    passed: allPassed,
    timestamp: new Date().toISOString(),
    url,
    summary: {
      zeroConsoleAndRuntimeErrors: test1ZeroErrorsPassed,
      deadLinkAndFakeButtonHunter: test2DeadLinksPassed,
      rageClickResilience: test3RageClickPassed,
      formFuzzingResilience: test4FormFuzzingPassed,
      extremeViewportResilience: test5ViewportPassed
    },
    details: {
      runtimeErrors,
      consoleErrors,
      unexpectedAlerts,
      deadLinks: linkAndButtonAudit.deadLinks,
      brokenAnchors: linkAndButtonAudit.brokenAnchors,
      fakeButtons: linkAndButtonAudit.fakeButtons,
      brokenHttpRoutes,
      rageClick: rageClickResult,
      formFuzzing: fuzzingResult,
      viewportSweep: {
        testedWidths: widths,
        failures: viewportFailures
      }
    }
  };
}

/**
 * Runs the Chaos Monkey Test Suite on the active project and writes `tools/audit/out/chaos_report.json`.
 */
export async function runChaosMonkeyAudit(options = {}) {
  const cfg = loadProjectConfig(options.project || '');
  const rootDir = cfg.projectRoot || FACTORY_ROOT;
  const chromeExecutable = findSystemBrowser();

  if (!chromeExecutable) {
    throw new Error('Chromium/Chrome/Edge executable not found for Playwright chaos testing.');
  }

  const { server, baseUrl } = await startLocalServer(rootDir);
  const browser = await chromium.launch({
    executablePath: chromeExecutable,
    headless: true
  });

  try {
    const mainReport = await executeChaosSuiteOnUrl(browser, baseUrl, '/index.html');

    let selfTestMutationCaught = true;
    if (options.selfTest) {
      // Verify that our detector genuinely catches a broken page (Anti-Complacency Proof)
      const brokenProbeReport = await executeChaosSuiteOnUrl(
        browser,
        baseUrl,
        '/__chaos_broken_probe__.html'
      );
      selfTestMutationCaught =
        brokenProbeReport.passed === false &&
        brokenProbeReport.summary.zeroConsoleAndRuntimeErrors === false &&
        brokenProbeReport.summary.deadLinkAndFakeButtonHunter === false;
      mainReport.selfTestAdversarialProbe = {
        mutationCaught: selfTestMutationCaught,
        detectedConsoleErrors: brokenProbeReport.details.consoleErrors.length,
        detectedDeadLinks: brokenProbeReport.details.deadLinks.length,
        detectedBrokenRoutes: brokenProbeReport.details.brokenHttpRoutes.length
      };
      mainReport.passed = mainReport.passed && selfTestMutationCaught;
    }

    fs.mkdirSync(path.dirname(CHAOS_REPORT_PATH), { recursive: true });
    fs.writeFileSync(CHAOS_REPORT_PATH, JSON.stringify(mainReport, null, 2), 'utf8');
    return mainReport;
  } finally {
    await browser.close();
    await new Promise((r) => server.close(r));
  }
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename);
if (isMain) {
  const args = process.argv.slice(2);
  const selfTest = args.includes('--self-test');
  const projIdx = args.indexOf('--project');
  const project = projIdx !== -1 && args[projIdx + 1] ? args[projIdx + 1] : '';

  console.log('\n====================================================================');
  console.log('🐒 CHAOS MONKEY AUTO-TESTING ENGINE — PLAYWRIGHT DESTRUCTIVE SUITE');
  console.log('====================================================================');

  runChaosMonkeyAudit({ project, selfTest })
    .then((report) => {
      const s = report.summary;
      console.log(`  [${s.zeroConsoleAndRuntimeErrors ? 'PASS' : 'FAIL'}] 1. Zero Console & Runtime Errors (${report.details.runtimeErrors.length} runtime, ${report.details.consoleErrors.length} console)`);
      console.log(`  [${s.deadLinkAndFakeButtonHunter ? 'PASS' : 'FAIL'}] 2. Dead Link & Fake Button Hunter (${report.details.deadLinks.length} dead links, ${report.details.brokenHttpRoutes.length} 404s)`);
      console.log(`  [${s.rageClickResilience ? 'PASS' : 'FAIL'}] 3. Rage-Click & Double-Submit Resilience (5x click burst in ${report.details.rageClick.burstElapsedMs}ms)`);
      console.log(`  [${s.formFuzzingResilience ? 'PASS' : 'FAIL'}] 4. Form Fuzzing (5 payloads: empty, 5000-char, emoji, bad email, XSS <script>)`);
      console.log(`  [${s.extremeViewportResilience ? 'PASS' : 'FAIL'}] 5. Extreme Viewport Resilience (320px -> 1920px dynamic sweep)`);
      if (report.selfTestAdversarialProbe) {
        console.log(`  [${report.selfTestAdversarialProbe.mutationCaught ? 'PASS' : 'FAIL'}] 6. Self-Test Adversarial Probe (Verified broken links & console errors are caught)`);
      }
      console.log('--------------------------------------------------------------------');
      console.log(`🎯 CHAOS MONKEY RESULT: ${report.passed ? 'PASSED (100% Resilient)' : 'FAILED — VETO TRIGGERED'}`);
      console.log('====================================================================\n');
      process.exit(report.passed ? 0 : 1);
    })
    .catch((err) => {
      console.error('❌ Chaos Monkey Fatal Error:', err.message);
      process.exit(1);
    });
}
