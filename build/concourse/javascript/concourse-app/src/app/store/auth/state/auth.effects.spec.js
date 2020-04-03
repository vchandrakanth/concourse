"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@ngrx/effects/testing");
const jasmine_marbles_1 = require("jasmine-marbles");
const JWT = require("jwt-decode");
const moment = require("moment");
const ngx_cookie_service_1 = require("ngx-cookie-service");
const error_actions_1 = require("@concourse/core/error/state/error.actions");
const modal_actions_ts_1 = require("@concourse/core/modal/state/modal.actions.ts");
const notification_actions_1 = require("@concourse/core/notification/state/notification.actions");
const router_actions_1 = require("@concourse/core/router/router.actions");
const toast_actions_1 = require("@concourse/core/toast/toast.actions");
const auth_service_1 = require("../services/auth.service");
const auth_actions_1 = require("./auth.actions");
const auth_effects_1 = require("./auth.effects");
const enums_1 = require("@concourse/shared/enums");
const FAKE_USER = 'test@concoursehub.com';
const FAKE_PW = 'password';
// tslint:disable-next-line:max-line-length
const ACCESS_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsidXNlci1hcGktc2VydmljZSIsIm1vZGVsLWFwaS1zZXJ2aWNlIiwiaW5zdGl0dXRpb24tYXBpLXNlcnZpY2UiLCJlbWFpbC1hcGktc2VydmljZSJdLCJ1c2VyX25hbWUiOiJib2JAY29uY291cnNlaHViLmNvbSIsInNjb3BlIjpbIk1BTkFHRV9HUk9VUFMiLCJNQU5BR0VfVVNFUlMiLCJNQU5BR0VfUk9MRVMiLCJNQU5BR0VfSU5TVElUVVRJT05TIiwiTUFOQUdFX1NFUlZJQ0VfTU9ERUxTIiwiTUFOQUdFX1NFUlZJQ0VTIiwiTUFOQUdFX0FQUExJQ0FUSU9OUyIsIk1BTkFHRV9PUkdBTklaQVRJT05TIiwiU0VORF9FTUFJTFMiXSwiZXh0cmEiOnsicmVzcG9uc2liaWxpdHlJZHNCeU9yZ2FuaXphdGlvbk5vZGVJZHMiOnt9LCJpbnN0aXR1dGlvbklkIjoxMDAyLCJ1c2VySWQiOjEwM30sImV4cCI6MTU0MjM0MTgwNiwianRpIjoiZDcwYzI1ZTEtNzU4Ny00OTZlLWFiOGItYjRjZGUwNGExNjUwIiwiY2xpZW50X2lkIjoiM2RmMDQ2NmU1NDU5YWE5ZWRkMzcyN2VmZTcxMjA0MGYuYXBpLmNvbmNvdXJzZWh1Yi5jb20ifQ.Zdf1U_qs10V6BG8j1GlebIdfbLCnd2LDSkSOs9HN6okou9t6vRqULp7zgKGwhnVzVM90v1yNxbSk4hxcevfx6ABhCeRYKGAi80G_QoAdQSNvzfTGAS6KepzZZ1BZXGQ6Lap18cHVqUdDO3D1MZnXpplv71RL4x1gTj9JRjkqjI_iv62MhvMoWL--iLJ35u0ZRHh9Jb3-RYvQhI8V2CBI8jLMLChZKx7orDoCNK1BAhB8LaM23rxfgohA9HE3ZM_7TNuUTrp2RfVPW-rHKASjLU6abT1mij-DRAhZmmAZM5ISPpn8WxJUFD2NL52436UQ8LRe_fuPtZZD5WjR3OsBOA';
// tslint:disable-next-line:max-line-length
const REFRESH_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsidXNlci1hcGktc2VydmljZSIsIm1vZGVsLWFwaS1zZXJ2aWNlIiwiaW5zdGl0dXRpb24tYXBpLXNlcnZpY2UiLCJlbWFpbC1hcGktc2VydmljZSJdLCJ1c2VyX25hbWUiOiJib2JAY29uY291cnNlaHViLmNvbSIsInNjb3BlIjpbIk1BTkFHRV9HUk9VUFMiLCJNQU5BR0VfVVNFUlMiLCJNQU5BR0VfUk9MRVMiLCJNQU5BR0VfSU5TVElUVVRJT05TIiwiTUFOQUdFX1NFUlZJQ0VfTU9ERUxTIiwiTUFOQUdFX1NFUlZJQ0VTIiwiTUFOQUdFX0FQUExJQ0FUSU9OUyIsIk1BTkFHRV9PUkdBTklaQVRJT05TIiwiU0VORF9FTUFJTFMiXSwiZXh0cmEiOnsicmVzcG9uc2liaWxpdHlJZHNCeU9yZ2FuaXphdGlvbk5vZGVJZHMiOnt9LCJpbnN0aXR1dGlvbklkIjoxMDAyLCJ1c2VySWQiOjEwM30sImF0aSI6ImQ3MGMyNWUxLTc1ODctNDk2ZS1hYjhiLWI0Y2RlMDRhMTY1MCIsImV4cCI6MTU0NDg5MDYwNiwianRpIjoiNGJjOTk0NGQtYmFlYS00Yzc0LTg0MTgtZDE3MTg4MWY5OThkIiwiY2xpZW50X2lkIjoiM2RmMDQ2NmU1NDU5YWE5ZWRkMzcyN2VmZTcxMjA0MGYuYXBpLmNvbmNvdXJzZWh1Yi5jb20ifQ.EDgmqmpgFNBQZWixIU0eo39R-MsTE4e_eOkeCa4WebsgQMzxhoL7HXIabi_sUYx69dJkf17YeMcuIHfOKHF17bv-AUQ44g0BABGdOSXeoP8H8yWju-i_oLv-pRrzIeZssDR2MjrSRH7e2avQnqK9jLkZ7pPbFCPG1ofrRB8f_a5NAZ_xOlxPB2Qg3rLAOoJKsqvHRft3_zbC2TORb6zI_bhlcE40kjCkEFFBsaU3jllmEdFOkKV70_6I7mDFU7elrFstNV2XEC-r5n-N99pYgV-V8USpjEvi66IBqTsruEW1R3GH0uWBoAjFANdFddnmFcCd03T0AVaxBFoMZZFACQ';
describe('AuthEffects', () => {
    let actions;
    let effects;
    let authService;
    let cookieService;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [
                auth_effects_1.AuthEffects,
                testing_2.provideMockActions(() => actions),
                {
                    provide: auth_service_1.AuthService,
                    useValue: {
                        login: jest.fn(),
                        refreshAccessToken: jest.fn(),
                        forgotPassword: jest.fn(),
                        resetPassword: jest.fn()
                    }
                },
                {
                    provide: ngx_cookie_service_1.CookieService,
                    useValue: {
                        set: jest.fn(),
                        deleteAll: jest.fn(),
                        delete: jest.fn()
                    }
                }
            ]
        });
        effects = testing_1.TestBed.get(auth_effects_1.AuthEffects);
        authService = testing_1.TestBed.get(auth_service_1.AuthService);
        cookieService = testing_1.TestBed.get(ngx_cookie_service_1.CookieService);
    });
    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
    describe('loginUser', () => {
        it('should return UserAuthenticated and RouterGo actions, & call CookieService.set, on success', () => {
            const action = new auth_actions_1.Login({
                username: FAKE_USER,
                password: FAKE_PW,
                grant_type: 'password'
            });
            const token = {
                accessToken: ACCESS_TOKEN,
                refreshToken: REFRESH_TOKEN
            };
            const userAuthenticated = new auth_actions_1.UserAuthenticated(token);
            const routerRedirect = new router_actions_1.RouterGo({ path: ['/'] });
            const toast = new toast_actions_1.OpenToast({ message: 'Welcome back', type: 'success' });
            const accessToken = JWT(ACCESS_TOKEN);
            const accDate = moment.unix(accessToken.exp).toDate();
            const refreshToken = JWT(REFRESH_TOKEN);
            const refDate = moment.unix(refreshToken.exp).toDate();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: { access_token: ACCESS_TOKEN, refresh_token: REFRESH_TOKEN } });
            const expected = jasmine_marbles_1.cold('--(bcd)', { b: userAuthenticated, c: routerRedirect, d: toast });
            authService.login = jest.fn(() => response);
            expect(effects.loginUser$).toBeObservable(expected);
            expect(cookieService.set).toHaveBeenCalledWith('refresh_token', REFRESH_TOKEN, refDate, '/', undefined, false, 'Lax');
            expect(cookieService.set).toHaveBeenCalledWith('access_token', ACCESS_TOKEN, accDate, '/', undefined, false, 'Lax');
        });
        xit('should return LoginFailure when unable to parse JWT token', () => {
            const action = new auth_actions_1.Login({
                username: FAKE_USER,
                password: FAKE_PW,
                grant_type: 'password'
            });
            const error = new Error('ERROR!');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'form'
            });
            const err = new auth_actions_1.LoginFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: { access_token: 'bad-token', refresh_token: 'bad-token' } });
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: err });
            authService.login = jest.fn(() => response);
            expect(effects.loginUser$).toBeObservable(expected);
        });
        it('should return LoginFailure when user credentials are wrong', () => {
            const action = new auth_actions_1.Login({
                username: FAKE_USER,
                password: 'wrongpassword',
                grant_type: 'password'
            });
            const error = Error('Bad credentials');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'form',
                rawError: error
            });
            const err = new auth_actions_1.LoginFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: err });
            authService.login = jest.fn(() => response);
            expect(effects.loginUser$).toBeObservable(expected);
        });
    });
    describe('requestNewAccessToken', () => {
        it('should return UserAuthenticated & call CookieService.set, with access and refresh tokens, on success', () => {
            const action = new auth_actions_1.RequestNewAccessToken(REFRESH_TOKEN);
            const token = {
                accessToken: ACCESS_TOKEN,
                refreshToken: REFRESH_TOKEN
            };
            const outcome = new auth_actions_1.UserAuthenticated(token);
            const accessToken = JWT(ACCESS_TOKEN);
            const accDate = moment.unix(accessToken.exp).toDate();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: { access_token: ACCESS_TOKEN, refresh_token: REFRESH_TOKEN } });
            const expected = jasmine_marbles_1.cold('--b', { b: outcome });
            authService.refreshAccessToken = jest.fn(() => response);
            expect(effects.requestNewAccessToken$).toBeObservable(expected);
            expect(cookieService.set).toHaveBeenCalledWith('access_token', ACCESS_TOKEN, accDate, '/', undefined, false, 'Lax');
        });
        it('should return RequestNewAccessTokenFailure, with error, on failure', () => {
            const action = new auth_actions_1.RequestNewAccessToken(REFRESH_TOKEN);
            const error = {
                status: 400,
                error: {
                    error_description: 'Unable to reniew access token'
                }
            };
            const outcome = new error_actions_1.AddApplicationError({
                message: error.error.error_description,
                displayType: 'toast'
            });
            const logout = new auth_actions_1.Logout({ message: 'Unable to refresh access token, please login again' });
            const err = new auth_actions_1.RequestNewAccessTokenFailure(error);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('----(bcd)', { b: outcome, c: err, d: logout });
            authService.refreshAccessToken = jest.fn(() => response);
            setTimeout(() => expect(effects.requestNewAccessToken$).toBeObservable(expected), 5500);
        });
    });
    describe('logoutUser', () => {
        it('should return LogoutSuccess and RouterGo actions, & call CookieService.deleteAll, on success', () => {
            const action = new auth_actions_1.Logout();
            const logoutSuccess = new auth_actions_1.LogoutSuccess();
            const routerRedirect = new router_actions_1.RouterGo({ path: ['/user'] });
            const toast = new toast_actions_1.OpenToast({ message: 'Logged out', type: 'info' });
            const stopPolling = new notification_actions_1.StopNotificationPolling();
            const closeModal = new modal_actions_ts_1.CloseModal();
            actions = jasmine_marbles_1.hot('--a', { a: action });
            const expected = jasmine_marbles_1.cold('--(bcdef)', { b: stopPolling, c: closeModal, d: routerRedirect, e: toast, f: logoutSuccess });
            expect(effects.logoutUser$).toBeObservable(expected);
            expect(cookieService.delete).toHaveBeenCalledWith(enums_1.AuthKeys.RefreshTokenKey, '/', undefined);
            expect(cookieService.delete).toHaveBeenCalledWith(enums_1.AuthKeys.AccessTokenKey, '/', undefined);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5lZmZlY3RzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvYXV0aC9zdGF0ZS9hdXRoLmVmZmVjdHMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUFnRDtBQUNoRCxtREFBMkQ7QUFDM0QscURBQTRDO0FBQzVDLGtDQUFrQztBQUNsQyxpQ0FBaUM7QUFDakMsMkRBQW1EO0FBR25ELDZFQUFnRjtBQUNoRixtRkFBMEU7QUFFMUUsa0dBQWtHO0FBQ2xHLDBFQUFpRTtBQUNqRSx1RUFBZ0U7QUFDaEUsMkRBQXVEO0FBQ3ZELGlEQVF3QjtBQUN4QixpREFBNkM7QUFDN0MsbURBQW1EO0FBRW5ELE1BQU0sU0FBUyxHQUFHLHVCQUF1QixDQUFDO0FBQzFDLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQztBQUMzQiwyQ0FBMkM7QUFDM0MsTUFBTSxZQUFZLEdBQUcsNGpDQUE0akMsQ0FBQztBQUNsbEMsMkNBQTJDO0FBQzNDLE1BQU0sYUFBYSxHQUFHLHduQ0FBd25DLENBQUM7QUFFL29DLFFBQVEsQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFO0lBQzNCLElBQUksT0FBd0IsQ0FBQztJQUM3QixJQUFJLE9BQW9CLENBQUM7SUFDekIsSUFBSSxXQUF3QixDQUFDO0lBQzdCLElBQUksYUFBNEIsQ0FBQztJQUVqQyxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixTQUFTLEVBQUU7Z0JBQ1QsMEJBQVc7Z0JBQ1gsNEJBQWtCLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQztvQkFDRSxPQUFPLEVBQUUsMEJBQVc7b0JBQ3BCLFFBQVEsRUFBRTt3QkFDUixLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTt3QkFDaEIs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