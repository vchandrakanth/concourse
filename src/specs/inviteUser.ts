import { ExpectedConditions } from 'protractor';
import { ExpectHelper } from '../utils/expectHelper';
import { InviteUser } from '../pageObjects/inviteUser.Po';

describe('Invite Users', async function () {
    let originalTimeout;
    let EC = ExpectedConditions;
    let inviteUser = new InviteUser();
    let properties = require('../conf/properties');
    let mail = properties.InviteUserData.mail + inviteUser.getRandomNum(1, 1000) + '@concourselabs.com';

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
    });

    it('Step 1:Invite User', async function (): Promise<any> {
        // Inviting New User
        await inviteUser.inviteNewUser(mail);
        await ExpectHelper.verifyContainsText(inviteUser.toast, 'alert', 'User Invitation Email Sent');
        await console.log(mail);
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});