// KOVA Staff View - ADMIN LOCKED - D1 SAFE - Mock for now, D1 later
export const Staff = {
  GUEST_WORKER: 'https://kova-guest-sign-up.dopetone701.workers.dev',
  ALLOWED_ADMIN: 'dopetone701@gmail.com',

  async render() {
    return `
      <style>
        .staff-root{max-width:1100px;margin:0 auto;padding:24px 24px 100px 24px;box-sizing:border-box}
.staff-lock{background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:32px;text-align:center}
.staff-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;margin-top:20px}
.staff-card{background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:18px;transition:.2s}
.staff-card:hover{border-color:var(--accent-2)}
@media(max-width:768px){.staff-root{padding:16px 16px 90px 16px}.staff-grid{grid-template-columns:1fr}}

/* ===== LIGHT LOCK - SOFT APPLE DARKER ===== */
[data-theme="light"] .staff-root{ background: #E6DFD3 !important; min-height:100vh; }
[data-theme="light"] .staff-root h2{ color: #121214 !important; }
[data-theme="light"] .staff-root h2 span{ color: #8B8680 !important; }
[data-theme="light"] .staff-root > div > p{ color: #6B6560 !important; }
[data-theme="light"] .staff-lock{ background: #1C1C1F !important; border-color: #27272A !important; color: #F4F4F5 !important; }
[data-theme="light"] .staff-lock div{ color: #F4F4F5 !important; }
[data-theme="light"] .staff-lock div[style*="color:var(--text-muted)"]{ color: #A1A1AA !important; }
[data-theme="light"] .staff-card{ background: #1C1C1F !important; border-color: #27272A !important; }
[data-theme="light"] .staff-card div{ color: #F4F4F5 !important; }
[data-theme="light"] .staff-card div[style*="color:var(--text-muted)"]{ color: #A1A1AA !important; }

/* Admin access notice - ORANGE in light mode */
[data-theme="light"] #staffContent > div[style*="rgba(200,255,0"]{
  background: rgba(255,78,31,0.12) !important;
  border-color: rgba(255,78,31,0.35) !important;
  color: #FF4E1F !important;
  font-weight: 700 !important;
}

      </style>
      <div class="staff-root">
        <div id="staffHeader">
          <h2 style="font-size:32px;font-weight:900;letter-spacing:-1px;margin:0">Staff <span style="font-size:11px;color:var(--text-muted);font-weight:500">— D1 Admin Only</span></h2>
          <p style="color:var(--text-muted);margin:8px 0 20px 0;font-size:13px">Team KOVA — From D1 later, for now mock. Visible only when admin signs in (D1 is_admin=1).</p>
        </div>
        <div id="staffContent" style="min-height:200px;display:grid;place-items:center;color:var(--text-muted);font-size:13px">Checking admin access via D1...</div>
      </div>
    `;
  },

  
  async afterRender() {
    const contentEl = document.getElementById('staffContent');
    if(!contentEl) return;

    const token = localStorage.getItem('kova_token');
    let isAdmin = localStorage.getItem('kova_is_admin')==='1';
    let guest = null;
    try{ guest = JSON.parse(localStorage.getItem('kova_guest')||'null'); }catch{}

    // If token exists, verify via D1 for real is_admin
    if(token && !isAdmin){
      try{
        const r = await fetch(`${this.GUEST_WORKER}/api/guest/me`, {headers:{'Authorization':`Bearer ${token}`}});
        if(r.ok){
          const d = await r.json();
          if(d.guest){
            isAdmin = !!d.guest.is_admin;
            guest = d.guest;
            localStorage.setItem('kova_is_admin', isAdmin?'1':'0');
            localStorage.setItem('kova_guest', JSON.stringify(d.guest));
          }
        }
      }catch(e){}
    }

    if(!isAdmin){
      contentEl.innerHTML = `
        <div class="staff-lock">
          <div style="font-size:40px">🔒</div>
          <div style="font-size:18px;font-weight:800;margin-top:12px;color:var(--text-main)">Admin Only — Staff Hidden</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:6px;max-width:360px;margin-left:auto;margin-right:auto;line-height:1.5">
            This page is locked. Sign in as admin <b style="color:var(--text-main)">${this.ALLOWED_ADMIN}</b> to unlock Staff. Guest carts, wishlists & orders are saved in D1 safely.
          </div>
          <div style="margin-top:16px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
            <button onclick="location.hash='#/auth'" style="background:var(--accent);color:#000;border:0;padding:10px 18px;border-radius:999px;font-weight:800;font-size:12px;cursor:pointer">Sign In as Admin →</button>
            <button onclick="location.hash='#/menu'" style="background:var(--bg-app);border:1px solid var(--border);color:var(--text-main);padding:10px 18px;border-radius:999px;font-weight:700;font-size:12px;cursor:pointer">Browse Menu</button>
          </div>
          <div style="margin-top:14px;font-size:10px;color:var(--text-muted)">D1 Check: ${guest? `Logged as ${guest.email} — is_admin=${guest.is_admin?'YES':'NO'}` : 'Not logged in'}</div>
        </div>
      `;
      return;
    }

    // Admin granted - show staff grid
    const staff = [
      { name: 'Chef Omar', role: 'Head of Flame', color: '#C8FF00', bio: '14h smoke, Hajar stone master' },
      { name: 'Sara Al-Hassan', role: 'Pastry — Stone', color: '#FF4E1F', bio: 'Wood-fired flatbread, 90 sec puff' },
      { name: 'Khalid M.', role: 'Smoke Pitmaster', color: '#A1A1AA', bio: 'Ghaf & sidr wood, low & slow' },
      { name: 'Emma D.', role: 'GM — KOVA OS Owner', color: '#C8FF00', bio: 'DOPETONE • NOIR • D1 + R2 owner' },
    ];

    contentEl.style.display='block';
    contentEl.innerHTML = `
      <div style="background:rgba(200,255,0,0.08);border:1px solid rgba(200,255,0,0.25);color:var(--accent);padding:10px 14px;border-radius:12px;font-size:12px;margin-bottom:16px">
        ✅ Admin access granted via D1 — ${guest? guest.email : this.ALLOWED_ADMIN} — is_admin=1 — Staff visible
      </div>
      <div class="staff-grid" id="staffGrid"></div>
    `;

    const grid = document.getElementById('staffGrid');
    staff.forEach(s => {
      grid.insertAdjacentHTML('beforeend', `
        <div class="staff-card">
          <div style="display:flex;gap:14px;align-items:center;">
            <div style="width:52px;height:52px;border-radius:50%;background:${s.color};color:#000;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:18px;flex-shrink:0">${s.name[0]}</div>
            <div style="min-width:0">
              <div style="font-weight:800;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--text-main)">${s.name}</div>
              <div style="font-size:12px;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${s.role}</div>
              <div style="font-size:10px;color:var(--text-muted);margin-top:2px;opacity:0.8">${s.bio}</div>
            </div>
          </div>
        </div>
      `);
    });
  }
};
