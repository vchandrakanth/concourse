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
            });
        });
        it('Step 2: Assign AWS Account To Surface', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield surface.assignAWSAccountsToSurface(baseSurface, awsAccountName);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlQVdTQWNjb3VudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zcGVjcy9jcmVhdGVBV1NBY2NvdW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQ0FBdUQ7QUFFdkQsNEVBQXdFO0FBQ3hFLDREQUFxRDtBQUNyRCxrREFBOEM7QUFHOUMsUUFBUSxDQUFDLHVCQUF1QixFQUFFOztRQUM5QixJQUFJLGVBQWUsQ0FBQztRQUNwQixJQUFJLEVBQUUsR0FBRywrQkFBa0IsQ0FBQztRQUM1QixJQUFJLGtCQUFrQixHQUFHLElBQUksd0NBQWtCLEVBQUUsQ0FBQztRQUNsRCxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMvQyxJQUFJLE9BQU8sR0FBRyxJQUFJLHFCQUFPLEVBQUUsQ0FBQztRQUM1QixJQUFJLGNBQWMsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxHQUFHLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0csSUFBSSxxQkFBcUIsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUM7UUFDOUUsSUFBSSxZQUFZLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQztRQUM1RCxJQUFJLFdBQVcsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQztRQUVyRCxVQUFVLENBQUM7WUFDUCxlQUFlLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDO1lBQ25ELE9BQU8sQ0FBQyx3QkFBd0IsR0FBRyxNQUFNLENBQUM7UUFDOUMsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsNEJBQTRCLEVBQUU7O2dCQUM3QixZQUFZLEdBQUcsb0JBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBRTtnQkFFaEQsTUFBTSxrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxjQUFjLEVBQUUscUJBQXFCLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFFeEcsQ0FBQztTQUFBLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyx1Q0FBdUMsRUFBRTs7Z0JBRXhDLE1BQU0sT0FBTyxDQUFDLDBCQUEwQixDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQztZQUUxRSxDQUFDO1NBQUEsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHlDQUF5QyxFQUFFOztnQkFFMUMsTUFBTSxPQUFPLENBQUMsNEJBQTRCLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBRTVFLENBQUM7U0FBQSxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsMEJBQTBCLEVBQUU7O2dCQUUzQixNQUFNLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUscUJBQXFCLENBQUMsQ0FBQztZQUVuRixDQUFDO1NBQUEsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLDRCQUE0QixFQUFFOztnQkFFN0IsTUFBTSxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUU5RCxDQUFDO1NBQUEsQ0FBQyxDQUFDO1FBRUgsU0FBUyxDQUFDO1lBQ04sT0FBTyxDQUFDLHdCQUF3QixHQUFHLGVBQWUsQ0FBQztRQUN2RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FBQSxDQUFDLENBQUMifQ==