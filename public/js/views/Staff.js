// KOVA Staff View
export const Staff = {
  async render() {
    return `
      <div>
        <h2 style="font-size:32px;font-weight:800;margin-bottom:8px;">Staff</h2>
        <p style="color:var(--text-muted);margin-bottom:24px;">From D1 later — for now mock</p>
        <div class="grid" id="staffGrid"></div>
      </div>
    `;
  },
  async afterRender() {
    const staff = [
      { name: 'Chef Omar', role: 'Head of Flame', color: '#C8FF00' },
      { name: 'Sara Al-Hassan', role: 'Pastry — Stone', color: '#FF4E1F' },
      { name: 'Khalid M.', role: 'Smoke Pitmaster', color: '#A1A1AA' },
      { name: 'Emma D.', role: 'GM — KOVA OS Owner', color: '#C8FF00' },
    ];
    const grid = document.getElementById('staffGrid');
    staff.forEach(s => {
      grid.insertAdjacentHTML('beforeend', `
        <div class="card">
          <div class="card-body" style="display:flex;gap:16px;align-items:center;">
            <div style="width:56px;height:56px;border-radius:50%;background:${s.color};color:#000;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:20px;">${s.name[0]}</div>
            <div>
              <div class="card-title">${s.name}</div>
              <div class="card-desc">${s.role}</div>
            </div>
          </div>
        </div>
      `);
    });
  }
};
