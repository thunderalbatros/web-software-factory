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
import {
  resolveIndustryArchetype,
  generateProductAndDesignMd
} from '../design/industry_archetype_matrix.mjs';
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

export const EDUCATION_NULL_SONIC_PRESET = Object.freeze({
  seedId: 'none-read-mode-silent',
  archetype: 'education',
  material: 'paper-editorial',
  uiSfxMode: 'off',
  borderRadiusPx: 6,
  oklch: { L: 0.34, C: 0.13, H: 245 },
  uses3dOrShaderInHero: false,
  exportReaperRppSession: false
});

function resolveSpecProjectTarget(slugOrDir = 'agencia-alfa', options = {}) {
  if (options?.projectDir) {
    const abs = path.resolve(options.projectDir);
    const inRepoProjects = abs.toLowerCase().startsWith(path.join(ROOT, 'projects').toLowerCase() + path.sep);
    return { projectDir: abs, slug: path.basename(abs), inRepoProjects };
  }
  const raw = String(slugOrDir || 'agencia-alfa').trim();
  if ((path.isAbsolute(raw) || /[\\/]/.test(raw)) && fs.existsSync(path.resolve(raw))) {
    const abs = path.resolve(raw);
    const inRepoProjects = abs.toLowerCase().startsWith(path.join(ROOT, 'projects').toLowerCase() + path.sep);
    return { projectDir: abs, slug: path.basename(abs), inRepoProjects };
  }
  return {
    projectDir: path.join(ROOT, 'projects', raw),
    slug: raw,
    inRepoProjects: true
  };
}

/**
 * Loads `BRAND_IDENTITY_LOCK.json`, `PRD_INTERVIEW_STATE.json`, and `factory.project.json` if present for a project.
 */
function loadBrandLockAndPrdState(slug = 'agencia-alfa', explicitProjectDir = null) {
  const projectDir = explicitProjectDir ? path.resolve(explicitProjectDir) : path.join(ROOT, 'projects', slug);
  const brandLockPath = path.join(projectDir, 'BRAND_IDENTITY_LOCK.json');
  const prdStatePath = path.join(projectDir, 'PRD_INTERVIEW_STATE.json');
  const manifestPath = path.join(projectDir, 'factory.project.json');
  let brandLock = null;
  let prdState = null;
  let manifest = null;
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
  if (fs.existsSync(manifestPath)) {
    try {
      manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    } catch (_) {}
  }
  return { brandLock, prdState, manifest };
}

/**
 * Builds the 10-Block Technical Specification Interview payload (`CLIENT_BRIEF_INTERVIEW.json`),
 * anchored to the immutable `PRD_LEAN.md` and `BRAND_IDENTITY_LOCK.json`.
 */
export function buildDefaultInterviewPayload(
  slug = 'agencia-alfa',
  industryInput = 'saas',
  specStatus = 'PENDING_CTO_SPEC_INPUT',
  options = {}
) {
  const { projectDir } = resolveSpecProjectTarget(slug, options);
  const { brandLock, prdState, manifest } = loadBrandLockAndPrdState(slug, projectDir);
  const isEducation =
    manifest?.complianceProfile === 'education' ||
    manifest?.archetype === 'education' ||
    String(industryInput || '').toLowerCase().trim() === 'education' ||
    brandLock?.industryCategory === 'education' ||
    brandLock?.industryCategory === 'academic-editorial-education' ||
    prdState?.blocks?.block1_business_identity_and_problem?.industryCategory === 'education';

  const effectiveIndustry = isEducation
    ? 'education'
    : brandLock?.industryCategory ||
      prdState?.blocks?.block1_business_identity_and_problem?.industryCategory ||
      industryInput;
  const arch = resolveIndustryArchetype(effectiveIndustry);
  const sonicSeed = isEducation
    ? EDUCATION_NULL_SONIC_PRESET
    : resolveSonicArchetypePreset(effectiveIndustry);
  const isLawOrRead = isEducation || arch.primarySurfaceMode === 'Read' || sonicSeed.archetype === 'abogacia';

  const brandName =
    brandLock?.brandName ||
    prdState?.blocks?.block1_business_identity_and_problem?.officialBrandName ||
    slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

  const primaryCta =
    prdState?.blocks?.block5_capabilities_and_cro_goals?.primaryCta ||
    (isEducation
      ? 'Comenzar Nivel 1 — Adquirir (100% Gratis, Sin Registro)'
      : 'Solicitar Auditoría / Demo Ejecutiva');
  const primaryCtaChannel =
    prdState?.blocks?.block5_capabilities_and_cro_goals?.primaryCtaChannel ||
    (isEducation
      ? 'Navegación Directa MPA (/niveles/principiante/) + Progreso Local en Navegador'
      : 'Calendly + WhatsApp Business + Lead Form');
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
    primaryLogoPath: isEducation ? 'public/favicon.svg' : 'public/assets/brand/logo-primary.svg',
    isotipoPath: isEducation ? 'public/favicon.svg' : 'public/assets/brand/isotipo.svg'
  };

  const normalizedStatus =
    specStatus === 'COMPLETED_BY_CTO' ? 'COMPLETED_BY_CTO' : 'PENDING_CTO_SPEC_INPUT';

  const eduPages = ['/', '/niveles/principiante/', '/niveles/intermedio/', '/niveles/avanzado/'];
  const eduDatabaseEngine = 'Static JSON (data/academy/*.json) + Local-First Browser Storage (Dexie/IndexedDB & localStorage)';

  return {
    schemaVersion: '2026.36.1',
    gateId: 'GATE_2_TECHNICAL_SPEC_AND_DESIGN',
    projectSlug: slug,
    complianceProfile: isEducation ? 'education' : manifest?.complianceProfile || 'standard-web',
    industryArchetype: isEducation ? 'education' : sonicSeed.archetype,
    surfaceMode: isEducation ? 'Read' : arch.primarySurfaceMode || 'Persuade',
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
        industryArchetype: isEducation ? 'education' : sonicSeed.archetype,
        resolvedArchetypeId: arch.id,
        pages: isEducation ? eduPages : ['Home', 'Soluciones', 'Casos de Éxito', 'Precios', 'Contacto'],
        domSectionsAndComponents: isEducation
          ? [
              'Header Editorial Minimalista con Selector de Tema Claro/Oscuro (0 Mute Toggle sonoro)',
              `Índice Editorial (${brandName}) con 3 Niveles UNESCO (Adquirir, Profundizar, Crear) y Buscador Pagefind`,
              'Columna de Lectura en Modo Read (65ch, bloques <= 110 palabras en español neutro tú)',
              'Fachada Multi-Video de Privacidad (youtube-nocookie.com + archive.org) con aviso local y síntesis textual',
              'Micro-Explorables en Cliente (js-tiktoken BPE + Temml MathML 0 KB JS) y Tutor Socrático en Sandbox Opaco (MessageChannel 1:1)'
            ]
          : [
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
        valibotSchemas: isEducation
          ? [
              'TutorOutboundPromptSchema (question, levelId, lessonSlug)',
              'TutorInboundMessageSchema (TUTOR_SANDBOX_READY | TUTOR_HINT_RESPONSE | TUTOR_ERROR)'
            ]
          : [
              'LeadCaptureFormSchema (nombre, email, telefono, mensaje, csrfToken)',
              'InteractiveCalculatorOrFilterSchema (categoria, presupuesto, urgencia)'
            ]
      },
      // Bloque 3: Topología de Grilla y Morfología de Componentes
      block3_grid_topology_and_morphology: {
        gridTopology: isEducation
          ? 'swiss-asymmetric-editorial'
          : isLawOrRead
          ? 'swiss-editorial-asymmetric-12col'
          : 'bento-modular-kinetic-grid',
        heroArchitecture: isEducation
          ? 'numbered-editorial-index-hero'
          : isLawOrRead
          ? 'split-authority-typographic-hero'
          : 'focal-centered-interactive-stage',
        surfaceMateriality: isEducation ? 'paper-editorial' : sonicSeed.material || 'polymer',
        intraCategoryDivergenceFloorPct: 70,
        respectBrandIdentityLock: true
      },
      // Bloque 4: Aplicación de Paleta, Contraste APCA y Escalas Tipográficas
      block4_palette_apca_and_typography_scales: {
        surfaceMode: isEducation ? 'Read' : arch.primarySurfaceMode || 'Persuade',
        brandIdentityMode: brandMode,
        lockClientPalette,
        lockedClientPalette: clientPalette,
        oklchPrimary: sonicSeed.oklch || { L: 0.65, C: 0.16, H: 255 },
        borderRadiusPx: sonicSeed.borderRadiusPx ?? 8,
        apcaContrastFloors: isEducation
          ? 'Lc >= 85 (Editorial Body & Headlines in Light & Dark Modes, WCAG 2.2 AA+)'
          : 'Lc >= 90 (Hero/Headline), Lc >= 75 (Body), Lc >= 60 (Secondary)',
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
        springPhysics: isEducation ? null : { stiffness: 280, damping: 24 },
        useScrollDrivenAnimationsCss: !isEducation,
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
        uses3dOrShaderInHero: isEducation ? false : !isLawOrRead,
        use3dTiltCards: !isLawOrRead,
        useWebGpuDiorama: !isEducation && (sonicSeed.archetype === 'lujo' || sonicSeed.archetype === 'streamer'),
        canvas3TimestampHistogramWatchdog: !isEducation
      },
      // Bloque 7: Diseño Sonoro UI SFX, Música de Fondo y Sesión .rpp Reaper
      block7_sonic_ui_sfx_music_and_reaper_rpp: {
        sonicForgeMode: isLawOrRead ? 'off' : 'generative-criteria',
        uiSfxMode: isLawOrRead ? 'off' : sonicSeed.uiSfxMode || 'subtle',
        material: isEducation ? 'paper-editorial' : sonicSeed.material || 'polymer',
        backgroundMusic: 'off',
        exportReaperRppSession: isEducation ? false : true,
        sonicSeedId: isEducation ? 'none-read-mode-silent' : sonicSeed.seedId,
        requiresVisibleMuteButton: isEducation ? false : true,
        autoplayBlockedUntilGesture: true
      },
      // Bloque 8: Video Intro Programática de Marca y Locución
      block8_programmatic_video_intro_and_voiceover: {
        videoForgeMode: isLawOrRead ? 'off' : 'minimal',
        introVideoMode: isLawOrRead ? 'none' : 'vector-svg-reveal-3s',
        lockedLogoSvgPath: clientLogos.primaryLogoPath,
        lockedIsotipoSvgPath: clientLogos.isotipoPath,
        useLockedClientPaletteInVideo: isEducation ? false : true,
        maxVideoBudgetMb: isEducation ? 0 : 1.8
      },
      // Bloque 9: Base de Datos, Pagos, Autenticación y Edge Worker
      block9_database_payments_auth_and_edge_worker: {
        databaseTier: isEducation
          ? 'static-json-and-indexeddb'
          : sonicSeed.archetype === 'erp'
          ? 'enterprise-postgres'
          : 'edge-d1',
        databaseEngine: isEducation
          ? eduDatabaseEngine
          : 'Cloudflare D1 SQLite + Enterprise PostgreSQL FORCE RLS Ready',
        paymentGateway: !isEducation && sonicSeed.archetype === 'ecommerce' ? 'Stripe / MercadoPago' : 'none',
        authMode: isEducation
          ? 'none (Anonymous Local-First — Ley 25.326)'
          : 'Ory/Passkeys (OAuth 2.1 PKCE)',
        workerEndpoints: isEducation
          ? []
          : ['POST /api/leads', 'POST /api/webhooks/payments', 'GET /api/health'],
        enforceWebhookIdempotencyAndRls: isEducation ? false : true
      },
      // Bloque 10: App Móvil Capacitor 8, Widget Post-Venta y Matriz de Pruebas [REQ-01]..[REQ-12]
      block10_mobile_capacitor_feedback_and_f2p_matrix: {
        enableCapacitor8MobileTarget: false,
        enablePostSaleFeedbackWidget: isEducation ? false : true,
        locales: isEducation ? ['es'] : ['es-AR'],
        maxCloudApiBudgetUsd: isEducation ? 0.0 : 0.25,
        totalGcpCreditPoolUsd: 90.0,
        f2pAcceptanceCriteria: isEducation
          ? [
              '[REQ-01..03] Astro 7.4.11 100% estático ($0 servidor), progreso local-first (Ley 25.326) y 0 violaciones WCAG 2.2 AA',
              '[REQ-04..06] Columna 60ch–70ch (65ch), español neutro <= 110 palabras (INFLESZ) y fachada multi-video con aviso local',
              '[REQ-07..09] js-tiktoken BPE local, Temml MathML 0 KB JS y sandbox opaco con MessageChannel 1:1 + Valibot + DOMPurify TrustedHTML',
              '[REQ-10..12] CSP estricta con hashes sha256 + Trusted Types (default.createHTML lanza TypeError), PWA MPA < 250 KB y autonomía fuera del monorepo'
            ]
          : [
              '[REQ-01..03] Identidad PRD_LEAN, Primary CTA >= 48x48px y derribo de 3 objeciones',
              '[REQ-04..06] BRAND_IDENTITY_LOCK (lockClientPalette), APCA Lc >= 75 y 60 FPS',
              '[REQ-07..09] Audio/Video <= -18dBFS, Valibot, Idempotencia Webhooks y RLS Multi-Tenant',
              '[REQ-10..12] SEO/GEO llms.txt, CSP/ASVS v5.0 y Pure Component 5-State Harness >= 95/100'
            ]
      },
      // Compatibilidad retroactiva con selectores de fases previas
      block1_commercial_identity: {
        brandName,
        industryArchetype: isEducation ? 'education' : sonicSeed.archetype,
        resolvedArchetypeId: arch.id,
        valuePropositionOneLiner:
          prdState?.blocks?.block2_target_audience_and_objections?.uniqueValueProposition ||
          (isEducation
            ? `Academia abierta y gratuita de inteligencia artificial en español (${brandName}) en modo lectura (Read) a costo servidor $0.`
            : `Plataforma digital de alta conversión para ${brandName} con arquitectura edge y diseño de precisión.`),
        referenceCompetitors: isEducation
          ? ['Distill.pub', 'Brilliant.org', 'Elements of AI']
          : ['Linear.app', 'Stripe.com', 'Vercel.com']
      },
      block2_target_audience_cro: {
        segment:
          prdState?.blocks?.block2_target_audience_and_objections?.targetDemographic ||
          (isEducation
            ? 'Estudiantes hispanohablantes, docentes, trabajadores y autodidactas'
            : 'B2B / High-Intent Decision Makers'),
        ageRange: isEducation ? '16-75' : '28-55',
        purchasingPower: isEducation ? 'Inclusive Open Access ($0 Free Forever)' : 'High / Enterprise & Professional',
        primaryObjection:
          prdState?.blocks?.block2_target_audience_and_objections?.topThreeBuyerObjections?.[0] ||
          (isEducation
            ? '¿Es realmente 100% gratuito sin muros de pago ni cuentas obligatorias?'
            : 'Tiempo de implementación y retorno de inversión verificable'),
        primaryCta,
        primaryCtaChannel
      },
      block3_sitemap_and_flows: {
        pages: isEducation ? eduPages : ['Home', 'Soluciones', 'Casos de Éxito', 'Precios', 'Contacto'],
        mandatorySections: isEducation
          ? [
              'Índice Editorial con 3 Niveles UNESCO y Búsqueda Estática Pagefind',
              'Columna de Lectura 65ch con Jerarquía Limpia h1 -> h2 -> h3',
              'Fachada Multi-Video (youtube-nocookie.com + archive.org) con Aviso de Almacenamiento Local',
              'Micro-Explorables (js-tiktoken + Temml MathML 0 KB JS)',
              'Tutor Socrático en Sandbox Opaco (MessageChannel 1:1 + Valibot + DOMPurify TrustedHTML)'
            ]
          : [
              'Hero con Propuesta de Valor y Primary CTA',
              'Bento Grid de Capacidades Core',
              'Prueba Social y Métricas Verificadas',
              'Tabla Comparativa / Precios Transparentes',
              'Formulario de Captura sin Fricción + FAQ'
            ]
      },
      block4_aesthetic_oklch_typography: {
        surfaceMode: isEducation ? 'Read' : arch.primarySurfaceMode || 'Persuade',
        colorTheme: isEducation
          ? 'OKLCH 90/8/2 Daylight Paper & Calm Night Slate + 3 Level Accents'
          : isLawOrRead
          ? 'Warm Editorial Light'
          : 'High-Craft Adaptive OKLCH',
        oklchPrimary: sonicSeed.oklch || { L: 0.65, C: 0.16, H: 255 },
        borderRadiusPx: sonicSeed.borderRadiusPx ?? 8,
        typographyPersonality: isLawOrRead
          ? 'Editorial Serif + Swiss Sans'
          : 'Swiss Geometric Sans + Tabular Mono'
      },
      block5_motion_webgpu_shaders: {
        animationLevel: isLawOrRead ? 'minimal-editorial' : 'spring-fluid-60fps',
        uses3dOrShaderInHero: isEducation ? false : !isLawOrRead,
        use3dTiltCards: !isLawOrRead,
        useWebGpuDiorama: !isEducation && (sonicSeed.archetype === 'lujo' || sonicSeed.archetype === 'streamer'),
        useViewTransitionsApi: true,
        springPhysics: isEducation ? null : { stiffness: 280, damping: 24 }
      },
      block6_sonic_music_video: {
        uiSfxMode: isLawOrRead ? 'off' : sonicSeed.uiSfxMode || 'subtle',
        material: isEducation ? 'paper-editorial' : sonicSeed.material || 'polymer',
        backgroundMusic: 'off',
        introVideoMode: isLawOrRead ? 'none' : 'vector-svg-reveal-3s',
        sonicSeedId: isEducation ? 'none-read-mode-silent' : sonicSeed.seedId,
        exportReaperRppSession: isEducation ? false : true,
        requiresVisibleMuteButton: isEducation ? false : true,
        autoplayBlockedUntilGesture: true
      },
      block7_client_assets_vs_ai: {
        clientProvidedAssets: isEducation
          ? ['public/favicon.svg', 'data/academy/project_charter.json', 'PRD_LEAN.md']
          : [
              clientLogos.primaryLogoPath,
              clientLogos.isotipoPath,
              'Textos Comerciales PRD_LEAN.md'
            ],
        factoryAiGeneratedAssets: isEducation
          ? ['OpenGraph Vectorial Estático (public/og-image.svg)', 'Manifiestos llms.txt & llms-full.txt (0 generadores externos de imagen)']
          : [
              'OpenGraph Social Card (og-image.svg)',
              'Copywriting CRO Optimizado',
              'Keyframes / Ilustración SOTA'
            ]
      },
      block8_technical_backend_integrations: {
        leadCaptureForm: isEducation ? false : true,
        paymentGateway: isEducation
          ? 'none'
          : sonicSeed.archetype === 'ecommerce'
          ? 'Stripe / MercadoPago'
          : 'None (Consultation Flow)',
        authMode: isEducation
          ? 'none (Anonymous Local-First — Ley 25.326)'
          : 'OAuth 2.1 PKCE / Session Guard',
        databaseEngine: isEducation
          ? eduDatabaseEngine
          : 'Cloudflare D1 SQLite + Enterprise PostgreSQL FORCE RLS Ready',
        externalIntegrations: isEducation
          ? ['youtube-nocookie.com (Click-to-Play Privacy Facade)', 'archive.org OER Media', 'wikimedia.org OER Assets']
          : ['WhatsApp Direct', 'CRM Webhook', 'Privacy-First Analytics']
      },
      block9_seo_geo_legal_security: {
        primaryKeywords: isEducation
          ? [slug.replace(/-/g, ' '), 'inteligencia artificial gratis', 'educación abierta', 'español']
          : [slug.replace(/-/g, ' '), sonicSeed.archetype, 'alta conversión', 'software'],
        geoTarget: isEducation ? 'es (América Latina & España)' : 'es-AR / LATAM / Global',
        generateLlmsTxt: true,
        accessibilityFloor: isEducation
          ? 'WCAG 2.2 AA+ / APCA Lc >= 85 (Light & Dark)'
          : 'WCAG 2.2 AA+ / APCA Lc >= 75',
        securityLevel: isEducation
          ? 'Strict Hash CSP + Trusted Types (default throws TypeError) + Opaque Sandbox MessageChannel 1:1'
          : 'OWASP ASVS v5.0 L2 + Strict CSP + HSTS'
      },
      block10_finops_budget_and_dod: {
        locales: isEducation ? ['es'] : ['es-AR'],
        maxCloudApiBudgetUsd: isEducation ? 0.0 : 0.25,
        totalGcpCreditPoolUsd: 90.0,
        successMetricsDod: isEducation
          ? [
              'RYUX Design Gate Read Mode = 100/100 & Security Gate = 100/100',
              'LCP <= 1.8s, CLS = 0.000, PWA Precache < 250 KB & 0 violaciones CSP/Trusted Types/axe',
              '100% de autonomía standalone en os.tmpdir() sin acceso a herramientas del monorepo'
            ]
          : [
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
 * Generates `ENTREVISTA_2_SPEC_TECNICO.md` (and `ENTREVISTA_CLIENTE.md` for commercial profiles) + `CLIENT_BRIEF_INTERVIEW.json`.
 */
export function initClientInterviewFiles(slugOrDir = 'agencia-alfa', industryInput = 'saas', options = {}) {
  const { projectDir, slug } = resolveSpecProjectTarget(slugOrDir, options);
  fs.mkdirSync(projectDir, { recursive: true });

  const { brandLock, prdState, manifest } = loadBrandLockAndPrdState(slug, projectDir);
  const isEducation =
    manifest?.complianceProfile === 'education' ||
    manifest?.archetype === 'education' ||
    String(industryInput || '').toLowerCase().trim() === 'education' ||
    brandLock?.industryCategory === 'education' ||
    brandLock?.industryCategory === 'academic-editorial-education' ||
    prdState?.blocks?.block1_business_identity_and_problem?.industryCategory === 'education';

  const jsonPath = path.join(projectDir, 'CLIENT_BRIEF_INTERVIEW.json');
  const mdPath = path.join(projectDir, 'ENTREVISTA_CLIENTE.md');
  const specMdInterviewPath = path.join(projectDir, 'ENTREVISTA_2_SPEC_TECNICO.md');

  if (isEducation && fs.existsSync(mdPath)) {
    fs.rmSync(mdPath, { force: true });
  }

  if (fs.existsSync(jsonPath) && !options.overwrite) {
    const existing = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    if (!existing.specInterviewStatus) {
      existing.specInterviewStatus =
        existing.status === 'COMPLETED_BY_CTO' ? 'COMPLETED_BY_CTO' : 'PENDING_CTO_SPEC_INPUT';
    }
    const rendered = renderInterviewMarkdown(existing);
    if (!isEducation && !fs.existsSync(mdPath)) {
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
      mdPath: isEducation ? null : mdPath,
      specMdInterviewPath,
      interview: existing
    };
  }

  const initialStatus = options.autoApprove ? 'COMPLETED_BY_CTO' : 'PENDING_CTO_SPEC_INPUT';
  const payload = buildDefaultInterviewPayload(slug, isEducation ? 'education' : industryInput, initialStatus, {
    projectDir
  });
  const rendered = renderInterviewMarkdown(payload);
  fs.writeFileSync(jsonPath, JSON.stringify(payload, null, 2) + '\n', 'utf8');
  if (!isEducation) {
    fs.writeFileSync(mdPath, rendered, 'utf8');
  }
  fs.writeFileSync(specMdInterviewPath, rendered, 'utf8');

  return {
    created: true,
    projectSlug: slug,
    status: payload.status,
    specInterviewStatus: payload.specInterviewStatus,
    jsonPath,
    mdPath: isEducation ? null : mdPath,
    specMdInterviewPath,
    interview: payload
  };
}

/**
 * Verifies Gate #1 (`PRD_LEAN.md` + `BRAND_IDENTITY_LOCK.json`) AND Gate #2 (`CLIENT_BRIEF_INTERVIEW.json`).
 * - If Gate #1 is not `"COMPLETED_BY_CTO"`, returns `HARD_STOP_PRD_INTERVIEW_REQUIRED`.
 * - If Gate #2 is not `"COMPLETED_BY_CTO"`, returns `HARD_STOP_SPEC_INTERVIEW_REQUIRED`.
 */
export function verifyClientInterviewGate(slugOrDir = 'agencia-alfa', industryFallback = 'saas', options = {}) {
  const { projectDir, slug } = resolveSpecProjectTarget(slugOrDir, options);
  const { manifest } = loadBrandLockAndPrdState(slug, projectDir);
  const effectiveFallback =
    manifest?.complianceProfile === 'education' || manifest?.archetype === 'education'
      ? 'education'
      : industryFallback;

  // 1. Check Gate #1 (PRD & Brand Identity Lock) first!
  const prdGate = verifyPrdInterviewGate(slugOrDir, effectiveFallback, { projectDir });
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

  const jsonPath = path.join(projectDir, 'CLIENT_BRIEF_INTERVIEW.json');
  const mdPath = path.join(projectDir, 'ENTREVISTA_2_SPEC_TECNICO.md');

  if (!fs.existsSync(jsonPath)) {
    const initialized = initClientInterviewFiles(slugOrDir, effectiveFallback, {
      autoApprove: false,
      projectDir
    });
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
export function verifyDualInterviewGates(slugOrDir = 'agencia-alfa', industryFallback = 'saas', options = {}) {
  const { projectDir, slug } = resolveSpecProjectTarget(slugOrDir, options);
  const { manifest } = loadBrandLockAndPrdState(slug, projectDir);
  const effectiveFallback =
    manifest?.complianceProfile === 'education' || manifest?.archetype === 'education'
      ? 'education'
      : industryFallback;

  const prdGate = verifyPrdInterviewGate(slugOrDir, effectiveFallback, { projectDir });
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
  const specGate = verifyClientInterviewGate(slugOrDir, effectiveFallback, { projectDir });
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
 * Bidirectional Markdown -> JSON parser (`parseEditedSpecMarkdownIntoState`):
 * Reads any manual edits made by the CTO directly in `ENTREVISTA_2_SPEC_TECNICO.md`
 * across all 10 technical blocks and synchronizes them into `CLIENT_BRIEF_INTERVIEW.json`.
 */
export function parseEditedSpecMarkdownIntoState(mdContent = '', currentState = {}) {
  if (!mdContent || typeof mdContent !== 'string' || !currentState?.blocks) {
    return currentState;
  }
  const next = JSON.parse(JSON.stringify(currentState));
  const b = next.blocks;
  const stripTicks = (val) => String(val || '').trim().replace(/^`+|`+$/g, '').trim();
  const matchField = (labelPattern) => {
    const rx = new RegExp(`-\\s+\\*\\*${labelPattern}:\\*\\*\\s*(.+)`, 'i');
    const m = mdContent.match(rx);
    return m ? m[1].trim() : null;
  };

  // Bloque 1
  const pagesLine = matchField('Mapa de Vistas');
  if (pagesLine) {
    const pages = pagesLine
      .split(/\s*(?:→|->|,)\s*/)
      .map((p) => stripTicks(p))
      .filter(Boolean);
    if (pages.length > 0) {
      if (b.block1_pages_and_dom_architecture) b.block1_pages_and_dom_architecture.pages = pages;
      if (b.block3_sitemap_and_flows) b.block3_sitemap_and_flows.pages = pages;
    }
  }
  const domComponentsMatch = mdContent.match(
    /Desglose de Componentes DOM Requeridos:\*\*\s*\r?\n((?:\s+-\s+.+\r?\n?)+)/i
  );
  if (domComponentsMatch) {
    const comps = domComponentsMatch[1]
      .split(/\r?\n/)
      .map((l) => l.replace(/^\s*-\s+/, '').trim())
      .filter(Boolean);
    if (comps.length > 0 && b.block1_pages_and_dom_architecture) {
      b.block1_pages_and_dom_architecture.domSectionsAndComponents = comps;
    }
  }

  // Bloque 2
  const ctaLine = matchField('Primary CTA Conectado');
  if (ctaLine) {
    const mCta = ctaLine.match(/^`?([^`()]+)`?\s*(?:\(([^)]+)\))?/);
    if (mCta) {
      const ctaVal = stripTicks(mCta[1]);
      const chVal = mCta[2] ? mCta[2].trim() : null;
      if (b.block2_functional_contracts_and_valibot) {
        b.block2_functional_contracts_and_valibot.primaryCta = ctaVal;
        if (chVal) b.block2_functional_contracts_and_valibot.primaryCtaChannel = chVal;
      }
      if (b.block2_target_audience_cro) {
        b.block2_target_audience_cro.primaryCta = ctaVal;
        if (chVal) b.block2_target_audience_cro.primaryCtaChannel = chVal;
      }
    }
  }

  // Bloque 3
  const gridVal = matchField('Topolog[íi]a de Grilla \\(`gridTopology`\\)');
  if (gridVal && b.block3_grid_topology_and_morphology) {
    b.block3_grid_topology_and_morphology.gridTopology = stripTicks(gridVal);
  }
  const heroVal = matchField('Arquitectura de Hero \\(`heroArchitecture`\\)');
  if (heroVal && b.block3_grid_topology_and_morphology) {
    b.block3_grid_topology_and_morphology.heroArchitecture = stripTicks(heroVal);
  }
  const matLine = matchField('Materialidad de Superficie');
  if (matLine) {
    const mMat = matLine.match(/^`?([^`()\s]+)`?/);
    if (mMat) {
      const matVal = stripTicks(mMat[1]);
      if (b.block3_grid_topology_and_morphology) b.block3_grid_topology_and_morphology.surfaceMateriality = matVal;
      if (b.block6_sonic_music_video) b.block6_sonic_music_video.material = matVal;
      if (b.block7_sonic_ui_sfx_music_and_reaper_rpp) b.block7_sonic_ui_sfx_music_and_reaper_rpp.material = matVal;
    }
  }

  // Bloque 4
  const surfaceLine = matchField('Modo de Superficie');
  if (surfaceLine) {
    const mSurf = surfaceLine.match(/^`?([^`|\s]+)`?/);
    if (mSurf) {
      const surfVal = stripTicks(mSurf[1]);
      if (b.block4_palette_apca_and_typography_scales) b.block4_palette_apca_and_typography_scales.surfaceMode = surfVal;
      if (b.block4_aesthetic_oklch_typography) b.block4_aesthetic_oklch_typography.surfaceMode = surfVal;
    }
  }

  // Bloque 5
  const tensionVal = matchField('Eje de Tensi[óo]n de Personalidad \\(`brandPersonalityTension`\\)');
  if (tensionVal && b.block5_motion_physics_and_scroll_60fps) {
    b.block5_motion_physics_and_scroll_60fps.brandPersonalityTension = stripTicks(tensionVal);
  }
  const morphModeLine = matchField('Modo de Selecci[óo]n Morfol[óo]gica \\(`morphologySelectionMode`\\)');
  if (morphModeLine && b.block5_motion_physics_and_scroll_60fps) {
    const mMode = morphModeLine.match(/^`?([^`()\s]+)`?/);
    if (mMode) b.block5_motion_physics_and_scroll_60fps.morphologySelectionMode = stripTicks(mMode[1]);
  }
  const animLine = matchField('Nivel de Animaci[óo]n');
  if (animLine) {
    const mAnim = animLine.match(/^`?([^`()\s]+)`?/);
    if (mAnim) {
      const animVal = stripTicks(mAnim[1]);
      if (b.block5_motion_physics_and_scroll_60fps) b.block5_motion_physics_and_scroll_60fps.animationLevel = animVal;
      if (b.block5_motion_webgpu_shaders) b.block5_motion_webgpu_shaders.animationLevel = animVal;
    }
  }

  // Bloque 6
  const forge3dVal = matchField('Modo 3D \\/ Shader[^*]*');
  if (forge3dVal && b.block6_webgpu_3d_glb_and_shaders) {
    b.block6_webgpu_3d_glb_and_shaders.forge3dMode = stripTicks(forge3dVal);
  }

  // Bloque 7
  const sonicLine = matchField('Modo Sonoro[^*]*');
  if (sonicLine) {
    const mSonic = sonicLine.match(/^`?([^`()\s]+)`?(?:.*uiSfxMode:\s*([^,)]+))?(?:.*material\s*`?([^`)]+)`?)?/i);
    if (mSonic) {
      if (b.block7_sonic_ui_sfx_music_and_reaper_rpp) {
        b.block7_sonic_ui_sfx_music_and_reaper_rpp.sonicForgeMode = stripTicks(mSonic[1]);
      }
      if (mSonic[2]) {
        const sfx = stripTicks(mSonic[2]);
        if (b.block7_sonic_ui_sfx_music_and_reaper_rpp) b.block7_sonic_ui_sfx_music_and_reaper_rpp.uiSfxMode = sfx;
        if (b.block6_sonic_music_video) b.block6_sonic_music_video.uiSfxMode = sfx;
      }
      if (mSonic[3]) {
        const mat = stripTicks(mSonic[3]);
        if (b.block7_sonic_ui_sfx_music_and_reaper_rpp) b.block7_sonic_ui_sfx_music_and_reaper_rpp.material = mat;
        if (b.block6_sonic_music_video) b.block6_sonic_music_video.material = mat;
      }
    }
  }
  const musicLine = matchField('M[úu]sica de Fondo');
  if (musicLine) {
    const mMus = musicLine.match(/^`?([^`|\s]+)`?/);
    if (mMus) {
      const musVal = stripTicks(mMus[1]);
      if (b.block7_sonic_ui_sfx_music_and_reaper_rpp) b.block7_sonic_ui_sfx_music_and_reaper_rpp.backgroundMusic = musVal;
      if (b.block6_sonic_music_video) b.block6_sonic_music_video.backgroundMusic = musVal;
    }
  }

  // Bloque 8
  const videoLine = matchField('Modo de Video Intro[^*]*');
  if (videoLine) {
    const mVid = videoLine.match(/^`?([^`()\s]+)`?\s*(?:\(`?([^`)]+)`?\))?/);
    if (mVid) {
      const vfMode = stripTicks(mVid[1]);
      const ivMode = mVid[2] ? stripTicks(mVid[2]) : vfMode;
      if (b.block8_programmatic_video_intro_and_voiceover) {
        b.block8_programmatic_video_intro_and_voiceover.videoForgeMode = vfMode;
        b.block8_programmatic_video_intro_and_voiceover.introVideoMode = ivMode;
      }
      if (b.block6_sonic_music_video) {
        b.block6_sonic_music_video.introVideoMode = ivMode;
      }
    }
  }

  // Bloque 9
  const dbLine = matchField('Motor de Datos[^*]*');
  if (dbLine) {
    const mDb = dbLine.match(/^`?([^`()\s]+)`?\s*(?:\((.+)\)\s*$)?/);
    if (mDb && b.block9_database_payments_auth_and_edge_worker) {
      b.block9_database_payments_auth_and_edge_worker.databaseTier = stripTicks(mDb[1]);
      if (mDb[2]) {
        const parsedEngine = mDb[2].trim();
        b.block9_database_payments_auth_and_edge_worker.databaseEngine = parsedEngine;
        if (b.block8_technical_backend_integrations) {
          b.block8_technical_backend_integrations.databaseEngine = parsedEngine;
        }
      }
    }
  }
  const payLine = matchField('Pasarela de Pagos');
  if (payLine) {
    const mPay = payLine.match(/^`?([^`|]+)`?/);
    if (mPay) {
      const payVal = stripTicks(mPay[1]);
      if (b.block9_database_payments_auth_and_edge_worker) b.block9_database_payments_auth_and_edge_worker.paymentGateway = payVal;
      if (b.block8_technical_backend_integrations) b.block8_technical_backend_integrations.paymentGateway = payVal;
    }
  }

  // Bloque 10
  const mobLine = matchField('Target M[óo]vil `Capacitor 8`');
  if (mobLine && b.block10_mobile_capacitor_feedback_and_f2p_matrix) {
    const mMob = mobLine.match(/^`?(true|false)`?/i);
    if (mMob) {
      b.block10_mobile_capacitor_feedback_and_f2p_matrix.enableCapacitor8MobileTarget =
        mMob[1].toLowerCase() === 'true';
    }
  }

  return next;
}

/**
 * Compiles `CLIENT_BRIEF_INTERVIEW.json` + `PRD_LEAN.md` + `BRAND_IDENTITY_LOCK.json` into:
 *   1. `projects/<slug>/SPEC.md` (`[REQ-01]` to `[REQ-12]` mapped 1:1 from `[INV-01]..[INV-07]` + Playwright matrix)
 *   2. `projects/<slug>/PRODUCT.md` (synchronized with `PRD_LEAN.md`)
 *   3. `projects/<slug>/DESIGN.md` (integrating `BRAND_IDENTITY_LOCK.json`, OKLCH tokens, Utopia clamp(), and `## Sonic & Video Identity`)
 *   4. `projects/<slug>/factory.project.json` and `.agents/beads/task_graph.jsonl`.
 */
export function compileSpecFromInterview(slugOrDir = 'agencia-alfa', options = {}) {
  const { projectDir, slug, inRepoProjects } = resolveSpecProjectTarget(slugOrDir, options);
  const { brandLock: initialBrandLock, prdState: initialPrdState, manifest: initialManifest } =
    loadBrandLockAndPrdState(slug, projectDir);
  const isEducation =
    initialManifest?.complianceProfile === 'education' ||
    initialManifest?.archetype === 'education' ||
    String(options.industry || '').toLowerCase().trim() === 'education' ||
    initialBrandLock?.industryCategory === 'education' ||
    initialBrandLock?.industryCategory === 'academic-editorial-education' ||
    initialPrdState?.blocks?.block1_business_identity_and_problem?.industryCategory === 'education';
  const effectiveIndustry = isEducation ? 'education' : options.industry || 'saas';

  // Enforce Gate #1 prerequisite!
  const prdGate = verifyPrdInterviewGate(slugOrDir, effectiveIndustry, { projectDir });
  if (!prdGate.passed) {
    throw new Error(prdGate.message);
  }

  const jsonPath = path.join(projectDir, 'CLIENT_BRIEF_INTERVIEW.json');
  const mdPath = path.join(projectDir, 'ENTREVISTA_CLIENTE.md');
  const specMdInterviewPath = path.join(projectDir, 'ENTREVISTA_2_SPEC_TECNICO.md');

  if (isEducation && fs.existsSync(mdPath)) {
    fs.rmSync(mdPath, { force: true });
  }

  // Preserve any manual Markdown edits made by the CTO on disk BEFORE any refresh/init
  const hadExistingSpecMd =
    fs.existsSync(specMdInterviewPath) || (!isEducation && fs.existsSync(mdPath));
  const existingSpecMdContent = fs.existsSync(specMdInterviewPath)
    ? fs.readFileSync(specMdInterviewPath, 'utf8')
    : !isEducation && fs.existsSync(mdPath)
    ? fs.readFileSync(mdPath, 'utf8')
    : '';

  if (!fs.existsSync(jsonPath) || options.refreshFromPrd) {
    initClientInterviewFiles(slugOrDir, effectiveIndustry, {
      autoApprove: Boolean(options.approve),
      overwrite: Boolean(options.refreshFromPrd),
      projectDir
    });
  }

  let interview = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  if (hadExistingSpecMd && existingSpecMdContent) {
    interview = parseEditedSpecMarkdownIntoState(existingSpecMdContent, interview);
  }
  const { brandLock } = loadBrandLockAndPrdState(slug, projectDir);

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
  if (!isEducation) {
    fs.writeFileSync(mdPath, renderedInterviewMd, 'utf8');
  }
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
  const t3Block = interview.blocks.block3_grid_topology_and_morphology || {};
  const t5Block = interview.blocks.block5_motion_physics_and_scroll_60fps || {};
  const bespokeDna = synthesizeUniqueBrandDna({
    projectSlug: slug,
    industryCategory: isEducation ? 'education' : b1.industryArchetype,
    brandPersonalityTension:
      t5Block.brandPersonalityTension || 'minimalismo-silencioso vs expresividad-cinetica',
    morphologyMode: t5Block.morphologySelectionMode || 'auto-bespoke-criteria',
    manualOverrides: isEducation
      ? {
          gridTopology: 'editorial-single-column-65ch',
          heroArchitecture: 'editorial-typographic-manifesto'
        }
      : t5Block.morphologySelectionMode === 'manual-cto-override'
      ? {
          gridTopology: t3Block.gridTopology,
          heroArchitecture: t3Block.heroArchitecture
        }
      : undefined,
    baseHue: b4.oklchPrimary?.H || (isEducation ? 245 : 255),
    persistInLedger: inRepoProjects && !slug.startsWith('_test')
  });

  if (isEducation) {
    bespokeDna.introChoreographyId = 'none-read-mode';
    bespokeDna.introAnd3dDecision = {
      recommendIntroVideo: false,
      forged3dMode: 'none-static-editorial',
      uses3dOrShaderInHero: false
    };
  }

  // Synthesize exact psychoacoustic patch from the visual and material criteria (or null preset for Read-mode education)
  const sonicPatch = isEducation
    ? { ...EDUCATION_NULL_SONIC_PRESET }
    : synthesizeProceduralSoundFromDesignCriteria({
        archetype: b1.industryArchetype,
        uiSfxMode: b6.uiSfxMode,
        material: b6.material,
        borderRadiusPx: b4.borderRadiusPx,
        oklch: b4.oklchPrimary,
        elementWidthPx: 180,
        elementHeightPx: 48,
        spring: b5.springPhysics
      });

  // Persist synthesized bespokeDna and sonicPatch back into CLIENT_BRIEF_INTERVIEW.json so downstream compilers consume the exact DNA
  interview.bespokeDna = {
    morphologyMode: bespokeDna.morphologyMode,
    brandPersonalityTension: bespokeDna.brandPersonalityTension,
    gridTopology: bespokeDna.gridTopology,
    heroArchitecture: bespokeDna.heroArchitecture,
    componentMorphology: bespokeDna.componentMorphology,
    gamutMaskType: bespokeDna.gamutMaskType,
    fontPairingProfile: bespokeDna.fontPairingProfile,
    fontPairingDetails: bespokeDna.fontPairingDetails,
    motionPhysicsCriteria: bespokeDna.motionPhysicsCriteria,
    introChoreographyId: bespokeDna.introChoreographyId,
    introAnd3dDecision: bespokeDna.introAnd3dDecision,
    morphologicalDivergenceScore: bespokeDna.morphologicalDivergenceScore,
    aestheticHarmonyScore: bespokeDna.aestheticHarmonyScore
  };
  interview.sonicPatch = sonicPatch;
  if (interview.blocks.block3_grid_topology_and_morphology) {
    interview.blocks.block3_grid_topology_and_morphology.gridTopology = bespokeDna.gridTopology;
    interview.blocks.block3_grid_topology_and_morphology.heroArchitecture = bespokeDna.heroArchitecture;
  }
  const updatedInterviewMd = renderInterviewMarkdown(interview);
  fs.writeFileSync(jsonPath, JSON.stringify(interview, null, 2) + '\n', 'utf8');
  if (!isEducation) {
    fs.writeFileSync(mdPath, updatedInterviewMd, 'utf8');
  }
  fs.writeFileSync(specMdInterviewPath, updatedInterviewMd, 'utf8');

  const updateProjectManifest = () => {
    const factoryProjPath = path.join(projectDir, 'factory.project.json');
    if (fs.existsSync(factoryProjPath)) {
      try {
        const projJson = JSON.parse(fs.readFileSync(factoryProjPath, 'utf8'));
        projJson.industryArchetype = isEducation ? 'education' : b1.industryArchetype;
        projJson.surfaceMode = isEducation ? 'Read' : b4.surfaceMode;
        if (isEducation) {
          projJson.complianceProfile = 'education';
          if (projJson.paths && 'workerEntry' in projJson.paths) {
            projJson.paths.workerEntry = null;
          }
        }
        projJson.brandIdentityMode = brandMode;
        projJson.lockClientPalette = lockPalette;
        projJson.sonicIdentity = isEducation
          ? {
              seedId: EDUCATION_NULL_SONIC_PRESET.seedId,
              uiSfxMode: 'off',
              material: 'paper-editorial',
              backgroundMusic: 'off',
              introVideoMode: 'off'
            }
          : {
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
  };

  const persistTaskGraphBeadIfInRepo = () => {
    if (!inRepoProjects) return;
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
      uiSfxMode: isEducation ? 'off' : b6.uiSfxMode,
      agentsAssigned: isEducation
        ? [
            'product-strategist',
            'design-system-architect',
            'layout-primitives-architect',
            'security-auditor',
            'qa-visual-critic'
          ]
        : [
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
  };

  const projCfgPath = path.join(projectDir, 'factory.project.json');
  const projCfg = fs.existsSync(projCfgPath) ? JSON.parse(fs.readFileSync(projCfgPath, 'utf8')) : null;
  const isCuratedEducationProfile =
    isEducation || projCfg?.complianceProfile === 'education' || b1.industryArchetype === 'education';
  const existingSpecPath = path.join(projectDir, 'SPEC.md');
  const existingProductPath = path.join(projectDir, 'PRODUCT.md');
  const existingDesignPath = path.join(projectDir, 'DESIGN.md');

  //Read-mode contract handling for `education` (never inject 3D/Sonic filler or SaaS lead forms)
  if (isCuratedEducationProfile) {
    if (
      fs.existsSync(existingSpecPath) &&
      fs.existsSync(existingProductPath) &&
      fs.existsSync(existingDesignPath)
    ) {
      const stampedSpec = fs
        .readFileSync(existingSpecPath, 'utf8')
        .replace(/DRAFT_PENDING_CTO_GATE2|PENDING_CTO_SPEC_INPUT|PENDING_CTO_PRD_INPUT/g, interview.specInterviewStatus);
      fs.writeFileSync(existingSpecPath, stampedSpec, 'utf8');

      const stampedDesign = fs
        .readFileSync(existingDesignPath, 'utf8')
        .replace(/DRAFT_PENDING_CTO_GATE2|PENDING_CTO_SPEC_INPUT|PENDING_CTO_PRD_INPUT/g, interview.specInterviewStatus);
      fs.writeFileSync(existingDesignPath, stampedDesign, 'utf8');
    } else {
      generateProductAndDesignMd(projectDir, 'education', {
        name: brandLock?.brandName || b1.brandName
      });
      const prdLeanPath = path.join(projectDir, 'PRD_LEAN.md');
      if (fs.existsSync(prdLeanPath)) {
        fs.copyFileSync(prdLeanPath, existingProductPath);
      }
      const educationSpecContent = `# SPEC.md — Especificación Técnica Editorial en Modo \`Read\` (\`${slug}\`)

> **Estado Compuerta #1 (\`PRD_LEAN.md\`):** \`COMPLETED_BY_CTO\` | **Estado Compuerta #2 (\`SPEC.md\`):** \`${interview.specInterviewStatus}\`  
> **Modo de Identidad de Marca:** \`${brandMode}\` (\`lockClientPalette: ${lockPalette}\`) | **Arquetipo:** \`education\` | **Modo de Superficie:** \`Read\`  
> **Arquitectura:** \`100% Static MPA (Cloudflare Workers Static Assets, 0 Worker Endpoints)\`

---

## 1. Trazabilidad 1:1 desde \`PRD_LEAN.md\` (\`[INV-01..07]\`) hacia Requisitos Técnicos (\`[REQ-01]\` a \`[REQ-12]\`)

- **[REQ-01] (Trazable a \`[INV-01]\`) Identidad Editorial y Claridad en Modo \`Read\`:** Renderizar la propuesta pedagógica de \`${brandLock?.brandName || b1.brandName}\` (*"${b1.valuePropositionOneLiner}"*) sin distracciones visuales ni shaders 3D.
- **[REQ-02] (Trazable a \`[INV-05]\`) Acción Primaria Pedagógica (\`Primary CTA\`):** Implementar **\`${b2.primaryCta}\`** vía \`${b2.primaryCtaChannel}\` con área táctil Fitts \`>= 48x48px\` y cero formularios de captura comercial.
- **[REQ-03] (Trazable a \`[INV-02]\`) Arquitectura MPA de Lectura Profunda (\`60ch-70ch\`):** Proveer navegación semántica para \`${b3.pages.join(', ')}\` con columna de lectura \`max-width: 65ch\` y jerarquía \`h1 -> h2 -> h3\`.
- **[REQ-04] (Trazable a \`[INV-03]\`) Contrato \`BRAND_IDENTITY_LOCK.json\`, Escala \`OKLCH 90/8/2\` y \`APCA\`:** Respetar proporción \`OKLCH 90/8/2\`, los 3 acentos semánticos de nivel y contraste \`${b9.accessibilityFloor}\`.
- **[REQ-05] (Trazable a \`[INV-04]\`) Escala Fluida \`Utopia clamp()\`, \`tabular-nums\` y Legibilidad:** Aplicar \`clamp()\`, \`font-variant-numeric: tabular-nums\` e integración con \`readability_es\`.
- **[REQ-06] (Trazable a \`[INV-04]\`) Transiciones Discretas y Accesibilidad Motora:** Soportar \`@view-transition { navigation: auto; }\` y respetar \`prefers-reduced-motion: reduce\` con \`0\` audio/video autoplay.
- **[REQ-07] Silencio Editorial y Triangulación de Video sin Cookies:** Mantener \`uses3dOrShaderInHero: false\`, \`exportReaperRppSession: false\` y fachada \`youtube-nocookie.com\` bajo clic explícito con aviso de almacenamiento local.
- **[REQ-08] (Trazable a \`[INV-06]\`) Curaduría Clean-Room y OpenGraph:** Integrar activos verificados (${b7.clientProvidedAssets.join(', ')}) y preservar \`dist/og-image.svg\`.
- **[REQ-09] (Trazable a \`[INV-05]\`) Persistencia Local-First sin Backend:** Operar con \`${b8.databaseEngine}\`, \`0\` endpoints \`/api/leads\` o \`/api/webhooks/payments\`, sin \`LeadCaptureFormSchema\` ni Ory/Passkeys.
- **[REQ-10] SEO Técnico, \`Pagefind\` y Visibilidad IA (\`llms.txt\` / \`llms-full.txt\`):** Emitir \`llms.txt\`, \`llms-full.txt\`, \`robots.txt\`, \`sitemap.xml\` y \`Schema.org JSON-LD @graph\`.
- **[REQ-11] Blindaje \`CSP\` con Hashes SHA-256, \`Trusted Types\` y \`MessageChannel\` 1:1:** Compilar \`public/_headers\` desde \`src/lib/csp-builder.mjs\`, bloquear \`default.createHTML\` con \`TypeError\` y aislar el tutor en \`sandbox="allow-scripts"\` mediante \`MessageChannel\` validado con \`Valibot\`.
- **[REQ-12] (Trazable a \`[INV-07]\`) Frontera \`Explicit Non-Goals\`, PWA MPA \`< 250 KB\` y Costo \`$0\`:** Mantener gasto servidor \`$0 USD\`, precache PWA \`< 250 KB\` (\`navigateFallback: null\`) y cumplir: ${b10.successMetricsDod.join(' | ')}.
`;
      fs.writeFileSync(existingSpecPath, educationSpecContent, 'utf8');
    }

    updateProjectManifest();
    persistTaskGraphBeadIfInRepo();

    return {
      passed: interview.specInterviewStatus === 'COMPLETED_BY_CTO',
      projectSlug: slug,
      prdInterviewStatus: 'COMPLETED_BY_CTO',
      specInterviewStatus: interview.specInterviewStatus,
      interviewStatus: interview.status,
      brandIdentityMode: brandMode,
      lockClientPalette: lockPalette,
      specPath: existingSpecPath,
      productPath: existingProductPath,
      designPath: existingDesignPath,
      bespokeDna,
      sonicPatch
    };
  }

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

  // 4. Update factory.project.json if present & 5. Append/update decomposed tasks in `.agents/beads/task_graph.jsonl`
  updateProjectManifest();
  persistTaskGraphBeadIfInRepo();

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

  // (d) Edit ENTREVISTA_2_SPEC_TECNICO.md on disk (bidirectional MD -> JSON test) and approve Gate #2
  const specMdFile = path.join(testDir, 'ENTREVISTA_2_SPEC_TECNICO.md');
  let specMdRaw = fs.readFileSync(specMdFile, 'utf8');
  specMdRaw = specMdRaw.replace(
    /- \*\*Primary CTA Conectado:\*\* .*/,
    '- **Primary CTA Conectado:** `Reservar Visita Privada en Ginebra` (Private Concierge)'
  );
  fs.writeFileSync(specMdFile, specMdRaw, 'utf8');

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
    specText.includes('Reservar Visita Privada en Ginebra') &&
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
      scenarioD_gate2ApprovalAndBidirectionalMdSyncCompilesSpecAndUnlocksConstruir:
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
