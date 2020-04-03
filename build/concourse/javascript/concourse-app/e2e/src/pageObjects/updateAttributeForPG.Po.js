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
// Because this file references protractor, you'll need to have it as a project
// dependency to use 'protractor/globals'. Here is the full list of imports:
//
// import {browser, element, by, By, $, $$, ExpectedConditions}
//   from 'protractor/globals';
//
const protractor_1 = require("protractor");
const waitHelper_1 = require("../utils/waitHelper");
const utils_1 = require("../utils/utils");
const assetManager_Po_1 = require("../pageObjects/assetManager.Po");
let assetsManager = new assetManager_Po_1.AssetManager();
let configProperties = require('../conf/properties');
let path = require('path');
let remote = require('selenium-webdriver/remote');
class UpdateAttribute {
    constructor() {
        this.policyGroup = protractor_1.element(protractor_1.by.xpath('//h5[.="Violation Policy Group"]'));
        this.editAttributeTag = protractor_1.element(protractor_1.by.css('app-list-card[cardtitle="Assigned to Attribute Tags"] .btn'));
        this.attributeTagDropDown = protractor_1.element(protractor_1.by.css('.dropdown-down'));
        this.closeDropDown = protractor_1.element(protractor_1.by.css('.dropdown-up'));
        this.confirmButton = protractor_1.element(protractor_1.by.css('.Confirm'));
        this.toast = protractor_1.$('#toast-container');
        this.list = protractor_1.element(protractor_1.by.css('.list'));
    }
    uncheckAttribute(inValue) { return (protractor_1.element(protractor_1.by.xpath(`//li[*]/div[.='${inValue}']`))); }
    updateAttribute(inValue) { return protractor_1.element(protractor_1.by.xpath(`//div[.='${inValue}']`)); }
    updateAttributeForPG() {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.get('https://adhoc.concourse.company/policy-groups');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'List Displayed');
            yield protractor_1.browser.actions().mouseDown(this.policyGroup).perform();
            yield utils_1.elementClick(this.policyGroup);
            yield protractor_1.browser.logger.info('Select Policy Group');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.editAttributeTag, 5000, 'Attribute Drop Down Button');
            yield protractor_1.browser.actions().mouseDown(this.editAttributeTag).perform();
            yield utils_1.elementClick(this.editAttributeTag);
            yield protractor_1.browser.logger.info('Select Attribute Tags Edit Button');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.attributeTagDropDown, 5000, 'Attribute Drop Down Button');
            yield protractor_1.browser.actions().mouseDown(this.attributeTagDropDown).perform();
            yield utils_1.elementClick(this.attributeTagDropDown);
            yield protractor_1.browser.logger.info('Select Attribute Tags Drop Down Button');
            // await WaitHelper.waitForElementToBePresent(this.uncheckAttribute((configProperties.attributeTagData.violationAttributeName1)), 5000, 'uncheckAttribute ');
            // await browser.actions().mouseDown(this.uncheckAttribute(configProperties.attributeTagData.violationAttributeName1)).perform();
            // await elementClick(this.uncheckAttribute(configProperties.attributeTagData.violationAttributeName1));
            // await browser.logger.info('uncheckAttribute');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.updateAttribute(configProperties.attributeTagData.violationAttributeName1), 5000, 'updateAttribute ');
            yield protractor_1.browser.actions().mouseDown(this.updateAttribute(configProperties.attributeTagData.violationAttributeName1)).perform();
            yield utils_1.elementClick(this.updateAttribute(configProperties.attributeTagData.violationAttributeName1));
            yield protractor_1.browser.logger.info('updateAttribute ');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.closeDropDown, 5000, 'closeDropDown ');
            yield utils_1.elementClick(this.closeDropDown);
            yield protractor_1.browser.logger.info('closeDropDown');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.confirmButton, 5000, 'Confirm Button ');
            yield utils_1.elementClick(this.confirmButton);
            yield protractor_1.browser.logger.info('Confirm Changes ');
        });
    }
    getId() {
        return __awaiter(this, void 0, void 0, function* () {
            return protractor_1.browser.getCurrentUrl().then(function (url) {
                console.log(url);
                let entityId = [];
                entityId = url.split('/');
                return entityId[5];
            });
        });
    }
    getPageTitle() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield protractor_1.browser.getTitle();
        });
    }
}
exports.UpdateAttribute = UpdateAttribute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlQXR0cmlidXRlRm9yUEcuUG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL2UyZS9zcmMvcGFnZU9iamVjdHMvdXBkYXRlQXR0cmlidXRlRm9yUEcuUG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwrRUFBK0U7QUFDL0UsNEVBQTRFO0FBQzVFLEVBQUU7QUFDRiwrREFBK0Q7QUFDL0QsK0JBQStCO0FBQy9CLEVBQUU7QUFDRiwyQ0FBNEY7QUFDNUYsb0RBQWlEO0FBQ2pELDBDQUErRDtBQUMvRCxvRUFBOEQ7QUFDOUQsSUFBSSxhQUFhLEdBQUcsSUFBSSw4QkFBWSxFQUFFLENBQUM7QUFDdkMsSUFBSSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUVyRCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDM0IsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUM7QUFHbEQsTUFBYSxlQUFlO0lBQTVCO1FBRUksZ0JBQVcsR0FBRyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxDQUFDO1FBQ3BFLHFCQUFnQixHQUFHLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyw0REFBNEQsQ0FBQyxDQUFDLENBQUM7UUFDakcseUJBQW9CLEdBQUcsb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUd6RCxrQkFBYSxHQUFHLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQ2hELGtCQUFhLEdBQUcsb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDNUMsVUFBSyxHQUFHLGNBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzlCLFNBQUksR0FBRyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQXVEcEMsQ0FBQztJQTVERyxnQkFBZ0IsQ0FBQyxPQUFlLElBQUksT0FBTyxDQUFDLG9CQUFPLENBQUMsZUFBRSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hHLGVBQWUsQ0FBQyxPQUFlLElBQUksT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBT2pGLG9CQUFvQjs7WUFFdEIsTUFBTSx1QkFBVSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0RCxNQUFNLG9CQUFPLENBQUMsR0FBRyxDQUFDLCtDQUErQyxDQUFDLENBQUM7WUFFbkUsTUFBTSx1QkFBVSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixDQUFDLENBQUM7WUFDaEYsTUFBTSxvQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDOUQsTUFBTSxvQkFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNyQyxNQUFNLG9CQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBRWpELE1BQU0sdUJBQVUsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLDRCQUE0QixDQUFDLENBQUM7WUFDeEcsTUFBTSxvQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNuRSxNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDMUMsTUFBTSxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUNBQW1DLENBQUMsQ0FBQztZQUUvRCxNQUFNLHVCQUFVLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksRUFBRSw0QkFBNEIsQ0FBQyxDQUFDO1lBQzVHLE1BQU0sb0JBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdkUsTUFBTSxvQkFBWSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQzlDLE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHdDQUF3QyxDQUFDLENBQUM7WUFFcEUsNkpBQTZKO1lBQzdKLGlJQUFpSTtZQUNqSSx3R0FBd0c7WUFDeEcsaURBQWlEO1lBRWpELE1BQU0sdUJBQVUsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLHVCQUF1QixDQUFDLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixDQUFDLENBQUM7WUFDeEosTUFBTSxvQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM3SCxNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7WUFDcEcsTUFBTSxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUU5QyxNQUFNLHVCQUFVLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztZQUN6RixNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBRTNDLE1BQU0sdUJBQVUsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBQzFGLE1BQU0sb0JBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDdkMsTUFBTSxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUdsRCxDQUFDO0tBQUE7SUFDSyxLQUFLOztZQUNQLE9BQU8sb0JBQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHO2dCQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7Z0JBQ2xCLFFBQVEsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMxQixPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7S0FBQTtJQUVLLFlBQVk7O1lBQ2QsT0FBTyxNQUFNLG9CQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEMsQ0FBQztLQUFBO0NBQ0o7QUFqRUQsMENBaUVDIn0=