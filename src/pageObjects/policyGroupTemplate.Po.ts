import { browser, element, by, $ } from 'protractor';
import { elementClick, elementSendkeys, elementClear } from '../utils/utils';
import { WaitHelper } from '../utils/waitHelper';
let configProperties = require('../conf/properties');


export class PolicyGroupTemplatePage {

  get policyGroupTemplateLink() { return element(by.css('[data-e2e="linkPolicyGroupTemplates"]')); }

  get createNewPolicyGroupTemplate() { return element(by.css('button[data-e2e="createNewPGT"]')); }
  get policyGroupTemplateName() { return element(by.css('[data-e2e="PGTname"]')); }
  // get editPolicyGroupTemplateName() { return element(by.css('[data-e2e="inputName"]')); }
  get editPolicyGroupTemplateName() { return element(by.css('#name')); }
  get policyGroupTemplateDescription() { return element(by.css('textarea[data-e2e="PGTdescription"]')); }
  get policyGroupTemplateStatusDropdown() { return element(by.css('select[formcontrolname="status"]')); }
  get policyGroupTemplateDraft() { return element(by.css('option[value="DRAFT"]')); }
  get policyGroupTemplatePublished() { return element(by.css('option[value="PUBLISHED"]')); }
  get policyGroupTemplateIncrementBy() { return element(by.css('select[formcontrolname="versionBump"]')); }
  get policyGroupTemplateMajor() { return element(by.css('option[value="MAJOR"]')); }
  get policyGroupTemplateMinor() { return element(by.css('option[value="MINOR"]')); }
  get nextButton() { return element(by.xpath('//button[.="Next"]')); }
  get policyGroupTemplateList() { return element($('.list')); }
  get policyGroupTemplateSubmit() { return element(by.xpath('//button[.="Submit"]')); }
  get searchTemplate() { return element(by.css('[placeholder="Search"]')); }
  get toast() { return $('#toast-container'); }
  get list() { return $('.list'); }
  policyTemplate(policyTemplateName: any) { return element(by.xpath(`//strong[.='${policyTemplateName}']`)); }
  get editButton() { return element(by.css('[data-e2e="editPolicyTemplate"]')); }
  get search() { return element(by.css('[placeholder="Search"]')); }
  // searchPolicyGroupTemplateName(name: string) { return element(by.xpath(`//h5[.='${name}']`)); }
  searchPolicyGroupTemplateName(name: string) { return element(by.css(`h5[data-e2e="${name}"]`)); } // [data-e2e="
  // get saveButton() { return element(by.css('.Save')); }
  get saveButton() { return element(by.css('[data-e2e="saveBtn"]')); }
  // get deleteButton() { return element(by.css('.btn-danger')); }
  get deleteButton() { return element(by.css('[data-e2e="PGTDeleteBtn"]')); }
  // get confirmDeleteButton() { return element(by.css('.delete')); }
  get confirmDeleteButton() { return element(by.css('[data-e2e="confirmDeleteModalBtn"]')); }
  // get policyGroupTemplateEditStatusDropdown() { return element(by.css('select[ng-reflect-name="status"]')); }
  get policyGroupTemplateEditStatusDropdown() { return element(by.xpath('//option[.="Select Status"]')); }
  get policyGroupTemplateEditDraft() { return element(by.xpath('//option[contains(.,"Draft")]')); }
  get policyGroupTemplateEditPublished() { return element(by.xpath('//option[contains(.,"Published")]')); }
  get policyGroupTemplateEditDeprecated() { return element(by.xpath('//option[contains(.,"Deprecated")]')); }
  // policyGroupTemplateElement(name: any) { return element(by.xpath(`//h5[.='${name}']`)); }
  policyGroupTemplateElement(name: any) { return element(by.css(`[data-e2e="${name}"]`)); }
  get surfaceDropDown() { return element(by.css('select')); }
  selectSurface(topology: string) { return element(by.xpath(`//option[contains(.,'${topology}')]`)); }
  policyGroupTemplateNameDraft;
  policyGroupTemplateNamePublish;

  async createPolicyGroupTemplate(status: any, name: string = null, desc: any = 'Default description', policyTemplateName: string = null) {

    if (status === 'DRAFT') {

      this.policyGroupTemplateNameDraft = configProperties.policyGroupTemplateData.policyGroupTemplateNameDraft;
    }
    else {
      this.policyGroupTemplateNamePublish = configProperties.policyGroupTemplateData.policyGroupTemplateNamePublish;
    }
    // wait till the toast element flash is hidden.// wait till the toast element flash is hidden.
    await WaitHelper.waitForElementToBeHidden(this.toast);

    // Click on the PolicyGroups Template
    await browser.get(configProperties.qaUrl + '/policy-group-templates');
    // await browser.actions().mouseDown(this.policyGroupTemplateLink).perform();
    // await elementClick(this.policyGroupTemplateLink);

    await browser.logger.info('Policy Group Template Clicked');
    await WaitHelper.waitForElementToBeDisplayed(this.list);

    await WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Control Topology Drop Down');
    await browser.actions().mouseDown(this.surfaceDropDown).perform();
    await elementClick(this.surfaceDropDown);
    await browser.logger.info('Control Topology Drop Down Selected');

    await WaitHelper.waitForElementToBeClickable(this.selectSurface(configProperties.SurfaceData.surfaceName), 2000, 'E2E Topology ');
    await elementClick(this.selectSurface(configProperties.SurfaceData.surfaceName));
    await browser.logger.info('Selected E2E Topology');

    // Click on '+' Button to Create new policy
    await elementClick(this.createNewPolicyGroupTemplate);
    await browser.logger.info('Clicked + Button');

    // Enter Policy Name
    await WaitHelper.waitForElementToBePresent(this.policyGroupTemplateName, 10000, 'Policy Group Template Name');
    await elementSendkeys(this.policyGroupTemplateName, name);
    await browser.logger.info('Entered Policy Template Name', name);


    // Enter Policy Description
    await WaitHelper.waitForElementToBePresent(this.policyGroupTemplateDescription, 10000, 'Description ');
    await elementSendkeys(this.policyGroupTemplateDescription, desc);
    await browser.logger.info('Description Entered', desc);

    // Select Draft status
    await WaitHelper.waitForElementToBeClickable(this.policyGroupTemplateStatusDropdown, 2000, 'Status Drop Down ');
    await elementClick(this.policyGroupTemplateStatusDropdown);
    await browser.logger.info('Selected Status DropDown');

    // If selected published following code is executed.

    if (status === 'PUBLISHED') {
      await WaitHelper.waitForElementToBeClickable(this.policyGroupTemplatePublished, 2000, 'Published ');
      await elementClick(this.policyGroupTemplatePublished);
      await browser.logger.info(' Selected Published');

      await WaitHelper.waitForElementToBeClickable(this.policyGroupTemplateMinor, 2000, 'Minor ');
      await elementClick(this.policyGroupTemplateMinor);
      await browser.logger.info('Selected Increment by as Minor');

    }

    await WaitHelper.waitForElementToBeClickable(this.nextButton, 2000, 'Next ');
    await elementClick(this.nextButton);
    await browser.logger.info('Click on next');

    // Select Policy Template
    await WaitHelper.waitForElementToBeClickable(this.policyTemplate(policyTemplateName), 2000, 'Template ');
    await browser.actions().mouseDown(this.policyTemplate(policyTemplateName)).perform();
    await elementClick(this.policyTemplate(policyTemplateName));
    await browser.logger.info('Allowed AWS Products Selected');

    // click on next to Review Policy Group Template Page
    await WaitHelper.waitForElementToBeClickable(this.nextButton, 2000, 'Next Button ');
    await elementClick(this.nextButton);
    await browser.logger.info('Moved to Review PolicyGroup Template Page');

    // Click On Submit
    await WaitHelper.waitForElementToBeClickable(this.policyGroupTemplateSubmit, 2000, 'Submit Button ');
    await elementClick(this.policyGroupTemplateSubmit);
    await browser.logger.info('Policy Group Template Created', name);

  }

  async getId() {
    return browser.getCurrentUrl().then(function (url) {
      console.log(url);
      let str = 'currentUrl';
      let entityId = [];
      entityId = url.split('/');
      return entityId[4];
    });
  }

  getRandomNum = function (min, max) {
    return parseInt(Math.random() * (max - min) + min);
  };

  async searchPolicyGroupTemplate(name: string = null) {
    await WaitHelper.waitForElementToBeHidden(this.toast);
    await browser.get(configProperties.qaUrl + '/policy-group-templates');
    // await browser.actions().mouseDown(this.policyGroupTemplateLink).perform();
    // await elementClick(this.policyGroupTemplateLink);

    await browser.logger.info('Policy Group Template Clicked');
    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'List displayed');

    await WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Control Topology Drop Down');
    await browser.actions().mouseDown(this.surfaceDropDown).perform();
    await elementClick(this.surfaceDropDown);
    await browser.logger.info('Control Topology Drop Down Selected');

    await WaitHelper.waitForElementToBeClickable(this.selectSurface(configProperties.SurfaceData.surfaceName), 2000, 'E2E Topology ');
    await elementClick(this.selectSurface(configProperties.SurfaceData.surfaceName));
    await browser.logger.info('Selected E2E Topology');
    await browser.sleep(2000);

    // Select Created Policy group Template
    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy group Template List Displayed');
    await this.search.sendKeys(name);
  }

  async editPolicyGroupTemplate(name: string = null, desc) {
    await this.searchPolicyGroupTemplate(name);
    await elementClick(this.searchPolicyGroupTemplateName(name));
    await browser.logger.info(name, 'Selected');

    // Click Edit Icon
    await WaitHelper.waitForElementToBePresent(this.editButton, 5000, 'Policy Group Template Edit ');
    await elementClick(this.editButton);
    await browser.logger.info('Edit Button Clicked');

    // Edit Policy Group Template Name
    await WaitHelper.waitForElementToBePresent(this.editPolicyGroupTemplateName, 5000, 'Policy Group Template Name ');
    await elementSendkeys(this.editPolicyGroupTemplateName, ' Updated');
    await browser.logger.info('Policy Group Template Name Entered: ');

    await WaitHelper.waitForElementToBePresent(this.policyGroupTemplateEditStatusDropdown, 5000, 'Policy Group Template Drop Down ');
    await elementClick(this.policyGroupTemplateEditStatusDropdown);
    await browser.logger.info('Policy Group Template Status Drop DOwn ');

    await WaitHelper.waitForElementToBeClickable(this.policyGroupTemplateEditDraft, 2000, 'DRAFT ');
    await elementClick(this.policyGroupTemplateEditDraft);
    await browser.logger.info(' Selected Draft');

    // Click on Submit button to submit the Policy Group Template
    await WaitHelper.waitForElementToBeClickable(this.saveButton, 5000, 'Save ');
    await elementClick(this.saveButton);
    await browser.logger.info('Policy Group Template Saved', name);
  }

  async deletePolicyGroupTemplate(name: string = null, deleteOnly: string = null) {
    await WaitHelper.waitForElementToBeHidden(this.toast);
    // Click on Policy Group Template Menu Button
    await browser.get(configProperties.qaUrl + '/policy-group-templates');
    // await browser.actions().mouseDown(this.policyGroupTemplateLink).perform();
    // await elementClick(this.policyGroupTemplateLink);

    await browser.logger.info('Policy Group Template Clicked');
    await WaitHelper.waitForElementToBeDisplayed(this.list);

    await WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Control Topology Drop Down');
    await browser.actions().mouseDown(this.surfaceDropDown).perform();
    await elementClick(this.surfaceDropDown);
    await browser.logger.info('Control Topology Drop Down Selected');

    await WaitHelper.waitForElementToBeClickable(this.selectSurface(configProperties.SurfaceData.surfaceName), 2000, 'E2E Topology ');
    await elementClick(this.selectSurface(configProperties.SurfaceData.surfaceName));
    await browser.logger.info('Selected E2E Topology');

    await elementClear(this.search, name);

    await browser.sleep(2000);

    // Select Created Policy Group Template
    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy Group Template List Displayed');
    if (!deleteOnly)
      name = name + ' Updated';
    await this.search.sendKeys(name);
    await elementClick(this.searchPolicyGroupTemplateName(name));
    await browser.logger.info(name, 'Selected');

    // Click On Delete Button in Policy Group Template Page
    await WaitHelper.waitForElementToBeDisplayed(this.deleteButton, 5000, 'Delete Button');
    await browser.actions().mouseDown(this.deleteButton).perform();
    await elementClick(this.deleteButton);
    await browser.logger.info(name, 'Clicked Delete Button');

    // Click On Confirm Delete To Delete Policy Group Template
    await WaitHelper.waitForElementToBeDisplayed(this.confirmDeleteButton, 5000, 'Confirm Delete Button');
    await browser.actions().mouseMove(this.confirmDeleteButton).perform();
    await elementClick(this.confirmDeleteButton);
    await browser.logger.info(name, 'Deleted');
  }

  async verifyPolicyGroupTemplate(name: string = null) {
    await WaitHelper.waitForElementToBeHidden(this.toast);
    await this.search.sendKeys(name + ' Updated');
    await browser.logger.info('Searched For ', name + ' Updated');
    await browser.logger.info(name + ' Updated', ' Is Not Present');
  }

  async getPageTitle() {
    return browser.getTitle();
  }

}