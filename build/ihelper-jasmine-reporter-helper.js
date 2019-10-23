// import { IHelper as I } from './ihelper';
// import { promise } from 'protractor';
// import * as _ from 'lodash';
// // import * as chalk from 'chalk';
// const chalk = require('chalk');
// let IncomingWebhook = require('@slack/client').IncomingWebhook;
// export class IHelperJasmineReporterConfigInfra {
//     slack: { url: string };
//     git: { url: string, baseDir: string, branch?: string, long: string, short: string };
//     gitParsedInfo: { gitBranchLink, gitBranch, gitCommitLink };
//     jenkins: { on: boolean, url: string, buildUrl: string, buildNumber: string, jobName: string, gitCommit: string, gitUrl: string, gitBranch: string, workspace };
//     sauce: { on: boolean, url: string, jobId: string, dashUrl: string, metaUrl: string, watchUrl: string };
//     protractor: { sessionId: string; };
//     automation: { ty: string };
// }
// export class IHelperJasmineReporterConfig {
//     app: { ty: string, v: string };
//     env: string;
//     infra: IHelperJasmineReporterConfigInfra;
// }
// export class AllResultsParser {
//     itemById: { [key: string]: AllItem };
//     cfg: IHelperJasmineReporterConfig;
//     constructor(public data: JResults) {
//         this.itemById = data.itemById;
//         this.cfg = data.cfg;
//         let all = this;
//         // connect tree
//         let setFid = (item) => {
//             if (item.fid) return;
//             if (item.pid) {
//                 let pitem: AllItem = all.itemById[item.pid];
//                 pitem.children = pitem.children || [];
//                 pitem.children.push(item);
//                 if (!pitem.fid) setFid(pitem);
//                 item.fid = pitem.fid + '.' + pitem.children.length;
//             } else {
//                 all.rsuites = all.rsuites || [];
//                 all.rsuites.push(item);
//                 item.fid = all.rsuites.length + '';
//             }
//         };
//         all.items.map(item => { item.fid = null; }); // cleaning
//         all.items.map(item => {
//             setFid(item);
//         });
//         // console.log(all.rsuites);
//     }
//     // cfg: IHelperJasmineReporterConfig;
//     get items() { return <AllItem[]>Object.keys(this.itemById).map((k) => this.itemById[k]); } // : AllItem[]= [];
//     // itemById = {};
//     // getFullId = (item) => {
//     //   let parent = AllResults.itemById[item.rid];
//     //   return (parent ? parent.ix + '.' : '') + `${item.ix}`;
//     // }
//     byTy = (ty) => { return this.items.filter(o => o.ty === ty); };
//     byStatus = (issues: AllItem[], status) => { return issues.filter(o => o.status === status); };
//     itemsByParent = (id) => { return this.specs.filter(o => o.pid === id); };
//     itemsByRoot = (id) => { return this.specs.filter(o => o.rid === id); };
//     suiteMeta = (suiteId) => {
//         let me = this;
//         let suite = me.itemById[suiteId];
//         let passedExpCt = me.passedExpCt(suite.id);
//         let failedExpCt = me.failedExpCt(suite.id);
//         let itsFail = me.specsFailByRoot(suite.id);
//         let itsDis = me.specsDisByRoot(suite.id);
//         let itsPass = me.specsPassByRoot(suite.id);
//         let itsAll = me.specsByRoot(suite.id);
//         return {
//             itsAll: itsAll, itsDis: itsDis, itsFail: itsFail, itsPass: itsPass,
//             pass: (itsFail.length + itsDis.length === 0),
//             failedExpCt: failedExpCt, passedExpCt: passedExpCt
//         };
//     }
//     itemsDis(items: AllItem[] = this.items) { return this.byStatus(items, 'disabled'); }
//     itemsFail(items: AllItem[] = this.items) { return this.byStatus(items, 'failed'); }
//     itemsPass(items: AllItem[] = this.items) { return this.byStatus(items, 'passed'); }
//     itemsFinished(items: AllItem[] = this.items) { return this.byStatus(items, 'finished'); }
//     get suites() { return this.byTy('desc'); }
//     get suitesDis() { return this.itemsDis(this.suites); }
//     get suitesFail() { return this.itemsFail(this.suites); }
//     get suitesPass() { return this.itemsFinished(this.suites); }
//     rsuites: AllItem[];
//     get rsuitesDis() { return this.itemsDis(this.rsuites); }
//     get rsuitesFail() { return this.itemsFail(this.rsuites); }
//     get rsuitesPass() { return this.itemsFinished(this.rsuites); }
//     get specs() { return this.byTy('it'); }
//     get specsDis() { return this.itemsDis(this.specs); }
//     get specsFail() { return this.itemsFail(this.specs); }
//     get specsPass() { return this.itemsPass(this.specs); }
//     specsDisByRoot(rid: string) { return this.itemsDis(this.itemsByRoot(rid)); }
//     specsFailByRoot(rid: string) { return this.itemsFail(this.itemsByRoot(rid)); }
//     specsPassByRoot(rid: string) { return this.itemsPass(this.itemsByRoot(rid)); }
//     specsByRoot(rid: string) { return this.itemsByRoot(rid); }
//     itemsPassedExpCt(items: AllItem[]) { return items.reduce((p, c, cix) => p + c.pexct, 0); }
//     itemsFailedExpCt(items: AllItem[]) { return items.reduce((p, c, cix) => p + c.fexct, 0); }
//     passedExpCt(rid: string) { return this.itemsPassedExpCt(this.itemsByRoot(rid)); }
//     failedExpCt(rid: string) { return this.itemsFailedExpCt(this.itemsByRoot(rid)); }
//     // itemsDisByRoot(rId: string) { debugger; return this.itemsDis(this.itemsByRoot(rId)); }
//     // itemsFailByRoot(rId: string) { return this.itemsFail(this.itemsByRoot(rId)); }
//     // itemsPassByRoot(rId: string) { return this.itemsPass(this.itemsByRoot(rId)); }
//     get pexct() { return this.itemsPassedExpCt(this.specs); }
//     get fexct() { return this.itemsFailedExpCt(this.specs); }
//     get pass() { return this.itemsFail().length + this.itemsDis().length === 0; }
//     get totalerrorsct() { return this.items.reduce((p, c, cix) => p + c.esp.length, 0); }
// }
// export interface AllSuite {
//     specpass: number; specct: number; specfail: number; specdis: number; d: string; filen: string; url: string; _ref: {}; id: string; fexct: number; pexct: number;
// }
// export interface AllItem {
//     // get parent (){ return AllResults.issuesById[this.pid];}
//     fid: string; // full id
//     rid: string;
//     pid: string;
//     id: string;
//     _id: string;
//     ty: string;
//     d: string; // item description / title
//     source: FileInfo;
//     // desc: { id: string, d: string, ix: number }; // aka suites
//     status: string;
//     fexct: number;
//     pexct: number;
//     es: any[]; // saved errors array
//     esp: { fileInfo: FileInfo, msg: string }[]; // saverd errors first failed lines
//     children: AllItem[];
// }
// // interface AllResultsPerItem
// // { id: string; l: number; d: string; passexpct: number; failedexpectct: number; esp: { fileInfo: FileInfo, msg: string }[]; }
// export interface FileInfo { url: string; line: number; file: string; fullFile: string; }
// export class SaveErrorInfo {
//     e: any;
//     meta: {
//         msg: string; // enhanced error to display
//         fstack: any[]; // fixed/filtered stack array
//         fexp: any; // failed expectation asociated
//         data: any; // other data
//     } = null;
// }
// export class JasmineReporterSlackHelper {
//     static reportToSlack = (msg, slackUrl) => {
//         let defer = promise.defer();
//         if (!slackUrl) { defer.fulfill(); return; }
//         // let slackUrl = 'https://hooks.slack.com/services/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' // qa-reports-local
//         // let slackUrl = 'https://hooks.slack.com/services/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'; // qa-reports
//         let webhook = new IncomingWebhook(slackUrl);
//         webhook.send(msg, function (err, res) {
//             if (err) {
//                 I.logYellow('Slack - Error:' + I.JSONStringify(err));
//             } else {
//                 I.logGreen('Slack - Message sent ');
//                 I.logGray(I.JSONStringify(res));
//             }
//             defer.fulfill();
//         });
//         return defer.promise;
//     }
//     static createDoneSlackMessage = (all: AllResultsParser) => {
//         // let all = AllResultsParser;
//         let msg = { attachments: [] };
//         let atts = msg.attachments;
//         let cfg = all.cfg;
//         let cfgGitInfo = cfg.infra.gitParsedInfo;
//         let sauceLink = cfg.infra.sauce.metaUrl;
//         let logLink = cfg.infra.jenkins.buildUrl;
//         let passcolor = all.pass ? '#60ff60' : '#ff6060';
//         let jenkinsButton = cfg.infra.jenkins.on ? `\` <${logLink}|Jenkins Job> \`` : '';
//         let sauceButton = cfg.infra.sauce.on ? `\` <${sauceLink}|Sauce Meta> \`` : '';
//         // header
//         // let title = `Suite Results`;
//         let senv = all.cfg.env.toUpperCase();
//         let l0text =
//             `*E2E Tests Suites - Results ${all.pass ? 'OK' : 'FAIL'}*\n ${senv} - ${all.cfg.app.ty} - ${all.cfg.app.v}   ${sauceButton} ${jenkinsButton}\n branch: <${cfgGitInfo.gitBranchLink}|${cfgGitInfo.gitBranch}>  commit: <${cfgGitInfo.gitCommitLink}|${cfg.infra.git.short}>\n`;
//         l0text +=
//             `${all.rsuitesPass.length}/${all.rsuites.length} suites - ${all.specsPass.length}/${all.specs.length} its - ${all.pexct}/${all.pexct + all.fexct} expecs`;
//         let l0 = { 'color': passcolor, 'fallback': 'Suite Results', 'text': l0text, 'mrkdwn_in': ['text'] };
//         atts.push(l0);
//         // per suite
//         all.rsuites.map(suite => {
//             // let itemsFail = all.itemsFailByRoot(suite.id);
//             // let specs = all.suiteMeta(suite.id);
//             // let specsFail = all.specsFailBySuite(suite.id);
//             // let suitepass = (itemsFail.length === 0), suiteduration = '-';
//             let s = all.suiteMeta(suite.id);
//             let suitetext = {
//                 fallback: `${suite.d} ${s.pass ? '(pass)' : '(fail)'}`,
//                 text: `${s.pass ? ':white_check_mark:' : ':warning:'}  * ${suite.fid} - ${suite.d}* - ${s.passedExpCt}/${s.passedExpCt + s.failedExpCt} exps <${suite.source.url}|${suite.source.file}> `, 'mrkdwn_in': ['text']
//             };
//             atts.push(suitetext);
//         });
//         if (all.items.length > 0) {
//             let reportPerItemFail = (item: AllItem) => {
//                 let rItem = <AllItem>all.itemById[item.rid];
//                 let lerrstext = (`:exclamation:*${rItem.fid} - ${rItem.d} * \` <http://google.com|Go Screenshot> \`  \` <http://google.com|Create Ticket> \`\n${item.fid} - ${item.d}\n - [<${item.source.url}|${item.source.file}(${item.source.line})>] source `); // specs (${ent.pexct}/${ent.pexct + ent.fexct})
//                 // let efl = ((ns.esp && ns.esp.length > 0) ? ' - [' + ns.esp + ']' : '');
//                 let esp = item.esp;
//                 esp.map(o => {
//                     // if (!o) { o = { fileInfo: { filel: 0, filen: 'unknown', urlfile: me.gitLink, fullfilen: 'unknown' }, msg: '' }; };
//                     lerrstext += (`\n - [<${o.fileInfo.url}|${o.fileInfo.file}(${o.fileInfo.line})>] `) + (`${o.msg}`);
//                 });
//                 let lerrs = { fallback: 'error', 'mrkdwn_in': ['text'], text: lerrstext };
//                 atts.push(lerrs);
//             };
//             let issues = all.itemsFail();
//             if (issues.length > 0) {
//                 let lheadfail = { 'color': '#ff6060', 'fallback': 'Issues', 'title': 'Issues', 'text': `${issues.length} failed` };
//                 atts.push(lheadfail);
//                 _.sortBy(issues, 'fid').map(issue => reportPerItemFail(issue));
//             }
//         }
//         let finalline = { 'color': passcolor, 'fallback': 'SUITES', 'title': 'E2E Tests Suites - Results End' };
//         atts.push(finalline);
//         return msg;
//     }
//     ////////// SLACK
//     static createStartSlackMessage = (cfg: IHelperJasmineReporterConfig) => {
//         let msg = { attachments: [] };
//         let atts = msg.attachments;
//         let passcolor = '#4286f4';
//         let sauceLink = cfg.infra.sauce.watchUrl;
//         let logLink = cfg.infra.jenkins.buildUrl;
//         // let cfg = cfg;
//         let senv = cfg.env.toUpperCase();
//         let cfgGitInfo = cfg.infra.gitParsedInfo;
//         let jenkinsButton = cfg.infra.jenkins.on ? `\` <${logLink}|Jenkins Job> \`` : '';
//         let sauceButton = cfg.infra.sauce.on ? `\` <${sauceLink}|Sauce Watch> \`` : '';
//         let l0text =
//             `*E2E Tests Suites - Started*\n ${senv} - ${cfg.app.ty} - ${cfg.app.v}   ${sauceButton} ${jenkinsButton}\n branch: <${cfgGitInfo.gitBranchLink}|${cfgGitInfo.gitBranch}>  commit: <${cfgGitInfo.gitCommitLink}|${cfg.infra.git.short}>\n`;
//         let l0 = { 'color': passcolor, 'fallback': 'Suite Results', 'text': l0text, 'mrkdwn_in': ['text'] };
//         atts.push(l0);
//         return msg;
//     }
//     static reportToConsole = (all: AllResultsParser) => {
//         // let all = AllResultsParser;
//         let nss = all.specs;
//         let specErrorsCount = all.specsFail.length;
//         let reportPerItem = (item: AllItem) => {
//             let rparent = all.itemById[item.rid];
//             let msg0 = chalk.white(`${item.fid} [${item.source.file}(${item.source.line})] - ${item.d} - `);
//             let st = ` ${item.status}`;
//             let msg1 = ((item.status === 'passed' || item.status === 'finished') ? chalk.green(st) : chalk.red(st));
//             let msg2 = chalk.white(` (${item.pexct}/${item.pexct + item.fexct}) - '${item.d}' `);
//             console.log(msg0 + msg1 + msg2);
//             // let parent = <AllItem>all.itemById[issue.rid];
//             // let msg0 = chalk.white((parent ? parent.ix + '.' : '') + `${issue.ix} ${issue.source.line} - `);
//             // let msg2 = chalk.white(`(${issue.pexct}/${issue.pexct + issue.fexct})`);
//             // console.log(msg0 + msg2);
//             let esp = item.esp;
//             esp.map(o => {
//                 let msg3 = chalk.white(` - [${o.fileInfo.file}(${o.fileInfo.line})] `) + chalk.yellow(`${o.msg}`);
//                 console.log(msg3);
//             });
//         };
//         I.log('===============================');
//         // h.log('======== ITEMS RESULTS ========');
//         // per spec
//         // all.items.map((item) => { // ns = spec
//         //   let rparent = all.itemById[item.rid];
//         //   let msg0 = chalk.white(`${item.fid} [${item.source.file}(${item.source.line})] - ${item.d} - `);
//         //   let st = ` ${item.status}`;
//         //   let msg1 = ((item.status === 'passed') ? chalk.green(st) : chalk.red(st));
//         //   let msg2 = chalk.white(` (${item.pexct}/${item.pexct + item.fexct}) - '${item.d}' `);
//         //   console.log(msg0 + msg1 + msg2);
//         // });
//         if (all.items.length > 0) { // FAILED MESSAGES
//             I.log('===============================');
//             I.log('======== ITEMS RESULTS ========');
//             _.sortBy(all.items, 'fid').map(issue => reportPerItem(issue));
//         }
//         I.log('===============================');
//         I.log('======== SUITES RESULTS =======');
//         // header
//         // let title = `Suite Results`;
//         let l0text = `*Suites Results*\n*${all.pass ? 'OK' : 'FAIL'}* - ${all.cfg.env.toUpperCase()} - ${all.cfg.app.ty} - ${all.cfg.app.v}  \`\n${all.rsuitesPass.length}/${all.rsuites.length} suites - ${all.specsPass.length}/${all.specs.length} its - ${all.pexct}/${all.pexct + all.fexct} expecs
//         `;
//         console.log(chalk.white(l0text));
//         // per suite
//         all.rsuites.map(suite => {
//             let s = all.suiteMeta(suite.id);
//             let txt0 = (s.pass ? chalk.green('passed') : chalk.red('failed'));
//             console.log(chalk.white(`(${suite.fid}) ${suite.d} - ` + txt0 + ` - ${s.itsPass.length}/${s.itsAll.length} its `));
//         });
//         I.log('========= END RESULTS =========');
//         I.log('===============================');
//     }
//     static mergeIPCMessages = (msgs: IPCMessage[]): AllResultsParser => {
//         let itemById: { [key: string]: AllItem } = {};
//         let cfg: IHelperJasmineReporterConfig;
//         msgs.map(msg => {
//             if (!cfg) cfg = msg.meta.cfg;
//             Object.keys(msg.meta.itemById).map((k) => {
//                 let it = msg.meta.itemById[k];
//                 let lit = itemById[it.id];
//                 if (!lit || (lit && lit.status !== 'passed' && it.status === 'passed')) {
//                     itemById[it.id] = it;
//                 }
//             });
//         });
//         return new AllResultsParser({ cfg: cfg, itemById: itemById });
//     }
// }
// export interface JResults { itemById: { [key: string]: AllItem }; cfg: IHelperJasmineReporterConfig; }
// export interface IPCMessage { ty: string; meta: { itemById: { [key: string]: AllItem }; cfg: IHelperJasmineReporterConfig; }; }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWhlbHBlci1qYXNtaW5lLXJlcG9ydGVyLWhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2loZWxwZXItamFzbWluZS1yZXBvcnRlci1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNENBQTRDO0FBQzVDLHdDQUF3QztBQUN4QywrQkFBK0I7QUFDL0IscUNBQXFDO0FBQ3JDLGtDQUFrQztBQUNsQyxrRUFBa0U7QUFFbEUsbURBQW1EO0FBQ25ELDhCQUE4QjtBQUM5QiwyRkFBMkY7QUFDM0Ysa0VBQWtFO0FBQ2xFLHNLQUFzSztBQUN0Syw4R0FBOEc7QUFDOUcsMENBQTBDO0FBQzFDLGtDQUFrQztBQUVsQyxJQUFJO0FBQ0osOENBQThDO0FBQzlDLHNDQUFzQztBQUN0QyxtQkFBbUI7QUFDbkIsZ0RBQWdEO0FBQ2hELElBQUk7QUFDSixrQ0FBa0M7QUFDbEMsNENBQTRDO0FBQzVDLHlDQUF5QztBQUN6QywyQ0FBMkM7QUFDM0MseUNBQXlDO0FBQ3pDLCtCQUErQjtBQUMvQiwwQkFBMEI7QUFDMUIsMEJBQTBCO0FBQzFCLG1DQUFtQztBQUNuQyxvQ0FBb0M7QUFDcEMsOEJBQThCO0FBQzlCLCtEQUErRDtBQUMvRCx5REFBeUQ7QUFDekQsNkNBQTZDO0FBQzdDLGlEQUFpRDtBQUNqRCxzRUFBc0U7QUFDdEUsdUJBQXVCO0FBQ3ZCLG1EQUFtRDtBQUNuRCwwQ0FBMEM7QUFDMUMsc0RBQXNEO0FBQ3RELGdCQUFnQjtBQUNoQixhQUFhO0FBQ2IsbUVBQW1FO0FBQ25FLGtDQUFrQztBQUNsQyw0QkFBNEI7QUFDNUIsY0FBYztBQUNkLHVDQUF1QztBQUV2QyxRQUFRO0FBQ1IsNENBQTRDO0FBQzVDLHFIQUFxSDtBQUNySCx3QkFBd0I7QUFDeEIsaUNBQWlDO0FBQ2pDLHVEQUF1RDtBQUN2RCxrRUFBa0U7QUFDbEUsV0FBVztBQUNYLHNFQUFzRTtBQUN0RSxxR0FBcUc7QUFDckcsZ0ZBQWdGO0FBQ2hGLDhFQUE4RTtB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