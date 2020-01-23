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
    get minor() { return protractor_1.element(protractor_1.by.css('#Minor')); }
    get major() { return protractor_1.element(protractor_1.by.css('#major')); }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWRSb2xlcy5Qby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYWdlT2JqZWN0cy9jbG91ZFJvbGVzLlBvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXlEO0FBQ3pELDBDQUE2RTtBQUM3RSxvREFBaUQ7QUFDakQsSUFBSSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUVyRCxNQUFhLFVBQVU7SUFBdkI7UUFpSUUsaUJBQVksR0FBRyxVQUFVLEdBQUcsRUFBRSxHQUFHO1lBQy9CLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUM7SUE4TkosQ0FBQztJQWhXQyxJQUFJLGNBQWMsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9FLElBQUksa0JBQWtCLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2RixJQUFJLGtCQUFrQixLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekUsSUFBSSx5QkFBeUIsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZGLG1CQUFtQixDQUFDLGFBQWtCLElBQUksT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxhQUFhLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xHLElBQUksV0FBVyxLQUFLLE9BQU8s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