---
title: "Codificación Agéntica SOTA 2026: MCP SDK Oficial, AST-Grep/Tree-Sitter, Orquestación Determinista y Evals Reales"
domain: "software_factory"
approval_status: "APPROVED_BY_CTO"
created_at: "2026-11-17"
sources:
  - title: "Model Context Protocol — Security Best Practices Specification"
    url: "https://modelcontextprotocol.io/specification/draft/basic/security_best_practices"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "Model Context Protocol Official TypeScript SDK"
    url: "https://github.com/modelcontextprotocol/typescript-sdk"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "ast-grep — Structural Search, Lint and Rewrite in Rust/NAPI"
    url: "https://github.com/ast-grep/ast-grep"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "Tree-sitter Incremental Parsing System"
    url: "https://github.com/tree-sitter/tree-sitter"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "Promptfoo — Open-Source LLM Evaluations & Red Teaming"
    url: "https://github.com/promptfoo/promptfoo"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "Stately Agent — State Machines and Statecharts for LLM Agents (XState v5)"
    url: "https://github.com/statelyai/agent"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "Anthropic Research — Building Effective Agents"
    url: "https://www.anthropic.com/research/building-effective-agents"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering (arXiv:2405.15793)"
    url: "https://arxiv.org/abs/2405.15793"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "Hugging Face AI Agents Course (Free Curriculum)"
    url: "https://huggingface.co/learn/agents-course/unit0/introduction"
    verified_at: "2026-11-17"
    http_status: 200
  - title: "Hugging Face Model Context Protocol (MCP) Course"
    url: "https://huggingface.co/learn/mcp-course/unit0/introduction"
    verified_at: "2026-11-17"
    http_status: 200
approved_by: "CTO"
approved_at: "2026-11-17T15:37:31.574Z"
---

# Codificación Agéntica SOTA 2026: MCP SDK Oficial, AST-Grep/Tree-Sitter, Orquestación Determinista y Evals Reales

Este tratado sintetiza los estándares de ingeniería de software agéntica verificados en 2026 para reemplazar parsers artesanales, orquestación frágil y evaluaciones infladas por componentes auditables, deterministas y portables en Windows/Node.js 24.

---

## 1. Servidores MCP de Producción con `@modelcontextprotocol/sdk`

Implementar servidores MCP sobre `readline` manual introduce fallos sutiles de protocolo: falta de respuesta `-32700` ante JSON inválido, respuestas de éxito en métodos desconocidos en lugar de `-32601` (`Method not found`), ausencia de negociación de capacidades y esquemas JSON incoherentes.

### 1.1 Reglas Obligatorias de Migración al SDK Oficial
1. **Usar `@modelcontextprotocol/sdk` (licencia MIT):** Centraliza `McpServer`, `StdioServerTransport`, negociación de `protocolVersion` (especificación `2025-11-25` / v2) y despacho estándar JSON-RPC 2.0.
2. **Validación por Standard Schema / Valibot:** Convertir esquemas de entrada en `JSON Schema` estricto mediante `@valibot/to-json-schema` con `additionalProperties: false` en todos los argumentos de herramientas.
3. **Contratos JSON-RPC 2.0 Estrictos:**
   - Payload malformado: devolver error `-32700` (`Parse error`).
   - Método no soportado (`resources/list`, `prompts/get` cuando no están declarados): devolver `-32601` (`Method not found`), jamás un objeto `{ traceId }` con éxito.
   - Parámetros inválidos según esquema: devolver `-32602` (`Invalid params`).
4. **Auditoría Automatizada en CI:** Ejecutar la CLI oficial del inspector contra el servidor antes de liberar cambios:

```javascript
// Patrón mínimo recomendado con @modelcontextprotocol/sdk + StdioServerTransport
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { toJsonSchema } from '@valibot/to-json-schema';
import * as v from 'valibot';

const QueryInputSchema = v.strictObject({
  query: v.pipe(v.string(), v.minLength(2), v.maxLength(400)),
  scope: v.optional(v.picklist(['hot', 'library', 'all']), 'hot'),
  limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(15)), 5)
});

export async function bootHardenedMcpServer(handler) {
  const server = new McpServer({ name: 'web-factory-omni-rag', version: '6.1.0' });
  server.registerTool(
    'omni_rag_query',
    {
      description: 'Hybrid SQLite-vec + FTS5 + Cross-Encoder RAG query',
      inputSchema: toJsonSchema(QueryInputSchema)
    },
    async (args) => {
      const parsed = v.parse(QueryInputSchema, args);
      const data = await handler(parsed);
      return { content: [{ type: 'text', text: JSON.stringify(data) }] };
    }
  );
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
```

Comando de verificación continua mediante MCP Inspector en modo no interactivo:

```powershell
npx @modelcontextprotocol/inspector --cli node tools/mcp/mcp_omni_rag_server.mjs --method tools/list
```

---

## 2. Inteligencia de Código por AST Real: `@ast-grep/napi`, `web-tree-sitter` y RepoMap PageRank

Los escaneos por expresiones regulares para extraer símbolos, detectar imports o medir riesgo producen falsos positivos en comentarios/cadenas y fallan ante código multilínea o desestructurado.

### 2.1 Comparativa de Motores AST en Node.js / Windows 10

| Herramienta | Motor Subyacente | Compilación en Windows | Uso Óptimo en Fábrica | Licencia |
| :--- | :--- | :--- | :--- | :--- |
| **`@ast-grep/napi`** | Rust (`tree-sitter` + `napi.rs`) | Binario NAPI precompilado (cero `node-gyp`) | Búsqueda estructural, reglas SAST personalizadas, codemods deterministas | MIT |
| **`web-tree-sitter`** | C compilado a WebAssembly | Universal WASM (cero toolchain C++) | Extracción multi-lenguaje de grafos de definiciones/llamadas para RepoMap | MIT |
| **`oxc-parser` / `oxlint`** | Rust Oxc | Precompilado nativo | Linting ultrarrápido JS/TS, detección de dead-code y AST JS/TS | MIT |
| **`oraios/serena`** | LSP (`typescript-language-server`, etc.) | Servidor MCP externo por stdio | Navegación semántica por tipo (`find_referencing_symbols`) para codificación | MIT |
| **`yamadashy/repomix`** | Empaquetador + `tree-sitter --compress` | Node CLI / MCP | Compactar firmas e interfaces clave cuando se requiere contexto global | MIT |

### 2.2 Patrón Aider RepoMap (Tree-sitter + PageRank)
En lugar de indexar fragmentos arbitrarios de código con embeddings, un **RepoMap estructural** ofrece al agente un mapa proporcional al presupuesto de tokens:
1. Parsear con `web-tree-sitter` o `@ast-grep/napi` todos los archivos rastreados por Git extrayendo únicamente **definiciones exportadas** (`function`, `class`, `const`, `type`) e **identificadores referenciados**.
2. Construir un grafo dirigido `(Archivo A -> Archivo B)` ponderado por la frecuencia con que `A` invoca símbolos definidos en `B` (penalizando símbolos triviales o ubicuos y priorizando archivos modificados en la tarea actual).
3. Ejecutar **PageRank personalizado** sobre el grafo para asignar importancia a cada símbolo y renderizar únicamente las firmas top-$K$ hasta llenar un tope estricto (por ejemplo `1,000–2,000 tokens`).

```javascript
// Ejemplo de búsqueda y captura estructural exacta con @ast-grep/napi
import { js } from '@ast-grep/napi';

export function findUnboundedCatchBlocks(sourceCode) {
  const root = js.parse(sourceCode).root();
  const matches = root.findAll('try { $$$BODY } catch ($ERR) {}');
  return matches.map((node) => ({
    line: node.range().start.line + 1,
    snippet: node.text().slice(0, 120)
  }));
}
```

---

## 3. Orquestación Determinista Híbrida vs Frameworks Agénticos 2026

El informe de Anthropic (*Building Effective Agents*) demuestra que los sistemas confiables en producción combinan **flujos de trabajo deterministas** (rutas fijas, validación de esquemas, compuertas humanas) con autonomía acotada únicamente en subtareas abiertas.

### 3.1 Panorama Comparativo en TypeScript / Node.js (2026)

| Framework / Motor | Fortaleza Principal | Debilidad / Costo Operativo | Veredicto para Web Software Factory |
| :--- | :--- | :--- | :--- |
| **`XState v5` + `@statelyai/agent`** | Transiciones matemáticamente verificables, guardas puras, historial persistible en JSON | Exige diseñar estados explícitos; sin runtime cloud automático | **MANTENER COMO NÚCLEO**, eliminando flags booleanos autodeclarados |
| **`Mastra 1.0`** (`mastra-ai/mastra`) | Workflows tipados en TS, memoria integrada, adaptadores Hono/Express, MCP nativo | Reemplaza innecesariamente el control constitucional propio si se adopta completo | **REFERENCIA**, adoptar su patrón de memoria y workflows suspendibles |
| **`LangGraph.js`** | Checkpointers persistentes (`SQLite`/`Postgres`), interrupciones `human-in-the-loop` | Sobrecarga de abstracciones estilo grafo si solo hay pipelines lineales | **REFERENCIA** para checkpoints de larga duración |
| **`Inngest AgentKit`** | Redes multi-agente observables con reintentos durables y colas de eventos | Acoplamiento a servidor de eventos externo | **DESCARTAR** en entorno local CLI cero-infraestructura |
| **`Google ADK-JS`** / **`OpenAI Agents SDK JS`** | Hand-offs nativos entre agentes, soporte directo Gemini / OpenAI y esquemas Zod | Menor control sobre invariantes constitucionales offline y contratos locales | **REFERENCIA SECUNDARIA** para adaptadores LLM opcionales |

### 3.2 Principios *SWE-agent ACI* y *12-Factor Agents*
Del paper *SWE-agent* (`arXiv:2405.15793`) y la guía *12-Factor Agents* (`humanlayer/12-factor-agents`) surgen cuatro invariantes críticos para herramientas usadas por LLMs:
1. **El modelo nunca auto-certifica compuertas:** Parámetros como `untaintedResearchVerified: true` o `evalPassed: true` jamás deben venir de la invocación del modelo; deben calcularse desde evidencia firmada por disco o salida real de un subproceso verificador (`oxlint`, `node --test`, Playwright).
2. **Feedback de error compacto y accionable:** Cuando una edición o comando falla, la interfaz Agent-Computer Interface (ACI) debe devolver máximo 20–40 líneas contextuales centradas en el error de sintaxis o aserción fallida, reduciendo consumo de contexto en más de 50%.
3. **Checkpointing por paso:** Toda máquina `XState v5` debe serializar su snapshot después de cada transición junto al hash SHA-256 de la evidencia que la habilitó.
4. **Topes estrictos de reintentos y presupuesto (`ASI08`):** Un máximo de 2 rondas de auto-reparación por falla determinista antes de escalar al humano (patrón Stripe Minions), sin bucles silenciosos.

---

## 4. Evaluaciones Honestas y Observabilidad OpenTelemetry (Cero Teatro de Métricas)

Un sistema de calidad pierde toda utilidad cuando mezcla heurísticas con pisos mínimos artificiales (como `Math.max(0.95, ...)`), constantes literales `score: 100` o incompatibilidades silenciosas en nombres de parámetros (`f2pTestPassed` vs `f2pVerified`).

### 4.1 Stack Abierto Recomendado para Evals y Trazabilidad
1. **`Promptfoo` (MIT, CLI + Node SDK):** Permite definir suites reproducibles en YAML/JS con casos de prueba reales, aserciones deterministas (JSON válido, presencia de símbolos, latencia máxima, conteo de tokens) y jueces LLM calibrados sin pisos artificiales, además de escaneo de *red-teaming*.
2. **Convenciones Semánticas `OpenTelemetry GenAI` (`gen_ai.*`):** Todo turno o llamada a herramienta debe emitir spans estándar con atributos verificables:
   - `gen_ai.operation.name` (`chat`, `execute_tool`, `embeddings`)
   - `gen_ai.request.model`, `gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens`
   - `tool.name`, `gate.passed` (booleano estricto derivado de aserciones reales), `error.type`
3. **Consola Local / Self-Hosted OTel:** Compatible con **Langfuse v3** (MIT core) o **Arize Phoenix** (Elastic License 2.0 / trazas OpenInference) cuando se requiera inspección visual multi-paso sin enviar código fuente propietario a terceros.

---

## 5. Cursos Gratuitos y Bibliografía Recomendada para Capacitación del Equipo

- **Hugging Face AI Agents Course:** Fundamentos de ciclo pensar-actuar-observar, llamadas a herramientas y evaluación sistemática (`huggingface.co/learn/agents-course`).
- **Hugging Face MCP Course:** Diseño de servidores, transportes stdio/Streamable HTTP y clientes seguros (`huggingface.co/learn/mcp-course`).
- **DeepLearning.AI + Anthropic — *MCP: Build Rich-Context AI Apps with Anthropic*:** Integración contextual de servidores MCP y diseño limpio de herramientas.
- **DeepLearning.AI + Arize AI — *Evaluating AI Agents*:** Instrumentación con spans, evaluación de trayectoria de herramientas y métricas de recuperación.
- **Kaggle & Google — *5-Day AI Agents Intensive Course*:** Patrones de memoria agéntica, enrutamiento multi-agente y métricas operacionales.
