#!/usr/bin/env node
/**
 * tools/orchestrator/client_interview_gate.mjs — Gate #2: 10-Block Technical SPEC Interview & Compiler
 * ============================================================================================================
 * Implements Stage 2 of Phase 36B:
 *   1. Sequential Prerequisite Verification (`verifyPrdInterviewGate` first):
 *      - Requires Gate #1 (`PRD_LEAN.md` + `BRAND_IDENTITY_LOCK.json` via `lean_prd_architect.mjs`)
 *        to be in state `"prdInterviewStatus": "COMPLETED_BY_CTO"`.
 *      - If Gate #1 is not completed, blocks with `HARD_STOP_PRD_INTERVIEW_REQUIRED` and directs the CTO
 *        to run `npm run cto:entrevista-prd -- <slug> --aprobar`.
 *   2. Pre-Construction Hard Gate #2 (`HARD_STOP_SPEC_INTERVIEW_REQUIRED`):
 *      - Generates `projects/<slug>/ENTREVISTA_2_SPEC_TECNICO.md` (and `ENTREVISTA_CLIENTE.md`) +
 *        `projects/<slug>/CLIENT_BRIEF_INTERVIEW.json` with initial state
 *        `"specInterviewStatus": "PENDING_CTO_SPEC_INPUT"`.
 *      - Takes the sealed `PRD_LEAN.md` and `BRAND_IDENTITY_LOCK.json` as immutable inputs across
 *        10 technical engineering blocks.
 *   3. Deterministic SPEC & DESIGN Compiler (`compileSpecFromInterview`):
 *      - Maps 1:1 every commercial invariant `[INV-01]..[INV-07]` from `PRD_LEAN.md` into executable
 *        technical requirements `[REQ-01]..[REQ-12]` in `projects/<slug>/SPEC.md` and `.agents/beads/task_graph.jsonl`.
 *      - Compiles `projects/<slug>/DESIGN.md` integrating `BRAND_IDENTITY_LOCK.json`, `Brand DNA Vector`,
 *        and `## Sonic & Video Identity`.
 *      - Sets `specInterviewStatus` (and `status`) to `"COMPLETED_BY_CTO"`, unlocking `npm run cto:construir`.
 * ============================================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveIndustryArchetype } from '../design/industry_archetype_matrix.mjs';
import {
  synthesizeUniqueBrandDna,
  BRAND_PERSONALITY_TENSIONS
} from '../design/bespoke_morphology_composer.mjs';
import {
  resolveSonicArchetypePreset,
  synthesizeProceduralSoundFromDesignCriteria
} from '../../templates/components/web-audio-director.js';
import {
  initPrdInterviewFiles,
  verifyPrdInterviewGate,
  compilePrdLeanAndBrandLock
} from './lean_prd_architect.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const ROOT = path.resolve(__dirname, '..', '..');

/**
 * Loads `BRAND_IDENTITY_LOCK.json` and `PRD_INTERVIEW_STATE.json` if present for a project.
 */
function loadBrandLockAndPrdState(slug = 'agencia-alfa') {
  const projectDir = path.join(ROOT, 'projects', slug);
  const brandLockPath = path.join(projectDir, 'BRAND_IDENTITY_LOCK.json');
  const prdStatePath = path.join(projectDir, 'PRD_INTERVIEW_STATE.json');
  let brandLock = null;
  let prdState = null;
  if (fs.existsSync(brandLockPath)) {
    try {
      brandLock = JSON.parse(fs.readFileSync(brandLockPath, 'utf8'));
    } catch (_) {}
  }
  if (fs.existsSync(prdStatePath)) {
    try {
      prdState = JSON.parse(fs.readFileSync(prdStatePath, 'utf8'));
    } catch (_) {}
  }
  return { brandLock, prdState };
}

/**
 * Builds the 10-Block Technical Specification Interview payload (`CLIENT_BRIEF_INTERVIEW.json`),
 * anchored to the immutable `PRD_LEAN.md` and `BRAND_IDENTITY_LOCK.json`.
 */
export function buildDefaultInterviewPayload(
  slug = 'agencia-alfa',
  industryInput = 'saas',
  specStatus = 'PENDING_CTO_SPEC_INPUT'
) {
  const { brandLock, prdState } = loadBrandLockAndPrdState(slug);
  const effectiveIndustry =
    brandLock?.industryCategory ||
    prdState?.blocks?.block1_business_identity_and_problem?.industryCategory ||
    industryInput;
  const arch = resolveIndustryArchetype(effectiveIndustry);
  const sonicSeed = resolveSonicArchetypePreset(effectiveIndustry);
  const isLawOrRead = arch.primarySurfaceMode === 'Read' || sonicSeed.archetype === 'abogacia';

  const brandName =
    brandLock?.brandName ||
    prdState?.blocks?.block1_business_identity_and_problem?.officialBrandName ||
    slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

  const primaryCta =
    prdState?.blocks?.block5_capabilities_and_cro_goals?.primaryCta ||
    'Solicitar Auditoría / Demo Ejecutiva';
  const primaryCtaChannel =
    prdState?.blocks?.block5_capabilities_and_cro_goals?.primaryCtaChannel ||
    'Calendly + WhatsApp Business + Lead Form';
  const brandMode = brandLock?.brandIdentityMode || 'PARTIAL_BRAND_EVOLUTION';
  const lockClientPalette = Boolean(brandLock?.lockClientPalette);
  const clientPalette = brandLock?.officialPalette || {
    primaryBrandColor: '#2563EB',
    secondaryBrandColor: '#0F172A',
    accentBrandColor: '#10B981',
    surfaceLightColor: '#F8FAFC',
    surfaceDarkColor: '#0B0F19'
  };
  const clientLogos = brandLock?.logoAssets || {
    primaryLogoPath: 'public/assets/brand/logo-primary.svg',
    isotipoPath: 'public/assets/brand/isotipo.svg'
  };

  const normalizedStatus =
    specStatus === 'COMPLETED_BY_CTO' ? 'COMPLETED_BY_CTO' : 'PENDING_CTO_SPEC_INPUT';

  return {
    schemaVersion: '2026.36.1',
    gateId: 'GATE_2_TECHNICAL_SPEC_AND_DESIGN',
    projectSlug: slug,
    status: normalizedStatus,
    specInterviewStatus: normalizedStatus,
    prdReferenceStatus: prdState?.prdInterviewStatus || 'PENDING_CTO_PRD_INPUT',
    brandIdentityMode: brandMode,
    lockClientPalette,
    createdAt: new Date().toISOString(),
    approvedAt: normalizedStatus === 'COMPLETED_BY_CTO' ? new Date().toISOString() : null,
    approvedBy: normalizedStatus === 'COMPLETED_BY_CTO' ? 'CTO_HITL_APPROVED' : null,
    blocks: {
      // Bloque 1: Arquitectura de Páginas y Secciones DOM
      block1_pages_and_dom_architecture: {
        brandName,
        industryArchetype: sonicSeed.archetype,
        resolvedArchetypeId: arch.id,
        pages: ['Home', 'Soluciones', 'Casos de Éxito', 'Precios', 'Contacto'],
        domSectionsAndComponents: [
          'Header Semántico con Navegación Accesible + Mute Toggle + Selector de Tema',
          `Hero Principal (${brandName}) con Propuesta de Valor [INV-01] y Primary CTA (${primaryCta})`,
          'Sección de Capacidades Operativas y Derribo de las 3 Objeciones del Comprador [INV-02]',
          'Bento Grid / Catálogo Filtrable con Prueba Social Verificable [INV-06]',
          'Formulario de Conversión Validado con Valibot + Footer Legal y Datos Operativos'
        ]
      },
      // Bloque 2: Contratos Funcionales, Validaciones Valibot y Pure vs. Wired
      block2_functional_contracts_and_valibot: {
        primaryCta,
        primaryCtaChannel,
        pureComponentsArchitecture: true,
        stressHarness5StatesRequired: [
          'empty',
          'loading',
          'error-state',
          'extreme-long-text-250chars',
          'dark-mode'
        ],
        valibotSchemas: [
          'LeadCaptureFormSchema (nombre, email, telefono, mensaje, csrfToken)',
          'InteractiveCalculatorOrFilterSchema (categoria, presupuesto, urgencia)'
        ]
      },
      // Bloque 3: Topología de Grilla y Morfología de Componentes
      block3_grid_topology_and_morphology: {
        gridTopology: isLawOrRead
          ? 'swiss-editorial-asymmetric-12col'
          : 'bento-modular-kinetic-grid',
        heroArchitecture: isLawOrRead
          ? 'split-authority-typographic-hero'
          : 'focal-centered-interactive-stage',
        surfaceMateriality: sonicSeed.material || 'polymer',
        intraCategoryDivergenceFloorPct: 70,
        respectBrandIdentityLock: true
      },
      // Bloque 4: Aplicación de Paleta, Contraste APCA y Escalas Tipográficas
      block4_palette_apca_and_typography_scales: {
        surfaceMode: arch.primarySurfaceMode || 'Persuade',
        brandIdentityMode: brandMode,
        lockClientPalette,
        lockedClientPalette: clientPalette,
        oklchPrimary: sonicSeed.oklch || { L: 0.65, C: 0.16, H: 255 },
        borderRadiusPx: sonicSeed.borderRadiusPx ?? 8,
        apcaContrastFloors: 'Lc >= 90 (Hero/Headline), Lc >= 75 (Body), Lc >= 60 (Secondary)',
        typographyPersonality:
          brandLock?.officialTypography?.displayFont ||
          (isLawOrRead ? 'Editorial Serif + Swiss Sans' : 'Swiss Geometric Sans + Tabular Mono')
      },
      // Bloque 5: Dirección Estética, Personalidad Diferenciadora y Física Cinética a 60 FPS
      block5_motion_physics_and_scroll_60fps: {
        brandPersonalityTension: isLawOrRead
          ? 'clasico-atemporal vs vanguardista-disruptivo'
          : 'minimalismo-silencioso vs expresividad-cinetica',
        availablePersonalityTensions: BRAND_PERSONALITY_TENSIONS,
        morphologySelectionMode: 'auto-bespoke-criteria',
        animationLevel: isLawOrRead ? 'minimal-editorial' : 'spring-fluid-60fps',
        dampingRatioZeta: isLawOrRead ? 1.0 : 0.78,
        springPhysics: { stiffness: 280, damping: 24 },
        useScrollDrivenAnimationsCss: true,
        useViewTransitionsApi: true,
        respectReducedMotion: true
      },
      // Bloque 6: Gráficos 3D WebGPU, Modelos .glb y Shaders
      block6_webgpu_3d_glb_and_shaders: {
        forge3dMode: isLawOrRead
          ? 'none'
          : sonicSeed.archetype === 'lujo' || sonicSeed.archetype === 'streamer'
          ? 'glb-viewer'
          : 'shader-hero',
        use3dTiltCards: !isLawOrRead,
        useWebGpuDiorama: sonicSeed.archetype === 'lujo' || sonicSeed.archetype === 'streamer',
        canvas3TimestampHistogramWatchdog: true
      },
      // Bloque 7: Diseño Sonoro UI SFX, Música de Fondo y Sesión .rpp Reaper
      block7_sonic_ui_sfx_music_and_reaper_rpp: {
        sonicForgeMode: isLawOrRead ? 'off' : 'generative-criteria',
        uiSfxMode: isLawOrRead ? 'off' : sonicSeed.uiSfxMode || 'subtle',
        material: sonicSeed.material || 'polymer',
        backgroundMusic: 'off',
        exportReaperRppSession: true,
        sonicSeedId: sonicSeed.seedId,
        requiresVisibleMuteButton: true,
        autoplayBlockedUntilGesture: true
      },
      // Bloque 8: Video Intro Programática de Marca y Locución
      block8_programmatic_video_intro_and_voiceover: {
        videoForgeMode: isLawOrRead ? 'off' : 'minimal',
        introVideoMode: isLawOrRead ? 'none' : 'vector-svg-reveal-3s',
        lockedLogoSvgPath: clientLogos.primaryLogoPath,
        lockedIsotipoSvgPath: clientLogos.isotipoPath,
        useLockedClientPaletteInVideo: true,
        maxVideoBudgetMb: 1.8
      },
      // Bloque 9: Base de Datos, Pagos, Autenticación y Edge Worker
      block9_database_payments_auth_and_edge_worker: {
        databaseTier: sonicSeed.archetype === 'erp' ? 'enterprise-postgres' : 'edge-d1',
        databaseEngine: 'Cloudflare D1 SQLite + Enterprise PostgreSQL FORCE RLS Ready',
        paymentGateway: sonicSeed.archetype === 'ecommerce' ? 'Stripe / MercadoPago' : 'none',
        authMode: 'Ory/Passkeys (OAuth 2.1 PKCE)',
        workerEndpoints: ['POST /api/leads', 'POST /api/webhooks/payments', 'GET /api/health'],
        enforceWebhookIdempotencyAndRls: true
      },
      // Bloque 10: App Móvil Capacitor 8, Widget Post-Venta y Matriz de Pruebas [REQ-01]..[REQ-12]
      block10_mobile_capacitor_feedback_and_f2p_matrix: {
        enableCapacitor8MobileTarget: false,
        enablePostSaleFeedbackWidget: true,
        locales: ['es-AR'],
        maxCloudApiBudgetUsd: 0.25,
        totalGcpCreditPoolUsd: 90.0,
        f2pAcceptanceCriteria: [
          '[REQ-01..03] Identidad PRD_LEAN, Primary CTA >= 48x48px y derribo de 3 objeciones',
          '[REQ-04..06] BRAND_IDENTITY_LOCK (lockClientPalette), APCA Lc >= 75 y 60 FPS',
          '[REQ-07..09] Audio/Video <= -18dBFS, Valibot, Idempotencia Webhooks y RLS Multi-Tenant',
          '[REQ-10..12] SEO/GEO llms.txt, CSP/ASVS v5.0 y Pure Component 5-State Harness >= 95/100'
        ]
      },
      // Compatibilidad retroactiva con selectores de fases previas
      block1_commercial_identity: {
        brandName,
        industryArchetype: sonicSeed.archetype,
        resolvedArchetypeId: arch.id,
        valuePropositionOneLiner:
          prdState?.blocks?.block2_target_audience_and_objections?.uniqueValueProposition ||
          `Plataforma digital de alta conversión para ${brandName} con arquitectura edge y diseño de precisión.`,
        referenceCompetitors: ['Linear.app', 'Stripe.com', 'Vercel.com']
      },
      block2_target_audience_cro: {
        segment:
          prdState?.blocks?.block2_target_audience_and_objections?.targetDemographic ||
          'B2B / High-Intent Decision Makers',
        ageRange: '28-55',
        purchasingPower: 'High / Enterprise & Professional',
        primaryObjection:
          prdState?.blocks?.block2_target_audience_and_objections?.topThreeBuyerObjections?.[0] ||
          'Tiempo de implementación y retorno de inversión verificable',
        primaryCta,
        primaryCtaChannel
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
        typographyPersonality: isLawOrRead
          ? 'Editorial Serif + Swiss Sans'
          : 'Swiss Geometric Sans + Tabular Mono'
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
        clientProvidedAssets: [
          clientLogos.primaryLogoPath,
          clientLogos.isotipoPath,
          'Textos Comerciales PRD_LEAN.md'
        ],
        factoryAiGeneratedAssets: [
          'OpenGraph Social Card (og-image.svg)',
          'Copywriting CRO Optimizado',
          'Keyframes / Ilustración SOTA'
        ]
      },
      block8_technical_backend_integrations: {
        leadCaptureForm: true,
        paymentGateway:
          sonicSeed.archetype === 'ecommerce' ? 'Stripe / MercadoPago' : 'None (Consultation Flow)',
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
 * Renders the human-friendly 10-Block Technical SPEC Questionnaire (`ENTREVISTA_2_SPEC_TECNICO.md`).
 */
export function renderInterviewMarkdown(interviewData) {
  const b = interviewData.blocks;
  const t1 = b.block1_pages_and_dom_architecture || {};
  const t2 = b.block2_functional_contracts_and_valibot || {};
  const t3 = b.block3_grid_topology_and_morphology || {};
  const t4 = b.block4_palette_apca_and_typography_scales || {};
  const t5 = b.block5_motion_physics_and_scroll_60fps || {};
  const t6 = b.block6_webgpu_3d_glb_and_shaders || {};
  const t7 = b.block7_sonic_ui_sfx_music_and_reaper_rpp || {};
  const t8 = b.block8_programmatic_video_intro_and_voiceover || {};
  const t9 = b.block9_database_payments_auth_and_edge_worker || {};
  const t10 = b.block10_mobile_capacitor_feedback_and_f2p_matrix || {};

  return `# ⚙️ ENTREVISTA #2 OBLIGATORIA: ESPECIFICACIÓN TÉCNICA (\`SPEC.md\` & \`DESIGN.md\`) — \`${interviewData.projectSlug}\`

> **Estado de Compuerta #2 (\`specInterviewStatus\`):** \`${interviewData.specInterviewStatus || interviewData.status}\`
> **Pre-Requisito Compuerta #1 (\`PRD_LEAN.md\` + \`BRAND_IDENTITY_LOCK.json\`):** \`${interviewData.prdReferenceStatus || 'COMPLETED_BY_CTO'}\` (\`brandIdentityMode: ${interviewData.brandIdentityMode || 'PARTIAL_BRAND_EVOLUTION'}\`, \`lockClientPalette: ${Boolean(interviewData.lockClientPalette)}\`)
> **Regla de Gobernanza:** Una vez aprobada la Entrevista #1, completá/revisá estos 10 bloques técnicos y ejecutá:
> \`npm run cto:entrevista -- ${interviewData.projectSlug} --aprobar\`

---

## Bloque 1 — Arquitectura de Páginas y Secciones DOM (Trazable a \`PRD_LEAN.md\`)
- **Marca y Arquetipo:** ${t1.brandName || b.block1_commercial_identity?.brandName} (\`${t1.industryArchetype || b.block1_commercial_identity?.industryArchetype}\`)
- **Mapa de Vistas:** ${(t1.pages || ['Home']).join(' → ')}
- **Desglose de Componentes DOM Requeridos:**
${(t1.domSectionsAndComponents || []).map((s) => `  - ${s}`).join('\n')}

## Bloque 2 — Contratos Funcionales, Estados \`Pure vs. Wired\` y Validación \`Valibot\`
- **Primary CTA Conectado:** \`${t2.primaryCta || 'Solicitar Demo'}\` (${t2.primaryCtaChannel || 'Lead Form'})
- **Arquitectura de Componentes Puros (\`Pure Components\`):** \`${Boolean(t2.pureComponentsArchitecture)}\` (5 Estados: ${(t2.stressHarness5StatesRequired || []).join(', ')})
- **Esquemas \`Valibot\` Activos:** ${(t2.valibotSchemas || []).join(' | ')}

## Bloque 3 — Topología de Grilla y Morfología de Componentes (\`bespoke_morphology_composer.mjs\`)
- **Topología de Grilla (\`gridTopology\`):** \`${t3.gridTopology || 'bento-modular-kinetic-grid'}\`
- **Arquitectura de Hero (\`heroArchitecture\`):** \`${t3.heroArchitecture || 'focal-centered-interactive-stage'}\`
- **Materialidad de Superficie:** \`${t3.surfaceMateriality || 'polymer'}\` (Divergencia intra-categoría \`>= ${t3.intraCategoryDivergenceFloorPct ?? 70}%\`)

## Bloque 4 — Aplicación de Paleta, Contraste \`APCA\` y Escalas Tipográficas (\`token_compiler.mjs\`)
- **Modo de Superficie:** \`${t4.surfaceMode || 'Persuade'}\` | **Modo de Marca:** \`${t4.brandIdentityMode || 'PARTIAL_BRAND_EVOLUTION'}\` (\`lockClientPalette: ${Boolean(t4.lockClientPalette)}\`)
- **Semilla de Colores del Cliente:** Primario \`${t4.lockedClientPalette?.primaryBrandColor || '#2563EB'}\`, Secundario \`${t4.lockedClientPalette?.secondaryBrandColor || '#0F172A'}\`, Acento \`${t4.lockedClientPalette?.accentBrandColor || '#10B981'}\`
- **Piso de Contraste \`APCA\`:** ${t4.apcaContrastFloors || 'Lc >= 75'} | **Tipografía:** ${t4.typographyPersonality || 'Swiss Sans'}

## Bloque 5 — Dirección Estética, Personalidad Diferenciadora y Física Cinética a 60 FPS
- **Eje de Tensión de Personalidad (\`brandPersonalityTension\`):** \`${t5.brandPersonalityTension || 'minimalismo-silencioso vs expresividad-cinetica'}\`
- **Modo de Selección Morfológica (\`morphologySelectionMode\`):** \`${t5.morphologySelectionMode || 'auto-bespoke-criteria'}\` (Garantía de 0 repetición intra-categoría frente a proyectos previos)
- **Nivel de Animación:** \`${t5.animationLevel || 'spring-fluid-60fps'}\` ($\zeta = ${t5.dampingRatioZeta ?? 0.78}$, \`stiffness: ${t5.springPhysics?.stiffness ?? 280}, damping: ${t5.springPhysics?.damping ?? 24}\`)
- **Scroll-Driven CSS & View Transitions API:** \`scroll=${Boolean(t5.useScrollDrivenAnimationsCss)}\`, \`viewTransitions=${Boolean(t5.useViewTransitionsApi)}\`, \`reducedMotion=${Boolean(t5.respectReducedMotion)}\`

## Bloque 6 — Gráficos 3D WebGPU, Modelos \`.glb\` y Shaders (\`shader_and_3d_forge.mjs\`)
- **Modo 3D / Shader (\`none\`, \`glb-viewer\`, \`spark-gaussian-splatting\`, \`shader-hero\`, \`holo-cards\`):** \`${t6.forge3dMode || 'shader-hero'}\`
- **Watchdog de Histograma \`<canvas>\` en 3 Timestamps:** \`${Boolean(t6.canvas3TimestampHistogramWatchdog)}\`

## Bloque 7 — Diseño Sonoro UI SFX, Música de Fondo y Sesión \`.rpp\` Reaper (\`sonic_and_music_forge.mjs\`)
- **Modo Sonoro (\`generative-criteria\`, \`custom-brief\`, \`off\`):** \`${t7.sonicForgeMode || 'generative-criteria'}\` (\`uiSfxMode: ${t7.uiSfxMode || 'subtle'}\`, material \`${t7.material || 'polymer'}\`)
- **Música de Fondo:** \`${t7.backgroundMusic || 'off'}\` | **Exportación Reaper \`.rpp\`:** \`${Boolean(t7.exportReaperRppSession)}\`

## Bloque 8 — Video Intro Programática de Marca y Locución (\`programmatic_video_forge.mjs\`)
- **Modo de Video Intro (\`off\`, \`minimal\`, \`3d-pbr\`, \`vertex-veo-hybrid\`, \`shader-hud\`):** \`${t8.videoForgeMode || 'minimal'}\` (\`${t8.introVideoMode || 'vector-svg-reveal-3s'}\`)
- **Activos Bloqueados de Marca:** Logo \`${t8.lockedLogoSvgPath || 'public/assets/brand/logo-primary.svg'}\`, Isotipo \`${t8.lockedIsotipoSvgPath || 'public/assets/brand/isotipo.svg'}\` (Presupuesto \`<= ${t8.maxVideoBudgetMb ?? 1.8} MB\`)

## Bloque 9 — Base de Datos, Pagos, Autenticación y Edge Worker (\`dual_database_forge.mjs\`)
- **Motor de Datos (\`static-none\`, \`edge-d1\`, \`enterprise-postgres\`):** \`${t9.databaseTier || 'edge-d1'}\` (${t9.databaseEngine || 'Cloudflare D1'})
- **Pasarela de Pagos:** \`${t9.paymentGateway || 'none'}\` | **Auth:** \`${t9.authMode || 'Ory/Passkeys'}\` | **Endpoints Worker:** ${(t9.workerEndpoints || []).join(', ')}

## Bloque 10 — App Móvil \`Capacitor 8\`, Widget Post-Venta y Matriz \`[REQ-01]..[REQ-12]\`
- **Target Móvil \`Capacitor 8\`:** \`${Boolean(t10.enableCapacitor8MobileTarget)}\` | **Widget Post-Venta:** \`${Boolean(t10.enablePostSaleFeedbackWidget)}\`
- **Criterios Fail-to-Pass (\`F2P\`):**
${(t10.f2pAcceptanceCriteria || []).map((c) => `  - ${c}`).join('\n')}
`;
}

/**
 * Generates `ENTREVISTA_2_SPEC_TECNICO.md` (and `ENTREVISTA_CLIENTE.md`) + `CLIENT_BRIEF_INTERVIEW.json`.
 */
export function initClientInterviewFiles(slug = 'agencia-alfa', industryInput = 'saas', options = {}) {
  const projectDir = path.join(ROOT, 'projects', slug);
  fs.mkdirSync(projectDir, { recursive: true });

  const jsonPath = path.join(projectDir, 'CLIENT_BRIEF_INTERVIEW.json');
  const mdPath = path.join(projectDir, 'ENTREVISTA_CLIENTE.md');
  const specMdInterviewPath = path.join(projectDir, 'ENTREVISTA_2_SPEC_TECNICO.md');

  if (fs.existsSync(jsonPath) && !options.overwrite) {
    const existing = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    if (!existing.specInterviewStatus) {
      existing.specInterviewStatus =
        existing.status === 'COMPLETED_BY_CTO' ? 'COMPLETED_BY_CTO' : 'PENDING_CTO_SPEC_INPUT';
    }
    const rendered = renderInterviewMarkdown(existing);
    if (!fs.existsSync(mdPath)) {
      fs.writeFileSync(mdPath, rendered, 'utf8');
    }
    if (!fs.existsSync(specMdInterviewPath)) {
      fs.writeFileSync(specMdInterviewPath, rendered, 'utf8');
    }
    return {
      created: false,
      projectSlug: slug,
      status: existing.status,
      specInterviewStatus: existing.specInterviewStatus,
      jsonPath,
      mdPath,
      specMdInterviewPath,
      interview: existing
    };
  }

  const initialStatus = options.autoApprove ? 'COMPLETED_BY_CTO' : 'PENDING_CTO_SPEC_INPUT';
  const payload = buildDefaultInterviewPayload(slug, industryInput, initialStatus);
  const rendered = renderInterviewMarkdown(payload);
  fs.writeFileSync(jsonPath, JSON.stringify(payload, null, 2) + '\n', 'utf8');
  fs.writeFileSync(mdPath, rendered, 'utf8');
  fs.writeFileSync(specMdInterviewPath, rendered, 'utf8');

  return {
    created: true,
    projectSlug: slug,
    status: payload.status,
    specInterviewStatus: payload.specInterviewStatus,
    jsonPath,
    mdPath,
    specMdInterviewPath,
    interview: payload
  };
}

/**
 * Verifies Gate #1 (`PRD_LEAN.md` + `BRAND_IDENTITY_LOCK.json`) AND Gate #2 (`CLIENT_BRIEF_INTERVIEW.json`).
 * - If Gate #1 is not `"COMPLETED_BY_CTO"`, returns `HARD_STOP_PRD_INTERVIEW_REQUIRED`.
 * - If Gate #2 is not `"COMPLETED_BY_CTO"`, returns `HARD_STOP_SPEC_INTERVIEW_REQUIRED`.
 */
export function verifyClientInterviewGate(slug = 'agencia-alfa', industryFallback = 'saas') {
  // 1. Check Gate #1 (PRD & Brand Identity Lock) first!
  const prdGate = verifyPrdInterviewGate(slug, industryFallback);
  if (!prdGate.passed) {
    return {
      passed: false,
      code: 'HARD_STOP_PRD_INTERVIEW_REQUIRED',
      gateBlocked: 'GATE_1_PRD_AND_BRAND_IDENTITY',
      projectSlug: slug,
      status: prdGate.prdInterviewStatus,
      prdInterviewStatus: prdGate.prdInterviewStatus,
      specInterviewStatus: 'BLOCKED_BY_GATE_1',
      jsonPath: prdGate.stateJsonPath,
      mdPath: prdGate.mdPath,
      message: `[HARD_STOP_PRD_INTERVIEW_REQUIRED] No se puede avanzar a la Entrevista #2 (SPEC.md) ni construir "${slug}" porque la Entrevista #1 (PRD_LEAN.md + Identidad de Marca) está en estado "${prdGate.prdInterviewStatus}". Completá projects/${slug}/ENTREVISTA_1_PRD_Y_MARCA.md y aprobala primero con: npm run cto:entrevista-prd -- ${slug} --aprobar`
    };
  }

  const projectDir = path.join(ROOT, 'projects', slug);
  const jsonPath = path.join(projectDir, 'CLIENT_BRIEF_INTERVIEW.json');
  const mdPath = path.join(projectDir, 'ENTREVISTA_2_SPEC_TECNICO.md');

  if (!fs.existsSync(jsonPath)) {
    const initialized = initClientInterviewFiles(slug, industryFallback, { autoApprove: false });
    return {
      passed: false,
      code: 'HARD_STOP_SPEC_INTERVIEW_REQUIRED',
      gateBlocked: 'GATE_2_TECHNICAL_SPEC_AND_DESIGN',
      projectSlug: slug,
      status: initialized.status,
      prdInterviewStatus: 'COMPLETED_BY_CTO',
      specInterviewStatus: initialized.specInterviewStatus,
      jsonPath,
      mdPath,
      message: `[HARD_STOP_SPEC_INTERVIEW_REQUIRED] La Entrevista #1 de "${slug}" ya está aprobada, pero falta completar y aprobar la Entrevista #2 (Especificación Técnica de 10 Bloques) en projects/${slug}/ENTREVISTA_2_SPEC_TECNICO.md ejecutando: npm run cto:entrevista -- ${slug} --aprobar`
    };
  }

  try {
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const specStatus = data.specInterviewStatus || data.status || 'PENDING_CTO_SPEC_INPUT';
    if (specStatus !== 'COMPLETED_BY_CTO') {
      return {
        passed: false,
        code: 'HARD_STOP_SPEC_INTERVIEW_REQUIRED',
        gateBlocked: 'GATE_2_TECHNICAL_SPEC_AND_DESIGN',
        projectSlug: slug,
        status: specStatus,
        prdInterviewStatus: 'COMPLETED_BY_CTO',
        specInterviewStatus: specStatus,
        jsonPath,
        mdPath,
        message: `[HARD_STOP_SPEC_INTERVIEW_REQUIRED] La Entrevista #2 (SPEC.md Técnico) para "${slug}" está en estado "${specStatus}". Revisá projects/${slug}/ENTREVISTA_2_SPEC_TECNICO.md y aprobala con: npm run cto:entrevista -- ${slug} --aprobar`
      };
    }

    return {
      passed: true,
      code: 'INTERVIEW_COMPLETED_OK',
      projectSlug: slug,
      status: 'COMPLETED_BY_CTO',
      prdInterviewStatus: 'COMPLETED_BY_CTO',
      specInterviewStatus: 'COMPLETED_BY_CTO',
      jsonPath,
      mdPath,
      interview: data,
      brandLock: prdGate.brandLock
    };
  } catch (err) {
    return {
      passed: false,
      code: 'HARD_STOP_SPEC_INTERVIEW_REQUIRED',
      projectSlug: slug,
      status: 'INVALID_JSON',
      prdInterviewStatus: 'COMPLETED_BY_CTO',
      specInterviewStatus: 'INVALID_JSON',
      jsonPath,
      mdPath,
      message: `[HARD_STOP_SPEC_INTERVIEW_REQUIRED] Error leyendo CLIENT_BRIEF_INTERVIEW.json: ${err.message}`
    };
  }
}

/**
 * Dual-Key Verification helper for `cto:construir` and `agent_squad.mjs`:
 * Explicitly verifies that BOTH Gate #1 (`PRD_INTERVIEW_STATE.json`) and Gate #2 (`CLIENT_BRIEF_INTERVIEW.json`)
 * are `"COMPLETED_BY_CTO"`.
 */
export function verifyDualInterviewGates(slug = 'agencia-alfa', industryFallback = 'saas') {
  const prdGate = verifyPrdInterviewGate(slug, industryFallback);
  if (!prdGate.passed) {
    return {
      passed: false,
      code: 'HARD_STOP_PRD_INTERVIEW_REQUIRED',
      missingGate: 'ENTREVISTA_1_PRD_Y_MARCA',
      prdInterviewStatus: prdGate.prdInterviewStatus,
      specInterviewStatus: 'PENDING_CTO_SPEC_INPUT',
      message: prdGate.message
    };
  }
  const specGate = verifyClientInterviewGate(slug, industryFallback);
  if (!specGate.passed) {
    return {
      passed: false,
      code: 'HARD_STOP_SPEC_INTERVIEW_REQUIRED',
      missingGate: 'ENTREVISTA_2_SPEC_TECNICO',
      prdInterviewStatus: 'COMPLETED_BY_CTO',
      specInterviewStatus: specGate.specInterviewStatus,
      message: specGate.message
    };
  }
  return {
    passed: true,
    code: 'DUAL_INTERVIEW_GATES_APPROVED',
    prdInterviewStatus: 'COMPLETED_BY_CTO',
    specInterviewStatus: 'COMPLETED_BY_CTO',
    brandLock: prdGate.brandLock,
    message: `Ambas compuertas manuales (Entrevista #1 PRD_LEAN + Entrevista #2 SPEC.md) están aprobadas por el CTO para "${slug}".`
  };
}

/**
 * Compiles `CLIENT_BRIEF_INTERVIEW.json` + `PRD_LEAN.md` + `BRAND_IDENTITY_LOCK.json` into:
 *   1. `projects/<slug>/SPEC.md` (`[REQ-01]` to `[REQ-12]` mapped 1:1 from `[INV-01]..[INV-07]` + Playwright matrix)
 *   2. `projects/<slug>/PRODUCT.md` (synchronized with `PRD_LEAN.md`)
 *   3. `projects/<slug>/DESIGN.md` (integrating `BRAND_IDENTITY_LOCK.json`, OKLCH tokens, Utopia clamp(), and `## Sonic & Video Identity`)
 *   4. `projects/<slug>/factory.project.json` and `.agents/beads/task_graph.jsonl`.
 */
export function compileSpecFromInterview(slug = 'agencia-alfa', options = {}) {
  // Enforce Gate #1 prerequisite!
  const prdGate = verifyPrdInterviewGate(slug, options.industry || 'saas');
  if (!prdGate.passed) {
    throw new Error(prdGate.message);
  }

  const projectDir = path.join(ROOT, 'projects', slug);
  const jsonPath = path.join(projectDir, 'CLIENT_BRIEF_INTERVIEW.json');
  const mdPath = path.join(projectDir, 'ENTREVISTA_CLIENTE.md');
  const specMdInterviewPath = path.join(projectDir, 'ENTREVISTA_2_SPEC_TECNICO.md');

  if (!fs.existsSync(jsonPath) || options.refreshFromPrd) {
    initClientInterviewFiles(slug, options.industry || 'saas', {
      autoApprove: Boolean(options.approve),
      overwrite: Boolean(options.refreshFromPrd)
    });
  }

  const interview = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const { brandLock, prdState } = loadBrandLockAndPrdState(slug);

  // Sync latest brand identity lock fields into interview
  if (brandLock) {
    interview.brandIdentityMode = brandLock.brandIdentityMode;
    interview.lockClientPalette = Boolean(brandLock.lockClientPalette);
    interview.prdReferenceStatus = 'COMPLETED_BY_CTO';
    if (interview.blocks?.block4_palette_apca_and_typography_scales) {
      interview.blocks.block4_palette_apca_and_typography_scales.brandIdentityMode =
        brandLock.brandIdentityMode;
      interview.blocks.block4_palette_apca_and_typography_scales.lockClientPalette = Boolean(
        brandLock.lockClientPalette
      );
      interview.blocks.block4_palette_apca_and_typography_scales.lockedClientPalette =
        brandLock.officialPalette;
    }
    if (interview.blocks?.block1_commercial_identity) {
      interview.blocks.block1_commercial_identity.brandName = brandLock.brandName;
    }
  }

  if (options.approve && interview.specInterviewStatus !== 'COMPLETED_BY_CTO') {
    interview.status = 'COMPLETED_BY_CTO';
    interview.specInterviewStatus = 'COMPLETED_BY_CTO';
    interview.approvedAt = new Date().toISOString();
    interview.approvedBy = 'CTO_HITL_APPROVED';
  }

  const renderedInterviewMd = renderInterviewMarkdown(interview);
  fs.writeFileSync(jsonPath, JSON.stringify(interview, null, 2) + '\n', 'utf8');
  fs.writeFileSync(mdPath, renderedInterviewMd, 'utf8');
  fs.writeFileSync(specMdInterviewPath, renderedInterviewMd, 'utf8');

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

  const brandMode = brandLock?.brandIdentityMode || interview.brandIdentityMode || 'PARTIAL_BRAND_EVOLUTION';
  const lockPalette = Boolean(brandLock?.lockClientPalette ?? interview.lockClientPalette);
  const pal = brandLock?.officialPalette || {
    primaryBrandColor: '#2563EB',
    secondaryBrandColor: '#0F172A',
    accentBrandColor: '#10B981',
    surfaceLightColor: '#F8FAFC',
    surfaceDarkColor: '#0B0F19'
  };
  const logos = brandLock?.logoAssets || {
    primaryLogoPath: 'public/assets/brand/logo-primary.svg',
    isotipoPath: 'public/assets/brand/isotipo.svg'
  };

  // Synthesize unique 7-Axis Brand DNA Vector & verify Birkhoff Harmony (>= 0.85) + Intra-Category Divergence (>= 0.70)
  const t5Block = interview.blocks.block5_motion_physics_and_scroll_60fps || {};
  const bespokeDna = synthesizeUniqueBrandDna({
    projectSlug: slug,
    industryCategory: b1.industryArchetype,
    brandPersonalityTension:
      t5Block.brandPersonalityTension || 'minimalismo-silencioso vs expresividad-cinetica',
    morphologyMode: t5Block.morphologySelectionMode || 'auto-bespoke-criteria',
    baseHue: b4.oklchPrimary?.H || 255,
    persistInLedger: !slug.startsWith('_test')
  });

  // Synthesize exact psychoacoustic patch from the visual and material criteria
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

  // 1. Write SPEC.md mapping 1:1 [INV-01]..[INV-07] from PRD_LEAN.md to [REQ-01]..[REQ-12] + Bespoke Morphology Justification
  const specPath = path.join(projectDir, 'SPEC.md');
  const specContent = `# SPEC.md — Especificación Técnica Ejecutable Compilada desde Doble Entrevista (\`${slug}\`)

> **Estado Compuerta #1 (\`PRD_LEAN.md\`):** \`COMPLETED_BY_CTO\` | **Estado Compuerta #2 (\`SPEC.md\`):** \`${interview.specInterviewStatus}\`  
> **Modo de Identidad de Marca:** \`${brandMode}\` (\`lockClientPalette: ${lockPalette}\`) | **Arquetipo:** \`${b1.industryArchetype}\` | **Modo de Superficie:** \`${b4.surfaceMode}\`  
> **Dirección Morfológica (\`${bespokeDna.morphologyMode}\`):** Grid \`${bespokeDna.gridTopology}\` | Hero \`${bespokeDna.heroArchitecture}\` | Divergencia \`${bespokeDna.morphologicalDivergenceScore}\` (\`>= 0.70\`) | Armonía Birkhoff \`${bespokeDna.aestheticHarmonyScore}\` (\`>= 0.85\`)  
> **Compilado Determinísticamente por:** \`tools/orchestrator/client_interview_gate.mjs\` (\`compileSpecFromInterview\`)

---

## 1. Trazabilidad 1:1 desde \`PRD_LEAN.md\` (\`[INV-01..07]\`) hacia Requisitos Técnicos (\`[REQ-01]\` a \`[REQ-12]\`)

- **[REQ-01] (Trazable a \`[INV-01]\`) Identidad y Propuesta de Valor en Hero:** Renderizar en el primer viewport el titular de \`${brandLock?.brandName || b1.brandName}\` (*"${b1.valuePropositionOneLiner}"*) con arquitectura de Hero \`${bespokeDna.heroArchitecture}\` y claridad en \`<= 3 segundos\`.
- **[REQ-02] (Trazable a \`[INV-05]\`) Acción Primaria Única (\`Primary CTA\`):** Implementar el CTA primario **\`${b2.primaryCta}\`** conectado a \`${b2.primaryCtaChannel}\` con área táctil Fitts \`>= 48x48px\`.
- **[REQ-03] (Trazable a \`[INV-02]\`) Arquitectura Sitemap, Topología de Grilla y Derribo de las 3 Objeciones:** Proveer navegación semántica (\`${bespokeDna.componentMorphology.nav}\`) para \`${b3.pages.join(', ')}\` sobre topología \`${bespokeDna.gridTopology}\` y renderizar las secciones obligatorias: ${b3.mandatorySections.join('; ')}.
- **[REQ-04] (Trazable a \`[INV-03]\`) Contrato de Marca \`BRAND_IDENTITY_LOCK.json\`, Máscara Cromática \`OKLCH\` y \`APCA\`:** Respetar \`brandIdentityMode: "${brandMode}"\` (\`lockClientPalette: ${lockPalette}\`, primario \`${pal.primaryBrandColor}\`, secundario \`${pal.secondaryBrandColor}\`, acento \`${pal.accentBrandColor}\`, logo \`${logos.primaryLogoPath}\`), máscara de gama Gurney \`${bespokeDna.gamutMaskType}\`, tokens \`OKLCH\` (\`L=${b4.oklchPrimary.L}, C=${b4.oklchPrimary.C}, H=${b4.oklchPrimary.H}\`) y contraste \`${b9.accessibilityFloor}\`.
- **[REQ-05] (Trazable a \`[INV-04]\`) Curaduría Tipográfica Expresiva y Escala Fluida \`Utopia clamp()\`:** Garantizar tipografía fluida sin saltos bruscos entre \`320px\` y \`2560px\` con par curado \`${bespokeDna.fontPairingProfile}\` (\`${bespokeDna.fontPairingDetails.utopiaScaleName}\`), personalidad \`${b4.typographyPersonality}\` y geometría concéntrica \`${bespokeDna.componentMorphology.corner}\` (\`border-radius: ${b4.borderRadiusPx}px\`).
- **[REQ-06] (Trazable a \`[INV-04]\`) Coreografía de Movimiento a 60 FPS:** Ejecutar animaciones nivel \`${b5.animationLevel}\` (\`${bespokeDna.motionPhysicsCriteria.transitionPhysics}\`, $\\zeta = ${bespokeDna.motionPhysicsCriteria.dampingRatioZeta}$, scroll \`${bespokeDna.motionPhysicsCriteria.scrollChoreography}\`) con física de resorte (\`stiffness: ${b5.springPhysics.stiffness}, damping: ${b5.springPhysics.damping}\`) respetando \`prefers-reduced-motion: reduce\`.
- **[REQ-07] Identidad Sonora Psicoacústica y Video Intro Paramétrica con Logo Bloqueado:** Configurar \`uiSfxMode: "${b6.uiSfxMode}"\`, material modal \`${b6.material}\` (\`f0=${sonicPatch.f0Hz}Hz, cutoff=${sonicPatch.spectralCentroidHz}Hz, attack=${sonicPatch.attackMs}ms, pico=${sonicPatch.gainPeakDbfs}dBFS <= -18dBFS\`), música \`${b6.backgroundMusic}\` e intro \`${b6.introVideoMode}\` (\`${bespokeDna.introChoreographyId}\`) usando \`${logos.primaryLogoPath}\`.
- **[REQ-08] (Trazable a \`[INV-06]\`) Activos Reales del Cliente, Prueba Social y OpenGraph:** Integrar activos reales (${b7.clientProvidedAssets.join(', ')}) y generar \`dist/og-image.svg\` (\`1200x630\`) automáticamente.
- **[REQ-09] (Trazable a \`[INV-05]\`) Captura de Leads \`Valibot\`, Pagos Idempotentes y Multi-Tenant RLS:** Habilitar formulario validado con \`Valibot\`, pasarela \`${b8.paymentGateway}\` e idempotencia compatible con \`${b8.databaseEngine}\`.
- **[REQ-10] SEO Técnico y Visibilidad IA (\`GEO / llms.txt\`):** Emitir \`llms.txt\`, \`robots.txt\`, \`sitemap.xml\` y \`Schema.org JSON-LD @graph\` para \`${b9.primaryKeywords.join(', ')}\` (\`${b9.geoTarget}\`).
- **[REQ-11] Blindaje DevSecOps (\`OWASP ASVS v5.0\`) y Pure Component 5-State Harness:** Compilar cabeceras \`_headers\` con \`${b9.securityLevel}\`, \`0\` source maps y superar los 5 estados del arnés de componentes puros (\`empty, loading, error-state, extreme-long-text-250chars, dark-mode\`).
- **[REQ-12] (Trazable a \`[INV-07]\`) Frontera \`Explicit Non-Goals\`, Presupuesto FinOps y \`DoD\`:** Mantener el gasto cloud \`<= $${b10.maxCloudApiBudgetUsd} USD\`, bloquear todo pedido listado en \`Explicit Non-Goals\` de \`PRD_LEAN.md\` y cumplir: ${b10.successMetricsDod.join(' | ')}.
`;
  fs.writeFileSync(specPath, specContent, 'utf8');

  // 2. Ensure PRODUCT.md stays synchronized with PRD_LEAN.md (if PRD_LEAN.md exists, mirror it; otherwise write summary)
  const prdLeanPath = path.join(projectDir, 'PRD_LEAN.md');
  const productPath = path.join(projectDir, 'PRODUCT.md');
  if (fs.existsSync(prdLeanPath)) {
    fs.copyFileSync(prdLeanPath, productPath);
  } else {
    const productContent = `# PRODUCT.md — Estrategia de Producto, Audiencia y CRO (\`${slug}\`)

- **Marca:** ${b1.brandName}
- **Arquetipo Industrial:** \`${b1.industryArchetype}\` (\`${b1.resolvedArchetypeId}\`)
- **Propuesta de Valor:** ${b1.valuePropositionOneLiner}
- **Primary CTA:** \`${b2.primaryCta}\` vía \`${b2.primaryCtaChannel}\`
- **Métricas de Éxito (DoD):** ${b10.successMetricsDod.join(' • ')}
`;
    fs.writeFileSync(productPath, productContent, 'utf8');
  }

  // 3. Update or create DESIGN.md integrating BRAND_IDENTITY_LOCK.json, Brand DNA Vector, and `## Sonic & Video Identity`
  const designPath = path.join(projectDir, 'DESIGN.md');
  const brandDnaSectionMarkdown = `## Brand DNA Vector & Bespoke Morphology

- **Morphology Selection Mode:** \`${bespokeDna.morphologyMode}\` (Tension: \`${bespokeDna.brandPersonalityTension}\`)
- **Axis 1 — Grid Topology (\`gridTopology\`):** \`${bespokeDna.gridTopology}\`
- **Axis 2 — Hero Architecture (\`heroArchitecture\`):** \`${bespokeDna.heroArchitecture}\`
- **Axis 3 — Component & Surface Morphology (\`componentMorphology\`):** Nav \`${bespokeDna.componentMorphology.nav}\` | Corner \`${bespokeDna.componentMorphology.corner}\` | Material \`${bespokeDna.componentMorphology.material}\`
- **Axis 4 — OKLCH Chromatic Gamut Mask (\`gamutMaskType\`):** \`${bespokeDna.gamutMaskType}\`
- **Axis 5 — Expressive Typographic Curation (\`fontPairingProfile\`):** \`${bespokeDna.fontPairingProfile}\` (\`${bespokeDna.fontPairingDetails.utopiaScaleName}\`)
- **Axis 6 — Kinetic Physics & Scroll Choreography (\`motionPhysicsCriteria\`):** \`${bespokeDna.motionPhysicsCriteria.transitionPhysics}\` ($\\zeta = ${bespokeDna.motionPhysicsCriteria.dampingRatioZeta}$) | Scroll \`${bespokeDna.motionPhysicsCriteria.scrollChoreography}\`
- **Axis 7 — Intro Video & 3D/Shader Decision (\`introAnd3dDecision\`):** Recommend Intro \`${Boolean(bespokeDna.introAnd3dDecision.recommendIntroVideo)}\` (\`${bespokeDna.introChoreographyId}\`) | 3D/Shader \`${bespokeDna.introAnd3dDecision.forged3dMode}\`
- **Intra-Category Morphological Divergence Score:** \`${bespokeDna.morphologicalDivergenceScore}\` (Mandatory Floor \`>= 0.70\`)
- **Birkhoff Aesthetic Harmony Score ($M = O / C$):** \`${bespokeDna.aestheticHarmonyScore}\` (Mandatory Floor \`>= 0.85\`)
`;

  const brandLockSectionMarkdown = `## Brand Identity Lock (\`BRAND_IDENTITY_LOCK.json\`)

- **Brand Identity Mode:** \`${brandMode}\` (\`lockClientPalette: ${lockPalette}\`)
- **Locked Primary Brand Color (\`--color-primary\`):** \`${pal.primaryBrandColor}\`
- **Locked Secondary Brand Color (\`--color-secondary\`):** \`${pal.secondaryBrandColor}\`
- **Locked Accent Brand Color (\`--color-accent\`):** \`${pal.accentBrandColor}\`
- **Locked Surface Colors:** Light \`${pal.surfaceLightColor}\` | Dark \`${pal.surfaceDarkColor}\`
- **Official Logo & Isotipo:** \`${logos.primaryLogoPath}\` | \`${logos.isotipoPath}\`
`;

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
  - Brand Intro Video: \`${b6.introVideoMode}\` (\`-14 LUFS\` integrated target, \`-1.0 dBTP\` True Peak, \`AV1/WebM 60 FPS <= 1.8 MB\`, Logo: \`${logos.primaryLogoPath}\`)
`;

  if (fs.existsSync(designPath)) {
    let existingDesign = fs.readFileSync(designPath, 'utf8');
    if (existingDesign.includes('## Brand DNA Vector & Bespoke Morphology')) {
      existingDesign = existingDesign.replace(
        /## Brand DNA Vector & Bespoke Morphology[\s\S]*?(?=\n## |\s*$)/,
        brandDnaSectionMarkdown.trim()
      );
    } else {
      existingDesign = existingDesign.trimEnd() + '\n\n' + brandDnaSectionMarkdown;
    }
    if (existingDesign.includes('## Brand Identity Lock')) {
      existingDesign = existingDesign.replace(
        /## Brand Identity Lock[\s\S]*?(?=\n## |\s*$)/,
        brandLockSectionMarkdown.trim()
      );
    } else {
      existingDesign = existingDesign.trimEnd() + '\n\n' + brandLockSectionMarkdown;
    }
    if (existingDesign.includes('## Sonic & Video Identity')) {
      existingDesign = existingDesign.replace(
        /## Sonic & Video Identity[\s\S]*?(?=\n## |\s*$)/,
        sonicSectionMarkdown.trim()
      );
    } else {
      existingDesign = existingDesign.trimEnd() + '\n\n' + sonicSectionMarkdown;
    }
    fs.writeFileSync(designPath, existingDesign.trimEnd() + '\n', 'utf8');
  } else {
    const freshDesign = `---
title: "DESIGN.md — ${b1.brandName} (${slug})"
surfaceMode: "${b4.surfaceMode}"
industryArchetype: "${b1.industryArchetype}"
brandIdentityMode: "${brandMode}"
lockClientPalette: ${lockPalette}
borderRadiusPx: ${b4.borderRadiusPx}
morphologicalDivergenceScore: ${bespokeDna.morphologicalDivergenceScore}
aestheticHarmonyScore: ${bespokeDna.aestheticHarmonyScore}
---

# DESIGN.md — Sistema Visual y Psicoacústico (\`${slug}\`)

## 1. Surface Mode & OKLCH Colorimetry
- **Surface Mode:** \`${b4.surfaceMode}\` (${b4.colorTheme})
- **Primary Token:** \`oklch(${b4.oklchPrimary.L} ${b4.oklchPrimary.C} ${b4.oklchPrimary.H})\`
- **Border Radius:** \`${b4.borderRadiusPx}px\`

## 2. Typography & Utopia Fluid Scale
- **Personality:** ${b4.typographyPersonality}
- **Fluid Scale:** \`clamp(1rem, 0.92rem + 0.4vw, 1.25rem)\`

${brandDnaSectionMarkdown}
${brandLockSectionMarkdown}
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
      projJson.brandIdentityMode = brandMode;
      projJson.lockClientPalette = lockPalette;
      projJson.sonicIdentity = {
        seedId: sonicPatch.seedId,
        uiSfxMode: b6.uiSfxMode,
        material: b6.material,
        backgroundMusic: b6.backgroundMusic,
        introVideoMode: b6.introVideoMode
      };
      projJson.prdInterviewStatus = 'COMPLETED_BY_CTO';
      projJson.specInterviewStatus = interview.specInterviewStatus;
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
    prdInterviewStatus: 'COMPLETED_BY_CTO',
    specInterviewStatus: interview.specInterviewStatus,
    interviewStatus: interview.status,
    brandIdentityMode: brandMode,
    lockClientPalette: lockPalette,
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
    prdInterviewStatus: 'COMPLETED_BY_CTO',
    specInterviewStatus: interview.specInterviewStatus,
    interviewStatus: interview.status,
    brandIdentityMode: brandMode,
    lockClientPalette: lockPalette,
    specPath,
    productPath,
    designPath,
    sonicPatch
  };
}

/**
 * Self-Test Suite (`node tools/orchestrator/client_interview_gate.mjs --self-test`):
 * Empirically verifies all 4 requirements of Stage 5.3:
 *   (a) A new project is born with both interviews pending and blocks `cto:construir` (`verifyDualInterviewGates`).
 *   (b) `cto:entrevista` (Gate #2) refuses to advance until `cto:entrevista-prd` (Gate #1) is completed and approved.
 *   (c) Loading `STRICT_EXISTING_BRAND` with hex palette and logo/isotipo paths in Gate #1 and approving seals
 *       `PRD_LEAN.md` and `BRAND_IDENTITY_LOCK.json` preserving the client's exact colors.
 *   (d) Completing and approving Gate #2 (`cto:entrevista -- --aprobar`) compiles `SPEC.md` (`[REQ-01]..[REQ-12]`)
 *       and `DESIGN.md` and unlocks `cto:construir` (`verifyDualInterviewGates` passes).
 */
export function runClientInterviewGateSelfTest() {
  // Ensure active reference project `agencia-alfa` has both gates approved for CI
  compilePrdLeanAndBrandLock('agencia-alfa', { approve: true, industry: 'saas' });
  initClientInterviewFiles('agencia-alfa', 'saas', { autoApprove: true, overwrite: true });
  const alfaCompiled = compileSpecFromInterview('agencia-alfa', { approve: true });
  const alfaDualGate = verifyDualInterviewGates('agencia-alfa', 'saas');

  const testSlug = '_test_interview_capsule';
  const testDir = path.join(ROOT, 'projects', testSlug);
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true, force: true });
  }

  // (a) Fresh project starts with BOTH interviews pending and blocks `cto:construir`
  initPrdInterviewFiles(testSlug, 'lujo', { autoApprove: false, overwrite: true });
  initClientInterviewFiles(testSlug, 'lujo', { autoApprove: false, overwrite: true });
  const initialDualCheck = verifyDualInterviewGates(testSlug, 'lujo');
  const scenarioA_NewProjectBlocksBuild =
    initialDualCheck.passed === false &&
    initialDualCheck.code === 'HARD_STOP_PRD_INTERVIEW_REQUIRED';

  // (b) Gate #2 (`cto:entrevista`) refuses to advance or compile while Gate #1 is still pending
  const gate2WhileGate1Pending = verifyClientInterviewGate(testSlug, 'lujo');
  let compileBlockedWhenGate1Pending = false;
  try {
    compileSpecFromInterview(testSlug, { approve: true, industry: 'lujo' });
  } catch (err) {
    compileBlockedWhenGate1Pending = String(err.message).includes('HARD_STOP_PRD_INTERVIEW_REQUIRED');
  }
  const scenarioB_Gate2BlockedUntilGate1Approved =
    gate2WhileGate1Pending.passed === false &&
    gate2WhileGate1Pending.code === 'HARD_STOP_PRD_INTERVIEW_REQUIRED' &&
    compileBlockedWhenGate1Pending;

  // (c) Approve Gate #1 with STRICT_EXISTING_BRAND, hex palette & logo/isotipo paths
  const prdCompiled = compilePrdLeanAndBrandLock(testSlug, {
    approve: true,
    industry: 'lujo',
    customOverrides: {
      officialBrandName: 'Maison Horlogère Genève',
      brandTagline: 'Alta Relojería Suiza Desde 1894',
      brandIdentityMode: 'STRICT_EXISTING_BRAND',
      lockClientPalette: true,
      logoAssets: {
        primaryLogoPath: 'public/assets/brand/maison-logo.svg',
        isotipoPath: 'public/assets/brand/maison-crest.svg',
        darkVariantLogoPath: 'public/assets/brand/maison-logo-gold.svg',
        lightVariantLogoPath: 'public/assets/brand/maison-logo-noir.svg',
        usageRules: 'Mantener escudo dorado imperial #D4AF37 sobre fondo obsidiana #090C10.'
      },
      officialPalette: {
        primaryBrandColor: '#D4AF37',
        secondaryBrandColor: '#1C2430',
        accentBrandColor: '#E5C158',
        surfaceLightColor: '#FAF7F0',
        surfaceDarkColor: '#090C10'
      }
    }
  });
  const brandLockJson = JSON.parse(fs.readFileSync(prdCompiled.brandLockPath, 'utf8'));
  const gate2AfterGate1Approved = verifyClientInterviewGate(testSlug, 'lujo');
  const scenarioC_StrictBrandSealedAndGate2NowAwaitingItsOwnApproval =
    prdCompiled.passed === true &&
    brandLockJson.brandIdentityMode === 'STRICT_EXISTING_BRAND' &&
    brandLockJson.lockClientPalette === true &&
    brandLockJson.officialPalette.primaryBrandColor === '#D4AF37' &&
    brandLockJson.logoAssets.primaryLogoPath === 'public/assets/brand/maison-logo.svg' &&
    gate2AfterGate1Approved.passed === false &&
    gate2AfterGate1Approved.code === 'HARD_STOP_SPEC_INTERVIEW_REQUIRED';

  // (d) Complete and approve Gate #2 -> compiles SPEC.md ([REQ-01]..[REQ-12]) + DESIGN.md and unlocks `cto:construir`
  const compiledAfterApproval = compileSpecFromInterview(testSlug, {
    approve: true,
    industry: 'lujo',
    refreshFromPrd: true
  });
  const unlockedDualGate = verifyDualInterviewGates(testSlug, 'lujo');
  const specText = fs.readFileSync(compiledAfterApproval.specPath, 'utf8');
  const designText = fs.readFileSync(compiledAfterApproval.designPath, 'utf8');

  const reqsAndTraceabilityPresent =
    specText.includes('[REQ-01]') &&
    specText.includes('[REQ-12]') &&
    specText.includes('[INV-03]') &&
    specText.includes('#D4AF37');
  const sonicAndBrandLockInDesign =
    designText.includes('## Brand Identity Lock') &&
    designText.includes('STRICT_EXISTING_BRAND') &&
    designText.includes('## Sonic & Video Identity') &&
    designText.includes('obsidian-crystal-resonance');

  const scenarioD_Gate2ApprovalCompilesSpecAndUnlocksBuild =
    unlockedDualGate.passed === true &&
    reqsAndTraceabilityPresent &&
    sonicAndBrandLockInDesign;

  // Clean up ephemeral test directory and temporary bead entry
  fs.rmSync(testDir, { recursive: true, force: true });
  const taskGraphPath = path.join(ROOT, '.agents', 'beads', 'task_graph.jsonl');
  if (fs.existsSync(taskGraphPath)) {
    const cleanedLines = fs
      .readFileSync(taskGraphPath, 'utf8')
      .split(/\r?\n/)
      .filter((l) => l.trim() && !l.includes(`"id":"bead-interview-${testSlug}"`));
    fs.writeFileSync(taskGraphPath, cleanedLines.join('\n') + '\n', 'utf8');
  }

  const passed =
    alfaCompiled.passed &&
    alfaDualGate.passed &&
    scenarioA_NewProjectBlocksBuild &&
    scenarioB_Gate2BlockedUntilGate1Approved &&
    scenarioC_StrictBrandSealedAndGate2NowAwaitingItsOwnApproval &&
    scenarioD_Gate2ApprovalCompilesSpecAndUnlocksBuild;

  return {
    passed,
    checks: {
      activeProjectAgenciaAlfaBothGatesApproved: alfaCompiled.passed && alfaDualGate.passed,
      scenarioA_newProjectStartsPendingAndBlocksConstruir: scenarioA_NewProjectBlocksBuild,
      scenarioB_gate2RefusesToAdvanceUntilGate1Approved: scenarioB_Gate2BlockedUntilGate1Approved,
      scenarioC_strictExistingBrandSealsPrdLeanAndBrandLockJson:
        scenarioC_StrictBrandSealedAndGate2NowAwaitingItsOwnApproval,
      scenarioD_gate2ApprovalCompilesSpecAndDesignAndUnlocksConstruir:
        scenarioD_Gate2ApprovalCompilesSpecAndUnlocksBuild
    }
  };
}

// CLI Runner
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  const args = process.argv.slice(2);
  if (args.includes('--self-test')) {
    const res = runClientInterviewGateSelfTest();
    console.log('\n====================================================================================');
    console.log('⚙️  GATE #2: TECHNICAL SPEC INTERVIEW & COMPILER — SELF-TEST REPORT');
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

    // Always verify Gate #1 prerequisite first!
    const prdGate = verifyPrdInterviewGate(slug, industry);
    if (!prdGate.passed) {
      if (checkOnly) {
        console.log(JSON.stringify(prdGate, null, 2));
      } else {
        console.error(`\n❌ ${prdGate.message}\n`);
      }
      process.exit(1);
    }

    if (checkOnly) {
      const gate = verifyClientInterviewGate(slug, industry);
      console.log(JSON.stringify(gate, null, 2));
      process.exit(gate.passed ? 0 : 1);
    }

    initClientInterviewFiles(slug, industry, { autoApprove: shouldApprove });
    if (shouldApprove) {
      const compiled = compileSpecFromInterview(slug, {
        approve: true,
        industry,
        refreshFromPrd: true
      });
      console.log(`\n✅ Entrevista #2 (SPEC.md Técnico de 10 Bloques) aprobada y compilada para "${slug}":`);
      console.log(`   • SPEC.md    : ${path.relative(ROOT, compiled.specPath)} ([REQ-01]..[REQ-12])`);
      console.log(`   • PRODUCT.md : ${path.relative(ROOT, compiled.productPath)} (Sincronizado con PRD_LEAN.md)`);
      console.log(`   • DESIGN.md  : ${path.relative(ROOT, compiled.designPath)} (Modo Marca: ${compiled.brandIdentityMode}, Seed: ${compiled.sonicPatch.seedId})`);
      console.log(`👉 Ambas entrevistas están aprobadas. Ya podés ejecutar el pipeline automatizado:`);
      console.log(`   npm run cto:construir\n`);
    } else {
      const gate = verifyClientInterviewGate(slug, industry);
      console.log(`\n📋 Plantilla de Entrevista #2 (10 Bloques Técnicos para SPEC.md) disponible en:`);
      console.log(`   • Cuestionario : projects/${slug}/ENTREVISTA_2_SPEC_TECNICO.md`);
      console.log(`   • Respuestas   : projects/${slug}/CLIENT_BRIEF_INTERVIEW.json (${gate.specInterviewStatus})`);
      if (!gate.passed) {
        console.log(`   ⚠️  Para aprobar la Entrevista #2, compilar SPEC.md y habilitar cto:construir ejecutá:`);
        console.log(`      npm run cto:entrevista -- ${slug} --aprobar\n`);
      }
    }
  }
}
