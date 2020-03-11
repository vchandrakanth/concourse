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
    // get policyGroupTemplateName() { return element(by.css('[data-e2e="PGTname"]')); }
    get policyGroupTemplateName() { return protractor_1.element(protractor_1.by.css('[data-e2e="name"]')); }
    // get editPolicyGroupTemplateName() { return element(by.css('[data-e2e="inputName"]')); }
    get editPolicyGroupTemplateName() { return protractor_1.element(protractor_1.by.css('#name')); }
    // get policyGroupTemplateDescription() { return element(by.css('textarea[data-e2e="PGTdescription"]')); }
    get policyGroupTemplateDescription() { return protractor_1.element(protractor_1.by.css('[data-e2e="description"]')); }
    get policyGroupTemplateStatusDropdown() { return protractor_1.element(protractor_1.by.css('select[formcontrolname="status"]')); }
    // get policyGroupTemplateDraft() { return element(by.css('option[value="DRAFT"]')); }[for='published']
    get policyGroupTemplatePublished() { return protractor_1.element(protractor_1.by.css('[for="published"]')); }
    get policyGroupTemplateDraft() { return protractor_1.element(protractor_1.by.css('[for="draft"]')); }
    // get policyGroupTemplatePublished() { return element(by.css('option[value="PUBLISHED"]')); }
    get policyGroupTemplateIncrementBy() { return protractor_1.element(protractor_1.by.css('select[formcontrolname="versionBump"]')); }
    // get policyGroupTemplateMajor() { return element(by.css('option[value="MAJOR"]')); }
    get policyGroupTemplateMajor() { return protractor_1.element(protractor_1.by.css('#major')); }
    get policyGroupTemplateMinor() { return protractor_1.element(protractor_1.by.css('[for="minor"]')); }
    // get policyGroupTemplateMinor() { return element(by.css('#Minor')); }
    get nextButton() { return protractor_1.element(protractor_1.by.xpath('//button[.="Next"]')); }
    get policyGroupTemplateList() { return protractor_1.element(protractor_1.$('.list')); }
    get policyGroupTemplateSubmit() { return protractor_1.element(protractor_1.by.css('button[type="submit"]')); }
    get searchTemplate() { return protractor_1.element(protractor_1.by.css('[placeholder="Search"]')); }
    get toast() { return protractor_1.$('#toast-container'); }
    get list() { return protractor_1.$('.list'); }
    policyTemplate(policyTemplateName) { return protractor_1.element(protractor_1.by.xpath(`//strong[.='${policyTemplateName}']`)); }
    get editButton() { return protractor_1.element(protractor_1.by.css('[data-e2e="editPolicyTemplate"]')); }
    get search() { return protractor_1.element(protractor_1.by.css('[placeholder="Search"]')); }
    // searchPolicyGroupTemplateName(name: string) { return element(by.xpath(`//h5[.='${name}']`)); }
    searchPolicyGroupTemplateName(name) { return protractor_1.element(protractor_1.by.css(`h5[data-e2e="${name}"]`)); } // [data-e2e="
    get saveButton() { return protractor_1.element(protractor_1.by.css('button[type="submit"]')); }
    // get saveButton() { return element(by.css('[data-e2e="saveBtn"]')); }
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
    selectSurface(surface) { return protractor_1.element(protractor_1.by.xpath(`//option[contains(.,'${surface}')]`)); }
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
            // await WaitHelper.waitForElementToBeClickable(this.policyGroupTemplateStatusDropdown, 2000, 'Status Drop Down ');
            // await elementClick(this.policyGroupTemplateStatusDropdown);
            // await browser.logger.info('Selected Status DropDown');
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
            // await browser.get(configProperties.qaUrl + '/policy-group-templates');
            yield utils_1.elementClick(this.policyGroupTemplateLink);
            yield protractor_1.browser.logger.info('Policy Group Template Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'List displayed');
            yield this.selectSurfaceFromDropDown(surfaceName);
            // Select Created Policy group Template
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy group Template List Displayed');
            yield this.search.sendKeys(name);
        });
    }
    editPolicyGroupTemplate(surfaceName = null, name = null, desc) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            // await browser.get(configProperties.qaUrl + '/policy-group-templates');
            yield utils_1.elementClick(this.policyGroupTemplateLink);
            yield protractor_1.browser.logger.info('Policy Group Template Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'List displayed');
            // await this.selectSurfaceFromDropDown(surfaceName);
            yield this.searchPolicyGroupTemplate(surfaceName, name);
            yield utils_1.elementClick(this.searchPolicyGroupTemplateName(name));
            yield protractor_1.browser.logger.info(name, 'Selected');
            // Click Edit Icon
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.editButton, 5000, 'Policy Group Template Edit ');
            yield utils_1.elementClick(this.editButton);
            yield protractor_1.browser.logger.info('Edit Button Clicked');
            // Edit Policy Group Template Name
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.policyGroupTemplateName, 5000, 'Policy Group Template Name ');
            yield utils_1.elementSendkeys(this.policyGroupTemplateName, ' Updated');
            yield protractor_1.browser.logger.info('Policy Group Template Name Entered: ');
            // await WaitHelper.waitForElementToBePresent(this.policyGroupTemplateEditStatusDropdown, 5000, 'Policy Group Template Drop Down ');
            // await elementClick(this.policyGroupTemplateEditStatusDropdown);
            // await browser.logger.info('Policy Group Template Status Drop DOwn ');
            // await WaitHelper.waitForElementToBeClickable(this.policyGroupTemplateDraft, 2000, 'DRAFT ');
            // await browser.actions().mouseDown(this.policyGroupTemplateDraft).perform();
            // await elementClick(this.policyGroupTemplateDraft);
            // await browser.logger.info(' Selected Draft');
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
            // await browser.get(configProperties.qaUrl + '/policy-group-templates');
            yield protractor_1.browser.actions().mouseDown(this.policyGroupTemplateLink).perform();
            yield utils_1.elementClick(this.policyGroupTemplateLink);
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
            yield protractor_1.browser.logger.info('Surface Drop Down Clicked');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5R3JvdXBUZW1wbGF0ZS5Qby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYWdlT2JqZWN0cy9wb2xpY3lHcm91cFRlbXBsYXRlLlBvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXFEO0FBQ3JELDBDQUE2RTtBQUM3RSxvREFBaUQ7QUFDakQsSUFBSSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUdyRCxNQUFhLHVCQUF1QjtJQUFwQztRQXVJRSxpQkFBWSxHQUFHLFVBQVUsR0FBRyxFQUFFLEdBQUc7WUFDL0IsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQztJQWtISixDQUFDO0lBelBDLElBQUksdUJBQXVCLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsdUNBQXVDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVsRyxJQUFJLDRCQUE0QixLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakcsb0ZBQW9GO0lBQ3BGLElBQUksdUJBQXVCLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RSwwRkFBMEY7SUFDMUYsSUFBSSwyQkFBMkIsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RSwwR0FBMEc7SUFDMUcsSUFBSSw4QkFBOEIsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxD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