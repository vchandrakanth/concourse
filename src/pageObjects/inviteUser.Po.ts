import { browser, element, by, $, $$ } from 'protractor';
import { elementClick, elementSendkeys, elementClear } from '../utils/utils';
import { WaitHelper } from '../utils/waitHelper';

export class InviteUser {
    get usersLink() { return element(by.css('a[data-e2e="linkUsers"]')); }
    get inviteUserButton() { return element(by.xpath('//button[contains(text(),"Invite User")]')); }
    // get enterEmail() { return element(by.css('[data-e2e="email"]')); }
    get enterEmail() { return element(by.css('[placeholder="Email"]')); }
    // get inviteButton() { return element(by.css('.Invite')); }
    get inviteButton() { return element(by.css('button[type="submit"]')); }
    get list() { return element(by.xpath('//div[@class="list"]')); }
    get search() { return element(by.css('[placeholder="Search"]')); }
    get surfaceDropDown() { return element(by.css('[data-e2e="surfaceSwitcherDropdown"]')); }
    selectSurface(Surface: string) { return element(by.xpath(`//option[contains(.,'${Surface}')]`)); }
    get toast() { return $('#toast-container'); }
    get alert() { return element(by.css('.alert')); }

    async inviteNewUser(mail: any = null) {

        await WaitHelper.waitForElementToBeHidden(this.toast);
        await elementClick(this.usersLink);
        // await browser.get(configProperties.qaUrl + 'user-management/users');
        await browser.logger.info('Users Menu Clicked');

        // Click on '+' Button to Invite User
        await elementClick(this.inviteUserButton);
        await browser.logger.info('Clicked Invite User Button');

        // Enter Email
        await WaitHelper.waitForElementToBeClickable(this.enterEmail, 5000, 'Enter Email');
        await elementSendkeys(this.enterEmail, mail);
        await browser.logger.info(mail, 'Entered');

        await WaitHelper.waitForElementToBeClickable(this.inviteButton, 5000, 'Invite');
        await elementClick(this.inviteButton);
        await browser.logger.info('Invite Button Clicked');
        await browser.sleep(2000);
    }

    getRandomNum = function (min, max) {
        return parseInt(Math.random() * (max - min) + min);
    };

    async getPageTitle() {
        return browser.getTitle();
    }
}
