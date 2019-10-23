"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
    // get enterPolicyGroupName() { return element(by.css('[data-e2e="policyGroupNameInput"]')); }
    get enterPolicyGroupName() { return protractor_1.element(protractor_1.by.css('[data-e2e="policyGroupName"]')); }
    // get enterPolicyGroupDescription() { return element(by.css('textarea[data-e2e="policyGroupDescriptionInput"]')); }
    get enterPolicyGroupDescription() { return protractor_1.element(protractor_1.by.css('[data-e2e="policyGroupDescription"]')); }
    get enterEditPolicyGroupName() { return protractor_1.element(protractor_1.by.xpath('//input[@id="name"]')); }
    get ownigGroupDropDown() { return protractor_1.element(protractor_1.by.css('ng-select[formcontrolname="owningGroupId"]')); }
    selectOowningGroup(owningGroup) { return protractor_1.element(protractor_1.by.xpath(`//span[@class='ng-option-label ng-star-inserted'][contains(text(),'${owningGroup}')]`)); } // //span[.='Root Group']
    get policyGroupStatusDropdown() { return protractor_1.element(protractor_1.by.css('select[formcontrolname="status"]')); }
    get policyGroupDraft() { return protractor_1.element(protractor_1.by.css('option[value="DRAFT"]')); }
    get policyGroupPublished() { return protractor_1.element(protractor_1.by.css('option[value="PUBLISHED"]')); }
    get policyGroupIncrementByDropdown() { return protractor_1.element(protractor_1.by.css('select[ng-reflect-name="versionBump"]')); }
    get policyGroupMajor() { return protractor_1.element(protractor_1.by.xpath('//option[.="Major"]')); }
    get policyGroupMinor() { return protractor_1.element(protractor_1.by.xpath('//option[.="Minor"]')); }
    policyGroupTemplate(policyGroupTemplateName) { return protractor_1.element(protractor_1.by.xpath(`//h5[contains(.,'PGT ${policyGroupTemplateName}')]`)); }
    // get allowDisAllowDropDown() { return element(by.css('select[ng-reflect-form="[object Object]"]')); }
    get allowDisAllowDropDown() { return protractor_1.element(protractor_1.by.css('template-allow .form-control')); }
    get selectAllow() { return protractor_1.element(protractor_1.by.xpath('//option[.="Allow"]')); }
    get selectDisAllow() { return protractor_1.element(protractor_1.by.xpath('//option[.="Disallow"]')); }
    get servicesDropDown() { return protractor_1.element(protractor_1.by.css('[data-e2e="serviceDropdown"]')); }
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
    selectGroup(group) { return protractor_1.element(protractor_1.by.xpath(`//div[.='${group}']`)); }
    get regionDropDown() { return protractor_1.element(protractor_1.by.css('ng-multiselect-dropdown[name="AwsRegions"] .dropdown-down')); }
    selectRegion(region) { return protractor_1.element(protractor_1.by.xpath(`//div[.='${region}']`)); }
    get nextButton() { return protractor_1.element(protractor_1.by.xpath('//button[.="Next"]')); }
    selectAttributeTag(attributeTagName) { return protractor_1.element(protractor_1.by.xpath(`//span[.='${attributeTagName}']`)); }
    selectSurfaceLayer(surfacelayer) { return protractor_1.element(protractor_1.by.xpath(`//label[.='${surfacelayer}']`)); }
    get policySubmit() { return protractor_1.element(protractor_1.by.xpath('//button[.=\'Submit\']')); }
    get editPoliciesButton() { return protractor_1.element(protractor_1.by.css('button[data-e2e="editPolicies"]')); }
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
    selectSurface(topology) { return protractor_1.element(protractor_1.by.xpath(`//option[contains(.,'${topology}')]`)); }
    /****************************************Policy Violation********************************************/
    get enclaveModel() { return protractor_1.element(protractor_1.by.xpath(`//td[.='${configProperties.enclaveModelData.enclaveModelName}']`)); }
    get enclaveModelEdit() { return protractor_1.element(protractor_1.by.css('.fa-edit')); }
    get chooseFile() { return protractor_1.element(protractor_1.by.css('input[type="file"]')); }
    get nextToEnclaveModelEvaluations() { return protractor_1.element(protractor_1.by.xpath('//button[.="Next"]')); }
    get nextToReviewEnclaveModel() { return protractor_1.element(protractor_1.by.xpath('//button[.="Next"]')); }
    get submitButton() { return protractor_1.element(protractor_1.by.xpath('//button[.="Submit"]')); }
    /**************************************** Update Policy Violation********************************************/
    // get policyGroup() { return element(by.xpath(`//h5[.='${configProperties.policyGroupData.statusPublishedName}']`)); }
    get editButton() { return protractor_1.element(protractor_1.by.css('button[data-e2e="editPolicyGroup"]')); }
    get policiesEditButton() { return protractor_1.element(protractor_1.by.css('button[data-e2e="editPolicies"]')); }
    deselectService(service) { return protractor_1.element(protractor_1.by.xpath(`//div[.="${service}"]`)); }
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
    get editOrganizationButton() { return protractor_1.element(protractor_1.by.css('button[data-e2e="editSurfaceLayers"]')); }
    get updateOrganizationButton() { return protractor_1.element(protractor_1.by.xpath('//button[data-e2e="updateSurfaceLayers"]')); }
    uncheckOrganization(Org) { return protractor_1.element(protractor_1.by.xpath(`//label[.='${Org}']`)); }
    get deleteButton() { return protractor_1.element(protractor_1.by.css('.btn-danger')); }
    get confirmDeleteButton() { return protractor_1.element(protractor_1.by.css('[data-e2e="confirmDeleteModalBtn"]')); }
    get attributeTagDropDown() { return protractor_1.element(protractor_1.by.css('ng-select[formcontrolname="attributeTagIds"] > div > span')); }
    get search() { return protractor_1.element(protractor_1.by.css('[placeholder="Search"]')); }
    get policyGroupTemplateSearch() { return protractor_1.element(protractor_1.by.css('step:nth-of-type(2)>form>div:nth-of-type(1)>div:nth-of-type(1)>input')); }
    searchPolicyGroupName(policyGroupName) { return protractor_1.element(protractor_1.by.css(`h5[data-e2e='${policyGroupName}']`)); }
    get policyGroupToPublish() { return protractor_1.element(protractor_1.by.xpath('//li[@class="list-group-item ng-star-inserted active"]')); } // ul[@class="list-group ng-star-inserted"]
    get editAttributeTagDropDown() { return protractor_1.element(protractor_1.by.xpath('//div[@class="ng-value-container"]')); }
    get blankClick() { return protractor_1.element(protractor_1.by.xpath('//span[@class="ng-arrow-wrapper"]')); }
    // Create the policy Group.//li[@class='list-group-item ng-star-inserted active']
    createPolicyGroup(policyGroupName = null, policyGroupDescription = null, owningGroup = null, status = null, policyGroupTemplateName = null, attributeTagName = null, service, surfaceLayer = null, entityType = null, group = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if (status === 'DRAFT') {
                this.policyGroupStatusName = configProperties.policyGroupData.statusDraftName;
            }
            else {
                this.policyGroupStatusName = configProperties.policyGroupData.statusPublishedName;
            }
            // wait till the toast element flash is hidden.
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-groups');
            yield protractor_1.browser.logger.info('Clicked On Policy Group Menu');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Suface Drop Down');
            yield protractor_1.browser.actions().mouseDown(this.surfaceDropDown).perform();
            yield utils_1.elementClick(this.surfaceDropDown);
            yield protractor_1.browser.logger.info('Suface Drop Down Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectSurface(configProperties.SurfaceData.surfaceName), 2000, 'E2E Topology ');
            yield utils_1.elementClick(this.selectSurface(configProperties.SurfaceData.surfaceName));
            yield protractor_1.browser.sleep(3000);
            yield protractor_1.browser.logger.info('Selected E2E Topology');
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
            // Owning Group DropDown
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.ownigGroupDropDown, 5000, 'Ownig Group DropDown ');
            yield utils_1.elementClick(this.ownigGroupDropDown);
            yield protractor_1.browser.logger.info('Ownig Group DropDown Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.selectOowningGroup(owningGroup), 5000, 'Ownig Group ');
            yield utils_1.elementClick(this.selectOowningGroup(owningGroup));
            yield protractor_1.browser.logger.info('Ownig Group Selected');
            // select status
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policyGroupStatusDropdown, 2000, 'Status DropDown ');
            yield utils_1.elementClick(this.policyGroupStatusDropdown);
            if (status === 'PUBLISHED') {
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policyGroupPublished, 2000, 'Published ');
                yield utils_1.elementClick(this.policyGroupPublished);
                yield protractor_1.browser.logger.info('Selected status as Published');
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policyGroupMinor, 2000, 'Minor ');
                yield utils_1.elementClick(this.policyGroupMinor);
                yield protractor_1.browser.logger.info('Selected Increment as Minor');
                yield protractor_1.browser.sleep(1000);
            }
            // Click on next to select services
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.nextButton, 2000, 'next ');
            yield utils_1.elementClick(this.nextButton);
            yield protractor_1.browser.logger.info('Click on next');
            // click on DemoPolicy
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policyGroupTemplateSearch, 5000, 'Policy group Template List Displayed');
            yield utils_1.elementClick(this.policyGroupTemplateSearch);
            yield utils_1.elementSendkeys(this.policyGroupTemplateSearch, policyGroupTemplateName);
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
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            // Click on next to Review Policy Group
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.nextButton, 5000, 'Next ');
            yield utils_1.elementClick(this.nextButton);
            yield protractor_1.browser.logger.info('Moved to Review Policy Group Page');
            // Click on Submit button to submit the policy
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policySubmit, 2000, 'Submit Button ');
            yield utils_1.elementClick(this.policySubmit);
            yield protractor_1.browser.logger.info('Policy Submitted', policyGroupName);
            yield protractor_1.browser.sleep(5000);
        });
    }
    entityType(entityType = null, group = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.entityTypeDropDown, 2000, 'Entity Type Drop Down ');
            yield utils_1.elementClick(this.entityTypeDropDown);
            yield protractor_1.browser.logger.info('Entity Type Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectEntityType(entityType), 2000, 'Policy Group');
            yield utils_1.elementClick(this.selectEntityType(entityType));
            yield protractor_1.browser.logger.info('Model Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.eventDropDown, 2000, 'Events Drop DOwn ');
            yield utils_1.elementClick(this.eventDropDown);
            yield protractor_1.browser.logger.info('Events Drop Down');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectAllEvents, 2000, 'Select All Events ');
            yield utils_1.elementClick(this.selectAllEvents);
            yield protractor_1.browser.logger.info('Events Selected');
            yield utils_1.elementClick(this.eventsBlankClick);
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
    searchPolicyGroup(policyGroupName = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            // Click on Assets Manager Menu Button
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-groups');
            yield protractor_1.browser.logger.info('Clicked on Policy Group Menu');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, ' Suface Drop Down');
            yield utils_1.elementClick(this.surfaceDropDown);
            yield protractor_1.browser.logger.info('Suface Drop Down Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectSurface(configProperties.SurfaceData.surfaceName), 2000, 'E2E Topology ');
            yield utils_1.elementClick(this.selectSurface(configProperties.SurfaceData.surfaceName));
            yield protractor_1.browser.logger.info('Selected E2E Topology');
            yield utils_1.elementClear(this.search, policyGroupName);
            // Select Created Policy Group
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy Group List Displayed');
            yield this.search.sendKeys(policyGroupName);
            yield protractor_1.browser.logger.info(policyGroupName, 'Selected');
        });
    }
    editPolicyGroup(policyGroupName = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.searchPolicyGroup(policyGroupName);
            yield utils_1.elementClick(this.searchPolicyGroupName(policyGroupName));
            yield protractor_1.browser.logger.info(policyGroupName, 'Selected');
            // Click Edit Icon
            yield protractor_1.browser.actions().mouseDown(this.editButton).perform();
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.editButton, 5000, 'Edit Button');
            yield utils_1.elementClick(this.editButton);
            yield protractor_1.browser.logger.info('Edit Button Clicked');
            yield protractor_1.browser.sleep(2000);
            // Edit Policy Group
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.enterEditPolicyGroupName, 5000, 'Policy Group Name ');
            yield utils_1.elementSendkeys(this.enterEditPolicyGroupName, ' Updated');
            yield protractor_1.browser.logger.info('Policy Group Name Entered: ', policyGroupName + ' Updated');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.editStatusDropDown, 5000, 'Status Drop Down ');
            yield utils_1.elementClick(this.editStatusDropDown);
            yield protractor_1.browser.logger.info('Policy Group Template Status Drop DOwn ');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.editStatusPublish, 2000, 'Published ');
            yield utils_1.elementClick(this.editStatusPublish);
            yield protractor_1.browser.logger.info(' Selected Published');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.editMinor, 2000, 'Minor ');
            yield utils_1.elementClick(this.editMinor);
            yield protractor_1.browser.logger.info(' Selected Minor');
            // Click on Submit button to submit the Policy Group
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.saveButton, 5000, 'Save ');
            yield utils_1.elementClick(this.saveButton);
            yield protractor_1.browser.logger.info('Policy Group Saved', policyGroupName);
        });
    }
    deletePolicyGroup(policyGroupName = null, deleteOnly = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-groups');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Suface Drop Down');
            yield protractor_1.browser.actions().mouseDown(this.surfaceDropDown).perform();
            yield utils_1.elementClick(this.surfaceDropDown);
            yield protractor_1.browser.logger.info('Suface Drop Down Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectSurface(configProperties.SurfaceData.surfaceName), 2000, 'E2E Topology ');
            yield utils_1.elementClick(this.selectSurface(configProperties.SurfaceData.surfaceName));
            yield protractor_1.browser.logger.info('Selected E2E Topology');
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
            // await browser.actions().mouseMove(this.deleteButton).perform();
            yield utils_1.elementClick(this.deleteButton);
            yield protractor_1.browser.logger.info('Delete Policy Group');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.confirmDeleteButton, 5000, 'Confirm Delete Button');
            yield utils_1.elementClick(this.confirmDeleteButton);
            yield protractor_1.browser.logger.info(policyGroupName, 'Deleted');
        });
    }
    editPoliciesandPublish(policyGroupName = null, service = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-groups');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Suface Drop Down');
            yield protractor_1.browser.actions().mouseDown(this.surfaceDropDown).perform();
            yield utils_1.elementClick(this.surfaceDropDown);
            yield protractor_1.browser.logger.info('Suface Drop Down Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectSurface(configProperties.SurfaceData.surfaceName), 2000, 'E2E Topology ');
            yield utils_1.elementClick(this.selectSurface(configProperties.SurfaceData.surfaceName));
            yield protractor_1.browser.logger.info('Selected E2E Topology');
            yield utils_1.elementClear(this.search, policyGroupName);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy Group List Displayed');
            yield this.search.sendKeys(policyGroupName);
            yield utils_1.elementClick(this.searchPolicyGroupName(policyGroupName));
            yield protractor_1.browser.logger.info(policyGroupName, 'Selected');
            // Click Edit Icon
            yield protractor_1.browser.actions().mouseDown(this.editPoliciesButton).perform();
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.editPoliciesButton, 5000, 'Edit Policies Button');
            yield utils_1.elementClick(this.editPoliciesButton);
            yield protractor_1.browser.logger.info('Edit Button Clicked');
            // Select Service
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.servicesDropDown, 2000, 'servicesDropDown ');
            yield utils_1.elementClick(this.servicesDropDown);
            yield protractor_1.browser.logger.info('servicesDropDown Page');
            yield utils_1.elementClick(this.selectService(`${service}`));
            yield protractor_1.browser.logger.info('service Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.confirmChanges, 5000, 'Confirm Changes ');
            yield utils_1.elementClick(this.confirmChanges);
            yield protractor_1.browser.logger.info('Confirm Changes ');
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-groups');
            yield utils_1.elementClear(this.search, policyGroupName);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Suface Drop Down');
            yield protractor_1.browser.actions().mouseDown(this.surfaceDropDown).perform();
            yield utils_1.elementClick(this.surfaceDropDown);
            yield protractor_1.browser.logger.info('Suface Drop Down Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectSurface(configProperties.SurfaceData.surfaceName), 2000, 'E2E Topology ');
            yield utils_1.elementClick(this.selectSurface(configProperties.SurfaceData.surfaceName));
            yield protractor_1.browser.logger.info('Selected E2E Topology');
            yield this.search.sendKeys(policyGroupName);
            yield utils_1.elementClick(this.searchPolicyGroupName(policyGroupName));
            yield protractor_1.browser.sleep(2000);
            // await elementClick(this.policyGroupToPublish.last());
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.publishButton, 5000, 'Publish Button ');
            yield protractor_1.browser.actions().mouseMove(this.publishButton).perform();
            yield utils_1.elementClick(this.publishButton);
            yield protractor_1.browser.logger.info('Publish Button ');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.editStatusDropDown, 5000, 'Status Drop Down ');
            yield utils_1.elementClick(this.editStatusDropDown);
            yield protractor_1.browser.logger.info('Policy Group Template Status Drop Down ');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.editStatusPublish, 2000, 'Published ');
            yield utils_1.elementClick(this.editStatusPublish);
            yield protractor_1.browser.logger.info(' Selected Published');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.editMinor, 2000, 'Minor ');
            yield utils_1.elementClick(this.editMinor);
            yield protractor_1.browser.logger.info(' Selected Minor');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.saveButton, 2000, 'Save ');
            yield utils_1.elementClick(this.saveButton);
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
    updatePolicyGroupWithEC2(policyGroupName = null, service = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-groups');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Suface Drop Down');
            yield protractor_1.browser.actions().mouseDown(this.surfaceDropDown).perform();
            yield utils_1.elementClick(this.surfaceDropDown);
            yield protractor_1.browser.logger.info('Suface Drop Down Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectSurface(configProperties.SurfaceData.surfaceName), 2000, 'E2E Topology ');
            yield utils_1.elementClick(this.selectSurface(configProperties.SurfaceData.surfaceName));
            yield protractor_1.browser.logger.info('Selected E2E Topology');
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
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.deselectService(service), 5000, 'Deselect EC2 ');
            yield utils_1.elementClick(this.deselectService(service));
            yield protractor_1.browser.logger.info('Deselect EC2 ');
            yield utils_1.elementClick(this.blankClick);
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.confirmChanges, 5000, 'Confirm Changes ');
            yield protractor_1.browser.actions().mouseDown(this.confirmChanges).perform();
            yield utils_1.elementClick(this.confirmChanges);
            yield protractor_1.browser.logger.info('Confirm Changes ');
            yield protractor_1.browser.sleep(2000);
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-groups');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Suface Drop Down');
            yield protractor_1.browser.actions().mouseDown(this.surfaceDropDown).perform();
            yield utils_1.elementClick(this.surfaceDropDown);
            yield protractor_1.browser.logger.info('Suface Drop Down Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectSurface(configProperties.SurfaceData.surfaceName), 2000, 'E2E Topology ');
            yield utils_1.elementClick(this.selectSurface(configProperties.SurfaceData.surfaceName));
            yield protractor_1.browser.logger.info('Selected E2E Topology');
            yield utils_1.elementClear(this.search, policyGroupName);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy Group List Displayed');
            yield this.search.sendKeys(policyGroupName);
            yield utils_1.elementClick(this.searchPolicyGroupName(policyGroupName));
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.publishButton, 5000, 'Publish Button ');
            yield utils_1.elementClick(this.publishButton);
            yield protractor_1.browser.logger.info('Publish Button');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.editStatusDropDown, 5000, 'Status Drop Down ');
            yield utils_1.elementClick(this.editStatusDropDown);
            yield protractor_1.browser.logger.info('Policy Group Template Status Drop Down ');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.editStatusPublish, 2000, 'Published ');
            yield utils_1.elementClick(this.editStatusPublish);
            yield protractor_1.browser.logger.info(' Selected Published');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.editMinor, 2000, 'Minor ');
            yield utils_1.elementClick(this.editMinor);
            yield protractor_1.browser.logger.info(' Selected Minor');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.saveButton, 2000, 'Save ');
            yield utils_1.elementClick(this.saveButton);
            yield protractor_1.browser.logger.info('Policy Published');
            yield protractor_1.browser.sleep(2000);
        });
    }
    updatePolicyGroupWithS3(policyGroupName = null, service = null, policyId2 = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-groups');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Suface Drop Down');
            yield protractor_1.browser.actions().mouseDown(this.surfaceDropDown).perform();
            yield utils_1.elementClick(this.surfaceDropDown);
            yield protractor_1.browser.logger.info('Suface Drop Down Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectSurface(configProperties.SurfaceData.surfaceName), 2000, 'E2E Topology ');
            yield utils_1.elementClick(this.selectSurface(configProperties.SurfaceData.surfaceName));
            yield protractor_1.browser.logger.info('Selected E2E Topology');
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
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.servicesDropDown, 5000, 'Select All Services ');
            yield utils_1.elementClick(this.servicesDropDown);
            yield protractor_1.browser.logger.info('Services Drop Down');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.selectAllServices, 5000, 'Services Drop Down ');
            yield utils_1.elementClick(this.selectAllServices);
            yield protractor_1.browser.logger.info('Services Drop Down');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.deselectService(service), 5000, 'Deselect EC2 ');
            yield utils_1.elementClick(this.deselectService(service));
            yield protractor_1.browser.logger.info('Deselect S3 ');
            yield utils_1.elementClick(this.blankClick);
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.confirmChanges, 5000, 'Confirm Changes ');
            yield protractor_1.browser.actions().mouseDown(this.confirmChanges).perform();
            yield utils_1.elementClick(this.confirmChanges);
            yield protractor_1.browser.logger.info('Confirm Changes ');
            yield protractor_1.browser.sleep(2000);
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-groups');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Suface Drop Down');
            yield protractor_1.browser.actions().mouseDown(this.surfaceDropDown).perform();
            yield utils_1.elementClick(this.surfaceDropDown);
            yield protractor_1.browser.logger.info('Suface Drop Down Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectSurface(configProperties.SurfaceData.surfaceName), 2000, 'E2E Topology ');
            yield utils_1.elementClick(this.selectSurface(configProperties.SurfaceData.surfaceName));
            yield protractor_1.browser.logger.info('Selected E2E Topology');
            yield utils_1.elementClear(this.search, policyGroupName);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy Group List Displayed');
            yield this.search.sendKeys(policyGroupName);
            yield utils_1.elementClick(this.searchPolicyGroupName(policyGroupName));
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.publishButton, 5000, 'Publish Button ');
            yield utils_1.elementClick(this.publishButton);
            yield protractor_1.browser.logger.info('Publish Button');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.editStatusDropDown, 5000, 'Status Drop Down ');
            yield utils_1.elementClick(this.editStatusDropDown);
            yield protractor_1.browser.logger.info('Policy Group Template Status Drop Down ');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.editStatusPublish, 2000, 'Published ');
            yield utils_1.elementClick(this.editStatusPublish);
            yield protractor_1.browser.logger.info(' Selected Published');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.editMinor, 2000, 'Minor ');
            yield utils_1.elementClick(this.editMinor);
            yield protractor_1.browser.logger.info(' Selected Minor');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.saveButton, 2000, 'Save ');
            yield utils_1.elementClick(this.saveButton);
            yield protractor_1.browser.logger.info('Policy Published');
            yield protractor_1.browser.sleep(2000);
        });
    }
    /****************************************Remove Surface Layer For PolicyGroup********************************************/
    removeSurfaceLayerForPG(policyGroupName = null, SurfaceLayer = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-groups');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Suface Drop Down');
            yield protractor_1.browser.actions().mouseDown(this.surfaceDropDown).perform();
            yield utils_1.elementClick(this.surfaceDropDown);
            yield protractor_1.browser.logger.info('Suface Drop Down Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectSurface(configProperties.SurfaceData.surfaceName), 2000, 'E2E Topology ');
            yield utils_1.elementClick(this.selectSurface(configProperties.SurfaceData.surfaceName));
            yield protractor_1.browser.logger.info('Selected E2E Topology');
            yield utils_1.elementClear(this.search, policyGroupName);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy Group List Displayed');
            yield this.search.sendKeys(policyGroupName);
            yield utils_1.elementClick(this.searchPolicyGroupName(policyGroupName));
            yield protractor_1.browser.logger.info(policyGroupName, 'Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.editOrganizationButton, 5000, 'Edit Surfaces Button');
            yield protractor_1.browser.actions().mouseDown(this.editOrganizationButton).perform();
            yield utils_1.elementClick(this.editOrganizationButton);
            yield protractor_1.browser.logger.info('Select Edit Surfaces Button');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.selectSurfaceLayer(SurfaceLayer), 5000, 'Surface Layer');
            yield utils_1.elementClick(this.selectSurfaceLayer(SurfaceLayer));
            yield protractor_1.browser.logger.info('Surface Layer Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.updateSurfaceLayers, 5000, 'Confirm Button ');
            yield utils_1.elementClick(this.updateSurfaceLayers);
            yield protractor_1.browser.logger.info('Confirm Changes ');
            yield protractor_1.browser.sleep(2000);
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-groups');
            yield utils_1.elementClear(this.search, policyGroupName);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Suface Drop Down');
            yield protractor_1.browser.actions().mouseDown(this.surfaceDropDown).perform();
            yield utils_1.elementClick(this.surfaceDropDown);
            yield protractor_1.browser.logger.info('Suface Drop Down Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectSurface(configProperties.SurfaceData.surfaceName), 2000, 'E2E Topology ');
            yield utils_1.elementClick(this.selectSurface(configProperties.SurfaceData.surfaceName));
            yield protractor_1.browser.logger.info('Selected E2E Topology');
            yield this.search.sendKeys(policyGroupName);
            yield utils_1.elementClick(this.searchPolicyGroupName(policyGroupName));
            yield protractor_1.browser.sleep(2000);
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.publishButton, 5000, 'Publish Button ');
            yield protractor_1.browser.actions().mouseMove(this.publishButton).perform();
            yield utils_1.elementClick(this.publishButton);
            yield protractor_1.browser.logger.info('Publish Button ');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.editStatusDropDown, 5000, 'Status Drop Down ');
            yield utils_1.elementClick(this.editStatusDropDown);
            yield protractor_1.browser.logger.info('Policy Group Template Status Drop Down ');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.editStatusPublish, 2000, 'Published ');
            yield utils_1.elementClick(this.editStatusPublish);
            yield protractor_1.browser.logger.info(' Selected Published');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.editMinor, 2000, 'Minor ');
            yield utils_1.elementClick(this.editMinor);
            yield protractor_1.browser.logger.info(' Selected Minor');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.saveButton, 2000, 'Save ');
            yield utils_1.elementClick(this.saveButton);
            yield protractor_1.browser.logger.info('Policy Published');
            yield protractor_1.browser.sleep(3000);
        });
    }
    /*************************************** Add Attribute Tag For Policy Group ******************/
    addAttributeTagForPG(policyGroupName = null, attributeTagName = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-groups');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Suface Drop Down');
            yield protractor_1.browser.actions().mouseDown(this.surfaceDropDown).perform();
            yield utils_1.elementClick(this.surfaceDropDown);
            yield protractor_1.browser.logger.info('Suface Drop Down Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectSurface(configProperties.SurfaceData.surfaceName), 2000, 'E2E Topology ');
            yield utils_1.elementClick(this.selectSurface(configProperties.SurfaceData.surfaceName));
            yield protractor_1.browser.logger.info('Selected E2E Topology');
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
            yield utils_1.elementClick(this.selectAttributeTag(attributeTagName));
            yield protractor_1.browser.logger.info('Attribute Selected');
            yield utils_1.elementClick(this.blankClick);
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.confirmButton, 5000, 'Confirm Button ');
            yield utils_1.elementClick(this.confirmButton);
            yield protractor_1.browser.logger.info('Confirm Changes ');
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-groups');
            yield utils_1.elementClear(this.search, policyGroupName);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Suface Drop Down');
            yield protractor_1.browser.actions().mouseDown(this.surfaceDropDown).perform();
            yield utils_1.elementClick(this.surfaceDropDown);
            yield protractor_1.browser.logger.info('Suface Drop Down Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectSurface(configProperties.SurfaceData.surfaceName), 2000, 'E2E Topology ');
            yield utils_1.elementClick(this.selectSurface(configProperties.SurfaceData.surfaceName));
            yield protractor_1.browser.logger.info('Selected E2E Topology');
            yield this.search.sendKeys(policyGroupName);
            yield utils_1.elementClick(this.searchPolicyGroupName(policyGroupName));
            yield protractor_1.browser.sleep(2000);
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.publishButton, 5000, 'Publish Button ');
            yield protractor_1.browser.actions().mouseMove(this.publishButton).perform();
            yield utils_1.elementClick(this.publishButton);
            yield protractor_1.browser.logger.info('Publish Button ');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.editStatusDropDown, 5000, 'Status Drop Down ');
            yield utils_1.elementClick(this.editStatusDropDown);
            yield protractor_1.browser.logger.info('Policy Group Template Status Drop Down ');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.editStatusPublish, 2000, 'Published ');
            yield utils_1.elementClick(this.editStatusPublish);
            yield protractor_1.browser.logger.info(' Selected Published');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.editMinor, 2000, 'Minor ');
            yield utils_1.elementClick(this.editMinor);
            yield protractor_1.browser.logger.info(' Selected Minor');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.saveButton, 2000, 'Save ');
            yield utils_1.elementClick(this.saveButton);
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
    removeAttributeTagForPG(policyGroupName = null, attributeTagId = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-groups');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Suface Drop Down');
            yield protractor_1.browser.actions().mouseDown(this.surfaceDropDown).perform();
            yield utils_1.elementClick(this.surfaceDropDown);
            yield protractor_1.browser.logger.info('Suface Drop Down Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectSurface(configProperties.SurfaceData.surfaceName), 2000, 'E2E Topology ');
            yield utils_1.elementClick(this.selectSurface(configProperties.SurfaceData.surfaceName));
            yield protractor_1.browser.logger.info('Selected E2E Topology');
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
            yield utils_1.elementClear(this.search, policyGroupName);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Suface Drop Down');
            yield protractor_1.browser.actions().mouseDown(this.surfaceDropDown).perform();
            yield utils_1.elementClick(this.surfaceDropDown);
            yield protractor_1.browser.logger.info('Suface Drop Down Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectSurface(configProperties.SurfaceData.surfaceName), 2000, 'E2E Topology ');
            yield utils_1.elementClick(this.selectSurface(configProperties.SurfaceData.surfaceName));
            yield protractor_1.browser.logger.info('Selected E2E Topology');
            yield this.search.sendKeys(policyGroupName);
            yield utils_1.elementClick(this.searchPolicyGroupName(policyGroupName));
            yield protractor_1.browser.sleep(2000);
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.publishButton, 5000, 'Publish Button ');
            yield protractor_1.browser.actions().mouseMove(this.publishButton).perform();
            yield utils_1.elementClick(this.publishButton);
            yield protractor_1.browser.logger.info('Publish Button ');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.editStatusDropDown, 5000, 'Status Drop Down ');
            yield utils_1.elementClick(this.editStatusDropDown);
            yield protractor_1.browser.logger.info('Policy Group Template Status Drop Down ');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.editStatusPublish, 2000, 'Published ');
            yield utils_1.elementClick(this.editStatusPublish);
            yield protractor_1.browser.logger.info(' Selected Published');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.editMinor, 2000, 'Minor ');
            yield utils_1.elementClick(this.editMinor);
            yield protractor_1.browser.logger.info(' Selected Minor');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.saveButton, 2000, 'Save ');
            yield utils_1.elementClick(this.saveButton);
            yield protractor_1.browser.logger.info('Policy Published');
            yield protractor_1.browser.sleep(3000);
        });
    }
    editSurfaceLayerAndPublish(policyGroupName = null, surfacelayer = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield utils_1.elementClick(this.policyGroupMenu);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Suface Drop Down');
            yield protractor_1.browser.actions().mouseDown(this.surfaceDropDown).perform();
            yield utils_1.elementClick(this.surfaceDropDown);
            yield protractor_1.browser.logger.info('Suface Drop Down Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectSurface(configProperties.SurfaceData.surfaceName), 2000, 'E2E Topology ');
            yield utils_1.elementClick(this.selectSurface(configProperties.SurfaceData.surfaceName));
            yield protractor_1.browser.logger.info('Selected E2E Topology');
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
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Suface Drop Down');
            yield protractor_1.browser.actions().mouseDown(this.surfaceDropDown).perform();
            yield utils_1.elementClick(this.surfaceDropDown);
            yield protractor_1.browser.logger.info('Suface Drop Down Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectSurface(configProperties.SurfaceData.surfaceName), 2000, 'E2E Topology ');
            yield utils_1.elementClick(this.selectSurface(configProperties.SurfaceData.surfaceName));
            yield protractor_1.browser.logger.info('Selected E2E Topology');
            yield this.search.sendKeys(policyGroupName);
            yield utils_1.elementClick(this.searchPolicyGroupName(policyGroupName));
            yield protractor_1.browser.sleep(2000);
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.publishButton, 5000, 'Publish Button ');
            yield protractor_1.browser.actions().mouseMove(this.publishButton).perform();
            yield utils_1.elementClick(this.publishButton);
            yield protractor_1.browser.logger.info('Publish Button ');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.editStatusDropDown, 5000, 'Status Drop Down ');
            yield utils_1.elementClick(this.editStatusDropDown);
            yield protractor_1.browser.logger.info('Policy Group Template Status Drop Down ');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.editStatusPublish, 2000, 'Published ');
            yield utils_1.elementClick(this.editStatusPublish);
            yield protractor_1.browser.logger.info(' Selected Published');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.editMinor, 2000, 'Minor ');
            yield utils_1.elementClick(this.editMinor);
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
    getPageTitle() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield protractor_1.browser.getTitle();
        });
    }
}
exports.PolicyGroup = PolicyGroup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5R3JvdXAuUG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcGFnZU9iamVjdHMvcG9saWN5R3JvdXAuUG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBeUQ7QUFDekQsMENBQTZFO0FBQzdFLG9EQUFpRDtBQUNqRCxvREFBaUQ7QUFFakQsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNCLElBQUksZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFFckQsTUFBYSxXQUFXO0lBQXhCO1FBcU9FLGlCQUFZLEdBQUcsVUFBVSxHQUFHLEVBQUUsR0FBRztZQUMvQixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDO0lBdXhCSixDQUFDO0lBNS9CQyxJQUFJLGVBQWUsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xGLElBQUksb0JBQW9CLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsc0NBQXNDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5Riw4RkFBOEY7SUFDOUYsSUFBSSxvQkFBb0IsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RGLG9IQUFvSDtJQUNwSCxJQUFJLDJCQUEyQixLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEcsSUFBSSx3QkFBd0IsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFB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