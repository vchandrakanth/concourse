import { browser, element, by, $, $$ } from 'protractor';
import { elementClick, elementSendkeys, elementClear } from '../utils/utils';
import { WaitHelper } from '../utils/waitHelper';
let configProperties = require('../conf/properties');

export class CloudRoles {
  get cloudRolesLink() { return element(by.css('a[routerlink="cloud-roles"]')); }
  get createNewCloudRole() { return element(by.css('[data-e2e="createNewCloudRole"]')); }
  get enterCloudRoleName() { return element(by.css('[data-e2e="name"]')); }
  get enterCloudRoleDescription() { return element(by.css('[data-e2e="description"]')); }
  selectCloudProvider(cloudProvider: any) { return element(by.css(`[for='cp-${cloudProvider}']`)); }
  get draftStatus() { return element(by.css('[for="draft"]')); }
  get publishedStatus() { return element(by.css('[for="published"]')); }
  // get minor() { return element(by.css('#Minor')); }
  // get major() { return element(by.css('#major')); }
  get minor() { return element(by.css('[for="minor"]')); }
  get major() { return element(by.css('[for="major"]')); }
  get nextButton() { return element(by.xpath('//button[.="Next"]')); }
  get searchAWSActions() { return element(by.css('[formgroupname="awsCloudActions"] [placeholder="Search Actions"]')); }
  get searchAWSNonActions() { return element(by.css('[formgroupname="awsCloudNonActions"] [placeholder="Search Actions"]')); }
  get searchAzureActions() { return element(by.css('[formgroupname="azureCloudActions"] [placeholder="Search Actions"]')); }
  get searchAzureNonActions() { return element(by.css('[formgroupname="azureCloudNonActions"] [placeholder="Search Actions"]')); }
  selectAction(action: any) { return element(by.xpath(`//li[contains(.,'${action}')]`)); }
  get addAwsAction() { return element(by.css('.btn-sm.btn-primary')); }
  get addAwsNonActions() { return element(by.css('step[formgroupname="awsCloudNonActions"] li:nth-of-type(1) svg:nth-of-type(1)')); }
  get addAzureAction() { return element(by.xpath('//div[@class="selector-panel card mr-2 ng-star-inserted"]//li[1]/button[@class="btn btn-primary btn-sm"]')); }
  get addAzureNonActions() { return element(by.css('step[formgroupname="azureCloudNonActions"] li:nth-of-type(1) > button:nth-of-type(1)')); }
  get submitButton() { return element(by.css('button[type="submit"]')); }
  get editCloudRoleButton() { return element(by.css('[data-e2e="editCloudRoleButton"]')); }
  get deleteCloudRoleButton() { return element(by.css('[data-e2e="deleteCloudRoleButton"]')); }
  get confirmDeleteButton() { return element(by.css('[data-e2e="confirmDeleteModalBtn"]')); }
  get removeAction() { return element(by.css('.btn-sm.btn-danger')); }
  get toast() { return $('#toast-container'); }
  get list() { return element(by.xpath('//div[@class="list"]')); }
  get search() { return element(by.css('[placeholder="Search"]')); }
  get surfaceDropDown() { return element(by.css('[data-e2e="surfaceSwitcherDropdown"]')); }
  selectSurface(Surface: string) { return element(by.xpath(`//option[contains(.,'${Surface}')]`)); }
  searchCloudRoleName(cloudRole: string) { return element(by.css(`[data-e2e='${cloudRole}']`)); }
  get editAwsActions() { return element(by.css('button[data-e2e="editAwsActions"]')); }
  get editAwsNonActions() { return element(by.css('button[data-e2e="editAwsNonActions"]')); }
  get editAzureActions() { return element(by.css('button[data-e2e="editAzureActions"]')); }
  get editAzureNonActions() { return element(by.css('button[data-e2e="editAzureNonActions"]')); }
  get saveButton() { return element(by.xpath('//button[.="Save"]')); }
  get searchInEditWindow() { return element(by.css('[placeholder="Search Actions"]')); }
  get addButton() { return element(by.xpath('//button[@class="btn btn-primary btn-sm"]')); }
  searchCloudRoleFromList(cloudRole: string) { return element(by.css(`//h5[.='${cloudRole}']`)); }


  async createCloudRole(surfaceName: string = null, name: string = null, description: any = null, cloudProvider: string = null,
    status: any, action: string[] = null, nonAction: string[] = null) {

    await WaitHelper.waitForElementToBeHidden(this.toast);
    await elementClick(this.cloudRolesLink);
    // await browser.get(configProperties.qaUrl + '/cloud-roles');
    await browser.logger.info('Cloud Roles Menu Clicked');
    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'List displayed');

    await this.selectSurfaceFromDropDown(surfaceName);
    await browser.logger.info('Selected E2E Surface');

    // Click on '+' Button to Create Cloud Role
    await elementClick(this.createNewCloudRole);
    await browser.logger.info('Clicked New Cloud Role Button');

    // Enter Cloud Role Name
    await WaitHelper.waitForElementToBeClickable(this.enterCloudRoleName, 2000, 'Cloud Role name ');
    await elementSendkeys(this.enterCloudRoleName, name);
    await browser.logger.info('Cloud Role Name Entered');

    // Enter Cloud Role Description
    await WaitHelper.waitForElementToBeClickable(this.enterCloudRoleDescription, 2000, 'Description ');
    await elementSendkeys(this.enterCloudRoleDescription, description);
    await browser.logger.info('Cloud Role Description Entered');

    await WaitHelper.waitForElementToBeClickable(this.selectCloudProvider(cloudProvider), 5000, 'Cloud Role Provider ');
    await elementClick(this.selectCloudProvider(cloudProvider));
    await browser.logger.info('Cloud Provider Selected');
    await console.log('Cloud Provider Is - ', cloudProvider);

    if (status === 'PUBLISHED') {
      await WaitHelper.waitForElementToBeClickable(this.publishedStatus, 2000, 'Published ');
      await elementClick(this.publishedStatus);
      await browser.logger.info('Selected Published');

      await WaitHelper.waitForElementToBeClickable(this.minor, 2000, 'Minor ');
      await elementClick(this.minor);
      await browser.logger.info('Selected Minor');
    }

    await WaitHelper.waitForElementToBePresent(this.nextButton, 5000, 'Next');
    await elementClick(this.nextButton);
    await browser.logger.info('Moved To OPERATIONS Page');
    await browser.sleep(2000);

    await WaitHelper.waitForElementToBeClickable(this.searchAWSActions, 2000, 'Action');
    // await browser.actions().mouseMove(this.searchAWSActions).perform();
    for (let actionName of action) {
      await elementClick(this.searchAWSActions);
      await this.searchAWSActions.sendKeys(actionName);
      await browser.logger.info('Selected Action Name');
    }

    await WaitHelper.waitForElementToBeClickable(this.addAwsAction, 2000, 'Add Action');
    await browser.actions().mouseMove(this.addAwsAction).perform();
    await browser.sleep(2000);
    await elementClick(this.addAwsAction);
    await browser.logger.info(action, 'Selected');

    await WaitHelper.waitForElementToBePresent(this.nextButton, 5000, 'Next');
    await elementClick(this.nextButton);
    await browser.logger.info('Moved To NON-OPERATIONS Page');
    await browser.sleep(2000);

    await WaitHelper.waitForElementToBeClickable(this.searchAWSNonActions, 2000, 'Non-Action Selected ');
    for (let nonActionName of nonAction) {
      await browser.actions().mouseMove(this.searchAWSNonActions).perform();
      await elementClick(this.searchAWSNonActions);
      await this.searchAWSNonActions.sendKeys(nonActionName);
      await browser.logger.info(nonAction, 'Selected Non-Action');
    }

    await WaitHelper.waitForElementToBeClickable(this.addAwsNonActions, 2000, 'Add');
    await browser.actions().mouseMove(this.addAwsNonActions).perform();
    await elementClick(this.addAwsNonActions);
    await browser.logger.info(nonAction, 'Selected');

    await WaitHelper.waitForElementToBePresent(this.nextButton, 5000, 'Next');
    await elementClick(this.nextButton);
    await browser.logger.info('Moved To Review Cloud Role Page');
    await browser.sleep(2000);

    await WaitHelper.waitForElementToBeClickable(this.submitButton, 5000, 'Submit ');
    await elementClick(this.submitButton);
    await browser.logger.info('Cloud Role Submitted');
    await browser.sleep(2000);
  }

  getRandomNum = function (min, max) {
    return parseInt(Math.random() * (max - min) + min);
  };

  async searchCloudRole(surfaceName: string = null, name: string = null) {

    await WaitHelper.waitForElementToBeHidden(this.toast);
    await WaitHelper.waitForElementToBeDisplayed(this.cloudRolesLink, 5000, 'Menu');
    await elementClick(this.cloudRolesLink);
    await browser.logger.info('Cloud Roles Menu Clicked');

    await this.selectSurfaceFromDropDown(surfaceName);
    await browser.logger.info('Selected E2E Surface');

    await elementClear(this.search, name);

    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'list');
    await this.search.sendKeys(name);
    await elementClick(this.searchCloudRoleName(name));
    await browser.logger.info(name, 'Selected');
  }

  async editCloudRoleNameAndPublish(surfaceName: string = null, name: string = null, description: any) {
    // Search CLoud Role.
    await this.searchCloudRole(surfaceName, name);

    // Click Edit Icon
    await WaitHelper.waitForElementToBePresent(this.editCloudRoleButton, 5000, 'Edit Button ');
    await elementClick(this.editCloudRoleButton);
    await browser.logger.info('Edit Button Clicked');

    // Edit Cloud Role Name
    await WaitHelper.waitForElementToBePresent(this.enterCloudRoleName, 5000, 'Cloud Role Name ');
    await elementSendkeys(this.enterCloudRoleName, ' Updated');
    await browser.logger.info('Cloud Role Name: ', name + ' Updated');

    // Edit Cloud Role Description
    await WaitHelper.waitForElementToBePresent(this.enterCloudRoleDescription, 5000, 'Cloud Role Description ');
    await elementSendkeys(this.enterCloudRoleDescription, ' Updated');
    await browser.logger.info('Cloud Role Description Entered: ', description + ' Updated');

    await WaitHelper.waitForElementToBeClickable(this.publishedStatus, 2000, 'Published ');
    await elementClick(this.publishedStatus);
    await browser.logger.info('Selected Published');

    await WaitHelper.waitForElementToBeClickable(this.minor, 2000, 'Minor ');
    await elementClick(this.minor);
    await browser.logger.info('Selected Minor');

    // Submit Cloud Role
    await WaitHelper.waitForElementToBeClickable(this.submitButton, 5000, 'Submit ');
    await elementClick(this.submitButton);
    await browser.logger.info('Cloud Role Updated');
    await console.log('Cloud Role Is', name + ' Updated');
  }

  async publishCloudRole(surfaceName: string = null, name: string = null, description: any) {
    // Search CLoud Role.
    await this.searchCloudRole(surfaceName, name);

    // Click Edit Icon
    await WaitHelper.waitForElementToBePresent(this.editCloudRoleButton, 5000, 'Edit Button ');
    await elementClick(this.editCloudRoleButton);
    await browser.logger.info('Edit Button Clicked');

    await WaitHelper.waitForElementToBeClickable(this.publishedStatus, 2000, 'Published ');
    await browser.actions().mouseMove(this.publishedStatus).perform();
    await elementClick(this.publishedStatus);
    await browser.logger.info('Selected Published');

    await WaitHelper.waitForElementToBeClickable(this.minor, 2000, 'Minor ');
    await browser.actions().mouseMove(this.minor).perform();
    await elementClick(this.minor);
    await browser.logger.info('Selected Minor');

    // Submit Cloud Role
    await WaitHelper.waitForElementToBeClickable(this.submitButton, 5000, 'Submit ');
    await elementClick(this.submitButton);
    await browser.logger.info('Cloud Role Updated');
    await console.log('Cloud Role Is', name + ' Updated');
  }

  async editAWSAction(surfaceName: string = null, name: string = null, awsAction: string[] = null) {

    await this.searchCloudRole(surfaceName, name);
    await browser.logger.info(name, 'Selected');

    for (let awsActionName of awsAction) {
      console.log('value', awsAction);
      await WaitHelper.waitForElementToBePresent(this.editAwsActions, 5000, 'Edit AWS Operations Button');
      await browser.actions().mouseDown(this.editAwsActions).perform();
      await elementClick(this.editAwsActions);
      await browser.logger.info('Edit Button Clicked');

      await WaitHelper.waitForElementToBeClickable(this.searchInEditWindow, 5000, 'AWS Action');
      await browser.actions().mouseMove(this.searchInEditWindow).perform();
      await elementClick(this.searchInEditWindow);
      await this.searchInEditWindow.sendKeys(awsActionName);
      await browser.logger.info('Selected Action Name');
      await browser.sleep(2000);

      await WaitHelper.waitForElementToBeClickable(this.addButton, 2000, 'Add AWS Non Action');
      await browser.actions().mouseMove(this.addButton).perform();
      await elementClick(this.addButton);
      await browser.logger.info(awsAction, 'Selected');
      await browser.sleep(2000);

      await WaitHelper.waitForElementToBeClickable(this.saveButton, 5000, 'Save ');
      await browser.actions().mouseMove(this.saveButton).perform();
      await elementClick(this.saveButton);
      await browser.logger.info('Cloud Role Updated');
    }
  }
  async editAWSNonAction(surfaceName: string = null, name: string = null, awsNonAction: string[] = null) {

    await this.searchCloudRole(surfaceName, name);

    for (let awsNonActionName of awsNonAction) {
      console.log('value', awsNonAction);
      await WaitHelper.waitForElementToBePresent(this.editAwsNonActions, 5000, 'Edit AWS Non Operations Button');
      await browser.actions().mouseDown(this.editAwsNonActions).perform();
      await elementClick(this.editAwsNonActions);
      await browser.logger.info('Edit Button Clicked');

      await WaitHelper.waitForElementToBeClickable(this.searchInEditWindow, 5000, 'AWS Non Action');
      await browser.actions().mouseMove(this.searchInEditWindow).perform();
      await elementClick(this.searchInEditWindow);
      await this.searchInEditWindow.sendKeys(awsNonActionName);
      await browser.logger.info('Selected Action Name');
      await browser.sleep(2000);

      await WaitHelper.waitForElementToBeClickable(this.addButton, 2000, 'Add AWS Non Action');
      await browser.actions().mouseMove(this.addButton).perform();
      await elementClick(this.addButton);
      await browser.logger.info(awsNonAction, 'Selected');
      await browser.sleep(2000);

      await WaitHelper.waitForElementToBeClickable(this.saveButton, 5000, 'Save ');
      await browser.actions().mouseMove(this.saveButton).perform();
      await elementClick(this.saveButton);
      await browser.logger.info('Cloud Role Updated');
    }
  }

  async editAzureAction(surfaceName: string = null, name: string = null, azureAction: string[] = null) {

    await this.searchCloudRole(surfaceName, name);

    for (let azureActionName of azureAction) {
      console.log('value', azureAction);
      await WaitHelper.waitForElementToBePresent(this.editAzureActions, 5000, 'Edit Azure Operations Button');
      await browser.actions().mouseDown(this.editAzureActions).perform();
      await elementClick(this.editAzureActions);
      await browser.logger.info('Edit Button Clicked');

      await WaitHelper.waitForElementToBeClickable(this.searchInEditWindow, 5000, 'Azure Action');
      await browser.actions().mouseMove(this.searchInEditWindow).perform();
      await elementClick(this.searchInEditWindow);
      await this.searchInEditWindow.sendKeys(azureActionName);
      await browser.logger.info('Selected Action Name');
      await browser.sleep(3000);

      await WaitHelper.waitForElementToBeClickable(this.addButton, 2000, 'Add Azure Action');
      await browser.actions().mouseMove(this.addButton).perform();
      await elementClick(this.addButton);
      await browser.logger.info(azureAction, 'Selected');
      await browser.sleep(2000);

      await WaitHelper.waitForElementToBeClickable(this.saveButton, 5000, 'Save ');
      await browser.actions().mouseMove(this.saveButton).perform();
      await elementClick(this.saveButton);
      await browser.logger.info('Cloud Role Updated');
    }
  }

  async editAzureNonAction(surfaceName: string = null, name: string = null, azureNonAction: string[] = null) {

    await this.searchCloudRole(surfaceName, name);

    for (let azureNonActionName of azureNonAction) {
      console.log('value', azureNonAction);
      await WaitHelper.waitForElementToBePresent(this.editAzureNonActions, 5000, 'Edit Azure Non Operations Button');
      await browser.actions().mouseDown(this.editAzureNonActions).perform();
      elementClick(this.editAzureNonActions);
      await browser.logger.info('Edit Button Clicked');

      await WaitHelper.waitForElementToBeClickable(this.searchInEditWindow, 5000, 'Azure Non Action');
      await browser.actions().mouseMove(this.searchInEditWindow).perform();
      await elementClick(this.searchInEditWindow);
      await this.searchInEditWindow.sendKeys(azureNonActionName);
      await browser.logger.info('Selected Action Name');
      await browser.sleep(3000);

      await WaitHelper.waitForElementToBeClickable(this.addButton, 2000, 'Add Azure Non Action');
      await browser.actions().mouseMove(this.addButton).perform();
      await elementClick(this.addButton);
      await browser.logger.info(azureNonAction, 'Selected');
      await browser.sleep(2000);

      await WaitHelper.waitForElementToBeClickable(this.saveButton, 5000, 'Save ');
      await browser.actions().mouseMove(this.saveButton).perform();
      await elementClick(this.saveButton);
      await browser.logger.info('Cloud Role Updated');
    }
  }

  async deleteCloudRole(surfaceName: string = null, name: string = null, deleteOnly: string = null) {

    await WaitHelper.waitForElementToBeHidden(this.toast);
    await elementClick(this.cloudRolesLink);
    await browser.logger.info('Cloud Role Menu Clicked');

    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'List displayed');
    await this.selectSurfaceFromDropDown(surfaceName);

    await elementClear(this.search, name);

    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Cloud Role List Displayed');
    if (!deleteOnly)
      name = name + ' Updated';
    await this.search.sendKeys(name);
    await browser.sleep(2000);
    await elementClick(this.searchCloudRoleName(name));
    await browser.logger.info(name, 'Selected');

    await WaitHelper.waitForElementToBeClickable(this.deleteCloudRoleButton, 2000, 'Delete');
    await browser.actions().mouseMove(this.deleteCloudRoleButton).perform();
    await elementClick(this.deleteCloudRoleButton);
    await browser.logger.info('Clicked Delete Button');

    await WaitHelper.waitForElementToBeClickable(this.confirmDeleteButton, 2000, 'Confirm Delete');
    await browser.actions().mouseMove(this.confirmDeleteButton).perform();
    await elementClick(this.confirmDeleteButton);
    await browser.logger.info(name, 'Is deleted');
  }

  async verifyCloudRole(surfaceName: string = null, name: string = null) {
    await WaitHelper.waitForElementToBeHidden(this.toast);
    await elementClick(this.cloudRolesLink);
    // await browser.get(configProperties.qaUrl + '/cloud-roles');
    await browser.logger.info('Cloud Roles Menu Clicked');
    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'List displayed');

    await this.selectSurfaceFromDropDown(surfaceName);
    await browser.logger.info('Selected E2E Surface');

    await elementClear(this.search, name);

    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'list');
    await this.search.sendKeys(name);
  }

  async selectSurfaceFromDropDown(surfaceName: string = null) {
    await WaitHelper.waitForElementToBePresent(this.surfaceDropDown, 5000, 'Surface Drop Down ');
    await elementClick(this.surfaceDropDown);
    await browser.logger.info(surfaceName, 'Surface Drop Down Clicked');

    await WaitHelper.waitForElementToBePresent(this.selectSurface(surfaceName), 5000, 'Surface');
    await elementClick(this.selectSurface(surfaceName));
    await browser.logger.info('Surface Selcted');
    await browser.sleep(2000);
  }

  async getPageTitle() {
    return browser.getTitle();
  }
}
