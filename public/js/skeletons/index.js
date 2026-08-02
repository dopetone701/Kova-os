import { ordersSkeleton } from './orders.skeleton.js';
import { menuSkeleton } from './menu.skeleton.js';
import { homeSkeleton } from './home.skeleton.js';

export const Skeletons = {
  orders: ordersSkeleton,
  menu: menuSkeleton,
  home: homeSkeleton,
  get(hash){
    const h = (hash||'').toLowerCase();
    if(h.includes('orders')) return this.orders;
    if(h.includes('menu')) return this.menu;
    if(h.includes('home') || h === '#/' || h === '' || h === '#') return this.home;
    return this.orders; // default
  }
};
