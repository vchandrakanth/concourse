import { browser, element, by, $, $$ } from 'protractor';
import { elementClick, elementSendkeys, elementClear } from '../utils/utils';
import { WaitHelper } from '../utils/waitHelper';
import { PageHelper } from '../utils/pageHelper';

let path = require('path');
let configProperties = require('../conf/properties');

export class PolicyGroup {

  get policyGroupMenu() { return element(by.css('a[data-e2e="policyGroupMenu"]')); }
  get createNewpolicyGroup() { return element(by.css('button[data-e2e="createPolicyGroup"]')); }
  get enterPolicyGroupName() { return element(by.css('[data-e2e="name"]')); }
  // get enterPolicyGroupName() { return element(by.css('[data-e2e="policyGroupName"]')); }
  get enterPolicyGroupDescription() { return element(by.css('[data-e2e="description"]')); }
  // get enterPolicyGroupDescription() { return element(by.css('[data-e2e="policyGroupDescription"]')); }
  get enterEditPolicyGroupName() { return element(by.xpath('//input[@id="name"]')); }
  get ownigGroupDropDown() { return element(by.css('ng-select[formcontrolname="owningGroupId"]')); }
  selectOowningGroup(owningGroup: any) { return element(by.xpath(`//span[@class='ng-option-label ng-star-inserted'][contains(text(),'${owningGroup}')]`)); } // //span[.='Root Group']
  get policyGroupStatusDropdown() { return element(by.css('select[formcontrolname="status"]')); }
  // get policyGroupDraft() { return element(by.css('option[value="DRAFT"]')); }
  get policyGroupDraft() { return element(by.css('[for="draft"]')); }
  // get policyGroupPublished() { return element(by.css('option[value="PUBLISHED"]')); }
  get policyGroupPublished() { return element(by.css('[for="published"]')); }
  get policyGroupIncrementByDropdown() { return element(by.css('select[ng-reflect-name="versionBump"]')); }
  // get policyGroupMajor() { return element(by.xpath('//option[.="Major"]')); }
  get policyGroupMajor() { return element(by.css('#major')); }
  // get policyGroupMinor() { return element(by.xpath('//option[.="Minor"]')); }
  get policyGroupMinor() { return element(by.css('#Minor')); }
  policyGroupTemplate(policyGroupTemplateName: any) { return element(by.xpath(`//h5[contains(.,'PGT ${policyGroupTemplateName}')]`)); }
  // get allowDisAllowDropDown() { return element(by.css('select[ng-reflect-form="[object Object]"]')); }
  get allowDisAllowDropDown() { return element(by.css('template-allow .form-control')); }
  get selectAllow() { return element(by.xpath('//option[.="Allow"]')); }
  get selectDisAllow() { return element(by.xpath('//option[.="Disallow"]')); }
  get servicesDropDown() { return element(by.css('[data-e2e="serviceDropdown"]')); }
  get selectAllServices() { return element(by.css('button[data-e2e="dropdownSelectAll"]')); }
  selectService(service: any) { return element(by.xpath(`//span[.='${service}']`)); }
  get dropDownClose() { return element(by.css('.dropdown-up')); }
  get entityTypeDropDown() { return element(by.css('[data-e2e="entityType"]')); }
  // selectEntityType(entityType: any) { return element(by.xpath(`//option[.='${entityType}']`)); }//option[.='Policy Group']
  selectEntityType(entityType: any) { return element(by.css(`option[value='${entityType}']`)); }
  get eventDropDown() { return element(by.css('[data-e2e="eventType"]')); }
  get selectAllEvents() { return element(by.css('button[data-e2e="dropdownSelectAll"]')); }
  selectEvent(events: any) { return element(by.xpath(`//span[.='${events}']`)); }
  get eventsBlankClick() { return element(by.css('app-policy-template-form>div:nth-of-type(1)>div:nth-of-type(1)')); }
  get approvalGroupsDropDown() { return element(by.css('[placeholder="Select Approval Groups"]')); }
  selectGroup(group: any) { return element(by.xpath(`//div[.='${group}']`)); }
  get regionDropDown() { return element(by.css('ng-multiselect-dropdown[name="AwsRegions"] .dropdown-down')); }
  selectRegion(region: any) { return element(by.xpath(`//div[.='${region}']`)); }
  get nextButton() { return element(by.xpath('//button[.="Next"]')); }
  selectAttributeTag(attributeTagName: string) { return element(by.xpath(`//span[.='${attributeTagName}']`)); }
  selectSurfaceLayer(surfacelayer: any) { return element(by.xpath(`//label[.='${surfacelayer}']`)); }
  get policySubmit() { return element(by.xpath('//button[.=\'Submit\']')); }
  get editPoliciesButton() { return element(by.css('button[data-e2e="editPolicies"]')); }
  get editSurfaceLayerButton() { return element(by.css('.btn-outline-primary[data-e2e="editSurfaceLayers"]')); }
  get updateSurfaceLayers() { return element(by.css('button[data-e2e="updateSurfaceLayers"]')); }
  get toast() { return $('#toast-container'); }
  get list() { return $('.list'); }
  get policyGroupTemplatelist() { return $('.pgt-list'); }
  // get editStatusDropDown() { return element(by.css('select[ng-reflect-name="status"]')); }
  get editStatusDropDown() { return element(by.xpath('//option[.="Select Status"]')); }
  get editStatusDraft() { return element(by.xpath('//option[contains(.,"Draft")]')); }
  get editStatusPublish() { return element(by.xpath('//option[contains(.,"Published")]')); }
  get editMinor() { return element(by.xpath('//option[contains(.,"MINOR")]')); }
  get editMajor() { return element(by.xpath('//option[contains(.,"MAJOR")]')); }
  get surfaceDropDown() { return element(by.css('select')); }
  selectSurface(surface: string) { return element(by.xpath(`//option[contains(.,'${surface}')]`)); }

  templateType;
  policyStatusName;
  policyGroupStatusName;
  statusDraft;
  statusPublished;

  /****************************************Policy Violation********************************************/
  get enclaveModel() { return element(by.xpath(`//td[.='${configProperties.enclaveModelData.enclaveModelName}']`)); }
  get enclaveModelEdit() { return element(by.css('.fa-edit')); }
  get chooseFile() { return element(by.css('input[type="file"]')); }
  get nextToEnclaveModelEvaluations() { return element(by.xpath('//button[.="Next"]')); }
  get nextToReviewEnclaveModel() { return element(by.xpath('//button[.="Next"]')); }
  // get submitButton() { return element(by.xpath('//button[.="Submit"]')); }
  get submitButton() { return element(by.css('button[type="submit"]')); }

  /**************************************** Update Policy Violation********************************************/

  get editButton() { return element(by.css('button[data-e2e="editPolicyGroup"]')); }
  get policiesEditButton() { return element(by.css('button[data-e2e="editPolicies"]')); }
  // deselectService(service: any) { return element(by.xpath(`//div[.='×${service}']`)); }
  deselectService(service: any) { return element(by.xpath(`//div[@class='ng-value-container']/div['${service}']/span[@class='ng-value-icon left ng-star-inserted']`)); }
  get closeDropDown() { return element(by.xpath('//span[@class="ng-arrow-wrapper"]')); }
  get confirmChanges() { return element(by.css('button[data-e2e="submitPolicyGroupChanges"]')); }
  get publishButton() { return element(by.xpath('//button[.="Publish"]')); }
  get saveButton() { return element(by.css('.Save')); }
  get policyGroupToUpdatePolicies() { return element.all(by.xpath('//ul[@class="list-group ng-star-inserted"]')); }

  /**************************************** Remove Attribute Tag For PG in Policy Violation********************************************/
  get policyGroup() { return element(by.xpath(`//h5[.='${configProperties.policyGroupData.statusPublishedName}']`)); }
  get editAttributeTag() { return element(by.css('button[data-e2e="editAttributeTag"]')); }
  // updateAttributeTag(attributeTag: string) { return element(by.xpath(`//span[.='${attributeTag}']`)); }
  updateAttributeTag(attributeTagId: string) { return element(by.css(`span[data-e2e='${attributeTagId}']`)); }
  get confirmButton() { return element(by.css('.Confirm')); }
  get selectNewAttributeTag() { return element(by.xpath(`//div[.='properties.attributeTagData.violationAttributeName']`)); }

  /**************************************** Update Organization For PG in Policy Violation********************************************/
  // get editOrganizationButton() { return element(by.css('button[data-e2e="editSurfaceLayers"]')); }
  get editOrganizationButton() { return element(by.css('.btn-outline-primary[data-e2e="editSurfaceLayers"]')); }
  get updateOrganizationButton() { return element(by.xpath('//button[data-e2e="updateSurfaceLayers"]')); }
  uncheckOrganization(Org: any) { return element(by.xpath(`//label[.='${Org}']`)); }
  get deleteButton() { return element(by.css('.btn-danger')); }
  get confirmDeleteButton() { return element(by.css('[data-e2e="confirmDeleteModalBtn"]')); }
  get attributeTagDropDown() { return element(by.css('ng-select[formcontrolname="attributeTagIds"] > div > span')); }
  get search() { return element(by.css('[placeholder="Search"]')); }
  // get policyGroupTemplateSearch() { return element(by.css('step:nth-of-type(2)>form>div:nth-of-type(1)>div:nth-of-type(1)>input')); }
  get policyGroupTemplateSearch() { return element(by.css('step:nth-of-type(2)>form>div:nth-of-type(1)>div:nth-of-type(1)>input')); }
  searchPolicyGroupName(policyGroupName: string) { return element(by.css(`h5[data-e2e='${policyGroupName}']`)); }
  get policyGroupToPublish() { return element(by.xpath('//li[@class="list-group-item ng-star-inserted active"]')); } // ul[@class="list-group ng-star-inserted"]
  get editAttributeTagDropDown() { return element(by.xpath('//div[@class="ng-value-container"]')); }
  get blankClick() { return element(by.xpath('//span[@class="ng-arrow-wrapper"]')); }

  // Create the policy Group
  async createPolicyGroup(surfaceName: string = null, policyGroupName: string = null, policyGroupDescription: any = null,
    owningGroup: any = null, status: any = null, policyGroupTemplateName: string = null,
    attributeTagName: string = null, service: String[], surfaceLayer: any = null, entityType: any = null, group: any = null) {

    if (status === 'DRAFT') {
      this.policyGroupStatusName = configProperties.policyGroupData.statusDraftName;
    }
    else {
      this.policyGroupStatusName = configProperties.policyGroupData.statusPublishedName;
    }
    // wait till the toast element flash is hidden.
    await WaitHelper.waitForElementToBeHidden(this.toast);

    await browser.get(configProperties.qaUrl + '/policy-groups');
    await browser.logger.info('Clicked On Policy Group Menu');

    await this.selectSurfaceFromDropDown(surfaceName);

    // Click on '+' Button to Create new policy
    await WaitHelper.waitForElementToBeDisplayed(this.list);
    await elementClick(this.createNewpolicyGroup);
    await browser.logger.info('Clicked + Button');

    // Enter Policy Name
    await WaitHelper.waitForElementToBePresent(this.enterPolicyGroupName, 5000, 'Name ');
    await elementSendkeys(this.enterPolicyGroupName, policyGroupName);
    await browser.logger.info('Enter the Policy Name');

    // Enter Policy Description
    await WaitHelper.waitForElementToBePresent(this.enterPolicyGroupDescription, 5000, 'Description ');
    await elementSendkeys(this.enterPolicyGroupDescription, policyGroupDescription);
    await browser.logger.info('Description Entered');

    // select status
    // await WaitHelper.waitForElementToBeClickable(this.policyGroupStatusDropdown, 2000, 'Status DropDown ');
    // await elementClick(this.policyGroupStatusDropdown);

    if (status === 'PUBLISHED') {
      await WaitHelper.waitForElementToBeClickable(this.policyGroupPublished, 2000, 'Published ');
      await elementClick(this.policyGroupPublished);
      await browser.logger.info('Selected status as Published');

      await WaitHelper.waitForElementToBeClickable(this.policyGroupMinor, 2000, 'Minor ');
      await elementClick(this.policyGroupMinor);
      await browser.logger.info('Selected Increment as Minor');
      await browser.sleep(1000);
    }

    // Owning Group DropDown
    await WaitHelper.waitForElementToBePresent(this.ownigGroupDropDown, 5000, 'Ownig Group DropDown ');
    await elementClick(this.ownigGroupDropDown);
    await browser.logger.info('Ownig Group DropDown Selected');

    await WaitHelper.waitForElementToBePresent(this.selectOowningGroup(owningGroup), 5000, 'Ownig Group ');
    await elementClick(this.selectOowningGroup(owningGroup));
    await browser.logger.info('Ownig Group Selected');

    // Click on next to select services
    await WaitHelper.waitForElementToBeClickable(this.nextButton, 2000, 'next ');
    await elementClick(this.nextButton);
    await browser.logger.info('Click on next');

    // click on DemoPolicy
    await WaitHelper.waitForElementToBeClickable(this.policyGroupTemplateSearch, 5000, 'Policy group Template List Displayed');
    await elementClick(this.policyGroupTemplateSearch);
    await elementSendkeys(this.policyGroupTemplateSearch, policyGroupTemplateName);
    // await PageHelper.actionSendKeys(policyGroupTemplateName);
    // await browser.actions().mouseMove(this.policyGroupTemplate(`${policyGroupTemplateName}`)).perform();
    await elementClick(this.policyGroupTemplate(`${policyGroupTemplateName}`));
    await browser.logger.info('Policy Template Selected');

    if (policyGroupTemplateName.includes('Require')) {
      await browser.logger.info('Entity Type' + entityType);
      await this.entityType(entityType, group);
    }

    if (policyGroupTemplateName.includes('AWS Products')) {
      await browser.logger.info('Service' + service);
      await this.awsProducts(service);
    }

    // click on next to Assign organizations
    await WaitHelper.waitForElementToBeClickable(this.nextButton, 2000, 'next ');
    await elementClick(this.nextButton);
    await browser.logger.info('Moved to Set Relationships Page');

    await WaitHelper.waitForElementToBeClickable(this.attributeTagDropDown, 2000, 'Attribute Tag Drop Down  ');
    await elementClick(this.attributeTagDropDown);
    await browser.logger.info('Attribute Tag Drop Down Selected');

    // Select Attribute Tag
    await WaitHelper.waitForElementToBeClickable(this.selectAttributeTag(attributeTagName), 2000, 'Attribute');
    await elementClick(this.selectAttributeTag(attributeTagName));
    await browser.logger.info('Attribute Selected');

    if (surfaceLayer === 'Default Surface - Root Surface Layer') {
      await elementClick(this.selectSurfaceLayer(surfaceLayer));
      await browser.logger.info('Organization Selected');
    }

    // Click on next to Impact Assessment
    await WaitHelper.waitForElementToBeClickable(this.nextButton, 5000, 'Next ');
    await elementClick(this.nextButton);
    await browser.logger.info('Moved to Impact Assessment Page');

    // Click on next to Review Policy Group
    await WaitHelper.waitForElementToBeClickable(this.nextButton, 5000, 'Next ');
    await elementClick(this.nextButton);
    await browser.logger.info('Moved to Review Policy Group Page');

    // Click on Submit button to submit the policy
    await WaitHelper.waitForElementToBeClickable(this.policySubmit, 2000, 'Submit Button ');
    await elementClick(this.policySubmit);
    await browser.logger.info('Policy Submitted', policyGroupName);
    await browser.sleep(2000);
  }

  getRandomNum = function (min, max) {
    return parseInt(Math.random() * (max - min) + min);
  };

  async entityType(entityType: any = null, group: any = null) {

    await WaitHelper.waitForElementToBeClickable(this.entityTypeDropDown, 2000, 'Entity Type Drop Down ');
    await elementClick(this.entityTypeDropDown);
    await browser.logger.info('Entity Type Selected');

    await WaitHelper.waitForElementToBeClickable(this.selectEntityType(entityType), 2000, 'Entity Type');
    await elementClick(this.selectEntityType(entityType));
    await browser.logger.info('Model Selected');

    await WaitHelper.waitForElementToBeClickable(this.eventDropDown, 2000, 'Events Drop Down ');
    await elementClick(this.eventDropDown);
    await browser.logger.info('Events Drop Down');

    await WaitHelper.waitForElementToBeClickable(this.selectAllEvents, 2000, 'Select All Events ');
    await elementClick(this.selectAllEvents);
    await browser.logger.info('Events Selected');
    // await browser.sleep(2000);

    await elementClick(this.eventsBlankClick);

    await WaitHelper.waitForElementToBeClickable(this.approvalGroupsDropDown, 2000, 'Approval Groups ');
    await elementClick(this.approvalGroupsDropDown);
    await browser.logger.info('Approval Groups drop Down');

    await WaitHelper.waitForElementToBeClickable(this.selectGroup(group), 2000, ' Select Approval Group ');
    await elementClick(this.selectGroup(group));
    await browser.logger.info('Approval Groups Selected');
  }

  async awsProducts(service: String[]) {
    await WaitHelper.waitForElementToBeClickable(this.allowDisAllowDropDown, 2000, 'allowDisAllowDropDown ');
    await elementClick(this.allowDisAllowDropDown);
    await browser.logger.info('allowDisAllowDropDown Page');

    await WaitHelper.waitForElementToBeClickable(this.selectAllow, 2000, 'selectAllow ');
    await elementClick(this.selectAllow);
    await browser.logger.info('selectAllow');

    for (let serviceName of service) {
      console.log('value', serviceName);

      await WaitHelper.waitForElementToBePresent(this.servicesDropDown, 5000, 'Services Drop Down ');
      await elementClick(this.servicesDropDown);
      await browser.logger.info('Services Drop Down');

      // Select Services
      await WaitHelper.waitForElementToBePresent(this.selectService(service[0]), 5000, 'Select Services ');
      await elementClick(this.selectService(service[0]));
      await browser.logger.info('Select Services');
    }
  }

  async searchPolicyGroup(surfaceName: string = null, policyGroupName: string = null) {

    await WaitHelper.waitForElementToBeHidden(this.toast);
    // Click on Assets Manager Menu Button
    await browser.get(configProperties.qaUrl + '/policy-groups');
    await browser.logger.info('Clicked on Policy Group Menu');

    await this.selectSurfaceFromDropDown(surfaceName);

    await elementClear(this.search, policyGroupName);

    // Select Created Policy Group
    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy Group List Displayed');
    await this.search.sendKeys(policyGroupName);
    await browser.logger.info(policyGroupName, 'Selected');
  }

  async editPolicyGroup(surfaceName: string = null, policyGroupName: string = null) {

    await WaitHelper.waitForElementToBeHidden(this.toast);
    // Click on Assets Manager Menu Button
    await browser.get(configProperties.qaUrl + '/policy-groups');
    await browser.logger.info('Clicked on Policy Group Menu');

    await this.searchPolicyGroup(surfaceName, policyGroupName);
    await elementClick(this.searchPolicyGroupName(policyGroupName));
    await browser.logger.info(policyGroupName, 'Selected');

    // Click Edit Icon
    await browser.actions().mouseDown(this.editButton).perform();
    await WaitHelper.waitForElementToBePresent(this.editButton, 5000, 'Edit Button');
    await elementClick(this.editButton);
    await browser.logger.info('Edit Button Clicked');
    await browser.sleep(2000);

    // Edit Policy Group
    await WaitHelper.waitForElementToBePresent(this.enterPolicyGroupName, 5000, 'Policy Group Name ');
    await elementSendkeys(this.enterPolicyGroupName, ' Updated');
    await browser.logger.info('Policy Group Name Entered: ', policyGroupName + ' Updated');

    await WaitHelper.waitForElementToBeClickable(this.policyGroupPublished, 2000, 'Published ');
    await elementClick(this.policyGroupPublished);
    await browser.logger.info(' Selected Published');

    await WaitHelper.waitForElementToBeClickable(this.policyGroupMinor, 2000, 'Minor ');
    await elementClick(this.policyGroupMinor);
    await browser.logger.info(' Selected Minor');

    // Click on Submit button to submit the Policy Group
    await WaitHelper.waitForElementToBeClickable(this.submitButton, 5000, 'Save ');
    await elementClick(this.submitButton);
    await browser.logger.info('Policy Group Saved', policyGroupName);
  }

  async deletePolicyGroup(surfaceName: string = null, policyGroupName: string = null, deleteOnly: string = null) {

    await WaitHelper.waitForElementToBeHidden(this.toast);

    await browser.get(configProperties.qaUrl + '/policy-groups');

    await this.selectSurfaceFromDropDown(surfaceName);

    await elementClear(this.search, policyGroupName);

    // Select Created Policy Group
    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy Group List Displayed');
    if (!deleteOnly)
      policyGroupName = policyGroupName + ' Updated';
    await this.search.sendKeys(policyGroupName);
    await elementClick(this.searchPolicyGroupName(policyGroupName));
    await browser.logger.info(policyGroupName, 'Selected');
    await browser.sleep(2000);

    await WaitHelper.waitForElementToBeDisplayed(this.deleteButton, 5000, 'Delete Button');
    await browser.actions().mouseMove(this.deleteButton).perform();
    await elementClick(this.deleteButton);
    await browser.logger.info('Delete Policy Group');

    await WaitHelper.waitForElementToBeDisplayed(this.confirmDeleteButton, 5000, 'Confirm Delete Button');
    await elementClick(this.confirmDeleteButton);
    await browser.logger.info(policyGroupName, 'Deleted');
  }

  async editPoliciesandPublish(surfaceName: string = null, policyGroupName: string = null, service: string = null) {
    await WaitHelper.waitForElementToBeHidden(this.toast);

    await browser.get(configProperties.qaUrl + '/policy-groups');

    await this.selectSurfaceFromDropDown(surfaceName);

    await elementClear(this.search, policyGroupName);

    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy Group List Displayed');
    await this.search.sendKeys(policyGroupName);
    await elementClick(this.searchPolicyGroupName(policyGroupName));
    await browser.logger.info(policyGroupName, 'Selected');

    // Click Edit Icon
    await browser.actions().mouseDown(this.editPoliciesButton).perform();
    await WaitHelper.waitForElementToBePresent(this.editPoliciesButton, 5000, 'Edit Policies Button');
    await elementClick(this.editPoliciesButton);
    await browser.logger.info('Edit Button Clicked');

    // Select Service
    await WaitHelper.waitForElementToBeClickable(this.servicesDropDown, 2000, 'servicesDropDown ');
    await elementClick(this.servicesDropDown);
    await browser.logger.info('servicesDropDown Page');

    await elementClick(this.selectService(`${service}`));
    await browser.logger.info('service Selected');

    await WaitHelper.waitForElementToBeClickable(this.confirmChanges, 5000, 'Confirm Changes ');
    await elementClick(this.confirmChanges);
    await browser.logger.info('Confirm Changes ');

    await WaitHelper.waitForElementToBeHidden(this.toast);

    await browser.get(configProperties.qaUrl + '/policy-groups');

    await elementClear(this.search, policyGroupName);

    await this.selectSurfaceFromDropDown(surfaceName);

    await this.search.sendKeys(policyGroupName);
    await elementClick(this.searchPolicyGroupName(policyGroupName));
    // await elementClick(this.policyGroupToPublish.last());
    await browser.sleep(2000);

    await WaitHelper.waitForElementToBeClickable(this.publishButton, 5000, 'Publish Button ');
    await browser.actions().mouseMove(this.publishButton).perform();
    await elementClick(this.publishButton);
    await browser.logger.info('Publish Button ');

    await WaitHelper.waitForElementToBeClickable(this.policyGroupPublished, 2000, 'Published ');
    await elementClick(this.policyGroupPublished);
    await browser.logger.info(' Selected Published');

    await WaitHelper.waitForElementToBeClickable(this.policyGroupMinor, 2000, 'Minor ');
    await elementClick(this.policyGroupMinor);
    await browser.logger.info(' Selected Minor');

    await WaitHelper.waitForElementToBeClickable(this.submitButton, 2000, 'Submit ');
    await elementClick(this.submitButton);
    await browser.logger.info('Policy Published');
    await browser.sleep(2000);
  }

  /**************************************** Verify Policy Violation********************************************/
  async verifyPolicyViolation(fileName: string = null, Services: string = null) {
    await WaitHelper.waitForElementToBeHidden(this.toast);
    // await WaitHelper.waitForElementToBeClickable(this.enclaveModel, 5000, 'enclaveModel');
    // await browser.actions().mouseDown(this.enclaveModel).perform();
    // await elementClick(this.enclaveModel);
    // await browser.logger.info('Enclave Model Selected');

    await WaitHelper.waitForElementToBeDisplayed(this.enclaveModelEdit, 10000, 'Edit Page Opened');
    await browser.actions().mouseDown(this.enclaveModelEdit).perform();
    await elementClick(this.enclaveModelEdit);
    await WaitHelper.waitForElementToBeSelected(this.chooseFile, 2000, 'Choose File ');
    await browser.logger.info('ChooseFile');

    await this.fileUpload(fileName);

    await WaitHelper.waitForElementToBePresent(this.nextToEnclaveModelEvaluations, 5000, 'Enclave Model Evaluations ');
    await elementClick(this.nextToEnclaveModelEvaluations);
    await browser.logger.info('Moved to Review Enclave Model Page');

    // Select Review Enclave Model Page
    await WaitHelper.waitForElementToBePresent(this.nextToReviewEnclaveModel, 5000, 'Review Enclave Model ');
    await elementClick(this.nextToReviewEnclaveModel);
    await browser.logger.info('Moved to Submit Page');
    await browser.sleep(2000);

    // Click on Submit button to submit the EnClave Model
    await WaitHelper.waitForElementToBeClickable(this.submitButton, 5000, 'Submit ');
    await elementClick(this.submitButton);
    await browser.logger.info('Enclave Model Submitted');
  }

  async fileUpload(fileName: string = null) {
    let fileToUpload = `C:/Users/intone-wv/Desktop/e2e/src/conf/${fileName}`;
    let absolutePath = path.join(__dirname, fileToUpload);
    await PageHelper.uploadFile(this.chooseFile, fileToUpload);
    await browser.logger.info('File Uploaded');
  }

  /****************************************Update Policy Violation********************************************/
  async updatePolicyGroupWithEC2(surfaceName: string = null, policyGroupName: string = null, service: String[]) {
    await WaitHelper.waitForElementToBeHidden(this.toast);
    await browser.get(configProperties.qaUrl + '/policy-groups');

    await this.selectSurfaceFromDropDown(surfaceName);

    await elementClear(this.search, policyGroupName);

    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy Group List Displayed');
    await this.search.sendKeys(policyGroupName);
    await elementClick(this.searchPolicyGroupName(policyGroupName));
    await browser.logger.info(policyGroupName, 'Selected');

    await WaitHelper.waitForElementToBeDisplayed(this.policiesEditButton, 5000, 'Policies Edit Button');
    await browser.actions().mouseDown(this.policiesEditButton).perform();
    await elementClick(this.policiesEditButton);
    await browser.logger.info('Select Policies Edit Button');

    await WaitHelper.waitForElementToBeClickable(this.allowDisAllowDropDown, 2000, 'allowDisAllowDropDown ');
    await elementClick(this.allowDisAllowDropDown);
    await browser.logger.info('allowDisAllowDropDown Page');

    await WaitHelper.waitForElementToBeClickable(this.selectAllow, 2000, 'selectAllow ');
    await elementClick(this.selectAllow);
    await browser.logger.info('selectAllow');

    await WaitHelper.waitForElementToBePresent(this.servicesDropDown, 5000, 'Services Drop Down ');
    await elementClick(this.servicesDropDown);
    await browser.logger.info('Services Drop Down');

    // Select Services
    await WaitHelper.waitForElementToBePresent(this.selectAllServices, 5000, 'Select All Services ');
    await elementClick(this.selectAllServices);
    await browser.logger.info('Select All Services');

    await WaitHelper.waitForElementToBePresent(this.deselectService(service[0]), 5000, 'DeSelect Services ');
    await elementClick(this.deselectService(service[0]));
    await browser.logger.info('DeSelect Services');

    // await WaitHelper.waitForElementToBeClickable(this.deselectService(service), 5000, 'Deselect Service ');
    // await browser.actions().mouseMove(this.deselectService(service)).perform();
    // await elementClick(this.deselectService(service));
    // await browser.logger.info('Deselect Service ');

    await elementClick(this.blankClick);

    await WaitHelper.waitForElementToBeClickable(this.confirmChanges, 5000, 'Confirm Changes ');
    await browser.actions().mouseDown(this.confirmChanges).perform();
    await elementClick(this.confirmChanges);
    await browser.logger.info('Confirm Changes ');
    await browser.sleep(2000);

    await WaitHelper.waitForElementToBeHidden(this.toast);
    await browser.get(configProperties.qaUrl + '/policy-groups');

    await this.selectSurfaceFromDropDown(surfaceName);

    await elementClear(this.search, policyGroupName);

    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy Group List Displayed');
    await this.search.sendKeys(policyGroupName);
    await elementClick(this.searchPolicyGroupName(policyGroupName));

    await WaitHelper.waitForElementToBeClickable(this.publishButton, 5000, 'Publish Button ');
    await browser.actions().mouseMove(this.publishButton).perform();
    await elementClick(this.publishButton);
    await browser.logger.info('Publish Button');

    await WaitHelper.waitForElementToBeClickable(this.policyGroupPublished, 2000, 'Published ');
    await browser.actions().mouseMove(this.policyGroupPublished).perform();
    await elementClick(this.policyGroupPublished);
    await browser.logger.info(' Selected Published');

    await WaitHelper.waitForElementToBeClickable(this.policyGroupMinor, 2000, 'Minor ');
    await browser.actions().mouseMove(this.policyGroupMinor).perform();
    await elementClick(this.policyGroupMinor);
    await browser.logger.info(' Selected Minor');

    await WaitHelper.waitForElementToBeClickable(this.submitButton, 2000, 'Submit ');
    await browser.actions().mouseMove(this.submitButton).perform();
    await elementClick(this.submitButton);
    await browser.logger.info('Policy Published');
    await browser.sleep(2000);
  }

  async updatePolicyGroupWithS3(surfaceName: string = null, policyGroupName: string = null, service: String[] = null, policyId2: string = null) {
    await WaitHelper.waitForElementToBeHidden(this.toast);
    await browser.get(configProperties.qaUrl + '/policy-groups');

    await this.selectSurfaceFromDropDown(surfaceName);

    await elementClear(this.search, policyGroupName);

    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy Group List Displayed');
    await this.search.sendKeys(policyGroupName);
    await browser.sleep(2000);
    await elementClick(this.searchPolicyGroupName(policyGroupName));

    await WaitHelper.waitForElementToBeDisplayed(this.policiesEditButton, 5000, 'Policies Edit Button');
    await browser.actions().mouseDown(this.policiesEditButton).perform();
    await elementClick(this.policiesEditButton);
    await browser.logger.info('Select Policies Edit Button');

    await WaitHelper.waitForElementToBeClickable(this.allowDisAllowDropDown, 2000, 'allowDisAllowDropDown ');
    await elementClick(this.allowDisAllowDropDown);
    await browser.logger.info('allowDisAllowDropDown Page');

    await WaitHelper.waitForElementToBeClickable(this.selectAllow, 2000, 'selectAllow ');
    await elementClick(this.selectAllow);
    await browser.logger.info('selectAllow');

    await WaitHelper.waitForElementToBePresent(this.servicesDropDown, 5000, 'Services Drop Down ');
    await elementClick(this.servicesDropDown);
    await browser.logger.info('Services Drop Down');

    await WaitHelper.waitForElementToBePresent(this.selectAllServices, 5000, 'Select All Services');
    await elementClick(this.selectAllServices);
    await browser.logger.info('Select All Services');
    await browser.sleep(2000);

    await WaitHelper.waitForElementToBePresent(this.deselectService(service[0]), 5000, 'DeSelect Services ');
    await elementClick(this.deselectService(service[0]));
    await browser.logger.info('DeSelect Services');

    // await WaitHelper.waitForElementToBeClickable(this.deselectService(service), 5000, 'Deselect Service ');
    // await browser.actions().mouseMove(this.deselectService(service)).perform();
    // await elementClick(this.deselectService(service));
    // await browser.logger.info('Deselect Service ');

    await elementClick(this.blankClick);

    await WaitHelper.waitForElementToBeClickable(this.confirmChanges, 5000, 'Confirm Changes ');
    await browser.actions().mouseDown(this.confirmChanges).perform();
    await elementClick(this.confirmChanges);
    await browser.logger.info('Confirm Changes ');
    await browser.sleep(2000);

    await WaitHelper.waitForElementToBeHidden(this.toast);
    await browser.get(configProperties.qaUrl + '/policy-groups');

    await this.selectSurfaceFromDropDown(surfaceName);

    await elementClear(this.search, policyGroupName);

    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy Group List Displayed');
    await this.search.sendKeys(policyGroupName);
    await elementClick(this.searchPolicyGroupName(policyGroupName));

    await WaitHelper.waitForElementToBeClickable(this.publishButton, 5000, 'Publish Button ');
    await elementClick(this.publishButton);
    await browser.logger.info('Publish Button');

    await WaitHelper.waitForElementToBeClickable(this.policyGroupPublished, 2000, 'Published ');
    await browser.actions().mouseMove(this.policyGroupPublished).perform();
    await elementClick(this.policyGroupPublished);
    await browser.logger.info(' Selected Published');

    await WaitHelper.waitForElementToBeClickable(this.policyGroupMinor, 2000, 'Minor ');
    await elementClick(this.policyGroupMinor);
    await browser.logger.info(' Selected Minor');

    await WaitHelper.waitForElementToBeClickable(this.submitButton, 2000, 'Submit ');
    await elementClick(this.submitButton);
    await browser.logger.info('Policy Published');
    await browser.sleep(2000);
  }

  /****************************************Remove Surface Layer For PolicyGroup********************************************/
  async removeSurfaceLayerForPG(surfaceName: string = null, policyGroupName: string = null, SurfaceLayer: string = null) {
    await WaitHelper.waitForElementToBeHidden(this.toast);
    await browser.get(configProperties.qaUrl + '/policy-groups');

    await this.selectSurfaceFromDropDown(surfaceName);

    await elementClear(this.search, policyGroupName);

    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy Group List Displayed');
    await this.search.sendKeys(policyGroupName);
    await elementClick(this.searchPolicyGroupName(policyGroupName));
    await browser.logger.info(policyGroupName, 'Selected');

    await WaitHelper.waitForElementToBeDisplayed(this.editOrganizationButton, 5000, 'Edit Surfaces Button');
    await browser.actions().mouseMove(this.editOrganizationButton).perform();
    await elementClick(this.editOrganizationButton);
    await browser.logger.info('Select Edit Surfaces Button');

    await WaitHelper.waitForElementToBeDisplayed(this.selectSurfaceLayer(SurfaceLayer), 5000, 'Surface Layer');
    await elementClick(this.selectSurfaceLayer(SurfaceLayer));
    await browser.logger.info('Surface Layer Selected');

    await WaitHelper.waitForElementToBeClickable(this.updateSurfaceLayers, 5000, 'Confirm Changes ');
    await elementClick(this.updateSurfaceLayers);
    await browser.logger.info('Confirm Changes ');
    await browser.sleep(2000);

    await browser.get(configProperties.qaUrl + '/policy-groups');

    await elementClear(this.search, policyGroupName);

    await this.selectSurfaceFromDropDown(surfaceName);

    await this.search.sendKeys(policyGroupName);
    await elementClick(this.searchPolicyGroupName(policyGroupName));
    await browser.sleep(2000);

    await WaitHelper.waitForElementToBeClickable(this.publishButton, 5000, 'Publish Button ');
    await browser.actions().mouseMove(this.publishButton).perform();
    await elementClick(this.publishButton);
    await browser.logger.info('Publish Button ');

    await WaitHelper.waitForElementToBeClickable(this.policyGroupPublished, 2000, 'Published ');
    await browser.actions().mouseMove(this.policyGroupPublished).perform();
    await elementClick(this.policyGroupPublished);
    await browser.logger.info(' Selected Published');

    await WaitHelper.waitForElementToBeClickable(this.policyGroupMinor, 2000, 'Minor ');
    await elementClick(this.policyGroupMinor);
    await browser.logger.info(' Selected Minor');

    await WaitHelper.waitForElementToBeClickable(this.submitButton, 2000, 'Save ');
    await elementClick(this.submitButton);
    await browser.logger.info('Policy Published');
    await browser.sleep(3000);
  }

  /*************************************** Add Attribute Tag For Policy Group ******************/
  async addAttributeTagForPG(surfaceName: string = null, policyGroupName: string = null, attributeTagName: string = null) {
    await WaitHelper.waitForElementToBeHidden(this.toast);
    await browser.get(configProperties.qaUrl + '/policy-groups');

    await this.selectSurfaceFromDropDown(surfaceName);

    await elementClear(this.search, policyGroupName);

    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy Group List Displayed');
    await this.search.sendKeys(policyGroupName);
    await elementClick(this.searchPolicyGroupName(policyGroupName));
    await browser.logger.info(policyGroupName, 'Selected');

    await WaitHelper.waitForElementToBeDisplayed(this.editAttributeTag, 5000, 'Attribute Tag Drop Down Button');
    await browser.actions().mouseDown(this.editAttributeTag).perform();
    await elementClick(this.editAttributeTag);
    await browser.logger.info('Select Attribute Tag Edit Button');

    await WaitHelper.waitForElementToBeDisplayed(this.editAttributeTagDropDown, 5000, 'Attribute Tag Drop Down Button');
    await browser.actions().mouseDown(this.editAttributeTagDropDown).perform();
    await elementClick(this.editAttributeTagDropDown);
    await browser.logger.info('Select Attribute Tag Drop Down Button');

    // Select Attribute Tag
    await WaitHelper.waitForElementToBeClickable(this.selectAttributeTag(attributeTagName), 5000, 'Attribute');
    await browser.actions().mouseMove(this.selectAttributeTag(attributeTagName)).perform();
    await elementClick(this.selectAttributeTag(attributeTagName));
    await browser.logger.info('Attribute Selected');

    await elementClick(this.blankClick);

    await WaitHelper.waitForElementToBeClickable(this.confirmButton, 5000, 'Confirm Button ');
    await elementClick(this.confirmButton);
    await browser.logger.info('Confirm Changes ');

    await WaitHelper.waitForElementToBeHidden(this.toast);

    await browser.get(configProperties.qaUrl + '/policy-groups');

    await this.selectSurfaceFromDropDown(surfaceName);

    await elementClear(this.search, policyGroupName);

    await this.search.sendKeys(policyGroupName);
    await elementClick(this.searchPolicyGroupName(policyGroupName));
    await browser.sleep(2000);

    await WaitHelper.waitForElementToBeClickable(this.publishButton, 5000, 'Publish Button ');
    await browser.actions().mouseMove(this.publishButton).perform();
    await elementClick(this.publishButton);
    await browser.logger.info('Publish Button ');

    await WaitHelper.waitForElementToBeClickable(this.policyGroupPublished, 2000, 'Published ');
    await browser.actions().mouseMove(this.policyGroupPublished).perform();
    await elementClick(this.policyGroupPublished);
    await browser.logger.info(' Selected Published');

    await WaitHelper.waitForElementToBeClickable(this.policyGroupMinor, 2000, 'Minor ');
    await elementClick(this.policyGroupMinor);
    await browser.logger.info(' Selected Minor');

    await WaitHelper.waitForElementToBeClickable(this.submitButton, 2000, 'Submit ');
    await elementClick(this.submitButton);
    await browser.logger.info('Policy Published');
    await browser.sleep(3000);
  }

  async getId6(str: any) {
    let ID = [];
    ID = String(str).split('| ');
    console.log('test', ID.length);
    return ID[(ID.length - 1)];
  }

  /****************************************Update Attribute Tag For PG********************************************/
  async removeAttributeTagForPG(surfaceName: string = null, policyGroupName: string = null, attributeTagId: string = null) {
    await WaitHelper.waitForElementToBeHidden(this.toast);
    await browser.get(configProperties.qaUrl + '/policy-groups');

    await this.selectSurfaceFromDropDown(surfaceName);

    await elementClear(this.search, policyGroupName);

    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy Group List Displayed');
    await this.search.sendKeys(policyGroupName);
    await elementClick(this.searchPolicyGroupName(policyGroupName));
    await browser.logger.info(policyGroupName, 'Selected');

    await WaitHelper.waitForElementToBeDisplayed(this.editAttributeTag, 5000, 'Attribute Tag Drop Down Button');
    await browser.actions().mouseDown(this.editAttributeTag).perform();
    await elementClick(this.editAttributeTag);
    await browser.logger.info('Select Attribute Tag Edit Button');
    await browser.sleep(2000);

    await WaitHelper.waitForElementToBeClickable(this.updateAttributeTag(attributeTagId), 2000);
    await browser.actions().mouseDown(this.updateAttributeTag(attributeTagId)).perform();
    await elementClick(this.updateAttributeTag(attributeTagId));
    await browser.logger.info('Removed Attribute Tag ID', attributeTagId);

    await WaitHelper.waitForElementToBeClickable(this.confirmButton, 5000, 'Confirm Button ');
    await elementClick(this.confirmButton);
    await browser.logger.info('Confirm Changes ');
    await browser.sleep(2000);

    await browser.get(configProperties.qaUrl + '/policy-groups');

    await this.selectSurfaceFromDropDown(surfaceName);
    await elementClear(this.search, policyGroupName);

    await this.search.sendKeys(policyGroupName);
    await elementClick(this.searchPolicyGroupName(policyGroupName));
    await browser.sleep(2000);

    await WaitHelper.waitForElementToBeClickable(this.publishButton, 5000, 'Publish Button ');
    await browser.actions().mouseMove(this.publishButton).perform();
    await elementClick(this.publishButton);
    await browser.logger.info('Publish Button ');

    await WaitHelper.waitForElementToBeClickable(this.policyGroupPublished, 2000, 'Published ');
    await elementClick(this.policyGroupPublished);
    await browser.logger.info(' Selected Published');

    await WaitHelper.waitForElementToBeClickable(this.policyGroupMinor, 2000, 'Minor ');
    await elementClick(this.policyGroupMinor);
    await browser.logger.info(' Selected Minor');

    await WaitHelper.waitForElementToBeClickable(this.submitButton, 2000, 'Submit ');
    await elementClick(this.submitButton);
    await browser.logger.info('Policy Published');
    await browser.sleep(3000);

  }

  async editSurfaceLayerAndPublish(surfaceName: string = null, policyGroupName: string = null, surfacelayer: string = null) {
    await WaitHelper.waitForElementToBeHidden(this.toast);

    await elementClick(this.policyGroupMenu);

    await this.selectSurfaceFromDropDown(surfaceName);

    await elementClear(this.search, policyGroupName);

    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy Group List Displayed');
    await this.search.sendKeys(policyGroupName);
    await elementClick(this.searchPolicyGroupName(policyGroupName));
    await browser.logger.info(policyGroupName, 'Selected');

    // Click Edit Icon
    await browser.actions().mouseDown(this.editSurfaceLayerButton).perform();
    await WaitHelper.waitForElementToBePresent(this.editSurfaceLayerButton, 5000, 'Edit Policies Button');
    await elementClick(this.editSurfaceLayerButton);
    await browser.logger.info('Edit Button Clicked');

    // Select Service
    await WaitHelper.waitForElementToBeClickable(this.selectSurfaceLayer(surfacelayer), 2000, 'servicesDropDown ');
    await elementClick(this.selectSurfaceLayer(surfacelayer));
    await browser.logger.info('Surface Layer Selected');

    await WaitHelper.waitForElementToBeClickable(this.updateSurfaceLayers, 5000, 'Confirm Changes ');
    await elementClick(this.updateSurfaceLayers);
    await browser.logger.info('Surface Layer Updated');

    await WaitHelper.waitForElementToBeHidden(this.toast);

    await browser.get(configProperties.qaUrl + '/policy-groups');

    await elementClear(this.search, policyGroupName);

    await this.selectSurfaceFromDropDown(surfaceName);

    await this.search.sendKeys(policyGroupName);
    await elementClick(this.searchPolicyGroupName(policyGroupName));
    await browser.sleep(2000);

    await WaitHelper.waitForElementToBeClickable(this.publishButton, 5000, 'Publish Button ');
    await browser.actions().mouseMove(this.publishButton).perform();
    await elementClick(this.publishButton);
    await browser.logger.info('Publish Button ');

    await WaitHelper.waitForElementToBeClickable(this.policyGroupPublished, 2000, 'Published ');
    await elementClick(this.policyGroupPublished);
    await browser.logger.info(' Selected Published');

    await WaitHelper.waitForElementToBeClickable(this.policyGroupMinor, 2000, 'Minor ');
    await elementClick(this.policyGroupMinor);
    await browser.logger.info(' Selected Minor');

    await WaitHelper.waitForElementToBeClickable(this.saveButton, 2000, 'Save ');
    await elementClick(this.saveButton);
    await browser.logger.info('Policy Published');
    await browser.sleep(2000);
  }

  async verifyPolicyGroup(policyGroupName: string = null) {
    await WaitHelper.waitForElementToBeHidden(this.toast);
    await elementClear(this.search, policyGroupName);
    await this.search.sendKeys(policyGroupName + ' Updated');
    await browser.logger.info('Searched For ', policyGroupName + ' Updated');
    await browser.logger.info(policyGroupName + ' Updated', ' Is Not Present');
  }

  async selectSurfaceFromDropDown(surfaceName: string = null) {
    await WaitHelper.waitForElementToBePresent(this.surfaceDropDown, 5000, 'Surface Drop Down ');
    await elementClick(this.surfaceDropDown);
    await browser.logger.info('Surface Drop Down Clicked');

    await WaitHelper.waitForElementToBePresent(this.selectSurface(surfaceName), 5000, 'Surface');
    await elementClick(this.selectSurface(surfaceName));
    await browser.logger.info('Surface Selcted');
    await browser.sleep(2000);
  }

  async publishPolicyGroup(surfaceName: string = null, policyGroupName: string = null) {

    await WaitHelper.waitForElementToBeHidden(this.toast);
    // Click on Assets Manager Menu Button
    await browser.get(configProperties.qaUrl + '/policy-groups');
    await browser.logger.info('Clicked on Policy Group Menu');

    await this.searchPolicyGroup(surfaceName, policyGroupName);
    await elementClick(this.searchPolicyGroupName(policyGroupName));
    await browser.logger.info(policyGroupName, 'Selected');

    // Click Edit Icon
    await browser.actions().mouseDown(this.editButton).perform();
    await WaitHelper.waitForElementToBePresent(this.editButton, 5000, 'Edit Button');
    await elementClick(this.editButton);
    await browser.logger.info('Edit Button Clicked');
    await browser.sleep(2000);
    await WaitHelper.waitForElementToBeClickable(this.publishButton, 5000, 'Publish Button ');
    await browser.actions().mouseMove(this.publishButton).perform();
    await elementClick(this.publishButton);
    await browser.logger.info('Publish Button');

    await WaitHelper.waitForElementToBeClickable(this.policyGroupPublished, 2000, 'Published ');
    await browser.actions().mouseMove(this.policyGroupPublished).perform();
    await elementClick(this.policyGroupPublished);
    await browser.logger.info(' Selected Published');

    await WaitHelper.waitForElementToBeClickable(this.policyGroupMinor, 2000, 'Minor ');
    await browser.actions().mouseMove(this.policyGroupMinor).perform();
    await elementClick(this.policyGroupMinor);
    await browser.logger.info(' Selected Minor');

    await WaitHelper.waitForElementToBeClickable(this.submitButton, 2000, 'Submit ');
    await browser.actions().mouseMove(this.submitButton).perform();
    await elementClick(this.submitButton);
    await browser.logger.info('Policy Published');
    await browser.sleep(2000);
  }

  async getPageTitle() {
    return await browser.getTitle();
  }
}
