<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Phiếu làm bài tự luận - Trang 2</title>
<style>
/* ======================================================================
   BẢNG BIẾN SỐ (CSS VARIABLES)
   ====================================================================== */
:root{
  --border-color: #2c4a52; 
  --frame-bg: #c6ecda; 
  --panel-bg: #ffffff; 
  --ink: #1a1a1a; 
  --bubble-size: 15px; 
  --bubble-border: 1.4px; 
  --anchor-size: 25px; 
  --dot-size: 10px; 
  --radius: 4px; 
}

- { box-sizing:border-box; }

body {
margin:0;
padding:24px 0 60px;
background:#e8e8e8;
font-family:"Times New Roman", "Noto Serif", Georgia, serif;
color:var(--ink);
}

.sheet {
width: 794px;
min-height: 1123px;
margin: 0 auto;
background: #fff;
box-shadow: 0 0 14px rgba(0,0,0,.25);
padding: 53px 45px;
position: relative;
}

/_ ---------- 4 MARKER GÓC A4 ---------- _/
.page-anchor {
position:absolute;
width:var(--anchor-size); height:var(--anchor-size);
background:var(--ink);
}
.page-anchor.pa-tl{ top:20px; left: 20px; }
.page-anchor.pa-tr{ top:20px; right:20px; }
.page-anchor.pa-bl{ bottom:20px; left:20px; }
.page-anchor.pa-br{ bottom:20px; right:20px; }

/_ ---------- Khung dùng chung ---------- _/
.frame {
position:relative;
border:1.6px solid var(--border-color);
border-radius:var(--radius);
background:var(--panel-bg);
}

/_ ================= BỐ CỤC KHU VỰC ĐẦU TRANG (ĐÃ GỘP TIÊU ĐỀ) ================= _/
.top-section {
display:grid;
grid-template-columns: 150px 1fr;
gap:20px;
align-items:stretch;
margin-bottom:12px;
}
.left-col { display:flex; flex-direction:column; gap:12px; }

/_ Ô Chữ ký & Ô Trang _/
.diem-box { display:flex; flex-direction:column; }
.diem-box .diem-label {
text-align:center; font-weight:700; font-size:13px;
padding:5px; border-bottom:1.4px solid var(--border-color);
}
.diem-box .diem-space { min-height: 40px; }

.side-title {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 45px;
border-right: 1.6px solid var(--border-color);
font-weight: 700;
font-size: 11px;
line-height: 1.2;
text-align: center;
padding: 4px;
}

/_ Khung Trang _/
.page-box {
display: flex;
flex-direction: row;
align-items: stretch;
margin-top: 12px;
}
.page-content {
flex: 1;
display: flex;
flex-direction: column;
justify-content: center;
padding: 6px 0;
gap: 6px;
}
.pm-labels, .pm-bubbles {
display: grid;
grid-template-columns: repeat(3, 1fr);
justify-items: center;
align-items: center;
}
.pm-labels span { font-size: 13px; font-weight: 700; }

/_ Khung Tiêu Đề Bài Thi (Thay thế cho khung thông tin cũ) _/
.header-box {
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
padding: 10px 20px;
}
.header-box h1 { font-size:24px; font-weight:700; letter-spacing:.5px; margin:0 0 6px; }
.header-box .subtitle { font-size:15px; font-weight:600; margin:0 0 4px; }
.header-box .exam-date { font-size:13px; margin:0; }

/_ ================= HỆ THỐNG MARKER CHO TRANG & SBD ================= _/
.page-box::before, .page-box::after {
content: "";
position: absolute;
top: -18px;
width: var(--dot-size);
height: var(--dot-size);
background: var(--ink);
}
.page-box::before { left: -1.6px; }
.page-box::after { right: -1.6px; }

.sbd-grid-wrapper {
position: relative;
}
.sbd-grid-wrapper::before, .sbd-grid-wrapper::after {
content: "";
position: absolute;
top: 6px;
width: var(--dot-size);
height: var(--dot-size);
background: var(--ink);
}
.sbd-grid-wrapper::before { left: 10px; }
.sbd-grid-wrapper::after { right: 10px; }

/_ ================= SBD DÀN NGANG ================= _/
.sbd-container {
display: flex;
flex-direction: row;
align-items: stretch;
padding: 0;
}
.sbd-grid-wrapper {
flex: 1;
display: flex;
justify-content: center;
padding: 16px 10px 8px 10px;
}
.sbd-h-grid {
display: grid;
grid-template-columns: 30px repeat(10, minmax(22px, 32px));
justify-content: center;
column-gap: 16px;
row-gap: 4px;  
 align-items: center;
}
.sbd-h-row { display: contents; }
.sbd-h-row .digit-head {
text-align: center;
font-size: 13px;
font-weight: 700;
}
.sbd-h-row .entry-cell {
height: 16px;
width: 26px;  
 border: 1.4px solid var(--ink);
background: #fff;
justify-self: center;
}
.bubble {
width:var(--bubble-size); height:var(--bubble-size);
border:var(--bubble-border) solid var(--ink);
border-radius:50%;
margin:0 auto;
background:#fff;
}
.bubble.filled { background:var(--ink); }

/_ --- CODE FIX LỖI KHI IN --- _/
@page { size: A4; margin: 0; }
@media print {
body { padding: 0; background: #fff; }
.sheet { box-shadow: none; margin: 0; width: 210mm; height: 297mm; }
}
</style>

</head>
<body>

<div class="sheet">
  <!-- 4 MARKER ĐỊNH VỊ GÓC -->
  <span class="page-anchor pa-tl"></span>
  <span class="page-anchor pa-tr"></span>
  <span class="page-anchor pa-bl"></span>
  <span class="page-anchor pa-br"></span>

  <!-- ================= KHU VỰC ĐẦU TRANG & TIÊU ĐỀ ================= -->
  <div class="top-section">
    <!-- CỘT TRÁI -->
    <div class="left-col">
      <!-- Chữ ký giám thị -->
      <div class="frame diem-box" style="min-height: auto;">
        <div class="diem-label">Chữ ký giám thị</div>
        <div class="diem-space" style="min-height: 40px;"></div>
      </div>

      <!-- Marker đánh dấu Trang 2 -->
      <div class="frame page-box">
        <div class="side-title">Trang</div>
        <div class="page-content">
          <div class="pm-labels"><span>1</span><span>2</span><span>3</span></div>
          <!-- BÔI ĐEN Ô SỐ 2 -->
          <div class="pm-bubbles">
            <div class="bubble"></div>
            <div class="bubble filled"></div>
            <div class="bubble"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- CỘT PHẢI (Khung Tiêu Đề) -->
    <div class="frame header-box">
      <h1>BÀI THI TỰ LUẬN</h1>
      <p class="subtitle">Vòng loại Da Phuc Olympia Championship Mùa 5</p>
      <p class="exam-date">Ngày thi: <span>15</span><span> / <span></span> 11 </span><span> / 2026</span></p>
    </div>

  </div>

  <!-- ================= KHU VỰC SỐ BÁO DANH ================= -->
  <div class="frame sbd-container">
    <div class="side-title">
      <span>Số</span>
      <span>báo</span>
      <span>danh</span>
    </div>
    
    <div class="sbd-grid-wrapper">
      <div class="sbd-h-grid">
        <!-- Hàng Header (0 đến 9) -->
        <div class="sbd-h-row">
          <div></div> 
          <div class="digit-head">0</div><div class="digit-head">1</div><div class="digit-head">2</div><div class="digit-head">3</div><div class="digit-head">4</div><div class="digit-head">5</div><div class="digit-head">6</div><div class="digit-head">7</div><div class="digit-head">8</div><div class="digit-head">9</div>
        </div>

        <!-- Hàng Hàng Trăm -->
        <div class="sbd-h-row">
          <div class="entry-cell"></div>
          <div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div>
        </div>

        <!-- Hàng Hàng Chục -->
        <div class="sbd-h-row">
          <div class="entry-cell"></div>
          <div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div>
        </div>

        <!-- Hàng Hàng Đơn vị -->
        <div class="sbd-h-row">
          <div class="entry-cell"></div>
          <div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div>
        </div>
      </div>
    </div>

  </div>

  <!-- ================= KHU VỰC BÀI LÀM (CHỜ NỘI DUNG) ================= -->
  <div class="working-area" style="margin-top: 24px;">
    <!-- Không gian thênh thang này đã sẵn sàng để bạn thiết kế các phần tiếp theo! -->
  </div>

</div>
</body>
</html>
