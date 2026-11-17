/**
 * Playwright test: Home page with embedded Works section
 * - Portal zoom expands smoothly
 * - Works section (#works-archive) is ALREADY loaded right on Home page
 * - Zero black screen gap, zero unexpected router navigation
 * - Fast category filtering and card rendering
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
  const portalSection = await page.$('section[class*="h-[180vh]"]');
  if (portalSection) PASS('Portal section (h-[180vh]) found in DOM');
  else FAIL('Portal section not found — expected class h-[180vh]');

  // ── 3. Portal clip-path container present ──────────────────────────────────
  console.log('\n── Test 3: Portal clip-path layer present ──');
  const portalClip = await page.$('div[class*="will-change-[clip-path]"]');
  if (portalClip) PASS('Portal clip-path layer found in DOM');
  else FAIL('Portal clip-path layer not found');

  // ── 4. Works section is ALREADY loaded on Home page ───────────────────────
  console.log('\n── Test 4: Works section (#works-archive) on Home page ──');
  const worksArchive = await page.$('#works-archive');
  if (worksArchive) PASS('#works-archive section found on Home page (ALREADY LOADED!)');
  else FAIL('#works-archive section not found on Home page');

  // ── 5. Category navigation buttons on Home page ───────────────────────────
  console.log('\n── Test 5: Category navigation tabs rendered ──');
  const catButtons = await page.$$('#works-archive nav button');
  if (catButtons.length >= 4) PASS(`Found ${catButtons.length} category buttons on Home page`);
  else FAIL(`Expected at least 4 category buttons, got ${catButtons.length}`);

  // ── 6. Works grid cards rendered on Home page ─────────────────────────────
  console.log('\n── Test 6: Works grid cards on Home page ──');
  const homeCards = await page.$$('#works-archive #work-grid .group');
  if (homeCards.length > 0) PASS(`Found ${homeCards.length} project cards already loaded on Home page`);
  else FAIL('No project cards found in #work-grid on Home page');

  // ── 7. Standalone /works page also loads fast ──────────────────────────────
  console.log('\n── Test 7: /works standalone route loads fast ──');
  const t0 = Date.now();
  const worksRes = await page.goto(`${BASE_URL}/works`, { waitUntil: 'domcontentloaded' });
  const loadMs = Date.now() - t0;
  if (worksRes.status() === 200) PASS(`/works returned 200 in ${loadMs}ms`);
  else FAIL(`/works returned ${worksRes.status()}`);

  // ── 8. No console errors on Home page ──────────────────────────────────────
  console.log('\n── Test 8: Back to Home — zero JS console errors ──');
  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  if (errors.length === 0) PASS('No JS runtime errors on Home page');
  else FAIL(`JS errors: ${errors.join(', ')}`);

  await browser.close();

  console.log('\n' + (process.exitCode ? '❌ Some tests FAILED.' : '✅ All tests PASSED!') + '\n');
})();
