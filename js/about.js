/* About page — timeline dot pulse on scroll-in */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var dots = document.querySelectorAll('.tl-dot');
    if (!dots.length || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('pulse');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.6 });
    dots.forEach(function (d) { io.observe(d); });
  });
})();
