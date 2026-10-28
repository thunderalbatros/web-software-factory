---
id: "network-fetch-abort-timeout-guard"
category: "resilience_pattern"
confidence: 0.99
valid_from: "2026-10-25T00:00:00.000Z"
valid_until: null
superseded_by: null
status: "ACTIVE"
---

# Instinct: Mandatory AbortSignal.timeout on External API Calls

> **Fact:** Every remote fetch must include AbortSignal.timeout(3500) to prevent hung sockets.  
> **Confidence:** 99%  
> **Source / Evidence:** tools/intelligence/serper_researcher.mjs, tools/intelligence/qdrant_rag.mjs

## Rule & Heuristic
External API services can hang indefinitely. Every remote fetch must have an explicit timeout between 2,500ms and 3,500ms.

## Operational Pattern
```javascript
const res = await fetch(url, { signal: AbortSignal.timeout(3500) });
```

## Anti-Pattern
Calling fetch() on external services without an AbortSignal timeout.
