// KOVA Auth - Guest Sign In / Sign Up with photo upload to R2
export const Auth = {
  WORKER_URL: 'https://kova-guest-sign-up.dopetone701.workers.dev',

  async render(){
    return `
      <style>
        .auth-root{
          margin:-24px !important;
          width:calc(100% + 48px) !important;
          min-width:calc(100% + 48px);
          min-height:90vh;
          display:flex;
          align-items:center;
          justify-content:center;
          background: radial-gradient(800px at 20% 10%, rgba(200,255,0,0.08), transparent), radial-gradient(600px at 80% 90%, rgba(255,78,31,0.12), transparent), var(--bg-app);
          padding:24px;
          box-sizing:border-box;
        }
        .auth-card{
          width:100%;
          max-width:440px;
          background:var(--bg-card);
          border:1px solid var(--border);
          border-radius:20px;
          padding:28px;
          box-sizing:border-box;
          box-shadow:0 20px 60px rgba(0,0,0,0.4);
        }
        .auth-tabs{display:flex;gap:8px;margin-bottom:20px;background:var(--bg-app);padding:4px;border-radius:999px;border:1px solid var(--border)}
        .auth-tab{flex:1;padding:10px;border-radius:999px;border:0;background:transparent;color:var(--text-muted);font-weight:700;font-size:13px;cursor:pointer;transition:.2s}
        .auth-tab.active{background:var(--text-main);color:var(--bg-app)}
        .auth-field{display:flex;flex-direction:column;gap:6px;margin-bottom:14px}
        .auth-field label{font-size:11px;letter-spacing:1px;color:var(--text-muted);font-weight:700}
        .auth-field input{height:44px;background:var(--bg-app);border:1px solid var(--border);border-radius:12px;padding:0 14px;color:var(--text-main);font-size:14px;outline:0;transition:.2s}
        .auth-field input:focus{border-color:var(--accent-2);box-shadow:0 0 0 3px rgba(255,78,31,0.15)}
        .auth-btn{width:100%;height:46px;border-radius:999px;border:0;font-weight:800;font-size:14px;cursor:pointer;transition:.2s}
        .btn-primary{background:var(--accent);color:#000}
        .btn-primary:hover{background:var(--accent-2);color:#fff}
        .btn-ghost{background:var(--bg-app);border:1px solid var(--border);color:var(--text-main);margin-top:8px}
        .avatar-preview{width:80px;height:80px;border-radius:50%;background:var(--bg-app);border:2px dashed var(--border);display:grid;place-items:center;overflow:hidden;margin:0 auto 12px;cursor:pointer;position:relative}
        .avatar-preview img{width:100%;height:100%;object-fit:cover}
        .auth-error{background:rgba(255,78,31,0.12);border:1px solid rgba(255,78,31,0.3);color:var(--accent-2);padding:10px 12px;border-radius:10px;font-size:12px;margin-bottom:12px;display:none}
        .auth-success{background:rgba(200,255,0,0.12);border:1px solid rgba(200,255,0,0.3);color:var(--accent);padding:10px 12px;border-radius:10px;font-size:12px;margin-bottom:12px;display:none}
        @media(max-width:768px){
          .auth-root{margin:0 !important;margin-left:-16px !important;margin-right:-16px !important;width:calc(100% + 32px) !important;min-width:calc(100% + 32px) !important;min-height:85vh;padding:16px}
          .auth-card{padding:20px;border-radius:16px}
        }
      </style>

      <div class="auth-root">
        <div class="auth-card">
          <div style="text-align:center;margin-bottom:18px">
            <div style="font-family:Syne;font-weight:900;font-size:28px;letter-spacing:-1px;color:#fff">K<span style="color:var(--accent)">O</span>VA</div>
            <div class="ar" style="font-size:11px;color:var(--text-muted);margin-top:4px">Ø¯Ø®ÙˆÙ„ Ø§Ù„Ø¶ÙŠÙˆÙ â€” Ù…Ø·Ø¨Ø® Ø§Ù„Ø¬Ù…Ø±</div>
            <div style="font-size:12px;color:var(--text-muted);margin-top:8px">Your cart & wishlist travel with you â€” even if you change phone</div>
          </div>

          <div class="auth-tabs">
            <button class="auth-tab active" data-tab="signin">Sign In</button>
            <button class="auth-tab" data-tab="signup">Sign Up</button>
          </div>

          <div id="authError" class="auth-error"></div>
          <div id="authSuccess" class="auth-success"></div>

          <!-- SIGN IN -->
          <form id="signinForm">
            <div class="auth-field"><label>Email</label><input type="email" name="email" required placeholder="you@example.com" /></div>
            <div class="auth-field"><label>Password</label><input type="password" name="password" required placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" /></div>
            <button type="submit" class="auth-btn btn-primary" id="signinBtn">Sign In â†’</button>
            <div style="text-align:center;margin-top:10px;font-size:11px;color:var(--text-muted)">Admin email: dopetone701@gmail.com unlocks Staff & Admin</div>
          </form>

          <!-- SIGN UP -->
          <form id="signupForm" style="display:none">
            <div class="avatar-preview" id="avatarPreview" onclick="document.getElementById('photoInput').click()">
              <span style="font-size:24px">ðŸ“¸</span>
              <img id="avatarImg" style="display:none" />
            </div>
            <input type="file" id="photoInput" name="photo" accept="image/*" style="display:none" />
            <div style="text-align:center;font-size:11px;color:var(--text-muted);margin-bottom:12px">Tap to upload photo (saved to R2)</div>

            <div class="auth-field"><label>Full Name *</label><input type="text" name="name" required placeholder="Ahmed Al Maktoum" /></div>
            <div class="auth-field"><label>Email *</label><input type="email" name="email" required placeholder="you@example.com" /></div>
            <div class="auth-field"><label>Phone Number *</label><input type="tel" name="phone" required placeholder="+971 50 123 4567" /></div>
            <div class="auth-field"><label>Password * (min 6)</label><input type="password" name="password" required placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" /></div>
            <button type="submit" class="auth-btn btn-primary" id="signupBtn">Create Account & Save to D1 â†’</button>
          </form>

          <button class="auth-btn btn-ghost" onclick="location.hash='#/'">â† Back to Home</button>
        </div>
      </div>
    `;
  },

  async afterRender(){
    const signinForm = document.getElementById('signinForm');
    const signupForm = document.getElementById('signupForm');
    const tabs = document.querySelectorAll('.auth-tab');
    const errEl = document.getElementById('authError');
    const okEl = document.getElementById('authSuccess');
    const avatarInput = document.getElementById('photoInput');
    const avatarImg = document.getElementById('avatarImg');
    const avatarPreview = document.getElementById('avatarPreview');

    const showErr = (m)=>{ errEl.textContent=m; errEl.style.display='block'; okEl.style.display='none'; };
    const showOk = (m)=>{ okEl.textContent=m; okEl.style.display='block'; errEl.style.display='none'; };

    tabs.forEach(t=>{
      t.addEventListener('click',()=>{
        tabs.forEach(x=>x.classList.remove('active'));
        t.classList.add('active');
        const tab = t.dataset.tab;
        if(tab==='signin'){ signinForm.style.display='block'; signupForm.style.display='none'; }
        else { signinForm.style.display='none'; signupForm.style.display='block'; }
        errEl.style.display='none'; okEl.style.display='none';
      });
    });

    avatarInput?.addEventListener('change',()=>{
      const f = avatarInput.files?.[0];
      if(!f) return;
      const reader = new FileReader();
      reader.onload = ()=>{ avatarImg.src = reader.result; avatarImg.style.display='block'; avatarPreview.querySelector('span').style.display='none'; };
      reader.readAsDataURL(f);
    });

    const syncToServer = async (token)=>{
      // Merge local cart/wish to server so nothing lost across devices
      try{
        const localCart = JSON.parse(localStorage.getItem('kova_cart')||'[]');
        const localWish = JSON.parse(localStorage.getItem('kova_wish')||'[]');
        if(localCart.length){
          await fetch(`${this.WORKER_URL}/api/guest/cart/merge`, {method:'POST', headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`}, body: JSON.stringify({items: localCart.map(c=>({item_id: c.id, title: c.title||c.name, price: c.price, image: c.image, qty: c.qty||1}))})});
        }
        if(localWish.length){
          await fetch(`${this.WORKER_URL}/api/guest/wishlist/merge`, {method:'POST', headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`}, body: JSON.stringify({items: localWish.map(w=>({item_id: w.id, title: w.title||w.name, price: w.price, image: w.image}))})});
        }
      }catch(e){ console.warn('Merge failed', e); }
    };

    signinForm?.addEventListener('submit', async(e)=>{
      e.preventDefault();
      const btn = document.getElementById('signinBtn');
      btn.disabled=true; btn.textContent='Signing in...';
      try{
        const fd = new FormData(signinForm);
        const res = await fetch(`${this.WORKER_URL}/api/guest/signin`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email: fd.get('email'), password: fd.get('password')})});
        const data = await res.json();
        if(!res.ok) throw new Error(data.error||'Failed');
        localStorage.setItem('kova_token', data.token);
        localStorage.setItem('kova_guest', JSON.stringify(data.guest));
        localStorage.setItem('kova_is_admin', data.guest.is_admin?'1':'0');
        if(data.guest.is_admin) localStorage.setItem('kova_admin_email', data.guest.email);
        await syncToServer(data.token);
        showOk(`Welcome ${data.guest.name}! Loading your cart & wishlist...`);
        setTimeout(()=>{ location.hash='#/'; window.location.reload(); }, 900);
      }catch(err){ showErr(err.message); }
      finally{ btn.disabled=false; btn.textContent='Sign In â†’'; }
    });

    signupForm?.addEventListener('submit', async(e)=>{
      e.preventDefault();
      const btn = document.getElementById('signupBtn');
      btn.disabled=true; btn.textContent='Creating...';
      try{
        const fd = new FormData(signupForm);
        const res = await fetch(`${this.WORKER_URL}/api/guest/signup`, {method:'POST', body: fd});
        const data = await res.json();
        if(!res.ok) throw new Error(data.error||'Signup failed');
        localStorage.setItem('kova_token', data.token);
        localStorage.setItem('kova_guest', JSON.stringify(data.guest));
        localStorage.setItem('kova_is_admin', data.guest.is_admin?'1':'0');
        if(data.guest.is_admin) localStorage.setItem('kova_admin_email', data.guest.email);
        await syncToServer(data.token);
        showOk(`Account created! Welcome ${data.guest.name}. Your photo saved to R2, data to D1.`);
        setTimeout(()=>{ location.hash='#/'; window.location.reload(); }, 1200);
      }catch(err){ showErr(err.message); }
      finally{ btn.disabled=false; btn.textContent='Create Account & Save to D1 â†’'; }
    });
  }
};