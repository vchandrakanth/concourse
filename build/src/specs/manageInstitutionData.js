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
        let azureSubscription = ['Azure Subscriptions'];
        let azureAccount = ['Azure Account'];
        let networkWhitelists = ['Network Whitelists'];
        let publicKeys = ['Public Keys'];
        let accountKey = properties.SurfaceData.accountKey + institutionData.getRandomNum(1, 1000);
        let updatedAccountKey = properties.SurfaceData.accountKey + institutionData.getRandomNum(1, 1000);
        let accountValue = properties.SurfaceData.accountValue + institutionData.getRandomNum(1, 1000);
        let updatedAccountValue = properties.SurfaceData.accountValue + institutionData.getRandomNum(1, 1000);
        let whiteListValue = properties.SurfaceData.whiteListValue;
        let publicKey = properties.SurfaceData.dataForPublicKeys;
        let azureSubscriptionKey = properties.SurfaceData.azureSubscriptionKey;
        let azureSubscriptionValue = properties.SurfaceData.azureSubscriptionValue;
        let updatedWhiteListValue = properties.SurfaceData.UpdatedWhiteListValue;
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
        it('Step 2: Create AzureAccount Data For Institution', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield institutionData.createDataForInstitution(baseSurface, azureAccount, accountKey, '0', 'accountValue');
                yield expectHelper_1.ExpectHelper.isListElementExists(institutionData.dataAccountList, 'Azure Account');
            });
        });
        it('Step 3: Create Public Keys Data For Institution', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield institutionData.createDataForInstitution(baseSurface, publicKeys, 0, accountKey, accountValue);
                yield expectHelper_1.ExpectHelper.isListElementExists(institutionData.dataAccountList, 'Public Keys');
            });
        });
        it('Step 4: Create Network Whitelists Data For Institution', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield institutionData.createDataForInstitution(baseSurface, networkWhitelists, 0, whiteListValue, whiteListValue);
                yield expectHelper_1.ExpectHelper.isListElementExists(institutionData.dataAccountList, 'Network Whitelists');
            });
        });
        it('Step 5: Update Azure Subscriptions Data For Institurion', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield institutionData.updateValueForInstitutionData(baseSurface, azureSubscription, 1, azureSubscriptionKey, azureSubscriptionValue);
                yield protractor_1.browser.refresh();
            });
        });
        it('Step 6: Remove Azure Subscriptions Data For Institurion', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield institutionData.deleteValueForInstitutionData(baseSurface, azureSubscription, 1);
            });
        });
        it('Step 7: Update WhiteList Data For Institurion', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield institutionData.updateValueForInstitutionData(baseSurface, networkWhitelists, 1, updatedWhiteListValue, updatedWhiteListValue);
                yield protractor_1.browser.refresh();
            });
        });
        it('Step 8: Remove WhiteList Data For Institurion', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield institutionData.deleteValueForInstitutionData(baseSurface, networkWhitelists, 1);
            });
        });
        it('Step 9: Delete AZURE Account Data For Institution', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield institutionData.deleteDataAccountForInstitution(baseSurface, azureAccount);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(institutionData.selectAccount(azureAccount));
            });
        });
        it('Step 10: Delete Azure Subscription  Data For Institution', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield institutionData.deleteDataAccountForInstitution(baseSurface, azureSubscription);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(institutionData.selectAccount(azureSubscription));
            });
        });
        it('Step 11: Delete Public Keys Data For Institution', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield institutionData.deleteDataAccountForInstitution(baseSurface, publicKeys);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(institutionData.selectAccount(publicKeys));
            });
        });
        it('Step 12: Delete Network Whitelists Data For Institution', function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlSW5zdGl0dXRpb25EYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NwZWNzL21hbmFnZUluc3RpdHV0aW9uRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDJDQUF5RDtBQUN6RCx3REFBcUQ7QUFDckQsNERBQXFEO0FBQ3JELHNGQUEwRTtBQUUxRSxRQUFRLENBQUMsNkJBQTZCLEVBQUU7O1FBQ3BDLElBQUksZUFBZSxDQUFDO1FBQ3BCLElBQUksRUFBRSxHQUFHLCtCQUFrQixDQUFDO1FBQzVCLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQy9DLElBQUksT0FBTyxHQUFHLElBQUkscUJBQU8sRUFBRSxDQUFDO1FBQzVCLElBQUksZUFBZSxHQUFHLElBQUksMENBQWUsRUFBRSxDQUFDO1FBQzVDLElBQUksV0FBVyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO1FBQ3JELElBQUksaUJBQWlCLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ2hELElBQUksWUFBWSxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDckMsSUFBSSxpQkFBaUIsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDL0MsSUFBSSxVQUFVLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNqQyxJQUFJLFVBQVUsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsR0FBRyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzRixJQUFJLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxHQUFHLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xHLElBQUksWUFBWSxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsWUFBWSxHQUFHLGVBQWUsQ0FBQyxZ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