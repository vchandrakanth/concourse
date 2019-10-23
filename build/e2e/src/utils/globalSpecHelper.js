'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const ihelper_1 = require("../utils/ihelper");
// import { loginPage, forgotPasswordPage as forgotPage, Users, leftMenuPage } from '../../pageobjects/platform';
const protractor_1 = require("protractor");
// import { IHelperJasmineReporter } from './src/utils/ihelper-jasmine-reporter';
let when = protractor_1.promise.when;
const util = require('util');
const ihelper_jasmine_reporter_1 = require("../../../ihelper-jasmine-reporter");
// js errors detection https://github.com/angular/protractor/issues/749
// https://github.com/angular/protractor/blob/master/docs/faq.md#how-can-i-get-hold-of-the-browsers-console
afterEach(() => {
    ihelper_1.IHelper.logGray('Inspecting browser console logs ...');
    return protractor_1.browser.manage().logs().get('browser').then((browserLog) => {
        if (browserLog.length > 0) {
            ihelper_1.IHelper.logGray(util.inspect(browserLog));
        }
        let filteredLog = browserLog.filter(o => (!o.level || o.level.name_ !== 'WARNING')); // level: Level { name_: 'WARNING',
        let filteredLog2 = null;
        let r = ihelper_jasmine_reporter_1.IHelperJasmineReporter;
        let errorskiped = [];
        if (r.currentSpec && r.currentSpec.__errors && r.currentSpec.__errors.length > 0) {
            // with errors
            // so if there is errors at some point then show every error at console except failed to load (network msg at browser)
            errorskiped = [
                'Failed to load resource',
            ];
        }
        else {
            // without errors, only emit error at console with important issues (skipping minor problems)
            /// HOTFIX
            errorskiped = [
                'XMLHttpRequest.requestError', 'Failed to load resource',
                'Unrecognized Content-Security-Policy directive',
                // 'ionic.bundle.js', // errors at ionic bundle
                'analytics.inlinemanual.com',
                '401 ', 'Cannot read property \'formdefwithtasks\' of undefined',
                'auth/login 400 (Bad Request)',
                'https://api.ionic.io/insights', 'Ionic Insights:'
            ];
        }
        let contains = (arr, st) => (arr.findIndex((o) => st.indexOf(o) >= 0) >= 0);
        let skippeddLog = filteredLog.filter((o) => contains(errorskiped, o.message));
        if (skippeddLog.length > 0) {
            ihelper_1.IHelper.logYellow('console log skipped: ' + util.inspect(skippeddLog));
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
                        }
                        else {
                            msgerr += o.message;
                        }
                    }
                    else {
                        msgerr += util.inspect(o);
                    }
                });
                err = new Error(msgerr);
                // h.logRed(msgerr);
                // h.saveError(err);
            }
            catch (error) {
                let msgerr = 'error at global.spec.ts:' + error.message;
                ihelper_1.IHelper.logYellow(msgerr);
                let err0 = new Error(msgerr);
                ihelper_1.IHelper.saveError(err0);
                err = new Error(msginspected);
                // h.saveError(err);
            }
            ihelper_1.IHelper.fail(err);
            // h.expectToBe(promise.when(filteredLog2.length), 0, msginspected);
            // throw err;
        }
        else {
            ihelper_1.IHelper.logGray('no severe console errors.');
            // I.expectToBe(promise.when(true), true, 'expect console error to work.');
            expect(true).toBe(true);
            // return;
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsU3BlY0hlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91dGlscy9nbG9iYWxTcGVjSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7QUFDYiw4Q0FBZ0Q7QUFDaEQsaUhBQWlIO0FBQ2pILDJDQUE4RjtBQUM5RixpRkFBaUY7QUFDakYsSUFBSSxJQUFJLEdBQUcsb0JBQU8sQ0FBQyxJQUFJLENBQUM7QUFDeEIsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLGdGQUEyRTtBQUUzRSx1RUFBdUU7QUFDdkUsMkdBQTJHO0FBRTNHLFNBQVMsQ0FBQyxHQUF5QixFQUFFO0lBQ2pDLGlCQUFDLENBQUMsT0FBTyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7SUFDakQsT0FBTyxvQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtRQUU5RCxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZCLGlCQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztTQUN2QztRQUVELElBQUksV0FBVyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsbUNBQW1DO1FBRXhILElBQUksWUFBWSxHQUFVLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsR0FBRyxpREFBc0IsQ0FBQztRQUMvQixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLENBQUMsV0FBVyxJQUFJ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