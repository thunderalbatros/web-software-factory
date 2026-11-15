# Feature Specification: Academia Ia Core Web Experience

> **Project:** `academia-ia` | **Slug:** `academia-ia-core-web-experience` | **Stack:** `astro-edge` | **Archetype:** `education` | **Created:** 2026-11-15T08:21:32.882Z

## 1. Problem Statement
Open-access static educational platform for Academia Ia (Surface Mode: Read, strict CSP + Trusted Types).

## 2. Target Personas
- Estudiantes Hispanohablantes
- Autodidactas y Profesionales
- Docentes e Investigadores

## 3. User Experience & Primary Flow
- **Flow:** Learner navigates MPA curriculum -> reads 65ch lesson, explores Pagefind index, and practices in isolated 1:1 MessageChannel sandbox with local browser progress.
- **Visual Theme:** OKLCH 90/8/2 Editorial Read Mode (65ch) + 3 Semantic Level Accents + WCAG 2.2 AA+
- **Error States:** Offline navigation served from lightweight MPA Service Worker cache (< 250 KB precache), Invalid user input rejected by Valibot schema validation, Sandboxed tutor MessageChannel schema mismatch rejected fail-closed

## 4. Acceptance Criteria
- [ ] Zero UI layout thrashing or horizontal overflow across 1440px, 768px, and 390px viewports.
- [ ] 100% WCAG 2.2 AA accessibility compliance (semantic landmarks <main>, <nav>, ARIA labels, APCA contrast).
- [ ] Zero inline executable <script> blocks or inline onclick handlers (strict CSP compliance).
- [ ] 100% static Read-mode architecture (0 backend Worker API endpoints, Trusted Types enforced, 1:1 MessageChannel tutor sandbox).
