import { ExpectedConditions, browser } from 'protractor';
import { ExpectHelper } from '../utils/expectHelper';
import { PolicyGroupTemplatePage } from '../pageObjects/policyGroupTemplate.Po';
import { PolicyGroup } from '../pageObjects/policyGroup.Po';
import { AttributeTag } from '../pageObjects/attributeTags.Po';
import { Approvals } from '../pageObjects/approvals.Po';
import { getIdFromUrl } from '../utils/utils';
import { CloudRoles } from '../pageObjects/cloudRoles.Po';
import { Group } from '../pageObjects/groups.Po';

describe('Request For Cloud Role ', async function () {
    let originalTimeout;
    let EC = ExpectedConditions;
    let attributeTag = new AttributeTag();
    let policyPage = new PolicyGroup();
    let cloudRole = new CloudRoles();
    let approvals = new Approvals();
    let group = new Group();
    let properties = require('../conf/properties');
    let policyGroupTemplatePage = new PolicyGroupTemplatePage();
    let attributeTagName = properties.attributeTagData.attributeName1 + attributeTag.getRandomNum(1, 1000);
    let description = properties.attributeTagData.attributeDescription1;
    let policyGroupTemplateName = properties.policyGroupTemplateData.requireApprovalPolicyGroupTemplateName + policyGroupTemplatePage.getRandomNum(1, 1000);
    let policyGroupTemplatedesc = properties.policyGroupTemplateData.requireApprovalPolicyGroupTemplateDesc;
    let policyGroupName = properties.policyGroupData.policyGroupName + policyPage.getRandomNum(1, 1000);
    let policyGroupDesc = properties.policyGroupData.policyGroupDesc;
    let cloudRoleName = properties.CloudRolesData.cloudRoleName + cloudRole.getRandomNum(1, 1000);
    let cloudRoleDescription = properties.CloudRolesData.cloudRoleDesc;
    let provider = properties.CloudRolesData.amazonProvider;
    let groupName = properties.groupData.groupName + group.getRandomNum(1, 1000);
    let groupDescription = properties.groupData.groupDescription;
    let user = properties.groupData.user;
    let amazonAction = ['a4b:DisassociateDeviceFromRoom'];
    let amazonNonAction = ['a4b:DeleteUser'];
    let azureAction = ['operations/read'];
    let azureNonAction = ['virtualMachines/write'];
    let role = ['Cloud Permission Admin'];
    let responsibilities = ['Manage Cloud Role Assignments'];
    let organization = ['Default Surface - Root Surface Layer'];
    let service = properties.ServicesData.service;
    let baseSurface = properties.SurfaceData.surfaceName;
    let services = [service];
    let attitibuteTag = [attributeTagName];
    let cloudRoles = [cloudRoleName];
    let publishedCloudRoleId;
    let policyGroupId;
    let cloudRoleId;
    let groupId;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
    });

    it('Step 1: Create Attribute Tag', async function (): Promise<any> {
        await attributeTag.createAttributeTag(baseSurface, attributeTagName, description);
        await attributeTag.searchAttribute(baseSurface, attributeTagName, 'Description');
        await ExpectHelper.isListElementExists(attributeTag.list, attributeTagName);
    });

    it('Step 2: Create Policy Group Template with  Published', async function (): Promise<any> {
        await policyGroupTemplatePage.createPolicyGroupTemplate(baseSurface, 'PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Require Approval of Institutional Entities');
        await policyGroupTemplatePage.searchPolicyGroupTemplate(baseSurface, policyGroupTemplateName);
        await ExpectHelper.isListElementExists(policyGroupTemplatePage.list, policyGroupTemplateName);
    });

    it('Step 3: Create Policy Group', async function (): Promise<any> {
        await policyPage.createPolicyGroup(baseSurface, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', policyGroupTemplateName, attributeTagName, services, 'Default Surface - Root Surface Layer', 'CLOUD_ROLE', 'E2E Admin');
        policyGroupId = await getIdFromUrl();
        await console.log('Policy Group id Is', policyGroupId);
        await policyPage.searchPolicyGroup(baseSurface, policyGroupName);
        await ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
    });

    it('Step 4: Verify Approval Request To Publish Policy Group', async function (): Promise<any> {
        await approvals.VerifyPublishedApprovalRequest(baseSurface, policyGroupId);
        // await ExpectHelper.isListElementExists(approvals.approvalList, policyGroupId);
    });

    it('Step 5: Approve Publish Request For Policy Group', async function (): Promise<any> {
        await approvals.ApprovalAction(baseSurface, policyGroupId);
    });

    it('Step 6: Create New Cloud Role', async function (): Promise<any> {
        await cloudRole.createCloudRole(baseSurface, cloudRoleName, cloudRoleDescription, provider, 'DRAFT', amazonAction, amazonNonAction);
        await ExpectHelper.isListElementExists(cloudRole.list, cloudRoleName);
        cloudRoleId = await getIdFromUrl();
        await console.log('Cloud Role id is', cloudRoleId);
    });

    it('Step 7: Create New Group', async function (): Promise<any> {
        await group.createGroup(baseSurface, groupName, groupDescription, 0);
        await ExpectHelper.isListElementExists(group.groupList, groupName);
        groupId = await group.getId();
        await console.log('Group id is', groupId);
    });

    it('Step 8: Asign User For New Group', async function (): Promise<any> {
        await group.assignUserForGroup(baseSurface, groupName, user, 0);
        await ExpectHelper.isListElementExists(group.groupList, groupName);
    });

    it('Step 9: Add Role Assignment For Group', async function (): Promise<any> {
        // Assigning Roles For Group
        await group.addRoleToGroup(baseSurface, groupName, role, responsibilities, organization);
        await ExpectHelper.isListElementExists(group.groupList, groupName);
    });

    it('Step 10: Add Cloud Role For Group', async function (): Promise<any> {
        await group.assignCloudRoleForGroup(baseSurface, groupName, 0, cloudRoles);
        await ExpectHelper.isListElementExists(group.groupList, groupName);
    });

    it('Step 11: Publish New Cloud Role', async function (): Promise<any> {
        await cloudRole.publishCloudRole(baseSurface, cloudRoleName, cloudRoleDescription);
        await ExpectHelper.isListElementExists(cloudRole.list, cloudRoleName);
        publishedCloudRoleId = await getIdFromUrl();
        await console.log('Cloud Role id is', publishedCloudRoleId);
    });

    it('Step 12: Verify Approval Request To Publish Cloud Role', async function (): Promise<any> {
        await approvals.VerifyPublishedApprovalRequest(baseSurface, publishedCloudRoleId);
        // await ExpectHelper.isListElementExists(approvals.approvalList, publishedCloudRoleId);
    });

    it('Step 13: Approve Publish Request For Cloud Role', async function (): Promise<any> {
        await approvals.ApprovalAction(baseSurface, publishedCloudRoleId);
    });

    it('Step 14: Delete Cloud Role', async function (): Promise<any> {
        await cloudRole.deleteCloudRole(baseSurface, cloudRoleName, 'false');
        await browser.refresh();
    });

    it('Step 15: Verify Approval Request To Delete Cloud Role', async function (): Promise<any> {
        await approvals.VerifyDeleteApprovalRequest(baseSurface, publishedCloudRoleId);
        // await ExpectHelper.isListElementExists(approvals.approvalList, publishedCloudRoleId);
    });

    it('Step 16: Remove Cloud Role From Group', async function (): Promise<any> {
        await group.removeCloudRolesFromGroup(baseSurface, groupName, 1, cloudRoles);
    });

    it('Step 17: Approve Delete Action For Cloud Role', async function (): Promise<any> {
        await approvals.ApprovalAction(baseSurface, publishedCloudRoleId);
    });

    it('Step 18: Verify Cloud Role is Deleted Or Not', async function (): Promise<any> {
        await cloudRole.verifyCloudRole(baseSurface, cloudRoleName);
    });

    it('Step 19: Approval Request to Delete Policy Group', async function (): Promise<any> {
        await approvals.DeleteApprovalRequest(baseSurface, policyGroupName);
    });

    it('Step 20: Verify Approval Request to Delete Policy Group', async function (): Promise<any> {
        await approvals.VerifyDeleteApprovalRequest(baseSurface, policyGroupId);
        // await ExpectHelper.isListElementExists(approvals.approvalList, policyGroupId);
    });

    it('Step 21: Approve Delete Request For Policy Group', async function (): Promise<any> {
        await approvals.ApprovalAction(baseSurface, policyGroupId);
    });

    it('Step 22: Remove Role Assignment From Group', async function (): Promise<any> {
        // Removing Role From Group
        await group.removeRolesFromGroup(baseSurface, groupName, role);
        await ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(role));
    });

    it('Step 23: Remove User From Group', async function (): Promise<any> {
        // Removing User From Group
        await group.removeUserForGroup(baseSurface, groupName, user);
        await ExpectHelper.expectDoesNotExists(group.selectUserToDelete(groupName));
    });

    it('Step 24: De-associate Group From Surface', async function (): Promise<any> {
        //  De-associate Group
        await group.dissociateGroup(baseSurface, groupName, groupId);
    });

    it('Step 25: Delete Group', async function (): Promise<any> {
        //  Deleting Group
        await group.deleteGroup(baseSurface, groupName);
    });

    it('Step 26 CleanUp', async function (): Promise<any> {
        await policyGroupTemplatePage.deletePolicyGroupTemplate(baseSurface, policyGroupTemplateName, 'false');
        await attributeTag.deleteAttributeTag(baseSurface, attributeTagName, 'false');
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

});