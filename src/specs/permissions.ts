import { ExpectedConditions, browser, element, by } from 'protractor';
import { ExpectHelper } from '../utils/expectHelper';
import { Group } from '../pageObjects/groups.Po';
import { Surface } from '../pageObjects/surfaces.Po';
import { VerifyUserPermissions } from '../pageObjects/permissions.Po';
import { AssetManager } from '../pageObjects/assetManager.Po';
import { LoginPage } from '../pageObjects/login.Po';
import { AttributeTag } from '../pageObjects/attributeTags.Po';

describe('Verifying Permissions Concourse ', async function () {
    let originalTimeout;
    let EC = ExpectedConditions;
    let group = new Group();
    let surface = new Surface();
    let attributeTag = new AttributeTag();
    let loginPage = new LoginPage();
    let assetsManager = new AssetManager();
    let verifyUserPermissions = new VerifyUserPermissions();
    let properties = require('../conf/properties');
    let surfaceName = properties.SurfaceData.surfaceName;
    // let groupName = properties.groupData.groupName + group.getRandomNum(1, 1000);
    let groupName = 'User Permissions';
    let e2eTestUser = properties.UserPermissionData.e2eTestUser;
    let password = properties.UserPermissionData.password;
    let username = properties.loginData.username;
    let module1 = properties.UserPermissionData.module1;
    let module2 = properties.UserPermissionData.module2;
    let module3 = properties.UserPermissionData.module3;
    let module4 = properties.UserPermissionData.module4;
    let module5 = properties.UserPermissionData.module5;
    let module6 = properties.UserPermissionData.module6;
    let module7 = properties.UserPermissionData.module7;
    let module8 = properties.UserPermissionData.module8;
    let role1 = ['Business Author'];
    let responsibilities1 = ['Manage Attribute Tags', 'Manage Models', 'Manage Baselines', 'View Reports'];
    let organization = ['Default Surface - Root Surface Layer'];
    let role2 = ['Control Author'];
    let responsibilities2 = ['Manage Policy Group Templates', 'Manage Policy Groups', 'View Reports'];
    let role3 = ['Business Operator'];
    let responsibilities3 = ['Manage Deployments', 'View Reports'];
    let role4 = ['Institution Admin'];
    let responsibilities4 = ['Manage Institutions', 'Manage Surfaces', 'Manage Cloud Roles'];
    let role5 = ['Identity Admin'];
    let responsibilities5 = ['Manage Groups', 'Manage Users', 'View Reports'];
    let AttributeTagName = 'User Permissions';
    let AssetName = 'User Permissions';
    let PolicyGroupTemplateName = 'User Permissions';
    let PolicyGroupName = 'User Permissions';
    let GroupName = 'User Permissions';

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 400000;
    });

    it('Step 1: Verify Business Author Permissions For User1', async function (): Promise<any> {

        // await group.addRoleToGroup(surfaceName, GroupName, role1, responsibilities1, organization);
        await group.addRoleToGroup(surfaceName, groupName, role1, responsibilities1, organization);
        await browser.sleep(2000);
        await group.reLogin(username, e2eTestUser, password);
        await verifyUserPermissions.VerifyPermissionGranted(module1, AssetName);
        await ExpectHelper.expectExists(verifyUserPermissions.buttonEdit);
        await console.log('User1 Has Edit Asset Permission');
        await ExpectHelper.expectExists(verifyUserPermissions.buttonDelete);
        await console.log('User1 Has Delete Asset Permission');

        await verifyUserPermissions.VerifyPermissionGranted(module2, AttributeTagName);
        await ExpectHelper.isListElementExists(element(by.css('#page-actions-container')), 'NEW ATTRIBUTE TAG');
        await console.log('User1 Has Create New Attribute Tag Permission');
        await ExpectHelper.expectExists(verifyUserPermissions.buttonEdit);
        await console.log('User1 Has Edit Attribute Tag Permission');
        await ExpectHelper.expectExists(verifyUserPermissions.buttonDelete);
        await console.log('User1 Has Delete Attribute Tag Permission');

        await verifyUserPermissions.VerifyPermissionNotGranted(module3);
        await ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW POLICY GROUP TEMPLATE'));
        await console.log('User1 Does Not Have Permission For POLICY GROUP TEMPLATES');

        await verifyUserPermissions.VerifyPermissionNotGranted(module4);
        await ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW POLICY GROUP'));
        await console.log('User1 Does Not Have Permission For POLICY GROUPS');

        await verifyUserPermissions.VerifyPermissionNotGranted(module5);
        await ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW SURFACE'));
        await console.log('User1 Does Not Have Permission For SURFACES');

        await verifyUserPermissions.VerifyPermissionNotGranted(module6);
        await ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW INSTITUTION DATA'));
        await console.log('User1 Does Not Have Permission For INSTITUTION DATA');

        await verifyUserPermissions.VerifyPermissionNotGranted(module7);
        await ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW GROUP'));
        await console.log('User1 Does Not Have Permission For GROUPS');

        await group.reLogin(e2eTestUser, username, password);
        await group.removeRolesFromGroup(surfaceName, GroupName, role1);
    });

    it('Step 2: Verify Control Author Permissions For User2', async function (): Promise<any> {

        await group.addRoleToGroup(surfaceName, GroupName, role2, responsibilities2, organization);
        await group.reLogin(username, e2eTestUser, password);
        await browser.sleep(2000);
        await verifyUserPermissions.VerifyPermissionGranted(module3, PolicyGroupTemplateName);
        await ExpectHelper.isListElementExists(element(by.css('#page-actions-container')), 'NEW POLICY GROUP TEMPLATE');
        await console.log('User2 Has Create New Policy Group Template Permission');
        await ExpectHelper.expectExists(verifyUserPermissions.buttonEdit);
        await console.log('User2 Has Edit Policy Group Template Permission');
        await ExpectHelper.expectExists(verifyUserPermissions.buttonDelete);
        await console.log('User2 Has Delete Policy Group Template Permission');

        await verifyUserPermissions.VerifyPermissionGranted(module4, PolicyGroupName);
        await ExpectHelper.isListElementExists(element(by.css('#page-actions-container')), 'NEW POLICY GROUP');
        await console.log('User2 Has Create New Policy Group Permission');
        await ExpectHelper.expectExists(verifyUserPermissions.buttonEdit);
        await console.log('User2 Has Edit Policy Group Permission');
        await ExpectHelper.expectExists(verifyUserPermissions.buttonDelete);
        await console.log('User2 Has Delete Policy Group Permission');

        await verifyUserPermissions.VerifyPermissionNotGranted(module2);
        await ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW ATTRIBUTE TAG'));
        await console.log('User2 Does Not Have Permission For ATTRIBUTE TAGS');

        await verifyUserPermissions.VerifyPermissionNotGranted(module1);
        await ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW ASSET'));
        await console.log('User2 Does Not Have Permission For ASSETS');

        await verifyUserPermissions.VerifyPermissionNotGranted(module5);
        await ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW SURFACE'));
        await console.log('User2 Does Not Have Permission For SURFACES');

        await verifyUserPermissions.VerifyPermissionNotGranted(module6);
        await ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW INSTITUTION DATA'));
        await console.log('User2 Does Not Have Permission For INSTITUTION DATA');

        await verifyUserPermissions.VerifyPermissionNotGranted(module7);
        await ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW GROUP'));
        await console.log('User2 Does Not Have Permission For GROUPS');

        await group.reLogin(e2eTestUser, username, password);
        await group.removeRolesFromGroup(surfaceName, GroupName, role2);
    });

    it('Step 3: Verify Business Operator Permissions For User3', async function (): Promise<any> {
        await group.addRoleToGroup(surfaceName, GroupName, role3, responsibilities3);
        await group.reLogin(username, e2eTestUser, password);
        await browser.sleep(2000);
        await verifyUserPermissions.VerifyPermissionGranted(module1, AssetName);
        await console.log('User3 Has Deployment Permission');

        await verifyUserPermissions.VerifyPermissionNotGranted(module2);
        await ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW ATTRIBUTE TAG'));
        await console.log('User3 Does Not Have Permission For ATTRIBUTE TAGS');

        await verifyUserPermissions.VerifyPermissionNotGranted(module1);
        await ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW ASSET'));
        await console.log('User3 Does Not Have Permission For ASSETS');

        await verifyUserPermissions.VerifyPermissionNotGranted(module5);
        await ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW SURFACE'));
        await console.log('User3 Does Not Have Permission For SURFACES');

        await verifyUserPermissions.VerifyPermissionNotGranted(module6);
        await ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW INSTITUTION DATA'));
        await console.log('User3 Does Not Have Permission For INSTITUTION DATA');

        await verifyUserPermissions.VerifyPermissionNotGranted(module7);
        await ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW GROUP'));
        await console.log('User3 Does Not Have Permission For GROUPS');

        await verifyUserPermissions.VerifyPermissionNotGranted(module3);
        await ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW POLICY GROUP TEMPLATE'));
        await console.log('User3 Does Not Have Permission For POLICY GROUP TEMPLATES');

        await verifyUserPermissions.VerifyPermissionNotGranted(module4);
        await ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW POLICY GROUP'));
        await console.log('User3 Does Not Have Permission For POLICY GROUPS');

        await group.reLogin(e2eTestUser, username, password);
        await group.removeRolesFromGroup(surfaceName, GroupName, role3);
    });

    it('Step 4: Verify Institution Admin Permissions For User4', async function (): Promise<any> {

        await group.addRoleToGroup(surfaceName, GroupName, role4, responsibilities4);
        await group.reLogin(username, e2eTestUser, password);
        await browser.sleep(2000);
        await verifyUserPermissions.VerifyPermissionGranted(module5, 'surfaceName');
        await ExpectHelper.isListElementExists(element(by.css('#page-actions-container')), 'NEW SURFACE');
        await console.log('User4 Has Create New Surface Permission');

        await verifyUserPermissions.VerifyPermissionGranted(module6, 'institutions');
        await ExpectHelper.isListElementExists(element(by.css('#page-actions-container')), 'NEW INSTITUTION DATA');
        await console.log('User4 Has Create New Institution Permission');

        await verifyUserPermissions.VerifyPermissionNotGranted(module1);
        await ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW ASSET'));
        await console.log('User4 Does Not Have Permission For ASSETS');

        await verifyUserPermissions.VerifyPermissionNotGranted(module3);
        await ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW POLICY GROUP TEMPLATE'));
        await console.log('User4 Does Not Have Permission For POLICY GROUP TEMPLATES');

        await verifyUserPermissions.VerifyPermissionNotGranted(module4);
        await ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW POLICY GROUP'));
        await console.log('User4 Does Not Have Permission For POLICY GROUPS');

        await verifyUserPermissions.VerifyPermissionNotGranted(module7);
        await ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW GROUP'));
        await console.log('User4 Does Not Have Permission For GROUPS');

        await verifyUserPermissions.VerifyPermissionNotGranted(module2);
        await ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW ATTRIBUTE TAG'));
        await console.log('User4 Does Not Have Permission For ATTRIBUTE TAGS');

        await group.reLogin(e2eTestUser, username, password);
        await group.removeRolesFromGroup(surfaceName, GroupName, role4);
    });

    it('Step 5: Verify Identity Admin Permissions For User5', async function (): Promise<any> {

        await group.addRoleToGroup(surfaceName, GroupName, role5, responsibilities5, organization);
        await group.reLogin(username, e2eTestUser, password);
        await browser.sleep(2000);
        await verifyUserPermissions.VerifyPermissionGranted(module7, GroupName);
        await ExpectHelper.isListElementExists(element(by.css('#page-actions-container')), 'NEW GROUP');
        await console.log('User5 Has Create New Group Permission');
        await ExpectHelper.expectExists(verifyUserPermissions.buttonEdit);
        await console.log('User5 Has Edit Group Permission');
        await ExpectHelper.expectExists(verifyUserPermissions.buttonDelete);
        await console.log('User5 Has Delete Group Permission');

        await verifyUserPermissions.VerifyPermissionGranted(module8, 'users');
        await ExpectHelper.isListElementExists(element(by.css('#page-actions-container')), 'INVITE USER');
        await console.log('User5 Has Permission To INVITE USER');

        await verifyUserPermissions.VerifyPermissionNotGranted(module4);
        await ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW POLICY GROUP'));
        await console.log('User5 Does Not Have Permission For POLICY GROUPS');

        await verifyUserPermissions.VerifyPermissionNotGranted(module1);
        await ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW ATTRIBUTE TAG'));
        await console.log('User5 Does Not Have Permission For ATTRIBUTE TAGS');

        await verifyUserPermissions.VerifyPermissionNotGranted(module1);
        await ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW ASSET'));
        await console.log('User5 Does Not Have Permission For ASSETS');

        await verifyUserPermissions.VerifyPermissionNotGranted(module3);
        await ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW POLICY GROUP TEMPLATE'));
        await console.log('User5 Does Not Have Permission For POLICY GROUP TEMPLATES');

        await verifyUserPermissions.VerifyPermissionNotGranted(module5);
        await ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW SURFACE'));
        await console.log('User5 Does Not Have Permission For SURFACES');

        await verifyUserPermissions.VerifyPermissionNotGranted(module6);
        await ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW INSTITUTION DATA'));
        await console.log('User5 Does Not Have Permission For INSTITUTION DATA');

        await group.reLogin(e2eTestUser, username, password);
        await group.removeRolesFromGroup(surfaceName, GroupName, role5);
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});