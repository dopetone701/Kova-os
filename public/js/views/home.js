// KOVA Home — CENTER LOGO MOBILE + BIG WHITE + LOCKED - FIXED O LEMON GREEN + PC HERO LOGO WHEN SIDEBAR CLOSED + GUEST D1 SAFE
const API_BASE = "https://kova-clean-api.dopetone701.workers.dev";
const GUEST_WORKER = "https://kova-guest-sign-up.dopetone701.workers.dev";

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

    // Guest D1 safe - welcome back
    let guest = null;
    let cartCount = 0;
    try{ 
      guest = JSON.parse(localStorage.getItem('kova_guest')||'null');
      const cart = JSON.parse(localStorage.getItem('kova_cart')||'[]');
      cartCount = cart.reduce((s,i)=>s+(i.qty||1),0);
    }catch{}

    return `
      <style>
        html, body, #app, #app-view { overflow-x:hidden !important; max-width:100vw !important; }
        body { overscroll-behavior-x:none !important; touch-action:pan-y !important; }
        .kova-home-root{margin:-24px !important;width:calc(100% + 48px) !important;min-width:calc(100% + 48px);background:var(--bg-app);color:var(--text-main);font-family:Inter,system-ui;box-sizing:border-box;overflow-x:clip !important}
        .kova-inner{max-width:1300px;margin:0 auto;padding-left:40px;padding-right:40px;box-sizing:border-box;width:100%}
        .theme-text{color:var(--text-main)} .theme-muted{color:var(--text-muted)} .theme-card{background:var(--bg-card);border:1px solid var(--border);transition:border-color .2s, transform .2s}
        .theme-card:hover{border-color:var(--border);transform:translateY(-2px)}
        .theme-strip{background:var(--bg-sidebar);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
        .keep-dark,.keep-dark *{color:#F4F4F5 !important}
        .keep-dark .theme-muted{color:#A1A1AA !important}
        .keep-dark .btn-green-fix{color:#000 !important;background:var(--accent) !important}
        .flame-section{margin-top:44px;padding-bottom:20px;overflow:hidden}
        .flame-header{display:flex;justify-content:space-between;align-items:center;padding:0 40px;max-width:1300px;margin:0 auto 16px auto;box-sizing:border-box}
        .flame-row{display:grid;grid-template-columns:repeat(6,1fr);gap:16px;max-width:1300px;margin:0 auto;padding:0 40px;box-sizing:border-box}
        .flame-card{background:var(--bg-card);border:1px solid var(--border);border-radius:16px;overflow:hidden;cursor:pointer;transition:.2s}
        .flame-card:hover{border-color:var(--accent-2) !important}
        .badge-trending{background:var(--accent-2);color:#fff;font-size:10px;font-weight:800;padding:4px 10px;border-radius:999px}
        .live-dot{width:8px;height:8px;background:var(--accent-2);border-radius:50%;display:inline-block;box-shadow:0 0 8px var(--accent-2)}

        /* WHITE TEXT BIGGER PC + MOBILE */
        .hero-title{font-size:clamp(62px,9vw,108px) !important;font-weight:900;letter-spacing:-5px;line-height:0.84;margin:0;color:#fff !important}
        .hero-sub{font-size:clamp(20px,2.2vw,24px) !important}
        .mobile-kova{display:none}

        /* PC KOVA LOGO WHEN SIDEBAR CLOSED - HIDDEN BY DEFAULT */
        .pc-kova-closed{
          display:none;
          position:absolute;
          top:32px;
          left:50%;
          transform:translateX(-50%);
          z-index:5;
          text-align:center;
          flex-direction:column;
          align-items:center;
        }
        .pc-kova-closed .logo{font-weight:900;font-size:52px;letter-spacing:-2px;line-height:1;color:#fff}
        .pc-kova-closed .logo .o-green{color:var(--accent) !important}
        .pc-kova-closed .sub{font-size:12px;font-weight:500;margin-top:8px;letter-spacing:0.5px;color:rgba(255,255,255,0.7);white-space:nowrap}
        body.sidebar-collapsed .pc-kova-closed{display:flex !important}

        /* Explore by Fire - hover only border, no static orange */
        .explore-card{border-radius:16px;padding:20px;cursor:pointer;border:1px solid var(--border) !important;transition:all .22s ease}
        .explore-card:hover{border-color:var(--accent-2) !important;transform:translateY(-3px);box-shadow:0 8px 24px rgba(255,78,31,.15)}
        .explore-card.flame-hover:hover{border-color:var(--accent-2) !important}
        .explore-card.raw-hover:hover{border-color:#38bdf8 !important}
        .explore-card.stone-hover:hover{border-color:var(--text-muted) !important}
        .explore-card.drinks-hover:hover{border-color:var(--accent) !important}

        .grid-3{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:14px;align-items:stretch}
        .tr-side{display:flex;flex-direction:column;gap:14px}
        .tr-side .theme-card{flex:1;min-height:190px;border-radius:18px;overflow:hidden;display:flex}
        .tr-side img{width:120px;min-width:120px;object-fit:cover}
        .tr-side-content{padding:16px;flex:1;display:flex;flex-direction:column;justify-content:center}

        .guest-welcome{
          background:rgba(10,10,11,0.8);backdrop-filter:blur(12px);border:1px solid rgba(200,255,0,0.2);
          border-radius:999px;padding:8px 16px;display:inline-flex;gap:10px;align-items:center;
          font-size:12px;color:#fff;margin-bottom:16px
        }
        .guest-welcome .dot{width:8px;height:8px;background:var(--accent);border-radius:50%;box-shadow:0 0 8px var(--accent)}

        @media(max-width:768px){
          .kova-home-root{margin:0 !important;margin-left:-16px !important;margin-right:-16px !important;width:calc(100% + 32px) !important;min-width:calc(100% + 32px) !important;max-width:calc(100% + 32px) !important;overflow-x:hidden !important}
          .kova-inner{padding-left:20px !important;padding-right:20px !important}
          .hero-fix{height:88vh !important;min-height:600px !important;overflow:hidden !important}
          .mobile-kova{
            display:flex !important; flex-direction:column; align-items:center; justify-content:center;
            position:absolute; top:32px; left:50%; transform:translateX(-50%); z-index:5; text-align:center;
          }
          .mobile-kova .logo{font-weight:900;font-size:38px;letter-spacing:-1.5px;line-height:1;color:#fff}
          .mobile-kova .logo .o-green{color:var(--accent) !important}
          .mobile-kova .sub{font-size:11px;font-weight:500;margin-top:6px;letter-spacing:0.5px;color:rgba(255,255,255,0.75);white-space:nowrap}
          .pc-kova-closed{display:none !important}
          .hero-title{font-size:48px !important;letter-spacing:-2.2px !important;line-height:0.86 !important;margin-top:18px !important}
          .hero-sub{font-size:19px !important}
          .grid-3{grid-template-columns:1fr !important}
          .grid-4{grid-template-columns:repeat(2,1fr) !important;gap:10px !important}
          .grid-2{grid-template-columns:1fr !important}
          .flame-header{padding:0 20px !important}
          .flame-row{display:flex !important;overflow-x:auto !important;padding:0 20px 16px 20px !important;gap:12px !important;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none}
          .flame-row::-webkit-scrollbar{display:none}
          .flame-card{min-width:200px !important;max-width:200px !important;flex-shrink:0 !important;scroll-snap-align:start}
        }
      </style>

      <div class="kova-home-root">
        <div class="hero-fix keep-dark" style="height:92vh;min-height:720px;background:url('${heroUrl}') center/cover no-repeat;position:relative;width:100%;overflow:hidden">
          <div class="mobile-kova">
            <div class="logo">K<span class="o-green">O</span>VA</div>
            <div class="sub ar">كوفا — مطبخ الجمر &nbsp;•&nbsp; LIVE FIRE • JLT</div>
          </div>
          <div class="pc-kova-closed" id="pcKovaLogo">
            <div class="logo">K<span class="o-green">O</span>VA</div>
            <div class="sub ar">كوفا — مطبخ الجمر • LIVE FIRE • JLT</div>
          </div>
          <div style="position:absolute;inset:0;background:linear-gradient(0deg,var(--bg-app) 10%,rgba(10,10,11,0.88) 38%,rgba(10,10,11,0.25) 75%)"></div>
          <div class="kova-inner" style="position:relative;z-index:2;height:100%;display:flex;flex-direction:column;justify-content:flex-end;padding-top:40px;padding-bottom:48px;">
            <div style="display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap">
              <span style="background:var(--accent);color:#000 !important;font-size:11px;font-weight:800;padding:6px 12px;border-radius:999px">🔥 Wood Fired • 900°C Stone</span>
              <span style="background:var(--bg-card);border:1px solid var(--border);color:var(--text-main);font-size:11px;padding:6px 12px;border-radius:999px;display:flex;align-items:center;gap:6px"><span class="live-dot"></span> JLT, Dubai • 4.9★ (1.2k)</span>
            </div>
            ${guest? `
              <div class="guest-welcome">
                <span class="dot"></span>
                <span>Welcome back, <b>${guest.name}</b> • ${cartCount} items • <a href="#/orders" style="color:var(--accent);text-decoration:none;font-weight:800">My Orders →</a></span>
              </div>
            ` : `
              <div class="guest-welcome" style="background:rgba(255,255,255,0.08);border-color:var(--border)">
                <span class="dot" style="background:var(--accent-2);box-shadow:0 0 8px var(--accent-2)"></span>
                <span>Guest Mode — <a href="#/auth" style="color:var(--accent);text-decoration:none;font-weight:800">Sign in</a> to save cart across devices (D1 + R2)</span>
              </div>
            `}
            <h1 class="hero-title">You're in the<br>right place.</h1>
            <p class="hero-sub" style="color:#A1A1AA;max-width:600px;margin-top:18px;line-height:1.4">KOVA is fire, smoke & stone. 14-hour lamb, hand-pulled cheese breads, raw plates cured in yuzu. No shortcuts. Just flame.</p>
            <p class="ar" style="color:var(--accent);margin-top:10px;font-size:21px;font-weight:700">أهلاً بك في كوفا — حيث النار تلتقي بالحجر</p>
            <div style="margin-top:28px;display:flex;gap:12px;flex-wrap:wrap">
              <button onclick="window.kovaGoMenu('All')" class="btn-green-fix" style="background:var(--accent) !important;color:#000 !important;font-weight:900;padding:16px 32px;border-radius:999px;border:none;font-size:15px;cursor:pointer">Explore Full Menu — 250+ Dishes →</button>
              <button onclick="location.hash='#/orders'" style="background:var(--bg-card);border:1px solid var(--border);color:var(--text-main);padding:16px 26px;border-radius:999px;font-size:14px;cursor:pointer"><span style="color:var(--accent-2)">●</span> ${guest? `My Orders • ${cartCount} in cart` : 'Book Table • Tonight 94% Full'}</button>
            </div>
          </div>
        </div>

        <div class="theme-strip" style="width:100%;"><div class="kova-inner" style="padding-top:32px;padding-bottom:32px;display:flex;gap:40px;flex-wrap:wrap"><div style="flex:1;min-width:280px"><h3 style="font-size:14px;letter-spacing:1px;color:var(--accent);margin:0 0 8px 0">WELCOME TO KOVA</h3><p class="theme-text" style="font-size:18px;line-height:1.4;margin:0">We don't do fast food. We do fire food. Every dish hits 800°C stone, ghaf wood smoke, or 12-hour slow fire.</p></div><div style="flex:1;min-width:280px;display:grid;grid-template-columns:1fr 1fr;gap:16px"><div><div class="theme-text" style="font-weight:800;font-size:22px;color:var(--accent-2)">14H</div><div class="theme-muted" style="font-size:13px">Slow smoked lamb</div></div><div><div class="theme-text" style="font-weight:800;font-size:22px">900°</div><div class="theme-muted" style="font-size:13px">Hajar stone oven</div></div><div><div class="theme-text" style="font-weight:800;font-size:22px">100%</div><div class="theme-muted" style="font-size:13px">Halal, fresh</div></div><div><div class="theme-text" style="font-weight:800;font-size:22px">4.9★</div><div class="theme-muted" style="font-size:13px">1,200+ guests</div></div></div></div></div>

        
        <div class="kova-inner" style="padding-top:40px;">
          <div style="display:flex;justify-content:space-between;align-items:end;margin-bottom:18px;flex-wrap:wrap;gap:10px"><div><h2 class="theme-text" style="font-size:26px;font-weight:900;letter-spacing:-1px;margin:0">🔥 Trending Now</h2><p class="theme-muted" style="font-size:13px;margin-top:4px">What Dubai is ordering today</p></div><button onclick="window.kovaGoMenu('All')" class="theme-card theme-text" style="padding:8px 16px;border-radius:999px;font-size:12px;cursor:pointer">View Full Menu →</button></div>
          <div class="grid-3">
            <div class="theme-card keep-dark" style="border-radius:16px;overflow:hidden;position:relative;min-height:380px;cursor:pointer" onclick="window.kovaGoMenu('All')"><img src="${(trending[0]?.image||'')}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"><div style="position:absolute;inset:0;background:linear-gradient(0deg, #0A0A0B 0%, transparent 60%)"></div><div style="position:absolute;bottom:0;padding:20px;width:100%;box-sizing:border-box"><span class="badge-trending">#1 TRENDING • 🔥 HOT</span><h3 style="font-size:22px;font-weight:800;margin:10px 0 4px 0;color:#fff">${trending[0]?.name||'Wagyu Ribeye — Hajar Stone'}</h3><p style="color:#A1A1AA;font-size:12px;margin:0">${trending[0]?.description||'45-day dry-aged'} • 98% loved</p><div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap"><span style="background:var(--bg-hover);padding:6px 12px;border-radius:999px;font-size:12px;font-weight:700;color:#fff">${trending[0]?.price||385} AED</span><span style="background:var(--accent-2);color:white;padding:6px 12px;border-radius:999px;font-size:11px;font-weight:700">🔥 240 ordered today</span></div></div></div>
            <div class="tr-side">${trending.slice(1,3).map(it=>`<div class="theme-card" style="cursor:pointer" onclick="window.kovaGoMenu('${it.category||'All'}')"><img src="${it.image}"><div class="tr-side-content"><div style="font-size:11px;color:var(--accent);font-weight:800">CHEF'S PICK</div><div class="theme-text" style="font-weight:700;margin-top:4px">${it.name}</div><div class="theme-muted" style="font-size:11px;margin-top:4px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${it.description||''}</div><div class="theme-text" style="margin-top:10px;font-weight:700">${it.price} AED <span style="color:var(--accent-2);font-weight:800;font-size:11px">• HOT</span></div></div></div>`).join('')}</div>
            <div class="tr-side"><div style="background:var(--accent);border-radius:16px;padding:18px;color:#000"><div style="font-weight:800;font-size:16px;color:#000">For Every Diet 🌿</div><div style="font-size:12px;margin-top:6px;line-height:1.4;font-weight:500;color:#000">Vegan? Gluten-free? Dairy-free? We got you.</div><div style="display:flex;gap:6px;margin-top:12px;flex-wrap:wrap"><span onclick="window.kovaGoMenu('Vegan')" style="background:black;color:var(--accent);padding:4px 10px;border-radius:999px;font-size:10px;font-weight:700;cursor:pointer">VG 42</span><span style="background:black;color:var(--accent);padding:4px 10px;border-radius:999px;font-size:10px;font-weight:700">V 58</span><span onclick="window.kovaGoMenu('Gluten Free')" style="background:black;color:var(--accent);padding:4px 10px;border-radius:999px;font-size:10px;font-weight:700;cursor:pointer">GF 35</span></div></div>${trending.slice(3,4).map(it=>`<div class="theme-card" style="cursor:pointer" onclick="window.kovaGoMenu('${it.category||'All'}')"><img src="${it.image}"><div class="tr-side-content"><div class="theme-text" style="font-weight:700">${it.name}</div><div class="theme-muted" style="font-size:11px;margin-top:4px">${it.description||''}</div><div class="theme-text" style="margin-top:10px;font-weight:700">${it.price} AED</div></div></div>`).join('')}</div>
          </div>
          <h2 class="theme-text" style="font-size:22px;font-weight:900;margin:44px 0 16px 0;">Explore by Fire</h2>
          <div class="grid-4" style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
            <div onclick="window.kovaGoMenu('Flame')" class="theme-card explore-card flame-hover"><div style="font-size:28px">🔥</div><div class="theme-text" style="font-weight:800;margin-top:8px">Flame</div><div class="theme-muted" style="font-size:12px;margin-top:4px">wood & ember</div><div style="color:var(--accent-2);font-size:12px;margin-top:12px;font-weight:700">View →</div></div>
            <div onclick="window.kovaGoMenu('Raw')" class="theme-card explore-card raw-hover"><div style="font-size:28px">❄️</div><div class="theme-text" style="font-weight:800;margin-top:8px">Raw & Cold</div><div class="theme-muted" style="font-size:12px;margin-top:4px">ceviche</div><div style="color:var(--accent);font-size:12px;margin-top:12px;font-weight:700">View →</div></div>
            <div onclick="window.kovaGoMenu('Stone')" class="theme-card explore-card stone-hover"><div style="font-size:28px">🪨</div><div class="theme-text" style="font-weight:800;margin-top:8px">Stone Baked</div><div class="theme-muted" style="font-size:12px;margin-top:4px">pizzas</div><div style="color:var(--text-muted);font-size:12px;margin-top:12px;font-weight:700">View →</div></div>
            <div onclick="window.kovaGoMenu('Drinks')" class="theme-card explore-card drinks-hover"><div style="font-size:28px">🥤</div><div class="theme-text" style="font-weight:800;margin-top:8px">Drinks</div><div class="theme-muted" style="font-size:12px;margin-top:4px">Karak, sodas</div><div style="color:var(--text-muted);font-size:12px;margin-top:12px;font-weight:700">View →</div></div>
          </div>
        </div>

        <div class="flame-section"><div class="flame-header"><h3 class="theme-text" style="margin:0;font-size:18px;font-weight:800;display:flex;align-items:center;gap:8px"><span class="live-dot"></span> Flame — Hot from Ember</h3><button onclick="window.kovaGoMenu('Flame')" class="theme-card theme-text" style="padding:8px 14px;border-radius:999px;font-size:12px;cursor:pointer">View All Flame →</button></div><div class="flame-row">${flames.map(it=>`<div onclick="window.kovaGoMenu('Flame')" class="flame-card"><img src="${it.image}" style="height:140px;width:100%;object-fit:cover;display:block;"><div style="padding:10px"><div class="theme-text" style="font-weight:700;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${it.name}</div><div style="font-size:11px;margin-top:2px;display:flex;gap:6px;align-items:center"><span class="theme-muted">${it.price} AED</span><span style="color:var(--accent-2)">• 🔥 HOT</span></div></div></div>`).join('')}</div></div>

        <div class="kova-inner" style="padding-bottom:100px;padding-top:24px"><div class="grid-2 theme-strip" style="border-radius:16px;padding:28px;display:grid;grid-template-columns:1.2fr 1fr;gap:24px"><div><h3 class="theme-text" style="margin:0;font-size:20px;font-weight:900">Why guests love KOVA</h3><ul style="list-style:none;padding:0;margin:16px 0 0 0;display:flex;flex-direction:column;gap:10px;font-size:14px;line-height:1.4" class="theme-muted"><li>🔥 <b class="theme-text">Real fire, not gas:</b> Ghaf & oak wood, 800°C Hajar stone.</li><li>🥩 <b class="theme-text">No frozen meat:</b> Daily halal delivery, dry-aged in house.</li><li>🌿 <b class="theme-text">Diet = no compromise:</b> 80+ V, VG, GF dishes marked.</li><li>☁️ <b class="theme-text">D1 Synced:</b> Cart & wishlist saved across devices, never lost.</li></ul></div><div style="background:var(--bg-app);border:1px solid var(--border);border-radius:12px;padding:18px"><div style="color:var(--accent);font-size:11px;font-weight:800;letter-spacing:1px">GUEST REVIEWS • D1 SAFE</div><div style="margin-top:12px;display:flex;flex-direction:column;gap:12px"><div class="theme-text" style="font-size:13px">“Best ribeye in Dubai.” <span class="theme-muted">— Ahmed ★★★★★</span></div><div class="theme-text" style="font-size:13px">“Finally vegan that’s not boring.” <span class="theme-muted">— Sarah</span></div><div class="theme-text" style="font-size:13px">“all you miss is to visit kova the kings in town🔥🔥!” <span class="theme-muted">— ${guest? guest.name : 'Guest'}</span></div></div></div></div></div>
      </div>
    `;
  },
  afterRender(){
    // global nav helper - hash mode Live Server safe + D1
    window.kovaGoMenu = (filter)=>{
      sessionStorage.setItem('kova_filter', filter);
      location.hash = `#/menu?filter=${encodeURIComponent(filter)}`;
      if(window.navigateMenu) window.navigateMenu(filter);
    };
    // check sidebar state for PC logo
    const checkSidebar = ()=>{
      const sb = document.getElementById('sidebar');
      if(!sb) return;
      if(sb.classList.contains('collapsed')){
        document.body.classList.add('sidebar-collapsed');
      } else {
        document.body.classList.remove('sidebar-collapsed');
      }
    };
    setTimeout(checkSidebar, 100);
    const obs = new MutationObserver(checkSidebar);
    const sbEl = document.getElementById('sidebar');
    if(sbEl) obs.observe(sbEl, {attributes:true, attributeFilter:['class','style']});
    window.addEventListener('resize', checkSidebar);
  }
};
