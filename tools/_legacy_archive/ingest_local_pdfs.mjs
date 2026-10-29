#!/usr/bin/env node
/**
 * tools/ingest_local_pdfs.mjs — Local PDF/EPUB Ingester & Aesthetic Axiom Translator Bridge
 * ==========================================================================================
 * Bridges `tools/intelligence/book_pdf_ingester.mjs` and `course_and_paper_distiller.mjs`
 * so any design, colorimetry, painting, typography, or animation book deposited in
 * `knowledge/_inbox_pdfs/` is indexed as `TIER_2_TIMELESS_PRINCIPLES` with an automatic
 * "Axiomas Visuales Traducidos a Código 2026 (Axiom -> Formula -> CSS/WebGPU Token)" card.
 * ==========================================================================================
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  ingestInboxDirectory,
  ingestBookToMarkdown,
  classifyBookCategory
} from './intelligence/book_pdf_ingester.mjs';
import {
  buildVisualAxiomsToCodeTable,
  convertPdfToMarkdownMarkItDown,
  parseLocalSubtitleFileOpenSubs
} from './intelligence/course_and_paper_distiller.mjs';

export {
  ingestInboxDirectory,
  ingestBookToMarkdown,
  classifyBookCategory,
  buildVisualAxiomsToCodeTable,
  convertPdfToMarkdownMarkItDown,
  parseLocalSubtitleFileOpenSubs
};

const __filename = fileURLToPath(import.meta.url);

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  const noRebuild = process.argv.includes('--no-rebuild');
  ingestInboxDirectory({ rebuildRag: !noRebuild })
    .then((summary) => {
      console.log(JSON.stringify({ status: 'OK', ...summary }, null, 2));
    })
    .catch((err) => {
      console.error(`[ingest_local_pdfs] Error: ${err.message}`);
      process.exit(1);
    });
}
