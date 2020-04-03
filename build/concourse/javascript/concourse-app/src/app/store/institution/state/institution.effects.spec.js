"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/common/http/testing");
const testing_2 = require("@angular/core/testing");
const testing_3 = require("@ngrx/effects/testing");
const jasmine_marbles_1 = require("jasmine-marbles");
const rxjs_1 = require("rxjs");
const error_actions_1 = require("@concourse/core/error/state/error.actions");
const modal_1 = require("@concourse/core/modal");
const router_actions_1 = require("@concourse/core/router/router.actions");
const toast_actions_1 = require("@concourse/core/toast/toast.actions");
const auth_facade_1 = require("@concourse/store/auth/state/auth.facade");
const test_1 = require("@concourse/test");
const fakeInstitutions = require("../services/institution.faker");
const institution_service_1 = require("../services/institution.service");
const institution_actions_1 = require("./institution.actions");
const institution_effects_1 = require("./institution.effects");
describe('InstitutionEffects', () => {
    let actions;
    let effects;
    let service;
    beforeEach(() => {
        testing_2.TestBed.configureTestingModule({
            imports: [
                testing_1.HttpClientTestingModule
            ],
            providers: [
                institution_effects_1.InstitutionEffects,
                testing_3.provideMockActions(() => actions),
                {
                    provide: institution_service_1.InstitutionService,
                    useValue: {
                        list: jest.fn(),
                        get: jest.fn(),
                        invite: jest.fn(),
                        regenerateRegistration: jest.fn(),
                        validateRegistrationToken: jest.fn(),
                        register: jest.fn(),
                        ValidateInstToken: jest.fn(),
                        regenerateInvitation: jest.fn()
                    }
                },
                test_1.mockFacade(auth_facade_1.AuthFacade, {
                    isAuthenticated$: new rxjs_1.BehaviorSubject(true)
                })
            ]
        });
        effects = testing_2.TestBed.get(institution_effects_1.InstitutionEffects);
        service = testing_2.TestBed.get(institution_service_1.InstitutionService);
    });
    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
    describe('list institutions', () => {
        it('should return a LoadInstitutionsSuccess action, with array of institutions, on success', () => {
            const institutions = fakeInstitutions.fakeMany(5);
            const action = new institution_actions_1.LoadInstitutions();
            const outcome = new institution_actions_1.LoadInstitutionsSuccess(institutions);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: institutions });
            const expected = jasmine_marbles_1.cold('--b', { b: outcome });
            service.list = jest.fn(() => response);
            expect(effects.loadInstitutions$).toBeObservable(expected);
        });
        it('should return a LoadInstitutionsFailure action, with an error, on failure', () => {
            const action = new institution_actions_1.LoadInstitutions();
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const iError = new institution_actions_1.LoadInstitutionsFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: iError });
            service.list = jest.fn(() => response);
            expect(effects.loadInstitutions$).toBeObservable(expected);
        });
    });
    describe('get institution', () => {
        it('should return a LoadInstitutionSuccess action, with one institution, on success', () => {
            const institution = fakeInstitutions.fakeOne();
            const action = new institution_actions_1.LoadInstitution(institution.id);
            const outcome = new institution_actions_1.LoadInstitutionSuccess(institution);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: institution });
            const expected = jasmine_marbles_1.cold('--b', { b: outcome });
            service.get = jest.fn(() => response);
            expect(effects.loadInstitution$).toBeObservable(expected);
        });
        it('should return a LoadInstitutionsFailure action, with an error, on failure', () => {
            const institution = fakeInstitutions.fakeOne();
            const action = new institution_actions_1.LoadInstitution(institution.id);
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const iError = new institution_actions_1.LoadInstitutionFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: iError });
            service.get = jest.fn(() => response);
            expect(effects.loadInstitution$).toBeObservable(expected);
        });
    });
    describe('invite institution', () => {
        it('should return an InviteInstitutionSuccess action, with one institution, on success', () => {
            const institution = fakeInstitutions.fakeOne();
            const action = new institution_actions_1.InviteInstitution({ institutionName: institution.institutionName, accountEmail: institution.accountEmail });
            const outcome = new institution_actions_1.InviteInstitutionSuccess(institution);
            const closeModal = new modal_1.CloseModal();
            const toast = new toast_actions_1.OpenToast({
                message: 'An invitation has been sent to the institution Email account. Please check email for invitation',
                type: 'success'
            });
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: institution });
            const expected = jasmine_marbles_1.cold('--(bcd)', { b: outcome, c: closeModal, d: toast });
            service.invite = jest.fn(() => response);
            expect(effects.inviteInstitution$).toBeObservable(expected);
        });
        it('should return an InviteInstitutionFailure action, with an error, on failure', () => {
            const institution = fakeInstitutions.fakeOne();
            const action = new institution_actions_1.InviteInstitution({ institutionName: institution.institutionName, accountEmail: institution.accountEmail });
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'form',
                rawError: error
            });
            const iError = new institution_actions_1.InviteInstitutionFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: iError });
            service.invite = jest.fn(() => response);
            expect(effects.inviteInstitution$).toBeObservable(expected);
        });
    });
    describe('register institution', () => {
        it('should return an RegisterInstitutionSuccess action, with one institution, on success', () => {
            const registerInstitution = fakeInstitutions.fakeOne();
            const action = new institution_actions_1.RegisterInstitution({ institutionName: registerInstitution.institutionName, accountEmail: registerInstitution.accountEmail });
            const registerSuccess = new institution_actions_1.RegisterInstitutionSuccess(registerInstitution);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: registerInstitution });
            const expected = jasmine_marbles_1.cold('--(b)', { b: registerSuccess });
            service.register = jest.fn(() => response);
            expect(effects.registerInstitution$).toBeObservable(expected);
        });
        it('should return an RegisterInstitutionFailure action, with an error, on failure', () => {
            const registerInstitution = fakeInstitutions.fakeOne();
            const action = new institution_actions_1.RegisterInstitution({ institutionName: registerInstitution.institutionName, accountEmail: registerInstitution.accountEmail });
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'form',
                rawError: error
            });
            const iError = new institution_actions_1.RegisterInstitutionFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: iError });
            service.register = jest.fn(() => response);
            expect(effects.registerInstitution$).toBeObservable(expected);
        });
    });
    describe('validate Registration', () => {
        const token = 'testToken';
        const registerInstitution = fakeInstitutions.fakeOne();
        it('should return an validateRegistration action, with one institution, on success', () => {
            const action = new institution_actions_1.ValidateRegistrationConfirmToken(token);
            const registerSuccess = new institution_actions_1.ValidateRegistrationConfirmTokenSuccess(registerInstitution);
            const routerRedirect = new router_actions_1.RouterGo({ path: ['/'] });
            const toast = new toast_actions_1.OpenToast({ message: 'Account Confirmed, Please login.', type: 'success' });
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: registerInstitution });
            const expected = jasmine_marbles_1.cold('--(bcd)', { b: toast, c: registerSuccess, d: routerRedirect });
            service.validateRegistrationToken = jest.fn(() => response);
            expect(effects.validateRegistrationToken$).toBeObservable(expected);
        });
        it('should return an validateRegistration action, with an error, on failure', () => {
            const action = new institution_actions_1.ValidateRegistrationConfirmToken(token);
            const routerRedirect = new router_actions_1.RouterGo({ path: ['/institution/registration-expire'] });
            const error = {
                status: 401,
                message: 'error'
            };
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const iError = new institution_actions_1.ValidateRegistrationConfirmTokenFailure(token);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bcd)', { b: outcome, c: routerRedirect, d: iError });
            service.validateRegistrationToken = jest.fn(() => response);
            expect(effects.validateRegistrationToken$).toBeObservable(expected);
        });
    });
    describe('regenerate Registration', () => {
        const token = 'testToken';
        const registerInstitution = fakeInstitutions.fakeOne();
        it('should return an RegenerateRegistration action, with one institution, on success', () => {
            const action = new institution_actions_1.RegenerateRegistration(token);
            const registerSuccess = new institution_actions_1.RegenerateRegistrationSuccess(registerInstitution);
            const toast = new toast_actions_1.OpenToast({ message: 'Registration resent successfully.', type: 'success' });
            const routerRedirect = new router_actions_1.RouterGo({ path: ['/'] });
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: registerInstitution });
            const expected = jasmine_marbles_1.cold('--(bcd)', { b: registerSuccess, c: toast, d: routerRedirect });
            service.regenerateRegistration = jest.fn(() => response);
            expect(effects.regenerateRegistration$).toBeObservable(expected);
        });
        it('should return an RegenerateRegistration action, with an error, on failure', () => {
            const action = new institution_actions_1.RegenerateRegistration(token);
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const iError = new institution_actions_1.RegenerateRegistrationFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: iError });
            service.regenerateRegistration = jest.fn(() => response);
            expect(effects.regenerateRegistration$).toBeObservable(expected);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGl0dXRpb24uZWZmZWN0cy5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2luc3RpdHV0aW9uL3N0YXRlL2luc3RpdHV0aW9uLmVmZmVjdHMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBEQUF1RTtBQUN2RSxtREFBZ0Q7QUFDaEQsbURBQTJEO0FBRTNELHFEQUE0QztBQUM1QywrQkFBbUQ7QUFFbkQsNkVBQWdGO0FBQ2hGLGlEQUFtRDtBQUNuRCwwRUFBaUU7QUFDakUsdUVBQWdFO0FBQ2hFLHlFQUFxRTtBQUNyRSwwQ0FBNkM7QUFDN0Msa0VBQWtFO0FBQ2xFLHlFQUFxRTtBQUNyRSwrREFtQitCO0FBQy9CLCtEQUEyRDtBQUUzRCxRQUFRLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxFQUFFO0lBQ2xDLElBQUksT0FBd0IsQ0FBQztJQUM3QixJQUFJLE9BQTJCLENBQUM7SUFDaEMsSUFBSSxPQUEyQixDQUFDO0lBRWhDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRTtnQkFDUCxpQ0FBdUI7YUFDeEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1Qsd0NBQWtCO2dCQUNsQiw0QkFBa0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pDO29CQUNFLE9BQU8sRUFBRSx3Q0FBa0I7b0JBQzNCLFFBQVEsRUFBRTt3QkFDUixJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTt3QkFDZixHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTt3QkFDZCxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTt3QkFDakIsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTt3QkFDakMseUJBQXlCLEVBQUUs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