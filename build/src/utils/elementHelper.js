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
// import { ComponentHelpers } from '../devfactory/component-helpers/component-helpers';
const waitHelper_1 = require("./waitHelper");
class ElementHelper {
    static getAttribute(select) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Method not implemented.');
        });
    }
    static getBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            const capabilities = yield protractor_1.browser.getCapabilities();
            return capabilities.get('browserName');
        });
    }
    static actionMouseMove(item) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(item);
            return protractor_1.browser.actions().mouseMove(item).perform();
        });
    }
    static actionMouseDown(item) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(item);
            return protractor_1.browser.actions().mouseDown(item).perform();
        });
    }
    static actionDragAndDrop(source, destination) {
        return __awaiter(this, void 0, void 0, function* () {
            return protractor_1.browser.actions().dragAndDrop(source, destination).perform();
        });
    }
    static actionDoubleClick(optElementOrButton, optButton) {
        return __awaiter(this, void 0, void 0, function* () {
            if (optElementOrButton) {
                return protractor_1.browser.actions().doubleClick(optElementOrButton).perform();
            }
            if (optButton) {
                return protractor_1.browser.actions().doubleClick(optButton).perform();
            }
        });
    }
    static actionClick(optElementOrButton, optButton) {
        return __awaiter(this, void 0, void 0, function* () {
            if (optElementOrButton) {
                return protractor_1.browser.actions().click(optElementOrButton).perform();
            }
            if (optButton) {
                return protractor_1.browser.actions().click(optButton).perform();
            }
        });
    }
    static actionHoverOver(locator) {
        return __awaiter(this, void 0, void 0, function* () {
            return protractor_1.browser.actions().mouseMove(locator).perform();
        });
    }
    static actionHoverOverAndClick(hoverOverLocator, clickLocator) {
        return __awaiter(this, void 0, void 0, function* () {
            return protractor_1.browser.actions().mouseMove(hoverOverLocator).click(clickLocator).perform();
        });
    }
    static hasOption(select, option) {
        return __awaiter(this, void 0, void 0, function* () {
            return select
                .element(protractor_1.by.cssContainingText('option', option))
                .isPresent();
        });
    }
    // static async hasSelectedOption(select: ElementFinder, option: string) {
    //     return select.element(by.xpath(`./option[${ComponentHelpers.getXPathFunctionForDot(option)}]`)).isSelected();
    // }
    static getFocusedElement() {
        return __awaiter(this, void 0, void 0, function* () {
            return protractor_1.browser
                .driver
                .switchTo()
                .activeElement();
        });
    }
    static currentSelectedOptionByText(text) {
        return __awaiter(this, void 0, void 0, function* () {
            // const sel; //option[@selected="selected" and normalize-space(.)="${text}"]`;
            // return element(By.xpath(selector));
        });
    }
    static getSelectedOption(select) {
        return __awaiter(this, void 0, void 0, function* () {
            return select.element(protractor_1.By.css('option[selected]'));
        });
    }
    static isVisible(locator) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.EC.visibilityOf(locator);
        });
    }
    static isNotVisible(locator) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.EC.invisibilityOf(locator);
        });
    }
    static inDom(locator) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.EC.presenceOf(locator);
        });
    }
    static notInDom(locator) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.EC.stalenessOf(locator);
        });
    }
    static isClickable(locator) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.EC.elementToBeClickable(locator);
        });
    }
    static hasText(locator, text) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.EC.textToBePresentInElement(locator, text);
        });
    }
    static titleIs(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.EC.titleIs(title);
        });
    }
    static hasClass(locator, klass) {
        return __awaiter(this, void 0, void 0, function* () {
            const classes = yield locator.getAttribute('class');
            return classes && classes.split(' ').indexOf(klass) !== -1;
        });
    }
    static hasClassRegex(locator, klass) {
        return __awaiter(this, void 0, void 0, function* () {
            const classAttribute = yield locator.getAttribute('class');
            const pattern = new RegExp('(^|\\s)' + klass + '(\\s|$)');
            return pattern.test(classAttribute);
        });
    }
    static click(targetElement) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(targetElement);
            return targetElement.click();
        });
    }
    static clickIfPresent(targetElement) {
        return __awaiter(this, void 0, void 0, function* () {
            const isPresent = yield targetElement.isPresent();
            if (isPresent) {
                return this.click(targetElement);
            }
            return;
        });
    }
    static clickUsingJs(targetElement) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(targetElement);
            return this.clickUsingJsNoWait(targetElement);
        });
    }
    static clickUsingJsNoWait(targetElement) {
        return __awaiter(this, void 0, void 0, function* () {
            return protractor_1.browser.executeScript('arguments[0].click();', yield targetElement.getWebElement());
        });
    }
    // static async selectDropDownByIndex(elementt: ElementFinder, optionNum: number) {
    //     if (optionNum) {
    //         const options = await elementt.findElements(by.tagName('option'));
    //         options[optionNum].click();
    //     }
    // }
    static scrollToElement(elementt) {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.executeScript('arguments[0].scrollIntoView();', elementt.getElementFinder());
        });
    }
    static getAttributeValue(elem, attribute) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield elem.getAttribute(attribute);
            return value.trim();
        });
    }
    static getText(elem) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToHaveText(elem);
            const text = yield elem.getText();
            return text.trim();
        });
    }
    static selectDropDownByIndex(elementt, optionNum) {
        return __awaiter(this, void 0, void 0, function* () {
            if (optionNum) {
                // const options = await elementt.findElements(by.('option'));
                // options[optionNum].click();
                let options = protractor_1.element.all(protractor_1.by.tagName('option'))
                    .then(function (options) {
                    options[optionNum].click();
                });
            }
        });
    }
    // static getElementByText(text: string, isContains = false) {
    //     return element(By.xpath(`//*[${ComponentHelpers.getXPathFunctionForText(text, isContains)}]`));
    // }
    static openLinkInNewTabUsingTarget(targetElement) {
        return __awaiter(this, void 0, void 0, function* () {
            const script = 'const item = arguments[0];item.setAttribute("target", "_blank");item.click()';
            yield protractor_1.browser.executeScript(script, yield targetElement.getWebElement());
        });
    }
    static openLinkInNewTabUsingWindowOpener(targetElement) {
        return __awaiter(this, void 0, void 0, function* () {
            const script = 'return window.open(arguments[0].getAttribute("href"),"_blank")';
            yield protractor_1.browser.executeScript(script, yield targetElement.getWebElement());
        });
    }
    static scrollTopToElement(element, elementToScroll, timeout = null) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO detect first parent relative scrollable and make elementToScroll optional, also replace scrollIntoView on I.wait
            return element.getWebElement()
                .then((we) => elementToScroll.getWebElement()
                .then((we2) => {
                console.log(` vertically scrolled to test`);
                return protractor_1.browser.driver.executeScript('var px = arguments[0].offsetTop; arguments[1].scrollTop = px; return arguments[1].scrollTop;', we, we2);
            })).then((res) => { console.log(` vertically scrolled to ${res}`); return res; });
        });
    }
    static scrollIfNeeded(element, container) {
        return __awaiter(this, void 0, void 0, function* () {
            if (element.offsetTop < container.scrollTop) {
                container.scrollTop = element.offsetTop;
            }
            else {
                const offsetBottom = element.offsetTop + element.offsetHeight;
                const scrollBottom = container.scrollTop + container.offsetHeight;
                if (offsetBottom > scrollBottom) {
                    container.scrollTop = offsetBottom - container.offsetHeight;
                }
            }
        });
    }
}
exports.ElementHelper = ElementHelper;
ElementHelper.EC = protractor_1.protractor.ExpectedConditions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudEhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9lbGVtZW50SGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkNBQWlGO0FBRWpGLHdGQUF3RjtBQUV4Riw2Q0FBMEM7QUFFMUMsTUFBYSxhQUFhO0lBQ3hCLE1BQU0sQ0FBTyxZQUFZLENBQUMsTUFBcUI7O1lBQzdDLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUM3QyxDQUFDO0tBQUE7SUFHQyxNQUFNLENBQU8sVUFBVTs7WUFDbkIsTUFBTSxZQUFZLEdBQUcsTUFBTSxvQkFBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3JELE9BQU8sWUFBWSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMzQyxDQUFDO0tBQUE7SUFFRCxNQUFNLENBQU8sZUFBZSxDQUFDLElBQW1COztZQUM1QyxNQUFNLHVCQUFVLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkQsT0FBTyxvQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN2RCxDQUFDO0tBQUE7SUFFRCxNQUFNLENBQU8sZUFBZSxDQUFDLElBQW1COztZQUM1QyxNQUFNLHVCQUFVLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkQsT0FBTyxvQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN2RCxDQUFDO0tBQUE7SUFFRCxNQUFNLENBQU8saUJBQWlCLENBQUMsTUFBcUIsRUFBRSxXQUEwQjs7WUFDNUUsT0FBTyxvQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7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