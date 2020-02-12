import { browser, element, by, ExpectedConditions } from 'protractor';

export class LoginPage {
  // userName = element(by.id('username'));
  userName = element(by.css('[data-e2e="inputUsername"]'));
  // passWD = element(by.id('password'));
  passWD = element(by.css('[data-e2e="inputPassword"]'));
  // signInButton = element(by.css('.Sign'));
  signInButton = element(by.css('[data-e2e="loginButton"]'));


  // Methods for Operation
  async setName(name: string) {

    await this.userName.sendKeys(name);
    browser.logger.info('Entered user Name :' + name);
  }
  async setpassWD(name: string) {
    await this.passWD.sendKeys(name);
    browser.logger.info('Entered Password:' + '*************');
  }

  async clickButton() {
    await this.signInButton.click();
  }

  async login(user: any, pass: any) {
    // Wait for 5 sec before entering the login information.
    await this.setName(user);
    await this.setpassWD(pass);
    await this.clickButton();
  }

  async getPageTitle() {
    return browser.getTitle();
  }
}