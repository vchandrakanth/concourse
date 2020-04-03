"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/common/http/testing");
const testing_2 = require("@angular/core/testing");
const effects_1 = require("@ngrx/effects");
const testing_3 = require("@ngrx/effects/testing");
const jasmine_marbles_1 = require("jasmine-marbles");
const error_actions_1 = require("@concourse/core/error/state/error.actions");
const test_1 = require("@concourse/test");
const fakePolicyTemplate = require("../services/policy-template.faker");
const policy_template_service_1 = require("../services/policy-template.service");
const policy_template_actions_1 = require("./policy-template.actions");
const policy_template_effects_1 = require("./policy-template.effects");
const policy_template_facade_1 = require("./policy-template.facade");
describe('PolicyTemplateEffects', () => {
    let actions;
    let effects;
    let metadata;
    let service;
    beforeEach(() => {
        testing_2.TestBed.configureTestingModule({
            imports: [
                testing_1.HttpClientTestingModule
            ],
            providers: [
                policy_template_effects_1.PolicyTemplateEffects,
                test_1.mockFacade(policy_template_facade_1.PolicyTemplateFacade),
                testing_3.provideMockActions(() => actions),
                {
                    provide: policy_template_service_1.PolicyTemplateService,
                    useValue: {
                        create: jest.fn(),
                        list: jest.fn(),
                        get: jest.fn(),
                        delete: jest.fn(),
                        update: jest.fn()
                    }
                }
            ]
        });
        effects = testing_2.TestBed.get(policy_template_effects_1.PolicyTemplateEffects);
        service = testing_2.TestBed.get(policy_template_service_1.PolicyTemplateService);
        metadata = effects_1.getEffectsMetadata(effects);
    });
    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
    describe('dispatch loadPolicyTemplates', () => {
        it('should register loadPolicyTemplates$', () => {
            expect(metadata.loadPolicyTemplates$).toEqual({ dispatch: true });
        });
    });
    describe('list policy templates', () => {
        it('should return a LoadPolicyTemplatesSuccess action, with array of policy templates, on success', () => {
            const policyTemplates = fakePolicyTemplate.fakeAll();
            const action = new policy_template_actions_1.LoadPolicyTemplates();
            const outcome = new policy_template_actions_1.LoadPolicyTemplatesSuccess(policyTemplates);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: policyTemplates });
            const expected = jasmine_marbles_1.cold('--b', { b: outcome });
            service.list = jest.fn(() => response);
            expect(effects.loadPolicyTemplates$).toBeObservable(expected);
        });
        it('should return a LoadPolicyTemplatesFailure action, with an error, on failure', () => {
            const action = new policy_template_actions_1.LoadPolicyTemplates();
            const error = new Error('error');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const err = new policy_template_actions_1.LoadPolicyTemplatesFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: err });
            service.list = jest.fn(() => response);
            expect(effects.loadPolicyTemplates$).toBeObservable(expected);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXRlbXBsYXRlLmVmZmVjdHMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9wb2xpY3ktdGVtcGxhdGUvc3RhdGUvcG9saWN5LXRlbXBsYXRlLmVmZmVjdHMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBEQUF1RTtBQUN2RSxtREFBZ0Q7QUFDaEQsMkNBQW9FO0FBQ3BFLG1EQUEyRDtBQUUzRCxxREFBNEM7QUFHNUMsNkVBQWdGO0FBQ2hGLDBDQUE2QztBQUM3Qyx3RUFBd0U7QUFDeEUsaUZBQTRFO0FBQzVFLHVFQUltQztBQUNuQyx1RUFBa0U7QUFDbEUscUVBQWdFO0FBRWhFLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLEVBQUU7SUFDckMsSUFBSSxPQUF3QixDQUFDO0lBQzdCLElBQUksT0FBOEIsQ0FBQztJQUNuQyxJQUFJLFFBQWdELENBQUM7SUFDckQsSUFBSSxPQUE4QixDQUFDO0lBRW5DLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRTtnQkFDUCxpQ0FBdUI7YUFDeEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsK0NBQXFCO2dCQUNyQixpQkFBVSxDQUFDLDZDQUFvQixDQUFDO2dCQUNoQyw0QkFBa0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pDO29CQUNFLE9BQU8sRUFBRSwrQ0FBcUI7b0JBQzlCLFFBQVEsRUFBRTt3QkFDUixNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTt3QkFDakIsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7d0JBQ2YsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7d0JBQ2QsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLEVB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