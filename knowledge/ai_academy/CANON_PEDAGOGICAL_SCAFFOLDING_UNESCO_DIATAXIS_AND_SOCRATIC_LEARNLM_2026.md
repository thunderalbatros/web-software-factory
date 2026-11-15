---
canon_id: "CANON_PEDAGOGICAL_SCAFFOLDING_2026"
title: "Andamiaje Pedagógico SOTA — UNESCO, Diátaxis, Carga Cognitiva y Tutoría Socrática LearnLM"
domain: "ai_academy"
approval_status: "PENDING_CTO_REVIEW"
epistemic_tier_target: "TIER_1_SOTA_2026"
language_register: "es-neutral-tu"
sources:
  - claim_id: "C1-UNESCO-01"
    claim_summary: "UNESCO estructura el desarrollo de competencias en IA para estudiantes en tres niveles progresivos: Acquire (Adquirir), Deepen (Profundizar) y Create (Crear)."
    url: "https://www.unesco.org/en/articles/ai-competency-framework-students"
    section_or_quote: "AI competency framework for students: three progression levels (Understand/Acquire, Apply/Deepen, Create) across human-centred mindset, ethics, techniques and system design."
    http_status: 200
    verified_at: "2026-11-15"
    accessed_at: "2026-11-15T02:40:19.953Z"
  - claim_id: "C1-EU-AI-ACT-02"
    claim_summary: "El Reglamento Europeo de IA (Reglamento UE 2024/1689, Artículo 4) establece obligaciones de alfabetización en IA (AI Literacy) para comprender capacidades, límites, riesgos y supervisión humana."
    url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai"
    section_or_quote: "EU AI Act regulatory framework: AI literacy provisions (Article 4, applicable from February 2025) and risk-aware human oversight."
    http_status: 200
    verified_at: "2026-11-15"
    accessed_at: "2026-11-15T02:40:41.829Z"
  - claim_id: "C1-OECD-03"
    claim_summary: "Los Principios de IA de la OCDE exigen transparencia, explicabilidad, robustez, privacidad y supervisión centrada en las personas."
    url: "https://oecd.ai/en/ai-principles"
    section_or_quote: "OECD AI Principles (updated May 2024): inclusive growth, human-centered values, transparency and explainability, robustness, security and accountability."
    http_status: 200
    verified_at: "2026-11-15"
    accessed_at: "2026-11-15T02:40:42.447Z"
  - claim_id: "C1-DIATAXIS-04"
    claim_summary: "Diátaxis separa la documentación y enseñanza técnica según la necesidad cognitiva del usuario entre estudio/comprensión (Tutorials/Explanation) y ejecución práctica orientada a metas (How-to/Reference)."
    url: "https://diataxis.fr/"
    section_or_quote: "Diátaxis structures documentation around four distinct user needs along two axes: study vs work (action) and acquisition vs application."
    http_status: 200
    verified_at: "2026-11-15"
    accessed_at: "2026-11-15T02:40:43.557Z"
  - claim_id: "C1-SWELLER-05"
    claim_summary: "La Teoría de la Carga Cognitiva de John Sweller demuestra que la memoria de trabajo es limitada y que los ejemplos resueltos graduales reducen la carga extrínseca frente al ensayo-error sin guía."
    url: "https://api.crossref.org/works/10.1207/s15516709cog1202_4"
    section_or_quote: "Sweller, J. (1988). Cognitive Load During Problem Solving: Effects on Learning. Cognitive Science, 12(2), 257-285."
    http_status: 200
    verified_at: "2026-11-15"
    accessed_at: "2026-11-15T02:40:43.843Z"
  - claim_id: "C1-LEARNLM-06"
    claim_summary: "LearnLM fundamenta la tutoría generativa efectiva en aprendizaje activo, gestión de carga cognitiva, adaptación al nivel del estudiante, estímulo de la curiosidad y profundización metacognitiva sin entregar la solución directa de inmediato."
    url: "https://arxiv.org/abs/2412.16429"
    section_or_quote: "arXiv:2412.16429 — LearnLM: Improving Gemini for Learning (pedagogical instruction following: inspire active learning, manage cognitive load, adapt to learner, stimulate curiosity, deepen metacognition)."
    http_status: 200
    verified_at: "2026-11-15"
    accessed_at: "2026-11-15T02:40:44.332Z"
  - claim_id: "C1-BLOOM-07"
    claim_summary: "La revisión de la Taxonomía de Bloom por Krathwohl (2002) organiza los procesos cognitivos desde recordar y comprender hasta aplicar, analizar, evaluar y crear."
    url: "https://api.crossref.org/works/10.1207/s15430421tip4104_2"
    section_or_quote: "Krathwohl, D. R. (2002). A Revision of Bloom's Taxonomy: An Overview. Theory Into Practice, 41(4), 212-218."
    http_status: 200
    verified_at: "2026-11-15"
    accessed_at: "2026-11-15T02:40:44.357Z"
---

# Canon: Andamiaje Pedagógico SOTA — UNESCO, Diátaxis, Carga Cognitiva y Tutoría Socrática LearnLM

**Alcance:** Arquitectura curricular de 3 niveles para la Academia Pública de IA en Español Neutro (`tú`), libre de jerga no introducida y alineada con el marco de competencias de IA de la UNESCO, el Artículo 4 de Alfabetización en IA del Reglamento Europeo (`UE 2024/1689`) y los Principios de IA de la OCDE (`approval_status: PENDING_CTO_REVIEW`).

---

## 1. Matriz Progresiva de 3 Niveles (UNESCO `Acquire -> Deepen -> Create`)

Toda ruta temática del sitio (`Uso Cotidiano`, `Trabajo y Estudio`, `Crear Arte/Video/Web/Código`, `Emprender y Automatizar`) se organiza en tres peldaños verificables (`[C1-UNESCO-01]`):

1. **Nivel 1 — Principiante (`Acquire` / Comprender y Usar con Seguridad):**
   - **Objetivo:** Que cualquier persona (incluso sin base informática previa) logre resultados útiles en pocos minutos, reconozca alucinaciones y proteja sus datos personales.
   - **Regla de Cero Jerga Cruda:** Prohibido usar términos como *token*, *embedding*, *temperatura*, *context window*, *RAG* o *fine-tuning* sin antes presentar una **analogía cotidiana familiar** (ej.: *"un modelo de lenguaje funciona como un autocompletado muy leído que calcula qué palabra encaja mejor a continuación, no como una enciclopedia infalible"*).
2. **Nivel 2 — Intermedio (`Deepen` / Estructurar y Combinar Flujos):**
   - **Objetivo:** Diseñar instrucciones estructuradas con contexto, criterios de calidad y ejemplos (*few-shot*), encadenar herramientas gratuitas/abiertas sin código pesado y auditar salidas con listas de verificación.
   - **Introducción progresiva de vocabulario:** Cada término técnico se declara en `introduced_terms` y se ancla primero a un control visual interactivo antes de exigir su uso autónomo.
3. **Nivel 3 — Avanzado (`Create` / Construir Sistemas Reales y Éticos):**
   - **Objetivo:** Construir flujos reproducibles, agentes supervisados, bases de conocimiento propias, automatizaciones y el **Proyecto Jefe (*Boss Project*)** elegido por el estudiante con software libre o niveles gratuitos verificados.

### Pilares Transversales de Alfabetización Crítica (`UE AI Act Art. 4` + `OCDE`)
Cada módulo incorpora obligatoriamente al menos dos de estos cuatro hábitos críticos (`[C1-EU-AI-ACT-02]`, `[C1-OECD-03]`):
- **Verificación factual:** Cómo contrastar fechas, citas, cálculos y afirmaciones médicas/legales frente a fuentes primarias.
- **Detección de sesgos y límites estadísticos:** Por qué un modelo suena seguro incluso cuando se equivoca.
- **Privacidad y minimización de datos:** Qué datos jamás debes pegar en un chat externo (documentos de identidad, claves, historias clínicas, contratos confidenciales) y cómo desactivar el entrenamiento con tus conversaciones.
- **Autoría responsable y criterio humano (*Human-in-the-Loop*):** Usar la IA para amplificar tu comprensión y oficio, nunca para sustituir tu juicio.

---

## 2. Separación Estructural `Diátaxis` (*Ruta Entender* vs. *Ruta Hacer*)

Para evitar frustrar tanto a quien busca comprender los fundamentos como a quien necesita resolver una tarea concreta hoy, cada unidad separa explícitamente dos modos inspirados en `Diátaxis` (`[C1-DIATAXIS-04]`):

| Modo en la Academia | Equivalencia `Diátaxis` | Propósito Cognitivo | Formato de Entrega |
| :--- | :--- | :--- | :--- |
| **Ruta Entender (`Learn`)** | *Tutorial + Explanation* | Construir intuición duradera y modelos mentales libres de cajas negras. | Analogía cotidiana + diagrama/control interactivo en vivo + comprobación conceptual. |
| **Ruta Hacer (`Build`)** | *How-To Guide + Reference* | Resolver un problema real paso a paso con herramientas gratuitas/abiertas hoy mismo. | Receta accionable numerada + plantilla copiable + alternativa 100% gratuita sin tarjeta. |

---

## 3. Ley de Carga Cognitiva de Sweller y Desvanecimiento de Ejemplos

Siguiendo la Teoría de la Carga Cognitiva de John Sweller (`[C1-SWELLER-05]`):
1. **Tope de Conceptos Nuevos por Lección:** `[ASUNCIÓN: presupuesto editorial interno derivado de Sweller]` Máximo **3 conceptos nuevos** por lección. Si un tema requiere 6 conceptos, se divide en 2 lecciones encadenadas sin saltos de nivel en el grafo curricular (`DAG`).
2. **Bloques Breves de Lectura (`<= 110` palabras):** `[ASUNCIÓN: límite operativo de diseño instruccional para lectura en pantalla]` Ningún párrafo continuo supera las **110 palabras** sin intercalar un ejemplo visual, una comparación *Antes vs. Después*, un control interactivo o una micro-pregunta activa.
3. **Andamiaje con Desvanecimiento (*Worked-Example Fading*):**
   - **Paso A (Ejemplo Resuelto):** Muestra el caso completo comentado línea por línea.
   - **Paso B (Completar Huecos):** El estudiante ajusta o completa únicamente la pieza clave en un control guiado.
   - **Paso C (Práctica Autónoma):** El estudiante resuelve un reto equivalente aplicable a su vida, estudio o proyecto.

---

## 4. Evaluación Revisada de Bloom y Tutoría Socrática (`LearnLM`)

Cada lección cierra con un micro-cuestionario de **3 preguntas** alineadas a la Taxonomía de Bloom revisada (`[C1-BLOOM-07]`):
1. **Pregunta 1 (Recordar / Comprender):** Verifica que la intuición central quedó clara sin memorización mecánica.
2. **Pregunta 2 (Aplicar):** Presenta una situación cotidiana o laboral donde debes elegir o ajustar el enfoque adecuado.
3. **Pregunta 3 (Analizar / Evaluar — Pensamiento Crítico):** Muestra una respuesta generada por IA con un error sutil, sesgo o riesgo de privacidad para que detectes el fallo.

### Protocolo Socrático Determinista de 3 Pistas (`$0.00` Servidor)
Inspirado en los principios pedagógicos de **Google LearnLM** (`[C1-LEARNLM-06]`) y adaptado a ejecución estática de costo cero `[ASUNCIÓN: adaptación estática determinista de 3 intentos precompilada en JSON]`, cuando eliges una opción incorrecta el sistema **jamás revela la respuesta correcta en el primer fallo**:
- **Intento 1 -> Pista 1 (Orientación Conceptual):** Formula una pregunta breve que dirige tu atención al dato clave omitido (*"Fíjate en qué información sensible aparece en la segunda frase..."*).
- **Intento 2 -> Pista 2 (Contraste Dirigido):** Descarta el error conceptual específico (`misconception_id`) y reduce el espacio de decisión con una analogía concreta.
- **Intento 3 -> Pista 3 + Solución Razonada:** Explica paso a paso por qué la opción correcta funciona y por qué las alternativas fallaban, habilitando tarjetas de repaso espaciado.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SOTA_RAG_ARCHITECTURES_AND_TOOLS_2026]] · [[CURATED_MASTER_BOOKS_AND_COURSES_2026]] · [[CANON_SOFTWARE_ENGINEERING_AT_GOOGLE]] · [[CANON_HARNESS_ENGINEERING_INTEGRAL_2026]] · #ai_academy
