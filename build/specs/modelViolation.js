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
const risks_Po_1 = require("../pageObjects/risks.Po");
const expectHelper_1 = require("../utils/expectHelper");
const policyGroup_Po_1 = require("../pageObjects/policyGroup.Po");
const assetManager_Po_1 = require("../pageObjects/assetManager.Po");
const attributeTags_Po_1 = require("../pageObjects/attributeTags.Po");
const policyGroupTemplate_Po_1 = require("../pageObjects/policyGroupTemplate.Po");
const utils_1 = require("../utils/utils");
describe('Creaing Model Violations ', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let EC = protractor_1.ExpectedConditions;
        let risk = new risks_Po_1.Risk();
        let originalTimeout;
        let policyPage = new policyGroup_Po_1.PolicyGroup();
        let attributeTag = new attributeTags_Po_1.AttributeTag();
        let assetsManager = new assetManager_Po_1.AssetManager();
        let properties = require('../conf/properties');
        let policyGroupTemplatePage = new policyGroupTemplate_Po_1.PolicyGroupTemplatePage();
        let attributeTagName = properties.attributeTagData.violationAttributeTagName + attributeTag.getRandomNum(1, 1000);
        let attributeTagDesc = properties.attributeTagData.violationAttributeTagDescription;
        let attributeTagName1 = properties.attributeTagData.violationAttributeTagName + attributeTag.getRandomNum(1, 1000);
        let attributeTagDesc1 = properties.attributeTagData.violationAttributeTagDescription;
        let policyGroupTemplateName = properties.policyGroupTemplateData.policyGroupTemplateNameWithAWSProducts + policyGroupTemplatePage.getRandomNum(1, 1000);
        let policyGroupTemplatedesc = properties.policyGroupTemplateData.policyGroupTemplateDescWithAWSProducts;
        let policyGroupName = properties.policyGroupData.modelViolationPolicyGroupName + policyPage.getRandomNum(1, 1000);
        let policyGroupDescription = properties.policyGroupData.modelViolationPolicyGroupDescription;
        let policyGroupName1 = properties.policyGroupData.modelViolationPolicyGroupName + policyPage.getRandomNum(1, 1000);
        let policyGroupDescription1 = properties.policyGroupData.modelViolationPolicyGroupDescription;
        let assetName = properties.enclaveModelData.violationModel + assetsManager.getRandomNum(1, 1000);
        let description = properties.enclaveModelData.ViolationDescription;
        let attributeTags = [attributeTagName, attributeTagName1];
        let entityType = properties.ApprovalsData.policyGroupType;
        let baseSurface = properties.SurfaceData.surfaceName;
        let service = ['AWS::S3'];
        let service1 = ['AWS::EC2'];
        let modelId;
        let riskId;
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
        it('Step 2: Create Another Attribute Tag', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Another Attribute Tag
                yield attributeTag.createAttributeTag(baseSurface, attributeTagName1, attributeTagDesc1);
                yield attributeTag.searchAttribute(baseSurface, attributeTagName1, 'attributeTagDesc');
                yield expectHelper_1.ExpectHelper.isListElementExists(attributeTag.list, attributeTagName1);
                yield console.log('Attribute Tag name is', attributeTagName1);
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
                // // Creating Policy Group
                yield policyPage.createPolicyGroup(baseSurface, policyGroupName, policyGroupDescription, 'E2E Admin', 'PUBLISHED', policyGroupTemplateName, attributeTagName, service);
                let s3PolicyGroupId = yield utils_1.getIdFromUrl();
                yield console.log('Policy Group name is', s3PolicyGroupId);
                yield console.log('Policy Group name is', policyGroupName);
                yield policyPage.searchPolicyGroup(baseSurface, policyGroupName);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
            });
        });
        it('Step 5: Creating Policy Group with EC2 ', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // // Creating Policy Group
                yield policyPage.createPolicyGroup(baseSurface, policyGroupName1, policyGroupDescription1, 'E2E Admin', 'PUBLISHED', policyGroupTemplateName, attributeTagName1, service1);
                let ec2PolicyGroupId = yield utils_1.getIdFromUrl();
                yield console.log('Policy Group name is', policyGroupName1);
                yield console.log('Policy Group id is', ec2PolicyGroupId);
                yield policyPage.searchPolicyGroup(baseSurface, policyGroupName1);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyPage.list, policyGroupName1);
            });
        });
        it('Step 6: Create New Enclave Model With Above Created Attribute Tags', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Enclave Model
                yield assetsManager.createEnclaveModel(baseSurface, 'PUBLISHED', assetName, description, attributeTags, 'concourseInfra.json', 'E2E Admin');
                modelId = yield assetsManager.getId();
                yield console.log('Enclave Model name is', assetName);
                yield console.log('Enclave Model id is', modelId);
                yield assetsManager.searchAssetManager(baseSurface, assetName);
                yield expectHelper_1.ExpectHelper.isListElementExists(assetsManager.assetList, assetName);
            });
        });
        it('Step 7: Verifying Risk ', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Verifying Risk
                yield risk.openRisk(modelId);
                yield expectHelper_1.ExpectHelper.isListElementExists(risk.riskdetail, modelId);
                yield console.log('Risk Happened For', modelId);
            });
        });
        it('Step 8: Delete Enclave Model', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Deleting Enclave Model
                yield assetsManager.deleteEnclaveModel(baseSurface, assetName, 'false');
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(assetsManager.enclaveModelElement(assetName));
            });
        });
        it('Step 9: Verifying Risk After Deletion Of Enclave Model', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // verifying Risk After Deletion Of Enclave Model
                yield risk.verifyRisk(modelId);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(risk.riskElement(modelId));
                yield console.log('Risk Removed For', modelId);
            });
        });
        it('Step 10: CleanUp', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Clean Up
                yield policyPage.deletePolicyGroup(baseSurface, policyGroupName, 'false');
                yield policyPage.deletePolicyGroup(baseSurface, policyGroupName1, 'false');
                yield policyGroupTemplatePage.deletePolicyGroupTemplate(baseSurface, policyGroupTemplateName, 'false');
                yield attributeTag.deleteAttributeTag(baseSurface, attributeTagName1, 'false');
                yield attributeTag.deleteAttributeTag(baseSurface, attributeTagName, 'false');
            });
        });
        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxWaW9sYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3BlY3MvbW9kZWxWaW9sYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJDQUF5RDtBQUN6RCxzREFBK0M7QUFDL0Msd0RBQXFEO0FBQ3JELGtFQUE0RDtBQUM1RCxvRUFBOEQ7QUFDOUQsc0VBQStEO0FBQy9ELGtGQUFnRjtBQUNoRiwwQ0FBOEM7QUFFOUMsUUFBUSxDQUFDLDJCQUEyQixFQUFFOztRQUNwQyxJQUFJLEVBQUUsR0FBRywrQkFBa0IsQ0FBQztRQUM1QixJQUFJLElBQUksR0FBRyxJQUFJLGVBQUksRUFBRSxDQUFDO1FBQ3RCLElBQUksZUFBZSxDQUFDO1FBQ3BCLElBQUksVUFBVSxHQUFHLElBQUksNEJBQVcsRUFBRSxDQUFDO1FBQ25DLElBQUksWUFBWSxHQUFHLElBQUksK0JBQVksRUFBRSxDQUFDO1FBQ3RDLElBQUksYUFBYSxHQUFHLElBQUksOEJBQVksRUFBRSxDQUFDO1FBQ3ZDLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQy9DLElBQUksdUJBQXVCLEdBQUcsSUFBSSxnREFBdUIsRUFBRSxDQUFDO1FBQzVELElBQUksZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLHlCQUF5QixHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xILElBQUksZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLGdDQUFnQyxDQUFDO1FBQ3BGLElBQUksaUJBQWlCLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLHlCQUF5QixHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25ILElBQUksaUJBQWlCLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLGdDQUFnQyxDQUFD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