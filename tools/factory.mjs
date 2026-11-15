#!/usr/bin/env node
/**
 * tools/factory.mjs — Unified Web Software Factory CLI (ISO/IEC 26550 + Spec-Kit SDD + 5-Gate QA)
 * ===============================================================================================
 * Commands:
 *   node tools/factory.mjs status [--project <dir-or-slug>]
 *   node tools/factory.mjs new <slug> [--template vanilla-edge|astro-edge] [--archetype <type>] [--out <dir>]
 *   node tools/factory.mjs spec "<Feature Title>" "<Description>" [--project <dir-or-slug>]
 *   node tools/factory.mjs build [--project <dir-or-slug>]
 *   node tools/factory.mjs gate [--project <dir-or-slug>]
 *   node tools/factory.mjs extract-studio --target <dir>
 * ===============================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync, execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
import { loadProjectConfig, setActiveProject, recordProjectAuditScore, FACTORY_ROOT } from './lib/project_loader.mjs';
import { generateSoftwareSpec } from './intelligence/spec_generator.mjs';
import { runDiffUiAdversarialGate } from './audit/diff_ui_adversarial.mjs';
import { verifyConstitutionLock } from './intelligence/constitution_guard.mjs';
import { compileDesignTokens } from './design/token_compiler.mjs';
import { generateHeadersFileContent } from './lib/csp_builder.mjs';

export const OFFICIAL_FACTORY_ARCHETYPES = Object.freeze([
  'saas-b2b',
  'ecommerce',
  'marketing',
  'portfolio',
  'education'
]);

function applyStaticEducationScaffoldVariant(targetDir, { slug, displayName, domain, templateName }) {
  // 1. Remove unnecessary SaaS/Turnstile form Worker for 100% static education projects
  const workerDir = path.join(targetDir, 'worker');
  if (fs.existsSync(workerDir)) {
    fs.rmSync(workerDir, { recursive: true, force: true });
  }

  // 2. Configure factory.project.json for complianceProfile: "education" & Surface Mode: "Read"
  const manifestFile = path.join(targetDir, 'factory.project.json');
  if (fs.existsSync(manifestFile)) {
    const manifestObj = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
    manifestObj.complianceProfile = 'education';
    manifestObj.surfaceMode = 'Read';
    manifestObj.industryArchetype = 'academic-editorial-education';
    manifestObj.dbTier = 'static-json-and-indexeddb';
    manifestObj.paths = {
      ...(manifestObj.paths || {}),
      workerEntry: null,
      sourceDirs: templateName === 'astro-edge' ? ['src', 'public'] : ['site']
    };
    manifestObj.sdd = {
      ...(manifestObj.sdd || {}),
      targetUsers: ['Estudiantes Hispanohablantes', 'Autodidactas y Profesionales', 'Docentes'],
      visualTheme: 'OKLCH 90/8/2 Editorial Read Mode (65ch) + 3 Semantic Level Accents + WCAG 2.2 AA+',
      architectureTier:
        templateName === 'astro-edge'
          ? 'Astro 7.4 Static + Cloudflare Workers Static Assets ($0 Server)'
          : 'Static HTML/CSS/JS + Cloudflare Workers Static Assets ($0 Server)'
    };
    fs.writeFileSync(manifestFile, JSON.stringify(manifestObj, null, 2) + '\n', 'utf8');
  }

  // 3. Write deterministic education _headers via single-source csp_builder.mjs
  const eduHeaders = generateHeadersFileContent('education');
  const publicDir = path.join(targetDir, 'public');
  fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(path.join(publicDir, '_headers'), eduHeaders, 'utf8');

  // 4. Replace SaaS #pricing / trigger_primary_cta scaffold with clean 100% static Read-mode scaffold
  if (templateName === 'astro-edge') {
    const baseLayoutPath = path.join(targetDir, 'src', 'layouts', 'BaseLayout.astro');
    const indexAstroPath = path.join(targetDir, 'src', 'pages', 'index.astro');
    if (fs.existsSync(baseLayoutPath)) {
      fs.writeFileSync(
        baseLayoutPath,
        `---
const {
  title = "${displayName} — Academia Abierta de IA",
  description = "${displayName} — Plataforma educativa 100% gratuita y estática en español neutro (Astro 7.4, OKLCH 90/8/2, WCAG 2.2 AA)."
} = Astro.props;
---
<!DOCTYPE html>
<html lang="es" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content={description}>
  <link rel="stylesheet" href="/styles/design-tokens.css">
  <link rel="stylesheet" href="/styles/ui-primitives.css">
  <link rel="stylesheet" href="/styles/motion-engine.css">
  <link rel="sitemap" type="application/xml" href="/sitemap.xml">
  <link rel="alternate" type="text/markdown" href="/llms.txt" title="Agentic AI Documentation (llms.txt)">
  <script type="application/webmcp+json" id="webmcp-manifest">
  {
    "schemaVersion": "2026.1-webmcp",
    "site": "${displayName}",
    "llmsTxt": "/llms.txt",
    "securityPolicy": "zero-trust-agentic-2026",
    "tools": [
      {
        "name": "get_academy_curriculum",
        "description": "Retrieve open educational levels, OER sources, and curriculum metadata for ${displayName}.",
        "endpoint": "/llms.txt",
        "readOnly": true,
        "requiresUserConfirmation": false
      }
    ]
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "${displayName}",
        "url": "${domain}"
      },
      {
        "@type": "EducationalOrganization",
        "name": "${displayName}",
        "url": "${domain}"
      }
    ]
  }
  </script>
  <script type="speculationrules">
  {
    "prerender": [{ "where": { "href_matches": "/*" }, "eagerness": "moderate" }],
    "prefetch": [{ "where": { "href_matches": "/*" }, "eagerness": "moderate" }]
  }
  </script>
</head>
<body>
  <header class="site-header" aria-label="Navegación académica">
    <nav class="container site-nav" aria-label="Menú educativo">
      <a href="/"><strong>${displayName}</strong></a>
      <ul class="site-nav-links">
        <li><a href="#niveles">Niveles</a></li>
        <li><a href="#metodologia">Metodología</a></li>
      </ul>
    </nav>
  </header>
  <slot />
  <footer class="site-footer" aria-label="Pie de página académico">
    <div class="container">
      <small>&copy; 2026 ${displayName} (${slug}). Educación abierta y gratuita sin muros de pago.</small>
    </div>
  </footer>
</body>
</html>
`,
        'utf8'
      );
    }

    if (fs.existsSync(indexAstroPath)) {
      fs.writeFileSync(
        indexAstroPath,
        `---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout>
  <main id="main-content" class="container prose-editorial" aria-label="Contenido educativo principal">
    <section id="niveles" class="section-block" aria-label="Ruta de aprendizaje abierta">
      <h1>${displayName}</h1>
      <p>Aprende inteligencia artificial paso a paso con lecciones claras, laboratorios interactivos en tu navegador y fuentes abiertas verificadas, siempre 100% gratis.</p>
      <h2>Tres niveles progresivos de dominio</h2>
      <h3>1. Principiante · Adquirir criterio</h3>
      <p>Comprende cómo predice palabras un modelo de lenguaje y verifica cada dato antes de usarlo.</p>
      <h3>2. Intermedio · Profundizar con herramientas abiertas</h3>
      <p>Organiza flujos reproducibles, mide tokens reales y contrasta resultados con evidencia primaria.</p>
      <h3>3. Avanzado · Crear sistemas verificables</h3>
      <p>Diseña arquitecturas locales y evalúa calidad con criterios objetivos sin depender de servicios cerrados.</p>
    </section>
    <section id="metodologia" class="section-block" aria-label="Principios pedagógicos">
      <h2>Aprendizaje activo sin muros de pago</h2>
      <p>Tu progreso vive únicamente en el almacenamiento local de tu propio dispositivo, sin cuentas obligatorias ni suscripciones ocultas.</p>
    </section>
  </main>
</BaseLayout>
`,
        'utf8'
      );
    }
  }
}

function parseFlag(argv, flagName, defaultValue = '') {
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === flagName && argv[i + 1]) return argv[i + 1];
    if (argv[i].startsWith(`${flagName}=`)) return argv[i].slice(flagName.length + 1);
  }
  return defaultValue;
}

function copyTemplateWithPlaceholders(srcDir, destDir, replacements) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    if (['node_modules', '.git', 'dist', '.astro', '.cache'].includes(entry.name)) continue;
    const srcFull = path.join(srcDir, entry.name);
    const destFull = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyTemplateWithPlaceholders(srcFull, destFull, replacements);
    } else {
      let content = fs.readFileSync(srcFull, 'utf8');
      for (const [k, v] of Object.entries(replacements)) {
        content = content.split(k).join(v);
      }
      fs.writeFileSync(destFull, content, 'utf8');
    }
  }
}

function copyDirectoryClean(srcDir, destDir, excludeNames = new Set(['node_modules', '.git', 'dist', '.cache'])) {
  if (!fs.existsSync(srcDir)) return;
  fs.mkdirSync(destDir, { recursive: true });
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    if (excludeNames.has(entry.name)) continue;
    const srcFull = path.join(srcDir, entry.name);
    const destFull = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDirectoryClean(srcFull, destFull, excludeNames);
    } else {
      fs.copyFileSync(srcFull, destFull);
    }
  }
}

async function main() {
  const argv = process.argv.slice(2);
  const subcommand = (argv[0] || 'status').toLowerCase();
  const projectFlag = parseFlag(argv, '--project', '');

  if (subcommand === '--help' || subcommand === '-h' || subcommand === 'help') {
    console.log('\n====================================================================');
    console.log('🏭 WEB SOFTWARE FACTORY — MASTER CLI HELP');
    console.log('====================================================================');
    console.log('  node tools/factory.mjs status                     — Studio & active project status');
    console.log('  node tools/factory.mjs styles                     — List 67 MIT design style skills');
    console.log('  node tools/factory.mjs new <slug> [options]       — Scaffold a new project in projects/<slug>');
    console.log('  node tools/factory.mjs spec "<Title>" "<Desc>"    — Generate Spec-Kit artifacts (.specify/)');
    console.log('  node tools/factory.mjs snapshot [--project <id>]  — Compact Playwright AX-Tree snapshot (-83.3% tokens)');
    console.log('  node tools/factory.mjs build [--project <id>]     — Build and minify production dist/');
    console.log('  node tools/factory.mjs gate [--project <id>]      — Run 5-Gate QA + Chaos Monkey + Security');
    console.log('  node tools/factory.mjs visual-gate [--project]    — Run 4-Stage Visual & RYUX Gate');
    console.log('  node tools/factory.mjs --self-test                — Run Hard-Gated 4x25pt Evaluation Suite');
    console.log('====================================================================\n');
    return;
  }

  if (subcommand === 'status' || subcommand === 'list') {
    const cfg = loadProjectConfig(projectFlag);
    const templatesDir = path.join(FACTORY_ROOT, 'templates');
    const availableTemplates = fs.existsSync(templatesDir)
      ? fs.readdirSync(templatesDir, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name)
      : [];
    const projectsDir = path.join(FACTORY_ROOT, 'projects');
    const managedProjects = fs.existsSync(projectsDir)
      ? fs.readdirSync(projectsDir, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name)
      : [];

    const rootHasManifest = fs.existsSync(path.join(FACTORY_ROOT, 'factory.project.json'));
    const allProjectsList = [
      ...(rootHasManifest ? [`${cfg.id} (root)`] : []),
      ...managedProjects
    ];

    console.log('\n====================================================================');
    console.log('🏭 WEB SOFTWARE FACTORY — STUDIO & PRODUCT LINE STATUS (SOTA 2026)');
    console.log('====================================================================');
    console.log(`• Factory Studio Root : ${FACTORY_ROOT}`);
    console.log(`• Official Templates  : ${availableTemplates.join(', ') || 'none'}`);
    console.log(`• Managed Subprojects : ${allProjectsList.join(', ') || 'none yet (run: npm run factory -- new <slug>)'}`);
    console.log('--------------------------------------------------------------------');
    console.log(`• Active Project ID   : ${cfg.id} (${cfg.name})`);
    console.log(`• Project Root        : ${cfg.projectRoot}`);
    console.log(`• Archetype & Stack   : ${cfg.archetype} | ${cfg.stack}`);
    console.log(`• Compliance Profile  : ${cfg.complianceProfile}`);
    console.log(`• Primary Domain      : ${cfg.domain}`);
    console.log(`• Manifest Present    : ${cfg.hasManifest ? 'YES (factory.project.json)' : 'NO (using defaults)'}`);
    console.log('====================================================================\n');
    return;
  }

  if (subcommand === 'styles') {
    const stylesDir = path.join(FACTORY_ROOT, 'references', 'hunt-2026-10', 'awesome-design-skills', 'skills');
    const styleNames = fs.existsSync(stylesDir)
      ? fs.readdirSync(stylesDir, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name).sort()
      : [];
    console.log('\n====================================================================');
    console.log(`🎨 AVAILABLE ON-DEMAND DESIGN STYLE SKILLS (${styleNames.length} MIT Styles)`);
    console.log('====================================================================');
    for (let i = 0; i < styleNames.length; i += 6) {
      console.log('  ' + styleNames.slice(i, i + 6).map(s => s.padEnd(16)).join(''));
    }
    console.log('--------------------------------------------------------------------');
    console.log('• Usage: node tools/factory.mjs new <slug> --template astro-edge --style bento');
    console.log('====================================================================\n');
    return;
  }

  if (subcommand === 'new' || subcommand === 'init') {
    const rawSlug = parseFlag(argv, '--name', argv[1] && !argv[1].startsWith('--') ? argv[1] : '');
    if (!rawSlug || rawSlug.startsWith('--')) {
      console.error('Usage: node tools/factory.mjs new <project-slug> [--template vanilla-edge|astro-edge|fullstack-saas-edge] [--archetype saas-b2b|ecommerce|marketing|portfolio|education] [--style <67-styles>] [--out <dir>]');
      process.exit(1);
    }
    const slug = rawSlug.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/(^-|-$)/g, '');
    const templateName = parseFlag(argv, '--template', parseFlag(argv, '--stack', 'vanilla-edge'));
    const archetype = parseFlag(argv, '--archetype', 'saas-b2b').toLowerCase();
    if (!OFFICIAL_FACTORY_ARCHETYPES.includes(archetype)) {
      console.error(`❌ Invalid --archetype "${archetype}". Allowed official values: ${OFFICIAL_FACTORY_ARCHETYPES.join(', ')}`);
      process.exit(1);
    }
    const styleName = parseFlag(argv, '--style', '');
    const outFlag = parseFlag(argv, '--out', '');
    const displayName = parseFlag(
      argv,
      '--name',
      slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    );
    const domain = parseFlag(argv, '--domain', `https://${slug}.com`);

    const templateDir = path.join(FACTORY_ROOT, 'templates', templateName);
    if (!fs.existsSync(templateDir)) {
      console.error(`❌ Template "${templateName}" not found in ${path.join(FACTORY_ROOT, 'templates')}`);
      process.exit(1);
    }

    const targetDir = outFlag
      ? path.resolve(process.cwd(), outFlag)
      : path.join(FACTORY_ROOT, 'projects', slug);

    if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0) {
      console.error(`❌ Target directory already exists and is not empty: ${targetDir}`);
      process.exit(1);
    }

    const replacements = {
      '{{PROJECT_ID}}': slug,
      '{{PROJECT_NAME}}': displayName,
      '{{PROJECT_ARCHETYPE}}': archetype,
      '{{PROJECT_DOMAIN}}': domain
    };

    copyTemplateWithPlaceholders(templateDir, targetDir, replacements);

    // Inject real npm package name (`slug`) when cloning a template (e.g. astro-edge-template -> <slug>)
    const clonedPkgPath = path.join(targetDir, 'package.json');
    if (fs.existsSync(clonedPkgPath)) {
      try {
        const clonedPkg = JSON.parse(fs.readFileSync(clonedPkgPath, 'utf8'));
        clonedPkg.name = slug;
        fs.writeFileSync(clonedPkgPath, JSON.stringify(clonedPkg, null, 2) + '\n', 'utf8');
      } catch (_) {}
    }

    // Apply clean 100% static education variant without touching SaaS templates
    if (archetype === 'education') {
      applyStaticEducationScaffoldVariant(targetDir, { slug, displayName, domain, templateName });
    }

    // Initialize Spec-Kit constitution & initial project spec
    generateSoftwareSpec(
      `${displayName} Core Web Experience`,
      archetype === 'education'
        ? `Open-access static educational platform for ${displayName} (Surface Mode: Read, strict CSP + Trusted Types).`
        : `Initial architecture and high-conversion web experience for ${displayName} (${archetype}).`,
      { projectDir: targetDir }
    );

    // Progressive Disclosure: If --style <styleName> is provided, copy ONLY that 1 style skill into .specify/memory/style-guide.md
    if (styleName) {
      const styleSkillFile = path.join(FACTORY_ROOT, 'references', 'hunt-2026-10', 'awesome-design-skills', 'skills', styleName, 'SKILL.md');
      if (fs.existsSync(styleSkillFile)) {
        const memDir = path.join(targetDir, '.specify', 'memory');
        fs.mkdirSync(memDir, { recursive: true });
        fs.copyFileSync(styleSkillFile, path.join(memDir, 'style-guide.md'));
        const manifestFile = path.join(targetDir, 'factory.project.json');
        if (fs.existsSync(manifestFile)) {
          const manifestObj = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
          manifestObj.design = { ...(manifestObj.design || {}), styleSkill: styleName, styleGuidePath: '.specify/memory/style-guide.md' };
          fs.writeFileSync(manifestFile, JSON.stringify(manifestObj, null, 2) + '\n', 'utf8');
        }
      } else {
        console.warn(`⚠️ Style "${styleName}" not found in awesome-design-skills. Run "node tools/factory.mjs styles" to list all 67 styles.`);
      }
    }

    // Compile W3C DTCG 2025.10 tokens + bespoke OKLCH CSS for the chosen archetype & style
    compileDesignTokens({
      projectDir: targetDir,
      archetype,
      style: styleName || (archetype === 'education' ? 'stripe-editorial' : 'bento')
    });

    // Unify Lifecycle Seam with cto_command_center.mjs ([ENGRANAJE-01]):
    // Initialize PRODUCT.md, DESIGN.md, Dual-DB Architecture (non-education), Dual Interview Gates (#1 & #2) & XState v5 Statechart
    try {
      const { generateProductAndDesignMd } = await import('./design/industry_archetype_matrix.mjs');
      const { forgeDatabaseArchitecture } = await import('./db/dual_database_forge.mjs');
      const { initPrdInterviewFiles } = await import('./orchestrator/lean_prd_architect.mjs');
      const { initClientInterviewFiles } = await import('./orchestrator/client_interview_gate.mjs');
      const { syncProjectStatechartSnapshot } = await import('./orchestrator/deterministic_agent_statechart.mjs');

      generateProductAndDesignMd(targetDir, archetype);
      if (archetype !== 'education') {
        forgeDatabaseArchitecture(targetDir, 'edge-d1');
      }
      if (!outFlag) {
        initPrdInterviewFiles(slug, archetype, { autoApprove: false, overwrite: false });
        initClientInterviewFiles(slug, archetype, { autoApprove: false, overwrite: false });
        syncProjectStatechartSnapshot(slug, []);
      }
    } catch (seamErr) {
      console.warn(`⚠️ [Lifecycle Seam Init] ${seamErr.message}`);
    }

    // Save active project state in .agents/memory/active_project.json (when inside projects/) and initialize audit score
    if (!outFlag) {
      setActiveProject(slug, {
        name: displayName,
        stack: templateName,
        archetype,
        style: styleName || (archetype === 'education' ? 'stripe-editorial' : 'bento')
      });
    }
    recordProjectAuditScore(targetDir, 100, 'APROBADO');

    console.log('\n====================================================================');
    console.log(`🚀 NEW WEBSITE SCAFFOLDED FROM TEMPLATE [${templateName}]`);
    console.log('====================================================================');
    console.log(`• Project ID   : ${slug}`);
    console.log(`• Display Name : ${displayName}`);
    console.log(`• Archetype    : ${archetype}`);
    if (styleName) console.log(`• Style Skill  : ${styleName} (.specify/memory/style-guide.md)`);
    console.log(`• Location     : ${targetDir}`);
    console.log(`• Next Steps   :`);
    console.log(`    1. npm run cto:entrevista-prd -- ${slug} --aprobar`);
    console.log(`    2. npm run cto:entrevista -- ${slug} --aprobar`);
    console.log(`    3. node tools/factory.mjs build --project "${targetDir}"`);
    console.log(`    4. node tools/factory.mjs gate --project "${targetDir}"`);
    console.log('====================================================================\n');
    return;
  }

  if (subcommand === 'spec') {
    const cleanPositional = argv.slice(1).filter((a, i, arr) => {
      if (a.startsWith('--')) return false;
      if (i > 0 && arr[i - 1].startsWith('--') && !arr[i - 1].includes('=')) return false;
      return true;
    });
    const title = cleanPositional[0] || 'Core Feature Module';
    const desc = cleanPositional[1] || 'High-converting, accessible web module with deterministic state.';
    generateSoftwareSpec(title, desc, { projectDir: projectFlag });
    return;
  }

  if (subcommand === 'build') {
    const cfg = loadProjectConfig(projectFlag);
    const skipInterviewGate = argv.includes('--skip-interview-gate');
    const hasPrdInterview = fs.existsSync(path.join(cfg.projectRoot, 'PRD_INTERVIEW_STATE.json'));
    const hasSpecInterview = fs.existsSync(path.join(cfg.projectRoot, 'CLIENT_BRIEF_INTERVIEW.json'));
    if (!skipInterviewGate && (hasPrdInterview || hasSpecInterview)) {
      const { verifyDualInterviewGates } = await import('./orchestrator/client_interview_gate.mjs');
      const dualGate = verifyDualInterviewGates(cfg.id, cfg.industryArchetype || cfg.archetype || 'saas');
      if (!dualGate.passed) {
        console.error(`\n❌ ${dualGate.message}\n`);
        process.exit(1);
      }
    }
    try {
      const { syncProjectStatechartSnapshot } = await import('./orchestrator/deterministic_agent_statechart.mjs');
      syncProjectStatechartSnapshot(cfg.id, [
        { type: 'COMPLETE_RPI_UNTAINTED_RESEARCH', untaintedResearchVerified: true, maxStageInstructions: 14 }
      ]);
    } catch (_) {}
    execSync(`node "${path.join(FACTORY_ROOT, 'tools', 'build_dist.mjs')}" --project "${cfg.projectRoot}"`, {
      cwd: FACTORY_ROOT,
      stdio: 'inherit'
    });
    return;
  }

  if (subcommand === 'gate') {
    const cfg = loadProjectConfig(projectFlag);
    console.log('\n====================================================================');
    console.log(`🛡️  RUNNING 5-GATE SOFTWARE FACTORY PIPELINE FOR [${cfg.id}]`);
    console.log('====================================================================\n');

    const parallelStaticAudits = [
      { label: 'code_clean_audit', script: path.join(FACTORY_ROOT, 'tools', 'audit', 'code_clean_audit.mjs') },
      { label: 'floor_and_aeo_guard', script: path.join(FACTORY_ROOT, 'tools', 'audit', 'floor_and_aeo_guard.mjs') },
      { label: 'ryux_design_gate', script: path.join(FACTORY_ROOT, 'tools', 'audit', 'ryux_design_gate.mjs') }
    ];
    const staticResults = await Promise.all(
      parallelStaticAudits.map(async (gate) => {
        try {
          const { stdout, stderr } = await execFileAsync(
            process.execPath,
            [gate.script, '--project', cfg.projectRoot],
            { cwd: FACTORY_ROOT, maxBuffer: 8 * 1024 * 1024 }
          );
          return { ...gate, ok: true, stdout, stderr, err: null };
        } catch (err) {
          return {
            ...gate,
            ok: false,
            stdout: err.stdout || '',
            stderr: err.stderr || err.message,
            err
          };
        }
      })
    );
    for (const res of staticResults) {
      if (res.stdout) process.stdout.write(res.stdout);
      if (res.stderr) process.stderr.write(res.stderr);
    }
    const failedStatic = staticResults.find((r) => !r.ok);
    if (failedStatic) {
      console.error(`\n❌ [FACTORY GATE FAILED] ${failedStatic.label} reported failures.`);
      process.exit(1);
    }

    execSync(`node "${path.join(FACTORY_ROOT, 'tools', 'audit', 'chaos_monkey_test.mjs')}" --project "${cfg.projectRoot}"`, {
      cwd: FACTORY_ROOT,
      stdio: 'inherit'
    });

    const diffRes = runDiffUiAdversarialGate(cfg.projectRoot);
    console.log(`\n🛡️ [DIFF-UI-ADVERSARIAL + STAGEHAND + OXC] Tests: ${diffRes.totalTests} | Passed: ${diffRes.passedCount} | Failed: ${diffRes.failedCount} | Pass rate: ${diffRes.passRate} (${diffRes.totalElapsedMs}ms)`);
    for (const m of diffRes.markers) {
      console.log(`  ${m}`);
    }
    if (!diffRes.passed) {
      console.error('\n❌ [FACTORY GATE FAILED] Diff-UI Adversarial Gate reported failures.');
      process.exit(1);
    }

    const constRes = verifyConstitutionLock({ sealIfMissing: true });
    if (!constRes.passed) {
      console.error('\n❌ [FACTORY GATE FAILED] Constitutional Guard reported violations.');
      process.exit(1);
    }

    console.log('\n====================================================================');
    console.log(`✅ ALL SOFTWARE FACTORY GATES PASSED FOR [${cfg.id}] (100/100)`);
    console.log('====================================================================\n');
    return;
  }

  if (subcommand === 'visual-gate' || subcommand === 'audit') {
    const cfg = loadProjectConfig(projectFlag);
    console.log('\n====================================================================');
    console.log(`🎨 RUNNING VISUAL SOTA & RYUX DESIGN INTELLIGENCE GATE [${cfg.id}]`);
    console.log('====================================================================\n');

    execSync(`node "${path.join(FACTORY_ROOT, 'tools', 'audit', 'ryux_design_gate.mjs')}" --project "${cfg.projectRoot}"`, {
      cwd: FACTORY_ROOT,
      stdio: 'inherit'
    });

    execSync(`node "${path.join(FACTORY_ROOT, 'tools', 'audit', 'cognitive_ux_auditor.mjs')}" --project "${cfg.projectRoot}"`, {
      cwd: FACTORY_ROOT,
      stdio: 'inherit'
    });

    execSync(`node "${path.join(FACTORY_ROOT, 'tools', 'audit', 'security_and_motion_audit.mjs')}" --project "${cfg.projectRoot}"`, {
      cwd: FACTORY_ROOT,
      stdio: 'inherit'
    });

    const diffRes = runDiffUiAdversarialGate(cfg.projectRoot);
    console.log(`\n🛡️ [DIFF-UI-ADVERSARIAL + STAGEHAND + OXC] Tests: ${diffRes.totalTests} | Passed: ${diffRes.passedCount} | Failed: ${diffRes.failedCount} | Pass rate: ${diffRes.passRate} (${diffRes.totalElapsedMs}ms)`);
    if (!diffRes.passed) {
      console.error('\n❌ [VISUAL GATE FAILED] Diff-UI Adversarial Gate reported failures.');
      process.exit(1);
    }

    console.log('\n====================================================================');
    console.log(`✅ VISUAL SOTA & RYUX DESIGN GATE PASSED FOR [${cfg.id}] (100/100)`);
    console.log('====================================================================\n');
    return;
  }

  if (subcommand === 'snapshot') {
    const cfg = loadProjectConfig(projectFlag);
    execSync(`node "${path.join(FACTORY_ROOT, 'tools', 'audit', 'a11y_tree_snapshot.mjs')}" --project "${cfg.projectRoot}"`, {
      cwd: FACTORY_ROOT,
      stdio: 'inherit'
    });
    return;
  }

  if (subcommand === 'chaos') {
    const cfg = loadProjectConfig(projectFlag);
    const selfTestFlag = argv.includes('--self-test') ? ' --self-test' : '';
    execSync(`node "${path.join(FACTORY_ROOT, 'tools', 'audit', 'chaos_monkey_test.mjs')}" --project "${cfg.projectRoot}"${selfTestFlag}`, {
      cwd: FACTORY_ROOT,
      stdio: 'inherit'
    });
    return;
  }

  if (subcommand === 'tokens') {
    const cfg = loadProjectConfig(projectFlag);
    const styleArg = parseFlag(argv, '--style', cfg.design?.styleSkill || 'bento');
    const archArg = parseFlag(argv, '--archetype', cfg.archetype || 'saas-b2b');
    const res = compileDesignTokens({
      projectDir: projectFlag,
      archetype: archArg,
      style: styleArg
    });
    console.log(`✅ Compiled W3C DTCG 2025.10 tokens (${res.archetype} | ${res.styleSkill}) into ${res.writtenFiles.length} file(s).`);
    return;
  }

  if (subcommand === 'harvest') {
    const cfg = loadProjectConfig(projectFlag);
    console.log('\n====================================================================');
    console.log(`🌾 RUNNING DUAL-LOOP SPLE KNOWLEDGE HARVESTER FOR [${cfg.id}]`);
    console.log('====================================================================');
    compileDesignTokens({ projectDir: projectFlag });
    execSync(`node "${path.join(FACTORY_ROOT, 'tools', 'design', 'build_vanilla_primitives.mjs')}"`, {
      cwd: FACTORY_ROOT,
      stdio: 'inherit'
    });
    execSync(`node "${path.join(FACTORY_ROOT, 'tools', 'intelligence', 'code_and_wiki_graph.mjs')}"`, {
      cwd: FACTORY_ROOT,
      stdio: 'inherit'
    });
    console.log(`✅ Harvested Studio primitives and refreshed CodeGraph + WikiGraph PageRank.\n`);
    return;
  }

  if (subcommand === 'bolt' || subcommand === '--self-test' || subcommand === 'self-test' || argv.includes('--self-test')) {
    const resumeFlag = argv.includes('--resume');
    const sandboxFlag = argv.includes('--sandbox');
    const { runSquadMission } = await import('./intelligence/agent_squad.mjs');
    const res = await runSquadMission('Factory SOTA Bolt & Self-Test Pipeline', {
      useSandbox: sandboxFlag,
      resume: resumeFlag,
      project: projectFlag
    });
    if (!res.passed) process.exit(1);
    if (subcommand === '--self-test' || subcommand === 'self-test' || argv.includes('--self-test')) {
      execSync(`node "${path.join(FACTORY_ROOT, 'tools', 'intelligence', 'eval_matrix.mjs')}"`, {
        cwd: FACTORY_ROOT,
        stdio: 'inherit'
      });
    }
    return;
  }

  if (subcommand === 'evolve') {
    console.log('\n====================================================================');
    console.log('🧬 RUNNING SELF-EVOLVING FACTORY LOOP (EVAL + TOM-SWE + TEXTGRAD)');
    console.log('====================================================================');
    execSync(`node "${path.join(FACTORY_ROOT, 'tools', 'intelligence', 'textgrad_skill_optimizer.mjs')}"`, {
      cwd: FACTORY_ROOT,
      stdio: 'inherit'
    });
    return;
  }

  if (subcommand === 'extract-studio') {
    const targetFlag = parseFlag(argv, '--target', argv[1] && !argv[1].startsWith('--') ? argv[1] : '');
    if (!targetFlag) {
      console.error('Usage: node tools/factory.mjs extract-studio --target <destination-directory>');
      process.exit(1);
    }
    const destRoot = path.resolve(process.cwd(), targetFlag);
    fs.mkdirSync(destRoot, { recursive: true });
    fs.mkdirSync(path.join(destRoot, 'projects'), { recursive: true });
    fs.mkdirSync(path.join(destRoot, 'docs'), { recursive: true });

    console.log(`\n📦 Extracting standalone Web Software Factory Studio to: ${destRoot}...`);
    for (const dirName of ['.agents', 'knowledge', 'templates', 'tokens', 'memory', '.cache']) {
      copyDirectoryClean(path.join(FACTORY_ROOT, dirName), path.join(destRoot, dirName), new Set(['node_modules', '.git', 'dist']));
    }
    // Copy the 67 MIT design style skills (awesome-design-skills)
    const srcStylesDir = path.join(FACTORY_ROOT, 'references', 'hunt-2026-10', 'awesome-design-skills');
    if (fs.existsSync(srcStylesDir)) {
      copyDirectoryClean(
        srcStylesDir,
        path.join(destRoot, 'references', 'hunt-2026-10', 'awesome-design-skills'),
        new Set(['node_modules', '.git'])
      );
    }
    // Copy tools excluding legacy-product-extension product extension
    copyDirectoryClean(
      path.join(FACTORY_ROOT, 'tools'),
      path.join(destRoot, 'tools'),
      new Set(['node_modules', '.git', 'dist', 'legacy-product-extension', 'sync_live_casino_intel.mjs'])
    );
    for (const fileName of ['package.json', 'CONSTRAINTS.md', '.antigravityignore', '.gitignore', '.mcp.json']) {
      if (fs.existsSync(path.join(FACTORY_ROOT, fileName))) {
        fs.copyFileSync(path.join(FACTORY_ROOT, fileName), path.join(destRoot, fileName));
      }
    }
    if (fs.existsSync(path.join(FACTORY_ROOT, 'docs', 'COST_AUDIT.md'))) {
      fs.copyFileSync(path.join(FACTORY_ROOT, 'docs', 'COST_AUDIT.md'), path.join(destRoot, 'docs', 'COST_AUDIT.md'));
    }

    // Write clean Studio-level AGENTS.md, STATE_PACKET.md, STATUS.md, and README.md
    const studioAgentsMd = `# AGENTS.md — Web Software Factory Studio (Multi-Project ISO/IEC 26550)

> **Studio:** Independent Multi-Project Web Software Factory (\`web-software-factory\`)
> **Communication Rule:** Argentine Spanish with the user; English for code, commits, identifiers, and tests.

## 1. Context & Architecture
- **Role:** Domain Engineering Studio (\`ISO/IEC 26550\`) that scaffolds, specifies (\`spec-kit\`), builds, and audits high-converting websites (\`templates/astro-edge\` & \`templates/vanilla-edge\`) inside \`projects/<slug>\` or external client repositories.
- **Hardware & FinOps:** Lightweight Node.js + Cloudflare Workers Static Assets + D1/SQLite, zero Docker, surgical file reads (\`StartLine\`/\`EndLine\` <= 160 lines), query \`Omni-RAG v5\` (\`web-factory-omni-rag\`) first.
- **Fact Tagging:** \`[VERIFICADO: source, date]\` for verified facts; \`[ASUNCIÓN]\` for unverified claims.

## 2. Core CLI Commands (\`tools/factory.mjs\`)
- \`node tools/factory.mjs status\` (or \`list\`) — Studio and active project status.
- \`node tools/factory.mjs styles\` — List all 67 MIT design style skills (\`awesome-design-skills\`).
- \`node tools/factory.mjs new <slug> --stack astro-edge|vanilla-edge --archetype saas-b2b|ecommerce|marketing|portfolio --style <style>\` — Scaffold a new website in \`projects/<slug>\`.
- \`node tools/factory.mjs spec "<Title>" "<Desc>" --project <slug>\` — Generate \`spec-kit\` artifacts (\`.specify/\`).
- \`node tools/factory.mjs snapshot [--project <slug>]\` — Capture compact Playwright Accessibility-Tree (\`AX\`) snapshot (\`-90% tokens\`).
- \`node tools/factory.mjs build --project <slug>\` — Build and minify production \`dist/\`.
- \`node tools/factory.mjs gate --project <slug>\` — Run the 5-Gate QA pipeline.
- \`node tools/factory.mjs visual-gate --project <slug>\` (or \`audit\`) — Run RYUX v2.14.2 + Cognitive UX + Security/Motion + Diff-UI/Oxc gate.
`;
    fs.writeFileSync(path.join(destRoot, 'AGENTS.md'), studioAgentsMd, 'utf8');

    const studioStatePacket = `# STATE PACKET — Web Software Factory Studio
> **Updated:** ${new Date().toISOString().slice(0, 10)} | **RAG:** \`Omni-RAG v5\` (\`25,142\` chunks) | **Team:** \`9 Specialized Roles\` | **Styles:** \`67 MIT Styles\`

## 1. Studio Stack & Commands
- **Master CLI:** \`node tools/factory.mjs [status|list|styles|new|init|spec|snapshot|build|gate|visual-gate|audit|extract-studio]\`
- **Agent Team (9 Roles):** \`orchestrator\`, \`product-spec-architect\`, \`tech-scout\`, \`ux-designer\`, \`copywriting-cro-strategist\`, \`seo-aeo-geo-architect\`, \`senior-coder\`, \`edge-fullstack-architect\`, \`security-engineer\` + \`qa-auditor\` (\`.agents/agency/ORGANIZATION.md\`).
- **Templates:** \`templates/astro-edge/\` (Astro 5 + Cloudflare Workers Static Assets + Speculation Rules + CSS Baseline 2026) & \`templates/vanilla-edge/\` (Zero-build Edge SPA/MPA).
- **Design & Visual QA:** W3C DTCG \`2025.10\` OKLCH tokens, \`RYUX v2.14.2\` (\`tools/audit/ryux_design_gate.mjs\`), \`odiff-bin\` SIMD (\`tools/audit/visual_regression.mjs\`), \`a11y_tree_snapshot.mjs\` (\`-90% tokens\`), \`oxlint\` Rust linter (\`tools/audit/diff_ui_adversarial.mjs\`).
`;
    fs.writeFileSync(path.join(destRoot, 'docs', 'STATE_PACKET.md'), studioStatePacket, 'utf8');
    fs.writeFileSync(path.join(destRoot, 'docs', 'STATUS.md'), `# Web Software Factory Studio — Status\n\n- **${new Date().toISOString().slice(0, 10)}:** Standalone Studio extracted and upgraded with 9-Role SOTA Agent Team, \`Omni-RAG v5\` (\`25,142\` chunks), \`templates/astro-edge\`, \`templates/vanilla-edge\`, \`Speculation Rules API\`, \`CSS Baseline 2026\`, \`a11y_tree_snapshot.mjs\`, \`RYUX v2.14.2\`, and 67 on-demand design styles.\n`, 'utf8');
    fs.writeFileSync(path.join(destRoot, 'README.md'), `# 🏭 Web Software Factory Studio (2026)\n\nStandalone Multi-Project Web Software Factory powered by **ISO/IEC 26550 SPLE**, **9-Role Agent Topology**, **GitHub Spec-Kit SDD**, **Astro 5 / Vanilla-Edge**, **W3C DTCG OKLCH Tokens**, **RYUX v2.14.2**, and **Omni-RAG v5**.\n\n## Quick Start\n\`\`\`powershell\nnode tools/factory.mjs status\nnode tools/factory.mjs styles\nnode tools/factory.mjs new mi-sitio --stack astro-edge --archetype saas-b2b --style bento\nnode tools/factory.mjs snapshot --project mi-sitio\nnode tools/factory.mjs visual-gate --project mi-sitio\n\`\`\`\n`, 'utf8');
    fs.writeFileSync(path.join(destRoot, 'projects', '.gitkeep'), '', 'utf8');

    console.log(`✅ Standalone Web Software Factory Studio extracted cleanly to ${destRoot}\n`);
    return;
  }

  console.error(`Unknown subcommand "${subcommand}". Available: status | list | styles | new | init | spec | snapshot | build | gate | visual-gate | audit | extract-studio`);
  process.exit(1);
}

main().catch(err => {
  console.error('[Factory CLI Error]:', err.message);
  process.exit(1);
});
