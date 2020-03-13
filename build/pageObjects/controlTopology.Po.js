"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
// import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
const utils_1 = require("../utils/utils");
const waitHelper_1 = require("../utils/waitHelper");
let configProperties = require('../conf/properties');
class ControlTopology {
    get controlTopologyMenu() { return protractor_1.element(protractor_1.by.xpath('//a[contains(.,"Control Topology")]')); }
    get plusOnDev() { return protractor_1.element(protractor_1.by.xpath('//div[@class="nodecontent ng-star-inserted selected"]//button[@class="btn btn-link text-white btn-sm add-child p-0 ng-star-inserted"]')); }
    get createNewOrganization() { return protractor_1.element(protractor_1.by.css('.fa-plus-circle')); }
    get organizationName() { return protractor_1.element(protractor_1.by.css('#name')); }
    get description() { return protractor_1.element(protractor_1.by.css('#description')); }
    get parentIdDropdown() { return protractor_1.element(protractor_1.by.xpath('//span[@class="dropdown-down"]')); }
    get selectDev() { return protractor_1.element(protractor_1.by.xpath('//li[.="Dev"]')); }
    get createButton() { return protractor_1.element(protractor_1.by.css('.Create')); }
    get toast() { return protractor_1.$('#toast-container'); }
    get chart() { return protractor_1.element(protractor_1.by.css('app-org-chart')); }
    createOrganization() {
        return __awaiter(this, void 0, void 0, function* () {
            // let temp = element(by.xpath('//th[contains(.,\'Name\')]'));
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield utils_1.elementClick(this.controlTopologyMenu);
            yield protractor_1.browser.logger.info('Control Topology Menu Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.chart, 5000, 'Chart displayed');
            // Click on '+' Button to Create new Organization
            // await browser.actions().mouseMove(this.createNewOrganization).perform();
            yield utils_1.elementClick(this.createNewOrganization);
            yield protractor_1.browser.logger.info('Clicked + Button');
            // Enter Organization Name
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.organizationName, 5000, 'Organization Name ');
            yield utils_1.elementSendkeys(this.organizationName, 'Test Org');
            yield protractor_1.browser.logger.info('Organization Name Entered');
            // Enter Organization Description
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.description, 5000, 'Organization Description ');
            yield utils_1.elementSendkeys(this.description, 'Test Org');
            yield protractor_1.browser.logger.info('Description Entered');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.parentIdDropdown, 5000, 'Drop Down ');
            yield utils_1.elementClick(this.parentIdDropdown);
            yield protractor_1.browser.logger.info('Drop Down');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.selectDev, 5000, 'Dev ');
            yield utils_1.elementClick(this.selectDev);
            yield protractor_1.browser.logger.info('Dev Selected');
            // Click On Create Button
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.createButton, 5000, 'Create ');
            yield utils_1.elementClick(this.createButton);
            yield protractor_1.browser.logger.info('Organization Submitted');
        });
    }
    getPageTitle() {
        return __awaiter(this, void 0, void 0, function* () {
            return protractor_1.browser.getTitle();
        });
    }
}
exports.ControlTopology = ControlTopology;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbFRvcG9sb2d5LlBvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3BhZ2VPYmplY3RzL2NvbnRyb2xUb3BvbG9neS5Qby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkNBQXdGO0FBQ3hGLHNGQUFzRjtBQUN0RiwwQ0FBK0Q7QUFDL0Qsb0RBQWlEO0FBSWpELElBQUksZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFFckQsTUFBYSxlQUFlO0lBRTFCLElBQUksbUJBQW1CLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RixJQUFJLFNBQVMsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEtBQUssQ0FBQyx1SUFBdUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RMLElBQUkscUJBQXFCLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRSxJQUFJLGdCQUFnQixLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNELElBQUksV0FBVyxLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdELElBQUksZ0JBQWdCLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RixJQUFJLFNBQVMsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RCxJ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