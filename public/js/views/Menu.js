// KOVA Menu - Pro Giant Menu - Like Google Filters - DOPETONE NOIR - FIXED DOCK
export const Menu = {
  dishes: [],
  page: 0,
  activeFilter: 'All',

  menuData: [
    { title: 'Hamachi Tiradito', ar: 'هاماشي', desc: 'Ember yuzu, finger lime, shiso', price: '72', tags: ['RAW','COLD','GF'], section: 'Raw & Cold', fire: 'Stone' },
    { title: 'Wagyu Tartare — Stone', ar: 'تارتار واغيو', desc: '800°C stone seared, quail yolk, sourdough', price: '85', tags: ['RAW','HOT','CHEF'], section: 'Raw & Cold', fire: 'Stone' },
    { title: 'Tahina Eggplant', ar: 'باذنجان', desc: '12h smoked, black tahina, pomegranate', price: '48', tags: ['COLD','V','VG'], section: 'Raw & Cold', fire: 'Fire' },
    { title: 'Wagyu Ribeye — Stone', ar: 'ريب آي', desc: '45-day dry, 800°C stone, lime salt', price: '185', tags: ['HOT','FIRE','SIGNATURE'], section: 'From The Jمر', fire: 'Fire' },
    { title: 'Bone Marrow — Ember', ar: 'نخاع', desc: 'Oak ember, parsley, charred bread', price: '92', tags: ['HOT','FIRE'], section: 'From The Jمر', fire: 'Fire' },
    { title: 'Smoked Lamb — 12H', ar: 'لحم مدخن', desc: 'Oak smoke 12H, date molasses, toum', price: '142', tags: ['HOT','FIRE'], section: 'From The Jمر', fire: 'Fire' },
    { title: 'KOVA Kofta', ar: 'كفتة كوڤا', desc: 'Flame grilled, toum khal, pickles', price: '78', tags: ['HOT','FIRE'], section: 'From The Jمر', fire: 'Fire' },
    { title: 'Seabass — Flame', ar: 'قاروص', desc: 'Charred, tahini, kohlrabi, barberry', price: '148', tags: ['HOT','FIRE','GF'], section: 'From The Jمر', fire: 'Fire' },
    { title: 'Truffle Khubz', ar: 'خبز ترافل', desc: 'Wood fired, black truffle butter, sea salt', price: '52', tags: ['HOT','STONE','V'], section: 'Stone & Bread', fire: 'Stone' },
    { title: 'Knafeh Brûlée', ar: 'كنافة', desc: 'Nabulsi cheese, orange blossom, ember kataifi', price: '54', tags: ['HOT','STONE'], section: 'Sweets', fire: 'Stone' },
    { title: 'Date Maamoul Ice', ar: 'معمول', desc: 'Ember date, tahina ice cream', price: '42', tags: ['COLD','V'], section: 'Sweets', fire: 'Cold' },
    { title: 'Karak Chai', ar: 'كرك', desc: 'Ember milk, aged cardamom, saffron', price: '22', tags: ['HOT'], section: 'Drinks', fire: 'Hot', type: 'Coffee & Tea' },
    { title: 'Turkish Coffee', ar: 'قهوة تركية', desc: 'Double roasted, cardamom dust', price: '24', tags: ['HOT'], section: 'Drinks', fire: 'Hot', type: 'Coffee & Tea' },
    { title: 'Iced Spanish Latte', ar: 'لاتيه بارد', desc: 'Ember condensed milk, double shot', price: '32', tags: ['COLD'], section: 'Drinks', fire: 'Cold', type: 'Coffee & Tea' },
    { title: 'Jمر Cola', ar: 'كولا', desc: 'Smoked date cola, charred lime', price: '28', tags: ['COLD'], section: 'Drinks', fire: 'Cold', type: 'Cold' },
    { title: 'Hibiscus & Smoke', ar: 'كركديه', desc: 'Smoked hibiscus, soda, lime', price: '30', tags: ['COLD'], section: 'Drinks', fire: 'Cold', type: 'Cold' },
  ],

  async render() {
    return `
      <div style="display:flex;flex-direction:column">
        <div style="padding:0 0 16px 0">
          <h2 style="font-size:32px;font-weight:900;letter-spacing:-1px">Menu <span class="ar" style="font-size:14px;color:var(--text-muted)">— مطبخ الجمر</span></h2>
          <p style="color:var(--text-muted);font-size:13px;margin-top:4px">Scroll — like Google Photos • Filters work like a bar</p>
        </div>

        <div id="filterBar" style="display:flex;gap:8px;overflow-x:auto;white-space:nowrap;position:sticky;top:0;z-index:20;margin:0 -32px 24px -32px;padding:14px 32px;background:var(--bg-app);border-bottom:1px solid var(--border);scrollbar-width:none;-ms-overflow-style:none">
          ${['All','Raw & Cold','From The Jمر','Stone & Bread','Sweets','Drinks','HOT','COLD','FIRE','STONE','Coffee & Tea','V','VG'].map(f=>`
            <button data-filter="${f}" class="filter-chip" style="flex-shrink:0;white-space:nowrap;padding:8px 16px;border-radius:99px;border:1px solid var(--border);background:${this.activeFilter===f?'var(--text-main)':'var(--bg-card)'};color:${this.activeFilter===f?'var(--bg-app)':'var(--text-muted)'};font-weight:700;font-size:12px;cursor:pointer;transition:.15s">${f}</button>
          `).join('')}
        </div>

        <div id="menuGrid" class="grid"></div>
        <div id="sentinel" style="height:80px;display:flex;align-items:center;justify-content:center;color:var(--text-muted);font-size:12px">Loading more from ember...</div>
      </div>
    `;
  },

  async afterRender() {
    const grid = document.getElementById('menuGrid');
    const chips = document.querySelectorAll('.filter-chip');

    // hide scrollbar
    const s = document.createElement('style');
    s.innerHTML = `#filterBar::-webkit-scrollbar{display:none} #filterBar{ -webkit-overflow-scrolling: touch; }`;
    document.head.appendChild(s);

    chips.forEach(chip => {
      chip.onclick = () => {
        this.activeFilter = chip.dataset.filter;
        chips.forEach(c=>{
          const isActive = c.dataset.filter === this.activeFilter;
          c.style.background = isActive? 'var(--text-main)' : 'var(--bg-card)';
          c.style.color = isActive? 'var(--bg-app)' : 'var(--text-muted)';
        });
        grid.innerHTML = '';
        this.page = 0;
        loadMore();
      };
    });

    const getFiltered = () => {
      if (this.activeFilter === 'All') return this.menuData;
      return this.menuData.filter(d =>
        d.section === this.activeFilter ||
        d.fire === this.activeFilter ||
        d.tags.includes(this.activeFilter) ||
        d.type === this.activeFilter
      );
    };

    const loadMore = () => {
      const data = getFiltered();
      if (data.length === 0) return;
      for (let i = 0; i < 6; i++) {
        const d = data[(this.page * 6 + i) % data.length];
        grid.insertAdjacentHTML('beforeend', `
          <div class="card" style="cursor:pointer">
            <div class="card-img" style="background:linear-gradient(135deg,var(--bg-hover),var(--border));display:flex;align-items:end;padding:12px">
              <span style="font-size:10px;background:var(--bg-card);border:1px solid var(--border);padding:4px 8px;border-radius:99px">${d.section} • ${d.fire}</span>
            </div>
            <div class="card-body">
              <div style="display:flex;justify-content:space-between;align-items:start">
                <div class="card-title" style="font-size:15px">${d.title}</div>
                <div style="font-weight:800;color:var(--accent)">${d.price}</div>
              </div>
              <div class="ar" style="font-size:11px;color:var(--text-muted)">${d.ar}</div>
              <div class="card-desc" style="margin-top:6px">${d.desc}</div>
              <div style="display:flex;gap:4px;margin-top:10px;flex-wrap:wrap">
                ${d.tags.map(t=>`<span style="font-size:9px;padding:3px 6px;border-radius:99px;border:1px solid var(--border);color:var(--text-muted)">${t}</span>`).join('')}
              </div>
            </div>
          </div>
        `);
      }
      this.page++;
    };

    loadMore();
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) loadMore();
    }, { rootMargin: '300px' });
    observer.observe(document.getElementById('sentinel'));
  }
};
