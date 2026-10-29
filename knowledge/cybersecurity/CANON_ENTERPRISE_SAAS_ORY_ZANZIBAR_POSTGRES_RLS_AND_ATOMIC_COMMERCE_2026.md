# CANON: Enterprise Multi-Tenant SaaS, PostgreSQL RLS, Ory Kratos/Keto Zanzibar, Envelope Encryption & Atomic E-Commerce (2026)

> **Epistemic Tier:** `TIER_1_SOTA_2026`  
> **Domain:** Enterprise Cloud, Fintech Database Security, Zero-Trust Identity & High-Concurrency E-Commerce  
> **Modules:** `tools/db/dual_database_forge.mjs`, `tools/security/identity_and_commerce_guard.mjs`, `tools/intelligence/vertex_ai_bridge.mjs`

---

## 1. Dual Database Architecture (`edge-d1` vs. `enterprise-postgres`)

La fábrica selecciona de forma determinista el motor de persistencia según el atributo `dbTier` en `SPEC.md` o `factory.project.json`:

1. **`edge-d1` (Por defecto para Landings, Portfolios y Catálogos Ligeros):**
   - **Motor:** Cloudflare D1 (SQLite en el Edge) con costo `$0.00` y cero configuración de infraestructura.
   - **Invariante Anti-IDOR (`OWASP A01:2025`):** Todas las claves primarias públicas son identificadores opacos `UUIDv4` o `ULID` (`TEXT PRIMARY KEY CHECK (length(id) >= 26)`), prohibiendo `AUTOINCREMENT` en rutas expuestas.

2. **`enterprise-postgres` (Para SaaS Multi-Inquilino, Fintech, ERPs y E-Commerce de Alta Concurrencia):**
   - **Motor:** Serverless PostgreSQL v14+ conectado mediante **Cloudflare Hyperdrive** (pooling de conexiones en el Edge) y **Drizzle ORM**.
   - **4 Estratos de Defensa en Profundidad:**
     - **Aislamiento en el Motor (`Row-Level Security — RLS`):** Toda tabla multi-tenant incluye `tenant_id UUID NOT NULL`, `ALTER TABLE ... ENABLE ROW LEVEL SECURITY; ALTER TABLE ... FORCE ROW LEVEL SECURITY;` y la política `CREATE POLICY tenant_isolation_policy USING (tenant_id = current_setting('app.current_tenant_id')::uuid)`. Cada transacción fija `SET LOCAL app.current_tenant_id = $1`.
     - **Endurecimiento CIS Benchmark:** Autenticación `scram-sha-256`, transporte forzado `hostssl` con `TLSv1.3`, revocación de permisos en el esquema `public` al rol `PUBLIC` (`REVOKE ALL ON SCHEMA public FROM PUBLIC`), cuenta de aplicación `NOSUPERUSER`, consultas `100% parametrizadas` (`$1, $2` / `EXECUTE ... USING`) y funciones `SECURITY DEFINER` con `SET search_path` estático.
     - **Zonificación en 3 Áreas:**
       - `zone_restricted`: Datos personales (PII) cifrados a nivel de columna en la aplicación mediante `EnvelopeEncryptionEngine` (`AES-256-GCM`).
       - `zone_confidential`: Libro mayor transaccional, llaves de idempotencia y tokens opacos `PCI DSS v4.0` (bloqueando por `CHECK` el almacenamiento de números PAN de tarjetas de 13 a 19 dígitos).
       - `zone_audit_worm`: Tablas de auditoría inmutables *Write-Once-Read-Many (WORM)* con triggers que abortan cualquier `UPDATE` o `DELETE`, listas para `pgAudit` y `pgBackRest`.

---

## 2. Criptografía de Sobre (`EnvelopeEncryptionEngine` — `AES-256-GCM` + `GCP Cloud KMS`)

- Cada registro o columna sensible en `zone_restricted` se cifra en la capa de aplicación usando una **Data Encryption Key (`DEK`)** efímera de 256 bits con `AES-256-GCM` y vinculación de contexto (`AAD = zone_restricted:<tenant_id>:<column_name>`).
- La `DEK` efímera es envuelta (`wrap`) mediante la **Customer Master Key (`CMK`)** alojada en **Google Cloud KMS (HSM-backed)** a través de `vertex_ai_bridge.mjs` (con fallback determinista local WebCrypto `crypto.subtle` y rotación automática programada cada `90 días`).
- Antes de emitir logs o enviar trazas a modelos de IA, todo payload atraviesa el filtro ligero de detección y anonimización de entidades PII inspirado en `microsoft/presidio` (`anonymizePresidioPiiForLogsAndAi`).

---

## 3. Identidad Zero-Trust (`Ory Kratos / Keto Zanzibar`) y E-Commerce Atómico

1. **Autenticación API-First (`Ory Kratos` Pattern):**
   - Soporte nativo para **Passkeys (`WebAuthn` / `FIDO2`)** y hashing de contraseñas con `Argon2id` (`64 MB` RAM, 3 iteraciones, paralelismo 4).
   - Tokens JWT firmados exclusivamente con algoritmos asimétricos (`ES256` o `RS256`), rechazando de plano `alg: "none"` y algoritmos simétricos `HS256`.
   - Tiempo de vida (`TTL`) de `15 a 60 minutos`, rotación de *refresh tokens* de un solo uso y cookies `__Host-wf_session` con atributos `Secure; HttpOnly; SameSite=Strict`.
2. **Autorización Relacional (`Ory Keto / Google Zanzibar` Pattern):**
   - Evaluación de tuplas relacionales (`namespace:object#relation@subject`) exigiendo identificadores opacos `ULID` o `UUIDv4`.
3. **Motor E-Commerce Anti-Condiciones de Carrera:**
   - **Bloqueo Atómico por SKU (`AtomicDurableStockLock`):** Serializa las reservas de inventario por SKU estilo Cloudflare Durable Objects, garantizando `0` sobreventa ante ráfagas paralelas.
   - **Ledger Idempotente de Webhooks (`IdempotentWebhookLedger`):** Verifica firmas `HMAC-SHA256` en tiempo constante (`crypto.timingSafeEqual`), aplica una ventana anti-replay de `300 segundos` y deduplica eventos por `idempotencyKey`.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_CYBERSECURITY_DEVSECOPS_2026]] · [[CYBERSECURITY_MASTER_PROTOCOL]] · [[ANTI_BOT_STEALTH_GUIDE]] · [[CANON_IDENTITY_AND_OAUTH_CYBERSECURITY_AUDIT_2026]] · #cybersecurity
