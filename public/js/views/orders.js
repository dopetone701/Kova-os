// KOVA Guest Orders - PREMIUM - MOBILE LOCKED CENTER - NO SIDE DRAG - ORIGINAL + FIX ONLY
import { Recommendations } from '../components/recommendation.js';
import { ordersSkeleton } from '../skeletons/orders.skeleton.js';


export const Orders = {
  WORKER_URL: 'https://kova-guest-sign-up.dopetone701.workers.dev',

  async render(){
    return `
      <style>
        html,body{overflow-x:clip;max-width:100vw;overscroll-behavior-x:none}
        #app{overflow-x:clip;max-width:100vw;overscroll-behavior-x:none;touch-action:pan-y}
        .orders-root{margin:-24px;width:calc(100% + 48px);min-width:calc(100% + 48px);background:var(--bg-app);box-sizing:border-box;min-height:100vh;overflow-x:clip;touch-action:pan-y;overscroll-behavior-x:none;position:relative}
        .orders-inner{max-width:1100px;margin:0 auto;padding:28px 40px 100px;overflow-x:clip}
        .order-card{background:var(--bg-card);border:1px solid var(--border);border-radius:20px;padding:22px;margin-bottom:16px;position:relative;overflow:hidden;transition:.25s}
        .order-card.featured{border-color:var(--accent-2);box-shadow:0 0 0 1px rgba(255,78,31,.25),0 16px 32px rgba(0,0,0,.28)}
        .order-card.featured::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--accent),var(--accent-2))}
        .order-items{display:flex;gap:12px;overflow-x:auto;padding:10px 0;scrollbar-width:none;overscroll-behavior-x:contain;-webkit-overflow-scrolling:touch}
        .order-items::-webkit-scrollbar{display:none}
        .order-item{min-width:148px;background:var(--bg-app);border:1px solid var(--border);border-radius:14px;padding:12px;flex-shrink:0}
        .status{font-size:10px;font-weight:900;padding:5px 12px;border-radius:999px;letter-spacing:.8px;text-transform:uppercase}
        .status.pending{background:rgba(255,193,7,.15);color:#FFC107;border:1px solid rgba(255,193,7,.3)}
        .status.preparing{background:rgba(255,78,31,.15);color:#FF4E1F;border:1px solid rgba(255,78,31,.3)}
        .status.ready{background:rgba(56,189,248,.15);color:#38BDF8;border:1px solid rgba(56,189,248,.3)}
        .status.delivered,.status.done{background:rgba(34,197,94,.15);color:#22C55E;border:1px solid rgba(34,197,94,.3)}
        .timeline{display:flex;gap:8px;margin:14px 0;align-items:center}
        .t-dot{width:22px;height:22px;border-radius:50%;display:grid;place-items:center;font-size:11px;font-weight:800;border:1.5px solid var(--border);background:var(--bg-app);color:var(--text-muted);flex-shrink:0}
        .t-dot.active{background:var(--accent);color:#000;border-color:var(--accent)}
        .t-dot.done{background:#22C55E;color:#fff;border-color:#22C55E}
        .t-line{flex:1;height:2px;background:var(--border)}
        .t-line.done{background:#22C55E}
        .arivie-msg{background:linear-gradient(135deg,rgba(200,255,0,.14),rgba(255,78,31,.14));border:1px solid rgba(200,255,0,.25);border-radius:16px;padding:14px 16px;display:flex;gap:12px;align-items:center;margin-bottom:16px}
        .prev-toggle{background:var(--bg-card);border:1px dashed var(--border);border-radius:14px;padding:14px;text-align:center;cursor:pointer;color:var(--text-muted);font-size:13px;font-weight:800;margin-top:12px}
        #ordersHistory{max-height:600px;overflow-y:auto;overflow-x:hidden;margin-top:14px}
        .discount-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:20px}
        .kova-mobile-filler{display:block;margin-top:20px}
        @media(max-width:768px){
          .orders-root{margin:0;margin-left:-16px;margin-right:-16px;width:calc(100% + 32px);min-width:calc(100% + 32px);overflow-x:clip;touch-action:pan-y;overscroll-behavior-x:none}
          .orders-inner{padding:16px 12px 100px;max-width:100vw;box-sizing:border-box;overflow-x:clip}
          .discount-row{grid-template-columns:1fr}
          .kova-mobile-filler{margin-top:16px}
          #recBox{overflow-x:clip}
          #recBox > div{overflow-x:auto !important;overscroll-behavior-x:contain !important;touch-action:pan-y pan-x !important}
        }


        /* LIGHT LOCK - ONLY PAGE BG LIGHT */
[data-theme="light"] .orders-root{
  background: #ece8df !important;
}
[data-theme="light"] .orders-inner{
  background: transparent !important;
}
[data-theme="light"] .order-card{
  background: #1C1C1F !important;
  border-color: #27272A !important;
  color: #F4F4F5 !important;
}
[data-theme="light"] .order-card .t-dot{
  background: #0A0A0B !important;
  border-color: #27272A !important;
  color: #A1A1AA !important;
}
[data-theme="light"] .order-item{
  background: #0A0A0B !important;
  border-color: #27272A !important;
  color: #F4F4F5 !important;
}
[data-theme="light"] .arivie-msg{
  background: linear-gradient(135deg,rgba(200,255,0,.14),rgba(255,78,31,.14)) !important;
  border-color: rgba(200,255,0,.25) !important;
}
[data-theme="light"] .prev-toggle{
  background: #1C1C1F !important;
  border-color: #27272A !important;
  color: #A1A1AA !important;
}
[data-theme="light"] .orders-inner h1{
  color: #121214 !important;
}
[data-theme="light"] #ordersList{
  color: #121214 !important;
}


/* FIX RATE BAR + CHEF PICK + COLD DRINKS WASHED */
[data-theme="light"] .kova-mobile-filler > div {
  background: #1C1C1F !important;
  border-color: #27272A !important;
  color: #F4F4F5 !important;
}
[data-theme="light"] .kova-mobile-filler div[style*="color:var(--text-muted)"] {
  color: #A1A1AA !important;
}
[data-theme="light"] .kova-mobile-filler div[style*="color:var(--text-main)"] {
  color: #F4F4F5 !important;
}
/* Rate banner */
[data-theme="light"] .arivie-msg {
  background: linear-gradient(135deg,rgba(200,255,0,.14),rgba(255,78,31,.14)) !important;
  border-color: rgba(200,255,0,.25) !important;
}
[data-theme="light"] .arivie-msg div {
  color: #F4F4F5 !important;
}
[data-theme="light"] .arivie-msg div div[style*="color:var(--text-muted)"] {
  color: #A1A1AA !important;
}

/* Chef Pick + Cold Drinks buttons */
[data-theme="light"] .kova-mobile-filler button {
  border-color: #27272A !important;
}
[data-theme="light"] .kova-mobile-filler button[style*="var(--text-main)"] {
  background: #F4F4F5 !important;
  color: #0A0A0B !important;
}
[data-theme="light"] .kova-mobile-filler button[style*="var(--bg-app)"] {
  background: #0A0A0B !important;
  color: #F4F4F5 !important;
  border-color: #27272A !important;
}

/* Show previous + orders count on light bg */
[data-theme="light"] .orders-inner h1 {
  color: #121214 !important;
}
[data-theme="light"] .orders-inner > div > p {
  color: #8B8680 !important;
}

[data-theme="light"] #arivieBox .arivie-msg,
[data-theme="light"] .arivie-msg{
  background: linear-gradient(90deg, #E6FF4A 0%, #D4FF00 35%, #FFD93D 65%, #FF8A2E 100%) !important;
  border: 1px solid rgba(0,0,0,0.08) !important;
  color: #000 !important;
}
[data-theme="light"] #arivieBox .arivie-msg div,
[data-theme="light"] .arivie-msg div{
  color: #000 !important;
}
[data-theme="light"] #arivieBox .arivie-msg div div:last-child{
  color: rgba(0,0,0,0.65) !important;
}


/* DARK ONLY - Order Again fix */
[data-theme="dark"] .order-card button[onclick*="orderAgain"],
html:not([data-theme="light"]) .order-card button[onclick*="orderAgain"]{
  background: #F4F4F5 !important;
  color: #0A0A0B !important;
  border-color: #F4F4F5 !important;
  font-weight: 900 !important;
  opacity: 1 !important;
}


      </style>
      <div class="orders-root">
        <div class="orders-inner">
          <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:18px;gap:12px;flex-wrap:wrap">
            <div>
              <h1 style="font-size:28px;font-weight:900;letter-spacing:-1px;margin:0">My Orders <span id="ordersCount" style="font-size:12px;color:var(--text-muted)"></span></h1>
              <p style="color:var(--text-muted);font-size:12.5px;margin-top:5px">Latest pinned on top</p>
            </div>
            <button onclick="location.hash='#/menu'" style="background:var(--accent);color:#000;border:0;padding:11px 20px;border-radius:999px;font-weight:900;font-size:12px;cursor:pointer">Order More +</button>
          </div>
          <div id="arivieBox"></div>
          <div id="lastOrderBox"></div>
          <div id="recBox"></div>
          <div id="discountBox"></div>
          <div id="mobileFiller"></div>
          <div id="historySection" style="display:none">
            <div class="prev-toggle" id="toggleHistory">↓ Show previous (<span id="prevCount">0</span>)</div>
            <div id="ordersHistory" style="display:none"></div>
          </div>
<div id="ordersSkeletonWrap">${ordersSkeleton}</div>
<div id="ordersList" style="display:none;min-height:200px"></div>
        </div>
      </div>
    `;
  },

  async afterRender(){
    const token=localStorage.getItem('kova_token');
    const skelEl=document.getElementById('ordersSkeletonWrap');

    const listEl=document.getElementById('ordersList');
    const lastBox=document.getElementById('lastOrderBox');
    const arivieBox=document.getElementById('arivieBox');
    const recBox=document.getElementById('recBox');
    const discountBox=document.getElementById('discountBox');
    const mobileFiller=document.getElementById('mobileFiller');
    const historySec=document.getElementById('historySection');
    const historyEl=document.getElementById('ordersHistory');

    if(!token){
      listEl.innerHTML=`<div style="text-align:center;padding:40px;background:var(--bg-card);border:1px solid var(--border);border-radius:20px">🔒 Sign in to see orders<br><button onclick="location.hash='#/auth'" style="margin-top:14px;background:var(--accent);color:#000;border:0;padding:10px 18px;border-radius:999px;font-weight:900">Sign In</button></div>`;
      // inside if(!token){
if(skelEl) skelEl.style.display='none';

      try{
        recBox.innerHTML=await Recommendations.render({title:'Trending Now',count:6,showDiscount:true});
        Recommendations.attachEvents && Recommendations.attachEvents();
      }catch(e){ recBox.innerHTML=''; }
      this.renderMobileFiller(mobileFiller);
      return;
      // inside if(!token){
if(skelEl) skelEl.style.display='none';

    }

    try{
      const res=await fetch(`${this.WORKER_URL}/api/guest/orders`,{headers:{'Authorization':`Bearer ${token}`}});
      const data=await res.json();
      let orders=(data.orders||[]).sort((a,b)=>new Date(b.created_at)-new Date(a.created_at));
      document.getElementById('ordersCount').textContent=`· ${orders.length}`;
      if(orders.length===0){
        listEl.style.display='none';
        // inside if(!token){
if(skelEl) skelEl.style.display='none';

        recBox.innerHTML=await Recommendations.render({title:'Start with these',count:8,showDiscount:true});
        Recommendations.attachEvents && Recommendations.attachEvents();
        this.renderMobileFiller(mobileFiller);
        return;
      }
      listEl.style.display='none';
      // inside if(!token){
if(skelEl) skelEl.style.display='none';

      const latest=orders[0]; const rest=orders.slice(1);

      const st=(latest.status||'pending').toLowerCase();
      const map={pending:['✨','We got your order!','Kitchen will start soon'],preparing:['👨‍🍳','Arivie - Preparing','Chef is on it! 15-20 min'],ready:['🛎️','Ready!','Rider nearby'],delivered:['⭐','Delivered - Enjoy!','Rate us?'],done:['⭐','Delivered - Enjoy!','Rate us?']};
      const m=map[st]||map.pending;
      arivieBox.innerHTML=`<div class="arivie-msg"><div style="font-size:26px">${m[0]}</div><div><div style="font-weight:900;font-size:13px">${m[1]}</div><div style="font-size:12px;color:var(--text-muted)">${m[2]}</div></div></div>`;

      lastBox.innerHTML=this.cardHTML(latest,true);
      const excludeIds=(()=>{try{return JSON.parse(latest.items).map(i=>i.id||i.item_id)}catch{return[]}})();
      try{
        recBox.innerHTML=await Recommendations.render({title:'Recommended For You',count:6,excludeIds,showDiscount:false});
        Recommendations.attachEvents && Recommendations.attachEvents();
      }catch{ recBox.innerHTML=''; }

      discountBox.innerHTML = (() => {
        const allDishes = JSON.parse(localStorage.getItem('kova_menu_cache')||'[]');
        const randomDish = allDishes[Math.floor(Math.random()*allDishes.length)] || {image:'', title:'KOVA Special Noodles'};
        const trendBg = randomDish.image || randomDish.img || randomDish.image_url || 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600';
        const trendName = randomDish.title || randomDish.name || 'KOVA Special Noodles';
        return `<div class="discount-row" style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div style="background:linear-gradient(135deg,var(--accent),var(--accent-2));border-radius:16px;padding:16px;color:#000">
            <div style="font-weight:900">FLAT 20% OFF</div>
            <div style="font-size:11px;opacity:.85">Above AED 80 • CODE: KOVA20</div>
          </div>
          <div onclick="location.hash='#/menu'" style="position:relative;border-radius:16px;padding:16px;overflow:hidden;border:1px solid var(--border);cursor:pointer;background:url('${trendBg}') center/cover no-repeat;min-height:68px">
            <div style="position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.8),rgba(0,0,0,.3))"></div>
            <div style="position:relative;z-index:2">
              <div style="font-weight:900;font-size:13px;color:white">🔥 Trending</div>
              <div style="font-size:11px;color:rgba(255,255,255,.9);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:120px">${trendName}</div>
            </div>
          </div>
        </div>`;
      })();

      this.renderMobileFiller(mobileFiller);

      if(rest.length>0){
        historySec.style.display='block';
        document.getElementById('prevCount').textContent=rest.length;
        historyEl.innerHTML=rest.map(o=>this.cardHTML(o,false)).join('');
        document.getElementById('toggleHistory').onclick=()=>{
          const h=historyEl.style.display==='none'; historyEl.style.display=h?'block':'none';
          document.getElementById('toggleHistory').textContent=h?`↑ Hide previous`:`↓ Show previous (${rest.length})`;
        };
      }
    }catch(e){ listEl.innerHTML=`<div style="color:red;padding:20px">Failed: ${e.message}</div>`; }
  },

  renderMobileFiller(el){
    if(!el) return;
    el.innerHTML = `
      <div class="kova-mobile-filler">
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:20px;padding:18px;position:relative;overflow:hidden">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
            <div style="width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,var(--accent),var(--accent-2));display:grid;place-items:center;font-weight:900;color:#000">K</div>
            <div>
              <div style="font-weight:900;font-size:13px">Your ember is safe</div>
              <div style="font-size:11px;color:var(--text-muted)">D1 Synced • No data loss</div>
            </div>
            <div style="margin-left:auto;font-size:10px;background:rgba(34,197,94,.12);color:#22C55E;border:1px solid rgba(34,197,94,.25);padding:4px 8px;border-radius:999px;font-weight:800">● LIVE</div>
          </div>
          <div style="font-size:12px;line-height:1.6;color:var(--text-muted)">
            Thanks for ordering from KOVA. Every fire starts with one ember.
            <span style="color:var(--text-main);font-weight:700">Chef's tip:</span> Add a cold drink with your flame — it balances the char.
            <br><br>
            Stuck? Your cart & wishlist auto-sync across devices. Just sign in.
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:14px">
            <button onclick="location.hash='#/menu?filter=Chef Pick'" style="background:var(--text-main);color:var(--bg-app);border:0;padding:12px;border-radius:12px;font-size:11px;font-weight:900">Chef's Pick 🔥</button>
            <button onclick="location.hash='#/menu?filter=Drinks'" style="background:var(--bg-app);border:1px solid var(--border);color:var(--text-main);padding:12px;border-radius:12px;font-size:11px;font-weight:800">Cold Drinks 🧊</button>
          </div>
          <div style="text-align:center;margin-top:12px;font-size:10px;color:var(--text-muted);letter-spacing:.3px">📍 Al Wasl • 6PM-2AM • KOVA20 = 20% OFF</div>
        </div>
      </div>
    `;
  },

  cardHTML(o,featured){
    let items=[]; try{items=typeof o.items==='string'?JSON.parse(o.items):o.items}catch{}
    const date=new Date(o.created_at).toLocaleString('en-AE',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});
    const raw=(o.status||'pending').toLowerCase(); const status=raw==='done'?'delivered':raw;
    const steps=['pending','preparing','ready','delivered']; const curIdx=steps.indexOf(status);
    return `<div class="order-card ${featured?'featured':''}">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
        <div style="display:flex;gap:8px;align-items:center"><div style="font-weight:900">#${o.id.slice(0,8).toUpperCase()}</div><span class="status ${status}">${status}</span><span style="font-size:11px;color:var(--text-muted)">• ${date}</span></div>
        <div style="display:flex;gap:8px;align-items:center"><div style="font-weight:900">AED ${Number(o.total).toFixed(2)}</div><button onclick="Orders.orderAgain('${o.id}')" style="background:var(--bg-app);border:1px solid var(--border);padding:6px 12px;border-radius:999px;font-size:11px;font-weight:800;cursor:pointer">Order Again</button></div>
      </div>
      <div class="timeline">${steps.map((s,i)=>{const done=i<curIdx,active=i===curIdx; return `<div class="t-dot ${done?'done':''} ${active?'active':''}">${done?'✓':i+1}</div>${i<3?`<div class="t-line ${done?'done':''}"></div>`:''}`}).join('')}</div>
      <div style="display:flex;gap:10px;overflow-x:auto;padding:4px 0">${items.map(it=>`<div class="order-item"><div style="font-weight:700;font-size:11px">${it.title||it.name}</div><div style="font-size:10px;color:var(--text-muted)">x${it.qty} · AED ${it.price}</div></div>`).join('')}</div>
    </div>`;
  },

  async orderAgain(id){
    const token=localStorage.getItem('kova_token');
    const res=await fetch(`${this.WORKER_URL}/api/guest/orders`,{headers:{'Authorization':`Bearer ${token}`}});
    const data=await res.json();
    const order=(data.orders||[]).find(o=>o.id===id);
    let items=[]; try{items=typeof order.items==='string'?JSON.parse(order.items):order.items}catch{}
    localStorage.setItem('kova_cart', JSON.stringify(items.map(i=>({...i,qty:i.qty||1}))));
    window.dispatchEvent(new CustomEvent('kova:cart')); location.hash='#/menu';
  },
  viewInvoice(id){ alert('Invoice #'+id.slice(0,8)); }
};
