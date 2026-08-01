// KOVA Settings - FULL + LIVE MAP + PHOTO EDIT
export const Settings = {
  GUEST_WORKER: 'https://kova-guest-sign-up.dopetone701.workers.dev',

  async render() {
    let guest=null;
    try{ guest=JSON.parse(localStorage.getItem('kova_guest')||'null'); }catch{}
    const theme = localStorage.getItem('kova_theme') || document.documentElement.getAttribute('data-theme') || 'dark';
    let savedLoc = null;
    try{ savedLoc = JSON.parse(localStorage.getItem('kova_location')||'null'); }catch{}

    return `
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <style>
       .st-wrap{max-width:760px;margin:24px auto;padding:0 16px 60px;display:flex;flex-direction:column;gap:16px}
       .st-card{background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:20px}
       .st-h{display:flex;gap:16px;align-items:center}
       .st-av{width:72px;height:72px;border-radius:50%;background:var(--accent);color:#000;display:grid;place-items:center;font-weight:900;font-size:28px;flex-shrink:0;overflow:hidden;position:relative;cursor:pointer;border:2px solid var(--border)}
       .st-av img{width:100%;height:100%;object-fit:cover}
       .st-av.cam{position:absolute;inset:0;background:rgba(0,0,0,.5);display:grid;place-items:center;opacity:0;transition:.2s;color:#fff}
       .st-av:hover.cam{opacity:1}
       .st-row{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid var(--border)}
       .st-row:last-child{border:0}
       .st-lbl{font-size:14px;font-weight:700}
       .st-sub{font-size:12px;color:var(--text-muted);margin-top:2px}
       .st-input{width:100%;background:var(--bg-app);border:1px solid var(--border);border-radius:10px;padding:11px 12px;color:var(--text-main);font-size:13px;outline:0}
       .st-input:focus{border-color:var(--accent-2)}
       .st-btn{background:var(--bg-app);border:1px solid var(--border);color:var(--text-main);padding:9px 14px;border-radius:999px;font-size:13px;font-weight:700;cursor:pointer}
       .st-btn.primary{background:var(--accent);color:#000;border-color:var(--accent)}
       .st-btn.danger{color:#ff5a5a;border-color:rgba(255,90,90,.25)}
       .st-sw{width:44px;height:26px;background:var(--bg-app);border:1px solid var(--border);border-radius:999px;position:relative;cursor:pointer}
       .st-sw.on{background:var(--accent);border-color:var(--accent)}
       .st-sw:after{content:'';position:absolute;top:2px;left:2px;width:20px;height:20px;border-radius:50%;background:#fff;transition:.2s}
       .st-sw.on:after{transform:translateX(18px)}
        #liveMap{height:260px;border-radius:12px;border:1px solid var(--border);z-index:1}
       .loc-badge{display:inline-flex;align-items:center;gap:6px;background:var(--bg-app);border:1px solid var(--border);border-radius:999px;padding:6px 10px;font-size:12px;font-weight:600}
       .loc-dot{width:8px;height:8px;border-radius:50%;background:#22c55e}
       .far-alert{background:rgba(255,193,7,.15);border:1px solid rgba(255,193,7,.4);color:#ffc107;border-radius:12px;padding:12px 14px;font-size:13px;display:flex;gap:10px;align-items:center;justify-content:space-between}
      </style>

      <div class="st-wrap">
        <!-- PROFILE -->
        <div class="st-card">
          <div class="st-h">
            <div class="st-av" id="avatarBox">
              ${guest?.photo_url? `<img id="avImg" src="${guest.photo_url.startsWith('/api/')? `${this.GUEST_WORKER}${guest.photo_url}` : guest.photo_url}" />` : `<span id="avLetter">${(guest?.name||'G').charAt(0).toUpperCase()}</span><img id="avImg" style="display:none" />`}
              <div class="cam"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg></div>
              <input type="file" id="photoInput" accept="image/*" style="display:none" />
            </div>
            <div style="flex:1;min-width:0">
              <div style="font-size:18px;font-weight:900">${guest?.name||'Guest User'}</div>
              <div style="font-size:13px;color:var(--text-muted)">${guest?.email||'Not signed in'}</div>
              <div style="font-size:12px;color:var(--text-muted)">${guest?.phone||''}</div>
              <div style="margin-top:6px;display:flex;gap:6px">
                <span class="loc-badge"><span class="loc-dot"></span> <span id="locText">${savedLoc? `${savedLoc.lat.toFixed(4)}, ${savedLoc.lng.toFixed(4)}` : 'No location set'}</span></span>
              </div>
            </div>
            <button class="st-btn primary" id="editTopBtn">Edit</button>
          </div>
        </div>

        <!-- FAR ALERT -->
        <div id="farAlert" style="display:none" class="far-alert">
          <div><b>📍 You seem far from your set location</b><br><span id="farDist"></span> away. Update for easy delivery?</div>
          <button class="st-btn primary" id="updateFarBtn" style="white-space:nowrap">Update</button>
        </div>

        <!-- LIVE MAP -->
        <div class="st-card">
          <div style="font-weight:900;margin-bottom:4px">Delivery Location</div>
          <div style="font-size:12px;color:var(--text-muted);margin-bottom:12px">Tap map to set location. Auto-detect uses GPS.</div>
          <div id="liveMap"></div>
          <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
            <button class="st-btn primary" id="detectBtn">📍 Detect Automatically</button>
            <button class="st-btn" id="setMapBtn">✓ Use This Pin</button>
            <button class="st-btn" id="clearLocBtn">Clear</button>
            <span id="mapStatus" style="font-size:12px;color:var(--text-muted);align-self:center"></span>
          </div>
          <div style="margin-top:10px">
            <input class="st-input" id="locAddress" placeholder="Address (auto or type) - e.g. Dubai Marina" value="${savedLoc?.address||''}" />
          </div>
        </div>

        <!-- APPEARANCE -->
        <div class="st-card">
          <div style="font-weight:900;margin-bottom:6px">Appearance</div>
          <div class="st-row"><div><div class="st-lbl">Light Mode</div></div><div class="st-sw ${theme==='light'?'on':''}" id="themeSwitch"></div></div>
        </div>

        <!-- ACCOUNT -->
        <div class="st-card">
          <div style="font-weight:900;margin-bottom:12px">Profile</div>
          <div style="display:flex;flex-direction:column;gap:10px">
            <input class="st-input" id="stName" placeholder="Full Name" value="${guest?.name||''}" />
            <input class="st-input" id="stEmail" placeholder="Email" value="${guest?.email||''}" />
            <input class="st-input" id="stPhone" placeholder="Phone" value="${guest?.phone||''}" />
            <div style="display:flex;gap:10px;align-items:center"><button class="st-btn primary" id="saveProfileBtn">Save All (Profile + Location)</button><span id="saveMsg" style="font-size:12px;color:var(--text-muted)"></span></div>
          </div>
        </div>

        <div class="st-card"><div style="display:flex;gap:10px"><button class="st-btn danger" id="logoutBtn" style="flex:1">Logout</button><button class="st-btn danger" id="deleteBtn" style="flex:1;background:rgba(255,90,90,.12)">Delete Account</button></div></div>
        <div style="text-align:center;color:var(--text-muted);font-size:11px">KOVA v1.0 • Live Map • D1 Synced</div>
      </div>
    `;
  },

  async afterRender(){
    const $ = id=>document.getElementById(id);
    let guest=null; try{guest=JSON.parse(localStorage.getItem('kova_guest')||'null')}catch{}
    let savedLoc=null; try{savedLoc=JSON.parse(localStorage.getItem('kova_location')||'null')}catch{}
    let currentPin = savedLoc? {lat:savedLoc.lat,lng:savedLoc.lng} : {lat:25.2048,lng:55.2708}; // Dubai default
    let map, marker;
    let newPhotoBase64 = null;

    // Load Leaflet
    if(!window.L){
      await new Promise((res,rej)=>{
        const s=document.createElement('script'); s.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'; s.onload=res; s.onerror=rej; document.head.appendChild(s);
      });
    }

    // Init Map
    setTimeout(()=>{
      map = L.map('liveMap').setView([currentPin.lat, currentPin.lng], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OSM'}).addTo(map);
      marker = L.marker([currentPin.lat, currentPin.lng], {draggable:true}).addTo(map);
      marker.on('dragend', ()=>{
        const p=marker.getLatLng(); currentPin={lat:p.lat,lng:p.lng}; reverseGeocode(p.lat,p.lng);
      });
      map.on('click', (e)=>{
        currentPin={lat:e.latlng.lat,lng:e.latlng.lng}; marker.setLatLng(e.latlng); reverseGeocode(e.latlng.lat,e.latlng.lng);
      });
      if(savedLoc) $('locAddress').value = savedLoc.address||'';
    },100);

    const reverseGeocode = async(lat,lng)=>{
      try{
        const r=await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const d=await r.json(); const addr=d.display_name||`${lat.toFixed(5)}, ${lng.toFixed(5)}`;
        if($('locAddress')) $('locAddress').value=addr; if($('mapStatus')) $('mapStatus').textContent='Pin updated';
        if($('locText')) $('locText').textContent=`${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      }catch{}
    };

    // PHOTO EDIT
    $('avatarBox')?.addEventListener('click',()=> $('photoInput').click());
    $('photoInput')?.addEventListener('change', (e)=>{
      const file=e.target.files[0]; if(!file) return;
      if(file.size>2*1024*1024){ alert('Max 2MB'); return; }
      const reader=new FileReader();
      reader.onload=()=>{
        newPhotoBase64=reader.result;
        const img=$('avImg'); img.src=newPhotoBase64; img.style.display='block';
        const letter=$('avLetter'); if(letter) letter.style.display='none';
      };
      reader.readAsDataURL(file);
    });

    // DETECT AUTOMATICALLY
    $('detectBtn')?.addEventListener('click', ()=>{
      if(!navigator.geolocation){ alert('GPS not supported'); return; }
      if($('mapStatus')) $('mapStatus').textContent='Detecting...';
      navigator.geolocation.getCurrentPosition(async(pos)=>{
        currentPin={lat:pos.coords.latitude,lng:pos.coords.longitude};
        if(map){ map.setView([currentPin.lat,currentPin.lng],15); marker.setLatLng([currentPin.lat,currentPin.lng]); }
        await reverseGeocode(currentPin.lat,currentPin.lng);
        if($('mapStatus')) $('mapStatus').textContent='Detected ✓';
        checkFarDistance(currentPin);
      },(err)=>{
        if($('mapStatus')) $('mapStatus').textContent='Failed: '+err.message;
      },{enableHighAccuracy:true});
    });

    $('setMapBtn')?.addEventListener('click', ()=>{
      const addr=$('locAddress').value.trim();
      const loc={lat:currentPin.lat,lng:currentPin.lng,address:addr||`${currentPin.lat.toFixed(5)},${currentPin.lng.toFixed(5)}`,updated:Date.now()};
      localStorage.setItem('kova_location', JSON.stringify(loc));
      if($('locText')) $('locText').textContent=`${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)}`;
      if($('mapStatus')) $('mapStatus').textContent='Location saved ✓';
      // hide far alert
      const fa=$('farAlert'); if(fa) fa.style.display='none';
    });

    $('clearLocBtn')?.addEventListener('click', ()=>{
      localStorage.removeItem('kova_location');
      if($('locText')) $('locText').textContent='No location set';
      if($('mapStatus')) $('mapStatus').textContent='Cleared';
    });

    // FAR DISTANCE CHECK
    const haversine = (a,b)=>{
      const R=6371; const dLat=(b.lat-a.lat)*Math.PI/180; const dLng=(b.lng-a.lng)*Math.PI/180;
      const x=Math.sin(dLat/2)**2 + Math.cos(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*Math.sin(dLng/2)**2;
      return 2*R*Math.asin(Math.sqrt(x));
    };
    const checkFarDistance = (current)=>{
      if(!savedLoc) return;
      const dist = haversine(savedLoc, current);
      if(dist>3){ // >3km
        $('farDist').textContent=`${dist.toFixed(1)} km`;
        $('farAlert').style.display='flex';
      }
    };
    // auto check on load with GPS
    if(savedLoc && navigator.geolocation){
      navigator.geolocation.getCurrentPosition(p=>{
        checkFarDistance({lat:p.coords.latitude,lng:p.coords.longitude});
      });
    }

    $('updateFarBtn')?.addEventListener('click', ()=>{
      $('setMapBtn').click();
    });

    // THEME
    $('themeSwitch')?.addEventListener('click', function(){ this.classList.toggle('on'); window.toggleTheme&&window.toggleTheme(); });

    // SAVE PROFILE + LOCATION + PHOTO
    $('saveProfileBtn')?.addEventListener('click', async()=>{
      const name=$('stName').value.trim(), email=$('stEmail').value.trim(), phone=$('stPhone').value.trim();
      const address=$('locAddress').value.trim();
      const loc={lat:currentPin.lat,lng:currentPin.lng,address,updated:Date.now()};
      $('saveMsg').textContent='Saving...';
      try{
        localStorage.setItem('kova_location', JSON.stringify(loc));
        // save guest locally
        let g=guest||{}; g.name=name; g.email=email; g.phone=phone;
        if(newPhotoBase64) g.photo_url=newPhotoBase64; // base64 fallback
        localStorage.setItem('kova_guest', JSON.stringify(g));

        // try D1 + photo upload
        const token=localStorage.getItem('kova_token');
        if(token){
          // upload photo if exists
          let photoUrl=g.photo_url;
          if(newPhotoBase64 && newPhotoBase64.startsWith('data:')){
            try{
              const fd=new FormData();
              const blob=await (await fetch(newPhotoBase64)).blob();
              fd.append('photo', blob, 'avatar.jpg');
              const up=await fetch(this.GUEST_WORKER+'/api/guest/upload-photo',{method:'POST',headers:{'Authorization':'Bearer '+token},body:fd});
              if(up.ok){ const jd=await up.json(); photoUrl=jd.url||jd.photo_url; }
            }catch{}
          }
          const r=await fetch(this.GUEST_WORKER+'/api/guest/update',{
            method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},
            body:JSON.stringify({name,email,phone,photo_url:photoUrl,location:loc})
          });
          if(r.ok){
            const d=await r.json();
            localStorage.setItem('kova_guest', JSON.stringify(d.guest||{...g,photo_url:photoUrl}));
          }
        }
        $('saveMsg').textContent='All saved ✓'; window.Topbar?.render();
        if($('locText')) $('locText').textContent=`${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)}`;
      }catch(e){ $('saveMsg').textContent='Failed: '+e.message; }
    });

    $('logoutBtn')?.addEventListener('click', ()=>{localStorage.removeItem('kova_token');localStorage.removeItem('kova_guest');location.hash='#/auth';location.reload();});
    $('deleteBtn')?.addEventListener('click', async()=>{if(!confirm('Delete permanently?')) return; try{const t=localStorage.getItem('kova_token'); if(t) await fetch(this.GUEST_WORKER+'/api/guest/delete',{method:'POST',headers:{'Authorization':'Bearer '+t}});}catch{} localStorage.clear(); sessionStorage.clear(); location.hash='#/auth'; location.reload();});
  },

  open(){ location.hash='#/settings'; }
};
window.KovaSettings = Settings;
