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
        it('Step 1: Create New Surface', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield surface.createNewSurface(baseSurface, surfaceName, description, 'E2E Admin');
            });
        });
        it('Step 2: Create Azure Data For Surface', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield surface.createDataForSurface(surfaceName, azureAccount, 0, accountKey, keyValue);
            });
        });
        it('Step 3: Create AWS Data For Surface', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield surface.createDataForSurface(surfaceName, awsAccount, 0, accountKey, keyValue);
            });
        });
        it('Step 4: Update AWS Data For Surface', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield surface.editDataForSurface(surfaceName, 2, 1, accountKey, keyValue);
            });
        });
        it('Step 5: Delete AWS Account Data For Surface', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield surface.deleteDataAccount(surfaceName, awsAccount, 2);
            });
        });
        it('Step 6: Delete AZURE Account Data For Surface', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield surface.deleteDataAccount(surfaceName, azureAccount, 1);
            });
        });
        it('Step 7: Search Default Group For New Surface', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield group.searchGroupName(surfaceName, groupName);
                groupId = yield group.getId();
                yield console.log('Group id is', groupId);
                yield protractor_1.browser.sleep(5000);
                yield expectHelper_1.ExpectHelper.isListElementExists(group.groupList, groupName);
            });
        });
        it('Step 8: Deassociate Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield group.dissociateGroup(surfaceName, groupId);
            });
        });
        it('Step 9: Remove Institution Admin Role From Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield group.removeRolesFromGroup(surfaceName, groupName, surfaceAdminRole);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(surfaceAdminRole));
            });
        });
        it('Step 10: Remove Identity Admin Role From Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield group.removeRolesFromGroup(surfaceName, groupName, institutionAdminRole);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(institutionAdminRole));
            });
        });
        it('Step 11: Remove Surface Admin Role From Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield group.removeRolesFromGroup(surfaceName, groupName, identityAdminRole);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(identityAdminRole));
            });
        });
        it('Step 12: Delete Surface', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield surface.deleteSurface(surfaceName);
            });
        });
        it('Step 13: Remove User From Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Removing User From Group
                yield group.removeUserForGroup(surfaceName, groupName, user);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(group.selectUserToDelete(groupName));
            });
        });
        it('Step 14: Delete Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                //  Deleting Group
                yield group.deleteGroup(baseSurface, groupName);
            });
        });
        it('Step 15: Verify Surface', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield surface.verifySurface(surfaceName);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(surface.selectsurface(surfaceName));
            });
        });
        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlRGF0YUZvclN1cmZhY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NwZWNzL21hbmFnZURhdGFGb3JTdXJmYWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkNBQXlEO0FBQ3pELHdEQUFxRDtBQUNyRCw0REFBcUQ7QUFDckQsd0RBQWlEO0FBRWpELFFBQVEsQ0FBQyw2QkFBNkIsRUFBRTs7UUFDcEMsSUFBSSxlQUFlLENBQUM7UUFDcEIsSUFBSSxFQUFFLEdBQUcsK0JBQWtCLENBQUM7UUFDNUIsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDL0MsSUFBSSxPQUFPLEdBQUcsSUFBSSxxQkFBTyxFQUFFLENBQUM7UUFDNUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxpQkFBSyxFQUFFLENBQUM7UUFDeEIsSUFBSSxXQUFXLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckYsSUFBSSxXQUFXLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUM7UUFDckQsSUFBSSxTQUFTLEdBQUcsV0FBVyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDO1FBQ2xFLElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQ3JDLElBQUksV0FBVyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO1FBQ3JELElBQUksVUFBVSxHQUFHLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzVELElBQUksWUFBWSxHQUFHLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3JFLElBQUksVUFBVSxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxH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