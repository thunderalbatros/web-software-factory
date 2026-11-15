#!/usr/bin/env node
/**
 * tools/intelligence/curate_and_verify_canons.mjs — Claim-Level Citation Verifier & Human CTO Gate
 * =================================================================================================
 * Governs all educational canons under `knowledge/ai_academy/`:
 *   1. `--verify-urls`: Performs live HTTP 200 verification against primary official sources,
 *      validates claim-level citations (`claim_id`, `claim_summary`, `url`, `section_or_quote`,
 *      `http_status`, `accessed_at`), blocks anti-bot challenge pages, ensures inline `[C#-...]`
 *      references match declared `claim_id`s, preserves `approval_status: "PENDING_CTO_REVIEW"`
 *      (never forging `approved_by: "CTO"`), and writes `data/academy/canon_citations_audit.json`.
 *   2. `--cto-approve`: Strictly human-exclusive interactive TTY command requiring explicit human
 *      confirmation (`--cto-signature "YO_TOMAS_APRUEBO_CANONES_CTO"`) to promote canons from
 *      `TIER_2_VERIFIED_DRAFT` (1.15x) to `TIER_1_SOTA_2026` (1.35x).
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import {
  parseGovernanceFrontmatter,
  classifyEpistemicTier
} from './rag_library_sanitizer.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');
const ACADEMY_CANONS_DIR = path.join(ROOT, 'knowledge', 'ai_academy');
const AUDIT_OUTPUT_PATH = path.join(ROOT, 'data', 'academy', 'canon_citations_audit.json');

const ANTI_BOT_TITLE_PATTERNS = [
  /client challenge/i,
  /just a moment/i,
  /attention required/i,
  /verify you are human/i,
  /cloudflare/i,
  /access denied/i
];

function listAcademyCanonFiles(dir = ACADEMY_CANONS_DIR) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /^CANON_.*\.md$/i.test(f))
    .sort()
    .map((f) => path.join(dir, f));
}

function parseFullCanonSources(rawContent = '') {
  const normalized = String(rawContent || '').replace(/\r\n/g, '\n');
  const fmMatch = normalized.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fmMatch) {
    return { hasFrontmatter: false, meta: {}, sources: [], body: normalized };
  }
  const yaml = fmMatch[1];
  const body = fmMatch[2];
  const meta = {};
  const topScalarRegex = /^([a-zA-Z0-9_]+)\s*:\s*["']?([^"'\n]+)["']?\s*$/gm;
  let m;
  while ((m = topScalarRegex.exec(yaml)) !== null) {
    if (m[1] !== 'sources') {
      meta[m[1]] = m[2].trim();
    }
  }

  const sources = [];
  const lines = yaml.split('\n');
  let inSources = false;
  let current = null;
  for (const line of lines) {
    if (/^sources\s*:\s*$/.test(line)) {
      inSources = true;
      continue;
    }
    if (inSources) {
      if (/^[a-zA-Z0-9_]+\s*:/.test(line)) {
        if (current) sources.push(current);
        current = null;
        inSources = false;
        continue;
      }
      const itemStart = line.match(/^\s*-\s+([a-zA-Z0-9_]+)\s*:\s*(.+)$/);
      if (itemStart) {
        if (current) sources.push(current);
        current = {};
        const val = itemStart[2].trim().replace(/^["']|["']$/g, '');
        current[itemStart[1]] = itemStart[1] === 'http_status' ? Number(val) : val;
        continue;
      }
      const propMatch = line.match(/^\s+([a-zA-Z0-9_]+)\s*:\s*(.+)$/);
      if (propMatch && current) {
        const key = propMatch[1];
        const rawVal = propMatch[2].trim().replace(/^["']|["']$/g, '');
        current[key] = key === 'http_status' ? Number(rawVal) : rawVal;
      }
    }
  }
  if (current) sources.push(current);

  return { hasFrontmatter: true, meta, sources, body, rawYaml: yaml };
}

function serializeCanonFrontmatter(meta, sources) {
  const esc = (v) => String(v ?? '').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  const headerLines = [
    '---',
    `canon_id: "${esc(meta.canon_id)}"`,
    `title: "${esc(meta.title)}"`,
    `domain: "${esc(meta.domain || 'ai_academy')}"`,
    `approval_status: "${esc(meta.approval_status || 'PENDING_CTO_REVIEW')}"`
  ];
  if (meta.approved_by) {
    headerLines.push(`approved_by: "${esc(meta.approved_by)}"`);
  }
  if (meta.approved_at) {
    headerLines.push(`approved_at: "${esc(meta.approved_at)}"`);
  }
  headerLines.push(`epistemic_tier_target: "${esc(meta.epistemic_tier_target || 'TIER_1_SOTA_2026')}"`);
  headerLines.push(`language_register: "${esc(meta.language_register || 'es-neutral-tu')}"`);
  headerLines.push('sources:');
  for (const s of sources) {
    headerLines.push(`  - claim_id: "${esc(s.claim_id)}"`);
    headerLines.push(`    claim_summary: "${esc(s.claim_summary)}"`);
    headerLines.push(`    url: "${esc(s.url)}"`);
    headerLines.push(`    section_or_quote: "${esc(s.section_or_quote)}"`);
    headerLines.push(`    http_status: ${Number(s.http_status || 0)}`);
    headerLines.push(`    verified_at: "${esc(s.verified_at)}"`);
    headerLines.push(`    accessed_at: "${esc(s.accessed_at)}"`);
  }
  headerLines.push('---');
  return headerLines.join('\n');
}

export async function verifyAcademyCanonsLive({
  canonsDir = ACADEMY_CANONS_DIR,
  outputPath = AUDIT_OUTPUT_PATH,
  updateFrontmatter = true,
  fetchFn = globalThis.fetch
} = {}) {
  const canonFiles = listAcademyCanonFiles(canonsDir);
  if (canonFiles.length === 0) {
    throw new Error(`No CANON_*.md files found in ${canonsDir}`);
  }

  const parsedCanons = canonFiles.map((fullPath) => {
    const relPath = path.relative(ROOT, fullPath).replace(/\\/g, '/');
    const raw = fs.readFileSync(fullPath, 'utf8');
    const parsed = parseFullCanonSources(raw);
    return { fullPath, relPath, raw, ...parsed };
  });

  // Probe each unique URL once
  const uniqueUrls = [...new Set(parsedCanons.flatMap((c) => c.sources.map((s) => s.url)).filter(Boolean))];
  const urlResults = new Map();
  const checkedDate = new Date().toISOString().slice(0, 10);

  for (const url of uniqueUrls) {
    let probeOutcome = null;
    for (let attempt = 1; attempt <= 2; attempt++) {
      const accessedAt = new Date().toISOString();
      try {
        const res = await fetchFn(url, {
          method: 'GET',
          redirect: 'follow',
          signal: AbortSignal.timeout(20000),
          headers: {
            'User-Agent': 'WebSoftwareFactory-CanonVerifier/2.0 (Educational Governance Audit)',
            Accept: 'text/html,application/json;q=0.9,*/*;q=0.8'
          }
        });
        const text = await res.text();
        const titleMatch = text.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
        const pageTitle = titleMatch ? titleMatch[1].replace(/\s+/g, ' ').trim().slice(0, 160) : '';
        const antiBotBlocked = ANTI_BOT_TITLE_PATTERNS.some((re) => re.test(pageTitle));
        probeOutcome = {
          url,
          finalUrl: res.url || url,
          httpStatus: antiBotBlocked ? 403 : res.status,
          antiBotBlocked,
          pageTitle,
          verifiedAt: checkedDate,
          accessedAt
        };
        if (probeOutcome.httpStatus === 200 || antiBotBlocked) break;
      } catch (err) {
        probeOutcome = {
          url,
          finalUrl: url,
          httpStatus: 0,
          antiBotBlocked: false,
          error: err.message,
          verifiedAt: checkedDate,
          accessedAt
        };
      }
    }
    urlResults.set(url, probeOutcome);
  }

  const canonReports = [];
  const allClaims = [];
  let totalFailures = 0;

  for (const canon of parsedCanons) {
    const issues = [];
    if (!canon.hasFrontmatter) {
      issues.push('MISSING_YAML_FRONTMATTER');
    }
    if (canon.sources.length === 0) {
      issues.push('EMPTY_SOURCES_LIST');
    }

    const declaredIds = new Set();
    const updatedSources = canon.sources.map((src) => {
      declaredIds.add(src.claim_id);
      const probe = urlResults.get(src.url) || {
        httpStatus: 0,
        finalUrl: src.url,
        verifiedAt: checkedDate,
        accessedAt: new Date().toISOString()
      };

      const missingFields = ['claim_id', 'claim_summary', 'url', 'section_or_quote'].filter(
        (k) => !src[k] || String(src[k]).trim().length === 0
      );
      if (missingFields.length > 0) {
        issues.push(`CLAIM_${src.claim_id || 'UNKNOWN'}_MISSING_FIELDS:${missingFields.join(',')}`);
      }
      if (probe.httpStatus !== 200) {
        issues.push(`CLAIM_${src.claim_id}_HTTP_${probe.httpStatus}:${src.url}`);
      }

      const enriched = {
        claim_id: src.claim_id,
        claim_summary: src.claim_summary,
        url: src.url,
        section_or_quote: src.section_or_quote,
        http_status: probe.httpStatus,
        verified_at: probe.httpStatus === 200 ? probe.verifiedAt : (src.verified_at || ''),
        accessed_at: probe.accessedAt
      };

      allClaims.push({
        canon_file: canon.relPath,
        canon_id: canon.meta.canon_id || path.basename(canon.relPath, '.md'),
        ...enriched,
        final_url: probe.finalUrl
      });
      return enriched;
    });

    // Verify inline [C#-...] claim tags in body match declared frontmatter claim_ids
    const inlineMatches = [...canon.body.matchAll(/\[(C\d-[A-Z0-9-]+)\]/g)].map((m) => m[1]);
    for (const inlineId of inlineMatches) {
      if (!declaredIds.has(inlineId)) {
        issues.push(`UNDECLARED_INLINE_CLAIM_ID:${inlineId}`);
      }
    }

    // Never auto-forge CTO approval during --verify-urls
    const safeMeta = { ...canon.meta };
    if (safeMeta.approved_by === 'CTO' && safeMeta.approval_status !== 'APPROVED_BY_CTO') {
      delete safeMeta.approved_by;
      safeMeta.approval_status = 'PENDING_CTO_REVIEW';
    }
    if (!safeMeta.approval_status) {
      safeMeta.approval_status = 'PENDING_CTO_REVIEW';
    }

    let finalRaw = canon.raw;
    if (updateFrontmatter && canon.hasFrontmatter && issues.length === 0) {
      const serializedFm = serializeCanonFrontmatter(safeMeta, updatedSources);
      finalRaw = `${serializedFm}\n\n${canon.body.replace(/^\n+/, '')}`;
      fs.writeFileSync(canon.fullPath, finalRaw, 'utf8');
    }

    const tierClassification = classifyEpistemicTier(canon.relPath, finalRaw);
    const sha256 = crypto
      .createHash('sha256')
      .update(finalRaw.replace(/\r\n/g, '\n'), 'utf8')
      .digest('hex');

    if (issues.length > 0) {
      totalFailures += issues.length;
    }

    canonReports.push({
      canon_file: canon.relPath,
      canon_id: safeMeta.canon_id || path.basename(canon.relPath, '.md'),
      title: safeMeta.title || '',
      approval_status: safeMeta.approval_status,
      approved_by: safeMeta.approved_by || null,
      epistemic_tier: tierClassification.epistemicTier,
      authority_boost: tierClassification.authorityBoost,
      sha256_lf: sha256,
      claims_count: updatedSources.length,
      verified_200_count: updatedSources.filter((s) => s.http_status === 200).length,
      inline_citations_count: inlineMatches.length,
      passed: issues.length === 0,
      issues
    });
  }

  const report = {
    schema: 'academy-canon-citations-audit-v1',
    generated_at: new Date().toISOString(),
    canons_total: canonReports.length,
    claims_total: allClaims.length,
    claims_http_200: allClaims.filter((c) => c.http_status === 200).length,
    unique_urls_probed: uniqueUrls.length,
    passed: totalFailures === 0,
    cto_approval_state: canonReports.every((c) => c.approved_by === 'CTO')
      ? 'APPROVED_BY_CTO'
      : 'PENDING_CTO_REVIEW',
    canons: canonReports,
    claims: allClaims
  };

  if (outputPath) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  }

  return report;
}

function runHumanOnlyCtoApprove(argv) {
  // Hard anti-forgery guard: block CI, non-interactive pipes/subprocesses, and agent runners
  if (
    process.env.CI === 'true' ||
    process.env.AGY_AGENT_AUTOMATION === '1' ||
    !process.stdin.isTTY ||
    !process.stdout.isTTY
  ) {
    console.error(
      '❌ [CTO_APPROVAL_GUARD] Forbidden: --cto-approve requires an interactive human TTY session and cannot be executed by autonomous agents or non-TTY runners.'
    );
    process.exit(1);
  }

  const sigIdx = argv.indexOf('--cto-signature');
  const signature = sigIdx !== -1 ? String(argv[sigIdx + 1] || '') : '';
  if (signature !== 'YO_TOMAS_APRUEBO_CANONES_CTO') {
    console.error(
      '❌ [CTO_APPROVAL_GUARD] Missing or invalid explicit human confirmation flag: --cto-signature "YO_TOMAS_APRUEBO_CANONES_CTO"'
    );
    process.exit(1);
  }

  const canonIdx = argv.indexOf('--canon');
  const targetArg = canonIdx !== -1 ? String(argv[canonIdx + 1] || 'all') : 'all';
  const canonFiles = listAcademyCanonFiles();
  const selected =
    targetArg === 'all'
      ? canonFiles
      : canonFiles.filter((f) => path.basename(f).includes(targetArg));

  if (selected.length === 0) {
    console.error(`❌ [CTO_APPROVAL_GUARD] No matching canon found for "${targetArg}".`);
    process.exit(1);
  }

  const nowIso = new Date().toISOString();
  const approved = [];
  for (const fullPath of selected) {
    const raw = fs.readFileSync(fullPath, 'utf8');
    const parsed = parseFullCanonSources(raw);
    const fmCheck = parseGovernanceFrontmatter(raw);
    if (!fmCheck.hasVerifiedSources) {
      console.error(
        `❌ [CTO_APPROVAL_GUARD] Cannot approve ${path.basename(fullPath)}: all sources must be HTTP 200 verified first (--verify-urls).`
      );
      process.exit(1);
    }
    const updatedMeta = {
      ...parsed.meta,
      approval_status: 'APPROVED_BY_CTO',
      approved_by: 'CTO',
      approved_at: nowIso
    };
    const serializedFm = serializeCanonFrontmatter(updatedMeta, parsed.sources);
    fs.writeFileSync(fullPath, `${serializedFm}\n\n${parsed.body.replace(/^\n+/, '')}`, 'utf8');
    approved.push(path.relative(ROOT, fullPath).replace(/\\/g, '/'));
  }

  console.log(JSON.stringify({ ok: true, approved_by: 'CTO', approved_at: nowIso, files: approved }, null, 2));
}

const isDirectCli =
  process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename);

if (isDirectCli) {
  const argv = process.argv.slice(2);
  if (argv.includes('--cto-approve')) {
    runHumanOnlyCtoApprove(argv);
  } else if (argv.includes('--verify-urls')) {
    verifyAcademyCanonsLive()
      .then((report) => {
        console.log(
          JSON.stringify(
            {
              passed: report.passed,
              canons_total: report.canons_total,
              claims_total: report.claims_total,
              claims_http_200: report.claims_http_200,
              unique_urls_probed: report.unique_urls_probed,
              cto_approval_state: report.cto_approval_state,
              audit_file: 'data/academy/canon_citations_audit.json',
              canons: report.canons.map((c) => ({
                canon_file: c.canon_file,
                epistemic_tier: c.epistemic_tier,
                authority_boost: c.authority_boost,
                claims: `${c.verified_200_count}/${c.claims_count}`,
                passed: c.passed,
                issues: c.issues
              }))
            },
            null,
            2
          )
        );
        if (!report.passed) process.exit(1);
      })
      .catch((err) => {
        console.error(`❌ [CANON_VERIFY_ERROR] ${err.message}`);
        process.exit(1);
      });
  } else {
    console.log(
      'Usage:\n' +
        '  node tools/intelligence/curate_and_verify_canons.mjs --verify-urls\n' +
        '  node tools/intelligence/curate_and_verify_canons.mjs --cto-approve --canon <file|all> --cto-signature "YO_TOMAS_APRUEBO_CANONES_CTO"  (Human TTY only)'
    );
  }
}
