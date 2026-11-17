/**
 * Playwright test: Portal zoom section — scroll-driven clip-path circle expand,
 * and fast /works page navigation after portal animation.
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

  // ── 2. Portal section is in the DOM ────────────────────────────────────────
  console.log('\n── Test 2: Portal zoom section present ──');
  const portalSection = await page.$('section[class*="h-[260vh]"]');
  if (portalSection) PASS('Portal section (h-[260vh]) found in DOM');
  else FAIL('Portal section not found — expected class h-[260vh]');

  // ── 3. No pixelated font zoom (no galaxyZoom scale transform on huge text) ──
  console.log('\n── Test 3: No text-zoom scale element ──');
  // The old code had an element with inline style containing "scale(75)" at peak.
  // We verify the section does NOT contain the old zooming text div with scale transform.
  const zoomingText = await page.evaluate(() => {
    const sections = document.querySelectorAll('section');
    for (const s of sections) {
      const motionDivs = s.querySelectorAll('[style*="scale"]');
      for (const d of motionDivs) {
        if (d.textContent && d.textContent.includes('ZOOM')) return true;
      }
    }
    return false;
  });
  if (!zoomingText) PASS('Old pixelated ZOOM text element is gone');
  else FAIL('Old ZOOM text element still present — may cause pixelation');

  // ── 4. Portal clip-path circle layer present ────────────────────────────────
  console.log('\n── Test 4: PortalCircle div present ──');
  const portalCircleDiv = await page.evaluate(() => {
    const divs = document.querySelectorAll('div[style*="clip-path"]');
    return divs.length > 0;
  });
  if (portalCircleDiv) PASS('clip-path circle div found in DOM');
  else FAIL('clip-path circle div NOT found — PortalCircle may not be rendering');

  // ── 5. Works page loads fast (< 1500ms) ─────────────────────────────────────
  console.log('\n── Test 5: /works page loads fast ──');
  const t0 = Date.now();
  const worksRes = await page.goto(`${BASE_URL}/works`, { waitUntil: 'domcontentloaded' });
  const loadMs = Date.now() - t0;
  if (worksRes.status() === 200) PASS(`/works returned 200 in ${loadMs}ms`);
  else FAIL(`/works returned ${worksRes.status()}`);
  if (loadMs < 1500) PASS(`/works loaded in ${loadMs}ms (< 1500ms)`);
  else FAIL(`/works too slow: ${loadMs}ms`);

  // ── 6. Works hero section present ────────────────────────────────────────────
  console.log('\n── Test 6: Works hero section present ──');
  await page.waitForSelector('h1', { timeout: 5000 });
  const heroText = await page.$eval('h1', (el) => el.textContent?.trim() || '');
  if (heroText.length > 0) PASS(`Works hero h1: "${heroText}"`);
  else FAIL('Works hero h1 is empty');

  // ── 7. Works grid has items ──────────────────────────────────────────────────
  console.log('\n── Test 7: Works grid renders cards ──');
  const cardCount = await page.$$eval('#work-grid .group', (els) => els.length);
  if (cardCount > 0) PASS(`Work grid has ${cardCount} cards`);
  else FAIL('Work grid is empty');

  // ── 8. No JS console errors ──────────────────────────────────────────────────
  console.log('\n── Test 8: Back to home — no JS errors ──');
  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  if (errors.length === 0) PASS('No JS errors on home page');
  else FAIL(`JS errors: ${errors.join(', ')}`);

  await browser.close();

  console.log('\n' + (process.exitCode ? '❌ Some tests FAILED.' : '✅ All tests PASSED!') + '\n');
})();
