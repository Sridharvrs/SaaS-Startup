/* Contact page — form validation + FAQ accordion */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    // ---- FAQ accordion ----
    var items = document.querySelectorAll('.faq-acc-item');
    items.forEach(function (item) {
      var head = item.querySelector('.faq-acc-head');
      var body = item.querySelector('.faq-acc-body');
      head.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        // close others
        items.forEach(function (other) {
          if (other !== item) {
            other.classList.remove('open');
            other.querySelector('.faq-acc-head').setAttribute('aria-expanded', 'false');
            other.querySelector('.faq-acc-body').style.maxHeight = null;
          }
        });
        if (isOpen) {
          item.classList.remove('open');
          head.setAttribute('aria-expanded', 'false');
          body.style.maxHeight = null;
        } else {
          item.classList.add('open');
          head.setAttribute('aria-expanded', 'true');
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      });
    });

    // ---- Form validation ----
    var form = document.getElementById('contactForm');
    if (!form) return;
    var submitBtn = form.querySelector('.submit-btn');
    var label = submitBtn.querySelector('.btn-label');
    var spinner = submitBtn.querySelector('.spinner');
    var success = document.getElementById('formSuccess');

    function setError(field, bad) {
      field.classList.toggle('invalid', bad);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      var name = form.name;
      var email = form.email;
      var message = form.message;

      setError(name.parentElement, !name.value.trim());
      if (!name.value.trim()) ok = false;

      var emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
      setError(email.parentElement, !emailValid);
      if (!emailValid) ok = false;

      setError(message.parentElement, !message.value.trim());
      if (!message.value.trim()) ok = false;

      if (!ok) return;

      // simulate send
      submitBtn.classList.add('loading');
      label.textContent = 'Sending…';
      spinner.hidden = false;
      success.hidden = true;

      setTimeout(function () {
        submitBtn.classList.remove('loading');
        label.textContent = 'Send message';
        spinner.hidden = true;
        success.hidden = false;
        form.reset();
        // reset chip to sales
        var salesChip = form.querySelector('input[name="topic"][value="sales"]');
        if (salesChip) salesChip.checked = true;
      }, 1400);
    });

    // clear error on input
    form.querySelectorAll('input, textarea').forEach(function (el) {
      el.addEventListener('input', function () {
        el.parentElement.classList.remove('invalid');
      });
    });
  });
})();


const dashboard = document.querySelector(".nbx-dashboard-card");

document.addEventListener("mousemove", (e) => {

    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    dashboard.style.transform =
        `rotateY(${x}deg) rotateX(${-y}deg)`;

});

document.addEventListener("mouseleave", () => {

    dashboard.style.transform = "rotateY(0) rotateX(0)";

});

const counters = document.querySelectorAll(".nbx-metric strong");

counters.forEach(counter => {

    const target = counter.innerText;

    if(target.includes("25")) return;

});