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
const log4js = require('log4js');
const utils_1 = require("../utils/utils");
const login_Po_1 = require("../pageObjects/login.Po");
let configProperties = require('../conf/properties');
let HtmlReporter = require('protractor-beautiful-reporter');
let nodemailer = require('nodemailer');
let browserurltest;
exports.config = {
    framework: 'jasmine2',
    plugins: [{
            package: 'protractor-screenshoter-plugin',
            screenshotPath: '../src/REPORTS/e2e',
            screenshotOnExpect: 'failure+success',
            screenshotOnSpec: 'failure+success',
            withLogs: true,
            writeReportFreq: 'asap',
            imageToAscii: 'none',
            clearFoldersBeforeTest: true,
            dumpOnExpect: 'failure+success',
            dumpOnSpec: 'failure+success',
        },
    ],
    directConnect: true,
    capabilities: {
        browserName: 'chrome',
        'shardTestFiles': false,
        'maxInstances': 1,
        loggingPrefs: {
            'driver': 'INFO',
            'browser': 'INFO',
        },
        chromeOptions: {
            args: ['--incognito', '--disable-infobars', '--disable-gpu', '--no-sandbox', '--disable-extensions', '--disable-dev-shm-usage'],
        },
        specs: [
            // '../specs/attributeTags.js',
            // '../specs/assetManager.js',
            // '../specs/logicalDeployment.js',
            // '../specs/logicalDeploymentViolation.js',
            // '../specs/policyGroupTemplate.js',
            // '../specs/policyGroup.js',
            // '../specs/surfaces.js',
            // '../specs/approvals.js',
            // '../specs/modelViolation.js',
            // '../specs/policyViolations.js',
            // '../specs/UpdatePolicyViolation.js',
            // '../specs/inviteUser.js',
            '../specs/addAttributeTagForPG.js',
        ]
    },
    SELENIUM_PROMISE_MANAGER: true,
    beforeLaunch: function () {
        let filepath = './logs/ExecutionLog.log';
        log4js.configure({
            appenders: [
                { type: 'log4js-protractor-appender', category: 'protractorLog4js' },
                {
                    type: 'file',
                    filename: filepath,
                    category: 'protractorLog4js',
                    backups: 10
                }
            ]
        });
    },
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000,
    },
    onPrepare: function () {
        return __awaiter(this, void 0, void 0, function* () {
            const global = require('protractor');
            const browser = global.browser;
            // Browser setting
            browser.ignoreSynchronization = true;
            browser.manage().window().maximize();
            browser.manage().timeouts().implicitlyWait(10000);
            browser.logger = log4js.getLogger('protractorLog4js');
            jasmine.getEnv().addReporter(new HtmlReporter({
                baseDirectory: 'e2e_Results/' + (new Date()).getTime()
            }).getJasmine2Reporter());
            params: {
                env: null;
            }
            const env = process.argv.filter(arg => {
                return arg.includes('--params.env');
            })[0];
            console.log('Current URl' + env);
            if (env.includes('adhoc'))
                browserurltest = 'https://adhoc.concourse.company';
            if (env.includes('beta'))
                browserurltest = 'https://beta.concourse.company';
            if (env.includes('prod'))
                browserurltest = 'https://prod.concourselabs.io';
            let loginPage = new login_Po_1.LoginPage();
            console.log('Current URl' + browserurltest);
            utils_1.goToMainPage(browserurltest);
            let username;
            let password;
            let environment;
            // let user;
            browser.logger.info('Logging into concourse website');
            let currentUrl = browserurltest;
            if (currentUrl.includes('adhoc')) {
                username = configProperties.loginData.adhocUserName;
                password = configProperties.loginData.adhocPassWord;
                environment = 'adhoc';
                // log4js.configure(environment);
                browser.params.user = configProperties.groupData.adhocUser;
            }
            if (currentUrl.includes('beta')) {
                username = configProperties.loginData.betaUserName;
                password = configProperties.loginData.betaPassWord;
                environment = 'beta';
                browser.params.user = configProperties.groupData.betaUser;
                // log4js.configure(environment);
            }
            if (currentUrl.includes('prod')) {
                username = configProperties.loginData.prodUserName;
                password = configProperties.loginData.prodPassWord;
                environment = 'prod';
                browser.params.user = configProperties.groupData.prodUser;
                // log4js.configure(environment);
            }
            loginPage.login(username, password);
            // Slack integration.
            let webRep = require('jasmine-slack-reporter');
            browser.getProcessedConfig().then(function (config) {
                let browserName = config.capabilities.browserName;
                jasmine.getEnv().addReporter(new webRep.WebReporter({
                    projectName: 'Concourse Labs',
                    environment: environment,
                    testname: jasmine.getEnv().currentSpec,
                    // slackUrl: 'https://hooks.slack.com/services/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',
                    slackUrl: 'https://hooks.slack.com/services/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',
                    channel: 'qa-e2e-test',
                }));
            });
            // Wait till get the confirmation. tsc
            return browser.driver.wait(function () {
                return browser.driver.getCurrentUrl().then(function (url) {
                    return /dashboard/.test(url);
                });
            }, 30000);
            return global.browser.getProcessedConfig().then(function (config) {
            });
        });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25mL2NvbmYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFakMsMENBQXNEO0FBQ3RELHNEQUFvRDtBQUVwRCxJQUFJLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ3JELElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0FBQzVELElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN2QyxJQUFJLGNBQWMsQ0FBQztBQUVSLFFBQUEsTUFBTSxHQUFXO0lBRXhCLFNBQVMsRUFBRSxVQUFVO0lBRXJCLE9BQU8sRUFBRSxDQUFDO1lBQ04sT0FBTyxFQUFFLGdDQUFnQztZQUN6QyxjQUFjLEVBQUUsb0JBQW9CO1lBQ3BDLGtCQUFrQixFQUFFLGlCQUFpQjtZQUNyQyxnQkFBZ0IsRUFBRSxpQkFBaUI7WUFDbkMsUUFBUSxFQUFFLElBQUk7WUFDZCxlQUFlLEVBQUUsTUFBTTtZQUN2QixZQUFZLEVBQUUsTUFBTTtZQUNwQixzQkFBc0IsRUFBRSxJQUFJO1lBQzVCLFlBQVksRUFBRSxpQkFBaUI7WUFDL0IsVUFBVSxFQUFFLGlCQUFpQjtTQUNoQztLQUVBO0lBRUQsYUFBYSxFQUFFLElBQUk7SUFDbkIsWUFBWSxFQUFFO1FBQ1YsV0FBVyxFQUFFLFFBQVE7UUFDckIsZ0JBQWdCLEVBQUUsS0FBSztRQUN2QixjQUFjLEVBQUUsQ0FBQztRQUNqQixZQUFZLEVBQUU7WUFDVixRQUFRLEVBQUUsTUFBTTtZQUNoQixTQUFTLEVBQUUsTUFBTTtTQUNwQjtRQUNELGFBQWEsRUFBRTtZQUVYLElBQUksRUFBRSxDQUFDLGFBQWEsRUFBRSxvQkFBb0IsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLHNCQUFzQixF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