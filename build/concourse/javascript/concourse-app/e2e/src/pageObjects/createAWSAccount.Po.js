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
class CreateCloudAccount {
    constructor() {
        this.getRandomNum = function (min, max) {
            return parseInt(Math.random() * (max - min) + min);
        };
    }
    get linkInstitutionData() { return protractor_1.element(protractor_1.by.css('[data-e2e="linkInstitutionData"]')); }
    get connectCloudAccount() { return protractor_1.element(protractor_1.by.css('a[routerlink="accounts"]')); }
    get newAWSAccount() { return protractor_1.element(protractor_1.by.xpath('//button[contains(text(),"New AWS Account")]')); }
    get awsAccountName() { return protractor_1.element(protractor_1.by.css('input[formcontrolname="name"]')); }
    get awsAccountDescription() { return protractor_1.element(protractor_1.by.css('[formcontrolname="description"]')); }
    get awsAccountId() { return protractor_1.element(protractor_1.by.css('input[formcontrolname="account"]')); }
    // get saveButton() { return $('[data-e2e="createAwsAccountButton"]'); }
    get closeButton() { return protractor_1.$('.close'); }
    get saveButton() { return protractor_1.element(protractor_1.by.xpath('//button[@class="btn btn-primary mt-2"][contains(.,"Save")]')); }
    get toast() { return protractor_1.$('#toast-container'); }
    get surfaceDropDown() { return protractor_1.element(protractor_1.by.css('[data-e2e="surfaceSwitcherDropdown"]')); }
    selectSurface(surface) { return protractor_1.element(protractor_1.by.xpath(`//option[contains(.,'${surface}')]`)); }
    accountGrid(account) { return protractor_1.element(protractor_1.by.xpath(`//section[@class='accounts-grid']/div[contains(.,'${account}')]`)); }
    verifySurface(account, value) { return protractor_1.element(protractor_1.by.xpath(`//section[@class='accounts-grid']/div[contains(.,'${account}')]//label[.='${value}']`)); }
    awsAccountEditButton(account) { return protractor_1.element(protractor_1.by.xpath(`//section[@class='accounts-grid']/div[contains(.,'${account}')]//button[@class='btn btn-sm btn-light']`)); }
    awsAccountDeleteButton(account) { return protractor_1.element(protractor_1.by.xpath(`//section[@class='accounts-grid']/div[contains(.,'${account}')]//button[@class='btn btn-sm btn-danger']`)); }
    get confirmDeleteButton() { return protractor_1.element(protractor_1.by.css('.delete')); }
    createNewCloudAccount(name = null, description, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.linkInstitutionData, 3000, 'Page displayed');
            yield utils_1.elementClick(this.linkInstitutionData);
            yield protractor_1.browser.logger.info('Institutions Page Displayed');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.connectCloudAccount, 5000, 'Connect Cloud Account');
            yield protractor_1.browser.actions().mouseMove(this.connectCloudAccount).perform();
            yield utils_1.elementClick(this.connectCloudAccount);
            yield protractor_1.browser.logger.info('Connect Cloud Account Clicked');
            yield protractor_1.browser.refresh();
            yield protractor_1.browser.sleep(2000);
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.newAWSAccount, 5000, 'New AWS Account');
            yield protractor_1.browser.actions().mouseMove(this.newAWSAccount).perform();
            yield utils_1.elementClick(this.newAWSAccount);
            yield protractor_1.browser.logger.info('New AWS Account Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.awsAccountName, 2000, 'attribute tag name ');
            yield utils_1.elementSendkeys(this.awsAccountName, name);
            yield protractor_1.browser.logger.info(name, 'Entered');
            // Enter Description
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.awsAccountDescription, 2000, 'Description ');
            yield utils_1.elementSendkeys(this.awsAccountDescription, description);
            yield protractor_1.browser.logger.info(description, 'Entered');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.awsAccountId, 2000, 'Account Id');
            yield utils_1.elementSendkeys(this.awsAccountId, accountId);
            yield protractor_1.browser.logger.info(accountId, 'Entered');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.saveButton, 3000, 'Save ');
            yield protractor_1.browser.actions().mouseMove(this.saveButton).perform();
            yield utils_1.elementClick(this.saveButton);
            yield protractor_1.browser.logger.info('AWS Account Created');
            yield console.log('AWS Account Name Is', name);
        });
    }
    editAWSAccount(name = null, description) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.linkInstitutionData, 3000, 'Page displayed');
            yield utils_1.elementClick(this.linkInstitutionData);
            yield protractor_1.browser.logger.info('Institutions Page Displayed');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.connectCloudAccount, 5000, 'Connect Cloud Account');
            yield protractor_1.browser.actions().mouseMove(this.connectCloudAccount).perform();
            yield utils_1.elementClick(this.connectCloudAccount);
            yield protractor_1.browser.logger.info('Connect Cloud Account Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.awsAccountEditButton(name), 5000, 'Edit  Cloud Account');
            yield protractor_1.browser.actions().mouseMove(this.awsAccountEditButton(name)).perform();
            yield utils_1.elementClick(this.awsAccountEditButton(name));
            yield protractor_1.browser.logger.info('Edit Cloud Account Clicked');
            yield protractor_1.browser.sleep(2000);
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.awsAccountName, 2000, 'attribute tag name ');
            yield utils_1.elementSendkeys(this.awsAccountName, ' Updated');
            yield protractor_1.browser.logger.info(name + 'Updated', 'Entered');
            // Enter Description
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.awsAccountDescription, 2000, 'Description ');
            yield utils_1.elementSendkeys(this.awsAccountDescription, ' Updated');
            yield protractor_1.browser.logger.info(description + 'Updated', 'Entered');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.saveButton, 10000, 'Save ');
            yield protractor_1.browser.actions().mouseMove(this.saveButton).perform();
            yield protractor_1.browser.sleep(10000);
            yield utils_1.elementClick(this.saveButton);
            yield protractor_1.browser.logger.info('AWS Account Updated');
            yield console.log('AWS Account Name Is', name);
        });
    }
    deleteAWSAccount(name = null, deleteOnly = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.linkInstitutionData, 3000, 'Page displayed');
            yield utils_1.elementClick(this.linkInstitutionData);
            yield protractor_1.browser.logger.info('Institutions Page Displayed');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.connectCloudAccount, 5000, 'Connect Cloud Account');
            yield protractor_1.browser.actions().mouseMove(this.connectCloudAccount).perform();
            yield utils_1.elementClick(this.connectCloudAccount);
            yield protractor_1.browser.logger.info('Connect Cloud Account Clicked');
            if (!deleteOnly)
                name = name + ' Updated';
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.awsAccountDeleteButton(name), 5000, 'Delete  AWS Account');
            yield protractor_1.browser.actions().mouseMove(this.awsAccountDeleteButton(name)).perform();
            yield utils_1.elementClick(this.awsAccountDeleteButton(name));
            yield protractor_1.browser.logger.info('Delete AWS Account Clicked');
            yield protractor_1.browser.sleep(2000);
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.confirmDeleteButton, 5000, 'Confirm Delete');
            yield protractor_1.browser.actions().mouseMove(this.confirmDeleteButton).perform();
            yield utils_1.elementClick(this.confirmDeleteButton);
            yield protractor_1.browser.logger.info('AWS Account Deleted');
        });
    }
    selectSurfaceFromDropDown(surface = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.surfaceDropDown, 5000, 'Surface Drop Down ');
            yield utils_1.elementClick(this.surfaceDropDown);
            yield protractor_1.browser.logger.info(name, 'Surface Drop Down Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.selectSurface(name), 5000, 'Surface');
            yield utils_1.elementClick(this.selectSurface(name));
            yield protractor_1.browser.logger.info('Surface Selcted');
        });
    }
    getPageTitle() {
        return __awaiter(this, void 0, void 0, function* () {
            return protractor_1.browser.getTitle();
        });
    }
}
exports.CreateCloudAccount = CreateCloudAccount;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlQVdTQWNjb3VudC5Qby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvZTJlL3NyYy9wYWdlT2JqZWN0cy9jcmVhdGVBV1NBY2NvdW50LlBvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXFEO0FBQ3JELDBDQUE2RTtBQUM3RSxvREFBaUQ7QUFHakQsSUFBSSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUVyRCxNQUFhLGtCQUFrQjtJQUEvQjtRQWtJSSxpQkFBWSxHQUFHLFVBQVUsR0FBRyxFQUFFLEdBQUc7WUFDN0IsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZELENBQUMsQ0FBQztJQUtOLENBQUM7SUF4SUcsSUFBSSxtQkFBbUIsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pGLElBQUksbUJBQW1CLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRixJQUFJLGFBQWEsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pHLElBQUksY0FBYyxLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakYsSUFBSSxxQkFBcUIsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFGLElBQUksWUFBWSxLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEYsd0VBQXdFO0lBQ3hFLElBQUksV0FBVyxLQUFLLE9BQU8sY0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV6QyxJQUFJLFVBQVUsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEtBQUssQ0FBQyw2REFBNkQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdHLElBQUksS0FBSyxLQUFLLE9BQU8sY0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdDLElBQUksZUFBZSxLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekYsYUFBYSxDQUFDLE9BQWUsSUFBSSxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRyxXQUFXLENBQUMsT0FBWSxJQUFJLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsS0FBSyxDQUFDLHFEQUFxRCxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFILGFBQWEsQ0FBQyxPQUFZLEVBQUUsS0FBVSxJQUFJLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsS0FBSyxDQUFDLHFEQUFxRCxPQUFPLGlCQUFpQixLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdKLG9CQUFvQixDQUFDLE9BQVksSUFBSSxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEtBQUssQ0FBQyxxREFBcUQsT0FBTyw0Q0FBNEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFLLHNCQUFzQixDQUFDLE9BQVksSUFBSSxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEtBQUssQ0FBQyxxREFBcUQsT0FBTyw2Q0FBNkMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdLLElBQUksbUJBQW1CLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFMUQscUJBQXFCLENBQUMsT0FBZSxJQUFJLEVBQUUsV0FBZ0IsRUFBRSxTQUFpQjs7WUFFaEYsTUFBTSx1QkFBVSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0RCxNQUFNLHVCQUFVLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQy9GLE1BQU0sb0JBQVksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUM3QyxNQUFNLG9CQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBRXpELE1BQU0sdUJBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLHVCQUF1QixDQUFDLENBQUM7WUFDcEcsTUFBTSxvQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN0RSxNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDN0MsTUFBTSxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsK0JBQStCLENBQUMsQ0FBQztZQUMzRCxNQUFNLG9CQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDeEIsTUFBTSxvQkFBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUUxQixNQUFNLHVCQUFVLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQUN4RixNQUFNLG9CQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNoRSxNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFFckQsTUFBTSx1QkFBVSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxFQUFFLHFCQUFxQixDQUFDLENBQUM7WUFDL0YsTUFBTSx1QkFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDakQsTUFBTSxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBRTNDLG9CQUFvQjtZQUNwQixNQUFNLHVCQUFVLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztZQUMvRixNQUFNLHVCQUFlLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQy9ELE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUVsRCxNQUFNLHVCQUFVLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDcEYsTUFBTSx1QkFBZSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDcEQsTUFBTSxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBRWhELE1BQU0sdUJBQVUsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztZQUM3RSxNQUFNLG9CQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM3RCxNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3BDLE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDakQsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25ELENBQUM7S0FBQTtJQUVLLGNBQWMsQ0FBQyxPQUFlLElBQUksRUFBRSxXQUFnQjs7WUFDdEQsTUFBTSx1QkFBVSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0RCxNQUFNLHVCQUFVLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQy9GLE1BQU0sb0JBQVksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUM3QyxNQUFNLG9CQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBRXpELE1BQU0sdUJBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLHVCQUF1QixDQUFDLENBQUM7WUFDcEcsTUFBTSxvQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN0RSxNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDN0MsTUFBTSxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsK0JBQStCLENBQUMsQ0FBQztZQUUzRCxNQUFNLHVCQUFVLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3pHLE1BQU0sb0JBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDN0UsTUFBTSxvQkFBWSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7WUFDeEQsTUFBTSxvQkFBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUUxQixNQUFNLHVCQUFVLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUUscUJBQXFCLENBQUMsQ0FBQztZQUMvRixNQUFNLHVCQUFlLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUN2RCxNQUFNLG9CQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBRXZELG9CQUFvQjtZQUNwQixNQUFNLHVCQUFVLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztZQUMvRixNQUFNLHVCQUFlLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzlELE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFFOUQsTUFBTSx1QkFBVSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzlFLE1BQU0sb0JBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzdELE1BQU0sb0JBQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0IsTUFBTSxvQkFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNwQyxNQUFNLG9CQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ2pELE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRCxDQUFDO0tBQUE7SUFHSyxnQkFBZ0IsQ0FBQyxPQUFlLElBQUksRUFBRSxhQUFxQixJQUFJOztZQUNqRSxNQUFNLHVCQUFVLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RELE1BQU0sdUJBQVUsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixDQUFDLENBQUM7WUFDL0YsTUFBTSxvQkFBWSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQzdDLE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM7WUFFekQsTUFBTSx1QkFBVSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztZQUNwRyxNQUFNLG9CQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3RFLE1BQU0sb0JBQVksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUM3QyxNQUFNLG9CQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBRTNELElBQUksQ0FBQyxVQUFVO2dCQUNYLElBQUksR0FBRyxJQUFJLEdBQUcsVUFBVSxDQUFDO1lBQzdCLE1BQU0sdUJBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLHFCQUFxQixDQUFDLENBQUM7WUFDM0csTUFBTSxvQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMvRSxNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdEQsTUFBTSxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQztZQUN4RCxNQUFNLG9CQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTFCLE1BQU0sdUJBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixDQUFDLENBQUM7WUFDN0YsTUFBTSxvQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN0RSxNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDN0MsTUFBTSxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUVyRCxDQUFDO0tBQUE7SUFFSyx5QkFBeUIsQ0FBQyxVQUFrQixJQUFJOztZQUNsRCxNQUFNLHVCQUFVLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztZQUM3RixNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3pDLE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO1lBRTdELE1BQU0sdUJBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztZQUN0RixNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzdDLE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDakQsQ0FBQztLQUFBO0lBTUssWUFBWTs7WUFDZCxPQUFPLG9CQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDOUIsQ0FBQztLQUFBO0NBQ0o7QUF6SUQsZ0RBeUlDIn0=