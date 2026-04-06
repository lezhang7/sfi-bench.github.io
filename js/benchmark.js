// ═══════════════ UNIFIED BENCHMARK + DEMOS ═══════════════
(function () {
  const tasks = [
    {
      name: 'Counting', fullName: 'Global & Conditional Counting',
      tag: 'spatial', icon: 'assets/images/task1_hd.png',
      desc: 'Compositional counting with attribute constraints and set-based operations\u2014intersection, union, and group-level aggregation. This shifts counting from perceptual detection to structured logical inference.',
      demos: [
        { video: 'assets/videos/42899725.mp4', q: 'How many of the metal bathroom fixtures are chrome-colored?', opts: { A: '6', B: '3', C: '5', D: '4' }, ans: 'A' },
        { video: 'assets/videos/47204578.mp4', q: 'What is the largest number of cushions that are the same color?', opts: { A: '2', B: '4', C: '5', D: '3' }, ans: 'B' },
        { video: 'assets/videos/47430034.mp4', q: 'How many plush teddy bears are sitting inside the hanging chair?', opts: { A: '2', B: '3', C: '4', D: '1' }, ans: 'A' },
        { video: 'assets/videos/42446529.mp4', q: 'How many of the bedside tables are dark brown or black in color?', opts: { A: '2', B: '1', C: '4', D: '3' }, ans: 'A' },
      ]
    },
    {
      name: 'Path Reasoning', fullName: 'Cross-View Multi-hop Path Reasoning',
      tag: 'spatial', icon: 'assets/images/task2_hd.png',
      desc: 'Integrating spatial evidence across time and viewpoints to infer relationships not visible in any single frame. Requires constructing coherent multi-hop spatial memory.',
      demos: [
        { video: 'assets/videos/45b0dac5e3.mp4', q: 'Find the wall cabinet mounted to the right of the mirror. On the countertop below, there is a charging base. What is next to that base?', opts: { A: 'A tube of toothpaste', B: 'A manual toothbrush', C: 'An electric toothbrush', D: 'Contact lens solution' }, ans: 'C' },
        { video: 'assets/videos/42897564.mp4', q: 'What is mounted on the wall beneath the large window opposite the room\u2019s main entrance?', opts: { A: 'A dining chair', B: 'The radiator', C: 'The vertical blinds', D: 'The black shelf' }, ans: 'B' },
        { video: 'assets/videos/42445981.mp4', q: 'What is the small decorative item on the corner table between the media console and the wall?', opts: { A: 'The large Christmas tree', B: 'The small artificial tree', C: 'The black lamp', D: 'The snowman figure' }, ans: 'B' },
        { video: 'assets/videos/47333436.mp4', q: 'Find the large audio component next to the TV stand. What smaller object is placed on top of it?', opts: { A: 'The large black speaker', B: 'The television', C: 'The black dumbbell', D: 'The small black speaker' }, ans: 'D' },
      ]
    },
    {
      name: 'Layout', fullName: 'Layout Inference',
      tag: 'spatial', icon: 'assets/images/task3_hd.png',
      desc: 'Integrating distributed cues into a coherent global scene layout and reasoning about occlusion relationships. Referenced objects often never appear together in any single frame.',
      demos: [
        { video: 'assets/videos/42897692.mp4', q: 'What piece of furniture prevents direct access to the radiator from the rest of the room?', opts: { A: 'The white radiator', B: 'The wooden bed', C: 'The tall bookshelf', D: 'The white crib with vertical slats' }, ans: 'D' },
        { video: 'assets/videos/41159525.mp4', q: 'To reach the brown wooden door from the stove, which appliance must be bypassed?', opts: { A: 'The range cooker', B: 'The black refrigerator', C: 'The wine cooler', D: 'The extractor hood' }, ans: 'B' },
        { video: 'assets/videos/42899729.mp4', q: 'What object should be removed to enable a direct straight path from the tower fan to the radiator?', opts: { A: 'The wardrobe', B: 'The bed', C: 'The nightstand', D: 'The floor mat' }, ans: 'B' },
        { video: 'assets/videos/42899698.mp4', q: 'Which object is positioned in the narrow space between the end of the bathtub and the shower enclosure?', opts: { A: 'The shower head', B: 'The wall radiator', C: 'The bathtub faucet', D: 'The chrome towel rack' }, ans: 'D' },
      ]
    },
    {
      name: 'Association', fullName: 'Functional Association',
      tag: 'functional', icon: 'assets/images/task4_hd.png',
      desc: 'Inferring affordance relationships between objects through cues such as brand, design, or spatial context (e.g., associating a remote with the correct television).',
      demos: [
        { video: 'assets/videos/42899685.mp4', q: 'Where is the object operated by the silver device on the table in the middle of the room?', opts: { A: 'Right side of console table', B: 'Center of console table', C: 'Next to the monitor', D: 'Underneath the table' }, ans: 'A' },
        { video: 'assets/videos/286b55a2bf.mp4', q: 'How many electronic devices correspond to the purple liquid next to the sink in terms of functionality?', opts: { A: '2', B: '4', C: '3', D: '1' }, ans: 'A' },
        { video: 'assets/videos/47332918.mp4', q: 'What object is being functionally protected by the green fabric item with a white and yellow daisy pattern?', opts: { A: 'The dining table', B: 'The bed', C: 'The cabinet', D: 'The television' }, ans: 'A' },
      ]
    },
    {
      name: 'Planning', fullName: 'Operation Planning',
      tag: 'functional', icon: 'assets/images/task5_hd.png',
      desc: 'Searching for device-specific information (e.g., manuals), interpreting retrieved knowledge, and assembling multi-step action plans grounded in the video.',
      demos: [
        { video: 'assets/videos/42444976.mp4', q: 'I started the wrong wash cycle. How do I cancel the current program on the washing machine?', opts: { A: 'Rotate knob to \u201cOff\u201d', B: 'Hold \u201cStart/Pause\u201d 3 sec', C: 'Press \u201cOn/Off\u201d button', D: 'Hold \u201cTemp\u201d + \u201cSpin\u201d 5 sec' }, ans: 'B' },
        { video: 'assets/videos/6115eddb86.mp4', q: 'How do I reset the programmed coffee amounts back to factory settings?', opts: { A: 'Hold POWER + MILK FOAM 5s', B: 'Hold 1 CUP + 2 CUP 5s', C: 'Hold POWER 10s to reset', D: 'Unplug, hold 1 CUP, replug' }, ans: 'A' },
        { video: 'assets/videos/f9f95681fd.mp4', q: 'How do I make a cappuccino using the coffee machine on the counter?', opts: { A: 'Fill milk carafe to MAX, press CAPP', B: 'Connect suction hose, place cup, press cappuccino', C: 'Select ESPRESSO, add milk manually', D: 'Press MENU, navigate to BEVERAGE' }, ans: 'B' },
        { video: 'assets/videos/44358451.mp4', q: 'I want to wash a very heavily soiled load of cottons. How should I set the machine?', opts: { A: 'Select Cottons 60\u00b0C, normal spin', B: 'Select Cottons 90\u00b0C with Prewash, high spin', C: 'Select Cottons 40\u00b0C with Extra Rinse', D: 'Select Quick Wash 60\u00b0C, max spin' }, ans: 'B' },
      ]
    },
    {
      name: 'Troubleshoot', fullName: 'Causal Troubleshooting',
      tag: 'functional', icon: 'assets/images/task6_hd.png',
      desc: 'Diagnosing problems by combining scene understanding with external knowledge via web search. Requires hypothesizing failure modes and generating grounded solutions.',
      demos: [
        { video: 'assets/videos/42446151.mp4', q: 'No sound from the karaoke machine microphone. What are the possible causes?', opts: { A: 'MIC jack + MUSIC VOL + MASTER', B: 'MIC jack + MIC VOL or MASTER', C: 'MIC jack + MIC VOL + MASTER', D: 'MIC jack + MIC VOL + A.V.C.' }, ans: 'C' },
        { video: 'assets/videos/42446541.mp4', q: 'Paper keeps jamming on double-sided prints. Likely cause and fix?', opts: { A: 'Wrong density \u2014 increase slider', B: 'Curled paper \u2014 fan and reload', C: 'Too many sheets \u2014 reduce load', D: 'Debris \u2014 wipe rollers' }, ans: 'C' },
        { video: 'assets/videos/41069025.mp4', q: 'Sparks or blue flashes inside the microwave while running. What\u2019s causing this?', opts: { A: 'Arcing from metal rack touching walls', B: 'Arcing from foil or metallic trim on dish', C: 'Arcing from a damaged waveguide cover', D: 'Arcing from metallic paint or gold rim on dish' }, ans: 'D' },
        { video: 'assets/videos/a980334473.mp4', q: 'The printer is pulling multiple sheets at once. What\u2019s causing this and how to fix?', opts: { A: 'Dirty pickup roller \u2014 clean it', B: 'Static electricity \u2014 fan the stack', C: 'Paper condition \u2014 reduce sheets in tray', D: 'Sensor failure \u2014 reset printer' }, ans: 'C' },
      ]
    },
  ];

  let activeTask = 0, activeDemo = 0;
  const tabsEl = document.getElementById('benchTabs');
  const stageEl = document.getElementById('benchStage');
  const dotsEl = document.getElementById('benchDots');

  // Build tabs
  tasks.forEach((t, i) => {
    const tab = document.createElement('button');
    tab.className = 'bench-tab' + (i === 0 ? ' active' : '');
    tab.innerHTML = `<img src="${t.icon}" alt=""><span>${t.name}</span>`;
    tab.addEventListener('click', () => switchTask(i));
    tabsEl.appendChild(tab);
  });

  function switchTask(idx) {
    activeTask = idx; activeDemo = 0;
    tabsEl.querySelectorAll('.bench-tab').forEach((t, i) => t.classList.toggle('active', i === idx));
    render();
  }

  function switchDemo(idx) {
    activeDemo = idx;
    render();
  }

  function render() {
    const t = tasks[activeTask];
    const d = t.demos[activeDemo];
    const isSp = t.tag === 'spatial';
    const tagCls = isSp ? 'tag-sp' : 'tag-fn';
    const badgeCls = isSp ? 'demo-badge--sp' : 'demo-badge--fn';
    const infoBg = isSp
      ? 'background:linear-gradient(135deg,rgba(27,123,123,.04),rgba(27,123,123,.01));'
      : 'background:linear-gradient(135deg,rgba(192,131,56,.04),rgba(192,131,56,.01));';

    let optsHTML = '';
    for (const k of ['A', 'B', 'C', 'D']) {
      const correct = k === d.ans ? ' correct' : '';
      optsHTML += `<li class="${correct}"><span class="opt-letter">${k}</span>${d.opts[k]}</li>`;
    }

    stageEl.style.opacity = '0';
    stageEl.style.transform = 'translateY(8px)';
    setTimeout(() => {
      stageEl.innerHTML = `
        <div class="bench-card">
          <div class="bench-info" style="${infoBg}">
            <img class="bench-icon" src="${t.icon}" alt="">
            <span class="task-tag ${tagCls}">${isSp ? 'Spatial' : 'Functional'}</span>
            <h3 class="bench-task-name">${t.fullName}</h3>
            <p class="bench-task-desc">${t.desc}</p>
          </div>
          <div class="bench-demo">
            <div class="bench-video">
              <span class="demo-badge ${badgeCls}">${t.name}</span>
              <video controls muted preload="metadata" playsinline><source src="${d.video}" type="video/mp4"></video>
            </div>
            <div class="bench-qa">
              <div class="demo-question">${d.q}</div>
              <ul class="demo-options">${optsHTML}</ul>
            </div>
          </div>
        </div>`;
      stageEl.style.opacity = '1';
      stageEl.style.transform = 'translateY(0)';
    }, 180);

    // Dots
    dotsEl.innerHTML = '';
    if (t.demos.length > 1) {
      t.demos.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'bench-dot' + (i === activeDemo ? ' active' : '');
        dot.addEventListener('click', () => switchDemo(i));
        dotsEl.appendChild(dot);
      });
      dotsEl.style.display = 'flex';
    } else {
      dotsEl.style.display = 'none';
    }
  }

  render();
})();
