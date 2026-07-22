/* Login page — validation + password toggle + fake auth */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('loginForm');
    if (!form) return;
    var email = document.getElementById('lemail');
    var pass = document.getElementById('lpass');
    var toggle = document.getElementById('togglePass');
    var submitBtn = form.querySelector('.submit-btn');
    var label = submitBtn.querySelector('.btn-label');
    var spinner = submitBtn.querySelector('.spinner');
    var errorBox = document.getElementById('loginError');

    // password visibility
    if (toggle) {
      toggle.addEventListener('click', function () {
        var isPass = pass.type === 'password';
        pass.type = isPass ? 'text' : 'password';
        toggle.textContent = isPass ? '🙈' : '👁';
      });
    }

    function setError(field, bad) {
      field.parentElement.classList.toggle('invalid', bad);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      errorBox.hidden = true;
      var ok = true;
      var emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
      setError(email, !emailValid);
      if (!emailValid) ok = false;
      setError(pass, !pass.value);
      if (!pass.value) ok = false;
      if (!ok) return;

      submitBtn.classList.add('loading');
      label.textContent = 'Signing in…';
      spinner.hidden = false;

      setTimeout(function () {
        submitBtn.classList.remove('loading');
        label.textContent = 'Log in';
        spinner.hidden = true;
        // demo: any non-empty password "fails" to show error state
        if (pass.value === 'nebula') {
          errorBox.hidden = true;
          label.textContent = '✓ Logged in (demo)';
        } else {
          errorBox.hidden = false;
        }
      }, 1200);
    });

    [email, pass].forEach(function (el) {
      el.addEventListener('input', function () { el.parentElement.classList.remove('invalid'); });
    });
  });
})();
