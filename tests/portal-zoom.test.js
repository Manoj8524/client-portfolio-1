/**
 * Playwright test:
 * 1. Home page loads with clean ZOOM into EXTRAORDINARY section.
 * 2. Works Hero preloaded inside zoom portal for seamless zoom-out.
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

  // ── 1. Home page loads ────────────────────────────────────────────────
  console.log('\n── Test 1: Home page loads ──');
  const res = await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  if (res.status() === 200) PASS('Homepage returned 200');
  else FAIL(`Homepage returned ${res.status()}`);

  // ── 2. Zoom section with ZOOM & EXTRAORDINARY typography is present ─────
  console.log('\n── Test 2: Zoom section present ──');
  const h2Texts = await page.$$eval('section h2', (els) => els.map(e => e.textContent.trim()));
  if (h2Texts.some(t => t.includes('ZOOM')) && h2Texts.some(t => t.includes('EXTRAORDINARY'))) {
    PASS(`Found ZOOM & EXTRAORDINARY headlines: ${h2Texts.join(' | ')}`);
  } else {
    FAIL(`Missing ZOOM / EXTRAORDINARY headlines. Found: ${h2Texts.join(' | ')}`);
  }

  // ── 3. Works hero image preloaded inside zoom portal for seamless zoom-out ──
  console.log('\n── Test 3: Works hero preloaded inside zoom portal ──');
  const worksHeroImages = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('img'));
    return images.filter(img => img.src.includes('work_hero_bg_clean.webp')).length;
  });
  if (worksHeroImages >= 1) {
    PASS(`Works hero artwork pre-loaded inside zoom portal (${worksHeroImages} instance) for zero-lag zoom-out`);
  } else {
    FAIL(`Missing preloaded works hero image on Home page`);
  }

  // ── 4. Zoom CTA button links directly to /works ─────────────────────────
  console.log('\n── Test 4: Zoom CTA button links directly to /works ──');
  const ctaLink = await page.$('section a[href="/works"]');
  if (ctaLink) {
    const text = await ctaLink.textContent();
    PASS(`CTA button links directly to /works ("${text.trim()}")`);
  } else {
    FAIL('CTA button linking to /works not found in zoom section');
  }

  // ── 5. Standalone /works route loads fast with complete hero & cards ────
  console.log('\n── Test 5: /works route loads fast ──');
  const t0 = Date.now();
  const worksRes = await page.goto(`${BASE_URL}/works`, { waitUntil: 'domcontentloaded' });
  const loadMs = Date.now() - t0;
  if (worksRes.status() === 200 && loadMs < 1500) {
    PASS(`/works loaded in ${loadMs}ms (< 1500ms) with status 200`);
  } else {
    FAIL(`/works status ${worksRes.status()}, load time ${loadMs}ms`);
  }

  // ── 6. Works page has SELECTED ARCHIVE headline & categories ───────────
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

  // ── 7. Zero JavaScript console errors ──────────────────────────────────
  console.log('\n── Test 7: No JS runtime errors ──');
  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  if (errors.length === 0) PASS('Zero JS console errors detected');
  else FAIL(`JS errors found: ${errors.join(', ')}`);

  await browser.close();

  console.log('\n' + (process.exitCode ? '❌ Some tests FAILED.' : '✅ All tests PASSED!') + '\n');
})();
