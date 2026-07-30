// KOVA Admin - Only for allowed emails - D1 + R2 Control
export const Admin = {
  async render() {
    return `
      <div style="max-width:700px;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;">
          <h2 style="font-size:32px;font-weight:800;">Admin OS</h2>
          <span style="background:var(--accent);color:#000;padding:4px 10px;border-radius:99px;font-size:12px;font-weight:800;">LOCKED — ALLOWED EMAILS ONLY</span>
        </div>

        <div class="grid">
          <div class="card">
            <div class="card-body">
              <div class="card-title">Worker Status</div>
              <div class="card-desc">kova-main-api → Active</div>
              <div style="margin-top:12px;font-family:monospace;font-size:12px;background:var(--bg-app);padding:8px;border-radius:8px;">
                D1: kova-db → connected<br>
                R2: KOVA-R2 → connected<br>
                Routes: /api/me, /api/menu, /api/upload
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-body">
              <div class="card-title">Upload to R2</div>
              <div class="card-desc">Only allowed emails can upload — rule locked</div>
              <div style="margin-top:16px;border:2px dashed var(--border);border-radius:12px;padding:24px;text-align:center;color:var(--text-muted);">
                Drop image here (disabled until /api/me check)
              </div>
              <button class="btn-primary" style="margin-top:12px;width:100%;">Check My Email Access</button>
            </div>
          </div>
        </div>

        <div style="margin-top:24px;padding:16px;background:var(--bg-card);border:1px solid var(--border);border-radius:12px;">
          <p style="font-size:13px;color:var(--text-muted);">
            <b style="color:var(--text-main)">Locked Logic:</b><br>
            In workers/kova-main-api/index.js we will add:<br>
            1. D1 table allowed_admins (email)<br>
            2. /api/me returns user email<br>
            3. If email not in allowed_admins → hide [data-admin] + block /api/admin/*<br>
            4. Only you + emails you add can see this page.
          </p>
        </div>
      </div>
    `;
  }
};
