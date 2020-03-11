"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
                yield cloudRole.searchCloudRole(baseSurface, cloudRoleName + ' Updated');
                yield expectHelper_1.ExpectHelper.isListElementExists(cloudRole.list, cloudRoleName + ' Updated');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWRSb2xlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zcGVjcy9jbG91ZFJvbGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQ0FBZ0Q7QUFDaEQsd0RBQXFEO0FBQ3JELGdFQUEwRDtBQUMxRCwwQ0FBOEM7QUFDOUMsd0RBQWlEO0FBR2pELFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTs7UUFDN0IsSUFBSSxlQUFlLENBQUM7UUFDcEIsSUFBSSxFQUFFLEdBQUcsK0JBQWtCLENBQUM7UUFDNUIsSUFBSSxTQUFTLEdBQUcsSUFBSSwwQkFBVSxFQUFFLENBQUM7UUFDakMsSUFBSSxLQUFLLEdBQUcsSUFBSSxpQkFBSyxFQUFFLENBQUM7UUFDeEIsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDL0MsSUFBSSxhQUFhLEdBQUcsVUFBVSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUYsSUFBSSxXQUFXLEdBQUcsVUFBVSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUM7UUFDMUQsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUM7UUFDeEQsSUFBSSxZQUFZLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQ3RELElBQUksZUFBZSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6QyxJQUFJLFdBQVcsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDdEMsSUFBSSxjQUFjLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQy9DLElBQUksZ0JBQWdCLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBQ3ZELElBQUksbUJBQW1CLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBQzFELElBQUksZUFBZSxHQUFHLENBQUMsNEJBQTRC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