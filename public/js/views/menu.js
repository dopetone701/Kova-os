// KOVA Menu - MOBILE LOCKED - NO SIDE DRAG - HEART ON CARDS ONLY - STICKY PILL BAR DOCKED TO NAV + D1 GUEST AUTH SAFE
const API_BASE = "https://kova-clean-api.dopetone701.workers.dev";
const GUEST_WORKER = "https://kova-guest-sign-up.dopetone701.workers.dev";

export const Menu = {
  dishes: [],
  page: 0,
  activeFilter: 'All',
  searchQuery: '',
  wishlist: JSON.parse(localStorage.getItem('kova_wish')||'[]'),
  cart: JSON.parse(localStorage.getItem('kova_cart')||'[]'),

  menuData: [
    { title: 'Hamachi Tiradito', ar: 'هاماشي', desc: 'Ember yuzu, finger lime, shiso', price: '72', tags: ['RAW','GF'], section: 'Raw & Cold', fire: 'Raw', image: '' },
    { title: 'Wagyu Ribeye — Stone', ar: 'ريب آي', desc: '45-day dry, 800°C stone', price: '185', tags: ['HOT','SIGNATURE'], section: 'From The Jمر', fire: 'Flame', image: '' },
  ],

  async render() {
    try {
      const res = await fetch(`${API_BASE}/api/menu`);
      const live = await res.json();
      if (Array.isArray(live) && live.length > 0) {
        this.dishes = live.map(m => ({
          title: m.name, ar: m.name_ar||'', desc: m.description||'', price: m.price,
          tags: [m.category, m.badge].filter(Boolean),
          section: m.category||'Flame', fire: m.category||'Flame',
          image: m.image||'', id: m.id, category: m.category||'', badge: m.badge||'', isLive: true
        }));
      } else this.dishes = [...this.menuData];
    } catch(e){ this.dishes = [...this.menuData]; }

    try{ localStorage.setItem('kova_menu_cache', JSON.stringify(this.dishes)); }catch{}

    const token = localStorage.getItem('kova_token');
    if(token){
      try{
        const r = await fetch(`${GUEST_WORKER}/api/guest/me`, {headers:{'Authorization':`Bearer ${token}`}});
        if(r.ok){
          const d = await r.json();
          if(d.cart && Array.isArray(d.cart)){
            this.cart = d.cart.map(c=>({id:c.item_id, title:c.title, price:c.price, image:c.image, qty:c.qty}));
            localStorage.setItem('kova_cart', JSON.stringify(this.cart));
          }
          if(d.wishlist && Array.isArray(d.wishlist)){
            this.wishlist = d.wishlist.map(w=>({id:w.item_id, title:w.title, price:w.price, image:w.image, ar:'', desc:''}));
            localStorage.setItem('kova_wish', JSON.stringify(this.wishlist));
          }
        }
      }catch(e){}
    }

    const urlParams = new URLSearchParams(location.search);
    const urlFilter = urlParams.get('filter') || new URLSearchParams(location.hash.split('?')[1]||'').get('filter');
    const savedFilter = sessionStorage.getItem('kova_filter');
    if(urlFilter) this.activeFilter = urlFilter;
    else if(savedFilter) this.activeFilter = savedFilter;

    const cartCount = this.cart.reduce((s,i)=>s+(i.qty||1),0);
    const cartTotal = this.cart.reduce((s,i)=>s + (parseFloat(i.price)||0)*(i.qty||1),0);

    return `
      <style>
      #app{padding-top:0 !important}
.menu-wrap{max-width:1300px;margin:0 auto;padding:0 24px 80px 24px;box-sizing:border-box;overflow:visible;background:var(--bg-app)}
.menu-head{padding:20px 0 12px 0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px}
.filter-bar{position:sticky;top:0;z-index:40;background:rgba(10,10,11,0.88);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border-bottom:1px solid var(--border);margin:0 -24px;padding:12px 24px;display:flex;gap:8px;align-items:center;overflow-x:auto;overflow-y:hidden;white-space:nowrap;scrollbar-width:none;-webkit-overflow-scrolling:touch;overscroll-behavior-x:contain;touch-action:pan-x;will-change:transform}
.filter-bar::-webkit-scrollbar{display:none}
.filter-chip{flex-shrink:0;white-space:nowrap;padding:8px 14px;border-radius:999px;border:1px solid var(--border);font-weight:700;font-size:11px;cursor:pointer;transition:.18s ease;background:var(--bg-card);color:var(--text-muted)}
.filter-chip.active{background:var(--text-main);color:var(--bg-app);border-color:var(--text-main)}
.filter-chip.idle{background:var(--bg-card);color:var(--text-muted)}
.filter-chip:hover{border-color:var(--text-muted);transform:translateY(-1px)}
.menu-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:14px;margin-top:18px;width:100%;box-sizing:border-box}
.k-card{background:var(--bg-card);border:1px solid var(--border);border-radius:16px;overflow:hidden;cursor:pointer;transition:.2s;position:relative;min-width:0;max-width:100%;box-sizing:border-box}
.k-card:hover{border-color:#3a3a3e;transform:translateY(-2px)}
.cart-bar{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--text-main);color:var(--bg-app);padding:12px 20px;border-radius:999px;display:flex;gap:12px;align-items:center;box-shadow:0 10px 30px rgba(0,0,0,0.4);z-index:60;max-width:90vw}
@media(max-width:768px){
  html, body { overflow-x:hidden!important; max-width:100vw!important; }
  #app{padding-left:0 !important;padding-right:0 !important}
  .menu-wrap{padding:0 12px 80px 12px!important;margin:0 auto!important;width:100%!important;max-width:100%!important;box-sizing:border-box!important;overflow:visible!important}
  .menu-head{padding:16px 12px 10px 12px !important}
  .filter-bar{margin:0 -12px!important;padding:12px 12px!important;width:calc(100% + 24px)!important;max-width:100vw!important;box-sizing:border-box!important;top:0!important;background:rgba(10,10,11,0.94)!important}
  .menu-grid{grid-template-columns:1fr!important;gap:12px!important;width:100%!important}
  @media(min-width:430px) and (max-width:768px){ .menu-grid{grid-template-columns:repeat(2,1fr)!important} }
  .k-card{width:100%!important;max-width:100%!important;min-width:0!important}
}
/* === LIGHT LOCK - ONLY BG LIGHT === */
[data-theme="light"] .menu-wrap{background:#ece8df !important}
[data-theme="light"] #app{background:#ece8df !important}
[data-theme="light"] .filter-bar{background:rgba(10,10,11,0.88) !important;border-bottom-color:#27272A !important}
[data-theme="light"] .filter-chip{background:#1C1C1F !important;border-color:#27272A !important;color:#A1A1AA !important}
[data-theme="light"] .filter-chip.active{background:#F4F4F5 !important;color:#0A0A0B !important;border-color:#F4F4F5 !important}
[data-theme="light"] .k-card{background:#1C1C1F !important;border-color:#27272A !important}
[data-theme="light"] .menu-head h2{color:#121214 !important}
[data-theme="light"] .menu-head p{color:#8B8680 !important}

/* FIX FLOATING CART WASHED */
[data-theme="light"] .cart-bar,
[data-theme="light"] #cartBar {
  background: #121214 !important;
  border: 1px solid #27272A !important;
  color: #F4F4F5 !important;
  box-shadow: 0 10px 40px rgba(0,0,0,0.5) !important;
}
[data-theme="light"] .cart-bar span,
[data-theme="light"] #cartBar span {
  color: #F4F4F5 !important;
}
[data-theme="light"] .cart-bar button,
[data-theme="light"] #cartBar button {
  color: #000 !important;
}
[data-theme="light"] .cart-bar button:last-child,
[data-theme="light"] #cartBar button:last-child {
  background: #F4F4F5 !important;
  color: #0A0A0B !important;
}

      </style>

      <div class="menu-wrap" id="menuWrap">
        <div class="menu-head">
          <div style="min-width:0">
            <h2 style="font-size:28px;font-weight:900;letter-spacing:-1px;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Menu <span style="font-size:11px;color:var(--text-muted);font-weight:500">— ${this.dishes.length}</span></h2>
            <p style="color:var(--text-muted);font-size:11px;margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Filter: ${this.activeFilter} • ${token?'☁️ D1 Synced':'📱 Local'} • Sticky docked to nav</p>
          </div>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
            <button id="viewCartBtn" style="background:var(--bg-card);border:1px solid var(--border);color:var(--text-main);padding:8px 14px;border-radius:999px;font-size:11px;font-weight:700;cursor:pointer">🛒 ${cartCount} • AED ${cartTotal.toFixed(0)}</button>
            <button id="checkoutBtn" style="background:var(--accent);color:#000;border:0;padding:8px 16px;border-radius:999px;font-size:11px;font-weight:800;cursor:pointer;display:${cartCount?'inline-block':'none'}">Checkout → Orders </button>
          </div>
        </div>

        <div class="filter-bar" id="filterBar">
          ${['All','Flame','Raw & Cold','Stone','Sweets','Drinks','Chef Pick','Trending','Vegan','Gluten Free','Signature','Hot'].map(f=>{
            const active = this.activeFilter.toLowerCase() === f.toLowerCase() || (f==='Raw & Cold' && this.activeFilter.toLowerCase()==='raw') || (f==='Flame' && this.activeFilter.toLowerCase().includes('flame'));
            return `<button data-filter="${f}" class="filter-chip ${active?'active':'idle'}">${f}</button>`;
          }).join('')}
        </div>

        <div id="menuGrid" class="menu-grid"></div>
        <div id="sentinel" style="height:40px;display:flex;align-items:center;justify-content:center;color:var(--text-muted);font-size:11px;margin-top:10px">Loading ember...</div>

        <div id="cartBar" style="position:fixed;bottom:16px;left:50%;transform:translateX(-50%);z-index:99999;display:${cartCount?'flex':'none'};gap:8px;align-items:center;background:#F4F4F5;border-radius:999px;padding:6px 8px 6px 12px;box-shadow:0 12px 32px rgba(0,0,0,.35);border:1px solid #E5E5E5;white-space:nowrap;height:42px">
  <span style="font-weight:800;font-size:11px;color:#000;white-space:nowrap">🛒 ${cartCount} • AED ${cartTotal.toFixed(0)} • D1 Saved</span>
  <button onclick="location.hash='#/checkout'" style="background:#E6E82A;color:#000;border:0;padding:8px 14px;border-radius:999px;font-weight:900;font-size:11px;cursor:pointer;white-space:nowrap">Checkout</button>
  <button onclick="location.hash='#/orders'" style="background:transparent;color:#000;border:0;padding:8px 10px;font-weight:700;font-size:11px;cursor:pointer;white-space:nowrap">My Orders</button>
</div>

      </div>
    `;
  },

  async afterRender() {
    const grid = document.getElementById('menuGrid');
    if(!grid) return;

    const token = localStorage.getItem('kova_token');

    // D1 API helpers - safe, no break if offline
    const d1 = {
      async cartAdd(item){
        if(!token) return;
        try{
          await fetch(`${GUEST_WORKER}/api/guest/cart/add`, {method:'POST', headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`}, body: JSON.stringify({item_id: String(item.id), title: item.title, price: String(item.price), image: item.image||'', qty: item.qty||1})});
        }catch(e){ console.warn('D1 cart add failed', e); }
      },
      async cartRemove(item_id){
        if(!token) return;
        try{ await fetch(`${GUEST_WORKER}/api/guest/cart/remove`, {method:'POST', headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`}, body: JSON.stringify({item_id: String(item_id)})}); }catch{}
      },
      async wishToggle(item){
        if(!token) return;
        try{ await fetch(`${GUEST_WORKER}/api/guest/wishlist/toggle`, {method:'POST', headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`}, body: JSON.stringify({item_id: String(item.id), title: item.title, price: String(item.price), image: item.image||''})}); }catch{}
      },
      async createOrder(){
        if(!token){ alert('Sign in to create order'); location.hash='#/auth'; return null; }
        try{
          const r = await fetch(`${GUEST_WORKER}/api/guest/orders/create`, {method:'POST', headers:{'Authorization':`Bearer ${token}`}});
          const d = await r.json();
          if(!r.ok) throw new Error(d.error||'Failed');
          return d.order;
        }catch(e){ alert('Order failed: '+e.message); return null; }
      }
    };

    const updateTopbarWishlist = () => {
      const count = this.wishlist.length;
      localStorage.setItem('kova_wish', JSON.stringify(this.wishlist));
      window.dispatchEvent(new CustomEvent('kova:wishlist', {detail: count}));
    };

    const updateTopbarCart = () => {
      localStorage.setItem('kova_cart', JSON.stringify(this.cart));
      const count = this.cart.reduce((s,i)=>s+(i.qty||1),0);
      const total = this.cart.reduce((s,i)=>s + (parseFloat(i.price)||0)*(i.qty||1),0);
      const viewBtn = document.getElementById('viewCartBtn');
      const cartBar = document.getElementById('cartBar');
      const checkoutBtn = document.getElementById('checkoutBtn');
      if(viewBtn) viewBtn.textContent = `🛒 ${count} • AED ${total.toFixed(0)}`;
      if(cartBar){
        cartBar.style.display = count?'flex':'none';
        const span = cartBar.querySelector('span');
        if(span) span.textContent = `🛒 ${count} • AED ${total.toFixed(0)} • ${token?'D1 Saved':'Local'}`;
      }
      if(checkoutBtn) checkoutBtn.style.display = count?'inline-block':'none';
      window.dispatchEvent(new CustomEvent('kova:cart', {detail: count}));
    };

    const getFiltered = () => {
      let data = [...this.dishes];
      if(this.activeFilter!=='All'){
        const f = this.activeFilter.toLowerCase();
        if(f==='wishlist'){
          const wishIds = new Set(this.wishlist.map(w=>String(w.id)));
          return data.filter(d=>wishIds.has(String(d.id)));
        }
        data = data.filter(d=>{
          const hay = `${d.section} ${d.fire} ${d.category} ${d.tags.join(' ')} ${d.badge}`.toLowerCase();
          if(f==='flame') return hay.includes('flame') || hay.includes('ember') || hay.includes('wood');
          if(f==='raw' || f==='raw & cold') return hay.includes('raw') || hay.includes('cold') || hay.includes('ceviche');
          if(f==='stone') return hay.includes('stone') || hay.includes('baked') || hay.includes('pizza');
          if(f==='drinks') return hay.includes('drink') || hay.includes('karak') || hay.includes('soda');
          return hay.includes(f) || (f==='vegan'&&hay.includes('vg')) || (f==='gluten free'&&hay.includes('gf'));
        });
      }
      if(this.searchQuery.trim()){
        const q = this.searchQuery.toLowerCase();
        data = data.filter(d=> `${d.title} ${d.ar} ${d.desc} ${d.section} ${d.fire} ${d.category}`.toLowerCase().includes(q));
      }
      return data;
    };

    const loadMore = (reset=false) => {
      if(reset){ grid.innerHTML=''; this.page=0; }
      const data = getFiltered();
      if(data.length===0){
        grid.innerHTML=`<div style="grid-column:1/-1;padding:40px;text-align:center;color:var(--text-muted)">No results for ${this.activeFilter} — try All<br><button onclick="location.hash='#/menu'" style="margin-top:10px;background:var(--bg-card);border:1px solid var(--border);color:var(--text-main);padding:6px 12px;border-radius:999px;font-size:11px;cursor:pointer">Clear Filter</button></div>`;
        const sent = document.getElementById('sentinel');
        if(sent) sent.textContent='';
        return;
      }
      for(let i=0;i<12;i++){
        const idx = this.page*12+i; if(idx>=data.length) break;
        const d = data[idx];
        const inWish = this.wishlist.find(w=>String(w.id)===String(d.id));
        const inCart = this.cart.find(c=>String(c.id)===String(d.id));
        grid.insertAdjacentHTML('beforeend', `
          <div class="k-card" data-id="${d.id}">
            <div style="height:180px;background:${d.image?`url(${d.image}) center/cover`:`linear-gradient(135deg,#1C1C1F,#27272A)`};position:relative;overflow:hidden">
              <span style="position:absolute;top:10px;left:10px;background:rgba(10,10,11,0.85);backdrop-filter:blur(8px);border:1px solid var(--border);color:var(--text-main);font-size:9px;font-weight:700;padding:4px 8px;border-radius:999px;max-width:60%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${d.section}</span>
              <button class="wish-heart" data-id="${d.id}" style="position:absolute;top:10px;right:10px;width:34px;height:34px;border-radius:50%;border:1px solid var(--border);background:rgba(10,10,13,0.9);color:${inWish?'#FF4E1F':'var(--text-main)'};cursor:pointer;z-index:2;display:grid;place-items:center;font-size:14px;transition:.2s">${inWish?'❤️':'🤍'}</button>
              <span style="position:absolute;bottom:10px;right:10px;background:var(--bg-card);border:1px solid var(--border);color:var(--text-main);font-size:11px;font-weight:800;padding:5px 10px;border-radius:999px">AED ${d.price}</span>
            </div>
            
            <div style="padding:14px;min-width:0;box-sizing:border-box">
              <div style="font-size:14px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${d.title}</div>
              <div style="font-size:11px;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px">${d.ar}</div>
              <div style="font-size:12px;color:var(--text-muted);margin-top:6px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:32px;line-height:1.4">${d.desc}</div>
              <button class="add-cart" data-id="${d.id}" style="margin-top:10px;width:100%;background:${inCart?'#F4F4F5':'#C8FF00'};color:#0A0A0B;border:none;padding:10px;border-radius:999px;font-weight:800;font-size:11px;cursor:pointer">${inCart?`added `:'+ Add to Cart '}</button>
            </div>
          </div>
        `);
      }
      this.page++;
      const sentinel = document.getElementById('sentinel');
      const data2 = getFiltered();
      if(sentinel){
        if(this.page*12 >= data2.length) sentinel.textContent = `End • ${data2.length} dishes in ${this.activeFilter} • ${token?'D1':'Local'}`;
        else sentinel.textContent = 'Loading ember...';
      }

      grid.querySelectorAll('.wish-heart').forEach(b=>{
        b.onclick = async (e)=>{
          e.stopPropagation();
          const id=b.dataset.id;
          const item=this.dishes.find(x=>String(x.id)===String(id));
          const ex=this.wishlist.findIndex(w=>String(w.id)===String(id));
          if(ex>=0) this.wishlist.splice(ex,1);
          else this.wishlist.push(item);
          updateTopbarWishlist();
          b.textContent = ex>=0 ? '🤍' : '❤️';
          b.style.color = ex>=0 ? 'var(--text-main)' : '#FF4E1F';
          await d1.wishToggle(item);
        };
      });

      grid.querySelectorAll('.add-cart').forEach(b=>{
        b.onclick = async (e)=>{
          e.stopPropagation();
          const id=b.dataset.id;
          const item=this.dishes.find(x=>String(x.id)===String(id));
          if(!item) return;
          const ex=this.cart.find(c=>String(c.id)===String(id));
          if(ex) ex.qty = (ex.qty||1)+1;
          else this.cart.push({...item, qty:1});
          updateTopbarCart();
          const qty = this.cart.find(c=>String(c.id)===String(id)).qty;
          b.textContent = `added`;
          b.style.background = '#F4F4F5';
          await d1.cartAdd({...item, qty:1});
        };
      });
    };

    // Checkout → D1 Order
    document.getElementById('checkoutBtn')?.addEventListener('click', async()=>{
      if(this.cart.length===0) return;
      const btn = document.getElementById('checkoutBtn');
      const old = btn.textContent;
      btn.textContent='Creating order in D1...'; btn.disabled=true;
      const order = await d1.createOrder();
      btn.textContent=old; btn.disabled=false;
      if(order){
        this.cart = [];
        localStorage.setItem('kova_cart', JSON.stringify([]));
        updateTopbarCart();
        alert(`Order #${order.id.slice(0,8)} created! AED ${order.total} — saved in D1. Check My Orders. Never lost even if you change device.`);
        location.hash='#/orders';
      }
    });
    document.getElementById('viewCartBtn')?.addEventListener('click', ()=>{
      location.hash='#/orders';
    });

    document.querySelectorAll('.filter-chip').forEach(chip=>{
      chip.onclick = ()=>{
        this.activeFilter = chip.dataset.filter;
        sessionStorage.setItem('kova_filter', this.activeFilter);
        const url = new URL(window.location.href);
        url.searchParams.set('filter', this.activeFilter);
        // keep hash mode
        const baseHash = location.hash.split('?')[0]||'#/menu';
        location.hash = baseHash + `?filter=${encodeURIComponent(this.activeFilter)}`;
        document.querySelectorAll('.filter-chip').forEach(c=>{ c.classList.remove('active'); c.classList.add('idle'); });
        chip.classList.add('active'); chip.classList.remove('idle');
        loadMore(true);
      };
    });

    // Global search from Topbar
    window.addEventListener('kova:search', (e)=>{
      this.searchQuery = e.detail||'';
      loadMore(true);
    });
    window.addEventListener('kova:show-wishlist', ()=>{
      this.activeFilter='Wishlist';
      loadMore(true);
      document.querySelectorAll('.filter-chip').forEach(c=>{ c.classList.remove('active'); c.classList.add('idle'); });
    });

    window.navigateMenu = (filter)=>{
      this.activeFilter = filter || 'All';
      sessionStorage.setItem('kova_filter', this.activeFilter);
      location.hash = `#/menu?filter=${encodeURIComponent(this.activeFilter)}`;
      setTimeout(()=>{ if(document.getElementById('menuGrid')) loadMore(true); }, 100);
    };
    window.filterBy = (filter)=>{ this.activeFilter = filter; loadMore(true); };

    loadMore(true);
    updateTopbarWishlist();
    updateTopbarCart();
    const observer = new IntersectionObserver((entries)=>{ if(entries[0].isIntersecting) loadMore(); }, {rootMargin:'400px'});
    const sent = document.getElementById('sentinel');
    if(sent) observer.observe(sent);
    setTimeout(()=> sessionStorage.removeItem('kova_filter'), 1200);
  }
};
