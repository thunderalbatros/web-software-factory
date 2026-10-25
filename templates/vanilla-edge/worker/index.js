/**
 * {{PROJECT_NAME}} — Cloudflare Worker Edge Entrypoint
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/health') {
      return new Response(
        JSON.stringify({ ok: true, project: '{{PROJECT_ID}}', ts: Date.now() }),
        { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } }
      );
    }
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }
    return new Response('Not Found', { status: 404 });
  }
};
