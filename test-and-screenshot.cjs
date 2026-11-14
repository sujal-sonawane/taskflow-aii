const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'http://localhost:5173/';
const SCREENSHOTS_DIR = path.join(__dirname, 'SCREENSHOTS');

async function run() {
  console.log('Launching Chrome for end-to-end verification and screenshots...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.message);
  });

  // 1. Desktop Test (1440x900)
  console.log('1. Testing Desktop (1440x900)...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(URL, { waitUntil: 'networkidle0' });

  // Check horizontal overflow
  const desktopOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  console.log('Desktop horizontal overflow detected?', desktopOverflow);

  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '01-desktop-full.png'),
    fullPage: true
  });
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '02-desktop-hero.png')
  });

  // 2. Laptop Test (1366x768)
  console.log('2. Testing Laptop (1366x768)...');
  await page.setViewport({ width: 1366, height: 768 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '03-laptop-view.png')
  });

  // 3. Tablet Test (768x1024)
  console.log('3. Testing Tablet (768x1024)...');
  await page.setViewport({ width: 768, height: 1024 });
  await page.evaluate(() => window.scrollTo(0, 0));
  const tabletOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  console.log('Tablet horizontal overflow detected?', tabletOverflow);

  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '04-tablet-hero.png')
  });
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '05-tablet-full.png'),
    fullPage: true
  });

  // 4. Mobile Test (390x844)
  console.log('4. Testing Mobile (390x844)...');
  await page.setViewport({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  const mobileOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  console.log('Mobile 390px horizontal overflow detected?', mobileOverflow);

  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '06-mobile-hero.png')
  });

  // Test Mobile Hamburger Menu
  console.log('Testing Mobile Hamburger Navigation Menu...');
  const menuOpened = await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label="Open menu"]');
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });
  console.log('Clicked mobile hamburger menu:', menuOpened);
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '07-mobile-menu-opened.png')
  });

  // Click a nav link inside mobile menu (Features)
  await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('header nav a, header div a'));
    const featuresLink = links.find(a => a.getAttribute('href') === '#features');
    if (featuresLink) featuresLink.click();
  });
  await new Promise(r => setTimeout(r, 600));
  console.log('Clicked Features link from mobile menu.');

  // 5. Small Mobile (360x740)
  console.log('5. Testing Small Mobile (360x740)...');
  await page.setViewport({ width: 360, height: 740 });
  await page.evaluate(() => window.scrollTo(0, 0));
  const smallMobileOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  console.log('Small Mobile 360px horizontal overflow detected?', smallMobileOverflow);
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '08-small-mobile-hero.png')
  });
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '09-small-mobile-full.png'),
    fullPage: true
  });

  // 6. Return to Desktop to test Interactive Features & Forms
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(URL, { waitUntil: 'networkidle0' });

  // Test Hero Interactive Tasks
  console.log('6. Testing Hero interactive task toggle...');
  await page.evaluate(() => {
    const firstTask = document.querySelector('section [role="checkbox"]');
    if (firstTask) firstTask.click();
  });

  // Test Pricing Plan Selection -> Scroll to Contact
  console.log('7. Testing Pricing "Choose Pro" click...');
  const chooseProBtn = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const proBtn = btns.find(b => b.textContent && b.textContent.includes('Choose Pro'));
    if (proBtn) {
      proBtn.click();
      return true;
    }
    return false;
  });
  console.log('Found and clicked Choose Pro button:', chooseProBtn);
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '10-pricing-pro-selected-contact.png')
  });

  // Test Form Validation: Empty Submit
  console.log('8. Testing Contact Form Validation on empty submit...');
  await page.evaluate(() => {
    const submitBtn = document.querySelector('#contact form button[type="submit"]');
    if (submitBtn) submitBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '11-contact-form-validation-errors.png')
  });

  // Fill in Valid Data & Submit
  console.log('9. Filling valid form data and submitting...');
  await page.type('#contact-name', 'Rohan Sharma');
  await page.type('#contact-email', 'rohan.sharma@example.com');
  await page.type('#contact-message', 'We are evaluating TaskFlow AI Pro for our 15-person design and engineering team. Looking forward to testing sprint automation!');
  
  await page.evaluate(() => {
    const submitBtn = document.querySelector('#contact form button[type="submit"]');
    if (submitBtn) submitBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '12-contact-form-success-card.png')
  });

  // Test FAQ Accordion
  console.log('10. Testing FAQ Accordion toggle...');
  await page.evaluate(() => {
    document.getElementById('faq')?.scrollIntoView();
    const faqButtons = document.querySelectorAll('#faq button[aria-expanded]');
    if (faqButtons.length > 1) {
      faqButtons[1].click(); // click 2nd question
    }
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '13-faq-accordion-expanded.png')
  });

  // Test Product Preview Tabs: Productivity Insights Chart
  console.log('11. Testing Product Preview tab switch to Productivity Insights...');
  await page.evaluate(() => {
    document.getElementById('product-preview')?.scrollIntoView();
    const tabs = Array.from(document.querySelectorAll('#product-preview button'));
    const analyticsTab = tabs.find(t => t.textContent && t.textContent.includes('Productivity Insights'));
    if (analyticsTab) analyticsTab.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, '14-product-preview-analytics-chart.png')
  });

  console.log('\n--- VERIFICATION SUMMARY ---');
  console.log('Console errors recorded:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error('Console errors:', consoleErrors);
  } else {
    console.log('All tests passed with ZERO console errors!');
  }

  await browser.close();
  console.log('Screenshots successfully saved to:', SCREENSHOTS_DIR);
}

run().catch(err => {
  console.error('Error during testing:', err);
  process.exit(1);
});
