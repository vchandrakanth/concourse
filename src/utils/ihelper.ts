import { locale } from 'moment';
import { protractor } from 'protractor/built/ptor';
import { browser, element, ElementFinder, ElementArrayFinder, by, promise, ExpectedConditions as EC } from 'protractor';
const when = promise.when, reject = Promise.reject;

const log = console.log;
const chalk = require('chalk');
const util = require('util');
import * as _ from 'lodash';
// import { StackHelper } from './stackHelper';
import { IHelperJasmineReporter as r } from './ihelper-jasmine-reporter';

import { IHelperNative } from './ihelper-native';
import { IHelper as I } from './ihelper';
import { async } from 'q';
class Common {
    saveError(err0: Error) {
        throw new Error('Method not implemented.');
    }
    fail(err: any) {
        throw new Error('Method not implemented.');
    }
    get useNative() { return IHelperNative; }
    enableLog = true;
    constructor() {
        this.start();
    }
    start = () => {
        let me = this;
        Object.keys(me).map(prop => {
            if (prop.indexOf('expect') >= 0) {
                me[prop] = _.wrap(me[prop], me.decoExpect);
            }
        });

    }

    get config(): IHelperConfig { return browser.params.cfg.IHelper; }

    ixnext = 0;
    log = (txt, res = null) => {
        if (I.enableLog) {
            if (!(typeof txt === 'string' || txt instanceof String || txt >= 0)) { txt = txt(); }
            log(chalk.gray(new Date().toISOString()), chalk.gray(_.repeat('*', I.level)), txt);
        }
        return res;
    }
    logGray = (txt, res = null) => {
        return I.log(chalk.gray(txt), res);
    }
    logYellow = (txt, res = null) => {
        return I.log(chalk.yellow(txt), res);
    }
    logWhite = (txt, res = null) => {
        return I.log(chalk.white(txt), res);
    }
    logGreen = (txt, res = null) => {
        return I.log(chalk.green(txt), res);
    }
    logRed = (txt, res = null) => {
        return I.log(chalk.red(txt), res);
    }
    logMagenta = (txt, res = null) => {
        return I.log(chalk.magenta(txt), res);
    }

    logT0 = (txt, res = null) => {
        return I.log(chalk.black.bgWhite.bold(txt), res);
    }
    logT1 = (txt, res = null) => {
        return I.log(chalk.bgBlue.bold(txt), res);
    }
    logWithChalk = (fn: (c) => string) => {
        let msg = fn(chalk);
        I.log(msg);
    }


    // TODO change log to event hooking if is available at javascript  or enabling logging at protractor capability level
    ////////////////////
    /// INTERACTIONS
    clear = (element: ElementFinder) => {
        return I.execWithRetry('clear element retry', () =>
            I.wait(element).then(() => element.clear()), null, 2, 0, true
        ).then(() => I.log('is clear'));
    }
    set = (element: ElementFinder, text: string) => {
        return I.clear(element).then(() =>
            I.execWithRetry('set text retry', () => element.sendKeys(text), null, 2, 0, true).then(() => I.log(`Set text:${text}`))
        );
    }
    getText = (element: ElementFinder) => {
        return I.execWithRetry('get text retry', () => {
            return I.wait(element)
                .then(() => { return element.getText(); })
                .then((res) => I.log(() => 'text: \'' + res + '\'', res));
        }, null, 2, 0, true);
    }
    getAttribute = (element: ElementFinder, attributeName: string) => {
        return I.wait(element)
            .then(() => { return element.getAttribute(attributeName); })
            .then((res) => I.log(() => 'attribute \'' + attributeName + '\': \'' + res + '\'', res));
    }

    // me.$('')
    getElementByCssContainingText(text, css: string, baseElement: ElementFinder = null) {
        if (baseElement) {
            let locator = baseElement.locator();
            let slocator = '' + locator;
            // I.log(`getElementByText ${base} by xpath => ${path}`);
            // return baseElement.element(by.xpath(path));
            let css0 = baseElement.locator().value + css;
            I.log(`getElementByText by css => ${css0}`);
            return element(by.cssContainingText(css0, text));
        }
        I.log(`getElementByText element by (css,text) => (${text},${css})`);
        return element(by.cssContainingText(css, text));
        // I.log(`getElementByText by path element ${path}`);
        // return element(by.xpath(path));
    }
    // recreated from https://github.com/kriskowal/q/blob/v1/q.js
    any = (...promises: promise.Promise<any>[]): promise.Promise<any> => {
        let Q = { resolve: promise.fulfilled, defer: promise.defer };
        let when = promise.when;

        if (promises.length === 0) {
            return Q.resolve();
        }

        let deferred = Q.defer();

        let pendingCount = 0;
        promises.reduce(<any>function (prev, current, index) {
            let promise = promises[index];

            pendingCount++;

            when(promise, onFulfilled, onRejected); // onProgress
            function onFulfilled(result) {
                let ixfound = index;
                deferred.fulfill({ res: result, ix: ixfound }); // deferred.resolve(result);
            }
            function onRejected(err) {
                pendingCount--;
                if (pendingCount === 0) {
                    err.message = ('Q can\'t get fulfillment value from any promise, all ' +
                        'promises were rejected. Last error message: ' + err.message);
                    deferred.reject(err); // try with throw if err is not recovered
                }
            }
            // function onProgress(progress) {
            //     deferred.notify({
            //         index: index,
            //         value: progress
            //     });
            // }
        }, undefined);

        return deferred.promise;
    }

    // TODO multi wait work in progress, pending adding timeouts and retry
    // purpose after a click (4 exmple) check if element found is an error or if it is succesful
    waitAny = (msTimeOut: number, ...elements: ElementFinder[]): promise.Promise<any> => {
        let proms: promise.Promise<any>[] = [];
        let me = I;
        let ix = 0, l = elements.length;
        let ele = elements[ix];
        // let wrecu = me.waitSimple(ele, 1000)
        //     .then((ok) => {
        //         ix = (ix + 1) % l;
        //     });

        let interval = 500;
        elements.forEach((element, ix) => {
            proms.push(me.waitSimple(element, interval).catch(() => null));
        });
        return promise.all(proms).then((res) => { // ) me.any.call(me.any,
            I.logGray(`waitAny result: [${res.join(',')}] - timeout:${msTimeOut}`);
            if (msTimeOut <= 0 || res.filter(r => r === true).length > 0) {
                return res; // at least one is visible/clickable
            } else {
                return this.waitAny(msTimeOut - interval, ...elements);
            }
        }).catch((res) => {
            debugger;
        });
    }
    // TODO check why controlflow is need it here to properly sequence this chained promises
    waitSimple = (waitForElement: ElementFinder, timeout: number = null) => browser.driver.wait(EC.elementToBeClickable(waitForElement), timeout); // OPEN Issue ==> clickeable even there is something covering it https://github.com/angular/protractor/issues/2139
    //     browser.driver.controlFlow().execute(() =>
    //         browser.driver.wait(waitForElement.isPresent(), timeout))
    //         .then((res) => browser.driver.wait(waitForElement.isDisplayed(), timeout / 4))
    clickAndWaitToHide = (waitForElement: ElementFinder, timeout: number = 20000) => {
        return I.click(waitForElement).then(() => {
            return I.promise2Boolean(browser.wait(EC.invisibilityOf(waitForElement), timeout))
                .then((is) => {
                    if (!is) { throw new Error('clickAndWaitToHide timeout, elemnt is still visible'); }
                    else { I.logGray('clickAndWaitToHide element is hidden'); }
                }).catch(err => {
                    if (err.name === 'UnexpectedAlertOpenError') {
                        I.logYellow(`UnexpectedAlertOpenError workaround`);
                        return browser.switchTo().alert().then(function (alert) { alert.accept(); }); // .catch(() => { });
                    }
                });
        });
    }

    contains = (arr: any[], st: string) => (arr.findIndex((o) => st.indexOf(o) >= 0) >= 0);
    async wait2(element: ElementFinder = null, timeouts = null, maxretry = 2) {
        if (!timeouts) timeouts = I.config.timeout;
        let locator = null;
        return await I.exec('wait', async function () {
            if (!element) return;
            locator = element.locator();
            I.level++;
            I.log(() => ('locator: ' + locator));
            return await browser.driver
                .wait(EC.presenceOf(element), timeouts.wait.isPresent) // () => element.isPresent()
                .then(() => I.logGray('is present'))
                .then(() => browser.driver.wait(EC.visibilityOf(element), timeouts.wait.isDisplayed).catch(() => false))
                .then(isvisible => {
                    if (!isvisible) {
                        return I.execWithRetry('scroll retry', () => { return I.scrollIntoView(element); },
                            () => {
                                return <any>browser.wait(EC.presenceOf(element), timeouts.wait.isDisplayed).catch(() => false);
                            }, 3, 0, true); // 'scroll retry filed');
                        // return I.scrollIntoView(element)
                        //     .then(() => browser.wait(EC.presenceOf(element), timeouts.wait.isDisplayed).catch(() => false)
                        //         // .then(() => browser.driver.wait(() => element.isDisplayed(), timeouts.wait.isDisplayed)
                        //         .then((st) => { // temporal scroll / wait retry fix
                        //             if (!st) {
                        //                 I.logGray(' waiting isDisplayed timeout, trying to scroll 2nd time.');
                        //                 return I.scrollIntoView(element)
                        //                     .then(() => browser.wait(EC.presenceOf(element), timeouts.wait.isDisplayed2))
                        //                     // .then(() => browser.driver.wait(() => element.isDisplayed(), timeouts.wait.isDisplayed2))
                        //                     .catch(() => {
                        //                         I.logGray(' waiting isDisplayed timeout, trying to scroll 3rd and last time.');
                        //                         return I.scrollIntoView(element);
                        //                     })
                        //                     .then(() => browser.driver.wait(() => element.isDisplayed(), timeouts.wait.isDisplayedLast));

                        //             }
                        //         })
                        //     );
                    }
                })
                .then(() => I.logGray('is displayed'))
                .then(() => browser.driver.wait(() => element.isEnabled(), timeouts.wait.isEnabled))
                .then(() => I.logGray('is enabled'))
                .then(() => I.level--)
                .catch((err) => { // retries
                    let arr = ['unexpected alert open', 'stale element reference: element is not attached', 'No element found using locator'];
                    if (I.contains(arr, err.message) && maxretry > 0) {
                        maxretry--;
                        I.logYellow('wait helper error - retrying.. tries left:' + maxretry);
                        I.logYellow('error' + err.message);
                        return I.wait(element, timeouts, maxretry);
                    } else {
                        let msg = `locator: '${locator}',  ${err.message}`;
                        I.logRed(msg);
                        // I.saveError(err, <any>{ msg: msg });
                        throw err;
                    }
                });
        }, I.waitColors);
    }




    wait = (element: ElementFinder = null, timeouts = null, maxretry = 2): promise.Promise<any> => {
        if (!timeouts) timeouts = I.config.timeout;
        let locator = null;
        return I.exec('wait', () => {
            if (!element) return;
            locator = element.locator();
            I.level++;
            I.log(() => ('locator: ' + locator));
            return browser.driver
                .wait(EC.presenceOf(element), timeouts.wait.isPresent) // () => element.isPresent()
                .then(() => I.logGray('is present'))
                .then(() => browser.driver.wait(EC.visibilityOf(element), timeouts.wait.isDisplayed).catch(() => false))
                .then(isvisible => {
                    if (!isvisible) {
                        return I.execWithRetry('scroll retry', () => { return I.scrollIntoView(element); },
                            () => {
                                return <any>browser.wait(EC.presenceOf(element), timeouts.wait.isDisplayed).catch(() => false);
                            }, 3, 0, true); // 'scroll retry filed');
                        // return I.scrollIntoView(element)
                        //     .then(() => browser.wait(EC.presenceOf(element), timeouts.wait.isDisplayed).catch(() => false)
                        //         // .then(() => browser.driver.wait(() => element.isDisplayed(), timeouts.wait.isDisplayed)
                        //         .then((st) => { // temporal scroll / wait retry fix
                        //             if (!st) {
                        //                 I.logGray(' waiting isDisplayed timeout, trying to scroll 2nd time.');
                        //                 return I.scrollIntoView(element)
                        //                     .then(() => browser.wait(EC.presenceOf(element), timeouts.wait.isDisplayed2))
                        //                     // .then(() => browser.driver.wait(() => element.isDisplayed(), timeouts.wait.isDisplayed2))
                        //                     .catch(() => {
                        //                         I.logGray(' waiting isDisplayed timeout, trying to scroll 3rd and last time.');
                        //                         return I.scrollIntoView(element);
                        //                     })
                        //                     .then(() => browser.driver.wait(() => element.isDisplayed(), timeouts.wait.isDisplayedLast));

                        //             }
                        //         })
                        //     );
                    }
                })
                .then(() => I.logGray('is displayed'))
                .then(() => browser.driver.wait(() => element.isEnabled(), timeouts.wait.isEnabled))
                .then(() => I.logGray('is enabled'))
                .then(() => I.level--)
                .catch((err) => { // retries
                    let arr = ['unexpected alert open', 'stale element reference: element is not attached', 'No element found using locator'];
                    if (I.contains(arr, err.message) && maxretry > 0) {
                        maxretry--;
                        I.logYellow('wait helper error - retrying.. tries left:' + maxretry);
                        I.logYellow('error' + err.message);
                        return I.wait(element, timeouts, maxretry);
                    } else {
                        let msg = `locator: '${locator}',  ${err.message}`;
                        I.logRed(msg);
                        // I.saveError(err, <any>{ msg: msg });
                        throw err;
                    }
                });
        }, I.waitColors);
    }

    //         clickableElement.getLocation().then((loc)=>loc.)
    // ele = (IWebElement)((IJavaScriptExecutor)driver).ExecuteScript(
    //     "return document.elementFromPoint(arguments[0], arguments[1])",
    //     Cursor.Position.X, Cursor.Positio

    public JSClick = (clickableElement: ElementFinder) => {
        try {
            return clickableElement.getWebElement().then((we) => browser.driver.executeScript('arguments[0].click()', we));
        } catch (error) {
            let msg = 'warning clicking - JSClick fail, element not clickable. locator:' + clickableElement.locator();
            I.logRed(msg + I.JSONStringify(error));
            // me.expectToBe(when(false), true, msg + (error.message ? error.message : ''));
            // I.saveError(error, <any>{ msg: msg });
            throw error;
        }
        // return clickableElement.getWebElement().then((we) => browser.driver.executeScript('arguments[0].click()', we))
        //     .catch((error) => {
        //         let msg = 'warning clicking - JSClick fail, element not clickable. locator:' + clickableElement.locator();
        //         I.logRed(msg + I.JSONStringify(error));
        //         // me.expectToBe(when(false), true, msg + (error.message ? error.message : ''));
        //         I.saveError(error, <any>{ msg: msg });
        //         throw error;
        //     });
    }


    click = (clickableElement: ElementFinder, ...waitNews: ElementFinder[]) => { // , useJs = false
        let useJs = false;
        // browser.sleep(1000);
        return I.exec('click', () =>
            I.wait(clickableElement)
                .catch((error) => I.logYellow('click - warning waiting, now trying with EC .. prev error: ' + I.JSONStringify(error)))
                .then(() => {
                    if (!useJs) {
                        return I.clickRetry(clickableElement);
                    }
                    else {
                        I.logYellow('click - warning clicking thru js forced by param');
                        return I.JSClick(clickableElement);
                    }
                })
                .then(() => I.logWhite('clicked'))
                .then(() => {
                    if (!(waitNews && waitNews.length > 0)) {
                        I.log('click - (not waiting for element after click)');
                        return;
                    }
                    return I.wait(waitNews[0]);
                })
            , I.clickColors);

    }
    clickRetry = (clickableElement: ElementFinder, maxretry = 4) => {
        let isClickable = EC.elementToBeClickable(clickableElement);
        return browser.driver.wait(isClickable, I.config.timeout.wait.isClickable)
            .then(() => I.logGray('is clickable'))
            .then(() => clickableElement.click()) // could be enhanced with check-retry
            .catch((error) => {
                if (maxretry >= 0) {
                    // retry //  is not clickable at point after been clickable (running condition with intermitent element)
                    return browser.sleep(1000).then(() => I.clickRetry(clickableElement, maxretry - 1));
                }
                else {
                    I.logYellow('click - warning clicking - element not clickable. ' + I.JSONStringify(error));
                    return I.JSClick(clickableElement);
                }
            });
    }
    /**
     * @param  {string} retryName
     * @param  {()=>promise.Promise<any>} func
     * @param  {(t:any)=>promise.Promise<boolean>} testCondition
     * @param  {} maxretry=10
     * @param  {} sleepStep=1000
     * @param  {string[]=null} retryIfErrorContains
     */
    execWithRetry<T>(retryName: string, func: () => promise.Promise<T>, testCondition: (t: any) => promise.Promise<boolean> = null, maxretry = 10, sleepStep = 1000, failedRetryThrowError: boolean, retryIfErrorContains: string[] = null): promise.Promise<T> {
        let result: T;
        testCondition = testCondition || (() => promise.when(true));
        return func() // could be enhanced with check-retry
            .then(fr => { result = fr; return fr; })
            .then(testCondition)
            .then((tcr) => { if (!tcr) throw new Error('condition is false'); })
            .then(() => result)
            .catch((err) => { // retries
                if (!err) { err = new Error('empty error'); }
                let arr = retryIfErrorContains; // ['unexpected alert open', 'stale element reference: element is not attached', 'No element found using locator'];
                if (maxretry > 0 && (arr === null || (I.contains(arr, err.message) && maxretry > 0))) {
                    maxretry--;
                    I.logYellow('error: ' + err.message);
                    I.logYellow(`${retryName} - retrying.. tries left:${maxretry}`);
                    return browser.sleep(sleepStep).then(() => this.execWithRetry(retryName, func, testCondition, maxretry, sleepStep, failedRetryThrowError, retryIfErrorContains));
                } else {
                    let msg = `${retryName} - failed retrying ,  ${err.message}`;
                    I.logRed(msg);
                    if (failedRetryThrowError) {
                        // I.saveError(err, <any>{ msg: msg });
                        throw err;
                    } else {
                        return result;
                    }
                }
            });
    }

    promise2Boolean = (a: promise.Promise<any>): promise.Promise<boolean> => a.then((r) => ((r !== false) ? true : false)).catch(() => false);
    waitElementIsPresent = (element: ElementFinder, time: number = null, errormessage: string = null, countExpect = true) => {
        return browser.wait(EC.presenceOf(element), (!time ? I.config.timeout.wait.isPresent : time), errormessage).then(() => { if (countExpect) expect(true).toBe(true); return true; }).catch(err => false);
    }
    waitElementIsNotPresent = (element: ElementFinder, time: number = null, errormessage: string = null, countExpect = true) => {
        return browser.wait(EC.stalenessOf(element), (!time ? I.config.timeout.wait.isPresent : time), errormessage).then(() => { if (countExpect) expect(true).toBe(true); });
    }
    waitElementIsVisible = (element: ElementFinder, time: number = null, errormessage: string = null, countExpect = true) => {
        return browser.wait(EC.visibilityOf(element), (!time ? I.config.timeout.wait.isDisplayed : time), errormessage).then(() => { if (countExpect) expect(true).toBe(true); });
    }
    // like inner text
    waitElementText = (element: ElementFinder, text: string, time: number = null, errormessage: string = null, countExpect = true) => {
        return browser.wait(EC.textToBePresentInElement(element, text), (!time ? I.config.timeout.wait.isDisplayed : time), errormessage).then(() => { if (countExpect) expect(true).toBe(true); });
    }
    // like input value
    waitElementValue = (element: ElementFinder, text: string, time: number = null, errormessage: string = null, countExpect = true) => {
        return browser.wait(EC.textToBePresentInElementValue(element, text), (!time ? I.config.timeout.wait.isDisplayed : time), errormessage).then(() => { if (countExpect) expect(true).toBe(true); });
    }

    clickDouble = (clickableElement: ElementFinder, waitNew: ElementFinder) => {
        return I.exec('doubleClick', () =>
            I.wait(clickableElement)
                .catch((error) => I.logYellow('click - warning waiting, now trying with EC .. prev error: ' + I.JSONStringify(error)))
                .then(() => {
                    let isClickable = EC.elementToBeClickable(clickableElement);
                    return browser.driver.wait(isClickable, I.config.timeout.wait.isClickable)
                        .then(() => I.logGray('is clickable'))
                        .then(() => browser.actions().doubleClick(clickableElement).perform())
                        .catch((error) => {
                            I.logYellow('click - warning clicking - element not clickable. ' + I.JSONStringify(error));
                            return I.JSClick(clickableElement);
                        });
                })
                .then(() => I.logWhite('double clicked'))
                .then(() => {
                    return I.wait(waitNew);
                })
            , I.clickColors);

    }

    ////////////////////
    /// EXPECTATIONS

    // expect = (element: ElementFinder, expectative: any): jasmine.Matchers => {
    //     me.wait(element);
    //     return expect(expectative);
    // }
    hasClass = (element: ElementFinder, css: string, withwait = false) => {
        let prom = null;
        if (withwait) prom = I.getAttribute(element, 'class');
        else prom = element.getAttribute('class');
        return prom.then((classes: string) => { return classes.split(' ').indexOf(css) !== -1; });
    }
    expectToContainClass = (element: ElementFinder, css: string, expectationFailOutput: string = null, withwait = false): promise.Promise<any> =>
        I.exec('expectToContainClass', () =>
            this.hasClass(element, css, withwait)
                .then((exists) => expect(exists).toBe(true, expectationFailOutput))
        )
    async expectExists2(element: ElementFinder, expectationFailOutput: string) {

        return await expect(element.isPresent()).toBe(when(true), expectationFailOutput);
    }

    expectExists = (element: ElementFinder, expectationFailOutput: string = null, timeouts = null): promise.Promise<any> =>
        I.exec('expectExists', () => I.wait(element, timeouts).then(() => expect(element.isPresent()).toBe(when(true), expectationFailOutput)))
    expectToContain = (element: ElementFinder, text: string, expectationFailOutput: string = null): promise.Promise<any> =>
        I.exec('expectToContain \'' + text + '\'', () => when(expect(I.getText(element)).toContain(text, expectationFailOutput)))

    expectToContainAttribute = (element: ElementFinder, attributeName: string, text: string, expectationFailOutput: string = null): promise.Promise<any> =>
        I.exec('expectToContainAttribute ' + attributeName, () => when(expect(I.getAttribute(element, attributeName)).toContain(text, expectationFailOutput)))
    expectToContainPlaceholder = (element: ElementFinder, text: string, expectationFailOutput: string = null): promise.Promise<any> =>
        I.expectToContainAttribute(element, 'placeholder', text, expectationFailOutput)

    expectToBe = (prom: promise.Promise<any> | number | string, condition: any, expectationFailOutput: string = null, preWaitEle: ElementFinder = null): promise.Promise<boolean> => {
        return <any>I.exec('expectToBe \'' + condition + '\'', () => I.wait(preWaitEle).then(() => when(expect(prom).toBe(condition, expectationFailOutput))));
    }

    expectToBeGreaterThan = (numPromise: promise.Promise<number> | number, condition: number, expectationFailOutput: string = null, preWaitEle: ElementFinder = null): promise.Promise<any> => I.exec('expectToBeGreaterThan \'' + condition + '\'',
        () => I.wait(preWaitEle).then(() => when(expect(numPromise).toBeGreaterThan(condition, expectationFailOutput))))
    expectToBeGreaterThanOrEqual = (numPromise: promise.Promise<number> | number, condition: number, expectationFailOutput: string = null, preWaitEle: ElementFinder = null): promise.Promise<any> => I.exec('expectToBeGreaterThanOrEqual \'' + condition + '\'',
        () => I.wait(preWaitEle).then(() => when(expect(numPromise).not.toBeLessThan(condition, expectationFailOutput))))
    expectToBeLessThan = (numPromise: promise.Promise<number> | number, condition: number, expectationFailOutput: string = null, preWaitEle: ElementFinder = null): promise.Promise<any> => I.exec('expectToBeLessThan \'' + condition + '\'',
        (): promise.Promise<any> => I.wait(preWaitEle).then(() => when(expect(numPromise).toBeLessThan(condition, expectationFailOutput))))
    expectToBeLessThanOrEqual = (numPromise: Promise<number> | number, condition: number, expectationFailOutput: string = null, preWaitEle: ElementFinder = null): promise.Promise<any> => I.exec('expectToBeLessThanOrEqual \'' + condition + '\'',
        () => I.wait(preWaitEle).then(() => when(expect(numPromise).not.toBeGreaterThan(condition, expectationFailOutput))))
    // expectToEqual is like expectToBe but performs deep check
    expectToEqual = (value: promise.Promise<any> | string | number, condition: any, expectationFailOutput: string = null, preWaitEle: ElementFinder = null): promise.Promise<any> => I.exec('expectToEqual \'' + condition + '\'', () => I.wait(preWaitEle).then(() => when(expect(value).toEqual(condition, expectationFailOutput))));


    decoExpect = function (expect, ...args): promise.Promise<any> {
        // expect deco
        let err = new Error('decoExpect()'); // hotfix for trapping trace until webdriver custom flow  promise is removed from diver
        return expect.apply(I, args)
            .then((res) => { // should be CATCH but needs hotfix is need it, then should be replaced with (<any>spec).throwOnExpectationFailure = true; // activate jasmine expection failure;  // hotfix while Enable jasmine's stopSpecOnExpectationFailure feature for protractor // https://github.com/angular/protractor/issues/3234
                let env = jasmine.getEnv();
                let spec = (<any>env.currentSpec);
                let fe = <any[]>spec.failedExpectations;
                if (fe.length > 0) {
                    let fexs: any[] = spec.__fexs = spec.__fexs || [];
                    let lastfex = fe[fe.length - 1];
                    I.logRed(JSON.stringify(lastfex));
                    // let stack = StackHelper.get(2, err);
                    // I.saveError(err, <any>{ fstack: stack, fexp: lastfex });
                    // fexs.push({ stack: stack, errdeco: err, fe: lastfex });
                    // spec.finish();
                    throw err;
                }
                return res;
            });

    };
    // fail = (err: Error) => {
    //     I.logRed(err.message);
    //     if (I.saveError(err)) { // false - this save is already done it
    //         expect(false).toBe(true, err.message);
    //         I.disableCurrentSuite();
    //     }
    //     throw err;
    // }

    ////////////////////
    /// VIEW HANDLING
    getElementProp = (element: ElementFinder, prop, timeout = null) => {
        return element.getWebElement()
            .then((we) => browser.driver.executeScript('return arguments[0]["' + prop + '"];', we))
            .then((res) => { I.logGray(`property ${prop} = ${res}`); return res; });
    }

    scrollIntoView = (element: ElementFinder, elementToScroll: ElementFinder = null, timeout = null) => {
        // EXPERIMENTAL https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
        return this.waitElementIsPresent(element, timeout, null, false).then(is => {
            if (!is) {
                // if(!elementToScroll){
                I.logYellow('Automatic scrollIntoView required, if possible change to scrollTopToElement');
                return element.getWebElement()
                    .then((we) => browser.driver.executeScript('arguments[0].scrollIntoView(true);', we))
                    .then(() => I.logGray('is scrolled'));
                // }else{ // TODO should be always scrolling to specific item
                //     myElement.offsetTop;
                // }

            }
        });
    }

    scrollTopToElement = (element: ElementFinder, elementToScroll: ElementFinder, timeout = null) => {
        // TODO detect first parent relative scrollable and make elementToScroll optional, also replace scrollIntoView on I.wait
        return element.getWebElement()
            .then((we) =>
                elementToScroll.getWebElement()
                    .then((we2) => {
                        return browser.driver.executeScript('var px = arguments[0].offsetTop; arguments[1].scrollTop = px; return arguments[1].scrollTop;', we, we2);
                    })
            ).then((res) => { I.logGray(` vertically scrolled to ${res}`); return <number>res; });
    }
    scrollTop = (element: ElementFinder, px, timeout = null) => {
        return element.getWebElement()
            .then((we) => browser.driver.executeScript('arguments[0].scrollTop = ' + px + '; return arguments[0].scrollTop;', we))
            .then((res) => { I.logGray(` vertically scrolled to ${res}`); return <number>res; });
    }
    scrollLeft = (element: ElementFinder, px, timeout = null) => {
        return element.getWebElement()
            .then((we) => browser.driver.executeScript('arguments[0].scrollLeft = ' + px + '; return arguments[0].scrollLeft;', we))
            .then((res) => { I.logGray(` horizontally scrolled to ${res}`); return <number>res; });
    }
    go = (href: string) => {
        I.logGreen(`go href --> "${href}"`);
        return browser.driver.executeScript('window.location.href="#' + href + '"'); // browser.wait(() => browser.driver.get(baseurl+'/logout'));
    }
    goReload = (fromServer: boolean = true) => {
        return browser.driver.executeScript('window.location.reload(' + fromServer + ')'); // browser.wait(() => browser.driver.get(baseurl+'/logout'));
    }
    goAndWait = (href: string, element: ElementFinder) => {
        I.go(href)
            .then(() => I.wait(element));
    }

    // IT == > asure sequencial execution order
    // it = (title, functions: (() => any)[]) => {
    //     me.exec('IT ' + title, () => {
    //         let prom = promise.defer();
    //         it(title, (done) => { me.sequence(functions).then(() => { prom.fulfill(); done(); }); });
    //         return prom;
    //     })
    // }

    // itOne = (title,  fn: () => webdriver.Promise<any> ) => {
    //     return me.it(title, [fn] );
    // }

    // let baseurl = '';
    // browser.controlFlow(api.logout());
    // browser.driver.getCurrentUrl()
    // .then((url) => { baseurl = url.substring(0, url.indexOf('#') + 1); })
    // .then(() => {  return browser.driver.wait(() => login.user.isPresent()); })
    // .then(() => { me.log('home url:' + baseurl, 'load complete'); done(); });


    // TODO implement with decorator if need it
    // promises and control flow https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/promise.html
    defColors = { arrowsf: 'gray', arrowsl: 'gray', first: 'white', last: 'gray', num: 'white' };
    sequenceColors = { arrowsf: 'gray', arrowsl: 'gray', first: 'blue', last: 'gray', num: 'white' };
    clickColors = { arrowsf: 'gray', arrowsl: 'gray', first: 'white', last: 'gray', num: 'white' };
    waitColors = { arrowsf: 'gray', arrowsl: 'gray', first: 'gray', last: 'gray', num: 'white' };
    level = 0;
    exec = (name, fn: () => promise.Promise<any>, colors = I.defColors) => {
        if (fn === null || typeof (fn) === 'undefined') throw new Error('Execution error detected, you are trying to call a function, but is null, may be and I.sequence with last item array empty');
        let cnamei = chalk[colors.first](name);
        let cnamef = chalk[colors.last](name);
        let crf = chalk[colors.arrowsf];
        let crl = chalk[colors.arrowsl];
        let ix = I.ixnext++;
        let cix = chalk[colors.num](ix);
        let msgini = crf('=== (') + cix + crf(') ') + cnamei + crf(' ==> ');
        let msgend = crl('<== (') + cix + crl(') ') + cnamef + crl(' === ');
        return browser.driver.controlFlow().execute(() => { I.level++; I.log(msgini); })
            .then(fn)
            .then((res) => { I.log(msgend); I.level--; return res; })
            .catch((error) => {
                // debugger;
                I.log(msgend + chalk.red(' ERROR! '));
                I.fail(error);
            });

    }

    sequence = (functions: (() => any)[], name: string = 'sequence') => {
        // example proms = [
        // () => h.click(page.forgotLink, page.resetButton),
        // () => h.expectToContain(page.invalidResetStatusMsg, page.errorTextReset),
        // () => done(),
        // ]

        return I.forEachProm(functions, (fn, ix) => {
            return I.exec(name + ' # ' + ix, fn, I.sequenceColors);
        });

    }
    itSequence = (functions: (() => any)[], name: string = '** IT ** \'' + I.itName + '\'') => {
        return I.sequence(functions, name);
    }

    clickSequence = (clickableElements: ElementFinder[], lastWaitToElement: ElementFinder = null) => {
        let ct = clickableElements.length;
        let prom = when(true);
        clickableElements.forEach((element, ix) => {
            const nextelement = (ix < ct - 1) ? clickableElements[ix + 1] : lastWaitToElement;
            prom = prom.then(() => I.click(element, nextelement));
        });
        return prom;
    }
    get itName() { let cs = jasmine.getEnv().currentSpec; return cs ? cs.description : ''; }

    /// GENERIC HANDLERS

    /// ARRAY FOREACH PROMISIFY
    forEachProm = (arr: any[], fn: ((val: any, ix: number, arr: any[]) => any)) => {
        let prom = when(true);
        arr.forEach((val, ix, arr) => {
            prom = prom.then((res) => {
                return fn(val, ix, arr);
            });
        });
        return prom;
    }
    JSONStringify = (json: any, opts: { depth: number } = { depth: null }): string => {
        // https://nodejs.org/api/util.html#util_util_inspect_object_options
        return util.inspect(json, opts); // https://stackoverflow.com/questions/11616630/json-stringify-avoid-typeerror-converting-circular-structure-to-json/18354289#18354289
    }
    isViewId = (taskIdOrName) => {
        return (/^[0-9A-F]{8}-[0-9A-F]{4}-/i.test(taskIdOrName));
    }
    isNumeric = (n) => {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }


    /// shortcuts to PriReport
    // get savedData() { return r.savedData; }
    // saveError = (err, meta: { msg: string, fexp: any, fstack: any[], data: any } = null): boolean => {
    //     return r.saveError(err, meta);
    // }
    // disableCurrentSuite = () => {
    //     return r.disableCurrentSuite();
    // }
    // end shortcuts

    getRandomInteger(min = 1, max = 999): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    async getRandomIntegerwithDecimal(sPrecision: number) {
        let precision;
        if (sPrecision === 2)
            precision = 100;
        else if (sPrecision === 3)
            precision = 200;
        // return await Math.floor(Math.random()(10  precision - 1  precision) + 1  precision) / (1 * precision);
    }


    async genRand(min, max, decimalPlaces) {
        let rand = Math.random() * (max - min) + min;
        let power = Math.pow(10, decimalPlaces);
        return await Math.floor(rand * power) / power;
    }
    getTodayDate(addDays = 0, fullAbbrevation) {
        const today = new Date();
        today.setDate(today.getDate() + addDays);
        if (fullAbbrevation)
            return `${this.getMonthNames(fullAbbrevation, [today.getMonth()])} ${today.getDate()}, ${today.getFullYear()}`;
        else
            return `${this.getMonthNames(fullAbbrevation, [today.getMonth()])} ${today.getDate()}, ${today.getFullYear()}`;
        // return `${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
    }
    getRandomString(length) {
        // let string = '    ';
        let i;
        let letters = 'abcdefghijklmnopqrstuvwxyz1234567890';
        // Include numbers if you want
        // for (i = 0; i < length; i++) {
        //     string += letters.charAt(Math.floor(Math.random() * letters.length));
        // }
        // return string;
    }
    getMonthNames(fullAbbrevation, month) {
        const monthNamesfull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        if (fullAbbrevation) {
            return monthNamesfull[month];
        }
        else {
            return monthNames[month];
        }

    }
}
class IHelperConfig {
    timeout: {
        wait:
        {
            isPresent: number, isPresent2: number, isDisplayed: number, isDisplayed2: number,
            isDisplayedLast: number, isEnabled: number,
            isClickable: number
        }
    };
}


export let IHelper = new Common();