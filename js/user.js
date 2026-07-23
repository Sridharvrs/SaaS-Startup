const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

if (currentUser) {
    document.getElementById("profileName").textContent = currentUser.name;
}

// Member workspace behaviors
(function(){
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('backdrop');
  const menuBtn = document.getElementById('menuBtn');
  const sbClose = document.getElementById('sbClose');
  const greeting = document.getElementById('greeting');

  function openSb(){
    sidebar.classList.add('open');
    backdrop.classList.add('show');
    document.body.classList.add('menu-open');
}

function closeSb(){
    sidebar.classList.remove('open');
    backdrop.classList.remove('show');
    document.body.classList.remove('menu-open');
}

  menuBtn.addEventListener('click', openSb);
  sbClose.addEventListener('click', closeSb);
  backdrop.addEventListener('click', closeSb);

  // Dynamic greeting
  if (greeting) {
    const h = new Date().getHours();
    const t = h < 12 ? 'morning' : h < 18 ? 'afternoon' : 'evening';
    greeting.textContent = `Good ${t}, Jules`;
  }

  // Module switching
  const links = document.querySelectorAll('.sb-link');
  const modules = document.querySelectorAll('.module');
  links.forEach(link => {
    link.addEventListener('click', () => {
      const mod = link.dataset.module;
      links.forEach(l => l.classList.toggle('active', l === link));
      modules.forEach(m => m.classList.toggle('hidden', m.dataset.module !== mod));
      if (window.innerWidth <= 768) closeSb();
      window.scrollTo({top:0,behavior:'smooth'});
    });
  });

  // Chat list switching
  document.querySelectorAll('.chat-item').forEach(ci => {
    ci.addEventListener('click', () => {
      document.querySelectorAll('.chat-item').forEach(x => x.classList.toggle('active', x === ci));
    });
  });

  // Chat send (visual only)
  const chatInput = document.querySelector('.chat-input input');
  const chatSend = document.querySelector('.chat-input .btn');
  const chatBody = document.querySelector('.chat-body');
  function send(){
    const v = chatInput.value.trim();
    if (!v) return;
    const b = document.createElement('div');
    b.className = 'bubble b-out';
    b.textContent = v;
    chatBody.appendChild(b);
    chatInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  if (chatSend) chatSend.addEventListener('click', send);
  if (chatInput) chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') send(); });
})();

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        closeSb();
    }
});