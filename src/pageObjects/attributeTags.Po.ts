import { browser, element, by, $ } from 'protractor';
import { elementClick, elementSendkeys, elementClear } from '../utils/utils';
import { WaitHelper } from '../utils/waitHelper';
let configProperties = require('../conf/properties');

export class AttributeTag {
  get attributeTagsLink() { return element(by.css('[data-e2e="linkAttributeTags"]')); }
  // get createNewAttributeTag() { return element(by.xpath('//button[contains(text(),"New Attribute")]')); }
  get createNewAttributeTag() { return element(by.css('[data-e2e="newAttributeTagButton"]')); }
  // get enterTagName() { return element(by.xpath('//input[@id="name"]')); }
  get enterTagName() { return element(by.css('[data-e2e="inputAttributeTagName"]')); }
  // get enterTagDescription() { return element(by.xpath('//textarea[@id="description"]')); }
  get enterTagDescription() { return element(by.css('[data-e2e="inputAttributeTagDescription"]')); }
  // get saveButton() { return element(by.xpath('//button[contains(text(),"Save")]')); }
  get saveButton() { return element(by.css('[data-e2e="attributeTagSaveButton"]')); }
  // get editButton() { return element(by.css('button[title="Edit Attribute Tag"]')); }
  get editButton() { return element(by.css('[data-e2e="editAttributeTagButton"]')); }
  get toast() { return $('#toast-container'); }
  get list() { return element(by.xpath('//div[@class="list"]')); }
  // get deleteButton() { return element(by.css('.btn-danger')); }
  get deleteButton() { return element(by.css('[data-e2e="deleteAttributeTagButton"]')); }
  // get confirmDeleteButton() { return element(by.css('.delete')); }
  get confirmDeleteButton() { return element(by.css('[data-e2e="confirmDeleteModalBtn"]')); }
  // searchAttribute(attributeName: string) { return element(by.xpath(`//h5[.='${attributeName}']`)); }
  searchAttributeName(attributeName: string) { return element(by.css(`[data-e2e='${attributeName}']`)); }
  get search() { return element(by.css('[placeholder="Search"]')); }
  // get surfaceDropDown() { return element(by.css('select')); }
  get surfaceDropDown() { return element(by.css('[data-e2e="surfaceSwitcherDropdown"]')); }
  selectSurface(surface: string) { return element(by.xpath(`//option[contains(.,'${surface}')]`)); }

  async createAttributeTag(surfaceName: string = null, name: string = null, description: any) {
    await WaitHelper.waitForElementToBeHidden(this.toast);
    // await browser.get(configProperties.qaUrl + '/attribute-tags');
    // await browser.actions().mouseDown(this.attributeTagsLink).perform();
    await elementClick(this.attributeTagsLink);

    await browser.logger.info('AttributeTags Menu Clicked');
    // await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'List displayed');
    // await WaitHelper.waitAny(5000, this.list);

    await this.selectSurfaceFromDropDown(surfaceName);
    await browser.logger.info('Selected E2E Surface');

    // Click on '+' Button to Create new Tag
    await elementClick(this.createNewAttributeTag);
    await browser.logger.info('Clicked New Attribute Tag Button');

    // Enter Tag Name
    await WaitHelper.waitForElementToBeClickable(this.enterTagName, 2000, 'attribute tag name ');
    await elementSendkeys(this.enterTagName, name);
    await browser.logger.info('Attribute Tag Name Entered');

    // Enter Tag Description
    await WaitHelper.waitForElementToBeClickable(this.enterTagDescription, 2000, 'Description ');
    await elementSendkeys(this.enterTagDescription, description);
    await browser.logger.info('Attribute Tag Description Entered');

    // Save Attribute Tag
    await WaitHelper.waitForElementToBeClickable(this.saveButton, 5000, 'Save ');
    await elementClick(this.saveButton);
    await browser.sleep(3000);
    await browser.logger.info('Attribute Tag Created');
    await console.log('Attribute Tag Is', name);
  }

  getRandomNum = function (min, max) {
    return parseInt(Math.random() * (max - min) + min);
  };

  async searchAttribute(surfaceName: string = null, name: string = null, description: any = null) {

    await WaitHelper.waitForElementToBeHidden(this.toast);

    // await browser.get(configProperties.qaUrl + '/attribute-tags');
    await browser.actions().mouseMove(this.attributeTagsLink).perform();
    await elementClick(this.attributeTagsLink);
    await browser.logger.info('AttributeTags Menu Clicked');

    await this.selectSurfaceFromDropDown(surfaceName);

    // Select Created Attribute Tag
    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'AttributeTag List Displayed');
    await this.search.sendKeys(name);
    await elementClick(this.searchAttributeName(name));
    await browser.logger.info(name, 'Selected');
  }

  async editAttributeTag(surfaceName: string = null, name: string = null, description: any) {

    // Search arrtribute.
    await this.searchAttribute(surfaceName, name, description);

    // Click Edit Icon
    await WaitHelper.waitForElementToBePresent(this.editButton, 5000, 'Edit Button ');
    await elementClick(this.editButton);
    await browser.logger.info('Edit Button Clicked');

    // Edit Attribute Tag Name
    await WaitHelper.waitForElementToBePresent(this.enterTagName, 5000, 'AttributeTag Name ');
    await browser.sleep(2000);
    await elementSendkeys(this.enterTagName, ' Updated');
    await browser.logger.info('Asset Name Entered: ', name + ' Updated');

    // Edit Attribute Tag Description
    await WaitHelper.waitForElementToBePresent(this.enterTagDescription, 5000, 'AttributeTag Description ');
    await browser.sleep(2000);
    await elementSendkeys(this.enterTagDescription, ' Updated');
    await browser.logger.info('Asset Description Entered: ', description + ' Updated');

    // Save Attribute Tag
    await WaitHelper.waitForElementToBeClickable(this.saveButton, 5000, 'Save ');
    await elementClick(this.saveButton);
    await browser.logger.info('Attribute Tag Updated');
    await console.log('Attribute Tag Is', name + ' Updated');
  }

  async getId() {
    return browser.getCurrentUrl().then(function (url) {
      console.log(url);
      let str = 'currentUrl';
      let entityId = [];
      entityId = url.split('/');
      return entityId[4];
    });
  }

  async deleteAttributeTag(surfaceName: string = null, name: string = null, deleteOnly: string = null) {
    // wait till the toast element flash is hidden.
    await WaitHelper.waitForElementToBeHidden(this.toast);
    // await browser.get(configProperties.qaUrl + '/attribute-tags');
    await elementClick(this.attributeTagsLink);
    await browser.logger.info('AttributeTags Menu Clicked');

    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'List displayed');
    await this.selectSurfaceFromDropDown(surfaceName);

    await elementClear(this.search, name);

    // Select Created Attribute Tag/attr
    await WaitHelper.waitForElementToBeDisplayed(this.list, 5000, 'AttributeTag List Displayed');
    if (!deleteOnly)
      name = name + ' Updated';
    await this.search.sendKeys(name);
    await elementClick(this.searchAttributeName(name));
    await browser.logger.info(name, 'Selected');

    await WaitHelper.waitForElementToBeClickable(this.deleteButton, 2000, 'Delete');
    await browser.actions().mouseMove(this.deleteButton).perform();
    await elementClick(this.deleteButton);
    await browser.logger.info('Clicked Delete Button');

    await WaitHelper.waitForElementToBeClickable(this.confirmDeleteButton, 2000, 'Confirm Delete');
    await browser.actions().mouseMove(this.confirmDeleteButton).perform();
    await elementClick(this.confirmDeleteButton);
    await browser.logger.info(name, 'Is deleted');
  }

  async verifyAttributeTag(name: any) {
    await WaitHelper.waitForElementToBeHidden(this.toast);
    await elementClear(this.search, name);
    await this.search.sendKeys(name + ' Updated');
    await browser.logger.info('Searched For ', name + ' Updated');
    await browser.logger.info(name + ' Updated', ' Is Not Present');
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

  async getPageTitle() {
    return browser.getTitle();
  }
}
