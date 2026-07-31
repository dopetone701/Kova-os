// KOVA Router - CLOUDFLARE PAGES SAFE + LIVE SERVER 5500 SAFE + MIME FIX
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
  '/auth': () => import('../views/Auth.js').catch(()=>import('../views/auth.js')).catch(()=>import('../views/Home.js')),
  'auth': () => import('../views/Auth.js').catch(()=>import('../views/auth.js')).catch(()=>import('../views/Home.js')),
  '/orders': () => import('../views/Orders.js').catch(()=>import('../views/orders.js')).catch(()=>import('../views/Home.js')),
  'orders': () => import('../views/Orders.js').catch(()=>import('../views/orders.js')).catch(()=>import('../views/Home.js')),
  '/help': () => import('../views/Story.js'),
  'help': () => import('../views/Story.js'),
  '/contact': () => import('../views/Story.js'),
  'contact': () => import('../views/Story.js'),
};

function getPath(){
  // Hash takes priority on live server
  const hash = (location.hash||'').replace(/^#/, '');
  if(hash) return hash.split('?')[0];
  let p = location.pathname.replace('/public','') || '/';
  return p.split('?')[0];
}

async function load(pathWithSearch){
  const app = document.getElementById('app') || document.getElementById('app-view');
  if(!app) return;
  let raw = pathWithSearch || getPath() || '/';
  let path = raw.split('?')[0];
  path = path.replace(/^#\/?/, '').replace(/^\//, '').replace(/\/$/, '').toLowerCase();
  if(path==='' || path==='index.html' || path==='public') path='home';

  app.scrollTop = 0;
  document.querySelectorAll('.nav-item').forEach(el=>{
    const href = (el.getAttribute('href') || '').toLowerCase().replace(/^#/,'').replace(/^\//,'').split('?')[0];
    const isActive = href===path || (href!=='' && path!=='' && path.startsWith(href) && href.length>1) || (path==='home' && href==='' );
    el.classList.toggle('active', isActive);
  });
  document.getElementById('sidebar')?.classList.remove('open');
  
  const loader = routes['/'+path] || routes[path] || routes['/home'] || routes['/'];
  try{
    const mod = await loader();
    // Ensure we get the view object, not the module object itself as string
    const view = mod.Home || mod.Menu || mod.Staff || mod.Admin || mod.Story || mod.Auth || mod.Orders || mod.default || mod;
    let html = '';
    if(view && typeof view.render === 'function'){
      html = await view.render();
    } else if(typeof view === 'function'){
      html = await view();
    } else if(typeof view === 'string'){
      html = view;
    } else {
      html = '<div style="padding:40px">View not found</div>';
    }
    // Force string - fixes "Cannot convert object to primitive value"
    if(typeof html !== 'string'){
      console.warn('Render returned non-string, converting', typeof html, html);
      html = String(html||'');
    }
    app.innerHTML = html;
    if(view && view.afterRender) await view.afterRender();
    if(view && view.attachEvents) await view.attachEvents();
    if(view && view.bind) await view.bind();
    window.dispatchEvent(new CustomEvent('kova:navigated'));
    window.scrollTo(0,0);
  }catch(err){
    console.error('Render error:', err);
    app.innerHTML = `<div style="padding:40px;color:#ff4e1f"><h3 style="color:var(--text-main);font-weight:800">Failed to load ${path}</h3><p style="font-size:12px;color:var(--text-muted);margin-top:8px">${err.message}</p><pre style="font-size:11px;white-space:pre-wrap;color:var(--text-muted);margin-top:12px;background:var(--bg-card);padding:12px;border-radius:8px;border:1px solid var(--border)">${err.stack||''}</pre><div style="margin-top:16px;display:flex;gap:8px"><button onclick="location.hash='#/home'" style="background:var(--accent);color:#000;border:0;padding:10px 18px;border-radius:999px;font-weight:800;cursor:pointer">Go Home</button><button onclick="location.reload()" style="background:var(--bg-card);border:1px solid var(--border);color:var(--text-main);padding:10px 18px;border-radius:999px;font-weight:700;cursor:pointer">Reload</button></div></div>`;
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
          // Cloudflare Pages - use hash for SPA safety
          if(clean.startsWith('#')) location.hash = clean;
          else location.hash = '#'+ (clean.startsWith('/')? clean : '/'+clean);
        }
        this.resolve();
      }
    });
    this.resolve();
  },
  resolve(){
    const hash = location.hash||'';
    const path = hash || getPath() || 'home';
    load(path);
  }
};

export function initRouter(){ return Router.init(); }
export function navigate(path){
  const clean = (path||'').replace(/^#/, '');
  location.hash = clean.startsWith('/')? clean : '/'+clean;
  Router.resolve();
}
window.navigate = navigate;
window.kovaGoOrders = () => { location.hash='#/orders'; };
window.kovaGoAuth = () => { location.hash='#/auth'; };
window.kovaGoMenu = (filter) => { sessionStorage.setItem('kova_filter', filter||'All'); location.hash = `#/menu?filter=${encodeURIComponent(filter||'All')}`; };
