// KOVA API — D1 + R2 — PRO
export const api = {
  // MENU
  getMenu: async () => {
    try {
      const local = JSON.parse(localStorage.getItem('kova_menu') || '[]');
      if (local.length > 0) return local;
      const r = await fetch('/api/menu');
      if (!r.ok) throw new Error('no api');
      return await r.json();
    } catch {
      return JSON.parse(localStorage.getItem('kova_menu') || '[]');
    }
  },

  
  saveMenu: (dishes) => {
    localStorage.setItem('kova_menu', JSON.stringify(dishes));
    // later: fetch('/api/admin/menu', {method:'POST', body: JSON.stringify(dishes)})
  },

  // UPLOAD TO R2
  upload: async (file) => {
    const fd = new FormData();
    fd.append('file', file);
    const r = await fetch('/api/upload', { method: 'POST', body: fd });
    if (!r.ok) throw new Error('upload failed');
    const data = await r.json(); // {url: "https://R2/xxx.jpg"}
    return data;
  },

  // AUTH
  me: async () => {
    try {
      const r = await fetch('/api/me');
      return await r.json();
    } catch { return { email: 'local@kova.com' }; }
  },

  // STAFF + RES (for now localStorage, later D1)
  getStaff: () => JSON.parse(localStorage.getItem('kova_staff') || '[]'),
  getReservations: () => JSON.parse(localStorage.getItem('kova_res') || '[]')
};
