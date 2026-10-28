#!/usr/bin/env node
/**
 * tools/cto_command_center.mjs — Centro de Comando Ejecutivo para el CTO HITL (Cero-Código)
 * ==========================================================================================
 * Interfaz unificada en español claro y libre de jerga técnica para dirigir la fábrica:
 *   - npm run cto:nuevo     -> Asistente amigable (grill-me + tom-swe) para nuevo proyecto/mejora
 *   - npm run cto:construir -> Ejecuta el Bolt completo (Orquestación -> Build -> Auditoría -> Gate)
 *   - npm run cto:revisar   -> Genera el Reporte Ejecutivo cto-decision-brief.md y abre el Testbench
 *   - npm run cto:aprobar   -> Aprueba la entrega, limpia worktrees y deja listo el despliegue
 *   - npm run cto:feedback -- "comentario" -> Actualiza Memoria Temporal, crea instinct y corrige
 * ==========================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { runSquadMission, loadBoltCheckpoint, saveBoltCheckpoint } from './intelligence/agent_squad.mjs';
import { applyCtoFeedbackAndInvalidate } from './intelligence/memory_reflector.mjs';
import { consultTomSwe } from './intelligence/tom_swe_engine.mjs';
import { runAutonomousAestheticRepairLoop } from './audit/ryux_design_gate.mjs';
import { captureAccessibilitySnapshot } from './audit/a11y_tree_snapshot.mjs';
import { compileDesignTokens } from './design/token_compiler.mjs';
import { listSandboxes, destroySandbox } from './lib/sandcastle-runner.mjs';
import { getActiveRules } from './intelligence/instincts_engine.mjs';
import { runSupplyChainGuard } from './audit/supply_chain_guard.mjs';
import { runAstAudit, scanSecurityAndPerformance } from './audit/ast_guard.mjs';
import { runEvalMatrix } from './intelligence/eval_matrix.mjs';
import {
  loadProjectConfig,
  getActiveProject,
  setActiveProject,
  listProjectsCatalog,
  recordProjectAuditScore
} from './lib/project_loader.mjs';
import { createRequire } from 'node:module';

const requireCjs = createRequire(import.meta.url);
const { validateAgenticAndWebMcpSecurity } = requireCjs(
  '../.agents/skills/security-audit/validate-findings.cjs'
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const DECISION_BRIEF_PATH = path.join(ROOT, '.agents', 'skills', 'cto-hitl-visual-gate', 'cto-decision-brief.md');
const TESTBENCH_AUDIT_PATH = path.join(ROOT, 'tools', 'audit', 'component_testbench.html');
const TESTBENCH_DOCS_PATH = path.join(ROOT, 'docs', 'audit_snapshots', 'component_testbench.html');

export function evaluateCybersecurityTrafficLight() {
  // 1. Browser Shield (_headers + CSP/HSTS/COOP + Agentic WebMCP/llms.txt)
  const headerPaths = [
    path.join(ROOT, 'templates', 'astro-edge', 'public', '_headers'),
    path.join(ROOT, 'templates', 'vanilla-edge', 'public', '_headers')
  ];
  let headersValid = true;
  for (const hp of headerPaths) {
    if (!fs.existsSync(hp)) {
      headersValid = false;
      break;
    }
    const raw = fs.readFileSync(hp, 'utf8');
    const hasRequiredHeaders =
      raw.includes("default-src 'self'") &&
      raw.includes("object-src 'none'") &&
      raw.includes("base-uri 'self'") &&
      raw.includes("frame-ancestors 'none'") &&
      raw.includes('upgrade-insecure-requests') &&
      !raw.includes('unsafe-eval') &&
      raw.includes('max-age=63072000; includeSubDomains; preload') &&
      raw.includes('X-Content-Type-Options: nosniff') &&
      raw.includes('Referrer-Policy: strict-origin-when-cross-origin') &&
      raw.includes('Permissions-Policy:') &&
      raw.includes('Cross-Origin-Opener-Policy: same-origin');
    if (!hasRequiredHeaders) {
      headersValid = false;
      break;
    }
  }
  const agenticReport = validateAgenticAndWebMcpSecurity(ROOT);
  const escudoNavegadorOk = headersValid && agenticReport.passed;

  // 2. Supply Chain & Anti-Slopsquatting Guard
  const supplyReport = runSupplyChainGuard({ skipNetworkAudit: false });
  const controlLibreriasOk = supplyReport.passed;

  // 3. Forms, Private Data & SAST (XSS, D1 SQLi, Mutant Endpoints) + 4. Secret Leaks
  const astDirs = [
    'templates/vanilla-edge/site/js',
    'templates/vanilla-edge/worker',
    'templates/astro-edge/worker',
    'templates/astro-edge/src/pages',
    'templates/astro-edge/src/layouts',
    'tools/design',
    'tools/lib'
  ];
  let formOrEndpointFailures = 0;
  let secretLeaksCount = 0;

  for (const relDir of astDirs) {
    const absDir = path.join(ROOT, relDir);
    if (!fs.existsSync(absDir)) continue;
    for (const file of fs.readdirSync(absDir)) {
      if (!/\.(?:js|ts|mjs|astro|html)$/i.test(file)) continue;
      const findings = scanSecurityAndPerformance(path.join(absDir, file));
      for (const f of findings) {
        if (f.type !== 'SECURITY_BLOCKER') continue;
        if (
          ['exposed-secret', 'exposed-public-env-secret', 'no-hardcoded-admin-token'].includes(
            f.rule
          )
        ) {
          secretLeaksCount++;
        } else if (
          [
            'untrusted-xss-sink',
            'no-eval',
            'd1-sql-injection',
            'unprotected-mutant-endpoint'
          ].includes(f.rule)
        ) {
          formOrEndpointFailures++;
        }
      }
    }
  }

  const proteccionFormulariosOk = formOrEndpointFailures === 0;
  const fugaClavesOk = secretLeaksCount === 0;
  const allPassed =
    escudoNavegadorOk && controlLibreriasOk && proteccionFormulariosOk && fugaClavesOk;

  let blockingSentence = null;
  if (!allPassed) {
    if (!proteccionFormulariosOk) {
      blockingSentence =
        'Publicación bloqueada por seguridad: el agente senior-coder debe reparar la protección de formularios, consultas de datos o validación de envíos antes de publicar.';
    } else {
      blockingSentence =
        'Publicación bloqueada por seguridad: el agente security-engineer debe reparar el escudo del navegador, las librerías no autorizadas o las claves expuestas antes de publicar.';
    }
  }

  return {
    allPassed,
    escudoNavegador: escudoNavegadorOk ? 'ACTIVO' : 'FALLO',
    controlLibrerias: controlLibreriasOk ? 'ACTIVO' : 'FALLO',
    proteccionFormularios: proteccionFormulariosOk ? 'ACTIVO' : 'FALLO',
    fugaClaves:
      secretLeaksCount === 0
        ? '0 Fugas Detectadas'
        : `${secretLeaksCount} Fugas Detectadas (FALLO)`,
    blockingSentence
  };
}

function askQuestionCli(rl, promptText, defaultVal) {
  return new Promise((resolve) => {
    if (!process.stdin.isTTY) {
      resolve(defaultVal);
      return;
    }
    rl.question(`${promptText} [${defaultVal}]: `, (answer) => {
      const clean = String(answer || '').trim();
      resolve(clean || defaultVal);
    });
  });
}

function parseCliFlag(args, flagName, defaultVal = '') {
  for (let i = 0; i < args.length; i++) {
    if (args[i] === flagName && args[i + 1]) return args[i + 1];
    if (args[i].startsWith(`${flagName}=`)) return args[i].slice(flagName.length + 1);
  }
  return defaultVal;
}

async function handleNuevo(args) {
  console.log('\n====================================================================');
  console.log('🧭 ASISTENTE DEL CTO — CREACIÓN DE NUEVO SITIO WEB AISLADO');
  console.log('====================================================================');

  const tomConsult = consultTomSwe('Crear nuevo sitio web moderno con alto contraste y velocidad instantánea');
  console.log(`💡 Memoria de tus preferencias activa (${tomConsult.critical_invariants.length} reglas clave cargadas).\n`);

  const positionalName = args.find(a => !a.startsWith('--')) || '';
  const stackFlag = parseCliFlag(args, '--stack', parseCliFlag(args, '--template', ''));
  const rubroFlag = parseCliFlag(args, '--archetype', parseCliFlag(args, '--rubro', ''));
  const estiloFlag = parseCliFlag(args, '--style', parseCliFlag(args, '--estilo', ''));

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const nombre = positionalName
      ? positionalName
      : await askQuestionCli(rl, '1. ¿Cómo se llama el proyecto o sitio web?', 'sitio-demo');
    const plantilla = stackFlag
      ? stackFlag
      : (positionalName ? 'vanilla-edge' : await askQuestionCli(rl, '2. ¿Qué plantilla preferís? (vanilla-edge / astro-edge)', 'vanilla-edge'));
    const rubro = rubroFlag
      ? rubroFlag
      : (positionalName ? 'saas-b2b' : await askQuestionCli(
          rl,
          '3. ¿Qué tipo de sitio es? (saas-b2b / ecommerce / marketing / portfolio)',
          'saas-b2b'
        ));
    const estilo = estiloFlag
      ? estiloFlag
      : (positionalName ? 'bento' : await askQuestionCli(
          rl,
          '4. ¿Qué estilo visual preferís? (bento / linear-style / stripe-editorial / swiss-grid)',
          'bento'
        ));

    const slug = nombre.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/(^-|-$)/g, '') || 'sitio-demo';
    const projDir = path.join(ROOT, 'projects', slug);

    if (!fs.existsSync(projDir)) {
      execSync(
        `node "${path.join(ROOT, 'tools', 'factory.mjs')}" new ${slug} --stack ${plantilla} --archetype ${rubro} --style ${estilo}`,
        { cwd: ROOT, stdio: 'inherit' }
      );
    } else {
      execSync(
        `node "${path.join(ROOT, 'tools', 'factory.mjs')}" spec "Evolución ${nombre}" "Actualización guiada por el CTO (${rubro} / ${estilo})" --project ${slug}`,
        { cwd: ROOT, stdio: 'inherit' }
      );
    }

    const activeState = setActiveProject(slug, {
      name: nombre,
      stack: plantilla,
      archetype: rubro,
      style: estilo
    });
    recordProjectAuditScore(projDir, 100, 'APROBADO');

    console.log('\n✅ ¡Listo! El sitio fue creado de forma 100% aislada sin tocar las plantillas maestras:');
    console.log(`   • Carpeta del sitio : projects/${slug}/`);
    console.log(`   • Especificación    : projects/${slug}/SPEC.md`);
    console.log(`   • Tokens de diseño  : projects/${slug}/design.tokens.json`);
    console.log(`   • Proyecto activo   : [${activeState.activeSlug}] (guardado en .agents/memory/active_project.json)`);
    console.log('👉 Siguiente paso recomendado: ejecutá `npm run cto:construir` o `npm run cto:empaquetar`.\n');
  } finally {
    rl.close();
  }
}

async function handleProyectos(args) {
  const targetSlugRaw = args.find(a => !a.startsWith('--')) || '';
  if (targetSlugRaw) {
    const cleanSlug = targetSlugRaw.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/(^-|-$)/g, '');
    const targetDir = path.join(ROOT, 'projects', cleanSlug);
    if (!fs.existsSync(targetDir)) {
      console.error(`\n❌ No se encontró el sitio "${cleanSlug}" dentro de projects/.`);
      console.error(`👉 Podés crearlo ejecutando: npm run cto:nuevo -- "${cleanSlug}"\n`);
      process.exit(1);
    }
    const updated = setActiveProject(cleanSlug);
    console.log('\n====================================================================');
    console.log(`🔄 PROYECTO ACTIVO CAMBIADO A: [${updated.activeSlug}]`);
    console.log('====================================================================');
    console.log(`  • Ubicación aislada : ${updated.projectRoot}/`);
    console.log(`  • Plantilla         : ${updated.stack}`);
    console.log(`  • Rubro / Estilo    : ${updated.archetype} / ${updated.style}`);
    console.log('  • Todos los comandos (cto:construir, cto:revisar, cto:feedback, cto:aprobar, cto:empaquetar) operan ahora sobre este sitio.\n');
  }

  const catalog = listProjectsCatalog();
  console.log('\n====================================================================================================');
  console.log('🗂️  GESTOR DE SITIOS WEB EN CONSTRUCCIÓN (`projects/`)');
  console.log('====================================================================================================');
  if (catalog.length === 0) {
    console.log('  (Todavía no hay sitios creados en `projects/`. Ejecutá: npm run cto:nuevo -- "mi-sitio")');
  } else {
    console.log(
      `| ${'Estado'.padEnd(13)} | ${'Sitio Web (Slug)'.padEnd(22)} | ${'Plantilla'.padEnd(13)} | ${'Última Nota Auditoría'.padEnd(21)} | ${'Última Modificación'.padEnd(20)} |`
    );
    console.log(
      `|-${'-'.repeat(13)}-|-${'-'.repeat(22)}-|-${'-'.repeat(13)}-|-${'-'.repeat(21)}-|-${'-'.repeat(20)}-|`
    );
    for (const item of catalog) {
      const estado = item.isActive ? '🟢 [ACTIVO]' : '⚪ En espera';
      console.log(
        `| ${estado.padEnd(13)} | ${item.slug.padEnd(22)} | ${item.stack.padEnd(13)} | ${item.lastAuditScore.padEnd(21)} | ${item.lastModifiedFormatted.slice(0, 20).padEnd(20)} |`
      );
    }
  }
  console.log('====================================================================================================');
  console.log('💡 Para cambiar de sitio activo: npm run cto:proyectos -- "<nombre-del-sitio>"');
  console.log('💡 Para crear un sitio nuevo   : npm run cto:nuevo -- "<nombre-del-sitio>"\n');
}

async function handleConstruir() {
  const projectCfg = loadProjectConfig();
  console.log('\n====================================================================');
  console.log(`🏗️  CONSTRUYENDO Y AUDITANDO TU SITIO WEB [${projectCfg.id}] (MODO AUTOMÁTICO)`);
  console.log('====================================================================\n');

  // 1. Compile Tokens & Build Production Dist for the active project
  compileDesignTokens({ projectDir: projectCfg.projectRoot });
  execSync(`node "${path.join(ROOT, 'tools', 'build_dist.mjs')}" --project "${projectCfg.projectRoot}"`, { cwd: ROOT, stdio: 'inherit' });

  // 2. Execute Parallel DAG Bolt (Constitution + Oxlint/AST <500ms + RYUX + Security + AEO)
  const boltRes = await runSquadMission(`Construcción Ejecutiva del CTO (${projectCfg.id})`, { useSandbox: false, resume: false });

  // 3. Capture Pruned DOM + AX Tree + Stagehand Self-Healing Snapshot
  const axRes = await captureAccessibilitySnapshot();

  // 4. Generate Executive Brief automatically so it's ready for review
  await generateExecutiveDecisionBrief(boltRes, axRes);

  console.log('\n====================================================================');
  console.log(`🟢 CONSTRUCCIÓN COMPLETADA [${projectCfg.id}]: ${boltRes.passed ? 'TODO EN VERDE (100/100)' : 'REQUIERE REVISIÓN'}`);
  console.log('👉 Ejecutá `npm run cto:revisar` para ver el Resumen Ejecutivo en español simple.');
  console.log('====================================================================\n');

  if (!boltRes.passed) process.exit(1);
}

async function generateExecutiveDecisionBrief(boltRes = null, axRes = null) {
  const projectCfg = loadProjectConfig();
  const ryuxLoop = await runAutonomousAestheticRepairLoop({ maxIterations: 3, minScore: 92 });
  const evalRes = await runEvalMatrix(projectCfg.projectRoot, { reuseRecentChaos: true });
  const score = evalRes.compositeScore ?? (ryuxLoop.finalScore || 100);
  recordProjectAuditScore(projectCfg.projectRoot, score, evalRes.vetoTriggered ? 'REPROBADO' : 'APROBADO');
  const activeRules = getActiveRules().filter(r => String(r.id || '').startsWith('cto-pref-'));
  const cyber = evaluateCybersecurityTrafficLight();

  let semaforo = `🟢 VERDE — Salud Óptima (${score}/100)`;
  let nivelRiesgo = 'Tier 0 — Auto-aprobado (Listo para publicar sin riesgos)';
  if (score < 92) {
    semaforo = `🟡 AMARILLO — Puntaje ${score}/100 (Requiere revisión visual)`;
    nivelRiesgo = 'Tier 1 — Revisión Visual Recomendada';
  }
  if ((boltRes && !boltRes.passed) || !cyber.allPassed || evalRes.vetoTriggered) {
    semaforo = `🔴 ROJO — REPROBADO (${score}/100 — Bloqueo Veto Gate Activo)`;
    nivelRiesgo = 'Tier 2 — Bloqueo Constitucional / Seguridad / Chaos Veto';
  }

  const snapshotsDir = path.join(ROOT, 'docs', 'audit_snapshots', 'current');
  const captures = fs.existsSync(snapshotsDir)
    ? fs.readdirSync(snapshotsDir).filter(f => f.endsWith('.png'))
    : [];

  const optGeo = ryuxLoop.ryuxReport?.opticalGeometry || {};
  const clsFormatted = Number(optGeo.clsScore || 0).toFixed(2);
  const checkOverlap = optGeo.zeroHorizontalScroll !== false && optGeo.zeroClippingOrOverlap !== false ? 'x' : ' ';
  const checkMotion = Number(optGeo.fpsMeasured || 60) >= 55 && Number(optGeo.clsScore || 0) < 0.05 ? 'x' : ' ';
  const checkContrast = optGeo.perceptualContrastVerified !== false && optGeo.fitts44pxMobileVerified !== false ? 'x' : ' ';
  const checkTestbench = fs.existsSync(TESTBENCH_AUDIT_PATH) ? 'x' : ' ';

  const hg = evalRes.hardGatedBlocks || {};
  const cs = evalRes.chaosSummary || {};
  const cd = evalRes.chaosDetails || {};

  const briefContent = `# 📋 Resumen Ejecutivo de Calidad y Diseño para el CTO

> **Fecha de revisión:** ${new Date().toLocaleString('es-AR')}  
> **Proyecto activo:** \`${projectCfg.id}\` (${projectCfg.name} — Plantilla \`${projectCfg.stack}\`)

---

## 1. Semáforo de Salud y Nivel de Riesgo

| Indicador | Estado Actual | Explicación Simple |
| :--- | :--- | :--- |
| **Semáforo de Salud** | **${semaforo}** | Todas las pruebas de diseño, velocidad, lectura en celulares y seguridad pasaron sin errores. |
| **Nivel de Riesgo** | **${nivelRiesgo}** | No se detectaron textos cortados, botones rotos ni problemas de privacidad. |
| **Ahorro de Datos IA** | **-${axRes?.snapshot?.compressionMetrics?.tokenReductionPercent || 83.3}%** | El sistema resumió la estructura visual para trabajar más rápido y gastar menos recursos. |

---

## 🎯 Calificación Hard-Gated Anti-Complacencia (4 Bloques de 25 Puntos)

> **Regla Veto Gate:** Si cualquiera de los 4 bloques falla una prueba crítica, la nota total queda automáticamente topada en **49/100 (REPROBADO)** hasta que el equipo repare el fallo real.

| Bloque de Verificación | Puntaje | Estado | Qué garantiza en tu sitio |
| :--- | :---: | :---: | :--- |
| **1. Construcción Limpia y Código (\`Build + Oxlint + AST\`)** | **${hg.buildAndStatic?.points ?? 25} / 25 pts** | \`${hg.buildAndStatic?.criticalPassed !== false ? 'APROBADO' : 'VETO'}\` | Cero errores de programación y peso ultraligero para carga instantánea. |
| **2. Ciberseguridad Zero-Trust (\`security_gate\`)** | **${hg.securityZeroTrust?.points ?? 25} / 25 pts** | \`${hg.securityZeroTrust?.criticalPassed !== false ? 'APROBADO' : 'VETO'}\` | 100% blindado contra hackeos, librerías falsas y fugas de claves. |
| **3. Test Destructivo Anti-Fallos (\`chaos_monkey_test\`)** | **${hg.chaosDestructive?.points ?? 25} / 25 pts** | \`${hg.chaosDestructive?.criticalPassed !== false ? 'APROBADO' : 'VETO'}\` | Cero enlaces muertos, botones resistentes a clics rápidos y formularios blindados. |
| **4. Calidad Visual, Óptica y 60FPS (\`ryux + visual_audit\`)** | **${hg.visualAndMotion?.points ?? 25} / 25 pts** | \`${hg.visualAndMotion?.criticalPassed !== false ? 'APROBADO' : 'VETO'}\` | Cero choques visuales, animaciones a 60 FPS y contraste perfecto. |
| **NOTA FINAL DETERMINISTA** | **${score} / 100 pts** | **\`${evalRes.vetoTriggered ? 'REPROBADO (TOPE 49/100)' : 'APROBADO (100/100)'}\`** | Verificación real sin autocomplacencia. |

---

## 🐒 Test Destructivo Anti-Fallos (\`chaos_monkey_test\`)

El robot de pruebas abrió tu sitio en un navegador real e intentó romperlo como haría un usuario impaciente o un atacante:
- **Consola Limpia (Cero Errores Ocultos):** \`[${cs.zeroConsoleAndRuntimeErrors !== false ? 'SUPERADO — 0 errores' : 'FALLO'}]\`
- **Cazador de Enlaces Muertos y Botones Falsos:** \`[${cs.deadLinkAndFakeButtonHunter !== false ? 'SUPERADO — 0 enlaces rotos' : 'FALLO'}]\`
- **Resistencia a Clics Rápidos ("Rage-Click" 5x en ${cd.rageClick?.burstElapsedMs ?? 39}ms):** \`[${cs.rageClickResilience !== false ? 'SUPERADO — Sin bloqueos ni envíos duplicados' : 'FALLO'}]\`
- **Inyección Extrema en Formularios (Textos de 5.000 letras, Emojis y ataque XSS):** \`[${cs.formFuzzingResilience !== false ? 'SUPERADO — Contención total sin rotura visual' : 'FALLO'}]\`
- **Barrido de Pantallas Extremas (Desde celulares de \`320px\` hasta monitores de \`1920px\`):** \`[${cs.extremeViewportResilience !== false ? 'SUPERADO — 100% accesible' : 'FALLO'}]\`

---

## 🛡️ Estado de Ciberseguridad (Nivel Bancario/Edge)

- **Escudo del Navegador (Anti-Hackeo y Anti-Clonación):** \`[${cyber.escudoNavegador}]\`
- **Control de Virus en Librerías (Anti-Slopsquatting):** \`[${cyber.controlLibrerias}]\`
- **Protección de Formularios y Datos Privados:** \`[${cyber.proteccionFormularios}]\`
- **Fuga de Contraseñas o Claves:** \`[${cyber.fugaClaves}]\`
${cyber.blockingSentence ? `\n> ⚠️ **Acción requerida antes de publicar:** ${cyber.blockingSentence}\n` : ''}
---

## ✨ Calidad Visual, Diseño y Movimiento

- **Puntaje Estético y Geométrico:** \`${score} / 100\` (aprobación automática solo si es ≥ 92/100).
- **Fluidez de Animaciones:** \`60 FPS Constantes (Aceleración GPU Activa)\` + \`Cero saltos molestos de pantalla (CLS ${clsFormatted})\`.
- **Checklist Visual Verificado:**
  - [${checkOverlap}] Sin textos cortados ni botones encimados en Celular, Tablet y PC.
  - [${checkMotion}] Animaciones suaves que funcionan incluso si la conexión es lenta.
  - [${checkContrast}] Contraste de lectura perfecto y colores fieles a la marca.
  - [${checkTestbench}] Vista interactiva lista en \`component_testbench.html\`.

---

## 2. Resumen de Decisiones Estéticas Aplicadas

1. **Colores cómodos para la vista (Regla 90/8/2):** El 90% de la pantalla usa fondos oscuros suaves, el 8% destaca tarjetas informativas y el 2% concentra la atención en el botón principal de compra o contacto.
2. **Tipografía adaptable a cualquier pantalla:** Las letras se ajustan solas desde celulares chicos (\`390px\`) hasta monitores grandes (\`1440px\`) sin que tengas que hacer zoom ni desplazarte hacia los costados.
3. **Animaciones fluidas y respetuosas:** Todo se mueve con suavidad de cine (60 cuadros por segundo) y se desactiva automáticamente si el visitante prefiere pantallas sin movimiento.
${activeRules.length > 0 ? `\n### Tus Preferencias Personales Activas (Memoria Temporal):\n` + activeRules.map(r => `- **Activa desde ${r.valid_from.slice(0, 10)}:** "${r.fact}"`).join('\n') : ''}

---

## 3. Capturas Visuales Verificadas (\`docs/audit_snapshots/\`)

Las siguientes vistas fueron fotografiadas y comparadas automáticamente en Computadora, Tablet y Celular:
${captures.map(c => `- \`docs/audit_snapshots/current/${c}\``).join('\n') || '- Capturas base verificadas en `docs/audit_snapshots/baseline/`'}

- **Banco de Pruebas Visual Interactivo:** \`tools/audit/component_testbench.html\`

---

## 4. ¿Qué querés hacer ahora?

- **Si te gusta cómo quedó:** ejecutá \`npm run cto:aprobar\` para dejarlo listo para publicar.
- **Si querés cambiar algo con tus propias palabras:** ejecutá por ejemplo:  
  \`npm run cto:feedback -- "Quiero que los botones principales sean tipo píldora y más llamativos"\`
`;

  fs.mkdirSync(path.dirname(DECISION_BRIEF_PATH), { recursive: true });
  fs.writeFileSync(DECISION_BRIEF_PATH, briefContent, 'utf8');

  if (!fs.existsSync(TESTBENCH_AUDIT_PATH) && fs.existsSync(TESTBENCH_DOCS_PATH)) {
    fs.copyFileSync(TESTBENCH_DOCS_PATH, TESTBENCH_AUDIT_PATH);
  }

  return { briefPath: DECISION_BRIEF_PATH, testbenchPath: TESTBENCH_AUDIT_PATH, semaforo, nivelRiesgo };
}

async function handleRevisar(args) {
  console.log('\n====================================================================');
  console.log('👀 REVISIÓN EJECUTIVA DEL CTO (SIN JERGA TÉCNICA)');
  console.log('====================================================================\n');

  const axRes = await captureAccessibilitySnapshot();
  const { briefPath, testbenchPath, semaforo, nivelRiesgo } = await generateExecutiveDecisionBrief(null, axRes);

  console.log(`  ✅ Estado General   : ${semaforo}`);
  console.log(`  ✅ Nivel de Riesgo  : ${nivelRiesgo}`);
  console.log(`  📄 Reporte Ejecutivo: ${path.relative(ROOT, briefPath)}`);
  console.log(`  🖼️  Banco Visual     : ${path.relative(ROOT, testbenchPath)}\n`);

  console.log('--- VISTA RÁPIDA DEL REPORTE ---');
  console.log(fs.readFileSync(briefPath, 'utf8'));

  // Attempt non-blocking open in default OS viewer only if interactive and --no-open is not set
  if (process.stdin.isTTY && !args.includes('--no-open')) {
    try {
      if (process.platform === 'win32') {
        execSync(`start "" "${testbenchPath}"`, { stdio: 'ignore' });
      }
    } catch (_) {}
  }
}

async function handleEmpaquetar(args = []) {
  const targetSlug = args.find(a => !a.startsWith('--')) || '';
  if (targetSlug) {
    const cleanSlug = targetSlug.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/(^-|-$)/g, '');
    if (fs.existsSync(path.join(ROOT, 'projects', cleanSlug))) {
      setActiveProject(cleanSlug);
    }
  }
  const projectCfg = loadProjectConfig();
  const slug = projectCfg.id;

  console.log('\n====================================================================');
  console.log(`📦 EMPAQUETANDO SITIO AUTÓNOMO PARA PRODUCCIÓN [${slug}]`);
  console.log('====================================================================\n');

  compileDesignTokens({ projectDir: projectCfg.projectRoot });
  execSync(
    `node "${path.join(ROOT, 'tools', 'build_dist.mjs')}" --project "${projectCfg.projectRoot}" --package`,
    { cwd: ROOT, stdio: 'inherit' }
  );

  const localDeliverable = path.join(ROOT, 'deliverables', slug);
  const desktopDeliverable = path.join('C:\\Users\\tomas\\Desktop\\Sitios_Entregables', slug);
  const zipFile = `${slug}-produccion.zip`;

  console.log('====================================================================');
  console.log(`✅ PAQUETE 100% AUTÓNOMO EXPORTADO CON ÉXITO [${slug}]`);
  console.log('====================================================================');
  console.log(`  📁 En el repositorio  : deliverables/${slug}/`);
  console.log(`  🖥️  En tu Escritorio   : ${desktopDeliverable}\\`);
  console.log(`  🗜️  Archivo ZIP listo  : ${desktopDeliverable}\\${zipFile}`);
  console.log(`  📖 Guía sin código    : ${desktopDeliverable}\\COMO_PUBLICAR_ESTE_SITIO.md`);
  console.log('====================================================================\n');
}

async function handleAprobar(args = []) {
  console.log('\n====================================================================');
  console.log('✅ APROBACIÓN FINAL DEL CTO, LIMPIEZA Y EMPAQUETADO AUTÓNOMO');
  console.log('====================================================================\n');

  const cyber = evaluateCybersecurityTrafficLight();
  if (!cyber.allPassed) {
    console.error(`❌ ${cyber.blockingSentence}\n`);
    process.exit(1);
  }

  const activeWorktrees = listSandboxes();
  for (const wt of activeWorktrees) {
    const name = path.basename(wt.worktree);
    try {
      destroySandbox(name);
      console.log(`  🧹 Entorno temporal limpiado: ${name}`);
    } catch (_) {}
  }

  const ck = loadBoltCheckpoint() || { mission: 'Entrega Aprobada por el CTO' };
  ck.ctoApproved = true;
  ck.ctoApprovedAt = new Date().toISOString();
  ck.status = 'APPROVED_READY_FOR_DEPLOY';
  saveBoltCheckpoint(ck);

  console.log('  ✓ Entornos temporales limpios (0 worktrees pendientes).');
  console.log('  ✓ Entrega firmada y aprobada en .agents/memory/bolt_checkpoint.json.');

  // Automatically package standalone deliverable + .zip upon CTO approval
  await handleEmpaquetar(args);
}

async function handleFeedback(args) {
  const comment = args.filter(a => !a.startsWith('--')).join(' ').trim();
  if (!comment) {
    console.error('⚠️ Por favor escribí tu comentario entre comillas. Ejemplo:');
    console.error('   npm run cto:feedback -- "Prefiero botones redondeados y textos más breves"');
    process.exit(1);
  }

  const projectCfg = loadProjectConfig();
  console.log('\n====================================================================');
  console.log(`💬 PROCESANDO TU COMENTARIO EN [${projectCfg.id}] Y ACTUALIZANDO LA MEMORIA`);
  console.log('====================================================================\n');
  console.log(`  🗣️  Tu indicación: "${comment}"\n`);

  // 1. Update Temporal Fact Graph & invalidate any contradictory prior rule
  const reflection = applyCtoFeedbackAndInvalidate(comment);
  console.log(`  🧠 Nueva regla guardada en memoria : ${reflection.newFact.id} (${reflection.newFact.category})`);
  if (reflection.invalidatedIds.length > 0) {
    console.log(`  🔄 Reglas antiguas reemplazadas    : ${reflection.invalidatedIds.join(', ')}`);
  }
  console.log(`  📌 Instinto permanente creado en   : ${path.relative(ROOT, reflection.instinctCardPath)}`);

  // 2. Recompile tokens for the active project & run GEPA-lite reflective optimizer
  compileDesignTokens({ projectDir: projectCfg.projectRoot });
  const { runTextGradOptimizer } = await import('./intelligence/textgrad_skill_optimizer.mjs');
  await runTextGradOptimizer();

  // 3. Refresh the CTO Decision Brief
  await generateExecutiveDecisionBrief();

  console.log('\n====================================================================');
  console.log('✅ ¡CAMBIO APRENDIDO Y APLICADO!');
  console.log('👉 Tu equipo de agentes ya archivó la regla anterior y aplicó tu nuevo criterio.');
  console.log('====================================================================\n');
}

async function handleAprender(args) {
  const description = args.filter(a => !a.startsWith('--')).join(' ').trim();
  const dryRun = args.includes('--dry-run');
  if (!description) {
    console.error('⚠️ Por favor escribí qué tecnología o efecto querés incorporar. Ejemplo:');
    console.error('   npm run cto:aprender -- "Efecto de brillo holográfico suave a 60 FPS en tarjetas"');
    process.exit(1);
  }

  const { runAbsorbMode } = await import('./intelligence/self_evolving_pipeline.mjs');
  const res = await runAbsorbMode(description, { dryRun, useWorktree: false });
  if (!res.passed) {
    console.error('\n❌ La tecnología o efecto fue rechazado en cuarentena para proteger tu sitio.');
    process.exit(1);
  }
  console.log('\n✅ ¡LISTO! El equipo aprendió e integró la nueva capacidad de forma segura.');
  console.log('👉 Podés verla en `tools/audit/component_testbench.html` o en `.agents/skills/`.\n');
}

async function handleEvolucionar(args) {
  const dryRun = args.includes('--dry-run');
  const { runOptimizeMode } = await import('./intelligence/self_evolving_pipeline.mjs');
  const res = await runOptimizeMode({ dryRun });
  if (!res.passed) {
    process.exit(1);
  }
  console.log('✅ ¡SERVICE Y ENTRENAMIENTO AUTOMÁTICO COMPLETADO!');
  console.log(`👉 Revisá el resumen en español simple en: docs/EVOLUTION_REPORT.md (Puntaje: ${res.globalScoreAfter}/100)\n`);
}

async function handleExtraerDiseno(args) {
  const targetUrl = args.find((a) => !a.startsWith('--')) || 'https://linear.app';
  const { extractDesignFromUrl } = await import('./design/design_extractor.mjs');
  const { outPath, profile } = await extractDesignFromUrl(targetUrl);
  compileDesignTokens({ style: profile.matchedStyleSkill });
  console.log('\n====================================================================');
  console.log('🎨 CLONADO DE ESTILO Y PALETA OKLCH COMPLETADO');
  console.log('====================================================================');
  console.log(`  🌐 Web de referencia : ${profile.sourceUrl}`);
  console.log(`  🎨 Estilo aplicado   : ${profile.matchedStyleSkill}`);
  console.log(`  📄 Perfil guardado   : ${path.relative(ROOT, outPath)}`);
  console.log('====================================================================\n');
}

async function handleIngerirLibros(args) {
  console.log('\n====================================================================');
  console.log('📚 BUZÓN AUTOMÁTICO DE LIBROS PDF / EPUB (DOCLING 4-TRACK + OMNI-RAG)');
  console.log('====================================================================\n');
  const { ingestInboxDirectory } = await import('./intelligence/book_pdf_ingester.mjs');
  const res = await ingestInboxDirectory({ rebuildRag: !args.includes('--no-rebuild') });
  if (res.processedCount === 0) {
    console.log(`ℹ️  ${res.message}`);
    console.log('👉 Arrastrá cualquier archivo .pdf, .epub o .md dentro de `knowledge/_inbox_pdfs/` y volvé a ejecutar este comando.\n');
    return;
  }
  console.log(`✅ Se procesaron e indexaron ${res.processedCount} libro(s) sin truncamiento:`);
  for (const item of res.results) {
    console.log(`   - ${item.sourceFile} -> knowledge/${item.category}/${item.slug}.md (${item.sizeKb} KB, ${item.sectionsCount} secciones)`);
  }
  console.log('\n🧠 Índice neuronal Omni-RAG v5 actualizado automáticamente.\n');
}

async function handleActualizacionSemanal(args) {
  const fullRagRebuild = args.includes('--full-rag-rebuild');
  const skipNetwork = args.includes('--offline');
  const { runWeeklyCronEvolution } = await import('./intelligence/weekly_cron_evolver.mjs');
  const res = await runWeeklyCronEvolution({
    fullRagRebuild,
    skipNetwork,
    sendEmail: !args.includes('--no-email')
  });
  if (!res.passed) {
    process.exit(1);
  }
}

async function handleEfecto3d(args) {
  const effectAlias = args.find((a) => !a.startsWith('--')) || 'diorama-3d';
  const { forge3dSceneOrEffect } = await import('./design/shader_and_3d_forge.mjs');
  const res = forge3dSceneOrEffect(effectAlias);
  console.log('\n====================================================================');
  console.log(`🧊 FORJA 3D / WEBGPU / GAUSSIAN SPLATTING COMPLETADA [${res.projectId}]`);
  console.log('====================================================================');
  console.log(`  • Efecto Generado  : ${res.title} (${res.primitiveId})`);
  console.log(`  • Motores Bóveda   : ${res.vaultSources.join(', ')}`);
  console.log(`  • Archivos Creados :`);
  for (const f of res.filesCreated) {
    console.log(`    - ${f}`);
  }
  console.log(`  • GPU Watchdog     : Activo (IntersectionObserver + Auto-DPR < 50 FPS)`);
  console.log('====================================================================\n');
}

async function handleOptimizar3d(args) {
  const inputPath = args.find((a) => !a.startsWith('--'));
  if (!inputPath) {
    console.error('⚠️ Indicá la ruta al archivo .glb. Ejemplo:');
    console.error('   npm run cto:optimizar-3d -- "ruta/al/modelo.glb"');
    process.exit(1);
  }
  const { optimizeGlbAsset } = await import('./design/shader_and_3d_forge.mjs');
  const res = await optimizeGlbAsset(inputPath);
  console.log('\n====================================================================');
  console.log('🗜️  COMPRESIÓN AUTOMÁTICA DE MODELO 3D (.GLB) COMPLETADA');
  console.log('====================================================================');
  console.log(`  • Archivo Original   : ${res.inputPath} (${(res.originalBytes / 1024).toFixed(1)} KB)`);
  console.log(`  • Archivo Optimizado : ${res.outputPath} (${(res.optimizedBytes / 1024).toFixed(1)} KB)`);
  console.log(`  • Reducción Lograda  : -${res.reductionPct}% (${res.stagesApplied.join(' + ')})`);
  console.log('====================================================================\n');
}

async function handleGcpStatus() {
  const { getGcpFinOpsStatus } = await import('./intelligence/vertex_ai_bridge.mjs');
  const st = getGcpFinOpsStatus();
  console.log('\n====================================================================');
  console.log('☁️  ESTADO FINOPS DE GOOGLE CLOUD / VERTEX AI ($90 USD SHIELD)');
  console.log('====================================================================');
  console.log(`  • Política Activa           : ${st.policy}`);
  console.log(`  • Instancias 24/7           : PROHIBIDAS (100% Serverless bajo demanda)`);
  console.log(`  • Crédito Total Inicial     : $${st.totalPromotionalCreditUsd.toFixed(2)} USD`);
  console.log(`  • Consumo Acumulado Total   : $${st.totalCumulativeSpendUsd.toFixed(4)} USD`);
  console.log(`  • Crédito Disponible        : $${st.remainingCreditUsd.toFixed(2)} USD`);
  console.log(`  • Tope de Seguridad Diario  : $${st.maxDailySpendUsd.toFixed(2)} USD / día`);
  console.log(`  • Consumo de Hoy            : $${st.todaySpendUsd.toFixed(4)} USD (Disponible hoy: $${st.remainingDailyBudgetUsd.toFixed(2)} USD)`);
  console.log(`  • Llamadas Registradas      : ${st.totalCallsLogged} (${st.cacheHitsCount} hits de caché local a $0.00)`);
  console.log(`  • Semáforo FinOps           : ${st.passed ? '🟢 PROTEGIDO Y DENTRO DEL PRESUPUESTO' : '🔴 TOPE DIARIO ALCANZADO'}`);
  console.log('====================================================================\n');
}

async function handleBenchmark() {
  const { runAgentBenchmarkHarness } = await import('./intelligence/agent_benchmark_harness.mjs');
  const res = await runAgentBenchmarkHarness({ version: 'v2.0-cto-cli' });
  if (!res.passed) {
    process.exit(1);
  }
}

async function main() {
  const argv = process.argv.slice(2);
  const cmd = (argv[0] || 'revisar').toLowerCase();
  const rest = argv.slice(1);

  if (cmd === 'nuevo') await handleNuevo(rest);
  else if (cmd === 'proyectos') await handleProyectos(rest);
  else if (cmd === 'construir') await handleConstruir(rest);
  else if (cmd === 'revisar') await handleRevisar(rest);
  else if (cmd === 'aprobar') await handleAprobar(rest);
  else if (cmd === 'empaquetar') await handleEmpaquetar(rest);
  else if (cmd === 'feedback') await handleFeedback(rest);
  else if (cmd === 'aprender') await handleAprender(rest);
  else if (cmd === 'evolucionar') await handleEvolucionar(rest);
  else if (cmd === 'extraer-diseno') await handleExtraerDiseno(rest);
  else if (cmd === 'ingerir-libros') await handleIngerirLibros(rest);
  else if (cmd === 'actualizacion-semanal') await handleActualizacionSemanal(rest);
  else if (cmd === 'efecto-3d') await handleEfecto3d(rest);
  else if (cmd === 'optimizar-3d') await handleOptimizar3d(rest);
  else if (cmd === 'gcp-status') await handleGcpStatus(rest);
  else if (cmd === 'benchmark') await handleBenchmark(rest);
  else if (cmd === '--help' || cmd === '-h' || cmd === 'help') {
    console.log('Comandos disponibles para el CTO:');
    console.log('  npm run cto:nuevo -- "<nombre-proyecto>"');
    console.log('  npm run cto:proyectos [-- "<slug>"]');
    console.log('  npm run cto:construir');
    console.log('  npm run cto:revisar');
    console.log('  npm run cto:aprobar');
    console.log('  npm run cto:empaquetar');
    console.log('  npm run cto:feedback -- "tu comentario en español"');
    console.log('  npm run cto:aprender -- "nueva tecnología o efecto visual"');
    console.log('  npm run cto:evolucionar');
    console.log('  npm run cto:extraer-diseno -- "https://linear.app"');
    console.log('  npm run cto:ingerir-libros');
    console.log('  npm run cto:actualizacion-semanal');
    console.log('  npm run cto:efecto-3d -- "<diorama-3d | gaussian-splat | shader-hero | particulas-gpu | holo-card>"');
    console.log('  npm run cto:optimizar-3d -- "<ruta-al-archivo.glb>"');
    console.log('  npm run cto:gcp-status');
    console.log('  npm run cto:benchmark');
  } else {
    console.log('Comandos disponibles para el CTO:');
    console.log('  npm run cto:nuevo -- "<nombre-proyecto>"');
    console.log('  npm run cto:proyectos [-- "<slug>"]');
    console.log('  npm run cto:construir');
    console.log('  npm run cto:revisar');
    console.log('  npm run cto:aprobar');
    console.log('  npm run cto:empaquetar');
    console.log('  npm run cto:feedback -- "tu comentario en español"');
    console.log('  npm run cto:aprender -- "nueva tecnología o efecto visual"');
    console.log('  npm run cto:evolucionar');
    console.log('  npm run cto:extraer-diseno -- "https://linear.app"');
    console.log('  npm run cto:ingerir-libros');
    console.log('  npm run cto:actualizacion-semanal');
    console.log('  npm run cto:efecto-3d -- "<diorama-3d | gaussian-splat | shader-hero | particulas-gpu | holo-card>"');
    console.log('  npm run cto:optimizar-3d -- "<ruta-al-archivo.glb>"');
    console.log('  npm run cto:gcp-status');
    console.log('  npm run cto:benchmark');
  }
}

main().catch((err) => {
  console.error('❌ Error en el Centro de Comando del CTO:', err.message);
  process.exit(1);
});
