const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  for (const path of ['/', '/works', '/about', '/contact']) {
    await page.goto('http://localhost:3000' + path, { waitUntil: 'networkidle' });
    const headerClass = await page.$eval('header', el => el.className);
    const isTransparent = headerClass.includes('bg-transparent');
    console.log(path, 'Header is bg-transparent:', isTransparent);
    await page.screenshot({ path: 'tests/header_' + path.replace(/\//g, '_') + '.png' });
  }

  // Also test scroll on /works
  await page.goto('http://localhost:3000/works', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, 100));
  await page.waitForTimeout(300);
  const scrolledHeaderClass = await page.$eval('header', el => el.className);
  console.log('/works Scrolled Header has backdrop-blur & bg-black:', scrolledHeaderClass.includes('bg-black/90'));
  
  await browser.close();
})();
