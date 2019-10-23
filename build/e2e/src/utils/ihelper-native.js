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
exports.IHelperNative = IHelperNative;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWhlbHBlci1uYXRpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdXRpbHMvaWhlbHBlci1uYXRpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBc0o7QUFDdEosTUFBTSxJQUFJLEdBQUcsb0JBQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDbkQsdUNBQXlDO0FBQ3pDLHFEQUF1RDtBQUd2RCxNQUFhLGFBQWE7SUFHdEIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFZO1FBQy9CLElBQUksS0FBSyxHQUFHLHdDQUF3QyxDQUFDO1FBQ3JELGdFQUFnRTtRQUNoRSxpQkFBQyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUM3Qyx5RUFBeUU7UUFDekUsSUFBSTtZQUNBLFFBQVEsQ0FBQztZQUVULHNDQUFzQztZQUN0QyxJQUFJLEVBQUUsR0FBRyxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsZUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3JELDhCQUE4QjtZQUM5QixPQUFhLEVBQUUsQ0FBQyxDQUFDLCtDQUErQztZQUNoRSxpQkFBaUI7WUFDakIsd0NBQXdDO1lBQ3hDLGVBQWU7WUFDZixLQUFLO1lBQ0wsa0JBQWtCO1lBQ2xCLGtEQUFrRDtZQUNsRCxlQUFlO1lBQ2YsbUJBQW1CO1lBQ25CLEtBQUs7U0FFUjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ1osUUFBUSxDQUFDO1NBQ1o7UUFDRCx3REFBd0Q7SUFDNUQsQ0FBQzs7QUE3Qkwsc0NBa0ZDO0FBaEZVLDJCQUFhLEdBQUcsWUFBWSxDQUFDO0FBNEJwQyx5Q0FBeUM7QUFDekMsbUNBQW1DO0FBQ25DLG1CQUFtQjtBQUNuQixvREFBb0Q7QUFDcEQsa0ZBQWtGO0FBQ2xGLDhFQUE4RTtBQUM5RSxjQUFjO0FBRWQsbUNBQW1DO0FBQ25DLDZCQUE2QjtBQUM3QixZQUFZO0FBQ1osdUJBQXVCO0FBQ3ZCLGdDQUFnQztBQUNoQyxtQ0FBbUM7QUFDbkMsMkRBQTJEO0FBQzNELHNGQUFzRjtBQUN0RixxQkFBcUI7QUFFckIsU0FBUztBQUNULElBQUk7QUFFRyx5QkFBVyxHQUFHLEdBQXlCLEVBQUU7SUFDNUMsK0ZBQStGO0lBQy9GLDhDQUE4QztJQUM5QyxPQUFPLG9CQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzlCLENBQUMsQ0FBQTtBQUdNLDBCQUFZLEdBQUcsQ0FBQyxFQUE4QixFQUF3QixFQUFFLENBQzNFLG9CQUFPLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFO0tBQzdCLElBQUksQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFLEdBQUcsOEJBQUUsQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FDUCxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsOEJBQUUsQ0FBQyxhQUFhLENBQUM7S0FDekMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDUixPQUFPLG9CQUFPLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7UUFDbEQsSUFBSTtZQUNBLE9BQU8sRUFBRSxFQUFFLENBQUM7U0FDZjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ1osTUFBTSxLQUFLLENBQUM7U0FDZjtJQUVMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDO0tBQ0QsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsOEJBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDMUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsb0JBQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLDhCQUFFLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckYsd0VBQXdFO0NBQy9FLENBQUE7QUFFRixxQ0FBdUIsR0FBRyxDQUFDLE1BQWMsRUFBd0IsRUFBRSxDQUN0RSw4QkFBRSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FDakIsOEJBQUUsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO0tBQ3JCLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLElBQUksRUFBRTtJQUFFLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSJ9