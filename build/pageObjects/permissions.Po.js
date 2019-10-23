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
const utils_1 = require("../utils/utils");
const waitHelper_1 = require("../utils/waitHelper");
const login_Po_1 = require("./login.Po");
let login = new login_Po_1.LoginPage();
let configProperties = require('../conf/properties');
let properties = require('../conf/properties');
class VerifyUserPermissions {
    createButton(verifyText) { return protractor_1.element(protractor_1.by.xpath(`//button[contains(text(),'${verifyText}')]`)); }
    get surfaceDropDown() { return protractor_1.element(protractor_1.by.css('select')); }
    selectSurface(topology) { return protractor_1.element(protractor_1.by.xpath(`//option[contains(.,'${topology}')]`)); }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWlzc2lvbnMuUG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcGFnZU9iamVjdHMvcGVybWlzc2lvbnMuUG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBcUQ7QUFDckQsMENBQTZFO0FBQzdFLG9EQUFpRDtBQUNqRCx5Q0FBdUM7QUFFdkMsSUFBSSxLQUFLLEdBQUcsSUFBSSxvQkFBUyxFQUFFLENBQUM7QUFDNUIsSUFBSSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUNyRCxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUUvQyxNQUFhLHFCQUFxQjtJQUM5QixZQUFZLENBQUMsVUFBZSxJQUFJLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsS0FBSyxDQUFDLDZCQUE2QixVQUFVLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pHLElBQUksZUFBZSxLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNELGFBQWEsQ0FBQyxRQUFnQixJQUFJLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsS0FBSyxDQUFDLHdCQUF3QixRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BHLElBQUksS0FBSyxLQUFLLE9BQU8sY0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdDLElBQUksTUFBTSxLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEUsUUFBUSxDQUFDLElBQVMsSUFBSSxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENB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