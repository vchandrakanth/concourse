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
const surfaces_Po_1 = require("../pageObjects/surfaces.Po");
const groups_Po_1 = require("../pageObjects/groups.Po");
describe('Surface Creation Concourse ', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let originalTimeout;
        let EC = protractor_1.ExpectedConditions;
        let properties = require('../conf/properties');
        let surface = new surfaces_Po_1.Surface();
        let group = new groups_Po_1.Group();
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
        it('Step 1: Create New Surface', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield surface.createNewSurface(baseSurface, surfaceName, description, 'E2E Admin');
            });
        });
        it('Step 2: Search Default Group For New Surface', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield group.searchGroupName(surfaceName, groupName);
                groupId = yield group.getId();
                yield console.log('Group id is', groupId);
                yield expectHelper_1.ExpectHelper.isListElementExists(group.groupList, groupName);
            });
        });
        it('Step 3: Remove Identity Admin Role From Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield group.removeRolesFromGroup(surfaceName, groupName, identityAdminRole);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(identityAdminRole));
            });
        });
        it('Step 4: Remove Identity Admin Role From Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield group.removeRolesFromGroup(surfaceName, groupName, institutionAdminRole);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(institutionAdminRole));
            });
        });
        it('Step 5: Remove Permission Admin Role From Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield group.removeRolesFromGroup(surfaceName, groupName, permissionAdminRole);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(permissionAdminRole));
            });
        });
        it('Step 6: Remove Surface Admin Role From Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield group.removeRolesFromGroup(surfaceName, groupName, surfaceAdminRole);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(surfaceAdminRole));
            });
        });
        it('Step 7: Deassociate Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                //  DeAssociate Group
                yield group.dissociateGroup(surfaceName, groupName, groupId);
            });
        });
        it('Step 8: Delete Surface', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield surface.deleteSurface(surfaceName);
            });
        });
        it('Step 9: Verify Surface', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield surface.verifySurface(surfaceName);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(surface.selectsurface(surfaceName));
            });
        });
        it('Step 10: Remove User From Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield group.removeUserForGroup(baseSurface, groupName, user);
            });
        });
        it('Step 11: Delete Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                //  Deleting Group
                yield group.deleteGroup(baseSurface, groupName);
            });
        });
        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VyZmFjZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3BlY3Mvc3VyZmFjZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBeUQ7QUFDekQsd0RBQXFEO0FBQ3JELDREQUFxRDtBQUNyRCx3REFBaUQ7QUFFakQsUUFBUSxDQUFDLDZCQUE2QixFQUFFOztRQUNwQyxJQUFJLGVBQWUsQ0FBQztRQUNwQixJQUFJLEVBQUUsR0FBRywrQkFBa0IsQ0FBQztRQUM1QixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMvQyxJQUFJLE9BQU8sR0FBRyxJQUFJLHFCQUFPLEVBQUUsQ0FBQztRQUM1QixJQUFJLEtBQUssR0FBRyxJQUFJLGlCQUFLLEVBQUUsQ0FBQztRQUN4QixJQUFJLFdBQVcsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRixJQUFJLFdBQVcsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQztRQUNyRCxJQUFJLG9CQUFvQixHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNqRCxJQUFJLGlCQUFpQixHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMzQyxJQUFJLG1CQUFtQixHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUMvQyxJQUFJLGdCQUFnQixHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDekMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxlQUFlLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUNyRSxJQUFJLFNBQVMsR0FBRyxXQUFXLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUM7UUFDbEUsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFDckMs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