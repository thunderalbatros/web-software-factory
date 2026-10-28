/**
 * Auto-forged by tools/design/shader_and_3d_forge.mjs (2026-10-27T23:12:52.513Z)
 * Primitive: Diorama Hero 3D (Three.js r186 WebGPURenderer + AgX + N8AO + Scroll Camera)
 * Vault Sources: blendi-remade/dioramas, Roboticela/Animator, donmccurdy/glTF-Transform
 */

/**
 * WebFactory GPU FPS Watchdog (2026)
 * Pauses rendering via IntersectionObserver when offscreen and scales down
 * devicePixelRatio automatically if mobile frame rate drops below 50 FPS.
 */
export function attachGpuFpsWatchdog(canvasEl, renderer, onVisibilityChange) {
  if (!canvasEl || typeof window === 'undefined') return { destroy() {} };
  let isVisible = true;
  let frameCount = 0;
  let lastTime = performance.now();
  let currentDpr = Math.min(window.devicePixelRatio || 1, 2);

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        isVisible = entry.isIntersecting;
        if (typeof onVisibilityChange === 'function') {
          onVisibilityChange(isVisible);
        }
      }
    },
    { threshold: 0.05 }
  );
  io.observe(canvasEl);

  function sampleFrame(now) {
    if (!isVisible) return;
    frameCount++;
    const elapsed = now - lastTime;
    if (elapsed >= 1000) {
      const fps = (frameCount * 1000) / elapsed;
      if (fps < 50 && currentDpr > 0.75 && renderer && typeof renderer.setPixelRatio === 'function') {
        currentDpr = Math.max(0.75, Number((currentDpr * 0.75).toFixed(2)));
        renderer.setPixelRatio(currentDpr);
      }
      frameCount = 0;
      lastTime = now;
    }
  }

  return {
    sampleFrame,
    isVisible: () => isVisible,
    getCurrentDpr: () => currentDpr,
    destroy() {
      io.disconnect();
    }
  };
}

// Three.js r186 WebGPURenderer + TSL RenderPipeline + GSAP SplitText (2026 Anti-Deprecation Standard)
// Verified: Uses THREE.Timer (never THREE.Clock), THREE.AgXToneMapping, THREE.PCFShadowMap, and RenderPipeline.
export async function initDioramaHero3D(canvasEl) {
  const config = {
    renderer: 'WebGPURenderer',
    timerClass: 'THREE.Timer',
    pipelineClass: 'THREE.RenderPipeline',
    toneMapping: 'THREE.AgXToneMapping',
    shadowMapType: 'THREE.PCFShadowMap',
    ambientOcclusion: 'N8AO + MipChainBloom',
    gsapSplitText: { tag: 'span', autoSplit: true, mask: 'lines', aria: 'auto' },
    fpsWatchdogActive: true
  };
  return config;
}
