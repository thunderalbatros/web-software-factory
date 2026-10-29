---
title: "CANON: Atomic PBR Filament Physics, 3D Cinematography & 60FPS Fluid Motion (2026)"
tier: "TIER_1_SOTA_2026"
domain: "motion_and_animation"
sources:
  - "Google Filament — Physically Based Rendering (PBR) Material & Lighting Spec"
  - "Brent Burley (Walt Disney Animation Studios) — Physically-Based Shading at Disney (BRDF)"
  - "Bruno Simon (Three.js Journey) & blendi-remade/dioramas — Studio Camera Lenses & 3-Point Lighting"
  - "Apple WWDC — Designing Fluid Interfaces (Damped Harmonic Oscillator Spring Physics)"
updatedAt: "2026-10-28"
---

# CANON: Atomic PBR Filament Physics, 3D Cinematography & 60FPS Fluid Motion (2026)

## 1. Physically Based Rendering (Google Filament & Disney BRDF Public Specs)

- **Energy Conservation & Microfacet BRDF (Cook-Torrance GGX + Smith Height-Correlated Masking):**
  - `metalness` $\in \{0.0, 1.0\}$: Binary physical truth (`0.0` pure dielectrics: glass, ceramic, stone, fabric, skin, paper; `1.0` pure conductors: gold, brushed aluminum, titanium, copper). Avoid non-physical intermediate values ($0.3\text{–}0.7$) unless modeling dusty oxidation patina.
  - **Perceptual Roughness ($r_{\text{perceptual}}$) Mapping ($\alpha = r_{\text{perceptual}}^2$):**

| Material Class | `metalness` | `roughness` | `ior` (Index of Refraction) | `transmission` / `clearcoat` |
|:---|:---|:---|:---|:---|
| **Polished Optical Glass / Crystal** | `0.0` | `0.08–0.15` | `1.50` ($F_0 = 0.04$) | `transmission: 0.95, thickness: 1.2` |
| **Anodized Brushed Metal / Gold Leaf** | `1.0` | `0.18–0.28` | N/A (complex conductor $F_0$) | `clearcoat: 0.25, clearcoatRoughness: 0.12` |
| **Matte Industrial Polymer / Ceramic** | `0.0` | `0.45–0.65` | `1.46` | `clearcoat: 0.10` |
| **Editorial Paper / Travertine Stone** | `0.0` | `0.85–0.96` | `1.48` | `transmission: 0.0, clearcoat: 0.0` |

---

## 2. 3D Cinematography, Camera Lenses & 3-Point Studio Lighting

| Industry Archetype | Camera Focal Length & `FOV` | Lighting Rig (Key / Fill / Rim) | Tone Mapping & Post-Processing |
|:---|:---|:---|:---|
| **E-Commerce / Luxury / Footwear / Jewelry** | **Telephoto Studio Lens (`FOV 28°–35°`)** — eliminates perspective distortion so product proportions remain exact | **Key:** $45^\circ$ azimuth, $35^\circ$ elevation, warm $5200\text{K}$ ($1.0\times$)<br>**Fill:** $-45^\circ$ azimuth, cool $6500\text{K}$ ($0.35\times$)<br>**Rim:** $165^\circ$ backlight ($1.20\times$) for silhouette separation | `THREE.AgXToneMapping`, `N8AO` contact shadow, neutral backdrop ($C < 0.02$) |
| **Architecture / Real Estate / Streamer HUD** | **Controlled Wide Angle (`FOV 50°–60°`)** — conveys spatial volume without fisheye edge warping | HDRI skybox dome + directional sun ($\text{elevation } 22^\circ$ golden hour) + volumetric depth fog (`FogExp2`) | `THREE.AgXToneMapping`, `MipChainBloom` (threshold $0.88$), Spark 2.x `.spz`/`.rad` LoD Splat Tree |
| **ERP / Fintech / Law Firm / Healthcare** | **2D Orthographic / Zero 3D (`allows3dEffects: false`)** | Zenithal CSS specular border (`border-top: 1px solid oklch(1 0 0 / 0.10)`) | Zero WebGL/WebGPU overhead; 100% CPU/GPU budget dedicated to instant DOM responsiveness |

---

## 3. Damped Harmonic Oscillator Spring Physics (Apple WWDC Fluid Interfaces)

- **Differential Equation:**
  $$m \ddot{x} + c \dot{x} + k x = 0, \quad \zeta = \frac{c}{2\sqrt{m k}}, \quad \omega_0 = \sqrt{\frac{k}{m}}$$
- **Industry Damping Ratio ($\zeta$) Mandate:**
  1. **Critically Damped ($\zeta = 1.0$, Zero Overshoot, `120ms–180ms`):**
     - **Assigned To:** `fintech-and-banking`, `enterprise-erp-database`, `law-firm-and-advisory`, `healthcare-and-clinic`.
     - **CSS Equivalent:** `cubic-bezier(0.22, 1, 0.36, 1)` (instant velocity pickup, zero elastic bounce).
  2. **Under-Damped Controlled ($\zeta \in [0.72, 0.85]$, Subtle Inertia, `280ms–450ms`):**
     - **Assigned To:** `ecommerce-conversion`, `streamer-and-gaming-creator`, `b2b-saas-platform`, `luxury-architecture-and-real-estate`.
     - **CSS Equivalent:** `linear(0, 0.3566 9.6%, 0.7852 21.1%, 1.0156 32.2%, 1.0468 53.6%, 1)` (single $<4\%$ settle, never cartoon bounce).

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_EMIL_KOWALSKI_ANIMATIONS_ON_THE_WEB]] · [[CANON_2D_3D_GRAPHICS_SHADERS_AND_AESTHETICS_2026]] · [[CANON_HOLO_SHADERS_3D_PACK_CHOREOGRAPHY_AND_WEBAUDIO_SFX_2026]] · [[CANON_ANIMATION_PRINCIPLES_ILLUSION_OF_LIFE_DISNEY]] · #motion_and_animation
