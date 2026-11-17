/**
 * news-feed.mjs — Valibot-validated loader for `data/academy/news_feed.json`
 * Ensures every verified news card ships with HTTP 200 provenance, a zero-cost/OSS
 * alternative without a credit card, a linked curriculum lesson, and a `/comunidad/` prompt.
 */

import * as v from 'valibot';
import rawNewsFeed from '../../data/academy/news_feed.json' with { type: 'json' };

export const NEWS_CATEGORIES = Object.freeze([
  { id: 'all', labelEs: 'Todas las áreas' },
  { id: 'vida_cotidiana', labelEs: 'Vida Cotidiana' },
  { id: 'profesiones_empresas', labelEs: 'Profesiones y Empresas' },
  { id: 'desarrollo_productos', labelEs: 'Desarrollo de Productos' }
]);

const HTTPS_URL_RX = /^https:\/\/[^\s]+$/;
const ISO_DATE_RX = /^\d{4}-\d{2}-\d{2}$/;

export const NewsFeedItemSchema = v.strictObject({
  news_id: v.pipe(v.string(), v.trim(), v.minLength(5), v.maxLength(80)),
  category: v.picklist(['vida_cotidiana', 'profesiones_empresas', 'desarrollo_productos']),
  category_label_es: v.pipe(v.string(), v.trim(), v.minLength(3), v.maxLength(60)),
  level: v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(3)),
  title_es: v.pipe(v.string(), v.trim(), v.minLength(10), v.maxLength(160)),
  summary_es: v.pipe(v.string(), v.trim(), v.minLength(20), v.maxLength(500)),
  verified_at: v.pipe(v.string(), v.regex(ISO_DATE_RX)),
  http_status: v.literal(200),
  source_url: v.pipe(v.string(), v.regex(HTTPS_URL_RX)),
  source_label_es: v.pipe(v.string(), v.trim(), v.minLength(4), v.maxLength(120)),
  free_alternative_name: v.pipe(v.string(), v.trim(), v.minLength(4), v.maxLength(140)),
  free_alternative_tier: v.picklist(['free_no_card', 'open_source_local']),
  free_alternative_url: v.pipe(v.string(), v.regex(HTTPS_URL_RX)),
  free_alternative_notes_es: v.pipe(v.string(), v.trim(), v.minLength(10), v.maxLength(360)),
  linked_lesson_path: v.pipe(v.string(), v.regex(/^\/niveles\/[a-z-]+\/$/)),
  linked_lesson_title_es: v.pipe(v.string(), v.trim(), v.minLength(6), v.maxLength(140)),
  community_discuss_url: v.pipe(v.string(), v.regex(/^\/comunidad\/(?:\?[^\s]*)?$/))
});

export const NewsFeedDocumentSchema = v.strictObject({
  schema_version: v.literal(1),
  table: v.literal('academy_news_feed'),
  row_count: v.pipe(v.number(), v.integer(), v.minValue(1)),
  rows: v.pipe(v.array(NewsFeedItemSchema), v.minLength(1))
});

export function loadVerifiedNewsFeed(candidateDoc = rawNewsFeed) {
  const parsed = v.parse(NewsFeedDocumentSchema, candidateDoc);
  if (parsed.row_count !== parsed.rows.length) {
    throw new Error(`news_feed.json row_count mismatch: ${parsed.row_count} !== ${parsed.rows.length}`);
  }
  return parsed;
}
