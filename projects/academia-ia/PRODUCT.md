# Product — Academia IA

<!-- impeccable:product-schema 1 -->

## Platform

web (`astro@7.4.11` static site on Cloudflare Workers Static Assets, `$0.00 USD` server cost)

## Industry Archetype

- **Archetype ID:** `academic-editorial-education` (CLI alias: `education`, `complianceProfile: "education"`)
- **Creative North Star:** Calm Explorable Editorial & Inclusive Pedagogical Clarity
- **Primary Surface Mode:** `Read` (Supported modes: `Read`, `Operate`)

## Users

Estudiantes hispanohablantes, trabajadores, oficios reales, docentes, creadores y desarrolladores autodidactas que buscan comprender, profundizar y crear con tecnologías emergentes e inteligencia artificial sin muros de pago ni inicio de sesión obligatorio:
- **Principiante (*Adquirir*):** Uso cotidiano y profesional de herramientas de IA sin programación, con alternativa gratuita sin tarjeta verificada para cada herramienta comercial.
- **Intermedio (*Profundizar*):** Creación de bots, flujos automatizados y RAG sobre bases de datos con prioridad Open-Source adaptada a su hardware local o nube gratuita.
- **Avanzado (*Crear*):** Sistemas compuestos, ciberseguridad aplicada a IA y *Software Factories* deterministas.

## Product Purpose

Entregar la academia abierta de inteligencia artificial en español más clara, rigurosa e inclusiva, alineada con la progresión de competencias de **UNESCO** (*Adquirir → Profundizar → Crear*), la alfabetización en IA de la **OCDE/UE**, la **Ley 25.326** (privacidad *local-first* sin cuentas en servidor) y la **Ley 26.653** (WCAG 2.2 AA+).

## Positioning

Diseño editorial propio y minimalista sobre Astro `7.4.11` (sin `@astrojs/starlight`), gobernado por tokens W3C DTCG 2025.10 en espacio perceptual **OKLCH 90/8/2**, micro-explorables interactivos reales (`js-tiktoken`, fórmulas `temml` MathML con `0 KB` JS) y seguridad Zero-Trust (`CSP` estricta con hashes `sha256-...` + `Trusted Types` + tutor aislado en `<iframe sandbox="allow-scripts">`).

## Operating Context

- **APCA Perceptual Contrast Floor:** `Lc >= 85` (WCAG 2.2 AA+)
- **Reading Measure:** `65ch` (`60ch` a `70ch`, `line-height: 1.72`)
- **Tabular Numerals Required:** `true` (`font-variant-numeric: tabular-nums`)
- **3D WebGPU / Spatial Pipeline Allowed:** `false`
- **Code & Content Licenses:** Código `MIT` · Contenido `CC-BY-NC-SA-4.0` (`commercial_mode: false`)

## Capabilities and Constraints

- **DO:** Mantener la medida de lectura entre `60ch` y `70ch` (`65ch` canónico), jerarquía limpia `h1 -> h2 -> h3` y bloques de hasta `110` palabras en español neutro (`tú`).
- **DO:** Aplicar proporción cromática OKLCH 90/8/2 con los 3 acentos semánticos de nivel (`level-acquire`, `level-deepen`, `level-create`) verificados en tema claro y oscuro.
- **DO:** Integrar de 2 a 3 videos complementarios por lección desde orígenes aprobados (`youtube-nocookie.com`, `archive.org`, `wikimedia.org`) mediante fachada diferida con aviso breve de almacenamiento local y síntesis textual accesible.
- **DO:** Ofrecer micro-explorables reales en cliente (`js-tiktoken`) y aislar el tutor socrático/BYOK en `<iframe sandbox="allow-scripts">` validado con `Valibot` y `DOMPurify` (`RETURN_TRUSTED_TYPE: true`).
- **DO NOT:** Prohibido incluir tablas de precios (`#pricing`), muros de pago, planes Pro, publicidad, patrocinios comerciales o beneficios exclusivos.
- **DO NOT:** Prohibido usar rachas punitivas (*streaks*), tablas de clasificación (*leaderboards*), temporizadores de escasez o confirm-shaming.
- **DO NOT:** Prohibido inyectar shaders 3D decorativos, relleno PBR, audio de fondo o generadores externos de imágenes (como Pollinations) en el perfil `education`.

## Brand Commitments

Claridad pedagógica verificable, soberanía tecnológica Open-Source y respeto absoluto por la atención y privacidad de quien estudia.

## Accessibility & Inclusion

- Piso obligatorio: **WCAG 2.2 AA+** (`0` violaciones `@axe-core/playwright` en tema claro y oscuro) y contraste APCA `Lc >= 85`.
- Navegación completa por teclado con anillos `:focus-visible` nítidos y objetivos táctiles `>= 48x48px`.
- Respeto estricto de `@media (prefers-reduced-motion: reduce)` en todas las transiciones.
