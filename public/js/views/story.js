// KOVA - Our Story View - FLAME SMOKE STONE - LOCKED COLORS BALANCED
export const Story = {
  async render() {
    return `
      <style>
        .kova-story-root{
          margin:-24px !important;
          width:calc(100% + 48px) !important;
          min-width:calc(100% + 48px);
          background:var(--bg-app);
          box-sizing:border-box;
          overflow-x:clip;
        }
        .story-inner{
          max-width:1100px;
          margin:0 auto;
          padding-left:40px;
          padding-right:40px;
          box-sizing:border-box;
          width:100%;
        }
        .story-content-wrap{
          padding:70px 40px 110px 40px;
        }
        .story-card{
          background:var(--bg-card);
          border:1px solid var(--border);
          border-radius:16px;
          padding:20px;
          transition:border-color .2s;
        }
        .story-card:hover{ border-color: var(--accent-2); }
        .story-card.flame{ border-left:3px solid var(--accent-2); }
        .story-card.smoke{ border-left:3px solid var(--text-muted); }
        .story-card.stone{ border-left:3px solid var(--text-main); }

        @media (max-width: 768px) {
          .kova-story-root{
            margin:-16px !important;
            width:calc(100% + 32px) !important;
            min-width:calc(100% + 32px) !important;
          }
          .story-hero{
            height:62vh !important;
            min-height:420px !important;
            padding:24px 20px !important;
            border-radius:0 0 16px 16px !important;
          }
          .story-hero h1{
            font-size:36px !important;
            letter-spacing:-1.5px !important;
            line-height:0.95 !important;
          }
          .story-inner{
            padding-left:20px !important;
            padding-right:20px !important;
          }
          .story-content-wrap{
            padding:40px 20px 90px 20px !important;
          }
          .story-grid{
            grid-template-columns:1fr !important;
            gap:28px !important;
          }
          .story-stats{
            gap:20px !important;
            flex-wrap:wrap;
          }
          .story-stats div{ min-width:70px; }
        }
      </style>

      <div class="kova-story-root">
        <div class="story-hero" style="
          width:100%;
          height:68vh;
          min-height:520px;
          background: linear-gradient(0deg, var(--bg-app) 0%, rgba(10,10,11,0.85) 35%, rgba(10,10,11,0.25) 100%), url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2000') center/cover no-repeat;
          position:relative;
          display:flex;
          align-items:flex-end;
          padding:48px 40px;
          box-sizing:border-box;
          border-radius:0 0 16px 16px;
        ">
          <div style="max-width:800px;width:100%">
            <span style="color:var(--accent-2);font-weight:800;letter-spacing:4px;font-size:12px;display:flex;align-items:center;gap:8px"><span style="width:8px;height:8px;background:var(--accent-2);border-radius:50%;display:inline-block;box-shadow:0 0 8px var(--accent-2)"></span> EST. DUBAI 2024</span>
            <h1 style="font-size:clamp(40px, 7vw, 84px);font-weight:900;letter-spacing:-3px;line-height:0.9;color:#fff;margin-top:12px;margin-bottom:0">
              WE DIDN'T<br>OPEN A RESTAURANT.<br><span style="color:var(--accent)">WE LIT A</span> <span style="color:var(--accent-2)">FIRE.</span>
            </h1>
          </div>
        </div>

        <div class="story-inner story-content-wrap">
          <div class="story-grid" style="display:grid; grid-template-columns:1.2fr 0.8fr; gap:48px; align-items:start;">
            <div style="min-width:0">
              <p class="ar" style="font-size:clamp(20px, 3vw, 28px);line-height:1.4;color:var(--text-main);font-weight:600;margin:0">كوفا — ليس مطعماً، بل طقسٌ من نارٍ ودخانٍ وحجر</p>
              <div style="margin-top:32px; color:var(--text-muted); font-size:17px; line-height:1.8; display:flex; flex-direction:column; gap:20px;">
                <p style="color:var(--text-main);font-size:19px;font-weight:600;line-height:1.6;margin:0">In the heart of Dubai, where glass towers touch the sky, we went back to the beginning. To fire. To smoke. To stone.</p>
                <p style="margin:0">KOVA is not a kitchen. It's a <b style="color:var(--text-main)">ritual</b>. Every morning, our pitmasters light the central hearth — a 2-ton block of Hajar stone from the mountains of Ras Al Khaimah. It burns all day. It never goes out.</p>
                <p style="margin:0">We cook like our ancestors did, but with the precision of tomorrow. 14-hour smoked lamb shoulder. Wood-fired flatbread that puffs in 90 seconds. Fish cured in desert salt and smoked over ghaf wood.</p>
                <p style="margin:0">No gas. No shortcuts. Just flame, smoke, and stone. That's our promise.</p>
              </div>
              <div class="story-stats" style="margin-top:40px; display:flex; gap:32px; border-top:1px solid var(--border); padding-top:24px;">
                <div><div style="font-size:32px;font-weight:800;color:var(--accent-2)">14h</div><div style="color:var(--text-muted);font-size:12px;letter-spacing:2px;">SMOKE TIME</div></div>
                <div><div style="font-size:32px;font-weight:800;color:var(--text-main)">900°</div><div style="color:var(--text-muted);font-size:12px;letter-spacing:2px;">HEARTH TEMP</div></div>
                <div><div style="font-size:32px;font-weight:800;color:var(--accent)">1</div><div style="color:var(--text-muted);font-size:12px;letter-spacing:2px;">FIRE, ALWAYS ON</div></div>
              </div>
            <div style="display:flex;flex-direction:column;gap:16px;min-width:0">
              <div class="story-card flame">
                <div style="font-weight:700;margin-bottom:8px;color:var(--text-main)">🔥 Flame <span style="color:var(--accent-2);font-size:11px;margin-left:6px">• LIVE</span></div>
                <div style="color:var(--text-muted);font-size:14px;line-height:1.6;">Central hearth, ghaf & sidr wood. The soul of KOVA. Everything touches fire.</div>
              </div>
              <div class="story-card smoke">
                <div style="font-weight:700;margin-bottom:8px;color:var(--text-main)">💨 Smoke</div>
                <div style="color:var(--text-muted);font-size:14px;line-height:1.6;">Low & slow. 14 hours minimum. Patience you can taste.</div>
              </div>
              <div class="story-card stone">
                <div style="font-weight:700;margin-bottom:8px;color:var(--text-main)">🪨 Stone</div>
                <div style="color:var(--text-muted);font-size:14px;line-height:1.6;">Hajar mountain stone retains heat for 8 hours. Bread, meat, memory.</div>
              </div>
              <div style="background:var(--accent); border-radius:16px; padding:20px; color:#000;">
                <div style="font-weight:800;margin-bottom:4px;display:flex;justify-content:space-between;align-items:center">Visit Us <span style="background:var(--accent-2);color:#fff;font-size:10px;padding:3px 8px;border-radius:99px">OPEN FIRE</span></div>
                <div style="font-size:13px; line-height:1.5; font-weight:500;">Alserkal Avenue, Dubai<br>Open Fire Daily 12PM - 1AM<br>Reservations only</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
