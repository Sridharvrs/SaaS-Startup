const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

if (currentUser) {
    document.getElementById("profileName").textContent = currentUser.name;
}

// Admin dashboard behaviors
(function(){
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('backdrop');
  const menuBtn = document.getElementById('menuBtn');
  const sbClose = document.getElementById('sbClose');
  const crumbPage = document.getElementById('crumbPage');

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

  // Module switching
  const links = document.querySelectorAll('.sb-link');
  const modules = document.querySelectorAll('.module');
  links.forEach(link => {
    link.addEventListener('click', () => {
      const mod = link.dataset.module;
      links.forEach(l => l.classList.toggle('active', l === link));
      modules.forEach(m => m.classList.toggle('hidden', m.dataset.module !== mod));
      crumbPage.textContent = link.textContent.trim();
      if (window.innerWidth <= 768) closeSb();
      window.scrollTo({top:0,behavior:'smooth'});
    });
  });

  // Revenue bars
  const revData = [42,55,48,63,72,68,80,74,88,95,89,102];
  const months = ['Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun','Jul'];
  const bars = document.getElementById('revBars');
  if (bars) {
    const max = Math.max(...revData);
    bars.innerHTML = revData.map((v,i)=>`<div class="b" style="height:${(v/max)*100}%" title="${months[i]}: $${v}k"><span>${months[i]}</span></div>`).join('');
  }

  // Users table
  const users = [
    ['Maya Chen','maya@lumen.io','Admin','Scale','Active','2m ago','#7c3aed'],
    ['Ken Ito','ken@lumen.io','Editor','Pro','Active','12m ago','#22d3ee'],
    ['Rin Park','rin@novaflow.io','Editor','Pro','Active','1h ago','#f43f5e'],
    ['Diego Alvarez','diego@orbit.co','Member','Free','Active','3h ago','#a3e635'],
    ['Zara Khan','zara@nimbus.dev','Admin','Scale','Suspended','2d ago','#f59e0b'],
    ['Luca Bianchi','luca@vertex.ai','Member','Pro','Active','5h ago','#a855f7'],
    ['Amara Osei','amara@kite.co','Editor','Pro','Active','8h ago','#22d3ee'],
    ['Nikhil Shah','nik@orbit.co','Member','Free','Active','1d ago','#f43f5e'],
  ];
  const tbody = document.getElementById('userTable');
  if (tbody){
    const roleTag = {Admin:'t-violet',Editor:'t-cyan',Member:'t-amber'};
    const statusTag = {Active:'t-green',Suspended:'t-red'};
    tbody.innerHTML = users.map(u=>`
      <tr>
        <td><div class="u"><div class="avatar sm" style="background:${u[6]};width:32px;height:32px;font-size:12px">${u[0].split(' ').map(x=>x[0]).join('')}</div><div><div>${u[0]}</div><div style="color:var(--muted);font-size:12px">${u[1]}</div></div></div></td>
        <td><span class="tag ${roleTag[u[2]]}">${u[2]}</span></td>
        <td>${u[3]}</td>
        <td><span class="tag ${statusTag[u[4]]}">${u[4]}</span></td>
        <td style="color:var(--muted)">${u[5]}</td>
        <td><button class="btn btn-ghost" style="padding:6px 12px;font-size:12px">Manage</button></td>
      </tr>
    `).join('');
  }
})();

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        closeSb();
    }
});