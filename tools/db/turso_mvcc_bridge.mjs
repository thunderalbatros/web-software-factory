#!/usr/bin/env node
/**
 * tools/db/turso_mvcc_bridge.mjs — Concurrent MVCC SQLite Bridge
 * =============================================================================
 * Uses `@tursodatabase/database` (MVCC `BEGIN CONCURRENT`) when available,
 * with deterministic fallback to Node 24 built-in `node:sqlite` (`DatabaseSync`
 * with WAL + `busy_timeout = 5000` and bounded `SQLITE_BUSY` retry backoff).
 * =============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';

async function applyStandardWalPragmas(db, preferMvcc = false) {
  if (preferMvcc) {
    try {
      await db.exec("PRAGMA journal_mode = 'mvcc';");
    } catch {
      try {
        await db.exec('PRAGMA journal_mode = WAL;');
      } catch {
        // fallback WAL unsupported in ephemeral mode
      }
    }
  } else {
    try {
      await db.exec('PRAGMA journal_mode = WAL;');
    } catch {
      // ignore read-only WAL errors
    }
  }
  for (const pragma of ['PRAGMA synchronous = NORMAL;', 'PRAGMA busy_timeout = 5000;', 'PRAGMA foreign_keys = ON;']) {
    try {
      await db.exec(pragma);
    } catch {
      // ignore unsupported pragma
    }
  }
}

function isBusyError(err) {
  const msg = String(err?.message || '').toUpperCase();
  return msg.includes('SQLITE_BUSY') || msg.includes('DATABASE IS LOCKED');
}

/**
 * Opens a concurrent-safe SQLite connection (`turso-mvcc` or `node:sqlite-wal`).
 */
export async function openConcurrentSqliteConnection(dbPath = ':memory:', options = {}) {
  const isMemory = dbPath === ':memory:';
  if (!isMemory) {
    fs.mkdirSync(path.dirname(path.resolve(dbPath)), { recursive: true });
  }

  let engineName = 'node:sqlite-wal';
  let rawDb = null;

  if (options.preferTursoMvcc !== false) {
    try {
      const tursoMod = await import('@tursodatabase/database');
      if (typeof tursoMod.connect === 'function') {
        rawDb = await tursoMod.connect(dbPath);
        engineName = 'turso-mvcc';
      }
    } catch {
      rawDb = null;
    }
  }

  if (!rawDb) {
    const sqliteMod = await import('node:sqlite');
    const DatabaseSync = sqliteMod.DatabaseSync;
    rawDb = new DatabaseSync(dbPath);
    engineName = 'node:sqlite-wal';
  }

  try {
    await applyStandardWalPragmas(rawDb, engineName === 'turso-mvcc' && !isMemory);
  } catch (err) {
    try {
      if (typeof rawDb?.close === 'function') await rawDb.close();
    } catch {
      // ignore close failure on init rollback
    }
    throw err;
  }

  const api = {
    engineName,
    rawDb,
    async exec(sql) {
      return await rawDb.exec(sql);
    },
    async queryAll(sql, params = []) {
      const stmt = rawDb.prepare(sql);
      return Array.isArray(params) && params.length > 0 ? await stmt.all(...params) : await stmt.all();
    },
    async run(sql, params = []) {
      const stmt = rawDb.prepare(sql);
      return Array.isArray(params) && params.length > 0 ? await stmt.run(...params) : await stmt.run();
    },
    async runConcurrentTransaction(fn, maxRetries = 4) {
      const beginCmd = engineName === 'turso-mvcc' ? 'BEGIN CONCURRENT' : 'BEGIN IMMEDIATE';
      let lastErr = null;
      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          try {
            await rawDb.exec(beginCmd);
          } catch (beginErr) {
            if (beginCmd === 'BEGIN CONCURRENT') {
              await rawDb.exec('BEGIN IMMEDIATE');
            } else {
              throw beginErr;
            }
          }
          const result = await fn(api);
          await rawDb.exec('COMMIT');
          return result;
        } catch (err) {
          lastErr = err;
          try {
            await rawDb.exec('ROLLBACK');
          } catch {
            // ignore rollback error
          }
          if (isBusyError(err) && attempt < maxRetries) {
            await new Promise((r) => setTimeout(r, 15 * (attempt + 1)));
            continue;
          }
          throw err;
        }
      }
      throw lastErr;
    },
    async close() {
      try {
        if (typeof rawDb.close === 'function') await rawDb.close();
      } catch {
        // ignore close failure
      }
    }
  };

  return api;
}
