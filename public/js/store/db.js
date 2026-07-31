// KOVA Store - Talks to kova-main-api + D1 + KOVA-R2
const API_BASE = ''; // same domain -> workers will proxy /api/*

export const DB = {
  async fetchMenu(page = 0) {
    // LATER: const res = await fetch(`${API_BASE}/api/menu?page=${page}`);
    // const data = await res.json(); return data;
    console.log('D1 fetch ready - will call kova-main-api');
    return [];
  },

  async uploadImage(file) {
    // LATER: R2 upload via worker
    // const fd = new FormData(); fd.append('file', file);
    // const res = await fetch(`${API_BASE}/api/upload`, {method:'POST', body:fd});
    console.log('R2 upload ready - KOVA-R2');
    return { url: '/assets/mock.jpg' };
  },

  
  async checkMe() {
    // LATER: returns email from Cloudflare Access / Auth
    // const res = await fetch(`${API_BASE}/api/me`);
    // return await res.json();
    return { email: 'owner@kova.ae', isAdmin: true };
  }
};
