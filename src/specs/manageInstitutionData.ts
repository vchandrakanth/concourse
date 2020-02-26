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
    let discoveredModelOwningGroupId = ['Discovered Model Owning Group Id'];
    let azureSubscription = ['Azure Subscriptions'];
    let azureAccount = ['Azure Account'];
    let networkWhitelists = ['Network Whitelists'];
    let insightsUrls = ['Insights Urls'];
    let accountKey = properties.SurfaceData.accountKey + institutionData.getRandomNum(1, 1000);
    let updatedAccountKey = properties.SurfaceData.accountKey + institutionData.getRandomNum(1, 1000);
    let accountValue = properties.SurfaceData.accountValue + institutionData.getRandomNum(1, 1000);
    let updatedAccountValue = properties.SurfaceData.accountValue + institutionData.getRandomNum(1, 1000);
    let whiteListValue = properties.SurfaceData.whiteListValue;
    let insightUrl = properties.SurfaceData.insightUrl;
    let updateInsightUrl = properties.SurfaceData.updatedInsightUrl;
    let azureSubscriptionKey = properties.SurfaceData.azureSubscriptionKey;
    let azureSubscriptionValue = properties.SurfaceData.azureSubscriptionValue;
    let updatedWhiteListValue = properties.SurfaceData.UpdatedWhiteListValue;
    let getInstitutionDataName;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
    });

    it('Step 1: Create Azure Subscription Data For Institution', async function (): Promise<any> {
        await institutionData.createDataForInstitution(baseSurface, azureSubscription, 0, accountKey, accountValue);
        await ExpectHelper.isListElementExists(institutionData.dataAccountList, 'Azure Subscriptions');
    });

    it('Step 2: Create AWS Data For Institution', async function (): Promise<any> {
        await institutionData.createDataForInstitution(baseSurface, discoveredModelOwningGroupId, 0, accountKey, accountValue);
        await ExpectHelper.isListElementExists(institutionData.dataAccountList, 'Aws Accounts');
    });

    it('Step 3: Create AzureAccount Data For Institution', async function (): Promise<any> {
        await institutionData.createDataForInstitution(baseSurface, azureAccount, accountKey, '0', 'accountValue');
        await ExpectHelper.isListElementExists(institutionData.dataAccountList, 'Azure Account');
    });

    it('Step 4: Create Network Whitelists Data For Institution', async function (): Promise<any> {
        await institutionData.createDataForInstitution(baseSurface, networkWhitelists, 0, whiteListValue, whiteListValue);
        await ExpectHelper.isListElementExists(institutionData.dataAccountList, 'Network Whitelists');
    });

    it('Step 5: Create InsightsUrls Data For Institution', async function (): Promise<any> {
        await institutionData.createDataForInstitution(baseSurface, insightsUrls, insightUrl, '0', 'accountValue');
        await ExpectHelper.isListElementExists(institutionData.dataAccountList, 'Insights Urls');
    });

    it('Step 6: Update AWS Data For Institurion', async function (): Promise<any> {
        await institutionData.updateValueForInstitutionData(baseSurface, discoveredModelOwningGroupId, 1, updatedAccountKey, updatedAccountValue);
    });

    it('Step 7: Remove AWS Value For Institurion', async function (): Promise<any> {
        await institutionData.deleteValueForInstitutionData(baseSurface, discoveredModelOwningGroupId, 1);
    });

    it('Step 8: Update InsightUrl Data For Institurion', async function (): Promise<any> {
        await institutionData.updateValueForInstitutionData(baseSurface, insightsUrls, 1, 'accountKey', 'accountValue', updateInsightUrl);
    });

    it('Step 9: Remove InsightUrl For Institurion', async function (): Promise<any> {
        await institutionData.deleteValueForInstitutionData(baseSurface, insightsUrls, 2);
    });

    it('Step 10: Update Azure Subscriptions Data For Institurion', async function (): Promise<any> {
        await institutionData.updateValueForInstitutionData(baseSurface, azureSubscription, 1, azureSubscriptionKey, azureSubscriptionValue);
    });

    it('Step 11: Remove Azure Subscriptions Data For Institurion', async function (): Promise<any> {
        await institutionData.deleteValueForInstitutionData(baseSurface, azureSubscription, 1);
    });

    it('Step 12: Update WhiteList Data For Institurion', async function (): Promise<any> {
        await institutionData.updateValueForInstitutionData(baseSurface, networkWhitelists, 1, updatedWhiteListValue, updatedWhiteListValue);
    });

    it('Step 13: Remove WhiteList Data For Institurion', async function (): Promise<any> {
        await institutionData.deleteValueForInstitutionData(baseSurface, networkWhitelists, 1);
    });

    it('Step 14: Delete AWS Account Data For Institution', async function (): Promise<any> {
        await institutionData.deleteDataAccountForInstitution(baseSurface, discoveredModelOwningGroupId);
        await ExpectHelper.expectDoesNotExists(institutionData.selectAccount(discoveredModelOwningGroupId));
    });

    it('Step 15: Delete AZURE Account Data For Institution', async function (): Promise<any> {
        await institutionData.deleteDataAccountForInstitution(baseSurface, azureAccount);
        await ExpectHelper.expectDoesNotExists(institutionData.selectAccount(azureAccount));
    });

    it('Step 16: Delete Azure Subscription  Data For Institution', async function (): Promise<any> {
        await institutionData.deleteDataAccountForInstitution(baseSurface, azureSubscription);
        await ExpectHelper.expectDoesNotExists(institutionData.selectAccount(azureSubscription));
    });

    it('Step 17: Delete Insights Urls Data For Institution', async function (): Promise<any> {
        await institutionData.deleteDataAccountForInstitution(baseSurface, insightsUrls);
        await ExpectHelper.expectDoesNotExists(institutionData.selectAccount(insightsUrls));
    });

    it('Step 18: Delete Network Whitelists Data For Institution', async function (): Promise<any> {
        await institutionData.deleteDataAccountForInstitution(baseSurface, networkWhitelists);
        await ExpectHelper.expectDoesNotExists(institutionData.selectAccount(networkWhitelists));
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

});