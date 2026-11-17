/**
 * local-bindings.mjs — Local Node.js 24 (`node:sqlite` + Temp R2 Dir) Bindings Implementing Cloudflare D1 & R2 APIs
 * Executes the exact same parameterized SQL statements and schema migration as production Cloudflare D1.
 */

import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

class LocalD1PreparedStatement {
  #db;
  #sql;
  #params;

  constructor(db, sql, params = []) {
    this.#db = db;
    this.#sql = sql;
    this.#params = params;
  }

  bind(...args) {
    const normalized = args.map((val) => {
      if (val === undefined) return null;
      if (typeof val === 'boolean') return val ? 1 : 0;
      return val;
    });
    return new LocalD1PreparedStatement(this.#db, this.#sql, normalized);
  }

  _executeRun() {
    const stmt = this.#db.prepare(this.#sql);
    const info = stmt.run(...this.#params);
    return {
      success: true,
      meta: {
        changes: Number(info?.changes || 0),
        last_row_id: Number(info?.lastInsertRowid || 0)
      }
    };
  }

  async first(colName = null) {
    const stmt = this.#db.prepare(this.#sql);
    const row = stmt.get(...this.#params);
    if (!row) return null;
    if (colName) return row[colName] ?? null;
    return row;
  }

  async all() {
    const stmt = this.#db.prepare(this.#sql);
    const results = stmt.all(...this.#params);
    return { success: true, results, meta: { changes: 0 } };
  }

  async run() {
    return this._executeRun();
  }
}

function resolveMigrationFiles(migrationSqlPath) {
  if (!migrationSqlPath) return [];
  if (Array.isArray(migrationSqlPath)) {
    return migrationSqlPath.flatMap((entry) => resolveMigrationFiles(entry));
  }
  const resolved = path.resolve(String(migrationSqlPath));
  if (!fs.existsSync(resolved)) return [];
  const st = fs.statSync(resolved);
  if (st.isDirectory()) {
    return fs
      .readdirSync(resolved)
      .filter((name) => name.endsWith('.sql'))
      .sort()
      .map((name) => path.join(resolved, name));
  }
  const parentDir = path.dirname(resolved);
  if (path.basename(parentDir) === 'migrations') {
    return fs
      .readdirSync(parentDir)
      .filter((name) => name.endsWith('.sql'))
      .sort()
      .map((name) => path.join(parentDir, name));
  }
  return [resolved];
}

export function createNodeSqliteD1Binding(sqliteFilePath, migrationSqlPath) {
  fs.mkdirSync(path.dirname(sqliteFilePath), { recursive: true });
  const sqlite = new DatabaseSync(sqliteFilePath);
  sqlite.exec('PRAGMA journal_mode = WAL;');
  sqlite.exec('PRAGMA foreign_keys = ON;');
  sqlite.exec('PRAGMA busy_timeout = 5000;');

  for (const migFile of resolveMigrationFiles(migrationSqlPath)) {
    const sql = fs.readFileSync(migFile, 'utf8');
    sqlite.exec(sql);
  }

  return {
    sqlite,
    prepare(sql) {
      return new LocalD1PreparedStatement(sqlite, sql, []);
    },
    async exec(sql) {
      sqlite.exec(sql);
      return { count: 1 };
    },
    async batch(statements = []) {
      const outcomes = [];
      sqlite.exec('BEGIN IMMEDIATE;');
      try {
        for (const st of statements) {
          outcomes.push(st._executeRun());
        }
        sqlite.exec('COMMIT;');
        return outcomes;
      } catch (err) {
        try {
          sqlite.exec('ROLLBACK;');
        } catch {}
        throw err;
      }
    },
    close() {
      sqlite.close();
    }
  };
}

export function createLocalFsR2Bucket(bucketRootDir) {
  const root = path.resolve(bucketRootDir);
  fs.mkdirSync(root, { recursive: true });

  function resolveKeyPath(key) {
    const safeRel = String(key || '').replace(/^\/+/, '');
    if (!safeRel || safeRel.includes('..') || safeRel.includes('\0')) {
      throw new Error('INVALID_R2_OBJECT_KEY');
    }
    const target = path.resolve(root, safeRel);
    if (target !== root && !target.startsWith(root + path.sep)) {
      throw new Error('R2_KEY_CONTAINMENT_VIOLATION');
    }
    return target;
  }

  return {
    async put(key, value, options = {}) {
      const filePath = resolveKeyPath(key);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      const buf = value instanceof Uint8Array ? value : Buffer.from(value);
      fs.writeFileSync(filePath, buf);
      fs.writeFileSync(
        `${filePath}.meta.json`,
        JSON.stringify({ httpMetadata: options.httpMetadata || {}, size: buf.byteLength }),
        'utf8'
      );
      return { key, size: buf.byteLength };
    },
    async get(key) {
      const filePath = resolveKeyPath(key);
      if (!fs.existsSync(filePath)) return null;
      const buf = fs.readFileSync(filePath);
      let meta = {};
      if (fs.existsSync(`${filePath}.meta.json`)) {
        try {
          meta = JSON.parse(fs.readFileSync(`${filePath}.meta.json`, 'utf8'));
        } catch {}
      }
      return {
        key,
        size: buf.byteLength,
        httpMetadata: meta.httpMetadata || {},
        async arrayBuffer() {
          return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
        }
      };
    },
    async delete(key) {
      const filePath = resolveKeyPath(key);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      if (fs.existsSync(`${filePath}.meta.json`)) fs.unlinkSync(`${filePath}.meta.json`);
    }
  };
}
