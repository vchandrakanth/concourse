import { ExpectedConditions, browser } from 'protractor';
import { ExpectHelper } from '../utils/expectHelper';
import { PolicyGroupTemplatePage } from '../pageObjects/policyGroupTemplate.Po';
import { PolicyGroup } from '../pageObjects/policyGroup.Po';
import { AttributeTag } from '../pageObjects/attributeTags.Po';
import { Approvals } from '../pageObjects/approvals.Po';
import { getIdFromUrl } from '../utils/utils';
import { BaseLineAsset } from '../pageObjects/baseLineAssets.Po';

describe('Request For Base Line ', async function () {
    let originalTimeout;
    let EC = ExpectedConditions;
    let attributeTag = new AttributeTag();
    let policyPage = new PolicyGroup();
    let approvals = new Approvals();
    let properties = require('../conf/properties');
    let policyGroupTemplatePage = new PolicyGroupTemplatePage();
    let baseLineAsset = new BaseLineAsset();
    let attributeTagName = properties.attributeTagData.attributeName1 + attributeTag.getRandomNum(1, 1000);
    let description = properties.attributeTagData.attributeDescription1;
    let policyGroupTemplateName = properties.policyGroupTemplateData.requireApprovalPolicyGroupTemplateName + policyGroupTemplatePage.getRandomNum(1, 1000);
    let policyGroupTemplatedesc = properties.policyGroupTemplateData.requireApprovalPolicyGroupTemplateDesc;
    let policyGroupName = properties.policyGroupData.policyGroupName + policyPage.getRandomNum(1, 1000);
    let policyGroupDesc = properties.policyGroupData.policyGroupDesc;
    let baselineAssetName = properties.enclaveModelData.modelName + baseLineAsset.getRandomNum(1, 1000);
    let desc = properties.enclaveModelData.modelDescription;
    let service = properties.ServicesData.service;
    let baseSurface = properties.SurfaceData.surfaceName;
    let services = [service];
    let attitibuteTag = [attributeTagName];
    let policyGroupId;
    let modelid;
    let accountName = ['0ecb99ea-ca1a-4be6-96cc-ceb57b7b63d4'];
    let subscription = ['3263f5e2-3561-433c-97f2-e31b389e45ff'];
    let resourceGroup = ['TestConnection'];
    let product = ['Microsoft.Batch/batchAccounts'];
    let region = ['South India'];
    let key = ['service'];
    let value = ['istio-system/istio-ingressgateway'];
    let baseLineAssetId;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
    });

    it('Step 1: Creating Attribute Tag', async function (): Promise<any> {
        await attributeTag.createAttributeTag(baseSurface, attributeTagName, description);
        await browser.sleep(2000);
        await attributeTag.searchAttribute(baseSurface, attributeTagName, 'Description');
        await ExpectHelper.isListElementExists(attributeTag.list, attributeTagName);
    });

    it('Step 2: Creating Policy Group Template with  Published', async function (): Promise<any> {
        await policyGroupTemplatePage.createPolicyGroupTemplate(baseSurface, 'PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Require Approval of Institutional Entities');
        await policyGroupTemplatePage.searchPolicyGroupTemplate(baseSurface, policyGroupTemplateName);
        await ExpectHelper.isListElementExists(policyGroupTemplatePage.list, policyGroupTemplateName);
    });

    it('Step 3: Creating Policy Group', async function (): Promise<any> {
        await policyPage.createPolicyGroup(baseSurface, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', policyGroupTemplateName, attributeTagName, services, 'Default Surface - Root Surface Layer', 'BASELINE', 'E2E Admin', 'Require Approval of Institutional Entities 1');
        policyGroupId = await getIdFromUrl();
        await console.log('Policy Group id Is', policyGroupId);
        await policyPage.searchPolicyGroup(baseSurface, policyGroupName);
        await ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
    });

    it('Step 4: Verify Approval Request For Publish', async function (): Promise<any> {
        await approvals.VerifyPublishedApprovalRequest(baseSurface, policyGroupId);
        // await ExpectHelper.isListElementExists(approvals.approvalList, policyGroupId);
    });

    it('Step 5: Approve Publish Request', async function (): Promise<any> {
        await approvals.ApprovalAction(baseSurface, policyGroupId);
    });

    it('Step 6: Create New BaseLine Asset', async function (): Promise<any> {
        // Creating BaseLine Asset
        await baseLineAsset.createBaseLineAsset(baseSurface, 'DRAFT', baselineAssetName, desc, 'E2E Admin', accountName, subscription,
            resourceGroup, product, region, key, value, attitibuteTag);
        baseLineAssetId = await baseLineAsset.getId();
        await console.log('BaseLine Asset name is', baselineAssetName);
        await console.log('BaseLine Asset id is', baseLineAssetId);
    });

    it('Step 7: Verify Approval Request For Publish', async function (): Promise<any> {
        await approvals.VerifyPublishedApprovalRequest(baseSurface, baseLineAssetId);
        // await ExpectHelper.isListElementExists(approvals.approvalList, modelid);
    });

    it('Step 8: Approve Publish Request', async function (): Promise<any> {
        await approvals.ApprovalAction(baseSurface, baseLineAssetId);
    });

    it('Step 9: Delete BaseLine Asset', async function (): Promise<any> {
        // Delete Enclave Model
        await baseLineAsset.deleteBaseLineAsset(baseSurface, baselineAssetName, 'false');
    });

    it('Step 10: Verify Approval Request For Delete', async function (): Promise<any> {
        await approvals.VerifyDeleteApprovalRequest(baseSurface, baseLineAssetId);
        // await ExpectHelper.isListElementExists(approvals.approvalList, modelid);
    });

    it('Step 11: Approve Delete Action', async function (): Promise<any> {
        await approvals.ApprovalAction(baseSurface, baseLineAssetId);
    });

    it('Step 12: Verify BaseLIne Asset Deleted Or Not', async function (): Promise<any> {
        await baseLineAsset.searchBaseLine(baseSurface, baselineAssetName);
    });

    it('Step 13: Approval Request For Delete', async function (): Promise<any> {
        await approvals.DeleteApprovalRequest(baseSurface, policyGroupName);
    });

    it('Step 14: Verify Approval Request For Delete', async function (): Promise<any> {
        await approvals.VerifyDeleteApprovalRequest(baseSurface, policyGroupId);
        // await ExpectHelper.isListElementExists(approvals.approvalList, policyGroupId);
    });

    it('Step 15: Approve Delete Action', async function (): Promise<any> {
        await approvals.ApprovalAction(baseSurface, policyGroupId);
    });

    it('Step 16: CleanUp', async function (): Promise<any> {
        await policyGroupTemplatePage.deletePolicyGroupTemplate(baseSurface, policyGroupTemplateName, 'false');
        await attributeTag.deleteAttributeTag(baseSurface, attributeTagName, 'false');
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

});