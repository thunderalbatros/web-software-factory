/**
 * tools/lib/socratic_tutor_sandbox.mjs — Canonical Factory Re-Export for Socratic/BYOK Tutor Sandbox (Stage 3C.1)
 */
export {
  TUTOR_CHANNEL_ID,
  REQUIRED_OPAQUE_SANDBOX_ATTR,
  TUTOR_DOMPURIFY_CONFIG,
  TutorOutboundPromptSchema,
  TutorSandboxReadySchema,
  TutorHintResponseSchema,
  TutorErrorSchema,
  TutorInboundMessageSchema,
  validateOpaqueSandboxAttribute,
  validateTutorPromptRequest,
  validateTutorInboundPostMessage,
  validateTutorChannelPortMessage,
  sanitizeTutorHtmlToTrustedType,
  renderSanitizedTutorResponse,
  buildOpaqueTutorSandboxSrcdoc,
  attachOpaqueTutorBridge
} from '../../templates/astro-edge/src/lib/socratic-tutor-sandbox.mjs';
