// KOVA Home — CUSTOMER LANDING - DOPETONE NOIR LOCKED - ORANGE BALANCED
const API_BASE = "https://kova-clean-api.dopetone701.workers.dev";

export const Home = {
  async render() {
    let heroUrl = "";
    try {
      const r = await fetch(`${API_BASE}/api/hero`);
      const d = await r.json();
      heroUrl = d.hero || d.url || d.image || "";
    } catch(e){}
    if(!heroUrl) heroUrl = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200";

    let menu = [];
    try { menu = await (await fetch(`${API_BASE}/api/menu`)).json(); } catch(e){}

    const pick = (filter, n=8) => menu.filter(i => (i.category||"").toLowerCase().includes(filter.toLowerCase())).slice(0,n);
    const trending = [...menu].sort(()=>0.5-Math.random()).slice(0,10);
    const flames = pick("flame", 6);
    const raw = pick("raw", 4);
    const stone = pick("stone", 6);

    return `
      <style>
        .kova-home-root{
          margin: -24px !important;
          width: calc(100% + 48px) !important;
          min-width: calc(100% + 48px);
          background: var(--bg-app);
          color: var(--text-main);
          font-family:Inter, system-ui;
          box-sizing: border-box;
          overflow-x: clip;
          transition: background 0.3s, color 0.3s;
        }
        .kova-inner{
          max-width:1300px;
          margin: 0 auto;
          padding-left: 40px;
          padding-right: 40px;
          box-sizing: border-box;
          width:100%;
        }
        .theme-text{ color: var(--text-main); }
        .theme-muted{ color: var(--text-muted); }
        .theme-card{ background: var(--bg-card); border:1px solid var(--border); }
        .theme-strip{ background: var(--bg-sidebar); border-top:1px solid var(--border); border-bottom:1px solid var(--border); }

        .keep-dark, .keep-dark *{ color:#F4F4F5 !important; }
        .keep-dark .theme-muted{ color:#A1A1AA !important; }

        /* FLAME SECTION - PC CENTERED GRID, MOBILE SCROLL */
        .flame-section{ margin-top:44px; padding-bottom:20px; }
        .flame-header{ display:flex; justify-content:space-between; align-items:center; padding:0 40px; max-width:1300px; margin:0 auto 16px auto; box-sizing:border-box; }
        .flame-row{
          display:grid;
          grid-template-columns:repeat(6, 1fr);
          gap:16px;
          max-width:1300px;
          margin:0 auto;
          padding:0 40px;
          box-sizing:border-box;
          justify-content:center;
        }
        .flame-card{ background: var(--bg-card); border:1px solid var(--border); border-radius:16px; overflow:hidden; cursor:pointer; transition:transform 0.2s, border-color 0.2s; }
        .flame-card:hover{ transform:translateY(-3px); border-color: var(--accent-2); }

        /* ORANGE BALANCE */
        .badge-trending{ background: var(--accent-2); color:#fff; font-size:10px; font-weight:800; padding:4px 10px; border-radius:999px; }
        .badge-chef{ background: var(--accent); color:#000; font-size:10px; font-weight:800; padding:4px 10px; border-radius:999px; }
        .live-dot{ width:8px; height:8px; background: var(--accent-2); border-radius:50%; display:inline-block; box-shadow:0 0 8px var(--accent-2); }

        @media(max-width:768px){
          .kova-home-root{ margin: -16px !important; width: calc(100% + 32px) !important; min-width: calc(100% + 32px); }
          .kova-inner{ padding-left:20px !important; padding-right:20px !important; }
          .hero-fix{ height:76vh !important; min-height:500px !important; }
          .grid-3{ grid-template-columns:1fr !important; }
          .grid-4{ grid-template-columns:repeat(2,1fr) !important; }
          .grid-2{ grid-template-columns:1fr !important; }
          .flame-header{ padding:0 20px !important; }
          .flame-section{ margin-left:-20px !important; margin-right:-20px !important; width:calc(100% + 40px) !important; }
          .flame-row{
            display:flex !important;
            overflow-x:auto !important;
            overflow-y:hidden !important;
            padding:0 20px 16px 20px !important;
            gap:12px !important;
            scroll-snap-type:x mandatory;
            -webkit-overflow-scrolling:touch;
            scrollbar-width:none;
          }
          .flame-row::-webkit-scrollbar{ display:none; }
          .flame-card{ min-width:200px !important; max-width:200px !important; flex-shrink:0 !important; scroll-snap-align:start; }
        }
      </style>

      <div class="kova-home-root">
       
        <div class="hero-fix keep-dark" style="height:92vh;min-height:640px;background:url('${heroUrl}') center/cover no-repeat;position:relative;width:100%;">
          <div style="position:absolute;inset:0;background:linear-gradient(0deg, var(--bg-app) 8%, rgba(10,10,11,0.85) 35%, rgba(10,10,11,0.3) 70%)"></div>
          <div class="kova-inner" style="position:relative;z-index:2;height:100%;display:flex;flex-direction:column;justify-content:flex-end;padding-top:40px;padding-bottom:48px;">
            <div style="display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap">
              <span style="background:var(--accent);color:black;font-size:11px;font-weight:800;padding:6px 12px;border-radius:999px">🔥 Wood Fired • 900°C Stone</span>
              <span style="background:var(--bg-card);border:1px solid var(--border);color:var(--text-main);font-size:11px;padding:6px 12px;border-radius:999px;display:flex;align-items:center;gap:6px"><span class="live-dot"></span> JLT, Dubai • 4.9★ (1.2k)</span>
            </div>
            <h1 style="font-size:clamp(40px,7vw,88px);font-weight:900;letter-spacing:-4px;line-height:0.85;margin:0">You're in the<br>right place.</h1>
            <p style="font-size:clamp(16px,2vw,22px);color:#A1A1AA;max-width:560px;margin-top:16px;line-height:1.4">KOVA is fire, smoke & stone. 14-hour lamb, hand-pulled cheese breads, raw plates cured in yuzu. No shortcuts. Just flame.</p>
            <p class="ar" style="color:var(--accent);margin-top:8px;font-size:20px;font-weight:600">أهلاً بك في كوفا — حيث النار تلتقي بالحجر</p>
            <div style="margin-top:28px;display:flex;gap:12px;flex-wrap:wrap">
              <button onclick="sessionStorage.setItem('kova_filter','');location.href='/menu'" style="background:var(--accent);color:#000;font-weight:800;padding:16px 32px;border-radius:999px;border:none;font-size:15px;cursor:pointer">Explore Full Menu — 250+ Dishes →</button>
              <button style="background:var(--bg-card);border:1px solid var(--border);color:var(--text-main);padding:16px 26px;border-radius:999px;font-size:14px"><span style="color:var(--accent-2)">●</span> Book Table • Tonight 94% Full</button>
            </div>
          </div>
        </div>

        <div class="theme-strip" style="width:100%;">
          <div class="kova-inner" style="padding-top:32px;padding-bottom:32px;display:flex;gap:40px;flex-wrap:wrap">
            <div style="flex:1;min-width:280px"><h3 style="font-size:14px;letter-spacing:1px;color:var(--accent);margin:0 0 8px 0">WELCOME TO KOVA</h3><p class="theme-text" style="font-size:18px;line-height:1.4;margin:0">We don't do fast food. We do fire food. Every dish hits 800°C stone, ghaf wood smoke, or 12-hour slow fire.</p></div>
            <div style="flex:1;min-width:280px;display:grid;grid-template-columns:1fr 1fr;gap:16px">
              <div><div class="theme-text" style="font-weight:800;font-size:22px;color:var(--accent-2)">14H</div><div class="theme-muted" style="font-size:13px">Slow smoked lamb</div></div>
              <div><div class="theme-text" style="font-weight:800;font-size:22px">900°</div><div class="theme-muted" style="font-size:13px">Hajar stone oven</div></div>
              <div><div class="theme-text" style="font-weight:800;font-size:22px">100%</div><div class="theme-muted" style="font-size:13px">Halal, fresh</div></div>
              <div><div class="theme-text" style="font-weight:800;font-size:22px">4.9★</div><div class="theme-muted" style="font-size:13px">1,200+ guests</div></div>
            </div>
          </div>
        </div>

        <div class="kova-inner" style="padding-top:40px;">
          <div style="display:flex;justify-content:space-between;align-items:end;margin-bottom:18px;flex-wrap:wrap;gap:10px">
            <div><h2 class="theme-text" style="font-size:26px;font-weight:900;letter-spacing:-1px;margin:0">🔥 Trending Now</h2><p class="theme-muted" style="font-size:13px;margin-top:4px">What Dubai is ordering today</p></div>
            <button onclick="location.href='/menu'" class="theme-card theme-text" style="padding:8px 16px;border-radius:999px;font-size:12px;cursor:pointer">View Full Menu →</button>
          </div>
          <div class="grid-3" style="display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:14px">
            <div class="theme-card keep-dark" style="border-radius:16px;overflow:hidden;position:relative;min-height:380px">
              <img src="${(trending[0]?.image||'')}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">
              <div style="position:absolute;inset:0;background:linear-gradient(0deg, #0A0A0B 0%, transparent 60%)"></div>
              <div style="position:absolute;bottom:0;padding:20px;width:100%;box-sizing:border-box">
                <span class="badge-trending">#1 TRENDING • <span style="color:#fff">🔥 HOT</span></span>
                <h3 style="font-size:22px;font-weight:800;margin:10px 0 4px 0;color:#fff">${trending[0]?.name||'Wagyu Ribeye — Hajar Stone'}</h3>
                <p style="color:#A1A1AA;font-size:12px;margin:0">${trending[0]?.description||'45-day dry-aged'} • 98% loved</p>
                <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap"><span style="background:var(--bg-hover);padding:6px 12px;border-radius:999px;font-size:12px;font-weight:700;color:#fff">${trending[0]?.price||385} AED</span><span style="background:var(--accent-2);color:white;padding:6px 12px;border-radius:999px;font-size:11px;font-weight:700">🔥 240 ordered today</span></div>
              </div>
            </div>
            <div style="display:flex;flex-direction:column;gap:14px">
              ${trending.slice(1,3).map(it=>`
                <div class="theme-card" style="border-radius:16px;overflow:hidden;display:flex;height:182px">
                  <img src="${it.image}" style="width:110px;object-fit:cover"><div style="padding:14px;flex:1"><div style="font-size:11px;color:var(--accent);font-weight:800">CHEF'S PICK</div><div class="theme-text" style="font-weight:700;margin-top:4px">${it.name}</div><div class="theme-muted" style="font-size:11px;margin-top:4px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${it.description||''}</div><div class="theme-text" style="margin-top:10px;font-weight:700">${it.price} AED <span style="color:var(--accent-2);font-weight:800;font-size:11px">• HOT</span></div></div>
                </div>`).join('')}
            </div>
            <div style="display:flex;flex-direction:column;gap:14px">
              <div style="background:var(--accent);border-radius:16px;padding:18px;color:#000">
                <div style="font-weight:900;font-size:16px">For Every Diet 🌿</div>
                <div style="font-size:12px;margin-top:6px;line-height:1.4;font-weight:500">Vegan? Gluten-free? Dairy-free? We got you.</div>
                <div style="display:flex;gap:6px;margin-top:12px;flex-wrap:wrap"><span style="background:black;color:var(--accent);padding:4px 10px;border-radius:999px;font-size:10px;font-weight:700">VG 42</span><span style="background:black;color:var(--accent);padding:4px 10px;border-radius:999px;font-size:10px;font-weight:700">V 58</span><span style="background:black;color:var(--accent);padding:4px 10px;border-radius:999px;font-size:10px;font-weight:700">GF 35</span></div>
              </div>
              ${trending.slice(3,4).map(it=>`
                <div class="theme-card" style="border-radius:16px;overflow:hidden;display:flex;height:182px"><img src="${it.image}" style="width:110px;object-fit:cover"><div style="padding:14px"><div class="theme-text" style="font-weight:700">${it.name}</div><div class="theme-muted" style="font-size:11px;margin-top:4px">${it.description||''}</div><div class="theme-text" style="margin-top:10px;font-weight:700">${it.price} AED</div></div></div>`).join('')}
            </div>
          </div>

          <h2 class="theme-text" style="font-size:22px;font-weight:900;margin:44px 0 16px 0;">Explore by Fire</h2>
          <div class="grid-4" style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
            <div onclick="sessionStorage.setItem('kova_filter','Flame');location.href='/menu'" class="theme-card" style="border-radius:16px;padding:20px;cursor:pointer;border-color:var(--accent-2)"><div style="font-size:28px">🔥</div><div class="theme-text" style="font-weight:800;margin-top:8px">Flame</div><div class="theme-muted" style="font-size:12px;margin-top:4px">${flames.length}+ wood & ember</div><div style="color:var(--accent-2);font-size:12px;margin-top:12px;font-weight:700">View →</div></div>
            <div onclick="sessionStorage.setItem('kova_filter','Raw');location.href='/menu'" class="theme-card" style="border-radius:16px;padding:20px;cursor:pointer"><div style="font-size:28px">❄️</div><div class="theme-text" style="font-weight:800;margin-top:8px">Raw & Cold</div><div class="theme-muted" style="font-size:12px;margin-top:4px">${raw.length}+ ceviche</div><div style="color:var(--accent);font-size:12px;margin-top:12px;font-weight:700">View →</div></div>
            <div onclick="sessionStorage.setItem('kova_filter','Stone');location.href='/menu'" class="theme-card" style="border-radius:16px;padding:20px;cursor:pointer"><div style="font-size:28px">🪨</div><div class="theme-text" style="font-weight:800;margin-top:8px">Stone Baked</div><div class="theme-muted" style="font-size:12px;margin-top:4px">${stone.length}+ pizzas</div><div style="color:var(--text-muted);font-size:12px;margin-top:12px;font-weight:700">View →</div></div>
            <div onclick="sessionStorage.setItem('kova_filter','Drinks');location.href='/menu'" class="theme-card" style="border-radius:16px;padding:20px;cursor:pointer"><div style="font-size:28px">🥤</div><div class="theme-text" style="font-weight:800;margin-top:8px">Drinks</div><div class="theme-muted" style="font-size:12px;margin-top:4px">Karak, sodas</div><div style="color:var(--text-muted);font-size:12px;margin-top:12px;font-weight:700">View →</div></div>
          </div>
        </div>

        <div class="flame-section">
          <div class="flame-header">
            <h3 class="theme-text" style="margin:0;font-size:18px;font-weight:800;display:flex;align-items:center;gap:8px"><span class="live-dot"></span> Flame — Hot from Ember</h3>
            <button onclick="sessionStorage.setItem('kova_filter','Flame');location.href='/menu'" class="theme-card theme-text" style="padding:8px 14px;border-radius:999px;font-size:12px;cursor:pointer">View All Flame →</button>
          </div>
          <div class="flame-row">
            ${flames.map(it=>`
              <div onclick="sessionStorage.setItem('kova_filter','Flame');location.href='/menu'" class="flame-card">
                <img src="${it.image}" style="height:140px;width:100%;object-fit:cover;display:block;">
                <div style="padding:10px"><div class="theme-text" style="font-weight:700;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${it.name}</div><div style="font-size:11px;margin-top:2px;display:flex;gap:6px;align-items:center"><span class="theme-muted">${it.price} AED</span><span style="color:var(--accent-2)">• 🔥 HOT</span></div></div>
              </div>`).join('')}
          </div>
        </div>

        <div class="kova-inner" style="padding-bottom:100px;padding-top:24px">
          <div class="grid-2 theme-strip" style="border-radius:16px;padding:28px;display:grid;grid-template-columns:1.2fr 1fr;gap:24px">
            <div><h3 class="theme-text" style="margin:0;font-size:20px;font-weight:900">Why guests love KOVA</h3>
              <ul style="list-style:none;padding:0;margin:16px 0 0 0;display:flex;flex-direction:column;gap:10px;font-size:14px;line-height:1.4" class="theme-muted">
                <li>🔥 <b class="theme-text">Real fire, not gas:</b> Ghaf & oak wood, 800°C Hajar stone.</li>
                <li>🥩 <b class="theme-text">No frozen meat:</b> Daily halal delivery, dry-aged in house.</li>
                <li>🌿 <b class="theme-text">Diet = no compromise:</b> 80+ V, VG, GF dishes marked.</li>
              </ul>
            </div>
            <div style="background:var(--bg-app);border:1px solid var(--border);border-radius:12px;padding:18px">
              <div style="color:var(--accent);font-size:11px;font-weight:800;letter-spacing:1px">GUEST REVIEWS</div>
              <div style="margin-top:12px;display:flex;flex-direction:column;gap:12px">
                <div class="theme-text" style="font-size:13px">“Best ribeye in Dubai.” <span class="theme-muted">— Ahmed ★★★★★</span></div>
                <div class="theme-text" style="font-size:13px">“Finally vegan that’s not boring.” <span class="theme-muted">— Sarah</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
