export const homeSkeleton = `
<style>
.home-sk-hero{position:relative;overflow:hidden;background:#0E0E14;min-height:460px;display:flex;flex-direction:column;padding:22px 28px 24px;border-radius:20px;border:1px solid #27272A}
.home-sk-smoke{position:absolute;inset:0;background:#1A1A24;opacity:.8}
.home-sk-blob{position:absolute;top:15%;left:20%;right:25%;height:260px;background:#27273A;border-radius:50%;opacity:.4;filter:blur(22px)}
@media(max-width:768px){
  .home-sk-hero{border-radius:0 0 20px 20px;min-height:620px;padding:20px 16px 20px;border:none}
  .home-sk-kova-wrap{margin:18px 0 40px!important}
  .home-sk-big1{width:84%!important}
  .home-sk-big2{width:78%!important}
  .home-sk-btn{width:268px!important}
}
</style>

<div style="width:100%;max-width:1180px;margin:0 auto;padding:8px 16px 100px;box-sizing:border-box">

  <div class="home-sk-hero">
    <div class="kv-sk home-sk-smoke"></div>
    <div class="kv-sk home-sk-blob"></div>

    <!-- KOVA - desktop left, mobile center -->
    <div class="home-sk-kova-wrap" style="position:relative;z-index:1;display:flex;flex-direction:column;align-items:flex-start;margin:8px 0 120px">
      <div class="kv-sk kv-line" style="width:112px;height:32px;background:#2A2A30;border-radius:4px"></div>
      <div class="kv-sk kv-line" style="width:180px;height:8px;background:#2A2A30;opacity:.5;margin-top:8px;border-radius:4px"></div>
    </div>

    <div style="flex:1"></div>

    <!-- Pills -->
    <div style="position:relative;z-index:1;display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">
      <div class="kv-sk kv-line" style="width:142px;height:22px;border-radius:999px;background:#E6E82A"></div>
      <div class="kv-sk kv-line" style="width:132px;height:22px;border-radius:999px;background:#2A2A30"></div>
    </div>

    <div style="position:relative;z-index:1;margin-bottom:16px;max-width:420px;width:100%">
      <div class="kv-sk kv-line" style="width:100%;height:26px;border-radius:999px;background:#1E1E24"></div>
    </div>

    <!-- Big text -->
    <div style="position:relative;z-index:1;margin-bottom:12px">
      <div class="home-sk-big1 kv-sk kv-line" style="width:420px;max-width:100%;height:38px;background:#F5F5F5;border-radius:4px"></div>
      <div class="home-sk-big2 kv-sk kv-line" style="width:380px;max-width:95%;height:38px;background:#F5F5F5;border-radius:4px;margin-top:6px"></div>
    </div>

    <div style="position:relative;z-index:1;margin-bottom:10px;max-width:520px">
      <div class="kv-sk kv-line" style="width:100%;height:11px;background:#2A2A30"></div>
      <div class="kv-sk kv-line" style="width:96%;height:11px;background:#2A2A30;margin-top:6px"></div>
      <div class="kv-sk kv-line" style="width:68%;height:11px;background:#2A2A30;margin-top:6px"></div>
    </div>

    <div class="kv-sk kv-line" style="position:relative;z-index:1;width:280px;max-width:75%;height:11px;background:#2A2A30;opacity:.6;margin-bottom:18px"></div>

    <div style="position:relative;z-index:1;display:flex;gap:10px;flex-wrap:wrap;align-items:center">
      <div class="home-sk-btn kv-sk kv-line" style="width:288px;height:42px;border-radius:999px;background:#E6E82A"></div>
      <div class="kv-sk kv-line" style="width:132px;height:32px;border-radius:999px;background:#2A2A30"></div>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:14px">
    <div class="kv-sk" style="height:96px;border-radius:14px;background:#1C1C1F;border:1px solid #27272A"></div>
    <div class="kv-sk" style="height:96px;border-radius:14px;background:#1C1C1F;border:1px solid #27272A"></div>
    <div class="kv-sk" style="height:96px;border-radius:14px;background:#1C1C1F;border:1px solid #27272A"></div>
  </div>
</div>
`;
