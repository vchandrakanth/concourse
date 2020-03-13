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
/**
 * Page helper for general utility
 */
const protractor_1 = require("protractor");
const elementHelper_1 = require("./elementHelper");
const waitHelper_1 = require("./waitHelper");
const utilsMath_1 = require("./utilsMath");
// const shortId = require('shortid');
const remote = require('selenium-webdriver/remote');
class PageHelper {
    static get isFullScreen() {
        const fullScreenScript = 'if (!window.screenTop && !window.screenY){return true;}'
            + 'else{return false;}';
        return protractor_1.browser.executeScript(fullScreenScript);
    }
    static actionKeyDown(key) {
        return protractor_1.browser.actions().keyDown(key).perform();
    }
    static executeInIframe(index, fn) {
        return __awaiter(this, void 0, void 0, function* () {
            protractor_1.browser.switchTo().frame(index);
            fn();
            yield protractor_1.browser.switchTo().defaultContent();
            yield protractor_1.browser.waitForAngular();
        });
    }
    static actionSendKeys(key) {
        return protractor_1.browser.actions().sendKeys(key).perform();
    }
    static sendKeysToInputField(elem, key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeEnabled(elem);
            yield elem.sendKeys(key);
        });
    }
    static actionKeyUp(key) {
        return protractor_1.browser.actions().keyUp(key).perform();
    }
    static keyPressForBrowser(key) {
        return protractor_1.browser.actions().sendKeys(key).perform();
    }
    static actionMouseUp(location) {
        return protractor_1.browser.actions().mouseUp(location).perform();
    }
    // Known issue for chrome, direct maximize window doesn't work
    /**
     * To maximize the browser window
     */
    static maximizeWindow() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.resizeWindow();
        });
    }
    static resizeHorizontally(height) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.resizeWindow(-1, height);
        });
    }
    static resizeVertically(width) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.resizeWindow(width);
        });
    }
    /**
     * To resize the browser window
     */
    static resizeWindow(width = -1, height = -1) {
        return __awaiter(this, void 0, void 0, function* () {
            class Size {
            }
            const windowSize = yield this.executeScript(function () {
                return {
                    width: window.screen.availWidth,
                    height: window.screen.availHeight,
                };
            });
            const result = windowSize;
            if (width !== -1) {
                result.width = width;
            }
            if (height !== -1) {
                result.height = height;
            }
            return this.setWindowSize(result.width, result.height);
        });
    }
    /**
     * Sets window size
     * @param {number} width
     * @param {number} height
     */
    static setWindowSize(width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            return protractor_1.browser.driver
                .manage()
                .window()
                .setSize(width, height);
        });
    }
    /**
     * Wrapper for executing javascript code
     * @param {string | Function} script
     * @param varAargs
     * @returns {promise.Promise<any>}
     */
    static executeScript(script, ...varAargs) {
        return __awaiter(this, void 0, void 0, function* () {
            return protractor_1.browser.driver.executeScript(script, varAargs);
        });
    }
    /**
     * Wrapper to return an active element
     * @returns {WebElementPromise}

     static async getFocusedElement() {
    return browser.driver.switchTo().activeElement()
  } */
    /**
     * Switch to a new tab if browser has availability
     * @returns {PromiseLike<boolean> | Promise<boolean> | Q.Promise<any> | promise.Promise<any> | Q.IPromise<any>}
     */
    static switchToNewTabIfAvailable(windowNumber = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const handles = yield protractor_1.browser.getAllWindowHandles();
            const newWindowHandle = handles[windowNumber]; // this is your new window
            if (newWindowHandle) {
                yield protractor_1.browser.switchTo().window(newWindowHandle);
            }
            const url = yield protractor_1.browser.getCurrentUrl();
            // Avoiding bootstraping issue, Known issue
            // Error: Error while waiting for Protractor to sync with the page:
            // "window.angular is undefined. This could be either because this is a non-angular page or
            // because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.
            // See http://git.io/v4gXM for details
            return protractor_1.browser.driver.get(url);
        });
    }
    static switchToFirstTab() {
        return __awaiter(this, void 0, void 0, function* () {
            const handles = yield protractor_1.browser.getAllWindowHandles();
            yield protractor_1.browser.driver.close();
            yield protractor_1.browser.switchTo().window(handles[0]);
        });
    }
    /**
     * Gets html attribute value
     * @param {WebElementPromise} elem
     * @param {string} attribute
     * @returns {string} attribute value
     */
    static getAttributeValue(elem, attribute) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(elem);
            const attributeValue = yield elem.getAttribute(attribute);
            return attributeValue.trim();
        });
    }
    /**
     * Click on element
     * @param {ElementFinder} targetElement
     * @returns {any}
     */
    static click(targetElement) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(targetElement);
            return targetElement.click();
        });
    }
    static clickIfPresent(targetElement) {
        return __awaiter(this, void 0, void 0, function* () {
            const isPresent = yield targetElement.isPresent();
            if (isPresent) {
                return this.click(targetElement);
            }
            return;
        });
    }
    /**
     * Click on the element and wait for it to get hidden
     * @param {ElementFinder} targetElement
     * @returns {PromiseLike<boolean> | Promise<boolean> | Q.Promise<any> | promise.Promise<any> | Q.IPromise<any>}
     */
    static clickAndWaitForElementToHide(targetElement) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(targetElement);
            yield targetElement.click();
            return waitHelper_1.WaitHelper.waitForElementToBeHidden(targetElement);
        });
    }
    /**
     * Click on element if displayed
     * @param {ElementFinder} targetElement
     * @param withoutJs
     * @returns {any}
     */
    static clickIfDisplayed(targetElement, withoutJs = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const isPresent = yield targetElement.isPresent();
            if (isPresent === true) {
                const isDisplayed = yield targetElement.isDisplayed();
                if (isDisplayed === true) {
                    if (withoutJs) {
                        yield PageHelper.click(targetElement);
                    }
                    else {
                        yield elementHelper_1.ElementHelper.clickUsingJs(targetElement);
                    }
                }
            }
        });
    }
    static getTextWithNoWait(elem) {
        return __awaiter(this, void 0, void 0, function* () {
            const text = yield elem.getText();
            return text;
        });
    }
    /**
     * Gets promise for current url
     * @returns {any}
     */
    static currentUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            return protractor_1.browser.getCurrentUrl();
        });
    }
    static getPageTitle() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield protractor_1.browser.getTitle();
        });
    }
    /**
     * Refresh a page
     *
     */
    static refreshPage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.refresh();
        });
    }
    static switchToFrame(frameEle) {
        return __awaiter(this, void 0, void 0, function* () {
            return protractor_1.browser.driver.switchTo().frame(frameEle.getWebElement());
        });
    }
    /**
     * Verify whether element is hidden on page or not
     * @param {ElementFinder} targetElement
     * @param {boolean} toWait
     * @returns {Promise<any>}
     */
    static isElementHidden(targetElement, toWait = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (toWait) {
                return protractor_1.browser.wait(() => __awaiter(this, void 0, void 0, function* () { return !(yield targetElement.isPresent()) || !(yield targetElement.isDisplayed()); })).then(() => true).catch(() => false);
            }
            return !(yield targetElement.isPresent()) || !(yield targetElement.isDisplayed());
        });
    }
    /**
     * Verify whether element is displayed on page or not
     * @param {ElementFinder} targetElement
     * @param {boolean} toWait
     * @param {number} timeout
     * @returns {Promise<boolean>}
     */
    static isElementDisplayed(targetElement, toWait = true, timeout = PageHelper.DEFAULT_TIMEOUT) {
        return __awaiter(this, void 0, void 0, function* () {
            let caughtException = false;
            if (toWait) {
                yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(targetElement, timeout)
                    .catch(() => caughtException = true);
            }
            return !caughtException && (yield targetElement.isDisplayed());
        });
    }
    /**
     * Verify whether element is present on page or not
     * @param {ElementFinder} targetElement
     * @param {boolean} toWait
     * @param {number} timeout
     * @returns {Promise<boolean>}
     */
    static isElementPresent(targetElement, toWait = true, timeout = PageHelper.DEFAULT_TIMEOUT) {
        return __awaiter(this, void 0, void 0, function* () {
            let caughtException = false;
            if (toWait) {
                yield waitHelper_1.WaitHelper.waitForElementToBePresent(targetElement, timeout)
                    .catch(() => caughtException = true);
            }
            return !caughtException && (yield targetElement.isPresent());
        });
    }
    /**
     * Verify whether element is enabled on page or not
     * @param {ElementFinder} targetElement
     * @param {boolean} toWait
     * @param {number} timeout
     * @returns {Promise<boolean>}
     */
    static isElementEnabled(targetElement, toWait = true, timeout = PageHelper.DEFAULT_TIMEOUT) {
        return __awaiter(this, void 0, void 0, function* () {
            let caughtException = false;
            if (toWait) {
                yield waitHelper_1.WaitHelper.waitForElementToBeEnabled(targetElement, timeout)
                    .catch(() => caughtException = true);
            }
            return !caughtException && (yield targetElement.isEnabled());
        });
    }
    /**
     * Verify whether element is selected on page or not
     * @param {ElementFinder} targetElement
     * @param {boolean} toWait
     * @param {number} timeout
     * @returns {Promise<boolean>}
     */
    static isElementSelected(targetElement, toWait = true, timeout = PageHelper.DEFAULT_TIMEOUT) {
        return __awaiter(this, void 0, void 0, function* () {
            let caughtException = false;
            if (toWait) {
                yield waitHelper_1.WaitHelper.waitForElementToBeSelected(targetElement, timeout)
                    .catch(() => caughtException = true);
            }
            return !caughtException && (yield targetElement.isSelected());
        });
    }
    static isListSorted(sourceList, isAscending) {
        let isSorted = true;
        const sortList = Object.assign([], sourceList);
        sortList.sort((a, b) => (((a < b) === isAscending) ? -1 : 1));
        for (let i = 0; i < sourceList.length; i++) {
            if (sourceList[i] !== sortList[i]) {
                isSorted = false;
                break;
            }
        }
        return isSorted;
    }
    /**
     * Gets innertext for all the elements
     * @param {WebElementPromise} elements
     * @returns {string} inner text
     */
    static getAllTexts(elements) {
        return __awaiter(this, void 0, void 0, function* () {
            const allTexts = yield elements.getText();
            return allTexts;
        });
    }
    static getText(elem) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(elem);
            yield protractor_1.browser.wait(() => __awaiter(this, void 0, void 0, function* () { return (yield elem.getText()).trim() !== ''; })).catch(() => false);
            const text = yield elem.getText();
            return text.trim();
        });
    }
    static getAllTextsInArray(elements) {
        return __awaiter(this, void 0, void 0, function* () {
            const allTexts = yield PageHelper.getAllTexts(elements);
            return utilsMath_1.UtilMath.cleanArray(allTexts);
        });
    }
    static switchToiFrame(frameOrIframeElement, sleepTime = PageHelper.timeout.xs) {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.waitForAngularEnabled(false);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(frameOrIframeElement);
            // Wait is needed to load the iframe properly
            yield protractor_1.browser.sleep(sleepTime);
            return yield protractor_1.browser.switchTo().frame(frameOrIframeElement.getWebElement());
        });
    }
    static switchToDefaultContent() {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.switchTo().defaultContent();
            yield protractor_1.browser.waitForAngularEnabled(true);
        });
    }
    static acceptAlert() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield protractor_1.browser.switchTo().alert().accept();
        });
    }
    static closeAlertIfPresent() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield protractor_1.browser.sleep(PageHelper.timeout.xs);
                yield protractor_1.browser.switchTo().alert().accept().then(null, function () {
                    protractor_1.browser.sleep(PageHelper.timeout.xs);
                });
            }
            catch (e) {
            }
        });
    }
    // static getUniqueId(): string {
    //     // noinspection reason: Giving error for unknown character function
    //     // noinspection Annotator
    //     shortId.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_');
    //     return shortId.generate().replace(/-/g, '').replace(/_/g, '');
    // }
    static getUniqueIdForCategory(length) {
        return Math.random().toString(36).substr(2, length);
    }
    // static getUniqueIdWithAlphabetsOnly() {
    //    return this.getUniqueId().replace(/[0-9]/g, '');
    // }
    static getUniqueIntId(size = 6) {
        // noinspection reason: Giving error for unknown character function
        // noinspection Annotator
        return Math.floor(Math.pow(10, size - 1) + Math.random() * 9 * Math.pow(10, size - 1)).toString();
    }
    static uploadFile(item, filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.setFileDetector(new remote.FileDetector());
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(item);
            yield item.sendKeys(filePath);
        });
    }
    static getAlertText(timeout = PageHelper.DEFAULT_TIMEOUT, message = 'Alert is not present') {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitForAlertToBePresent(timeout, message);
            return yield protractor_1.browser.driver.switchTo().alert().getText();
        });
    }
    /**
     * Wait for an alert to appear
     * @param {number} timeout in milliseconds
     * @param {string} message
     */
    static waitForAlertToBePresent(timeout = PageHelper.DEFAULT_TIMEOUT, message = 'Alert is not present') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield protractor_1.browser.wait(this.EC.alertIsPresent(), timeout, message);
        });
    }
    static sleepForXSec(milliseconds) {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.sleep(milliseconds);
        });
    }
    static randomString(size) {
        return __awaiter(this, void 0, void 0, function* () {
            let text = '';
            const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (let i = 0; i < size; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        });
    }
    static numberFromString(text) {
        return Number(text.replace(/\D+/g, ''));
    }
    /**
     * Gets innertext for all the elements
     * @param {WebElementPromise} elements
     * @returns {string} inner text
     */
    static getAllTextsInLowerCase(elements) {
        return __awaiter(this, void 0, void 0, function* () {
            const allTexts = [];
            const allItems = yield elements.asElementFinders_();
            for (const elem of allItems) {
                const elementText = yield this.getText(elem);
                allTexts.push(elementText.toLowerCase());
            }
            return allTexts;
        });
    }
    static replaceSpaceWithMinus(text) {
        return __awaiter(this, void 0, void 0, function* () {
            return text.replace(/\s+/g, '-');
        });
    }
    /**
     * Gets CSS attribute value
     * @param {WebElementPromise} elem
     * @param {string} attribute
     * @returns {string} attribute value
     */
    static getCssValue(elem, attribute) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(elem);
            const attributeValue = yield elem.getCssValue(attribute);
            return attributeValue.trim();
        });
    }
}
PageHelper.MAX_RETRY_ATTEMPTS = 3;
// noinspection JSValidateJSDoc
/**
 * Timeout collection to meet various needs
 * @type {{xs: number; s: number; m: number; l: number; xl: number; xxl: number; xxxl: number}}
 */
PageHelper.timeout = {
    xxs: 1000,
    xs: 2000,
    s: 5000,
    m: 10000,
    l: 25000,
    xl: 50000,
    xxl: 75000,
    xxxl: 200000,
    xxxxl: 500000,
};
PageHelper.DEFAULT_TIMEOUT = PageHelper.timeout.xxxl;
PageHelper.EC = protractor_1.protractor.ExpectedConditions;
exports.PageHelper = PageHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZUhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9wYWdlSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7R0FFRztBQUNILDJDQUFnRztBQUVoRyxtREFBZ0Q7QUFDaEQsNkNBQTBDO0FBQzFDLDJDQUF1QztBQUV2QyxzQ0FBc0M7QUFDdEMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUM7QUFFcEQsTUFBYSxVQUFVO0lBcUJuQixNQUFNLEtBQUssWUFBWTtRQUNuQixNQUFNLGdCQUFnQixHQUFHLHlEQUF5RDtjQUM1RSxxQkFBcUIsQ0FBQztRQUM1QixPQUFPLG9CQUFPLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBVztRQUM1QixPQUFPLG9CQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3BELENBQUM7SUFFRCxNQUFNLENBQU8sZUFBZSxDQUFDLEtBQTBCLEVBQUUsRUFBWTs7WUFDakUsb0JBQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEMsRUFBRSxFQUFFLENBQUM7WUFDTCxNQUFNLG9CQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDMUMsTUFBTSxvQkFBTyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25DLENBQUM7S0FBQTtJQUVELE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBVztRQUM3QixPQUFPLG9CQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3JELENBQUM7SUFFRCxNQUFNLENBQU8sb0JBQW9CLENBQUMsSUFBbUIsRUFBRSxHQUFX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