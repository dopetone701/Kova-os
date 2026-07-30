// KOVA OS - APP BRAIN - LOCKED BACKEND: kova-main-api + D1 + KOVA-R2
import { Sidebar } from './components/Sidebar.js';
import { Topbar } from './components/Topbar.js';
import { Router } from './router/index.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('KOVA OS Booting... Backend: kova-main-api | D1 | KOVA-R2');
 
  Sidebar.render();
  Topbar.render();
  Router.init();

  // Theme
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
    const allowedEmails = ['owner@kova.ae'];
    console.log('Admin check locked:', allowedEmails);
  };
  checkAdminAccess();

  // Create dark overlay once
  let overlay = document.getElementById('sidebar-overlay');
  if(!overlay){
    overlay = document.createElement('div');
    overlay.id = 'sidebar-overlay';
    document.body.appendChild(overlay);
  }

  const getSb = () => document.getElementById('sidebar');

  window.closeSidebar = () => {
    const sb = getSb();
    if(!sb) return;
    sb.classList.remove('open');
    overlay.classList.remove('show');
    document.body.classList.remove('sb-open');
  };
  window.openSidebar = () => {
    const sb = getSb();
    if(!sb) return;
    if(window.innerWidth <= 768){
      sb.classList.add('open');
      overlay.classList.add('show');
      document.body.classList.add('sb-open');
    } else {
      sb.classList.remove('collapsed');
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
    }
  };

  overlay.onclick = () => window.closeSidebar();

  // Force hidden on mobile refresh
  if(window.innerWidth <= 768){
    getSb()?.classList.remove('open');
    overlay.classList.remove('show');
  }
});
