---
id: "symbolic-method-aliasing"
category: "bug_fix"
confidence: 0.95
valid_from: "2026-10-25T00:00:00.000Z"
valid_until: null
superseded_by: null
status: "ACTIVE"
---

# Instinct: Method Renaming Aliases on Class Prototypes

> **Fact:** Provide prototype aliases when refactoring controller methods to prevent runtime exceptions.  
> **Confidence:** 95%  
> **Source / Evidence:** templates/vanilla-edge/site/js/app.js

## Rule & Heuristic
When refactoring methods in public client controllers, provide a prototype alias to prevent runtime PAGEERROR exceptions.

## Operational Pattern
```javascript
legacyMethod() { return this.newMethod(); }
```

## Anti-Pattern
Renaming methods without aliases in multi-view web applications.
