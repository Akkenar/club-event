import puppeteer from 'puppeteer';
import faker from 'faker';

const pageUrl = 'http://php/en/register?ignoreCaptcha';
const timeout = 60 * 60 * 1000;
const personalData = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  club: 'GSL',
  email: faker.internet.email(),
  street: faker.address.streetName(),
  no: '5A',
  npa: '1018',
  locality: faker.address.city(),
};

async function filePersonalData(page) {
  const keys = Object.keys(personalData);
  for (const key of keys) {
    const selector = `*[name=${key}]`;
    await page.waitForSelector(selector);
    await page.type(selector, personalData[key]);
  }
}

describe('Register', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      // Must be headless and with no sandbox for Docker integration.
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 900,
      },
      userAgent: '',
    });
  }, timeout);

  afterEach(() => {
    if (browser) {
      browser.close();
    }
  });

  it('should open the register page', async () => {
    await page.goto(pageUrl);

    await page.waitForSelector('h1');
    const html = await page.$eval('h1', e => e.innerHTML);
    expect(html).toBe('Register to the event');
  });

  it(
    'should register',
    async () => {
      try {
        await page.goto(pageUrl);

        await page.waitForSelector('.RegisterForm');
        await filePersonalData(page);
        await page.select('*[name=dinner]', '1');

        // Submit
        await page.click('button[type=submit]');

        // Ensures that we're on the right page.
        await page.waitForSelector('.ConfirmationPage');
        const html = await page.$eval('h1', e => e.innerHTML);
        expect(html).toBe('Confirmation Page');
      } catch (e) {
        page.screenshot();
        throw e;
      }
    },
    timeout
  );
});
