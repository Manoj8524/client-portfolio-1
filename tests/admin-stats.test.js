const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });

  await page.context().addCookies([{
    name: 'muthu_admin_session',
    value: 'muthu_secure_admin_token_2026',
    domain: 'localhost',
    path: '/'
  }]);

  await page.goto('http://localhost:3000/admin', { waitUntil: 'networkidle' });

  const buttons = await page.$$('button');
  for (const b of buttons) {
    const text = await b.textContent();
    if (text && text.includes('About Page')) {
      await b.click();
      break;
    }
  }
  await page.waitForTimeout(500);

  const statsInfo = await page.evaluate(() => {
    const heading = Array.from(document.querySelectorAll('h3')).find(h => h.textContent.includes('Key Metrics'));
    if (!heading) return { found: false };
    const container = heading.closest('div.p-6');
    const inputs = container ? container.querySelectorAll('input') : [];
    return {
      found: true,
      inputCount: inputs.length,
      containerScrollWidth: container.scrollWidth,
      containerClientWidth: container.clientWidth,
      hasOverflow: container.scrollWidth > container.clientWidth
    };
  });
  console.log('Admin Stats Cards Layout Test:', statsInfo);

  await browser.close();
  if (statsInfo.hasOverflow) {
    console.error('FAILED: container has horizontal overflow!');
    process.exit(1);
  } else {
    console.log('PASSED: zero horizontal overflow!');
  }
})();
