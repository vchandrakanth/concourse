import { ExpectedConditions } from 'protractor';
import { ExpectHelper } from '../utils/expectHelper';
import { Group } from '../pageObjects/groups.Po';
import { Surface } from '../pageObjects/surfaces.Po';

describe('Creaing Groups Concourse ', async function () {
    let originalTimeout;
    let EC = ExpectedConditions;
    let group = new Group();
    let surface = new Surface();
    // let verifyUserPermissions = new VerifyUserPermissions();
    let properties = require('../conf/properties');
    let groupName = properties.groupData.groupName + group.getRandomNum(1, 1000);
    let groupDescription = properties.groupData.groupDescription;
    let user = properties.groupData.user;
    let role = ['Business Operator'];
    let responsibilities = ['Manage Deployments'];
    let organization = ['Default Surface - Root Surface Layer'];
    let role1 = ['Report User'];
    let responsibilities1 = ['View Reports'];
    let surfaceName = properties.SurfaceData.surfaceName;
    let groupId;

   beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;
    });

    it('Step 1: Create New Group', async function (): Promise<any> {
        // Creating New Group
        await group.createGroup(groupName, groupDescription, 0);
        // Verify if the Group is created
        await ExpectHelper.isListElementExists(group.groupList, groupName);
        groupId = await group.getId();
        await console.log('Group id is', groupId);
    });

    it('Step 2: Asign User For New Group', async function (): Promise<any> {
        // Assigning User For Newly Created Group
        await group.assignUserForGroup(groupName, user, 0);
        await ExpectHelper.isListElementExists(group.groupList, groupName);
    });

    it('Step 3: Add Role Assignment For Group', async function (): Promise<any> {
        // Assigning Roles For Group
        await group.addRoleToGroup(groupName, role, responsibilities, organization);
        await ExpectHelper.isListElementExists(group.groupList, groupName);
    });

    it('Step 4: Add Another Role Assignment For Group', async function (): Promise<any> {
        // Assigning Another Role For Group
        await group.addRoleToGroup(groupName, role1, responsibilities1, organization);
        await ExpectHelper.isListElementExists(group.groupList, groupName);
    });

    it('Step 5: Remove Role Assignment From Group', async function (): Promise<any> {
        // Removing Role From Group
        await group.removeRolesFromGroup(groupName, role);
        await ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(role));
    });

    it('Step 6: Verify Role Assignment Removed Or Not', async function (): Promise<any> {
        // Verifying the Role is Removed Or Not
        await group.verifyRolesInUI(groupName, role);
        await ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(role));
    });

    it('Step 7: Remove User From Group', async function (): Promise<any> {
        // Removing User From Group
        await group.removeUserForGroup(groupName, user);
        await ExpectHelper.expectDoesNotExists(group.selectUserToDelete(groupName));
    });

    it('Step 8: Deassociate Group', async function (): Promise<any> {
        //  Deleting Group
        await group.deAssociateGroup(surfaceName, groupId);
        // await ExpectHelper.expectDoesNotExists(groupName);
    });

    it('Step 9: Delete Group', async function (): Promise<any> {
        //  Deleting Group
        await group.deleteGroup(groupName);
        // await ExpectHelper.expectDoesNotExists(groupName);
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});