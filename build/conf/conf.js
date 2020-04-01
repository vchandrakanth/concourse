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
            // '../specs/addAttributeTagForPG.js',
            // '../specs/removeAttributeTagForPG.js',
            // '../specs/manageInstitutionData.js',
            // '../specs/requestForModel.js',
            // '../specs/requestForLogicalDeployment.js',
            // '../specs/requestForCloudRoles.js',
            // '../specs/requestForBaseline.js',
            // '../specs/cloudRoles.js',
            // '../specs/group.js',
            // '../specs/removeBusinessAuthorRoleAssignment.js',
            // '../specs/removeControlAuthorRoleAssignment.js',
            '../specs/nestedtemplates.js',
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