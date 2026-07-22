/* ===== Home page interactions ===== */
(function () {
  // Animated MRR counter
  function animateMrr() {
    var el = document.getElementById('mrr');
    if (!el) return;
    var target = 847200;
    var start = 612000;
    var dur = 1800;
    var t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(start + (target - start) * eased).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Sparkline (SVG)
  function drawSpark() {
    var host = document.getElementById('spark');
    if (!host) return;
    var pts = [10, 14, 9, 18, 16, 22, 19, 28, 24, 34, 30, 42];
    var w = 110, h = 44;
    var max = Math.max.apply(null, pts);
    var step = w / (pts.length - 1);
    var d = pts.map(function (p, i) {
      var x = i * step;
      var y = h - (p / max) * (h - 4) - 2;
      return (i === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1);
    }).join(' ');
    var area = d + ' L' + w + ' ' + h + ' L0 ' + h + ' Z';
    host.innerHTML =
      '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">' +
      '<defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#22d3ee" stop-opacity="0.4"/>' +
      '<stop offset="1" stop-color="#22d3ee" stop-opacity="0"/>' +
      '</linearGradient></defs>' +
      '<path d="' + area + '" fill="url(#sg)"/>' +
      '<path d="' + d + '" fill="none" stroke="#22d3ee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>';
  }

  document.addEventListener('DOMContentLoaded', function () {
    animateMrr();
    drawSpark();
  });
})();
