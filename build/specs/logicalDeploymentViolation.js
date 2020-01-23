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
const protractor_1 = require("protractor");
const expectHelper_1 = require("../utils/expectHelper");
const policyGroup_Po_1 = require("../pageObjects/policyGroup.Po");
const assetManager_Po_1 = require("../pageObjects/assetManager.Po");
const attributeTags_Po_1 = require("../pageObjects/attributeTags.Po");
const logicalDeployment_Po_1 = require("../pageObjects/logicalDeployment.Po");
const policyGroupTemplate_Po_1 = require("../pageObjects/policyGroupTemplate.Po");
const utils_1 = require("../utils/utils");
describe('Creaing Logical Deployment Violations', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let originalTimeout;
        let risk = new risks_Po_1.Risk();
        let EC = protractor_1.ExpectedConditions;
        let policyPage = new policyGroup_Po_1.PolicyGroup();
        let attributeTag = new attributeTags_Po_1.AttributeTag();
        let assetsManager = new assetManager_Po_1.AssetManager();
        let properties = require('../conf/properties');
        let logicalDeployment = new logicalDeployment_Po_1.LogicalDeployment();
        let policyGroupTemplatePage = new policyGroupTemplate_Po_1.PolicyGroupTemplatePage();
        let attributeTagName = properties.attributeTagData.violationAttributeTagName + attributeTag.getRandomNum(1, 1000);
        let attributeTagDescription = properties.attributeTagData.violationAttributeTagDescription;
        let policyGroupTemplateName = properties.policyGroupTemplateData.policyGroupTemplateNameWithAWSProducts + policyGroupTemplatePage.getRandomNum(1, 1000);
        let policyGroupTemplatedesc = properties.policyGroupTemplateData.policyGroupTemplateDescWithAWSProducts;
        let policyGroupName = properties.policyGroupData.policyGroupNamePublish + policyPage.getRandomNum(1, 1000);
        let policyGroupDesc = properties.policyGroupData.policyGroupDescPublish;
        let assetName = properties.enclaveModelData.modelName + assetsManager.getRandomNum(1, 1000);
        let desc = properties.enclaveModelData.modelDescription;
        let deploymentName = properties.logicalDeploymentData.deploymentName + logicalDeployment.getRandomNum(1, 1000);
        let stackName = properties.logicalDeploymentData.stackName + logicalDeployment.getRandomNum(1, 1000);
        let baseSurface = properties.SurfaceData.surfaceName;
        let attitibuteTag = [attributeTagName];
        let services = ['AWS::EC2'];
        let modelid;
        let riskId;
        let deploymentId;
        let policyId;
        beforeEach(function () {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
        });
        it('Step 1: Create Attribute Tag', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Attribute Creation
                yield attributeTag.createAttributeTag(baseSurface, attributeTagName, attributeTagDescription);
                yield attributeTag.searchAttribute(baseSurface, attributeTagName, 'description');
                yield expectHelper_1.ExpectHelper.isListElementExists(attributeTag.list, attributeTagName);
            });
        });
        it('Step 2: Create New Enclave Model', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Enclave Model
                yield assetsManager.createEnclaveModel(baseSurface, 'PUBLISHED', assetName, desc, attitibuteTag, 'ec2template.json', 'E2E Admin');
                modelid = yield assetsManager.getId();
                yield console.log('Enclave Model name is', assetName);
                yield console.log('Enclave Model id is', modelid);
                yield assetsManager.searchAssetManager(baseSurface, assetName);
                yield expectHelper_1.ExpectHelper.isListElementExists(assetsManager.assetList, assetName);
            });
        });
        it('Step 3: Creating Policy Group Template with  Published', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // plolciy Template is Creation as Published
                yield policyGroupTemplatePage.createPolicyGroupTemplate(baseSurface, 'PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Allowed AWS Products in Stacks');
                yield policyGroupTemplatePage.searchPolicyGroupTemplate(baseSurface, policyGroupTemplateName);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyGroupTemplatePage.list, policyGroupTemplateName);
            });
        });
        it('Step 4: Creating Policy Group with  Published', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Policy Group with  Published
                yield policyPage.createPolicyGroup(baseSurface, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', policyGroupTemplateName, attributeTagName, services);
                policyId = yield utils_1.getIdFromUrl();
                yield console.log('Policy Group name is', policyId);
                yield console.log('Policy Group name is', policyGroupName);
                yield policyPage.searchPolicyGroup(baseSurface, policyGroupName);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
            });
        });
        it('Step 5: Logical Deployement', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Logical Deployement
                yield logicalDeployment.newlogicalDeployment(baseSurface, assetName, deploymentName, stackName, 'us-east-1', 'Default Surface - Root Surface Layer', 'Account-123456987456');
                yield logicalDeployment.searchLogicalDeployment(baseSurface, deploymentName);
                yield expectHelper_1.ExpectHelper.isListElementExists(logicalDeployment.deploymentList, deploymentName);
                deploymentId = yield logicalDeployment.getId();
                yield console.log('Logical Deployment Name is', deploymentName);
                yield console.log('Logical Deployment id is', deploymentId);
            });
        });
        it('Step 6: Verify Risk', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Verifying Risk For Deployement
                yield risk.openRisk(deploymentId);
                expectHelper_1.ExpectHelper.isListElementExists(risk.deploymentRiskDetail, deploymentId);
                yield console.log('Risk Happened For', deploymentId);
                // riskId = await risk.getId();
                // await console.log('Violation id is', riskId);
            });
        });
        it('Step 7: Delete Logical Deployment', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Delete Logical Deployement
                yield logicalDeployment.deleteLogicalDeployement(baseSurface, deploymentName);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(logicalDeployment.logicalDeployementElement(deploymentName));
            });
        });
        it('Step 8: Re verifying Risk', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Reverifying Risk For Deployement
                yield risk.verifyRisk(deploymentId);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(risk.riskElement(deploymentId));
                yield console.log('Risk Removed For', deploymentId);
            });
        });
        it('Step 9: Clean Up', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // CleanUp
                yield assetsManager.deleteEnclaveModel(baseSurface, assetName, 'false');
                yield policyPage.deletePolicyGroup(baseSurface, policyGroupName, 'false');
                yield policyGroupTemplatePage.deletePolicyGroupTemplate(baseSurface, policyGroupTemplateName, 'false');
                yield attributeTag.deleteAttributeTag(baseSurface, attributeTagName, 'false');
            });
        });
        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naWNhbERlcGxveW1lbnRWaW9sYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3BlY3MvbG9naWNhbERlcGxveW1lbnRWaW9sYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzREFBK0M7QUFDL0MsMkNBQWdEO0FBQ2hELHdEQUFxRDtBQUNyRCxrRUFBNEQ7QUFDNUQsb0VBQThEO0FBQzlELHNFQUErRDtBQUMvRCw4RUFBd0U7QUFDeEUsa0ZBQWdGO0FBQ2hGLDBDQUE4QztBQUU5QyxRQUFRLENBQUMsdUNBQXVDLEVBQUU7O1FBRWhELElBQUksZUFBZSxDQUFDO1FBQ3BCLElBQUksSUFBSSxHQUFHLElBQUksZUFBSSxFQUFFLENBQUM7UUFDdEIsSUFBSSxFQUFFLEdBQUcsK0JBQWtCLENBQUM7UUFDNUIsSUFBSSxVQUFVLEdBQUcsSUFBSSw0QkFBVyxFQUFFLENBQUM7UUFDbkMsSUFBSSxZQUFZLEdBQUcsSUFBSSwrQkFBWSxFQUFFLENBQUM7UUFDdEMsSUFBSSxhQUFhLEdBQUcsSUFBSSw4QkFBWSxFQUFFLENBQUM7UUFDdkMsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDL0MsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLHdDQUFpQixFQUFFLENBQUM7UUFDaEQsSUFBSSx1QkFBdUIsR0FBRyxJQUFJLGdEQUF1QixFQUFFLENBQUM7UUFFNUQsSUFBSSxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMseUJBQXlCLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEgsSUFBSSx1QkFBdUIsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsZ0NBQWdDLENBQUM7UUFDM0YsSUFBSSx1QkFBdUIsR0FBRyxVQUFVLENBQUMsdUJBQXVCLENBQUMsc0NBQXNDLEdBQUcsdUJBQXVCLENBQUMsWUFBWSxD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