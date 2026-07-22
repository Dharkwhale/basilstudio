/* ============================================================
   BASIL STUDIO — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ── Hero entrance (fires after loader exits) ────────────── */
  function animateHero() {
    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to('#nav',          { y: 0, opacity: 1, duration: 0.5 })
      .to('.hero-badge',   { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.5)' }, '-=0.2')
      .to('.hero-headline',{ y: 0, opacity: 1, duration: 0.55 }, '-=0.15')
      .to('.hero-sub',     { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }, '-=0.2')
      .to('.hero-ctas',    { y: 0, opacity: 1, duration: 0.4,  ease: 'power2.out' }, '-=0.15')
      .to('.hero-stat',    { y: 0, opacity: 1, duration: 0.4,  ease: 'power2.out', stagger: 0.08 }, '-=0.1')
      .to('.hero-leaf-1',  { x: 0, opacity: 0.055, duration: 0.6, ease: 'power2.out' }, '-=0.4')
      .to('.hero-leaf-2',  { x: 0, opacity: 0.04,  duration: 0.6, ease: 'power2.out' }, '-=0.5');
  }

  /* ── Loading Screen (GSAP) ───────────────────────────────── */
  var loader = document.getElementById('loader');
  if (loader) {
    document.body.style.overflow = 'hidden';

    var leaf      = loader.querySelector('.loader-leaf');
    var logoWords = loader.querySelectorAll('.loader-logo span');
    var tag       = loader.querySelector('.loader-tag');

    gsap.set(leaf,      { scale: 0, opacity: 0 });
    gsap.set(logoWords, { y: 40, opacity: 0 });
    gsap.set(tag,       { y: 15, opacity: 0 });

    gsap.set('#nav',           { y: -60, opacity: 0 });
    gsap.set('.hero-badge',    { scale: 0.85, opacity: 0 });
    gsap.set('.hero-headline', { y: 50, opacity: 0 });
    gsap.set('.hero-sub',      { y: 30, opacity: 0 });
    gsap.set('.hero-ctas',     { y: 25, opacity: 0 });
    gsap.set('.hero-stat',     { y: 20, opacity: 0 });
    gsap.set('.hero-leaf-1',   { x: -40, opacity: 0 });
    gsap.set('.hero-leaf-2',   { x: 40, opacity: 0 });

    var breathe;

    function exitLoader() {
      if (breathe) breathe.kill();
      gsap.timeline({
        onComplete: function () {
          loader.style.display = 'none';
          document.body.style.overflow = '';
          animateHero();
        }
      })
      .to(leaf,      { scale: 1.8, opacity: 0, duration: 0.4, ease: 'power2.in' })
      .to(logoWords, { y: 20, opacity: 0, duration: 0.3, ease: 'power2.in', stagger: 0.05 }, '<')
      .to(tag,       { y: 10, opacity: 0, duration: 0.25, ease: 'power2.in' }, '<')
      .to(loader,    { yPercent: -100, duration: 0.55, ease: 'power3.inOut' }, '-=0.1');
    }

    gsap.timeline({
      onComplete: function () {
        breathe = gsap.to(leaf, {
          scale: 1.06, duration: 1.2, ease: 'power1.inOut', yoyo: true, repeat: -1
        });
        setTimeout(exitLoader, 800);
      }
    })
    .to(leaf,      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)' })
    .to(logoWords, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.12 }, '-=0.3')
    .to(tag,       { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.15');
  }

  /* ── Custom Cursor ───────────────────────────────────────── */
  var cursorDot  = document.getElementById('cursorDot');
  var cursorRing = document.getElementById('cursorRing');

  if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
    document.body.classList.add('has-custom-cursor');

    var mX = -100, mY = -100;
    var rX = -100, rY = -100;

    document.addEventListener('mousemove', function (e) {
      mX = e.clientX;
      mY = e.clientY;
      cursorDot.style.left = mX + 'px';
      cursorDot.style.top  = mY + 'px';
    });

    (function animateCursor() {
      rX += (mX - rX) * 0.14;
      rY += (mY - rY) * 0.14;
      cursorRing.style.left = rX + 'px';
      cursorRing.style.top  = rY + 'px';
      requestAnimationFrame(animateCursor);
    })();

    document.querySelectorAll('a, button').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', function () {
        document.body.classList.remove('cursor-hover');
      });
    });

    document.addEventListener('mouseleave', function () {
      cursorDot.style.opacity  = '0';
      cursorRing.style.opacity = '0';
    });
    document.addEventListener('mouseenter', function () {
      cursorDot.style.opacity  = '1';
      cursorRing.style.opacity = '1';
    });
  }

  /* ── Rotating Headline Text ──────────────────────────────── */
  var rotatingEl    = document.getElementById('rotatingText');
  var rotatingWords = ['Food Businesses', 'Restaurants', 'Catering Brands', 'Home Kitchens', 'Food Vendors'];
  var rotIdx = 0;

  if (rotatingEl) {
    setInterval(function () {
      rotatingEl.classList.add('rot-exit');
      setTimeout(function () {
        rotIdx = (rotIdx + 1) % rotatingWords.length;
        rotatingEl.textContent = rotatingWords[rotIdx];
        rotatingEl.classList.remove('rot-exit');
        rotatingEl.classList.add('rot-enter');
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            rotatingEl.classList.remove('rot-enter');
          });
        });
      }, 290);
    }, 2600);
  }

  /* ── Iframe Scaling ──────────────────────────────────────── */
  function scaleIframes() {
    document.querySelectorAll('.project-iframe-wrap').forEach(function (wrap) {
      var iframe = wrap.querySelector('.project-iframe');
      if (!iframe) return;
      var scale = wrap.offsetWidth / 1440;
      iframe.style.transform = 'scale(' + scale + ')';
    });
  }
  scaleIframes();
  window.addEventListener('resize', scaleIframes, { passive: true });

  /* ── Sticky Nav ──────────────────────────────────────────── */
  var nav = document.getElementById('nav');
  function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── Hamburger / Mobile Menu ─────────────────────────────── */
  var hamburger   = document.getElementById('hamburger');
  var mobileMenu  = document.getElementById('mobileMenu');
  var mobileLinks = mobileMenu.querySelectorAll('a');

  function openMenu() {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', function () {
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ── Smooth Scroll ───────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var targetTop = target.getBoundingClientRect().top + window.scrollY - nav.offsetHeight - 8;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });

  /* ── Scroll Animations (ScrollTrigger) ───────────────────── */
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('[data-animate]').forEach(function (el) {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true }
    });
  });

  document.querySelectorAll('[data-stagger]').forEach(function (el) {
    gsap.from(el.children, {
      y: 40,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true }
    });
  });

  gsap.from('.footer-grid > div', {
    y: 30,
    opacity: 0,
    duration: 0.5,
    ease: 'power3.out',
    stagger: 0.1,
    scrollTrigger: { trigger: '.footer-grid', start: 'top 90%', once: true }
  });

})();
