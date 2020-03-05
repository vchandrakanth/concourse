import { browser, element, by, $ } from 'protractor';
import { elementClick, elementSendkeys, elementClear } from '../utils/utils';
import { WaitHelper } from '../utils/waitHelper';
let configProperties = require('../conf/properties');

export class InstitutionData {
    get linkInstitutionData() { return element(by.css('[data-e2e="linkInstitutionData"]')); }
    get institutionPage() { return element(by.css('.app-container')); }
    // get institutionData() { return element(by.css('a[routerlink="data"]')); }
    get institutionData() { return element(by.xpath('//li[.="Institution Data"]')); }
    get newInstitutionData() { return element(by.css('.btn-primary')); }
    get institutionDataDropDown() { return element(by.css('ng-select[name="selectInstData"] > div > span')); }
    selectDataAccount(account: any) { return element(by.xpath(`//span[.='${account}']`)); }
    enterKey(value: any) { return element(by.css(`div[ng-reflect-name='${value}'] [placeholder='Key']`)); }
    enterValue(value: any) { return element(by.css(`div[ng-reflect-name='${value}'] [placeholder='Value']`)); }
    enterUrl(value: any) { return element(by.css(`input[ng-reflect-name='${value}']`)); }
    get enterNewValue() { return element(by.css('[placeholder="Value"]')); }
    get createButton() { return element(by.css('button.ml-auto')); }
    get addButtton() { return element(by.css('.fa-plus-circle')); }
    removeInstitutionData(num: any) { return element(by.css(`div[ng-reflect-name='${num}'] .btn-danger`)); }
    selectAccount(account: any) { return element(by.css(`[data-e2e='${account}']`)); }
    get updateData() { return element(by.css('button.ml-auto')); }
    get deleteAccountButton() { return element(by.xpath('//button[@class="btn btn-danger ng-star-inserted"]')); }
    get confirmDeleteButton() { return element(by.css('[data-e2e="confirmDeleteModalBtn"]')); }
    get surfaceDropDown() { return element(by.css('[data-e2e="surfaceSwitcherDropdown"]')); }
    selectSurface(surface: string) { return element(by.xpath(`//option[contains(.,'${surface}')]`)); }
    get toast() { return $('#toast-container'); }
    addValue(value: any) { return element(by.css(`div[ng-reflect-name='${value}'] > .col .btn`)); }
    addWhiteListFolder(folderNum: any) { return element(by.css(`div[ng-reflect-name='${folderNum}'] > .col-2 .btn-primary`)); }
    removeValue(value: any) { return element(by.css(`div[ng-reflect-name='${value}'] .btn`)); }
    removeWhiteListFolder(folderNum: any) { return element(by.css(`div[ng-reflect-name='${folderNum}'] .btn-danger`)); }
    removeNewUrl(value: any) { return element(by.xpath(`//div[@class='form-group ng-star-inserted']/div[${value}]//button[@class='btn btn-danger btn-sm ng-star-inserted']`)); }
    removevValueForAzure(value: any) { return element(by.css(`div[ng-reflect-name='${value}'] .btn-danger`)); }
    addwhitelistValue(value: any) { return element(by.css(`div[ng-reflect-name='${value}'] .btn-primary`)); }
    removeWhiteListValue(value: any) { return element(by.css(`div[ng-reflect-name='${value}'] > .col > div:nth-of-type(${value}) .btn-danger`)); }
    get dataDetailPage() { return element(by.css('.content')); }
    get dataAccountList() { return element(by.css('.list')); }

    async createDataForInstitution(name: string = null, accountNames: string[], value: any = null, dataKey: string = null,
        keyValue: string = null) {

        await WaitHelper.waitForElementToBeHidden(this.toast);
        await WaitHelper.waitForElementToBeDisplayed(this.institutionPage, 3000, 'Page displayed');
        await elementClick(this.linkInstitutionData);
        await browser.logger.info('Institutions Page Displayed');

        await this.selectSurfaceFromDropDown(name);

        await WaitHelper.waitForElementToBePresent(this.institutionData, 5000, 'Institution Data');
        await browser.actions().mouseMove(this.institutionData).perform();
        await elementClick(this.institutionData);
        await browser.logger.info('Institution Data Button Clicked');

        await WaitHelper.waitForElementToBePresent(this.newInstitutionData, 5000, 'New Institution Data');
        await browser.actions().mouseMove(this.newInstitutionData).perform();
        await elementClick(this.newInstitutionData);
        await browser.logger.info('New Institution Data Button Clicked');

        for (let institutionDataAccount of accountNames) {
            console.log('value', institutionDataAccount);
            await this.selectInstitutionAccount(institutionDataAccount);
        }

        if (accountNames.includes('Azure Account')) {
            await browser.logger.info('Account Name' + accountNames);
            await this.enterNewData(value);
        }

        if (accountNames.includes('Insights Urls')) {
            await browser.logger.info('Account Name' + accountNames);
            await this.enterNewData(value);
        }

        if (accountNames.includes('Azure Subscriptions')) {
            await browser.logger.info('Account Name' + accountNames);
            await this.enterData(value, dataKey, keyValue);
        }

        if (accountNames.includes('Discovered Model Owning Group Id')) {
            await browser.logger.info('Account Name' + accountNames);
            await this.enterNewData(value);
        }

        if (accountNames.includes('Network Whitelists')) {
            await browser.logger.info('Account Name' + accountNames);
            await this.enterData(value, dataKey, keyValue);
        }

        await WaitHelper.waitForElementToBePresent(this.createButton, 5000, 'Create');
        await elementClick(this.createButton);
        await browser.sleep(2000);
    }

    async selectInstitutionAccount(account: any) {
        console.log('value', account);

        await WaitHelper.waitForElementToBePresent(this.institutionDataDropDown, 5000, 'Surface Data Drop Down');
        await browser.actions().mouseMove(this.institutionDataDropDown).perform();
        await elementClick(this.institutionDataDropDown);
        await browser.logger.info('Institution Data Drop Down Button Clicked');

        await WaitHelper.waitForElementToBePresent(this.selectDataAccount(account), 5000, ' Data Account');
        await browser.actions().mouseMove(this.selectDataAccount(account)).perform();
        await elementClick(this.selectDataAccount(account));
        await browser.logger.info('Institution Data Account Selected');
    }

    async updateValueForInstitutionData(name: string = null, accountNames: string[], value: any = null,
        dataKey: string = null, keyValue: string = null, url: any = null) {

        await WaitHelper.waitForElementToBeHidden(this.toast);

        await elementClick(this.linkInstitutionData);
        await WaitHelper.waitForElementToBeDisplayed(this.institutionPage, 3000, 'Page displayed');
        await browser.logger.info('Institutions Page Displayed');

        await this.selectSurfaceFromDropDown(name);

        await WaitHelper.waitForElementToBePresent(this.institutionData, 5000, 'Institution Data');
        await browser.actions().mouseMove(this.institutionData).perform();
        await elementClick(this.institutionData);
        await browser.logger.info('Institution Data Button Clicked');

        for (let institutionDataAccount of accountNames) {
            await WaitHelper.waitForElementToBePresent(this.selectAccount(institutionDataAccount), 5000, 'Select Data Account');
            await browser.actions().mouseMove(this.selectAccount(institutionDataAccount)).perform();
            await elementClick(this.selectAccount(institutionDataAccount));
            await browser.logger.info('Data Account Selected');
            await browser.sleep(2000);
        }

        if (accountNames.includes('Discovered Model Owning Group Id')) {
            await browser.logger.info('Account Name' + accountNames);
            await this.enterNewData(value);
        }

        if (accountNames.includes('Insights Urls')) {
            await browser.logger.info('Account Name' + accountNames);
            await this.enterNewUrl(value, url);
        }

        if (accountNames.includes('Azure Subscriptions')) {
            await browser.logger.info('Account Name' + accountNames);
            await this.enterData(value, dataKey, keyValue);
        }

        if (accountNames.includes('Network Whitelists')) {
            await browser.logger.info('Account Name' + accountNames);
            await this.enterData(value, dataKey, keyValue);
        }

        await WaitHelper.waitForElementToBePresent(this.updateData, 5000, 'Update Data');
        await browser.actions().mouseMove(this.updateData).perform();
        await elementClick(this.updateData);
        await browser.logger.info(accountNames, 'Updated');
    }

    async deleteValueForInstitutionData(name: string = null, accountNames: string[], value: any = null) {

        await WaitHelper.waitForElementToBeHidden(this.toast);

        await elementClick(this.linkInstitutionData);
        await WaitHelper.waitForElementToBeDisplayed(this.institutionPage, 3000, 'Page displayed');
        await browser.logger.info('Institutions Page Displayed');

        await this.selectSurfaceFromDropDown(name);

        await WaitHelper.waitForElementToBePresent(this.institutionData, 5000, 'Institution Data');
        await browser.actions().mouseMove(this.institutionData).perform();
        await elementClick(this.institutionData);
        await browser.logger.info('Institution Data Button Clicked');

        await WaitHelper.waitForElementToBePresent(this.selectAccount(accountNames), 5000, 'Select Data Account');
        await browser.actions().mouseMove(this.selectAccount(accountNames)).perform();
        await elementClick(this.selectAccount(accountNames));
        await browser.logger.info('Data Account Selected');

        await browser.sleep(2000);

        if (accountNames.includes('Insights Urls')) {
            await browser.logger.info('Account Name' + accountNames);
            await this.removeNewUrlFromInsightUrl(value);
        }

        if (accountNames.includes('Aws Accounts')) {
            await browser.logger.info('Account Name' + accountNames);
            await this.removeDataValue(value);
        }

        if (accountNames.includes('Azure Subscriptions')) {
            await browser.logger.info('Account Name' + accountNames);
            await this.removeDataValue(value);
        }

        if (accountNames.includes('Network Whitelists')) {
            await browser.logger.info('Account Name' + accountNames);
            await this.removeWhiteListData(value);
        }

        await WaitHelper.waitForElementToBePresent(this.updateData, 5000, 'Update Data');
        await elementClick(this.updateData);
        await browser.logger.info(accountNames, 'Updated');
        await browser.sleep(2000);
    }

    async deleteDataAccountForInstitution(name: string = null, accountNames: string[]) {
        await WaitHelper.waitForElementToBeHidden(this.toast);
        await elementClick(this.linkInstitutionData);
        await WaitHelper.waitForElementToBeDisplayed(this.institutionPage, 3000, 'Page displayed');
        await browser.logger.info('Institution Page Displayed');

        await this.selectSurfaceFromDropDown(name);

        await WaitHelper.waitForElementToBePresent(this.institutionData, 5000, 'Institution Data');
        await browser.actions().mouseMove(this.institutionData).perform();
        await elementClick(this.institutionData);
        await browser.logger.info('Institution Data Button Clicked');

        await WaitHelper.waitForElementToBePresent(this.selectAccount(accountNames), 5000, 'Select Data Account');
        await browser.actions().mouseMove(this.selectAccount(accountNames)).perform();
        await elementClick(this.selectAccount(accountNames));
        await browser.logger.info('Data Account Selected');

        await WaitHelper.waitForElementToBePresent(this.deleteAccountButton, 5000, 'Delete Data Account');
        await browser.actions().mouseMove(this.deleteAccountButton).perform();
        await elementClick(this.deleteAccountButton);
        await browser.logger.info('Delete Button Clicked');

        await WaitHelper.waitForElementToBePresent(this.confirmDeleteButton, 5000, 'Confirm Delete');
        await browser.actions().mouseMove(this.confirmDeleteButton).perform();
        await elementClick(this.confirmDeleteButton);
        await browser.logger.info(name, 'Deleted');
        await browser.sleep(2000);
    }

    async selectSurfaceFromDropDown(name: string = null) {
        await WaitHelper.waitForElementToBePresent(this.surfaceDropDown, 5000, 'Surface Drop Down ');
        await elementClick(this.surfaceDropDown);
        await browser.logger.info(name, 'Surface Drop Down Clicked');

        await WaitHelper.waitForElementToBePresent(this.selectSurface(name), 5000, 'Surface');
        await elementClick(this.selectSurface(name));
        await browser.logger.info('Surface Selcted');
        await browser.sleep(2000);
    }

    async enterData(value: any = null, dataKey: string = null, keyValue: string = null) {
        await WaitHelper.waitForElementToBePresent(this.enterKey(value), 5000, 'Data Key');
        await elementClick(this.enterKey(value));
        await elementSendkeys(this.enterKey(value), dataKey);
        await browser.logger.info('Entered key ', dataKey);
        await browser.sleep(2000);

        await WaitHelper.waitForElementToBePresent(this.enterValue(value), 5000, 'Data Key Value');
        await elementClick(this.enterValue(value));
        await elementSendkeys(this.enterValue(value), keyValue);
        await browser.logger.info('Entered Key Value ', keyValue);
    }

    async enterNewData(value: any = null) {
        await WaitHelper.waitForElementToBePresent(this.enterNewValue, 5000, 'Value');
        await elementSendkeys(this.enterNewValue, value);
    }

    async enterNewUrl(value: any = null, url: string = null) {
        await WaitHelper.waitForElementToBePresent(this.enterUrl(value), 5000, 'Data Key Value');
        await elementClick(this.enterUrl(value));
        await elementSendkeys(this.enterUrl(value), url);
        await browser.logger.info('Entered New Url ', url);
    }

    async removeNewUrlFromInsightUrl(value: any = null) {
        await WaitHelper.waitForElementToBePresent(this.removeNewUrl(value), 5000, 'New Url');
        await browser.actions().mouseMove(this.removeNewUrl(value)).perform();
        await elementClick(this.removeNewUrl(value));
        await browser.logger.info(' New Url Removed');
    }

    async removeDataValue(value: any = null) {
        await WaitHelper.waitForElementToBePresent(this.removeValue(value), 10000, 'Remove Value');
        await browser.actions().mouseMove(this.removeValue(value)).perform();
        await elementClick(this.removeValue(value));
        await browser.logger.info('Remove Value Clicked');
    }

    async removeWhiteListData(value: any = null) {
        await WaitHelper.waitForElementToBePresent(this.removeWhiteListFolder(value), 5000, 'Add Value');
        await browser.actions().mouseMove(this.removeWhiteListFolder(value)).perform();
        await elementClick(this.removeWhiteListFolder(value));
        await browser.logger.info('Remove Value Clicked');
    }
    getRandomNum = function (min, max) {
        return parseInt(Math.random() * (max - min) + min);
    };

    async getPageTitle() {
        return browser.getTitle();
    }
}

