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
const expectHelper_1 = require("../utils/expectHelper");
const login_Po_1 = require("../pageObjects/login.Po");
let configProperties = require('../conf/properties');
let properties = require('../conf/properties');
let loginpage = new login_Po_1.LoginPage();
class Group {
    constructor() {
        this.getRandomNum = function (min, max) {
            return parseInt(Math.random() * (max - min) + min);
        };
    }
    get groupsMenu() { return protractor_1.element(protractor_1.by.css('a[data-e2e="linkUserGroups"]')); }
    get createNewGroup() { return protractor_1.element(protractor_1.by.css('[data-e2e="createNewGroup"]')); }
    get enterGroupName() { return protractor_1.element(protractor_1.by.css('[data-e2e="inputGroupName"]')); }
    get enterGroupDescription() { return protractor_1.element(protractor_1.by.css('[data-e2e="inputGroupDescription"]')); }
    get createButton() { return protractor_1.element(protractor_1.by.css('[data-e2e="createGroupSaveBtn"]')); }
    get search() { return protractor_1.element(protractor_1.by.css('[placeholder="Search"]')); }
    get inputUserName() { return protractor_1.element(protractor_1.by.css('[data-e2e="inputUsername"]')); }
    searchGroup(name) { return protractor_1.element(protractor_1.by.xpath(`//h5[.='${name}']`)); }
    get usersTab() { return protractor_1.element(protractor_1.by.css('div[data-e2e="tabUsers"]')); }
    get userDropDown() { return protractor_1.element(protractor_1.by.xpath('//div[.="Select User"]')); }
    selectUser(user) { return protractor_1.element(protractor_1.by.xpath(`//span[.='${user}']`)); }
    get addButton() { return protractor_1.element(protractor_1.by.css('.Add')); }
    // rolesAssignments(roleCount: any) { return element(by.xpath(`//a[contains(.,"Roles Assignments (${roleCount})")]`)); }
    get rolesAssignments() { return protractor_1.element(protractor_1.by.css('div[data-e2e="tabRoleAssignments"]')); }
    get rolesDropDown() { return protractor_1.element(protractor_1.by.css('ng-select[formcontrolname="roleId"]')); }
    selectRole(role) { return protractor_1.element(protractor_1.by.xpath(`//span[.='${role}']`)); }
    get responsibilitiesDropDown() { return protractor_1.element(protractor_1.by.css('ng-select[formcontrolname="responsibilitiesAssigned"]')); }
    get selectAllResponsibilities() { return protractor_1.element(protractor_1.by.xpath('//ng-multiselect-dropdown[@name="responsibilitiesAssigned"]//div[.="Select All"]')); }
    selectResponsibility(responsibility) { return protractor_1.element(protractor_1.by.xpath(`//span[.='${responsibility}']`)); }
    get dropDownClose() { return protractor_1.element(protractor_1.by.css('.dropdown-up')); }
    get surfaceLayerNodesDropDown() { return protractor_1.element(protractor_1.by.css('ng-select[formcontrolname="surfaceLayersAppliedTo"]')); }
    selectorganization(organization) { return protractor_1.element(protractor_1.by.xpath(`//span[.='${organization}']`)); }
    get submitButton() { return protractor_1.element(protractor_1.by.xpath('//button[contains(text(),"Submit")]')); }
    selectRoleToDelete(role) { return protractor_1.element(protractor_1.by.xpath(`//li[contains(.,'${role}')]//button[@data-e2e='deleteRoleAssignment']`)); }
    get roleElement() { return protractor_1.element(protractor_1.by.xpath('div.border-top-0 > .card-body')); }
    // get deleteRoleAssignment() { return element(by.css('[data-e2e="deleteRoleAssignment"]')); }
    get deleteRoleAssignment() { return protractor_1.element(protractor_1.by.css('button[data-e2e="deleteRoleAssignment"]')); }
    get associateGroup() { return protractor_1.element(protractor_1.by.css('button[data-e2e="associateGroup"]')); } // data-e2e="addGroupsToSurface"
    selectUserToDelete(user) { return protractor_1.element(protractor_1.by.xpath(`//span[.='${user}']`)); }
    get confirmDeleteButton() { return protractor_1.element(protractor_1.by.css('.delete')); }
    // get deleteUser() { return element(by.css('[data-e2e="deleteUser"]')); }
    get deleteUser() { return protractor_1.element(protractor_1.by.css('button[data-e2e="deleteUser"]')); }
    get deleteButton() { return protractor_1.element(protractor_1.by.css('button[title="Delete Group"]')); }
    get toast() { return protractor_1.$('#toast-container'); }
    get groupList() { return protractor_1.element(protractor_1.by.xpath('//div[@class="list"]')); }
    get groupElement() { return protractor_1.element(protractor_1.by.css('.content')); }
    // get surfaceDropDown() { return element(by.css('select')); }
    get surfacesMenu() { return protractor_1.element(protractor_1.by.css('a[data-e2e="linkSurfaces"]')); }
    selectSurface(surface) { return protractor_1.element(protractor_1.by.xpath(`//option[contains(.,'${surface}')]`)); }
    get clearSearch() { return protractor_1.element(protractor_1.by.css('input')); }
    get saveButton() { return protractor_1.element(protractor_1.by.css('.Save')); }
    get associateGroupButton() { return protractor_1.element(protractor_1.by.xpath('[data-e2e="associateGroup"]')); }
    get associateGroupDropDown() { return protractor_1.element(protractor_1.by.xpath('//span[@class="ng-arrow-wrapper"]')); }
    get surfacelist() { return protractor_1.element(protractor_1.by.css('.card-body')); }
    get deleteGroupButton() { return protractor_1.element(protractor_1.by.css('.btn-danger')); }
    selectsurface(name) { return protractor_1.element(protractor_1.by.xpath(`//option[contains(.,'${name}')]`)); }
    get surfaceDropDown() { return protractor_1.element(protractor_1.by.css('[data-e2e="surfaceSwitcherDropdown"]')); }
    // get blankClick() { return element(by.css('form')); }
    get blankClick() { return protractor_1.element(protractor_1.by.css('element(by.css("tab:nth-of-type(3)>div:nth-of-type(4)>div:nth-of-type(3)"))')); }
    selectGroup(groupName) { return protractor_1.element(protractor_1.by.xpath(`//option[contains(.,'${groupName}')]`)); }
    get editAllowedgroupsButton() { return protractor_1.element(protractor_1.by.css('button[data-e2e="addGroupsToSurface"]')); }
    selectGroupToDeAssociate(groupId) { return protractor_1.element(protractor_1.by.css(`span[data-e2e='${groupId}']`)); }
    get profileDropdown() { return protractor_1.element(protractor_1.by.xpath('//button[@id="button-split"]')); }
    get logOutButton() { return protractor_1.element(protractor_1.by.xpath('//a[.="Logout"]')); }
    cloudRoleAssignmentTab(count) { return protractor_1.element(protractor_1.by.xpath(`//a[contains(.,'Cloud Role Assignments (${count})')]`)); }
    get cloudRoleDropDown() { return protractor_1.element(protractor_1.by.css('[formcontrolname="cloudRole"]')); }
    selectCloudRole(cloudRole) { return protractor_1.element(protractor_1.by.xpath(`//strong[.='${cloudRole}']`)); }
    get surfaceLayerDropDown() { return protractor_1.element(protractor_1.by.css('tab.cloud-role-assignments [formcontrolname="surfaceLayersAppliedTo"] > div > span')); }
    get selectSurfaceLayer() { return protractor_1.element(protractor_1.by.xpath('//span[@class="ng-option-label ng-star-inserted"]')); }
    get submitCloudRoleButton() { return protractor_1.element(protractor_1.by.css('tab.cloud-role-assignments .btn')); }
    // selectCloudRoleToDelete(cloudRole: any) { return element(by.xpath(`//li[contains(.,'${cloudRole}')]//button[@data-e2e='deleteCloudRoleAssignment']`)); }
    selectCloudRoleToDelete(cloudRole) { return protractor_1.element(protractor_1.by.xpath(`//li[contains(.,'${cloudRole}')]//button[@data-e2e='deleteCloudRoleAssignment']`)); }
    get alertWindow() { return protractor_1.element(protractor_1.by.css('div.modal-body .alert-container')); }
    get alertMessage() { return protractor_1.element(protractor_1.by.css('//div[@class="modal-body"]//div[@class="alert alert-danger alert-dismissible ng-star-inserted"]')); }
    // Group methods
    createGroup(surfaceName = null, groupName = null, description = null, roleCount) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            // Click On Groups Menu
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.groupsMenu, 2000, 'Groups Menu');
            yield utils_1.elementClick(this.groupsMenu);
            yield protractor_1.browser.logger.info('Groups Menu Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Suface Drop Down');
            yield protractor_1.browser.actions().mouseMove(this.surfaceDropDown).perform();
            yield utils_1.elementClick(this.surfaceDropDown);
            yield protractor_1.browser.logger.info('Suface Drop Down Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectSurface(surfaceName), 2000, 'E2E Surface');
            yield utils_1.elementClick(this.selectSurface(surfaceName));
            yield protractor_1.browser.logger.info('Selected E2E Surface');
            // Click On + Symbol
            yield waitHelper_1.WaitHelper.waitForElement(this.createNewGroup, 5000, 'Create New Group');
            yield utils_1.elementClick(this.createNewGroup);
            yield protractor_1.browser.logger.info('Clicked + Button');
            // On the  Group dialog box, input Group Name
            yield waitHelper_1.WaitHelper.waitForElement(this.enterGroupName, 10000, 'Group Name');
            yield utils_1.elementSendkeys(this.enterGroupName, groupName);
            yield protractor_1.browser.logger.info('Group Name Entered');
            // On the  Group dialog box, input Group Description
            yield waitHelper_1.WaitHelper.waitForElement(this.enterGroupDescription, 5000, 'Group Description ');
            yield utils_1.elementSendkeys(this.enterGroupDescription, description);
            yield protractor_1.browser.logger.info('Group Description Entered');
            // Click On Create Button
            yield utils_1.elementClick(this.createButton);
            yield protractor_1.browser.logger.info('Group Created');
            yield protractor_1.browser.logger.info('GroupName IS: ', groupName);
            yield protractor_1.browser.sleep(2000);
            // Click On Roles Assignment Tab
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.rolesAssignments, 2000, 'Roles Assignment ');
            yield utils_1.elementClick(this.rolesAssignments);
            yield protractor_1.browser.logger.info('Selected Roles Assignment');
            // Click On Associate Group
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.associateGroup, 2000, 'Associate Group ');
            yield utils_1.elementClick(this.associateGroup);
            yield protractor_1.browser.logger.info('Clicked Associate Group');
            yield protractor_1.browser.sleep(2000);
        });
    }
    searchGroupName(surfaceName = null, groupName = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.groupsMenu, 2000, 'Groups Menu');
            // await browser.actions().mouseMove(this.groupsMenu).perform();
            yield utils_1.elementClick(this.groupsMenu);
            yield protractor_1.browser.logger.info('Groups Menu Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Surface Drop Down');
            yield protractor_1.browser.actions().mouseDown(this.surfaceDropDown).perform();
            yield utils_1.elementClick(this.surfaceDropDown);
            yield protractor_1.browser.logger.info('Surface Drop Down Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectSurface(surfaceName), 2000, 'E2E Topology ');
            yield utils_1.elementClick(this.selectSurface(surfaceName));
            yield protractor_1.browser.logger.info('Selected E2E Topology');
            yield utils_1.elementClear(this.search, groupName);
            // Select Created Deployment
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.groupList, 5000, 'Group List Displayed');
            yield this.search.sendKeys(groupName);
            yield utils_1.elementClick(this.searchGroup(groupName));
            yield protractor_1.browser.logger.info(groupName, 'Selected');
        });
    }
    dissociateGroup(surfaceName = null, groupName = null, groupId = null) {
        return __awaiter(this, void 0, void 0, function* () {
            // Wait till the toast message is diappeared to continue the flow
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.surfacesMenu, 5000, 'Surfaces Menu');
            yield utils_1.elementClick(this.surfacesMenu);
            yield protractor_1.browser.logger.info('Surface Page Displayed');
            yield this.selectSurfaceFromDropDown(surfaceName);
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.editAllowedgroupsButton, 5000, 'Edit Allowed Groups');
            yield protractor_1.browser.actions().mouseMove(this.editAllowedgroupsButton).perform();
            yield utils_1.elementClick(this.editAllowedgroupsButton);
            yield protractor_1.browser.logger.info('Edit Allowed Groups Button');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.selectGroupToDeAssociate(groupId), 5000, 'Group List Displayed');
            yield protractor_1.browser.actions().mouseMove(this.selectGroupToDeAssociate(groupId)).perform();
            yield utils_1.elementClick(this.selectGroupToDeAssociate(groupId));
            yield protractor_1.browser.logger.info('Group Selected');
            // Click Save
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.saveButton, 5000, 'Save');
            yield protractor_1.browser.actions().mouseMove(this.saveButton).perform();
            yield utils_1.elementClick(this.saveButton);
            yield protractor_1.browser.logger.info('Save');
            yield protractor_1.browser.logger.info(groupId, 'Deassociate From Surface');
        });
    }
    deleteGroup(surfaceName = null, groupName = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.groupsMenu, 2000, 'Groups Menu');
            // await elementClick(this.groupsMenu);
            yield protractor_1.browser.get(configProperties.qaUrl + '/user-management/groups');
            yield protractor_1.browser.logger.info('Groups Menu Clicked');
            yield this.searchGroupName(surfaceName, groupName);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.deleteButton, 2000, 'Delete Button');
            yield protractor_1.browser.actions().mouseMove(this.deleteButton).perform();
            yield utils_1.elementClick(this.deleteButton);
            yield protractor_1.browser.logger.info('Clicked On Delete Button');
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.confirmDeleteButton, 2000, 'Confirm Delete');
            yield protractor_1.browser.actions().mouseMove(this.confirmDeleteButton).perform();
            yield utils_1.elementClick(this.confirmDeleteButton);
            yield protractor_1.browser.logger.info('Group Deleted');
        });
    }
    // User methods
    assignUserForGroup(surfaceName = null, groupName = null, user = null, count) {
        return __awaiter(this, void 0, void 0, function* () {
            //  Wait till the toast message is diappeared to continue the flow
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.groupsMenu, 2000, 'Groups Memu');
            yield utils_1.elementClick(this.groupsMenu);
            yield protractor_1.browser.logger.info('Groups Menu Clicked');
            yield this.searchGroupName(surfaceName, groupName);
            // Click Users Tab
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.usersTab, 5000, 'Users Tab');
            yield utils_1.elementClick(this.usersTab);
            yield protractor_1.browser.logger.info('Users Tab Selected');
            // Click User Drop Down
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.userDropDown, 2000, 'Users Drop Down ');
            yield protractor_1.browser.actions().mouseMove(this.userDropDown).perform();
            yield utils_1.elementClick(this.userDropDown);
            yield protractor_1.browser.logger.info('User Drop Down Selected');
            // Select User
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectUser(user), 2000, 'ramakrishna+e2e@concourselabs.com');
            yield protractor_1.browser.actions().mouseMove(this.selectUser(user)).perform();
            yield utils_1.elementClick(this.selectUser(user));
            yield protractor_1.browser.logger.info('User Selected');
            // Click On Add
            yield utils_1.elementClick(this.addButton);
            yield protractor_1.browser.logger.info(user, 'User Added To The Group');
            yield protractor_1.browser.sleep(2000);
        });
    }
    removeUserForGroup(surfaceName = null, groupName = null, user = null) {
        return __awaiter(this, void 0, void 0, function* () {
            //  Wait till the toast message is diappeared to continue the flowa
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.groupsMenu, 2000, 'Groups Memu');
            yield utils_1.elementClick(this.groupsMenu);
            yield protractor_1.browser.logger.info('Groups Menu Clicked');
            yield this.searchGroupName(surfaceName, groupName);
            // Click Users Tab
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.usersTab, 5000, 'Users');
            yield utils_1.elementClick(this.usersTab);
            yield protractor_1.browser.logger.info('Users Tab Selected');
            yield protractor_1.browser.sleep(5000);
            // Delete Uer
            yield this.deleteUserFromGroup(user);
            yield protractor_1.browser.logger.info(user, 'User Deleted');
        });
    }
    deleteUserFromGroup(user = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectUserToDelete(user), 5000, 'Delete User');
            yield protractor_1.browser.actions().mouseMove(this.selectUserToDelete(user)).perform();
            yield utils_1.elementClick(this.selectUserToDelete(user));
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.deleteUser, 5000, 'Delete User');
            yield protractor_1.browser.actions().mouseMove(this.deleteUser).perform();
            yield utils_1.elementClick(this.deleteUser);
            yield protractor_1.browser.logger.info('Clicked On Delete User');
            // Click Confoirm Delete
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.confirmDeleteButton, 5000, 'Confirm Delete User');
            yield protractor_1.browser.actions().mouseMove(this.confirmDeleteButton).perform();
            yield utils_1.elementClick(this.confirmDeleteButton);
            yield protractor_1.browser.logger.info('Confirm Delete');
        });
    }
    // RoleAssignment methods
    addRoleToGroup(surfaceName = null, groupName = null, role, responsibility, organization = null) {
        return __awaiter(this, void 0, void 0, function* () {
            //  Wait till the toast message is diappeared to continue the flow
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            // Click On Groups Menu
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.groupsMenu, 2000, 'Groups Memu');
            yield protractor_1.browser.actions().mouseMove(this.groupsMenu).perform();
            yield utils_1.elementClick(this.groupsMenu);
            yield protractor_1.browser.logger.info('Groups Menu Clicked');
            yield this.searchGroupName(surfaceName, groupName);
            // Click On Roles Assignment Tab
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.rolesAssignments, 2000, 'Roles Assignment ');
            yield utils_1.elementClick(this.rolesAssignments);
            yield protractor_1.browser.logger.info('Selected Roles Assignment');
            for (let roleName of role) {
                console.log('value', roleName);
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.rolesDropDown, 5000, 'Roles Drop Down ');
                yield utils_1.elementClick(this.rolesDropDown);
                yield protractor_1.browser.sleep(3000);
                // Select Role
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectRole(roleName), 5000, 'Roles');
                yield protractor_1.browser.actions().mouseMove(this.selectRole(roleName)).perform();
                yield utils_1.elementClick(this.selectRole(roleName));
                yield protractor_1.browser.logger.info('Role Selected');
                yield protractor_1.browser.sleep(2000);
            }
            for (let responsibilityName of responsibility) {
                console.log(responsibility[responsibilityName]);
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.responsibilitiesDropDown, 2000, 'Responsibilities Drop Down ');
                yield utils_1.elementClick(this.responsibilitiesDropDown);
                // Select Role
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectResponsibility(responsibilityName), 3000, 'Responsibilities ');
                yield protractor_1.browser.sleep(1000);
                yield protractor_1.browser.actions().mouseDown(this.selectResponsibility(responsibilityName)).perform();
                yield utils_1.elementClick(this.selectResponsibility(responsibilityName));
                yield protractor_1.browser.logger.info('Responsibilities Selected');
                yield protractor_1.browser.sleep(2000);
            }
            if (organization) {
                yield this.addOrganization(organization);
                yield protractor_1.browser.logger.info(organization, 'Selected');
                yield protractor_1.browser.sleep(2000);
            }
            // await elementClick(this.blankClick);
            // Click On Submit Button
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.submitButton, 2000, 'Submit ');
            yield protractor_1.browser.actions().mouseMove(this.submitButton).perform();
            yield utils_1.elementClick(this.submitButton);
            yield protractor_1.browser.logger.info('Group Updated');
            yield protractor_1.browser.logger.info(role, 'Role Added To The Group');
            yield protractor_1.browser.sleep(2000);
        });
    }
    removeRolesFromGroup(surfaceName = null, groupName = null, roles) {
        return __awaiter(this, void 0, void 0, function* () {
            //  Wait till the toast message is diappeared to continue the flow
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            // Click On Groups Menu
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.groupsMenu, 2000, 'Groups Memu');
            yield utils_1.elementClick(this.groupsMenu);
            yield protractor_1.browser.logger.info('Groups Menu Clicked');
            yield this.searchGroupName(surfaceName, groupName);
            // Click On Roles Assignment Tab
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.rolesAssignments, 2000, 'Roles Assignment ');
            yield utils_1.elementClick(this.rolesAssignments);
            yield protractor_1.browser.logger.info('Selected Roles Assignment');
            // Select Role To Delete
            for (let roleName of roles) {
                console.log('value', roleName);
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectRoleToDelete(roleName), 2000, 'Role Selected ');
                yield protractor_1.browser.actions().mouseMove(this.selectRoleToDelete(roleName)).perform();
                yield utils_1.elementClick(this.selectRoleToDelete(roleName));
                yield protractor_1.browser.logger.info('Selected Roles Assignment');
            }
            // Click On Roles Assignment Tab
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.confirmDeleteButton, 2000, 'Confirm Delete Roles Assignment ');
            yield protractor_1.browser.actions().mouseDown(this.confirmDeleteButton).perform();
            yield utils_1.elementClick(this.confirmDeleteButton);
            yield protractor_1.browser.logger.info(roles, 'Role Assignment Deleted');
            yield protractor_1.browser.sleep(2000);
        });
    }
    assignCloudRoleForGroup(surfaceName = null, groupName = null, count = null, cloudRoles) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            // Click On Groups Menu
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.groupsMenu, 2000, 'Groups Memu');
            yield utils_1.elementClick(this.groupsMenu);
            yield protractor_1.browser.logger.info('Groups Menu Clicked');
            yield this.searchGroupName(surfaceName, groupName);
            // Click On Cloud Roles Assignment Tab
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.cloudRoleAssignmentTab(count), 2000, 'Cloud Roles Assignment ');
            yield utils_1.elementClick(this.cloudRoleAssignmentTab(count));
            yield protractor_1.browser.logger.info('Selected Cloud Roles Assignment');
            for (let cloudRoleName of cloudRoles) {
                console.log('value', cloudRoleName);
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.cloudRoleDropDown, 2000, 'Cloud Roles Drop Down ');
                yield utils_1.elementClick(this.cloudRoleDropDown);
                yield protractor_1.browser.sleep(2000);
                // Select Cloud Role
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectCloudRole(cloudRoleName), 3000, 'Cloud Roles');
                yield protractor_1.browser.actions().mouseMove(this.selectCloudRole(cloudRoleName)).perform();
                yield utils_1.elementClick(this.selectCloudRole(cloudRoleName));
                yield protractor_1.browser.logger.info('Cloud Role Selected');
            }
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.surfaceLayerDropDown, 2000, 'Surface Layer Drop Down');
            yield utils_1.elementClick(this.surfaceLayerDropDown);
            yield protractor_1.browser.logger.info(cloudRoles, 'Surface Layer Drop Down');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectSurfaceLayer, 2000, 'Surface Layer');
            yield utils_1.elementClick(this.selectSurfaceLayer);
            yield protractor_1.browser.logger.info('Surface Layer Added');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.submitCloudRoleButton, 2000, 'Submit ');
            yield utils_1.elementClick(this.submitCloudRoleButton);
            yield protractor_1.browser.logger.info('Group Updated');
            yield protractor_1.browser.logger.info(cloudRoles, 'Role Added To The Group');
        });
    }
    removeCloudRolesFromGroup(surfaceName = null, groupName = null, count = null, cloudRoles) {
        return __awaiter(this, void 0, void 0, function* () {
            //  Wait till the toast message is diappeared to continue the flow
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            // Click On Groups Menu
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.groupsMenu, 2000, 'Groups Memu');
            yield utils_1.elementClick(this.groupsMenu);
            yield protractor_1.browser.logger.info('Groups Menu Clicked');
            yield this.searchGroupName(surfaceName, groupName);
            // Click On Roles Assignment Tab
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.cloudRoleAssignmentTab(count), 2000, 'Cloud Roles Assignment ');
            yield utils_1.elementClick(this.cloudRoleAssignmentTab(count));
            yield protractor_1.browser.logger.info('Selected Cloud Roles Assignment');
            // Select Role To Delete
            for (let cloudRoleName of cloudRoles) {
                console.log('value', cloudRoleName);
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectCloudRoleToDelete(cloudRoleName), 5000, 'Cloud Role Selected ');
                yield protractor_1.browser.actions().mouseMove(this.selectCloudRoleToDelete(cloudRoleName)).perform();
                yield protractor_1.browser.sleep(2000);
                yield utils_1.elementClick(this.selectCloudRoleToDelete(cloudRoleName));
                yield protractor_1.browser.logger.info('Selected Cloud Roles Assignment');
                yield protractor_1.browser.sleep(2000);
            }
            // Click On Roles Assignment Tab
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.confirmDeleteButton, 2000, 'Confirm Delete Cloud Roles Assignment ');
            yield protractor_1.browser.actions().mouseDown(this.confirmDeleteButton).perform();
            yield protractor_1.browser.sleep(2000);
            yield utils_1.elementClick(this.confirmDeleteButton);
            yield protractor_1.browser.logger.info(cloudRoles, 'Cloud Role Assignment Deleted');
            yield protractor_1.browser.sleep(3000);
        });
    }
    verifyRolesInUI(surfaceName = null, groupName = null, roles) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            // Click On Groups Menu
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.groupsMenu, 2000, 'Groups Memu');
            yield utils_1.elementClick(this.groupsMenu);
            yield protractor_1.browser.logger.info('Groups Menu Clicked');
            yield this.searchGroupName(surfaceName, groupName);
            // Click On Roles Assignment Tab
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.rolesAssignments, 2000, 'Roles Assignment ');
            yield utils_1.elementClick(this.rolesAssignments);
            yield protractor_1.browser.logger.info('Selected Roles Assignment');
            for (let roleName of roles) {
                console.log('value', roleName);
                expectHelper_1.ExpectHelper.expectDoesNotExists(this.selectRoleToDelete(roleName));
                yield protractor_1.browser.logger.info(roleName, 'Role Assignment Removed');
            }
        });
    }
    // Generic Method
    addOrganization(organization = null) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let OrganizationName of organization) {
                console.log(organization[OrganizationName]);
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.surfaceLayerNodesDropDown, 2000, 'Organization Drop Down ');
                yield utils_1.elementClick(this.surfaceLayerNodesDropDown);
                // Select Role
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectorganization(OrganizationName), 3000, 'Organization ');
                // await browser.sleep(2000);
                yield protractor_1.browser.actions().mouseDown(this.selectorganization(OrganizationName)).perform();
                yield utils_1.elementClick(this.selectorganization(OrganizationName));
                yield protractor_1.browser.logger.info('organization Selected');
            }
        });
    }
    logOut(user = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.profileDropdown, 3000, 'Drop Down ');
            yield utils_1.elementClick(this.profileDropdown);
            yield protractor_1.browser.logger.info('Drop Down Selected');
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.logOutButton, 3000, 'Log Out');
            yield utils_1.elementClick(this.logOutButton);
            yield protractor_1.browser.logger.info('User Logged Out');
        });
    }
    reLogin(user, user1, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield this.logOut(user);
            yield utils_1.elementClear(this.inputUserName, user);
            yield protractor_1.browser.sleep(2000);
            yield loginpage.login(user1, pass);
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
        });
    }
    selectSurfaceFromDropDown(surfaceName = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.surfaceDropDown, 5000, 'Surface Drop Down ');
            yield utils_1.elementClick(this.surfaceDropDown);
            yield protractor_1.browser.logger.info(surfaceName, 'Surface Drop Down Clicked');
            yield waitHelper_1.WaitHelper.waitForElementToBePresent(this.selectSurface(surfaceName), 5000, 'Surface');
            yield utils_1.elementClick(this.selectSurface(surfaceName));
            yield protractor_1.browser.logger.info('Surface Selcted');
            yield protractor_1.browser.sleep(2000);
        });
    }
    getId() {
        return __awaiter(this, void 0, void 0, function* () {
            return protractor_1.browser.getCurrentUrl().then(function (url) {
                console.log(url);
                let str = 'currentUrl';
                let entityId = [];
                entityId = url.split('/');
                return entityId[5];
            });
        });
    }
    getPageTitle() {
        return __awaiter(this, void 0, void 0, function* () {
            return protractor_1.browser.getTitle();
        });
    }
}
exports.Group = Group;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXBzLlBvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3BhZ2VPYmplY3RzL2dyb3Vwcy5Qby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkNBQXFEO0FBQ3JELDBDQUE2RTtBQUM3RSxvREFBaUQ7QUFDakQsd0RBQXFEO0FBQ3JELHNEQUFvRDtBQUdwRCxJQUFJLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ3JELElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQy9DLElBQUksU0FBUyxHQUFHLElBQUksb0JBQVMsRUFBRSxDQUFDO0FBRWhDLE1BQWEsS0FBSztJQUFsQjtRQW9mSSxpQkFBWSxHQUFHLFVBQVUsR0FBRyxFQUFFLEdBQUc7WUFDN0IsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZELENBQUMsQ0FBQztJQWVOLENBQUM7SUFuZ0JHLElBQUksVUFBVSxLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUUsSUFBSSxjQUFjLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRSxJQUFJLGNBQWMsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9FLElBQUkscUJBQXFCLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsb0NBQW9DLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RixJQUFJLFlBQVksS0FBSyxPQUFPLG9C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