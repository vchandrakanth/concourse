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
exports.config = {
    framework: 'jasmine2',
    //    directConnect: true,
    plugins: [{
            package: 'protractor-screenshoter-plugin',
            screenshotPath: './src/REPORTS/e2e',
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
        specs: ['../specs/attributeTags.js']
        // ['../specs/attributeTags.js', '../specs/assetManager.js',
        // '../specs/logicalDeployment.js', '../specs/logicalDeploymentViolation.js',
        // '../specs/policyGroupTemplate.js', '../specs/policyGroup.js',
        // '../specs/approvals.js', '../specs/group.js', '../specs/surfaces.js',
        // '../specs/modelViolation.js', '../specs/policyViolations.js',
        // '../specs/addAttributeTagForPG.js', '../specs/removeControlAuthorRoleAssignment.js',
        // '../specs/removeAttributeTagForPG.js', '../specs/cloudRoles.js', '../specs/manageInstitutionData.js',
        // '../specs/requestForLogicalDeployment.js', '../specs/requestForModel.js',
        // '../specs/removeBusinessAuthorRoleAssignment.js']
        // '../specs/attributeTags.js', '../specs/assetManager.js', '../specs/cloudRoles.js',
        // '../specs/removeBusinessAuthorRoleAssignment.js', '../specs/removeControlAuthorRoleAssignment.js'
        // '../specs/logicalDeployment.js', '../specs/logicalDeploymentViolation.js', '../specs/manageInstitutionData.js'
        // '../specs/policyGroupTemplate.js', '../specs/policyGroup.js', '../specs/surfaces.js'
        // '../specs/modelViolation.js', '../specs/policyViolations.js', '../specs/removeAttributeTagForPG.js'
        // '../specs/attributeTags.js', '../specs/assetManager.js', '../specs/permissions.js'
        //  '../specs/policyGroupTemplate.js', '../specs/policyGroup.js',
        //   '../specs/group.js', '../specs/logicalDeployment.js', '../specs/policyViolations.js', '../specs/attributeTags.js', '../specs/assetManager.js', '../specs/policyGroupTemplate.js', '../specs/policyGroup.js', '../specs/group.js',
        // '../specs/logicalDeployment.js', '../specs/modelViolation.js', '../specs/policyViolations.js', '../specs/logicalDeploymentViolation.js'
        // '../specs/surfaces.js', '../specs/addAttributeTagForPG.js', '../specs/nestedTemplates.js'
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
            // browser.logger = log4js.verboseLogging ('');
            // const isVerboseLoggingEnabled: boolean = browser.params.verboseLogging;
            // Login before
            let loginPage = new login_Po_1.LoginPage();
            utils_1.goToMainPage();
            browser.logger.info('Logging into concourse website');
            // loginPage.login(configProperties.loginData.username, configProperties.loginData.password);
            let currentUrl = yield utils_1.getUrl();
            if (currentUrl.includes('adhoc')) {
                let username = configProperties.loginData.adhocUserName;
                let password = configProperties.loginData.adhocPassWord;
                loginPage.login(username, password);
            }
            if (currentUrl.includes('beta')) {
                let username = configProperties.loginData.betaUserName;
                let password = configProperties.loginData.betaPassWord;
                loginPage.login(username, password);
            }
            if (currentUrl.includes('prod')) {
                let username = configProperties.loginData.prodUserName;
                let password = configProperties.loginData.prodPassWord;
                loginPage.login(username, password);
            }
            // loginPage.login(userName, password);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25mL2NvbmYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFakMsMENBQXNEO0FBQ3RELHNEQUFvRDtBQUNwRCxJQUFJLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBRTFDLFFBQUEsTUFBTSxHQUFXO0lBRXhCLFNBQVMsRUFBRSxVQUFVO0lBQ3JCLDBCQUEwQjtJQUMxQixPQUFPLEVBQUUsQ0FBQztZQUNOLE9BQU8sRUFBRSxnQ0FBZ0M7WUFDekMsY0FBYyxFQUFFLG1CQUFtQjtZQUNuQyxrQkFBa0IsRUFBRSxpQkFBaUI7WUFDckMsZ0JBQWdCLEVBQUUsaUJBQWlCO1lBQ25DLFFBQVEsRUFBRSxJQUFJO1lBQ2QsZUFBZSxFQUFFLE1BQU07WUFDdkIsWUFBWSxFQUFFLE1BQU07WUFDcEIsc0JBQXNCLEVBQUUsSUFBSTtZQUM1QixZQUFZLEVBQUUsaUJBQWlCO1lBQy9CLFVBQVUsRUFBRSxpQkFBaUI7U0FDaEM7S0FVQTtJQUNELFlBQVksRUFBRTtRQUNWLFdBQVcsRUFBRSxRQUFRO1FBQ3JCLGdCQUFnQixFQUFFLEtBQUs7UUFDdkIsY0FBYyxFQUFFLENBQUM7UUFDakIsZUFBZSxFQUFFLElBQUk7UUFDckIsWUFBWSxFQUFFO1lBQ1YsUUFBUSxFQUFFLE1BQU07WUFDaEIsU0FBUyxFQUFFLE1BQU07U0FDcEI7UUFDRCxhQUFhLEVBQUU7WUFFWCxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsb0JBQW9CLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxzQkFBc0IsRUFBRSx5QkFBeUIsQ0FBQztTQUVsSTtRQUNELEtBQUssRUFBRSxDQUFDLDJCQUEyQixDQUFDO1FBQ3BDLDREQUE0RDtRQUM1RCw2RUFBNkU7UUFDN0UsZ0VBQWdFO1FBQ2hFLHdF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