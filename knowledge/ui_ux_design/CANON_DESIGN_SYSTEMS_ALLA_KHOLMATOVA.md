# CANON: Design Systems — Alla Kholmatova (Edición Expandida: Patrones Funcionales vs. Perceptuales, Arquitectura de Tokens W3C DTCG y Gobernanza Multi-Marca 2026)

> **Dominio:** `ui_ux_design` / `design_systems_architecture`  
> **Versión:** 2026.10 (SOTA Web Software Factory — Tratado Expandido)  
> **Aplicación:** `templates/astro-edge`, `templates/vanilla-edge`, `tools/design/token_compiler.mjs`, `projects/<slug>`

---

## Tabla de Trazabilidad de Fuentes Físicas

| Sección del Canon | Archivo Físico / Fuente Primaria Verificada | Conceptos y Reglas Extraídas |
| :--- | :--- | :--- |
| **1. Patrones Funcionales vs. Patrones Perceptuales** | `knowledge/ui_ux_design/LIBRARY_INGEST_01_UI_UX_TYPOGRAPHY_AND_CSS_39_BOOKS_2026.md` (`Alla Kholmatova — Design Systems`, `Brad Frost — Atomic Design`, `Dan Mall — Design That Scales`) | Dicotomía entre bloques que resuelven tareas del usuario (*Functional*) vs. propiedades atmosféricas que definen la identidad de marca (*Perceptual*). |
| **2. Arquitectura de Tokens en 3 Capas (`W3C DTCG 2025.10`)** | `tools/design/token_compiler.mjs` + `.agents/skills/design-system/SKILL.md` | Separación estricta entre Tokens Primitivos (*Option*), Tokens Semánticos (*Decision*) y Tokens de Componente (*Scoped*). |
| **3. Matriz de los 8 Estados Obligatorios de Componente** | `C:\Users\tomas\Desktop\streamerbot\references\sota-expansion\design-intelligence\ui-skills\README.md` + `.agents/skills/baseline-ui/SKILL.md` | Especificación determinista de `default`, `hover`, `focus-visible`, `active`, `disabled`, `loading`, `error` y `empty`. |
| **4. Mapeo de los 67 Sistemas Perceptuales por Industria** | `C:\Users\tomas\Desktop\streamerbot\references\hunt-2026-10\awesome-design-skills\README.md` (`67 Design System Skills`) | Adaptación del lenguaje visual según el arquetipo comercial (SaaS IA, Clínicas, Estudios Jurídicos, Fintech, E-Commerce, Hospitalidad). |

---

## 1. La Dicotomía Central de Alla Kholmatova: Patrones Funcionales vs. Patrones Perceptuales

Un sistema de diseño maduro no es una simple librería de botones copiados de un mismo molde. Alla Kholmatova demuestra que todo lenguaje de interfaz compartido se compone de **dos dimensiones ortogonales**:

### 1.1 Patrones Funcionales (*Functional Patterns*)
Son los módulos tangibles que le permiten al usuario **ejecutar un trabajo concreto (*Job-to-be-Done*)**. Su estructura semántica HTML5 y su accesibilidad ARIA deben ser 100% consistentes en todos los sitios de la fábrica:
- **Módulos de Captación yDecisión:** `Hero Value Proposition`, `Pricing Comparison Matrix`, `ROI Interactive Calculator`, `Social Proof Evidence Strip`.
- **Módulos de Transacción y Flujo:** `Lead Capture Form`, `Appointment Slot Picker`, `Checkout Summary Drawer`, `FAQ Accordion (<details>/<summary>)`.
- **Regla de Gobernanza:** Nombrar siempre los patrones funcionales por **su propósito de negocio o acción del usuario** (`pricing-comparison-table`, `lead-qualification-form`), jamás por su apariencia visual pasajera (`three-blue-boxes`, `left-sidebar-card`).

### 1.2 Patrones Perceptuales (*Perceptual Patterns*)
Son los rasgos sistémicos e intangibles que atraviesan toda la interfaz y hacen que el usuario reconozca la **personalidad de la marca en menos de 50 milisegundos**, incluso si difumina la pantalla:
- **Materialidad de Superficies:** ¿Las tarjetas parecen papel editorial mate sin sombras, cristal esmerilado con borde especular (`backdrop-filter: blur(16px)`), o bloques técnicos con bordes de `1px` tipo ingeniería suiza?
- **Cadencia y Ritmo Espacial:** ¿El diseño es aireado y contemplativo (`py-32`, alto porcentaje de espacio negativo) o compacto y de alta densidad operativa (`gap: 12px`, grillas técnicas con líneas divisorias expuestas)?
- **Firma Coreográfica (Motion Signature):** ¿Las transiciones son instantáneas y mecánicas (`120ms cubic-bezier(0.22, 1, 0.36, 1)`) o fluidas y elásticas con física de resorte (`spring`)?

> **Ley de la Fábrica Multi-Proyecto:** Dos proyectos distintos generados por `web-software-factory` pueden compartir los mismos **Patrones Funcionales** (ambos tienen un Hero, una tabla comparativa y un formulario conectado a `n8n`), pero **jamás deben compartir el mismo Patrón Perceptual** si pertenecen a industrias distintas.

---

## 2. Arquitectura de Tokens de Diseño en 3 Capas (`W3C DTCG 2025.10`)

Para permitir que el compilador `tools/design/token_compiler.mjs` transforme por completo la identidad visual de un sitio sin reescribir una sola clase de componente, los tokens CSS se organizan en **3 capas jerárquicas estrictas**:

```
[Capa 1: Primitivos (Opciones)]  ──►  [Capa 2: Semánticos (Decisiones)]  ──►  [Capa 3: Componentes (Ámbito Local)]
 --oklch-slate-950                     --surface-canvas                        --card-bg: var(--surface-elevated)
 --oklch-emerald-500                   --accent-primary                        --btn-primary-bg: var(--accent-primary)
```

### 2.1 Tabla de Responsabilidades por Capa de Token

| Capa | Nombre Técnico | Qué Define | ¿Permitido usar directamente en el CSS de un Componente? | Ejemplo Real en CSS |
| :--- | :--- | :--- | :--- | :--- |
| **Capa 1** | **Tokens Primitivos (*Primitive / Option Tokens*)** | Valores crudos de color `OKLCH`, escalas en `rem` y curvas Bézier. Define *qué valores existen* en el universo cromático. | ❌ **PROHIBIDO.** Si usás `--color-blue-600` en un botón, rompés el cambio de tema Claro/Oscuro y la adaptación multi-marca. | `--palette-indigo-500: oklch(0.58 0.22 265);` |
| **Capa 2** | **Tokens Semánticos (*Semantic / Decision Tokens*)** | El **rol e intención** de cada valor en la interfaz (`canvas`, `surface-elevated`, `text-primary`, `border-subtle`, `status-danger`). Se reasignan automáticamente en `[data-theme="dark"]`. | ✅ **SÍ (Uso Principal).** El 85% de las reglas CSS deben consumir tokens semánticos de Capa 2. | `--bg-canvas: var(--palette-slate-950);`<br>`--text-primary: var(--palette-slate-50);` |
| **Capa 3** | **Tokens de Componente (*Component-Scoped Tokens*)** | Sobrescrituras específicas para un átomo o molécula compleja sin contaminar el ámbito global. | ✅ **SÍ (En componentes reutilizables).** | `--btn-radius: var(--radius-md);`<br>`--card-padding: var(--space-6);` |

---

## 3. Matriz de los 8 Estados Obligatorios de Todo Componente Interactivo

Extraído de `ui-skills` y *Design Systems* de Kholmatova: el síntoma más evidente de una interfaz amateur es diseñar únicamente el *"Happy Path"* (estado en reposo con datos ideales). Ningún componente interactivo o contenedor de datos se considera terminado en `web-software-factory` hasta que tiene definidos sus **8 estados**:

| # | Estado | Selector / Atributo | Regla Visual y de Comportamiento Obligatoria |
| :--- | :--- | :--- | :--- |
| **1** | **Default (Reposo)** | `.component` | Contraste APCA válido (`Lc >= 60`), proporción geométrica limpia y alineación de línea base. |
| **2** | **Hover (Puntero)** | `@media (hover: hover) { :hover }` | Elevación luminosa sutil (`+3%` a `+5%` en `OKLCH L`) o cambio de borde en `150ms`. Nunca activar hover pegajoso en pantallas táctiles. |
| **3** | **Focus-Visible (Teclado)** | `:focus-visible` | Anillo de foco de alto contraste (`outline: 2px solid var(--accent-primary); outline-offset: 2px;`). **Jamás escribir `outline: none` sin reemplazo visible.** |
| **4** | **Active (Presionado)** | `:active` | Micro-compresión física instantánea (`transform: scale(0.98)` en `80ms`) que confirma táctilmente el clic. |
| **5** | **Disabled (Inactivo)** | `:disabled`, `[aria-disabled="true"]` | `opacity: 0.45`, `cursor: not-allowed`, desactivación de `pointer-events` o bloqueo de envío en el controlador JS. |
| **6** | **Loading (Cargando)** | `[aria-busy="true"]`, `.is-loading` | Mantener el **ancho y alto exactos del botón/contenedor** (`CLS = 0.00`), reemplazar ícono por spinner SVG ligero y bloquear doble clic idempotente. |
| **7** | **Error (Fallo Validado)** | `[aria-invalid="true"]` | Borde `--status-danger`, mensaje explicativo vinculado por `aria-describedby` que indique **cómo corregir el error** (no solo *"Error en el campo"*). |
| **8** | **Empty (Sin Datos)** | `.empty-state` | Nunca mostrar un contenedor en blanco o roto. Mostrar ilustración/ícono sobrio, explicación clara y **un CTA directo para crear el primer elemento o limpiar los filtros**. |

---

## 4. Mapeo de Lenguajes Perceptuales por Industria (Catálogo de 67 Estilos)

Para evitar que una clínica médica luzca igual que una startup de infraestructura IA o un estudio de abogados, el arquitecto de sistemas de diseño debe seleccionar la familia perceptual adecuada de `awesome-design-skills`:

| Vertical / Industria del Cliente | Estilo Recomendado (`--style`) | Tema Base | Tipografía Display + Body | Radio de Borde (`--radius`) | Firma de Superficie |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **SaaS B2B / DevTools / IA** | `linear`, `vercel`, `raycast`, `resend`, `agentic` | Dark-First (`L=0.08`) o Dual | `Geist` / `Inter` + `JetBrains Mono` | `8px` – `12px` (Técnico preciso) | Bordes especulares `1px` (`oklch(1 0 0 / 0.08)`), Bento Grids, Command Palette. |
| **Fintech / Pagos / Contabilidad** | `stripe`, `wise`, `mercury`, `fintech` | Light Limpio con Secciones Dark de Contraste | `Plus Jakarta Sans` / `Inter` (`tabular-nums` estricto) | `12px` – `16px` | Sombras multicapa suaves, gráficos de flujo limpios, alta claridad numérica. |
| **Salud / Clínicas / Odontología** | `clean`, `apple`, `calm`, `medical-trust` | Light Luminoso (`L=0.985`) | `Instrument Sans` / `Plus Jakarta Sans` | `16px` – `24px` (Amable y orgánico) | Superficies cálidas, acentos esmeralda/cielo serenos, fotos reales del equipo médico. |
| **Legales / Consultoría / Arquitectura** | `editorial`, `nytimes`, `notion`, `luxury-minimal` | Papel Cálido (`oklch(0.97 0.01 85)`) o Carbón Sobrio | `Instrument Serif` / `Playfair Display` + `Inter` | `0px` – `4px` (Corte editorial arquitectónico) | Líneas divisorias finas expuestas (`hairline rules`), jerarquía tipográfica clásica. |
| **E-Commerce / Marcas D2C / Gastronomía** | `shopify`, `airbnb`, `glossier`, `craft` | Light Cálido o Contraste Fotográfico | `General Sans` / `Cabinet Grotesk` + `DM Sans` | `12px` – `20px` | Protagonismo fotográfico en `AVIF/WebP`, insignias de confianza junto al precio. |

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[DESIGN_MASTERY_2026]] · [[AGENT_CREATIVE_AND_VISUAL_AWARENESS_2026]] · [[CANON_REFACTORING_UI_WATHAN_SCHOGER]] · [[CANON_PRACTICAL_UI_ADHAM_DANNAWAY]] · #ui_ux_design
