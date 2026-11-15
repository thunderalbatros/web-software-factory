# Canon de Diseño Inclusivo, Minimalismo Cognitivo y Explicabilidad Interactiva 2026

> **Alcance epistemológico:** `TIER_1_SOTA_2026` (`authorityBoost: 1.35`). Destilación *clean-room* de los principios universales de ergonomía visual y arquitectura web SOTA 2026 (`OKLCH`, `W3C DTCG 2025.10`, `APCA`, `clamp()`, `lite-youtube-embed`) para **Academia IA**. Idioma de lecciones y microcopy: español neutro internacional (`tú`).

---

## 1. Síntesis *Clean-Room* de Principios Visuales e Interactivos

Nuestra biblioteca técnica de UX (principios de claridad de datos de Tufte, psicología perceptual de Weinschenk, *Laws of UX* y jerarquía espacial de diseño de interfaces) converge con cuatro referentes pedagógicos modernos:

- **Brilliant.org — Aprender tocando desde el primer minuto:** El aprendizaje activo ocurre cuando puedes mover un control y ver de inmediato cómo cambia la respuesta o la visualización, antes de leer tres párrafos densos.
- **Stripe Docs — Lectura + Acción sin salto visual:** En pantallas anchas, la explicación breve convive lado a lado con la plantilla, parámetro interactivo o resultado en vivo (`Entender` a la izquierda, `Probar` a la derecha); en móvil se apilan en orden lógico sin pérdida de contexto.
- **Khan Academy — Calidez humana sin sobrecarga:** Progreso claro, mensajes alentadores que normalizan equivocarse durante la práctica y navegación predecible para personas no técnicas.
- **Distill.pub — Explicaciones explorables y ritmo tipográfico:** Ancho de línea cómodo (`60ch`–`70ch`), diagramas inline acoplados directamente al texto que explican y ausencia total de decoración que compita por atención.

### Leyes Prácticas de Carga Visual Cero
1. **Máxima relación información útil / decoración (Tufte):** Elimina cajas innecesarias dentro de cajas, sombras pesadas y degradados neón llamativos. Separa secciones mediante espacio en blanco generoso y bordes sutiles de un píxel lógico.
2. **Reconocimiento antes que recuerdo (Weinschenk / Ley de Hick):** Reduce las decisiones visibles en cada paso. Una lección abierta muestra un objetivo claro, su hilo actual y **una única acción primaria siguiente** (*"Comprobar respuesta"*, *"Probar ejemplo"*, *"Continuar a la lección 2"*).
3. **Objetivos táctiles generosos (Ley de Fitts):** Todo botón, conmutador o tarjeta interactiva mantiene un área mínima tocable de `44x44` puntos lógicos y separación confortable entre controles para evitar toques accidentales en teléfonos.
4. **Regla Pico-Final y Efecto Von Restorff:** El color de acento saturado se reserva exclusivamente para el elemento clave del momento o el logro recién completado.

---

## 2. Sistema Cromático Perceptual `OKLCH 90/8/2` (`W3C DTCG 2025.10`)

El sistema visual descansa en el espacio perceptual **OKLCH** para garantizar luminosidad uniforme entre niveles y descanso visual prolongado tanto en **modo claro editorial cálido** (predeterminado para lectura cómoda diurna) como en **modo oscuro obsidiana suave** (sin fondos de negro puro agresivo).

### Regla de Distribución Cromática `90 / 8 / 2`
- **`90%` Superficies neutras base y lectura (`--surface-canvas`, `--surface-paper`):** Fondo de papel limpio cálido en modo claro (`oklch(0.985 0.006 85)`) o pizarra profunda confortable en modo oscuro (`oklch(0.16 0.012 255)`), con tinta principal de alto contraste (`oklch(0.22 0.015 255)` / `oklch(0.94 0.008 85)`).
- **`8%` Superficies estructurales y separación (`--surface-subtle`, `--border-hairline`):** Barras de navegación, tarjetas de contexto, bordes finos y bloques de ejemplo discretos.
- **`2%` Acento semántico reservado al nivel educativo activo y CTA principal:**

| Nivel Formativo | Semántica | Token DTCG sugerido (`OKLCH`) | Rol visual exclusivo |
| :--- | :--- | :--- | :--- |
| **Principiante (*Acquire*)** | Verde esmeralda sereno | `oklch(0.62 0.14 155)` | Primer paso seguro, confirmación, barra inicial |
| **Intermedio (*Deepen*)** | Azul zafiro analítico | `oklch(0.58 0.15 250)` | Flujos conectados, enfoque lógico, pistas |
| **Avanzado (*Create*)** | Ámbar dorado de maestría | `oklch(0.68 0.14 75)` | Proyectos Jefe, verificación experta, hitos |

---

## 3. Ritmo Predecible de 5 Tiempos en Toda Lección

Para que cualquier persona anticipe cómo funciona el entorno desde la primera clase, cada unidad interactiva sigue la misma coreografía sobria y modular:

1. **Tiempo 1 — Gancho cotidiano (`<= 60` palabras):** Un problema reconocible (*"Tienes que responder un correo delicado sin sonar frío ni revelar datos internos"*).
2. **Tiempo 2 — Idea clave + Micro-control en vivo:** Explicación breve (`<= 110` palabras) acompañada de un control manipulable directo (por ejemplo, deslizador de creatividad/precisión o interruptor *Prompt vago vs. Prompt con rol y formato*) que actualiza la salida al instante sin necesidad de servidor.
3. **Tiempo 3 — Video breve curado + Equivalente textual accesible:** Inserción ligera con fachada **`lite-youtube-embed`** apuntando a `youtube-nocookie.com` (cero cookies de seguimiento previas al clic). Debajo de cada video figura obligatoriamente un **resumen estructurado en 3 puntos clave** para quienes prefieren leer, estudian con poco ancho de banda o navegan con lector de pantalla.
4. **Tiempo 4 — Práctica guiada con herramientas gratuitas:** Ejercicio corto con plantilla copiable, alternativas gratuitas sin tarjeta y enlace a las instrucciones locales de privacidad.
5. **Tiempo 5 — Micro-cuestionario de 3 preguntas con Tutor Socrático:** Evaluación inmediata (recuerdo, aplicación y juicio crítico) respaldada por la escalera de 3 pistas antes de mostrar la solución.

---

## 4. Ergonomía Fluida, Contraste `APCA` y Movimiento Respetuoso

- **Tipografía fluida Utopia con `clamp(...)`:** Escala continua y proporcional entre pantallas móviles estrechas (`360` a `400` unidades lógicas) y escritorio amplio (`1440`+ unidades lógicas) usando exclusivamente unidades relativas (`rem`, `clamp()`, `ch`) para que hacer zoom de `100%` hasta `200%` nunca rompa la lectura ni genere desplazamiento horizontal.
- **Contraste perceptual `APCA`:** Todo texto de lectura prolongada supera `Lc >= 75`; etiquetas auxiliares, pistas e indicadores de progreso mantienen `Lc >= 60`; todo borde o icono funcional cumple visibilidad suficiente en ambos temas.
- **Accesibilidad nativa HTML5 sin trucos:** Navegación íntegra con teclado (`Tab`, `Enter`, `Escape`), anillos `:focus-visible` claros y contraste suficiente, componentes `<dialog>` y `<details>` nativos, regiones `aria-live="polite"` para anunciar el feedback de ejercicios sin mover el foco bruscamente.
- **Cumplimiento estricto de `prefers-reduced-motion: reduce`:** Las animaciones solo animan propiedades de composición ligera (`transform`, `opacity`, `< 280 ms`). Cuando el dispositivo solicita movimiento reducido, los desplazamientos espaciales se desactivan y se reemplazan por transiciones suaves o cambios instantáneos de estado.
- **Presupuesto ligero en Edge:** HTML y CSS semánticos mínimos, islas JavaScript diferidas únicamente para controles interactivos y reproducción de video bajo demanda, garantizando puntuación perfecta de rendimiento y cero saltos de diseño (`CLS = 0.00`).

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SOTA_RAG_ARCHITECTURES_AND_TOOLS_2026]] · [[CURATED_MASTER_BOOKS_AND_COURSES_2026]] · [[CANON_SOFTWARE_ENGINEERING_AT_GOOGLE]] · [[CANON_HARNESS_ENGINEERING_INTEGRAL_2026]] · #ai_academy
