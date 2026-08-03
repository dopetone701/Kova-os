# KOVA-OS — Hospitality Operations OS

**Live:** https://kova-os.pages.dev
**Stack:** Cloudflare Workers, Pages, D1, R2, Hono, React, PWA
**Author:** Emmanuel Ssuuna | Dubai, UAE | Resident Visa

Edge-native Hospitality OS that loads in 100ms. Built for hotels/restaurants. Offline-ready PWA, real-time menu, cart, wishlist, guest auth.

## Why KOVA-OS?
Tired of slow Firebase bills and 3s TTFB. Rebuilt entire stack on Cloudflare edge.
- 100ms global delivery (Workers + Pages)
- PWA installable — offline, Add to Home Screen
- 95+ Lighthouse
- 0 servers

## Features
- Live menu with Flame categories, filters, tags
- Cart + Wishlist with localStorage cache (kova_menu_cache, kova_cart, kova_wish)
- Guest auth via GUEST_WORKER JWT (kova_token)
- Offline caching + fallback to menuData
- Hash router SPA (no redirects)
- PWA + Responsive

## Tech Stack
Frontend: HTML5, CSS3 Grid/Flexbox, JavaScript ES6+, Vanilla JS
Edge: Cloudflare Pages, Workers (GUEST_WORKER, API_BASE), D1 SQL, R2 Storage
Storage: LocalStorage + D1
Auth: JWT guest token
PWA: Service Worker, Manifest

## Code Highlight
```js
try { localStorage.setItem('kova_menu_cache', JSON.stringify(this.dishes)); } catch(e){}
const token = localStorage.getItem('kova_token');
if(token){
  const r = await fetch(`${GUEST_WORKER}/api/guest/me`, { headers: { 'Authorization': token } });
}
