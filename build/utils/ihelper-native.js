"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const when = protractor_1.promise.when, reject = Promise.reject;
const ihelper_1 = require("./ihelper");
const ihelper_native_1 = require("./ihelper-native");
class IHelperNative {
    static getButtonByText(text) {
        let btloc = `//android.widget.Button[@text='ALLOW']`;
        // let btsloc = '//android.widget.Button'; // .all  hangs result
        ihelper_1.IHelper.log(`native - searching button: ${btloc}`);
        // let btsloc = '//*[contains(local-name(), \'android.widget.Button\')]';
        try {
            debugger;
            // let bt = element(by.xpath(btsloc));
            let bt = protractor_1.browser.driver.findElement(protractor_1.by.xpath(btloc));
            // MobileBy.AndroidUIAutomator
            return bt; // browser.driver.wait(EC.presenceOf(bts), 200)
            // .then((r) => {
            //     I.log('native - element found.');
            //     debugger
            // })
            // .catch((r) => {
            //     I.logYellow('native - element not found.');
            //     debugger
            //     return null;
            // })
        }
        catch (error) {
            debugger;
        }
        // return browser.driver.findElements(by.xpath(btsloc));
    }
}
IHelperNative.nativeContext = 'NATIVE_APP';
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
IHelperNative.toEnableGps = () => {
    // TODO pending to force window to show or enable automatically even without popup confirmation
    // return me.selectPopupOptionByText('allow');
    return protractor_1.promise.when(true);
};
IHelperNative.execOnNative = (fn) => protractor_1.browser.driver.getCurrentContext()
    .then((webviewContext) => { ihelper_native_1.IHelperNative.webviewContext = webviewContext; })
    .then(() => protractor_1.browser.driver.selectContext(ihelper_native_1.IHelperNative.nativeContext)
    .then((r) => {
    return protractor_1.browser.driver.getCurrentContext().then((rr) => {
        try {
            return fn();
        }
        catch (error) {
            throw error;
        }
    });
})
    .then((r) => protractor_1.browser.driver.selectContext(ihelper_native_1.IHelperNative.webviewContext).then(() => r))
    .catch(e => protractor_1.browser.driver.selectContext(ihelper_native_1.IHelperNative.webviewContext).then(() => { throw e; }))
// .catch(e => { I.logYellow('native error:' + e.message); I.fail(e); })
);
IHelperNative.selectPopupOptionByText = (option) => ihelper_native_1.IHelperNative.execOnNative(() => ihelper_native_1.IHelperNative.getButtonByText(option)
    .then(bt => { if (bt)
    return bt.click(); }));
exports.IHelperNative = IHelperNative;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWhlbHBlci1uYXRpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvaWhlbHBlci1uYXRpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBc0o7QUFDdEosTUFBTSxJQUFJLEdBQUcsb0JBQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDbkQsdUNBQXlDO0FBQ3pDLHFEQUF1RDtBQUd2RCxNQUFhLGFBQWE7SUFHdEIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFZO1FBQy9CLElBQUksS0FBSyxHQUFHLHdDQUF3QyxDQUFDO1FBQ3JELGdFQUFnRTtRQUNoRSxpQkFBQyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUM3Qyx5RUFBeUU7UUFDekUsSUFBSTtZQUNBLFFBQVEsQ0FBQztZQUVULHNDQUFzQztZQUN0QyxJQUFJLEVBQUUsR0FBRyxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsZUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3JELDhCQUE4QjtZQUM5QixPQUFhLEVBQUUsQ0FBQyxDQUFDLCtDQUErQztZQUNoRSxpQkFBaUI7WUFDakIsd0NBQXdDO1lBQ3hDLGVBQWU7WUFDZixLQUFLO1lBQ0wsa0JBQWtCO1lBQ2xCLGtEQUFrRDtZQUNsRCxlQUFlO1lBQ2YsbUJBQW1CO1lBQ25CLEtBQUs7U0FFUjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ1osUUFBUSxDQUFDO1NBQ1o7UUFDRCx3REFBd0Q7SUFDNUQsQ0FBQzs7QUEzQk0sMkJBQWEsR0FBRyxZQUFZLENBQUM7QUE0QnBDLHlDQUF5QztBQUN6QyxtQ0FBbUM7QUFDbkMsbUJBQW1CO0FBQ25CLG9EQUFvRDtBQUNwRCxrRkFBa0Y7QUFDbEYsOEVBQThFO0FBQzlFLGNBQWM7QUFFZCxtQ0FBbUM7QUFDbkMsNkJBQTZCO0FBQzdCLFlBQVk7QUFDWix1QkFBdUI7QUFDdkIsZ0NBQWdDO0FBQ2hDLG1DQUFtQztBQUNuQywyREFBMkQ7QUFDM0Qsc0ZBQXNGO0FBQ3RGLHFCQUFxQjtBQUVyQixTQUFTO0FBQ1QsSUFBSTtBQUVHLHlCQUFXLEdBQUcsR0FBeUIsRUFBRTtJQUM1QywrRkFBK0Y7SUFDL0YsOENBQThDO0lBQzlDLE9BQU8sb0JBQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDOUIsQ0FBQyxDQUFBO0FBR00sMEJBQVksR0FBRyxDQUFDLEVBQThCLEVBQXdCLEVBQUUsQ0FDM0Usb0JBQU8sQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUU7S0FDN0IsSUFBSSxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyw4QkFBRSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDakUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUNQLG9CQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyw4QkFBRSxDQUFDLGFBQWEsQ0FBQztLQUN6QyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUNSLE9BQU8sb0JBQU8sQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTtRQUNsRCxJQUFJO1lBQ0EsT0FBTyxFQUFFLEVBQUUsQ0FBQztTQUNmO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDWixNQUFNLEtBQUssQ0FBQztTQUNmO0lBRUwsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUM7S0FDRCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLG9CQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyw4QkFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMxRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsOEJBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyRix3RUFBd0U7Q0FDL0UsQ0FBQTtBQUVGLHFDQUF1QixHQUFHLENBQUMsTUFBYyxFQUF3QixFQUFFLENBQ3RFLDhCQUFFLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUNqQiw4QkFBRSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7S0FDckIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsSUFBSSxFQUFFO0lBQUUsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBakY1RCxzQ0FrRkMifQ==