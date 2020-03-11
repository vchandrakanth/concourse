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
const utils_1 = require("../utils/utils");
const waitHelper_1 = require("../utils/waitHelper");
const login_Po_1 = require("./login.Po");
let login = new login_Po_1.LoginPage();
let configProperties = require('../conf/properties');
let properties = require('../conf/properties');
class VerifyUserPermissions {
    createButton(verifyText) { return protractor_1.element(protractor_1.by.xpath(`//button[contains(text(),'${verifyText}')]`)); }
    get surfaceDropDown() { return protractor_1.element(protractor_1.by.css('select')); }
    selectSurface(surface) { return protractor_1.element(protractor_1.by.xpath(`//option[contains(.,'${surface}')]`)); }
    get toast() { return protractor_1.$('#toast-container'); }
    get search() { return protractor_1.element(protractor_1.by.css('[placeholder="Search"]')); }
    listItem(Item) { return protractor_1.element(protractor_1.by.xpath(`//h5[.='${Item}']`)); }
    assetListItem(Item) { return protractor_1.element(protractor_1.by.xpath(`//span[.='${Item}']`)); }
    get buttonEdit() { return protractor_1.element(protractor_1.by.css('.fa-edit')); }
    get buttonDelete() { return protractor_1.element(protractor_1.by.css('.btn-danger')); }
    // get uploadButton() { return element(by.css('.fa-upload')); }
    get deployButton() { return protractor_1.element(protractor_1.by.css('//a[contains(.,"Deploys 0")]')); }
    VerifyPermissionGranted(module, Item = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.get(configProperties.qaUrl + `/${module}`);
            yield protractor_1.browser.sleep(5000);
            if ((module !== 'surfaces') && (module !== 'institutions/data') && (module !== 'user-management/users')) {
                yield this.search.sendKeys(Item);
                yield protractor_1.browser.sleep(2000);
            }
            if (module === 'assets') {
                yield utils_1.elementClick(this.assetListItem(Item));
                yield protractor_1.browser.logger.info(Item, 'Enclave Model Selected');
            }
            if (module === 'attribute-tags') {
                yield utils_1.elementClick(this.listItem(Item));
                yield protractor_1.browser.logger.info(Item, 'Attribute Tag Selected');
            }
            if (module === 'policy-group-templates') {
                yield utils_1.elementClick(this.listItem(Item));
                yield protractor_1.browser.logger.info(Item, 'Policy Group Template Selected');
            }
            if (module === 'policy-groups') {
                yield utils_1.elementClick(this.listItem(Item));
                yield protractor_1.browser.logger.info(Item, 'Policy Group Selected');
            }
            if (module === 'assets') {
                yield utils_1.elementClick(this.listItem(Item));
                yield protractor_1.browser.logger.info(Item, 'Enclave Model Selected');
            }
            if (module === 'surfaces') {
                yield protractor_1.browser.logger.info('Surface Page Opened');
            }
            if (module === 'institutions/data') {
                yield protractor_1.browser.logger.info('institutions Page Opened');
            }
            if (module === 'user-management/groups') {
                yield utils_1.elementClick(this.listItem(Item));
                yield protractor_1.browser.logger.info(Item, 'group Selected');
            }
            if (module === 'institutions/users') {
                yield protractor_1.browser.logger.info('Users Page Opened');
            }
            yield protractor_1.browser.sleep(2000);
        });
    }
    VerifyPermissionNotGranted(module, Item = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield protractor_1.browser.get(configProperties.qaUrl + `/${module}`);
            yield protractor_1.browser.sleep(5000);
        });
    }
    getPageTitle() {
        return __awaiter(this, void 0, void 0, function* () {
            return protractor_1.browser.getTitle();
        });
    }
}
exports.VerifyUserPermissions = VerifyUserPermissions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWlzc2lvbnMuUG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcGFnZU9iamVjdHMvcGVybWlzc2lvbnMuUG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJDQUFxRDtBQUNyRCwwQ0FBNkU7QUFDN0Usb0RBQWlEO0FBQ2pELHlDQUF1QztBQUV2QyxJQUFJLEtBQUssR0FBRyxJQUFJLG9CQUFTLEVBQUUsQ0FBQztBQUM1QixJQUFJLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ3JELElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBRS9DLE1BQWEscUJBQXFCO0lBQzlCLFlBQVksQ0FBQyxVQUFlLElBQUksT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxLQUFLLENBQUMsNkJBQTZCLFVBQVUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekcsSUFBSSxlQUFlLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0QsYUFBYSxDQUFDLE9BQWUsSUFBSSxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRyxJQUFJLEtBQUssS0FBSyxPQUFPLGNBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3QyxJQUFJLE1BQU0sS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLFFBQVEsQ0FBQyxJQUFTLElBQUksT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFD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