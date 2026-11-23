const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.context().addCookies([{
    name: 'muthu_admin_session',
    value: 'muthu_secure_admin_token_2026',
    domain: 'localhost',
    path: '/'
  }]);

  await page.goto('http://localhost:3000/admin', { waitUntil: 'networkidle' });

  // Click 'Home Page' tab
  const buttons = await page.$$('button');
  for (const b of buttons) {
    const text = await b.textContent();
    if (text && text.includes('Home Page')) {
      await b.click();
      break;
    }
  }
  await page.waitForTimeout(2500);

  const adminImages = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img')).filter(img => 
      img.alt.includes('Poster') || img.alt.includes('Jana') || img.alt.includes('Coolie') || img.alt.includes('Thug') || img.alt.includes('Joji')
    );
    return imgs.slice(0, 8).map(img => ({
      alt: img.alt,
      src: img.src.substring(0, 60),
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      complete: img.complete
    }));
  });
  console.log('Admin poster images preview count:', adminImages.length);
  console.log('Admin sample previews:', adminImages.slice(0, 4));

  await browser.close();

  const allLoaded = adminImages.length > 0 && adminImages.every(i => i.naturalWidth > 0);
  if (allLoaded) {
    console.log('✅ PASS: Admin page successfully displays previews for all poster images!');
  } else {
    console.error('❌ FAIL: Some admin posters failed to render!');
    process.exit(1);
  }
})();
