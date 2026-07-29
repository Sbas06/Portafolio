/* =====================================================================
   PORTAFOLIO SBAS — deployed site behaviors
   nav scroll-spy · smooth scroll · mobile menu · work category filter
   (parallax, reveal and project sheets come from portfolio.js)
   ===================================================================== */
(function () {
  'use strict';

  /* ---------- smooth scroll + mobile menu ---------- */
  const nav = document.querySelector('.nav');
  const menu = document.querySelector('.nav .menu');
  const burger = document.querySelector('.nav .burger');
  const links = Array.from(document.querySelectorAll('.nav .menu a[href^="#"]'));

  if (burger) burger.addEventListener('click', () => menu.classList.toggle('open'));

  links.forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - (nav ? nav.offsetHeight - 2 : 0);
        window.scrollTo({ top, behavior: 'smooth' });
        menu.classList.remove('open');
        history.replaceState(null, '', id);
      }
    });
  });

  /* ---------- scroll-spy ---------- */
  const sections = links
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  function spy() {
    const pos = window.scrollY + (nav ? nav.offsetHeight : 0) + 60;
    let current = sections[0];
    for (const s of sections) { if (s.offsetTop <= pos) current = s; }
    links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + (current && current.id)));
  }
  window.addEventListener('scroll', spy, { passive: true });
  window.addEventListener('resize', spy, { passive: true });
  spy();

  /* ---------- work category filter ---------- */
  const catBtns = Array.from(document.querySelectorAll('.cat-bar button[data-cat]'));
  const cards = Array.from(document.querySelectorAll('.manifest[data-cats]'));
  catBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-cat');
      catBtns.forEach((b) => b.classList.toggle('on', b === btn));
      cards.forEach((c) => {
        const cats = (c.getAttribute('data-cats') || '').split(' ');
        c.classList.toggle('hide', cat !== 'all' && !cats.includes(cat));
      });
    });
  });

  /* ---------- language toggle (decorative ES/EN swap of a few labels) ---------- */
  const langBtns = Array.from(document.querySelectorAll('.nav .lang button[data-lang]'));
  const I18N = {
    es: {
      'nav-home': 'Inicio', 'nav-work': 'Proyectos', 'nav-about': 'Sobre mí', 'nav-contact': 'Contacto',
      'hero-kicker': 'PORTAFOLIO', 'scrollcue': 'SCROLL',
    },
    en: {
      'nav-home': 'Home', 'nav-work': 'Work', 'nav-about': 'About', 'nav-contact': 'Contact',
      'hero-kicker': 'PORTFOLIO', 'scrollcue': 'SCROLL',
    },
  };
  langBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      langBtns.forEach((b) => b.classList.toggle('on', b === btn));
      document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (I18N[lang] && I18N[lang][key]) el.textContent = I18N[lang][key];
      });
      document.documentElement.lang = lang;
    });
  });
})();
