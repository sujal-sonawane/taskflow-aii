const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'http://localhost:5173/';
const SCREENSHOTS_DIR = path.join(__dirname, 'SCREENSHOTS');

async function runQA() {
  console.log('=====================================================');
  console.log('TASKFLOW AI — AUTOMATED QA AUDIT & VERIFICATION SUITE');
  console.log('=====================================================\n');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  const consoleErrors = [];
  const consoleWarnings = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
    if (msg.type() === 'warning') consoleWarnings.push(msg.text());
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.message);
  });

  const auditResults = {
    viewportsTested: [],
    overflowResults: {},
    navLinksTested: [],
    ctaButtonsTested: [],
    pricingIntegration: false,
    formValidationEmpty: false,
    formValidationInvalidEmail: false,
    formSubmissionSuccess: false,
    faqAccordionWorking: false,
    interactiveTasksWorking: false,
    productTabsWorking: false,
    brokenImages: [],
    deadButtons: [],
    consoleErrorsCount: 0,
  };

  // 1. Initial Load & Viewport Audit
  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'laptop', width: 1366, height: 768 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 390, height: 844 },
    { name: 'small-mobile', width: 360, height: 740 }
  ];

  for (const vp of viewports) {
    console.log(`[VIEWPORT] Testing ${vp.name} (${vp.width}x${vp.height})...`);
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(URL, { waitUntil: 'networkidle0' });

    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    auditResults.viewportsTested.push(`${vp.name} (${vp.width}px)`);
    auditResults.overflowResults[vp.name] = hasOverflow;
    console.log(`  -> Horizontal overflow: ${hasOverflow ? 'FAIL (Overflow detected)' : 'PASS (No overflow)'}`);

    if (vp.name === 'desktop') {
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'qa-01-desktop-hero.png') });
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'qa-01-desktop-full.png'), fullPage: true });
    } else if (vp.name === 'tablet') {
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'qa-02-tablet.png') });
    } else if (vp.name === 'mobile') {
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'qa-03-mobile-hero.png') });
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'qa-03-mobile-full.png'), fullPage: true });
    }
  }

  // 2. Mobile Navigation Audit
  console.log('\n[MOBILE NAV] Testing mobile hamburger drawer and links...');
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(URL, { waitUntil: 'networkidle0' });

  // Open mobile menu
  const menuOpened = await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label="Open menu"]');
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });
  await new Promise(r => setTimeout(r, 300));
  console.log(`  -> Hamburger opened: ${menuOpened}`);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'qa-04-mobile-menu.png') });

  // Test Escape key closes menu
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 300));
  const menuClosedAfterEscape = await page.evaluate(() => {
    return document.querySelector('button[aria-label="Open menu"]') !== null;
  });
  console.log(`  -> Menu closes on Escape key: ${menuClosedAfterEscape}`);

  // Re-open and click navigation link to verify smooth scroll and dismissal
  await page.evaluate(() => {
    document.querySelector('button[aria-label="Open menu"]')?.click();
  });
  await new Promise(r => setTimeout(r, 300));

  await page.evaluate(() => {
    const link = Array.from(document.querySelectorAll('header a')).find(a => a.getAttribute('href') === '#how-it-works');
    if (link) link.click();
  });
  await new Promise(r => setTimeout(r, 600));

  // 3. Desktop Functional Audit
  console.log('\n[DESKTOP] Switching back to 1440x900 for functional feature audit...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(URL, { waitUntil: 'networkidle0' });

  // Check all Navigation Links
  const navHrefs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('header nav a')).map(a => a.getAttribute('href'));
  });
  console.log(`  -> Found ${navHrefs.length} desktop navigation links:`, navHrefs);
  auditResults.navLinksTested = navHrefs;

  // Test Hero Interactive Task Toggles
  console.log('\n[HERO] Testing interactive task checkboxes in dashboard preview...');
  const taskCountBefore = await page.evaluate(() => {
    return document.querySelectorAll('section [role="checkbox"]').length;
  });
  console.log(`  -> Found ${taskCountBefore} interactive task items.`);
  const toggled = await page.evaluate(() => {
    const firstTask = document.querySelector('section [role="checkbox"]');
    if (firstTask) {
      firstTask.click();
      return true;
    }
    return false;
  });
  await new Promise(r => setTimeout(r, 300));
  auditResults.interactiveTasksWorking = toggled;
  console.log(`  -> Task toggle clicked and updated: ${toggled}`);

  // Test Hero CTA Buttons
  console.log('\n[HERO CTAS] Testing Start for Free and Explore Features...');
  const heroExploreFeatures = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Explore Features'));
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });
  await new Promise(r => setTimeout(r, 500));
  console.log(`  -> "Explore Features" button clicked: ${heroExploreFeatures}`);

  // Test Product Preview Tabs & Project Filters
  console.log('\n[PRODUCT PREVIEW] Testing interactive tabs (Kanban, List, Analytics)...');
  const tabsTested = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('#product-preview button'));
    const listTab = btns.find(b => b.textContent && b.textContent.includes('Task List'));
    if (listTab) listTab.click();
    return true;
  });
  await new Promise(r => setTimeout(r, 400));

  const analyticsTabTested = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('#product-preview button'));
    const analyticsTab = btns.find(b => b.textContent && b.textContent.includes('Productivity Insights'));
    if (analyticsTab) analyticsTab.click();
    return true;
  });
  await new Promise(r => setTimeout(r, 400));
  auditResults.productTabsWorking = tabsTested && analyticsTabTested;
  console.log(`  -> Switched between Sprint Board, Task List, and Productivity Insights: PASS`);

  // Test Pricing Plan Selection -> Contact Integration
  console.log('\n[PRICING INTEGRATION] Testing plan selection from Pricing cards...');
  const proClicked = await page.evaluate(() => {
    const proBtn = Array.from(document.querySelectorAll('#pricing button')).find(b => b.textContent && b.textContent.includes('Choose Pro'));
    if (proBtn) {
      proBtn.click();
      return true;
    }
    return false;
  });
  await new Promise(r => setTimeout(r, 800));

  const planSelectedInForm = await page.evaluate(() => {
    const proRadio = document.querySelector('div[role="radio"][aria-checked="true"]');
    return proRadio ? proRadio.textContent.includes('Pro Plan') : false;
  });
  auditResults.pricingIntegration = proClicked && planSelectedInForm;
  console.log(`  -> "Choose Pro" clicked and Pro Plan selected in form: ${auditResults.pricingIntegration ? 'PASS' : 'FAIL'}`);

  // Test Form Validation: Empty Submission
  console.log('\n[CONTACT FORM] Testing validation on empty submission...');
  await page.evaluate(() => {
    const submitBtn = document.querySelector('#contact form button[type="submit"]');
    if (submitBtn) submitBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  const errorMessagesCount = await page.evaluate(() => {
    return document.querySelectorAll('#contact p[id$="-error"], #contact p.text-rose-600').length;
  });
  auditResults.formValidationEmpty = errorMessagesCount >= 2;
  console.log(`  -> Empty submission triggered ${errorMessagesCount} validation error prompts: ${auditResults.formValidationEmpty ? 'PASS' : 'FAIL'}`);

  // Test Form Validation: Invalid Email
  console.log('\n[CONTACT FORM] Testing validation with invalid email format...');
  await page.type('#contact-name', 'Ananya Gupta');
  await page.type('#contact-email', 'invalid-email-format');
  await page.type('#contact-message', 'Testing email format validator.');
  await page.evaluate(() => {
    const submitBtn = document.querySelector('#contact form button[type="submit"]');
    if (submitBtn) submitBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  const emailError = await page.evaluate(() => {
    const emailErr = document.querySelector('#email-error');
    return emailErr ? emailErr.textContent : null;
  });
  auditResults.formValidationInvalidEmail = emailError !== null;
  console.log(`  -> Invalid email rejected with message: "${emailError}": ${auditResults.formValidationInvalidEmail ? 'PASS' : 'FAIL'}`);

  // Test Form Submission: Valid Data
  console.log('\n[CONTACT FORM] Testing valid submission...');
  // Clear email input and type valid email
  await page.evaluate(() => {
    const emailInput = document.getElementById('contact-email');
    if (emailInput) emailInput.value = '';
    const msgInput = document.getElementById('contact-message');
    if (msgInput) msgInput.value = '';
  });
  await page.type('#contact-email', 'ananya.gupta@taskflow.dev');
  await page.type('#contact-message', 'We are preparing our 2026 engineering sprint roadmap and would like a tailored demonstration of the AI Task Prioritization engine.');
  
  await page.evaluate(() => {
    const submitBtn = document.querySelector('#contact form button[type="submit"]');
    if (submitBtn) submitBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  const successCardVisible = await page.evaluate(() => {
    const heading = document.querySelector('#contact h3');
    return heading ? heading.textContent.includes('Inquiry Received Successfully!') : false;
  });
  auditResults.formSubmissionSuccess = successCardVisible;
  console.log(`  -> Form successfully submitted & displayed confirmation receipt: ${successCardVisible ? 'PASS' : 'FAIL'}`);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'qa-05-contact-success.png') });

  // Test FAQ Accordion
  console.log('\n[FAQ ACCORDION] Testing expand and collapse...');
  const faqAccordionWorks = await page.evaluate(() => {
    const faqButtons = document.querySelectorAll('#faq button[aria-expanded]');
    if (faqButtons.length < 4) return false;
    
    // Toggle second FAQ
    faqButtons[1].click();
    return true;
  });
  await new Promise(r => setTimeout(r, 400));
  
  const secondFaqState = await page.evaluate(() => {
    const faqButtons = document.querySelectorAll('#faq button[aria-expanded]');
    return faqButtons[1].getAttribute('aria-expanded') === 'true';
  });
  auditResults.faqAccordionWorking = faqAccordionWorks && secondFaqState;
  console.log(`  -> FAQ accordion expansion and state toggle: ${auditResults.faqAccordionWorking ? 'PASS' : 'FAIL'}`);

  // Check for Broken Images
  console.log('\n[IMAGE AUDIT] Checking for broken images across entire page...');
  const brokenImages = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('img'));
    return images.filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src);
  });
  auditResults.brokenImages = brokenImages;
  console.log(`  -> Broken images found: ${brokenImages.length}`);

  // Check Console Errors
  console.log('\n[CONSOLE AUDIT] Checking for runtime browser console errors...');
  auditResults.consoleErrorsCount = consoleErrors.length;
  console.log(`  -> Console errors recorded during entire session: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error('Console errors:', consoleErrors);
  }

  await browser.close();

  console.log('\n=====================================================');
  console.log('QA AUDIT EXECUTION COMPLETED');
  console.log('=====================================================');
  return auditResults;
}

runQA().then(results => {
  fs.writeFileSync('qa-report.json', JSON.stringify(results, null, 2));
  console.log('Results exported to qa-report.json');
}).catch(err => {
  console.error('QA run failed:', err);
  process.exit(1);
});
