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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5R3JvdXBUZW1wbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zcGVjcy9wb2xpY3lHcm91cFRlbXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkNBQWdEO0FBQ2hELHdEQUFxRDtBQUNyRCxrRkFBZ0Y7QUFFaEYsUUFBUSxDQUFDLDBDQUEwQyxFQUFFOztRQUNuRCxJQUFJLGVBQWUsQ0FBQztRQUNwQixJQUFJLEVBQUUsR0FBRywrQkFBa0IsQ0FBQztRQUM1QixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMvQyxJQUFJLHVCQUF1QixHQUFHLElBQUksZ0RBQXVCLEVBQUUsQ0FBQztRQUM1RCxJQUFJLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyw0QkFBNEIsR0FBRyx1QkFBdUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hJLElBQUksU0FBUyxHQUFHLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyw0QkFBNEIsQ0FBQztRQUNoRixJQUFJLG1CQUFtQixHQUFHLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyw4QkFBOEIsR0FBRyx1QkFBdUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVJLElBQUksV0FBVyxHQUFHLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyw4QkFBOEIsQ0FBQztRQUNwRixJQUFJLFdBQVcsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQztRQUVyRCxVQUFVLENBQUM7WUFDVCxlQUFlLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDO1lBQ25ELE9BQU8sQ0FBQyx3QkFBd0IsR0FBRyxNQUFNLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsNERBQTRELEVBQUU7O2dCQUMvRCxxREFBcUQ7Z0JBQ3JELE1BQU0sdUJBQXVCLENBQUMseUJBQXlCLENBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQztnQkFDOUksTUFBTSx1QkFBdUIsQ0FBQyx5QkFBeUIsQ0FBQyxXQUFXLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztnQkFDeEYsTUFBTSwyQkFBWSxDQUFDLG1CQUFtQixDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBQzFGLENBQUM7U0FBQSxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsc0RBQXNELEVBQUU7O2dCQUN6RCxxREFBcUQ7Z0JBQ3JELE1BQU0sdUJBQXVCLENBQUMsdUJBQXVCLENBQUMsV0FBVyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUNqRyxNQUFNLHVCQUF1QixDQUFDLHlCQUF5QixDQUFDLFdBQVcsRUFBRSxpQkFBaUIsR0FBRyxVQUFVLENBQUMsQ0FBQztnQkFDckcsTUFBTSwyQkFBWSxDQUFDLG1CQUFtQixDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRSxpQkFBaUIsR0FBRyxVQUFVLENBQUMsQ0FBQztZQUN2RyxDQUFDO1NBQUEsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHdEQUF3RCxFQUFFOztnQkFDM0QscURBQXFEO2dCQUNyRCxNQUFNLHVCQUF1QixDQUFDLHlCQUF5QixDQUFDLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO2dCQUN4RixNQUFNLDJCQUFZLENBQUMsbUJBQW1CLENBQUMsdUJBQXVCLENBQUMsNkJBQTZCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ25ILENBQUM7U0FBQSxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsdUVBQXVFLEVBQUU7O2dCQUMxRSxNQUFNLHVCQUF1QixDQUFDLHlCQUF5QixDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQzNFLE1BQU0sdUJBQXVCLENBQUMseUJBQXlCLENBQUMsV0FBVyxFQUFFLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxDQUFDO2dCQUNyRyxNQUFNLDJCQUFZLENBQUMsbUJBQW1CLENBQUMsdUJBQXVCLENBQUMsNkJBQTZCLENBQUMsaUJBQWlCLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNoSSxDQUFDO1NBQUEsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHdEQUF3RCxFQUFFOztnQkFDM0QseURBQXlEO2dCQUN6RCxNQUFNLHVCQUF1QixDQUFDLHlCQUF5QixDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLGdDQUFnQyxDQUFDLENBQUM7Z0JBQ3RKLE1BQU0sdUJBQXVCLENBQUMseUJBQXlCLENBQUMsV0FBVyxFQUFFLG1CQUFtQixDQUFDLENBQUM7Z0JBQzFGLE1BQU0sMkJBQVksQ0FBQyxtQkFBbUIsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztZQUM1RixDQUFDO1NBQUEsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLGlCQUFpQixFQUFFOztnQkFDcEIsdURBQXVEO2dCQUN2RCxNQUFNLHVCQUF1QixDQUFDLHlCQUF5QixDQUFDLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNyRyxDQUFDO1NBQUEsQ0FBQyxDQUFDO1FBRUgsU0FBUyxDQUFDO1lBQ1IsT0FBTyxDQUFDLHdCQUF3QixHQUFHLGVBQWUsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztJQUVMLENBQUM7Q0FBQSxDQUFDLENBQUMifQ==