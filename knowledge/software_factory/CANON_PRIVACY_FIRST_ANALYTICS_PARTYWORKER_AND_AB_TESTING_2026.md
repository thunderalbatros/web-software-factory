# CANON SOTA 2026: Analítica Web Privacy-First, Telemetría en Web Worker (`Partytown` Pattern) y Experimentación A/B

> **Dominio:** `software_factory` | **Alcance:** Medición de conversión (CRO), embudos y experimentos A/B con `0ms` de impacto en el hilo principal (`INP <= 50ms`) y sin banners invasivos de cookies de terceros.

---

## 1. El Problema de los Trackers Tradicionales en Core Web Vitals

Cargar scripts pesados de terceros (GTM, Meta Pixel, Hotjar) en el hilo principal bloquea el event loop durante `150ms–400ms`, degradando el **Interaction to Next Paint (INP)** y reduciendo las conversiones móviles.

## 2. Solución SOTA de la Fábrica (`telemetry-worker.js` + Edge Beacon)

1. **Ejecución en Web Worker Dedicado (`site/js/telemetry-worker.js`):**
   - El hilo principal solo envía un mensaje ligero `worker.postMessage({ type: 'track', name: 'cta.clicked', meta })` (`<0.05ms`).
   - El Web Worker agrupa los eventos en memoria y los despacha hacia `/api/telemetry` en el Cloudflare Worker con `AbortSignal.timeout(3000)`.
2. **Atribución Privacy-First Sin Cookies de Terceros:**
   - Registra `utm_source`, `utm_medium`, `utm_campaign`, `referrer`, viewport y variante de experimento A/B respetando al 100% GDPR / CCPA / Ley 25.326 sin requerir popups de cookies que arruinan la conversión inicial.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SPLE_ISO26550_AND_SOFTWARE_FACTORIES_ARCHITECTURE_2026]] · [[CANON_ASTRO5_CLOUDFLARE_WORKERS_AND_MODERN_WEB_TEMPLATES_2026]] · [[CANON_MULTI_BRAND_DESIGN_SYSTEMS_DTCG_STYLE_DICTIONARY_AND_ARCHETYPES_2026]] · [[CANON_SOTA_AGENT_TEAM_TOPOLOGY_AND_2026_WEB_STACK_AUDIT]] · #software_factory
