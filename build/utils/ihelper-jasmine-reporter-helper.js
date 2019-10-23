"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ihelper_1 = require("./ihelper");
const protractor_1 = require("protractor");
const _ = require("lodash");
// import * as chalk from 'chalk';
const chalk = require('chalk');
let IncomingWebhook = require('@slack/client').IncomingWebhook;
class IHelperJasmineReporterConfigInfra {
}
exports.IHelperJasmineReporterConfigInfra = IHelperJasmineReporterConfigInfra;
class IHelperJasmineReporterConfig {
}
exports.IHelperJasmineReporterConfig = IHelperJasmineReporterConfig;
class AllResultsParser {
    constructor(data) {
        this.data = data;
        // itemById = {};
        // getFullId = (item) => {
        //   let parent = AllResults.itemById[item.rid];
        //   return (parent ? parent.ix + '.' : '') + `${item.ix}`;
        // }
        this.byTy = (ty) => { return this.items.filter(o => o.ty === ty); };
        this.byStatus = (issues, status) => { return issues.filter(o => o.status === status); };
        this.itemsByParent = (id) => { return this.specs.filter(o => o.pid === id); };
        this.itemsByRoot = (id) => { return this.specs.filter(o => o.rid === id); };
        this.suiteMeta = (suiteId) => {
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
        };
        this.itemById = data.itemById;
        this.cfg = data.cfg;
        let all = this;
        // connect tree
        let setFid = (item) => {
            if (item.fid)
                return;
            if (item.pid) {
                let pitem = all.itemById[item.pid];
                pitem.children = pitem.children || [];
                pitem.children.push(item);
                if (!pitem.fid)
                    setFid(pitem);
                item.fid = pitem.fid + '.' + pitem.children.length;
            }
            else {
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
    get items() { return Object.keys(this.itemById).map((k) => this.itemById[k]); } // : AllItem[]= [];
    itemsDis(items = this.items) { return this.byStatus(items, 'disabled'); }
    itemsFail(items = this.items) { return this.byStatus(items, 'failed'); }
    itemsPass(items = this.items) { return this.byStatus(items, 'passed'); }
    itemsFinished(items = this.items) { return this.byStatus(items, 'finished'); }
    get suites() { return this.byTy('desc'); }
    get suitesDis() { return this.itemsDis(this.suites); }
    get suitesFail() { return this.itemsFail(this.suites); }
    get suitesPass() { return this.itemsFinished(this.suites); }
    get rsuitesDis() { return this.itemsDis(this.rsuites); }
    get rsuitesFail() { return this.itemsFail(this.rsuites); }
    get rsuitesPass() { return this.itemsFinished(this.rsuites); }
    get specs() { return this.byTy('it'); }
    get specsDis() { return this.itemsDis(this.specs); }
    get specsFail() { return this.itemsFail(this.specs); }
    get specsPass() { return this.itemsPass(this.specs); }
    specsDisByRoot(rid) { return this.itemsDis(this.itemsByRoot(rid)); }
    specsFailByRoot(rid) { return this.itemsFail(this.itemsByRoot(rid)); }
    specsPassByRoot(rid) { return this.itemsPass(this.itemsByRoot(rid)); }
    specsByRoot(rid) { return this.itemsByRoot(rid); }
    itemsPassedExpCt(items) { return items.reduce((p, c, cix) => p + c.pexct, 0); }
    itemsFailedExpCt(items) { return items.reduce((p, c, cix) => p + c.fexct, 0); }
    passedExpCt(rid) { return this.itemsPassedExpCt(this.itemsByRoot(rid)); }
    failedExpCt(rid) { return this.itemsFailedExpCt(this.itemsByRoot(rid)); }
    // itemsDisByRoot(rId: string) { debugger; return this.itemsDis(this.itemsByRoot(rId)); }
    // itemsFailByRoot(rId: string) { return this.itemsFail(this.itemsByRoot(rId)); }
    // itemsPassByRoot(rId: string) { return this.itemsPass(this.itemsByRoot(rId)); }
    get pexct() { return this.itemsPassedExpCt(this.specs); }
    get fexct() { return this.itemsFailedExpCt(this.specs); }
    get pass() { return this.itemsFail().length + this.itemsDis().length === 0; }
    get totalerrorsct() { return this.items.reduce((p, c, cix) => p + c.esp.length, 0); }
}
exports.AllResultsParser = AllResultsParser;
class SaveErrorInfo {
    constructor() {
        this.meta = null;
    }
}
exports.SaveErrorInfo = SaveErrorInfo;
class JasmineReporterSlackHelper {
}
exports.JasmineReporterSlackHelper = JasmineReporterSlackHelper;
JasmineReporterSlackHelper.reportToSlack = (msg, slackUrl) => {
    let defer = protractor_1.promise.defer();
    if (!slackUrl) {
        defer.fulfill();
        return;
    }
    // let slackUrl = 'https://hooks.slack.com/services/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' // qa-reports-local
    // let slackUrl = 'https://hooks.slack.com/services/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'; // qa-reports
    let webhook = new IncomingWebhook(slackUrl);
    webhook.send(msg, function (err, res) {
        if (err) {
            ihelper_1.IHelper.logYellow('Slack - Error:' + ihelper_1.IHelper.JSONStringify(err));
        }
        else {
            ihelper_1.IHelper.logGreen('Slack - Message sent ');
            ihelper_1.IHelper.logGray(ihelper_1.IHelper.JSONStringify(res));
        }
        defer.fulfill();
    });
    return defer.promise;
};
JasmineReporterSlackHelper.createDoneSlackMessage = (all) => {
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
    let l0text = `*E2E Tests Suites - Results ${all.pass ? 'OK' : 'FAIL'}*\n ${senv} - ${all.cfg.app.ty} - ${all.cfg.app.v}   ${sauceButton} ${jenkinsButton}\n branch: <${cfgGitInfo.gitBranchLink}|${cfgGitInfo.gitBranch}>  commit: <${cfgGitInfo.gitCommitLink}|${cfg.infra.git.short}>\n`;
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
        let reportPerItemFail = (item) => {
            let rItem = all.itemById[item.rid];
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
};
////////// SLACK
JasmineReporterSlackHelper.createStartSlackMessage = (cfg) => {
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
    let l0text = `*E2E Tests Suites - Started*\n ${senv} - ${cfg.app.ty} - ${cfg.app.v}   ${sauceButton} ${jenkinsButton}\n branch: <${cfgGitInfo.gitBranchLink}|${cfgGitInfo.gitBranch}>  commit: <${cfgGitInfo.gitCommitLink}|${cfg.infra.git.short}>\n`;
    let l0 = { 'color': passcolor, 'fallback': 'Suite Results', 'text': l0text, 'mrkdwn_in': ['text'] };
    atts.push(l0);
    return msg;
};
JasmineReporterSlackHelper.reportToConsole = (all) => {
    // let all = AllResultsParser;
    let nss = all.specs;
    let specErrorsCount = all.specsFail.length;
    let reportPerItem = (item) => {
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
    ihelper_1.IHelper.log('===============================');
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
        ihelper_1.IHelper.log('===============================');
        ihelper_1.IHelper.log('======== ITEMS RESULTS ========');
        _.sortBy(all.items, 'fid').map(issue => reportPerItem(issue));
    }
    ihelper_1.IHelper.log('===============================');
    ihelper_1.IHelper.log('======== SUITES RESULTS =======');
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
    ihelper_1.IHelper.log('========= END RESULTS =========');
    ihelper_1.IHelper.log('===============================');
};
JasmineReporterSlackHelper.mergeIPCMessages = (msgs) => {
    let itemById = {};
    let cfg;
    msgs.map(msg => {
        if (!cfg)
            cfg = msg.meta.cfg;
        Object.keys(msg.meta.itemById).map((k) => {
            let it = msg.meta.itemById[k];
            let lit = itemById[it.id];
            if (!lit || (lit && lit.status !== 'passed' && it.status === 'passed')) {
                itemById[it.id] = it;
            }
        });
    });
    return new AllResultsParser({ cfg: cfg, itemById: itemById });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWhlbHBlci1qYXNtaW5lLXJlcG9ydGVyLWhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9paGVscGVyLWphc21pbmUtcmVwb3J0ZXItaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXlDO0FBQ3pDLDJDQUFxQztBQUNyQyw0QkFBNEI7QUFDNUIsa0NBQWtDO0FBQ2xDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMvQixJQUFJLGVBQWUsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsZUFBZSxDQUFDO0FBRS9ELE1BQWEsaUNBQWlDO0NBUzdDO0FBVEQsOEVBU0M7QUFDRCxNQUFhLDRCQUE0QjtDQUl4QztBQUpELG9FQUlDO0FBQ0QsTUFBYSxnQkFBZ0I7SUFHekIsWUFBbUIsSUFBYztRQUFkLFNBQUksR0FBSixJQUFJLENBQVU7UUE0QmpDLGlCQUFpQjtRQUNqQiwwQkFBMEI7UUFDMUIsZ0RBQWdEO1FBQ2hELDJEQUEyRDtRQUMzRCxJQUFJO1FBQ0osU0FBSSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvRCxhQUFRLEdBQUcsQ0FBQyxNQUFpQixFQUFFLE1BQU0sRUFBRSxFQUFFLEdBQUcsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5RixrQkFBYSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FB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O0lBQ3RELElBQUksVUFBVSxLQUFLLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hELElBQUksVUFBVSxLQUFLLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRzVELElBQUksVUFBVSxLQUFLLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hELElBQUksV0FBVyxLQUFLLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFELElBQUksV0FBVyxLQUFLLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTlELElBQUksS0FBSyxLQUFLLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkMsSUFBSSxRQUFRLEtBQUssT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEQsSUFBSSxTQUFTLEtBQUssT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEQsSUFBSSxTQUFTLEtBQUssT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFdEQsY0FBYyxDQUFDLEdBQVcsSUFBSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RSxlQUFlLENBQUMsR0FBVyxJQUFJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FB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