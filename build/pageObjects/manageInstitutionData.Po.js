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
class InstitutionData {
    constructor() {
        this.getRandomNum = function (min, max) {
            return parseInt(Math.random() * (max - min) + min);
        };
    }
    get linkInstitutionData() { return protractor_1.element(protractor_1.by.css('[data-e2e="linkInstitutionData"]')); }
    get institutionPage() { return protractor_1.element(protractor_1.by.css('.app-container')); }
    // get institutionData() { return element(by.css('a[routerlink="data"]')); }
    get institutionData() { return protractor_1.element(protractor_1.by.xpath('//li[.="Institution Data"]')); }
    get newInstitutionData() { return protractor_1.element(protractor_1.by.css('.btn-primary')); }
    get institutionDataDropDown() { return protractor_1.element(protractor_1.by.css('ng-select[name="selectInstData"] > div > span')); }
    selectDataAccount(account) { return protractor_1.element(protractor_1.by.xpath(`//span[.='${account}']`)); }
    enterKey(value) { return protractor_1.element(protractor_1.by.css(`div[ng-reflect-name='${value}'] [placeholder='Key']`)); }
    enterValue(value) { return protractor_1.element(protractor_1.by.css(`div[ng-reflect-name='${value}'] [placeholder='Value']`)); }
    enterUrl(value) { return protractor_1.element(protractor_1.by.css(`input[ng-reflect-name='${value}']`)); }
    get enterNewValue() { return protractor_1.element(protractor_1.by.css('[placeholder="Value"]')); }
    get createButton() { return protractor_1.element(protractor_1.by.css('button.ml-auto')); }
    get addButtton() { return protractor_1.element(protractor_1.by.css('.fa-plus-circle')); }
    removeInstitutionData(num) { return protractor_1.element(protractor_1.by.css(`div[ng-reflect-name='${num}'] .btn-danger`)); }
    selectAccount(account) { return protractor_1.element(protractor_1.by.css(`[data-e2e='${account}']`)); }
    get updateData() { return protractor_1.element(protractor_1.by.css('button.ml-auto')); }
    get deleteAccountButton() { return protractor_1.element(protractor_1.by.xpath('//button[@class="btn btn-danger ng-star-inserted"]')); }
    get confirmDeleteButton() { return protractor_1.element(protractor_1.by.css('[data-e2e="confirmDeleteModalBtn"]')); }
    get surfaceDropDown() { return protractor_1.element(protractor_1.by.css('[data-e2e="surfaceSwitcherDropdown"]')); }
    selectSurface(surface) { return protractor_1.element(protractor_1.by.xpath(`//option[contains(.,'${surface}')]`)); }
    get toast() { return protractor_1.$('#toast-container'); }
    addValue(value) { return protractor_1.element(protractor_1.by.css(`div[ng-reflect-name='${value}'] > .col .btn`)); }
    addWhiteListFolder(folderNum) { return protractor_1.element(protractor_1.by.css(`div[ng-reflect-name='${folderNum}'] > .col-2 .btn-primary`)); }
    removeValue(value) { return protractor_1.element(protractor_1.by.css(`div[ng-reflect-name='${value}'] .btn`)); }
    removeWhiteListFolder(folderNum) { return protractor_1.element(protractor_1.by.css(`div[ng-reflect-name='${folderNum}'] .btn-danger`)); }
    removeNewUrl(value) { return protractor_1.element(protractor_1.by.xpath(`//div[@class='form-group ng-star-inserted']/div[${value}]//button[@class='btn btn-danger btn-sm ng-star-inserted']`)); }
    removevValueForAzure(value) { return protractor_1.element(protractor_1.by.css(`div[ng-reflect-name='${value}'] .btn-danger`)); }
    addwhitelistValue(value) { return protractor_1.element(protractor_1.by.css(`div[ng-reflect-name='${value}'] .btn-primary`)); }
    removeWhiteListValue(value) { return protractor_1.element(protractor_1.by.css(`div[ng-reflect-name='${value}'] > .col > div:nth-of-type(${value}) .btn-danger`)); }
    get dataDetailPage() { return protractor_1.element(protractor_1.by.css('.content')); }
    get dataAccountList() { return protractor_1.element(protractor_1.by.css('.list')); }
    createDataForInstitution(name = null, accountNames, value = null, dataKey = null, keyValue = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.institutionPage, 3000, 'Page displayed');
            yield utils_1.elementClick(this.linkInstitutionData);
            yield protractor_1.browser.logger.info('Institutions Page Displayed');
            yield this.selectSurfaceFromDropDown(name);
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.institutionData, 5000, 'Institution Data');
            yield protractor_1.browser.actions().mouseMove(this.institutionData).perform();
            yield utils_1.elementClick(this.institutionData);
            yield protractor_1.browser.logger.info('Institution Data Button Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.newInstitutionData, 5000, 'New Institution Data');
            yield protractor_1.browser.actions().mouseMove(this.newInstitutionData).perform();
            yield utils_1.elementClick(this.newInstitutionData);
            yield protractor_1.browser.logger.info('New Institution Data Button Clicked');
            for (let institutionDataAccount of accountNames) {
                console.log('value', institutionDataAccount);
                yield this.selectInstitutionAccount(institutionDataAccount);
            }
            if (accountNames.includes('Azure Account')) {
                yield protractor_1.browser.logger.info('Account Name' + accountNames);
                yield this.enterNewData(value);
            }
            if (accountNames.includes('Insights Urls')) {
                yield protractor_1.browser.logger.info('Account Name' + accountNames);
                yield this.enterNewData(value);
            }
            if (accountNames.includes('Azure Subscriptions')) {
                yield protractor_1.browser.logger.info('Account Name' + accountNames);
                yield this.enterData(value, dataKey, keyValue);
            }
            if (accountNames.includes('Discovered Model Owning Group Id')) {
                yield protractor_1.browser.logger.info('Account Name' + accountNames);
                yield this.enterNewData(value);
            }
            if (accountNames.includes('Network Whitelists')) {
                yield protractor_1.browser.logger.info('Account Name' + accountNames);
                yield this.enterData(value, dataKey, keyValue);
            }
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.createButton, 5000, 'Create');
            yield utils_1.elementClick(this.createButton);
            yield protractor_1.browser.sleep(2000);
        });
    }
    selectInstitutionAccount(account) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('value', account);
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.institutionDataDropDown, 5000, 'Surface Data Drop Down');
            yield protractor_1.browser.actions().mouseMove(this.institutionDataDropDown).perform();
            yield utils_1.elementClick(this.institutionDataDropDown);
            yield protractor_1.browser.logger.info('Institution Data Drop Down Button Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.selectDataAccount(account), 5000, ' Data Account');
            yield protractor_1.browser.actions().mouseMove(this.selectDataAccount(account)).perform();
            yield utils_1.elementClick(this.selectDataAccount(account));
            yield protractor_1.browser.logger.info('Institution Data Account Selected');
        });
    }
    updateValueForInstitutionData(name = null, accountNames, value = null, dataKey = null, keyValue = null, url = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield utils_1.elementClick(this.linkInstitutionData);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.institutionPage, 3000, 'Page displayed');
            yield protractor_1.browser.logger.info('Institutions Page Displayed');
            yield this.selectSurfaceFromDropDown(name);
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.institutionData, 5000, 'Institution Data');
            yield protractor_1.browser.actions().mouseMove(this.institutionData).perform();
            yield utils_1.elementClick(this.institutionData);
            yield protractor_1.browser.logger.info('Institution Data Button Clicked');
            for (let institutionDataAccount of accountNames) {
                yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.selectAccount(institutionDataAccount), 5000, 'Select Data Account');
                yield protractor_1.browser.actions().mouseMove(this.selectAccount(institutionDataAccount)).perform();
                yield utils_1.elementClick(this.selectAccount(institutionDataAccount));
                yield protractor_1.browser.logger.info('Data Account Selected');
                yield protractor_1.browser.sleep(2000);
            }
            if (accountNames.includes('Discovered Model Owning Group Id')) {
                yield protractor_1.browser.logger.info('Account Name' + accountNames);
                yield this.enterNewData(value);
            }
            if (accountNames.includes('Insights Urls')) {
                yield protractor_1.browser.logger.info('Account Name' + accountNames);
                yield this.enterNewUrl(value, url);
            }
            if (accountNames.includes('Azure Subscriptions')) {
                yield protractor_1.browser.logger.info('Account Name' + accountNames);
                yield this.enterData(value, dataKey, keyValue);
            }
            if (accountNames.includes('Network Whitelists')) {
                yield protractor_1.browser.logger.info('Account Name' + accountNames);
                yield this.enterData(value, dataKey, keyValue);
            }
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.updateData, 5000, 'Update Data');
            yield protractor_1.browser.actions().mouseMove(this.updateData).perform();
            yield utils_1.elementClick(this.updateData);
            yield protractor_1.browser.logger.info(accountNames, 'Updated');
        });
    }
    deleteValueForInstitutionData(name = null, accountNames, value = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield utils_1.elementClick(this.linkInstitutionData);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.institutionPage, 3000, 'Page displayed');
            yield protractor_1.browser.logger.info('Institutions Page Displayed');
            yield this.selectSurfaceFromDropDown(name);
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.institutionData, 5000, 'Institution Data');
            yield protractor_1.browser.actions().mouseMove(this.institutionData).perform();
            yield utils_1.elementClick(this.institutionData);
            yield protractor_1.browser.logger.info('Institution Data Button Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.selectAccount(accountNames), 5000, 'Select Data Account');
            yield protractor_1.browser.actions().mouseMove(this.selectAccount(accountNames)).perform();
            yield utils_1.elementClick(this.selectAccount(accountNames));
            yield protractor_1.browser.logger.info('Data Account Selected');
            yield protractor_1.browser.sleep(2000);
            if (accountNames.includes('Insights Urls')) {
                yield protractor_1.browser.logger.info('Account Name' + accountNames);
                yield this.removeNewUrlFromInsightUrl(value);
            }
            if (accountNames.includes('Aws Accounts')) {
                yield protractor_1.browser.logger.info('Account Name' + accountNames);
                yield this.removeDataValue(value);
            }
            if (accountNames.includes('Azure Subscriptions')) {
                yield protractor_1.browser.logger.info('Account Name' + accountNames);
                yield this.removeDataValue(value);
            }
            if (accountNames.includes('Network Whitelists')) {
                yield protractor_1.browser.logger.info('Account Name' + accountNames);
                yield this.removeWhiteListData(value);
            }
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.updateData, 5000, 'Update Data');
            yield utils_1.elementClick(this.updateData);
            yield protractor_1.browser.logger.info(accountNames, 'Updated');
            yield protractor_1.browser.sleep(2000);
        });
    }
    deleteDataAccountForInstitution(name = null, accountNames) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield utils_1.elementClick(this.linkInstitutionData);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.institutionPage, 3000, 'Page displayed');
            yield protractor_1.browser.logger.info('Institution Page Displayed');
            yield this.selectSurfaceFromDropDown(name);
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.institutionData, 5000, 'Institution Data');
            yield protractor_1.browser.actions().mouseMove(this.institutionData).perform();
            yield utils_1.elementClick(this.institutionData);
            yield protractor_1.browser.logger.info('Institution Data Button Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.selectAccount(accountNames), 5000, 'Select Data Account');
            yield protractor_1.browser.actions().mouseMove(this.selectAccount(accountNames)).perform();
            yield utils_1.elementClick(this.selectAccount(accountNames));
            yield protractor_1.browser.logger.info('Data Account Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.deleteAccountButton, 5000, 'Delete Data Account');
            yield protractor_1.browser.actions().mouseMove(this.deleteAccountButton).perform();
            yield utils_1.elementClick(this.deleteAccountButton);
            yield protractor_1.browser.logger.info('Delete Button Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.confirmDeleteButton, 5000, 'Confirm Delete');
            yield protractor_1.browser.actions().mouseMove(this.confirmDeleteButton).perform();
            yield utils_1.elementClick(this.confirmDeleteButton);
            yield protractor_1.browser.logger.info(name, 'Deleted');
            yield protractor_1.browser.sleep(2000);
        });
    }
    selectSurfaceFromDropDown(name = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.surfaceDropDown, 5000, 'Surface Drop Down ');
            yield utils_1.elementClick(this.surfaceDropDown);
            yield protractor_1.browser.logger.info(name, 'Surface Drop Down Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.selectSurface(name), 5000, 'Surface');
            yield utils_1.elementClick(this.selectSurface(name));
            yield protractor_1.browser.logger.info('Surface Selcted');
            yield protractor_1.browser.sleep(2000);
        });
    }
    enterData(value = null, dataKey = null, keyValue = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.enterKey(value), 5000, 'Data Key');
            yield utils_1.elementClick(this.enterKey(value));
            yield utils_1.elementSendkeys(this.enterKey(value), dataKey);
            yield protractor_1.browser.logger.info('Entered key ', dataKey);
            yield protractor_1.browser.sleep(2000);
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.enterValue(value), 5000, 'Data Key Value');
            yield utils_1.elementClick(this.enterValue(value));
            yield utils_1.elementSendkeys(this.enterValue(value), keyValue);
            yield protractor_1.browser.logger.info('Entered Key Value ', keyValue);
        });
    }
    enterNewData(value = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.enterNewValue, 5000, 'Value');
            yield utils_1.elementSendkeys(this.enterNewValue, value);
        });
    }
    enterNewUrl(value = null, url = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.enterUrl(value), 5000, 'Data Key Value');
            yield utils_1.elementClick(this.enterUrl(value));
            yield utils_1.elementSendkeys(this.enterUrl(value), url);
            yield protractor_1.browser.logger.info('Entered New Url ', url);
        });
    }
    removeNewUrlFromInsightUrl(value = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.removeNewUrl(value), 5000, 'New Url');
            yield protractor_1.browser.actions().mouseMove(this.removeNewUrl(value)).perform();
            yield utils_1.elementClick(this.removeNewUrl(value));
            yield protractor_1.browser.logger.info(' New Url Removed');
        });
    }
    removeDataValue(value = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.removeValue(value), 10000, 'Remove Value');
            yield protractor_1.browser.actions().mouseMove(this.removeValue(value)).perform();
            yield utils_1.elementClick(this.removeValue(value));
            yield protractor_1.browser.logger.info('Remove Value Clicked');
        });
    }
    removeWhiteListData(value = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.removeWhiteListFolder(value), 5000, 'Add Value');
            yield protractor_1.browser.actions().mouseMove(this.removeWhiteListFolder(value)).perform();
            yield utils_1.elementClick(this.removeWhiteListFolder(value));
            yield protractor_1.browser.logger.info('Remove Value Clicked');
        });
    }
    getPageTitle() {
        return __awaiter(this, void 0, void 0, function* () {
            return protractor_1.browser.getTitle();
        });
    }
}
exports.InstitutionData = InstitutionData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlSW5zdGl0dXRpb25EYXRhLlBvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3BhZ2VPYmplY3RzL21hbmFnZUluc3RpdHV0aW9uRGF0YS5Qby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDJDQUFxRDtBQUNyRCwwQ0FBNkU7QUFDN0Usb0RBQWlEO0FBQ2pELElBQUksZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFFckQsTUFBYSxlQUFlO0lBQTVCO1FBOFJJLGlCQUFZLEdBQUcsVUFBVSxHQUFHLEVBQUUsR0FBRztZQUM3QixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDdkQsQ0FBQyxDQUFDO0lBS04sQ0FBQztJQXBTRyxJQUFJLG1CQUFtQixLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekYsSUFBSSxlQUFlLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRSw0RUFBNEU7SUFDNUUsSUFBSSxlQUFlLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRixJQUFJLGtCQUFrQixLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLElBQUksdUJBQXVCLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsK0NBQStDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRyxpQkFB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