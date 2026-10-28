# CANON: SEO Local, Programmatic SEO (12 Playbooks), Schema.org JSON-LD `@graph` y Generative Engine Optimization (GEO / AEO 2026)

> **Dominio:** `software_factory` / `seo_and_geo_architecture`  
> **Versión:** 2026.10 (SOTA Web Software Factory)  
> **Aplicación:** `templates/astro-edge`, `templates/vanilla-edge`, `projects/<slug>`

---

## Tabla de Trazabilidad de Fuentes Físicas

| Sección del Canon | Archivo Físico / Fuente Primaria Verificada | Conceptos y Reglas Extraídas |
| :--- | :--- | :--- |
| **1. Los 12 Playbooks de Programmatic SEO** | `C:\Users\tomas\Desktop\streamerbot\references\sota-2026\growth-and-hitl\marketingskills\skills\programmatic-seo\SKILL.md` | Taxonomía de los 12 Playbooks, Jerarquía de Defensibilidad de Datos (5 niveles), Arquitectura Hub-and-Spoke en subcarpetas, y Checklist Pre-Lanzamiento Anti-Thin-Content. |
| **2. Schema.org JSON-LD `@graph` y Elegibilidad 2026** | `C:\Users\tomas\Desktop\streamerbot\references\sota-2026\growth-and-hitl\marketingskills\skills\schema\SKILL.md` | Reglas de elegibilidad de Google Rich Results (retiro de `HowTo`, restricción de `FAQPage`), patrones `@graph` con `@id` enlazados para `LocalBusiness`, `MedicalBusiness`, `LegalService`, `SoftwareApplication` y `Product`. |
| **3. Generative Engine Optimization (GEO / AEO)** | `C:\Users\tomas\Desktop\streamerbot\references\sota-2026\growth-and-hitl\marketingskills\skills\ai-seo\SKILL.md` | Arquitectura de *Query Fan-Out*, diferencias de recuperación entre Google AI Overviews, ChatGPT, Perplexity y Claude, bloques de respuesta de 40–60 palabras, `llms.txt` y gestión de crawlers de IA en `robots.txt`. |

---

## 1. Programmatic SEO (pSEO): Los 12 Playbooks y Defensibilidad de Datos

El SEO Programático moderno no consiste en generar miles de páginas vacías cambiando solo el nombre de una ciudad (*Doorway Pages* penalizadas por Google SpamBrain). Cada página generada debe entregar **utilidad única y datos diferenciados**.

### 1.1 Jerarquía de Defensibilidad de Datos (De Mayor a Menor Moat)
Antes de construir una colección programática en Astro (`src/content/config.ts`) o D1 SQLite, evaluar la fuente de datos:
1. **Datos Propietarios (*Proprietary — Nivel 1*):** Datos recopilados o calculados internamente que nadie más posee (ej. tiempos reales de entrega por código postal, precios promedio de alquileres cerrados, latencia medida en vivo).
2. **Datos Derivados del Producto (*Product-Derived — Nivel 2*):** Estadísticas agregadas y anonimizadas del uso real de tu plataforma.
3. **Contenido Generado por Usuarios (*UGC — Nivel 3*):** Reseñas verificadas, plantillas de la comunidad, valoraciones locales auditadas.
4. **Datos Licenciados (*Licensed — Nivel 4*):** Bases de datos comerciales con derechos de publicación.
5. **Datos Públicos (*Public — Nivel 5, Riesgo Alto*):** Si solo usás datos públicos abiertos, **debés combinarlos con una calculadora interactiva, visualización comparativa o curaduría experta** para evitar contenido duplicado.

### 1.2 Matriz de los 12 Playbooks de Programmatic SEO

| # | Playbook | Patrón de Búsqueda Objetivo | Estructura de URL Canónica | Requisito Obligatorio de Valor Único |
| :--- | :--- | :--- | :--- | :--- |
| **1** | **Locations (SEO Local)** | `"[servicio] en [ciudad / barrio]"` | `/ubicaciones/[ciudad]/[servicio]/` | Tarifas locales reales, normativas municipales aplicables, mapa de cobertura, casos locales y horarios de esa sede. |
| **2** | **Comparisons (Alternativas)** | `"[competidor A] vs [marca propia]"` | `/comparar/[competidor]-vs-[marca]/` | Tabla honesta de diferencias técnicas, calculadora de ahorro al migrar y para quién es mejor cada opción. |
| **3** | **Integrations (Conectores)** | `"conectar [app A] con [app B]"` | `/integraciones/[app-a]-[app-b]/` | Casos de uso reales, esquema de webhooks/triggers soportados y botón de activación en 1 clic. |
| **4** | **Templates (Plantillas)** | `"plantilla de [documento] para [rubro]"` | `/plantillas/[rubro]/[documento]/` | Vista previa interactiva + descarga directa sin fricción abusiva + instrucciones de llenado. |
| **5** | **Personas (Por Rol/Rubro)** | `"software de [categoría] para [industria]"` | `/soluciones/[industria]/` | Flujos de trabajo específicos del rubro, terminología propia de la industria y clientes reales de ese sector. |
| **6** | **Conversions (Calculadoras)** | `"calcular [métrica / conversión]"` | `/herramientas/[calculadora]/` | Calculadora interactiva en Vanilla JS/Astro Island con resultados instantáneos + tabla de valores frecuentes. |
| **7** | **Curation (Rankings)** | `"mejores [herramientas/proveedores] de [tema]"` | `/guias/mejores-[categoria]/` | Criterios explícitos de evaluación con puntajes auditables, pros/contras reales y fecha de última prueba. |
| **8** | **Examples (Inspiración)** | `"ejemplos de [activo] en [industria]"` | `/ejemplos/[categoria]/` | Capturas reales comentadas con análisis de por qué funciona cada ejemplo. |
| **9** | **Glossary (Glosario Técnico)** | `"qué es [término técnico / legal]"` | `/glosario/[termino]/` | Definición de 50 palabras para AI Overviews + fórmula o marco legal + ejemplo práctico + enlaces a términos conexos. |
| **10** | **Directory (Directorios)** | `"directorio de [profesionales] en [zona]"` | `/directorio/[zona]/[especialidad]/` | Filtros facetados reales (precio, matrícula verificada, disponibilidad, idioma). |
| **11** | **Profiles (Perfiles de Entidad)** | `"[entidad / empresa] métricas / análisis"` | `/perfiles/[entidad]/` | Datos históricos estructurados, hitos verificables y comparativa con el promedio del sector. |
| **12** | **Translations (Multi-Idioma)** | Búsquedas equivalentes en `es-AR`, `es-MX`, `pt-BR`, `en-US` | `/es-ar/...`, `/pt-br/...` | Localización nativa de moneda (`ARS`, `USD`, `BRL`), medios de pago locales y modismos regionales + etiquetas `hreflang`. |

### 1.3 Reglas de Arquitectura y Despliegue Progresivo
- **Subcarpetas siempre por encima de Subdominios:** Usar `tudominio.com/soluciones/` o `tudominio.com/ubicaciones/` (hereda el `Domain Rating` del dominio raíz). Nunca usar `ubicaciones.tudominio.com`.
- **Malla de Enlaces Internos (*Hub-and-Spoke*):**
  - El **Hub** (`/ubicaciones/` o `/integraciones/`) enlaza a las categorías principales.
  - Cada **Spoke** (página individual) enlaza de vuelta al Hub mediante `BreadcrumbList` y enlaza lateralmente a **3–5 Spokes relacionados** (ej. ciudades vecinas o integraciones complementarias). Ninguna página puede quedar a más de `3 clics` de la Home.
- **Umbral Anti-Thin-Content:** Al menos el **30% del texto y los datos** de cada página programática debe diferir de cualquier otra página hermana. Si una categoría tiene menos de 5 ítems útiles, aplicar `<meta name="robots" content="noindex, follow">` hasta poblarla.

---

## 2. Arquitectura `Schema.org` JSON-LD `@graph` (Estándar 2026)

Todo sitio generado por `web-software-factory` debe inyectar en el `<head>` un único bloque `<script type="application/ld+json">` utilizando un grafo conectado (`@graph`) con identificadores canónicos (`@id`).

### 2.1 Cambios Críticos de Elegibilidad de Google Search (2025–2026)
- **`HowTo` Schema:** **RETIRADO por Google.** Google ya no renderiza Rich Results de tipo `HowTo`. No desperdiciar presupuesto de tokens generándolo para fragmentos enriquecidos.
- **`FAQPage` Schema:** **RESTRINGIDO en Google Rich Results** exclusivamente a sitios gubernamentales y de salud de alta autoridad. Sin embargo, los motores de IA (ChatGPT, Perplexity, Claude) **sí leen `FAQPage`** para extraer pares pregunta-respuesta, por lo que solo debe incluirse cuando las preguntas existan visiblemente en el HTML de la página.
- **Regla de Oro de Paridad Visible:** Todo dato declarado en el bloque JSON-LD (precios, calificaciones, dirección, preguntas) **debe estar visible para el usuario humano en el DOM renderizado**.

### 2.2 Plantilla Canónica `@graph` para Negocios Locales, Clínicas y Estudios Profesionales (`LocalBusiness` / `MedicalBusiness` / `LegalService`)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "MedicalBusiness", "Dentist"],
      "@id": "https://clinicaejemplo.com.ar/#organization",
      "name": "Clínica Odontológica Belgrano",
      "url": "https://clinicaejemplo.com.ar",
      "logo": {
        "@type": "ImageObject",
        "url": "https://clinicaejemplo.com.ar/assets/logo.png",
        "width": 512,
        "height": 512
      },
      "image": "https://clinicaejemplo.com.ar/assets/consultorio-hero.webp",
      "description": "Especialistas en implantes dentales guiados por computadora y ortodoncia invisible en Belgrano, CABA.",
      "telephone": "+54-11-4780-0000",
      "priceRange": "$$",
      "currenciesAccepted": "ARS, USD",
      "paymentAccepted": "Efectivo, Tarjeta de Crédito, Mercado Pago, Transferencia Bancaria",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Av. Cabildo 2150, Piso 4",
        "addressLocality": "Ciudad Autónoma de Buenos Aires",
        "addressRegion": "CABA",
        "postalCode": "C1428",
        "addressCountry": "AR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -34.5614,
        "longitude": -58.4566
      },
      "hasMap": "https://maps.google.com/?cid=1234567890",
      "areaServed": [
        { "@type": "City", "name": "Ciudad Autónoma de Buenos Aires" },
        { "@type": "AdministrativeArea", "name": "Belgrano" },
        { "@type": "AdministrativeArea", "name": "Núñez" },
        { "@type": "AdministrativeArea", "name": "Palermo" }
      ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "19:30"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "09:00",
          "closes": "13:30"
        }
      ],
      "sameAs": [
        "https://www.instagram.com/clinicaejemplo",
        "https://www.linkedin.com/company/clinicaejemplo"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://clinicaejemplo.com.ar/#website",
      "url": "https://clinicaejemplo.com.ar",
      "name": "Clínica Odontológica Belgrano",
      "publisher": { "@id": "https://clinicaejemplo.com.ar/#organization" },
      "inLanguage": "es-AR"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://clinicaejemplo.com.ar/tratamientos/implantes-dentales/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Inicio",
          "item": "https://clinicaejemplo.com.ar/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Tratamientos",
          "item": "https://clinicaejemplo.com.ar/tratamientos/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Implantes Dentales en el Día",
          "item": "https://clinicaejemplo.com.ar/tratamientos/implantes-dentales/"
        }
      ]
    }
  ]
}
```

### 2.3 Subtipos Específicos de `LocalBusiness` por Vertical
Nunca usar `LocalBusiness` genérico si existe un subtipo oficial en `Schema.org`:
- **Salud y Clínicas:** `MedicalBusiness`, `Dentist`, `Physician`, `MedicalClinic`, `Optician`, `VeterinaryCare`.
- **Legales y Contables:** `LegalService`, `Attorney`, `Notary`, `AccountingService`.
- **Gastronomía y Hotelería:** `Restaurant`, `CafeOrCoffeeShop`, `Bakery`, `Hotel`, `LodgingBusiness`.
- **Inmobiliarias y Construcción:** `RealEstateAgent`, `GeneralContractor`, `HVACBusiness`, `Electrician`, `Plumber`.
- **Automotriz:** `AutoRepair`, `AutoDealer`, `AutoBodyShop`.
- **Fitness y Belleza:** `HealthClub`, `ExerciseGym`, `BeautySalon`, `DaySpa`, `HairSalon`.

---

## 3. Generative Engine Optimization (`GEO` / `AEO`) y *Query Fan-Out*

Los motores de respuesta con IA (**Google AI Overviews**, **ChatGPT Search**, **Perplexity**, **Claude**) no evalúan una sola palabra clave: ejecutan **Query Fan-Out** (descomponen la consulta del usuario en 5 a 10 subconsultas paralelas sobre precios, comparativas, requisitos técnicos, casos de uso y riesgos) y sintetizan los fragmentos con mayor densidad informativa.

### 3.1 Cómo Recupera Respuestas Cada Motor de IA

| Motor de IA | Índice Base y Mecanismo de Recuperación | Qué Prioriza al Citar una Fuente |
| :--- | :--- | :--- |
| **Google AI Overviews / AI Mode** | Índice de Google Search + Gemini. | Páginas ya posicionadas en el Top 10 orgánico que contengan bloques de definición directa, tablas comparativas HTML y enlaces a las sub-preguntas del *Query Fan-Out*. |
| **ChatGPT Search (OpenAI)** | Índice de Bing + `OAI-SearchBot` en tiempo real. | Entidades con autoridad externa (menciones en directorios, prensa, GitHub, Reddit) + archivos `/llms.txt` + tablas de precios explícitas. |
| **Perplexity AI** | Índice propio (`PerplexityBot`) + reranking semántico en vivo. | Estadísticas con fuente y año (`[2026]`), estudios de caso con números exactos y documentos estructurados con encabezados tipo pregunta. |
| **Claude Search (Anthropic)** | `ClaudeBot` + Brave Search API. | Documentación técnica limpia, ausencia de prosa inflada y claridad estructural en Markdown/HTML semántico. |

### 3.2 Regla del Bloque de Respuesta Directa (40–60 Palabras)
Debajo de cada encabezado `<h2>` o `<h3>` que responda a una pregunta de negocio o técnica, el **primer párrafo debe ser un bloque autocontenido de 40 a 60 palabras** que pueda extraerse textualmente como cita completa sin depender del párrafo anterior:
- **Estructura del Bloque GEO:** `[Definición o respuesta directa en la primera oración] + [Métrica, rango de precios o plazo cuantificado] + [Condición clave o diferenciador técnico].`
- Acompañar siempre con una **Tabla HTML semántica (`<table><thead><tbody>`)**, ya que los parsers RAG de los motores de IA extraen celdas `<th>/<td>` con una fidelidad 3.4 veces superior a los bloques de texto corrido.

### 3.3 Estándar `public/llms.txt` y `public/robots.txt` para Visibilidad en IA
Todo proyecto compilado por la fábrica debe incluir `/llms.txt` en la raíz pública y permitir explícitamente los bots de búsqueda de IA en `/robots.txt` (diferenciando bots de **citación en búsqueda** vs. bots de entrenamiento masivo si el cliente así lo requiere):

```txt
# public/robots.txt — Configuración Recomendada para Máxima Citación en Buscadores IA
User-agent: *
Allow: /

# Bots de Búsqueda y Citación en Vivo (Aportan Tráfico y Atribución de Marca)
User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Googleother
Allow: /

Sitemap: https://tudominio.com/sitemap-index.xml
```

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SPLE_ISO26550_AND_SOFTWARE_FACTORIES_ARCHITECTURE_2026]] · [[CANON_ASTRO5_CLOUDFLARE_WORKERS_AND_MODERN_WEB_TEMPLATES_2026]] · [[CANON_MULTI_BRAND_DESIGN_SYSTEMS_DTCG_STYLE_DICTIONARY_AND_ARCHETYPES_2026]] · [[CANON_SOTA_AGENT_TEAM_TOPOLOGY_AND_2026_WEB_STACK_AUDIT]] · #software_factory
