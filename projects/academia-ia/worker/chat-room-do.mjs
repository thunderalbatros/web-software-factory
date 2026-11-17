/**
 * chat-room-do.mjs — Durable Object LevelChatRoom with WebSocket Hibernation API
 * Pure web-standard implementation (zero `cloudflare:*` imports so Node.js v24 can import `worker/index.mjs` directly).
 */

import * as v from 'valibot';

const MAX_BROADCAST_WINDOW_MS = 60_000;
const MAX_BROADCASTS_PER_WINDOW = 120;

const BroadcastEventSchema = v.strictObject({
  type: v.picklist(['new_message', 'message_hidden']),
  roomLevel: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(3))),
  message: v.optional(v.record(v.string(), v.unknown())),
  targetId: v.optional(v.pipe(v.string(), v.minLength(8), v.maxLength(64)))
});

export class LevelChatRoom {
  constructor(state, env) {
    this.state = state;
    this.env = env;
    this.rateLimitWindowStart = 0;
    this.rateLimitCount = 0;
  }

  checkRateLimit() {
    const now = Date.now();
    if (now - this.rateLimitWindowStart > MAX_BROADCAST_WINDOW_MS) {
      this.rateLimitWindowStart = now;
      this.rateLimitCount = 1;
      return true;
    }
    this.rateLimitCount += 1;
    return this.rateLimitCount <= MAX_BROADCASTS_PER_WINDOW;
  }

  async fetch(request) {
    const url = new URL(request.url);
    const upgradeHeader = (request.headers.get('Upgrade') || '').toLowerCase();

    if (upgradeHeader === 'websocket' && typeof WebSocketPair !== 'undefined') {
      const pair = new WebSocketPair();
      const [client, server] = Object.values(pair);
      if (typeof this.state.acceptWebSocket === 'function') {
        this.state.acceptWebSocket(server);
      } else if (typeof server.accept === 'function') {
        server.accept();
      }
      return new Response(null, { status: 101, webSocket: client });
    }

    if (request.method === 'POST' && url.pathname.endsWith('/internal/broadcast')) {
      if (!this.checkRateLimit()) {
        return new Response(JSON.stringify({ ok: false, error: 'RATE_LIMIT_EXCEEDED' }), {
          status: 429,
          headers: { 'Content-Type': 'application/json; charset=utf-8' }
        });
      }
      let rawJson;
      try {
        rawJson = JSON.parse(await request.text());
      } catch {
        return new Response(JSON.stringify({ ok: false, error: 'INVALID_JSON_SYNTAX' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json; charset=utf-8' }
        });
      }
      const parsed = v.safeParse(BroadcastEventSchema, rawJson);
      if (!parsed.success) {
        return new Response(JSON.stringify({ ok: false, error: 'VALIDATION_FAILED' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json; charset=utf-8' }
        });
      }
      const payloadText = JSON.stringify(parsed.output);
      const sockets =
        typeof this.state.getWebSockets === 'function' ? this.state.getWebSockets() : [];
      let delivered = 0;
      for (const ws of sockets) {
        try {
          ws.send(payloadText);
          delivered += 1;
        } catch {
          try {
            ws.close(1011, 'Socket delivery error');
          } catch {}
        }
      }
      return new Response(JSON.stringify({ ok: true, delivered }), {
        status: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      });
    }

    const activeConnections =
      typeof this.state.getWebSockets === 'function' ? this.state.getWebSockets().length : 0;
    return new Response(
      JSON.stringify({
        ok: true,
        hibernation: true,
        activeConnections
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      }
    );
  }

  async webSocketMessage(ws, message) {
    try {
      const raw = typeof message === 'string' ? message : new TextDecoder().decode(message);
      if (raw.trim() === 'ping') {
        ws.send(JSON.stringify({ type: 'pong', timestamp: new Date().toISOString() }));
      }
    } catch {}
  }

  async webSocketClose(ws, code) {
    try {
      ws.close(code || 1000, 'Closed');
    } catch {}
  }

  async webSocketError(ws) {
    try {
      ws.close(1011, 'WebSocket error');
    } catch {}
  }
}
