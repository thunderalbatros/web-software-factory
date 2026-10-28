# CANON: Copywriting en Español (Rioplatense y Neutro), Ingeniería de Ofertas ($100M Offers de Hormozi), 5 Niveles de Consciencia de Eugene Schwartz y Diagnóstico CRO (2026)

> **Dominio:** `ui_ux_design` / `conversion_engineering`  
> **Versión:** 2026.10 (SOTA Web Software Factory)  
> **Aplicación:** `templates/astro-edge`, `templates/vanilla-edge`, `projects/<slug>`

---

## Tabla de Trazabilidad de Fuentes Físicas

| Sección del Canon | Archivo Físico / Fuente Primaria Verificada | Conceptos y Reglas Extraídas |
| :--- | :--- | :--- |
| **1. Ecuación de Valor y Anatomía de Oferta** | `C:\Users\tomas\Desktop\streamerbot\references\sota-2026\growth-and-hitl\marketingskills\skills\offers\SKILL.md` (`Alex Hormozi — $100M Offers`) | Ecuación de Valor de 4 variables, los 6 bloques de una Grand Slam Offer, regla de apilamiento de bonos (3–5 bonos, techo 60% del core), matriz de 4 tipos de garantías y fórmula de Naming. |
| **2. Los 5 Niveles de Consciencia y Copywriting** | `C:\Users\tomas\Desktop\streamerbot\references\sota-2026\growth-and-hitl\marketingskills\skills\copywriting\SKILL.md` (`Eugene Schwartz — Breakthrough Advertising`) | Mapeo de *Unaware*, *Problem-Aware*, *Solution-Aware*, *Product-Aware* y *Most Aware*; el Filtro de las 3 Preguntas (*Visualizable, Falsable, Swap Test*); prohibición de *AI Tells*. |
| **3. Diagnóstico CRO y Metodología DiPS** | `C:\Users\tomas\Desktop\streamerbot\references\sota-2026\growth-and-hitl\marketingskills\skills\cro\SKILL.md` + `knowledge/streaming_and_overlays/LIBRARY_INGEST_06_GAMIFICATION_PSYCHOLOGY_CRO_AND_AI_22_BOOKS_2026.md` (`Karl Blanks & Ben Jesson — Making Websites Win`) | Bucle `DiPS` (*Diagnose → Problem → Solution*), matriz de objeciones por encima y debajo del pliegue (*Above the Fold*), jerarquía de pruebas sociales con números verificables. |
| **4. Psicología de Precios y Métricas de Valor** | `C:\Users\tomas\Desktop\streamerbot\references\sota-2026\growth-and-hitl\marketingskills\skills\pricing\SKILL.md` + `skills\marketing-psychology\SKILL.md` | *Good-Better-Best* (3 tiers), *Value Metrics*, *Charm Pricing* vs. *Prestige Pricing*, *Decoy Effect*, *Loss Aversion* ($\lambda \approx 2.25$) y *Endowment Effect*. |

---

## 1. La Ecuación de Valor de Alex Hormozi (`$100M Offers`)

Ningún diseño visual en `OKLCH` ni animación a `60 FPS` puede salvar una oferta débil. Antes de redactar un titular o diseñar una tabla de precios, el agente debe auditar la oferta con la **Ecuación de Valor**:

$$\text{Valor Percibido} = \frac{\text{Resultado Soñado (Dream Outcome)} \times \text{Probabilidad Percibida de Logro}}{\text{Demora Temporal (Time Delay)} \times \text{Esfuerzo y Sacrificio (Effort \& Sacrifice)}}$$

### Regla Matemática del Denominador Cero
La mayoría de los sitios web intentan inflar el numerador haciendo promesas más grandes (*"Duplicá tus ventas"* $\rightarrow$ *"Multiplicá por 10 tus ventas"*), lo cual **reduce la credibilidad** de la marca. Los sitios de máxima conversión atacan el **denominador**:
1. **Comprimir la Demora Temporal (`Time Delay` $\rightarrow 0$):** Entregar una **Victoria Rápida en el Día 1** (*First-Day Win*) antes de que el servicio principal demore semanas.
   - *Ejemplo SaaS:* En lugar de *"Implementación en 30 días"*, ofrecer *"Conectá tu cuenta en 90 segundos y recibí el primer diagnóstico de fugas de caja hoy mismo"*.
   - *Ejemplo Servicios Profesionales:* Entregar una auditoría base automatizada o plantilla ejecutiva inmediatamente tras agendar la llamada.
2. **Eliminar el Esfuerzo y Sacrificio (`Effort & Sacrifice` $\rightarrow 0$):** Reemplazar el trabajo manual del cliente (*Done-It-Yourself*) por plantillas preconfiguradas, migración asistida sin cargo (*White-Glove Migration*) o configuración llave en mano (*Done-For-You*).

### Matriz de Diagnóstico de las 4 Palancas

| Palanca | Pregunta de Auditoría | Síntoma de Debilidad en la Web | Corrección de Ingeniería de Oferta |
| :--- | :--- | :--- | :--- |
| **1. Resultado Soñado** | ¿Está expresado en el lenguaje exacto del comprador o en jerga técnica? | *"Plataforma omnicanal con IA generativa"* | *"Respondé el 100% de las consultas de WhatsApp en menos de 12 segundos y cerrá 30% más turnos"* |
| **2. Probabilidad Percibida** | ¿Por qué un comprador escéptico creería que esto funcionará para SU caso? | Testimonios genéricos (*"Excelente atención, muy recomendables"*) | Casos de estudio con **Línea Base $\rightarrow$ Intervención $\rightarrow$ Delta Numérico + Plazo** + Garantía de reversión de riesgo |
| **3. Demora Temporal** | ¿Cuánto tarda el usuario en percibir el primer retorno tangible tras pagar o registrarse? | *"En 90 días verás resultados"* sin hitos intermedios | Crear un entregable instantáneo (*Time-to-First-Value < 5 min*) |
| **4. Esfuerzo y Sacrificio** | ¿Qué tareas tediosas tiene que hacer el cliente para que el producto funcione? | *"Importá tus CSVs, configurá tus webhooks y entrená el modelo"* | *"Nosotros migramos tu base histórica en 24h sin que toques una sola línea de código"* |

---

## 2. Anatomía de los 6 Componentes de una Oferta de Alta Conversión

Toda sección de oferta o *Pricing Section* generada por la fábrica debe estructurarse sobre estos 6 bloques:

### 2.1 Entregable Principal (*Core Deliverable*)
Para cada obstáculo del comprador, definir explícitamente el formato de entrega:
- **`1:1` (Personalizado):** Máximo valor percibido, ideal para anclar el tier *Enterprise* o *Concierge*.
- **`Done-For-You` (Llave en mano):** Elimina el esfuerzo inicial (ej. configuración inicial o migración incluida).
- **`Done-With-You` (Acompañado):** Sesiones de *onboarding* o revisión de arquitectura.
- **`Do-It-Yourself` (Autoservicio con Herramientas):** Calculadoras, plantillas, scripts y checklists listos para usar.

### 2.2 Apilamiento de Bonos (*Bonus Stack* — Regla de 3 a 5 Bonos)
- **Propósito de cada bono:** Un bono NO es "más relleno"; cada bono debe **neutralizar una objeción específica** que impide la compra (ej. *"No tengo tiempo para cargar los productos"* $\rightarrow$ **Bono 1:** *Importación masiva asistida de catálogo en 24h*).
- **Cantidad óptima:** Entre **3 y 5 bonos**. Más de 5 parece relleno artificial; menos de 2 no genera efecto de apilamiento.
- **Techo de Valor Monetario:** La suma del valor asignado a los bonos **no debe superar el 60% del precio del producto principal**, salvo que los bonos se vendan realmente por separado a ese precio comprobable.

### 2.3 Reversión de Riesgo (*Guarantee Matrix*)
Todo botón de pago o compromiso comercial debe estar escoltado por una de las 4 garantías canónicas:

| Tipo de Garantía | Cuándo Usarla | Plantilla de Copywriting Verificada |
| :--- | :--- | :--- |
| **1. Incondicional (*Unconditional*)** | SaaS B2B/B2C de ticket bajo o medio (`< $200/mes`), infoproductos, e-commerce | *"Probalo durante 30 días. Si no reduce tu tiempo de facturación a la mitad, cancelás con un clic desde tu panel y te devolvemos el 100% en el acto. Sin llamadas ni preguntas."* |
| **2. Condicional Basada en Acción (*Action-Based*)** | Servicios de alto ticket, consultoría, programas de implementación | *"Si completás la configuración asistida en los primeros 14 días y no generás al menos 15 presupuestos calificados en tu primer mes, trabajamos gratis con tu equipo hasta lograrlo."* |
| **3. Anti-Garantía (*Anti-Guarantee*)** | Servicios exclusivos, auditorías forenses o licencias donde el valor se consume al instante | *"Todas las ventas son definitivas porque entregamos nuestra arquitectura propietaria completa desde el minuto uno. Si tenés dudas de si aplica a tu caso, agendá primero el diagnóstico técnico gratuito de 15 minutos."* |
| **4. Rendimiento Implícito (*Performance / Rev-Share*)** | Agencias de performance, optimización de conversión, recuperación de carritos | *"Cero costo fijo mensual de mantenimiento: solo cobramos el 12% de la facturación incremental auditada que generemos por encima de tu línea base actual."* |

### 2.4 Escasez y Urgencia Honesta (*Zero Dark Patterns*)
- **PROHIBIDO por la Constitución de la Fábrica:** Contadores regresivos falsos que se reinician al recargar la página, cupos inventados o notificaciones falsas de compra (*"Juan de Córdoba acaba de comprar hace 2 minutos"*).
- **Escasez Honesta Basada en Capacidad Real:** *"Tomamos un máximo de 4 implementaciones nuevas por mes porque nuestro ingeniero principal audita personalmente cada despliegue. Cupos disponibles en octubre: 1."*
- **Urgencia Basada en Cohorte o Calendario Real:** *"Cierre de inscripciones para la cohorte de noviembre: viernes 18:00 ART."*

### 2.5 Fórmula de Naming de la Oferta
Nunca llamar a una oferta *"Plan Pro"*, *"Servicio de Consultoría"* o *"Paquete Completo"*. Usar la fórmula de 4 partes:
$$\text{[Resultado/Adjetivo]} + \text{[Audiencia Específica]} + \text{[Plazo Concreto]} + \text{[Formato/Contenedor]}$$
- *Ejemplo B2B:* **Sistema de Despacho Automatizado en 14 Días para Distribuidoras Mayoristas**.
- *Ejemplo Salud/Clínicas:* **Programa de Agenda Llena en 30 Días para Consultorios Odontológicos**.

---

## 3. Los 5 Niveles de Consciencia de Eugene Schwartz Adaptados al Español (Rioplatense vs. Neutro)

El error #1 en páginas de aterrizaje es escribir un Hero *Product-Aware* (hablando de las características de la empresa) para tráfico que llega *Problem-Aware* o *Solution-Aware*.

### Matriz de Entrada por Nivel de Consciencia

| Nivel de Consciencia | Estado Mental del Visitante | Estrategia de Titular (Hero) | Español Rioplatense (Argentina / Uruguay — Voseo Profesional) | Español Neutro Internacional (LATAM / España / B2B Regional) |
| :--- | :--- | :--- | :--- | :--- |
| **1. Unaware (Inconsciente)** | No sabe que tiene un problema cuantificable; asume que su fricción actual es "normal". | Revelar el costo oculto con un dato contraintuitivo o historia identificable. | *"El 38% de las consultas que entran a tu estudio después de las 19:00 hs terminan contratando a tu competencia antes de las 9:00 hs del día siguiente."* | *"El 38% de los prospectos que escriben fuera de horario comercial contratan a otro proveedor antes de la mañana siguiente."* |
| **2. Problem-Aware (Consciente del Problema)** | Siente el dolor todos los días, pero no conoce la categoría de solución óptima. | Nombrar el dolor exacto con empatía forense + cuantificar el alivio. | *"¿Pasás dos horas por día conciliando transferencias de Mercado Pago contra planillas de Excel? Automatizá el cierre de caja en 4 minutos."* | *"Deja de perder dos horas diarias conciliando pagos manuales contra hojas de cálculo. Automatiza tu cierre contable en 4 minutos."* |
| **3. Solution-Aware (Consciente de la Solución)** | Sabe que necesita un software/servicio de esta categoría, pero compara enfoques. | Destacar el **Mecanismo Único** (*Unique Mechanism*) que supera a las alternativas viejas. | *"El único sistema de reservas para clínicas que cobra seña automática por Mercado Pago y reduce el ausentismo de pacientes un 74%."* | *"El único sistema de agendamiento médico con cobro anticipado integrado que reduce la inasistencia de pacientes en un 74%."* |
| **4. Product-Aware (Consciente del Producto)** | Ya conoce tu marca, pero duda del ROI, de la dificultad de migración o del precio. | Demostración directa de producto + Caso de Éxito con métricas + Reversión de riesgo. | *"Mirá cómo Distribuidora Sur migró 12.000 SKUs en una tarde y bajó los errores de armado de pedidos al 0,2%."* | *"Descubre cómo Distribuidora Sur migró 12.000 referencias en una tarde y redujo los errores de preparación de pedidos al 0,2%."* |
| **5. Most Aware (Totalmente Consciente)** | Está listo para comprar; solo necesita el incentivo final o claridad transaccional. | Oferta directa, precio transparente, bono de acción rápida y garantía al lado del CTA. | *"Activá tu cuenta anual hoy: ahorrás 2 meses, incluimos la migración de datos bonificada y tenés 30 días de garantía total."* | *"Activa tu plan anual hoy: obtén 2 meses sin costo, migración de datos bonificada y 30 días de garantía de reembolso."* |

### Reglas Gramaticales y Estilísticas del Voseo Profesional (Argentina / Uruguay)
1. **Imperativos y Presente Indicativo Limpios:** Usar siempre la conjugación aguda correcta con tilde ortográfica (`Creá`, `Empezá`, `Descubrí`, `Reducí`, `Agendá`, `Tenés`, `Podés`, `Sabés`).
2. **Prohibido mezclar `tú` y `vos` en la misma página:** Si el proyecto apunta a Argentina/Uruguay (`locale: es-AR` / `es-UY`), mantener coherencia absoluta en botones, microcopy de formularios, mensajes de validación y preguntas frecuentes (*"¿Tenés dudas?"*, nunca *"¿Tienes dudas?"* mezclado con *"Probá gratis"*).
3. **Tono B2B Rioplatense:** El voseo en B2B argentino moderno es **directo, sobrio y técnico**, nunca chabacano. Evitar modismos informales excesivos (*"che"*, *"re fácil"*, *"una locura"*) en software corporativo, finanzas, salud o legales; priorizar verbos de acción concretos y datos duros.

---

## 4. El Filtro de las 3 Preguntas y Lista Negra Anti-Slop

Antes de aprobar cualquier párrafo o titular en un sitio de la fábrica, el texto debe superar el **Filtro de las 3 Preguntas** (`marketingskills/skills/copywriting`):

1. **¿Se puede visualizar físicamente? (*Can you picture it?*)**
   - ❌ *Abstracto:* *"Optimizamos la eficiencia operativa de tu flujo de trabajo."* (Nadie puede imaginar una foto de "eficiencia operativa").
   - ✅ *Visualizable:* *"Tus vendedores abren WhatsApp a las 9:00 AM y ya tienen las 14 cotizaciones de la noche calculadas en PDF y enviadas."*
2. **¿Es falsable / verificable? (*Can you falsify it?*)**
   - ❌ *No falsable:* *"Soporte técnico de primer nivel y servidores ultrarrápidos."*
   - ✅ *Falsable:* *"Tiempo de primera respuesta en soporte menor a 8 minutos por Slack y latencia p95 de 24 ms en Buenos Aires y Santiago."*
3. **¿Pasa el Test de Intercambio (*Swap Test*)?**
   - Si podés copiar tu titular y pegarlo en la web de tu competidor directo sin cambiar una sola palabra y sigue teniendo sentido, **el titular es genérico y debe reescribirse**.

### Lista Negra de *AI Tells* Prohibidos en Español e Inglés
Queda estrictamente prohibido generar cualquiera de las siguientes palabras o estructuras sintácticas típicas de LLMs:
- **Verbos y Adjetivos Prohibidos (ES):** *"Potenciar"*, *"Impulsar"*, *"Revolucionar"*, *"Llevar al siguiente nivel"*, *"Desbloquear todo el potencial"*, *"Soluciones integrales a medida"*, *"En el vertiginoso mundo actual"*, *"No es solo X, es Y"*, *"Sinergia"*, *"Disruptivo"*, *"Ecosistema robusto"*, *"De vanguardia"*.
- **Verbos y Adjetivos Prohibidos (EN):** *"Unlock"*, *"Unleash"*, *"Elevate"*, *"Supercharge"*, *"Seamless"*, *"Cutting-edge"*, *"Delve"*, *"Tapestry"*, *"Game-changer"*, *"Empower"*, *"It's not just X — it's Y"*.

---

## 5. Diagnóstico CRO (`DiPS`) y Arquitectura de Precios

Extraído de *Making Websites Win* (Karl Blanks & Ben Jesson) y `marketingskills/skills/pricing`:

### 5.1 El Bucle `DiPS` (*Diagnose $\rightarrow$ Problem $\rightarrow$ Solution*)
Toda sección de una landing page debe resolver un bloqueo real del embudo:
1. **Objeción de Comprensión (*"¿Qué hacen exactamente y es para mí?"*):** Se resuelve en los primeros `5 segundos` del Hero mediante **Categoría explícita + Audiencia + Resultado cuantificado + Captura real del producto** (nunca ilustraciones abstractas).
2. **Objeción de Credibilidad (*"¿Me están mintiendo?"*):** Se resuelve inmediatamente debajo del Hero con una barra de pruebas verificables (*Logo Bar* monocromática + 3 métricas auditables con fuente o contexto real).
3. **Objeción de Idoneidad (*"¿Funcionará con mi sistema actual / mi rubro?"*):** Se resuelve mediante matrices de integración, casos de uso por vertical y tabla comparativa honesta (*Nosotros vs. Hacerlo en Excel vs. Consultora Tradicional*).
4. **Objeción de Fricción en el CTA (*"¿Qué pasa después de hacer clic?"*):** Se resuelve con un **Microcopy Reductor de Ansiedad** debajo del botón principal (*"Sin tarjeta de crédito · Configuración en 2 minutos · Cancelás con 1 clic"*).

### 5.2 Reglas Matemáticas de Tablas de Precios (*Pricing Tables*)
- **Arquitectura de 3 Tiers (*Good - Better - Best*):**
  1. **Tier Base (Entrada):** Resuelve el trabajo funcional básico para un usuario individual o PyME pequeña.
  2. **Tier Central (Recomendado / Destacado Visualmente):** Resuelve el flujo completo con automatizaciones clave. Debe tener un borde de acento `1.5px solid var(--primary)` y badge superior (*"Más elegido por equipos de 5 a 25 personas"*).
  3. **Tier Superior (Ancla de Precio / Enterprise):** Posicionado a un precio `2.5x–3.5x` mayor que el Tier Central; hace que el Tier Central parezca una decisión financieramente conservadora (*Anchoring Effect*).
- **Alineación con Métrica de Valor (*Value Metric*):** No cobrar solo "por asiento" (*per seat*) si el valor crece con otra variable (ej. cantidad de envíos procesados, locales activos, facturas emitidas o contactos gestionados).
- **Conmutador Mensual / Anual:** Expresar el descuento anual en **"Meses Gratis"** (*"2 meses gratis"*) en lugar de porcentaje (*"16.6% OFF"*), ya que el cerebro humano procesa unidades enteras de tiempo con mayor impacto emocional que porcentajes fraccionarios.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[DESIGN_MASTERY_2026]] · [[AGENT_CREATIVE_AND_VISUAL_AWARENESS_2026]] · [[CANON_REFACTORING_UI_WATHAN_SCHOGER]] · [[CANON_PRACTICAL_UI_ADHAM_DANNAWAY]] · #ui_ux_design
