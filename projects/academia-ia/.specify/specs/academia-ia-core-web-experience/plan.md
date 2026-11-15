# Technical Implementation Plan: Academia Ia Core Web Experience

> **Project:** `academia-ia` | **Architecture Tier:** Astro 7.4.11 Static + Cloudflare Workers Static Assets ($0.00 USD Server)

## 1. Data & API Contracts
- **Storage Keys:** `academia_ia_theme_v1`, `academia_ia_progress_v1`, `academia_ia_xp_v1`
- **Event Bus:** `MessageChannel (1:1 sandbox="allow-scripts")`
- **Endpoints:** `None (100% Static MPA — 0 Worker endpoints)`

## 2. Security & Quality Invariants
- Trusted Types enforced: default.createHTML throws TypeError; dynamic HTML sanitized via DOMPurify (RETURN_TRUSTED_TYPE: true) or safe DOM APIs.
- Zero eval() or new Function() calls; strict CSP generated deterministically from src/lib/csp-builder.mjs.
- Sandboxed tutor communicates over dedicated 1:1 MessageChannel validated with Valibot (0 backend endpoints).

## 3. Verification Harness
- Gate Command: `node tools/factory.mjs gate --project academia-ia`
- Viewports: `1440px, 768px, 390px`
