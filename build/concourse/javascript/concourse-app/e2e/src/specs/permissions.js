"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const expectHelper_1 = require("../utils/expectHelper");
const groups_Po_1 = require("../pageObjects/groups.Po");
const surfaces_Po_1 = require("../pageObjects/surfaces.Po");
const permissions_Po_1 = require("../pageObjects/permissions.Po");
const assetManager_Po_1 = require("../pageObjects/assetManager.Po");
const login_Po_1 = require("../pageObjects/login.Po");
const attributeTags_Po_1 = require("../pageObjects/attributeTags.Po");
describe('Verifying Permissions Concourse ', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let originalTimeout;
        let EC = protractor_1.ExpectedConditions;
        let group = new groups_Po_1.Group();
        let surface = new surfaces_Po_1.Surface();
        let attributeTag = new attributeTags_Po_1.AttributeTag();
        let loginPage = new login_Po_1.LoginPage();
        let assetsManager = new assetManager_Po_1.AssetManager();
        let verifyUserPermissions = new permissions_Po_1.VerifyUserPermissions();
        let properties = require('../conf/properties');
        let surfaceName = properties.SurfaceData.surfaceName;
        let groupName = properties.groupData.groupName + group.getRandomNum(1, 1000);
        let groupDescription = properties.groupData.groupDescription;
        let user1 = properties.UserPermissionData.user1;
        let user2 = properties.UserPermissionData.user2;
        let user3 = properties.UserPermissionData.user3;
        let user4 = properties.UserPermissionData.user4;
        let user5 = properties.UserPermissionData.user5;
        let e2eTestUser = properties.UserPermissionData.e2eTestUser;
        let e2euser1 = properties.UserPermissionData.e2euser1;
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
        let responsibilities1 = ['Manage Attribute Tags', 'Manage Models'];
        let organization = ['Default Surface - Root Surface Layer'];
        let role2 = ['Control Author'];
        let responsibilities2 = ['Manage Policy Group Templates', 'Manage Policy Groups'];
        let role3 = ['Business Operator'];
        let responsibilities3 = ['Manage Deployments', 'View Reports'];
        let role4 = ['Institution Admin'];
        let responsibilities4 = ['Manage Institutions', 'Create Surfaces', 'Manage Cloud Roles'];
        let role5 = ['Identity Admin'];
        let responsibilities5 = ['Manage Groups', 'Manage Users'];
        let AttributeTagName = 'User Permissions';
        let AssetName = 'User Permissions';
        let PolicyGroupTemplateName = 'User Permissions';
        let PolicyGroupName = 'User Permissions';
        let GroupName = 'User Permissions';
        beforeEach(function () {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
        });
        it('Step 1: Verify Business Author Permissions For User1', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield group.addRoleToGroup(surfaceName, GroupName, role1, responsibilities1, organization);
                yield protractor_1.browser.sleep(2000);
                yield group.reLogin(username, e2eTestUser, password);
                yield verifyUserPermissions.VerifyPermissionGranted(module1, AssetName);
                yield expectHelper_1.ExpectHelper.expectExists(verifyUserPermissions.buttonEdit);
                yield console.log('User1 Has Edit Asset Permission');
                yield expectHelper_1.ExpectHelper.expectExists(verifyUserPermissions.buttonDelete);
                yield console.log('User1 Has Delete Asset Permission');
                yield verifyUserPermissions.VerifyPermissionGranted(module2, AttributeTagName);
                yield expectHelper_1.ExpectHelper.isListElementExists(protractor_1.element(protractor_1.by.css('#page-actions-container')), 'NEW ATTRIBUTE TAG');
                yield console.log('User1 Has Create New Attribute Tag Permission');
                yield expectHelper_1.ExpectHelper.expectExists(verifyUserPermissions.buttonEdit);
                yield console.log('User1 Has Edit Attribute Tag Permission');
                yield expectHelper_1.ExpectHelper.expectExists(verifyUserPermissions.buttonDelete);
                yield console.log('User1 Has Delete Attribute Tag Permission');
                yield verifyUserPermissions.VerifyPermissionNotGranted(module3);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW POLICY GROUP TEMPLATE'));
                yield console.log('User1 Does Not Have Permission For POLICY GROUP TEMPLATES');
                yield verifyUserPermissions.VerifyPermissionNotGranted(module4);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW POLICY GROUP'));
                yield console.log('User1 Does Not Have Permission For POLICY GROUPS');
                yield verifyUserPermissions.VerifyPermissionNotGranted(module5);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW SURFACE'));
                yield console.log('User1 Does Not Have Permission For SURFACES');
                yield verifyUserPermissions.VerifyPermissionNotGranted(module6);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW INSTITUTION DATA'));
                yield console.log('User1 Does Not Have Permission For INSTITUTION DATA');
                yield verifyUserPermissions.VerifyPermissionNotGranted(module7);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW GROUP'));
                yield console.log('User1 Does Not Have Permission For GROUPS');
                yield group.reLogin(e2eTestUser, username, password);
                yield group.removeRolesFromGroup(surfaceName, GroupName, role1);
            });
        });
        it('Step 2: Verify Control Author Permissions For User2', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield group.addRoleToGroup(surfaceName, GroupName, role2, responsibilities2, organization);
                yield group.reLogin(username, e2eTestUser, password);
                yield protractor_1.browser.sleep(2000);
                yield verifyUserPermissions.VerifyPermissionGranted(module3, PolicyGroupTemplateName);
                yield expectHelper_1.ExpectHelper.isListElementExists(protractor_1.element(protractor_1.by.css('#page-actions-container')), 'NEW POLICY GROUP TEMPLATE');
                yield console.log('User2 Has Create New Policy Group Template Permission');
                yield expectHelper_1.ExpectHelper.expectExists(verifyUserPermissions.buttonEdit);
                yield console.log('User2 Has Edit Policy Group Template Permission');
                yield expectHelper_1.ExpectHelper.expectExists(verifyUserPermissions.buttonDelete);
                yield console.log('User2 Has Delete Policy Group Template Permission');
                yield verifyUserPermissions.VerifyPermissionGranted(module4, PolicyGroupName);
                yield expectHelper_1.ExpectHelper.isListElementExists(protractor_1.element(protractor_1.by.css('#page-actions-container')), 'NEW POLICY GROUP');
                yield console.log('User2 Has Create New Policy Group Permission');
                yield expectHelper_1.ExpectHelper.expectExists(verifyUserPermissions.buttonEdit);
                yield console.log('User2 Has Edit Policy Group Permission');
                yield expectHelper_1.ExpectHelper.expectExists(verifyUserPermissions.buttonDelete);
                yield console.log('User2 Has Delete Policy Group Permission');
                yield verifyUserPermissions.VerifyPermissionNotGranted(module2);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW ATTRIBUTE TAG'));
                yield console.log('User2 Does Not Have Permission For ATTRIBUTE TAGS');
                yield verifyUserPermissions.VerifyPermissionNotGranted(module1);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW ASSET'));
                yield console.log('User2 Does Not Have Permission For ASSETS');
                yield verifyUserPermissions.VerifyPermissionNotGranted(module5);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW SURFACE'));
                yield console.log('User2 Does Not Have Permission For SURFACES');
                yield verifyUserPermissions.VerifyPermissionNotGranted(module6);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW INSTITUTION DATA'));
                yield console.log('User2 Does Not Have Permission For INSTITUTION DATA');
                yield verifyUserPermissions.VerifyPermissionNotGranted(module7);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW GROUP'));
                yield console.log('User2 Does Not Have Permission For GROUPS');
                yield group.reLogin(e2eTestUser, username, password);
                yield group.removeRolesFromGroup(surfaceName, GroupName, role2);
            });
        });
        it('Step 3: Verify Business Operator Permissions For User3', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield group.addRoleToGroup(surfaceName, GroupName, role3, responsibilities3);
                yield group.reLogin(username, e2eTestUser, password);
                yield protractor_1.browser.sleep(2000);
                yield verifyUserPermissions.VerifyPermissionGranted(module1, AssetName);
                yield console.log('User3 Has Deployment Permission');
                yield verifyUserPermissions.VerifyPermissionNotGranted(module2);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW ATTRIBUTE TAG'));
                yield console.log('User3 Does Not Have Permission For ATTRIBUTE TAGS');
                yield verifyUserPermissions.VerifyPermissionNotGranted(module1);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW ASSET'));
                yield console.log('User3 Does Not Have Permission For ASSETS');
                yield verifyUserPermissions.VerifyPermissionNotGranted(module5);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW SURFACE'));
                yield console.log('User3 Does Not Have Permission For SURFACES');
                yield verifyUserPermissions.VerifyPermissionNotGranted(module6);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW INSTITUTION DATA'));
                yield console.log('User3 Does Not Have Permission For INSTITUTION DATA');
                yield verifyUserPermissions.VerifyPermissionNotGranted(module7);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW GROUP'));
                yield console.log('User3 Does Not Have Permission For GROUPS');
                yield verifyUserPermissions.VerifyPermissionNotGranted(module3);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW POLICY GROUP TEMPLATE'));
                yield console.log('User3 Does Not Have Permission For POLICY GROUP TEMPLATES');
                yield verifyUserPermissions.VerifyPermissionNotGranted(module4);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW POLICY GROUP'));
                yield console.log('User3 Does Not Have Permission For POLICY GROUPS');
                yield group.reLogin(e2eTestUser, username, password);
                yield group.removeRolesFromGroup(surfaceName, GroupName, role3);
            });
        });
        it('Step 4: Verify Institution Admin Permissions For User4', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield group.addRoleToGroup(surfaceName, GroupName, role4, responsibilities4);
                yield group.reLogin(username, e2eTestUser, password);
                yield protractor_1.browser.sleep(2000);
                yield verifyUserPermissions.VerifyPermissionGranted(module5, 'surfaceName');
                yield expectHelper_1.ExpectHelper.isListElementExists(protractor_1.element(protractor_1.by.css('#page-actions-container')), 'NEW SURFACE');
                yield console.log('User4 Has Create New Surface Permission');
                yield verifyUserPermissions.VerifyPermissionGranted(module6, 'institutions');
                yield expectHelper_1.ExpectHelper.isListElementExists(protractor_1.element(protractor_1.by.css('#page-actions-container')), 'NEW INSTITUTION DATA');
                yield console.log('User4 Has Create New Institution Permission');
                yield verifyUserPermissions.VerifyPermissionNotGranted(module1);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW ASSET'));
                yield console.log('User4 Does Not Have Permission For ASSETS');
                yield verifyUserPermissions.VerifyPermissionNotGranted(module3);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW POLICY GROUP TEMPLATE'));
                yield console.log('User4 Does Not Have Permission For POLICY GROUP TEMPLATES');
                yield verifyUserPermissions.VerifyPermissionNotGranted(module4);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW POLICY GROUP'));
                yield console.log('User4 Does Not Have Permission For POLICY GROUPS');
                yield verifyUserPermissions.VerifyPermissionNotGranted(module7);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW GROUP'));
                yield console.log('User4 Does Not Have Permission For GROUPS');
                yield verifyUserPermissions.VerifyPermissionNotGranted(module2);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW ATTRIBUTE TAG'));
                yield console.log('User4 Does Not Have Permission For ATTRIBUTE TAGS');
                yield group.reLogin(e2eTestUser, username, password);
                yield group.removeRolesFromGroup(surfaceName, GroupName, role4);
            });
        });
        it('Step 5: Verify Identity Admin Permissions For User5', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield group.addRoleToGroup(surfaceName, GroupName, role5, responsibilities5, organization);
                yield group.reLogin(username, e2eTestUser, password);
                yield protractor_1.browser.sleep(2000);
                yield verifyUserPermissions.VerifyPermissionGranted(module7, GroupName);
                yield expectHelper_1.ExpectHelper.isListElementExists(protractor_1.element(protractor_1.by.css('#page-actions-container')), 'NEW GROUP');
                yield console.log('User5 Has Create New Group Permission');
                yield expectHelper_1.ExpectHelper.expectExists(verifyUserPermissions.buttonEdit);
                yield console.log('User5 Has Edit Group Permission');
                yield expectHelper_1.ExpectHelper.expectExists(verifyUserPermissions.buttonDelete);
                yield console.log('User5 Has Delete Group Permission');
                yield verifyUserPermissions.VerifyPermissionGranted(module8, 'users');
                yield expectHelper_1.ExpectHelper.isListElementExists(protractor_1.element(protractor_1.by.css('#page-actions-container')), 'INVITE USER');
                yield console.log('User5 Has Permission To INVITE USER');
                yield verifyUserPermissions.VerifyPermissionNotGranted(module4);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW POLICY GROUP'));
                yield console.log('User5 Does Not Have Permission For POLICY GROUPS');
                yield verifyUserPermissions.VerifyPermissionNotGranted(module1);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW ATTRIBUTE TAG'));
                yield console.log('User5 Does Not Have Permission For ATTRIBUTE TAGS');
                yield verifyUserPermissions.VerifyPermissionNotGranted(module1);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW ASSET'));
                yield console.log('User5 Does Not Have Permission For ASSETS');
                yield verifyUserPermissions.VerifyPermissionNotGranted(module3);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW POLICY GROUP TEMPLATE'));
                yield console.log('User5 Does Not Have Permission For POLICY GROUP TEMPLATES');
                yield verifyUserPermissions.VerifyPermissionNotGranted(module5);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW SURFACE'));
                yield console.log('User5 Does Not Have Permission For SURFACES');
                yield verifyUserPermissions.VerifyPermissionNotGranted(module6);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(verifyUserPermissions.createButton('NEW INSTITUTION DATA'));
                yield console.log('User5 Does Not Have Permission For INSTITUTION DATA');
                yield group.reLogin(e2eTestUser, username, password);
                yield group.removeRolesFromGroup(surfaceName, GroupName, role5);
            });
        });
        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWlzc2lvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL2UyZS9zcmMvc3BlY3MvcGVybWlzc2lvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBc0U7QUFDdEUsd0RBQXFEO0FBQ3JELHdEQUFpRDtBQUNqRCw0REFBcUQ7QUFDckQsa0VBQXNFO0FBQ3RFLG9FQUE4RDtBQUM5RCxzREFBb0Q7QUFDcEQsc0VBQStEO0FBRS9ELFFBQVEsQ0FBQyxrQ0FBa0MsRUFBRTs7UUFDekMsSUFBSSxlQUFlLENBQUM7UUFDcEIsSUFBSSxFQUFFLEdBQUcsK0JBQWtCLENBQUM7UUFDNUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxpQkFBSyxFQUFFLENBQUM7UUFDeEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxxQkFBTyxFQUFFLENBQUM7UUFDNUIsSUFBSSxZQUFZLEdBQUcsSUFBSSwrQkFBWSxFQUFFLENBQUM7UUFDdEMsSUFBSSxTQUFTLEdBQUcsSUFBSSxvQkFBUyxFQUFFLENBQUM7UUFDaEMsSUFBSSxhQUFhLEdBQUcsSUFBSSw4QkFBWSxFQUFFLENBQUM7UUFDdkMsSUFBSSxxQkFBcUIsR0FBRyxJQUFJLHNDQUFxQixFQUFFLENBQUM7UUFDeEQsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDL0MsSUFBSSxXQUFXLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUM7UUFDckQsSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0UsSUFBSSxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDO1FBQzdELElBQUksS0FBSyxHQUFHLFVB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