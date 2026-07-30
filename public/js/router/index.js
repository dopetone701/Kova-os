// KOVA Router - Like Spotify/Suno - #app only changes
import { Home } from '../views/Home.js';
import { Menu } from '../views/Menu.js';
import { Staff } from '../views/Staff.js';
import { Admin } from '../views/Admin.js';

const routes = {
  '/': Home,
  '/menu': Menu,
  '/story': Home, // for now uses Home, later Our Story
  '/staff': Staff,
  '/admin': Admin,
};

export const Router = {
  init() {
    // Handle initial load
    this.navigate(window.location.pathname, false);

    // Intercept all clicks on [data-link]
    document.body.addEventListener('click', (e) => {
      const link = e.target.closest('[data-link]');
      if (link) {
        e.preventDefault();
        const path = link.getAttribute('href');
        this.navigate(path, true);
      }
    });

    // Handle back button
    window.addEventListener('popstate', () => {
      this.navigate(window.location.pathname, false);
    });
  },

  async navigate(path, push = true) {
    const app = document.getElementById('app');
    const View = routes[path] || routes['/'];

    if (push) history.pushState({}, '', path);

    app.innerHTML = `<div class="loading">Loading ${path}...</div>`;

    // Render View (only #app changes, sidebar/topbar stay)
    setTimeout(async () => {
      app.innerHTML = await View.render();
      if (View.afterRender) View.afterRender();
    }, 150);
  }
};
