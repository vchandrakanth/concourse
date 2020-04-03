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
const cloudRoles_Po_1 = require("../pageObjects/cloudRoles.Po");
const utils_1 = require("../utils/utils");
const groups_Po_1 = require("../pageObjects/groups.Po");
describe('Creating Cloud Roles', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let originalTimeout;
        let EC = protractor_1.ExpectedConditions;
        let cloudRole = new cloudRoles_Po_1.CloudRoles();
        let group = new groups_Po_1.Group();
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
        it('Step 1: Create New Cloud Role', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield cloudRole.createCloudRole(baseSurface, cloudRoleName, description, provider, 'DRAFT', amazonAction, amazonNonAction);
                yield expectHelper_1.ExpectHelper.isListElementExists(cloudRole.list, cloudRoleName);
                roleId = yield utils_1.getIdFromUrl();
                yield console.log('Cloud Role id is', roleId);
            });
        });
        it('Step 2: Create New Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield group.createGroup(baseSurface, groupName, groupDescription, 0);
                yield expectHelper_1.ExpectHelper.isListElementExists(group.groupList, groupName);
                groupId = yield group.getId();
                yield console.log('Group id is', groupId);
            });
        });
        it('Step 3: Asign User For New Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield group.assignUserForGroup(baseSurface, groupName, user, 0);
                yield expectHelper_1.ExpectHelper.isListElementExists(group.groupList, groupName);
            });
        });
        it('Step 4: Add Cloud Role For Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield group.assignCloudRoleForGroup(baseSurface, groupName, 0, cloudRoles);
                yield expectHelper_1.ExpectHelper.isListElementExists(group.groupList, groupName);
            });
        });
        it('Step 5: Edit AWS Action and Publish', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield cloudRole.editAWSAction(baseSurface, cloudRoleName, amazonEditAction);
            });
        });
        it('Step 6: Edit AWS Non Action and Publish', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield cloudRole.editAWSNonAction(baseSurface, cloudRoleName, amazonEditNonAction);
            });
        });
        it('Step 7: Edit AWS Non Action and Publish', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield cloudRole.editAzureAction(baseSurface, cloudRoleName, azureEditAction);
            });
        });
        it('Step 8: Edit AWS Non Action and Publish', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield cloudRole.editAzureNonAction(baseSurface, cloudRoleName, azureEditNonAction);
            });
        });
        it('Step 9: Edit Cloud Role', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield cloudRole.editCloudRoleNameAndPublish(baseSurface, cloudRoleName, description);
                yield cloudRole.searchCloudRole(baseSurface, cloudRoleName);
                yield expectHelper_1.ExpectHelper.isListElementExists(cloudRole.list, cloudRoleName);
            });
        });
        it('Step 10: Remove Cloud Role', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield group.removeCloudRolesFromGroup(baseSurface, groupName, 1, updatedCloudRole);
            });
        });
        it('Step 11: Remove User From Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield group.removeUserForGroup(baseSurface, groupName, user);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(group.selectUserToDelete(groupName));
            });
        });
        it('Step 12: De-associate Group From Surface', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield group.dissociateGroup(baseSurface, groupName, groupId);
            });
        });
        it('Step 13: Delete Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield group.deleteGroup(baseSurface, groupName);
            });
        });
        it('Step 14: Delete Cloud Role', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield cloudRole.deleteCloudRole(baseSurface, cloudRoleName);
            });
        });
        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWRSb2xlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zcGVjcy9jbG91ZFJvbGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkNBQWdEO0FBQ2hELHdEQUFxRDtBQUNyRCxnRUFBMEQ7QUFDMUQsMENBQThDO0FBQzlDLHdEQUFpRDtBQUdqRCxRQUFRLENBQUMsc0JBQXNCLEVBQUU7O1FBQzdCLElBQUksZUFBZSxDQUFDO1FBQ3BCLElBQUksRUFBRSxHQUFHLCtCQUFrQixDQUFDO1FBQzVCLElBQUksU0FBUyxHQUFHLElBQUksMEJBQVUsRUFBRSxDQUFDO1FBQ2pDLElBQUksS0FBSyxHQUFHLElBQUksaUJBQUssRUFBRSxDQUFDO1FBQ3hCLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQy9DLElBQUksYUFBYSxHQUFHLFVBQVUsQ0FBQyxjQUFjLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlGLElBQUksV0FBVyxHQUFHLFVBQVUsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDO1FBQzFELElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDO1FBQ3hELElBQUksWUFBWSxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUN0RCxJQUFJLGVBQWUsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekMsSUFBSSxXQUFXLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3RDLElBQUksY0FBYyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUMvQyxJQUFJLGdCQUFnQixHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUN2RCxJQUFJLG1CQUFtQixHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUMxRCxJQUFJLGVBQWUsR0FBRyxDQUFDLDRC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