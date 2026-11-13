# Web Software Factory Studio (2026)

Standalone Multi-Project Web Software Factory powered by **ISO/IEC 26550 SPLE**, **9-Role Agent Topology**, **GitHub Spec-Kit SDD**, **Astro 5 / Vanilla-Edge**, **W3C DTCG OKLCH Tokens**, **RYUX v2.14.2**, and **Omni-RAG v5**.

## Architecture Overview
- **Multi-Project Engine (`projects/<slug>`)**: Scaffolds isolated edge sites from hardened `templates/astro-edge`, `templates/vanilla-edge`, and `templates/fullstack-saas-edge` baselines compiled for Cloudflare Workers Static Assets + D1/SQLite.
- **5-Gate QA & Constitutional Integrity**: Deterministic AST/Oxlint checks (`tools/intelligence/ast_guard.mjs`), SHA-256 Constitutional Guard (`tools/intelligence/constitution_guard.mjs`), RYUX visual/60-FPS audit (`tools/audit/ryux_design_gate.mjs`), Clean Code & AEO guards, and Chaos Monkey verification.
- **Asset & Edge Pipeline (`tools/build_dist.mjs`)**: Bundles CSS via LightningCSS into `/site/css/bundle.css`, applies deterministic SHA-256 content-hash cache busters (`?v=<hash8>`), gates non-critical Web Audio behind first interaction, and emits hardened Cloudflare `_headers` (`immutable` caching, Early Hints, narrowed CSP, `CORP`).

## Security & SOTA 2026 Guarantees
- **Edge Workers (OWASP ASVS v5.0 / Top 10:2025)**: Server-side Cloudflare Turnstile verification (`challenges.cloudflare.com/turnstile/v0/siteverify`), bounded in-memory / Edge Rate Limiter buckets, NFKC + zero-width normalization against bilingual prompt injection, strict Fetch Metadata + `Origin` hostname checks, opaque UUID/ULID enforcement, and fail-closed Slack HMAC-SHA256 webhooks with 300s anti-replay guards.
- **HITL & Local Server Hardening**: Cryptographic CTO approval token verification (`verifyCtoApprovalToken`) in CLI `--stage implement`, per-instance `X-Cockpit-Token` CSRF + strict localhost Origin enforcement in `tools/cockpit/factory_twin_server.mjs`, `FACTORY_ROOT` path containment in `tools/lib/project_loader.mjs`, and traversal/dotfile blocking in `tools/serve_site.mjs`.
- **Supply Chain & CI Hygiene**: SHA-pinned GitHub Actions with `fetch-depth: 1`, `persist-credentials: false`, workflow `concurrency` groups, Zizmor v1.30 compliance, header-based git authentication (`http.extraheader`), and pinned MCP package versions.

## Quick Start
```powershell
node tools/factory.mjs status
node tools/factory.mjs styles
node tools/factory.mjs new mi-sitio --stack astro-edge --archetype saas-b2b --style bento
node tools/factory.mjs spec "Hero Optimization" "Optimize LCP and OKLCH hierarchy" --project mi-sitio
node tools/factory.mjs build --project mi-sitio
node tools/factory.mjs gate --project mi-sitio
node tools/factory.mjs snapshot --project mi-sitio
node tools/factory.mjs visual-gate --project mi-sitio
```

## Verification & Testing
Run the unified factory regression and security suite:
```powershell
npm test
node tools/security_gate.mjs --fast
node tools/audit/workflow_security_linter.mjs
node tools/intelligence/constitution_guard.mjs
```

## License
Licensed under the [MIT License](LICENSE).
