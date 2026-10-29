---
version: 2026.10.28
epistemic_tier: TIER_1_SOTA_2026
authority_boost: 1.35
stack_scope: "Astro 5 + Vanilla Edge + Cloudflare Workers Static Assets + D1/SQLite + Valibot + Oxc"
standards:
  - OWASP ASVS v5.0
  - OWASP Top 10:2025
  - OWASP AISVS v1.0
  - OWASP MCP Top 10:2025
  - OWASP Agentic ASI06
---

# CANON ATOMIC: OWASP ASVS v5.0, TOP 10:2025, AISVS v1.0 & EDGE D1/SQLITE DEFENSE (2026)

> **Epistemic Tier:** `TIER_1_SOTA_2026` (`authorityBoost: 1.35`) — Catálogo de requisitos atómicos de una sola línea verificables determinísticamente para **Astro 5 + Vanilla Edge + Cloudflare Workers Static Assets + D1/SQLite + Valibot + W3C DTCG 2025.10 OKLCH + Oxc**.

---

## 1. Autenticación, Sesiones y Criptografía (`OWASP ASVS v5.0`)

| ID Verificable | Dominio | Requisito Atómico Verificable (Single-Line Specification) | Verificador / Gate |
| :--- | :--- | :--- | :--- |
| `ASVS-5.0-AUTH-01` | Passkeys / OIDC / Argon2id | Exigir autenticación primaria con Passkeys (`WebAuthn`/`FIDO2`) u `OIDC` (`OAuth 2.1 PKCE`); si existen contraseñas, aplicar hashing obligatorio con `Argon2id` (`m>=19456, t>=2, p=1`) y bloqueo determinista del top 10.000 de contraseñas comunes. | `tools/security_gate.mjs` |
| `ASVS-5.0-AUTH-02` | Algoritmo JWT Asimétrico | Fijar explícitamente algoritmos asimétricos (`ES256` o `RS256`) en la verificación de JWT, rechazando de forma absoluta `alg=none` y secretos simétricos compartidos `HS256`. | `tools/security_gate.mjs` |
| `ASVS-5.0-AUTH-03` | Ciclo de Vida de Tokens y Cookies | Limitar el TTL de access tokens a `15–60 min`, emitir refresh tokens de un solo uso con detección de reuso e invalidación de familia, y fijar cookies con `Secure; HttpOnly; SameSite=Strict` (o `Lax`). | `worker/index.js` |
| `ASVS-5.0-CRYPTO-04` | CSPRNG WebCrypto | Generar todos los identificadores de sesión, nonces, desafíos PKCE y tokens anti-CSRF exclusivamente mediante `crypto.randomUUID()` o `crypto.getRandomValues()` del estándar WebCrypto. | `tools/security_gate.mjs` |

---

## 2. Autorización Anti-IDOR/BOLA (`OWASP A01:2025`) y Validación de Frontera (`Valibot`)

| ID Verificable | Dominio | Requisito Atómico Verificable (Single-Line Specification) | Verificador / Gate |
| :--- | :--- | :--- | :--- |
| `OWASP-A01-2025-BOLA-01` | Claves Opacas Anti-IDOR | Prohibir la exposición de claves primarias enteras autoincrementales en URLs o payloads de API (`/api/resource/123`), exigiendo identificadores opacos `UUIDv4` o `ULID` y validación explícita de propiedad (`owner_id` y `tenant_id`) en cada endpoint. | `tools/security_gate.mjs` |
| `OWASP-A01-2025-VALIBOT-02` | Validación Estricta Valibot | Validar todo input de frontera en el Worker con esquemas tipo `Valibot` forzando tipos primitivos, longitudes máximas por campo, tamaño máximo de body (`MAX_BODY_BYTES <= 65536`) y rechazo estricto de propiedades no declaradas (anti-*Mass Assignment*). | `worker/index.js` |
| `OWASP-A01-2025-TENANT-03` | Aislamiento de Sesión | Extraer el `tenant_id` y `user_id` exclusivamente del contexto de sesión verificado en el servidor (`verifyAuthSession`), ignorando cualquier identificador de organización enviado en el body o query string del cliente. | `worker/index.js` |

---

## 3. Cabeceras Fetch Metadata, Rate Limiting Multidimensional y Excepciones (`OWASP A10:2025`)

| ID Verificable | Dominio | Requisito Atómico Verificable (Single-Line Specification) | Verificador / Gate |
| :--- | :--- | :--- | :--- |
| `OWASP-EDGE-FETCH-01` | Cabeceras Fetch Metadata y CSP | Validar en el Cloudflare Worker las cabeceras `Sec-Fetch-Site` (`same-origin`, `same-site`, `none`), `Sec-Fetch-Mode` y `Sec-Fetch-Dest` en toda petición mutadora (`POST`/`PUT`/`DELETE`) junto con `Content-Security-Policy` Level 3 estricta (`frame-ancestors 'none'; object-src 'none'; base-uri 'self'`). | `tools/security_gate.mjs` |
| `OWASP-EDGE-RATELIMIT-02` | Rate Limiting Multidimensional | Aplicar límites de tasa en el Edge: máximo `5` intentos de login cada `15 min` por clave compuesta (`IP + usuario`), máximo `3` recuperaciones de clave por hora por email, y desafío ligero JS Proof-of-Work o Turnstile ante tráfico automatizado/scrapers. | `worker/index.js` |
| `OWASP-A10-2025-EXCEPTIONS-03` | Mitigación A10:2025 Cero Fugas | Prohibir la devolución de `err.stack`, *stack traces*, nombres de tablas SQL o cabeceras `Server`/`X-Powered-By` en respuestas HTTP, emitiendo códigos de error genéricos con tiempos de respuesta uniformes y `0` archivos `.map` (source maps) en producción. | `tools/security_gate.mjs` |

---

## 4. Defensa en Profundidad para Bases de Datos (`Cloudflare D1 / SQLite` y Edge)

| ID Verificable | Dominio | Requisito Atómico Verificable (Single-Line Specification) | Verificador / Gate |
| :--- | :--- | :--- | :--- |
| `EDGE-D1-DEFENSE-01` | Consultas 100% Parametrizadas | Ejecutar el 100% de las consultas SQL en Cloudflare D1 mediante *prepared statements* parametrizados (`.prepare("... ?1").bind(...)`) e inyectar `tenant_id` verificado por sesión en el wrapper de acceso a datos para aislamiento multi-tenant obligatorio. | `tools/audit/ast_guard.mjs` |
| `EDGE-D1-ZONING-02A` | Zona 1 Restringida (PII) | Cifrar a nivel de columna en la capa de aplicación todo atributo PII sensible usando `AES-256-GCM` (`crypto.subtle`) con *Envelope Encryption* (DEK por registro envuelta por KEK en Cloudflare Secrets) y rotación de claves cada `90 días`. | `tools/security_gate.mjs` |
| `EDGE-D1-ZONING-02B` | Zona 2 Confidencial (PCI) | Almacenar en la Zona Confidencial únicamente identificadores de suscripción e idempotencia y tokens opacos PCI DSS emitidos por el procesador (`Polar.sh`/`Stripe`/`MercadoPago`), manteniendo `0` PAN de tarjetas en D1/SQLite. | `worker/index.js` |
| `EDGE-D1-ZONING-02C` | Zona 3 Auditoría WORM | Persistir todos los eventos críticos de autenticación, autorización y cambios de privilegios en una tabla de auditoría inmutable *append-only* (`security_audit_worm_log`) sin permisos de `UPDATE` ni `DELETE` desde el runtime de aplicación. | `src/db/drizzle.schema.js` |

---

## 5. Blindaje MCP (`OWASP MCP Top 10`), Memoria Agéntica (`ASI06`) y CI/CD (`Zizmor`)

| ID Verificable | Dominio | Requisito Atómico Verificable (Single-Line Specification) | Verificador / Gate |
| :--- | :--- | :--- | :--- |
| `AISVS-MCP-01` | Esquemas MCP Cerrados | Declarar `"additionalProperties": false` en el `inputSchema` JSON de todas las herramientas del servidor MCP y rechazar en ejecución cualquier argumento no declarado. | `tools/mcp/mcp_omni_rag_server.mjs` |
| `AISVS-MCP-02` | Cabeceras y Trazas CSPRNG | Rechazar determinísticamente cabeceras o metadatos `x-mcp-header` no autorizados, generar identificadores de correlación con `crypto.randomUUID()` y sanitizar todo fragmento recuperado del RAG contra *Indirect Prompt Injection*. | `tools/mcp/mcp_omni_rag_server.mjs` |
| `AISVS-ASI06-03` | Agent Memory Guard (`ASI06`) | Validar con `validateAgentMemoryGuard` cada hecho o regla antes de persistir en `.agents/memory/temporal_ledger.json` o `EXPERIENCE.md`, bloqueando inyección de comandos, evasión de guardias y envenenamiento de contexto. | `tools/intelligence/memory_reflector.mjs` |
| `AISVS-MINIONS-04` | Techo de Reintentos Determinista | Limitar el bucle de auto-reparación (`Self-Healing Loop`) en `agent_squad.mjs` a un máximo duro de `2` rondas autónomas antes de escalar el incidente al CTO con estado `blocked` o `needs-info`. | `tools/orchestrator/agent_squad.mjs` |
| `OWASP-CICD-ZIZMOR-05` | GitHub Actions Hardening | Exigir `persist-credentials: false` en `actions/checkout`, prohibir `pull_request_target` y `secrets: inherit`, fijar `permissions: contents: write` y validar `security_gate.mjs` + `.agents/memory/held_in_regression_tasks.json`. | `.github/workflows/weekly_factory_evolution.yml` |

---

## Relaciones de Contexto
- [[CANON_CYBERSECURITY_DEVSECOPS_2026]]
- [[CYBERSECURITY_MASTER_PROTOCOL]]
- [[CANON_CLOUDFLARE_D1_WORKERS_PAID_FINOPS_AND_EDGE_OPTIMIZATION_2026]]
