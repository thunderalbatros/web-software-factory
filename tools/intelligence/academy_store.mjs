#!/usr/bin/env node
/**
 * tools/intelligence/academy_store.mjs — Academia IA relational store (schema v2).
 * =============================================================================
 *  - Dedicated DB: data/academy.sqlite (derived, Git-ignored, regenerable).
 *  - Source of truth: data/academy/*.json (versioned, deterministic order).
 *  - Migrations: data/migrations/NNN_<name>_v<version>.sql + PRAGMA user_version.
 *  - Valibot validation + referential integrity (paid tool => free alternative).
 *  - Zero split-brain: the disposable RAG cache (.cache/omni_rag_fts5.sqlite)
 *    never hosts academy_* tables; legacy copies are backed up and dropped.
 * =============================================================================
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import * as v from 'valibot';
import { loadProjectCharter } from '../lib/project_profile.mjs';

let DatabaseSyncClass = null;
try {
  DatabaseSyncClass = (await import('node:sqlite')).DatabaseSync || null;
} catch (_) {
  DatabaseSyncClass = null;
}

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), '..', '..');

export const ACADEMY_SCHEMA_VERSION = 2;
export const ACADEMY_DATA_DIR = path.join(ROOT, 'data', 'academy');
export const ACADEMY_DB_PATH = path.join(ROOT, 'data', 'academy.sqlite');
export const ACADEMY_MIGRATIONS_DIR = path.join(ROOT, 'data', 'migrations');
export const ACADEMY_BACKUP_DIR = path.join(ROOT, 'data', 'backups');
export const LEGACY_RAG_CACHE_DB_PATH = path.join(ROOT, '.cache', 'omni_rag_fts5.sqlite');

/** Export/import order matters: tools before nothing else depends on them except tools themselves (deferred FK). */
export const ACADEMY_TABLES = Object.freeze([
  { table: 'academy_sources', pk: 'source_id', file: 'sources.json' },
  { table: 'academy_tools', pk: 'tool_id', file: 'tools.json' },
  { table: 'academy_videos', pk: 'video_id', file: 'videos.json' },
  { table: 'academy_learner_archetypes', pk: 'archetype_id', file: 'archetypes.json' },
  { table: 'academy_project_tracks', pk: 'track_id', file: 'tracks.json' }
]);

const JSON_COLUMNS = new Set([
  'topic_tags',
  'transcript_anchors_json',
  'domain_stage_tags',
  'recommended_oss_stack_json',
  'cloud_sandbox_fallbacks_json',
  'free_tools_stack_json',
  'pro_tools_optional_json',
  'milestone_rubric_json'
]);

const SOURCE_LICENSES = ['MIT', 'Apache-2.0', 'CC-BY-4.0', 'CC-BY-SA-4.0', 'CC-BY-NC-4.0', 'CC-BY-NC-SA-4.0', 'CLEAN_ROOM_ONLY'];
const DERIVATIVE_LICENSES = ['CC-BY-NC-SA-4.0', 'CC-BY-SA-4.0', 'CLEAN_ROOM_ORIGINAL'];
const VIDEO_LICENSES = ['YOUTUBE_STANDARD_EMBED_ONLY', 'CC-BY-4.0', 'CC-BY-SA-4.0', 'CC-BY-NC-4.0', 'CC-BY-NC-SA-4.0', 'CC0-1.0', 'PUBLIC_DOMAIN'];
const PRICING_TIERS = ['free_no_card', 'open_source_local', 'freemium_capped', 'paid_pro_reference'];
const FREE_ALTERNATIVE_TIERS = new Set(['free_no_card', 'open_source_local']);
const SKILL_TREES = ['cotidiano', 'trabajo', 'crear', 'emprender'];
const HARDWARE_TIERS = ['basic_cpu_cloud', 'mid_16gb', 'local_gpu'];
export const QUIZ_ELIGIBLE_ANCHOR_STATUSES = Object.freeze(['oer_transcript_verified', 'multimodal_verified', 'human_verified']);

/** Fallback license policy (mirrors data/academy/project_charter.json#inbound_license_policy). */
const BUILTIN_LICENSE_POLICY = Object.freeze({
  'MIT': { direct_adapt_allowed: true, derivative_license_required: 'CC-BY-NC-SA-4.0', commercial_use_allowed: 1 },
  'Apache-2.0': { direct_adapt_allowed: true, derivative_license_required: 'CC-BY-NC-SA-4.0', commercial_use_allowed: 1 },
  'CC-BY-4.0': { direct_adapt_allowed: true, derivative_license_required: 'CC-BY-NC-SA-4.0', commercial_use_allowed: 1 },
  'CC-BY-NC-4.0': { direct_adapt_allowed: true, derivative_license_required: 'CC-BY-NC-SA-4.0', commercial_use_allowed: 0 },
  'CC-BY-NC-SA-4.0': { direct_adapt_allowed: true, derivative_license_required: 'CC-BY-NC-SA-4.0', commercial_use_allowed: 0 },
  'CC-BY-SA-4.0': { direct_adapt_allowed: true, derivative_license_required: 'CC-BY-SA-4.0', commercial_use_allowed: 1 },
  'CLEAN_ROOM_ONLY': { direct_adapt_allowed: false, derivative_license_required: 'CLEAN_ROOM_ORIGINAL', commercial_use_allowed: 0 }
});

const BUILTIN_VIDEO_PLATFORM_HOSTS = Object.freeze({
  youtube: ['www.youtube-nocookie.com'],
  archive_org: ['archive.org', 'www.archive.org'],
  wikimedia: ['commons.wikimedia.org', 'upload.wikimedia.org']
});

// ---------------------------------------------------------------------------
// Seeds (inserted exactly once, when migration v2 is applied to a fresh DB)
// ---------------------------------------------------------------------------
export const DEFAULT_ACADEMY_PROJECT_TRACKS = Object.freeze([
  {
    track_id: 'sitio-web',
    title_es: 'Sitio Web o Portfolio Interactivo',
    skill_tree: 'crear',
    free_tools_stack_json: [
      { name: 'Astro + CSS Baseline', role: 'Estructura estática rápida', tier: 'open_source_local' },
      { name: 'Cloudflare Workers Static Assets', role: 'Publicación gratuita en la red', tier: 'free_no_card' },
      { name: 'Asistentes de IA con plan gratuito', role: 'Redacción y revisión de HTML', tier: 'freemium_capped' }
    ],
    pro_tools_optional_json: [
      { name: 'Dominio propio', note: 'Opcional si quieres una dirección personalizada; el subdominio edge es gratuito.' }
    ],
    milestone_rubric_json: [
      { milestone: 1, level: 'Acquire', title_es: 'Boceto estructural y propuesta en 60 palabras', criteria: ['Objetivo claro', 'Cero datos personales expuestos'] },
      { milestone: 2, level: 'Deepen', title_es: 'Prototipo navegable accesible sin scroll horizontal', criteria: ['Contraste APCA legible', 'Objetivos táctiles de 44 x 44 como mínimo'] },
      { milestone: 3, level: 'Create', title_es: 'Auditoría factual, pruebas en móvil y publicación en Portfolio', criteria: ['Cero enlaces rotos', 'Explicación del rol humano'] }
    ]
  },
  {
    track_id: 'bot-automatizado',
    title_es: 'Bot o Flujo Automatizado Útil',
    skill_tree: 'cotidiano',
    free_tools_stack_json: [
      { name: 'n8n (edición comunitaria autoalojada)', role: 'Orquestación visual por nodos', tier: 'open_source_local' },
      { name: 'Google Apps Script', role: 'Automatización de correo, calendario y hojas', tier: 'free_no_card' },
      { name: 'APIs de IA con cuota gratuita', role: 'Clasificación y resumen', tier: 'freemium_capped' }
    ],
    pro_tools_optional_json: [
      { name: 'Planes pagos de automatización', note: 'Solo si superas las ejecuciones mensuales del plan gratuito.' }
    ],
    milestone_rubric_json: [
      { milestone: 1, level: 'Acquire', title_es: 'Mapa entrada-proceso-salida y filtro de privacidad', criteria: ['Qué dato entra', 'Qué dato sensible se redacta antes de enviarlo'] },
      { milestone: 2, level: 'Deepen', title_es: 'Flujo funcional con validación de errores y pausa humana', criteria: ['Aprobación manual antes de enviar mensajes'] },
      { milestone: 3, level: 'Create', title_es: 'Bitácora de pruebas reales con registro de ahorro de tiempo', criteria: ['3 casos borde probados', 'Plan de reversión sin IA'] }
    ]
  },
  {
    track_id: 'animacion-corta',
    title_es: 'Animación Corta o Pieza Audiovisual',
    skill_tree: 'crear',
    free_tools_stack_json: [
      { name: 'SVG + Web Animations / Motion Canvas', role: 'Gráficos vectoriales y ritmo visual', tier: 'open_source_local' },
      { name: 'Krita / Blender', role: 'Ilustración cuadro a cuadro o escena 3D', tier: 'open_source_local' },
      { name: 'Kdenlive', role: 'Montaje y exportación', tier: 'open_source_local' }
    ],
    pro_tools_optional_json: [
      { name: 'Generadores de video por IA pagos', note: 'Solo para planos imposibles de ilustrar o filmar.' }
    ],
    milestone_rubric_json: [
      { milestone: 1, level: 'Acquire', title_es: 'Guion gráfico de 4 escenas y paleta OKLCH coherente', criteria: ['Historia clara en 15 a 30 segundos', 'Respeto de derechos de imagen'] },
      { milestone: 2, level: 'Deepen', title_es: 'Animación fluida respetando prefers-reduced-motion', criteria: ['Subtítulos visibles', 'Cero parpadeos bruscos'] },
      { milestone: 3, level: 'Create', title_es: 'Exportación optimizada con créditos de autoría humana e IA', criteria: ['Audio nivelado', 'Licencia abierta declarada'] }
    ]
  },
  {
    track_id: 'comic-digital',
    title_es: 'Cómic Digital o Narrativa Visual Ilustrada',
    skill_tree: 'crear',
    free_tools_stack_json: [
      { name: 'Krita / Inkscape', role: 'Viñetas, globos de texto y entintado', tier: 'open_source_local' },
      { name: 'Generadores de imagen con cuota gratuita', role: 'Exploración de fondos y composición', tier: 'freemium_capped' },
      { name: 'HTML Grid para lectura móvil', role: 'Publicación en tira vertical responsiva', tier: 'open_source_local' }
    ],
    pro_tools_optional_json: [
      { name: 'Suites de ilustración pagas', note: 'Útiles solo para series largas con consistencia estricta.' }
    ],
    milestone_rubric_json: [
      { milestone: 1, level: 'Acquire', title_es: 'Biblia de 2 personajes y guion de 4 a 6 viñetas', criteria: ['Voz narrativa propia', 'Cero imitación del estilo de artistas vivos por nombre'] },
      { milestone: 2, level: 'Deepen', title_es: 'Consistencia visual y tipografía legible', criteria: ['Contraste claro en globos', 'Texto alternativo por viñeta'] },
      { milestone: 3, level: 'Create', title_es: 'Edición final en lector accesible lista para Portfolio', criteria: ['Navegación por teclado', 'Nota de proceso creativo'] }
    ]
  },
  {
    track_id: 'musica-banda-sonora',
    title_es: 'Música Original o Banda Sonora',
    skill_tree: 'crear',
    free_tools_stack_json: [
      { name: 'Strudel / Tone.js + Web Audio API', role: 'Síntesis procedural y patrones rítmicos', tier: 'open_source_local' },
      { name: 'Audacity + LMMS', role: 'Edición multipista y mezcla', tier: 'open_source_local' },
      { name: 'Bibliotecas de sonidos CC0', role: 'Efectos libres de regalías', tier: 'free_no_card' }
    ],
    pro_tools_optional_json: [
      { name: 'Generadores musicales por IA pagos', note: 'Solo si necesitas licencias comerciales cerradas.' }
    ],
    milestone_rubric_json: [
      { milestone: 1, level: 'Acquire', title_es: 'Intención emocional, tempo y estructura A-B de 30 segundos', criteria: ['Cero imitación de voces registradas sin permiso'] },
      { milestone: 2, level: 'Deepen', title_es: 'Mezcla por capas (ritmo, armonía, textura)', criteria: ['Sin saturación', 'Bucle limpio sin clics'] },
      { milestone: 3, level: 'Create', title_es: 'Banda sonora exportada con ficha de stems y atribución', criteria: ['Volumen balanceado', 'Descripción accesible de la escena'] }
    ]
  },
  {
    track_id: 'sistema-profesional',
    title_es: 'Sistema Profesional para Trabajo o Emprendimiento',
    skill_tree: 'trabajo',
    free_tools_stack_json: [
      { name: 'Plantillas de prompts versionadas + checklist Markdown', role: 'Procedimiento operativo reproducible', tier: 'open_source_local' },
      { name: 'LibreOffice Calc', role: 'Tablero de seguimiento, costos y métricas', tier: 'open_source_local' },
      { name: 'Asistentes con fuentes citadas (plan gratuito)', role: 'Síntesis documental', tier: 'freemium_capped' }
    ],
    pro_tools_optional_json: [
      { name: 'Planes empresariales de asistentes de IA', note: 'Conviene pagar solo si superas los límites o necesitas retención cero de datos.' }
    ],
    milestone_rubric_json: [
      { milestone: 1, level: 'Acquire', title_es: 'Auditoría de una tarea real y política de datos confidenciales', criteria: ['Anonimización de clientes y precios antes del prompt'] },
      { milestone: 2, level: 'Deepen', title_es: 'Flujo asistido en 3 pasos con matriz de verificación factual', criteria: ['Cero citas inventadas', 'Plan B manual si cae la API'] },
      { milestone: 3, level: 'Create', title_es: 'Manual replicable con métricas antes y después', criteria: ['Ahorro medido en minutos', 'Tasa de error validada con revisión humana'] }
    ]
  }
]);

export const DEFAULT_ACADEMY_LEARNER_ARCHETYPES = Object.freeze([
  {
    archetype_id: 'pc_basica_zero_cost',
    title_es: 'PC básica, presupuesto cero',
    hardware_tier: 'basic_cpu_cloud',
    budget_mode: 'zero_cost',
    goal_category: 'cotidiano',
    recommended_oss_stack_json: ['Navegador moderno (Firefox o Chromium)', 'LibreOffice', 'Demos de IA en el navegador con Transformers.js'],
    cloud_sandbox_fallbacks_json: [
      { name: 'Google Colab (plan gratuito)', quota_verified: false },
      { name: 'Hugging Face Spaces', quota_verified: false },
      { name: 'Kaggle Notebooks', quota_verified: false }
    ],
    notes_es: 'Plantilla técnica sin datos personales. Las cuotas gratuitas cambian: verificar antes de recomendar.'
  },
  {
    archetype_id: 'pc_media_hybrid_free',
    title_es: 'PC media (16 GB), mezcla local y nube gratuita',
    hardware_tier: 'mid_16gb',
    budget_mode: 'hybrid_free_tiers',
    goal_category: 'trabajo',
    recommended_oss_stack_json: ['Ollama con modelos pequeños cuantizados', 'Open WebUI', 'n8n (edición comunitaria)', 'SQLite'],
    cloud_sandbox_fallbacks_json: [
      { name: 'Gemini API (cuota gratuita)', quota_verified: false },
      { name: 'Groq (cuota gratuita)', quota_verified: false }
    ],
    notes_es: 'Plantilla técnica sin datos personales. Validar requisitos de RAM de cada modelo antes de recomendarlo.'
  },
  {
    archetype_id: 'gpu_local_sovereign',
    title_es: 'Equipo con GPU local, soberanía de datos',
    hardware_tier: 'local_gpu',
    budget_mode: 'self_hosted_local',
    goal_category: 'emprender',
    recommended_oss_stack_json: ['llama.cpp / Ollama', 'vLLM', 'ComfyUI', 'PostgreSQL + pgvector', 'Qdrant'],
    cloud_sandbox_fallbacks_json: [],
    notes_es: 'Plantilla técnica sin datos personales. Prioriza ejecución local para material confidencial.'
  },
  {
    archetype_id: 'creador_multimedia_oss',
    title_es: 'Creador multimedia con herramientas libres',
    hardware_tier: 'mid_16gb',
    budget_mode: 'hybrid_free_tiers',
    goal_category: 'crear',
    recommended_oss_stack_json: ['Krita', 'Blender', 'Inkscape', 'Audacity', 'LMMS', 'Kdenlive', 'whisper.cpp'],
    cloud_sandbox_fallbacks_json: [{ name: 'Hugging Face Spaces', quota_verified: false }],
    notes_es: 'Plantilla técnica sin datos personales. Sin generadores externos de imágenes en el perfil education.'
  }
]);

// ---------------------------------------------------------------------------
// Deterministic serialization helpers
// ---------------------------------------------------------------------------
export function sortKeysDeep(value) {
  if (Array.isArray(value)) return value.map(sortKeysDeep);
  if (value && typeof value === 'object') {
    const out = {};
    for (const k of Object.keys(value).sort()) out[k] = sortKeysDeep(value[k]);
    return out;
  }
  return value;
}

export function stableStringify(value) {
  return JSON.stringify(sortKeysDeep(value));
}

function parseJsonColumns(row) {
  const out = { ...row };
  for (const col of Object.keys(out)) {
    if (!JSON_COLUMNS.has(col)) continue;
    const raw = out[col];
    if (typeof raw === 'string') {
      try {
        out[col] = JSON.parse(raw);
      } catch {
        throw new Error(`INVALID_JSON_COLUMN: ${col}`);
      }
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Valibot schemas
// ---------------------------------------------------------------------------
function isHttpsUrl(s) {
  try {
    const u = new URL(s);
    return u.protocol === 'https:' && !u.username && !u.password && Boolean(u.hostname);
  } catch {
    return false;
  }
}

function isIso8601(s) {
  if (!/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,9})?)?(?:Z|[+-]\d{2}:\d{2})?)?$/.test(s)) return false;
  return !Number.isNaN(Date.parse(s.length === 10 ? `${s}T00:00:00Z` : s));
}

const ID = v.pipe(v.string(), v.regex(/^[a-z0-9][a-z0-9._-]{1,79}$/, 'INVALID_ID_SLUG'));
const TEXT = (max) => v.pipe(v.string(), v.maxLength(max, `TEXT_TOO_LONG_MAX_${max}`));
const REQUIRED_TEXT = (max) => v.pipe(v.string(), v.trim(), v.minLength(2, 'TEXT_TOO_SHORT'), v.maxLength(max, `TEXT_TOO_LONG_MAX_${max}`));
const HTTPS_URL = v.pipe(v.string(), v.maxLength(2048), v.check(isHttpsUrl, 'URL_MUST_BE_HTTPS'));
const OPTIONAL_HTTPS_URL = v.union([v.literal(''), HTTPS_URL], 'URL_MUST_BE_HTTPS');
const OPTIONAL_ISO = v.union([v.literal(''), v.pipe(v.string(), v.check(isIso8601, 'INVALID_ISO_8601'))], 'INVALID_ISO_8601');
const BIT = v.union([v.picklist([0, 1]), v.pipe(v.boolean(), v.transform((b) => (b ? 1 : 0)))]);
const HTTP_STATUS = v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(599));
const STRING_ARRAY = v.array(TEXT(120));

export const AnchorSchema = v.strictObject({
  timestamp_mmss: v.pipe(v.string(), v.regex(/^\d{1,3}:[0-5]\d$/, 'INVALID_TIMESTAMP_MMSS')),
  concept_es: REQUIRED_TEXT(280),
  verifiable_fact_es: REQUIRED_TEXT(600),
  source_method: v.picklist(['oer_transcript', 'multimodal_model', 'human_review'])
});

export const SourceSchema = v.strictObject({
  source_id: ID,
  title: REQUIRED_TEXT(300),
  authors: v.optional(TEXT(500), ''),
  url: v.optional(OPTIONAL_HTTPS_URL, ''),
  license: v.picklist(SOURCE_LICENSES),
  usage_policy: v.picklist(['DIRECT_ADAPT_TRANSLATE', 'CLEAN_ROOM_FACTS_ONLY']),
  authority_tier: v.picklist(['GOLD', 'SILVER']),
  published_at: v.optional(OPTIONAL_ISO, ''),
  verified_http_status: v.optional(HTTP_STATUS, 0),
  verified_at: v.optional(OPTIONAL_ISO, ''),
  commercial_use_allowed: v.optional(BIT),
  derivative_license_required: v.optional(v.picklist(DERIVATIVE_LICENSES))
});

export const VideoSchema = v.strictObject({
  video_id: ID,
  source_platform: v.optional(v.picklist(['youtube', 'archive_org', 'wikimedia']), 'youtube'),
  youtube_id: v.optional(v.nullable(v.pipe(v.string(), v.regex(/^[A-Za-z0-9_-]{11}$/, 'INVALID_YOUTUBE_ID'))), null),
  external_video_url: v.optional(v.nullable(HTTPS_URL), null),
  title: REQUIRED_TEXT(300),
  channel_title: v.optional(TEXT(200), ''),
  duration_iso: v.optional(v.union([v.literal(''), v.pipe(v.string(), v.regex(/^PT(?=\d)(?:\d+H)?(?:\d+M)?(?:\d+S)?$/, 'INVALID_ISO_DURATION'))]), ''),
  embeddable: v.optional(BIT, 1),
  caption_mode: v.picklist(['audio_es', 'sub_es_nativo', 'sub_es_autotraducido']),
  topic_tags: v.optional(STRING_ARRAY, []),
  license: v.optional(v.picklist(VIDEO_LICENSES), 'YOUTUBE_STANDARD_EMBED_ONLY'),
  pedagogical_role: v.optional(v.picklist(['conceptual_anchor', 'practical_walkthrough', 'deep_dive_case']), 'conceptual_anchor'),
  transcript_anchors_json: v.optional(v.array(AnchorSchema), []),
  anchors_status: v.optional(v.picklist(['pending', ...QUIZ_ELIGIBLE_ANCHOR_STATUSES]), 'pending'),
  verified_at: v.optional(OPTIONAL_ISO, '')
});

export const ToolSchema = v.strictObject({
  tool_id: ID,
  name: REQUIRED_TEXT(200),
  official_url: HTTPS_URL,
  pricing_tier: v.picklist(PRICING_TIERS),
  free_alternative_id: v.optional(v.nullable(v.union([v.literal(''), ID])), null),
  when_to_pay_verdict_es: v.optional(TEXT(1200), ''),
  quota_notes_es: v.optional(TEXT(1200), ''),
  privacy_opt_out_steps_es: v.optional(TEXT(2000), ''),
  skill_tree_tags: v.optional(TEXT(200), ''),
  professions_tags: v.optional(TEXT(400), ''),
  http_status: v.optional(HTTP_STATUS, 0),
  last_checked_at: v.optional(OPTIONAL_ISO, ''),
  is_open_source: v.optional(BIT, 0),
  spdx_license: v.optional(TEXT(64), ''),
  min_hardware_tier: v.optional(v.picklist(HARDWARE_TIERS), 'basic_cpu_cloud'),
  domain_stage_tags: v.optional(STRING_ARRAY, []),
  repo_or_docs_url: v.optional(OPTIONAL_HTTPS_URL, '')
});

export const ArchetypeSchema = v.strictObject({
  archetype_id: ID,
  title_es: REQUIRED_TEXT(200),
  hardware_tier: v.picklist(HARDWARE_TIERS),
  budget_mode: v.picklist(['zero_cost', 'hybrid_free_tiers', 'self_hosted_local']),
  goal_category: v.picklist(SKILL_TREES),
  recommended_oss_stack_json: v.optional(v.array(v.unknown()), []),
  cloud_sandbox_fallbacks_json: v.optional(v.array(v.unknown()), []),
  notes_es: v.optional(TEXT(1000), '')
});

export const TrackSchema = v.strictObject({
  track_id: ID,
  title_es: REQUIRED_TEXT(200),
  skill_tree: v.picklist(SKILL_TREES),
  free_tools_stack_json: v.optional(v.array(v.unknown()), []),
  pro_tools_optional_json: v.optional(v.array(v.unknown()), []),
  milestone_rubric_json: v.optional(v.pipe(v.array(v.unknown()), v.length(3, 'MILESTONE_RUBRIC_REQUIRES_3_MILESTONES')), [])
});

const SCHEMA_BY_TABLE = {
  academy_sources: SourceSchema,
  academy_videos: VideoSchema,
  academy_tools: ToolSchema,
  academy_learner_archetypes: ArchetypeSchema,
  academy_project_tracks: TrackSchema
};

function formatIssue(table, result) {
  const issue = result.issues?.[0];
  const where = (issue?.path || []).map((p) => p.key).join('.');
  return new Error(`ACADEMY_VALIDATION_FAILED[${table}${where ? `.${where}` : ''}]: ${issue?.message || 'invalid'}`);
}

function getLicensePolicy(license, charter) {
  const fromCharter = charter?.inbound_license_policy?.[license];
  return fromCharter || BUILTIN_LICENSE_POLICY[license];
}

function getVideoPlatformHosts(charter) {
  return charter?.media_policy?.video_platform_hosts || BUILTIN_VIDEO_PLATFORM_HOSTS;
}

function safeCharter(options = {}) {
  if (options.charter !== undefined) return options.charter;
  return loadProjectCharter();
}

/**
 * Validates + normalizes one row for `table`. Returns a DB-ready object (JSON columns as arrays/objects).
 */
export function validateAcademyRow(table, input, options = {}) {
  const schema = SCHEMA_BY_TABLE[table];
  if (!schema) throw new Error(`UNKNOWN_ACADEMY_TABLE: ${table}`);
  const parsedInput = parseJsonColumns(input || {});
  const result = v.safeParse(schema, parsedInput);
  if (!result.success) throw formatIssue(table, result);
  const row = { ...result.output };
  const charter = safeCharter(options);

  if (table === 'academy_sources') {
    const policy = getLicensePolicy(row.license, charter);
    if (!policy) throw new Error(`LICENSE_POLICY_MISSING: ${row.license}`);
    if (row.commercial_use_allowed === undefined) row.commercial_use_allowed = policy.commercial_use_allowed;
    if (row.derivative_license_required === undefined) row.derivative_license_required = policy.derivative_license_required;
    if (row.commercial_use_allowed === 1 && policy.commercial_use_allowed === 0) {
      throw new Error(`LICENSE_POLICY_CONFLICT: ${row.license} forbids commercial use`);
    }
    if (row.derivative_license_required !== policy.derivative_license_required) {
      throw new Error(`LICENSE_POLICY_CONFLICT: ${row.license} requires derivative license ${policy.derivative_license_required}`);
    }
    if (row.usage_policy === 'DIRECT_ADAPT_TRANSLATE' && !policy.direct_adapt_allowed) {
      throw new Error(`LICENSE_INCOMPATIBLE_WITH_PROJECT_CONTENT_LICENSE: ${row.license} must use CLEAN_ROOM_FACTS_ONLY`);
    }
  }

  if (table === 'academy_videos') {
    if (row.source_platform === 'youtube') {
      if (!row.youtube_id) throw new Error('YOUTUBE_ID_REQUIRED_FOR_YOUTUBE_PLATFORM');
    } else {
      if (!row.external_video_url) throw new Error('EXTERNAL_VIDEO_URL_REQUIRED_FOR_NON_YOUTUBE_PLATFORM');
      if (row.license === 'YOUTUBE_STANDARD_EMBED_ONLY') {
        throw new Error('NON_YOUTUBE_VIDEO_REQUIRES_OPEN_LICENSE');
      }
      row.youtube_id = null;
    }
    if (row.external_video_url) {
      const allowedHosts = getVideoPlatformHosts(charter)[row.source_platform] || [];
      const host = new URL(row.external_video_url).hostname;
      if (!allowedHosts.includes(host)) {
        throw new Error(`VIDEO_ORIGIN_NOT_APPROVED: ${host} for platform ${row.source_platform}`);
      }
    }
    if (QUIZ_ELIGIBLE_ANCHOR_STATUSES.includes(row.anchors_status) && row.transcript_anchors_json.length === 0) {
      throw new Error('VERIFIED_ANCHORS_STATUS_REQUIRES_AT_LEAST_ONE_ANCHOR');
    }
  }

  if (table === 'academy_tools') {
    if (row.free_alternative_id === '') row.free_alternative_id = null;
    if (row.free_alternative_id && row.free_alternative_id === row.tool_id) {
      throw new Error('FREE_ALTERNATIVE_CANNOT_REFERENCE_ITSELF');
    }
    if (row.pricing_tier === 'paid_pro_reference' && !row.free_alternative_id) {
      throw new Error('PAID_TOOL_REQUIRES_FREE_ALTERNATIVE');
    }
    if (row.is_open_source === 1 && !row.spdx_license) {
      throw new Error('OPEN_SOURCE_TOOL_REQUIRES_SPDX_LICENSE');
    }
  }

  return row;
}

function serializeRowForDb(row) {
  const out = {};
  for (const [k, val] of Object.entries(row)) {
    out[k] = JSON_COLUMNS.has(k) ? stableStringify(val ?? []) : val;
  }
  return out;
}

// ---------------------------------------------------------------------------
// Database lifecycle: migrations, memoization, corruption backup, legacy purge
// ---------------------------------------------------------------------------
const initializedConnections = new WeakSet();
const dbByPath = new Map();
let legacyPurgeDone = false;

const POST_MIGRATION_SEEDS = {
  2: (db) => {
    for (const track of DEFAULT_ACADEMY_PROJECT_TRACKS) writeRow(db, 'academy_project_tracks', validateAcademyRow('academy_project_tracks', track, { charter: null }), 'insert_or_ignore');
    for (const arch of DEFAULT_ACADEMY_LEARNER_ARCHETYPES) writeRow(db, 'academy_learner_archetypes', validateAcademyRow('academy_learner_archetypes', arch, { charter: null }), 'insert_or_ignore');
  }
};

export function listAcademyMigrations(migrationsDir = ACADEMY_MIGRATIONS_DIR) {
  if (!fs.existsSync(migrationsDir)) throw new Error(`ACADEMY_MIGRATIONS_DIR_MISSING: ${migrationsDir}`);
  return fs
    .readdirSync(migrationsDir)
    .map((file) => {
      const m = file.match(/^(\d{3})_[a-z0-9_]+_v(\d+)\.sql$/i);
      return m ? { file, order: Number(m[1]), version: Number(m[2]) } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.order - b.order);
}

function applyPragmas(db) {
  db.exec('PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL; PRAGMA busy_timeout = 5000; PRAGMA foreign_keys = ON;');
}

/**
 * Idempotent migration runner. Each migration + its seed runs in one IMMEDIATE transaction.
 */
export function runAcademyMigrations(db, { migrationsDir = ACADEMY_MIGRATIONS_DIR } = {}) {
  const fromVersion = Number(db.prepare('PRAGMA user_version').get().user_version || 0);
  const applied = [];
  for (const mig of listAcademyMigrations(migrationsDir)) {
    if (mig.version <= fromVersion) continue;
    const sql = fs.readFileSync(path.join(migrationsDir, mig.file), 'utf8');
    db.exec('BEGIN IMMEDIATE');
    try {
      db.exec(sql);
      if (POST_MIGRATION_SEEDS[mig.version]) POST_MIGRATION_SEEDS[mig.version](db);
      db.exec(`PRAGMA user_version = ${Number(mig.version)}`);
      db.exec('COMMIT');
      applied.push(mig.file);
    } catch (err) {
      try { db.exec('ROLLBACK'); } catch (_) {}
      throw new Error(`ACADEMY_MIGRATION_FAILED[${mig.file}]: ${err.message}`);
    }
  }
  const toVersion = Number(db.prepare('PRAGMA user_version').get().user_version || 0);
  if (toVersion !== ACADEMY_SCHEMA_VERSION) {
    throw new Error(`ACADEMY_SCHEMA_VERSION_MISMATCH: expected ${ACADEMY_SCHEMA_VERSION}, got ${toVersion}`);
  }
  return { fromVersion, toVersion, applied };
}

/**
 * Backward-compatible initializer (memoized per connection).
 */
export function initAcademyRelationalSchema(dbOverride = null) {
  const db = dbOverride || getAcademyDb();
  if (!initializedConnections.has(db)) {
    applyPragmas(db);
    runAcademyMigrations(db);
    initializedConnections.add(db);
  }
  return { ready: true, userVersion: ACADEMY_SCHEMA_VERSION };
}

function timestampSlug() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

function backupCorruptFile(dbPath) {
  fs.mkdirSync(ACADEMY_BACKUP_DIR, { recursive: true });
  const ts = timestampSlug();
  const moved = [];
  for (const suffix of ['', '-wal', '-shm']) {
    const src = `${dbPath}${suffix}`;
    if (!fs.existsSync(src)) continue;
    const dest = path.join(ACADEMY_BACKUP_DIR, `${path.basename(dbPath)}${suffix}.${ts}.corrupt`);
    fs.renameSync(src, dest);
    moved.push(dest);
  }
  return moved;
}

function hasVersionedJson(dir = ACADEMY_DATA_DIR) {
  return ACADEMY_TABLES.every(({ file }) => fs.existsSync(path.join(dir, file)));
}

/**
 * Opens (or returns cached) academy DB. Corrupt files are renamed into data/backups/
 * with a timestamp (never unlinked), then the DB is rebuilt from data/academy/*.json.
 */
export function getAcademyDb({ dbPath = ACADEMY_DB_PATH } = {}) {
  if (!DatabaseSyncClass) throw new Error('SQLITE_UNAVAILABLE: node:sqlite DatabaseSync not available');
  const abs = path.resolve(dbPath);
  const cached = dbByPath.get(abs);
  if (cached) return cached;

  fs.mkdirSync(path.dirname(abs), { recursive: true });
  let existed = fs.existsSync(abs);
  let db;
  try {
    db = new DatabaseSyncClass(abs);
    db.prepare('PRAGMA schema_version').get();
  } catch (openErr) {
    try { db?.close(); } catch (_) {}
    if (existed) backupCorruptFile(abs);
    existed = false;
    db = new DatabaseSyncClass(abs);
  }
  initAcademyRelationalSchema(db);
  dbByPath.set(abs, db);

  const isDefaultDb = abs === path.resolve(ACADEMY_DB_PATH);
  if (!existed && isDefaultDb && hasVersionedJson()) {
    importAcademyFromVersionedJson(ACADEMY_DATA_DIR, { db });
  }
  if (isDefaultDb && !legacyPurgeDone) {
    legacyPurgeDone = true;
    purgeLegacyAcademyTablesFromCache();
  }
  return db;
}

export function closeAcademyDb({ dbPath = ACADEMY_DB_PATH } = {}) {
  const abs = path.resolve(dbPath);
  const db = dbByPath.get(abs);
  if (db) {
    try { db.close(); } catch (_) {}
    dbByPath.delete(abs);
  }
}

function withAcademyDb(options = {}, fn) {
  if (options?.db) {
    initAcademyRelationalSchema(options.db);
    return fn(options.db);
  }
  return fn(getAcademyDb({ dbPath: options?.dbPath }));
}

/**
 * Backs up any legacy academy_* tables found in the disposable RAG cache and drops them.
 */
export function purgeLegacyAcademyTablesFromCache({ cachePath = LEGACY_RAG_CACHE_DB_PATH, backupDir = ACADEMY_BACKUP_DIR } = {}) {
  if (!DatabaseSyncClass || !fs.existsSync(cachePath)) return { purged: false, reason: 'NO_CACHE_DB', tables: [] };
  const cacheDb = new DatabaseSyncClass(cachePath);
  try {
    cacheDb.exec('PRAGMA busy_timeout = 5000;');
    const tables = cacheDb
      .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name LIKE 'academy\\_%' ESCAPE '\\' ORDER BY name")
      .all()
      .map((r) => r.name);
    if (tables.length === 0) return { purged: false, reason: 'NO_LEGACY_TABLES', tables };
    const snapshot = {};
    for (const t of tables) snapshot[t] = cacheDb.prepare(`SELECT * FROM "${t.replace(/"/g, '')}"`).all();
    fs.mkdirSync(backupDir, { recursive: true });
    const backupFile = path.join(backupDir, `legacy_cache_academy_tables_${timestampSlug()}.json`);
    fs.writeFileSync(backupFile, `${JSON.stringify(sortKeysDeep({ source: path.relative(ROOT, cachePath), tables: snapshot }), null, 2)}\n`, 'utf8');
    for (const t of tables) cacheDb.exec(`DROP TABLE IF EXISTS "${t.replace(/"/g, '')}"`);
    return { purged: true, tables, backupFile: path.relative(ROOT, backupFile) };
  } finally {
    try { cacheDb.close(); } catch (_) {}
  }
}

// ---------------------------------------------------------------------------
// Low-level writes
// ---------------------------------------------------------------------------
function tableMeta(table) {
  const meta = ACADEMY_TABLES.find((t) => t.table === table);
  if (!meta) throw new Error(`UNKNOWN_ACADEMY_TABLE: ${table}`);
  return meta;
}

function writeRow(db, table, row, mode = 'upsert') {
  const { pk } = tableMeta(table);
  const dbRow = serializeRowForDb(row);
  const cols = Object.keys(dbRow);
  const placeholders = cols.map(() => '?').join(', ');
  const quoted = cols.map((c) => `"${c}"`).join(', ');
  let sql;
  if (mode === 'insert_or_ignore') {
    sql = `INSERT OR IGNORE INTO ${table} (${quoted}) VALUES (${placeholders})`;
  } else if (mode === 'insert') {
    sql = `INSERT INTO ${table} (${quoted}) VALUES (${placeholders})`;
  } else {
    const updates = cols.filter((c) => c !== pk).map((c) => `"${c}" = excluded."${c}"`).join(', ');
    sql = `INSERT INTO ${table} (${quoted}) VALUES (${placeholders}) ON CONFLICT("${pk}") DO UPDATE SET ${updates}`;
  }
  db.prepare(sql).run(...cols.map((c) => dbRow[c]));
}

function readRow(db, table, id) {
  const { pk } = tableMeta(table);
  const row = db.prepare(`SELECT * FROM ${table} WHERE "${pk}" = ?`).get(String(id));
  return row ? parseJsonColumns(row) : null;
}

function assertToolReferentialIntegrity(db, row) {
  if (row.pricing_tier === 'paid_pro_reference') {
    const alt = db.prepare('SELECT tool_id, pricing_tier FROM academy_tools WHERE tool_id = ?').get(String(row.free_alternative_id));
    if (!alt) throw new Error(`FREE_ALTERNATIVE_NOT_FOUND: ${row.free_alternative_id}`);
    if (!FREE_ALTERNATIVE_TIERS.has(alt.pricing_tier)) {
      throw new Error(`FREE_ALTERNATIVE_NOT_FREE: ${row.free_alternative_id} is ${alt.pricing_tier}`);
    }
  }
  if (!FREE_ALTERNATIVE_TIERS.has(row.pricing_tier)) {
    const dependents = db
      .prepare('SELECT tool_id FROM academy_tools WHERE free_alternative_id = ? AND tool_id != ?')
      .all(String(row.tool_id), String(row.tool_id));
    if (dependents.length > 0) {
      throw new Error(`FREE_ALTERNATIVE_DOWNGRADE_BLOCKED: ${row.tool_id} is the free alternative of ${dependents.map((d) => d.tool_id).join(', ')}`);
    }
  }
}

function runInTransaction(db, fn) {
  db.exec('BEGIN IMMEDIATE');
  try {
    const out = fn();
    db.exec('COMMIT');
    return out;
  } catch (err) {
    try { db.exec('ROLLBACK'); } catch (_) {}
    throw err;
  }
}

function makeCrud(table, idLabel) {
  const { pk } = tableMeta(table);
  return {
    upsert(record, options = {}) {
      return withAcademyDb(options, (db) => {
        const row = validateAcademyRow(table, record, options);
        return runInTransaction(db, () => {
          if (table === 'academy_tools') assertToolReferentialIntegrity(db, row);
          writeRow(db, table, row, 'upsert');
          return readRow(db, table, row[pk]);
        });
      });
    },
    get(id, options = {}) {
      return withAcademyDb(options, (db) => readRow(db, table, id));
    },
    remove(id, options = {}) {
      return withAcademyDb(options, (db) =>
        runInTransaction(db, () => {
          if (table === 'academy_tools') {
            const dependents = db.prepare('SELECT tool_id FROM academy_tools WHERE free_alternative_id = ?').all(String(id));
            if (dependents.length > 0) {
              throw new Error(`TOOL_REFERENCED_AS_FREE_ALTERNATIVE: ${id} is required by ${dependents.map((d) => d.tool_id).join(', ')}`);
            }
          }
          const res = db.prepare(`DELETE FROM ${table} WHERE "${pk}" = ?`).run(String(id));
          return { deleted: Number(res.changes || 0) > 0, [idLabel]: String(id) };
        })
      );
    }
  };
}

const sourcesCrud = makeCrud('academy_sources', 'source_id');
const videosCrud = makeCrud('academy_videos', 'video_id');
const toolsCrud = makeCrud('academy_tools', 'tool_id');
const archetypesCrud = makeCrud('academy_learner_archetypes', 'archetype_id');
const tracksCrud = makeCrud('academy_project_tracks', 'track_id');

function listRows(table, where = [], params = [], options = {}) {
  const { pk } = tableMeta(table);
  return withAcademyDb(options, (db) =>
    db
      .prepare(`SELECT * FROM ${table} ${where.length ? `WHERE ${where.join(' AND ')}` : ''} ORDER BY "${pk}" ASC`)
      .all(...params)
      .map(parseJsonColumns)
  );
}

// ---------------------------------------------------------------------------
// Public CRUD API (names preserved from rag_pipeline v1 + new archetypes)
// ---------------------------------------------------------------------------
export const upsertAcademySource = sourcesCrud.upsert;
export const getAcademySource = sourcesCrud.get;
export const deleteAcademySource = sourcesCrud.remove;
export function listAcademySources(filters = {}, options = {}) {
  const where = [];
  const params = [];
  for (const col of ['license', 'usage_policy', 'authority_tier']) {
    if (filters[col]) {
      where.push(`${col} = ?`);
      params.push(String(filters[col]));
    }
  }
  return listRows('academy_sources', where, params, options);
}

export const upsertAcademyVideo = videosCrud.upsert;
export const deleteAcademyVideo = videosCrud.remove;
export function getAcademyVideo(idOrYoutubeId, options = {}) {
  return withAcademyDb(options, (db) => {
    const row = db
      .prepare('SELECT * FROM academy_videos WHERE video_id = ? OR youtube_id = ? LIMIT 1')
      .get(String(idOrYoutubeId), String(idOrYoutubeId));
    return row ? parseJsonColumns(row) : null;
  });
}
export function listAcademyVideos(filters = {}, options = {}) {
  const where = [];
  const params = [];
  for (const col of ['source_platform', 'anchors_status', 'pedagogical_role']) {
    if (filters[col]) {
      where.push(`${col} = ?`);
      params.push(String(filters[col]));
    }
  }
  if (filters.embeddable !== undefined) {
    where.push('embeddable = ?');
    params.push(filters.embeddable ? 1 : 0);
  }
  return listRows('academy_videos', where, params, options);
}

/** Only videos with verified anchors may feed quizzes. */
export function isVideoQuizEligible(video) {
  return Boolean(
    video &&
      QUIZ_ELIGIBLE_ANCHOR_STATUSES.includes(video.anchors_status) &&
      Array.isArray(video.transcript_anchors_json) &&
      video.transcript_anchors_json.length > 0
  );
}

export const upsertAcademyTool = toolsCrud.upsert;
export const getAcademyTool = toolsCrud.get;
export const deleteAcademyTool = toolsCrud.remove;
export function listAcademyTools(filters = {}, options = {}) {
  const where = [];
  const params = [];
  if (filters.pricing_tier) {
    where.push('pricing_tier = ?');
    params.push(String(filters.pricing_tier));
  }
  if (filters.min_hardware_tier) {
    where.push('min_hardware_tier = ?');
    params.push(String(filters.min_hardware_tier));
  }
  if (filters.skill_tree) {
    where.push("(',' || skill_tree_tags || ',') LIKE ?");
    params.push(`%,${String(filters.skill_tree).replace(/[%_,]/g, '')},%`);
  }
  return listRows('academy_tools', where, params, options);
}

export const upsertAcademyLearnerArchetype = archetypesCrud.upsert;
export const getAcademyLearnerArchetype = archetypesCrud.get;
export const deleteAcademyLearnerArchetype = archetypesCrud.remove;
export function listAcademyLearnerArchetypes(filters = {}, options = {}) {
  const where = [];
  const params = [];
  for (const col of ['hardware_tier', 'budget_mode', 'goal_category']) {
    if (filters[col]) {
      where.push(`${col} = ?`);
      params.push(String(filters[col]));
    }
  }
  return listRows('academy_learner_archetypes', where, params, options);
}

export const upsertAcademyProjectTrack = tracksCrud.upsert;
export const getAcademyProjectTrack = tracksCrud.get;
export const deleteAcademyProjectTrack = tracksCrud.remove;
export function listAcademyProjectTracks(filters = {}, options = {}) {
  const where = [];
  const params = [];
  if (filters.skill_tree) {
    where.push('skill_tree = ?');
    params.push(String(filters.skill_tree));
  }
  return listRows('academy_project_tracks', where, params, options);
}

export function getAcademyRelationalStats(options = {}) {
  if (!DatabaseSyncClass && !options?.db) return { tablesReady: false, reason: 'SQLITE_UNAVAILABLE' };
  return withAcademyDb(options, (db) => {
    const count = (t) => Number(db.prepare(`SELECT COUNT(*) AS c FROM ${t}`).get().c || 0);
    return {
      tablesReady: true,
      db_path: options?.db ? '(injected)' : path.relative(ROOT, path.resolve(options?.dbPath || ACADEMY_DB_PATH)).replace(/\\/g, '/'),
      user_version: Number(db.prepare('PRAGMA user_version').get().user_version || 0),
      academy_sources: count('academy_sources'),
      academy_videos: count('academy_videos'),
      academy_tools: count('academy_tools'),
      academy_learner_archetypes: count('academy_learner_archetypes'),
      academy_project_tracks: count('academy_project_tracks'),
      project_track_ids: db.prepare('SELECT track_id FROM academy_project_tracks ORDER BY track_id').all().map((r) => r.track_id),
      archetype_ids: db.prepare('SELECT archetype_id FROM academy_learner_archetypes ORDER BY archetype_id').all().map((r) => r.archetype_id)
    };
  });
}

// ---------------------------------------------------------------------------
// Commercial-mode guard + versioned JSON export/import
// ---------------------------------------------------------------------------
export function assertAcademyCommercialCompliance(options = {}) {
  const charter = safeCharter(options);
  if (!charter || charter.commercial_mode !== true) return { enforced: false, commercialMode: charter?.commercial_mode ?? null };
  return withAcademyDb(options, (db) => {
    const blocked = db.prepare('SELECT source_id FROM academy_sources WHERE commercial_use_allowed = 0 ORDER BY source_id').all();
    if (blocked.length > 0) {
      throw new Error(`COMMERCIAL_MODE_BLOCKS_NON_COMMERCIAL_SOURCES: ${blocked.map((b) => b.source_id).join(', ')}`);
    }
    return { enforced: true, commercialMode: true };
  });
}

function renderTableFile(table, rows) {
  const payload = { schema_version: ACADEMY_SCHEMA_VERSION, table, row_count: rows.length, rows: rows.map(sortKeysDeep) };
  return `${JSON.stringify(payload, null, 2)}\n`;
}

export function exportAcademyToVersionedJson(dir = ACADEMY_DATA_DIR, options = {}) {
  const outDir = path.resolve(dir);
  return withAcademyDb(options, (db) => {
    assertAcademyCommercialCompliance({ ...options, db });
    fs.mkdirSync(outDir, { recursive: true });
    const files = [];
    for (const { table, pk, file } of ACADEMY_TABLES) {
      const rows = db.prepare(`SELECT * FROM ${table} ORDER BY "${pk}" ASC`).all().map(parseJsonColumns);
      const content = renderTableFile(table, rows);
      const target = path.join(outDir, file);
      const previous = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : null;
      if (previous !== content) fs.writeFileSync(target, content, 'utf8');
      files.push({
        file: path.relative(ROOT, target).replace(/\\/g, '/'),
        rows: rows.length,
        changed: previous !== content,
        sha256: crypto.createHash('sha256').update(content).digest('hex')
      });
    }
    return { dir: path.relative(ROOT, outDir).replace(/\\/g, '/'), files };
  });
}

export function importAcademyFromVersionedJson(dir = ACADEMY_DATA_DIR, options = {}) {
  const inDir = path.resolve(dir);
  const payloads = ACADEMY_TABLES.map((meta) => {
    const target = path.join(inDir, meta.file);
    if (!fs.existsSync(target)) throw new Error(`ACADEMY_JSON_MISSING: ${meta.file}`);
    const parsed = JSON.parse(fs.readFileSync(target, 'utf8'));
    if (parsed.schema_version !== ACADEMY_SCHEMA_VERSION) {
      throw new Error(`ACADEMY_JSON_SCHEMA_MISMATCH: ${meta.file} v${parsed.schema_version} != v${ACADEMY_SCHEMA_VERSION}`);
    }
    if (parsed.table !== meta.table || !Array.isArray(parsed.rows)) throw new Error(`ACADEMY_JSON_INVALID: ${meta.file}`);
    return { ...meta, rows: parsed.rows };
  });

  return withAcademyDb(options, (db) =>
    runInTransaction(db, () => {
      for (const { table } of [...ACADEMY_TABLES].reverse()) db.exec(`DELETE FROM ${table}`);
      const counts = {};
      for (const { table, rows } of payloads) {
        for (const raw of rows) writeRow(db, table, validateAcademyRow(table, raw, options), 'insert');
        counts[table] = rows.length;
      }
      // Deferred referential validation (order-independent inside the JSON files).
      for (const tool of db.prepare('SELECT * FROM academy_tools').all()) assertToolReferentialIntegrity(db, tool);
      const fkViolations = db.prepare('PRAGMA foreign_key_check').all();
      if (fkViolations.length > 0) throw new Error(`ACADEMY_FOREIGN_KEY_VIOLATIONS: ${fkViolations.length}`);
      assertAcademyCommercialCompliance({ ...options, db });
      return { dir: path.relative(ROOT, inDir).replace(/\\/g, '/'), counts };
    })
  );
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------
if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const arg = process.argv[2] || '--stats';
  try {
    if (arg === '--export') {
      console.log(JSON.stringify(exportAcademyToVersionedJson(), null, 2));
    } else if (arg === '--import') {
      console.log(JSON.stringify(importAcademyFromVersionedJson(), null, 2));
    } else if (arg === '--purge-legacy-cache') {
      console.log(JSON.stringify(purgeLegacyAcademyTablesFromCache(), null, 2));
    } else {
      console.log(JSON.stringify(getAcademyRelationalStats(), null, 2));
    }
    closeAcademyDb();
  } catch (err) {
    console.error(`❌ ${err.message}`);
    process.exit(1);
  }
}

