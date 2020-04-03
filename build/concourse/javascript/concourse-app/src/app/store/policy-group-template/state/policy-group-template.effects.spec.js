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
const facades_1 = require("@concourse/store/facades");
const fakePolicyGroupTemplate = require("@concourse/store/policy-group-template/services/policy-group-template.faker");
const policy_group_template_service_1 = require("@concourse/store/policy-group-template/services/policy-group-template.service");
const policy_group_template_actions_1 = require("@concourse/store/policy-group-template/state/policy-group-template.actions");
const policy_group_template_effects_1 = require("@concourse/store/policy-group-template/state/policy-group-template.effects");
const fakePolicyTemplate = require("@concourse/store/policy-template/services/policy-template.faker");
const test_1 = require("@concourse/test");
describe('PolicyGroupTemplateEffects', () => {
    let actions;
    let effects;
    let service;
    beforeEach(() => {
        testing_2.TestBed.configureTestingModule({
            imports: [
                testing_1.HttpClientTestingModule
            ],
            providers: [
                policy_group_template_effects_1.PolicyGroupTemplateEffects,
                test_1.mockFacade(facades_1.PolicyGroupTemplateFacade),
                testing_3.provideMockActions(() => actions),
                {
                    provide: policy_group_template_service_1.PolicyGroupTemplateService,
                    useValue: {
                        list: jest.fn(),
                        get: jest.fn(),
                        delete: jest.fn(),
                        update: jest.fn(),
                        removePolicyTemplateFromPolicyGroupTemplate: jest.fn(),
                        searchPolicyGroupTemplate: jest.fn(),
                        create: jest.fn()
                    }
                }
            ]
        });
        effects = testing_2.TestBed.get(policy_group_template_effects_1.PolicyGroupTemplateEffects);
        service = testing_2.TestBed.get(policy_group_template_service_1.PolicyGroupTemplateService);
    });
    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
    describe('list policy template groups', () => {
        it('should return a LoadPolicyGroupTemplatesSuccess action, with array of policy template groups, on success', () => {
            const policyTemplates = fakePolicyTemplate.fakeAll();
            const policyGroupTemplates = fakePolicyGroupTemplate.fakeMany(policyTemplates, 5);
            const action = new policy_group_template_actions_1.LoadPolicyGroupTemplates();
            const outcome = new policy_group_template_actions_1.LoadPolicyGroupTemplatesSuccess(policyGroupTemplates);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: policyGroupTemplates });
            const expected = jasmine_marbles_1.cold('--b', { b: outcome });
            service.list = jest.fn(() => response);
            expect(effects.loadPolicyGroupTemplates$).toBeObservable(expected);
        });
        it('should return a LoadPolicyGroupTemplatesFailure action, with an error, on failure', () => {
            const action = new policy_group_template_actions_1.LoadPolicyGroupTemplates();
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const err = new policy_group_template_actions_1.LoadPolicyGroupTemplatesFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: err });
            service.list = jest.fn(() => response);
            expect(effects.loadPolicyGroupTemplates$).toBeObservable(expected);
        });
    });
    describe('loadPolicyGroupTemplate$', () => {
        it('should return a LoadPolicyGroupTemplateSuccess, with a single PolicyGroupTemplate, on success', () => {
            const policyGroupTemplate = fakePolicyGroupTemplate.fakeOne();
            const action = new policy_group_template_actions_1.LoadPolicyGroupTemplate(policyGroupTemplate.id);
            const outcome = new policy_group_template_actions_1.LoadPolicyGroupTemplateSuccess(policyGroupTemplate);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: policyGroupTemplate });
            const expected = jasmine_marbles_1.cold('--b', { b: outcome });
            service.get = jest.fn(() => response);
            expect(effects.loadPolicyGroupTemplate$).toBeObservable(expected);
        });
        it('should return a LoadPolicyGroupTemplateFailure, with an error, on failure', () => {
            const action = new policy_group_template_actions_1.LoadPolicyGroupTemplate(100);
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const err = new policy_group_template_actions_1.LoadPolicyGroupTemplateFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: err });
            service.get = jest.fn(() => response);
            expect(effects.loadPolicyGroupTemplate$).toBeObservable(expected);
        });
    });
    describe('deletePolicyGroupTemplate$', () => {
        it('should return a DeletePolicyGroupTemplateSuccess, with deleted PolicyGroupTemplate id, on success', () => {
            const policyGroupTemplateId = 100;
            const action = new policy_group_template_actions_1.DeletePolicyGroupTemplate(policyGroupTemplateId);
            const outcome = new policy_group_template_actions_1.DeletePolicyGroupTemplateSuccess(policyGroupTemplateId);
            const openSuccessToaster = new toast_actions_1.OpenToast({ message: 'Policy Group Template Deleted Successfully', type: 'success' });
            const routerRedirect = new router_actions_1.RouterGo({ path: ['/policy-group-templates'] });
            const closeModal = new modal_1.CloseModal();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: policyGroupTemplateId });
            const expected = jasmine_marbles_1.cold('--(bcde)', { b: outcome, c: openSuccessToaster, d: closeModal, e: routerRedirect });
            service.delete = jest.fn(() => response);
            expect(effects.deletePolicyGroupTemplate$).toBeObservable(expected);
        });
        it('should return a DeletePolicyGroupTemplateFailure, with an error, on failure', () => {
            const action = new policy_group_template_actions_1.DeletePolicyGroupTemplate(100);
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'form',
                rawError: error
            });
            const err = new policy_group_template_actions_1.DeletePolicyGroupTemplateFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: err });
            service.delete = jest.fn(() => response);
            expect(effects.deletePolicyGroupTemplate$).toBeObservable(expected);
        });
    });
    describe('removePolicyTemplateFromPolicyGroupTemplate$', () => {
        it('should return a RemovePolicyTemplateFromPolicyGroupTemplateSuccess, with updated PolicyGroupTemplate, on success', () => {
            const policyTemplates = fakePolicyTemplate.fakeAll();
            const policyGroupTemplate = fakePolicyGroupTemplate.fakeOne();
            policyGroupTemplate.policyTemplates = policyTemplates.map(item => item);
            const updatedPolicyGroupTemplate = Object.assign(Object.assign({}, policyGroupTemplate), { policyTemplates: [...policyGroupTemplate.policyTemplates.filter(u => u.id !== policyTemplates[1].id)] });
            const action = new policy_group_template_actions_1.RemovePolicyTemplateFromPolicyGroupTemplate({
                policyGroupTemplateId: policyGroupTemplate.id,
                policyTemplateId: policyTemplates[1].id
            });
            const outcome = new policy_group_template_actions_1.RemovePolicyTemplateFromPolicyGroupTemplateSuccess(updatedPolicyGroupTemplate);
            const openSuccessToaster = new toast_actions_1.OpenToast({ message: 'Policy Template Removed Successfully', type: 'success' });
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: updatedPolicyGroupTemplate });
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: openSuccessToaster });
            service.removePolicyTemplateFromPolicyGroupTemplate = jest.fn(() => response);
            expect(effects.removePolicyTemplateFromPolicyGroupTemplate$).toBeObservable(expected);
        });
        it('should return a RemovePolicyTemplateFromPolicyGroupTemplateFailure, with an error, on failure', () => {
            const policyTemplates = [
                { id: 1, name: 'Financial', description: 'test' },
                { id: 2, name: 'private', description: 'test' }
            ];
            const policyGroupTemplate = fakePolicyGroupTemplate.fakeOne();
            const action = new policy_group_template_actions_1.RemovePolicyTemplateFromPolicyGroupTemplate({
                policyGroupTemplateId: policyGroupTemplate.id,
                policyTemplateId: policyTemplates[1].id
            });
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const err = new policy_group_template_actions_1.RemovePolicyTemplateFromPolicyGroupTemplateFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: err });
            service.removePolicyTemplateFromPolicyGroupTemplate = jest.fn(() => response);
            expect(effects.removePolicyTemplateFromPolicyGroupTemplate$).toBeObservable(expected);
        });
    });
    describe('updatePolicyGroupTemplate$', () => {
        it('should return a UpdatePolicyGroupTemplateSuccess, with updated PolicyGroupTemplate, on success', () => {
            const newPolicyGroupTemplate = fakePolicyGroupTemplate.fakeOne();
            const action = new policy_group_template_actions_1.UpdatePolicyGroupTemplate({ newPolicyGroupTemplate, versionBump: 'MAJOR' });
            const outcome = new policy_group_template_actions_1.UpdatePolicyGroupTemplateSuccess(newPolicyGroupTemplate);
            const closeModal = new modal_1.CloseModal();
            const toast = new toast_actions_1.OpenToast({ message: 'Policy Group Template Updated Successfully', type: 'success' });
            // const redirect = new RouterGo({ path: [`/policy-group-templates/${newPolicyGroupTemplate.id}`] });
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: newPolicyGroupTemplate });
            const expected = jasmine_marbles_1.cold('--(bcd)', { b: outcome, c: closeModal, d: toast });
            service.update = jest.fn(() => response);
            expect(effects.updatePolicyGroupTemplate$).toBeObservable(expected);
        });
        it('should return a UpdatePolicyGroupTemplateFailure, with an error, on failure', () => {
            const newPolicyGroupTemplate = fakePolicyGroupTemplate.fakeOne();
            const action = new policy_group_template_actions_1.UpdatePolicyGroupTemplate({ newPolicyGroupTemplate, versionBump: 'MAJOR' });
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'form',
                rawError: error
            });
            const err = new policy_group_template_actions_1.UpdatePolicyGroupTemplateFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: err });
            service.update = jest.fn(() => response);
            expect(effects.updatePolicyGroupTemplate$).toBeObservable(expected);
        });
    });
    describe('createPolicyGroupTemplate$', () => {
        it('should return a CreatePolicyGroupTemplateSuccess, with created PolicyGroupTemplate, on success', () => {
            const policyGroupTemplate = fakePolicyGroupTemplate.fakeOne();
            const action = new policy_group_template_actions_1.CreatePolicyGroupTemplate({ newPgt: { name: policyGroupTemplate.name }, versionBump: 'MAJOR' });
            const outcome = new policy_group_template_actions_1.CreatePolicyGroupTemplateSuccess(policyGroupTemplate);
            const closeModal = new modal_1.CloseModal();
            const toast = new toast_actions_1.OpenToast({ message: 'Policy Group Template Created Successfully', type: 'success' });
            const redirect = new router_actions_1.RouterGo({ path: [`/policy-group-templates/${policyGroupTemplate.id}`] });
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: policyGroupTemplate });
            const expected = jasmine_marbles_1.cold('--(bcde)', { b: outcome, c: closeModal, d: toast, e: redirect });
            service.create = jest.fn(() => response);
            expect(effects.createPolicyGroupTemplate$).toBeObservable(expected);
        });
        it('should return a CreatePolicyGroupTemplateFailure, with an error, on failure', () => {
            const policyGroupTemplate = fakePolicyGroupTemplate.fakeOne();
            const action = new policy_group_template_actions_1.CreatePolicyGroupTemplate({ newPgt: { name: policyGroupTemplate.name }, versionBump: 'MAJOR' });
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'form',
                rawError: error
            });
            const err = new policy_group_template_actions_1.CreatePolicyGroupTemplateFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: err });
            service.create = jest.fn(() => response);
            expect(effects.createPolicyGroupTemplate$).toBeObservable(expected);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LWdyb3VwLXRlbXBsYXRlLmVmZmVjdHMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9wb2xpY3ktZ3JvdXAtdGVtcGxhdGUvc3RhdGUvcG9saWN5LWdyb3VwLXRlbXBsYXRlLmVmZmVjdHMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBEQUF1RTtBQUN2RSxtREFBZ0Q7QUFDaEQsbURBQTJEO0FBRTNELHFEQUE0QztBQUc1Qyw2RUFBZ0Y7QUFDaEYsaURBQW1EO0FBQ25ELDBFQUFpRTtBQUNqRSx1RUFBZ0U7QUFDaEUsc0RBQXFFO0FBQ3JFLHVIQUF1SDtBQUN2SCxpSUFBMkg7QUFDM0gsOEhBbUJvRjtBQUNwRiw4SEFBd0g7QUFDeEgsc0dBQXNHO0FBQ3RHLDBDQUE2QztBQUU3QyxRQUFRLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxFQUFFO0lBQzFDLElBQUksT0FBd0IsQ0FBQztJQUM3QixJQUFJLE9BQW1DLENBQUM7SUFDeEMsSUFBSSxPQUFtQyxDQUFDO0lBRXhDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRTtnQkFDUCxpQ0FBdUI7YUFDeEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsMERBQTBCO2dCQUMxQixpQkFBVSxDQUFDLG1DQUF5QixDQUFDO2dCQUNyQyw0QkFBa0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pDO29CQUNFLE9BQU8sRUFBRSwwREFBMEI7b0JBQ25DLFFBQVEsRUFBRTt3QkFDUixJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTt3QkFDZixHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTt3QkFDZCxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFB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