import { browser, element, by, ExpectedConditions, Config, utils } from 'protractor';
const log4js = require('log4js');
import fs = require('fs');
import { goToMainPage, getUrl } from '../utils/utils';
import { LoginPage } from '../pageObjects/login.Po';
import { getDefaultService } from 'selenium-webdriver/chrome';
let configProperties = require('../conf/properties');
let HtmlReporter = require('protractor-beautiful-reporter');
let nodemailer = require('nodemailer');
let browserurltest;

export let config: Config = {

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
            // '--headless', --incognito
        },
        specs: [
            // '../specs/attributeTags.js',
            // '../specs/assetManager.js',
            // '../specs/logicalDeployment.js',
            // '../specs/logicalDeploymentViolation.js',
            // '../specs/policyGroupTemplate.js',
            // '../specs/policyGroup.js',
            // '../specs/surfaces.js',
            '../specs/approvals.js',
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
            // '../specs/createAWSAccount.js'
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

    onPrepare: async function () {
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
        let loginPage = new LoginPage();
        console.log('Current URl' + browserurltest);
        goToMainPage(browserurltest);
        let username;
        let password;
        let environment;
        browser.logger.info('Logging into concourse website');
        let currentUrl = browserurltest;

        if (currentUrl.includes('adhoc')) {
            username = configProperties.loginData.adhocUserName;
            password = configProperties.loginData.adhocPassWord;
            environment = 'adhoc';
            // log4js.configure(environment);
        }

        if (currentUrl.includes('beta')) {
            username = configProperties.loginData.betaUserName;
            password = configProperties.loginData.betaPassWord;
            environment = 'beta';
            // log4js.configure(environment);
        }

        if (currentUrl.includes('prod')) {
            username = configProperties.loginData.prodUserName;
            password = configProperties.loginData.prodPassWord;
            environment = 'prod';
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
                // get itName() { let cs = jasmine.getEnv().currentSpec; return cs ? cs.description : ''; }                  });
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

    }
};