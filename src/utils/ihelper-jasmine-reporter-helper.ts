import { IHelper as I } from './ihelper';
import { promise } from 'protractor';
import * as _ from 'lodash';
// import * as chalk from 'chalk';
const chalk = require('chalk');
let IncomingWebhook = require('@slack/client').IncomingWebhook;

export class IHelperJasmineReporterConfigInfra {
    slack: { url: string };
    git: { url: string, baseDir: string, branch?: string, long: string, short: string };
    gitParsedInfo: { gitBranchLink, gitBranch, gitCommitLink };
    jenkins: { on: boolean, url: string, buildUrl: string, buildNumber: string, jobName: string, gitCommit: string, gitUrl: string, gitBranch: string, workspace };
    sauce: { on: boolean, url: string, jobId: string, dashUrl: string, metaUrl: string, watchUrl: string };
    protractor: { sessionId: string; };
    automation: { ty: string };

}
export class IHelperJasmineReporterConfig {
    app: { ty: string, v: string };
    env: string;
    infra: IHelperJasmineReporterConfigInfra;
}
export class AllResultsParser {
    itemById: { [key: string]: AllItem };
    cfg: IHelperJasmineReporterConfig;
    constructor(public data: JResults) {
        this.itemById = data.itemById;
        this.cfg = data.cfg;
        let all = this;
        // connect tree
        let setFid = (item) => {
            if (item.fid) return;
            if (item.pid) {
                let pitem: AllItem = all.itemById[item.pid];
                pitem.children = pitem.children || [];
                pitem.children.push(item);
                if (!pitem.fid) setFid(pitem);
                item.fid = pitem.fid + '.' + pitem.children.length;
            } else {
                all.rsuites = all.rsuites || [];
                all.rsuites.push(item);
                item.fid = all.rsuites.length + '';
            }
        };
        all.items.map(item => { item.fid = null; }); // cleaning
        all.items.map(item => {
            setFid(item);
        });
        // console.log(all.rsuites);

    }
    // cfg: IHelperJasmineReporterConfig;
    get items() { return <AllItem[]>Object.keys(this.itemById).map((k) => this.itemById[k]); } // : AllItem[]= [];
    // itemById = {};
    // getFullId = (item) => {
    //   let parent = AllResults.itemById[item.rid];
    //   return (parent ? parent.ix + '.' : '') + `${item.ix}`;
    // }
    byTy = (ty) => { return this.items.filter(o => o.ty === ty); };
    byStatus = (issues: AllItem[], status) => { return issues.filter(o => o.status === status); };
    itemsByParent = (id) => { return this.specs.filter(o => o.pid === id); };
    itemsByRoot = (id) => { return this.specs.filter(o => o.rid === id); };

    suiteMeta = (suiteId) => {
        let me = this;
        let suite = me.itemById[suiteId];

        let passedExpCt = me.passedExpCt(suite.id);
        let failedExpCt = me.failedExpCt(suite.id);
        let itsFail = me.specsFailByRoot(suite.id);
        let itsDis = me.specsDisByRoot(suite.id);
        let itsPass = me.specsPassByRoot(suite.id);
        let itsAll = me.specsByRoot(suite.id);
        return {
            itsAll: itsAll, itsDis: itsDis, itsFail: itsFail, itsPass: itsPass,
            pass: (itsFail.length + itsDis.length === 0),
            failedExpCt: failedExpCt, passedExpCt: passedExpCt
        };
    }

    itemsDis(items: AllItem[] = this.items) { return this.byStatus(items, 'disabled'); }
    itemsFail(items: AllItem[] = this.items) { return this.byStatus(items, 'failed'); }
    itemsPass(items: AllItem[] = this.items) { return this.byStatus(items, 'passed'); }
    itemsFinished(items: AllItem[] = this.items) { return this.byStatus(items, 'finished'); }

    get suites() { return this.byTy('desc'); }
    get suitesDis() { return this.itemsDis(this.suites); }
    get suitesFail() { return this.itemsFail(this.suites); }
    get suitesPass() { return this.itemsFinished(this.suites); }

    rsuites: AllItem[];
    get rsuitesDis() { return this.itemsDis(this.rsuites); }
    get rsuitesFail() { return this.itemsFail(this.rsuites); }
    get rsuitesPass() { return this.itemsFinished(this.rsuites); }

    get specs() { return this.byTy('it'); }
    get specsDis() { return this.itemsDis(this.specs); }
    get specsFail() { return this.itemsFail(this.specs); }
    get specsPass() { return this.itemsPass(this.specs); }

    specsDisByRoot(rid: string) { return this.itemsDis(this.itemsByRoot(rid)); }
    specsFailByRoot(rid: string) { return this.itemsFail(this.itemsByRoot(rid)); }
    specsPassByRoot(rid: string) { return this.itemsPass(this.itemsByRoot(rid)); }
    specsByRoot(rid: string) { return this.itemsByRoot(rid); }

    itemsPassedExpCt(items: AllItem[]) { return items.reduce((p, c, cix) => p + c.pexct, 0); }
    itemsFailedExpCt(items: AllItem[]) { return items.reduce((p, c, cix) => p + c.fexct, 0); }
    passedExpCt(rid: string) { return this.itemsPassedExpCt(this.itemsByRoot(rid)); }
    failedExpCt(rid: string) { return this.itemsFailedExpCt(this.itemsByRoot(rid)); }

    // itemsDisByRoot(rId: string) { debugger; return this.itemsDis(this.itemsByRoot(rId)); }
    // itemsFailByRoot(rId: string) { return this.itemsFail(this.itemsByRoot(rId)); }
    // itemsPassByRoot(rId: string) { return this.itemsPass(this.itemsByRoot(rId)); }

    get pexct() { return this.itemsPassedExpCt(this.specs); }
    get fexct() { return this.itemsFailedExpCt(this.specs); }
    get pass() { return this.itemsFail().length + this.itemsDis().length === 0; }
    get totalerrorsct() { return this.items.reduce((p, c, cix) => p + c.esp.length, 0); }

}

export interface AllSuite {
    specpass: number; specct: number; specfail: number; specdis: number; d: string; filen: string; url: string; _ref: {}; id: string; fexct: number; pexct: number;
}

export interface AllItem {
    // get parent (){ return AllResults.issuesById[this.pid];}
    fid: string; // full id
    rid: string;
    pid: string;
    id: string;
    _id: string;
    ty: string;
    d: string; // item description / title
    source: FileInfo;
    // desc: { id: string, d: string, ix: number }; // aka suites
    status: string;
    fexct: number;
    pexct: number;
    es: any[]; // saved errors array
    esp: { fileInfo: FileInfo, msg: string }[]; // saverd errors first failed lines
    children: AllItem[];
}

// interface AllResultsPerItem
// { id: string; l: number; d: string; passexpct: number; failedexpectct: number; esp: { fileInfo: FileInfo, msg: string }[]; }
export interface FileInfo { url: string; line: number; file: string; fullFile: string; }

export class SaveErrorInfo {
    e: any;
    meta: {
        msg: string; // enhanced error to display
        fstack: any[]; // fixed/filtered stack array
        fexp: any; // failed expectation asociated
        data: any; // other data
    } = null;
}

export class JasmineReporterSlackHelper {

    static reportToSlack = (msg, slackUrl) => {
        let defer = promise.defer();
        if (!slackUrl) { defer.fulfill(); return; }
        // let slackUrl = 'https://hooks.slack.com/services/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' // qa-reports-local
        // let slackUrl = 'https://hooks.slack.com/services/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'; // qa-reports

        let webhook = new IncomingWebhook(slackUrl);
        webhook.send(msg, function (err, res) {
            if (err) {
                I.logYellow('Slack - Error:' + I.JSONStringify(err));
            } else {
                I.logGreen('Slack - Message sent ');
                I.logGray(I.JSONStringify(res));
            }
            defer.fulfill();
        });

        return defer.promise;

    }
    static createDoneSlackMessage = (all: AllResultsParser) => {
        // let all = AllResultsParser;
        let msg = { attachments: [] };
        let atts = msg.attachments;
        let cfg = all.cfg;
        let cfgGitInfo = cfg.infra.gitParsedInfo;
        let sauceLink = cfg.infra.sauce.metaUrl;
        let logLink = cfg.infra.jenkins.buildUrl;
        let passcolor = all.pass ? '#60ff60' : '#ff6060';
        let jenkinsButton = cfg.infra.jenkins.on ? `\` <${logLink}|Jenkins Job> \`` : '';
        let sauceButton = cfg.infra.sauce.on ? `\` <${sauceLink}|Sauce Meta> \`` : '';
        // header
        // let title = `Suite Results`;
        let senv = all.cfg.env.toUpperCase();
        let l0text =
            `*E2E Tests Suites - Results ${all.pass ? 'OK' : 'FAIL'}*\n ${senv} - ${all.cfg.app.ty} - ${all.cfg.app.v}   ${sauceButton} ${jenkinsButton}\n branch: <${cfgGitInfo.gitBranchLink}|${cfgGitInfo.gitBranch}>  commit: <${cfgGitInfo.gitCommitLink}|${cfg.infra.git.short}>\n`;
        l0text +=
            `${all.rsuitesPass.length}/${all.rsuites.length} suites - ${all.specsPass.length}/${all.specs.length} its - ${all.pexct}/${all.pexct + all.fexct} expecs`;
        let l0 = { 'color': passcolor, 'fallback': 'Suite Results', 'text': l0text, 'mrkdwn_in': ['text'] };
        atts.push(l0);

        // per suite
        all.rsuites.map(suite => {
            // let itemsFail = all.itemsFailByRoot(suite.id);
            // let specs = all.suiteMeta(suite.id);
            // let specsFail = all.specsFailBySuite(suite.id);
            // let suitepass = (itemsFail.length === 0), suiteduration = '-';
            let s = all.suiteMeta(suite.id);
            let suitetext = {
                fallback: `${suite.d} ${s.pass ? '(pass)' : '(fail)'}`,
                text: `${s.pass ? ':white_check_mark:' : ':warning:'}  * ${suite.fid} - ${suite.d}* - ${s.passedExpCt}/${s.passedExpCt + s.failedExpCt} exps <${suite.source.url}|${suite.source.file}> `, 'mrkdwn_in': ['text']
            };
            atts.push(suitetext);
        });
        if (all.items.length > 0) {
            let reportPerItemFail = (item: AllItem) => {
                let rItem = <AllItem>all.itemById[item.rid];
                let lerrstext = (`:exclamation:*${rItem.fid} - ${rItem.d} * \` <http://google.com|Go Screenshot> \`  \` <http://google.com|Create Ticket> \`\n${item.fid} - ${item.d}\n - [<${item.source.url}|${item.source.file}(${item.source.line})>] source `); // specs (${ent.pexct}/${ent.pexct + ent.fexct})
                // let efl = ((ns.esp && ns.esp.length > 0) ? ' - [' + ns.esp + ']' : '');
                let esp = item.esp;
                esp.map(o => {
                    // if (!o) { o = { fileInfo: { filel: 0, filen: 'unknown', urlfile: me.gitLink, fullfilen: 'unknown' }, msg: '' }; };
                    lerrstext += (`\n - [<${o.fileInfo.url}|${o.fileInfo.file}(${o.fileInfo.line})>] `) + (`${o.msg}`);
                });
                let lerrs = { fallback: 'error', 'mrkdwn_in': ['text'], text: lerrstext };
                atts.push(lerrs);
            };
            let issues = all.itemsFail();
            if (issues.length > 0) {
                let lheadfail = { 'color': '#ff6060', 'fallback': 'Issues', 'title': 'Issues', 'text': `${issues.length} failed` };
                atts.push(lheadfail);
                _.sortBy(issues, 'fid').map(issue => reportPerItemFail(issue));
            }
        }

        let finalline = { 'color': passcolor, 'fallback': 'SUITES', 'title': 'E2E Tests Suites - Results End' };
        atts.push(finalline);

        return msg;
    }
    ////////// SLACK
    static createStartSlackMessage = (cfg: IHelperJasmineReporterConfig) => {
        let msg = { attachments: [] };
        let atts = msg.attachments;

        let passcolor = '#4286f4';
        let sauceLink = cfg.infra.sauce.watchUrl;
        let logLink = cfg.infra.jenkins.buildUrl;
        // let cfg = cfg;
        let senv = cfg.env.toUpperCase();
        let cfgGitInfo = cfg.infra.gitParsedInfo;
        let jenkinsButton = cfg.infra.jenkins.on ? `\` <${logLink}|Jenkins Job> \`` : '';
        let sauceButton = cfg.infra.sauce.on ? `\` <${sauceLink}|Sauce Watch> \`` : '';
        let l0text =
            `*E2E Tests Suites - Started*\n ${senv} - ${cfg.app.ty} - ${cfg.app.v}   ${sauceButton} ${jenkinsButton}\n branch: <${cfgGitInfo.gitBranchLink}|${cfgGitInfo.gitBranch}>  commit: <${cfgGitInfo.gitCommitLink}|${cfg.infra.git.short}>\n`;
        let l0 = { 'color': passcolor, 'fallback': 'Suite Results', 'text': l0text, 'mrkdwn_in': ['text'] };
        atts.push(l0);
        return msg;
    }



    static reportToConsole = (all: AllResultsParser) => {

        // let all = AllResultsParser;
        let nss = all.specs;
        let specErrorsCount = all.specsFail.length;


        let reportPerItem = (item: AllItem) => {

            let rparent = all.itemById[item.rid];
            let msg0 = chalk.white(`${item.fid} [${item.source.file}(${item.source.line})] - ${item.d} - `);
            let st = ` ${item.status}`;
            let msg1 = ((item.status === 'passed' || item.status === 'finished') ? chalk.green(st) : chalk.red(st));
            let msg2 = chalk.white(` (${item.pexct}/${item.pexct + item.fexct}) - '${item.d}' `);
            console.log(msg0 + msg1 + msg2);

            // let parent = <AllItem>all.itemById[issue.rid];
            // let msg0 = chalk.white((parent ? parent.ix + '.' : '') + `${issue.ix} ${issue.source.line} - `);
            // let msg2 = chalk.white(`(${issue.pexct}/${issue.pexct + issue.fexct})`);
            // console.log(msg0 + msg2);
            let esp = item.esp;
            esp.map(o => {
                let msg3 = chalk.white(` - [${o.fileInfo.file}(${o.fileInfo.line})] `) + chalk.yellow(`${o.msg}`);
                console.log(msg3);
            });

        };



        I.log('===============================');
        // h.log('======== ITEMS RESULTS ========');
        // per spec
        // all.items.map((item) => { // ns = spec
        //   let rparent = all.itemById[item.rid];
        //   let msg0 = chalk.white(`${item.fid} [${item.source.file}(${item.source.line})] - ${item.d} - `);
        //   let st = ` ${item.status}`;
        //   let msg1 = ((item.status === 'passed') ? chalk.green(st) : chalk.red(st));
        //   let msg2 = chalk.white(` (${item.pexct}/${item.pexct + item.fexct}) - '${item.d}' `);
        //   console.log(msg0 + msg1 + msg2);
        // });
        if (all.items.length > 0) { // FAILED MESSAGES
            I.log('===============================');
            I.log('======== ITEMS RESULTS ========');
            _.sortBy(all.items, 'fid').map(issue => reportPerItem(issue));


        }

        I.log('===============================');
        I.log('======== SUITES RESULTS =======');




        // header
        // let title = `Suite Results`;
        let l0text = `*Suites Results*\n*${all.pass ? 'OK' : 'FAIL'}* - ${all.cfg.env.toUpperCase()} - ${all.cfg.app.ty} - ${all.cfg.app.v}  \`\n${all.rsuitesPass.length}/${all.rsuites.length} suites - ${all.specsPass.length}/${all.specs.length} its - ${all.pexct}/${all.pexct + all.fexct} expecs
        `;
        console.log(chalk.white(l0text));

        // per suite
        all.rsuites.map(suite => {
            let s = all.suiteMeta(suite.id);
            let txt0 = (s.pass ? chalk.green('passed') : chalk.red('failed'));
            console.log(chalk.white(`(${suite.fid}) ${suite.d} - ` + txt0 + ` - ${s.itsPass.length}/${s.itsAll.length} its `));
        });
        I.log('========= END RESULTS =========');
        I.log('===============================');
    }

    static mergeIPCMessages = (msgs: IPCMessage[]): AllResultsParser => {
        let itemById: { [key: string]: AllItem } = {};
        let cfg: IHelperJasmineReporterConfig;
        msgs.map(msg => {
            if (!cfg) cfg = msg.meta.cfg;
            Object.keys(msg.meta.itemById).map((k) => {
                let it = msg.meta.itemById[k];
                let lit = itemById[it.id];
                if (!lit || (lit && lit.status !== 'passed' && it.status === 'passed')) {
                    itemById[it.id] = it;
                }
            });
        });
        return new AllResultsParser({ cfg: cfg, itemById: itemById });
    }
}

export interface JResults { itemById: { [key: string]: AllItem }; cfg: IHelperJasmineReporterConfig; }
export interface IPCMessage { ty: string; meta: { itemById: { [key: string]: AllItem }; cfg: IHelperJasmineReporterConfig; }; }