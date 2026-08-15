const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs'); // Thêm thư viện File System để đọc thư mục

(async () => {
  console.log('🚀 Khởi động Playwright...');
  const browser = await chromium.launch();
  
  // Quét toàn bộ file trong thư mục hiện tại
  const files = fs.readdirSync(__dirname);
  
  // Chỉ lọc lấy những file có đuôi .html
  const htmlFiles = files.filter(file => file.endsWith('.html'));

  if (htmlFiles.length === 0) {
    console.log('❌ Không tìm thấy file HTML nào trong thư mục!');
    await browser.close();
    return;
  }

  console.log(`🔥 Tìm thấy ${htmlFiles.length} file HTML. Bắt đầu chạy dây chuyền...`);

  // Cho vào vòng lặp xử lý lần lượt từng file
  for (const fileName of htmlFiles) {
    const page = await browser.newPage();
    const filePath = `file://${path.join(__dirname, fileName)}`;
    
    console.log(`⏳ Đang render file: ${fileName}...`);
    
    // Đợi load xong toàn bộ CSS và nội dung
    await page.goto(filePath, { waitUntil: 'networkidle' });

    // 1. Xuất file PNG
    const pngName = fileName.replace('.html', '.png');
    await page.screenshot({ 
      path: pngName, 
      fullPage: true 
    });

    // 2. Xuất file PDF
    const pdfName = fileName.replace('.html', '.pdf');
    await page.pdf({
      path: pdfName,
      format: 'A4',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 } 
    });

    console.log(`✅ Đã xuất xong: ${pngName} và ${pdfName}`);
    
    // Đóng tab hiện tại để giải phóng RAM cho file tiếp theo
    await page.close();
  }

  await browser.close();
  console.log('🎉 Hoàn tất càn quét toàn bộ file HTML!');
})();