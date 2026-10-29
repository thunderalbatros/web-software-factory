---
title: "CANON DOMAIN MASTERY: Gráficos 3D por Computadora y Shaders WebGPU (CMU 15-462 Keenan Crane + WebGPU Fundamentals) (2026)"
category: "motion_and_animation"
epistemicTier: "TIER_1_SOTA_2026"
authorityBoost: 1.35
courseId: "cmu-15-462-keenan-crane-and-webgpu"
linkedHarnessModule: "tools/design/shader_and_3d_forge.mjs"
---

# CANON DOMAIN MASTERY: Gráficos 3D por Computadora y Shaders WebGPU (CMU 15-462 Keenan Crane + WebGPU Fundamentals)

> **Institución / Fuente:** Carnegie Mellon University (Prof. Keenan Crane) & WebGPU Fundamentals  
> **URLs Oficiales:** `https://15462.courses.cs.cmu.edu/` • `https://webgpufundamentals.org/`  
> **Epistemic Tier:** `TIER_1_SOTA_2026` (`Authority Boost: x1.35`)  
> **Alcance:** .glb Mesh Topology & Half-Edge Manifold Hygiene, Microfacet Cook-Torrance PBR BRDF, Signed Distance Fields (SDFs), WGSL / Three.js r186 TSL Shaders at 60 FPS  
> **Módulo del Harness Acoplado:** `tools/design/shader_and_3d_forge.mjs`

---

## 1. Tópicos Nucleares Cosechados

- **.glb Mesh Topology & Half-Edge Manifold Hygiene**
- **Microfacet Cook-Torrance PBR BRDF**
- **Signed Distance Fields (SDFs)**
- **WGSL / Three.js r186 TSL Shaders at 60 FPS**

---

## 2. Reglas Arquitectónicas Deterministas (SOTA 2026)

1. Ensure `.glb` meshes are 2-manifold, Draco/Meshopt compressed (`70–85%` reduction via `gltf_asset_pipeline.mjs`), and free of degenerate zero-area triangles.
2. Implement Cook-Torrance microfacet PBR lighting with GGX normal distribution, Smith geometry shadowing, Schlick Fresnel, and `THREE.AgXToneMapping` (`exposure = 1.05`).
3. Write compute and fragment shaders in WGSL / Three.js r186 TSL (`THREE.WebGPURenderer` + `THREE.Timer` + `THREE.RenderPipeline`), keeping frame time `< 16.6ms` (60 FPS).

---

## 3. Patrón de Producción Verificado

```
// CMU 15-462 + WebGPU WGSL / TSL Smooth Minimum SDF & Fresnel Rim
// k controls smooth blending radius between two SDF primitives d1, d2
fn sminCubic(d1: f32, d2: f32, k: f32) -> f32 {
  let h = max(k - abs(d1 - d2), 0.0) / k;
  return min(d1, d2) - h * h * h * k * (1.0 / 6.0);
}
```
