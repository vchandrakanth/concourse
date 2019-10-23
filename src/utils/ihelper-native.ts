import { browser, element, ElementFinder, ElementArrayFinder, by, promise, ExpectedConditions as EC, WebElement, $, $$, WebDriver } from 'protractor';
const when = promise.when, reject = Promise.reject;
import { IHelper as I } from './ihelper';
import { IHelperNative as me } from './ihelper-native';


export class IHelperNative {
    static webviewContext: string;
    static nativeContext = 'NATIVE_APP';
    static getButtonByText(text: string): promise.Promise<WebElement> {
        let btloc = `//android.widget.Button[@text='ALLOW']`;
        // let btsloc = '//android.widget.Button'; // .all  hangs result
        I.log(`native - searching button: ${btloc}`);
        // let btsloc = '//*[contains(local-name(), \'android.widget.Button\')]';
        try {
            debugger;

            // let bt = element(by.xpath(btsloc));
            let bt = browser.driver.findElement(by.xpath(btloc));
            // MobileBy.AndroidUIAutomator
            return <any> bt; // browser.driver.wait(EC.presenceOf(bts), 200)
            // .then((r) => {
            //     I.log('native - element found.');
            //     debugger
            // })
            // .catch((r) => {
            //     I.logYellow('native - element not found.');
            //     debugger
            //     return null;
            // })

        } catch (error) {
            debugger;
        }
        // return browser.driver.findElements(by.xpath(btsloc));
    }
    // static getButtonByText = (option) => {
    //     // return promise.when(true)
    //     // let bts =
    //     return me.getButtonByTexttons.then((bts) => {
    //         let btsfil = bts.filter((elem) => elem.getText().then(function (text) {
    //             return text.toLowerCase().indexOf(option.toLowerCase()) !== -1;
    //         }))

    //         if (btsfil.length > 0) {
    //             return bts[0];
    //         }
    //         return null;
    //         // return bts.count()
    //         //     .then((size) => {
    //         //         if (size > 0) { return bts.first(); }
    //         //         else { I.fail(new Error('native button not found:' + option)); }
    //         //     });

    //     })
    // }

    static toEnableGps = (): promise.Promise<any> => {
        // TODO pending to force window to show or enable automatically even without popup confirmation
        // return me.selectPopupOptionByText('allow');
        return promise.when(true);
    }


    static execOnNative = (fn: () => promise.Promise<any>): promise.Promise<any> =>
        browser.driver.getCurrentContext()
            .then((webviewContext) => { me.webviewContext = webviewContext; })
            .then(() =>
                browser.driver.selectContext(me.nativeContext)
                    .then((r) => {
                        return browser.driver.getCurrentContext().then((rr) => {
                            try {
                                return fn();
                            } catch (error) {
                                throw error;
                            }

                        });
                    })
                    .then((r) => browser.driver.selectContext(me.webviewContext).then(() => r))
                    .catch(e => browser.driver.selectContext(me.webviewContext).then(() => { throw e; }))
                    // .catch(e => { I.logYellow('native error:' + e.message); I.fail(e); })
            )

    static selectPopupOptionByText = (option: string): promise.Promise<any> =>
        me.execOnNative(() =>
            me.getButtonByText(option)
                .then(bt => { if (bt) return bt.click(); }))
}