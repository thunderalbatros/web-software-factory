---
title: "Coreografía de Movimiento a 60/120 FPS, OGL vs Three.js WebGPU/TSL y Pipeline glTF-Transform + Meshoptimizer + KTX2"
domain: "motion_and_animation"
approval_status: "APPROVED_BY_CTO"
created_at: "2026-11-17"
sources:
  - title: "MDN Web Docs — Web Animations API (WAAPI)"
    url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "Motion — Quick Start & Hardware-Accelerated Mini Runtime"
    url: "https://motion.dev/docs/quick-start"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "GSAP v3 Official Documentation (Free Club Plugins)"
    url: "https://gsap.com/docs/v3/"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "Three.js Shading Language (TSL) Official Wiki"
    url: "https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "OGL — Minimal WebGL Framework (~8-14 KB)"
    url: "https://github.com/oframe/ogl"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "glTF-Transform — Modular glTF 2.0 Asset Optimization SDK & CLI"
    url: "https://gltf-transform.dev/"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "meshoptimizer — Mesh Compression & Vertex Cache Optimization"
    url: "https://github.com/zeux/meshoptimizer"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "The Book of Shaders — Patricio Gonzalez Vivo & Jen Lowe (Free Online Book)"
    url: "https://thebookofshaders.com/"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "Discover three.js — Lewy Blue (Free Online Book)"
    url: "https://discoverthreejs.com/"
    verified_at: "2026-11-17"
    http_status: 200
approved_by: "CTO"
approved_at: "2026-11-17T15:37:31.574Z"
---

# Coreografía de Movimiento a 60/120 FPS, OGL vs Three.js WebGPU/TSL y Pipeline glTF-Transform + Meshoptimizer + KTX2

La fluidez visual extrema no depende de añadir librerías pesadas en cada página, sino de respetar el hilo del compositor GPU, dimensionar el runtime al presupuesto exacto del efecto y comprimir los activos 3D antes de enviarlos por red.

---

## 1. Pirámide de Presupuesto de Animación a 60/120 FPS

| Nivel | Tecnología | Peso Brotli | Hilo de Ejecución | Cuándo Usarla |
| :--- | :--- | :--- | :--- | :--- |
| **Nivel 0 (Por Defecto)** | CSS Transitions/Animations + `linear()` springs + `animation-timeline: scroll()/view()` | `0.0 KB` | Compositor GPU (fuera del Main Thread) | Reveals de scroll, barras de progreso, paralaje de capas, micro-estados UI (`transform`, `opacity`, `clip-path`) |
| **Nivel 1 (Ligero JS)** | Web Animations API (`Element.animate()`) o **`motion/mini`** | `0 KB` – `3.3 KB` | Hilo compositor (híbrido WAAPI) | Secuencias UI interactivas por eventos complejos o resortes spring cancelables |
| **Nivel 2 (Coreografía Rica)** | **GSAP 3.13+** (`ScrollTrigger`, `Flip`, `SplitText` con `autoSplit: true`, `MorphSVG`) | `~23–40 KB` | JS coordinado (siempre lazy vía `import()`) | Escenas de *scrollytelling*, transiciones geométricas `FLIP`, morfos SVG o coreografía de texto |

### 1.1 Disciplina de Rendimiento y Accesibilidad del Movimiento
1. **Solo Propiedades de Compositor:** Prohibido animar `width`, `height`, `top`, `left`, `margin`, `padding` o `box-shadow` continuo en scroll; usar exclusivamente `transform`, `opacity`, `clip-path` y con moderación `filter`.
2. **Carga Diferida Real de Nivel 2:** Ninguna página cuyo contenido sobre el pliegue sea editorial o de conversión debe incluir GSAP o Motion en el paquete inicial de entrada. Disparar `import('gsap')` dentro de un callback de `IntersectionObserver` con `rootMargin: '250px'`.
3. **Respeto Estricto de `prefers-reduced-motion`:** Tanto las reglas CSS (`@media (prefers-reduced-motion: reduce)`) como `gsap.matchMedia()` y shaders canvas deben anular desplazamientos espaciales intensos y reemplazarlos por disolvencias suaves de opacidad o estado estático inmediato.

---

## 2. Shaders 2D/2.5D sin Bloat: `oframe/ogl` vs `three@0.187+` WebGPU/TSL

Usar `three` completo (~150+ KB comprimido) únicamente para renderizar un fondo de ruido gradiente, ondas líquidas o tarjetas holográficas penaliza gravemente el tiempo de parseo JS en móviles.

### 2.1 Matriz de Selección Gráfica
- **Fondos procedurales, gradientes OKLCH fluidos, SDF 2D y distorsiones de plano (`Canvas 2D` / `WebGL2`):**
  - Elegir **`oframe/ogl`** (`~8–14 KB`, licencia MIT, cero árbol de escena superfluo) o un fragment shader WebGL2 mínimo directo de `< 100` líneas.
  - Todo loop `requestAnimationFrame` gráfico **DEBE** suspenderse automáticamente cuando el canvas sale del viewport (`IntersectionObserver`) o la pestaña pasa a segundo plano (`document.visibilityState === 'hidden'`), y limitar la resolución interna a `Math.min(window.devicePixelRatio, 2)`.
- **Escenas 3D reales, iluminación PBR, sombras físicas y post-procesado:**
  - Elegir **`three@0.187+`** utilizando **`WebGPURenderer`** (con fallback transparente automático a WebGL2) y escribir los shaders en **TSL (`Three.js Shading Language`)** en JavaScript/TypeScript, generando código WGSL para WebGPU y GLSL para WebGL2 desde una única fuente tipada.
  - Sustituir `Clock` obsoleto por **`Timer`** y `sRGBEncoding` por `SRGBColorSpace` + tonos cinematográficos `AgXToneMapping` / `NeutralToneMapping`.

```javascript
// Ciclo de vida limpio de canvas GPU con pausa automática por visibilidad y viewport
export function mountPauseAwareRenderLoop(canvas, renderFrame) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let rafId = 0;
  let isVisible = false;

  const stop = () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
  };

  const tick = (now) => {
    if (!isVisible || document.hidden || reducedMotion.matches) {
      stop();
      return;
    }
    renderFrame(now);
    rafId = requestAnimationFrame(tick);
  };

  const start = () => {
    if (!rafId && isVisible && !document.hidden) {
      if (reducedMotion.matches) renderFrame(0);
      else rafId = requestAnimationFrame(tick);
    }
  };

  const io = new IntersectionObserver((entries) => {
    isVisible = Boolean(entries[0]?.isIntersecting);
    if (isVisible) start();
    else stop();
  }, { rootMargin: '120px' });

  io.observe(canvas);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  return () => {
    stop();
    io.disconnect();
  };
}
```

---

## 3. Pipeline Industrial 3D: `@gltf-transform/cli` + `meshoptimizer` + `KTX2`

Un archivo `.glb` exportado sin compresión desde herramientas 3D o texturas PNG/JPEG estándar puede pesar `15–40 MB` en disco y saturar más de `200 MB` de VRAM GPU tras descomprimirse a RGBA crudo en el navegador.

### 3.1 Estándar Obligatorio de Optimización de Activos glTF 2.0
1. **Geometría y Animaciones con `meshoptimizer` (`EXT_meshopt_compression`):**
   - Preferir `meshoptimizer` frente a Draco cuando importa tanto el peso de descarga como la velocidad de arranque: su decodificador WASM pesa ~20 KB (frente a los cientos de KB de Draco), soporta compresión de keyframes de animación, reordena caché de vértices/overdraw GPU y descomprime a cientos de MB/s.
2. **Texturas Transcodificables GPU con `KTX2` (`KHR_texture_basisu`):**
   - A diferencia de PNG/WebP, un archivo **KTX2** se mantiene comprimido directamente en la memoria VRAM de la tarjeta gráfica (`BC7` en desktop, `ASTC`/`ETC2` en móvil):
     - **Mapas `normal`, `occlusionRoughnessMetallic` y datos lineales:** comprimir con perfil **`UASTC`** de alta precisión (`uastc --zstd`).
     - **Mapas `baseColor` / `emissive`:** comprimir con perfil **`ETC1S`** para compresión extrema (`-80%` a `-90%` peso total).
3. **Deduplicación, Cuantización y Empaquetado:** Ejecutar la secuencia canónica antes de mover un modelo a `public/models/` o R2:

```powershell
# Pipeline reproducible con @gltf-transform/cli + meshoptimizer + KTX-Software
npx @gltf-transform/cli optimize input.glb dist-model.glb `
  --compress meshopt `
  --texture-compress ktx2 `
  --texture-size 1024 `
  --simplify 0.85
```

En Three.js, conectar siempre el `KTX2Loader` (con worker WASM transcoder local en `public/basis/`, sin depender de CDNs externos bloqueados por CSP) y `MeshoptDecoder` alojado en `'self'`.

---

## 4. Libros Abiertos y Referencias Técnicas Verificadas

- **The Book of Shaders (Patricio Gonzalez Vivo & Jen Lowe):** Libro gratuito interactivo sobre matemáticas de fragment shaders, shaping functions, matrices de transformación, ruido procedural y Signed Distance Fields (`thebookofshaders.com`).
- **Discover three.js (Lewy Blue):** Guía estructural gratuita sobre arquitectura de escena, PBR física, gestión de memoria GPU (`dispose()`) y ciclo de renderizado óptimo (`discoverthreejs.com`).
