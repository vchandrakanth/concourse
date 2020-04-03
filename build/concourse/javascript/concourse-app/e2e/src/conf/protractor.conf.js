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
let browserurltest;
exports.config = {
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
            args: ['--headless', '--incognito', '--disable-infobars', '--disable-gpu', '--no-sandbox', '--disable-extensions', '--disable-dev-shm-usage'],
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
            '../specs/requestForBaseline.js',
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
    SELENIUM_PROMISE_MANAGER: false,
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
                baseDirectory: 'e2e_Results/' + (new Date()).getTime()
            }).getJasmine2Reporter());
            params: {
                env: null;
            }
            let username;
            let password;
            let environment;
            const env = process.argv.filter(arg => {
                return arg.includes('--params.env');
            })[0];
            console.log('Current Environment ' + env);
            if (env.includes('adhoc')) {
                browserurltest = 'https://adhoc.concourse.company';
                username = configProperties.loginData.adhocUserName;
                password = configProperties.loginData.adhocPassWord;
                environment = 'adhoc';
                browser.logger.info('Adhoc Environment');
            }
            if (env.includes('beta')) {
                browserurltest = 'https://beta.concourse.company';
                username = configProperties.loginData.betaUserName;
                password = configProperties.loginData.betaPassWord;
                environment = 'beta';
                browser.logger.info('Beta Environment');
            }
            if (env.includes('prod')) {
                browserurltest = 'https://prod.concourselabs.io';
                username = configProperties.loginData.prodUserName;
                password = configProperties.loginData.prodPassWord;
                environment = 'prod';
                browser.logger.info('Prod Environment');
            }
            let loginPage = new login_Po_1.LoginPage();
            browser.logger.info('Current URl' + browserurltest);
            // Go to Home Page
            utils_1.goToMainPage(browserurltest);
            browser.logger.info('Logging into concourse website');
            let currentUrl = browserurltest;
            // Login
            loginPage.login(username, password);
            // Slack integration.
            let webRep = require('jasmine-slack-reporter');
            browser.getProcessedConfig().then(function (config) {
                let browserName = config.capabilities.browserName;
                jasmine.getEnv().addReporter(new webRep.WebReporter({
                    projectName: 'Concourse Labs',
                    environment: environment,
                    testname: jasmine.getEnv().currentSpec,
                    slackUrl: 'https://hooks.slack.com/services/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',
                    channel: 'qa-e2e-test',
                }));
            });
            // Wait till get the confirmation. tsc
            return browser.driver.wait(function () {
                return browser.driver.getCurrentUrl().then(function (url) {
                    return /dashboard/.test(url);
                });
            }, 20000);
            return global.browser.getProcessedConfig().then(function (config) {
            });
        });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdHJhY3Rvci5jb25mLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9lMmUvc3JjL2NvbmYvcHJvdHJhY3Rvci5jb25mLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBR2pDLDBDQUFzRDtBQUN0RCxzREFBb0Q7QUFFcEQsSUFBSSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUNyRCxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsK0JBQStCLENBQUMsQ0FBQztBQUU1RCxJQUFJLGNBQWMsQ0FBQztBQUVSLFFBQUEsTUFBTSxHQUFXO0lBRTFCLFNBQVMsRUFBRSxVQUFVO0lBRXJCLE9BQU8sRUFBRSxDQUFDO1lBQ1IsT0FBTyxFQUFFLGdDQUFnQztZQUN6QyxjQUFjLEVBQUUsb0JBQW9CO1lBQ3BDLGtCQUFrQixFQUFFLGlCQUFpQjtZQUNyQyxnQkFBZ0IsRUFBRSxpQkFBaUI7WUFDbkMsUUFBUSxFQUFFLElBQUk7WUFDZCxlQUFlLEVBQUUsTUFBTTtZQUN2QixZQUFZLEVBQUUsTUFBTTtZQUNwQixzQkFBc0IsRUFBRSxJQUFJO1lBQzVCLFlBQVksRUFBRSxpQkFBaUI7WUFDL0IsVUFBVSxFQUFFLGlCQUFpQjtTQUM5QjtLQUVBO0lBRUQsYUFBYSxFQUFFLElBQUk7SUFDbkIsWUFBWSxFQUFFO1FBQ1osV0FBVyxFQUFFLFFBQVE7UUFDckIsZ0JBQWdCLEVBQUUsS0FBSztRQUN2QixjQUFjLEVBQUUsQ0FBQztRQUNqQixZQUFZLEVBQUU7WUFDWixRQUFRLEVBQUUsTUFBTTtZQUNoQixTQUFTLEVBQUUsTUFBTTtTQUNsQjtRQUNELGFBQWEsRUFBRTtZQUViLElBQUksRUFBRSxDQUFDLFlBQVksRUFBRyxhQUFhLEVBQUUs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