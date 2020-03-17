import { browser, element, by, $ } from 'protractor';
import { elementClick, elementSendkeys, elementClear } from '../utils/utils';
import { WaitHelper } from '../utils/waitHelper';
import { PageHelper } from '../utils/pageHelper';
let configProperties = require('../conf/properties');
let path = require('path');


export class AssetManager {

  get assetsManagerMenu() { return element(by.css('a[data-e2e="linkAssets"]')); }
  get createNewAssets() { return element(by.css('[data-e2e="newAssetButton"]')); }
  get assetTypeDropDown() { return element(by.xpath('//*[@id="assetType"]/select')); }
  get enterAssetName() { return element(by.css('[data-e2e="inputAssetName"]')); }
  get description() { return element(by.css('[data-e2e="inputAssetDescription"]')); }
  get ownigGroupDropDown() { return element(by.css('ng-select[data-e2e="selectAssetOwningGroup"]')); }
  owningGroup(owningGroup: any) { return element(by.xpath(`//span[.='${owningGroup}']`)); }
  get attributeTagDropdown() { return element(by.css('ng-select[formcontrolname="attributeTagIds"]')); }
  attributeTag(inValue: string) { return element(by.xpath(`//span[.='${inValue}']`)); }
  get dropDownClose() { return element(by.xpath('//span[@class="dropdown-up"]')); }
  get chooseFile() { return element(by.css('input[type="file"]')); }
  get statusDropdown() { return element(by.css('select[formcontrolname="status"]')); }
  get draft() { return element(by.xpath('//option[.="Draft"]')); }
  get published() { return element(by.xpath('//option[.="Published"]')); }
  get incrementByDropDown() { return element(by.css('select[formcontrolname="versionBump"]')); }
  get minor() { return element(by.xpath('//option[.="Minor"]')); }
  get major() { return element(by.xpath('//option[.="Major"]')); }
  get nextButton() { return element(by.xpath('//button[.="Next"]')); }
  get assetList() { return element(by.css('.datatable-body')); }
  get nextToEnclaveModelEvaluation() { return element(by.xpath('//button[.="Next"]')); }
  get nextToReviewDeployment() { return element(by.xpath('//button[.="Next"]')); }
  get submitButton() { return element(by.xpath('//button[.="Submit"]')); }
  get toast() { return $('#toast-container'); }
  get deleteButton() { return element(by.css('[data-e2e="deleteAssetButton"]')); }
  get confirmDeleteButton() { return element(by.css('[data-e2e="confirmDeleteModalBtn"]')); }
  searchEnclaveModel(name: string) { return element(by.xpath(`//span[.='${name}']`)); }
  get search() { return element(by.css('[placeholder="Search"]')); }
  get list() { return element(by.css('.app-container')); }
  enclaveModelElement(name: any) { return element(by.xpath(`//datatable-body-cell[.='${name}']`)); }
  get editButton() { return element(by.css('[data-e2e="editAssetButton"]')); }
  get surfaceDropDown() { return element(by.css('[data-e2e="surfaceSwitcherDropdown"]')); }
  selectSurface(surface: string) { return element(by.xpath(`//option[contains(.,'${surface}')]`)); }

  async createEnclaveModel(surfaceName: string = null, status: any, assetName: string = null, desc: any = 'Default description', attributeTagName: string[] = null,
    fileName: string = null, owningGroup: string = null, platform: string = null) {

    await WaitHelper.waitForElementToBeHidden(this.toast);
    // Click on Assets Manager Menu Button
    await elementClick(this.assetsManagerMenu);
    await browser.logger.info('Assets Manager Menu Clicked');
    await browser.sleep(2000);

    await this.selectSurfaceFromDropDown(surfaceName);

    // Click on '+' Button to Create new policy
    await WaitHelper.waitForElementToBeDisplayed(this.assetList, 5000, 'screen displayed');
    await elementClick(this.createNewAssets);
    await browser.logger.info('Clicked on NEW ASSET');

    // Enter Enclave Model Name
    await WaitHelper.waitForElementToBePresent(this.enterAssetName, 5000, 'Enclave Model Name ');
    await elementSendkeys(this.enterAssetName, assetName);
    await browser.logger.info('Asset Name Entered: ', assetName);

    // Enter Enclave Model Description
    await WaitHelper.waitForElementToBePresent(this.description, 5000, 'Enclave Model Description ');
    await elementSendkeys(this.description, desc);
    await browser.logger.info('Description Entered: ', desc);

    // Owning Group DropDown
    await WaitHelper.waitForElementToBePresent(this.ownigGroupDropDown, 5000, 'Ownig Group DropDown');
    await elementClick(this.ownigGroupDropDown);
    await browser.logger.info('Ownig Group DropDown Selected');

    await WaitHelper.waitForElementToBePresent(this.owningGroup(owningGroup), 5000, 'Owning Group');
    await browser.actions().mouseMove(this.owningGroup(owningGroup)).perform();
    await elementClick(this.owningGroup(owningGroup));
    await browser.logger.info('Ownig Group Selected');

    for (let attributeTag of attributeTagName) {
      console.log('value', attributeTag);

      await WaitHelper.waitForElementToBeClickable(this.attributeTagDropdown, 2000, 'Attribute Tag Drop Down  ');
      await elementClick(this.attributeTagDropdown);

      // Select Role
      await WaitHelper.waitForElementToBeClickable(this.attributeTag(attributeTag), 2000, 'Attribute Tag');
      await browser.actions().mouseMove(this.attributeTag(attributeTag)).perform();
      await elementClick(this.attributeTag(attributeTag));
      await browser.logger.info('Attribute Tag Selected');
    }

    await WaitHelper.waitForElementToBeSelected(this.chooseFile, 2000, 'Choose File ');
    await console.log(`This platform is ${process.platform}`);
    await browser.sleep(2000);

    await this.fileUpload(fileName);

    // Select Status Drop Down
    await WaitHelper.waitForElementToBeClickable(this.statusDropdown, 2000, 'Status Drop Down ');
    await browser.actions().mouseMove(this.statusDropdown).perform();
    await elementClick(this.statusDropdown);
    await browser.logger.info('Status Drop DOwn Selected');

    // Select Status
    if (status === 'PUBLISHED') {
      await WaitHelper.waitForElementToBeClickable(this.published, 2000, 'Published ');
      await elementClick(this.published);
      await browser.logger.info('Selected Published');

      await WaitHelper.waitForElementToBeClickable(this.minor, 2000, 'Minor ');
      await elementClick(this.minor);
      await browser.logger.info('Selected Minor');
    }

    // click on next to Template Mapping Page
    await WaitHelper.waitForElementToBePresent(this.nextButton, 5000, 'Template Mapping ');
    await elementClick(this.nextButton);
    await browser.logger.info('Moved to Template Mapping Page');

    // click on next to Enclave Model Evaluations Page
    await WaitHelper.waitForElementToBePresent(this.nextButton, 5000, 'Enclave Model Evaluations ');
    await elementClick(this.nextButton);
    await browser.logger.info('Moved to Review Enclave Model Page');

    // Select Review Enclave Model Page
    await WaitHelper.waitForElementToBePresent(this.nextButton, 5000, 'Review Enclave Model ');
    await elementClick(this.nextButton);
    await browser.logger.info('Moved to Submit Page');

    // Click on Submit button to submit the EnClave Model
    await WaitHelper.waitForElementToBeClickable(this.submitButton, 5000, 'Submit ');
    await elementClick(this.submitButton);
    await browser.logger.info('Enclave Model Submitted');
    await browser.sleep(3000);
  }

  getRandomNum = function (min, max) {
    return parseInt(Math.random() * (max - min) + min);
  };

  async getId() {
    return await browser.getCurrentUrl().then(function (url) {
      console.log(url);
      let str = 'currentUrl';
      let entityId = [];
      entityId = url.split('/');
      return entityId[5];
    });
  }

  async fileUpload(fileName: string = null) {
    let fileToUpload = `C:/Users/intone-wv/Desktop/e2e/src/conf/${fileName}`;
    let absolutePath = path.resolve(__dirname, fileToUpload);
    await this.chooseFile.sendKeys(absolutePath);
  }

  async searchAssetManager(surfaceName: string = null, assetName: string = null, desc: string = null) {
    // await WaitHelper.waitForElementToBeHidden(this.toast);
    // Click on Assets Manager Menu Button
    await WaitHelper.waitForElementToBeDisplayed(this.assetsManagerMenu, 10000, 'Menu');
    await browser.actions().mouseMove(this.assetsManagerMenu).perform();
    await elementClick(this.assetsManagerMenu);
    await browser.logger.info('Clicked on Asset Manager Menu');

    await this.selectSurfaceFromDropDown(surfaceName);

    await elementClear(this.search, assetName);

    // Select Created Enclave Model
    await WaitHelper.waitForElementToBeDisplayed(this.assetList, 5000, 'Enclave Model List Displayed');
    await this.search.sendKeys(assetName);
  }

  async editEnclaveModel(surfaceName: string = null, assetName: string = null, desc: string = null) {
    // Search the enclaveModel
    await this.searchAssetManager(surfaceName, assetName, desc);
    await elementClick(this.searchEnclaveModel(assetName));
    await browser.logger.info(assetName, 'Selected');

    // Click Edit Icon
    await WaitHelper.waitForElementToBePresent(this.editButton, 5000, 'Edit Button ');
    await browser.actions().mouseMove(this.editButton).perform();
    await elementClick(this.editButton);
    await browser.logger.info('Edit Button Clicked');

    // Edit Enclave Model Name
    await WaitHelper.waitForElementToBePresent(this.enterAssetName, 5000, 'Enclave Model Name ');
    await elementSendkeys(this.enterAssetName, '  Updated');
    await browser.logger.info('Asset Name Entered: ', assetName + '  Updated');

    // click on next to Template Mapping Page
    await WaitHelper.waitForElementToBePresent(this.nextButton, 5000, 'Template Mapping ');
    await browser.actions().mouseDown(this.nextButton).perform();
    await elementClick(this.nextButton);
    await browser.logger.info('Moved to Template Mapping Page');

    // click on next to Enclave Model Evaluations Page
    await WaitHelper.waitForElementToBePresent(this.nextButton, 10000, 'Enclave Model Evaluations ');
    await elementClick(this.nextButton);
    await browser.logger.info('Moved to Review Enclave Model Page');

    // Select Review Enclave Model Page
    await WaitHelper.waitForElementToBePresent(this.nextButton, 10000, 'Review Enclave Model ');
    await elementClick(this.nextButton);
    await browser.logger.info('Moved to Submit Page');

    // Click on Submit button to submit the EnClave Model
    await WaitHelper.waitForElementToBeClickable(this.submitButton, 5000, 'Submit ');
    await elementClick(this.submitButton);
    await browser.logger.info('Enclave Model Updated', assetName + '  Updated');
    await WaitHelper.waitForElementToBeHidden(this.toast);
  }

  async deleteEnclaveModel(surfaceName: string = null, assetName: string = null, deleteOnly: string = null) {
    await WaitHelper.waitForElementToBeHidden(this.toast);
    // Click on Assets Manager Menu Button
    await WaitHelper.waitForElementToBeDisplayed(this.assetsManagerMenu, 5000, 'Menu');
    await browser.actions().mouseMove(this.assetsManagerMenu).perform();
    await elementClick(this.assetsManagerMenu);
    await browser.logger.info('Clicked on Asset Manager Menu');

    await this.selectSurfaceFromDropDown(surfaceName);

    await elementClear(this.search, assetName);

    // Select Created Enclave Model
    await WaitHelper.waitForElementToBeDisplayed(this.assetList, 5000, 'Enclave Model List Displayed');
    if (!deleteOnly)
      assetName = assetName + '  Updated';
    await this.search.sendKeys(assetName);
    await elementClick(this.searchEnclaveModel(assetName));
    await browser.logger.info(assetName, 'Selected');

    // Click On Delete Button in EnclaveModel Detail Page
    await WaitHelper.waitForElementToBeDisplayed(this.deleteButton, 5000, 'Delete Button');
    await browser.actions().mouseMove(this.deleteButton).perform();
    await elementClick(this.deleteButton);
    await browser.logger.info(assetName, 'Clicked Delete Button');

    // Click On Confirm Delete To Delete Enclave Model
    await WaitHelper.waitForElementToBeDisplayed(this.confirmDeleteButton, 5000, 'Confirm Delete Button');
    await browser.actions().mouseMove(this.confirmDeleteButton).perform();
    await elementClick(this.confirmDeleteButton);
    await browser.logger.info(assetName, 'Deleted');
    await WaitHelper.waitForElementToBeHidden(this.toast);
  }

  async updateEnclaveModel(surfaceName: string = null, assetName: string = null, attributeTagName: string = null) {

    await WaitHelper.waitForElementToBeHidden(this.toast);
    // Click on Assets Manager Menu Button
    await elementClick(this.assetsManagerMenu);
    await browser.logger.info('Clicked on Asset Manager Menu');
    // Search the enclaveModel
    await this.searchAssetManager(surfaceName, assetName);
    await elementClick(this.searchEnclaveModel(assetName));
    await browser.logger.info(assetName, 'Selected');

    // Click Edit Icon
    await WaitHelper.waitForElementToBePresent(this.editButton, 5000, 'Edit Button ');
    await browser.actions().mouseMove(this.editButton).perform();
    await elementClick(this.editButton);
    await browser.logger.info('Edit Button Clicked');
    await WaitHelper.waitForElementToBeClickable(this.attributeTagDropdown, 2000, 'Attribute Tag Drop Down  ');
    await elementClick(this.attributeTagDropdown);

    // Select Role
    await WaitHelper.waitForElementToBeClickable(this.attributeTag(attributeTagName), 2000, 'Attribute Tag');
    await browser.actions().mouseDown(this.attributeTag(attributeTagName)).perform();
    await elementClick(this.attributeTag(attributeTagName));
    await browser.logger.info('Attribute Tag Selected');

    // click on next to Template Mapping Page
    await WaitHelper.waitForElementToBePresent(this.nextButton, 5000, 'Template Mapping ');
    await browser.actions().mouseDown(this.nextButton).perform();
    await elementClick(this.nextButton);
    await browser.logger.info('Moved to Template Mapping Page');

    // click on next to Enclave Model Evaluations Page
    await WaitHelper.waitForElementToBePresent(this.nextButton, 10000, 'Enclave Model Evaluations ');
    await elementClick(this.nextButton);
    await browser.logger.info('Moved to Review Enclave Model Page');

    // Select Review Enclave Model Page
    await WaitHelper.waitForElementToBePresent(this.nextButton, 10000, 'Review Enclave Model ');
    await elementClick(this.nextButton);
    await browser.logger.info('Moved to Submit Page');

    // Click on Submit button to submit the EnClave Model
    await WaitHelper.waitForElementToBeClickable(this.submitButton, 5000, 'Submit ');
    await elementClick(this.submitButton);
    await browser.logger.info('Enclave Model Updated', assetName);
    await WaitHelper.waitForElementToBeHidden(this.toast);
  }

  async verifyEnclaveModel(assetName: any) {
    await WaitHelper.waitForElementToBeHidden(this.toast);
    await WaitHelper.waitForElementToBeDisplayed(this.assetList, 5000, 'Enclave Model List Displayed');
    await this.search.sendKeys(assetName + '  Updated');
    await browser.logger.info(assetName + '  Updated', ' Is Not Present');
  }

  async selectSurfaceFromDropDown(surfaceName: string = null) {
    await WaitHelper.waitForElementToBePresent(this.surfaceDropDown, 5000, 'Surface Drop Down ');
    await elementClick(this.surfaceDropDown);
    await browser.logger.info(surfaceName, 'Surface Drop Down Clicked');

    await WaitHelper.waitForElementToBePresent(this.selectSurface(surfaceName), 5000, 'Surface');
    await elementClick(this.selectSurface(surfaceName));
    await browser.logger.info('Surface Selcted');
  }

  async getPageTitle() {
    return browser.getTitle();
  }
}
