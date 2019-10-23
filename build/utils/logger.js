"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
const protractor_1 = require("protractor");
const isVerboseLoggingEnabled = true;
function logs(text) {
    const enabled = '1'; // process.env['ENABLE_LOGS'] === '1' || process.env['ENABLE_LOGS'] === 'true';
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
        const message = `${this.stepIdVar}- ${operation} - ${step}`;
        if (this.debug) {
            console.log(`${this.testCaseId || ''}${message}`);
        }
        // if (!process.env.NO_ALLURE) {
        //   tslint:disable-next-line:no-empty
        //   allure.createStep(message, () => {
        //   })();
        // }
        if (this.logger) {
            this.logger.debug(message);
        }
        else {
            this.logMessages += message;
        }
    }
    static verification(verificationDescription) {
        this.takeScreenShot();
        this.commonLogger('Verification', verificationDescription);
    }
    static takeScreenShot() {
        protractor_1.browser.takeScreenshot().then((png) => {
            //   if (!process.env.NO_ALLURE) {
            //   //  allure.createAttachment('Screenshot', function () {
            //       return new Buffer(png, 'base64');
            //     }, 'image/png')();
            //   }
            // });
        });
        /**
         * Called for any precondition related step-log shown towrds Spec file, never used anywhere else such as validation/helper
         * @param {string} preConditionDescription
         */
    }
    static preCondition(preConditionDescription) {
        this.commonLogger('Pre-Condition', preConditionDescription);
    }
    static postCondition(postConditionDescription) {
        this.commonLogger('Post-Condition', postConditionDescription);
    }
    //   /*
    //    * Called wherever a helper/validation method need to have a step/action step significant enough to log
    //    * @param {string} stepName
    //    */
    static subStep(stepName) {
        this.commonLogger('Sub-Step', stepName);
    }
    //   /**
    //    * Called wherever a helper/validation method need to have a verification step significant enough to log
    //    * @param {string} verificationDescription
    //    */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUFpQztBQUVqQywyQ0FBb0Q7QUFFcEQsTUFBTSx1QkFBdUIsR0FBWSxJQUFJLENBQUM7QUFFOUMsU0FBZ0IsSUFBSSxDQUFDLElBQVk7SUFDL0IsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUMsK0VBQStFO0lBQ3BHLElBQUksT0FBTyxFQUFFO1FBQ1gsTUFBTSxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNyQixNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQVcsRUFBRSxFQUFFO1lBQzFCLE9BQU8sQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDO1FBQ0YsTUFBTSxJQUFJLEdBQ1IsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDO1FBQ3pFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztLQUNoQztBQUNILENBQUM7QUFYRCxvQkFXQztBQU9ELE1BQWEsVUFBVTtJQVFyQixNQUFNLEtBQUssTUFBTSxDQUFDLFNBQWlCO1FBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxF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