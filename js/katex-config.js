/* ===================== KATEX CONFIG ===================== */
const KATEX_OPTS = {
  delimiters: [
    { left: '$$', right: '$$', display: true  },
    { left: '$',  right: '$',  display: false }
  ],
  throwOnError: false,
  errorColor: '#f87171'
};

function initKaTeX() {
  renderMathInElement(document.body, KATEX_OPTS);
}

function rerenderMath(el) {
  if (!el) return;
  renderMathInElement(el, KATEX_OPTS);
}

document.addEventListener('DOMContentLoaded', initKaTeX);
