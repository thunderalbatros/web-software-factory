# Canon de Gamificación Ética, Tutor Socrático Costo \$0.00 y Privacidad Local-First 2026

> **Alcance epistemológico:** `TIER_1_SOTA_2026` (`authorityBoost: 1.35`). Directrices arquitectónicas y de motivación intrínseca para el motor de progreso, repetición espaciada, proyectos aplicados y soberanía de datos en **Academia IA**.

---

## 1. Gamificación Ética Orientada al Dominio Real (Cero *Dark Patterns*)

Academia IA rechaza tácticas manipulativas (rachas punitivas con pérdida de avance, urgencia artificial, notificaciones invasivas o *confirm-shaming*). El sistema se fundamenta en la **Teoría de la Autodeterminación**: competencia percibida, autonomía de elección y propósito real.

### 1.1 Economía de XP Ponderada hacia la Comprensión Activa
No todo clic vale lo mismo. La lectura pasiva solo registra avance básico; la retención a largo plazo y la creación real concentran la recompensa:

| Actividad formativa | XP otorgado | Motivo pedagógico |
| :--- | :--- | :--- |
| Completar lectura + micro-control | `10 XP` | Incentiva el inicio sin recompensar el desplazamiento rápido vacío. |
| Aprobar micro-cuestionario (sin saltar pistas) | `35 XP` | Refuerza recuperación activa y comprensión factual. |
| Sesión de repaso espaciado **`ts-fsrs`** al día | `30 XP` | Premia consolidar memoria de largo plazo sobre el atracón de un día. |
| Completar cada Hito de **Proyecto Jefe** (`1`, `2` y `3`) | `150 XP` (`450 XP` total) | Convierte el conocimiento en artefacto tangible verificable. |
| Auditar y corregir alucinación o fuga de privacidad | `+20 XP` extra | Valora el criterio crítico y la seguridad humana. |

### 1.2 Los 4 Árboles de Habilidad (*Skill Trees*)
La persona elige libremente qué ramas explorar o combinar según sus metas vitales, viendo siempre prerequisitos y tiempo estimado real:
1. **Cotidiano:** Organización del tiempo, estudio efectivo, verificación de noticias y salud informacional, trámites cotidianos.
2. **Trabajo:** Síntesis de documentos extensos, redacción profesional clara, análisis en hojas de cálculo, preparación de reuniones.
3. **Crear:** Sitios web propios, ilustración y cómic digital, animación corta, narrativa audiovisual y música/banda sonora.
4. **Emprender:** Validación de propuestas, flujos y bots de atención asistida, catálogos y sistemas operativos profesionales reproducibles.

### 1.3 Pausa Consciente de Racha, Compañero SVG `< 4 KB` y Portfolio Compartible
- **Pausa Consciente de Racha (*Mindful Streak Rest*):** Tú puedes activar modo descanso (*"Pausa consciente de estudio"*) para días laborales pesados, exámenes o fines de semana sin perder consistencia acumulada ni recibir mensajes de culpa.
- **Compañero Reactivo en SVG Vectorial Puro (`< 4 KB`, 0 dependencias):** Mascota geométrica minimalista animada exclusivamente vía atributos SVG y clases CSS sobre variables `OKLCH`. Reacciona a cuatro estados semánticos claros: *Curioso* (inicio de lección), *Pensando* (cuando abres una pista socrática), *Celebrando* (al completar un hito o repaso `ts-fsrs`), y *En descanso* (pausa consciente). Respeta automáticamente `prefers-reduced-motion: reduce`.
- **Portfolio Compartible sin Servidor:** Al terminar cualquiera de los 6 **Proyectos Jefe**, puedes generar una ficha exportable limpia (HTML/Markdown/JSON local o tarjeta lista para compartir) que documenta el problema resuelto, las herramientas gratuitas empleadas, tus pruebas y qué decisiones tomaste tú como autor humano.

---

## 2. Arquitectura de Tutor Socrático de Costo Servidor `\$0.00`

Academia IA garantiza acceso completo y gratuito para toda la comunidad manteniendo **cero costos variables de inferencia en servidores propios**, combinando inteligencia precompilada en tiempo de *build* con un puente opcional en el dispositivo del usuario.

### 2.1 Capa 1 — Árbol Socrático JSON Precompilado (`\$0.00`, `0 ms` latencia)
Durante la construcción estática del sitio (`build`), cada lección y pregunta incluye su árbol de diálogo validado estrictamente con **`Valibot`** (`< 1 KB` en cliente):
- **Normalización lingüística determinista en navegador:** Normalización Unicode `NFKC`, remoción de diacríticos y detección de patrones conceptuales frecuentes en respuestas cortas o selección múltiple.
- **Escalera garantizada de 3 pistas:** Pista 1 (pregunta orientadora), Pista 2 (contraste reducido), Pista 3 (estructura casi resuelta) + explicación diagnóstica final.
- **Funciona incluso sin conexión (*offline-ready*):** Al ser JSON estático servido desde Workers Static Assets, mil o un millón de estudiantes consumen exactamente `$0.00` de cómputo de IA en servidor.

### 2.2 Capa 2 — Puente BYOK Opcional Cifrado Localmente (`WebCrypto AES-GCM` + `IndexedDB`)
Para quienes desean conversación socrática abierta sobre un caso propio (nivel Intermedio/Avanzado o *Proyectos Jefe*), se ofrece un módulo opcional **BYOK (*Bring Your Own Key*)**:
- **Cifrado cliente estricto:** La clave API personal se cifra exclusivamente en tu dispositivo usando la API nativa **`crypto.subtle`** (`AES-GCM` de 256 bits con vector de inicialización único por registro y clave derivada vía `PBKDF2` desde frase de paso opcional o dispositivo), almacenándose solo como texto cifrado en **`IndexedDB`**.
- **Tráfico directo navegador -> proveedor:** Las peticiones salen directo desde el navegador hacia el endpoint oficial elegido por la persona (por ejemplo Gemini API gratuita, Groq u OpenRouter), dentro de estrictas cabeceras `connect-src` declaradas en CSP, sin pasar nunca por servidores intermedios de Academia IA.
- **Control total de privacidad:** Botón visible en todo momento para probar en modo *offline* simulado, inspeccionar qué texto se enviará antes de pulsar enviar (recordatorio automático contra datos sensibles) o borrar la clave de `IndexedDB` en un clic.

---

## 3. Privacidad *Local-First* y Cumplimiento Ley 25.326 + Estándares Globales

Academia IA adopta privacidad por defecto (*Privacy by Design*) alineada con la **Ley 25.326 de Protección de Datos Personales (Argentina)** y principios internacionales de minimización (GDPR):

1. **Cero inicio de sesión obligatorio:** Puedes completar el 100% de las lecciones, tarjetas `ts-fsrs` y proyectos sin crear cuenta, sin entregar correo electrónico y sin verificación por teléfono.
2. **Almacenamiento integral en tu dispositivo:** Tu historial de dominio, métricas de repetición espaciada `ts-fsrs`, pausas de racha y avances de proyectos viven exclusivamente en tu navegador (`IndexedDB` / `localStorage`), con **exportación e importación portátil en un archivo `.json`** (con verificación de integridad de esquema `Valibot`) para cambiar de computadora o hacer copia de respaldo cuando tú quieras.
3. **Cero rastreadores comerciales ni telemetría invasiva:** Prohibición absoluta de píxeles publicitarios, cookies de seguimiento de terceros o perfiles ocultos. Los videos embebidos utilizan `youtube-nocookie.com` activado recién tras interacción explícita (`lite-youtube-embed`).
4. **Alias público estrictamente *opt-in*:** Si en el futuro decides exportar o compartir una tarjeta de proyecto de tu Portfolio, tú eliges un alias libre o iniciales sin exponer apellidos, ubicación ni identificadores personales.
5. **Higiene de entrenamiento en herramientas externas:** Cada ficha del catálogo (`academy_tools`) documenta pasos concretos para desactivar el historial o entrenamiento de modelos en plataformas externas gratuitas y qué alternativa local *open-source* usar cuando trabajes con material privado.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SOTA_RAG_ARCHITECTURES_AND_TOOLS_2026]] · [[CURATED_MASTER_BOOKS_AND_COURSES_2026]] · [[CANON_SOFTWARE_ENGINEERING_AT_GOOGLE]] · [[CANON_HARNESS_ENGINEERING_INTEGRAL_2026]] · #ai_academy
