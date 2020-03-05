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
const policyGroupV3_Po_1 = require("../pageObjects/policyGroupV3.Po");
const attributeTags_Po_1 = require("../pageObjects/attributeTags.Po");
describe('Creaing Policy Group Concourse ', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let originalTimeout;
        let EC = protractor_1.ExpectedConditions;
        let attributeTag = new attributeTags_Po_1.AttributeTag();
        let policyPage = new policyGroupV3_Po_1.PolicyGroup();
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
        let permission = ['Allowed AWS Products in Stacks'];
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
                yield policyPage.createPolicyGroup(baseSurface, policyGroupNameDraft, policyGroupDescDraft, 'E2E Admin', 'DRAFT', policyGroupTemplateName, attributeTagName, services, 'Allowed AWS Products in Stacks', '1');
                // await policyPage.searchPolicyGroup(baseSurface, policyGroupNameDraft);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyPage.list, policyGroupNameDraft);
            });
        });
        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5R3JvdXBWMy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zcGVjcy9wb2xpY3lHcm91cFYzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkNBQWdEO0FBQ2hELHdEQUFxRDtBQUNyRCxrRkFBZ0Y7QUFDaEYsc0VBQThEO0FBQzlELHNFQUErRDtBQUcvRCxRQUFRLENBQUMsaUNBQWlDLEVBQUU7O1FBQzFDLElBQUksZUFBZSxDQUFDO1FBQ3BCLElBQUksRUFBRSxHQUFHLCtCQUFrQixDQUFDO1FBQzVCLElBQUksWUFBWSxHQUFHLElBQUksK0JBQVksRUFBRSxDQUFDO1FBQ3RDLElBQUksVUFBVSxHQUFHLElBQUksOEJBQVcsRUFBRSxDQUFDO1FBQ25DLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQy9DLElBQUksdUJBQXVCLEdBQUcsSUFBSSxnREFBdUIsRUFBRSxDQUFDO1FBQzVELElBQUksZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2RyxJQUFJLFdBQVcsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUM7UUFDcEUsSUFBSSx1QkFBdUIsR0FBRyxVQUFVLENBQUMsdUJBQXVCLENBQUMsc0NBQXNDLEdBQUcsdUJBQXVCLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4SixJQUFJLHVCQUF1QixHQUFHLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxzQ0FBc0MsQ0FBQztRQUN4RyxJQUFJLG9CQUFvQixHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQUMsb0JBQW9CLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUcsSUFBSSxvQkFBb0IsR0FBRyxVQUFVLENBQUMsZUFBZSxDQUFDLG9CQUFvQixDQUFDO1FBQzNFLElBQUksc0JBQXNCLEdBQUcsVUFBVSxDQUFDLGVBQWUsQ0FBQyxzQkFBc0IsR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsSCxJQUFJLHNCQUFzQixHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQUMsc0JBQXNCLENBQUM7UUFDL0UsSUFBSSxPQUFPLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUM7UUFDOUMsSUFBSSxXQUFXLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUM7UUFDckQsSUFBSSxRQUFRLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QixJQUFJLFVBQVUsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFFcEQsVUFBVSxDQUFDO1lBQ1QsZUFBZSxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQztZQUNuRCxPQUFPLENBQUMsd0JBQXdCLEdBQUcsTUFBTSxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLGdDQUFnQyxFQUFFOztnQkFDbkMseUJBQXlCO2dCQUN6QixNQUFNLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQ2xGLE1BQU0sWUFBWSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBQ2pGLE1BQU0sMkJBQVksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLENBQUM7WUFDOUUsQ0FBQztTQUFBLENBQUMsQ0FBQztRQUVILGlDQUFpQztRQUNqQyxFQUFFLENBQUMsd0RBQXdELEVBQUU7O2dCQUMzRCx5REFBeUQ7Z0JBQ3pELE1BQU0sdUJBQXVCLENBQUMseUJBQXlCLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSx1QkFBdUIsRUFBRSx1QkFBdUIsRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFDO2dCQUN0SyxNQUFNLHVCQUF1QixDQUFDLHlCQUF5QixDQUFDLFdBQVcsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO2dCQUM5RixNQUFNLDJCQUFZLENBQUMsbUJBQW1CLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLHVCQUF1QixDQUFDLENBQUM7WUFDaEcsQ0FBQztTQUFBLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQywyQ0FBMkMsRUFBRTs7Z0JBQzlDLDBDQUEwQztnQkFDMUMsTUFBTSxVQUFVLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLG9CQUFvQixFQUFFLG9CQUFvQixFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLGdDQUFnQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUM5TSx5RUFBeUU7Z0JBQ3pFLE1BQU0sMkJBQVksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLG9CQUFvQixDQUFDLENBQUM7WUFDaEYsQ0FBQztTQUFBLENBQUMsQ0FBQztRQUNILFNBQVMsQ0FBQztZQUNSLE9BQU8sQ0FBQyx3QkFBd0IsR0FBRyxlQUFlLENBQUM7UUFDckQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQUEsQ0FBQyxDQUFDIn0=