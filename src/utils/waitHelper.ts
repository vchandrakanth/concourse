import { browser, protractor, ElementFinder } from 'protractor';

import { VerboseLogger } from './logger';

import { PageHelper } from './pageHelper';

export class WaitHelper {
    static readonly EC = protractor.ExpectedConditions;

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
    static async waitForElement(targetElement: ElementFinder,
        timeout = PageHelper.DEFAULT_TIMEOUT,
        message = 'Element should exist') {
        VerboseLogger.logSelector(timeout, targetElement, 'exist');
        return browser.wait(this.EC.presenceOf(targetElement),
            timeout,
            targetElement.locator().toString() + message);
    }

    /**
     * Wait for an element to display
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     */
    static async waitForElementToBeDisplayed(targetElement: ElementFinder,
        timeout = PageHelper.DEFAULT_TIMEOUT,
        message = 'Element should be visible') {
        VerboseLogger.logSelector(timeout, targetElement, 'be visible');
        return browser.wait(this.EC.visibilityOf(targetElement),
            timeout,
            targetElement.locator().toString() + message)
            .then(() => true, () => false);
    }

    /**
     * Wait for an element to present
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     */
    static async waitForElementToBePresent(targetElement: ElementFinder,
        timeout = PageHelper.DEFAULT_TIMEOUT,
        message = 'Element should be visible') {
        VerboseLogger.logSelector(timeout, targetElement, 'be present');
        return browser.wait(this.EC.presenceOf(targetElement),
            timeout,
            targetElement.locator().toString() + message)
            .then(() => true, () => false);
    }

    /**
     * Wait for an element to hide
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     * @returns {any}
     */
    static async waitForElementToBeHidden(targetElement: ElementFinder,
        timeout = PageHelper.DEFAULT_TIMEOUT,
        message = 'Element should not be visible') {
        VerboseLogger.logSelector(timeout, targetElement, 'be invisible');
        return browser.wait(this.EC.invisibilityOf(targetElement),
            timeout,
            targetElement.locator().toString() + message);
    }

    /**
     * Wait for an element to become clickable
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     */
    static async waitForElementToBeClickable(targetElement: ElementFinder,
        timeout = PageHelper.DEFAULT_TIMEOUT,
        message = 'Element not clickable') {
        VerboseLogger.logSelector(timeout, targetElement, 'be clickable');
        try {
            await browser.wait(this.EC.elementToBeClickable(targetElement),
                timeout,
                targetElement.locator().toString() + message);
        } catch (e) {
        }
    }

    static async waitForElementToHaveText(targetElement: ElementFinder, timeout = PageHelper.DEFAULT_TIMEOUT, message = '') {
        await this.waitForElementToBePresent(targetElement);
        VerboseLogger.logSelector(timeout, targetElement, 'have text');
        await browser.wait(async () => (await targetElement.getText()).trimLeft().trimRight() !== '',
            timeout, message);
    }

    static async waitForElementOptionallyPresent(targetElement: ElementFinder, timeout = PageHelper.DEFAULT_TIMEOUT) {
        const isDisplayed = this.EC.presenceOf(targetElement);
        return browser.wait(isDisplayed, timeout).then(function () {
            return true;
        }, function () {
            return false;
        });
    }

    /**
     * Wait for an element to be enabled
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     * @returns {any}
     */
    static async waitForElementToBeEnabled(targetElement: ElementFinder,
        timeout = PageHelper.DEFAULT_TIMEOUT,
        message = 'Element not enabled') {
        return await browser.wait(targetElement.isEnabled(), timeout,
            targetElement.locator().toString() + message);
    }

    /**
     * Wait for an element to be selected
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     * @returns {any}
     */
    static async waitForElementToBeSelected(targetElement: ElementFinder,
        timeout = PageHelper.DEFAULT_TIMEOUT,
        message = 'Element not selected') {
        return await browser.wait(targetElement.isSelected(), timeout,
            targetElement.locator().toString() + message);
    }

    static async scrollIntoView2(element: ElementFinder) {

        await browser.controlFlow().execute(async function () {
            return await browser.executeScript('arguments[0].scrollIntoView(true)', element.getWebElement());
        });
    }
    static async waitAny(msTimeOut: number, ...elements: ElementFinder[]): Promise<any> {
        let proms: Promise<any>[] = [];
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
                proms.push(browser.waitSimple(element, interval).catch(() => null));
                // });
                return Promise.all(proms).then((res) => { // ) me.any.call(me.any,
                    browser.console(`waitAny result: [${res.join(',')}] - timeout:${msTimeOut}`);
                    if (msTimeOut <= 0 || res.filter(r => r === true).length > 0) {
                        return res; // at least one is visible/clickable
                    } else {
                        return this.waitAny(msTimeOut - interval, ...elements);
                    }
                }).catch((res) => {
                    debugger;
                });
            });
        }
    }
}