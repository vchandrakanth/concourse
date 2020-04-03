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
const waitHelper_1 = require("./waitHelper");
class ElementHelper {
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
            const selector = `//option[@selected="selected" and normalize-space(.)="${text}"]`;
            return protractor_1.element(protractor_1.By.xpath(selector));
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
    static selectDropDownByIndex(elementt, optionNum) {
        return __awaiter(this, void 0, void 0, function* () {
            if (optionNum) {
                // const options = await elementt.findElements(by.('option'));
                //options[optionNum].click();
                var options = protractor_1.element.all(protractor_1.by.tagName('option'))
                    .then(function (options) {
                    options[optionNum].click();
                });
            }
        });
    }
    static scrollToElement(elementt) {
        return __awaiter(this, void 0, void 0, function* () {
            protractor_1.browser.executeScript('arguments[0].scrollIntoView();', elementt.getElementFinder());
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
}
exports.ElementHelper = ElementHelper;
ElementHelper.EC = protractor_1.protractor.ExpectedConditions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudEhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvZTJlL3NyYy91dGlscy9lbGVtZW50SGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkNBQWlGO0FBR2pGLDZDQUEwQztBQUUxQyxNQUFhLGFBQWE7SUFHdEIsTUFBTSxDQUFPLFVBQVU7O1lBQ25CLE1BQU0sWUFBWSxHQUFHLE1BQU0sb0JBQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUNyRCxPQUFPLFlBQVksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDM0MsQ0FBQztLQUFBO0lBRUQsTUFBTSxDQUFPLGVBQWUsQ0FBQyxJQUFtQjs7WUFDNUMsTUFBTSx1QkFBVSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25ELE9BQU8sb0JBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkQsQ0FBQztLQUFBO0lBRUQsTUFBTSxDQUFPLGVBQWUsQ0FBQyxJQUFtQjs7WUFDNUMsTUFBTSx1QkFBVSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25ELE9BQU8sb0JBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkQsQ0FBQztLQUFBO0lBRUQsTUFBTSxDQUFPLGlCQUFpQixDQUFDLE1BQXFCLEVBQUUsV0FBMEI7O1lBQzVFLE9BQU8sb0JBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3hFLENBQUM7S0FBQTtJQUVELE1BQU0sQ0FBTyxpQkFBaUIsQ0FBQyxrQkFBNEMsRUFB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