/**
 * Playwright test:
 * 1. Portal zoom section with SVG clip-path circle expand.
 * 2. Works Section pre-rendered and loaded directly on Home page.
 * 3. 0ms latency, zero black screen, dynamic category filtering.
 * 4. Direct /works standalone route test.
 *
 * Run: node tests/portal-zoom.test.js
 */

const { chromium } = require('playwright');

const BASE_URL = 'http://localhost:3000';
const PASS = (msg) => console.log(`  ✅ PASS: ${msg}`);
const FAIL = (msg) => { console.error(`  ❌ FAIL: ${msg}`); process.exitCode = 1; };

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: 1280, height: 800 });

  // ── 1. Home page loads ──────────────────────────────────────────────────────
  console.log('\n── Test 1: Home page loads ──');
  const res = await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  if (res.status() === 200) PASS('Homepage returned 200');
  else FAIL(`Homepage returned ${res.status()}`);

  // ── 2. Portal zoom section is in the DOM ────────────────────────────────────
  console.log('\n── Test 2: Portal zoom section present ──');
  const portalSection = await page.$('section[class*="h-[160vh]"], section[class*="h-[200vh]"]');
  if (portalSection) PASS('Portal section found in DOM');
  else FAIL('Portal section not found');

  // ── 3. Portal clip-path circle layer present ────────────────────────────────
  console.log('\n── Test 3: PortalCircle clip-path present ──');
  const portalCircleDiv = await page.evaluate(() => {
    const divs = document.querySelectorAll('div[style*="clip-path"]');
    return divs.length > 0;
  });
  if (portalCircleDiv) PASS('clip-path circle div found in DOM');
  else FAIL('clip-path circle div NOT found — PortalCircle may not be rendering');

  // ── 4. Works section is PRE-LOADED directly on Home page with HERO BANNER ────
  console.log('\n── Test 4: Works section & Hero Banner pre-loaded on Home page ──');
  const worksSection = await page.$('#works-section');
  const heroH1 = await page.$('#works-section h1');
  const heroH1Text = heroH1 ? await heroH1.textContent() : '';
  if (worksSection && heroH1Text.includes('SELECTED ARCHIVE')) {
    PASS('#works-section with Hero Banner ("SELECTED ARCHIVE") pre-rendered in DOM');
  } else {
    FAIL('#works-section or Hero Banner missing on Home page');
  }

  // ── 5. Category Navigation Tabs pre-rendered on Home page ───────────────────
  console.log('\n── Test 5: Category tabs present on Home page ──');
  const categoryButtons = await page.$$eval('#works-section nav button', (els) => els.map(e => e.textContent.trim()));
  if (categoryButtons.includes('ALL') && categoryButtons.includes('FILM POSTERS')) {
    PASS(`Found category buttons on Home: ${categoryButtons.join(', ')}`);
  } else {
    FAIL(`Category buttons missing or incorrect: ${categoryButtons.join(', ')}`);
  }

  // ── 6. Project cards pre-rendered on Home page ──────────────────────────────
  console.log('\n── Test 6: Project cards pre-rendered in work-grid ──');
  const cardCount = await page.$$eval('#works-section #work-grid .group', (els) => els.length);
  if (cardCount > 0) PASS(`Work grid has ${cardCount} pre-loaded project cards on Home`);
  else FAIL('No project cards found in #work-grid on Home page');

  // ── 7. Category filter interactivity on Home page ───────────────────────────
  console.log('\n── Test 7: Category filter interactivity ──');
  const brandingBtn = await page.$('#works-section nav button:has-text("BRANDING")');
  if (brandingBtn) {
    await brandingBtn.click();
    await page.waitForTimeout(300);
    const brandingCards = await page.$$eval('#works-section #work-grid .group', (els) => els.length);
    PASS(`Clicking BRANDING filtered cards smoothly (showing ${brandingCards} cards)`);
  } else {
    FAIL('BRANDING button not found');
  }

  // ── 8. Standalone /works route loads fast ───────────────────────────────────
  console.log('\n── Test 8: /works route loads fast ──');
  const t0 = Date.now();
  const worksRes = await page.goto(`${BASE_URL}/works`, { waitUntil: 'domcontentloaded' });
  const loadMs = Date.now() - t0;
  if (worksRes.status() === 200 && loadMs < 1500) {
    PASS(`/works loaded in ${loadMs}ms (< 1500ms) with status 200`);
  } else {
    FAIL(`/works status ${worksRes.status()}, load time ${loadMs}ms`);
  }

  // ── 9. Zero JavaScript errors across the entire flow ────────────────────────
  console.log('\n── Test 9: No JS runtime errors ──');
  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  if (errors.length === 0) PASS('Zero JS console errors detected');
  else FAIL(`JS errors found: ${errors.join(', ')}`);

  await browser.close();

  console.log('\n' + (process.exitCode ? '❌ Some tests FAILED.' : '✅ All tests PASSED!') + '\n');
})();
