// KOVA Sidebar - App Shell Never Reloads
export const Sidebar = {
  render() {
    const el = document.getElementById('sidebar');
    el.innerHTML = `
      <div class="logo-wrap">
        <div class="logo">K<span class="dot">O</span>VA</div>
        <div class="logo-sub ar">كوفا — مطبخ الجمر</div>
      </div>

      <nav class="nav">
        <a class="nav-item active" data-link href="/" data-view="home">
          <span>◉</span> Home
        </a>
        <a class="nav-item" data-link href="/menu" data-view="menu">
          <span>◍</span> Menu
        </a>
        <a class="nav-item" data-link href="/story" data-view="story">
          <span>◎</span> Our Story
        </a>
        <a class="nav-item" data-link href="/staff" data-view="staff">
          <span>○</span> Staff
        </a>
        
        <!-- ADMIN RULE LOCKED: only visible to selected emails -->
        <a class="nav-item" data-link data-admin href="/admin" data-view="admin" title="Visible only to allowed emails - locked rule">
          <span>⚙</span> Admin <span class="admin-badge">LOCKED</span>
        </a>
      </nav>

      <div class="sidebar-foot">
        <div style="font-size:11px;color:var(--text-muted);padding:0 8px;">
          Backend: kova-main-api<br>
          D1 • KOVA-R2 • Connected
        </div>
        <button class="btn-icon" onclick="toggleTheme()">◐ Toggle Noir / Light</button>
        <button class="btn-icon" onclick="toggleSidebar()">☰ Hide Sidebar</button>
      </div>
    `;

    // Add active state handling
    el.addEventListener('click', (e) => {
      const link = e.target.closest('.nav-item');
      if (link) {
        el.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }
};
