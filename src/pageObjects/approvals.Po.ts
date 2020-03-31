
import { browser, element, by, ExpectedConditions, $, ElementFinder, protractor, $$ } from 'protractor';
import { elementClick, elementSendkeys, elementClear } from '../utils/utils';
import { WaitHelper } from '../utils/waitHelper';
let configProperties = require('../conf/properties');

export class Approvals {

  get policyGroupMenu() { return element(by.css('a[data-e2e="policyGroupMenu"]')); }
  get approvalsMenu() { return element(by.css('a[data-e2e="linkApprovals"]')); }
  get myApprovalsTab() { return element(by.xpath('//a[contains(.,"My Approvals")]')); }
  get assignedApprovalsTab() { return element(by.xpath('//a[contains(.,"Assigned Approvals")]')); }
  get search() { return element(by.css('[placeholder="Search"]')); }
  searchPolicyGroupName(policyGroupName: string) { return element(by.xpath(`//h5[.='${policyGroupName}']`)); }
  get publishButton() { return element(by.xpath('//button[.="Publish"]')); }
  get statusDropDown() { return element(by.xpath('select[ng-reflect-name="status"]')); }
  get draft() { return element(by.xpath('//option[contains(.,"Draft")]')); }
  get published() { return element(by.xpath('//option[contains(.,"Published")]')); }
  get incrementByDropdown() { return element(by.css('select[ng-reflect-name="versionBump"]')); }
  get major() { return element(by.xpath('//option[contains(.,"MAJOR")]')); }
  get minor() { return element(by.xpath('//option[contains(.,"MINOR")]')); }
  get saveButton() { return element(by.css('.Save')); }
  approvalEntity(entityId: any) { return element(by.xpath(`//span[.='${entityId}']`)); }
  get userEmailDropDown() { return element(by.xpath('//span[@class="ng-arrow"]')); }
  get selectUserEmail() { return element(by.xpath('//div[.="admin@concoursehub.com"]')); }
  get approveButton() { return element(by.css('.btn-success')); }
  get rejectButton() { return element(by.css('.btn-danger')); }
  get assignButton() { return element(by.css('button[type="submit"]')); }
  get toast() { return $('#toast-container'); }
  get list() { return element($('.list')); }
  get temp() { return element(by.css('.app-container')); }
  get approvalStatus() { return element(by.xpath('//span[.="APPROVED"]')); }
  myelement(modelId: string) { return element(by.xpath(`//td[.='${modelId} - Model']`)); }
  get surfaceDropDown() { return element(by.css('select')); }
  selectSurface(surface: string) { return element(by.xpath(`//option[contains(.,'${surface}')]`)); }
  get policyGroupDetailPage() { return element(by.css('div[data-e2e="policyGroupDetails"]')); }
  get deleteButton() { return element(by.css('.btn-danger')); }
  get confirmDeleteButton() { return element(by.css('.delete')); }
  get approvalList() { return element(by.css('.datatable-body')); }

  async ApprovalAction(surfaceName: string = null, entityId: any = null) {
    await WaitHelper.waitForElementToBeHidden(this.toast);
    // Click on Approvals Menu Button
    await WaitHelper.waitForElementToBeDisplayed(this.approvalsMenu, 5000, 'Approvals Menu');
    await elementClick(this.approvalsMenu);
    await browser.logger.info('Clicked on Approvals Menu');

    await this.selectSurfaceFromDropDown(surfaceName);

    await elementClear(this.search, entityId);
    await browser.sleep(2000);

    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy Group List Displayed');
    await this.search.sendKeys(entityId);
    let approvalRequest = element(by.css('.list-group')).all(by.className('mb-3 ng-star-inserted'));
    await approvalRequest.first().click();
    await browser.logger.info(entityId, 'Selected');

    await WaitHelper.waitForElementToBeClickable(this.approveButton, 2000, 'Approve Button ');
    await browser.actions().mouseMove(this.approveButton).perform();
    await elementClick(this.approveButton);
    await browser.logger.info('Action Approved');
  }

  async VerifyPublishedApprovalRequest(surfaceName: string = null, Id: any = null) {
    await WaitHelper.waitForElementToBeHidden(this.toast);
    await WaitHelper.waitForElementToBeDisplayed(this.approvalsMenu, 5000, 'Approvals Menu');
    // Click on Approvals Menu Button
    await elementClick(this.approvalsMenu);
    await browser.logger.info('Clicked on Approvals Menu');

    await this.selectSurfaceFromDropDown(surfaceName);

    await elementClear(this.search, Id);

    await WaitHelper.waitForElementToBeDisplayed(this.approvalList, 5000, 'Approval List Displayed');
    await this.search.sendKeys(Id);
    await browser.sleep(2000);
    await browser.logger.info(Id);
  }

  async DeleteApprovalRequest(surfaceName: string = null, policyGroupName: any = null) {
    await WaitHelper.waitForElementToBeHidden(this.toast);
    await WaitHelper.waitForElementToBeDisplayed(this.policyGroupMenu, 5000, 'Policy Group Menu Displayed');
    // Click on Policy Group Menu Button
    await elementClick(this.policyGroupMenu);
    await browser.logger.info('Clicked on Policy Group Menu');

    await this.selectSurfaceFromDropDown(surfaceName);

    await elementClear(this.search, policyGroupName);

    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy Group List Displayed');
    await this.search.sendKeys(policyGroupName);
    await elementClick(this.searchPolicyGroupName(policyGroupName));
    await browser.logger.info(policyGroupName, 'Selected');

    await WaitHelper.waitForElementToBeClickable(this.deleteButton, 2000, 'Delete ');
    await browser.actions().mouseMove(this.deleteButton).perform();
    await elementClick(this.deleteButton);
    await browser.logger.info('Delete');

    await WaitHelper.waitForElementToBeClickable(this.confirmDeleteButton, 2000, 'Confirm Delete ');
    await browser.actions().mouseMove(this.confirmDeleteButton).perform();
    await elementClick(this.confirmDeleteButton);
    await browser.logger.info('Confirm Delete');
  }

  async VerifyDeleteApprovalRequest(surfaceName: string = null, Id: any = null) {
    await WaitHelper.waitForElementToBeHidden(this.toast);
    // Click on Approvals Menu Button
    elementClick(this.approvalsMenu);
    await browser.logger.info('Clicked on Approvals Menu');

    await this.selectSurfaceFromDropDown(surfaceName);

    await elementClear(this.search, Id);

    // Select Approval Request
    await WaitHelper.waitForElementToBeDisplayed(this.approvalList, 5000, 'Approval List Displayed');
    await this.search.sendKeys(Id);
    await browser.sleep(2000);
    await browser.logger.info(Id, 'Displayed');
  }

  async selectSurfaceFromDropDown(surfaceName: string = null) {
    await WaitHelper.waitForElementToBePresent(this.surfaceDropDown, 5000, 'Surface Drop Down ');
    await elementClick(this.surfaceDropDown);
    await browser.logger.info(surfaceName, 'Surface Drop Down Clicked');

    await WaitHelper.waitForElementToBePresent(this.selectSurface(surfaceName), 5000, 'Surface');
    await elementClick(this.selectSurface(surfaceName));
    await browser.logger.info('Surface Selcted');
  }

  async getId() {
    return browser.getCurrentUrl().then(function (url) {
      console.log(url);
      let str = 'currentUrl';
      let entityId = [];
      entityId = url.split('/');
      return entityId[5];
    });
  }

  async getPageTitle() {
    return browser.getTitle();
  }

}