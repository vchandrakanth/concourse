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
class CloudRoles {
    constructor() {
        this.getRandomNum = function (min, max) {
            return parseInt(Math.random() * (max - min) + min);
        };
    }
    get cloudRolesLink() { return protractor_1.element(protractor_1.by.css('a[routerlink="cloud-roles"]')); }
    get createNewCloudRole() { return protractor_1.element(protractor_1.by.css('[data-e2e="createNewCloudRole"]')); }
    get enterCloudRoleName() { return protractor_1.element(protractor_1.by.css('[data-e2e="name"]')); }
    get enterCloudRoleDescription() { return protractor_1.element(protractor_1.by.css('[data-e2e="description"]')); }
    selectCloudProvider(cloudProvider) { return protractor_1.element(protractor_1.by.css(`[for='cp-${cloudProvider}']`)); }
    get draftStatus() { return protractor_1.element(protractor_1.by.css('[for="draft"]')); }
    get publishedStatus() { return protractor_1.element(protractor_1.by.css('[for="published"]')); }
    // get minor() { return element(by.css('#Minor')); }
    // get major() { return element(by.css('#major')); }
    get minor() { return protractor_1.element(protractor_1.by.css('[for="minor"]')); }
    get major() { return protractor_1.element(protractor_1.by.css('[for="major"]')); }
    get nextButton() { return protractor_1.element(protractor_1.by.xpath('//button[.="Next"]')); }
    get searchAWSActions() { return protractor_1.element(protractor_1.by.css('[formgroupname="awsCloudActions"] [placeholder="Search Actions"]')); }
    get searchAWSNonActions() { return protractor_1.element(protractor_1.by.css('[formgroupname="awsCloudNonActions"] [placeholder="Search Actions"]')); }
    get searchAzureActions() { return protractor_1.element(protractor_1.by.css('[formgroupname="azureCloudActions"] [placeholder="Search Actions"]')); }
    get searchAzureNonActions() { return protractor_1.element(protractor_1.by.css('[formgroupname="azureCloudNonActions"] [placeholder="Search Actions"]')); }
    selectAction(action) { return protractor_1.element(protractor_1.by.xpath(`//li[contains(.,'${action}')]`)); }
    get addAwsAction() { return protractor_1.element(protractor_1.by.css('.btn-sm.btn-primary')); }
    get addAwsNonActions() { return protractor_1.element(protractor_1.by.css('step[formgroupname="awsCloudNonActions"] li:nth-of-type(1) svg:nth-of-type(1)')); }
    get addAzureAction() { return protractor_1.element(protractor_1.by.xpath('//div[@class="selector-panel card mr-2 ng-star-inserted"]//li[1]/button[@class="btn btn-primary btn-sm"]')); }
    get addAzureNonActions() { return protractor_1.element(protractor_1.by.css('step[formgroupname="azureCloudNonActions"] li:nth-of-type(1) > button:nth-of-type(1)')); }
    get submitButton() { return protractor_1.element(protractor_1.by.css('button[type="submit"]')); }
    get editCloudRoleButton() { return protractor_1.element(protractor_1.by.css('[data-e2e="editCloudRoleButton"]')); }
    get deleteCloudRoleButton() { return protractor_1.element(protractor_1.by.css('[data-e2e="deleteCloudRoleButton"]')); }
    get confirmDeleteButton() { return protractor_1.element(protractor_1.by.css('[data-e2e="confirmDeleteModalBtn"]')); }
    get removeAction() { return protractor_1.element(protractor_1.by.css('.btn-sm.btn-danger')); }
    get toast() { return protractor_1.$('#toast-container'); }
    get list() { return protractor_1.element(protractor_1.by.xpath('//div[@class="list"]')); }
    get search() { return protractor_1.element(protractor_1.by.css('[placeholder="Search"]')); }
    get surfaceDropDown() { return protractor_1.element(protractor_1.by.css('[data-e2e="surfaceSwitcherDropdown"]')); }
    selectSurface(Surface) { return protractor_1.element(protractor_1.by.xpath(`//option[contains(.,'${Surface}')]`)); }
    searchCloudRoleName(cloudRole) { return protractor_1.element(protractor_1.by.css(`[data-e2e='${cloudRole}']`)); }
    get editAwsActions() { return protractor_1.element(protractor_1.by.css('button[data-e2e="editAwsActions"]')); }
    get editAwsNonActions() { return protractor_1.element(protractor_1.by.css('button[data-e2e="editAwsNonActions"]')); }
    get editAzureActions() { return protractor_1.element(protractor_1.by.css('button[data-e2e="editAzureActions"]')); }
    get editAzureNonActions() { return protractor_1.element(protractor_1.by.css('button[data-e2e="editAzureNonActions"]')); }
    get saveButton() { return protractor_1.element(protractor_1.by.xpath('//button[.="Save"]')); }
    get searchInEditWindow() { return protractor_1.element(protractor_1.by.css('[placeholder="Search Actions"]')); }
    get addButton() { return protractor_1.element(protractor_1.by.xpath('//button[@class="btn btn-primary btn-sm"]')); }
    searchCloudRoleFromList(cloudRole) { return protractor_1.element(protractor_1.by.css(`//h5[.='${cloudRole}']`)); }
    createCloudRole(surfaceName = null, name = null, description = null, cloudProvider = null, status, action = null, nonAction = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            // await elementClick(this.cloudRolesLink);
            yield protractor_1.browser.get(configProperties.qaUrl + '/cloud-roles');
            yield protractor_1.browser.logger.info('Cloud Roles Menu Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'List displayed');
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield protractor_1.browser.logger.info('Selected E2E Surface');
            // Click on '+' Button to Create Cloud Role
            yield utils_1.elementClick(this.createNewCloudRole);
            yield protractor_1.browser.logger.info('Clicked New Cloud Role Button');
            // Enter Cloud Role Name
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.enterCloudRoleName, 2000, 'Cloud Role name ');
            yield utils_1.elementSendkeys(this.enterCloudRoleName, name);
            yield protractor_1.browser.logger.info('Cloud Role Name Entered');
            // Enter Cloud Role Description
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.enterCloudRoleDescription, 2000, 'Description ');
            yield utils_1.elementSendkeys(this.enterCloudRoleDescription, description);
            yield protractor_1.browser.logger.info('Cloud Role Description Entered');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectCloudProvider(cloudProvider), 5000, 'Cloud Role Provider ');
            yield utils_1.elementClick(this.selectCloudProvider(cloudProvider));
            yield protractor_1.browser.logger.info('Cloud Provider Selected');
            yield console.log('Cloud Provider Is - ', cloudProvider);
            if (status === 'PUBLISHED') {
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.publishedStatus, 2000, 'Published ');
                yield utils_1.elementClick(this.publishedStatus);
                yield protractor_1.browser.logger.info('Selected Published');
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.minor, 2000, 'Minor ');
                yield utils_1.elementClick(this.minor);
                yield protractor_1.browser.logger.info('Selected Minor');
            }
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.nextButton, 5000, 'Next');
            yield utils_1.elementClick(this.nextButton);
            yield protractor_1.browser.logger.info('Moved To OPERATIONS Page');
            yield protractor_1.browser.sleep(2000);
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.searchAWSActions, 2000, 'Action');
            // await browser.actions().mouseMove(this.searchAWSActions).perform();
            for (let actionName of action) {
                yield utils_1.elementClick(this.searchAWSActions);
                yield this.searchAWSActions.sendKeys(actionName);
                yield protractor_1.browser.logger.info('Selected Action Name');
            }
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.addAwsAction, 2000, 'Add Action');
            yield protractor_1.browser.actions().mouseMove(this.addAwsAction).perform();
            yield protractor_1.browser.sleep(2000);
            yield utils_1.elementClick(this.addAwsAction);
            yield protractor_1.browser.logger.info(action, 'Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.nextButton, 5000, 'Next');
            yield utils_1.elementClick(this.nextButton);
            yield protractor_1.browser.logger.info('Moved To NON-OPERATIONS Page');
            yield protractor_1.browser.sleep(2000);
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.searchAWSNonActions, 2000, 'Non-Action Selected ');
            for (let nonActionName of nonAction) {
                yield protractor_1.browser.actions().mouseMove(this.searchAWSNonActions).perform();
                yield utils_1.elementClick(this.searchAWSNonActions);
                yield this.searchAWSNonActions.sendKeys(nonActionName);
                yield protractor_1.browser.logger.info(nonAction, 'Selected Non-Action');
            }
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.addAwsNonActions, 2000, 'Add');
            yield protractor_1.browser.actions().mouseMove(this.addAwsNonActions).perform();
            yield utils_1.elementClick(this.addAwsNonActions);
            yield protractor_1.browser.logger.info(nonAction, 'Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.nextButton, 5000, 'Next');
            yield utils_1.elementClick(this.nextButton);
            yield protractor_1.browser.logger.info('Moved To Review Cloud Role Page');
            yield protractor_1.browser.sleep(2000);
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.submitButton, 5000, 'Submit ');
            yield utils_1.elementClick(this.submitButton);
            yield protractor_1.browser.logger.info('Cloud Role Submitted');
            yield protractor_1.browser.sleep(2000);
        });
    }
    searchCloudRole(surfaceName = null, name = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            // await elementClick(this.cloudRolesLink);
            yield protractor_1.browser.get(configProperties.qaUrl + '/cloud-roles');
            yield protractor_1.browser.logger.info('Cloud Roles Menu Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'List displayed');
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield protractor_1.browser.logger.info('Selected E2E Surface');
            yield utils_1.elementClear(this.search, name);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'list');
            yield this.search.sendKeys(name);
            yield utils_1.elementClick(this.searchCloudRoleName(name));
            yield protractor_1.browser.logger.info(name, 'Selected');
        });
    }
    editCloudRoleNameAndPublish(surfaceName = null, name = null, description) {
        return __awaiter(this, void 0, void 0, function* () {
            // Search CLoud Role.
            yield this.searchCloudRole(surfaceName, name);
            // Click Edit Icon
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.editCloudRoleButton, 5000, 'Edit Button ');
            yield utils_1.elementClick(this.editCloudRoleButton);
            yield protractor_1.browser.logger.info('Edit Button Clicked');
            // Edit Cloud Role Name
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.enterCloudRoleName, 5000, 'Cloud Role Name ');
            yield utils_1.elementSendkeys(this.enterCloudRoleName, ' Updated');
            yield protractor_1.browser.logger.info('Cloud Role Name: ', name + ' Updated');
            // Edit Cloud Role Description
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.enterCloudRoleDescription, 5000, 'Cloud Role Description ');
            yield utils_1.elementSendkeys(this.enterCloudRoleDescription, ' Updated');
            yield protractor_1.browser.logger.info('Cloud Role Description Entered: ', description + ' Updated');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.publishedStatus, 2000, 'Published ');
            yield utils_1.elementClick(this.publishedStatus);
            yield protractor_1.browser.logger.info('Selected Published');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.minor, 2000, 'Minor ');
            yield utils_1.elementClick(this.minor);
            yield protractor_1.browser.logger.info('Selected Minor');
            // Submit Cloud Role
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.submitButton, 5000, 'Submit ');
            yield utils_1.elementClick(this.submitButton);
            yield protractor_1.browser.logger.info('Cloud Role Updated');
            yield console.log('Cloud Role Is', name + ' Updated');
        });
    }
    publishCloudRole(surfaceName = null, name = null, description) {
        return __awaiter(this, void 0, void 0, function* () {
            // Search CLoud Role.
            yield this.searchCloudRole(surfaceName, name);
            // Click Edit Icon
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.editCloudRoleButton, 5000, 'Edit Button ');
            yield utils_1.elementClick(this.editCloudRoleButton);
            yield protractor_1.browser.logger.info('Edit Button Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.publishedStatus, 2000, 'Published ');
            yield protractor_1.browser.actions().mouseMove(this.publishedStatus).perform();
            yield utils_1.elementClick(this.publishedStatus);
            yield protractor_1.browser.logger.info('Selected Published');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.minor, 2000, 'Minor ');
            yield protractor_1.browser.actions().mouseMove(this.minor).perform();
            yield utils_1.elementClick(this.minor);
            yield protractor_1.browser.logger.info('Selected Minor');
            // Submit Cloud Role
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.submitButton, 5000, 'Submit ');
            yield utils_1.elementClick(this.submitButton);
            yield protractor_1.browser.logger.info('Cloud Role Updated');
            yield console.log('Cloud Role Is', name + ' Updated');
        });
    }
    editAWSAction(surfaceName = null, name = null, awsAction = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.searchCloudRole(surfaceName, name);
            yield protractor_1.browser.logger.info(name, 'Selected');
            for (let awsActionName of awsAction) {
                console.log('value', awsAction);
                yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.editAwsActions, 5000, 'Edit AWS Operations Button');
                yield protractor_1.browser.actions().mouseDown(this.editAwsActions).perform();
                yield utils_1.elementClick(this.editAwsActions);
                yield protractor_1.browser.logger.info('Edit Button Clicked');
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.searchInEditWindow, 2000, 'AWS Action');
                yield protractor_1.browser.actions().mouseMove(this.searchInEditWindow).perform();
                yield utils_1.elementClick(this.searchInEditWindow);
                yield this.searchInEditWindow.sendKeys(awsActionName);
                yield protractor_1.browser.logger.info('Selected Action Name');
                yield protractor_1.browser.sleep(2000);
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.addButton, 2000, 'Add AWS Non Action');
                yield protractor_1.browser.actions().mouseMove(this.addButton).perform();
                yield utils_1.elementClick(this.addButton);
                yield protractor_1.browser.logger.info(awsAction, 'Selected');
                yield protractor_1.browser.sleep(2000);
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.saveButton, 5000, 'Save ');
                yield protractor_1.browser.actions().mouseMove(this.saveButton).perform();
                yield utils_1.elementClick(this.saveButton);
                yield protractor_1.browser.logger.info('Cloud Role Updated');
            }
        });
    }
    editAWSNonAction(surfaceName = null, name = null, awsNonAction = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.searchCloudRole(surfaceName, name);
            for (let awsNonActionName of awsNonAction) {
                console.log('value', awsNonAction);
                yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.editAwsNonActions, 5000, 'Edit AWS Non Operations Button');
                yield protractor_1.browser.actions().mouseDown(this.editAwsNonActions).perform();
                yield utils_1.elementClick(this.editAwsNonActions);
                yield protractor_1.browser.logger.info('Edit Button Clicked');
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.searchInEditWindow, 2000, 'AWS Non Action');
                yield protractor_1.browser.actions().mouseMove(this.searchInEditWindow).perform();
                yield utils_1.elementClick(this.searchInEditWindow);
                yield this.searchInEditWindow.sendKeys(awsNonActionName);
                yield protractor_1.browser.logger.info('Selected Action Name');
                yield protractor_1.browser.sleep(2000);
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.addButton, 2000, 'Add AWS Non Action');
                yield protractor_1.browser.actions().mouseMove(this.addButton).perform();
                yield utils_1.elementClick(this.addButton);
                yield protractor_1.browser.logger.info(awsNonAction, 'Selected');
                yield protractor_1.browser.sleep(2000);
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.saveButton, 5000, 'Save ');
                yield protractor_1.browser.actions().mouseMove(this.saveButton).perform();
                yield utils_1.elementClick(this.saveButton);
                yield protractor_1.browser.logger.info('Cloud Role Updated');
            }
        });
    }
    editAzureAction(surfaceName = null, name = null, azureAction = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.searchCloudRole(surfaceName, name);
            for (let azureActionName of azureAction) {
                console.log('value', azureAction);
                yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.editAzureActions, 5000, 'Edit Azure Operations Button');
                yield protractor_1.browser.actions().mouseDown(this.editAzureActions).perform();
                yield utils_1.elementClick(this.editAzureActions);
                yield protractor_1.browser.logger.info('Edit Button Clicked');
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.searchInEditWindow, 2000, 'Azure Action');
                yield protractor_1.browser.actions().mouseMove(this.searchInEditWindow).perform();
                yield utils_1.elementClick(this.searchInEditWindow);
                yield this.searchInEditWindow.sendKeys(azureActionName);
                yield protractor_1.browser.logger.info('Selected Action Name');
                yield protractor_1.browser.sleep(2000);
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.addButton, 2000, 'Add Azure Action');
                yield protractor_1.browser.actions().mouseMove(this.addButton).perform();
                yield utils_1.elementClick(this.addButton);
                yield protractor_1.browser.logger.info(azureAction, 'Selected');
                yield protractor_1.browser.sleep(2000);
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.saveButton, 5000, 'Save ');
                yield protractor_1.browser.actions().mouseMove(this.saveButton).perform();
                yield utils_1.elementClick(this.saveButton);
                yield protractor_1.browser.logger.info('Cloud Role Updated');
            }
        });
    }
    editAzureNonAction(surfaceName = null, name = null, azureNonAction = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.searchCloudRole(surfaceName, name);
            for (let azureNonActionName of azureNonAction) {
                console.log('value', azureNonAction);
                yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.editAzureNonActions, 5000, 'Edit Azure Non Operations Button');
                yield protractor_1.browser.actions().mouseDown(this.editAzureNonActions).perform();
                yield utils_1.elementClick(this.editAzureNonActions);
                yield protractor_1.browser.logger.info('Edit Button Clicked');
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.searchInEditWindow, 2000, 'Azure Non Action');
                yield protractor_1.browser.actions().mouseMove(this.searchInEditWindow).perform();
                yield utils_1.elementClick(this.searchInEditWindow);
                yield this.searchInEditWindow.sendKeys(azureNonActionName);
                yield protractor_1.browser.logger.info('Selected Action Name');
                yield protractor_1.browser.sleep(2000);
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.addButton, 2000, 'Add Azure Non Action');
                yield protractor_1.browser.actions().mouseMove(this.addButton).perform();
                yield utils_1.elementClick(this.addButton);
                yield protractor_1.browser.logger.info(azureNonAction, 'Selected');
                yield protractor_1.browser.sleep(2000);
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.saveButton, 5000, 'Save ');
                yield protractor_1.browser.actions().mouseMove(this.saveButton).perform();
                yield utils_1.elementClick(this.saveButton);
                yield protractor_1.browser.logger.info('Cloud Role Updated');
            }
        });
    }
    deleteCloudRole(surfaceName = null, name = null, deleteOnly = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield utils_1.elementClick(this.cloudRolesLink);
            yield protractor_1.browser.logger.info('Cloud Role Menu Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'List displayed');
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield utils_1.elementClear(this.search, name);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Cloud Role List Displayed');
            if (!deleteOnly)
                name = name + ' Updated';
            yield this.search.sendKeys(name);
            yield protractor_1.browser.sleep(2000);
            yield utils_1.elementClick(this.searchCloudRoleName(name));
            yield protractor_1.browser.logger.info(name, 'Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.deleteCloudRoleButton, 2000, 'Delete');
            yield protractor_1.browser.actions().mouseMove(this.deleteCloudRoleButton).perform();
            yield utils_1.elementClick(this.deleteCloudRoleButton);
            yield protractor_1.browser.logger.info('Clicked Delete Button');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.confirmDeleteButton, 2000, 'Confirm Delete');
            yield protractor_1.browser.actions().mouseMove(this.confirmDeleteButton).perform();
            yield utils_1.elementClick(this.confirmDeleteButton);
            yield protractor_1.browser.logger.info(name, 'Is deleted');
        });
    }
    verifyCloudRole(surfaceName = null, name = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            // await elementClick(this.cloudRolesLink);
            yield protractor_1.browser.get(configProperties.qaUrl + '/cloud-roles');
            yield protractor_1.browser.logger.info('Cloud Roles Menu Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'List displayed');
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield protractor_1.browser.logger.info('Selected E2E Surface');
            yield utils_1.elementClear(this.search, name);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'list');
            yield this.search.sendKeys(name);
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
exports.CloudRoles = CloudRoles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWRSb2xlLlBvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9lMmUvc3JjL3BhZ2VPYmplY3RzL2Nsb3VkUm9sZS5Qby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDJDQUF5RDtBQUN6RCwwQ0FBNkU7QUFDN0Usb0RBQWlEO0FBQ2pELElBQUksZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFFckQsTUFBYSxVQUFVO0lBQXZCO1FBb0lJLGlCQUFZLEdBQUcsVUFBVSxHQUFHLEVBQUUsR0FBRztZQUM3QixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDdkQsQ0FBQyxDQUFDO0lBeVFOLENBQUM7SUE5WUcsSUFBSSxjQUFjLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRSxJQUFJLGtCQUFrQixLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkYsSUFBSSxrQkFBa0IsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLElBQUkseUJBQXlCLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2RixtQkFBbUIsQ0FBQyxhQUFrQixJQUFJLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksYUFBYSxJQUFJ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