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
const assetManager_Po_1 = require("../pageObjects/assetManager.Po");
const attributeTags_Po_1 = require("../pageObjects/attributeTags.Po");
const logicalDeployment_Po_1 = require("../pageObjects/logicalDeployment.Po");
describe('Removing Business Author Role Assignments with Underlying LogicalDeployment on Model', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let group = new groups_Po_1.Group();
        let surface = new surfaces_Po_1.Surface();
        let originalTimeout;
        let properties = require('../conf/properties');
        let businessAuthorRole = ['Business Author'];
        let responsibilities = ['Manage Attribute Tags', 'Manage Models', 'Manage Baselines', 'View Reports'];
        let rootSurfaceLayer = ['Default Surface - Root Surface Layer'];
        let attributeTag = new attributeTags_Po_1.AttributeTag();
        let assetsManager = new assetManager_Po_1.AssetManager();
        let logicalDeployment = new logicalDeployment_Po_1.LogicalDeployment();
        let groupName = properties.groupData.groupName + group.getRandomNum(1, 1000);
        let groupDescription = properties.groupData.groupDescription;
        let assetName = properties.enclaveModelData.modelName + assetsManager.getRandomNum(1, 1000);
        let desc = properties.enclaveModelData.modelDescription;
        let attributeTagName = properties.attributeTagData.attributeName1 + attributeTag.getRandomNum(1, 1000);
        let attributeTagdescription = properties.attributeTagData.attributeDescription1;
        let attitibuteTag = [attributeTagName];
        let baseSurface = properties.SurfaceData.surfaceName;
        let deploymentName = properties.logicalDeploymentData.deploymentName + logicalDeployment.getRandomNum(1, 1000);
        let stackName = properties.logicalDeploymentData.stackName + logicalDeployment.getRandomNum(1, 1000);
        let groupId;
        let modelId;
        let deploymentId;
        beforeEach(function () {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
        });
        it('Step 1: Create New Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating New Group
                yield group.createGroup(baseSurface, groupName, groupDescription, 0);
                // Verify if the Group is created
                yield expectHelper_1.ExpectHelper.isListElementExists(group.groupList, groupName);
                groupId = yield group.getId();
                yield console.log('Group id is', groupId);
                yield protractor_1.browser.refresh();
            });
        });
        it('Step 2: Asign User For New Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Assigning User For Newly Created Group
                yield group.assignUserForGroup(baseSurface, groupName, protractor_1.browser.params.user, 0);
                yield expectHelper_1.ExpectHelper.isListElementExists(group.groupList, groupName);
            });
        });
        it('Step 3: Add Role Assignment For Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Assigning Roles For Group
                yield group.addRoleToGroup(baseSurface, groupName, businessAuthorRole, responsibilities, rootSurfaceLayer);
                yield expectHelper_1.ExpectHelper.isListElementExists(group.groupList, groupName);
            });
        });
        it('Step 4: Create Attribute Tag', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Attribute Tag
                yield attributeTag.createAttributeTag(baseSurface, attributeTagName, attributeTagdescription);
                yield attributeTag.searchAttribute(baseSurface, attributeTagName, 'Description');
                yield expectHelper_1.ExpectHelper.isListElementExists(attributeTag.list, attributeTagName);
            });
        });
        it('Step 5: Create New Enclave Model', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Enclave Model
                yield assetsManager.createEnclaveModel(baseSurface, 'PUBLISHED', assetName, desc, attitibuteTag, 'concourseInfra.json', groupName);
                modelId = yield assetsManager.getId();
                yield console.log('Enclave Model name is', assetName);
                yield console.log('Enclave Model id is', modelId);
                yield assetsManager.searchAssetManager(baseSurface, assetName);
                yield expectHelper_1.ExpectHelper.isListElementExists(assetsManager.assetList, assetName);
            });
        });
        it('Step 6: Logical Deployement', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Logical Deployement
                yield logicalDeployment.newlogicalDeployment(baseSurface, assetName, deploymentName, stackName, 'us-east-1', 'Default Surface - Root Surface Layer', 'Account-123456987456');
                yield logicalDeployment.searchLogicalDeployment(baseSurface, deploymentName);
                yield expectHelper_1.ExpectHelper.isListElementExists(logicalDeployment.logicalDeploymentList, deploymentName);
                deploymentId = yield logicalDeployment.getId();
                yield console.log('Logical Deployment Name is', deploymentName);
                yield console.log('Logical Deployment id is', deploymentId);
            });
        });
        it('Step 7: Remove Role Assignment From Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Removing Role From Group
                yield group.removeRolesFromGroup(baseSurface, groupName, businessAuthorRole);
                yield expectHelper_1.ExpectHelper.verifyContainsText(group.alertWindow, 'alertWindow', `Cannot remove role because Group ${groupId} is discovery owning group of Enclave Model.`);
                // Cannot remove role because Logical Deployment to Surface Layer will no longer be covered by this Enclave Model owning group.
                yield protractor_1.browser.refresh();
            });
        });
        it('Step 8: Delete Logical Deployment', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Delete Logical Deployement
                yield logicalDeployment.deleteLogicalDeployement(baseSurface, deploymentName);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(logicalDeployment.logicalDeployementElement(deploymentName));
            });
        });
        it('Step 12: Delete Enclave Model', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Deleting Enclave Model
                yield assetsManager.deleteEnclaveModel(baseSurface, assetName, 'false');
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(assetsManager.enclaveModelElement(assetName));
            });
        });
        it('Step 9: Remove Role Assignment From Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Removing Role From Group
                yield group.removeRolesFromGroup(baseSurface, groupName, businessAuthorRole);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(businessAuthorRole));
            });
        });
        it('Step 10: Verify Role Assignment Removed Or Not', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Verifying the Role is Removed Or Not
                yield group.verifyRolesInUI(baseSurface, groupName, businessAuthorRole);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(businessAuthorRole));
            });
        });
        it('Step 11: Add Role Assignment again For Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Assigning Roles For Group
                yield group.addRoleToGroup(baseSurface, groupName, businessAuthorRole, responsibilities, rootSurfaceLayer);
                yield expectHelper_1.ExpectHelper.isListElementExists(group.groupList, groupName);
            });
        });
        // it('Step 12: Delete Enclave Model', async function (): Promise<any> {
        //     // Deleting Enclave Model
        //     await assetsManager.deleteEnclaveModel(baseSurface, assetName, 'false');
        //     await ExpectHelper.expectDoesNotExists(assetsManager.enclaveModelElement(assetName));
        // });
        it('Step 13: Delete Attribute Tag', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Deleting Attribute Tag
                yield attributeTag.deleteAttributeTag(baseSurface, attributeTagName, 'false');
            });
        });
        it('Step 14: Remove Role Assignment From Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Removing Role From Group
                yield group.removeRolesFromGroup(baseSurface, groupName, businessAuthorRole);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(businessAuthorRole));
            });
        });
        it('Step 15: Remove User From Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Removing User From Group
                yield group.removeUserForGroup(baseSurface, groupName, protractor_1.browser.params.user);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(group.selectUserToDelete(groupName));
            });
        });
        it('Step 16: Deassociate Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                //  Deleting Group
                yield group.dissociateGroup(baseSurface, groupName, groupId);
            });
        });
        it('Step 17: Delete Group', function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlQnVzaW5lc3NBdXRob3JSb2xlQXNzaWdubWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zcGVjcy9yZW1vdmVCdXNpbmVzc0F1dGhvclJvbGVBc3NpZ25tZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXlEO0FBQ3pELHdEQUFxRDtBQUNyRCx3REFBaUQ7QUFDakQsNERBQXFEO0FBQ3JELG9FQUE4RDtBQUM5RCxzRUFBK0Q7QUFDL0QsOEVBQXdFO0FBRXhFLFFBQVEsQ0FBQyxzRkFBc0YsRUFBRTs7UUFDN0YsSUFBSSxLQUFLLEdBQUcsSUFBSSxpQkFBSyxFQUFFLENBQUM7UUFDeEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxxQkFBTyxFQUFFLENBQUM7UUFDNUIsSUFBSSxlQUFlLENBQUM7UUFDcEIsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDL0MsSUFBSSxrQkFBa0IsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDN0MsSUFBSSxnQkFBZ0IsR0FBRyxDQUFDLHVCQUF1QixFQUFFLGVBQWUsRUFBRSxrQkFBa0IsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUN0RyxJQUFJLGdCQUFnQixHQUFHLENBQUMsc0NBQXNDLENBQUMsQ0FBQztRQUNoRSxJQUFJLFlBQVksR0FBRyxJQUFJLCtCQUFZLEVBQUUsQ0FBQztRQUN0QyxJQUFJLGFBQWEsR0FBRyxJQUFJLDhCQUFZLEVBQUUsQ0FBQztRQUN2QyxJQUFJLGlCQUFpQixHQUFHLElBQUksd0NBQWlCLEVBQUUsQ0FBQztRQUNoRCxJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3RSxJQUFJLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUM7UUFD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