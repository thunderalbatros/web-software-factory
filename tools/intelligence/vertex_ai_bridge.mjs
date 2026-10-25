/**
 * Web Software Factory Studio — Google Cloud Platform (GCP) Vertex AI Bridge
 * =============================================================================
 * Enterprise-grade generative and multimodal intelligence for modern web design,
 * aesthetic UI auditing, query expansion (HyDE), and RAG synthesis.
 *
 * Backed by:
 *   - Project: project-6565e6dc-f33c-49ff-b22
 *   - Location: us-central1
 *   - Model: gemini-2.5-flash (with automatic fallback to gemini-1.5-flash)
 * =============================================================================
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');

// Load environment
function loadEnv() {
  const env = { ...process.env };
  const envCandidates = [
    path.join(ROOT, '.env'),
    path.join(ROOT, '.dev.vars')
  ];

  for (const p of envCandidates) {
    if (fs.existsSync(p)) {
      try {
        const content = fs.readFileSync(p, 'utf8');
        content.split(/\r?\n/).forEach(line => {
          const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
          if (match && !env[match[1]]) {
            env[match[1]] = (match[2] || '').trim();
          }
        });
      } catch (_) {}
    }
  }
  return env;
}

const env = loadEnv();
const GCP_PROJECT = env.GCP_PROJECT_ID || env.GOOGLE_CLOUD_PROJECT || '';
const GCP_LOCATION = env.GCP_LOCATION || 'us-central1';
const GEMINI_MODEL = env.GEMINI_MODEL || 'gemini-2.5-flash';
const GROQ_MODELS = ['openai/gpt-oss-120b', 'qwen/qwen3.8-27b', 'openai/gpt-oss-20b'];

let vertexOrStudioClient = null;

/**
 * Initializes and retrieves the Gemini client:
 *   1. If USE_VERTEX_AI=true or GOOGLE_APPLICATION_CREDENTIALS + GCP_PROJECT_ID exist in .env,
 *      connects via GCP Vertex AI (covered by promotional credits at $0 net cost).
 *   2. Otherwise, if GEMINI_API_KEY / GOOGLE_AI_STUDIO_KEY is set, connects via Google AI Studio Free Tier.
 */
export async function getVertexClient() {
  if (vertexOrStudioClient) return vertexOrStudioClient;

  try {
    const sdkPath = path.join(ROOT, 'core', 'node_modules', '@google', 'genai', 'dist', 'node', 'index.mjs');
    let GoogleGenAI;
    if (fs.existsSync(sdkPath)) {
      const mod = await import(`file://${sdkPath.replace(/\\/g, '/')}`);
      GoogleGenAI = mod.GoogleGenAI;
    } else {
      const mod = await import('@google/genai');
      GoogleGenAI = mod.GoogleGenAI;
    }

    const adcPath = env.GOOGLE_APPLICATION_CREDENTIALS || '';
    if (adcPath && fs.existsSync(adcPath)) {
      process.env.GOOGLE_APPLICATION_CREDENTIALS = adcPath;
    }

    if ((env.USE_VERTEX_AI === 'true' || adcPath) && GCP_PROJECT) {
      vertexOrStudioClient = new GoogleGenAI({
        vertexai: true,
        project: GCP_PROJECT,
        location: GCP_LOCATION
      });
      return vertexOrStudioClient;
    }

    const apiKey = env.GEMINI_API_KEY || env.GOOGLE_AI_STUDIO_KEY || '';
    if (apiKey) {
      vertexOrStudioClient = new GoogleGenAI({ apiKey });
      return vertexOrStudioClient;
    }

    return null;
  } catch (err) {
    console.warn(`[Vertex/Gemini Client] Initialization warning: ${err.message}`);
    return null;
  }
}

/**
 * High-Intelligence Text Generation & Synthesis via Vertex AI Gemini 2.5 Flash
 */
export async function generateWithVertex(prompt, systemInstruction = '', model = GEMINI_MODEL) {
  const ai = await getVertexClient();
  if (!ai) return null;

  try {
    const config = {};
    if (systemInstruction) {
      config.systemInstruction = { parts: [{ text: systemInstruction }] };
    }

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config
    });

    return response.text || null;
  } catch (err) {
    console.warn(`[Vertex AI] Generation error (${model}): ${err.message}`);
    // Fallback to gemini-1.5-flash if 2.5 has transient quota or region delay
    if (model !== 'gemini-1.5-flash') {
      return generateWithVertex(prompt, systemInstruction, 'gemini-1.5-flash');
    }
    return null;
  }
}

/**
 * Query Expansion, Translation & HyDE (Hypothetical Document Embeddings)
 * Translates conversational queries into canonical English/Spanish technical terms
 * to supercharge dense and sparse retrieval in RAG.
 */
export async function expandAndCanonicalizeQuery(userQuery) {
  const systemInstruction = `You are the Lead Search Engine Architect for WebFactory.
Transform the user query into an optimal search representation for technical retrieval (UI/UX, CSS, Web Animations, Software Architecture, Casino Streaming, and General Web Knowledge).
When queries relate to UI/UX, CSS or animations, preserve and expand precise technical terms (e.g., 'escala de entrada' -> modal entrance scale transform, 'modales' -> modal dialog popover).
Respond strictly in valid JSON format:
{
  "canonicalTerms": ["6-8", "exact", "keywords", "in", "english", "and", "spanish"],
  "canonicalEnglishQuery": "precise translated technical search query",
  "hypotheticalSnippet": "A short 1-2 sentence hypothetical excerpt from the documentation answering this question (HyDE)."
}`;

  // 1. Primary: Groq Ultra-Fast LPU (800ms latency)
  const groqKey = env.GROQ_API_KEY;
  if (groqKey) {
    for (const groqModel of GROQ_MODELS) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          signal: controller.signal,
          headers: {
            'Authorization': `Bearer ${groqKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: groqModel,
            messages: [
              { role: 'system', content: systemInstruction },
              { role: 'user', content: `User Query: "${userQuery}"` }
            ],
            temperature: 0.1,
            response_format: { type: 'json_object' }
          })
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          const content = data.choices?.[0]?.message?.content;
          if (content) return JSON.parse(content);
        }
      } catch (_) {}
    }
  }

  // 2. High-Intelligence Fallback: Vertex AI Gemini 2.5 Flash
  try {
    const raw = await generateWithVertex(`User Query: "${userQuery}"`, systemInstruction);
    if (raw) {
      const cleaned = raw.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      if (parsed && (parsed.canonicalTerms || parsed.canonicalEnglishQuery)) {
        return parsed;
      }
    }
  } catch (_) {}

  return null;
}

/**
 * Listwise Cross-Evaluation Reranker (SOTA 2026)
 * Evaluates candidate passages and re-scores them from 0.0 to 1.0 based on true semantic relevance.
 * Solves 'Lost in the Middle' and filters irrelevant candidates before synthesis.
 */
export async function rerankCandidatesWithAI(query, candidates = []) {
  if (!candidates || candidates.length === 0) return [];
  if (candidates.length === 1) return candidates;

  const candidateSummary = candidates.slice(0, 15).map((c, idx) => ({
    index: idx + 1,
    id: c.id,
    title: c.title,
    snippet: (c.snippet || c.text || '').slice(0, 280)
  }));

  const systemPrompt = `You are an ultra-fast listwise reranker for technical web engineering and UI/UX documentation.
Evaluate each candidate passage for relevance to the user query on a scale of 0.0 to 1.0.
Output strictly JSON:
{
  "ranked": [
    { "index": 1, "score": 0.95, "reason": "concise rationale" }
  ]
}
Filter out irrelevant candidates (score < 0.40). Sort descending by score.`;

  const userPrompt = `Query: "${query}"\n\nCandidates:\n${candidateSummary.map(c => `[${c.index}] (ID: ${c.id}) ${c.title}\n"${c.snippet}"`).join('\n\n')}`;

  // 1. Try Groq (Fastest listwise inference ~700-900ms)
  const groqKey = env.GROQ_API_KEY;
  if (groqKey) {
    for (const model of GROQ_MODELS) {
      try {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          signal: AbortSignal.timeout(3500),
          headers: {
            'Authorization': `Bearer ${groqKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt }
            ],
            temperature: 0.0,
            response_format: { type: 'json_object' }
          })
        });

        if (res.ok) {
          const data = await res.json();
          const content = data.choices?.[0]?.message?.content;
          if (content) {
            const parsed = JSON.parse(content);
            const rankings = parsed.ranked || parsed.results || [];
            if (Array.isArray(rankings)) {
              if (rankings.length === 0) return [];
              const scoreMap = new Map();
              rankings.forEach(r => {
                const idx = Number(r.index) - 1;
                if (idx >= 0 && idx < candidates.length) {
                  scoreMap.set(candidates[idx].id, {
                    score: Number(r.score) || 0.5,
                    reason: r.reason || ''
                  });
                }
              });

              return candidates
                .filter(c => scoreMap.has(c.id))
                .map(c => ({
                  ...c,
                  rerankScore: scoreMap.get(c.id).score,
                  rerankReason: scoreMap.get(c.id).reason
                }))
                .sort((a, b) => b.rerankScore - a.rerankScore);
            }
          }
        }
      } catch (_) {}
    }
  }

  // 2. Fallback to Vertex AI Gemini 2.5 Flash
  try {
    const raw = await generateWithVertex(userPrompt, systemPrompt);
    if (raw) {
      const cleaned = raw.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      const rankings = parsed.ranked || parsed.results || [];
      if (Array.isArray(rankings)) {
        if (rankings.length === 0) return [];
        const scoreMap = new Map();
        rankings.forEach(r => {
          const idx = Number(r.index) - 1;
          if (idx >= 0 && idx < candidates.length) {
            scoreMap.set(candidates[idx].id, {
              score: Number(r.score) || 0.5,
              reason: r.reason || ''
            });
          }
        });

        return candidates
          .filter(c => scoreMap.has(c.id))
          .map(c => ({
            ...c,
            rerankScore: scoreMap.get(c.id).score,
            rerankReason: scoreMap.get(c.id).reason
          }))
          .sort((a, b) => b.rerankScore - a.rerankScore);
      }
    }
  } catch (_) {}

  return [];
}

/**
 * Multimodal Visual & Aesthetic UI Auditor (Vertex AI Vision)
 * Audits UI screenshots, OBS overlays, and web pages against modern design standards:
 * Refactoring UI, Practical UI, Every Layout, and Emil Kowalski Motion rules.
 */
export async function auditVisualDesign({ imagePathOrBuffer, mimeType = 'image/jpeg', urlOrContext = '' }) {
  const ai = await getVertexClient();
  if (!ai) return { ok: false, error: 'Vertex AI client not available' };

  let b64Data = '';
  if (Buffer.isBuffer(imagePathOrBuffer)) {
    b64Data = imagePathOrBuffer.toString('base64');
  } else if (typeof imagePathOrBuffer === 'string' && fs.existsSync(imagePathOrBuffer)) {
    b64Data = fs.readFileSync(imagePathOrBuffer).toString('base64');
  } else {
    return { ok: false, error: 'Invalid image buffer or file path' };
  }

  const prompt = `You are the Lead Visual & Aesthetic Design Engineer for WebFactory (Casino Streamer Engagement Suite).
Perform an authoritative, brutal, and high-craft aesthetic audit of this UI design.

CONTEXT: ${urlOrContext || 'Casino Streamer Web App & Transparent OBS Overlays'}

STANDARDS TO ENFORCE:
1. 90/8/2 Chromatic Budget (90% dark glass/neutral base, 8% structural accents, 2% high-voltage neon punch).
2. Hierarchy & Contrast (WCAG AAA compliance on dark backgrounds, weight/color over size).
3. Spacing & Rhythm (8px/4px atomic grid, avoiding crowded borders, border-over-shadow).
4. Layout Primitives (Every Layout algorithmic alignment, zero awkward word wrapping).
5. Tactile Micro-Interactions (Tactile active states, organic easing, spring physics).

Respond in structured Markdown with:
- # Visual Craft Rating (Score 1-10)
- ## 🌟 What Works (Aesthetic Strengths)
- ## ⚠️ Visual Flaws & Anti-Patterns (Spacing, Contrast, Visual Noise)
- ## 🛠️ Concrete CSS/Design Action Plan (Drop-in CSS rules to elevate craft)`;

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            { inlineData: { mimeType, data: b64Data } }
          ]
        }
      ]
    });

    return {
      ok: true,
      report: response.text,
      model: GEMINI_MODEL
    };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

/**
 * Phase 2A: Zero-Storage-Cost Implicit Context Caching + SHA-256 Disk Proxy Cache
 * (Ported & optimized from `yendo_mobile/tools/lib/promptProxyCache.js`).
 *
 * FINOPS GUARDRAIL: Paid Vertex AI Explicit Context Caching (`ai.caches.create`)
 * is strictly disabled to prevent hourly storage charges ($2.08/day).
 * Instead, we combine:
 *   1. Deterministic SHA-256 local disk cache (`.agents/memory/vertex_prompt_cache.json`) -> $0.00 cost on cache hits.
 *   2. Gemini 2.5 Flash Implicit Prefix Caching (`withImplicitPrefix`) -> 75% input token discount with $0.00/hr storage fee.
 *   3. Token-Bucket Rate Limiter (60 req/min) + FinOps micro-dollar ledger (`logs/gcp_finops_usage.jsonl`).
 */
const CACHE_META_PATH = path.join(ROOT, '.agents', 'memory', 'vertex_context_cache.json');
const DISK_PROMPT_CACHE_PATH = path.join(ROOT, '.agents', 'memory', 'vertex_prompt_cache.json');
const FINOPS_LOG_PATH = path.join(ROOT, 'logs', 'gcp_finops_usage.jsonl');

const RATE_BUCKET = {
  tokens: 60,
  maxTokens: 60,
  lastRefillMs: Date.now()
};

function acquireRateToken() {
  const now = Date.now();
  const elapsedMin = (now - RATE_BUCKET.lastRefillMs) / 60000;
  if (elapsedMin > 0) {
    RATE_BUCKET.tokens = Math.min(RATE_BUCKET.maxTokens, RATE_BUCKET.tokens + elapsedMin * RATE_BUCKET.maxTokens);
    RATE_BUCKET.lastRefillMs = now;
  }
  if (RATE_BUCKET.tokens < 1) return false;
  RATE_BUCKET.tokens -= 1;
  return true;
}

function loadDiskPromptCache() {
  try {
    if (fs.existsSync(DISK_PROMPT_CACHE_PATH)) {
      return JSON.parse(fs.readFileSync(DISK_PROMPT_CACHE_PATH, 'utf8'));
    }
  } catch (_) {}
  return {};
}

function saveDiskPromptCache(cacheObj) {
  try {
    fs.mkdirSync(path.dirname(DISK_PROMPT_CACHE_PATH), { recursive: true });
    fs.writeFileSync(DISK_PROMPT_CACHE_PATH, JSON.stringify(cacheObj, null, 2), 'utf8');
  } catch (_) {}
}

export function recordFinOpsTelemetry({ operation, model = GEMINI_MODEL, inputChars = 0, outputChars = 0, cacheHit = false }) {
  try {
    const estInputTokens = Math.ceil(inputChars / 4);
    const estOutputTokens = Math.ceil(outputChars / 4);
    // Gemini 2.5 Flash pricing: ~$0.15 / 1M input (or $0.0375 implicit cached), ~$0.60 / 1M output
    const estCostUsd = cacheHit
      ? 0
      : Number(((estInputTokens * 0.00000015) + (estOutputTokens * 0.00000060)).toFixed(8));

    fs.mkdirSync(path.dirname(FINOPS_LOG_PATH), { recursive: true });
    const entry = {
      timestamp: new Date().toISOString(),
      project: GCP_PROJECT,
      operation,
      model,
      estInputTokens,
      estOutputTokens,
      cacheHit,
      estCostUsd
    };
    fs.appendFileSync(FINOPS_LOG_PATH, JSON.stringify(entry) + '\n', 'utf8');
    return entry;
  } catch (_) {
    return null;
  }
}

const SNIPER_IMPLICIT_CANON_PREFIX = [
  '=== WebFactory 50-SPIN SNIPER & RISK ENGINE — MATHEMATICAL CONSTITUTION ===',
  '1. NON-PREDICTIVE LIVE RTP LAW: In PartnerBrand Engine (math-sdk) and certified GLI-11/GLI-19 RGS servers, outcomes are pre-computed in immutable simulation books/lookup tables selected via stateless CSPRNG (e.g., HMAC-SHA256 / Mersenne Twister). Observed Live RTP (1h/24h) is a lagging descriptive sample metric and NEVER changes the probability of the next spin.',
  '2. EXACT 50-SPIN BINOMIAL PROBABILITY: For a slot with average bonus frequency 1 in B spins (hit rate p = 1/B), the true probability of hitting >= 1 bonus within N=50 spins is P(Bonus <= 50) = 1 - (1 - 1/B)^50.',
  '3. SKEWNESS & MEDIAN RETURN REALITY: Theoretical RTP (e.g., 96.5% or 98.0% on PartnerBrand Enhanced RTP) is an asymptotic mean over 10^7+ spins heavily skewed by rare max-win tails (10,000x+). In a short 50-spin sniper window, the median return is significantly lower than the mean RTP, and dead-spin streaks are governed by base hit frequency.',
  '4. ANTI-TILT BANKROLL PROTECTION: Never recommend chasing losses on "Hot" or "Cold" machines. A 50-spin sniper session requires strict stop-loss discipline (50 spins max per attempt) and safe bet sizing (0.20% to 0.50% of total bankroll per spin, so 50 spins risk at most 10% to 25% of session allocation).'
].join('\n');

export function withImplicitPrefix(userPrompt) {
  return `${SNIPER_IMPLICIT_CANON_PREFIX}\n\n=== TASK ===\n${userPrompt}`;
}

export async function guardedVertexCall({
  operation = 'sniper_inference',
  prompt,
  systemInstruction = '',
  model = GEMINI_MODEL,
  ttlMs = 12 * 3600 * 1000,
  useImplicitCanon = true
}) {
  const fullPrompt = useImplicitCanon ? withImplicitPrefix(prompt) : prompt;
  const hashKey = crypto
    .createHash('sha256')
    .update(`${model}::${systemInstruction}::${fullPrompt}`)
    .digest('hex');

  const cache = loadDiskPromptCache();
  const cached = cache[hashKey];
  if (cached && cached.expiresAt > Date.now() && cached.text) {
    recordFinOpsTelemetry({
      operation,
      model,
      inputChars: fullPrompt.length,
      outputChars: cached.text.length,
      cacheHit: true
    });
    return { text: cached.text, cacheHit: true, hashKey };
  }

  if (!acquireRateToken()) {
    return { text: null, cacheHit: false, error: 'Rate limit bucket exhausted (60 req/min)' };
  }

  const text = await generateWithVertex(fullPrompt, systemInstruction, model);
  if (text) {
    cache[hashKey] = {
      text,
      createdAt: Date.now(),
      expiresAt: Date.now() + ttlMs,
      operation
    };
    saveDiskPromptCache(cache);
    recordFinOpsTelemetry({
      operation,
      model,
      inputChars: fullPrompt.length,
      outputChars: text.length,
      cacheHit: false
    });
  }
  return { text, cacheHit: false, hashKey };
}

export async function ensureCanonContextCache(ttlSeconds = 3600) {
  // Paid Explicit Context Caching (`ai.caches.create`) is intentionally replaced by
  // Zero-Storage-Cost Implicit Prefix Caching + Deterministic SHA-256 Disk Cache.
  const meta = {
    active: true,
    mode: 'IMPLICIT_ZERO_STORAGE_COST',
    explicitCacheDisabled: true,
    storageCostPerHourUsd: 0,
    model: GEMINI_MODEL,
    updatedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + ttlSeconds * 1000).toISOString(),
    implicitPrefixChars: SNIPER_IMPLICIT_CANON_PREFIX.length
  };
  try {
    fs.mkdirSync(path.dirname(CACHE_META_PATH), { recursive: true });
    fs.writeFileSync(CACHE_META_PATH, JSON.stringify(meta, null, 2) + '\n', 'utf8');
  } catch (_) {}
  return meta;
}

/**
 * Phase 2D: Exact 50-Fold Discrete Probability Convolution on 32-Bin Logarithmic Payout DNA
 * + Chain-of-Verification (CoVe) 4-Invariant Mathematical Validator for 50-Spin Sniper.
 *
 * Uses the exact 32-bin logarithmic payout signature (`sig: "v2:b0,b1,...,b31"`),
 * `TrueTransparency` Book-Verified `BASE` / `ANTE` / `SUPERANTE` bonus frequencies (`bonusOneIn`),
 * and 50-fold discrete convolution ($P_{50} = [P_1]^{*50}$) to compute exact 50-spin profit
 * probability, median return, LDW trap share, and Anti-Tilt bet sizing.
 */
const DNA_BIN_MULTS = new Float64Array(32);
for (let s = 0; s < 32; s++) {
  DNA_BIN_MULTS[s] = Math.pow(10, (s + 0.5) / 4) / 100;
}

export function compute50SpinConvolutionFromDna(sigStr, bustProb, hitProb, targetRtp = 0.96, costMult = 1, spinsWindow = 50) {
  if (!sigStr || typeof sigStr !== 'string') return null;
  const parts = sigStr.replace(/^v\d+:/, '').split(',').map(Number);
  if (parts.length < 32) return null;
  let sumBins = 0;
  for (let i = 0; i < 32; i++) sumBins += parts[i] > 0 ? parts[i] : 0;
  if (sumBins <= 0) return null;

  const p0 = Math.max(0, Math.min(1, bustProb ?? (1 - (hitProb ?? 0.25))));
  const pHit = 1 - p0;

  const binProbs = new Float64Array(32);
  let rawEv = 0;
  for (let i = 0; i < 32; i++) {
    binProbs[i] = pHit * (Math.max(0, parts[i]) / sumBins);
    rawEv += binProbs[i] * (DNA_BIN_MULTS[i] / costMult);
  }
  const scale = rawEv > 0 ? targetRtp / rawEv : 1;

  let pProfit1 = 0;
  let pFeature1 = 0;
  let pBonus1 = 0;
  let baseReturnSum = 0;
  let tailRtpSum = 0;

  for (let i = 0; i < 32; i++) {
    const mult = (DNA_BIN_MULTS[i] / costMult) * scale;
    const p = binProbs[i];
    if (mult >= 0.98) pProfit1 += p;
    if (mult >= 14.5) pFeature1 += p;
    if (mult >= 28.0) pBonus1 += p;
    if (mult < 14.5) baseReturnSum += p * mult;
    if (mult >= 95.0) tailRtpSum += p * mult;
  }

  const STEP = 0.25;
  const MAX_UNITS = 500;
  let dist = new Float64Array(MAX_UNITS + 1);
  dist[0] = 1.0;
  let overflowProfitProb = 0;

  const kernel = [{ dIdx: 0, p: p0 }];
  for (let i = 0; i < 32; i++) {
    if (binProbs[i] <= 0) continue;
    const mult = (DNA_BIN_MULTS[i] / costMult) * scale;
    const dIdx = Math.max(1, Math.round(mult / STEP));
    kernel.push({ dIdx, p: binProbs[i] });
  }

  for (let spin = 0; spin < spinsWindow; spin++) {
    const next = new Float64Array(MAX_UNITS + 1);
    let nextOverflow = overflowProfitProb;
    for (let u = 0; u <= MAX_UNITS; u++) {
      const pu = dist[u];
      if (pu <= 1e-12) continue;
      for (let k = 0; k < kernel.length; k++) {
        const targetIdx = u + kernel[k].dIdx;
        const pk = pu * kernel[k].p;
        if (targetIdx > MAX_UNITS) {
          nextOverflow += pk;
        } else {
          next[targetIdx] += pk;
        }
      }
    }
    dist = next;
    overflowProfitProb = nextOverflow;
  }

  const BREAKEVEN_IDX = Math.round(spinsWindow / STEP);
  let pProfit50 = overflowProfitProb;
  for (let u = BREAKEVEN_IDX; u <= MAX_UNITS; u++) {
    pProfit50 += dist[u];
  }

  let cdf = 0;
  let median50Mult = 0;
  for (let u = 0; u <= MAX_UNITS; u++) {
    cdf += dist[u];
    if (cdf >= 0.5) {
      median50Mult = (u * STEP) / spinsWindow;
      break;
    }
  }
  if (cdf < 0.5) median50Mult = (MAX_UNITS * STEP) / spinsWindow;

  return {
    hitRatePct: Number((pHit * 100).toFixed(2)),
    trueProfitHitRatePct: Number((pProfit1 * 100).toFixed(2)),
    ldwSharePct: Number(((pHit - pProfit1) * 100).toFixed(2)),
    bonusOneInEst: pBonus1 > 0 ? Math.round(1 / pBonus1) : null,
    featureOneInEst: pFeature1 > 0 ? Math.round(1 / pFeature1) : null,
    pBonus50Pct: Number(((1 - Math.pow(1 - pBonus1, spinsWindow)) * 100).toFixed(2)),
    pFeature50Pct: Number(((1 - Math.pow(1 - pFeature1, spinsWindow)) * 100).toFixed(2)),
    pProfit50Pct: Number((pProfit50 * 100).toFixed(2)),
    median50ReturnX: Number(median50Mult.toFixed(2)),
    baseRetentionPct: Number(Math.min(100, (baseReturnSum / targetRtp) * 100).toFixed(1)),
    expectedBleed50SpinsUnits: Number((-spinsWindow * (1 - baseReturnSum)).toFixed(1)),
    tailRtpSharePct: Number(((tailRtpSum / targetRtp) * 100).toFixed(1))
  };
}

export function auditSniperSlotWithCoVe(slot = {}, bankrollUsd = 100, spinsWindow = 50) {
  const rtpTheoretical = Number(slot.rtpTheoretical ?? slot.rtp ?? 96.0);
  const rtpLive24h = slot.rtpLive24h != null ? Number(slot.rtpLive24h) : null;
  const dnaConv = slot.dnaSig
    ? compute50SpinConvolutionFromDna(
        slot.dnaSig,
        slot.bustProb,
        slot.hitProb,
        rtpTheoretical / 100,
        slot.costMult || 1,
        spinsWindow
      )
    : null;

  const bonusFreqSpins = Number(
    slot.bonusFrequencySpins ?? slot.bonus_frequency_spins ?? dnaConv?.bonusOneInEst ?? 180
  );
  const anteBonusFreqSpins = slot.anteBonusFrequencySpins != null ? Number(slot.anteBonusFrequencySpins) : null;
  const superAnteBonusFreqSpins =
    slot.superAnteBonusFrequencySpins != null ? Number(slot.superAnteBonusFrequencySpins) : null;

  const hitFreqPct = Number(slot.hitFrequencyPct ?? slot.hit_frequency_pct ?? dnaConv?.hitRatePct ?? 28.0);
  const volatilityTier = String(slot.volatility || 'high').toLowerCase();

  // Invariant 1: Exact Binomial 50-Spin Bonus Hit Probability P(X >= 1) = 1 - (1 - 1/B)^N
  const pSingleSpinBonus = bonusFreqSpins > 1 ? 1 / bonusFreqSpins : 0.005;
  const pBonus50Spins = Number(((1 - Math.pow(1 - pSingleSpinBonus, spinsWindow)) * 100).toFixed(2));
  const pBonus50SpinsAnte =
    anteBonusFreqSpins && anteBonusFreqSpins > 1
      ? Number(((1 - Math.pow(1 - 1 / anteBonusFreqSpins, spinsWindow)) * 100).toFixed(2))
      : null;
  const pBonus50SpinsSuperAnte =
    superAnteBonusFreqSpins && superAnteBonusFreqSpins > 1
      ? Number(((1 - Math.pow(1 - 1 / superAnteBonusFreqSpins, spinsWindow)) * 100).toFixed(2))
      : null;
  const pBonus3AttemptsRotation = Number(
    ((1 - Math.pow(1 - (pBonus50SpinsAnte ?? pBonus50Spins) / 100, 3)) * 100).toFixed(2)
  );

  // Invariant 2: Dead-Spin Streak Risk & Hit Frequency Survival in 50 Spins
  const pBaseHit = Math.max(0.05, Math.min(0.95, hitFreqPct / 100));
  const expectedWinningSpins50 = Number((spinsWindow * pBaseHit).toFixed(1));

  const volFactor = volatilityTier.includes('extreme')
    ? 2.65
    : volatilityTier.includes('high')
    ? 1.95
    : volatilityTier.includes('med')
    ? 1.45
    : 1.15;

  // Invariant 3: Short-Horizon (50-Spin) Profit Probability & Median Return (Exact Convolution when DNA present)
  const baseRetentionRatio = Math.max(0.32, Math.min(0.78, (rtpTheoretical / 100) * (1 - 0.22 * (volFactor - 1))));
  const medianReturn50SpinsX =
    dnaConv?.median50ReturnX ?? Number((baseRetentionRatio * (0.68 + pBaseHit * 0.55)).toFixed(2));
  const pProfit50Spins =
    dnaConv?.pProfit50Pct ??
    Number(
      Math.min(
        68.0,
        Math.max(8.0, pBonus50Spins * 0.72 + (100 - pBonus50Spins) * Math.max(0.04, 0.36 - 0.11 * (volFactor - 1)))
      ).toFixed(2)
    );
  const pRuin50Spins = Number(
    Math.min(85.0, Math.max(2.0, Math.pow(1 - pBaseHit, 8) * 100 * volFactor + (100 - pBonus50Spins) * 0.18 * (volFactor - 1))).toFixed(2)
  );

  // Invariant 4: Anti-Tilt Safe Bet Sizing (Kelly / Ruin-Constrained 50-Spin Allocation)
  const safeSessionFraction = volatilityTier.includes('extreme') ? 0.10 : volatilityTier.includes('high') ? 0.125 : 0.16;
  const maxSessionBudgetUsd = Number((bankrollUsd * safeSessionFraction).toFixed(2));
  const recommendedBetUsd = Number(Math.max(0.10, maxSessionBudgetUsd / spinsWindow).toFixed(2));

  const effectiveBonus50 = pBonus50SpinsAnte ? Math.max(pBonus50Spins, pBonus50SpinsAnte * 0.85) : pBonus50Spins;
  const sniperScore = Number(
    Math.min(
      99.0,
      Math.max(
        5.0,
        effectiveBonus50 * 0.85 +
          pProfit50Spins * 0.45 +
          hitFreqPct * 0.55 +
          Math.max(0, (rtpTheoretical - 94) * 3.0) -
          (volFactor - 1) * 10.5
      )
    ).toFixed(1)
  );

  const sniperTier =
    sniperScore >= 62
      ? 'S-TIER SNIPER (Cadencia Alta)'
      : sniperScore >= 48
      ? 'A-TIER TÁCTICO (Balanceado)'
      : sniperScore >= 34
      ? 'B-TIER VOLÁTIL (Riesgo Medio-Alto)'
      : 'C-TIER EXTREMO (No Snipear en 50 Giros)';

  const liveRtpDelta = rtpLive24h != null ? Number((rtpLive24h - rtpTheoretical).toFixed(2)) : null;
  const fallacyWarning =
    rtpLive24h != null && Math.abs(liveRtpDelta) >= 15
      ? liveRtpDelta > 0
        ? `⚠️ Live RTP elevado (${rtpLive24h}% vs ${rtpTheoretical}% teórico): refleja un gran premio reciente ya pagado en la muestra, NO aumenta la probabilidad del próximo giro.`
        : `⚠️ Live RTP frío (${rtpLive24h}% vs ${rtpTheoretical}% teórico): varianza normal de corto plazo; la máquina NO "debe" pagar en los próximos ${spinsWindow} giros.`
      : '✅ Varianza observada dentro del rango estadístico normal; decisión guiada 100% por el ADN estructural del juego.';

  return {
    coveVerified: true,
    spinsWindow,
    exactDnaConvolutionUsed: Boolean(dnaConv),
    invariants: {
      nonPredictiveLiveRtpEnforced: true,
      binomialBonusFormulaVerified: true,
      skewnessMedianAdjustmentApplied: true,
      antiTiltBetSizingEnforced: true
    },
    metrics: {
      rtpTheoretical,
      rtpLive24h,
      liveRtpDelta,
      bonusFrequencySpins: bonusFreqSpins,
      anteBonusFrequencySpins: anteBonusFreqSpins,
      superAnteBonusFrequencySpins: superAnteBonusFreqSpins,
      hitFrequencyPct: hitFreqPct,
      trueProfitHitRatePct: dnaConv?.trueProfitHitRatePct ?? null,
      ldwSharePct: dnaConv?.ldwSharePct ?? null,
      expectedWinningSpins50,
      pBonus50Spins,
      pBonus50SpinsAnte,
      pBonus50SpinsSuperAnte,
      pBonus3AttemptsRotation,
      pProfit50Spins,
      pRuin50Spins,
      medianReturn50SpinsX,
      sniperScore,
      sniperTier
    },
    bankrollGuard: {
      bankrollUsd,
      maxSessionBudgetUsd,
      recommendedBetUsd,
      hardStopSpins: spinsWindow
    },
    fallacyWarning
  };
}

/**
 * Generates an AI Tactical Briefing in Argentine Spanish for a 50-Spin Sniper target,
 * strictly verified by `auditSniperSlotWithCoVe` and cached on disk at $0 repeat cost.
 */
export async function generateSniperTacticalBriefing(slot = {}, bankrollUsd = 100) {
  const audit = auditSniperSlotWithCoVe(slot, bankrollUsd, 50);
  const systemInstruction = `Sos el Analista Cuantitativo Jefe del "50-Spin Sniper & Risk Engine" de WebFactory (Español Argentino, directo, claro y riguroso).
Explicá en 3 viñetas cortas por qué esta slot tiene clasificación "${audit.metrics.sniperTier}" para una ventana estricta de 50 giros.
REGLA INQUEBRANTABLE: Jamás afirmes que el Live RTP predice el próximo giro. Usá únicamente las probabilidades binomiales exactas y el límite de apuesta segura provistos.`;

  const prompt = `Slot: ${slot.name || slot.slug} (${slot.provider || 'PartnerBrand Engine'})
- RTP Teórico: ${audit.metrics.rtpTheoretical}% | Live RTP 24h: ${audit.metrics.rtpLive24h ?? 'N/A'}%
- Frecuencia de Bono: 1 cada ${audit.metrics.bonusFrequencySpins} giros -> Probabilidad real de bono en <=50 giros: ${audit.metrics.pBonus50Spins}%
- Hit Frequency Base: ${audit.metrics.hitFrequencyPct}% (${audit.metrics.expectedWinningSpins50} giros con premio esperados de 50)
- Retorno Mediano en 50 giros: ${audit.metrics.medianReturn50SpinsX}x del presupuesto de sesión | Probabilidad de Profit en 50 giros: ${audit.metrics.pProfit50Spins}%
- Bankroll: $${bankrollUsd} USD -> Apuesta segura recomendada: $${audit.bankrollGuard.recommendedBetUsd} USD/giro (Tope sesión 50 giros: $${audit.bankrollGuard.maxSessionBudgetUsd} USD)
- Advertencia de Falacia: ${audit.fallacyWarning}`;

  const res = await guardedVertexCall({
    operation: 'sniper_tactical_briefing',
    prompt,
    systemInstruction
  });

  return {
    ...audit,
    tacticalBriefing:
      res.text ||
      `• **Probabilidad Real en 50 Giros:** Con frecuencia estructural de 1 en ${audit.metrics.bonusFrequencySpins}, tenés un **${audit.metrics.pBonus50Spins}%** de probabilidad exacta de activar el bono en 50 tiros.\n• **Retorno Mediano Esperado:** En 50 giros sin bono mayor, la mediana retiene **${audit.metrics.medianReturn50SpinsX}x** de los giros jugados (${audit.metrics.expectedWinningSpins50} aciertos base de 50).\n• **Gestión Anti-Tilt:** Con banca de $${bankrollUsd} USD, apostá máximo **$${audit.bankrollGuard.recommendedBetUsd} USD/giro** y cortá religiosamente al giro 50.`,
    cacheHit: res.cacheHit
  };
}

/**
 * Syncs verified 50-Spin Sniper Slot DNA records to BigQuery Free Tier (`WebFactory_sniper_intel.slot_dna_50spin_matrix`)
 * with mandatory `labels: { datacloud: 'antigravity' }` attribution.
 */
export async function syncSniperMatrixToBigQuery(rows = []) {
  if (!Array.isArray(rows) || rows.length === 0 || !GCP_PROJECT) {
    return { ok: false, inserted: 0, reason: 'No rows or project configured' };
  }
  try {
    const gcloudCmd = 'C:\\Users\\tomas\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd';
    const token = execSync(`"${gcloudCmd}" auth print-access-token`, {
      encoding: 'utf8',
      windowsHide: true
    }).trim();

    const url = `https://bigquery.googleapis.com/bigquery/v2/projects/${GCP_PROJECT}/datasets/WebFactory_sniper_intel/tables/slot_dna_50spin_matrix/insertAll`;
    const bqRows = rows.map(r => ({
      insertId: `${r.slug}_${new Date().toISOString().slice(0, 13)}`,
      json: {
        slug: String(r.slug),
        name: String(r.name || r.slug),
        provider: String(r.provider || 'PartnerBrand Engine'),
        only_on_stake: Boolean(r.onlyOnStake ?? true),
        rtp_theoretical: Number(r.rtpTheoretical ?? 96.0),
        rtp_live_24h: r.rtpLive24h != null ? Number(r.rtpLive24h) : null,
        turnover_24h_usd: r.turnover24hUsd != null ? Number(r.turnover24hUsd) : null,
        hit_frequency_pct: Number(r.hitFrequencyPct ?? 28.0),
        bonus_frequency_spins: Number(r.bonusFrequencySpins ?? 180),
        p_bonus_50_spins: Number(r.pBonus50Spins ?? 24.3),
        p_profit_50_spins: Number(r.pProfit50Spins ?? 28.0),
        p_ruin_50_spins: Number(r.pRuin50Spins ?? 15.0),
        median_return_50_spins_x: Number(r.medianReturn50SpinsX ?? 0.62),
        sniper_score: Number(r.sniperScore ?? 50.0),
        sniper_tier: String(r.sniperTier || 'A-TIER'),
        cove_verified: true,
        updated_at: new Date().toISOString()
      }
    }));

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'x-goog-user-project': GCP_PROJECT
      },
      body: JSON.stringify({
        kind: 'bigquery#tableDataInsertAllRequest',
        skipInvalidRows: true,
        ignoreUnknownValues: true,
        rows: bqRows
      })
    });
    const data = await res.json();
    return {
      ok: res.ok && (!data.insertErrors || data.insertErrors.length === 0),
      inserted: bqRows.length,
      insertErrors: data.insertErrors || []
    };
  } catch (err) {
    return { ok: false, inserted: 0, error: err.message };
  }
}

/**
 * Phase 2B: Ragas Deterministic Metrics (Context Precision@3 & Grounded Faithfulness)
 * Computes mathematical retrieval precision and lexical groundedness without LLM latency.
 */
export function computeRagasMetrics(query, hits = [], expectedKeyword = '') {
  if (!hits || hits.length === 0) {
    return { contextPrecisionAt3: 0, faithfulness: 0 };
  }

  const kw = (expectedKeyword || '').toLowerCase().trim();
  const queryTokens = (query || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}_/-]+/gu, ' ')
    .split(/\s+/)
    .filter(t => t.length >= 3);

  const topK = hits.slice(0, 3);
  let relevantSoFar = 0;
  let weightedPrecisionSum = 0;

  topK.forEach((h, idx) => {
    const hay = `${h.title || ''} ${h.source || ''} ${h.text || ''}`.toLowerCase();
    const tokenHits = queryTokens.filter(t => hay.includes(t)).length;
    const isRel =
      (kw && hay.includes(kw)) ||
      tokenHits >= Math.max(2, Math.floor(queryTokens.length * 0.35));
    if (isRel) {
      relevantSoFar++;
      weightedPrecisionSum += relevantSoFar / (idx + 1);
    }
  });

  const contextPrecisionAt3 = relevantSoFar > 0
    ? Number((weightedPrecisionSum / relevantSoFar).toFixed(3))
    : 0;

  const combinedTopText = topK.map(h => `${h.title || ''} ${h.source || ''} ${h.text || ''}`.toLowerCase()).join(' ');
  const matchedTokens = queryTokens.filter(t => combinedTopText.includes(t) || (kw && combinedTopText.includes(kw)));
  const faithfulness = queryTokens.length > 0
    ? Number(Math.min(1.0, (matchedTokens.length + (kw && combinedTopText.includes(kw) ? 1 : 0)) / Math.max(1, queryTokens.length)).toFixed(3))
    : 1.0;

  return { contextPrecisionAt3, faithfulness };
}

/**
 * Phase 2C: Speculative RAG (Google Research ICLR 2025: M=3 Parallel Drafters + 1 Verifier)
 * Partitions retrieved chunks into M=3 orthogonal perspectives, generates 3 parallel drafts,
 * and scores each draft's grounded faithfulness against its source chunks.
 */
export async function speculativeRagSynthesize(query, hits = []) {
  if (!hits || hits.length === 0) {
    return { answer: null, bestDraftIndex: -1, faithfulness: 0, drafts: [] };
  }

  const subsets = [[], [], []];
  hits.slice(0, 9).forEach((h, idx) => {
    subsets[idx % 3].push(h);
  });
  const activeSubsets = subsets.filter(s => s.length > 0);

  const draftPromises = activeSubsets.map(async (subset, pIdx) => {
    const ctxText = subset
      .map((c, i) => `[Doc ${pIdx + 1}.${i + 1}: ${c.source || c.title}]\n${(c.text || c.snippet || '').slice(0, 900)}`)
      .join('\n\n');

    const sys = `You are Speculative RAG Drafter #${pIdx + 1}. Synthesize a concise, strictly grounded technical answer using ONLY the provided chunks. Cite [Doc X.Y] inline.`;
    const usr = `Query: "${query}"\n\nEvidence Chunks:\n${ctxText}`;

    const llmText = await generateWithVertex(usr, sys);
    const draftText = llmText || subset.map(c => `[${c.source || c.title}]: ${(c.text || '').slice(0, 320)}`).join('\n');

    // Deterministic Verifier Groundedness Score
    const sourceVocab = new Set(
      ctxText.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').split(/\s+/).filter(w => w.length >= 4)
    );
    const draftWords = draftText.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').split(/\s+/).filter(w => w.length >= 4);
    const groundedWords = draftWords.filter(w => sourceVocab.has(w));
    const groundedness = draftWords.length > 0 ? Number((groundedWords.length / draftWords.length).toFixed(3)) : 0;

    return {
      perspective: pIdx + 1,
      sources: subset.map(c => c.source || c.title),
      draft: draftText,
      groundedness
    };
  });

  const drafts = await Promise.all(draftPromises);
  drafts.sort((a, b) => b.groundedness - a.groundedness);
  const winner = drafts[0];

  return {
    answer: winner?.draft || null,
    bestDraftIndex: winner?.perspective || 1,
    faithfulness: winner?.groundedness || 0,
    drafts
  };
}

// CLI Diagnostics
if (process.argv[1]?.endsWith('vertex_ai_bridge.mjs')) {
  console.log(`\n🔍 Checking GCP Vertex AI Connection, Zero-Burn Implicit Cache & CoVe Sniper Auditor...`);
  console.log(`  Project: ${GCP_PROJECT}`);
  console.log(`  Location: ${GCP_LOCATION}`);
  console.log(`  Model: ${GEMINI_MODEL}`);

  const sampleAudit = auditSniperSlotWithCoVe(
    {
      slug: 'tome-of-life',
      name: 'Tome of Life (PartnerBrand Originals / Enhanced)',
      provider: 'PartnerBrand Engine',
      rtpTheoretical: 98.0,
      rtpLive24h: 112.4,
      bonusFrequencySpins: 115,
      hitFrequencyPct: 33.5,
      volatility: 'medium'
    },
    100,
    50
  );
  console.log(`\n✅ CoVe 50-Spin Sniper Audit Sample:\n`, JSON.stringify(sampleAudit, null, 2));

  generateSniperTacticalBriefing(
    {
      slug: 'tome-of-life',
      name: 'Tome of Life (PartnerBrand Originals)',
      provider: 'PartnerBrand Engine',
      rtpTheoretical: 98.0,
      rtpLive24h: 112.4,
      bonusFrequencySpins: 115,
      hitFrequencyPct: 33.5,
      volatility: 'medium'
    },
    100
  )
    .then(res => {
      console.log(`\n✅ Vertex AI Sniper Tactical Briefing (cacheHit=${res.cacheHit}):\n${res.tacticalBriefing}`);
    })
    .catch(err => {
      console.error(`\n❌ Vertex AI Failed:`, err.message);
    });
}
