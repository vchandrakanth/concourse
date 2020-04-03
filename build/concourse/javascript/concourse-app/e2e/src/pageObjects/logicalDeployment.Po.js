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
class LogicalDeployment {
    constructor() {
        this.getRandomNum = function (min, max) {
            return parseInt(Math.random() * (max - min) + min);
        };
    }
    get assetsManagerMenu() { return protractor_1.element(protractor_1.by.css('a[data-e2e="linkAssets"]')); }
    get logicalDeploymentsMenu() { return protractor_1.element(protractor_1.by.css('a[data-e2e="linkLogicalDeployments"]')); }
    searchEnclaveModel(assetName) { return protractor_1.element(protractor_1.by.xpath(`//span[.='${assetName}']`)); }
    get search() { return protractor_1.element(protractor_1.by.css('[placeholder="Search"]')); }
    get assetList() { return protractor_1.element(protractor_1.by.xpath('//datatable-body[@class="datatable-body"]')); }
    get selectModel() { return protractor_1.element(protractor_1.by.xpath('//span[.="properties.enclaveModelData.deploymentModelName"]')); }
    get deployTab() { return protractor_1.element(protractor_1.by.css('li.deploys-tab')); }
    get triggerLogicalDeployment() { return protractor_1.element(protractor_1.by.css('button[title="Deploy Asset"]')); }
    get enterDeploymentName() { return protractor_1.element(protractor_1.by.css('[placeholder="Deployment Name"]')); }
    get enterStackName() { return protractor_1.element(protractor_1.by.css('[placeholder="Stack Name"]')); }
    get cloudRegionDropDown() { return protractor_1.element(protractor_1.by.css('ng-select[formcontrolname="cloudRegion"]')); }
    selectCloudRegion(region) { return protractor_1.element(protractor_1.by.xpath(`//span[.='${region}']`)); }
    slectSurfaceLayer(SurfaceLayer) { return protractor_1.element(protractor_1.by.xpath(`//label[.='${SurfaceLayer}']`)); }
    get cloudAccountDropDown() { return protractor_1.element(protractor_1.by.css('ng-select[formcontrolname="cloudAccount"]')); }
    selectCloudAccount(account) { return protractor_1.element(protractor_1.by.xpath(`//span[.='${account}']`)); }
    get nextToEnclaveModelEvaluation() { return protractor_1.element(protractor_1.by.xpath('//button[.="Next"]')); }
    get nextToReviewDeployment() { return protractor_1.element(protractor_1.by.xpath('//button[.="Next"]')); }
    get submitButton() { return protractor_1.element(protractor_1.by.xpath('//button[.="Submit"]')); }
    get toast() { return protractor_1.$('#toast-container'); }
    get list() { return protractor_1.element(protractor_1.by.css('.datatable-body')); }
    get scrollBar() { return protractor_1.element(protractor_1.by.css('.bootstrap')); }
    searchDeployment(deploymentId) { return protractor_1.element(protractor_1.by.xpath(`//datatable-body-cell[.='${deploymentId}']`)); }
    logicalDeployment(deploymentId) { return protractor_1.element(protractor_1.by.css(`span[title='${deploymentId}']`)); }
    get deleteButton() { return protractor_1.element(protractor_1.by.css('.btn-danger')); }
    get confirmDeleteButton() { return protractor_1.element(protractor_1.by.css('.delete')); }
    get logicalDeployementMenu() { return protractor_1.element(protractor_1.by.xpath('//a[contains(.,"Logical Deployments")]')); }
    get surfaceDropDown() { return protractor_1.element(protractor_1.by.css('select')); }
    selectSurface(surface) { return protractor_1.element(protractor_1.by.xpath(`//option[contains(.,'${surface}')]`)); }
    logicalDeployementElement(deploymentName) { return protractor_1.element(protractor_1.by.css(`span[title='${deploymentName}']`)); }
    get risklist() { return protractor_1.element(protractor_1.by.xpath('//datatable-body[@class="datatable-body"]')); }
    get lastPage() { return protractor_1.element(protractor_1.by.xpath('//i[@class="datatable-icon-skip"]')); }
    deploysTab(count) { return protractor_1.element(protractor_1.by.xpath(`//a[contains(.,'Deploys ${count}')]`)); }
    get updateDeploymentButton() { return protractor_1.element(protractor_1.by.css('[data-e2e="changeDeploymentVersion"]')); }
    get versionDropDown() { return protractor_1.element(protractor_1.by.css('[placeholder="Select a different version"]')); }
    selectVersion(assetName, version) { return protractor_1.element(protractor_1.by.xpath(`//span[contains(.,'${(assetName) + (version)}')]`)); }
    get nextButton() { return protractor_1.element(protractor_1.by.xpath('//button[.="Next"]')); }
    get logicalDeploymentList() { return protractor_1.element(protractor_1.by.css('.app-container')); }
    newlogicalDeployment(surfaceName = null, assetName = null, deploymentName = null, stackName = null, region = null, SurfaceLayer = null, account = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            // Click on Assets Manager Menu Button
            yield protractor_1.browser.get(configProperties.qaUrl + '/assets');
            // await elementClick(this.assetsManagerMenu);
            yield protractor_1.browser.logger.info('Clicked on Asset Manager Menu');
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield utils_1.elementClear(this.search, assetName);
            // Select Created Enclave Model
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.assetList, 5000, 'Enclave Model List Displayed');
            yield this.search.sendKeys(assetName);
            yield protractor_1.browser.sleep(2000);
            yield utils_1.elementClick(this.searchEnclaveModel(assetName));
            yield protractor_1.browser.logger.info(assetName, 'Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'List');
            yield protractor_1.browser.actions().mouseMove(this.deployTab).perform();
            yield utils_1.elementClick(this.deployTab);
            yield protractor_1.browser.logger.info('Deployment Button Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.triggerLogicalDeployment, 5000, 'Trigger Logical Deployment');
            yield protractor_1.browser.actions().mouseMove(this.triggerLogicalDeployment).perform();
            yield utils_1.elementClick(this.triggerLogicalDeployment);
            yield protractor_1.browser.logger.info('Trigger Logical Deployment Button Clicked');
            // Enter Deployment Name
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.enterDeploymentName, 5000, 'Deployment Name');
            yield protractor_1.browser.actions().mouseDown(this.enterDeploymentName).perform();
            yield utils_1.elementSendkeys(this.enterDeploymentName, deploymentName);
            yield protractor_1.browser.logger.info('Deployment Name Entered');
            yield protractor_1.browser.sleep(2000);
            // Enter Stack Name
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.enterStackName, 5000, 'Stack Name');
            yield utils_1.elementSendkeys(this.enterStackName, stackName);
            yield protractor_1.browser.logger.info('Stack Name Entered');
            yield protractor_1.browser.sleep(2000);
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.cloudRegionDropDown, 2000, 'Cloud Region Drop Down ');
            yield protractor_1.browser.actions().mouseDown(this.cloudRegionDropDown).perform();
            yield utils_1.elementClick(this.cloudRegionDropDown);
            yield protractor_1.browser.logger.info('Cloud Region Drop DOwn Selected');
            yield waitHelper_1.WaitHelper.waitForElement(this.selectCloudRegion(region), 5000, 'Region ');
            yield utils_1.elementClick(this.selectCloudRegion(region));
            yield protractor_1.browser.logger.info('Region Selected');
            // Select Organization
            yield waitHelper_1.WaitHelper.waitForElement(this.slectSurfaceLayer(SurfaceLayer), 5000, 'Surface layer ');
            yield utils_1.elementClick(this.slectSurfaceLayer(SurfaceLayer));
            yield protractor_1.browser.logger.info('Surface layer Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.cloudAccountDropDown, 2000, 'Cloud Account Drop Down ');
            yield protractor_1.browser.actions().mouseDown(this.cloudAccountDropDown).perform();
            yield utils_1.elementClick(this.cloudAccountDropDown);
            yield protractor_1.browser.logger.info('Cloud Account Drop DOwn Selected');
            yield waitHelper_1.WaitHelper.waitForElement(this.selectCloudAccount(account), 5000, 'Cloud Account ');
            yield utils_1.elementClick(this.selectCloudAccount(account));
            yield protractor_1.browser.logger.info('Account Selected');
            // Click On Next Button To Go Enclave Model Evaluation Page
            yield waitHelper_1.WaitHelper.waitForElement(this.nextToEnclaveModelEvaluation, 5000, 'Next ');
            yield utils_1.elementClick(this.nextToEnclaveModelEvaluation);
            yield protractor_1.browser.logger.info('Next');
            // Click On Next Button To Go Review Deployment Page
            yield waitHelper_1.WaitHelper.waitForElement(this.nextToReviewDeployment, 5000, 'Next ');
            yield utils_1.elementClick(this.nextToReviewDeployment);
            yield protractor_1.browser.logger.info('Next');
            // Click On Submit Button
            yield waitHelper_1.WaitHelper.waitForElement(this.submitButton, 5000, 'Submit ');
            yield utils_1.elementClick(this.submitButton);
            yield protractor_1.browser.logger.info('Submitted Deployment');
            yield protractor_1.browser.sleep(2000);
        });
    }
    getId() {
        return __awaiter(this, void 0, void 0, function* () {
            return protractor_1.browser.getCurrentUrl().then(function (url) {
                console.log(url);
                let str = 'currentUrl';
                let entityId = [];
                entityId = url.split('/');
                return entityId[6];
            });
        });
    }
    searchLogicalDeployment(surfaceName = null, deploymentName = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            // Click on LogicalDeployment Menu Button
            yield protractor_1.browser.get(configProperties.qaUrl + '/workflows/logical-deployments');
            yield protractor_1.browser.logger.info('Clicked on Logical Deployment Menu');
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield utils_1.elementClear(this.search, deploymentName);
            // Select Created Deployment
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.logicalDeploymentList, 5000, 'Logical Deployments List Displayed');
            yield this.search.sendKeys(deploymentName);
            yield utils_1.elementClick(this.logicalDeployementElement(deploymentName));
            yield protractor_1.browser.logger.info(deploymentName, 'Selected');
        });
    }
    updateLogicalDeployment(surfaceName = null, deploymentName = null, assetName = null, version = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            // Click on LogicalDeployment Menu Button
            yield protractor_1.browser.get(configProperties.qaUrl + '/workflows/logical-deployments');
            yield protractor_1.browser.logger.info('Clicked on Logical Deployment Menu');
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield utils_1.elementClear(this.search, deploymentName);
            // Select Created Deployment
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.logicalDeploymentList, 5000, 'Logical Deployments List Displayed');
            yield this.search.sendKeys(deploymentName);
            yield utils_1.elementClick(this.logicalDeployementElement(deploymentName));
            yield protractor_1.browser.logger.info(deploymentName, 'Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.updateDeploymentButton, 2000, 'Update Deployment Button');
            yield protractor_1.browser.actions().mouseDown(this.updateDeploymentButton).perform();
            yield utils_1.elementClick(this.updateDeploymentButton);
            yield protractor_1.browser.logger.info('Update Deployment Button Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.versionDropDown, 2000, 'Version Drop Down');
            yield protractor_1.browser.actions().mouseDown(this.versionDropDown).perform();
            yield utils_1.elementClick(this.versionDropDown);
            yield protractor_1.browser.logger.info('Version Drop Down Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.selectVersion(assetName, version), 2000, 'Version');
            yield protractor_1.browser.actions().mouseDown(this.selectVersion(assetName, version)).perform();
            yield utils_1.elementClick(this.selectVersion(assetName, version));
            yield protractor_1.browser.logger.info('Version Selected');
            // Click On Next Button To Go Enclave Model Evaluation Page
            yield waitHelper_1.WaitHelper.waitForElement(this.nextToEnclaveModelEvaluation, 5000, 'Next ');
            yield utils_1.elementClick(this.nextToEnclaveModelEvaluation);
            yield protractor_1.browser.logger.info('Next');
            // Click On Next Button To Go Review Deployment Page
            yield waitHelper_1.WaitHelper.waitForElement(this.nextToReviewDeployment, 5000, 'Next ');
            yield utils_1.elementClick(this.nextToReviewDeployment);
            yield protractor_1.browser.logger.info('Next');
            // Click On Submit Button
            yield waitHelper_1.WaitHelper.waitForElement(this.submitButton, 5000, 'Submit ');
            yield utils_1.elementClick(this.submitButton);
            yield protractor_1.browser.logger.info('Submitted Deployment');
            yield protractor_1.browser.sleep(2000);
        });
    }
    deleteLogicalDeployement(surfaceName = null, deploymentName = null) {
        return __awaiter(this, void 0, void 0, function* () {
            // wait till the toast element flash is hidden.
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.get(configProperties.qaUrl + '/workflows/logical-deployments');
            yield protractor_1.browser.logger.info('Clicked on Logical Deployments Menu');
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield this.search.sendKeys(deploymentName);
            yield protractor_1.browser.sleep(2000);
            yield utils_1.elementClick(this.logicalDeployementElement(deploymentName));
            yield protractor_1.browser.logger.info(deploymentName, 'Selected');
            // Click On Delete Button
            yield protractor_1.browser.actions().mouseDown(this.deleteButton).perform();
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.deleteButton, 2000, 'Delete');
            yield utils_1.elementClick(this.deleteButton);
            // Click On Confirm Delete Button
            yield protractor_1.browser.logger.info('Clicked Delete Button');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.confirmDeleteButton, 2000, 'Confirm Delete');
            yield utils_1.elementClick(this.confirmDeleteButton);
            yield protractor_1.browser.logger.info('Logical Deployment is deleted');
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
    getPageTitle() {
        return __awaiter(this, void 0, void 0, function* () {
            return protractor_1.browser.getTitle();
        });
    }
}
exports.LogicalDeployment = LogicalDeployment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naWNhbERlcGxveW1lbnQuUG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL2UyZS9zcmMvcGFnZU9iamVjdHMvbG9naWNhbERlcGxveW1lbnQuUG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBcUQ7QUFDckQsMENBQTZFO0FBQzdFLG9EQUFpRDtBQUVqRCxJQUFJLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBRXJELE1BQWEsaUJBQWlCO0lBQTlCO1FBNEhFLGlCQUFZLEdBQUcsVUFBVSxHQUFHLEVBQUUsR0FBRztZQUMvQixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDO0lBcUhKLENBQUM7SUFqUEMsSUFBSSxpQkFBaUIsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9FLElBQUksc0JBQXNCLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsc0NBQXNDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRyxrQkFBa0IsQ0FBQyxTQUFpQixJQUFJLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsU0FBUyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRixJQUFJLE1BQU0sS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLElBQUksU0FBUyxLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMs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