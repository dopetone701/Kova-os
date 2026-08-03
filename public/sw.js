const CACHE = 'kova-v3';
const ASSETS = [
  '/',
  '/index.html',
  '/js/app.js',
  '/js/router/index.js',
  '/js/services/api.js',
  '/js/store/db.js',
  '/js/utils/format.js',
  '/js/views/menu.js',
  '/js/views/home.js',
  '/css/app.css'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // Don't cache your Workers API, but cache fallback
  if (url.hostname.includes('workers.dev')) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      }).catch(() => caches.match('/index.html'));
    })
  );
});
