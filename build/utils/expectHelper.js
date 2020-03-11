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
const logger_1 = require("../utils/logger");
// import { CheckboxHelper } from '../utils';
const elementHelper_1 = require("../utils/elementHelper");
const pageHelper_1 = require("../utils/pageHelper");
const validationHelper_1 = require("../utils/validationHelper");
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
    // Verify that the element exists in the List
    static isListElementExists(targetfinder, elementName) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.StepLogger.verification(`${targetfinder} should have contains text as ${elementName} `);
            //    await expect((await ElementHelper.getText(targetfinder)).toLowerCase())
            yield expect((yield elementHelper_1.ElementHelper.getText(targetfinder)))
                // .toMatch(elementName.toLowerCase(),
                .toMatch(elementName, 
            // ValidationsHelper.getFieldShouldHaveValueValidation(elementName, elementName, elementName));
            validationHelper_1.ValidationsHelper.getFieldShouldHaveValueValidation(elementName, elementName, elementName));
        });
    }
    // element: ElementFinder)
    static expectDoesNotExists(element) {
        return __awaiter(this, void 0, void 0, function* () {
            // await browser.actions().mouseMove(element).perform();
            return yield element.isPresent().then(function (inDom) {
                expect(inDom).toBe(false); // returns bool
            });
        });
    }
    // element: ElementFinder)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwZWN0SGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2V4cGVjdEhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkNBQW9EO0FBRXBELDRDQUE2QztBQUM3Qyw2Q0FBNkM7QUFDN0MsMERBQXVEO0FBQ3ZELG9EQUFpRDtBQUNqRCxnRUFBOEQ7QUFFOUQsTUFBYSxZQUFZO0lBRXJCLGdEQUFnRDtJQUNoRCxNQUFNLENBQU8scUJBQXFCLENBQUMsYUFBNEIsRUFBRSxXQUFtQixFQUFFLE9BQU8sR0FBRyxJQUFJOztZQUNoRyxtQkFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLFdBQVcsaUJBQWlCLENBQUMsQ0FBQztZQUN6RCxNQUFNLFdBQVcsR0FBRyxNQUFNLHVCQUFVLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDdkUsSUFBSSxDQUFDLFdBQVcsSUFBSSxPQUFPLEVBQUU7Z0JBQ3pCLE1BQU0sb0JBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDeEIsTUFBTSxJQUFJLENBQUMscUJBQXFCLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDcEUsT0FBTzthQUNWO1lBQ0QsTUFBTSxNQUFNLENBQUMsTUFBTSx1QkFBVSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDO2lCQUMzRCxJQUFJLENBQUMsSUFBSSxFQUNOLG9DQUFpQixDQUFDLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDbkUsQ0FBQztLQUFBO0lBR0QsOENBQThDO0lBQzlDLE1BQU0sQ0FBTyxvQkFBb0IsQ0FBQyxhQUE0QixFQUFFLFdBQW1COztZQUMvRSxtQkFBVSxDQUFDLFlBQVksQ0FBQyxVQUFVLFdBQVcsaUJBQWlCLENBQUMsQ0FBQztZQUNoRSxNQUFNLE1BQU0sQ0FBQyxNQUFNLHVCQUFVLENBQUMsa0JBQWtCLENBQUMsYUFBYSxD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