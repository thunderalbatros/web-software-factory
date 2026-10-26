# CANON: Optimización de Cloudflare D1, Workers Paid (USD 5/mes), FinOps Guardrails, Smart Placement y Cifrado en Reposo (2026)

**Alcance:** Aplicable a la arquitectura de borde en Cloudflare Workers (`worker/index.js`, `wrangler.toml`), base de datos serverless SQLite Cloudflare D1 (`WebFactory_production`), sincronización de baja latencia entre USA (OBS Studio Browser Sources en `overlay-*` y `wheel-*`) y Argentina (`#control-panel`, `#admin-hub`), clientes web en `site/js/`, y protección criptográfica de credenciales OAuth 2.1 en `kv_store`. Relacionado con [[CANON_OPEN_BOOKS_WEB_SECURITY_OWASP_AND_SQLITE_INTERNALS_2026]], [[CANON_QASIMHBTI_BOOKS_SQLITE_SCALABILITY_EDGE_CACHE_AND_ALGORITHMS_2026]], [[CANON_POEAA_FOWLER_GOOS_FREEMAN_C4_SIMON_BROWN_AND_FUNCTIONAL_CORE_2026]], [[CANON_CYBERSECURITY_DEVSECOPS_2026]] y [[CANON_AGENT_TOKEN_EFFICIENCY_ANTIGRAVITY_2026-10-24]].

---

## 1. Modelo de Cuotas y FinOps en Cloudflare Workers Paid (USD 5/mes, Estado 2026)

### 1.1 Matriz Oficial de Recursos Incluidos y Excedentes (*Overages*)
El plan **Cloudflare Workers Paid (USD 5/mes)** elimina los límites diarios estrictos del plan gratuito (`100k req/día` y `5M D1 rows_read/día` aplicados por Cloudflare desde el `2026-09-01`), reemplazándolos por cuotas mensuales con facturación por uso excedente `[VERIFICADO: developers.cloudflare.com/workers/platform/pricing/ & developers.cloudflare.com/d1/platform/pricing/, 2026-10-25]`:

| Recurso | Cuota Mensual Incluida (USD 5/mes) | Costo de Excedente (*Overage*) | Riesgo Principal en Suites de Streaming en Vivo |
|---------|------------------------------------|--------------------------------|-------------------------------------------------|
| **Workers HTTP Requests** | **10.000.000 peticiones / mes** | `+$0.30 USD` / millón adicional | **Alto** si hay *polling* agresivo (1–2s) en clientes de espectadores no-admin o pestañas ocultas. |
| **Workers CPU Time** | **30.000.000 ms de CPU / mes** | `+$0.02 USD` / millón de ms adicional | Bajo (el tiempo de espera de red en `fetch()` o `env.DB` **no** computa como CPU activa). |
| **D1 Rows Read (`rows_read`)** | **25.000.000.000 filas / mes** (25B) | `+$0.001 USD` / millón adicional | Medio en costo, **Crítico en latencia** si ocurren *Full Table Scans* sobre el primario monohilo. |
| **D1 Rows Written (`rows_written`)** | **50.000.000 filas / mes** (50M) | `+$1.00 USD` / millón adicional | Bajo si se agrupan mutaciones con `env.DB.batch()`. |
| **D1 Storage** | **5 GB** | `+$0.75 USD` / GB-mes adicional | Bajo con purga automática de retención a 90 días. |
| **Durable Objects (SQLite)** | **1M req + 400.000 GB-s / mes** | `+$0.15/M req` · `+$12.50/M GB-s` | Hibernation API reduce el cargo de duración a $0 mientras las conexiones WebSocket están ociosas. |
| **Egress / Ancho de Banda** | **Ilimitado ($0)** | **$0.00 USD** | Cero cargos por transferencia de datos. |

### 1.2 Ley de Protección del Techo de 10M Requests/Mes
Un sistema de overlays que sondea cada `1s` con 8 fuentes OBS genera:
$$\text{Requests}_{\text{OBS}} = 8 \times 86.400 = 691.200 \text{ req/día} \approx 20,7\text{M req/mes (si OBS queda abierto 24/7)}$$
Y si cada espectador en la web ejecuta un `setInterval(..., 2000)` no restringido por rol o visibilidad de pestaña (`document.hidden`), apenas 25 espectadores concurrentes durante 4 horas diarias agregan otros `~5,4M req/mes`.
- **Regla de Ingeniería:** Ningún controlador de administración (`AdminHubController`) debe ejecutar *polling* periódico en navegadores de espectadores no autenticados como administradores, y todo bucle de *polling* cliente debe suspenderse inmediatamente cuando `document.hidden === true` o cuando la vista activa (`window.location.hash`) no requiere estado en tiempo real.

---

## 2. Arquitectura Interna de Cloudflare D1, Planificador SQLite NGQP y `rows_read`

### 2.1 Semántica Exacta de `meta.rows_read`
En Cloudflare D1, `meta.rows_read` contabiliza **cada fila inspeccionada por el motor B-Tree de SQLite (`VDBE`)**, no la cantidad de filas devueltas al Worker `[VERIFICADO: developers.cloudflare.com/d1/observability/metrics-analytics/, 2026-10-25]`:
- Una consulta `SELECT COUNT(*) FROM users WHERE monthly_cycle != '2026-10' LIMIT 1` sin índice sobre `monthly_cycle` devuelve `0` filas cuando todos los usuarios están al día, pero **escanea el 100% de la tabla `users`**, sumando $N_{\text{users}}$ a `rows_read` en cada invocación.

### 2.2 La Regla del Prefijo Izquierdo en Índices Compuestos (*SQLite NGQP*)
De acuerdo con *SQL Performance Explained* (*Markus Winand*) y la documentación oficial del *Next-Generation Query Planner (NGQP)* de SQLite:
1. Un índice compuesto `CREATE INDEX idx_point_tx_user_created ON point_transactions(user_id, created_at DESC)` ordena el B-Tree primero por `user_id` y, dentro de cada `user_id`, por `created_at DESC`.
2. Por lo tanto, una sentencia de mantenimiento global como:
   ```sql
   DELETE FROM point_transactions WHERE created_at < ?1;
   ```
   **no puede utilizar `idx_point_tx_user_created`** porque omite la columna líder `user_id`. SQLite se ve forzado a realizar un *Full Table Scan* de toda la tabla `point_transactions`.
3. **Solución Canónica:** Crear índices monocolumna específicos para las columnas de corte temporal y ciclo:
   ```sql
   CREATE INDEX IF NOT EXISTS idx_point_tx_created_at ON point_transactions(created_at);
   CREATE INDEX IF NOT EXISTS idx_user_devices_last_seen ON user_devices(last_seen_at);
   CREATE INDEX IF NOT EXISTS idx_users_monthly_cycle ON users(monthly_cycle);
   ```
   Con estos índices, el `DELETE` de retención de 90 días pasa de complejidad $O(N_{\text{total}})$ a $O(K_{\text{expiradas}} \log N)$, leyendo `0` filas cuando no hay registros vencidos.

### 2.3 Patrón *Unit of Work* con `env.DB.batch()`
Cada llamada individual a `await env.DB.prepare(...).run()` implica un viaje de red (*round-trip*) desde el isolate del Worker hasta la instancia primaria de D1.
- Siguiendo el patrón *Unit of Work* (*Martin Fowler, PoEAA*) y la API nativa de D1:
  ```javascript
  const statements = [
    env.DB.prepare("INSERT INTO kv_store ...").bind(...),
    env.DB.prepare("INSERT INTO kv_store ...").bind(...)
  ];
  await env.DB.batch(statements);
  ```
- `env.DB.batch()` ejecuta todas las sentencias dentro de una **única transacción implícita SQLite** en un solo viaje de red, reduciendo la latencia de escritura hasta en un 70% y garantizando atomicidad Todo-o-Nada `[VERIFICADO: developers.cloudflare.com/d1/worker-api/d1-database/#batch, 2026-10-25]`.

---

## 3. Coalescing de Micro-TTL (`1.2s`), Smart Placement y D1 Sessions API

### 3.1 *Request Coalescing* en Memoria del Isolate + *Write-Through*
Cuando múltiples fuentes de navegador en OBS Studio (ubicadas en el mismo PoP de Cloudflare, por ejemplo `EWR` o `DFW` en EE. UU.) consultan `/api/sync/state` cada `850ms–1500ms`, caen en el mismo isolate de Cloudflare Worker.
- **Anti-patrón:** Consultar `caches.default` pero ejecutar igualmente `SELECT ... FROM kv_store` en D1 en cada petición.
- **Patrón Óptimo (*Micro-TTL Coalescing*):**
  1. Mantener un sello temporal `lastOverlayD1ReadAt` en el isolate.
  2. Si `Date.now() - lastOverlayD1ReadAt < 1200` (`1.2s`), retornar instantáneamente el objeto en memoria `globalThis.__WebFactory_OVERLAY_SYNC__` (**0 lecturas D1, latencia `< 1 ms`**).
  3. En cualquier mutación `POST` (`writeOverlaySyncState`, `writeDuoQueues`), actualizar inmediatamente la memoria del isolate, `caches.default` y D1 (*Write-Through*), fijando `lastOverlayD1ReadAt = Date.now()`.
  4. **Resultado:** En el PoP que origina el cambio la propagación es de `0 ms`; en PoPs remotos (Argentina ↔ EE. UU.) la convergencia máxima es $\le 1.2\text{ s}$, colapsando 10 peticiones por segundo en **1 única consulta a D1 cada 1.2 segundos**.

### 3.2 Smart Placement (`[placement] mode = "smart"`) vs. D1 Sessions API (`withSession`)
- **Smart Placement:** Cuando un Worker realiza múltiples consultas por petición hacia una base D1 primaria, habilitar `[placement] mode = "smart"` en `wrangler.toml` permite al plano de control de Cloudflare mover la ejecución del Worker al centro de datos donde reside la instancia primaria de D1, minimizando el RTT de cada sentencia SQL `[VERIFICADO: developers.cloudflare.com/workers/configuration/smart-placement/, 2026-10-25]`.
- **D1 Global Read Replication & Sessions API (`env.DB.withSession(bookmark)`):** Asegura consistencia secuencial (*Read-Your-Own-Writes*) mediante tokens `x-d1-bookmark` (`first-unconstrained` o `first-primary`) cuando se habilitan réplicas de lectura globales `[VERIFICADO: developers.cloudflare.com/d1/best-practices/read-replication/, 2026-10-25]`.

---

## 4. Cifrado Autenticado en Reposo (`AES-256-GCM`) para Tokens OAuth en D1

### 4.1 Modelo de Amenaza (OWASP ASVS 5.0 §6.2 & NIST SP 800-38D)
Almacenar tokens `access_token` y `refresh_token` de OAuth 2.1 (`kick_bot_oauth_token_v1`) en texto plano dentro de la tabla `kv_store` de D1 expone la cuenta del bot si algún endpoint administrativo filtrara volcados de `kv_store` o backups de base de datos.

### 4.2 Implementación con WebCrypto Nativo (`crypto.subtle`)
1. **Derivación de Clave (`SHA-256` -> 256 bits):** A partir del secreto de entorno (`env.ADMIN_API_SECRET || env.KICK_CLIENT_SECRET`), se calcula el digest SHA-256 mediante `crypto.subtle.digest('SHA-256', secretBytes)` y se importa como `CryptoKey` para `AES-GCM`.
2. **Cifrado Autenticado (`AES-256-GCM`):**
   - Generar un vector de inicialización (IV) único de **96 bits (12 bytes)** con `crypto.getRandomValues(new Uint8Array(12))` en cada escritura.
   - Cifrar el JSON del token con `crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plaintextBytes)`.
   - Almacenar el sobre JSON `{ enc: 'AES-256-GCM', iv: b64url(iv), ct: b64url(ciphertextWithTag) }` en `kv_store`.
3. **Migración Transparente (*Zero-Downtime*):** Al leer `kick_bot_oauth_token_v1`, si el registro posee `enc === 'AES-256-GCM'` se descifra y verifica su etiqueta de autenticación GCM; si es un registro legado en texto plano, se acepta en lectura y se cifra automáticamente en la siguiente rotación de token.
