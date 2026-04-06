// ═══════════════ TOOLTIP ═══════════════
const tip = document.createElement('div');
tip.style.cssText = "position:fixed;pointer-events:none;z-index:9999;background:rgba(12,27,42,.88);color:#fff;font:500 12px 'Albert Sans',sans-serif;padding:5px 10px;border-radius:6px;opacity:0;transition:opacity .15s;backdrop-filter:blur(6px);white-space:nowrap;";
document.body.appendChild(tip);
function showTip(e, text) { tip.textContent = text; tip.style.opacity = '1'; tip.style.left = e.clientX + 12 + 'px'; tip.style.top = e.clientY - 30 + 'px'; }
function hideTip() { tip.style.opacity = '0'; }
document.addEventListener('mousemove', e => { if (tip.style.opacity === '1') { tip.style.left = e.clientX + 12 + 'px'; tip.style.top = e.clientY - 30 + 'px'; } });

// ═══════════════ DONUT CHART ═══════════════
(function () {
  const data = [
    { name: 'Layout Inference', abbr: 'LI', n: 418, c: ['#9DD1D1', '#7BBFBF'] },
    { name: 'Spatial Reasoning', abbr: 'MPR', n: 314, c: ['#4DA6A6', '#358E8E'] },
    { name: 'Counting', abbr: 'GCT', n: 389, c: ['#1B7B7B', '#0F5858'] },
    { name: 'Functional Assoc.', abbr: 'FA', n: 235, c: ['#C08338', '#9A6828'] },
    { name: 'Operation Plan.', abbr: 'OP', n: 113, c: ['#D9A860', '#C49545'] },
    { name: 'Troubleshooting', abbr: 'TS', n: 86, c: ['#EFD0A0', '#E4C08A'] },
  ];
  const total = data.reduce((s, d) => s + d.n, 0);
  const svg = document.getElementById('donut');
  const oR = 168, iR = 102, mR = (oR + iR) / 2, gap = .012;
  const defs = el('defs', {}, svg);
  data.forEach((d, i) => {
    const g = el('linearGradient', { id: `dg${i}`, x1: '0%', y1: '0%', x2: '100%', y2: '100%' }, defs);
    el('stop', { offset: '0%', 'stop-color': d.c[0] }, g);
    el('stop', { offset: '100%', 'stop-color': d.c[1] }, g);
  });
  let ang = -Math.PI / 2;
  data.forEach((d, i) => {
    const sl = (d.n / total) * 2 * Math.PI, s = ang + gap / 2, e = ang + sl - gap / 2, m = (s + e) / 2;
    const s1 = polar(oR, s), e1 = polar(oR, e), s2 = polar(iR, e), e2 = polar(iR, s);
    const la = (e - s > Math.PI) ? 1 : 0;
    const path = `M${s1.x},${s1.y} A${oR},${oR} 0 ${la} 1 ${e1.x},${e1.y} L${s2.x},${s2.y} A${iR},${iR} 0 ${la} 0 ${e2.x},${e2.y} Z`;
    const p = el('path', { d: path, fill: `url(#dg${i})` }, svg);
    p.style.transition = 'transform .25s';
    const dx = 4 * Math.cos(m), dy = 4 * Math.sin(m);
    p.addEventListener('mouseenter', (e) => { p.style.transform = `translate(${dx}px,${dy}px)`; showTip(e, `${d.name}: ${d.n} questions (${(d.n/total*100).toFixed(1)}%)`); });
    p.addEventListener('mouseleave', () => { p.style.transform = ''; hideTip(); });
    const lx = mR * Math.cos(m), ly = mR * Math.sin(m);
    let rot = (m * 180 / Math.PI) + 90;
    while (rot > 180) rot -= 360; while (rot < -180) rot += 360;
    if (rot > 90) rot -= 180; if (rot < -90) rot += 180;
    const rr = parseInt(d.c[1].slice(1, 3), 16) / 255, gg = parseInt(d.c[1].slice(3, 5), 16) / 255, bb = parseInt(d.c[1].slice(5, 7), 16) / 255;
    const dark = (.299 * rr + .587 * gg + .114 * bb) < .5;
    const fill = dark ? 'white' : '#1A1F2E';
    const grp = el('g', { transform: `translate(${lx},${ly}) rotate(${rot})` }, svg);
    el('text', { 'text-anchor': 'middle', dy: '-2', fill, style: "font:600 11px 'Albert Sans',sans-serif;" }, grp).textContent = `${d.abbr} (${(d.n / total * 100).toFixed(1)}%)`;
    el('text', { 'text-anchor': 'middle', dy: '12', fill, style: "font:500 9.5px 'Albert Sans',sans-serif;opacity:.85;" }, grp).textContent = `n=${d.n}`;
    ang += sl;
  });
})();

// ═══════════════ HISTOGRAM ═══════════════
(function () {
  const data = [{ l: '30\u201360', n: 28 }, { l: '60\u201390', n: 38 }, { l: '90\u2013120', n: 27 }, { l: '120\u2013150', n: 22 }, { l: '150\u2013180', n: 7 }, { l: '180\u2013210', n: 6 }, { l: '210\u2013300', n: 6 }];
  const svg = document.getElementById('hist');
  const M = { t: 30, r: 20, b: 56, l: 48 }, W = 380 - M.l - M.r, H = 320 - M.t - M.b;
  const yMax = 45;
  const colors = [['#C5D1D8', '#AEBFC8'], ['#96ABB8', '#7E98A8'], ['#6B8C9E', '#587D90'], ['#4A7285', '#3A6478'], ['#32586B', '#264A5E'], ['#1F4050', '#163445'], ['#0F2A38', '#0C1B2A']];
  const defs = el('defs', {}, svg);
  colors.forEach((c, i) => {
    const g = el('linearGradient', { id: `bg${i}`, x1: '0', y1: '0', x2: '0', y2: '1' }, defs);
    el('stop', { offset: '0%', 'stop-color': c[0] }, g); el('stop', { offset: '100%', 'stop-color': c[1] }, g);
  });
  const g = el('g', { transform: `translate(${M.l},${M.t})` }, svg);
  [0, 10, 20, 30, 40].forEach(v => {
    if (!v) return;
    const y = H - (v / yMax) * H;
    el('line', { x1: 0, x2: W, y1: y, y2: y, stroke: '#E2DFD8', 'stroke-width': 1 }, g);
    el('text', { x: -8, y: y + 4, 'text-anchor': 'end', style: "font:500 11px 'Albert Sans';fill:#8B95A5;" }, g).textContent = v;
  });
  const bw = W / data.length, pad = 5;
  data.forEach((d, i) => {
    const bh = (d.n / yMax) * H, x = i * bw + pad / 2, y = H - bh, w = bw - pad;
    el('rect', { x, y, width: w, height: bh, rx: 4, fill: `url(#bg${i})` }, g);
    el('text', { x: x + w / 2, y: y - 6, 'text-anchor': 'middle', style: "font:600 12px 'Albert Sans';fill:#4A5568;" }, g).textContent = d.n;
    el('text', { x: x + w / 2, y: H + 16, 'text-anchor': 'middle', transform: `rotate(-25,${x + w / 2},${H + 16})`, style: "font:500 10.5px 'Albert Sans';fill:#8B95A5;" }, g).textContent = d.l;
  });
  el('line', { x1: 0, x2: W, y1: H, y2: H, stroke: '#ccc', 'stroke-width': 1 }, g);
  el('line', { x1: 0, x2: 0, y1: 0, y2: H, stroke: '#ccc', 'stroke-width': 1 }, g);
  el('text', { x: W / 2, y: H + 48, 'text-anchor': 'middle', style: "font:600 12px 'Albert Sans';fill:#4A5568;" }, g).textContent = 'Video Duration (seconds)';
  el('text', { x: -H / 2, y: -36, 'text-anchor': 'middle', transform: 'rotate(-90)', style: "font:600 12px 'Albert Sans';fill:#4A5568;" }, g).textContent = 'Number of Videos';
  const sb = el('g', {}, g);
  el('rect', { x: W - 158, y: -2, width: 162, height: 42, rx: 6, fill: 'rgba(250,249,246,.92)', stroke: '#E2DFD8', 'stroke-width': .5 }, sb);
  el('text', { x: W - 6, y: 14, 'text-anchor': 'end', style: "font:500 10px 'Albert Sans';fill:#8B95A5;" }, sb).textContent = 'n=134 videos | \u03bc=102s | x\u0303=92s';
  el('text', { x: W - 6, y: 30, 'text-anchor': 'end', style: "font:500 10px 'Albert Sans';fill:#8B95A5;" }, sb).textContent = 'FPS: 24/30 | Res: 480p\u2013720p';
})();

// ═══════════════ RADAR ═══════════════
(function () {
  const tasks = ['Count', 'Spatial', 'Layout', 'Function', 'Operation', 'Troubleshoot.'];
  const N = 6;
  const models = [
    { name: 'Gemini-3.1-Pro', vals: [59.1, 83.4, 86.8, 73.2, 67.9, 72.1], color: '#0C1B2A' },
    { name: 'GPT-5.4-High', vals: [58.4, 82.8, 81.1, 76.2, 65.5, 68.8], color: '#1B7B7B' },
    { name: 'GPT-5', vals: [58.4, 83.0, 81.5, 75.3, 60.2, 58.1], color: '#5AABAB' },
    { name: 'Gemini-2.5 Pro', vals: [54.4, 80.7, 83.8, 65.5, 60.2, 58.1], color: '#C08338' },
    { name: 'LLaVA-Video-72B', vals: [57.9, 70.3, 75.2, 56.7, 58.4, 50.9], color: '#7B8F6A' },
  ];
  const svg = document.getElementById('radar');
  const R = 168, maxVal = 100;
  function axAng(i) { return -Math.PI / 2 + (2 * Math.PI * i) / N; }
  function vR(v) { return (v / maxVal) * R; }
  const bgPts = []; for (let i = 0; i < N; i++) { const p = polar(R, axAng(i)); bgPts.push(`${p.x},${p.y}`); }
  el('polygon', { points: bgPts.join(' '), fill: '#F2F0EB' }, svg);
  [20, 40, 60, 80, 100].forEach(v => {
    const r = vR(v), pts = [];
    for (let i = 0; i < N; i++) { const p = polar(r, axAng(i)); pts.push(`${p.x},${p.y}`); }
    el('polygon', { points: pts.join(' '), fill: 'none', stroke: '#D8D4CC', 'stroke-width': v === 100 ? 1.2 : .7 }, svg);
    if (v > 0) el('text', { x: 5, y: -r + 4, style: "font:400 11px 'Albert Sans';fill:#aaa;" }, svg).textContent = v;
  });
  for (let i = 0; i < N; i++) {
    const p = polar(R, axAng(i));
    el('line', { x1: 0, y1: 0, x2: p.x, y2: p.y, stroke: '#D8D4CC', 'stroke-width': .5 }, svg);
    const lp = polar(R + 24, axAng(i));
    el('text', { x: lp.x, y: lp.y, 'text-anchor': 'middle', 'dominant-baseline': 'central', style: "font:600 13px 'Albert Sans';fill:#4A5568;" }, svg).textContent = tasks[i];
  }
  const groups = [];
  models.forEach(m => {
    const g = el('g', {}, svg); g.style.transition = 'opacity .3s';
    const pts = [];
    for (let i = 0; i < N; i++) { const r = vR(m.vals[i]), p = polar(r, axAng(i)); pts.push(`${p.x},${p.y}`); }
    el('polygon', { points: pts.join(' '), fill: m.color, 'fill-opacity': .10, stroke: m.color, 'stroke-width': 2.2, 'stroke-linejoin': 'round' }, g);
    for (let i = 0; i < N; i++) {
      const r = vR(m.vals[i]), p = polar(r, axAng(i));
      const c = el('circle', { cx: p.x, cy: p.y, r: 3.5, fill: 'white', stroke: m.color, 'stroke-width': 1.8, style: 'cursor:pointer;' }, g);
      c.addEventListener('mouseenter', e => showTip(e, `${m.name} \u2014 ${tasks[i]}: ${m.vals[i]}%`));
      c.addEventListener('mouseleave', hideTip);
    }
    groups.push(g);
  });
  const legEl = document.getElementById('radarLegend');
  const active = new Set(models.map((_, i) => i));
  models.forEach((m, mi) => {
    const item = document.createElement('div'); item.className = 'leg-item';
    item.innerHTML = `<span class="leg-sw" style="background:${m.color}"></span>${m.name}`;
    legEl.appendChild(item);
    item.addEventListener('click', () => {
      if (active.has(mi)) { active.delete(mi); item.classList.add('dimmed'); groups[mi].style.opacity = '.05'; }
      else { active.add(mi); item.classList.remove('dimmed'); groups[mi].style.opacity = '1'; }
    });
    item.addEventListener('mouseenter', () => { groups.forEach((g, i) => { if (i !== mi && active.has(i)) g.style.opacity = '.10'; }); if (active.has(mi)) groups[mi].style.opacity = '1'; });
    item.addEventListener('mouseleave', () => { groups.forEach((g, i) => { g.style.opacity = active.has(i) ? '1' : '.05'; }); });
  });
})();

// ═══════════════ TOOL vs NO-TOOL BARS ═══════════════
(function () {
  const tasks = [
    { id: 'barOP', name: 'Operation Planning', data: [{ l: 'High', t: 69.0, n: 60.2 }, { l: 'Low', t: 57.5, n: 51.3 }] },
    { id: 'barTS', name: 'Troubleshooting', data: [{ l: 'High', t: 64.0, n: 56.5 }, { l: 'Low', t: 46.5, n: 52.3 }] },
  ];
  const col = '#1B7B7B';
  tasks.forEach(task => {
    const svg = document.getElementById(task.id);
    const M = { t: 28, r: 12, b: 28, l: 44 }, W = 180 - M.l - M.r, H = 320 - M.t - M.b;
    const yMin = 30, yMax = 78;
    function sy(v) { return M.t + H - (v - yMin) / (yMax - yMin) * H; }
    const defs = el('defs', {}, svg);
    const pat = el('pattern', { id: `h_${task.id}`, patternUnits: 'userSpaceOnUse', width: 5, height: 5, patternTransform: 'rotate(45)' }, defs);
    el('rect', { width: 5, height: 5, fill: col, 'fill-opacity': .10 }, pat);
    el('line', { x1: 0, y1: 0, x2: 0, y2: 5, stroke: col, 'stroke-width': 2, 'stroke-opacity': .30 }, pat);
    el('rect', { x: M.l, y: M.t, width: W, height: H, fill: '#F2F0EB', rx: 3 }, svg);
    el('text', { x: M.l + W / 2, y: 14, 'text-anchor': 'middle', style: "font:700 12px 'Albert Sans';fill:#0C1B2A;" }, svg).textContent = task.name;
    [30, 40, 50, 60, 70].forEach(v => {
      const y = sy(v);
      el('line', { x1: M.l, x2: M.l + W, y1: y, y2: y, stroke: '#D8D4CC', 'stroke-width': .8 }, svg);
      el('text', { x: M.l - 6, y: y + 4, 'text-anchor': 'end', style: "font:500 10px 'Albert Sans';fill:#8B95A5;" }, svg).textContent = v;
    });
    el('line', { x1: M.l, x2: M.l + W, y1: M.t + H, y2: M.t + H, stroke: '#ccc', 'stroke-width': 1 }, svg);
    const gW = W / 2, bW = 24, bGap = 5;
    task.data.forEach((gr, gi) => {
      const cx = M.l + gi * gW + gW / 2, sx = cx - bW - bGap / 2;
      const ty = sy(gr.t), th = sy(yMin) - ty;
      el('rect', { x: sx, y: ty, width: bW, height: th, rx: 3, fill: col }, svg);
      el('text', { x: sx + bW / 2, y: ty - 4, 'text-anchor': 'middle', style: `font:700 11px 'Albert Sans';fill:${col};` }, svg).textContent = gr.t.toFixed(1);
      const nx = cx + bGap / 2, ny = sy(gr.n), nh = sy(yMin) - ny;
      el('rect', { x: nx, y: ny, width: bW, height: nh, rx: 3, fill: `url(#h_${task.id})`, stroke: col, 'stroke-width': 1, 'stroke-opacity': .3 }, svg);
      el('text', { x: nx + bW / 2, y: ny - 4, 'text-anchor': 'middle', style: "font:700 11px 'Albert Sans';fill:#8B95A5;" }, svg).textContent = gr.n.toFixed(1);
      el('text', { x: cx, y: M.t + H + 16, 'text-anchor': 'middle', style: "font:700 12px 'Albert Sans';fill:#1A1F2E;" }, svg).textContent = gr.l;
    });
  });
})();

// ═══════════════ ERROR ANALYSIS DONUTS ═══════════════
(function () {
  const svg = document.getElementById('errorDonuts');
  if (!svg) return;

  const C = {
    'Recognition Error': '#4878B8', 'Re-identification': '#6C9DD6', 'Reflection Confusion': '#95BAE4',
    'Missing Multi-hop': '#D47B55', 'Affordance Overgeneralize': '#EBAB82',
    'Positional Inconsistency': '#2D9E72', 'Geometric Misinterpret.': '#5FC09C', 'Object Mislocalization': '#97D8BF',
  };
  const groups = [
    { name: 'Visual Perception', color: '#4878B8', items: ['Recognition Error', 'Re-identification', 'Reflection Confusion'] },
    { name: 'Functional Reasoning', color: '#D47B55', items: ['Missing Multi-hop', 'Affordance Overgeneralize'] },
    { name: 'Spatial Understanding', color: '#2D9E72', items: ['Positional Inconsistency', 'Geometric Misinterpret.', 'Object Mislocalization'] },
  ];
  const tasks = [
    { name: 'Global Count', segs: [{ l: 'Recognition Error', p: 60 }, { l: 'Re-identification', p: 34 }, { l: 'Object Mislocalization', p: 6 }] },
    { name: 'Layout Inference', segs: [{ l: 'Positional Inconsistency', p: 50 }, { l: 'Reflection Confusion', p: 24 }, { l: 'Recognition Error', p: 17 }, { l: 'Affordance Overgeneralize', p: 9 }] },
    { name: 'Spatial Reason', segs: [{ l: 'Geometric Misinterpret.', p: 32 }, { l: 'Positional Inconsistency', p: 25 }, { l: 'Missing Multi-hop', p: 23 }, { l: 'Affordance Overgeneralize', p: 13 }, { l: 'Re-identification', p: 8 }] },
    { name: 'Function Assoc.', segs: [{ l: 'Missing Multi-hop', p: 40 }, { l: 'Recognition Error', p: 39 }, { l: 'Affordance Overgeneralize', p: 21 }] },
  ];
  const oR = 76, iR = 46, gap = .02;
  const pos = [{ cx: 115, cy: 100 }, { cx: 345, cy: 100 }, { cx: 115, cy: 310 }, { cx: 345, cy: 310 }];

  const defs = el('defs', {}, svg);
  defs.innerHTML = '<filter id="errSh"><feGaussianBlur in="SourceAlpha" stdDeviation="1.5"/><feOffset dy="1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .08 0"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>';

  // Collect animated elements to trigger later
  const animEls = [];

  tasks.forEach((task, ti) => {
    const { cx, cy } = pos[ti];
    const total = task.segs.reduce((s, d) => s + d.p, 0);
    let ang = -Math.PI / 2;

    task.segs.forEach((seg, si) => {
      const sl = (seg.p / total) * 2 * Math.PI;
      const s = ang + gap / 2, e = ang + sl - gap / 2, m = (s + e) / 2;
      const s1 = polar(oR, s), e1 = polar(oR, e), s2 = polar(iR, e), e2 = polar(iR, s);
      const la = (e - s > Math.PI) ? 1 : 0;
      const d = `M${s1.x},${s1.y} A${oR},${oR} 0 ${la} 1 ${e1.x},${e1.y} L${s2.x},${s2.y} A${iR},${iR} 0 ${la} 0 ${e2.x},${e2.y} Z`;
      const p = el('path', { d, fill: C[seg.l] || '#bbb', transform: `translate(${cx},${cy})`, filter: 'url(#errSh)', style: 'cursor:pointer;', opacity: '0' }, svg);

      const delay = ti * 120 + si * 50;
      animEls.push({ el: p, delay, prop: 'opacity', val: '1' });

      const dx = 4 * Math.cos(m), dy = 4 * Math.sin(m);
      p.addEventListener('mouseenter', ev => { p.setAttribute('transform', `translate(${cx + dx},${cy + dy})`); showTip(ev, `${seg.l}: ${seg.p}%`); });
      p.addEventListener('mouseleave', () => { p.setAttribute('transform', `translate(${cx},${cy})`); hideTip(); });

      // Outside labels
      const labelR = oR + 14;
      const lx = labelR * Math.cos(m), ly = labelR * Math.sin(m);
      const anchor = Math.cos(m) >= 0 ? 'start' : 'end';
      const nudge = Math.cos(m) >= 0 ? 3 : -3;
      const innerPt = polar(oR + 2, m), outerPt = polar(oR + 10, m);
      const line = el('line', { x1: cx + innerPt.x, y1: cy + innerPt.y, x2: cx + outerPt.x, y2: cy + outerPt.y, stroke: C[seg.l], 'stroke-width': 1.2, 'stroke-opacity': .5, opacity: '0' }, svg);
      animEls.push({ el: line, delay: delay + 200, prop: 'opacity', val: '1' });
      const txt = el('text', { x: cx + lx + nudge, y: cy + ly + 1, 'text-anchor': anchor, 'dominant-baseline': 'central', style: `font:700 11.5px 'Albert Sans';fill:${C[seg.l]};pointer-events:none;`, opacity: '0' }, svg);
      txt.textContent = seg.p + '%';
      animEls.push({ el: txt, delay: delay + 250, prop: 'opacity', val: '1' });

      ang += sl;
    });

    // Center label
    el('text', { x: cx, y: cy - 4, 'text-anchor': 'middle', style: "font:700 12.5px 'Albert Sans';fill:#1A1F2E;pointer-events:none;" }, svg).textContent = task.name.split(' ')[0];
    if (task.name.includes(' '))
      el('text', { x: cx, y: cy + 11, 'text-anchor': 'middle', style: "font:500 10.5px 'Albert Sans';fill:#94969E;pointer-events:none;" }, svg).textContent = task.name.split(' ').slice(1).join(' ');
  });

  // SVG legend at y=430
  const legY = 430;
  groups.forEach((g, gi) => {
    const startX = 20 + gi * 152;
    el('text', { x: startX, y: legY, style: `font:700 11px 'Albert Sans';fill:${g.color};` }, svg).textContent = g.name;
    g.items.forEach((item, ii) => {
      const iy = legY + 15 + ii * 15;
      el('rect', { x: startX, y: iy - 7, width: 9, height: 9, rx: 2, fill: C[item] }, svg);
      el('text', { x: startX + 14, y: iy, 'dominant-baseline': 'central', style: "font:500 10px 'Albert Sans';fill:#6B7280;" }, svg).textContent = item;
    });
  });

  // Trigger animations when scrolled into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animEls.forEach(({ el: e, delay, prop, val }) => {
          e.style.transition = `${prop} .45s ease ${delay}ms, transform .2s ease`;
          e.setAttribute(prop, val);
        });
        observer.unobserve(svg);
      }
    });
  }, { threshold: 0.15 });
  observer.observe(svg);
})();

// ═══════════════ REASONING BAR — themed + animated ═══════════════
(function () {
  const svg = document.getElementById('barReason');
  const models = ['8B', '32B', '235B'];
  const allAvg = [2643.62, 1745.25, 1246.66], wrongAvg = [3214.60, 1956.76, 1761.16];
  const ratios = allAvg.map((v, i) => (wrongAvg[i] / v).toFixed(2));
  const colA = '#1B7B7B', colW = '#C08338';
  const M = { t: 16, r: 16, b: 32, l: 48 }, W = 340 - M.l - M.r, H = 280 - M.t - M.b;
  const yMax = 4000;
  function sy(v) { return M.t + H - v / yMax * H; }

  const defs = el('defs', {}, svg);
  // Gradient for "All" bars
  const gA = el('linearGradient', { id: 'gBarAll', x1: '0', y1: '1', x2: '0', y2: '0' }, defs);
  el('stop', { offset: '0%', 'stop-color': '#145E5E' }, gA);
  el('stop', { offset: '100%', 'stop-color': '#22A0A0' }, gA);
  // Gradient for "Wrong" bars
  const gW = el('linearGradient', { id: 'gBarWrong', x1: '0', y1: '1', x2: '0', y2: '0' }, defs);
  el('stop', { offset: '0%', 'stop-color': '#9A6828' }, gW);
  el('stop', { offset: '100%', 'stop-color': '#D9A860' }, gW);
  // Shadow
  defs.innerHTML += '<filter id="bsBar"><feGaussianBlur in="SourceAlpha" stdDeviation="2"/><feOffset dy="1.5"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .10 0"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>';

  el('rect', { x: M.l, y: M.t, width: W, height: H, fill: '#F5F3EF', rx: 6 }, svg);
  [0, 1000, 2000, 3000, 4000].forEach(v => {
    const y = sy(v);
    el('line', { x1: M.l, x2: M.l + W, y1: y, y2: y, stroke: '#E2DFD8', 'stroke-width': .7 }, svg);
    if (v > 0) el('text', { x: M.l - 6, y: y + 4, 'text-anchor': 'end', style: "font:500 10px 'Albert Sans';fill:#94969E;" }, svg).textContent = v;
  });
  el('line', { x1: M.l, x2: M.l + W, y1: M.t + H, y2: M.t + H, stroke: '#D0CCC5', 'stroke-width': 1 }, svg);
  el('line', { x1: M.l, x2: M.l, y1: M.t, y2: M.t + H, stroke: '#D0CCC5', 'stroke-width': 1 }, svg);
  el('text', { x: -(M.t + H / 2), y: 11, 'text-anchor': 'middle', transform: 'rotate(-90)', style: "font:600 11px 'Albert Sans';fill:#4A5568;" }, svg).textContent = 'Avg. Reasoning Length';

  const groupW = W / 3, bW = 26, bGap = 5;
  models.forEach((m, gi) => {
    const cx = M.l + gi * groupW + groupW / 2;
    // "All" bar
    const ax = cx - bW - bGap / 2, aY = sy(allAvg[gi]), aH = sy(0) - aY;
    const aBar = el('rect', { x: ax, y: sy(0), width: bW, height: 0, rx: 4, fill: 'url(#gBarAll)', filter: 'url(#bsBar)' }, svg);
    aBar.style.transition = `y 0.7s cubic-bezier(.22,.61,.36,1) ${gi * 0.12}s, height 0.7s cubic-bezier(.22,.61,.36,1) ${gi * 0.12}s`;
    requestAnimationFrame(() => { aBar.setAttribute('y', aY); aBar.setAttribute('height', aH); });

    const avt = el('text', { x: ax + bW / 2, y: aY - 4, 'text-anchor': 'middle', style: `font:700 10.5px 'Albert Sans';fill:${colA};opacity:0;`, class: 'bar-anim-label' }, svg);
    avt.textContent = Math.round(allAvg[gi]);
    setTimeout(() => { avt.style.transition = 'opacity .4s'; avt.style.opacity = '1'; }, 500 + gi * 120);

    // "Wrong" bar
    const wx = cx + bGap / 2, wY = sy(wrongAvg[gi]), wH = sy(0) - wY;
    const wBar = el('rect', { x: wx, y: sy(0), width: bW, height: 0, rx: 4, fill: 'url(#gBarWrong)', filter: 'url(#bsBar)' }, svg);
    wBar.style.transition = `y 0.7s cubic-bezier(.22,.61,.36,1) ${gi * 0.12 + 0.08}s, height 0.7s cubic-bezier(.22,.61,.36,1) ${gi * 0.12 + 0.08}s`;
    requestAnimationFrame(() => { wBar.setAttribute('y', wY); wBar.setAttribute('height', wH); });

    const wvt = el('text', { x: wx + bW / 2, y: wY - 4, 'text-anchor': 'middle', style: `font:700 10.5px 'Albert Sans';fill:${colW};opacity:0;` }, svg);
    wvt.textContent = Math.round(wrongAvg[gi]);
    setTimeout(() => { wvt.style.transition = 'opacity .4s'; wvt.style.opacity = '1'; }, 550 + gi * 120);

    // Ratio badge
    const rt = el('text', { x: cx, y: wY - 16, 'text-anchor': 'middle', style: "font:800 11px 'Albert Sans';fill:#0C1B2A;opacity:0;" }, svg);
    rt.textContent = ratios[gi] + '\u00d7';
    setTimeout(() => { rt.style.transition = 'opacity .4s'; rt.style.opacity = '1'; }, 700 + gi * 120);

    el('text', { x: cx, y: M.t + H + 16, 'text-anchor': 'middle', style: "font:700 13px 'Albert Sans';fill:#1A1F2E;" }, svg).textContent = m;

    // Hover interactivity on bars
    [aBar, wBar].forEach((bar, bi) => {
      bar.style.cursor = 'pointer';
      const val = bi === 0 ? allAvg[gi] : wrongAvg[gi];
      const label = bi === 0 ? 'All' : 'Wrong';
      bar.addEventListener('mouseenter', e => { bar.setAttribute('opacity', '.85'); showTip(e, `${m} ${label}: ${Math.round(val)} tokens`); });
      bar.addEventListener('mouseleave', () => { bar.setAttribute('opacity', '1'); hideTip(); });
    });
  });
})();

// ═══════════════ REASONING SCATTER — themed + animated ═══════════════
(function () {
  const svg = document.getElementById('scatterReason');
  const tasks = ['Count', 'Layout', 'Spatial', 'Functional'];
  const modelList = ['8B', '32B', '235B'];
  const allData = { '235B': [1223.40, 1228.71, 1098.91, 1512.49], '32B': [1951.26, 1476.98, 1962.68, 1594.20], '8B': [2472.88, 2549.77, 2382.22, 3432.79] };
  const wrongData = { '235B': [1515.00, 1952.83, 1369.87, 2888.25], '32B': [1505.86, 2112.31, 2479.48, 2211.45], '8B': [2601.73, 4298.37, 2261.14, 3730.55] };
  const ptSizes = { '8B': 5.5, '32B': 8.5, '235B': 12 };
  const palette = { Count: '#1B7B7B', Layout: '#5AABAB', Spatial: '#C08338', Functional: '#0C1B2A' };
  const markerFn = {
    Count: (r) => { let d=''; for(let i=0;i<=20;i++){const a=2*Math.PI*i/20; d+=(i?'L':'M')+`${r*Math.cos(a)},${r*Math.sin(a)}`;} return d+'Z'; },
    Spatial: (r) => `M0,${-r}L${r},0L0,${r}L${-r},0Z`,
    Layout: (r) => `M${-r*.85},${-r*.85}L${r*.85},${-r*.85}L${r*.85},${r*.85}L${-r*.85},${r*.85}Z`,
    Functional: (r) => `M0,${-r}L${r*1.05},${r*.75}L${-r*1.05},${r*.75}Z`,
  };

  const M = { t: 10, r: 16, b: 34, l: 50 }, W = 380 - M.l - M.r, H = 280 - M.t - M.b;
  const xMin = 800, xMax = 3800, yMin = 800, yMax = 4600;
  function sx(v) { return M.l + (v - xMin) / (xMax - xMin) * W; }
  function sy(v) { return M.t + H - (v - yMin) / (yMax - yMin) * H; }

  const defs = el('defs', {}, svg);
  defs.innerHTML = '<filter id="bsSc2"><feGaussianBlur in="SourceAlpha" stdDeviation="1.2"/><feOffset dy="0.8"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .12 0"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>';

  el('rect', { x: M.l, y: M.t, width: W, height: H, fill: '#F5F3EF', rx: 6 }, svg);
  [1000, 1500, 2000, 2500, 3000, 3500].forEach(v => {
    const x = sx(v); if (x > M.l && x < M.l + W) {
      el('line', { x1: x, x2: x, y1: M.t, y2: M.t + H, stroke: '#E2DFD8', 'stroke-width': .7 }, svg);
      el('text', { x, y: M.t + H + 14, 'text-anchor': 'middle', style: "font:500 10px 'Albert Sans';fill:#94969E;" }, svg).textContent = v;
    }
  });
  [1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500].forEach(v => {
    const y = sy(v); if (y > M.t && y < M.t + H) {
      el('line', { x1: M.l, x2: M.l + W, y1: y, y2: y, stroke: '#E2DFD8', 'stroke-width': .7 }, svg);
      el('text', { x: M.l - 6, y: y + 4, 'text-anchor': 'end', style: "font:500 10px 'Albert Sans';fill:#94969E;" }, svg).textContent = v;
    }
  });
  el('line', { x1: M.l, x2: M.l + W, y1: M.t + H, y2: M.t + H, stroke: '#D0CCC5', 'stroke-width': 1 }, svg);
  el('line', { x1: M.l, x2: M.l, y1: M.t, y2: M.t + H, stroke: '#D0CCC5', 'stroke-width': 1 }, svg);
  el('text', { x: M.l + W / 2, y: M.t + H + 28, 'text-anchor': 'middle', style: "font:600 11px 'Albert Sans';fill:#4A5568;" }, svg).textContent = 'All Avg. Reasoning Length';
  el('text', { x: -(M.t + H / 2), y: 10, 'text-anchor': 'middle', transform: 'rotate(-90)', style: "font:600 11px 'Albert Sans';fill:#4A5568;" }, svg).textContent = 'Wrong Avg. Reasoning Length';

  // Diagonal y=x reference
  const dLineStart = Math.max(xMin, yMin), dLineEnd = Math.min(xMax, yMax);
  el('line', { x1: sx(dLineStart), x2: sx(dLineEnd), y1: sy(dLineStart), y2: sy(dLineEnd), stroke: '#C8C4BC', 'stroke-width': 1, 'stroke-dasharray': '5,4' }, svg);
  // Label on diagonal
  el('text', { x: sx(3200), y: sy(3200) - 8, 'text-anchor': 'middle', transform: `rotate(-38,${sx(3200)},${sy(3200) - 8})`, style: "font:500 9px 'Albert Sans';fill:#B0ADA6;" }, svg).textContent = 'y = x';

  // Animated data points
  let ptIdx = 0;
  tasks.forEach((task, ti) => {
    modelList.forEach(m => {
      const px = sx(allData[m][ti]), py = sy(wrongData[m][ti]), r = ptSizes[m];
      const marker = el('path', {
        d: markerFn[task](r), transform: `translate(${px},${py})`,
        fill: palette[task], stroke: 'white', 'stroke-width': 1.5,
        filter: 'url(#bsSc2)', style: 'cursor:pointer;opacity:0;',
      }, svg);
      // Staggered fade-in + scale
      const delay = ptIdx * 40;
      marker.style.transition = `opacity .4s ease ${delay}ms, transform .4s cubic-bezier(.22,.61,.36,1) ${delay}ms`;
      requestAnimationFrame(() => { marker.style.opacity = '1'; });

      marker.addEventListener('mouseenter', e => {
        marker.setAttribute('transform', `translate(${px},${py}) scale(1.3)`);
        showTip(e, `${m} \u2014 ${task}: all=${Math.round(allData[m][ti])}, wrong=${Math.round(wrongData[m][ti])}`);
      });
      marker.addEventListener('mouseleave', () => {
        marker.setAttribute('transform', `translate(${px},${py})`);
        hideTip();
      });
      ptIdx++;
    });
  });

  // Legend — built dynamically with theme colors
  const leg = document.getElementById('scatterLegend2');
  if (leg) {
    const svgNS = 'http://www.w3.org/2000/svg';
    tasks.forEach(t => {
      const s = document.createElement('span');
      s.style.cssText = 'display:flex;align-items:center;gap:4px;font-size:11px;font-weight:600;color:#4A5568;';
      // Use inline SVG for shape matching
      const icon = document.createElementNS(svgNS, 'svg');
      icon.setAttribute('width', '12'); icon.setAttribute('height', '12'); icon.setAttribute('viewBox', '-7 -7 14 14');
      const p = document.createElementNS(svgNS, 'path');
      p.setAttribute('d', markerFn[t](5.5)); p.setAttribute('fill', palette[t]);
      icon.appendChild(p);
      s.appendChild(icon);
      s.appendChild(document.createTextNode(t));
      leg.appendChild(s);
    });
    const sz = document.createElement('span');
    sz.style.cssText = 'font-size:10px;color:#94969E;margin-left:4px;';
    sz.innerHTML = '| <span style="display:inline-block;width:5px;height:5px;background:#B0ADA6;border-radius:50%;vertical-align:middle;"></span> 8B <span style="display:inline-block;width:8px;height:8px;background:#B0ADA6;border-radius:50%;vertical-align:middle;"></span> 32B <span style="display:inline-block;width:12px;height:12px;background:#B0ADA6;border-radius:50%;vertical-align:middle;"></span> 235B';
    leg.appendChild(sz);
  }
})();

// ═══════════════ SCATTER — reasoning vs accuracy, themed + animated ═══════════════
(function () {
  const svg = document.getElementById('scatter');
  const tasks = ['Count', 'Spatial', 'Layout', 'Functional'];
  const modelNames = ['8B', '32B', '235B'];
  const reasoning = { '8B': [2472.88, 2549.77, 2382.22, 3432.79], '32B': [1951.26, 1476.98, 1962.68, 1594.20], '235B': [1223.40, 1228.71, 1098.91, 1512.49] };
  const accuracy = { '8B': [42.6, 58.3, 70.7, 48.3], '32B': [49.5, 64.0, 75.7, 59.7], '235B': [53.8, 62.4, 74.0, 60.9] };
  const dotR = { '8B': 4.5, '32B': 7.5, '235B': 11 };
  const palette = { Count: '#1B7B7B', Spatial: '#C08338', Layout: '#5AABAB', Functional: '#0C1B2A' };
  const markerFn = {
    Count: (r) => { let d=''; for(let i=0;i<=20;i++){const a=2*Math.PI*i/20; d+=(i?'L':'M')+`${r*Math.cos(a)},${r*Math.sin(a)}`;} return d+'Z'; },
    Spatial: (r) => `M0,${-r}L${r},0L0,${r}L${-r},0Z`,
    Layout: (r) => `M${-r*.85},${-r*.85}L${r*.85},${-r*.85}L${r*.85},${r*.85}L${-r*.85},${r*.85}Z`,
    Functional: (r) => `M0,${-r}L${r*1.05},${r*.75}L${-r*1.05},${r*.75}Z`,
  };
  const M = { t: 10, r: 16, b: 44, l: 50 }, W = 540 - M.l - M.r, H = 300 - M.t - M.b;
  const xMin = 900, xMax = 3650, yMin = 38, yMax = 80;
  function sx(v) { return M.l + (v - xMin) / (xMax - xMin) * W; }
  function sy(v) { return M.t + H - (v - yMin) / (yMax - yMin) * H; }

  const defs = el('defs', {}, svg);
  defs.innerHTML = '<filter id="scatterShadow"><feGaussianBlur in="SourceAlpha" stdDeviation="1.2"/><feOffset dy="0.8"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .12 0"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>';

  el('rect', { x: M.l, y: M.t, width: W, height: H, fill: '#F5F3EF', rx: 6 }, svg);
  [40, 50, 60, 70, 80].forEach(v => {
    const y = sy(v);
    el('line', { x1: M.l, x2: M.l + W, y1: y, y2: y, stroke: '#E2DFD8', 'stroke-width': .7 }, svg);
    el('text', { x: M.l - 8, y: y + 3.5, 'text-anchor': 'end', style: "font:500 10px 'Albert Sans';fill:#94969E;" }, svg).textContent = v;
  });
  [1000, 1500, 2000, 2500, 3000, 3500].forEach(v => {
    const x = sx(v);
    el('line', { x1: x, x2: x, y1: M.t, y2: M.t + H, stroke: '#E2DFD8', 'stroke-width': .7 }, svg);
    el('text', { x, y: M.t + H + 14, 'text-anchor': 'middle', style: "font:500 10px 'Albert Sans';fill:#94969E;" }, svg).textContent = (v / 1000) + 'k';
  });
  el('line', { x1: M.l, x2: M.l + W, y1: M.t + H, y2: M.t + H, stroke: '#D0CCC5', 'stroke-width': 1 }, svg);
  el('line', { x1: M.l, x2: M.l, y1: M.t, y2: M.t + H, stroke: '#D0CCC5', 'stroke-width': 1 }, svg);
  el('text', { x: M.l + W / 2, y: M.t + H + 36, 'text-anchor': 'middle', style: "font:600 12px 'Albert Sans';fill:#4A5568;" }, svg).textContent = 'Avg. Reasoning Length';
  el('text', { x: -(M.t + H / 2), y: 14, 'text-anchor': 'middle', transform: 'rotate(-90)', style: "font:600 12px 'Albert Sans';fill:#4A5568;" }, svg).textContent = 'Accuracy (%)';

  // Trend lines — animated dash
  tasks.forEach((task, ti) => {
    const pts = modelNames.map(m => ({ x: sx(reasoning[m][ti]), y: sy(accuracy[m][ti]), rx: reasoning[m][ti] })).sort((a, b) => a.rx - b.rx);
    if (pts.length === 3) {
      const [p0, p1, p2] = pts;
      const t = .38;
      const d = `M${p0.x},${p0.y} C${p0.x + (p1.x - p0.x) * t},${p0.y + (p1.y - p0.y) * t * 1.5} ${p1.x - (p2.x - p0.x) * t * .3},${p1.y - (p2.y - p0.y) * t * .3} ${p1.x},${p1.y} C${p1.x + (p2.x - p0.x) * t * .3},${p1.y + (p2.y - p0.y) * t * .3} ${p2.x - (p2.x - p1.x) * t},${p2.y - (p2.y - p1.y) * t * 1.5} ${p2.x},${p2.y}`;
      const line = el('path', { d, fill: 'none', stroke: palette[task], 'stroke-width': 2.2, 'stroke-opacity': .45, 'stroke-linecap': 'round', 'stroke-dasharray': '600', 'stroke-dashoffset': '600' }, svg);
      line.style.transition = `stroke-dashoffset 1.2s cubic-bezier(.22,.61,.36,1) ${ti * 0.15}s`;
      requestAnimationFrame(() => { line.setAttribute('stroke-dashoffset', '0'); });
    }
  });

  // Shaped data points — animated fade + scale
  let ptIdx = 0;
  tasks.forEach((task, ti) => {
    modelNames.forEach(m => {
      const px = sx(reasoning[m][ti]), py = sy(accuracy[m][ti]), r = dotR[m];
      const marker = el('path', {
        d: markerFn[task](r), transform: `translate(${px},${py})`,
        fill: palette[task], stroke: 'white', 'stroke-width': 1.5,
        filter: 'url(#scatterShadow)', style: 'cursor:pointer;opacity:0;'
      }, svg);
      const delay = 300 + ptIdx * 35;
      marker.style.transition = `opacity .4s ease ${delay}ms`;
      requestAnimationFrame(() => { marker.style.opacity = '1'; });
      marker.addEventListener('mouseenter', e => {
        marker.setAttribute('transform', `translate(${px},${py}) scale(1.25)`);
        showTip(e, `${m} \u2014 ${task}: ${accuracy[m][ti]}% (len: ${Math.round(reasoning[m][ti])})`);
      });
      marker.addEventListener('mouseleave', () => {
        marker.setAttribute('transform', `translate(${px},${py})`);
        hideTip();
      });
      ptIdx++;
    });
  });

  // Model labels
  modelNames.forEach(m => {
    const xs = tasks.map((_, ti) => reasoning[m][ti]);
    const ys = tasks.map((_, ti) => accuracy[m][ti]);
    const cx = xs.reduce((a, b) => a + b, 0) / xs.length;
    const cy = Math.max(...ys);
    const label = el('text', { x: sx(cx), y: sy(cy) - 15, 'text-anchor': 'middle', style: "font:700 13px 'Albert Sans';fill:#94969E;opacity:0;" }, svg);
    label.textContent = m;
    label.style.transition = 'opacity .5s ease 0.8s';
    requestAnimationFrame(() => { label.style.opacity = '1'; });
  });
})();
