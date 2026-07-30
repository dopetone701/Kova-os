// KOVA Topbar - Search + Actions - Never Reloads
export const Topbar = {
  render() {
    const el = document.getElementById('topbar');
    el.innerHTML = `
      <button class="btn-icon" onclick="toggleSidebar()" style="display:flex;">☰</button>
      
      <div class="search-box">
        <span style="color:var(--text-muted)">⌕</span>
        <input type="text" placeholder="Search dishes, staff, orders..." id="globalSearch" />
      </div>

      <div style="display:flex; gap:12px; align-items:center;">
        <button class="btn-secondary" onclick="toggleTheme()">◐</button>
        <button class="btn-primary">Book Table</button>
        <div style="width:36px;height:36px;border-radius:50%;background:var(--bg-hover);display:flex;align-items:center;justify-content:center;font-weight:800;">K</div>
      </div>
    `;
  }
};
