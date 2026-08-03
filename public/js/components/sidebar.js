// KOVA Sidebar - FIXED HIDE ADMIN/STAFF UNTIL D1 ADMIN SIGN-IN - MIME SAFE
export const Sidebar = {
  WORKER_URL: 'https://kova-clean-api.dopetone701.workers.dev',
  GUEST_WORKER: 'https://kova-guest-sign-up.dopetone701.workers.dev',
  ALLOWED_ADMIN: 'dopetone701@gmail.com',
  async render(){
    const el=document.getElementById('sidebar'); if(!el) return;
    const icons={
      home:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
      menu:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>`,
      orders:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`,
      story:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 0 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></svg>`,
      staff:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`,
      admin:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>`,
      
      help:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none"
     xmlns="http://www.w3.org/2000/svg"
     stroke="currentColor" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="9"/>
  <path d="M9.5 9a2.5 2.5 0 1 1 5 0c0 1.8-2.5 2.3-2.5 4"/>
  <circle cx="12" cy="17" r="0.8" fill="currentColor" stroke="none"/>
</svg>
`,
      contact:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 1.1 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
      auth:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
      close:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
    };
    const token=localStorage.getItem('kova_token');
    let guest=null; let isAdmin=false;
    try{ const sg=localStorage.getItem('kova_guest'); if(sg) guest=JSON.parse(sg); }catch{}
    if(token){
      try{
        const r=await fetch(`${this.GUEST_WORKER}/api/guest/me`,{headers:{'Authorization':`Bearer ${token}`}});
        if(r.ok){ const d=await r.json(); if(d.guest){ guest=d.guest; isAdmin=!!d.guest.is_admin; localStorage.setItem('kova_guest',JSON.stringify(d.guest)); localStorage.setItem('kova_is_admin',isAdmin?'1':'0'); if(isAdmin) localStorage.setItem('kova_admin_email',d.guest.email); } }
        else if(r.status===401){ localStorage.clear(); guest=null; isAdmin=false; }
      }catch{}
    } else { isAdmin=false; }
    el.innerHTML=`
      <style>
      .logo-wrap{padding:28px 20px 16px}
.logo-wrap .logo{font-family:'Syne',sans-serif;font-weight:900;font-size:32px;letter-spacing:-1.5px;line-height:1;color:#fff}
.logo-wrap .logo .o-green{color:var(--accent) !important}
.logo-sub{font-size:12px;color:var(--text-muted);margin-top:6px}
.nav{padding:8px 12px;flex:1;overflow-y:auto}
.nav-item{position:relative;display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;color:var(--text-muted);text-decoration:none;font-size:14px;font-weight:500;transition:.15s ease;cursor:pointer;border:1px solid transparent;margin-bottom:4px;user-select:none}
.nav-item:hover{background:var(--bg-hover);color:var(--text-main)}
.nav-item.active{background:var(--accent-2) !important;color:#fff !important;border-color:var(--accent-2) !important}
.nav-item.active svg{stroke:#fff !important}
.nav-item:hover:not(.active){color:var(--accent-2) !important;background:var(--bg-hover)}
.nav-dot{width:6px;height:6px;border-radius:50%;display:inline-block;margin-left:auto;background:var(--accent-2);box-shadow:0 0 6px var(--accent-2)}
.sidebar-foot{padding:16px;border-top:1px solid var(--border);display:flex;flex-direction:column;gap:8px}
.btn-icon{background:var(--bg-card);border:1px solid var(--border);color:var(--text-muted);padding:10px 12px;border-radius:10px;font-size:12px;cursor:pointer}
.guest-mini{display:flex;gap:10px;align-items:center;padding:10px 12px;background:var(--bg-card);border:1px solid var(--border);border-radius:12px;margin-bottom:4px}
.guest-mini img{width:32px;height:32px;border-radius:50%;object-fit:cover}
/* LIGHT LOCK - SIDEBAR STAYS DARK */
[data-theme="light"] #sidebar,.sidebar{background:#121214 !important;border-right-color:#27272A !important}
[data-theme="light"] .logo-wrap .logo{color:#fff !important}
[data-theme="light"] .nav-item{color:#A1A1AA !important}
[data-theme="light"] .nav-item:hover{background:#27272A !important;color:#F4F4F5 !important}
[data-theme="light"] .nav-item.active{background:#FF4E1F !important;color:#fff !important}
[data-theme="light"] .sidebar-foot{border-top-color:#27272A !important}
[data-theme="light"] .btn-icon,[data-theme="light"] .guest-mini{background:#1C1C1F !important;border-color:#27272A !important;color:#A1A1AA !important}

      </style>
      <div class="logo-wrap">
        <div class="logo">K<span class="o-green">O</span>VA</div>
        <div class="logo-sub ar">كوفا — مطبخ الجمر</div>
        <div style="margin-top:10px;display:flex;gap:6px;align-items:center;font-size:10px;letter-spacing:1px;color:var(--text-muted)"><span style="width:6px;height:6px;background:var(--accent-2);border-radius:50%;display:inline-block;box-shadow:0 0 6px var(--accent-2)"></span> LIVE FIRE • JLT</div>
      </div>
      <nav class="nav">
        <a class="nav-item" data-link href="#/home" data-view="home">${icons.home} Home <span class="nav-dot" style="display:none"></span></a>
        <a class="nav-item" data-link href="#/menu" data-view="menu">${icons.menu} Menu</a>
        <a class="nav-item" data-link href="#/orders" data-view="orders">${icons.orders} Orders</a>
        <a class="nav-item" data-link href="#/story" data-view="story">${icons.story} Our Story</a>
        ${isAdmin? `<a class="nav-item" data-link href="#/staff" data-view="staff">${icons.staff} Staff <span style="margin-left:auto;font-size:9px;background:var(--accent);color:#000;padding:2px 6px;border-radius:99px;font-weight:800">ADMIN</span></a>` : ``}
        <a class="nav-item" data-link href="#/help" data-view="help">${icons.help} Help</a>
        <a class="nav-item" data-link href="#/contact" data-view="contact">${icons.contact} Contacts</a>
        ${isAdmin? `<a class="nav-item" data-link href="#/admin" data-view="admin">${icons.admin} Admin <span style="margin-left:auto;font-size:10px;background:var(--accent);color:#000;padding:2px 8px;border-radius:99px;font-weight:800">YOU</span></a>` : ``}
        ${!guest? `<a class="nav-item" data-link href="#/auth" data-view="auth">${icons.auth} Sign In / Up</a>` : ``}
      </nav>
      <div class="sidebar-foot">
        ${guest? `<div class="guest-mini"><div style="width:32px;height:32px;border-radius:50%;background:var(--accent);color:#000;display:grid;place-items:center;font-weight:900">${(guest.name||'G').charAt(0)}</div><div style="flex:1;min-width:0"><div style="font-size:12px;font-weight:700;color:var(--text-main)">${guest.name}</div><div style="font-size:10px;color:var(--text-muted)">${guest.email}</div><div style="font-size:9px;color:${isAdmin?'var(--accent)':'var(--text-muted)'}">${isAdmin?'ADMIN • D1':'D1 • Guest'}</div></div></div><button class="btn-icon" onclick="localStorage.clear();location.hash='#/home';location.reload()">Logout</button>` : `<div style="font-size:10px;color:var(--text-muted);padding:0 12px 8px;opacity:0.7">Guest Mode <br>Sign in  to unlock your early discount!</div>`}
        <button class="btn-icon" onclick="window.toggleTheme&&window.toggleTheme()">Toggle Theme</button>
        <button class="btn-icon" onclick="window.toggleSidebar&&window.toggleSidebar()">Hide Sidebar</button>
      </div>
    `;
    const nav=el.querySelector('.nav');
    if(nav){ nav.onclick=(e)=>{ const link=e.target.closest('.nav-item'); if(!link) return; el.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active')); link.classList.add('active'); if(window.innerWidth<=768) setTimeout(()=>window.closeSidebar&&window.closeSidebar(),150); }; }
    this.setActive(); this._bindRouteListener();
  },
  setActive(){
    const el=document.getElementById('sidebar'); if(!el) return;
    const raw=window.location.hash||'/'; let path=raw.toLowerCase(); if(path.startsWith('#')) path=path.slice(1); path=path.split('?')[0]||'/'; if(!path.startsWith('/')) path='/'+path;
    el.querySelectorAll('.nav-item').forEach(n=>{ const href=(n.getAttribute('href')||'').toLowerCase().replace(/^#/,''); let hp=href.split('?')[0]; if(!hp.startsWith('/')) hp='/'+hp; const active=path===hp || (hp!=='/' && path.startsWith(hp) && hp.length>1); if(active) n.classList.add('active'); else n.classList.remove('active'); });
  },
  _bindRouteListener(){ if(this._bound) return; this._bound=true; const self=this; window.addEventListener('hashchange',()=>self.setActive()); window.addEventListener('kova:navigated',()=>self.setActive()); }
};

