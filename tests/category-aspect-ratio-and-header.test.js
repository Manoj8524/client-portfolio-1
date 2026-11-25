const { chromium } = require('playwright');

(async () => {
  console.log('🚀 Starting Playwright test: Category Aspect Ratio & Works Header...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  // 1. Visit /works and verify solid Navbar & Category bar backgrounds
  await page.goto('http://localhost:3000/works', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('header', { timeout: 15000 });
  await page.waitForTimeout(1000);

  const headerBg = await page.evaluate(() => {
    const header = document.querySelector('header');
    return header ? window.getComputedStyle(header).backgroundColor : null;
  });
  console.log(`✓ Works page Header Background Color: ${headerBg}`);
  if (headerBg !== 'rgb(0, 0, 0)') {
    throw new Error(`FAILED: Expected header background on /works to be rgb(0, 0, 0), got "${headerBg}"`);
  }

  // 2. Scroll down 500px and verify header remains solid rgb(0, 0, 0)
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(800);

  const scrolledHeaderBg = await page.evaluate(() => {
    const header = document.querySelector('header');
    return header ? window.getComputedStyle(header).backgroundColor : null;
  });
  console.log(`✓ Scrolled Works page Header Background Color: ${scrolledHeaderBg}`);
  if (scrolledHeaderBg !== 'rgb(0, 0, 0)') {
    throw new Error(`FAILED: Expected scrolled header background to be rgb(0, 0, 0), got "${scrolledHeaderBg}"`);
  }

  // 3. Authenticate and visit Admin
  await page.context().addCookies([{
    name: 'muthu_admin_session',
    value: 'muthu_secure_admin_token_2026',
    domain: 'localhost',
    path: '/'
  }]);

  await page.goto('http://localhost:3000/admin', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('button:has-text("Works Portfolio")', { timeout: 15000 });
  console.log('✓ Admin dashboard loaded');

  // 4. Click Works Portfolio Tab
  await page.click('button:has-text("Works Portfolio")');
  await page.waitForTimeout(800);

  // 5. Test Category Ratio Selectors
  const brandingSelect = await page.$('#category-ratio-select-branding');
  const filmPostersSelect = await page.$('#category-ratio-select-film-posters');
  const socialSelect = await page.$('#category-ratio-select-social-media-creatives');

  if (!brandingSelect || !filmPostersSelect || !socialSelect) {
    throw new Error('FAILED: One or more category ratio select dropdowns not found in Admin!');
  }
  console.log('✓ Found all Category-specific Aspect Ratio dropdowns in Admin');

  // Change BRANDING to 16/9 and FILM POSTERS to 2/3
  await brandingSelect.selectOption('16/9');
  await filmPostersSelect.selectOption('2/3');
  console.log('✓ Configured BRANDING -> 16/9 and FILM POSTERS -> 2/3');

  // 6. Save in Admin
  const allBtns = await page.$$('button');
  for (const b of allBtns) {
    const text = await b.textContent();
    if (text && (text.includes('Save') || text.includes('SAVE'))) {
      await b.click();
      console.log('✓ Clicked Save Changes button in Admin');
      break;
    }
  }
  await page.waitForTimeout(1500);

  // 7. Verify /works?category=BRANDING
  await page.goto('http://localhost:3000/works?category=BRANDING', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#work-grid .group', { timeout: 15000 });
  await page.waitForTimeout(1000);

  const brandingCardMetrics = await page.evaluate(() => {
    const card = document.querySelector('#work-grid .group');
    if (!card) return null;
    const rect = card.getBoundingClientRect();
    return {
      styleAspectRatio: card.style.aspectRatio,
      width: rect.width,
      height: rect.height,
      ratio: (rect.width / rect.height).toFixed(2)
    };
  });
  console.log('✓ BRANDING Card Metrics on /works:', brandingCardMetrics);
  const normalizedBrandingRatio = (brandingCardMetrics?.styleAspectRatio || '').replace(/\s+/g, '');
  if (normalizedBrandingRatio !== '16/9') {
    throw new Error(`FAILED: Expected BRANDING card aspect ratio "16/9", got "${brandingCardMetrics?.styleAspectRatio}"`);
  }
  console.log('🎉 Verified BRANDING category renders with 16:9 aspect ratio!');

  // 8. Verify /works?category=FILM+POSTERS
  await page.goto('http://localhost:3000/works?category=FILM+POSTERS', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#work-grid .group', { timeout: 15000 });
  await page.waitForTimeout(1000);

  const filmCardMetrics = await page.evaluate(() => {
    const card = document.querySelector('#work-grid .group');
    if (!card) return null;
    const rect = card.getBoundingClientRect();
    return {
      styleAspectRatio: card.style.aspectRatio,
      width: rect.width,
      height: rect.height,
      ratio: (rect.width / rect.height).toFixed(2)
    };
  });
  console.log('✓ FILM POSTERS Card Metrics on /works:', filmCardMetrics);
  const normalizedFilmRatio = (filmCardMetrics?.styleAspectRatio || '').replace(/\s+/g, '');
  if (normalizedFilmRatio !== '2/3') {
    throw new Error(`FAILED: Expected FILM POSTERS card aspect ratio "2/3", got "${filmCardMetrics?.styleAspectRatio}"`);
  }
  console.log('🎉 Verified FILM POSTERS category renders with 2:3 aspect ratio!');

  await browser.close();
  console.log('✅ ALL CHECKS PASSED SUCCESSFULLY!');
  process.exit(0);
})().catch(err => {
  console.error('❌ TEST FAILED:', err);
  process.exit(1);
});
