"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const policy_group_actions_1 = require("@concourse/store/policy-group/state/policy-group.actions");
const policy_group_reducer_1 = require("@concourse/store/policy-group/state/policy-group.reducer");
const fakeGroups = require("@concourse/store/group/services/group.faker");
const fakePolicyGroupTemplate = require("@concourse/store/policy-group-template/services/policy-group-template.faker");
const fakePolicyGroups = require("@concourse/store/policy-group/services/policy-group.faker");
const fakePolicyTemplates = require("@concourse/store/policy-template/services/policy-template.faker");
const fakePolicies = require("@concourse/store/policy/services/policy.faker");
const fakeSurfaceLayers = require("@concourse/store/surface-layer/services/surface-layer.faker");
const helpers_1 = require("@concourse/shared/helpers");
describe('PolicyGroup Reducer', () => {
    const surfaceLayers = fakeSurfaceLayers.fakeMany();
    const policyTemplates = fakePolicyTemplates.fakeAll();
    const policies = fakePolicies.fakeMany(policyTemplates, fakeGroups.fakeMany(), surfaceLayers);
    const policyGroupTemplates = fakePolicyGroupTemplate.fakeMany(policyTemplates, 10);
    const policyGroups = fakePolicyGroups.fakeMany(policyGroupTemplates, policies, surfaceLayers, [], fakeGroups.fakeOne());
    describe('unknown action', () => {
        it('should return the initial state', () => {
            const action = {};
            const result = policy_group_reducer_1.reducer(policy_group_reducer_1.initialState, action);
            expect(result).toBe(policy_group_reducer_1.initialState);
        });
    });
    describe('LoadPolicyGroups Actions', () => {
        describe('LoadGroups', () => {
            it('should be loading to true', () => {
                const action = {
                    type: policy_group_actions_1.PolicyGroupActionTypes.LoadPolicyGroups
                };
                const result = policy_group_reducer_1.reducer(policy_group_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
    });
    describe('LoadingPolicyGroupsSuccess', () => {
        const samplePGs = helpers_1.sample(policyGroups, 2);
        const action = {
            type: policy_group_actions_1.PolicyGroupActionTypes.LoadPolicyGroupsSuccess,
            payload: samplePGs
        };
        const entities = {
            [samplePGs[0].id]: samplePGs[0],
            [samplePGs[1].id]: samplePGs[1]
        };
        const ids = [samplePGs[0].id, samplePGs[1].id];
        let result;
        result = policy_group_reducer_1.reducer(policy_group_reducer_1.initialState, action);
        it('should set loading to false', () => {
            expect(result.loading).toBe(false);
        });
        it('should set loaded to true', () => {
            expect(result.loaded).toBe(true);
        });
        it('should have two entities', () => {
            expect(Object.keys(entities).length).toBe(2);
            expect(result.entities).toEqual(entities);
        });
        it('should have two ids', () => {
            expect(result.ids.length).toBe(2);
            expect(result.ids).toEqual(ids);
        });
    });
    describe('LoadPolicyGroupsFailure', () => {
        const action = new policy_group_actions_1.LoadPolicyGroupsFailure();
        const result = policy_group_reducer_1.reducer(policy_group_reducer_1.initialState, action);
        it('should set loading to false', () => {
            expect(result.loading).toBe(false);
        });
        it('should be set loaded to false', () => {
            expect(result.loaded).toBe(false);
        });
    });
    describe('LoadPolicyGroup Actions', () => {
        describe('LoadPolicyGroup', () => {
            it('should set loading to true', () => {
                const [policyGroup] = policyGroups;
                const action = {
                    type: policy_group_actions_1.PolicyGroupActionTypes.LoadPolicyGroup,
                    payload: policyGroup.id
                };
                const result = policy_group_reducer_1.reducer(policy_group_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
        describe('LoadPolicyGroupSuccess', () => {
            const [policyGroup] = policyGroups;
            const action = {
                type: policy_group_actions_1.PolicyGroupActionTypes.LoadPolicyGroupSuccess,
                payload: policyGroup
            };
            const entities = {
                [policyGroup.id]: policyGroup
            };
            const policyGroupId = [policyGroup.id];
            const result = policy_group_reducer_1.reducer(policy_group_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should set loaded to false', () => {
                expect(result.loaded).toBe(false);
            });
            it('should have one entity', () => {
                expect(Object.keys(result.entities).length).toBe(policyGroupId.length);
                expect(result.entities).toEqual(entities);
            });
            it('should have one id', () => {
                expect(result.ids.length).toBe(policyGroupId.length);
            });
        });
        describe('LoadPolicyGroupFailure', () => {
            const action = new policy_group_actions_1.LoadPolicyGroupFailure();
            const result = policy_group_reducer_1.reducer(policy_group_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
        });
        describe('DeletePolicyGroup Actions', () => {
            const [policyGroup] = policyGroups;
            describe('DeletePolicyGroup', () => {
                it('should set loading to true', () => {
                    const action = {
                        type: policy_group_actions_1.PolicyGroupActionTypes.DeletePolicyGroup,
                        payload: policyGroup.id
                    };
                    const result = policy_group_reducer_1.reducer(policy_group_reducer_1.initialState, action);
                    expect(result.loading).toBe(true);
                });
            });
            describe('DeleteGroupSuccess', () => {
                const action = {
                    type: policy_group_actions_1.PolicyGroupActionTypes.DeletePolicyGroupSuccess,
                    payload: policyGroup.id
                };
                const prevState = policy_group_reducer_1.reducer(policy_group_reducer_1.initialState, new policy_group_actions_1.LoadPolicyGroupSuccess(policyGroup));
                const result = policy_group_reducer_1.reducer(prevState, action);
                it('should set loading to false', () => {
                    expect(result.loading).toBe(false);
                });
                it('should have policyGroup removed from ids', () => {
                    const found = result.ids.includes(policyGroup.id);
                    expect(found).toBeFalsy();
                });
            });
            describe('DeletePolicyGroupFailure', () => {
                const action = new policy_group_actions_1.DeletePolicyGroupFailure();
                const prevState = policy_group_reducer_1.reducer(policy_group_reducer_1.initialState, new policy_group_actions_1.LoadPolicyGroupSuccess(policyGroup));
                const result = policy_group_reducer_1.reducer(prevState, action);
                it('should set loading to false', () => {
                    expect(result.loaded).toBe(false);
                });
                it('should have entities untouched', () => {
                    expect(result.entities).toBe(prevState.entities);
                });
            });
        });
    });
    describe('CreatePolicyGroup Actions', () => {
        describe('CreatePolicyGroup', () => {
            it('should set loading to true', () => {
                const [policyGroup] = policyGroups;
                const action = new policy_group_actions_1.CreatePolicyGroup({ policyGroup, versionBump: 'MAJOR' });
                const result = policy_group_reducer_1.reducer(policy_group_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
        describe('CreatePolicyGroupSuccess', () => {
            const [policyGroup] = policyGroups;
            const action = {
                type: policy_group_actions_1.PolicyGroupActionTypes.CreatePolicyGroupSuccess,
                payload: policyGroup
            };
            const entities = {
                [policyGroup.id]: policyGroup
            };
            const ids = [policyGroup.id];
            const result = policy_group_reducer_1.reducer(policy_group_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should have one entity', () => {
                expect(Object.keys(result.entities).length).toBe(ids.length);
                expect(result.entities).toEqual(entities);
            });
            it('should have one id', () => {
                expect(result.ids.length).toBe(ids.length);
                expect(result.ids[0]).toBe(policyGroup.id);
            });
        });
        describe('CreatePolicyGroupFailure', () => {
            const action = new policy_group_actions_1.CreatePolicyGroupFailure();
            const result = policy_group_reducer_1.reducer(policy_group_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LWdyb3VwLnJlZHVjZXIuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9wb2xpY3ktZ3JvdXAvc3RhdGUvcG9saWN5LWdyb3VwLnJlZHVjZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1HQWNrRTtBQUNsRSxtR0FBd0c7QUFHeEcsMEVBQTBFO0FBQzFFLHVIQUF1SDtBQUN2SCw4RkFBOEY7QUFDOUYsdUdBQXVHO0FBQ3ZHLDhFQUE4RTtBQUM5RSxpR0FBaUc7QUFFakcsdURBQW1EO0FBRW5ELFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLEVBQUU7SUFDbkMsTUFBTSxhQUFhLEdBQW1CLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ25FLE1BQU0sZUFBZSxHQUFxQixtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN4RSxNQUFNLFFBQVEsR0FBYSxZQUFZLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsUUFBUSxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDeEcsTUFBTSxvQkFBb0IsR0FBMEIsdUJBQXVCLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMxRyxNQUFNLFlBQVksR0FBa0IsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBRXZJLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLEVBQUU7UUFDOUIsRUFBRSxDQUFDLGlDQUFpQyxFQUFFLEdBQUcsRUFBRTtZQUN6QyxNQUFNLE1BQU0sR0FBRyxFQUFTLENBQUM7WUFFekIsTUFBTSxNQUFNLEdBQUcsOEJBQU8sQ0FBQyxt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