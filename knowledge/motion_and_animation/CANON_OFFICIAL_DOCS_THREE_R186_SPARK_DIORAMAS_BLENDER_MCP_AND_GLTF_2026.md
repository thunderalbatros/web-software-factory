# CANON OFFICIAL DOCS: Three.js r186 WebGPU/TSL, Spark 2.x 3DGS, Dioramas HDR, Blender-MCP & glTF-Transform (2026)

> **Epistemic Tier:** `TIER_1_SOTA_2026` (Authority Boost: `x1.35`)  
> **Source Vault:** `C:\Users\tomas\Desktop\streamerbot\references\sota-2026\webgpu-3d-2026\`  
> **Zero-Fluff Mandate:** Atomic configuration syntax, anti-deprecation contracts, and production signatures only.

---

## 1. Local Vault Verification Summary (`webgpu-3d-2026`)

| Repository | Vault Status | Harvested Spec Files | Extracted Official Sections |
| :--- | :--- | :--- | :--- |
| `dioramas` | VERIFIED_ON_DISK | `README.md, docs/ENGINE.md, package.json` | Dioramas • The framework • 1. Asset pipeline — prompt → image → 3D model |
| `spark` | VERIFIED_ON_DISK | `README.md, package.json` | Features • Getting Started • Copy Code |
| `webgpu-vfx` | VERIFIED_ON_DISK | `README.md, package.json` | webgpu-vfx • Why this exists • Why the GPU matters here |
| `TypeGPU` | VERIFIED_ON_DISK | `README.md, package.json` | Core 3D/WebGPU Spec |
| `glTF-Transform` | VERIFIED_ON_DISK | `README.md, package.json` | glTF Transform • Introduction • Scripting API |
| `meshoptimizer` | VERIFIED_ON_DISK | `README.md` | Purpose • Installing • Building |
| `openshaders` | VERIFIED_ON_DISK | `README.md` | A home for shaders • Coming soon • What we're building |
| `Animator` | VERIFIED_ON_DISK | `README.md, package.json` | Animator — 3D Model Animation Studio • Why Animator? |
| `blender-mcp` | VERIFIED_ON_DISK | `README.md, pyproject.toml` | MCP for Blender • Quickstart • macOS |

---

## 2. Three.js `r183–r186` Anti-Deprecation & `WebGPURenderer` + `TSL` Standard

### 2.1 Mandatory Replacements (Zero Legacy Tolerance)
- **FORBIDDEN:** `new THREE.Clock()` -> **MANDATORY:** `new THREE.Timer()` calling `timer.update(timestamp)` and `timer.getDelta()`.
- **FORBIDDEN:** `EffectComposer` / `UnrealBloomPass` on WebGPU -> **MANDATORY:** `new THREE.RenderPipeline(renderer)` (or `PostProcessing`) with TSL `pass(scene, camera)` and `bloom(scenePassColor, strength, radius, threshold)`.
- **FORBIDDEN:** `THREE.PCFSoftShadowMap` (deprecated in r184+) -> **MANDATORY:** `THREE.PCFShadowMap` with `renderer.shadowMap.enabled = true`.
- **FORBIDDEN:** `THREE.ReinhardToneMapping` -> **MANDATORY:** `THREE.AgXToneMapping` (`renderer.toneMappingExposure = 1.05`).

### 2.2 Production `WebGPURenderer` + `TSL` Node Material Pattern
```javascript
import * as THREE from 'three/webgpu';
import { pass, bloom, color, uv, sin, time, mix } from 'three/tsl';

export async function createWebGpuR186Pipeline(canvasEl) {
  const renderer = new THREE.WebGPURenderer({ canvas: canvasEl, antialias: true, powerPreference: 'high-performance' });
  await renderer.init();
  renderer.toneMapping = THREE.AgXToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const timer = new THREE.Timer();
  const material = new THREE.MeshPhysicalNodeMaterial();
  material.colorNode = mix(color(0x0f172a), color(0x38bdf8), sin(uv().x.mul(6.28).add(time)).mul(0.5).add(0.5));
  material.roughness = 0.18;
  material.metalness = 0.85;

  return { renderer, timer, material };
}
```

---

## 3. `sparkjsdev/spark` 2.x — 3D Gaussian Splatting (`.spz`, `.rad`, `.ply` + `LoD Splat Tree`)

- **Supported Formats:** Compact `.spz` (preferred for Cloudflare Edge), `.rad` (chunked streaming LoD), and `.ply`.
- **Adaptive Splat Budget Contract:**
  - Mobile Viewports (`<= 768px`): `maxSplats: 500_000`, `lodBias: 1.25`.
  - Desktop Viewports (`>= 1024px`): `maxSplats: 2_000_000`, `lodBias: 1.0`.
- **Configuration Signature:**
```javascript
export function createSpark2SplatConfig({ isMobile = false, srcUrl = '/assets/scene.spz' } = {}) {
  return {
    engine: 'sparkjsdev/spark@2.x',
    url: srcUrl,
    lodSplatTree: true,
    maxSplats: isMobile ? 500_000 : 2_000_000,
    frustumCulling: true,
    sortWorkerOffthread: true
  };
}
```

---

## 4. `blendi-remade/dioramas` — HDR Studio Lighting, `N8AO` & Mip-Chain Bloom

- **Lighting Rig:** Equirectangular HDR environment map (`PMREMGenerator`) + 3-Point Area Light rig (Key `450W`, Fill `180W`, Rim `320W`).
- **Ambient Occlusion:** `N8AO` half-resolution pass (`aoRadius: 1.2`, `distanceFalloff: 1.0`, `intensity: 1.5`).
- **Camera Choreography:** Scroll-driven cubic damping (`dampingFactor = 0.06`) paired with `IntersectionObserver` offscreen pause (`GPU_FPS_WATCHDOG_SCRIPT`).

---

## 5. `ahujasid/blender-mcp` — Headless Python (`bpy`) Parametric Geometry & PBR Export

- **Role Assignment:** Restricted to `motion-engineer` and `ux-designer` (Wave 2 Builders) in `.agents/mcp/mcp_role_registry.json`.
- **Headless Invocation:** `blender --background --python script.py`
- **Canonical `bpy` Export Contract:**
  - Set `bpy.context.scene.render.fps = 60` and `view_transform = 'AgX'`.
  - Use `Principled BSDF` v2 inputs (`Base Color`, `Metallic`, `Roughness`).
  - Export via `bpy.ops.export_scene.gltf(filepath=out_path, export_format='GLB', export_apply=True, export_yup=True)`.

---

## 6. `@gltf-transform/core` + `meshoptimizer v1.3` Compression Pipeline (`70%–85%` Reduction)

- **Mandatory 5-Stage Pipeline (`optimizeGlbAsset`):**
  1. `prune()`: Removes unused nodes, materials, accessors, and animations.
  2. `dedup()`: Merges duplicate vertex buffers and textures.
  3. `resample()`: Optimizes keyframe animation curves.
  4. `meshopt({ encoder: MeshoptEncoder, level: 'medium' })`: Quantizes vertex positions, normals, and UVs (`EXT_meshopt_compression`).
  5. `textureCompress({ targetFormat: 'webp', resize: [1024, 1024] })`: Converts diffuse/normal/ORM maps to WebP.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_EMIL_KOWALSKI_ANIMATIONS_ON_THE_WEB]] · [[CANON_2D_3D_GRAPHICS_SHADERS_AND_AESTHETICS_2026]] · [[CANON_HOLO_SHADERS_3D_PACK_CHOREOGRAPHY_AND_WEBAUDIO_SFX_2026]] · [[CANON_ANIMATION_PRINCIPLES_ILLUSION_OF_LIFE_DISNEY]] · #motion_and_animation
