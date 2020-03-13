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
WaitHelper.EC = protractor_1.protractor.ExpectedConditions;
exports.WaitHelper = WaitHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FpdEhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy93YWl0SGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQ0FBZ0U7QUFFaEUscUNBQXlDO0FBRXpDLDZDQUEwQztBQUUxQyxNQUFhLFVBQVU7SUFHbkI7OztPQUdHO0lBQ0g7Ozs7O09BS0c7SUFDSCxNQUFNLENBQU8sY0FBYyxDQUFDLGFBQTRCLEVBQ3BELE9BQU8sR0FBRyx1QkFBVSxDQUFDLGVBQWUsRUFDcEMsT0FBTyxHQUFHLHNCQUFzQjs7WUFDaEMsc0JBQWEsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUMzRCxPQUFPLG9CQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUNqRCxPQUFPLEVBQ1AsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDO1FBQ3RELENBQUM7S0FBQTtJQUVEOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFPLDJCQUEyQixDQUFDLGFBQTRCLEVBQ2pFLE9BQU8sR0FBRyx1QkFBVSxDQUFDLGVBQWUsRUFDcEMsT0FBTyxHQUFHLDJCQUEyQjs7WUFDckMsc0JBQWEsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUNoRSxPQUFPLG9CQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxFQUNuRCxPQUFPLEVBQ1AsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLE9BQU8sQ0FBQztpQkFDNUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxDQUFDO0tBQUE7SUFFRDs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBTyx5QkFBeUIsQ0FBQyxhQUE0QixFQUMvRCxPQUFPLEdBQUcsdUJBQVUsQ0FBQyxlQUFlLEVBQ3BDLE9BQU8sR0FBRywyQkFBMkI7O1lBQ3JDLHNCQUFhLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDaEUsT0FBTyxvQkFBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFDakQsT0FBTyxFQUNQLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxPQUFPLENBQUM7aUJBQzVDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsQ0FBQztLQUFBO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsTUFBTSxDQUFPLHdCQUF3QixDQUFDLGFBQTRCLEVBQzlELE9BQU8sR0FBRyx1QkFBVSxDQUFDLGVBQWUsRUFDcEMsT0FBTyxHQUFHLCtCQUErQjs7WUFDekMsc0JBQWEsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxjQUFjLENBQUMsQ0FBQztZQUNsRSxPQUFPLG9CQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxFQUNyRCxPQUFPLEVBQ1AsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDO1FBQ3RELENBQUM7S0FBQTtJQUVEOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFPLDJCQUEyQixDQUFDLGFBQTRCLEVBQ2pFLE9BQU8sR0FBRyx1QkFBVSxDQUFDLGVBQWUsRUFDcEMsT0FBTyxHQUFHLHVCQUF1Qjs7WUFDakMsc0JBQWEsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxjQUFjLENBQUMsQ0FBQztZQUNsRSxJQUFJO2dCQUNBLE1BQU0sb0JBQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsRUFDMUQsT0FBTyxFQUNQLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQzthQUNyRDtZQUFDLE9BQU8sQ0FBQyxFQUFFO2FBQ1g7UUFDTCxDQUFDO0tBQUE7SUFFRCxNQUFNLENBQU8sd0JBQXdCLENBQUMsYUFBNEIsRUFBRSxPQUFPLEdBQUcsdUJBQVUsQ0FBQyxlQUFlLEVBQUUsT0FBTyxHQUFHLEVBQUU7O1lBQ2xILE1BQU0sSUFBSSxDQUFDLHlCQUF5QixDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3BELHNCQUFhLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDL0QsTUFBTSxvQkFBTyxDQUFDLElBQUksQ0FBQyxHQUFTLEVBQUUsZ0RBQUMsT0FBQSxDQUFDLE1BQU0sYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFBLEdBQUEsRUFDeEYsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzFCLENBQUM7S0FBQTtJQUVELE1BQU0sQ0FBTywrQkFBK0IsQ0FBQyxhQUE0QixFQUFFLE9BQU8sR0FBRyx1QkFBVSxDQUFDLGVBQWU7O1lBQzNHLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3RELE9BQU8sb0JBQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDM0MsT0FBTyxJQUFJLENBQUM7WUFDaEIsQ0FBQyxFQUFFO2dCQUNDLE9BQU8sS0FBSyxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUFBO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsTUFBTSxDQUFPLHlCQUF5QixDQUFDLGFBQTRCLEVBQy9ELE9BQU8sR0FBRyx1QkFBVSxDQUFDLGVBQWUsRUFDcEMsT0FBTyxHQUFHLHFCQUFxQjs7WUFDL0IsT0FBTyxNQUFNLG9CQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQ3hELGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQztRQUN0RCxDQUFDO0tBQUE7SUFFRDs7Ozs7O09BTUc7SUFDSCxNQUFNLENBQU8sMEJBQTBCLENBQUMsYUFBNEIsRUFDaEUsT0FBTyxHQUFHLHVCQUFVLENBQUMsZUFBZSxFQUNwQyxPQUFPLEdBQUcsc0JBQXNCOztZQUNoQyxPQUFPLE1BQU0sb0JBQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxFQUFFLE9BQU8sRUFDekQsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDO1FBQ3RELENBQUM7S0FBQTtJQUVELE1BQU0sQ0FBTyxlQUFlLENBQUMsT0FBc0I7O1lBRS9DLE1BQU0sb0JBQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUM7O29CQUNoQyxPQUFPLE1BQU0sb0JBQU8sQ0FBQyxhQUFhLENBQUMsbUNBQW1DLEVBQUUsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7Z0JBQ3JHLENBQUM7YUFBQSxDQUFDLENBQUM7UUFDUCxDQUFDO0tBQUE7SUFDRCxNQUFNLENBQU8sT0FBTyxDQUFDLFNBQWlCLEVBQUUsR0FBRyxRQUF5Qjs7WUFDaEUsSUFBSSxLQUFLLEdBQW1CLEVBQUUsQ0FBQztZQUMvQixjQUFjO1lBQ2QsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQ2hDLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2Qix1Q0FBdUM7WUFDdkMsaUJBQWlCO1lBQ2pCO2dCQUNJLDZCQUE2QjtnQkFDN0IsVUFBVTtnQkFDVixJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUM7Z0JBQ25CLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUU7b0JBQzdCLEtBQUssQ0FBQyxJQUFJLENBQUMsb0JBQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNwRSxNQUFNO29CQUNOLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTt3QkFDbkMsb0JBQU8sQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsU0FBUyxFQUFFLENBQUMsQ0FBQzt3QkFDN0UsSUFBSSxTQUFTLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs0QkFDMUQsT0FBTyxHQUFHLENBQUMsQ0FBQyxvQ0FBb0M7eUJBQ25EOzZCQUFNOzRCQUNILE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsUUFBUSxFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUM7eUJBQzFEO29CQUNMLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO3dCQUNiLFFBQVEsQ0FBQztvQkFDYixDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDLENBQUMsQ0FBQzthQUNOO1FBQ0wsQ0FBQztLQUFBOztBQW5LZSxhQUFFLEdBQUcsdUJBQVUsQ0FBQyxrQkFBa0IsQ0FBQztBQUR2RCxnQ0FxS0MifQ==