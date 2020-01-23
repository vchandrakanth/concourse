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
        let awsAccount = ['Aws Accounts'];
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
        let getInstitutionDataName;
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
        it('Step 2: Create AWS Data For Institution', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield institutionData.createDataForInstitution(baseSurface, awsAccount, 0, accountKey, accountValue);
                yield expectHelper_1.ExpectHelper.isListElementExists(institutionData.dataAccountList, 'Aws Accounts');
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
                yield institutionData.updateValueForInstitutionData(baseSurface, awsAccount, 1, updatedAccountKey, updatedAccountValue);
            });
        });
        it('Step 7: Remove AWS Value For Institurion', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield institutionData.deleteValueForInstitutionData(baseSurface, awsAccount, 1);
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
                yield institutionData.deleteDataAccountForInstitution(baseSurface, awsAccount);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(institutionData.selectAccount(awsAccount));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlSW5zdGl0dXRpb25EYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NwZWNzL21hbmFnZUluc3RpdHV0aW9uRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDJDQUF5RDtBQUN6RCx3REFBcUQ7QUFDckQsNERBQXFEO0FBQ3JELHNGQUEwRTtBQUUxRSxRQUFRLENBQUMsNkJBQTZCLEVBQUU7O1FBQ3BDLElBQUksZUFBZSxDQUFDO1FBQ3BCLElBQUksRUFBRSxHQUFHLCtCQUFrQixDQUFDO1FBQzVCLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQy9DLElBQUksT0FBTyxHQUFHLElBQUkscUJBQU8sRUFBRSxDQUFDO1FBQzVCLElBQUksZUFBZSxHQUFHLElBQUksMENBQWUsRUFBRSxDQUFDO1FBQzVDLElBQUksV0FBVyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO1FBQ3JELElBQUksVUFBVSxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDbEMsSUFBSSxpQkFBaUIsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDaEQsSUFBSSxZQUFZLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNyQyxJQUFJLGlCQUFpQixHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMvQyxJQUFJLFlBQVksR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3JDLElBQUksVUFBVSxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxHQUFHLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNGLElBQUksaUJBQWlCLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEdBQUcsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEcsSUFBSSxZQUFZLEdBQUcsVUFB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