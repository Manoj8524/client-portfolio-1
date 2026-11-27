const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3000/admin', { waitUntil: 'networkidle' });
  
  // Fill password
  await page.fill('input[type="password"]', 'muthu2026');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(1000);

  console.log('1. Testing Home Page -> Lane Add Poster:');
  // Click Home Page tab
  await page.click('button:has-text("Home Page")');
  await page.waitForTimeout(500);

  // Check Lane 01 before
  const lane1AddBtn = page.locator('#btn-add-poster-lane1');
  console.log('Found #btn-add-poster-lane1:', (await lane1AddBtn.count()) > 0);
  
  await lane1AddBtn.click();
  await page.waitForTimeout(500);

  const lane1PostersText = await page.locator('text=Lane 01').locator('..').innerText();
  console.log('Lane 01 updated info:', lane1PostersText.replace(/\n/g, ' '));

  console.log('\n2. Testing Works Portfolio -> Add Poster & Add Project:');
  await page.click('button:has-text("Works Portfolio")');
  await page.waitForTimeout(500);

  const addWorkPosterBtn = page.locator('#btn-add-work-poster');
  console.log('Found #btn-add-work-poster in Works Manager:', (await addWorkPosterBtn.count()) > 0);

  await addWorkPosterBtn.click();
  await page.waitForTimeout(500);

  // Check first project title input
  const firstProjectTitle = await page.locator('input[value="New Film Poster Project"]').count();
  console.log('Found newly added film poster project input:', firstProjectTitle > 0);

  await page.screenshot({ path: 'tests/evidence_add_poster_working.png' });
  console.log('Screenshot saved to tests/evidence_add_poster_working.png');

  await browser.close();
})();
