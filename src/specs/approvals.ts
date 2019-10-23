import { ExpectedConditions } from 'protractor';
import { ExpectHelper } from '../utils/expectHelper';
import { PolicyGroupTemplatePage } from '../pageObjects/policyGroupTemplate.Po';
import { PolicyGroup } from '../pageObjects/policyGroup.Po';
import { AttributeTag } from '../pageObjects/attributeTags.Po';
import { Approvals } from '../pageObjects/approvals.Po';
import { getIdFromUrl } from '../utils/utils';

describe('Policy Group Concourse ', async function () {
    let originalTimeout;
    let EC = ExpectedConditions;
    let attributeTag = new AttributeTag();
    let policyPage = new PolicyGroup();
    let approvals = new Approvals();
    let properties = require('../conf/properties');
    let policyGroupTemplatePage = new PolicyGroupTemplatePage();
    let attributeTagName = properties.attributeTagData.attributeName1 + attributeTag.getRandomNum(1, 1000);
    let description = properties.attributeTagData.attributeDescription1;
    let policyGroupTemplateName = properties.policyGroupTemplateData.requireApprovalPolicyGrouptemplate + policyGroupTemplatePage.getRandomNum(1, 1000);
    let policyGroupTemplatedesc = properties.policyGroupTemplateData.requireApprovalPolicyGrouptemplateDesc;
    let policyGroupName = properties.policyGroupData.policyGroupName + policyPage.getRandomNum(1, 1000);
    let policyGroupDesc = properties.policyGroupData.policyGroupDesc;
    let service = properties.ServicesData.service;
    let services = [service];
    let entityType = properties.ApprovalsData.entityType1;
    let Id;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;
    });

    it('Step 1: Creating Attribute Tag', async function (): Promise<any> {
        await attributeTag.createAttributeTag(attributeTagName, description);
        await attributeTag.searchAttribute(attributeTagName, 'Description');
        await ExpectHelper.isListElementExists(attributeTag.list, attributeTagName);
    });

    it('Step 2: Creating Policy Group Template with  Published', async function (): Promise<any> {
        await policyGroupTemplatePage.createPolicyGroupTemplate('PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Require Approval');
        await policyGroupTemplatePage.searchPolicyGroupTemplate(policyGroupTemplateName);
        await ExpectHelper.isListElementExists(policyGroupTemplatePage.list, policyGroupTemplateName);
    });

    it('Step 3: Creating Policy Group with  Draft', async function (): Promise<any> {
        await policyPage.createPolicyGroup(policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', policyGroupTemplateName, attributeTagName, services, '', 'Policy Group', 'E2E Admin');
        await policyPage.searchPolicyGroup(policyGroupName);
        await ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
    });

    it('Step 4: Edit Policies And Publish Policy Group For Approval', async function (): Promise<any> {
        await policyPage.editSurfaceLayerAndPublish(policyGroupName, 'Default Surface - Root Surface Layer');
        Id = await getIdFromUrl();
        await console.log('Policy Group id Is', Id);
    });

    it('Step 5: Verify Approval Request For Publish', async function (): Promise<any> {
        await approvals.VerifyPublishedApprovalRequest(Id);
        await ExpectHelper.isListElementExists(approvals.approvalList, Id);
    });

    it('Step 6: Approve Publish Request', async function (): Promise<any> {
        await approvals.ApprovalAction(Id);

    });

    it('Step 7: Approval Request For Delete', async function (): Promise<any> {
        await approvals.DeleteApprovalRequest(policyGroupName);
    });

    it('Step 8: Verify Approval Request For Delete', async function (): Promise<any> {
        await approvals.VerifyDeleteApprovalRequest(Id);
        await ExpectHelper.isListElementExists(approvals.approvalList, Id);
    });

    it('Step 9: Approve Publish Delete', async function (): Promise<any> {
        await approvals.ApprovalAction(Id);
    });

    it('Step 10: Verify Policy Group Deleted Or Not', async function (): Promise<any> {
        await policyPage.searchPolicyGroup(policyGroupName);
        await ExpectHelper.expectDoesNotExists(policyPage.searchPolicyGroupName(policyGroupName));
    });

    it('Step 11: CleanUp', async function (): Promise<any> {
        await policyGroupTemplatePage.deletePolicyGroupTemplate(policyGroupTemplateName, 'false');
        await attributeTag.deleteAttributeTag(attributeTagName, 'false');
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

});