/**
 * Drizzle ORM + Cloudflare Hyperdrive Tenant-Isolated Connector (agencia-alfa)
 * Enforces SET LOCAL app.current_tenant_id = $1 inside every transaction.
 */
export async function withTenantRlsTransaction(hyperdrivePool, tenantUuid, callbackFn) {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[47][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(tenantUuid || ''))) {
    throw new Error('RLS_GUARD: Invalid or missing opaque tenant_id UUID.');
  }
  const client = await hyperdrivePool.connect();
  try {
    await client.query('BEGIN');
    await client.query('SET LOCAL app.current_tenant_id = $1', [tenantUuid]);
    const result = await callbackFn(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}
