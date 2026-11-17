/**
 * webp-guard.mjs — Pure Binary RIFF/WEBP Validation (Zero-EXIF, Zero-XMP, Anti-Polyglot SVG)
 * Operates identically inside Cloudflare Workers (`workerd`) and Node.js v24 without native deps.
 */

const FORBIDDEN_MARKERS = [
  '<svg',
  '<script',
  '<!doctype',
  '<html',
  'javascript:',
  'onload=',
  'onerror='
];

function readAscii4(bytes, offset) {
  return String.fromCharCode(bytes[offset], bytes[offset + 1], bytes[offset + 2], bytes[offset + 3]);
}

function readUint32LE(bytes, offset) {
  return (
    (bytes[offset] |
      (bytes[offset + 1] << 8) |
      (bytes[offset + 2] << 16) |
      (bytes[offset + 3] << 24)) >>>
    0
  );
}

function readUint16LE(bytes, offset) {
  return bytes[offset] | (bytes[offset + 1] << 8);
}

function readUint24LE(bytes, offset) {
  return bytes[offset] | (bytes[offset + 1] << 8) | (bytes[offset + 2] << 16);
}

/**
 * Validates that raw bytes are strictly a stripped WebP image (no EXIF, no XMP, no SVG polyglot)
 * bounded in byte length and pixel dimensions (`1..maxDimension`).
 */
export function validateStrictWebpAvatarBytes(
  rawInput,
  { maxBytes = 25600, maxDimension = 256 } = {}
) {
  const bytes = rawInput instanceof Uint8Array ? rawInput : new Uint8Array(rawInput || []);
  if (bytes.byteLength < 24) {
    return { valid: false, status: 415, error: 'INVALID_WEBP_AVATAR_TOO_SMALL' };
  }
  if (bytes.byteLength > maxBytes) {
    return { valid: false, status: 413, error: 'AVATAR_TOO_LARGE' };
  }

  // Reject any ASCII HTML/SVG/Script polyglot markers anywhere inside the bounded buffer
  const sampleText = new TextDecoder('latin1').decode(bytes).toLowerCase();
  for (const marker of FORBIDDEN_MARKERS) {
    if (sampleText.includes(marker)) {
      return { valid: false, status: 415, error: 'INVALID_WEBP_POLYGLOT_DETECTED' };
    }
  }

  if (readAscii4(bytes, 0) !== 'RIFF' || readAscii4(bytes, 8) !== 'WEBP') {
    return { valid: false, status: 415, error: 'INVALID_WEBP_MAGIC_HEADER' };
  }

  const declaredRiffSize = readUint32LE(bytes, 4);
  if (declaredRiffSize + 8 !== bytes.byteLength) {
    return { valid: false, status: 415, error: 'INVALID_WEBP_RIFF_LENGTH' };
  }

  let cursor = 12;
  let hasImageFrame = false;
  let width = 0;
  let height = 0;

  while (cursor + 8 <= bytes.byteLength) {
    const fourcc = readAscii4(bytes, cursor);
    const chunkSize = readUint32LE(bytes, cursor + 4);
    const payloadStart = cursor + 8;
    const payloadEnd = payloadStart + chunkSize;
    if (payloadEnd > bytes.byteLength) {
      return { valid: false, status: 415, error: 'TRUNCATED_WEBP_CHUNK' };
    }

    if (fourcc === 'EXIF' || fourcc === 'XMP ') {
      return { valid: false, status: 415, error: 'FORBIDDEN_WEBP_METADATA_CHUNK' };
    }

    if (fourcc === 'VP8X') {
      if (chunkSize < 10) {
        return { valid: false, status: 415, error: 'INVALID_WEBP_VP8X_CHUNK' };
      }
      const flags = bytes[payloadStart];
      if ((flags & 0x0c) !== 0) {
        // Bit 2 = XMP (0x04), Bit 3 = EXIF (0x08)
        return { valid: false, status: 415, error: 'FORBIDDEN_WEBP_METADATA_FLAG' };
      }
      width = readUint24LE(bytes, payloadStart + 4) + 1;
      height = readUint24LE(bytes, payloadStart + 7) + 1;
    } else if (fourcc === 'VP8 ') {
      if (chunkSize < 10) {
        return { valid: false, status: 415, error: 'INVALID_WEBP_VP8_CHUNK' };
      }
      if (
        bytes[payloadStart + 3] !== 0x9d ||
        bytes[payloadStart + 4] !== 0x01 ||
        bytes[payloadStart + 5] !== 0x2a
      ) {
        return { valid: false, status: 415, error: 'INVALID_WEBP_VP8_SYNC_CODE' };
      }
      hasImageFrame = true;
      if (!width || !height) {
        width = readUint16LE(bytes, payloadStart + 6) & 0x3fff;
        height = readUint16LE(bytes, payloadStart + 8) & 0x3fff;
      }
    } else if (fourcc === 'VP8L') {
      if (chunkSize < 5 || bytes[payloadStart] !== 0x2f) {
        return { valid: false, status: 415, error: 'INVALID_WEBP_VP8L_SIGNATURE' };
      }
      hasImageFrame = true;
      if (!width || !height) {
        const packed = readUint32LE(bytes, payloadStart + 1);
        width = (packed & 0x3fff) + 1;
        height = ((packed >> 14) & 0x3fff) + 1;
      }
    }

    cursor = payloadEnd + (chunkSize % 2);
  }

  if (cursor !== bytes.byteLength || !hasImageFrame) {
    return { valid: false, status: 415, error: 'MISSING_WEBP_IMAGE_FRAME' };
  }

  if (width < 1 || height < 1 || width > maxDimension || height > maxDimension) {
    return { valid: false, status: 415, error: 'INVALID_WEBP_DIMENSIONS' };
  }

  return { valid: true, width, height, byteLength: bytes.byteLength };
}
