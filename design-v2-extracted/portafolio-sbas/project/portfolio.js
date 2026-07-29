/* =====================================================================
   PORTAFOLIO SBAS — interactions
   1) scroll parallax for the seascape layers
   2) section reveal-on-enter (parallax transition between views)
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

  /* ---------- 2. SECTION REVEAL ----------
     Rect-based (not IntersectionObserver): IO does not fire in some
     offscreen/preview render contexts, which would leave content hidden.
     This checks positions on load + scroll, and has a hard fallback. */
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  function checkReveals() {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    let remaining = false;
    for (const el of reveals) {
      if (el.classList.contains('in')) continue;
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add('in');
      else remaining = true;
    }
    return remaining;
  }
  checkReveals();
  window.addEventListener('scroll', () => { if (!checkReveals()) {} }, { passive: true });
  window.addEventListener('resize', checkReveals, { passive: true });
  // safety net: if anything is still hidden shortly after load, show it.
  setTimeout(() => reveals.forEach((r) => r.classList.add('in')), 1400);

  /* ---------- 3. PROJECT SHEET ---------- */
  const PROJECTS = {
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
    },
    mindworld: {
      no: '02', year: 'FEB — NOV 2022', kicker: '3D · THREE.JS',
      title: 'MIND WORLD 3D', meta: 'Web 3D Developer @ Mind World',
      ph: 'SOLAR SYSTEM\nWEBGL',
      lede: 'Sistema solar interactivo en Three.js con controles de cámara personalizados, órbitas en tiempo real y optimización de assets para una experiencia fluida en la web.',
      highlights: [
        ['−25%', 'Tiempo de carga reducido optimizando geometrías y texturas.'],
        ['WEBGL', 'Render en tiempo real con controles de cámara custom.'],
        ['60FPS', 'Animación de órbitas estable en desktop y tablet.'],
      ],
      stack: [['THREE.JS','t-coral'],['JS','t-sea'],['HTML5','t-brass'],['CSS3','t-foam']],
    },
    darwin: {
      no: '03', year: 'ABR — JUL 2024', kicker: 'BLOCKCHAIN · WEB3',
      title: 'DARWIN TRACE', meta: 'Fullstack Developer @ Darwin Evolution',
      ph: 'TRACEABILITY\nLEDGER',
      lede: 'Plataforma de trazabilidad sobre blockchain: stack MERN, integración Web3 y una arquitectura de microservicios para registrar y verificar cada eslabón de la cadena.',
      highlights: [
        ['WEB3', 'Registro inmutable y verificación on-chain de eventos.'],
        ['MERN', 'API y dashboard fullstack sobre Mongo, Express, React, Node.'],
        ['µSVC', 'Servicios desacoplados para escalar por dominio.'],
      ],
      stack: [['REACT','t-sea'],['NODE.JS','t-led'],['WEB3.0','t-brass'],['MONGO','t-foam']],
    },
    cicd: {
      no: '04', year: 'JUL — SEP 2024', kicker: 'DEVOPS · AZURE',
      title: 'CI/CD PIPELINES', meta: 'DevOps Developer @ Darwin Evolution',
      ph: 'PIPELINE\nDASHBOARD',
      lede: 'Automatización completa del ciclo de despliegue sobre Azure App Service y Docker: builds reproducibles, entornos contenedizados y entregas continuas sin fricción.',
      highlights: [
        ['−40%', 'Reducción del tiempo de despliegue end-to-end.'],
        ['DOCKER', 'Entornos idénticos de dev a producción.'],
        ['AZURE', 'App Service + pipelines de integración continua.'],
      ],
      stack: [['AZURE','t-sea'],['DOCKER','t-foam'],['CI/CD','t-led'],['GITHUB','t-brass']],
    },
    triada: {
      no: '05', year: 'JUL — SEP 2022', kicker: 'ACADEMIA · WORDPRESS',
      title: 'TRIADA ACADEMY', meta: 'CTO & Lead Dev @ Triada Academy',
      ph: 'LMS + LIVE\nSTREAM',
      lede: 'Administración web de una academia: integración de livestream, recursos pedagógicos y endurecimiento de seguridad, liderando el roadmap técnico del producto.',
      highlights: [
        ['+35%', 'Mejora de velocidad de carga del sitio.'],
        ['LIVE', 'Integración de streaming y recursos para clases.'],
        ['LEAD', 'Dirección técnica y arquitectura del producto.'],
      ],
      stack: [['WORDPRESS','t-brass'],['PHP','t-sea'],['SEO','t-foam']],
    },
    next: {
      no: '06', year: 'SOON™', kicker: 'PRÓXIMO PROYECTO',
      title: 'NEXT VOYAGE', meta: 'Slot reservado',
      ph: '??? \nUNCHARTED',
      lede: 'Bodega reservada para el próximo proyecto. ¿Tienes una idea que zarpar? Esta es la próxima coordenada en el mapa.',
      highlights: [
        ['OPEN', 'Disponible para colaboraciones y nuevos retos.'],
      ],
      stack: [['SOON','t-coral']],
    },
  };

  const backdrop = document.getElementById('sheet-backdrop');
  const sheet = document.getElementById('proj-sheet');
  let lastFocus = null;

  function buildSheet(p) {
    const chips = p.stack.map((s) => '<span class="chip ' + s[1] + '">' + s[0] + '</span>').join('');
    const hl = p.highlights.map((h) =>
      '<li><span class="gear"></span><span><b>' + h[0] + '</b>&nbsp; ' + h[1] + '</span></li>'
    ).join('');
    sheet.innerHTML =
      '<div class="grab"><i></i></div>' +
      '<div class="sheet-hd">' +
        '<div>' +
          '<div class="kick">CARGO · ' + p.no + ' &nbsp;·&nbsp; ' + p.kicker + '</div>' +
          '<h3>' + p.title + '</h3>' +
          '<div class="meta">' + p.meta + ' &nbsp;·&nbsp; ' + p.year + '</div>' +
        '</div>' +
        '<button class="close" id="sheet-close" aria-label="Cerrar">✕</button>' +
      '</div>' +
      '<div class="viewport"><div class="scan"></div><div class="ph">[ DROP ZONE ]<br>' + p.ph.replace('\n','<br>') + '</div></div>' +
      '<div class="sheet-body">' +
        '<p class="lede">' + p.lede + '</p>' +
        '<div class="row2">' +
          '<div><h4 class="sub">▸ HIGHLIGHTS</h4><ul class="hl">' + hl + '</ul></div>' +
          '<div><h4 class="sub">▸ STACK</h4><div class="stack">' + chips + '</div>' +
            '<div class="sheet-cta">' +
              '<button class="pxbtn">▶ VER DEMO</button>' +
              '<button class="pxbtn ghost">[ CÓDIGO ]</button>' +
            '</div>' +
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
    // next frame so the transform transition runs
    requestAnimationFrame(() => sheet.classList.add('open'));
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

  document.querySelectorAll('[data-proj]').forEach((card) => {
    card.addEventListener('click', () => openSheet(card.getAttribute('data-proj')));
  });
  backdrop.addEventListener('click', closeSheet);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSheet(); });

  /* ---------- 4. NAV SCROLL-SPY + MOBILE TOGGLE (deploy only) ---------- */
  const nav = document.querySelector('.topnav nav');
  if (nav) {
    const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
    const targets = links
      .map((a) => ({ a, el: document.querySelector(a.getAttribute('href')) }))
      .filter((t) => t.el);

    function spy() {
      const y = (window.scrollY || 0) + 120;
      let current = targets[0];
      for (const t of targets) { if (t.el.offsetTop <= y) current = t; }
      links.forEach((l) => l.classList.toggle('active', current && l === current.a));
    }
    spy();
    window.addEventListener('scroll', spy, { passive: true });

    // close mobile menu on link tap
    links.forEach((l) => l.addEventListener('click', () => nav.classList.remove('open')));

    const toggle = document.querySelector('.nav-toggle');
    if (toggle) toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }
})();
