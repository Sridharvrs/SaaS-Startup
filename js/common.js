/* ===== Nebula — shared interactions ===== */
(function () {
  // ---- Mobile menu toggle (full height, half width) ----
  function initMenu() {
    var btn = document.getElementById('hamburger');
    var menu = document.getElementById('mobileMenu');
    var backdrop = document.getElementById('menuBackdrop');
    if (!btn || !menu) return;

    function close() {
      btn.classList.remove('open');
      menu.classList.remove('open');
      if (backdrop) backdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
    function open() {
      btn.classList.add('open');
      menu.classList.add('open');
      if (backdrop) backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    btn.addEventListener('click', function () {
      menu.classList.contains('open') ? close() : open();
    });
    if (backdrop) backdrop.addEventListener('click', close);
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', close);
    });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  // ---- Navbar scroll state ----
  function initNavScroll() {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    var onScroll = function () {
      if (window.scrollY > 24) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ---- Active nav link by filename ----
  function initActiveLink() {
    var path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === path) a.classList.add('active');
    });
  }

  // ---- Reveal on scroll ----
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (e) { e.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  // ---- Footer year ----
  function initYear() {
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initMenu();
    initNavScroll();
    initActiveLink();
    initReveal();
    initYear();
  });
})();
