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
function goToMainPage(browserurltest = null) {
    return __awaiter(this, void 0, void 0, function* () {
        // browser.ignoreSynchronization=true;
        return yield protractor_1.browser.get(browserurltest);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBcUY7QUFLckYsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDM0MsSUFBSSxjQUFjLENBQUM7QUFFbkIsU0FBc0IsWUFBWSxDQUFDLGlCQUF5QixJQUFJOztRQUM1RCxzQ0FBc0M7UUFFeEMsT0FBUSxNQUFNLG9CQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3hDLGdEQUFnRDtJQUNwRCxDQUFDO0NBQUE7QUFMRCxvQ0FLQztBQUVELFNBQXNCLFlBQVksQ0FBQyxhQUE0Qjs7UUFDM0QsTUFBTSxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDaEMsQ0FBQztDQUFBO0FBRkQsb0NBRUM7QUFFRCxTQUFzQixZQUFZOztRQUM5QixPQUFPLG9CQUFPLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRztZQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLElBQUksR0FBRyxHQUFHLFlBQVksQ0FBQztZQUN2QixJQUFJLFFBQVEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLFFBQVEsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUFBO0FBUkQsb0NBUUM7QUFFRCxTQUFzQixNQUFNOztRQUN4QixPQUFPLG9CQUFPLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRztZQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FBQyxD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