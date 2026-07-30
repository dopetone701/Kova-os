export const Topbar = {
  render() {
    const el = document.getElementById('topbar');
    el.innerHTML = `
      <style>
        #topbar .search-box:focus-within{
          border-color: var(--accent-2)!important;
          box-shadow: 0 0 0 3px rgba(255,78,31,0.15);
        }
        #topbar .btn-primary{
          background: var(--accent);
          color:#000;
          transition: all .2s;
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
        }
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
      </style>

      <button class="btn-icon" onclick="toggleSidebar()" style="width:40px; height:40px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>

      <div class="search-box" style="position:relative; transition:border-color .2s, box-shadow .2s;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--text-muted); flex-shrink:0;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" placeholder="Search dishes, staff, orders..." id="globalSearch" autocomplete="off" />
        <button id="clearSearch" style="display:none; background:none; border:none; cursor:pointer; color:var(--text-muted);">✕</button>
      </div>

      <div style="display:flex; gap:10px; align-items:center;">
        <button class="btn-icon" onclick="toggleTheme()" style="width:40px; height:40px; display:flex; align-items:center; justify-content:center; border-radius:50%; flex-shrink:0;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
        </button>
        <button class="btn-primary" style="white-space:nowrap;">Book Table</button>
        <div class="k-avatar">K</div>
      </div>
    `;

    const input = el.querySelector('#globalSearch');
    const clearBtn = el.querySelector('#clearSearch');
    let debounce;

    const savedQ = sessionStorage.getItem('kova-search');
    if(savedQ) input.value = savedQ;

    const doSearch = () => {
      const q = input.value.trim().toLowerCase();
      sessionStorage.setItem('kova-search', q);
      clearBtn.style.display = q ? 'block' : 'none';

      if(!q){
        document.querySelectorAll('.card').forEach(c => {
          c.style.display = '';
          c.style.outline = '';
        });
        return;
      }

      const isMenu = document.querySelector('.grid') || location.pathname.includes('menu');
      if(!isMenu){
        const menuLink = document.querySelector('[data-view="menu"]');
        if(menuLink) menuLink.click();
        setTimeout(() => filterCards(q), 400);
      } else {
        filterCards(q);
      }
    };

    const filterCards = (q) => {
      const cards = document.querySelectorAll('.card');
      if(!cards.length){
        setTimeout(() => filterCards(q), 300);
        return;
      }

      let firstMatch = null;
      let exactMatch = null;

      cards.forEach(card => {
        const title = (card.querySelector('.card-title')?.textContent || '').toLowerCase();
        const desc = (card.querySelector('.card-desc')?.textContent || '').toLowerCase();
        const full = title + ' ' + desc;

        const isMatch = full.includes(q);
        card.style.display = isMatch ? '' : 'none';
        card.style.outline = '';

        if(isMatch && !firstMatch) firstMatch = card;
        if(title.includes(q) && q.length > 2) exactMatch = card;
      });

      const target = exactMatch || firstMatch;
      if(target){
        target.style.outline = '2px solid var(--accent-2)';
        target.style.outlineOffset = '2px';
        target.scrollIntoView({ behavior:'smooth', block:'center' });
        target.animate([
          { transform:'scale(1)' },
          { transform:'scale(1.02)' },
          { transform:'scale(1)' }
        ], { duration:400, easing:'ease-out' });
      }
    };

    input.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(doSearch, 250);
    });

    input.addEventListener('keydown', (e) => {
      if(e.key === 'Enter') {
        clearTimeout(debounce);
        doSearch();
      }
      if(e.key === 'Escape'){
        input.value = '';
        doSearch();
      }
    });

    clearBtn.addEventListener('click', () => {
      input.value = '';
      doSearch();
      input.focus();
    });

    if(savedQ && (document.querySelector('.grid') || location.pathname.includes('menu'))){
      setTimeout(() => filterCards(savedQ.toLowerCase()), 500);
    }

    const observer = new MutationObserver(() => {
      const q = input.value.trim().toLowerCase();
      if(q && document.querySelector('.grid')){
        filterCards(q);
      }
    });
    observer.observe(document.getElementById('app-view') || document.body, { childList:true, subtree:true });
  }
};
