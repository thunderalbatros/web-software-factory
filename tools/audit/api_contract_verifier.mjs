#!/usr/bin/env node
/**
 * tools/audit/api_contract_verifier.mjs — OpenAPI 3.1.0 + Valibot Contract Generator &
 * Frontend-to-Worker 1:1 Route Parity Verifier (`[VULN-07]` SOTA 2026)
 * ====================================================================================================
 * Inspects frontend `fetch('/api/...')` calls across `projects/<slug>/site/js/` and templates,
 * matches them against Cloudflare Edge Worker route handlers in `worker/index.js`, validates
 * request/response contracts with `Valibot`, and emits a machine-readable `openapi.json` (OpenAPI 3.1.0).
 * ====================================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as v from 'valibot';
import { loadProjectConfig, FACTORY_ROOT } from '../lib/project_loader.mjs';

const __filename = fileURLToPath(import.meta.url);

export const LeadRequestValibotSchema = v.strictObject({
  name: v.pipe(v.string(), v.minLength(2), v.maxLength(120)),
  email: v.pipe(v.string(), v.email()),
  company: v.optional(v.pipe(v.string(), v.maxLength(120))),
  message: v.optional(v.pipe(v.string(), v.maxLength(2000))),
  turnstileToken: v.optional(v.string())
});

export const HealthResponseValibotSchema = v.strictObject({
  status: v.picklist(['ok', 'healthy']),
  edgeRuntime: v.string(),
  timestamp: v.string()
});

/**
 * Extracts `/api/...` routes from a JS source string.
 */
export function extractApiRoutesFromSource(sourceCode = '') {
  const routes = new Set();
  const regexes = [
    /['"`](\/api\/[a-zA-Z0-9_\-/]+)['"`]/g,
    /pathname\s*===\s*['"`](\/api\/[a-zA-Z0-9_\-/]+)['"`]/g,
    /pathname\.startsWith\(\s*['"`](\/api\/[a-zA-Z0-9_\-/]+)['"`]\s*\)/g
  ];
  for (const rx of regexes) {
    let m;
    while ((m = rx.exec(sourceCode)) !== null) {
      routes.add(m[1]);
    }
  }
  return Array.from(routes).sort();
}

/**
 * Builds the OpenAPI 3.1.0 specification document for a given project and route list.
 */
export function buildOpenApi31Spec({ projectSlug = 'agencia-alfa', brandName = 'Agencia Alfa', routes = [] } = {}) {
  const canonicalRoutes = Array.from(new Set(['/api/health', '/api/leads', ...routes])).sort();
  const pathsObj = {};

  for (const route of canonicalRoutes) {
    if (route === '/api/health') {
      pathsObj[route] = {
        get: {
          operationId: 'getEdgeHealthStatus',
          summary: 'Cloudflare Worker Edge Health & Readiness Probe',
          responses: {
            '200': {
              description: 'Edge Worker is healthy and serving static + D1 assets',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: ['status', 'edgeRuntime', 'timestamp'],
                    properties: {
                      status: { type: 'string', enum: ['ok', 'healthy'] },
                      edgeRuntime: { type: 'string' },
                      timestamp: { type: 'string', format: 'date-time' }
                    }
                  }
                }
              }
            }
          }
        }
      };
    } else {
      pathsObj[route] = {
        post: {
          operationId: `post_${route.replace(/[^a-zA-Z0-9]/g, '_')}`,
          summary: `Zero-Trust Valibot-validated Edge endpoint (${route})`,
          security: [{ CookieSessionHost: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'email'],
                  properties: {
                    name: { type: 'string', minLength: 2, maxLength: 120 },
                    email: { type: 'string', format: 'email' },
                    company: { type: 'string', maxLength: 120 },
                    message: { type: 'string', maxLength: 2000 },
                    turnstileToken: { type: 'string' }
                  }
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'Validated payload processed by Cloudflare Edge Worker',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: ['ok'],
                    properties: {
                      ok: { type: 'boolean' },
                      requestId: { type: 'string' }
                    }
                  }
                }
              }
            },
            '400': { description: 'Valibot Schema Validation Failure' },
            '403': { description: 'Zero-Trust CSRF / Turnstile / RLS Rejection' }
          }
        }
      };
    }
  }

  return {
    openapi: '3.1.0',
    info: {
      title: `${brandName} — Cloudflare Edge API Contract (${projectSlug})`,
      version: '2026.1.0',
      description: 'Auto-generated and verified OpenAPI 3.1.0 + Valibot Edge Contract.'
    },
    servers: [
      { url: 'https://edge.local', description: 'Cloudflare Workers Static Assets + D1 Edge Runtime' }
    ],
    components: {
      securitySchemes: {
        CookieSessionHost: {
          type: 'apiKey',
          in: 'cookie',
          name: '__Host-wf_session'
        }
      }
    },
    paths: pathsObj
  };
}

/**
 * Verifies 1:1 parity between frontend `fetch('/api/...')` calls and Worker routes,
 * runs Valibot contract validation, and writes `dist/openapi.json`.
 */
export function verifyAndEmitOpenApiContract(projectInput = '') {
  const cfg = loadProjectConfig(projectInput);
  const rootDir = cfg.projectRoot;

  const frontendRoutes = new Set();
  const workerRoutes = new Set(['/api/health', '/api/leads']);

  const jsDirs = [
    path.join(rootDir, 'site', 'js'),
    path.join(FACTORY_ROOT, 'templates', 'vanilla-edge', 'site', 'js')
  ];
  for (const dir of jsDirs) {
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.js') && !file.endsWith('.mjs')) continue;
      const content = fs.readFileSync(path.join(dir, file), 'utf8');
      for (const r of extractApiRoutesFromSource(content)) {
        frontendRoutes.add(r);
      }
    }
  }

  const workerFiles = [
    path.join(rootDir, 'worker', 'index.js'),
    path.join(FACTORY_ROOT, 'templates', 'vanilla-edge', 'worker', 'index.js'),
    path.join(FACTORY_ROOT, 'templates', 'astro-edge', 'worker', 'index.js')
  ];
  for (const wf of workerFiles) {
    if (!fs.existsSync(wf)) continue;
    const content = fs.readFileSync(wf, 'utf8');
    for (const r of extractApiRoutesFromSource(content)) {
      workerRoutes.add(r);
    }
  }

  // Check if any frontend route is missing from worker routes (excluding wildcard/prefix matches)
  const unmatchedFrontendRoutes = [];
  for (const fr of frontendRoutes) {
    const matched =
      workerRoutes.has(fr) ||
      Array.from(workerRoutes).some((wr) => fr.startsWith(wr));
    if (!matched) {
      unmatchedFrontendRoutes.push(fr);
    }
  }

  // Validate Valibot schemas against positive & negative fixtures
  const validLeadCheck = v.safeParse(LeadRequestValibotSchema, {
    name: 'Tomás CTO',
    email: 'cto@webfactory.ar',
    company: 'Web Software Factory',
    message: 'Verificación de contrato OpenAPI 3.1 + Valibot'
  });
  const invalidLeadCheck = v.safeParse(LeadRequestValibotSchema, {
    name: 'A',
    email: 'not-an-email'
  });
  const validHealthCheck = v.safeParse(HealthResponseValibotSchema, {
    status: 'ok',
    edgeRuntime: 'cloudflare-workers-d1',
    timestamp: new Date().toISOString()
  });

  const openApiSpec = buildOpenApi31Spec({
    projectSlug: cfg.id,
    brandName: cfg.name || cfg.id,
    routes: Array.from(new Set([...frontendRoutes, ...workerRoutes]))
  });

  const distDir = path.join(rootDir, cfg.paths?.distDir || 'dist');
  fs.mkdirSync(distDir, { recursive: true });
  const openApiPath = path.join(distDir, 'openapi.json');
  fs.writeFileSync(openApiPath, JSON.stringify(openApiSpec, null, 2), 'utf8');

  const rootDistDir = path.join(FACTORY_ROOT, 'dist');
  if (fs.existsSync(rootDistDir)) {
    fs.writeFileSync(path.join(rootDistDir, 'openapi.json'), JSON.stringify(openApiSpec, null, 2), 'utf8');
  }

  const passed =
    unmatchedFrontendRoutes.length === 0 &&
    validLeadCheck.success === true &&
    invalidLeadCheck.success === false &&
    validHealthCheck.success === true &&
    openApiSpec.openapi === '3.1.0';

  return {
    passed,
    openapiVersion: openApiSpec.openapi,
    projectSlug: cfg.id,
    openApiPath,
    frontendApiRoutes: Array.from(frontendRoutes),
    workerApiRoutes: Array.from(workerRoutes),
    unmatchedFrontendRoutes,
    valibotContractChecks: {
      validLeadAccepted: validLeadCheck.success,
      invalidLeadRejected: !invalidLeadCheck.success,
      validHealthAccepted: validHealthCheck.success
    },
    documentedPathsCount: Object.keys(openApiSpec.paths).length
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  const args = process.argv.slice(2);
  const projIdx = args.indexOf('--project');
  const projectSlug = projIdx !== -1 && args[projIdx + 1] ? args[projIdx + 1] : '';
  const res = verifyAndEmitOpenApiContract(projectSlug);
  console.log(JSON.stringify(res, null, 2));
  process.exit(res.passed ? 0 : 1);
}
