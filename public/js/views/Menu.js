// KOVA Menu - MOBILE LOCKED - NO SIDE DRAG
const API_BASE = "https://kova-clean-api.dopetone701.workers.dev";

export const Menu = {
  dishes: [],
  page: 0,
  activeFilter: 'All',
  searchQuery: '',
  cart: JSON.parse(localStorage.getItem('kova_cart')||'[]'),
  wishlist: JSON.parse(localStorage.getItem('kova_wish')||'[]'),

  menuData: [
    { title: 'Hamachi Tiradito', ar: 'هاماشي', desc: 'Ember yuzu, finger lime, shiso', price: '72', tags: ['RAW','GF'], section: 'Raw & Cold', fire: 'Raw', image: '' },
    { title: 'Wagyu Ribeye — Stone', ar: 'ريب آي', desc: '45-day dry, 800°C stone', price: '185', tags: ['HOT','SIGNATURE'], section: 'From The Jمر', fire: 'Flame', image: '' },
  ],

  async render() {
    try {
      const savedFilter = sessionStorage.getItem('kova_filter');
if(savedFilter){ setTimeout(()=>{ sessionStorage.removeItem('kova_filter'); window.filterBy && window.filterBy(savedFilter); document.querySelector(`[data-filter="${savedFilter}"]`)?.click(); }, 300); }

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

    const urlFilter = new URLSearchParams(location.hash.split('?')[1]||'').get('filter');
    if(urlFilter) this.activeFilter = urlFilter;

    const cartCount = this.cart.reduce((s,i)=>s+(i.qty||1),0);
    const wishCount = this.wishlist.length;

    return `
      <style>
      /* PC - KEEP EXACT */
     .menu-wrap{max-width:1300px;margin:0 auto;padding:0 24px 80px 24px;box-sizing:border-box;overflow-x:hidden;touch-action:pan-y}
     .filter-bar{position:sticky;top:0;z-index:25;background:#0A0A0D;border-bottom:1px solid #27272A;margin:0 -24px;padding:12px 24px;display:flex;gap:8px;align-items:center;overflow-x:auto;overflow-y:hidden;white-space:nowrap;scrollbar-width:none;-webkit-overflow-scrolling:touch;overscroll-behavior-x:contain;touch-action:pan-x}
     .filter-bar::-webkit-scrollbar{display:none}
     .filter-chip{flex-shrink:0;white-space:nowrap;padding:7px 13px;border-radius:999px;border:1px solid #27272A;font-weight:700;font-size:11px;cursor:pointer}
     .filter-chip.active{background:#F4F4F5;color:#0A0A0D;border-color:#F4F4F5}
     .filter-chip.idle{background:#1C1C1F;color:#A1A1AA}
     .menu-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:14px;margin-top:18px;width:100%;box-sizing:border-box}
     .k-card{background:#1C1C1F;border:1px solid #27272A;border-radius:16px;overflow:hidden;cursor:pointer;transition:.2s;position:relative;min-width:0;max-width:100%;box-sizing:border-box}

      /* MOBILE LOCK - NO SIDE DRAG */
      @media(max-width:768px){
        html, body { overflow-x:hidden!important; max-width:100vw!important; position:relative!important; touch-action:pan-y!important; overscroll-behavior-x:none!important; }
       .menu-wrap{
          padding:0 12px 80px 12px!important;
          margin:0 auto!important;
          width:100%!important;
          max-width:100%!important;
          box-sizing:border-box!important;
          overflow-x:hidden!important;
          transform:translateZ(0); /* creates new layer, stops drag */
        }
       .filter-bar{
          margin:0 -12px!important;
          padding:10px 12px!important;
          width:calc(100% + 24px)!important;
          max-width:100vw!important;
          box-sizing:border-box!important;
          overscroll-behavior-x:contain!important;
        }
       .menu-grid{
          grid-template-columns:1fr!important;
          gap:12px!important;
          width:100%!important;
        }
        /* 2 cols only on bigger phones, but locked */
        @media(min-width:430px) and (max-width:768px){
         .menu-grid{grid-template-columns:repeat(2,1fr)!important}
        }
       .k-card{width:100%!important;max-width:100%!important;min-width:0!important}
      }
      </style>

      <div class="menu-wrap" id="menuWrap">
        <div class="menu-head" style="padding:18px 0 8px 0;display:flex;justify-content:space-between;align-items:center;box-sizing:border-box">
          <div style="min-width:0"><h2 style="font-size:28px;font-weight:900;letter-spacing:-1px;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Menu <span style="font-size:11px;color:#71717A;font-weight:500">— ${this.dishes.length}</span></h2><p style="color:#71717A;font-size:11px;margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Use nav search • ${this.activeFilter}</p></div>
          <div style="display:flex;gap:8px;flex-shrink:0"><button id="wishBtn" style="background:#1C1C1F;border:1px solid #27272A;color:#F4F4F5;padding:8px 12px;border-radius:999px;font-size:11px;font-weight:700;cursor:pointer">❤️ ${wishCount}</button><button id="cartBtn" style="background:#CBFF00;border:none;color:#0A0A0D;padding:8px 14px;border-radius:999px;font-size:11px;font-weight:800;cursor:pointer">🛒 ${cartCount}</button></div>
        </div>

        <div class="filter-bar" id="filterBar">
          ${['All','Flame','Raw & Cold','Stone','Sweets','Drinks','Chef Pick','Trending','Vegan','Gluten Free','Signature','Hot'].map(f=>{
            const active = this.activeFilter===f;
            return `<button data-filter="${f}" class="filter-chip ${active?'active':'idle'}">${f}</button>`;
          }).join('')}
        </div>

        <div id="menuGrid" class="menu-grid"></div>
        <div id="sentinel" style="height:40px;display:flex;align-items:center;justify-content:center;color:#71717A;font-size:11px;margin-top:10px">Loading ember...</div>
      </div>
    `;
  },

  async afterRender() {
    // HARD LOCK BODY DRAG
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    document.body.style.maxWidth = '100vw';
    document.body.style.touchAction = 'pan-y';
    document.body.style.overscrollBehaviorX = 'none';

    const grid = document.getElementById('menuGrid');
    const chips = document.querySelectorAll('.filter-chip');
    const cartBtn = document.getElementById('cartBtn');
    const wishBtn = document.getElementById('wishBtn');
    const menuWrap = document.getElementById('menuWrap');

    // prevent horizontal drag on wrap
    let startX = 0;
    menuWrap.addEventListener('touchstart', e=>{ startX = e.touches[0].clientX; }, {passive:true});
    menuWrap.addEventListener('touchmove', e=>{
      const diff = Math.abs(e.touches[0].clientX - startX);
      const isFilterBar = e.target.closest('.filter-bar');
      if(diff > 10 &&!isFilterBar){ /* allow vertical only */ }
    }, {passive:true});

    const navSearch = document.querySelector('input[type="search"], #searchInput,.nav-search input, input[placeholder*="Search"]');
    if(navSearch){ navSearch.addEventListener('input', (e)=>{ this.searchQuery = e.target.value; loadMore(true); }); }

    const updateCounts = () => {
      const c = this.cart.reduce((s,i)=>s+(i.qty||1),0);
      cartBtn.innerHTML = `🛒 ${c}`;
      wishBtn.innerHTML = `❤️ ${this.wishlist.length}`;
      localStorage.setItem('kova_cart', JSON.stringify(this.cart));
      localStorage.setItem('kova_wish', JSON.stringify(this.wishlist));
    };

    const getFiltered = () => {
      let data = [...this.dishes];
      if(this.activeFilter!=='All'){
        const f = this.activeFilter.toLowerCase();
        data = data.filter(d=>{
          const hay = `${d.section} ${d.fire} ${d.category} ${d.tags.join(' ')} ${d.badge}`.toLowerCase();
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
      if(data.length===0){ grid.innerHTML=`<div style="grid-column:1/-1;padding:40px;text-align:center;color:#71717A">No results</div>`; return; }
      for(let i=0;i<8;i++){
        const idx = this.page*8+i; if(idx>=data.length) break;
        const d = data[idx];
        const inWish = this.wishlist.find(w=>w.id===d.id);
        const inCart = this.cart.find(c=>c.id===d.id);
        grid.insertAdjacentHTML('beforeend', `
          <div class="k-card" data-id="${d.id}">
            <div style="height:170px;background:${d.image?`url(${d.image}) center/cover`:`linear-gradient(135deg,#27272A,#1C1C1F)`};position:relative;overflow:hidden">
              <span style="position:absolute;top:8px;left:8px;background:#0A0A0D;border:1px solid #27272A;color:#F4F4F5;font-size:8px;font-weight:700;padding:3px 7px;border-radius:999px;max-width:60%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${d.section}</span>
              <button class="wish-heart" data-id="${d.id}" style="position:absolute;top:8px;right:8px;width:30px;height:30px;border-radius:999px;border:1px solid #27272A;background:rgba(10,10,13,0.85);color:${inWish?'#FF4E1F':'#F4F4F5'};cursor:pointer;z-index:2">${inWish?'❤️':'🤍'}</button>
              <span style="position:absolute;bottom:8px;right:8px;background:#1C1C1F;border:1px solid #27272A;color:#F4F4F5;font-size:10px;font-weight:800;padding:4px 8px;border-radius:999px">AED ${d.price}</span>
            </div>
            <div style="padding:10px;min-width:0;box-sizing:border-box">
              <div style="font-size:13px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${d.title}</div>
              <div style="font-size:10px;color:#71717A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${d.ar}</div>
              <div style="font-size:11px;color:#A1A1AA;margin-top:3px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:30px;word-break:break-word">${d.desc}</div>
              <button class="add-cart" data-id="${d.id}" style="margin-top:10px;width:100%;background:${inCart?'#F4F4F5':'#CBFF00'};color:#0A0A0D;border:none;padding:9px;border-radius:999px;font-weight:800;font-size:11px;cursor:pointer;box-sizing:border-box">${inCart?`✓ x${inCart.qty}`:'+ Add to Cart'}</button>
            </div>
          </div>
        `);
      }
      this.page++;
      grid.querySelectorAll('.wish-heart').forEach(b=>{
        b.onclick = (e)=>{ e.stopPropagation(); if(document.body.classList.contains('toolbar-open')) return; const id=b.dataset.id; const item=this.dishes.find(x=>x.id===id); const ex=this.wishlist.findIndex(w=>w.id===id); if(ex>=0) this.wishlist.splice(ex,1); else this.wishlist.push(item); updateCounts(); loadMore(true); };
      });
      grid.querySelectorAll('.add-cart').forEach(b=>{
        b.onclick = (e)=>{ e.stopPropagation(); if(document.body.classList.contains('toolbar-open')) return; const id=b.dataset.id; const item=this.dishes.find(x=>x.id===id); const ex=this.cart.find(c=>c.id===id); if(ex) ex.qty=(ex.qty||1)+1; else this.cart.push({...item,qty:1}); updateCounts(); b.textContent=`✓ x${this.cart.find(c=>c.id===id).qty}`; b.style.background='#F4F4F5'; };
      });
    };

    chips.forEach(chip=>{
      chip.onclick = ()=>{
        this.activeFilter = chip.dataset.filter;
        document.querySelectorAll('.filter-chip').forEach(c=>{ c.classList.remove('active'); c.classList.add('idle'); });
        chip.classList.add('active'); chip.classList.remove('idle');
        loadMore(true);
      };
    });

    loadMore(true);
    const observer = new IntersectionObserver((entries)=>{ if(entries[0].isIntersecting) loadMore(); }, {rootMargin:'300px'});
    observer.observe(document.getElementById('sentinel'));
    updateCounts();
  }
};
