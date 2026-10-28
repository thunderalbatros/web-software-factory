/**
 * {{PROJECT_NAME}} — Drizzle ORM Schema Blueprint for Cloudflare D1 (SQLite Edge)
 * Zero-bloat schema definitions compatible with drizzle-orm/d1 and Better-Auth.
 */

export const D1_TABLES = Object.freeze({
  organizations: {
    tableName: 'organizations',
    columns: ['id', 'slug', 'name', 'plan_tier', 'subscription_status', 'created_at']
  },
  users: {
    tableName: 'users',
    columns: ['id', 'org_id', 'email', 'full_name', 'role', 'email_verified', 'created_at']
  },
  sessions: {
    tableName: 'sessions',
    columns: ['id', 'user_id', 'token_hash', 'expires_at', 'ip_address', 'user_agent', 'created_at']
  },
  subscriptions: {
    tableName: 'subscriptions',
    columns: ['id', 'org_id', 'provider', 'external_subscription_id', 'plan_id', 'status', 'current_period_end', 'updated_at']
  },
  webhookEvents: {
    tableName: 'webhook_events',
    columns: ['event_id', 'provider', 'event_type', 'payload_hash', 'processed_at']
  },
  leads: {
    tableName: 'leads',
    columns: ['id', 'full_name', 'email', 'message', 'source', 'created_at']
  }
});

/**
 * Lightweight D1 Query Builder Helper (Batch Coalescing Ready)
 */
export function createD1Repository(d1) {
  return {
    async findUserByEmail(email) {
      if (!d1 || typeof d1.prepare !== 'function') return null;
      return await d1
        .prepare('SELECT id, org_id, email, full_name, role, email_verified, created_at FROM users WHERE email = ?1 LIMIT 1')
        .bind(String(email).trim().toLowerCase())
        .first();
    },

    async recordIdempotentPaymentEvent({ eventId, provider, eventType, payloadHash, orgId, extSubId, planId, status, periodEnd }) {
      if (!d1 || typeof d1.batch !== 'function') return { applied: false, mode: 'stateless-preview' };
      const now = new Date().toISOString();
      const existing = await d1
        .prepare('SELECT event_id FROM webhook_events WHERE event_id = ?1 LIMIT 1')
        .bind(eventId)
        .first();
      if (existing) {
        return { applied: false, duplicate: true, eventId };
      }

      const statements = [
        d1
          .prepare('INSERT INTO webhook_events (event_id, provider, event_type, payload_hash, processed_at) VALUES (?1, ?2, ?3, ?4, ?5)')
          .bind(eventId, provider, eventType, payloadHash, now)
      ];

      if (orgId && extSubId) {
        statements.push(
          d1
            .prepare(
              'INSERT INTO subscriptions (id, org_id, provider, external_subscription_id, plan_id, status, current_period_end, updated_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8) ON CONFLICT(external_subscription_id) DO UPDATE SET status = excluded.status, plan_id = excluded.plan_id, current_period_end = excluded.current_period_end, updated_at = excluded.updated_at'
            )
            .bind(`sub_${extSubId}`, orgId, provider, extSubId, planId || 'pro', status || 'active', periodEnd || now, now),
          d1
            .prepare('UPDATE organizations SET plan_tier = ?1, subscription_status = ?2 WHERE id = ?3')
            .bind(planId || 'pro', status || 'active', orgId)
        );
      }

      await d1.batch(statements);
      return { applied: true, duplicate: false, eventId };
    }
  };
}
