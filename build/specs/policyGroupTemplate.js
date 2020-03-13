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
const policyGroupTemplate_Po_1 = require("../pageObjects/policyGroupTemplate.Po");
describe('Creaing Policy Group Template Concourse ', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let originalTimeout;
        let EC = protractor_1.ExpectedConditions;
        let properties = require('../conf/properties');
        let policyGroupTemplatePage = new policyGroupTemplate_Po_1.PolicyGroupTemplatePage();
        let templateNameDraft = properties.policyGroupTemplateData.policyGroupTemplateNameDraft + policyGroupTemplatePage.getRandomNum(1, 1000);
        let descDraft = properties.policyGroupTemplateData.policyGroupTemplateDescDraft;
        let templateNamePublish = properties.policyGroupTemplateData.policyGroupTemplateNamePublish + policyGroupTemplatePage.getRandomNum(1, 1000);
        let descPublish = properties.policyGroupTemplateData.policyGroupTemplateDescPublish;
        let baseSurface = properties.SurfaceData.surfaceName;
        beforeEach(function () {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
        });
        it('Step 1: Create New Policy Group Template With Draft Status', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Create a policy Template selecting status as DRAFT
                yield policyGroupTemplatePage.createPolicyGroupTemplate(baseSurface, 'DRAFT', templateNameDraft, descDraft, 'Allowed AWS Products in Stacks');
                yield policyGroupTemplatePage.searchPolicyGroupTemplate(baseSurface, templateNameDraft);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyGroupTemplatePage.list, templateNameDraft);
            });
        });
        it('Step 2: Edit Policy Group Template With Draft Status', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Create a policy Template selecting status as DRAFT
                yield policyGroupTemplatePage.editPolicyGroupTemplate(baseSurface, templateNameDraft, descDraft);
                yield policyGroupTemplatePage.searchPolicyGroupTemplate(baseSurface, templateNameDraft + ' Updated');
                yield expectHelper_1.ExpectHelper.isListElementExists(policyGroupTemplatePage.list, templateNameDraft + ' Updated');
            });
        });
        it('Step 3: Delete Policy Group Template With Draft Status', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Create a policy Template selecting status as DRAFT
                yield policyGroupTemplatePage.deletePolicyGroupTemplate(baseSurface, templateNameDraft);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(policyGroupTemplatePage.searchPolicyGroupTemplateName(templateNameDraft));
            });
        });
        it('Step 4: Verify Policy Group Template With Draft Status Deleted or Not', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield policyGroupTemplatePage.verifyPolicyGroupTemplate(templateNameDraft);
                yield policyGroupTemplatePage.searchPolicyGroupTemplate(baseSurface, templateNameDraft + ' Updated');
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(policyGroupTemplatePage.searchPolicyGroupTemplateName(templateNameDraft + ' Updated'));
            });
        });
        it('Step 5: Creating Policy Group Template with  Published', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Verify if the plolciy Template is created as Published
                yield policyGroupTemplatePage.createPolicyGroupTemplate(baseSurface, 'PUBLISHED', templateNamePublish, descPublish, 'Allowed AWS Products in Stacks');
                yield policyGroupTemplatePage.searchPolicyGroupTemplate(baseSurface, templateNamePublish);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyGroupTemplatePage.list, templateNamePublish);
            });
        });
        it('Step 6: CleanUp', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Delete The Policy Group Template With Publish Status
                yield policyGroupTemplatePage.deletePolicyGroupTemplate(baseSurface, templateNamePublish, 'false');
            });
        });
        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5R3JvdXBUZW1wbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zcGVjcy9wb2xpY3lHcm91cFRlbXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQ0FBZ0Q7QUFDaEQsd0RBQXFEO0FBQ3JELGtGQUFnRjtBQUVoRixRQUFRLENBQUMsMENBQTBDLEVBQUU7O1FBQ25ELElBQUksZUFBZSxDQUFDO1FBQ3BCLElBQUksRUFBRSxHQUFHLCtCQUFrQixDQUFDO1FBQzVCLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQy9DLElBQUksdUJBQXVCLEdBQUcsSUFBSSxnREFBdUIsRUFBRSxDQUFDO1FBQzVELElBQUksaUJBQWlCLEdBQUcsVUFBVSxDQUFDLHVCQUF1QixDQUFDLDRCQUE0QixHQUFHLHVCQUF1QixDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEksSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLHVCQUF1QixDQUFDLDRCQUE0QixDQUFDO1FBQ2hGLElBQUksbUJBQW1CLEdBQUcsVUFBVSxDQUFDLHVCQUF1QixDQUFDLDhCQUE4QixHQUFHLHVCQUF1QixDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUksSUFBSSxXQUFXLEdBQUcsVUFBVSxDQUFDLHVCQUF1QixDQUFDLDhCQUE4QixDQUFDO1FBQ3BGLElBQUksV0FBVyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO1FBRXJELFVBQVUsQ0FBQztZQUNULGVBQWUsR0FBRyxPQUFPLENBQUMsd0JBQXdCLENBQUM7WUFDbkQsT0FBTyxDQUFDLHdCQUF3QixHQUFHLE1BQU0sQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyw0REFBNEQsRUFBRTs7Z0JBQy9ELHFEQUFxRDtnQkFDckQsTUFBTSx1QkFB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