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
        // it('Step 2: Create Discovered Model Owning GroupId For Institution', async function (): Promise<any> {
        //     await institutionData.createDataForInstitution(baseSurface, discoveredModelOwningGroupId, discoveredModelOwningGroupIdValue);
        //     await ExpectHelper.isListElementExists(institutionData.dataAccountList, 'Discovered Model Owning GroupId');
        // });
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
        // it('Step 5: Create InsightsUrls Data For Institution', async function (): Promise<any> {
        //     await institutionData.createDataForInstitution(baseSurface, insightsUrls, insightUrl, '0', 'accountValue');
        //     await ExpectHelper.isListElementExists(institutionData.dataAccountList, 'Insights Urls');
        // });
        // it('Step 6: Update AWS Data For Institurion', async function (): Promise<any> {
        //     await institutionData.updateValueForInstitutionData(baseSurface, discoveredModelOwningGroupId, 1, updatedAccountKey, updatedAccountValue);
        // });
        // it('Step 7: Remove AWS Value For Institurion', async function (): Promise<any> {
        //     await institutionData.deleteValueForInstitutionData(baseSurface, discoveredModelOwningGroupId, 1);
        // });
        // it('Step 8: Update InsightUrl Data For Institurion', async function (): Promise<any> {
        //     await institutionData.updateValueForInstitutionData(baseSurface, insightsUrls, 1, 'accountKey', 'accountValue', updateInsightUrl);
        // });
        // it('Step 9: Remove InsightUrl For Institurion', async function (): Promise<any> {
        //     await institutionData.deleteValueForInstitutionData(baseSurface, insightsUrls, 2);
        // });
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
        // it('Step 12: Update WhiteList Data For Institurion', async function (): Promise<any> {
        //     await institutionData.updateValueForInstitutionData(baseSurface, networkWhitelists, 1, updatedWhiteListValue, updatedWhiteListValue);
        // });
        // it('Step 13: Remove WhiteList Data For Institurion', async function (): Promise<any> {
        //     await institutionData.deleteValueForInstitutionData(baseSurface, networkWhitelists, 1);
        // });
        // it('Step 14: Delete AWS Account Data For Institution', async function (): Promise<any> {
        //     await institutionData.deleteDataAccountForInstitution(baseSurface, discoveredModelOwningGroupId);
        //     await ExpectHelper.expectDoesNotExists(institutionData.selectAccount(discoveredModelOwningGroupId));
        // });
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
        // it('Step 17: Delete Insights Urls Data For Institution', async function (): Promise<any> {
        //     await institutionData.deleteDataAccountForInstitution(baseSurface, insightsUrls);
        //     await ExpectHelper.expectDoesNotExists(institutionData.selectAccount(insightsUrls));
        // });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlSW5zdGl0dXRpb25EYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NwZWNzL21hbmFnZUluc3RpdHV0aW9uRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDJDQUF5RDtBQUN6RCx3REFBcUQ7QUFDckQsNERBQXFEO0FBQ3JELHNGQUEwRTtBQUUxRSxRQUFRLENBQUMsNkJBQTZCLEVBQUU7O1FBQ3BDLElBQUksZUFBZSxDQUFDO1FBQ3BCLElBQUksRUFBRSxHQUFHLCtCQUFrQixDQUFDO1FBQzVCLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQy9DLElBQUksT0FBTyxHQUFHLElBQUkscUJBQU8sRUFBRSxDQUFDO1FBQzVCLElBQUksZUFBZSxHQUFHLElBQUksMENBQWUsRUFBRSxDQUFDO1FBQzVDLElBQUksV0FBVyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO1FBQ3JELElBQUksNEJBQTRCLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1FBQ3hFLElBQUksaUJBQWlCLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ2hELElBQUksWUFBWSxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDckMsSUFBSSxpQkFBaUIsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDL0MsSUFBSSxZQUFZLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNyQyxJQUFJLFVBQVUsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsR0FBRyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzRixJQUFJLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxHQUFHLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xHLElBQUksWUFBWSxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsWUFBWSxHQUFHLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9GLElBQUksbUJBQW1CLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEdBQUcsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdEcsSUFBSSxjQUFjLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUM7UUFDM0QsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUM7UUFDbkQsSUFBSSxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDO1FBQ2hFLElBQUksb0JBQW9CLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztRQUN2RSxJQUFJLHNCQUFzQixHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUM7UUFDM0UsSUFBSSxxQkFBcUIsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDO1FBQ3pFLElBQUksaUNBQWlDLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7UUFFckUsVUFBVSxDQUFDO1lBQ1AsZUFBZSxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQztZQUNuRCxPQUFPLENBQUMsd0JBQXdCLEdBQUcsTUFBTSxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHdEQUF3RCxFQUFFOztnQkFDekQsTUFBTSxlQUFlLENBQUMsd0JBQXdCLENBQUMsV0FBVyxFQUFFLGlCQUFpQixFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQzVHLE1BQU0sMkJBQVksQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLHFCQUFxQixDQUFDLENBQUM7WUFDbkcsQ0FBQztTQUFBLENBQUMsQ0FBQztRQUVILHlHQUF5RztRQUN6RyxvSUFBb0k7UUFDcEksa0hBQWtIO1FBQ2xILE1BQU07UUFFTixFQUFFLENBQUMsa0RBQWtELEVBQUU7O2dCQUNuRCxNQUFNLGVBQWUsQ0FBQyx3QkFBd0IsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQzNHLE1BQU0sMkJBQVksQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQzdGLENBQUM7U0FBQSxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsd0RBQXdELEVBQUU7O2dCQUN6RCxNQUFNLGVBQWUsQ0FBQyx3QkFBd0IsQ0FBQyxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLGNBQWMsRUFBRSxjQUFjLENBQUMsQ0FBQztnQkFDbEgsTUFBTSwyQkFBWSxDQUFDLG1CQUFtQixDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztZQUNsRyxDQUFDO1NBQUEsQ0FBQyxDQUFDO1FBRUgsMkZBQTJGO1FBQzNGLGtIQUFrSDtRQUNsSCxnR0FBZ0c7UUFDaEcsTUFBTTtRQUVOLGtGQUFrRjtRQUNsRixpSkFBaUo7UUFDakosTUFBTTtRQUVOLG1GQUFtRjtRQUNuRix5R0FBeUc7UUFDekcsTUFBTTtRQUVOLHlGQUF5RjtRQUN6Rix5SUFBeUk7UUFDekksTUFBTTtRQUVOLG9GQUFvRjtRQUNwRix5RkFBeUY7UUFDekYsTUFBTTtRQUVOLEVBQUUsQ0FBQywwREFBMEQsRUFBRTs7Z0JBQzNELE1BQU0sZUFBZSxDQUFDLDZCQUE2QixDQUFDLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxDQUFDLEVBQUUsb0JBQW9CLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztZQUN6SSxDQUFDO1NBQUEsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLDBEQUEwRCxFQUFFOztnQkFDM0QsTUFBTSxlQUFlLENBQUMsNkJBQTZCLENBQUMsV0FBVyxFQUFFLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzNGLENBQUM7U0FBQSxDQUFDLENBQUM7UUFFSCx5RkFBeUY7UUFDekYsNElBQTRJO1FBQzVJLE1BQU07UUFFTix5RkFBeUY7UUFDekYsOEZBQThGO1FBQzlGLE1BQU07UUFFTiwyRkFBMkY7UUFDM0Ysd0dBQXdHO1FBQ3hHLDJHQUEyRztRQUMzRyxNQUFNO1FBRU4sRUFBRSxDQUFDLG9EQUFvRCxFQUFFOztnQkFDckQsTUFBTSxlQUFlLENBQUMsK0JBQStCLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUNqRixNQUFNLDJCQUFZLENBQUMsbUJBQW1CLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3hGLENBQUM7U0FBQSxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsMERBQTBELEVBQUU7O2dCQUMzRCxNQUFNLGVBQWUsQ0FBQywrQkFBK0IsQ0FBQyxXQUFXLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztnQkFDdEYsTUFBTSwyQkFBWSxDQUFDLG1CQUFtQixDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQzdGLENBQUM7U0FBQSxDQUFDLENBQUM7UUFFSCw2RkFBNkY7UUFDN0Ysd0ZBQXdGO1FBQ3hGLDJGQUEyRjtRQUMzRixNQUFNO1FBRU4sRUFBRSxDQUFDLHlEQUF5RCxFQUFFOztnQkFDMUQsTUFBTSxlQUFlLENBQUMsK0JBQStCLENBQUMsV0FBVyxFQUFFLGlCQUFpQixDQUFDLENBQUM7Z0JBQ3RGLE1BQU0sMkJBQVksQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUM3RixDQUFDO1NBQUEsQ0FBQyxDQUFDO1FBRUgsU0FBUyxDQUFDO1lBQ04sT0FBTyxDQUFDLHdCQUF3QixHQUFHLGVBQWUsQ0FBQztRQUN2RCxDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7Q0FBQSxDQUFDLENBQUMifQ==