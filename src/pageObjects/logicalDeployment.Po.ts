import { browser, element, by, $ } from 'protractor';
import { elementClick, elementSendkeys, elementClear } from '../utils/utils';
import { WaitHelper } from '../utils/waitHelper';
import { ElementHelper } from '../utils/elementHelper';
let configProperties = require('../conf/properties');

export class LogicalDeployment {

    get assetsManagerMenu() { return element(by.css('a[data-e2e="linkAssets"]')); }
    get logicalDeploymentsMenu() { return element(by.css('a[data-e2e="linkLogicalDeployments"]')); }
    searchEnclaveModel(assetName: string) { return element(by.xpath(`//span[.='${assetName}']`)); }
    get search() { return element(by.css('[placeholder="Search"]')); }
    get assetList() { return element(by.xpath('//datatable-body[@class="datatable-body"]')); }
    get selectModel() { return element(by.xpath('//span[.="properties.enclaveModelData.deploymentModelName"]')); }
    get deployTab() { return element(by.css('li.deploys-tab')); }
    get triggerLogicalDeployment() { return element(by.css('button[title="Deploy Asset"]')); }
    get enterDeploymentName() { return element(by.css('[placeholder="Deployment Name"]')); }
    get enterStackName() { return element(by.css('[placeholder="Stack Name"]')); }
    get cloudRegionDropDown() { return element(by.css('ng-select[formcontrolname="cloudRegion"]')); }
    selectCloudRegion(region: any) { return element(by.xpath(`//span[.='${region}']`)); }
    slectSurfaceLayer(SurfaceLayer: any) { return element(by.xpath(`//label[.='${SurfaceLayer}']`)); }
    get cloudAccountDropDown() { return element(by.css('ng-select[formcontrolname="cloudAccount"]')); }
    selectCloudAccount(account: any) { return element(by.xpath(`//span[.='${account}']`)); }
    get nextToEnclaveModelEvaluation() { return element(by.xpath('//button[.="Next"]')); }
    get nextToReviewDeployment() { return element(by.xpath('//button[.="Next"]')); }
    get submitButton() { return element(by.xpath('//button[.="Submit"]')); }
    get toast() { return $('#toast-container'); }
    get list() { return element(by.css('.datatable-body')); }
    get scrollBar() { return element(by.css('.bootstrap')); }
    searchDeployment(deploymentId: any) { return element(by.xpath(`//datatable-body-cell[.='${deploymentId}']`)); }
    logicalDeployment(deploymentId: any) { return element(by.css(`span[title='${deploymentId}']`)); }
    get deleteButton() { return element(by.css('.btn-danger')); }
    get confirmDeleteButton() { return element(by.css('.delete')); }
    get logicalDeployementMenu() { return element(by.xpath('//a[contains(.,"Logical Deployments")]')); }
    get surfaceDropDown() { return element(by.css('select')); }
    selectSurface(surface: string) { return element(by.xpath(`//option[contains(.,'${surface}')]`)); }
    logicalDeployementElement(deploymentName: any) { return element(by.css(`span[title='${deploymentName}']`)); }
    get risklist() { return element(by.xpath('//datatable-body[@class="datatable-body"]')); }
    get lastPage() { return element(by.xpath('//i[@class="datatable-icon-skip"]')); }
    deploysTab(count: any) { return element(by.xpath(`//a[contains(.,'Deploys ${count}')]`)); }
    get updateDeploymentButton() { return element(by.css('[data-e2e="changeDeploymentVersion"]')); }
    get versionDropDown() { return element(by.css('[placeholder="Select a different version"]')); }
    selectVersion(assetName: any, version: any) { return element(by.xpath(`//span[contains(.,'${(assetName) + (version)}')]`)); }
    get nextButton() { return element(by.xpath('//button[.="Next"]')); }
    get logicalDeploymentList() { return element(by.css('.app-container')); }

    async newlogicalDeployment(surfaceName: string = null, assetName: string = null,
        deploymentName: string = null, stackName: string = null, region: string = null,
        SurfaceLayer: string = null, account: string = null) {

        await WaitHelper.waitForElementToBeHidden(this.toast);
        // Click on Assets Manager Menu Button
        elementClick(this.assetsManagerMenu);
        await browser.logger.info('Clicked on Asset Manager Menu');

        await this.selectSurfaceFromDropDown(surfaceName);

        await elementClear(this.search, assetName);

        // Select Created Enclave Model
        await WaitHelper.waitForElementToBeDisplayed(this.assetList, 5000, 'Enclave Model List Displayed');
        await this.search.sendKeys(assetName);
        await elementClick(this.searchEnclaveModel(assetName));
        await browser.logger.info(assetName, 'Selected');

        await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'List');
        await browser.actions().mouseMove(this.deployTab).perform();
        await elementClick(this.deployTab);
        await browser.logger.info('Deployment Button Clicked');

        await WaitHelper.waitForElementToBeDisplayed(this.triggerLogicalDeployment, 5000, 'Trigger Logical Deployment');
        await browser.actions().mouseMove(this.triggerLogicalDeployment).perform();
        await elementClick(this.triggerLogicalDeployment);
        await browser.logger.info('Trigger Logical Deployment Button Clicked');

        // Enter Deployment Name
        await WaitHelper.waitForElementToBeClickable(this.enterDeploymentName, 5000, 'Deployment Name');
        await browser.actions().mouseDown(this.enterDeploymentName).perform();
        await elementSendkeys(this.enterDeploymentName, deploymentName);
        await browser.logger.info('Deployment Name Entered');

        // Enter Stack Name
        await WaitHelper.waitForElementToBeClickable(this.enterStackName, 5000, 'Stack Name');
        await elementSendkeys(this.enterStackName, stackName);
        await browser.logger.info('Stack Name Entered');

        await WaitHelper.waitForElementToBeClickable(this.cloudRegionDropDown, 2000, 'Cloud Region Drop Down ');
        await browser.actions().mouseDown(this.cloudRegionDropDown).perform();
        await elementClick(this.cloudRegionDropDown);
        await browser.logger.info('Cloud Region Drop DOwn Selected');

        await WaitHelper.waitForElement(this.selectCloudRegion(region), 5000, 'Region ');
        await elementClick(this.selectCloudRegion(region));
        await browser.logger.info('Region Selected');

        // Select Organization
        await WaitHelper.waitForElement(this.slectSurfaceLayer(SurfaceLayer), 5000, 'Surface layer ');
        await elementClick(this.slectSurfaceLayer(SurfaceLayer));
        await browser.logger.info('Surface layer Selected');

        await WaitHelper.waitForElementToBeClickable(this.cloudAccountDropDown, 2000, 'Cloud Account Drop Down ');
        await browser.actions().mouseDown(this.cloudAccountDropDown).perform();
        await elementClick(this.cloudAccountDropDown);
        await browser.logger.info('Cloud Account Drop DOwn Selected');

        await WaitHelper.waitForElement(this.selectCloudAccount(account), 5000, 'Cloud Account ');
        await elementClick(this.selectCloudAccount(account));
        await browser.logger.info('Account Selected');

        // Click On Next Button To Go Enclave Model Evaluation Page
        await WaitHelper.waitForElement(this.nextToEnclaveModelEvaluation, 5000, 'Next ');
        await elementClick(this.nextToEnclaveModelEvaluation);
        await browser.logger.info('Next');

        // Click On Next Button To Go Review Deployment Page
        await WaitHelper.waitForElement(this.nextToReviewDeployment, 5000, 'Next ');
        await elementClick(this.nextToReviewDeployment);
        await browser.logger.info('Next');

        // Click On Submit Button
        await WaitHelper.waitForElement(this.submitButton, 5000, 'Submit ');
        await elementClick(this.submitButton);
        await browser.logger.info('Submitted Deployment');
        await browser.sleep(3000);
    }

    getRandomNum = function (min, max) {
        return parseInt(Math.random() * (max - min) + min);
    };

    async getId() {
        return browser.getCurrentUrl().then(function (url) {
            console.log(url);
            let str = 'currentUrl';
            let entityId = [];
            entityId = url.split('/');
            return entityId[6];
        });
    }

    async searchLogicalDeployment(surfaceName: string = null, deploymentName: string = null) {
        await WaitHelper.waitForElementToBeHidden(this.toast);
        // Click on LogicalDeployment Menu Button
        // await browser.get(configProperties.qaUrl + '/workflows/logical-deployments');
        elementClick(this.logicalDeployementMenu);
        await browser.logger.info('Clicked on Logical Deployment Menu');

        await this.selectSurfaceFromDropDown(surfaceName);

        await elementClear(this.search, deploymentName);

        // Select Created Deployment
        await WaitHelper.waitForElementToBeDisplayed(this.logicalDeploymentList, 5000, 'Logical Deployments List Displayed');
        await this.search.sendKeys(deploymentName);
        await elementClick(this.logicalDeployementElement(deploymentName));
        await browser.logger.info(deploymentName, 'Selected');
    }

    async updateLogicalDeployment(surfaceName: string = null, deploymentName: string = null, assetName: string = null, version: string = null) {
        await WaitHelper.waitForElementToBeHidden(this.toast);
        // Click on LogicalDeployment Menu Button
        elementClick(this.logicalDeployementMenu);
        await browser.logger.info('Clicked on Logical Deployment Menu');

        await this.selectSurfaceFromDropDown(surfaceName);

        await elementClear(this.search, deploymentName);

        // Select Created Deployment
        await WaitHelper.waitForElementToBeDisplayed(this.logicalDeploymentList, 5000, 'Logical Deployments List Displayed');
        await this.search.sendKeys(deploymentName);
        await elementClick(this.logicalDeployementElement(deploymentName));
        await browser.logger.info(deploymentName, 'Selected');

        await WaitHelper.waitForElementToBeDisplayed(this.updateDeploymentButton, 2000, 'Update Deployment Button');
        await browser.actions().mouseDown(this.updateDeploymentButton).perform();
        await elementClick(this.updateDeploymentButton);
        await browser.logger.info('Update Deployment Button Selected');

        await WaitHelper.waitForElementToBeDisplayed(this.versionDropDown, 2000, 'Version Drop Down');
        await browser.actions().mouseDown(this.versionDropDown).perform();
        await elementClick(this.versionDropDown);
        await browser.logger.info('Version Drop Down Selected');

        await WaitHelper.waitForElementToBeDisplayed(this.selectVersion(assetName, version), 2000, 'Version');
        await browser.actions().mouseDown(this.selectVersion(assetName, version)).perform();
        await elementClick(this.selectVersion(assetName, version));
        await browser.logger.info('Version Selected');

        // Click On Next Button To Go Enclave Model Evaluation Page
        await WaitHelper.waitForElement(this.nextToEnclaveModelEvaluation, 5000, 'Next ');
        await elementClick(this.nextToEnclaveModelEvaluation);
        await browser.logger.info('Next');

        // Click On Next Button To Go Review Deployment Page
        await WaitHelper.waitForElement(this.nextToReviewDeployment, 5000, 'Next ');
        await elementClick(this.nextToReviewDeployment);
        await browser.logger.info('Next');

        // Click On Submit Button
        await WaitHelper.waitForElement(this.submitButton, 5000, 'Submit ');
        await elementClick(this.submitButton);
        await browser.logger.info('Submitted Deployment');
    }

    async deleteLogicalDeployement(surfaceName: string = null, deploymentName: any = null) {
        // wait till the toast element flash is hidden.
        await WaitHelper.waitForElementToBeHidden(this.toast);
        elementClick(this.logicalDeployementMenu);
        await browser.logger.info('Clicked on Logical Deployments Menu');

        await this.selectSurfaceFromDropDown(surfaceName);

        await this.search.sendKeys(deploymentName);
        await elementClick(this.logicalDeployementElement(deploymentName));
        await browser.logger.info(deploymentName, 'Selected');

        // Click On Delete Button
        await browser.actions().mouseDown(this.deleteButton).perform();
        await WaitHelper.waitForElementToBeClickable(this.deleteButton, 2000, 'Delete');
        await elementClick(this.deleteButton);

        // Click On Confirm Delete Button
        await browser.logger.info('Clicked Delete Button');
        await WaitHelper.waitForElementToBeClickable(this.confirmDeleteButton, 2000, 'Confirm Delete');
        await elementClick(this.confirmDeleteButton);
        await browser.logger.info('Logical Deployment is deleted');
    }

    async verifyLogicalDeployment(surfaceName: string = null, deploymentName: string = null) {
        await WaitHelper.waitForElementToBeHidden(this.toast);
        // Click on LogicalDeployment Menu Button
        await elementClick(this.logicalDeployementMenu);
        await browser.logger.info('Clicked on Logical Deployment Menu');

        await this.selectSurfaceFromDropDown(surfaceName);

        await elementClear(this.search, deploymentName);
    }

    async selectSurfaceFromDropDown(surfaceName: string = null) {
        await WaitHelper.waitForElementToBePresent(this.surfaceDropDown, 5000, 'Surface Drop Down ');
        await elementClick(this.surfaceDropDown);
        await browser.logger.info(surfaceName, 'Surface Drop Down Clicked');

        await WaitHelper.waitForElementToBePresent(this.selectSurface(surfaceName), 5000, 'Surface');
        await elementClick(this.selectSurface(surfaceName));
        await browser.logger.info('Surface Selcted');
      }

    async getPageTitle() {
        return browser.getTitle();
    }
}