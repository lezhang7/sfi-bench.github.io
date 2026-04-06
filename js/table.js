// ═══════════════ RESULTS TABLE ═══════════════
(function () {
  const sections = [
    {
      title: 'Proprietary Models (API)', rows: [
        ['\u2020Gemini-3.1-Pro \u2021', 1, 73.8, [59.1, 'a'], [83.4, 'a'], [86.8, 'a'], [73.2], [67.9], [72.1, 'a']],
        ['\u2020GPT-5.4-High \u2021', 2, 72.1, [58.4], [82.8], [81.1], [76.2, 'a'], [65.5], [68.8]],
        ['\u2020Gemini-3.1-Flash-Lite \u2021', 3, 69.4, [55.0], [78.3], [81.3], [58.3], [77.7, 'a'], [66.3]],
        ['\u2020GPT-5 \u2021', 4, 69.4, [58.4], [83.0], [81.5], [75.3], [60.2], [58.1]],
        ['\u2020GPT-5.4 \u2021', 5, 67.3, [54.5], [79.6], [83.0], [66.4], [63.4], [57.0]],
        ['\u2020Gemini-2.5 Pro \u2021', 6, 67.1, [54.4], [80.7], [83.8], [65.5], [60.2], [58.1]],
        ['\u2020o4-mini \u2021', 7, 66.8, [51.0], [73.7], [82.4], [68.5], [65.0], [60.4]],
        ['\u2020Qwen3-VL-Plus', 8, 58.1, [51.3], [64.3], [73.6], [61.3], [50.4], [47.7]],
        ['\u2020Gemini-2.5 Flash \u2021', 9, 55.3, [41.5], [66.8], [73.3], [52.1], [50.4], [47.7]],
      ], sep: true
    },
    {
      title: 'Open-source Instruct Models', rows: [
        ['\u2020Qwen3-VL-235B-A22B-Instruct', 3, 60.7, [52.3], [66.6], [78.8, 'o'], [55.5], [53.0], [58.1]],
        ['\u2020Qwen3-VL-32B-Instruct', 4, 59.0, [50.0], [64.3], [76.7], [55.5], [53.1], [54.6]],
        ['\u2020Qwen3-VL-30B-A3B-Instruct', 9, 52.7, [42.1], [57.6], [75.5], [46.2], [49.6], [45.3]],
        ['\u2020Qwen3-VL-8B-Instruct', 8, 53.3, [41.5], [56.3], [73.1], [45.4], [54.9], [48.8]],
        ['InternVL3.5-30B-A3B', 5, 55.9, [48.5], [59.5], [74.0], [50.0], [51.3], [52.3]],
        ['InternVL3.5-14B', 6, 55.3, [44.6], [63.6], [72.1], [44.5], [52.2], [54.7]],
        ['InternVL3.5-8B', 7, 53.9, [44.4], [57.9], [69.0], [46.6], [53.1], [52.3]],
        ['LLaVA-OneVision-7B', 11, 50.4, [40.5], [57.3], [60.2], [44.5], [49.9], [50.3]],
        ['LLaVA-OneVision-72B', 2, 61.3, [52.8], [64.2], [68.6], [60.1, 'o'], [58.4, 'o'], [61.0, 'o']],
        ['LLaVA-Video-7B', 10, 50.9, [55.4], [61.1], [67.9], [49.2], [38.9], [32.6]],
        ['LLaVA-Video-72B', 1, 64.9, [57.9, 'o'], [70.3, 'o'], [75.2], [56.7], [58.4], [50.9]],
      ], sep: true
    },
    {
      title: 'Open-source Reasoning Models', rows: [
        ['\u2020Qwen3-VL-235B-A22B-Thinking', 1, 57.9, [53.8], [62.4], [74.0], [60.9], [51.3], [45.3]],
        ['\u2020Qwen3-VL-32B-Thinking', 2, 55.9, [49.5], [64.0], [75.7], [59.7], [42.5], [44.2]],
        ['\u2020Qwen3-VL-30B-A3B-Thinking', 3, 52.1, [41.5], [59.9], [75.0], [46.6], [39.8], [50.0]],
        ['\u2020Qwen3-VL-8B-Thinking', 4, 51.4, [42.6], [58.3], [70.7], [48.3], [40.7], [47.7]],
        ['\u2020GLM-4.5V-Thinking', 5, 45.1, [28.7], [53.5], [65.5], [41.2], [42.5], [39.5]],
      ], sep: false
    },
  ];
  const tb = document.getElementById('tableBody');
  sections.forEach((sec, si) => {
    const hr = document.createElement('tr'); hr.className = 'sec-hdr';
    hr.innerHTML = `<td colspan="9">${sec.title}</td>`;
    tb.appendChild(hr);
    sec.rows.forEach((r, ri) => {
      const tr = document.createElement('tr');
      if (sec.sep && ri === sec.rows.length - 1) tr.className = 'sep';
      const name = r[0].replace(/\u2020/g, '<sup>&dagger;</sup>').replace(/\u2021/g, '<sup>&Dagger;</sup>');
      let html = `<td style="font-weight:500">${name}</td><td>${r[1]}</td>`;
      const avgCls = (si === 0 && ri === 0) ? 'best-a' : '';
      html += `<td class="${avgCls}">${r[2]}</td>`;
      for (let c = 3; c <= 8; c++) {
        const cell = r[c];
        const val = Array.isArray(cell) ? cell[0] : cell;
        const flag = Array.isArray(cell) ? cell[1] : '';
        const cls = flag === 'a' ? 'best-a' : flag === 'o' ? 'best-o' : '';
        html += `<td class="${cls}">${val}</td>`;
      }
      tr.innerHTML = html;
      tb.appendChild(tr);
    });
  });
})();
