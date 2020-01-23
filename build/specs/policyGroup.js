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
// See README.md for important details.
const protractor_1 = require("protractor");
const expectHelper_1 = require("../utils/expectHelper");
const policyGroupTemplate_Po_1 = require("../pageObjects/policyGroupTemplate.Po");
const policyGroup_Po_1 = require("../pageObjects/policyGroup.Po");
const attributeTags_Po_1 = require("../pageObjects/attributeTags.Po");
describe('Creaing Policy Group Concourse ', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let originalTimeout;
        let EC = protractor_1.ExpectedConditions;
        let attributeTag = new attributeTags_Po_1.AttributeTag();
        let policyPage = new policyGroup_Po_1.PolicyGroup();
        let properties = require('../conf/properties');
        let policyGroupTemplatePage = new policyGroupTemplate_Po_1.PolicyGroupTemplatePage();
        let attributeTagName = properties.attributeTagData.attributeName1 + attributeTag.getRandomNum(1, 1000);
        let description = properties.attributeTagData.attributeDescription1;
        let policyGroupTemplateName = properties.policyGroupTemplateData.policyGroupTemplateNameWithAWSProducts + policyGroupTemplatePage.getRandomNum(1, 1000);
        let policyGroupTemplatedesc = properties.policyGroupTemplateData.policyGroupTemplateDescWithAWSProducts;
        let policyGroupNameDraft = properties.policyGroupData.policyGroupNameDraft + policyPage.getRandomNum(1, 1000);
        let policyGroupDescDraft = properties.policyGroupData.policyGroupDescDraft;
        let policyGroupNamePublish = properties.policyGroupData.policyGroupNamePublish + policyPage.getRandomNum(1, 1000);
        let policyGroupDescPublish = properties.policyGroupData.policyGroupDescPublish;
        let service = properties.ServicesData.service;
        let baseSurface = properties.SurfaceData.surfaceName;
        let services = [service];
        beforeEach(function () {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
        });
        it('Step 1: Creating Attribute Tag', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Attribute Tag
                yield attributeTag.createAttributeTag(baseSurface, attributeTagName, description);
                yield attributeTag.searchAttribute(baseSurface, attributeTagName, 'Description');
                yield expectHelper_1.ExpectHelper.isListElementExists(attributeTag.list, attributeTagName);
            });
        });
        // Creating policy group Tempalte
        it('Step 2: Creating Policy Group Template with  Published', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Verify if the plolciy Template is created as Published
                yield policyGroupTemplatePage.createPolicyGroupTemplate(baseSurface, 'PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Allowed AWS Products in Stacks');
                yield policyGroupTemplatePage.searchPolicyGroupTemplate(baseSurface, policyGroupTemplateName);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyGroupTemplatePage.list, policyGroupTemplateName);
            });
        });
        it('Step 3: Creating Policy Group with  Draft', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Policy Group With Draft Status
                yield policyPage.createPolicyGroup(baseSurface, policyGroupNameDraft, policyGroupDescDraft, 'E2E Admin', 'DRAFT', policyGroupTemplateName, attributeTagName, services);
                yield policyPage.searchPolicyGroup(baseSurface, policyGroupNameDraft);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyPage.list, policyGroupNameDraft);
            });
        });
        it('Step 4: Editing Policy Group with  Draft', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Edit The Draft Policy Group
                yield policyPage.editPolicyGroup(baseSurface, policyGroupNameDraft);
                yield policyPage.searchPolicyGroup(baseSurface, policyGroupNameDraft + ' Updated');
                yield expectHelper_1.ExpectHelper.isListElementExists(policyPage.list, policyGroupNameDraft + ' Updated');
            });
        });
        it('Step 5: Deleting Policy Group with  Draft', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Deleting Policy Group with Draft Status
                yield policyPage.deletePolicyGroup(baseSurface, policyGroupNameDraft);
                // Policy Group Deleted
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(policyPage.searchPolicyGroupName(policyGroupNameDraft));
            });
        });
        it('Step 6: Verify Policy Group With Draft Status Deleted or Not', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield policyPage.verifyPolicyGroup(policyGroupNameDraft);
                yield policyPage.searchPolicyGroup(baseSurface, policyGroupNameDraft + ' Updated');
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(policyPage.searchPolicyGroupName(policyGroupNameDraft + ' Updated'));
            });
        });
        it('Step 7: Creating Policy Group with  Published', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Policy Group with  Published
                yield policyPage.createPolicyGroup(baseSurface, policyGroupNamePublish, policyGroupDescPublish, 'E2E Admin', 'PUBLISHED', policyGroupTemplateName, attributeTagName, services);
                yield policyPage.searchPolicyGroup(baseSurface, policyGroupNamePublish);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyPage.list, policyGroupNamePublish);
            });
        });
        it('Step 8: Edit Policies And Publish Policy Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Edit Policies And Publish Policy Group
                yield policyPage.editPoliciesandPublish(baseSurface, policyGroupNamePublish, 'AWS::S3');
                yield policyPage.searchPolicyGroup(baseSurface, policyGroupNamePublish);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyPage.list, policyGroupNamePublish);
            });
        });
        it('Step 9: Delete Published Policy Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Edit Policies And Publish Policy Group
                yield policyPage.deletePolicyGroup(baseSurface, policyGroupNamePublish, 'false');
            });
        });
        it('Step 10: CleanUp', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // CleanUp
                yield policyGroupTemplatePage.deletePolicyGroupTemplate(baseSurface, policyGroupTemplateName, 'false');
                yield attributeTag.deleteAttributeTag(baseSurface, attributeTagName, 'false');
            });
        });
        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5R3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3BlY3MvcG9saWN5R3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBdUM7QUFDdkMsMkNBQWdEO0FBQ2hELHdEQUFxRDtBQUNyRCxrRkFBZ0Y7QUFDaEYsa0VBQTREO0FBQzVELHNFQUErRDtBQUcvRCxRQUFRLENBQUMsaUNBQWlDLEVBQUU7O1FBQzFDLElBQUksZUFBZSxDQUFDO1FBQ3BCLElBQUksRUFBRSxHQUFHLCtCQUFrQixDQUFDO1FBQzVCLElBQUksWUFBWSxHQUFHLElBQUksK0JBQVksRUFBRSxDQUFDO1FBQ3RDLElBQUksVUFBVSxHQUFHLElBQUksNEJBQVcsRUFBRSxDQUFDO1FBQ25DLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQy9DLElBQUksdUJBQXVCLEdBQUcsSUFBSSxnREFBdUIsRUFBRSxDQUFDO1FBQzVELElBQUksZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2RyxJQUFJLFdBQVcsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUM7UUFDcEUsSUFBSSx1QkFBdUIsR0FBRyxVQUFVLENBQUMsdUJBQXVCLENBQUMsc0NBQXNDLEdBQUcsdUJBQXVCLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4SixJQUFJLHVCQUF1QixHQUFHLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxzQ0FBc0MsQ0FBQztRQUN4RyxJQUFJLG9CQUFvQixHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQUMsb0JBQW9CLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUcsSUFBSSxvQkFB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