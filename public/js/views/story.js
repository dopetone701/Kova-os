// KOVA - Our Story View - FLAME SMOKE STONE
export const Story = {
  async render() {
    return `
      <div style="margin:-24px -24px 0 -24px; width:calc(100% + 48px);">
        
        <!-- STORY HERO -->
        <div style="
          width:100%;
          height:68vh;
          min-height:500px;
          background: linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 100%), url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2000') center/cover no-repeat;
          position:relative;
          display:flex;
          align-items:flex-end;
          padding:48px 40px;
          border-radius:0 0 12px 12px;
        ">
          <div style="max-width:800px;">
            <span style="color:#FFE600;font-weight:800;letter-spacing:4px;font-size:12px;">EST. DUBAI 2024</span>
            <h1 style="font-size:clamp(40px, 7vw, 84px);font-weight:900;letter-spacing:-3px;line-height:0.9;color:white;margin-top:12px;">
              WE DIDN'T<br>OPEN A RESTAURANT.<br><span style="color:#FFE600">WE LIT A FIRE.</span>
            </h1>
          </div>
        </div>

        <!-- STORY CONTENT -->
        <div style="max-width:900px; margin:0 auto; padding:60px 24px;">
          
          <div style="display:grid; grid-template-columns:1.2fr 0.8fr; gap:48px; align-items:start;" class="story-grid">
            
            <div>
              <p class="ar" style="font-size:28px;line-height:1.4;color:var(--text-main);font-weight:600;">كوفا — ليس مطعماً، بل طقسٌ من نارٍ ودخانٍ وحجر</p>
              
              <div style="margin-top:32px; color:var(--text-muted); font-size:17px; line-height:1.8; display:flex; flex-direction:column; gap:20px;">
                <p style="color:var(--text-main);font-size:19px;font-weight:600;line-height:1.6;">
                  In the heart of Dubai, where glass towers touch the sky, we went back to the beginning. To fire. To smoke. To stone.
                </p>
                <p>
                  KOVA is not a kitchen. It's a <b style="color:var(--text-main)">ritual</b>. Every morning, our pitmasters light the central hearth — a 2-ton block of Hajar stone from the mountains of Ras Al Khaimah. It burns all day. It never goes out.
                </p>
                <p>
                  We cook like our ancestors did, but with the precision of tomorrow. 14-hour smoked lamb shoulder. Wood-fired flatbread that puffs in 90 seconds. Fish cured in desert salt and smoked over ghaf wood.
                </p>
                <p>
                  No gas. No shortcuts. Just flame, smoke, and stone. That's our promise.
                </p>
              </div>

              <div style="margin-top:40px; display:flex; gap:32px; border-top:1px solid var(--border); padding-top:24px;">
                <div><div style="font-size:32px;font-weight:800;">14h</div><div style="color:var(--text-muted);font-size:12px;letter-spacing:2px;">SMOKE TIME</div></div>
                <div><div style="font-size:32px;font-weight:800;">900°</div><div style="color:var(--text-muted);font-size:12px;letter-spacing:2px;">HEARTH TEMP</div></div>
                <div><div style="font-size:32px;font-weight:800;">1</div><div style="color:var(--text-muted);font-size:12px;letter-spacing:2px;">FIRE, ALWAYS ON</div></div>
              </div>
            </div>

            <div style="display:flex;flex-direction:column;gap:16px;">
              <div style="background:var(--card); border:1px solid var(--border); border-radius:16px; padding:20px;">
                <div style="font-weight:700;margin-bottom:8px;">🔥 Flame</div>
                <div style="color:var(--text-muted);font-size:14px;line-height:1.6;">Central hearth, ghaf & sidr wood. The soul of KOVA. Everything touches fire.</div>
              </div>
              <div style="background:var(--card); border:1px solid var(--border); border-radius:16px; padding:20px;">
                <div style="font-weight:700;margin-bottom:8px;">💨 Smoke</div>
                <div style="color:var(--text-muted);font-size:14px;line-height:1.6;">Low & slow. 14 hours minimum. Patience you can taste.</div>
              </div>
              <div style="background:var(--card); border:1px solid var(--border); border-radius:16px; padding:20px;">
                <div style="font-weight:700;margin-bottom:8px;">🪨 Stone</div>
                <div style="color:var(--text-muted);font-size:14px;line-height:1.6;">Hajar mountain stone retains heat for 8 hours. Bread, meat, memory.</div>
              </div>
              <div style="background:#FFE600; border-radius:16px; padding:20px; color:black;">
                <div style="font-weight:800;margin-bottom:4px;">Visit Us</div>
                <div style="font-size:13px; line-height:1.5; font-weight:500;">Alserkal Avenue, Dubai<br>Open Fire Daily 12PM - 1AM<br>Reservations only</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>
        @media (max-width: 768px) {
          .story-grid { grid-template-columns: 1fr !important; }
        }
      </style>
    `;
  }
};
