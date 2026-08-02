// KOVA Router - HASH ONLY - FINAL - Orders in views, Settings + Recommendation in components - + SUNO SKELETON
import { Home } from '../views/home.js';
import { Menu } from '../views/menu.js';
import { Staff } from '../views/staff.js';
import { Admin } from '../views/admin.js';
import { Story } from '../views/story.js';
import { Auth } from '../views/auth.js';
import { Orders } from '../views/orders.js';
import { Settings } from '../components/settings.js';

// SKELETON IMPORT - NEW
import { Skeletons } from '../skeletons/index.js';

const routes = {
  '/': Home, '/home': Home, 'home': Home, 'index.html': Home,
  '/menu': Menu, 'menu': Menu,
  '/story': Story, 'story': Story,
  '/staff': Staff, 'staff': Staff,
  '/admin': Admin, 'admin': Admin,
  '/auth': Auth, 'auth': Auth,
  '/orders': Orders, 'orders': Orders,
  '/settings': Settings, 'settings': Settings,
  '/help': Story, 'help': Story,
  '/contact': Story, 'contact': Story,
};

export const Router = {
  init() {
    window.addEventListener('hashchange', () => this.resolve());
    document.body.addEventListener('click', (e) => {
      const link = e.target.closest('[data-link]');
      if (link) {
        e.preventDefault();
        const href = link.getAttribute('href') || '';
        const clean = href.replace(/^#/, '').replace(/^\//, '').replace(/\/$/, '').split('?')[0];
        window.location.hash = clean || 'home';
      }
    });
    this.resolve();
  },

  getSkeleton(path){
    try {
      return Skeletons.get('#/' + path) || '';
    } catch { return ''; }
  },

  resolve() {
    let hashPath = window.location.hash.replace(/^#\/?/, '').split('?')[0].replace(/\/$/, '');
    let path = hashPath || 'home';
    if (path === '' || path === 'index.html' || path === 'public') path = 'home';
    console.log('ROUTING TO:', path);

    const View = routes['/' + path] || routes[path] || routes['/home'];
    const app = document.getElementById('app') || document.getElementById('app-view');
    if (!app) return;

    // SUNO - EXACT SKELETON NOT LOADING TEXT
    const skHtml = this.getSkeleton(path);
    app.innerHTML = skHtml || `<div class="kv-shell"><div class="kv-sk kv-line" style="width:180px;height:26px"></div></div>`;

    setTimeout(async () => {
      try {
        const html = await View.render();
        if (html) app.innerHTML = html;
        if (View.afterRender) await View.afterRender();
        if (View.attachEvents) await View.attachEvents();
        if (View.bind) await View.bind();
        window.scrollTo(0,0);
      } catch (err) {
        console.error('Render error:', err);
        app.innerHTML = `<div style="padding:20px;color:red">Error ${path}: ${err.message}</div>`;
      }
    }, 80); // tiny delay for skeleton to paint like Suno
  }
};

export function initRouter(){ return Router.init(); }
window.navigate = (path) => {
  const clean = path.replace(/^\//, '').replace(/^#/, '').split('?')[0];
  window.location.hash = clean;
};
window.kovaGoOrders = () => navigate('orders');
window.kovaGoAuth = () => navigate('auth');
window.kovaGoSettings = () => navigate('settings');
window.kovaGoMenu = (filter) => {
  sessionStorage.setItem('kova_filter', filter||'All');
  navigate('menu');
};
