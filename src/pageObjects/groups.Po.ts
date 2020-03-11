import { browser, element, by, $ } from 'protractor';
import { elementClick, elementSendkeys, elementClear } from '../utils/utils';
import { WaitHelper } from '../utils/waitHelper';
import { ExpectHelper } from '../utils/expectHelper';
import { LoginPage } from '../pageObjects/login.Po';
import { CloudRoles } from './cloudRoles.Po';

let configProperties = require('../conf/properties');
let properties = require('../conf/properties');
let loginpage = new LoginPage();

export class Group {

    get groupsMenu() { return element(by.css('a[data-e2e="linkUserGroups"]')); }
    get createNewGroup() { return element(by.css('[data-e2e="createNewGroup"]')); }
    get enterGroupName() { return element(by.css('[data-e2e="inputGroupName"]')); }
    get enterGroupDescription() { return element(by.css('[data-e2e="inputGroupDescription"]')); }
    get createButton() { return element(by.css('[data-e2e="createGroupSaveBtn"]')); }
    get search() { return element(by.css('[placeholder="Search"]')); }
    get inputUserName() { return element(by.css('[data-e2e="inputUsername"]')); }
    searchGroup(name: string) { return element(by.xpath(`//h5[.='${name}']`)); }
    get usersTab() { return element(by.css('div[data-e2e="tabUsers"]')); }
    get userDropDown() { return element(by.xpath('//div[.="Select User"]')); }
    selectUser(user: any) { return element(by.xpath(`//span[.='${user}']`)); }
    get addButton() { return element(by.css('.Add')); }
    // rolesAssignments(roleCount: any) { return element(by.xpath(`//a[contains(.,"Roles Assignments (${roleCount})")]`)); }
    get rolesAssignments() { return element(by.css('div[data-e2e="tabRoleAssignments"]')); }
    get rolesDropDown() { return element(by.css('ng-select[formcontrolname="roleId"]')); }
    selectRole(role: any) { return element(by.xpath(`//span[.='${role}']`)); }
    get responsibilitiesDropDown() { return element(by.css('ng-select[formcontrolname="responsibilitiesAssigned"]')); }
    get selectAllResponsibilities() { return element(by.xpath('//ng-multiselect-dropdown[@name="responsibilitiesAssigned"]//div[.="Select All"]')); }
    selectResponsibility(responsibility: any) { return element(by.xpath(`//span[.='${responsibility}']`)); }
    get dropDownClose() { return element(by.css('.dropdown-up')); }
    get surfaceLayerNodesDropDown() { return element(by.css('ng-select[formcontrolname="surfaceLayersAppliedTo"]')); }
    selectorganization(organization: any) { return element(by.xpath(`//span[.='${organization}']`)); }
    get submitButton() { return element(by.xpath('//button[contains(text(),"Submit")]')); }
    selectRoleToDelete(role: any) { return element(by.xpath(`//li[contains(.,'${role}')]//button[@data-e2e='deleteRoleAssignment']`)); }
    get roleElement() { return element(by.xpath('div.border-top-0 > .card-body')); }
    // get deleteRoleAssignment() { return element(by.css('[data-e2e="deleteRoleAssignment"]')); }
    get deleteRoleAssignment() { return element(by.css('button[data-e2e="deleteRoleAssignment"]')); }
    get associateGroup() { return element(by.css('button[data-e2e="associateGroup"]')); } // data-e2e="addGroupsToSurface"
    selectUserToDelete(user: any) { return element(by.xpath(`//span[.='${user}']`)); }
    get confirmDeleteButton() { return element(by.css('.delete')); }
    // get deleteUser() { return element(by.css('[data-e2e="deleteUser"]')); }
    get deleteUser() { return element(by.css('button[data-e2e="deleteUser"]')); }
    get deleteButton() { return element(by.css('button[title="Delete Group"]')); }
    get toast() { return $('#toast-container'); }
    get groupList() { return element(by.xpath('//div[@class="list"]')); }
    get groupElement() { return element(by.css('.content')); }
    // get surfaceDropDown() { return element(by.css('select')); }
    get surfacesMenu() { return element(by.css('a[data-e2e="linkSurfaces"]')); }
    selectSurface(surface: string) { return element(by.xpath(`//option[contains(.,'${surface}')]`)); }
    get clearSearch() { return element(by.css('input')); }
    get saveButton() { return element(by.css('.Save')); }
    get associateGroupButton() { return element(by.xpath('[data-e2e="associateGroup"]')); }
    get associateGroupDropDown() { return element(by.xpath('//span[@class="ng-arrow-wrapper"]')); }
    get surfacelist() { return element(by.css('.card-body')); }
    get deleteGroupButton() { return element(by.css('.btn-danger')); }
    selectsurface(name: string) { return element(by.xpath(`//option[contains(.,'${name}')]`)); }
    get surfaceDropDown() { return element(by.css('[data-e2e="surfaceSwitcherDropdown"]')); }
    // get blankClick() { return element(by.css('form')); }
    get blankClick() { return element(by.css('element(by.css("tab:nth-of-type(3)>div:nth-of-type(4)>div:nth-of-type(3)"))')); }
    selectGroup(groupName: string) { return element(by.xpath(`//option[contains(.,'${groupName}')]`)); }
    get editAllowedgroupsButton() { return element(by.css('button[data-e2e="addGroupsToSurface"]')); }
    selectGroupToDeAssociate(groupId: string) { return element(by.css(`span[data-e2e='${groupId}']`)); }
    get profileDropdown() { return element(by.xpath('//button[@id="button-split"]')); }
    get logOutButton() { return element(by.xpath('//a[.="Logout"]')); }
    cloudRoleAssignmentTab(count: any) { return element(by.xpath(`//a[contains(.,'Cloud Role Assignments (${count})')]`)); }
    get cloudRoleDropDown() { return element(by.css('[formcontrolname="cloudRole"]')); }
    selectCloudRole(cloudRole: any) { return element(by.xpath(`//strong[.='${cloudRole}']`)); }
    get surfaceLayerDropDown() { return element(by.css('tab.cloud-role-assignments [formcontrolname="surfaceLayersAppliedTo"] > div > span')); }
    get selectSurfaceLayer() { return element(by.xpath('//span[@class="ng-option-label ng-star-inserted"]')); }
    get submitCloudRoleButton() { return element(by.css('tab.cloud-role-assignments .btn')); }
    // selectCloudRoleToDelete(cloudRole: any) { return element(by.xpath(`//li[contains(.,'${cloudRole}')]//button[@data-e2e='deleteCloudRoleAssignment']`)); }
    selectCloudRoleToDelete(cloudRole: any) { return element(by.xpath(`//li[contains(.,'${cloudRole}')]//button[@data-e2e='deleteCloudRoleAssignment']`)); }
    get alertWindow() { return element(by.css('div.modal-body .alert-container')); }
    get alertMessage() { return element(by.css('//div[@class="modal-body"]//div[@class="alert alert-danger alert-dismissible ng-star-inserted"]')); }

    // Group methods
    async createGroup(surfaceName: string = null, groupName: string = null, description: string = null, roleCount: any) {
        await WaitHelper.waitForElementToBeHidden(this.toast);
        // Click On Groups Menu
        await WaitHelper.waitForElementToBeDisplayed(this.groupsMenu, 2000, 'Groups Menu');
        await elementClick(this.groupsMenu);
        await browser.logger.info('Groups Menu Clicked');

        await WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Suface Drop Down');
        await browser.actions().mouseMove(this.surfaceDropDown).perform();
        await elementClick(this.surfaceDropDown);
        await browser.logger.info('Suface Drop Down Selected');

        await WaitHelper.waitForElementToBeClickable(this.selectSurface(surfaceName), 2000, 'E2E Surface');
        await elementClick(this.selectSurface(surfaceName));
        await browser.logger.info('Selected E2E Surface');

        // Click On + Symbol
        await WaitHelper.waitForElement(this.createNewGroup, 5000, 'Create New Group');
        await elementClick(this.createNewGroup);
        await browser.logger.info('Clicked + Button');

        // On the  Group dialog box, input Group Name
        await WaitHelper.waitForElement(this.enterGroupName, 10000, 'Group Name');
        await elementSendkeys(this.enterGroupName, groupName);
        await browser.logger.info('Group Name Entered');

        // On the  Group dialog box, input Group Description
        await WaitHelper.waitForElement(this.enterGroupDescription, 5000, 'Group Description ');
        await elementSendkeys(this.enterGroupDescription, description);
        await browser.logger.info('Group Description Entered');

        // Click On Create Button
        await elementClick(this.createButton);
        await browser.logger.info('Group Created');
        await browser.logger.info('GroupName IS: ', groupName);
        await browser.sleep(2000);

        // Click On Roles Assignment Tab
        await WaitHelper.waitForElementToBeClickable(this.rolesAssignments, 2000, 'Roles Assignment ');
        await elementClick(this.rolesAssignments);
        await browser.logger.info('Selected Roles Assignment');

        // Click On Associate Group
        await WaitHelper.waitForElementToBeClickable(this.associateGroup, 2000, 'Associate Group ');
        await elementClick(this.associateGroup);
        await browser.logger.info('Clicked Associate Group');
        await browser.sleep(2000);
    }

    async searchGroupName(surfaceName: string = null, groupName: string = null) {
        await WaitHelper.waitForElementToBeHidden(this.toast);

        await WaitHelper.waitForElementToBeDisplayed(this.groupsMenu, 2000, 'Groups Menu');
        // await browser.actions().mouseMove(this.groupsMenu).perform();
        await elementClick(this.groupsMenu);
        await browser.logger.info('Groups Menu Clicked');

        await WaitHelper.waitForElementToBeDisplayed(this.surfaceDropDown, 2000, 'Surface Drop Down');
        await browser.actions().mouseDown(this.surfaceDropDown).perform();
        await elementClick(this.surfaceDropDown);
        await browser.logger.info('Surface Drop Down Selected');

        await WaitHelper.waitForElementToBeClickable(this.selectSurface(surfaceName), 2000, 'E2E Topology ');
        await elementClick(this.selectSurface(surfaceName));
        await browser.logger.info('Selected E2E Topology');

        await elementClear(this.search, groupName);

        // Select Created Deployment
        await WaitHelper.waitForElementToBeDisplayed(this.groupList, 5000, 'Group List Displayed');
        await this.search.sendKeys(groupName);
        await elementClick(this.searchGroup(groupName));
        await browser.logger.info(groupName, 'Selected');
    }

    async dissociateGroup(surfaceName: string = null, groupName: string = null, groupId: any = null) {
        // Wait till the toast message is diappeared to continue the flow
        await WaitHelper.waitForElementToBeHidden(this.toast);
        await WaitHelper.waitForElementToBeDisplayed(this.surfacesMenu, 5000, 'Surfaces Menu');
        await elementClick(this.surfacesMenu);
        await browser.logger.info('Surface Page Displayed');

        await this.selectSurfaceFromDropDown(surfaceName);

        await WaitHelper.waitForElementToBeClickable(this.editAllowedgroupsButton, 5000, 'Edit Allowed Groups');
        await browser.actions().mouseMove(this.editAllowedgroupsButton).perform();
        await elementClick(this.editAllowedgroupsButton);
        await browser.logger.info('Edit Allowed Groups Button');

        await WaitHelper.waitForElementToBeDisplayed(this.selectGroupToDeAssociate(groupId), 5000, 'Group List Displayed');
        await browser.actions().mouseMove(this.selectGroupToDeAssociate(groupId)).perform();
        await elementClick(this.selectGroupToDeAssociate(groupId));
        await browser.logger.info('Group Selected');
        // Click Save
        await WaitHelper.waitForElementToBeClickable(this.saveButton, 5000, 'Save');
        await browser.actions().mouseMove(this.saveButton).perform();
        await elementClick(this.saveButton);
        await browser.logger.info('Save');
        await browser.logger.info(groupId, 'Deassociate From Surface');
    }

    async deleteGroup(surfaceName: string = null, groupName: string = null) {
        await WaitHelper.waitForElementToBeHidden(this.toast);

        await WaitHelper.waitForElementToBeDisplayed(this.groupsMenu, 2000, 'Groups Menu');
        // await elementClick(this.groupsMenu);
        await browser.get(configProperties.qaUrl + '/user-management/groups');
        await browser.logger.info('Groups Menu Clicked');

        await this.searchGroupName(surfaceName, groupName);

        await WaitHelper.waitForElementToBeDisplayed(this.deleteButton, 2000, 'Delete Button');
        await browser.actions().mouseMove(this.deleteButton).perform();
        await elementClick(this.deleteButton);
        await browser.logger.info('Clicked On Delete Button');

        await WaitHelper.waitForElementToBeDisplayed(this.confirmDeleteButton, 2000, 'Confirm Delete');
        await browser.actions().mouseMove(this.confirmDeleteButton).perform();
        await elementClick(this.confirmDeleteButton);
        await browser.logger.info('Group Deleted');
    }

    // User methods
    async assignUserForGroup(surfaceName: string = null, groupName: string = null, user: string = null, count: any) {
        //  Wait till the toast message is diappeared to continue the flow
        await WaitHelper.waitForElementToBeHidden(this.toast);

        await WaitHelper.waitForElementToBeDisplayed(this.groupsMenu, 2000, 'Groups Memu');
        await elementClick(this.groupsMenu);
        await browser.logger.info('Groups Menu Clicked');

        await this.searchGroupName(surfaceName, groupName);

        // Click Users Tab
        await WaitHelper.waitForElementToBeClickable(this.usersTab, 5000, 'Users Tab');
        await elementClick(this.usersTab);
        await browser.logger.info('Users Tab Selected');

        // Click User Drop Down
        // await WaitHelper.waitForElementToBeClickable(this.userDropDown, 2000, 'Users Drop Down ');
        // await browser.actions().mouseMove(this.userDropDown).perform();
        // await elementClick(this.userDropDown);
        // await browser.logger.info('User Drop Down Selected');

        // // Select User
        // await WaitHelper.waitForElementToBeClickable(this.selectUser(user), 2000, 'ramakrishna+e2e@concourselabs.com');
        // await browser.actions().mouseMove(this.selectUser(user)).perform();
        // await elementClick(this.selectUser(user));
        // await browser.logger.info('User Selected');

        // Click On Add
        await elementClick(this.addButton);
        await browser.logger.info(user, 'User Added To The Group');
        await browser.sleep(2000);
    }

    async removeUserForGroup(surfaceName: string = null, groupName: string = null, user: string = null) {
        //  Wait till the toast message is diappeared to continue the flowa
        await WaitHelper.waitForElementToBeHidden(this.toast);

        await WaitHelper.waitForElementToBeDisplayed(this.groupsMenu, 2000, 'Groups Memu');
        await elementClick(this.groupsMenu);
        await browser.logger.info('Groups Menu Clicked');

        await this.searchGroupName(surfaceName, groupName);

        // Click Users Tab
        await WaitHelper.waitForElementToBeClickable(this.usersTab, 5000, 'Users');
        await elementClick(this.usersTab);
        await browser.logger.info('Users Tab Selected');
        await browser.sleep(5000);

        // Delete Uer
        await this.deleteUserFromGroup(user);
        await browser.logger.info(user, 'User Deleted');
    }

    async deleteUserFromGroup(user: string = null) {
        await WaitHelper.waitForElementToBeClickable(this.selectUserToDelete(user), 5000, 'Delete User');
        await browser.actions().mouseMove(this.selectUserToDelete(user)).perform();
        await elementClick(this.selectUserToDelete(user));

        await WaitHelper.waitForElementToBeClickable(this.deleteUser, 5000, 'Delete User');
        await browser.actions().mouseMove(this.deleteUser).perform();
        await elementClick(this.deleteUser);
        await browser.logger.info('Clicked On Delete User');

        // Click Confoirm Delete
        await WaitHelper.waitForElementToBeClickable(this.confirmDeleteButton, 5000, 'Confirm Delete User');
        await browser.actions().mouseMove(this.confirmDeleteButton).perform();
        await elementClick(this.confirmDeleteButton);
        await browser.logger.info('Confirm Delete');
    }

    // RoleAssignment methods
    async addRoleToGroup(surfaceName: string = null, groupName: string = null, role: string[], responsibility: string[], organization: string[] = null) {
        //  Wait till the toast message is diappeared to continue the flow
        await WaitHelper.waitForElementToBeHidden(this.toast);
        // Click On Groups Menu
        await WaitHelper.waitForElementToBeDisplayed(this.groupsMenu, 2000, 'Groups Memu');
        await browser.actions().mouseMove(this.groupsMenu).perform();
        await elementClick(this.groupsMenu);
        await browser.logger.info('Groups Menu Clicked');

        await this.searchGroupName(surfaceName, groupName);

        // Click On Roles Assignment Tab
        await WaitHelper.waitForElementToBeClickable(this.rolesAssignments, 2000, 'Roles Assignment ');
        await elementClick(this.rolesAssignments);
        await browser.logger.info('Selected Roles Assignment');

        for (let roleName of role) {
            console.log('value', roleName);

            await WaitHelper.waitForElementToBeClickable(this.rolesDropDown, 5000, 'Roles Drop Down ');
            await elementClick(this.rolesDropDown);
            await browser.sleep(3000);
            // Select Role
            await WaitHelper.waitForElementToBeClickable(this.selectRole(roleName), 5000, 'Roles');
            await browser.actions().mouseMove(this.selectRole(roleName)).perform();
            await elementClick(this.selectRole(roleName));
            await browser.logger.info('Role Selected');
            await browser.sleep(2000);
        }

        for (let responsibilityName of responsibility) {
            console.log(responsibility[responsibilityName]);
            await WaitHelper.waitForElementToBeClickable(this.responsibilitiesDropDown, 2000, 'Responsibilities Drop Down ');
            await elementClick(this.responsibilitiesDropDown);

            // Select Role
            await WaitHelper.waitForElementToBeClickable(this.selectResponsibility(responsibilityName), 3000, 'Responsibilities ');
            await browser.sleep(1000);
            await browser.actions().mouseDown(this.selectResponsibility(responsibilityName)).perform();
            await elementClick(this.selectResponsibility(responsibilityName));
            await browser.logger.info('Responsibilities Selected');
            await browser.sleep(2000);
        }

        if (organization) {
            await this.addOrganization(organization);
            await browser.logger.info(organization, 'Selected');
            await browser.sleep(2000);
        }

        // await elementClick(this.blankClick);
        // Click On Submit Button
        await WaitHelper.waitForElementToBeClickable(this.submitButton, 2000, 'Submit ');
        await browser.actions().mouseMove(this.submitButton).perform();
        await elementClick(this.submitButton);
        await browser.logger.info('Group Updated');
        await browser.logger.info(role, 'Role Added To The Group');
        await browser.sleep(2000);
    }

    async removeRolesFromGroup(surfaceName: string = null, groupName: string = null, roles: string[]) {
        //  Wait till the toast message is diappeared to continue the flow
        await WaitHelper.waitForElementToBeHidden(this.toast);
        // Click On Groups Menu

        await WaitHelper.waitForElementToBeDisplayed(this.groupsMenu, 2000, 'Groups Memu');
        await elementClick(this.groupsMenu);
        await browser.logger.info('Groups Menu Clicked');

        await this.searchGroupName(surfaceName, groupName);

        // Click On Roles Assignment Tab
        await WaitHelper.waitForElementToBeClickable(this.rolesAssignments, 2000, 'Roles Assignment ');
        await elementClick(this.rolesAssignments);
        await browser.logger.info('Selected Roles Assignment');

        // Select Role To Delete
        for (let roleName of roles) {
            console.log('value', roleName);
            await WaitHelper.waitForElementToBeClickable(this.selectRoleToDelete(roleName), 2000, 'Role Selected ');
            await browser.actions().mouseMove(this.selectRoleToDelete(roleName)).perform();
            await elementClick(this.selectRoleToDelete(roleName));
            await browser.logger.info('Selected Roles Assignment');
        }

        // Click On Roles Assignment Tab
        await WaitHelper.waitForElementToBeClickable(this.confirmDeleteButton, 2000, 'Confirm Delete Roles Assignment ');
        await browser.actions().mouseDown(this.confirmDeleteButton).perform();
        await elementClick(this.confirmDeleteButton);
        await browser.logger.info(roles, 'Role Assignment Deleted');
        await browser.sleep(2000);
    }

    async assignCloudRoleForGroup(surfaceName: string = null, groupName: string = null, count: any = null, cloudRoles: string[]) {

        await WaitHelper.waitForElementToBeHidden(this.toast);
        // Click On Groups Menu
        await WaitHelper.waitForElementToBeDisplayed(this.groupsMenu, 2000, 'Groups Memu');
        await elementClick(this.groupsMenu);
        await browser.logger.info('Groups Menu Clicked');

        await this.searchGroupName(surfaceName, groupName);

        // Click On Cloud Roles Assignment Tab
        await WaitHelper.waitForElementToBeClickable(this.cloudRoleAssignmentTab(count), 2000, 'Cloud Roles Assignment ');
        await elementClick(this.cloudRoleAssignmentTab(count));
        await browser.logger.info('Selected Cloud Roles Assignment');

        for (let cloudRoleName of cloudRoles) {
            console.log('value', cloudRoleName);

            await WaitHelper.waitForElementToBeClickable(this.cloudRoleDropDown, 2000, 'Cloud Roles Drop Down ');
            await elementClick(this.cloudRoleDropDown);
            await browser.sleep(2000);
            // Select Cloud Role
            await WaitHelper.waitForElementToBeClickable(this.selectCloudRole(cloudRoleName), 3000, 'Cloud Roles');
            await browser.actions().mouseMove(this.selectCloudRole(cloudRoleName)).perform();
            await elementClick(this.selectCloudRole(cloudRoleName));
            await browser.logger.info('Cloud Role Selected');
        }

        await WaitHelper.waitForElementToBeClickable(this.surfaceLayerDropDown, 2000, 'Surface Layer Drop Down');
        await elementClick(this.surfaceLayerDropDown);
        await browser.logger.info(cloudRoles, 'Surface Layer Drop Down');

        await WaitHelper.waitForElementToBeClickable(this.selectSurfaceLayer, 2000, 'Surface Layer');
        await elementClick(this.selectSurfaceLayer);
        await browser.logger.info('Surface Layer Added');

        await WaitHelper.waitForElementToBeClickable(this.submitCloudRoleButton, 2000, 'Submit ');
        await elementClick(this.submitCloudRoleButton);
        await browser.logger.info('Group Updated');
        await browser.logger.info(cloudRoles, 'Role Added To The Group');
    }

    async removeCloudRolesFromGroup(surfaceName: string = null, groupName: string = null, count: any = null, cloudRoles: string[]) {
        //  Wait till the toast message is diappeared to continue the flow
        await WaitHelper.waitForElementToBeHidden(this.toast);
        // Click On Groups Menu
        await WaitHelper.waitForElementToBeDisplayed(this.groupsMenu, 2000, 'Groups Memu');
        await elementClick(this.groupsMenu);
        await browser.logger.info('Groups Menu Clicked');

        await this.searchGroupName(surfaceName, groupName);

        // Click On Roles Assignment Tab
        await WaitHelper.waitForElementToBeClickable(this.cloudRoleAssignmentTab(count), 2000, 'Cloud Roles Assignment ');
        await elementClick(this.cloudRoleAssignmentTab(count));
        await browser.logger.info('Selected Cloud Roles Assignment');

        // Select Role To Delete
        for (let cloudRoleName of cloudRoles) {
            console.log('value', cloudRoleName);
            await WaitHelper.waitForElementToBeClickable(this.selectCloudRoleToDelete(cloudRoleName), 5000, 'Cloud Role Selected ');
            await browser.actions().mouseMove(this.selectCloudRoleToDelete(cloudRoleName)).perform();
            await browser.sleep(2000);
            await elementClick(this.selectCloudRoleToDelete(cloudRoleName));
            await browser.logger.info('Selected Cloud Roles Assignment');
            await browser.sleep(2000);
        }

        // Click On Roles Assignment Tab
        await WaitHelper.waitForElementToBeClickable(this.confirmDeleteButton, 2000, 'Confirm Delete Cloud Roles Assignment ');
        await browser.actions().mouseDown(this.confirmDeleteButton).perform();
        await browser.sleep(2000);
        await elementClick(this.confirmDeleteButton);
        await browser.logger.info(cloudRoles, 'Cloud Role Assignment Deleted');
        await browser.sleep(3000);
    }

    async verifyRolesInUI(surfaceName: string = null, groupName: string = null, roles: string[]) {
        await WaitHelper.waitForElementToBeHidden(this.toast);
        // Click On Groups Menu
        await WaitHelper.waitForElementToBeDisplayed(this.groupsMenu, 2000, 'Groups Memu');
        await elementClick(this.groupsMenu);
        await browser.logger.info('Groups Menu Clicked');

        await this.searchGroupName(surfaceName, groupName);

        // Click On Roles Assignment Tab
        await WaitHelper.waitForElementToBeClickable(this.rolesAssignments, 2000, 'Roles Assignment ');
        await elementClick(this.rolesAssignments);
        await browser.logger.info('Selected Roles Assignment');

        for (let roleName of roles) {
            console.log('value', roleName);
            ExpectHelper.expectDoesNotExists(this.selectRoleToDelete(roleName));
            await browser.logger.info(roleName, 'Role Assignment Removed');
        }
    }

    // Generic Method
    async addOrganization(organization: string[] = null) {
        for (let OrganizationName of organization) {
            console.log(organization[OrganizationName]);
            await WaitHelper.waitForElementToBeClickable(this.surfaceLayerNodesDropDown, 2000, 'Organization Drop Down ');
            await elementClick(this.surfaceLayerNodesDropDown);

            // Select Role
            await WaitHelper.waitForElementToBeClickable(this.selectorganization(OrganizationName), 3000, 'Organization ');
            // await browser.sleep(2000);
            await browser.actions().mouseDown(this.selectorganization(OrganizationName)).perform();
            await elementClick(this.selectorganization(OrganizationName));
            await browser.logger.info('organization Selected');
        }
    }

    async logOut(user: string = null) {
        await WaitHelper.waitForElementToBeClickable(this.profileDropdown, 3000, 'Drop Down ');
        await elementClick(this.profileDropdown);
        await browser.logger.info('Drop Down Selected');

        await WaitHelper.waitForElementToBeClickable(this.logOutButton, 3000, 'Log Out');
        await elementClick(this.logOutButton);
        await browser.logger.info('User Logged Out');
    }

    async reLogin(user: any, user1: any, pass: any) {
        await WaitHelper.waitForElementToBeHidden(this.toast);
        await this.logOut(user);
        await elementClear(this.inputUserName, user);
        await browser.sleep(2000);
        await loginpage.login(user1, pass);
        await WaitHelper.waitForElementToBeHidden(this.toast);
    }

    async selectSurfaceFromDropDown(surfaceName: string = null) {
        await WaitHelper.waitForElementToBePresent(this.surfaceDropDown, 5000, 'Surface Drop Down ');
        await elementClick(this.surfaceDropDown);
        await browser.logger.info(surfaceName, 'Surface Drop Down Clicked');

        await WaitHelper.waitForElementToBePresent(this.selectSurface(surfaceName), 5000, 'Surface');
        await elementClick(this.selectSurface(surfaceName));
        await browser.logger.info('Surface Selcted');
        await browser.sleep(2000);
    }

    getRandomNum = function (min, max) {
        return parseInt(Math.random() * (max - min) + min);
    };

    async getId() {
        return browser.getCurrentUrl().then(function (url) {
            console.log(url);
            let str = 'currentUrl';
            let entityId = [];
            entityId = url.split('/');
            return entityId[5];
        });
    }

    async getPageTitle() {
        return browser.getTitle();
    }
}