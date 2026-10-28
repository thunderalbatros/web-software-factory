---
name: threejs-r186-tsl-and-gsap-free
description: Reglas técnicas anti-deprecación 2026 para Three.js r183-r186 (WebGPURenderer, TSL, Timer, RenderPipeline, SunLight), Spark 2.x 3D Gaussian Splatting, Dioramas HDR y GSAP Club Free (SplitText autoSplit, ScrollTrigger, Flip, MorphSVG).
---

# Three.js r186 (WebGPU + TSL), Spark 3DGS, Dioramas HDR & GSAP 2026 — Guía Anti-Deprecación

## 1. Reglas Estrictas Three.js `r183–r186` (Septiembre 2026 & `llms.txt`)

1. **Motor Dual WebGPU + WebGL 2 (`WebGPURenderer` & TSL):**
   - Importar siempre desde `three/webgpu` y `three/tsl`.
   - `WebGPURenderer` selecciona WebGPU de forma nativa y hace fallback automático a WebGL 2 sin reescribir materiales cuando se usa **TSL (Three Shading Language)** (`Fn`, `uniform`, `uv`, `positionLocal`, `color`, `mix`).
   - Precompilar compute shaders antes del primer frame interactivo usando `await renderer.compileComputeAsync(computeNode)` para eliminar tirones de fotogramas (shader stutter).

2. **APIs Eliminadas / Deprecadas en 2026 (PROHIBIDO USAR):**
   - ❌ **Prohibido `new THREE.Clock()`** $\rightarrow$ ✅ **Usar `new THREE.Timer()`**: llamar `timer.update(timestamp)` en el loop y leer `timer.getDelta()` y `timer.getElapsed()`. `Timer` evita saltos bruscos de delta cuando la pestaña pierde foco.
   - ❌ **Prohibido `PostProcessing` / `EffectComposer` antiguo** $\rightarrow$ ✅ **Usar `new THREE.RenderPipeline(renderer)`** (o `PostProcessing` nodo TSL unificado de `three/webgpu` según `r186` `RenderPipeline`) encadenando `pass(scene, camera)` con `AgXToneMapping` y `mip-chain bloom`.
   - ❌ **Prohibido `THREE.PCFSoftShadowMap`** (eliminado) $\rightarrow$ ✅ **Usar `THREE.PCFShadowMap`** o `SunLight` / `CSMShadowNode` (Cascaded Shadow Maps en TSL).
   - ❌ **Prohibido `encoding = sRGBEncoding`** $\rightarrow$ ✅ **Usar `colorSpace = THREE.SRGBColorSpace`** y `renderer.toneMapping = THREE.AgXToneMapping`.

```javascript
import * as THREE from 'three/webgpu';
import { pass, bloom } from 'three/tsl';

const renderer = new THREE.WebGPURenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.toneMapping = THREE.AgXToneMapping;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

const timer = new THREE.Timer();
const renderPipeline = new THREE.RenderPipeline(renderer);
const scenePass = pass(scene, camera);
renderPipeline.outputNode = scenePass.add(bloom(scenePass, 0.35, 0.4, 0.85));
```

---

## 2. Arquitectura HDR (`blendi-remade/dioramas`) y 3D Gaussian Splatting (`sparkjsdev/spark` 2.x)

1. **Iluminación Cinematográfica (`dioramas`):**
   - Combinar `AgX tone mapping` con oclusión ambiental en espacio de pantalla (`N8AO` / `GTAONode`), `mip-chain bloom` selectivo por umbral de luminancia y reflectores volumétricos sobre planos de suelo con rugosidad modulada.
   - Optimizar todos los activos `.glb` con `glTF-Transform` + `meshoptimizer` (`prune`, `dedup`, `resample`, `meshopt` compression y texturas `webp`/`ktx2`) reduciendo el tamaño entre **70% y 85%**.
2. **3D Gaussian Splatting (`sparkjsdev/spark` 2.x):**
   - Usar formatos comprimidos `.SPZ` o `.RAD` con árbol de Nivel de Detalle (`LoD Splat Tree`).
   - Aplicar presupuesto adaptativo estricto: `maxSplats: 500_000` en dispositivos móviles y `maxSplats: 2_000_000` en desktop para sostener 60 FPS constantes.

---

## 3. Reglas GSAP 2026 (Plugins Club Gratuitos — `SplitText`, `ScrollTrigger`, `Flip`, `MorphSVG`)

1. **`SplitText.create()` Responsivo y Accesible:**
   - Usar siempre `tag: "span"`, `autoSplit: true` (recalcula las líneas automáticamente tras `document.fonts.ready` y en `resize` sin romper el layout), `mask: "lines"` para reveals limpios sin overflow y `aria: "auto"` para conservar lectura íntegra en lectores de pantalla:
   ```javascript
   const split = SplitText.create('.hero-headline', {
     type: 'lines,words',
     tag: 'span',
     autoSplit: true,
     mask: 'lines',
     aria: 'auto',
     onSplit(self) {
       return gsap.from(self.lines, {
         yPercent: 105,
         autoAlpha: 0,
         duration: 0.75,
         stagger: 0.06,
         ease: 'power3.out'
       });
     }
   });
   ```
2. **Prevención de Elementos Invisibles y Limpieza Accesible:**
   - **Jamás** combinar `clearProps: "all"` con reglas CSS estáticas `opacity: 0`. Usar siempre `gsap.from()` con `autoAlpha: 0` (que gestiona `opacity` + `visibility: hidden`).
   - Envolver toda coreografía en `gsap.matchMedia()` respetando `(prefers-reduced-motion: no-preference)` y limpiando contextos al desmontar.
