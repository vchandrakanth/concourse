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
    get blankClick() { return protractor_1.element(protractor_1.by.css('form')); }
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
            yield utils_1.elementClick(this.userDropDown);
            yield protractor_1.browser.logger.info('User Drop Down Selected');
            // // Select User
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
            yield protractor_1.browser.actions().mouseDown(this.selectUserToDelete(user)).perform();
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
            yield utils_1.elementClick(this.groupsMenu);
            yield protractor_1.browser.logger.info('Groups Menu Clicked');
            yield this.searchGroupName(surfaceName, groupName);
            // Click On Roles Assignment Tab
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.rolesAssignments, 2000, 'Roles Assignment ');
            yield utils_1.elementClick(this.rolesAssignments);
            yield protractor_1.browser.logger.info('Selected Roles Assignment');
            for (let roleName of role) {
                console.log('value', roleName);
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.rolesDropDown, 2000, 'Roles Drop Down ');
                yield utils_1.elementClick(this.rolesDropDown);
                // Select Role
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectRole(roleName), 3000, 'Roles');
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
                yield protractor_1.browser.sleep(2000);
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
            // Click On Submit Button
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.submitButton, 2000, 'Submit ');
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
            yield protractor_1.browser.sleep(3000);
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
                // Select Role
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
                yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.selectCloudRoleToDelete(cloudRoleName), 2000, 'Cloud Role Selected ');
                yield protractor_1.browser.actions().mouseMove(this.selectCloudRoleToDelete(cloudRoleName)).perform();
                yield utils_1.elementClick(this.selectCloudRoleToDelete(cloudRoleName));
                yield protractor_1.browser.logger.info('Selected Cloud Roles Assignment');
            }
            // Click On Roles Assignment Tab
            yield waitHelper_1.WaitHelper.waitForElementToBeClickable(this.confirmDeleteButton, 2000, 'Confirm Delete Cloud Roles Assignment ');
            yield protractor_1.browser.actions().mouseDown(this.confirmDeleteButton).perform();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXBzLlBvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3BhZ2VPYmplY3RzL2dyb3Vwcy5Qby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDJDQUFxRDtBQUNyRCwwQ0FBNkU7QUFDN0Usb0RBQWlEO0FBQ2pELHdEQUFxRDtBQUNyRCxzREFBb0Q7QUFHcEQsSUFBSSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUNyRCxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUMvQyxJQUFJLFNBQVMsR0FBRyxJQUFJLG9CQUFTLEVBQUUsQ0FBQztBQUVoQyxNQUFhLEtBQUs7SUFBbEI7UUFzZUksaUJBQVksR0FBRyxVQUFVLEdBQUcsRUFBRSxHQUFHO1lBQzdCLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUM7SUFlTixDQUFDO0lBcmZHLElBQUksVUFBVSxLQUFLLE9BQU8sb0JBQU8sQ0FBQyxlQUFFLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUUsSUFBSSxjQUFjLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRSxJQUFJLGNBQWMsS0FBSyxPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9FLElBQUkscUJBQXFCLEtBQUssT0FBTyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsb0NBQW9DLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RixJQUFJLFlBQVksS0FBSyxPQUFPLG9C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