# Technical Implementation Plan: Agencia Alfa Core Web Experience

> **Project:** `agencia-alfa` | **Architecture Tier:** Vanilla JS/CSS + Cloudflare Workers Static Assets

## 1. Data & API Contracts
- **Storage Keys:** `agencia-alfa_agencia-alfa-core-web-experience_state`
- **Event Bus:** `agencia-alfa:agencia-alfa-core-web-experience-event`
- **Endpoints:** `/api/agencia-alfa-core-web-experience/state`, `/api/agencia-alfa-core-web-experience/action`

## 2. Security & Quality Invariants
- Untrusted input rendered strictly via textContent or escaped template literals.
- Zero eval() or new Function() calls.
- All remote network calls protected by AbortSignal.timeout(2500-3500ms).

## 3. Verification Harness
- Gate Command: `node tools/factory.mjs gate --project agencia-alfa`
- Viewports: `1440px, 768px, 390px`
