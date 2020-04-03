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
const policyGroupTemplate_Po_1 = require("../pageObjects/policyGroupTemplate.Po");
const policyGroup_Po_1 = require("../pageObjects/policyGroup.Po");
const attributeTags_Po_1 = require("../pageObjects/attributeTags.Po");
const approvals_Po_1 = require("../pageObjects/approvals.Po");
const utils_1 = require("../utils/utils");
const cloudRole_Po_1 = require("../pageObjects/cloudRole.Po");
const groups_Po_1 = require("../pageObjects/groups.Po");
describe('Request For Cloud Role ', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let originalTimeout;
        let EC = protractor_1.ExpectedConditions;
        let attributeTag = new attributeTags_Po_1.AttributeTag();
        let policyPage = new policyGroup_Po_1.PolicyGroup();
        let cloudRole = new cloudRole_Po_1.CloudRoles();
        let approvals = new approvals_Po_1.Approvals();
        let group = new groups_Po_1.Group();
        let properties = require('../conf/properties');
        let policyGroupTemplatePage = new policyGroupTemplate_Po_1.PolicyGroupTemplatePage();
        let attributeTagName = properties.attributeTagData.attributeName1 + attributeTag.getRandomNum(1, 1000);
        let description = properties.attributeTagData.attributeDescription1;
        let policyGroupTemplateName = properties.policyGroupTemplateData.requireApprovalPolicyGroupTemplateName + policyGroupTemplatePage.getRandomNum(1, 1000);
        let policyGroupTemplatedesc = properties.policyGroupTemplateData.requireApprovalPolicyGroupTemplateDesc;
        let policyGroupName = properties.policyGroupData.policyGroupName + policyPage.getRandomNum(1, 1000);
        let policyGroupDesc = properties.policyGroupData.policyGroupDesc;
        let cloudRoleName = properties.CloudRolesData.cloudRoleName + cloudRole.getRandomNum(1, 1000);
        let cloudRoleDescription = properties.CloudRolesData.cloudRoleDesc;
        let provider = properties.CloudRolesData.amazonProvider;
        let groupName = properties.groupData.groupName + group.getRandomNum(1, 1000);
        let groupDescription = properties.groupData.groupDescription;
        let user = properties.groupData.user;
        let amazonAction = ['a4b:DisassociateDeviceFromRoom'];
        let amazonNonAction = ['a4b:DeleteUser'];
        let azureAction = ['operations/read'];
        let azureNonAction = ['virtualMachines/write'];
        let role = ['Cloud Permission Admin'];
        let responsibilities = ['Manage Cloud Role Assignments'];
        let organization = ['Default Surface - Root Surface Layer'];
        let service = properties.ServicesData.service;
        let baseSurface = properties.SurfaceData.surfaceName;
        let services = [service];
        let attitibuteTag = [attributeTagName];
        let cloudRoles = [cloudRoleName];
        let publishedCloudRoleId;
        let policyGroupId;
        let cloudRoleId;
        let groupId;
        beforeEach(function () {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
        });
        it('Step 1: Create Attribute Tag', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield attributeTag.createAttributeTag(baseSurface, attributeTagName, description);
                yield attributeTag.searchAttribute(baseSurface, attributeTagName, 'Description');
                yield expectHelper_1.ExpectHelper.isListElementExists(attributeTag.list, attributeTagName);
            });
        });
        it('Step 2: Create Policy Group Template with  Published', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield policyGroupTemplatePage.createPolicyGroupTemplate(baseSurface, 'PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Require Approval of Institutional Entities');
                yield policyGroupTemplatePage.searchPolicyGroupTemplate(baseSurface, policyGroupTemplateName);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyGroupTemplatePage.list, policyGroupTemplateName);
            });
        });
        it('Step 3: Create Policy Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield policyPage.createPolicyGroup(baseSurface, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', policyGroupTemplateName, attributeTagName, services, 'Default Surface - Root Surface Layer', 'CLOUD_ROLE', 'E2E Admin');
                policyGroupId = yield utils_1.getIdFromUrl();
                yield console.log('Policy Group id Is', policyGroupId);
                yield policyPage.searchPolicyGroup(baseSurface, policyGroupName);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
            });
        });
        it('Step 4: Verify Approval Request To Publish Policy Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield approvals.VerifyPublishedApprovalRequest(baseSurface, policyGroupId);
                // await ExpectHelper.isListElementExists(approvals.approvalList, policyGroupId);
            });
        });
        it('Step 5: Approve Publish Request For Policy Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield approvals.ApprovalAction(baseSurface, policyGroupId);
            });
        });
        it('Step 6: Create New Cloud Role', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield cloudRole.createCloudRole(baseSurface, cloudRoleName, cloudRoleDescription, provider, 'DRAFT', amazonAction, amazonNonAction);
                yield expectHelper_1.ExpectHelper.isListElementExists(cloudRole.list, cloudRoleName);
                cloudRoleId = yield utils_1.getIdFromUrl();
                yield console.log('Cloud Role id is', cloudRoleId);
            });
        });
        it('Step 7: Create New Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield group.createGroup(baseSurface, groupName, groupDescription, 0);
                yield expectHelper_1.ExpectHelper.isListElementExists(group.groupList, groupName);
                groupId = yield group.getId();
                yield console.log('Group id is', groupId);
            });
        });
        it('Step 8: Asign User For New Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield group.assignUserForGroup(baseSurface, groupName, user, 0);
                yield expectHelper_1.ExpectHelper.isListElementExists(group.groupList, groupName);
            });
        });
        it('Step 9: Add Role Assignment For Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Assigning Roles For Group
                yield group.addRoleToGroup(baseSurface, groupName, role, responsibilities, organization);
                yield expectHelper_1.ExpectHelper.isListElementExists(group.groupList, groupName);
            });
        });
        it('Step 10: Add Cloud Role For Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield group.assignCloudRoleForGroup(baseSurface, groupName, 0, cloudRoles);
                yield expectHelper_1.ExpectHelper.isListElementExists(group.groupList, groupName);
            });
        });
        it('Step 11: Publish New Cloud Role', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield cloudRole.publishCloudRole(baseSurface, cloudRoleName, cloudRoleDescription);
                yield expectHelper_1.ExpectHelper.isListElementExists(cloudRole.list, cloudRoleName);
                publishedCloudRoleId = yield utils_1.getIdFromUrl();
                yield console.log('Cloud Role id is', publishedCloudRoleId);
            });
        });
        it('Step 12: Verify Approval Request To Publish Cloud Role', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield approvals.VerifyPublishedApprovalRequest(baseSurface, publishedCloudRoleId);
                // await ExpectHelper.isListElementExists(approvals.approvalList, publishedCloudRoleId);
            });
        });
        it('Step 13: Approve Publish Request For Cloud Role', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield approvals.ApprovalAction(baseSurface, publishedCloudRoleId);
            });
        });
        it('Step 14: Delete Cloud Role', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield cloudRole.deleteCloudRole(baseSurface, cloudRoleName, 'false');
                yield protractor_1.browser.refresh();
            });
        });
        it('Step 15: Verify Approval Request To Delete Cloud Role', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield approvals.VerifyDeleteApprovalRequest(baseSurface, publishedCloudRoleId);
                // await ExpectHelper.isListElementExists(approvals.approvalList, publishedCloudRoleId);
            });
        });
        it('Step 16: Remove Cloud Role From Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield group.removeCloudRolesFromGroup(baseSurface, groupName, 1, cloudRoles);
            });
        });
        it('Step 17: Approve Delete Action For Cloud Role', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield approvals.ApprovalAction(baseSurface, publishedCloudRoleId);
            });
        });
        it('Step 18: Verify Cloud Role is Deleted Or Not', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield cloudRole.verifyCloudRole(baseSurface, cloudRoleName);
            });
        });
        it('Step 19: Approval Request to Delete Policy Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield approvals.DeleteApprovalRequest(baseSurface, policyGroupName);
            });
        });
        it('Step 20: Verify Approval Request to Delete Policy Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield approvals.VerifyDeleteApprovalRequest(baseSurface, policyGroupId);
                // await ExpectHelper.isListElementExists(approvals.approvalList, policyGroupId);
            });
        });
        it('Step 21: Approve Delete Request For Policy Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield approvals.ApprovalAction(baseSurface, policyGroupId);
            });
        });
        it('Step 22: Remove Role Assignment From Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Removing Role From Group
                yield group.removeRolesFromGroup(baseSurface, groupName, role);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(role));
            });
        });
        it('Step 23: Remove User From Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Removing User From Group
                yield group.removeUserForGroup(baseSurface, groupName, user);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(group.selectUserToDelete(groupName));
            });
        });
        it('Step 24: De-associate Group From Surface', function () {
            return __awaiter(this, void 0, void 0, function* () {
                //  De-associate Group
                yield group.dissociateGroup(baseSurface, groupName, groupId);
            });
        });
        it('Step 25: Delete Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                //  Deleting Group
                yield group.deleteGroup(baseSurface, groupName);
            });
        });
        it('Step 26 CleanUp', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield policyGroupTemplatePage.deletePolicyGroupTemplate(baseSurface, policyGroupTemplateName, 'false');
                yield attributeTag.deleteAttributeTag(baseSurface, attributeTagName, 'false');
            });
        });
        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdEZvckNsb3VkUm9sZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvZTJlL3NyYy9zcGVjcy9yZXF1ZXN0Rm9yQ2xvdWRSb2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXlEO0FBQ3pELHdEQUFxRDtBQUNyRCxrRkFBZ0Y7QUFDaEYsa0VBQTREO0FBQzVELHNFQUErRDtBQUMvRCw4REFBd0Q7QUFDeEQsMENBQThDO0FBQzlDLDhEQUF5RDtBQUN6RCx3REFBaUQ7QUFFakQsUUFBUSxDQUFDLHlCQUF5QixFQUFFOztRQUNoQyxJQUFJLGVBQWUsQ0FBQztRQUNwQixJQUFJLEVBQUUsR0FBRywrQkFBa0IsQ0FBQztRQUM1QixJQUFJLFlBQVksR0FBRyxJQUFJLCtCQUFZLEVBQUUsQ0FBQztRQUN0QyxJQUFJLFVBQVUsR0FBRyxJQUFJLDRCQUFXLEVBQUUsQ0FBQztRQUNuQyxJQUFJLFNBQVMsR0FBRyxJQUFJLHlCQUFVLEVBQUUsQ0FBQztRQUNqQyxJQUFJLFNBQVMsR0FBRyxJQUFJLHdCQUFTLEVBQUUsQ0FBQztRQUNoQyxJQUFJLEtBQUssR0FBRyxJQUFJLGlCQUFLLEVBQUUsQ0FBQztRQUN4QixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMvQyxJQUFJLHVCQUF1QixHQUFHLElBQUksZ0RBQXVCLEVBQUUsQ0FBQztRQUM1RCxJQUFJLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkcsSUFBSSxXQUFXLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDO1FBQ3BFLElBQUksdUJBQXVCLEdBQUcsVUFBVSxDQUFDLHVCQUF1QixD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