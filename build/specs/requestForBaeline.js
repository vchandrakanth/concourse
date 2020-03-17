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
const policyGroup_Po_1 = require("../pageObjects/policyGroup.Po");
const attributeTags_Po_1 = require("../pageObjects/attributeTags.Po");
const approvals_Po_1 = require("../pageObjects/approvals.Po");
const utils_1 = require("../utils/utils");
const baseLineAssets_Po_1 = require("../pageObjects/baseLineAssets.Po");
describe('Request For Model ', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let originalTimeout;
        let EC = protractor_1.ExpectedConditions;
        let attributeTag = new attributeTags_Po_1.AttributeTag();
        let policyPage = new policyGroup_Po_1.PolicyGroup();
        let approvals = new approvals_Po_1.Approvals();
        let properties = require('../conf/properties');
        let policyGroupTemplatePage = new policyGroupTemplate_Po_1.PolicyGroupTemplatePage();
        let baseLineAsset = new baseLineAssets_Po_1.BaseLineAsset();
        let attributeTagName = properties.attributeTagData.attributeName1 + attributeTag.getRandomNum(1, 1000);
        let description = properties.attributeTagData.attributeDescription1;
        let policyGroupTemplateName = properties.policyGroupTemplateData.requireApprovalPolicyGroupTemplateName + policyGroupTemplatePage.getRandomNum(1, 1000);
        let policyGroupTemplatedesc = properties.policyGroupTemplateData.requireApprovalPolicyGroupTemplateDesc;
        let policyGroupName = properties.policyGroupData.policyGroupName + policyPage.getRandomNum(1, 1000);
        let policyGroupDesc = properties.policyGroupData.policyGroupDesc;
        let baselineAssetName = properties.enclaveModelData.modelName + baseLineAsset.getRandomNum(1, 1000);
        let desc = properties.enclaveModelData.modelDescription;
        let service = properties.ServicesData.service;
        let baseSurface = properties.SurfaceData.surfaceName;
        let services = [service];
        let attitibuteTag = [attributeTagName];
        let policyGroupId;
        let modelid;
        let accountName = ['0ecb99ea-ca1a-4be6-96cc-ceb57b7b63d4'];
        let subscription = ['3263f5e2-3561-433c-97f2-e31b389e45ff'];
        let resourceGroup = ['TestConnection'];
        let product = ['Microsoft.Batch/batchAccounts'];
        let region = ['South India'];
        let key = ['service'];
        let value = ['istio-system/istio-ingressgateway'];
        let baseLineAssetId;
        beforeEach(function () {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
        });
        it('Step 1: Creating Attribute Tag', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield attributeTag.createAttributeTag(baseSurface, attributeTagName, description);
                yield attributeTag.searchAttribute(baseSurface, attributeTagName, 'Description');
                yield expectHelper_1.ExpectHelper.isListElementExists(attributeTag.list, attributeTagName);
            });
        });
        it('Step 2: Creating Policy Group Template with  Published', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield policyGroupTemplatePage.createPolicyGroupTemplate(baseSurface, 'PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Require Approval of Institutional Entities');
                yield policyGroupTemplatePage.searchPolicyGroupTemplate(baseSurface, policyGroupTemplateName);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyGroupTemplatePage.list, policyGroupTemplateName);
            });
        });
        it('Step 3: Creating Policy Group', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield policyPage.createPolicyGroup(baseSurface, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', policyGroupTemplateName, attributeTagName, services, 'Default Surface - Root Surface Layer', 'BASELINE', 'E2E Admin', 'Require Approval of Institutional Entities 1');
                policyGroupId = yield utils_1.getIdFromUrl();
                yield console.log('Policy Group id Is', policyGroupId);
                yield policyPage.searchPolicyGroup(baseSurface, policyGroupName);
                yield expectHelper_1.ExpectHelper.isListElementExists(policyPage.list, policyGroupName);
            });
        });
        it('Step 4: Verify Approval Request For Publish', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield approvals.VerifyPublishedApprovalRequest(baseSurface, policyGroupId);
                // await ExpectHelper.isListElementExists(approvals.approvalList, policyGroupId);
            });
        });
        it('Step 5: Approve Publish Request', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield approvals.ApprovalAction(baseSurface, policyGroupId);
            });
        });
        it('Step 6: Create New BaseLine Asset', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating BaseLine Asset
                yield baseLineAsset.createBaseLineAsset(baseSurface, 'DRAFT', baselineAssetName, desc, 'E2E Admin', accountName, subscription, resourceGroup, product, region, key, value, attitibuteTag);
                baseLineAssetId = yield baseLineAsset.getId();
                yield console.log('BaseLine Asset name is', baselineAssetName);
                yield console.log('BaseLine Asset id is', baseLineAssetId);
            });
        });
        it('Step 7: Verify Approval Request For Publish', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield approvals.VerifyPublishedApprovalRequest(baseSurface, baseLineAssetId);
                // await ExpectHelper.isListElementExists(approvals.approvalList, modelid);
            });
        });
        it('Step 8: Approve Publish Request', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield approvals.ApprovalAction(baseSurface, baseLineAssetId);
            });
        });
        it('Step 9: Delete BaseLine Asset', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Delete Enclave Model
                yield baseLineAsset.deleteBaseLineAsset(baseSurface, baselineAssetName, 'false');
            });
        });
        it('Step 10: Verify Approval Request For Delete', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield approvals.VerifyDeleteApprovalRequest(baseSurface, baseLineAssetId);
                // await ExpectHelper.isListElementExists(approvals.approvalList, modelid);
            });
        });
        it('Step 11: Approve Delete Action', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield approvals.ApprovalAction(baseSurface, baseLineAssetId);
            });
        });
        it('Step 12: Verify BaseLIne Asset Deleted Or Not', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield baseLineAsset.searchBaseLine(baseSurface, baselineAssetName);
            });
        });
        it('Step 13: Approval Request For Delete', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield approvals.DeleteApprovalRequest(baseSurface, policyGroupName);
            });
        });
        it('Step 14: Verify Approval Request For Delete', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield approvals.VerifyDeleteApprovalRequest(baseSurface, policyGroupId);
                // await ExpectHelper.isListElementExists(approvals.approvalList, policyGroupId);
            });
        });
        it('Step 15: Approve Delete Action', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield approvals.ApprovalAction(baseSurface, policyGroupId);
            });
        });
        it('Step 16: CleanUp', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield policyGroupTemplatePage.deletePolicyGroupTemplate(baseSurface, policyGroupTemplateName, 'false');
                yield attributeTag.deleteAttributeTag(baseSurface, attributeTagName, 'false');
            });
        });
        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdEZvckJhZWxpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3BlY3MvcmVxdWVzdEZvckJhZWxpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBZ0Q7QUFDaEQsd0RBQXFEO0FBQ3JELGtGQUFnRjtBQUNoRixrRUFBNEQ7QUFDNUQsc0VBQStEO0FBQy9ELDhEQUF3RDtBQUN4RCwwQ0FBOEM7QUFDOUMsd0VBQWlFO0FBRWpFLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRTs7UUFDM0IsSUFBSSxlQUFlLENBQUM7UUFDcEIsSUFBSSxFQUFFLEdBQUcsK0JBQWtCLENBQUM7UUFDNUIsSUFBSSxZQUFZLEdBQUcsSUFBSSwrQkFBWSxFQUFFLENBQUM7UUFDdEMsSUFBSSxVQUFVLEdBQUcsSUFBSSw0QkFBVyxFQUFFLENBQUM7UUFDbkMsSUFBSSxTQUFTLEdBQUcsSUFBSSx3QkFBUyxFQUFFLENBQUM7UUFDaEMsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDL0MsSUFBSSx1QkFBdUIsR0FBRyxJQUFJLGdEQUF1QixFQUFFLENBQUM7UUFDNUQsSUFBSSxhQUFhLEdBQUcsSUFBSSxpQ0FBYSxFQUFFLENBQUM7UUFDeEMsSUFBSSxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3ZHLElBQUksV0FBVyxHQUFHLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQztRQUNwRSxJQUFJLHVCQUF1QixHQUFHLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxzQ0FBc0MsR0FBRyx1QkFBdUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hKLElBQUksdUJBQXVCLEdBQUcsVUFBVSxDQUFDLHVCQUF1QixDQUFDLHNDQUFz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