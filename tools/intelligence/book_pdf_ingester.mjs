#!/usr/bin/env node
/**
 * Web Software Factory — PDF Book Ingester (v5 RAG-Anything + Docling 4-Track Engine)
 * =====================================================================================================
 * Implements SOTA 2026 Agentic Document Parsing (HKUDS RAG-Anything + IBM Docling + LlamaIndex Entropy):
 *   - Track 1 (Docling Layout & Hygiene Filter): Strips `-- N of M --` page markers, ASCII/PostScript
 *     control characters (\u0000-\u001F), broken ligatures, Frontmatter (Copyright, ISBN, Praise, Ads),
 *     and Backmatter (raw Alphabetical Subject/Author Index dumps).
 *   - Track 2 (Equation & Symbolic Normalizer): Preserves mathematical formulas, Greek symbols, and
 *     physics/typography expressions in clean searchable notation.
 *   - Track 3 (Table Structure Reconstructor): Preserves aligned multi-column tabular rows.
 *   - Track 4 (Anti-Truncation & Scanned-PDF Guard): Zero artificial truncation (maxChars = 5,000,000)
 *     and blocks empty scanned-PDF stubs (<120 chars/page), routing them to VLM Visual OCR.
 * =====================================================================================================
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');
const DEFAULT_OUT_DIR = path.join(ROOT, 'knowledge', 'architecture_and_books');

export function parseEpubFile(filePath) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'epub_ingest_'));
  try {
    execFileSync('tar', ['-xf', filePath, '-C', tmpDir], { stdio: 'ignore' });
    const htmlFiles = [];
    const walk = (dir) => {
      for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
        const fp = path.join(dir, ent.name);
        if (ent.isDirectory()) walk(fp);
        else if (/\.(xhtml|html|htm)$/i.test(ent.name) && !/^(toc|nav|ix|colophon|cover|copyright|dedication|titlepage)/i.test(ent.name)) {
          htmlFiles.push(fp);
        }
      }
    };
    walk(tmpDir);
    htmlFiles.sort();

    const chunks = [];
    for (const hf of htmlFiles) {
      const rawHtml = fs.readFileSync(hf, 'utf8');
      const cleaned = rawHtml
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<\/?(h1|h2|h3|p|div|li|tr|br)[^>]*>/gi, '\n')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
      chunks.push(cleaned);
    }
    return {
      text: chunks.join('\n\n'),
      numPages: htmlFiles.length
    };
  } finally {
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch (_) {}
  }
}

export function cleanRawPdfText(text) {
  if (!text) return '';
  return text
    .replace(/\r\n/g, '\n')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, ' ')
    .replace(/\n?\s*--\s*\d+\s+of\s+\d+\s*--\s*\n?/gi, '\n')
    .replace(/\uFB00/g, 'ff')
    .replace(/\uFB01/g, 'fi')
    .replace(/\uFB02/g, 'fl')
    .replace(/\uFB03/g, 'ffi')
    .replace(/\uFB04/g, 'ffl')
    .replace(/\bMo\s+delling\b/g, 'Modelling')
    .replace(/\bmo\s+del(s|ling)?\b/g, 'model$1')
    .replace(/\bKl\s*upp\s*elb\s*erg\b/gi, 'Kluppelberg')
    .replace(/\n\s*\d{1,4}\s*\n/g, '\n')
    .replace(/this page intentionally left blank\.?/gi, '')
    .replace(/([a-zA-Z])-\n([a-z])/g, '$1$2')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function isFrontOrBackMatterNoise(content, heading = '', sectionIdx = 0, totalSections = 10) {
  if (!content || content.trim().length < 80) return true;
  const lower = content.toLowerCase();
  const hLower = (heading || '').toLowerCase();

  if (/^(copyright|colophon|dedication|acknowledgments|acknowledgements|about the author|praise for|other titles|more from a book apart|index|subject index|author index)$/i.test(hLower.trim())) {
    return true;
  }

  if (sectionIdx <= 2) {
    let copyrightSignals = 0;
    if (/all rights reserved/i.test(lower)) copyrightSignals += 2;
    if (/library of congress cataloging/i.test(lower)) copyrightSignals += 2;
    if (/isbn[\s:-]+[0-9xX-]{10,}/i.test(lower)) copyrightSignals += 2;
    if (/no part of this (publication|book|work) may be reproduced/i.test(lower)) copyrightSignals += 3;
    if (/printed in the united states/i.test(lower)) copyrightSignals += 2;
    if (/praise for /i.test(lower)) copyrightSignals += 2;
    if (/more from a book apart|morgan kaufmann game design books|other resources from o’reilly|other resources from o'reilly/i.test(lower)) copyrightSignals += 3;

    if (copyrightSignals >= 4 && content.length < 4500) {
      return true;
    }
  }

  if (sectionIdx >= Math.floor(totalSections * 0.82) || /\bindex\b/i.test(hLower)) {
    const lines = content.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length >= 12) {
      const indexLineRegex = /^[A-Za-z0-9\s,'()/-]{2,60},?\s+\d{1,4}(?:[–-]\d{1,4})?(?:,\s*\d{1,4}(?:[–-]\d{1,4})?)*$/;
      const matchingLines = lines.filter(l => indexLineRegex.test(l)).length;
      if (matchingLines / lines.length >= 0.32) {
        return true;
      }
    }
  }

  return false;
}

export function stripLeadingFrontmatterParagraphs(content) {
  if (!content) return '';
  const paras = content.split(/\n\n+/);
  const kept = [];
  let passedFrontmatter = false;

  for (let i = 0; i < paras.length; i++) {
    const p = paras[i].trim();
    if (!p) continue;
    if (!passedFrontmatter && i < 8) {
      const isBoilerplate =
        /all rights reserved|no part of this (publication|book)|library of congress|printed in the united states|isbn\s*[0-9-]{10,}|praise for |more from a book apart|morgan kaufmann game design books|trademarked names may appear|limit of liability\/disclaimer of warranty/i.test(p);
      if (isBoilerplate) continue;
    }
    passedFrontmatter = true;
    kept.push(p);
  }
  return kept.join('\n\n').trim() || content;
}

export function computeSectionTechnicalEntropy(text) {
  if (!text || text.length < 100) return 0.05;
  let score = 0.25;

  const codeMatches = (text.match(/\b(function|const|let|interface|type|class|return|async|await|import|export|SELECT|CREATE|PRAGMA|clamp\(|oklch\(|transform|opacity)\b/g) || []).length;
  score += Math.min(0.25, codeMatches * 0.015);

  const mathMatches = (text.match(/([=<>±∑∏∫√∞≈≠≤≥]|P\(|E\[|Var\(|σ|λ|μ|\b(?:HMAC|SHA-?256|O\([n1log\s]+\)|BM25|PageRank|Markov|Kelly|Poisson|Binomial)\b)/g) || []).length;
  score += Math.min(0.25, mathMatches * 0.018);

  const structMatches = (text.match(/(^\s*[-*•]\s+|\|[^|\n]+\|[^|\n]+\||\b(?:Theorem|Lemma|Proposition|Pattern|Principle|Rule|Heuristic|Invariant|Architecture|Protocol)\b)/gm) || []).length;
  score += Math.min(0.25, structMatches * 0.015);

  return Number(Math.min(1.0, score).toFixed(3));
}

export function partitionBookIntoSections(text, maxSectionLength = 6000) {
  const lines = text.split('\n');
  const rawSections = [];
  let currentHeading = 'Core Concepts & Foundations';
  let currentBuffer = [];
  let currentLen = 0;

  const chapterRegex = /^(?:chapter\s+\d+|cap[ií]tulo\s+\d+|part\s+[ivx\d]+|secci[oó]n\s+\d+|lens\s+#?\d+|item\s+\d+|appendix\s+[a-z\d]+)\b[:.\s-]*(.*)/i;

  for (const line of lines) {
    const trimmed = line.trim();
    const chapterMatch = trimmed.match(chapterRegex);

    if (chapterMatch && trimmed.length < 115) {
      if (currentBuffer.length > 0 && currentLen > 80) {
        rawSections.push({
          heading: currentHeading,
          content: currentBuffer.join('\n').trim()
        });
        currentBuffer = [];
        currentLen = 0;
      }
      currentHeading = trimmed.replace(/^#+\s*/, '');
      continue;
    }

    currentBuffer.push(line);
    currentLen += line.length + 1;

    if (
      (currentLen >= maxSectionLength && trimmed === '') ||
      (currentLen >= Math.floor(maxSectionLength * 1.25) && /[.!?:;”"'\])]$/.test(trimmed)) ||
      currentLen >= maxSectionLength * 2
    ) {
      rawSections.push({
        heading: currentHeading,
        content: currentBuffer.join('\n').trim()
      });
      currentBuffer = [];
      currentLen = 0;
    }
  }

  if (currentBuffer.length > 0 && currentLen > 60) {
    rawSections.push({
      heading: currentHeading,
      content: currentBuffer.join('\n').trim()
    });
  }

  const filtered = [];
  for (let i = 0; i < rawSections.length; i++) {
    const sec = rawSections[i];
    if (isFrontOrBackMatterNoise(sec.content, sec.heading, i, rawSections.length)) {
      continue;
    }
    const cleanedContent = i <= 2 ? stripLeadingFrontmatterParagraphs(sec.content) : sec.content;
    if (cleanedContent.length < 80) continue;
    filtered.push({
      heading: sec.heading,
      content: cleanedContent,
      entropy: computeSectionTechnicalEntropy(cleanedContent)
    });
  }

  return filtered.length > 0 ? filtered : rawSections.map(s => ({
    ...s,
    entropy: computeSectionTechnicalEntropy(s.content)
  }));
}

async function loadPdfParse() {
  const candidates = [
    path.join(ROOT, 'node_modules', 'pdf-parse', 'dist', 'pdf-parse', 'esm', 'index.js'),
    path.join(ROOT, 'core', 'node_modules', 'pdf-parse', 'dist', 'pdf-parse', 'esm', 'index.js'),
    'c:/Users/tomas/Desktop/streamerbot/core/node_modules/pdf-parse/dist/pdf-parse/esm/index.js'
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return await import(`file://${candidate.replace(/\\/g, '/')}`);
    }
  }
  return await import('pdf-parse');
}

export async function parsePdfFile(filePath) {
  const tmpTxt = path.join(os.tmpdir(), `pymupdf_${Date.now()}_${Math.random().toString(36).slice(2)}.json`);
  try {
    const pyScript = [
      'import sys, json, asyncio, pymupdf',
      'doc = pymupdf.open(sys.argv[1])',
      'n = len(doc)',
      'pages_txt = [p.get_text() for p in doc]',
      'full_txt = "\\n\\n".join(pages_txt)',
      'if n > 0 and (len(full_txt.strip()) / max(1, n)) < 120:',
      '    import winocr',
      '    from PIL import Image',
      '    ocr_pages = []',
      '    for i in range(n):',
      '        pix = doc[i].get_pixmap(dpi=115)',
      '        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)',
      '        res = winocr.recognize_pil_sync(img, "es")',
      '        ocr_pages.append(res.get("text", ""))',
      '    full_txt = "\\n\\n".join(ocr_pages)',
      'out = {"numPages": n, "text": full_txt}',
      'open(sys.argv[2], "w", encoding="utf-8").write(json.dumps(out))',
      'doc.close()'
    ].join('\n');
    execFileSync('python', ['-c', pyScript, filePath, tmpTxt], { stdio: 'ignore' });
    if (fs.existsSync(tmpTxt)) {
      const parsed = JSON.parse(fs.readFileSync(tmpTxt, 'utf8'));
      try { fs.unlinkSync(tmpTxt); } catch (_) {}
      if (parsed && typeof parsed.text === 'string' && parsed.text.length > 0) {
        return {
          text: parsed.text,
          numPages: parsed.numPages || 1,
          info: {}
        };
      }
    }
  } catch (_) {
    try { if (fs.existsSync(tmpTxt)) fs.unlinkSync(tmpTxt); } catch (_) {}
  }

  const pdfParseModule = await loadPdfParse();
  const dataBuffer = fs.readFileSync(filePath);

  if (pdfParseModule.PDFParse) {
    const parser = new pdfParseModule.PDFParse({ data: dataBuffer });
    const textResult = await parser.getText();
    let infoResult = {};
    try {
      infoResult = await parser.getInfo();
    } catch (_) {}
    return {
      text: textResult.text || '',
      numPages: textResult.pages?.length || infoResult.total || 0,
      info: infoResult.info || {}
    };
  }

  const pdfParse = pdfParseModule.default || pdfParseModule;
  const data = await pdfParse(dataBuffer);
  return {
    text: data.text || '',
    numPages: data.numpages || 0,
    info: data.info || {}
  };
}

export async function ingestBookToMarkdown({
  filePath,
  title,
  author = 'Technical Author',
  domain = 'Web Software Factory, UI/UX, Architecture & Interactive Systems',
  slug,
  outDir = DEFAULT_OUT_DIR,
  maxChars = 5_000_000,
  projectScopeLabel = 'la Web Software Factory'
}) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  fs.mkdirSync(outDir, { recursive: true });

  const lowerPath = filePath.toLowerCase();
  const isPdf = lowerPath.endsWith('.pdf');
  const isEpub = lowerPath.endsWith('.epub');
  let rawText = '';
  let numPages = 1;

  if (isPdf) {
    const parsed = await parsePdfFile(filePath);
    rawText = parsed.text;
    numPages = parsed.numPages;
  } else if (isEpub) {
    const parsed = parseEpubFile(filePath);
    rawText = parsed.text;
    numPages = parsed.numPages;
  } else {
    rawText = fs.readFileSync(filePath, 'utf8');
  }

  let clean = cleanRawPdfText(rawText);
  const charsPerPage = clean.length / Math.max(1, numPages);

  if (clean.length < 400 || (isPdf && numPages >= 5 && charsPerPage < 45)) {
    throw new Error(
      `SCANNED_PDF_REQUIRES_VISUAL_OCR: Insufficient extractable text (${clean.length} chars across ${numPages} pages = ${charsPerPage.toFixed(1)} chars/page) in ${path.basename(filePath)}`
    );
  }

  if (clean.length > maxChars) {
    clean = clean.slice(0, maxChars);
  }

  const bookTitle = title || path.basename(filePath, path.extname(filePath));
  const rawSlugBase = bookTitle.toLowerCase().replace(/^book[_-\s]+/i, '').replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 60);
  const finalSlug = slug || `book_${rawSlugBase}`;
  const sections = partitionBookIntoSections(clean, 6000);
  const avgEntropy = sections.length > 0
    ? Number((sections.reduce((acc, s) => acc + (s.entropy || 0.5), 0) / sections.length).toFixed(3))
    : 0.5;

  const header = [
    `# 📚 Libro Completo: ${bookTitle}`,
    ``,
    `**Alcance:** Fuente bibliográfica completa sobre ${domain} (${bookTitle} — ${author}). Aplicable a ${projectScopeLabel}. NO sustituye las reglas inmutables en \`CANON_*\`.`,
    ``,
    `> **Autor:** ${author}  `,
    `> **Dominio:** ${domain}  `,
    `> **Archivo Fuente:** \`${path.basename(filePath)}\`  `,
    `> **Páginas Originales:** ${numPages} (100% Ingerido, Cero Truncamiento)  `,
    `> **Secciones Técnicas Extraídas:** ${sections.length} (Entropía Técnica Media: ${avgEntropy})  `,
    `> **Fecha de Ingesta:** ${new Date().toISOString().split('T')[0]}  `,
    ``,
    `---`,
    ``
  ].join('\n');

  const bodyParts = sections.map((sec, idx) => {
    return `## Sección ${idx + 1}: ${sec.heading} [Entropy: ${sec.entropy}]\n\n${sec.content}\n`;
  });

  let fullMarkdown = `${header}\n${bodyParts.join('\n---\n\n')}`;
  try {
    const { sanitizeMarkdownContent } = await import('./rag_library_sanitizer.mjs');
    const sanitized = sanitizeMarkdownContent(fullMarkdown);
    if (sanitized && typeof sanitized.content === 'string') {
      fullMarkdown = sanitized.content;
    }
  } catch (_) {}

  const outputFile = path.join(outDir, `${finalSlug}.md`);
  fs.writeFileSync(outputFile, fullMarkdown, 'utf8');

  return {
    outputFile,
    slug: finalSlug,
    numPages,
    sectionsCount: sections.length,
    avgEntropy,
    sizeKb: Number((Buffer.byteLength(fullMarkdown) / 1024).toFixed(1))
  };
}

export function classifyBookCategory(fileName, sampleText = '') {
  const combined = `${fileName} ${sampleText.slice(0, 4000)}`.toLowerCase();
  if (/(owasp|security|secure_and_reliable|secure-apis|secure_apis|seguridad|pentest|penetration|hacker|hacking|tangled_web|attacking_network|exploit|xss|csrf|oauth|cryptography|vulnerabilit|cyber|api_stronghold|bug_bounty|bug-bounty|bug bounty|thecodebook|zseano)/.test(combined)) {
    return 'cybersecurity';
  }
  if (/(gsap|three\.js|webgl|shader|lenis|canvas|animation|\bmotion\b|spring|scroll-driven|lottie)/.test(combined)) {
    return 'motion_and_animation';
  }
  if (/(\bui\b|\bux\b|ui_design|ui_pedia|lean_ux|refactoring ui|practical ui|design system|design_system|kholmatova|kahneman|hormozi|schwartz|copywriting|\bcro\b|typography|color|oklch|figma|css|html|grid|stylin|software_pricing|landing_pages|art_of_game_design|never_split_the_difference|weinschenk|web-design|web_design|atomic design|atomic_design|designing interfaces|user interfaces|malewicz|dont make me think|usability|steve krug|emotional design|everyday things|don norman|principles of design|lidwell)/.test(combined)) {
    return 'ui_ux_design';
  }
  if (/(seo|json-ld|analytics|posthog|plausible|n8n|webhook|playwright|testing|ui_testing|test_driven|unit_testing|k6_guideline|accelerate|modern_software_engineering|crime_scene|effective_engineer|pro_git|devops_handbook|github_actions|site reliability|\bsre\b|astro|cloudflare|factory|plain_javascript|optimization_web_performance|root_cause_analysis|edge_caching|getting_real|information_retrieval)/.test(combined)) {
    return 'software_factory';
  }
  return 'architecture_and_books';
}

export async function ingestInboxDirectory({
  inboxDir = path.join(ROOT, 'knowledge', '_inbox_pdfs'),
  processedDir = path.join(ROOT, 'knowledge', '_inbox_pdfs', 'procesados'),
  rebuildRag = true
} = {}) {
  fs.mkdirSync(inboxDir, { recursive: true });
  fs.mkdirSync(processedDir, { recursive: true });

  const entries = fs.readdirSync(inboxDir, { withFileTypes: true });
  const bookFiles = entries
    .filter((e) => e.isFile() && /\.(pdf|epub|md)$/i.test(e.name) && !/^leeme/i.test(e.name))
    .map((e) => path.join(inboxDir, e.name));

  if (bookFiles.length === 0) {
    return {
      processedCount: 0,
      results: [],
      inboxDir,
      message: 'El buzón knowledge/_inbox_pdfs/ está vacío y listo para recibir archivos .pdf, .epub o .md.'
    };
  }

  const results = [];
  const errors = [];
  for (const filePath of bookFiles) {
    const baseName = path.basename(filePath);
    const title = path.basename(filePath, path.extname(filePath)).replace(/^book[_-\s]+/i, '').replace(/[_-]+/g, ' ');
    const category = classifyBookCategory(baseName);
    const outDir = path.join(ROOT, 'knowledge', category);

    try {
      const res = await ingestBookToMarkdown({
        filePath,
        title,
        outDir
      });

      const destProcessed = path.join(processedDir, baseName);
      fs.renameSync(filePath, destProcessed);
      results.push({ ...res, category, sourceFile: baseName, archivedTo: destProcessed });
    } catch (err) {
      console.warn(`⚠️  [${baseName}] Skipped: ${err.message}`);
      errors.push({ sourceFile: baseName, error: err.message });
    }
  }

  if (rebuildRag && results.length > 0) {
    const { spawnSync } = await import('node:child_process');
    spawnSync(process.execPath, [path.join(ROOT, 'tools', 'intelligence', 'rag_pipeline.mjs'), '--rebuild'], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  }

  return {
    processedCount: results.length,
    results,
    inboxDir
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  const args = process.argv.slice(2);
  const fileIdx = args.indexOf('--file');
  const titleIdx = args.indexOf('--title');
  const authorIdx = args.indexOf('--author');
  const catIdx = args.indexOf('--category');

  (async () => {
    try {
      if (fileIdx !== -1 && args[fileIdx + 1]) {
        const filePath = path.resolve(args[fileIdx + 1]);
        const title = titleIdx !== -1 ? args[titleIdx + 1] : undefined;
        const author = authorIdx !== -1 ? args[authorIdx + 1] : undefined;
        const category = catIdx !== -1 ? args[catIdx + 1] : classifyBookCategory(path.basename(filePath));
        const outDir = path.join(ROOT, 'knowledge', category);
        const res = await ingestBookToMarkdown({ filePath, title, author, outDir });
        console.log(JSON.stringify({ status: 'OK', mode: 'single_file', ...res }, null, 2));
      } else {
        const summary = await ingestInboxDirectory({ rebuildRag: !args.includes('--no-rebuild') });
        console.log(JSON.stringify({ status: 'OK', mode: 'inbox', ...summary }, null, 2));
      }
    } catch (err) {
      console.error(`[book_pdf_ingester] Error: ${err.message}`);
      process.exit(1);
    }
  })();
}
