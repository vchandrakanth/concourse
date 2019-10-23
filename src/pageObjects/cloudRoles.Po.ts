import { browser, element, by, $ } from 'protractor';
import { elementClick, elementSendkeys, elementClear } from '../utils/utils';
import { WaitHelper } from '../utils/waitHelper';
let configProperties = require('../conf/properties');

export class CloudRoles {
  get cloudRolesLink() { return element(by.css('a[routerlink="cloud-roles"]')); }
  get createNewCloudRole() { return element(by.css('[data-e2e="createNewCloudRole"]')); }
  get enterCloudRoleName() { return element(by.css('[placeholder="Cloud Role"]')); }
  get enterCloudRoleDescription() { return element(by.css('textarea')); }
  get saveButton() { return element(by.css('[data-e2e="attributeTagSaveButton"]')); }
  get statusDropDown() { return element(by.xpath('//select[@class="form-control ng-pristine ng-valid ng-touched"]')); }
  get draftStatus() { return element(by.css('option[value="DRAFT"]')); }
  get publishedStatus() { return element(by.css('option[value="PUBLISHED"]')); }
  get nextButton() { return element(by.css('.btn-primary[type="button"]')); }
//   get selectAWSActinsDropDown() { return(by.css('ng-select[formcontrolname="awsActions"]')); }
//   searchAWSAction(AWSAction: string) { return element(by.css(`//strong[contains(.,'${AWSAction}')]`)); }
//   get selectAWSNonActinsDropDown() { return(by.css('ng-select[formcontrolname="awsNonActions"]')); }
//   searchAWSNonAction(AWSAction: string) { return element(by.css(`//strong[contains(.,'${AWSAction}')]`)); }
//   get selectAWSActinsDropDown() { return(by.css('ng-select[formcontrolname="awsActions"]')); }
//   searchAWSAction(AWSAction: string) { return element(by.css(`//strong[contains(.,'${AWSAction}')]`)); }
//   get selectAWSActinsDropDown() { return(by.css('ng-select[formcontrolname="awsActions"]')); }
//   searchAWSAction(AWSAction: string) { return element(by.css(`//strong[contains(.,'${AWSAction}')]`)); }
  get editButton() { return element(by.css('[data-e2e="editAttributeTagButton"]')); }
  get toast() { return $('#toast-container'); }
  get list() { return element(by.xpath('//div[@class="list"]')); }
  // get deleteButton() { return element(by.css('.btn-danger')); }
  get deleteButton() { return element(by.css('[data-e2e="deleteAttributeTagButton"]')); }
  // get confirmDeleteButton() { return element(by.css('.delete')); }
  get confirmDeleteButton() { return element(by.css('[data-e2e="confirmDeleteModalBtn"]')); }

  // searchAttribute(attributeName: string) { return element(by.xpath(`//h5[.='${attributeName}']`)); }
  searchAttributeName(attributeName: string) { return element(by.css(`[data-e2e='${attributeName}']`)); }
  get search() { return element(by.css('[placeholder="Search"]')); }
  get controlTopologyDropDown() { return element(by.css('select')); }
  selectTopology(topology: string) { return element(by.xpath(`//option[contains(.,'${topology}')]`)); }

  async createAttributeTag(name: string = null, description: any) {

    await WaitHelper.waitForElementToBeHidden(this.toast);
    // await browser.get(configProperties.qaUrl + '/attribute-tags');
    // await browser.actions().mouseDown(this.attributeTagsLink).perform();
    await elementClick(this.cloudRolesLink);

    await browser.logger.info('AttributeTags Menu Clicked');
    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'List displayed');

    await WaitHelper.waitForElementToBeDisplayed(this.controlTopologyDropDown, 2000, 'Control Topology Drop Down');
    await browser.actions().mouseDown(this.controlTopologyDropDown).perform();
    await elementClick(this.controlTopologyDropDown);
    await browser.logger.info('Control Topology Drop Down Selected');

    await WaitHelper.waitForElementToBeClickable(this.selectTopology(configProperties.SurfaceData.surfaceName), 2000, 'E2E Topology ');
    await elementClick(this.selectTopology(configProperties.SurfaceData.surfaceName));
    await browser.logger.info('Selected E2E Topology');

    // Click on '+' Button to Create new Tag
    await elementClick(this.createNewCloudRole);
    await browser.logger.info('Clicked New Attribute Tag Button');

    // Enter Tag Name
    await WaitHelper.waitForElementToBeClickable(this.enterCloudRoleName, 2000, 'attribute tag name ');
    await elementSendkeys(this.enterCloudRoleName, name);
    await browser.logger.info('Attribute Tag Name Entered');

    // Enter Tag Description
    await WaitHelper.waitForElementToBeClickable(this.enterCloudRoleDescription, 2000, 'Description ');
    await elementSendkeys(this.enterCloudRoleDescription, description);
    await browser.logger.info('Attribute Tag Description Entered');

    // Save Attribute Tag
    await WaitHelper.waitForElementToBeClickable(this.saveButton, 5000, 'Save ');
    await elementClick(this.saveButton);
    await browser.sleep(3000);
    await browser.logger.info('Attribute Tag Created');
    await console.log('Attribute Tag Is', name);
  }

  getRandomNum = function (min, max) {
    return parseInt(Math.random() * (max - min) + min);
  };

  async searchAttribute(name: string = null, description: any = null) {

    await WaitHelper.waitForElementToBeHidden(this.toast);

    await browser.get(configProperties.qaUrl + '/attribute-tags');
    // await browser.actions().mouseDown(this.attributeTagsLink).perform();
    // await elementClick(this.attributeTagsLink);

    await browser.logger.info('AttributeTags Menu Clicked');
    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'List displayed');

    await WaitHelper.waitForElementToBeDisplayed(this.controlTopologyDropDown, 2000, 'Surface Drop Down');
    await browser.actions().mouseDown(this.controlTopologyDropDown).perform();
    await elementClick(this.controlTopologyDropDown);
    await browser.logger.info('Surface Drop Down Selected');

    await WaitHelper.waitForElementToBeClickable(this.selectTopology(configProperties.SurfaceData.surfaceName), 2000, 'E2E Topology ');
    await elementClick(this.selectTopology(configProperties.SurfaceData.surfaceName));
    await browser.logger.info('Selected E2E Topology');
    await browser.sleep(2000);

    // Select Created Attribute Tag
    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'AttributeTag List Displayed');
    await this.search.sendKeys(name);
    await elementClick(this.searchAttributeName(name));
    await browser.logger.info(name, 'Selected');
  }

  async editAttributeTag(name: string = null, description: any) {

    // Search arrtribute.
    await this.searchAttribute(name, description);

    // Click Edit Icon
    await WaitHelper.waitForElementToBePresent(this.editButton, 5000, 'Edit Button ');
    await elementClick(this.editButton);
    await browser.logger.info('Edit Button Clicked');

    // Edit Attribute Tag Name
    await WaitHelper.waitForElementToBePresent(this.enterCloudRoleName, 5000, 'AttributeTag Name ');
    await elementSendkeys(this.enterCloudRoleName, ' Updated');
    await browser.logger.info('Asset Name Entered: ', name + ' Updated');

    // Edit Attribute Tag Description
    await WaitHelper.waitForElementToBePresent(this.enterCloudRoleDescription, 5000, 'AttributeTag Description ');
    await elementSendkeys(this.enterCloudRoleDescription, ' Updated');
    await browser.logger.info('Asset Description Entered: ', description + ' Updated');

    // Save Attribute Tag
    await WaitHelper.waitForElementToBeClickable(this.saveButton, 5000, 'Save ');
    await elementClick(this.saveButton);
    await browser.logger.info('Attribute Tag Updated');
    await console.log('Attribute Tag Is', name + ' Updated');
  }

  async deleteAttributeTag(name: string = null, deleteOnly: string = null) {
    // wait till the toast element flash is hidden.
    await WaitHelper.waitForElementToBeHidden(this.toast);
    await browser.get(configProperties.qaUrl + '/attribute-tags');
    // await browser.actions().mouseDown(this.attributeTagsLink).perform();
    // await elementClick(this.attributeTagsLink);


    await browser.logger.info('AttributeTags Menu Clicked');
    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'List displayed');

    await WaitHelper.waitForElementToBeDisplayed(this.controlTopologyDropDown, 2000, 'Surface Drop Down');
    await browser.actions().mouseDown(this.controlTopologyDropDown).perform();
    await elementClick(this.controlTopologyDropDown);
    await browser.logger.info('Surface Drop Down Selected');

    await WaitHelper.waitForElementToBeClickable(this.selectTopology(configProperties.SurfaceData.surfaceName), 2000, 'E2E Topology ');
    await elementClick(this.selectTopology(configProperties.SurfaceData.surfaceName));
    await browser.logger.info('Selected E2E Topology');

    await elementClear(this.search, name);

    // Select Created Attribute Tag/attr
    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'AttributeTag List Displayed');
    if (!deleteOnly)
      name = name + ' Updated';
    await this.search.sendKeys(name);
    await elementClick(this.searchAttributeName(name));
    await browser.logger.info(name, 'Selected');

    await WaitHelper.waitForElementToBeClickable(this.deleteButton, 2000, 'Delete');
    await browser.actions().mouseMove(this.deleteButton).perform();
    await elementClick(this.deleteButton);
    await browser.logger.info('Clicked Delete Button');

    await WaitHelper.waitForElementToBeClickable(this.confirmDeleteButton, 2000, 'Confirm Delete');
    await browser.actions().mouseMove(this.confirmDeleteButton).perform();
    await elementClick(this.confirmDeleteButton);
    await browser.logger.info(name, 'Is deleted');
  }

  async verifyAttributeTag(name: any) {

    await WaitHelper.waitForElementToBeHidden(this.toast);

    await elementClear(this.search, name);

    await this.search.sendKeys(name + ' Updated');
    await browser.logger.info('Searched For ', name + ' Updated');
    await browser.logger.info(name + ' Updated', ' Is Not Present');
  }

  async getPageTitle() {
    return browser.getTitle();
  }
}
