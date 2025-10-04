const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  // 模拟普通浏览器
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64)');

  // 直接访问 /b/XAPK/... 链接
  const response = await page.goto('https://d.apkpure.com/b/XAPK/com.oddno.lovelive?version=latest', {
    waitUntil: 'networkidle2'
  });

  // Puppeteer 会自动跟随 302 重定向到真实 XAPK
  const buffer = await response.buffer();
  fs.writeFileSync('app.xapk', buffer);

  console.log('Downloaded XAPK without clicking!');
  await browser.close();
})();