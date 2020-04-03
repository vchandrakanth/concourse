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
const logger_1 = require("../utils/logger");
// import { CheckboxHelper } from '../utils';
const elementHelper_1 = require("../utils/elementHelper");
const pageHelper_1 = require("../utils/pageHelper");
const validationHelper_1 = require("../utils/validationHelper");
const attributeTags_Po_1 = require("../pageObjects/attributeTags.Po");
let attributeTag = new attributeTags_Po_1.AttributeTag();
class ExpectHelper {
    // Verify whether an element is displayed or not
    static verifyDisplayedStatus(targetElement, elementName, refresh = true) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.StepLogger.verification(`${elementName} should display`);
            const isDisplayed = yield pageHelper_1.PageHelper.isElementDisplayed(targetElement);
            if (!isDisplayed && refresh) {
                yield protractor_1.browser.refresh();
                yield this.verifyDisplayedStatus(targetElement, elementName, false);
                return;
            }
            yield expect(yield pageHelper_1.PageHelper.isElementDisplayed(targetElement))
                .toBe(true, validationHelper_1.ValidationsHelper.getDisplayedValidation(elementName));
        });
    }
    // Verify whether the Page is displayed or not
    static verifyPageNavigation(targetElement, elementName) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.StepLogger.verification(`Page - ${elementName} should display`);
            yield expect(yield pageHelper_1.PageHelper.isElementDisplayed(targetElement))
                .toBe(true, validationHelper_1.ValidationsHelper.getPageDisplayedValidation(elementName));
        });
    }
    // Verify an element is not displayed
    static verifyNotDisplayedStatus(targetElement, elementName) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.StepLogger.verification(`${elementName} should not display`);
            yield expect(yield pageHelper_1.PageHelper.isElementPresent(targetElement, false))
                .toBe(false, validationHelper_1.ValidationsHelper.getDisplayedValidation(elementName));
        });
    }
    // Verify an element is displayed
    static verifyElementPresentStatus(targetElement, elementName) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.StepLogger.verification(`${elementName} should present`);
            yield expect(yield pageHelper_1.PageHelper.isElementPresent(targetElement))
                .toBe(true, validationHelper_1.ValidationsHelper.getDisplayedValidation(elementName));
        });
    }
    // Verify whether an element is hidden or not
    static verifyHiddenStatus(targetElement, elementName, toWait = true) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.StepLogger.verification(`${elementName} should be hidden`);
            yield expect(yield pageHelper_1.PageHelper.isElementHidden(targetElement, toWait))
                .toBe(true, validationHelper_1.ValidationsHelper.getDisplayedValidation(elementName));
        });
    }
    /**
     * Verify whether an element is hidden or not
     * @param {ElementFinder} targetElement
     * @param {string} elementName
     * @returns {Promise<void>}
     */
    // static async verifyCheckboxIsChecked(targetElement: ElementFinder, elementName: string) {
    //     StepLogger.verification(`${elementName} should be checked`);
    //     const checkBoxStatus = await CheckboxHelper.isCheckboxChecked(targetElement);
    //     await expect(checkBoxStatus).toBe(true, ValidationsHelper.getDisplayedValidation(elementName));
    // }
    // Verify whether an element is hidden or not
    static verifyRemovedStatus(targetElement, elementName) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.StepLogger.verification(`${elementName} should be removed`);
            yield expect(yield pageHelper_1.PageHelper.isElementHidden(targetElement))
                .toBe(true, validationHelper_1.ValidationsHelper.getDisplayedValidation(elementName));
        });
    }
    // Verify whether an element is enabled or not
    static verifyEnabledStatus(targetElement, elementName) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.StepLogger.verification(`${elementName} should be enabled`);
            yield expect(yield pageHelper_1.PageHelper.isElementEnabled(targetElement))
                .toBe(true, validationHelper_1.ValidationsHelper.getEnabledValidation(elementName));
        });
    }
    // Verify whether an element is present or not
    static verifyPresentStatus(targetElement, elementName) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.StepLogger.verification(`${elementName} should present`);
            yield expect(yield pageHelper_1.PageHelper.isElementPresent(targetElement))
                .toBe(true, validationHelper_1.ValidationsHelper.getDisplayedValidation(elementName));
        });
    }
    // Verify whether an element is Selected or not
    static verifySelectedStatus(targetElement, elementName) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.StepLogger.verification(`${elementName} should be selected`);
            yield expect(yield pageHelper_1.PageHelper.isElementSelected(targetElement))
                .toBe(true, validationHelper_1.ValidationsHelper.getSelectedValidation(elementName));
        });
    }
    // Verify whether an element is enabled or not
    static verifyDisabledStatus(targetElement, elementName) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.StepLogger.verification(`${elementName} should be disabled`);
            yield expect(yield pageHelper_1.PageHelper.isElementEnabled(targetElement))
                .toBe(false, validationHelper_1.ValidationsHelper.getDisabledValidation(elementName));
        });
    }
    // Verify that element has the exact text
    static verifyText(targetElement, elementName, expectedValue) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.StepLogger.verification(`${elementName} should have exact text as ${expectedValue} `);
            const value = (yield elementHelper_1.ElementHelper.getText(targetElement)).toLowerCase().trim();
            yield expect(value)
                .toBe(expectedValue.toLowerCase().trim(), validationHelper_1.ValidationsHelper.getFieldShouldHaveValueValidation(elementName, expectedValue, value));
        });
    }
    // Verify that value is grater than other value
    static verifyValueGraterThan(actualValue, expectedValue, elementName) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.StepLogger.verification(`${actualValue} should be grater than ${expectedValue} value`);
            yield expect(actualValue).toBeGreaterThan(expectedValue, validationHelper_1.ValidationsHelper.getGreaterThanValidation(actualValue, expectedValue, elementName));
        });
    }
    // Verify that value is less or equal than other value
    static verifyValueLessOrEqualTo(actualValue, expectedValue, elementName) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.StepLogger.verification(`${actualValue} should be less ot equal to ${expectedValue} value`);
            yield expect(actualValue).toBeLessThanOrEqual(expectedValue, validationHelper_1.ValidationsHelper.getLessThanOrEqualToValidation(actualValue, expectedValue, elementName));
        });
    }
    // Verify that value is Greater or equal than other value
    static verifyValueGreaterOrEqualTo(actualValue, expectedValue, elementName) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.StepLogger.verification(`${actualValue} should be greater or equal to ${expectedValue} value`);
            yield expect(actualValue).toBeGreaterThanOrEqual(expectedValue, validationHelper_1.ValidationsHelper.getGreaterThanOrEqualToValidation(actualValue, expectedValue, elementName));
        });
    }
    // Verify that checkbox is not checked
    static verifyCheckBoxNotSelected(targetElement, elementName) {
        return __awaiter(this, void 0, void 0, function* () {
            const actualValue = yield targetElement.isSelected();
            logger_1.StepLogger.verification(`${elementName} should not be selected`);
            yield expect(actualValue).toEqual(false, validationHelper_1.ValidationsHelper.getUnSelectedValidation(elementName));
        });
    }
    // Verify that attribute values is equal to expected Value
    static verifyAttributeValue(targetElement, attribute, expectedValue, elementName) {
        return __awaiter(this, void 0, void 0, function* () {
            const actualValue = yield pageHelper_1.PageHelper.getAttributeValue(targetElement, attribute);
            logger_1.StepLogger.verification(`${actualValue} should be equal to  ${expectedValue} value`);
            yield expect(actualValue).toEqual(expectedValue, validationHelper_1.ValidationsHelper.getEqualityValidation(actualValue, expectedValue, elementName));
        });
    }
    // Verify that attribute values is not equal to expected Value
    static verifyAttributeValueNotToBe(targetElement, attribute, expectedValue, elementName) {
        return __awaiter(this, void 0, void 0, function* () {
            const actualValue = yield pageHelper_1.PageHelper.getAttributeValue(targetElement, attribute);
            logger_1.StepLogger.verification(`${actualValue} should not be equal to  ${expectedValue} value`);
            yield !expect(actualValue).not.toBe(expectedValue, validationHelper_1.ValidationsHelper.getEqualityValidation(actualValue, expectedValue, elementName));
        });
    }
    // Verify that value is equal to other value
    static verifyStringValueEqualTo(actualValue, expectedValue, elementName) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.StepLogger.verification(`${actualValue} should be equal to  ${expectedValue} value`);
            yield expect(actualValue).toEqual(expectedValue, validationHelper_1.ValidationsHelper.getEqualityValidation(actualValue, expectedValue, elementName));
        });
    }
    // Verify an element contains expected string value
    static verifyStringValueContain(actualValue, expectedValue, elementName) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.StepLogger.verification(`'${actualValue}' should contains  '${expectedValue}' value`);
            yield expect(actualValue).toContain(expectedValue, validationHelper_1.ValidationsHelper.getEqualityValidation(actualValue, expectedValue, elementName));
        });
    }
    // Verify an element not contains expected string value
    static verifyStringValueNotContain(actualValue, expectedValue, elementName) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.StepLogger.verification(`'${actualValue}' should not contains '${expectedValue}' value`);
            yield expect(actualValue).not.toContain(expectedValue, validationHelper_1.ValidationsHelper.getEqualityValidation(actualValue, expectedValue, elementName));
        });
    }
    // Verify that actual value contains expected value
    static verifyActualValueContainsExpectedValue(actualValue, expectedValue, elementName) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.StepLogger.verification(`${actualValue} should contain ${expectedValue} value`);
            yield expect(actualValue).toContain(expectedValue.toLowerCase(), validationHelper_1.ValidationsHelper.getFieldShouldHaveValueValidation(elementName, expectedValue, elementName));
        });
    }
    // Verify that element contains text
    static verifyContainsText(targetElement, elementName, expectedValue) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.StepLogger.verification(`${elementName} should have contains text as ${expectedValue} `);
            yield expect((yield elementHelper_1.ElementHelper.getText(targetElement)).toLowerCase())
                .toContain(expectedValue.toLowerCase(), validationHelper_1.ValidationsHelper.getFieldShouldHaveValueValidation(elementName, expectedValue, elementName));
        });
    }
    // Verify that String value is not equal to other String value
    static verifyStringValueNotEqualTo(actualValue, expectedValue, elementName) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.StepLogger.verification(`${actualValue} should be equal to  ${expectedValue} value`);
            yield expect(actualValue).not.toBe(expectedValue, validationHelper_1.ValidationsHelper.getInequalityValidation(actualValue, expectedValue, elementName));
        });
    }
    // Verify that String is equal to other String
    static verifyEquality(actualValue, expectedValue, elementName) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.StepLogger.verification(`Field ${elementName} - ${actualValue} should be equal to  ${expectedValue} value`);
            yield expect(actualValue).toEqual(expectedValue, validationHelper_1.ValidationsHelper.getEqualityValidation(actualValue, expectedValue, elementName));
        });
    }
    // Verify that String is not equal to other String
    static verifyInequality(actualValue, expectedValue, elementName) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.StepLogger.verification(`Field ${elementName} - ${actualValue} should not be equal to  ${expectedValue} value`);
            yield expect(actualValue)
                .not.toBe(expectedValue, validationHelper_1.ValidationsHelper.getEqualityValidation(actualValue, expectedValue, elementName));
        });
    }
    // Verify that CSS Attribute values is equal to expected Value
    static verifyCssAttributeValue(targetElement, attribute, expectedValue, elementName) {
        return __awaiter(this, void 0, void 0, function* () {
            const actualValue = yield pageHelper_1.PageHelper.getCssValue(targetElement, attribute);
            logger_1.StepLogger.verification(`Field ${elementName} - ${actualValue} should be equal to  ${expectedValue} value`);
            yield expect(actualValue).toEqual(expectedValue, validationHelper_1.ValidationsHelper.getEqualityValidation(actualValue, expectedValue, elementName));
        });
    }
    // Verify that attribute values contains expected Value
    static verifyAttributeContains(targetElement, attribute, expectedValue, elementName) {
        return __awaiter(this, void 0, void 0, function* () {
            const actualValue = yield pageHelper_1.PageHelper.getAttributeValue(targetElement, attribute);
            logger_1.StepLogger.verification(`Field ${elementName} - ${actualValue} should contain  ${expectedValue} value`);
            yield expect(actualValue)
                .toContain(expectedValue, validationHelper_1.ValidationsHelper.getNotContainsValidation(actualValue, expectedValue, elementName));
        });
    }
    // Verify that attribute values does not contain Value
    static verifyAttributeNotContains(targetElement, attribute, expectedValue, elementName) {
        return __awaiter(this, void 0, void 0, function* () {
            const actualValue = yield pageHelper_1.PageHelper.getAttributeValue(targetElement, attribute);
            logger_1.StepLogger.verification(`Field ${elementName} - ${actualValue} should be equal to  ${expectedValue} value`);
            yield expect(actualValue)
                .not.toContain(expectedValue, validationHelper_1.ValidationsHelper.getContainsValidation(actualValue, expectedValue, elementName));
        });
    }
    // Verify that List Values are Sorting in Ascending Order
    static isListSortedAscending(sourceList, elementName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield expect(yield pageHelper_1.PageHelper.isListSorted(sourceList, true))
                .toBe(true, validationHelper_1.ValidationsHelper.getAscendingSortedValidation(elementName));
        });
    }
    // Verify that List Values are Sorting in Descending Order
    static isListSortedDescending(sourceList, elementName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield expect(yield pageHelper_1.PageHelper.isListSorted(sourceList, false))
                .toBe(true, validationHelper_1.ValidationsHelper.getDescendingSortedValidation(elementName));
        });
    }
    static expectDoesNotExists(element) {
        return __awaiter(this, void 0, void 0, function* () {
            // await browser.actions().mouseMove(element).perform();
            yield protractor_1.browser.sleep(3000);
            return yield element.isPresent().then(function (inDom) {
                expect(inDom)
                    .toBe(false); // returns bool
            });
        });
    }
    // Verify that the element exists in the List
    static isListElementExists(targetfinder, elementName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield logger_1.StepLogger.verification(`${targetfinder} should have contains text as ${elementName} `);
            yield expect((elementHelper_1.ElementHelper.getText(targetfinder)))
                .toMatch(elementName, validationHelper_1.ValidationsHelper.getFieldShouldHaveValueValidation(elementName, elementName, elementName));
        });
    }
    static expectExists(element) {
        return __awaiter(this, void 0, void 0, function* () {
            // await browser.actions().mouseMove(element).perform();
            return yield element.isPresent().then(function (inDom) {
                expect(inDom).toBe(true); // returns bool
            });
        });
    }
}
exports.ExpectHelper = ExpectHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwZWN0SGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9lMmUvc3JjL3V0aWxzL2V4cGVjdEhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDJDQUFvRDtBQUVwRCw0Q0FBNkM7QUFDN0MsNkNBQTZDO0FBQzdDLDBEQUF1RDtBQUN2RCxvREFBaUQ7QUFDakQsZ0VBQThEO0FBRTlELHNFQUErRDtBQUMvRCxJQUFJLFlBQVksR0FBRyxJQUFJLCtCQUFZLEVBQUUsQ0FBQztBQUV0QyxNQUFhLFlBQVk7SUFHckIsZ0RBQWdEO0lBQ2hELE1BQU0sQ0FBTyxxQkFBcUIsQ0FBQyxhQUE0QixFQUFFLFdBQW1CLEVBQUUsT0FBTyxHQUFHLElBQUk7O1lBQ2hHLG1CQUFVLENBQUMsWUFBWSxDQUFDLEdBQUcsV0FBVyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3pELE1BQU0sV0FBVyxHQUFHLE1BQU0sdUJBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN2RSxJQUFJLENBQUMsV0FBVyxJQUFJLE9BQU8sRUFBRTtnQkFDekIsTUFBTSxvQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN4QixNQUFNLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNwRSxPQUFPO2FBQ1Y7WUFDRCxNQUFNLE1BQU0sQ0FBQyxNQUFNLHVCQUFVLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLENBQUM7aUJBQzNELElBQUksQ0FBQyxJQUFJLEVBQ04sb0NBQWlCLENBQUMsc0JBQXNCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNuRSxDQUFDO0tBQUE7SUFHRCw4Q0FBOEM7SUFDOUMsTUFBTSxDQUFPLG9CQUFvQixDQUFDLGFBQTRCLEVBQUUsV0FBbUI7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