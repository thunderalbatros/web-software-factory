import temml from 'temml';

function extractTextFromHast(node) {
  if (!node) return '';
  if (node.type === 'text') return String(node.value || '');
  if (Array.isArray(node.children)) {
    return node.children.map(extractTextFromHast).join('');
  }
  return '';
}

/**
 * Minimal deterministic Rehype plugin & helper that compiles `<code class="language-math">`
 * or `<span data-latex="...">` nodes into native `<math>` MathML at build time via `temml` (0 KB client JS).
 */
export function renderLatexToMathml(latex, displayMode = false) {
  return temml.renderToString(String(latex || '').trim(), {
    displayMode: Boolean(displayMode),
    xml: false,
    annotate: false,
    throwOnError: false
  });
}

export function rehypeTemmlMathml() {
  function visit(node) {
    if (!node || !Array.isArray(node.children)) return;
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      if (
        child &&
        child.type === 'element' &&
        child.tagName === 'pre' &&
        Array.isArray(child.children) &&
        child.children.length === 1 &&
        child.children[0].tagName === 'code'
      ) {
        const codeEl = child.children[0];
        const classes = Array.isArray(codeEl.properties?.className) ? codeEl.properties.className : [];
        if (classes.includes('language-math') || classes.includes('language-latex')) {
          const latex = extractTextFromHast(codeEl);
          node.children[i] = {
            type: 'raw',
            value: `<figure class="editorial-math-block" role="group" aria-label="Fórmula matemática">${renderLatexToMathml(latex, true)}</figure>`
          };
          continue;
        }
      }
      visit(child);
    }
  }
  return (tree) => {
    visit(tree);
  };
}

