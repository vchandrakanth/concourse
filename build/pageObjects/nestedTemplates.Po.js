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
let path = require('path');
class NestedEnClaveModel {
    constructor() {
        this.getRandomNum = function (min, max) {
            return parseInt(Math.random() * (max - min) + min);
        };
    }
    get assetsManagerMenu() { return protractor_1.element(protractor_1.by.css('a[data-e2e="linkAssets"]')); }
    get createNewAssets() { return protractor_1.element(protractor_1.by.xpath('//button[contains(text(),"New Asset")]')); }
    get assetTypeDropDown() { return protractor_1.element(protractor_1.by.xpath('//*[@id="assetType"]/select')); }
    get assetEnclave() { return protractor_1.element(protractor_1.by.xpath('//option[.="Enclave"]')); }
    get enterAssetName() { return protractor_1.element(protractor_1.by.css('[placeholder="Enclave Name"]')); }
    get description() { return protractor_1.element(protractor_1.by.xpath('//textarea[@placeholder="Description"]')); }
    get ownigGroupDropDown() { return protractor_1.element(protractor_1.by.css('ng-select[data-e2e="selectAssetOwningGroup"]')); }
    owningGroup(owningGroup) { return protractor_1.element(protractor_1.by.xpath(`//span[.='${owningGroup}']`)); }
    get attributeTagDropdown() { return protractor_1.element(protractor_1.by.css('ng-select[formcontrolname="attributeTagIds"]')); }
    get selectAllAttributeTags() { return protractor_1.element(protractor_1.by.xpath('//div[.="Select All"]')); }
    attributeTag(inValue) { return protractor_1.element(protractor_1.by.xpath(`//span[.='${inValue}']`)); }
    fileName(fileName) { return `C:/Users/intone-wv/Desktop/concourse-master/${fileName}`; }
    get chooseFile() { return protractor_1.element(protractor_1.by.css('[data-e2e="fileAssetUpload"]')); }
    get chooseFile1() { return protractor_1.element(protractor_1.by.xpath('//div[@class="form-group"]')); }
    // get chooseFile1() { return element(by.css('input[multiple]')); }
    get statusDropdown() { return protractor_1.element(protractor_1.by.css('select[formcontrolname="status"]')); }
    get draft() { return protractor_1.element(protractor_1.by.xpath('//option[.="Draft"]')); }
    get published() { return protractor_1.element(protractor_1.by.xpath('//option[.="Published"]')); }
    get incrementByDropDown() { return protractor_1.element(protractor_1.by.css('select[formcontrolname="versionBump"]')); }
    get minor() { return protractor_1.element(protractor_1.by.xpath('//option[.="Minor"]')); }
    get major() { return protractor_1.element(protractor_1.by.xpath('//option[.="Major"]')); }
    get nextButton() { return protractor_1.element(protractor_1.by.xpath('//button[.="Next"]')); }
    get assetList() { return protractor_1.element(protractor_1.by.css('.datatable-body')); }
    get nextToEnclaveModelEvaluation() { return protractor_1.element(protractor_1.by.xpath('//button[.="Next"]')); }
    get nextToReviewDeployment() { return protractor_1.element(protractor_1.by.xpath('//button[.="Next"]')); }
    get submitButton() { return protractor_1.element(protractor_1.by.xpath('//button[.="Submit"]')); }
    get toast() { return protractor_1.$('#toast-container'); }
    deployment(deploymentId) { return protractor_1.element(protractor_1.by.xpath(`//span[.='${deploymentId}']`)); }
    get deleteButton() { return protractor_1.element(protractor_1.by.css('.btn-danger')); }
    get confirmDeleteButton() { return protractor_1.element(protractor_1.by.css('.delete')); }
    get logicalDeployementMenu() { return protractor_1.element(protractor_1.by.xpath('//a[.="Logical Deployments"]')); }
    searchEnclaveModel(name) { return protractor_1.element(protractor_1.by.xpath(`//span[.='${name}']`)); }
    get search() { return protractor_1.element(protractor_1.by.css('[placeholder="Search"]')); }
    get list() { return protractor_1.element(protractor_1.by.xpath('//div[@class="app-container"]')); }
    enclaveModelElement(name) { return protractor_1.element(protractor_1.by.xpath(`//datatable-body-cell[.='${name}']`)); }
    get editButton() { return protractor_1.element(protractor_1.by.css('button[title="Edit Asset"]')); }
    get surfaceDropDown() { return protractor_1.element(protractor_1.by.css('[data-e2e="surfaceSwitcherDropdown"]')); }
    // get surfaceDropDown() { return element(by.css('select')); }
    selectSurface(surface) { return protractor_1.element(protractor_1.by.xpath(`//option[contains(.,'${surface}')]`)); }
    get addNestedTemplate() { return protractor_1.element(protractor_1.by.xpath('//button[contains(.,"Add Nested Template")]')); }
    // chooseTemplate(num: string) { return element(by.css('input[xpath="1"]')); }
    chooseTemplate(num) { return protractor_1.element(protractor_1.by.css(`div.form-group > div:nth-of-type(${num}) .form-control-file`)); }
    createNestedEnclaveModel(surfaceName = null, status, assetName = null, desc = 'Default description', attributeTagName = null, fileName = null, nestedTemplateName, owningGroup = null, platform = null, num = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            // Click on Assets Manager Menu Button
            utils_1.elementClick(this.assetsManagerMenu);
            yield protractor_1.browser.logger.info('Assets Manager Menu Clicked');
            yield protractor_1.browser.sleep(2000);
            yield this.selectSurfaceFromDropDown(surfaceName);
            // Click on '+' Button to Create new Enclave Model
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.assetList, 5000, 'screen displayed');
            yield utils_1.elementClick(this.createNewAssets);
            yield protractor_1.browser.logger.info('Clicked on NEW ASSET');
            // Enter Enclave Model Name
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.enterAssetName, 5000, 'Enclave Model Name ');
            yield utils_1.elementSendkeys(this.enterAssetName, assetName);
            yield protractor_1.browser.logger.info('Asset Name Entered: ', assetName);
            // Enter Enclave Model Description
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.description, 5000, 'Enclave Model Description ');
            yield utils_1.elementSendkeys(this.description, desc);
            yield protractor_1.browser.logger.info('Description Entered: ', desc);
            // Owning Group DropDown
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.ownigGroupDropDown, 5000, 'Description ');
            yield utils_1.elementClick(this.ownigGroupDropDown);
            yield protractor_1.browser.logger.info('Ownig Group DropDown Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.owningGroup(owningGroup), 5000, 'Owning Group');
            yield utils_1.elementClick(this.owningGroup(owningGroup));
            yield protractor_1.browser.logger.info('Ownig Group Selected');
            for (let attributeTag of attributeTagName) {
                console.log('value', attributeTag);
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.attributeTagDropdown, 2000, 'Attribute Tag Drop Down  ');
                yield utils_1.elementClick(this.attributeTagDropdown);
                // Select Attribute Tag
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.attributeTag(attributeTag), 2000, 'Attribute Tag');
                yield utils_1.elementClick(this.attributeTag(attributeTag));
                yield protractor_1.browser.logger.info('Attribute Tag Selected');
            }
            yield waitHelper_1.WaitHelper.waitForElementToBeSelected(this.chooseFile, 2000, 'Choose File ');
            yield console.log(`This platform is ${process.platform}`);
            yield this.fileUpload(fileName);
            yield console.log('Cloud Formation Template Uploaded', fileName);
            yield protractor_1.browser.sleep(2000);
            for (let i = 1; i <= 4; i++) {
                yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.addNestedTemplate, 5000, 'Add Nested Template ');
                yield protractor_1.browser.actions().mouseMove(this.addNestedTemplate).perform();
                yield utils_1.elementClick(this.addNestedTemplate);
                yield console.log('Nested Template Name', nestedTemplateName[i]);
                yield protractor_1.browser.logger.info('Clicked on AddNested Template');
                yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.chooseTemplate(i), 5000, 'Choose File ');
                yield protractor_1.browser.sleep(2000);
                let linenum = i - 1;
                yield console.log('value', linenum);
                yield this.uploadNestedTemplate(nestedTemplateName[linenum], i);
            }
            // Select Status Drop Down
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.statusDropdown, 2000, 'Status Drop Down ');
            yield protractor_1.browser.actions().mouseMove(this.statusDropdown).perform();
            yield utils_1.elementClick(this.statusDropdown);
            yield protractor_1.browser.logger.info('Status Drop DOwn Selected');
            // Select Status
            if (status === 'PUBLISHED') {
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.published, 2000, 'Published ');
                yield utils_1.elementClick(this.published);
                yield protractor_1.browser.logger.info('Selected Published');
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.minor, 2000, 'Minor ');
                yield utils_1.elementClick(this.minor);
                yield protractor_1.browser.logger.info('Selected Minor');
            }
            // click on next to Template Mapping Page
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.nextButton, 5000, 'Template Mapping ');
            yield utils_1.elementClick(this.nextButton);
            yield protractor_1.browser.logger.info('Moved to Template Mapping Page');
            yield protractor_1.browser.sleep(5000);
            // click on next to Enclave Model Evaluations Page
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.nextButton, 5000, 'Enclave Model Evaluations ');
            yield utils_1.elementClick(this.nextButton);
            yield protractor_1.browser.logger.info('Moved to Review Enclave Model Page');
            yield protractor_1.browser.sleep(5000);
            //  Review Enclave Model Page
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.nextButton, 5000, 'Review Enclave Model ');
            yield utils_1.elementClick(this.nextButton);
            yield protractor_1.browser.logger.info('Moved to Submit Page');
            yield protractor_1.browser.sleep(5000);
            // Click on Submit button to submit the EnClave Model
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.submitButton, 5000, 'Submit ');
            yield protractor_1.browser.actions().mouseMove(this.submitButton).perform();
            yield utils_1.elementClick(this.submitButton);
            yield protractor_1.browser.logger.info('Nested Enclave Model Submitted');
            yield protractor_1.browser.sleep(10000);
        });
    }
    getId() {
        return __awaiter(this, void 0, void 0, function* () {
            return protractor_1.browser.getCurrentUrl().then(function (url) {
                console.log(url);
                let str = 'currentUrl';
                let entityId = [str];
                entityId = url.split('/');
                return entityId[5];
            });
        });
    }
    fileUpload(fileName = null) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileToUpload = `C:/Users/intone-wv/Desktop/e2e/src/conf/${fileName}`;
            let absolutePath = path.resolve(__dirname, fileToUpload);
            yield this.chooseFile.sendKeys(absolutePath);
        });
    }
    uploadNestedTemplate(nestedTemplate, num) {
        return __awaiter(this, void 0, void 0, function* () {
            let linenum = num - 1;
            let fileToUpload = `C:/Users/intone-wv/Desktop/e2e/src/conf/${nestedTemplate}`;
            yield console.log(fileToUpload);
            yield console.log(nestedTemplate);
            let absolutePath = path.resolve(__dirname, fileToUpload);
            yield this.chooseTemplate(num).sendKeys(absolutePath);
            yield protractor_1.browser.logger.info('Nested Template Uploaded');
        });
    }
    searchNestedEnclaveModel(surfaceName = null, assetName = null, desc = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            // Click on Assets Manager Menu Button
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.assetsManagerMenu, 5000, 'Menu');
            yield utils_1.elementClick(this.assetsManagerMenu);
            yield protractor_1.browser.logger.info('Clicked on Asset Manager Menu');
            yield this.selectSurfaceFromDropDown(surfaceName);
            utils_1.elementClear(this.search, assetName);
            // Select Created Enclave Model
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.assetList, 5000, 'Enclave Model List Displayed');
            yield this.search.sendKeys(assetName);
            yield protractor_1.browser.sleep(2000);
        });
    }
    editNestedEnclaveModel(surfaceName = null, assetName = null, desc) {
        return __awaiter(this, void 0, void 0, function* () {
            // Search the enclaveModel
            yield this.searchNestedEnclaveModel(surfaceName, assetName, desc);
            yield utils_1.elementClick(this.searchEnclaveModel(assetName));
            yield protractor_1.browser.logger.info(assetName, 'Selected');
            yield protractor_1.browser.sleep(5000);
            // Click Edit Icon
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.editButton, 5000, 'Edit Button ');
            yield protractor_1.browser.actions().mouseMove(this.editButton).perform();
            yield utils_1.elementClick(this.editButton);
            yield protractor_1.browser.logger.info('Edit Button Clicked');
            yield protractor_1.browser.sleep(5000);
            // Edit Enclave Model Name
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.enterAssetName, 5000, 'Enclave Model Name ');
            yield utils_1.elementSendkeys(this.enterAssetName, ' Updated');
            yield protractor_1.browser.logger.info('Asset Name Entered: ', assetName + ' Updated');
            // click on next to Template Mapping Page
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.nextButton, 5000, 'Template Mapping ');
            yield protractor_1.browser.actions().mouseMove(this.nextButton).perform();
            yield utils_1.elementClick(this.nextButton);
            yield protractor_1.browser.logger.info('Moved to Template Mapping Page');
            // click on next to Enclave Model Evaluations Page
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.nextButton, 5000, 'Enclave Model Evaluations ');
            yield protractor_1.browser.actions().mouseMove(this.nextButton).perform();
            yield utils_1.elementClick(this.nextButton);
            yield protractor_1.browser.logger.info('Moved to Review Enclave Model Page');
            yield protractor_1.browser.sleep(5000);
            // Review Enclave Model Page
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.nextButton, 5000, 'Review Enclave Model ');
            yield protractor_1.browser.actions().mouseMove(this.nextButton).perform();
            yield utils_1.elementClick(this.nextButton);
            yield protractor_1.browser.logger.info('Moved to Submit Page');
            yield protractor_1.browser.sleep(5000);
            // Click on Submit button to submit the EnClave Model
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.submitButton, 5000, 'Submit ');
            yield protractor_1.browser.actions().mouseMove(this.submitButton).perform();
            yield utils_1.elementClick(this.submitButton);
            yield protractor_1.browser.logger.info('Nested Enclave Model Updated', assetName + ' Updated');
        });
    }
    deleteNestedEnclaveModel(surfaceName = null, assetName = null, deleteOnly = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            utils_1.elementClick(this.assetsManagerMenu);
            yield protractor_1.browser.logger.info('Clicked on Asset Manager Menu');
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield utils_1.elementClear(this.search, assetName);
            yield protractor_1.browser.sleep(2000);
            // Select Created Enclave Model
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.assetList, 5000, 'Enclave Model List Displayed');
            if (!deleteOnly)
                assetName = assetName + ' Updated';
            yield this.search.sendKeys(assetName);
            yield utils_1.elementClick(this.searchEnclaveModel(assetName));
            yield protractor_1.browser.logger.info(assetName, 'Selected');
            yield protractor_1.browser.sleep(2000);
            // Click On Delete Button in EnclaveModel Detail Page
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.deleteButton, 5000, 'Delete Button');
            yield protractor_1.browser.actions().mouseMove(this.deleteButton).perform();
            yield utils_1.elementClick(this.deleteButton);
            yield protractor_1.browser.logger.info(assetName, 'Clicked Delete Button');
            yield protractor_1.browser.sleep(2000);
            // Click On Confirm Delete To Delete Enclave Model
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.confirmDeleteButton, 5000, 'Confirm Delete Button');
            yield protractor_1.browser.actions().mouseMove(this.confirmDeleteButton).perform();
            yield utils_1.elementClick(this.confirmDeleteButton);
            yield protractor_1.browser.logger.info(assetName, 'Deleted');
        });
    }
    verifyNestedEnclaveModel(assetName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.assetList, 5000, 'Enclave Model List Displayed');
            yield this.search.sendKeys(assetName + '  Updated');
            yield protractor_1.browser.logger.info(assetName + '  Updated', ' Is Not Present');
        });
    }
    selectSurfaceFromDropDown(surfaceName = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.surfaceDropDown, 5000, 'Surface Drop Down ');
            yield protractor_1.browser.actions().mouseMove(this.surfaceDropDown).perform();
            utils_1.elementClick(this.surfaceDropDown);
            yield protractor_1.browser.logger.info(surfaceName, 'Surface Drop Down Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.selectSurface(surfaceName), 5000, 'Surface');
            yield utils_1.elementClick(this.selectSurface(surfaceName));
            yield protractor_1.browser.logger.info('Surface Selcted');
        });
    }
    getPageTitle() {
        return __awaiter(this, void 0, void 0, function* () {
            return protractor_1.browser.getTitle();
        });
    }
}
exports.NestedEnClaveModel = NestedEnClaveModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmVzdGVkVGVtcGxhdGVzLlBvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3BhZ2VPYmplY3RzL25lc3RlZFRlbXBsYXRlcy5Qby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDJDQUFxRDtBQUNyRCwwQ0FBNkU7QUFDN0Usb0RBQWlEO0FBRWpELElBQUksZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDckQsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRTNCLE1BQWEsa0JBQWtCO0lBQS9CO1FBbUxJLGlCQUFZLEdBQUcsVUFBVSxHQUFHLEVBQUUsR0FBRztZQUM3QixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDdkQsQ0FBQyxDQUFDO0lBbUhOLENBQUM7SUF0U0csSUFBSSxpQkFBaUIsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9FLElBQUksZUFBZSxLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0YsSUFBSSxpQkFBaUIsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BGLElBQUksWUFBWSxLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekUsSUFBSSxjQUFjLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQyxD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