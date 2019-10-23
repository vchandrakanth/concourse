import { browser, by, element, protractor, By, ElementFinder } from 'protractor';

// import { ComponentHelpers } from '../devfactory/component-helpers/component-helpers';

import { WaitHelper } from './waitHelper';

export class ElementHelper {
  static async getAttribute(select: ElementFinder) {
    throw new Error('Method not implemented.');
  }
    private static readonly EC = protractor.ExpectedConditions;

    static async getBrowser() {
        const capabilities = await browser.getCapabilities();
        return capabilities.get('browserName');
    }

    static async actionMouseMove(item: ElementFinder) {
        await WaitHelper.waitForElementToBeDisplayed(item);
        return browser.actions().mouseMove(item).perform();
    }

    static async actionMouseDown(item: ElementFinder) {
        await WaitHelper.waitForElementToBeDisplayed(item);
        return browser.actions().mouseDown(item).perform();
    }

    static async actionDragAndDrop(source: ElementFinder, destination: ElementFinder) {
        return browser.actions().dragAndDrop(source, destination).perform();
    }

    static async actionDoubleClick(optElementOrButton ?: ElementFinder | string, optButton ?: string) {
        if (optElementOrButton) {
            return browser.actions().doubleClick(optElementOrButton).perform();
        }
        if (optButton) {
            return browser.actions().doubleClick(optButton).perform();
        }
    }

    static async actionClick(optElementOrButton ?: ElementFinder | string, optButton ?: string) {
        if (optElementOrButton) {
            return browser.actions().click(optElementOrButton).perform();
        }
        if (optButton) {
            return browser.actions().click(optButton).perform();
        }
    }

    static async actionHoverOver(locator: ElementFinder) {
        return browser.actions().mouseMove(locator).perform();
    }

    static async actionHoverOverAndClick(hoverOverLocator: ElementFinder, clickLocator: ElementFinder) {
        return browser.actions().mouseMove(hoverOverLocator).click(clickLocator).perform();
    }

    static async hasOption(select: ElementFinder, option: string) {
        return select
            .element(by.cssContainingText('option', option))
            .isPresent();
    }

    // static async hasSelectedOption(select: ElementFinder, option: string) {
    //     return select.element(by.xpath(`./option[${ComponentHelpers.getXPathFunctionForDot(option)}]`)).isSelected();
    // }

    static async getFocusedElement() {
        return browser
            .driver
            .switchTo()
            .activeElement();
    }

    static async currentSelectedOptionByText(text: string) {
        // const sel; //option[@selected="selected" and normalize-space(.)="${text}"]`;
        // return element(By.xpath(selector));
    }

    static async getSelectedOption(select: ElementFinder) {
        return select.element(By.css('option[selected]'));
    }

    static async isVisible(locator: ElementFinder) {
        return this.EC.visibilityOf(locator);
    }

    static async isNotVisible(locator: ElementFinder) {
        return this.EC.invisibilityOf(locator);
    }

    static async inDom(locator: ElementFinder) {
        return this.EC.presenceOf(locator);
    }

    static async notInDom(locator: ElementFinder) {
        return this.EC.stalenessOf(locator);
    }

    static async isClickable(locator: ElementFinder) {
        return this.EC.elementToBeClickable(locator);
    }

    static async hasText(locator: ElementFinder, text: string) {
        return this.EC.textToBePresentInElement(locator, text);
    }

    static async titleIs(title: string) {
        return this.EC.titleIs(title);
    }

    static async hasClass(locator: ElementFinder, klass: string) {
        const classes = await locator.getAttribute('class');
        return classes && classes.split(' ').indexOf(klass) !== -1;
    }

    static async hasClassRegex(locator: ElementFinder, klass: string) {
        const classAttribute = await locator.getAttribute('class');
        const pattern = new RegExp('(^|\\s)' + klass + '(\\s|$)');
        return pattern.test(classAttribute);
    }

    static async click(targetElement: ElementFinder) {
        await WaitHelper.waitForElementToBeClickable(targetElement);
        return targetElement.click();
    }

    static async clickIfPresent(targetElement: ElementFinder) {
        const isPresent = await targetElement.isPresent();
        if (isPresent) {
            return this.click(targetElement);
        }
        return;
    }

    static async clickUsingJs(targetElement: ElementFinder) {
        await WaitHelper.waitForElementToBeClickable(targetElement);
        return this.clickUsingJsNoWait(targetElement);
    }

    static async clickUsingJsNoWait(targetElement: ElementFinder) {
        return browser.executeScript('arguments[0].click();', await targetElement.getWebElement());
    }

    // static async selectDropDownByIndex(elementt: ElementFinder, optionNum: number) {
    //     if (optionNum) {
    //         const options = await elementt.findElements(by.tagName('option'));
    //         options[optionNum].click();
    //     }
    // }

    static async scrollToElement(elementt: ElementFinder) {
        await browser.executeScript('arguments[0].scrollIntoView();', elementt.getElementFinder());
    }

    static async getAttributeValue(elem: ElementFinder, attribute: string) {
        const value = await elem.getAttribute(attribute);
        return value.trim();
    }

    static async getText(elem: ElementFinder) {
        await WaitHelper.waitForElementToHaveText(elem);
        const text = await elem.getText();
        return text.trim();
    }

    static async selectDropDownByIndex(elementt: ElementFinder, optionNum: number) {
        if (optionNum) {
           // const options = await elementt.findElements(by.('option'));
            // options[optionNum].click();
            let options = element.all(by.tagName('option'))
          .then(function(options) {
            options[optionNum].click();
        });
    }}

    // static getElementByText(text: string, isContains = false) {
    //     return element(By.xpath(`//*[${ComponentHelpers.getXPathFunctionForText(text, isContains)}]`));
    // }

    static async openLinkInNewTabUsingTarget(targetElement: ElementFinder) {
        const script = 'const item = arguments[0];item.setAttribute("target", "_blank");item.click()';
        await browser.executeScript(script, await targetElement.getWebElement());
    }

    static async openLinkInNewTabUsingWindowOpener(targetElement: ElementFinder) {
        const script = 'return window.open(arguments[0].getAttribute("href"),"_blank")';
        await browser.executeScript(script, await targetElement.getWebElement());
    }

    static async scrollTopToElement(element: ElementFinder, elementToScroll: ElementFinder, timeout = null) {
        // TODO detect first parent relative scrollable and make elementToScroll optional, also replace scrollIntoView on I.wait
        return element.getWebElement()
            .then((we) =>
                elementToScroll.getWebElement()

                    .then((we2) => {
                         console.log(` vertically scrolled to test`);
                        return browser.driver.executeScript('var px = arguments[0].offsetTop; arguments[1].scrollTop = px; return arguments[1].scrollTop;', we, we2);
                    })
            ).then((res) => { console.log(` vertically scrolled to ${res}`); return <number>res; });
    }

    static async scrollIfNeeded(element, container) {
        if (element.offsetTop < container.scrollTop) {
          container.scrollTop = element.offsetTop;
        } else {
          const offsetBottom = element.offsetTop + element.offsetHeight;
          const scrollBottom = container.scrollTop + container.offsetHeight;
          if (offsetBottom > scrollBottom) {
            container.scrollTop = offsetBottom - container.offsetHeight;
          }
        }
    }}