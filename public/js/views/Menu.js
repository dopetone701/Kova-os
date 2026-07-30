// KOVA Menu - Infinite Scroll like Google Photos
export const Menu = {
  dishes: [],
  page: 0,
  async render() {
    return `
      <div>
        <div style="display:flex;justify-content:space-between;align-items:end;margin-bottom:24px;">
          <div>
            <h2 style="font-size:32px;font-weight:800;">Menu</h2>
            <p style="color:var(--text-muted)">Scroll — auto loads more from D1 later</p>
          </div>
          <div style="display:flex;gap:8px;">
            <button class="btn-secondary">All</button>
            <button class="btn-secondary">Fire</button>
            <button class="btn-secondary">Stone</button>
          </div>
        </div>
        <div id="menuGrid" class="grid"></div>
        <div id="sentinel" style="height:20px;"></div>
      </div>
    `;
  },

  async afterRender() {
    // Mock data for now - later from /api/menu?page= -> D1
    const mock = [
      { title: 'Wagyu Ribeye — Stone', desc: '800°C stone, lime salt', tag: 'HOT' },
      { title: 'Smoked Lamb — 12H', desc: 'Oak smoke, date molasses', tag: 'NEW' },
      { title: 'Hamour — Flame', desc: 'Charred, tahini, kohlrabi', tag: 'HOT' },
      { title: 'Truffle Khubz', desc: 'Wood fired, black truffle butter', tag: 'NEW' },
      { title: 'Bone Marrow — Ember', desc: 'Sourdough, parsley', tag: 'HOT' },
      { title: 'KOVA Kofta', desc: 'Flame grilled, toum, pickles', tag: 'NEW' },
    ];

    const grid = document.getElementById('menuGrid');
    const loadMore = () => {
      for (let i = 0; i < 6; i++) {
        const d = mock[(this.page * 6 + i) % mock.length];
        grid.insertAdjacentHTML('beforeend', `
          <div class="card">
            <div class="card-img" style="background:linear-gradient(135deg,var(--bg-hover),var(--border))"></div>
            <div class="card-body">
              <div class="card-title">${d.title}</div>
              <div class="card-desc">${d.desc}</div>
              <span class="tag ${d.tag==='HOT'?'tag-hot':'tag-new'}">${d.tag}</span>
            </div>
          </div>
        `);
      }
      this.page++;
    };

    loadMore();

    // Infinite Scroll Observer
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) loadMore();
    });
    observer.observe(document.getElementById('sentinel'));
  }
};
