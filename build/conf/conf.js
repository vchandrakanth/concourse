"use strict";
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
        specs: ['../specs/UpdatePolicyViolation.js']
        // ['../specs/attributeTags.js', '../specs/assetManager.js',
        // '../specs/logicalDeployment.js', '../specs/logicalDeploymentViolation.js',
        // '../specs/policyGroupTemplate.js', '../specs/policyGroup.js',
        // '../specs/approvals.js', '../specs/group.js', '../specs/surfaces.js',
        // '../specs/modelViolation.js', '../specs/policyViolations.js',
        // '../specs/addAttributeTagForPG.js', '../specs/UpdatePolicyViolation.js',
        // '../specs/removeAttributeTagForPG.js', '../specs/cloudRoles.js',
        // '../specs/removingBusinessAuthorRoleAssignment.js', '../specs/removingControlAuthorRoleAssignment.js']
        // '../specs/attributeTags.js', '../specs/assetManager.js', '../specs/cloudRoles.js',
        // '../specs/removingBusinessAuthorRoleAssignment.js', '../specs/removingControlAuthorRoleAssignment.js'
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
        loginPage.login(configProperties.loginData.username, configProperties.loginData.password);
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
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25mL2NvbmYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFakMsMENBQThDO0FBQzlDLHNEQUFvRDtBQUNwRCxJQUFJLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBRTFDLFFBQUEsTUFBTSxHQUFXO0lBRXhCLFNBQVMsRUFBRSxVQUFVO0lBQ3JCLDBCQUEwQjtJQUMxQixPQUFPLEVBQUUsQ0FBQztZQUNOLE9BQU8sRUFBRSxnQ0FBZ0M7WUFDekMsY0FBYyxFQUFFLG1CQUFtQjtZQUNuQyxrQkFBa0IsRUFBRSxpQkFBaUI7WUFDckMsZ0JBQWdCLEVBQUUsaUJBQWlCO1lBQ25DLFFBQVEsRUFBRSxJQUFJO1lBQ2QsZUFBZSxFQUFFLE1BQU07WUFDdkIsWUFBWSxFQUFFLE1BQU07WUFDcEIsc0JBQXNCLEVBQUUsSUFBSTtZQUM1QixZQUFZLEVBQUUsaUJBQWlCO1lBQy9CLFVBQVUsRUFBRSxpQkFBaUI7U0FDaEM7S0FVQTtJQUNELFlBQVksRUFBRTtRQUNWLFdBQVcsRUFBRSxRQUFRO1FBQ3JCLGdCQUFnQixFQUFFLEtBQUs7UUFDdkIsY0FBYyxFQUFFLENBQUM7UUFDakIsZUFBZSxFQUFFLElBQUk7UUFDckIsWUFBWSxFQUFFO1lBQ1YsUUFBUSxFQUFFLE1BQU07WUFDaEIsU0FBUyxFQUFFLE1BQU07U0FDcEI7UUFDRCxhQUFhLEVBQUU7WUFFWCxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsb0JBQW9CLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxzQkFBc0IsRUFBRSx5QkFBeUIsQ0FBQztTQUVsSTtRQUNELEtBQUssRUFBRSxDQUFDLG1DQUFtQyxDQUFDO1FBQzVDLDREQUE0RDtRQUM1RCw2RUFBNkU7UUFDN0UsZ0VBQWdFO1FBQ2hFLHdFQUF3RTtRQUN4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