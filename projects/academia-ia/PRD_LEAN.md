# PRD_LEAN.md — Academia Libre (Borrador Gate #1)

> **Proyecto (slug):** `academia-ia` · **Marca Pública:** **Academia Libre** · **Perfil de Cumplimiento:** `education` · **Modo de Superficie:** `Read`
> **Estado de Compuerta:** `DRAFT_PENDING_CTO_GATE1` (`approvedBy: null` — pendiente de firma humana del CTO)
> **Fuente Maestra:** Derivado 1:1 de `docs/PRD_ACADEMIA_IA_MASTER.md` y `data/academy/project_charter.json`

---

## 1. Propósito e Identidad del Producto

Construir la plataforma educativa abierta en español más completa, dinámica, minimalista e inclusiva sobre tecnologías emergentes e inteligencia artificial, estructurada en tres niveles alineados con el marco de competencias **UNESCO** (*Adquirir → Profundizar → Crear*) y con la alfabetización en IA de la **OCDE/UE**:

1. **Nivel 1 — Principiante (*Adquirir*):** Panorama claro y aplicable de herramientas de IA actuales (gratuitas y pagas) para la vida cotidiana, oficios y profesiones reales, **sin código de programación** (`programming_code_allowed: false`). Toda herramienta paga exige mostrar una alternativa gratuita verificada sin tarjeta (`free_no_card` u `open_source_local`).
2. **Nivel 2 — Intermedio (*Profundizar*):** Construcción práctica de productos, bots, flujos automatizados y RAG sobre bases de datos con prioridad **Open-Source y costo \$0**, adaptado a los recursos técnicos de cada estudiante mediante plantillas locales (`academy_learner_archetypes`).
3. **Nivel 3 — Avanzado (*Crear*):** Diseño de sistemas compuestos de IA, ciberseguridad aplicada a modelos generativos y *Software Factories* gobernadas por pruebas deterministas.

---

## 2. Invariantes de Producto y Gobernanza (`[INV-01]` a `[INV-07]`)

- **`[INV-01]` Acceso Abierto real y Sostenibilidad Edge:** El 100 % de las lecciones, explorables y recursos son públicos sin registro ni muros de pago sobre **Cloudflare Workers + Static Assets** (`commercial_mode: false`, financiamiento exclusivo por donaciones voluntarias sin beneficios exclusivos). Prohibidos muros de pago, planes Pro, publicidad o patrocinios comerciales.
- **`[INV-02]` Privacidad Local-First y Sincronización Opcional (Ley 25.326):** Cero inicio de sesión obligatorio para estudiar. El progreso local vive en `IndexedDB` (`Dexie`); quien decida iniciar sesión opcionalmente con Google (`OAuth 2.1 PKCE`) y/o enlazar GitHub cuenta con cifrado de email `AES-256-GCM` en Cloudflare D1, índice ciego `HMAC-SHA256`, recorte local de avatar `WebP` sin EXIF y derechos de exportación completa (`GET /api/me/export`) y eliminación total en cascada (`DELETE /api/me`).
- **`[INV-03]` Inclusión y Accesibilidad Web (Ley 26.653 / WCAG 2.2 AA+):** Contraste perceptual APCA `Lc >= 85`, navegación completa por teclado, objetivos táctiles `>= 48x48px`, tema claro/oscuro accesible, respeto estricto de `prefers-reduced-motion: reduce` y síntesis textual verificada para cada video.
- **`[INV-04]` Carga Cognitiva Controlada y Español Neutro (`readability_es.mjs`):** Párrafos de hasta `110` palabras, máximo `3` conceptos nuevos por lección, ancho de lectura editorial entre `60ch` y `70ch` (`65ch` canónico) y pisos INFLESZ verificados por nivel (`>= 65` Principiante, `>= 55` Intermedio, `>= 45` Avanzado).
- **`[INV-05]` Triangulación Audiovisual Limpia y Aviso de Privacidad:** Entre `2` y `3` videos complementarios por lección exclusivamente desde orígenes permitidos (`youtube-nocookie.com`, `archive.org`, `commons.wikimedia.org`, `upload.wikimedia.org`) mediante fachada diferida con aviso breve de almacenamiento local antes de cargar el reproductor externo.
- **`[INV-06]` Soberanía Tecnológica y Alternativa Gratuita Obligatoria:** Toda referencia a una herramienta comercial (`paid_pro_reference` o `freemium_capped`) debe vincular una alternativa verificada en `free_no_card` u `open_source_local`.
- **`[INV-07]` Trazabilidad de Licencias (`MIT` código / `CC-BY-NC-SA-4.0` contenido):** Cumplimiento estricto de `inbound_license_policy` (`CC-BY-SA-4.0` conserva su bloque SPDX propio; fuentes `CLEAN_ROOM_ONLY` solo admiten hechos verificados con redacción 100 % original).

---

## 3. Frontera de Alcance (`Explicit Non-Goals`)

Quedan explícitamente **FUERA** del alcance y prohibidos por contrato:
- Tablas de precios SaaS (`#pricing`), carritos de compra, muros de pago, cupones de escasez o confirm-shaming.
- Mecánicas adictivas: rachas punitivas (*streaks*), tablas de clasificación públicas (*leaderboards*), temporizadores de urgencia o recompensas variables.
- Uso de `@astrojs/starlight` (se exige layout editorial propio y minimalista en Astro `7.4.11`).
- Shaders WebGPU 3D decorativos, materiales PBR de relleno o audio de fondo automático en modo `Read`.
- Generadores externos de imágenes al vuelo (como Pollinations) o carga de scripts de terceros fuera de `'self'`.
- Almacenamiento en servidor de claves API del estudiante: cualquier modo BYOK opcional opera únicamente en memoria/local dentro de un `<iframe sandbox="allow-scripts">` de origen opaco.

---

## 4. Criterios de Éxito Medibles

- `0` violaciones WCAG 2.2 AA en `@axe-core/playwright` (tanto en tema claro como en tema oscuro).
- `0` errores de consola y `0` violaciones de `Content-Security-Policy` o `Trusted Types` en runtime Chromium.
- `LCP <= 1800 ms`, `CLS = 0.000` y `jsHeapUsedMB < 64 MB` sobre el build estático de producción.
- Aprobación en verde de `security_gate.mjs`, `ryux_design_gate.mjs` (`Read`), `cognitive_ux_auditor.mjs` (`education`) y `floor_and_aeo_guard.mjs`.

