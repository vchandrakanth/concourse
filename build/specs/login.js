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
// See README.md for important details.
const protractor_1 = require("protractor");
const login_Po_1 = require("../pageObjects/login.Po");
const utils_1 = require("../utils/utils");
describe('Login Concourse ', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let originalTimeout;
        let EC = protractor_1.ExpectedConditions;
        beforeEach(function () {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
        });
        it('Step 1: open the brower and login', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Open the Url and login
                yield utils_1.goToMainPage();
                yield protractor_1.browser.logger.info('Logging into concourse website');
                // Login
                let loginPage = new login_Po_1.LoginPage();
                yield loginPage.login('admin@concoursehub.com', 'password');
                // await loginPage.clickTopologyCreateNode();
                // await loginPage.clickInviteUser();
            });
        });
        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3BlY3MvbG9naW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHVDQUF1QztBQUN2QywyQ0FBeUQ7QUFDekQsc0RBQW9EO0FBQ3BELDBDQUE4QztBQUU5QyxRQUFRLENBQUMsa0JBQWtCLEVBQUU7O1FBQzNCLElBQUksZUFBZSxDQUFDO1FBQ3BCLElBQUksRUFBRSxHQUFHLCtCQUFrQixDQUFDO1FBRTVCLFVBQVUsQ0FBQztZQUVULGVBQWUsR0FBRyxPQUFPLENBQUMsd0JBQXdCLENBQUM7WUFDbkQsT0FBTyxDQUFDLHdCQUF3QixHQUFHLE1BQU0sQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxtQ0FBbUMsRUFBRTs7Z0JBRXRDLHlCQUF5QjtnQkFDekIsTUFBTSxvQkFBWSxFQUFFLENBQUM7Z0JBRXJCLE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7Z0JBRTVELFFBQVE7Z0JBQ1IsSUFBSSxTQUFTLEdBQUcsSUFBSSxvQkFBUyxFQUFFLENBQUM7Z0JBQ2hDLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDNUQsNkNBQTZDO2dCQUM3QyxxQ0FBcUM7WUFDdkMsQ0FBQztTQUFBLENBQUMsQ0FBQztRQUVILFNBQVMsQ0FBQztZQUNSLE9BQU8sQ0FBQyx3QkFBd0IsR0FBRyxlQUFlLENBQUM7UUFDckQsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDO0NBQUEsQ0FBQyxDQUFDIn0=