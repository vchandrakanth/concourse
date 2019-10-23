import { browser, element, by, ExpectedConditions, $, ElementFinder } from 'protractor';
// import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { elementClick, elementSendkeys } from '../utils/utils';
import { WaitHelper } from '../utils/waitHelper';
import { ElementHelper } from '../utils/elementHelper';
import { IHelper } from '../utils/ihelper';
import { PageHelper } from '../utils/pageHelper';
let configProperties = require('../conf/properties');

export class ControlTopology {

  get controlTopologyMenu() { return element(by.xpath('//a[contains(.,"Control Topology")]')); }
  get plusOnDev() { return element(by.xpath('//div[@class="nodecontent ng-star-inserted selected"]//button[@class="btn btn-link text-white btn-sm add-child p-0 ng-star-inserted"]')); }
  get createNewOrganization() { return element(by.css('.fa-plus-circle')); }
  get organizationName() { return element(by.css('#name')); }
  get description() { return element(by.css('#description')); }
  get parentIdDropdown() { return element(by.xpath('//span[@class="dropdown-down"]')); }
  get selectDev() { return element(by.xpath('//li[.="Dev"]')); }
  get createButton() { return element(by.css('.Create')); }
  get toast() { return $('#toast-container'); }
  get chart() { return element(by.css('app-org-chart')); }

  async createOrganization() {

    // let temp = element(by.xpath('//th[contains(.,\'Name\')]'));
    await WaitHelper.waitForElementToBeHidden(this.toast);
    await elementClick(this.controlTopologyMenu);
    await browser.logger.info('Control Topology Menu Clicked');
    await WaitHelper.waitForElementToBeDisplayed(this.chart, 5000, 'Chart displayed');
    // Click on '+' Button to Create new Organization
    // await browser.actions().mouseMove(this.createNewOrganization).perform();
    await elementClick(this.createNewOrganization);
    await browser.logger.info('Clicked + Button');

    // Enter Organization Name
    await WaitHelper.waitForElementToBePresent(this.organizationName, 5000, 'Organization Name ');
    await elementSendkeys(this.organizationName, 'Test Org');
    await browser.logger.info('Organization Name Entered');

    // Enter Organization Description
    await WaitHelper.waitForElementToBePresent(this.description, 5000, 'Organization Description ');
    await elementSendkeys(this.description, 'Test Org');
    await browser.logger.info('Description Entered');

    await WaitHelper.waitForElementToBePresent(this.parentIdDropdown, 5000, 'Drop Down ');
    await elementClick(this.parentIdDropdown);
    await browser.logger.info('Drop Down');

    await WaitHelper.waitForElementToBePresent(this.selectDev, 5000, 'Dev ');
    await elementClick(this.selectDev);
    await browser.logger.info('Dev Selected');

    // Click On Create Button
    await WaitHelper.waitForElementToBeClickable(this.createButton, 5000, 'Create ');
    await elementClick(this.createButton);
    await browser.logger.info('Organization Submitted');

  }
  async getPageTitle() {
    return browser.getTitle();
  }
}
