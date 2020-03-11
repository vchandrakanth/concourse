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
class Surface {
    constructor() {
        this.getRandomNum = function (min, max) {
            return parseInt(Math.random() * (max - min) + min);
        };
    }
    get toast() { return protractor_1.$('#toast-container'); }
    get surfaceMenu() { return protractor_1.element(protractor_1.by.css('a[data-e2e="linkSurfaces"]')); }
    get newSurface() { return protractor_1.element(protractor_1.by.css('[data-e2e="newSurface"]')); }
    get enterSurfaceName() { return protractor_1.element(protractor_1.by.css('[data-e2e="name"]')); }
    get eneterSutfaceDescription() { return protractor_1.element(protractor_1.by.css('#description')); }
    get groupDropDown() { return protractor_1.element(protractor_1.by.xpath('//div[@class="ng-value-container"]')); }
    get enterGroupName() { return protractor_1.element(protractor_1.by.css('input[role="combobox"]')); }
    // selectGroup(group: any) { return element(by.xpath(`//span[.='${group}']`)); }
    selectGroup(group) { return protractor_1.element(protractor_1.by.xpath(`//*/div[@role="option"]//span[contains(text(),'${group}')]`)); }
    get createNewGroupChekBox() { return protractor_1.element(protractor_1.by.xpath('//span[.="Create a new group for this Surface"]')); }
    get createButton() { return protractor_1.element(protractor_1.by.css('.Create')); }
    get editSurfaceButton() { return protractor_1.element(protractor_1.by.css('button[data-e2e="editSurface"]')); }
    get saveButton() { return protractor_1.element(protractor_1.by.css('.Save')); }
    get editAllowedGroupsButton() { return protractor_1.element(protractor_1.by.css('[data-e2e="addGroupsToSurface"]')); }
    get associateGroupDropDown() { return protractor_1.element(protractor_1.by.css('[data-e2e="assignGroupsSelect"]')); }
    get surfacelist() { return protractor_1.element(protractor_1.by.css('.control-topology')); }
    get deleteButton() { return protractor_1.element(protractor_1.by.css('[data-e2e="deleteSurface"]')); }
    // get deleteButton() { return element(by.css('.btn-danger')); }
    get confirmDeleteButton() { return protractor_1.element(protractor_1.by.xpath('//button[@data-e2e="confirmDeleteModalBtn"][contains(text(),"Delete")]')); }
    // get confirmDeleteButton() { return element(by.css('[data-e2e="confirmDeleteModalBtn"]')); }
    selectsurface(name) { return protractor_1.element(protractor_1.by.xpath(`//option[contains(.,'${name}')]`)); }
    get blankClick() { return protractor_1.element(protractor_1.by.css('form')); }
    get surfaceDropDown() { return protractor_1.element(protractor_1.by.css('[data-e2e="surfaceSwitcherDropdown"]')); }
    selectSurface(surface) { return protractor_1.element(protractor_1.by.xpath(`//option[contains(.,'${surface}')]`)); }
    get manageSurfaceData() { return protractor_1.element(protractor_1.by.css('button[title="Manage Surface Data"]')); }
    get addDataButton() { return protractor_1.element(protractor_1.by.css('button[title="Manage Surface Layer Data"]')); }
    get surfaceDataDropDown() { return protractor_1.element(protractor_1.by.css('ng-select[name="selectInstData"] > div > span')); }
    selectDataAccount(account) { return protractor_1.element(protractor_1.by.xpath(`//span[.='${account}']`)); }
    enterKey(value) { return protractor_1.element(protractor_1.by.css(`div[ng-reflect-name='${value}'] [placeholder='Key']`)); }
    enterValue(value) { return protractor_1.element(protractor_1.by.css(`div[ng-reflect-name='${value}'] [placeholder='Value']`)); }
    get createDataButton() { return protractor_1.element(protractor_1.by.css('button.ml-auto')); }
    editAccountData(value) { return protractor_1.element(protractor_1.by.css(`ul.list-group > li:nth-of-type(${value}) [title='Edit Data']`)); }
    deleteAccountData(value) { return protractor_1.element(protractor_1.by.css(`ul.list-group > li:nth-of-type(${value}) .btn-danger`)); }
    get addDataValueButton() { return protractor_1.element(protractor_1.by.css('.fa-plus-circle')); }
    removeDataValueButton(value) { return protractor_1.element(protractor_1.by.css(`div[ng-reflect-name='${value}'] .btn-danger`)); }
    get updateData() { return protractor_1.element(protractor_1.by.css('button.ml-auto')); }
    get closeManageSurfaceWindow() { return protractor_1.element(protractor_1.by.css('.close')); }
    get selectSurfaceLayer() { return protractor_1.element(protractor_1.by.css('.name')); }
    get surfaceLayerManageData() { return protractor_1.element(protractor_1.by.css('button[title="Manage Surface Layer Data"]')); }
    get addDataForSurfaceLayer() { return protractor_1.element(protractor_1.by.xpath('//button[contains(.,"Add Data")]')); }
    editDataForSurfaceLayer(value) { return protractor_1.element(protractor_1.by.xpath(`//ul[@class='list-group ng-star-inserted']/li[${value}]//button[@class='btn btn-primary ng-star-inserted']`)); }
    deleteDataForSurfaceLayer(value) { return protractor_1.element(protractor_1.by.xpath(`//ul[@class='list-group ng-star-inserted']/li[${value}]//button[@class='btn btn-primary btn-danger ng-star-inserted']`)); }
    get assignAWSAccountsButton() { return protractor_1.element(protractor_1.by.css('[data-e2e="addAWSAccountsToSurface"]')); }
    get awsAccountsDropDown() { return protractor_1.element(protractor_1.by.css('[placeholder="Select Aws Account"]')); }
    selectAWSAccount(awsAccount) { return protractor_1.element(protractor_1.by.xpath(`//span[.='${awsAccount}']`)); }
    get saveAWSAccount() { return protractor_1.element(protractor_1.by.xpath('//button[@class="btn btn-primary mt-2"]')); }
    get removeAWSAccountsButton() { return protractor_1.element(protractor_1.by.css('[data-e2e="removeAWSAccountsToSurface"]')); }
    selectAWSAccountToRemove(awsAccount) { return protractor_1.element(protractor_1.by.xpath(`//span[.='${awsAccount}']`)); }
    get disableAWSAccount() { return protractor_1.element(protractor_1.by.xpath('//button[@class="btn btn-primary mt-2"]')); }
    createNewSurface(surface = null, name = null, description = null, group = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield utils_1.elementClick(this.surfaceMenu);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfacelist, 3000, 'list displayed');
            yield protractor_1.browser.logger.info('Surface Page Displayed');
            yield this.selectSurfaceFromDropDown(surface);
            // Click on '+' Button to Create new Surface
            yield utils_1.elementClick(this.newSurface);
            yield protractor_1.browser.logger.info('Clicked + Button');
            // Enter Surface Name
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.enterSurfaceName, 5000, 'Surface Name');
            yield utils_1.elementSendkeys(this.enterSurfaceName, name);
            yield protractor_1.browser.logger.info('Entered Surface Name', name);
            // Enter Surface Description
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.eneterSutfaceDescription, 5000, 'Description ');
            yield utils_1.elementSendkeys(this.eneterSutfaceDescription, description);
            yield protractor_1.browser.logger.info('Description Entered', description);
            // Select Group Drop Down
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.groupDropDown, 2000, 'Group Drop Down ');
            yield utils_1.elementClick(this.groupDropDown);
            yield protractor_1.browser.logger.info('Selected Group DropDown');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.enterGroupName, 5000, 'Group Name');
            yield utils_1.elementSendkeys(this.enterGroupName, group);
            yield protractor_1.browser.logger.info('Description Entered', group);
            // Select Group
            yield waitHelper_1.WaitHelper.waitForElement(this.selectGroup(group), 5000, 'Group ');
            yield utils_1.elementClick(this.selectGroup(group));
            yield protractor_1.browser.logger.info('Selected Group');
            // Close Group Drop Down
            yield utils_1.elementClick(this.blankClick);
            yield protractor_1.browser.logger.info('Close Group DropDown');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.createNewGroupChekBox, 2000, 'Create A New Group For This Surface');
            yield utils_1.elementClick(this.createNewGroupChekBox);
            yield protractor_1.browser.logger.info('Selected Create A New Group For This Surface Check Box');
            // Click On Create
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.createButton, 2000, 'Create ');
            yield utils_1.elementClick(this.createButton);
            yield protractor_1.browser.logger.info('Surface Created: ', name);
            yield protractor_1.browser.sleep(3000);
            yield protractor_1.browser.refresh();
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Surface Drop Down');
            yield protractor_1.browser.actions().mouseDown(this.surfaceDropDown).perform();
            yield utils_1.elementClick(this.surfaceDropDown);
            yield protractor_1.browser.logger.info('Surface Drop Down Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectSurface(name), 2000, 'E2E Surface ');
            yield utils_1.elementClick(this.selectSurface(name));
            yield protractor_1.browser.logger.info('Selected E2E Surface');
        });
    }
    editSurface(name = null, description = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield utils_1.elementClick(this.surfaceMenu);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfacelist, 3000, 'list displayed');
            yield protractor_1.browser.logger.info('Surface Page Displayed');
            yield this.selectSurfaceFromDropDown(name);
            // Click on Edit Icon
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.editSurfaceButton, 5000, 'Suface Edit ');
            yield utils_1.elementClick(this.editSurfaceButton);
            yield protractor_1.browser.logger.info('Edit Button Clicked');
            yield protractor_1.browser.sleep(3000);
            // Edit Surface Name
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.enterSurfaceName, 5000, 'Suface Name ');
            yield utils_1.elementSendkeys(this.enterSurfaceName, ' Updated');
            yield protractor_1.browser.logger.info('Suface Name Updated');
            // Click On Save
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.saveButton, 2000, 'Save ');
            yield utils_1.elementClick(this.saveButton);
            yield protractor_1.browser.logger.info('Surface Updated', name + ' Updated');
        });
    }
    deleteSurface(name = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield utils_1.elementClick(this.surfaceMenu);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfacelist, 3000, 'list displayed');
            yield protractor_1.browser.logger.info('Surface Page Displayed');
            yield this.selectSurfaceFromDropDown(name);
            // Click On Delete Button
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.deleteButton, 5000, 'Delete');
            yield protractor_1.browser.actions().mouseMove(this.deleteButton).perform();
            yield utils_1.elementClick(this.deleteButton);
            yield protractor_1.browser.logger.info('Delete Button Clicked');
            yield protractor_1.browser.sleep(2000);
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.confirmDeleteButton, 5000, 'Confirm Delete');
            yield protractor_1.browser.actions().mouseMove(this.confirmDeleteButton).perform();
            yield utils_1.elementClick(this.confirmDeleteButton);
            yield protractor_1.browser.logger.info(name, 'Deleted');
        });
    }
    verifySurface(name = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfacelist, 3000, 'list displayed');
            yield utils_1.elementClick(this.surfaceMenu);
            yield protractor_1.browser.logger.info('Surface Page Displayed');
            // Click On Surface Drop Down
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.surfaceDropDown, 5000, 'Surface Drop Down ');
            yield utils_1.elementClick(this.surfaceDropDown);
            yield protractor_1.browser.logger.info('Surface Drop Down Clicked');
            yield protractor_1.browser.logger.info(name, 'Is Not Available');
        });
    }
    createDataForSurface(name = null, account = null, value = null, dataKey = null, keyValue = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield utils_1.elementClick(this.surfaceMenu);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfacelist, 3000, 'list displayed');
            yield protractor_1.browser.logger.info('Surface Page Displayed');
            yield this.selectSurfaceFromDropDown(name);
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.manageSurfaceData, 5000, 'Manage Data');
            yield protractor_1.browser.actions().mouseMove(this.manageSurfaceData).perform();
            yield utils_1.elementClick(this.manageSurfaceData);
            yield protractor_1.browser.logger.info('Manage Data Button Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.addDataButton, 5000, 'Add Data');
            yield protractor_1.browser.actions().mouseMove(this.addDataButton).perform();
            yield utils_1.elementClick(this.addDataButton);
            yield protractor_1.browser.logger.info('Add Data Button Clicked');
            for (let accountName of account) {
                console.log('value', accountName);
                yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.surfaceDataDropDown, 5000, 'Surface Data Drop Down');
                yield protractor_1.browser.actions().mouseMove(this.surfaceDataDropDown).perform();
                yield utils_1.elementClick(this.surfaceDataDropDown);
                yield protractor_1.browser.logger.info('Surface Data Drop Down Button Clicked');
                yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.selectDataAccount(accountName), 5000, ' Data Account');
                yield protractor_1.browser.actions().mouseMove(this.selectDataAccount(accountName)).perform();
                yield utils_1.elementClick(this.selectDataAccount(accountName));
                yield protractor_1.browser.logger.info('Surface Data Account Selected');
            }
            yield this.enterData(value, dataKey, keyValue);
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.createDataButton, 5000, 'Data Key Value');
            yield utils_1.elementClick(this.createDataButton);
            yield protractor_1.browser.logger.info(dataKey, 'Created');
            yield protractor_1.browser.sleep(2000);
            yield this.closeDataWindow();
        });
    }
    editDataForSurface(name = null, account = null, value = null, dataKey = null, keyValue = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield utils_1.elementClick(this.surfaceMenu);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfacelist, 3000, 'list displayed');
            yield protractor_1.browser.logger.info('Surface Page Displayed');
            yield this.selectSurfaceFromDropDown(name);
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.manageSurfaceData, 5000, 'Manage Data');
            yield protractor_1.browser.actions().mouseMove(this.manageSurfaceData).perform();
            yield utils_1.elementClick(this.manageSurfaceData);
            yield protractor_1.browser.logger.info('Manage Data Button Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.editAccountData(account), 5000, 'Edit Data Account');
            yield protractor_1.browser.actions().mouseMove(this.editAccountData(account)).perform();
            yield utils_1.elementClick(this.editAccountData(account));
            yield protractor_1.browser.logger.info('Edit Button Clicked');
            yield this.enterData(value, dataKey, keyValue);
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.updateData, 5000, 'Update Data');
            yield utils_1.elementClick(this.updateData);
            yield protractor_1.browser.logger.info(dataKey, 'Updated');
            yield protractor_1.browser.sleep(3000);
            yield this.closeDataWindow();
        });
    }
    deleteDataAccount(name = null, account = null, value = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.get(configProperties.qaUrl + '/surfaces');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfacelist, 3000, 'list displayed');
            yield protractor_1.browser.logger.info('Surface Page Displayed');
            yield this.selectSurfaceFromDropDown(name);
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.manageSurfaceData, 5000, 'Manage Data');
            yield protractor_1.browser.actions().mouseMove(this.manageSurfaceData).perform();
            yield utils_1.elementClick(this.manageSurfaceData);
            yield protractor_1.browser.logger.info('Manage Data Button Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.deleteAccountData(value), 5000, 'Delete Data Account');
            yield protractor_1.browser.actions().mouseMove(this.deleteAccountData(value)).perform();
            yield utils_1.elementClick(this.deleteAccountData(value));
            yield protractor_1.browser.logger.info('Delete Button Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.confirmDeleteButton, 5000, 'Confirm Delete');
            yield protractor_1.browser.actions().mouseMove(this.confirmDeleteButton).perform();
            yield utils_1.elementClick(this.confirmDeleteButton);
            yield protractor_1.browser.logger.info(name, 'Deleted');
            yield protractor_1.browser.sleep(2000);
            yield this.closeDataWindow();
        });
    }
    createDataForSurfaceLayer(name = null, account = null, value = null, dataKey = null, keyValue = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield utils_1.elementClick(this.surfaceMenu);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfacelist, 3000, 'list displayed');
            yield protractor_1.browser.logger.info('Surface Page Displayed');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.selectSurfaceLayer, 5000, 'Surface Layer');
            yield protractor_1.browser.actions().mouseMove(this.selectSurfaceLayer).perform();
            yield utils_1.elementClick(this.selectSurfaceLayer);
            yield protractor_1.browser.logger.info('Surface Layer Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.surfaceLayerManageData, 5000, 'Surface Layer Manage Data');
            yield protractor_1.browser.actions().mouseMove(this.surfaceLayerManageData).perform();
            yield utils_1.elementClick(this.surfaceLayerManageData);
            yield protractor_1.browser.logger.info('Surface Layer Manage Data Button Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.addDataButton, 5000, 'Add Data');
            yield protractor_1.browser.actions().mouseMove(this.addDataButton).perform();
            yield utils_1.elementClick(this.addDataButton);
            yield protractor_1.browser.logger.info('Add Data Button Clicked');
            for (let accountName of account) {
                console.log('value', accountName);
                yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.surfaceDataDropDown, 5000, 'Surface Data Drop Down');
                yield protractor_1.browser.actions().mouseMove(this.surfaceDataDropDown).perform();
                yield utils_1.elementClick(this.surfaceDataDropDown);
                yield protractor_1.browser.logger.info('Surface Data Drop Down Button Clicked');
                yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.selectDataAccount(accountName), 5000, ' Data Account');
                yield protractor_1.browser.actions().mouseMove(this.selectDataAccount(accountName)).perform();
                yield utils_1.elementClick(this.selectDataAccount(accountName));
                yield protractor_1.browser.logger.info('Surface Data Account Selected');
            }
            yield this.enterData(value, dataKey, keyValue);
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.createDataButton, 5000, 'Data Key Value');
            yield utils_1.elementClick(this.createDataButton);
            yield protractor_1.browser.logger.info(dataKey, 'Created');
            yield protractor_1.browser.sleep(2000);
            yield this.closeDataWindow();
        });
    }
    updateDataForSurfaceLayer(name = null, account = null, value = null, dataKey = null, keyValue = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield utils_1.elementClick(this.surfaceMenu);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfacelist, 3000, 'list displayed');
            yield protractor_1.browser.logger.info('Surface Page Displayed');
            yield this.selectSurfaceFromDropDown(name);
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.selectSurfaceLayer, 5000, 'Surface Layer');
            yield protractor_1.browser.actions().mouseMove(this.selectSurfaceLayer).perform();
            yield utils_1.elementClick(this.selectSurfaceLayer);
            yield protractor_1.browser.logger.info('Surface Layer Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.surfaceLayerManageData, 5000, 'Surface Layer Manage Data');
            yield protractor_1.browser.actions().mouseMove(this.surfaceLayerManageData).perform();
            yield utils_1.elementClick(this.surfaceLayerManageData);
            yield protractor_1.browser.logger.info('Surface Layer Manage Data Button Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.editDataForSurfaceLayer(account), 5000, 'Edit Data Account');
            yield protractor_1.browser.actions().mouseMove(this.editDataForSurfaceLayer(account)).perform();
            yield utils_1.elementClick(this.editDataForSurfaceLayer(account));
            yield protractor_1.browser.logger.info('Edit Button Clicked');
            yield this.enterData(value, dataKey, keyValue);
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.updateData, 5000, 'Update Data');
            yield utils_1.elementClick(this.updateData);
            yield protractor_1.browser.logger.info(dataKey, 'Updated');
            yield protractor_1.browser.sleep(3000);
            yield this.closeDataWindow();
        });
    }
    deleteDataAccountForSurfaceLayer(name = null, account = null, value = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.get(configProperties.qaUrl + '/surfaces');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfacelist, 3000, 'list displayed');
            yield protractor_1.browser.logger.info('Surface Page Displayed');
            yield this.selectSurfaceFromDropDown(name);
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.surfaceLayerManageData, 5000, 'Surface Layer Manage Data');
            yield protractor_1.browser.actions().mouseMove(this.surfaceLayerManageData).perform();
            yield utils_1.elementClick(this.surfaceLayerManageData);
            yield protractor_1.browser.logger.info('Surface Layer Manage Data Button Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.deleteAccountData(value), 5000, 'Delete Data Account');
            yield protractor_1.browser.actions().mouseMove(this.deleteAccountData(value)).perform();
            yield utils_1.elementClick(this.deleteAccountData(value));
            yield protractor_1.browser.logger.info('Delete Button Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.confirmDeleteButton, 5000, 'Confirm Delete');
            yield protractor_1.browser.actions().mouseMove(this.confirmDeleteButton).perform();
            yield utils_1.elementClick(this.confirmDeleteButton);
            yield protractor_1.browser.logger.info(name, 'Deleted');
            yield protractor_1.browser.sleep(2000);
            yield this.closeDataWindow();
        });
    }
    selectSurfaceFromDropDown(name = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.surfaceDropDown, 5000, 'Surface Drop Down ');
            yield utils_1.elementClick(this.surfaceDropDown);
            yield protractor_1.browser.logger.info(name, 'Surface Drop Down Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.selectsurface(name), 5000, 'Surface');
            yield utils_1.elementClick(this.selectsurface(name));
            yield protractor_1.browser.logger.info('Surface Selcted');
            yield protractor_1.browser.sleep(2000);
        });
    }
    enterData(value = null, dataKey = null, keyValue = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.enterKey(value), 5000, 'Data Key');
            yield utils_1.elementSendkeys(this.enterKey(value), dataKey);
            yield protractor_1.browser.logger.info('Entered key ', dataKey);
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.enterValue(value), 5000, 'Data Key Value');
            yield utils_1.elementSendkeys(this.enterValue(value), keyValue);
            yield protractor_1.browser.logger.info('Entered Key Value ', keyValue);
        });
    }
    closeDataWindow() {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.closeManageSurfaceWindow, 5000, 'Close');
            yield protractor_1.browser.actions().mouseMove(this.closeManageSurfaceWindow).perform();
            yield utils_1.elementClick(this.closeManageSurfaceWindow);
            yield protractor_1.browser.logger.info('Manage Surface Window Closed');
        });
    }
    assignAWSAccountsToSurface(name = null, awsAccount = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield utils_1.elementClick(this.surfaceMenu);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfacelist, 3000, 'list displayed');
            yield protractor_1.browser.logger.info('Surface Page Displayed');
            yield this.selectSurfaceFromDropDown(name);
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.surfaceMenu, 5000, 'Surface Menu');
            yield protractor_1.browser.actions().mouseMove(this.surfaceMenu).perform();
            yield utils_1.elementClick(this.surfaceMenu);
            yield protractor_1.browser.logger.info('Surface Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.assignAWSAccountsButton, 5000, 'Assign AWS Account');
            yield protractor_1.browser.actions().mouseMove(this.assignAWSAccountsButton).perform();
            yield utils_1.elementClick(this.assignAWSAccountsButton);
            yield protractor_1.browser.logger.info('Assign AWS Account Button Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.awsAccountsDropDown, 5000, 'AWS Accounts Drop Down');
            yield protractor_1.browser.actions().mouseMove(this.awsAccountsDropDown).perform();
            yield utils_1.elementClick(this.awsAccountsDropDown);
            yield protractor_1.browser.logger.info('AWS Accounts Drop Down Button Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.selectAWSAccount(awsAccount), 5000, 'AWS Account');
            yield protractor_1.browser.actions().mouseMove(this.selectAWSAccount(awsAccount)).perform();
            yield utils_1.elementClick(this.selectAWSAccount(awsAccount));
            yield protractor_1.browser.logger.info('AWS Account Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.saveAWSAccount, 5000, ' Save AWS Account');
            yield protractor_1.browser.actions().mouseMove(this.saveAWSAccount).perform();
            yield utils_1.elementClick(this.saveAWSAccount);
            yield protractor_1.browser.logger.info('Save');
        });
    }
    removeAWSAccountsFromSurface(name = null, awsAccount = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield utils_1.elementClick(this.surfaceMenu);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfacelist, 3000, 'list displayed');
            yield protractor_1.browser.logger.info('Surface Page Displayed');
            yield this.selectSurfaceFromDropDown(name);
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.surfaceMenu, 5000, 'Surface Menu');
            yield protractor_1.browser.actions().mouseMove(this.surfaceMenu).perform();
            yield utils_1.elementClick(this.surfaceMenu);
            yield protractor_1.browser.logger.info('Surface Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.removeAWSAccountsButton, 5000, 'Remove AWS Account');
            yield protractor_1.browser.actions().mouseMove(this.removeAWSAccountsButton).perform();
            yield utils_1.elementClick(this.removeAWSAccountsButton);
            yield protractor_1.browser.logger.info('Remove AWS Account Button Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.awsAccountsDropDown, 5000, 'AWS Accounts Drop Down');
            yield protractor_1.browser.actions().mouseMove(this.awsAccountsDropDown).perform();
            yield utils_1.elementClick(this.awsAccountsDropDown);
            yield protractor_1.browser.logger.info('AWS Accounts Drop Down Button Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.selectAWSAccount(awsAccount), 5000, 'AWS Account');
            yield protractor_1.browser.actions().mouseMove(this.selectAWSAccount(awsAccount)).perform();
            yield utils_1.elementClick(this.selectAWSAccount(awsAccount));
            yield protractor_1.browser.logger.info('AWS Account Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.disableAWSAccount, 5000, 'Disable AWS Account');
            yield protractor_1.browser.actions().mouseMove(this.disableAWSAccount).perform();
            yield utils_1.elementClick(this.disableAWSAccount);
            yield protractor_1.browser.logger.info('Disable');
        });
    }
    getPageTitle() {
        return __awaiter(this, void 0, void 0, function* () {
            return protractor_1.browser.getTitle();
        });
    }
}
exports.Surface = Surface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VyZmFjZXMuUG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcGFnZU9iamVjdHMvc3VyZmFjZXMuUG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJDQUFxRDtBQUNyRCwwQ0FBNkU7QUFDN0Usb0RBQWlEO0FBQ2pELElBQUksZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFFckQsTUFBYSxPQUFPO0lBQXBCO1FBbWVJLGlCQUFZLEdBQUcsVUFBVSxHQUFHLEVBQUUsR0FBRztZQUM3QixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDdkQsQ0FBQyxDQUFDO0lBS04sQ0FBQztJQXhlRyxJQUFJLEtBQUssS0FBSyxPQUFPLGNBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3QyxJQUFJLFdBQVcsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNFLElBQUksVUFBVSxLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkUsSUFBSSxnQkFBZ0IsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLElBQUksd0JBQXdCLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUUsSUFBSSxhQUFhLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQyxDQUFD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