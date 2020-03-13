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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uUG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcGFnZU9iamVjdHMvbG9naW4uUG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJDQUFzRTtBQUV0RSxNQUFhLFNBQVM7SUFBdEI7UUFDRSx5Q0FBeUM7UUFDekMsYUFBUSxHQUFHLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUM7UUFDekQsdUNBQXVDO1FBQ3ZDLFdBQU0sR0FBRyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELDJDQUEyQztRQUMzQyxpQkFBWSxHQUFHLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUM7SUE0QjdELENBQUM7SUF6QkMsd0JBQXdCO0lBQ2xCLE9BQU8sQ0FBQyxJQUFZOztZQUV4QixNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25DLG9CQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNwRCxDQUFDO0tBQUE7SUFDSyxTQUFTLENBQUMsSUFBWTs7WUFDMUIsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsZUFBZSxDQUFDLENBQUM7UUFDN0QsQ0FBQztLQUFBO0lBRUssV0FBVzs7WUFDZixNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbEMsQ0FBQztLQUFBO0lBRUssS0FBSyxDQUFDLElBQVMsRUFBRSxJQUFTOztZQUM5Qix3REFBd0Q7WUFDeEQsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixNQUFNLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMzQixDQUFDO0tBQUE7SUFFSyxZQUFZOztZQUNoQixPQUFPLG9CQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUIsQ0FBQztLQUFBO0NBQ0Y7QUFsQ0QsOEJBa0NDIn0=