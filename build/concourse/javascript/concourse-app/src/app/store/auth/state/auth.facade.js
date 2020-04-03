"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const store_1 = require("@ngrx/store");
const error_actions_1 = require("@concourse/core/error/state/error.actions");
const helpers_1 = require("@concourse/shared/helpers");
const selectors_1 = require("@concourse/store/selectors");
const auth_actions_1 = require("./auth.actions");
const query = require("./auth.selectors");
let AuthFacade = class AuthFacade {
    constructor(store) {
        this.store = store;
        this.isAuthenticated$ = this.store.pipe(store_1.select(query.getIsAuthenticated));
        this.user$ = this.store.pipe(store_1.select(selectors_1.getAuthenticatedUser));
        this.userId$ = this.store.pipe(store_1.select(query.getAuthenticatedUserId));
        this.institutionId$ = this.store.pipe(store_1.select(query.getUserInstitutionId));
        this.userAccessToken$ = this.store.pipe(store_1.select(query.getUserAccessToken));
        this.userPermissions$ = this.store.pipe(store_1.select(query.getPermissions));
        this.userAuthorities$ = this.store.pipe(store_1.select(query.getAuthorities));
        this.userHasPermissions$ = this.store.pipe(store_1.select(query.hasPermissions));
        this.token$ = this.store.pipe(store_1.select(query.getToken));
        this.isLoggingIn$ = this.store.pipe(store_1.select(query.getIsLoggingIn));
        this.isSuccessResp$ = this.store.pipe(store_1.select(query.isSuccessResp));
        this.userVerifyInfo$ = this.store.pipe(store_1.select(query.userVerifyInfo));
    }
    login(creds) {
        this.store.dispatch(new auth_actions_1.Login(creds));
    }
    samlLogin(institutionId) {
        this.store.dispatch(new auth_actions_1.SAMLLogin(institutionId));
    }
    logout() {
        this.store.dispatch(new auth_actions_1.Logout());
    }
    samlLogout() {
        this.store.dispatch(new auth_actions_1.Logout({ saml: true }));
    }
    forgotPassword(formData) {
        this.store.dispatch(new auth_actions_1.ForgotPassword(formData));
    }
    verifyUserToken(token) {
        this.store.dispatch(new auth_actions_1.VerifyUser(token));
    }
    resetPassword(formData) {
        if (helpers_1.Util.isNullOrUndefined(formData.securityQuestionId) || helpers_1.Util.isNullOrUndefined(formData.answer)) {
            this.store.dispatch(new error_actions_1.AddApplicationError({
                message: 'At least one answer should be provided to Reset Password',
                displayType: 'toast'
            }));
        }
        else {
            this.store.dispatch(new auth_actions_1.ResetPassword(formData));
        }
    }
};
AuthFacade = __decorate([
    core_1.Injectable()
], AuthFacade);
exports.AuthFacade = AuthFacade;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5mYWNhZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvYXV0aC9zdGF0ZS9hdXRoLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQyx1Q0FBNEM7QUFFNUMsNkVBQWdGO0FBRWhGLHVEQUFpRDtBQUNqRCwwREFBa0U7QUFDbEUsaURBT3dCO0FBRXhCLDBDQUEwQztBQUcxQyxJQUFhLFVBQVUsR0FBdkIsTUFBYSxVQUFVO0lBYXJCLFlBQ21CLEtBQW1CO1FBQW5CLFVBQUssR0FBTCxLQUFLLENBQWM7UUFidEMscUJBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7UUFDckUsVUFBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxnQ0FBb0IsQ0FBQyxDQUFDLENBQUM7UUFDdEQsWUFBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLG1CQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7UUFDckUscUJBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7UUFDckUscUJBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLHFCQUFn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