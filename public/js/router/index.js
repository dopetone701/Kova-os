// KOVA Router - LIVE SERVER SAFE + CLOUDFLARE READY
import { Home } from '../views/Home.js';
import { Menu } from '../views/Menu.js';
import { Staff } from '../views/Staff.js';
import { Admin } from '../views/Admin.js';
import { Story } from '../views/Story.js'; // ← THIS WAS MISSING!

const routes = {
  '/': Home,
  '/home': Home,
  '': Home,
  'home': Home,
  '/menu': Menu,
  'menu': Menu,
  '/story': Story, // ← ONLY ONCE, now Story exists
  'story': Story, // ← ONLY ONCE
  '/staff': Staff,
  'staff': Staff,
  '/admin': Admin,
  'admin': Admin,
};

export const Router = {
  init() {
    window.addEventListener('hashchange', () => this.resolve());
    window.addEventListener('popstate', () => this.resolve());

    document.body.addEventListener('click', (e) => {
      const link = e.target.closest('[data-link]');
      if (link) {
        e.preventDefault();
        const href = link.getAttribute('href');
        const clean = href.replace('/','').replace('#','');
        if(window.location.hostname.includes('127.0.0.1') || window.location.hostname.includes('5500')){
          window.location.hash = clean;
        } else {
          history.pushState({}, '', '/' + clean);
          this.resolve();
        }
      }
    });
    this.resolve();
  },

  resolve() {
    let path = window.location.hash.replace('#','').replace('/','') ||
               window.location.pathname.replace('/public','').replace('/','') ||
               'home';

    if(window.location.pathname.includes('/admin')) path = 'admin';
    if(window.location.pathname.includes('/menu')) path = 'menu';
    if(window.location.pathname.includes('/story')) path = 'story';
    if(path === '' || path === 'index.html') path = 'home';

    console.log('ROUTING TO:', path);

    const View = routes['/' + path] || routes[path] || routes['/'];
    const app = document.getElementById('app-view') || document.getElementById('app');

    if(!app){ console.error('NO #app or #app-view found'); return; }

    app.innerHTML = `<div style="padding:40px;color:var(--text-muted)">Loading ${path}...</div>`;

    setTimeout(async () => {
      try {
        app.innerHTML = await View.render();
        if (View.afterRender) View.afterRender();
        if (View.attachEvents) View.attachEvents();
        if (View.bind) View.bind();
      } catch(err){
        console.error('Render error', err);
        app.innerHTML = `<div style="padding:20px;color:red">Error loading ${path}: ${err.message}</div>`;
      }
    }, 100);
  }
};

window.navigate = (path) => {
  if(window.location.hostname.includes('127.0.0.1')){
    window.location.hash = path.replace('/','');
  } else {
    history.pushState({}, '', path);
    Router.resolve();
  }
};
