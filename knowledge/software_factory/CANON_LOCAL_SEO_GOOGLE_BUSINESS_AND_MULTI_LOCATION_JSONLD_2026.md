# CANON SOTA 2026: SEO Local, Google Business Profile, `Schema.org` Multi-Ubicación y Programmatic SEO

> **Dominio:** `software_factory` | **Alcance:** Posicionamiento orgánico y en motores de respuesta IA (ChatGPT Search, Perplexity, Gemini Maps) para clínicas, estudios profesionales, comercios, restaurantes, inmobiliarias y empresas multi-sede.

---

## 1. Grafo `Schema.org` JSON-LD Obligatorio para Negocios Locales y Profesionales

Cuando el proyecto corresponde a un servicio físico, profesional o regional, el bloque `<script type="application/ld+json">` debe incluir el tipo específico (`LocalBusiness`, `MedicalClinic`, `LegalService`, `RealEstateAgent`, `Restaurant` o `ProfessionalService`) con:
- **`name`, `url`, `telephone`, `priceRange`**
- **`address` (`PostalAddress`):** `streetAddress`, `addressLocality`, `addressRegion`, `postalCode`, `addressCountry`
- **`geo` (`GeoCoordinates`):** `latitude` y `longitude` exactos para anclaje en mapas e IA geolocalizada
- **`openingHoursSpecification`** y **`areaServed`**

---

## 2. Arquitectura Programmatic SEO por Ciudad / Servicio (Zero Thin-Content)

Para posicionar páginas de aterrizaje por ubicación o rubro (`/servicios/[rubro]/[ciudad]`):
1. **Prohibido duplicar texto cambiando solo el nombre de la ciudad:** Cada página programática debe inyectar datos reales diferenciados (casos de éxito locales, tiempos de respuesta en esa zona, preguntas frecuentes específicas y coordenadas reales).
2. **Enlazado Interno en Clúster (`Hub & Spoke`) + `Speculation Rules API`:** La página matriz enlaza semánticamente a las sedes o especialidades con prerenderizado especulativo (`eagerness: "moderate"`).

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SPLE_ISO26550_AND_SOFTWARE_FACTORIES_ARCHITECTURE_2026]] · [[CANON_ASTRO5_CLOUDFLARE_WORKERS_AND_MODERN_WEB_TEMPLATES_2026]] · [[CANON_MULTI_BRAND_DESIGN_SYSTEMS_DTCG_STYLE_DICTIONARY_AND_ARCHETYPES_2026]] · [[CANON_SOTA_AGENT_TEAM_TOPOLOGY_AND_2026_WEB_STACK_AUDIT]] · #software_factory
