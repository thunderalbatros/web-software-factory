#!/usr/bin/env node
/**
 * tools/audit/readability_es.mjs — Spanish Readability & Pedagogical Style Auditor
 * =================================================================================
 * Zero-heavy-dependency deterministic linter for `.md` / `.mdx` educational lessons:
 *   1. Clean AST/MDX Preprocessor: strips YAML frontmatter, fenced code blocks,
 *      inline code, ESM `import`/`export`, JSX/Astro components (`<... />`),
 *      Markdown numeric/data tables, LaTeX math (`$$...$$`, `$...$`), and URLs.
 *   2. Phonological Spanish Syllabifier: models strong/open vs weak/closed vowels,
 *      diphthongs, triphthongs, accented weak-vowel hiatuses (`í`, `ú`), silent `u`
 *      (`que/qui/gue/gui`), diaeresis (`güe/güi`), and transparent `h`.
 *   3. Dual Readability Metrics:
 *      - Índice de Lectura de Fernández-Huerta (1959):
 *          FH = 206.84 - 60 * (syllables / words) - 1.02 * (words / sentences)
 *      - Índice de Perspicuidad de Szigriszt-Pazos (1993) / Escala INFLESZ (2008):
 *          INFLESZ = 206.835 - 62.3 * (syllables / words) - (words / sentences)
 *      Supports `introduced_terms` / `priorGlossary` exemption from polysyllable
 *      penalties in Levels 2 (Intermedio) and 3 (Avanzado).
 *   4. Deterministic Editorial Guards:
 *      - Zero continuous prose paragraphs `> 110` words (Sweller cognitive load).
 *      - Neutral Spanish (`tú`) consistency (detects accidental Rioplatense `voseo`).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);

const STRONG_VOWELS = new Set(['a', 'e', 'o', 'á', 'é', 'ó', 'í', 'ú']);
const WEAK_VOWELS = new Set(['i', 'u', 'ü']);
const ALL_VOWELS = new Set([...STRONG_VOWELS, ...WEAK_VOWELS]);

const SPANISH_STOPWORDS = new Set([
  'para', 'como', 'sobre', 'entre', 'desde', 'hasta', 'hacia', 'según',
  'cuando', 'donde', 'porque', 'aunque', 'mientras', 'cada', 'todo', 'toda',
  'todos', 'todas', 'este', 'esta', 'estos', 'estas', 'otro', 'otra'
]);

// Explicit Rioplatense voseo forms (excluding standard `tú` forms like `estás`, `vas`, `ves`, or future `podrás`, `harás`)
const VOSEO_FORMS = new Set([
  'vos', 'sos',
  'tenés', 'podés', 'querés', 'sabés', 'hacés', 'ponés', 'venís', 'decís',
  'entendés', 'aprendés', 'obtenés', 'elegís', 'escribís', 'abrís', 'seguís',
  'leés', 'creés', 'preferís', 'sentís', 'pedís', 'medís', 'conseguís',
  'usás', 'probás', 'mirás', 'buscás', 'lográs', 'necesitás', 'guardás',
  'copiás', 'pegás', 'pensás', 'trabajás', 'creás', 'generás', 'evaluás',
  'fijate', 'acordate', 'asegurate', 'imaginate', 'quedate', 'animate', 'olvidate', 'metete', 'ponete',
  'usá', 'mirá', 'probá', 'escribí', 'elegí', 'hacé', 'poné', 'leé', 'abrí',
  'seguí', 'completá', 'revisá', 'tocá', 'clickeá', 'cliqueá', 'ingresá',
  'ejecutá', 'descargá', 'instalá', 'configurá', 'copiá', 'pegá', 'guardá',
  'creá', 'seleccioná', 'verificá', 'compará', 'analizá', 'pensá', 'recordá',
  'empezá', 'comenzá', 'buscá', 'armá', 'sumá', 'cargá', 'cerrá', 'borrá'
]);

const LEVEL_MIN_INFLESZ = Object.freeze({
  1: 55.0,
  2: 45.0,
  3: 40.0
});

/**
 * Parses YAML frontmatter if present at the top of an `.md`/`.mdx` document,
 * extracting `introduced_terms` and `level` without external YAML dependencies.
 */
export function parseEducationalFrontmatter(rawContent = '') {
  const normalized = String(rawContent || '').replace(/\r\n/g, '\n');
  const fmMatch = normalized.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  if (!fmMatch) {
    return {
      hasFrontmatter: false,
      bodyWithoutFrontmatter: normalized,
      introducedTerms: [],
      level: null
    };
  }

  const yaml = fmMatch[1];
  const bodyWithoutFrontmatter = normalized.slice(fmMatch[0].length);
  const introducedTerms = [];

  // Inline array form: introduced_terms: ["tokenización", "transformadores"]
  const inlineMatch = yaml.match(/^introduced_terms\s*:\s*\[([^\]]*)\]/m);
  if (inlineMatch) {
    const items = inlineMatch[1]
      .split(',')
      .map((s) => s.trim().replace(/^["']|["']$/g, ''))
      .filter(Boolean);
    introducedTerms.push(...items);
  } else {
    // Multiline YAML list form
    const lines = yaml.split('\n');
    let inTerms = false;
    for (const line of lines) {
      if (/^introduced_terms\s*:\s*$/.test(line)) {
        inTerms = true;
        continue;
      }
      if (inTerms) {
        const bullet = line.match(/^\s*-\s*(.+)$/);
        if (bullet) {
          const val = bullet[1].trim().replace(/^["']|["']$/g, '');
          if (val) introducedTerms.push(val);
        } else if (/^[a-zA-Z0-9_]+\s*:/.test(line)) {
          inTerms = false;
        }
      }
    }
  }

  const levelMatch = yaml.match(/^level\s*:\s*["']?([123])["']?\s*$/m);
  const level = levelMatch ? Number(levelMatch[1]) : null;

  return {
    hasFrontmatter: true,
    bodyWithoutFrontmatter,
    introducedTerms,
    level
  };
}

/**
 * Strips JSX/HTML tags (`<Component prop={{ a: 1 }} />`, `<div>`, `</div>`) and
 * top-level JSX `{...}` expressions using a brace-and-quote-aware scanner so nested
 * `>` inside arrow functions or props never corrupt prose extraction.
 */
function stripJsxTagsAndExpressions(input = '') {
  let out = '';
  let i = 0;
  const len = input.length;

  while (i < len) {
    const ch = input[i];

    // JSX/HTML tag start: `<Tag` or `</Tag` or `<>` or `</>`
    if (ch === '<' && (/[A-Za-z/!]/.test(input[i + 1] || '') || input[i + 1] === '>')) {
      const isBlockBoundary = /^<\/?(?:section|article|div|aside|header|footer|p|li|ul|ol|blockquote|h[1-6]|[A-Z][A-Za-z0-9_.]*)/
        .test(input.slice(i, i + 40));
      i += 1;
      let braceDepth = 0;
      let quoteChar = null;
      while (i < len) {
        const c = input[i];
        if (quoteChar) {
          if (c === '\\') {
            i += 2;
            continue;
          }
          if (c === quoteChar) quoteChar = null;
        } else if (c === '"' || c === "'" || c === '`') {
          quoteChar = c;
        } else if (c === '{') {
          braceDepth += 1;
        } else if (c === '}') {
          braceDepth = Math.max(0, braceDepth - 1);
        } else if (c === '>' && braceDepth === 0) {
          i += 1;
          break;
        }
        i += 1;
      }
      out += isBlockBoundary ? '\n\n' : ' ';
      continue;
    }

    // JSX `{ ... }` expression in MDX
    if (ch === '{') {
      let braceDepth = 1;
      let quoteChar = null;
      i += 1;
      while (i < len && braceDepth > 0) {
        const c = input[i];
        if (quoteChar) {
          if (c === '\\') {
            i += 2;
            continue;
          }
          if (c === quoteChar) quoteChar = null;
        } else if (c === '"' || c === "'" || c === '`') {
          quoteChar = c;
        } else if (c === '{') {
          braceDepth += 1;
        } else if (c === '}') {
          braceDepth -= 1;
        }
        i += 1;
      }
      out += ' ';
      continue;
    }

    out += ch;
    i += 1;
  }

  return out;
}

/**
 * Strips non-prose artifacts from Markdown/MDX educational files while preserving
 * true paragraph boundaries (`\n\n`) for cognitive load analysis.
 */
export function extractCleanEducationalProse(mdxContent = '') {
  const { bodyWithoutFrontmatter, introducedTerms, level } = parseEducationalFrontmatter(mdxContent);
  let text = bodyWithoutFrontmatter;

  // 1. Strip HTML and MDX comments
  text = text
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, ' ');

  // 2. Strip fenced code blocks (``` and ~~~) and script/style tags
  text = text
    .replace(/```[\s\S]*?```/g, '\n\n')
    .replace(/~~~[\s\S]*?~~~/g, '\n\n')
    .replace(/<script\b[\s\S]*?<\/script>/gi, '\n\n')
    .replace(/<style\b[\s\S]*?<\/style>/gi, '\n\n');

  // 3. Strip ESM import / export statements (single and multi-line)
  text = text
    .replace(/^\s*import\s+[\s\S]*?from\s+['"][^'"]+['"]\s*;?\s*$/gm, '\n\n')
    .replace(/^\s*import\s+['"][^'"]+['"]\s*;?\s*$/gm, '\n\n')
    .replace(/^\s*export\s+(?:default\s+|const\s+|let\s+|function\s+|async\s+function\s+)[^\n;]*;?\s*$/gm, '\n\n');

  // 4. Strip LaTeX display math (`$$...$$`) and inline math (`$...$`, excluding escaped `\$`)
  text = text
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/(?<!\\)\$(?!\s|\d)([^$\n]+?)(?<!\s)\$/g, ' ');

  // 5. Strip Markdown tables (lines starting and ending with `|`)
  text = text.replace(/^\s*\|.*\|\s*$/gm, '\n\n');

  // 6. Strip inline code spans BEFORE JSX stripping so `<tag>` inside backticks isn't misread
  text = text.replace(/`[^`\n]+`/g, ' ');

  // 7. Strip JSX/Astro component tags and `{...}` expressions
  text = stripJsxTagsAndExpressions(text);

  // 8. Replace Markdown images/links and bare URLs
  text = text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/https?:\/\/\S+/gi, ' ');

  // 9. Separate headings, horizontal rules, and list items into distinct blocks (not merged into prose paragraphs)
  const rawLines = text.split('\n');
  const processedLines = [];
  for (const rawLine of rawLines) {
    const trimmed = rawLine.trim();
    if (!trimmed || /^---+$|^\*\*\*+$|^___+$/.test(trimmed)) {
      processedLines.push('');
      continue;
    }
    if (/^#{1,6}\s+/.test(trimmed)) {
      processedLines.push('');
      processedLines.push(trimmed.replace(/^#{1,6}\s+/, ''));
      processedLines.push('');
      continue;
    }
    if (/^(?:[-*+]|\d+\.)\s+/.test(trimmed)) {
      processedLines.push('');
      processedLines.push(trimmed.replace(/^(?:[-*+]|\d+\.)\s+/, ''));
      processedLines.push('');
      continue;
    }
    processedLines.push(trimmed.replace(/^>\s*/, ''));
  }

  // Strip Markdown emphasis markers while preserving words and punctuation
  const cleaned = processedLines
    .join('\n')
    .replace(/\*\*|__/g, '')
    .replace(/(?<!\w)\*|\*(?!\w)|(?<!\w)_|_(?!\w)/g, '')
    .replace(/\\([$*[\]()_])/g, '$1');

  const paragraphs = cleaned
    .split(/\n\s*\n+/)
    .map((p) => p.replace(/\s+/g, ' ').trim())
    .filter((p) => p.length > 0 && /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/.test(p));

  return {
    cleanProse: paragraphs.join('\n\n'),
    paragraphs,
    introducedTerms,
    frontmatterLevel: level
  };
}

/**
 * Counts phonological syllables in a Spanish word, handling:
 * - Silent `u` in `que/qui/gue/gui` vs pronounced diaeresis `güe/güi`
 * - Transparent `h` (allowing diphthong in `prohibir` and hiatus in `ahora`/`búho`)
 * - Word-final / preconsonantal vocalic `y` (`ley`, `muy`, `buey`) vs consonantal `y` (`yo`, `ayuda`)
 * - Diphthongs (`S+W`, `W+S`, `W+W`), triphthongs (`W+S+W`), and hiatuses (`S+S`, accented `í`/`ú`)
 */
export function countSpanishSyllables(rawWord = '') {
  const clean = String(rawWord || '')
    .normalize('NFC')
    .toLowerCase()
    .replace(/[^a-záéíóúüñ]/g, '');

  if (!clean) return 0;

  // Protect `ch` as single consonant, eliminate silent `u` in qu/gu before e/i, and strip transparent `h`
  let phon = clean
    .replace(/ch/g, 'č')
    .replace(/qu(?=[eéií])/g, 'k')
    .replace(/gu(?=[eéií])/g, 'g')
    .replace(/h/g, '');

  // Convert vocalic `y` (not followed by a vowel) into weak vowel `i`
  let normalizedY = '';
  for (let i = 0; i < phon.length; i++) {
    const ch = phon[i];
    if (ch === 'y') {
      const next = phon[i + 1] || '';
      normalizedY += ALL_VOWELS.has(next) ? 'y' : 'i';
    } else {
      normalizedY += ch;
    }
  }

  let syllables = 0;
  let i = 0;
  while (i < normalizedY.length) {
    const ch = normalizedY[i];
    if (!ALL_VOWELS.has(ch)) {
      i += 1;
      continue;
    }

    // Scan contiguous vowel cluster and partition into vocalic nuclei
    let cluster = '';
    while (i < normalizedY.length && ALL_VOWELS.has(normalizedY[i])) {
      cluster += normalizedY[i];
      i += 1;
    }

    let k = 0;
    while (k < cluster.length) {
      const v1 = cluster[k];
      const v2 = cluster[k + 1] || '';
      const v3 = cluster[k + 2] || '';

      const isW1 = WEAK_VOWELS.has(v1);
      const isS1 = STRONG_VOWELS.has(v1);
      const isW2 = WEAK_VOWELS.has(v2);
      const isS2 = STRONG_VOWELS.has(v2);
      const isW3 = WEAK_VOWELS.has(v3);

      if (isW1 && isS2 && isW3) {
        // Triphthong (e.g., cambiáis, buey, averigüéis)
        syllables += 1;
        k += 3;
      } else if ((isS1 && isW2) || (isW1 && isS2) || (isW1 && isW2)) {
        // Diphthong (e.g., aire, cielo, ciudad, cuidado, agüita)
        syllables += 1;
        k += 2;
      } else {
        // Single vowel or hiatus boundary (e.g., pa-ís, tec-no-lo-gí-a, a-é-re-o)
        syllables += 1;
        k += 1;
      }
    }
  }

  return Math.max(1, syllables);
}

export function classifyInfleszGrade(score) {
  if (score >= 80) return 'MUY_FACIL';
  if (score >= 65) return 'BASTANTE_FACIL';
  if (score >= 55) return 'NORMAL';
  if (score >= 40) return 'ALGO_DIFICIL';
  return 'MUY_DIFICIL';
}

export function detectAccidentalVoseo(cleanProse = '') {
  const violations = [];
  const tokenRegex = /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+/g;
  let match;
  while ((match = tokenRegex.exec(cleanProse)) !== null) {
    const original = match[0];
    const lower = original.normalize('NFC').toLowerCase();
    if (VOSEO_FORMS.has(lower)) {
      violations.push(original);
    }
  }
  return [...new Set(violations)];
}

function buildExemptedWordSet(terms = []) {
  const set = new Set();
  for (const term of terms) {
    const words = String(term || '')
      .normalize('NFC')
      .toLowerCase()
      .match(/[a-záéíóúüñ]+/g) || [];
    for (const w of words) {
      if (w.length >= 4 && !SPANISH_STOPWORDS.has(w)) {
        set.add(w);
      }
    }
  }
  return set;
}

/**
 * Audits an educational `.md` / `.mdx` document for Spanish readability, cognitive load,
 * and neutral `tú` register consistency.
 */
export function analyzeSpanishReadability(mdxContent = '', options = {}) {
  const extracted = extractCleanEducationalProse(mdxContent);
  const level = Number(options.level || extracted.frontmatterLevel || 1);
  const maxParagraphWordsLimit = Number(options.maxParagraphWords || 110);

  const combinedTerms = [
    ...(extracted.introducedTerms || []),
    ...(Array.isArray(options.introducedTerms) ? options.introducedTerms : []),
    ...(Array.isArray(options.priorGlossary) ? options.priorGlossary : [])
  ];
  const exemptedWordSet = level >= 2 ? buildExemptedWordSet(combinedTerms) : new Set();

  const words = extracted.cleanProse.match(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9]+/g) || [];
  const lexicalWords = words.filter((w) => /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/.test(w));
  const wordCount = lexicalWords.length;

  // Sentence segmentation across paragraphs: split on `.`, `!`, `?`, `:`, `;` or paragraph breaks
  const sentenceSegments = extracted.paragraphs.flatMap((p) =>
    p
      .split(/[.!?;:]+(?:\s+|$)/)
      .map((s) => s.trim())
      .filter((s) => /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/.test(s))
  );
  const sentenceCount = Math.max(1, sentenceSegments.length);

  let syllableCount = 0;
  let effectiveSyllableCount = 0;
  const exemptedTermsUsed = new Set();

  for (const word of lexicalWords) {
    const sCount = countSpanishSyllables(word);
    syllableCount += sCount;
    const normWord = word.normalize('NFC').toLowerCase();
    if (level >= 2 && exemptedWordSet.has(normWord) && sCount > 2) {
      effectiveSyllableCount += 2;
      exemptedTermsUsed.add(normWord);
    } else {
      effectiveSyllableCount += sCount;
    }
  }

  const safeWordCount = Math.max(1, wordCount);
  const wordsPerSentence = safeWordCount / sentenceCount;
  const rawSyllablesPerWord = syllableCount / safeWordCount;
  const effectiveSyllablesPerWord = effectiveSyllableCount / safeWordCount;

  const rawFernandezHuerta = Number(
    (206.84 - 60 * rawSyllablesPerWord - 1.02 * wordsPerSentence).toFixed(2)
  );
  const rawInfleszScore = Number(
    (206.835 - 62.3 * rawSyllablesPerWord - wordsPerSentence).toFixed(2)
  );

  const fernandezHuerta = Number(
    (206.84 - 60 * effectiveSyllablesPerWord - 1.02 * wordsPerSentence).toFixed(2)
  );
  const infleszScore = Number(
    (206.835 - 62.3 * effectiveSyllablesPerWord - wordsPerSentence).toFixed(2)
  );
  const infleszGrade = classifyInfleszGrade(infleszScore);

  // Paragraph length check (> 110 words)
  let maxParagraphWords = 0;
  const longParagraphs = [];
  extracted.paragraphs.forEach((p, idx) => {
    const pWords = (p.match(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9]+/g) || []).length;
    if (pWords > maxParagraphWords) maxParagraphWords = pWords;
    if (pWords > maxParagraphWordsLimit) {
      longParagraphs.push({
        paragraphIndex: idx + 1,
        wordCount: pWords,
        limit: maxParagraphWordsLimit,
        preview: `${p.slice(0, 90)}...`
      });
    }
  });

  const voseoViolations = detectAccidentalVoseo(extracted.cleanProse);
  const minInfleszRequired = LEVEL_MIN_INFLESZ[level] ?? 55.0;

  const violations = [];
  if (wordCount > 0 && infleszScore < minInfleszRequired) {
    violations.push(
      `INFLESZ_BELOW_LEVEL_${level}_FLOOR (${infleszScore} < ${minInfleszRequired})`
    );
  }
  if (longParagraphs.length > 0) {
    violations.push(
      `PARAGRAPH_COGNITIVE_LOAD_EXCEEDED (${longParagraphs.length} paragraph(s) > ${maxParagraphWordsLimit} words)`
    );
  }
  if (voseoViolations.length > 0) {
    violations.push(
      `ACCIDENTAL_VOSEO_DETECTED (${voseoViolations.join(', ')})`
    );
  }

  return {
    passed: violations.length === 0,
    level,
    minInfleszRequired,
    wordCount,
    sentenceCount,
    syllableCount,
    effectiveSyllableCount,
    wordsPerSentence: Number(wordsPerSentence.toFixed(2)),
    syllablesPerWord: Number(effectiveSyllablesPerWord.toFixed(3)),
    fernandezHuerta,
    infleszScore,
    infleszGrade,
    rawFernandezHuerta,
    rawInfleszScore,
    maxParagraphWords,
    longParagraphs,
    voseoViolations,
    exemptedTermsUsed: [...exemptedTermsUsed],
    violations,
    cleanProse: extracted.cleanProse
  };
}

const isDirectCli =
  process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename);

if (isDirectCli) {
  const argv = process.argv.slice(2);
  const fileIdx = argv.indexOf('--file');
  const levelIdx = argv.indexOf('--level');

  if (fileIdx === -1 || !argv[fileIdx + 1]) {
    console.error('Usage: node tools/audit/readability_es.mjs --file <path> [--level <1|2|3>]');
    process.exit(1);
  }

  const targetFile = path.resolve(argv[fileIdx + 1]);
  if (!fs.existsSync(targetFile)) {
    console.error(`❌ File not found: ${targetFile}`);
    process.exit(1);
  }

  const level = levelIdx !== -1 && argv[levelIdx + 1] ? Number(argv[levelIdx + 1]) : undefined;
  const raw = fs.readFileSync(targetFile, 'utf8');
  const report = analyzeSpanishReadability(raw, { level });
  const { cleanProse: _omitProse, ...summary } = report;

  console.log(JSON.stringify({ file: targetFile, ...summary }, null, 2));
  if (!report.passed) {
    process.exit(1);
  }
}
