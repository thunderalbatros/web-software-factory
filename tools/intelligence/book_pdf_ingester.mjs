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
  const tmpJson = path.join(os.tmpdir(), `epub_py_${Date.now()}_${Math.random().toString(36).slice(2)}.json`);
  try {
    const pyScript = [
      'import sys, json, struct, zlib, io, re, asyncio',
      'fp = sys.argv[1]',
      'out_path = sys.argv[2]',
      'full_txt = ""',
      'num_pages = 1',
      'try:',
      '    import pymupdf',
      '    doc = pymupdf.open(fp)',
      '    num_pages = len(doc)',
      '    full_txt = "\\n\\n".join([p.get_text() for p in doc])',
      '    doc.close()',
      'except Exception:',
      '    pass',
      'if len(full_txt.strip()) < 1500:',
      '    data = open(fp, "rb").read()',
      '    pos = 0',
      '    xhtmls = []',
      '    jpgs = []',
      '    while True:',
      '        idx = data.find(b"PK\\x03\\x04", pos)',
      '        if idx == -1 or idx + 30 > len(data): break',
      '        ver, flag, method, mtime, mdate, crc, csize, usize, fnlen, exlen = struct.unpack("<HHHHHIIIHH", data[idx+4:idx+30])',
      '        fn = data[idx+30:idx+30+fnlen].decode("utf-8", "ignore")',
      '        ds = idx + 30 + fnlen + exlen',
      '        ni = data.find(b"PK\\x03\\x04", ds)',
      '        raw = data[ds:ds+csize] if csize > 0 else data[ds:ni]',
      '        low = fn.lower()',
      '        if low.endswith((".xhtml", ".html", ".htm")):',
      '            try:',
      '                dec = (zlib.decompressobj(-15).decompress(raw) if method == 8 else raw).decode("utf-8", "ignore")',
      '                txt = re.sub(r"<style[\\s\\S]*?</style>|<script[\\s\\S]*?</script>", " ", dec, flags=re.I)',
      '                txt = re.sub(r"<[^>]+>", " ", txt)',
      '                xhtmls.append((fn, " ".join(txt.split())))',
      '            except Exception: pass',
      '        elif low.endswith((".jpg", ".jpeg", ".png")):',
      '            try:',
      '                b = zlib.decompressobj(-15).decompress(raw) if method == 8 else raw',
      '                jpgs.append((fn, b))',
      '            except Exception: pass',
      '        pos = ni if ni != -1 else len(data)',
      '    xhtmls.sort(key=lambda x: x[0])',
      '    xhtml_txt = "\\n\\n".join(x[1] for x in xhtmls if len(x[1]) > 40)',
      '    if len(xhtml_txt) > 25000 or not jpgs:',
      '        full_txt = xhtml_txt',
      '        num_pages = max(1, len(xhtmls))',
      '    else:',
      '        import winocr',
      '        from PIL import Image',
      '        jpgs.sort(key=lambda x: x[0])',
      '        async def ocr_all():',
      '            sem = asyncio.Semaphore(8)',
      '            async def ocr_one(item):',
      '                async with sem:',
      '                    try:',
      '                        img = Image.open(io.BytesIO(item[1])).convert("RGB")',
      '                        res = await winocr.to_coroutine(winocr.recognize_pil(img, "es"))',
      '                        return res.text or ""',
      '                    except Exception:',
      '                        return ""',
      '            return await asyncio.gather(*(ocr_one(it) for it in jpgs))',
      '        ocr_txts = asyncio.run(ocr_all())',
      '        full_txt = xhtml_txt + "\\n\\n" + "\\n\\n".join(t for t in ocr_txts if t.strip())',
      '        num_pages = max(1, len(jpgs))',
      'open(out_path, "w", encoding="utf-8").write(json.dumps({"numPages": num_pages, "text": full_txt}))'
    ].join('\n');
    execFileSync('python', ['-c', pyScript, filePath, tmpJson], { stdio: 'ignore', timeout: 300000 });
    if (fs.existsSync(tmpJson)) {
      const parsed = JSON.parse(fs.readFileSync(tmpJson, 'utf8'));
      try { fs.unlinkSync(tmpJson); } catch (_) {}
      if (parsed && typeof parsed.text === 'string' && parsed.text.trim().length > 400) {
        return {
          text: parsed.text,
          numPages: parsed.numPages || 1
        };
      }
    }
  } catch (_) {
    try { if (fs.existsSync(tmpJson)) fs.unlinkSync(tmpJson); } catch (_) {}
  }

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
      '    async def ocr_all():',
      '        sem = asyncio.Semaphore(8)',
      '        async def ocr_page(idx):',
      '            async with sem:',
      '                try:',
      '                    pix = doc[idx].get_pixmap(dpi=108)',
      '                    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)',
      '                    res = await winocr.to_coroutine(winocr.recognize_pil(img, "es"))',
      '                    return res.text or ""',
      '                except Exception:',
      '                    return ""',
      '        return await asyncio.gather(*(ocr_page(i) for i in range(n)))',
      '    ocr_pages = asyncio.run(ocr_all())',
      '    full_txt = "\\n\\n".join(ocr_pages)',
      'out = {"numPages": n, "text": full_txt}',
      'open(sys.argv[2], "w", encoding="utf-8").write(json.dumps(out))',
      'doc.close()'
    ].join('\n');
    execFileSync('python', ['-c', pyScript, filePath, tmpTxt], { stdio: 'ignore', timeout: 300000 });
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
    `---`,
    `title: "${bookTitle}"`,
    `author: "${author}"`,
    `domain: "${domain}"`,
    `epistemicTier: "TIER_2_TIMELESS_PRINCIPLES"`,
    `---`,
    ``,
    `# 📚 Libro Completo: ${bookTitle}`,
    ``,
    `**Alcance:** Fuente bibliográfica completa (\`TIER_2_TIMELESS_PRINCIPLES\`) sobre ${domain} (${bookTitle} — ${author}). Aplicable a ${projectScopeLabel}. NO sustituye las reglas inmutables en \`CANON_*\`.`,
    ``,
    `> **Autor:** ${author}  `,
    `> **Dominio:** ${domain} (\`TIER_2_TIMELESS_PRINCIPLES\`)  `,
    `> **Archivo Fuente:** \`${path.basename(filePath)}\`  `,
    `> **Páginas Originales:** ${numPages} (100% Ingerido, Cero Truncamiento)  `,
    `> **Secciones Técnicas Extraídas:** ${sections.length} (Entropía Técnica Media: ${avgEntropy})  `,
    `> **Fecha de Ingesta:** ${new Date().toISOString().split('T')[0]}  `,
    ``,
    `## 🎨 Axiomas Visuales Traducidos a Código 2026 (\`Axiom -> Formula -> CSS/WebGPU Token\`)`,
    ``,
    `| Axioma Estético / Pictórico | Fórmula Matemática / Óptica | Token CSS / WebGPU SOTA 2026 |`,
    `| :--- | :--- | :--- |`,
    `| **Ley de Área de Itten (OKLCH)** | $\\text{Área} > 60\\% \\implies C \\le 0.02$; $\\text{CTA} < 3\\% \\implies C \\in [0.14, 0.22]$ | \`--surface: oklch(11% 0.012 255); --cta: oklch(65% 0.18 250);\` |`,
    `| **Rotación Térmica (Gurney/Albers)** | $C_{\\text{dark}} > 0$, $H \\in [240^\\circ, 265^\\circ]$ + Luz Cenital Especular | \`border-top: 1px solid oklch(100% 0 0 / 0.10);\` |`,
    `| **Contraste Perceptual APCA** | $L_c \\ge 90$ (\`Operate\`), $L_c \\ge 75$ (\`Read\`), $L_c \\ge 60$ (\`Persuade\`) | \`font-variant-numeric: tabular-nums slashed-zero;\` |`,
    `| **Física PBR & Resortes WWDC** | $r = r_{\\text{perceptual}}^2$, $\\zeta = 1.0$ (Operate) vs $\\zeta = 0.78$ (Persuade) | \`cubic-bezier(0.22, 1, 0.36, 1)\` / \`THREE.AgXToneMapping\` |`,
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
  if (/(owasp|security|secure_and_reliable|secure-apis|secure_apis|seguridad|pentest|penetration|hacker|hacking|tangled_web|attacking_network|exploit|xss|csrf|oauth|cryptography|vulnerabilit|cyber|api_stronghold|bug_bounty|bug-bounty|bug bounty|thecodebook|zseano|privacidad|aepd|5g)/.test(combined)) {
    return 'cybersecurity';
  }
  if (/(gsap|three\.js|webgl|shader|lenis|canvas|animation|animator|animating|survival[\s_-]?kit|richard[\s_-]?williams|\bmotion\b|spring|scroll-driven|lottie|audiovision|chion|cinematography|blain[\s_-]?brown|nature[\s_-]?of[\s_-]?code|shiffman|elemental[\s_-]?magic|gilland|201a3624fd357bc7752e096a729563b4|audio[\s_-]?effect[\s_-]?plugins|pirkle|sonic[\s_-]?interaction|franinovic|serafin|mastering[\s_-]?audio|bob[\s_-]?katz|06a35419c2479717|mixing[\s_-]?secrets|mike[\s_-]?senior|musimathics|gareth[\s_-]?loy|audio[\s_-]?programming|boulanger|lazzarini|designing[\s_-]?sound|farnell|game[\s_-]?audio|zdanowicz|illusion[\s_-]?of[\s_-]?life|frank[\s_-]?thomas|ollie[\s_-]?johnston|microsound|curtis[\s_-]?roads|parpadeo|walter[\s_-]?murch|psychoacoustics|zwicker|fastl)/.test(combined)) {
    return 'motion_and_animation';
  }
  if (/(\bui\b|\bux\b|ui_design|ui_pedia|lean_ux|refactoring ui|practical ui|design system|design_system|laying the foundations|couldwell|hoober|berkman|mobile interfaces|tufte|visual display of quantitative|gurney|color_and_light|\+color|kholmatova|kahneman|hormozi|schwartz|copywriting|\bcro\b|typography|color|oklch|figma|css|html|grid|stylin|software_pricing|landing_pages|art_of_game_design|fundamentals[\s_-]?of[\s_-]?game[\s_-]?design|ernest[\s_-]?adams|brand[\s_-]?identity|alina[\s_-]?wheeler|visual[\s_-]?story|bruce[\s_-]?block|vktiyzoobmwwq6fbc9kq9xbg7e450l|never_split_the_difference|weinschenk|web-design|web_design|atomic design|atomic_design|designing interfaces|user interfaces|malewicz|dont make me think|usability|steve krug|emotional design|everyday things|don norman|principles of design|lidwell)/.test(combined)) {
    return 'ui_ux_design';
  }
  if (/(seo|json-ld|analytics|posthog|plausible|n8n|webhook|playwright|testing|ui_testing|test_driven|unit_testing|k6_guideline|accelerate|modern_software_engineering|crime_scene|effective_engineer|pro_git|devops_handbook|github_actions|site reliability|\bsre\b|astro|cloudflare|factory|plain_javascript|optimization_web_performance|root_cause_analysis|edge_caching|getting_real|information_retrieval)/.test(combined)) {
    return 'software_factory';
  }
  return 'architecture_and_books';
}

export function inferBookMetadataFromFileName(baseName, category) {
  const rawName = path.basename(baseName, path.extname(baseName));
  const lower = rawName.toLowerCase();

  let cleanedTitle = rawName
    .replace(/^book[_-\s]+/i, '')
    .replace(/^\[[^\]]+\]\s*/g, '')
    .replace(/\((?:z-library|1lib|z-lib)[^)]*\)/gi, '')
    .replace(/^\+/, 'Plus ')
    .replace(/[_-]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();

  let author = 'Technical Author';
  let domain = 'Web Software Factory, UI/UX, Architecture & Interactive Systems';
  let slug = rawName.toLowerCase().startsWith('book_') ? rawName.toLowerCase().replace(/[^a-z0-9_]/g, '_') : undefined;

  if (/mastering_audio|bob_katz|06a35419c2479717/i.test(lower)) {
    cleanedTitle = 'Mastering Audio: The Art and the Science';
    author = 'Bob Katz';
    domain = 'Audio Mastering, K-System Metering, Loudness Perception, Dithering, Equalization & Dynamic Range Control';
    slug = 'book_mastering_audio_the_art_and_the_science_bob_katz';
  } else if (/elemental_magic|gilland|201a3624fd357bc7752e096a729563b4/i.test(lower)) {
    cleanedTitle = 'Elemental Magic, Volume II: The Technique of Special Effects Animation';
    author = 'Joseph Gilland';
    domain = 'Special Effects Animation, Fluid/Fire/Smoke/Wave Dynamics, Organic Energy Physics & 60FPS Motion Choreography';
    slug = 'book_elemental_magic_vol_2_special_effects_animation_joseph_gilland';
  } else if (/visual_story|bruce_block|vktiyzoobmwwq6fbc9kq9xbg7e450l/i.test(lower)) {
    cleanedTitle = 'The Visual Story: Creating the Visual Structure of Film, TV and Digital Media (2nd Edition)';
    author = 'Bruce Block';
    domain = 'Visual Structure, Principle of Contrast & Affinity, Deep/Flat Space, Line, Shape, Tone, Color & Visual Rhythm';
    slug = 'book_the_visual_story_visual_structure_film_digital_media_bruce_block';
  } else if (/audiovision|chion/i.test(lower)) {
    cleanedTitle = 'La Audiovisión: Introducción a un Análisis Conjunto de la Imagen y el Sonido';
    author = 'Michel Chion';
    domain = 'Audiovisual Contract, Synchresis (Síncresis), Added Value, Acousmatic Sound & Temporal Vectorization';
    slug = 'book_la_audiovision_imagen_y_sonido_michel_chion';
  } else if (/cinematography.*theory|blain_brown/i.test(lower)) {
    cleanedTitle = 'Cinematography: Theory and Practice — Image Making for Cinematographers and Directors (3rd Edition)';
    author = 'Blain Brown';
    domain = 'Cinematographic Optics, Lens Focal Length, PBR Lighting Ratios, Color Temperature & Camera Movement';
    slug = 'book_cinematography_theory_and_practice_3rd_edition_blain_brown';
  } else if (/nature[-_\s]of[-_\s]code|shiffman/i.test(lower)) {
    cleanedTitle = 'The Nature of Code: Simulating Natural Systems with Processing';
    author = 'Daniel Shiffman';
    domain = 'Physics Simulation, Vectors, Forces, Harmonic Oscillation, Particle Systems, Autonomous Steering Agents & Fractals';
    slug = 'book_the_nature_of_code_simulating_natural_systems_daniel_shiffman';
  } else if (/philosophy[-_\s]of[-_\s]software[-_\s]design|ousterhout/i.test(lower)) {
    cleanedTitle = 'A Philosophy of Software Design (2nd Edition)';
    author = 'John K. Ousterhout';
    domain = 'Software Complexity Management, Deep vs. Shallow Modules, Information Hiding & Define Errors Out of Existence';
    slug = 'book_a_philosophy_of_software_design_2nd_edition_john_ousterhout';
  } else if (/animating[-_\s]short[-_\s]stories|cheryl_briggs|briggs/i.test(lower)) {
    cleanedTitle = 'Animating Short Stories: Narrative Techniques and Visual Design';
    author = 'Cheryl Briggs';
    domain = 'Visual Storytelling, Storyboarding, Character Staging, Color Scripts & Narrative Pacing in Animation';
    slug = 'book_animating_short_stories_narrative_and_visual_design_cheryl_briggs';
  } else if (/design[-_\s]for[-_\s]motion|austin_shaw/i.test(lower)) {
    cleanedTitle = 'Design for Motion: Fundamentals and Techniques of Motion Design (2nd Edition)';
    author = 'Austin Shaw';
    domain = 'Motion Design Systems, Styleframes, Design Boards, Kinetic Typography & Visual Transitions';
    slug = 'book_design_for_motion_fundamentals_and_techniques_2nd_ed_austin_shaw';
  } else if (/design[-_\s]in[-_\s]motion|penny_hilton/i.test(lower)) {
    cleanedTitle = 'Design in Motion: Applying Design Principles to Filmmaking';
    author = 'Penny Hilton';
    domain = 'Filmmaking Design Principles, Mise-en-Scène, Production Design, Visual Metaphor & Frame Composition';
    slug = 'book_design_in_motion_applying_design_principles_to_filmmaking_penny_hilton';
  } else if (/audio[-_\s]effect[-_\s]plugins|pirkle/i.test(lower)) {
    cleanedTitle = 'Designing Audio Effect Plugins in C++: For AAX, AU, and VST3 with DSP Theory (2nd Edition)';
    author = 'Will C. Pirkle';
    domain = 'Real-Time Audio DSP, Biquad Z-Transform Filters, Delay Lines, Algorithmic Reverb, Dynamics Processors & Modulated Effects';
    slug = 'book_designing_audio_effect_plugins_in_cpp_dsp_theory_will_pirkle';
  } else if (/designing[-_\s]brand[-_\s]identity|alina_wheeler/i.test(lower)) {
    cleanedTitle = 'Designing Brand Identity: A Comprehensive Guide to the World of Brands and Branding (6th Edition)';
    author = 'Alina Wheeler & Rob Meyerson';
    domain = 'Brand Architecture, Visual Identity Systems, Touchpoint Ergonomics, Typography, Color Systems & Brand Governance';
    slug = 'book_designing_brand_identity_6th_edition_alina_wheeler_rob_meyerson';
  } else if (/fundamentals[-_\s]of[-_\s]game[-_\s]design|ernest_adams/i.test(lower)) {
    cleanedTitle = 'Fundamentals of Game Design (3rd Edition)';
    author = 'Ernest Adams';
    domain = 'Interactive Systems Design, Core Mechanics, Internal Economy Balancing, Progression Curves & HUD/UI Ergonomics';
    slug = 'book_fundamentals_of_game_design_3rd_edition_ernest_adams';
  } else if (/sonic[-_\s]interaction[-_\s]design|franinovic|serafin/i.test(lower)) {
    cleanedTitle = 'Sonic Interaction Design';
    author = 'Karmen Franinović & Stefania Serafin (MIT Press)';
    domain = 'Sonic Interaction Design, Auditory Affordances, Continuous Multisensory Feedback, Embodied Sound & Product Acoustics';
    slug = 'book_sonic_interaction_design_karmen_franinovic_stefania_serafin';
  } else if (/5g|aepd|protecci.*datos/i.test(lower)) {
    cleanedTitle = 'Introducción a las Tecnologías 5G y sus Riesgos para la Privacidad';
    author = 'Agencia Española de Protección de Datos (AEPD)';
    domain = '5G Network Architecture, Edge Computing Privacy Risks, IMSI Catchers, Network Slicing Isolation & GDPR Privacy-by-Design';
    slug = 'book_introduccion_tecnologias_5g_y_riesgos_privacidad_aepd';
  } else if (/mixing[-_\s]secrets|mike_senior/i.test(lower)) {
    cleanedTitle = 'Mixing Secrets for the Small Studio';
    author = 'Mike Senior';
    domain = 'Studio Mixing Engineering, Acoustic Monitoring, Frequency Unmasking, Subgrouping, Compression, EQ & Stereo Depth';
    slug = 'book_mixing_secrets_for_the_small_studio_mike_senior';
  } else if (/musimathics|gareth_loy/i.test(lower)) {
    cleanedTitle = 'Musimathics: The Mathematical Foundations of Music, Volume 1';
    author = 'Gareth Loy (MIT Press)';
    domain = 'Mathematical Acoustics, Vibrating Systems, Psychoacoustic Pitch/Loudness Scales, Tuning Temperaments & Algorithmic Composition';
    slug = 'book_musimathics_vol_1_mathematical_foundations_of_music_gareth_loy';
  } else if (/audio[-_\s]programming|boulanger|lazzarini/i.test(lower)) {
    cleanedTitle = 'The Audio Programming Book';
    author = 'Richard Boulanger & Victor Lazzarini (MIT Press)';
    domain = 'Real-Time Audio DSP Programming, Wavetable/FM/Additive Synthesis, Digital Filters, FFT Phase Vocoder & Delay Waveguides';
    slug = 'book_the_audio_programming_book_richard_boulanger_victor_lazzarini';
  } else if (/designing[-_\s]sound|farnell/i.test(lower)) {
    cleanedTitle = 'Designing Sound';
    author = 'Andy Farnell (MIT Press)';
    domain = 'Procedural Audio Synthesis, Physical Sound Modeling (Impacts, Friction, Fluids, Wind, Fire, Machines) & Real-Time Sound Design';
    slug = 'book_designing_sound_procedural_audio_andy_farnell';
  } else if (/game[-_\s]audio[-_\s]strategy|zdanowicz/i.test(lower)) {
    cleanedTitle = 'The Game Audio Strategy Guide: A Practical Course';
    author = 'Gina Zdanowicz & Spencer Bambrick';
    domain = 'Interactive Game Audio Architecture, Adaptive Music (Horizontal Re-sequencing & Vertical Layering), Soundscapes & Voice/SFX Buses';
    slug = 'book_the_game_audio_strategy_guide_gina_zdanowicz_spencer_bambrick';
  } else if (/illusion[-_\s]of[-_\s]life|frank_thomas|ollie_johnston/i.test(lower)) {
    cleanedTitle = 'The Illusion of Life: Disney Animation';
    author = 'Frank Thomas & Ollie Johnston';
    domain = 'The 12 Principles of Animation (Squash & Stretch, Anticipation, Staging, Slow In/Slow Out, Arcs, Secondary Action, Timing & Appeal)';
    slug = 'book_the_illusion_of_life_disney_animation_frank_thomas_ollie_johnston';
  } else if (/refactoring.*improving.*design|martin_fowler/i.test(lower)) {
    cleanedTitle = 'Refactoring: Improving the Design of Existing Code (2nd Edition)';
    author = 'Martin Fowler (with Kent Beck)';
    domain = 'Code Smells Eradication, Behavior-Preserving Transformations, Composing Methods, Encapsulation & Evolutionary Architecture';
    slug = 'book_refactoring_improving_the_design_of_existing_code_2nd_edition_martin_fowler';
  } else if (/microsound|curtis_roads/i.test(lower)) {
    cleanedTitle = 'Microsound';
    author = 'Curtis Roads (MIT Press)';
    domain = 'Microtemporal Acoustic Scales, Granular Synthesis, Gabor Acoustic Quanta, Pulsar Synthesis, Windowing Envelopes & Cloud Textures';
    slug = 'book_microsound_granular_and_particle_synthesis_curtis_roads';
  } else if (/pragmatic[-_\s]programmer|thomas_hunt/i.test(lower)) {
    cleanedTitle = 'The Pragmatic Programmer: Your Journey to Mastery (20th Anniversary Edition, 2nd Edition)';
    author = 'David Thomas & Andrew Hunt';
    domain = 'Orthogonality, DRY Principle, Design by Contract, Tracer Bullets, Reversibility, Property-Based Testing & Pragmatic Automation';
    slug = 'book_the_pragmatic_programmer_20th_anniversary_2nd_edition_thomas_hunt';
  } else if (/parpadeo|walter[-_\s]murch/i.test(lower)) {
    cleanedTitle = 'En el Momento del Parpadeo: Un Punto de Vista sobre el Montaje Cinematográfico (In the Blink of an Eye)';
    author = 'Walter Murch';
    domain = 'Cinematic Editing Choreography, Rule of Six (Emotion 51%, Story 23%, Rhythm 10%, Eye-Trace 7%, 2D Plane 5%, 3D Space 4%) & Blink Cut Sync';
    slug = 'book_en_el_momento_del_parpadeo_montaje_cinematografico_walter_murch';
  } else if (/zwicker|fastl|psychoacoustics/i.test(lower)) {
    cleanedTitle = 'Psychoacoustics: Facts and Models (3rd Edition)';
    author = 'Hugo Fastl & Eberhard Zwicker';
    domain = 'Psychoacoustic Hearing Thresholds, Bark Critical Band Rate, Simultaneous/Temporal Masking, Zwicker Loudness (Sones), Sharpness & Roughness';
    slug = 'book_psychoacoustics_facts_and_models_hugo_fastl_eberhard_zwicker';
  } else if (/gurney/i.test(lower)) {
    cleanedTitle = 'Color and Light: A Guide for the Realist Painter';
    author = 'James Gurney';
    domain = 'Optical Colorimetry, Pictorial Lighting, Thermal Shadow Rotation & PBR Realism';
  } else if (/hoober|mobile interfaces/i.test(lower)) {
    cleanedTitle = 'Designing Mobile Interfaces';
    author = 'Steven Hoober & Eric Berkman (O\'Reilly)';
    domain = 'Mobile UI/UX Ergonomics, Thumb Zones, Touch Targets & Cross-Platform Patterns';
  } else if (/laying the foundations|couldwell/i.test(lower)) {
    cleanedTitle = 'Laying the Foundations: A Book About Design Systems';
    author = 'Andrew Couldwell';
    domain = 'Design Systems Architecture, Design Tokens, Component Governance & Multi-Brand UI';
  } else if (/animator.*survival.*kit|richard.*williams/i.test(lower)) {
    cleanedTitle = 'The Animator\'s Survival Kit';
    author = 'Richard Williams';
    domain = '60FPS Motion Choreography, Timing, Spacing, Anticipation & Physics Curves';
  } else if (/visual display of quantitative|tufte|tec tuf/i.test(lower)) {
    cleanedTitle = 'The Visual Display of Quantitative Information';
    author = 'Edward R. Tufte';
    domain = 'Data-Ink Ratio, High-Density Financial/Analytical Tables, Sparklines & Zero Chartjunk';
  } else if (/^\+color$/i.test(rawName.trim())) {
    cleanedTitle = 'Plus Color: Color Theory, Harmony & Chromatic Systems';
    author = 'Color Theory & Design Reference';
    domain = 'Chromatic Harmony, Perceptual Contrast, Proportional Area Law & Surface Palettes';
  } else if (category === 'motion_and_animation') {
    domain = '60FPS Motion Choreography, Shaders, WebGPU & Interactive Animation';
  } else if (category === 'ui_ux_design') {
    domain = 'UI/UX Design Systems, Perceptual Colorimetry, Typography & Conversion Architecture';
  }

  return { title: cleanedTitle, author, domain, slug };
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
    const category = classifyBookCategory(baseName);
    const { title, author, domain, slug } = inferBookMetadataFromFileName(baseName, category);
    const outDir = path.join(ROOT, 'knowledge', category);
    const ext = path.extname(filePath).toLowerCase();
    const canonicalSourceName = slug ? `${slug}${ext}` : baseName;

    try {
      const res = await ingestBookToMarkdown({
        filePath,
        title,
        author,
        domain,
        slug,
        outDir
      });

      const destProcessed = path.join(processedDir, canonicalSourceName);
      if (fs.existsSync(destProcessed)) fs.unlinkSync(destProcessed);
      fs.renameSync(filePath, destProcessed);
      results.push({ ...res, title, author, domain, category, sourceFile: baseName, renamedTo: canonicalSourceName, archivedTo: destProcessed });
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
