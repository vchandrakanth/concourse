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
    get alertMessage() { return protractor_1.element(protractor_1.by.xpath('//div[@class="modal-body"]//div[@class="alert alert-danger alert-dismissible ng-star-inserted"]')); }
    // Group methods
    createGroup(surfaceName = null, groupName = null, description = null, roleCount) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            // Click On Groups Menu
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.groupsMenu, 2000, 'Groups Menu');
            utils_1.elementClick(this.groupsMenu);
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
            // await browser.sleep(2000);
            // Click On Roles Assignment Tab
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.rolesAssignments, 2000, 'Roles Assignment ');
            yield utils_1.elementClick(this.rolesAssignments);
            yield protractor_1.browser.logger.info('Selected Roles Assignment');
            // Click On Associate Group
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.associateGroup, 2000, 'Associate Group ');
            yield utils_1.elementClick(this.associateGroup);
            yield protractor_1.browser.logger.info('Clicked Associate Group');
            // await browser.sleep(2000);
        });
    }
    searchGroupName(surfaceName = null, groupName = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.groupsMenu, 2000, 'Groups Menu');
            yield protractor_1.browser.actions().mouseMove(this.groupsMenu).perform();
            utils_1.elementClick(this.groupsMenu);
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
            // await browser.actions().mouseMove(this.groupsMenu).perform();
            utils_1.elementClick(this.groupsMenu);
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
            utils_1.elementClick(this.groupsMenu);
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
            // await browser.sleep(2000);
        });
    }
    removeUserForGroup(surfaceName = null, groupName = null, user = null) {
        return __awaiter(this, void 0, void 0, function* () {
            //  Wait till the toast message is diappeared to continue the flowa
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.groupsMenu, 2000, 'Groups Memu');
            yield protractor_1.browser.actions().mouseMove(this.groupsMenu).perform();
            utils_1.elementClick(this.groupsMenu);
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
            utils_1.elementClick(this.groupsMenu);
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
                // await browser.sleep(2000);
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
                // await browser.sleep(2000);
            }
            if (organization) {
                yield this.addOrganization(organization);
                yield protractor_1.browser.logger.info(organization, 'Selected');
                // await browser.sleep(2000);
            }
            // await elementClick(this.blankClick);
            // Click On Submit Button
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.submitButton, 2000, 'Submit ');
            yield protractor_1.browser.actions().mouseMove(this.submitButton).perform();
            yield utils_1.elementClick(this.submitButton);
            yield protractor_1.browser.logger.info('Group Updated');
            yield protractor_1.browser.logger.info(role, 'Role Added To The Group');
            // await browser.sleep(2000);
        });
    }
    removeRolesFromGroup(surfaceName = null, groupName = null, roles) {
        return __awaiter(this, void 0, void 0, function* () {
            //  Wait till the toast message is diappeared to continue the flow
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            // Click On Groups Menu
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.groupsMenu, 2000, 'Groups Memu');
            yield protractor_1.browser.actions().mouseMove(this.groupsMenu).perform();
            utils_1.elementClick(this.groupsMenu);
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
            utils_1.elementClick(this.groupsMenu);
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
            utils_1.elementClick(this.groupsMenu);
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
                // await browser.sleep(2000);
                yield utils_1.elementClick(this.selectCloudRoleToDelete(cloudRoleName));
                yield protractor_1.browser.logger.info('Selected Cloud Roles Assignment');
                // await browser.sleep(2000);
            }
            // Click On Roles Assignment Tab
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.confirmDeleteButton, 2000, 'Confirm Delete Cloud Roles Assignment ');
            yield protractor_1.browser.actions().mouseDown(this.confirmDeleteButton).perform();
            // await browser.sleep(2000);
            yield utils_1.elementClick(this.confirmDeleteButton);
            yield protractor_1.browser.logger.info(cloudRoles, 'Cloud Role Assignment Deleted');
            // await browser.sleep(3000);
        });
    }
    verifyRolesInUI(surfaceName = null, groupName = null, roles) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitHelper_1.WaitHelper.waitForElementToBeHidden(this.toast);
            // Click On Groups Menu
            yield waitHelper_1.WaitHelper.waitForElementToBeDisplayed(this.groupsMenu, 2000, 'Groups Memu');
            yield protractor_1.browser.actions().mouseMove(this.groupsMenu).perform();
            utils_1.elementClick(this.groupsMenu);
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
            // await browser.sleep(2000);
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
            // await browser.sleep(2000);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXBzLlBvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BhZ2VPYmplY3RzL2dyb3Vwcy5Qby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDJDQUFxRDtBQUNyRCwwQ0FBNkU7QUFDN0Usb0RBQWlEO0FBQ2pELHdEQUFxRDtBQUNyRCxzREFBb0Q7QUFHcEQsSUFBSSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUNyRCxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUMvQyxJQUFJLFNBQVMsR0FBRyxJQUFJLG9CQUFTLEVBQUUsQ0FBQztBQUVoQyxNQUFhLEtBQUs7SUFBbEI7UUFzZkksaUJBQVksR0FBRyxVQUFVLEdBQUcsRUFBRSxHQUFHO1lBQzdCLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUM7SUFlTixDQUFDO0lBcmdCRyxJQUFJLFVBQVUsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVFLElBQUksY0FBYyxLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0UsSUFBSSxjQUFjLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRSxJQUFJLHFCQUFxQixLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0YsSUFBSSxZQUFZLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRixJQUFJLE1BQU0sS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLElBQUksYUFBYSxLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0UsV0FBVyxDQUFDLElBQVksSUFBSSxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUUsSUFBSSxRQUFRLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RSxJQUFJLFlBQVksS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFFLFVBQVUsQ0FBQyxJQUFTLElBQUksT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFFLElBQUksU0FBUyxLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25ELHdIQUF3SDtJQUN4SCxJQUFJLGdCQUFnQixLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEYsSUFBSSxhQUFhLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMscUNBQXFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RixVQUFVLENBQUMsSUFBUyxJQUFJLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRSxJQUFJLHdCQUF3QixLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLHVEQUF1RCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkgsSUFBSSx5QkFBeUIsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEtBQUssQ0FBQyxrRkFBa0YsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pKLG9CQUFvQixDQUFDLGNBQW1CLElBQUksT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxjQUFjLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hHLElBQUksYUFBYSxLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9ELElBQUkseUJBQXlCLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMscURBQXFELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsSCxrQkFBa0IsQ0FBQyxZQUFpQixJQUFJLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRyxJQUFJLFlBQVksS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZGLGtCQUFrQixDQUFDLElBQVMsSUFBSSxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsSUFBSSwrQ0FBK0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BJLElBQUksV0FBVyxLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEYsOEZBQThGO0lBQzlGLElBQUksb0JBQW9CLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMseUNBQXlDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRyxJQUFJLGNBQWMsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0NBQWdDO0lBQ3RILGtCQUFrQixDQUFDLElBQVMsSUFBSSxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEYsSUFBSSxtQkFBbUIsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRSwwRUFBMEU7SUFDMUUsSUFBSSxVQUFVLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RSxJQUFJLFlBQVksS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlFLElBQUksS0FBSyxLQUFLLE9BQU8sY0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdDLElBQUksU0FBUyxLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckUsSUFBSSxZQUFZLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUQsOERBQThEO0lBQzlELElBQUksWUFBWSxLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUUsYUFBYSxDQUFDLE9BQWUsSUFBSSxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRyxJQUFJLFdBQVcsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RCxJQUFJLFVBQVUsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRCxJQUFJLG9CQUFvQixLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkYsSUFBSSxzQkFBc0IsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9GLElBQUksV0FBVyxLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNELElBQUksaUJBQWlCLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEUsYUFBYSxDQUFDLElBQVksSUFBSSxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RixJQUFJLGVBQWUsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pGLHVEQUF1RDtJQUN2RCxJQUFJLFVBQVUsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyw2RUFBNkUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNILFdBQVcsQ0FBQyxTQUFpQixJQUFJLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsS0FBSyxDQUFDLHdCQUF3QixTQUFTLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BHLElBQUksdUJBQXVCLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsdUNBQXVDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRyx3QkFBd0IsQ0FBQyxPQUFlLElBQUksT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEcsSUFBSSxlQUFlLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRixJQUFJLFlBQVksS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25FLHNCQUFzQixDQUFDLEtBQVUsSUFBSSxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEtBQUssQ0FBQywyQ0FBMkMsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4SCxJQUFJLGlCQUFpQixLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEYsZUFBZSxDQUFDLFNBQWMsSUFBSSxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLFNBQVMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0YsSUFBSSxvQkFBb0IsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyxvRkFBb0YsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVJLElBQUksa0JBQWtCLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzRyxJQUFJLHFCQUFxQixLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUYsMkpBQTJKO0lBQzNKLHVCQUF1QixDQUFDLFNBQWMsSUFBSSxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsU0FBUyxvREFBb0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hKLElBQUksV0FBVyxLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEYsSUFBSSxZQUFZLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxLQUFLLENBQUMsaUdBQWlHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVuSixnQkFBZ0I7SUFDVixXQUFXLENBQUMsY0FBc0IsSUFBSSxFQUFFLFlBQW9CLElBQUksRUFBRSxjQUFzQixJQUFJLEVBQUUsU0FBYzs7WUFDOUcsTUFBTSx1QkFBVSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0RCx1QkFBdUI7WUFDdkIsTUFBTSx1QkFBVSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ25GLG9CQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFFakQsTUFBTSx1QkFBVSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixDQUFDLENBQUM7WUFDN0YsTUFBTSxvQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbEUsTUFBTSxvQkFBWSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN6QyxNQUFNLG9CQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBRXZELE1BQU0sdUJBQVUsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQztZQUNuRyxNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFFbEQsb0JBQW9CO1lBQ3BCLE1BQU0sdUJBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztZQUMvRSxNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFFOUMsNkNBQTZDO1lBQzdDLE1BQU0sdUJBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDMUUsTUFBTSx1QkFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDdEQsTUFBTSxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUVoRCxvREFBb0Q7WUFDcEQsTUFBTSx1QkFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixDQUFDLENBQUM7WUFDeEYsTUFBTSx1QkFBZSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUMvRCxNQUFNLG9CQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBRXZELHlCQUF5QjtZQUN6QixNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZELDZCQUE2QjtZQUU3QixnQ0FBZ0M7WUFDaEMsTUFBTSx1QkFBVSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztZQUMvRixNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDMUMsTUFBTSxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUV2RCwyQkFBMkI7WUFDM0IsTUFBTSx1QkFBVSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixDQUFDLENBQUM7WUFDNUYsTUFBTSxvQkFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUN4QyxNQUFNLG9CQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1lBQ3JELDZCQUE2QjtRQUNqQyxDQUFDO0tBQUE7SUFFSyxlQUFlLENBQUMsY0FBc0IsSUFBSSxFQUFFLFlBQW9CLElBQUk7O1lBQ3RFLE1BQU0sdUJBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFdEQsTUFBTSx1QkFBVSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ25GLE1BQU0sb0JBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzdELG9CQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFFakQsTUFBTSx1QkFBVSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixDQUFDLENBQUM7WUFDOUYsTUFBTSxvQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbEUsTUFBTSxvQkFBWSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN6QyxNQUFNLG9CQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1lBRXhELE1BQU0sdUJBQVUsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQztZQUNyRyxNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFFbkQsTUFBTSxvQkFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFFM0MsNEJBQTRCO1lBQzVCLE1BQU0sdUJBQVUsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1lBQzNGLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdEMsTUFBTSxvQkFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNoRCxNQUFNLG9CQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDckQsQ0FBQztLQUFBO0lBRUssZUFBZSxDQUFDLGNBQXNCLElBQUksRUFBRSxZQUFvQixJQUFJLEVBQUUsVUFBZSxJQUFJOztZQUMzRixpRUFBaUU7WUFDakUsTUFBTSx1QkFBVSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0RCxNQUFNLHVCQUFVLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUM7WUFDdkYsTUFBTSxvQkFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN0QyxNQUFNLG9CQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBRXBELE1BQU0sSUFBSSxDQUFDLHlCQUF5QixDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRWxELE1BQU0sdUJBQVUsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxFQUFFLHFCQUFxQixDQUFDLENBQUM7WUFDeEcsTUFBTSxvQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMxRSxNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDakQsTUFBTSxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQztZQUV4RCxNQUFNLHVCQUFVLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1lBQ25ILE1BQU0sb0JBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDcEYsTUFBTSxvQkFBWSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzNELE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDNUMsYUFBYTtZQUNiLE1BQU0sdUJBQVUsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztZQUM1RSxNQUFNLG9CQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM3RCxNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3BDLE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xDLE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO1FBQ25FLENBQUM7S0FBQTtJQUVLLFdBQVcsQ0FBQyxjQUFzQixJQUFJLEVBQUUsWUFBb0IsSUFBSTs7WUFDbEUsTUFBTSx1QkFBVSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUV0RCxNQUFNLHVCQUFVLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDbkYsZ0VBQWdFO1lBQ2hFLG9CQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFFakQsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUVuRCxNQUFNLHVCQUFVLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUM7WUFDdkYsTUFBTSxvQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDL0QsTUFBTSxvQkFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN0QyxNQUFNLG9CQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBRXRELE1BQU0sdUJBQVUsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixDQUFDLENBQUM7WUFDL0YsTUFBTSxvQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN0RSxNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDN0MsTUFBTSxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDL0MsQ0FBQztLQUFBO0lBRUQsZUFBZTtJQUNULGtCQUFrQixDQUFDLGNBQXNCLElBQUksRUFBRSxZQUFvQixJQUFJLEVBQUUsT0FBZSxJQUFJLEVBQUUsS0FBVTs7WUFDMUcsa0VBQWtFO1lBQ2xFLE1BQU0sdUJBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFdEQsTUFBTSx1QkFBVSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ25GLG9CQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFFakQsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUVuRCxrQkFBa0I7WUFDbEIsTUFBTSx1QkFBVSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQy9FLE1BQU0sb0JBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEMsTUFBTSxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUVoRCx1QkFBdUI7WUFDdkIsTUFBTSx1QkFBVSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixDQUFDLENBQUM7WUFDMUYsTUFBTSxvQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDL0QsTUFBTSxvQkFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN0QyxNQUFNLG9CQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1lBRXJELGNBQWM7WUFDZCxNQUFNLHVCQUFVLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsbUNBQW1DLENBQUMsQ0FBQztZQUMvRyxNQUFNLG9CQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNuRSxNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFDLE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzNDLGVBQWU7WUFDZixNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO1lBQzNELDZCQUE2QjtRQUNqQyxDQUFDO0tBQUE7SUFFSyxrQkFBa0IsQ0FBQyxjQUFzQixJQUFJLEVBQUUsWUFBb0IsSUFBSSxFQUFFLE9BQWUsSUFBSTs7WUFDOUYsbUVBQW1FO1lBQ25FLE1BQU0sdUJBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFdEQsTUFBTSx1QkFBVSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ25GLE1BQU0sb0JBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzdELG9CQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFFakQsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUVuRCxrQkFBa0I7WUFDbEIsTUFBTSx1QkFBVSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzNFLE1BQU0sb0JBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEMsTUFBTSxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUNoRCxNQUFNLG9CQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTFCLGFBQWE7WUFDYixNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQyxNQUFNLG9CQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDcEQsQ0FBQztLQUFBO0lBRUssbUJBQW1CLENBQUMsT0FBZSxJQUFJOztZQUN6QyxNQUFNLHVCQUFVLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQztZQUNqRyxNQUFNLG9CQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzNFLE1BQU0sb0JBQVksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUVsRCxNQUFNLHVCQUFVLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDbkYsTUFBTSxvQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDN0QsTUFBTSxvQkFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNwQyxNQUFNLG9CQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBRXBELHdCQUF3QjtZQUN4QixNQUFNLHVCQUFVLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLElBQUksRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3BHLE1BQU0sb0JBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdEUsTUFBTSxvQkFBWSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQzdDLE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDaEQsQ0FBQztLQUFBO0lBRUQseUJBQXlCO0lBQ25CLGNBQWMsQ0FBQyxjQUFzQixJQUFJLEVBQUUsWUFBb0IsSUFBSSxFQUFFLElBQWMsRUFBRSxjQUF3QixFQUFFLGVBQXlCLElBQUk7O1lBQzlJLGtFQUFrRTtZQUNsRSxNQUFNLHVCQUFVLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RELHVCQUF1QjtZQUN2QixNQUFNLHVCQUFVLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDbkYsTUFBTSxvQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDN0Qsb0JBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDOUIsTUFBTSxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUVqRCxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBRW5ELGdDQUFnQztZQUNoQyxNQUFNLHVCQUFVLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1lBQy9GLE1BQU0sb0JBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUMxQyxNQUFNLG9CQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBRXZELEtBQUssSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFO2dCQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFFL0IsTUFBTSx1QkFBVSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixDQUFDLENBQUM7Z0JBQzNGLE1BQU0sb0JBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ3ZDLE1BQU0sb0JBQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzFCLGNBQWM7Z0JBQ2QsTUFBTSx1QkFBVSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUN2RixNQUFNLG9CQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDdkUsTUFBTSxvQkFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDOUMsTUFBTSxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQzNDLDZCQUE2QjthQUNoQztZQUVELEtBQUssSUFBSSxrQkFBa0IsSUFBSSxjQUFjLEVBQUU7Z0JBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztnQkFDaEQsTUFBTSx1QkFBVSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLEVBQUUsNkJBQTZCLENBQUMsQ0FBQztnQkFDakgsTUFBTSxvQkFBWSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2dCQUVsRCxjQUFjO2dCQUNkLE1BQU0sdUJBQVUsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztnQkFDdkgsTUFBTSxvQkFBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUIsTUFBTSxvQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUMzRixNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztnQkFDbEUsTUFBTSxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQztnQkFDdkQsNkJBQTZCO2FBQ2hDO1lBRUQsSUFBSSxZQUFZLEVBQUU7Z0JBQ2QsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN6QyxNQUFNLG9CQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ3BELDZCQUE2QjthQUNoQztZQUVELHVDQUF1QztZQUN2Qyx5QkFBeUI7WUFDekIsTUFBTSx1QkFBVSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ2pGLE1BQU0sb0JBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQy9ELE1BQU0sb0JBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdEMsTUFBTSxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDM0MsTUFBTSxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLHlCQUF5QixDQUFDLENBQUM7WUFDM0QsNkJBQTZCO1FBQ2pDLENBQUM7S0FBQTtJQUVLLG9CQUFvQixDQUFDLGNBQXNCLElBQUksRUFBRSxZQUFvQixJQUFJLEVBQUUsS0FBZTs7WUFDNUYsa0VBQWtFO1lBQ2xFLE1BQU0sdUJBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEQsdUJBQXVCO1lBRXZCLE1BQU0sdUJBQVUsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQztZQUNuRixNQUFNLG9CQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM3RCxvQkFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM5QixNQUFNLG9CQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBRWpELE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFFbkQsZ0NBQWdDO1lBQ2hDLE1BQU0sdUJBQVUsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixDQUFDLENBQUM7WUFDL0YsTUFBTSxvQkFBWSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzFDLE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFFdkQsd0JBQXdCO1lBQ3hCLEtBQUssSUFBSSxRQUFRLElBQUksS0FBSyxFQUFFO2dCQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDL0IsTUFBTSx1QkFBVSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztnQkFDeEcsTUFBTSxvQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDL0UsTUFBTSxvQkFBWSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUN0RCxNQUFNLG9CQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO2FBQzFEO1lBRUQsZ0NBQWdDO1lBQ2hDLE1BQU0sdUJBQVUsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLGtDQUFrQyxDQUFDLENBQUM7WUFDakgsTUFBTSxvQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN0RSxNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDN0MsTUFBTSxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLHlCQUF5QixDQUFDLENBQUM7WUFDNUQsTUFBTSxvQkFBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixDQUFDO0tBQUE7SUFFSyx1QkFBdUIsQ0FBQyxjQUFzQixJQUFJLEVBQUUsWUFBb0IsSUFBSSxFQUFFLFFBQWEsSUFBSSxFQUFFLFVBQW9COztZQUV2SCxNQUFNLHVCQUFVLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RELHVCQUF1QjtZQUN2QixNQUFNLHVCQUFVLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDbkYsb0JBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDOUIsTUFBTSxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUVqRCxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBRW5ELHNDQUFzQztZQUN0QyxNQUFNLHVCQUFVLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO1lBQ2xILE1BQU0sb0JBQVksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN2RCxNQUFNLG9CQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1lBRTdELEtBQUssSUFBSSxhQUFhLElBQUksVUFBVSxFQUFFO2dCQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQztnQkFFcEMsTUFBTSx1QkFBVSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztnQkFDckcsTUFBTSxvQkFBWSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLG9CQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMxQixvQkFBb0I7Z0JBQ3BCLE1BQU0sdUJBQVUsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQztnQkFDdkcsTUFBTSxvQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ2pGLE1BQU0sb0JBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hELE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7YUFDcEQ7WUFFRCxNQUFNLHVCQUFVLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO1lBQ3pHLE1BQU0sb0JBQVksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUM5QyxNQUFNLG9CQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUseUJBQXlCLENBQUMsQ0FBQztZQUVqRSxNQUFNLHVCQUFVLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQztZQUM3RixNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDNUMsTUFBTSxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUVqRCxNQUFNLHVCQUFVLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztZQUMxRixNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDL0MsTUFBTSxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDM0MsTUFBTSxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLHlCQUF5QixDQUFDLENBQUM7UUFDckUsQ0FBQztLQUFBO0lBRUsseUJBQXlCLENBQUMsY0FBc0IsSUFBSSxFQUFFLFlBQW9CLElBQUksRUFBRSxRQUFhLElBQUksRUFBRSxVQUFvQjs7WUFDekgsa0VBQWtFO1lBQ2xFLE1BQU0sdUJBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEQsdUJBQXVCO1lBQ3ZCLE1BQU0sdUJBQVUsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQztZQUNuRixvQkFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM5QixNQUFNLG9CQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBRWpELE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFFbkQsZ0NBQWdDO1lBQ2hDLE1BQU0sdUJBQVUsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLHlCQUF5QixDQUFDLENBQUM7WUFDbEgsTUFBTSxvQkFBWSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLENBQUM7WUFFN0Qsd0JBQXdCO1lBQ3hCLEtBQUssSUFBSSxhQUFhLElBQUksVUFBVSxFQUFFO2dCQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQztnQkFDcEMsTUFBTSx1QkFBVSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztnQkFDeEgsTUFBTSxvQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDekYsNkJBQTZCO2dCQUM3QixNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hFLE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLENBQUM7Z0JBQzdELDZCQUE2QjthQUNoQztZQUVELGdDQUFnQztZQUNoQyxNQUFNLHVCQUFVLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLElBQUksRUFBRSx3Q0FBd0MsQ0FBQyxDQUFDO1lBQ3ZILE1BQU0sb0JBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdEUsNkJBQTZCO1lBQzdCLE1BQU0sb0JBQVksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUM3QyxNQUFNLG9CQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsK0JBQStCLENBQUMsQ0FBQztZQUN2RSw2QkFBNkI7UUFDakMsQ0FBQztLQUFBO0lBRUssZUFBZSxDQUFDLGNBQXNCLElBQUksRUFBRSxZQUFvQixJQUFJLEVBQUUsS0FBZTs7WUFDdkYsTUFBTSx1QkFBVSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0RCx1QkFBdUI7WUFDdkIsTUFBTSx1QkFBVSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ25GLE1BQU0sb0JBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzdELG9CQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFFakQsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUVuRCxnQ0FBZ0M7WUFDaEMsTUFBTSx1QkFBVSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztZQUMvRixNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDMUMsTUFBTSxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUV2RCxLQUFLLElBQUksUUFBUSxJQUFJLEtBQUssRUFBRTtnQkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQy9CLDJCQUFZLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BFLE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO2FBQ2xFO1FBQ0wsQ0FBQztLQUFBO0lBRUQsaUJBQWlCO0lBQ1gsZUFBZSxDQUFDLGVBQXlCLElBQUk7O1lBQy9DLEtBQUssSUFBSSxnQkFBZ0IsSUFBSSxZQUFZLEVBQUU7Z0JBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQkFDNUMsTUFBTSx1QkFBVSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxJQUFJLEVBQUUseUJBQXlCLENBQUMsQ0FBQztnQkFDOUcsTUFBTSxvQkFBWSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO2dCQUVuRCxjQUFjO2dCQUNkLE1BQU0sdUJBQVUsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUM7Z0JBQy9HLDZCQUE2QjtnQkFDN0IsTUFBTSxvQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN2RixNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQkFDOUQsTUFBTSxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQzthQUN0RDtRQUNMLENBQUM7S0FBQTtJQUVLLE1BQU0sQ0FBQyxPQUFlLElBQUk7O1lBQzVCLE1BQU0sdUJBQVUsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztZQUN2RixNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3pDLE1BQU0sb0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFFaEQsTUFBTSx1QkFBVSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ2pGLE1BQU0sb0JBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdEMsTUFBTSxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNqRCxDQUFDO0tBQUE7SUFFSyxPQUFPLENBQUMsSUFBUyxFQUFFLEtBQVUsRUFBRSxJQUFTOztZQUMxQyxNQUFNLHVCQUFVLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RELE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QixNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM3Qyw2QkFBNkI7WUFDN0IsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNuQyxNQUFNLHVCQUFVLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFELENBQUM7S0FBQTtJQUVLLHlCQUF5QixDQUFDLGNBQXNCLElBQUk7O1lBQ3RELE1BQU0sdUJBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1lBQzdGLE1BQU0sb0JBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDekMsTUFBTSxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLDJCQUEyQixDQUFDLENBQUM7WUFFcEUsTUFBTSx1QkFBVSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQzdGLE1BQU0sb0JBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDcEQsTUFBTSxvQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUM3Qyw2QkFBNkI7UUFDakMsQ0FBQztLQUFBO0lBTUssS0FBSzs7WUFDUCxPQUFPLG9CQUFPLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRztnQkFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakIsSUFBSSxHQUFHLEdBQUcsWUFBWSxDQUFDO2dCQUN2QixJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7Z0JBQ2xCLFFBQVEsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMxQixPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7S0FBQTtJQUVLLFlBQVk7O1lBQ2QsT0FBTyxvQkFBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlCLENBQUM7S0FBQTtDQUNKO0FBdmdCRCxzQkF1Z0JDIn0=