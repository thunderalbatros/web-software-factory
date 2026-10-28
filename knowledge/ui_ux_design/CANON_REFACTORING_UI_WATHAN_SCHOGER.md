# CANON: Refactoring UI — Adam Wathan & Steve Schoger (Edición Expandida OKLCH, Escalas No Lineales y Física de Superficies 2026)

> **Dominio:** `ui_ux_design` / `visual_hierarchy_and_spacing`  
> **Versión:** 2026.10 (SOTA Web Software Factory — Tratado Expandido)  
> **Aplicación:** `templates/astro-edge`, `templates/vanilla-edge`, `projects/<slug>`

---

## Tabla de Trazabilidad de Fuentes Físicas

| Sección del Canon | Archivo Físico / Fuente Primaria Verificada | Conceptos y Reglas Extraídas |
| :--- | :--- | :--- |
| **1. Jerarquía Visual sin Depender del Tamaño** | `knowledge/ui_ux_design/LIBRARY_INGEST_01_UI_UX_TYPOGRAPHY_AND_CSS_39_BOOKS_2026.md` (`Adam Wathan & Steve Schoger — Refactoring UI`) | Regla de las 3 Capas de Contraste Luminoso (`Lc`), des-énfasis activo para resaltar elementos clave y eliminación de etiquetas redundantes (`Labels are a Last Resort`). |
| **2. Sistema No Lineal de Espaciado y Dimensionamiento** | `.agents/skills/modern-frontend-design/references/full-guide.md` + `C:\Users\tomas\Desktop\streamerbot\references\hunt-2026-10\awesome-design-skills\skills\clean\SKILL.md` | Escala geométrica en base `4px/8px`, prohibición de saltos lineales arbitrarios (`13px`, `19px`), arranque con espacio excesivo (*Start with Too Much White Space*) y ley de no llenar toda la pantalla. |
| **3. Escalas Tipográficas Modulares y Ritmo Vertical** | `.agents/skills/baseline-ui/SKILL.md` + `LIBRARY_INGEST_01_UI_UX_TYPOGRAPHY_AND_CSS_39_BOOKS_2026.md` (`Butterick, Bringhurst, Lupton`) | Fórmulas fluidas `clamp()`, ajuste inversamente proporcional de `line-height` y `letter-spacing` según el tamaño, alineación por línea base (`align-items: baseline`) y `tabular-nums`. |
| **4. Paletas Perceptuales de 9 Pasos en `OKLCH` y Física de Sombras** | `.agents/skills/modern-frontend-design/references/full-guide.md` + `.agents/skills/baseline-ui/SKILL.md` | Construcción de escalas cromáticas `50–900` en `OKLCH`, rotación de matiz contra el gris muerto, sombras de doble capa (`inset` specular highlight + sombra ambiental difusa) y de-boxing. |

---

## 1. Jerarquía Visual: No Todo Puede Ser Importante (`Hierarchy Is Everything`)

Cuando todos los elementos de una interfaz compiten al mismo volumen visual (mismo grosor tipográfico, mismo contraste, bordes gruesos en todas las tarjetas), el ojo humano percibe **ruido visual** (*flatness*). La jerarquía no se logra agrandando los títulos hasta `72px`, sino controlando **tres variables simultáneas**: **Peso (`font-weight`)**, **Contraste Luminoso (`OKLCH Lightness` / `APCA Lc`)** y **Espacio Circundante**.

### 1.1 La Regla de los 3 Niveles de Texto por Superficie
Todo componente o tarjeta puede contener como máximo **3 niveles de jerarquía cromática**:

| Nivel de Jerarquía | Rol Semántico | Token CSS (`Dark Mode`) | Token CSS (`Light Mode`) | Contraste APCA Mínimo | Peso Tipográfico |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Primario (`--text-primary`)** | Titulares, cifras principales, nombres de entidad, valores de tablas | `oklch(0.97 0.005 260)` | `oklch(0.14 0.015 260)` | `Lc >= 90` | `600` (SemiBold) o `700` (Bold) |
| **2. Secundario (`--text-secondary`)** | Párrafos explicativos, subtítulos, descripciones de características | `oklch(0.74 0.012 260)` | `oklch(0.42 0.018 260)` | `Lc >= 65` | `400` (Regular) o `500` (Medium) |
| **3. Terciario / Muted (`--text-muted`)** | Metadatos, fechas, unidades secundarias, notas al pie, etiquetas | `oklch(0.56 0.015 260)` | `oklch(0.56 0.015 260)` | `Lc >= 48` | `400` (Regular) |

### 1.2 Regla de Oro: Enfatizar Des-enfatizando (*Emphasize by De-emphasizing*)
Si un elemento clave (por ejemplo, el enlace activo de una barra de navegación o el plan recomendado de una tabla de precios) no destaca lo suficiente:
- ❌ **Error:** Hacerlo más grande, ponerle negrita extra, subrayarlo y agregarle un ícono parpadeante.
- ✅ **Solución Wathan & Schoger:** Mantener el elemento activo en `--text-primary` y **bajar la luminancia de los elementos inactivos hermanos** a `--text-secondary` o `--text-muted`. El contraste relativo hace el trabajo sin inflar las dimensiones.

### 1.3 Las Etiquetas son el Último Recurso (*Labels Are a Last Resort*)
Los desarrolladores suelen mostrar datos con el formato crudo de la base de datos (`Nombre: Dra. Sofía Romero`, `Cargo: Directora Médica`, `Teléfono: +54 11 4780-0000`, `Stock: 12 unidades`).
- **Regla:** El formato y el contexto ya comunican el tipo de dato. Nadie mira `sofia@clinica.com.ar` y duda si es un correo electrónico.
- **Excepción Crítica (Dashboards y KPIs):** Cuando se muestran múltiples métricas numéricas (`$14.200`, `3,8%`, `24 ms`), **sí se requiere etiqueta**, pero la etiqueta va en tamaño pequeño (`0.75rem`, `uppercase`, `letter-spacing: 0.06em`, `--text-muted`) y el **valor numérico lleva el protagonismo absoluto** (`clamp(1.75rem, 3vw, 2.5rem)`, `font-weight: 700`, `--text-primary`).

---

## 2. Sistema Matemático de Espaciado y Dimensionamiento No Lineal

Una escala lineal (`4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px...`) falla a partir de los `24px` porque la diferencia relativa entre `28px` y `32px` es de apenas el `14%`, imperceptible para el ojo humano, lo que induce inconsistencias en el código.

### 2.1 Tabla Maestra de Espaciado No Lineal (Escala Canónica Base `4px`)
Para que dos pasos adyacentes de la escala sean visualmente distinguibles, cada salto debe crecer aproximadamente entre un **25% y un 50%** respecto al anterior:

| Token CSS | Valor Exacto (`rem` / `px`) | Salto Relativo | Caso de Uso Canónico en la Interfaz |
| :--- | :--- | :--- | :--- |
| `--space-1` | `0.25rem` (`4px`) | Base | Separación mínima entre un ícono inline y su etiqueta o entre título de input y asterisco. |
| `--space-2` | `0.50rem` (`8px`) | `+100%` | Gap entre botones estrechos, padding vertical de badges/pills, gap entre label e input. |
| `--space-3` | `0.75rem` (`12px`) | `+50%` | Padding vertical de botones estándar (`py-3`), gap entre ítems de una lista compacta. |
| `--space-4` | `1.00rem` (`16px`) | `+33%` | Padding interno de tarjetas compactas en móvil, gap entre campos de un formulario. |
| `--space-6` | `1.50rem` (`24px`) | `+50%` | Padding interno estándar de Bento Cards (`24px`), gap de grillas de tarjetas en escritorio. |
| `--space-8` | `2.00rem` (`32px`) | `+33%` | Padding interno de tarjetas destacadas/Hero cards, separación entre sub-bloques de sección. |
| `--space-12` | `3.00rem` (`48px`) | `+50%` | Separación entre el bloque de encabezado de una sección (`Section Header`) y su grilla de contenido. |
| `--space-16` | `4.00rem` (`64px`) | `+33%` | Padding vertical de secciones secundarias en móvil (`py-16`). |
| `--space-24` | `6.00rem` (`96px`) | `+50%` | Padding vertical estándar de secciones principales en escritorio (`py-24`). |
| `--space-32` | `8.00rem` (`128px`) | `+33%` | Respiración dramática de secciones Hero o cierres de conversión en pantallas anchas (`>= 1280px`). |

### 2.2 Tres Leyes Espaciales Inquebrantables
1. **Empezar con Demasiado Espacio Blanco (*Start with Too Much White Space*):** El espacio denso solo se justifica en dashboards de alta densidad informativa. En páginas de marketing, SaaS y servicios, el espacio negativo es el indicador primario de **lujo y confiabilidad técnica**.
2. **No Llenar Toda la Pantalla por Obligación:** Si un formulario de inicio de sesión o una calculadora necesita `480px` de ancho para ser óptimo, dejarlo en `max-width: 480px` centrado. Estirarlo a `1200px` porque el monitor es grande destruye la ergonomía ocular.
3. **Evitar Anchos Basados en Porcentajes Rígidos en Columnas Mixtas:** Una barra lateral de navegación debe tener un ancho fijo o acotado (`240px–280px`), dejando que el área de contenido principal absorba el espacio flexible (`1fr`), en lugar de usar `width: 25%` y `width: 75%`.

---

## 3. Escala Tipográfica Modular, `line-height` Inverso y Alineación de Línea Base

### 3.1 Relación Inversa entre Tamaño de Fuente, Interlineado (`line-height`) y Tracking (`letter-spacing`)
Uno de los errores más graves del diseño generado sin criterio es aplicar `line-height: 1.5` y `letter-spacing: 0` tanto a un párrafo de `16px` como a un titular Hero de `56px`. Cuando las letras son grandes, un interlineado de `1.5` desconecta visualmente las líneas del mismo título.

| Rol Tipográfico | Fórmula Fluida (`clamp()`) | `line-height` Obligatorio | `letter-spacing` Obligatorio | Medida Máxima (`max-width`) |
| :--- | :--- | :--- | :--- | :--- |
| **Display / Hero (`h1`)** | `clamp(2.25rem, 4vw + 1rem, 4.25rem)` | `1.05` – `1.12` | `-0.03em` a `-0.04em` | `14ch` – `20ch` (`text-wrap: balance`) |
| **Título de Sección (`h2`)** | `clamp(1.75rem, 2.5vw + 0.75rem, 2.75rem)` | `1.15` – `1.20` | `-0.02em` a `-0.025em` | `20ch` – `28ch` (`text-wrap: balance`) |
| **Título de Tarjeta (`h3`)** | `clamp(1.20rem, 1.2vw + 0.6rem, 1.50rem)` | `1.25` – `1.30` | `-0.015em` | `30ch` – `40ch` |
| **Lead / Subtítulo Hero** | `clamp(1.125rem, 0.5vw + 0.95rem, 1.25rem)` | `1.55` – `1.65` | `-0.005em` | `50ch` – `62ch` (`text-wrap: pretty`) |
| **Cuerpo Estándar (`body`)** | `1rem` (`16px`) – `1.0625rem` (`17px`) | `1.60` – `1.70` | `0em` | `60ch` – `70ch` (`text-wrap: pretty`) |
| **Microcopy / Badges (`xs`)** | `0.75rem` (`12px`) – `0.8125rem` (`13px`) | `1.35` – `1.45` | `+0.04em` a `+0.08em` (si es `uppercase`) | Sin límite fijo |

### 3.2 Alineación por Línea Base (`align-items: baseline`) y Cifras Tabulares
- Cuando combines un precio grande (`$49.000`) con su unidad temporal (`/mes` o `ARS + IVA`) en la misma fila horizontal, **nunca uses `align-items: center`**: usa siempre `display: flex; align-items: baseline; gap: 0.375rem;` para que ambas tipografías descansen sobre la misma línea imaginaria.
- En toda tabla comparativa, contador, precio o estadística, declarar obligatoriamente `font-variant-numeric: tabular-nums;` para que el dígito `1` ocupe exactamente el mismo ancho horizontal que el dígito `8`.

---

## 4. Paletas Perceptuales en `OKLCH` y Física de Profundidad (Sombras de Doble Capa)

### 4.1 Por Qué Necesitás 9 Tonos por Color (y No Uno Solo)
Un sistema de diseño real no tiene "un color primario, un verde para éxito y un rojo para error". Cada color semántico requiere una **escala de 9 pasos (`50` a `900`)** en `OKLCH` donde la luminosidad (`L`) varía de `0.97` (`50`, para fondos sutiles de alertas/badges) a `0.22` (`900`, para texto de alto contraste sobre ese fondo).

```css
/* Ejemplo Canónico: Construcción de un Badge Semántico con Contraste Perceptual Perfecto */
.badge-success {
  /* Nunca poner texto blanco sobre un verde brillante ilegible */
  background-color: oklch(0.95 0.04 150); /* Tono 100: Muy luminoso, croma bajo */
  color: oklch(0.28 0.09 150);            /* Tono 800: Oscuro, mismo matiz 150° */
  border: 1px solid oklch(0.86 0.07 150); /* Tono 200: Borde sutil armónico */
}

[data-theme="dark"] .badge-success {
  background-color: oklch(0.22 0.05 150 / 0.65);
  color: oklch(0.88 0.10 150);
  border: 1px solid oklch(0.38 0.08 150 / 0.50);
}
```

### 4.2 Física de Iluminación Cenital: Sombras de Doble Capa y Bordes Especulares
En el mundo físico, la luz proviene desde arriba. Una superficie elevada presenta un **borde superior ligeramente iluminado** (reflejo especular) y proyecta **dos sombras simultáneas**: una sombra pequeña y nítida de contacto directo, y una sombra ambiental amplia y difusa.

| Nivel de Elevación | Uso Canónico | Definición CSS Completa (`box-shadow` de Doble Capa) |
| :--- | :--- | :--- |
| **Nivel 1 (`--shadow-sm`)** | Botones, inputs activos, badges elevados | `inset 0 1px 0 0 oklch(1 0 0 / 0.12), 0 1px 2px 0 oklch(0 0 0 / 0.18)` |
| **Nivel 2 (`--shadow-md`)** | Bento Cards en reposo, paneles desplegables cortos | `inset 0 1px 0 0 oklch(1 0 0 / 0.10), 0 4px 12px -2px oklch(0 0 0 / 0.22), 0 2px 4px -1px oklch(0 0 0 / 0.12)` |
| **Nivel 3 (`--shadow-lg`)** | Tarjetas en estado `:hover`, menús flotantes, popovers | `inset 0 1px 0 0 oklch(1 0 0 / 0.16), 0 12px 28px -4px oklch(0 0 0 / 0.30), 0 4px 8px -2px oklch(0 0 0 / 0.16)` |
| **Nivel 4 (`--shadow-xl`)** | Diálogos modales (`<dialog>`), Command Palettes (`Cmd+K`) | `inset 0 1px 0 0 oklch(1 0 0 / 0.20), 0 24px 48px -8px oklch(0 0 0 / 0.45), 0 8px 16px -4px oklch(0 0 0 / 0.25)` |

### 4.3 Superación del *Boxed Slop* (De-Boxing)
Antes de encerrar un grupo de elementos dentro de un `div` con `border: 1px solid` y `background`:
1. Probá primero separarlos únicamente mediante **espacio negativo (`--space-8` o `--space-12`)** y alineación limpia.
2. Si una lista de elementos necesita separación, usa un divisor sutil horizontal (`border-bottom: 1px solid oklch(1 0 0 / 0.06)`) en lugar de encerrar cada fila en una caja individual.
3. Reserva las cajas con borde y fondo elevado exclusivamente para **elementos interactivos clicables, contenedores de formularios o bloques Bento con jerarquía diferenciada**.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[DESIGN_MASTERY_2026]] · [[AGENT_CREATIVE_AND_VISUAL_AWARENESS_2026]] · [[CANON_PRACTICAL_UI_ADHAM_DANNAWAY]] · [[CANON_EVERY_LAYOUT_CSS_ALGORITHMS]] · #ui_ux_design
