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
