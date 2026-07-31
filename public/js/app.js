// KOVA OS - APP BRAIN - LOCKED BACKEND: kova-main-api + D1 + KOVA-R2 + GUEST AUTH D1 SAFE
import { Sidebar } from './components/sidebar.js';
import { Topbar } from './components/topbar.js';
import { Router } from './router/index.js';

const GUEST_WORKER = 'https://kova-guest-sign-up.dopetone701.workers.dev';

function bootKOVA(){
  console.log('KOVA OS Booting... Backend: kova-main-api | D1 | KOVA-R2 | Guest Auth D1+R2');
  Sidebar.render();
  Topbar.render();
  Router.init();
  // ... keep all the rest of your code inside here ...
  window.toggleTheme = () => {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next = current === 'noir' ? 'light' : 'noir';
    html.setAttribute('data-theme', next);
    localStorage.setItem('kova-theme', next);
  };
  const saved = localStorage.getItem('kova-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
  window.checkAdminAccess = async () => {
    const allowedEmails = ['owner@kova.ae', 'dopetone701@gmail.com'];
    try{
      const token = localStorage.getItem('kova_token');
      if(token){
        const r = await fetch(`${GUEST_WORKER}/api/guest/me`, {headers:{'Authorization':`Bearer ${token}`}});
        if(r.ok){
          const d = await r.json();
          if(d.guest && d.guest.is_admin){
            console.log('Admin access granted via D1:', d.guest.email);
            localStorage.setItem('kova_is_admin','1');
            localStorage.setItem('kova_admin_email', d.guest.email);
            return true;
          }
        }
      }
    }catch{}
    console.log('Admin check locked:', allowedEmails);
    return false;
  };
  checkAdminAccess();
  window.kovaLogout = () => {
    localStorage.removeItem('kova_token');
    localStorage.removeItem('kova_guest');
    localStorage.removeItem('kova_is_admin');
    location.hash='#/';
    location.reload();
  };
  window.kovaGoMenu = (filter) => {
    sessionStorage.setItem('kova_filter', filter);
    location.hash = `#/menu?filter=${encodeURIComponent(filter)}`;
  };
  window.kovaGetGuest = () => {
    try{ return JSON.parse(localStorage.getItem('kova_guest')||'null'); }catch{ return null; }
  };
  window.kovaIsAdmin = () => localStorage.getItem('kova_is_admin')==='1';
  let overlay = document.getElementById('sidebar-overlay');
  if(!overlay){
    overlay = document.createElement('div');
    overlay.id = 'sidebar-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:40;display:none;opacity:0;transition:opacity .2s';
    document.body.appendChild(overlay);
  }
  
  const getSb = () => document.getElementById('sidebar');
  window.closeSidebar = () => {
    const sb = getSb();
    if(!sb) return;
    sb.classList.remove('open');
    overlay.classList.remove('show');
    overlay.style.display='none';
    overlay.style.opacity='0';
    document.body.classList.remove('sb-open');
    document.body.classList.remove('sidebar-collapsed');
  };
  window.openSidebar = () => {
    const sb = getSb();
    if(!sb) return;
    if(window.innerWidth <= 768){
      sb.classList.add('open');
      overlay.classList.add('show');
      overlay.style.display='block';
      setTimeout(()=>overlay.style.opacity='1',10);
      document.body.classList.add('sb-open');
    } else {
      sb.classList.remove('collapsed');
      document.body.classList.remove('sidebar-collapsed');
    }
  };
  window.toggleSidebar = () => {
    const sb = getSb();
    if(!sb) return;
    if(window.innerWidth <= 768){
      if(sb.classList.contains('open')) window.closeSidebar();
      else window.openSidebar();
    } else {
      sb.classList.toggle('collapsed');
      if(sb.classList.contains('collapsed')){
        document.body.classList.add('sidebar-collapsed');
      } else {
        document.body.classList.remove('sidebar-collapsed');
      }
    }
  };
  overlay.onclick = () => window.closeSidebar();
  if(window.innerWidth <= 768){
    getSb()?.classList.remove('open');
    overlay.classList.remove('show');
    overlay.style.display='none';
    document.body.classList.remove('sb-open');
  }
  window.addEventListener('hashchange', ()=>{
    if(window.innerWidth <= 768) window.closeSidebar();
  });
}

// THIS IS THE FIX - runs even if DOM already loaded
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', bootKOVA);
} else {
  bootKOVA();
}
