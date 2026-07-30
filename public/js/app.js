// KOVA OS - APP BRAIN - LOCKED BACKEND: kova-main-api + D1 + KOVA-R2
import { Sidebar } from './components/Sidebar.js';
import { Topbar } from './components/Topbar.js';
import { Router } from './router/index.js';

// 1. Boot Shell (Never Reloads)
document.addEventListener('DOMContentLoaded', () => {
  console.log('KOVA OS Booting... Backend: kova-main-api | D1 | KOVA-R2');
  
  // Render Shell
  Sidebar.render();
  Topbar.render();
  Router.init();

  // 2. Theme Toggle Logic - Noir Default + Light
  window.toggleTheme = () => {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next = current === 'noir' ? 'light' : 'noir';
    html.setAttribute('data-theme', next);
    localStorage.setItem('kova-theme', next);
  };
  
  // Load saved theme
  const saved = localStorage.getItem('kova-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);

  // 3. Admin Visibility Rule - LOCKED (later we check email)
  // For now we show admin, later we hide if not allowed
  window.checkAdminAccess = async () => {
    // TODO LATER: fetch('/api/me') -> check allowed_admins table in D1
    // if not allowed, hide [data-admin] button
    const allowedEmails = ['owner@kova.ae']; // will come from D1
    const adminBtn = document.querySelector('[data-admin]');
    if (adminBtn) {
      // Later: hide if not in allowedEmails
      // adminBtn.style.display = 'none'; 
      console.log('Admin check locked: only visible to', allowedEmails);
    }
  };
  checkAdminAccess();

  // 4. Sidebar Collapse
  window.toggleSidebar = () => {
    document.getElementById('sidebar').classList.toggle('collapsed');
  };
});
