import { ExpectedConditions } from 'protractor';
import { ExpectHelper } from '../utils/expectHelper';
import { PolicyGroupTemplatePage } from '../pageObjects/policyGroupTemplate.Po';
import { PolicyGroup } from '../pageObjects/policyGroup.Po';
import { AttributeTag } from '../pageObjects/attributeTags.Po';
import { Approvals } from '../pageObjects/approvals.Po';
import { getIdFromUrl } from '../utils/utils';

describe('Approvals Concourse ', async function () {
    let originalTimeout;
    let EC = ExpectedConditions;
    let attributeTag = new AttributeTag();
    let policyPage = new PolicyGroup();
    let approvals = new Approvals();
    let properties = require('../conf/properties');
    let policyGroupTemplatePage = new PolicyGroupTemplatePage();
    let attributeTagName = properties.attributeTagData.attributeName1 + attributeTag.getRandomNum(1, 1000);
    let description = properties.attributeTagData.attributeDescription1;
    let policyGroupTemplateName = properties.policyGroupTemplateData.requireApprovalPolicyGroupTemplateName + policyGroupTemplatePage.getRandomNum(1, 1000);
    let policyGroupTemplatedesc = properties.policyGroupTemplateData.requireApprovalPolicyGroupTemplateDesc;
    let policyGroupName = properties.policyGroupData.policyGroupName + policyPage.getRandomNum(1, 1000);
    let policyGroupDesc = properties.policyGroupData.policyGroupDesc;
    let service = properties.ServicesData.service;
    let baseSurface = properties.SurfaceData.surfaceName;
    let services = [service];
    let policyGroupId;

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
        await policyPage.createPolicyGroup(baseSurface, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', policyGroupTemplateName, attributeTagName, services, 'Default Surface - Root Surface Layer', 'POLICY_GROUP', 'E2E Admin', 'Require Approval of Institutional Entities 1');
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

    it('Step 6: Approval Request For Delete', async function (): Promise<any> {
        await approvals.DeleteApprovalRequest(baseSurface, policyGroupName);
    });

    it('Step 7: Verify Approval Request For Delete', async function (): Promise<any> {
        await approvals.VerifyDeleteApprovalRequest(baseSurface, policyGroupId);
        // await ExpectHelper.isListElementExists(approvals.approvalList, policyGroupId);
    });

    it('Step 8: Approve Delete Action', async function (): Promise<any> {
        await approvals.ApprovalAction(baseSurface, policyGroupId);
    });

    it('Step 9: Verify Policy Group Deleted Or Not', async function (): Promise<any> {
        await policyPage.searchPolicyGroup(baseSurface, policyGroupName);
        await ExpectHelper.expectDoesNotExists(policyPage.searchPolicyGroupName(policyGroupName));
    });

    it('Step 10: CleanUp', async function (): Promise<any> {
        await policyGroupTemplatePage.deletePolicyGroupTemplate(baseSurface, policyGroupTemplateName, 'false');
        await attributeTag.deleteAttributeTag(baseSurface, attributeTagName, 'false');
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

});