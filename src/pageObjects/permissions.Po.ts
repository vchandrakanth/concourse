import { browser, element, by, $ } from 'protractor';
import { elementClick, elementSendkeys, elementClear } from '../utils/utils';
import { WaitHelper } from '../utils/waitHelper';
import { LoginPage } from './login.Po';

let login = new LoginPage();
let configProperties = require('../conf/properties');
let properties = require('../conf/properties');

export class VerifyUserPermissions {
    createButton(verifyText: any) { return element(by.xpath(`//button[contains(text(),'${verifyText}')]`)); }
    get surfaceDropDown() { return element(by.css('select')); }
    selectSurface(surface: string) { return element(by.xpath(`//option[contains(.,'${surface}')]`)); }
    get toast() { return $('#toast-container'); }
    get search() { return element(by.css('[placeholder="Search"]')); }
    listItem(Item: any) { return element(by.xpath(`//h5[.='${Item}']`)); }
    assetListItem(Item: any) { return element(by.xpath(`//span[.='${Item}']`)); }
    get buttonEdit() { return element(by.css('.fa-edit')); }
    get buttonDelete() { return element(by.css('.btn-danger')); }
    // get uploadButton() { return element(by.css('.fa-upload')); }
    get deployButton() { return element(by.css('//a[contains(.,"Deploys 0")]')); }

    async VerifyPermissionGranted(module: any, Item: any = null) {
        await WaitHelper.waitForElementToBeHidden(this.toast);
        await browser.get(configProperties.qaUrl + `/${module}`);
        await browser.sleep(5000);

        if ((module !== 'surfaces') && (module !== 'institutions/data') && (module !== 'user-management/users')) {
            await this.search.sendKeys(Item);
            await browser.sleep(2000);
        }

        if (module === 'assets') {
            await elementClick(this.assetListItem(Item));
            await browser.logger.info(Item, 'Enclave Model Selected');
        }

        if (module === 'attribute-tags') {
            await elementClick(this.listItem(Item));
            await browser.logger.info(Item, 'Attribute Tag Selected');
        }

        if (module === 'policy-group-templates') {
            await elementClick(this.listItem(Item));
            await browser.logger.info(Item, 'Policy Group Template Selected');
        }

        if (module === 'policy-groups') {
            await elementClick(this.listItem(Item));
            await browser.logger.info(Item, 'Policy Group Selected');
        }

        if (module === 'assets') {
            await elementClick(this.listItem(Item));
            await browser.logger.info(Item, 'Enclave Model Selected');
        }

        if (module === 'surfaces') {
            await browser.logger.info('Surface Page Opened');
        }

        if (module === 'institutions/data') {
            await browser.logger.info('institutions Page Opened');
        }

        if (module === 'user-management/groups') {
            await elementClick(this.listItem(Item));
            await browser.logger.info(Item, 'group Selected');
        }

        if (module === 'institutions/users') {
            await browser.logger.info('Users Page Opened');
        }
        await browser.sleep(2000);
    }

    async VerifyPermissionNotGranted(module: any, Item: any = null) {
        await WaitHelper.waitForElementToBeHidden(this.toast);
        await browser.get(configProperties.qaUrl + `/${module}`);
        await browser.sleep(5000);
    }

    async getPageTitle() {
        return browser.getTitle();
    }
}