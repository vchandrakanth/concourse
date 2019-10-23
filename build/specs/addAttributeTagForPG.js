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
const approvals_Po_1 = require("../pageObjects/approvals.Po");
const policyGroup_Po_1 = require("../pageObjects/policyGroup.Po");
const protractor_1 = require("protractor");
const assetManager_Po_1 = require("../pageObjects/assetManager.Po");
const attributeTags_Po_1 = require("../pageObjects/attributeTags.Po");
const logicalDeployment_Po_1 = require("../pageObjects/logicalDeployment.Po");
const policyGroupTemplate_Po_1 = require("../pageObjects/policyGroupTemplate.Po");
const utils_1 = require("../utils/utils");
describe('Add Attribute Tag For Policy Group and Verify Violation created ', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let originalTimeout;
        let risk = new risks_Po_1.Risk();
        let EC = protractor_1.ExpectedConditions;
        let approvals = new approvals_Po_1.Approvals();
        let policyPage = new policyGroup_Po_1.PolicyGroup();
        let attributeTag = new attributeTags_Po_1.AttributeTag();
        let assetsManager = new assetManager_Po_1.AssetManager();
        let properties = require('../conf/properties');
        let logicalDeployment = new logicalDeployment_Po_1.LogicalDeployment();
        let policyGroupTemplatePage = new policyGroupTemplate_Po_1.PolicyGroupTemplatePage();
        let attributeTagName = properties.attributeTagData.violationAttributeTagName + attributeTag.getRandomNum(1, 1000);
        let attributeTagDesc = properties.attributeTagData.violationAttributeTagDescription;
        let attributeTagName1 = properties.attributeTagData.violationAttributeTagName + attributeTag.getRandomNum(1, 1000);
        let attributeTagDesc1 = properties.attributeTagData.violationAttributeTagDescription;
        let assetName = properties.enclaveModelData.ec2ModelName + assetsManager.getRandomNum(1, 1000);
        let description = properties.enclaveModelData.ec2ModelDescription;
        let deploymentName = properties.logicalDeploymentData.deploymentName + logicalDeployment.getRandomNum(1, 1000);
        let stackName = properties.logicalDeploymentData.stackName + logicalDeployment.getRandomNum(1, 1000);
        let policyGroupTemplateName = properties.policyGroupTemplateData.policyGroupTemplateNameWithAWSProducts + policyGroupTemplatePage.getRandomNum(1, 1000);
        let policyGroupTemplatedesc = properties.policyGroupTemplateData.policyGroupTemplateDescWithAWSProducts;
        let policyGroupName = properties.policyGroupData.violationPolicyGroupName + policyPage.getRandomNum(1, 1000);
        let policyGroupDesc = properties.policyGroupData.violationPolicyGroupDescription;
        let s3Service = ['AWS::S3'];
        let ec2Service = ['AWS::EC2'];
        let services = ['AWS::S3', 'AWS::EC2'];
        let attitibuteTags = [attributeTagName, attributeTagName1];
        let updatedPolicyGroupId;
        let modelId;
        let policyId;
        let deploymentId;
        beforeEach(function () {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
        });
        it('Step 1: Create Attribute Tag', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Attribute Tag Creation
                yield attributeTag.createAttributeTag(attributeTagName, attributeTagDesc);
                yield attributeTag.searchAttribute(attributeTagName, 'description');
                yield expectHelper_1.ExpectHelper.isListElementExists(attributeTag.list, attributeTagName);
                yield console.log('Attribute Tag name is', attributeTagName);
            });
        });
        it('Step 2: Create Another Attribute Tag', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Another Attribute Tag
                yield attributeTag.createAttributeTag(attributeTagName1, attributeTagDesc1);
                yield attributeTag.searchAttribute(attributeTagName1, 'description');
                yield expectHelper_1.ExpectHelper.isListElementExists(attributeTag.list, attributeTagName1);
                yield console.log('Attribute Tag name is', attributeTagName1);
            });
        });
        it('Step 3: Create Enclave Model With EC2 Template', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Enclave
                yield assetsManager.createEnclaveModel('PUBLISHED', assetName, description, attitibuteTags, 'concourseInfra.json', 'E2E Admin');
                modelId = yield assetsManager.getId();
                yield console.log('Enclave Model name is', assetName);
                yield console.log('Enclave Model id is', modelId);
                yield assetsManager.searchAssetManager(assetName);
                yield expectHelper_1.ExpectHelper.isListElementExists(assetsManager.assetList, assetName);
            });
        });
        it('Step 4: Logical Deployement', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Logical Deployement
                yield logicalDeployment.newlogicalDeployment(assetName, deploymentName, stackName, 'us-east-1', 'Default Surface - Root Surface Layer', 'Account-792581741842');
                yield logicalDeployment.searchLogicalDeployment(deploymentName);
                yield expectHelper_1.ExpectHelper.isListElementExists(logicalDeployment.deploymentList, deploymentName);
                deploymentId = yield logicalDeployment.getId();
                yield console.log('Logical Deployment Name is', deploymentName);
                yield console.log('Logical Deployment id is', deploymentId);
            });
        });
        it('Step 5: Creating Policy Group Template with  Published', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Policy Group Template
                yield policyGroupTemplatePage.createPolicyGroupTemplate('PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Allowed AWS Products in Assets');
                yield policyGroupTemplatePage.searchPolicyGroupTemplate(policyGroupTemplateName);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyGroupTemplatePage.list, policyGroupTemplateName);
            });
        });
        it('Step 6: Creating Policy Group with EC2 and S3 ', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Policy Group
                yield policyPage.createPolicyGroup(policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', policyGroupTemplateName, attributeTagName, services);
                policyId = yield utils_1.getIdFromUrl();
                yield console.log('Policy Group  id is', policyId);
                yield policyPage.searchPolicyGroup(policyGroupName);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
            });
        });
        it('Step 7: Add Attribute Tag For Policy Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Adding New Attribute Tag For Policy Group
                yield policyPage.addAttributeTagForPG(policyGroupName, attributeTagName1);
                updatedPolicyGroupId = yield utils_1.getIdFromUrl();
                yield console.log('Policy Group Violation Id', updatedPolicyGroupId);
                yield policyPage.searchPolicyGroup(policyGroupName);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
            });
        });
        it('Step 8: Verify Risk', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Verifying Risk
                yield risk.openRisk(modelId);
                yield console.log(' Risk Happend For', modelId);
            });
        });
        it('Step 9: CleanUp', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Clean Up
                yield policyPage.deletePolicyGroup(policyGroupName, 'false');
                yield policyGroupTemplatePage.deletePolicyGroupTemplate(policyGroupTemplateName, 'false');
                yield logicalDeployment.deleteLogicalDeployement(deploymentName);
                yield assetsManager.deleteEnclaveModel(assetName, 'false');
                yield attributeTag.deleteAttributeTag(attributeTagName, 'false');
                yield attributeTag.deleteAttributeTag(attributeTagName1, 'false');
            });
        });
        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkQXR0cmlidXRlVGFnRm9yUEcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3BlY3MvYWRkQXR0cmlidXRlVGFnRm9yUEcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzREFBK0M7QUFDL0Msd0RBQXFEO0FBQ3JELDhEQUF3RDtBQUN4RCxrRUFBNEQ7QUFDNUQsMkNBQTZEO0FBQzdELG9FQUE4RDtBQUM5RCxzRUFBK0Q7QUFDL0QsOEVBQXdFO0FBQ3hFLGtGQUFnRjtBQUNoRiwwQ0FBOEM7QUFFOUMsUUFBUSxDQUFDLGtFQUFrRSxFQUFFOztRQUMzRSxJQUFJLGVBQWUsQ0FBQztRQUNwQixJQUFJLElBQUksR0FBRyxJQUFJLGVBQUksRUFBRSxDQUFDO1FBQ3RCLElBQUksRUFBRSxHQUFHLCtCQUFrQixDQUFDO1FBQzVCLElBQUksU0FBUyxHQUFHLElBQUksd0JBQVMsRUFBRSxDQUFDO1FBQ2hDLElBQUksVUFBVSxHQUFHLElBQUksNEJBQVcsRUFBRSxDQUFDO1FBQ25DLElBQUksWUFBWSxHQUFHLElBQUksK0JBQVksRUFBRSxDQUFDO1FBQ3RDLElBQUksYUFBYSxHQUFHLElBQUksOEJBQVksRUFBRSxDQUFDO1FBQ3ZDLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQy9DLElBQUksaUJBQWlCLEdBQUcsSUFBSSx3Q0FBaUIsRUFBRSxDQUFDO1FBQ2hELElBQUksdUJBQXVCLEdBQUcsSUFBSSxnREFBdUIsRUFBRSxDQUFDO1FBRTVELElBQUksZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLHlCQUF5QixHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xILElBQUksZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLGdDQUFnQyxDQUFDO1FBQ3BGLElBQUksaUJBQWlCLEdBQUcsVUFBVSxDQUFD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