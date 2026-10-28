---
id: "linear-ast-scanning-no-redos"
category: "performance_invariable"
confidence: 0.98
valid_from: "2026-10-25T00:00:00.000Z"
valid_until: null
superseded_by: null
status: "ACTIVE"
---

# Instinct: Linear Line-by-Line AST Scanning (Zero ReDoS)

> **Fact:** Parse class methods linearly with line splitting to guarantee <500ms AST scans without catastrophic regex backtracking.  
> **Confidence:** 98%  
> **Source / Evidence:** tools/intelligence/ast_guard.mjs scanClassMethods

## Rule & Heuristic
Nested regular expression quantifiers cause catastrophic backtracking. Parse class methods linearly with line splitting.

## Operational Pattern
```javascript
const lines = classBody.split('\n');
```

## Anti-Pattern
Using unbounded nested quantifier regexes across multiline class bodies.
