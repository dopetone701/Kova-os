export const menuSkeleton = `
<div style="max-width:1180px;margin:0 auto;padding:12px 20px 100px;box-sizing:border-box">
  <!-- Menu heading + cart count pill row -->
  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin:18px 0 14px">
    <div>
      <div style="display:flex;align-items:baseline;gap:8px">
        <div class="kv-sk kv-line" style="width:92px;height:28px;background:#2A2A30"></div>
        <div class="kv-sk kv-line" style="width:42px;height:12px;background:#2A2A30;opacity:.7"></div>
      </div>
      <div class="kv-sk kv-line" style="width:320px;height:11px;margin-top:10px;background:#2A2A30;opacity:.6"></div>
    </div>
    <!-- Cart count pill 0 • AED 0 - grey not colored -->
    <div class="kv-sk kv-line" style="width:98px;height:30px;border-radius:999px;background:#1E1E24"></div>
  </div>

  <!-- All pills exact -->
  <div style="display:flex;gap:8px;flex-wrap:wrap;margin:16px 0 20px">
    <div class="kv-sk kv-line" style="width:46px;height:30px;border-radius:999px;background:#1E1E24"></div>
    <div class="kv-sk kv-line" style="width:68px;height:30px;border-radius:999px;background:#1E1E24"></div>
    <div class="kv-sk kv-line" style="width:108px;height:30px;border-radius:999px;background:#F4F4F5"></div>
    <div class="kv-sk kv-line" style="width:60px;height:30px;border-radius:999px;background:#1E1E24"></div>
    <div class="kv-sk kv-line" style="width:70px;height:30px;border-radius:999px;background:#1E1E24"></div>
    <div class="kv-sk kv-line" style="width:62px;height:30px;border-radius:999px;background:#1E1E24"></div>
    <div class="kv-sk kv-line" style="width:78px;height:30px;border-radius:999px;background:#1E1E24"></div>
    <div class="kv-sk kv-line" style="width:72px;height:30px;border-radius:999px;background:#1E1E24"></div>
    <div class="kv-sk kv-line" style="width:56px;height:30px;border-radius:999px;background:#1E1E24"></div>
    <div class="kv-sk kv-line" style="width:92px;height:30px;border-radius:999px;background:#1E1E24"></div>
    <div class="kv-sk kv-line" style="width:84px;height:30px;border-radius:999px;background:#1E1E24"></div>
    <div class="kv-sk kv-line" style="width:44px;height:30px;border-radius:999px;background:#1E1E24"></div>
  </div>

  <!-- Cards exact - with cart pill included -->
  <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px">
    ${Array(9).fill(0).map(()=>`
      <div style="border-radius:18px;overflow:hidden;background:#1C1C1F;border:1px solid #27272A">
        <div style="position:relative;height:182px;background:#27272A" class="kv-sk">
          <div style="position:absolute;top:10px;left:10px;width:74px;height:22px;border-radius:999px;background:#1C1C1F" class="kv-sk"></div>
          <div style="position:absolute;top:10px;right:10px;width:30px;height:30px;border-radius:999px;background:#1C1C1F" class="kv-sk"></div>
          <div style="position:absolute;bottom:10px;right:10px;width:64px;height:22px;border-radius:999px;background:#1C1C1F" class="kv-sk kv-line"></div>
        </div>
        <div style="padding:12px 14px 14px;background:#23232E">
          <div class="kv-sk kv-line" style="width:68%;height:14px;background:#3A3A46"></div>
          <div class="kv-sk kv-line" style="width:42%;height:10px;margin-top:6px;background:#2A2A34;opacity:.7"></div>
          <div class="kv-sk kv-line" style="width:88%;height:10px;margin-top:10px;background:#2A2A34;opacity:.6"></div>
          <div class="kv-sk" style="width:100%;height:36px;border-radius:999px;margin-top:16px;background:#E6E82A"></div>
        </div>
      </div>
    `).join('')}
  </div>
</div>
`;
