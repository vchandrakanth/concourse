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
const when = protractor_1.promise.when, reject = Promise.reject;
const log = console.log;
const chalk = require('chalk');
const util = require('util');
const _ = require("lodash");
// import { StackHelper } from './stackHelper';
// import { IHelperJasmineReporter as r } from './ihelper-jasmine-reporter';
const ihelper_native_1 = require("./ihelper-native");
const ihelper_1 = require("./ihelper");
class Common {
    constructor() {
        this.enableLog = true;
        this.start = () => {
            let me = this;
            Object.keys(me).map(prop => {
                if (prop.indexOf('expect') >= 0) {
                    me[prop] = _.wrap(me[prop], me.decoExpect);
                }
            });
        };
        this.ixnext = 0;
        this.log = (txt, res = null) => {
            if (ihelper_1.IHelper.enableLog) {
                if (!(typeof txt === 'string' || txt instanceof String || txt >= 0)) {
                    txt = txt();
                }
                log(chalk.gray(new Date().toISOString()), chalk.gray(_.repeat('*', ihelper_1.IHelper.level)), txt);
            }
            return res;
        };
        this.logGray = (txt, res = null) => {
            return ihelper_1.IHelper.log(chalk.gray(txt), res);
        };
        this.logYellow = (txt, res = null) => {
            return ihelper_1.IHelper.log(chalk.yellow(txt), res);
        };
        this.logWhite = (txt, res = null) => {
            return ihelper_1.IHelper.log(chalk.white(txt), res);
        };
        this.logGreen = (txt, res = null) => {
            return ihelper_1.IHelper.log(chalk.green(txt), res);
        };
        this.logRed = (txt, res = null) => {
            return ihelper_1.IHelper.log(chalk.red(txt), res);
        };
        this.logMagenta = (txt, res = null) => {
            return ihelper_1.IHelper.log(chalk.magenta(txt), res);
        };
        this.logT0 = (txt, res = null) => {
            return ihelper_1.IHelper.log(chalk.black.bgWhite.bold(txt), res);
        };
        this.logT1 = (txt, res = null) => {
            return ihelper_1.IHelper.log(chalk.bgBlue.bold(txt), res);
        };
        this.logWithChalk = (fn) => {
            let msg = fn(chalk);
            ihelper_1.IHelper.log(msg);
        };
        // TODO change log to event hooking if is available at javascript  or enabling logging at protractor capability level
        ////////////////////
        /// INTERACTIONS
        this.clear = (element) => {
            return ihelper_1.IHelper.execWithRetry('clear element retry', () => ihelper_1.IHelper.wait(element).then(() => element.clear()), null, 2, 0, true).then(() => ihelper_1.IHelper.log('is clear'));
        };
        this.set = (element, text) => {
            return ihelper_1.IHelper.clear(element).then(() => ihelper_1.IHelper.execWithRetry('set text retry', () => element.sendKeys(text), null, 2, 0, true).then(() => ihelper_1.IHelper.log(`Set text:${text}`)));
        };
        this.getText = (element) => {
            return ihelper_1.IHelper.execWithRetry('get text retry', () => {
                return ihelper_1.IHelper.wait(element)
                    .then(() => { return element.getText(); })
                    .then((res) => ihelper_1.IHelper.log(() => 'text: \'' + res + '\'', res));
            }, null, 2, 0, true);
        };
        this.getAttribute = (element, attributeName) => {
            return ihelper_1.IHelper.wait(element)
                .then(() => { return element.getAttribute(attributeName); })
                .then((res) => ihelper_1.IHelper.log(() => 'attribute \'' + attributeName + '\': \'' + res + '\'', res));
        };
        // recreated from https://github.com/kriskowal/q/blob/v1/q.js
        this.any = (...promises) => {
            let Q = { resolve: protractor_1.promise.fulfilled, defer: protractor_1.promise.defer };
            let when = protractor_1.promise.when;
            if (promises.length === 0) {
                return Q.resolve();
            }
            let deferred = Q.defer();
            let pendingCount = 0;
            promises.reduce(function (prev, current, index) {
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
        };
        // TODO multi wait work in progress, pending adding timeouts and retry
        // purpose after a click (4 exmple) check if element found is an error or if it is succesful
        this.waitAny = (msTimeOut, ...elements) => {
            let proms = [];
            let me = ihelper_1.IHelper;
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
            return protractor_1.promise.all(proms).then((res) => {
                ihelper_1.IHelper.logGray(`waitAny result: [${res.join(',')}] - timeout:${msTimeOut}`);
                if (msTimeOut <= 0 || res.filter(r => r === true).length > 0) {
                    return res; // at least one is visible/clickable
                }
                else {
                    return this.waitAny(msTimeOut - interval, ...elements);
                }
            }).catch((res) => {
                debugger;
            });
        };
        // TODO check why controlflow is need it here to properly sequence this chained promises
        this.waitSimple = (waitForElement, timeout = null) => protractor_1.browser.driver.wait(protractor_1.ExpectedConditions.elementToBeClickable(waitForElement), timeout); // OPEN Issue ==> clickeable even there is something covering it https://github.com/angular/protractor/issues/2139
        //     browser.driver.controlFlow().execute(() =>
        //         browser.driver.wait(waitForElement.isPresent(), timeout))
        //         .then((res) => browser.driver.wait(waitForElement.isDisplayed(), timeout / 4))
        this.clickAndWaitToHide = (waitForElement, timeout = 20000) => {
            return ihelper_1.IHelper.click(waitForElement).then(() => {
                return ihelper_1.IHelper.promise2Boolean(protractor_1.browser.wait(protractor_1.ExpectedConditions.invisibilityOf(waitForElement), timeout))
                    .then((is) => {
                    if (!is) {
                        throw new Error('clickAndWaitToHide timeout, elemnt is still visible');
                    }
                    else {
                        ihelper_1.IHelper.logGray('clickAndWaitToHide element is hidden');
                    }
                }).catch(err => {
                    if (err.name === 'UnexpectedAlertOpenError') {
                        ihelper_1.IHelper.logYellow(`UnexpectedAlertOpenError workaround`);
                        return protractor_1.browser.switchTo().alert().then(function (alert) { alert.accept(); }); // .catch(() => { });
                    }
                });
            });
        };
        this.contains = (arr, st) => (arr.findIndex((o) => st.indexOf(o) >= 0) >= 0);
        this.wait = (element = null, timeouts = null, maxretry = 2) => {
            if (!timeouts)
                timeouts = ihelper_1.IHelper.config.timeout;
            let locator = null;
            return ihelper_1.IHelper.exec('wait', () => {
                if (!element)
                    return;
                locator = element.locator();
                ihelper_1.IHelper.level++;
                ihelper_1.IHelper.log(() => ('locator: ' + locator));
                return protractor_1.browser.driver
                    .wait(protractor_1.ExpectedConditions.presenceOf(element), timeouts.wait.isPresent) // () => element.isPresent()
                    .then(() => ihelper_1.IHelper.logGray('is present'))
                    .then(() => protractor_1.browser.driver.wait(protractor_1.ExpectedConditions.visibilityOf(element), timeouts.wait.isDisplayed).catch(() => false))
                    .then(isvisible => {
                    if (!isvisible) {
                        return ihelper_1.IHelper.execWithRetry('scroll retry', () => { return ihelper_1.IHelper.scrollIntoView(element); }, () => {
                            return protractor_1.browser.wait(protractor_1.ExpectedConditions.presenceOf(element), timeouts.wait.isDisplayed).catch(() => false);
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
                    .then(() => ihelper_1.IHelper.logGray('is displayed'))
                    .then(() => protractor_1.browser.driver.wait(() => element.isEnabled(), timeouts.wait.isEnabled))
                    .then(() => ihelper_1.IHelper.logGray('is enabled'))
                    .then(() => ihelper_1.IHelper.level--)
                    .catch((err) => {
                    let arr = ['unexpected alert open', 'stale element reference: element is not attached', 'No element found using locator'];
                    if (ihelper_1.IHelper.contains(arr, err.message) && maxretry > 0) {
                        maxretry--;
                        ihelper_1.IHelper.logYellow('wait helper error - retrying.. tries left:' + maxretry);
                        ihelper_1.IHelper.logYellow('error' + err.message);
                        return ihelper_1.IHelper.wait(element, timeouts, maxretry);
                    }
                    else {
                        let msg = `locator: '${locator}',  ${err.message}`;
                        ihelper_1.IHelper.logRed(msg);
                        // I.saveError(err, <any>{ msg: msg });
                        throw err;
                    }
                });
            }, ihelper_1.IHelper.waitColors);
        };
        //         clickableElement.getLocation().then((loc)=>loc.)
        // ele = (IWebElement)((IJavaScriptExecutor)driver).ExecuteScript(
        //     "return document.elementFromPoint(arguments[0], arguments[1])",
        //     Cursor.Position.X, Cursor.Positio
        this.JSClick = (clickableElement) => {
            try {
                return clickableElement.getWebElement().then((we) => protractor_1.browser.driver.executeScript('arguments[0].click()', we));
            }
            catch (error) {
                let msg = 'warning clicking - JSClick fail, element not clickable. locator:' + clickableElement.locator();
                ihelper_1.IHelper.logRed(msg + ihelper_1.IHelper.JSONStringify(error));
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
        };
        this.click = (clickableElement, ...waitNews) => {
            let useJs = false;
            // browser.sleep(1000);
            return ihelper_1.IHelper.exec('click', () => ihelper_1.IHelper.wait(clickableElement)
                .catch((error) => ihelper_1.IHelper.logYellow('click - warning waiting, now trying with EC .. prev error: ' + ihelper_1.IHelper.JSONStringify(error)))
                .then(() => {
                if (!useJs) {
                    return ihelper_1.IHelper.clickRetry(clickableElement);
                }
                else {
                    ihelper_1.IHelper.logYellow('click - warning clicking thru js forced by param');
                    return ihelper_1.IHelper.JSClick(clickableElement);
                }
            })
                .then(() => ihelper_1.IHelper.logWhite('clicked'))
                .then(() => {
                if (!(waitNews && waitNews.length > 0)) {
                    ihelper_1.IHelper.log('click - (not waiting for element after click)');
                    return;
                }
                return ihelper_1.IHelper.wait(waitNews[0]);
            }), ihelper_1.IHelper.clickColors);
        };
        this.clickRetry = (clickableElement, maxretry = 4) => {
            let isClickable = protractor_1.ExpectedConditions.elementToBeClickable(clickableElement);
            return protractor_1.browser.driver.wait(isClickable, ihelper_1.IHelper.config.timeout.wait.isClickable)
                .then(() => ihelper_1.IHelper.logGray('is clickable'))
                .then(() => clickableElement.click()) // could be enhanced with check-retry
                .catch((error) => {
                if (maxretry >= 0) {
                    // retry //  is not clickable at point after been clickable (running condition with intermitent element)
                    return protractor_1.browser.sleep(1000).then(() => ihelper_1.IHelper.clickRetry(clickableElement, maxretry - 1));
                }
                else {
                    ihelper_1.IHelper.logYellow('click - warning clicking - element not clickable. ' + ihelper_1.IHelper.JSONStringify(error));
                    return ihelper_1.IHelper.JSClick(clickableElement);
                }
            });
        };
        this.promise2Boolean = (a) => a.then((r) => ((r !== false) ? true : false)).catch(() => false);
        this.waitElementIsPresent = (element, time = null, errormessage = null, countExpect = true) => {
            return protractor_1.browser.wait(protractor_1.ExpectedConditions.presenceOf(element), (!time ? ihelper_1.IHelper.config.timeout.wait.isPresent : time), errormessage).then(() => { if (countExpect)
                expect(true).toBe(true); return true; }).catch(err => false);
        };
        this.waitElementIsNotPresent = (element, time = null, errormessage = null, countExpect = true) => {
            return protractor_1.browser.wait(protractor_1.ExpectedConditions.stalenessOf(element), (!time ? ihelper_1.IHelper.config.timeout.wait.isPresent : time), errormessage).then(() => { if (countExpect)
                expect(true).toBe(true); });
        };
        this.waitElementIsVisible = (element, time = null, errormessage = null, countExpect = true) => {
            return protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(element), (!time ? ihelper_1.IHelper.config.timeout.wait.isDisplayed : time), errormessage).then(() => { if (countExpect)
                expect(true).toBe(true); });
        };
        // like inner text
        this.waitElementText = (element, text, time = null, errormessage = null, countExpect = true) => {
            return protractor_1.browser.wait(protractor_1.ExpectedConditions.textToBePresentInElement(element, text), (!time ? ihelper_1.IHelper.config.timeout.wait.isDisplayed : time), errormessage).then(() => { if (countExpect)
                expect(true).toBe(true); });
        };
        // like input value
        this.waitElementValue = (element, text, time = null, errormessage = null, countExpect = true) => {
            return protractor_1.browser.wait(protractor_1.ExpectedConditions.textToBePresentInElementValue(element, text), (!time ? ihelper_1.IHelper.config.timeout.wait.isDisplayed : time), errormessage).then(() => { if (countExpect)
                expect(true).toBe(true); });
        };
        this.clickDouble = (clickableElement, waitNew) => {
            return ihelper_1.IHelper.exec('doubleClick', () => ihelper_1.IHelper.wait(clickableElement)
                .catch((error) => ihelper_1.IHelper.logYellow('click - warning waiting, now trying with EC .. prev error: ' + ihelper_1.IHelper.JSONStringify(error)))
                .then(() => {
                let isClickable = protractor_1.ExpectedConditions.elementToBeClickable(clickableElement);
                return protractor_1.browser.driver.wait(isClickable, ihelper_1.IHelper.config.timeout.wait.isClickable)
                    .then(() => ihelper_1.IHelper.logGray('is clickable'))
                    .then(() => protractor_1.browser.actions().doubleClick(clickableElement).perform())
                    .catch((error) => {
                    ihelper_1.IHelper.logYellow('click - warning clicking - element not clickable. ' + ihelper_1.IHelper.JSONStringify(error));
                    return ihelper_1.IHelper.JSClick(clickableElement);
                });
            })
                .then(() => ihelper_1.IHelper.logWhite('double clicked'))
                .then(() => {
                return ihelper_1.IHelper.wait(waitNew);
            }), ihelper_1.IHelper.clickColors);
        };
        ////////////////////
        /// EXPECTATIONS
        // expect = (element: ElementFinder, expectative: any): jasmine.Matchers => {
        //     me.wait(element);
        //     return expect(expectative);
        // }
        this.hasClass = (element, css, withwait = false) => {
            let prom = null;
            if (withwait)
                prom = ihelper_1.IHelper.getAttribute(element, 'class');
            else
                prom = element.getAttribute('class');
            return prom.then((classes) => { return classes.split(' ').indexOf(css) !== -1; });
        };
        this.expectToContainClass = (element, css, expectationFailOutput = null, withwait = false) => ihelper_1.IHelper.exec('expectToContainClass', () => this.hasClass(element, css, withwait)
            .then((exists) => expect(exists).toBe(true, expectationFailOutput)));
        this.expectExists = (element, expectationFailOutput = null, timeouts = null) => ihelper_1.IHelper.exec('expectExists', () => ihelper_1.IHelper.wait(element, timeouts).then(() => expect(element.isPresent()).toBe(when(true), expectationFailOutput)));
        this.expectToContain = (element, text, expectationFailOutput = null) => ihelper_1.IHelper.exec('expectToContain \'' + text + '\'', () => when(expect(ihelper_1.IHelper.getText(element)).toContain(text, expectationFailOutput)));
        this.expectToContainAttribute = (element, attributeName, text, expectationFailOutput = null) => ihelper_1.IHelper.exec('expectToContainAttribute ' + attributeName, () => when(expect(ihelper_1.IHelper.getAttribute(element, attributeName)).toContain(text, expectationFailOutput)));
        this.expectToContainPlaceholder = (element, text, expectationFailOutput = null) => ihelper_1.IHelper.expectToContainAttribute(element, 'placeholder', text, expectationFailOutput);
        this.expectToBe = (prom, condition, expectationFailOutput = null, preWaitEle = null) => {
            return ihelper_1.IHelper.exec('expectToBe \'' + condition + '\'', () => ihelper_1.IHelper.wait(preWaitEle).then(() => when(expect(prom).toBe(condition, expectationFailOutput))));
        };
        this.expectToBeGreaterThan = (numPromise, condition, expectationFailOutput = null, preWaitEle = null) => ihelper_1.IHelper.exec('expectToBeGreaterThan \'' + condition + '\'', () => ihelper_1.IHelper.wait(preWaitEle).then(() => when(expect(numPromise).toBeGreaterThan(condition, expectationFailOutput))));
        this.expectToBeGreaterThanOrEqual = (numPromise, condition, expectationFailOutput = null, preWaitEle = null) => ihelper_1.IHelper.exec('expectToBeGreaterThanOrEqual \'' + condition + '\'', () => ihelper_1.IHelper.wait(preWaitEle).then(() => when(expect(numPromise).not.toBeLessThan(condition, expectationFailOutput))));
        this.expectToBeLessThan = (numPromise, condition, expectationFailOutput = null, preWaitEle = null) => ihelper_1.IHelper.exec('expectToBeLessThan \'' + condition + '\'', () => ihelper_1.IHelper.wait(preWaitEle).then(() => when(expect(numPromise).toBeLessThan(condition, expectationFailOutput))));
        this.expectToBeLessThanOrEqual = (numPromise, condition, expectationFailOutput = null, preWaitEle = null) => ihelper_1.IHelper.exec('expectToBeLessThanOrEqual \'' + condition + '\'', () => ihelper_1.IHelper.wait(preWaitEle).then(() => when(expect(numPromise).not.toBeGreaterThan(condition, expectationFailOutput))));
        // expectToEqual is like expectToBe but performs deep check
        this.expectToEqual = (value, condition, expectationFailOutput = null, preWaitEle = null) => ihelper_1.IHelper.exec('expectToEqual \'' + condition + '\'', () => ihelper_1.IHelper.wait(preWaitEle).then(() => when(expect(value).toEqual(condition, expectationFailOutput))));
        this.decoExpect = function (expect, ...args) {
            // expect deco
            let err = new Error('decoExpect()'); // hotfix for trapping trace until webdriver custom flow  promise is removed from diver
            return expect.apply(ihelper_1.IHelper, args)
                .then((res) => {
                let env = jasmine.getEnv();
                let spec = env.currentSpec;
                let fe = spec.failedExpectations;
                if (fe.length > 0) {
                    let fexs = spec.__fexs = spec.__fexs || [];
                    let lastfex = fe[fe.length - 1];
                    ihelper_1.IHelper.logRed(JSON.stringify(lastfex));
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
        this.getElementProp = (element, prop, timeout = null) => {
            return element.getWebElement()
                .then((we) => protractor_1.browser.driver.executeScript('return arguments[0]["' + prop + '"];', we))
                .then((res) => { ihelper_1.IHelper.logGray(`property ${prop} = ${res}`); return res; });
        };
        this.scrollIntoView = (element, elementToScroll = null, timeout = null) => {
            // EXPERIMENTAL https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
            return this.waitElementIsPresent(element, timeout, null, false).then(is => {
                if (!is) {
                    // if(!elementToScroll){
                    ihelper_1.IHelper.logYellow('Automatic scrollIntoView required, if possible change to scrollTopToElement');
                    return element.getWebElement()
                        .then((we) => protractor_1.browser.driver.executeScript('arguments[0].scrollIntoView(true);', we))
                        .then(() => ihelper_1.IHelper.logGray('is scrolled'));
                    // }else{ // TODO should be always scrolling to specific item
                    //     myElement.offsetTop;
                    // }
                }
            });
        };
        this.scrollTopToElement = (element, elementToScroll, timeout = null) => {
            // TODO detect first parent relative scrollable and make elementToScroll optional, also replace scrollIntoView on I.wait
            return element.getWebElement()
                .then((we) => elementToScroll.getWebElement()
                .then((we2) => {
                return protractor_1.browser.driver.executeScript('var px = arguments[0].offsetTop; arguments[1].scrollTop = px; return arguments[1].scrollTop;', we, we2);
            })).then((res) => { ihelper_1.IHelper.logGray(` vertically scrolled to ${res}`); return res; });
        };
        this.scrollTop = (element, px, timeout = null) => {
            return element.getWebElement()
                .then((we) => protractor_1.browser.driver.executeScript('arguments[0].scrollTop = ' + px + '; return arguments[0].scrollTop;', we))
                .then((res) => { ihelper_1.IHelper.logGray(` vertically scrolled to ${res}`); return res; });
        };
        this.scrollLeft = (element, px, timeout = null) => {
            return element.getWebElement()
                .then((we) => protractor_1.browser.driver.executeScript('arguments[0].scrollLeft = ' + px + '; return arguments[0].scrollLeft;', we))
                .then((res) => { ihelper_1.IHelper.logGray(` horizontally scrolled to ${res}`); return res; });
        };
        this.go = (href) => {
            ihelper_1.IHelper.logGreen(`go href --> "${href}"`);
            return protractor_1.browser.driver.executeScript('window.location.href="#' + href + '"'); // browser.wait(() => browser.driver.get(baseurl+'/logout'));
        };
        this.goReload = (fromServer = true) => {
            return protractor_1.browser.driver.executeScript('window.location.reload(' + fromServer + ')'); // browser.wait(() => browser.driver.get(baseurl+'/logout'));
        };
        this.goAndWait = (href, element) => {
            ihelper_1.IHelper.go(href)
                .then(() => ihelper_1.IHelper.wait(element));
        };
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
        this.defColors = { arrowsf: 'gray', arrowsl: 'gray', first: 'white', last: 'gray', num: 'white' };
        this.sequenceColors = { arrowsf: 'gray', arrowsl: 'gray', first: 'blue', last: 'gray', num: 'white' };
        this.clickColors = { arrowsf: 'gray', arrowsl: 'gray', first: 'white', last: 'gray', num: 'white' };
        this.waitColors = { arrowsf: 'gray', arrowsl: 'gray', first: 'gray', last: 'gray', num: 'white' };
        this.level = 0;
        this.exec = (name, fn, colors = ihelper_1.IHelper.defColors) => {
            if (fn === null || typeof (fn) === 'undefined')
                throw new Error('Execution error detected, you are trying to call a function, but is null, may be and I.sequence with last item array empty');
            let cnamei = chalk[colors.first](name);
            let cnamef = chalk[colors.last](name);
            let crf = chalk[colors.arrowsf];
            let crl = chalk[colors.arrowsl];
            let ix = ihelper_1.IHelper.ixnext++;
            let cix = chalk[colors.num](ix);
            let msgini = crf('=== (') + cix + crf(') ') + cnamei + crf(' ==> ');
            let msgend = crl('<== (') + cix + crl(') ') + cnamef + crl(' === ');
            return protractor_1.browser.driver.controlFlow().execute(() => { ihelper_1.IHelper.level++; ihelper_1.IHelper.log(msgini); })
                .then(fn)
                .then((res) => { ihelper_1.IHelper.log(msgend); ihelper_1.IHelper.level--; return res; })
                .catch((error) => {
                // debugger;
                ihelper_1.IHelper.log(msgend + chalk.red(' ERROR! '));
                ihelper_1.IHelper.fail(error);
            });
        };
        this.sequence = (functions, name = 'sequence') => {
            // example proms = [
            // () => h.click(page.forgotLink, page.resetButton),
            // () => h.expectToContain(page.invalidResetStatusMsg, page.errorTextReset),
            // () => done(),
            // ]
            return ihelper_1.IHelper.forEachProm(functions, (fn, ix) => {
                return ihelper_1.IHelper.exec(name + ' # ' + ix, fn, ihelper_1.IHelper.sequenceColors);
            });
        };
        this.itSequence = (functions, name = '** IT ** \'' + ihelper_1.IHelper.itName + '\'') => {
            return ihelper_1.IHelper.sequence(functions, name);
        };
        this.clickSequence = (clickableElements, lastWaitToElement = null) => {
            let ct = clickableElements.length;
            let prom = when(true);
            clickableElements.forEach((element, ix) => {
                const nextelement = (ix < ct - 1) ? clickableElements[ix + 1] : lastWaitToElement;
                prom = prom.then(() => ihelper_1.IHelper.click(element, nextelement));
            });
            return prom;
        };
        /// GENERIC HANDLERS
        /// ARRAY FOREACH PROMISIFY
        this.forEachProm = (arr, fn) => {
            let prom = when(true);
            arr.forEach((val, ix, arr) => {
                prom = prom.then((res) => {
                    return fn(val, ix, arr);
                });
            });
            return prom;
        };
        this.JSONStringify = (json, opts = { depth: null }) => {
            // https://nodejs.org/api/util.html#util_util_inspect_object_options
            return util.inspect(json, opts); // https://stackoverflow.com/questions/11616630/json-stringify-avoid-typeerror-converting-circular-structure-to-json/18354289#18354289
        };
        this.isViewId = (taskIdOrName) => {
            return (/^[0-9A-F]{8}-[0-9A-F]{4}-/i.test(taskIdOrName));
        };
        this.isNumeric = (n) => {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };
        this.start();
    }
    saveError(err0) {
        throw new Error('Method not implemented.');
    }
    fail(err) {
        throw new Error('Method not implemented.');
    }
    get useNative() { return ihelper_native_1.IHelperNative; }
    get config() { return protractor_1.browser.params.cfg.IHelper; }
    // me.$('')
    getElementByCssContainingText(text, css, baseElement = null) {
        if (baseElement) {
            let locator = baseElement.locator();
            let slocator = '' + locator;
            // I.log(`getElementByText ${base} by xpath => ${path}`);
            // return baseElement.element(by.xpath(path));
            let css0 = baseElement.locator().value + css;
            ihelper_1.IHelper.log(`getElementByText by css => ${css0}`);
            return protractor_1.element(protractor_1.by.cssContainingText(css0, text));
        }
        ihelper_1.IHelper.log(`getElementByText element by (css,text) => (${text},${css})`);
        return protractor_1.element(protractor_1.by.cssContainingText(css, text));
        // I.log(`getElementByText by path element ${path}`);
        // return element(by.xpath(path));
    }
    wait2(element = null, timeouts = null, maxretry = 2) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!timeouts)
                timeouts = ihelper_1.IHelper.config.timeout;
            let locator = null;
            return yield ihelper_1.IHelper.exec('wait', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    if (!element)
                        return;
                    locator = element.locator();
                    ihelper_1.IHelper.level++;
                    ihelper_1.IHelper.log(() => ('locator: ' + locator));
                    return yield protractor_1.browser.driver
                        .wait(protractor_1.ExpectedConditions.presenceOf(element), timeouts.wait.isPresent) // () => element.isPresent()
                        .then(() => ihelper_1.IHelper.logGray('is present'))
                        .then(() => protractor_1.browser.driver.wait(protractor_1.ExpectedConditions.visibilityOf(element), timeouts.wait.isDisplayed).catch(() => false))
                        .then(isvisible => {
                        if (!isvisible) {
                            return ihelper_1.IHelper.execWithRetry('scroll retry', () => { return ihelper_1.IHelper.scrollIntoView(element); }, () => {
                                return protractor_1.browser.wait(protractor_1.ExpectedConditions.presenceOf(element), timeouts.wait.isDisplayed).catch(() => false);
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
                        .then(() => ihelper_1.IHelper.logGray('is displayed'))
                        .then(() => protractor_1.browser.driver.wait(() => element.isEnabled(), timeouts.wait.isEnabled))
                        .then(() => ihelper_1.IHelper.logGray('is enabled'))
                        .then(() => ihelper_1.IHelper.level--)
                        .catch((err) => {
                        let arr = ['unexpected alert open', 'stale element reference: element is not attached', 'No element found using locator'];
                        if (ihelper_1.IHelper.contains(arr, err.message) && maxretry > 0) {
                            maxretry--;
                            ihelper_1.IHelper.logYellow('wait helper error - retrying.. tries left:' + maxretry);
                            ihelper_1.IHelper.logYellow('error' + err.message);
                            return ihelper_1.IHelper.wait(element, timeouts, maxretry);
                        }
                        else {
                            let msg = `locator: '${locator}',  ${err.message}`;
                            ihelper_1.IHelper.logRed(msg);
                            // I.saveError(err, <any>{ msg: msg });
                            throw err;
                        }
                    });
                });
            }, ihelper_1.IHelper.waitColors);
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
    execWithRetry(retryName, func, testCondition = null, maxretry = 10, sleepStep = 1000, failedRetryThrowError, retryIfErrorContains = null) {
        let result;
        testCondition = testCondition || (() => protractor_1.promise.when(true));
        return func() // could be enhanced with check-retry
            .then(fr => { result = fr; return fr; })
            .then(testCondition)
            .then((tcr) => { if (!tcr)
            throw new Error('condition is false'); })
            .then(() => result)
            .catch((err) => {
            if (!err) {
                err = new Error('empty error');
            }
            let arr = retryIfErrorContains; // ['unexpected alert open', 'stale element reference: element is not attached', 'No element found using locator'];
            if (maxretry > 0 && (arr === null || (ihelper_1.IHelper.contains(arr, err.message) && maxretry > 0))) {
                maxretry--;
                ihelper_1.IHelper.logYellow('error: ' + err.message);
                ihelper_1.IHelper.logYellow(`${retryName} - retrying.. tries left:${maxretry}`);
                return protractor_1.browser.sleep(sleepStep).then(() => this.execWithRetry(retryName, func, testCondition, maxretry, sleepStep, failedRetryThrowError, retryIfErrorContains));
            }
            else {
                let msg = `${retryName} - failed retrying ,  ${err.message}`;
                ihelper_1.IHelper.logRed(msg);
                if (failedRetryThrowError) {
                    // I.saveError(err, <any>{ msg: msg });
                    throw err;
                }
                else {
                    return result;
                }
            }
        });
    }
    expectExists2(element, expectationFailOutput) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield expect(element.isPresent()).toBe(when(true), expectationFailOutput);
        });
    }
    get itName() { let cs = jasmine.getEnv().currentSpec; return cs ? cs.description : ''; }
    /// shortcuts to PriReport
    // get savedData() { return r.savedData; }
    // saveError = (err, meta: { msg: string, fexp: any, fstack: any[], data: any } = null): boolean => {
    //     return r.saveError(err, meta);
    // }
    // disableCurrentSuite = () => {
    //     return r.disableCurrentSuite();
    // }
    // end shortcuts
    getRandomInteger(min = 1, max = 999) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    getRandomIntegerwithDecimal(sPrecision) {
        return __awaiter(this, void 0, void 0, function* () {
            let precision;
            if (sPrecision === 2)
                precision = 100;
            else if (sPrecision === 3)
                precision = 200;
            // return await Math.floor(Math.random()(10  precision - 1  precision) + 1  precision) / (1 * precision);
        });
    }
    genRand(min, max, decimalPlaces) {
        return __awaiter(this, void 0, void 0, function* () {
            let rand = Math.random() * (max - min) + min;
            let power = Math.pow(10, decimalPlaces);
            return (yield Math.floor(rand * power)) / power;
        });
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
}
exports.IHelper = new Common();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9paGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEsMkNBQXdIO0FBQ3hILE1BQU0sSUFBSSxHQUFHLG9CQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0FBRW5ELE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDeEIsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQy9CLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3Qiw0QkFBNEI7QUFDNUIsK0NBQStDO0FBQy9DLDRFQUE0RTtBQUU1RSxxREFBaUQ7QUFDakQsdUNBQXlDO0FBRXpDLE1BQU0sTUFBTTtJQVNSO1FBREEsY0FBUyxHQUFHLElBQUksQ0FBQztRQUlqQixVQUFLLEdBQUcsR0FBRyxFQUFFO1lBQ1QsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3ZCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQzdCLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQzlDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFUCxDQUFDLENBQUE7UUFJRCxXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsUUFBRyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxJQUFJLEVBQUUsRUFBRTtZQUN0QixJQUFJLGlCQUFDLENBQUMsU0FBUyxFQUFFO2dCQUNiLElBQUksQ0FB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