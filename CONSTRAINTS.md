# CONSTRAINTS.md — Web Software Factory Studio Immutable Quality & Operational Floors (2026)

> **Constitutional Lock Notice:** This file is cryptographically sealed via `SHA-256` in `.agents/memory/constitution_lock.json` and enforced by `tools/intelligence/constitution_guard.mjs`. Agents are strictly forbidden from lowering any numeric threshold below to pass tests (*Anti-Reward-Hacking Law*).

---

## 1. Financial & Licensing Floors (Non-Negotiable)
- **Total Studio Budget (`COST_USD_MAX`)**: `0.00 USD / 0.00 ARS` permanently.
- **Credit Card Requirement**: `FORBIDDEN` (`0` services requiring credit card).
- **Allowed Open-Source Licenses**: `MIT`, `Apache-2.0`, `BSD-2-Clause`, `BSD-3-Clause`, `ISC`, `CC0-1.0`, `OFL-1.1`.

## 2. Visual Craft, Accessibility & Ergonomic Floors (`RYUX v2.14.2` + `APCA`)
- **Perceptual Contrast (`APCA_BODY_MIN_LC`)**: `>= 75 Lc` for body copy, `>= 60 Lc` for UI controls and metadata.
- **Chromatic Budget (`CHROMATIC_RATIO`)**: `90%` neutral surfaces, `8%` secondary accents, `2%` focal conversion CTA in `OKLCH`.
- **Interactive Touch Target Minimum (`FITTS_TARGET_MIN_PX`)**: `>= 44x44 px` on mobile/tablet viewports.
- **Horizontal Overflow (`SCROLL_X_MAX_PX`)**: `0 px` across `1920x1080`, `1440x900`, `768x1024`, and `390x844`.

## 3. Performance, Core Web Vitals & Motion Floors (HP 250 G8 Friendly)
- **Frame Budget (`FRAME_BUDGET_MAX_MS`)**: `60 FPS` (`<= 16.6ms` per frame; composite-only GPU animations).
- **Largest Contentful Paint (`LCP_MAX_MS`)**: `<= 1800 ms` (`~0 ms` on internal navigations via `Speculation Rules API`).
- **Interaction to Next Paint (`INP_MAX_MS`)**: `<= 100 ms`.
- **Cumulative Layout Shift (`CLS_MAX`)**: `0.000`.
- **Cloudflare Production Payload (`DIST_MAX_MB`)**: `<= 50.0 MB` total in `dist/`.

## 4. Code Integrity, RAG & Visual PQC Floors (`eval_matrix.mjs`)
- **AST Missing Methods (`AST_MISSING_METHODS_MAX`)**: `0`.
- **AST Security Blockers (`AST_SECURITY_BLOCKERS_MAX`)**: `0`.
- **Omni-RAG v5 Hit@5 Recall (`RAG_HIT_AT_5_MIN_PCT`)**: `>= 95.0%` across all Golden Queries (`< 350ms` per query).
- **Ragas Context Precision@3 (`RAG_CONTEXT_PRECISION_MIN`)**: `>= 0.80`.
- **Visual Snapshot Diff Ratio (`VISUAL_MAX_DIFF_PIXEL_RATIO`)**: `<= 0.01` (`1.0%`) via `odiff-bin` SIMD with `animations: 'disabled'`.
- **Overall Eval Matrix Composite Score (`EVAL_COMPOSITE_MIN`)**: `>= 95.0 / 100.0` (`S+ Elite`).
