/* ============================================================
   BASIL STUDIO — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ── Loading Screen ──────────────────────────────────────── */
  var loader = document.getElementById('loader');
  if (loader) {
    document.body.style.overflow = 'hidden';
    setTimeout(function () {
      loader.classList.add('loader-out');
      setTimeout(function () {
        loader.style.display = 'none';
        document.body.style.overflow = '';
      }, 750);
    }, 1500);
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

  /* ── Scroll Animations (IntersectionObserver) ────────────── */
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('[data-animate], [data-stagger]').forEach(function (el) {
    observer.observe(el);
  });

})();
