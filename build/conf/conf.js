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
    'directConnect': true,
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
            '../specs/policyGroupV3.js',
        ]
    },
    //  seleniumAddress: 'http://localhost:4444/wd/hub',
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
            let currentUrl = browser.params.login.url;
            // console.log('Here me');
            // username = configProperties.loginData.adhocUserName;
            // password = configProperties.loginData.adhocPassWord;
            if (currentUrl.includes('adhoc')) {
                username = configProperties.loginData.adhocUserName;
                password = configProperties.loginData.adhocPassWord;
                environment = 'adhoc';
                console.log('Here Adhoc');
            }
            if (currentUrl.includes('beta')) {
                username = configProperties.loginData.betaUserName;
                password = configProperties.loginData.betaPassWord;
                environment = 'beta';
                console.log('Here beta');
            }
            if (currentUrl.includes('prod')) {
                username = configProperties.loginData.prodUserName;
                password = configProperties.loginData.prodPassWord;
                environment = 'prod';
                console.log('Here prod');
            }
            loginPage.login(username, password);
            // Slack integration.
            let webRep = require('jasmine-slack-reporter');
            browser.getProcessedConfig().then(function (config) {
                let browserName = config.capabilities.browserName;
                // let currentUrl = getUrl();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25mL2NvbmYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFakMsMENBQXNEO0FBQ3RELHNEQUFvRDtBQUVwRCxJQUFJLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ3JELElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0FBQzVELElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUU1QixRQUFBLE1BQU0sR0FBVztJQUV4QixTQUFTLEVBQUUsVUFBVTtJQUNyQiwwQkFBMEI7SUFDMUIsT0FBTyxFQUFFLENBQUM7WUFDTixPQUFPLEVBQUUsZ0NBQWdDO1lBQ3pDLGNBQWMsRUFBRSxvQkFBb0I7WUFDcEMsa0JBQWtCLEVBQUUsaUJBQWlCO1lBQ3JDLGdCQUFnQixFQUFFLGlCQUFpQjtZQUNuQyxRQUFRLEVBQUUsSUFBSTtZQUNkLGVBQWUsRUFBRSxNQUFNO1lBQ3ZCLFlBQVksRUFBRSxNQUFNO1lBQ3BCLHNCQUFzQixFQUFFLElBQUk7WUFDNUIsWUFBWSxFQUFFLGlCQUFpQjtZQUMvQixVQUFVLEVBQUUsaUJBQWlCO1NBQ2hDO0tBVUE7SUFFRCxlQUFlLEVBQUUsSUFBSTtJQUNyQixZQUFZLEVBQUU7UUFDVixXQUFXLEVBQUUsUUFBUTtRQUNyQixnQkFBZ0IsRUFBRSxLQUFLO1FBQ3ZCLGNBQWMsRUFBRSxDQUFDO1FBQ2hCLFlBQVksRUFBRTtZQUNYLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFNBQVMsRUFBRSxNQUFNO1NBQ3BCO1FBQ0QsYUFBYSxFQUFFO1lBRVgsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLG9CQUFvQixFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsc0JBQXNCLEVBQUUseUJB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
