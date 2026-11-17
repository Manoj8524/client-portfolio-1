/**
 * Playwright test:
 * 1. Home page loads with clean ZOOM into EXTRAORDINARY section.
 * 2. No duplicate hero image on Home page.
 * 3. CTA button links directly to /works.
 * 4. Dedicated /works route loads fast with complete hero banner and cards.
 * 5. Zero JS errors.
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

  // ── 2. Zoom section with ZOOM & EXTRAORDINARY typography is present ─────────
  console.log('\n── Test 2: Zoom section present ──');
  const h2Texts = await page.$$eval('section h2', (els) => els.map(e => e.textContent.trim()));
  if (h2Texts.some(t => t.includes('ZOOM')) && h2Texts.some(t => t.includes('EXTRAORDINARY'))) {
    PASS(`Found ZOOM & EXTRAORDINARY headlines: ${h2Texts.join(' | ')}`);
  } else {
    FAIL(`Missing ZOOM / EXTRAORDINARY headlines. Found: ${h2Texts.join(' | ')}`);
  }

  // ── 3. Works hero image mounted cleanly on Home page (exactly 1, no duplicates) ───
  console.log('\n── Test 3: Works hero image cleanly mounted ──');
  const heroImageCount = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('img'));
    return images.filter(img => img.src.includes('work_hero_bg_clean.webp')).length;
  });
  if (heroImageCount === 1) {
    PASS('Exactly 1 Works hero image pre-loaded in portal reveal (no duplicates)');
  } else {
    FAIL(`Found ${heroImageCount} works hero images on Home page (expected 1)`);
  }

  // ── 4. Zoom CTA button present ──────────────────────────────────────────────
  console.log('\n── Test 4: Zoom CTA button present ──');
  const ctaBtn = await page.$('#works-portal-section button, #works-portal-section a');
  if (ctaBtn) {
    const text = await ctaBtn.textContent();
    PASS(`CTA button found in zoom section ("${text.trim()}")`);
  } else {
    FAIL('CTA button not found in zoom section');
  }

  // ── 4b. Pre-loaded Works Archive present on Home page with zero lag ─────────
  console.log('\n── Test 4b: Pre-loaded Works archive on Home page ──');
  const homeCategories = await page.$$eval('#works-section nav button', els => els.length);
  const homeProjects = await page.$$eval('#works-section #work-grid .group', els => els.length);
  if (homeCategories >= 5 && homeProjects >= 10) {
    PASS(`Home page has ${homeCategories} categories and ${homeProjects} pre-loaded projects`);
  } else {
    FAIL(`Home page works archive incomplete: ${homeCategories} categories, ${homeProjects} projects`);
  }

  // ── 5. Standalone /works route loads fast with complete hero & cards ────────
  console.log('\n── Test 5: /works route loads fast ──');
  const t0 = Date.now();
  const worksRes = await page.goto(`${BASE_URL}/works`, { waitUntil: 'domcontentloaded' });
  const loadMs = Date.now() - t0;
  if (worksRes.status() === 200 && loadMs < 1500) {
    PASS(`/works loaded in ${loadMs}ms (< 1500ms) with status 200`);
  } else {
    FAIL(`/works status ${worksRes.status()}, load time ${loadMs}ms`);
  }

  // ── 6. Works page has SELECTED ARCHIVE headline & categories ────────────────
  console.log('\n── Test 6: Works page content verified ──');
  const worksH1 = await page.$eval('h1', el => el.textContent.trim());
  if (worksH1.includes('SELECTED ARCHIVE')) {
    PASS(`Works page h1: "${worksH1}"`);
  } else {
    FAIL(`Unexpected Works h1: "${worksH1}"`);
  }

  const categoryCount = await page.$$eval('nav button', els => els.length);
  if (categoryCount >= 5) {
    PASS(`Found ${categoryCount} category filter buttons`);
  } else {
    FAIL(`Expected at least 5 category buttons, found ${categoryCount}`);
  }

  const projectCards = await page.$$eval('#work-grid .group', els => els.length);
  if (projectCards > 0) {
    PASS(`Found ${projectCards} portfolio project cards in #work-grid`);
  } else {
    FAIL('Zero project cards found in #work-grid');
  }

  // ── 7. Zero JavaScript console errors ───────────────────────────────────────
  console.log('\n── Test 7: No JS runtime errors ──');
  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  if (errors.length === 0) PASS('Zero JS console errors detected');
  else FAIL(`JS errors found: ${errors.join(', ')}`);

  await browser.close();

  console.log('\n' + (process.exitCode ? '❌ Some tests FAILED.' : '✅ All tests PASSED!') + '\n');
})();
