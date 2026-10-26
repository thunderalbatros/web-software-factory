/**
 * {{PROJECT_NAME}} — Cloudflare Worker Edge Entrypoint (Astro 5 + Static Assets)
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/health') {
      return new Response(
        JSON.stringify({ ok: true, project: '{{PROJECT_ID}}', stack: 'astro-edge', ts: Date.now() }),
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-store',
            'X-Content-Type-Options': 'nosniff'
          }
        }
      );
    }
    if (env && env.ASSETS) {
      return env.ASSETS.fetch(request);
    }
    return new Response('Not Found', { status: 404 });
  }
};
