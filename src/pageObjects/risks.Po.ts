import { elementClick, elementClear } from '../utils/utils';
import { WaitHelper } from '../utils/waitHelper';
import { browser, element, by, $, $$ } from 'protractor';
let configProperties = require('../conf/properties');

export class Risk {

  get policyViolationsMenu() { return element(by.css('a[data-e2e="linkPolicyViolations"]')); }
  get gridTable() { return element(by.css('.grid-table')); }
  get riskMenu() { return element(by.css('a[data-e2e="linkPolicyViolations"]')); }
  // get risklist() { return element(by.css('.datatable-body')); }.app-container
  get risklist() { return element(by.css('.app-container')); }
  // get riskdetail() { return element(by.css('.detail')); }
  get riskdetail() { return element(by.css('div[data-e2e="approvalRequestDetails"]')); }
  get deleteButton() { return element(by.css('.btn-danger')); }
  get confirmDeletionButton() { return element(by.css('.btn-outline-danger')); }
  get toast() { return $('#toast-container'); }
  // riskElement(ID: any) { return element(by.css(`//span[.='${ID}']`)); }
  riskElement(ID: any) { return element(by.css(`[ng-reflect-router-link='/workflows/risks/,${ID}']`)); }
  get lastPage() { return element(by.xpath('//i[@class="datatable-icon-skip"]')); }
  get surfaceDropDown() { return element(by.css('select')); }
  selectSurface(surface: string) { return element(by.xpath(`//option[contains(.,'${surface}')]`)); }
  get search() { return element(by.css('[placeholder="Search"]')); }
  get list() { return $('.list'); }
  get deploymentRiskDetail() { return element(by.css('a[ng-reflect-router-link="/workflows/logical-deployments"]')); }
  // get deploymentRiskDetail() { return element(by.css('div[data-e2e="approvalRequestDetails"]')); }

  async openRisk(ID: any) {
    await WaitHelper.waitForElementToBeHidden(this.toast);
    await WaitHelper.waitForElementToBeDisplayed(this.riskMenu, 2000, 'Menu');
    elementClick(this.riskMenu);
    await WaitHelper.waitForElementToBeDisplayed(this.risklist, 3000, 'list displayed');
    await browser.logger.info('Risk Page Displayed');

    await WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Surface Drop Down');
    await browser.actions().mouseDown(this.surfaceDropDown).perform();
    elementClick(this.surfaceDropDown);
    await browser.logger.info('Surface Drop Down Selected');

    await WaitHelper.waitForElementToBeClickable(this.selectSurface(configProperties.SurfaceData.surfaceName), 2000, 'E2E Topology ');
    await elementClick(this.selectSurface(configProperties.SurfaceData.surfaceName));
    await browser.logger.info('Selected E2E Topology');
    await browser.sleep(2000);

    await elementClear(this.search, ID);

    await this.search.sendKeys(ID);
    await browser.sleep(2000);
    let riskItem = element(by.css('.list')).all(by.className('list-group-item ng-star-inserted'));
    await riskItem.first().click();
    // let riskItem = $$('.list');
    // await riskItem.first().click();
    await browser.sleep(2000);
    await browser.logger.info('Risk Happend For', ID);
  }

  async verifyRisk(ID: any) {
    await WaitHelper.waitForElementToBeHidden(this.toast);
    await WaitHelper.waitForElementToBeDisplayed(this.riskMenu, 2000, 'Menu');
    await elementClick(this.riskMenu);
    await WaitHelper.waitForElementToBeDisplayed(this.risklist, 3000, 'list displayed');
    await browser.logger.info('Risk Page Displayed');

    await WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Surface Drop Down');
    await browser.actions().mouseDown(this.surfaceDropDown).perform();
    await elementClick(this.surfaceDropDown);
    await browser.logger.info('Surface Drop Down Selected');

    await WaitHelper.waitForElementToBeClickable(this.selectSurface(configProperties.SurfaceData.surfaceName), 2000, 'E2E Topology ');
    await elementClick(this.selectSurface(configProperties.SurfaceData.surfaceName));
    await browser.logger.info('Selected E2E Topology');
    await browser.sleep(2000);

    await elementClear(this.search, ID);

    await this.search.sendKeys(ID);
    await browser.sleep(3000);
    await browser.logger.info('Risk Removed For', ID);
  }

  async getId() {
    return browser.getCurrentUrl().then(function (url) {
      console.log(url);
      let entityId = [];
      entityId = url.split('/');
      return entityId[5];
    });

  }

  async getPageTitle() {
    return browser.getTitle();
  }
}