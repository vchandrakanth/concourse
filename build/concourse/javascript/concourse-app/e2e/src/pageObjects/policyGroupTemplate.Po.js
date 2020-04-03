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
let configProperties = require('../conf/properties');
class PolicyGroupTemplatePage {
    constructor() {
        this.getRandomNum = function (min, max) {
            return parseInt(Math.random() * (max - min) + min);
        };
    }
    get policyGroupTemplateLink() { return protractor_1.element(protractor_1.by.css('[data-e2e="linkPolicyGroupTemplates"]')); }
    get createNewPolicyGroupTemplate() { return protractor_1.element(protractor_1.by.css('button[data-e2e="createNewPGT"]')); }
    get policyGroupTemplateName() { return protractor_1.element(protractor_1.by.css('[data-e2e="PGTname"]')); }
    // get editPolicyGroupTemplateName() { return element(by.css('[data-e2e="inputName"]')); }
    get editPolicyGroupTemplateName() { return protractor_1.element(protractor_1.by.css('#name')); }
    get policyGroupTemplateDescription() { return protractor_1.element(protractor_1.by.css('textarea[data-e2e="PGTdescription"]')); }
    get policyGroupTemplateStatusDropdown() { return protractor_1.element(protractor_1.by.css('select[formcontrolname="status"]')); }
    get policyGroupTemplateDraft() { return protractor_1.element(protractor_1.by.css('option[value="DRAFT"]')); }
    get policyGroupTemplatePublished() { return protractor_1.element(protractor_1.by.css('option[value="PUBLISHED"]')); }
    get policyGroupTemplateIncrementBy() { return protractor_1.element(protractor_1.by.css('select[formcontrolname="versionBump"]')); }
    get policyGroupTemplateMajor() { return protractor_1.element(protractor_1.by.css('option[value="MAJOR"]')); }
    get policyGroupTemplateMinor() { return protractor_1.element(protractor_1.by.css('option[value="MINOR"]')); }
    get nextButton() { return protractor_1.element(protractor_1.by.xpath('//button[.="Next"]')); }
    get policyGroupTemplateList() { return protractor_1.element(protractor_1.$('.list')); }
    get policyGroupTemplateSubmit() { return protractor_1.element(protractor_1.by.xpath('//button[.="Submit"]')); }
    get searchTemplate() { return protractor_1.element(protractor_1.by.css('[placeholder="Search"]')); }
    get toast() { return protractor_1.$('#toast-container'); }
    get list() { return protractor_1.$('.list'); }
    policyTemplate(policyTemplateName) { return protractor_1.element(protractor_1.by.xpath(`//strong[.='${policyTemplateName}']`)); }
    get editButton() { return protractor_1.element(protractor_1.by.css('[data-e2e="editPolicyTemplate"]')); }
    get search() { return protractor_1.element(protractor_1.by.css('[placeholder="Search"]')); }
    // searchPolicyGroupTemplateName(name: string) { return element(by.xpath(`//h5[.='${name}']`)); }
    searchPolicyGroupTemplateName(name) { return protractor_1.element(protractor_1.by.css(`h5[data-e2e="${name}"]`)); } // [data-e2e="
    // get saveButton() { return element(by.css('.Save')); }
    get saveButton() { return protractor_1.element(protractor_1.by.css('[data-e2e="saveBtn"]')); }
    // get deleteButton() { return element(by.css('.btn-danger')); }
    get deleteButton() { return protractor_1.element(protractor_1.by.css('[data-e2e="PGTDeleteBtn"]')); }
    // get confirmDeleteButton() { return element(by.css('.delete')); }
    get confirmDeleteButton() { return protractor_1.element(protractor_1.by.css('[data-e2e="confirmDeleteModalBtn"]')); }
    // get policyGroupTemplateEditStatusDropdown() { return element(by.css('select[ng-reflect-name="status"]')); }
    get policyGroupTemplateEditStatusDropdown() { return protractor_1.element(protractor_1.by.xpath('//option[.="Select Status"]')); }
    get policyGroupTemplateEditDraft() { return protractor_1.element(protractor_1.by.xpath('//option[contains(.,"Draft")]')); }
    get policyGroupTemplateEditPublished() { return protractor_1.element(protractor_1.by.xpath('//option[contains(.,"Published")]')); }
    get policyGroupTemplateEditDeprecated() { return protractor_1.element(protractor_1.by.xpath('//option[contains(.,"Deprecated")]')); }
    // policyGroupTemplateElement(name: any) { return element(by.xpath(`//h5[.='${name}']`)); }
    policyGroupTemplateElement(name) { return protractor_1.element(protractor_1.by.css(`[data-e2e="${name}"]`)); }
    get surfaceDropDown() { return protractor_1.element(protractor_1.by.css('select')); }
    selectSurface(topology) { return protractor_1.element(protractor_1.by.xpath(`//option[contains(.,'${topology}')]`)); }
    createPolicyGroupTemplate(surfaceName = null, status, name = null, desc = 'Default description', policyTemplateName = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if (status === 'DRAFT') {
                this.policyGroupTemplateNameDraft = configProperties.policyGroupTemplateData.policyGroupTemplateNameDraft;
            }
            else {
                this.policyGroupTemplateNamePublish = configProperties.policyGroupTemplateData.policyGroupTemplateNamePublish;
            }
            // wait till the toast element flash is hidden.// wait till the toast element flash is hidden.
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            // Click on the PolicyGroups Template
            // await browser.get(configProperties.qaUrl + '/policy-group-templates');
            // await browser.actions().mouseDown(this.policyGroupTemplateLink).perform();
            yield utils_1.elementClick(this.policyGroupTemplateLink);
            yield protractor_1.browser.logger.info('Policy Group Template Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list);
            yield this.selectSurfaceFromDropDown(surfaceName);
            // Click on '+' Button to Create new policy
            yield utils_1.elementClick(this.createNewPolicyGroupTemplate);
            yield protractor_1.browser.logger.info('Clicked + Button');
            // Enter Policy Name
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.policyGroupTemplateName, 10000, 'Policy Group Template Name');
            yield utils_1.elementSendkeys(this.policyGroupTemplateName, name);
            yield protractor_1.browser.logger.info('Entered Policy Template Name', name);
            // Enter Policy Description
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.policyGroupTemplateDescription, 10000, 'Description ');
            yield utils_1.elementSendkeys(this.policyGroupTemplateDescription, desc);
            yield protractor_1.browser.logger.info('Description Entered', desc);
            // Select Draft status
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policyGroupTemplateStatusDropdown, 2000, 'Status Drop Down ');
            yield utils_1.elementClick(this.policyGroupTemplateStatusDropdown);
            yield protractor_1.browser.logger.info('Selected Status DropDown');
            // If selected published following code is executed.
            if (status === 'PUBLISHED') {
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policyGroupTemplatePublished, 2000, 'Published ');
                yield utils_1.elementClick(this.policyGroupTemplatePublished);
                yield protractor_1.browser.logger.info(' Selected Published');
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policyGroupTemplateMinor, 2000, 'Minor ');
                yield utils_1.elementClick(this.policyGroupTemplateMinor);
                yield protractor_1.browser.logger.info('Selected Increment by as Minor');
            }
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.nextButton, 2000, 'Next ');
            yield utils_1.elementClick(this.nextButton);
            yield protractor_1.browser.logger.info('Click on next');
            // Select Policy Template
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policyTemplate(policyTemplateName), 2000, 'Template ');
            yield protractor_1.browser.actions().mouseDown(this.policyTemplate(policyTemplateName)).perform();
            yield utils_1.elementClick(this.policyTemplate(policyTemplateName));
            yield protractor_1.browser.logger.info('Allowed AWS Products Selected');
            // click on next to Review Policy Group Template Page
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.nextButton, 2000, 'Next Button ');
            yield utils_1.elementClick(this.nextButton);
            yield protractor_1.browser.logger.info('Moved to Review PolicyGroup Template Page');
            // Click On Submit
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policyGroupTemplateSubmit, 2000, 'Submit Button ');
            yield utils_1.elementClick(this.policyGroupTemplateSubmit);
            yield protractor_1.browser.logger.info('Policy Group Template Created', name);
        });
    }
    getId() {
        return __awaiter(this, void 0, void 0, function* () {
            return protractor_1.browser.getCurrentUrl().then(function (url) {
                console.log(url);
                let str = 'currentUrl';
                let entityId = [];
                entityId = url.split('/');
                return entityId[4];
            });
        });
    }
    searchPolicyGroupTemplate(surfaceName = null, name = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-group-templates');
            // await browser.actions().mouseDown(this.policyGroupTemplateLink).perform();
            // await elementClick(this.policyGroupTemplateLink);
            yield protractor_1.browser.logger.info('Policy Group Template Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'List displayed');
            yield this.selectSurfaceFromDropDown(surfaceName);
            // Select Created Policy group Template
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy group Template List Displayed');
            yield this.search.sendKeys(name);
        });
    }
    editPolicyGroupTemplate(name = null, desc) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.searchPolicyGroupTemplate(name);
            yield utils_1.elementClick(this.searchPolicyGroupTemplateName(name));
            yield protractor_1.browser.logger.info(name, 'Selected');
            // Click Edit Icon
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.editButton, 5000, 'Policy Group Template Edit ');
            yield utils_1.elementClick(this.editButton);
            yield protractor_1.browser.logger.info('Edit Button Clicked');
            // Edit Policy Group Template Name
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.editPolicyGroupTemplateName, 5000, 'Policy Group Template Name ');
            yield utils_1.elementSendkeys(this.editPolicyGroupTemplateName, ' Updated');
            yield protractor_1.browser.logger.info('Policy Group Template Name Entered: ');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.policyGroupTemplateEditStatusDropdown, 5000, 'Policy Group Template Drop Down ');
            yield utils_1.elementClick(this.policyGroupTemplateEditStatusDropdown);
            yield protractor_1.browser.logger.info('Policy Group Template Status Drop DOwn ');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.policyGroupTemplateEditDraft, 2000, 'DRAFT ');
            yield utils_1.elementClick(this.policyGroupTemplateEditDraft);
            yield protractor_1.browser.logger.info(' Selected Draft');
            // Click on Submit button to submit the Policy Group Template
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.saveButton, 5000, 'Save ');
            yield utils_1.elementClick(this.saveButton);
            yield protractor_1.browser.logger.info('Policy Group Template Saved', name);
        });
    }
    deletePolicyGroupTemplate(surfaceName = null, name = null, deleteOnly = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            // Click on Policy Group Template Menu Button
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-group-templates');
            // await browser.actions().mouseDown(this.policyGroupTemplateLink).perform();
            // await elementClick(this.policyGroupTemplateLink);
            yield protractor_1.browser.logger.info('Policy Group Template Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list);
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield utils_1.elementClear(this.search, name);
            yield protractor_1.browser.sleep(2000);
            // Select Created Policy Group Template
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy Group Template List Displayed');
            if (!deleteOnly)
                name = name + ' Updated';
            yield this.search.sendKeys(name);
            yield utils_1.elementClick(this.searchPolicyGroupTemplateName(name));
            yield protractor_1.browser.logger.info(name, 'Selected');
            // Click On Delete Button in Policy Group Template Page
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.deleteButton, 5000, 'Delete Button');
            yield protractor_1.browser.actions().mouseMove(this.deleteButton).perform();
            yield utils_1.elementClick(this.deleteButton);
            yield protractor_1.browser.logger.info(name, 'Clicked Delete Button');
            // Click On Confirm Delete To Delete Policy Group Template
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.confirmDeleteButton, 5000, 'Confirm Delete Button');
            yield protractor_1.browser.actions().mouseMove(this.confirmDeleteButton).perform();
            yield utils_1.elementClick(this.confirmDeleteButton);
            yield protractor_1.browser.logger.info(name, 'Deleted');
        });
    }
    verifyPolicyGroupTemplate(name = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield this.search.sendKeys(name + ' Updated');
            yield protractor_1.browser.logger.info('Searched For ', name + ' Updated');
            yield protractor_1.browser.logger.info(name + ' Updated', ' Is Not Present');
        });
    }
    selectSurfaceFromDropDown(surfaceName = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.surfaceDropDown, 5000, 'Surface Drop Down ');
            yield utils_1.elementClick(this.surfaceDropDown);
            yield protractor_1.browser.logger.info(name, 'Surface Drop Down Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.selectSurface(surfaceName), 5000, 'Surface');
            yield utils_1.elementClick(this.selectSurface(surfaceName));
            yield protractor_1.browser.logger.info('Surface Selcted');
            yield protractor_1.browser.sleep(2000);
        });
    }
    getPageTitle() {
        return __awaiter(this, void 0, void 0, function* () {
            return protractor_1.browser.getTitle();
        });
    }
}
exports.PolicyGroupTemplatePage = PolicyGroupTemplatePage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5R3JvdXBUZW1wbGF0ZS5Qby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvZTJlL3NyYy9wYWdlT2JqZWN0cy9wb2xpY3lHcm91cFRlbXBsYXRlLlBvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXFEO0FBQ3JELDBDQUE2RTtBQUM3RSxvREFBaUQ7QUFDakQsSUFBSSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUdyRCxNQUFhLHVCQUF1QjtJQUFwQztRQW1JRSxpQkFBWSxHQUFHLFVBQVUsR0FBRyxFQUFFLEdBQUc7WUFDL0IsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQztJQTBHSixDQUFDO0lBN09DLElBQUksdUJBQXVCLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsdUNBQXVDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVsRyxJQUFJLDRCQUE0QixLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakcsSUFBSSx1QkFBdUIsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pGLDBGQUEwRjtJQUMxRixJQUFJLDJCQUEyQixLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLElBQUksOEJBQThCLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUs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