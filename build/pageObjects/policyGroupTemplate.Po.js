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
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-group-templates');
            // await browser.actions().mouseDown(this.policyGroupTemplateLink).perform();
            // await elementClick(this.policyGroupTemplateLink);
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
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-group-templates');
            // await elementClick(this.policyGroupTemplateLink);
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
            yield protractor_1.browser.get(configProperties.qaUrl + '/policy-group-templates');
            // await elementClick(this.policyGroupTemplateLink);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5R3JvdXBUZW1wbGF0ZS5Qby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYWdlT2JqZWN0cy9wb2xpY3lHcm91cFRlbXBsYXRlLlBvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQ0FBcUQ7QUFDckQsMENBQTZFO0FBQzdFLG9EQUFpRDtBQUNqRCxJQUFJLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBR3JELE1BQWEsdUJBQXVCO0lBQXBDO1FBdUlFLGlCQUFZLEdBQUcsVUFBVSxHQUFHLEVBQUUsR0FBRztZQUMvQixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDO0lBa0hKLENBQUM7SUF6UEMsSUFBSSx1QkFBdUIsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWxHLElBQUksNEJBQTRCLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRyxvRkFBb0Y7SUFDcEYsSUFBSSx1QkFBdUIsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlFLDBGQUEwRjtJQUMxRixJQUFJLDJCQUEyQixLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLDBHQUEwRztJQUMxRyxJQUFJLDhCQUE4QixLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENB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