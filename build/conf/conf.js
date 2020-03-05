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
                    // slackUrl: 'https://hooks.slack.com/services/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',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25mL2NvbmYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFakMsMENBQXNEO0FBQ3RELHNEQUFvRDtBQUVwRCxJQUFJLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ3JELElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0FBQzVELElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUU1QixRQUFBLE1BQU0sR0FBVztJQUV4QixTQUFTLEVBQUUsVUFBVTtJQUNyQiwwQkFBMEI7SUFDMUIsT0FBTyxFQUFFLENBQUM7WUFDTixPQUFPLEVBQUUsZ0NBQWdDO1lBQ3pDLGNBQWMsRUFBRSxvQkFBb0I7WUFDcEMsa0JBQWtCLEVBQUUsaUJBQWlCO1lBQ3JDLGdCQUFnQixFQUFFLGlCQUFpQjtZQUNuQyxRQUFRLEVBQUUsSUFBSTtZQUNkLGVBQWUsRUFBRSxNQUFNO1lBQ3ZCLFlBQVksRUFBRSxNQUFNO1lBQ3BCLHNCQUFzQixFQUFFLElBQUk7WUFDNUIsWUFBWSxFQUFFLGlCQUFpQjtZQUMvQixVQUFVLEVBQUUsaUJBQWlCO1NBQ2hDO0tBVUE7SUFDRCxZQUFZLEVBQUU7UUFDVixXQUFXLEVBQUUsUUFBUTtRQUNyQixnQkFBZ0IsRUFBRSxLQUFLO1FBQ3ZCLGNBQWMsRUFBRSxDQUFDO1FBQ2pCLGVBQWUsRUFBRSxJQUFJO1FBQ3JCLFlBQVksRUFBRTtZQUNWLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFNBQVMsRUFBRSxNQUFNO1NBQ3BCO1FBQ0QsYUFBYSxFQUFFO1lBRVgsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLG9CQUFvQixFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsc0JBQXNCLEVBQUUseUJB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