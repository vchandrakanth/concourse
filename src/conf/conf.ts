import { browser, element, by, ExpectedConditions, Config } from 'protractor';
const log4js = require('log4js');
import fs = require('fs');
import { goToMainPage } from '../utils/utils';
import { LoginPage } from '../pageObjects/login.Po';
let configProperties = require('../conf/properties');

export let config: Config = {

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

        // {
        //     // Plugin into interact with slack
        //     package: 'protractor-slack-plugin',
        //     failMessage: 'Oh No {totalFailed} tests failed',
        //     token: 'xoxp-289623592503-547602551475-559932030867-31b30345743e644d6fbf7570277420e0',
        //     channel: 'qa-e2e-test'

        // }
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
            // '--headless',
        },
        specs:  ['../specs/addAttributeTagForPG.js']
        // , '../specs/removeAttributeTagForPG.js', '../specs/removeOrganizationForPG.js']
        // '../specs/policyGroupTemplate.js', '../specs/policyGroup.js',
        // '../specs/approvals.js', '../specs/group.js',
        // '../specs/logicalDeployment.js', '../specs/logicalDeploymentViolation.js',
        // '../specs/modelViolation.js', '../specs/policyViolations.js',
        // '../specs/addAttributeTagForPG.js', '../specs/UpdatePolicyViolation.js']
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
        let loginPage = new LoginPage();
        goToMainPage();
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

