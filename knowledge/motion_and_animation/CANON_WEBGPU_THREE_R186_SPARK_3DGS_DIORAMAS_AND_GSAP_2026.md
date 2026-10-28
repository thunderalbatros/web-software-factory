---
title: "CANON WEBGPU, THREE.JS R186 (TSL), SPARK 3DGS, DIORAMAS HDR & GSAP CLUB FREE (2026)"
category: "motion_and_animation"
epistemicTier: "TIER_1_SOTA_2026"
authorityBoost: 1.35
verifiedDate: "2026-10-27"
---

# CANON_WEBGPU_THREE_R186_SPARK_3DGS_DIORAMAS_AND_GSAP_2026

> **Nivel Epistémico:** `TIER_1_SOTA_2026` (`authorityBoost: 1.35`) — Autoridad técnica absoluta para `motion-engineer` y `ux-designer`.
> **Fuentes Verificadas en Bóveda Local (`sota-2026/webgpu-3d-2026`):** `blendi-remade/dioramas`, `sparkjsdev/spark`, `tigerabrodi/webgpu-vfx`, `software-mansion/TypeGPU`, `donmccurdy/glTF-Transform`, `zeux/meshoptimizer` (v1.3), `openshaders/openshaders`, `Roboticela/Animator`.

---

## 1. Estándar Anti-Deprecación Three.js `r183–r186` (Septiembre–Octubre 2026)

1. **`WebGPURenderer` y TSL (Three Shading Language):**
   - Toda escena nueva debe instanciar `WebGPURenderer` desde `three/webgpu` con fallback automático a WebGL 2.
   - Los shaders personalizados se escriben en **TSL (`three/tsl`)** o mediante estructuras tipadas de **`TypeGPU`** para compilar de forma transparente tanto a WGSL (WebGPU) como a GLSL (WebGL 2).
   - Para sistemas de partículas en GPU (`webgpu-vfx`), invocar `await renderer.compileComputeAsync(computeNode)` durante la carga inicial para evitar micro-cortes en el primer frame.

2. **Tabla de Reemplazos Obligatorios en Three.js 2026:**
   | API Antigua / Eliminada | Reemplazo SOTA 2026 (`r183–r186`) | Motivo Técnico |
   |:---|:---|:---|
   | `THREE.Clock` | `THREE.Timer` (`timer.update(timestamp)`) | Evita saltos gigantes de `delta` cuando el usuario cambia de pestaña (`Page Visibility API`). |
   | `PostProcessing` / `EffectComposer` | `THREE.RenderPipeline(renderer)` + nodos TSL `pass()` | Pipeline de post-procesado basado en grafos de nodos con fusión automática de pasadas GPU. |
   | `THREE.PCFSoftShadowMap` | `THREE.PCFShadowMap` o `SunLight` con Cascaded Shadows | `PCFSoftShadowMap` fue eliminado; `PCFShadowMap` y `CSMShadowNode` proveen filtrado suave nativo. |
   | `LinearToneMapping` / `ReinhardToneMapping` | `THREE.AgXToneMapping` | Conserva la saturación cromática en altas luces (neones, reflectores HDR y bloom) sin quemar a blanco puro. |

---

## 2. Iluminación Cinematográfica HDR (`blendi-remade/dioramas`) y Compresión 3D (`glTF-Transform` + `meshoptimizer`)

1. **Receta de Iluminación `dioramas`:**
   - **Oclusión Ambiental:** `N8AO` / `GTAONode` de medio radio para contacto realista entre modelos `.glb` y el suelo sin hundir los FPS.
   - **Tone Mapping & Bloom:** `AgX tone mapping` combinado con `mip-chain bloom` de umbral alto (`threshold >= 0.82`) para que solo los acentos emisivos brillen sin empañar la tipografía.
   - **Metodología de Revisión GPU (`docs/ENGINE.md`):** Ningún canvas 3D puede reducir la legibilidad del texto superpuesto (APCA `Lc >= 75`) ni presentar píxeles completamente negros por falta de luz de relleno (`HemisphereLight` + `Environment` HDRI comprimido).

2. **Pipeline de Compresión `.GLB` (-70% a -85% de Peso):**
   - Antes de publicar en `dist/`, todo archivo `.glb` pasa por `optimizeGlbAsset` (`tools/design/shader_and_3d_forge.mjs`):
     1. `prune()` y `dedup()`: elimina nodos huérfanos, accesores duplicados y materiales redundantes.
     2. `resample()`: simplifica curvas de animación esquelética (`Roboticela/Animator`) sin pérdida visual.
     3. `meshopt` (`zeux/meshoptimizer` v1.3): cuantiza vértices, normales y coordenadas UV, aplicando filtros exponenciales/octaédricos para máxima compresión Brotli/Zstd en Cloudflare Edge.
     4. Texturas comprimidas a `WebP` / `KTX2` (`UASTC` para normales, `ETC1S` para difuso).

---

## 3. 3D Gaussian Splatting en Tiempo Real (`sparkjsdev/spark` 2.x)

- **Formatos Soportados:** `.spz`, `.rad` y `.ply` cuantizados con streaming progresivo y árbol jerárquico de Nivel de Detalle (`LoD Splat Tree`).
- **Presupuesto Estricto de Splats (`CONSTRAINTS.md`):**
  - **Móvil (`<= 768px`):** `maxSplats: 500_000` + reducción dinámica de `devicePixelRatio` si los FPS bajan de 50.
  - **Desktop (`>= 1024px`):** `maxSplats: 2_000_000` con ordenamiento radial en GPU.

---

## 4. GSAP 2026 (Plugins Club 100% Gratuitos: `SplitText`, `ScrollTrigger`, `Flip`, `MorphSVG`)

1. **`SplitText.create()` con `autoSplit: true` y `mask: "lines"`:**
   - Configura siempre `tag: "span"`, `autoSplit: true`, `mask: "lines"` y `aria: "auto"`.
   - `autoSplit: true` garantiza que cuando terminan de cargar las fuentes variables (`WOFF2`), las líneas se recalculen limpiamente sin cortar palabras.
2. **Higiene de Visibilidad (`autoAlpha`) y Accesibilidad (`gsap.matchMedia()`):**
   - Prohibido usar `clearProps: "all"` sobre elementos que tengan `opacity: 0` en su hoja CSS (provoca que desaparezcan al finalizar la animación).
   - Usar `gsap.from(targets, { autoAlpha: 0, y: 24 })` dentro de `gsap.matchMedia()` y pausar automáticamente cualquier loop cuando `IntersectionObserver` detecte que la sección salió de la vista.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_EMIL_KOWALSKI_ANIMATIONS_ON_THE_WEB]] · [[CANON_2D_3D_GRAPHICS_SHADERS_AND_AESTHETICS_2026]] · [[CANON_HOLO_SHADERS_3D_PACK_CHOREOGRAPHY_AND_WEBAUDIO_SFX_2026]] · [[CANON_ANIMATION_PRINCIPLES_ILLUSION_OF_LIFE_DISNEY]] · #motion_and_animation
