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
        let permission = 'Allowed AWS Products in Stacks';
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
                yield policyPage.createPolicyGroup(baseSurface, policyGroupNameDraft, policyGroupDescDraft, 'E2E Admin', 'DRAFT', policyGroupTemplateName, attributeTagName, services, ' ', ' ', '', 'Allowed AWS Products in Stacks 1');
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
                yield policyPage.createPolicyGroup(baseSurface, policyGroupNamePublish, policyGroupDescPublish, 'E2E Admin', 'PUBLISHED', policyGroupTemplateName, attributeTagName, services, ' ', ' ', ' ', 'Allowed AWS Products in Stacks 1');
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
                // await policyPage.searchPolicyGroup(baseSurface, policyGroupNamePublish);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(policyPage.searchPolicyGroupName(policyGroupNameDraft));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5R3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3BlY3MvcG9saWN5R3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBZ0Q7QUFDaEQsd0RBQXFEO0FBQ3JELGtGQUFnRjtBQUNoRixrRUFBNEQ7QUFDNUQsc0VBQStEO0FBRy9ELFFBQVEsQ0FBQyxpQ0FBaUMsRUFBRTs7UUFDMUMsSUFBSSxlQUFlLENBQUM7UUFDcEIsSUFBSSxFQUFFLEdBQUcsK0JBQWtCLENBQUM7UUFDNUIsSUFBSSxZQUFZLEdBQUcsSUFBSSwrQkFBWSxFQUFFLENBQUM7UUFDdEMsSUFBSSxVQUFVLEdBQUcsSUFBSSw0QkFBVyxFQUFFLENBQUM7UUFDbkMsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDL0MsSUFBSSx1QkFBdUIsR0FBRyxJQUFJLGdEQUF1QixFQUFFLENBQUM7UUFDNUQsSUFBSSxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3ZHLElBQUksV0FBVyxHQUFHLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQztRQUNwRSxJQUFJLHVCQUF1QixHQUFHLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxzQ0FBc0MsR0FBRyx1QkFBdUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hKLElBQUksdUJBQXVCLEdBQUcsVUFBVSxDQUFDLHVCQUF1QixDQUFDLHNDQUFzQyxDQUFDO1FBQ3hHLElBQUksb0JBQW9CLEdBQUcsVUFBVSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5RyxJQUFJLG9CQUFvQixHQUFHLFVB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