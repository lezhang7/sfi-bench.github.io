// ═══════════════ SCROLL REVEAL ═══════════════
document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    reveals.forEach(el => obs.observe(el));
  }

  // ═══════════════ STAT COUNT-UP ═══════════════
  const statNums = document.querySelectorAll('.stat-num');
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const raw = el.textContent.replace(/,/g, '');
      const target = parseInt(raw);
      if (isNaN(target)) return;
      countObs.unobserve(el);
      const duration = 1200;
      const start = performance.now();
      const fmt = (n) => n.toLocaleString();
      function tick(now) {
        const t = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - t, 3); // ease-out cubic
        el.textContent = fmt(Math.round(target * ease));
        if (t < 1) requestAnimationFrame(tick);
      }
      el.textContent = '0';
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => countObs.observe(el));

  // ═══════════════ CHART ENTRANCE ANIMATIONS ═══════════════
  const chartContainers = document.querySelectorAll('svg[id]');
  const chartObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('chart-animate');
        chartObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  chartContainers.forEach(el => chartObs.observe(el));

  // ═══════════════ CITATION NAV — click to copy ═══════════════
  const navCite = document.getElementById('navCite');
  if (navCite) {
    navCite.addEventListener('click', function (e) {
      e.preventDefault();
      const bib = document.getElementById('bibtext');
      if (bib) {
        navigator.clipboard.writeText(bib.textContent).then(() => {
          const orig = navCite.textContent;
          navCite.textContent = 'Copied!';
          navCite.style.color = '#fff';
          setTimeout(() => { navCite.textContent = orig; navCite.style.color = ''; }, 1800);
        });
        document.getElementById('citation').scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const sections = [...navLinks].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  function updateNav() {
    let current = '';
    sections.forEach(s => { if (s.getBoundingClientRect().top < 200) current = s.id; });
    navLinks.forEach(a => {
      const isActive = a.getAttribute('href') === '#' + current;
      a.style.color = isActive ? '#fff' : '';
    });
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
});

// ═══════════════ COPY BIB ═══════════════
function copyBib() {
  const t = document.getElementById('bibtext').textContent;
  navigator.clipboard.writeText(t).then(() => {
    const b = document.querySelector('.copy-btn');
    b.textContent = 'Copied!';
    setTimeout(() => b.textContent = 'Copy', 2000);
  });
}
