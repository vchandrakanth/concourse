// import { StackHelper } from './stackHelper';
import { IHelper as I } from './ihelper';
import * as chalk from 'chalk';
import { IHelperJasmineReporter as JR } from './ihelper-jasmine-reporter';
import { browser, promise } from 'protractor';
import * as _ from 'lodash';
import * as fs from 'fs';

//  let git = require('git-rev-sync');
// import * as ipc from 'node-ipc';
import { IHelperJasmineReporterConfig, AllResultsParser, JasmineReporterSlackHelper, SaveErrorInfo, FileInfo, AllItem, IPCMessage } from './ihelper-jasmine-reporter-helper';


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
export class IHelperJasmineReporter {
  static get env() { return jasmine.getEnv(); }
  static refs: { specs: any[], suites: any[] };
  static currentSuite;
  static currentSpec;
  static protractorSession;
  static cfg: IHelperJasmineReporterConfig = null;
  static init = (cfg: IHelperJasmineReporterConfig) => {
    IHelperJasmineReporter.cfg = cfg;
    (<any>jasmine)._IHReporter = JR;
    JR.expectationResultScreenShotDecorator();
    JR.refs = JR.getSpecReferences();
    let refs = JR.refs;
    let env = JR.env;
    // console.log('This process is your pid ' + process.pid);

    let session;
    browser.getSession()
      .then(function (res) { session = res; })
      .then(() => {
        JR.protractorSession = session;
        JR.cfg.infra.protractor = <any>JR.cfg.infra.protractor || {};
        JR.cfg.infra.protractor.sessionId = session.getId();
        let sessionId = JR.cfg.infra.protractor.sessionId;

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
          let jen = JR.cfg.infra.jenkins;
          jen.buildNumber = process.env.BUILD_NUMBER;
          jen.buildUrl = process.env.BUILD_URL;
          jen.jobName = process.env.JOB_NAME;
          jen.gitCommit = process.env.GIT_COMMIT;
          jen.gitUrl = process.env.GIT_URL;
          jen.workspace = process.env.WORKSPACE;
          jen.on = !!jen.workspace;
          jen.gitBranch = process.env.GIT_BRANCH ? (<string>process.env.GIT_BRANCH).replace('origin/', '') : null;
        } catch (error) {
          I.logYellow('error trying to get jenkins info:');
          I.logYellow(error);
        }
        ///
        JR.cfg.infra.jenkins.buildUrl = JR.cfg.infra.jenkins.buildUrl || JR.cfg.infra.jenkins.url; // http://54.83.197.139:8080/job/android-dev-saucelab/lastBuild/console
        ///

        ///
        JR.cfg.infra.sauce = <any>JR.cfg.infra.sauce || {};
        JR.cfg.infra.sauce.on = JR.cfg.infra.automation.ty === 'sauce';
        JR.cfg.infra.sauce.jobId = sessionId;
        let sauceId = sessionId;
        JR.cfg.infra.sauce.watchUrl = JR.cfg.infra.sauce.url + '/tests/' + sauceId + '/watch';
        JR.cfg.infra.sauce.metaUrl = JR.cfg.infra.sauce.url + '/tests/' + sauceId + '/metadata';
        JR.cfg.infra.sauce.dashUrl = JR.cfg.infra.sauce.url + '/dashboard/tests';
        ///
        JR.cfg.infra.git.branch = JR.gitBranch;
        ///
        I.log('IHelperJasmineReporter Config');
        I.log(I.JSONStringify(JR.cfg));


        JR.reportStart();
      });

    return {
      suiteStarted: function (result) {
        I.logT0(' DESC/SUITE: "' + result.description + '" (id:' + result.id + ') ');
        let s = JR.refs.suites;
        JR.currentSuite = s.find(o => o.id === result.id);
      },
      suiteDone: function (result) {
        let s = JR.currentSuite;
        let c = JR.currentSpec;
        I.logGray(' DESC/SUITE DONE: "' + result.description + '" (id:' + result.id + ') ');
      },
      specStarted: function (result) {
        I.logT1(' IT/SPEC: "' + result.description + '" (id:' + result.id + ') ');
        if (result.__stack && result.__stack.length > 0) {
          result.__fileLocation = '[' + JR.getFn2(result.__stack[0]) + ']';
          I.logGray(result.__fileLocation);
        }
        JR.currentSpec = env.currentSpec = result;

      },
      specDone: function (result) {
        I.logGray(' IT/SPEC DONE: "' + result.description + '" (id:' + result.id + ') ');
        let stack = (<any>result).__stack;
        if (result.status === 'failed') {
          JR.disableCurrentSuite();
          // (<any>disableSpecs)(refs);
        }
        JR.currentSpec = env.currentSpec = null;
      },
    };
    // 'jasmineStarted',
    // 'jasmineDone':
  }

  static getSpecReferences = () => {
    let specs = [];
    let suites = [];
    let env = JR.env;
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

    env.describe = <any>_.wrap(JR.env.describe,
      (describe, ...args) => {


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
  }

  /// improvement to disable only current suite instead of all suites
  /// if one suite means one path others paths should be still tested
  static disableCurrentSuite = () => {
    try {
      let csuite = JR.currentSuite;
      while (csuite.parentSuite && csuite.parentSuite.description !== 'Jasmine__TopLevel__Suite') {
        csuite = csuite.parentSuite;
      }
      JR.disableSuiteAndDescendants(csuite);
    }
    catch (error) {
      console.log(error);
    }
  }
  static setParentToSpecs = (suite) => {
    suite.children.map((child) => {
      if (child.children) { // child is suite
        JR.setParentToSpecs(child);
      } else { // child is spec
        child.parentSuite = suite;
      }
    });

  }

  static getIdFromItem = (item) => parseInt((<string>item.id.replace('spec', '')));
  static disableSuiteAndDescendants = (suite) => {
    suite.children.map((child) => {
      if (child.children) { // child is suite
        JR.disableSuiteAndDescendants(child);
      } else { // child is spec
        let cs = JR.currentSpec;
        if (cs) {
          let res = cs.results;
          let idcurr = JR.getIdFromItem(cs);
          let idchild = JR.getIdFromItem(child);
          if (idcurr < idchild) {
            child.disable();
          }
        } else {
          child.disable();
        }
      }
    });
    suite.beforeFns = [];
    suite.afterFns = [];
    suite.beforeAllFns = [];
    suite.afterAllFns = [];
    if (suite.disable) suite.disable();
  }

  static getOnlyFileName = (val) => (<string>val.getFileName()).split('\\').join('/').split('/').pop();
  static getFn2 = (val) => {
    let file = JR.getOnlyFileName(val);
    return file + '(' + + val.getLineNumber() + ')';
  }

  static savedData: any = {};
  static addErrors = (ref) => {

    let es: SaveErrorInfo[]; //  es = ref.__errors || ref.result.__errors || []; // errors array saved
    if (ref.__errors) { es = ref.__errors; } // global
    else if (ref.result && ref.result.__errors) {
      es = ref.result.__errors;
    } else {
      es = [];
    }
    let esp: { fileInfo: FileInfo, msg: string }[] = []; // array of errors parsed
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
        let fileinfo: FileInfo;
        if (fstack[0]) {
          fileinfo = JR.getFileCodeInfo(fstack[0]);
        } else {
          fileinfo = { line: 0, file: 'unknown', fullFile: 'unknown', url: JR.gitLink };
        }
        // let fl = fstack[0] ? me.getFn2(fstack[0]) : 'unknown'; // filtered line
        if (o.meta && o.meta.fexp) {
          msg = o.meta.fexp.message;
        } else {
          msg = (o.meta && o.meta.msg) ? o.meta.msg : o.e.message;
        }

        esp.push({ fileInfo: fileinfo, msg: msg });
      } catch (error) {
        debugger;
        I.logYellow(I.JSONStringify(error));
      }

    });
    return { es: es, esp: esp };

  }

  // todo take screenshot errors


  // https://github.com/angular/protractor/blob/master/docs/faq.md
  // full ref at node_modules\jasmine2-protractor-utils\index.js
  static expectationResultScreenShotDecorator = () => {
    let env = JR.env;
    let originalAddExpectationResult = (<any>jasmine).Spec.prototype.addExpectationResult;
    let expectationResultDecorator = function () {
      if (!arguments[0]) {
        // debugger;

      }
      return originalAddExpectationResult.apply(this, arguments);
    };
    (<any>jasmine).Spec.prototype.addExpectationResult = expectationResultDecorator;
  }

  static takeScreenShot = () => {
    // take screenshot
    // this.description and arguments[1].message can be useful to constructing the filename.
    I.logYellow('takeScreenShot');
    return browser.takeScreenshot()
      .then(function (png) {
        let stream = (<any>fs).createWriteStream('./tmp/screenshot.png');
        stream.write(new Buffer(png, 'base64'));
        stream.end();
        I.logYellow('takeScreenShot --> finished');
      })
      .catch((res) => {
        I.logRed(res);
        I.logYellow('takeScreenShot --> error and finished');
      });

  }
  static get gitLink() { return JR.cfg.infra.git.url; } //
  static get gitBranchLink() { return JR.gitLink + '/tree/' + JR.gitBranch; } //
  static get gitBranch() { return (JR.cfg.infra.jenkins.gitBranch ? JR.cfg.infra.jenkins.gitBranch : JR.cfg.infra.git.branch); } //
  static get gitCommitLink() { return JR.gitLink + '/commit/' + JR.cfg.infra.git.long; } //
  static get gitBlobCommitLink() { return JR.gitLink + '/blob/' + JR.cfg.infra.git.long; } //

  static get fileRef() { return JR.cfg.infra.git.baseDir; } // '\\arvak\\';
  static getFileCodeInfo = (stack0) => {
    let fullfilen: string = stack0.fileName; // file with path
    let fileName = JR.getOnlyFileName(stack0); // only file
    let filel = stack0.lineNumber;
    let spli = '/';
    if (fullfilen.indexOf(spli) < 0) {
      spli = '\\';
    }
    let fileix = fullfilen.indexOf(spli + JR.fileRef + spli);
    let urlfile = JR.gitBlobCommitLink + fullfilen.substring(fileix).split(spli).join('/') + '#L' + filel; // git url
    let res: FileInfo = { url: urlfile, line: filel, file: fileName, fullFile: fullfilen };
    return res;
  }

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

  static createReport = () => {
    // console.log('This process is your pid ' + process.pid);
    let specs: any[] = JR.refs.specs;
    // let ix = 0;
    let specErrorsCount = 0;
    try {

      // let pcfg = browser.params.cfg;
      // let penv = browser.params.env;
      // all.cfg = me.cfg; // { app: { ty: pcfg.app_sty, v: pcfg.app_ver }, svr: { env: pcfg.env } };

      let getRootDesc = (item) => {
        while (item.parentSuite && item.parentSuite.parentSuite) { item = item.parentSuite; }
        return item;
      };
      let getParentDesc = (item) => {
        if (item.parentSuite && item.parentSuite.parentSuite) { return item.parentSuite; }
        return null;
      };
      let addItem = (_item, isSuite: boolean) => {

        // file refs
        let stack0 = _item.result.__stack[0];
        let fileinfo = JR.getFileCodeInfo(stack0);
        // end file refs
        let res = _item.result;
        let theErrors = JR.addErrors(_item);
        let fex: any[] = [];
        let pex: any[] = [];
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
          I.logRed(msg);
        }

        let origin = fileinfo; // res.__fileLocation ? { l: res.__fileLocation, filen: fileinfo.filen, url: fileinfo.urlfile, filel: fileinfo.filel } : { l: '', filen: '', url: '', filel: '' };

        let rdesc = getRootDesc(_item);
        let pdesc = getParentDesc(_item);
        // let ix: number = isSuite ? all.items.length + 1 : all.itemsByParent(desc.id).length + 1;
        let item: AllItem = {
          fid: null,
          rid: rdesc.id, // could be itself
          pid: pdesc ? pdesc.id : null, // if root then parent null
          _id: res.id,
          id: res.id,
          ty: isSuite ? 'desc' : 'it',
          d: _item.description,
          // ix: ix, // myspecs.length,
          source: origin, // it or suite (beforeall afterall)
          status: res.status, // passed disbled failed
          fexct: fex.length,
          pexct: pex.length,
          es: theErrors.es, // saved errors array
          esp: theErrors.esp, // saverd errors first failed lines
          children: [],
        };

        // all.items.push(item);
        itemById[item.id] = item;


      };
      let itemById: { [key: string]: AllItem } = <any>{};
      let itemByIdFixed: { [key: string]: AllItem } = <any>{};

      JR.refs.suites.forEach(suite => addItem(suite, true));
      specs.forEach(spec => addItem(spec, false)); // per spec


      // fix ids `${origin.file}_${origin.line}`,
      let getId = (it: AllItem) => `${it.ty}_${it.source.file}_${it.source.line}_${it.d}`; // it.d is needit due multiple instance of same item
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

      let all = new AllResultsParser({ itemById: itemByIdFixed, cfg: JR.cfg });

      // return JR.reportDone(all);

    } catch (error) {
      console.log(error);
    }

  }
  // workaround to keep original stackstrace and error until protractor team fix their stuff




  static get SlackUrl() {
    if (!JR.cfg.infra.slack) return;
    return JR.cfg.infra.slack.url; //  'https://hooks.slack.com/services/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'; // local
  }
//   static reportDone = (all: AllResultsParser) => {
//     JR.createConsoleLog(all);
//     if (process.env.IPCREPORTER) {
//       ipc.of.IPCREPORTER.emit('jasminereporter', <IPCMessage>{ ty: 'end', meta: { itemById: all.itemById, cfg: all.cfg } });
//       return;
//     }
//     let msg = JasmineReporterSlackHelper.createDoneSlackMessage(all);
//     return JasmineReporterSlackHelper.reportToSlack(msg, JR.SlackUrl);
//   }

  static reportStart = () => {
    if (process.env.IPCREPORTER) {
      // ipc.of.IPCREPORTER.emit('slackmsg', { ty: 'end', meta: { all: all.itemById, cfg: all.cfg }, msg });
      return;
    }
    let msg = JasmineReporterSlackHelper.createStartSlackMessage(JR.cfg);
    return JasmineReporterSlackHelper.reportToSlack(msg, JR.SlackUrl);
  }

  static createConsoleLog = (all: AllResultsParser) => {
    try {
      if (Object.keys(JR.savedData).length > 0) {
        I.log('===============================');
        I.log('========= SAVED DATA =========');
        I.log(I.JSONStringify(JR.savedData));
        I.log('========= END SAVED DATA =========');
        I.log('===============================');
      }
    } catch (error) {
      I.logYellow('error reporting saved data --' + error.message);
    }
    if (!process.env.IPCREPORTER) {
      JasmineReporterSlackHelper.reportToConsole(all);
    }
  }
}
