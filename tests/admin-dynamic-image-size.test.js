const { chromium } = require('playwright');

(async () => {
  console.log('🚀 Starting Playwright test: Admin Dynamic Image Size & Aspect Ratio...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.context().addCookies([{
    name: 'muthu_admin_session',
    value: 'muthu_secure_admin_token_2026',
    domain: 'localhost',
    path: '/'
  }]);

  // 1. Visit Admin Dashboard
  await page.goto('http://localhost:3000/admin', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('button:has-text("Home Page")', { timeout: 15000 });
  console.log('✓ Loaded /admin and dashboard ready');

  // 2. Click Home Page Tab
  await page.click('button:has-text("Home Page")');
  await page.waitForTimeout(500);

  // Check Home Page Tab -> Hero Poster Ratio
  const heroSelect = await page.$('#hero-poster-aspect-ratio-select');
  if (!heroSelect) {
    throw new Error('FAILED: #hero-poster-aspect-ratio-select not found on Home tab!');
  }
  const heroCurrentVal = await heroSelect.inputValue();
  console.log(`✓ Found Hero Poster Aspect Ratio select with value: ${heroCurrentVal}`);

  // 3. Switch to Works Portfolio Tab
  await page.click('button:has-text("Works Portfolio")');
  await page.waitForTimeout(500);

  // 4. Check Global Works Grid Ratio Select
  const gridSelect = await page.$('#global-grid-aspect-ratio-select');
  if (!gridSelect) {
    throw new Error('FAILED: #global-grid-aspect-ratio-select not found on Works tab!');
  }
  const gridCurrentVal = await gridSelect.inputValue();
  console.log(`✓ Found Global Works Grid Aspect Ratio select with value: ${gridCurrentVal}`);

  // 5. Change Global Grid Ratio to 4/5 dynamically
  await gridSelect.selectOption('4/5');
  console.log('✓ Changed Global Grid Ratio to "4/5" in Admin');

  // 6. Click Save Changes button
  let saveBtn = null;
  const allBtns = await page.$$('button');
  for (const b of allBtns) {
    const text = await b.textContent();
    if (text && (text.includes('Save') || text.includes('SAVE'))) {
      saveBtn = b;
      break;
    }
  }
  if (saveBtn) {
    await saveBtn.click();
    console.log('✓ Clicked Save Changes button in Admin');
    await page.waitForTimeout(1500);
  }

  // 7. Navigate to /works to verify dynamic aspect ratio in real DOM
  await page.goto('http://localhost:3000/works', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  console.log('✓ Navigated to /works to verify dynamic aspect ratio');

  const worksCardRatio = await page.evaluate(() => {
    const card = document.querySelector('#work-grid .group');
    if (!card) return null;
    const computed = window.getComputedStyle(card);
    const rect = card.getBoundingClientRect();
    return {
      styleAspectRatio: card.style.aspectRatio,
      computedAspectRatio: computed.aspectRatio,
      width: rect.width,
      height: rect.height,
      computedRatio: (rect.width / rect.height).toFixed(2)
    };
  });
  console.log('✓ Works page card metrics:', worksCardRatio);

  const normalizedRatio = (worksCardRatio?.styleAspectRatio || '').replace(/\s+/g, '');
  if (normalizedRatio !== '4/5') {
    throw new Error(`FAILED: Expected card aspect ratio to be "4/5", got "${worksCardRatio ? worksCardRatio.styleAspectRatio : 'null'}"`);
  }
  console.log('🎉 Verified dynamic aspect ratio correctly rendered on public /works page!');

  // 8. Revert back to 2/3 and save so site stays at original requested state
  await page.goto('http://localhost:3000/admin', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('button:has-text("Works Portfolio")', { timeout: 15000 });
  await page.click('button:has-text("Works Portfolio")');
  await page.waitForTimeout(500);
  const revertSelect = await page.$('#global-grid-aspect-ratio-select');
  if (revertSelect) {
    await revertSelect.selectOption('2/3');
    for (const b of await page.$$('button')) {
      const text = await b.textContent();
      if (text && (text.includes('Save') || text.includes('SAVE'))) {
        await b.click();
        break;
      }
    }
    await page.waitForTimeout(1500);
    console.log('✓ Reverted to default 2/3 ratio and saved cleanly.');
  }

  await browser.close();
  console.log('✅ ALL PLAYWRIGHT CHECKS PASSED SUCCESSFULLY!');
  process.exit(0);
})().catch(err => {
  console.error('❌ TEST FAILED:', err);
  process.exit(1);
});
