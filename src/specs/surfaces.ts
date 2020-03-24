import { browser, ExpectedConditions } from 'protractor';
import { ExpectHelper } from '../utils/expectHelper';
import { Surface } from '../pageObjects/surfaces.Po';
import { Group } from '../pageObjects/groups.Po';

describe('Surface Creation Concourse ', async function () {
    let originalTimeout;
    let EC = ExpectedConditions;
    let properties = require('../conf/properties');
    let surface = new Surface();
    let group = new Group();
    let surfaceName = properties.SurfaceData.surfaceName + surface.getRandomNum(1, 1000);
    let description = properties.SurfaceData.surfacedesc;
    let institutionAdminRole = ['Institution Admin'];
    let identityAdminRole = ['Identity Admin'];
    let permissionAdminRole = ['Permission Admin'];
    let surfaceAdminRole = ['Surface Admin'];
    let roles = ['Surface Admin', 'Institution Admin', 'Identity Admin'];
    let groupName = surfaceName + properties.SurfaceData.defaultGroup;
    let user = properties.groupData.user;
    let baseSurface = properties.SurfaceData.surfaceName;
    let groupId;


    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
    });

    it('Step 1: Create New Surface', async function (): Promise<any> {
        await surface.createNewSurface(baseSurface, surfaceName, description, 'E2E Admin');
    });

    it('Step 2: Search Default Group For New Surface', async function (): Promise<any> {
        await group.searchGroupName(surfaceName, groupName);
        groupId = await group.getId();
        await console.log('Group id is', groupId);
        await ExpectHelper.isListElementExists(group.groupList, groupName);
    });

    it('Step 3: Remove Identity Admin Role From Group', async function (): Promise<any> {
        await group.removeRolesFromGroup(surfaceName, groupName, identityAdminRole);
        await ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(identityAdminRole));
    });

    it('Step 4: Remove Identity Admin Role From Group', async function (): Promise<any> {
        await group.removeRolesFromGroup(surfaceName, groupName, institutionAdminRole);
        await ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(institutionAdminRole));
    });

    it('Step 5: Remove Permission Admin Role From Group', async function (): Promise<any> {
        await group.removeRolesFromGroup(surfaceName, groupName, permissionAdminRole);
        await ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(permissionAdminRole));
    });

    it('Step 6: Remove Surface Admin Role From Group', async function (): Promise<any> {
        await group.removeRolesFromGroup(surfaceName, groupName, surfaceAdminRole);
        await ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(surfaceAdminRole));
    });

    it('Step 7: Deassociate Group', async function (): Promise<any> {
        //  DeAssociate Group
        await group.dissociateGroup(surfaceName, groupName, groupId);
    });

    it('Step 8: Delete Surface', async function (): Promise<any> {
        await surface.deleteSurface(surfaceName);
    });

    it('Step 9: Verify Surface', async function (): Promise<any> {
        await surface.verifySurface(surfaceName);
        await ExpectHelper.expectDoesNotExists(surface.selectsurface(surfaceName));
    });

    it('Step 10: Remove User From Group', async function (): Promise<any> {
        await group.removeUserForGroup(baseSurface, groupName, user);
    });

    it('Step 11: Delete Group', async function (): Promise<any> {
        //  Deleting Group
        await group.deleteGroup(baseSurface, groupName);
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

});