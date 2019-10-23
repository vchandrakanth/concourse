"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { StackHelper } from './stackHelper';
const ihelper_1 = require("./ihelper");
const ihelper_jasmine_reporter_1 = require("./ihelper-jasmine-reporter");
const protractor_1 = require("protractor");
const _ = require("lodash");
const fs = require("fs");
//  let git = require('git-rev-sync');
// import * as ipc from 'node-ipc';
const ihelper_jasmine_reporter_helper_1 = require("./ihelper-jasmine-reporter-helper");
// config for slack ipc bypass
// if (process.env.IPCREPORTER) {
//   // https://medium.com/@NorbertdeLangen/communicating-between-nodejs-processes-4e68be42b917
//   ipc.config.id = 'IPCREPORTER_child';
//   ipc.config.retry = 1500;
//   ipc.config.silent = true;
//   ipc.connectTo('IPCREPORTER');
//   // protractorSpawnOptions = { stdio: ['pipe', 'pipe', 'pipe', 'ipc'] };
// }
/////
// gustavomick modified to fail only current suite instead of all suites
// let refs;
// Jasmine doesn't yet have an option to fail fast. This "reporter" is a workaround for the time
// being, making Jasmine essentially skip all tests after the first failure.
// https://github.com/jasmine/jasmine/issues/414
// https://github.com/juliemr/minijasminenode/issues/20
class IHelperJasmineReporter {
    static get env() { return jasmine.getEnv(); }
    static get gitLink() { return ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.git.url; } //
    static get gitBranchLink() { return ihelper_jasmine_reporter_1.IHelperJasmineReporter.gitLink + '/tree/' + ihelper_jasmine_reporter_1.IHelperJasmineReporter.gitBranch; } //
    static get gitBranch() { return (ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.jenkins.gitBranch ? ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.jenkins.gitBranch : ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.git.branch); } //
    static get gitCommitLink() { return ihelper_jasmine_reporter_1.IHelperJasmineReporter.gitLink + '/commit/' + ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.git.long; } //
    static get gitBlobCommitLink() { return ihelper_jasmine_reporter_1.IHelperJasmineReporter.gitLink + '/blob/' + ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.git.long; } //
    static get fileRef() { return ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.git.baseDir; } // '\\arvak\\';
    // workaround to keep original stackstrace and error until protractor team fix their stuff
    static get SlackUrl() {
        if (!ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.slack)
            return;
        return ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.slack.url; //  'https://hooks.slack.com/services/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'; // local
    }
}
exports.IHelperJasmineReporter = IHelperJasmineReporter;
IHelperJasmineReporter.cfg = null;
IHelperJasmineReporter.init = (cfg) => {
    IHelperJasmineReporter.cfg = cfg;
    jasmine._IHReporter = ihelper_jasmine_reporter_1.IHelperJasmineReporter;
    ihelper_jasmine_reporter_1.IHelperJasmineReporter.expectationResultScreenShotDecorator();
    ihelper_jasmine_reporter_1.IHelperJasmineReporter.refs = ihelper_jasmine_reporter_1.IHelperJasmineReporter.getSpecReferences();
    let refs = ihelper_jasmine_reporter_1.IHelperJasmineReporter.refs;
    let env = ihelper_jasmine_reporter_1.IHelperJasmineReporter.env;
    // console.log('This process is your pid ' + process.pid);
    let session;
    protractor_1.browser.getSession()
        .then(function (res) { session = res; })
        .then(() => {
        ihelper_jasmine_reporter_1.IHelperJasmineReporter.protractorSession = session;
        ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.protractor = ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.protractor || {};
        ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.protractor.sessionId = session.getId();
        let sessionId = ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.protractor.sessionId;
        // git
        // try {
        //   JR.cfg.infra.git.branch = JR.cfg.infra.git.branch || git.branch() || '';
        //   JR.cfg.infra.git.long = JR.cfg.infra.git.long || git.long() || '';
        //   JR.cfg.infra.git.short = JR.cfg.infra.git.short || git.short() || JR.cfg.infra.git.long || '';
        //   JR.cfg.infra.gitParsedInfo = { gitBranch: JR.gitBranch, gitBranchLink: JR.gitBranchLink, gitCommitLink: JR.gitCommitLink };
        // } catch (error) {
        //   I.logYellow('error trying to get git info:');
        //   I.logYellow(error);
        //   JR.cfg.infra.git.branch = JR.cfg.infra.git.branch || 'unknown';
        //   JR.cfg.infra.git.long = JR.cfg.infra.git.long || 'unknown';
        // }
        // jenkins
        // https://wiki.jenkins-ci.org/display/JENKINS/Building+a+software+project#Buildingasoftwareproject-JenkinsSetEnvironmentVariables
        try {
            let jen = ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.jenkins;
            jen.buildNumber = process.env.BUILD_NUMBER;
            jen.buildUrl = process.env.BUILD_URL;
            jen.jobName = process.env.JOB_NAME;
            jen.gitCommit = process.env.GIT_COMMIT;
            jen.gitUrl = process.env.GIT_URL;
            jen.workspace = process.env.WORKSPACE;
            jen.on = !!jen.workspace;
            jen.gitBranch = process.env.GIT_BRANCH ? process.env.GIT_BRANCH.replace('origin/', '') : null;
        }
        catch (error) {
            ihelper_1.IHelper.logYellow('error trying to get jenkins info:');
            ihelper_1.IHelper.logYellow(error);
        }
        ///
        ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.jenkins.buildUrl = ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.jenkins.buildUrl || ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.jenkins.url; // http://54.83.197.139:8080/job/android-dev-saucelab/lastBuild/console
        ///
        ///
        ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.sauce = ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.sauce || {};
        ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.sauce.on = ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.automation.ty === 'sauce';
        ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.sauce.jobId = sessionId;
        let sauceId = sessionId;
        ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.sauce.watchUrl = ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.sauce.url + '/tests/' + sauceId + '/watch';
        ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.sauce.metaUrl = ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.sauce.url + '/tests/' + sauceId + '/metadata';
        ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.sauce.dashUrl = ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.sauce.url + '/dashboard/tests';
        ///
        ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.git.branch = ihelper_jasmine_reporter_1.IHelperJasmineReporter.gitBranch;
        ///
        ihelper_1.IHelper.log('IHelperJasmineReporter Config');
        ihelper_1.IHelper.log(ihelper_1.IHelper.JSONStringify(ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg));
        ihelper_jasmine_reporter_1.IHelperJasmineReporter.reportStart();
    });
    return {
        suiteStarted: function (result) {
            ihelper_1.IHelper.logT0(' DESC/SUITE: "' + result.description + '" (id:' + result.id + ') ');
            let s = ihelper_jasmine_reporter_1.IHelperJasmineReporter.refs.suites;
            ihelper_jasmine_reporter_1.IHelperJasmineReporter.currentSuite = s.find(o => o.id === result.id);
        },
        suiteDone: function (result) {
            let s = ihelper_jasmine_reporter_1.IHelperJasmineReporter.currentSuite;
            let c = ihelper_jasmine_reporter_1.IHelperJasmineReporter.currentSpec;
            ihelper_1.IHelper.logGray(' DESC/SUITE DONE: "' + result.description + '" (id:' + result.id + ') ');
        },
        specStarted: function (result) {
            ihelper_1.IHelper.logT1(' IT/SPEC: "' + result.description + '" (id:' + result.id + ') ');
            if (result.__stack && result.__stack.length > 0) {
                result.__fileLocation = '[' + ihelper_jasmine_reporter_1.IHelperJasmineReporter.getFn2(result.__stack[0]) + ']';
                ihelper_1.IHelper.logGray(result.__fileLocation);
            }
            ihelper_jasmine_reporter_1.IHelperJasmineReporter.currentSpec = env.currentSpec = result;
        },
        specDone: function (result) {
            ihelper_1.IHelper.logGray(' IT/SPEC DONE: "' + result.description + '" (id:' + result.id + ') ');
            let stack = result.__stack;
            if (result.status === 'failed') {
                ihelper_jasmine_reporter_1.IHelperJasmineReporter.disableCurrentSuite();
                // (<any>disableSpecs)(refs);
            }
            ihelper_jasmine_reporter_1.IHelperJasmineReporter.currentSpec = env.currentSpec = null;
        },
    };
    // 'jasmineStarted',
    // 'jasmineDone':
};
IHelperJasmineReporter.getSpecReferences = () => {
    let specs = [];
    let suites = [];
    let env = ihelper_jasmine_reporter_1.IHelperJasmineReporter.env;
    // env.throwOnExpectationFailure(true);   // hotfix while Enable jasmine's stopSpecOnExpectationFailure feature for protractor // https://github.com/angular/protractor/issues/3234
    // Use specFilter to gather references to all specs.
    env.specFilter = spec => {
        // (<any>spec).throwOnExpectationFailure = true;
        specs.push(spec);
        return true;
    };
    // Wrap jasmine's describe function to gather references to all suites and specs.
    // env.it = <any>_.wrap(env.it,
    //   (it, ...args) => {
    //     let itname = args[0];
    //     let it0 = it.apply(null, args);
    //     it0.result.__stack = StackHelper.get(2);
    //     return it0;
    //   });
    // let beforeAllWrapper =
    //   (ori, ...args) => {
    //     // TODO check is a prom func same with it and others
    //     return browser.driver.controlFlow().execute( () => {
    //       return <promise.Promise<any>> ori.apply(ori, args);
    //     }).catch((err) => {
    //           h.logRed(err);
    //           throw err;
    //         });;
    //   };
    // env.beforeAll = _.wrap(env.beforeAll, beforeAllWrapper);
    env.describe = _.wrap(ihelper_jasmine_reporter_1.IHelperJasmineReporter.env.describe, (describe, ...args) => {
        let suite = describe.apply(null, args);
        // let balls = suite.beforeAllFns;
        // balls.forEach((ba, ix) => {
        //   balls[ix] = _.wrap(balls[ix], beforeAllWrapper);
        // });
        // suites.push(suite);
        // (<any>suite).result.__stack = StackHelper.get(2);
        // JR.setParentToSpecs(suite);
        // return suite;
    });
    return {
        specs,
        suites
    };
};
/// improvement to disable only current suite instead of all suites
/// if one suite means one path others paths should be still tested
IHelperJasmineReporter.disableCurrentSuite = () => {
    try {
        let csuite = ihelper_jasmine_reporter_1.IHelperJasmineReporter.currentSuite;
        while (csuite.parentSuite && csuite.parentSuite.description !== 'Jasmine__TopLevel__Suite') {
            csuite = csuite.parentSuite;
        }
        ihelper_jasmine_reporter_1.IHelperJasmineReporter.disableSuiteAndDescendants(csuite);
    }
    catch (error) {
        console.log(error);
    }
};
IHelperJasmineReporter.setParentToSpecs = (suite) => {
    suite.children.map((child) => {
        if (child.children) { // child is suite
            ihelper_jasmine_reporter_1.IHelperJasmineReporter.setParentToSpecs(child);
        }
        else { // child is spec
            child.parentSuite = suite;
        }
    });
};
IHelperJasmineReporter.getIdFromItem = (item) => parseInt(item.id.replace('spec', ''));
IHelperJasmineReporter.disableSuiteAndDescendants = (suite) => {
    suite.children.map((child) => {
        if (child.children) { // child is suite
            ihelper_jasmine_reporter_1.IHelperJasmineReporter.disableSuiteAndDescendants(child);
        }
        else { // child is spec
            let cs = ihelper_jasmine_reporter_1.IHelperJasmineReporter.currentSpec;
            if (cs) {
                let res = cs.results;
                let idcurr = ihelper_jasmine_reporter_1.IHelperJasmineReporter.getIdFromItem(cs);
                let idchild = ihelper_jasmine_reporter_1.IHelperJasmineReporter.getIdFromItem(child);
                if (idcurr < idchild) {
                    child.disable();
                }
            }
            else {
                child.disable();
            }
        }
    });
    suite.beforeFns = [];
    suite.afterFns = [];
    suite.beforeAllFns = [];
    suite.afterAllFns = [];
    if (suite.disable)
        suite.disable();
};
IHelperJasmineReporter.getOnlyFileName = (val) => val.getFileName().split('\\').join('/').split('/').pop();
IHelperJasmineReporter.getFn2 = (val) => {
    let file = ihelper_jasmine_reporter_1.IHelperJasmineReporter.getOnlyFileName(val);
    return file + '(' + +val.getLineNumber() + ')';
};
IHelperJasmineReporter.savedData = {};
IHelperJasmineReporter.addErrors = (ref) => {
    let es; //  es = ref.__errors || ref.result.__errors || []; // errors array saved
    if (ref.__errors) {
        es = ref.__errors;
    } // global
    else if (ref.result && ref.result.__errors) {
        es = ref.result.__errors;
    }
    else {
        es = [];
    }
    let esp = []; // array of errors parsed
    es.map((o) => {
        try {
            let fstack; // filtered stack
            let msg;
            // if (o.meta && o.meta.fstack) {
            //   fstack = o.meta.fstack;
            // }
            // else {
            //   fstack = StackHelper.get(0, o.e);
            // }
            let fileinfo;
            if (fstack[0]) {
                fileinfo = ihelper_jasmine_reporter_1.IHelperJasmineReporter.getFileCodeInfo(fstack[0]);
            }
            else {
                fileinfo = { line: 0, file: 'unknown', fullFile: 'unknown', url: ihelper_jasmine_reporter_1.IHelperJasmineReporter.gitLink };
            }
            // let fl = fstack[0] ? me.getFn2(fstack[0]) : 'unknown'; // filtered line
            if (o.meta && o.meta.fexp) {
                msg = o.meta.fexp.message;
            }
            else {
                msg = (o.meta && o.meta.msg) ? o.meta.msg : o.e.message;
            }
            esp.push({ fileInfo: fileinfo, msg: msg });
        }
        catch (error) {
            debugger;
            ihelper_1.IHelper.logYellow(ihelper_1.IHelper.JSONStringify(error));
        }
    });
    return { es: es, esp: esp };
};
// todo take screenshot errors
// https://github.com/angular/protractor/blob/master/docs/faq.md
// full ref at node_modules\jasmine2-protractor-utils\index.js
IHelperJasmineReporter.expectationResultScreenShotDecorator = () => {
    let env = ihelper_jasmine_reporter_1.IHelperJasmineReporter.env;
    let originalAddExpectationResult = jasmine.Spec.prototype.addExpectationResult;
    let expectationResultDecorator = function () {
        if (!arguments[0]) {
            // debugger;
        }
        return originalAddExpectationResult.apply(this, arguments);
    };
    jasmine.Spec.prototype.addExpectationResult = expectationResultDecorator;
};
IHelperJasmineReporter.takeScreenShot = () => {
    // take screenshot
    // this.description and arguments[1].message can be useful to constructing the filename.
    ihelper_1.IHelper.logYellow('takeScreenShot');
    return protractor_1.browser.takeScreenshot()
        .then(function (png) {
        let stream = fs.createWriteStream('./tmp/screenshot.png');
        stream.write(new Buffer(png, 'base64'));
        stream.end();
        ihelper_1.IHelper.logYellow('takeScreenShot --> finished');
    })
        .catch((res) => {
        ihelper_1.IHelper.logRed(res);
        ihelper_1.IHelper.logYellow('takeScreenShot --> error and finished');
    });
};
IHelperJasmineReporter.getFileCodeInfo = (stack0) => {
    let fullfilen = stack0.fileName; // file with path
    let fileName = ihelper_jasmine_reporter_1.IHelperJasmineReporter.getOnlyFileName(stack0); // only file
    let filel = stack0.lineNumber;
    let spli = '/';
    if (fullfilen.indexOf(spli) < 0) {
        spli = '\\';
    }
    let fileix = fullfilen.indexOf(spli + ihelper_jasmine_reporter_1.IHelperJasmineReporter.fileRef + spli);
    let urlfile = ihelper_jasmine_reporter_1.IHelperJasmineReporter.gitBlobCommitLink + fullfilen.substring(fileix).split(spli).join('/') + '#L' + filel; // git url
    let res = { url: urlfile, line: filel, file: fileName, fullFile: fullfilen };
    return res;
};
// workaround to keep original stackstrace and error until protractor team fix their stuff
// static saveError = (err, meta: { msg: string, fexp: any, fstack: any[], data: any } = null) => {
//   let ref = JR.currentSpec || JR.currentSuite; // search for current spec, otherwise go suite
//   if (!ref) {
//     throw new Error('saveError issue: IHelperJasmineReproter doesnt have currenSpec neither currenSuite.');
//   }
//   let es: any[] = ref.__errors = ref.__errors || [];
//   if (es.length > 0 && es[es.length - 1].e === err) {
//     return false; // already logged
//   }
//   es.push({ e: err, meta: meta }); // , ec: _.cloneDeep(err)
//   // r.takeScreenShot();
//   return true;
// }
IHelperJasmineReporter.createReport = () => {
    // console.log('This process is your pid ' + process.pid);
    let specs = ihelper_jasmine_reporter_1.IHelperJasmineReporter.refs.specs;
    // let ix = 0;
    let specErrorsCount = 0;
    try {
        // let pcfg = browser.params.cfg;
        // let penv = browser.params.env;
        // all.cfg = me.cfg; // { app: { ty: pcfg.app_sty, v: pcfg.app_ver }, svr: { env: pcfg.env } };
        let getRootDesc = (item) => {
            while (item.parentSuite && item.parentSuite.parentSuite) {
                item = item.parentSuite;
            }
            return item;
        };
        let getParentDesc = (item) => {
            if (item.parentSuite && item.parentSuite.parentSuite) {
                return item.parentSuite;
            }
            return null;
        };
        let addItem = (_item, isSuite) => {
            // file refs
            let stack0 = _item.result.__stack[0];
            let fileinfo = ihelper_jasmine_reporter_1.IHelperJasmineReporter.getFileCodeInfo(stack0);
            // end file refs
            let res = _item.result;
            let theErrors = ihelper_jasmine_reporter_1.IHelperJasmineReporter.addErrors(_item);
            let fex = [];
            let pex = [];
            if (isSuite || !_item.disabled) {
                // if fails outside spec exepctations are added to all specs.
                // this prevents to add that counters , and keep it all to suite level.
                fex = res.failedExpectations ? res.failedExpectations : [];
                pex = res.passedExpectations ? res.passedExpectations : [];
            }
            if (isSuite && theErrors.es.length > 0) {
                res.status = 'failed'; // hotfix to set suite as failed when has
            }
            if (theErrors.es.length < fex.length) {
                debugger;
                let msg = 'pri-reporter - createReport - refine this case if this happen, error should be more or equal that expects.';
                ihelper_1.IHelper.logRed(msg);
            }
            let origin = fileinfo; // res.__fileLocation ? { l: res.__fileLocation, filen: fileinfo.filen, url: fileinfo.urlfile, filel: fileinfo.filel } : { l: '', filen: '', url: '', filel: '' };
            let rdesc = getRootDesc(_item);
            let pdesc = getParentDesc(_item);
            // let ix: number = isSuite ? all.items.length + 1 : all.itemsByParent(desc.id).length + 1;
            let item = {
                fid: null,
                rid: rdesc.id,
                pid: pdesc ? pdesc.id : null,
                _id: res.id,
                id: res.id,
                ty: isSuite ? 'desc' : 'it',
                d: _item.description,
                // ix: ix, // myspecs.length,
                source: origin,
                status: res.status,
                fexct: fex.length,
                pexct: pex.length,
                es: theErrors.es,
                esp: theErrors.esp,
                children: [],
            };
            // all.items.push(item);
            itemById[item.id] = item;
        };
        let itemById = {};
        let itemByIdFixed = {};
        ihelper_jasmine_reporter_1.IHelperJasmineReporter.refs.suites.forEach(suite => addItem(suite, true));
        specs.forEach(spec => addItem(spec, false)); // per spec
        // fix ids `${origin.file}_${origin.line}`,
        let getId = (it) => `${it.ty}_${it.source.file}_${it.source.line}_${it.d}`; // it.d is needit due multiple instance of same item
        Object.keys(itemById).map((k) => {
            let it = itemById[k];
            let rit = itemById[it.rid];
            let pit = itemById[it.pid];
            let source = it.source;
            it.id = getId(it);
            it.rid = rit ? getId(rit) : null;
            it.pid = pit ? getId(pit) : null;
            itemByIdFixed[it.id] = it;
        });
        let all = new ihelper_jasmine_reporter_helper_1.AllResultsParser({ itemById: itemByIdFixed, cfg: ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg });
        // return JR.reportDone(all);
    }
    catch (error) {
        console.log(error);
    }
};
//   static reportDone = (all: AllResultsParser) => {
//     JR.createConsoleLog(all);
//     if (process.env.IPCREPORTER) {
//       ipc.of.IPCREPORTER.emit('jasminereporter', <IPCMessage>{ ty: 'end', meta: { itemById: all.itemById, cfg: all.cfg } });
//       return;
//     }
//     let msg = JasmineReporterSlackHelper.createDoneSlackMessage(all);
//     return JasmineReporterSlackHelper.reportToSlack(msg, JR.SlackUrl);
//   }
IHelperJasmineReporter.reportStart = () => {
    if (process.env.IPCREPORTER) {
        // ipc.of.IPCREPORTER.emit('slackmsg', { ty: 'end', meta: { all: all.itemById, cfg: all.cfg }, msg });
        return;
    }
    let msg = ihelper_jasmine_reporter_helper_1.JasmineReporterSlackHelper.createStartSlackMessage(ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg);
    return ihelper_jasmine_reporter_helper_1.JasmineReporterSlackHelper.reportToSlack(msg, ihelper_jasmine_reporter_1.IHelperJasmineReporter.SlackUrl);
};
IHelperJasmineReporter.createConsoleLog = (all) => {
    try {
        if (Object.keys(ihelper_jasmine_reporter_1.IHelperJasmineReporter.savedData).length > 0) {
            ihelper_1.IHelper.log('===============================');
            ihelper_1.IHelper.log('========= SAVED DATA =========');
            ihelper_1.IHelper.log(ihelper_1.IHelper.JSONStringify(ihelper_jasmine_reporter_1.IHelperJasmineReporter.savedData));
            ihelper_1.IHelper.log('========= END SAVED DATA =========');
            ihelper_1.IHelper.log('===============================');
        }
    }
    catch (error) {
        ihelper_1.IHelper.logYellow('error reporting saved data --' + error.message);
    }
    if (!process.env.IPCREPORTER) {
        ihelper_jasmine_reporter_helper_1.JasmineReporterSlackHelper.reportToConsole(all);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWhlbHBlci1qYXNtaW5lLXJlcG9ydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2loZWxwZXItamFzbWluZS1yZXBvcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtDQUErQztBQUMvQyx1Q0FBeUM7QUFFekMseUVBQTBFO0FBQzFFLDJDQUE4QztBQUM5Qyw0QkFBNEI7QUFDNUIseUJBQXlCO0FBRXpCLHNDQUFzQztBQUN0QyxtQ0FBbUM7QUFDbkMsdUZBQTZLO0FBRzdLLDhCQUE4QjtBQUM5QixpQ0FBaUM7QUFDakMsK0ZBQStGO0FBRS9GLHlDQUF5QztBQUN6Qyw2QkFBNkI7QUFDN0IsOEJBQThCO0FBQzlCLGtDQUFrQztBQUNsQyw0RUFBNEU7QUFDNUUsSUFBSTtBQUNKLEtBQUs7QUFFTCx3RUFBd0U7QUFHeEUsWUFBWTtBQUVaLGdHQUFnRztBQUNoRyw0RUFBNEU7QUFDNUUsZ0RBQWdEO0FBQ2hELHVEQUF1RDtBQUN2RCxNQUFhLHNCQUFzQjtJQUNqQyxNQUFNLEtBQUssR0FBRyxLQUFLLE9BQU8sT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztJQW9UN0MsTUFBTSxLQUFLLE9BQU8sS0FBSyxPQUFPLGlEQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7SUFDeEQsTUFBTSxLQUFLLGFBQWEsS0FBSyxPQUFPLGlEQUFFLENBQUMsT0FBTyxHQUFHLFFBQVEsR0FBRyxpREFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0lBQzlFLE1BQU0sS0FBSyxTQUFTLEtBQUssT0FBTyxDQUFDLGlEQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxpREFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FB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