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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9paGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSwyQ0FBd0g7QUFDeEgsTUFBTSxJQUFJLEdBQUcsb0JBQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFFbkQsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUN4QixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0IsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLDRCQUE0QjtBQUM1QiwrQ0FBK0M7QUFDL0MsNEVBQTRFO0FBRTVFLHFEQUFpRDtBQUNqRCx1Q0FBeUM7QUFFekMsTUFBTSxNQUFNO0lBU1I7UUFEQSxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBSWpCLFVBQUssR0FBRyxHQUFHLEVBQUU7WUFDVCxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7WUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdkIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDN0IsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDOUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUVQLENBQUMsQ0FBQTtRQUlELFdBQU0sR0FBRyxDQUFDLENBQUM7UUFDWCxRQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLElBQUksRUFBRSxFQUFFO1lBQ3RCLElBQUksaUJBQUMsQ0FBQyxTQUFTLEVBQUU7Z0JBQ2IsSUFBSSxDQUFD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