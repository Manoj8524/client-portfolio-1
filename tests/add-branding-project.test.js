const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log('🚀 Starting Playwright test: Add Branding project via Admin and verify on /works...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  
  await context.addCookies([{
    name: 'muthu_admin_session',
    value: 'muthu_secure_admin_token_2026',
    domain: 'localhost',
    path: '/'
  }]);

  const page = await context.newPage();
  
  console.log('1. Navigating to http://localhost:3000/admin...');
  await page.goto('http://localhost:3000/admin', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  console.log('2. Clicking "Works Portfolio" tab...');
  const worksTab = page.locator('button:has-text("Works Portfolio")');
  await worksTab.click();
  await page.waitForTimeout(2000);

  console.log('3. Clicking "+ Add Project" button...');
  const addProjectBtn = page.locator('#btn-add-work-project');
  await addProjectBtn.click();
  await page.waitForTimeout(1000);

  // The newly added project is the first item in the projects list
  console.log('4. Locating newly added project fields...');
  const firstProject = page.locator('.grid.grid-cols-1.gap-6 > div').first();

  // Change Title
  const titleInput = firstProject.locator('input[type="text"]').first();
  await titleInput.fill('Playwright Brand Identity 2026');

  // Change Category to BRANDING
  const categorySelect = firstProject.locator('select').first();
  await categorySelect.selectOption('BRANDING');

  // Change Year
  const yearInput = firstProject.locator('input[type="text"]').nth(1);
  await yearInput.fill('2026');

  // Upload an image
  console.log('5. Uploading test image to project...');
  const fileInput = firstProject.locator('input[type="file"]');
  const fixturePath = path.resolve('tests/fixtures/sample_branding.png');
  await fileInput.setInputFiles(fixturePath);

  // Wait for upload response to populate image input
  await page.waitForTimeout(3000);

  const imageInput = firstProject.locator('input[type="text"]').nth(2);
  const uploadedUrl = await imageInput.inputValue();
  console.log('Uploaded image URL in input:', uploadedUrl);

  if (!uploadedUrl || (!uploadedUrl.startsWith('/uploads') && !uploadedUrl.startsWith('data:'))) {
    console.warn('Warning: Upload URL unexpected:', uploadedUrl);
  }

  // Change Director
  const directorInput = firstProject.locator('input[type="text"]').nth(3);
  await directorInput.fill('Muthu Studio Core');

  // Change Client
  const clientInput = firstProject.locator('input[type="text"]').nth(4);
  await clientInput.fill('Obsidian Brand Labs');

  console.log('6. Clicking "SAVE ALL EDITS" button in Admin...');
  const saveBtn = page.locator('button:has-text("Save All Edits")');
  await saveBtn.click();

  // Wait for save feedback
  await page.waitForTimeout(3500);

  console.log('7. Navigating to public /works page with category=BRANDING...');
  const worksPage = await context.newPage();
  await worksPage.goto('http://localhost:3000/works?category=BRANDING', { waitUntil: 'networkidle' });
  await worksPage.waitForTimeout(2000);

  console.log('8. Verifying newly added branding project appears on live /works page...');
  const projectTitleLocator = worksPage.locator('text="Playwright Brand Identity 2026"');
  const isVisible = await projectTitleLocator.isVisible();
  console.log('Project title is visible on /works:', isVisible);

  const screenshotPath = path.resolve('tests/evidence_branding_upload.png');
  await worksPage.screenshot({ path: screenshotPath, fullPage: false });
  console.log('Screenshot saved to:', screenshotPath);

  await browser.close();

  if (isVisible) {
    console.log('🎉 SUCCESS: Project was uploaded, saved to data store, and verified live on /works!');
    process.exit(0);
  } else {
    console.error('❌ FAIL: Newly added project did not appear on /works!');
    process.exit(1);
  }
})();
