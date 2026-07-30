// KOVA Sidebar - DOPETONE NOIR - Help + Contacts - LIGHT FIXED
export const Sidebar = {
  render() {
    const el = document.getElementById('sidebar');
    const icons = {
      home: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
      menu: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h18v18H3z"/><path d="M9 3v18M3 9h18M3 15h18"/></svg>`,
      story: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>`,
      staff: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`,
      admin: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>`,
      help: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="none"/></svg>`,
      contact: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
      close: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
    };

    el.innerHTML = `
      <button id="sb-close-x" onclick="closeSidebar()" style="
        position:absolute; top:16px; right:16px;
        width:32px; height:32px; border-radius:50%;
        background:var(--bg-hover); border:1px solid var(--border);
        color:var(--text-main); cursor:pointer;
        display:none; align-items:center; justify-content:center; z-index:5;
      ">${icons.close}</button>

      <div class="logo-wrap">
        <div class="logo">K<span class="dot">O</span>VA</div>
        <div class="logo-sub ar">كوفا — مطبخ الجمر</div>
      </div>

      <nav class="nav">
        <a class="nav-item active" data-link href="/" data-view="home">${icons.home} Home</a>
        <a class="nav-item" data-link href="/menu" data-view="menu">${icons.menu} Menu</a>
        <a class="nav-item" data-link href="/story" data-view="story">${icons.story} Our Story</a>
        <a class="nav-item" data-link href="/staff" data-view="staff">${icons.staff} Staff</a>
        <a class="nav-item" data-link href="/help" data-view="help">${icons.help} Help</a>
        <a class="nav-item" data-link href="/contact" data-view="contact">${icons.contact} Contacts</a>
        <a class="nav-item" data-link data-admin href="/admin" data-view="admin">${icons.admin} Admin <span class="admin-badge">LOCKED</span></a>
      </nav>

      <div class="sidebar-foot">
        <button class="btn-icon" onclick="toggleTheme()" style="display:flex; gap:8px; align-items:center; width:100%; justify-content:flex-start;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          Toggle Theme
        </button>
        <button class="btn-icon" onclick="toggleSidebar()" style="display:flex; gap:8px; align-items:center; width:100%; justify-content:flex-start;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
          Hide Sidebar
        </button>
      </div>
    `;

    el.addEventListener('click', (e) => {
      const link = e.target.closest('.nav-item');
      if (link) {
        el.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        link.classList.add('active');
        if(window.innerWidth <= 768){
          setTimeout(()=> window.closeSidebar && window.closeSidebar(), 180);
        }
      }
    });
  }
};
