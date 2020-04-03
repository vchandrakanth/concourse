"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const policy_resolution_actions_1 = require("./policy-resolution.actions");
const policy_resolution_reducer_1 = require("./policy-resolution.reducer");
const fakeGroups = require("@concourse/store/group/services/group.faker");
const fakePolicyGroupTemplates = require("@concourse/store/policy-group-template/services/policy-group-template.faker");
const fakePolicyGroups = require("@concourse/store/policy-group/services/policy-group.faker");
const fakePolicyTemplates = require("@concourse/store/policy-template/services/policy-template.faker");
const fakePolicies = require("@concourse/store/policy/services/policy.faker");
const fakeSurfaceLayers = require("@concourse/store/surface-layer/services/surface-layer.faker");
const fakeUsers = require("@concourse/store/user/services/user.faker");
const fakePolicyResolutions = require("../services/policy-resolution.faker");
describe('Policy Resolution Reducer', () => {
    describe('unknown acton', () => {
        it('should return the initial state', () => {
            const action = {};
            const result = policy_resolution_reducer_1.reducer(policy_resolution_reducer_1.initialState, action);
            expect(result).toBe(policy_resolution_reducer_1.initialState);
        });
    });
    describe('LoadPolicyResolution Actions', () => {
        describe('LoadPolicyResolutions', () => {
            it('should set loading to true', () => {
                const action = {
                    type: policy_resolution_actions_1.PolicyResolutionTypes.LoadPolicyResolutions
                };
                const result = policy_resolution_reducer_1.reducer(policy_resolution_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
        describe('LoadPolicyResolutionSuccess', () => {
            const users = fakeUsers.fakeMany();
            const surfaceLayers = fakeSurfaceLayers.fakeMany();
            const policyTemplates = fakePolicyTemplates.fakeAll();
            const policies = fakePolicies.fakeMany(policyTemplates, fakeGroups.fakeMany(), surfaceLayers);
            const policyGroupTemplates = fakePolicyGroupTemplates.fakeMany(policyTemplates, 10);
            const policyGroups = fakePolicyGroups.fakeMany(policyGroupTemplates, policies, surfaceLayers, [], fakeGroups.fakeOne());
            const policyResolutions = fakePolicyResolutions.fakeMany(surfaceLayers, policyGroups, users);
            const action = {
                type: policy_resolution_actions_1.PolicyResolutionTypes.LoadPolicyResolutionsSuccess,
                payload: policyResolutions
            };
            const entities = policyResolutions.reduce((acc, pr) => {
                acc[pr.id] = pr;
                acc[pr.id].isCollapsed = false;
                return acc;
            }, {});
            const ids = [...policyResolutions.map(pr => pr.id)];
            const result = policy_resolution_reducer_1.reducer(policy_resolution_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should set loaded to true', () => {
                expect(result.loaded).toBe(true);
            });
            it('should have at least one entity', () => {
                expect(Object.keys(result.entities).length).toBeGreaterThanOrEqual(1);
                expect(result.entities).toEqual(entities);
            });
            it('should have at least on id', () => {
                expect(result.ids.length).toBeGreaterThanOrEqual(1);
                expect(result.ids).toEqual(ids);
            });
        });
        describe('LoadPolicyResolutionFailure', () => {
            const action = new policy_resolution_actions_1.LoadPolicyResolutionsFailure();
            const result = policy_resolution_reducer_1.reducer(policy_resolution_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should set loaded to false', () => {
                expect(result.loaded).toBe(false);
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXJlc29sdXRpb24ucmVkdWNlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL3BvbGljeS1yZXNvbHV0aW9uL3N0YXRlL3BvbGljeS1yZXNvbHV0aW9uLnJlZHVjZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJFQUtxQztBQUNyQywyRUFBb0U7QUFFcEUsMEVBQTBFO0FBQzFFLHdIQUF3SDtBQUN4SCw4RkFBOEY7QUFDOUYsdUdBQXVHO0FBQ3ZHLDhFQUE4RTtBQUM5RSxpR0FBaUc7QUFDakcsdUVBQXVFO0FBQ3ZFLDZFQUE2RTtBQUU3RSxRQUFRLENBQUMsMkJBQTJCLEVBQUUsR0FBRyxFQUFFO0lBQ3pDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQzdCLEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRSxHQUFHLEVBQUU7WUFDekMsTUFBTSxNQUFNLEdBQUcsRUFBUyxDQUFDO1lBQ3pCLE1BQU0sTUFBTSxHQUFHLG1DQUFPLENBQUMsd0NBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztZQUM3QyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLHdDQUFZLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLDhCQUE4QixFQUFFLEdBQUcsRUFBRTtRQUM1QyxRQUFRLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxFQUFFO1lBQ3JDLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLEVBQUU7Z0JBQ3BDLE1BQU0sTUFBTSxHQUEwQjtvQkFDcEMsSUFBSSxFQUFFLGlEQUFxQixDQUFDLHFCQUFxQjtpQkFDbEQsQ0FBQztnQkFDRixNQUFNLE1BQU0sR0FBRyxtQ0FBTyxDQUFDLHdDQUFZLEVBQUUs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