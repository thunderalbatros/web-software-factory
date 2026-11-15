# Technical Implementation Plan: Academia Ia Core Web Experience

> **Project:** `academia-ia` | **Architecture Tier:** Astro 7.4 Static + Cloudflare Workers Static Assets ($0 Server)

## 1. Data & API Contracts
- **Storage Keys:** `academia-ia_academia-ia-core-web-experience_state`
- **Event Bus:** `academia-ia:academia-ia-core-web-experience-event`
- **Endpoints:** `/api/academia-ia-core-web-experience/state`, `/api/academia-ia-core-web-experience/action`

## 2. Security & Quality Invariants
- Untrusted input rendered strictly via textContent or escaped template literals.
- Zero eval() or new Function() calls.
- All remote network calls protected by AbortSignal.timeout(2500-3500ms).

## 3. Verification Harness
- Gate Command: `node tools/factory.mjs gate --project academia-ia`
- Viewports: `1440px, 768px, 390px`
