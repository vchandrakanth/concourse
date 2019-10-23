import { browser, element, by, $ } from 'protractor';
import { elementClick, elementSendkeys, elementClear } from '../utils/utils';
import { WaitHelper } from '../utils/waitHelper';
let configProperties = require('../conf/properties');

export class Surface {

    get toast() { return $('#toast-container'); }
    get surfaceMenu() { return element(by.xpath('//a[contains(.,"Surface")]')); }
    get newSurface() { return element(by.xpath('//button[contains(text(),"New Surface")]')); }
    get enterSurfaceName() { return element(by.css('#name')); }
    get eneterSutfaceDescription() { return element(by.css('#description')); }
    get groupDropDown() { return element(by.xpath('//div[@class="ng-value-container"]')); }
    selectGroup(group: any) { return element(by.xpath(`//span[.='${group}']`)); }
    get createButton() { return element(by.css('.Create')); }
    get editSurfaceButton() { return element(by.css('button[title="Edit Surface"]')); }
    get saveButton() { return element(by.css('.Save')); }
    get associateGroupButton() { return element(by.xpath('//button[contains(text(),"Associate Groups")]')); }
    get associateGroupDropDown() { return element(by.xpath('//span[@class="ng-arrow-wrapper"]')); }
    get surfacelist() { return element(by.css('.card-body')); }
    get deleteButton() { return element(by.css('.btn-danger')); }
    get confirmDeleteButton() { return element(by.css('.delete')); }
    selectsurface(name: string) { return element(by.xpath(`//option[contains(.,'${name}')]`)); }
    // get surfaceDropDown() { return element(by.css('.form-control')); }
    get blankClick() { return element(by.css('form')); }
    get surfaceDropDown() { return element(by.css('select')); }
    selectSurface(topology: string) { return element(by.xpath(`//option[contains(.,'${topology}')]`)); }

    async createNewSurface(name: string = null, description: string = null, group: string = null) {

        await WaitHelper.waitForElementToBeHidden(this.toast);
        await browser.get(configProperties.qaUrl + '/surfaces');
        await WaitHelper.waitForElementToBeDisplayed(this.surfacelist, 3000, 'list displayed');
        await browser.logger.info('Surface Page Displayed');

        await WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Surface Drop Down');
        await browser.actions().mouseDown(this.surfaceDropDown).perform();
        await elementClick(this.surfaceDropDown);
        await browser.logger.info('Surface Drop Down Selected');

        await WaitHelper.waitForElementToBeClickable(this.selectSurface(configProperties.SurfaceData.surfaceName), 2000, 'E2E Topology ');
        await elementClick(this.selectSurface(configProperties.SurfaceData.surfaceName));
        await browser.logger.info('Selected E2E Topology');

        // Click on '+' Button to Create new Surface
        await elementClick(this.newSurface);
        await browser.logger.info('Clicked + Button');

        // Enter Surface Name
        await WaitHelper.waitForElementToBePresent(this.enterSurfaceName, 5000, 'Surface Name');
        await elementSendkeys(this.enterSurfaceName, name);
        await browser.logger.info('Entered Surface Name', name);

        // Enter Surface Description
        await WaitHelper.waitForElementToBePresent(this.eneterSutfaceDescription, 5000, 'Description ');
        await elementSendkeys(this.eneterSutfaceDescription, description);
        await browser.logger.info('Description Entered', description);

        // Select Group Drop Down
        await WaitHelper.waitForElementToBeClickable(this.groupDropDown, 2000, 'Group Drop Down ');
        await elementClick(this.groupDropDown);
        await browser.logger.info('Selected Group DropDown');

        // Select Group
        await await WaitHelper.waitForElement(this.selectGroup(group), 2000, 'Group ');
        await elementClick(this.selectGroup(group));
        await browser.logger.info('Selected Group');

        // Close Group Drop Down
        await elementClick(this.blankClick);
        await browser.logger.info('Close Group DropDown');

        // Click On Create
        await WaitHelper.waitForElementToBeClickable(this.createButton, 2000, 'Create ');
        await elementClick(this.createButton);
        await browser.logger.info('Surface Created: ', name);

    }
    getRandomNum = function (min, max) {
        return parseInt(Math.random() * (max - min) + min);
    };

    async editSurface(name: string = null, description: string = null) {

        await WaitHelper.waitForElementToBeHidden(this.toast);
        await browser.get(configProperties.qaUrl + '/surfaces');
        await WaitHelper.waitForElementToBeDisplayed(this.surfacelist, 3000, 'list displayed');
        await browser.logger.info('Surface Page Displayed');

        // Click On Surface Drop Down
        await WaitHelper.waitForElementToBePresent(this.surfaceDropDown, 5000, 'Surface Drop Down ');
        await elementClick(this.surfaceDropDown);
        await browser.logger.info('Surface Drop Down Clicked');

        // Select Created Surface
        await WaitHelper.waitForElementToBePresent(this.selectsurface(name), 5000, 'Surface');
        await elementClick(this.selectsurface(name));
        await browser.logger.info('Surface Selcted');

        await browser.sleep(5000);

        // Click on Edit Icon
        await WaitHelper.waitForElementToBePresent(this.editSurfaceButton, 5000, 'Suface Edit ');
        await elementClick(this.editSurfaceButton);
        await browser.logger.info('Edit Button Clicked');

        await browser.sleep(3000);

        // Edit Surface Name
        await WaitHelper.waitForElementToBePresent(this.enterSurfaceName, 5000, 'Suface Name ');
        await elementSendkeys(this.enterSurfaceName, ' Updated');
        await browser.logger.info('Suface Name Updated');

        // Click On Save
        await WaitHelper.waitForElementToBeClickable(this.saveButton, 2000, 'Save ');
        await elementClick(this.saveButton);
        await browser.logger.info('Surface Updated', name + ' Updated');
    }

    async addAnotherGroupToSurface(name: string = null, group: string = null) {

        await WaitHelper.waitForElementToBeHidden(this.toast);
        await browser.get(configProperties.qaUrl + '/surfaces');
        await WaitHelper.waitForElementToBeDisplayed(this.surfacelist, 3000, 'list displayed');
        await browser.logger.info('Surface Page Displayed');

        // Click On Surface Drop Down
        await WaitHelper.waitForElementToBeClickable(this.surfaceDropDown, 5000, 'Surface Drop Down ');
        await elementClick(this.surfaceDropDown);
        await browser.logger.info('Surface Drop Down Clicked');

        // Select Updated Surface
        await WaitHelper.waitForElementToBeClickable(this.selectsurface(name), 5000, 'Surface');
        await browser.actions().mouseMove(this.selectsurface(name)).perform();
        await elementClick(this.selectsurface(name));
        await browser.logger.info('Surface Selcted');
        await browser.sleep(5000);

        // Click On Associate Group
        await WaitHelper.waitForElementToBePresent(this.associateGroupButton, 5000, 'Associate Group ');
        await elementClick(this.associateGroupButton);
        await browser.logger.info('Associate Group');

        // Click On Group Drop Down
        await WaitHelper.waitForElementToBePresent(this.groupDropDown, 5000, 'Group Drop Down');
        await elementClick(this.groupDropDown);
        await browser.logger.info('Group Drop Down Selected');

        // Select Group
        await WaitHelper.waitForElementToBePresent(this.selectGroup(group), 5000, 'Group ');
        await elementClick(this.selectGroup(group));
        await browser.logger.info('Group Selected');

        // Close Group Drop Down
        await elementClick(this.associateGroupDropDown);
        await browser.logger.info('Close Group DropDown');

        // Click On Save Button
        await WaitHelper.waitForElementToBeClickable(this.saveButton, 5000, 'Save ');
        await elementClick(this.saveButton);
        await browser.logger.info('Another Group Added To The Surface');
    }

    async deleteSurface(name: string = null) {

        await WaitHelper.waitForElementToBeHidden(this.toast);
        await browser.get(configProperties.qaUrl + '/surfaces');
        await WaitHelper.waitForElementToBeDisplayed(this.surfacelist, 3000, 'list displayed');
        await browser.logger.info('Surface Page Displayed');

        // Select Surface Drop Down
        await WaitHelper.waitForElementToBePresent(this.surfaceDropDown, 5000, 'Surface Drop Down ');
        await elementClick(this.surfaceDropDown);
        await browser.logger.info('Surface Drop Down Clicked');

        // Select Surface
        await WaitHelper.waitForElementToBePresent(this.selectsurface(name), 5000, 'Surface');
        await elementClick(this.selectsurface(name));
        await browser.logger.info('Surface Selcted');
        await browser.sleep(5000);

        // Click On Delete Button
        await WaitHelper.waitForElementToBePresent(this.deleteButton, 5000, 'Delete');
        await browser.actions().mouseMove(this.deleteButton).perform();
        await elementClick(this.deleteButton);
        await browser.logger.info('Delete Button Clicked');

        // Click On Confirm Delete Button
        await WaitHelper.waitForElementToBePresent(this.confirmDeleteButton, 5000, 'Confirm Delete');
        await browser.actions().mouseMove(this.confirmDeleteButton).perform();
        await elementClick(this.confirmDeleteButton);
        await browser.logger.info(name, 'Deleted');

    }

    async verifySurface(name: string = null) {

        await WaitHelper.waitForElementToBeHidden(this.toast);
        await browser.get(configProperties.qaUrl + '/surfaces');
        await WaitHelper.waitForElementToBeDisplayed(this.surfacelist, 3000, 'list displayed');
        await browser.logger.info('Surface Page Displayed');

        // Click On Surface Drop Down
        await WaitHelper.waitForElementToBePresent(this.surfaceDropDown, 5000, 'Surface Drop Down ');
        await elementClick(this.surfaceDropDown);
        await browser.logger.info('Surface Drop Down Clicked');
        await browser.logger.info(name, 'Is Not Available');

    }

    async getPageTitle() {
        return browser.getTitle();
    }
}