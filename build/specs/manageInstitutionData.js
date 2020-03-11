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
const expectHelper_1 = require("../utils/expectHelper");
const surfaces_Po_1 = require("../pageObjects/surfaces.Po");
const manageInstitutionData_Po_1 = require("../pageObjects/manageInstitutionData.Po");
describe('Surface Creation Concourse ', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let originalTimeout;
        let EC = protractor_1.ExpectedConditions;
        let properties = require('../conf/properties');
        let surface = new surfaces_Po_1.Surface();
        let institutionData = new manageInstitutionData_Po_1.InstitutionData();
        let baseSurface = properties.SurfaceData.surfaceName;
        let discoveredModelOwningGroupId = ['Discovered Model Owning Group Id'];
        let azureSubscription = ['Azure Subscriptions'];
        let azureAccount = ['Azure Account'];
        let networkWhitelists = ['Network Whitelists'];
        let insightsUrls = ['Insights Urls'];
        let accountKey = properties.SurfaceData.accountKey + institutionData.getRandomNum(1, 1000);
        let updatedAccountKey = properties.SurfaceData.accountKey + institutionData.getRandomNum(1, 1000);
        let accountValue = properties.SurfaceData.accountValue + institutionData.getRandomNum(1, 1000);
        let updatedAccountValue = properties.SurfaceData.accountValue + institutionData.getRandomNum(1, 1000);
        let whiteListValue = properties.SurfaceData.whiteListValue;
        let insightUrl = properties.SurfaceData.insightUrl;
        let updateInsightUrl = properties.SurfaceData.updatedInsightUrl;
        let azureSubscriptionKey = properties.SurfaceData.azureSubscriptionKey;
        let azureSubscriptionValue = properties.SurfaceData.azureSubscriptionValue;
        let updatedWhiteListValue = properties.SurfaceData.UpdatedWhiteListValue;
        let discoveredModelOwningGroupIdValue = properties.SurfaceData.Value;
        beforeEach(function () {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
        });
        it('Step 1: Create Azure Subscription Data For Institution', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield institutionData.createDataForInstitution(baseSurface, azureSubscription, 0, accountKey, accountValue);
                yield expectHelper_1.ExpectHelper.isListElementExists(institutionData.dataAccountList, 'Azure Subscriptions');
            });
        });
        it('Step 2: Create Discovered Model Owning GroupId For Institution', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield institutionData.createDataForInstitution(baseSurface, discoveredModelOwningGroupId, discoveredModelOwningGroupIdValue);
                yield expectHelper_1.ExpectHelper.isListElementExists(institutionData.dataAccountList, 'Discovered Model Owning GroupId');
            });
        });
        it('Step 3: Create AzureAccount Data For Institution', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield institutionData.createDataForInstitution(baseSurface, azureAccount, accountKey, '0', 'accountValue');
                yield expectHelper_1.ExpectHelper.isListElementExists(institutionData.dataAccountList, 'Azure Account');
            });
        });
        it('Step 4: Create Network Whitelists Data For Institution', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield institutionData.createDataForInstitution(baseSurface, networkWhitelists, 0, whiteListValue, whiteListValue);
                yield expectHelper_1.ExpectHelper.isListElementExists(institutionData.dataAccountList, 'Network Whitelists');
            });
        });
        it('Step 5: Create InsightsUrls Data For Institution', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield institutionData.createDataForInstitution(baseSurface, insightsUrls, insightUrl, '0', 'accountValue');
                yield expectHelper_1.ExpectHelper.isListElementExists(institutionData.dataAccountList, 'Insights Urls');
            });
        });
        it('Step 6: Update AWS Data For Institurion', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield institutionData.updateValueForInstitutionData(baseSurface, discoveredModelOwningGroupId, 1, updatedAccountKey, updatedAccountValue);
            });
        });
        it('Step 7: Remove AWS Value For Institurion', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield institutionData.deleteValueForInstitutionData(baseSurface, discoveredModelOwningGroupId, 1);
            });
        });
        it('Step 8: Update InsightUrl Data For Institurion', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield institutionData.updateValueForInstitutionData(baseSurface, insightsUrls, 1, 'accountKey', 'accountValue', updateInsightUrl);
            });
        });
        it('Step 9: Remove InsightUrl For Institurion', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield institutionData.deleteValueForInstitutionData(baseSurface, insightsUrls, 2);
            });
        });
        it('Step 10: Update Azure Subscriptions Data For Institurion', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield institutionData.updateValueForInstitutionData(baseSurface, azureSubscription, 1, azureSubscriptionKey, azureSubscriptionValue);
            });
        });
        it('Step 11: Remove Azure Subscriptions Data For Institurion', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield institutionData.deleteValueForInstitutionData(baseSurface, azureSubscription, 1);
            });
        });
        it('Step 12: Update WhiteList Data For Institurion', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield institutionData.updateValueForInstitutionData(baseSurface, networkWhitelists, 1, updatedWhiteListValue, updatedWhiteListValue);
            });
        });
        it('Step 13: Remove WhiteList Data For Institurion', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield institutionData.deleteValueForInstitutionData(baseSurface, networkWhitelists, 1);
            });
        });
        it('Step 14: Delete AWS Account Data For Institution', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield institutionData.deleteDataAccountForInstitution(baseSurface, discoveredModelOwningGroupId);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(institutionData.selectAccount(discoveredModelOwningGroupId));
            });
        });
        it('Step 15: Delete AZURE Account Data For Institution', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield institutionData.deleteDataAccountForInstitution(baseSurface, azureAccount);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(institutionData.selectAccount(azureAccount));
            });
        });
        it('Step 16: Delete Azure Subscription  Data For Institution', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield institutionData.deleteDataAccountForInstitution(baseSurface, azureSubscription);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(institutionData.selectAccount(azureSubscription));
            });
        });
        it('Step 17: Delete Insights Urls Data For Institution', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield institutionData.deleteDataAccountForInstitution(baseSurface, insightsUrls);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(institutionData.selectAccount(insightsUrls));
            });
        });
        it('Step 18: Delete Network Whitelists Data For Institution', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield institutionData.deleteDataAccountForInstitution(baseSurface, networkWhitelists);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(institutionData.selectAccount(networkWhitelists));
            });
        });
        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlSW5zdGl0dXRpb25EYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NwZWNzL21hbmFnZUluc3RpdHV0aW9uRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkNBQXlEO0FBQ3pELHdEQUFxRDtBQUNyRCw0REFBcUQ7QUFDckQsc0ZBQTBFO0FBRTFFLFFBQVEsQ0FBQyw2QkFBNkIsRUFBRTs7UUFDcEMsSUFBSSxlQUFlLENBQUM7UUFDcEIsSUFBSSxFQUFFLEdBQUcsK0JBQWtCLENBQUM7UUFDNUIsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDL0MsSUFBSSxPQUFPLEdBQUcsSUFBSSxxQkFBTyxFQUFFLENBQUM7UUFDNUIsSUFBSSxlQUFlLEdBQUcsSUFBSSwwQ0FBZSxFQUFFLENBQUM7UUFDNUMsSUFBSSxXQUFXLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUM7UUFDckQsSUFBSSw0QkFBNEIsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7UUFDeEUsSUFBSSxpQkFBaUIsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDaEQsSUFBSSxZQUFZLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNyQyxJQUFJLGlCQUFpQixHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMvQyxJQUFJLFlBQVksR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3JDLElBQUksVUFBVSxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxHQUFHLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNGLElBQUksaUJBQWlCLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEdBQUcsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEcsSUFBSSxZQUFZLEdBQUcs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