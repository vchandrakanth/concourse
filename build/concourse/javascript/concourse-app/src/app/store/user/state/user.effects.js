"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const effects_1 = require("@ngrx/effects");
const operators_1 = require("@concourse/core/operators");
const rxjs_1 = require("rxjs");
const operators_2 = require("rxjs/operators");
const error_actions_1 = require("@concourse/core/error/state/error.actions");
const modal_1 = require("@concourse/core/modal");
const router_actions_1 = require("@concourse/core/router/router.actions");
const toast_actions_1 = require("@concourse/core/toast/toast.actions");
const auth_actions_1 = require("@concourse/store/auth/state/auth.actions");
const group_actions_1 = require("@concourse/store/group/state/group.actions");
const institution_actions_1 = require("@concourse/store/institution/state/institution.actions");
const surface_layer_actions_1 = require("@concourse/store/surface-layer/state/surface-layer.actions");
const user_actions_1 = require("./user.actions");
let UserEffects = class UserEffects {
    constructor(actions$, userApi, userFacade, authFacade) {
        this.actions$ = actions$;
        this.userApi = userApi;
        this.userFacade = userFacade;
        this.authFacade = authFacade;
        this.loadUsers$ = this.actions$.pipe(effects_1.ofType(user_actions_1.UserActionTypes.LoadUsers), operators_2.switchMap(_ => this.userApi.list().pipe(operators_2.map(data => new user_actions_1.LoadUsersSuccess(data)), operators_1.handleError('toast', new user_actions_1.LoadUsersFailure()))));
        this.loadUsersByPagination$ = this.actions$.pipe(effects_1.ofType(user_actions_1.UserActionTypes.LoadUsersByPagination), operators_2.map((action) => action.payload), operators_2.concatMap(payload => this.userApi.paginatedList(payload.size, payload.page).pipe(operators_2.map(data => new user_actions_1.LoadUsersByPaginationSuccess(data)), operators_1.handleError('toast', new user_actions_1.LoadUsersByPaginationFailure()))));
        this.loadUser$ = this.actions$.pipe(effects_1.ofType(user_actions_1.UserActionTypes.LoadUser), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.userApi.getUser(payload).pipe(operators_2.map(data => new user_actions_1.LoadUserSuccess(data)), operators_1.handleError('toast', new user_actions_1.LoadUserFailure()))));
        this.loadMe$ = this.actions$.pipe(effects_1.ofType(user_actions_1.UserActionTypes.LoadMe), operators_2.switchMap(() => this.userApi.getMe().pipe(operators_2.mergeMap((_a) => {
            var { groups, user } = _a, permissions = __rest(_a, ["groups", "user"]);
            return [
                new user_actions_1.LoadMeSuccess(user),
                new group_actions_1.LoadGroupsSuccess(groups),
                new auth_actions_1.SetUserPermissions(permissions)
            ];
        }), operators_1.handleError('critical', new user_actions_1.LoadMeFailure()))));
        this.deleteUser$ = this.actions$.pipe(effects_1.ofType(user_actions_1.UserActionTypes.DeleteUser), operators_2.map((action) => action.payload), operators_2.exhaustMap(payload => this.userApi.deleteUser(payload).pipe(operators_2.mergeMap(_ => [
            new user_actions_1.DeleteUserSuccess(payload),
            new toast_actions_1.OpenToast({ message: 'User Deleted Successfully', type: 'success' }),
            new modal_1.CloseModal(),
            new router_actions_1.RouterGo({ path: ['user-management/users'] })
        ]), operators_1.handleError('form', new user_actions_1.DeleteUserFailure()))));
        this.inviteUser$ = this.actions$.pipe(effects_1.ofType(user_actions_1.UserActionTypes.InviteUser), operators_2.map((action) => action.payload), operators_2.exhaustMap(payload => this.userApi.inviteUser(payload).pipe(operators_2.mergeMap(user => [
            new user_actions_1.InviteUserSuccess(user),
            new modal_1.CloseModal(),
            new toast_actions_1.OpenToast({ message: 'User Invitation Email Sent', type: 'success' }),
            new router_actions_1.RouterGo({ path: ['user-management/users'] })
        ]), operators_1.handleError('form', new user_actions_1.InviteUserFailure()))));
        this.updateUser$ = this.actions$.pipe(effects_1.ofType(user_actions_1.UserActionTypes.UpdateUser), operators_2.map((action) => action.payload), operators_2.exhaustMap(payload => this.userApi.updateUser(payload).pipe(operators_2.mergeMap(data => [
            new user_actions_1.UpdateUserSuccess(data),
            new toast_actions_1.OpenToast({ message: 'User Details Updated', type: 'success' })
        ]), operators_1.handleError('form', new user_actions_1.UpdateUserFailure()))));
        this.updatePassword$ = this.actions$.pipe(effects_1.ofType(user_actions_1.UserActionTypes.UpdatePassword), operators_2.map((action) => action.payload), operators_2.exhaustMap(payload => this.userApi.updatePassword(payload.userId, payload.updatePasswordRequest).pipe(operators_2.mergeMap(_ => [
            new user_actions_1.UpdatePasswordSuccess(),
            new toast_actions_1.OpenToast({ message: 'Password Updated', type: 'success' })
        ]), operators_1.handleError('form', new user_actions_1.UpdatePasswordFailure()))));
        this.searchUsers$ = this.actions$.pipe(effects_1.ofType(user_actions_1.UserActionTypes.SearchUsers), operators_2.map((action) => action.payload), operators_2.map(searchText => searchText.toLocaleLowerCase()), operators_2.withLatestFrom(this.userFacade.list$), operators_2.map(([searchText, users]) => users.filter(u => `${u.name} ${u.email}`.toLocaleLowerCase().includes(searchText)).map(u => u.id)), operators_2.map(searchResults => new user_actions_1.SearchUsersSuccess(searchResults)));
        this.loadSecurityQuestions$ = this.actions$.pipe(effects_1.ofType(user_actions_1.UserActionTypes.LoadSecurityQuestions), operators_2.mergeMap(_ => this.userApi.getSecurityQuestions().pipe(operators_2.map(data => new user_actions_1.LoadSecurityQuestionsSuccess(data)), operators_1.handleError('toast', new user_actions_1.LoadSecurityQuestionsFailure()))));
        this.validateInviteUserToken$ = this.actions$.pipe(effects_1.ofType(user_actions_1.UserActionTypes.ValidateInviteUserToken), operators_2.map((action) => action.payload), operators_2.exhaustMap(payload => this.userApi.validateInviteUserToken(payload.token).pipe(operators_2.mergeMap(resp => [
            new user_actions_1.ValidateInviteUserTokenSuccess(resp),
            new router_actions_1.RouterGo({ path: ['/user/registration'] })
        ]), operators_2.catchError(err => {
            if (err.status === 401) {
                return rxjs_1.of(
                // saving token to store. to use when regenerating.
                new error_actions_1.AddApplicationError({
                    message: err.error ? err.error.message : err.message,
                    displayType: 'toast',
                    rawError: err
                }), new router_actions_1.RouterGo({ path: ['/user/invitation-expire'] }), new user_actions_1.ValidateInviteUserTokenFailure(payload.token));
            }
            return rxjs_1.of(new error_actions_1.AddApplicationError({
                message: err.error ? err.error.message : err.message,
                displayType: 'toast',
                rawError: err
            }), new user_actions_1.ValidateInviteUserTokenFailure(err));
        }))));
        this.regenerateInvitation$ = this.actions$.pipe(effects_1.ofType(user_actions_1.UserActionTypes.RegenerateInvitation), operators_2.map((action) => action.payload), operators_2.exhaustMap(payload => this.userApi.regenerateInvitation(payload).pipe(operators_2.mergeMap(_ => [
            new user_actions_1.RegenerateInvitationSuccess(),
            new toast_actions_1.OpenToast({ message: 'Invitation resent successfully', type: 'success' }),
            new router_actions_1.RouterGo({ path: ['/'] })
        ]), operators_1.handleError('toast', new user_actions_1.RegenerateInvitationFailure()))));
        this.registerUser$ = this.actions$.pipe(effects_1.ofType(user_actions_1.UserActionTypes.RegisterUser), operators_2.map((action) => action.payload), operators_2.exhaustMap(payload => this.userApi.createUser(payload.token, payload.user).pipe(operators_2.mergeMap(user => user.isSAML ? [new auth_actions_1.SAMLLogin(user.institutionId)] : [new user_actions_1.RegisterUserSuccess(user)]), operators_1.handleError('toast', new user_actions_1.RegisterUserFailure()))));
        this.validateConfirmationToken$ = this.actions$.pipe(effects_1.ofType(user_actions_1.UserActionTypes.ValidateConfirmationToken), operators_2.map((action) => action.payload), operators_2.exhaustMap(payload => this.userApi.validateConfirmationToken(payload).pipe(operators_2.mergeMap(_ => [
            new user_actions_1.ValidateConfirmationTokenSuccess(),
            new toast_actions_1.OpenToast({ message: 'Your user account is confirmed', type: 'success' }),
            new router_actions_1.RouterGo({ path: ['user'] })
        ]), operators_2.catchError(err => {
            if (err.status === 401) {
                return rxjs_1.of(
                // saving token to store. to use when regenerating.
                new error_actions_1.AddApplicationError({
                    message: err.error ? err.error.message : err.message,
                    displayType: 'toast'
                }), new router_actions_1.RouterGo({ path: ['/user/confirmation-expire'] }), new user_actions_1.ValidateConfirmationTokenFailure(payload));
            }
            return rxjs_1.of(new error_actions_1.AddApplicationError({
                message: err.error ? err.error.message : err.message,
                displayType: 'toast'
            }), new user_actions_1.ValidateConfirmationTokenFailure(err));
        }))));
        this.regenerateConfirmation$ = this.actions$.pipe(effects_1.ofType(user_actions_1.UserActionTypes.RegenerateConfirmation), operators_2.map((action) => action.payload), operators_2.exhaustMap(payload => this.userApi.regenerateConfirmationToken(payload).pipe(operators_2.mergeMap(() => [
            new user_actions_1.RegenerateConfirmationSuccess(),
            new toast_actions_1.OpenToast({ message: 'Registration sent successfully.', type: 'success' }),
            new router_actions_1.RouterGo({ path: ['/'] })
        ]), operators_1.handleError('toast', new user_actions_1.RegenerateConfirmationFailure()))));
        this.loadUsersNav$ = this.actions$.pipe(operators_1.ofRoute(['/user-management/users']), operators_2.exhaustMap(route => this.authFacade.institutionId$.pipe(operators_2.take(1), operators_2.mergeMap(institutionId => [
            new institution_actions_1.LoadInstitution(institutionId),
            new institution_actions_1.SelectInstitution(institutionId),
            new user_actions_1.SelectUser(undefined),
            new user_actions_1.LoadUsersByPagination({ page: '0', size: '200' }),
            // new LoadUsers(),
            new group_actions_1.LoadGroups(),
            new surface_layer_actions_1.LoadSurfaceLayers()
        ]))));
        this.loadRegistrationNav$ = this.actions$.pipe(operators_1.ofRoute(['/user/registration', '/user/(registration//sidebar:log-in)']), operators_2.mergeMap(_ => [
            new user_actions_1.LoadSecurityQuestions()
        ]));
        this.loadUserNav$ = this.actions$.pipe(operators_1.ofRoute(['/user-management/users/:id']), operators_2.map((action) => action.payload), operators_2.mergeMap(route => [
            new user_actions_1.LoadUser(+route.params.id),
            new user_actions_1.SelectUser(+route.params.id)
        ]));
        this.loadOnUserValidateInvitation$ = this.actions$.pipe(operators_1.ofRoute(['/user/validate-invitation']), operators_2.map((action) => action.payload), operators_2.exhaustMap(route => this.authFacade.isAuthenticated$.pipe(operators_2.takeUntil(this.actions$.pipe(effects_1.ofType(router_actions_1.RouterActionTypes.Change))), operators_2.mergeMap(isUserAuthenticated => [
            ...(!!isUserAuthenticated ?
                [
                    new auth_actions_1.Logout(),
                    new user_actions_1.ValidateInviteUserToken({ token: route.queryParams.token, email: atob(route.queryParams.email) })
                ] :
                [
                    new user_actions_1.ValidateInviteUserToken({ token: route.queryParams.token, email: atob(route.queryParams.email) })
                ])
        ]))));
        this.loadOnUserValidateRegistration$ = this.actions$.pipe(operators_1.ofRoute(['/user/validate-registration']), operators_2.map((action) => action.payload), operators_2.exhaustMap(route => this.authFacade.isAuthenticated$.pipe(operators_2.takeUntil(this.actions$.pipe(effects_1.ofType(router_actions_1.RouterActionTypes.Change))), operators_2.mergeMap(isUserAuthenticated => [
            ...(!!isUserAuthenticated ?
                [
                    new auth_actions_1.Logout(),
                    new user_actions_1.ValidateConfirmationToken(route.queryParams.token)
                ] :
                [
                    new user_actions_1.ValidateConfirmationToken(route.queryParams.token)
                ])
        ]))));
        this.loadOnUserVerification$ = this.actions$.pipe(operators_1.ofRoute(['/user/verify-token']), operators_2.map((action) => action.payload), operators_2.exhaustMap(route => this.authFacade.isAuthenticated$.pipe(operators_2.takeUntil(this.actions$.pipe(effects_1.ofType(router_actions_1.RouterActionTypes.Change))), operators_2.mergeMap(isUserAuthenticated => [
            ...(!!isUserAuthenticated ? [new auth_actions_1.Logout()] : []),
            new auth_actions_1.VerifyUser(route.queryParams.token)
        ]))));
        this.loadOnUserProfileNav$ = this.actions$.pipe(operators_1.ofRoute(['/user/profile']), operators_2.exhaustMap(_ => this.authFacade.institutionId$.pipe(operators_2.take(1), operators_2.mergeMap(institutionId => [
            new institution_actions_1.LoadInstitution(institutionId),
            new institution_actions_1.SelectInstitution(institutionId)
        ]))));
    }
};
__decorate([
    effects_1.Effect()
], UserEffects.prototype, "loadUsers$", void 0);
__decorate([
    effects_1.Effect()
], UserEffects.prototype, "loadUsersByPagination$", void 0);
__decorate([
    effects_1.Effect()
], UserEffects.prototype, "loadUser$", void 0);
__decorate([
    effects_1.Effect()
], UserEffects.prototype, "loadMe$", void 0);
__decorate([
    effects_1.Effect()
], UserEffects.prototype, "deleteUser$", void 0);
__decorate([
    effects_1.Effect()
], UserEffects.prototype, "inviteUser$", void 0);
__decorate([
    effects_1.Effect()
], UserEffects.prototype, "updateUser$", void 0);
__decorate([
    effects_1.Effect()
], UserEffects.prototype, "updatePassword$", void 0);
__decorate([
    effects_1.Effect()
], UserEffects.prototype, "searchUsers$", void 0);
__decorate([
    effects_1.Effect()
], UserEffects.prototype, "loadSecurityQuestions$", void 0);
__decorate([
    effects_1.Effect()
], UserEffects.prototype, "validateInviteUserToken$", void 0);
__decorate([
    effects_1.Effect()
], UserEffects.prototype, "regenerateInvitation$", void 0);
__decorate([
    effects_1.Effect()
], UserEffects.prototype, "registerUser$", void 0);
__decorate([
    effects_1.Effect()
], UserEffects.prototype, "validateConfirmationToken$", void 0);
__decorate([
    effects_1.Effect()
], UserEffects.prototype, "regenerateConfirmation$", void 0);
__decorate([
    effects_1.Effect()
], UserEffects.prototype, "loadUsersNav$", void 0);
__decorate([
    effects_1.Effect()
], UserEffects.prototype, "loadRegistrationNav$", void 0);
__decorate([
    effects_1.Effect()
], UserEffects.prototype, "loadUserNav$", void 0);
__decorate([
    effects_1.Effect()
], UserEffects.prototype, "loadOnUserValidateInvitation$", void 0);
__decorate([
    effects_1.Effect()
], UserEffects.prototype, "loadOnUserValidateRegistration$", void 0);
__decorate([
    effects_1.Effect()
], UserEffects.prototype, "loadOnUserVerification$", void 0);
__decorate([
    effects_1.Effect()
], UserEffects.prototype, "loadOnUserProfileNav$", void 0);
UserEffects = __decorate([
    core_1.Injectable()
], UserEffects);
exports.UserEffects = UserEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5lZmZlY3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL3VzZXIvc3RhdGUvdXNlci5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBMkM7QUFDM0MsMkNBQXdEO0FBR3hELHlEQUFpRTtBQUNqRSwrQkFBc0M7QUFDdEMsOENBVXdCO0FBRXhCLDZFQUFnRjtBQUNoRixpREFBbUQ7QUFDbkQsMEVBQWtHO0FBQ2xHLHVFQUFnRTtBQUNoRSwyRUFBNkc7QUFFN0csOEVBQTJGO0FBQzNGLGdHQUE0RztBQUM1RyxzR0FBK0Y7QUFFL0YsaURBOEN3QjtBQUl4QixJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0lBc1Z0QixZQUNtQixRQUFpQixFQUNqQixPQUFvQixFQUNwQixVQUFzQixFQUN0QixVQUFzQjtRQUh0QixhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLFlBQU8sR0FBUCxPQUFPLENBQWE7UUFDcEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBeFYvQixlQUFVLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUMzRCxnQkFBTSxDQUFDLDhCQUFlLENBQUMsU0FBUyxDQUFDLEVBQ2pDLHFCQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FDWixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FDdEIsZUFBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSwrQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUN2Qyx1QkFBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLCtCQUFnQixFQUFFLENBQUMsQ0FDN0MsQ0FDRixDQUNGLENBQUM7UUFFUSwyQkFBc0IsR0FBdUIs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