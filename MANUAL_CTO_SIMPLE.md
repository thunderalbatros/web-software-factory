# 🎯 Manual Rápido del CTO (Sin Código)

Bienvenido al Centro de Comando de tu **Fábrica Multi-Proyecto de Sitios Web**. No necesitás leer código ni registros técnicos: dirigís a tu equipo de agentes con estos **15 comandos ejecutivos simples** en la consola:

---

### 1. Crear o definir un nuevo sitio aislado (`npm run cto:nuevo`)
```powershell
npm run cto:nuevo
# O directo con nombre:
npm run cto:nuevo -- "agencia-alfa"
```
Te hace **3 preguntas simples en español** (nombre del proyecto, rubro y estilo visual), crea el sitio aislado dentro de `projects/<slug>/` con su propio `SPEC.md` y su propio `design.tokens.json` (sin tocar las plantillas maestras de `templates/`), y lo marca automáticamente como **[ACTIVO]** en `.agents/memory/active_project.json`.

### 2. Ver todos tus sitios o cambiar de proyecto activo (`npm run cto:proyectos`)
```powershell
# Ver tabla de todos tus sitios en construcción:
npm run cto:proyectos

# Cambiar inmediatamente de sitio activo para seguir editándolo:
npm run cto:proyectos -- "agencia-alfa"
```
Muestra una tabla en español simple con todos tus sitios alojados en `projects/`, indicando cuál está **[ACTIVO]**, su plantilla (`astro-edge` / `vanilla-edge`), su última nota de auditoría y su fecha de modificación. Todos los demás comandos (`cto:construir`, `cto:revisar`, `cto:feedback`, `cto:aprobar`, `cto:empaquetar`) operan automáticamente sobre el proyecto activo.

### 3. Construir y auditar el sitio activo (`npm run cto:construir`)
```powershell
npm run cto:construir
```
Pone a trabajar a todo el equipo en paralelo sobre el proyecto **[ACTIVO]**: diseña los colores y tipografías, arma el sitio listo para publicar y pasa todos los controles de calidad, velocidad y seguridad en menos de 2 segundos.

### 4. Revisar cómo quedó (`npm run cto:revisar`)
```powershell
npm run cto:revisar
```
Genera un **Resumen Ejecutivo en español claro** (`.agents/skills/cto-hitl-visual-gate/cto-decision-brief.md`) con un **Semáforo de Salud (Verde / Amarillo / Rojo)** y abre el **Banco de Pruebas Visual** (`tools/audit/component_testbench.html`) para que veas las tarjetas, botones y encabezados.

### 5. Aprobar y exportar automáticamente (`npm run cto:aprobar`)
```powershell
npm run cto:aprobar
```
Firma tu aprobación final sobre el sitio activo, limpia archivos temporales de prueba y ejecuta automáticamente `cto:empaquetar` para dejarte el paquete final listo en tu Escritorio.

### 6. Exportar Paquete de Producción Autónomo + `.ZIP` (`npm run cto:empaquetar`)
```powershell
npm run cto:empaquetar
```
Compila el proyecto activo y exporta un **Paquete 100% Autónomo (Zero-Factory-Dependencies)** en dos ubicaciones simultáneas:
1. Dentro de la fábrica: `deliverables/<slug>/`
2. Directamente en tu Escritorio: `C:\Users\tomas\Desktop\Sitios_Entregables\<slug>\`

**Incluye:**
- Carpeta `dist/` minificada y optimizada + `_headers` Zero-Trust + `worker/index.js` + `llms.txt`.
- Archivos `wrangler.toml` y `package.json` minimalistas preconfigurados para publicar en 1 comando (`npx wrangler pages deploy`).
- Archivo comprimido `<slug>-produccion.zip` listo para enviar al cliente o subir arrastrando y soltando.
- Guía `COMO_PUBLICAR_ESTE_SITIO.md` en español simple (paso a paso sin código).

### 7. Pedir cambios con tus propias palabras (`npm run cto:feedback`)
```powershell
npm run cto:feedback -- "Quiero botones más redondeados y textos más directos"
```
El sistema guarda tu nueva preferencia en el proyecto activo, **descarta automáticamente cualquier regla vieja que la contradiga** para que los agentes no se confundan, y aplica la mejora.

### 8. Enseñar una nueva habilidad o efecto visual (`npm run cto:aprender`)
```powershell
npm run cto:aprender -- "Efecto de brillo suave en tarjetas"
```
Tus agentes buscan primero en tu **Bóveda Local de 260 repositorios** (modo Zero-Copy sin gastar espacio), pasan el efecto por cuarentena de seguridad y fluidez a 60 FPS, y lo suman al catálogo visual.

### 9. Hacer "Service" y entrenamiento automático (`npm run cto:evolucionar`)
```powershell
npm run cto:evolucionar
```
Revisa tus últimas correcciones, limpia reglas viejas, afina los manuales internos del equipo y te deja un reporte ejecutivo en español simple en `docs/EVOLUTION_REPORT.md`.

### 10. Clonar el estilo visual de cualquier web de referencia (`npm run cto:extraer-diseno`)
```powershell
npm run cto:extraer-diseno -- "https://linear.app"
```
Analiza el sitio web que le pases como ejemplo, extrae su paleta de colores, contraste y tipografía, y aplica ese estilo automáticamente a tu sitio activo.

### 11. Ingerir libros PDF o EPUB al cerebro de la fábrica (`npm run cto:ingerir-libros`)
```powershell
npm run cto:ingerir-libros
```
Arrastrá cualquier libro `.pdf`, `.epub` o `.md` dentro de la carpeta `knowledge/_inbox_pdfs/` y ejecutá este comando: extrae el 100% del texto y tablas sin recortes, limpia artefactos de escaneo, mueve el original a `knowledge/_inbox_pdfs/procesados/` y actualiza el índice neuronal `Omni-RAG v5`.

### 12. Piloto Automático de Evolución Semanal — Lunes 08:00 AM Argentina (`npm run cto:actualizacion-semanal`)
```powershell
npm run cto:actualizacion-semanal
```
- **¿Cómo funciona automáticamente?** Todos los **Lunes a las 08:00 AM (hora de Buenos Aires, Argentina / `0 11 * * 1` UTC)**, el workflow `.github/workflows/weekly_factory_evolution.yml` despierta en GitHub Actions, consulta la lista blanca de 11 repositorios oficiales y papers de ArXiv, pasa las novedades por cuarentena de seguridad (`security_gate.mjs`) y por la matriz Hard-Gated (`eval_matrix.mjs` 100/100 con rollback automático), actualiza el cerebro `Omni-RAG v5` (`TIER_1_SOTA_2026`), genera los reportes ejecutivos en `weekly_update/` (`REPORTE_SEMANAL_<YYYY-MM-DD>.md`, `ULTIMO_REPORTE_CTO.md` y `ULTIMO_REPORTE_EMAIL_PREVIEW.html`) e incluye una tabla opcional de herramientas pagas **solo si aportan una mejora exponencial (10x)**.
- **¿Cómo activar el envío en vivo a `tomasbermudez777@gmail.com`?**
  El destinatario `tomasbermudez777@gmail.com` ya viene preconfigurado por defecto en `.env.example` y en `weekly_email_notifier.mjs`. Para recibir el correo en tu bandeja cada lunes (o al correr `npm run cto:actualizacion-semanal`), configurá **una** de estas variables en tu archivo `.env` local o en **Settings -> Secrets and variables -> Actions** de tu repositorio de GitHub:
  1. **`GMAIL_APP_PASSWORD`** *(Recomendado y 100% gratis)*: Tu Contraseña de Aplicación de 16 letras de Google (envía directo por `smtp.gmail.com:465`).
  2. **`RESEND_API_KEY`**: Tu clave gratuita de Resend (`https://resend.com`).
  3. **`N8N_EMAIL_WEBHOOK_URL`**: URL de tu webhook en n8n o Google Apps Script.
  *(Si aún no cargaste ninguna clave, el sistema guarda igual la vista previa lista para abrir en `weekly_update/ULTIMO_REPORTE_EMAIL_PREVIEW.html` sin dar error).*

### 13. Inyectar escenas 3D, Gaussian Splatting o Shaders a 60 FPS (`npm run cto:efecto-3d`)
```powershell
npm run cto:efecto-3d -- "diorama-3d"
# Opciones disponibles: diorama-3d | gaussian-splat | shader-hero | particulas-gpu | holo-card
```
Genera e inyecta en tu proyecto activo escenas 3D interactivas con iluminación cinematográfica HDR (`AgX tone mapping`, `WebGPURenderer` r186), visores fotorrealistas de **3D Gaussian Splatting** (`Spark 2.x`), partículas en GPU o tarjetas holográficas 3D con auto-degradación inteligente de FPS en celulares.

### 14. Comprimir modelos 3D `.glb` entre un 70% y 85% (`npm run cto:optimizar-3d`)
```powershell
npm run cto:optimizar-3d -- "ruta/al/archivo.glb"
```
Pasa cualquier archivo `.glb` por la tubería automática de `glTF-Transform` + `meshoptimizer` v1.3 (`prune`, `dedup`, `resample`, `meshopt` y texturas `webp`), reduciendo su peso entre un **70% y 85%** para que cargue al instante en teléfonos y en Cloudflare Edge.

### 15. Consultar el saldo y escudo FinOps de tus $90 USD en Google Cloud (`npm run cto:gcp-status`)
```powershell
npm run cto:gcp-status
```
Muestra cuánto crédito tenés disponible de tus **$90.00 USD en Google Cloud / Vertex AI**, cuánto se consumió en el día y confirma que el escudo FinOps de **$1.50 USD / día** (100% serverless, sin servidores encendidos 24/7) está activo y protegiendo tu cuenta.

### 16. Ejecutar el Benchmark Empírico y Congelamiento Criptográfico de tus Agentes (`npm run cto:benchmark`)
```powershell
npm run cto:benchmark
```
Evalúa a los 9 roles de tu equipo contra las **5 Golden Benchmark Tasks** reales (1. UX & Tokens OKLCH/APCA, 2. Motion 60FPS & 3D, 3. Clean Code & AST < 500ms, 4. Zero-Trust AppSec y 5. Eficiencia de Tokens HOT/WARM/COLD), verifica las trazas de las 3 olas (`MASEval`), el servidor MCP y los splits `held-in`/`held-out` (`self-harness`), registra la calidad de tus skills (`OpenSpace v2`) y firma criptográficamente el snapshot con `Ed25519` (`agentvcs`) en `.agents/memory/agentvcs_snapshots.json`.

### 17. Ver el estado de tus Servidores MCP Zero-Trust y Enrutamiento por Rol (`npm run cto:mcp-status`)
```powershell
npm run cto:mcp-status
```
Muestra en español simple la tabla completa de los **13 servidores MCP instalados** (incluyendo `blender-mcp`), qué rol y ola del equipo tiene permiso para usar cada uno (**Separación Creador-Verificador** en `< 0.1ms`: Ola 1 Spec, Ola 2 Constructores, Ola 3A Verificador `100% Read-Only` y Ola 3B Auditor DevSecOps), confirma que las respuestas mayores a `1.200 tokens` se comprimen en disco devolviendo solo un resumen ejecutivo (`< 300 tokens`), y verifica el resultado **`18/18 SARIF Pass`** (`OWASP MCP Top 10`) en `.agents/security_reports/mcp_audit.sarif.json`.

### 18. Alternar el Motor de Base de Datos del Proyecto Activo (`npm run cto:arquitectura-db`)
```powershell
# Modo ligero $0.00 en Cloudflare D1 (SQLite en el Edge):
npm run cto:arquitectura-db -- "edge-d1"

# Modo empresarial SaaS/Fintech en PostgreSQL v14+ (Hyperdrive + Drizzle ORM + RLS + 3 Zonas + KMS):
npm run cto:arquitectura-db -- "enterprise-postgres"
```
Conmuta con un solo comando la arquitectura de datos de tu sitio activo entre **`edge-d1`** (por defecto para landings y catálogos ligeros a `$0.00`) y **`enterprise-postgres`** (generando automáticamente en `projects/<slug>/db/` el esquema Serverless PostgreSQL con `ENABLE / FORCE ROW LEVEL SECURITY`, las 3 zonas `zone_restricted` / `zone_confidential` / `zone_audit_worm` inmutable, y el cifrado de columnas PII con `AES-256-GCM` + `GCP Cloud KMS`).

### 19. Destilar Cursos en Video, Conferencias o Papers a Reglas Atómicas (`npm run cto:destilar-curso`)
```powershell
# Procesar todas las transcripciones pendientes (.srt, .vtt, .txt, .md) en knowledge/_inbox_courses/:
npm run cto:destilar-curso

# O destilar un archivo específico:
npm run cto:destilar-curso -- "ruta/a/transcripcion.srt"
```
Elimina automáticamente el **80%+ del relleno conversacional** (saludos, muletillas, marcas de tiempo) y extrae exclusivamente comandos de configuración, código listo para producción traducido al stack SOTA 2026, reglas verificables y tabla de errores frecuentes (*Gotchas*), guardando una salida dual en `knowledge/` (`TIER_1_SOTA_2026`) y `.agents/skills/`.

### 20. Cosechar Documentación Oficial, `/llms.txt` y Catálogos de Seguridad (`npm run cto:cosechar-docs`)
```powershell
npm run cto:cosechar-docs
```
Recorre los repositorios oficiales de tu bóveda local (`sota-2026/webgpu-3d-2026`, `self-evolving-2026`, `final-frontier-2026`) y regenera los **3 manuales canónicos `CANON_OFFICIAL_DOCS_*_2026.md`** libres de relleno más los **3 catálogos estructurados JSON** (`OWASP ASVS v5.0`, `AISVS v1.0 + MCP Top 10`, `WSTG + OpenCRE + MITRE ATLAS/D3FEND`) en `.agents/security_catalogs/`.

### 21. Configurar Dirección de Arte por Industria (`npm run cto:arquetipo`)
```powershell
npm run cto:arquetipo -- "<ecommerce | fintech | erp | streamer | abogacia | clinica | saas | lujo>"
```
Genera automáticamente `PRODUCT.md` y `DESIGN.md` en el proyecto activo siguiendo la especificación oficial de **Google Labs (`google-labs-code/design.md`)** y **Paul Bakaus Impeccable v4.6 (`pbakaus/impeccable`)**, configurando el modo de superficie (`Persuade`, `Operate`, `Read`, `Experience`), los tokens OKLCH específicos del rubro y validando las **62 reglas deterministas Anti-Slop**.

### 22. Empaquetar Proyecto como App Móvil Nativa iOS/Android (`npm run cto:crear-movil`)
```powershell
npm run cto:crear-movil
```
Activa el brazo móvil de la fábrica (`Capacitor 8` + `Style Dictionary v4 Multi-Target`), compilando simultáneamente `tokens/tokens.css`, `tokens/tokens.mobile.json` y `tokens/ThemeTokens.ts` (escalas `pt`/`dp` para iOS Swift, Android XML y Expo/React Native), además de generar `capacitor.config.ts`, `mobile-ergonomics.css` (`safe-area-inset-*` para Dynamic Island/Notch y áreas táctiles `>= 48x48px`) y `mobile-native-bridge.ts` (biometría `WebAuthn/Passkeys`, cámara y notificaciones push).

### 23. Investigar Referencia con Ingeniería Inversa de Sala Limpia (`morluto/rea`)
```bash
npm run cto:investigar-referencia -- "<ruta-o-url>"
```
Usa el puente de ingeniería inversa ética basada en evidencia (`rea_reverse_engineering_bridge.mjs`) para analizar la estructura DOM, contratos de red (`.har`), módulos JS/TS (*Wakaru*) y artefactos `.wasm` de una aplicación de referencia y generar una especificación funcional y matemática limpia (`RECONSTRUCTED_SPEC.md`) sin copiar código propietario ni marcas registradas.

### 24. Simular o Procesar Feedback Post-Venta de Cliente (`Web Widget / Slack -> Draft PR`)
```bash
npm run cto:feedback-cliente -- "<mensaje-del-ticket>"
```
Procesa un ticket entrante del panel interactivo de cliente o de Slack a través del circuito seguro Zero-Trust (`Filtro Anti-Prompt-Injection + Redacción PII -> HybridAgentSandbox -> Braintrust Autoevals -> Rama feedback/<ticket-id> + Preview URL + Notificación de 1 clic al CTO`).

### 25. Aplicar un Cambio Incremental con Especificación Delta y Enrutamiento Adaptativo (`npm run cto:cambio-incremental`)
```powershell
npm run cto:cambio-incremental -- "Cambiar el color del CTA principal y actualizar el título del Hero"
```
Aplica una modificación sobre el proyecto activo sin reescribir toda la especificación ni despertar agentes innecesarios:
1. **Especificación Delta (`OpenSpec`)**: Crea un archivo ligero en `projects/<slug>/deltas/<YYYY-MM-DD-cambio>.delta.md` con bloques `ADDED / MODIFIED / REMOVED` y lo fusiona en el `SPEC.md` canónico solo cuando pasan todos los tests.
2. **3 Carriles Automáticos de Velocidad (`SWE-AF` + `Elastic Loop`)**:
   - **Carril 1 (`LANE_1_FAST_PATH < 15s`)**: Para cambios visuales, copy, colores OKLCH o CSS puntual. Activa **1 solo agente** (`ux-designer` o `senior-coder`) + linter AST `Oxc` (`<= 1.200 tokens`).
   - **Carril 2 (`LANE_2_STANDARD_BUILD`)**: Para nuevas secciones UI, endpoints o componentes 3D. Activa `Spec Delta -> 2 Constructores -> Verificador Read-Only`.
   - **Carril 3 (`LANE_3_DEEP_ARCHITECTURE`)**: Para esquemas de base de datos (`PostgreSQL RLS`), autenticación (`Kratos/Keto`), cifrado `KMS` o migración móvil (`Capacitor 8`). Activa el flujo completo de 6 etapas + las 3 olas completas.
3. **Memoria en Grafo Git (`Beads`) y Compuerta `Fail-to-Pass (F2P) / Pass-to-Pass (P2P)`**: Registra cada subtarea con bloqueo explícito de archivos (`fileLocks` en `.agents/beads/task_graph.jsonl`) y verifica que el cambio supere tanto el test nuevo (`f2pVerified: true`) como toda la suite existente (`p2pVerified: true`).

### 26. Auditar y Certificar el Harness Completo Pre-Vuelo (`npm run cto:auditar-harness`)
```powershell
npm run cto:auditar-harness
```
Ejecuta el **Doctor Integral del Harness (`tools/audit/harness_doctor_audit.mjs`)**:
- Audita y califica (`0–100 puntos`) las **8 Capas Operativas del Harness** (Fases 1 a 31), verificando que no existan scripts desconectados en la ruta crítica (`cto:nuevo -> cto:arquetipo -> cto:construir -> cto:empaquetar`), que el presupuesto de arranque `HOT + WARM` sea **`<= 3.500 tokens`**, que los libros fuera del dominio web estén en cuarentena y que la firma criptográfica `Ed25519` (`agentvcs_snapshots.json`) sea 100% válida.
- Limpia residuos de pruebas (`--reset-test-artifacts`), corre un **Simulacro End-to-End de 5 pasos en seco** dentro de una cápsula temporal aislada y genera en la raíz el informe ejecutivo **`HARNESS_READINESS_REPORT.md`** con el veredicto **`LISTO PARA EL PRIMER SITIO REAL: SÍ / NO`**.

### 27. Abrir el Gemelo Digital en Vivo "Factory Twin Cockpit" (`npm run cto:cockpit`)
```powershell
# Levantar el panel web en tiempo real en http://localhost:4400 (0 consumo de tokens):
npm run cto:cockpit

# Simular recorrido en vivo de los 11 personajes por las 6 salas desde consola:
node tools/cockpit/factory_twin_server.mjs --demo-walkthrough
```
Levanta en `http://localhost:4400` un panel interactivo en español con **0 consumo de tokens** (Server-Sent Events `SSE` sobre `.agents/runs/current_factory_state.json`, `.agents/beads/task_graph.jsonl` y `factory_dora_ledger.json`) con **3 pestañas en tiempo real**:
1. **🎮 Pestaña 1 — Mapa 2D de la Fábrica en Vivo ("Factory Game Floor" en HTML5 Canvas a 60 FPS)**: Muestra las **6 Salas iluminadas** y a los **11 personajes en miniatura** (`1 Capataz + 10 Agentes`) caminando con animación suave (`lerp`), barra de estado sobre la cabeza, globo de diálogo en vivo y ficha lateral al hacer clic (función exacta, herramientas MCP, permisos de Lectura/Escritura e historial `OpenSpace Skill Quality`). Incluye el botón **"▶️ Simular Recorrido de los 10 Agentes en Vivo"**.
2. **📋 Pestaña 2 — Tablero Kanban & Compuertas HITL (`KaibanJS` / `Pragor`)**: Muestra las 5 columnas en vivo y permite ejecutar con 1 clic **"✅ Aprobar Paso HITL"**, **"💬 Enviar Feedback Rápido"** y **"🚀 Empaquetar .ZIP"**, junto con la **Bitácora Forense en Vivo** (*Quién hizo qué, cuándo y por qué*).
3. **📊 Pestaña 3 — Radiografía del Sitio Activo & FinOps**: Muestra el proyecto activo, el arquetipo visual, el modo de base de datos (`edge-d1` vs `enterprise-postgres`), el carril de velocidad (`LANE 1/2/3`), el termómetro de los 4 bloques de `eval_matrix.mjs` (`100.0 / 100.0`) y el gasto diario frente al tope de `$1.50 USD`.

### 28. Crear Intro de Video Animada a 60 FPS con el Logo de la Marca (`npm run cto:crear-intro-video`)
```powershell
npm run cto:crear-intro-video -- "<estilo: minimal | 3d-pbr | vertex-veo-hybrid | shader-hud>"
# Ejemplo:
npm run cto:crear-intro-video -- "vertex-veo-hybrid"
```
Genera la intro de video programática a **60 FPS** (`2.5s` a `5.0s`) usando el archivo `.svg` del logo y los tokens `OKLCH` del `DESIGN.md` del proyecto activo (prohibiendo que la IA deforme el vector o la tipografía del logo), sincronizada con su diseño sonoro a **`-14 LUFS`** y el escalón de GCP elegido (`Motion Canvas` + `Three.js r186` + lienzo B-Roll opcional con `Vertex AI Veo` / `Imagen 3`). Empaqueta automáticamente el video en formato dual **`AV1/WebM` + `MP4` (`< 1.8 MB`)** junto con su `poster.webp` instantáneo (`LCP < 1.2s`, `CLS: 0.00`).

### 29. Configurar Diseño Sonoro Procedural, Música Adaptativa/CC0 y Sesión Reaper `.RPP` (`npm run cto:crear-audio`)
```powershell
npm run cto:crear-audio -- "<modo: sfx-ui | vertex-musiclm | cloudrun-stable-audio | musica-adaptativa | libreria-cc0 | exportar-rpp>"
# Ejemplo:
npm run cto:crear-audio -- "sfx-ui"
```
Configura el motor de efectos de sonido en tiempo real (`templates/components/web-audio-director.js` con **`0 KB` de archivos externos**, 6 presets táctiles, micro-variación orgánica de `±20 cents` en pitch y `±8%` en filtro paso-bajo, audio espacial 3D `HRTF` sincronizado con `Three.js r186` y botón accesible de *Mute*), genera o selecciona la música de fondo normalizada a **`-18 LUFS`** (con *Sidechain Ducking* automático de `-6 dB` en `300 Hz – 3.5 kHz` cuando hay locución de Google Cloud TTS), registra el costo en `.agents/memory/gcp_finops_budget.json` y exporta la sesión completa compatible con **Reaper DAW (`projects/<slug>/audio_session/<slug>.rpp`) + pistas MIDI (`.mid`)**.

### 30. Completar y Aprobar la Entrevista Inicial Obligatoria de 10 Bloques (`npm run cto:entrevista`)
```powershell
# Generar o revisar el estado de la entrevista del proyecto:
npm run cto:entrevista -- "<slug>" "<rubro>"

# Aprobar la entrevista y auto-compilar SPEC.md + PRODUCT.md + DESIGN.md (con identidad sonora a medida):
npm run cto:entrevista -- "<slug>" --aprobar
```
Activa la compuerta pre-construcción (`HARD_STOP_INTERVIEW_REQUIRED`) que garantiza que ningún agente construya a ciegas:
- Genera `projects/<slug>/ENTREVISTA_CLIENTE.md` y `projects/<slug>/CLIENT_BRIEF_INTERVIEW.json` con los **10 Bloques Maestros** (1. Identidad/Rubro, 2. Audiencia/CRO/Primary CTA, 3. Sitemap, 4. Estética OKLCH/Tipografía, 5. Movimiento/3D WebGPU, 6. Identidad Sonora/Música/Video Intro `off | subtle | tactile | immersive-3d` + material físico `paper | polymer | wood | glass | metal | cyber-hud`, 7. Activos del Cliente vs IA, 8. Backend/D1/Postgres RLS, 9. SEO/GEO/Seguridad y 10. Presupuesto FinOps/DoD).
- Al ejecutar `--aprobar`, auto-compila `SPEC.md` (`[REQ-01]..[REQ-12]`), `PRODUCT.md`, `DESIGN.md` (con síntesis psicoacústica calculada por `synthesizeProceduralSoundFromDesignCriteria()`) y `.agents/beads/task_graph.jsonl`.

