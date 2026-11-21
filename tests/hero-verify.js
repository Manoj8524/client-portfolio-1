const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // 1. Verify poster lanes animation speed
  const lanes = await page.evaluate(() => {
    const laneEls = Array.from(document.querySelectorAll('[class*="animate-scroll-lane-"]'));
    return laneEls.map(el => {
      const style = window.getComputedStyle(el);
      return {
        className: el.className,
        animationDuration: style.animationDuration,
        animationTimingFunction: style.animationTimingFunction,
      };
    });
  });
  console.log('Hero Lanes Animation:');
  lanes.forEach((l, i) => console.log(`  Lane ${i+1}: duration=${l.animationDuration}, timing=${l.animationTimingFunction}`));

  // 2. Verify poster aspect ratio class
  const posterClasses = await page.evaluate(() => {
    const posters = Array.from(document.querySelectorAll('.group\\/poster'));
    return {
      count: posters.length,
      sampleClass: posters[0]?.className,
      sampleWidth: posters[0]?.clientWidth,
      sampleHeight: posters[0]?.clientHeight,
      ratio: posters[0] ? (posters[0].clientWidth / posters[0].clientHeight).toFixed(2) : null
    };
  });
  console.log('Poster cards format:', posterClasses);

  // 3. Verify Zoom portal text and backdrop
  const zoomInfo = await page.evaluate(() => {
    const h2s = Array.from(document.querySelectorAll('h2')).filter(h => h.textContent.includes('ZOOM') || h.textContent.includes('EXTRAORDINARY'));
    const container = h2s[0]?.closest('section');
    const ps = container ? Array.from(container.querySelectorAll('p')).map(p => p.textContent.trim()) : [];
    const bgImg = container ? container.querySelector('img[alt*="Portal"]')?.getAttribute('src') : null;
    return {
      ps,
      bgImg
    };
  });
  console.log('Zoom section verification:', zoomInfo);

  await browser.close();

  const allSameDuration = lanes.length === 5 && lanes.every(l => l.animationDuration === lanes[0].animationDuration);
  if (!allSameDuration) {
    console.error('❌ FAIL: Not all lanes have the same duration!');
    process.exit(1);
  } else {
    console.log(`✅ PASS: All 5 lanes have uniform speed (${lanes[0].animationDuration})!`);
  }

  if (!posterClasses.sampleClass.includes('aspect-[4/5]')) {
    console.error('❌ FAIL: Posters do not have aspect-[4/5]!');
    process.exit(1);
  } else {
    console.log('✅ PASS: Posters have social media aspect-[4/5] (ratio ~0.80)!');
  }

  console.log('✅ All checks passed successfully!');
})();
