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
class BaseLineAsset {
    constructor() {
        this.getRandomNum = function (min, max) {
            return parseInt(Math.random() * (max - min) + min);
        };
    }
    get baseLineAssetsMenu() { return protractor_1.element(protractor_1.by.css('[data-e2e="linkBaselineAssets"]')); }
    // get createNewBaseLineAssets() { return element(by.css('[data-e2e="newAssetButton"]')); }
    get createNewBaseLineAssets() { return protractor_1.element(protractor_1.by.xpath('//button[contains(text(),"New Baseline Asset")]')); }
    get enterBaseLineAssetName() { return protractor_1.element(protractor_1.by.css('[data-e2e="name"]')); }
    get description() { return protractor_1.element(protractor_1.by.css('[data-e2e="description"]')); }
    get draft() { return protractor_1.element(protractor_1.by.css('[for="draft"]')); }
    get published() { return protractor_1.element(protractor_1.by.css('[for="published"]')); }
    get minor() { return protractor_1.element(protractor_1.by.css('[for="minor"]')); }
    get major() { return protractor_1.element(protractor_1.by.css('[for="major"]')); }
    get ownigGroupDropDown() { return protractor_1.element(protractor_1.by.css('[placeholder="Select Owning Group"]')); }
    owningGroup(owningGroup) { return protractor_1.element(protractor_1.by.xpath(`//span[.='${owningGroup}']`)); }
    get azureCloudProvider() { return protractor_1.element(protractor_1.by.css('[for="azure"]')); }
    get accountDropDown() { return protractor_1.element(protractor_1.by.css('[formcontrolname="accountId"]')); }
    selectAccount(account) { return protractor_1.element(protractor_1.by.xpath(`//span[.='${account}']`)); }
    get subscriptionsDropDown() { return protractor_1.element(protractor_1.by.css('ng-select[formcontrolname="subscriptions"]')); }
    selectSubscription(subscription) { return protractor_1.element(protractor_1.by.xpath(`//span[.='${subscription}']`)); }
    get resourceGroupsDropDown() { return protractor_1.element(protractor_1.by.css('ng-select[formcontrolname="resourceGroups"]')); }
    selectResourceGroup(resourceGroup) { return protractor_1.element(protractor_1.by.xpath(`//span[.='${resourceGroup}']`)); }
    get productTypesDropDown() { return protractor_1.element(protractor_1.by.css('ng-select[bindlabel="providerName"]')); }
    selectProductType(productType) { return protractor_1.element(protractor_1.by.xpath(`//span[.='${productType}']`)); }
    get regionDropDown() { return protractor_1.element(protractor_1.by.css('ng-select[bindlabel="region"]')); }
    selectRegion(region) { return protractor_1.element(protractor_1.by.xpath(`//span[.='${region}']`)); }
    get tagsDropDown() { return protractor_1.element(protractor_1.by.css('ng-select[formcontrolname="key"]')); }
    selectTag(tag) { return protractor_1.element(protractor_1.by.xpath(`//span[.='${tag}']`)); }
    get tagValueDropDown() { return protractor_1.element(protractor_1.by.css('ng-select[placeholder="Value"]')); }
    selectValue(value) { return protractor_1.element(protractor_1.by.xpath(`//span[.='${value}']`)); }
    get attributeTagDropdown() { return protractor_1.element(protractor_1.by.css('[data-e2e="inputAssetAttributeTags"]')); }
    selectAttributeTag(inValue) { return protractor_1.element(protractor_1.by.xpath(`//span[.='${inValue}']`)); }
    get createButton() { return protractor_1.element(protractor_1.by.css('button[type="submit"]')); }
    get toast() { return protractor_1.$('#toast-container'); }
    get list() { return protractor_1.$('.list'); }
    get surfaceDropDown() { return protractor_1.element(protractor_1.by.css('[data-e2e="surfaceSwitcherDropdown"]')); }
    selectSurface(surface) { return protractor_1.element(protractor_1.by.xpath(`//option[contains(.,'${surface}')]`)); }
    searchBaseLineAsset(baseline) { return protractor_1.element(protractor_1.by.css(`h5[data-e2e='${baseline}']`)); }
    get search() { return protractor_1.element(protractor_1.by.css('[placeholder="Search"]')); }
    get deleteBaselineAsset() { return protractor_1.element(protractor_1.by.css('[data-e2e="deleteAssetButton"]')); }
    get confirmDeleteButton() { return protractor_1.element(protractor_1.by.css('[data-e2e="confirmDeleteModalBtn"]')); }
    createBaseLineAsset(surfaceName = null, status, baselineAssetName = null, desc = 'Default description', owningGroup = null, accountName = null, subscription = null, resourceGroup = null, product = null, region = null, key = null, value = null, attributeTagName = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            // Click on BaseLine Assets Menu Button
            yield utils_1.elementClick(this.baseLineAssetsMenu);
            yield protractor_1.browser.logger.info('baseLine Assets Menu Clicked');
            yield protractor_1.browser.sleep(2000);
            yield this.selectSurfaceFromDropDown(surfaceName);
            // Click on NEW BASELINE ASSET
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'screen displayed');
            yield utils_1.elementClick(this.createNewBaseLineAssets);
            yield protractor_1.browser.logger.info('Clicked on NEW BASELINE ASSET');
            // Enter BaseLine Asset Name
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.enterBaseLineAssetName, 5000, 'Enclave Model Name ');
            yield utils_1.elementSendkeys(this.enterBaseLineAssetName, baselineAssetName);
            yield protractor_1.browser.logger.info('BaseLine Asset Name Entered: ', baselineAssetName);
            // Enter BaseLine Asset Description
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.description, 5000, 'Baseline Asset Description ');
            yield utils_1.elementSendkeys(this.description, desc);
            yield protractor_1.browser.logger.info('Description Entered: ', desc);
            if (status === 'PUBLISHED') {
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.published, 2000, 'Published ');
                yield utils_1.elementClick(this.published);
                yield protractor_1.browser.logger.info('Selected Published');
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.minor, 2000, 'Minor ');
                yield utils_1.elementClick(this.minor);
                yield protractor_1.browser.logger.info('Selected Minor');
            }
            // Owning Group DropDown
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.ownigGroupDropDown, 5000, 'Ownig Group DropDown');
            yield utils_1.elementClick(this.ownigGroupDropDown);
            yield protractor_1.browser.logger.info('Ownig Group DropDown Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.owningGroup(owningGroup), 5000, 'Owning Group');
            yield protractor_1.browser.actions().mouseMove(this.owningGroup(owningGroup)).perform();
            yield utils_1.elementClick(this.owningGroup(owningGroup));
            yield protractor_1.browser.logger.info('Ownig Group Selected');
            // await WaitHelper.waitForElementToBePresent(this.azureCloudProvider, 5000, 'Cloud Provider');
            // await elementClick(this.azureCloudProvider);
            // await browser.logger.info('Cloud Provider Selected');
            for (let account of accountName) {
                console.log('value', account);
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.accountDropDown, 2000, 'Account Drop Down  ');
                yield utils_1.elementClick(this.accountDropDown);
                yield protractor_1.browser.logger.info('Account Drop Down Selected');
                // Select Account
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectAccount(account), 2000, 'Account');
                yield protractor_1.browser.actions().mouseMove(this.selectAccount(account)).perform();
                yield utils_1.elementClick(this.selectAccount(account));
                yield protractor_1.browser.logger.info('Account Selected');
            }
            for (let subscriptionType of subscription) {
                console.log('value', subscriptionType);
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.subscriptionsDropDown, 2000, 'Subscription Drop Down  ');
                yield utils_1.elementClick(this.subscriptionsDropDown);
                yield protractor_1.browser.logger.info('Subscription Drop Down Selected');
                // Select Subscription
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectSubscription(subscriptionType), 2000, 'Subscription');
                yield protractor_1.browser.actions().mouseMove(this.selectSubscription(subscriptionType)).perform();
                yield utils_1.elementClick(this.selectSubscription(subscriptionType));
                yield protractor_1.browser.logger.info('Subscription Selected');
            }
            for (let resourceGroupName of resourceGroup) {
                console.log('value', resourceGroupName);
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.resourceGroupsDropDown, 2000, 'Resource Groups Drop Down  ');
                yield utils_1.elementClick(this.resourceGroupsDropDown);
                yield protractor_1.browser.logger.info('Resource Groups Drop Down Selected');
                // Select Subscription
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectResourceGroup(resourceGroupName), 2000, 'Resource Group');
                yield protractor_1.browser.actions().mouseMove(this.selectResourceGroup(resourceGroupName)).perform();
                yield utils_1.elementClick(this.selectResourceGroup(resourceGroupName));
                yield protractor_1.browser.logger.info('Resource Group Selected');
            }
            for (let productType of product) {
                console.log('value', productType);
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.productTypesDropDown, 2000, 'Product Types Drop Down  ');
                yield utils_1.elementClick(this.productTypesDropDown);
                yield protractor_1.browser.logger.info('Product Types Drop Down Selected');
                // Select Subscription
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectProductType(productType), 2000, 'Product Type');
                yield protractor_1.browser.actions().mouseMove(this.selectProductType(productType)).perform();
                yield utils_1.elementClick(this.selectProductType(productType));
                yield protractor_1.browser.logger.info('Product Type Selected');
            }
            for (let regionName of region) {
                console.log('value', regionName);
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.regionDropDown, 2000, 'Regions Drop Down  ');
                yield utils_1.elementClick(this.regionDropDown);
                yield protractor_1.browser.logger.info('Regions Drop Down Selected');
                // Select Subscription
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectRegion(regionName), 2000, 'Region');
                yield protractor_1.browser.actions().mouseMove(this.selectRegion(regionName)).perform();
                yield utils_1.elementClick(this.selectRegion(regionName));
                yield protractor_1.browser.logger.info('Region Selected');
            }
            // for (let regionName of region) {
            //     console.log('value', regionName);
            //     await WaitHelper.waitForElementToBeClickable(this.regionDropDown, 2000, 'Regions Drop Down  ');
            //     await elementClick(this.regionDropDown);
            //     await browser.logger.info('Regions Drop Down Selected');
            //     // Select Subscription
            //     await WaitHelper.waitForElementToBeClickable(this.selectRegion(regionName), 2000, 'Region');
            //     await browser.actions().mouseMove(this.selectRegion(regionName)).perform();
            //     await elementClick(this.selectRegion(regionName));
            //     await browser.logger.info('Region Selected');
            // }
            for (let tagKey of key) {
                console.log('value', tagKey);
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.tagsDropDown, 2000, 'Tags Drop Down  ');
                yield utils_1.elementClick(this.tagsDropDown);
                yield protractor_1.browser.logger.info('Tags Drop Down Selected');
                // Select Subscription
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectTag(tagKey), 2000, 'Tag Key');
                yield protractor_1.browser.actions().mouseMove(this.selectTag(tagKey)).perform();
                yield utils_1.elementClick(this.selectTag(tagKey));
                yield protractor_1.browser.logger.info('Tag Key Selected');
            }
            for (let tagValue of value) {
                console.log('value', tagValue);
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.tagValueDropDown, 2000, 'Tag Value Drop Down  ');
                yield utils_1.elementClick(this.tagValueDropDown);
                yield protractor_1.browser.logger.info('Tag Value Drop Down Selected');
                // Select Subscription
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectTag(tagValue), 2000, 'Tag Value');
                yield protractor_1.browser.actions().mouseMove(this.selectTag(tagValue)).perform();
                yield utils_1.elementClick(this.selectTag(tagValue));
                yield protractor_1.browser.logger.info('Tag Value Selected');
            }
            for (let attributeTag of attributeTagName) {
                console.log('value', attributeTag);
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.attributeTagDropdown, 2000, 'Attribute Tag Drop Down  ');
                yield utils_1.elementClick(this.attributeTagDropdown);
                // Select Role
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectAttributeTag(attributeTag), 2000, 'Attribute Tag');
                yield protractor_1.browser.actions().mouseMove(this.selectAttributeTag(attributeTag)).perform();
                yield utils_1.elementClick(this.selectAttributeTag(attributeTag));
                yield protractor_1.browser.logger.info('Attribute Tag Selected');
            }
            // Click on Create button to Create the base Line Asset
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.createButton, 5000, 'Create ');
            yield utils_1.elementClick(this.createButton);
            yield protractor_1.browser.logger.info('BaseLine Asset Created');
            yield protractor_1.browser.sleep(5000);
        });
    }
    deleteBaseLineAsset(surfaceName = null, baselineAssetName = null, deleteOnly = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            // Click on Assets Manager Menu Button
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.baseLineAssetsMenu, 5000, 'Menu');
            yield utils_1.elementClick(this.baseLineAssetsMenu);
            yield protractor_1.browser.logger.info('Clicked on BaseLine Assets Menu');
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield utils_1.elementClear(this.search, baselineAssetName);
            // Select Created BaseLine Asset
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Enclave Model List Displayed');
            if (!deleteOnly)
                baselineAssetName = baselineAssetName + '  Updated';
            yield this.search.sendKeys(baselineAssetName);
            yield utils_1.elementClick(this.searchBaseLineAsset(baselineAssetName));
            yield protractor_1.browser.logger.info(baselineAssetName, 'Selected');
            // Click On Delete Button in Base Line Asset Detail Page
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.deleteBaselineAsset, 5000, 'Delete Button');
            yield protractor_1.browser.actions().mouseMove(this.deleteBaselineAsset).perform();
            yield utils_1.elementClick(this.deleteBaselineAsset);
            yield protractor_1.browser.logger.info(baselineAssetName, 'Clicked Delete Button');
            // Click On Confirm Delete To Delete BAseline Asset
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.confirmDeleteButton, 5000, 'Confirm Delete Button');
            yield protractor_1.browser.actions().mouseMove(this.confirmDeleteButton).perform();
            yield utils_1.elementClick(this.confirmDeleteButton);
            yield protractor_1.browser.logger.info(baselineAssetName, 'Deleted');
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
        });
    }
    getId() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield protractor_1.browser.getCurrentUrl().then(function (url) {
                console.log(url);
                let str = 'currentUrl';
                let entityId = [];
                entityId = url.split('/');
                return entityId[5];
            });
        });
    }
    selectSurfaceFromDropDown(surfaceName = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.surfaceDropDown, 5000, 'Surface Drop Down ');
            yield utils_1.elementClick(this.surfaceDropDown);
            yield protractor_1.browser.logger.info(surfaceName, 'Surface Drop Down Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.selectSurface(surfaceName), 5000, 'Surface');
            yield utils_1.elementClick(this.selectSurface(surfaceName));
            yield protractor_1.browser.logger.info('Surface Selcted');
            yield protractor_1.browser.sleep(2000);
        });
    }
    searchBaseLine(surfaceName = null, name = null, description = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.actions().mouseMove(this.baseLineAssetsMenu).perform();
            yield utils_1.elementClick(this.baseLineAssetsMenu);
            yield protractor_1.browser.logger.info('BaseLine Assets Menu Clicked');
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield utils_1.elementClear(this.search, name);
            // Select Created BaseLine Asset
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'BaseLine List Displayed');
            yield this.search.sendKeys(name);
            yield protractor_1.browser.sleep(2000);
            yield utils_1.elementClick(this.searchBaseLineAsset(name));
            yield protractor_1.browser.logger.info(name, 'Selected');
        });
    }
    getPageTitle() {
        return __awaiter(this, void 0, void 0, function* () {
            return protractor_1.browser.getTitle();
        });
    }
}
exports.BaseLineAsset = BaseLineAsset;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZUxpbmVBc3NldHMuUG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcGFnZU9iamVjdHMvYmFzZUxpbmVBc3NldHMuUG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBcUQ7QUFDckQsMENBQTZFO0FBQzdFLG9EQUFpRDtBQUVqRCxJQUFJLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ3JELElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUczQixNQUFhLGFBQWE7SUFBMUI7UUFtUUksaUJBQVksR0FBRyxVQUFVLEdBQUcsRUFBRSxHQUFHO1lBQzdCLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUM7SUE2Q04sQ0FBQztJQWhURyxJQUFJLGtCQUFrQixLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkYsMkZBQTJGO0lBQzNGLElBQUksdUJBQXVCLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RyxJQUFJLHNCQUFzQixLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0UsSUFBSSxXQUFXLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RSxJQUFJLEtBQUssS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENB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