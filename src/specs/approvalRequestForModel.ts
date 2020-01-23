import { ExpectedConditions } from 'protractor';
import { ExpectHelper } from '../utils/expectHelper';
import { PolicyGroupTemplatePage } from '../pageObjects/policyGroupTemplate.Po';
import { PolicyGroup } from '../pageObjects/policyGroup.Po';
import { AttributeTag } from '../pageObjects/attributeTags.Po';
import { Approvals } from '../pageObjects/approvals.Po';
import { getIdFromUrl } from '../utils/utils';
import { AssetManager } from '../pageObjects/assetManager.Po';
import { LogicalDeployment } from '../pageObjects/logicalDeployment.Po';

describe('Policy Group Concourse ', async function () {
    let originalTimeout;
    let EC = ExpectedConditions;
    let attributeTag = new AttributeTag();
    let policyPage = new PolicyGroup();
    let approvals = new Approvals();
    let properties = require('../conf/properties');
    let policyGroupTemplatePage = new PolicyGroupTemplatePage();
    let assetManager = new AssetManager();
    let logicalDeployment = new LogicalDeployment();
    let attributeTagName = properties.attributeTagData.attributeName1 + attributeTag.getRandomNum(1, 1000);
    let description = properties.attributeTagData.attributeDescription1;
    let policyGroupTemplateName = properties.policyGroupTemplateData.requireApprovalPolicyGroupTemplateName + policyGroupTemplatePage.getRandomNum(1, 1000);
    let policyGroupTemplatedesc = properties.policyGroupTemplateData.requireApprovalPolicyGroupTemplateDesc;
    let policyGroupName = properties.policyGroupData.policyGroupName + policyPage.getRandomNum(1, 1000);
    let policyGroupDesc = properties.policyGroupData.policyGroupDesc;
    let assetName = properties.enclaveModelData.modelName + assetManager.getRandomNum(1, 1000);
    let desc = properties.enclaveModelData.modelDescription;
    let deploymentName = properties.logicalDeploymentData.deploymentName + logicalDeployment.getRandomNum(1, 1000);
    let stackName = properties.logicalDeploymentData.stackName + logicalDeployment.getRandomNum(1, 1000);
    let service = properties.ServicesData.service;
    let baseSurface = properties.SurfaceData.surfaceName;
    let services = [service];
    let attitibuteTag = [attributeTagName];
    let policyGroupId;
    let deploymentId;
    let modelid;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
    });

    it('Step 1: Creating Attribute Tag', async function (): Promise<any> {
        await attributeTag.createAttributeTag(baseSurface, attributeTagName, description);
        await attributeTag.searchAttribute(baseSurface, attributeTagName, 'Description');
        await ExpectHelper.isListElementExists(attributeTag.list, attributeTagName);
    });

    it('Step 2: Creating Policy Group Template with  Published', async function (): Promise<any> {
        await policyGroupTemplatePage.createPolicyGroupTemplate(baseSurface, 'PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Require Approval of Institutional Entities');
        await policyGroupTemplatePage.searchPolicyGroupTemplate(baseSurface, policyGroupTemplateName);
        await ExpectHelper.isListElementExists(policyGroupTemplatePage.list, policyGroupTemplateName);
    });

    it('Step 3: Creating Policy Group', async function (): Promise<any> {
        await policyPage.createPolicyGroup(baseSurface, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', policyGroupTemplateName, attributeTagName, services, 'Default Surface - Root Surface Layer', 'MODEL', 'E2E Admin');
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

    it('Step 5: Create New Enclave Model', async function (): Promise<any> {
        // Creating Enclave Model
        await assetManager.createEnclaveModel(baseSurface, 'PUBLISHED', assetName, desc, attitibuteTag, 'ec2template.json', 'E2E Admin');
        modelid = await assetManager.getId();
        await console.log('Enclave Model id is', modelid);
        await assetManager.searchAssetManager(baseSurface, assetName);
        await ExpectHelper.isListElementExists(assetManager.assetList, assetName);
    });

    it('Step 6: Verify Approval Request For Publish', async function (): Promise<any> {
        await approvals.VerifyPublishedApprovalRequest(baseSurface, modelid);
        // await ExpectHelper.isListElementExists(approvals.approvalList, deploymentId);
    });

    it('Step 7: Approve Publish Request', async function (): Promise<any> {
        await approvals.ApprovalAction(baseSurface, modelid);
    });

    it('Step 8: Delete Enclave Model', async function (): Promise<any> {
        // Delete Logical Deployement
        await assetManager.deleteEnclaveModel(baseSurface, assetName, 'false');
    });

    it('Step 10: Verify Approval Request For Delete', async function (): Promise<any> {
        await approvals.VerifyDeleteApprovalRequest(baseSurface, modelid);
        // await ExpectHelper.isListElementExists(approvals.approvalList, modelid);
    });

    it('Step 11: Approve Delete Action', async function (): Promise<any> {
        await approvals.ApprovalAction(baseSurface, modelid);
    });

    it('Step 12: Verify Enclave Model Deleted Or Not', async function (): Promise<any> {
        await assetManager.searchAssetManager(baseSurface, assetName);
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