// KOVA Recommendations - FIXED - Reads from any source
export const Recommendations = {
  WORKER_URL: 'https://kova-guest-sign-up.dopetone701.workers.dev',

  async getMenuItems(){
    // 1. Try localStorage cache
    try{
      const c = JSON.parse(localStorage.getItem('kova_menu_cache')||'[]');
      if(c.length>0) return c;
    }catch{}

    // 2. Try IndexedDB db.js
    try{
      const { db } = await import('../store/db.js');
      const items = await db.getAll('menu');
      if(items?.length){ 
        localStorage.setItem('kova_menu_cache', JSON.stringify(items));
        return items;
      }
    }catch{}

    // 3. Try your services/api.js
    try{
      const { api } = await import('../services/api.js');
      if(api?.getMenu){
        const items = await api.getMenu();
        if(items?.length) return items;
      }
    }catch{}

    // 4. Try Worker /api/menu
    try{
      const r = await fetch(`${this.WORKER_URL}/api/menu`);
      if(r.ok){ 
        const d=await r.json(); 
        const items=d.items||d.menu||d.data||d;
        if(Array.isArray(items) && items.length) return items;
      }
    }catch{}

    // 5. FINAL FALLBACK - so you ALWAYS see something
    return [
      {id:'1', title:'KOVA Special Noodles', name:'KOVA Special Noodles', price:45, image:'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300'},
      {id:'2', title:'Kingfish Ceviche', name:'Kingfish Ceviche', price:72, image:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300'},
      {id:'3', title:'Scallop Raw Lime', name:'Scallop Raw Lime', price:88, image:'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300'},
      {id:'4', title:'Truffle Risotto', name:'Truffle Risotto', price:95, image:'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=300'},
      {id:'5', title:'Wagyu Steak', name:'Wagyu Steak', price:180, image:'https://images.unsplash.com/photo-1546964052-d9334ceb32ee?w=300'},
      {id:'6', title:'Matcha Tiramisu', name:'Matcha Tiramisu', price:38, image:'https://images.unsplash.com/photo-1571877222312-a94131522bdc?w=300'},
    ];
  },

  shuffle(arr, count=6){
    return [...arr].sort(()=>0.5-Math.random()).slice(0,count);
  },

  async render({title='Recommended For You', count=6, excludeIds=[]} = {}) {
  const items = await this.getMenuItems();
  if(!items.length) return ``;
  
  let filtered = items.filter(it=> !excludeIds.includes(it.id||it.item_id));
  if(filtered.length < count) filtered = items;
  const picked = this.shuffle(filtered, count);
  
  const wishlist = JSON.parse(localStorage.getItem('kova_wish')||'[]');
  const wishIds = new Set(wishlist.map(w=> String(w.id||w.item_id)));
  const token = localStorage.getItem('kova_token');

  const fallbacks = [
    'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400'
  ];

  return `
    <style>
      .kova-rec-wrap{margin-top:22px;margin-bottom:8px;overflow:visible}
      .kova-rec-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
      .kova-rec-title{font-weight:900;font-size:17px;letter-spacing:-.4px}
      .kova-rec-grid{display:flex;gap:12px;overflow-x:auto;overflow-y:visible;padding:8px 4px 16px;margin:-8px -4px;scroll-snap-type:x mandatory;scrollbar-width:none}
      .kova-rec-grid::-webkit-scrollbar{display:none}
      .kova-rec-card{background:var(--bg-card);border:1px solid var(--border);border-radius:16px;overflow:hidden;cursor:pointer;transition:.22s;min-width:160px;max-width:160px;flex-shrink:0;position:relative;will-change:transform}
      .kova-rec-card:hover{transform:translateY(-4px) scale(1.02);border-color:var(--accent);box-shadow:0 12px 24px rgba(0,0,0,.3);z-index:5}
      .kova-rec-img{height:110px;background-size:cover;background-position:center;position:relative;background-color:#1a1a1e}
      .kova-rec-badge{position:absolute;top:8px;left:8px;background:var(--accent);color:#000;font-size:8px;font-weight:900;padding:3px 7px;border-radius:999px}
      .kova-rec-heart{position:absolute;top:8px;right:8px;width:28px;height:28px;border-radius:50%;background:rgba(10,10,11,.8);backdrop-filter:blur(8px);border:1px solid var(--border);display:grid;place-items:center;font-size:12px;cursor:pointer;z-index:3;transition:.2s}
      .kova-rec-heart:hover{transform:scale(1.1)}
      .kova-rec-info{padding:10px}
      .kova-rec-name{font-weight:700;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .kova-rec-meta{font-size:11px;color:var(--text-muted);margin-top:6px;display:flex;justify-content:space-between;align-items:center}
      .kova-rec-add{background:var(--accent);color:#000;border:0;padding:4px 10px;border-radius:999px;font-size:10px;font-weight:800;cursor:pointer}
      .kova-rec-add.added{background:#F4F4F5}
    </style>
    <div class="kova-rec-wrap">
      <div class="kova-rec-head">
        <div class="kova-rec-title">${title}</div>
        <button onclick="location.hash='#/menu'" style="background:transparent;border:1px solid var(--border);color:var(--text-muted);padding:6px 12px;border-radius:999px;font-size:11px;font-weight:700;cursor:pointer">View All</button>
      </div>
      <div class="kova-rec-grid">
        ${picked.map((it,i)=>{
          const id = String(it.id||it.item_id);
          const bg = it.image || it.img || it.image_url || fallbacks[i % fallbacks.length];
          const inWish = wishIds.has(id);
          return `
          <div class="kova-rec-card">
            <div class="kova-rec-img" style="background-image:url('${bg}')" onclick="location.hash='#/menu?filter=${encodeURIComponent(it.title||it.name||'')}'">
              <span class="kova-rec-badge">TRENDING</span>
              <button class="kova-rec-heart" data-wish="${id}" style="color:${inWish?'#FF4E1F':'white'}">${inWish?'❤️':'🤍'}</button>
            </div>
            <div class="kova-rec-info">
              <div class="kova-rec-name">${it.title||it.name}</div>
              <div class="kova-rec-meta">
                <span>AED ${it.price}</span>
                <button class="kova-rec-add" data-add="${id}">+ Add</button>
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>
  `;
},

// Call this in afterRender of orders.js
attachEvents(){
  document.querySelectorAll('[data-wish]').forEach(btn=>{
    btn.onclick = async (e)=>{
      e.stopPropagation();
      const id = btn.dataset.wish;
      const all = JSON.parse(localStorage.getItem('kova_menu_cache')||'[]');
      const item = all.find(x=> String(x.id||x.item_id)===String(id));
      if(!item) return;
      let wish = JSON.parse(localStorage.getItem('kova_wish')||'[]');
      const idx = wish.findIndex(w=> String(w.id||w.item_id)===String(id));
      if(idx>=0){ wish.splice(idx,1); btn.textContent='🤍'; btn.style.color='white'; }
      else{ wish.push(item); btn.textContent='❤️'; btn.style.color='#FF4E1F'; }
      localStorage.setItem('kova_wish', JSON.stringify(wish));
      window.dispatchEvent(new CustomEvent('kova:wishlist',{detail:wish.length}));
      // D1 sync
      const token=localStorage.getItem('kova_token');
      if(token){
        try{ await fetch(`https://kova-guest-sign-up.dopetone701.workers.dev/api/guest/wishlist/toggle`,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify({item_id:String(id),title:item.title||item.name,price:String(item.price),image:item.image||''})}); }catch{}
      }
    };
  });
  document.querySelectorAll('[data-add]').forEach(btn=>{
    btn.onclick = async (e)=>{
      e.stopPropagation();
      const id = btn.dataset.add;
      const all = JSON.parse(localStorage.getItem('kova_menu_cache')||'[]');
      const item = all.find(x=> String(x.id||x.item_id)===String(id));
      if(!item) return;
      let cart = JSON.parse(localStorage.getItem('kova_cart')||'[]');
      const ex = cart.find(c=> String(c.id||c.item_id)===String(id));
      if(ex) ex.qty = (ex.qty||1)+1; else cart.push({...item, qty:1, id:item.id||item.item_id});
      localStorage.setItem('kova_cart', JSON.stringify(cart));
      btn.textContent = `✓ x${cart.find(c=> String(c.id||c.item_id)===String(id)).qty}`;
      btn.classList.add('added');
      window.dispatchEvent(new CustomEvent('kova:cart',{detail:cart.reduce((s,i)=>s+(i.qty||1),0)}));
      const token=localStorage.getItem('kova_token');
      if(token){
        try{ await fetch(`https://kova-guest-sign-up.dopetone701.workers.dev/api/guest/cart/add`,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify({item_id:String(id),title:item.title||item.name,price:String(item.price),image:item.image||'',qty:1})}); }catch{}
      }
      window.kovaOpenCart && window.kovaOpenCart();
    };
  });
}

};

window.kovaAddToCartFromRec = async(id)=>{
  try{
    const items = await Recommendations.getMenuItems();
    const found = items.find(i=> (i.id||i.item_id)==id);
    if(!found) return;
    let cart=[]; try{cart=JSON.parse(localStorage.getItem('kova_cart')||'[]')}catch{}
    const exist=cart.find(c=> (c.id||c.item_id)==id);
    if(exist) exist.qty=(exist.qty||1)+1; else cart.push({...found, qty:1});
    localStorage.setItem('kova_cart', JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('kova:cart'));
    window.kovaOpenCart && window.kovaOpenCart();
  }catch(e){console.log(e)}
};
