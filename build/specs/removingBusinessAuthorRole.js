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
describe('Creating Groups Concourse ', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let group = new groups_Po_1.Group();
        let surface = new surfaces_Po_1.Surface();
        let originalTimeout;
        let properties = require('../conf/properties');
        let role = ['Business Author'];
        let responsibilities = ['Manage Attribute Tags', 'Manage Models', 'Manage Baselines', 'View Reports'];
        let organization = ['Default Surface - Root Surface Layer'];
        let attributeTag = new attributeTags_Po_1.AttributeTag();
        let assetsManager = new assetManager_Po_1.AssetManager();
        let logicalDeployment = new logicalDeployment_Po_1.LogicalDeployment();
        let user = properties.groupData.user;
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
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;
        });
        it('Step 1: Create New Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating New Group
                yield group.createGroup(baseSurface, groupName, groupDescription, 0);
                // Verify if the Group is created
                yield expectHelper_1.ExpectHelper.isListElementExists(group.groupList, groupName);
                groupId = yield group.getId();
                yield console.log('Group id is', groupId);
            });
        });
        it('Step 2: Asign User For New Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Assigning User For Newly Created Group
                yield group.assignUserForGroup(baseSurface, groupName, user, 0);
                yield expectHelper_1.ExpectHelper.isListElementExists(group.groupList, groupName);
            });
        });
        it('Step 3: Add Role Assignment For Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Assigning Roles For Group
                yield group.addRoleToGroup(baseSurface, groupName, role, responsibilities, organization);
                yield expectHelper_1.ExpectHelper.isListElementExists(group.groupList, groupName);
            });
        });
        it('Step 4: Create Attribute Tag', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Attribute Tag
                yield attributeTag.createAttributeTag(baseSurface, attributeTagName, attributeTagdescription);
                yield attributeTag.searchAttribute(baseSurface, attributeTagName, 'Description');
                yield expectHelper_1.ExpectHelper.isListElementExists(attributeTag.list, attributeTagName);
                yield protractor_1.browser.refresh();
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
                yield expectHelper_1.ExpectHelper.isListElementExists(logicalDeployment.deploymentList, deploymentName);
                deploymentId = yield logicalDeployment.getId();
                yield console.log('Logical Deployment Name is', deploymentName);
                yield console.log('Logical Deployment id is', deploymentId);
            });
        });
        it('Step 7: Remove Role Assignment From Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Removing Role From Group
                yield group.removeRolesFromGroup(baseSurface, groupName, role);
                yield protractor_1.browser.log.info('Cannot remove specified Business Author role because Logical Deployment(s) to Surface Layer(s) of owned Enclave Model(s)');
            });
        });
        it('Step 8: Delete Logical Deployment', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Delete Logical Deployement
                yield logicalDeployment.deleteLogicalDeployement(baseSurface, deploymentName);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(logicalDeployment.logicalDeployementElement(deploymentName));
            });
        });
        it('Step 9: Remove Role Assignment From Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Removing Role From Group
                yield group.removeRolesFromGroup(baseSurface, groupName, role);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(role));
            });
        });
        it('Step 10: Verify Role Assignment Removed Or Not', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Verifying the Role is Removed Or Not
                yield group.verifyRolesInUI(baseSurface, groupName, role);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(role));
            });
        });
        it('Step 11: Add Role Assignment again For Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Assigning Roles For Group
                yield group.addRoleToGroup(baseSurface, groupName, role, responsibilities, organization);
                yield expectHelper_1.ExpectHelper.isListElementExists(group.groupList, groupName);
            });
        });
        it('Step 12: Delete Enclave Model', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Deleting Enclave Model
                yield assetsManager.deleteEnclaveModel(baseSurface, assetName);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(assetsManager.enclaveModelElement(assetName));
            });
        });
        it('Step 13: Delete Attribute Tag', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Deleting Attribute Tag
                yield attributeTag.deleteAttributeTag(baseSurface, attributeTagName);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(attributeTag.searchAttributeName(attributeTagName));
            });
        });
        it('Step 14: Remove User From Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Removing User From Group
                yield group.removeUserForGroup(baseSurface, groupName, user);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(group.selectUserToDelete(groupName));
            });
        });
        it('Step 15: Deassociate Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                //  Deleting Group
                yield group.dissociateGroup(baseSurface, groupName, groupId);
            });
        });
        it('Step 16: Delete Group', function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZpbmdCdXNpbmVzc0F1dGhvclJvbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3BlY3MvcmVtb3ZpbmdCdXNpbmVzc0F1dGhvclJvbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBeUQ7QUFDekQsd0RBQXFEO0FBQ3JELHdEQUFpRDtBQUNqRCw0REFBcUQ7QUFDckQsb0VBQThEO0FBQzlELHNFQUErRDtBQUMvRCw4RUFBd0U7QUFFeEUsUUFBUSxDQUFDLDRCQUE0QixFQUFFOztRQUNuQyxJQUFJLEtBQUssR0FBRyxJQUFJLGlCQUFLLEVBQUUsQ0FBQztRQUN4QixJQUFJLE9BQU8sR0FBRyxJQUFJLHFCQUFPLEVBQUUsQ0FBQztRQUM1QixJQUFJLGVBQWUsQ0FBQztRQUNwQixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMvQyxJQUFJLElBQUksR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDL0IsSUFBSSxnQkFBZ0IsR0FBRyxDQUFDLHVCQUF1QixFQUFFLGVBQWUsRUFBRSxrQkFBa0IsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUN0RyxJQUFJLFlBQVksR0FBRyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFDNUQsSUFBSSxZQUFZLEdBQUcsSUFBSSwrQkFBWSxFQUFFLENBQUM7UUFDdEMsSUFBSSxhQUFhLEdBQUcsSUFBSSw4QkFBWSxFQUFFLENBQUM7UUFDdkMsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLHdDQUFpQixFQUFFLENBQUM7UUFDaEQsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFDckMsSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0UsSUFBSSxnQkFBZ0IsR0FBRyxVQUFV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