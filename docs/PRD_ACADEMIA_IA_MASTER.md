# PRD Maestro — Academia IA

> **Versión:** 1.0 (Etapa 3A) · **Fecha:** 2026-11-14 · **Estado:** decisiones cerradas por el CTO.
> **Espejo legible por código:** [`data/academy/project_charter.json`](../data/academy/project_charter.json), resuelto por `getProjectProfile()` en [`tools/lib/project_profile.mjs`](../tools/lib/project_profile.mjs).
> **Regla de oro:** si este documento y el charter JSON difieren, manda el JSON (lo validan los tests). Todo cambio se hace en ambos dentro del mismo commit.

---

## 1. Propósito

Construir la plataforma educativa abierta en español más completa, dinámica, minimalista e inclusiva sobre tecnologías emergentes e inteligencia artificial. El recorrido está organizado en tres niveles alineados con la progresión de competencias de UNESCO (*Adquirir → Profundizar → Crear*) y con la alfabetización en IA de la OCDE/UE.

### 1.1 Niveles

| Nivel | Etapa UNESCO | Para quién | Código de programación |
| :--- | :--- | :--- | :--- |
| **Principiante** | Adquirir | Quieres entender y usar la IA en tu vida diaria y en tu oficio o profesión | **No** |
| **Intermedio** | Profundizar | Ya usas herramientas de IA y quieres construir productos, servicios, bots y RAG sobre bases de datos | Sí |
| **Avanzado** | Crear | Quieres diseñar sistemas compuestos, aplicar ciberseguridad a la IA y montar *Software Factories* | Sí |

- **Principiante:** panorama completo de herramientas actuales, gratuitas y pagas, aplicadas a problemas cotidianos y a oficios reales. **Toda herramienta paga debe mostrar una alternativa gratuita verificada que no pida tarjeta** (`free_no_card` u `open_source_local`).
- **Intermedio y Avanzado:** priorizan tecnologías Open-Source y gratuitas. Se adaptan a tus recursos y objetivos mediante arquetipos locales (`academy_learner_archetypes`): desde una PC básica con presupuesto \$0 y nubes gratuitas hasta un equipo con GPU propia. Estos arquetipos son plantillas técnicas: **no guardan datos personales**.

---

## 2. Modelo económico y legal

| Decisión | Valor | Consecuencia en código |
| :--- | :--- | :--- |
| Modo comercial | `commercial_mode: false` | El export y el build rechazan fuentes con `commercial_use_allowed = 0` **solo** si algún día cambia a `true` |
| Financiamiento | Donaciones voluntarias **sin** beneficios exclusivos | Sin muros de pago, sin plan Pro, sin publicidad, sin sponsors comerciales |
| Licencia del código | `MIT` | — |
| Licencia del contenido | `CC-BY-NC-SA-4.0` | Toda lección publicada hereda NC + SA |

### 2.1 Qué fuentes puedes adaptar dentro de una lección

| Licencia de la fuente | ¿Adaptar dentro de la lección? | Licencia de la obra derivada | Obligación |
| :--- | :--- | :--- | :--- |
| `MIT`, `Apache-2.0` | Sí | `CC-BY-NC-SA-4.0` | Conservar aviso, licencia y (Apache) `NOTICE` |
| `CC-BY-4.0` | Sí | `CC-BY-NC-SA-4.0` | Atribución completa e indicar cambios |
| `CC-BY-NC-4.0`, `CC-BY-NC-SA-4.0` | Sí | `CC-BY-NC-SA-4.0` | Atribución; uso no comercial |
| `CC-BY-SA-4.0` | Sí (con pieza SPDX aislada) | `CC-BY-SA-4.0` | Atribución completa; la pieza derivada conserva `CC-BY-SA-4.0` y no se relicencia como `CC-BY-NC-SA-4.0` |
| Copyright cerrado (`CLEAN_ROOM_ONLY`) | **No** | `CLEAN_ROOM_ORIGINAL` | Solo hechos y estructura; redacción 100 % original |

> **Trazabilidad SPDX para `CC-BY-SA-4.0`:** la cláusula *ShareAlike* de `CC-BY-SA-4.0` exige que toda adaptación derivada de una obra `CC-BY-SA-4.0` se publique bajo `CC-BY-SA-4.0` (`derivative_license_required: "CC-BY-SA-4.0"`), sin relicenciar ese bloque bajo `CC-BY-NC-SA-4.0`. El almacén relacional valida automáticamente esta obligación.

### 2.2 Marco normativo
- **Ley 25.326 (datos personales):** progreso *local-first* en tu navegador, sin inicio de sesión obligatorio y sin perfiles de estudiantes en servidores.
- **Ley 26.653 (accesibilidad web):** WCAG 2.2 AA como piso, navegación completa por teclado y alternativa textual de cada video.

---

## 3. Decisiones técnicas cerradas (`compliance_profile: "education"`)

1. **Layout propio y minimalista sobre Astro 7.4** (`^7.4.11`) con tokens W3C DTCG en OKLCH 90/8/2. **No se usa `@astrojs/starlight`.**
2. **Costo de servidor en producción: \$0.00 USD** (Cloudflare Workers Static Assets, sitio estático).
3. **Progreso local-first** (IndexedDB/localStorage, exportable). Cero login obligatorio.
4. **Diseño curricular autónomo** por el equipo de agentes, siempre con aprobación HITL del CTO antes de publicar.
5. **Lista de tecnologías Open-Source por etapa** dentro de cada nivel.
6. **De 2 a 3 videos complementarios por lección**, solo desde orígenes aprobados:
   - `https://www.youtube-nocookie.com`
   - `https://archive.org`
   - `https://commons.wikimedia.org`
   - `https://upload.wikimedia.org`
   - Requisito derivado, pendiente de tu aprobación en la Etapa 3C (CSP): `https://i.ytimg.com` en `img-src`, porque `lite-youtube-embed` carga desde ahí la miniatura previa al clic.
7. **Cuestionarios exprés de 3 preguntas** que evalúan el texto de la lección **y** hechos de los videos. Solo alimentan quizzes las anclas de video con estado `oer_transcript_verified`, `multimodal_verified` o `human_verified`; las `pending` nunca.
8. **Sin fallbacks generativos externos de imágenes** (por ejemplo, Pollinations): están bloqueados en el perfil `education`.

---

## 4. Datos y fuente de verdad

- **Fuente de verdad versionada:** `data/academy/*.json` (`sources`, `videos`, `tools`, `archetypes`, `tracks`), con orden determinista.
- **Base derivada:** `data/academy.sqlite`, ignorada por Git y regenerable con `npm run academy:import`.
- **Migraciones:** `data/migrations/*.sql` (esquema v2, `PRAGMA user_version = 2`).
- **Índice RAG:** `.cache/omni_rag_fts5.sqlite` es descartable y **no** contiene tablas `academy_*`.

## 5. Fuera de alcance de la Etapa 3A
CSP por perfil, sanitización de la salida del tutor BYOK, adaptación de gates visuales al modo `Read` y scaffold de `projects/academia-ia` (Etapa 3C). Gobernanza del RAG y citas de los cánones (Etapa 3B).

