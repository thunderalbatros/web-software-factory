import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
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
    } else if (fs.existsSync(path.join(root, 'templates', 'vanilla-edge', rootDoc))) {
      fs.copyFileSync(path.join(root, 'templates', 'vanilla-edge', rootDoc), path.join(dist, rootDoc));
    }
  }
  if (fs.existsSync(path.join(root, 'site'))) {
    copyRecursive(path.join(root, 'site'), path.join(dist, 'site'));
  } else if (fs.existsSync(path.join(root, 'templates', 'vanilla-edge', 'site'))) {
    copyRecursive(path.join(root, 'templates', 'vanilla-edge', 'site'), path.join(dist, 'site'));
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

// 4.5 Minify CSS & JS in dist/ via LightningCSS (Rust) & esbuild
async function minifyDistAssets() {
  let lightningTransform = null;
  try {
    const lcss = await import('lightningcss');
    lightningTransform = lcss.transform || (lcss.default && lcss.default.transform) || null;
  } catch (_) {}

  let esbuild = null;
  try {
    const esbuildPath = path.join(FACTORY_ROOT, 'tools', 'audit', 'node_modules', 'esbuild', 'lib', 'main.js');
    if (fs.existsSync(esbuildPath)) {
      const mod = await import('file:///' + esbuildPath.replace(/\\/g, '/'));
      esbuild = mod.default || mod;
    }
  } catch (_) {}

  let savedBytes = 0;

  if (lightningTransform || esbuild) {
    console.log(`• Minifying CSS in dist/ via ${lightningTransform ? 'LightningCSS (Rust)' : 'esbuild'}...`);
    const cssDirs = [path.join(dist, 'site', 'css'), path.join(dist, 'styles')];
    for (const cssDir of cssDirs) {
      if (!fs.existsSync(cssDir)) continue;
      for (const file of fs.readdirSync(cssDir)) {
        if (!file.endsWith('.css')) continue;
        const fullPath = path.join(cssDir, file);
        const raw = fs.readFileSync(fullPath, 'utf8');
        try {
          if (lightningTransform) {
            const res = lightningTransform({
              filename: file,
              code: Buffer.from(raw, 'utf8'),
              minify: true,
              sourceMap: true
            });
            const outCode = res.code.toString('utf8') + `\n/*# sourceMappingURL=${file}.map */\n`;
            fs.writeFileSync(fullPath, outCode, 'utf8');
            if (res.map) fs.writeFileSync(fullPath + '.map', res.map.toString('utf8'), 'utf8');
            savedBytes += Math.max(0, Buffer.byteLength(raw) - Buffer.byteLength(outCode));
          } else if (esbuild) {
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
          }
        } catch (_) {}
      }
    }
  }

  if (!esbuild) {
    if (savedBytes > 0) {
      console.log(`  ✓ LightningCSS saved ${(savedBytes / 1024).toFixed(2)} KB across production CSS bundles.`);
    }
    return;
  }

  console.log('• Minifying JS in dist/ with esbuild + generating source maps...');

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
  Content-Security-Policy: default-src 'self'; script-src 'self' 'inline-speculation-rules' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-src https://challenges.cloudflare.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()
  Cross-Origin-Opener-Policy: same-origin
  X-Frame-Options: DENY

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

/**
 * Pure Node.js Zero-Dependency PKZIP Archive Builder (node:zlib deflateRawSync + crc32)
 * Generates standard .zip archives in <15ms without spawning external OS processes.
 */
export function createZipArchiveFromDir(sourceDir, outZipPath, skipFileNames = new Set()) {
  const files = [];
  function collect(currentDir) {
    for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
      if (skipFileNames.has(entry.name)) continue;
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        collect(fullPath);
      } else {
        const relPath = path.relative(sourceDir, fullPath).replace(/\\/g, '/');
        files.push({ fullPath, relPath });
      }
    }
  }
  collect(sourceDir);

  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const file of files) {
    const rawData = fs.readFileSync(file.fullPath);
    const compressedData = zlib.deflateRawSync(rawData);
    const crc = zlib.crc32(rawData) >>> 0;
    const nameBuf = Buffer.from(file.relPath, 'utf8');

    const localHeader = Buffer.alloc(30 + nameBuf.length);
    localHeader.writeUInt32LE(0x04034b50, 0); // Local file header signature
    localHeader.writeUInt16LE(20, 4);         // Version needed to extract (2.0)
    localHeader.writeUInt16LE(0x0800, 6);     // UTF-8 filename flag
    localHeader.writeUInt16LE(8, 8);          // Compression method: Deflate (8)
    localHeader.writeUInt16LE(0, 10);         // File last mod time
    localHeader.writeUInt16LE(0x595b, 12);    // File last mod date
    localHeader.writeUInt32LE(crc, 14);
    localHeader.writeUInt32LE(compressedData.length, 18);
    localHeader.writeUInt32LE(rawData.length, 22);
    localHeader.writeUInt16LE(nameBuf.length, 26);
    localHeader.writeUInt16LE(0, 28);         // Extra field length
    nameBuf.copy(localHeader, 30);

    localParts.push(localHeader, compressedData);

    const centralHeader = Buffer.alloc(46 + nameBuf.length);
    centralHeader.writeUInt32LE(0x02014b50, 0); // Central directory signature
    centralHeader.writeUInt16LE(20, 4);         // Version made by
    centralHeader.writeUInt16LE(20, 6);         // Version needed
    centralHeader.writeUInt16LE(0x0800, 8);     // UTF-8 flag
    centralHeader.writeUInt16LE(8, 10);         // Deflate
    centralHeader.writeUInt16LE(0, 12);
    centralHeader.writeUInt16LE(0x595b, 14);
    centralHeader.writeUInt32LE(crc, 16);
    centralHeader.writeUInt32LE(compressedData.length, 20);
    centralHeader.writeUInt32LE(rawData.length, 24);
    centralHeader.writeUInt16LE(nameBuf.length, 28);
    centralHeader.writeUInt16LE(0, 30);
    centralHeader.writeUInt16LE(0, 32);
    centralHeader.writeUInt16LE(0, 34);
    centralHeader.writeUInt16LE(0, 36);
    centralHeader.writeUInt32LE(0, 38);
    centralHeader.writeUInt32LE(offset, 42);
    nameBuf.copy(centralHeader, 46);

    centralParts.push(centralHeader);
    offset += localHeader.length + compressedData.length;
  }

  const centralSize = centralParts.reduce((acc, b) => acc + b.length, 0);
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4);
  eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(files.length, 8);
  eocd.writeUInt16LE(files.length, 10);
  eocd.writeUInt32LE(centralSize, 12);
  eocd.writeUInt32LE(offset, 16);
  eocd.writeUInt16LE(0, 20);

  const zipBuffer = Buffer.concat([...localParts, ...centralParts, eocd]);
  fs.mkdirSync(path.dirname(outZipPath), { recursive: true });
  fs.writeFileSync(outZipPath, zipBuffer);
  return { fileCount: files.length, sizeBytes: zipBuffer.length };
}

/**
 * Exports a 100% Standalone Production Package (Zero-Factory-Dependencies) + <slug>-produccion.zip
 * to both `deliverables/<slug>/` and `C:\Users\tomas\Desktop\Sitios_Entregables\<slug>\`.
 */
export function exportStandaloneDeliverable(cfg = projectConfig) {
  const slug = cfg.id || 'sitio-web';
  const displayName = cfg.name || slug;
  const projRoot = cfg.projectRoot;
  const projDist = path.join(projRoot, cfg.paths.distDir || 'dist');

  const localDeliverableDir = path.join(FACTORY_ROOT, 'deliverables', slug);
  const desktopDeliverableDir = path.join('C:\\Users\\tomas\\Desktop\\Sitios_Entregables', slug);
  const zipFileName = `${slug}-produccion.zip`;

  // Clean and prepare local deliverable staging directory
  if (fs.existsSync(localDeliverableDir)) {
    fs.rmSync(localDeliverableDir, { recursive: true, force: true });
  }
  fs.mkdirSync(localDeliverableDir, { recursive: true });

  // 1. Copy minified production dist/
  copyRecursive(projDist, path.join(localDeliverableDir, 'dist'));

  // 2. Copy Zero-Trust _headers and llms.txt to package root (as well as inside dist/)
  const distHeaders = path.join(projDist, '_headers');
  if (fs.existsSync(distHeaders)) {
    fs.copyFileSync(distHeaders, path.join(localDeliverableDir, '_headers'));
  }
  const distLlms = path.join(projDist, 'llms.txt');
  const rootLlms = path.join(projRoot, 'llms.txt');
  if (fs.existsSync(distLlms)) {
    fs.copyFileSync(distLlms, path.join(localDeliverableDir, 'llms.txt'));
  } else if (fs.existsSync(rootLlms)) {
    fs.copyFileSync(rootLlms, path.join(localDeliverableDir, 'llms.txt'));
    fs.copyFileSync(rootLlms, path.join(localDeliverableDir, 'dist', 'llms.txt'));
  } else {
    const defaultLlms = `# ${displayName}\n\n> Agentic AI & WebMCP Discovery Manifest (${cfg.archetype} | ${cfg.stack})\n`;
    fs.writeFileSync(path.join(localDeliverableDir, 'llms.txt'), defaultLlms, 'utf8');
    fs.writeFileSync(path.join(localDeliverableDir, 'dist', 'llms.txt'), defaultLlms, 'utf8');
  }

  // 3. Copy standalone worker/index.js
  const workerCandidates = [
    path.join(projRoot, cfg.paths.workerEntry || 'worker/index.js'),
    path.join(FACTORY_ROOT, 'templates', cfg.stack === 'astro-edge' ? 'astro-edge' : 'vanilla-edge', 'worker', 'index.js')
  ];
  const workerDest = path.join(localDeliverableDir, 'worker', 'index.js');
  fs.mkdirSync(path.dirname(workerDest), { recursive: true });
  const foundWorker = workerCandidates.find(p => fs.existsSync(p));
  if (foundWorker) {
    fs.copyFileSync(foundWorker, workerDest);
  }

  // 4. Write preconfigured standalone wrangler.toml
  const wranglerToml = `name = "${slug}"
main = "worker/index.js"
compatibility_date = "2026-10-01"

[assets]
directory = "./dist"
not_found_handling = "single-page-application"

[vars]
PROJECT_ID = "${slug}"
PROJECT_ARCHETYPE = "${cfg.archetype || 'saas-b2b'}"
`;
  fs.writeFileSync(path.join(localDeliverableDir, 'wrangler.toml'), wranglerToml, 'utf8');

  // 5. Write minimalist Zero-Factory-Dependencies package.json
  const standalonePkg = {
    name: `${slug}-production`,
    version: cfg.version || '1.0.0',
    private: true,
    type: 'module',
    description: `Paquete de producción autónomo (Zero-Factory-Dependencies) para ${displayName}`,
    scripts: {
      preview: 'npx wrangler dev',
      deploy: 'npx wrangler deploy',
      'deploy:pages': `npx wrangler pages deploy ./dist --project-name ${slug}`
    }
  };
  fs.writeFileSync(
    path.join(localDeliverableDir, 'package.json'),
    JSON.stringify(standalonePkg, null, 2) + '\n',
    'utf8'
  );

  // 6. Write COMO_PUBLICAR_ESTE_SITIO.md in plain Argentine Spanish
  const guiaPublicacion = `# 🚀 Cómo Publicar tu Sitio Web (${displayName})

Este paquete es **100% autónomo** y ya tiene todo tu sitio web optimizado, minificado y blindado con seguridad Zero-Trust para publicarse gratis en **Cloudflare**.

---

## Opción 1: Subir arrastrando y soltando (Sin usar código — 1 minuto)

1. Entrá a tu cuenta gratuita de Cloudflare en [https://dash.cloudflare.com](https://dash.cloudflare.com).
2. En el menú izquierdo, hacé clic en **Workers & Pages** y luego en el botón azul **Create**.
3. Elegí la pestaña **Pages** y hacé clic en **Upload assets** (*Subir archivos*).
4. Escribí el nombre de tu proyecto: \`${slug}\`.
5. **Arrastrá y soltá** directamente la carpeta \`dist\` (o el archivo comprimido \`${zipFileName}\`) dentro del recuadro de Cloudflare.
6. Hacé clic en **Deploy site**. ¡En 10 segundos tu sitio estará online en \`https://${slug}.pages.dev\` con certificado HTTPS automático!

---

## Opción 2: Publicar con 1 solo comando (Si tenés Node.js abierto)

Abrí una consola dentro de esta carpeta y ejecutá cualquiera de estos dos comandos:

- **Para Cloudflare Pages:**
  \`\`\`powershell
  npm run deploy:pages
  \`\`\`
- **Para Cloudflare Workers + Static Assets (con API en \`worker/index.js\`):**
  \`\`\`powershell
  npm run deploy
  \`\`\`

---

## 📦 ¿Qué contiene esta carpeta entregable?

- \`dist/\`: Tu sitio web completo minificado y listo para internet.
- \`_headers\`: Escudo de seguridad bancaria (CSP estricto, HSTS, anti-clonación).
- \`llms.txt\`: Manifiesto optimizado para buscadores de IA (ChatGPT, Perplexity, Gemini, Claude).
- \`worker/index.js\`: Servidor ultraligero en el borde (Cloudflare Edge Worker).
- \`wrangler.toml\` y \`package.json\`: Configuración lista para publicar en 1 clic sin depender de la fábrica.
- \`${zipFileName}\`: Archivo comprimido listo para enviar por correo o subir manualmente.
`;
  fs.writeFileSync(path.join(localDeliverableDir, 'COMO_PUBLICAR_ESTE_SITIO.md'), guiaPublicacion, 'utf8');

  // 7. Create <slug>-produccion.zip inside deliverables/<slug>/
  const localZipPath = path.join(localDeliverableDir, zipFileName);
  const zipStats = createZipArchiveFromDir(localDeliverableDir, localZipPath, new Set([zipFileName]));

  // 8. Mirror complete standalone package to Desktop: C:\Users\tomas\Desktop\Sitios_Entregables\<slug>\
  if (fs.existsSync(desktopDeliverableDir)) {
    fs.rmSync(desktopDeliverableDir, { recursive: true, force: true });
  }
  copyRecursive(localDeliverableDir, desktopDeliverableDir);

  return {
    slug,
    displayName,
    localDeliverableDir,
    desktopDeliverableDir,
    zipFileName,
    localZipPath,
    desktopZipPath: path.join(desktopDeliverableDir, zipFileName),
    zipFileCount: zipStats.fileCount,
    zipSizeKb: Number((zipStats.sizeBytes / 1024).toFixed(1))
  };
}

if (process.argv.includes('--package')) {
  const pkgRes = exportStandaloneDeliverable(projectConfig);
  console.log(`📦 [STANDALONE DELIVERABLE EXPORTED]`);
  console.log(`  • Local Path   : ${pkgRes.localDeliverableDir}`);
  console.log(`  • Desktop Path : ${pkgRes.desktopDeliverableDir}`);
  console.log(`  • ZIP Archive  : ${pkgRes.zipFileName} (${pkgRes.zipSizeKb} KB, ${pkgRes.zipFileCount} files)\n`);
}
