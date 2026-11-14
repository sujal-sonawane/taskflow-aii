const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'http://localhost:5173/';
const OUT_DIR = path.join(__dirname, 'SCREENSHOTS', 'responsive-refinement');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function runResponsiveAudit() {
  console.log('===============================================================');
  console.log('TASKFLOW AI — RESPONSIVE REFINEMENT & TABLET NAVBAR TEST SUITE');
  console.log('===============================================================\n');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => consoleErrors.push(err.message));

  const targetViewports = [
    { name: 'small-mobile', width: 360, height: 740, type: 'mobile' },
    { name: 'standard-mobile', width: 390, height: 844, type: 'mobile' },
    { name: 'tablet-portrait-768', width: 768, height: 1024, type: 'tablet' },
    { name: 'tablet-ipad-air-820', width: 820, height: 1180, type: 'tablet' },
    { name: 'tablet-surface-900', width: 900, height: 1200, type: 'tablet' },
    { name: 'small-laptop-ipad-pro-1024', width: 1024, height: 768, type: 'desktop' },
    { name: 'laptop-1366', width: 1366, height: 768, type: 'desktop' },
    { name: 'desktop-1440', width: 1440, height: 900, type: 'desktop' },
  ];

  const results = [];

  for (const vp of targetViewports) {
    console.log(`\n--- Testing ${vp.name} (${vp.width}x${vp.height}) ---`);
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(URL, { waitUntil: 'networkidle0' });

    // 1. Horizontal overflow check
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    // 2. Navbar layout metrics
    const navMetrics = await page.evaluate(() => {
      const header = document.querySelector('header');
      const logo = header ? header.querySelector('a[aria-label="TaskFlow AI Homepage"]') : null;
      const logoSpan = logo ? logo.querySelector('span') : null;
      const hamburger = header ? header.querySelector('button[aria-label="Open menu"], button[aria-label="Close menu"]') : null;
      const desktopNav = header ? header.querySelector('nav.hidden.lg\\:flex, nav') : null;

      const logoRect = logoSpan ? logoSpan.getBoundingClientRect() : null;
      const logoSingleLine = logoRect ? logoRect.height < 35 : false;

      const isHamburgerVisible = hamburger ? window.getComputedStyle(hamburger).display !== 'none' : false;
      const isDesktopNavVisible = desktopNav ? window.getComputedStyle(desktopNav).display !== 'none' : false;

      return {
        logoSingleLine,
        logoHeight: logoRect ? logoRect.height : 0,
        isHamburgerVisible,
        isDesktopNavVisible,
      };
    }, vp.type);

    console.log(`  Horizontal overflow: ${overflow ? 'FAIL' : 'PASS (0px)'}`);
    console.log(`  Logo on single line: ${navMetrics.logoSingleLine ? 'PASS' : 'FAIL'} (height: ${navMetrics.logoHeight}px)`);
    console.log(`  Hamburger visible: ${navMetrics.isHamburgerVisible}`);
    console.log(`  Desktop nav visible: ${navMetrics.isDesktopNavVisible}`);

    // Capture initial navbar screenshot
    const screenshotPrefix = `${vp.width.toString().padStart(4, '0')}-${vp.name}`;
    await page.screenshot({
      path: path.join(OUT_DIR, `${screenshotPrefix}-navbar.png`)
    });

    // 3. For tablet and mobile (< 1024px), test opening hamburger menu
    let menuOpenSuccess = false;
    let menuOverflow = false;
    if (vp.width < 1024) {
      await page.evaluate(() => {
        const btn = document.querySelector('button[aria-label="Open menu"]');
        if (btn) btn.click();
      });
      await new Promise(r => setTimeout(r, 350));

      menuOpenSuccess = await page.evaluate(() => {
        const dropdown = document.querySelector('header div.lg\\:hidden');
        return dropdown !== null && window.getComputedStyle(dropdown).display !== 'none';
      });

      menuOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      console.log(`  Hamburger opened dropdown: ${menuOpenSuccess ? 'PASS' : 'FAIL'}`);
      console.log(`  Dropdown caused overflow: ${menuOverflow ? 'FAIL' : 'PASS (No overflow)'}`);

      await page.screenshot({
        path: path.join(OUT_DIR, `${screenshotPrefix}-menu-opened.png`)
      });

      // Close menu
      await page.keyboard.press('Escape');
      await new Promise(r => setTimeout(r, 200));
    }

    results.push({
      viewport: `${vp.width}px (${vp.name})`,
      width: vp.width,
      overflow: !overflow,
      logoSingleLine: navMetrics.logoSingleLine,
      hamburgerActive: vp.width < 1024 ? navMetrics.isHamburgerVisible : !navMetrics.isHamburgerVisible,
      desktopNavActive: vp.width >= 1024 ? navMetrics.isDesktopNavVisible : !navMetrics.isDesktopNavVisible,
      menuOpenSuccess: vp.width < 1024 ? menuOpenSuccess : 'N/A (Desktop)',
      menuOverflow: vp.width < 1024 ? !menuOverflow : 'N/A (Desktop)',
    });
  }

  // Functional regression check on Desktop
  console.log('\n--- Functional Regression Verification on Desktop ---');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(URL, { waitUntil: 'networkidle0' });

  // 1. Task toggle
  const taskToggleWorks = await page.evaluate(() => {
    const task = document.querySelector('section [role="checkbox"]');
    if (task) {
      task.click();
      return true;
    }
    return false;
  });
  console.log(`Interactive task toggle in Hero: ${taskToggleWorks ? 'PASS' : 'FAIL'}`);

  // 2. Pricing selection -> Contact scroll & pre-select
  const pricingWorks = await page.evaluate(() => {
    const proBtn = Array.from(document.querySelectorAll('#pricing button')).find(b => b.textContent && b.textContent.includes('Choose Pro'));
    if (proBtn) {
      proBtn.click();
      return true;
    }
    return false;
  });
  await new Promise(r => setTimeout(r, 700));

  const proSelected = await page.evaluate(() => {
    const radio = document.querySelector('div[role="radio"][aria-checked="true"]');
    return radio ? radio.textContent.includes('Pro Plan') : false;
  });
  console.log(`Pricing "Choose Pro" pre-selects Pro in form: ${pricingWorks && proSelected ? 'PASS' : 'FAIL'}`);

  // 3. Form submission
  await page.type('#contact-name', 'Vikram Seth');
  await page.type('#contact-email', 'vikram.seth@example.com');
  await page.type('#contact-message', 'Testing after tablet responsive navbar refinements.');
  await page.evaluate(() => {
    const submitBtn = document.querySelector('#contact form button[type="submit"]');
    if (submitBtn) submitBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  const formSuccess = await page.evaluate(() => {
    const h3 = document.querySelector('#contact h3');
    return h3 ? h3.textContent.includes('Inquiry Received Successfully!') : false;
  });
  console.log(`Contact form submission and receipt render: ${formSuccess ? 'PASS' : 'FAIL'}`);

  // 4. FAQ accordion
  await page.evaluate(() => {
    const faqButtons = document.querySelectorAll('#faq button[aria-expanded]');
    if (faqButtons.length > 1) {
      faqButtons[1].click();
    }
  });
  await new Promise(r => setTimeout(r, 400));

  const faqWorks = await page.evaluate(() => {
    const faqButtons = document.querySelectorAll('#faq button[aria-expanded]');
    return faqButtons.length > 1 && faqButtons[1].getAttribute('aria-expanded') === 'true';
  });
  console.log(`FAQ accordion toggle: ${faqWorks ? 'PASS' : 'FAIL'}`);

  console.log(`\nBrowser console errors recorded: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error('Errors:', consoleErrors);
  }

  await browser.close();

  console.log('\n===============================================================');
  console.log('RESPONSIVE REFINEMENT AUDIT COMPLETE');
  console.log('===============================================================');
  console.table(results);
}

runResponsiveAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
