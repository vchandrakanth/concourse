import { browser, ElementFinder } from 'protractor';

import { StepLogger } from '../utils/logger';
// import { CheckboxHelper } from '../utils';
import { ElementHelper } from '../utils/elementHelper';
import { PageHelper } from '../utils/pageHelper';
import { ValidationsHelper } from '../utils/validationHelper';

export class ExpectHelper {

    // Verify whether an element is displayed or not
    static async verifyDisplayedStatus(targetElement: ElementFinder, elementName: string, refresh = true) {
        StepLogger.verification(`${elementName} should display`);
        const isDisplayed = await PageHelper.isElementDisplayed(targetElement);
        if (!isDisplayed && refresh) {
            await browser.refresh();
            await this.verifyDisplayedStatus(targetElement, elementName, false);
            return;
        }
        await expect(await PageHelper.isElementDisplayed(targetElement))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(elementName));
    }


    // Verify whether the Page is displayed or not
    static async verifyPageNavigation(targetElement: ElementFinder, elementName: string) {
        StepLogger.verification(`Page - ${elementName} should display`);
        await expect(await PageHelper.isElementDisplayed(targetElement))
            .toBe(true,
                ValidationsHelper.getPageDisplayedValidation(elementName));
    }


    // Verify an element is not displayed

    static async verifyNotDisplayedStatus(targetElement: ElementFinder, elementName: string) {
        StepLogger.verification(`${elementName} should not display`);
        await expect(await PageHelper.isElementPresent(targetElement, false))
            .toBe(false, ValidationsHelper.getDisplayedValidation(elementName));
    }


    // Verify an element is displayed

    static async verifyElementPresentStatus(targetElement: ElementFinder, elementName: string) {
        StepLogger.verification(`${elementName} should present`);
        await expect(await PageHelper.isElementPresent(targetElement))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(elementName));
    }


    // Verify whether an element is hidden or not

    static async verifyHiddenStatus(targetElement: ElementFinder, elementName: string, toWait = true) {
        StepLogger.verification(`${elementName} should be hidden`);
        await expect(await PageHelper.isElementHidden(targetElement, toWait))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(elementName));
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
    static async verifyRemovedStatus(targetElement: ElementFinder, elementName: string) {
        StepLogger.verification(`${elementName} should be removed`);
        await expect(await PageHelper.isElementHidden(targetElement))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(elementName));
    }

    // Verify whether an element is enabled or not
    static async verifyEnabledStatus(targetElement: ElementFinder, elementName: string) {
        StepLogger.verification(`${elementName} should be enabled`);
        await expect(await PageHelper.isElementEnabled(targetElement))
            .toBe(true,
                ValidationsHelper.getEnabledValidation(elementName));
    }

    // Verify whether an element is present or not
    static async verifyPresentStatus(targetElement: ElementFinder, elementName: string) {
        StepLogger.verification(`${elementName} should present`);
        await expect(await PageHelper.isElementPresent(targetElement))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(elementName));
    }

    // Verify whether an element is Selected or not
    static async verifySelectedStatus(targetElement: ElementFinder, elementName: string) {
        StepLogger.verification(`${elementName} should be selected`);
        await expect(await PageHelper.isElementSelected(targetElement))
            .toBe(true,
                ValidationsHelper.getSelectedValidation(elementName));
    }

    // Verify whether an element is enabled or not
    static async verifyDisabledStatus(targetElement: ElementFinder, elementName: string) {
        StepLogger.verification(`${elementName} should be disabled`);
        await expect(await PageHelper.isElementEnabled(targetElement))
            .toBe(false,
                ValidationsHelper.getDisabledValidation(elementName));
    }

    // Verify that element has the exact text
    static async verifyText(targetElement: ElementFinder, elementName: string, expectedValue: string) {
        StepLogger.verification(`${elementName} should have exact text as ${expectedValue} `);
        const value = (await ElementHelper.getText(targetElement)).toLowerCase().trim();
        await expect(value)
            .toBe(expectedValue.toLowerCase().trim(),
                ValidationsHelper.getFieldShouldHaveValueValidation(elementName, expectedValue, value));
    }

    // Verify that value is grater than other value
    static async verifyValueGraterThan(actualValue: number, expectedValue: number, elementName: string) {
        StepLogger.verification(`${actualValue} should be grater than ${expectedValue} value`);
        await expect(actualValue).toBeGreaterThan(
            expectedValue, ValidationsHelper.getGreaterThanValidation(actualValue, expectedValue, elementName));
    }

    // Verify that value is less or equal than other value
    static async verifyValueLessOrEqualTo(actualValue: number, expectedValue: number, elementName: string) {
        StepLogger.verification(`${actualValue} should be less ot equal to ${expectedValue} value`);
        await expect(actualValue).toBeLessThanOrEqual(
            expectedValue, ValidationsHelper.getLessThanOrEqualToValidation(actualValue, expectedValue, elementName));
    }

    // Verify that value is Greater or equal than other value
    static async verifyValueGreaterOrEqualTo(actualValue: number, expectedValue: number, elementName: string) {
        StepLogger.verification(`${actualValue} should be greater or equal to ${expectedValue} value`);
        await expect(actualValue).toBeGreaterThanOrEqual(
            expectedValue, ValidationsHelper.getGreaterThanOrEqualToValidation(actualValue, expectedValue, elementName));
    }

    // Verify that checkbox is not checked
    static async verifyCheckBoxNotSelected(targetElement: ElementFinder, elementName: string) {
        const actualValue = await targetElement.isSelected();
        StepLogger.verification(`${elementName} should not be selected`);
        await expect(actualValue).toEqual(
            false, ValidationsHelper.getUnSelectedValidation(elementName));
    }

    // Verify that attribute values is equal to expected Value
    static async verifyAttributeValue(targetElement: ElementFinder, attribute: string, expectedValue: string, elementName: string) {
        const actualValue = await PageHelper.getAttributeValue(targetElement, attribute);
        StepLogger.verification(`${actualValue} should be equal to  ${expectedValue} value`);
        await expect(actualValue).toEqual(
            expectedValue, ValidationsHelper.getEqualityValidation(actualValue, expectedValue, elementName));
    }

    // Verify that attribute values is not equal to expected Value
    static async verifyAttributeValueNotToBe(targetElement: ElementFinder,
        attribute: string,
        expectedValue: string,
        elementName: string
    ) {
        const actualValue = await PageHelper.getAttributeValue(targetElement, attribute);
        StepLogger.verification(`${actualValue} should not be equal to  ${expectedValue} value`);
        await !expect(actualValue).not.toBe(
            expectedValue, ValidationsHelper.getEqualityValidation(actualValue, expectedValue, elementName));
    }

    // Verify that value is equal to other value
    static async verifyStringValueEqualTo(actualValue: string, expectedValue: string, elementName: string) {
        StepLogger.verification(`${actualValue} should be equal to  ${expectedValue} value`);
        await expect(actualValue).toEqual(
            expectedValue, ValidationsHelper.getEqualityValidation(actualValue, expectedValue, elementName));
    }

    // Verify an element contains expected string value
    static async verifyStringValueContain(actualValue: string, expectedValue: string, elementName: string) {
        StepLogger.verification(`'${actualValue}' should contains  '${expectedValue}' value`);
        await expect(actualValue).toContain(
            expectedValue, ValidationsHelper.getEqualityValidation(actualValue, expectedValue, elementName));
    }

    // Verify an element not contains expected string value
    static async verifyStringValueNotContain(actualValue: string, expectedValue: string, elementName: string) {
        StepLogger.verification(`'${actualValue}' should not contains '${expectedValue}' value`);
        await expect(actualValue).not.toContain(
            expectedValue, ValidationsHelper.getEqualityValidation(actualValue, expectedValue, elementName));
    }

    // Verify that actual value contains expected value
    static async verifyActualValueContainsExpectedValue(actualValue: string, expectedValue: string, elementName: string) {
        StepLogger.verification(`${actualValue} should contain ${expectedValue} value`);
        await expect(actualValue).toContain(expectedValue.toLowerCase(),
            ValidationsHelper.getFieldShouldHaveValueValidation(elementName, expectedValue, elementName));
    }

    // Verify that element contains text
    static async verifyContainsText(targetElement: ElementFinder, elementName: string, expectedValue: string) {
        StepLogger.verification(`${elementName} should have contains text as ${expectedValue} `);
        await expect((await ElementHelper.getText(targetElement)).toLowerCase())
            .toContain(expectedValue.toLowerCase(),
                ValidationsHelper.getFieldShouldHaveValueValidation(elementName, expectedValue, elementName));
    }

    // Verify that String value is not equal to other String value
    static async verifyStringValueNotEqualTo(actualValue: string, expectedValue: string, elementName: string) {
        StepLogger.verification(`${actualValue} should be equal to  ${expectedValue} value`);
        await expect(actualValue).not.toBe(
            expectedValue, ValidationsHelper.getInequalityValidation(actualValue, expectedValue, elementName));
    }

    // Verify that String is equal to other String
    static async verifyEquality(actualValue: string, expectedValue: string, elementName: string) {
        StepLogger.verification(`Field ${elementName} - ${actualValue} should be equal to  ${expectedValue} value`);
        await expect(actualValue).toEqual(
            expectedValue, ValidationsHelper.getEqualityValidation(actualValue, expectedValue, elementName));
    }

    // Verify that String is not equal to other String
    static async verifyInequality(actualValue: string, expectedValue: string, elementName: string) {
        StepLogger.verification(`Field ${elementName} - ${actualValue} should not be equal to  ${expectedValue} value`);
        await expect(actualValue)
            .not.toBe(
                expectedValue, ValidationsHelper.getEqualityValidation(actualValue, expectedValue, elementName));
    }

    // Verify that CSS Attribute values is equal to expected Value
    static async verifyCssAttributeValue(targetElement: ElementFinder, attribute: string, expectedValue: string, elementName: string) {
        const actualValue = await PageHelper.getCssValue(targetElement, attribute);
        StepLogger.verification(`Field ${elementName} - ${actualValue} should be equal to  ${expectedValue} value`);
        await expect(actualValue).toEqual(
            expectedValue, ValidationsHelper.getEqualityValidation(actualValue, expectedValue, elementName));
    }

    // Verify that attribute values contains expected Value
    static async verifyAttributeContains(targetElement: ElementFinder, attribute: string, expectedValue: string, elementName: string) {
        const actualValue = await PageHelper.getAttributeValue(targetElement, attribute);
        StepLogger.verification(`Field ${elementName} - ${actualValue} should contain  ${expectedValue} value`);
        await expect(actualValue)
            .toContain(expectedValue,
                ValidationsHelper.getNotContainsValidation(actualValue, expectedValue, elementName));
    }

    // Verify that attribute values does not contain Value
    static async verifyAttributeNotContains(targetElement: ElementFinder, attribute: string, expectedValue: string, elementName: string
    ) {
        const actualValue = await PageHelper.getAttributeValue(targetElement, attribute);
        StepLogger.verification(`Field ${elementName} - ${actualValue} should be equal to  ${expectedValue} value`);
        await expect(actualValue)
            .not.toContain(
                expectedValue, ValidationsHelper.getContainsValidation(actualValue, expectedValue, elementName));
    }
    // Verify that List Values are Sorting in Ascending Order
    static async isListSortedAscending(sourceList: any[], elementName: string) {
        await expect(await PageHelper.isListSorted(sourceList, true))
            .toBe(true,
                ValidationsHelper.getAscendingSortedValidation(elementName));
    }
    // Verify that List Values are Sorting in Descending Order
    static async isListSortedDescending(sourceList: any[], elementName: string) {
        await expect(await PageHelper.isListSorted(sourceList, false))
            .toBe(true,
                ValidationsHelper.getDescendingSortedValidation(elementName));
    }
    // Verify that the element exists in the List
    static async isListElementExists(targetfinder: ElementFinder, elementName: string) {
        StepLogger.verification(`${targetfinder} should have contains text as ${elementName} `);
        //    await expect((await ElementHelper.getText(targetfinder)).toLowerCase())
        await expect((await ElementHelper.getText(targetfinder)))
            // .toMatch(elementName.toLowerCase(),
            .toMatch(elementName,
                // ValidationsHelper.getFieldShouldHaveValueValidation(elementName, elementName, elementName));
                ValidationsHelper.getFieldShouldHaveValueValidation(elementName, elementName, elementName));
    }
    // element: ElementFinder)
    static async expectDoesNotExists(element: ElementFinder) {
        // await browser.actions().mouseMove(element).perform();
        return await element.isPresent().then(function (inDom) {
            expect(inDom).toBe(false); // returns bool

        });
    }
    // element: ElementFinder)
    static async expectExists(element: ElementFinder) {
        // await browser.actions().mouseMove(element).perform();
        return await element.isPresent().then(function (inDom) {
            expect(inDom).toBe(true); // returns bool
        });
    }

    // static async getText (element: ElementFinder) {
    //     return element.execWithRetry('get text retry', () => {
    //     //    return element.wait(element)
    //           return await element.then(() => { return element.getText()
    //             .then((res) => console.log(() => 'text: \'' + res + '\'', res));
    //     }, null);
}
