---
id: "mock-server-api-catchall"
category: "architectural_decision"
confidence: 0.96
valid_from: "2026-10-25T00:00:00.000Z"
valid_until: null
superseded_by: null
status: "ACTIVE"
---

# Instinct: Catch-All 200 OK JSON Fallback for Local API Testing

> **Fact:** Local simulation servers must return a 200 OK JSON fallback for /api/* during headless Playwright visual audits.  
> **Confidence:** 96%  
> **Source / Evidence:** tools/serve_site.mjs, tools/audit/visual_audit.mjs

## Rule & Heuristic
Headless Playwright audits capture all 404 network failures as console errors. Local simulation servers must implement a catch-all 200 OK JSON fallback for /api/*.

## Operational Pattern
```javascript
if (cleanUrl.startsWith('/api/')) { res.writeHead(200); res.end('{"ok":true}'); return; }
```

## Anti-Pattern
Allowing mock servers to return raw 404 HTML for unconfigured REST routes.
