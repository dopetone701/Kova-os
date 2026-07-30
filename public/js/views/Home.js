// KOVA Home — CUSTOMER LANDING (NOON STYLE) - DOPETONE NOIR
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
        /* MOBILE ONLY FIX — PC NOT TOUCHED */
        @media(max-width:768px){
          html, body { overflow-x:hidden !important; }
          div[style*="margin:-24px -24px 0 -24px"]{
            width:100vw !important;
            max-width:100vw !important;
            margin-left:-50vw !important;
            margin-right:-50vw !important;
            left:50% !important;
            right:50% !important;
            position:relative !important;
            overflow-x:hidden !important;
          }
          div[style*="height:92vh"]{ height:76vh !important; min-height:500px !important; }
          div[style*="padding:40px;max-width:1300px"]{ padding:20px 16px 24px 16px !important; }
          div[style*="padding:40px;max-width:1300px"] h1{ font-size:36px !important; letter-spacing:-2px !important; }
          div[style*="padding:28px 40px;display:flex;gap:40px"]{ flex-direction:column !important; padding:20px 16px !important; gap:20px !important; }
          div[style*="max-width:1300px;padding:36px 32px"]{ padding:20px 14px 60px 14px !important; }
          div[style*="grid-template-columns:1.4fr 1fr 1fr"]{ grid-template-columns:1fr !important; }
          div[style*="grid-template-columns:repeat(4,1fr)"]{ grid-template-columns:repeat(2,1fr) !important; }
          div[style*="grid-template-columns:1.2fr 1fr"]{ grid-template-columns:1fr !important; }
          div[style*="display:flex;gap:12px;overflow-x:auto"]{ gap:10px !important; }
          div[style*="display:flex;gap:12px;overflow-x:auto"] > div{ min-width:72vw !important; width:72vw !important; flex-shrink:0 !important; }
          div[style*="display:flex;gap:12px;flex-wrap:wrap"]{ flex-direction:column !important; }
          div[style*="display:flex;gap:12px;flex-wrap:wrap"] button{ width:100% !important; justify-content:center !important; }
        }
      </style>

      <div style="margin:-24px -24px 0 -24px;width:calc(100% + 48px);background:#0A0A0D;color:#F4F4F5;font-family:Inter, system-ui">
       
        <!-- HERO - FOR CUSTOMER -->
        <div style="height:92vh;min-height:640px;background:url('${heroUrl}') center/cover no-repeat;position:relative">
          <div style="position:absolute;inset:0;background:linear-gradient(0deg, #0A0A0D 8%, rgba(10,10,13,0.85) 35%, rgba(10,10,13,0.3) 70%)"></div>
          <div style="position:relative;z-index:2;height:100%;display:flex;flex-direction:column;justify-content:flex-end;padding:40px;max-width:1300px">
            <div style="display:flex;gap:8px;margin-bottom:20px">
              <span style="background:#CBFF00;color:black;font-size:11px;font-weight:800;padding:6px 12px;border-radius:999px">🔥 Wood Fired • 900°C Stone</span>
              <span style="background:rgba(28,28,31,0.9);border:1px solid #27272A;color:#F4F4F5;font-size:11px;padding:6px 12px;border-radius:999px">📍 JLT, Dubai • 4.9★ (1.2k)</span>
            </div>
            <h1 style="font-size:clamp(40px,7vw,88px);font-weight:900;letter-spacing:-4px;line-height:0.85;margin:0">You're in the<br>right place.</h1>
            <p style="font-size:clamp(16px,2vw,22px);color:#A1A1AA;max-width:560px;margin-top:16px;line-height:1.4">KOVA is fire, smoke & stone. 14-hour lamb, hand-pulled cheese breads, raw plates cured in yuzu. No shortcuts. Just flame.</p>
            <p class="ar" style="color:#CBFF00;margin-top:8px;font-size:20px;font-weight:600">أهلاً بك في كوفا — حيث النار تلتقي بالحجر</p>
            <div style="margin-top:28px;display:flex;gap:12px;flex-wrap:wrap">
              <button onclick="location.hash='#menu'" style="background:#CBFF00;color:#0A0A0D;font-weight:800;padding:16px 32px;border-radius:999px;border:none;font-size:15px;cursor:pointer">Explore Full Menu — 250+ Dishes →</button>
              <button style="background:#1C1C1F;border:1px solid #27272A;color:#F4F4F5;padding:16px 26px;border-radius:999px;font-size:14px">Book Table • Tonight 94% Full</button>
            </div>
            <div style="margin-top:24px;display:flex;gap:24px;color:#71717A;font-size:13px">
              <span>✓ Halal • All Meats</span><span>✓ Vegetarian & Vegan Options</span><span>✓ Gluten Free Available</span>
            </div>
          </div>
        </div>

        <!-- WELCOME STRIP -->
        <div style="background:#121214;border-top:1px solid #27272A;border-bottom:1px solid #27272A;padding:28px 40px;display:flex;gap:40px;flex-wrap:wrap">
          <div style="flex:1;min-width:280px"><h3 style="font-size:14px;letter-spacing:1px;color:#CBFF00;margin:0 0 8px 0">WELCOME TO KOVA</h3><p style="font-size:18px;line-height:1.4;margin:0">We don't do fast food. We do fire food. Every dish hits 800°C stone, ghaf wood smoke, or 12-hour slow fire. If you love real flavor, you just landed right.</p></div>
          <div style="flex:1;min-width:280px;display:grid;grid-template-columns:1fr 1fr;gap:16px">
            <div><div style="color:#F4F4F5;font-weight:800;font-size:22px">14H</div><div style="color:#A1A1AA;font-size:13px">Slow smoked lamb shoulder, every day</div></div>
            <div><div style="color:#F4F4F5;font-weight:800;font-size:22px">900°</div><div style="color:#A1A1AA;font-size:13px">Hajar stone oven from Oman</div></div>
            <div><div style="color:#F4F4F5;font-weight:800;font-size:22px">100%</div><div style="color:#A1A1AA;font-size:13px">Halal, fresh, no frozen meat</div></div>
            <div><div style="color:#F4F4F5;font-weight:800;font-size:22px">4.9★</div><div style="color:#A1A1AA;font-size:13px">Rated by 1,200+ guests in Dubai</div></div>
          </div>
        </div>

        <div style="max-width:1300px;padding:36px 32px 100px 32px">
         
          <!-- TRENDING NOW - NOON STYLE MIXED CARDS -->
          <div style="display:flex;justify-content:space-between;align-items:end;margin-bottom:18px">
            <div><h2 style="font-size:26px;font-weight:900;letter-spacing:-1px;margin:0">🔥 Trending Now</h2><p style="color:#A1A1AA;font-size:13px;margin-top:4px">What Dubai is ordering today — hot from the stone</p></div>
            <button onclick="location.hash='#menu'" style="background:transparent;border:1px solid #27272A;color:#F4F4F5;padding:8px 16px;border-radius:999px;font-size:12px;cursor:pointer">View Full Menu →</button>
          </div>
          <div style="display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:14px">
            <!-- Big feature -->
            <div style="background:#1C1C1F;border:1px solid #27272A;border-radius:16px;overflow:hidden;position:relative;min-height:380px">
              <img src="${(trending[0]?.image||'')}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">
              <div style="position:absolute;inset:0;background:linear-gradient(0deg, #0A0A0D 0%, transparent 60%)"></div>
              <div style="position:absolute;bottom:0;padding:20px;width:100%">
                <span style="background:#CBFF00;color:black;font-size:10px;font-weight:800;padding:4px 10px;border-radius:999px">#1 TRENDING</span>
                <h3 style="font-size:22px;font-weight:800;margin:10px 0 4px 0">${trending[0]?.name||'Wagyu Ribeye — Hajar Stone'}</h3>
                <p style="color:#A1A1AA;font-size:12px;margin:0">${trending[0]?.description||'45-day dry-aged, 800°C stone, lime salt'} • 98% loved</p>
                <div style="margin-top:12px;display:flex;gap:8px"><span style="background:#27272A;padding:6px 12px;border-radius:999px;font-size:12px;font-weight:700">${trending[0]?.price||385} AED</span><span style="background:#FF4E1F;color:white;padding:6px 12px;border-radius:999px;font-size:11px;font-weight:700">🔥 240 ordered today</span></div>
              </div>
            </div>
            <!-- Stack -->
            <div style="display:flex;flex-direction:column;gap:14px">
              ${trending.slice(1,3).map(it=>`
                <div style="background:#1C1C1F;border:1px solid #27272A;border-radius:16px;overflow:hidden;display:flex;height:182px">
                  <img src="${it.image}" style="width:110px;object-fit:cover"><div style="padding:14px;flex:1"><div style="font-size:11px;color:#CBFF00;font-weight:800">CHEF'S PICK</div><div style="font-weight:700;margin-top:4px">${it.name}</div><div style="color:#A1A1AA;font-size:11px;margin-top:4px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${it.description||''}</div><div style="margin-top:10px;font-weight:700">${it.price} AED <span style="color:#71717A;font-weight:400;font-size:11px">• ⭐4.9</span></div></div>
                </div>`).join('')}
            </div>
            <!-- Diet card + small -->
            <div style="display:flex;flex-direction:column;gap:14px">
              <div style="background:#CBFF00;border-radius:16px;padding:18px;color:#0A0A0D">
                <div style="font-weight:900;font-size:16px">For Every Diet 🌿</div>
                <div style="font-size:12px;margin-top:6px;line-height:1.4;font-weight:500">Vegan? Gluten-free? Dairy-free? We got you. 80+ dishes marked clearly. No boring salad only.</div>
                <div style="display:flex;gap:6px;margin-top:12px;flex-wrap:wrap"><span style="background:black;color:#CBFF00;padding:4px 10px;border-radius:999px;font-size:10px;font-weight:700">VG 42</span><span style="background:black;color:#CBFF00;padding:4px 10px;border-radius:999px;font-size:10px;font-weight:700">V 58</span><span style="background:black;color:#CBFF00;padding:4px 10px;border-radius:999px;font-size:10px;font-weight:700">GF 35</span></div>
              </div>
              ${trending.slice(3,4).map(it=>`
                <div style="background:#1C1C1F;border:1px solid #27272A;border-radius:16px;overflow:hidden;display:flex;height:182px"><img src="${it.image}" style="width:110px;object-fit:cover"><div style="padding:14px"><div style="font-weight:700">${it.name}</div><div style="color:#A1A1AA;font-size:11px;margin-top:4px">${it.description||''}</div><div style="margin-top:10px;font-weight:700">${it.price} AED</div></div></div>`).join('')}
            </div>
          </div>

          <!-- CATEGORY TILES - DIFFERENT TYPES -->
          <h2 style="font-size:22px;font-weight:900;margin:44px 0 16px 0;letter-spacing:-.5px">Explore by Fire</h2>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
            <div onclick="location.hash='#menu?filter=Flame'" style="background:linear-gradient(135deg,#1C1C1F,#27272A);border:1px solid #27272A;border-radius:16px;padding:20px;cursor:pointer"><div style="font-size:28px">🔥</div><div style="font-weight:800;margin-top:8px">Flame</div><div style="color:#A1A1AA;font-size:12px;margin-top:4px">${flames.length}+ wood & ember</div><div style="color:#CBFF00;font-size:12px;margin-top:12px;font-weight:700">View →</div></div>
            <div onclick="location.hash='#menu?filter=Raw'" style="background:linear-gradient(135deg,#1C1C1F,#27272A);border:1px solid #27272A;border-radius:16px;padding:20px;cursor:pointer"><div style="font-size:28px">❄️</div><div style="font-weight:800;margin-top:8px">Raw & Cold</div><div style="color:#A1A1AA;font-size:12px;margin-top:4px">${raw.length}+ ceviche, tartare</div><div style="color:#CBFF00;font-size:12px;margin-top:12px;font-weight:700">View →</div></div>
            <div onclick="location.hash='#menu?filter=Stone'" style="background:linear-gradient(135deg,#1C1C1F,#27272A);border:1px solid #27272A;border-radius:16px;padding:20px;cursor:pointer"><div style="font-size:28px">🪨</div><div style="font-weight:800;margin-top:8px">Stone Baked</div><div style="color:#A1A1AA;font-size:12px;margin-top:4px">${stone.length}+ pizzas & manakeesh</div><div style="color:#CBFF00;font-size:12px;margin-top:12px;font-weight:700">View →</div></div>
            <div onclick="location.hash='#menu?filter=Drinks'" style="background:linear-gradient(135deg,#1C1C1F,#27272A);border:1px solid #27272A;border-radius:16px;padding:20px;cursor:pointer"><div style="font-size:28px">🥤</div><div style="font-weight:800;margin-top:8px">Drinks</div><div style="color:#A1A1AA;font-size:12px;margin-top:4px">Karak, smoked sodas, 0%</div><div style="color:#CBFF00;font-size:12px;margin-top:12px;font-weight:700">View →</div></div>
          </div>

          <!-- PROOF / WHY KOVA -->
          <div style="margin-top:44px;background:#121214;border:1px solid #27272A;border-radius:16px;padding:28px;display:grid;grid-template-columns:1.2fr 1fr;gap:24px">
            <div><h3 style="margin:0;font-size:20px;font-weight:900">Why guests love KOVA (and not the other place)</h3>
              <ul style="list-style:none;padding:0;margin:16px 0 0 0;display:flex;flex-direction:column;gap:10px;color:#A1A1AA;font-size:14px;line-height:1.4">
                <li>🔥 <b style="color:#F4F4F5">Real fire, not gas:</b> Ghaf & oak wood, 800°C Hajar stone from Oman. You taste smoke, not oven.</li>
                <li>🥩 <b style="color:#F4F4F5">No frozen meat:</b> Daily halal delivery, dry-aged in house. If it's not perfect, we don't serve it.</li>
                <li>🌿 <b style="color:#F4F4F5">Diet = no compromise:</b> 80+ V, VG, GF dishes marked. Same fire, same love.</li>
                <li>⭐ <b style="color:#F4F4F5">1,200+ reviews, 4.9★:</b> Dubai knows. JLT locals, foodies, chefs — they all come for the stone.</li>
              </ul>
            </div>
            <div style="background:#0A0A0D;border:1px solid #27272A;border-radius:12px;padding:18px">
              <div style="color:#CBFF00;font-size:11px;font-weight:800;letter-spacing:1px">GUEST REVIEWS</div>
              <div style="margin-top:12px;display:flex;flex-direction:column;gap:12px">
                <div style="color:#F4F4F5;font-size:13px">“Best ribeye in Dubai. That stone is insane.” <span style="color:#71717A">— Ahmed, Google ★★★★★</span></div>
                <div style="color:#F4F4F5;font-size:13px">“Finally vegan that’s not boring. Cauliflower fire 🔥” <span style="color:#71717A">— Sarah, Instagram</span></div>
                <div style="color:#F4F4F5;font-size:13px">“Karak chai with smoke bubble show — kids loved it” <span style="color:#71717A">— Layla, Zomato</span></div>
              </div>
            </div>
          </div>

          <!-- FLAME HINTS ROW -->
          <div style="margin-top:36px">
            <div style="display:flex;justify-content:space-between;align-items:center"><h3 style="margin:0;font-size:18px;font-weight:800">🔥 Flame — Hot from Ember</h3><button onclick="location.hash='#menu?filter=Flame'" style="background:#1C1C1F;border:1px solid #27272A;color:#F4F4F5;padding:8px 14px;border-radius:999px;font-size:12px;cursor:pointer">View All Flame →</button></div>
            <div style="display:flex;gap:12px;overflow-x:auto;margin-top:14px;padding-bottom:8px">${flames.map(it=>`
              <div style="min-width:200px;background:#1C1C1F;border:1px solid #27272A;border-radius:16px;overflow:hidden"><img src="${it.image}" style="height:130px;width:100%;object-fit:cover"><div style="padding:10px"><div style="font-weight:700;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${it.name}</div><div style="color:#A1A1AA;font-size:11px;margin-top:2px">${it.price} AED • 🔥 Trending</div></div></div>`).join('')}</div>
          </div>

        </div>
      </div>
    `;
  }
};
