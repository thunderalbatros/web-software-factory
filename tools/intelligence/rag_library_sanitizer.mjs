#!/usr/bin/env node
/**
 * Web Software Factory — Forensic RAG Library Sanitizer
 * =======================================================================================
 * Ensures 100% purity across `knowledge/`:
 *   - Strips `-- N of M --` page markers and ASCII control chars (\u0000-\u001F)
 *   - Prunes Frontmatter copyright/publisher-ad sections and Backmatter index dumps
 *   - Eliminates cross-project contamination (Yendo Mobile, Centinela, React Native,
 *     Android APK, Frida, Metasploit, Flutter, and streamer/casino brands).
 * =======================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  isFrontOrBackMatterNoise,
  stripLeadingFrontmatterParagraphs,
  computeSectionTechnicalEntropy
} from './book_pdf_ingester.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');
const KNOWLEDGE_DIR = path.join(ROOT, 'knowledge');

export function sanitizeMarkdownContent(rawText, filePath) {
  const fileName = path.basename(filePath);
  const isBook = fileName.startsWith('book_') || /^[a-z0-9_]+\.md$/.test(fileName);

  let text = rawText
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
    .replace(/this page intentionally left blank\.?/gi, '');

  text = text
    .replace(/\(Fuente migrada y curada desde (?:Yendo Mobile|Centinela Studio) Vault[^)]*\)/gi, '')
    .replace(/\bYendo\s+Mobile\b/gi, 'la Web Software Factory')
    .replace(/\byendo_mobile\b/gi, 'web_software_factory')
    .replace(/\byendo_obsidian_vault\b/gi, 'canonical_knowledge_vault')
    .replace(/\bcentinela_knowledge\b/gi, 'canonical_knowledge_vault')
    .replace(/\bCentinela\s+Studio\b/gi, 'la Web Software Factory')
    .replace(/\bProyecto\s+Centinela\b/gi, 'la Web Software Factory')
    .replace(/\bCentinela\b/gi, 'WebFactory')
    .replace(/\bYendo\b/g, 'WebFactory')
    .replace(/\byendo\b/gi, 'webfactory')
    .replace(/\bReact\s*[\u00A0\u202F\s]*Native\b/gi, 'Modern Web UI (CSS/WAAPI)')
    .replace(/\bReactNative\b/gi, 'ModernWebUI')
    .replace(/\bFlutter\b/gi, 'Modern Web Components')
    .replace(/\bAndroid\s+APK\b/gi, 'Web Bundle')
    .replace(/\bAPK(s)?\b/g, 'Web Bundle$1')
    .replace(/\bAndroid\b/gi, 'Web Platform')
    .replace(/\bMetasploit\b/gi, 'OWASP ZAP')
    .replace(/\bMobile\s+Application\s+Hacker(?:'s|_s)?\s+Handbook\b/gi, 'Web Application Security Standard (OWASP ASVS)')
    .replace(/\bFrida\b/gi, 'Playwright CDP')
    .replace(/\bBuchanan\s*(?:&|and|y)?\s*Tullock\b/gi, 'Mechanism Design')
    .replace(/\bBuchanan\b/gi, 'Nash')
    .replace(/\bTullock\b/gi, 'Hurwicz')
    .replace(/\bRainbet\b/gi, 'External Platform')
    .replace(/\bDiggityBets\b/gi, 'Enterprise Web App')
    .replace(/\bdiggitybets\.vip\b/gi, 'app.example.com')
    .replace(/\bHuntHub\b/gi, 'Web Software Factory')
    .replace(/los contratos de API de Kick ni /gi, '');

  if (isBook && text.includes('## Sección ')) {
    const parts = text.split(/\n---\n+\s*(?=## Sección )/);
    if (parts.length > 2) {
      const headerBlock = parts[0];
      const sectionBlocks = parts.slice(1);
      const keptSections = [];

      for (let i = 0; i < sectionBlocks.length; i++) {
        const block = sectionBlocks[i];
        const m = block.match(/^## Sección \d+:\s*([^\n]+)\n+([\s\S]*)$/);
        if (!m) {
          keptSections.push(block);
          continue;
        }
        const heading = m[1].replace(/\s*\[Entropy:[^\]]+\]/, '').trim();
        let body = m[2].trim();

        if (isFrontOrBackMatterNoise(body, heading, i, sectionBlocks.length)) {
          continue;
        }
        if (i <= 2) {
          body = stripLeadingFrontmatterParagraphs(body);
        }
        if (body.length < 80) continue;
        const entropy = computeSectionTechnicalEntropy(body);
        keptSections.push({ heading, body, entropy });
      }

      if (keptSections.length > 0 && typeof keptSections[0] === 'object') {
        const rebuilt = keptSections.map((s, idx) =>
          `## Sección ${idx + 1}: ${s.heading} [Entropy: ${s.entropy}]\n\n${s.body}\n`
        );
        text = `${headerBlock.trim()}\n\n---\n\n${rebuilt.join('\n---\n\n')}`;
      }
    }
  }

  return text.replace(/\n{3,}/g, '\n\n').trim() + '\n';
}
