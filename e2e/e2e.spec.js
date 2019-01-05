/* eslint-disable no-console */
const puppeteer = require('puppeteer');
const faker = require('faker');

const registerPageUrl = 'http://php/en/register?ignoreCaptcha';
const loginPageUrl = 'http://php/en/login?ignoreCaptcha';

const timeout = 60 * 60 * 1000;
const personalData = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  club: 'GSL',
  email: 'pierredominique.putallaz@gmail.com',
  street: faker.address.streetName(),
  no: '5A',
  npa: '1018',
  locality: faker.address.city(),
};

const products = {
  dinner: faker.random.number(10),
  picknick: faker.random.number(10),
  itemSize1: faker.random.number(10),
  itemSize2: faker.random.number(10),
  itemSize3: faker.random.number(10),
  itemSize4: faker.random.number(10),
  breakfast: faker.random.number(10),
  camping: faker.random.number(10),
  sleeping: faker.random.number(10),
  vegetarian: faker.random.number(10),
};

async function setPersonalData(page) {
  const keys = Object.keys(personalData);
  for (const key of keys) {
    const selector = `*[name=${key}]`;
    await page.waitForSelector(selector);
    await page.type(selector, personalData[key]);
  }
}

async function setProductData(page) {
  const keys = Object.keys(products);
  for (const key of keys) {
    const selector = `*[data-testid=${key}]`;
    await page.waitForSelector(selector);
    await page.type(selector, products[key].toString());
  }
}

describe('e2e', () => {
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
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  }, timeout);

  afterEach(() => {
    if (browser) {
      browser.close();
    }
  });

  it('should open the register page', async () => {
    await page.goto(registerPageUrl);

    await page.waitForSelector('h1');
    const html = await page.$eval('h1', e => e.innerHTML);
    expect(html).toBe('Register to the meeting');
  });

  it(
    'should register',
    async () => {
      await page.goto(registerPageUrl);
      await page.evaluate(() => console.log(`url is ${window.location.href}`));

      await page.waitForSelector('.RegisterForm');
      await setPersonalData(page);
      await setProductData(page);

      // Submit
      await page.click('button[type=submit]');

      // Ensures that we're on the right page.
      await page.waitForSelector('.ConfirmationPage');
      await page.evaluate(() => console.log(`url is ${window.location.href}`));

      const html = await page.$eval('h1', e => e.innerHTML);
      expect(html).toBe('Confirmation');
    },
    timeout
  );

  it(
    'should login and display the registrations',
    async () => {
      await page.goto(loginPageUrl);

      await page.waitForSelector('.LoginPage');

      // Credentials, as defined in the init.sql script
      await page.type('*[name=username]', 'foo');
      await page.type('*[name=password]', 'bar');

      // Submit
      await page.click('button[type=submit]');

      // Ensures that we're on the right page.
      await page.waitForSelector('.RegistrationsOverview__Total');
      const totalRegistrations = await page.$eval(
        '.RegistrationsOverview__Total',
        e => e.innerText
      );
      expect(totalRegistrations).toEqual('registrations.total: 1');
    },
    timeout
  );
});
