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
const assetManager_Po_1 = require("./assetManager.Po");
let assetsManager = new assetManager_Po_1.AssetManager();
let configProperties = require('../conf/properties');
const pageHelper_1 = require("../utils/pageHelper");
let path = require('path');
let remote = require('selenium-webdriver/remote');
class PolicyViolation {
    get enclaveModel() { return protractor_1.element(protractor_1.by.xpath(`//td[.='${configProperties.enclaveModelData.enclaveModelName}']`)); }
    get enclaveModelEdit() { return protractor_1.element(protractor_1.by.css('.fa-edit')); }
    get chooseFile() { return protractor_1.element(protractor_1.by.css('input[type="file"]')); }
    get nextToEnclaveModelEvaluations() { return protractor_1.element(protractor_1.by.xpath('//button[.="Next"]')); }
    get nextToReviewEnclaveModel() { return protractor_1.element(protractor_1.by.xpath('//button[.="Next"]')); }
    get submitButton() { return protractor_1.element(protractor_1.by.xpath('//button[.="Submit"]')); }
    get toast() { return protractor_1.$('#toast-container'); }
    fileUload(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileToUpload = `e2e/src/conf/${filePath}`, absolutePath = path.resolve(process.cwd(), fileToUpload);
            yield pageHelper_1.PageHelper.uploadFile(this.chooseFile, absolutePath);
            //  return await element(by.css('input[type="file"]')).sendKeys(absolutePath);
        });
    }
    verifyPolicyViolation(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            // await WaitHelper.waitForElementToBeClickable(this.enclaveModel, 5000, 'enclaveModel');
            // await browser.actions().mouseDown(this.enclaveModel).perform();
            // await elementClick(this.enclaveModel);
            // await browser.logger.info('Enclave Model Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.enclaveModelEdit, 10000, 'Edit Page Opened');
            yield protractor_1.browser.actions().mouseDown(this.enclaveModelEdit).perform();
            yield utils_1.elementClick(this.enclaveModelEdit);
            yield waitHelper_1.WaitHelper.waitForElementToBeSelected(this.chooseFile, 2000, 'Choose File ');
            yield protractor_1.browser.logger.info('ChooseFile');
            yield waitHelper_1.WaitHelper.waitForElementToBeSelected(this.chooseFile, 2000, 'Choose File ');
            let fileToUpload = `e2e/src/conf/${fileName}`, absolutePath = path.resolve(process.cwd(), fileToUpload);
            yield pageHelper_1.PageHelper.uploadFile(this.chooseFile, absolutePath);
            yield protractor_1.browser.logger.info('S3 Template File Uploaded');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.nextToEnclaveModelEvaluations, 5000, 'Enclave Model Evaluations ');
            yield utils_1.elementClick(this.nextToEnclaveModelEvaluations);
            yield protractor_1.browser.logger.info('Moved to Review Enclave Model Page');
            // Select Review Enclave Model Page
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.nextToReviewEnclaveModel, 5000, 'Review Enclave Model ');
            yield utils_1.elementClick(this.nextToReviewEnclaveModel);
            yield protractor_1.browser.logger.info('Moved to Submit Page');
            yield protractor_1.browser.sleep(2000);
            // Click on Submit button to submit the EnClave Model
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.submitButton, 5000, 'Submit ');
            yield utils_1.elementClick(this.submitButton);
            yield protractor_1.browser.logger.info('Enclave Model Submitted');
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
exports.PolicyViolation = PolicyViolation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5VmlvbGF0aW9uLlBvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9lMmUvc3JjL3BhZ2VPYmplY3RzL3BvbGljeVZpb2xhdGlvbi5Qby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLCtFQUErRTtBQUMvRSw0RUFBNEU7QUFDNUUsRUFBRTtBQUNGLCtEQUErRDtBQUMvRCwrQkFBK0I7QUFDL0IsRUFBRTtBQUNGLDJDQUE0RjtBQUM1RixvREFBaUQ7QUFDakQsMENBQStEO0FBQy9ELHVEQUFpRDtBQUNqRCxJQUFJLGFBQWEsR0FBRyxJQUFJLDhCQUFZLEVBQUUsQ0FBQztBQUN2QyxJQUFJLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ3JELG9EQUFpRDtBQUNqRCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDM0IsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUM7QUFHbEQsTUFBYSxlQUFlO0lBR3hCLElBQUksWUFBWSxLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25ILElBQUksZ0JBQWdCLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUQsSUFBSSxVQUFVLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRSxJQUFJLDZCQUE2QixLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsS0FBSyxD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