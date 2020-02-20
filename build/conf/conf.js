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
exports.config = {
    framework: 'jasmine2',
    //    directConnect: true,
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
    capabilities: {
        browserName: 'chrome',
        'shardTestFiles': false,
        'maxInstances': 1,
        'directConnect': true,
        loggingPrefs: {
            'driver': 'INFO',
            'browser': 'INFO',
        },
        chromeOptions: {
            args: ['--incognito', '--disable-infobars', '--disable-gpu', '--no-sandbox', '--disable-extensions', '--disable-dev-shm-usage'],
        },
        specs: ['../specs/inviteUser.js']
        // ['../specs/attributeTags.js', '../specs/assetManager.js',
        //     '../specs/logicalDeployment.js', '../specs/logicalDeploymentViolation.js',
        //     '../specs/policyGroupTemplate.js', '../specs/policyGroup.js',
        //     '../specs/approvals.js', '../specs/group.js', '../specs/surfaces.js',
        //     '../specs/cloudRoles.js', '../specs/modelViolation.js', '../specs/policyViolations.js',
        //      '../specs/UpdatePolicyViolation.js',
        //     '../specs/addAttributeTagForPG.js', '../specs/removeAttributeTagForPG.js',
        //      '../specs/manageInstitutionData.js', '../specs/requestForModel.js',
        //     '../specs/requestForLogicalDeployment.js', '../specs/requestForCloudRoles.js',
        //     '../specs/removeBusinessAuthorRoleAssignment.js', '../specs/removeControlAuthorRoleAssignment.js']
        // '../specs/permissions.js', '../specs/nestedTemplates.js',
    },
    seleniumAddress: 'http://localhost:4444/wd/hub',
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
        defaultTimeoutInterval: 20000,
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
                baseDirectory: 'e2e_Results/test_Results'
            }).getJasmine2Reporter());
            // browser.logger = log4js.verboseLogging ('');
            // const isVerboseLoggingEnabled: boolean = browser.params.verboseLogging;
            // Login before
            let loginPage = new login_Po_1.LoginPage();
            utils_1.goToMainPage();
            let username;
            let password;
            browser.logger.info('Logging into concourse website');
            // loginPage.login(configProperties.loginData.username, configProperties.loginData.password);
            let currentUrl = yield utils_1.getUrl();
            if (currentUrl.includes('adhoc')) {
                username = configProperties.loginData.adhocUserName;
                password = configProperties.loginData.adhocPassWord;
            }
            if (currentUrl.includes('beta')) {
                username = configProperties.loginData.betaUserName;
                password = configProperties.loginData.betaPassWord;
            }
            if (currentUrl.includes('prod')) {
                username = configProperties.loginData.prodUserName;
                password = configProperties.loginData.prodPassWord;
            }
            loginPage.login(username, password);
            // Slack integration.
            let webRep = require('jasmine-slack-reporter');
            browser.getProcessedConfig().then(function (config) {
                let browserName = config.capabilities.browserName;
                jasmine.getEnv().addReporter(new webRep.WebReporter({
                    projectName: 'Concourse Labs',
                    environment: 'adhoc',
                    testname: jasmine.getEnv().currentSpec,
                    slackUrl: 'https://hooks.slack.com/services/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',
                    channel: 'qa-e2e-test',
                    get itName() { let cs = jasmine.getEnv().currentSpec; return cs ? cs.description : ''; }
                }));
            });
            // Wait till get the confirmation. tsc
            return browser.driver.wait(function () {
                return browser.driver.getCurrentUrl().then(function (url) {
                    return /dashboard/.test(url);
                });
            }, 15000);
            return global.browser.getProcessedConfig().then(function (config) {
                // it is ok to be empty
            });
            // onPrepare: function () {
            //     let global =require('protractor');
            //     let browser = global.browser;
            //     browser.ignoreSynchronization = true;
            //     browser.manage().window().maximize();
            //     browser.manage().timeouts().implicitlyWait(20000);
            //    // browser.manage().timeouts().setScriptTimeout(60000);
            //     browser.logger = log4js.getLogger('protractorLog4js');
            //     return global.browser.getProcessedConfig().then(function (config) {
            //         //it is ok to be empty
            //     });
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25mL2NvbmYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFakMsMENBQXNEO0FBQ3RELHNEQUFvRDtBQUNwRCxJQUFJLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ3JELElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0FBRWpELFFBQUEsTUFBTSxHQUFXO0lBRXhCLFNBQVMsRUFBRSxVQUFVO0lBQ3JCLDBCQUEwQjtJQUMxQixPQUFPLEVBQUUsQ0FBQztZQUNOLE9BQU8sRUFBRSxnQ0FBZ0M7WUFDekMsY0FBYyxFQUFFLG9CQUFvQjtZQUNwQyxrQkFBa0IsRUFBRSxpQkFBaUI7WUFDckMsZ0JBQWdCLEVBQUUsaUJBQWlCO1lBQ25DLFFBQVEsRUFBRSxJQUFJO1lBQ2QsZUFBZSxFQUFFLE1BQU07WUFDdkIsWUFBWSxFQUFFLE1BQU07WUFDcEIsc0JBQXNCLEVBQUUsSUFBSTtZQUM1QixZQUFZLEVBQUUsaUJBQWlCO1lBQy9CLFVBQVUsRUFBRSxpQkFBaUI7U0FDaEM7S0FVQTtJQUNELFlBQVksRUFBRTtRQUNWLFdBQVcsRUFBRSxRQUFRO1FBQ3JCLGdCQUFnQixFQUFFLEtBQUs7UUFDdkIsY0FBYyxFQUFFLENBQUM7UUFDakIsZUFBZSxFQUFFLElBQUk7UUFDckIsWUFBWSxFQUFFO1lBQ1YsUUFBUSxFQUFFLE1BQU07WUFDaEIsU0FBUyxFQUFFLE1BQU07U0FDcEI7UUFDRCxhQUFhLEVBQUU7WUFFWCxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsb0JBQW9CLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxzQkFBc0IsRUFBRSx5QkFBeUIsQ0FBQztTQUVsSTtRQUNELEtBQUssRUFBRSxDQUFDLHdCQUF3QixDQUFD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