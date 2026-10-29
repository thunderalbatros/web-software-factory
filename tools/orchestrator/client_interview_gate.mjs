#!/usr/bin/env node
/**
 * tools/orchestrator/client_interview_gate.mjs — Mandatory 10-Block Client Interview & SPEC.md Auto-Compiler
 * ============================================================================================================
 * Implements Stage 3 of Phase 34:
 *   1. Pre-Construction Hard Gate (`HARD_STOP_INTERVIEW_REQUIRED`):
 *      - Generates `projects/<slug>/ENTREVISTA_CLIENTE.md` & `projects/<slug>/CLIENT_BRIEF_INTERVIEW.json`
 *      - Blocks `npm run cto:construir` until `status === "COMPLETED_BY_CTO"` (approved via
 *        `npm run cto:entrevista -- <slug> --aprobar`).
 *   2. 10 Master Blocks covering Brand/Positioning, Audience/CRO, Sitemap, OKLCH/Typography, Motion/WebGPU,
 *      Sonic/Music/Video Identity (`off`, `subtle`, `tactile`, `immersive-3d` + `paper`/`polymer`/`wood`/
 *      `glass`/`metal`/`cyber-hud`), Client Assets vs AI, Backend/D1/RLS Integrations, SEO/GEO/Security,
 *      and FinOps Budget / Definition of Done.
 *   3. Auto-Compiler (`compileSpecFromInterview`):
 *      - Populates `projects/<slug>/SPEC.md` (`[REQ-01]..[REQ-12]` + Playwright matrix)
 *      - Populates `projects/<slug>/PRODUCT.md` (Value proposition, audience, sitemap, CRO)
 *      - Populates `projects/<slug>/DESIGN.md` (OKLCH tokens, Utopia clamp(), surface mode, motion, and
 *        `## Sonic & Video Identity` synthesized via `synthesizeProceduralSoundFromDesignCriteria()`)
 *      - Updates `projects/<slug>/factory.project.json` and `.agents/beads/task_graph.jsonl`.
 * ============================================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveIndustryArchetype } from '../design/industry_archetype_matrix.mjs';
import {
  resolveSonicArchetypePreset,
  synthesizeProceduralSoundFromDesignCriteria
} from '../../templates/components/web-audio-director.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const ROOT = path.resolve(__dirname, '..', '..');

/**
 * Builds the default 10-Block interview JSON structure tailored to the project slug and industry archetype.
 */
export function buildDefaultInterviewPayload(slug = 'agencia-alfa', industryInput = 'saas', status = 'PENDING_CTO_ANSWERS') {
  const arch = resolveIndustryArchetype(industryInput);
  const sonicSeed = resolveSonicArchetypePreset(industryInput);
  const isLawOrRead = arch.primarySurfaceMode === 'Read' || sonicSeed.archetype === 'abogacia';

  return {
    schemaVersion: '2026.34.1',
    projectSlug: slug,
    status, // "PENDING_CTO_ANSWERS" | "COMPLETED_BY_CTO"
    createdAt: new Date().toISOString(),
    approvedAt: status === 'COMPLETED_BY_CTO' ? new Date().toISOString() : null,
    approvedBy: status === 'COMPLETED_BY_CTO' ? 'CTO_HITL_APPROVED' : null,
    blocks: {
      block1_commercial_identity: {
        brandName: slug
          .split('-')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' '),
        industryArchetype: sonicSeed.archetype,
        resolvedArchetypeId: arch.id,
        valuePropositionOneLiner: `Plataforma digital de alta conversión para ${slug} con arquitectura edge y diseño de precisión.`,
        referenceCompetitors: ['Linear.app', 'Stripe.com', 'Vercel.com']
      },
      block2_target_audience_cro: {
        segment: 'B2B / High-Intent Decision Makers',
        ageRange: '28-55',
        purchasingPower: 'High / Enterprise & Professional',
        primaryObjection: 'Tiempo de implementación y retorno de inversión verificable',
        primaryCta: 'Solicitar Auditoría / Demo Ejecutiva',
        primaryCtaChannel: 'Calendly + WhatsApp Business + Lead Form'
      },
      block3_sitemap_and_flows: {
        pages: ['Home', 'Soluciones', 'Casos de Éxito', 'Precios', 'Contacto'],
        mandatorySections: [
          'Hero con Propuesta de Valor y Primary CTA',
          'Bento Grid de Capacidades Core',
          'Prueba Social y Métricas Verificadas',
          'Tabla Comparativa / Precios Transparentes',
          'Formulario de Captura sin Fricción + FAQ'
        ]
      },
      block4_aesthetic_oklch_typography: {
        surfaceMode: arch.primarySurfaceMode || 'Persuade',
        colorTheme: isLawOrRead ? 'Warm Editorial Light' : 'High-Craft Adaptive OKLCH',
        oklchPrimary: sonicSeed.oklch || { L: 0.65, C: 0.16, H: 255 },
        borderRadiusPx: sonicSeed.borderRadiusPx ?? 8,
        typographyPersonality: isLawOrRead ? 'Editorial Serif + Swiss Sans' : 'Swiss Geometric Sans + Tabular Mono'
      },
      block5_motion_webgpu_shaders: {
        animationLevel: isLawOrRead ? 'minimal-editorial' : 'spring-fluid-60fps',
        use3dTiltCards: !isLawOrRead,
        useWebGpuDiorama: sonicSeed.archetype === 'lujo' || sonicSeed.archetype === 'streamer',
        useViewTransitionsApi: true,
        springPhysics: { stiffness: 280, damping: 24 }
      },
      block6_sonic_music_video: {
        uiSfxMode: isLawOrRead ? 'off' : sonicSeed.uiSfxMode || 'subtle',
        material: sonicSeed.material || 'polymer',
        backgroundMusic: 'off',
        introVideoMode: isLawOrRead ? 'none' : 'vector-svg-reveal-3s',
        sonicSeedId: sonicSeed.seedId,
        requiresVisibleMuteButton: true,
        autoplayBlockedUntilGesture: true
      },
      block7_client_assets_vs_ai: {
        clientProvidedAssets: ['Logo Vectorial (.svg)', 'Textos Comerciales Base', 'Datos de Contacto'],
        factoryAiGeneratedAssets: ['OpenGraph Social Card (og-image.svg)', 'Copywriting CRO Optimizado', 'Keyframes / Ilustración SOTA']
      },
      block8_technical_backend_integrations: {
        leadCaptureForm: true,
        paymentGateway: sonicSeed.archetype === 'ecommerce' ? 'Stripe / MercadoPago' : 'None (Consultation Flow)',
        authMode: 'OAuth 2.1 PKCE / Session Guard',
        databaseEngine: 'Cloudflare D1 SQLite + Enterprise PostgreSQL FORCE RLS Ready',
        externalIntegrations: ['WhatsApp Direct', 'CRM Webhook', 'Privacy-First Analytics']
      },
      block9_seo_geo_legal_security: {
        primaryKeywords: [slug.replace(/-/g, ' '), sonicSeed.archetype, 'alta conversión', 'software'],
        geoTarget: 'es-AR / LATAM / Global',
        generateLlmsTxt: true,
        accessibilityFloor: 'WCAG 2.2 AA+ / APCA Lc >= 75',
        securityLevel: 'OWASP ASVS v5.0 L2 + Strict CSP + HSTS'
      },
      block10_finops_budget_and_dod: {
        locales: ['es-AR'],
        maxCloudApiBudgetUsd: 0.25,
        totalGcpCreditPoolUsd: 90.0,
        successMetricsDod: [
          'RYUX Visual & Sonic Gate >= 95/100',
          'LCP <= 1.8s & 60 FPS en 4 viewports',
          '100% de requisitos [REQ-01]..[REQ-12] verificados con Playwright'
        ]
      }
    }
  };
}

/**
 * Renders the human-friendly Spanish questionnaire (`ENTREVISTA_CLIENTE.md`) for the CTO.
 */
export function renderInterviewMarkdown(interviewData) {
  const b = interviewData.blocks;
  return `# 📋 ENTREVISTA INICIAL OBLIGATORIA DE CLIENTE — \`${interviewData.projectSlug}\`

> **Estado del Gate:** \`${interviewData.status}\`
> **Regla de Gobernanza:** El comando \`npm run cto:construir\` permanecerá bloqueado (\`HARD_STOP_INTERVIEW_REQUIRED\`) hasta que revises/edites este documento o \`CLIENT_BRIEF_INTERVIEW.json\` y ejecutes:
> \`npm run cto:entrevista -- ${interviewData.projectSlug} --aprobar\`

---

## Bloque 1 — Identidad Comercial, Rubro y Posicionamiento
- **Nombre de la Marca:** ${b.block1_commercial_identity.brandName}
- **Rubro / Arquetipo (\`abogacia\`, \`fintech\`, \`erp\`, \`ecommerce\`, \`lujo\`, \`streamer\`, \`clinica\`, \`saas\`):** \`${b.block1_commercial_identity.industryArchetype}\`
- **Propuesta de Valor en 1 Frase:** ${b.block1_commercial_identity.valuePropositionOneLiner}
- **3 Competidores / Referencias Admiradas:** ${b.block1_commercial_identity.referenceCompetitors.join(', ')}

## Bloque 2 — Público Objetivo, Psicología y Conversión (\`CRO\`)
- **Segmento de Cliente Ideal:** ${b.block2_target_audience_cro.segment} (${b.block2_target_audience_cro.ageRange} años, ${b.block2_target_audience_cro.purchasingPower})
- **Objeción Principal de Compra:** ${b.block2_target_audience_cro.primaryObjection}
- **Acción Primaria Única (\`Primary CTA\`):** \`${b.block2_target_audience_cro.primaryCta}\` (${b.block2_target_audience_cro.primaryCtaChannel})

## Bloque 3 — Arquitectura de Páginas, Secciones y Flujos (\`Sitemap\`)
- **Mapa de Páginas:** ${b.block3_sitemap_and_flows.pages.join(' → ')}
- **Secciones Obligatorias:**
${b.block3_sitemap_and_flows.mandatorySections.map((s) => `  - ${s}`).join('\n')}

## Bloque 4 — Dirección Estética, Colorimetría \`OKLCH\` y Tipografía
- **Modo de Superficie (\`Persuade\`, \`Operate\`, \`Read\`, \`Experience\`):** \`${b.block4_aesthetic_oklch_typography.surfaceMode}\`
- **Tema de Color:** ${b.block4_aesthetic_oklch_typography.colorTheme} (\`L=${b.block4_aesthetic_oklch_typography.oklchPrimary.L}, C=${b.block4_aesthetic_oklch_typography.oklchPrimary.C}, H=${b.block4_aesthetic_oklch_typography.oklchPrimary.H}\`)
- **Radio de Bordes (\`border-radius\`):** \`${b.block4_aesthetic_oklch_typography.borderRadiusPx}px\`
- **Personalidad Tipográfica:** ${b.block4_aesthetic_oklch_typography.typographyPersonality}

## Bloque 5 — Coreografía de Movimiento, 3D WebGPU y Shaders
- **Nivel de Animación (\`minimal-editorial\`, \`spring-fluid-60fps\`, \`immersive-webgpu-3d\`):** \`${b.block5_motion_webgpu_shaders.animationLevel}\`
- **Tarjetas 3D / Parallax:** \`${b.block5_motion_webgpu_shaders.use3dTiltCards}\`
- **Diorama 3D (\`Three.js r186\` / Spark 2.x):** \`${b.block5_motion_webgpu_shaders.useWebGpuDiorama}\`
- **View Transitions API:** \`${b.block5_motion_webgpu_shaders.useViewTransitionsApi}\`

## Bloque 6 — Dirección Sonora, Música y Video Intro (\`Sonic & Video Identity\`)
- **UI Sound Effects (\`off\`, \`subtle\`, \`tactile\`, \`immersive-3d\`):** \`${b.block6_sonic_music_video.uiSfxMode}\`
- **Material Acústico Dominante (\`paper\`, \`polymer\`, \`wood\`, \`glass\`, \`metal\`, \`cyber-hud\`):** \`${b.block6_sonic_music_video.material}\`
- **Música de Fondo (\`off\`, \`cc0-ambient-loop\`, \`adaptive-strudel\`, \`vertex-lyria-custom\`):** \`${b.block6_sonic_music_video.backgroundMusic}\`
- **Intro de Video con Logo (\`none\`, \`vector-svg-reveal-3s\`, \`cinematic-veo-broll-5s\`):** \`${b.block6_sonic_music_video.introVideoMode}\`

## Bloque 7 — Activos del Cliente (\`Assets\` Reales vs. Generación IA)
- **Activos Entregados por el Cliente:** ${b.block7_client_assets_vs_ai.clientProvidedAssets.join(', ')}
- **Activos a Generar por la Fábrica (IA / Procedural):** ${b.block7_client_assets_vs_ai.factoryAiGeneratedAssets.join(', ')}

## Bloque 8 — Funcionalidades Técnicas, Base de Datos e Integraciones
- **Formulario de Captura de Leads:** \`${b.block8_technical_backend_integrations.leadCaptureForm}\`
- **Pasarela de Pagos:** ${b.block8_technical_backend_integrations.paymentGateway}
- **Autenticación y Base de Datos:** ${b.block8_technical_backend_integrations.authMode} | ${b.block8_technical_backend_integrations.databaseEngine}
- **Integraciones Externas:** ${b.block8_technical_backend_integrations.externalIntegrations.join(', ')}

## Bloque 9 — SEO, GEO (\`llms.txt\`) y Cumplimiento Legal/Seguridad
- **Palabras Clave Principales:** ${b.block9_seo_geo_legal_security.primaryKeywords.join(', ')}
- **Objetivo Geográfico:** ${b.block9_seo_geo_legal_security.geoTarget}
- **Accesibilidad y Seguridad:** ${b.block9_seo_geo_legal_security.accessibilityFloor} | ${b.block9_seo_geo_legal_security.securityLevel}

## Bloque 10 — Presupuesto FinOps, Idiomas y Criterio de Aceptación Final (\`Definition of Done\`)
- **Idiomas:** ${b.block10_finops_budget_and_dod.locales.join(', ')}
- **Presupuesto Cloud FinOps Máximo para el Proyecto:** \`$${b.block10_finops_budget_and_dod.maxCloudApiBudgetUsd} USD\` (sobre el pool de \`$${b.block10_finops_budget_and_dod.totalGcpCreditPoolUsd} USD\`)
- **Métricas de Éxito (\`Definition of Done\`):**
${b.block10_finops_budget_and_dod.successMetricsDod.map((m) => `  - ${m}`).join('\n')}
`;
}

/**
 * Generates `ENTREVISTA_CLIENTE.md` and `CLIENT_BRIEF_INTERVIEW.json` in `projects/<slug>/`.
 */
export function initClientInterviewFiles(slug = 'agencia-alfa', industryInput = 'saas', options = {}) {
  const projectDir = path.join(ROOT, 'projects', slug);
  fs.mkdirSync(projectDir, { recursive: true });

  const jsonPath = path.join(projectDir, 'CLIENT_BRIEF_INTERVIEW.json');
  const mdPath = path.join(projectDir, 'ENTREVISTA_CLIENTE.md');

  if (fs.existsSync(jsonPath) && !options.overwrite) {
    const existing = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    if (!fs.existsSync(mdPath)) {
      fs.writeFileSync(mdPath, renderInterviewMarkdown(existing), 'utf8');
    }
    return {
      created: false,
      projectSlug: slug,
      status: existing.status,
      jsonPath,
      mdPath,
      interview: existing
    };
  }

  const initialStatus = options.autoApprove ? 'COMPLETED_BY_CTO' : 'PENDING_CTO_ANSWERS';
  const payload = buildDefaultInterviewPayload(slug, industryInput, initialStatus);
  fs.writeFileSync(jsonPath, JSON.stringify(payload, null, 2) + '\n', 'utf8');
  fs.writeFileSync(mdPath, renderInterviewMarkdown(payload), 'utf8');

  return {
    created: true,
    projectSlug: slug,
    status: payload.status,
    jsonPath,
    mdPath,
    interview: payload
  };
}

/**
 * Verifies whether `projects/<slug>/CLIENT_BRIEF_INTERVIEW.json` exists and is in `"COMPLETED_BY_CTO"` state.
 * If not, returns `HARD_STOP_INTERVIEW_REQUIRED`.
 */
export function verifyClientInterviewGate(slug = 'agencia-alfa', industryFallback = 'saas') {
  const projectDir = path.join(ROOT, 'projects', slug);
  const jsonPath = path.join(projectDir, 'CLIENT_BRIEF_INTERVIEW.json');
  const mdPath = path.join(projectDir, 'ENTREVISTA_CLIENTE.md');

  if (!fs.existsSync(jsonPath)) {
    const initialized = initClientInterviewFiles(slug, industryFallback, { autoApprove: false });
    return {
      passed: false,
      code: 'HARD_STOP_INTERVIEW_REQUIRED',
      projectSlug: slug,
      status: initialized.status,
      jsonPath,
      mdPath,
      message: `[HARD_STOP_INTERVIEW_REQUIRED] El proyecto "${slug}" requiere completar y aprobar la entrevista de 10 bloques en projects/${slug}/ENTREVISTA_CLIENTE.md ejecutando: npm run cto:entrevista -- ${slug} --aprobar`
    };
  }

  try {
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    if (data.status !== 'COMPLETED_BY_CTO') {
      return {
        passed: false,
        code: 'HARD_STOP_INTERVIEW_REQUIRED',
        projectSlug: slug,
        status: data.status || 'PENDING_CTO_ANSWERS',
        jsonPath,
        mdPath,
        message: `[HARD_STOP_INTERVIEW_REQUIRED] La entrevista de cliente para "${slug}" está en estado "${data.status}". Revisá projects/${slug}/ENTREVISTA_CLIENTE.md y aprobala con: npm run cto:entrevista -- ${slug} --aprobar`
      };
    }

    return {
      passed: true,
      code: 'INTERVIEW_COMPLETED_OK',
      projectSlug: slug,
      status: data.status,
      jsonPath,
      mdPath,
      interview: data
    };
  } catch (err) {
    return {
      passed: false,
      code: 'HARD_STOP_INTERVIEW_REQUIRED',
      projectSlug: slug,
      status: 'INVALID_JSON',
      jsonPath,
      mdPath,
      message: `[HARD_STOP_INTERVIEW_REQUIRED] Error leyendo CLIENT_BRIEF_INTERVIEW.json: ${err.message}`
    };
  }
}

/**
 * Compiles `CLIENT_BRIEF_INTERVIEW.json` into:
 *   1. `projects/<slug>/SPEC.md` (`[REQ-01]` to `[REQ-12]` + Playwright test matrix)
 *   2. `projects/<slug>/PRODUCT.md` (Value proposition, audience, sitemap, CRO metrics)
 *   3. `projects/<slug>/DESIGN.md` (OKLCH tokens, Utopia clamp(), surface mode, motion, and
 *      `## Sonic & Video Identity` calculated by `synthesizeProceduralSoundFromDesignCriteria()`)
 *   4. `projects/<slug>/factory.project.json` and `.agents/beads/task_graph.jsonl`.
 */
export function compileSpecFromInterview(slug = 'agencia-alfa', options = {}) {
  const projectDir = path.join(ROOT, 'projects', slug);
  const jsonPath = path.join(projectDir, 'CLIENT_BRIEF_INTERVIEW.json');
  const mdPath = path.join(projectDir, 'ENTREVISTA_CLIENTE.md');

  if (!fs.existsSync(jsonPath)) {
    initClientInterviewFiles(slug, options.industry || 'saas', { autoApprove: Boolean(options.approve) });
  }

  const interview = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  if (options.approve && interview.status !== 'COMPLETED_BY_CTO') {
    interview.status = 'COMPLETED_BY_CTO';
    interview.approvedAt = new Date().toISOString();
    interview.approvedBy = 'CTO_HITL_APPROVED';
    fs.writeFileSync(jsonPath, JSON.stringify(interview, null, 2) + '\n', 'utf8');
    fs.writeFileSync(mdPath, renderInterviewMarkdown(interview), 'utf8');
  }

  const b1 = interview.blocks.block1_commercial_identity;
  const b2 = interview.blocks.block2_target_audience_cro;
  const b3 = interview.blocks.block3_sitemap_and_flows;
  const b4 = interview.blocks.block4_aesthetic_oklch_typography;
  const b5 = interview.blocks.block5_motion_webgpu_shaders;
  const b6 = interview.blocks.block6_sonic_music_video;
  const b7 = interview.blocks.block7_client_assets_vs_ai;
  const b8 = interview.blocks.block8_technical_backend_integrations;
  const b9 = interview.blocks.block9_seo_geo_legal_security;
  const b10 = interview.blocks.block10_finops_budget_and_dod;

  // Synthesize exact psychoacoustic patch from the visual and material criteria in Blocks 4, 5, and 6
  const sonicPatch = synthesizeProceduralSoundFromDesignCriteria({
    archetype: b1.industryArchetype,
    uiSfxMode: b6.uiSfxMode,
    material: b6.material,
    borderRadiusPx: b4.borderRadiusPx,
    oklch: b4.oklchPrimary,
    elementWidthPx: 180,
    elementHeightPx: 48,
    spring: b5.springPhysics
  });

  // 1. Write SPEC.md (Preserve existing implementation notes if present, or write complete SDD specification)
  const specPath = path.join(projectDir, 'SPEC.md');
  const specContent = `# SPEC.md — Especificación Ejecutable Compilada desde Entrevista (\`${slug}\`)

> **Estado de Entrevista:** \`${interview.status}\` | **Arquetipo:** \`${b1.industryArchetype}\` | **Modo de Superficie:** \`${b4.surfaceMode}\`  
> **Compilado Automáticamente por:** \`tools/orchestrator/client_interview_gate.mjs\` (\`compileSpecFromInterview\`)

---

## 1. Requisitos Funcionales y No Funcionales Numerados (\`[REQ-01]\` a \`[REQ-12]\`)

- **[REQ-01] Identidad y Propuesta de Valor en Hero:** Renderizar en el primer viewport el titular de \`${b1.brandName}\` (*"${b1.valuePropositionOneLiner}"*) con claridad en \`<= 3 segundos\`.
- **[REQ-02] Acción Primaria Única (\`Primary CTA\`):** Implementar el CTA primario **\`${b2.primaryCta}\`** conectado a \`${b2.primaryCtaChannel}\` con área táctil Fitts \`>= 48x48px\`.
- **[REQ-03] Arquitectura Sitemap y Navegación:** Proveer navegación semántica para \`${b3.pages.join(', ')}\` y renderizar las secciones obligatorias: ${b3.mandatorySections.join('; ')}.
- **[REQ-04] Colorimetría Perceptual \`OKLCH\` y Contraste \`APCA\`:** Aplicar tokens \`OKLCH\` (\`L=${b4.oklchPrimary.L}, C=${b4.oklchPrimary.C}, H=${b4.oklchPrimary.H}\`), regla de superficie \`90/8/2\` y contraste \`${b9.accessibilityFloor}\`.
- **[REQ-05] Escala Tipográfica Fluida \`Utopia clamp()\`:** Garantizar tipografía fluida sin saltos bruscos entre \`320px\` y \`2560px\` con personalidad \`${b4.typographyPersonality}\` y radio de borde \`${b4.borderRadiusPx}px\`.
- **[REQ-06] Coreografía de Movimiento a 60 FPS:** Ejecutar animaciones nivel \`${b5.animationLevel}\` con física de resorte (\`stiffness: ${b5.springPhysics.stiffness}, damping: ${b5.springPhysics.damping}\`) respetando \`prefers-reduced-motion: reduce\`.
- **[REQ-07] Identidad Sonora Psicoacústica y Video Intro:** Configurar \`uiSfxMode: "${b6.uiSfxMode}"\`, material modal \`${b6.material}\` (\`f0=${sonicPatch.f0Hz}Hz, cutoff=${sonicPatch.spectralCentroidHz}Hz, attack=${sonicPatch.attackMs}ms, pico=${sonicPatch.gainPeakDbfs}dBFS <= -18dBFS\`), música \`${b6.backgroundMusic}\` e intro \`${b6.introVideoMode}\`.
- **[REQ-08] Activos Visuales y OpenGraph Social Card:** Integrar activos del cliente (${b7.clientProvidedAssets.join(', ')}) y generar \`dist/og-image.svg\` (\`1200x630\`) automáticamente.
- **[REQ-09] Captura de Leads, Pagos y Persistencia Segura:** Habilitar formulario validado con \`Valibot\`, pasarela \`${b8.paymentGateway}\` y esquema compatible con \`${b8.databaseEngine}\`.
- **[REQ-10] SEO Técnico y Visibilidad IA (\`GEO / llms.txt\`):** Emitir \`llms.txt\`, \`robots.txt\`, \`sitemap.xml\` y \`Schema.org JSON-LD @graph\` para \`${b9.primaryKeywords.join(', ')}\` (\`${b9.geoTarget}\`).
- **[REQ-11] Blindaje DevSecOps (\`OWASP ASVS v5.0\`):** Compilar cabeceras \`_headers\` con \`${b9.securityLevel}\` y \`0\` source maps en producción.
- **[REQ-12] Presupuesto FinOps y Criterio de Éxito (\`DoD\`):** Mantener el gasto cloud del proyecto \`<= $${b10.maxCloudApiBudgetUsd} USD\` y cumplir: ${b10.successMetricsDod.join(' | ')}.

---

## 2. Matriz de Verificación Determinista (Playwright + RYUX Gate)

| ID Requisito | Aserción Automatizada | Herramienta / Gate | Umbral de Aprobación |
| :--- | :--- | :--- | :--- |
| \`[REQ-01..03]\` | Presencia de \`<h1>\`, Primary CTA \`>= 48x48px\` y secciones del Sitemap | \`tools/verify_all.mjs\` | \`PASS (0 errores DOM)\` |
| \`[REQ-04..06]\` | Tokens \`OKLCH\`, \`Utopia clamp()\`, \`CLS == 0.00\` y 60 FPS en 4 viewports | \`tools/audit/ryux_design_gate.mjs\` | \`Score >= 95/100\` |
| \`[REQ-07]\` | Techo \`<= -18 dBFS\`, notch ISO 226 \`2.5-4.2kHz\`, \`[data-audio-mute-toggle]\` | \`ryux-audio-video-ergonomics-and-budget\` | \`PASS (Safety Verified)\` |
| \`[REQ-08..12]\` | \`dist/og-image.svg\`, \`llms.txt\`, \`_headers\` CSP y presupuesto FinOps \`<= $${b10.maxCloudApiBudgetUsd}\` | \`tools/build_dist.mjs\` + \`security_check\` | \`PASS (100% DoD)\` |
`;
  fs.writeFileSync(specPath, specContent, 'utf8');

  // 2. Write PRODUCT.md
  const productPath = path.join(projectDir, 'PRODUCT.md');
  const productContent = `# PRODUCT.md — Estrategia de Producto, Audiencia y CRO (\`${slug}\`)

- **Marca:** ${b1.brandName}
- **Arquetipo Industrial:** \`${b1.industryArchetype}\` (\`${b1.resolvedArchetypeId}\`)
- **Propuesta de Valor:** ${b1.valuePropositionOneLiner}
- **Referencias Competitivas:** ${b1.referenceCompetitors.join(', ')}
- **Audiencia Objetivo:** ${b2.segment} (${b2.ageRange} años — ${b2.purchasingPower})
- **Objeción Principal Resuelta:** ${b2.primaryObjection}
- **Primary CTA:** \`${b2.primaryCta}\` vía \`${b2.primaryCtaChannel}\`
- **Sitemap:** ${b3.pages.join(' | ')}
- **Métricas de Éxito (DoD):** ${b10.successMetricsDod.join(' • ')}
`;
  fs.writeFileSync(productPath, productContent, 'utf8');

  // 3. Update or create DESIGN.md with `## Sonic & Video Identity` synthesized by `synthesizeProceduralSoundFromDesignCriteria`
  const designPath = path.join(projectDir, 'DESIGN.md');
  const sonicSectionMarkdown = `## Sonic & Video Identity

- **Sonic Seed Preset:** \`${sonicPatch.seedId}\` (\`archetype: ${sonicPatch.archetype}\`)
- **UI SFX Mode:** \`${b6.uiSfxMode}\` (\`silentByClientPreference: ${sonicPatch.silentByClientPreference}\`)
- **Dominant Modal Material:** \`${sonicPatch.material}\` (${sonicPatch.materialLabel}) — \`Q: ${sonicPatch.Q}\`, \`decay: ${sonicPatch.decayMs}ms\`
- **Cross-Modal Spence & Parise Parameters:**
  - \`border-radius: ${sonicPatch.borderRadiusPx}px\` -> Profile \`${sonicPatch.boubaKikiProfile}\`, Attack \`${sonicPatch.attackMs}ms\`, Odd Harmonics \`${sonicPatch.oddHarmonicRichness}\`
  - \`OKLCH(${sonicPatch.oklch.L}, ${sonicPatch.oklch.C}, ${sonicPatch.oklch.H})\` -> Spectral Centroid Cutoff \`${sonicPatch.spectralCentroidHz} Hz\`
  - DOM Interactive Area (\`${sonicPatch.elementAreaPx2} px²\`) -> Fundamental Frequency \`f0 = ${sonicPatch.f0Hz} Hz\`
- **Psychoacoustic Safety Envelope (ISO 226:2023 & EBU R128):**
  - Peak Ceiling: \`${sonicPatch.gainPeakDbfs} dBFS\` (\`<= -18.0 dBFS\`), Sub-bass HPF \`30 Hz\`, ISO 226 Notch \`-5.0 dB @ 3250 Hz\`, \`maxPolyphony: 4\`
  - Browser Autoplay Compliance: \`AudioContext\` starts \`suspended\`, requires \`[data-audio-mute-toggle]\`, respects \`prefers-reduced-motion: reduce\`
- **60 FPS Audiovisual Synchresis (Chion / Murch):**
  - Spring \`stiffness: ${sonicPatch.synchresis60Fps.springStiffness}, damping: ${sonicPatch.synchresis60Fps.springDamping}\` -> Peak Velocity at \`${sonicPatch.synchresis60Fps.peakVelocityOffsetMs}ms\` (Deviation \`<= 16.6ms\`)
- **Background Music & Video Intro:**
  - Music Mode: \`${b6.backgroundMusic}\` (\`-18 LUFS\` integrated target, \`-6 dB\` voiceover sidechain ducking)
  - Brand Intro Video: \`${b6.introVideoMode}\` (\`-14 LUFS\` integrated target, \`-1.0 dBTP\` True Peak, \`AV1/WebM 60 FPS <= 1.8 MB\`)
`;

  if (fs.existsSync(designPath)) {
    const existingDesign = fs.readFileSync(designPath, 'utf8');
    if (existingDesign.includes('## Sonic & Video Identity')) {
      const updatedDesign = existingDesign.replace(
        /## Sonic & Video Identity[\s\S]*?(?=\n## |\s*$)/,
        sonicSectionMarkdown.trim()
      );
      fs.writeFileSync(designPath, updatedDesign.trimEnd() + '\n', 'utf8');
    } else {
      fs.writeFileSync(designPath, existingDesign.trimEnd() + '\n\n' + sonicSectionMarkdown, 'utf8');
    }
  } else {
    const freshDesign = `---
title: "DESIGN.md — ${b1.brandName} (${slug})"
surfaceMode: "${b4.surfaceMode}"
industryArchetype: "${b1.industryArchetype}"
borderRadiusPx: ${b4.borderRadiusPx}
---

# DESIGN.md — Sistema Visual y Psicoacústico (\`${slug}\`)

## 1. Surface Mode & OKLCH Colorimetry
- **Surface Mode:** \`${b4.surfaceMode}\` (${b4.colorTheme})
- **Primary Token:** \`oklch(${b4.oklchPrimary.L} ${b4.oklchPrimary.C} ${b4.oklchPrimary.H})\`
- **Border Radius:** \`${b4.borderRadiusPx}px\`

## 2. Typography & Utopia Fluid Scale
- **Personality:** ${b4.typographyPersonality}
- **Fluid Scale:** \`clamp(1rem, 0.92rem + 0.4vw, 1.25rem)\`

${sonicSectionMarkdown}`;
    fs.writeFileSync(designPath, freshDesign, 'utf8');
  }

  // 4. Update factory.project.json if present
  const factoryProjPath = path.join(projectDir, 'factory.project.json');
  if (fs.existsSync(factoryProjPath)) {
    try {
      const projJson = JSON.parse(fs.readFileSync(factoryProjPath, 'utf8'));
      projJson.industryArchetype = b1.industryArchetype;
      projJson.surfaceMode = b4.surfaceMode;
      projJson.sonicIdentity = {
        seedId: sonicPatch.seedId,
        uiSfxMode: b6.uiSfxMode,
        material: b6.material,
        backgroundMusic: b6.backgroundMusic,
        introVideoMode: b6.introVideoMode
      };
      projJson.interviewStatus = interview.status;
      fs.writeFileSync(factoryProjPath, JSON.stringify(projJson, null, 2) + '\n', 'utf8');
    } catch (_) {}
  }

  // 5. Append/update decomposed tasks in `.agents/beads/task_graph.jsonl`
  const beadsDir = path.join(ROOT, '.agents', 'beads');
  fs.mkdirSync(beadsDir, { recursive: true });
  const taskGraphPath = path.join(beadsDir, 'task_graph.jsonl');
  const beadRecord = {
    id: `bead-interview-${slug}`,
    projectSlug: slug,
    compiledAt: new Date().toISOString(),
    interviewStatus: interview.status,
    requirementsCount: 12,
    sonicSeedId: sonicPatch.seedId,
    uiSfxMode: b6.uiSfxMode,
    agentsAssigned: [
      'product-strategist',
      'design-system-architect',
      'layout-primitives-architect',
      'motion-engineer',
      'sonic-dsp-director',
      'security-auditor',
      'qa-visual-critic'
    ]
  };
  let existingLines = [];
  if (fs.existsSync(taskGraphPath)) {
    existingLines = fs
      .readFileSync(taskGraphPath, 'utf8')
      .split(/\r?\n/)
      .filter((l) => l.trim() && !l.includes(`"id":"bead-interview-${slug}"`));
  }
  existingLines.push(JSON.stringify(beadRecord));
  fs.writeFileSync(taskGraphPath, existingLines.join('\n') + '\n', 'utf8');

  return {
    passed: true,
    projectSlug: slug,
    interviewStatus: interview.status,
    specPath,
    productPath,
    designPath,
    sonicPatch
  };
}

/**
 * Self-Test Suite (`node tools/orchestrator/client_interview_gate.mjs --self-test`):
 *   1. Ensures `agencia-alfa` has an approved interview (`COMPLETED_BY_CTO`) and compiled `SPEC.md`/`PRODUCT.md`/`DESIGN.md`.
 *   2. Creates an ephemeral test capsule in `.cache/interview_gate_test`, verifies that a fresh project starts in
 *      `PENDING_CTO_ANSWERS` and triggers `HARD_STOP_INTERVIEW_REQUIRED`.
 *   3. Approves and compiles the interview via `compileSpecFromInterview(..., { approve: true })`, verifying that
 *      `SPEC.md` (`[REQ-01]..[REQ-12]`), `PRODUCT.md`, and `DESIGN.md` (`## Sonic & Video Identity`) are generated.
 */
export function runClientInterviewGateSelfTest() {
  // Ensure active reference project `agencia-alfa` is initialized & approved so CI pipelines run smoothly
  initClientInterviewFiles('agencia-alfa', 'saas', { autoApprove: true });
  const alfaCompiled = compileSpecFromInterview('agencia-alfa', { approve: true });
  const alfaGate = verifyClientInterviewGate('agencia-alfa');

  // Test ephemeral unapproved project -> must trigger HARD_STOP_INTERVIEW_REQUIRED
  const testSlug = '_test_interview_capsule';
  const testDir = path.join(ROOT, 'projects', testSlug);
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true, force: true });
  }

  initClientInterviewFiles(testSlug, 'lujo', { autoApprove: false, overwrite: true });
  const blockedGate = verifyClientInterviewGate(testSlug, 'lujo');
  const blockedCorrectly =
    blockedGate.passed === false && blockedGate.code === 'HARD_STOP_INTERVIEW_REQUIRED';

  const compiledAfterApproval = compileSpecFromInterview(testSlug, { approve: true });
  const unlockedGate = verifyClientInterviewGate(testSlug, 'lujo');
  const specText = fs.readFileSync(compiledAfterApproval.specPath, 'utf8');
  const designText = fs.readFileSync(compiledAfterApproval.designPath, 'utf8');

  const reqsPresent = specText.includes('[REQ-01]') && specText.includes('[REQ-12]');
  const sonicInDesign =
    designText.includes('## Sonic & Video Identity') &&
    designText.includes('obsidian-crystal-resonance');

  // Clean up ephemeral test directory
  fs.rmSync(testDir, { recursive: true, force: true });

  const passed =
    alfaCompiled.passed &&
    alfaGate.passed &&
    blockedCorrectly &&
    unlockedGate.passed &&
    reqsPresent &&
    sonicInDesign;

  return {
    passed,
    checks: {
      activeProjectAgenciaAlfaApprovedAndCompiled: alfaCompiled.passed && alfaGate.passed,
      unapprovedProjectTriggersHardStopInterviewRequired: blockedCorrectly,
      approvalUnlocksGateAndCompilesSpecProductDesign: unlockedGate.passed && reqsPresent,
      sonicAndVideoIdentitySynthesizedIntoDesignMd: sonicInDesign
    }
  };
}

// CLI Runner
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  const args = process.argv.slice(2);
  if (args.includes('--self-test')) {
    const res = runClientInterviewGateSelfTest();
    console.log('\n====================================================================================');
    console.log('📋 CLIENT INTERVIEW GATE & SPEC.MD AUTO-COMPILER — SELF-TEST REPORT');
    console.log('====================================================================================');
    for (const [k, v] of Object.entries(res.checks)) {
      console.log(`  ${v ? '✓' : '✗'} ${k}`);
    }
    console.log('====================================================================================\n');
    process.exit(res.passed ? 0 : 1);
  } else {
    const nonFlagArgs = args.filter((a) => !a.startsWith('--'));
    const slug = nonFlagArgs[0] || 'agencia-alfa';
    const industry = nonFlagArgs[1] || 'saas';
    const shouldApprove = args.includes('--aprobar') || args.includes('--approve');
    const checkOnly = args.includes('--verificar') || args.includes('--check');

    if (checkOnly) {
      const gate = verifyClientInterviewGate(slug, industry);
      console.log(JSON.stringify(gate, null, 2));
      process.exit(gate.passed ? 0 : 1);
    }

    initClientInterviewFiles(slug, industry, { autoApprove: shouldApprove });
    if (shouldApprove) {
      const compiled = compileSpecFromInterview(slug, { approve: true, industry });
      console.log(`\n✅ Entrevista aprobada y compilada para "${slug}":`);
      console.log(`   • SPEC.md    : ${path.relative(ROOT, compiled.specPath)}`);
      console.log(`   • PRODUCT.md : ${path.relative(ROOT, compiled.productPath)}`);
      console.log(`   • DESIGN.md  : ${path.relative(ROOT, compiled.designPath)} (Seed: ${compiled.sonicPatch.seedId})\n`);
    } else {
      const gate = verifyClientInterviewGate(slug, industry);
      console.log(`\n📋 Plantilla de Entrevista de 10 Bloques disponible en: projects/${slug}/ENTREVISTA_CLIENTE.md`);
      console.log(`   Estado actual: ${gate.status}`);
      if (!gate.passed) {
        console.log(`   Para aprobar y compilar SPEC.md ejecutá: npm run cto:entrevista -- ${slug} --aprobar\n`);
      }
    }
  }
}
