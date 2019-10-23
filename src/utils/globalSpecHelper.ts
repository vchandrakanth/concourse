'use strict';
import { IHelper as I } from '../utils/ihelper';
// import { loginPage, forgotPasswordPage as forgotPage, Users, leftMenuPage } from '../../pageobjects/platform';
import { browser, element, ElementFinder, ElementArrayFinder, by, promise } from 'protractor';
// import { IHelperJasmineReporter } from './src/utils/ihelper-jasmine-reporter';
let when = promise.when;
const util = require('util');
import { IHelperJasmineReporter } from '../utils/ihelper-jasmine-reporter';
import { resolveTxt } from 'dns';

// js errors detection https://github.com/angular/protractor/issues/749
// https://github.com/angular/protractor/blob/master/docs/faq.md#how-can-i-get-hold-of-the-browsers-console

afterEach((): promise.Promise<any> => {
    I.logGray('Inspecting browser console logs ...');
    return browser.manage().logs().get('browser').then((browserLog) => {

        if (browserLog.length > 0) {
            I.logGray(util.inspect(browserLog));
        }

        let filteredLog = browserLog.filter(o => (!o.level || o.level.name_ !== 'WARNING')); // level: Level { name_: 'WARNING',

        let filteredLog2: any[] = null;
        let r = IHelperJasmineReporter;
        let errorskiped = [];
        let errorShowed = [];
        if (r.currentSpec && r.currentSpec.__errors && r.currentSpec.__errors.length > 0) {
            // with errors
            // so if there is errors at some point then show every error at console except failed to load (network msg at browser)
            errorskiped = [
                'Failed to load resource',
                'DevTools failed to parse SourceMap:', // http errors at network message level
                'Failed to load resource: the server responded with a status of 500'
            ];
        } else {
            // without errors, only emit error at console with important issues (skipping minor problems)
            /// HOTFIX
            errorskiped = [
                'XMLHttpRequest.requestError', 'Failed to load resource', // http errors at network message level
                'Unrecognized Content-Security-Policy directive',
                // 'ionic.bundle.js', // errors at ionic bundle
                   '401 ', 'Cannot read property \'formdefwithtasks\' of undefined', // skipped until new connection service is inplace
               'auth/login 400 (Bad Request)', // skipped
                'DevTools failed to parse SourceMap:',
                // 'Failed to load resource: the server responded with a status of 500'
            ];

        }
        let contains = (arr, st) => (arr.findIndex((o) => st.indexOf(o) >= 0) >= 0);

        let skippeddLog = filteredLog.filter((o) => contains(errorskiped, o.message));
        if (skippeddLog.length > 0) {
            I.logYellow('console log skipped: ' + util.inspect(skippeddLog));
        }

        filteredLog2 = filteredLog.filter((o) => !contains(errorskiped, o.message));

        ///
        if (filteredLog2.length > 0) { // check count without skipped but show error with skipped
            let err;
            let msginspected = util.inspect(filteredLog);
            try {
                let msgerr = 'console error: ';
                filteredLog.map((o, ix) => {
                    msgerr += `\n [${ix}] `;
                    if (o.message) {
                        let msg;
                        let nline = o.message.indexOf('\n');
                        if (nline >= 0) {
                            msgerr += o.message.substring(0, nline);
                        } else {
                            msgerr += o.message;
                        }
                    }
                    else {
                        msgerr += util.inspect(o);
                    }
                });
                err = new Error(msgerr);
                I.logRed(msgerr);
                I.saveError(err);
            } catch (error) {
                let msgerr = 'error at global.spec.ts:' + error.message;
                I.logYellow(msgerr);
                let err0 = new Error(msgerr);
                I.saveError(err0);
                err = new Error(msginspected);
                I.saveError(err);
            }
            I.fail(err);
            I.expectToBe(promise.when(filteredLog2.length), 0, msginspected);
            throw err;
        } else {
            I.logGray('no severe console errors.');
         //   I.expectToBe(promise.when(true), true, 'expect console error to work.');
            // expect(true).toBe(true);
            return;
        }
    });
});