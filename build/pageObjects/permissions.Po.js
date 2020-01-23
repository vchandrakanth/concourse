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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWlzc2lvbnMuUG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcGFnZU9iamVjdHMvcGVybWlzc2lvbnMuUG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBcUQ7QUFDckQsMENBQTZFO0FBQzdFLG9EQUFpRDtBQUNqRCx5Q0FBdUM7QUFFdkMsSUFBSSxLQUFLLEdBQUcsSUFBSSxvQkFBUyxFQUFFLENBQUM7QUFDNUIsSUFBSSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUNyRCxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUUvQyxNQUFhLHFCQUFxQjtJQUM5QixZQUFZLENBQUMsVUFBZSxJQUFJLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsS0FBSyxDQUFDLDZCQUE2QixVQUFVLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pHLElBQUksZUFBZSxLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNELGFBQWEsQ0FBQyxPQUFlLElBQUksT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxLQUFLLENBQUMsd0JBQXdCLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEcsSUFBSSxLQUFLLEtBQUssT0FBTyxjQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0MsSUFBSSxNQUFNLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRSxRQUFRLENBQUMsSUFBUyxJQUFJLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FB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