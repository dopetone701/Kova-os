// KOVA Topbar - SEARCH + D1 CART/WISH PERSISTENT + GUEST AUTH SAFE
export const Topbar = {
  GUEST_WORKER: 'https://kova-guest-sign-up.dopetone701.workers.dev',
  render() {
    const el = document.getElementById('topbar');
    if(!el) return;

    const token = localStorage.getItem('kova_token');
    let guest = null;
    try{ guest = JSON.parse(localStorage.getItem('kova_guest')||'null'); }catch{}

    el.innerHTML = `
      <style>
        #topbar{
          height:64px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:12px;
          padding:0 20px;
          background:rgba(10,10,11,0.88);
          backdrop-filter:blur(18px);
          border-bottom:1px solid var(--border);
          position:sticky;
          top:0;
          z-index:50;
        }
        #topbar .search-box{
          flex:1;
          max-width:520px;
          height:40px;
          background:var(--bg-card);
          border:1px solid var(--border);
          border-radius:999px;
          display:flex;
          align-items:center;
          gap:10px;
          padding:0 14px;
          transition:border-color .2s, box-shadow .2s;
        }
        #topbar .search-box:focus-within{
          border-color: var(--accent-2)!important;
          box-shadow: 0 0 0 3px rgba(255,78,31,0.15);
        }
        #topbar .search-box input{
          flex:1;
          background:transparent;
          border:0;
          outline:0;
          color:var(--text-main);
          font-size:16px;
        }
        @media(min-width:769px){
          #topbar .search-box input{ font-size:13px; }
        }
        #topbar .btn-icon{
          width:40px;height:40px;
          background:var(--bg-card);
          border:1px solid var(--border);
          color:var(--text-muted);
          border-radius:50%;
          display:flex;align-items:center;justify-content:center;
          cursor:pointer;
          transition:.2s;
          flex-shrink:0;
          position:relative;
        }
        #topbar .btn-icon:hover{
          background:var(--bg-hover);
          color:var(--text-main);
          border-color:var(--text-muted);
        }
        #topbar .btn-icon.cart-active{
          background:var(--accent);
          color:#000;
          border-color:var(--accent);
        }
        #topbar .btn-icon.wish-active{
          color:var(--accent-2);
          border-color:rgba(255,78,31,0.3);
        }
        #topbar .btn-primary{
          background: var(--accent);
          color:#000;
          transition: all .2s;
          border:0;
          padding:10px 18px;
          border-radius:999px;
          font-weight:800;
          font-size:13px;
          cursor:pointer;
          white-space:nowrap;
        }
        #topbar .btn-primary:hover{
          background: var(--accent-2);
          color:#fff;
        }
        #topbar .k-avatar{
          width:36px;height:36px;border-radius:50%;
          background: var(--text-main);
          color: var(--bg-app);
          display:flex;align-items:center;justify-content:center;
          font-weight:900; flex-shrink:0;
          position:relative;
          border:2px solid var(--border);
          overflow:hidden;
        }
        #topbar .k-avatar img{width:100%;height:100%;object-fit:cover}
        [data-theme="light"] #topbar .k-avatar{
          background:#121214; color:#fff;
        }
        #topbar .k-avatar:after{
          content:'';
          position:absolute;
          bottom:-2px; right:-2px;
          width:10px; height:10px;
          background: var(--accent-2);
          border:2px solid var(--bg-app);
          border-radius:50%;
          box-shadow:0 0 6px var(--accent-2);
        }
        #topbar .badge-count{
          position:absolute;
          top:-4px; right:-4px;
          min-width:18px; height:18px;
          padding:0 5px;
          border-radius:999px;
          font-size:10px;
          font-weight:900;
          display:grid;
          place-items:center;
          line-height:1;
          border:2px solid var(--bg-app);
        }
        #topbar .badge-wish{ background:var(--accent-2); color:#fff; }
        #topbar .badge-cart{ background:var(--accent); color:#000; }
        #topbar .guest-pill{
          display:flex;gap:8px;align-items:center;
          background:var(--bg-card);border:1px solid var(--border);
          padding:4px 10px 4px 4px;border-radius:999px;
          cursor:pointer;transition:.2s;flex-shrink:0;
        }
        #topbar .guest-pill:hover{border-color:var(--text-muted)}
        #topbar .guest-pill img{width:28px;height:28px;border-radius:50%;object-fit:cover;background:var(--bg-app)}
        #topbar .auth-btn{
          background:var(--accent);color:#000;border:0;
          padding:10px 18px;border-radius:999px;
          font-weight:800;font-size:13px;cursor:pointer;white-space:nowrap;transition:.2s
        }
        #topbar .auth-btn:hover{background:var(--accent-2);color:#fff}
        @media(max-width:768px){
          #topbar{padding:0 12px;gap:8px}
          #topbar .search-box{max-width:none;flex:1}
          #topbar .btn-primary{display:none}
          #topbar .guest-pill span{max-width:60px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
        }
      </style>

      <button class="btn-icon" onclick="window.toggleSidebar && window.toggleSidebar()" style="width:40px; height:40px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>

      <div class="search-box">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--text-muted);flex-shrink:0;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" placeholder="Search dishes, staff, orders..." id="globalSearch" autocomplete="off" inputmode="search" />
        <button id="clearSearch" style="display:none; background:none; border:none; cursor:pointer; color:var(--text-muted);">✕</button>
      </div>

      <div style="display:flex; gap:8px; align-items:center;">
        <button id="topbar-wish" class="btn-icon" title="Wishlist">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
          <span id="topbar-wish-count" class="badge-count badge-wish" style="display:none">0</span>
        </button>

        <button id="topbar-cart" class="btn-icon" title="Cart">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          <span id="topbar-cart-count" class="badge-count badge-cart" style="display:none">0</span>
        </button>

        <button class="btn-icon" onclick="window.toggleTheme && window.toggleTheme()" style="width:40px; height:40px; display:flex; align-items:center; justify-content:center; border-radius:50%; flex-shrink:0;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
        </button>

        ${guest? `
          <div id="profileWrap" style="position:relative">
            <div class="guest-pill" id="guestPillBtn">
              ${guest.photo_url? `<img src="${guest.photo_url.startsWith('/api/')? `${this.GUEST_WORKER}${guest.photo_url}` : guest.photo_url}" />` : `<div style="width:28px;height:28px;border-radius:50%;background:var(--accent);color:#000;display:grid;place-items:center;font-weight:900;font-size:12px">${(guest.name||'G').charAt(0).toUpperCase()}</div>`}
              <span style="font-size:12px;font-weight:700;max-width:70px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${guest.name.split(' ')[0]}</span>
            </div>
            <div id="kova-profile-dropdown" style="position:absolute;top:50px;right:0;width:300px;background:var(--bg-card);border:1px solid var(--border);border-radius:16px;box-shadow:0 20px 50px rgba(0,0,0,.4);padding:8px;z-index:100;display:none">
              <div style="display:flex;gap:10px;align-items:center;padding:12px;background:var(--bg-app);border:1px solid var(--border);border-radius:12px;margin-bottom:6px">
                ${guest.photo_url? `<img src="${guest.photo_url.startsWith('/api/')? `${this.GUEST_WORKER}${guest.photo_url}` : guest.photo_url}" style="width:40px;height:40px;border-radius:50%;object-fit:cover" />` : `<div style="width:40px;height:40px;border-radius:50%;background:var(--accent);color:#000;display:grid;place-items:center;font-weight:900">${(guest.name||'G').charAt(0).toUpperCase()}</div>`}
                <div style="flex:1;min-width:0"><b style="font-size:13px;font-weight:800;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${guest.name}</b><span style="font-size:11px;color:var(--text-muted);display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${guest.email||''}</span><span style="font-size:11px;color:var(--text-muted);display:block">${guest.phone||''}</span></div>
              </div>
              <button data-action="orders" style="width:100%;display:flex;gap:10px;align-items:center;padding:10px 12px;border-radius:10px;border:0;background:transparent;color:var(--text-main);font-size:13px;font-weight:600;cursor:pointer"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> Orders</button>

              <button data-action="wishlist" style="width:100%;display:flex;gap:10px;align-items:center;padding:10px 12px;border-radius:10px;border:0;background:transparent;color:var(--text-main);font-size:13px;font-weight:600;cursor:pointer">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
  Wishlist
</button>


              <button data-action="settings" style="width:100%;display:flex;gap:10px;align-items:center;padding:10px 12px;border-radius:10px;border:0;background:transparent;color:var(--text-main);font-size:13px;font-weight:600;cursor:pointer"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="3"></circle>
  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0A1.65 1.65 0 0 0 10.09 3H10a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0A1.65 1.65 0 0 0 21 10.09H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
</svg>
 Settings</button>
              <div style="height:1px;background:var(--border);margin:6px 8px"></div>
              <button data-action="logout" style="width:100%;display:flex;gap:10px;align-items:center;padding:10px 12px;border-radius:10px;border:0;background:transparent;color:#ff5a5a;font-size:13px;font-weight:600;cursor:pointer"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg> Logout</button>
            </div>
          </div>
        ` : `
          <button class="auth-btn" onclick="location.hash='#/auth'">Sign In</button>
          <button class="btn-primary" onclick="window.location.hash='#book'" style="display:none">Book Table</button>
          <div class="k-avatar">K</div>
        `}
      </div>
    `;

    const input = el.querySelector('#globalSearch');
    const clearBtn = el.querySelector('#clearSearch');
    let debounce;
    const savedQ = sessionStorage.getItem('kova-search');
    if(savedQ) input.value = savedQ;

    const wishBtn = el.querySelector('#topbar-wish');
    const cartBtn = el.querySelector('#topbar-cart');
    const wishCountEl = el.querySelector('#topbar-wish-count');
    const cartCountEl = el.querySelector('#topbar-cart-count');

    const refreshCounts = async () => {
      try{
        const tok = localStorage.getItem('kova_token');
        if(tok){
          try{
            const r = await fetch(this.GUEST_WORKER+'/api/guest/me', {headers:{'Authorization':'Bearer '+tok}});
            if(r.ok){
              const d = await r.json();
              const cCart = (d.cart||[]).reduce((s,i)=>s+(i.qty||1),0);
              const cWish = (d.wishlist||[]).length;
              if(wishCountEl){ wishCountEl.textContent=cWish; wishCountEl.style.display=cWish>0?'grid':'none'; }
              if(cartCountEl){ cartCountEl.textContent=cCart; cartCountEl.style.display=cCart>0?'grid':'none'; }
              if(wishBtn){ if(cWish>0) wishBtn.classList.add('wish-active'); else wishBtn.classList.remove('wish-active'); }
              if(cartBtn){ if(cCart>0) cartBtn.classList.add('cart-active'); else cartBtn.classList.remove('cart-active'); }
              return;
            }
          }catch(e){}
        }
        const wish = JSON.parse(localStorage.getItem('kova_wish')||'[]');
        const cart = JSON.parse(localStorage.getItem('kova_cart')||'[]');
        const wCount = wish.length;
        const cCount = cart.reduce((s,i)=>s+(i.qty||1),0);
        if(wishCountEl){ wishCountEl.textContent = wCount; wishCountEl.style.display = wCount>0?'grid':'none'; }
        if(cartCountEl){ cartCountEl.textContent = cCount; cartCountEl.style.display = cCount>0?'grid':'none'; }
        if(wishBtn){ if(wCount>0) wishBtn.classList.add('wish-active'); else wishBtn.classList.remove('wish-active'); }
        if(cartBtn){ if(cCount>0) cartBtn.classList.add('cart-active'); else cartBtn.classList.remove('cart-active'); }
      }catch{}
    };

    refreshCounts();
    window.addEventListener('kova:wishlist', refreshCounts);
    window.addEventListener('kova:cart', refreshCounts);
    window.addEventListener('storage', refreshCounts);

    const pillBtn = el.querySelector('#guestPillBtn');
    const dd = el.querySelector('#kova-profile-dropdown');
    pillBtn?.addEventListener('click', (e)=>{
      e.stopPropagation();
      dd.style.display = dd.style.display==='block'?'none':'block';
    });
    document.addEventListener('click', (e)=>{
      if(!e.target.closest('#profileWrap') && dd) dd.style.display='none';
    });
    dd?.querySelectorAll('[data-action]').forEach(b=>{
      b.addEventListener('click', ()=>{
        dd.style.display='none';
        const a=b.dataset.action;
        if(a==='orders') location.hash='#/orders';
        if(a==='wishlist'){ location.hash='#/menu?filter=Wishlist'; window.dispatchEvent(new CustomEvent('kova:show-wishlist')); }
        if(a==='settings') location.hash='#/settings';
        if(a==='logout'){ localStorage.removeItem('kova_token'); localStorage.removeItem('kova_guest'); location.hash='#/auth'; location.reload(); }
      });
    });

    wishBtn?.addEventListener('click', ()=>{
      const wish = JSON.parse(localStorage.getItem('kova_wish')||'[]');
      if(wish.length===0){
        input.focus();
        input.placeholder = 'No favourites yet — tap 🤍 on cards';
        setTimeout(()=> input.placeholder = 'Search dishes, staff, orders...', 2000);
        return;
      }
      location.hash='#/menu?filter=Wishlist';
      window.dispatchEvent(new CustomEvent('kova:show-wishlist'));
    });

    cartBtn?.addEventListener('click', ()=>{ location.hash='#/orders'; });

    const doSearch = () => {
      const q = input.value.trim().toLowerCase();
      sessionStorage.setItem('kova-search', q);
      clearBtn.style.display = q?'block':'none';
      if(!q){
        document.querySelectorAll('.k-card, .card').forEach(c => { c.style.display = ''; c.style.outline = ''; });
        window.dispatchEvent(new CustomEvent('kova:search', {detail: ''}));
        return;
      }
      window.dispatchEvent(new CustomEvent('kova:search', {detail: q}));
      const isMenu = document.querySelector('.menu-grid') || document.querySelector('.grid') || location.hash.includes('menu');
      if(!isMenu){ location.hash='#/menu'; setTimeout(()=>filterCards(q),400); } else { filterCards(q); }
    };

    const filterCards = (q) => {
      const cards = document.querySelectorAll('.k-card, .card');
      if(!cards.length){ setTimeout(()=>filterCards(q),300); return; }
      let firstMatch = null; let exactMatch = null;
      cards.forEach(card => {
        const title = (card.querySelector('.card-title')?.textContent || card.textContent || '').toLowerCase();
        const desc = (card.querySelector('.card-desc')?.textContent || '').toLowerCase();
        const full = title + ' ' + desc;
        const isMatch = full.includes(q);
        card.style.display = isMatch?'':'none';
        card.style.outline = '';
        if(isMatch &&!firstMatch) firstMatch = card;
        if(title.includes(q) && q.length>2) exactMatch = card;
      });
      const target = exactMatch || firstMatch;
      if(target){
        target.style.outline = '2px solid var(--accent-2)';
        target.style.outlineOffset = '2px';
        target.scrollIntoView({ behavior:'smooth', block:'center' });
        target.animate([{ transform:'scale(1)' },{ transform:'scale(1.02)' },{ transform:'scale(1)' }], { duration:400, easing:'ease-out' });
      }
    };

    input.addEventListener('input', () => { clearTimeout(debounce); debounce = setTimeout(doSearch,250); });
    input.addEventListener('keydown', (e) => {
      if(e.key === 'Enter'){ clearTimeout(debounce); doSearch(); }
      if(e.key === 'Escape'){ input.value=''; doSearch(); }
    });
    clearBtn.addEventListener('click', () => { input.value=''; doSearch(); input.focus(); });
    if(savedQ && (document.querySelector('.grid') || document.querySelector('.menu-grid') || location.hash.includes('menu'))){
      setTimeout(()=>filterCards(savedQ.toLowerCase()),500);
    }
    const observer = new MutationObserver(() => {
      const q = input.value.trim().toLowerCase();
      if(q && (document.querySelector('.grid') || document.querySelector('.menu-grid'))){ filterCards(q); }
    });
    observer.observe(document.getElementById('app') || document.body, { childList:true, subtree:true });
  }
};
