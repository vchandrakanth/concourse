import { browser, element, by, $ } from 'protractor';
import { elementClick, elementSendkeys, elementClear } from '../utils/utils';
import { WaitHelper } from '../utils/waitHelper';
import { PageHelper } from '../utils/pageHelper';
let configProperties = require('../conf/properties');
let path = require('path');

export class NestedEnClaveModel {

    get createNewAssets() { return element(by.xpath('//button[contains(text(),"New Asset")]')); }
    get assetTypeDropDown() { return element(by.xpath('//*[@id="assetType"]/select')); }
    get assetEnclave() { return element(by.xpath('//option[.="Enclave"]')); }
    get enterAssetName() { return element(by.css('[placeholder="Enclave Name"]')); }
    get description() { return element(by.xpath('//textarea[@placeholder="Description"]')); }
    get ownigGroupDropDown() { return element(by.css('ng-select[data-e2e="selectAssetOwningGroup"]')); }
    owningGroup(owningGroup: any) { return element(by.xpath(`//span[.='${owningGroup}']`)); }
    get attributeTagDropdown() { return element(by.css('ng-select[formcontrolname="attributeTagIds"]')); }
    get selectAllAttributeTags() { return element(by.xpath('//div[.="Select All"]')); }
    attributeTag(inValue: string) { return element(by.xpath(`//span[.='${inValue}']`)); }
    fileName(fileName: string) { return `C:/Users/intone-wv/Desktop/concourse-master/${fileName}`; }
    get chooseFile() { return element(by.css('[data-e2e="fileAssetUpload"]')); }
    get chooseFile1() { return element(by.xpath('//div[@class="form-group"]')); }
    // get chooseFile1() { return element(by.css('input[multiple]')); }
    get statusDropdown() { return element(by.css('select[formcontrolname="status"]')); }
    get draft() { return element(by.xpath('//option[.="Draft"]')); }
    get published() { return element(by.xpath('//option[.="Published"]')); }
    get incrementByDropDown() { return element(by.css('select[formcontrolname="versionBump"]')); }
    get minor() { return element(by.xpath('//option[.="Minor"]')); }
    get major() { return element(by.xpath('//option[.="Major"]')); }
    get nextButton() { return element(by.xpath('//button[.="Next"]')); }
    get assetList() { return element(by.css('.datatable-body')); }
    get nextToEnclaveModelEvaluation() { return element(by.xpath('//button[.="Next"]')); }
    get nextToReviewDeployment() { return element(by.xpath('//button[.="Next"]')); }
    get submitButton() { return element(by.xpath('//button[.="Submit"]')); }
    get toast() { return $('#toast-container'); }
    deployment(deploymentId: any) { return element(by.xpath(`//span[.='${deploymentId}']`)); }
    get deleteButton() { return element(by.css('.btn-danger')); }
    get confirmDeleteButton() { return element(by.css('.delete')); }
    get logicalDeployementMenu() { return element(by.xpath('//a[.="Logical Deployments"]')); }
    searchEnclaveModel(name: string) { return element(by.xpath(`//span[.='${name}']`)); }
    get search() { return element(by.css('[placeholder="Search"]')); }
    get list() { return element(by.xpath('//div[@class="app-container"]')); }
    enclaveModelElement(name: any) { return element(by.xpath(`//datatable-body-cell[.='${name}']`)); }
    get editButton() { return element(by.css('button[title="Edit Asset"]')); }
    get surfaceDropDown() { return element(by.css('[data-e2e="surfaceSwitcherDropdown"]')); }
    // get surfaceDropDown() { return element(by.css('select')); }
    selectSurface(topology: string) { return element(by.xpath(`//option[contains(.,'${topology}')]`)); }
    get addNestedTemplate() { return element(by.xpath('//button[contains(.,"Add Nested Template")]')); }
    chooseTemplate(num: string) { return element(by.css(`div.form-group > div:nth-of-type(${num}). form-control-file`)); }

    async createNestedEnclaveModel(status: any, assetName: string = null, desc: any = 'Default description', attributeTagName: string[] = null,
        fileName: string = null, nestedTemplateName: any[], owningGroup: string = null, platform: string = null) {

        await WaitHelper.waitForElementToBeHidden(this.toast);
        // Click on Assets Manager Menu Button
        await browser.get(configProperties.qaUrl + '/assets');
        await browser.logger.info('Assets Manager Menu Clicked');

        await WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Surface Drop Down');
        await browser.actions().mouseDown(this.surfaceDropDown).perform();
        await elementClick(this.surfaceDropDown);
        await browser.logger.info('Surface Drop Down Selected');

        await WaitHelper.waitForElementToBeClickable(this.selectSurface(configProperties.SurfaceData.surfaceName), 2000, 'E2E Topology ');
        await elementClick(this.selectSurface(configProperties.SurfaceData.surfaceName));
        await browser.logger.info('Selected E2E Topology');

        // Click on '+' Button to Create new policy
        await WaitHelper.waitForElementToBeDisplayed(this.assetList, 5000, 'screen displayed');
        await elementClick(this.createNewAssets);
        await browser.logger.info('Clicked on NEW ASSET');

        // Enter Enclave Model Name
        await WaitHelper.waitForElementToBePresent(this.enterAssetName, 5000, 'Enclave Model Name ');
        await elementSendkeys(this.enterAssetName, assetName);
        await browser.logger.info('Asset Name Entered: ', assetName);

        // Enter Enclave Model Description
        await WaitHelper.waitForElementToBePresent(this.description, 5000, 'Enclave Model Description ');
        await elementSendkeys(this.description, desc);
        await browser.logger.info('Description Entered: ', desc);

        // Owning Group DropDown
        await WaitHelper.waitForElementToBePresent(this.ownigGroupDropDown, 5000, 'Description ');
        await elementClick(this.ownigGroupDropDown);
        await browser.logger.info('Ownig Group DropDown Selected');

        await WaitHelper.waitForElementToBePresent(this.owningGroup(owningGroup), 5000, 'Owning Group');
        await elementClick(this.owningGroup(owningGroup));
        await browser.logger.info('Ownig Group Selected');

        for (let attributeTag of attributeTagName) {
            console.log('value', attributeTag);
            await WaitHelper.waitForElementToBeClickable(this.attributeTagDropdown, 2000, 'Attribute Tag Drop Down  ');
            await elementClick(this.attributeTagDropdown);
            // Select Role
            await WaitHelper.waitForElementToBeClickable(this.attributeTag(attributeTag), 2000, 'Attribute Tag');
            await elementClick(this.attributeTag(attributeTag));
            await browser.logger.info('Attribute Tag Selected');
        }

        await WaitHelper.waitForElementToBeSelected(this.chooseFile, 2000, 'Choose File ');
        await console.log(`This platform is ${process.platform}`);
        await this.fileUpload(fileName);
        await console.log('Cloud Formation Template Uploaded', fileName);
        await browser.sleep(2000);

        for (let i = 1; i <= 4; i++) {
            await WaitHelper.waitForElementToBePresent(this.addNestedTemplate, 5000, 'Add Nested Template ');
            await browser.actions().mouseMove(this.addNestedTemplate).perform();
            await elementClick(this.addNestedTemplate);
            // await browser.sleep(2000);
            await console.log('value', i);
            await console.log('Nested Template Name', nestedTemplateName[i]);
            await this.uploadNestedTemplate(nestedTemplateName[i], i);
            await browser.logger.info('Clicked on AddNested Template');
        }
        // Select Status Drop Down
        await WaitHelper.waitForElementToBeClickable(this.statusDropdown, 2000, 'Status Drop Down ');
        await browser.actions().mouseDown(this.statusDropdown).perform();
        await elementClick(this.statusDropdown);
        await browser.logger.info('Status Drop DOwn Selected');

        // Select Status
        if (status === 'PUBLISHED') {
            await WaitHelper.waitForElementToBeClickable(this.published, 2000, 'Published ');
            await elementClick(this.published);
            await browser.logger.info('Selected Published');

            await WaitHelper.waitForElementToBeClickable(this.minor, 2000, 'Minor ');
            await elementClick(this.minor);
            await browser.logger.info('Selected Minor');
        }

        // click on next to Template Mapping Page
        await WaitHelper.waitForElementToBePresent(this.nextButton, 5000, 'Template Mapping ');
        await elementClick(this.nextButton);
        await browser.logger.info('Moved to Template Mapping Page');

        // click on next to Enclave Model Evaluations Page
        await WaitHelper.waitForElementToBePresent(this.nextButton, 5000, 'Enclave Model Evaluations ');
        await elementClick(this.nextButton);
        await browser.logger.info('Moved to Review Enclave Model Page');
        await browser.sleep(3000);

        // Select Review Enclave Model Page
        await WaitHelper.waitForElementToBePresent(this.nextButton, 5000, 'Review Enclave Model ');
        await elementClick(this.nextButton);
        await browser.logger.info('Moved to Submit Page');

        // Click on Submit button to submit the EnClave Model
        await WaitHelper.waitForElementToBeClickable(this.submitButton, 5000, 'Submit ');
        await elementClick(this.submitButton);
        await browser.logger.info('Nested Enclave Model Submitted');
        await browser.sleep(4000);
    }

    async getId() {
        return browser.getCurrentUrl().then(function (url) {
            console.log(url);
            let str = 'currentUrl';
            let entityId = [str];
            entityId = url.split('/');
            return entityId[5];
        });
    }

    async fileUpload(fileName: string = null) {
        let fileToUpload = `C:/Users/intone-wv/Desktop/e2e/src/conf/${fileName}`;
        let absolutePath = path.resolve(__dirname, fileToUpload);
        await this.chooseFile.sendKeys(absolutePath);
    }

    async uploadNestedTemplate(nestedTemplateName: any[], num: any) {
        let fileToUpload = `C:/Users/intone-wv/Desktop/e2e/src/conf/${nestedTemplateName}`;
        let absolutePath = path.resolve(__dirname, fileToUpload);
        await PageHelper.uploadFile(this.chooseTemplate(num), absolutePath);
        await browser.logger.info('Nested Template Uploaded');
    }

    getRandomNum = function (min, max) {
        return parseInt(Math.random() * (max - min) + min);
    };

    async searchNestedEnclaveModel(assetName: string = null, searchOnly: string = null) {
        await WaitHelper.waitForElementToBeHidden(this.toast);
        // Click on Assets Manager Menu Button

        await browser.get(configProperties.qaUrl + '/assets');
        // await elementClick(this.assetsManagerMenu);
        await browser.logger.info('Clicked on Asset Manager Menu');

        await WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Surface Drop Down');
        await browser.actions().mouseDown(this.surfaceDropDown).perform();
        await elementClick(this.surfaceDropDown);
        await browser.logger.info('Surface Drop Down Selected');

        await WaitHelper.waitForElementToBeClickable(this.selectSurface(configProperties.SurfaceData.surfaceName), 2000, 'E2E Topology ');
        await elementClick(this.selectSurface(configProperties.SurfaceData.surfaceName));
        await browser.logger.info('Selected E2E Topology');

        await elementClear(this.search, assetName);

        // Select Created Enclave Model
        await WaitHelper.waitForElementToBeDisplayed(this.assetList, 5000, 'Enclave Model List Displayed');
        await this.search.sendKeys(assetName);
    }

    async editNestedEnclaveModel(assetName: string = null, desc) {
        // Search the enclaveModel
        await this.searchNestedEnclaveModel(assetName, desc);
        await elementClick(this.searchEnclaveModel(assetName));
        await browser.logger.info(assetName, 'Selected');
        await browser.sleep(3000);

        // Click Edit Icon
        await WaitHelper.waitForElementToBePresent(this.editButton, 5000, 'Edit Button ');
        await elementClick(this.editButton);
        await browser.logger.info('Edit Button Clicked');
        await browser.sleep(2000);

        // Edit Enclave Model Name
        await WaitHelper.waitForElementToBePresent(this.enterAssetName, 5000, 'Enclave Model Name ');
        await elementSendkeys(this.enterAssetName, '  Updated');
        await browser.logger.info('Asset Name Entered: ', assetName + '  Updated');
        await browser.sleep(2000);

        // click on next to Template Mapping Page
        await WaitHelper.waitForElementToBePresent(this.nextButton, 5000, 'Template Mapping ');
        await browser.actions().mouseDown(this.nextButton).perform();
        await elementClick(this.nextButton);
        await browser.logger.info('Moved to Template Mapping Page');
        await browser.sleep(2000);
        // click on next to Enclave Model Evaluations Page
        await WaitHelper.waitForElementToBePresent(this.nextButton, 10000, 'Enclave Model Evaluations ');
        await elementClick(this.nextButton);
        await browser.logger.info('Moved to Review Enclave Model Page');
        await browser.sleep(2000);
        // Select Review Enclave Model Page
        await WaitHelper.waitForElementToBePresent(this.nextButton, 10000, 'Review Enclave Model ');
        await elementClick(this.nextButton);
        await browser.logger.info('Moved to Submit Page');
        await browser.sleep(2000);
        // Click on Submit button to submit the EnClave Model
        await WaitHelper.waitForElementToBeClickable(this.submitButton, 5000, 'Submit ');
        await elementClick(this.submitButton);
        await browser.logger.info('Nested Enclave Model Updated', assetName + '  Updated');
    }

    async deleteNestedEnclaveModel(assetName: string = null, deleteOnly: string = null) {
        await WaitHelper.waitForElementToBeHidden(this.toast);
        // Click on Assets Manager Menu Button
        await browser.get(configProperties.qaUrl + '/assets');
        await browser.logger.info('Clicked on Asset Manager Menu');

        await WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Surface Drop Down');
        await browser.actions().mouseDown(this.surfaceDropDown).perform();
        await elementClick(this.surfaceDropDown);
        await browser.logger.info('Surface Drop Down Selected');

        await WaitHelper.waitForElementToBeClickable(this.selectSurface(configProperties.SurfaceData.surfaceName), 2000, 'E2E Topology ');
        await elementClick(this.selectSurface(configProperties.SurfaceData.surfaceName));
        await browser.logger.info('Selected E2E Topology');

        await elementClear(this.search, assetName);
        await browser.sleep(2000);

        // Select Created Enclave Model
        await WaitHelper.waitForElementToBeDisplayed(this.assetList, 5000, 'Enclave Model List Displayed');
        if (!deleteOnly)
            assetName = assetName + '  Updated';
        await this.search.sendKeys(assetName);
        await elementClick(this.searchEnclaveModel(assetName));
        await browser.logger.info(assetName, 'Selected');
        await browser.sleep(2000);

        // Click On Delete Button in EnclaveModel Detail Page
        await WaitHelper.waitForElementToBeDisplayed(this.deleteButton, 5000, 'Delete Button');
        await browser.actions().mouseMove(this.deleteButton).perform();
        await elementClick(this.deleteButton);
        await browser.logger.info(assetName, 'Clicked Delete Button');
        await browser.sleep(2000);

        // Click On Confirm Delete To Delete Enclave Model
        await WaitHelper.waitForElementToBeDisplayed(this.confirmDeleteButton, 5000, 'Confirm Delete Button');
        await browser.actions().mouseMove(this.confirmDeleteButton).perform();
        await elementClick(this.confirmDeleteButton);
        await browser.logger.info(assetName, 'Deleted');
    }

    async verifyNestedEnclaveModel(assetName: any) {
        await WaitHelper.waitForElementToBeHidden(this.toast);
        await WaitHelper.waitForElementToBeDisplayed(this.assetList, 5000, 'Enclave Model List Displayed');
        await this.search.sendKeys(assetName + '  Updated');
        await browser.logger.info(assetName + '  Updated', ' Is Not Present');
    }

    async getPageTitle() {
        return browser.getTitle();
    }
}
