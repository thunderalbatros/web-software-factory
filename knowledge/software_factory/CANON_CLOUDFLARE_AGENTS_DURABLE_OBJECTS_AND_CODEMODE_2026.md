# CANON: Cloudflare Agents SDK (`cloudflare/agents`), Durable Objects SQLite & `@cloudflare/codemode` (2026)

> **Epistemic Tier:** `TIER_1_SOTA_2026` (`authorityBoost: 1.35`)  
> **Primary Squad / Role:** `Squad 2 — Edge & Backend` (`edge-fullstack-architect` & `senior-coder`)  
> **Local Vault Reference:** `C:\Users\tomas\Desktop\streamerbot\references\sota-2026\final-frontier-2026\agents` (`[VERIFICADO: cloudflare/agents Oct 2026, 2026-10-28]`)

---

## 1. Propósito Arquitectónico en la Web Software Factory

Cuando el CTO solicita en el `SPEC.md` de un sitio web incorporar asistentes conversacionales con memoria persistente, copilotos B2B embebidos, carritos inteligentes o flujos multi-paso en tiempo real, el rol `edge-fullstack-architect` implementa **`cloudflare/agents`** sobre **Cloudflare Durable Objects con SQLite integrado** y **WebSocket Hibernation API**.

### Ventajas FinOps y Técnicas (`$0.00` en Reposo)
1. **Hibernación WebSocket a Costo `$0.00`:** El agente mantiene decenas de miles de conexiones WebSocket abiertas pero **hiberna en disco** cuando no procesa mensajes, consumiendo `0 ms` de CPU facturable en reposo.
2. **Base de Datos SQLite Embebida (`this.sql`):** Cada instancia de `Agent` posee su propio motor SQLite Zero-Latency dentro del Durable Object sin latencia de red externa.
3. **Ejecución Programática `@cloudflare/codemode`:** En lugar de encadenar múltiples turnos lentos de `tool_call` uno por uno, el agente compone un bloque tipado (`codemode`) que invoca múltiples herramientas MCP en un único round-trip determinista.

---

## 2. Patrón Canónico de Implementación (`worker/agent_durable_object.js`)

```javascript
import { Agent } from 'agents';

/**
 * Stateful Edge Agent con SQLite integrado y WebSocket Hibernation ($0.00 en reposo).
 */
export class SiteConciergeAgent extends Agent {
  async onStart() {
    // Inicialización determinista de tabla SQLite local al Durable Object
    this.sql`
      CREATE TABLE IF NOT EXISTS conversation_memory (
        id TEXT PRIMARY KEY,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at INTEGER NOT NULL
      )
    `;
  }

  async onRequest(request) {
    const url = new URL(request.url);
    if (url.pathname.endsWith('/history')) {
      const rows = this.sql`
        SELECT id, role, content, created_at
        FROM conversation_memory
        ORDER BY created_at DESC
        LIMIT 20
      `;
      return new Response(JSON.stringify({ ok: true, history: rows }), {
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      });
    }
    return new Response(JSON.stringify({ status: 'AGENT_HIBERNATION_READY' }), {
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
  }

  async onMessage(connection, message) {
    const payload = typeof message === 'string' ? JSON.parse(message) : message;
    const msgId = crypto.randomUUID();
    const now = Date.now();

    // Consulta parametrizada mediante template literal seguro de Cloudflare SQLite
    this.sql`
      INSERT INTO conversation_memory (id, role, content, created_at)
      VALUES (${msgId}, 'user', ${String(payload.text || '').slice(0, 1000)}, ${now})
    `;

    connection.send(
      JSON.stringify({
        id: msgId,
        status: 'PROCESSED',
        state: this.state
      })
    );
  }
}
```

---

## 3. Patrón `@cloudflare/codemode` + `MCP-Zero` Active Tool Discovery

Para evitar inyectar decenas de esquemas JSON-RPC en cada ventana de contexto:
1. Invocar primero `discover_tools({ intent, domain })` (`MCP-Zero`) para resolver únicamente las 1–3 herramientas relevantes del turno (`-98%` overhead de esquemas).
2. Ejecutar operaciones compuestas mediante `codemode_execute_batch({ operations })` validando cada paso con `tools/intelligence/agent_governance_kernel.mjs` (`OWASP Agentic Top 10 ASI01–ASI10`).

---

## 4. Configuración en `wrangler.toml`

```toml
[[durable_objects.bindings]]
name = "SITE_CONCIERGE_AGENT"
class_name = "SiteConciergeAgent"

[[migrations]]
tag = "v1"
new_sqlite_classes = ["SiteConciergeAgent"]
```
