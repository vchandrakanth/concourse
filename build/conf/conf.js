"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
        specs: [
            '../specs/attributeTags.js',
            '../specs/assetManager.js',
            '../specs/logicalDeployment.js',
            '../specs/logicalDeploymentViolation.js',
            '../specs/policyGroupTemplate.js',
            '../specs/policyGroup.js',
            '../specs/surfaces.js',
            '../specs/approvals.js',
            '../specs/modelViolation.js',
            '../specs/policyViolations.js',
            '../specs/UpdatePolicyViolation.js',
            '../specs/inviteUser.js',
            '../specs/addAttributeTagForPG.js',
            '../specs/removeAttributeTagForPG.js',
            '../specs/manageInstitutionData.js',
            '../specs/requestForModel.js',
            '../specs/requestForLogicalDeployment.js',
            '../specs/requestForCloudRoles.js',
            '../specs/cloudRoles.js',
            '../specs/group.js',
            '../specs/removeBusinessAuthorRoleAssignment.js',
            '../specs/removeControlAuthorRoleAssignment.js',
            '../specs/nestedTemplates.js',
            '../specs/permissions.js',
            '../specs/baseLineAssets.js',
            '../specs/createAWSAccount.js'
        ]
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
                // baseDirectory: 'e2e_Results/test_Results'
                // baseDirectory: 'e2e_Results/' +  (new Date()).getTime()
                baseDirectory: 'e2e_Results/' + (new Date()).getTime()
            }).getJasmine2Reporter());
            // browser.logger = log4js.verboseLogging ('');
            // const isVerboseLoggingEnabled: boolean = browser.params.verboseLogging;
            // Login before
            let loginPage = new login_Po_1.LoginPage();
            utils_1.goToMainPage();
            let username;
            let password;
            let environment;
            browser.logger.info('Logging into concourse website');
            // loginPage.login(configProperties.loginData.username, configProperties.loginData.password);
            let currentUrl = yield utils_1.getUrl();
            if (currentUrl.includes('adhoc')) {
                username = configProperties.loginData.adhocUserName;
                password = configProperties.loginData.adhocPassWord;
                environment = 'adhoc';
            }
            if (currentUrl.includes('beta')) {
                username = configProperties.loginData.betaUserName;
                password = configProperties.loginData.betaPassWord;
                environment = 'beta';
            }
            if (currentUrl.includes('prod')) {
                username = configProperties.loginData.prodUserName;
                password = configProperties.loginData.prodPassWord;
                environment = 'prod';
            }
            loginPage.login(username, password);
            // Slack integration.
            let webRep = require('jasmine-slack-reporter');
            browser.getProcessedConfig().then(function (config) {
                let browserName = config.capabilities.browserName;
                let currentUrl = utils_1.getUrl();
                jasmine.getEnv().addReporter(new webRep.WebReporter({
                    projectName: 'Concourse Labs',
                    environment: environment,
                    testname: jasmine.getEnv().currentSpec,
                    // slackUrl: 'https://hooks.slack.com/services/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',
                    slackUrl: 'https://hooks.slack.com/services/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',
                    channel: 'qa-e2e-test',
                }));
            });
            // jasmine.getcurrentSpec().addReporter (new HtmlScreenshotReporter({
            //     pathBuilder: function(currentSpec, suites, browserCapabilities) {
            //       // will return chrome/your-spec-name.png
            //       return browserCapabilities.get('browserName') + '/' + currentSpec.fullName;
            //     }
            //   });
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
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25mL2NvbmYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVqQywwQ0FBc0Q7QUFDdEQsc0RBQW9EO0FBRXBELElBQUksZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDckQsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLCtCQUErQixDQUFDLENBQUM7QUFDNUQsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBRTVCLFFBQUEsTUFBTSxHQUFXO0lBRXhCLFNBQVMsRUFBRSxVQUFVO0lBQ3JCLDBCQUEwQjtJQUMxQixPQUFPLEVBQUUsQ0FBQztZQUNOLE9BQU8sRUFBRSxnQ0FBZ0M7WUFDekMsY0FBYyxFQUFFLG9CQUFvQjtZQUNwQyxrQkFBa0IsRUFBRSxpQkFBaUI7WUFDckMsZ0JBQWdCLEVBQUUsaUJBQWlCO1lBQ25DLFFBQVEsRUFBRSxJQUFJO1lBQ2QsZUFBZSxFQUFFLE1BQU07WUFDdkIsWUFBWSxFQUFFLE1BQU07WUFDcEIsc0JBQXNCLEVBQUUsSUFBSTtZQUM1QixZQUFZLEVBQUUsaUJBQWlCO1lBQy9CLFVBQVUsRUFBRSxpQkFBaUI7U0FDaEM7S0FVQTtJQUNELFlBQVksRUFBRTtRQUNWLFdBQVcsRUFBRSxRQUFRO1FBQ3JCLGdCQUFnQixFQUFFLEtBQUs7UUFDdkIsY0FBYyxFQUFFLENBQUM7UUFDakIsZUFBZSxFQUFFLElBQUk7UUFDckIsWUFBWSxFQUFFO1lBQ1YsUUFBUSxFQUFFLE1BQU07WUFDaEIsU0FBUyxFQUFFLE1BQU07U0FDcEI7UUFDRCxhQUFhLEVBQUU7WUFFWCxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsb0JBQW9CLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxzQkFBc0IsRUFBRSx5QkFB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