"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fakePolicyTemplate = require("../../policy-template/services/policy-template.faker");
const policy_group_template_faker_1 = require("../services/policy-group-template.faker");
const policy_group_template_actions_1 = require("./policy-group-template.actions");
const policy_group_template_reducer_1 = require("./policy-group-template.reducer");
describe('Policy Template Group Reducer', () => {
    describe('unknown action', () => {
        it('should return the initial state', () => {
            const action = {};
            const result = policy_group_template_reducer_1.reducer(policy_group_template_reducer_1.initialState, action);
            expect(result).toBe(policy_group_template_reducer_1.initialState);
        });
    });
    describe('Load Policy Template Groups action', () => {
        it('should set loading to true', () => {
            const action = {
                type: policy_group_template_actions_1.PolicyGroupTemplateActionTypes.LoadPolicyGroupTemplates
            };
            const result = policy_group_template_reducer_1.reducer(policy_group_template_reducer_1.initialState, action);
            expect(result.loading).toBe(true);
        });
    });
    describe('Load Policy Template Groups Success action', () => {
        let action;
        let result;
        const policyTemplates = fakePolicyTemplate.fakeAll();
        const policyGroupTemplates = policy_group_template_faker_1.fakeMany(policyTemplates, 2);
        const entities = {
            [policyGroupTemplates[0].id]: policyGroupTemplates[0],
            [policyGroupTemplates[1].id]: policyGroupTemplates[1]
        };
        const ids = [policyGroupTemplates[0].id, policyGroupTemplates[1].id];
        action = {
            type: policy_group_template_actions_1.PolicyGroupTemplateActionTypes.LoadPolicyGroupTemplatesSuccess,
            payload: policyGroupTemplates
        };
        result = policy_group_template_reducer_1.reducer(policy_group_template_reducer_1.initialState, action);
        it('should set loading to false', () => {
            expect(result.loading).toBe(false);
        });
        it('should set loaded to true', () => {
            expect(result.loaded).toBe(true);
        });
        it('should have two entities', () => {
            expect(Object.keys(result.entities).length).toBe(2);
            expect(result.entities).toEqual(entities);
        });
        it('should have two ids', () => {
            expect(result.ids.length).toBe(2);
            expect(result.ids).toEqual(ids);
        });
    });
    describe('Load Policy Template Groups Failure action', () => {
        const action = new policy_group_template_actions_1.LoadPolicyGroupTemplatesFailure();
        const result = policy_group_template_reducer_1.reducer(policy_group_template_reducer_1.initialState, action);
        it('should set loading to false', () => {
            expect(result.loading).toBe(false);
        });
        it('should set loaded to false', () => {
            expect(result.loaded).toBe(false);
        });
    });
    describe('Load Policy Template Group action', () => {
        it('should set loading to true', () => {
            const action = {
                type: policy_group_template_actions_1.PolicyGroupTemplateActionTypes.LoadPolicyGroupTemplate,
                payload: 101
            };
            const result = policy_group_template_reducer_1.reducer(policy_group_template_reducer_1.initialState, action);
            expect(result.loading).toBe(true);
        });
    });
    describe('Load Policy Template Group Success action', () => {
        const policyGroupTemplate = policy_group_template_faker_1.fakeOne();
        const entities = {
            [policyGroupTemplate.id]: policyGroupTemplate
        };
        const action = new policy_group_template_actions_1.LoadPolicyGroupTemplateSuccess(policyGroupTemplate);
        const result = policy_group_template_reducer_1.reducer(policy_group_template_reducer_1.initialState, action);
        it('should set loading to false', () => {
            expect(result.loading).toBe(false);
        });
        it('should set loaded to true', () => {
            expect(result.loaded).toBe(true);
        });
        it('should have one entity', () => {
            expect(Object.keys(result.entities).length).toBe(1);
            expect(result.entities).toEqual(entities);
        });
        it('should have one id', () => {
            expect(result.ids.length).toBe(1);
            expect(result.ids[0]).toBe(policyGroupTemplate.id);
        });
    });
    describe('Load Policy Template Group Failure action', () => {
        const action = new policy_group_template_actions_1.LoadPolicyGroupTemplateFailure();
        const result = policy_group_template_reducer_1.reducer(policy_group_template_reducer_1.initialState, action);
        it('should set loading to false', () => {
            expect(result.loading).toBe(false);
        });
        it('should set loaded to false', () => {
            expect(result.loaded).toBe(false);
        });
    });
    describe('DeletePolicyGroupTemplate$', () => {
        const policyGroupTemplate = policy_group_template_faker_1.fakeOne();
        it('should set loading to true', () => {
            const action = new policy_group_template_actions_1.DeletePolicyGroupTemplate(policyGroupTemplate.id);
            const result = policy_group_template_reducer_1.reducer(policy_group_template_reducer_1.initialState, action);
            expect(result.loading).toBe(true);
        });
        describe('Delete Policy Template Group Success Action', () => {
            const action = {
                type: policy_group_template_actions_1.PolicyGroupTemplateActionTypes.DeletePolicyGroupTemplateSuccess,
                payload: policyGroupTemplate.id
            };
            const previousState = policy_group_template_reducer_1.reducer(policy_group_template_reducer_1.initialState, new policy_group_template_actions_1.LoadPolicyGroupTemplateSuccess(policyGroupTemplate));
            const result = policy_group_template_reducer_1.reducer(previousState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should have user removed from ids', () => {
                const found = result.ids.includes(policyGroupTemplate.id);
                expect(found).toBe(false);
            });
            it('should have user removed from entities', () => {
                const found = result.entities[policyGroupTemplate.id];
                expect(found).toBeFalsy();
            });
        });
        describe('Delete Policy Template Group Failure Action', () => {
            const action = new policy_group_template_actions_1.DeletePolicyGroupTemplateFailure();
            const result = policy_group_template_reducer_1.reducer(policy_group_template_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should set loaded to false', () => {
                expect(result.loaded).toBe(false);
            });
        });
    });
    describe('RemovePolicyTemplateFromPolicyGroupTemplate Actions', () => {
        //  TODO: This has to be replaced with inMem api with fake.many()
        const initialPolicyTemplates = [
            { id: 1, name: 'Financial', description: 'test' },
            { id: 2, name: 'private', description: 'test' }
        ];
        const initialPolicyGroupTemplate = policy_group_template_faker_1.fakeOne();
        initialPolicyGroupTemplate.policyTemplates = initialPolicyTemplates.map(item => item);
        describe('RemovePolicyTemplateFromPolicyGroupTemplate', () => {
            it('should set loading to true', () => {
                const action = {
                    type: policy_group_template_actions_1.PolicyGroupTemplateActionTypes.RemovePolicyTemplateFromPolicyGroupTemplate,
                    payload: { policyGroupTemplateId: initialPolicyGroupTemplate.id, policyTemplateId: initialPolicyTemplates[0].id }
                };
                const result = policy_group_template_reducer_1.reducer(policy_group_template_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
        describe('RemovePolicyTemplateFromPolicyGroupTemplateSuccess', () => {
            const updatedPolicyGroupTemplate = Object.assign(Object.assign({}, initialPolicyGroupTemplate), { policyTemplates: [...initialPolicyTemplates.filter(u => u.id !== initialPolicyTemplates[0].id)] });
            const action = {
                type: policy_group_template_actions_1.PolicyGroupTemplateActionTypes.RemovePolicyTemplateFromPolicyGroupTemplateSuccess,
                payload: updatedPolicyGroupTemplate
            };
            const previousState = policy_group_template_reducer_1.reducer(policy_group_template_reducer_1.initialState, new policy_group_template_actions_1.LoadPolicyGroupTemplateSuccess(initialPolicyGroupTemplate));
            const result = policy_group_template_reducer_1.reducer(previousState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should remove user from group', () => {
                expect(result.entities[initialPolicyGroupTemplate.id].policyTemplates.length).
                    toBeLessThan(initialPolicyGroupTemplate.policyTemplates.length);
                expect(result.entities[initialPolicyGroupTemplate.id].policyTemplates.length).
                    toBe(updatedPolicyGroupTemplate.policyTemplates.length);
            });
        });
        describe('RemovePolicyTemplateFromPolicyGroupTemplateFailure', () => {
            const action = new policy_group_template_actions_1.RemovePolicyTemplateFromPolicyGroupTemplateFailure();
            const previousState = policy_group_template_reducer_1.reducer(policy_group_template_reducer_1.initialState, new policy_group_template_actions_1.LoadPolicyGroupTemplateSuccess(initialPolicyGroupTemplate));
            const result = policy_group_template_reducer_1.reducer(previousState, action);
            it('should not have modified users list', () => {
                expect(result.entities[initialPolicyGroupTemplate.id].policyTemplates).toBe(initialPolicyGroupTemplate.policyTemplates);
            });
        });
        describe('UpdatePolicyGroupTemplate$', () => {
            const policyGroupTemplate = policy_group_template_faker_1.fakeOne();
            it('should set loading to true', () => {
                const action = new policy_group_template_actions_1.UpdatePolicyGroupTemplate({ newPolicyGroupTemplate: policyGroupTemplate, versionBump: 'MAJOR' });
                const result = policy_group_template_reducer_1.reducer(policy_group_template_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
            describe('Update Policy Template Group Success Action', () => {
                const updatePayload = policyGroupTemplate;
                updatePayload.name = 'test';
                const action = {
                    type: policy_group_template_actions_1.PolicyGroupTemplateActionTypes.UpdatePolicyGroupTemplateSuccess,
                    payload: updatePayload
                };
                const previousState = policy_group_template_reducer_1.reducer(policy_group_template_reducer_1.initialState, new policy_group_template_actions_1.LoadPolicyGroupTemplateSuccess(policyGroupTemplate));
                const result = policy_group_template_reducer_1.reducer(previousState, action);
                it('should set loading to false', () => {
                    expect(result.loading).toBe(false);
                });
                it('should have policy template group updated from entities', () => {
                    const found = result.entities[policyGroupTemplate.id];
                    expect(found).toEqual(updatePayload);
                });
            });
            describe('Update Policy Template Group Failure Action', () => {
                const action = new policy_group_template_actions_1.UpdatePolicyGroupTemplateFailure();
                const result = policy_group_template_reducer_1.reducer(policy_group_template_reducer_1.initialState, action);
                it('should set loading to false', () => {
                    expect(result.loading).toBe(false);
                });
                it('should set loaded to false', () => {
                    expect(result.loaded).toBe(false);
                });
            });
        });
    });
    describe('CreatePolicyGroupTemplate Actions', () => {
        describe('CreatePolicyGroupTemplate', () => {
            it('should set loading to true', () => {
                const policyTemplate = policy_group_template_faker_1.fakeOne();
                const action = new policy_group_template_actions_1.CreatePolicyGroupTemplate(policyTemplate);
                const result = policy_group_template_reducer_1.reducer(policy_group_template_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
        describe('CreatePolicyTemplateGGroupSuccess', () => {
            const policyGroupTemplate = policy_group_template_faker_1.fakeOne();
            const action = new policy_group_template_actions_1.CreatePolicyGroupTemplateSuccess(policyGroupTemplate);
            const entities = {
                [policyGroupTemplate.id]: policyGroupTemplate
            };
            const ids = [policyGroupTemplate.id];
            const result = policy_group_template_reducer_1.reducer(policy_group_template_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should have one entity', () => {
                expect(Object.keys(result.entities).length).toBe(ids.length);
                expect(result.entities).toEqual(entities);
            });
            it('should have one id', () => {
                expect(result.ids.length).toBe(ids.length);
                expect(result.ids[0]).toBe(policyGroupTemplate.id);
            });
        });
        describe('CreatePolicyGroupTemplateFailure', () => {
            const action = new policy_group_template_actions_1.CreatePolicyGroupTemplateFailure();
            const result = policy_group_template_reducer_1.reducer(policy_group_template_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LWdyb3VwLXRlbXBsYXRlLnJlZHVjZXIuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9wb2xpY3ktZ3JvdXAtdGVtcGxhdGUvc3RhdGUvcG9saWN5LWdyb3VwLXRlbXBsYXRlLnJlZHVjZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJGQUEyRjtBQUMzRix5RkFBNEU7QUFDNUUsbUZBb0J5QztBQUN6QyxtRkFBK0U7QUFFL0UsUUFBUSxDQUFDLCtCQUErQixFQUFFLEdBQUcsRUFBRTtJQUM3QyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFO1FBQzlCLEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRSxHQUFHLEVBQUU7WUFDekMsTUFBTSxNQUFNLEdBQUcsRUFBUyxDQUFDO1lBRXpCLE1BQU0sTUFBTSxHQUFHLHVDQUFPLENBQUMsNENBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztZQUU3QyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLDRDQUFZLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLG9DQUFvQyxFQUFFLEdBQUcsRUFBRTtRQUNsRCxFQUFFLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxFQUFFO1lBQ3BDLE1BQU0sTUFBTSxHQUE2QjtnQkFDdkMsSUFBSSxFQUFFLDhEQUE4QixDQUFDLHdCQUF3QjthQUM5RCxDQUFDO1lBRUYsTUFBTSxNQUFNLEdBQUcsdUNBQU8sQ0FBQyw0Q0FBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRTdDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO0lB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