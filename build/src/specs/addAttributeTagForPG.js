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
        let baseSurface = properties.SurfaceData.surfaceName;
        let s3Service = ['AWS::S3'];
        let ec2Service = ['AWS::EC2'];
        let services = ['AWS::S3', 'AWS::EC2'];
        let attitibuteTags = [attributeTagName, attributeTagName1];
        let updatedPolicyGroupId;
        let modelId;
        let policyId;
        let deploymentId;
        let riskId;
        beforeEach(function () {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
        });
        it('Step 1: Create Attribute Tag', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Attribute Tag Creation
                yield attributeTag.createAttributeTag(baseSurface, attributeTagName, attributeTagDesc);
                yield attributeTag.searchAttribute(baseSurface, attributeTagName, 'description');
                yield expectHelper_1.ExpectHelper.isListElementExists(attributeTag.list, attributeTagName);
                yield console.log('Attribute Tag name is', attributeTagName);
                yield protractor_1.browser.refresh();
            });
        });
        it('Step 2: Create Another Attribute Tag', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Another Attribute Tag
                yield attributeTag.createAttributeTag(baseSurface, attributeTagName1, attributeTagDesc1);
                yield attributeTag.searchAttribute(baseSurface, attributeTagName1, 'description');
                yield expectHelper_1.ExpectHelper.isListElementExists(attributeTag.list, attributeTagName1);
                yield console.log('Attribute Tag name is', attributeTagName1);
            });
        });
        it('Step 3: Create Enclave Model With EC2 Template', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Enclave
                yield assetsManager.createEnclaveModel(baseSurface, 'PUBLISHED', assetName, description, attitibuteTags, 'concourseInfra.json', 'E2E Admin');
                modelId = yield assetsManager.getId();
                yield console.log('Enclave Model name is', assetName);
                yield console.log('Enclave Model id is', modelId);
                yield assetsManager.searchAssetManager(baseSurface, assetName);
                yield expectHelper_1.ExpectHelper.isListElementExists(assetsManager.assetList, assetName);
            });
        });
        it('Step 4: Logical Deployement', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Logical Deployement
                yield logicalDeployment.newlogicalDeployment(baseSurface, assetName, deploymentName, stackName, 'us-east-1', 'Default Surface - Root Surface Layer', 'Account-123456987456');
                yield logicalDeployment.searchLogicalDeployment(baseSurface, deploymentName);
                yield expectHelper_1.ExpectHelper.isListElementExists(logicalDeployment.logicalDeploymentList, deploymentName);
                deploymentId = yield logicalDeployment.getId();
                yield console.log('Logical Deployment Name is', deploymentName);
                yield console.log('Logical Deployment id is', deploymentId);
            });
        });
        it('Step 5: Creating Policy Group Template with  Published', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Policy Group Template
                yield policyGroupTemplatePage.createPolicyGroupTemplate(baseSurface, 'PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Allowed AWS Products in Stacks');
                yield policyGroupTemplatePage.searchPolicyGroupTemplate(baseSurface, policyGroupTemplateName);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyGroupTemplatePage.list, policyGroupTemplateName);
            });
        });
        it('Step 6: Creating Policy Group with EC2 and S3 ', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Policy Group
                yield policyPage.createPolicyGroup(baseSurface, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', policyGroupTemplateName, attributeTagName, services, ' ', ' ', ' ', 'Allowed AWS Products in Stacks 1');
                policyId = yield utils_1.getIdFromUrl();
                yield console.log('Policy Group  id is', policyId);
                yield policyPage.searchPolicyGroup(baseSurface, policyGroupName);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
            });
        });
        it('Step 7: Add Attribute Tag For Policy Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Adding New Attribute Tag For Policy Group
                yield policyPage.addAttributeTagForPG(baseSurface, policyGroupName, attributeTagName1);
                updatedPolicyGroupId = yield utils_1.getIdFromUrl();
                yield console.log('Policy Group Violation Id', updatedPolicyGroupId);
                yield policyPage.searchPolicyGroup(baseSurface, policyGroupName);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
            });
        });
        it('Step 8: Verify Risk', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Verifying Risk
                yield risk.openRisk(modelId);
                yield console.log(' Risk Happend For', modelId);
                riskId = yield risk.getId();
                yield console.log('Violation id is', riskId);
                yield expectHelper_1.ExpectHelper.isListElementExists(risk.risklist, riskId);
            });
        });
        it('Step 9: CleanUp', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Clean Up
                yield policyPage.deletePolicyGroup(baseSurface, policyGroupName, 'false');
                yield policyGroupTemplatePage.deletePolicyGroupTemplate(baseSurface, policyGroupTemplateName, 'false');
                yield logicalDeployment.deleteLogicalDeployement(baseSurface, deploymentName);
                yield assetsManager.deleteEnclaveModel(baseSurface, assetName, 'false');
                yield attributeTag.deleteAttributeTag(baseSurface, attributeTagName, 'false');
                yield attributeTag.deleteAttributeTag(baseSurface, attributeTagName1, 'false');
            });
        });
        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkQXR0cmlidXRlVGFnRm9yUEcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3BlY3MvYWRkQXR0cmlidXRlVGFnRm9yUEcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzREFBK0M7QUFDL0Msd0RBQXFEO0FBQ3JELDhEQUF3RDtBQUN4RCxrRUFBNEQ7QUFDNUQsMkNBQXNFO0FBQ3RFLG9FQUE4RDtBQUM5RCxzRUFBK0Q7QUFDL0QsOEVBQXdFO0FBQ3hFLGtGQUFnRjtBQUNoRiwwQ0FBOEM7QUFFOUMsUUFBUSxDQUFDLGtFQUFrRSxFQUFFOztRQUMzRSxJQUFJLGVBQWUsQ0FBQztRQUNwQixJQUFJLElBQUksR0FBRyxJQUFJLGVBQUksRUFBRSxDQUFDO1FBQ3RCLElBQUksRUFBRSxHQUFHLCtCQUFrQixDQUFDO1FBQzVCLElBQUksU0FBUyxHQUFHLElBQUksd0JBQVMsRUFBRSxDQUFDO1FBQ2hDLElBQUksVUFBVSxHQUFHLElBQUksNEJBQVcsRUFBRSxDQUFDO1FBQ25DLElBQUksWUFBWSxHQUFHLElBQUksK0JBQVksRUFBRSxDQUFDO1FBQ3RDLElBQUksYUFBYSxHQUFHLElBQUksOEJBQVksRUFBRSxDQUFDO1FBQ3ZDLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQy9DLElBQUksaUJBQWlCLEdBQUcsSUFBSSx3Q0FBaUIsRUFBRSxDQUFDO1FBQ2hELElBQUksdUJBQXVCLEdBQUcsSUFBSSxnREFBdUIsRUFBRSxDQUFDO1FBRTVELElBQUksZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLHlCQUF5QixHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xILElBQUksZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLGdDQUFnQyxDQUFDO1FBQ3BGLElBQUksaUJBQWlCLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLHlCQUF5QixHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25ILElBQUksaUJBQWlCLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLGdDQUFnQyxDQUFDO1FBQ3JGLElBQUksU0FBUyxHQUFHLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEdBQUcsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0YsSUFBSSxXQUFXLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDO1FBQ2xFLElBQUksY0FBYyxHQUFHLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxjQUFjLEdBQUcsaUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRyxJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMscUJBQXFCLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckcsSUFBSSx1QkFBdUIsR0FBRyxVQUFVLENBQUMsdUJBQXVCLENBQUMsc0NBQXNDLEdBQUcsdUJBQXVCLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4SixJQUFJLHVCQUF1QixHQUFHLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxzQ0FBc0MsQ0FBQztRQUN4RyxJQUFJLGVBQWUsR0FBRyxVQUFVLENBQUMsZUFBZSxDQUFDLHdCQUF3QixHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdHLElBQUksZUFBZSxHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQUMsK0JBQStCLENBQUM7UUFDakYsSUFBSSxXQUFXLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUM7UUFDckQsSUFBSSxTQUFTLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QixJQUFJLFVBQVUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlCLElBQUksUUFBUSxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksY0FBYyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUMzRCxJQUFJLG9CQUFvQixDQUFDO1FBQ3pCLElBQUksT0FBTyxDQUFDO1FBQ1osSUFBSSxRQUFRLENBQUM7UUFDYixJQUFJLFlBQVksQ0FBQztRQUNqQixJQUFJLE1BQU0sQ0FBQztRQUVYLFVBQVUsQ0FBQztZQUNULGVBQWUsR0FBRyxPQUFPLENBQUMsd0JBQXdCLENBQUM7WUFDbkQsT0FBTyxDQUFDLHdCQUF3QixHQUFHLE1BQU0sQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyw4QkFBOEIsRUFBRTs7Z0JBQ2pDLHlCQUF5QjtnQkFDekIsTUFBTSxZQUFZLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixDQUFDLENBQUM7Z0JBQ3ZGLE1BQU0sWUFBWSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBQ2pGLE1BQU0sMkJBQVksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLENBQUM7Z0JBQzVFLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUM3RCxNQUFNLG9CQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDMUIsQ0FBQztTQUFBLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxzQ0FBc0MsRUFBRTs7Z0JBQ3pDLGlDQUFpQztnQkFDakMsTUFBTSxZQUFZLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixDQUFDLENBQUM7Z0JBQ3pGLE1BQU0sWUFBWSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBQ2xGLE1BQU0sMkJBQVksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLGlCQUFpQixDQUFDLENBQUM7Z0JBQzdFLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2hFLENBQUM7U0FBQSxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsZ0RBQWdELEVBQUU7O2dCQUNuRCxtQkFBbUI7Z0JBQ25CLE1BQU0sYUFBYSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUscUJBQXFCLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQzdJLE9BQU8sR0FBRyxNQUFNLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDdEMsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUN0RCxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ2xELE1BQU0sYUFBYSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDL0QsTUFBTSwyQkFBWSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDN0UsQ0FBQztTQUFBLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyw2QkFBNkIsRUFBRTs7Z0JBQ2hDLCtCQUErQjtnQkFDL0IsTUFBTSxpQkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLHNDQUFzQyxFQUFFLHNCQUFzQixDQUFDLENBQUM7Z0JBQzdLLE1BQU0saUJBQWlCLENBQUMsdUJBQXVCLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUM3RSxNQUFNLDJCQUFZLENBQUMsbUJBQW1CLENBQUMsaUJBQWlCLENBQUMscUJBQXFCLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQ2hHLFlBQVksR0FBRyxNQUFNLGlCQUFpQixDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUMvQyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQ2hFLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUM5RCxDQUFDO1NBQUEsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHdEQUF3RCxFQUFFOztnQkFDM0QsaUNBQWlDO2dCQUNqQyxNQUFNLHVCQUF1QixDQUFDLHlCQUF5QixDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsdUJBQXVCLEVBQUUsdUJBQXVCLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQztnQkFDdEssTUFBTSx1QkFBdUIsQ0FBQyx5QkFBeUIsQ0FBQyxXQUFXLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztnQkFDOUYsTUFBTSwyQkFBWSxDQUFDLG1CQUFtQixDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1lBQ2hHLENBQUM7U0FBQSxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsZ0RBQWdELEVBQUU7O2dCQUNuRCx3QkFBd0I7Z0JBQ3hCLE1BQU0sVUFBVSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsdUJBQXVCLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFHLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLGtDQUFrQyxDQUFDLENBQUM7Z0JBQ3JOLFFBQVEsR0FBRyxNQUFNLG9CQUFZLEVBQUUsQ0FBQztnQkFDaEMsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNuRCxNQUFNLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsZUFBZSxDQUFDLENBQUM7Z0JBQ2pFLE1BQU0sMkJBQVksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQzNFLENBQUM7U0FBQSxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsNENBQTRDLEVBQUU7O2dCQUMvQyw0Q0FBNEM7Z0JBQzVDLE1BQU0sVUFBVSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxlQUFlLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztnQkFDdkYsb0JBQW9CLEdBQUcsTUFBTSxvQkFBWSxFQUFFLENBQUM7Z0JBQzVDLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO2dCQUNyRSxNQUFNLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsZUFBZSxDQUFDLENBQUM7Z0JBQ2pFLE1BQU0sMkJBQVksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQzNFLENBQUM7U0FBQSxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMscUJBQXFCLEVBQUU7O2dCQUN4QixpQkFBaUI7Z0JBQ2pCLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDN0IsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUNoRCxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQzVCLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDN0MsTUFBTSwyQkFBWSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDaEUsQ0FBQztTQUFBLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxpQkFBaUIsRUFBRTs7Z0JBQ3BCLFdBQVc7Z0JBQ1gsTUFBTSxVQUFVLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLGVBQWUsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDMUUsTUFBTSx1QkFBdUIsQ0FBQyx5QkFBeUIsQ0FBQyxXQUFXLEVBQUUsdUJBQXVCLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ3ZHLE1BQU0saUJBQWlCLENBQUMsd0JBQXdCLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUM5RSxNQUFNLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUN4RSxNQUFNLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQzlFLE1BQU0sWUFBWSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNqRixDQUFDO1NBQUEsQ0FBQyxDQUFDO1FBRUgsU0FBUyxDQUFDO1lBQ1IsT0FBTyxDQUFDLHdCQUF3QixHQUFHLGVBQWUsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztJQUVMLENBQUM7Q0FBQSxDQUFDLENBQUMifQ==