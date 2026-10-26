---
name: pricing-and-onboarding-cro
description: Behavioral conversion optimization for SaaS/E-commerce pricing tables, hero value propositions, lead-capture forms, and user onboarding flows (Fogg B=MAP, Anchoring, Decoy Effect, Endowed Progress, Zero Confirm-Shaming). Distilled from references/sota-2026/growth-and-hitl/marketingskills.
---

# Pricing, Onboarding & Behavioral Conversion Architecture

## 1. Above-the-Fold 5-Second Clarity Test
- **`<h1>` Headline (`text-wrap: balance`):** State the concrete outcome + target persona without AI-slop buzzwords (*"Unlock seamless synergy"* is forbidden).
- **Primary Focal Trigger (`2%` OKLCH Budget):** Isolate `[data-cta="primary"]` visually using `--brand-cta` with action-oriented microcopy (e.g., *"Crear mi cuenta gratis — 0 USD"* instead of *"Enviar"*).

## 2. High-Converting Pricing Table Architecture
- **3-Tier Cognitive Structure (Hick's Law):** Limit pricing matrices to 3 clear tiers (*Starter*, *Pro — Recommended*, *Enterprise*), highlighting the middle/target tier with `.fx-border-beam` and an explicit social-proof badge.
- **Tabular Numerals & Billing Toggle:** Enforce `.tabular-nums` on all prices and savings percentages so Monthly/Annual toggles never cause horizontal layout shift (`CLS = 0.000`).

## 3. Frictionless Onboarding & Ethical Guardrails (`UIGuard`)
- **Endowed Progress Effect:** Start multi-step onboarding wizards with the first step pre-completed (`25% completado`) and minimize form fields (`<= 3` inputs on initial step).
- **Zero Dark Patterns:** Strictly forbid confirm-shaming copy, hidden fees, or trapped modals (`PopupNoClose`); every dialog must close on `Escape` and provide an explicit close button.
