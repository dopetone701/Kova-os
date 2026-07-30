// KOVA Home View - Hero
export const Home = {
  async render() {
    return `
      <div style="max-width:900px;">
        <div style="margin-bottom:40px;">
          <h1 style="font-size:64px;font-weight:800;letter-spacing:-3px;line-height:0.9;">FLAME.<br>SMOKE.<br><span style="color:var(--accent)">STONE.</span></h1>
          <p class="ar" style="color:var(--text-muted);margin-top:16px;font-size:18px;">كوفا — مطبخ النار في قلب دبي</p>
          <p style="color:var(--text-muted);margin-top:12px;max-width:500px;">KOVA OS is running on <b style="color:var(--text-main)">kova-main-api</b> + D1 + KOVA-R2. App Shell ready, infinite scroll ready, dark/light ready.</p>
          <div style="margin-top:24px;display:flex;gap:12px;">
            <button class="btn-primary" onclick="history.pushState({},'','/menu');window.dispatchEvent(new PopStateEvent('popstate'))">Explore Menu</button>
            <button class="btn-secondary">Our Story</button>
          </div>
        </div>

        <div class="grid">
          <div class="card"><div class="card-body"><div class="card-title">D1 Database</div><div class="card-desc">Connected — Ready for menu, staff, orders</div><span class="tag tag-new">LIVE</span></div></div>
          <div class="card"><div class="card-body"><div class="card-title">KOVA-R2 Bucket</div><div class="card-desc">R2 storage for images, ready for upload</div><span class="tag tag-new">LIVE</span></div></div>
          <div class="card"><div class="card-body"><div class="card-title">Admin Locked</div><div class="card-desc">Admin button only visible to selected emails — rule locked</div><span class="tag tag-hot">SECURE</span></div></div>
        </div>
      </div>
    `;
  }
};
