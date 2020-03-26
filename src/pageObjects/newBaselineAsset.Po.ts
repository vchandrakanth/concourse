import { browser, element, by, $, $$ } from 'protractor';
import { elementClick, elementSendkeys, elementClear } from '../utils/utils';
import { WaitHelper } from '../utils/waitHelper';
let configProperties = require('../conf/properties');

export class BaseLineAsset {
  get baseLineAssetsLink() { return element(by.css('a[data-e2e="linkBaselineAssets"]')); }
  get createNewBaseLine() { return element(by.css('[data-e2e="newAssetButton"]')); }
  get enterBaseLineName() { return element(by.css('[data-e2e="name"]')); }
  get enterBaseLineDescription() { return element(by.css('[data-e2e="description"]')); }
  get filterStrategyAnd() { return element(by.xpath('//label[.="And"]')); }
  get filterStrategyOr() { return element(by.xpath('//label[.="Or"]')); }
  get draftStatus() { return element(by.css('[for="draft"]')); }
  get publishedStatus() { return element(by.css('[for="published"]')); }
  get minor() { return element(by.css('[for="minor"]')); }
  get major() { return element(by.css('[for="major"]')); }
  get ownigGroupDropDown() { return element(by.css('[placeholder="Select Owning Group"]')); }
  selectOwningGroup(owningGroup: String) { return element(by.css(`//span[.='${owningGroup}']`)); }
  get attributeTagDropdown() { return element(by.css('[data-e2e="inputAssetAttributeTags"]')); }
  attributeTag(inValue: string) { return element(by.xpath(`//span[.='${inValue}']`)); }
  get createButton() { return element(by.css('//button[contains(.,"Create")]')); }
  get editBaseLineButton() { return element(by.css('[data-e2e="editAssetButton"]')); }
  get deleteBaseLineButton() { return element(by.css('[data-e2e="deleteAssetButton"]')); }
  get confirmDeleteButton() { return element(by.css('[data-e2e="confirmDeleteModalBtn"]')); }
  get toast() { return $('#toast-container'); }
  get list() { return element(by.xpath('//div[@class="list"]')); }
  get search() { return element(by.css('[placeholder="Search"]')); }
  get surfaceDropDown() { return element(by.css('[data-e2e="surfaceSwitcherDropdown"]')); }
  selectSurface(Surface: string) { return element(by.xpath(`//option[contains(.,'${Surface}')]`)); }
  searchBaseLineAsset(Asset: string) { return element(by.css(`[data-e2e='${Asset}']`)); }
  get publishButton() { return element(by.xpath('//span[.="Publish Version"]')); }
  get overViewTab() { return element(by.xpath('//a[contains(.,"Overview")]')); }
  get azureTab() { return element(by.xpath('//a[contains(.,"Azure")]')); }
  get awsTab() { return element(by.xpath('//a[contains(.,"AWS")]')); }
  get azureResourcesTab() { return element(by.xpath('//a[contains(.,"Resources")]')); }
  get azureStatsTab() { return element(by.xpath('//a[contains(.,"Stats")]')); }
  get azureContentTab() { return element(by.xpath('//a[contains(.,"Content")]')); }
  get awsResourcesTab() { return element(by.xpath('//a[.="Resources"]')); }

  async createBaseLine(surfaceName: string = null, name: string = null, description: any = null,
    status: any, owningGroup: string = null, attributeTagName: string[] = null) {

    await WaitHelper.waitForElementToBeHidden(this.toast);
    await elementClick(this.baseLineAssetsLink);
    await browser.logger.info('BaseLine Assets Menu Clicked');
    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'List displayed');

    await this.selectSurfaceFromDropDown(surfaceName);
    await browser.logger.info('Selected E2E Surface');

    // Click on '+' Button to Create BaseLine Asset
    await elementClick(this.createNewBaseLine);
    await browser.logger.info('Clicked New BaseLine Asset Button');

    // Enter Base line Name
    await WaitHelper.waitForElementToBeClickable(this.enterBaseLineName, 2000, 'Base Line name ');
    await elementSendkeys(this.enterBaseLineName, name);
    await browser.logger.info('Base Line Name Entered');

    // Enter Base line Description
    await WaitHelper.waitForElementToBeClickable(this.enterBaseLineDescription, 2000, 'Description ');
    await elementSendkeys(this.enterBaseLineDescription, description);
    await browser.logger.info('Base line Description Entered');

    // Owning Group DropDown
    await WaitHelper.waitForElementToBePresent(this.ownigGroupDropDown, 5000, 'Ownig Group DropDown');
    await elementClick(this.ownigGroupDropDown);
    await browser.logger.info('Ownig Group DropDown Selected');

    await WaitHelper.waitForElementToBePresent(this.selectOwningGroup(owningGroup), 5000, 'Owning Group');
    await browser.actions().mouseMove(this.selectOwningGroup(owningGroup)).perform();
    await elementClick(this.selectOwningGroup(owningGroup));
    await browser.logger.info('Ownig Group Selected');

    for (let attributeTag of attributeTagName) {
      console.log('value', attributeTag);

      await WaitHelper.waitForElementToBeClickable(this.attributeTagDropdown, 2000, 'Attribute Tag Drop Down  ');
      await elementClick(this.attributeTagDropdown);

      // Select Attribute Tag
      await WaitHelper.waitForElementToBeClickable(this.attributeTag(attributeTag), 2000, 'Attribute Tag');
      await browser.actions().mouseMove(this.attributeTag(attributeTag)).perform();
      await elementClick(this.attributeTag(attributeTag));
      await browser.logger.info('Attribute Tag Selected');
    }
    await WaitHelper.waitForElementToBeClickable(this.createButton, 5000, 'Create');
    await elementClick(this.createButton);
    await browser.logger.info('Base Line Asset Submitted');
    await browser.sleep(2000);
  }

  getRandomNum = function (min, max) {
    return parseInt(Math.random() * (max - min) + min);
  };

  async searchBaseLine(surfaceName: string = null, name: string = null) {

    await WaitHelper.waitForElementToBeHidden(this.toast);
    await WaitHelper.waitForElementToBeDisplayed(this.baseLineAssetsLink, 5000, 'Menu');
    await elementClick(this.baseLineAssetsLink);
    await browser.logger.info('Base Line Menu Clicked');

    await this.selectSurfaceFromDropDown(surfaceName);
    await browser.logger.info('Selected E2E Surface');

    await elementClear(this.search, name);

    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'list');
    await this.search.sendKeys(name);
    await elementClick(this.searchBaseLineAsset(name));
    await browser.logger.info(name, 'Selected');
  }

  async editBaseLineAsset(surfaceName: string = null, name: string = null, description: any) {
    // Search BaseLine
    await this.searchBaseLine(surfaceName, name);

    // Click Edit Icon
    await WaitHelper.waitForElementToBePresent(this.editBaseLineButton, 5000, 'Edit Button ');
    await elementClick(this.editBaseLineButton);
    await browser.logger.info('Edit Button Clicked');

    // Edit Cloud Role Name
    await WaitHelper.waitForElementToBePresent(this.enterBaseLineName, 5000, 'Name ');
    await elementSendkeys(this.enterBaseLineName, ' Updated');
    await browser.logger.info('Base Line Name: ', name + ' Updated');

    // Edit Base Line Description
    await WaitHelper.waitForElementToBePresent(this.enterBaseLineDescription, 5000, 'Base Line Description ');
    await elementSendkeys(this.enterBaseLineDescription, ' Updated');
    await browser.logger.info('Base Line Description Entered: ', description + ' Updated');

    await WaitHelper.waitForElementToBeClickable(this.publishedStatus, 2000, 'Published ');
    await elementClick(this.publishedStatus);
    await browser.logger.info('Selected Published');

    await WaitHelper.waitForElementToBeClickable(this.minor, 2000, 'Minor ');
    await elementClick(this.minor);
    await browser.logger.info('Selected Minor');

    // Publish Base Line
    await WaitHelper.waitForElementToBeClickable(this.publishButton, 5000, 'Submit ');
    await elementClick(this.publishButton);
    await browser.logger.info('Base Line Updated');
    await console.log('Base Line Is', name + ' Updated');
  }

  async deleteBaseLine(surfaceName: string = null, name: string = null, deleteOnly: string = null) {

    await WaitHelper.waitForElementToBeHidden(this.toast);
    await elementClick(this.baseLineAssetsLink);
    await browser.logger.info('Base Line Menu Clicked');

    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'List displayed');
    await this.selectSurfaceFromDropDown(surfaceName);

    await elementClear(this.search, name);

    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'Base Line List Displayed');
    if (!deleteOnly)
      name = name + ' Updated';
    await this.search.sendKeys(name);
    await browser.sleep(2000);
    await elementClick(this.searchBaseLineAsset(name));
    await browser.logger.info(name, 'Selected');

    await WaitHelper.waitForElementToBeClickable(this.deleteBaseLineButton, 2000, 'Delete');
    await browser.actions().mouseMove(this.deleteBaseLineButton).perform();
    await elementClick(this.deleteBaseLineButton);
    await browser.logger.info('Clicked Delete Button');

    await WaitHelper.waitForElementToBeClickable(this.confirmDeleteButton, 2000, 'Confirm Delete');
    await browser.actions().mouseMove(this.confirmDeleteButton).perform();
    await elementClick(this.confirmDeleteButton);
    await browser.logger.info(name, 'Is deleted');
  }

  async verifyBaseLine(surfaceName: string = null, name: string = null) {
    await WaitHelper.waitForElementToBeHidden(this.toast);
    await elementClick(this.baseLineAssetsLink);
    await browser.logger.info('Base Line Menu Clicked');
    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'List displayed');

    await this.selectSurfaceFromDropDown(surfaceName);
    await browser.logger.info('Selected E2E Surface');

    await elementClear(this.search, name);

    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'list');
    await this.search.sendKeys(name);
  }

  async selectSurfaceFromDropDown(surfaceName: string = null) {
    await WaitHelper.waitForElementToBePresent(this.surfaceDropDown, 5000, 'Surface Drop Down ');
    await elementClick(this.surfaceDropDown);
    await browser.logger.info(surfaceName, 'Surface Drop Down Clicked');

    await WaitHelper.waitForElementToBePresent(this.selectSurface(surfaceName), 5000, 'Surface');
    await elementClick(this.selectSurface(surfaceName));
    await browser.logger.info('Surface Selcted');
    await browser.sleep(2000);
  }

  async getId() {
    return await browser.getCurrentUrl().then(function (url) {
      console.log(url);
      let str = 'currentUrl';
      let entityId = [];
      entityId = url.split('/');
      return entityId[4];
    });
  }

  async getPageTitle() {
    return browser.getTitle();
  }
}
