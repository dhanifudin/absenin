const BASE_URL = 'https://portal.polinema.ac.id';

const puppeteer = require('puppeteer');

const createBrowser = async ({ headless }) => {
  return await puppeteer.launch({
    headless,
    defaultViewport: null,
    ignoreHTTPSErrors: true,
    acceptInsecureCerts: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--ignore-certificate-errors',
    ],
  });
};

const openPage = async (browser) => {
  const page = await browser.newPage();
  await page.goto(BASE_URL);
  return page;
};

const login = async (page, { username, password }) => {
  await page.type('#username', username);
  await page.type('#password', password);
  await page.click('.submit');
  await page.waitForNavigation();
};

const clickAttendanceTab = async (page) => {
  await page.waitForTimeout(1000);
  const attendanceTab = await page.waitForSelector(
    "ul.nav:nth-child(2) > li:nth-child(3) > a:nth-child(1)"
  );
  await attendanceTab.click();
};

const clickPresenceButton = async (page) => {
  await page.waitForTimeout(1000);
  const presenceButton = await page.waitForSelector(
    'button.btn:nth-child(5)'
  );
  await presenceButton.click();
};

const clickAttendanceButton = async (page) => {
  await page.waitForTimeout(1000);
  const attendanceButton = await page.waitForSelector(
    'button.btn-sm:nth-child(1)'
  );
  if (attendanceButton) {
    await attendanceButton.click();
  }
};

const start = async (username, password, { headless }) => {
  const browser = await createBrowser({ headless });
  try {
    const page = await openPage(browser);
    await login(page, { username, password });
    await clickAttendanceTab(page);
    await clickPresenceButton(page);
    await clickAttendanceButton(page);
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
  }
};

module.exports = {
  start,
};