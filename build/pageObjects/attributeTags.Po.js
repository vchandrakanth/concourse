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
class AttributeTag {
    constructor() {
        this.getRandomNum = function (min, max) {
            return parseInt(Math.random() * (max - min) + min);
        };
    }
    get attributeTagsLink() { return protractor_1.element(protractor_1.by.css('a[data-e2e="linkAttributeTags"]')); }
    // get createNewAttributeTag() { return element(by.xpath('//button[contains(text(),"New Attribute")]')); }
    get createNewAttributeTag() { return protractor_1.element(protractor_1.by.css('[data-e2e="newAttributeTagButton"]')); }
    // get enterTagName() { return element(by.xpath('//input[@id="name"]')); }
    get enterTagName() { return protractor_1.element(protractor_1.by.css('[data-e2e="inputAttributeTagName"]')); }
    // get enterTagDescription() { return element(by.xpath('//textarea[@id="description"]')); }
    get enterTagDescription() { return protractor_1.element(protractor_1.by.css('[data-e2e="inputAttributeTagDescription"]')); }
    // get saveButton() { return element(by.xpath('//button[contains(text(),"Save")]')); }
    get saveButton() { return protractor_1.element(protractor_1.by.css('[data-e2e="attributeTagSaveButton"]')); }
    // get editButton() { return element(by.css('button[title="Edit Attribute Tag"]')); }
    get editButton() { return protractor_1.element(protractor_1.by.css('[data-e2e="editAttributeTagButton"]')); }
    get toast() { return protractor_1.$('#toast-container'); }
    get list() { return protractor_1.element(protractor_1.by.xpath('//div[@class="list"]')); }
    // get deleteButton() { return element(by.css('.btn-danger')); }
    get deleteButton() { return protractor_1.element(protractor_1.by.css('[data-e2e="deleteAttributeTagButton"]')); }
    // get confirmDeleteButton() { return element(by.css('.delete')); }
    get confirmDeleteButton() { return protractor_1.element(protractor_1.by.css('[data-e2e="confirmDeleteModalBtn"]')); }
    // searchAttribute(attributeName: string) { return element(by.xpath(`//h5[.='${attributeName}']`)); }
    searchAttributeName(attributeName) { return protractor_1.element(protractor_1.by.css(`[data-e2e='${attributeName}']`)); }
    get search() { return protractor_1.element(protractor_1.by.css('[placeholder="Search"]')); }
    // get surfaceDropDown() { return element(by.css('select')); }
    get surfaceDropDown() { return protractor_1.element(protractor_1.by.css('[data-e2e="surfaceSwitcherDropdown"]')); }
    selectSurface(surface) { return protractor_1.element(protractor_1.by.xpath(`//option[contains(.,'${surface}')]`)); }
    createAttributeTag(surfaceName = null, name = null, description) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.actions().mouseDown(this.attributeTagsLink).perform();
            utils_1.elementClick(this.attributeTagsLink);
            yield protractor_1.browser.logger.info('AttributeTags Menu Clicked');
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield protractor_1.browser.logger.info('Selected E2E Surface');
            // Click on '+' Button to Create new Tag
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.createNewAttributeTag, 2000, 'New Attribute Tag');
            yield utils_1.elementClick(this.createNewAttributeTag);
            yield protractor_1.browser.logger.info('Clicked New Attribute Tag Button');
            // Enter Tag Name
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.enterTagName, 2000, 'attribute tag name ');
            yield utils_1.elementSendkeys(this.enterTagName, name);
            yield protractor_1.browser.logger.info('Attribute Tag Name Entered');
            // Enter Tag Description
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.enterTagDescription, 2000, 'Description ');
            yield utils_1.elementSendkeys(this.enterTagDescription, description);
            yield protractor_1.browser.logger.info('Attribute Tag Description Entered');
            // Save Attribute Tag
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.saveButton, 5000, 'Save ');
            yield utils_1.elementClick(this.saveButton);
            yield protractor_1.browser.sleep(2000);
            yield protractor_1.browser.logger.info('Attribute Tag Created');
            yield console.log('Attribute Tag Is', name);
        });
    }
    searchAttribute(surfaceName = null, name = null, description = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.attributeTagsLink, 5000, 'AttributeTag Menu');
            yield protractor_1.browser.actions().mouseMove(this.attributeTagsLink).perform();
            utils_1.elementClick(this.attributeTagsLink);
            yield protractor_1.browser.logger.info('AttributeTags Menu Clicked');
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield utils_1.elementClear(this.search, name);
            // Select Created Attribute Tag
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'AttributeTag List Displayed');
            yield this.search.sendKeys(name);
            yield protractor_1.browser.sleep(2000);
            yield utils_1.elementClick(this.searchAttributeName(name));
            yield protractor_1.browser.logger.info(name, 'Selected');
        });
    }
    editAttributeTag(surfaceName = null, name = null, description) {
        return __awaiter(this, void 0, void 0, function* () {
            // Search arrtribute.
            yield this.searchAttribute(surfaceName, name, description);
            // Click Edit Icon
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.editButton, 5000, 'Edit Button ');
            yield utils_1.elementClick(this.editButton);
            yield protractor_1.browser.logger.info('Edit Button Clicked');
            // Edit Attribute Tag Name
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.enterTagName, 5000, 'AttributeTag Name ');
            yield protractor_1.browser.sleep(2000);
            yield utils_1.elementSendkeys(this.enterTagName, ' Updated');
            yield protractor_1.browser.logger.info('Asset Name Entered: ', name + ' Updated');
            // Edit Attribute Tag Description
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.enterTagDescription, 5000, 'AttributeTag Description ');
            yield protractor_1.browser.sleep(2000);
            yield utils_1.elementSendkeys(this.enterTagDescription, ' Updated');
            yield protractor_1.browser.logger.info('Asset Description Entered: ', description + ' Updated');
            // Save Attribute Tag
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.saveButton, 5000, 'Save ');
            yield utils_1.elementClick(this.saveButton);
            yield protractor_1.browser.logger.info('Attribute Tag Updated');
            yield console.log('Attribute Tag Is', name + ' Updated');
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
    deleteAttributeTag(surfaceName = null, name = null, deleteOnly = null) {
        return __awaiter(this, void 0, void 0, function* () {
            // wait till the toast element flash is hidden.
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.actions().mouseMove(this.attributeTagsLink).perform();
            utils_1.elementClick(this.attributeTagsLink);
            yield protractor_1.browser.logger.info('AttributeTags Menu Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'List displayed');
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield utils_1.elementClear(this.search, name);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'AttributeTag List Displayed');
            if (!deleteOnly)
                name = name + ' Updated';
            yield this.search.sendKeys(name);
            utils_1.elementClick(this.searchAttributeName(name));
            yield protractor_1.browser.logger.info(name, 'Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.deleteButton, 5000, 'Delete');
            yield protractor_1.browser.actions().mouseMove(this.deleteButton).perform();
            yield utils_1.elementClick(this.deleteButton);
            yield protractor_1.browser.logger.info('Clicked Delete Button');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.confirmDeleteButton, 2000, 'Confirm Delete');
            yield protractor_1.browser.actions().mouseMove(this.confirmDeleteButton).perform();
            yield utils_1.elementClick(this.confirmDeleteButton);
            yield protractor_1.browser.logger.info(name, 'Is deleted');
        });
    }
    verifyAttributeTag(name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield utils_1.elementClear(this.search, name);
            yield this.search.sendKeys(name + ' Updated');
            yield protractor_1.browser.logger.info('Searched For ', name + ' Updated');
            yield protractor_1.browser.logger.info(name + ' Updated', ' Is Not Present');
        });
    }
    selectSurfaceFromDropDown(surfaceName = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.surfaceDropDown, 5000, 'Surface Drop Down ');
            utils_1.elementClick(this.surfaceDropDown);
            yield protractor_1.browser.logger.info(surfaceName, 'Surface Drop Down Clicked');
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
exports.AttributeTag = AttributeTag;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRlVGFncy5Qby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYWdlT2JqZWN0cy9hdHRyaWJ1dGVUYWdzLlBvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXFEO0FBQ3JELDBDQUE2RTtBQUM3RSxvREFBaUQ7QUFDakQsSUFBSSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUVyRCxNQUFhLFlBQVk7SUFBekI7UUEwREUsaUJBQVksR0FBRyxVQUFVLEdBQUcsRUFBRSxHQUFHO1lBQy9CLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUM7SUFpSEosQ0FBQztJQTVLQyxJQUFJLGlCQUFpQixLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEYsMEdBQTBHO0lBQzFHLElBQUkscUJBQXFCLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsb0NBQW9DLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RiwwRUFBMEU7SUFDMUUsSUFBSSxZQUFZLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsb0NBQW9DLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRiwyRkFBMkY7SUFDM0YsSUFBSSxtQkFBbUIsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xHLHNGQUFzRjtJQUN0RixJQUFJLFVBQVUsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFD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