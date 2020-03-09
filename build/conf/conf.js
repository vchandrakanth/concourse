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
    'directConnect': true,
    capabilities: {
        browserName: 'chrome',
        'shardTestFiles': false,
        'maxInstances': 1,
        // 'chromeOnly': true,
        loggingPrefs: {
            'driver': 'INFO',
            'browser': 'INFO',
        },
        chromeOptions: {
            args: ['--incognito', '--disable-infobars', '--disable-gpu', '--no-sandbox', '--disable-extensions', '--disable-dev-shm-usage'],
        },
        specs: [
            '../specs/attributeTags.js',
        ]
    },
    // seleniumAddress: 'http://localhost:4444/wd/hub',
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
            // browser.manage().window().maximize();
            browser.manage().timeouts().implicitlyWait(10000);
            //  browser.manage().window().maximize();
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
            console.log('Here me');
            username = configProperties.loginData.adhocUserName;
            password = configProperties.loginData.adhocPassWord;
            // if (currentUrl.includes('adhoc')) {
            //     username = configProperties.loginData.adhocUserName;
            //     password = configProperties.loginData.adhocPassWord;
            //     environment = 'adhoc';
            //     console.log('Here Adhoc');
            // }
            // if (currentUrl.includes('beta')) {
            //     username = configProperties.loginData.betaUserName;
            //     password = configProperties.loginData.betaPassWord;
            //     environment = 'beta';
            //     console.log('Here beta');
            // }
            // if (currentUrl.includes('prod')) {
            //     username = configProperties.loginData.prodUserName;
            //     password = configProperties.loginData.prodPassWord;
            //     environment = 'prod';
            //     console.log('Here prod');
            // }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25mL2NvbmYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFakMsMENBQXNEO0FBQ3RELHNEQUFvRDtBQUVwRCxJQUFJLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ3JELElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0FBQzVELElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUU1QixRQUFBLE1BQU0sR0FBVztJQUV4QixTQUFTLEVBQUUsVUFBVTtJQUNyQiwwQkFBMEI7SUFDMUIsT0FBTyxFQUFFLENBQUM7WUFDTixPQUFPLEVBQUUsZ0NBQWdDO1lBQ3pDLGNBQWMsRUFBRSxvQkFBb0I7WUFDcEMsa0JBQWtCLEVBQUUsaUJBQWlCO1lBQ3JDLGdCQUFnQixFQUFFLGlCQUFpQjtZQUNuQyxRQUFRLEVBQUUsSUFBSTtZQUNkLGVBQWUsRUFBRSxNQUFNO1lBQ3ZCLFlBQVksRUFBRSxNQUFNO1lBQ3BCLHNCQUFzQixFQUFFLElBQUk7WUFDNUIsWUFBWSxFQUFFLGlCQUFpQjtZQUMvQixVQUFVLEVBQUUsaUJBQWlCO1NBQ2hDO0tBVUE7SUFDRCxlQUFlLEVBQUUsSUFBSTtJQUNyQixZQUFZLEVBQUU7UUFDVixXQUFXLEVBQUUsUUFBUTtRQUNyQixnQkFBZ0IsRUFBRSxLQUFLO1FBQ3ZCLGNBQWMsRUFBRSxDQUFDO1FBQ2hCLHNCQUFzQjtRQUN2QixZQUFZLEVBQUU7WUFDVixRQUFRLEVBQUUsTUFBTTtZQUNoQixTQUFTLEVBQUUsTUFBTTtTQUNwQjtRQUNELGFBQWEsRUFBRTtZQUVYLElBQUksRUFBRSxDQUFDLGFBQWEsRUFBRSxvQkFBb0IsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLHNCQUFzQixFQUFFLHlCQUF5QixDQUFDO1NBRWxJO1FBQ0QsS0FBSyxFQUFFO1lBQ0gsMkJBQTJCO1NBMEIxQjtLQUNSO0lBRUYsbURBQW1EO0lBQ2xELHdCQUF3QixFQUFFLElBQUk7SUFDOUIsWUFBWSxFQUFFO1FBQ1YsSUFBSSxRQUFRLEdBQUcseUJBQXlCLENBQUM7UUFFekMsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUNiLFNBQVMsRUFBRTtnQkFDUCxFQUFFLElBQUksRUFBRSw0QkFBNEIsRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUU7Z0JBQ3BFO29CQUNJLElBQUksRUFBRSxNQUFNO29CQUNaLFFBQVEsRUFBRSxRQUFRO29CQUNsQixRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixPQUFPLEVBQUUsRUFBRTtpQkFDZDthQUNKO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGVBQWUsRUFBRTtRQUNiLHNCQUFzQixFQUFFLEtBQUs7S0FDaEM7SUFFRCxTQUFTLEVBQUU7O1lBQ1AsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDL0Isa0JBQWtCO1lBQ2xCLE9BQU8sQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7WUFDckMsd0NBQXdDO1lBQ3hDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEQseUNBQXlDO1lBQ3ZDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ3RELE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxZQUFZLENBQUM7Z0JBQzFDLDRDQUE0QztnQkFDNUMsMERBQTBEO2dCQUMxRCxhQUFhLEVBQUUsY0FBYyxHQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRTthQUMxRCxDQUFDLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO1lBQzFCLCtDQUErQztZQUMvQywwRUFBMEU7WUFDMUUsZUFBZTtZQUNmLElBQUksU0FBUyxHQUFHLElBQUksb0JBQVMsRUFBRSxDQUFDO1lBQ2hDLG9CQUFZLEVBQUUsQ0FBQztZQUNmLElBQUksUUFBUSxDQUFDO1lBQ2IsSUFBSSxRQUFRLENBQUM7WUFDYixJQUFJLFdBQVcsQ0FBQztZQUNoQixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1lBQ3RELDZGQUE2RjtZQUM3RixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2QixRQUFRLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztZQUNwRCxRQUFRLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztZQUVwRCxzQ0FBc0M7WUFDdEMsMkRBQTJEO1lBQzNELDJEQUEyRDtZQUMzRCw2QkFBNkI7WUFDN0IsaUNBQWlDO1lBQ2pDLElBQUk7WUFFSixxQ0FBcUM7WUFDckMsMERBQTBEO1lBQzFELDBEQUEwRDtZQUMxRCw0QkFBNEI7WUFDNUIsZ0NBQWdDO1lBQ2hDLElBQUk7WUFFSixxQ0FBcUM7WUFDckMsMERBQTBEO1lBQzFELDBEQUEwRDtZQUMxRCw0QkFBNEI7WUFDNUIsZ0NBQWdDO1lBQ2hDLElBQUk7WUFFSixTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUVwQyxxQkFBcUI7WUFDckIsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDL0MsT0FBTyxDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsTUFBTTtnQkFDOUMsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUM7Z0JBQ2xELDZCQUE2QjtnQkFFN0IsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUM7b0JBQ2hELFdBQVcsRUFBRSxnQkFBZ0I7b0JBQzdCLFdBQVcsRUFBRSxXQUFXO29CQUN4QixRQUFRLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLFdBQVc7b0JBQ3RDLDZGQUE2RjtvQkFDN0YsNkZBQTZGO29CQUM3RixPQUFPLEVBQUUsYUFBYTtpQkFFekIsQ0FBQyxDQUFDLENBQUM7WUFDUixDQUFDLENBQUMsQ0FBQztZQUVILHFFQUFxRTtZQUNyRSx3RUFBd0U7WUFDeEUsaURBQWlEO1lBQ2pELG9GQUFvRjtZQUNwRixRQUFRO1lBQ1IsUUFBUTtZQUVSLHNDQUFzQztZQUN0QyxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUN2QixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRztvQkFDcEQsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQyxDQUFDLENBQUMsQ0FBQztZQUVQLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNWLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLE1BQU07Z0JBQzVELHVCQUF1QjtZQUMzQixDQUFDLENBQUMsQ0FBQztZQUVILDJCQUEyQjtZQUMzQix5Q0FBeUM7WUFDekMsb0NBQW9DO1lBQ3BDLDRDQUE0QztZQUM1Qyw0Q0FBNEM7WUFDNUMseURBQXlEO1lBQ3pELDZEQUE2RDtZQUM3RCw2REFBNkQ7WUFDN0QsMEVBQTBFO1lBQzFFLGlDQUFpQztZQUNqQyxVQUFVO1FBQ2QsQ0FBQztLQUFBO0NBQ0osQ0FBQyJ9