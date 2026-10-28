# CANON: Practical UI — Adham Dannaway (Edición Expandida: Reglas Cuantitativas de Interfaz, Formularios, Botones y Modo Oscuro por Elevación 2026)

> **Dominio:** `ui_ux_design` / `quantitative_ui_rules`  
> **Versión:** 2026.10 (SOTA Web Software Factory — Tratado Expandido)  
> **Aplicación:** `templates/astro-edge`, `templates/vanilla-edge`, `projects/<slug>`

---

## Tabla de Trazabilidad de Fuentes Físicas

| Sección del Canon | Archivo Físico / Fuente Primaria Verificada | Conceptos y Reglas Extraídas |
| :--- | :--- | :--- |
| **1. Leyes Geométricas de Proximidad y Radios Concéntricos** | `knowledge/ui_ux_design/LIBRARY_INGEST_01_UI_UX_TYPOGRAPHY_AND_CSS_39_BOOKS_2026.md` (`Adham Dannaway — Practical UI`) + `.agents/skills/baseline-ui/SKILL.md` | Ecuación de proximidad Gestalt ($\text{Padding}_{\text{in}} \le 0.5 \times \text{Margin}_{\text{out}}$) y fórmula de curvatura concéntrica ($R_{\text{ext}} = R_{\text{int}} + P$). |
| **2. Jerarquía de Botones de 3 Niveles y Geometría de Acción** | `LIBRARY_INGEST_01_UI_UX_TYPOGRAPHY_AND_CSS_39_BOOKS_2026.md` + `.agents/skills/modern-frontend-design/references/full-guide.md` | Regla de un único botón Primario por vista/grupo, contraste entre Primario/Secundario/Terciario, verbos accionables y áreas táctiles mínimas (`44x44px`). |
| **3. Ergonomía Científica de Formularios de Alta Conversión** | `LIBRARY_INGEST_01_UI_UX_TYPOGRAPHY_AND_CSS_39_BOOKS_2026.md` (`Practical UI` + `Luke Wroblewski — Web Form Design`) | Flujo de columna única, etiquetas superiores permanentes, reemplazo de `<select>` por Radio Cards cuando $N \le 5$, ancho proporcional al dato y validación en `blur`. |
| **4. Modo Oscuro por Elevación de Luminancia (`OKLCH`)** | `.agents/skills/modern-frontend-design/references/full-guide.md` + `LIBRARY_INGEST_01_UI_UX_TYPOGRAPHY_AND_CSS_39_BOOKS_2026.md` | Prohibición de `#000000` puro, escala de 4 planos de elevación lumínica en `OKLCH` y desaturación cromática contra el efecto de halación ocular. |

---

## 1. Leyes Geométricas de Proximidad (Gestalt) y Radios Concéntricos

El ojo humano agrupa objetos automáticamente según su distancia relativa (**Ley de Proximidad de la Gestalt**). Cuando el espacio dentro de un grupo es igual o mayor que el espacio entre grupos distintos, el usuario no puede distinguir qué título pertenece a qué párrafo o qué etiqueta corresponde a qué campo de formulario.

### 1.1 La Desigualdad Fundamental del Espaciado Interno vs. Externo
En todo contenedor, tarjeta o bloque de formulario debe cumplirse estrictamente:

$$\text{Espacio Interno (Gap / Padding)} \le 0.5 \times \text{Espacio Externo (Margen entre Grupos)}$$

| Relación de Elementos | Distancia Obligatoria (Token) | Justificación Perceptual |
| :--- | :--- | :--- |
| **Entre `Label` y su `Input`** | `0.375rem` – `0.5rem` (`6px–8px`) | Deben percibirse como una unidad atómica indivisible. |
| **Entre un `Input` y el siguiente `Label` de abajo** | `1.25rem` – `1.5rem` (`20px–24px`) | Al ser `3x` mayor que la distancia label-input (`8px`), jamás hay duda de a qué campo pertenece la etiqueta. |
| **Entre `Eyebrow` (Badge superior) y `H2`** | `0.75rem` (`12px`) | Vincula la categoría con el titular principal. |
| **Entre `H2` y su párrafo introductorio (`Lead`)** | `1.00rem` (`16px`) | Mantiene la cohesión del encabezado de sección. |
| **Entre el encabezado de sección y la grilla de tarjetas** | `3.00rem` – `4.00rem` (`48px–64px`) | Separa claramente la introducción conceptual del listado de ítems. |

### 1.2 Fórmula Matemática de Radios de Borde Concéntricos
Cuando una tarjeta con bordes redondeados contiene una imagen interna, un bloque de código o un botón que se acerca a sus esquinas, **usar el mismo `border-radius` en ambos elementos produce una deformación óptica** (el grosor del borde parece ensancharse en las diagonales).
Siempre aplicar la ecuación de radios concéntricos:

$$R_{\text{externo}} = R_{\text{interno}} + d_{\text{padding}}$$

- **Ejemplo Práctico en CSS:**
  - Si la tarjeta externa tiene `padding: 16px` (`1rem`) y el elemento hijo interno tiene `border-radius: 8px` (`0.5rem`), entonces la tarjeta externa **debe tener exactamente** `border-radius: 24px` (`8px + 16px = 24px` / `1.5rem`).
  - Si la tarjeta tiene `padding: 24px` (`1.5rem`) y el radio externo es `24px`, cualquier elemento interno pegado a ese padding debe usar `border-radius: 8px` a `12px`.

---

## 2. Sistema de Jerarquía de Botones de 3 Niveles

Cuando una sección muestra dos o tres botones con el mismo peso visual sólido, el usuario sufre parálisis de análisis (**Ley de Hick**). Toda vista o barra de acciones debe respetar estrictamente la **Jerarquía de 3 Pesos**:

| Nivel de Acción | Estilo Visual Canónico | Límite por Agrupación | Ejemplos de Uso Correcto |
| :--- | :--- | :--- | :--- |
| **1. Primario (Sólido / Alto Contraste)** | Fondo `--primary` sólido, texto de alto contraste (`Lc >= 75`), sombra sutil `--shadow-sm` + borde especular superior. | **Máximo 1 por grupo visual / Hero** | *"Agendar diagnóstico gratuito"*, *"Crear cuenta gratis"*, *"Confirmar pago"* |
| **2. Secundario (Superficie / Contorno)** | Fondo transparente o superficie elevada `oklch(1 0 0 / 0.04)`, borde `1px solid var(--border-strong)`, texto `--text-primary`. | 1 a 2 acciones alternativas | *"Ver arquitectura en vivo"*, *"Calcular ahorro"*, *"Descargar ficha técnica PDF"* |
| **3. Terciario (Ghost / Enlace con Flecha)** | Sin borde ni caja en reposo; texto `--text-secondary` que pasa a `--text-primary` en `:hover` con flecha `->` animada (`translateX(4px)`). | Acciones de baja prioridad o cancelación | *"Cancelar"*, *"Volver al paso anterior"*, *"Leer documentación API →"* |

### 2.1 Reglas de Micro-Diseño de Botones y Áreas Táctiles
1. **Verbos de Primera Persona o Imperativo Específico:** Nunca rotular un botón como *"Enviar"* (*Submit*), *"Aceptar"* o *"Más información"*. El texto del botón debe completar la frase *"Quiero..."*: **`"Recibir mi cotización en PDF"`**, **`"Reservar mi turno del jueves"`**, **`"Probar 14 días sin cargo"`**.
2. **Área Táctil Mínima (`44px × 44px`):** En cumplimiento de **WCAG 2.2 AA (2.5.8 Target Size)** y las guías de Apple/Android, ningún botón, enlace de navegación o ícono clicable puede tener un área interactiva menor a `44px` de alto por `44px` de ancho, con al menos `8px` de separación libre respecto al siguiente control.
3. **Acciones Destructivas:** Un botón de *"Eliminar cuenta"* o *"Cancelar suscripción"* nunca debe pintarse de rojo sólido brillante en la vista inicial si compite con la acción principal. Debe presentarse como botón Secundario o Terciario y recién volverse rojo sólido (`--color-danger`) dentro del modal de confirmación explícita.

---

## 3. Ergonomía Científica de Formularios de Alta Conversión

Los formularios son el punto de mayor abandono en sitios B2B, clínicas y e-commerce. Aplicar siempre estas **8 reglas cuantitativas de Adham Dannaway**:

1. **Disposición de Columna Única (*Single-Column Layout*):** Los estudios de seguimiento ocular (*Eye-Tracking*) demuestran que los formularios de múltiples columnas obligan al ojo a hacer recorridos en Z erráticos, aumentando el tiempo de completado y el riesgo de omitir campos.
   - *Única excepción permitida:* Campos estrechamente emparejados en el modelo mental del usuario: `[Código Postal] + [Ciudad]` o `[Fecha de Vencimiento MM/AA] + [CVC]`.
2. **Etiquetas Siempre Visibles Encima del Campo (*Top-Aligned Labels*):**
   - **Prohibido usar `placeholder` como reemplazo de `<label>`:** En cuanto el usuario escribe el primer carácter, el placeholder desaparece, obligando a la memoria de trabajo a recordar qué pedía el campo y rompiendo los lectores de pantalla.
   - El `<label for="...">` va **encima del input** (`margin-bottom: 6px`, `font-weight: 500`, `font-size: 0.875rem`, `--text-primary`).
   - El `placeholder` solo se usa para mostrar un **ejemplo concreto de formato** (ej. `Ej: +54 9 11 4567-8900` o `nombre@empresa.com.ar`) con contraste atenuado (`--text-muted`).
3. **Marcar los Campos Opcionales, No los Obligatorios:**
   - En un formulario optimizado, al menos el 80% de los campos deben ser necesarios (si un campo no es necesario, eliminarlo). Por lo tanto, en lugar de llenar la pantalla de asteriscos rojos `*` que generan estrés visual, **asumir que todos son obligatorios y añadir `(opcional)` en gris suave únicamente a los 1 o 2 campos opcionales**.
4. **Reemplazar Desplegables (`<select>`) por *Radio Cards* cuando las Opciones sean $\le 5$:**
   - Un `<select>` oculta las opciones detrás de un clic adicional y requiere precisión motriz. Si el usuario debe elegir entre 2 y 5 opciones (ej. *"Tamaño de empresa"*, *"Presupuesto estimado"*, *"Tipo de consulta"*), mostrarlas directamente como **tarjetas seleccionables o píldoras de radio visibles**.
5. **Ancho del Input Proporcional al Dato Esperado:** Un campo para Código Postal (`4–8 caracteres`) o Edad no debe medir `600px` de ancho. Ajustar el `max-width` en unidades `ch` según el dato esperado.
6. **Validación Inline en `blur` (Nunca Mientras el Usuario Escribe el Primer Carácter):**
   - No mostrar un cartel rojo de *"Email inválido"* cuando el usuario recién escribió `juan@`. Validar cuando el usuario sale del campo (`blur`), y retirar el estado de error **instantáneamente en `input`** apenas el usuario corrige el dato.

---

## 4. Modo Oscuro por Elevación de Luminancia (`OKLCH`)

En modo claro (*Light Mode*), percibimos la altura de una tarjeta por la sombra oscura que proyecta sobre el fondo blanco. En **Modo Oscuro (*Dark Mode*)**, las sombras negras sobre un fondo casi negro son prácticamente invisibles. Por lo tanto, **en modo oscuro la profundidad se comunica aumentando la luminosidad (`L` en `OKLCH`) de la superficie a medida que se acerca al usuario**.

### 4.1 Escala Canónica de 4 Planos de Elevación en Modo Oscuro

| Plano Z (Profundidad) | Rol de Superficie | Token CSS | Valor `OKLCH` Exacto | Regla de Borde |
| :--- | :--- | :--- | :--- | :--- |
| **Plano 0 (Fondo Base)** | `<body>` / Lienzo principal | `--bg-canvas` | `oklch(0.09 0.012 260)` | Sin borde |
| **Plano 1 (Sección / Agrupador)** | Contenedor de sección alterna o sidebar | `--bg-surface-1` | `oklch(0.12 0.014 260)` | `1px solid oklch(1 0 0 / 0.05)` |
| **Plano 2 (Tarjeta / Bento Card)** | Tarjetas interactivas, tablas, formularios | `--bg-surface-2` | `oklch(0.15 0.016 260)` | `1px solid oklch(1 0 0 / 0.08)` + `inset 0 1px 0 oklch(1 0 0 / 0.08)` |
| **Plano 3 (Flotante / Modal / Hover)** | Dropdowns, Tooltips, Modales, Tarjeta `:hover` | `--bg-surface-3` | `oklch(0.19 0.018 260)` | `1px solid oklch(1 0 0 / 0.14)` + `--shadow-xl` |

### 4.2 Ley de Desaturación contra la Halación Ocular
Un color azul o violeta muy saturado (`Chroma > 0.24`) que se ve nítido sobre fondo blanco **vibra ópticamente y produce fatiga visual (halación/astigmatismo)** sobre fondo oscuro. En `[data-theme="dark"]`, todo color de acento utilizado en textos o bordes debe **incrementar su luminosidad (`L` +0.12 a +0.18) y reducir su croma (`C` -15% a -25%)**.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[DESIGN_MASTERY_2026]] · [[AGENT_CREATIVE_AND_VISUAL_AWARENESS_2026]] · [[CANON_REFACTORING_UI_WATHAN_SCHOGER]] · [[CANON_EVERY_LAYOUT_CSS_ALGORITHMS]] · #ui_ux_design
