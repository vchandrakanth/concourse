import { ExpectedConditions, utils, browser } from 'protractor';
import { ExpectHelper } from '../utils/expectHelper';
import { CreateCloudAccount } from '../pageObjects/createAWSAccount.Po';
import { Surface } from '../pageObjects/surfaces.Po';
import { UtilMath } from '../utils/utilsMath';


describe('Managing AWS Accounts', async function () {
    let originalTimeout;
    let EC = ExpectedConditions;
    let createCloudAccount = new CreateCloudAccount();
    let properties = require('../conf/properties');
    let surface = new Surface();
    let awsAccountName = properties.CloudAccountData.awsAccountName + createCloudAccount.getRandomNum(1, 1000);
    let awsAccountDescription = properties.CloudAccountData.awsAccountDescription;
    let awsAccountId = properties.CloudAccountData.awsAccountId;
    let baseSurface = properties.SurfaceData.surfaceName;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
    });

    it('Step 1: Create AWS Account', async function (): Promise<any> {
        awsAccountId = UtilMath.randomFixedInteger(12) ;

        await createCloudAccount.createNewCloudAccount(awsAccountName, awsAccountDescription, awsAccountId);
        await browser.refresh();
    });

    it('Step 2: Assign AWS Account To Surface', async function (): Promise<any> {

        await surface.assignAWSAccountsToSurface(baseSurface, awsAccountName);
        await browser.refresh();

    });

    it('Step 3: Remove AWS Account From Surface', async function (): Promise<any> {

        await surface.removeAWSAccountsFromSurface(baseSurface, awsAccountName);

    });

    it('Step 4: Edit AWS Account', async function (): Promise<any> {

        await createCloudAccount.editAWSAccount(awsAccountName, awsAccountDescription);

    });

    it('Step 5: Delete AWS Account', async function (): Promise<any> {

        await createCloudAccount.deleteAWSAccount(awsAccountName);

    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});