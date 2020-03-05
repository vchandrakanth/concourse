import { browser, element, by, $ } from 'protractor';
import { elementClick, elementSendkeys, elementClear } from '../utils/utils';
import { WaitHelper } from '../utils/waitHelper';
import { protractor } from 'protractor/built/ptor';
import { isContext } from 'vm';
let configProperties = require('../conf/properties');

export class CreateCloudAccount {
    get linkInstitutionData() { return element(by.css('[data-e2e="linkInstitutionData"]')); }
    get connectCloudAccount() { return element(by.css('a[routerlink="accounts"]')); }
    get newAWSAccount() { return element(by.xpath('//button[contains(text(),"New AWS Account")]')); }
    get awsAccountName() { return element(by.css('input[formcontrolname="name"]')); }
    get awsAccountDescription() { return element(by.css('[formcontrolname="description"]')); }
    get awsAccountId() { return element(by.css('input[formcontrolname="account"]')); }
    // get saveButton() { return $('[data-e2e="createAwsAccountButton"]'); }
    get closeButton() { return $('.close'); }

    get saveButton() { return element(by.xpath('//button[@class="btn btn-primary mt-2"][contains(.,"Save")]')); }
    get toast() { return $('#toast-container'); }
    get surfaceDropDown() { return element(by.css('[data-e2e="surfaceSwitcherDropdown"]')); }
    selectSurface(surface: string) { return element(by.xpath(`//option[contains(.,'${surface}')]`)); }
    accountGrid(account: any) { return element(by.xpath(`//section[@class='accounts-grid']/div[contains(.,'${account}')]`)); }
    verifySurface(account: any, value: any) { return element(by.xpath(`//section[@class='accounts-grid']/div[contains(.,'${account}')]//label[.='${value}']`)); }
    awsAccountEditButton(account: any) { return element(by.xpath(`//section[@class='accounts-grid']/div[contains(.,'${account}')]//button[@class='btn btn-sm btn-light']`)); }
    awsAccountDeleteButton(account: any) { return element(by.xpath(`//section[@class='accounts-grid']/div[contains(.,'${account}')]//button[@class='btn btn-sm btn-danger']`)); }
    get confirmDeleteButton() { return element(by.css('.delete')); }

    async createNewCloudAccount(name: string = null, description: any, accountId: string) {

        await WaitHelper.waitForElementToBeHidden(this.toast);
        await WaitHelper.waitForElementToBeDisplayed(this.linkInstitutionData, 3000, 'Page displayed');
        await elementClick(this.linkInstitutionData);
        await browser.logger.info('Institutions Page Displayed');

        await WaitHelper.waitForElementToBePresent(this.connectCloudAccount, 5000, 'Connect Cloud Account');
        await browser.actions().mouseMove(this.connectCloudAccount).perform();
        await elementClick(this.connectCloudAccount);
        await browser.logger.info('Connect Cloud Account Clicked');
        await browser.refresh();
        await browser.sleep(2000);

        await WaitHelper.waitForElementToBePresent(this.newAWSAccount, 5000, 'New AWS Account');
        await browser.actions().mouseMove(this.newAWSAccount).perform();
        await elementClick(this.newAWSAccount);
        await browser.logger.info('New AWS Account Clicked');

        await WaitHelper.waitForElementToBeClickable(this.awsAccountName, 2000, 'attribute tag name ');
        await elementSendkeys(this.awsAccountName, name);
        await browser.logger.info(name, 'Entered');

        // Enter Description
        await WaitHelper.waitForElementToBeClickable(this.awsAccountDescription, 2000, 'Description ');
        await elementSendkeys(this.awsAccountDescription, description);
        await browser.logger.info(description, 'Entered');

        await WaitHelper.waitForElementToBeClickable(this.awsAccountId, 2000, 'Account Id');
        await elementSendkeys(this.awsAccountId, accountId);
        await browser.logger.info(accountId, 'Entered');

        await WaitHelper.waitForElementToBeClickable(this.saveButton, 3000, 'Save ');
        await browser.actions().mouseMove(this.saveButton).perform();
        await elementClick(this.saveButton);
        await browser.logger.info('AWS Account Created');
        await console.log('AWS Account Name Is', name);
    }

    async editAWSAccount(name: string = null, description: any) {
        await WaitHelper.waitForElementToBeHidden(this.toast);
        await WaitHelper.waitForElementToBeDisplayed(this.linkInstitutionData, 3000, 'Page displayed');
        await elementClick(this.linkInstitutionData);
        await browser.logger.info('Institutions Page Displayed');

        await WaitHelper.waitForElementToBePresent(this.connectCloudAccount, 5000, 'Connect Cloud Account');
        await browser.actions().mouseMove(this.connectCloudAccount).perform();
        await elementClick(this.connectCloudAccount);
        await browser.logger.info('Connect Cloud Account Clicked');

        await WaitHelper.waitForElementToBePresent(this.awsAccountEditButton(name), 5000, 'Edit  Cloud Account');
        await browser.actions().mouseMove(this.awsAccountEditButton(name)).perform();
        await elementClick(this.awsAccountEditButton(name));
        await browser.logger.info('Edit Cloud Account Clicked');
        await browser.sleep(2000);

        await WaitHelper.waitForElementToBeClickable(this.awsAccountName, 2000, 'attribute tag name ');
        await elementSendkeys(this.awsAccountName, ' Updated');
        await browser.logger.info(name + 'Updated', 'Entered');

        // Enter Description
        await WaitHelper.waitForElementToBeClickable(this.awsAccountDescription, 2000, 'Description ');
        await elementSendkeys(this.awsAccountDescription, ' Updated');
        await browser.logger.info(description + 'Updated', 'Entered');

        await WaitHelper.waitForElementToBeClickable(this.saveButton, 10000, 'Save ');
        await browser.actions().mouseMove(this.saveButton).perform();
        await browser.sleep(10000);
        await elementClick(this.saveButton);
        await browser.logger.info('AWS Account Updated');
        await console.log('AWS Account Name Is', name);
    }


    async deleteAWSAccount(name: string = null, deleteOnly: string = null) {
        await WaitHelper.waitForElementToBeHidden(this.toast);
        await WaitHelper.waitForElementToBeDisplayed(this.linkInstitutionData, 3000, 'Page displayed');
        await elementClick(this.linkInstitutionData);
        await browser.logger.info('Institutions Page Displayed');

        await WaitHelper.waitForElementToBePresent(this.connectCloudAccount, 5000, 'Connect Cloud Account');
        await browser.actions().mouseMove(this.connectCloudAccount).perform();
        await elementClick(this.connectCloudAccount);
        await browser.logger.info('Connect Cloud Account Clicked');

        if (!deleteOnly)
            name = name + ' Updated';
        await WaitHelper.waitForElementToBePresent(this.awsAccountDeleteButton(name), 5000, 'Delete  AWS Account');
        await browser.actions().mouseMove(this.awsAccountDeleteButton(name)).perform();
        await elementClick(this.awsAccountDeleteButton(name));
        await browser.logger.info('Delete AWS Account Clicked');
        await browser.sleep(2000);

        await WaitHelper.waitForElementToBePresent(this.confirmDeleteButton, 5000, 'Confirm Delete');
        await browser.actions().mouseMove(this.confirmDeleteButton).perform();
        await elementClick(this.confirmDeleteButton);
        await browser.logger.info('AWS Account Deleted');

    }

    async selectSurfaceFromDropDown(surface: string = null) {
        await WaitHelper.waitForElementToBePresent(this.surfaceDropDown, 5000, 'Surface Drop Down ');
        await elementClick(this.surfaceDropDown);
        await browser.logger.info(name, 'Surface Drop Down Clicked');

        await WaitHelper.waitForElementToBePresent(this.selectSurface(name), 5000, 'Surface');
        await elementClick(this.selectSurface(name));
        await browser.logger.info('Surface Selcted');
    }

    getRandomNum = function (min, max) {
        return parseInt(Math.random() * (max - min) + min);
    };

    async getPageTitle() {
        return browser.getTitle();
    }
}

