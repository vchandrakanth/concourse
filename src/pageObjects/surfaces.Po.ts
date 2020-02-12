import { browser, element, by, $ } from 'protractor';
import { elementClick, elementSendkeys, elementClear } from '../utils/utils';
import { WaitHelper } from '../utils/waitHelper';
let configProperties = require('../conf/properties');

export class Surface {

    get toast() { return $('#toast-container'); }
    get surfaceMenu() { return element(by.css('a[data-e2e="linkSurfaces"]')); }
    get newSurface() { return element(by.css('[data-e2e="newSurface"]')); }
    get enterSurfaceName() { return element(by.css('[data-e2e="name"]')); }
    get eneterSutfaceDescription() { return element(by.css('#description')); }
    get groupDropDown() { return element(by.xpath('//div[@class="ng-value-container"]')); }
    get enterGroupName() { return element(by.css('input[role="combobox"]')); }
    // selectGroup(group: any) { return element(by.xpath(`//span[.='${group}']`)); }
    selectGroup(group: any) { return element(by.xpath(`//*/div[@role="option"]//span[contains(text(),'${group}')]`)); }
    get createNewGroupChekBox() { return element(by.xpath('//span[.="Create a new group for this Surface"]')); }
    get createButton() { return element(by.css('.Create')); }
    get editSurfaceButton() { return element(by.css('button[data-e2e="editSurface"]')); }
    get saveButton() { return element(by.css('.Save')); }
    get editAllowedGroupsButton() { return element(by.css('[data-e2e="addGroupsToSurface"]')); }
    get associateGroupDropDown() { return element(by.css('[data-e2e="assignGroupsSelect"]')); }
    get surfacelist() { return element(by.css('.control-topology')); }
    get deleteButton() { return element(by.css('[data-e2e="deleteSurface"]')); }
    // get deleteButton() { return element(by.css('.btn-danger')); }
    get confirmDeleteButton() { return element(by.xpath('//button[@data-e2e="confirmDeleteModalBtn"][contains(text(),"Delete")]')); }
    // get confirmDeleteButton() { return element(by.css('[data-e2e="confirmDeleteModalBtn"]')); }
    selectsurface(name: string) { return element(by.xpath(`//option[contains(.,'${name}')]`)); }
    get blankClick() { return element(by.css('form')); }
    get surfaceDropDown() { return element(by.css('[data-e2e="surfaceSwitcherDropdown"]')); }
    selectSurface(surface: string) { return element(by.xpath(`//option[contains(.,'${surface}')]`)); }
    get manageSurfaceData() { return element(by.css('button[title="Manage Surface Data"]')); }
    get addDataButton() { return element(by.css('button[title="Manage Surface Layer Data"]')); }
    get surfaceDataDropDown() { return element(by.css('ng-select[name="selectInstData"] > div > span')); }
    selectDataAccount(account: string) { return element(by.xpath(`//span[.='${account}']`)); }
    enterKey(value: any) { return element(by.css(`div[ng-reflect-name='${value}'] [placeholder='Key']`)); }
    enterValue(value: any) { return element(by.css(`div[ng-reflect-name='${value}'] [placeholder='Value']`)); }
    get createDataButton() { return element(by.css('button.ml-auto')); }
    editAccountData(value: any) { return element(by.css(`ul.list-group > li:nth-of-type(${value}) [title='Edit Data']`)); }
    deleteAccountData(value: any) { return element(by.css(`ul.list-group > li:nth-of-type(${value}) .btn-danger`)); }
    get addDataValueButton() { return element(by.css('.fa-plus-circle')); }
    removeDataValueButton(value: any) { return element(by.css(`div[ng-reflect-name='${value}'] .btn-danger`)); }
    get updateData() { return element(by.css('button.ml-auto')); }
    get closeManageSurfaceWindow() { return element(by.css('.close')); }
    get selectSurfaceLayer() { return element(by.css('.name')); }
    get surfaceLayerManageData() { return element(by.css('button[title="Manage Surface Layer Data"]')); }
    get addDataForSurfaceLayer() { return element(by.xpath('//button[contains(.,"Add Data")]')); }
    editDataForSurfaceLayer(value: any) { return element(by.xpath(`//ul[@class='list-group ng-star-inserted']/li[${value}]//button[@class='btn btn-primary ng-star-inserted']`)); }
    deleteDataForSurfaceLayer(value: any) { return element(by.xpath(`//ul[@class='list-group ng-star-inserted']/li[${value}]//button[@class='btn btn-primary btn-danger ng-star-inserted']`)); }

    async createNewSurface(surface: string = null, name: string = null, description: string = null, group: string = null) {
        await WaitHelper.waitForElementToBeHidden(this.toast);
        await elementClick(this.surfaceMenu);
        await WaitHelper.waitForElementToBeDisplayed(this.surfacelist, 3000, 'list displayed');
        await browser.logger.info('Surface Page Displayed');

        await this.selectSurfaceFromDropDown(surface);

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

        await WaitHelper.waitForElementToBePresent(this.enterGroupName, 5000, 'Group Name');
        await elementSendkeys(this.enterGroupName, group);
        await browser.logger.info('Description Entered', group);

        // Select Group
        await WaitHelper.waitForElement(this.selectGroup(group), 5000, 'Group ');
        await elementClick(this.selectGroup(group));
        await browser.logger.info('Selected Group');

        // Close Group Drop Down
        await elementClick(this.blankClick);
        await browser.logger.info('Close Group DropDown');

        await WaitHelper.waitForElementToBeClickable(this.createNewGroupChekBox, 2000, 'Create A New Group For This Surface');
        await elementClick(this.createNewGroupChekBox);
        await browser.logger.info('Selected Create A New Group For This Surface Check Box');

        // Click On Create
        await WaitHelper.waitForElementToBeClickable(this.createButton, 2000, 'Create ');
        await elementClick(this.createButton);
        await browser.logger.info('Surface Created: ', name);
        await browser.sleep(3000);
        await browser.refresh();

        await WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Surface Drop Down');
        await browser.actions().mouseDown(this.surfaceDropDown).perform();
        await elementClick(this.surfaceDropDown);
        await browser.logger.info('Surface Drop Down Selected');

        await WaitHelper.waitForElementToBeClickable(this.selectSurface(name), 2000, 'E2E Surface ');
        await elementClick(this.selectSurface(name));
        await browser.logger.info('Selected E2E Surface');
    }

    async editSurface(name: string = null, description: string = null) {
        await WaitHelper.waitForElementToBeHidden(this.toast);
        await elementClick(this.surfaceMenu);
        await WaitHelper.waitForElementToBeDisplayed(this.surfacelist, 3000, 'list displayed');
        await browser.logger.info('Surface Page Displayed');

        await this.selectSurfaceFromDropDown(name);

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

    async deleteSurface(name: string = null) {
        await WaitHelper.waitForElementToBeHidden(this.toast);
        await elementClick(this.surfaceMenu);
        await WaitHelper.waitForElementToBeDisplayed(this.surfacelist, 3000, 'list displayed');
        await browser.logger.info('Surface Page Displayed');

        await this.selectSurfaceFromDropDown(name);

        // Click On Delete Button
        await WaitHelper.waitForElementToBePresent(this.deleteButton, 5000, 'Delete');
        await browser.actions().mouseMove(this.deleteButton).perform();
        await elementClick(this.deleteButton);
        await browser.logger.info('Delete Button Clicked');
        await browser.sleep(2000);

        await WaitHelper.waitForElementToBeClickable(this.confirmDeleteButton, 5000, 'Confirm Delete');
        await browser.actions().mouseMove(this.confirmDeleteButton).perform();
        await elementClick(this.confirmDeleteButton);
        await browser.logger.info(name, 'Deleted');
    }

    async verifySurface(name: string = null) {

        await WaitHelper.waitForElementToBeHidden(this.toast);
        await WaitHelper.waitForElementToBeDisplayed(this.surfacelist, 3000, 'list displayed');
        await elementClick(this.surfaceMenu);
        await browser.logger.info('Surface Page Displayed');

        // Click On Surface Drop Down
        await WaitHelper.waitForElementToBePresent(this.surfaceDropDown, 5000, 'Surface Drop Down ');
        await elementClick(this.surfaceDropDown);
        await browser.logger.info('Surface Drop Down Clicked');
        await browser.logger.info(name, 'Is Not Available');
    }

    async createDataForSurface(name: string = null, account: string[] = null, value: any = null, dataKey: string = null,
        keyValue: string = null) {

        await WaitHelper.waitForElementToBeHidden(this.toast);
        await elementClick(this.surfaceMenu);
        await WaitHelper.waitForElementToBeDisplayed(this.surfacelist, 3000, 'list displayed');
        await browser.logger.info('Surface Page Displayed');

        await this.selectSurfaceFromDropDown(name);

        await WaitHelper.waitForElementToBePresent(this.manageSurfaceData, 5000, 'Manage Data');
        await browser.actions().mouseMove(this.manageSurfaceData).perform();
        await elementClick(this.manageSurfaceData);
        await browser.logger.info('Manage Data Button Clicked');

        await WaitHelper.waitForElementToBePresent(this.addDataButton, 5000, 'Add Data');
        await browser.actions().mouseMove(this.addDataButton).perform();
        await elementClick(this.addDataButton);
        await browser.logger.info('Add Data Button Clicked');

        for (let accountName of account) {
            console.log('value', accountName);

            await WaitHelper.waitForElementToBePresent(this.surfaceDataDropDown, 5000, 'Surface Data Drop Down');
            await browser.actions().mouseMove(this.surfaceDataDropDown).perform();
            await elementClick(this.surfaceDataDropDown);
            await browser.logger.info('Surface Data Drop Down Button Clicked');

            await WaitHelper.waitForElementToBePresent(this.selectDataAccount(accountName), 5000, ' Data Account');
            await browser.actions().mouseMove(this.selectDataAccount(accountName)).perform();
            await elementClick(this.selectDataAccount(accountName));
            await browser.logger.info('Surface Data Account Selected');
        }

        await this.enterData(value, dataKey, keyValue);

        await WaitHelper.waitForElementToBePresent(this.createDataButton, 5000, 'Data Key Value');
        await elementClick(this.createDataButton);
        await browser.logger.info(dataKey, 'Created');
        await browser.sleep(2000);

        await this.closeDataWindow();
    }

    async editDataForSurface(name: string = null, account: any = null, value: any = null,
        dataKey: string = null, keyValue: string = null) {
        await WaitHelper.waitForElementToBeHidden(this.toast);
        await elementClick(this.surfaceMenu);
        await WaitHelper.waitForElementToBeDisplayed(this.surfacelist, 3000, 'list displayed');
        await browser.logger.info('Surface Page Displayed');

        await this.selectSurfaceFromDropDown(name);

        await WaitHelper.waitForElementToBePresent(this.manageSurfaceData, 5000, 'Manage Data');
        await browser.actions().mouseMove(this.manageSurfaceData).perform();
        await elementClick(this.manageSurfaceData);
        await browser.logger.info('Manage Data Button Clicked');

        await WaitHelper.waitForElementToBePresent(this.editAccountData(account), 5000, 'Edit Data Account');
        await browser.actions().mouseMove(this.editAccountData(account)).perform();
        await elementClick(this.editAccountData(account));
        await browser.logger.info('Edit Button Clicked');

        await this.enterData(value, dataKey, keyValue);

        await WaitHelper.waitForElementToBePresent(this.updateData, 5000, 'Update Data');
        await elementClick(this.updateData);
        await browser.logger.info(dataKey, 'Updated');
        await browser.sleep(3000);

        await this.closeDataWindow();
    }

    async deleteDataAccount(name: string = null, account: string[] = null, value: any = null) {
        await WaitHelper.waitForElementToBeHidden(this.toast);
        await browser.get(configProperties.qaUrl + '/surfaces');
        await WaitHelper.waitForElementToBeDisplayed(this.surfacelist, 3000, 'list displayed');
        await browser.logger.info('Surface Page Displayed');

        await this.selectSurfaceFromDropDown(name);

        await WaitHelper.waitForElementToBePresent(this.manageSurfaceData, 5000, 'Manage Data');
        await browser.actions().mouseMove(this.manageSurfaceData).perform();
        await elementClick(this.manageSurfaceData);
        await browser.logger.info('Manage Data Button Clicked');

        await WaitHelper.waitForElementToBePresent(this.deleteAccountData(value), 5000, 'Delete Data Account');
        await browser.actions().mouseMove(this.deleteAccountData(value)).perform();
        await elementClick(this.deleteAccountData(value));
        await browser.logger.info('Delete Button Clicked');

        await WaitHelper.waitForElementToBePresent(this.confirmDeleteButton, 5000, 'Confirm Delete');
        await browser.actions().mouseMove(this.confirmDeleteButton).perform();
        await elementClick(this.confirmDeleteButton);
        await browser.logger.info(name, 'Deleted');
        await browser.sleep(2000);

        await this.closeDataWindow();
    }

    async createDataForSurfaceLayer(name: string = null, account: string[] = null, value: any = null, dataKey: string = null,
        keyValue: string = null) {

        await WaitHelper.waitForElementToBeHidden(this.toast);
        await elementClick(this.surfaceMenu);
        await WaitHelper.waitForElementToBeDisplayed(this.surfacelist, 3000, 'list displayed');
        await browser.logger.info('Surface Page Displayed');

        await WaitHelper.waitForElementToBePresent(this.selectSurfaceLayer, 5000, 'Surface Layer');
        await browser.actions().mouseMove(this.selectSurfaceLayer).perform();
        await elementClick(this.selectSurfaceLayer);
        await browser.logger.info('Surface Layer Clicked');

        await WaitHelper.waitForElementToBePresent(this.surfaceLayerManageData, 5000, 'Surface Layer Manage Data');
        await browser.actions().mouseMove(this.surfaceLayerManageData).perform();
        await elementClick(this.surfaceLayerManageData);
        await browser.logger.info('Surface Layer Manage Data Button Clicked');

        await WaitHelper.waitForElementToBePresent(this.addDataButton, 5000, 'Add Data');
        await browser.actions().mouseMove(this.addDataButton).perform();
        await elementClick(this.addDataButton);
        await browser.logger.info('Add Data Button Clicked');

        for (let accountName of account) {
            console.log('value', accountName);

            await WaitHelper.waitForElementToBePresent(this.surfaceDataDropDown, 5000, 'Surface Data Drop Down');
            await browser.actions().mouseMove(this.surfaceDataDropDown).perform();
            await elementClick(this.surfaceDataDropDown);
            await browser.logger.info('Surface Data Drop Down Button Clicked');

            await WaitHelper.waitForElementToBePresent(this.selectDataAccount(accountName), 5000, ' Data Account');
            await browser.actions().mouseMove(this.selectDataAccount(accountName)).perform();
            await elementClick(this.selectDataAccount(accountName));
            await browser.logger.info('Surface Data Account Selected');
        }

        await this.enterData(value, dataKey, keyValue);

        await WaitHelper.waitForElementToBePresent(this.createDataButton, 5000, 'Data Key Value');
        await elementClick(this.createDataButton);
        await browser.logger.info(dataKey, 'Created');
        await browser.sleep(2000);

        await this.closeDataWindow();
    }

    async updateDataForSurfaceLayer(name: string = null, account: any = null, value: any = null,
        dataKey: string = null, keyValue: string = null) {
        await WaitHelper.waitForElementToBeHidden(this.toast);
        await elementClick(this.surfaceMenu);
        await WaitHelper.waitForElementToBeDisplayed(this.surfacelist, 3000, 'list displayed');
        await browser.logger.info('Surface Page Displayed');

        await this.selectSurfaceFromDropDown(name);

        await WaitHelper.waitForElementToBePresent(this.selectSurfaceLayer, 5000, 'Surface Layer');
        await browser.actions().mouseMove(this.selectSurfaceLayer).perform();
        await elementClick(this.selectSurfaceLayer);
        await browser.logger.info('Surface Layer Clicked');

        await WaitHelper.waitForElementToBePresent(this.surfaceLayerManageData, 5000, 'Surface Layer Manage Data');
        await browser.actions().mouseMove(this.surfaceLayerManageData).perform();
        await elementClick(this.surfaceLayerManageData);
        await browser.logger.info('Surface Layer Manage Data Button Clicked');

        await WaitHelper.waitForElementToBePresent(this.editDataForSurfaceLayer(account), 5000, 'Edit Data Account');
        await browser.actions().mouseMove(this.editDataForSurfaceLayer(account)).perform();
        await elementClick(this.editDataForSurfaceLayer(account));
        await browser.logger.info('Edit Button Clicked');

        await this.enterData(value, dataKey, keyValue);

        await WaitHelper.waitForElementToBePresent(this.updateData, 5000, 'Update Data');
        await elementClick(this.updateData);
        await browser.logger.info(dataKey, 'Updated');
        await browser.sleep(3000);

        await this.closeDataWindow();
    }

    async deleteDataAccountForSurfaceLayer(name: string = null, account: string[] = null, value: any = null) {
        await WaitHelper.waitForElementToBeHidden(this.toast);
        await browser.get(configProperties.qaUrl + '/surfaces');
        await WaitHelper.waitForElementToBeDisplayed(this.surfacelist, 3000, 'list displayed');
        await browser.logger.info('Surface Page Displayed');

        await this.selectSurfaceFromDropDown(name);

        await WaitHelper.waitForElementToBePresent(this.surfaceLayerManageData, 5000, 'Surface Layer Manage Data');
        await browser.actions().mouseMove(this.surfaceLayerManageData).perform();
        await elementClick(this.surfaceLayerManageData);
        await browser.logger.info('Surface Layer Manage Data Button Clicked');

        await WaitHelper.waitForElementToBePresent(this.deleteAccountData(value), 5000, 'Delete Data Account');
        await browser.actions().mouseMove(this.deleteAccountData(value)).perform();
        await elementClick(this.deleteAccountData(value));
        await browser.logger.info('Delete Button Clicked');

        await WaitHelper.waitForElementToBePresent(this.confirmDeleteButton, 5000, 'Confirm Delete');
        await browser.actions().mouseMove(this.confirmDeleteButton).perform();
        await elementClick(this.confirmDeleteButton);
        await browser.logger.info(name, 'Deleted');
        await browser.sleep(2000);

        await this.closeDataWindow();
    }

    async selectSurfaceFromDropDown(name: string = null) {
        await WaitHelper.waitForElementToBePresent(this.surfaceDropDown, 5000, 'Surface Drop Down ');
        await elementClick(this.surfaceDropDown);
        await browser.logger.info(name, 'Surface Drop Down Clicked');

        await WaitHelper.waitForElementToBePresent(this.selectsurface(name), 5000, 'Surface');
        await elementClick(this.selectsurface(name));
        await browser.logger.info('Surface Selcted');
        await browser.sleep(2000);
    }

    async enterData(value: any = null, dataKey: string = null, keyValue: string = null) {
        await WaitHelper.waitForElementToBePresent(this.enterKey(value), 5000, 'Data Key');
        await elementSendkeys(this.enterKey(value), dataKey);
        await browser.logger.info('Entered key ', dataKey);

        await WaitHelper.waitForElementToBePresent(this.enterValue(value), 5000, 'Data Key Value');
        await elementSendkeys(this.enterValue(value), keyValue);
        await browser.logger.info('Entered Key Value ', keyValue);
    }

    async closeDataWindow() {
        await WaitHelper.waitForElementToBePresent(this.closeManageSurfaceWindow, 5000, 'Close');
        await browser.actions().mouseMove(this.closeManageSurfaceWindow).perform();
        await elementClick(this.closeManageSurfaceWindow);
        await browser.logger.info('Manage Surface Window Closed');
    }

    getRandomNum = function (min, max) {
        return parseInt(Math.random() * (max - min) + min);
    };

    async getPageTitle() {
        return browser.getTitle();
    }
}