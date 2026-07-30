export const Topbar = {
  render() {
    const el = document.getElementById('topbar');
    el.innerHTML = `
      <button class="btn-icon" onclick="toggleSidebar()" style="width:40px; height:40px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>

      <div class="search-box" style="position:relative;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--text-muted); flex-shrink:0;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" placeholder="Search dishes, staff, orders..." id="globalSearch" autocomplete="off" />
        <button id="clearSearch" style="display:none; background:none; border:none; cursor:pointer; color:var(--text-muted);">✕</button>
      </div>

      <div style="display:flex; gap:10px; align-items:center;">
        <button class="btn-icon" onclick="toggleTheme()" style="width:40px; height:40px; display:flex; align-items:center; justify-content:center; border-radius:50%; flex-shrink:0;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
        </button>
        <button class="btn-primary" style="white-space:nowrap;">Book Table</button>
        <div style="width:36px;height:36px;border-radius:50%;background:var(--accent);color:#000;display:flex;align-items:center;justify-content:center;font-weight:900; flex-shrink:0;">K</div>
      </div>
    `;

    const input = el.querySelector('#globalSearch');
    const clearBtn = el.querySelector('#clearSearch');
    let debounce;

    // Load saved query
    const savedQ = sessionStorage.getItem('kova-search');
    if(savedQ) input.value = savedQ;

    const doSearch = () => {
      const q = input.value.trim().toLowerCase();
      sessionStorage.setItem('kova-search', q);
      clearBtn.style.display = q ? 'block' : 'none';

      // If empty -> show all
      if(!q){
        document.querySelectorAll('.card').forEach(c => {
          c.style.display = '';
          c.style.outline = '';
        });
        return;
      }

      // If not on menu page -> go to menu first
      const isMenu = document.querySelector('.grid') || location.pathname.includes('menu');
      if(!isMenu){
        // Trigger router via nav click
        const menuLink = document.querySelector('[data-view="menu"]');
        if(menuLink) menuLink.click();
        // Wait for menu render then search
        setTimeout(() => filterCards(q), 400);
      } else {
        filterCards(q);
      }
    };

    const filterCards = (q) => {
      const cards = document.querySelectorAll('.card');
      if(!cards.length){
        // Retry once if menu still loading
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

      // Scroll to exact or first
      const target = exactMatch || firstMatch;
      if(target){
        target.style.outline = '2px solid var(--accent)';
        target.style.outlineOffset = '2px';
        target.scrollIntoView({ behavior:'smooth', block:'center' });
        // Pulse
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

    // Auto search if we land on menu with saved query
    if(savedQ && (document.querySelector('.grid') || location.pathname.includes('menu'))){
      setTimeout(() => filterCards(savedQ.toLowerCase()), 500);
    }

    // Listen for menu re-render (Router)
    const observer = new MutationObserver(() => {
      const q = input.value.trim().toLowerCase();
      if(q && document.querySelector('.grid')){
        filterCards(q);
      }
    });
    observer.observe(document.getElementById('app-view') || document.body, { childList:true, subtree:true });
  }
};
