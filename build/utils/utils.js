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
const protractor_1 = require("protractor");
let params = require('../conf/properties');
let browserurltest;
function goToMainPage(envUrl = null) {
    return __awaiter(this, void 0, void 0, function* () {
        yield console.log('The Environment to Test :' + envUrl);
        return yield protractor_1.browser.get(envUrl);
        // return console.log(browser.params.login.url);
    });
}
exports.goToMainPage = goToMainPage;
function elementClick(targetElement) {
    return __awaiter(this, void 0, void 0, function* () {
        yield targetElement.click();
    });
}
exports.elementClick = elementClick;
function getIdFromUrl() {
    return __awaiter(this, void 0, void 0, function* () {
        return protractor_1.browser.getCurrentUrl().then(function (url) {
            console.log(url);
            let str = 'currentUrl';
            let entityId = [str];
            entityId = url.split('/');
            return entityId[4];
        });
    });
}
exports.getIdFromUrl = getIdFromUrl;
function getUrl() {
    return __awaiter(this, void 0, void 0, function* () {
        return protractor_1.browser.getCurrentUrl().then(function (url) {
            console.log(url);
            return url;
        });
    });
}
exports.getUrl = getUrl;
function elementClear(targetElement, text) {
    return __awaiter(this, void 0, void 0, function* () {
        yield targetElement.clear();
    });
}
exports.elementClear = elementClear;
// elementName: string
function elementSendkeys(targetElement, elementName) {
    return __awaiter(this, void 0, void 0, function* () {
        yield targetElement.sendKeys(elementName);
    });
}
exports.elementSendkeys = elementSendkeys;
function getMonthNames(fullAbbrevation, month) {
    return __awaiter(this, void 0, void 0, function* () {
        const monthNamesfull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        if (fullAbbrevation) {
            return monthNamesfull[month];
        }
        else {
            return monthNames[month];
        }
    });
}
exports.getMonthNames = getMonthNames;
function getRandomInteger(min = 1, max = 999) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield Math.floor(Math.random() * (max - min + 1))) + min;
    });
}
exports.getRandomInteger = getRandomInteger;
function genRand(min, max, decimalPlaces) {
    return __awaiter(this, void 0, void 0, function* () {
        let rand = Math.random() * (max - min) + min;
        let power = Math.pow(10, decimalPlaces);
        return (yield Math.floor(rand * power)) / power;
    });
}
exports.genRand = genRand;
function getRandomString(length) {
    return __awaiter(this, void 0, void 0, function* () {
        let nstring = '    ';
        let i;
        let letters = 'abcdefghijklmnopqrstuvwxyz1234567890';
        // Include numbers if you want
        for (i = 0; i < length; i++) {
            nstring += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        return nstring;
    });
}
exports.getRandomString = getRandomString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBcUY7QUFLckYsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDM0MsSUFBSSxjQUFjLENBQUM7QUFFbkIsU0FBc0IsWUFBWSxDQUFDLFNBQWlCLElBQUk7O1FBQ3BELE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsR0FBRyxNQUFNLENBQUMsQ0FBQztRQUN4RCxPQUFPLE1BQU0sb0JBQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakMsZ0RBQWdEO0lBQ3BELENBQUM7Q0FBQTtBQUpELG9DQUlDO0FBRUQsU0FBc0IsWUFBWSxDQUFDLGFBQTRCOztRQUMzRCxNQUFNLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0NBQUE7QUFGRCxvQ0FFQztBQUVELFNBQXNCLFlBQVk7O1FBQzlCLE9BQU8sb0JBQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHO1lBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsSUFBSSxHQUFHLEdBQUcsWUFBWSxDQUFDO1lBQ3ZCLElBQUksUUFBUSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckIsUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUIsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQUE7QUFSRCxvQ0FRQztBQUVELFNBQXNCLE1BQU07O1FBQ3hCLE9BQU8sb0JBQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHO1lBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FB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