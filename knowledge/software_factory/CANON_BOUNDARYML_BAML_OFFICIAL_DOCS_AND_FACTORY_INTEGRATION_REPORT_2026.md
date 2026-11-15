# TRATADO OFICIAL Y REPORTE DE ARQUITECTURA 2026: BOUNDARYML (`BAML`), MOTOR RUST `JSONISH` (`SAP`), `TYPEBUILDER`, `MODULAR API`, `COLLECTOR`, `SEMANTIC STREAMING` Y SU INTEGRACIÓN EN LA `WEB-SOFTWARE-FACTORY`

**Alcance:** Este documento constituye la ingesta canónica de la documentación oficial de **BoundaryML / BAML** (`https://github.com/BoundaryML/baml`, `https://docs.boundaryml.com`, directorio `fern/` y motor Rust `engine/baml-lib/jsonish`) junto con el análisis de viabilidad técnica, costos/beneficios y hoja de ruta de integración en `web-software-factory`. NO es fuente de precios de nube (ver `CANON_CLOUDFLARE_D1_WORKERS_PAID_FINOPS_AND_EDGE_OPTIMIZATION_2026.md`) NI de reglas de contraste visual (ver `DESIGN_MASTERY_2026.md`).

> **Fuentes Primarias Verificadas en Disco (`.cache/repos_reference/baml` & `.cache/repos_reference/baml-examples`):**
> - Repositorio oficial del compilador y runtime Rust: `https://github.com/BoundaryML/baml` (`engine/baml-lib/jsonish/src/deserializer/score.rs`, `semantic_streaming.rs`, `fern/01-guide/*`, `fern/03-reference/*`) `[VERIFICADO: git clone BoundaryML/baml, 2026-10-29]`.
> - Repositorio oficial de patrones y ejemplos: `https://github.com/BoundaryML/baml-examples` `[VERIFICADO: git clone BoundaryML/baml-examples, 2026-10-29]`.
> - Portal oficial y documentación: `https://boundaryml.com` y `https://docs.boundaryml.com` `[VERIFICADO: boundaryml.com, 2026-10-29]`.

---

## 1. ¿Qué es BoundaryML y qué problema resuelve `BAML`?

**BoundaryML** es la compañía creadora de **BAML** (*Basically A Made-up Language* / *Boundary AI Markup Language*), un lenguaje de dominio específico (DSL) y compilador escrito en **Rust** diseñado para transformar llamadas a LLMs en **funciones deterministas y fuertemente tipadas** (`function ExtractResume(text: string) -> Resume`) `[VERIFICADO: fern/01-guide/why-baml.mdx, 2026-10-29]`.

### 1.1 El Problema de los Enfoques Tradicionales ("String-Prompting" vs. "Constrained Decoding")
1. **Fragilidad de `JSON.parse()` y Regex Ad-Hoc:** Cuando un LLM razona paso a paso (*Chain-of-Thought*), suele incluir texto antes o después del bloque JSON, omitir una llave de cierre al alcanzar límites de tokens, usar comillas simples, dejar comas finales (`trailing commas`) o escribir comentarios `//` dentro del JSON.
2. **La Penalización Cognitiva del *Constrained Decoding* ("Let Me Speak Freely"):** Las APIs de *Structured Outputs* que fuerzan una máquina de estados finitos (FSM) a nivel de logits durante la generación impiden que el modelo piense libremente antes de responder, degradando su precisión matemática y de razonamiento en benchmarks como el **Berkeley Function Calling Leaderboard (BFCL)** `[VERIFICADO: fern/01-guide/06-prompt-engineering/chain-of-thought.mdx, 2026-10-29]`.
3. **Inflación de Tokens por JSON Schema Verboso:** Inyectar un esquema JSON Schema Draft 2020-12 completo en el prompt consume entre `3x` y `5x` más tokens que una definición de tipos compacta estilo TypeScript/BAML.

### 1.2 La Solución de BoundaryML: Compilador en Rust + `{{ ctx.output_format }}` + `SAP` (`jsonish`)
BAML separa el problema en tres fases desacopladas:
1. **Renderizado Compacto del Esquema (`{{ ctx.output_format }}`):** El motor `Minijinja` de BAML inyecta en el prompt una gramática de tipos ultra-compacta (ahorrando `60%–80%` de tokens de esquema) y permite que el modelo razone libremente en texto plano antes de emitir la estructura.
2. **Ejecución o Transporte Modular:** Soporta más de 15 proveedores (`openai`, `openai-responses`, `anthropic`, `google-ai`, `vertex-ai`, `aws-bedrock`, `groq`, `ollama`, `vllm`, `openrouter`) con estrategias declarativas `fallback`, `round-robin` y `retry_policy`.
3. **Parseo Alineado al Esquema en Sub-Milisegundos (`Schema-Aligned Parsing — SAP`):** El crate en Rust `engine/baml-lib/jsonish` toma la salida cruda del LLM (`&str`) y resuelve un problema de optimización de **distancia de edición de mínimo costo (`WithScore`)** para coaccionar el texto hacia el árbol de tipos objetivo (`TypeIR`).

---

## 2. Anatomía Interna del Motor Rust `jsonish` (`engine/baml-lib/jsonish`)

La inspección directa del código fuente en `.cache/repos_reference/baml/engine/baml-lib/jsonish/` revela cómo funciona realmente **SAP** bajo el capó `[VERIFICADO: engine/baml-lib/jsonish/src/deserializer/score.rs, 2026-10-29]`:

### 2.1 Firma Nuclear del Deserializador Flexible (`README.md`)
```rust
pub fn from_str(
    of: &OutputFormatContent,
    target: &FieldType,
    raw_string: &str,
    allow_partials: bool,
) -> Result<BamlValueWithFlags>
```

### 2.2 Algoritmo Multi-Etapa de `jsonish::parser`
Cuando el LLM devuelve una respuesta cruda (por ejemplo, 3 párrafos de *Chain-of-Thought* seguidos de un bloque Markdown con JSON malformado):
1. **Extracción Multi-Candidato (`fixing_parser` & `multi_json_parser`):**
   - Si el texto contiene múltiples objetos JSON (por ejemplo, un bloque de ejemplo durante el razonamiento y el bloque final de respuesta), `jsonish` extrae todos los candidatos posibles (`BamlValueWithFlags`).
   - Repara estados rotos: cadenas sin cerrar, llaves/corchetes faltantes al final del stream, comentarios `//` y `/* */`, claves sin comillas, y valores primitivos sueltos.
2. **Coerción Guiada por Tipos (`src/deserializer/coercer/`):**
   - Intenta coaccionar cada candidato hacia el `FieldType` esperado (`Class`, `Enum`, `Union`, `List`, `Map`, `Primitive`), adjuntando banderas (`Flag`) por cada transformación o suposición realizada.
3. **Función de Costo Determinista (`WithScore` en `score.rs` — *Lower is Better*):**
   Cada bandera de coerción suma una penalización entera (`i32`). El candidato con **menor puntaje de penalización** gana:

| Bandera de Coerción (`Flag` en `score.rs`) | Penalización (`i32`) | Significado Técnico en el Algoritmo SAP |
| :--- | :---: | :--- |
| `Flag::InferedObject(_)` | `0` | Objeto inferido en el nivel raíz sin penalización. |
| `Flag::ObjectFromFixedJson(_)` | `0` | JSON reparado sintácticamente (llaves/comas corregidas). |
| `Flag::UnionMatch(_, _)` | `0` | Selección limpia de una rama dentro de un tipo `Union`. |
| `Flag::ConstraintResults(_)` | `0` | Evaluación de `@assert` / `@check` (no altera el score de coerción). |
| `Flag::Incomplete` / `Flag::Pending` | `0` | Estados normales durante *Semantic Streaming* (`allow_partials = true`). |
| `Flag::OptionalDefaultFromNoValue` | `1` | Campo opcional (`T?`) ausente rellenado con `null`. |
| `Flag::SingleToArray` | `1` | El esquema pedía `T[]` pero el LLM devolvió un único `T`; envuelto en `[T]`. |
| `Flag::StringToBool` / `StringToFloat` / `FloatToInt` | `1` | Coerción de tipo primitivo (`"true"` -> `true`, `"95"` -> `95`). |
| `Flag::ExtraKey(_, _)` | `1` | Clave extra alucinada por el LLM y descartada limpiamente. |
| `Flag::FirstMatch(_, _)` | `1` | Descarte de bloques JSON previos (ej. ejemplos del *Chain-of-Thought*). |
| `Flag::SubstringMatch(_)` / `ImpliedKey(_)` | `2` | Match de enum por subcadena o clave implícita cuando hay un solo campo. |
| `Flag::ObjectToString(_)` / `JsonToString(_)` | `2` | Conversión de sub-objeto a string serializado. |
| `Flag::StrippedNonAlphaNumeric(_)` | `3` | Limpieza de puntuación/símbolos alrededor de un literal o enum. |
| `Flag::DefaultFromNoValue` | `100` | Penalización severa cuando falta un campo requerido no-opcional. |
| `Flag::DefaultButHadValue(_)` | `110` | Penalización máxima cuando había un valor pero fue imposible coaccionarlo. |
| Multiplicador de Contenedores (`List` / `Class`) | `10 * sum(items)` | En `score.rs:L21-L26`, los errores en campos hijos de clases y listas se multiplican por `10` para priorizar candidatos estructuralmente completos. |

---

## 3. Las 9 Capacidades Oficiales de BAML Documentadas en `fern/`

### 3.1 Validaciones Declarativas: `@assert` vs. `@check` (`checks-and-asserts.mdx`)
BAML incorpora un motor de expresiones **Minijinja** directamente en los atributos de tipos y campos (`this` referencia al valor actual) `[VERIFICADO: fern/01-guide/05-baml-advanced/checks-and-asserts.mdx, 2026-10-29]`:
- **`@assert(nombre, {{ expr }})` (Validación Estricta / Bloqueante):**
  - Si falla en el tipo de retorno raíz, lanza `BamlValidationError`.
  - Si falla en un elemento dentro de una lista (`T[]`), **elimina automáticamente el elemento inválido del array** sin abortar el resto de la lista.
  - Se puede aplicar a toda una clase mediante `@@assert(nombre, {{ this.campoA < this.campoB }})`.
- **`@check(nombre, {{ expr }})` (Validación Suave / No Bloqueante):**
  - Nunca lanza excepción: envuelve el campo en `Checked<T>` exponiendo `.value` y `.checks.<nombre>.status` (`"succeeded"` o `"failed"`).
  - Ideal para compuertas de calidad que deben reportar advertencias detalladas al bucle de auto-curación sin perder los datos extraídos.

### 3.2 `TypeBuilder` y Esquemas Dinámicos en Runtime (`dynamic-types.mdx`)
Cuando las categorías o propiedades dependen del proyecto activo o de una base de datos en tiempo de ejecución:
- Se marca la clase o enum con `@@dynamic` en el archivo `.baml`.
- En Node.js/TypeScript se instancia `const tb = new TypeBuilder()`, se agregan valores (`tb.Category.addValue('NUEVO_VALOR').description('...')`) o clases dinámicas (`tb.addClass(...)`), y se pasa `{ tb }` en las opciones de la función `[VERIFICADO: fern/01-guide/05-baml-advanced/dynamic-types.mdx, 2026-10-29]`.

### 3.3 `ClientRegistry` y Estrategias de Resiliencia (`client-registry.mdx`, `fallback.mdx`, `round-robin.mdx`, `retry.mdx`)
1. **`ClientRegistry` en Runtime:** Permite registrar clientes LLM y cambiar el modelo primario en memoria (`cr.addLlmClient(...)`, `cr.setPrimary(...)`) por llamada sin tocar archivos de configuración.
2. **Estrategia `provider fallback`:** Cadena ordenada de clientes (`strategy [ClientA, ClientB, ClientC]`, anidable dentro de otros fallbacks).
3. **Estrategia `provider round-robin`:** Distribuye llamadas cíclicamente entre múltiples proveedores/modelos para evitar *rate-limits* y rotar en cada reintento.
4. **Política `retry_policy`:** Soporta `constant_delay` (`delay_ms: 200`) y `exponential_backoff` (`delay_ms: 200`, `multiplier: 1.5`, `max_delay_ms: 10000`) `[VERIFICADO: fern/03-reference/baml/clients/strategy/retry.mdx, 2026-10-29]`.

### 3.4 `Modular API`: `b.request` + `b.parse` + `b.stream.parse` (`modular-api.mdx`)
Agregada desde BAML `v0.79.0`, la **Modular API** expone el renderizador de prompts y el parser `SAP` sin obligar a usar el cliente HTTP interno de BAML `[VERIFICADO: fern/01-guide/05-baml-advanced/modular-api.mdx, 2026-10-29]`:
- `const req = await b.request.ExtractResume(input)`: Devuelve `{ url, method, headers, body }` listo para enviar por cualquier transporte personalizado (`fetch`, colas Cloudflare, Batch API de OpenAI/Anthropic).
- `const parsed = b.parse.ExtractResume(rawLlmString)`: Ejecuta únicamente el motor Rust `jsonish` (`SAP`) sobre cualquier string crudo devuelto por un LLM o leído desde caché en `< 1ms` a `\$0.00`.

### 3.5 `Collector`: Telemetría de Caja Blanca (`collector.mdx`)
El objeto `new Collector("nombre")` captura sin capas opacas el estado interno de cada invocación (incluyendo todos los reintentos de un fallback):
- `collector.last?.usage` (`inputTokens`, `outputTokens`, agregados a través de reintentos).
- `collector.last?.rawLlmResponse` (el string exacto antes de `SAP`).
- `collector.last?.calls` (arreglo cronológico con `httpRequest`, `httpResponse`, códigos HTTP y tiempos de red) `[VERIFICADO: fern/01-guide/05-baml-advanced/collector.mdx, 2026-10-29]`.

### 3.6 `Semantic Streaming` y Control de Estado por Campo (`streaming.mdx` & `semantic_streaming.rs`)
En lugar de emitir fragmentos rotos de texto, `b.stream.Fn()` transforma tokens parciales en objetos tipados (`partial_types`) gobernados por tres directivas en el esquema `[VERIFICADO: engine/baml-lib/jsonish/src/deserializer/semantic_streaming.rs, 2026-10-29]`:
- **`@stream.done`:** El campo o sub-objeto permanece `null` (o no entra al array) hasta que su llave de cierre haya llegado por completo (`CompletionState::Complete`). Evita mostrar precios o comandos truncados a mitad de generación (`$1` cuando el total era `$141.65`).
- **`@stream.not_null`:** El objeto padre no se emite en el stream hasta que este campo específico tenga un valor no nulo (ideal para discriminadores `type` o `id` de componentes UI).
- **`@stream.with_state`:** Envuelve el campo en `{ value: T, state: "Pending" | "Incomplete" | "Complete" }` para que la interfaz muestre indicadores de carga granulares por campo.

### 3.7 `Symbol Tuning` (`@alias("k1")`) y `UUID Swap` (`symbol-tuning.mdx`)
Los LLMs traen sesgos pre-entrenados sobre nombres de enums o campos (ej. `"Refund"`, `"CancelOrder"`). BAML permite declarar:
```rust
enum IntentCategory {
  Refund @alias("k1") @description("Customer wants to refund a product")
  CancelOrder @alias("k2") @description("Customer wants to cancel an order")
}
```
En el prompt generado por `{{ ctx.output_format }}`, el LLM solo ve `k1` y `k2` junto a sus descripciones, dedicando el **100% de su atención a las reglas de negocio** sin sesgo léxico. Cuando el LLM responde `"k1"`, el motor `SAP` lo traduce automáticamente de vuelta a `IntentCategory.Refund` en TypeScript `[VERIFICADO: fern/01-guide/06-prompt-engineering/symbol-tuning.mdx, 2026-10-29]`.

### 3.8 Optimización de Tokens con Filtro Nativo `TOON` (`token-optimization.mdx`)
BAML incluye soporte nativo en Jinja para serializar datos de entrada en formato **`TOON` (*Token-Oriented Object Notation*)** mediante `{{ products|format(type="toon") }}`, recomendándolo específicamente cuando la **elegibilidad tabular es alta (`80%–100%`)** (arreglos uniformes de objetos con las mismas claves) y manteniendo JSON compacto cuando las estructuras son profundamente anidadas (`0%–20%` elegibilidad tabular) `[VERIFICADO: fern/01-guide/06-prompt-engineering/token-optimization.mdx, 2026-10-29]`.

### 3.9 Caché de Prompts por Rol (`allowed_role_metadata` — `prompt-caching.mdx`)
Permite inyectar metadatos específicos del proveedor como `{{ _.role("user", cache_control={"type": "ephemeral"}) }}` declarando `allowed_role_metadata ["cache_control"]` en el `client<llm>`, de modo que si se cambia a otro proveedor mediante un fallback, BAML filtra automáticamente los metadatos incompatibles sin romper la llamada HTTP `[VERIFICADO: fern/01-guide/05-baml-advanced/prompt-caching.mdx, 2026-10-29]`.

---

## 4. Evaluación Crítica de Viabilidad e Integración en `web-software-factory`

### 4.1 Estado Actual en Nuestro Repositorio vs. Ecosistema Oficial BoundaryML

| Dimensión Técnica | Estado Actual en `web-software-factory` (`Fase 38`) | Capacidad en `@boundaryml/baml` Oficial | Brecha / Oportunidad de Mejora |
| :--- | :--- | :--- | :--- |
| **Compresión de Esquema en Prompts** | **Implementado (`Categoría A`)** en `jev_semantic_gate.mjs` (`compileCompactBamlTypePrompt`, ahorro medido **`-79.9%`** tokens). | `{{ ctx.output_format }}` nativo en `.baml`. | Paridad funcional alcanzada; se puede enriquecer con soporte de `@alias` (*Symbol Tuning*). |
| **Reparación Sintáctica (`SAP` Base)** | **Implementado (`Categoría A`)** en `parseWithSchemaAlignedRecovery` (fences, preámbulos, comentarios, claves sin comillas, llaves truncadas, comas finales) en `< 4.5ms` a `\$0.00`. | Crate Rust `jsonish` vía N-API (`< 0.5ms`). | Nuestro parser JS toma el **primer `{` al último `}`**; si un LLM incluye un `{ ejemplo }` en su *Chain-of-Thought* antes del JSON final, un extractor multi-candidato con puntaje `WithScore` (`score.rs`) evita colisiones. |
| **Puntuación de Coerción (`WithScore`)** | Coerción directa de campos fijos de `JevVerdictValibotSchema`. | Tabla completa de 22 `Flag` penalties (`score.rs`) + `SingleToArray` + desambiguación de `Union`. | **Alta oportunidad:** Portar el extractor multi-bloque y el puntuador `WithScore` (`SingleToArray`, `FirstMatch`, `SubstringMatch`) a JS puro. |
| **Validaciones `@assert` vs. `@check`** | Validación binaria estricta (`Valibot` pasa o lanza excepción). | Separación entre `@assert` (bloqueante / filtra array) y `@check` (adjunta `ResponseCheck` sin abortar). | **Alta oportunidad:** Incorporar `@check` no bloqueante en las compuertas JEV y entrevistas para reportar *warnings* graduados al bucle de auto-curación. |
| **`Symbol Tuning` (`@alias("k1")`)** | Los prompts JEV usan los nombres literales del enum (`COMMIT_GLOBAL_INVARIANT`, etc.). | `@alias("k1")` en el prompt + resolución automática al nombre real en `SAP`. | **Alta oportunidad:** Elimina el sesgo semántico de los modelos jueces sobre los nombres de predicados JEV. |
| **`Semantic Streaming` (`@stream.done`)** | No implementado para generación progresiva de UI. | `@stream.done`, `@stream.not_null`, `@stream.with_state` en `semantic_streaming.rs`. | **Media/Alta oportunidad:** Útil en el CTO Cockpit para streaming seguro de propuestas de copywriting/secciones. |
| **Formato `TOON` (`Token Optimization`)** | **Implementado (`Categoría A`)** en `tools/intelligence/toon_serializer.mjs` (`-41.9%` ahorro). | Filtro Jinja `{{ data\|format(type="toon") }}` con regla de elegibilidad tabular `80%-100%`. | Agregar detector automático de **Elegibilidad Tabular (`>= 80%`)** antes de serializar a `TOON`. |
| **Compatibilidad con Cloudflare Workers & Hardware Ligero** | **100% JS Puro + `Valibot` (`0` binarios nativos OS).** Corre tanto en Node.js local como en Cloudflare Workers Edge. | `@boundaryml/baml` requiere binario nativo C-FFI/N-API por SO (`win32-x64-msvc`, ~30 MB); **no corre dentro de Cloudflare Workers V8 Isolates**. | **Veredicto Arquitectónico Clave:** No instalar el binario pesado N-API en los templates de Cloudflare Workers; absorber los algoritmos de `jsonish` (`WithScore`, multi-JSON CoT extractor, `@alias`, `@check`, `TypeBuilder`) en nuestro motor ligero JS/ESM. |

### 4.2 Recomendación Arquitectónica y Hoja de Ruta (Si se decide integrar)

1. **Veredicto General:**
   La tecnología de **BoundaryML (`BAML`)** es **altamente beneficiosa y funcional** para la `web-software-factory`, pero su integración debe hacerse bajo una **Arquitectura sin Binarios Pesados en el Edge (Zero-NAPI-Lock-in)**:
   - **Qué NO hacer:** No acoplar los sitios generados (`templates/astro-edge`, `templates/vanilla-edge`) ni los Cloudflare Workers al paquete binario N-API `@boundaryml/baml` (~30 MB de binario nativo `.node` incompatible con el runtime de Cloudflare Workers y sujeto a bloqueos de archivos `.node` en Windows durante `npm test`).
   - **Qué SÍ hacer (Absorción Algorítmica Clean-Room de Caja Blanca desde `engine/baml-lib/jsonish`):**
     1. **Extractor Multi-Candidato CoT + Puntuador `WithScore` (`score.rs`):** Actualizar `parseWithSchemaAlignedRecovery` en `tools/intelligence/jev_semantic_gate.mjs` para escanear múltiples bloques JSON candidatos cuando un modelo razona paso a paso (*Chain-of-Thought*) antes de emitir el veredicto final, puntuando cada candidato con los pesos exactos de `engine/baml-lib/jsonish/src/deserializer/score.rs` (`Flag::FirstMatch = 1`, `Flag::SingleToArray = 1`, `Flag::DefaultFromNoValue = 100`).
     2. **Soporte de `Symbol Tuning` (`@alias("k1")`) y `TypeBuilder` Dinámico:** Permitir que `compileCompactBamlTypePrompt` emita alias simbólicos (`k1..kN`) para eliminar el sesgo léxico del juez JEV y traduzca automáticamente `k1 -> choice` durante el parseo `SAP`.
     3. **Validaciones Graduadas (`@assert` + `@check`) y `Collector` de Telemetría:** Extender el resultado de `SAP` con un arreglo `checks: Record<string, { status: 'succeeded' | 'failed', expr: string }>` y métricas estilo `Collector` (`rawLlmResponse`, `repairFlags`, `coercionScore`).
     4. **Detector de Elegibilidad Tabular (`>= 80%`) en `toon_serializer.mjs`:** Aplicar la regla oficial de `token-optimization.mdx` para elegir automáticamente entre `TOON` (arreglos uniformes `>= 80%`) y `JSON-compact` (objetos profundamente anidados).

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SPLE_ISO26550_AND_SOFTWARE_FACTORIES_ARCHITECTURE_2026]] · [[CANON_ASTRO5_CLOUDFLARE_WORKERS_AND_MODERN_WEB_TEMPLATES_2026]] · [[CANON_MULTI_BRAND_DESIGN_SYSTEMS_DTCG_STYLE_DICTIONARY_AND_ARCHETYPES_2026]] · [[CANON_SOTA_AGENT_TEAM_TOPOLOGY_AND_2026_WEB_STACK_AUDIT]] · #software_factory
