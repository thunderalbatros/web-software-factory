import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import astroExpressiveCode from 'astro-expressive-code';
import mdx from '@astrojs/mdx';
import { AstroPWAIntegration as AstroPWA } from '@vite-pwa/astro';
import { compileStaticDistCspAndHeaders } from './src/lib/csp-builder.mjs';

const PROJECT_ROOT = path.dirname(fileURLToPath(import.meta.url));
const SITE_ORIGIN = 'https://academia-ia.pages.dev';

function collectRoutePaths(distDir, currentDir = distDir, routes = []) {
  if (!fs.existsSync(currentDir)) return routes;
  for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
    const full = path.join(currentDir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '_astro' || entry.name === 'pagefind') continue;
      collectRoutePaths(distDir, full, routes);
    } else if (entry.name === 'index.html') {
      const relDir = path.relative(distDir, currentDir).replace(/\\/g, '/');
      routes.push(relDir ? `/${relDir}/` : '/');
    }
  }
  return routes.sort();
}

function generateSitemapAndAgenticManifests(distDir) {
  const routes = collectRoutePaths(distDir);
  const lastmod = '2026-11-15';
  const urlEntries = routes
    .map(
      (route) =>
        `  <url>\n    <loc>${SITE_ORIGIN}${route}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
    )
    .join('\n');
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;

  const llmsTxt = `# Academia IA

> Plataforma educativa abierta, minimalista e inclusiva en español sobre inteligencia artificial y tecnologías emergentes (UNESCO Adquirir -> Profundizar -> Crear). Costo de servidor $0.00 USD, privacidad local-first (Ley 25.326) y accesibilidad WCAG 2.2 AA (Ley 26.653).

## Rutas Pedagógicas Principales
- [Inicio](${SITE_ORIGIN}/): Índice editorial de 3 niveles UNESCO, buscador local Pagefind y selector de arquetipos técnicos sin rastreo.
- [Nivel 1 · Principiante](${SITE_ORIGIN}/niveles/principiante/): Uso cotidiano y en oficios reales sin código; toda herramienta paga incluye alternativa gratuita sin tarjeta.
- [Nivel 2 · Intermedio](${SITE_ORIGIN}/niveles/intermedio/): Búsqueda aumentada local (RAG) con SQLite FTS5, vectores abiertos y ecuaciones MathML (Temml 0 KB JS).
- [Nivel 3 · Avanzado](${SITE_ORIGIN}/niveles/avanzado/): Sistemas compuestos seguros, CSP por hashes SHA-256, Trusted Types, sandboxes opacos y Software Factories.
- [Manifiesto Completo para Agentes](/llms-full.txt): Contratos técnicos, licencias abiertas (MIT / CC-BY-NC-SA-4.0) e invariantes de seguridad.
`;

  const prdRaw = fs.existsSync(path.join(PROJECT_ROOT, 'PRD_LEAN.md'))
    ? fs.readFileSync(path.join(PROJECT_ROOT, 'PRD_LEAN.md'), 'utf8')
    : '';
  const specRaw = fs.existsSync(path.join(PROJECT_ROOT, 'SPEC.md'))
    ? fs.readFileSync(path.join(PROJECT_ROOT, 'SPEC.md'), 'utf8')
    : '';

  const llmsFullTxt = `${llmsTxt}\n---\n\n${prdRaw.trim()}\n\n---\n\n${specRaw.trim()}\n`;

  const publicDir = path.join(PROJECT_ROOT, 'public');
  fs.mkdirSync(publicDir, { recursive: true });

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
  fs.writeFileSync(path.join(distDir, 'llms.txt'), llmsTxt, 'utf8');
  fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt, 'utf8');
  fs.writeFileSync(path.join(distDir, 'llms-full.txt'), llmsFullTxt, 'utf8');
  fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), llmsFullTxt, 'utf8');
}

async function runPagefindIndexing(distDir) {
  const pf = await import('pagefind');
  try {
    const { index } = await pf.createIndex();
    if (!index) {
      throw new Error('Pagefind createIndex() returned no index instance.');
    }
    const routes = collectRoutePaths(distDir);
    for (const route of routes) {
      const relHtml = route === '/' ? 'index.html' : `${route.replace(/^\/+|\/+$/g, '')}/index.html`;
      const htmlPath = path.join(distDir, relHtml);
      if (fs.existsSync(htmlPath)) {
        await index.addHTMLFile({
          url: route,
          content: fs.readFileSync(htmlPath, 'utf8')
        });
      }
    }
    const { files, errors } = await index.getFiles();
    if (Array.isArray(errors) && errors.length > 0) {
      throw new Error(`Pagefind getFiles() errors: ${errors.join('; ')}`);
    }
    const pagefindOutDir = path.join(distDir, 'pagefind');
    fs.mkdirSync(pagefindOutDir, { recursive: true });
    for (const file of files || []) {
      const destPath = path.join(pagefindOutDir, file.path);
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.writeFileSync(destPath, file.content);
    }
  } finally {
    if (typeof pf.close === 'function') {
      await pf.close();
    }
  }
}

function academiaPrePwaPostBuildIntegration() {
  return {
    name: 'academia-ia-postbuild-pagefind-a11y-csp',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const distDir = fileURLToPath(dir);
        generateSitemapAndAgenticManifests(distDir);
        compileStaticDistCspAndHeaders(PROJECT_ROOT, {
          profile: 'education',
          distDir,
          syncPublicHeaders: true
        });
        await runPagefindIndexing(distDir);
      }
    }
  };
}

function academiaFinalCspSealIntegration() {
  return {
    name: 'academia-ia-final-csp-seal',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const distDir = fileURLToPath(dir);
        compileStaticDistCspAndHeaders(PROJECT_ROOT, {
          profile: 'education',
          distDir,
          syncPublicHeaders: true,
          extractInlineStyles: false
        });
      }
    }
  };
}

export default defineConfig({
  site: SITE_ORIGIN,
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'never'
  },
  vite: {
    build: {
      sourcemap: false,
      chunkSizeWarningLimit: 2000
    }
  },
  integrations: [
    astroExpressiveCode({
      themes: ['github-light-high-contrast', 'github-dark-high-contrast'],
      useDarkModeMediaQuery: false,
      themeCssSelector: (theme) =>
        theme.type === 'dark' ? ':root[data-theme="dark"]' : ':root:not([data-theme="dark"])',
      frames: {
        showCopyToClipboardButton: false
      }
    }),
    mdx(),
    academiaPrePwaPostBuildIntegration(),
    AstroPWA({
      registerType: 'autoUpdate',
      injectRegister: null,
      manifestFilename: 'manifest.webmanifest',
      manifest: {
        name: 'Academia IA — Educación Abierta en Español',
        short_name: 'Academia IA',
        description: 'Plataforma educativa abierta, minimalista e inclusiva sobre inteligencia artificial (UNESCO Adquirir, Profundizar, Crear).',
        lang: 'es',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#f7f8fa',
        theme_color: '#13448a',
        icons: [
          {
            src: '/favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml'
          }
        ]
      },
      generateSW: {
        navigateFallback: null,
        globPatterns: ['**/*.{html,css,js,svg,ico}'],
        globIgnores: ['**/cl100k_base*.js', '**/pagefind/**'],
        runtimeCaching: [
          {
            urlPattern: /\/_astro\/cl100k_base.*\.(?:js|mjs)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'academia-tiktoken-dict-v1',
              expiration: {
                maxEntries: 4,
                maxAgeSeconds: 60 * 60 * 24 * 30
              }
            }
          },
          {
            urlPattern: /\/pagefind\/.*/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'academia-pagefind-index-v1',
              expiration: {
                maxEntries: 64,
                maxAgeSeconds: 60 * 60 * 24 * 7
              }
            }
          }
        ]
      }
    }),
    academiaFinalCspSealIntegration()
  ]
});
