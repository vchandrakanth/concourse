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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwZWN0SGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3V0aWxzL2V4cGVjdEhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDJDQUFvRDtBQUVwRCw0Q0FBNkM7QUFDN0MsNkNBQTZDO0FBQzdDLDBEQUF1RDtBQUN2RCxvREFBaUQ7QUFDakQsZ0VBQThEO0FBRTlELE1BQWEsWUFBWTtJQUVyQixnREFBZ0Q7SUFDaEQsTUFBTSxDQUFPLHFCQUFxQixDQUFDLGFBQTRCLEVBQUUsV0FBbUIsRUFBRSxPQUFPLEdBQUcsSUFBSTs7WUFDaEcsbUJBQVUsQ0FBQyxZQUFZLENBQUMsR0FBRyxXQUFXLGlCQUFpQixDQUFDLENBQUM7WUFDekQsTUFBTSxXQUFXLEdBQUcsTUFBTSx1QkFBVSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3ZFLElBQUksQ0FBQyxXQUFXLElBQUksT0FBTyxFQUFFO2dCQUN6QixNQUFNLG9CQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3hCLE1BQU0sSUFBSSxDQUFDLHFCQUFxQixDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3BFLE9BQU87YUFDVjtZQUNELE1BQU0sTUFBTSxDQUFDLE1BQU0sdUJBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztpQkFDM0QsSUFBSSxDQUFDLElBQUksRUFDTixvQ0FBaUIsQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ25FLENBQUM7S0FBQTtJQUdELDhDQUE4QztJQUM5QyxNQUFNLENBQU8sb0JBQW9CLENBQUMsYUFBNEIsRUFBRSxXQUFtQjs7WUFDL0UsbUJBQVUsQ0FBQyxZQUFZLENBQUMsVUFBVSxXQUFXLGlCQUFpQixDQUFDLENBQUM7WUFDaEUsTUFBTSxNQUFNLENBQUMsTUFBTSx1QkFBVSxDQUFDLGtCQUFrQixDQUFD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