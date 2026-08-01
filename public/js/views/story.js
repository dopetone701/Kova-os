// KOVA - Our Story View - OWNER EDITION - FINAL - REAL ICONS + EP LOGO + DT LOGO
export const Story = {
  async render() {
    return `
      <style>
        .kova-story-root{margin:-24px !important;width:calc(100% + 48px) !important;min-width:calc(100% + 48px);background:var(--bg-app);box-sizing:border-box;overflow-x:clip;touch-action:pan-y}
        .story-inner{max-width:1100px;margin:0 auto;padding-left:40px;padding-right:40px;box-sizing:border-box;width:100%}
        .story-content-wrap{padding:70px 40px 110px 40px}
        .story-card{background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:20px;transition:border-color .2s}
        .story-card:hover{border-color:var(--accent-2)}
        .story-card.flame{border-left:3px solid var(--accent-2)}
        .story-card.smoke{border-left:3px solid var(--text-muted)}
        .story-card.stone{border-left:3px solid var(--text-main)}
        .mobile-kova{display:none}
        .pc-kova-closed{display:none;position:absolute;top:32px;left:50%;transform:translateX(-50%);z-index:5;text-align:center;flex-direction:column;align-items:center}
        .pc-kova-closed .logo{font-family:'Syne',sans-serif;font-weight:900;font-size:52px;letter-spacing:-2px;line-height:1;color:#fff}
        .pc-kova-closed .logo .o-green{color:var(--accent) !important}
        .pc-kova-closed .sub{font-size:12px;font-weight:500;margin-top:8px;letter-spacing:0.5px;color:rgba(255,255,255,0.7);white-space:nowrap}
        body.sidebar-collapsed .pc-kova-closed{display:flex !important}
        .social-btn{width:40px;height:40px;border-radius:12px;background:var(--bg-app);border:1px solid var(--border);display:grid;place-items:center;transition:.2s;text-decoration:none;flex-shrink:0}
        .social-btn:hover{transform:translateY(-2px);border-color:var(--accent)}
        .social-btn svg{width:18px;height:18px;fill:var(--text-main)}
        @media (max-width: 768px) {
          html, body {overflow-x:hidden !important;max-width:100vw !important;position:relative !important;overscroll-behavior-x:none !important;touch-action:pan-y !important}
          #app {overflow-x:hidden !important;overscroll-behavior-x:none !important;touch-action:pan-y !important}
          .kova-story-root{margin:0 !important;margin-left:-16px !important;margin-right:-16px !important;margin-top:-16px !important;width:calc(100% + 32px) !important;min-width:calc(100% + 32px) !important;max-width:calc(100% + 32px) !important;overflow-x:clip !important}
          .story-hero{height:62vh !important;min-height:420px !important;padding:24px 20px !important;border-radius:0 0 16px 16px !important;width:100% !important;box-sizing:border-box !important}
          .story-hero h1{font-size:36px !important;letter-spacing:-1.5px !important;line-height:0.95 !important}
          .story-inner{padding-left:20px !important;padding-right:20px !important;width:100% !important;box-sizing:border-box !important}
          .story-content-wrap{padding:40px 20px 90px 20px !important}
          .story-grid{grid-template-columns:1fr !important;gap:28px !important}
          .owner-grid{grid-template-columns:1fr !important}
          .mobile-kova{display:flex !important; flex-direction:column; align-items:center; justify-content:center;position:absolute; top:32px; left:50%; transform:translateX(-50%); z-index:5; text-align:center}
          .mobile-kova .logo{font-family:'Syne',sans-serif;font-weight:900;font-size:38px;letter-spacing:-1.5px;line-height:1;color:#fff}
          .mobile-kova .logo .o-green{color:var(--accent) !important}
          .mobile-kova .sub{font-size:11px;font-weight:500;margin-top:6px;color:rgba(255,255,255,0.75);white-space:nowrap}
          .pc-kova-closed{display:none !important}
        }
      </style>

      <div class="kova-story-root">
        <div class="story-hero" style="width:100%;height:68vh;min-height:520px;background: linear-gradient(0deg, var(--bg-app) 0%, rgba(10,10,11,0.85) 35%, rgba(10,10,11,0.25) 100%), url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2000') center/cover no-repeat;position:relative;display:flex;align-items:flex-end;padding:48px 40px;box-sizing:border-box;border-radius:0 0 16px 16px">
          <div class="mobile-kova"><div class="logo">K<span class="o-green">O</span>VA</div><div class="sub ar">كوفا — مطبخ الجمر • LIVE FIRE • JLT</div></div>
          <div class="pc-kova-closed"><div class="logo">K<span class="o-green">O</span>VA</div><div class="sub ar">كوفا — مطبخ الجمر • LIVE FIRE • JLT</div></div>
          <div style="max-width:800px;width:100%;position:relative;z-index:2">
            <span style="color:var(--accent-2);font-weight:800;letter-spacing:4px;font-size:12px;display:flex;align-items:center;gap:8px"><span style="width:8px;height:8px;background:var(--accent-2);border-radius:50%;display:inline-block;box-shadow:0 0 8px var(--accent-2)"></span> EST. DUBAI 2024 • BUILT ON CLOUDFLARE</span>
            <h1 style="font-size:clamp(40px, 7vw, 84px);font-weight:900;letter-spacing:-3px;line-height:0.9;color:#fff;margin-top:12px;margin-bottom:0">WE DIDN'T<br>OPEN A RESTAURANT.<br><span style="color:var(--accent)">WE LIT A</span> <span style="color:var(--accent-2)">FIRE.</span></h1>
          </div>
        </div>

        <div class="story-inner story-content-wrap">
          <div class="story-grid" style="display:grid; grid-template-columns:1.2fr 0.8fr; gap:48px; align-items:start;">
            <div style="min-width:0">
              <p class="ar" style="font-size:clamp(20px, 3vw, 28px);line-height:1.4;color:var(--text-main);font-weight:600;margin:0">كوفا — ليس مطعماً، بل طقسٌ من نارٍ ودخانٍ وحجر</p>
              <div style="margin-top:32px; color:var(--text-muted); font-size:17px; line-height:1.8; display:flex; flex-direction:column; gap:20px;">
                <p style="color:var(--text-main);font-size:19px;font-weight:600;line-height:1.6;margin:0">In the heart of Dubai, where glass towers touch the sky, we went back to the beginning. To fire. To smoke. To stone.</p>
                <p style="margin:0">KOVA is not a kitchen. It's a <b style="color:var(--text-main)">ritual</b>. Every morning, our pitmasters light the central hearth — a 2-ton block of Hajar stone from Ras Al Khaimah. It burns all day. It never goes out.</p>
                <p style="margin:0">We cook like our ancestors did, but with the precision of tomorrow. 14-hour smoked lamb shoulder. Wood-fired flatbread that puffs in 90 seconds. Fish cured in desert salt and smoked over ghaf wood.</p>
                <p style="margin:0">No gas. No shortcuts. Just flame, smoke, and stone. That's our promise.</p>
              </div>
              <div class="story-stats" style="margin-top:40px; display:flex; gap:32px; border-top:1px solid var(--border); padding-top:24px;">
                <div><div style="font-size:32px;font-weight:800;color:var(--accent-2)">14h</div><div style="color:var(--text-muted);font-size:12px;letter-spacing:2px;">SMOKE TIME</div></div>
                <div><div style="font-size:32px;font-weight:800;color:var(--text-main)">900°</div><div style="color:var(--text-muted);font-size:12px;letter-spacing:2px;">HEARTH TEMP</div></div>
                <div><div style="font-size:32px;font-weight:800;color:var(--accent)">1</div><div style="color:var(--text-muted);font-size:12px;letter-spacing:2px;">FIRE, ALWAYS ON</div></div>
              </div>
            <div style="display:flex;flex-direction:column;gap:16px;min-width:0">
              <div class="story-card flame"><div style="font-weight:700;margin-bottom:8px;color:var(--text-main)">🔥 Flame <span style="color:var(--accent-2);font-size:11px;margin-left:6px">• LIVE</span></div><div style="color:var(--text-muted);font-size:14px;line-height:1.6;">Central hearth, ghaf & sidr wood. The soul of KOVA. Everything touches fire.</div></div>
              <div class="story-card smoke"><div style="font-weight:700;margin-bottom:8px;color:var(--text-main)">💨 Smoke</div><div style="color:var(--text-muted);font-size:14px;line-height:1.6;">Low & slow. 14 hours minimum. Patience you can taste.</div></div>
              <div class="story-card stone"><div style="font-weight:700;margin-bottom:8px;color:var(--text-main)">🪨 Stone</div><div style="color:var(--text-muted);font-size:14px;line-height:1.6;">Hajar mountain stone retains heat for 8 hours. Bread, meat, memory.</div></div>
              <div style="background:var(--accent); border-radius:16px; padding:20px; color:#000;"><div style="font-weight:800;margin-bottom:4px;display:flex;justify-content:space-between;align-items:center">Visit Us <span style="background:var(--accent-2);color:#fff;font-size:10px;padding:3px 8px;border-radius:99px">OPEN FIRE</span></div><div style="font-size:13px; line-height:1.5; font-weight:500;">Alserkal Avenue, Dubai<br>Open Fire Daily 12PM - 1AM<br>creators@dopetonevault.com</div></div>
            </div>
          </div>

          <!-- OWNER SECTION - EMMA PRINCE DON FICHTNER -->
          <div style="margin-top:72px;border-top:1px solid var(--border);padding-top:48px">
            <div style="display:flex;gap:8px;align-items:center;margin-bottom:28px">
              <span style="background:var(--accent);color:#000;font-size:10px;font-weight:900;padding:4px 10px;border-radius:999px;letter-spacing:1px">BUILT BY</span>
              <span style="color:var(--text-muted);font-size:11px;letter-spacing:2px;font-weight:700">THE ARCHITECT BEHIND THE FIRE</span>
            </div>

            <div class="owner-grid" style="background:var(--bg-card);border:1px solid var(--border);border-radius:24px;overflow:hidden;display:grid;grid-template-columns:320px 1fr;gap:0">
              <div style="background:#0a0a0b;position:relative;min-height:540px;display:flex;flex-direction:column">
                <img src="/assets/dt-boss.png" onerror="this.src='/public/assets/dt-boss.png'" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0" alt="Emma Prince Don Fichtner">
                <div style="position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,.92) 0%,rgba(0,0,0,.2) 60%,transparent 100%)"></div>
                <div style="position:absolute;bottom:0;left:0;right:0;padding:20px;z-index:2">
                  <img src="/assets/ep-logo.png" onerror="this.src='/public/assets/ep-logo.png'" style="height:38px;object-fit:contain;margin-bottom:12px;filter:brightness(0) invert(1)" alt="EPDF Logo - Your Personal Logo">
                  <div style="color:white;font-weight:900;font-size:20px;letter-spacing:-.5px;line-height:1.1">EMMA PRINCE<br>DON FICHTNER</div>
                  <div style="color:var(--accent);font-size:11px;font-weight:800;letter-spacing:1px;margin-top:4px">WEB DEV • ARTIST • MUSIC PRODUCER</div>
                </div>
              </div>

              <div style="padding:28px 28px 24px;display:flex;flex-direction:column;gap:18px">
                <div>
                  <h2 style="margin:0;font-size:26px;font-weight:900;letter-spacing:-1px;line-height:1">I don't build websites.<br><span style="color:var(--accent)">I build unstoppable systems.</span></h2>
                  <p style="color:var(--text-muted);font-size:13px;line-height:1.7;margin-top:14px;margin-bottom:0">
                    I'm <b style="color:var(--text-main)">Emma Prince Don Fichtner — DOPETONE701</b>. Web developer, artist, music producer based in Dubai. KOVA OS is not a template. It's a full <b style="color:var(--text-main)">Cloudflare-native OS</b> — Workers, D1, Pages, R2 — zero servers, 100% edge, infinite scale. Your cart syncs across devices, orders never die, even if you close the tab. That's the <b style="color:var(--text-main)">unstoppable Cloudflare</b> power.<br><br>I code like I produce — every pixel has a beat. Every API is a loop that never breaks. KOVA runs on the same stack that powers dopetonevault.com — my vault for creators.
                  </p>
                </div>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
                  <div style="background:var(--bg-app);border:1px solid var(--border);border-radius:12px;padding:12px"><div style="font-size:10px;font-weight:800;color:var(--text-muted);letter-spacing:1px">STACK</div><div style="font-size:11px;font-weight:700;margin-top:4px;line-height:1.4">Cloudflare Workers • D1 • Pages • KV • R2</div></div>
                  <div style="background:var(--bg-app);border:1px solid var(--border);border-radius:12px;padding:12px"><div style="font-size:10px;font-weight:800;color:var(--text-muted);letter-spacing:1px">GITHUB</div><div style="font-size:12px;font-weight:700;margin-top:4px"><a href="https://github.com/dopetone701" target="_blank" style="color:var(--accent);text-decoration:none">github.com/dopetone701</a></div></div>
                </div>

                <div style="background:linear-gradient(135deg,rgba(200,255,0,.1),rgba(255,78,31,.1));border:1px solid rgba(200,255,0,.2);border-radius:14px;padding:14px">
                  <div style="font-size:11px;font-weight:900;letter-spacing:1px">CONTACT FOR BUILDS</div>
                  <div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:8px">
                    <a href="tel:+971524082460" style="background:var(--text-main);color:var(--bg-app);padding:8px 12px;border-radius:999px;font-size:11px;font-weight:800;text-decoration:none">📞 052 408 2460</a>
                    <a href="mailto:dopetone701@gmail.com" style="background:var(--bg-app);border:1px solid var(--border);color:var(--text-main);padding:8px 12px;border-radius:999px;font-size:11px;font-weight:800;text-decoration:none">✉️ dopetone701@gmail.com</a>
                    <a href="mailto:creators@dopetonevault.com" style="background:var(--bg-app);border:1px solid var(--border);color:var(--text-main);padding:8px 12px;border-radius:999px;font-size:11px;font-weight:800;text-decoration:none">🏢 creators@dopetonevault.com</a>
                  </div>
                </div>

                <div>
                  <div style="font-size:10px;font-weight:900;letter-spacing:2px;color:var(--text-muted);margin-bottom:10px">SOCIALS • FOLLOW THE FIRE</div>
                  <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                    <a href="https://www.instagram.com/emmaprincedonfitcner?igsh=bTh6a25rNnhwaXdp&utm_source=qr" target="_blank" class="social-btn" title="Instagram">
                      <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                    <a href="https://www.facebook.com/share/198hF3qWRq/?mibextid=wwXIfr" target="_blank" class="social-btn" title="Facebook">
                      <svg viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                    </a>
                    <a href="https://www.tiktok.com/@emmaprincedf?_r=1&_t=ZS-98Vf8QHfEO2" target="_blank" class="social-btn" title="TikTok">
                      <svg viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                    </a>
                    <a href="https://youtube.com/@emmaprincedonfichtner6130?si=9rUlNxyH2gH55rJB" target="_blank" class="social-btn" title="YouTube">
                      <svg viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                    </a>
                    <a href="https://github.com/dopetone701" target="_blank" class="social-btn" title="GitHub dopetone701">
                      <svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                    <a href="https://dopetonevault.com" target="_blank" style="height:40px;padding:0 16px;border-radius:12px;background:var(--accent);color:#000;display:flex;align-items:center;gap:8px;font-size:11px;font-weight:900;text-decoration:none">VAULT →</a>
                    <img src="/assets/dt-logo.png" onerror="this.src='/public/assets/dt-logo.png'" style="height:40px;width:40px;object-fit:contain;border-radius:10px;background:var(--bg-app);border:1px solid var(--border);padding:3px" alt="DOPETONEVAULT Logo">
                  </div>
                </div>

                <div style="margin-top:auto;padding-top:16px;border-top:1px dashed var(--border);display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
                  <div style="font-size:11px;color:var(--text-muted)">Built in Dubai • Cloudflare Edge • D1 Synced • kova-os.pages.dev</div>
                  <div style="display:flex;align-items:center;gap:8px"><img src="/assets/ep-logo.png" style="height:18px;opacity:.6"><span style="font-size:10px;font-weight:800;letter-spacing:1px;color:var(--text-muted)">EPDF • DOPETONE 701</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  afterRender(){
    document.documentElement.style.overflowX='hidden'; document.body.style.overflowX='hidden'; document.body.style.maxWidth='100vw'; document.body.style.touchAction='pan-y'; document.body.style.overscrollBehaviorX='none';
    const app=document.getElementById('app'); if(app){app.style.overflowX='hidden'; app.style.touchAction='pan-y'; app.style.overscrollBehaviorX='none'}
  }
};
