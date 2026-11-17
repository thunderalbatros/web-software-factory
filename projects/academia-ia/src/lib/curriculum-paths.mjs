/**
 * curriculum-paths.mjs — Isomorphic Universal + Path Curriculum & Adaptive Calibration Model
 * Shared cleanly between Astro client modules (`src/`) and the Cloudflare Edge Worker (`worker/`).
 */

export const PATH_IDS = Object.freeze([
  'uso_cotidiano',
  'trabajo_emprendimiento',
  'web_productos',
  'bots_automatizacion',
  'multimedia_creativa'
]);

export const HARDWARE_ARCHETYPE_IDS = Object.freeze([
  'pc_basica_zero_cost',
  'pc_media_hybrid_free',
  'gpu_local_sovereign',
  'creador_multimedia_oss'
]);

export const HARDWARE_ARCHETYPES_CATALOG = Object.freeze([
  {
    id: 'pc_basica_zero_cost',
    hardwareTier: 'basic_cpu_cloud',
    titleEs: 'PC básica, presupuesto cero',
    stackSummary: 'Navegador moderno, LibreOffice, Demos WebGPU/WASM en el cliente'
  },
  {
    id: 'pc_media_hybrid_free',
    hardwareTier: 'mid_16gb',
    titleEs: 'PC media (16 GB), mezcla local y nube gratuita',
    stackSummary: 'Ollama cuantizado, Open WebUI, n8n comunitario, SQLite'
  },
  {
    id: 'gpu_local_sovereign',
    hardwareTier: 'local_gpu',
    titleEs: 'Equipo con GPU local, soberanía de datos',
    stackSummary: 'llama.cpp / Ollama, vLLM, ComfyUI, PostgreSQL + pgvector, Qdrant'
  },
  {
    id: 'creador_multimedia_oss',
    hardwareTier: 'mid_16gb',
    titleEs: 'Creador multimedia con herramientas libres',
    stackSummary: 'Krita, Blender, Inkscape, Audacity, LMMS, Kdenlive, whisper.cpp'
  }
]);

export const PATH_CATALOG = Object.freeze({
  uso_cotidiano: {
    id: 'uso_cotidiano',
    titleEs: 'Uso Cotidiano y Alfabetización',
    summaryEs: 'Aplicar asistentes de lenguaje sin riesgo de privacidad en estudio, trámites y vida diaria.',
    githubRecommended: false,
    level2Specialty: {
      lessonId: 'l2-especialidad-uso_cotidiano',
      eventType: 'read',
      xpWeight: 25,
      titleEs: 'Especialidad Nivel 2: Flujos de lectura, síntesis y verificación cotidiana sin código'
    },
    level3Specialty: {
      lessonId: 'l3-proyecto-uso_cotidiano',
      eventType: 'audit',
      xpWeight: 40,
      titleEs: 'Proyecto Nivel 3: Auditoría personal de privacidad, citas y contraste de fuentes'
    }
  },
  trabajo_emprendimiento: {
    id: 'trabajo_emprendimiento',
    titleEs: 'Trabajo, Oficios y Emprendimiento',
    summaryEs: 'Estandarizar documentación, presupuestos, atención y análisis con herramientas sin tarjeta.',
    githubRecommended: true,
    level2Specialty: {
      lessonId: 'l2-especialidad-trabajo_emprendimiento',
      eventType: 'read',
      xpWeight: 25,
      titleEs: 'Especialidad Nivel 2: Base de conocimiento local (RAG) aplicada a procedimientos y oficios'
    },
    level3Specialty: {
      lessonId: 'l3-proyecto-trabajo_emprendimiento',
      eventType: 'audit',
      xpWeight: 40,
      titleEs: 'Proyecto Nivel 3: Flujo reproducible auditado con límites de datos confidenciales'
    }
  },
  web_productos: {
    id: 'web_productos',
    titleEs: 'Web, Apps y Productos Digitales',
    summaryEs: 'Construir interfaces rápidas, accesibles WCAG 2.2 AA y APIs Edge seguras con Astro, D1 y Workers.',
    githubRecommended: true,
    level2Specialty: {
      lessonId: 'l2-especialidad-web_productos',
      eventType: 'read',
      xpWeight: 25,
      titleEs: 'Especialidad Nivel 2: Arquitectura web estática/híbrida con búsqueda local e indexación limpia'
    },
    level3Specialty: {
      lessonId: 'l3-proyecto-web_productos',
      eventType: 'audit',
      xpWeight: 40,
      titleEs: 'Proyecto Nivel 3: Despliegue Edge endurecido con CSP estricta, Trusted Types y D1 parametrizado'
    }
  },
  bots_automatizacion: {
    id: 'bots_automatizacion',
    titleEs: 'Bots y Automatización Confiable',
    summaryEs: 'Orquestar tareas repetitivas con pausa humana, validación Valibot y prevención de inyecciones.',
    githubRecommended: true,
    level2Specialty: {
      lessonId: 'l2-especialidad-bots_automatizacion',
      eventType: 'read',
      xpWeight: 25,
      titleEs: 'Especialidad Nivel 2: Orquestación por nodos (n8n / Apps Script) con aprobación manual'
    },
    level3Specialty: {
      lessonId: 'l3-proyecto-bots_automatizacion',
      eventType: 'audit',
      xpWeight: 40,
      titleEs: 'Proyecto Nivel 3: Agente acotado con sandboxing, HMAC-SHA256 y compuertas de fallo cerrado'
    }
  },
  multimedia_creativa: {
    id: 'multimedia_creativa',
    titleEs: 'Multimedia Creativa Libre',
    summaryEs: 'Proyectar ilustración, audio, subtitulado y edición con Blender, Krita, Audacity y licencias claras.',
    githubRecommended: false,
    level2Specialty: {
      lessonId: 'l2-especialidad-multimedia_creativa',
      eventType: 'read',
      xpWeight: 25,
      titleEs: 'Especialidad Nivel 2: Flujo multimedia accesible con subtítulos y trazabilidad SPDX'
    },
    level3Specialty: {
      lessonId: 'l3-proyecto-multimedia_creativa',
      eventType: 'audit',
      xpWeight: 40,
      titleEs: 'Proyecto Nivel 3: Pieza audiovisual abierta publicada sin bloqueos propietarios'
    }
  }
});

export const UNIVERSAL_NODES_BY_LEVEL = Object.freeze({
  1: [
    { lessonId: 'l1-criterio-y-tokens', eventType: 'read', xpWeight: 25, titleEs: 'Lectura Nivel 1: Criterio, tokens y privacidad' },
    { lessonId: 'l1-criterio-y-tokens', eventType: 'quiz', xpWeight: 50, titleEs: 'Autoevaluación Nivel 1: Verificación práctica' }
  ],
  2: [
    { lessonId: 'l2-rag-local-sqlite', eventType: 'read', xpWeight: 25, titleEs: 'Lectura Nivel 2: RAG local con SQLite FTS5' },
    { lessonId: 'l2-rag-local-sqlite', eventType: 'quiz', xpWeight: 50, titleEs: 'Autoevaluación Nivel 2: Híbrido léxico y vectorial' }
  ],
  3: [
    { lessonId: 'l3-seguridad-y-factories', eventType: 'read', xpWeight: 25, titleEs: 'Lectura Nivel 3: CSP por hashes, Trusted Types y sandbox opaco' },
    { lessonId: 'l3-seguridad-y-factories', eventType: 'quiz', xpWeight: 50, titleEs: 'Autoevaluación Nivel 3: Fronteras de confianza y E2E' }
  ]
});

export const CANONICAL_EVENT_XP = Object.freeze({
  read: 25,
  quiz: 50,
  fsrs: 15,
  audit: 40,
  milestone: 100
});

export const ONBOARDING_CALIBRATION_CASES = Object.freeze({
  case1: {
    promptEs: 'Un compañero pega en un chat público un contrato con DNI reales y pide un resumen. ¿Cuál es tu primer paso?',
    options: [
      { value: 'copy_directly', score: 0, labelEs: 'Enviarlo completo para no perder contexto del documento.' },
      { value: 'anonymize_first', score: 1, labelEs: 'Reemplazar DNI, nombres y montos sensibles por marcadores genéricos antes de consultar.' },
      { value: 'local_verify', score: 2, labelEs: 'Anonimizar o procesarlo localmente sin nube, y contrastar fechas/cláusulas contra la fuente oficial.' }
    ]
  },
  case2: {
    promptEs: '¿Cómo diseñarías un sistema que responde preguntas sobre 200 manuales internos evitando invenciones y ejecución de código?',
    options: [
      { value: 'single_prompt', score: 0, labelEs: 'Pegar todo en un solo prompt largo y confiar en la memoria del modelo.' },
      { value: 'hybrid_rag', score: 1, labelEs: 'Usar búsqueda híbrida local (SQLite FTS5 + vectores) exigiendo citas exactas antes de sintetizar.' },
      { value: 'zero_trust_factory', score: 2, labelEs: 'Combinar RAG con citas estrictas, validación de esquema (Valibot), Trusted Types y sandbox sin allow-same-origin.' }
    ]
  }
});

/**
 * Calibrates starting level purely without granting unearned XP or prior certificates.
 */
export function evaluateCalibrationCases({
  startFromScratch = false,
  case1Choice = 'copy_directly',
  case2Choice = 'single_prompt',
  activePathId = 'uso_cotidiano'
} = {}) {
  const pathMeta = PATH_CATALOG[activePathId] || PATH_CATALOG.uso_cotidiano;
  if (startFromScratch) {
    return {
      calibratedLevel: 1,
      score: 0,
      awardedXp: 0,
      grantedPriorCertificates: false,
      offerGithubLink: false,
      rationaleEs: 'Inicio desde Nivel 1 (Principiante · UNESCO Adquirir) por elección explícita.'
    };
  }
  const opt1 = ONBOARDING_CALIBRATION_CASES.case1.options.find((o) => o.value === case1Choice);
  const opt2 = ONBOARDING_CALIBRATION_CASES.case2.options.find((o) => o.value === case2Choice);
  const score = (opt1?.score || 0) + (opt2?.score || 0);
  const calibratedLevel = score >= 4 ? 3 : score >= 2 ? 2 : 1;
  return {
    calibratedLevel,
    score,
    awardedXp: 0,
    grantedPriorCertificates: false,
    offerGithubLink: calibratedLevel >= 2 || pathMeta.githubRecommended,
    rationaleEs:
      calibratedLevel === 3
        ? 'Ubicación inicial en Nivel 3 (Avanzado · Crear). Tus niveles previos no reciben XP ni diplomas regalados; puedes acreditarlos cuando lo desees.'
        : calibratedLevel === 2
          ? 'Ubicación inicial en Nivel 2 (Intermedio · Profundizar). Puedes enlazar tu GitHub cuando quieras respaldar proyectos.'
          : 'Ubicación inicial en Nivel 1 (Principiante · Adquirir) para construir fundamentos sólidos.'
  };
}

export function isAllowedLessonEvent(lessonId = '', eventType = '') {
  const cleanLesson = String(lessonId || '').trim();
  const cleanType = String(eventType || '').trim();
  if (!Object.prototype.hasOwnProperty.call(CANONICAL_EVENT_XP, cleanType) || cleanType === 'milestone') {
    return false;
  }
  for (const levelNum of [1, 2, 3]) {
    if (UNIVERSAL_NODES_BY_LEVEL[levelNum].some((n) => n.lessonId === cleanLesson)) {
      return true;
    }
  }
  for (const pathObj of Object.values(PATH_CATALOG)) {
    if (pathObj.level2Specialty.lessonId === cleanLesson && ['read', 'quiz', 'fsrs', 'audit'].includes(cleanType)) {
      return true;
    }
    if (pathObj.level3Specialty.lessonId === cleanLesson && ['read', 'quiz', 'fsrs', 'audit'].includes(cleanType)) {
      return true;
    }
  }
  return false;
}

export function computeCurriculumProgress({
  activePathId = 'uso_cotidiano',
  ledgerRows = [],
  milestoneRows = []
} = {}) {
  const safePathId = PATH_CATALOG[activePathId] ? activePathId : 'uso_cotidiano';
  const pathMeta = PATH_CATALOG[safePathId];
  const completedLedger = new Set(
    (ledgerRows || []).map((r) => `${String(r.lesson_id || r.lessonId)}:${String(r.event_type || r.eventType)}`)
  );
  const completedMilestones = new Set(
    (milestoneRows || []).map((m) => `${String(m.path_id || m.pathId)}:${Number(m.milestone_index || m.milestoneIndex)}`)
  );

  const levels = {};
  let universalCompleted = 0;
  let universalTotal = 0;
  let pathCompleted = 0;
  let pathTotal = 0;

  for (const lvl of [1, 2, 3]) {
    const univNodes = UNIVERSAL_NODES_BY_LEVEL[lvl].map((n) => ({
      scope: 'universal',
      key: `${n.lessonId}:${n.eventType}`,
      lessonId: n.lessonId,
      eventType: n.eventType,
      titleEs: n.titleEs,
      completed: completedLedger.has(`${n.lessonId}:${n.eventType}`)
    }));

    const pathNodes = [];
    if (lvl === 2) {
      pathNodes.push({
        scope: 'path',
        kind: 'lesson',
        key: `${pathMeta.level2Specialty.lessonId}:${pathMeta.level2Specialty.eventType}`,
        lessonId: pathMeta.level2Specialty.lessonId,
        eventType: pathMeta.level2Specialty.eventType,
        titleEs: pathMeta.level2Specialty.titleEs,
        completed: completedLedger.has(`${pathMeta.level2Specialty.lessonId}:${pathMeta.level2Specialty.eventType}`)
      });
      pathNodes.push({
        scope: 'path',
        kind: 'milestone',
        key: `milestone:${safePathId}:2`,
        pathId: safePathId,
        milestoneIndex: 2,
        titleEs: `Hito Nivel 2 (${pathMeta.titleEs})`,
        completed: completedMilestones.has(`${safePathId}:2`)
      });
    } else if (lvl === 3) {
      pathNodes.push({
        scope: 'path',
        kind: 'lesson',
        key: `${pathMeta.level3Specialty.lessonId}:${pathMeta.level3Specialty.eventType}`,
        lessonId: pathMeta.level3Specialty.lessonId,
        eventType: pathMeta.level3Specialty.eventType,
        titleEs: pathMeta.level3Specialty.titleEs,
        completed: completedLedger.has(`${pathMeta.level3Specialty.lessonId}:${pathMeta.level3Specialty.eventType}`)
      });
      pathNodes.push({
        scope: 'path',
        kind: 'milestone',
        key: `milestone:${safePathId}:3`,
        pathId: safePathId,
        milestoneIndex: 3,
        titleEs: `Hito Integrador Nivel 3 (${pathMeta.titleEs})`,
        completed: completedMilestones.has(`${safePathId}:3`)
      });
    }

    const uDone = univNodes.filter((n) => n.completed).length;
    const pDone = pathNodes.filter((n) => n.completed).length;
    universalCompleted += uDone;
    universalTotal += univNodes.length;
    pathCompleted += pDone;
    pathTotal += pathNodes.length;

    const allNodes = [...univNodes, ...pathNodes];
    const doneCount = uDone + pDone;
    const totalCount = allNodes.length;
    const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;
    const missingItems = allNodes.filter((n) => !n.completed).map((n) => n.key);

    levels[lvl] = {
      level: lvl,
      pct,
      completedCount: doneCount,
      totalCount,
      universalCompleted: uDone,
      universalTotal: univNodes.length,
      pathCompleted: pDone,
      pathTotal: pathNodes.length,
      eligibleForCertificate: missingItems.length === 0,
      missingItems,
      nodes: allNodes
    };
  }

  const combinedTotal = universalTotal + pathTotal;
  const combinedCompleted = universalCompleted + pathCompleted;
  const overallPct = combinedTotal > 0 ? Math.round((combinedCompleted / combinedTotal) * 100) : 0;

  return {
    activePathId: safePathId,
    activePathTitleEs: pathMeta.titleEs,
    overallPct,
    universalCompleted,
    universalTotal,
    pathCompleted,
    pathTotal,
    level1Pct: levels[1].pct,
    level2Pct: levels[2].pct,
    level3Pct: levels[3].pct,
    levels
  };
}
