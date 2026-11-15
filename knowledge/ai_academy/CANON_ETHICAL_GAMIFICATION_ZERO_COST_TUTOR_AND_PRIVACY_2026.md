---
canon_id: "CANON_ETHICAL_GAMIFICATION_2026"
title: "Gamificación Ética sin Patrones Oscuros, Tutor de Costo Cero y Soberanía Local-First"
domain: "ai_academy"
approval_status: "APPROVED_BY_CTO"
approved_by: "CTO"
approved_at: "2026-11-15T04:25:26.339Z"
epistemic_tier_target: "TIER_1_SOTA_2026"
language_register: "es-neutral-tu"
sources:
  - claim_id: "C2-SDT-01"
    claim_summary: "La Teoría de la Autodeterminación (Ryan y Deci, 2000) establece que la motivación intrínseca sostenible depende de tres necesidades psicológicas básicas: autonomía, competencia y relación, evitando presiones coercitivas externas."
    url: "https://selfdeterminationtheory.org/theory/"
    section_or_quote: "Self-Determination Theory (SDT): autonomy, competence, and relatedness support high-quality intrinsic motivation and engagement."
    http_status: 200
    verified_at: "2026-11-15"
    accessed_at: "2026-11-15T04:11:23.817Z"
  - claim_id: "C2-SDT-DOI-02"
    claim_summary: "Las recompensas controladoras o punitivas erosionan la motivación intrínseca frente a la retroalimentación informativa orientada al dominio."
    url: "https://api.crossref.org/works/10.1037/0003-066X.55.1.68"
    section_or_quote: "Ryan, R. M., & Deci, E. L. (2000). Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being. American Psychologist, 55(1), 68-78."
    http_status: 200
    verified_at: "2026-11-15"
    accessed_at: "2026-11-15T04:11:24.427Z"
  - claim_id: "C2-TSFSRS-03"
    claim_summary: "El paquete open-source ts-fsrs implementa en TypeScript/ESM el algoritmo Free Spaced Repetition Scheduler (FSRS) ejecutable íntegramente en el cliente sin servidor."
    url: "https://github.com/open-spaced-repetition/ts-fsrs"
    section_or_quote: "open-spaced-repetition/ts-fsrs: TypeScript implementation of Free Spaced Repetition Scheduler supporting ES modules in browser and Node."
    http_status: 200
    verified_at: "2026-11-15"
    accessed_at: "2026-11-15T04:11:24.908Z"
  - claim_id: "C2-VALIBOT-04"
    claim_summary: "Valibot provee validación modular de esquemas estructurales con tree-shaking extremo apta para ejecución en navegador y Edge."
    url: "https://github.com/fabian-hiller/valibot"
    section_or_quote: "open-circle/valibot: modular and type-safe schema library designed for minimal bundle size."
    http_status: 200
    verified_at: "2026-11-15"
    accessed_at: "2026-11-15T04:11:25.593Z"
  - claim_id: "C2-WEBCRYPTO-05"
    claim_summary: "La API estándar SubtleCrypto del navegador provee primitivas criptográficas nativas como PBKDF2 y AES-GCM sin dependencias externas."
    url: "https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto"
    section_or_quote: "MDN Web APIs SubtleCrypto: deriveKey (PBKDF2) and encrypt/decrypt (AES-GCM) in secure browser contexts."
    http_status: 200
    verified_at: "2026-11-15"
    accessed_at: "2026-11-15T04:11:26.533Z"
  - claim_id: "C2-LEY25326-06"
    claim_summary: "La Ley Nacional 25.326 de Protección de los Datos Personales (Argentina) regula el consentimiento informado, finalidad, seguridad y derechos de acceso, rectificación y supresión."
    url: "https://www.argentina.gob.ar/normativa/nacional/ley-25326-64790/texto"
    section_or_quote: "Ley 25.326 — Protección de los Datos Personales (República Argentina): principios generales, licitud, seguridad de los datos y derechos de los titulares."
    http_status: 200
    verified_at: "2026-11-15"
    accessed_at: "2026-11-15T04:11:26.605Z"
---

# Canon: Gamificación Ética sin Patrones Oscuros, Tutor de Costo Cero y Soberanía Local-First

**Alcance:** Sistema de motivación basado en dominio real (*Self-Determination Theory*), repetición espaciada científica en el navegador (`ts-fsrs`), tutor diagnóstico de costo `$0.00 USD` en servidor con puente opcional `BYOK` cifrado localmente y cumplimiento de la `Ley 25.326` (Argentina) (`approval_status: PENDING_CTO_REVIEW`).

---

## 1. Gamificación Ética Centrada en Competencia y Autonomía (`SDT`)

Basado en la **Teoría de la Autodeterminación** de Ryan y Deci (`Autonomía`, `Competencia` y `Propósito` — `[C2-SDT-01]`, `[C2-SDT-DOI-02]`):

1. **Prohibición Estricta de Patrones Oscuros (*Zero Dark Patterns*):**
   - Prohibido castigar al estudiante con mensajes culpabilizadores (*confirm-shaming*), temporizadores artificiales de ansiedad, vidas limitadas que bloqueen la lectura o muros de pago para mantener rachas.
   - **Pausa Consciente de Estudio:** Todo usuario dispone de un botón libre de costo para pausar su racha (*"Pausar racha por descanso o exámenes"*) sin perder su historial ni recibir reproches.
2. **Puntos de Dominio (*Mastery XP*), Nunca por Clics Vacíos:**
   - `[ASUNCIÓN: ponderación numérica de producto definida por el estudio para priorizar práctica activa sobre lectura pasiva]`
   - Completar lectura pasiva: `10 XP`.
   - Resolver correctamente el micro-cuestionario de aplicación y juicio crítico: `35 XP`.
   - Completar sesión de repaso espaciado (`ts-fsrs` — `[C2-TSFSRS-03]`): `30 XP`.
   - Auditar y corregir una alucinación o fuga de privacidad en el simulador: `+20 XP`.
   - Entregar cada uno de los 3 hitos verificables del **Proyecto Jefe (*Boss Project*)**: `150 XP` por hito (`450 XP` totales + insignia verificable exportable).
3. **Árbol de Habilidades Visual y Compañero Vectorial Sobrio:**
   - El progreso se representa como un **mapa constelación / árbol de habilidades** claro (`Uso Cotidiano`, `Trabajo y Estudio`, `Crear`, `Emprender`).
   - El compañero de estudio es un emblema geométrico en **SVG puro** (`[ASUNCIÓN: presupuesto técnico interno < 4 KB sin librerías pesadas]`) con estados discretos (`curioso`, `analizando`, `celebración sutil`, `en descanso`), respetando `prefers-reduced-motion: reduce`.

---

## 2. Arquitectura Híbrida del Tutor de Costo `$0.00 USD` en Servidor

Para que la plataforma escale a miles de estudiantes con **costo marginal de servidor exactamente igual a `$0.00 USD`**:

### Capa A — Motor Diagnóstico Precompilado en Cliente (100% Gratuito, `0 ms`, Offline-Ready)
- Durante la construcción del sitio, los agentes pre-generan (vía `Vertex AI Batch` al `50%` de descuento + caché SHA-256) árboles diagnósticos validados con `Valibot` (`[C2-VALIBOT-04]`) para cada ejercicio.
- En el navegador, un evaluador ligero en JavaScript compara tu selección o estructura de prompt contra reglas deterministas y despliega al instante las **3 pistas socráticas** específicas para el error conceptual detectado, sin enviar datos a ningún servidor externo.

### Capa B — Puente Opcional `BYOK` (*Bring Your Own Key*) 100% en Navegador
- Para quienes deseen practicar conversación abierta ilimitada en ejercicios avanzados, se ofrece un conector opcional donde puedes usar una clave gratuita sin tarjeta (p. ej., Google AI Studio o Groq) o un servidor local propio (`Ollama` en `http://localhost:11434`):
  1. La clave se cifra en tu propio navegador usando **`WebCrypto SubtleCrypto` (`PBKDF2` + `AES-GCM` de 256 bits — `[C2-WEBCRYPTO-05]`)** y se guarda únicamente en tu `IndexedDB` local con opción de sesión efímera en memoria.
  2. La petición viaja **directamente desde tu navegador al proveedor elegido**; jamás pasa por servidores de la Academia ni queda registrada en bases de datos remotas.
  3. Un botón visible *"Borrar llave y datos locales ahora"* destruye de inmediato las entradas en `IndexedDB` y `localStorage`.

---

## 3. Soberanía de Datos *Local-First* y Cumplimiento `Ley 25.326` (Argentina)

En cumplimiento de los principios de minimización, finalidad y autodeterminación informativa de la **Ley 25.326 de Protección de los Datos Personales** (`[C2-LEY25326-06]`):
1. **Cero Registro Obligatorio:** El **100% de las lecciones, controles interactivos, videos curados y rutas gratuitas** es accesible sin crear cuenta, sin entregar correo electrónico y sin rastreadores publicitarios.
2. **Respaldo Portátil Firmado:** Tu avance (`XP`, nodos completados, mazos `ts-fsrs` y rúbricas de tu Proyecto Jefe) vive en `IndexedDB` / `localStorage` y puede exportarse o restaurarse en un clic mediante un archivo `.json` validado en cliente con `Valibot` (`[C2-VALIBOT-04]`).
3. **Vitrina Pública Estrictamente *Opt-In*:** Solo si decides voluntariamente publicar tu Proyecto Jefe terminado, se envía exclusivamente la ficha pública que apruebes en pantalla, previa advertencia automática de redacción de datos personales.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SOTA_RAG_ARCHITECTURES_AND_TOOLS_2026]] · [[CURATED_MASTER_BOOKS_AND_COURSES_2026]] · [[CANON_SOFTWARE_ENGINEERING_AT_GOOGLE]] · [[CANON_HARNESS_ENGINEERING_INTEGRAL_2026]] · #ai_academy
