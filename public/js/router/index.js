// KOVA Router - LIVE SERVER SAFE + CLOUDFLARE READY + GUEST AUTH D1 SAFE + MIME FIX
const routes = {
  '/': () => import('../views/Home.js'),
  '/home': () => import('../views/Home.js'),
  '': () => import('../views/Home.js'),
  'home': () => import('../views/Home.js'),
  'index.html': () => import('../views/Home.js'),
  '/menu': () => import('../views/Menu.js'),
  'menu': () => import('../views/Menu.js'),
  '/story': () => import('../views/Story.js'),
  'story': () => import('../views/Story.js'),
  '/staff': () => import('../views/Staff.js'),
  'staff': () => import('../views/Staff.js'),
  '/admin': () => import('../views/Admin.js'),
  'admin': () => import('../views/Admin.js'),
  '/auth': () => import('../views/Auth.js').catch(()=>import('../views/auth.js')),
  'auth': () => import('../views/Auth.js').catch(()=>import('../views/auth.js')),
  '/orders': () => import('../views/Orders.js').catch(()=>import('../views/orders.js')),
  'orders': () => import('../views/Orders.js').catch(()=>import('../views/orders.js')),
  '/help': () => import('../views/Story.js'),
  'help': () => import('../views/Story.js'),
  '/contact': () => import('../views/Story.js'),
  'contact': () => import('../views/Story.js'),
};

function getPath(){
  let p = location.pathname.replace('/public','') || '/';
  return p.split('?')[0];
}

async function load(pathWithSearch){
  const app = document.getElementById('app') || document.getElementById('app-view');
  if(!app) return;
  let rawPath = pathWithSearch || '';
  let path = rawPath.split('?')[0];
  path = path.replace(/^#\/?/, '').replace(/^\//, '').replace(/\/$/, '').toLowerCase();
  if(path==='' || path==='index.html' || path==='public') path='home';
  
  app.scrollTop = 0;
  document.querySelectorAll('.nav-item').forEach(el=>{
    const href = (el.getAttribute('href') || '').toLowerCase().replace(/^#/, '').replace(/^\//, '');
    const hrefClean = href.split('?')[0];
    el.classList.toggle('active', hrefClean===path || (path!=='' && hrefClean!=='' && path.startsWith(hrefClean) && hrefClean.length>1));
  });
  document.getElementById('sidebar')?.classList.remove('open');
  
  const loader = routes['/'+path] || routes[path] || routes['/home'] || routes['/'];
  try{
    const mod = await loader();
    const view = mod.Home || mod.Menu || mod.Staff || mod.Admin || mod.Story || mod.Auth || mod.Orders || mod.default || mod;
    if(view && typeof view.render === 'function'){
      const html = await view.render();
      app.innerHTML = html;
      if(view.afterRender) await view.afterRender();
      if(view.attachEvents) await view.attachEvents();
      if(view.bind) await view.bind();
    } else if(typeof view === 'function'){
      const html = await view();
      app.innerHTML = html;
    } else {
      app.innerHTML = view;
    }
    window.dispatchEvent(new CustomEvent('kova:navigated'));
    window.scrollTo(0,0);
  }catch(err){
    console.error('Render error:', err);
    app.innerHTML = `<div style="padding:40px;color:#ff4e1f"><h3 style="color:var(--text-main)">Failed to load ${path}</h3><p style="font-size:12px;color:var(--text-muted);margin-top:8px">${err.message}</p><pre style="font-size:11px;white-space:pre-wrap;color:var(--text-muted);margin-top:12px;background:var(--bg-card);padding:12px;border-radius:8px;border:1px solid var(--border)">${err.stack||''}</pre><div style="margin-top:16px"><button onclick="location.hash='#/home'" style="background:var(--accent);color:#000;border:0;padding:10px 18px;border-radius:999px;font-weight:800;cursor:pointer">Go Home</button></div></div>`;
  }
}

export const Router = {
  init(){
    window.addEventListener('hashchange', () => this.resolve());
    window.addEventListener('popstate', () => this.resolve());
    document.body.addEventListener('click', (e)=>{
      const link = e.target.closest('[data-link]');
      if(link){
        e.preventDefault();
        const href = link.getAttribute('href') || '';
        const clean = href.replace(/^#/, '');
        const isLocal = location.hostname.includes('127.0.0.1') || location.hostname.includes('localhost') || location.port==='5500';
        if(isLocal){
          location.hash = clean.startsWith('/')? clean : '/'+clean;
        } else {
          history.pushState({}, '', clean.startsWith('/')? clean : '/'+clean);
          this.resolve();
        }
      }
    });
    this.resolve();
  },
  resolve(){
    let hashPath = (location.hash||'').replace(/^#/, '');
    let full = hashPath || getPath() || 'home';
    load(full);
  }
};

// Backwards compat for old app.js that called initRouter()
export function initRouter(){ return Router.init(); }
export function navigate(path){
  const clean = (path||'').replace(/^#/, '');
  const isLocal = location.hostname.includes('127.0.0.1') || location.hostname.includes('localhost') || location.port==='5500';
  if(isLocal){
    location.hash = clean.startsWith('/')? clean : '/'+clean;
  } else {
    history.pushState({}, '', clean.startsWith('/')? clean : '/'+clean);
    Router.resolve();
  }
}

window.navigate = navigate;
window.kovaGoOrders = () => { location.hash='#/orders'; };
window.kovaGoAuth = () => { location.hash='#/auth'; };
