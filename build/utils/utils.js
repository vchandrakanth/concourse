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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBb0Y7QUFHcEYsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFHMUMsU0FBdUIsWUFBWTs7UUFDL0Isc0NBQXNDO1FBQ3RDLE1BQU0sb0JBQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRS9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTdCLENBQUM7Q0FBQTtBQU5ELG9DQU1DO0FBRUQsU0FBc0IsWUFBWSxDQUFDLGFBQTRCOztRQUUzRCxNQUFNLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUVoQyxDQUFDO0NBQUE7QUFKRCxvQ0FJQztBQUVELFNBQXNCLFlBQVksQ0FBQyxhQUE0QixFQUFFLElBQVM7O1FBRXRFLE1BQU0sYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBRWhDLENBQUM7Q0FBQTtBQUpELG9DQUlDO0FBQ0Qsc0JBQXNCO0FBQ3RCLFNBQXNCLGVBQWUsQ0FBQyxhQUE0QixFQUFFLFdBQW1COztRQUN2RixNQUFNLGFBQWEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFMUMsQ0FBQztDQUFBO0FBSEQsMENBR0M7QUFFRCxTQUF3QixhQUFhLENBQUMsZUFBZSxFQUFFLEtBQUs7O1FBQ3hELE1BQU0sY0FBYyxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNsSixNQUFNLFVBQVUsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDeEcsSUFBSSxlQUFlLEVBQUU7WUFDakIsT0FBTyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDaEM7YUFDSTtZQUNELE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzVCO0lBRUQsQ0FBQztDQUFBO0FBVkwsc0NBVUs7QUFFRixTQUFzQixnQkFBZ0IsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxHQUFHOztRQUNwRCxPQUFPLENBQUEsTUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBRyxHQUFHLENBQUM7SUFDaEUsQ0FBQztDQUFBO0FBRk4sNENBRU07QUFFTCxTQUFzQixPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxhQUFhOztRQUNqRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQzdDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sQ0FBQSxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFHLEtBQUssQ0FBQztJQUNsRCxDQUFDO0NBQUE7QUFKRCwwQkFJQztBQUVGLFNBQXVCLGVBQWUsQ0FBQyxNQUFNOztRQUN4QyxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLENBQUM7UUFDTixJQUFJLE9BQU8sR0FBRyxzQ0FBc0MsQ0FBQztRQUNyRCw4QkFBOEI7UUFDOUIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDekIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDekU7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNmLENBQUM7Q0FBQTtBQVROLDBDQVNNIn0=