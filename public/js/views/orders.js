// KOVA Guest Orders - Persistent in D1
export const Orders = {
  WORKER_URL: 'https://kova-guest-sign-up.dopetone701.workers.dev',

  async render(){
    return `
      <style>
      
        .orders-root{margin:-24px;width:calc(100% + 48px);min-width:calc(100% + 48px);background:var(--bg-app);box-sizing:border-box;min-height:80vh}
        .orders-inner{max-width:1100px;margin:0 auto;padding:32px 40px 100px}
        .order-card{background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:18px;margin-bottom:14px;transition:.2s}
        .order-card:hover{border-color:var(--accent-2)}
        .order-items{display:flex;gap:10px;overflow-x:auto;padding:8px 0}
        .order-item{min-width:140px;background:var(--bg-app);border:1px solid var(--border);border-radius:12px;padding:10px}
        .status{font-size:10px;font-weight:800;padding:4px 10px;border-radius:999px;letter-spacing:1px}
        .status.pending{background:rgba(255,180,0,0.15);color:#FFB400;border:1px solid rgba(255,180,0,0.3)}
        .status.preparing{background:rgba(255,78,31,0.15);color:var(--accent-2);border:1px solid rgba(255,78,31,0.3)}
        .status.ready{background:rgba(200,255,0,0.15);color:var(--accent);border:1px solid rgba(200,255,0,0.3)}
        .status.done{background:rgba(255,255,255,0.08);color:var(--text-muted);border:1px solid var(--border)}
        @media(max-width:768px){
          .orders-root{margin:0;margin-left:-16px;margin-right:-16px;width:calc(100% + 32px);min-width:calc(100% + 32px)}
          .orders-inner{padding:20px 20px 90px}
        }
      </style>
      <div class="orders-root">
        <div class="orders-inner">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;flex-wrap:wrap;gap:10px">
            <div>
              <h1 style="font-size:28px;font-weight:900;letter-spacing:-1px;margin:0">My Orders <span id="ordersCount" style="font-size:12px;color:var(--text-muted);font-weight:500"></span></h1>
              <p style="color:var(--text-muted);font-size:13px;margin-top:4px">All orders saved in D1 â€” never lost even if you change device</p>
            </div>
            <button onclick="location.hash='#/menu'" style="background:var(--accent);color:#000;border:0;padding:10px 18px;border-radius:999px;font-weight:800;font-size:13px;cursor:pointer">Order More â†’</button>
          </div>
          <div id="ordersList" style="min-height:200px;display:grid;place-items:center;color:var(--text-muted);font-size:13px">Loading your orders from D1...</div>
        </div>
      </div>
    `;
  },

  async afterRender(){
    const token = localStorage.getItem('kova_token');
    const listEl = document.getElementById('ordersList');
    const countEl = document.getElementById('ordersCount');
    if(!token){
      listEl.innerHTML = `<div style="text-align:center;padding:40px;background:var(--bg-card);border:1px solid var(--border);border-radius:16px">
        <div style="font-size:32px">ðŸ”’</div>
        <div style="font-weight:800;margin-top:8px;color:var(--text-main)">Sign in to see your orders</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:4px">Orders travel with your account across devices</div>
        <button onclick="location.hash='#/auth'" style="margin-top:14px;background:var(--accent);color:#000;border:0;padding:10px 18px;border-radius:999px;font-weight:800;cursor:pointer">Sign In / Sign Up</button>
      </div>`;
      return;
    }

    try{
      const res = await fetch(`${this.WORKER_URL}/api/guest/orders`, {headers:{'Authorization':`Bearer ${token}`}});
      const data = await res.json();
      if(!res.ok) throw new Error(data.error||'Failed');
      const orders = data.orders||[];
      if(countEl) countEl.textContent = `â€” ${orders.length}`;
      if(orders.length===0){
        listEl.innerHTML = `<div style="text-align:center;padding:40px;background:var(--bg-card);border:1px solid var(--border);border-radius:16px">
          <div style="font-size:32px">ðŸ›’</div>
          <div style="font-weight:700;margin-top:8px;color:var(--text-main)">No orders yet</div>
          <div style="font-size:12px;color:var(--text-muted)">Your cart is saved in D1. Checkout to create first order.</div>
          <button onclick="location.hash='#/menu'" style="margin-top:12px;background:var(--bg-card);border:1px solid var(--border);color:var(--text-main);padding:8px 16px;border-radius:999px;font-size:12px;cursor:pointer">Browse Menu</button>
        </div>`;
        return;
      }

      listEl.style.display='block';
      listEl.innerHTML = orders.map(o=>{
        let items=[];
        try{ items = JSON.parse(o.items); }catch{}
        const date = new Date(o.created_at).toLocaleString('en-AE',{hour:'2-digit',minute:'2-digit',day:'2-digit',month:'short'});
        return `
          <div class="order-card">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
              <div style="display:flex;gap:10px;align-items:center">
                <div style="font-weight:800;font-size:14px">Order #${o.id.slice(0,8)}</div>
                <span class="status ${o.status}">${o.status.toUpperCase()}</span>
                <span style="font-size:11px;color:var(--text-muted)">${date}</span>
              </div>
              <div style="font-weight:900;font-size:14px;color:var(--accent)">AED ${o.total}</div>
            </div>
            <div class="order-items">
              ${items.map(it=>`
                <div class="order-item">
                  <div style="font-weight:700;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${it.title||it.item_id}</div>
                  <div style="font-size:11px;color:var(--text-muted)">x${it.qty} â€¢ AED ${it.price}</div>
                </div>
              `).join('')}
            </div>
            <div style="display:flex;gap:8px;margin-top:8px;font-size:11px;color:var(--text-muted)">
              <span>ðŸ‘¤ ${o.guest_name}</span><span>â€¢</span><span>ðŸ“§ ${o.guest_email}</span>
            </div>
          </div>
        `;
      }).join('');

    }catch(e){
      listEl.innerHTML = `<div style="color:var(--accent-2);padding:20px;text-align:center">Failed to load orders: ${e.message}</div>`;
    }
  }
};