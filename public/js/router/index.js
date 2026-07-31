// KOVA Router - LIVE SERVER SAFE + CLOUDFLARE READY + GUEST AUTH D1 SAFE
import { Home } from '../views/home.js';
import { Menu } from '../views/menu.js';
import { Staff } from '../views/staff.js';
import { Admin } from '../views/admin.js';
import { Story } from '../views/story.js';
import { Auth } from '../views/Auth.js';
import { Orders } from '../views/Orders.js';

const routes = {
  '/': Home,
  '/home': Home,
  '': Home,
  'home': Home,
  'index.html': Home,
  '/menu': Menu,
  'menu': Menu,
  '/story': Story,
  'story': Story,
  '/staff': Staff,
  'staff': Staff,
  '/admin': Admin,
  'admin': Admin,
  '/auth': Auth,
  'auth': Auth,
  '/orders': Orders,
  'orders': Orders,
  '/help': Story,
  'help': Story,
  '/contact': Story,
  'contact': Story,
};

export const Router = {
  init() {
    window.addEventListener('hashchange', () => this.resolve());
    window.addEventListener('popstate', () => this.resolve());

    document.body.addEventListener('click', (e) => {
      const link = e.target.closest('[data-link]');
      if (link) {
        e.preventDefault();
        const href = link.getAttribute('href') || '';
        // keep query string
        const [pathPart, queryPart] = href.split('?');
        const clean = pathPart.replace(/^#/, '').replace(/^\//, '').replace(/\/$/, '');
        const withQuery = queryPart ? `${clean}?${queryPart}` : clean;
       
        // Local dev uses hash, live uses history
        const isLocal = window.location.hostname.includes('127.0.0.1') || window.location.hostname.includes('localhost') || window.location.port === '5500';
       
        if (isLocal) {
          window.location.hash = withQuery || 'home';
        } else {
          history.pushState({}, '', '/' + withQuery);
          this.resolve();
        }
      }
    });
    this.resolve();
  },

  resolve() {
    // hash may include ?filter=...
    let rawHash = window.location.hash.replace(/^#/, '');
    let hashPath = rawHash.split('?')[0].replace(/\/$/, '');
    let hashQuery = rawHash.includes('?') ? '?' + rawHash.split('?').slice(1).join('?') : '';
    let pathNameRaw = window.location.pathname.replace('/public', '').replace(/^\//, '').replace(/\/$/, '').toLowerCase();
    let pathName = pathNameRaw.split('?')[0];
   
    let path = (hashPath || pathName || 'home').toLowerCase();
   
    if (path === '' || path === 'index.html' || path === 'public') path = 'home';

    console.log('ROUTING TO:', path, hashQuery, '| Guest:', localStorage.getItem('kova_token') ? 'LoggedIn D1' : 'Guest');

    const View = routes['/' + path] || routes[path] || routes['/home'] || routes['/'];
    const app = document.getElementById('app-view') || document.getElementById('app');

    if (!app) {
      console.error('NO #app or #app-view found');
      return;
    }

    app.innerHTML = `<div style="padding:40px;color:var(--text-muted, #888)">Loading ${path}... D1 ${localStorage.getItem('kova_token')?'Synced':'Guest'}</div>`;

    setTimeout(async () => {
      try {
        if (!View || !View.render) throw new Error(`View for ${path} not found`);
        // Preserve query in location for Views that read it (Menu filter)
        if(hashQuery && !location.search){
          // keep hashQuery available via sessionStorage for Views reading search
          sessionStorage.setItem('kova_last_query', hashQuery);
        }
        const html = await View.render();
        app.innerHTML = html;
        if (View.afterRender) await View.afterRender();
        if (View.attachEvents) await View.attachEvents();
        if (View.bind) await View.bind();
        window.scrollTo(0,0);
        window.dispatchEvent(new CustomEvent('kova:navigated'));
      } catch (err) {
        console.error('Render error:', err);
        app.innerHTML = `<div style="padding:20px;color:#ff4e1f">Error loading ${path}: ${err.message}<br><pre style="font-size:11px;white-space:pre-wrap;color:var(--text-muted)">${err.stack}</pre><br><button onclick="location.hash='#/home'" style="background:var(--accent);color:#000;border:0;padding:8px 16px;border-radius:999px;font-weight:800;cursor:pointer">Go Home</button></div>`;
      }
    }, 30);
  }
};

window.navigate = (path) => {
  const clean = path.replace(/^\//, '').replace(/^#/, '');
  const isLocal = window.location.hostname.includes('127.0.0.1') || window.location.hostname.includes('localhost');
  if (isLocal) {
    window.location.hash = clean;
  } else {
    history.pushState({}, '', '/' + clean);
    Router.resolve();
  }
};

// Global helpers for Menu cart persistence
window.kovaGoOrders = () => { location.hash='#/orders'; };
window.kovaGoAuth = () => { location.hash='#/auth'; };
