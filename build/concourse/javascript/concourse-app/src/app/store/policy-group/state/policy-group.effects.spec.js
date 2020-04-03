"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@ngrx/effects/testing");
const store_1 = require("@ngrx/store");
const jasmine_marbles_1 = require("jasmine-marbles");
const error_actions_1 = require("@concourse/core/error/state/error.actions");
const modal_1 = require("@concourse/core/modal");
const router_actions_1 = require("@concourse/core/router/router.actions");
const toast_actions_1 = require("@concourse/core/toast/toast.actions");
const helpers_1 = require("@concourse/shared/helpers");
const fakeGroups = require("@concourse/store/group/services/group.faker");
const fakePolicyGroupTemplate = require("@concourse/store/policy-group-template/services/policy-group-template.faker");
const fakePolicyGroups = require("@concourse/store/policy-group/services/policy-group.faker");
const policy_group_service_1 = require("@concourse/store/policy-group/services/policy-group.service");
const policy_group_actions_1 = require("@concourse/store/policy-group/state/policy-group.actions");
const policy_group_effects_1 = require("@concourse/store/policy-group/state/policy-group.effects");
const policy_group_facade_1 = require("@concourse/store/policy-group/state/policy-group.facade");
const fromPolicyGroup = require("@concourse/store/policy-group/state/policy-group.reducer");
const fakePolicyTemplates = require("@concourse/store/policy-template/services/policy-template.faker");
const fakePolicies = require("@concourse/store/policy/services/policy.faker");
const fakeSurfaceLayers = require("@concourse/store/surface-layer/services/surface-layer.faker");
const test_1 = require("@concourse/test");
xdescribe('PolicyGroupEffects', () => {
    const surfaceLayers = fakeSurfaceLayers.fakeMany();
    const policyTemplates = fakePolicyTemplates.fakeAll();
    const policies = fakePolicies.fakeMany(policyTemplates, fakeGroups.fakeMany(), surfaceLayers);
    const policyGroupTemplates = fakePolicyGroupTemplate.fakeMany(policyTemplates, 10);
    const policyGroups = fakePolicyGroups.fakeMany(policyGroupTemplates, policies, surfaceLayers, [], fakeGroups.fakeOne());
    let actions;
    let effects;
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                store_1.StoreModule.forRoot({
                    policyGroup: fromPolicyGroup.reducer
                })
            ],
            providers: [
                test_1.mockFacade(policy_group_facade_1.PolicyGroupFacade),
                policy_group_effects_1.PolicyGroupEffects,
                testing_2.provideMockActions(() => actions),
                {
                    provide: policy_group_service_1.PolicyGroupService,
                    useValue: {
                        list: jest.fn(),
                        listBySurfaceLayerIds: jest.fn(),
                        get: jest.fn(),
                        delete: jest.fn()
                    }
                }
            ]
        });
        effects = testing_1.TestBed.get(policy_group_effects_1.PolicyGroupEffects);
        service = testing_1.TestBed.get(policy_group_service_1.PolicyGroupService);
    });
    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
    describe('loadPolicyGroups$', () => {
        it('should return a LoadPolicyGroupsSuccess, with an array of policygroups, on success', () => {
            const action = new policy_group_actions_1.LoadPolicyGroups();
            const outcome = new policy_group_actions_1.LoadPolicyGroupsSuccess(policyGroups);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: policyGroups });
            const expected = jasmine_marbles_1.cold('--b', { b: outcome });
            service.list = jest.fn(() => response);
            expect(effects.loadPolicyGroups$).toBeObservable(expected);
        });
        it('should return a LoadPolicyGroupsFailure, with an error, on failure', () => {
            const action = new policy_group_actions_1.LoadPolicyGroups();
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const err = new policy_group_actions_1.LoadPolicyGroupFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: err });
            service.list = jest.fn(() => response);
            expect(effects.loadPolicyGroups$).toBeObservable(expected);
        });
    });
    describe('loadPolicyGroup$', () => {
        it('should return a LoadPolicyGroupSuccess, with a single policy group, on success', () => {
            const [policyGroup] = policyGroups;
            const action = new policy_group_actions_1.LoadPolicyGroup(policyGroup.id);
            const outcome = new policy_group_actions_1.LoadPolicyGroupSuccess(policyGroup);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: policyGroup });
            const expected = jasmine_marbles_1.cold('--b', { b: outcome });
            service.get = jest.fn(() => response);
            expect(effects.loadPolicyGroup$).toBeObservable(expected);
        });
        it('should return a LoadGroupFailure, with an error, on failure', () => {
            const action = new policy_group_actions_1.LoadPolicyGroup(10001);
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const err = new policy_group_actions_1.LoadPolicyGroupFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: err });
            service.get = jest.fn(() => response);
            expect(effects.loadPolicyGroup$).toBeObservable(expected);
        });
    });
    describe('loadPolicyGroupsBySurfaceLayer$', () => {
        it('should return a LoadPolicyGroupsBySurfaceLayerIdsSuccess, with an array of Policy Groups, on success', () => {
            const action = new policy_group_actions_1.LoadPolicyGroupsBySurfaceLayerIds([surfaceLayers[0].id]);
            const outcome = new policy_group_actions_1.LoadPolicyGroupsBySurfaceLayerIdsSuccess(policyGroups);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: policyGroups });
            const expected = jasmine_marbles_1.cold('--b', { b: outcome });
            service.listBySurfaceLayerIds = jest.fn(() => response);
            expect(effects.loadPolicyGroupsBySurfaceLayer$).toBeObservable(expected);
        });
        it('should return a LoadPolicyGroupsBySurfaceLayerIdsFailure, with an error, on failure', () => {
            const action = new policy_group_actions_1.LoadPolicyGroupsBySurfaceLayerIds([surfaceLayers[0].id]);
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const err = new policy_group_actions_1.LoadPolicyGroupsBySurfaceLayerIdsFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: err });
            service.listBySurfaceLayerIds = jest.fn(() => response);
            expect(effects.loadPolicyGroupsBySurfaceLayer$).toBeObservable(expected);
        });
    });
    describe('createPolicyGroup$', () => {
        it('should return a CreatePolicyGroupSuccess, on success', () => {
            const [policyGroup] = policyGroups;
            const action = new policy_group_actions_1.CreatePolicyGroup({
                policyGroup: Object.assign({ id: policyGroup.id }, policyGroup),
                versionBump: 'MAJOR'
            });
            const outcome = new policy_group_actions_1.CreatePolicyGroupSuccess(policyGroup);
            const closeModal = new modal_1.CloseModal();
            const toast = new toast_actions_1.OpenToast({ message: 'Policy Group Created Successfully', type: 'success' });
            const redirect = new router_actions_1.RouterGo({ path: [`/policy-groups/${policyGroup.id}`] });
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: policyGroup });
            const expected = jasmine_marbles_1.cold('--(bcde)', { b: outcome, c: closeModal, d: toast, e: redirect });
            service.create = jest.fn(() => response);
            expect(effects.createPolicyGroup$).toBeObservable(expected);
        });
        it('should return a CreatePolicyGroupFailure, with an error, on failure', () => {
            const [policyGroup] = policyGroups;
            const action = new policy_group_actions_1.CreatePolicyGroup({
                policyGroup: Object.assign({ id: policyGroup.id += 1 }, policyGroup),
                versionBump: 'MAJOR'
            });
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'form',
                rawError: error
            });
            const err = new policy_group_actions_1.CreatePolicyGroupFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: err });
            service.create = jest.fn(() => response);
            expect(effects.createPolicyGroup$).toBeObservable(expected);
        });
    });
    describe('deletePolicyGroup$', () => {
        it('should return a DeletePolicyGroupSuccess, with deleted policygroup id, on success', () => {
            const policyGroupId = { id: 10001 };
            const action = new policy_group_actions_1.DeletePolicyGroup(10001);
            const outcome = new policy_group_actions_1.DeletePolicyGroupSuccess(10001);
            const toast = new toast_actions_1.OpenToast({ message: 'Policy Group Deleted Successfully', type: 'success' });
            const redirect = new router_actions_1.RouterGo({ path: ['/policy-groups/'] });
            const closeModal = new modal_1.CloseModal();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: undefined });
            const expected = jasmine_marbles_1.cold('--(bcde)', { b: outcome, c: toast, d: closeModal, e: redirect });
            service.delete = jest.fn(() => response);
            expect(effects.deletePolicyGroup$).toBeObservable(expected);
        });
        it('should return a DeletePolicyGroupPending, with deleted policyGroup object, on success', () => {
            const [policyGroup] = helpers_1.sample(policyGroups, 1);
            const action = new policy_group_actions_1.DeletePolicyGroup(policyGroup.id);
            const outcome = new policy_group_actions_1.DeletePolicyGroupPending(policyGroup);
            const closeModal = new modal_1.CloseModal();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: policyGroup });
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: closeModal });
            service.delete = jest.fn(() => response);
            expect(effects.deletePolicyGroup$).toBeObservable(expected);
        });
        it('should return a DeletePolicyGroupFailure, with an error, on failure', () => {
            const action = new policy_group_actions_1.DeletePolicyGroup(1);
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'form',
                rawError: error
            });
            const err = new policy_group_actions_1.DeletePolicyGroupFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: err });
            service.delete = jest.fn(() => response);
            expect(effects.deletePolicyGroup$).toBeObservable(expected);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LWdyb3VwLmVmZmVjdHMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9wb2xpY3ktZ3JvdXAvc3RhdGUvcG9saWN5LWdyb3VwLmVmZmVjdHMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUFnRDtBQUNoRCxtREFBMkQ7QUFDM0QsdUNBQTBDO0FBRTFDLHFEQUE0QztBQUc1Qyw2RUFBZ0Y7QUFDaEYsaURBQW1EO0FBRW5ELDBFQUFpRTtBQUNqRSx1RUFBZ0U7QUFDaEUsdURBQW1EO0FBQ25ELDBFQUEwRTtBQUMxRSx1SEFBdUg7QUFDdkgsOEZBQThGO0FBQzlGLHNHQUFpRztBQUNqRyxtR0FnQmtFO0FBQ2xFLG1HQUE4RjtBQUM5RixpR0FBNEY7QUFDNUYsNEZBQTRGO0FBQzVGLHVHQUF1RztBQUN2Ryw4RUFBOEU7QUFDOUUsaUdBQWlHO0FBQ2pHLDBDQUE2QztBQUU3QyxTQUFTLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxFQUFFO0lBQ25DLE1BQU0sYUFBYSxHQUFtQixpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNuRSxNQUFNLGVBQWUsR0FBcUIsbUJBQW1CLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDeEUsTUFBTSxRQUFRLEdBQWEsWUFBWSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLFFBQVEsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ3hHLE1BQU0sb0JBQW9CLEdBQTBCLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDMUcsTUFBTSxZQUFZLEdBQWtCLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxVQUFVLENBQUMsT0FB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