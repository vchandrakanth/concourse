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
const attributeTags_Po_1 = require("../pageObjects/attributeTags.Po");
const policyGroup_Po_1 = require("../pageObjects/policyGroup.Po");
const policyGroupTemplate_Po_1 = require("../pageObjects/policyGroupTemplate.Po");
const utils_1 = require("../utils/utils");
describe('Creating Groups Concourse ', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let group = new groups_Po_1.Group();
        let surface = new surfaces_Po_1.Surface();
        let originalTimeout;
        let properties = require('../conf/properties');
        let role = ['Control Author'];
        let responsibilities = ['Manage Policy Group Templates', 'Manage Policy Groups', 'View Reports'];
        let organization = ['Default Surface - Root Surface Layer'];
        let attributeTag = new attributeTags_Po_1.AttributeTag();
        let policyPage = new policyGroup_Po_1.PolicyGroup();
        let policyGroupTemplatePage = new policyGroupTemplate_Po_1.PolicyGroupTemplatePage();
        let user = properties.groupData.user;
        let groupName = properties.groupData.groupName + group.getRandomNum(1, 1000);
        let groupDescription = properties.groupData.groupDescription;
        let policyGroupTemplateName = properties.policyGroupTemplateData.policyGroupTemplateNameWithAWSProducts + policyGroupTemplatePage.getRandomNum(1, 1000);
        let policyGroupTemplatedesc = properties.policyGroupTemplateData.policyGroupTemplateDescWithAWSProducts;
        let policyGroupName = properties.policyGroupData.violationPolicyGroupName + policyPage.getRandomNum(1, 1000);
        let policyGroupDescription = properties.policyGroupData.violationPolicyGroupDescription;
        let attributeTagName = properties.attributeTagData.attributeName1 + attributeTag.getRandomNum(1, 1000);
        let attributeTagdescription = properties.attributeTagData.attributeDescription1;
        let baseSurface = properties.SurfaceData.surfaceName;
        let service = ['AWS::S3'];
        let groupId;
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
                yield protractor_1.browser.refresh();
            });
        });
        it('Step 2: Asign User For New Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Assigning User For Newly Created Group
                yield group.assignUserForGroup(baseSurface, groupName, user, 0);
                yield expectHelper_1.ExpectHelper.isListElementExists(group.groupList, groupName);
                yield protractor_1.browser.refresh();
            });
        });
        it('Step 3: Add Role Assignment For Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Assigning Roles For Group
                yield group.addRoleToGroup(baseSurface, groupName, role, responsibilities, organization);
                yield expectHelper_1.ExpectHelper.isListElementExists(group.groupList, groupName);
                yield protractor_1.browser.refresh();
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
        it('Step 5: Creating Policy Group Template with  Published', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Policy Group Template
                yield policyGroupTemplatePage.createPolicyGroupTemplate(baseSurface, 'PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Allowed AWS Products in Stacks');
                yield policyGroupTemplatePage.searchPolicyGroupTemplate(baseSurface, policyGroupTemplateName);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyGroupTemplatePage.list, policyGroupTemplateName);
                yield console.log('Policy Group Template name is', policyGroupTemplateName);
            });
        });
        it('Step 6: Creating Policy Grou', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // // Creating Policy Group
                yield policyPage.createPolicyGroup(baseSurface, policyGroupName, policyGroupDescription, 'E2E Admin', 'PUBLISHED', policyGroupTemplateName, attributeTagName, service);
                let s3PolicyGroupId = yield utils_1.getIdFromUrl();
                yield console.log('Policy Group name is', s3PolicyGroupId);
                yield console.log('Policy Group name is', policyGroupName);
                yield policyPage.searchPolicyGroup(baseSurface, policyGroupName);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
            });
        });
        it('Step 7: Remove Role Assignment From Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Removing Role From Group
                yield group.removeRolesFromGroup(baseSurface, groupName, role);
                // await ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(role));
            });
        });
        it('Step 8: Deleting Policy Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield policyPage.deletePolicyGroup(baseSurface, policyGroupName, 'false');
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(policyPage.searchPolicyGroupName(policyGroupName));
            });
        });
        it('Step 9: Remove Role Assignment From Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Removing Role From Group
                yield group.removeRolesFromGroup(baseSurface, groupName, role);
                // await ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(role));
            });
        });
        it('Step 10: Verify Role Assignment Removed Or Not', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Verifying the Role is Removed Or Not
                yield group.verifyRolesInUI(baseSurface, groupName, role);
                // await ExpectHelper.expectDoesNotExists(group.selectRoleToDelete(role));
            });
        });
        it('Step 11: Clean Up', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Verifying the Role is Removed Or Not
                yield policyGroupTemplatePage.deletePolicyGroupTemplate(baseSurface, policyGroupTemplateName, 'false');
                yield attributeTag.deleteAttributeTag(baseSurface, attributeTagName, 'false');
                yield group.dissociateGroup(baseSurface, groupId);
                yield group.removeUserForGroup(baseSurface, groupName, user);
                yield group.deleteGroup(baseSurface, groupName);
            });
        });
        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlQ29udHJvbEF1dGhvclJvbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3BlY3MvcmVtb3ZlQ29udHJvbEF1dGhvclJvbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBeUQ7QUFDekQsd0RBQXFEO0FBQ3JELHdEQUFpRDtBQUNqRCw0REFBcUQ7QUFDckQsc0VBQStEO0FBQy9ELGtFQUE0RDtBQUM1RCxrRkFBZ0Y7QUFDaEYsMENBQThDO0FBRTlDLFFBQVEsQ0FBQyw0QkFBNEIsRUFBRTs7UUFDbkMsSUFBSSxLQUFLLEdBQUcsSUFBSSxpQkFBSyxFQUFFLENBQUM7UUFDeEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxxQkFBTyxFQUFFLENBQUM7UUFDNUIsSUFBSSxlQUFlLENBQUM7UUFDcEIsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDL0MsSUFBSSxJQUFJLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlCLElBQUksZ0JBQWdCLEdBQUcsQ0FBQywrQkFBK0IsRUFBRSxzQkFBc0IsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUNqRyxJQUFJLFlBQVksR0FBRyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFDNUQsSUFBSSxZQUFZLEdBQUcsSUFBSSwrQkFBWSxFQUFFLENBQUM7UUFDdEMsSUFBSSxVQUFVLEdBQUcsSUFBSSw0QkFBVyxFQUFFLENBQUM7UUFDbkMsSUFBSSx1QkFBdUIsR0FBRyxJQUFJLGdEQUF1QixFQUFFLENBQUM7UUFDNUQsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFDckMsSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0UsSUFBSSxnQkFBZ0IsR0FBRyxVQUFVLENB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