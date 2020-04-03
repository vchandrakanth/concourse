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
        let azureSubscription = 'Azure Subscriptions';
        let azureAccount = 'Azure Account';
        let networkWhitelists = 'Network Whitelists';
        let publicKeys = 'Public Keys';
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
        it('Step 6: Delete Azure Subscriptions Data For Institurion', function () {
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
        it('Step 8: Delete WhiteList Data For Institurion', function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlSW5zdGl0dXRpb25EYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9lMmUvc3JjL3NwZWNzL21hbmFnZUluc3RpdHV0aW9uRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDJDQUF5RDtBQUN6RCx3REFBcUQ7QUFDckQsNERBQXFEO0FBQ3JELHNGQUEwRTtBQUUxRSxRQUFRLENBQUMsNkJBQTZCLEVBQUU7O1FBQ3BDLElBQUksZUFBZSxDQUFDO1FBQ3BCLElBQUksRUFBRSxHQUFHLCtCQUFrQixDQUFDO1FBQzVCLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQy9DLElBQUksT0FBTyxHQUFHLElBQUkscUJBQU8sRUFBRSxDQUFDO1FBQzVCLElBQUksZUFBZSxHQUFHLElBQUksMENBQWUsRUFBRSxDQUFDO1FBQzVDLElBQUksV0FBVyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO1FBQ3JELElBQUksaUJBQWlCLEdBQUcscUJBQXFCLENBQUM7UUFDOUMsSUFBSSxZQUFZLEdBQUcsZUFBZSxDQUFDO1FBQ25DLElBQUksaUJBQWlCLEdBQUcsb0JBQW9CLENBQUM7UUFDN0MsSUFBSSxVQUFVLEdBQUcsYUFBYSxDQUFDO1FBQy9CLElBQUksVUFBVSxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxHQUFHLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNGLElBQUksaUJBQWlCLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEdBQUcsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEcsSUFBSSxZQUFZLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEdBQUcs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