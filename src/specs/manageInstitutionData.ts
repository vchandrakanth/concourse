import { browser, ExpectedConditions } from 'protractor';
import { ExpectHelper } from '../utils/expectHelper';
import { Surface } from '../pageObjects/surfaces.Po';
import { InstitutionData } from '../pageObjects/manageInstitutionData.Po';

describe('Surface Creation Concourse ', async function () {
    let originalTimeout;
    let EC = ExpectedConditions;
    let properties = require('../conf/properties');
    let surface = new Surface();
    let institutionData = new InstitutionData();
    let baseSurface = properties.SurfaceData.surfaceName;
    let azureSubscription = ['Azure Subscriptions'];
    let azureAccount = ['Azure Account'];
    let networkWhitelists = ['Network Whitelists'];
    let publicKeys = ['Public Keys'];
    let accountKey = properties.SurfaceData.accountKey + institutionData.getRandomNum(1, 1000);
    let updatedAccountKey = properties.SurfaceData.accountKey + institutionData.getRandomNum(1, 1000);
    let accountValue = properties.SurfaceData.accountValue + institutionData.getRandomNum(1, 1000);
    let updatedAccountValue = properties.SurfaceData.accountValue + institutionData.getRandomNum(1, 1000);
    let whiteListValue = properties.SurfaceData.whiteListValue;
    let publicKey = properties.SurfaceData.dataForPublicKeys;
    let azureSubscriptionKey = properties.SurfaceData.azureSubscriptionKey;
    let azureSubscriptionValue = properties.SurfaceData.azureSubscriptionValue;
    let updatedWhiteListValue = properties.SurfaceData.UpdatedWhiteListValue;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
    });

    it('Step 1: Create Azure Subscription Data For Institution', async function (): Promise<any> {
        await institutionData.createDataForInstitution(baseSurface, azureSubscription, 0, accountKey, accountValue);
        await ExpectHelper.isListElementExists(institutionData.dataAccountList, 'Azure Subscriptions');
    });

    it('Step 2: Create AzureAccount Data For Institution', async function (): Promise<any> {
        await institutionData.createDataForInstitution(baseSurface, azureAccount, accountKey, '0', 'accountValue');
        await ExpectHelper.isListElementExists(institutionData.dataAccountList, 'Azure Account');
    });

    it('Step 3: Create Public Keys Data For Institution', async function (): Promise<any> {
        await institutionData.createDataForInstitution(baseSurface, publicKeys, 0, accountKey, accountValue);
        await ExpectHelper.isListElementExists(institutionData.dataAccountList, 'Public Keys');
    });

    it('Step 4: Create Network Whitelists Data For Institution', async function (): Promise<any> {
        await institutionData.createDataForInstitution(baseSurface, networkWhitelists, 0, whiteListValue, whiteListValue);
        await ExpectHelper.isListElementExists(institutionData.dataAccountList, 'Network Whitelists');
    });

    it('Step 5: Update Azure Subscriptions Data For Institurion', async function (): Promise<any> {
        await institutionData.updateValueForInstitutionData(baseSurface, azureSubscription, 1, azureSubscriptionKey, azureSubscriptionValue);
    });

    it('Step 6: Remove Azure Subscriptions Data For Institurion', async function (): Promise<any> {
        await institutionData.deleteValueForInstitutionData(baseSurface, azureSubscription, 1);
    });

    it('Step 7: Update WhiteList Data For Institurion', async function (): Promise<any> {
        await institutionData.updateValueForInstitutionData(baseSurface, networkWhitelists, 1, updatedWhiteListValue, updatedWhiteListValue);
    });

    it('Step 8: Remove WhiteList Data For Institurion', async function (): Promise<any> {
        await institutionData.deleteValueForInstitutionData(baseSurface, networkWhitelists, 1);
    });

    it('Step 9: Delete AZURE Account Data For Institution', async function (): Promise<any> {
        await institutionData.deleteDataAccountForInstitution(baseSurface, azureAccount);
        await ExpectHelper.expectDoesNotExists(institutionData.selectAccount(azureAccount));
    });

    it('Step 10: Delete Azure Subscription  Data For Institution', async function (): Promise<any> {
        await institutionData.deleteDataAccountForInstitution(baseSurface, azureSubscription);
        await ExpectHelper.expectDoesNotExists(institutionData.selectAccount(azureSubscription));
    });

    it('Step 11: Delete PublicKeys Data For Institution', async function (): Promise<any> {
        await institutionData.deleteDataAccountForInstitution(baseSurface, publicKeys);
        await ExpectHelper.expectDoesNotExists(institutionData.selectAccount(publicKeys));
    });

    it('Step 12: Delete Network Whitelists Data For Institution', async function (): Promise<any> {
        await institutionData.deleteDataAccountForInstitution(baseSurface, networkWhitelists);
        await ExpectHelper.expectDoesNotExists(institutionData.selectAccount(networkWhitelists));
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

});