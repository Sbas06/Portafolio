/* =====================================================================
   PORTAFOLIO SBAS — interactions
   1) scroll parallax for the seascape layers
   2) section reveal-on-enter
   3) project sheet that slides up from the bottom
   ===================================================================== */
(function () {
  'use strict';

  /* ---------- 1. PARALLAX SEASCAPE ---------- */
  const layers = Array.from(document.querySelectorAll('.seascape .layer[data-speed]'));
  let ticking = false;

  function depth() {
    const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--plx'));
    return isNaN(v) ? 1 : v;
  }

  function applyParallax() {
    const y = window.scrollY || window.pageYOffset;
    const d = depth();
    for (const el of layers) {
      const sp = parseFloat(el.getAttribute('data-speed')) || 0;
      el.style.transform = 'translate3d(0,' + (y * sp * d).toFixed(1) + 'px,0)';
    }
    ticking = false;
  }

  function onScroll() {
    if (!ticking) { window.requestAnimationFrame(applyParallax); ticking = true; }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  applyParallax();

  /* ---------- 2. TOPNAV SCROLL-SPY + MOBILE TOGGLE ---------- */
  var topnavLinks = Array.from(document.querySelectorAll('.topnav nav a[href^="#"]'));
  var navToggle = document.querySelector('.nav-toggle');
  var topnavMenu = document.getElementById('topnav-menu');

  function updateTopNav() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var best = null, bestRatio = -1;
    for (var i = 0; i < topnavLinks.length; i++) {
      var href = topnavLinks[i].getAttribute('href');
      var id = href ? href.slice(1) : '';
      var sec = id ? document.getElementById(id) : null;
      if (!sec) continue;
      var r = sec.getBoundingClientRect();
      var vis = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
      var ratio = vis / Math.max(r.height, 1);
      if (ratio > bestRatio) { bestRatio = ratio; best = topnavLinks[i]; }
    }
    for (var j = 0; j < topnavLinks.length; j++) {
      topnavLinks[j].classList.toggle('active', topnavLinks[j] === best);
    }
  }

  window.addEventListener('scroll', updateTopNav, { passive: true });
  window.addEventListener('resize', updateTopNav, { passive: true });
  updateTopNav();

  if (navToggle && topnavMenu) {
    navToggle.addEventListener('click', function() {
      topnavMenu.classList.toggle('open');
    });
    topnavMenu.addEventListener('click', function(e) {
      if (e.target && e.target.tagName === 'A') {
        topnavMenu.classList.remove('open');
      }
    });
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !topnavMenu.contains(e.target)) {
        topnavMenu.classList.remove('open');
      }
    });
  }

  /* ---------- 3. SECTION TRANSITIONS + NAV DOTS ---------- */
  var sections = Array.from(document.querySelectorAll('section.screen'));
  var navDots = Array.from(document.querySelectorAll('.snav-dot[data-target]'));

  function updateNavDots() {
    if (!navDots.length) return;
    var vh2 = window.innerHeight || document.documentElement.clientHeight;
    var bestDot = null, bestDotRatio = -1;
    for (var di = 0; di < navDots.length; di++) {
      var dot = navDots[di];
      var sec = document.getElementById(dot.getAttribute('data-target'));
      if (!sec) continue;
      var r = sec.getBoundingClientRect();
      var vis = Math.max(0, Math.min(r.bottom, vh2) - Math.max(r.top, 0));
      var ratio = vis / Math.max(r.height, 1);
      if (ratio > bestDotRatio) { bestDotRatio = ratio; bestDot = dot; }
    }
    for (var dj = 0; dj < navDots.length; dj++) navDots[dj].classList.toggle('active', navDots[dj] === bestDot);
  }

  if (typeof IntersectionObserver !== 'undefined') {
    const io = new IntersectionObserver(function(entries) {
      for (const e of entries) {
        e.target.classList.toggle('in', e.isIntersecting);
      }
      updateNavDots();
    }, { threshold: 0.15 });
    sections.forEach(function(s) { io.observe(s); });
  } else {
    sections.forEach(function(s) { s.classList.add('in'); });
  }

  // First section visible immediately (no scroll needed)
  if (sections[0]) sections[0].classList.add('in');

  window.addEventListener('scroll', updateNavDots, { passive: true });
  window.addEventListener('resize', updateNavDots, { passive: true });
  updateNavDots();

  /* ---------- 3. PROJECT SHEET ---------- */

  // Read project data from the SSR-injected script tag if present
  const dataEl = document.getElementById('portfolio-data');
  let PROJECTS = {};
  if (dataEl) {
    try {
      const raw = JSON.parse(dataEl.textContent || '{}');
      if (raw.projects) {
        PROJECTS = Object.fromEntries(raw.projects.map(function(p) { return [p.id, p]; }));
      }
    } catch (e) { /* ignore */ }
  }

  // Fallback: hardcoded defaults (used when portfolio.js is served standalone)
  if (!Object.keys(PROJECTS).length) {
    PROJECTS = {
      shopify: {
        no: '01', year: '2024 — NOW', kicker: 'E-COMMERCE · SHOPIFY',
        title: 'SHOPIFY THEME LAB', meta: 'Web Developer @ ROP St DigitALL',
        ph: 'STOREFRONT\nCAPTURE',
        lede: 'Desarrollo de temas Shopify a medida: plantillas Liquid, secciones reutilizables y un código limpio y escalable pensado para que equipos no técnicos editen sin romper nada.',
        highlights: [
          ['LIQUID', 'Arquitectura de secciones modulares y bloques reutilizables.'],
          ['DX', 'Código documentado y escalable para handoff a clientes.'],
          ['UX', 'Storefronts rápidos, accesibles y mobile-first.'],
        ],
        stack: [['SHOPIFY','t-sea'],['LIQUID','t-brass'],['JS / TS','t-sea'],['SASS','t-foam']],
        demoUrl: '', codeUrl: '',
      },
    };
  }

  const backdrop = document.getElementById('sheet-backdrop');
  const sheet = document.getElementById('proj-sheet');
  let lastFocus = null;

  function buildSheet(p) {
    const chips = p.stack.map(function(s) {
      return '<span class="chip ' + s[1] + '">' + s[0] + '</span>';
    }).join('');
    const hl = p.highlights.map(function(h) {
      return '<li><span class="gear"></span><span><b>' + h[0] + '</b>&nbsp; ' + h[1] + '</span></li>';
    }).join('');
    const demoBtn = p.demoUrl
      ? '<a href="' + p.demoUrl + '" target="_blank" rel="noopener" class="pxbtn">▶ VER DEMO</a>'
      : '<button class="pxbtn" disabled style="opacity:.45">▶ DEMO</button>';
    const codeBtn = p.codeUrl
      ? '<a href="' + p.codeUrl + '" target="_blank" rel="noopener" class="pxbtn ghost">[ CÓDIGO ]</a>'
      : '<button class="pxbtn ghost" disabled style="opacity:.45">[ CÓDIGO ]</button>';

    sheet.innerHTML =
      '<div class="grab"><i></i></div>' +
      '<div class="sheet-hd">' +
        '<div>' +
          '<div class="kick">CARGA · ' + p.no + ' &nbsp;·&nbsp; ' + p.kicker + '</div>' +
          '<h3>' + p.title + '</h3>' +
          '<div class="meta">' + p.meta + ' &nbsp;·&nbsp; ' + p.year + '</div>' +
        '</div>' +
        '<button class="close" id="sheet-close" aria-label="Cerrar">✕</button>' +
      '</div>' +
      '<div class="viewport"><div class="scan"></div><div class="ph">[ DROP ZONE ]<br>' + p.ph.replace('\n','<br>') + '</div></div>' +
      '<div class="sheet-body">' +
        '<p class="lede">' + p.lede + '</p>' +
        '<div class="row2">' +
          '<div><h4 class="sub">▸ DESTACADOS</h4><ul class="hl">' + hl + '</ul></div>' +
          '<div><h4 class="sub">▸ STACK</h4><div class="stack">' + chips + '</div>' +
            '<div class="sheet-cta">' + demoBtn + codeBtn + '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    sheet.querySelector('#sheet-close').addEventListener('click', closeSheet);
  }

  function openSheet(id) {
    const p = PROJECTS[id];
    if (!p) return;
    lastFocus = document.activeElement;
    buildSheet(p);
    backdrop.classList.add('open');
    requestAnimationFrame(function() { sheet.classList.add('open'); });
    document.body.style.overflow = 'hidden';
    const c = sheet.querySelector('#sheet-close');
    if (c) c.focus();
  }

  function closeSheet() {
    sheet.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.querySelectorAll('[data-proj]').forEach(function(card) {
    card.addEventListener('click', function() { openSheet(card.getAttribute('data-proj')); });
  });
  if (backdrop) backdrop.addEventListener('click', closeSheet);
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeSheet(); });
})();
