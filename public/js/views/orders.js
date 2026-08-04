// KOVA Guest Orders - V3 BEAST - VERTICAL CART + FLAME MODAL + PRO CHECKOUT + EDGE RECS + 2 RECENT ONLY
import { Recommendations } from '../components/recommendation.js';
import { ordersSkeleton } from '../skeletons/orders.skeleton.js';

export const Orders = {
  WORKER_URL: 'https://kova-guest-sign-up.dopetone701.workers.dev',
  selectedPayment: 'cod',

  getItemImg(it){
    if(!it) return '';
    let src = it.image || it.img || it.image_url || it.thumbnail || it.imageUrl || it.cover || '';
    if(src) return src;
    try{
      const cache = JSON.parse(localStorage.getItem('kova_menu_cache')||'[]');
      const found = cache.find(d =>
        (d.id && (d.id===it.id || d.id===it.item_id)) ||
        (d.title && (d.title===it.title || d.title===it.name)) ||
        (d.name && (d.name===it.title || d.name===it.name))
      );
      if(found) return found.image || found.img || found.image_url || '';
    }catch{}
    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400';
  },

    openImgModal(src, title=''){
    if(!src) return;
    const m=document.getElementById('imgModal');
    const img=document.getElementById('imgModalImg');
    const t=document.getElementById('imgModalTitle');
    if(!m||!img) return;
    img.src=src; 
    if(t) t.textContent=title||'';
    m.classList.add('active'); 
    document.body.style.overflow='hidden';
    document.getElementById('closeImgModalBtn').onclick=()=>this.closeImgModal();
    m.onclick=(e)=>{ if(e.target.id==='imgModal') this.closeImgModal(); };
    document.addEventListener('keydown', this._esc = (e)=>{ if(e.key==='Escape') this.closeImgModal(); });
  },
  closeImgModal(){ 
    const m=document.getElementById('imgModal'); 
    if(m) m.classList.remove('active'); 
    document.body.style.overflow=''; 
    document.removeEventListener('keydown', this._esc||(()=>{}));
  },


  openCheckoutModal(){
    const cart=JSON.parse(localStorage.getItem('kova_cart')||'[]');
    if(cart.length===0){ alert('Your cart is empty'); return; }
    const m=document.getElementById('checkoutModal');
    const token=localStorage.getItem('kova_token');
    const authBox=document.getElementById('checkoutAuthBox');
    const payBox=document.getElementById('checkoutPayBox');
    
    // IF NOT LOGGED IN — show auth box but SAVE intent
    if(!token){
      localStorage.setItem('kova_pending_checkout','1');
      if(authBox) authBox.style.display='block'; 
      if(payBox) payBox.style.display='none';
    } else {
      // LOGGED IN — go straight to payment
      if(authBox) authBox.style.display='none'; 
      if(payBox) payBox.style.display='block';
      this.selectedPayment='cod';
      this.selectPayment('cod');
    }

    const count=cart.reduce((s,i)=>s+(i.qty||1),0);
    const total=cart.reduce((s,i)=>s+(parseFloat(i.price)||0)*(i.qty||1),0);
    const sumEl=document.getElementById('checkoutSummary');
    if(sumEl) sumEl.innerHTML=`<div style="font-size:12px;color:var(--text-muted)">${count} items</div><div style="font-weight:900;margin-top:4px;font-size:15px">Total: AED ${total.toFixed(2)}</div>`;

    // WIRE ALL BUTTONS
    document.getElementById('closeCheckoutX').onclick=()=>this.closeCheckoutModal();
    document.getElementById('closeCheckoutCancel').onclick=()=>this.closeCheckoutModal();
    document.getElementById('payCod').onclick=()=>this.selectPayment('cod');
    document.getElementById('payCard').onclick=()=>this.selectPayment('card');
    document.getElementById('confirmOrderBtn').onclick=()=>this.confirmOrder();
    document.getElementById('goAuthBtn').onclick=()=>{
      localStorage.setItem('kova_pending_checkout','1');
      location.hash='#/auth?next=orders'; 
      this.closeCheckoutModal(); 
    };
   
    if(m){
      m.onclick=(e)=>{ if(e.target.id==='checkoutModal') this.closeCheckoutModal(); };
      m.classList.add('active');
    }
    document.body.style.overflow='hidden';
  },
  closeCheckoutModal(){
    document.getElementById('checkoutModal')?.classList.remove('active');
    document.body.style.overflow='';
  },

  closeCheckoutModal(){
    const m=document.getElementById('checkoutModal');
    if(m) m.classList.remove('active');
    document.body.style.overflow='';
  },
  selectPayment(method){
  this.selectedPayment=method;
  document.querySelectorAll('#checkoutModal [data-pay]').forEach(b=>{
    const isActive=b.dataset.pay===method;
    b.style.borderColor=isActive?'#C8FF00':'#27272A';
    b.style.background=isActive?'rgba(200,255,0,.14)':'#0A0A0B';
    const dot=b.querySelector('.pay-dot');
    if(dot){
      dot.textContent=isActive?'●':'○';
      dot.style.opacity=isActive?'1':'.25';
      dot.style.color=isActive?'#C8FF00':'#A1A1AA';
    }
  });
  const codMsg=document.getElementById('codMsg');
  const cardMsg=document.getElementById('cardMsg');
  if(method==='card'){
    if(codMsg) codMsg.style.display='none';
    if(cardMsg) cardMsg.style.display='flex';
  } else {
    if(codMsg) codMsg.style.display='flex';
    if(cardMsg) cardMsg.style.display='none';
  }
},

   async confirmOrder(){
    const token=localStorage.getItem('kova_token');
    if(!token){ location.hash='#/auth?next=orders'; this.closeCheckoutModal(); return; }
    const method=this.selectedPayment||'cod';
    const btn=document.getElementById('confirmOrderBtn');
    if(btn){ btn.disabled=true; btn.textContent= method==='card' ? 'Redirecting to Stripe...' : 'Placing...'; }

    try{
      // === CARD -> STRIPE, NO ORDER YET ===
      if(method==='card'){
        const res=await fetch(`${this.WORKER_URL}/api/guest/orders/create-checkout-session`,{
          method:'POST',
          headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},
          body: JSON.stringify({ payment_method:'card' })
        });
        const data=await res.json();
        if(!res.ok) throw new Error(data.error||'Stripe session failed');
        const url=data.url || data.checkout_url || data.sessionUrl || data.session_url;
        if(!url) throw new Error('No Stripe URL returned from worker');
        // Do NOT clear cart, do NOT create order - Stripe will do it on success webhook
        window.location.href=url;
        return;
      }

      // === COD -> CREATE ORDER DIRECTLY ===
      const res=await fetch(`${this.WORKER_URL}/api/guest/orders/create`,{
        method:'POST',
        headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},
        body: JSON.stringify({payment_method:'cod'})
      });
      const data=await res.json();
      if(!res.ok) throw new Error(data.error||'Failed');
      localStorage.setItem('kova_cart','[]');
      window.dispatchEvent(new CustomEvent('kova:cart'));
      this.renderCartSection();
      this.closeCheckoutModal();
      this.showSuccess(data.order||{id:'KOVA-'+Date.now()});

    }catch(e){
      alert('Checkout failed: '+e.message);
    }finally{
      if(btn){ btn.disabled=false; btn.textContent='Place Order'; }
    }
  },

  showSuccess(order){
    const m=document.getElementById('successModal');
    const idEl=document.getElementById('successOrderId');
    if(idEl) idEl.textContent='#'+(order.id||'').toString().slice(0,8).toUpperCase();
    if(m){
      m.classList.add('active');
      m.onclick=(e)=>{ if(e.target.id==='successModal') this.closeSuccessModal(); };
    }
    document.getElementById('closeSuccessBrowse').onclick=()=>this.closeSuccessModal();
    document.getElementById('closeSuccessTrack').onclick=()=>this.closeSuccessModal();
    document.body.style.overflow='hidden';
  },
  closeSuccessModal(){ const m=document.getElementById('successModal'); if(m) m.classList.remove('active'); document.body.style.overflow=''; this.afterRender(); },

  renderCartSection(){
    const el=document.getElementById('cartSection'); if(!el) return;
    let cart=[]; try{cart=JSON.parse(localStorage.getItem('kova_cart')||'[]')}catch{}
    if(cart.length===0){
      el.innerHTML=`<div class="cart-section"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px"><div style="font-weight:900;font-size:16px">Your Cart • 0</div><button onclick="location.hash='#/menu'" style="background:var(--bg-app);border:1px solid var(--border);padding:7px 14px;border-radius:999px;font-size:11px;font-weight:800;cursor:pointer">Browse Menu</button></div><div class="cart-empty">🛒 Your cart is empty<br><span style="font-size:11px">Add some flame — stays even without sign-in</span></div></div>`;
      return;
    }
    const total=cart.reduce((s,i)=>s+(parseFloat(i.price)||0)*(i.qty||1),0);
    const count=cart.reduce((s,i)=>s+(i.qty||1),0);
    el.innerHTML=`
      <div class="cart-section">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:8px">
          <div><div style="font-weight:900;font-size:17px">Your Cart • ${count}</div><div style="font-size:11px;color:var(--text-muted);margin-top:3px">AED ${total.toFixed(2)} • Tap image for bigger flame</div></div>
          <div style="display:flex;gap:8px"><button id="clearCartBtn" style="background:var(--bg-app);border:1px solid var(--border);color:var(--text-muted);padding:8px 12px;border-radius:999px;font-size:11px;font-weight:800;cursor:pointer">Clear</button><button id="openCheckoutBtn" style="background:var(--accent);color:#000;border:0;padding:9px 18px;border-radius:999px;font-size:12px;font-weight:900;cursor:pointer">Checkout • AED ${total.toFixed(0)}</button></div>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px">
          ${cart.map(it=>{
            const img=this.getItemImg(it);
            const lineTotal=(parseFloat(it.price)||0)*(it.qty||1);
            const safeTitle=(it.title||it.name||'Item').replace(/'/g,"&#39;");
            return `<div class="cart-item"><img src="${img}" data-img="${img}" data-title="${safeTitle}" class="viewable-img" style="cursor:zoom-in" onclick="Orders.openImgModal('${img}','${safeTitle}')" alt="">
<div style="flex:1;min-width:0"><div style="display:flex;justify-content:space-between;gap:8px"><div style="font-weight:900;font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${safeTitle}</div><div style="font-weight:900;font-size:13px">AED ${lineTotal.toFixed(2)}</div></div><div style="font-size:11px;color:var(--text-muted);margin-top:2px">AED ${it.price} each • D1 synced</div><div style="display:flex;gap:8px;align-items:center;margin-top:10px"><button data-action="dec" data-id="${it.id}" style="width:32px;height:32px;border-radius:50%;border:1px solid var(--border);background:var(--bg-card);font-weight:900;cursor:pointer">−</button><span style="font-size:13px;font-weight:900;min-width:20px;text-align:center">${it.qty||1}</span><button data-action="inc" data-id="${it.id}" style="width:32px;height:32px;border-radius:50%;border:1px solid var(--border);background:var(--bg-card);font-weight:900;cursor:pointer">+</button><button data-action="remove" data-id="${it.id}" style="margin-left:auto;background:rgba(255,78,31,.14);border:1px solid rgba(255,78,31,.28);color:#FF4E1F;padding:6px 12px;border-radius:999px;font-size:11px;font-weight:900;cursor:pointer">Remove</button></div></div></div>`;
          }).join('')}
        </div>
      </div>`;
    el.querySelectorAll('button[data-action]').forEach(btn=>{
      btn.onclick=async(e)=>{
        e.stopPropagation();
        const id=btn.dataset.id; const action=btn.dataset.action;
        let cart2=[]; try{cart2=JSON.parse(localStorage.getItem('kova_cart')||'[]')}catch{}
        const idx=cart2.findIndex(c=>String(c.id)===String(id)); if(idx<0) return;
        const token=localStorage.getItem('kova_token'); const item=cart2[idx];
        if(action==='remove'){
          cart2.splice(idx,1);
          if(token){ try{ await fetch(`${Orders.WORKER_URL}/api/guest/cart/remove`,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify({item_id:String(item.id)})}) }catch{} }
        }else if(action==='inc'){
          cart2[idx].qty=(cart2[idx].qty||1)+1;
          if(token){ try{ await fetch(`${Orders.WORKER_URL}/api/guest/cart/add`,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify({item_id:String(item.id),title:item.title,price:String(item.price),image:item.image||Orders.getItemImg(item),qty:1})}) }catch{} }
        }else if(action==='dec'){
          cart2[idx].qty=(cart2[idx].qty||1)-1;
          if(cart2[idx].qty<=0){
            cart2.splice(idx,1);
            if(token){ try{ await fetch(`${Orders.WORKER_URL}/api/guest/cart/remove`,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify({item_id:String(item.id)})}) }catch{} }
          }else{
            if(token){
              try{
                await fetch(`${Orders.WORKER_URL}/api/guest/cart/remove`,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify({item_id:String(item.id)})});
                await fetch(`${Orders.WORKER_URL}/api/guest/cart/add`,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify({item_id:String(item.id),title:item.title,price:String(item.price),image:item.image||Orders.getItemImg(item),qty:cart2[idx].qty})});
              }catch{}
            }
          }
        }
        localStorage.setItem('kova_cart', JSON.stringify(cart2));
        window.dispatchEvent(new CustomEvent('kova:cart'));
        Orders.renderCartSection();
      };
    });
    document.getElementById('clearCartBtn')?.addEventListener('click', async ()=>{
      if(!confirm('Clear cart?')) return;
      const token=localStorage.getItem('kova_token');
      let cart2=[]; try{cart2=JSON.parse(localStorage.getItem('kova_cart')||'[]')}catch{}
      if(token){ for(const it of cart2){ try{ await fetch(`${Orders.WORKER_URL}/api/guest/cart/remove`,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify({item_id:String(it.id)})}) }catch{} } }
      localStorage.setItem('kova_cart','[]'); window.dispatchEvent(new CustomEvent('kova:cart')); Orders.renderCartSection();
    });
    document.getElementById('openCheckoutBtn')?.addEventListener('click', ()=> Orders.openCheckoutModal());
  },

  async render(){
    return `
    <style>
        ::-webkit-scrollbar{display:none!important;width:0!important;height:0!important}
        *{scrollbar-width:none!important;-ms-overflow-style:none!important}
        html,body{overflow-x:clip;max-width:100vw;overscroll-behavior-x:none}
        #app{overflow-x:clip;max-width:100vw;touch-action:pan-y}
        .orders-root{margin:-24px!important;width:calc(100% + 48px)!important;min-width:calc(100% + 48px);background:var(--bg-app);box-sizing:border-box;min-height:100vh;overflow-x:clip;position:relative}
        .orders-inner{max-width:1280px;margin:0 auto;padding:28px 24px 120px;overflow-x:clip}
        @media(min-width:1280px){ .orders-inner{max-width:1440px;padding:32px 32px 120px} }
        #recBox{margin-left:-24px;margin-right:-24px;padding-left:24px;padding-right:0;overflow-x:auto;overflow-y:hidden;scrollbar-width:none}
        #recBox::-webkit-scrollbar{display:none}
        #recBox > div{padding-right:24px;overflow-x:auto!important;scroll-snap-type:x proximity}
        
        .order-card{background:#1C1C1F!important;border:1px solid #27272A!important;border-radius:20px;padding:18px;margin-bottom:16px;position:relative;overflow:hidden}
        .order-card.featured{border-color:var(--accent-2)!important;box-shadow:0 0 0 1px rgba(255,78,31,.25),0 16px 32px rgba(0,0,0,.28)}
        .order-card.featured::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--accent),var(--accent-2))}
        .order-items{display:flex;gap:10px;overflow-x:auto;padding:10px 0}
        .order-item{min-width:160px;background:#121214!important;border:1px solid #27272A!important;border-radius:14px;padding:10px;flex-shrink:0;display:flex;gap:10px;align-items:center;color:#F4F4F5!important}
        .order-item img{width:52px;height:52px;border-radius:10px;object-fit:cover;cursor:zoom-in}
        
        .cart-section{background:#1C1C1F!important;border:1px solid #27272A!important;border-radius:22px;padding:18px;margin-bottom:22px}
        .cart-item{display:flex;gap:14px;align-items:flex-start;background:#121214!important;border:1px solid #27272A!important;border-radius:16px;padding:14px;width:100%;box-sizing:border-box;color:#F4F4F5!important}
        .cart-item img{width:76px;height:76px;border-radius:14px;object-fit:cover;flex-shrink:0;cursor:zoom-in;background:var(--border)}
        .cart-empty{border:1px dashed #3F3F46;border-radius:16px;padding:28px;text-align:center;color:#A1A1AA;font-size:13px;font-weight:700}
        
        .status{font-size:10px;font-weight:900;padding:5px 12px;border-radius:999px;letter-spacing:.8px;text-transform:uppercase}
        .status.pending{background:rgba(255,193,7,.15);color:#FFC107;border:1px solid rgba(255,193,7,.3)}
        .status.preparing{background:rgba(255,78,31,.15);color:#FF4E1F;border:1px solid rgba(255,78,31,.3)}
        .status.ready{background:rgba(56,189,248,.15);color:#38BDF8;border:1px solid rgba(56,189,248,.3)}
        .status.on_the_way,.status.out_for_delivery{background:rgba(56,189,248,.15);color:#38BDF8;border:1px solid rgba(56,189,248,.3)}
        .status.delivered,.status.done{background:rgba(34,197,94,.15);color:#22C55E;border:1px solid rgba(34,197,94,.3)}
        
        .timeline{display:flex;gap:8px;margin:14px 0;align-items:center}
        .t-dot{width:22px;height:22px;border-radius:50%;display:grid;place-items:center;font-size:11px;font-weight:900;border:1.5px solid #3F3F46;background:#252631!important;color:#F4F4F5!important;flex-shrink:0}
        .t-dot.active{background:#C8FF00!important;color:#000!important;border-color:#C8FF00!important}
        .t-dot.done{background:#22C55E!important;color:#fff!important;border-color:#22C55E!important}
        .t-line{flex:1;height:2px;background:#3F3F46}
        .t-line.done{background:#22C55E}
        
        .arivie-msg{background:linear-gradient(135deg,rgba(200,255,0,.22),rgba(255,78,31,.22))!important;border:1px solid rgba(200,255,0,.35)!important;border-radius:16px;padding:14px 16px;display:flex;gap:12px;align-items:center;margin-bottom:16px}
        .arivie-msg div{color:#F4F4F5!important}
        .discount-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:18px;margin-bottom:20px}
        .kova-mobile-filler{display:block;margin-top:22px}
        .prev-toggle{background:#1C1C1F;border:1px dashed #3F3F46;border-radius:14px;padding:14px;text-align:center;cursor:pointer;color:#A1A1AA;font-size:13px;font-weight:800;margin-top:16px}
        #ordersHistory{max-height:900px;overflow-y:auto;margin-top:14px}
        .modal-overlay{position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.78);backdrop-filter:blur(18px);display:none;place-items:center;padding:16px;pointer-events:auto}
        .modal-overlay.active{display:grid}
        .modal-box{background:var(--bg-card);border:1px solid var(--border);border-radius:22px;padding:22px;max-width:440px;width:100%;box-sizing:border-box;max-height:90vh;overflow-y:auto;pointer-events:auto}
        .pay-option{border:1.5px solid var(--border);border-radius:14px;padding:12px 14px;display:flex;gap:10px;align-items:center;cursor:pointer;background:var(--bg-app);transition:.18s;pointer-events:auto}
        #closeCheckoutCancel{background:#18181B!important;border:1px solid #3F3F46!important;color:#F4F4F5!important;opacity:1!important}
        #closeCheckoutX{background:var(--bg-app)!important;border:1px solid var(--border)!important;color:var(--text-main)!important;opacity:1!important}
        
        /* PENS - always visible */
        #editLocPen, button[data-go="settings"]{background:#252631!important;border:1px solid #3F3F46!important;color:#F4F4F5!important;font-weight:900!important;opacity:1!important;width:28px!important;height:28px!important;display:grid!important;place-items:center!important}
        #changeLocPen{background:#C8FF00!important;color:#000!important;border-color:#C8FF00!important;opacity:1!important}
        #dAddress, #dBuildingText, #dRoomText, #dLandmarkText, #dPhoneText, #dEmailText{color:#F4F4F5!important;font-weight:800!important;opacity:1!important}
        #clearCartBtn{background:#27272A!important;color:#F4F4F5!important;border:1px solid #3F3F46!important;opacity:1!important}

        @media(max-width:768px){
          .orders-root{margin:0;margin-left:-16px;margin-right:-16px;width:calc(100% + 32px);min-width:calc(100% + 32px)}
          .orders-inner{padding:16px 12px 120px;max-width:100vw}
          #recBox{margin-left:-12px;margin-right:-12px;padding-left:12px}
          #recBox > div{padding-right:12px}
          .cart-item img{width:72px;height:72px}
          .discount-row{grid-template-columns:1fr;gap:12px;margin-bottom:18px}
          .kova-mobile-filler{margin-top:20px}
        }

        /* === LIGHT MODE FIXES === */
        [data-theme="light"] .orders-root{ background:#E6DFD3!important; }
        [data-theme="light"] .orders-inner h1{ color:#121214!important; -webkit-text-fill-color:#121214!important; }
        [data-theme="light"] #ordersCount{ color:#57534E!important; }
        [data-theme="light"] .arivie-msg{
          background:linear-gradient(135deg,#C8FF00 0%,#FFE600 60%,#FFB800 100%)!important;
          border-color:#121214!important;
          box-shadow:0 6px 20px rgba(0,0,0,.18)!important;
        }
        [data-theme="light"] .arivie-msg div{ color:#000!important; }
        [data-theme="light"] .arivie-msg div div[style*="color:var(--text-muted)"],
        [data-theme="light"] .arivie-msg div:last-child{ color:rgba(0,0,0,.7)!important; }
        [data-theme="light"] #clearCartBtn{
          background:#FFFFFF!important;
          color:#121214!important;
          border:1px solid #030303!important;
        }
        [data-theme="light"] .t-dot{
          background:#FFFFFF!important;
          color:#121214!important;
          border-color:#121214!important;
          box-shadow:0 1px 4px rgba(0,0,0,.15)!important;
        }
        [data-theme="light"] .t-dot.active{ background:#121214!important; color:#C8FF00!important; }
        [data-theme="light"] .t-line{ background:#D6D3D1!important; }
        [data-theme="light"] .t-line.done{ background:#22C55E!important; }
        [data-theme="light"] #deliveryCard{ background:#1C1C1F!important; border-color:#27272A!important; }


        /* KOVA CHECKOUT LIGHT - FINAL ALL VISIBLE */
[data-theme="light"] #checkoutModal .modal-box{ background:#fff!important; }
[data-theme="light"] #checkoutModal .modal-box > div:first-child div{ color:#121214!important; -webkit-text-fill-color:#121214!important; }

/* X */
[data-theme="light"] #closeCheckoutX{ background:#121214!important; color:#fff!important; border-color:#121214!important; }

/* TOTAL */
[data-theme="light"] #checkoutSummary{ background:#121214!important; border-color:#121214!important; }
[data-theme="light"] #checkoutSummary *{ color:#fff!important; -webkit-text-fill-color:#fff!important; }

/* BOTH PAY - BASE WHITE */
[data-theme="light"] #payCod, [data-theme="light"] #payCard{
  background:#fff!important;
  border:1.5px solid #E7E5E4!important;
}
[data-theme="light"] #payCod div div:first-child, [data-theme="light"] #payCard div div:first-child{ color:#121214!important; -webkit-text-fill-color:#121214!important; }
[data-theme="light"] #payCod div div:last-child, [data-theme="light"] #payCard div div:last-child{ color:#57534E!important; -webkit-text-fill-color:#57534E!important; }

/* SELECTED = FIRE ORANGE */
[data-theme="light"] #payCod[style*="14)"],
[data-theme="light"] #payCard[style*="14)"]{
  border-color:#FF4E1F!important;
  background:#FFF1EC!important;
}
[data-theme="light"] #payCod[style*="14)"] .pay-dot,
[data-theme="light"] #payCard[style*="14)"] .pay-dot{ color:#FF4E1F!important; }

/* MESSAGE */
[data-theme="light"] #checkoutPayBox > div:nth-child(2){ background:#FEF9C3!important; border-color:#FDE68A!important; }
[data-theme="light"] #checkoutPayBox > div:nth-child(2) *{ color:#121214!important; -webkit-text-fill-color:#121214!important; }

/* CANCEL + PLACE */
[data-theme="light"] #closeCheckoutCancel{ background:#F5F5F4!important; border:1px solid #D6D3D1!important; color:#121214!important; -webkit-text-fill-color:#121214!important; }
[data-theme="light"] #confirmOrderBtn{ background:#C8FF00!important; color:#000!important; -webkit-text-fill-color:#000!important; }

    /* ORDER AGAIN WHITE IN BOTH MODES */
.order-card button[onclick*="orderAgain"]{
  background:#fff!important;
  color:#121214!important;
  -webkit-text-fill-color:#121214!important;
  border:1px solid #E7E5E4!important;
}
    
      </style>

      <div class="orders-root">
        <div class="orders-inner">
          <!-- 1. MAP FIRST ON TOP -->
          <div id="deliveryCard" class="cart-section" style="padding:16px;margin-bottom:18px">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <div style="font-weight:900;font-size:14px;display:flex;gap:8px;align-items:center">📍 Delivery Location</div>
              <button id="editLocPen" style="width:32px;height:32px;border-radius:50%;background:var(--bg-app);border:1px solid var(--border);cursor:pointer;font-weight:900">✎</button>
            </div>
            <div id="ordersMap" style="height:160px;border-radius:14px;margin-top:12px;border:1px solid var(--border);z-index:1"></div>
            <div style="margin-top:10px;background:rgba(200,255,0,.12);border:1px solid rgba(200,255,0,.25);border-radius:10px;padding:10px 12px;display:flex;gap:8px;justify-content:space-between;align-items:center">
              <div style="font-size:11.5px;line-height:1.4;color:var(--text-muted)"><span style="font-weight:800;color:var(--text-main)">Your order will be delivered to your set location</span> — would you like to change it?</div>
              <button id="changeLocPen" style="background:var(--accent);color:#000;border:0;padding:6px 12px;border-radius:999px;font-weight:900;font-size:11px;cursor:pointer;white-space:nowrap">✎ Change</button>
            </div>
            <div style="margin-top:14px;display:flex;flex-direction:column;gap:0">
              <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border)"><div style="font-size:11px;color:var(--text-muted)">Address</div><div style="display:flex;gap:8px;align-items:center"><div id="dAddress" style="font-size:12px;font-weight:700;max-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:right">Not set</div><button data-go="settings" style="width:26px;height:26px;border-radius:50%;border:1px solid var(--border);background:var(--bg-app);cursor:pointer">✎</button></div></div>
              <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border)"><div style="font-size:11px;color:var(--text-muted)">Building</div><div style="display:flex;gap:8px;align-items:center"><div id="dBuildingText" style="font-size:12px;font-weight:700">—</div><button data-go="settings" style="width:26px;height:26px;border-radius:50%;border:1px solid var(--border);background:var(--bg-app);cursor:pointer">✎</button></div></div>
              <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border)"><div style="font-size:11px;color:var(--text-muted)">Room / Flat</div><div style="display:flex;gap:8px;align-items:center"><div id="dRoomText" style="font-size:12px;font-weight:700">—</div><button data-go="settings" style="width:26px;height:26px;border-radius:50%;border:1px solid var(--border);background:var(--bg-app);cursor:pointer">✎</button></div></div>
              <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border)"><div style="font-size:11px;color:var(--text-muted)">Landmark</div><div style="display:flex;gap:8px;align-items:center"><div id="dLandmarkText" style="font-size:12px;font-weight:700;max-width:140px;text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">—</div><button data-go="settings" style="width:26px;height:26px;border-radius:50%;border:1px solid var(--border);background:var(--bg-app);cursor:pointer">✎</button></div></div>
              <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border)"><div style="font-size:11px;color:var(--text-muted)">Phone (rider calls)</div><div style="display:flex;gap:8px;align-items:center"><div id="dPhoneText" style="font-size:12px;font-weight:800">—</div><button data-go="settings" style="width:26px;height:26px;border-radius:50%;border:1px solid var(--border);background:var(--bg-app);cursor:pointer">✎</button></div></div>
              <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0"><div style="font-size:11px;color:var(--text-muted)">Email</div><div style="display:flex;gap:8px;align-items:center"><div id="dEmailText" style="font-size:12px;font-weight:700;max-width:140px;overflow:hidden;text-overflow:ellipsis">—</div><button data-go="settings" style="width:26px;height:26px;border-radius:50%;border:1px solid var(--border);background:var(--bg-app);cursor:pointer">✎</button></div></div>
            </div>
          </div>
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

          <!-- 2. CART SECOND -->
          <div id="cartSection"></div>

          <!-- 3. ORDERS TEXTS + YELLOW BAR AFTER CART -->
          <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:18px;margin-top:10px;gap:12px;flex-wrap:wrap">
            <div><h1 style="font-size:28px;font-weight:900;letter-spacing:-1px;margin:0">My Orders <span id="ordersCount" style="font-size:12px;color:var(--text-muted)"></span></h1><p style="color:var(--text-muted);font-size:12.5px;margin-top:5px">Live tracking • Preparing → Ready → On the way → Delivered</p></div>
            <button id="orderMoreBtn" style="background:var(--accent);color:#000;border:0;padding:11px 20px;border-radius:999px;font-weight:900;font-size:12px;cursor:pointer">Order More +</button>
          </div>
          <div id="arivieBox"></div>
          <div id="lastOrderBox"></div>
          <div id="recBox"></div>
          <div id="discountBox"></div>
          <div id="mobileFiller"></div>
          <div id="historySection" style="display:none"><div class="prev-toggle" id="toggleHistory"></div><div id="ordersHistory" style="display:none"></div></div>
          <div id="ordersSkeletonWrap">${ordersSkeleton}</div>
          <div id="ordersList" style="display:none;min-height:200px"></div>
        </div>
      </div>


      <div id="imgModal" class="modal-overlay">
        <div style="position:relative;max-width:90vw;max-height:90vh">
          <img id="imgModalImg" src="" style="max-width:90vw;max-height:80vh;border-radius:18px;object-fit:cover;display:block" />
          <div id="imgModalTitle" style="text-align:center;margin-top:12px;font-weight:900;color:white;font-size:14px"></div>
          <button id="closeImgModalBtn" style="position:absolute;top:-10px;right:-10px;width:34px;height:34px;border-radius:50%;border:0;background:#F4F4F5;color:#000;font-weight:900;cursor:pointer">✕</button>
        </div>
      </div>

      <div id="checkoutModal" class="modal-overlay">
        <div class="modal-box">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
            <div style="font-weight:900;font-size:18px">Checkout</div>
            <button id="closeCheckoutX" style="width:32px;height:32px;border-radius:50%;cursor:pointer;font-weight:900">✕</button>
          </div>
          <div id="checkoutSummary" style="background:var(--bg-app);border:1px solid var(--border);border-radius:14px;padding:12px;margin-bottom:14px"></div>
          <div id="checkoutAuthBox" style="display:none">
            <div style="background:rgba(255,193,7,.12);border:1px solid rgba(255,193,7,.3);border-radius:14px;padding:14px;margin-bottom:12px">
              <div style="font-weight:900">Sign in to continue</div>
              <div style="font-size:12px;color:var(--text-muted);margin-top:4px">Your cart is saved. Sign in to place order.</div>
            </div>
            <button id="goAuthBtn" style="width:100%;background:var(--text-main);color:var(--bg-app);border:0;padding:14px;border-radius:14px;font-weight:900;cursor:pointer">Sign In to Continue</button>
          </div>
          <div id="checkoutPayBox">
            <div style="font-weight:800;font-size:11px;margin-bottom:8px;color:var(--text-muted);letter-spacing:.8px">PAYMENT METHOD</div>
            <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:14px">
              <div id="payCod" data-pay="cod" class="pay-option" style="cursor:pointer;border:1.5px solid #C8FF00;background:rgba(200,255,0,.14);display:flex;gap:10px;align-items:center;padding:12px 14px;border-radius:14px">
  <div style="width:36px;height:36px;border-radius:10px;background:#121214;display:grid;place-items:center">💵</div>
  <div style="flex:1"><div style="font-weight:900;font-size:13px;color:#F4F4F5">Cash on Delivery</div><div style="font-size:11px;color:#A1A1AA">Pay when your order arrives</div></div>
  <div class="pay-dot" style="font-size:16px;color:#C8FF00">●</div>
</div>

<div id="payCard" data-pay="card" class="pay-option" style="cursor:pointer;border:1.5px solid #27272A;background:#0A0A0B;display:flex;gap:10px;align-items:center;padding:12px 14px;border-radius:14px">
  <div style="width:36px;height:36px;border-radius:10px;background:#121214;display:grid;place-items:center">💳</div>
  <div style="flex:1"><div style="font-weight:900;font-size:13px;color:#F4F4F5">Pay by Card</div><div style="font-size:11px;color:#A1A1AA">Fast & secure checkout</div></div>
  <div class="pay-dot" style="font-size:16px;color:#A1A1AA;opacity:.25">○</div>
</div>

            <div style="background:var(--bg-app);border:1px solid var(--border);border-radius:12px;padding:12px;margin-bottom:16px;display:flex;gap:8px;align-items:flex-start">
              <div style="font-size:14px">🔥</div>
              <div style="font-size:11.5px;line-height:1.5;color:var(--text-muted)"><span style="font-weight:800;color:var(--text-main)">Almost there!</span> Your order will be prepared fresh just for you.</div>
            </div>
            <div style="display:flex;gap:10px">
              <button id="closeCheckoutCancel" style="flex:1;padding:13px;border-radius:12px;font-weight:800;cursor:pointer;font-size:13px">Cancel</button>
              <button id="confirmOrderBtn" style="flex:1.6;background:var(--accent);color:#000;border:0;padding:13px;border-radius:12px;font-weight:900;cursor:pointer;font-size:13px">Place Order</button>
            </div>
          </div>
        </div>
      </div>

      <div id="successModal" class="modal-overlay">
        <div class="modal-box" style="text-align:center">
          <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--accent-2));display:grid;place-items:center;margin:0 auto 14px;font-size:28px">🔥</div>
          <div style="font-weight:900;font-size:20px;letter-spacing:-.5px">Your fire is lit — Thank you!</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:8px;line-height:1.6">Order <span id="successOrderId" style="font-weight:900;color:var(--text-main)">#KOVA</span> fired. Track live progress in My Orders.</div>
          <div style="display:flex;gap:8px;margin-top:18px">
            <button id="closeSuccessBrowse" style="flex:1;background:var(--bg-app);border:1px solid var(--border);padding:12px;border-radius:12px;font-weight:800;cursor:pointer">Keep Browsing</button>
            <button id="closeSuccessTrack" style="flex:1.5;background:var(--text-main);color:var(--bg-app);border:0;padding:12px;border-radius:12px;font-weight:900;cursor:pointer">Track Live Progress →</button>
          </div>
        </div>
      </div>
    `;
  },


  async afterRender(){
    const token=localStorage.getItem('kova_token');
    const skelEl=document.getElementById('ordersSkeletonWrap');
    const lastBox=document.getElementById('lastOrderBox');
    const arivieBox=document.getElementById('arivieBox');
    const recBox=document.getElementById('recBox');
    const discountBox=document.getElementById('discountBox');
    const mobileFiller=document.getElementById('mobileFiller');
    const historySec=document.getElementById('historySection');
    const historyEl=document.getElementById('ordersHistory');

    let savedLoc=null; try{savedLoc=JSON.parse(localStorage.getItem('kova_location')||'null')}catch{}
    const setupDelivery = async ()=>{
      let guest=null; try{guest=JSON.parse(localStorage.getItem('kova_guest')||'null')}catch{}
      const setText=(id,val)=>{ const el=document.getElementById(id); if(el) el.textContent=val||'—'; };
      setText('dAddress', savedLoc?.address || 'No location set');
      setText('dBuildingText', savedLoc?.building || 'Not set');
      setText('dRoomText', savedLoc?.room || 'Not set');
      setText('dLandmarkText', savedLoc?.landmark || 'Not set');
      setText('dPhoneText', guest?.phone || savedLoc?.phone || 'Not set');
      setText('dEmailText', guest?.email || savedLoc?.email || 'Not set');
      document.getElementById('editLocPen')?.addEventListener('click',()=> location.hash='#/settings');
      document.getElementById('changeLocPen')?.addEventListener('click',()=> location.hash='#/settings');
      document.querySelectorAll('[data-go="settings"]').forEach(b=> b.addEventListener('click',()=> location.hash='#/settings'));
      const mapEl=document.getElementById('ordersMap'); if(!mapEl) return;
      if(!window.L){
        await new Promise((res,rej)=>{ const s=document.createElement('script'); s.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'; s.onload=res; s.onerror=rej; document.head.appendChild(s); });
      }
      const lat=savedLoc?.lat||25.2048, lng=savedLoc?.lng||55.2708;
      const map=L.map('ordersMap',{zoomControl:false,attributionControl:false}).setView([lat,lng], 14);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
      L.marker([lat,lng]).addTo(map);
      setTimeout(()=> map.invalidateSize(), 300);
    };
    setupDelivery();
       document.getElementById('orderMoreBtn')?.addEventListener('click', ()=>{ location.hash='#/menu'; });


    const wireOrderCards = ()=>{
      document.querySelectorAll('[data-order-again]').forEach(btn=>{ btn.onclick=()=> this.orderAgain(btn.dataset.orderAgain); });
      document.querySelectorAll('.order-item-img').forEach(img=>{ img.onclick=()=> this.openImgModal(img.dataset.img, img.dataset.title); });
    };

    this.renderCartSection();

    // === AUTO-RESUME CHECKOUT AFTER SIGN IN ===
    if(token && localStorage.getItem('kova_pending_checkout')==='1'){
      localStorage.removeItem('kova_pending_checkout');
      setTimeout(()=> this.openCheckoutModal(), 700);
    }

    if(!token){
      if(skelEl) skelEl.style.display='none';
      try{ recBox.innerHTML=await Recommendations.render({title:'Recommended For You',count:6,showDiscount:true}); Recommendations.attachEvents && Recommendations.attachEvents(); }catch(e){ recBox.innerHTML=''; }
      this.renderMobileFiller(mobileFiller); return;
    }
    try{
      const res=await fetch(`${this.WORKER_URL}/api/guest/orders`,{headers:{'Authorization':`Bearer ${token}`}});
      const data=await res.json();
      let orders=(data.orders||[]).sort((a,b)=>new Date(b.created_at)-new Date(a.created_at));
      document.getElementById('ordersCount').textContent=`· ${orders.length}`;
      if(skelEl) skelEl.style.display='none';
      if(orders.length===0){
        lastBox.innerHTML=`<div style="background:var(--bg-card);border:1px dashed var(--border);border-radius:16px;padding:20px;text-align:center;color:var(--text-muted);font-size:13px">No orders yet — recent will appear here</div>`;
        try{ recBox.innerHTML=await Recommendations.render({title:'Start with these',count:8,showDiscount:true}); Recommendations.attachEvents && Recommendations.attachEvents(); }catch{ recBox.innerHTML=''; }
        this.renderMobileFiller(mobileFiller); return;
      }
            const normalize = s => (s||'pending').toLowerCase().replace(/\s+/g,'_');
      const activeOrders = orders.filter(o=>['pending','preparing','ready','on_the_way','out_for_delivery'].includes(normalize(o.status)));
      const active = activeOrders[0]||null;
      let rest = orders.filter(o=>['delivered','done','completed'].includes(normalize(o.status)));

      if(active){
        const st=normalize(active.status);
        const map={
          pending:['✨','We got your order!','Kitchen will start soon'],
          preparing:['👨‍🍳','Preparing','Chef is on it! 15-20 min'],
          ready:['🟢','Ready','Order packed & ready for rider'],
          on_the_way:['🛵','On the way','Rider is coming to you'],
          out_for_delivery:['🛵','On the way','Rider is coming to you'],
          delivered:['⭐','Delivered - Enjoy!','Rate us?'],
          done:['⭐','Delivered - Enjoy!','Rate us?']
        };
        const m=map[st]||map.pending;
        arivieBox.innerHTML=`<div class="arivie-msg"><div style="font-size:26px">${m[0]}</div><div><div style="font-weight:900;font-size:13px">${m[1]}</div><div style="font-size:12px;color:var(--text-muted)">${m[2]}</div></div></div>`;
        lastBox.innerHTML=activeOrders.map(o=>this.cardHTML(o,true)).join('');
      }else{
        arivieBox.innerHTML=''; lastBox.innerHTML='';
      }


      const excludeIds=(()=>{try{return JSON.parse((active||orders[0]).items).map(i=>i.id||i.item_id)}catch{return[]}})();
      try{ recBox.innerHTML=await Recommendations.render({title:'Recommended For You',count:6,excludeIds,showDiscount:false}); Recommendations.attachEvents && Recommendations.attachEvents(); }catch{ recBox.innerHTML=''; }
      discountBox.innerHTML=(()=>{ const all=JSON.parse(localStorage.getItem('kova_menu_cache')||'[]'); const r=all[Math.floor(Math.random()*all.length)]||{image:'',title:'KOVA Special'}; const bg=r.image||r.img||'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600'; const name=r.title||r.name||'KOVA Special'; return `<div class="discount-row"><div style="background:linear-gradient(135deg,var(--accent),var(--accent-2));border-radius:16px;padding:16px;color:#000"><div style="font-weight:900">FLAT 20% OFF</div><div style="font-size:11px;opacity:.85">Above AED 80 • CODE: KOVA20</div></div><div onclick="location.hash='#/menu'" style="position:relative;border-radius:16px;padding:16px;overflow:hidden;border:1px solid var(--border);cursor:pointer;background:url('${bg}') center/cover no-repeat;min-height:68px"><div style="position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.8),rgba(0,0,0,.3))"></div><div style="position:relative;z-index:2"><div style="font-weight:900;font-size:13px;color:white">🔥 Trending</div><div style="font-size:11px;color:rgba(255,255,255,.9)">${name}</div></div></div></div>`; })();
      this.renderMobileFiller(mobileFiller);
      if(rest.length>0){
        historySec.style.display='block';
        const visible=rest.slice(0,2);
        const hidden=rest.slice(2);
        const visibleHTML=visible.map(o=>this.cardHTML(o,false)).join('');
        const hiddenHTML=hidden.length?`<div id="hiddenOrders" style="display:none">${hidden.map(o=>this.cardHTML(o,false)).join('')}</div>`:'';
        historyEl.innerHTML=visibleHTML+hiddenHTML;
        historyEl.style.display='block';
        wireOrderCards();
        const toggle=document.getElementById('toggleHistory');
        if(hidden.length>0){
          toggle.textContent=`Recent Orders (2) • Show ${hidden.length} more`;
          toggle.onclick=()=>{
            const h=document.getElementById('hiddenOrders');
            const isHidden=h.style.display==='none';
            h.style.display=isHidden?'block':'none';
            toggle.textContent=isHidden?`Recent Orders (${rest.length}) • Show less`:`Recent Orders (2) • Show ${hidden.length} more`;
            if(isHidden) setTimeout(wireOrderCards,50);
          };
        }else{
          toggle.textContent=`Recent Orders (${rest.length})`;
          toggle.style.pointerEvents='none';
        }
      }
    }catch(e){ const listEl=document.getElementById('ordersList'); if(listEl){ listEl.innerHTML=`<div style="color:red;padding:20px">Failed: ${e.message}</div>`; listEl.style.display='block'; } }


       window.Orders = this;
    document.querySelectorAll('.viewable-img').forEach(i=> i.style.cursor='zoom-in');

  },



  renderMobileFiller(el){ if(!el) return; el.innerHTML=`<div class="kova-mobile-filler"><div style="background:var(--bg-card);border:1px solid var(--border);border-radius:20px;padding:18px"><div style="display:flex;align-items:center;gap:10px;margin-bottom:10px"><div style="width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,var(--accent),var(--accent-2));display:grid;place-items:center;font-weight:900;color:#000">K</div><div><div style="font-weight:900;font-size:13px">Your ember is safe</div><div style="font-size:11px;color:var(--text-muted)">D1 Synced • No data loss</div></div><div style="margin-left:auto;font-size:10px;background:rgba(34,197,94,.12);color:#22C55E;border:1px solid rgba(34,197,94,.25);padding:4px 8px;border-radius:999px;font-weight:800">● LIVE</div></div><div style="font-size:12px;line-height:1.6;color:var(--text-muted)">Thanks for ordering from KOVA. Every fire starts with one ember.</div></div></div>`; },

   cardHTML(o,featured){
    let items=[]; try{items=typeof o.items==='string'?JSON.parse(o.items):o.items}catch{}
    const date=new Date(o.created_at).toLocaleString('en-AE',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});
    const normalize = s => (s||'pending').toLowerCase().replace(/\s+/g,'_');
    const raw=normalize(o.status);
    const status = raw==='done'?'delivered':raw==='out_for_delivery'?'on_the_way':raw;
    const steps=[
      {key:'preparing', label:'Preparing'},
      {key:'ready', label:'Ready'},
      {key:'on_the_way', label:'On the way'},
      {key:'delivered', label:'Delivered'}
    ];
    const orderMap=['pending','preparing','ready','on_the_way','delivered','done'];
    const curIdx=orderMap.indexOf(status);
    return `<div class="order-card ${featured?'featured':''}"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px"><div style="display:flex;gap:8px;align-items:center"><div style="font-weight:900">#${o.id.slice(0,8).toUpperCase()}</div><span class="status ${status}">${status.replace(/_/g,' ')}</span><span style="font-size:11px;color:var(--text-muted)">• ${date}</span></div><div style="display:flex;gap:8px;align-items:center"><div style="font-weight:900">AED ${Number(o.total).toFixed(2)}</div><button onclick="Orders.orderAgain('${o.id}')" style="background:var(--bg-app);border:1px solid var(--border);padding:6px 12px;border-radius:999px;font-size:11px;font-weight:800;cursor:pointer">Order Again</button></div></div><div class="timeline">${steps.map((s,i)=>{const sIdx=orderMap.indexOf(s.key); const done=sIdx<curIdx, active=sIdx===curIdx; return `<div class="t-dot ${done?'done':''} ${active?'active':''}">${done?'✓':i+1}</div>${i<3?`<div class="t-line ${done?'done':''}"></div>`:''}`}).join('')}</div><div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text-muted);margin-bottom:8px">${steps.map(s=>`<span>${s.label}</span>`).join('')}</div><div style="display:flex;gap:10px;overflow-x:auto;padding:4px 0">${items.map(it=>{ const img=Orders.getItemImg(it); const safeTitle=(it.title||it.name||'Item').replace(/'/g,"&#39;"); return `<div class="order-item"><img src="${img}" data-img="${img}" data-title="${safeTitle}" class="order-item-img viewable-img" style="cursor:zoom-in" onclick="Orders.openImgModal('${img}','${safeTitle}')" alt=""><div><div style="font-weight:700;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:90px">${safeTitle}</div><div style="font-size:10px;color:var(--text-muted)">x${it.qty||1} · AED ${it.price}</div></div></div>` }).join('')}</div>
`;
  },

  async orderAgain(id){
    const token=localStorage.getItem('kova_token');
    const res=await fetch(`${this.WORKER_URL}/api/guest/orders`,{headers:{'Authorization':`Bearer ${token}`}});
    const data=await res.json();
    const order=(data.orders||[]).find(o=>o.id===id);
    let items=[]; try{items=typeof order.items==='string'?JSON.parse(order.items):order.items}catch{}
    localStorage.setItem('kova_cart', JSON.stringify(items.map(i=>({...i,qty:i.qty||1}))));
    window.dispatchEvent(new CustomEvent('kova:cart')); location.hash='#/menu';
  }
};
