/**
 * local-progress-store.mjs — Local-First Dexie/IndexedDB Progress Store (Ley 25.326)
 * Lazy-imports `dexie` on user interaction/sync so reading lessons incur 0 KB Dexie overhead.
 */

import {
  CANONICAL_EVENT_XP,
  computeCurriculumProgress
} from './curriculum-paths.mjs';

const LOCAL_STORAGE_KEY = 'academia_libre_local_v1';
let dbInstance = null;

async function getDexieDb() {
  if (typeof window === 'undefined' || typeof indexedDB === 'undefined') return null;
  if (!dbInstance) {
    const { default: Dexie } = await import('dexie');
    dbInstance = new Dexie('academia_libre_v1');
    dbInstance.version(1).stores({
      events: '&eventKey, lessonId, eventType, completedAt',
      prefs: 'key'
    });
  }
  return dbInstance;
}

function readLsFallback() {
  if (typeof window === 'undefined') return { events: [], prefs: {} };
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return { events: [], prefs: {} };
    const parsed = JSON.parse(raw);
    return {
      events: Array.isArray(parsed.events) ? parsed.events : [],
      prefs: parsed.prefs && typeof parsed.prefs === 'object' ? parsed.prefs : {}
    };
  } catch {
    return { events: [], prefs: {} };
  }
}

function writeLsFallback(state) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore storage quota failures */
  }
}

export function hasLoggedInHintCookie() {
  if (typeof document === 'undefined') return false;
  return /(?:^|;\s*)al_logged_in=1(?:;|$)/.test(document.cookie || '');
}

export function getFastLocalSnapshotSync() {
  const lsState = readLsFallback();
  const activePathId = lsState.prefs.activePathId || 'uso_cotidiano';
  const progress = computeCurriculumProgress({
    activePathId,
    ledgerRows: lsState.events,
    milestoneRows: []
  });
  const xpTotal = lsState.events.reduce(
    (acc, ev) => acc + Number(ev.xpAwarded || CANONICAL_EVENT_XP[ev.eventType] || 0),
    0
  );
  return {
    events: lsState.events,
    prefs: lsState.prefs,
    xpTotal,
    progress
  };
}

export async function getLocalPreferences() {
  const lsState = readLsFallback();
  const db = await getDexieDb();
  if (!db) return lsState.prefs;
  try {
    const row = await db.table('prefs').get('user_prefs');
    return { ...lsState.prefs, ...row?.value };
  } catch {
    return lsState.prefs;
  }
}

export async function saveLocalPreferences(partial = {}) {
  const lsState = readLsFallback();
  const nextPrefs = { ...lsState.prefs, ...partial };
  writeLsFallback({ ...lsState, prefs: nextPrefs });
  const db = await getDexieDb();
  if (db) {
    try {
      await db.table('prefs').put({ key: 'user_prefs', value: nextPrefs });
    } catch {}
  }
  return nextPrefs;
}

export async function listLocalProgressEvents() {
  const lsState = readLsFallback();
  const db = await getDexieDb();
  if (!db) return lsState.events;
  try {
    const rows = await db.table('events').toArray();
    if (rows.length >= lsState.events.length) return rows;
    return lsState.events;
  } catch {
    return lsState.events;
  }
}

export async function recordLocalProgressEvent({ lessonId, eventType, scoreJson = '{}' }) {
  const eventKey = `${lessonId}:${eventType}`;
  const item = {
    eventKey,
    lessonId,
    eventType,
    xpAwarded: Number(CANONICAL_EVENT_XP[eventType] || 0),
    scoreJson,
    completedAt: new Date().toISOString()
  };

  const lsState = readLsFallback();
  if (!lsState.events.some((e) => e.eventKey === eventKey)) {
    lsState.events.push(item);
    writeLsFallback(lsState);
  }

  const db = await getDexieDb();
  if (db) {
    try {
      const existing = await db.table('events').get(eventKey);
      if (!existing) {
        await db.table('events').put(item);
      }
    } catch {}
  }

  return getLocalProgressSnapshot();
}

export async function getLocalProgressSnapshot() {
  const [events, prefs] = await Promise.all([listLocalProgressEvents(), getLocalPreferences()]);
  const activePathId = prefs.activePathId || 'uso_cotidiano';
  const progress = computeCurriculumProgress({
    activePathId,
    ledgerRows: events,
    milestoneRows: []
  });
  const xpTotal = events.reduce((acc, ev) => acc + Number(ev.xpAwarded || CANONICAL_EVENT_XP[ev.eventType] || 0), 0);
  return {
    events,
    prefs,
    xpTotal,
    progress
  };
}

export async function syncLocalProgressWithServer() {
  const events = await listLocalProgressEvents();
  const res = await fetch('/api/progress/sync', {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      events: events.map((e) => ({
        lessonId: e.lessonId,
        eventType: e.eventType,
        scoreJson: typeof e.scoreJson === 'string' ? e.scoreJson : '{}'
      }))
    })
  });
  if (!res.ok) return null;
  return res.json();
}
