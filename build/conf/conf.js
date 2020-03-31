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
            // '../specs/nestedtemplates.js',
            // '../specs/createAWSAccount.js',
            '../specs/1426Scenario.js'
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