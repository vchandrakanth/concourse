import { browser, ExpectedConditions, element, by, ElementFinder} from 'protractor';
import { stringify } from 'querystring';
import { async } from 'q';
let prop1 = require('../conf/properties');


export  async function goToMainPage( )  {
    // browser.ignoreSynchronization=true;
    await browser.get(prop1.qaUrl);

    console.log(prop1.qaUrl);

}

export async function elementClick(targetElement: ElementFinder) {

    await targetElement.click();

}

export async function elementClear(targetElement: ElementFinder, text: any) {

    await targetElement.clear();

}
// elementName: string
export async function elementSendkeys(targetElement: ElementFinder, elementName: string) {
await targetElement.sendKeys(elementName);

}

export async function   getMonthNames(fullAbbrevation, month) {
    const monthNamesfull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (fullAbbrevation) {
        return monthNamesfull[month];
    }
    else {
        return monthNames[month];
    }

    }

   export async function getRandomInteger(min = 1, max = 999) {
        return await  Math.floor(Math.random() * (max - min + 1)) + min;
        }

    export async function genRand(min, max, decimalPlaces) {
        let rand = Math.random() * (max - min) + min;
        let power = Math.pow(10, decimalPlaces);
        return await Math.floor(rand * power) / power;
    }

   export async function  getRandomString(length) {
        let nstring = '    ';
        let i;
        let letters = 'abcdefghijklmnopqrstuvwxyz1234567890';
        // Include numbers if you want
        for (i = 0; i < length; i++) {
            nstring += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        return nstring;
        }