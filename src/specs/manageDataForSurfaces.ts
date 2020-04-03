import { browser, ExpectedConditions } from 'protractor';
import { ExpectHelper } from '../utils/expectHelper';
import { Surface } from '../pageObjects/surfaces.Po';
import { Group } from '../pageObjects/groups.Po';

describe('Surface Data Creation Concourse ', async function () {
    let originalTimeout;
    let EC = ExpectedConditions;
    let properties = require('../conf/properties');
    let surface = new Surface();
    let group = new Group();
    let surfaceName = properties.SurfaceData.surfaceName + surface.getRandomNum(1, 1000);
    let description = properties.SurfaceData.surfacedesc;
    let groupName = surfaceName + properties.SurfaceData.defaultGroup;
    let user = properties.groupData.user;
    let baseSurface = properties.SurfaceData.surfaceName;
    let awsAccount = [properties.SurfaceData.dataForAWSAccount];
    let azureAccount = [properties.SurfaceData.dataForAzureSubscription];
    let accountKey = properties.SurfaceData.accountKey + surface.getRandomNum(1, 1000);
    let keyValue = properties.SurfaceData.keyValue + surface.getRandomNum(1, 1000);
    let institutionAdminRole = ['Institution Admin'];
    let identityAdminRole = ['Identity Admin'];
    let surfaceAdminRole = ['Surface Admin'];
    let roles = ['Surface Admin', 'Institution Admin', 'Identity Admin'];
    let groupId;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
    });

    it('Step 1: Create New Surface', async function (): Promise<any> {
        await surface.createNewSurface(baseSurface, surfaceName, description, 'E2E Admin');
    });

    it('Step 2: Create Azure Data For Surface', async function (): Promise<any> {
        await surface.createDataForSurface(surfaceName, azureAccount, 0, accountKey, keyValue);
    });

    it('Step 3: Create AWS Data For Surface', async function (): Promise<any> {
        await surface.createDataForSurface(surfaceName, awsAccount, 0, accountKey, keyValue);
    });

    it('Step 4: Update AWS Data For Surface', async function (): Promise<any> {
        await surface.editDataForSurface(surfaceName, 2, 1, accountKey, keyValue);
    });

    it('Step 5: Delete AWS Account Data For Surface', async function (): Promise<any> {
        await surface.deleteDataAccount(surfaceName, awsAccount, 2);
    });

    it('Step 6: Delete AZURE Account Data For Surface', async function (): Promise<any> {
        await surface.deleteDataAccount(surfaceName, azureAccount, 1);
    });

    it('Step 7: Search Default Group For New Surface', async function (): Promise<any> {
        await group.searchGroupName(surfaceName, groupName);
        groupId = await group.getId();
        await console.log('Group id is', groupId);
        await browser.sleep(5000);
        await ExpectHelper.isListElementExists(group.groupList, groupName);
    });

    it('Step 8: Deassociate Group', async function (): Promise<any> {
        await group.dissociateGroup(surfaceName, groupId);
    });

    it('Step 9: Remove Institution Admin Role From Group', async function (): Promise<any> {
        await group.removeRolesFromGroup(surfaceName, groupName, surfaceAdminRole);
        await ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(surfaceAdminRole));
    });

    it('Step 10: Remove Identity Admin Role From Group', async function (): Promise<any> {
        await group.removeRolesFromGroup(surfaceName, groupName, institutionAdminRole);
        await ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(institutionAdminRole));
    });

    it('Step 11: Remove Surface Admin Role From Group', async function (): Promise<any> {
        await group.removeRolesFromGroup(surfaceName, groupName, identityAdminRole);
        await ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(identityAdminRole));
    });

    it('Step 12: Delete Surface', async function (): Promise<any> {
        await surface.deleteSurface(surfaceName);
    });

    it('Step 13: Remove User From Group', async function (): Promise<any> {
        // Removing User From Group
        await group.removeUserForGroup(surfaceName, groupName, user);
        await ExpectHelper.expectDoesNotExists(group.selectUserToDelete(groupName));
    });

    it('Step 14: Delete Group', async function (): Promise<any> {
        //  Deleting Group
        await group.deleteGroup(baseSurface, groupName);
    });

    it('Step 15: Verify Surface', async function (): Promise<any> {
        await surface.verifySurface(surfaceName);
        await ExpectHelper.expectDoesNotExists(surface.selectsurface(surfaceName));
    });


    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

});