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
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
        });
        it('Step 1: Create New Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating New Group
                yield group.createGroup(surfaceName, groupName, groupDescription, 0);
                // Verify if the Group is created
                yield expectHelper_1.ExpectHelper.isListElementExists(group.groupList, groupName);
                groupId = yield group.getId();
                yield console.log('Group id is', groupId);
            });
        });
        it('Step 2: Asign User For New Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Assigning User For Newly Created Group
                yield group.assignUserForGroup(surfaceName, groupName, user, 0);
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
                yield group.removeUserForGroup(surfaceName, groupName, user);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3BlY3MvZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBZ0Q7QUFDaEQsd0RBQXFEO0FBQ3JELHdEQUFpRDtBQUNqRCw0REFBcUQ7QUFFckQsUUFBUSxDQUFDLDRCQUE0QixFQUFFOztRQUNuQyxJQUFJLGVBQWUsQ0FBQztRQUNwQixJQUFJLEVBQUUsR0FBRywrQkFBa0IsQ0FBQztRQUM1QixJQUFJLEtBQUssR0FBRyxJQUFJLGlCQUFLLEVBQUUsQ0FBQztRQUN4QixJQUFJLE9BQU8sR0FBRyxJQUFJLHFCQUFPLEVBQUUsQ0FBQztRQUM1QiwyREFBMkQ7UUFDM0QsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDL0MsSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0UsSUFBSSxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDO1FBQzdELElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQ3JDLElBQUksSUFBSSxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNqQyxJQUFJLGdCQUFnQixHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUM5QyxJQUFJLFlBQVksR0FBRyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFDNUQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM1QixJQUFJLGlCQUFpQixHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDekMsSUFBSSxXQUFXLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUM7UUFDckQsSUFBSSxPQUFPLENBQUM7UUFFWixVQUFVLENB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