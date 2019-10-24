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
describe('Policy Group Concourse ', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let originalTimeout;
        let EC = protractor_1.ExpectedConditions;
        let attributeTag = new attributeTags_Po_1.AttributeTag();
        let policyPage = new policyGroup_Po_1.PolicyGroup();
        let approvals = new approvals_Po_1.Approvals();
        let properties = require('../conf/properties');
        let policyGroupTemplatePage = new policyGroupTemplate_Po_1.PolicyGroupTemplatePage();
        let attributeTagName = properties.attributeTagData.attributeName1 + attributeTag.getRandomNum(1, 1000);
        let description = properties.attributeTagData.attributeDescription1;
        let policyGroupTemplateName = properties.policyGroupTemplateData.requireApprovalPolicyGroupTemplateName + policyGroupTemplatePage.getRandomNum(1, 1000);
        let policyGroupTemplatedesc = properties.policyGroupTemplateData.requireApprovalPolicyGroupTemplateDesc;
        let policyGroupName = properties.policyGroupData.policyGroupName + policyPage.getRandomNum(1, 1000);
        let policyGroupDesc = properties.policyGroupData.policyGroupDesc;
        let service = properties.ServicesData.service;
        let services = [service];
        let policyGroupId;
        beforeEach(function () {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;
        });
        it('Step 1: Creating Attribute Tag', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield attributeTag.createAttributeTag(attributeTagName, description);
                yield attributeTag.searchAttribute(attributeTagName, 'Description');
                yield expectHelper_1.ExpectHelper.isListElementExists(attributeTag.list, attributeTagName);
            });
        });
        it('Step 2: Creating Policy Group Template with  Published', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield policyGroupTemplatePage.createPolicyGroupTemplate('PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Require Approval');
                yield policyGroupTemplatePage.searchPolicyGroupTemplate(policyGroupTemplateName);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyGroupTemplatePage.list, policyGroupTemplateName);
            });
        });
        it('Step 3: Creating Policy Group with  Draft', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield policyPage.createPolicyGroup(policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', policyGroupTemplateName, attributeTagName, services, '', 'POLICY_GROUP', 'E2E Admin');
                yield policyPage.searchPolicyGroup(policyGroupName);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
            });
        });
        it('Step 4: Edit Policies And Publish Policy Group For Approval', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield policyPage.editSurfaceLayerAndPublish(policyGroupName, 'Default Surface - Root Surface Layer');
                policyGroupId = yield utils_1.getIdFromUrl();
                yield console.log('Policy Group id Is', policyGroupId);
            });
        });
        it('Step 5: Verify Approval Request For Publish', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield approvals.VerifyPublishedApprovalRequest(policyGroupId);
                yield expectHelper_1.ExpectHelper.isListElementExists(approvals.approvalList, policyGroupId);
            });
        });
        it('Step 6: Approve Publish Request', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield approvals.ApprovalAction(policyGroupId);
            });
        });
        it('Step 7: Approval Request For Delete', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield approvals.DeleteApprovalRequest(policyGroupName);
            });
        });
        it('Step 8: Verify Approval Request For Delete', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield approvals.VerifyDeleteApprovalRequest(policyGroupId);
                yield expectHelper_1.ExpectHelper.isListElementExists(approvals.approvalList, policyGroupId);
            });
        });
        it('Step 9: Approve Publish Delete', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield approvals.ApprovalAction(policyGroupId);
            });
        });
        it('Step 10: Verify Policy Group Deleted Or Not', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield policyPage.searchPolicyGroup(policyGroupName);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(policyPage.searchPolicyGroupName(policyGroupName));
            });
        });
        it('Step 11: CleanUp', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield policyGroupTemplatePage.deletePolicyGroupTemplate(policyGroupTemplateName, 'false');
                yield attributeTag.deleteAttributeTag(attributeTagName, 'false');
            });
        });
        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwcm92YWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NwZWNzL2FwcHJvdmFscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDJDQUFnRDtBQUNoRCx3REFBcUQ7QUFDckQsa0ZBQWdGO0FBQ2hGLGtFQUE0RDtBQUM1RCxzRUFBK0Q7QUFDL0QsOERBQXdEO0FBQ3hELDBDQUE4QztBQUU5QyxRQUFRLENBQUMseUJBQXlCLEVBQUU7O1FBQ2hDLElBQUksZUFBZSxDQUFDO1FBQ3BCLElBQUksRUFBRSxHQUFHLCtCQUFrQixDQUFDO1FBQzVCLElBQUksWUFBWSxHQUFHLElBQUksK0JBQVksRUFBRSxDQUFDO1FBQ3RDLElBQUksVUFBVSxHQUFHLElBQUksNEJBQVcsRUFBRSxDQUFDO1FBQ25DLElBQUksU0FBUyxHQUFHLElBQUksd0JBQVMsRUFBRSxDQUFDO1FBQ2hDLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQy9DLElBQUksdUJBQXVCLEdBQUcsSUFBSSxnREFBdUIsRUFBRSxDQUFDO1FBQzVELElBQUksZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2RyxJQUFJLFdBQVcsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUM7UUFDcEUsSUFBSSx1QkFBdUIsR0FBRyxVQUFVLENBQUMsdUJBQXVCLENBQUMsc0NBQXNDLEdBQUcsdUJBQXVCLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4SixJQUFJLHVCQUF1QixHQUFHLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxzQ0FBc0MsQ0FBQztRQUN4RyxJQUFJLGVBQWUsR0FBRyxVQUFVLENBQUMsZUFBZSxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUMsWUFB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