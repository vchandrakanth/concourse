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
const logger_1 = require("./logger");
const pageHelper_1 = require("./pageHelper");
class WaitHelper {
    /**
     * Default timeout for promises
     * @type {number}
     */
    /**
     * Wait for an element to exist
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     */
    static waitForElement(targetElement, timeout = pageHelper_1.PageHelper.DEFAULT_TIMEOUT, message = 'Element should exist') {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.VerboseLogger.logSelector(timeout, targetElement, 'exist');
            return protractor_1.browser.wait(this.EC.presenceOf(targetElement), timeout, targetElement.locator().toString() + message);
        });
    }
    /**
     * Wait for an element to display
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     */
    static waitForElementToBeDisplayed(targetElement, timeout = pageHelper_1.PageHelper.DEFAULT_TIMEOUT, message = 'Element should be visible') {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.VerboseLogger.logSelector(timeout, targetElement, 'be visible');
            return protractor_1.browser.wait(this.EC.visibilityOf(targetElement), timeout, targetElement.locator().toString() + message)
                .then(() => true, () => false);
        });
    }
    /**
     * Wait for an element to present
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     */
    static waitForElementToBePresent(targetElement, timeout = pageHelper_1.PageHelper.DEFAULT_TIMEOUT, message = 'Element should be visible') {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.VerboseLogger.logSelector(timeout, targetElement, 'be present');
            return protractor_1.browser.wait(this.EC.presenceOf(targetElement), timeout, targetElement.locator().toString() + message)
                .then(() => true, () => false);
        });
    }
    /**
     * Wait for an element to hide
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     * @returns {any}
     */
    static waitForElementToBeHidden(targetElement, timeout = pageHelper_1.PageHelper.DEFAULT_TIMEOUT, message = 'Element should not be visible') {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.VerboseLogger.logSelector(timeout, targetElement, 'be invisible');
            return protractor_1.browser.wait(this.EC.invisibilityOf(targetElement), timeout, targetElement.locator().toString() + message);
        });
    }
    /**
     * Wait for an element to become clickable
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     */
    static waitForElementToBeClickable(targetElement, timeout = pageHelper_1.PageHelper.DEFAULT_TIMEOUT, message = 'Element not clickable') {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.VerboseLogger.logSelector(timeout, targetElement, 'be clickable');
            try {
                yield protractor_1.browser.wait(this.EC.elementToBeClickable(targetElement), timeout, targetElement.locator().toString() + message);
            }
            catch (e) {
            }
        });
    }
    static waitForElementToHaveText(targetElement, timeout = pageHelper_1.PageHelper.DEFAULT_TIMEOUT, message = '') {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitForElementToBePresent(targetElement);
            logger_1.VerboseLogger.logSelector(timeout, targetElement, 'have text');
            yield protractor_1.browser.wait(() => __awaiter(this, void 0, void 0, function* () { return (yield targetElement.getText()).trimLeft().trimRight() !== ''; }), timeout, message);
        });
    }
    static waitForElementOptionallyPresent(targetElement, timeout = pageHelper_1.PageHelper.DEFAULT_TIMEOUT) {
        return __awaiter(this, void 0, void 0, function* () {
            const isDisplayed = this.EC.presenceOf(targetElement);
            return protractor_1.browser.wait(isDisplayed, timeout).then(function () {
                return true;
            }, function () {
                return false;
            });
        });
    }
    /**
     * Wait for an element to be enabled
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     * @returns {any}
     */
    static waitForElementToBeEnabled(targetElement, timeout = pageHelper_1.PageHelper.DEFAULT_TIMEOUT, message = 'Element not enabled') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield protractor_1.browser.wait(targetElement.isEnabled(), timeout, targetElement.locator().toString() + message);
        });
    }
    /**
     * Wait for an element to be selected
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     * @returns {any}
     */
    static waitForElementToBeSelected(targetElement, timeout = pageHelper_1.PageHelper.DEFAULT_TIMEOUT, message = 'Element not selected') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield protractor_1.browser.wait(targetElement.isSelected(), timeout, targetElement.locator().toString() + message);
        });
    }
    static scrollIntoView2(element) {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.controlFlow().execute(function () {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield protractor_1.browser.executeScript('arguments[0].scrollIntoView(true)', element.getWebElement());
                });
            });
        });
    }
    static waitAny(msTimeOut, ...elements) {
        return __awaiter(this, void 0, void 0, function* () {
            let proms = [];
            // let me = I;
            let ix = 0, l = elements.length;
            let ele = elements[ix];
            // let wrecu = me.waitSimple(ele, 1000)
            //     .then((ok)
            {
                //         ix = (ix + 1) % l;
                //     });
                let interval = 500;
                elements.forEach((element, ix) => {
                    proms.push(protractor_1.browser.waitSimple(element, interval).catch(() => null));
                    // });
                    return Promise.all(proms).then((res) => {
                        protractor_1.browser.console(`waitAny result: [${res.join(',')}] - timeout:${msTimeOut}`);
                        if (msTimeOut <= 0 || res.filter(r => r === true).length > 0) {
                            return res; // at least one is visible/clickable
                        }
                        else {
                            return this.waitAny(msTimeOut - interval, ...elements);
                        }
                    }).catch((res) => {
                        debugger;
                    });
                });
            }
        });
    }
}
exports.WaitHelper = WaitHelper;
WaitHelper.EC = protractor_1.protractor.ExpectedConditions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FpdEhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy93YWl0SGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkNBQWdFO0FBRWhFLHFDQUF5QztBQUV6Qyw2Q0FBMEM7QUFFMUMsTUFBYSxVQUFVO0lBR25COzs7T0FHRztJQUNIOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFPLGNBQWMsQ0FBQyxhQUE0QixFQUNwRCxPQUFPLEdBQUcsdUJBQVUsQ0FBQyxlQUFlLEVBQ3BDLE9BQU8sR0FBRyxzQkFBc0I7O1lBQ2hDLHNCQUFhLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDM0QsT0FBTyxvQkFBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFDakQsT0FBTyxFQUNQLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQztRQUN0RCxDQUFDO0tBQUE7SUFFRDs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBTywyQkFBMkIsQ0FBQyxhQUE0QixFQUNqRSxPQUFPLEdBQUcsdUJBQVUsQ0FBQyxlQUFlLEVBQ3BDLE9BQU8sR0FBRywyQkFBMkI7O1lBQ3JDLHNCQUFhLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDaEUsT0FBTyxvQkFBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsRUFDbkQsT0FBTyxFQUNQLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxPQUFPLENBQUM7aUJBQzVDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMs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