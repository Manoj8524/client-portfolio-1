const { chromium } = require('playwright');

(async () => {
  console.log('🚀 Starting Playwright test: Brands Ticker Custom Size Controls...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.context().addCookies([{
    name: 'muthu_admin_session',
    value: 'muthu_secure_admin_token_2026',
    domain: 'localhost',
    path: '/'
  }]);

  // 1. Visit Admin
  await page.goto('http://localhost:3000/admin', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('button:has-text("Home Page")', { timeout: 15000 });
  console.log('✓ Admin dashboard ready');

  // 2. Click Home Page Tab and wait for content fetch to settle
  await page.click('button:has-text("Home Page")');
  await page.waitForSelector('#preset-brand-height-200', { timeout: 10000 });
  await page.waitForTimeout(2000); // Allow initial fetchContent() to completely resolve
  console.log('✓ Content fetched and ready for interaction');

  // 3. Click Large (200px) preset button via explicit ID
  await page.click('#preset-brand-height-200');
  console.log('✓ Clicked "#preset-brand-height-200" button in Admin');
  await page.waitForTimeout(600);

  // Verify the input updated to 200
  const updatedVal = await page.$eval('#brand-image-height-number', el => el.value);
  console.log(`✓ Brand image height input now shows: ${updatedVal}px`);
  if (updatedVal !== '200') {
    throw new Error(`FAILED: Expected input value 200, got ${updatedVal}`);
  }

  // 4. Click Save All Edits button
  const saveBtn = await page.waitForSelector('button:has-text("Save All Edits")', { timeout: 10000 });
  await saveBtn.click();
  console.log('✓ Clicked Save All Edits button');
  await page.waitForTimeout(2000);

  // 5. Navigate to Home Page to verify dynamic size on public frontend
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#brands-ticker-strip-1', { timeout: 15000 });
  await page.waitForTimeout(1000);

  const brandStripMetrics = await page.evaluate(() => {
    const strip = document.querySelector('#brands-ticker-strip-1');
    if (!strip) return null;
    const rect = strip.getBoundingClientRect();
    const computed = window.getComputedStyle(strip);
    return {
      computedHeight: computed.height,
      rectHeight: Math.round(rect.height)
    };
  });
  console.log('✓ Public Home page brand strip metrics:', brandStripMetrics);

  if (brandStripMetrics.rectHeight !== 200) {
    throw new Error(`FAILED: Expected brand strip height 200px, got ${brandStripMetrics.rectHeight}px (${brandStripMetrics.computedHeight})`);
  }
  console.log('🎉 Verified Brands Ticker image size rendered dynamically at 200px on Home page!');

  // 6. Revert to 160px in Admin to keep clean default
  await page.goto('http://localhost:3000/admin', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('button:has-text("Home Page")', { timeout: 15000 });
  await page.click('button:has-text("Home Page")');
  await page.waitForTimeout(800);

  const preset160Btn = await page.$('#preset-brand-height-160');
  if (preset160Btn) {
    await preset160Btn.click();
    await page.waitForTimeout(500);
    const saveBtnRevert = await page.waitForSelector('button:has-text("Save All Edits")');
    await saveBtnRevert.click();
    await page.waitForTimeout(2000);
    console.log('✓ Cleanly reverted brand logo height to 160px default.');
  }

  await browser.close();
  console.log('✅ ALL BRANDS TICKER PLAYWRIGHT CHECKS PASSED SUCCESSFULLY!');
  process.exit(0);
})().catch(err => {
  console.error('❌ TEST FAILED:', err);
  process.exit(1);
});
