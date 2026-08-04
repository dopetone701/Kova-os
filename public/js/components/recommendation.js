// KOVA Recommendations - BLACK TITLE IN LIGHT MODE - FINAL
export const Recommendations = {
  WORKER_URL: 'https://kova-guest-sign-up.dopetone701.workers.dev',
  _pool: [],
  _count: 6,
  _interval: null,
  _visibleIds: new Set(),

  async getMenuItems(){
    try{ const c=JSON.parse(localStorage.getItem('kova_menu_cache')||'[]'); if(c.length>0){ this._pool=c; return c; } }catch{}
    try{ const { db } = await import('../store/db.js'); const items = await db.getAll('menu'); if(items?.length){ localStorage.setItem('kova_menu_cache', JSON.stringify(items)); this._pool=items; return items; } }catch{}
    try{ const { api } = await import('../services/api.js'); if(api?.getMenu){ const items = await api.getMenu(); if(items?.length){ this._pool=items; return items; } } }catch{}
    try{ const r = await fetch(`${this.WORKER_URL}/api/menu`); if(r.ok){ const d=await r.json(); const items=d.items||d.menu||d.data||d; if(Array.isArray(items) && items.length){ this._pool=items; return items; } } }catch{}
    const fb=[{id:'1', title:'KOVA Special Noodles', price:45, image:'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300'},{id:'2', title:'Kingfish Ceviche', price:72, image:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300'},{id:'3', title:'Scallop Raw Lime', price:88, image:'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300'},{id:'4', title:'Truffle Risotto', price:95, image:'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=300'},{id:'5', title:'Wagyu Steak', price:180, image:'https://images.unsplash.com/photo-1546964052-d9334ceb32ee?w=300'},{id:'6', title:'Matcha Tiramisu', price:38, image:'https://images.unsplash.com/photo-1571877222312-a94131522bdc?w=300'}];
    this._pool=fb; return fb;
  },
  shuffle(arr, count=6){ return [...arr].sort(()=>0.5-Math.random()).slice(0,count); },
  getFallbacks(){ return ['https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400','https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400','https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400']; },
  cardHTML(it,i){
    const fallbacks=this.getFallbacks();
    const id=String(it.id||it.item_id);
    const bg=it.image||it.img||it.image_url||fallbacks[i%3];
    const wishlist=JSON.parse(localStorage.getItem('kova_wish')||'[]');
    const wishIds=new Set(wishlist.map(w=>String(w.id||w.item_id)));
    const inWish=wishIds.has(id);
    return `<div class="kova-rec-card" data-card="${id}"><div class="kova-rec-img" style="background-image:url('${bg}')" data-go="${id}"><span class="kova-rec-badge">TRENDING</span><button class="kova-rec-heart" data-wish="${id}" style="color:${inWish?'#FF4E1F':'white'}">${inWish?'❤️':'🤍'}</button></div><div class="kova-rec-info"><div class="kova-rec-name">${it.title||it.name}</div><div class="kova-rec-meta"><span>AED ${it.price}</span><button class="kova-rec-add" data-add="${id}">+ Add</button></div></div></div>`;
  },

  async render({title='Recommended For You', count=6, excludeIds=[]} = {}) {
    const items = await this.getMenuItems(); if(!items.length) return ``;
    this._count=count;
    let filtered = items.filter(it=>!excludeIds.includes(it.id||it.item_id));
    if(filtered.length < count) filtered = items;
    this._pool=filtered;
    const picked = this.shuffle(filtered, count);
    this._visibleIds = new Set(picked.map(p=>String(p.id||p.item_id)));
    return `
    <style>
  .kova-rec-wrap{margin-top:22px;margin-bottom:12px;width:100%;max-width:100%;box-sizing:border-box;overflow:hidden;position:relative;z-index:1}
  .kova-rec-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;gap:12px;width:100%;box-sizing:border-box}
  .kova-rec-title{
     font-weight:900!important;
     font-size:17px!important;
     letter-spacing:-.4px!important;
     display:flex!important;
     align-items:center!important;
     gap:8px!important;
     opacity:1!important;
     /* DEFAULT DARK MODE WHITE */
     color:#F4F4F5!important;
     -webkit-text-fill-color:#F4F4F5!important;
   }
  .kova-rec-grid{display:flex;gap:12px;overflow-x:auto;overflow-y:hidden;padding:14px 6px 22px;margin:-14px -6px;scroll-snap-type:x mandatory;scrollbar-width:none;-webkit-overflow-scrolling:touch;overscroll-behavior-x:contain;touch-action:pan-x;cursor:grab;user-select:none;width:100%;max-width:100%;box-sizing:border-box}
  .kova-rec-grid::-webkit-scrollbar{display:none}
  .kova-rec-grid.dragging{scroll-snap-type:none;cursor:grabbing}
  .kova-rec-card{background:var(--bg-card);border:1px solid var(--border);border-radius:16px;overflow:hidden;cursor:pointer;min-width:165px;max-width:165px;flex-shrink:0;position:relative;transition:transform.22s ease, opacity.35s ease;scroll-snap-align:start}
  .kova-rec-card:hover{transform:translateY(-6px) scale(1.03);border-color:var(--accent);box-shadow:0 14px 28px rgba(0,0,0,.32);z-index:5}
  .kova-rec-img{height:110px;background-size:cover;background-position:center;position:relative;background-color:#1a1a1e}
  .kova-rec-badge{position:absolute;top:8px;left:8px;background:var(--accent);color:#000;font-size:8px;font-weight:900;padding:3px 7px;border-radius:999px;pointer-events:none}
  .kova-rec-heart{position:absolute;top:8px;right:8px;width:28px;height:28px;border-radius:50%;background:rgba(10,10,11,.8);backdrop-filter:blur(8px);border:1px solid var(--border);display:grid;place-items:center;font-size:12px;cursor:pointer;z-index:3}
  .kova-rec-info{padding:10px}.kova-rec-name{font-weight:700;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--text-main)}
  .kova-rec-meta{font-size:11px;color:var(--text-muted);margin-top:6px;display:flex;justify-content:space-between;align-items:center}
  .kova-rec-add{background:var(--accent);color:#000;border:0;padding:4px 10px;border-radius:999px;font-size:10px;font-weight:800;cursor:pointer}
  .kova-rec-live{width:6px;height:6px;background:#22C55E;border-radius:50%;display:inline-block;box-shadow:0 0 0 4px rgba(34,197,94,.2);animation:livePulse 1.6s infinite}
    @keyframes livePulse{0%{box-shadow:0 0 0 0 rgba(34,197,94,.4)}70%{box-shadow:0 0 0 8px rgba(34,197,94,0)}100%{box-shadow:0 0 0 0 rgba(34,197,94,0)}}

   /* === LIGHT MODE = BLACK TEXT WHEN BG WHITE === */
   html[data-theme="light"].kova-rec-title,
   body[data-theme="light"].kova-rec-title,
   [data-theme="light"].kova-rec-title,
  .kova-rec-wrap.kova-rec-title.kova-black{
     color:#121214!important;
     -webkit-text-fill-color:#121214!important;
   }
   [data-theme="light"].kova-rec-card{background:#1C1C1F!important;border-color:#27272A!important}
   [data-theme="light"].kova-rec-name{color:#F4F4F5!important}

   @media(min-width:1440px){
  .kova-rec-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));overflow:visible;cursor:default;scroll-snap-type:none;touch-action:auto;gap:14px;padding:8px 2px 16px;margin:-8px -2px}
  .kova-rec-card{min-width:0;max-width:100%;flex-shrink:1}
   }
   @media(min-width:1680px){.kova-rec-grid{grid-template-columns:repeat(6,1fr);} }
    </style>
    <div class="kova-rec-wrap">
      <div class="kova-rec-head"><div class="kova-rec-title" id="kovaRecTitle"><span class="kova-rec-live"></span>${title}</div><button onclick="location.hash='#/menu'" style="background:transparent;border:1px solid var(--border);color:var(--text-muted);padding:6px 12px;border-radius:999px;font-size:11px;font-weight:700;cursor:pointer;flex-shrink:0">View All</button></div>
      <div class="kova-rec-grid" id="kovaRecGrid">${picked.map((it,i)=>this.cardHTML(it,i)).join('')}</div>
    </div>`;
  },

  attachEvents(){
    const grid=document.getElementById('kovaRecGrid');
    const titleEl=document.getElementById('kovaRecTitle');
    if(!grid) return;

    // === FORCE BLACK IN LIGHT MODE ===
    const fixTitleColor=()=>{
      if(!titleEl) return;
      const theme = document.documentElement.getAttribute('data-theme') || document.body.getAttribute('data-theme') || localStorage.getItem('kova_theme') || 'dark';
      const isLight = theme==='light' || document.documentElement.classList.contains('light') || document.body.classList.contains('light') || getComputedStyle(document.body).backgroundColor.includes('230');
      if(isLight || theme==='light'){
        titleEl.style.setProperty('color','#121214','important');
        titleEl.style.setProperty('-webkit-text-fill-color','#121214','important');
        titleEl.classList.add('kova-black');
      }else{
        titleEl.style.setProperty('color','#F4F4F5','important');
        titleEl.style.setProperty('-webkit-text-fill-color','#F4F4F5','important');
        titleEl.classList.remove('kova-black');
      }
    };
    fixTitleColor();
    // Watch theme toggle
    new MutationObserver(fixTitleColor).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme','class']});
    new MutationObserver(fixTitleColor).observe(document.body,{attributes:true,attributeFilter:['data-theme','class']});

    let isDown=false,startX,scrollLeft,moved=false;
    const onDown=x=>{isDown=true;moved=false;grid.classList.add('dragging');startX=x-grid.offsetLeft;scrollLeft=grid.scrollLeft;};
    grid.addEventListener('mousedown',e=>onDown(e.pageX));
    grid.addEventListener('mouseleave',()=>{isDown=false;grid.classList.remove('dragging');});
    grid.addEventListener('mouseup',()=>{isDown=false;setTimeout(()=>moved=false,80);grid.classList.remove('dragging');});
    grid.addEventListener('mousemove',e=>{if(!isDown) return; e.preventDefault(); const x=e.pageX-grid.offsetLeft; const walk=(x-startX)*1.5; if(Math.abs(walk)>5) moved=true; grid.scrollLeft=scrollLeft-walk;});
    grid.addEventListener('touchstart',e=>{isDown=true;moved=false;startX=e.touches[0].pageX-grid.offsetLeft;scrollLeft=grid.scrollLeft;},{passive:true});
    grid.addEventListener('touchend',()=>{isDown=false;setTimeout(()=>moved=false,120);});
    grid.addEventListener('touchmove',e=>{if(!isDown) return; const x=e.touches[0].pageX-grid.offsetLeft; const walk=(x-startX)*1.5; if(Math.abs(walk)>8) moved=true; grid.scrollLeft=scrollLeft-walk;},{passive:true});
    grid.addEventListener('click',e=>{if(moved){e.preventDefault();e.stopPropagation();}},true);

    const wireCard=(cardEl)=>{
      const wishBtn=cardEl.querySelector('[data-wish]'); const addBtn=cardEl.querySelector('[data-add]'); const goEl=cardEl.querySelector('[data-go]');
      if(wishBtn){ wishBtn.onclick=async e=>{e.stopPropagation(); const id=wishBtn.dataset.wish; const all=this._pool.length?this._pool:JSON.parse(localStorage.getItem('kova_menu_cache')||'[]'); const item=all.find(x=>String(x.id||x.item_id)===String(id)); if(!item) return; let wish=JSON.parse(localStorage.getItem('kova_wish')||'[]'); const idx=wish.findIndex(w=>String(w.id||w.item_id)===String(id)); if(idx>=0){wish.splice(idx,1);wishBtn.textContent='🤍';wishBtn.style.color='white';}else{wish.push(item);wishBtn.textContent='❤️';wishBtn.style.color='#FF4E1F';} localStorage.setItem('kova_wish',JSON.stringify(wish)); window.dispatchEvent(new CustomEvent('kova:wishlist',{detail:wish.length})); const token=localStorage.getItem('kova_token'); if(token){try{await fetch(`https://kova-guest-sign-up.dopetone701.workers.dev/api/guest/wishlist/toggle`,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify({item_id:String(id),title:item.title||item.name,price:String(item.price),image:item.image||''})});}catch{}} }; }
      if(addBtn){ addBtn.onclick=async e=>{e.stopPropagation(); const id=addBtn.dataset.add; const all=this._pool.length?this._pool:JSON.parse(localStorage.getItem('kova_menu_cache')||'[]'); const item=all.find(x=>String(x.id||x.item_id)===String(id)); if(!item) return; let cart=JSON.parse(localStorage.getItem('kova_cart')||'[]'); const ex=cart.find(c=>String(c.id||c.item_id)===String(id)); if(ex) ex.qty=(ex.qty||1)+1; else cart.push({...item,qty:1,id:item.id||item.item_id}); localStorage.setItem('kova_cart',JSON.stringify(cart)); addBtn.textContent=`✓ x${cart.find(c=>String(c.id||c.item_id)===String(id)).qty}`; addBtn.classList.add('added'); window.dispatchEvent(new CustomEvent('kova:cart',{detail:cart.reduce((s,i)=>s+(i.qty||1),0)})); const token=localStorage.getItem('kova_token'); if(token){try{await fetch(`https://kova-guest-sign-up.dopetone701.workers.dev/api/guest/cart/add`,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify({item_id:String(id),title:item.title||item.name,price:String(item.price),image:item.image||'',qty:1})});}catch{}} }; }
      if(goEl){ goEl.onclick=()=>{ if(moved) return; location.hash='#/menu'; }; }
    };
    const wireAll=()=>{ grid.querySelectorAll('.kova-rec-card').forEach(c=>wireCard(c)); }; wireAll();

    if(this._interval) clearInterval(this._interval); let paused=false;
    grid.addEventListener('mouseenter',()=>paused=true); grid.addEventListener('mouseleave',()=>paused=false);
    grid.addEventListener('touchstart',()=>paused=true,{passive:true}); grid.addEventListener('touchend',()=>setTimeout(()=>paused=false,2500),{passive:true});

    this._interval=setInterval(()=>{
      if(paused||!this._pool||this._pool.length<=this._count) return;
      const cards=[...grid.querySelectorAll('.kova-rec-card')]; if(!cards.length) return;
      const idx=Math.floor(Math.random()*cards.length); const card=cards[idx]; if(!card) return;
      card.style.transition='opacity.35s ease, transform.35s ease'; card.style.opacity='0'; card.style.transform='translateY(8px) scale(.96)';
      setTimeout(()=>{
        let candidates=this._pool.filter(it=>!this._visibleIds.has(String(it.id||it.item_id))); if(candidates.length===0) candidates=this._pool;
        const newItem=this.shuffle(candidates,1)[0]; if(!newItem) return;
        const oldId=card.dataset.card; this._visibleIds.delete(oldId); this._visibleIds.add(String(newItem.id||newItem.item_id));
        const temp=document.createElement('div'); temp.innerHTML=this.cardHTML(newItem, idx); const newCard=temp.firstElementChild; newCard.style.opacity='0'; newCard.style.transform='translateY(8px) scale(.96)';
        card.replaceWith(newCard); wireCard(newCard);
        requestAnimationFrame(()=>{ setTimeout(()=>{ newCard.style.opacity='1'; newCard.style.transform='translateY(0) scale(1)'; },20); });
      },350);
    },3800);
  }
};
window.kovaAddToCartFromRec=async id=>{try{const items=await Recommendations.getMenuItems();const found=items.find(i=>(i.id||i.item_id)==id);if(!found) return;let cart=[];try{cart=JSON.parse(localStorage.getItem('kova_cart')||'[]')}catch{}const exist=cart.find(c=>(c.id||c.item_id)==id);if(exist) exist.qty=(exist.qty||1)+1;else cart.push({...found,qty:1});localStorage.setItem('kova_cart',JSON.stringify(cart));window.dispatchEvent(new CustomEvent('kova:cart'));window.kovaOpenCart&&window.kovaOpenCart();}catch(e){console.log(e)}};
