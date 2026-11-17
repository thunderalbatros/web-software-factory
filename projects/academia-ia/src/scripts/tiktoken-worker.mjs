import { Tiktoken } from 'js-tiktoken/lite';
import cl100kBase from 'js-tiktoken/ranks/cl100k_base';

const encoder = new Tiktoken(cl100kBase);

self.addEventListener('message', (event) => {
  const payload = event?.data || {};
  const id = payload.id ?? 0;
  const text = String(payload.text || '');
  const tokens = encoder.encode(text);
  const chars = [...text].length;
  const ratio = tokens.length > 0 ? (chars / tokens.length).toFixed(2) : '0.00';

  const chips = tokens.slice(0, 36).map((tokenId) => {
    let decodedPiece = '';
    try {
      decodedPiece = encoder.decode([tokenId]);
    } catch {
      decodedPiece = '·';
    }
    return {
      tokenId,
      visiblePiece: decodedPiece.replace(/ /g, '␣').replace(/\n/g, '↵') || '∅'
    };
  });

  self.postMessage({
    id,
    count: tokens.length,
    chars,
    ratio,
    chips
  });
});
