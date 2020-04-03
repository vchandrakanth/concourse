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
const createAWSAccount_Po_1 = require("../pageObjects/createAWSAccount.Po");
const surfaces_Po_1 = require("../pageObjects/surfaces.Po");
const utilsMath_1 = require("../utils/utilsMath");
describe('Managing AWS Accounts', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let originalTimeout;
        let EC = protractor_1.ExpectedConditions;
        let createCloudAccount = new createAWSAccount_Po_1.CreateCloudAccount();
        let properties = require('../conf/properties');
        let surface = new surfaces_Po_1.Surface();
        let awsAccountName = properties.CloudAccountData.awsAccountName + createCloudAccount.getRandomNum(1, 1000);
        let awsAccountDescription = properties.CloudAccountData.awsAccountDescription;
        let awsAccountId = properties.CloudAccountData.awsAccountId;
        let baseSurface = properties.SurfaceData.surfaceName;
        beforeEach(function () {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
        });
        it('Step 1: Create AWS Account', function () {
            return __awaiter(this, void 0, void 0, function* () {
                awsAccountId = utilsMath_1.UtilMath.randomFixedInteger(12);
                yield createCloudAccount.createNewCloudAccount(awsAccountName, awsAccountDescription, awsAccountId);
                yield protractor_1.browser.refresh();
            });
        });
        it('Step 2: Assign AWS Account To Surface', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield surface.assignAWSAccountsToSurface(baseSurface, awsAccountName);
                yield protractor_1.browser.refresh();
            });
        });
        it('Step 3: Remove AWS Account From Surface', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield surface.removeAWSAccountsFromSurface(baseSurface, awsAccountName);
            });
        });
        it('Step 4: Edit AWS Account', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield createCloudAccount.editAWSAccount(awsAccountName, awsAccountDescription);
            });
        });
        it('Step 5: Delete AWS Account', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield createCloudAccount.deleteAWSAccount(awsAccountName);
            });
        });
        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlQVdTQWNjb3VudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zcGVjcy9jcmVhdGVBV1NBY2NvdW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkNBQWdFO0FBRWhFLDRFQUF3RTtBQUN4RSw0REFBcUQ7QUFDckQsa0RBQThDO0FBRzlDLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRTs7UUFDOUIsSUFBSSxlQUFlLENBQUM7UUFDcEIsSUFBSSxFQUFFLEdBQUcsK0JBQWtCLENBQUM7UUFDNUIsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLHdDQUFrQixFQUFFLENBQUM7UUFDbEQsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDL0MsSUFBSSxPQUFPLEdBQUcsSUFBSSxxQkFBTyxFQUFFLENBQUM7UUFDNUIsSUFBSSxjQUFjLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsR0FBRyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNHLElBQUkscUJBQXFCLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDO1FBQzlFLElBQUksWUFBWSxHQUFHLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7UUFDNUQsSUFBSSxXQUFXLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUM7UUFFckQsVUFBVSxDQUFDO1lBQ1AsZUFBZSxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQztZQUNuRCxPQUFPLENBQUMsd0JBQXdCLEdBQUcsTUFBTSxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLDRCQUE0QixFQUFFOztnQkFDN0IsWUFBWSxHQUFHLG9CQUFRLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUU7Z0JBRWhELE1BQU0sa0JBQWtCLENBQUMscUJBQXFCLENBQUMsY0FBYyxFQUFFLHFCQUFxQixFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUNwRyxNQUFNLG9CQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDNUIsQ0FBQztTQUFBLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyx1Q0FBdUMsRUFBRTs7Z0JBRXhDLE1BQU0sT0FBTyxDQUFDLDBCQUEwQixDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQztnQkFDdEUsTUFBTSxvQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRTVCLENBQUM7U0FBQSxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMseUNBQXlDLEVBQUU7O2dCQUUxQyxNQUFNLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFFNUUsQ0FBQztTQUFBLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQywwQkFBMEIsRUFBRTs7Z0JBRTNCLE1BQU0sa0JBQWtCLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1lBRW5GLENBQUM7U0FBQSxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsNEJBQTRCLEVBQUU7O2dCQUU3QixNQUFNLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBRTlELENBQUM7U0FBQSxDQUFDLENBQUM7UUFFSCxTQUFTLENBQUM7WUFDTixPQUFPLENBQUMsd0JBQXdCLEdBQUcsZUFBZSxDQUFDO1FBQ3ZELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUFBLENBQUMsQ0FBQyJ9