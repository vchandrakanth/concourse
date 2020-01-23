import { ExpectedConditions } from 'protractor';
import { ExpectHelper } from '../utils/expectHelper';
import { CloudRoles } from '../pageObjects/cloudRoles.Po';
import { getIdFromUrl } from '../utils/utils';
import { Group } from '../pageObjects/groups.Po';


describe('Creating Cloud Roles', async function () {
    let originalTimeout;
    let EC = ExpectedConditions;
    let cloudRole = new CloudRoles();
    let group = new Group();
    let properties = require('../conf/properties');
    let cloudRoleName = properties.CloudRolesData.cloudRoleName + cloudRole.getRandomNum(1, 1000);
    let description = properties.CloudRolesData.cloudRoleDesc;
    let provider = properties.CloudRolesData.amazonProvider;
    let amazonAction = ['a4b:DisassociateDeviceFromRoom'];
    let amazonNonAction = ['a4b:DeleteUser'];
    let azureAction = ['operations/read'];
    let azureNonAction = ['virtualMachines/write'];
    let amazonEditAction = ['a4b:AssociateDeviceWithRoom'];
    let amazonEditNonAction = ['a4b:PutConferencePreference'];
    let azureEditAction = ['servers/listSecrets/action'];
    let azureEditNonAction = ['virtualMachines/delete'];
    let baseSurface = properties.SurfaceData.surfaceName;
    let groupName = properties.groupData.groupName + group.getRandomNum(1, 1000);
    let groupDescription = properties.groupData.groupDescription;
    let user = properties.groupData.user;
    let updatedCloudRole = [cloudRoleName + ' Updated'];
    let cloudRoles = [cloudRoleName];
    let roleId;
    let groupId;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
    });

    it('Step 1: Create New Cloud Role', async function (): Promise<any> {
        await cloudRole.createCloudRole(baseSurface, cloudRoleName, description, provider, 'DRAFT', amazonAction, amazonNonAction);
        await ExpectHelper.isListElementExists(cloudRole.list, cloudRoleName);
        roleId = await getIdFromUrl();
        await console.log('Cloud Role id is', roleId);
    });

    it('Step 2: Create New Group', async function (): Promise<any> {
        await group.createGroup(baseSurface, groupName, groupDescription, 0);
        await ExpectHelper.isListElementExists(group.groupList, groupName);
        groupId = await group.getId();
        await console.log('Group id is', groupId);
    });

    it('Step 3: Asign User For New Group', async function (): Promise<any> {
        await group.assignUserForGroup(baseSurface, groupName, user, 0);
        await ExpectHelper.isListElementExists(group.groupList, groupName);
    });

    it('Step 4: Add Cloud Role For Group', async function (): Promise<any> {
        await group.assignCloudRoleForGroup(baseSurface, groupName, 0, cloudRoles);
        await ExpectHelper.isListElementExists(group.groupList, groupName);
    });

    it('Step 5: Edit AWS Action and Publish', async function (): Promise<any> {
        await cloudRole.editAWSAction(baseSurface, cloudRoleName, amazonEditAction);
    });

    it('Step 6: Edit AWS Non Action and Publish', async function (): Promise<any> {
        await cloudRole.editAWSNonAction(baseSurface, cloudRoleName, amazonEditNonAction);
    });

    it('Step 7: Edit AWS Non Action and Publish', async function (): Promise<any> {
        await cloudRole.editAzureAction(baseSurface, cloudRoleName, azureEditAction);
    });

    it('Step 8: Edit AWS Non Action and Publish', async function (): Promise<any> {
        await cloudRole.editAzureNonAction(baseSurface, cloudRoleName, azureEditNonAction);
    });

    it('Step 9: Edit Cloud Role', async function (): Promise<any> {
        await cloudRole.editCloudRoleNameAndPublish(baseSurface, cloudRoleName, description);
        await cloudRole.searchCloudRole(baseSurface, cloudRoleName + ' Updated');
        await ExpectHelper.isListElementExists(cloudRole.list, cloudRoleName + ' Updated');
    });

    it('Step 10: Remove Cloud Role', async function (): Promise<any> {
        await group.removeCloudRolesFromGroup(baseSurface, groupName, 1, updatedCloudRole);
    });

    it('Step 11: Remove User From Group', async function (): Promise<any> {
        await group.removeUserForGroup(baseSurface, groupName, user);
        await ExpectHelper.expectDoesNotExists(group.selectUserToDelete(groupName));
    });

    it('Step 12: De-associate Group From Surface', async function (): Promise<any> {
        await group.dissociateGroup(baseSurface, groupName, groupId);
    });

    it('Step 13: Delete Group', async function (): Promise<any> {
        await group.deleteGroup(baseSurface, groupName);
    });

    it('Step 14: Delete Cloud Role', async function (): Promise<any> {
        await cloudRole.deleteCloudRole(baseSurface, cloudRoleName);
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});