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
ElementHelper.EC = protractor_1.protractor.ExpectedConditions;
exports.ElementHelper = ElementHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudEhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9lbGVtZW50SGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQ0FBaUY7QUFFakYsd0ZBQXdGO0FBRXhGLDZDQUEwQztBQUUxQyxNQUFhLGFBQWE7SUFDeEIsTUFBTSxDQUFPLFlBQVksQ0FBQyxNQUFxQjs7WUFDN0MsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQzdDLENBQUM7S0FBQTtJQUdDLE1BQU0sQ0FBTyxVQUFVOztZQUNuQixNQUFNLFlBQVksR0FBRyxNQUFNLG9CQUFPLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDckQsT0FBTyxZQUFZLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzNDLENBQUM7S0FBQTtJQUVELE1BQU0sQ0FBTyxlQUFlLENBQUMsSUFBbUI7O1lBQzVDLE1BQU0sdUJBQVUsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuRCxPQUFPLG9CQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3ZELENBQUM7S0FBQTtJQUVELE1BQU0sQ0FBTyxlQUFlLENBQUMsSUFBbUI7O1lBQzVDLE1BQU0sdUJBQVUsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuRCxPQUFPLG9CQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3ZELENBQUM7S0FBQTtJQUVELE1BQU0sQ0FBTyxpQkFBaUIsQ0FBQyxNQUFxQixFQUFFLFdBQTBCOztZQUM1RSxPQUFPLG9CQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN4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