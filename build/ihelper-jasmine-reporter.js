"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stackHelper_1 = require("./stackHelper");
const ihelper_1 = require("./ihelper");
const ihelper_jasmine_reporter_1 = require("./ihelper-jasmine-reporter");
const protractor_1 = require("protractor");
const _ = require("lodash");
const fs = require("fs");
let git = require('git-rev-sync');
const ipc = require("node-ipc");
const ihelper_jasmine_reporter_helper_1 = require("./ihelper-jasmine-reporter-helper");
// config for slack ipc bypass
if (process.env.IPCREPORTER) {
    // https://medium.com/@NorbertdeLangen/communicating-between-nodejs-processes-4e68be42b917
    ipc.config.id = 'IPCREPORTER_child';
    ipc.config.retry = 1500;
    ipc.config.silent = true;
    ipc.connectTo('IPCREPORTER');
    // protractorSpawnOptions = { stdio: ['pipe', 'pipe', 'pipe', 'ipc'] };
}
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
        try {
            ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.git.branch = ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.git.branch || git.branch() || '';
            ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.git.long = ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.git.long || git.long() || '';
            ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.git.short = ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.git.short || git.short() || ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.git.long || '';
            ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.gitParsedInfo = { gitBranch: ihelper_jasmine_reporter_1.IHelperJasmineReporter.gitBranch, gitBranchLink: ihelper_jasmine_reporter_1.IHelperJasmineReporter.gitBranchLink, gitCommitLink: ihelper_jasmine_reporter_1.IHelperJasmineReporter.gitCommitLink };
        }
        catch (error) {
            ihelper_1.IHelper.logYellow('error trying to get git info:');
            ihelper_1.IHelper.logYellow(error);
            ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.git.branch = ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.git.branch || 'unknown';
            ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.git.long = ihelper_jasmine_reporter_1.IHelperJasmineReporter.cfg.infra.git.long || 'unknown';
        }
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
    env.it = _.wrap(env.it, (it, ...args) => {
        let itname = args[0];
        let it0 = it.apply(null, args);
        it0.result.__stack = stackHelper_1.StackHelper.get(2);
        return it0;
    });
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
        suites.push(suite);
        suite.result.__stack = stackHelper_1.StackHelper.get(2);
        ihelper_jasmine_reporter_1.IHelperJasmineReporter.setParentToSpecs(suite);
        return suite;
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
            if (o.meta && o.meta.fstack) {
                fstack = o.meta.fstack;
            }
            else {
                fstack = stackHelper_1.StackHelper.get(0, o.e);
            }
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
IHelperJasmineReporter.saveError = (err, meta = null) => {
    let ref = ihelper_jasmine_reporter_1.IHelperJasmineReporter.currentSpec || ihelper_jasmine_reporter_1.IHelperJasmineReporter.currentSuite; // search for current spec, otherwise go suite
    if (!ref) {
        throw new Error('saveError issue: IHelperJasmineReproter doesnt have currenSpec neither currenSuite.');
    }
    let es = ref.__errors = ref.__errors || [];
    if (es.length > 0 && es[es.length - 1].e === err) {
        return false; // already logged
    }
    es.push({ e: err, meta: meta }); // , ec: _.cloneDeep(err)
    // r.takeScreenShot();
    return true;
};
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
        return ihelper_jasmine_reporter_1.IHelperJasmineReporter.reportDone(all);
    }
    catch (error) {
        console.log(error);
    }
};
IHelperJasmineReporter.reportDone = (all) => {
    ihelper_jasmine_reporter_1.IHelperJasmineReporter.createConsoleLog(all);
    if (process.env.IPCREPORTER) {
        ipc.of.IPCREPORTER.emit('jasminereporter', { ty: 'end', meta: { itemById: all.itemById, cfg: all.cfg } });
        return;
    }
    let msg = ihelper_jasmine_reporter_helper_1.JasmineReporterSlackHelper.createDoneSlackMessage(all);
    return ihelper_jasmine_reporter_helper_1.JasmineReporterSlackHelper.reportToSlack(msg, ihelper_jasmine_reporter_1.IHelperJasmineReporter.SlackUrl);
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWhlbHBlci1qYXNtaW5lLXJlcG9ydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vaWhlbHBlci1qYXNtaW5lLXJlcG9ydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQTRDO0FBQzVDLHVDQUF5QztBQUV6Qyx5RUFBMEU7QUFDMUUsMkNBQThDO0FBQzlDLDRCQUE0QjtBQUM1Qix5QkFBeUI7QUFFekIsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ2xDLGdDQUFnQztBQUNoQyx1RkFBNks7QUFHN0ssOEJBQThCO0FBQzlCLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUU7SUFDM0IsMEZBQTBGO0lBRTFGLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLG1CQUFtQixDQUFDO0lBQ3BDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN4QixHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDekIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM3Qix1RUFBdUU7Q0FDeEU7QUFDRCxLQUFLO0FBRUwsd0VBQXdFO0FBR3hFLFlBQVk7QUFFWixnR0FBZ0c7QUFDaEcsNEVBQTRFO0FBQzVFLGdEQUFnRDtBQUNoRCx1REFBdUQ7QUFDdkQsTUFBYSxzQkFBc0I7SUFDakMsTUFBTSxLQUFLLEdBQUcsS0FBSyxPQUFPLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFvVDdDLE1BQU0sS0FBSyxPQUFPLEtBQUssT0FBTyxpREFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0lBQ3hELE1BQU0sS0FBSyxhQUFhLEtBQUssT0FBTyxpREFBRSxDQUFDLE9BQU8sR0FBRyxRQUFRLEdBQUcsaURBQUUsQ0FBQyxT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