---
title: "CANON DOMAIN MASTERY: Psicología de Conversión y Checkout UX (Baymard Institute & Laws of UX) (2026)"
category: "ui_ux_design"
epistemicTier: "TIER_1_SOTA_2026"
authorityBoost: 1.35
courseId: "baymard-and-laws-of-ux-checkout-cro"
linkedHarnessModule: "tools/design/industry_archetype_matrix.mjs"
---

# CANON DOMAIN MASTERY: Psicología de Conversión y Checkout UX (Baymard Institute & Laws of UX)

> **Institución / Fuente:** Baymard Institute & Jon Yablonski (Laws of UX)  
> **URLs Oficiales:** `https://baymard.com/blog` • `https://lawsofux.com/`  
> **Epistemic Tier:** `TIER_1_SOTA_2026` (`Authority Boost: x1.35`)  
> **Alcance:** Baymard E-Commerce Checkout Ergonomics, Cart Abandonment Prevention & Guest Checkout, Fitts Law, Hick Law, Doherty Threshold (<400ms) & Miller Law, Mobile Form Autocomplete & Inline Validation  
> **Módulo del Harness Acoplado:** `tools/design/industry_archetype_matrix.mjs`

---

## 1. Tópicos Nucleares Cosechados

- **Baymard E-Commerce Checkout Ergonomics**
- **Cart Abandonment Prevention & Guest Checkout**
- **Fitts Law, Hick Law, Doherty Threshold (<400ms) & Miller Law**
- **Mobile Form Autocomplete & Inline Validation**

---

## 2. Reglas Arquitectónicas Deterministas (SOTA 2026)

1. Always provide a prominent Guest Checkout path (never force account creation before checkout), reduce checkout fields to `<= 7` inputs, and display total order cost (including shipping/taxes) upfront.
2. Configure mobile-first HTML5 input ergonomics: explicit `autocomplete` tokens (`given-name`, `email`, `cc-number`, `postal-code`), `inputmode="numeric"` for credit cards/ZIP codes, and inline validation triggered `onBlur` (never premature error states while typing).
3. Enforce Fitts Law (`>= 48x48px` primary CTA in thumb zone), Hick Law (single primary CTA per viewport, max 3 pricing tiers with 1 highlighted decoy/recommended tier), and Doherty Threshold (`< 400ms` optimistic UI feedback).

---

## 3. Patrón de Producción Verificado

```
<!-- Baymard Institute High-Converting Mobile Checkout Field Pattern -->
<div class="field-group">
  <label for="checkout-card-number">Número de Tarjeta</label>
  <input id="checkout-card-number" name="cardNumber" type="text" inputmode="numeric"
         autocomplete="cc-number" pattern="[0-9\s]{13,19}" required aria-describedby="card-help" />
  <small id="card-help">Transacción cifrada de extremo a extremo (PCI DSS v4.0)</small>
</div>
```

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[DESIGN_MASTERY_2026]] · [[AGENT_CREATIVE_AND_VISUAL_AWARENESS_2026]] · [[CANON_REFACTORING_UI_WATHAN_SCHOGER]] · [[CANON_PRACTICAL_UI_ADHAM_DANNAWAY]] · #ui_ux_design
