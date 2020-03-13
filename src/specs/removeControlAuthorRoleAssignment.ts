import { ExpectedConditions, browser } from 'protractor';
import { ExpectHelper } from '../utils/expectHelper';
import { Group } from '../pageObjects/groups.Po';
import { Surface } from '../pageObjects/surfaces.Po';
import { AttributeTag } from '../pageObjects/attributeTags.Po';
import { PolicyGroup } from '../pageObjects/policyGroup.Po';
import { PolicyGroupTemplatePage } from '../pageObjects/policyGroupTemplate.Po';
import { getIdFromUrl } from '../utils/utils';

describe('Deleting Control Author Role Assignment with dependent Policy Group', async function () {
    let group = new Group();
    let surface = new Surface();
    let originalTimeout;
    let properties = require('../conf/properties');
    let controlAuthorRole = ['Control Author'];
    let responsibilities = ['Manage Policy Group Templates', 'Manage Policy Groups', 'View Reports'];
    let rootSurfaceLayer = ['Default Surface - Root Surface Layer'];
    let attributeTag = new AttributeTag();
    let policyPage = new PolicyGroup();
    let policyGroupTemplatePage = new PolicyGroupTemplatePage();
    let user = properties.groupData.user;
    let groupName = properties.groupData.groupName + group.getRandomNum(1, 1000);
    let groupDescription = properties.groupData.groupDescription;
    let policyGroupTemplateName = properties.policyGroupTemplateData.policyGroupTemplateNameWithAWSProducts + policyGroupTemplatePage.getRandomNum(1, 1000);
    let policyGroupTemplatedesc = properties.policyGroupTemplateData.policyGroupTemplateDescWithAWSProducts;
    let policyGroupName = properties.policyGroupData.violationPolicyGroupName + policyPage.getRandomNum(1, 1000);
    let policyGroupDescription = properties.policyGroupData.violationPolicyGroupDescription;
    let attributeTagName = properties.attributeTagData.attributeName1 + attributeTag.getRandomNum(1, 1000);
    let attributeTagdescription = properties.attributeTagData.attributeDescription1;
    let baseSurface = properties.SurfaceData.surfaceName;
    let service = ['AWS::EC2'];
    let groupId;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
    });

    it('Step 1: Create New Group', async function (): Promise<any> {
        // Creating New Group
        await group.createGroup(baseSurface, groupName, groupDescription, 0);
        // Verify if the Group is created
        await ExpectHelper.isListElementExists(group.groupList, groupName);
        groupId = await group.getId();
        await console.log('Group id is', groupId);
        await console.log('Group Name Is: ', groupName);
        await browser.refresh();
    });

    it('Step 2: Asign User For New Group', async function (): Promise<any> {
        // Assigning User For Newly Created Group
        await group.assignUserForGroup(baseSurface, groupName, user, 0);
        await ExpectHelper.isListElementExists(group.groupList, groupName);
        await browser.refresh();
    });

    it('Step 3: Add Role Assignment For Group', async function (): Promise<any> {
        // Assigning Roles For Group
        await group.addRoleToGroup(baseSurface, groupName, controlAuthorRole, responsibilities, rootSurfaceLayer);
        await ExpectHelper.isListElementExists(group.groupList, groupName);
    });

    it('Step 4: Create Attribute Tag', async function (): Promise<any> {
        // Creating Attribute Tag
        await attributeTag.createAttributeTag(baseSurface, attributeTagName, attributeTagdescription);
        await attributeTag.searchAttribute(baseSurface, attributeTagName, 'Description');
        await ExpectHelper.isListElementExists(attributeTag.list, attributeTagName);
    });

    it('Step 5: Creating Policy Group Template', async function (): Promise<any> {
        // Creating Policy Group Template
        await policyGroupTemplatePage.createPolicyGroupTemplate(baseSurface, 'PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Allowed AWS Products in Stacks');
        await policyGroupTemplatePage.searchPolicyGroupTemplate(baseSurface, policyGroupTemplateName);
        await ExpectHelper.isListElementExists(policyGroupTemplatePage.list, policyGroupTemplateName);
        await console.log('Policy Group Template name is', policyGroupTemplateName);
    });

    it('Step 6: Creating Policy Group', async function (): Promise<any> {
        // // Creating Policy Group
        await policyPage.createPolicyGroup(baseSurface, policyGroupName, policyGroupDescription, groupName, 'PUBLISHED', policyGroupTemplateName, attributeTagName, service, 'Default Surface - Root Surface Layer', ' ', ' ', 'Allowed AWS Products in Stacks 1');
        let policyGroupId = await getIdFromUrl();
        await console.log('Policy Group name is', policyGroupId);
        await console.log('Policy Group name is', policyGroupName);
        await policyPage.searchPolicyGroup(baseSurface, policyGroupName);
        await ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
    });

    it('Step 7: Try To Remove Role Assignment From Group with dependent Policy Group', async function (): Promise<any> {
        // Removing Role From Group
        await group.removeRolesFromGroup(baseSurface, groupName, controlAuthorRole);
        await ExpectHelper.verifyContainsText(group.alertWindow, 'alertWindow', 'Cannot remove role because owned Policy Group will no longer be permitted on their Surface Layer(s).');
        await browser.refresh();
    });

    it('Step 8: Deleting Policy Group', async function (): Promise<any> {
        await policyPage.deletePolicyGroup(baseSurface, policyGroupName, 'false');
        await policyPage.searchPolicyGroup(baseSurface, policyGroupName);
        await ExpectHelper.expectDoesNotExists(policyPage.searchPolicyGroupName(policyGroupName));
    });

    it('Step 9: Remove Role Assignment From Group After Deleting Dependent Policy Group', async function (): Promise<any> {
        // Removing Role From Group
        await group.removeRolesFromGroup(baseSurface, groupName, controlAuthorRole);
        await ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(controlAuthorRole));
    });

    it('Step 10: Verify Role Assignment Removed Or Not', async function (): Promise<any> {
        // Verifying the Role is Removed Or Not
        await group.verifyRolesInUI(baseSurface, groupName, controlAuthorRole);
        await ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(controlAuthorRole));
    });

    it('Step 11: Add Role Assignment again For Group', async function (): Promise<any> {
        // Assigning Roles For Group
        await group.addRoleToGroup(baseSurface, groupName, controlAuthorRole, responsibilities, rootSurfaceLayer);
        await ExpectHelper.isListElementExists(group.groupList, groupName);
    });

    it('Step 12: Delete Policy Group Template', async function (): Promise<any> {
        // Delete The Policy Group Template
        await policyGroupTemplatePage.deletePolicyGroupTemplate(baseSurface, policyGroupTemplateName, 'false');
    });

    it('Step 13: Delete Attribute Tag', async function (): Promise<any> {
        // Deleting Attribute Tag
        await attributeTag.deleteAttributeTag(baseSurface, attributeTagName, 'false');
    });

    it('Step 14: Remove Role Assignment From Group', async function (): Promise<any> {
        // Removing Role From Group
        await group.removeRolesFromGroup(baseSurface, groupName, controlAuthorRole);
        await ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(controlAuthorRole));
    });

    it('Step 15: Remove User From Group', async function (): Promise<any> {
        // Removing User From Group
        await group.removeUserForGroup(baseSurface, groupName, user);
        await ExpectHelper.expectDoesNotExists(group.selectUserToDelete(groupName));
    });

    it('Step 16: Deassociate Group', async function (): Promise<any> {
        //  Deleting Group
        await group.dissociateGroup(baseSurface, groupName, groupId);
    });

    it('Step 17: Delete Group', async function (): Promise<any> {
        //  Deleting Group
        await group.deleteGroup(baseSurface, groupName);
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});