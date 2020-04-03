"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@ngrx/effects/testing");
const jasmine_marbles_1 = require("jasmine-marbles");
const error_actions_1 = require("@concourse/core/error/state/error.actions");
const modal_1 = require("@concourse/core/modal");
const router_actions_1 = require("@concourse/core/router/router.actions");
const toast_actions_1 = require("@concourse/core/toast/toast.actions");
const group_facade_1 = require("@concourse/store/group/state/group.facade");
const fakeUsers = require("@concourse/store/user/services/user.faker");
const test_1 = require("@concourse/test");
const fakeGroups = require("../services/group.faker");
const group_service_1 = require("../services/group.service");
const role_assignment_service_1 = require("../services/role-assignment.service");
const group_actions_1 = require("./group.actions");
const group_effects_1 = require("./group.effects");
describe('GroupEffects', () => {
    let actions;
    let effects;
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [
                group_effects_1.GroupEffects,
                testing_2.provideMockActions(() => actions),
                {
                    provide: group_service_1.GroupService,
                    useValue: {
                        list: jest.fn(),
                        get: jest.fn(),
                        create: jest.fn(),
                        update: jest.fn(),
                        delete: jest.fn(),
                        addUserToGroup: jest.fn(),
                        removeUserFromGroup: jest.fn()
                    }
                },
                {
                    provide: role_assignment_service_1.RoleAssignmentService,
                    useValue: {
                        listBySurfaceLayerIds: jest.fn(),
                        create: jest.fn(),
                        remove: jest.fn()
                    }
                },
                test_1.mockFacade(group_facade_1.GroupFacade)
            ]
        });
        effects = testing_1.TestBed.get(group_effects_1.GroupEffects);
        service = testing_1.TestBed.get(group_service_1.GroupService);
    });
    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
    describe('loadGroups$', () => {
        it('should return a LoadGroupsSuccess, with an array of groups, on success', () => {
            const groups = fakeGroups.fakeMany(5);
            const action = new group_actions_1.LoadGroups();
            const outcome = new group_actions_1.LoadGroupsSuccess(groups);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: groups });
            const expected = jasmine_marbles_1.cold('--b', { b: outcome });
            service.list = jest.fn(() => response);
            expect(effects.loadGroups$).toBeObservable(expected);
        });
        it('should return a LoadGroupsFailure, with an error, on failure', () => {
            const action = new group_actions_1.LoadGroups();
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const gError = new group_actions_1.LoadGroupsFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: gError });
            service.list = jest.fn(() => response);
            expect(effects.loadGroups$).toBeObservable(expected);
        });
    });
    describe('loadGroup$', () => {
        it('should return a LoadGroupSuccess, with a single group, on success', () => {
            const group = fakeGroups.fakeOne();
            const action = new group_actions_1.LoadGroup(group.id);
            const outcome = new group_actions_1.LoadGroupSuccess(group);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: group });
            const expected = jasmine_marbles_1.cold('--b', { b: outcome });
            service.get = jest.fn(() => response);
            expect(effects.loadGroup$).toBeObservable(expected);
        });
        it('should return a LoadGroupFailure, with an error, on failure', () => {
            const action = new group_actions_1.LoadGroup(1001);
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const gError = new group_actions_1.LoadGroupFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: gError });
            service.get = jest.fn(() => response);
            expect(effects.loadGroup$).toBeObservable(expected);
        });
    });
    describe('createGroup$', () => {
        it('should return a CreateGroupSuccess, with created group, on success', () => {
            const group = fakeGroups.fakeOne();
            const action = new group_actions_1.CreateGroup({ name: group.name });
            const outcome = new group_actions_1.CreateGroupSuccess(group);
            const closeModal = new modal_1.CloseModal();
            const openSuccessToaster = new toast_actions_1.OpenToast({ message: 'Group Created Successfully', type: 'success' });
            const routerRedirect = new router_actions_1.RouterGo({ path: [`user-management/groups/${group.id}`] });
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: group });
            const expected = jasmine_marbles_1.cold('--(bcde)', { b: outcome, c: closeModal, d: openSuccessToaster, e: routerRedirect });
            service.create = jest.fn(() => response);
            expect(effects.createGroup$).toBeObservable(expected);
        });
        it('should return a CreateGroupFailure, with an error, on failure', () => {
            const action = new group_actions_1.CreateGroup({ name: 'Group Name' });
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'form',
                rawError: error
            });
            const gError = new group_actions_1.CreateGroupFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: gError });
            service.create = jest.fn(() => response);
            expect(effects.createGroup$).toBeObservable(expected);
        });
    });
    describe('updateGroup$', () => {
        it('should return a UpdateGroupSuccess, with a group, on success', () => {
            const group = fakeGroups.fakeOne();
            const action = new group_actions_1.UpdateGroup(group);
            const outcome = new group_actions_1.UpdateGroupSuccess(group);
            const closeModal = new modal_1.CloseModal();
            const toast = new toast_actions_1.OpenToast({ message: 'Group Updated Successfully', type: 'success' });
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: group });
            const expected = jasmine_marbles_1.cold('--(bcd)', { b: outcome, c: closeModal, d: toast });
            service.update = jest.fn(() => response);
            expect(effects.updateGroup$).toBeObservable(expected);
        });
        it('should return a UpdateGroupFailure, with an error, on failure', () => {
            const group = fakeGroups.fakeOne();
            const action = new group_actions_1.UpdateGroup(group);
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'form',
                rawError: error
            });
            const gError = new group_actions_1.UpdateGroupFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: gError });
            service.update = jest.fn(() => response);
            expect(effects.updateGroup$).toBeObservable(expected);
        });
    });
    describe('deleteGroup$', () => {
        it('should return a DeleteGroupSuccess, with deleted group id, on success', () => {
            const groupId = 1001;
            const action = new group_actions_1.DeleteGroup(groupId);
            const outcome = new group_actions_1.DeleteGroupSuccess(groupId);
            const openSuccessToaster = new toast_actions_1.OpenToast({ message: 'Group Deleted Successfully', type: 'success' });
            const routerRedirect = new router_actions_1.RouterGo({ path: ['user-management/groups'] });
            const closeModal = new modal_1.CloseModal();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: groupId });
            const expected = jasmine_marbles_1.cold('--(bcde)', { b: outcome, c: openSuccessToaster, d: closeModal, e: routerRedirect });
            service.delete = jest.fn(() => response);
            expect(effects.deleteGroup$).toBeObservable(expected);
        });
        it('should return a DeleteGroupFailure, with an error, on failure', () => {
            const action = new group_actions_1.DeleteGroup(1001);
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'form',
                rawError: error
            });
            const gError = new group_actions_1.DeleteGroupFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: gError });
            service.delete = jest.fn(() => response);
            expect(effects.deleteGroup$).toBeObservable(expected);
        });
    });
    describe('addUserToGroup$', () => {
        it('should return a AddUserToGroup, with updated group, on success', () => {
            const users = fakeUsers.fakeMany(3);
            const group = fakeGroups.fakeOne(1, users.map(u => ({ email: u.email, id: u.id })));
            const newUser = fakeUsers.fakeOne();
            const updatedGroup = Object.assign(Object.assign({}, group), { users: [...group.users, { email: newUser.email, id: newUser.id }] });
            const action = new group_actions_1.AddUserToGroup({ groupId: group.id, userId: newUser.id });
            const notification = new toast_actions_1.OpenToast({ message: 'User Added Successfully', type: 'success' });
            const outcome = new group_actions_1.AddUserToGroupSuccess(updatedGroup);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: updatedGroup });
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: notification });
            service.addUserToGroup = jest.fn(() => response);
            expect(effects.addUserToGroup$).toBeObservable(expected);
        });
        it('should return a AddUserToGroupFailure, with an error, on failure', () => {
            const addUserRequest = { groupId: 1001, userId: 1102 };
            const action = new group_actions_1.AddUserToGroup(addUserRequest);
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'form',
                rawError: error
            });
            const gError = new group_actions_1.AddUserToGroupFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: gError });
            service.addUserToGroup = jest.fn(() => response);
            expect(effects.addUserToGroup$).toBeObservable(expected);
        });
    });
    describe('removeUserFromGroup$', () => {
        it('should return a RemoveUserFromGroup, with updated group, on success', () => {
            const users = fakeUsers.fakeMany(3);
            const group = fakeGroups.fakeOne(1, users.map(u => ({ email: u.email, id: u.id })));
            const updatedGroup = Object.assign(Object.assign({}, group), { users: [...group.users.filter(u => u.id !== users[2].id)] });
            const action = new group_actions_1.RemoveUserFromGroup({ groupId: group.id, userId: users[2].id });
            const outcome = new group_actions_1.RemoveUserFromGroupSuccess(updatedGroup);
            const notification = new toast_actions_1.OpenToast({ message: 'User Removed Successfully', type: 'success' });
            const closeModal = new modal_1.CloseModal();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: updatedGroup });
            const expected = jasmine_marbles_1.cold('--(bcd)', { b: outcome, c: notification, d: closeModal });
            service.removeUserFromGroup = jest.fn(() => response);
            expect(effects.removeUserFromGroup$).toBeObservable(expected);
        });
        it('should return a RemoveUserFromGroupFailure, with an error, on failure', () => {
            const addUserRequest = { groupId: 1001, userId: 1102 };
            const action = new group_actions_1.RemoveUserFromGroup(addUserRequest);
            const error = new Error('An unknown error occurred');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'form',
                rawError: error
            });
            const gError = new group_actions_1.RemoveUserFromGroupFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: gError });
            service.removeUserFromGroup = jest.fn(() => response);
            expect(effects.removeUserFromGroup$).toBeObservable(expected);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAuZWZmZWN0cy5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2dyb3VwL3N0YXRlL2dyb3VwLmVmZmVjdHMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUFnRDtBQUNoRCxtREFBMkQ7QUFFM0QscURBQTRDO0FBRzVDLDZFQUFnRjtBQUNoRixpREFBbUQ7QUFDbkQsMEVBQWlFO0FBQ2pFLHVFQUFnRTtBQUNoRSw0RUFBd0U7QUFDeEUsdUVBQXVFO0FBQ3ZFLDBDQUE2QztBQUM3QyxzREFBc0Q7QUFDdEQsNkRBQXlEO0FBQ3pELGlGQUE0RTtBQUM1RSxtREFzQnlCO0FBQ3pCLG1EQUErQztBQUUvQyxRQUFRLENBQUMsY0FBYyxFQUFFLEdBQUcsRUFBRTtJQUM1QixJQUFJLE9BQXdCLENBQUM7SUFDN0IsSUFBSSxPQUFxQixDQUFDO0lBQzFCLElBQUksT0FBcUIsQ0FBQztJQUUxQixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixTQUFTLEVBQUU7Z0JBQ1QsNEJBQVk7Z0JBQ1osNEJBQWtCLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQztvQkFDRSxPQUFPLEVBQUUsNEJBQVk7b0JBQ3JCLFFBQVEsRUFBRTt3QkFDUixJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTt3QkFDZixHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTt3QkFDZCxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTt3QkFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7d0JBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO3dCQUNqQixjQUFjLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTt3QkFD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