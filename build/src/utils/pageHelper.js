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
exports.PageHelper = PageHelper;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZUhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9wYWdlSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7O0dBRUc7QUFDSCwyQ0FBZ0c7QUFFaEcsbURBQWdEO0FBQ2hELDZDQUEwQztBQUMxQywyQ0FBdUM7QUFFdkMsc0NBQXNDO0FBQ3RDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0FBRXBELE1BQWEsVUFBVTtJQXFCbkIsTUFBTSxLQUFLLFlBQVk7UUFDbkIsTUFBTSxnQkFBZ0IsR0FBRyx5REFBeUQ7Y0FDNUUscUJBQXFCLENBQUM7UUFDNUIsT0FBTyxvQkFBTyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQVc7UUFDNUIsT0FBTyxvQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNwRCxDQUFDO0lBRUQsTUFBTSxDQUFPLGVBQWUsQ0FBQyxLQUEwQixFQUFFLEVBQVk7O1lBQ2pFLG9CQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hDLEVBQUUsRUFBRSxDQUFDO1lBQ0wsTUFBTSxvQkFBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQzFDLE1BQU0sb0JBQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuQyxDQUFDO0tBQUE7SUFFRCxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQVc7UUFDN0IsT0FBTyxvQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNyRCxDQUFDO0lBRUQsTUFBTSxDQUFPLG9CQUFvQixDQUFDLElBQW1CLEVBQUUs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