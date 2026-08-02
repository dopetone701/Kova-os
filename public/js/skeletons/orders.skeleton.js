export const ordersSkeleton = `
<div style="max-width:1180px;margin:0 auto;padding:12px 20px 100px;box-sizing:border-box">

  <!-- My Orders header -->
  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin:8px 0 14px">
    <div>
      <div class="kv-sk kv-line" style="width:138px;height:26px;background:#2A2A30"></div>
      <div class="kv-sk kv-line" style="width:128px;height:10px;background:#2A2A30;opacity:.6;margin-top:8px"></div>
    </div>
    <div class="kv-sk kv-line" style="width:98px;height:32px;border-radius:999px;background:#E6E82A"></div>
  </div>

  <!-- Green banner We got your order -->
  <div class="kv-sk kv-line" style="width:100%;height:48px;border-radius:10px;background:#2A2A30;margin-bottom:12px"></div>

  <!-- Order card #F6D11E27 - exact -->
  <div style="border-radius:14px;border:1px solid #E6E82A;background:#1C1C2A;padding:12px 14px 10px;margin-bottom:18px">
    <!-- Top row -->
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
      <div style="display:flex;gap:8px;align-items:center">
        <div class="kv-sk kv-line" style="width:86px;height:14px;background:#F5F5F5"></div>
        <div class="kv-sk kv-line" style="width:62px;height:16px;border-radius:4px;background:#E6E82A;opacity:.7"></div>
        <div class="kv-sk kv-line" style="width:96px;height:10px;background:#2A2A30;opacity:.6"></div>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <!-- AED 847 - NOT COLORED grey -->
        <div class="kv-sk kv-line" style="width:88px;height:14px;background:#2A2A30"></div>
        <div class="kv-sk kv-line" style="width:88px;height:26px;border-radius:999px;background:#2A2A30"></div>
      </div>
    </div>

    <!-- Timeline 1-2-3-4 -->
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px">
      <div class="kv-sk kv-line" style="width:18px;height:18px;border-radius:50%;background:#E6E82A"></div>
      <div class="kv-sk kv-line" style="flex:1;height:2px;background:#2A2A30"></div>
      <div class="kv-sk kv-line" style="width:18px;height:18px;border-radius:50%;background:#2A2A30"></div>
      <div class="kv-sk kv-line" style="flex:1;height:2px;background:#2A2A30"></div>
      <div class="kv-sk kv-line" style="width:18px;height:18px;border-radius:50%;background:#2A2A30"></div>
      <div class="kv-sk kv-line" style="flex:1;height:2px;background:#2A2A30"></div>
      <div class="kv-sk kv-line" style="width:18px;height:18px;border-radius:50%;background:#2A2A30"></div>
    </div>

    <!-- Horizontal items - 6 pills -->
    <div style="display:flex;gap:10px;overflow:hidden">
      ${Array(6).fill(0).map(()=>`
        <div class="kv-sk kv-line" style="min-width:148px;height:54px;border-radius:10px;background:#2A2A30;flex-shrink:0"></div>
      `).join('')}
    </div>
  </div>

  <!-- Recommended For You header -->
  <div style="display:flex;justify-content:space-between;align-items:center;margin:18px 0 10px">
    <div class="kv-sk kv-line" style="width:168px;height:14px;background:#2A2A30"></div>
    <div class="kv-sk kv-line" style="width:56px;height:20px;border-radius:999px;background:#1E1E24"></div>
  </div>

  <!-- 6 cards exact like screenshot -->
  <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:12px">
    ${Array(6).fill(0).map(()=>`
      <div style="border-radius:12px;overflow:hidden;background:#1C1C1F;border:1px solid #27272A">
        <div class="kv-sk" style="height:110px;background:#27272A;position:relative">
          <div class="kv-sk kv-line" style="position:absolute;top:8px;left:8px;width:46px;height:14px;border-radius:4px;background:#1C1C1F"></div>
          <div class="kv-sk kv-line" style="position:absolute;top:8px;right:8px;width:20px;height:20px;border-radius:50%;background:#1C1C1F"></div>
        </div>
        <div style="padding:8px 8px 10px;background:#1C1C1F">
          <div class="kv-sk kv-line" style="width:88%;height:10px;background:#2A2A30"></div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">
            <div class="kv-sk kv-line" style="width:38px;height:10px;background:#2A2A30"></div>
            <div class="kv-sk kv-line" style="width:42px;height:20px;border-radius:999px;background:#E6E82A"></div>
          </div>
        </div>
      </div>
    `).join('')}
  </div>
</div>

<style>
@media(max-width:768px){
  div[style*="grid-template-columns:repeat(6"]{grid-template-columns:repeat(3,1fr)!important}
}
@media(max-width:480px){
  div[style*="grid-template-columns:repeat(6"]{grid-template-columns:repeat(2,1fr)!important}
}
</style>
`;
