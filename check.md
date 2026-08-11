<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Phiếu trả lời trắc nghiệm</title>
<style>

:root{
--border-color: #2c4a52; /_ màu viền khung _/
--frame-bg: #c6ecda; /_ màu nền khu vực trả lời (đổi thành #ffffff hoặc transparent nếu muốn in trắng đen tiết kiệm mực) _/
--panel-bg: #ffffff; /_ màu nền khu vực thông tin/điểm _/
--ink: #1a1a1a; /_ màu chữ, đường viền ô tròn, marker _/
--bubble-size: 15px; /_ đường kính ô tròn đáp án _/
--bubble-border: 1.4px; /_ độ dày viền ô tròn _/
--anchor-size: 25px; /_ kích thước marker ở 4 GÓC GIẤY A4 (quan trọng nhất cho OMR) _/
--dot-size: 10px; /_ kích thước marker nhỏ đánh dấu ranh giới giữa các khối câu hỏi _/
--radius: 4px; /_ độ bo góc khung _/
--gap-row: 3px; /_ khoảng cách giữa các dòng câu hỏi _/
}

\*{ box-sizing:border-box; }

body{
margin:0;
padding:24px 0 60px;
background:#e8e8e8;
font-family:"Times New Roman", "Noto Serif", Georgia, serif;
color:var(--ink);
}

.sheet{
width: 794px; /_ 210mm _ 3.78 _/
min-height: 1123px; /_ 297mm _ 3.78 (Khổ A4 tiêu chuẩn) _/
margin: 0 auto;
background: #fff;
box-shadow: 0 0 14px rgba(0,0,0,.25);
padding: 53px 45px; /_ 14mm -> 53px, 12mm -> 45px _/
position: relative; /_ để 4 marker góc giấy định vị theo đúng khổ A4 _/
}

/_ ---------- 4 MARKER Ở GÓC GIẤY A4 (quan trọng nhất, dùng để phần mềm
OMR canh thẳng/khử nghiêng cả trang khi quét) ---------- _/
.page-anchor{
position:absolute;
width:var(--anchor-size); height:var(--anchor-size);
background:var(--ink);
}
.page-anchor.pa-tl{ top:20px; left: 20px; }
.page-anchor.pa-tr{ top:20px; right:20px; }
.page-anchor.pa-bl{ bottom:20px; left:20px; }
.page-anchor.pa-br{ bottom:20px; right:20px; }

/_ ---------- Marker nhỏ đánh dấu RANH GIỚI giữa các khối câu hỏi (không
gắn vào từng khung nhỏ nữa — chỉ đặt ở nơi có ý nghĩa phân vùng) ---------- _/
.rail{ position:relative; height:var(--dot-size); margin:4px 0 8px; }
.rail .dot{ position:absolute; top:0; width:var(--dot-size); height:var(--dot-size); background:var(--ink); }
.rail .dot.at-0{ left:0; }
.rail .dot.at-50{ left:calc(50% - (var(--dot-size) / 2)); }
.rail .dot.at-100{ right:0; }

/_ ---------- Tiêu đề ---------- _/
.sheet-header{ text-align:center; margin-bottom:14px; }
.sheet-header h1{
font-size:24px;
font-weight:700;
letter-spacing:.5px;
margin:0 0 4px;
}
.sheet-header .subtitle{
font-size:15px;
font-weight:600px;
margin:0 0 2px;
}
.sheet-header .exam-date{
font-size:13px;
margin:0;
}
.fill-line{ display:inline-block; min-width:26px; border-bottom:1px solid var(--ink); }

/_ ---------- Khung dùng chung (không còn marker riêng ở từng khung) ---------- _/
.frame{
position:relative;
border:1.6px solid var(--border-color);
border-radius:var(--radius);
background:var(--panel-bg);
}

/_ ---------- Hàng trên: Điểm / Ô "không viết vào đây" / Thông tin / SBD ---------- _/
.top-section{
display:grid;
grid-template-columns: 150px 1fr 140px;
gap:20px;
align-items:stretch;
margin-bottom:5px;
}
.left-col{ display:flex; flex-direction:column; gap:12px; }

.diem-box{ min-height:84px; display:flex; flex-direction:column; }
.diem-box .diem-label{
text-align:center; font-weight:700; font-size:13px;
padding:5px; border-bottom:1.4px solid var(--border-color);
}

.diem-box .diem-space{ flex:1; border-top:1.4px solid var(--border-color); }

.xmark-box .xmark-text{
position:relative; z-index:2;
background:var(--panel-bg);
padding:3px 10px;
font-weight:700; font-size:12px;
text-align:center; line-height:1.35;
border:1.2px solid var(--border-color);
border-radius:3px;
}

.info-box{ padding:16px 16px; }
.info-row {
display: block; /_ Đổi thành block để tự động ngắt dòng _/
font-size: 13.5px;
font-weight: 700; /_ In đậm toàn bộ tiêu đề _/
margin-bottom: 10px; /_ Khoảng cách giữa các mục (Họ tên, Trường...) _/
}
.info-row .num{ font-weight:700; white-space:nowrap; }
.info-row .fill {
display: block; /_ Ép dòng kẻ đứt xuống một dòng riêng biệt _/
border-bottom: 1.5px dotted var(--ink);
height: 21px; /_ Chiều cao từ chữ xuống dòng kẻ _/
width: 100%; /_ Dòng kẻ kéo dài tối đa _/
}
.sbd-box{ padding:5px 9px; }

.sbd-title{ text-align:center; font-weight:700; font-size:13px; margin-bottom:2px; }
.sbd-entry {
display: grid;
/_ Dùng chung tỷ lệ chia cột giống hệt .sbd-grid bên dưới _/
grid-template-columns: 16px repeat(3, 1fr);
align-items: center;
margin-bottom: 5px;
}
.sbd-entry .entry-cell {
height: 18px;
width: 28px; /_ Đặt chiều rộng cố định cho ô vuông _/
justify-self: center; /_ Lệnh này bắt buộc ô vuông phải nằm ngay giữa cột, thẳng tắp với ô tròn _/
border: 1.2px solid var(--ink);
background: #fff;
}
.sbd-grid{ display:grid; grid-template-columns:16px repeat(3,1fr); row-gap:1px; align-items:center; }
.sbd-grid .digit-label{ font-size:11px; font-weight:700; text-align:center; }
.x-mark {
font-family: Arial, sans-serif; /_ Dùng font không chân cho chữ X trông cứng cáp hơn _/
font-size: 10px;
font-weight: bold;
text-align: center;
line-height: 18px; /_ Căn cho cao bằng với ô vuông bên cạnh _/
color: var(--ink);
}
.x-mark-small {
font-family: Arial, sans-serif;
font-size: 11px;
font-weight: bold;
text-align: center; /_ Đổi từ left sang center _/
}
/_ ---------- Ô tròn đáp án dùng chung ---------- _/
.bubble{
width:var(--bubble-size); height:var(--bubble-size);
border:var(--bubble-border) solid var(--ink);
border-radius:50%;
margin:0 auto;
background:#fff;
}
.bubble.filled{ background:var(--ink); }

/_ ---------- Khu vực trả lời (nền màu) ---------- _/
.answer-panel{
background:var(--frame-bg);
border-radius:8px;
padding:16px;
}
.answer-section {
display: block; /_ Hủy chế độ chia 2 cột dọc _/
}

.row-top {
display: flex;
gap: 20px;
margin-bottom: 20px;
}

.part-two {
flex: 1; /_ Phần II tự động co giãn lấp đầy khoảng trống còn lại _/
}

.part-one {
flex: 0 0 302px; /_ Giữ cố định chiều rộng Phần I _/
}

.part-one, .part-two {
display: flex;
flex-direction: column;
}

.part-title{
font-weight:700; font-size:15px;
margin:0 0 4px;
}
.part-title.spaced{ margin-top:16px; }

/_ Khối câu hỏi dùng chung (Phần I, Phần III, ví dụ hướng dẫn...) — luôn là
display:grid ở đây, các khung riêng bên dưới chỉ override số cột/độ rộng. _/
.qhead{
display:grid; grid-template-columns:10px repeat(var(--cols,4),1fr);
text-align:center; font-weight:700; font-size:11px; margin-bottom:6px;
}
.qrow{
display:grid; grid-template-columns:10px repeat(var(--cols,4),1fr);
align-items:center; margin-bottom:var(--gap-row);
}
.qrow .qnum{ font-size:12px; font-weight:600; text-align:left; }
.p1-row{ display:flex; gap:12px; align-items:flex-start; }
.rail-p1 {
width: 302px; /_ 145px + 12px gap + 145px = 302px _/
}

.p1-row, .tf-frame {
flex: 1; /_ Lệnh này bắt buộc 2 khung (dù nội dung ngắn/dài) phải kéo giãn cao bằng nhau _/
}

.rail-p1 .dot.at-50{ left:157px; }
.qgrid{ padding:8px 10px; }
#p1-main, #p1-extra {
width: 145px; /_ Cho 2 cột rộng bằng nhau _/
}

.p2-row{ display:flex; gap: 12px; }
.tf-frame {
display: flex;
flex-direction: column;
padding: 0;
/_ (Lưu ý: Đã xóa lệnh justify-content: center cũ ở đây để không bị co vào giữa nữa) _/
}

.tf-pair {
flex: 1; /_ Kéo giãn khối câu hỏi để lấp đầy toàn bộ chiều cao của khung _/
width: 100%;
display: flex;
flex-direction: row;
align-items: stretch; /_ Đảm bảo đường kẻ dọc kéo thẳng tắp từ top xuống bottom _/
}

/_ ================= ĐẨY LÊN TOP & TỰ ĐỘNG GIÃN CÁCH ================= _/
/_ ================= KÉO KHUNG LÊN TOP ================= _/
.tf-block {
flex: 1;
display: flex;
flex-direction: column;
justify-content: space-between;
/_ Giảm padding-top từ 12px xuống 4px để đẩy toàn bộ nội dung lên sát mép trên _/
/_ Giảm padding-bottom xuống 12px để cân bằng khoảng trống ở đáy _/
padding: 0 0 12px 0;
}

/_ ================= TẠO THANH NGANG ================= _/
.tf-block-title {
text-align: center;
font-weight: 700;
font-size: 13px;
margin-bottom: 0;
padding-top: 6px;
/_ Thêm khoảng cách từ chữ "Câu 1/Câu 2" xuống đường kẻ ngang _/
padding-bottom: 6px;
/_ Tạo đường kẻ ngang nét liền, màu đồng bộ với viền khung _/
border-bottom: 1.4px solid var(--border-color);
}
.tf-block + .tf-block {
border-left: 1.4px solid var(--border-color); /_ Đường kẻ dọc nằm ngay chính giữa 2 câu _/
}
.tf-block-title {
text-align: center;
font-weight: 700;
font-size: 13px;
margin-bottom: 0;
}
.tf-block .tf-head,
.tf-block .tf-row {
margin-bottom: 0; /_ Xóa margin cũ _/
}
.tf-head{ display:grid; grid-template-columns:16px 1fr 1fr; font-size:10px; font-weight:700; text-align:center; margin-bottom:3px; }
.tf-row{ display:grid; grid-template-columns:16px 1fr 1fr; align-items:center; margin-bottom:var(--gap-row); }
.tf-row .tf-letter {
text-align: center;
font-size: 12px;
}
.tf-head, .tf-row {
display: grid;
/_ Chia 3 cột: Cột chữ số (30px) | Cột Đúng (45px) | Cột Sai (45px) _/
grid-template-columns: 30px 45px 45px;
justify-content: center;
align-items: center;
}
.row-bottom {
margin-top: 35px; /_ Đẩy toàn bộ Phần III xuống xa hơn so với hàng trên _/
}

/_ PHẦN III — rail 3 chấm giữa cụm cột trái (C1,C2) / cụm cột phải (C3,C4) _/
.c-quad{ display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px; }
.c-quad-row {
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 24px; /_ Tăng khoảng cách ngang giữa các khung C1, C2, C3, C4 _/
margin-bottom: 24px; /_ Tăng khoảng cách dọc giữa hàng C1-C4 và hàng C5-C7 _/
}
.c-wide-row {
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 24px; /_ Tăng khoảng cách ngang giữa các khung C5, C6, C7 _/
}
.c-box{ padding:12px 14px; }
.c-box .qhead, .c-box .qrow{ grid-template-columns:22px repeat(var(--cols,4),1fr); }
.c-box .qhead .qtag{ grid-column:1; text-align:left; font-style:italic; }

.c-wide{ padding: 12px 14px; }
.c-wide .qhead, .c-wide .qrow{ grid-template-columns:22px repeat(6,1fr); }
.c-box, .c-wide {
padding: 0 0 10px 0;
display: flex;
flex-direction: column;
}

.c-block-title {
text-align: center;
font-weight: 700;
font-size: 13px;
padding-top: 6px;
padding-bottom: 6px;
border-bottom: 1.4px solid var(--border-color);
margin-bottom: 10px;
}

.c-box .qhead, .c-box .qrow,
.c-wide .qhead, .c-wide .qrow {
padding: 0 16px;
}

/_ ---------- Hàng dưới cùng ---------- _/
.bottom-row{
display:flex; justify-content:space-between; align-items:flex-end;
gap:16px; margin-top:18px;
}
.guide-box{ padding:10px 14px; max-width:300px; }
.guide-box h3{ margin:0 0 6px; font-size:13px; }
.guide-box p{ margin:0 0 8px; font-size:12px; line-height:1.4; }
.guide-example .qhead, .guide-example .qrow{ grid-template-columns:22px repeat(4,1fr); }
.guide-example{ padding:6px 8px; width:150px; }
.essay-note{ font-style:italic; font-weight:700; font-size:15px; white-space:nowrap; }

.row-bottom .frame::before { left: -1.6px; }
.row-bottom .frame::after { right: -1.6px; }

.tf-pair::before {
content: "";
position: absolute;
top: -18px; /_ Khớp tuyệt đối với độ cao của các marker góc _/
left: calc(50% - (var(--dot-size) / 2)); /_ Căn lùi lại một nửa thân marker để nó nằm ngay chính giữa _/
width: var(--dot-size);
height: var(--dot-size);
background: var(--ink);
}

/_ --- CODE FIX LỖI KHI IN --- _/
@page {
size: A4;
margin: 0; /_ Xóa lề mặc định của trình duyệt để bản in vừa khít mép giấy _/
}

@media print {
body {
padding: 0; /_ Xóa khoảng trống thừa của body khi in _/
background: #fff;
}

.sheet {
box-shadow: none; /_ Ẩn bóng đổ để file PDF/giấy in sạch sẽ hơn _/
margin: 0;
width: 210mm;
height: 297mm;
page-break-after: avoid;
page-break-inside: avoid;
}
}
/_ ================== HỆ THỐNG MARKER LOẠI 3 (TỰ ĐỘNG) ================== _/
/_ Áp dụng cho 2 góc trên của TẤT CẢ các khung trong khu vực làm bài _/
.answer-section .frame::before,
.answer-section .frame::after {
content: "";
position: absolute;
top: -18px;
width: var(--dot-size);  
 height: var(--dot-size);
background: var(--ink);
}

.answer-section .frame::before { left: -1.6px; }
.answer-section .frame::after { right: -1.6px; }

/_ Đẩy các chữ "PHẦN I", "PHẦN II", "PHẦN VII" lên cao để không bị đè vào Marker _/
.part-title {
font-weight: 700;
font-size: 15px;
margin: 0 0 28px;
}

/_ Marker riêng cho Số báo danh _/
.sbd-box::after {
content: "";
position: absolute;
top: -18px;
left: -1.6px;
width: var(--dot-size);
height: var(--dot-size);
background: var(--ink);
}

.sbd-box::before {
content: "";
position: absolute;
top: -18px;
right: -1.6px;
width: var(--dot-size);
height: var(--dot-size);
background: var(--ink);
}

</style>
</head>
<body>

<div class="sheet">
  <span class="page-anchor pa-tl"></span>
  <span class="page-anchor pa-tr"></span>
  <span class="page-anchor pa-bl"></span>
  <span class="page-anchor pa-br"></span>

  <div class="sheet-header">
    <h1>PHIẾU TRẢ LỜI TRẮC NGHIỆM</h1>
    <p class="subtitle">Vòng loại Da Phuc Olympia Championship Mùa 5</p>
    <p class="exam-date">Ngày thi: <span>15</span><span> / <span></span> 11 </span><span> / 2026</span></p>
  </div>

  <!-- ================= HÀNG TRÊN: Điểm / X-box / Thông tin / SBD ================= -->
  <div class="top-section">
<div class="left-col">
    <!-- Ô Điểm gốc -->
    <div class="frame diem-box">
        <div class="diem-label">Điểm</div>
        <div class="diem-space"></div>
    </div>

    <!-- Ô mới được thêm vào ngay bên dưới -->
    <div class="frame diem-box" style="margin-top: 10px;">
        <div class="diem-label">Chữ ký giám thị</div>
        <div class="diem-space"></div>
    </div>

</div>


    <div class="frame info-box">
      <div class="info-row"><span class="num">1.</span> Họ và tên thí sinh: <span class="fill"></span></div>
      <div class="info-row"><span class="num">2.</span> Trường:<span class="fill"></span></div>
      <div class="info-row"><span class="num">3.</span> Lớp: <span class="fill"></span></div>
      <div class="info-row"><span class="num">4.</span> Chữ ký của thí sinh: <span class="fill"></span></div>
    </div>

    <div class="frame sbd-box" style="--cols:3">
      <div class="sbd-title">Số báo danh</div>
      <div class="sbd-entry">
        <div class="x-mark">X</div>
        <div class="entry-cell"></div><div class="entry-cell"></div><div class="entry-cell"></div>
      </div>
      <div class="sbd-grid">
        <div></div><div></div><div></div><div></div>
        <!-- 10 hàng số 0-9, mỗi hàng: nhãn số + 3 ô tròn -->
        <div class="digit-label">0</div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div>
        <div class="digit-label">1</div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div>
        <div class="digit-label">2</div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div>
        <div class="digit-label">3</div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div>
        <div class="digit-label">4</div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div>
        <div class="digit-label">5</div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div>
        <div class="digit-label">6</div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div>
        <div class="digit-label">7</div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div>
        <div class="digit-label">8</div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div>
        <div class="digit-label">9</div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div>
      </div>
    </div>

  </div>

  <!-- Rail đánh dấu ranh giới đầu khu vực trả lời (giữa khối thông tin và Phần I) -->
  <div class="rail">
    <span class="dot at-0"></span><span class="dot at-100"></span>
  </div>

  <!-- ================= KHU VỰC TRẢ LỜI ================= -->
  <div class="answer-panel">
  <!-- ================= KHU VỰC TRẢ LỜI ================= -->
<div class="answer-section">

  <!-- HÀNG TRÊN: PHẦN I & PHẦN II ngang nhau -->
  <div class="row-top">
    <!-- CỘT TRÁI: Phần I -->
    <div class="part-one">
      <p class="part-title">PHẦN I</p>
      
      <div class="p1-row">
        <div class="frame qgrid" id="p1-main" style="--cols:4">
          <div class="qhead"><div></div><div>A</div><div>B</div><div>C</div><div>D</div></div>
          <!-- Câu 1-6 -->
          <div class="qrow"><span class="qnum">1</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
          <div class="qrow"><span class="qnum">2</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
          <div class="qrow"><span class="qnum">3</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
          <div class="qrow"><span class="qnum">4</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
          <div class="qrow"><span class="qnum">5</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
          <div class="qrow"><span class="qnum">6</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
        </div>

        <div class="frame qgrid" id="p1-extra" style="--cols:4">
          <div class="qhead"><div></div><div>A</div><div>B</div><div>C</div><div>D</div></div>
          <!-- Câu 7-12 -->
          <div class="qrow"><span class="qnum">7</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
          <div class="qrow"><span class="qnum">8</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
          <div class="qrow"><span class="qnum">9</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
          <div class="qrow"><span class="qnum">10</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
          <div class="qrow"><span class="qnum">11</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
          <div class="qrow"><span class="qnum">12</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
        </div>
      </div>
    </div>

    <!-- CỘT PHẢI: Phần II -->
    <div class="part-two">
      <p class="part-title">PHẦN II</p>

      <div class="frame tf-frame">
        <div class="tf-pair">
          <div class="tf-block">
            <div class="tf-block-title">Câu 1</div>
            <div class="tf-head"><div class="x-mark-small">x</div><div>Đúng</div><div>Sai</div></div>
            <div class="tf-row"><span class="tf-letter">1.1</span><div class="bubble"></div><div class="bubble"></div></div>
            <div class="tf-row"><span class="tf-letter">1.2</span><div class="bubble"></div><div class="bubble"></div></div>
            <div class="tf-row"><span class="tf-letter">1.3</span><div class="bubble"></div><div class="bubble"></div></div>
            <div class="tf-row"><span class="tf-letter">1.4</span><div class="bubble"></div><div class="bubble"></div></div>
          </div>
          <div class="tf-block">
            <div class="tf-block-title">Câu 2</div>
            <div class="tf-head"><div class="x-mark-small">x</div><div>Đúng</div><div>Sai</div></div>
            <div class="tf-row"><span class="tf-letter">2.1</span><div class="bubble"></div><div class="bubble"></div></div>
            <div class="tf-row"><span class="tf-letter">2.2</span><div class="bubble"></div><div class="bubble"></div></div>
            <div class="tf-row"><span class="tf-letter">2.3</span><div class="bubble"></div><div class="bubble"></div></div>
            <div class="tf-row"><span class="tf-letter">2.4</span><div class="bubble"></div><div class="bubble"></div></div>
          </div>
        </div>
      </div>
    </div>

  </div>

  <!-- HÀNG DƯỚI: PHẦN III trải dài toàn bộ chiều ngang -->
  <div class="row-bottom">
    <p class="part-title">PHẦN VII</p>


    <!-- C1 đến C4 (4 khung xếp dàn đều trên 1 hàng ngang) -->
    <div class="c-quad-row">
      <div class="frame c-box" style="--cols:4">
        <div class="c-block-title">Câu 1</div>
        <div class="qhead"><div></div><div>A</div><div>B</div><div>C</div><div>D</div></div>
        <div class="qrow"><span class="qnum">1</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
        <div class="qrow"><span class="qnum">2</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
        <div class="qrow"><span class="qnum">3</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
        <div class="qrow"><span class="qnum">4</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
      </div>
      <div class="frame c-box" style="--cols:4">
        <div class="c-block-title">Câu 2</div>
        <div class="qhead"><div></div><div>A</div><div>B</div><div>C</div><div>D</div></div>
        <div class="qrow"><span class="qnum">1</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
        <div class="qrow"><span class="qnum">2</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
        <div class="qrow"><span class="qnum">3</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
        <div class="qrow"><span class="qnum">4</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
      </div>
      <div class="frame c-box" style="--cols:4">
        <div class="c-block-title">Câu 3</div>
        <div class="qhead"><div></div><div>A</div><div>B</div><div>C</div><div>D</div></div>
        <div class="qrow"><span class="qnum">1</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
        <div class="qrow"><span class="qnum">2</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
        <div class="qrow"><span class="qnum">3</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
        <div class="qrow"><span class="qnum">4</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
      </div>
      <div class="frame c-box" style="--cols:4">
        <div class="c-block-title">Câu 4</div>
        <div class="qhead"><div></div><div>A</div><div>B</div><div>C</div><div>D</div></div>
        <div class="qrow"><span class="qnum">1</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
        <div class="qrow"><span class="qnum">2</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
        <div class="qrow"><span class="qnum">3</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
        <div class="qrow"><span class="qnum">4</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
      </div>
    </div>

    <!-- C5 đến C7 (3 khung to dàn đều trên 1 hàng ngang) -->
    <div class="c-wide-row">
      <div class="frame c-wide" id="c5" style="--cols:6">
        <div class="c-block-title">Câu 5</div>
        <div class="qhead"><span class="qtag"></span><div>A</div><div>B</div><div>C</div><div>D</div><div>E</div><div>F</div></div>
        <div class="qrow"><span class="qnum">1</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
        <div class="qrow"><span class="qnum">2</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
        <div class="qrow"><span class="qnum">3</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
        <div class="qrow"><span class="qnum">4</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
        <div class="qrow"><span class="qnum">5</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
        <div class="qrow"><span class="qnum">6</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
      </div>
      <div class="frame c-wide" id="c6" style="--cols:6">
        <div class="c-block-title">Câu 6</div>
        <div class="qhead"><span class="qtag"></span><div>A</div><div>B</div><div>C</div><div>D</div><div>E</div><div>F</div></div>
        <div class="qrow"><span class="qnum">1</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
        <div class="qrow"><span class="qnum">2</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
        <div class="qrow"><span class="qnum">3</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
        <div class="qrow"><span class="qnum">4</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
        <div class="qrow"><span class="qnum">5</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
        <div class="qrow"><span class="qnum">6</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
      </div>
      <!-- Đã bổ sung thêm C7 -->
      <div class="frame c-wide" id="c7" style="--cols:6">
        <div class="c-block-title">Câu 7</div>
        <div class="qhead"><span class="qtag"></span><div>A</div><div>B</div><div>C</div><div>D</div><div>E</div><div>F</div></div>
        <div class="qrow"><span class="qnum">1</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
        <div class="qrow"><span class="qnum">2</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
        <div class="qrow"><span class="qnum">3</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
        <div class="qrow"><span class="qnum">4</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
        <div class="qrow"><span class="qnum">5</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
        <div class="qrow"><span class="qnum">6</span><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div></div>
      </div>
    </div>

  </div>

</div>
</div>
</body>
</html>
