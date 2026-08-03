// KOVA Auth - Guest + Account (R2 + D1) - Pro mobile no-zoom + Profile
export const Auth = {
  WORKER_URL: 'https://kova-guest-sign-up.dopetone701.workers.dev',

  async render(){
    const token = localStorage.getItem('kova_token');
    const guest = JSON.parse(localStorage.getItem('kova_guest')||'null');
    const isLogged =!!token &&!!guest;

    // IF LOGGED IN -> ACCOUNT PAGE
    if(isLogged){
      return `
      <style>
       .auth-root{
          margin:-24px!important;width:calc(100% + 48px)!important;min-width:calc(100% + 48px);
          min-height:90vh;display:flex;align-items:flex-start;justify-content:center;
          background: radial-gradient(800px at 20% 10%, rgba(200,255,0,0.08), transparent), radial-gradient(600px at 80% 90%, rgba(255,78,31,0.12), transparent), var(--bg-app);
          padding:24px;box-sizing:border-box;
        }
       .acct-wrap{width:100%;max-width:960px;display:grid;grid-template-columns:320px 1fr;gap:20px}
       .acct-card{background:var(--bg-card);border:1px solid var(--border);border-radius:20px;padding:20px;box-sizing:border-box}
       .acct-avatar{width:96px;height:96px;border-radius:50%;overflow:hidden;border:3px solid var(--border);margin:0 auto 12px;background:var(--bg-app);display:grid;place-items:center}
       .acct-avatar img{width:100%;height:100%;object-fit:cover}
       .acct-input{height:44px;width:100%;background:var(--bg-app);border:1px solid var(--border);border-radius:12px;padding:0 14px;color:var(--text-main);font-size:16px!important;outline:0;box-sizing:border-box}
       .acct-input:focus{border-color:var(--accent-2)}
       .acct-btn{height:42px;border-radius:999px;border:0;font-weight:800;font-size:13px;cursor:pointer;padding:0 18px}
       .btn-p{background:var(--accent);color:#000}.btn-g{background:var(--bg-app);border:1px solid var(--border);color:var(--text-main)}
       .order-row{display:flex;gap:12px;align-items:center;padding:12px;border:1px solid var(--border);border-radius:14px;margin-bottom:10px;background:var(--bg-app)}
       .rec-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;margin-top:12px}
       .rec-card{border:1px solid var(--border);border-radius:14px;overflow:hidden;background:var(--bg-card)}
       .rec-card img{width:100%;height:110px;object-fit:cover}
        @media(max-width:900px){.acct-wrap{grid-template-columns:1fr}.auth-root{margin:0!important;margin-left:-16px!important;margin-right:-16px!important;width:calc(100% + 32px)!important;min-width:calc(100% + 32px)!important;padding:16px}}
        /* no zoom fix */
        input, textarea, select { font-size:16px!important; }

        /* LIGHT MODE FIX - card stays dark, so buttons must stay light text */
[data-theme="light"] .auth-tabs{
  background: rgba(0,0,0,0.25) !important;
  border: 1px solid rgba(255,255,255,0.1) !important;
}
[data-theme="light"] .auth-tab{
  color: rgba(255,255,255,0.7) !important; /* Sign Up now visible */
}
[data-theme="light"] .auth-tab.active{
  background: #FFFFFF !important;
  color: #111113 !important; /* Sign In black on white */
}
[data-theme="light"] .btn-ghost{
  background: rgba(255,255,255,0.14) !important;
  border: 1px solid rgba(255,255,255,0.25) !important;
  color: #FFFFFF !important; /* Back to Home now visible */
}



        
      </style>

      <div class="auth-root">
        <div class="acct-wrap">
          <!-- LEFT PROFILE -->
          <div class="acct-card" style="height:fit-content">
            <div class="acct-avatar" id="acctAvatarBox"><img id="acctAvatarImg" src="${guest.photo_url||guest.photo||''}" style="${guest.photo_url||guest.photo?'':'display:none'}" /><span id="acctAvatarFallback" style="${guest.photo_url||guest.photo?'display:none':''};font-size:32px">${(guest.name||'U')[0]}</span></div>
            <div style="text-align:center">
              <div style="font-weight:900;font-size:18px;color:var(--text-main)">${guest.name||'Guest'}</div>
              <div style="font-size:12px;color:var(--text-muted);margin-top:4px">${guest.email}</div>
              <div style="font-size:12px;color:var(--text-muted)">${guest.phone||''}</div>
            </div>
            <div style="margin-top:16px;display:grid;gap:10px">
              <div><label style="font-size:10px;color:var(--text-muted);font-weight:700;letter-spacing:1px">FULL NAME</label><input id="editName" class="acct-input" value="${guest.name||''}" /></div>
              <div><label style="font-size:10px;color:var(--text-muted);font-weight:700;letter-spacing:1px">CHANGE PHOTO</label><input id="editPhoto" type="file" accept="image/*" class="acct-input" style="padding:8px" /></div>
              <button id="saveProfileBtn" class="acct-btn btn-p" style="width:100%">Save Changes → R2 + D1</button>
              <button id="logoutBtn" class="acct-btn btn-g" style="width:100%">Sign Out</button>
            </div>
            <div id="acctMsg" style="display:none;margin-top:10px;padding:8px 10px;border-radius:10px;font-size:12px"></div>
          </div>

          <!-- RIGHT ORDERS + RECS -->
          <div style="display:grid;gap:20px">
            <div class="acct-card">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
                <div style="font-weight:800;font-size:16px">Previous Orders</div>
                <div style="font-size:11px;color:var(--text-muted)" id="ordersCount">loading...</div>
              </div>
              <div id="ordersList"><div style="color:var(--text-muted);font-size:13px">Loading your fire...</div></div>
            </div>

            <div class="acct-card">
              <div style="font-weight:800;font-size:16px;margin-bottom:4px">Recommended for you</div>
              <div style="font-size:12px;color:var(--text-muted)">Based on your taste — 900°C stone</div>
              <div class="rec-grid" id="recGrid"></div>
            </div>
          </div>
        </div>
      </div>`;
    }

    // NOT LOGGED -> SIGNIN/UP (no-zoom version)
    return `
      <style>
       .auth-root{
          margin:-24px!important;width:calc(100% + 48px)!important;min-width:calc(100% + 48px);min-height:90vh;
          display:flex;align-items:center;justify-content:center;
          background: radial-gradient(800px at 20% 10%, rgba(200,255,0,0.08), transparent), radial-gradient(600px at 80% 90%, rgba(255,78,31,0.12), transparent), var(--bg-app);
          padding:24px;box-sizing:border-box;
        }
       .auth-card{width:100%;max-width:440px;background:var(--bg-card);border:1px solid var(--border);border-radius:20px;padding:28px;box-sizing:border-box;box-shadow:0 20px 60px rgba(0,0,0,0.4)}
       .auth-tabs{display:flex;gap:8px;margin-bottom:20px;background:var(--bg-app);padding:4px;border-radius:999px;border:1px solid var(--border)}
       .auth-tab{flex:1;padding:10px;border-radius:999px;border:0;background:transparent;color:var(--text-muted);font-weight:700;font-size:13px;cursor:pointer}
       .auth-tab.active{background:var(--text-main);color:var(--bg-app)}
       .auth-field{display:flex;flex-direction:column;gap:6px;margin-bottom:14px}
       .auth-field label{font-size:11px;letter-spacing:1px;color:var(--text-muted);font-weight:700}
       .auth-field input{height:44px;background:var(--bg-app);border:1px solid var(--border);border-radius:12px;padding:0 14px;color:var(--text-main);font-size:16px!important;outline:0;width:100%;box-sizing:border-box;-webkit-appearance:none}
       .auth-field input:focus{border-color:var(--accent-2);box-shadow:0 0 0 3px rgba(255,78,31,0.12)}
       .pass-wrap{position:relative;display:flex;align-items:center}
       .pass-wrap input{padding-right:44px!important}
       .eye-btn{position:absolute;right:6px;top:50%;transform:translateY(-50%);width:32px;height:32px;border-radius:8px;border:0;background:transparent;display:grid;place-items:center;cursor:pointer;font-size:16px;color:var(--text-muted)}
       .auth-btn{width:100%;height:46px;border-radius:999px;border:0;font-weight:800;font-size:14px;cursor:pointer}
       .btn-primary{background:var(--accent);color:#000}
       .btn-ghost{background:var(--bg-app);border:1px solid var(--border);color:var(--text-main);margin-top:8px}
       .avatar-preview{width:80px;height:80px;border-radius:50%;background:var(--bg-app);border:2px dashed var(--border);display:grid;place-items:center;overflow:hidden;margin:0 auto 12px;cursor:pointer}
       .avatar-preview img{width:100%;height:100%;object-fit:cover}
       .auth-error{background:rgba(255,78,31,0.12);border:1px solid rgba(255,78,31,0.3);color:var(--accent-2);padding:10px 12px;border-radius:10px;font-size:12px;margin-bottom:12px;display:none}
       .auth-success{background:rgba(200,255,0,0.12);border:1px solid rgba(200,255,0,0.3);color:var(--accent);padding:10px 12px;border-radius:10px;font-size:12px;margin-bottom:12px;display:none}
        @media(max-width:768px){
         .auth-root{margin:0!important;margin-left:-16px!important;margin-right:-16px!important;width:calc(100% + 32px)!important;min-width:calc(100% + 32px)!important;min-height:85vh;padding:16px}
         .auth-card{padding:20px;border-radius:16px}
        }
        input, textarea { font-size:16px!important; }

        .auth-card{width:100%;max-width:440px;background:#12131A !important;border:1px solid rgba(255,255,255,0.1) !important;border-radius:20px;padding:28px;box-sizing:border-box;box-shadow:0 20px 60px rgba(0,0,0,0.4)}
.auth-tabs{display:flex;gap:8px;margin-bottom:20px;background:#1E1F28 !important;padding:4px;border-radius:999px;border:1px solid rgba(255,255,255,0.08) !important}
.auth-tab{flex:1;padding:10px;border-radius:999px;border:0;background:transparent !important;color:rgba(255,255,255,0.6) !important;font-weight:700;font-size:13px;cursor:pointer}
.auth-tab.active{background:#FFFFFF !important;color:#000000 !important}
.btn-ghost{background:#252631 !important;border:1px solid rgba(255,255,255,0.15) !important;color:#FFFFFF !important;margin-top:8px}

      </style>

      <div class="auth-root">
        <div class="auth-card">
          <div style="text-align:center;margin-bottom:18px">
            <div style="font-family:Syne;font-weight:900;font-size:28px;letter-spacing:-1px;color:#fff">K<span style="color:var(--accent)">O</span>VA</div>
            <div class="ar" style="font-size:11px;color:var(--text-muted);margin-top:4px">دخول الضيوف — مطبخ الجمر</div>
            <div style="font-size:12px;color:var(--text-muted);margin-top:8px">Your cart travels with you</div>
          </div>
          <div class="auth-tabs"><button class="auth-tab active" data-tab="signin">Sign In</button><button class="auth-tab" data-tab="signup">Sign Up</button></div>
          <div id="authError" class="auth-error"></div><div id="authSuccess" class="auth-success"></div>
          <form id="signinForm">
            <div class="auth-field"><label>Email</label><input type="email" name="email" required placeholder="you@example.com" inputmode="email" autocomplete="email" /></div>
            <div class="auth-field"><label>Password</label><div class="pass-wrap"><input type="password" id="signinPass" name="password" required placeholder="••••••••" autocomplete="current-password" /><button type="button" class="eye-btn" data-eye="signinPass">👁️</button></div></div>
            <button type="submit" class="auth-btn btn-primary" id="signinBtn">Sign In →</button>
          </form>
          <form id="signupForm" style="display:none">
            <div class="avatar-preview" id="avatarPreview" onclick="document.getElementById('photoInput').click()"><span style="font-size:24px">📸</span><img id="avatarImg" style="display:none" /></div>
            <input type="file" id="photoInput" name="photo" accept="image/*" style="display:none" />
            <div class="auth-field"><label>Full Name *</label><input type="text" name="name" required placeholder="Ahmed Al Maktoum" autocomplete="name" /></div>
            <div class="auth-field"><label>Email *</label><input type="email" name="email" required placeholder="you@example.com" inputmode="email" autocomplete="email" /></div>
            <div class="auth-field"><label>Phone *</label><input type="tel" name="phone" required placeholder="+971 50 123 4567" inputmode="tel" autocomplete="tel" /></div>
            <div class="auth-field"><label>Password *</label><div class="pass-wrap"><input type="password" id="signupPass" name="password" required placeholder="••••••••" autocomplete="new-password" /><button type="button" class="eye-btn" data-eye="signupPass">👁️</button></div></div>
            <button type="submit" class="auth-btn btn-primary" id="signupBtn">Create Account →</button>
          </form>
          <button class="auth-btn btn-ghost" onclick="location.hash='#/'">← Back to Home</button>
        </div>
      </div>
    `;
  },

  async afterRender(){
    const token = localStorage.getItem('kova_token');
    const guest = JSON.parse(localStorage.getItem('kova_guest')||'null');
    const isLogged =!!token &&!!guest;

    if(isLogged){
      // --- ACCOUNT MODE ---
      const ordersList = document.getElementById('ordersList');
      const ordersCount = document.getElementById('ordersCount');
      const recGrid = document.getElementById('recGrid');
      const saveBtn = document.getElementById('saveProfileBtn');
      const msgEl = document.getElementById('acctMsg');

      const showMsg = (t,ok=false)=>{
        msgEl.textContent=t; msgEl.style.display='block';
        msgEl.style.background= ok?'rgba(200,255,0,0.12)':'rgba(255,78,31,0.12)';
        msgEl.style.color= ok?'var(--accent)':'var(--accent-2)';
        msgEl.style.border=`1px solid ${ok?'rgba(200,255,0,0.3)':'rgba(255,78,31,0.3)'}`;
      };

      // Load orders from worker + local fallback
      try{
        const res = await fetch(`${this.WORKER_URL}/api/guest/orders`, { headers:{ Authorization:`Bearer ${token}` }});
        let orders = [];
        if(res.ok){ const j=await res.json(); orders=j.orders||[]; }
        else { orders = JSON.parse(localStorage.getItem('kova_orders')||'[]'); }

        if(!orders.length){ ordersList.innerHTML = `<div style="color:var(--text-muted);font-size:13px;padding:12px;border:1px dashed var(--border);border-radius:12px">No orders yet — go taste the fire 🔥</div>`; ordersCount.textContent='0 orders'; }
        else {
          ordersCount.textContent = `${orders.length} orders`;
          ordersList.innerHTML = orders.slice(0,6).map(o=>`
            <div class="order-row">
              <div style="flex:1">
                <div style="font-weight:700;font-size:13px">${o.id||o.order_id||'KOVA-'+Math.random().toString(36).slice(2,6).toUpperCase()} • ${(o.items?.length||1)} items</div>
                <div style="font-size:11px;color:var(--text-muted)">${o.created_at||o.date||'Recent'} • AED ${o.total||o.amount||'--'}</div>
              </div>
              <button class="acct-btn btn-p" onclick="window.KOVA_reorder && window.KOVA_reorder('${o.id||''}')">Order Again</button>
            </div>`).join('');
        }
      }catch(e){
        const localOrders = JSON.parse(localStorage.getItem('kova_orders')||'[]');
        ordersList.innerHTML = localOrders.length? localOrders.map(o=>`<div class="order-row"><div style="flex:1"><div style="font-weight:700;font-size:13px">${o.id}</div><div style="font-size:11px;color:var(--text-muted)">${o.date}</div></div><button class="acct-btn btn-p" onclick="localStorage.setItem('kova_cart', JSON.stringify(${JSON.stringify(o.items||[]).replace(/"/g,'&quot;')})); location.hash='#/orders';">Order Again</button></div>`).join('') : `<div style="color:var(--text-muted);font-size:13px">No orders yet</div>`;
        ordersCount.textContent = `${localOrders.length} orders`;
      }

      // Recommended - pull from menu localStorage or hardcoded best sellers
      const best = [
        {id:'lamb', title:'14h Lamb Shoulder', price:145, image:'https://images.unsplash.com/photo-1546964053-d2934cd8d78a?q=80&w=400'},
        {id:'cheese', title:'Pulled Cheese Manakeesh', price:38, image:'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400'},
        {id:'yuzu', title:'Yuzu Cured Hamachi', price:72, image:'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=400'},
      ];
      recGrid.innerHTML = best.map(b=>`
        <div class="rec-card">
          <img src="${b.image}" loading="lazy" />
          <div style="padding:10px"><div style="font-weight:700;font-size:13px">${b.title}</div><div style="font-size:11px;color:var(--text-muted)">AED ${b.price}</div><button class="acct-btn btn-p" style="width:100%;margin-top:8px;height:34px" onclick="const c=JSON.parse(localStorage.getItem('kova_cart')||'[]'); c.push({id:'${b.id}', title:'${b.title}', price:${b.price}, image:'${b.image}', qty:1}); localStorage.setItem('kova_cart', JSON.stringify(c)); location.hash='#/orders';">Add</button></div>
        </div>`).join('');

      document.getElementById('logoutBtn')?.addEventListener('click',()=>{
        localStorage.removeItem('kova_token'); localStorage.removeItem('kova_guest');
        localStorage.removeItem('kova_is_admin'); location.hash='#/'; location.reload();
      });

      saveBtn?.addEventListener('click', async()=>{
        const newName = document.getElementById('editName').value.trim();
        const file = document.getElementById('editPhoto').files?.[0];
        if(!newName) return showMsg('Name required');
        saveBtn.disabled=true; saveBtn.textContent='Saving...';
        try{
          const fd = new FormData();
          fd.append('name', newName);
          if(file) fd.append('photo', file);
          const res = await fetch(`${this.WORKER_URL}/api/guest/profile`, { method:'POST', headers:{ Authorization:`Bearer ${token}` }, body: fd });
          const data = await res.json();
          if(!res.ok) throw new Error(data.error||'Failed');
          localStorage.setItem('kova_guest', JSON.stringify(data.guest));
          showMsg('Profile updated! Photo saved to R2 ✅', true);
          setTimeout(()=> location.reload(), 800);
        }catch(e){ showMsg(e.message); }
        finally{ saveBtn.disabled=false; saveBtn.textContent='Save Changes → R2 + D1'; }
      });

      window.KOVA_reorder = (id)=>{
        // simple: copy last cart to cart
        const last = JSON.parse(localStorage.getItem('kova_orders')||'[]').find(o=>o.id===id);
        if(last){ localStorage.setItem('kova_cart', JSON.stringify(last.items||[])); location.hash='#/orders'; }
        else { showMsg('Re-order saved to cart', true); location.hash='#/orders'; }
      };
      return;
    }

    // --- AUTH MODE (not logged) ---
    const signinForm = document.getElementById('signinForm');
    const signupForm = document.getElementById('signupForm');
    const tabs = document.querySelectorAll('.auth-tab');
    const errEl = document.getElementById('authError');
    const okEl = document.getElementById('authSuccess');
    const showErr = (m)=>{ errEl.textContent=m; errEl.style.display='block'; okEl.style.display='none'; };
    const showOk = (m)=>{ okEl.textContent=m; okEl.style.display='block'; errEl.style.display='none'; };

    document.querySelectorAll('.eye-btn').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const input = document.getElementById(btn.dataset.eye);
        if(!input) return;
        const isPass = input.type === 'password';
        input.type = isPass? 'text':'password';
        btn.textContent = isPass? '🙈':'👁️';
      });
    });

    tabs.forEach(t=> t.addEventListener('click',()=>{
      tabs.forEach(x=>x.classList.remove('active')); t.classList.add('active');
      const tab=t.dataset.tab;
      signinForm.style.display = tab==='signin'?'block':'none';
      signupForm.style.display = tab==='signup'?'block':'none';
      errEl.style.display='none'; okEl.style.display='none';
    }));

    const avatarInput = document.getElementById('photoInput');
    avatarInput?.addEventListener('change',()=>{
      const f=avatarInput.files?.[0]; if(!f) return;
      const r=new FileReader(); r.onload=()=>{ const img=document.getElementById('avatarImg'); img.src=r.result; img.style.display='block'; document.querySelector('#avatarPreview span').style.display='none'; }; r.readAsDataURL(f);
    });

    const syncToServer = async (token)=>{
      try{
        const localCart = JSON.parse(localStorage.getItem('kova_cart')||'[]');
        const localWish = JSON.parse(localStorage.getItem('kova_wish')||'[]');
        if(localCart.length) await fetch(`${this.WORKER_URL}/api/guest/cart/merge`, {method:'POST', headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`}, body: JSON.stringify({items: localCart.map(c=>({item_id:c.id,title:c.title||c.name,price:c.price,image:c.image,qty:c.qty||1}))})});
        if(localWish.length) await fetch(`${this.WORKER_URL}/api/guest/wishlist/merge`, {method:'POST', headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`}, body: JSON.stringify({items: localWish.map(w=>({item_id:w.id,title:w.title||w.name,price:w.price,image:w.image}))})});
      }catch(e){}
    };

    signinForm?.addEventListener('submit', async(e)=>{
      e.preventDefault();
      const btn=document.getElementById('signinBtn'); btn.disabled=true; btn.textContent='Signing in...';
      try{
        const fd=new FormData(signinForm);
        const res=await fetch(`${this.WORKER_URL}/api/guest/signin`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email:fd.get('email'), password:fd.get('password')})});
        const data=await res.json(); if(!res.ok) throw new Error(data.error||'Failed');
        localStorage.setItem('kova_token', data.token); localStorage.setItem('kova_guest', JSON.stringify(data.guest));
        localStorage.setItem('kova_is_admin', data.guest.is_admin?'1':'0');
        await syncToServer(data.token);
        showOk(`Welcome ${data.guest.name}!`); setTimeout(()=>{ location.hash='#/'; location.reload(); }, 700);
      }catch(err){ showErr(err.message); } finally{ btn.disabled=false; btn.textContent='Sign In →'; }
    });

    signupForm?.addEventListener('submit', async(e)=>{
      e.preventDefault();
      const btn=document.getElementById('signupBtn'); btn.disabled=true; btn.textContent='Creating...';
      try{
        const fd=new FormData(signupForm);
        const res=await fetch(`${this.WORKER_URL}/api/guest/signup`, {method:'POST', body: fd});
        const data=await res.json(); if(!res.ok) throw new Error(data.error||'Signup failed');
        localStorage.setItem('kova_token', data.token); localStorage.setItem('kova_guest', JSON.stringify(data.guest));
        await syncToServer(data.token);
        showOk(`Welcome ${data.guest.name}!`); setTimeout(()=>{ location.hash='#/'; location.reload(); }, 900);
      }catch(err){ showErr(err.message); } finally{ btn.disabled=false; btn.textContent='Create Account →'; }
    });
  }
};
