"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/common/http/testing");
const testing_2 = require("@angular/core/testing");
const testing_3 = require("@ngrx/effects/testing");
const jasmine_marbles_1 = require("jasmine-marbles");
const error_actions_1 = require("@concourse/core/error/state/error.actions");
const modal_1 = require("@concourse/core/modal");
const router_actions_1 = require("@concourse/core/router/router.actions");
const toast_actions_1 = require("@concourse/core/toast/toast.actions");
const auth_facade_1 = require("@concourse/store/auth/state/auth.facade");
const test_1 = require("@concourse/test");
const fakeUsers = require("../services/user.faker");
const user_service_1 = require("../services/user.service");
const user_actions_1 = require("./user.actions");
const user_effects_1 = require("./user.effects");
const user_facade_1 = require("./user.facade");
describe('UserEffects', () => {
    let actions;
    let effects;
    let service;
    beforeEach(() => {
        testing_2.TestBed.configureTestingModule({
            imports: [
                testing_1.HttpClientTestingModule
            ],
            providers: [
                user_effects_1.UserEffects,
                testing_3.provideMockActions(() => actions),
                {
                    provide: user_service_1.UserService,
                    useValue: {
                        invite: jest.fn()
                    }
                },
                test_1.mockFacade(user_facade_1.UserFacade),
                test_1.mockFacade(auth_facade_1.AuthFacade)
            ]
        });
        effects = testing_2.TestBed.get(user_effects_1.UserEffects);
        service = testing_2.TestBed.get(user_service_1.UserService);
    });
    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
    describe('invite User', () => {
        it('should return an InviteUserSuccess action, with one User, on success', () => {
            const user = fakeUsers.fakeOne();
            const action = new user_actions_1.InviteUser({ name: user.name, email: user.email });
            const inviteSuccess = new user_actions_1.InviteUserSuccess(user);
            const closeModal = new modal_1.CloseModal();
            const inviteUserToast = new toast_actions_1.OpenToast({ message: 'User Invitation Email Sent', type: 'success' });
            const routerRedirect = new router_actions_1.RouterGo({ path: ['user-management/users'] });
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: user });
            const expected = jasmine_marbles_1.cold('--(bcde)', { b: inviteSuccess, c: closeModal, d: inviteUserToast, e: routerRedirect });
            service.inviteUser = jest.fn(() => response);
            expect(effects.inviteUser$).toBeObservable(expected);
        });
        it('should return an InviteUserFailure action, with an error, on failure', () => {
            const user = fakeUsers.fakeOne();
            const action = new user_actions_1.InviteUser({ name: user.name, email: user.email });
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'form',
                rawError: error
            });
            const err = new user_actions_1.InviteUserFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: err });
            service.inviteUser = jest.fn(() => response);
            expect(effects.inviteUser$).toBeObservable(expected);
        });
    });
    describe('deleteUser$', () => {
        it('should return a DeleteUserSuccess, with deleted User id, on success', () => {
            const userId = 1001;
            const action = new user_actions_1.DeleteUser(userId);
            const outcome = new user_actions_1.DeleteUserSuccess(userId);
            const openSuccessToaster = new toast_actions_1.OpenToast({ message: 'User Deleted Successfully', type: 'success' });
            const routerRedirect = new router_actions_1.RouterGo({ path: ['user-management/users'] });
            const closeModal = new modal_1.CloseModal();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: userId });
            const expected = jasmine_marbles_1.cold('--(bcde)', { b: outcome, c: openSuccessToaster, d: closeModal, e: routerRedirect });
            service.deleteUser = jest.fn(() => response);
            expect(effects.deleteUser$).toBeObservable(expected);
        });
        it('should return a DeleteUserFailure, with an error, on failure', () => {
            const action = new user_actions_1.DeleteUser(1001);
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'form',
                rawError: error
            });
            const err = new user_actions_1.DeleteUserFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: err });
            service.deleteUser = jest.fn(() => response);
            expect(effects.deleteUser$).toBeObservable(expected);
        });
    });
    describe('updatePassword$', () => {
        const userId = 1001;
        const payload = {
            userId,
            updatePasswordRequest: {
                currentPassword: 'currentPwd!1',
                newPassword: 'newPwd!1',
                newPasswordConfirm: 'newPwd!1'
            }
        };
        it('should return an UpdatePasswordSuccess on success', () => {
            const action = new user_actions_1.UpdatePassword(payload);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-|');
            const expected = jasmine_marbles_1.cold('');
            service.updatePassword = jest.fn(() => response);
            expect(effects.updatePassword$).toBeObservable(expected);
        });
        it('should return an UpdatePasswordFailure, with an error, on failure', () => {
            const action = new user_actions_1.UpdatePassword(payload);
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'form',
                rawError: error
            });
            const err = new user_actions_1.UpdatePasswordFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: err });
            service.updatePassword = jest.fn(() => response);
            expect(effects.updatePassword$).toBeObservable(expected);
        });
    });
    describe('validate Invitation', () => {
        const payload = { token: 'test', email: 'test@concoursehub.com' };
        const resp = { authType: 'BASIC' };
        it('should return an validateInvitation action, with one user, on success', () => {
            const action = new user_actions_1.ValidateInviteUserToken(payload);
            const invitationSuccess = new user_actions_1.ValidateInviteUserTokenSuccess(resp);
            const routerRedirect = new router_actions_1.RouterGo({ path: ['/user/registration'] });
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: resp });
            const expected = jasmine_marbles_1.cold('--(bc)', { b: invitationSuccess, c: routerRedirect });
            service.validateInviteUserToken = jest.fn(() => response);
            expect(effects.validateInviteUserToken$).toBeObservable(expected);
        });
        it('should return an validateInvitation action, with an error, on failure', () => {
            const action = new user_actions_1.ValidateInviteUserToken(payload);
            const error = {
                status: 401,
                message: 'error'
            };
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const routerRedirect = new router_actions_1.RouterGo({ path: ['/user/invitation-expire'] });
            const err = new user_actions_1.ValidateInviteUserTokenFailure(payload.token);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bcd)', { b: outcome, c: routerRedirect, d: err });
            service.validateInviteUserToken = jest.fn(() => response);
            expect(effects.validateInviteUserToken$).toBeObservable(expected);
        });
    });
    describe('regenerate Invitation', () => {
        const token = 'testToken';
        const user = fakeUsers.fakeOne();
        it('should return an RegenerateInvitation action, with one user, on success', () => {
            const action = new user_actions_1.RegenerateInvitation(token);
            const registerSuccess = new user_actions_1.RegenerateInvitationSuccess();
            const toast = new toast_actions_1.OpenToast({ message: 'Invitation resent successfully', type: 'success' });
            const routerRedirect = new router_actions_1.RouterGo({ path: ['/'] });
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: user });
            const expected = jasmine_marbles_1.cold('--(bcd)', { b: registerSuccess, c: toast, d: routerRedirect });
            service.regenerateInvitation = jest.fn(() => response);
            expect(effects.regenerateInvitation$).toBeObservable(expected);
        });
        it('should return an RegenerateInvitation action, with an error, on failure', () => {
            const action = new user_actions_1.RegenerateInvitation(token);
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const err = new user_actions_1.RegenerateInvitationFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: err });
            service.regenerateInvitation = jest.fn(() => response);
            expect(effects.regenerateInvitation$).toBeObservable(expected);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5lZmZlY3RzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvdXNlci9zdGF0ZS91c2VyLmVmZmVjdHMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBEQUF1RTtBQUN2RSxtREFBZ0Q7QUFDaEQsbURBQTJEO0FBRTNELHFEQUE0QztBQUc1Qyw2RUFBZ0Y7QUFDaEYsaURBQW1EO0FBQ25ELDBFQUFpRTtBQUNqRSx1RUFBZ0U7QUFDaEUseUVBQXFFO0FBQ3JFLDBDQUE2QztBQUM3QyxvREFBb0Q7QUFDcEQsMkRBQXVEO0FBQ3ZELGlEQWV3QjtBQUN4QixpREFBNkM7QUFDN0MsK0NBQTJDO0FBRTNDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFO0lBQzNCLElBQUksT0FBd0IsQ0FBQztJQUM3QixJQUFJLE9BQW9CLENBQUM7SUFDekIsSUFBSSxPQUFvQixDQUFDO0lBRXpCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRTtnQkFDUCxpQ0FBdUI7YUFDeEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsMEJBQVc7Z0JBQ1gsNEJBQWtCLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQztvQkFDRSxPQUFPLEVBQUUsMEJBQVc7b0JBQ3BCLFFBQVEsRUFBRTt3QkFDUixNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtxQkFDbEI7aUJBQ0Y7Z0JBQ0QsaUJBQVUsQ0FBQyx3QkFBVSxDQUFDO2dCQUN0QixpQkFBVSxDQUFDLHdCQUFVLENBQUM7YUFDdkI7U0FDRixDQUFDLENBQUM7UUFFSCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxHQUFHLENBQUMsMEJBQVcsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sR0FB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