import { browser, element, by, $ } from 'protractor';
import { elementClick, elementSendkeys, elementClear } from '../utils/utils';
import { WaitHelper } from '../utils/waitHelper';
import { PageHelper } from '../utils/pageHelper';
let configProperties = require('../conf/properties');
let path = require('path');


export class BaseLineAsset {

    get baseLineAssetsMenu() { return element(by.css('[data-e2e="linkBaselineAssets"]')); }
    // get createNewBaseLineAssets() { return element(by.css('[data-e2e="newAssetButton"]')); }
    get createNewBaseLineAssets() { return element(by.xpath('//button[contains(text(),"New Baseline Asset")]')); }
    get enterBaseLineAssetName() { return element(by.css('[data-e2e="name"]')); }
    get description() { return element(by.css('[data-e2e="description"]')); }
    get draft() { return element(by.css('[for="draft"]')); }
    get published() { return element(by.css('[for="published"]')); }
    get minor() { return element(by.css('[for="minor"]')); }
    get major() { return element(by.css('[for="major"]')); }
    get ownigGroupDropDown() { return element(by.css('[placeholder="Select Owning Group"]')); }
    owningGroup(owningGroup: any) { return element(by.xpath(`//span[.='${owningGroup}']`)); }
    get azureCloudProvider() { return element(by.css('[for="azure"]')); }
    get accountDropDown() { return element(by.css('[formcontrolname="accountId"]')); }
    selectAccount(account: any) { return element(by.xpath(`//span[.='${account}']`)); }
    get subscriptionsDropDown() { return element(by.css('ng-select[formcontrolname="subscriptions"]')); }
    selectSubscription(subscription: any) { return element(by.xpath(`//span[.='${subscription}']`)); }
    get resourceGroupsDropDown() { return element(by.css('ng-select[formcontrolname="resourceGroups"]')); }
    selectResourceGroup(resourceGroup: any) { return element(by.xpath(`//span[.='${resourceGroup}']`)); }
    get productTypesDropDown() { return element(by.css('ng-select[bindlabel="providerName"]')); }
    selectProductType(productType: any) { return element(by.xpath(`//span[.='${productType}']`)); }
    get regionDropDown() { return element(by.css('ng-select[bindlabel="region"]')); }
    selectRegion(region: any) { return element(by.xpath(`//span[.='${region}']`)); }
    get tagsDropDown() { return element(by.css('ng-select[formcontrolname="key"]')); }
    selectTag(tag: any) { return element(by.xpath(`//span[.='${tag}']`)); }
    get tagValueDropDown() { return element(by.css('ng-select[placeholder="Value"]')); }
    selectValue(value: any) { return element(by.xpath(`//span[.='${value}']`)); }
    get attributeTagDropdown() { return element(by.css('[data-e2e="inputAssetAttributeTags"]')); }
    selectAttributeTag(inValue: string) { return element(by.xpath(`//span[.='${inValue}']`)); }
    get createButton() { return element(by.css('button[type="submit"]')); }
    get toast() { return $('#toast-container'); }
    get list() { return $('.list'); }
    get surfaceDropDown() { return element(by.css('[data-e2e="surfaceSwitcherDropdown"]')); }
    selectSurface(surface: string) { return element(by.xpath(`//option[contains(.,'${surface}')]`)); }

    async createBaseLineAsset(surfaceName: string = null, status: any, baselineAssetName: string = null, desc: any = 'Default description',
        owningGroup: string = null, accountName: string[] = null, subscription: string[] = null, resourceGroup: string[] = null,
        product: string[] = null, region: string[] = null, key: string[] = null,
        value: string[] = null, attributeTagName: string[] = null) {

        await WaitHelper.waitForElementToBeHidden(this.toast);
        // Click on BaseLine Assets Menu Button
        // await browser.get(configProperties.qaUrl + '/baseline-assets');
        await elementClick(this.baseLineAssetsMenu);
        await browser.logger.info('baseLine Assets Menu Clicked');
        await browser.sleep(2000);

        await this.selectSurfaceFromDropDown(surfaceName);

        // Click on NEW BASELINE ASSET
        await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'screen displayed');
        await elementClick(this.createNewBaseLineAssets);
        await browser.logger.info('Clicked on NEW BASELINE ASSET');

        // Enter BaseLine Asset Name
        await WaitHelper.waitForElementToBePresent(this.enterBaseLineAssetName, 5000, 'Enclave Model Name ');
        await elementSendkeys(this.enterBaseLineAssetName, baselineAssetName);
        await browser.logger.info('BaseLine Asset Name Entered: ', baselineAssetName);

        // Enter BaseLine Asset Description
        await WaitHelper.waitForElementToBePresent(this.description, 5000, 'Baseline Asset Description ');
        await elementSendkeys(this.description, desc);
        await browser.logger.info('Description Entered: ', desc);

        if (status === 'PUBLISHED') {
            await WaitHelper.waitForElementToBeClickable(this.published, 2000, 'Published ');
            await elementClick(this.published);
            await browser.logger.info('Selected Published');

            await WaitHelper.waitForElementToBeClickable(this.minor, 2000, 'Minor ');
            await elementClick(this.minor);
            await browser.logger.info('Selected Minor');
        }

        // Owning Group DropDown
        await WaitHelper.waitForElementToBePresent(this.ownigGroupDropDown, 5000, 'Ownig Group DropDown');
        await elementClick(this.ownigGroupDropDown);
        await browser.logger.info('Ownig Group DropDown Selected');

        await WaitHelper.waitForElementToBePresent(this.owningGroup(owningGroup), 5000, 'Owning Group');
        await browser.actions().mouseMove(this.owningGroup(owningGroup)).perform();
        await elementClick(this.owningGroup(owningGroup));
        await browser.logger.info('Ownig Group Selected');

        // await WaitHelper.waitForElementToBePresent(this.azureCloudProvider, 5000, 'Cloud Provider');
        // await elementClick(this.azureCloudProvider);
        // await browser.logger.info('Cloud Provider Selected');

        for (let account of accountName) {
            console.log('value', account);

            await WaitHelper.waitForElementToBeClickable(this.accountDropDown, 2000, 'Account Drop Down  ');
            await elementClick(this.accountDropDown);
            await browser.logger.info('Account Drop Down Selected');

            // Select Account
            await WaitHelper.waitForElementToBeClickable(this.selectAccount(account), 2000, 'Account');
            await browser.actions().mouseMove(this.selectAccount(account)).perform();
            await elementClick(this.selectAccount(account));
            await browser.logger.info('Account Selected');
        }

        for (let subscriptionType of subscription) {
            console.log('value', subscriptionType);

            await WaitHelper.waitForElementToBeClickable(this.subscriptionsDropDown, 2000, 'Subscription Drop Down  ');
            await elementClick(this.subscriptionsDropDown);
            await browser.logger.info('Subscription Drop Down Selected');

            // Select Subscription
            await WaitHelper.waitForElementToBeClickable(this.selectSubscription(subscriptionType), 2000, 'Subscription');
            await browser.actions().mouseMove(this.selectSubscription(subscriptionType)).perform();
            await elementClick(this.selectSubscription(subscriptionType));
            await browser.logger.info('Subscription Selected');
        }

        for (let resourceGroupName of resourceGroup) {
            console.log('value', resourceGroupName);

            await WaitHelper.waitForElementToBeClickable(this.resourceGroupsDropDown, 2000, 'Resource Groups Drop Down  ');
            await elementClick(this.resourceGroupsDropDown);
            await browser.logger.info('Resource Groups Drop Down Selected');

            // Select Subscription
            await WaitHelper.waitForElementToBeClickable(this.selectResourceGroup(resourceGroupName), 2000, 'Resource Group');
            await browser.actions().mouseMove(this.selectResourceGroup(resourceGroupName)).perform();
            await elementClick(this.selectResourceGroup(resourceGroupName));
            await browser.logger.info('Resource Group Selected');
        }

        for (let productType of product) {
            console.log('value', productType);

            await WaitHelper.waitForElementToBeClickable(this.productTypesDropDown, 2000, 'Product Types Drop Down  ');
            await elementClick(this.productTypesDropDown);
            await browser.logger.info('Product Types Drop Down Selected');

            // Select Subscription
            await WaitHelper.waitForElementToBeClickable(this.selectProductType(productType), 2000, 'Product Type');
            await browser.actions().mouseMove(this.selectProductType(productType)).perform();
            await elementClick(this.selectProductType(productType));
            await browser.logger.info('Product Type Selected');
        }

        for (let regionName of region) {
            console.log('value', regionName);

            await WaitHelper.waitForElementToBeClickable(this.regionDropDown, 2000, 'Regions Drop Down  ');
            await elementClick(this.regionDropDown);
            await browser.logger.info('Regions Drop Down Selected');

            // Select Subscription
            await WaitHelper.waitForElementToBeClickable(this.selectRegion(regionName), 2000, 'Region');
            await browser.actions().mouseMove(this.selectRegion(regionName)).perform();
            await elementClick(this.selectRegion(regionName));
            await browser.logger.info('Region Selected');
        }

        for (let regionName of region) {
            console.log('value', regionName);

            await WaitHelper.waitForElementToBeClickable(this.regionDropDown, 2000, 'Regions Drop Down  ');
            await elementClick(this.regionDropDown);
            await browser.logger.info('Regions Drop Down Selected');

            // Select Subscription
            await WaitHelper.waitForElementToBeClickable(this.selectRegion(regionName), 2000, 'Region');
            await browser.actions().mouseMove(this.selectRegion(regionName)).perform();
            await elementClick(this.selectRegion(regionName));
            await browser.logger.info('Region Selected');
        }

        for (let tagKey of key) {
            console.log('value', tagKey);

            await WaitHelper.waitForElementToBeClickable(this.tagsDropDown, 2000, 'Tags Drop Down  ');
            await elementClick(this.tagsDropDown);
            await browser.logger.info('Tags Drop Down Selected');

            // Select Subscription
            await WaitHelper.waitForElementToBeClickable(this.selectTag(tagKey), 2000, 'Tag Key');
            await browser.actions().mouseMove(this.selectTag(tagKey)).perform();
            await elementClick(this.selectTag(tagKey));
            await browser.logger.info('Tag Key Selected');
        }

        for (let tagValue of value) {
            console.log('value', tagValue);

            await WaitHelper.waitForElementToBeClickable(this.tagValueDropDown, 2000, 'Tag Value Drop Down  ');
            await elementClick(this.tagValueDropDown);
            await browser.logger.info('Tag Value Drop Down Selected');

            // Select Subscription
            await WaitHelper.waitForElementToBeClickable(this.selectTag(tagValue), 2000, 'Tag Value');
            await browser.actions().mouseMove(this.selectTag(tagValue)).perform();
            await elementClick(this.selectTag(tagValue));
            await browser.logger.info('Tag Value Selected');
        }


        for (let attributeTag of attributeTagName) {
            console.log('value', attributeTag);

            await WaitHelper.waitForElementToBeClickable(this.attributeTagDropdown, 2000, 'Attribute Tag Drop Down  ');
            await elementClick(this.attributeTagDropdown);

            // Select Role
            await WaitHelper.waitForElementToBeClickable(this.selectAttributeTag(attributeTag), 2000, 'Attribute Tag');
            await browser.actions().mouseMove(this.selectAttributeTag(attributeTag)).perform();
            await elementClick(this.selectAttributeTag(attributeTag));
            await browser.logger.info('Attribute Tag Selected');
        }


        // Click on Create button to Create the base Line Asset
        await WaitHelper.waitForElementToBeClickable(this.createButton, 5000, 'Create ');
        await elementClick(this.createButton);
        await browser.logger.info('BaseLine Asset Created');
        await browser.sleep(5000);
    }

    getRandomNum = function (min, max) {
        return parseInt(Math.random() * (max - min) + min);
    };

    async getId() {
        return await browser.getCurrentUrl().then(function (url) {
            console.log(url);
            let str = 'currentUrl';
            let entityId = [];
            entityId = url.split('/');
            return entityId[5];
        });
    }

    async selectSurfaceFromDropDown(surfaceName: string = null) {
        await WaitHelper.waitForElementToBePresent(this.surfaceDropDown, 5000, 'Surface Drop Down ');
        await elementClick(this.surfaceDropDown);
        await browser.logger.info(surfaceName, 'Surface Drop Down Clicked');

        await WaitHelper.waitForElementToBePresent(this.selectSurface(surfaceName), 5000, 'Surface');
        await elementClick(this.selectSurface(surfaceName));
        await browser.logger.info('Surface Selcted');
        await browser.sleep(2000);
    }

    async getPageTitle() {
        return browser.getTitle();
    }
}
