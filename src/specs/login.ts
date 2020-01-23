// See README.md for important details.
import { browser, ExpectedConditions } from 'protractor';
import { LoginPage } from '../pageObjects/login.Po';
import { goToMainPage } from '../utils/utils';

describe('Login Concourse ', async function () {
  let originalTimeout;
  let EC = ExpectedConditions;

  beforeEach(function () {

    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
  });

  it('Step 1: open the brower and login', async function (): Promise<any> {

    // Open the Url and login
   await  goToMainPage();

    await browser.logger.info('Logging into concourse website');

    // Login
    let loginPage = new LoginPage();
    await loginPage.login('admin@concoursehub.com', 'password');
    // await loginPage.clickTopologyCreateNode();

   // await loginPage.clickInviteUser();
   });



  afterEach(function () {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

});

