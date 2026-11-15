---
canon_id: "CANON_AUTONOMOUS_CURRICULUM_ENGINEERING_2026"
title: "Ingeniería Curricular Autónoma, Triangulación Multimedia, Stack Open-Source y Evaluación Dual"
domain: "ai_academy"
approval_status: "APPROVED_BY_CTO"
approved_by: "CTO"
approved_at: "2026-11-15T04:25:26.339Z"
epistemic_tier_target: "TIER_1_SOTA_2026"
language_register: "es-neutral-tu"
sources:
  - claim_id: "C4-BIGGS-01"
    claim_summary: "El Alineamiento Constructivo de John Biggs (1996) exige coherencia directa entre los resultados de aprendizaje esperados, las actividades de enseñanza-aprendizaje y las tareas de evaluación."
    url: "https://api.crossref.org/works/10.1007/BF00138871"
    section_or_quote: "Biggs, J. (1996). Enhancing teaching through constructive alignment. Higher Education, 32(3), 347-364."
    http_status: 200
    verified_at: "2026-11-15"
    accessed_at: "2026-11-15T04:11:05.426Z"
  - claim_id: "C4-MERRILL-02"
    claim_summary: "Los Primeros Principios de Instrucción de M. David Merrill (2002) demuestran que el aprendizaje efectivo se centra en tareas reales y progresa por cuatro fases: activación, demostración, aplicación e integración."
    url: "https://api.crossref.org/works/10.1007/BF02505024"
    section_or_quote: "Merrill, M. D. (2002). First principles of instruction. Educational Technology Research and Development, 50(3), 43-59."
    http_status: 200
    verified_at: "2026-11-15"
    accessed_at: "2026-11-15T04:11:06.124Z"
  - claim_id: "C4-GAGNE-03"
    claim_summary: "Los Nueve Eventos de Instrucción de Robert Gagné articulan las condiciones internas y externas del aprendizaje desde captar la atención y activar saberes previos hasta evaluar el desempeño y promover la transferencia."
    url: "https://api.crossref.org/works/10.1037/h0022886"
    section_or_quote: "Gagné, R. M. instructional conditions and structured sequence of learning events supporting retention and transfer."
    http_status: 200
    verified_at: "2026-11-15"
    accessed_at: "2026-11-15T04:11:06.292Z"
  - claim_id: "C4-KST-04"
    claim_summary: "La Teoría de Espacios de Conocimiento (Doignon y Falmagne, 1999) modela formalmente el dominio mediante relaciones de precedencia (grafos acíclicos de prerrequisitos) y estados de conocimiento factibles."
    url: "https://api.crossref.org/works/10.1007/978-3-642-58625-5"
    section_or_quote: "Doignon, J.-P., & Falmagne, J.-C. (1999). Knowledge Spaces. Springer-Verlag Berlin Heidelberg."
    http_status: 200
    verified_at: "2026-11-15"
    accessed_at: "2026-11-15T04:11:06.460Z"
  - claim_id: "C4-UNESCO-05"
    claim_summary: "UNESCO estructura la progresión formativa en IA en tres etapas (Acquire, Deepen, Create) integrando mentalidad centrada en el ser humano, ética, técnicas de IA y diseño de sistemas."
    url: "https://www.unesco.org/en/articles/ai-competency-framework-students"
    section_or_quote: "UNESCO AI competency framework for students: Acquire, Deepen, and Create progression levels."
    http_status: 200
    verified_at: "2026-11-15"
    accessed_at: "2026-11-15T04:11:06.630Z"
  - claim_id: "C4-WCAG22-06"
    claim_summary: "WCAG 2.2 exige alternativas textuales y subtítulos/transcripciones para medios temporales pregrabados a fin de garantizar equivalencia sensorial."
    url: "https://www.w3.org/TR/WCAG22/"
    section_or_quote: "W3C WCAG 2.2 Guideline 1.2 Time-based Media: captions and accessible alternatives for prerecorded audio/video."
    http_status: 200
    verified_at: "2026-11-15"
    accessed_at: "2026-11-15T04:11:07.997Z"
  - claim_id: "C4-LEY26653-07"
    claim_summary: "La Ley 26.653 (Argentina) exige accesibilidad integral de contenidos multimedia y educativos publicados en la web."
    url: "https://www.argentina.gob.ar/normativa/nacional/ley-26653-175694/texto"
    section_or_quote: "Ley 26.653 — Accesibilidad de la Información en las Páginas Web (República Argentina)."
    http_status: 200
    verified_at: "2026-11-15"
    accessed_at: "2026-11-15T04:11:08.179Z"
---

# Canon: Ingeniería Curricular Autónoma, Triangulación Multimedia, Stack Open-Source y Evaluación Dual

**Alcance:** Protocolo maestro para que el equipo de agentes diseñe de forma autónoma y auditable el plan de estudios completo en 3 niveles (`Principiante`, `Intermedio`, `Avanzado`), triangule de 2 a 3 videos complementarios por lección, asigne pilas de software Open-Source por etapa, adapte las actividades según `academy_learner_archetypes` y construya evaluaciones duales (texto + anclas verificadas de video) (`approval_status: PENDING_CTO_REVIEW`).

---

## 1. Síntesis Curricular Autónoma: Biggs + Merrill + Gagné + Grafos `DAG`

Ninguna lección se redacta de forma improvisada ni copiando el índice de un único curso externo (`Clean-Room`). El diseño autónomo combina cuatro pilares formales:

1. **Alineamiento Constructivo de Biggs (`[C4-BIGGS-01]`):**
   - Cada nodo declara primero su **Resultado de Aprendizaje Observable (`ILO`)** con verbo activo en español neutro (*"Al terminar esta lección podrás detectar tres señales de alucinación en un resumen..."*).
   - El micro-control interactivo ejercita exactamente ese mismo verbo, y el cuestionario final verifica ese mismo desempeño sin preguntas capciosas ajenas a la práctica.
2. **Primeros Principios de Instrucción de Merrill (`[C4-MERRILL-02]`):**
   - **Centrado en Tareas Reales:** Toda unidad parte de una misión auténtica (organizar estudio, redactar con criterio, automatizar un flujo o crear una obra multimedia).
   - **Ciclo de 4 Fases:** *Activación* (conectar con una experiencia cotidiana previa) -> *Demostración* (mostrar caso resuelto y video puntual) -> *Aplicación* (práctica guiada con pistas socráticas) -> *Integración* (aplicar lo aprendido a un hito propio).
3. **Condiciones y 9 Eventos de Gagné Condensados (`[C4-GAGNE-03]`):**
   - `[ASUNCIÓN: condensación operativa de los 9 eventos clásicos de Gagné dentro de la anatomía de 5 tiempos de la Academia]`
   - Eventos 1–3 (*atención, objetivo claro y evocación previa*) ocurren en el **Tiempo 1**; Eventos 4–5 (*presentación del estímulo y guía de aprendizaje*) en los **Tiempos 2 y 3**; Eventos 6–7 (*desempeño activo y retroalimentación informativa*) en el **Tiempo 4 y pistas socráticas**; Eventos 8–9 (*evaluación del dominio y retención/transferencia*) en el **Tiempo 5 + semillas `ts-fsrs` + Proyecto Jefe**.
4. **Grafos Acíclicos de Espacios de Conocimiento (`DAG` — `[C4-KST-04]`, `[C4-UNESCO-05]`):**
   - El currículo completo forma un **grafo dirigido acíclico (`DAG`)** validado topológicamente (`0` ciclos, `0` nodos huérfanos).
   - **Prohibición de Saltos de Nivel:** Ningún nodo de etapa `Create` (`Nivel 3`) puede depender directamente de un nodo `Acquire` (`Nivel 1`) sin al menos un nodo puente `Deepen` (`Nivel 2`) que consolide los prerrequisitos operativos (`maxJumpDelta = 1`).

---

## 2. Triangulación Multimedia Sin Redundancia (2 a 3 Videos por Lección)

Para superar el sesgo de una sola explicación y enriquecer la comprensión multimodal sin aburrir al estudiante `[ASUNCIÓN: regla de curaduría del estudio de 2 a 3 videos complementarios por lección]`:

1. **Roles Complementarios No Repetitivos:**
   - **Video 1 — Intuición Visual (`conceptual_intuition`):** Explica *qué es y por qué importa* mediante diagramas o analogías visuales claras (`2–8 min` ideales).
   - **Video 2 — Demostración Práctica (`hands_on_demo`):** Muestra en pantalla *cómo ejecutar el flujo real* paso a paso con herramientas gratuitas o de código abierto.
   - **Video 3 Opcional — Mirada Crítica o Caso Real (`critical_edge_case`):** Analiza límites reales, errores frecuentes, ética, privacidad o arquitectura avanzada.
2. **Higiene Técnica, Legal y de Accesibilidad (`[C4-WCAG22-06]`, `[C4-LEY26653-07]`):**
   - Solo se admiten orígenes aprobados en `data/academy/project_charter.json` (`https://www.youtube-nocookie.com`, `https://archive.org`, `https://upload.wikimedia.org`) con `embeddable = 1` y `http_status = 200` verificados en `academy_videos`.
   - Prioridad estricta de idioma: `audio_es` > `sub_es_nativo` > `sub_es_autotraducido` revisado.
   - Cada video incluye una **ficha textual equivalente de 3 puntos clave** y marcas de tiempo (`start_sec`–`end_sec`) para que cualquier persona con hipoacusia, lector de pantalla o datos móviles limitados acceda al 100% del contenido pedagógico.

---

## 3. Evaluación Dual: Prosa + Anclas Verificadas de Video

El micro-cuestionario y los controles de dominio integran **evaluación dual**:
1. **Ítems de Comprensión y Aplicación sobre la Lección Interactiva:** Evalúan el concepto central, el micro-control manipulado y el juicio crítico de privacidad/veracidad.
2. **Ítems Anclados a Evidencia de Video (`Video-Anchored Items`):**
   - Conectan el texto con un instante concreto (`MM:SS` -> `start_sec`..`end_sec`) de uno de los videos triangulados (p. ej.: *"En la demostración del minuto 02:15, ¿por qué el autor separa los datos de prueba antes de evaluar el resultado?"*).
   - **Compuerta Anti-Alucinación (`Fail-Closed`):** Queda **terminantemente prohibido** formular preguntas sobre el contenido interno de un video si su fila en `academy_videos` tiene `anchors_status = 'UNVERIFIED'`. Solo los videos con `anchors_status` en `['ASR_VERIFIED', 'MANUAL_VERIFIED']` y `transcript_anchors_json` poblado son elegibles (`isVideoQuizEligible === true`).
   - Toda pregunta anclada a video muestra un desplegable accesible *"Leer transcripción verificada del fragmento (`MM:SS`)"* para no excluir a usuarios sin audio (`[C4-WCAG22-06]`, `[C4-LEY26653-07]`).

---

## 4. Pilas de Tecnologías Open-Source y Gratuitas por Etapa

Cada nivel presenta explícitamente un **mapa de herramientas Open-Source y gratuitas sin tarjeta** (`academy_tools` con paridad obligatoria `free_alternative_id` frente a cualquier referencia comercial):

| Etapa Curricular | Foco Formativo | Tecnologías Open-Source / Estándares Abiertos de Referencia |
| :--- | :--- | :--- |
| **Nivel 1 (`Acquire` — Principiante)** | Comprensión segura, redacción clara, verificación y privacidad básica sin instalar nada complejo. | Interfaces abiertas de modelos con pesos abiertos (`Llama`, `Qwen`, `Gemma`, `Mistral`), formato abierto `Markdown`, herramientas locales/web abiertas de transcripción (`Whisper`), limpieza de metadatos y listas abiertas de verificación factual. |
| **Nivel 2 (`Deepen` — Intermedio)** | Flujos repetibles, ejecución local opcional, edición creativa abierta y automatización guiada. | `Ollama` (`MIT`), `Open WebUI` / `LibreChat` (`MIT`), flujos visuales con software abierto (`Activepieces` edición MIT / scripts abiertos en `Node.js` o `Python`), suite creativa libre (`Blender` GPL, `Krita` GPL, `Audacity` GPL, `Inkscape` GPL). |
| **Nivel 3 (`Create` — Avanzado)** | Construcción de sistemas auditables, RAG local, evaluación reproducible y despliegue soberano. | `SQLite` + `FTS5` (dominio público), `Valibot` (`MIT`), evaluación sistemática de prompts/modelos (`promptfoo` `MIT`), máquinas de estado deterministas (`XState v5` `MIT`), `Astro` (`MIT`), estándares `W3C DTCG` / `OKLCH` y `WebCrypto API`. |

---

## 5. Adaptación Determinista según `academy_learner_archetypes`

Toda guía práctica (`Ruta Hacer`) y cada hito del Proyecto Jefe ofrece variantes adaptadas a los **4 arquetipos reales de estudiante** registrados en `data/academy/archetypes.json`:

1. **`pc_basica_zero_cost` (`4–8 GB RAM`, sin GPU dedicada, presupuesto `$0`):**
   - Nunca exige descargas multimillonarias ni compilaciones pesadas; utiliza 100% navegador, niveles gratuitos sin tarjeta y archivos ligeros.
2. **`pc_media_hybrid_free` (`16 GB RAM`, laptop estándar de estudio o trabajo):**
   - Combina herramientas web gratuitas con modelos cuantizados livianos (`1B–7B Q4` en CPU/iGPU) y automatizaciones locales ligeras.
3. **`gpu_local_sovereign` (`>= 8 GB VRAM`, escritorio o estación local):**
   - Desbloquea guías opcionales de soberanía total `100% offline` (inferencia local rápida, generación visual/sonora abierta en equipo propio y privacidad absoluta en disco).
4. **`creador_multimedia_oss` (Diseño, video, cómic, animación y música):**
   - Orienta ejemplos, videos triangulados y prácticas hacia flujos creativos con software libre (`Blender`, `Krita`, `Audacity`, SVG/Canvas/WebAudio) respetando autoría humana y licencias abiertas.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SOTA_RAG_ARCHITECTURES_AND_TOOLS_2026]] · [[CURATED_MASTER_BOOKS_AND_COURSES_2026]] · [[CANON_SOFTWARE_ENGINEERING_AT_GOOGLE]] · [[CANON_HARNESS_ENGINEERING_INTEGRAL_2026]] · #ai_academy
