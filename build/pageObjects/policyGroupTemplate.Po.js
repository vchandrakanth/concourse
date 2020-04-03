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
    get policyGroupTemplateLink() { return protractor_1.element(protractor_1.by.css('a[data-e2e="linkPolicyGroupTemplates"]')); }
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
            utils_1.elementClick(this.policyTemplate(policyTemplateName));
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
            // await WaitHelper.waitForElementToBeHidden(this.toast);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.policyGroupTemplateLink, 5000, 'Menu Displayed');
            yield protractor_1.browser.actions().mouseMove(this.policyGroupTemplateLink).perform();
            utils_1.elementClick(this.policyGroupTemplateLink);
            yield protractor_1.browser.logger.info('Policy Group Template Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'List displayed');
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield utils_1.elementClear(this.search, name);
            // Select Created Policy group Template
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Policy group Template List Displayed');
            yield this.search.sendKeys(name);
        });
    }
    editPolicyGroupTemplate(surfaceName = null, name = null, desc) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
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
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.policyGroupTemplateLink, 5000, 'Menu');
            yield protractor_1.browser.actions().mouseDown(this.policyGroupTemplateLink).perform();
            utils_1.elementClick(this.policyGroupTemplateLink);
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
            utils_1.elementClick(this.surfaceDropDown);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5R3JvdXBUZW1wbGF0ZS5Qby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYWdlT2JqZWN0cy9wb2xpY3lHcm91cFRlbXBsYXRlLlBvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXFEO0FBQ3JELDBDQUE2RTtBQUM3RSxvREFBaUQ7QUFDakQsSUFBSSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUdyRCxNQUFhLHVCQUF1QjtJQUFwQztRQWlJRSxpQkFBWSxHQUFHLFVBQVUsR0FBRyxFQUFFLEdBQUc7WUFDL0IsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQztJQWlISixDQUFDO0lBbFBDLElBQUksdUJBQXVCLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsd0NBQXdDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVuRyxJQUFJLDRCQUE0QixLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakcsb0ZBQW9GO0lBQ3BGLElBQUksdUJBQXVCLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RSwwRkFBMEY7SUFDMUYsSUFBSSwyQkFBMkIsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RSwwR0FBMEc7SUFDMUcsSUFBSSw4QkFBOEIsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxD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