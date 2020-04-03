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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL2UyZS9zcmMvc3BlY3MvbG9naW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBdUM7QUFDdkMsMkNBQXlEO0FBQ3pELHNEQUFvRDtBQUNwRCwwQ0FBOEM7QUFFOUMsUUFBUSxDQUFDLGtCQUFrQixFQUFFOztRQUN6QixJQUFJLGVBQWUsQ0FBQztRQUNwQixJQUFJLEVBQUUsR0FBRywrQkFBa0IsQ0FBQztRQUU1QixVQUFVLENBQUM7WUFFUCxlQUFlLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDO1lBQ25ELE9BQU8sQ0FBQyx3QkFBd0IsR0FBRyxNQUFNLENBQUM7UUFDOUMsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsbUNBQW1DLEVBQUU7O2dCQUVwQyx5QkFBeUI7Z0JBQ3pCLE1BQU0sb0JBQVksRUFBRSxDQUFDO2dCQUVyQixNQUFNLG9CQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO2dCQUU1RCxRQUFRO2dCQUNSLElBQUksU0FBUyxHQUFHLElBQUksb0JBQVMsRUFBRSxDQUFDO2dCQUNoQyxNQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQzVELDZDQUE2QztnQkFDN0MscUNBQXFDO1lBQ3pDLENBQUM7U0FBQSxDQUFDLENBQUM7UUFFSCxTQUFTLENBQUM7WUFDTixPQUFPLENBQUMsd0JBQXdCLEdBQUcsZUFBZSxDQUFDO1FBQ3ZELENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztDQUFBLENBQUMsQ0FBQyJ9