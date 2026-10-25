import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { loadProjectConfig, FACTORY_ROOT } from './lib/project_loader.mjs';

const projectConfig = loadProjectConfig();
const root = projectConfig.projectRoot;
const dist = path.join(root, projectConfig.paths.distDir);

console.log(`=== BUILDING CLOUDFLARE PRODUCTION PAYLOAD (${projectConfig.id} -> dist/) ===\n`);

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const item of fs.readdirSync(src)) {
      copyRecursive(path.join(src, item), path.join(dest, item));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

// 1. Clean and recreate dist
if (fs.existsSync(dist)) {
  fs.rmSync(dist, { recursive: true, force: true });
}
fs.mkdirSync(dist, { recursive: true });

if (projectConfig.stack === 'astro-edge' && fs.existsSync(path.join(root, 'astro.config.mjs'))) {
  const astroNodeModules = path.join(root, 'node_modules', 'astro');
  if (fs.existsSync(astroNodeModules)) {
    console.log('• Building Astro 5 project via `npx astro build`...');
    execSync('npx astro build', { cwd: root, stdio: 'inherit' });
  } else {
    console.log('• [Astro Static Scaffold] Copying public/ and rendering static entry shell to dist/...');
    copyRecursive(path.join(root, 'public'), dist);
    const srcCss = path.join(root, projectConfig.paths.designCssPath);
    if (fs.existsSync(srcCss)) {
      copyRecursive(srcCss, path.join(dist, 'styles', 'design-tokens.css'));
    }
    const indexAstroPath = path.join(root, 'src', 'pages', 'index.astro');
    const layoutAstroPath = path.join(root, 'src', 'layouts', 'BaseLayout.astro');
    if (fs.existsSync(indexAstroPath)) {
      const rawAstro = fs.readFileSync(indexAstroPath, 'utf8');
      const rawLayout = fs.existsSync(layoutAstroPath) ? fs.readFileSync(layoutAstroPath, 'utf8') : '';
      const stripFrontmatter = (s) => s.replace(/^---[\s\S]*?---\s*/, '');
      const bodyHtml = stripFrontmatter(rawAstro);
      const fullHtml = rawLayout
        ? stripFrontmatter(rawLayout).replace('<slot />', bodyHtml)
        : bodyHtml;
      fs.writeFileSync(path.join(dist, 'index.html'), fullHtml, 'utf8');
    }
  }
} else {
  // 2. Copy core web assets & public Agentic SEO manifests
  console.log('• Copying index.html, Agentic SEO manifests (llms.txt, robots.txt) and site assets...');
  const entryHtmlPath = path.join(root, projectConfig.paths.entryHtml);
  if (fs.existsSync(entryHtmlPath)) {
    fs.copyFileSync(entryHtmlPath, path.join(dist, 'index.html'));
  }
  for (const rootDoc of ['favicon.ico', 'llms.txt', 'llms-full.txt', 'robots.txt', 'sitemap.xml']) {
    if (fs.existsSync(path.join(root, rootDoc))) {
      fs.copyFileSync(path.join(root, rootDoc), path.join(dist, rootDoc));
    } else if (fs.existsSync(path.join(root, 'public', rootDoc))) {
      fs.copyFileSync(path.join(root, 'public', rootDoc), path.join(dist, rootDoc));
    }
  }
  if (fs.existsSync(path.join(root, 'site'))) {
    copyRecursive(path.join(root, 'site'), path.join(dist, 'site'));
  }
  if (fs.existsSync(path.join(root, 'public'))) {
    copyRecursive(path.join(root, 'public'), dist);
  }

  // 3. Copy optional project data files
  if (projectConfig.paths.dataFiles.length > 0) {
    console.log('• Copying project data files...');
    fs.mkdirSync(path.join(dist, 'data'), { recursive: true });
    for (const relData of projectConfig.paths.dataFiles) {
      const srcData = path.join(root, relData);
      if (fs.existsSync(srcData)) {
        fs.copyFileSync(srcData, path.join(dist, relData));
      }
    }
  }

  // 3.5 Copy optional interactive module directories if configured
  if (projectConfig.paths.overlays.length > 0) {
    console.log('• Copying interactive sub-modules...');
    for (const d of projectConfig.paths.overlays) {
      if (fs.existsSync(path.join(root, d))) {
        copyRecursive(path.join(root, d), path.join(dist, d));
      }
    }
  }
}

// 4.5 Minify CSS & JS in dist/ via esbuild (with external .map source maps for Lighthouse Best Practices)
async function minifyDistAssets() {
  let esbuild = null;
  try {
    const esbuildPath = path.join(FACTORY_ROOT, 'tools', 'audit', 'node_modules', 'esbuild', 'lib', 'main.js');
    if (fs.existsSync(esbuildPath)) {
      const mod = await import('file:///' + esbuildPath.replace(/\\/g, '/'));
      esbuild = mod.default || mod;
    }
  } catch (_) {}

  if (!esbuild) {
    console.log('• [Minify] esbuild not found in tools/audit/node_modules, keeping raw assets.');
    return;
  }

  console.log('• Minifying CSS & JS in dist/ with esbuild + generating source maps...');
  let savedBytes = 0;

  const cssDirs = [path.join(dist, 'site', 'css'), path.join(dist, 'styles')];
  for (const cssDir of cssDirs) {
    if (!fs.existsSync(cssDir)) continue;
    for (const file of fs.readdirSync(cssDir)) {
      if (!file.endsWith('.css')) continue;
      const fullPath = path.join(cssDir, file);
      const raw = fs.readFileSync(fullPath, 'utf8');
      try {
        const res = await esbuild.transform(raw, {
          loader: 'css',
          minify: true,
          sourcemap: 'external',
          sourcefile: file
        });
        const outCode = res.code + `\n/*# sourceMappingURL=${file}.map */\n`;
        fs.writeFileSync(fullPath, outCode, 'utf8');
        if (res.map) fs.writeFileSync(fullPath + '.map', res.map, 'utf8');
        savedBytes += Math.max(0, Buffer.byteLength(raw) - Buffer.byteLength(outCode));
      } catch (_) {}
    }
  }

  const jsDirs = [path.join(dist, 'site', 'js'), path.join(dist, 'data')];
  for (const dir of jsDirs) {
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.js') || file.endsWith('.min.js')) continue;
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) continue;
      const raw = fs.readFileSync(fullPath, 'utf8');
      try {
        const res = await esbuild.transform(raw, {
          loader: 'js',
          minifyWhitespace: true,
          minifySyntax: true,
          minifyIdentifiers: false,
          sourcemap: 'external',
          sourcefile: file
        });
        const outCode = res.code + `\n//# sourceMappingURL=${file}.map\n`;
        fs.writeFileSync(fullPath, outCode, 'utf8');
        if (res.map) fs.writeFileSync(fullPath + '.map', res.map, 'utf8');
        savedBytes += Math.max(0, Buffer.byteLength(raw) - Buffer.byteLength(outCode));
      } catch (_) {}
    }
  }

  // Optimize SVG assets in dist/ via svgo (if installed in tools/audit/node_modules/svgo)
  try {
    const svgoPath = path.join(FACTORY_ROOT, 'tools', 'audit', 'node_modules', 'svgo', 'dist', 'svgo.node.cjs');
    const svgoEsmPath = path.join(FACTORY_ROOT, 'tools', 'audit', 'node_modules', 'svgo', 'lib', 'svgo.js');
    let svgoMod = null;
    if (fs.existsSync(svgoEsmPath)) {
      svgoMod = await import('file:///' + svgoEsmPath.replace(/\\/g, '/'));
    } else if (fs.existsSync(svgoPath)) {
      svgoMod = await import('file:///' + svgoPath.replace(/\\/g, '/'));
    }
    const optimizeSvg = svgoMod?.optimize || svgoMod?.default?.optimize;
    if (typeof optimizeSvg === 'function') {
      const svgDir = path.join(dist, 'site', 'images');
      if (fs.existsSync(svgDir)) {
        for (const file of fs.readdirSync(svgDir)) {
          if (!file.endsWith('.svg')) continue;
          const fullSvg = path.join(svgDir, file);
          const rawSvg = fs.readFileSync(fullSvg, 'utf8');
          const result = optimizeSvg(rawSvg, { path: fullSvg, multipass: true });
          if (result && result.data) {
            fs.writeFileSync(fullSvg, result.data, 'utf8');
            savedBytes += Math.max(0, Buffer.byteLength(rawSvg) - Buffer.byteLength(result.data));
          }
        }
      }
    }
  } catch (_) {}

  console.log(`  ✓ Minified dist/ CSS, JS & SVGs (saved ${(savedBytes / 1024).toFixed(1)} KiB + generated .map files)`);
}

await minifyDistAssets();

// 4c. Inject automatic build cache-buster (?v=<buildTs>) into all HTML files in dist/
const buildTs = Date.now();
function injectHtmlCacheBusters(dirPath) {
  for (const item of fs.readdirSync(dirPath)) {
    const full = path.join(dirPath, item);
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      injectHtmlCacheBusters(full);
    } else if (item.endsWith('.html')) {
      const html = fs.readFileSync(full, 'utf8');
      const updated = html
        .replace(/(<(?:script|link)\b[^>]*?\b(?:src|href)=["'])(?!https?:\/\/|\/\/|data:)([^"'?#]+\.(?:js|css))(?:\?[^"']*)?(["'])/gi, `$1$2?v=${buildTs}$3`);
      if (updated !== html) {
        fs.writeFileSync(full, updated, 'utf8');
      }
    }
  }
}
injectHtmlCacheBusters(dist);

// 5. Generate Cloudflare _headers (Security, Hardened CSP, HSTS, COOP, Brotli, Caching)
console.log('• Generating Cloudflare _headers...');
const headersContent = `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  Cross-Origin-Opener-Policy: same-origin-allow-popups
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  Content-Security-Policy: default-src 'self' https: data: blob:; script-src 'self' 'inline-speculation-rules' https://challenges.cloudflare.com https://static.cloudflareinsights.com; script-src-attr 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' https: data: blob:; connect-src 'self' https: wss: ws://127.0.0.1:8080 ws://localhost:8080 ws://127.0.0.1:3001 http://127.0.0.1:3001; frame-src 'self' https://player.kick.com https://kick.com https://challenges.cloudflare.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; upgrade-insecure-requests;

/site/css/*
  Cache-Control: public, max-age=0, must-revalidate

/site/js/*
  Cache-Control: public, max-age=0, must-revalidate

/data/*
  Cache-Control: public, max-age=86400, stale-while-revalidate=604800

/site/images/*
  Cache-Control: public, max-age=31536000, immutable

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/_astro/*
  Cache-Control: public, max-age=31536000, immutable
`;
fs.writeFileSync(path.join(dist, '_headers'), headersContent.trim() + '\n', 'utf8');

// 6. Cloudflare SPA routing is handled natively via wrangler.toml:
// not_found_handling = "single-page-application" (avoids infinite loops with .html stripping)


// 7. Calculate bundle metrics
function dirMetrics(dirPath) {
  let count = 0;
  let totalBytes = 0;
  function walk(p) {
    for (const item of fs.readdirSync(p)) {
      const full = path.join(p, item);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) walk(full);
      else { count++; totalBytes += stat.size; }
    }
  }
  walk(dirPath);
  return { count, totalBytes };
}

const { count, totalBytes } = dirMetrics(dist);
console.log(`\n[SUCCESS] dist/ built cleanly: ${count} files, ${(totalBytes / (1024 * 1024)).toFixed(2)} MB`);
console.log('Ready for instant zero-card deployment via Cloudflare Pages or Cloudflare Workers Static Assets!\n');
