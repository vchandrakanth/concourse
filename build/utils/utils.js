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
const protractor_1 = require("protractor");
let prop1 = require('../conf/properties');
function goToMainPage() {
    return __awaiter(this, void 0, void 0, function* () {
        // browser.ignoreSynchronization=true;
        yield protractor_1.browser.get(prop1.qaUrl);
        console.log(prop1.qaUrl);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJDQUFxRjtBQUdyRixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUUxQyxTQUFzQixZQUFZOztRQUM5QixzQ0FBc0M7UUFDdEMsTUFBTSxvQkFBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztDQUFBO0FBSkQsb0NBSUM7QUFFRCxTQUFzQixZQUFZLENBQUMsYUFBNEI7O1FBQzNELE1BQU0sYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2hDLENBQUM7Q0FBQTtBQUZELG9DQUVDO0FBRUQsU0FBc0IsWUFBWTs7UUFDOUIsT0FBTyxvQkFBTyxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUc7WUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixJQUFJLEdBQUcsR0FBRyxZQUFZLENBQUM7WUFDdkIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQixRQUFRLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQixPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FBQTtBQVJELG9DQVFDO0FBRUQsU0FBc0IsTUFBTTs7UUFDeEIsT0FBTyxvQkFBTyxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUc7WUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixPQUFPLEdBQUcsQ0FBQztRQUNmLENB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