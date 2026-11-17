/**
 * qr-svg.mjs — Pure ISO/IEC 18004 QR Code Matrix Encoder (Versions 1..6, EC Level M, Byte Mode)
 * Renders pure SVG elements via DOM APIs (0 external deps, 0 innerHTML / Trusted Types compliant).
 */

const GF_EXP = new Uint8Array(512);
const GF_LOG = new Uint8Array(256);
(() => {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    GF_EXP[i] = x;
    GF_LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) {
    GF_EXP[i] = GF_EXP[i - 255];
  }
})();

function gfMul(a, b) {
  if (a === 0 || b === 0) return 0;
  return GF_EXP[GF_LOG[a] + GF_LOG[b]];
}

function rsGeneratorPoly(degree) {
  let poly = [1];
  for (let i = 0; i < degree; i++) {
    const next = Array.from({ length: poly.length + 1 }, () => 0);
    const root = GF_EXP[i];
    for (let j = 0; j < poly.length; j++) {
      next[j] ^= poly[j];
      next[j + 1] ^= gfMul(poly[j], root);
    }
    poly = next;
  }
  return poly;
}

function rsComputeEcBytes(dataBytes, ecLen) {
  const gen = rsGeneratorPoly(ecLen);
  const res = new Uint8Array(dataBytes.length + ecLen);
  res.set(dataBytes, 0);
  for (let i = 0; i < dataBytes.length; i++) {
    const coef = res[i];
    if (coef !== 0) {
      for (let j = 0; j < gen.length; j++) {
        res[i + j] ^= gfMul(gen[j], coef);
      }
    }
  }
  return res.slice(dataBytes.length);
}

// ISO/IEC 18004 Level M (Byte Mode) Specs for Versions 1..6
const QR_VERSION_M_SPECS = [
  null,
  { version: 1, size: 21, dataBytes: 16, ecPerBlock: 10, blocks: [16], align: [] },
  { version: 2, size: 25, dataBytes: 28, ecPerBlock: 16, blocks: [28], align: [6, 18] },
  { version: 3, size: 29, dataBytes: 44, ecPerBlock: 26, blocks: [44], align: [6, 22] },
  { version: 4, size: 33, dataBytes: 64, ecPerBlock: 18, blocks: [32, 32], align: [6, 26] },
  { version: 5, size: 37, dataBytes: 86, ecPerBlock: 24, blocks: [43, 43], align: [6, 30] },
  { version: 6, size: 41, dataBytes: 108, ecPerBlock: 16, blocks: [27, 27, 27, 27], align: [6, 34] }
];

// BCH(15,5) format strings pre-XORed with 0x5412 for Error Correction Level M (00) & Masks 0..7
const FORMAT_BITS_M = [
  0x5412, 0x5125, 0x5e7c, 0x5b4b, 0x45f9, 0x40ce, 0x4f97, 0x4aa0
];

function pushBits(bits, val, len) {
  for (let i = len - 1; i >= 0; i--) {
    bits.push((val >> i) & 1);
  }
}

function encodeQrCodewords(utf8Bytes) {
  // Choose smallest Version 1..6 Level M that fits: header = 4 mode bits + 8 length bits + payload + 4 terminator bits
  let spec = null;
  for (let v = 1; v < QR_VERSION_M_SPECS.length; v++) {
    const cand = QR_VERSION_M_SPECS[v];
    if (2 + utf8Bytes.length <= cand.dataBytes) {
      spec = cand;
      break;
    }
  }
  if (!spec) {
    spec = QR_VERSION_M_SPECS[6];
  }
  const payload = utf8Bytes.slice(0, spec.dataBytes - 2);
  const bits = [];
  pushBits(bits, 0b0100, 4); // Byte mode
  pushBits(bits, payload.length, 8);
  for (const b of payload) pushBits(bits, b, 8);
  const maxBits = spec.dataBytes * 8;
  pushBits(bits, 0, Math.min(4, maxBits - bits.length));
  while (bits.length % 8 !== 0) bits.push(0);

  const dataWords = [];
  for (let i = 0; i < bits.length; i += 8) {
    let w = 0;
    for (let j = 0; j < 8; j++) w = (w << 1) | bits[i + j];
    dataWords.push(w);
  }
  let padToggle = 0;
  while (dataWords.length < spec.dataBytes) {
    dataWords.push(padToggle % 2 === 0 ? 0xec : 0x11);
    padToggle++;
  }

  const dataBlocks = [];
  const ecBlocks = [];
  let offset = 0;
  for (const bLen of spec.blocks) {
    const slice = Uint8Array.from(dataWords.slice(offset, offset + bLen));
    offset += bLen;
    dataBlocks.push(slice);
    ecBlocks.push(rsComputeEcBytes(slice, spec.ecPerBlock));
  }

  const finalBytes = [];
  const maxDataLen = Math.max(...dataBlocks.map((b) => b.length));
  for (let i = 0; i < maxDataLen; i++) {
    for (const blk of dataBlocks) {
      if (i < blk.length) finalBytes.push(blk[i]);
    }
  }
  for (let i = 0; i < spec.ecPerBlock; i++) {
    for (const ecBlk of ecBlocks) {
      if (i < ecBlk.length) finalBytes.push(ecBlk[i]);
    }
  }
  return { spec, finalBytes };
}

function buildFunctionMatrix(spec) {
  const n = spec.size;
  const grid = Array.from({ length: n }, () => new Uint8Array(n));
  const reserved = Array.from({ length: n }, () => new Uint8Array(n));

  const setFixed = (r, c, dark) => {
    if (r < 0 || r >= n || c < 0 || c >= n) return;
    grid[r][c] = dark ? 1 : 0;
    reserved[r][c] = 1;
  };

  const drawFinder = (topR, leftC) => {
    for (let dr = -1; dr <= 7; dr++) {
      for (let dc = -1; dc <= 7; dc++) {
        const r = topR + dr;
        const c = leftC + dc;
        if (r < 0 || r >= n || c < 0 || c >= n) continue;
        const inOuter = dr === 0 || dr === 6 || dc === 0 || dc === 6;
        const inCore = dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4;
        const inBorder = dr === -1 || dr === 7 || dc === -1 || dc === 7;
        setFixed(r, c, !inBorder && (inOuter || inCore));
      }
    }
  };

  drawFinder(0, 0);
  drawFinder(0, n - 7);
  drawFinder(n - 7, 0);

  // Alignment patterns
  const centers = spec.align;
  for (const rC of centers) {
    for (const cC of centers) {
      const overlapsFinder =
        (rC < 9 && cC < 9) || (rC < 9 && cC > n - 10) || (rC > n - 10 && cC < 9);
      if (overlapsFinder) continue;
      for (let dr = -2; dr <= 2; dr++) {
        for (let dc = -2; dc <= 2; dc++) {
          const dark = Math.abs(dr) === 2 || Math.abs(dc) === 2 || (dr === 0 && dc === 0);
          setFixed(rC + dr, cC + dc, dark);
        }
      }
    }
  }

  // Timing patterns
  for (let i = 8; i < n - 8; i++) {
    setFixed(6, i, i % 2 === 0);
    setFixed(i, 6, i % 2 === 0);
  }

  // Dark module & reserve format info strips
  setFixed(n - 8, 8, true);
  for (let i = 0; i < 9; i++) {
    if (i !== 6) {
      reserved[8][i] = 1;
      reserved[i][8] = 1;
    }
  }
  for (let i = 0; i < 8; i++) {
    reserved[8][n - 1 - i] = 1;
    reserved[n - 1 - i][8] = 1;
  }

  return { n, grid, reserved };
}

function applyMaskAndFormat(baseGrid, reserved, finalBytes, maskId) {
  const n = baseGrid.length;
  const mat = baseGrid.map((row) => Uint8Array.from(row));

  const bitStream = [];
  for (const byteVal of finalBytes) {
    for (let b = 7; b >= 0; b--) bitStream.push((byteVal >> b) & 1);
  }

  const maskFn = (r, c) => {
    switch (maskId) {
      case 0: return (r + c) % 2 === 0;
      case 1: return r % 2 === 0;
      case 2: return c % 3 === 0;
      case 3: return (r + c) % 3 === 0;
      case 4: return (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0;
      case 5: return ((r * c) % 2) + ((r * c) % 3) === 0;
      case 6: return (((r * c) % 2) + ((r * c) % 3)) % 2 === 0;
      default: return (((r + c) % 2) + ((r * c) % 3)) % 2 === 0;
    }
  };

  let bitIdx = 0;
  let dirUp = true;
  for (let rightCol = n - 1; rightCol > 0; rightCol -= 2) {
    if (rightCol === 6) rightCol -= 1;
    for (let step = 0; step < n; step++) {
      const r = dirUp ? n - 1 - step : step;
      for (let dc = 0; dc < 2; dc++) {
        const c = rightCol - dc;
        if (!reserved[r][c]) {
          const rawBit = bitIdx < bitStream.length ? bitStream[bitIdx] : 0;
          bitIdx += 1;
          mat[r][c] = rawBit ^ (maskFn(r, c) ? 1 : 0);
        }
      }
    }
    dirUp = !dirUp;
  }

  const fmt = FORMAT_BITS_M[maskId];
  for (let i = 0; i < 15; i++) {
    const bit = (fmt >> i) & 1;
    if (i < 6) mat[8][i] = bit;
    else if (i < 8) mat[8][i + 1] = bit;
    else mat[14 - i][8] = bit;

    if (i < 8) mat[n - 1 - i][8] = bit;
    else mat[8][n - 15 + i] = bit;
  }
  return mat;
}

function scorePenalty(mat) {
  const n = mat.length;
  let penalty = 0;
  for (let r = 0; r < n; r++) {
    let run = 1;
    for (let c = 1; c < n; c++) {
      if (mat[r][c] === mat[r][c - 1]) run++;
      else {
        if (run >= 5) penalty += 3 + (run - 5);
        run = 1;
      }
    }
    if (run >= 5) penalty += 3 + (run - 5);
  }
  for (let c = 0; c < n; c++) {
    let run = 1;
    for (let r = 1; r < n; r++) {
      if (mat[r][c] === mat[r - 1][c]) run++;
      else {
        if (run >= 5) penalty += 3 + (run - 5);
        run = 1;
      }
    }
    if (run >= 5) penalty += 3 + (run - 5);
  }
  return penalty;
}

export function generateQrMatrix(text = '') {
  const bytes = new TextEncoder().encode(String(text || ''));
  const { spec, finalBytes } = encodeQrCodewords(bytes);
  const { n, grid, reserved } = buildFunctionMatrix(spec);

  let bestMat = null;
  let bestScore = Number.POSITIVE_INFINITY;
  for (let mask = 0; mask < 8; mask++) {
    const candidate = applyMaskAndFormat(grid, reserved, finalBytes, mask);
    const pen = scorePenalty(candidate);
    if (pen < bestScore) {
      bestScore = pen;
      bestMat = candidate;
    }
  }
  return { version: spec.version, size: n, matrix: bestMat };
}

export function renderQrMatrixToSvgElement(doc, text = '', sizePx = 160) {
  const { size, matrix } = generateQrMatrix(text);
  const quiet = 2;
  const vb = size + quiet * 2;
  const svg = doc.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${vb} ${vb}`);
  svg.setAttribute('width', String(sizePx));
  svg.setAttribute('height', String(sizePx));
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', `Código QR de verificación para ${text}`);
  svg.setAttribute('shape-rendering', 'crispEdges');

  const bg = doc.createElementNS('http://www.w3.org/2000/svg', 'rect');
  bg.setAttribute('width', String(vb));
  bg.setAttribute('height', String(vb));
  bg.setAttribute('fill', '#ffffff');
  svg.appendChild(bg);

  let pathD = '';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (matrix[r][c] === 1) {
        pathD += `M${c + quiet},${r + quiet}h1v1h-1z`;
      }
    }
  }
  const path = doc.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', pathD);
  path.setAttribute('fill', '#111827');
  svg.appendChild(path);
  return svg;
}
