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
const utils_1 = require("../utils/utils");
describe('Update Policy Violation ', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let originalTimeout;
        let risk = new risks_Po_1.Risk();
        let policyPage = new policyGroup_Po_1.PolicyGroup();
        let attributeTag = new attributeTags_Po_1.AttributeTag();
        let assetsManager = new assetManager_Po_1.AssetManager();
        let properties = require('../conf/properties');
        let policyGroupTemplatePage = new policyGroupTemplate_Po_1.PolicyGroupTemplatePage();
        let attributeTagName = properties.attributeTagData.violationAttributeTagName + attributeTag.getRandomNum(1, 1000);
        let attributeTagDesc = properties.attributeTagData.violationAttributeTagDescription;
        let policyGroupTemplateName = properties.policyGroupTemplateData.policyGroupTemplateNameWithAWSProducts + policyGroupTemplatePage.getRandomNum(1, 1000);
        let policyGroupTemplateDesc = properties.policyGroupTemplateData.policyGroupTemplateDescWithAWSProducts;
        let policyGroupName = properties.policyGroupData.violationPolicyGroupName + policyPage.getRandomNum(1, 1000);
        let policyGroupDesc = properties.policyGroupData.violationPolicyGroupDescription;
        let assetName = properties.enclaveModelData.ec2ModelName + assetsManager.getRandomNum(1, 1000);
        let description = properties.enclaveModelData.ec2ModelDescription;
        let assetName1 = properties.enclaveModelData.s3ModelName + assetsManager.getRandomNum(1, 1000);
        let description1 = properties.enclaveModelData.s3ModelDescription;
        let attitibuteTag = [attributeTagName];
        let s3Service = ['AWS::S3'];
        let ec2Service = ['AWS::EC2'];
        let services = ['AWS::S3', 'AWS::EC2'];
        let ec2Modelid;
        let s3Modelid;
        let policyId;
        let ec2PolicyId;
        let s3PolicyId;
        beforeEach(function () {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;
        });
        it('Step 1: Create Attribute Tag', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Attribute Tag Creation
                yield attributeTag.createAttributeTag(attributeTagName, attributeTagDesc);
                yield attributeTag.searchAttribute(attributeTagName, 'attributeTagDesc');
                yield expectHelper_1.ExpectHelper.isListElementExists(attributeTag.list, attributeTagName);
                yield console.log('Attribute Tag name is', attributeTagName);
            });
        });
        it('Step : Create Enclave Model With EC2 Template', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Enclave
                yield assetsManager.createEnclaveModel('PUBLISHED', assetName, description, attitibuteTag, 'ec2template.json', 'E2E Admin');
                ec2Modelid = yield assetsManager.getId();
                yield console.log('Enclave Model name is', assetName);
                yield console.log('Enclave Model id is', ec2Modelid);
                yield assetsManager.searchAssetManager(assetName);
                yield expectHelper_1.ExpectHelper.isListElementExists(assetsManager.assetList, assetName);
            });
        });
        it('Step 3: Create Enclave Model With S3 Template ', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Enclave Model
                yield assetsManager.createEnclaveModel('PUBLISHED', assetName1, description1, attitibuteTag, 's3template.json', 'E2E Admin');
                s3Modelid = yield assetsManager.getId();
                yield console.log('Enclave Model name is', assetName1);
                yield console.log('Enclave Model id is', s3Modelid);
                yield assetsManager.searchAssetManager(assetName1);
                yield expectHelper_1.ExpectHelper.isListElementExists(assetsManager.assetList, assetName1);
            });
        });
        it('Step 4: Creating Policy Group Template with  Published', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Policy Group Template
                yield policyGroupTemplatePage.createPolicyGroupTemplate('PUBLISHED', policyGroupTemplateName, policyGroupTemplateDesc, 'Allowed AWS Products in Assets');
                yield policyGroupTemplatePage.searchPolicyGroupTemplate(policyGroupTemplateName);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyGroupTemplatePage.list, policyGroupTemplateName);
            });
        });
        it('Step 5: Creating Policy Group with EC2 and S3 ', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Policy Group
                yield policyPage.createPolicyGroup(policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', policyGroupTemplateName, attributeTagName, services);
                policyId = yield utils_1.getIdFromUrl();
                yield console.log('Policy Group name is', policyId);
                yield console.log('Policy Group name is', policyGroupName);
                yield policyPage.searchPolicyGroup(policyGroupName);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
            });
        });
        it('Step 6: Update Policy Group with all Products Except EC2', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Updating Policy Group With EC2
                yield policyPage.updatePolicyGroupWithEC2(policyGroupName, ec2Service);
                s3PolicyId = yield utils_1.getIdFromUrl();
                yield console.log(' Published Policy Group id is', s3PolicyId);
                yield console.log('Policy Group name is', policyGroupName);
                yield policyPage.searchPolicyGroup(policyGroupName);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
            });
        });
        it('Step 7: Verify Risk', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Verifying Risk
                yield risk.openRisk(ec2Modelid);
                yield expectHelper_1.ExpectHelper.isListElementExists(risk.risklist, ec2Modelid);
            });
        });
        it('Step 8: Update Policy Group with all Products Except S3 Service', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Update Policy Group With S3
                yield policyPage.updatePolicyGroupWithS3(policyGroupName, s3Service);
                ec2PolicyId = yield utils_1.getIdFromUrl();
                yield console.log(' Published Policy Group id is', ec2PolicyId);
                yield console.log('Policy Group name is', policyGroupName);
                yield policyPage.searchPolicyGroup(policyGroupName);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
            });
        });
        it('Step 9: Verify Risk', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Verifying Risk
                yield risk.openRisk(s3Modelid);
                yield expectHelper_1.ExpectHelper.isListElementExists(risk.risklist, s3Modelid);
            });
        });
        it('Step 10: CleanUp', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Clean Up
                yield policyPage.deletePolicyGroup(policyGroupName, 'false');
                yield policyGroupTemplatePage.deletePolicyGroupTemplate(policyGroupTemplateName, 'false');
                yield assetsManager.deleteEnclaveModel(assetName, 'false');
                yield assetsManager.deleteEnclaveModel(assetName1, 'false');
                yield attributeTag.deleteAttributeTag(attributeTagName, 'false');
            });
        });
        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXBkYXRlUG9saWN5VmlvbGF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NwZWNzL1VwZGF0ZVBvbGljeVZpb2xhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLHNEQUErQztBQUMvQyx3REFBcUQ7QUFDckQsa0VBQTREO0FBQzVELG9FQUE4RDtBQUM5RCxzRUFBK0Q7QUFDL0Qsa0ZBQWdGO0FBQ2hGLDBDQUE4QztBQUU5QyxRQUFRLENBQUMsMEJBQTBCLEVBQUU7O1FBRWpDLElBQUksZUFBZSxDQUFDO1FBQ3BCLElBQUksSUFBSSxHQUFHLElBQUksZUFBSSxFQUFFLENBQUM7UUFDdEIsSUFBSSxVQUFVLEdBQUcsSUFBSSw0QkFBVyxFQUFFLENBQUM7UUFDbkMsSUFBSSxZQUFZLEdBQUcsSUFBSSwrQkFBWSxFQUFFLENBQUM7UUFDdEMsSUFBSSxhQUFhLEdBQUcsSUFBSSw4QkFBWSxFQUFFLENBQUM7UUFDdkMsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDL0MsSUFBSSx1QkFBdUIsR0FBRyxJQUFJLGdEQUF1QixFQUFFLENBQUM7UUFFNUQsSUFBSSxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMseUJBQXlCLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEgsSUFBSSxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsZ0NBQWdDLENBQUM7UUFDcEYsSUFBSSx1QkFBdUIsR0FBRyxVQUFVLENBQUMsdUJBQXVCLENBQUMsc0NBQXNDLEdBQUcsdUJBQXVCLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4SixJQUFJLHVCQUF1QixHQUFHLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxzQ0FBc0MsQ0FBQztRQUN4RyxJQUFJLGVBQWUsR0FBRyxVQUFVLENB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