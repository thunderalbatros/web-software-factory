---
title: "CANON DOMAIN MASTERY: Diseño de Módulos Profundos e Invariantes (MIT 6.102 + John Ousterhout A Philosophy of Software Design) (2026)"
category: "architecture_and_books"
epistemicTier: "TIER_1_SOTA_2026"
authorityBoost: 1.35
courseId: "mit-6-102-ousterhout-deep-modules"
linkedHarnessModule: "tools/intelligence/ast_guard.mjs"
---

# CANON DOMAIN MASTERY: Diseño de Módulos Profundos e Invariantes (MIT 6.102 + John Ousterhout A Philosophy of Software Design)

> **Institución / Fuente:** MIT 6.102 & Stanford University (Prof. John Ousterhout)  
> **URLs Oficiales:** `https://web.mit.edu/6.102/www/` • `https://www.youtube.com/watch?v=bmSAYlu0NcY`  
> **Epistemic Tier:** `TIER_1_SOTA_2026` (`Authority Boost: x1.35`)  
> **Alcance:** Deep vs. Shallow Modules, Representation Invariants (checkRep), Abstraction Functions AF(r), Eradication of Shotgun Surgery & Pass-Through Methods  
> **Módulo del Harness Acoplado:** `tools/intelligence/ast_guard.mjs`

---

## 1. Tópicos Nucleares Cosechados

- **Deep vs. Shallow Modules**
- **Representation Invariants (checkRep)**
- **Abstraction Functions AF(r)**
- **Eradication of Shotgun Surgery & Pass-Through Methods**

---

## 2. Reglas Arquitectónicas Deterministas (SOTA 2026)

1. Favor Deep Modules (narrow, simple interface hiding substantial implementation complexity) over Shallow Modules (classitis, pass-through methods, and temporal decomposition).
2. Define errors out of existence where possible and enforce explicit Representation Invariants (`checkRep()`) at module boundaries.
3. Eliminate Information Leakage and Shotgun Surgery: if a single schema or token change requires editing 5+ files, consolidate the shared abstraction into a single deep module.

---

## 3. Patrón de Producción Verificado

```
// MIT 6.102 + Ousterhout Deep Module with Representation Invariant (checkRep)
export class MonetaryLedgerModule {
  #balanceMinorUnits = 0n;
  #checkRep() {
    if (typeof this.#balanceMinorUnits !== 'bigint' || this.#balanceMinorUnits < 0n) {
      throw new Error('REP_INVARIANT_VIOLATION: Balance must be a non-negative BigInt in minor units.');
    }
  }
  creditMinorUnits(amountCents) {
    this.#balanceMinorUnits += BigInt(amountCents);
    this.#checkRep();
    return this.#balanceMinorUnits;
  }
}
```
