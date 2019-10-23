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
        specs: ['../specs/attributeTags.js', '../specs/assetManager.js',
            '../specs/policyGroupTemplate.js', '../specs/policyGroup.js',
            '../specs/approvals.js', '../specs/group.js',
            '../specs/logicalDeployment.js', '../specs/logicalDeploymentViolation.js',
            '../specs/modelViolation.js', '../specs/policyViolations.js',
            '../specs/addAttributeTagForPG.js', '../specs/UpdatePolicyViolation.js']
        // '../specs/attributeTags.js', '../specs/assetManager.js',
        // '../specs/logicalDeployment.js', '../specs/logicalDeploymentViolation.js',
        // '../specs/policyGroupTemplate.js', '../specs/policyGroup.js',
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
        }, 10000);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25mL2NvbmYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFakMsMENBQThDO0FBQzlDLHNEQUFvRDtBQUNwRCxJQUFJLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBRTFDLFFBQUEsTUFBTSxHQUFXO0lBRXhCLFNBQVMsRUFBRSxVQUFVO0lBQ3JCLDBCQUEwQjtJQUMxQixPQUFPLEVBQUUsQ0FBQztZQUNOLE9BQU8sRUFBRSxnQ0FBZ0M7WUFDekMsY0FBYyxFQUFFLG1CQUFtQjtZQUNuQyxrQkFBa0IsRUFBRSxpQkFBaUI7WUFDckMsZ0JBQWdCLEVBQUUsaUJBQWlCO1lBQ25DLFFBQVEsRUFBRSxJQUFJO1lBQ2QsZUFBZSxFQUFFLE1BQU07WUFDdkIsWUFBWSxFQUFFLE1BQU07WUFDcEIsc0JBQXNCLEVBQUUsSUFBSTtZQUM1QixZQUFZLEVBQUUsaUJBQWlCO1lBQy9CLFVBQVUsRUFBRSxpQkFBaUI7U0FDaEM7S0FVQTtJQUNELFlBQVksRUFBRTtRQUNWLFdBQVcsRUFBRSxRQUFRO1FBQ3JCLGdCQUFnQixFQUFFLEtBQUs7UUFDdkIsY0FBYyxFQUFFLENBQUM7UUFDakIsZUFBZSxFQUFFLElBQUk7UUFDckIsWUFBWSxFQUFFO1lBQ1YsUUFBUSxFQUFFLE1BQU07WUFDaEIsU0FBUyxFQUFFLE1BQU07U0FDcEI7UUFDRCxhQUFhLEVBQUU7WUFFWCxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsb0JBQW9CLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxzQkFBc0IsRUFBRSx5QkFBeUIsQ0FBQztTQUVsSTtRQUNELEtBQUssRUFBRyxDQUFDLDJCQUEyQixFQUFFLDBCQUEwQjtZQUNoRSxpQ0FBaUMsRUFBRSx5QkFBeUI7WUFDNUQsdUJBQXVCLEVBQUUsbUJBQW1C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