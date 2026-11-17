---
title: "Web Platform Baseline 2026: Astro 7 Óptimo, Ingeniería de INP/LCP, Primitivas CSS Nativas y Gate Dual WCAG 2.2 AA + APCA"
domain: "ui_ux_design"
approval_status: "PENDING_CTO_REVIEW"
created_at: "2026-11-17"
sources:
  - title: "Astro Documentation — Experimental & Built-in Fonts Optimization Guide"
    url: "https://docs.astro.build/en/guides/fonts/"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "Astro Documentation — Responsive Images & Asset Pipeline"
    url: "https://docs.astro.build/en/guides/images/"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "Cloudflare Workers Static Assets Documentation"
    url: "https://developers.cloudflare.com/workers/static-assets/"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "web.dev — Optimize Interaction to Next Paint (INP) & LoAF"
    url: "https://web.dev/articles/optimize-inp"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "web.dev — Optimize Largest Contentful Paint (LCP)"
    url: "https://web.dev/articles/optimize-lcp"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "GoogleChrome/web-vitals — RUM Measurement Library v5 (LoAF Attribution)"
    url: "https://github.com/GoogleChrome/web-vitals"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "MDN Web Docs — CSS Anchor Positioning"
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "MDN Web Docs — Popover API & Declarative Invokers"
    url: "https://developer.mozilla.org/en-US/docs/Web/API/Popover_API"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "W3C Recommendation — Web Content Accessibility Guidelines (WCAG) 2.2"
    url: "https://www.w3.org/TR/WCAG22/"
    verified_at: "2026-11-17"
    http_status: 200
---

# Web Platform Baseline 2026: Astro 7 Óptimo, Ingeniería de INP/LCP, Primitivas CSS Nativas y Gate Dual WCAG 2.2 AA + APCA

Este tratado establece la configuración óptima de producción para sitios estáticos y edge-híbridos sobre **Astro 7 + Cloudflare Workers Static Assets**, eliminando dependencias JavaScript superfluas, bloqueos del hilo principal y brechas normativas de accesibilidad.

---

## 1. Higiene y Configuración Óptima de Astro 7 + Cloudflare Workers Static Assets

El stack elegido (**Astro 7.4+** en `output: 'static'` desplegado sobre **Cloudflare Workers Static Assets** con `_headers` y Pagefind en cliente) representa la frontera óptima en latencia TTFB y costo cero cuando se respetan estas reglas:

1. **Builds 100% Idempotentes (Cero Mutación de `public/`):** Un hook `astro:build:done` **nunca** debe escribir archivos generados (`sitemap.xml`, `llms.txt`, `llms-full.txt`, `_headers` con hashes CSP) hacia el directorio fuente `public/`. Todo artefacto derivado del build pertenece exclusivamente a `dist/`, evitando ensuciar el árbol de Git tras cada compilación.
2. **Compilación Única de CSP por Hashes:** Las integraciones post-build (Pagefind, Vite PWA) deben finalizar antes de ejecutar el compilador único de hashes SHA-256 (`compileStaticDistCspAndHeaders`) sobre los HTML finales de `dist/`, evitando trabajo duplicado y desfases entre manifest/SW y cabeceras HTTP.
3. **Astro Fonts API para `CLS = 0.000`:** Configurar fuentes locales/autoalojadas mediante `experimental.fonts` / Astro Fonts API en lugar de hojas manuales externas. Astro calcula automáticamente las métricas de fallback (`size-adjust`, `ascent-override`, `descent-override`, `line-gap-override`) reduciendo los saltos de layout tipográfico a cero.
4. **Pipeline de Imágenes Responsivas (`astro:assets`):** Todo asset visual no vectorial debe pasar por `<Image />` o `<Picture />` emitiendo AVIF/WebP dimensionados, reservando explícitamente `fetchpriority="high"` y `loading="eager"` **solo** para el elemento LCP sobre el pliegue, y `loading="lazy"` + `decoding="async"` para el resto.
5. **Instalabilidad Real de PWA:** Además del ícono vectorial SVG, el Web App Manifest exige PNG rasterizados de `192x192` y `512x512` (`purpose: "any"` y `"maskable"`), `apple-touch-icon` de `180x180` en PNG y página de respaldo offline explícita en Workbox (`navigateFallback` limitado a rutas reales del sitio).

---

## 2. Primitivas Web Baseline 2026 que Reemplazan Miles de Líneas de JavaScript

Antes de instalar librerías de UI de terceros (Floating UI, carruseles JS, routers SPA pesados o librerías de acordeones), emplear los estándares nativos Baseline disponibles sin costo de bundle:

| Necesidad UI / UX | Primitiva Nativa SOTA 2026 | Alternativa JS que Elimina |
| :--- | :--- | :--- |
| Transiciones fluidas entre páginas MPA | `@view-transition { navigation: auto; }` + `view-transition-name` | Frameworks SPA completos (100+ KB JS) |
| Navegación instantánea por intención | `<script type="speculationrules">` (`"eagerness": "moderate"`) | Prefetchers manuales con `fetch()` |
| Tooltips, menús y paneles flotantes posicionados | **Popover API (`popover="auto"`)** + **CSS Anchor Positioning** (`anchor-name`, `position-anchor`, `position-try-fallbacks`) | `@floating-ui/dom`, Popper.js |
| Triggers declarativos sin listeners JS | **Invoker Commands** (`<button commandfor="panel-id" command="show-modal">`) + `<dialog>` | Handlers manuales `addEventListener` |
| Animaciones de entrada/salida en `display: none` | `@starting-style` + `transition-behavior: allow-discrete` | Sistemas JS de montaje/desmontaje |
| Acordeones exclusivos y pestañas accesibles | `<details name="grupo-unico">` + `::details-content` interpolado con `calc-size(auto, size)` | Componentes acordeón React/JS |
| Rendimiento en artículos largos | `content-visibility: auto` + `contain-intrinsic-size: auto 480px` | Virtualizadores complejos en prosa |
| Tipografía editorial sin huérfanas ni viudas | `text-wrap: balance` en títulos (`h1–h3`) + `text-wrap: pretty` en párrafos | Algoritmos de partición en JS |

```css
/* Ejemplo nativo 2026: Popover animado con Anchor Positioning y cero JavaScript */
@view-transition {
  navigation: auto;
}

.trigger-btn {
  anchor-name: --glossary-anchor;
}

[popover].glossary-card {
  position-anchor: --glossary-anchor;
  position-area: block-end span-inline-end;
  position-try-fallbacks: flip-block, flip-inline;
  transition: opacity 200ms ease, transform 200ms ease, display 200ms allow-discrete, overlay 200ms allow-discrete;
  opacity: 1;
  transform: translateY(0);
}

@starting-style {
  [popover]:popover-open.glossary-card {
    opacity: 0;
    transform: translateY(6px);
  }
}
```

---

## 3. Ingeniería de `INP <= 50 ms` y Control de Peso de Bundles en Cliente

El mayor riesgo silencioso en sitios estáticos Astro ocurre cuando un componente interactivo de apoyo importa diccionarios de datos masivos al grafo de Vite. Por ejemplo, importar directamente `js-tiktoken/ranks/cl100k_base` genera un chunk JS superior a `1,065 KB` sin comprimir (`> 400 KB` Brotli) que congela el hilo principal al parsearse y evaluarse en dispositivos móviles de gama media.

### 3.1 Reglas de Oro contra Tareas Largas (`INP` y `LoAF`)
1. **Aislar Diccionarios Pesados en un Dedicated Web Worker:** Cualquier tabla de vocabulario BPE, índice local o modelo ligero (`> 100 KB`) debe residir en un `Worker` bajo demanda o descargarse como archivo binario estático comprimido (`fetch('/assets/bpe-compact.bin')`) solo cuando el usuario interactúe explícitamente en la página de laboratorio, nunca precargado en layouts transversales por defecto.
2. **Segmentar Trabajos con `scheduler.yield()`:** En búsquedas Pagefind o renderizado de listas de chips, dividir bloques mayores a `32 ms` cediendo el control al navegador mediante `await (globalThis.scheduler?.yield?.() ?? new Promise((r) => setTimeout(r, 0)))` para mantener la pintura responsiva.
3. **Medición Real con `web-vitals` v5 + Atribución LoAF:** Integrar en auditorías Playwright e instrumentación RUM `onINP` con `reportAllChanges` inspeccionando `attribution.longAnimationFrameEntries` (`blockingDuration`, `scripts[].sourceURL`) para identificar qué script exacto provocó un frame lento.

---

## 4. Gate Dual de Contraste Accesible: WCAG 2.2 AA (Normativo) + APCA (Perceptual)

Aunque **APCA (`Lc`)** modela con superior precisión científica la luminancia perceptual humana sobre espacios `OKLCH`, **APCA no posee todavía estatus normativo oficial en W3C**, mientras que las leyes de accesibilidad vigentes (como la Ley 26.653 en Argentina y el estándar europeo EN 301 549) exigen conformidad demostrable con **WCAG 2.2 Nivel AA**.

### 4.1 Invariante Obligatorio de Validación Dual en `token_compiler` y `ryux_design_gate`
Todo par `(foreground, background)` generado en `design.tokens.json` debe superar **simultáneamente**:

1. **Bloqueador Legal (WCAG 2.2 AA):**
   - Texto normal (`< 24px` o `< 18.66px` bold): relación de contraste mínima **`>= 4.5 : 1`**.
   - Texto grande (`>= 24px` o `>= 18.66px` bold), íconos funcionales y bordes de foco (`SC 2.4.11`): relación mínima **`>= 3.0 : 1`**.
   - Área de objetivo interactivo (`SC 2.5.8 Target Size Minimum`): mínimo **`24 x 24 CSS px`** (objetivo recomendado de comodidad táctil: `44 x 44 CSS px`).
   - Foco visible no oculto (`SC 2.4.11` / `SC 2.4.13`): indicador `:focus-visible` continuo de `>= 2px` con contraste `>= 3:1` frente a fondo adyacente y contenido nunca tapado por cabeceras `sticky`.
2. **Piso Perceptual de Diseño (`OKLCH` + APCA):**
   - Lectura continua de lecciones o documentación: **`|Lc| >= 75`**.
   - Texto de interfaz general y subtítulos: **`|Lc| >= 60`**.
   - Tipografía de gran tamaño (`>= 32px` bold): **`|Lc| >= 45`**.
