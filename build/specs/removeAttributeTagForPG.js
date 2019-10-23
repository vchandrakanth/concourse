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
const assetManager_Po_1 = require("../pageObjects/assetManager.Po");
const logicalDeployment_Po_1 = require("../pageObjects/logicalDeployment.Po");
const attributeTags_Po_1 = require("../pageObjects/attributeTags.Po");
const policyGroup_Po_1 = require("../pageObjects/policyGroup.Po");
const risks_Po_1 = require("../pageObjects/risks.Po");
const policyGroupTemplate_Po_1 = require("../pageObjects/policyGroupTemplate.Po");
const expectHelper_1 = require("../utils/expectHelper");
describe('Remove Attribute Tag From Policy Group To Verify Violation', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let originalTimeout;
        let EC = protractor_1.ExpectedConditions;
        let assetsManager = new assetManager_Po_1.AssetManager();
        let attributeTag = new attributeTags_Po_1.AttributeTag();
        let logicalDeployment = new logicalDeployment_Po_1.LogicalDeployment();
        let policyPage = new policyGroup_Po_1.PolicyGroup();
        let risk = new risks_Po_1.Risk();
        let properties = require('../conf/properties');
        let policyGroupTemplatePage = new policyGroupTemplate_Po_1.PolicyGroupTemplatePage();
        let attributeTagName = properties.attributeTagData.violationAttributeTagName + attributeTag.getRandomNum(1, 1000);
        let attributeTagDesc = properties.attributeTagData.violationAttributeTagDescription;
        let attributeTagName1 = properties.attributeTagData.violationAttributeTagName + attributeTag.getRandomNum(1, 1000);
        let attributeTagDesc1 = properties.attributeTagData.violationAttributeTagDescription;
        let policyGroupTemplateName = properties.policyGroupTemplateData.policyGroupTemplateNameWithAWSProducts + policyGroupTemplatePage.getRandomNum(1, 1000);
        let policyGroupTemplateDesc = properties.policyGroupTemplateData.policyGroupTemplateDescWithAWSProducts;
        let policyGroupName = properties.policyGroupData.violationPolicyGroupName + policyPage.getRandomNum(1, 1000);
        let policyGroupDesc = properties.policyGroupData.violationPolicyGroupDescription;
        let assetName = properties.enclaveModelData.ec2ModelName + assetsManager.getRandomNum(1, 1000);
        let description = properties.enclaveModelData.ec2ModelDescription;
        let service = ['AWS::S3'];
        let service1 = ['AWS::EC2'];
        let services = ['AWS::S3', 'AWS::EC2'];
        let attributeTags = [attributeTagName];
        let updatedPolicyID;
        let modelId;
        let policyId;
        let latestPolicyId;
        let attributeTagId;
        beforeEach(function () {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;
        });
        it('Step 1: Create Attribute Tag', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield attributeTag.createAttributeTag(attributeTagName, attributeTagDesc);
                yield attributeTag.searchAttribute(attributeTagName, 'description');
                yield expectHelper_1.ExpectHelper.isListElementExists(attributeTag.list, attributeTagName);
                yield console.log('Attribute Tag name is', attributeTagName);
            });
        });
        it('Step 2: Create Another Attribute Tag', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield attributeTag.createAttributeTag(attributeTagName1, attributeTagDesc1);
                attributeTagId = yield attributeTag.getId();
                yield console.log('AttributeTag Name is', attributeTagName1);
                yield console.log('AttributeTag id is', attributeTagId);
                yield attributeTag.searchAttribute(attributeTagName1, 'description');
                yield expectHelper_1.ExpectHelper.isListElementExists(attributeTag.list, attributeTagName1);
                yield console.log('Attribute Tag name is', attributeTagName1);
            });
        });
        it('Step 3: Create Enclave Model With First Attribute Tag', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield assetsManager.createEnclaveModel('PUBLISHED', assetName, description, attributeTags, 'concourseInfra.json', 'E2E Admin');
                modelId = yield assetsManager.getId();
                yield console.log('Enclave Model id is', modelId);
                yield console.log('Enclave Model name is', assetName);
                yield assetsManager.searchAssetManager(assetName);
                yield expectHelper_1.ExpectHelper.isListElementExists(assetsManager.assetList, assetName);
            });
        });
        it('Step 4: Create Policy Group Template with  Published', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield policyGroupTemplatePage.createPolicyGroupTemplate('PUBLISHED', policyGroupTemplateName, policyGroupTemplateDesc, 'Allowed AWS Products in Assets');
                yield policyGroupTemplatePage.searchPolicyGroupTemplate(policyGroupTemplateName);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyGroupTemplatePage.list, policyGroupTemplateName);
            });
        });
        it('Step 5: Create Policy Group With Second Attribute Tag', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield policyPage.createPolicyGroup(policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', policyGroupTemplateName, attributeTagName1, services);
                policyId = yield policyPage.getId();
                yield console.log('Policy Group  id is', policyId);
                yield policyPage.searchPolicyGroup(policyGroupName);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
            });
        });
        it('Step 6: Add First Attribute Tag To Policy Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield policyPage.addAttributeTagForPG(policyGroupName, attributeTagName);
                updatedPolicyID = yield policyPage.getId5();
                yield console.log('Policy Group Violation Id', updatedPolicyID);
                yield policyPage.searchPolicyGroup(policyGroupName);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
            });
        });
        it('Step 7: Verifying Risk ', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield risk.openRisk(modelId);
                yield expectHelper_1.ExpectHelper.isListElementExists(risk.risklist, modelId);
                yield console.log('Risk Happened For', modelId);
            });
        });
        it('Step 8: Remove Existing Attribute Tag(Second One) ', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield policyPage.removeAttributeTagForPG(policyGroupName, attributeTagId);
                latestPolicyId = yield policyPage.getId();
                yield console.log('Policy Group  id Is', latestPolicyId);
            });
        });
        it('Step 9: Verifying Risk ', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield risk.openRisk(modelId);
                yield expectHelper_1.ExpectHelper.isListElementExists(risk.risklist, modelId);
                yield console.log('Still Risk Showing For', modelId);
            });
        });
        it('Step 10: Delete Policy Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield policyPage.deletePolicyGroup(policyGroupName, 'false');
                yield policyPage.searchPolicyGroup(policyGroupName);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(policyPage.searchPolicyGroupName(policyGroupName));
                yield console.log(policyGroupName, 'Deleted');
            });
        });
        it('Step 11: Verifying Risk After Deletion Of Policy Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield risk.openRisk(modelId);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(risk.riskElement(modelId));
                yield console.log('Risk Removed For', modelId);
            });
        });
        it('Step 12: CleanUp ', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield policyGroupTemplatePage.deletePolicyGroupTemplate(policyGroupTemplateName, 'false');
                yield console.log(policyGroupTemplateName, 'Deleted');
                yield assetsManager.deleteEnclaveModel(assetName, 'false');
                yield console.log(assetName, 'Deleted');
                yield attributeTag.deleteAttributeTag(attributeTagName, 'false');
                yield console.log(attributeTagName, 'Deleted');
                yield attributeTag.deleteAttributeTag(attributeTagName1, 'false');
                yield console.log(attributeTagName1, 'Deleted');
            });
        });
        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlQXR0cmlidXRlVGFnRm9yUEcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3BlY3MvcmVtb3ZlQXR0cmlidXRlVGFnRm9yUEcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBZ0Q7QUFDaEQsb0VBQThEO0FBQzlELDhFQUF3RTtBQUN4RSxzRUFBK0Q7QUFDL0Qsa0VBQTREO0FBQzVELHNEQUErQztBQUMvQyxrRkFBZ0Y7QUFDaEYsd0RBQXFEO0FBRXJELFFBQVEsQ0FBQyw0REFBNEQsRUFBRTs7UUFDbkUsSUFBSSxlQUFlLENBQUM7UUFDcEIsSUFBSSxFQUFFLEdBQUcsK0JBQWtCLENBQUM7UUFDNUIsSUFBSSxhQUFhLEdBQUcsSUFBSSw4QkFBWSxFQUFFLENBQUM7UUFDdkMsSUFBSSxZQUFZLEdBQUcsSUFBSSwrQkFBWSxFQUFFLENBQUM7UUFDdEMsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLHdDQUFpQixFQUFFLENBQUM7UUFDaEQsSUFBSSxVQUFVLEdBQUcsSUFBSSw0QkFBVyxFQUFFLENBQUM7UUFDbkMsSUFBSSxJQUFJLEdBQUcsSUFBSSxlQUFJLEVBQUUsQ0FBQztRQUN0QixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMvQyxJQUFJLHVCQUF1QixHQUFHLElBQUksZ0RBQXVCLEVBQUUsQ0FBQztRQUU1RCxJQUFJLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyx5QkFBeUIsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsSCxJQUFJLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxnQ0FBZ0MsQ0FBQztRQUNwRixJQUFJLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyx5QkFBeUIsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLENB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