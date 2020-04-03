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
describe('Creating Groups Concourse ', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let originalTimeout;
        let EC = protractor_1.ExpectedConditions;
        let group = new groups_Po_1.Group();
        let surface = new surfaces_Po_1.Surface();
        // let verifyUserPermissions = new VerifyUserPermissions();
        let properties = require('../conf/properties');
        let groupName = properties.groupData.groupName + group.getRandomNum(1, 1000);
        let groupDescription = properties.groupData.groupDescription;
        // let user = properties.groupData.user;
        let role = ['Business Operator'];
        let responsibilities = ['Manage Deployments'];
        let organization = ['Default Surface - Root Surface Layer'];
        let role1 = ['Report User'];
        let responsibilities1 = ['View Reports'];
        let surfaceName = properties.SurfaceData.surfaceName;
        let groupId;
        beforeEach(function () {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
        });
        it('Step 1: Create New Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating New Group
                yield group.createGroup(surfaceName, groupName, groupDescription, 0);
                yield group.searchGroupName(surfaceName, groupName);
                yield expectHelper_1.ExpectHelper.isListElementExists(group.groupList, groupName);
                groupId = yield group.getId();
                yield console.log('Group id is', groupId);
            });
        });
        it('Step 2: Asign User For New Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Assigning User For Newly Created Group
                yield group.assignUserForGroup(surfaceName, groupName, protractor_1.browser.params.user, 0);
                yield expectHelper_1.ExpectHelper.isListElementExists(group.groupList, groupName);
            });
        });
        it('Step 3: Add Role Assignment For Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Assigning Roles For Group
                yield group.addRoleToGroup(surfaceName, groupName, role, responsibilities, organization);
                yield expectHelper_1.ExpectHelper.isListElementExists(group.groupList, groupName);
            });
        });
        it('Step 4: Add Another Role Assignment For Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Assigning Another Role For Group
                yield group.addRoleToGroup(surfaceName, groupName, role1, responsibilities1, organization);
                yield expectHelper_1.ExpectHelper.isListElementExists(group.groupList, groupName);
            });
        });
        it('Step 5: Remove Role Assignment From Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Removing Role From Group
                yield group.removeRolesFromGroup(surfaceName, groupName, role);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(role));
            });
        });
        it('Step 6: Verify Role Assignment Removed Or Not', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Verifying the Role is Removed Or Not
                yield group.verifyRolesInUI(surfaceName, groupName, role);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(role));
            });
        });
        it('Step 7: Remove Role Assignment From Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Removing Role From Group
                yield group.removeRolesFromGroup(surfaceName, groupName, role1);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(role1));
            });
        });
        it('Step 8: Verify Role Assignment Removed Or Not', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Verifying the Role is Removed Or Not
                yield group.verifyRolesInUI(surfaceName, groupName, role1);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(role1));
            });
        });
        it('Step 9: Remove User From Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Removing User From Group
                yield group.removeUserForGroup(surfaceName, groupName, protractor_1.browser.params.user);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(group.selectUserToDelete(groupName));
            });
        });
        it('Step 10: Deassociate Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                //  Deleting Group
                yield group.dissociateGroup(surfaceName, groupName, groupId);
            });
        });
        it('Step 11: Delete Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                //  Deleting Group
                yield group.deleteGroup(surfaceName, groupName);
            });
        });
        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3BlY3MvZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBeUQ7QUFDekQsd0RBQXFEO0FBQ3JELHdEQUFpRDtBQUNqRCw0REFBcUQ7QUFFckQsUUFBUSxDQUFDLDRCQUE0QixFQUFFOztRQUNuQyxJQUFJLGVBQWUsQ0FBQztRQUNwQixJQUFJLEVBQUUsR0FBRywrQkFBa0IsQ0FBQztRQUM1QixJQUFJLEtBQUssR0FBRyxJQUFJLGlCQUFLLEVBQUUsQ0FBQztRQUN4QixJQUFJLE9BQU8sR0FBRyxJQUFJLHFCQUFPLEVBQUUsQ0FBQztRQUM1QiwyREFBMkQ7UUFDM0QsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDL0MsSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0UsSUFBSSxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDO1FBQzdELHdDQUF3QztRQUN4QyxJQUFJLElBQUksR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDakMsSUFBSSxnQkFBZ0IsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDOUMsSUFBSSxZQUFZLEdBQUcsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1FBQzVELElBQUksS0FBSyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDNUIsSUFBSSxpQkFBaUIsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3pDLElBQUksV0FBVyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO1FBQ3JELElBQUksT0FBTyxDQUFDO1FBRVosVUFBVSxDQUFDO1lBQ1AsZUFBZSxHQUFHLE9BQU8sQ0FBQyx3QkFBd0Is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