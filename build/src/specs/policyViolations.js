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
const risks_Po_1 = require("../pageObjects/risks.Po");
const expectHelper_1 = require("../utils/expectHelper");
const policyGroup_Po_1 = require("../pageObjects/policyGroup.Po");
const assetManager_Po_1 = require("../pageObjects/assetManager.Po");
const attributeTags_Po_1 = require("../pageObjects/attributeTags.Po");
const policyGroupTemplate_Po_1 = require("../pageObjects/policyGroupTemplate.Po");
const protractor_1 = require("protractor");
const utils_1 = require("../utils/utils");
describe('Verifying Policy Violation', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let originalTimeout;
        let risk = new risks_Po_1.Risk();
        let EC = protractor_1.ExpectedConditions;
        let policyPage = new policyGroup_Po_1.PolicyGroup();
        let attributeTag = new attributeTags_Po_1.AttributeTag();
        let assetsManager = new assetManager_Po_1.AssetManager();
        let properties = require('../conf/properties');
        let policyGroupTemplatePage = new policyGroupTemplate_Po_1.PolicyGroupTemplatePage();
        let attributeTagName = properties.attributeTagData.violationAttributeTagName + attributeTag.getRandomNum(1, 1000);
        let attributeTagDesc = properties.attributeTagData.violationAttributeTagDescription;
        let policyGroupTemplateName = properties.policyGroupTemplateData.policyGroupTemplateNameWithAWSProducts + policyGroupTemplatePage.getRandomNum(1, 1000);
        let policyGroupTemplatedesc = properties.policyGroupTemplateData.policyGroupTemplateDescWithAWSProducts;
        let policyGroupName = properties.policyGroupData.violationPolicyGroupName + policyPage.getRandomNum(1, 1000);
        let policyGroupDescription = properties.policyGroupData.violationPolicyGroupDescription;
        let assetName = properties.enclaveModelData.violationModel + assetsManager.getRandomNum(1, 1000);
        let description = properties.enclaveModelData.ViolationDescription;
        let baseSurface = properties.SurfaceData.surfaceName;
        let attributeTags = [attributeTagName];
        let service = ['AWS::S3'];
        let modelId;
        beforeEach(function () {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
        });
        it('Step 1: Create Attribute Tag', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Attribute Tag
                yield attributeTag.createAttributeTag(baseSurface, attributeTagName, attributeTagDesc);
                yield attributeTag.searchAttribute(baseSurface, attributeTagName, 'attributeTagDesc');
                yield expectHelper_1.ExpectHelper.isListElementExists(attributeTag.list, attributeTagName);
                yield console.log('Attribute Tag name is', attributeTagName);
            });
        });
        it('Step 2: Create New Enclave Model With Above Created Attribute Tag', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Enclave Model
                yield assetsManager.createEnclaveModel(baseSurface, 'PUBLISHED', assetName, description, attributeTags, 'ec2template.json', 'E2E Admin');
                modelId = yield assetsManager.getId();
                yield console.log('Enclave Model name is', assetName);
                yield console.log('Enclave Model id is', modelId);
                yield assetsManager.searchAssetManager(baseSurface, assetName);
                yield expectHelper_1.ExpectHelper.isListElementExists(assetsManager.assetList, assetName);
            });
        });
        it('Step 3: Creating Policy Group Template with  Published', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Policy Group Template
                yield policyGroupTemplatePage.createPolicyGroupTemplate(baseSurface, 'PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Allowed AWS Products in Stacks');
                yield policyGroupTemplatePage.searchPolicyGroupTemplate(baseSurface, policyGroupTemplateName);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyGroupTemplatePage.list, policyGroupTemplateName);
                yield console.log('Policy Group Template name is', policyGroupTemplateName);
            });
        });
        it('Step 4: Creating Policy Group with S3 ', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Policy Group
                yield policyPage.createPolicyGroup(baseSurface, policyGroupName, policyGroupDescription, 'E2E Admin', 'PUBLISHED', policyGroupTemplateName, attributeTagName, service, ' ', ' ', ' ', 'Allowed AWS Products in Stacks 1');
                let policyId = yield utils_1.getIdFromUrl();
                yield console.log('Policy Group Id is', policyId);
                yield console.log('Policy Group name is', policyGroupName);
                yield policyPage.searchPolicyGroup(baseSurface, policyGroupName);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
            });
        });
        it('Step 5: Verifying Risk ', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Verifying Risk
                yield risk.openRisk(modelId);
                yield expectHelper_1.ExpectHelper.isListElementExists(risk.risklist, modelId);
                yield console.log('Risk Happened For', modelId);
            });
        });
        it('Step 6: CleanUp ', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // CleanUp
                yield policyPage.deletePolicyGroup(baseSurface, policyGroupName, 'false');
                yield policyGroupTemplatePage.deletePolicyGroupTemplate(baseSurface, policyGroupTemplateName, 'false');
                yield assetsManager.deleteEnclaveModel(baseSurface, assetName, 'false');
                yield attributeTag.deleteAttributeTag(baseSurface, attributeTagName, 'false');
            });
        });
        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5VmlvbGF0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zcGVjcy9wb2xpY3lWaW9sYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0RBQStDO0FBQy9DLHdEQUFxRDtBQUNyRCxrRUFBNEQ7QUFDNUQsb0VBQThEO0FBQzlELHNFQUErRDtBQUMvRCxrRkFBZ0Y7QUFDaEYsMkNBQXlEO0FBQ3pELDBDQUE4QztBQUc5QyxRQUFRLENBQUMsNEJBQTRCLEVBQUU7O1FBRW5DLElBQUksZUFBZSxDQUFDO1FBQ3BCLElBQUksSUFBSSxHQUFHLElBQUksZUFBSSxFQUFFLENBQUM7UUFDdEIsSUFBSSxFQUFFLEdBQUcsK0JBQWtCLENBQUM7UUFDNUIsSUFBSSxVQUFVLEdBQUcsSUFBSSw0QkFBVyxFQUFFLENBQUM7UUFDbkMsSUFBSSxZQUFZLEdBQUcsSUFBSSwrQkFBWSxFQUFFLENBQUM7UUFDdEMsSUFBSSxhQUFhLEdBQUcsSUFBSSw4QkFBWSxFQUFFLENBQUM7UUFDdkMsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDL0MsSUFBSSx1QkFBdUIsR0FBRyxJQUFJLGdEQUF1QixFQUFFLENBQUM7UUFFNUQsSUFBSSxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMseUJBQXlCLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEgsSUFBSSxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsZ0NBQWdDLENBQUM7UUFDcEYsSUFBSSx1QkFBdUIsR0FBRyxVQUFVLENBQUMsdUJBQXVCLENBQUMsc0NBQXNDLEdBQUcsdUJBQXVCLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4SixJQUFJLHVCQUF1QixHQUFHLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxz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