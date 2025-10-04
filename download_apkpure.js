const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  try {
    const url = 'https://apkpure.com/cn/lovelive/com.oddno.lovelive/download?from=details';
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // 模拟普通浏览器
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36');

    console.log("Opening APKPure page...");
    await page.goto(url, { waitUntil: 'networkidle2' });

    // 等待下载按钮出现
    await page.waitForSelector('a.da');
    const downloadUrl = await page.$eval('a.da', el => el.href);
    console.log('Final download URL:', downloadUrl);

    // 下载 XAPK
    const viewSource = await page.goto(downloadUrl);
    fs.writeFileSync('app.xapk', await viewSource.buffer());
    console.log('Downloaded app.xapk successfully!');

    await browser.close();
  } catch (err) {
    console.error('Error downloading app.xapk:', err);
    process.exit(1);
  }
})();
