"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
const protractor_1 = require("protractor");
//Truning off and on the logger
const isVerboseLoggingEnabled = true; // browser.params.verboseLogging;
function logs(text) {
    const enabled = '1'; //process.env['ENABLE_LOGS'] === '1' || process.env['ENABLE_LOGS'] === 'true';
    if (enabled) {
        const d = new Date();
        const pad = (num) => {
            return (`0${num}`).slice(-2);
        };
        const time = `[${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}]`;
        console.log(`${time} ${text}`);
    }
}
exports.logs = logs;
class StepLogger {
    static set caseId(theCaseId) {
        this.testCaseId = theCaseId;
        this.logger = log4js.getLogger(`C${theCaseId}`);
        this.logger.debug(this.logMessages);
        this.id = 1;
        this.logMessages = '';
    }
    static step(stepName) {
        let operation = 'Pre-Condition';
        if (this.testCaseId) {
            operation = 'Step';
        }
        this.commonLogger(operation, stepName);
    }
    static stepId(optionalId = 0) {
        this.id = optionalId > 0 ? optionalId : this.id + 1;
        this.commonLogger('Step Id', this.id.toString());
    }
    static commonLogger(operation, step) {
        // const message = `${this.stepIdVar}- *${operation}* - ${step}`;
        // if (this.debug) {
        //     console.log(`${this.testCaseId || ''}${message}`);
        // }
        // if (!process.env.NO_ALLURE) {
        //     // tslint:disable-next-line:no-empty
        //     allure.createStep(message, () => {
        //     })();
        // // }
        // if (this.logger) {
        //     this.logger.debug(message);
        // } else {
        //     this.logMessages += message;
        // }
    }
    static verification(verificationDescription) {
        // this.takeScreenShot();
        this.commonLogger('Verification', verificationDescription);
    }
    static takeScreenShot() {
        protractor_1.browser.takeScreenshot().then((png) => {
            if (!process.env.NO_ALLURE) {
                allure.createAttachment('Screenshot', function () {
                    return new Buffer(png, 'base64');
                }, 'image/png')();
            }
        });
    }
    /**
     * Called for any precondition related step-log shown towrds Spec file, never used anywhere else such as validation/helper
     * @param {string} preConditionDescription
     */
    static preCondition(preConditionDescription) {
        this.commonLogger('Pre-Condition', preConditionDescription);
    }
    static postCondition(postConditionDescription) {
        this.commonLogger('Post-Condition', postConditionDescription);
    }
    /**
     * Called wherever a helper/validation method need to have a step/action step significant enough to log
     * @param {string} stepName
     */
    static subStep(stepName) {
        this.commonLogger('Sub-Step', stepName);
    }
    /**
     * Called wherever a helper/validation method need to have a verification step significant enough to log
     * @param {string} verificationDescription
     */
    static subVerification(verificationDescription) {
        this.commonLogger('Sub-Verification', verificationDescription);
    }
}
exports.StepLogger = StepLogger;
StepLogger.stepIdVar = '';
StepLogger.logMessages = '';
StepLogger.debug = process.env.DEBUG || true;
/**
 * Static logging helper class that outputs verbose information to the console.
 * Calls to this class only log to the console if the ENABLE_VERBOSE_LOGGING env variable is set to true.
 */
class VerboseLogger {
    /**
     * Send the message to console.debug with a timestamp, only is ENABLE_VERBOSE_LOGGING is true.
     * @param {string} message
     */
    static log(message) {
        if (isVerboseLoggingEnabled) {
            const timestamp = new Date().toISOString().split('T')[1];
            // tslint:disable-next-line:no-console
            console.debug(`[${timestamp} - verbose]: ${message}.`);
        }
    }
    static logSelector(timeout, targetElement, awaitedState) {
        const selector = targetElement.locator().toString();
        VerboseLogger.log(`Waiting ${timeout}ms for element with selector [${selector}] to ${awaitedState}.`);
    }
}
exports.VerboseLogger = VerboseLogger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9lMmUvc3JjL3V0aWxzL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUFpQztBQUVqQywyQ0FBb0Q7QUFFcEQsK0JBQStCO0FBQy9CLE1BQU0sdUJBQXVCLEdBQVksSUFBSSxDQUFDLENBQUMsaUNBQWlDO0FBR2hGLFNBQWdCLElBQUksQ0FBQyxJQUFZO0lBQzdCLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLDhFQUE4RTtJQUNuRyxJQUFJLE9BQU8sRUFBRTtRQUNYLE1BQU0sQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDckIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFXLEVBQUUsRUFBRTtZQUMxQixPQUFPLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQztRQUNGLE1BQU0sSUFBSSxHQUNOLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQztRQUMzRSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7S0FDaEM7QUFDSCxDQUFDO0FBWEgsb0JBV0c7QUFJSCxNQUFhLFVBQVU7SUFTbkIsTUFBTSxLQUFLLE1BQU0sQ0FBQyxTQUFpQjtRQUMvQixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxTQUFTLEVBQUUsQ0FBQyxDQUFD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