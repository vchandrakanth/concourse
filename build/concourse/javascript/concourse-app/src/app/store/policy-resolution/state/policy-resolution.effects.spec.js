"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@ngrx/effects/testing");
const jasmine_marbles_1 = require("jasmine-marbles");
const error_actions_1 = require("@concourse/core/error/state/error.actions");
const fakeGroups = require("@concourse/store/group/services/group.faker");
const fakePolicyGroupTemplates = require("@concourse/store/policy-group-template/services/policy-group-template.faker");
const fakePolicyGroups = require("@concourse/store/policy-group/services/policy-group.faker");
const policy_group_actions_1 = require("@concourse/store/policy-group/state/policy-group.actions");
const fakePolicyTemplates = require("@concourse/store/policy-template/services/policy-template.faker");
const policy_violation_actions_1 = require("@concourse/store/policy-violation/state/policy-violation.actions");
const fakePolicies = require("@concourse/store/policy/services/policy.faker");
const fakeSurfaceLayers = require("@concourse/store/surface-layer/services/surface-layer.faker");
const fakeUsers = require("@concourse/store/user/services/user.faker");
const test_1 = require("@concourse/test");
const fakePolicyResolutions = require("../services/policy-resolution.faker");
const policy_resolution_service_1 = require("../services/policy-resolution.service");
const policy_resolution_actions_1 = require("./policy-resolution.actions");
const policy_resolution_effects_1 = require("./policy-resolution.effects");
const policy_resolution_facade_1 = require("./policy-resolution.facade");
describe('PolicyResolutionEffects', () => {
    let actions;
    let effects;
    let service;
    let users;
    let groups;
    let surfaceLayers;
    let policyTemplates;
    let policies;
    let policyGroupTemplates;
    let policyGroups;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [
                policy_resolution_effects_1.PolicyResolutionEffects,
                testing_2.provideMockActions(() => actions), {
                    provide: policy_resolution_service_1.PolicyResolutionService,
                    useValue: {
                        list: jest.fn(),
                        getPolicyResolution: jest.fn(),
                        updateWorkflowOperation: jest.fn()
                    }
                },
                test_1.mockFacade(policy_resolution_facade_1.PolicyResolutionFacade)
            ]
        });
        effects = testing_1.TestBed.get(policy_resolution_effects_1.PolicyResolutionEffects);
        service = testing_1.TestBed.get(policy_resolution_service_1.PolicyResolutionService);
        users = fakeUsers.fakeMany();
        groups = fakeGroups.fakeMany();
        surfaceLayers = fakeSurfaceLayers.fakeMany();
        policyTemplates = fakePolicyTemplates.fakeAll();
        policies = fakePolicies.fakeMany(policyTemplates, groups, surfaceLayers);
        policyGroupTemplates = fakePolicyGroupTemplates.fakeMany(policyTemplates, 5);
        policyGroups = fakePolicyGroups.fakeMany(policyGroupTemplates, policies, surfaceLayers, [], fakeGroups.fakeOne());
    });
    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
    describe('loadPolicyViolationRequests$', () => {
        it('should return LoadPolicyResolution with an array of policy resolutions', () => {
            const policyResolutions = fakePolicyResolutions.fakeMany(surfaceLayers, policyGroups, users);
            const action = new policy_resolution_actions_1.LoadPolicyResolutions();
            const outcome = new policy_resolution_actions_1.LoadPolicyResolutionsSuccess(policyResolutions);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: policyResolutions });
            const expected = jasmine_marbles_1.cold('--b', { b: outcome });
            service.list = jest.fn(() => response);
            expect(effects.loadPolicyViolationRequests$).toBeObservable(expected);
        });
        it('should return a LoadPolicyResolutionFailure with an error when it fails', () => {
            const action = new policy_resolution_actions_1.LoadPolicyResolutions();
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const err = new policy_resolution_actions_1.LoadPolicyResolutionsFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: err });
            service.list = jest.fn(() => response);
            expect(effects.loadPolicyViolationRequests$).toBeObservable(expected);
        });
    });
    describe('loadPolicyResolution$', () => {
        it('should return a LoadPolicyResolutionSuccess', () => {
            let policyResolution = fakePolicyResolutions.fakeOne(surfaceLayers[0].id, policyGroups[0].id, users);
            policyResolution = Object.assign(Object.assign({}, policyResolution), { policyViolationType: 'POLICY_GROUP' });
            const action = new policy_resolution_actions_1.LoadPolicyResolution(policyResolution.id);
            const outcome = new policy_resolution_actions_1.LoadPolicyResolutionSuccess(policyResolution);
            const policyViolationAction = new policy_violation_actions_1.EvaluateSavedPolicyGroup(policyResolution.policyGroupId);
            const loadPolicyGroup = new policy_group_actions_1.LoadPolicyGroup(policyResolution.policyGroupId);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: policyResolution });
            const expected = jasmine_marbles_1.cold('--(bcd)', { b: outcome, c: loadPolicyGroup, d: policyViolationAction });
            service.getPolicyResolution = jest.fn(() => response);
            expect(effects.loadPolicyResolution$).toBeObservable(expected);
        });
        it('should return LoadPolicyResolutionByResolutionRequestIdFailure with an error when it fails', () => {
            const action = new policy_resolution_actions_1.LoadPolicyResolution(0);
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const err = new policy_resolution_actions_1.LoadPolicyResolutionFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: err });
            service.getPolicyResolution = jest.fn(() => response);
            expect(effects.loadPolicyResolution$).toBeObservable(expected);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXJlc29sdXRpb24uZWZmZWN0cy5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL3BvbGljeS1yZXNvbHV0aW9uL3N0YXRlL3BvbGljeS1yZXNvbHV0aW9uLmVmZmVjdHMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUFnRDtBQUNoRCxtREFBMkQ7QUFFM0QscURBQTRDO0FBRzVDLDZFQUFnRjtBQVdoRiwwRUFBMEU7QUFDMUUsd0hBQXdIO0FBQ3hILDhGQUE4RjtBQUM5RixtR0FBMkY7QUFDM0YsdUdBQXVHO0FBQ3ZHLCtHQUE0RztBQUM1Ryw4RUFBOEU7QUFDOUUsaUdBQWlHO0FBQ2pHLHVFQUF1RTtBQUN2RSwwQ0FBNkM7QUFDN0MsNkVBQTZFO0FBQzdFLHFGQUFnRjtBQUNoRiwyRUFPcUM7QUFDckMsMkVBQXNFO0FBQ3RFLHlFQUFvRTtBQUVwRSxRQUFRLENBQUMseUJBQXlCLEVBQUUsR0FBRyxFQUFFO0lBQ3ZDLElBQUksT0FBd0IsQ0FBQztJQUM3QixJQUFJLE9BQWdDLENBQUM7SUFDckMsSUFBSSxPQUFnQyxDQUFDO0lBQ3JDLElBQUksS0FBYSxDQUFDO0lBQ2xCLElBQUksTUFBZSxDQUFDO0lBQ3BCLElBQUksYUFBNkIsQ0FBQztJQUNsQyxJQUFJLGVBQWlDLENBQUM7SUFDdEMsSUFBSSxRQUFrQixDQUFDO0lBQ3ZCLElBQUksb0JBQTJDLENBQUM7SUFDaEQsSUFBSSxZQUEyQixDQUFDO0lBRWhDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLFNBQVMsRUFBRTtnQkFDVCxtREFBdUI7Z0JBQ3ZCLDRCQUFrQixDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNqQyxPQUFPLEVBQUUsbURB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