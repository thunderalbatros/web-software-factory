/**
 * tools/cto/cto_help_catalog.mjs — Centralized Spanish CTO Command Catalog (L-04)
 * ================================================================================
 * Extracted from tools/cto_command_center.mjs to eliminate duplicate CLI help
 * blocks and reduce code duplication below the 4.0% Oxc/JSCPD threshold.
 */

export const CTO_CLI_COMMANDS = Object.freeze([
  'npm run cto:nuevo -- "<nombre-proyecto>"',
  'npm run cto:proyectos [-- "<slug>"]',
  'npm run cto:construir',
  'npm run cto:revisar',
  'npm run cto:aprobar',
  'npm run cto:empaquetar',
  'npm run cto:feedback -- "tu comentario en español"',
  'npm run cto:aprender -- "nueva tecnología o efecto visual"',
  'npm run cto:evolucionar',
  'npm run cto:extraer-diseno -- "https://linear.app"',
  'npm run cto:ingerir-libros',
  'npm run cto:actualizacion-semanal',
  'npm run cto:efecto-3d -- "<diorama-3d | gaussian-splat | shader-hero | particulas-gpu | holo-card>"',
  'npm run cto:optimizar-3d -- "<ruta-al-archivo.glb>"',
  'npm run cto:gcp-status',
  'npm run cto:benchmark',
  'npm run cto:mcp-status',
  'npm run cto:arquitectura-db -- "<edge-d1 | enterprise-postgres>"',
  'npm run cto:destilar-curso [-- "<ruta-a-transcripcion.srt/.txt/.md>"]',
  'npm run cto:cosechar-docs',
  'npm run cto:arquetipo -- "<ecommerce | fintech | erp | streamer | abogacia | clinica | saas | lujo>"',
  'npm run cto:crear-movil',
  'npm run cto:investigar-referencia -- "<ruta-o-url>"',
  'npm run cto:feedback-cliente -- "<mensaje-del-ticket>"',
  'npm run cto:auditar-harness',
  'npm run cto:cockpit',
  'npm run cto:aterrizar',
  'npm run cto:auditar-jev',
  'npm run cto:memoria-jev',
  'npm run cto:statechart'
]);

export function printCtoHelpCatalog() {
  console.log('Comandos disponibles para el CTO:');
  for (const cmdLine of CTO_CLI_COMMANDS) {
    console.log(`  ${cmdLine}`);
  }
}

