import { browser, element, by, ExpectedConditions, Config, utils } from 'protractor';
const log4js = require('log4js');
import fs = require('fs');
import { goToMainPage, getUrl } from '../utils/utils';
import { LoginPage } from '../pageObjects/login.Po';
let configProperties = require('../conf/properties');
let HtmlReporter = require('protractor-beautiful-reporter');

export let config: Config = {

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
<<<<<<< HEAD
        specs: ['../specs/createAWSAccount.js']
            // ['../specs/attributeTags.js', '../specs/assetManager.js',
            //     '../specs/logicalDeployment.js', '../specs/logicalDeploymentViolation.js',
            //     '../specs/policyGroupTemplate.js', '../specs/policyGroup.js',
            //     '../specs/surfaces.js',
            //     '../specs/cloudRoles.js', '../specs/modelViolation.js', '../specs/policyViolations.js',
            //     '../specs/UpdatePolicyViolation.js', '../specs/inviteUser.js',
            //     '../specs/addAttributeTagForPG.js', '../specs/removeAttributeTagForPG.js',
            //     '../specs/manageInstitutionData.js', '../specs/requestForModel.js',
            //     '../specs/requestForLogicalDeployment.js', '../specs/requestForCloudRoles.js']
                // '../specs/removeBusinessAuthorRoleAssignment.js', '../specs/removeControlAuthorRoleAssignment.js']
        // '../specs/permissions.js', '../specs/nestedTemplates.js', '../specs/approvals.js', '../specs/group.js'
=======
        specs: ['../specs/attributeTags.js', '../specs/assetManager.js',
            '../specs/logicalDeployment.js', '../specs/logicalDeploymentViolation.js',
            '../specs/policyGroupTemplate.js', '../specs/policyGroup.js', '../specs/inviteUser.js',
            '../specs/approvals.js', '../specs/group.js', '../specs/surfaces.js',
            '../specs/cloudRoles.js', '../specs/modelViolation.js', '../specs/policyViolations.js',
             '../specs/UpdatePolicyViolation.js',
            '../specs/addAttributeTagForPG.js', '../specs/removeAttributeTagForPG.js',
             '../specs/manageInstitutionData.js', '../specs/requestForModel.js',
            '../specs/requestForLogicalDeployment.js', '../specs/requestForCloudRoles.js',
            '../specs/removeBusinessAuthorRoleAssignment.js', '../specs/removeControlAuthorRoleAssignment.js',
        '../specs/permissions.js', '../specs/nestedTemplates.js',]
>>>>>>> c1925feaf08e7ba5b04ebfcf706014ba3bc29c9c
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

    onPrepare: async function () {
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
        let loginPage = new LoginPage();
        goToMainPage();
        let username;
        let password;
        browser.logger.info('Logging into concourse website');
        // loginPage.login(configProperties.loginData.username, configProperties.loginData.password);
        let currentUrl = await getUrl();

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
            let currentUrl = getUrl();
            jasmine.getEnv().addReporter(new webRep.WebReporter({
                projectName: 'Concourse Labs',
                environment: 'adhoc',
                testname: jasmine.getEnv().currentSpec,
                // slackUrl: 'https://hooks.slack.com/services/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',
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
    },
};


