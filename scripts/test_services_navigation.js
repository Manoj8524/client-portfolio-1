const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('--- 1. Testing Services click while on /works ---');
  await page.goto('http://localhost:3000/works', { waitUntil: 'networkidle' });
  
  // Initially at top
  const initialScrollY = await page.evaluate(() => window.scrollY);
  console.log('Initial scrollY on /works:', initialScrollY);

  // Hover Services button
  const servicesBtn = page.locator('button:has-text("Services")');
  await servicesBtn.hover();
  await page.waitForTimeout(300);

  // Click 'Film Poster Design'
  const filmPosterLink = page.locator('a:has-text("Film Poster Design")').first();
  await filmPosterLink.click();
  await page.waitForTimeout(800);

  const scrollYAfterFilm = await page.evaluate(() => window.scrollY);
  console.log('scrollY after clicking Film Poster Design:', scrollYAfterFilm);
  console.log('Did it scroll down?:', scrollYAfterFilm > 200);

  // Check active tab button styling
  const activeTabText = await page.locator('#works-category-tabs button.text-\\[\\#fec52d\\]').innerText();
  console.log('Active category tab after click:', activeTabText);

  // Now hover Services and click 'Branding'
  await servicesBtn.hover();
  await page.waitForTimeout(300);
  const brandingLink = page.locator('a:has-text("Branding")').first();
  await brandingLink.click();
  await page.waitForTimeout(800);

  const activeTabAfterBranding = await page.locator('#works-category-tabs button.text-\\[\\#fec52d\\]').innerText();
  console.log('Active category tab after clicking Branding:', activeTabAfterBranding);

  console.log('\n--- 2. Testing Services click from Home Page ---');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  const homeServicesBtn = page.locator('button:has-text("Services")');
  await homeServicesBtn.hover();
  await page.waitForTimeout(300);
  
  const homeSocialLink = page.locator('a:has-text("Social Media Creatives")').first();
  await homeSocialLink.click();
  await page.waitForTimeout(1200);

  console.log('Current URL after navigation:', page.url());
  const homeActiveTab = await page.locator('#works-category-tabs button.text-\\[\\#fec52d\\]').innerText();
  console.log('Active tab after arriving from home:', homeActiveTab);
  const scrollYFromHome = await page.evaluate(() => window.scrollY);
  console.log('scrollY after arriving from home:', scrollYFromHome);
  console.log('Did it auto-scroll from home?:', scrollYFromHome > 200);

  await page.screenshot({ path: 'tests/evidence_services_scroll.png' });
  console.log('Screenshot saved to tests/evidence_services_scroll.png');

  await browser.close();
})();
