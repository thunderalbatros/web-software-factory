---
id: durable-objects-hibernation
trigger: "when writing or reviewing Cloudflare Durable Objects, WebSockets, or live connection state"
confidence: 0.90
domain: "architecture-and-realtime"
source: "session-observation"
scope: project
project_id: "web-software-factory-WebFactory"
project_name: "Web Software Factory Studio"
---

# Cloudflare Durable Objects WebSocket Hibernation API

## Action
Always use Cloudflare's WebSocket Hibernation API (`state.acceptWebSocket(ws, [tags])` and `webSocketMessage(ws, message)` handler) instead of storing in-memory WebSocket collections with `setInterval` pings.
Hibernation allows the Durable Object to sleep while connections remain open, incurring $0 runtime cost during chat idle periods and scaling to thousands of concurrent RealtimeHub stream viewers.

## Evidence
- Hard budget constraint: USD 0 permanently free. Standard non-hibernated Durable Objects run active CPU timers that exhaust Cloudflare Workers free quotas in hours.
- Verified in `docs/architecture/ADR-002-REALTIME-DO.md`.
