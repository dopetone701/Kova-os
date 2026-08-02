// KOVA Admin OS — CLOUD R2 READY + BULK INJECTOR — DOPETONE PRO — LIGHT FIXED
import { api } from '../services/api.js';

const WORKER_URL = 'https://kova-clean-api.dopetone701.workers.dev';
const GUEST_WORKER = 'https://kova-guest-sign-up.dopetone701.workers.dev';
const ALLOWED_ADMIN = 'dopetone701@gmail.com';

export const Admin = {
  activeTab: 'menu',
  bulkFiles: [],
  isAdmin: false,

  async checkAdmin(){
    const token = localStorage.getItem('kova_token');
    let isAdmin = localStorage.getItem('kova_is_admin')==='1';
    try{
      if(token){
        const r = await fetch(`${GUEST_WORKER}/api/guest/me`, {headers:{'Authorization':`Bearer ${token}`}});
        if(r.ok){
          const d = await r.json();
          if(d.guest && d.guest.is_admin){
            isAdmin = true;
            localStorage.setItem('kova_is_admin','1');
            localStorage.setItem('kova_admin_email', d.guest.email);
          }
        }
      }
    }catch{}
    this.isAdmin = isAdmin;
    return isAdmin;
  },

  render() {
    setTimeout(() => this.attachEvents(), 100);
    return `
      <style>
       .admin-root{max-width:1100px;margin:0 auto;padding:12px;box-sizing:border-box}
       .menuLiveGrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px}
        /* ===== LIGHT FIX - ADDITIVE ===== */
        [data-theme="light"].admin-root{ background: #E6DFD3!important; min-height:100vh; border-radius:16px; }
        [data-theme="light"].admin-root h2{ color: #121214!important; }
        [data-theme="light"] #adminBadge{ background: #C8FF00!important; color: #000!important; border-color: #C8FF00!important; }
        [data-theme="light"] button[data-tab]{ background: #fff!important; color: #6B6560!important; border-color: #D6D3D1!important; }
        [data-theme="light"] button[data-tab].active-tab{ background: #121214!important; color: #fff!important; }
        [data-theme="light"] #adminContent > div,
        [data-theme="light"] #bulkZone,
        [data-theme="light"] #menuLiveGrid > div,
        [data-theme="light"] #ordersGrid > div,
        [data-theme="light"] #adminContent div[style*="var(--bg-card)"]{ background: #1C1C1F!important; border-color: #27272A!important; color: #F4F4F5!important; }
        [data-theme="light"] #menuLiveGrid b{ color: #F4F4F5!important; }
        [data-theme="light"] #menuLiveGrid span{ color: #A1A1AA!important; }
        [data-theme="light"] button[onclick*="editLive"]{ background: #F4F4F5!important; color: #121214!important; border:1px solid #E7E5E4!important; }
        [data-theme="light"] button[onclick*="delLive"]{ background: #FF4E1F!important; color: #fff!important; }
        [data-theme="light"] #bulkZone p{ color: #A1A1AA!important; }
        [data-theme="light"] #bulkLog{ background: #0A0A0B!important; border-color: #27272A!important; color: #C8FF00!important; }
        [data-theme="light"] #modalBox{ background: #1C1C1F!important; border-color: #27272A!important; color: #F4F4F5!important; }
        [data-theme="light"] #modalBox input, [data-theme="light"] #modalBox textarea, [data-theme="light"] #modalBox select{ background: #0A0A0B!important; color: #F4F4F5!important; border-color: #27272A!important; }
        [data-theme="light"] #ordersGrid div[style*="var(--bg-app)"]{ background: #0A0A0B!important; border-color: #27272A!important; }
        [data-theme="light"] #btnBulk{ background: #121214!important; color: #fff!important; }
        /* Admin granted notice orange in light */
        [data-theme="light"] div[style*="rgba(200,255,0,0.08)"]{ background: rgba(255,78,31,0.12)!important; border-color: rgba(255,78,31,0.35)!important; color: #FF4E1F!important; }


        /* === FINAL LIGHT WASH FIX === */
[data-theme="light"] .admin-root{
  background: #E6DFD3 !important;
  min-height: 100vh !important;
}
[data-theme="light"] .admin-root h2{
  color: #121214 !important;
  -webkit-text-fill-color: #121214 !important;
}
[data-theme="light"] .admin-root h2 span{ color: #6B6560 !important; }

/* Tabs - ORDERS STAFF were invisible in your screenshot */
[data-theme="light"] button[data-tab]{
  background: #FFFFFF !important;
  color: #121214 !important;
  border: 1px solid #D6D3D1 !important;
  opacity: 1 !important;
}
[data-theme="light"] button[data-tab].active-tab{
  background: #121214 !important;
  color: #FFFFFF !important;
  border-color: #121214 !important;
}

/* Yellow badge */
[data-theme="light"] span[style*="CLOUD R2"]{
  background: #C8FF00 !important;
  color: #000 !important;
}

/* Cards stay dark */
[data-theme="light"] #menuLiveGrid > div{
  background: #1C1C1F !important;
}


/* FIX SECOND BG WITHIN GRID */
[data-theme="light"] #adminContent{
  background: transparent !important;
}

[data-theme="light"] #menuLiveGrid{
  background: #E6DFD3 !important;
  padding: 8px !important;
  border-radius: 16px !important;
}

/* Each card dark - only ONE inner bg */
[data-theme="light"] #menuLiveGrid > div{
  background: #1C1C1F !important;
  border-color: #27272A !important;
}

/* Remove any white from card content */
[data-theme="light"] #menuLiveGrid > div > div:last-child{
  background: #1C1C1F !important;
}

      </style>
      <div class="admin-root">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:12px">
          <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
            <h2 style="font-size:28px;font-weight:900;color:var(--text-main)">Admin OS</h2>
            <span style="background:var(--accent);color:#000;padding:4px 10px;border-radius:99px;font-size:10px;font-weight:900;">CLOUD R2 + BULK + D1 GUESTS</span>
            <span id="adminBadge" style="background:var(--bg-card);border:1px solid var(--border);color:var(--text-muted);padding:4px 10px;border-radius:99px;font-size:10px;font-weight:700;">Checking D1...</span>
          </div>
          <div style="display:flex;gap:8px">
            <button id="btnBulk" class="btn-primary" style="background:#fff;color:#000;padding:10px 14px;border-radius:99px;font-weight:800;border:none;cursor:pointer">⚡ BULK INJECTOR</button>
            <button id="btnAddMain" class="btn-primary" style="background:var(--accent);color:#000;padding:10px 18px;border-radius:99px;font-weight:800;border:none;cursor:pointer">+ Add ${this.activeTab}</button>
          </div>
        </div>

        <div style="display:flex;gap:8px;margin-bottom:20px;border-bottom:1px solid var(--border);padding-bottom:12px;overflow-x:auto">
          ${['menu','orders','staff','reservations','hero'].map(t=>`
            <button data-tab="${t}" class="${this.activeTab===t?'active-tab':''}" style="padding:8px 16px;border-radius:999px;border:1px solid var(--border);background:${this.activeTab===t?'var(--text-main)':'transparent'};color:${this.activeTab===t?'var(--bg-app)':'var(--text-muted)'};font-weight:800;font-size:12px;cursor:pointer;white-space:nowrap">${t.toUpperCase()} ${t==='orders'?'🛒':''}</button>
          `).join('')}
        </div>

        <div id="adminContent">${this.getTabHTML(this.activeTab)}</div>

        <div id="adminModal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:9999;align-items:center;justify-content:center;padding:16px;">
          <div id="modalBox" style="background:var(--bg-card);border:1px solid var(--border);border-radius:16px;max-width:620px;width:100%;max-height:90vh;overflow-y:auto;color:var(--text-main)"></div>
        </div>
      </div>
    `;
  },

  getTabHTML(tab) {
    if(tab==='menu'){
      return `
      <div id="bulkZone" style="display:none;background:var(--bg-card);border:2px dashed var(--accent);border-radius:16px;padding:24px;text-align:center;margin-bottom:16px">
        <div style="font-size:32px">🔥</div>
        <b>BULK ELITE PLATE INJECTOR</b>
        <p style="font-size:12px;color:var(--text-muted);margin:6px 0">Drop 10 images → auto R2 upload → auto D1 create.</p>
        <input type="file" id="bulkInput" multiple accept="image/*" style="margin-top:12px;color:var(--text-main)">
        <div id="bulkGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px;margin-top:12px"></div>
        <button id="bulkStart" style="margin-top:12px;padding:12px;background:var(--accent);color:#000;border:none;border-radius:99px;font-weight:900;width:100%">⚡ INJECT ALL TO R2 + D1</button>
        <div style="margin-top:12px;display:flex;gap:8px"><button id="bulkQuick" style="flex:1;padding:10px;background:var(--bg-hover);color:var(--text-main);border:1px solid var(--border);border-radius:99px;font-weight:800">⚡ QUICK 10 DEMO</button></div>
        <div id="bulkLog" style="font-family:monospace;font-size:10px;text-align:left;background:#000;padding:10px;border-radius:8px;max-height:150px;overflow:auto;margin-top:10px;border:1px solid var(--border);color:#0f0">Ready. Drop elite plates bro.</div>
      </div>
      <div id="menuLiveGrid" class="menuLiveGrid"><div style="padding:20px;color:var(--text-muted)">Loading LIVE from D1...</div></div>`;
    }
    if(tab==='orders'){
      return `
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:16px">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
            <div><b>Guest Orders — D1 Persistent</b><p style="color:var(--text-muted);font-size:12px;margin-top:4px">All guest orders from D1 • Never lost even if guest changes device • R2 photos safe</p></div>
            <button id="refreshOrders" style="background:var(--text-main);color:var(--bg-app);border:0;padding:8px 14px;border-radius:999px;font-weight:700;font-size:11px;cursor:pointer">Refresh D1</button>
          </div>
          <div id="ordersGrid" style="margin-top:16px;display:flex;flex-direction:column;gap:10px"><div style="padding:20px;color:var(--text-muted);text-align:center">Loading orders from D1...</div></div>
        </div>
      `;
    }
    if(tab==='staff'){
      const staff = JSON.parse(localStorage.getItem('kova_staff') || '[]');
      return `<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:16px">${staff.map(s=>`<div style="display:flex;justify-content:space-between;padding:12px 16px;border-bottom:1px solid var(--border)"><span><b>${s.name}</b> • ${s.role} • ${s.shift}</span><button onclick="window.delStaff('${s.id}')" style="color:var(--accent-2);background:none;border:none;cursor:pointer">Del</button></div>`).join('') || '<div style="padding:24px;color:var(--text-muted)">No staff — Add first</div>'}</div>`;
    }
    if(tab==='reservations'){
      return `<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:16px"><b>WhatsApp Reservation Control</b><p style="color:var(--text-muted);font-size:13px;margin-top:8px">Connected to D1 reservations table.</p></div>`;
    }
    if(tab==='hero'){
      const hero = localStorage.getItem('kova_hero_bg') || '';
      return `<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:16px"><b>Hero Background — Cloud R2</b><div style="margin-top:12px;border:2px dashed var(--border);border-radius:12px;padding:20px;text-align:center">${hero?`<img src="${hero}" style="width:100%;height:200px;object-fit:cover;border-radius:12px"><p style="font-size:10px;color:var(--accent);margin-top:8px;word-break:break-all">${hero}</p>`:'<p style="color:var(--text-muted)">No hero — upload will go to kova-restaurant R2</p>'}<br><input type="file" id="heroFile" accept="image/*,video/*" style="margin-top:12px"><p style="font-size:11px;color:var(--text-muted);margin-top:8px">Uploads to ${WORKER_URL}/api/upload → R2</p></div></div>`;
    }
  },

  async uploadToR2(file){
    const fd = new FormData(); fd.append('file', file);
    const r = await fetch(`${WORKER_URL}/api/upload`, { method: 'POST', body: fd });
    if(!r.ok) throw new Error('R2 upload failed ' + r.status);
    const data = await r.json();
    if(!data.url) throw new Error('No URL returned');
    return data.url;
  },

  async loadGuestOrders(){
    const grid = document.getElementById('ordersGrid');
    if(!grid) return;
    const token = localStorage.getItem('kova_token');
    if(!token){
      grid.innerHTML = `<div style="padding:20px;color:var(--accent-2);text-align:center">No token — sign in as admin first<br><button onclick="location.hash='#/auth'" style="margin-top:10px;background:var(--accent);color:#000;border:0;padding:8px 16px;border-radius:999px;font-weight:800;cursor:pointer">Sign In</button></div>`;
      return;
    }
    try{
      const r = await fetch(`${GUEST_WORKER}/api/admin/orders`, {headers:{'Authorization':`Bearer ${token}`}});
      const d = await r.json();
      if(!r.ok) throw new Error(d.error||'Failed');
      const orders = d.orders||[];
      if(orders.length===0){
        grid.innerHTML = `<div style="padding:30px;text-align:center;color:var(--text-muted)"><div style="font-size:28px">🛒</div><div style="margin-top:8px;font-weight:700">No guest orders yet in D1</div><div style="font-size:11px;margin-top:4px">Guest carts → orders when they checkout. Orders never lost across devices.</div></div>`;
        return;
      }
      grid.innerHTML = orders.map(o=>{
        let items=[];
        try{ items = JSON.parse(o.items); }catch{}
        const date = new Date(o.created_at).toLocaleString('en-AE',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});
        return `
          <div style="background:var(--bg-app);border:1px solid var(--border);border-radius:12px;padding:12px">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
              <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
                <b style="font-size:13px">#${o.id.slice(0,8)}</b>
                <span style="font-size:10px;padding:3px 8px;border-radius:999px;background:rgba(255,78,31,0.15);color:var(--accent-2);border:1px solid rgba(255,78,31,0.3);font-weight:800">${o.status.toUpperCase()}</span>
                <span style="font-size:10px;color:var(--text-muted)">${date}</span>
              </div>
              <div style="font-weight:900;font-size:13px;color:var(--accent)">AED ${o.total}</div>
            </div>
            <div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap">
              ${items.map(it=>`<span style="font-size:10px;background:var(--bg-card);border:1px solid var(--border);padding:4px 8px;border-radius:999px">${it.title||it.item_id} x${it.qty}</span>`).join('')}
            </div>
            <div style="margin-top:8px;font-size:11px;color:var(--text-muted)">👤 ${o.guest_name} • ${o.guest_email} • ${o.guest_phone||'No phone'}</div>
            <div style="margin-top:8px;display:flex;gap:6px">
              ${['pending','preparing','ready','done'].map(s=>`<button onclick="window.updateOrderStatus('${o.id}','${s}')" style="padding:4px 10px;border-radius:999px;border:1px solid var(--border);background:${o.status===s?'var(--accent)':'var(--bg-card)'};color:${o.status===s?'#000':'var(--text-muted)'};font-size:10px;font-weight:700;cursor:pointer">${s}</button>`).join('')}
            </div>
          </div>
        `;
      }).join('');

      window.updateOrderStatus = async (id, status)=>{
        try{
          const token = localStorage.getItem('kova_token');
          const r = await fetch(`${GUEST_WORKER}/api/admin/orders/${id}/status`, {method:'PATCH', headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`}, body: JSON.stringify({status})});
          const d = await r.json();
          if(!r.ok) throw new Error(d.error);
          this.loadGuestOrders();
        }catch(e){ alert('Status update failed: '+e.message); }
      };

    }catch(e){
      grid.innerHTML = `<div style="padding:20px;color:var(--accent-2)">Failed to load D1 orders: ${e.message}<br><span style="font-size:11px;color:var(--text-muted)">Make sure you are admin (dopetone701@gmail.com) and worker ${GUEST_WORKER} has D1 binding KOVA_D1</span></div>`;
    }
  },

  async attachEvents() {
    const isAdmin = await this.checkAdmin();
    const badge = document.getElementById('adminBadge');
    if(badge){
      badge.textContent = isAdmin? 'ADMIN D1 ✓' : 'NOT ADMIN';
      badge.style.background = isAdmin? 'var(--accent)' : 'var(--bg-card)';
      badge.style.color = isAdmin? '#000' : 'var(--text-muted)';
    }

    if(!isAdmin){
      const content = document.getElementById('adminContent');
      if(content){
        content.innerHTML = `
          <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:32px;text-align:center">
            <div style="font-size:40px">🔒</div>
            <div style="font-size:18px;font-weight:900;margin-top:12px;color:var(--text-main)">Admin OS Locked — D1 Check Failed</div>
            <div style="font-size:12px;color:var(--text-muted);margin-top:6px;max-width:400px;margin-left:auto;margin-right:auto;line-height:1.5">
              This Admin OS is locked. Sign in as <b style="color:var(--text-main)">${ALLOWED_ADMIN}</b> to unlock. Your guest carts, wishlists & orders are safely stored in D1 <b>kova-restaurant-d1</b> and photos in R2 <b>kova-restaurant</b>.
            </div>
            <div style="margin-top:16px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
              <button onclick="location.hash='#/auth'" style="background:var(--accent);color:#000;border:0;padding:10px 18px;border-radius:999px;font-weight:800;font-size:12px;cursor:pointer">Sign In as Admin →</button>
              <button onclick="location.hash='#/menu'" style="background:var(--bg-app);border:1px solid var(--border);color:var(--text-main);padding:10px 18px;border-radius:999px;font-weight:700;font-size:12px;cursor:pointer">Browse Menu</button>
            </div>
          </div>
        `;
      }
      return;
    }

    document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{
      this.activeTab=b.dataset.tab;
      document.getElementById('adminContent').innerHTML=this.getTabHTML(this.activeTab);
      document.getElementById('btnAddMain').textContent='+ Add '+this.activeTab;
      this.attachEvents();
      if(this.activeTab==='orders') setTimeout(()=>this.loadGuestOrders(), 50);
    });

    document.getElementById('btnAddMain')?.addEventListener('click',()=>this.openModal(this.activeTab));
    document.getElementById('btnBulk')?.addEventListener('click',()=>{
      const zone = document.getElementById('bulkZone');
      if(zone) zone.style.display = zone.style.display==='none'? 'block' : 'none';
    });

    document.getElementById('refreshOrders')?.addEventListener('click',()=>this.loadGuestOrders());

    if(this.activeTab==='orders'){
      this.loadGuestOrders();
    }

    if(this.activeTab==='menu'){
      this.loadLiveMenu();
      const bulkInput = document.getElementById('bulkInput');
      const bulkGrid = document.getElementById('bulkGrid');
      const bulkLog = document.getElementById('bulkLog');
      const log = (m)=>{ if(bulkLog){ bulkLog.textContent += "\\n"+m; bulkLog.scrollTop=9999; } }

      bulkInput?.addEventListener('change', (e)=>{
        this.bulkFiles = [...this.bulkFiles,...Array.from(e.target.files)];
        bulkGrid.innerHTML = this.bulkFiles.map((f,i)=>`
          <div style="background:#000;border:1px solid var(--border);border-radius:8px;overflow:hidden">
            <img src="${URL.createObjectURL(f)}" style="width:100%;height:80px;object-fit:cover">
            <div style="padding:4px;font-size:9px"><input class="bulkName" data-i="${i}" value="${f.name.replace(/\\.[^/.]+$/,'').replace(/_/g,' ')}" style="width:100%;padding:4px;background:var(--bg-hover);color:var(--text-main);border:1px solid var(--border);border-radius:4px"></div>
          </div>
        `).join('');
        log(`Added ${e.target.files.length} images. Total ${this.bulkFiles.length}`);
      });

      document.getElementById('bulkStart')?.addEventListener('click', async ()=>{
        const names = document.querySelectorAll('.bulkName');
        for(let i=0;i<this.bulkFiles.length;i++){
          const file = this.bulkFiles[i];
          const title = names[i]?.value || file.name;
          const id = title.toLowerCase().replace(/[^a-z0-9]+/g,'-')+'-'+Date.now().toString().slice(-4)+i;
          try{
            log(`[${i+1}/${this.bulkFiles.length}] R2 uploading ${title}...`);
            const url = await this.uploadToR2(file);
            log(` R2 LIVE: ${url}`);
            const payload = { id, name: title, name_ar:"طبق كوفا فاخر", category:"Flame", price:120+i*15, badge:i<2?"Chef's Pick":"HOT", description:`Elite plated ${title}. Flame • Smoke • Stone — KOVA Dubai.`, image:url };
            await fetch(`${WORKER_URL}/api/admin/menu`, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload)});
            log(` ✅ D1: ${title}`);
          }catch(e){ log(` ❌ ${title}: ${e.message}`); }
        }
        log("🔥 ALL DONE — check #menu");
        this.loadLiveMenu();
      });

      document.getElementById('bulkQuick')?.addEventListener('click', async ()=>{
        const quick = [
          {id:"wagyu-ribeye", name:"Wagyu Ribeye — Hajar Stone", category:"Flame", price:385, image:"https://images.unsplash.com/photo-1546964052-d9334ceb32ee?w=800"},
          {id:"lamb-14h", name:"Smoked Lamb — 14H", category:"Smoke", price:285, image:"https://images.unsplash.com/photo-1544025162-d76694265947?w=800"},
          {id:"khubz-truffle", name:"Truffle Khubz", category:"Stone", price:52, image:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800"},
          {id:"seabass-flame", name:"Seabass — Flame", category:"Flame", price:198, image:"https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800"},
          {id:"marrow-ember", name:"Bone Marrow — Ember", category:"Flame", price:92, image:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800"},
          {id:"hamachi", name:"Hamachi Tiradito", category:"Raw & Cold", price:72, image:"https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800"},
          {id:"tartare", name:"Wagyu Tartare — Stone", category:"Raw & Cold", price:85, image:"https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800"},
          {id:"eggplant", name:"Tahina Eggplant", category:"Flame", price:48, image:"https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800"},
          {id:"kofta", name:"KOVA Kofta", category:"Flame", price:78, image:"https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800"},
          {id:"knafeh", name:"Knafeh Brûlée", category:"Sweets", price:54, image:"https://images.unsplash.com/photo-1519869325930-281384150729?w=800"},
        ];
        for(const f of quick){
          await fetch(`${WORKER_URL}/api/admin/menu`, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({...f, name_ar:"طبق فاخر", badge:"HOT", description:`KOVA elite ${f.name}`})});
          log(`✅ ${f.name}`);
        }
        log("DONE 10 quick");
        this.loadLiveMenu();
      });
    }

    document.getElementById('heroFile')?.addEventListener('change', async (e)=>{
      const file = e.target.files[0]; if(!file) return;
      try {
        const cloudUrl = await this.uploadToR2(file);
        await fetch(`${WORKER_URL}/api/hero`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ hero: cloudUrl })});
        localStorage.setItem('kova_hero_bg', cloudUrl);
        alert('SAVED TO R2: ' + cloudUrl);
        location.reload();
      } catch(err){ alert('Upload failed: ' + err.message); }
    });

    window.delStaff=(id)=>{
      let s=JSON.parse(localStorage.getItem('kova_staff')||'[]'); s=s.filter(x=>x.id!==id);
      localStorage.setItem('kova_staff',JSON.stringify(s)); location.reload();
    };
  },

  async loadLiveMenu(){
    const grid = document.getElementById('menuLiveGrid');
    if(!grid) return;
    try{
      const res = await fetch(`${WORKER_URL}/api/menu`);
      const items = await res.json();
      if(!items.length){ grid.innerHTML = '<div style="padding:20px;color:var(--text-muted);border:2px dashed var(--border);border-radius:12px;text-align:center">No LIVE D1 items — use BULK INJECTOR above</div>'; return; }
      window._kovaLive = items;
      grid.innerHTML = items.map(d=>`
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:16px;overflow:hidden">
          <div style="position:relative"><img src="${d.image}" style="width:100%;height:160px;object-fit:cover"><span style="position:absolute;top:8px;left:8px;background:var(--accent);color:#000;font-size:9px;font-weight:900;padding:3px 8px;border-radius:99px">LIVE R2</span><span style="position:absolute;top:8px;right:8px;background:var(--accent-2);color:#fff;font-size:9px;font-weight:900;padding:3px 8px;border-radius:99px">${d.category||'Flame'}</span></div>
          <div style="padding:12px"><b>${d.name}</b><br><span style="font-size:12px;color:var(--text-muted)">AED ${d.price} • ${d.category}</span>
            <div style="display:flex;gap:6px;margin-top:10px">
              <button onclick="window.editLive('${d.id}')" style="flex:1;padding:8px;border-radius:8px;background:var(--text-main);color:var(--bg-app);border:none;cursor:pointer;font-size:12px;font-weight:700">✏️ Edit</button>
              <button onclick="window.delLive('${d.id}')" style="flex:1;padding:8px;border-radius:8px;background:var(--accent-2);color:#fff;border:none;cursor:pointer;font-size:12px;font-weight:700">Del</button>
            </div>
          </div>
        </div>
      `).join('');
      window.delLive = async (id)=>{
        if(!confirm('Delete from D1?')) return;
        await fetch(`${WORKER_URL}/api/admin/menu/${id}`, {method:'DELETE'});
        this.loadLiveMenu();
      };
      window.editLive = (id)=>{
        const item = window._kovaLive.find(x=>x.id===id);
        if(item) this.openModal('menu', item);
      };
    }catch(e){ grid.innerHTML = `<div style="color:var(--accent-2);padding:12px">D1 load failed: ${e.message}</div>`; }
  },

  openModal(type, data=null){
    const modal=document.getElementById('adminModal');
    const box=document.getElementById('modalBox');
    modal.style.display='flex';
    if(type==='menu'){
      box.innerHTML=`
        <div style="padding:20px">
          <h3 style="font-weight:900;margin-bottom:12px">${data?'✏️ Edit':'Add'} Dish — CLOUD R2 ${data?`<span style="color:var(--accent-2);font-size:12px">#${data.id}</span>`:''}</h3>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${data?.image?`<img src="${data.image}" style="width:100%;height:180px;object-fit:cover;border-radius:12px;border:1px solid var(--border)">`:''}
            <select id="f_cat" style="padding:12px;border-radius:10px;background:var(--bg-app);color:var(--text-main);border:1px solid var(--border)">
              <option>Flame</option><option>Smoke</option><option>Stone</option><option>Raw & Cold</option><option>Sweets</option><option>Drinks</option>
            </select>
            <input id="f_name" value="${data?.name||''}" placeholder="Name EN" style="padding:12px;border-radius:10px;background:var(--bg-app);color:var(--text-main);border:1px solid var(--border)">
            <input id="f_ar" value="${data?.name_ar||''}" placeholder="Name AR" style="padding:12px;border-radius:10px;background:var(--bg-app);color:var(--text-main);border:1px solid var(--border)">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
              <input id="f_price" value="${data?.price||''}" placeholder="Price" type="number" style="padding:12px;border-radius:10px;background:var(--bg-app);color:var(--text-main);border:1px solid var(--border)">
              <input id="f_badge" value="${data?.badge||''}" placeholder="Badge (Chef's Pick, HOT, RAW)" style="padding:12px;border-radius:10px;background:var(--bg-app);color:var(--text-main);border:1px solid var(--border)">
            </div>
            <textarea id="f_desc" placeholder="Description" style="padding:12px;border-radius:10px;background:var(--bg-app);color:var(--text-main);border:1px solid var(--border);min-height:70px">${data?.description||''}</textarea>
            <label style="font-size:12px;color:var(--text-muted)">Replace Image (optional, uploads to R2):</label>
            <input id="f_img" type="file" accept="image/*" style="color:var(--text-main)">
            <div id="uploadStatus" style="font-size:11px;color:var(--accent);display:none">Uploading to R2...</div>
            <div style="display:flex;gap:8px;margin-top:10px"><button id="saveDish" style="flex:1;padding:12px;background:var(--accent);color:#000;border:none;border-radius:99px;font-weight:900;cursor:pointer">${data?'UPDATE CLOUD':'SAVE TO CLOUD R2'}</button><button id="closeM" style="flex:1;padding:12px;background:var(--bg-hover);color:var(--text-main);border:1px solid var(--border);border-radius:99px;cursor:pointer">Cancel</button></div>
          </div>
        </div>`;
      box.querySelector('#f_cat').value=data?.category||'Flame';
      box.querySelector('#saveDish').onclick= async ()=>{
        const status = box.querySelector('#uploadStatus');
        const saveBtn = box.querySelector('#saveDish');
        saveBtn.disabled = true; saveBtn.textContent = 'UPLOADING...'; status.style.display='block';
        try {
          let imageUrl = data?.image || '';
          const file = box.querySelector('#f_img').files[0];
          if(file){ imageUrl = await this.uploadToR2(file); }
          const nd={
            id:data?.id||Date.now().toString(),
            category:box.querySelector('#f_cat').value,
            name:box.querySelector('#f_name').value,
            name_ar:box.querySelector('#f_ar').value,
            price:parseFloat(box.querySelector('#f_price').value)||0,
            badge:box.querySelector('#f_badge').value,
            description:box.querySelector('#f_desc').value,
            image:imageUrl
          };
          await fetch(`${WORKER_URL}/api/admin/menu`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(nd) });
          modal.style.display='none'; this.loadLiveMenu();
        } catch(err){
          alert('Cloud save failed: ' + err.message);
          saveBtn.disabled = false; saveBtn.textContent=data?'UPDATE CLOUD':'SAVE TO CLOUD R2'; status.style.display='none';
        }
      };
      box.querySelector('#closeM').onclick=()=>modal.style.display='none';
    }
    if(type==='staff'){
      box.innerHTML=`<div style="padding:20px"><h3 style="font-weight:900">Add Staff</h3><input id="s_n" placeholder="Name" style="width:100%;padding:12px;margin-top:12px;border-radius:10px;background:var(--bg-app);color:var(--text-main);border:1px solid var(--border)"><select id="s_r" style="width:100%;padding:12px;margin-top:8px;border-radius:10px;background:var(--bg-app);color:var(--text-main);border:1px solid var(--border)"><option>Chef</option><option>Grill Master</option><option>Server</option><option>Manager</option></select><select id="s_sh" style="width:100%;padding:12px;margin-top:8px;border-radius:10px;background:var(--bg-app);color:var(--text-main);border:1px solid var(--border)"><option>Morning</option><option>Evening</option><option>Full</option></select><div style="display:flex;gap:8px;margin-top:12px"><button id="s_save" style="flex:1;padding:12px;background:var(--accent);color:#000;border:none;border-radius:99px;font-weight:900;cursor:pointer">SAVE</button><button id="closeM" style="flex:1;padding:12px;background:var(--bg-hover);color:var(--text-main);border:1px solid var(--border);border-radius:99px">Cancel</button></div></div>`;
      box.querySelector('#s_save').onclick=async ()=>{
        const s=JSON.parse(localStorage.getItem('kova_staff')||'[]');
        const newStaff={id:Date.now().toString(),name:box.querySelector('#s_n').value,role:box.querySelector('#s_r').value,shift:box.querySelector('#s_sh').value};
        s.push(newStaff); localStorage.setItem('kova_staff',JSON.stringify(s));
        await fetch(`${WORKER_URL}/api/admin/staff`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(newStaff)});
        modal.style.display='none'; location.reload();
      };
      box.querySelector('#closeM').onclick=()=>modal.style.display='none';
    }
    modal.onclick=e=>{ if(e.target===modal) modal.style.display='none'; };
  }
};
