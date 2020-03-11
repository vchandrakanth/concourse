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
                yield protractor_1.browser.sleep(5000);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VyZmFjZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3BlY3Mvc3VyZmFjZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJDQUF5RDtBQUN6RCx3REFBcUQ7QUFDckQsNERBQXFEO0FBQ3JELHdEQUFpRDtBQUVqRCxRQUFRLENBQUMsNkJBQTZCLEVBQUU7O1FBQ3BDLElBQUksZUFBZSxDQUFDO1FBQ3BCLElBQUksRUFBRSxHQUFHLCtCQUFrQixDQUFDO1FBQzVCLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQy9DLElBQUksT0FBTyxHQUFHLElBQUkscUJBQU8sRUFBRSxDQUFDO1FBQzVCLElBQUksS0FBSyxHQUFHLElBQUksaUJBQUssRUFBRSxDQUFDO1FBQ3hCLElBQUksV0FBVyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JGLElBQUksV0FBVyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO1FBQ3JELElBQUksb0JBQW9CLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2pELElBQUksaUJBQWlCLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzNDLElBQUksbUJBQW1CLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQy9DLElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN6QyxJQUFJLEtBQUssR0FBRyxDQUFDLGVBQWUsRUFBRSxtQkFBbUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3JFLElBQUksU0FBUyxHQUFHLFdBQVcsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQztRQUNsRSxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztRQUNyQyxJ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