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
    deployment(deploymentId: any) { return element(by.css(`span[title='${deploymentId}']`)); }
    get deleteButton() { return element(by.css('.btn-danger')); }
    get confirmDeleteButton() { return element(by.css('.delete')); }
    get logicalDeployementMenu() { return element(by.xpath('//a[contains(.,"Logical Deployments")]')); }
    get surfaceDropDown() { return element(by.css('select')); }
    selectSurface(topology: string) { return element(by.xpath(`//option[contains(.,'${topology}')]`)); }
    logicalDeployementElement(deploymentName: any) { return element(by.css(`span[title='${deploymentName}']`)); }
    get risklist() { return element(by.xpath('//datatable-body[@class="datatable-body"]')); }
    get lastPage() { return element(by.xpath('//i[@class="datatable-icon-skip"]')); }
    deploysTab(count: any) { return element(by.xpath(`//a[contains(.,'Deploys ${count}')]`)); }
    get updateDeployment() { return element(by.css('[data-e2e="changeDeploymentVersion"]')); }
    get deploymentList() { return element(by.css('.app-container')); }

    async newlogicalDeployment(assetName: string = null,
        deploymentName: string = null, stackName: string = null, region: string = null,
        SurfaceLayer: string = null, account: string = null) {

        await WaitHelper.waitForElementToBeHidden(this.toast);
        // Click on Assets Manager Menu Button
        await browser.get(configProperties.qaUrl + '/assets');
        // await elementClick(this.assetsManagerMenu);
        await browser.logger.info('Clicked on Asset Manager Menu');

        // Click on Control Topology Drop Down Button
        await WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Surface Drop Down');
        await browser.actions().mouseDown(this.surfaceDropDown).perform();
        await elementClick(this.surfaceDropDown);
        await browser.logger.info('Surface Drop Down Selected');

        // Select Control Topology
        await WaitHelper.waitForElementToBeClickable(this.selectSurface(configProperties.SurfaceData.surfaceName), 2000, 'E2E Topology ');
        await elementClick(this.selectSurface(configProperties.SurfaceData.surfaceName));
        await browser.logger.info('Selected E2E Topology');

        await elementClear(this.search, assetName);

        // Select Created Enclave Model
        await WaitHelper.waitForElementToBeDisplayed(this.assetList, 5000, 'Enclave Model List Displayed');
        await this.search.sendKeys(assetName);
        await browser.sleep(2000);
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
        await browser.sleep(2000);

        // Enter Stack Name
        await WaitHelper.waitForElementToBeClickable(this.enterStackName, 5000, 'Stack Name');
        await elementSendkeys(this.enterStackName, stackName);
        await browser.logger.info('Stack Name Entered');
        await browser.sleep(2000);

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
        await browser.sleep(2000);
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

    async searchLogicalDeployment(deploymentName: string = null) {
        await WaitHelper.waitForElementToBeHidden(this.toast);
        // Click on LogicalDeployment Menu Button
        await browser.get(configProperties.qaUrl + '/workflows/logical-deployments');
        await browser.logger.info('Clicked on Logical Deployment Menu');
        await WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Surface Drop Down');
        await browser.actions().mouseDown(this.surfaceDropDown).perform();
        await elementClick(this.surfaceDropDown);
        await browser.logger.info('Surface Drop Down Selected');

        await WaitHelper.waitForElementToBeClickable(this.selectSurface(configProperties.SurfaceData.surfaceName), 2000, 'E2E Topology ');
        await elementClick(this.selectSurface(configProperties.SurfaceData.surfaceName));
        await browser.logger.info('Selected E2E Topology');

        await elementClear(this.search, deploymentName);

        // Select Created Deployment
        await WaitHelper.waitForElementToBeDisplayed(this.deploymentList, 5000, 'Logical Deployments List Displayed');
        await this.search.sendKeys(deploymentName);
        await elementClick(this.logicalDeployementElement(deploymentName));
        await browser.logger.info(deploymentName, 'Selected');
    }

    async deleteLogicalDeployement(deploymentName: any = null) {
        // wait till the toast element flash is hidden.
        await WaitHelper.waitForElementToBeHidden(this.toast);

        await browser.get(configProperties.qaUrl + '/workflows/logical-deployments');
        await browser.logger.info('Clicked on Logical Deployments Menu');

        // Click on Surface Drop Down Button
        await WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Surface Drop Down');
        await browser.actions().mouseDown(this.surfaceDropDown).perform();
        await elementClick(this.surfaceDropDown);
        await browser.logger.info('Surface Drop Down Selected');

        // Select Surface
        await WaitHelper.waitForElementToBeClickable(this.selectSurface(configProperties.SurfaceData.surfaceName), 2000, 'E2E Topology ');
        await elementClick(this.selectSurface(configProperties.SurfaceData.surfaceName));
        await browser.logger.info('Selected E2E Topology');

        await this.search.sendKeys(deploymentName);
        await browser.sleep(2000);
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

    async getPageTitle() {
        return browser.getTitle();
    }
}