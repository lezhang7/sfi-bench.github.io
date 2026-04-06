// SVG namespace and helpers
const NS = 'http://www.w3.org/2000/svg';
function el(tag, attrs, parent) {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs || {})) e.setAttribute(k, v);
  if (parent) parent.appendChild(e);
  return e;
}
function polar(r, a) { return { x: r * Math.cos(a), y: r * Math.sin(a) }; }
