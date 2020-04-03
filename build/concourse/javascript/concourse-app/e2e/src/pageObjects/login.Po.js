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
class LoginPage {
    constructor() {
        // userName = element(by.id('username'));
        this.userName = protractor_1.element(protractor_1.by.css('[data-e2e="inputUsername"]'));
        // passWD = element(by.id('password'));
        this.passWD = protractor_1.element(protractor_1.by.css('[data-e2e="inputPassword"]'));
        // signInButton = element(by.css('.Sign'));
        this.signInButton = protractor_1.element(protractor_1.by.css('[data-e2e="loginButton"]'));
    }
    // Methods for Operation
    setName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userName.sendKeys(name);
            protractor_1.browser.logger.info('Entered user Name :' + name);
        });
    }
    setpassWD(name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.passWD.sendKeys(name);
            protractor_1.browser.logger.info('Entered Password:' + '*************');
        });
    }
    clickButton() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.signInButton.click();
        });
    }
    login(user, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            // Wait for 5 sec before entering the login information.
            yield this.setName(user);
            yield this.setpassWD(pass);
            yield this.clickButton();
        });
    }
    getPageTitle() {
        return __awaiter(this, void 0, void 0, function* () {
            return protractor_1.browser.getTitle();
        });
    }
}
exports.LoginPage = LoginPage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uUG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL2UyZS9zcmMvcGFnZU9iamVjdHMvbG9naW4uUG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBc0U7QUFFdEUsTUFBYSxTQUFTO0lBQXRCO1FBQ0UseUNBQXlDO1FBQ3pDLGFBQVEsR0FBRyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDO1FBQ3pELHVDQUF1QztRQUN2QyxXQUFNLEdBQUcsb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQztRQUN2RCwyQ0FBMkM7UUFDM0MsaUJBQVksR0FBRyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDO0lBNEI3RCxDQUFDO0lBekJDLHdCQUF3QjtJQUNsQixPQUFPLENBQUMsSUFBWTs7WUFFeEIsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQyxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDcEQsQ0FBQztLQUFBO0lBQ0ssU0FBUyxDQUFDLElBQVk7O1lBQzFCLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGVBQWUsQ0FBQyxDQUFDO1FBQzdELENBQUM7S0FBQTtJQUVLLFdBQVc7O1lBQ2YsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2xDLENBQUM7S0FBQTtJQUVLLEtBQUssQ0FBQyxJQUFTLEVBQUUsSUFBUzs7WUFDOUIsd0RBQXdEO1lBQ3hELE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QixNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0IsTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDM0IsQ0FBQztLQUFBO0lBRUssWUFBWTs7WUFDaEIsT0FBTyxvQkFBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVCLENBQUM7S0FBQTtDQUNGO0FBbENELDhCQWtDQyJ9