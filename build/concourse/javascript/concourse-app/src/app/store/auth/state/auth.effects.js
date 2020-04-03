"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const effects_1 = require("@ngrx/effects");
const JWT = require("jwt-decode");
const moment = require("moment");
const ngx_cacheable_1 = require("ngx-cacheable");
const operators_1 = require("@concourse/core/operators");
const rxjs_1 = require("rxjs");
const operators_2 = require("rxjs/operators");
const error_actions_1 = require("@concourse/core/error/state/error.actions");
const feature_flag_actions_1 = require("@concourse/core/feature-flags/state/feature-flag.actions");
const modal_1 = require("@concourse/core/modal");
const notification_actions_1 = require("@concourse/core/notification/state/notification.actions");
const router_actions_1 = require("@concourse/core/router/router.actions");
const toast_actions_1 = require("@concourse/core/toast/toast.actions");
const env_1 = require("@concourse/env");
const enums_1 = require("@concourse/shared/enums");
const helpers_1 = require("@concourse/shared/helpers");
const role_actions_1 = require("@concourse/store/role/state/role.actions");
const user_actions_1 = require("@concourse/store/user/state/user.actions");
const auth_actions_1 = require("./auth.actions");
const COOKIE_DOMAIN = env_1.environment.apiDomain === 'localhost:4200' ? undefined :
    env_1.environment.apiEnvironment === '' ? `${env_1.environment.apiDomain}` : `${env_1.environment.apiEnvironment}.${env_1.environment.apiDomain}`;
const COOKIE_SECURE = !!COOKIE_DOMAIN;
const COOKIE_SAME_POLICY = COOKIE_SECURE ? 'Strict' : 'Lax';
const USER_ACTIVITY_TIMEOUT_WARNING_SECONDS = 60 * 15;
const USER_ACTIVITY_TIMEOUT_LOGOUT_SECONDS = USER_ACTIVITY_TIMEOUT_WARNING_SECONDS + 60;
let AuthEffects = class AuthEffects {
    constructor(actions$, authApi, cookieService) {
        this.actions$ = actions$;
        this.authApi = authApi;
        this.cookieService = cookieService;
        this.loginUser$ = this.actions$.pipe(effects_1.ofType(auth_actions_1.AuthActionTypes.Login), operators_2.map((action) => action.payload), operators_2.switchMap(payload => 
        // TODO: get previous route & redirect back
        this.authApi.login(payload).pipe(operators_2.tap(({ access_token, refresh_token }) => this.setCookies(access_token, refresh_token)), operators_2.mergeMap(({ access_token, refresh_token }) => [
            new auth_actions_1.UserAuthenticated({ accessToken: access_token, refreshToken: refresh_token }),
            new router_actions_1.RouterGo({ path: ['/'] }),
            new toast_actions_1.OpenToast({ message: 'Welcome back', type: 'success' })
        ]), operators_1.handleError('form', new auth_actions_1.LoginFailure()))));
        this.samlLogin$ = this.actions$.pipe(effects_1.ofType(auth_actions_1.AuthActionTypes.SAMLLogin), operators_2.map((action) => action.payload), operators_2.exhaustMap(institutionId => this.authApi.samlLogin(institutionId).pipe(operators_2.tap(({ redirectUrl }) => {
            window.location.replace(redirectUrl);
        }), operators_2.switchMap(_ => rxjs_1.EMPTY), operators_1.handleError('form', new auth_actions_1.LoginFailure()))));
        this.handleSAMLResponse$ = this.actions$.pipe(operators_1.ofRoute(['/user/authenticated']), operators_2.map((action) => action.payload.queryParams), operators_2.tap(({ access_token, refresh_token }) => this.setCookies(access_token, refresh_token)), operators_2.tap(({ access_token }) => {
            this.cookieService.set(enums_1.AuthKeys.InstitutionIdKey, `${JWT(access_token).extra.institutionId}`, moment().add(30, 'days').toDate(), '/', COOKIE_DOMAIN, COOKIE_SECURE, COOKIE_SAME_POLICY);
            this.cookieService.delete(enums_1.AuthKeys.UserNameKey);
        }), operators_2.mergeMap(({ access_token, refresh_token }) => [
            new auth_actions_1.UserAuthenticated({ accessToken: access_token, refreshToken: refresh_token }),
            new router_actions_1.RouterGo({ path: ['/'] }),
            new toast_actions_1.OpenToast({ message: 'Welcome back', type: 'success' })
        ]), operators_1.handleError('toast', [new auth_actions_1.LoginFailure(), new auth_actions_1.Logout()]));
        this.handleSAMLResponseFailure$ = this.actions$.pipe(operators_1.ofRoute(['/user/authenticationFailed']), operators_2.mergeMap(_ => [
            new router_actions_1.RouterGo({ path: ['/'] }),
            new error_actions_1.AddApplicationError({
                message: 'Error occurred during authentication',
                displayType: 'form'
            })
        ]));
        this.postUserAuthenticated$ = this.actions$.pipe(effects_1.ofType(auth_actions_1.AuthActionTypes.UserAuthenticated), operators_2.mergeMap(_ => [
            new role_actions_1.LoadRoles(),
            new feature_flag_actions_1.LoadAllFeatures(),
            new user_actions_1.LoadMe()
        ]));
        this.setUserPermissions$ = this.actions$.pipe(effects_1.ofType(auth_actions_1.AuthActionTypes.SetUserPermissions), operators_2.map((action) => action.payload), operators_2.map(permissions => {
            if (!helpers_1.Util.isUndefined(permissions)) {
                let { authoritiesBySurfaceLayerId, authoritiesByInstitutionId, authoritiesBySurfaceId } = permissions;
                const authorities = new Set();
                if (!helpers_1.Util.isUndefined(authoritiesBySurfaceLayerId)) {
                    authoritiesBySurfaceLayerId = Object.entries(authoritiesBySurfaceLayerId)
                        .reduce((acc, [surfaceLayerId, perms]) => (Object.assign(Object.assign({}, acc), { [surfaceLayerId]: perms.reduce((pacc, p) => {
                            if (p.includes(',')) {
                                p.split(',').forEach(np => { authorities.add(np); });
                                return [...pacc, ...p.split(',')];
                            }
                            authorities.add(p);
                            return [...pacc, p];
                        }, []) })), {});
                }
                if (!helpers_1.Util.isUndefined(authoritiesByInstitutionId)) {
                    helpers_1.flattenDeep(Object.values(authoritiesByInstitutionId)).map(perms => {
                        authorities.add(perms);
                    });
                }
                if (!helpers_1.Util.isUndefined(authoritiesBySurfaceId)) {
                    helpers_1.flattenDeep(Object.values(authoritiesBySurfaceId)).map(rs => {
                        authorities.add(rs);
                    });
                }
                return {
                    authorities: Array.from(authorities.values()),
                    permissions: {
                        authoritiesBySurfaceLayerId,
                        authoritiesByInstitutionId,
                        authoritiesBySurfaceId
                    }
                };
            }
            return {
                authorities: [],
                permissions
            };
        }), operators_2.map(data => new auth_actions_1.SetUserPermissionsSuccess(data)));
        this.requestNewAccessToken$ = this.actions$.pipe(effects_1.ofType(auth_actions_1.AuthActionTypes.RequestNewAccessToken), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.authApi.refreshAccessToken(payload).pipe(operators_2.retryWhen(errors => errors.pipe(operators_2.delay(5000), operators_2.take(2), operators_2.concatMap(_ => rxjs_1.throwError(errors)))), // Will retry 2 times before passing to catchError
        operators_2.tap(({ access_token }) => {
            const { exp } = JWT(access_token);
            const accDate = moment.unix(exp);
            this.cookieService.set(enums_1.AuthKeys.AccessTokenKey, access_token, accDate.toDate(), '/', COOKIE_DOMAIN, !!COOKIE_DOMAIN, COOKIE_SAME_POLICY);
        }), operators_2.map(({ access_token, refresh_token }) => new auth_actions_1.UserAuthenticated({ accessToken: access_token, refreshToken: refresh_token })), operators_2.catchError(err => rxjs_1.of(new error_actions_1.AddApplicationError({
            message: err.error.error_description,
            displayType: 'critical'
        }), new auth_actions_1.RequestNewAccessTokenFailure(err), new auth_actions_1.Logout({ message: 'Unable to refresh access token, please login again' }))))));
        this.monitorAccessToken$ = this.actions$.pipe(effects_1.ofType(auth_actions_1.AuthActionTypes.UserAuthenticated), operators_2.map((action) => action.payload), operators_2.map(({ accessToken, refreshToken }) => {
            const { exp } = JWT(accessToken);
            // refresh 30 seconds before token expires.
            const expDate = moment.unix(exp).subtract(enums_1.AuthKeys.AccessRefreshTime, enums_1.AuthKeys.AccessRefreshTimeUnit);
            return { expDate, refreshToken };
        }), operators_2.switchMap(({ expDate, refreshToken }) => rxjs_1.timer(expDate.toDate()).pipe(operators_2.map(_ => new auth_actions_1.RequestNewAccessToken(refreshToken)))));
        this.monitorRefreshToken$ = this.actions$.pipe(effects_1.ofType(auth_actions_1.AuthActionTypes.UserAuthenticated), operators_2.map((action) => action.payload), operators_2.map(({ refreshToken }) => {
            const { exp } = JWT(refreshToken);
            const expDate = moment.unix(exp);
            const expWarningDate = moment.unix(exp).subtract(enums_1.AuthKeys.SessionExpireWarningTime, enums_1.AuthKeys.SessionExpireWarningUnit);
            return { expDate, expWarningDate };
        }), operators_2.switchMap(({ expWarningDate, expDate }) => {
            /**
             * timer() cannot handle anything over 24 days
             * So, we are only going to start these timers if the refresh_token expires today
             * See: https://github.com/ReactiveX/rxjs/issues/3015 for more information
             */
            if (expDate.isSame(moment(), 'day')) {
                return rxjs_1.merge(
                // TODO: show meaningful toast/notification for RefreshTokenTimeoutWarning
                rxjs_1.timer(expWarningDate.toDate()).pipe(operators_2.map(_ => new auth_actions_1.RefreshTokenTimeoutWarning())), rxjs_1.timer(expDate.toDate()).pipe(operators_2.map(_ => new auth_actions_1.Logout())));
            }
            return rxjs_1.EMPTY;
        }));
        this.monitorUserActivity = this.actions$.pipe(effects_1.ofType(auth_actions_1.AuthActionTypes.UserAuthenticated), operators_2.filter(_ => env_1.environment.enableActivityTracking), operators_2.switchMap(_ => rxjs_1.merge(rxjs_1.fromEvent(window, 'click'), rxjs_1.fromEvent(window, 'mousemove'), rxjs_1.fromEvent(window, 'keypress')).pipe(operators_2.takeUntil(this.actions$.pipe(effects_1.ofType(auth_actions_1.AuthActionTypes.Logout))), operators_2.debounceTime(5000), operators_2.switchMap(__ => rxjs_1.merge(rxjs_1.timer(USER_ACTIVITY_TIMEOUT_WARNING_SECONDS * 1000).pipe(operators_2.map(___ => new modal_1.OpenModal({
            component: modal_1.UserIdleWarningComponent,
            id: 'user-idle-warning',
            options: {
                animated: false,
                backdrop: 'static',
                ignoreBackdropClick: true,
                keyboard: false,
                initialState: {
                    logoutTime: moment().add(USER_ACTIVITY_TIMEOUT_LOGOUT_SECONDS, 'seconds').toDate()
                }
            }
        }))), rxjs_1.timer(USER_ACTIVITY_TIMEOUT_LOGOUT_SECONDS * 1000).pipe(operators_2.mergeMap(___ => [
            new auth_actions_1.Logout({ message: 'Inactivity Logout' })
        ])))))));
        this.logoutUser$ = this.actions$.pipe(effects_1.ofType(auth_actions_1.AuthActionTypes.Logout), operators_2.map((action) => action.payload), operators_2.tap(_ => {
            this.cookieService.delete(enums_1.AuthKeys.RefreshTokenKey, '/', COOKIE_DOMAIN);
            this.cookieService.delete(enums_1.AuthKeys.AccessTokenKey, '/', COOKIE_DOMAIN);
            ngx_cacheable_1.globalCacheBusterNotifier.next();
        }), operators_2.concatMap(({ message }) => [
            new notification_actions_1.StopNotificationPolling(),
            new modal_1.CloseModal(),
            new router_actions_1.RouterGo({ path: ['/user'] }),
            new toast_actions_1.OpenToast({ message: message || 'Logged out', type: 'info' }),
            new auth_actions_1.LogoutSuccess()
        ]), operators_1.handleError('toast', new auth_actions_1.LoginFailure()));
        this.samlLogoutUser$ = this.actions$.pipe(effects_1.ofType(auth_actions_1.AuthActionTypes.Logout), operators_2.map((action) => action.payload), operators_2.filter(payload => payload.saml), operators_2.exhaustMap(_ => this.authApi.samlLogout().pipe(operators_2.switchMap(__ => rxjs_1.EMPTY), operators_1.handleError('toast'))));
        this.forgotPassword$ = this.actions$.pipe(effects_1.ofType(auth_actions_1.AuthActionTypes.ForgotPassword), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.authApi.forgotPassword(payload).pipe(operators_2.mergeMap(_ => [
            new auth_actions_1.ForgotPasswordSuccess(),
            new toast_actions_1.OpenToast({ message: 'Check your email for further instructions', type: 'success' })
        ]), operators_1.handleError('toast', new auth_actions_1.ForgotPasswordFailure()))));
        this.resetPassword$ = this.actions$.pipe(effects_1.ofType(auth_actions_1.AuthActionTypes.ResetPassword), operators_2.map((action) => action.payload), operators_2.exhaustMap(payload => this.authApi.resetPassword(payload).pipe(operators_2.mergeMap(_ => [
            new auth_actions_1.ResetPasswordSuccess(),
            new toast_actions_1.OpenToast({ message: 'Your password has been reset', type: 'success' }),
            new router_actions_1.RouterGo({ path: ['/'] })
        ]), operators_1.handleError('toast', new auth_actions_1.ResetPasswordFailure()))));
        this.verifyUserToken$ = this.actions$.pipe(effects_1.ofType(auth_actions_1.AuthActionTypes.VerifyUser), operators_2.map((action) => action.payload), operators_2.exhaustMap(payload => this.authApi.validateToken(payload).pipe(operators_2.mergeMap(securityQuestions => [
            new router_actions_1.RouterGo({ path: ['/user/reset-password'] }),
            new auth_actions_1.VerifyUserSuccess({ securityQuestions, token: payload })
        ]), operators_2.catchError(err => {
            if (err.status === 401) {
                return rxjs_1.of(new error_actions_1.AddApplicationError({
                    message: err.error ? err.error.message : err.message,
                    displayType: 'toast'
                }), new auth_actions_1.VerifyUserFailure(payload), new router_actions_1.RouterGo({ path: ['/user/forgot-password'] }));
            }
            else {
                return rxjs_1.of(new error_actions_1.AddApplicationError({
                    message: err.error ? err.error.message : err.message,
                    displayType: 'toast'
                }), new auth_actions_1.VerifyUserFailure(payload));
            }
        }))));
        // tslint:disable-next-line:variable-name
        this.setCookies = (access_token, refresh_token) => {
            const accessToken = JWT(access_token);
            const refreshToken = JWT(refresh_token);
            const accDate = moment.unix(accessToken.exp);
            const refDate = moment.unix(refreshToken.exp);
            this.cookieService.set(enums_1.AuthKeys.AccessTokenKey, access_token, accDate.toDate(), '/', COOKIE_DOMAIN, COOKIE_SECURE, COOKIE_SAME_POLICY);
            this.cookieService.set(enums_1.AuthKeys.RefreshTokenKey, refresh_token, refDate.toDate(), '/', COOKIE_DOMAIN, COOKIE_SECURE, COOKIE_SAME_POLICY);
            this.cookieService.set(enums_1.AuthKeys.UserNameKey, accessToken.user_name, accDate.toDate(), '/', COOKIE_DOMAIN, COOKIE_SECURE, COOKIE_SAME_POLICY);
            this.cookieService.delete(enums_1.AuthKeys.InstitutionIdKey);
        };
    }
};
__decorate([
    effects_1.Effect()
], AuthEffects.prototype, "loginUser$", void 0);
__decorate([
    effects_1.Effect()
], AuthEffects.prototype, "samlLogin$", void 0);
__decorate([
    effects_1.Effect()
], AuthEffects.prototype, "handleSAMLResponse$", void 0);
__decorate([
    effects_1.Effect()
], AuthEffects.prototype, "handleSAMLResponseFailure$", void 0);
__decorate([
    effects_1.Effect()
], AuthEffects.prototype, "postUserAuthenticated$", void 0);
__decorate([
    effects_1.Effect()
], AuthEffects.prototype, "setUserPermissions$", void 0);
__decorate([
    effects_1.Effect()
], AuthEffects.prototype, "requestNewAccessToken$", void 0);
__decorate([
    effects_1.Effect()
], AuthEffects.prototype, "monitorAccessToken$", void 0);
__decorate([
    effects_1.Effect()
], AuthEffects.prototype, "monitorRefreshToken$", void 0);
__decorate([
    effects_1.Effect()
], AuthEffects.prototype, "monitorUserActivity", void 0);
__decorate([
    effects_1.Effect()
], AuthEffects.prototype, "logoutUser$", void 0);
__decorate([
    effects_1.Effect()
], AuthEffects.prototype, "samlLogoutUser$", void 0);
__decorate([
    effects_1.Effect()
], AuthEffects.prototype, "forgotPassword$", void 0);
__decorate([
    effects_1.Effect()
], AuthEffects.prototype, "resetPassword$", void 0);
__decorate([
    effects_1.Effect()
], AuthEffects.prototype, "verifyUserToken$", void 0);
AuthEffects = __decorate([
    core_1.Injectable()
], AuthEffects);
exports.AuthEffects = AuthEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5lZmZlY3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2F1dGgvc3RhdGUvYXV0aC5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLDJDQUF3RDtBQUV4RCxrQ0FBa0M7QUFDbEMsaUNBQWlDO0FBQ2pDLGlEQUEwRDtBQUcxRCx5REFBaUU7QUFDakUsK0JBUWM7QUFDZCw4Q0Fjd0I7QUFFeEIsNkVBQWdGO0FBQ2hGLG1HQUEyRjtBQUMzRixpREFBd0Y7QUFFeEYsa0dBQWtHO0FBQ2xHLDBFQUErRTtBQUMvRSx1RUFBZ0U7QUFDaEUsd0NBQTZDO0FBQzdDLG1EQUFtRDtBQUNuRCx1REFBOEQ7QUFDOUQsMkVBQXFFO0FBQ3JFLDJFQUFrRTtBQUVsRSxpREFzQndCO0FBRXhCLE1BQU0sYUFBYSxHQUFHLGlCQUFXLENBQUMsU0FBUyxLQUFLLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM1RSxpQkFBVyxDQUFDLGNBQWMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsaUJBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxpQkFBVyxDQUFDLGNBQWMsSUFBSSxpQkFBVyxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQzVILE1BQU0sYUFBYSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUM7QUFDdEMsTUFBTSxrQkFBa0IsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQzVELE1BQU0scUNBQXFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUN0RCxNQUFNLG9DQUFvQyxHQUFHLHFDQUFxQyxHQUFHLEVBQUUsQ0FBQztBQUd4RixJQUFhLFdBQVcsR0FB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