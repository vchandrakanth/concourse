"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const utils_1 = require("../utils/utils");
const waitHelper_1 = require("../utils/waitHelper");
const pageHelper_1 = require("../utils/pageHelper");
let path = require('path');
let configProperties = require('../conf/properties');
class PolicyGroup {
    constructor() {
        this.getRandomNum = function (min, max) {
            return parseInt(Math.random() * (max - min) + min);
        };
    }
    get policyGroupMenu() { return protractor_1.element(protractor_1.by.css('a[data-e2e="policyGroupMenu"]')); }
    get createNewpolicyGroup() { return protractor_1.element(protractor_1.by.css('button[data-e2e="createPolicyGroup"]')); }
    // get createNewpolicyGroup() { return element(by.xpath('//button[contains(.,"New Policy Group v2")]')); }
    get enterPolicyGroupName() { return protractor_1.element(protractor_1.by.css('[data-e2e="name"]')); }
    // get enterPolicyGroupName() { return element(by.css('[data-e2e="policyGroupName"]')); }
    get enterPolicyGroupDescription() { return protractor_1.element(protractor_1.by.css('[data-e2e="description"]')); }
    // get enterPolicyGroupDescription() { return element(by.css('[data-e2e="policyGroupDescription"]')); }
    get enterEditPolicyGroupName() { return protractor_1.element(protractor_1.by.xpath('//input[@id="name"]')); }
    get ownigGroupDropDown() { return protractor_1.element(protractor_1.by.css('ng-select[formcontrolname="owningGroupId"]')); }
    selectOowningGroup(owningGroup) { return protractor_1.element(protractor_1.by.xpath(`//span[@class='ng-option-label ng-star-inserted'][contains(text(),'${owningGroup}')]`)); } // //span[.='Root Group']
    // get policyGroupStatusDropdown() { return element(by.css('select[formcontrolname="status"]')); }
    // get policyGroupDraft() { return element(by.css('option[value="DRAFT"]')); }
    get policyGroupDraft() { return protractor_1.element(protractor_1.by.css('[for="draft"]')); }
    // get policyGroupPublished() { return element(by.css('option[value="PUBLISHED"]')); }
    get policyGroupPublished() { return protractor_1.element(protractor_1.by.css('[for="published"]')); }
    // get policyGroupIncrementByDropdown() { return element(by.css('select[ng-reflect-name="versionBump"]')); }
    get policyGroupMajor() { return protractor_1.element(protractor_1.by.css('[for="major"]')); }
    // get policyGroupMajor() { return element(by.css('#major')); }
    get policyGroupMinor() { return protractor_1.element(protractor_1.by.css('[for="minor"]')); }
    // get policyGroupMinor() { return element(by.css('#Minor')); }
    policyGroupTemplate(policyGroupTemplateName) { return protractor_1.element(protractor_1.by.xpath(`//h5[contains(.,'PGT ${policyGroupTemplateName}')]`)); }
    // get allowDisAllowDropDown() { return element(by.css('select[ng-reflect-form="[object Object]"]')); }
    // get allowDisAllowDropDown() { return element(by.css('template-allow > .form-group')); }
    get allowDisAllowDropDown() { return protractor_1.element(protractor_1.by.css('app-aws-products .form-control')); }
    // get selectAllow() { return element(by.xpath('//option[.="Allow"]')); }
    get selectAllow() { return protractor_1.element(protractor_1.by.css('option[value="ALLOW"]')); }
    get selectDisAllow() { return protractor_1.element(protractor_1.by.xpath('//option[.="Disallow"]')); }
    // get servicesDropDown() { return element(by.css('[data-e2e="serviceDropdown"]')); }
    get servicesDropDown() { return protractor_1.element(protractor_1.by.css('ng-select[placeholder="Select Product"]')); }
    get selectAllServices() { return protractor_1.element(protractor_1.by.css('button[data-e2e="dropdownSelectAll"]')); }
    selectService(service) { return protractor_1.element(protractor_1.by.xpath(`//span[.='${service}']`)); }
    get dropDownClose() { return protractor_1.element(protractor_1.by.css('.dropdown-up')); }
    get entityTypeDropDown() { return protractor_1.element(protractor_1.by.css('[data-e2e="entityType"]')); }
    // selectEntityType(entityType: any) { return element(by.xpath(`//option[.='${entityType}']`)); }//option[.='Policy Group']
    selectEntityType(entityType) { return protractor_1.element(protractor_1.by.css(`option[value='${entityType}']`)); }
    get eventDropDown() { return protractor_1.element(protractor_1.by.css('[data-e2e="eventType"]')); }
    get selectAllEvents() { return protractor_1.element(protractor_1.by.css('button[data-e2e="dropdownSelectAll"]')); }
    selectEvent(events) { return protractor_1.element(protractor_1.by.xpath(`//span[.='${events}']`)); }
    get eventsBlankClick() { return protractor_1.element(protractor_1.by.css('app-policy-template-form>div:nth-of-type(1)>div:nth-of-type(1)')); }
    get approvalGroupsDropDown() { return protractor_1.element(protractor_1.by.css('[placeholder="Select Approval Groups"]')); }
    // get approvalGroupsDropDown() { return element(by.css('ng-select[formcontrolname="30008"] > div > span')); }
    selectGroup(group) { return protractor_1.element(protractor_1.by.xpath(`//div[.='${group}']`)); }
    get regionDropDown() { return protractor_1.element(protractor_1.by.css('ng-multiselect-dropdown[name="AwsRegions"] .dropdown-down')); }
    selectRegion(region) { return protractor_1.element(protractor_1.by.xpath(`//div[.='${region}']`)); }
    get nextButton() { return protractor_1.element(protractor_1.by.xpath('//button[.="Next"]')); }
    selectAttributeTag(attributeTagName) { return protractor_1.element(protractor_1.by.xpath(`//span[.='${attributeTagName}']`)); }
    selectSurfaceLayer(surfacelayer) { return protractor_1.element(protractor_1.by.xpath(`//label[.='${surfacelayer}']`)); }
    get policySubmit() { return protractor_1.element(protractor_1.by.xpath('//button[.=\'Submit\']')); }
    get editPoliciesButton() { return protractor_1.element(protractor_1.by.css('button[data-e2e="editPolicies"]')); }
    get editProductsDropDown() { return protractor_1.element(protractor_1.by.xpath('//span[@class="ng-arrow-wrapper"]')); }
    get editAttributeTagsDropDown() { return protractor_1.element(protractor_1.by.xpath('//span[@class="ng-arrow-wrapper"]')); }
    get editSurfaceLayerButton() { return protractor_1.element(protractor_1.by.css('.btn-outline-primary[data-e2e="editSurfaceLayers"]')); }
    get updateSurfaceLayers() { return protractor_1.element(protractor_1.by.css('button[data-e2e="updateSurfaceLayers"]')); }
    get toast() { return protractor_1.$('#toast-container'); }
    get list() { return protractor_1.$('.list'); }
    get policyGroupTemplatelist() { return protractor_1.$('.pgt-list'); }
    // get editStatusDropDown() { return element(by.css('select[ng-reflect-name="status"]')); }
    get editStatusDropDown() { return protractor_1.element(protractor_1.by.xpath('//option[.="Select Status"]')); }
    get editStatusDraft() { return protractor_1.element(protractor_1.by.xpath('//option[contains(.,"Draft")]')); }
    get editStatusPublish() { return protractor_1.element(protractor_1.by.xpath('//option[contains(.,"Published")]')); }
    get editMinor() { return protractor_1.element(protractor_1.by.xpath('//option[contains(.,"MINOR")]')); }
    get editMajor() { return protractor_1.element(protractor_1.by.xpath('//option[contains(.,"MAJOR")]')); }
    get surfaceDropDown() { return protractor_1.element(protractor_1.by.css('select')); }
    selectSurface(surface) { return protractor_1.element(protractor_1.by.xpath(`//option[contains(.,'${surface}')]`)); }
    /****************************************Policy Violation********************************************/
    get enclaveModel() { return protractor_1.element(protractor_1.by.xpath(`//td[.='${configProperties.enclaveModelData.enclaveModelName}']`)); }
    get enclaveModelEdit() { return protractor_1.element(protractor_1.by.css('.fa-edit')); }
    get chooseFile() { return protractor_1.element(protractor_1.by.css('input[type="file"]')); }
    get nextToEnclaveModelEvaluations() { return protractor_1.element(protractor_1.by.xpath('//button[.="Next"]')); }
    get nextToReviewEnclaveModel() { return protractor_1.element(protractor_1.by.xpath('//button[.="Next"]')); }
    // get submitButton() { return element(by.xpath('//button[.="Submit"]')); }
    get submitButton() { return protractor_1.element(protractor_1.by.css('button[type="submit"]')); }
    /**************************************** Update Policy Violation********************************************/
    get editButton() { return protractor_1.element(protractor_1.by.css('button[data-e2e="editPolicyGroup"]')); }
    get policiesEditButton() { return protractor_1.element(protractor_1.by.css('button[data-e2e="editPolicies"]')); }
    clickOnService(service) { return protractor_1.element(protractor_1.by.css(`//span[.='${service}']`)); }
    deselectService(service) { return protractor_1.element(protractor_1.by.xpath(`//div[.='${service}']`)); }
    // deselectService(service: any) { return element(by.xpath(`//div['${service}']/span[@class='ng-value-icon left ng-star-inserted']`)); }
    get closeDropDown() { return protractor_1.element(protractor_1.by.xpath('//span[@class="ng-arrow-wrapper"]')); }
    get confirmChanges() { return protractor_1.element(protractor_1.by.css('button[data-e2e="submitPolicyGroupChanges"]')); }
    get publishButton() { return protractor_1.element(protractor_1.by.xpath('//button[.="Publish"]')); }
    get saveButton() { return protractor_1.element(protractor_1.by.css('.Save')); }
    get policyGroupToUpdatePolicies() { return protractor_1.element.all(protractor_1.by.xpath('//ul[@class="list-group ng-star-inserted"]')); }
    /**************************************** Remove Attribute Tag For PG in Policy Violation********************************************/
    get policyGroup() { return protractor_1.element(protractor_1.by.xpath(`//h5[.='${configProperties.policyGroupData.statusPublishedName}']`)); }
    get editAttributeTag() { return protractor_1.element(protractor_1.by.css('button[data-e2e="editAttributeTag"]')); }
    // updateAttributeTag(attributeTag: string) { return element(by.xpath(`//span[.='${attributeTag}']`)); }
    updateAttributeTag(attributeTagId) { return protractor_1.element(protractor_1.by.css(`span[data-e2e='${attributeTagId}']`)); }
    get confirmButton() { return protractor_1.element(protractor_1.by.css('.Confirm')); }
    get selectNewAttributeTag() { return protractor_1.element(protractor_1.by.xpath(`//div[.='properties.attributeTagData.violationAttributeName']`)); }
    /**************************************** Update Organization For PG in Policy Violation********************************************/
    // get editOrganizationButton() { return element(by.css('button[data-e2e="editSurfaceLayers"]')); }
    get editOrganizationButton() { return protractor_1.element(protractor_1.by.css('.btn-outline-primary[data-e2e="editSurfaceLayers"]')); }
    get updateOrganizationButton() { return protractor_1.element(protractor_1.by.xpath('//button[data-e2e="updateSurfaceLayers"]')); }
    uncheckOrganization(Org) { return protractor_1.element(protractor_1.by.xpath(`//label[.='${Org}']`)); }
    get deleteButton() { return protractor_1.element(protractor_1.by.css('.btn-danger')); }
    get confirmDeleteButton() { return protractor_1.element(protractor_1.by.css('[data-e2e="confirmDeleteModalBtn"]')); }
    get attributeTagDropDown() { return protractor_1.element(protractor_1.by.css('ng-select[formcontrolname="attributeTagIds"] > div > span')); }
    get search() { return protractor_1.element(protractor_1.by.css('[placeholder="Search"]')); }
    // get policyGroupTemplateSearch() { return element(by.css('step:nth-of-type(2)>form>div:nth-of-type(1)>div:nth-of-type(1)>input')); }
    get policyGroupTemplateSearch() { return protractor_1.element(protractor_1.by.css('step:nth-of-type(2)>form>div:nth-of-type(1)>div:nth-of-type(1)>input')); }
    searchPolicyGroupName(policyGroupName) { return protractor_1.element(protractor_1.by.css(`h5[data-e2e='${policyGroupName}']`)); }
    get policyGroupToPublish() { return protractor_1.element(protractor_1.by.xpath('//li[@class="list-group-item ng-star-inserted active"]')); } // ul[@class="list-group ng-star-inserted"]
    get editAttributeTagDropDown() { return protractor_1.element(protractor_1.by.xpath('//div[@class="ng-value-container"]')); }
    get blankClick() { return protractor_1.element(protractor_1.by.xpath('//span[@class="ng-arrow-wrapper"]')); }
    // Create the policy Group
    createPolicyGroup(surfaceName = null, policyGroupName = null, policyGroupDescription = null, owningGroup = null, status = null, policyGroupTemplateName = null, attributeTagName = null, service, surfaceLayer = null, entityType = null, group = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if (status === 'DRAFT') {
                this.policyGroupStatusName = configProperties.policyGroupData.statusDraftName;
            }
            else {
                this.policyGroupStatusName = configProperties.policyGroupData.statusPublishedName;
            }
            // wait till the toast element flash is hidden.
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            // if (policyGroupName.includes('V2')) {
            //   await browser.logger.info('Account Name' + policyGroupName);
            //   await elementClick(this.createNewPolicyGroupV2);
            // }
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-groups');
            yield protractor_1.browser.logger.info('Clicked On Policy Group Menu');
            yield this.selectSurfaceFromDropDown(surfaceName);
            // Click on '+' Button to Create new policy
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list);
            yield utils_1.elementClick(this.createNewpolicyGroup);
            yield protractor_1.browser.logger.info('Clicked + Button');
            // Enter Policy Name
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.enterPolicyGroupName, 5000, 'Name ');
            yield utils_1.elementSendkeys(this.enterPolicyGroupName, policyGroupName);
            yield protractor_1.browser.logger.info('Enter the Policy Name');
            // Enter Policy Description
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.enterPolicyGroupDescription, 5000, 'Description ');
            yield utils_1.elementSendkeys(this.enterPolicyGroupDescription, policyGroupDescription);
            yield protractor_1.browser.logger.info('Description Entered');
            // select status
            // await WaitHelper.waitForElementToBeClickable(this.policyGroupStatusDropdown, 2000, 'Status DropDown ');
            // await elementClick(this.policyGroupStatusDropdown);
            if (status === 'PUBLISHED') {
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policyGroupPublished, 2000, 'Published ');
                yield utils_1.elementClick(this.policyGroupPublished);
                yield protractor_1.browser.logger.info('Selected status as Published');
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policyGroupMinor, 2000, 'Minor ');
                yield utils_1.elementClick(this.policyGroupMinor);
                yield protractor_1.browser.logger.info('Selected Increment as Minor');
                yield protractor_1.browser.sleep(1000);
            }
            // Owning Group DropDown
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.ownigGroupDropDown, 5000, 'Ownig Group DropDown ');
            yield utils_1.elementClick(this.ownigGroupDropDown);
            yield protractor_1.browser.logger.info('Ownig Group DropDown Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.selectOowningGroup(owningGroup), 5000, 'Ownig Group ');
            yield utils_1.elementClick(this.selectOowningGroup(owningGroup));
            yield protractor_1.browser.logger.info('Ownig Group Selected');
            // Click on next to select services
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.nextButton, 2000, 'next ');
            yield utils_1.elementClick(this.nextButton);
            yield protractor_1.browser.logger.info('Click on next');
            // click on DemoPolicy
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policyGroupTemplateSearch, 5000, 'Policy group Template List Displayed');
            yield utils_1.elementClick(this.policyGroupTemplateSearch);
            yield utils_1.elementSendkeys(this.policyGroupTemplateSearch, policyGroupTemplateName);
            // await PageHelper.actionSendKeys(policyGroupTemplateName);
            // await browser.actions().mouseMove(this.policyGroupTemplate(`${policyGroupTemplateName}`)).perform();
            yield utils_1.elementClick(this.policyGroupTemplate(`${policyGroupTemplateName}`));
            yield protractor_1.browser.logger.info('Policy Template Selected');
            if (policyGroupTemplateName.includes('Require')) {
                yield protractor_1.browser.logger.info('Entity Type' + entityType);
                yield this.entityType(entityType, group);
            }
            if (policyGroupTemplateName.includes('AWS Products')) {
                yield protractor_1.browser.logger.info('Service' + service);
                yield this.awsProducts(service);
            }
            // click on next to Assign organizations
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.nextButton, 2000, 'next ');
            yield utils_1.elementClick(this.nextButton);
            yield protractor_1.browser.logger.info('Moved to Set Relationships Page');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.attributeTagDropDown, 2000, 'Attribute Tag Drop Down  ');
            yield utils_1.elementClick(this.attributeTagDropDown);
            yield protractor_1.browser.logger.info('Attribute Tag Drop Down Selected');
            // Select Attribute Tag
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectAttributeTag(attributeTagName), 2000, 'Attribute');
            yield utils_1.elementClick(this.selectAttributeTag(attributeTagName));
            yield protractor_1.browser.logger.info('Attribute Selected');
            if (surfaceLayer === 'Default Surface - Root Surface Layer') {
                yield utils_1.elementClick(this.selectSurfaceLayer(surfaceLayer));
                yield protractor_1.browser.logger.info('Organization Selected');
            }
            // Click on next to Impact Assessment
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.nextButton, 5000, 'Next ');
            yield utils_1.elementClick(this.nextButton);
            yield protractor_1.browser.logger.info('Moved to Impact Assessment Page');
            // Click on next to Review Policy Group
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.nextButton, 5000, 'Next ');
            yield utils_1.elementClick(this.nextButton);
            yield protractor_1.browser.logger.info('Moved to Review Policy Group Page');
            // Click on Submit button to submit the policy
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policySubmit, 2000, 'Submit Button ');
            yield utils_1.elementClick(this.policySubmit);
            yield protractor_1.browser.logger.info('Policy Submitted', policyGroupName);
            yield protractor_1.browser.sleep(2000);
        });
    }
    entityType(entityType = null, group = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.entityTypeDropDown, 2000, 'Entity Type Drop Down ');
            yield utils_1.elementClick(this.entityTypeDropDown);
            yield protractor_1.browser.logger.info('Entity Type Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectEntityType(entityType), 2000, 'Entity Type');
            yield utils_1.elementClick(this.selectEntityType(entityType));
            yield protractor_1.browser.logger.info('Model Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.eventDropDown, 2000, 'Events Drop Down ');
            yield utils_1.elementClick(this.eventDropDown);
            yield protractor_1.browser.logger.info('Events Drop Down');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectAllEvents, 2000, 'Select All Events ');
            yield utils_1.elementClick(this.selectAllEvents);
            yield protractor_1.browser.logger.info('Events Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.approvalGroupsDropDown, 2000, 'Approval Groups ');
            yield utils_1.elementClick(this.approvalGroupsDropDown);
            yield protractor_1.browser.logger.info('Approval Groups drop Down');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectGroup(group), 2000, ' Select Approval Group ');
            yield utils_1.elementClick(this.selectGroup(group));
            yield protractor_1.browser.logger.info('Approval Groups Selected');
        });
    }
    awsProducts(service) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.allowDisAllowDropDown, 2000, 'allowDisAllowDropDown ');
            yield protractor_1.browser.actions().mouseMove(this.allowDisAllowDropDown).perform();
            yield utils_1.elementClick(this.allowDisAllowDropDown);
            yield protractor_1.browser.logger.info('allowDisAllowDropDown Page');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectAllow, 2000, 'selectAllow ');
            yield utils_1.elementClick(this.selectAllow);
            yield protractor_1.browser.logger.info('selectAllow');
            for (let serviceName of service) {
                console.log('value', serviceName);
                yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.servicesDropDown, 5000, 'Services Drop Down ');
                yield utils_1.elementClick(this.servicesDropDown);
                yield protractor_1.browser.logger.info('Services Drop Down');
                // Select Services
                yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.selectService(service[0]), 5000, 'Select Services ');
                yield utils_1.elementClick(this.selectService(service[0]));
                yield protractor_1.browser.logger.info('Select Services');
            }
        });
    }
    searchPolicyGroup(surfaceName = null, policyGroupName = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            // Click on Assets Manager Menu Button
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-groups');
            yield protractor_1.browser.logger.info('Clicked on Policy Group Menu');
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield utils_1.elementClear(this.search, policyGroupName);
            // Select Created Policy Group
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy Group List Displayed');
            yield this.search.sendKeys(policyGroupName);
            yield protractor_1.browser.logger.info(policyGroupName, 'Selected');
        });
    }
    editPolicyGroup(surfaceName = null, policyGroupName = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            // Click on Assets Manager Menu Button
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-groups');
            yield protractor_1.browser.logger.info('Clicked on Policy Group Menu');
            yield this.searchPolicyGroup(surfaceName, policyGroupName);
            yield utils_1.elementClick(this.searchPolicyGroupName(policyGroupName));
            yield protractor_1.browser.logger.info(policyGroupName, 'Selected');
            // Click Edit Icon
            yield protractor_1.browser.actions().mouseDown(this.editButton).perform();
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.editButton, 5000, 'Edit Button');
            yield utils_1.elementClick(this.editButton);
            yield protractor_1.browser.logger.info('Edit Button Clicked');
            yield protractor_1.browser.sleep(2000);
            // Edit Policy Group
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.enterPolicyGroupName, 5000, 'Policy Group Name ');
            yield utils_1.elementSendkeys(this.enterPolicyGroupName, ' Updated');
            yield protractor_1.browser.logger.info('Policy Group Name Entered: ', policyGroupName + ' Updated');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policyGroupPublished, 2000, 'Published ');
            yield protractor_1.browser.actions().mouseMove(this.policyGroupPublished).perform();
            yield utils_1.elementClick(this.policyGroupPublished);
            yield protractor_1.browser.logger.info(' Selected Published');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policyGroupMinor, 2000, 'Minor ');
            yield protractor_1.browser.actions().mouseMove(this.policyGroupMinor).perform();
            yield utils_1.elementClick(this.policyGroupMinor);
            yield protractor_1.browser.logger.info(' Selected Minor');
            // Click on Submit button to submit the Policy Group
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.submitButton, 5000, 'Save ');
            yield utils_1.elementClick(this.submitButton);
            yield protractor_1.browser.logger.info('Policy Group Saved', policyGroupName);
        });
    }
    deletePolicyGroup(surfaceName = null, policyGroupName = null, deleteOnly = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-groups');
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield utils_1.elementClear(this.search, policyGroupName);
            // Select Created Policy Group
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy Group List Displayed');
            if (!deleteOnly)
                policyGroupName = policyGroupName + ' Updated';
            yield this.search.sendKeys(policyGroupName);
            yield utils_1.elementClick(this.searchPolicyGroupName(policyGroupName));
            yield protractor_1.browser.logger.info(policyGroupName, 'Selected');
            yield protractor_1.browser.sleep(2000);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.deleteButton, 5000, 'Delete Button');
            yield protractor_1.browser.actions().mouseMove(this.deleteButton).perform();
            yield utils_1.elementClick(this.deleteButton);
            yield protractor_1.browser.logger.info('Delete Policy Group');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.confirmDeleteButton, 5000, 'Confirm Delete Button');
            yield utils_1.elementClick(this.confirmDeleteButton);
            yield protractor_1.browser.logger.info(policyGroupName, 'Deleted');
        });
    }
    editPoliciesandPublish(surfaceName = null, policyGroupName = null, service = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-groups');
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield utils_1.elementClear(this.search, policyGroupName);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy Group List Displayed');
            yield this.search.sendKeys(policyGroupName);
            yield utils_1.elementClick(this.searchPolicyGroupName(policyGroupName));
            yield protractor_1.browser.logger.info(policyGroupName, 'Selected');
            // Click Edit Icon
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.editPoliciesButton, 5000, 'Edit Policies Button');
            yield protractor_1.browser.actions().mouseMove(this.editPoliciesButton).perform();
            yield utils_1.elementClick(this.editPoliciesButton);
            yield protractor_1.browser.logger.info('Edit Button Clicked');
            // Select Service
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.editProductsDropDown, 2000, 'servicesDropDown ');
            yield utils_1.elementClick(this.editProductsDropDown);
            yield protractor_1.browser.logger.info('servicesDropDown Page');
            yield utils_1.elementClick(this.selectService(`${service}`));
            yield protractor_1.browser.logger.info('service Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.confirmChanges, 5000, 'Confirm Changes ');
            yield utils_1.elementClick(this.confirmChanges);
            yield protractor_1.browser.logger.info('Confirm Changes ');
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-groups');
            yield utils_1.elementClear(this.search, policyGroupName);
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield this.search.sendKeys(policyGroupName);
            yield utils_1.elementClick(this.searchPolicyGroupName(policyGroupName));
            // await elementClick(this.policyGroupToPublish.last());
            yield protractor_1.browser.sleep(2000);
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.publishButton, 5000, 'Publish Button ');
            yield protractor_1.browser.actions().mouseMove(this.publishButton).perform();
            yield utils_1.elementClick(this.publishButton);
            yield protractor_1.browser.logger.info('Publish Button ');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policyGroupPublished, 2000, 'Published ');
            yield protractor_1.browser.actions().mouseMove(this.policyGroupPublished).perform();
            yield utils_1.elementClick(this.policyGroupPublished);
            yield protractor_1.browser.logger.info(' Selected Published');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policyGroupMinor, 2000, 'Minor ');
            yield protractor_1.browser.actions().mouseMove(this.policyGroupMinor).perform();
            yield utils_1.elementClick(this.policyGroupMinor);
            yield protractor_1.browser.logger.info(' Selected Minor');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.submitButton, 2000, 'Submit ');
            yield utils_1.elementClick(this.submitButton);
            yield protractor_1.browser.logger.info('Policy Published');
            yield protractor_1.browser.sleep(2000);
        });
    }
    /**************************************** Verify Policy Violation********************************************/
    verifyPolicyViolation(fileName = null, Services = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            // await WaitHelper.waitForElementToBeClickable(this.enclaveModel, 5000, 'enclaveModel');
            // await browser.actions().mouseDown(this.enclaveModel).perform();
            // await elementClick(this.enclaveModel);
            // await browser.logger.info('Enclave Model Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.enclaveModelEdit, 10000, 'Edit Page Opened');
            yield protractor_1.browser.actions().mouseDown(this.enclaveModelEdit).perform();
            yield utils_1.elementClick(this.enclaveModelEdit);
            yield waitHelper_1.WaitHelper.waitForElementToBeSelected(this.chooseFile, 2000, 'Choose File ');
            yield protractor_1.browser.logger.info('ChooseFile');
            yield this.fileUpload(fileName);
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.nextToEnclaveModelEvaluations, 5000, 'Enclave Model Evaluations ');
            yield utils_1.elementClick(this.nextToEnclaveModelEvaluations);
            yield protractor_1.browser.logger.info('Moved to Review Enclave Model Page');
            // Select Review Enclave Model Page
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.nextToReviewEnclaveModel, 5000, 'Review Enclave Model ');
            yield utils_1.elementClick(this.nextToReviewEnclaveModel);
            yield protractor_1.browser.logger.info('Moved to Submit Page');
            yield protractor_1.browser.sleep(2000);
            // Click on Submit button to submit the EnClave Model
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.submitButton, 5000, 'Submit ');
            yield utils_1.elementClick(this.submitButton);
            yield protractor_1.browser.logger.info('Enclave Model Submitted');
        });
    }
    fileUpload(fileName = null) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileToUpload = `C:/Users/intone-wv/Desktop/e2e/src/conf/${fileName}`;
            let absolutePath = path.join(__dirname, fileToUpload);
            yield pageHelper_1.PageHelper.uploadFile(this.chooseFile, fileToUpload);
            yield protractor_1.browser.logger.info('File Uploaded');
        });
    }
    /****************************************Update Policy Violation********************************************/
    updatePolicyGroupWithEC2(surfaceName = null, policyGroupName = null, service) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-groups');
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield utils_1.elementClear(this.search, policyGroupName);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy Group List Displayed');
            yield this.search.sendKeys(policyGroupName);
            yield utils_1.elementClick(this.searchPolicyGroupName(policyGroupName));
            yield protractor_1.browser.logger.info(policyGroupName, 'Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.policiesEditButton, 5000, 'Policies Edit Button');
            yield protractor_1.browser.actions().mouseDown(this.policiesEditButton).perform();
            yield utils_1.elementClick(this.policiesEditButton);
            yield protractor_1.browser.logger.info('Select Policies Edit Button');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.allowDisAllowDropDown, 2000, 'allowDisAllowDropDown ');
            yield utils_1.elementClick(this.allowDisAllowDropDown);
            yield protractor_1.browser.logger.info('allowDisAllowDropDown Page');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectAllow, 2000, 'selectAllow ');
            yield utils_1.elementClick(this.selectAllow);
            yield protractor_1.browser.logger.info('selectAllow');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.servicesDropDown, 5000, 'Services Drop Down ');
            yield utils_1.elementClick(this.servicesDropDown);
            yield protractor_1.browser.logger.info('Services Drop Down');
            // Select Services
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.selectAllServices, 5000, 'Select All Services ');
            yield utils_1.elementClick(this.selectAllServices);
            yield protractor_1.browser.logger.info('Select All Services');
            // await WaitHelper.waitForElementToBePresent(this.clickOnService(service), 5000, 'DeSelect Services ');
            // await elementClick(this.clickOnService(service));
            // await browser.logger.info('DeSelect Services');
            // await WaitHelper.waitForElementToBeClickable(this.deselectService(service), 5000, 'Deselect Service ');
            // await browser.actions().mouseMove(this.deselectService(service)).perform();
            // await elementClick(this.deselectService(service));
            // await browser.logger.info('Deselect Service ');
            // await elementClick(this.blankClick);
            yield utils_1.elementClick(this.blankClick);
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.servicesDropDown, 5000, 'Services Drop Down ');
            yield utils_1.elementClick(this.servicesDropDown);
            yield protractor_1.browser.logger.info('Services Drop Down');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.deselectService(service), 5000, 'Deselect Service ');
            yield protractor_1.browser.actions().mouseMove(this.deselectService(service)).perform();
            yield utils_1.elementClick(this.deselectService(service));
            yield protractor_1.browser.logger.info('Deselect Service ');
            yield utils_1.elementClick(this.blankClick);
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.confirmChanges, 5000, 'Confirm Changes ');
            yield protractor_1.browser.actions().mouseDown(this.confirmChanges).perform();
            yield utils_1.elementClick(this.confirmChanges);
            yield protractor_1.browser.logger.info('Confirm Changes ');
            yield protractor_1.browser.sleep(2000);
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-groups');
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield utils_1.elementClear(this.search, policyGroupName);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy Group List Displayed');
            yield this.search.sendKeys(policyGroupName);
            yield utils_1.elementClick(this.searchPolicyGroupName(policyGroupName));
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.publishButton, 5000, 'Publish Button ');
            yield protractor_1.browser.actions().mouseMove(this.publishButton).perform();
            yield utils_1.elementClick(this.publishButton);
            yield protractor_1.browser.logger.info('Publish Button');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policyGroupPublished, 2000, 'Published ');
            yield protractor_1.browser.actions().mouseMove(this.policyGroupPublished).perform();
            yield utils_1.elementClick(this.policyGroupPublished);
            yield protractor_1.browser.logger.info(' Selected Published');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policyGroupMinor, 2000, 'Minor ');
            yield protractor_1.browser.actions().mouseMove(this.policyGroupMinor).perform();
            yield utils_1.elementClick(this.policyGroupMinor);
            yield protractor_1.browser.logger.info(' Selected Minor');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.submitButton, 2000, 'Submit ');
            yield protractor_1.browser.actions().mouseMove(this.submitButton).perform();
            yield utils_1.elementClick(this.submitButton);
            yield protractor_1.browser.logger.info('Policy Published');
            yield protractor_1.browser.sleep(2000);
        });
    }
    updatePolicyGroupWithS3(surfaceName = null, policyGroupName = null, service = null, policyId2 = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-groups');
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield utils_1.elementClear(this.search, policyGroupName);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy Group List Displayed');
            yield this.search.sendKeys(policyGroupName);
            yield protractor_1.browser.sleep(2000);
            yield utils_1.elementClick(this.searchPolicyGroupName(policyGroupName));
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.policiesEditButton, 5000, 'Policies Edit Button');
            yield protractor_1.browser.actions().mouseDown(this.policiesEditButton).perform();
            yield utils_1.elementClick(this.policiesEditButton);
            yield protractor_1.browser.logger.info('Select Policies Edit Button');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.allowDisAllowDropDown, 2000, 'allowDisAllowDropDown ');
            yield utils_1.elementClick(this.allowDisAllowDropDown);
            yield protractor_1.browser.logger.info('allowDisAllowDropDown Page');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectAllow, 2000, 'selectAllow ');
            yield utils_1.elementClick(this.selectAllow);
            yield protractor_1.browser.logger.info('selectAllow');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.servicesDropDown, 5000, 'Services Drop Down ');
            yield utils_1.elementClick(this.servicesDropDown);
            yield protractor_1.browser.logger.info('Services Drop Down');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.selectAllServices, 5000, 'Select All Services');
            yield utils_1.elementClick(this.selectAllServices);
            yield protractor_1.browser.logger.info('Select All Services');
            yield protractor_1.browser.sleep(2000);
            // await WaitHelper.waitForElementToBePresent(this.deselectService(service[0]), 5000, 'DeSelect Services ');
            // await elementClick(this.deselectService(service[0]));
            // await browser.logger.info('DeSelect Services');
            // await browser.sleep(2000);
            yield utils_1.elementClick(this.blankClick);
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.servicesDropDown, 5000, 'Services Drop Down ');
            yield utils_1.elementClick(this.servicesDropDown);
            yield protractor_1.browser.logger.info('Services Drop Down');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.deselectService(service), 5000, 'Deselect Service ');
            yield protractor_1.browser.actions().mouseMove(this.deselectService(service)).perform();
            yield utils_1.elementClick(this.deselectService(service));
            yield protractor_1.browser.logger.info('Deselect Service ');
            yield utils_1.elementClick(this.blankClick);
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.confirmChanges, 5000, 'Confirm Changes ');
            yield protractor_1.browser.actions().mouseMove(this.confirmChanges).perform();
            yield utils_1.elementClick(this.confirmChanges);
            yield protractor_1.browser.logger.info('Confirm Changes ');
            yield protractor_1.browser.sleep(2000);
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-groups');
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield utils_1.elementClear(this.search, policyGroupName);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy Group List Displayed');
            yield this.search.sendKeys(policyGroupName);
            yield utils_1.elementClick(this.searchPolicyGroupName(policyGroupName));
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.publishButton, 5000, 'Publish Button ');
            yield utils_1.elementClick(this.publishButton);
            yield protractor_1.browser.logger.info('Publish Button');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policyGroupPublished, 2000, 'Published ');
            yield protractor_1.browser.actions().mouseMove(this.policyGroupPublished).perform();
            yield utils_1.elementClick(this.policyGroupPublished);
            yield protractor_1.browser.logger.info(' Selected Published');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policyGroupMinor, 2000, 'Minor ');
            yield utils_1.elementClick(this.policyGroupMinor);
            yield protractor_1.browser.logger.info(' Selected Minor');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.submitButton, 2000, 'Submit ');
            yield utils_1.elementClick(this.submitButton);
            yield protractor_1.browser.logger.info('Policy Published');
            yield protractor_1.browser.sleep(2000);
        });
    }
    /****************************************Remove Surface Layer For PolicyGroup********************************************/
    removeSurfaceLayerForPG(surfaceName = null, policyGroupName = null, SurfaceLayer = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-groups');
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield utils_1.elementClear(this.search, policyGroupName);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy Group List Displayed');
            yield this.search.sendKeys(policyGroupName);
            yield utils_1.elementClick(this.searchPolicyGroupName(policyGroupName));
            yield protractor_1.browser.logger.info(policyGroupName, 'Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.editOrganizationButton, 5000, 'Edit Surfaces Button');
            yield protractor_1.browser.actions().mouseMove(this.editOrganizationButton).perform();
            yield utils_1.elementClick(this.editOrganizationButton);
            yield protractor_1.browser.logger.info('Select Edit Surfaces Button');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.selectSurfaceLayer(SurfaceLayer), 5000, 'Surface Layer');
            yield utils_1.elementClick(this.selectSurfaceLayer(SurfaceLayer));
            yield protractor_1.browser.logger.info('Surface Layer Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.updateSurfaceLayers, 5000, 'Confirm Changes ');
            yield utils_1.elementClick(this.updateSurfaceLayers);
            yield protractor_1.browser.logger.info('Confirm Changes ');
            yield protractor_1.browser.sleep(2000);
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-groups');
            yield utils_1.elementClear(this.search, policyGroupName);
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield this.search.sendKeys(policyGroupName);
            yield utils_1.elementClick(this.searchPolicyGroupName(policyGroupName));
            yield protractor_1.browser.sleep(2000);
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.publishButton, 5000, 'Publish Button ');
            yield protractor_1.browser.actions().mouseMove(this.publishButton).perform();
            yield utils_1.elementClick(this.publishButton);
            yield protractor_1.browser.logger.info('Publish Button ');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policyGroupPublished, 2000, 'Published ');
            yield protractor_1.browser.actions().mouseMove(this.policyGroupPublished).perform();
            yield utils_1.elementClick(this.policyGroupPublished);
            yield protractor_1.browser.logger.info(' Selected Published');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policyGroupMinor, 2000, 'Minor ');
            yield utils_1.elementClick(this.policyGroupMinor);
            yield protractor_1.browser.logger.info(' Selected Minor');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.submitButton, 2000, 'Save ');
            yield utils_1.elementClick(this.submitButton);
            yield protractor_1.browser.logger.info('Policy Published');
            yield protractor_1.browser.sleep(3000);
        });
    }
    /*************************************** Add Attribute Tag For Policy Group ******************/
    addAttributeTagForPG(surfaceName = null, policyGroupName = null, attributeTagName = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-groups');
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield utils_1.elementClear(this.search, policyGroupName);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy Group List Displayed');
            yield this.search.sendKeys(policyGroupName);
            yield utils_1.elementClick(this.searchPolicyGroupName(policyGroupName));
            yield protractor_1.browser.logger.info(policyGroupName, 'Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.editAttributeTag, 5000, 'Attribute Tag Drop Down Button');
            yield protractor_1.browser.actions().mouseDown(this.editAttributeTag).perform();
            yield utils_1.elementClick(this.editAttributeTag);
            yield protractor_1.browser.logger.info('Select Attribute Tag Edit Button');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.editAttributeTagDropDown, 5000, 'Attribute Tag Drop Down Button');
            yield protractor_1.browser.actions().mouseDown(this.editAttributeTagDropDown).perform();
            yield utils_1.elementClick(this.editAttributeTagDropDown);
            yield protractor_1.browser.logger.info('Select Attribute Tag Drop Down Button');
            // Select Attribute Tag
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectAttributeTag(attributeTagName), 5000, 'Attribute');
            yield protractor_1.browser.actions().mouseMove(this.selectAttributeTag(attributeTagName)).perform();
            yield protractor_1.browser.sleep(1000);
            yield utils_1.elementClick(this.selectAttributeTag(attributeTagName));
            yield protractor_1.browser.logger.info('Attribute Selected');
            yield utils_1.elementClick(this.blankClick);
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.confirmButton, 5000, 'Confirm Button ');
            yield utils_1.elementClick(this.confirmButton);
            yield protractor_1.browser.logger.info('Confirm Changes ');
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-groups');
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield utils_1.elementClear(this.search, policyGroupName);
            yield this.search.sendKeys(policyGroupName);
            yield utils_1.elementClick(this.searchPolicyGroupName(policyGroupName));
            yield protractor_1.browser.sleep(2000);
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.publishButton, 5000, 'Publish Button ');
            yield protractor_1.browser.actions().mouseMove(this.publishButton).perform();
            yield utils_1.elementClick(this.publishButton);
            yield protractor_1.browser.logger.info('Publish Button ');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policyGroupPublished, 2000, 'Published ');
            yield protractor_1.browser.actions().mouseMove(this.policyGroupPublished).perform();
            yield utils_1.elementClick(this.policyGroupPublished);
            yield protractor_1.browser.logger.info(' Selected Published');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policyGroupMinor, 2000, 'Minor ');
            yield utils_1.elementClick(this.policyGroupMinor);
            yield protractor_1.browser.logger.info(' Selected Minor');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.submitButton, 2000, 'Submit ');
            yield utils_1.elementClick(this.submitButton);
            yield protractor_1.browser.logger.info('Policy Published');
            yield protractor_1.browser.sleep(3000);
        });
    }
    getId6(str) {
        return __awaiter(this, void 0, void 0, function* () {
            let ID = [];
            ID = String(str).split('| ');
            console.log('test', ID.length);
            return ID[(ID.length - 1)];
        });
    }
    /****************************************Update Attribute Tag For PG********************************************/
    removeAttributeTagForPG(surfaceName = null, policyGroupName = null, attributeTagId = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-groups');
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield utils_1.elementClear(this.search, policyGroupName);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy Group List Displayed');
            yield this.search.sendKeys(policyGroupName);
            yield utils_1.elementClick(this.searchPolicyGroupName(policyGroupName));
            yield protractor_1.browser.logger.info(policyGroupName, 'Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.editAttributeTag, 5000, 'Attribute Tag Drop Down Button');
            yield protractor_1.browser.actions().mouseDown(this.editAttributeTag).perform();
            yield utils_1.elementClick(this.editAttributeTag);
            yield protractor_1.browser.logger.info('Select Attribute Tag Edit Button');
            yield protractor_1.browser.sleep(2000);
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.updateAttributeTag(attributeTagId), 2000);
            yield protractor_1.browser.actions().mouseDown(this.updateAttributeTag(attributeTagId)).perform();
            yield utils_1.elementClick(this.updateAttributeTag(attributeTagId));
            yield protractor_1.browser.logger.info('Removed Attribute Tag ID', attributeTagId);
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.confirmButton, 5000, 'Confirm Button ');
            yield utils_1.elementClick(this.confirmButton);
            yield protractor_1.browser.logger.info('Confirm Changes ');
            yield protractor_1.browser.sleep(2000);
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-groups');
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield utils_1.elementClear(this.search, policyGroupName);
            yield this.search.sendKeys(policyGroupName);
            yield utils_1.elementClick(this.searchPolicyGroupName(policyGroupName));
            yield protractor_1.browser.sleep(2000);
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.publishButton, 5000, 'Publish Button ');
            yield protractor_1.browser.actions().mouseMove(this.publishButton).perform();
            yield utils_1.elementClick(this.publishButton);
            yield protractor_1.browser.logger.info('Publish Button ');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policyGroupPublished, 2000, 'Published ');
            yield protractor_1.browser.actions().mouseMove(this.policyGroupPublished).perform();
            yield utils_1.elementClick(this.policyGroupPublished);
            yield protractor_1.browser.logger.info(' Selected Published');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policyGroupMinor, 2000, 'Minor ');
            yield protractor_1.browser.actions().mouseMove(this.policyGroupMinor).perform();
            yield utils_1.elementClick(this.policyGroupMinor);
            yield protractor_1.browser.logger.info(' Selected Minor');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.submitButton, 2000, 'Submit ');
            yield utils_1.elementClick(this.submitButton);
            yield protractor_1.browser.logger.info('Policy Published');
            yield protractor_1.browser.sleep(3000);
        });
    }
    editSurfaceLayerAndPublish(surfaceName = null, policyGroupName = null, surfacelayer = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield utils_1.elementClick(this.policyGroupMenu);
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield utils_1.elementClear(this.search, policyGroupName);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy Group List Displayed');
            yield this.search.sendKeys(policyGroupName);
            yield utils_1.elementClick(this.searchPolicyGroupName(policyGroupName));
            yield protractor_1.browser.logger.info(policyGroupName, 'Selected');
            // Click Edit Icon
            yield protractor_1.browser.actions().mouseDown(this.editSurfaceLayerButton).perform();
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.editSurfaceLayerButton, 5000, 'Edit Policies Button');
            yield utils_1.elementClick(this.editSurfaceLayerButton);
            yield protractor_1.browser.logger.info('Edit Button Clicked');
            // Select Service
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectSurfaceLayer(surfacelayer), 2000, 'servicesDropDown ');
            yield utils_1.elementClick(this.selectSurfaceLayer(surfacelayer));
            yield protractor_1.browser.logger.info('Surface Layer Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.updateSurfaceLayers, 5000, 'Confirm Changes ');
            yield utils_1.elementClick(this.updateSurfaceLayers);
            yield protractor_1.browser.logger.info('Surface Layer Updated');
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-groups');
            yield utils_1.elementClear(this.search, policyGroupName);
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield this.search.sendKeys(policyGroupName);
            yield utils_1.elementClick(this.searchPolicyGroupName(policyGroupName));
            yield protractor_1.browser.sleep(2000);
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.publishButton, 5000, 'Publish Button ');
            yield protractor_1.browser.actions().mouseMove(this.publishButton).perform();
            yield utils_1.elementClick(this.publishButton);
            yield protractor_1.browser.logger.info('Publish Button ');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policyGroupPublished, 2000, 'Published ');
            yield utils_1.elementClick(this.policyGroupPublished);
            yield protractor_1.browser.logger.info(' Selected Published');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policyGroupMinor, 2000, 'Minor ');
            yield utils_1.elementClick(this.policyGroupMinor);
            yield protractor_1.browser.logger.info(' Selected Minor');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.saveButton, 2000, 'Save ');
            yield utils_1.elementClick(this.saveButton);
            yield protractor_1.browser.logger.info('Policy Published');
            yield protractor_1.browser.sleep(2000);
        });
    }
    verifyPolicyGroup(policyGroupName = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield utils_1.elementClear(this.search, policyGroupName);
            yield this.search.sendKeys(policyGroupName + ' Updated');
            yield protractor_1.browser.logger.info('Searched For ', policyGroupName + ' Updated');
            yield protractor_1.browser.logger.info(policyGroupName + ' Updated', ' Is Not Present');
        });
    }
    selectSurfaceFromDropDown(surfaceName = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.surfaceDropDown, 5000, 'Surface Drop Down ');
            yield utils_1.elementClick(this.surfaceDropDown);
            yield protractor_1.browser.logger.info('Surface Drop Down Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.selectSurface(surfaceName), 5000, 'Surface');
            yield utils_1.elementClick(this.selectSurface(surfaceName));
            yield protractor_1.browser.logger.info('Surface Selcted');
            yield protractor_1.browser.sleep(2000);
        });
    }
    publishPolicyGroup(surfaceName = null, policyGroupName = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            // Click on Assets Manager Menu Button
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-groups');
            yield protractor_1.browser.logger.info('Clicked on Policy Group Menu');
            yield this.searchPolicyGroup(surfaceName, policyGroupName);
            yield utils_1.elementClick(this.searchPolicyGroupName(policyGroupName));
            yield protractor_1.browser.logger.info(policyGroupName, 'Selected');
            // Click Edit Icon
            yield protractor_1.browser.actions().mouseDown(this.editButton).perform();
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.editButton, 5000, 'Edit Button');
            yield utils_1.elementClick(this.editButton);
            yield protractor_1.browser.logger.info('Edit Button Clicked');
            yield protractor_1.browser.sleep(2000);
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.publishButton, 5000, 'Publish Button ');
            yield protractor_1.browser.actions().mouseMove(this.publishButton).perform();
            yield utils_1.elementClick(this.publishButton);
            yield protractor_1.browser.logger.info('Publish Button');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policyGroupPublished, 2000, 'Published ');
            yield protractor_1.browser.actions().mouseMove(this.policyGroupPublished).perform();
            yield utils_1.elementClick(this.policyGroupPublished);
            yield protractor_1.browser.logger.info(' Selected Published');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policyGroupMinor, 2000, 'Minor ');
            yield protractor_1.browser.actions().mouseMove(this.policyGroupMinor).perform();
            yield utils_1.elementClick(this.policyGroupMinor);
            yield protractor_1.browser.logger.info(' Selected Minor');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.submitButton, 2000, 'Submit ');
            yield protractor_1.browser.actions().mouseMove(this.submitButton).perform();
            yield utils_1.elementClick(this.submitButton);
            yield protractor_1.browser.logger.info('Policy Published');
            yield protractor_1.browser.sleep(2000);
        });
    }
    getPageTitle() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield protractor_1.browser.getTitle();
        });
    }
}
exports.PolicyGroup = PolicyGroup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5R3JvdXAuUG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcGFnZU9iamVjdHMvcG9saWN5R3JvdXAuUG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJDQUF5RDtBQUN6RCwwQ0FBNkU7QUFDN0Usb0RBQWlEO0FBQ2pELG9EQUFpRDtBQUVqRCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDM0IsSUFBSSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUVyRCxNQUFhLFdBQVc7SUFBeEI7UUFrUEUsaUJBQVksR0FBRyxVQUFVLEdBQUcsRUFBRSxHQUFHO1lBQy9CLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUM7SUEwdUJKLENBQUM7SUE1OUJDLElBQUksZUFBZSxLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEYsSUFBSSxvQkFBb0IsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlGLDBHQUEwRztJQUMxRyxJQUFJLG9CQUFvQixLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0UseUZBQXlGO0lBQ3pGLElBQUksMkJBQTJCLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6Rix1R0FBdUc7SUFDdkcsSUFBSSx3QkFBd0IsS0FBSyxPQUFPLG9C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