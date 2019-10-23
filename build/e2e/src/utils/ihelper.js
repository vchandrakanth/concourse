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
                // I.fail(error);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91dGlscy9paGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEsMkNBQXdIO0FBQ3hILE1BQU0sSUFBSSxHQUFHLG9CQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0FBRW5ELE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDeEIsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQy9CLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3Qiw0QkFBNEI7QUFJNUIscURBQWlEO0FBQ2pELHVDQUF5QztBQUV6QyxNQUFNLE1BQU07SUFTUjtRQURBLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFJakIsVUFBSyxHQUFHLEdBQUcsRUFBRTtZQUNULElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztZQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN2QixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUM3QixFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUM5QztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBRVAsQ0FBQyxDQUFBO1FBSUQsV0FBTSxHQUFHLENBQUMsQ0FBQztRQUNYLFFBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsSUFBSSxFQUFFLEVBQUU7WUFDdEIsSUFBSSxpQkFBQyxDQUFDLFNBQVMsRUFBRTtnQkFDYixJQUFJLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FB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