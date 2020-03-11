import { browser, element, by, $, $$ } from 'protractor';
import { elementClick, elementSendkeys, elementClear } from '../utils/utils';
import { WaitHelper } from '../utils/waitHelper';
import { PageHelper } from '../utils/pageHelper';

let path = require('path');
let configProperties = require('../conf/properties');

export class PolicyGroup {

  get policyGroupMenu() { return element(by.css('a[data-e2e="policyGroupMenu"]')); }
  get createNewpolicyGroup() { return element(by.css('button[data-e2e="createPolicyGroup"]')); }
  get enterPolicyGroupName() { return element(by.css('[data-e2e="policyGroupName"]')); }
  get enterPolicyGroupDescription() { return element(by.css('[data-e2e="policyGroupDescription"]')); }
  get enterEditPolicyGroupName() { return element(by.xpath('//input[@id="name"]')); }
  get ownigGroupDropDown() { return element(by.css('ng-select[formcontrolname="owningGroupId"]')); }
  selectOowningGroup(owningGroup: any) { return element(by.xpath(`//span[@class='ng-option-label ng-star-inserted'][contains(text(),'${owningGroup}')]`)); } // //span[.='Root Group']
  get policyGroupDraft() { return element(by.css('[for="draft"]')); }
  get policyGroupPublished() { return element(by.css('[for="published"]')); }
  get policyGroupMajor() { return element(by.css('[for="major"]')); }
  get policyGroupMinor() { return element(by.css('[for="minor"]')); }
  get policyGroupTemplateSearch() { return element(by.css('[data-e2e="policyGroupTemplateSearch"]')); }
  policyGroupTemplate(policyGroupTemplateName: any) { return element(by.xpath(`//h5[contains(.,'PGT ${policyGroupTemplateName}')]`)); }
  selectPermissions(permission: any, num: any) { return element(by.css(`[data-e2e='${permission} ${num}']`)); }
  get allowDisAllowDropDown() { return element(by.css('app-aws-products .form-control')); }
  get selectAllow() { return element(by.css('option[value="ALLOW"]')); }
  get selectDisAllow() { return element(by.xpath('//option[.="Disallow"]')); }
  get servicesDropDown() { return element(by.css('ng-select[placeholder="Select Product"]')); }
  get selectAllServices() { return element(by.css('button[data-e2e="dropdownSelectAll"]')); }
  selectService(service: any) { return element(by.xpath(`//span[.='${service}']`)); }
  get toast() { return $('#toast-container'); }
  get list() { return $('.list'); }
  get surfaceDropDown() { return element(by.css('select')); }
  selectSurface(surface: string) { return element(by.xpath(`//option[contains(.,'${surface}')]`)); }
  get entityTypeDropDown() { return element(by.css('[data-e2e="entityType"]')); }
  // selectEntityType(entityType: any) { return element(by.xpath(`//option[.='${entityType}']`)); }//option[.='Policy Group']
  selectEntityType(entityType: any) { return element(by.css(`option[value='${entityType}']`)); }
  get eventDropDown() { return element(by.css('[data-e2e="eventType"]')); }
  get selectAllEvents() { return element(by.css('button[data-e2e="dropdownSelectAll"]')); }
  selectEvent(events: any) { return element(by.xpath(`//span[.='${events}']`)); }
  get eventsBlankClick() { return element(by.css('app-policy-template-form>div:nth-of-type(1)>div:nth-of-type(1)')); }
  get approvalGroupsDropDown() { return element(by.css('[placeholder="Select Approval Groups"]')); }
  // get approvalGroupsDropDown() { return element(by.css('ng-select[formcontrolname="30008"] > div > span')); }
  selectGroup(group: any) { return element(by.xpath(`//div[.='${group}']`)); }
  get regionDropDown() { return element(by.css('ng-multiselect-dropdown[name="AwsRegions"] .dropdown-down')); }
  selectRegion(region: any) { return element(by.xpath(`//div[.='${region}']`)); }
  get attributeTagDropDown() { return element(by.css('ng-select[formcontrolname="attributeTagIds"] > div > span')); }
  selectAttributeTag(attributeTagName: string) { return element(by.xpath(`//span[.='${attributeTagName}']`)); }
  selectSurfaceLayer(surfacelayer: any) { return element(by.xpath(`//label[.='${surfacelayer}']`)); }
  get confirmCreationPolicy() {return element(by.css('.submit-button-final')); }
  templateType;
  policyStatusName;
  policyGroupStatusName;
  statusDraft;
  statusPublished;


  async createPolicyGroup(surfaceName: string = null, policyGroupName: string = null, policyGroupDescription: any = null,
    owningGroup: any = null, status: any = null, policyGroupTemplateName: string = null,
    attributeTagName: string = null, service: String[], surfaceLayer: any = null, entityType: any = null, group: any = null, permission: any = null,
    num: any = null) {

    if (status === 'DRAFT') {
      this.policyGroupStatusName = configProperties.policyGroupData.statusDraftName;
    }
    else {
      this.policyGroupStatusName = configProperties.policyGroupData.statusPublishedName;
    }
    await WaitHelper.waitForElementToBeHidden(this.toast);

    // await browser.get(configProperties.qaUrl + '/policy-groups');
    await elementClick(this.policyGroupMenu);
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

    await WaitHelper.waitForElementToBePresent(this.ownigGroupDropDown, 5000, 'Ownig Group DropDown ');
    await elementClick(this.ownigGroupDropDown);
    await browser.logger.info('Ownig Group DropDown Selected');

    await WaitHelper.waitForElementToBePresent(this.selectOowningGroup(owningGroup), 5000, 'Ownig Group ');
    await elementClick(this.selectOowningGroup(owningGroup));
    await browser.logger.info('Ownig Group Selected');

    if (status === 'PUBLISHED') {
      await WaitHelper.waitForElementToBeClickable(this.policyGroupPublished, 2000, 'Published ');
      await elementClick(this.policyGroupPublished);
      await browser.logger.info('Selected status as Published');

      await WaitHelper.waitForElementToBeClickable(this.policyGroupMinor, 2000, 'Minor ');
      await elementClick(this.policyGroupMinor);
      await browser.logger.info('Selected Increment as Minor');
      await browser.sleep(1000);
    }

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

    await WaitHelper.waitForElementToBeClickable(this.policyGroupTemplateSearch, 5000, 'Policy group Template List Displayed');
    // await elementClick(this.policyGroupTemplateSearch);
    // await elementSendkeys(this.policyGroupTemplateSearch, policyGroupTemplateName);
    await elementSendkeys(this.policyGroupTemplateSearch, policyGroupTemplateName);
    await elementClick(this.policyGroupTemplate(`${policyGroupTemplateName}`));
    await browser.logger.info('Policy Template Selected');

    if (policyGroupTemplateName.includes('Require')) {
      await browser.logger.info('Entity Type' + entityType);
      await this.entityType(entityType, group);
    }

    if (policyGroupTemplateName.includes('AWS Products')) {
      await browser.logger.info('Service' + service);
      await this.awsProducts(service, permission, num);
    }

    // Click on Submit button to submit the policy
    await WaitHelper.waitForElementToBeClickable(this.confirmCreationPolicy, 2000, 'Submit Button ');
    await elementClick(this.confirmCreationPolicy);
    await browser.logger.info('Policy Submitted', policyGroupName);
    await browser.sleep(2000);
  }

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

    await WaitHelper.waitForElementToBeClickable(this.approvalGroupsDropDown, 2000, 'Approval Groups ');
    await elementClick(this.approvalGroupsDropDown);
    await browser.logger.info('Approval Groups drop Down');

    await WaitHelper.waitForElementToBeClickable(this.selectGroup(group), 2000, ' Select Approval Group ');
    await elementClick(this.selectGroup(group));
    await browser.logger.info('Approval Groups Selected');
  }

  async awsProducts(service: String[], permission: any = null, num: any = null) {

    await WaitHelper.waitForElementToBeClickable(this.selectPermissions(permission, num), 2000, 'allowDisAllowDropDown ');
    await browser.actions().mouseMove(this.selectPermissions(permission, num)).perform();
    await elementClick(this.selectPermissions(permission, num));
    await browser.logger.info('allowDisAllowDropDown Page');

    await WaitHelper.waitForElementToBeClickable(this.allowDisAllowDropDown, 2000, 'allowDisAllowDropDown ');
    await browser.actions().mouseMove(this.allowDisAllowDropDown).perform();
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

  async selectSurfaceFromDropDown(surfaceName: string = null) {
    await WaitHelper.waitForElementToBePresent(this.surfaceDropDown, 5000, 'Surface Drop Down ');
    await elementClick(this.surfaceDropDown);
    await browser.logger.info('Surface Drop Down Clicked');

    await WaitHelper.waitForElementToBePresent(this.selectSurface(surfaceName), 5000, 'Surface');
    await elementClick(this.selectSurface(surfaceName));
    await browser.logger.info('Surface Selcted');
    await browser.sleep(2000);
  }

  getRandomNum = function (min, max) {
    return parseInt(Math.random() * (max - min) + min);
  };

  async getPageTitle() {
    return await browser.getTitle();
  }
}
